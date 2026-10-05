// vizkit/circuit.js — kleine Schaltungssimulation (Modified Nodal Analysis), Browser + Node, ohne Abhängigkeiten.
//
//   import { Netlist, dcSolve, transient, acSweep, impedance, createSim, waves } from './circuit.js';
//   const n = new Netlist()
//     .V('V1', 'in', '0', { wave: waves.sine(1, 1e3) })
//     .R('R1', 'in', 'out', 1e3).C('C1', 'out', '0', 100e-9);
//   const tr = transient(n, { tstop: 5e-3, dt: 2e-6 });   // tr.t, tr.v.out (Float64Array), tr.i.R1
//   const ac = acSweep(n, logspace(10, 1e5, 200));         // ac.db('out'), ac.phase('out'), ac.mag('out')
//
// Netzlisten-Format: Array von Objekten { type, name, n: [Knoten…], value, … }; Knoten sind Strings,
// Masse ist '0' (oder 'gnd'). Siehe CLAUDE.md → „Vizkit“ und die Tabelle TYPES unten.
// Stromrichtung ALLER Zweigströme: durch das Bauteil von n[0] nach n[1] (positiv, wenn V(n0) > V(n1)).
// Bei Quellen heißt das: Eine Spannungsquelle, die Leistung abgibt, hat NEGATIVEN Strom i (SPICE-Konvention).

import { logspace, linspace } from './si.js';
export { logspace, linspace };

export class CircuitError extends Error {
  constructor(msg, code = 'error', info = {}) { super(msg); this.name = 'CircuitError'; this.code = code; Object.assign(this, info); }
}

const TAU = 2 * Math.PI, DEG = Math.PI / 180, VT0 = 0.025852;

// ── Signalformen ─────────────────────────────────────────────────────────────
const frac = x => x - Math.floor(x);
/** Konstruktoren für Quellen-`wave`-Objekte. Amplituden sind Spitzenwerte (amp), Phase in Grad. */
export const waves = {
  sine: (amp = 1, freq = 1e3, offset = 0, phase = 0) => ({ shape: 'sine', amp, freq, offset, phase }),
  square: (amp = 1, freq = 1e3, o = {}) => ({ shape: 'square', amp, freq, offset: 0, duty: 0.5, phase: 0, ...o }),
  tri: (amp = 1, freq = 1e3, o = {}) => ({ shape: 'tri', amp, freq, offset: 0, phase: 0, ...o }),
  saw: (amp = 1, freq = 1e3, o = {}) => ({ shape: 'saw', amp, freq, offset: 0, phase: 0, ...o }),
  /** { low, high, delay, rise, fall, width, period } wie SPICE PULSE */
  pulse: o => ({ shape: 'pulse', low: 0, high: 1, delay: 0, rise: 1e-9, fall: 1e-9, ...o }),
  step: (low = 0, high = 1, delay = 0, rise = 1e-9) => ({ shape: 'step', low, high, delay, rise }),
  pwl: points => ({ shape: 'pwl', points }),
  dc: value => ({ shape: 'dc', value }),
};
/** Wert einer Signalform (Objekt, Funktion t→V oder Zahl) zur Zeit t. */
export function waveValue(w, t) {
  if (typeof w === 'function') return w(t);
  if (typeof w === 'number') return w;
  const off = w.offset ?? 0, amp = w.amp ?? 1, ph = (w.phase ?? 0) / 360, dly = w.delay ?? 0;
  switch (w.shape) {
    case 'dc': return w.value ?? 0;
    case 'sine': return off + amp * Math.sin(TAU * (w.freq * Math.max(0, t - dly) + ph));
    case 'square': { const p = frac(w.freq * t + ph); const hi = w.high ?? off + amp, lo = w.low ?? off - amp; return p < (w.duty ?? 0.5) ? hi : lo; }
    case 'tri': { const p = frac(w.freq * t + ph); return off + amp * (p < 0.25 ? 4 * p : p < 0.75 ? 2 - 4 * p : 4 * p - 4); }
    case 'saw': return off + amp * (2 * frac(w.freq * t + ph + 0.5) - 1);
    case 'step': { const x = t - dly; if (x <= 0) return w.low; if (x >= w.rise) return w.high; return w.low + (w.high - w.low) * x / w.rise; }
    case 'pulse': {
      let x = t - dly; if (x < 0) return w.low;
      const per = w.period ?? Infinity, wd = w.width ?? per / 2;
      if (per < Infinity) x = x % per;
      if (x < w.rise) return w.low + (w.high - w.low) * x / Math.max(w.rise, 1e-30);
      if (x < w.rise + wd) return w.high;
      if (x < w.rise + wd + w.fall) return w.high + (w.low - w.high) * (x - w.rise - wd) / Math.max(w.fall, 1e-30);
      return w.low;
    }
    case 'pwl': { const p = w.points; if (t <= p[0][0]) return p[0][1]; for (let i = 1; i < p.length; i++) if (t <= p[i][0]) return p[i - 1][1] + (p[i][1] - p[i - 1][1]) * (t - p[i - 1][0]) / (p[i][0] - p[i - 1][0]); return p[p.length - 1][1]; }
  }
  throw new CircuitError('Unbekannte Signalform: ' + w.shape, 'wave');
}
const srcDC = el => {
  if (el.dc != null) return el.dc;
  const w = el.wave;
  if (w == null) return el.value ?? 0;
  if (typeof w === 'function') return w(0);
  if (w.shape === 'pulse' || w.shape === 'step') return w.low ?? 0;
  if (w.shape === 'pwl') return w.points[0][1];
  if (w.shape === 'dc') return w.value;
  return w.offset ?? 0;
};
const srcAt = (el, t) => el.wave != null ? waveValue(el.wave, t) : (el.dc ?? el.value ?? 0);
/** AC-Phasor einer Quelle: [Betrag, Phase in rad]. Standard: Amplitude der wave (1 V, wenn nichts angegeben ist ac: 0). */
const srcAC = el => {
  if (el.ac != null) return Array.isArray(el.ac) ? [el.ac[0], el.ac[1] * DEG] : [el.ac, 0];
  const w = el.wave; if (w && typeof w === 'object' && w.amp != null) return [w.amp, (w.phase ?? 0) * DEG];
  return [0, 0];
};

// ── Bauteilmodelle ───────────────────────────────────────────────────────────
const E40 = Math.exp(40);
const expl = x => x < 40 ? Math.exp(x) : E40 * (1 + x - 40);
const dexpl = x => x < 40 ? Math.exp(x) : E40;

const LED_VF = { red: 1.9, orange: 2.0, yellow: 2.1, green: 2.2, blue: 3.0, white: 3.1, ir: 1.25 };
const DIODE_MODELS = { si: { is: 1e-14, N: 1 }, schottky: { is: 1e-8, N: 1.05 }, ge: { is: 1e-6, N: 1 } };
function dioParams(el) {
  const vt = el.vt ?? VT0;
  let is, N;
  if (el.type === 'LED') {
    N = el.N ?? 2;
    const vf = el.vf ?? LED_VF[el.color || 'red'] ?? 2;
    is = el.is ?? 1e-2 * Math.exp(-vf / (N * vt));   // Vf gilt bei 10 mA
  } else {
    const m = DIODE_MODELS[el.model || 'si'] || DIODE_MODELS.si;
    is = el.is ?? m.is; N = el.N ?? m.N;
  }
  const nvt = N * vt, p = { is, nvt, vcrit: nvt * Math.log(nvt / (Math.SQRT2 * is)), vz: 0, vz0: 0, isz: is };
  if (el.type === 'ZD') {
    p.vz = el.vz ?? 5.1; p.nvz = (el.Nz ?? 1) * vt;
    p.vz0 = p.vz - p.nvz * Math.log((el.iz ?? 5e-3) / p.isz);   // bei -Vz fließt iz (Standard 5 mA)
  }
  return p;
}
const DIO = [0, 0];   // Ergebnis-Scratch (kein Allokieren im heißen Pfad): [i, g]
function dioEval(p, v) {
  const x = v / p.nvt;
  let i = p.is * (expl(x) - 1), g = p.is * dexpl(x) / p.nvt;
  if (p.vz) { const w = -(v + p.vz0) / p.nvz; i -= p.isz * (expl(w) - 1); g += p.isz * dexpl(w) / p.nvz; }
  DIO[0] = i; DIO[1] = g; return DIO;
}
function pnjlim(vnew, vold, vt, vcrit) {
  if (vnew > vcrit && Math.abs(vnew - vold) > 2 * vt) {
    if (vold > 0) { const arg = 1 + (vnew - vold) / vt; vnew = arg > 0 ? vold + vt * Math.log(arg) : vcrit; }
    else vnew = vt * Math.log(vnew / vt);
  }
  return vnew;
}
const bjtP0 = el => ({ sgn: (el.pol || el.kind || 'npn') === 'pnp' ? -1 : 1, is: el.is ?? 1e-14, bf: el.bf ?? 100, br: el.br ?? 2, vt: el.vt ?? VT0, va: el.va ?? Infinity });
const bjtP = el => { const c = el._bp; if (c && c.pol === (el.pol || el.kind) && c.is === el.is && c.bf === el.bf && c.br === el.br && c.vt === el.vt && c.va === el.va) return c.p; el._bp = { pol: el.pol || el.kind, is: el.is, bf: el.bf, br: el.br, vt: el.vt, va: el.va, p: bjtP0(el) }; return el._bp.p; };
function bjtEval(p, vbe, vbc) {
  const ef = expl(vbe / p.vt), er = expl(vbc / p.vt);
  const If = p.is * (ef - 1), Ir = p.is * (er - 1);
  const gf = p.is * dexpl(vbe / p.vt) / p.vt, gr = p.is * dexpl(vbc / p.vt) / p.vt;
  const k = Number.isFinite(p.va) ? Math.max(0, 1 + (vbe - vbc) / p.va) : 1, dk = Number.isFinite(p.va) ? 1 / p.va : 0;
  const ict = (If - Ir) * k;
  return {
    ic: ict - Ir / p.br, ib: If / p.bf + Ir / p.br,
    icbe: gf * k + (If - Ir) * dk, icbc: -gr * k - (If - Ir) * dk - gr / p.br,
    ibbe: gf / p.bf, ibbc: gr / p.br,
  };
}
const mosP = el => ({ sgn: (el.pol || el.kind || 'n') === 'p' ? -1 : 1, vto: el.vto ?? 2, kp: el.kp ?? 0.05, lambda: el.lambda ?? 0.01 });
function mosF(p, vgs, vds) {   // vds ≥ 0 in „effektiver“ Polarität
  const vov = vgs - p.vto; if (vov <= 0) return [0, 0, 0];
  const cl = 1 + p.lambda * vds;
  if (vds < vov) { const core = vov * vds - vds * vds / 2; return [p.kp * core * cl, p.kp * vds * cl, p.kp * (vov - vds) * cl + p.kp * core * p.lambda]; }
  return [p.kp / 2 * vov * vov * cl, p.kp * vov * cl, p.kp / 2 * vov * vov * p.lambda];
}
const oaP = el => {
  const A = el.gain ?? 1e5, r = el.rails === undefined ? [-12, 12] : el.rails;
  return r ? { A, c: (r[0] + r[1]) / 2, h: (r[1] - r[0]) / 2 } : { A, c: 0, h: Infinity };
};
function oaEval(p, x, gscale = 1) {   // → [f, f']
  const A = p.A * gscale;
  if (!Number.isFinite(p.h)) return [A * x, A];
  const th = Math.tanh(A * x / p.h);
  return [p.c + p.h * th, A * (1 - th * th)];
}

// ── Elementtypen ─────────────────────────────────────────────────────────────
/** Anschlussanzahl und Kurzbeschreibung; Parameter siehe CLAUDE.md. */
export const TYPES = {
  R: { nodes: 2, doc: 'Widerstand: value [Ω]' },
  C: { nodes: 2, doc: 'Kondensator: value [F], ic [V] (nur bei uic)' },
  L: { nodes: 2, doc: 'Spule: value [H], ic [A] (nur bei uic)' },
  V: { nodes: 2, doc: 'Spannungsquelle n=[+,−]: dc [V] oder wave, ac (AC-Amplitude/Phase)' },
  I: { nodes: 2, doc: 'Stromquelle: Strom fließt von n[0] durch die Quelle nach n[1]; dc/wave/ac [A]' },
  SW: { nodes: 2, doc: 'Schalter: closed (manuell) | ctl(t)→bool | schedule [[t,closed],…]; ron, roff' },
  D: { nodes: 2, doc: 'Diode n=[Anode,Kathode]: model si|schottky|ge, is, N' },
  LED: { nodes: 2, doc: 'LED: color red|orange|yellow|green|blue|white|ir oder vf [V @10 mA]' },
  ZD: { nodes: 2, doc: 'Z-Diode n=[Anode,Kathode]: vz [V], iz (5 mA)' },
  Q: { nodes: 3, doc: 'BJT n=[C,B,E]: pol npn|pnp, bf, br, is, va' },
  M: { nodes: 3, doc: 'MOSFET Level 1 n=[D,G,S]: pol n|p, vto (Betrag), kp [A/V²], lambda' },
  OA: { nodes: 3, doc: 'Operationsverstärker n=[+,−,out]: gain (1e5), rails [min,max] | null, gbw (nur AC)' },
  E: { nodes: 4, doc: 'VCVS n=[o+,o−,c+,c−]: gain' },
  G: { nodes: 4, doc: 'VCCS n=[o+,o−,c+,c−]: gm [S]' },
  K: { nodes: 0, doc: 'Kopplung zweier Spulen: l1, l2 (Namen), k' },
  T: { nodes: 4, doc: 'Transformator n=[p1,p2,s1,s2]: lp [H], ratio (Np/Ns) oder ls, k (0.999)' },
};
const NONLIN = new Set(['D', 'LED', 'ZD', 'Q', 'M', 'OA']);
const HASBR = new Set(['V', 'L', 'OA', 'E']);
const GNDS = new Set(['0', 'gnd', 'GND', 'Gnd', 'masse', 'Masse']);

function expandT(el) {
  const T = el;
  const mk = (suffix, nodes, val) => { const o = { type: 'L', name: T.name + suffix, n: nodes }; Object.defineProperty(o, 'value', { get: val, enumerable: true }); return o; };
  const lp = mk('.p', [T.n[0], T.n[1]], () => T.lp ?? 1);
  const ls = mk('.s', [T.n[2], T.n[3]], () => T.ls ?? (T.lp ?? 1) / ((T.ratio ?? 1) ** 2));
  const k = { type: 'K', name: T.name + '.k', l1: lp.name, l2: ls.name }; Object.defineProperty(k, 'k', { get: () => T.k ?? 0.999 });
  return [lp, ls, k];
}

/** Fluent-Builder für Netzlisten. Methoden geben `this` zurück; get(name) liefert das Element zum Ändern. */
export class Netlist {
  constructor(elements = []) { this.elements = elements; }
  add(type, name, n, props = {}) { this.elements.push({ type, name, n, ...props }); return this; }
  get(name) { return this.elements.find(e => e.name === name); }
  /** set('R1', 2200) setzt value; set('V1', { dc: 3 }) mischt Eigenschaften ein. */
  set(name, v) { const e = this.get(name); if (!e) throw new CircuitError(`Element "${name}" nicht gefunden`, 'name'); if (typeof v === 'object') Object.assign(e, v); else e.value = v; return this; }
  R(name, a, b, value) { return this.add('R', name, [a, b], { value }); }
  C(name, a, b, value, ic) { return this.add('C', name, [a, b], { value, ic }); }
  L(name, a, b, value, ic) { return this.add('L', name, [a, b], { value, ic }); }
  V(name, p, m, spec = 0) { return this.add('V', name, [p, m], typeof spec === 'number' ? { dc: spec } : spec); }
  I(name, a, b, spec = 0) { return this.add('I', name, [a, b], typeof spec === 'number' ? { dc: spec } : spec); }
  SW(name, a, b, props = {}) { return this.add('SW', name, [a, b], props); }
  D(name, a, k, props = {}) { return this.add('D', name, [a, k], props); }
  LED(name, a, k, props = {}) { return this.add('LED', name, [a, k], props); }
  ZD(name, a, k, props = {}) { return this.add('ZD', name, [a, k], props); }
  Q(name, c, b, e, props = {}) { return this.add('Q', name, [c, b, e], props); }
  M(name, d, g, s, props = {}) { return this.add('M', name, [d, g, s], props); }
  OA(name, p, m, out, props = {}) { return this.add('OA', name, [p, m, out], props); }
  E(name, op, om, cp, cm, gain) { return this.add('E', name, [op, om, cp, cm], { gain }); }
  G(name, op, om, cp, cm, gm) { return this.add('G', name, [op, om, cp, cm], { gm }); }
  T(name, p1, p2, s1, s2, props = {}) { return this.add('T', name, [p1, p2, s1, s2], props); }
  K(name, l1, l2, k = 0.99) { return this.add('K', name, [], { l1, l2, k }); }
}

// ── Lineare Algebra ──────────────────────────────────────────────────────────
function luFactor(a, n, piv) {
  for (let k = 0; k < n; k++) {
    let p = k, m = Math.abs(a[k * n + k]);
    for (let i = k + 1; i < n; i++) { const v = Math.abs(a[i * n + k]); if (v > m) { m = v; p = i; } }
    piv[k] = p;
    if (!(m > 1e-14)) return k + 1;
    if (p !== k) for (let j = 0; j < n; j++) { const t = a[k * n + j]; a[k * n + j] = a[p * n + j]; a[p * n + j] = t; }
    const d = a[k * n + k];
    for (let i = k + 1; i < n; i++) {
      const f = a[i * n + k] / d; a[i * n + k] = f;
      if (f !== 0) for (let j = k + 1; j < n; j++) a[i * n + j] -= f * a[k * n + j];
    }
  }
  return 0;
}
function luSolve(a, n, piv, b) {
  for (let k = 0; k < n; k++) { const p = piv[k]; if (p !== k) { const t = b[k]; b[k] = b[p]; b[p] = t; } }
  for (let i = 1; i < n; i++) { let s = b[i]; for (let j = 0; j < i; j++) s -= a[i * n + j] * b[j]; b[i] = s; }
  for (let i = n - 1; i >= 0; i--) { let s = b[i]; for (let j = i + 1; j < n; j++) s -= a[i * n + j] * b[j]; b[i] = s / a[i * n + i]; }
}
// komplexes Gauß-Verfahren (in place), Ar/Ai n×n, br/bi Lösung
function cSolve(Ar, Ai, br, bi, n) {
  for (let k = 0; k < n; k++) {
    let p = k, m = Ar[k * n + k] ** 2 + Ai[k * n + k] ** 2;
    for (let i = k + 1; i < n; i++) { const v = Ar[i * n + k] ** 2 + Ai[i * n + k] ** 2; if (v > m) { m = v; p = i; } }
    if (!(m > 1e-28)) return k + 1;
    if (p !== k) {
      for (let j = 0; j < n; j++) { let t = Ar[k * n + j]; Ar[k * n + j] = Ar[p * n + j]; Ar[p * n + j] = t; t = Ai[k * n + j]; Ai[k * n + j] = Ai[p * n + j]; Ai[p * n + j] = t; }
      let t = br[k]; br[k] = br[p]; br[p] = t; t = bi[k]; bi[k] = bi[p]; bi[p] = t;
    }
    const dr = Ar[k * n + k], di = Ai[k * n + k], dd = dr * dr + di * di;
    for (let i = k + 1; i < n; i++) {
      const xr = Ar[i * n + k], xi = Ai[i * n + k]; if (xr === 0 && xi === 0) continue;
      const fr = (xr * dr + xi * di) / dd, fi = (xi * dr - xr * di) / dd;
      for (let j = k; j < n; j++) { const ur = Ar[k * n + j], ui = Ai[k * n + j]; Ar[i * n + j] -= fr * ur - fi * ui; Ai[i * n + j] -= fr * ui + fi * ur; }
      br[i] -= fr * br[k] - fi * bi[k]; bi[i] -= fr * bi[k] + fi * br[k];
    }
  }
  for (let i = n - 1; i >= 0; i--) {
    let sr = br[i], si = bi[i];
    for (let j = i + 1; j < n; j++) { sr -= Ar[i * n + j] * br[j] - Ai[i * n + j] * bi[j]; si -= Ar[i * n + j] * bi[j] + Ai[i * n + j] * br[j]; }
    const dr = Ar[i * n + i], di = Ai[i * n + i], dd = dr * dr + di * di;
    br[i] = (sr * dr + si * di) / dd; bi[i] = (si * dr - sr * di) / dd;
  }
  return 0;
}

// ── Solver ───────────────────────────────────────────────────────────────────
class Solver {
  constructor(net, opts = {}) {
    this.o = { gmin: 1e-12, reltol: 1e-6, vabstol: 1e-9, iabstol: 1e-12, maxIter: 100, lDcR: 1e-6, ...opts };
    this.compile(net);
  }

  compile(net) {
    const src = Array.isArray(net) ? net : net?.elements;
    if (!src) throw new CircuitError('Keine Netzliste übergeben', 'netlist');
    const list = [];
    for (const el of src) el.type === 'T' ? list.push(...expandT(el)) : list.push(el);
    const idx = new Map(), names = [];
    const nid = nm => { nm = String(nm); if (GNDS.has(nm)) return -1; let i = idx.get(nm); if (i === undefined) { i = names.length; names.push(nm); idx.set(nm, i); } return i; };
    const ces = [], byName = new Map(); let auto = 0, touchesGnd = false;
    for (const el of list) {
      const ty = TYPES[el.type];
      if (!ty) throw new CircuitError(`Unbekannter Bauteiltyp "${el.type}" (${el.name ?? '?'})`, 'type');
      const name = el.name ?? el.type + (++auto);
      if (byName.has(name)) throw new CircuitError(`Bauteilname "${name}" doppelt vergeben`, 'dup', { element: name });
      if (el.type !== 'K' && (!el.n || el.n.length !== ty.nodes)) throw new CircuitError(`${name}: ${ty.nodes} Anschlüsse erwartet (n: [...])`, 'nodes', { element: name });
      const ce = { el, type: el.type, name, n: (el.n || []).map(nid), br: -1, st: { v: 0, i: 0 }, vold: [NaN, NaN], coup: [], closed: true, closedC: true, on: 0, onC: 0, pc: null, ii: -1 };
      if (ce.n.some(k => k < 0)) touchesGnd = true;
      if ((el.type === 'R' || el.type === 'L') && !(el.value > 0)) throw new CircuitError(`${name}: Wert muss > 0 sein (ist ${el.value})`, 'value', { element: name });
      if (el.type === 'C' && !(el.value >= 0)) throw new CircuitError(`${name}: Kapazität muss ≥ 0 sein`, 'value', { element: name });
      byName.set(name, ce); ces.push(ce);
    }
    if (!touchesGnd) throw new CircuitError('Kein Massebezug: mindestens ein Anschluss muss an Knoten "0" liegen', 'ground');
    const N = names.length; let nb = 0;
    for (const ce of ces) if (HASBR.has(ce.type)) ce.br = N + nb++;
    for (const ce of ces) if (ce.type === 'K') {
      const a = byName.get(ce.el.l1), b = byName.get(ce.el.l2);
      if (!a || !b || a.type !== 'L' || b.type !== 'L') throw new CircuitError(`${ce.name}: l1/l2 müssen Spulen (L) benennen`, 'coupling', { element: ce.name });
      a.coup.push({ o: b, K: ce.el }); b.coup.push({ o: a, K: ce.el });
    }
    const iNames = [], iIdx = new Map();
    for (const ce of ces) {
      if (ce.type === 'K') continue;
      ce.ii = iNames.length; iNames.push(ce.name);
      if (ce.type === 'Q') iNames.push(ce.name + '.b', ce.name + '.e');
    }
    iNames.forEach((nm, k) => iIdx.set(nm, k));
    this.ces = ces; this.names = names; this.idx = idx; this.byName = byName; this.N = N; this.size = N + nb;
    this.caps = ces.filter(c => c.type === 'C'); this.inds = ces.filter(c => c.type === 'L');
    this.srcs = ces.filter(c => c.type === 'V' || c.type === 'I'); this.sws = ces.filter(c => c.type === 'SW');
    this.nl = ces.filter(c => NONLIN.has(c.type));
    this.nonlinear = this.nl.length > 0;
    this.iNames = iNames; this.iIdx = iIdx; this.iBuf = new Float64Array(iNames.length);
    const n2 = this.size ** 2;
    this.A = new Float64Array(n2); this.B = new Float64Array(this.size); this.LU = new Float64Array(n2); this.piv = new Int32Array(this.size);
    this.xa = new Float64Array(this.size); this.xb = new Float64Array(this.size); this.xn = new Float64Array(this.size);
    this.x = this.xa;
    let ns = 4; for (const ce of ces) ns += 1 + ce.coup.length;
    this.sigA = new Float64Array(ns); this.sigB = new Float64Array(ns); this.sigOK = false;
    this.m = true; this.limited = false;
  }

  singular(col) {
    const k = col - 1;
    if (k < this.N) throw new CircuitError(`Knoten "${this.names[k]}" ist nicht eindeutig bestimmt (schwebender Knoten oder Zweig ohne Bezug zu Masse).`, 'singular', { node: this.names[k] });
    const ce = this.ces.find(c => c.br === k);
    throw new CircuitError(`Zweig ${ce?.name ?? '?'} ist überbestimmt (Spannungsquellen-Schleife, Kurzschluss einer idealen Quelle oder Spule parallel zu einer Quelle).`, 'singular', { element: ce?.name });
  }

  V(x, k) { return k < 0 ? 0 : x[k]; }
  _aA(i, j, v) { if (this.m && i >= 0 && j >= 0) this.A[i * this.size + j] += v; }
  _aB(i, v) { if (i >= 0) this.B[i] += v; }
  _G(a, b, g) { this._aA(a, a, g); this._aA(b, b, g); this._aA(a, b, -g); this._aA(b, a, -g); }
  _Ci(a, b, i) { this._aB(a, -i); this._aB(b, i); }

  dioP(ce) {
    const el = ce.el, c = ce.pc;
    if (c && c.is === el.is && c.N === el.N && c.vt === el.vt && c.vf === el.vf && c.color === el.color && c.model === el.model && c.vz === el.vz && c.iz === el.iz && c.Nz === el.Nz) return c.p;
    ce.pc = { is: el.is, N: el.N, vt: el.vt, vf: el.vf, color: el.color, model: el.model, vz: el.vz, iz: el.iz, Nz: el.Nz, p: dioParams(el) };
    return ce.pc.p;
  }

  /** Diodenspannung (mit optionalem Limiting) */
  dioV(ce, x, limit) {
    const p = this.dioP(ce);
    let v = this.V(x, ce.n[0]) - this.V(x, ce.n[1]);
    if (limit) {
      if (Number.isNaN(ce.vold[0])) ce.vold[0] = v;
      let vl = pnjlim(v, ce.vold[0], p.nvt, p.vcrit);
      if (p.vz) { const w = pnjlim(-(vl + p.vz0), -(ce.vold[0] + p.vz0), p.nvt, p.vcrit); vl = -(w + p.vz0); }
      if (vl !== v) this.limited = true;
      ce.vold[0] = v = vl;
    }
    return v;
  }

  /** Linearisierung für D/Q/M: { i: Klemmenströme in das Bauteil, J: ∂i/∂v, v0: Arbeitspunkt-Klemmenspannungen } */
  lin(ce, x, limit) {
    const V = this.V, n = ce.n, el = ce.el;
    switch (ce.type) {
      case 'D': case 'LED': case 'ZD': {
        const v = this.dioV(ce, x, limit), r = dioEval(this.dioP(ce), v), i = r[0], g = r[1];
        return { i: [i, -i], J: [[g, -g], [-g, g]], v0: [v, 0], on: g > 1e-5 };
      }
      case 'Q': {
        const p = bjtP(el), sg = p.sgn;
        let vbe = sg * (V(x, n[1]) - V(x, n[2])), vbc = sg * (V(x, n[1]) - V(x, n[0]));
        if (limit) {
          if (Number.isNaN(ce.vold[0])) { ce.vold[0] = vbe; ce.vold[1] = vbc; }
          const vc = p.vt * Math.log(p.vt / (Math.SQRT2 * p.is));
          const a = pnjlim(vbe, ce.vold[0], p.vt, vc), b = pnjlim(vbc, ce.vold[1], p.vt, vc);
          if (a !== vbe || b !== vbc) this.limited = true;
          vbe = ce.vold[0] = a; vbc = ce.vold[1] = b;
        }
        const e = bjtEval(p, vbe, vbc);
        const Jc = [-e.icbc, e.icbe + e.icbc, -e.icbe], Jb = [-e.ibbc, e.ibbe + e.ibbc, -e.ibbe], Je = Jc.map((v, k) => -(v + Jb[k]));
        const ic = sg * e.ic, ib = sg * e.ib;
        return { i: [ic, ib, -(ic + ib)], J: [Jc, Jb, Je], v0: [sg * (vbe - vbc), sg * vbe, 0], on: Math.abs(ib) > 1e-9 };
      }
      case 'M': {
        const p = mosP(el), sg = p.sgn, vd = V(x, n[0]), vg = V(x, n[1]), vs = V(x, n[2]);
        const vgs = sg * (vg - vs), vds = sg * (vd - vs);
        let id, Jd;
        if (vds >= 0) { const [I, gm, gds] = mosF(p, vgs, vds); id = sg * I; Jd = [gds, gm, -(gm + gds)]; }
        else { const [I, gm, gds] = mosF(p, sg * (vg - vd), -vds); id = -sg * I; Jd = [gm + gds, -gm, -gds]; }
        return { i: [id, 0, -id], J: [Jd, [0, 0, 0], Jd.map(v => -v)], v0: [vd, vg, vs], on: vgs > p.vto };
      }
    }
  }

  swState(ce, t) {
    const el = ce.el;
    if (typeof el.ctl === 'function') return !!el.ctl(t);
    if (el.schedule) { let s = el.schedule[0]?.[1] ?? false; for (const [ts, v] of el.schedule) if (t >= ts) s = v; return !!s; }
    return !!el.closed;
  }

  srcVal(el, mode, t, srcScale) { return mode === 'dc' ? (this.dcAt != null ? srcAt(el, this.dcAt) : srcDC(el)) * srcScale : srcAt(el, t); }

  /** Matrix (m=true) und rechte Seite aufbauen. mode: 'dc' | 'ic' | 'tran' */
  stamp(m, mode, t, h, x, trap, gscale = 1, srcScale = 1) {
    const A = this.A, B = this.B, n = this.size, N = this.N, V = this.V;
    this.m = m;
    if (m) A.fill(0);
    B.fill(0);
    const cc = trap ? 2 / h : 1 / h;
    for (const ce of this.ces) {
      const el = ce.el, nn = ce.n, a = nn[0], b = nn[1], c = nn[2], d = nn[3], br = ce.br;
      switch (ce.type) {
        case 'R': if (m) this._G(a, b, 1 / el.value); break;
        case 'C':
          if (mode === 'ic') { const g = 1e7; if (m) this._G(a, b, g); this._Ci(a, b, -g * (el.ic ?? 0)); }
          else if (mode === 'tran') { const g = cc * el.value; if (m) this._G(a, b, g); this._Ci(a, b, trap ? -(g * ce.st.v + ce.st.i) : -g * ce.st.v); }
          break;
        case 'L': {
          if (m) { this._aA(a, br, 1); this._aA(b, br, -1); this._aA(br, a, 1); this._aA(br, b, -1); }
          if (mode === 'ic') { if (m) { this._aA(br, a, -1); this._aA(br, b, 1); this._aA(br, br, 1); } this._aB(br, el.ic ?? 0); }
          else if (mode === 'dc') { if (m) this._aA(br, br, -this.o.lDcR); }
          else {
            const Rl = cc * el.value; if (m) this._aA(br, br, -Rl);
            let rhs = -Rl * ce.st.i;
            for (const cp of ce.coup) { const M = cp.K.k * Math.sqrt(el.value * cp.o.el.value); if (m) this._aA(br, cp.o.br, -cc * M); rhs -= cc * M * cp.o.st.i; }
            if (trap) rhs -= ce.st.v;
            this._aB(br, rhs);
          }
          break;
        }
        case 'V': if (m) { this._aA(a, br, 1); this._aA(b, br, -1); this._aA(br, a, 1); this._aA(br, b, -1); } this._aB(br, this.srcVal(el, mode, t, srcScale)); break;
        case 'I': this._Ci(a, b, this.srcVal(el, mode, t, srcScale)); break;
        case 'SW': if (m) this._G(a, b, 1 / (ce.closed ? (el.ron ?? 1e-3) : (el.roff ?? 1e9))); break;
        case 'D': case 'LED': case 'ZD': {
          const v = this.dioV(ce, x, true), r = dioEval(this.dioP(ce), v), g = r[1];
          ce.on = g > 1e-5 ? 1 : 0;
          this._G(a, b, g); this._Ci(a, b, r[0] - g * v);
          break;
        }
        case 'Q': case 'M': {
          const { i, J, v0, on } = this.lin(ce, x, true);
          ce.on = on ? 1 : 0;
          for (let r = 0; r < nn.length; r++) {
            let ieq = i[r]; for (let k = 0; k < nn.length; k++) { this._aA(nn[r], nn[k], J[r][k]); ieq -= J[r][k] * v0[k]; }
            this._aB(nn[r], -ieq);
          }
          break;
        }
        case 'OA': {
          const p = oaP(el), xd = V(x, a) - V(x, b), [f0, fp] = oaEval(p, xd, gscale);
          ce.on = Number.isFinite(p.h) ? (fp > 0.1 * p.A * gscale ? 1 : 0) : 1;
          this._aA(c, br, 1); this._aA(br, c, 1); this._aA(br, a, -fp); this._aA(br, b, fp); this._aB(br, f0 - fp * xd);
          break;
        }
        case 'E': if (m) { this._aA(a, br, 1); this._aA(b, br, -1); this._aA(br, a, 1); this._aA(br, b, -1); this._aA(br, c, -el.gain); this._aA(br, d, el.gain); } break;
        case 'G': if (m) { this._aA(a, c, el.gm); this._aA(a, d, -el.gm); this._aA(b, c, -el.gm); this._aA(b, d, el.gm); } break;
      }
    }
    if (m) for (let i = 0; i < N; i++) A[i * n + i] += this.o.gmin;
  }

  /** Nur rechte Seite (lineare Netze, Matrix im Cache) */
  stampRhs(t, h, trap) {
    const B = this.B, cc = trap ? 2 / h : 1 / h; B.fill(0);
    for (const ce of this.caps) { const g = cc * ce.el.value, ieq = trap ? -(g * ce.st.v + ce.st.i) : -g * ce.st.v, a = ce.n[0], b = ce.n[1]; if (a >= 0) B[a] -= ieq; if (b >= 0) B[b] += ieq; }
    for (const ce of this.inds) {
      const Rl = cc * ce.el.value; let rhs = -Rl * ce.st.i;
      for (const cp of ce.coup) rhs -= cc * cp.K.k * Math.sqrt(ce.el.value * cp.o.el.value) * cp.o.st.i;
      if (trap) rhs -= ce.st.v;
      B[ce.br] += rhs;
    }
    for (const ce of this.srcs) {
      const v = srcAt(ce.el, t);
      if (ce.type === 'V') B[ce.br] += v; else { const a = ce.n[0], b = ce.n[1]; if (a >= 0) B[a] -= v; if (b >= 0) B[b] += v; }
    }
  }

  fillSig(mode, h, trap, out) {
    let k = 0; out[k++] = mode === 'tran' ? h : 0; out[k++] = trap ? 1 : 0; out[k++] = mode === 'ic' ? 2 : mode === 'dc' ? 1 : 0;
    for (const ce of this.ces) {
      const el = ce.el;
      switch (ce.type) {
        case 'R': case 'C': case 'L': out[k++] = el.value; for (const cp of ce.coup) out[k++] = cp.K.k; break;
        case 'SW': out[k++] = ce.closed ? el.ron ?? 1e-3 : -(el.roff ?? 1e9); break;
        case 'E': out[k++] = el.gain; break;
        case 'G': out[k++] = el.gm; break;
      }
    }
    return k;
  }

  /** Gleichungssystem lösen; Ergebnis in `out`. Newton bei nichtlinearen Netzen. */
  solve(mode, t, h, trap, x0, out, gscale = 1, srcScale = 1) {
    const n = this.size;
    if (n === 0) return out;
    const o = this.o;
    if (!this.nonlinear) {
      const k = this.fillSig(mode, h, trap, this.sigB);
      let same = this.sigOK;
      if (same) for (let i = 0; i < k; i++) if (this.sigA[i] !== this.sigB[i]) { same = false; break; }
      if (!same) {
        this.stamp(true, mode, t, h, x0, trap, gscale, srcScale);
        this.LU.set(this.A);
        this.sigOK = false;
        const sg = luFactor(this.LU, n, this.piv);
        if (sg) this.singular(sg);
        this.sigA.set(this.sigB); this.sigOK = true;
      } else if (mode === 'tran') this.stampRhs(t, h, trap);
      else this.stamp(false, mode, t, h, x0, trap, gscale, srcScale);
      out.set(this.B); luSolve(this.LU, n, this.piv, out);
      this.checkFinite(out);
      return out;
    }
    const x = this.xn; x.set(x0);
    for (const ce of this.nl) { ce.vold[0] = NaN; ce.vold[1] = NaN; }
    const B = this.B;
    for (let it = 1; it <= o.maxIter; it++) {
      this.limited = false;
      this.stamp(true, mode, t, h, x, trap, gscale, srcScale);
      this.LU.set(this.A);
      const sg = luFactor(this.LU, n, this.piv);
      if (sg) this.singular(sg);
      out.set(B); luSolve(this.LU, n, this.piv, out);
      this.checkFinite(out);
      let ok = !this.limited;
      for (let i = 0; i < n && ok; i++) {
        const tol = (i < this.N ? o.vabstol : o.iabstol) + o.reltol * Math.max(Math.abs(out[i]), Math.abs(x[i]));
        if (!(Math.abs(out[i] - x[i]) <= tol)) ok = false;
      }
      if (ok) { this.iters = it; return out; }
      const damp = it > 40 ? 0.5 : 1;
      for (let i = 0; i < n; i++) x[i] += damp * (out[i] - x[i]);
    }
    throw new CircuitError('Newton-Verfahren konvergiert nicht (nichtlineares Netz).', 'noconv', { time: t });
  }

  checkFinite(x) {
    for (let i = 0; i < x.length; i++) {
      if (!(Math.abs(x[i]) < 1e8)) {
        const nm = i < this.N ? `Knoten "${this.names[i]}"` : 'ein Zweig';
        throw new CircuitError(`Keine sinnvolle Lösung (${nm} unbestimmt – schwebender Knoten, offener Stromkreis mit Stromquelle oder Quellenschleife?).`, 'nonfinite');
      }
    }
  }

  /** DC-Arbeitspunkt mit Fallbacks (Quellen-Stepping, OPV-Verstärkungs-Stepping). Liefert neues Array. */
  dc(t0 = null) {
    const zero = new Float64Array(this.size), out = new Float64Array(this.size);
    this.dcAt = t0; this.setSwitches(t0 ?? 0, true);
    try { return this.solve('dc', t0 ?? 0, 0, false, zero, out).slice(); }
    catch (e) {
      if (e.code !== 'noconv') throw e;
      try {   // Quellen hochfahren
        const cur = new Float64Array(this.size);
        for (let k = 1; k <= 20; k++) { this.solve('dc', 0, 0, false, cur, out, 1, k / 20); cur.set(out); }
        return cur;
      } catch (e2) {
        if (e2.code !== 'noconv') throw e2;
        const cur = new Float64Array(this.size);   // OPV-Verstärkung hochfahren
        for (const gs of [1e-4, 1e-3, 1e-2, 0.1, 1]) { this.solve('dc', 0, 0, false, cur, out, gs, 1); cur.set(out); }
        return cur;
      }
    }
  }

  /** Schalterzustände zur Zeit t setzen; true, wenn sich einer gegenüber dem letzten bestätigten Schritt ändert. */
  setSwitches(t, commit = false) {
    let ch = false;
    for (const ce of this.sws) { const s = this.swState(ce, t); if (s !== ce.closedC) ch = true; ce.closed = s; if (commit) ce.closedC = s; }
    return ch;
  }
  /** Hat sich ein Betriebszustand (Diode an/aus, OPV gesättigt, MOS/BJT leitend) gegenüber dem letzten Schritt geändert? */
  eventsChanged() { for (const ce of this.nl) if (ce.on !== ce.onC) return true; return false; }
  commitEvents() { for (const ce of this.nl) ce.onC = ce.on; for (const ce of this.sws) ce.closedC = ce.closed; }

  /** Alle Zweigströme (n[0] → n[1] durch das Bauteil) in Array out (Indizes: iNames/iIdx). */
  fillI(x, t, out) {
    const V = this.V;
    for (const ce of this.ces) {
      const el = ce.el, a = ce.n[0], b = ce.n[1], k = ce.ii;
      switch (ce.type) {
        case 'R': out[k] = (V(x, a) - V(x, b)) / el.value; break;
        case 'C': out[k] = ce.st.i; break;
        case 'L': case 'V': case 'E': out[k] = x[ce.br]; break;
        case 'I': out[k] = srcAt(el, t); break;
        case 'SW': out[k] = (V(x, a) - V(x, b)) / (ce.closed ? (el.ron ?? 1e-3) : (el.roff ?? 1e9)); break;
        case 'D': case 'LED': case 'ZD': out[k] = dioEval(this.dioP(ce), V(x, a) - V(x, b))[0]; break;
        case 'Q': { const l = this.lin(ce, x, false); out[k] = l.i[0]; out[k + 1] = l.i[1]; out[k + 2] = l.i[2]; break; }
        case 'M': out[k] = this.lin(ce, x, false).i[0]; break;
        case 'OA': out[k] = -x[ce.br]; break;   // Strom, den der Ausgang in die Schaltung liefert
        case 'G': out[k] = el.gm * (V(x, ce.n[2]) - V(x, ce.n[3])); break;
      }
    }
    return out;
  }

  readout(x, t, into) {
    const v = into?.v ?? {}, i = into?.i ?? {};
    for (let k = 0; k < this.N; k++) v[this.names[k]] = x[k];
    v['0'] = 0;
    this.fillI(x, t, this.iBuf);
    for (let k = 0; k < this.iNames.length; k++) i[this.iNames[k]] = this.iBuf[k];
    return { v, i, t };
  }

  // ── Transient ──
  initTran({ uic = false, method = 'trap', dt }) {
    this.method = method; this.dt = dt; this.t = 0; this.first = true;
    for (const ce of this.ces) { ce.st.v = 0; ce.st.i = 0; ce.vold = [NaN, NaN]; }
    this.setSwitches(0, true);
    let x;
    if (uic) {
      this.dcAt = null;
      x = this.solve('ic', 0, 0, false, new Float64Array(this.size), new Float64Array(this.size));
      for (const ce of this.caps) ce.st.v = ce.el.ic ?? 0;
      for (const ce of this.inds) ce.st.i = ce.el.ic ?? 0;
    } else {
      x = this.dc();
      for (const ce of this.caps) ce.st.v = this.V(x, ce.n[0]) - this.V(x, ce.n[1]);
    }
    for (const ce of this.inds) { ce.st.i = x[ce.br]; ce.st.v = uic ? this.V(x, ce.n[0]) - this.V(x, ce.n[1]) : 0; }
    this.xa.set(x); this.x = this.xa; this.sigOK = false;
    // Betriebszustände am Startpunkt (für die Ereigniserkennung)
    for (const ce of this.nl) {
      if (ce.type === 'OA') { const p = oaP(ce.el); ce.on = Number.isFinite(p.h) ? (oaEval(p, this.V(x, ce.n[0]) - this.V(x, ce.n[1]))[1] > 0.1 * p.A ? 1 : 0) : 1; }
      else ce.on = this.lin(ce, x, false).on ? 1 : 0;
      ce.onC = ce.on;
    }
  }

  tranStep(tNew, h) {
    let trap = this.method === 'trap' && !this.first;
    if (this.setSwitches(tNew)) trap = false;
    const out = this.x === this.xa ? this.xb : this.xa;
    this.solve('tran', tNew, h, trap, this.x, out);
    if (trap && this.eventsChanged()) { trap = false; this.solve('tran', tNew, h, false, this.x, out); }
    const cc = trap ? 2 / h : 1 / h, V = this.V;
    for (const ce of this.caps) { const g = cc * ce.el.value, vn = V(out, ce.n[0]) - V(out, ce.n[1]); const ieq = trap ? -(g * ce.st.v + ce.st.i) : -g * ce.st.v; ce.st.i = g * vn + ieq; ce.st.v = vn; }
    for (const ce of this.inds) { ce.st.i = out[ce.br]; ce.st.v = V(out, ce.n[0]) - V(out, ce.n[1]); }
    this.commitEvents();
    this.x = out; this.first = false; this.t = tNew;
  }

  advance(T, adaptive = true) {
    let h = Math.min(this.dt, T - this.t), t = this.t, fails = 0;
    while (T - t > 1e-12 * this.dt) {
      h = Math.min(h, T - t);
      try { this.tranStep(t + h, h); t = this.t; if (h < this.dt) h = Math.min(this.dt, h * 2); }
      catch (e) { if (!adaptive || e.code !== 'noconv' || ++fails > 12) throw e; h /= 2; }
    }
    this.t = T;
  }
}

const mk = (net, opts) => new Solver(net, opts);

// ── Öffentliche Analysen ─────────────────────────────────────────────────────
/**
 * DC-Arbeitspunkt (Kondensatoren offen, Spulen kurzgeschlossen).
 * @returns {{ v: Object<string,number>, i: Object<string,number>, x: Float64Array }}
 * opts: { t: Zeit für wave-Quellen (Standard: DC-Werte), gmin, … }
 */
export function dcSolve(net, opts = {}) {
  const s = mk(net, opts);
  const x = s.dc(opts.t ?? null);
  const r = s.readout(x, opts.t ?? 0); r.x = x; r.iterations = s.iters;
  return r;
}

/**
 * Zeitbereichsanalyse (Trapez, bei Schalt-/Diodenereignissen Backward-Euler-Neustart).
 * @param {object} o  { tstop, dt, uic=false, method='trap'|'be', adaptive=true (Teilschritte bei Nichtkonvergenz), every=1 (Ausgabe-Dezimierung) }
 * @returns {{ t: Float64Array, v: Object<string,Float64Array>, i: Object<string,Float64Array>, n: number }}
 */
export function transient(net, o = {}) {
  const { tstop, dt, every = 1 } = o;
  if (!(tstop > 0) || !(dt > 0)) throw new CircuitError('transient: tstop und dt müssen > 0 sein', 'args');
  const s = mk(net, o); s.initTran({ uic: o.uic, method: o.method || 'trap', dt });
  const steps = Math.round(tstop / dt), n = Math.floor(steps / every) + 1;
  const res = { t: new Float64Array(n), v: {}, i: {}, n };
  const vArr = s.names.map(nm => res.v[nm] = new Float64Array(n)); res.v['0'] = new Float64Array(n);
  const iArr = s.iNames.map(nm => res.i[nm] = new Float64Array(n));
  const put = j => { res.t[j] = s.t; for (let k = 0; k < vArr.length; k++) vArr[k][j] = s.x[k]; s.fillI(s.x, s.t, s.iBuf); for (let k = 0; k < iArr.length; k++) iArr[k][j] = s.iBuf[k]; };
  put(0);
  for (let k = 1; k <= steps; k++) { s.advance(k * dt, o.adaptive !== false); if (k % every === 0) put(k / every); }
  return res;
}

/**
 * Schrittweiser Simulator für Live-Animationen: sim.step(), sim.v('out'), sim.i('R1').
 * Parameter der Elemente dürfen zwischen den Schritten geändert werden (Matrix wird automatisch neu faktorisiert).
 * Struktur ändern (Bauteile hinzufügen/entfernen) → neues createSim.
 */
export function createSim(net, o = {}) {
  const dt = o.dt ?? 1e-6;
  const s = mk(net, o); s.initTran({ uic: o.uic, method: o.method || 'trap', dt });
  const sim = {
    get t() { return s.t; }, get dt() { return s.dt; }, set dt(v) { s.dt = v; },
    step(n = 1) { for (let k = 0; k < n; k++) s.advance(s.t + s.dt, o.adaptive !== false); return sim; },
    run(tstop) { while (s.t < tstop - 1e-12 * s.dt) sim.step(); return sim; },
    v(name) { const k = s.idx.get(String(name)); return k === undefined ? 0 : s.x[k]; },
    vd(a, b) { return sim.v(a) - sim.v(b); },
    /** Zweigstrom (n[0] → n[1]) */
    i(name) { const k = s.iIdx.get(name); if (k === undefined) return undefined; s.fillI(s.x, s.t, s.iBuf); return s.iBuf[k]; },
    /** Alle Ströme in ein Objekt (für Schaltplan-Animation): sim.currents(obj) */
    currents(into = {}) { s.fillI(s.x, s.t, s.iBuf); for (let k = 0; k < s.iNames.length; k++) into[s.iNames[k]] = s.iBuf[k]; return into; },
    voltages(into = {}) { for (let k = 0; k < s.N; k++) into[s.names[k]] = s.x[k]; into['0'] = 0; return into; },
    snapshot() { return s.readout(s.x, s.t); },
    reset() { s.initTran({ uic: o.uic, method: o.method || 'trap', dt: s.dt }); return sim; },
    solver: s,
  };
  return sim;
}

// ── AC ───────────────────────────────────────────────────────────────────────
function acRun(s, freqs, xop) {
  const n = s.size, N = s.N, nf = freqs.length;
  const Ar = new Float64Array(n * n), Ai = new Float64Array(n * n), br = new Float64Array(n), bi = new Float64Array(n);
  const XR = Array.from({ length: n }, () => new Float64Array(nf)), XI = Array.from({ length: n }, () => new Float64Array(nf));
  const lins = new Map();
  for (const ce of s.ces) if (['D', 'LED', 'ZD', 'Q', 'M'].includes(ce.type)) lins.set(ce, s.lin(ce, xop, false));
  for (let k = 0; k < nf; k++) {
    const w = TAU * freqs[k];
    Ar.fill(0); Ai.fill(0); br.fill(0); bi.fill(0);
    const aA = (i, j, re, im = 0) => { if (i >= 0 && j >= 0) { Ar[i * n + j] += re; Ai[i * n + j] += im; } };
    const aB = (i, re, im = 0) => { if (i >= 0) { br[i] += re; bi[i] += im; } };
    const Y = (a, b, re, im) => { aA(a, a, re, im); aA(b, b, re, im); aA(a, b, -re, -im); aA(b, a, -re, -im); };
    for (const ce of s.ces) {
      const el = ce.el, [a, b, c, d] = ce.n, brn = ce.br;
      switch (ce.type) {
        case 'R': Y(a, b, 1 / el.value, 0); break;
        case 'C': Y(a, b, 0, w * el.value); break;
        case 'L': {
          aA(a, brn, 1); aA(b, brn, -1); aA(brn, a, 1); aA(brn, b, -1); aA(brn, brn, 0, -w * el.value);
          for (const cp of ce.coup) aA(brn, cp.o.br, 0, -w * cp.K.k * Math.sqrt(el.value * cp.o.el.value));
          break;
        }
        case 'V': { aA(a, brn, 1); aA(b, brn, -1); aA(brn, a, 1); aA(brn, b, -1); const [m, ph] = srcAC(el); aB(brn, m * Math.cos(ph), m * Math.sin(ph)); break; }
        case 'I': { const [m, ph] = srcAC(el); aB(a, -m * Math.cos(ph), -m * Math.sin(ph)); aB(b, m * Math.cos(ph), m * Math.sin(ph)); break; }
        case 'SW': Y(a, b, 1 / (ce.closed ? (el.ron ?? 1e-3) : (el.roff ?? 1e9)), 0); break;
        case 'D': case 'LED': case 'ZD': case 'Q': case 'M': { const { J } = lins.get(ce); for (let r = 0; r < ce.n.length; r++) for (let q = 0; q < ce.n.length; q++) aA(ce.n[r], ce.n[q], J[r][q]); break; }
        case 'OA': {
          const p = oaP(el), [, fp] = oaEval(p, s.V(xop, a) - s.V(xop, b));
          let re = fp, im = 0;
          if (el.gbw) { const wp = TAU * el.gbw / p.A, u = w / wp; re = fp / (1 + u * u); im = -fp * u / (1 + u * u); }
          aA(c, brn, 1); aA(brn, c, 1); aA(brn, a, -re, -im); aA(brn, b, re, im);
          break;
        }
        case 'E': aA(a, brn, 1); aA(b, brn, -1); aA(brn, a, 1); aA(brn, b, -1); aA(brn, c, -el.gain); aA(brn, d, el.gain); break;
        case 'G': aA(a, c, el.gm); aA(a, d, -el.gm); aA(b, c, -el.gm); aA(b, d, el.gm); break;
      }
    }
    for (let i = 0; i < N; i++) Ar[i * n + i] += s.o.gmin;
    const sg = cSolve(Ar, Ai, br, bi, n);
    if (sg) s.singular(sg);
    for (let i = 0; i < n; i++) { XR[i][k] = br[i]; XI[i][k] = bi[i]; }
  }
  return { XR, XI };
}

function acResult(s, freqs, XR, XI, xop) {
  const nf = freqs.length, f = Float64Array.from(freqs);
  const zero = new Float64Array(nf);
  const get = nm => {
    const k = nm === '0' || GNDS.has(String(nm)) ? -1 : s.idx.get(String(nm));
    if (k === undefined) throw new CircuitError(`Knoten "${nm}" existiert nicht`, 'node');
    return k < 0 ? [zero, zero] : [XR[k], XI[k]];
  };
  const unwrap = ph => { const o = Float64Array.from(ph); for (let k = 1; k < o.length; k++) { let d = o[k] - o[k - 1]; d -= 360 * Math.round(d / 360); o[k] = o[k - 1] + d; } return o; };
  const cplx = (re, im) => ({
    re, im, f,
    mag: Float64Array.from(re, (r, k) => Math.hypot(r, im[k])),
    db: Float64Array.from(re, (r, k) => 20 * Math.log10(Math.max(Math.hypot(r, im[k]), 1e-300))),
    phase: unwrap(Float64Array.from(re, (r, k) => Math.atan2(im[k], r) * 180 / Math.PI)),
  });
  const diff = (a, b) => { const [ar, ai] = get(a), [br, bi] = b == null ? [zero, zero] : get(b); return [Float64Array.from(ar, (v, k) => v - br[k]), Float64Array.from(ai, (v, k) => v - bi[k])]; };
  const res = {
    f, nodes: s.names.slice(),
    /** Komplexe Spannung (Knoten a, optional gegen b): { re, im, mag, db, phase(°, entfaltet) } */
    v(a, b) { const [re, im] = diff(a, b); return cplx(re, im); },
    mag: (a, b) => res.v(a, b).mag, db: (a, b) => res.v(a, b).db, phase: (a, b) => res.v(a, b).phase,
    /** Übertragungsfunktion v(out)/v(ref) */
    h(out, ref) {
      const [or, oi] = get(out), [rr, ri] = get(ref);
      const re = new Float64Array(nf), im = new Float64Array(nf);
      for (let k = 0; k < nf; k++) { const d = rr[k] ** 2 + ri[k] ** 2; re[k] = (or[k] * rr[k] + oi[k] * ri[k]) / d; im[k] = (oi[k] * rr[k] - or[k] * ri[k]) / d; }
      return cplx(re, im);
    },
    /** Komplexer Strom durch ein Element (n[0] → n[1]) */
    i(name) {
      const ce = s.byName.get(name); if (!ce) throw new CircuitError(`Element "${name}" nicht gefunden`, 'name');
      const re = new Float64Array(nf), im = new Float64Array(nf), [a, b] = ce.n, el = ce.el;
      const vd = (k) => [(a < 0 ? 0 : XR[a][k]) - (b < 0 ? 0 : XR[b][k]), (a < 0 ? 0 : XI[a][k]) - (b < 0 ? 0 : XI[b][k])];
      for (let k = 0; k < nf; k++) {
        const w = TAU * f[k], [vr, vi] = vd(k);
        switch (ce.type) {
          case 'R': re[k] = vr / el.value; im[k] = vi / el.value; break;
          case 'C': re[k] = -w * el.value * vi; im[k] = w * el.value * vr; break;
          case 'L': case 'V': case 'E': re[k] = XR[ce.br][k]; im[k] = XI[ce.br][k]; break;
          case 'I': { const [m, ph] = srcAC(el); re[k] = m * Math.cos(ph); im[k] = m * Math.sin(ph); break; }
          case 'SW': { const g = 1 / (ce.closed ? (el.ron ?? 1e-3) : (el.roff ?? 1e9)); re[k] = g * vr; im[k] = g * vi; break; }
          case 'OA': re[k] = -XR[ce.br][k]; im[k] = -XI[ce.br][k]; break;
          default: throw new CircuitError(`i(): Elementtyp ${ce.type} wird für AC-Ströme nicht unterstützt`, 'type');
        }
      }
      return cplx(re, im);
    },
    xop,
  };
  return res;
}

/**
 * Kleinsignal-Frequenzgang. Quellen: V/I mit `ac` (Betrag oder [Betrag, Phase°]) bzw. Amplitude ihrer `wave`.
 * Nichtlineare Bauteile werden am DC-Arbeitspunkt linearisiert.
 * @param {number[]} freqs  z. B. logspace(10, 1e6, 200)
 * @returns Ergebnisobjekt mit res.v('out'), res.db('out'), res.phase('out'), res.h('out','in'), res.i('R1')
 */
export function acSweep(net, freqs, opts = {}) {
  const s = mk(net, opts);
  s.setSwitches(0);
  const xop = s.nonlinear ? s.dc() : new Float64Array(s.size);
  const { XR, XI } = acRun(s, freqs, xop);
  return acResult(s, freqs, XR, XI, xop);
}

/**
 * Impedanz zwischen zwei Knoten (alle anderen Quellen = 0). port: ['a', 'b'] oder 'a' (gegen Masse).
 * @returns {{ f, re, im, mag, phase }}   Z = Re + jIm in Ω, phase in Grad
 */
export function impedance(net, port, freqs, opts = {}) {
  const [pa, pb = '0'] = Array.isArray(port) ? port : [port];
  const src = Array.isArray(net) ? net : net.elements;
  const els = src.map(e => (e.type === 'V' || e.type === 'I') ? Object.assign(Object.create(Object.getPrototypeOf(e)), e, { ac: 0 }) : e);
  els.push({ type: 'I', name: '__ztest', n: [pb, pa], dc: 0, ac: 1 });
  const r = acSweep(els, freqs, opts), z = r.v(pa, pb);
  return { f: r.f, re: z.re, im: z.im, mag: z.mag, phase: z.phase };
}

// ── Auswertung von Sweeps ────────────────────────────────────────────────────
const arr = a => Array.from(a);
/** Phase entfalten (Grad). */
export function unwrapPhase(ph) { const o = arr(ph); for (let k = 1; k < o.length; k++) { let d = o[k] - o[k - 1]; d -= 360 * Math.round(d / 360); o[k] = o[k - 1] + d; } return o; }
/** Frequenz des Betragsmaximums (parabolisch in log f / dB verfeinert). mag: lineare Beträge. */
export function resonanceFreq(f, mag) {
  let k = 0; for (let i = 1; i < mag.length; i++) if (mag[i] > mag[k]) k = i;
  if (k === 0 || k === mag.length - 1) return f[k];
  const x0 = Math.log(f[k - 1]), x1 = Math.log(f[k]), x2 = Math.log(f[k + 1]);
  const y0 = Math.log(mag[k - 1]), y1 = Math.log(mag[k]), y2 = Math.log(mag[k + 1]);
  const den = (x1 - x0) * (y1 - y2) - (x1 - x2) * (y1 - y0);
  if (!den) return f[k];
  const xv = x1 - 0.5 * ((x1 - x0) ** 2 * (y1 - y2) - (x1 - x2) ** 2 * (y1 - y0)) / den;   // Scheitel der Parabel durch 3 Punkte
  return Math.exp(Math.min(x2, Math.max(x0, xv)));
}
function crossing(f, y, level, from, step) {   // erster Durchgang durch `level` ab Index `from` in Richtung `step`
  for (let i = from; i + step >= 0 && i + step < y.length; i += step) {
    const a = y[i], b = y[i + step];
    if ((a - level) * (b - level) <= 0 && a !== b) {
      const t = (level - a) / (b - a);
      return Math.exp(Math.log(f[i]) + t * (Math.log(f[i + step]) - Math.log(f[i])));
    }
  }
  return NaN;
}
/** −3-dB-Grenzfrequenz relativ zu `ref` (Standard: Betrag am Rand mit dem größeren Wert; 'max' = Spitze). edge: 'auto'|'low'|'high' */
export function cutoff3dB(f, mag, { ref = 'auto', drop = 1 / Math.SQRT2 } = {}) {
  const last = mag.length - 1;
  let r = typeof ref === 'number' ? ref : ref === 'max' ? Math.max(...mag) : Math.max(mag[0], mag[last]);
  const level = r * drop;
  if (mag[0] >= mag[last]) return crossing(f, mag, level, 0, 1);       // Tiefpass: von links
  return crossing(f, mag, level, last, -1);                              // Hochpass: von rechts
}
/** Bandpass-Kennwerte aus dem Betragsgang: { f0, f1, f2, bw, q, peak } (−3 dB um das Maximum). */
export function qFactor(f, mag) {
  const f0 = resonanceFreq(f, mag);
  let k = 0; for (let i = 1; i < mag.length; i++) if (mag[i] > mag[k]) k = i;
  const peak = mag[k], level = peak / Math.SQRT2;
  const f1 = crossing(f, mag, level, k, -1), f2 = crossing(f, mag, level, k, 1);
  const bw = f2 - f1;
  return { f0, f1, f2, bw, q: f0 / bw, peak };
}
export { Solver as _Solver };
