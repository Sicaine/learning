// filter-lab — Filter ausprobieren: RC-/RL-Tief- und Hochpass, Filter höherer Ordnung (RC-Kaskade, Butterworth, Bessel),
// Bandpass und Bandsperre aus einem LC-Reihenkreis. Bode-Diagramm (Betrag + Phase), f_g-Marker, Zeitbereich mit Sinus oder
// Rechteck (Grundwelle + Oberwellen) am Eingang und Ausgang.
//
// params:
//   builds?:  ['rc','rl'] (Standard) | Teilmenge von 'rc','rl','order','lc' — welche Aufbauten wählbar sind (Reihenfolge = Reihenfolge der Knöpfe)
//   build?:   Startaufbau (Standard: erster in builds), type?: 'tp'|'hp'|'bp'|'bs', n?: 1–4, response?: 'rc'|'butter'|'bessel'
//   init?:    { R, C, L, fc, Rb, Lb, Cb, fin } Startwerte
//   fmin?, fmax?: Frequenzachse (Standard 10 Hz … 100 MHz), signal?: 'sine'|'square' (Start)
//   goals?:   [{ id, label, test(s) }] — s = { build, type, n, response, fg, f0, B, Q, R, C, L, fin, att(f) }; att(f) = Dämpfung in dB (positiv = gedämpft)
//             Ohne goals: Ziel "f_g ≈ targetFg (± tol)".   targetFg?: Hz, tol?: relativ
import { Netlist, acSweep, logspace } from '../../../assets/js/vizkit/circuit.js';
import { bode, plot } from '../../../assets/js/vizkit/plot.js';
import { drawSchematic } from '../../../assets/js/vizkit/schematic.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { fmt } from '../../../assets/js/vizkit/si.js';
import { h } from '../../../assets/js/vizkit/base.js';

const TAU = 2 * Math.PI, RAD = 180 / Math.PI;
// ── kleine komplexe Arithmetik ──
const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
const cdiv = (a, b) => { const d = b[0] * b[0] + b[1] * b[1]; return [(a[0] * b[0] + a[1] * b[1]) / d, (a[1] * b[0] - a[0] * b[1]) / d]; };
const cabs = a => Math.hypot(a[0], a[1]);
const polyEval = (coef, s) => coef.reduce((acc, c) => { const m = cmul(acc, s); return [m[0] + c, m[1]]; }, [0, 0]);   // coef: höchste Potenz zuerst

// Bessel-Polynome (Thomson), höchste Potenz zuerst
const BESSEL = { 1: [1, 1], 2: [1, 3, 3], 3: [1, 6, 15, 15], 4: [1, 10, 45, 105, 105] };
const kappa = {};
for (const n of [1, 2, 3, 4]) {   // Skalierung so, dass |H(j·1)| = 1/√2 (−3 dB bei f_c)
  let lo = 0.05, hi = 10;
  for (let i = 0; i < 60; i++) { const k = (lo + hi) / 2, m = BESSEL[n][n] / cabs(polyEval(BESSEL[n], [0, k])); if (m > Math.SQRT1_2) lo = k; else hi = k; }
  kappa[n] = (lo + hi) / 2;
}
/** Tiefpass-Übertragungsfunktion H(jΩ), Ω = f/f_c (−3 dB bei Ω = 1) */
function hLow(resp, n, W) {
  const s = [0, W];
  if (resp === 'rc') { const a = Math.sqrt(2 ** (1 / n) - 1), z = [1, W * a]; let r = [1, 0]; for (let i = 0; i < n; i++) r = cdiv(r, z); return r; }
  if (resp === 'butter') {
    let d = [1, 0];
    for (let k = 1; k <= n; k++) { const ph = Math.PI * (2 * k + n - 1) / (2 * n); d = cmul(d, [s[0] - Math.cos(ph), s[1] - Math.sin(ph)]); }
    return cdiv([1, 0], d);
  }
  return cdiv([BESSEL[n][n], 0], polyEval(BESSEL[n], [0, W * kappa[n]]));
}

const unwrap = ph => { const o = ph.slice(); for (let i = 1; i < o.length; i++) { let d = o[i] - o[i - 1]; d -= 360 * Math.round(d / 360); o[i] = o[i - 1] + d; } return o; };
function crossings(f, mag, level) {
  const out = [];
  for (let i = 1; i < f.length; i++) {
    const a = mag[i - 1] - level, b = mag[i] - level;
    if (a * b < 0 || (b === 0 && a !== 0)) { const t = a / (a - b); out.push(Math.exp(Math.log(f[i - 1]) + t * (Math.log(f[i]) - Math.log(f[i - 1])))); }
  }
  return out;
}

/** Netzlisten der Aufbauten (Knoten in/out; Elementnamen = Schaltplan-ids) */
function netOf(st) {
  const n = new Netlist().V('V1', 'in', '0', { ac: 1 });
  const { build, type } = st;
  if (build === 'rc') { if (type === 'tp') n.R('S', 'in', 'out', st.R).C('P', 'out', '0', st.C); else n.C('S', 'in', 'out', st.C).R('P', 'out', '0', st.R); }
  else if (build === 'rl') { if (type === 'tp') n.L('S', 'in', 'out', st.L).R('P', 'out', '0', st.R); else n.R('S', 'in', 'out', st.R).L('P', 'out', '0', st.L); }
  else if (build === 'lc') {
    const r = TAU * (1 / (TAU * Math.sqrt(st.Lb * st.Cb))) * st.Lb / 200;   // Spulenverlust (Güte 200)
    if (type === 'bp') n.L('L1', 'in', 'a', st.Lb).R('Rs', 'a', 'b', r).C('C1', 'b', 'out', st.Cb).R('R1', 'out', '0', st.Rb);
    else n.R('R1', 'in', 'out', st.Rb).L('L1', 'out', 'a', st.Lb).R('Rs', 'a', 'b', r).C('C1', 'b', '0', st.Cb);
  }
  return n;
}

function schematicSpec(st) {
  const { build, type } = st;
  const base = { grid: 16 };
  if (build === 'lc') {
    if (type === 'bp') return { ...base, parts: [
      { id: 'V1', type: 'VAC', at: [2, 3], rot: 90, label: 'u₁' }, { id: 'L1', type: 'L', at: [6, 3], value: st.Lb }, { id: 'C1', type: 'C', at: [11, 3], value: st.Cb },
      { id: 'R1', type: 'R', at: [16, 3], rot: 90, value: st.Rb }, { id: 'out', type: 'TERM', at: [19, 3], label: 'u₂', labelPos: 'r' }, { type: 'GND', at: [9, 9] }],
      wires: [['V1.a', 'L1.a'], ['L1.b', 'C1.a'], ['C1.b', [16, 3], 'out.a'], ['V1.b', [2, 9], [16, 9], 'R1.b']] };
    return { ...base, parts: [
      { id: 'V1', type: 'VAC', at: [2, 3], rot: 90, label: 'u₁' }, { id: 'R1', type: 'R', at: [6, 3], value: st.Rb }, { id: 'L1', type: 'L', at: [13, 3], rot: 90, value: st.Lb },
      { id: 'C1', type: 'C', at: [13, 7], rot: 90, value: st.Cb }, { id: 'out', type: 'TERM', at: [17, 3], label: 'u₂', labelPos: 'r' }, { type: 'GND', at: [8, 11] }],
      wires: [['V1.a', 'R1.a'], ['R1.b', 'L1.a', 'out.a'], ['V1.b', [2, 11], [13, 11], 'C1.b']] };
  }
  const el = { rc: type === 'tp' ? ['R', 'C'] : ['C', 'R'], rl: type === 'tp' ? ['L', 'R'] : ['R', 'L'] }[build];
  const val = t => ({ R: st.R, C: st.C, L: st.L }[t]);
  return { ...base, parts: [
    { id: 'V1', type: 'VAC', at: [2, 3], rot: 90, label: 'u₁' }, { id: 'S', type: el[0], at: [6, 3], value: val(el[0]) }, { id: 'P', type: el[1], at: [12, 3], rot: 90, value: val(el[1]) },
    { id: 'out', type: 'TERM', at: [16, 3], label: 'u₂', labelPos: 'r' }, { type: 'GND', at: [7, 9] }],
    wires: [['V1.a', 'S.a'], ['S.b', 'P.a', 'out.a'], ['V1.b', [2, 9], [12, 9], 'P.b']] };
}

/** Übertragungsfunktion als Funktion freqs → { db, phase, mag } */
function transferOf(st) {
  if (st.build === 'order') {
    return fr => {
      const mag = [], ph = [];
      for (const f of fr) {
        let H = st.type === 'tp' ? hLow(st.response, st.n, f / st.fc) : (() => { const c = hLow(st.response, st.n, st.fc / f); return [c[0], -c[1]]; })();
        mag.push(cabs(H)); ph.push(Math.atan2(H[1], H[0]) * RAD);
      }
      return { mag, db: mag.map(m => 20 * Math.log10(Math.max(m, 1e-300))), phase: unwrap(ph) };
    };
  }
  const net = netOf(st);
  return fr => { const ac = acSweep(net, fr); return { mag: Array.from(ac.mag('out')), db: Array.from(ac.db('out')), phase: Array.from(ac.phase('out')) }; };
}

const TYPE_NAMES = { tp: 'Tiefpass', hp: 'Hochpass', bp: 'Bandpass', bs: 'Bandsperre' };

export default function mount(stage, { params = {}, complete }) {
  const builds = params.builds ?? ['rc', 'rl'];
  const bname = { rc: 'RC-Glied', rl: 'RL-Glied', order: 'Ordnung n', lc: 'LC-Kreis' };
  const fmin = params.fmin ?? 10, fmax = params.fmax ?? 1e8;
  const init = { R: 1e3, C: 100e-9, L: 10e-3, fc: 1e3, Rb: 22, Lb: 5.03e-6, Cb: 100e-12, fin: 1e3, ...params.init };
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const schWrap = h('div', { style: 'max-width:520px;width:100%;margin:0 auto' }); root.append(schWrap);
  const orderNote = h('div', { class: 'vz-note', style: 'text-align:center' }); root.append(orderNote);

  const ui = controls(root, [
    ...(builds.length > 1 ? [{ id: 'build', type: 'seg', label: 'Aufbau', options: builds.map(b => [b, bname[b]]), value: params.build ?? builds[0] }] : []),
    { id: 'type', type: 'seg', label: 'Filterart', options: [['tp', 'Tiefpass'], ['hp', 'Hochpass']], value: ['tp', 'hp'].includes(params.type) ? params.type : 'tp' },
    { id: 'btype', type: 'seg', label: 'Filterart', options: [['bp', 'Bandpass'], ['bs', 'Bandsperre']], value: ['bp', 'bs'].includes(params.type) ? params.type : 'bp' },
    { id: 'R', label: 'Widerstand R', unit: 'Ω', min: 10, max: 1e6, value: init.R, scale: 'log', snap: 'E12' },
    { id: 'C', label: 'Kapazität C', unit: 'F', min: 10e-12, max: 10e-6, value: init.C, scale: 'log', snap: 'E12' },
    { id: 'L', label: 'Induktivität L', unit: 'H', min: 1e-6, max: 1, value: init.L, scale: 'log', snap: 'E12' },
    { id: 'n', type: 'seg', label: 'Ordnung n', options: [[1, '1'], [2, '2'], [3, '3'], [4, '4']], value: params.n ?? 1 },
    { id: 'response', type: 'seg', label: 'Bauart', options: [['rc', 'RC-Stufen'], ['butter', 'Butterworth'], ['bessel', 'Bessel']], value: params.response ?? 'rc' },
    { id: 'fc', label: 'Grenzfrequenz f_g', unit: 'Hz', min: 10, max: 1e8, value: init.fc, scale: 'log' },
    { id: 'Rb', label: 'Widerstand R', unit: 'Ω', min: 0.5, max: 1000, value: init.Rb, scale: 'log' },
    { id: 'Lb', label: 'Induktivität L', unit: 'H', min: 100e-9, max: 10e-3, value: init.Lb, scale: 'log' },
    { id: 'Cb', label: 'Kapazität C', unit: 'F', min: 1e-12, max: 10e-9, value: init.Cb, scale: 'log' },
    { id: 'sig', type: 'seg', label: 'Eingangssignal', options: [['sine', 'Sinus'], ['square', 'Rechteck']], value: params.signal ?? 'square' },
    { id: 'fin', label: 'Signalfrequenz f', unit: 'Hz', min: 10, max: 30e6, value: init.fin, scale: 'log' },
  ], run);
  const show = (id, on) => { const b = ui.el.querySelector(`[data-id="${id}"]`); if (b) b.style.display = on ? '' : 'none'; };

  const out = readout(root, [
    { id: 'k1', label: 'f_g', hl: true }, { id: 'k2', label: 'a(10·f_g)' }, { id: 'k3', label: 'a(f)' }, { id: 'k4', label: 'φ(f)' },
  ]);
  const goalDefs = params.goals ?? [{ id: 'fg', label: `f_g ≈ ${fmt(params.targetFg ?? 1e3, 'Hz')} (±${Math.round((params.tol ?? 0.07) * 100)} %)`, test: s => Number.isFinite(s.fg) && Math.abs(s.fg / (params.targetFg ?? 1e3) - 1) <= (params.tol ?? 0.07) }];
  const g = goals(root, goalDefs.map(({ id, label }) => ({ id, label })), () => complete?.());

  let bd = null, bdKey = '';
  const bodeHolder = h('div'); root.append(bodeHolder);
  const tTitle = h('div', { class: 'vz-note', style: 'margin:6px 0 -6px' }); root.append(tTitle);
  const pt = plot(root, { x: { unit: 's', label: 't' }, y: { unit: 'V', label: 'u', include: [0] }, legend: true, h: 230 });
  const note = h('p', { class: 'vz-note', style: 'margin:0' }); root.append(note);
  let sch = null, schKey = '';

  function run() {
    const v = ui.values, build = v.build ?? builds[0];
    const band = build === 'lc', type = band ? v.btype : v.type;
    show('type', !band); show('btype', band);
    show('R', build === 'rc' || build === 'rl'); show('C', build === 'rc'); show('L', build === 'rl');
    show('n', build === 'order'); show('response', build === 'order'); show('fc', build === 'order');
    show('Rb', band); show('Lb', band); show('Cb', band);
    const st = { build, type, n: +v.n, response: v.response, fc: v.fc, R: v.R, C: v.C, L: v.L, Rb: v.Rb, Lb: v.Lb, Cb: v.Cb };

    // Schaltplan
    if (build === 'order') { schWrap.style.display = 'none'; sch = null; schKey = ''; orderNote.textContent = `${st.n} ${st.response === 'rc' ? 'gleiche RC-Stufen, durch Puffer entkoppelt' : (st.response === 'butter' ? 'Butterworth-Stufen' : 'Bessel-Stufen')} hintereinander — f_g ist der −3-dB-Punkt des gesamten Filters.`; }
    else {
      orderNote.textContent = ''; schWrap.style.display = '';
      const key = build + type;
      if (key !== schKey) { schKey = key; schWrap.replaceChildren(); sch = drawSchematic(schWrap, schematicSpec(st)); }
      if (build === 'lc') { sch.set('R1', { value: st.Rb }); sch.set('L1', { value: st.Lb }); sch.set('C1', { value: st.Cb }); }
      else { const el = { rc: type === 'tp' ? ['R', 'C'] : ['C', 'R'], rl: type === 'tp' ? ['L', 'R'] : ['R', 'L'] }[build], val = t => ({ R: st.R, C: st.C, L: st.L }[t]); sch.set('S', { value: val(el[0]) }); sch.set('P', { value: val(el[1]) }); }
    }

    // Kennfrequenz
    let fref;
    if (build === 'order') fref = st.fc;
    else if (band) fref = 1 / (TAU * Math.sqrt(st.Lb * st.Cb));
    else if (build === 'rc') fref = 1 / (TAU * st.R * st.C);
    else fref = st.R / (TAU * st.L);
    const Qb = band ? TAU * fref * st.Lb / (st.Rb + (type === 'bp' ? TAU * fref * st.Lb / 200 : 0)) : NaN;
    const grid = logspace(fmin, fmax, 420);
    if (band) grid.push(...logspace(fref * (1 - 6 / Math.max(Qb, 1.5)), fref * (1 + 6 / Math.max(Qb, 1.5)), 200).filter(x => x > 0));
    else grid.push(...logspace(fref / 4, fref * 4, 80));
    grid.sort((a, b) => a - b);
    const H = transferOf(st), r = H(grid);
    const ref = band ? (type === 'bp' ? Math.max(...r.mag) : 1) : (type === 'tp' ? r.mag[0] : r.mag[r.mag.length - 1]);
    const cr = crossings(grid, r.mag, ref * Math.SQRT1_2);
    const fg = band ? NaN : cr[0], f1 = band ? cr[0] : NaN, f2 = band ? cr[cr.length - 1] : NaN;
    const B = band ? f2 - f1 : NaN;
    const att = f => -H([f]).db[0] + 20 * Math.log10(ref);   // Dämpfung relativ zum Durchlassbereich, in dB

    // Bode (bei Bedarf neu aufbauen: Phasenbereich hängt vom Filter ab)
    const pr = band ? [-90, 90] : build === 'order' ? (type === 'tp' ? [-90 * st.n, 0] : [0, 90 * st.n]) : (type === 'tp' ? [-90, 0] : [0, 90]);
    const key = pr.join();
    if (key !== bdKey) { bdKey = key; bodeHolder.replaceChildren(); bd = bode(bodeHolder, { fmin, fmax, dbMin: -80, dbMax: 6, dbTicks: [-80, -60, -40, -20, -3, 0], phaseMin: pr[0], phaseMax: pr[1] }); }
    bd.set('h', grid, r.db, r.phase, { color: 'var(--accent)', width: 3 });
    bd.minus3dB(20 * Math.log10(ref));
    if (band) bd.mark(fref, { label: 'f₀' }); else if (Number.isFinite(fg)) bd.mark(fg, { label: 'f_g' }); else bd.unmark();
    if (band && Number.isFinite(f1) && Number.isFinite(f2)) bd.mag.band('B', f1, f2, { color: 'var(--accent-2)', opacity: 0.16, label: type === 'bp' ? 'B' : 'Sperrbereich' }); else bd.mag.removeAnn('B');

    // Zeitbereich
    const fin = v.fin, ks = v.sig === 'square' ? [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23] : [1];
    const hs = H(ks.map(k => k * fin)), amp = k => v.sig === 'square' ? 4 / (Math.PI * k) : 1;
    const N = 500, T = 1 / fin, tt = Array.from({ length: N + 1 }, (_, i) => 3 * T * i / N);
    const yin = new Float64Array(N + 1), yout = new Float64Array(N + 1);
    for (let i = 0; i <= N; i++) {
      let a = 0, b = 0;
      ks.forEach((k, j) => { const ph = TAU * k * fin * tt[i], A = amp(k); a += A * Math.sin(ph); b += A * hs.mag[j] * Math.sin(ph + hs.phase[j] / RAD); });
      yin[i] = a; yout[i] = b;
    }
    pt.line('in', tt, yin, { color: 'var(--accent-2)', width: 1.8, label: 'Eingang u₁' });
    pt.line('out', tt, yout, { color: 'var(--accent)', width: 2.8, label: 'Ausgang u₂' });
    pt.range({ x: [0, 3 * T], y: [-1.5, 1.5] });
    tTitle.textContent = `Zeitbereich: ${v.sig === 'square' ? 'Rechteck (Grundwelle + Oberwellen)' : 'Sinus'} mit f = ${fmt(fin, 'Hz')}, Amplitude 1 V`;

    // Anzeigen
    const rp = (x, d = 1) => x.toFixed(d).replace('.', ',') + ' dB';
    const attIn = att(fin), phIn = H([fin]).phase[0];
    if (band) {
      out.set({ k1: fmt(fref, 'Hz'), k2: Number.isFinite(B) ? fmt(B, 'Hz') : '–', k3: rp(attIn), k4: phIn.toFixed(0).replace('.', ',') + '°' });
      out.el.children[0].firstChild.textContent = 'f₀ '; out.el.children[1].firstChild.textContent = 'B (−3 dB) ';
    } else {
      out.set({ k1: Number.isFinite(fg) ? fmt(fg, 'Hz') : '–', k2: rp(att(10 * (fg || fref)), 1), k3: rp(attIn), k4: phIn.toFixed(0).replace('.', ',') + '°' });
      out.el.children[0].firstChild.textContent = 'f_g '; out.el.children[1].firstChild.textContent = (type === 'tp' ? 'a(10·f_g) ' : 'a(f_g/10) ');
      if (type === 'hp') out.set({ k2: rp(att((fg || fref) / 10), 1) });
    }
    out.el.children[2].firstChild.textContent = `a(f = ${fmt(fin, 'Hz')}) `; out.el.children[3].firstChild.textContent = `φ(f) `;
    note.textContent = band
      ? (type === 'bp' ? `Bandpass: um f₀ = 1/(2π√LC) kommt das Signal durch, B = f₀/Q mit Q ≈ ${Math.round(Qb)}. Je kleiner R, desto schmaler das Band.` : `Bandsperre (Saugkreis nach Masse): bei f₀ ist der Reihenkreis fast ein Kurzschluss und zieht das Signal nach Masse. Spule mit Eigenverlust (Güte 200), daher endliche Tiefe.`)
      : `${TYPE_NAMES[type]}: f_g ${build === 'rc' ? '= 1/(2πRC)' : build === 'rl' ? '= R/(2πL)' : 'ist der −3-dB-Punkt'}; ${type === 'tp' ? 'oberhalb von f_g' : 'unterhalb von f_g'} fällt der Pegel mit ${20 * (build === 'order' ? st.n : 1)} dB je Dekade.`;

    const s = { build, type, n: st.n, response: st.response, fg, f0: fref, B, Q: band ? fref / B : NaN, R: v.R, C: v.C, L: v.L, Rb: v.Rb, Lb: v.Lb, Cb: v.Cb, fc: v.fc, fin, att };
    for (const gd of goalDefs) { try { if (gd.test(s)) g.reach(gd.id); } catch (e) { /* ignorieren */ } }
  }
  run();
}
