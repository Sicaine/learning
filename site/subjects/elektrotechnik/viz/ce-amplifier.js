// Emitterschaltung (Kleinsignalverstärker) mit Arbeitspunkt, Oszilloskop, Klirrfaktor — und Betriebsart „klassen“ (Stromflusswinkel, Klassen A/B/AB/C).
// params: { mode?: 'amp' (Standard) | 'klassen', targetVpp?: 1 }
// Einbinden: { viz: 'ce-amplifier', params: { mode: 'klassen' } }
import { Netlist, dcSolve, transient, waves } from '../../../assets/js/vizkit/circuit.js';
import { drawSchematic } from '../../../assets/js/vizkit/schematic.js';
import { scope } from '../../../assets/js/vizkit/scope.js';
import { plot } from '../../../assets/js/vizkit/plot.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { fmt } from '../../../assets/js/vizkit/si.js';
import { h } from '../../../assets/js/vizkit/base.js';
import { ampNet, ampSpec, harmonics, thd, nice125 } from './_5b-helper.js';

const fnum = (x, d = 1) => x.toFixed(d).replace('.', ',');

export default function mount(stage, ctx) {
  return (ctx.params?.mode === 'klassen' ? mountClasses : mountAmp)(stage, ctx);
}

// ── Emitterschaltung ─────────────────────────────────────────────────────────
function mountAmp(stage, { params = {}, complete, md }) {
  const targetVpp = params.targetVpp ?? 1;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const holder = h('div'); root.append(holder);
  let sch, lastCe = null;
  const sc = scope(root, { channels: [{ id: 'in', label: 'u₁', vdiv: 0.05 }, { id: 'out', label: 'u₂', vdiv: 1 }], trigger: { source: 'in', level: 0 }, timeDiv: 0.5e-3, controls: false });
  const ui = controls(root, [
    { type: 'presets', label: 'Arbeitspunkt', items: [
      { label: 'zu tief', values: { R2: 4.7e3 } }, { label: 'Ausgangslage', values: { R2: 10e3 } }, { label: 'zu hoch', values: { R2: 22e3 } }] },
    { id: 'R1', label: 'R₁ (oben)', unit: 'Ω', min: 10e3, max: 220e3, value: 47e3, scale: 'log', snap: 'E12' },
    { id: 'R2', label: 'R₂ (unten)', unit: 'Ω', min: 2.2e3, max: 47e3, value: 10e3, scale: 'log', snap: 'E12' },
    { id: 'Rc', label: 'R_C', unit: 'Ω', min: 470, max: 10e3, value: 2.2e3, scale: 'log', snap: 'E12' },
    { id: 'Re', label: 'R_E', unit: 'Ω', min: 100, max: 2.2e3, value: 470, scale: 'log', snap: 'E12' },
    { id: 'ce', type: 'toggle', label: 'C_E überbrückt R_E (100 µF)', value: false },
    { id: 'Ck', label: 'Koppel-C (C₁ = C₂)', unit: 'F', min: 0.1e-6, max: 47e-6, value: 10e-6, scale: 'log', snap: 'E6' },
    { id: 'Ucc', label: 'Betriebsspannung U_B', unit: 'V', min: 5, max: 15, step: 0.5, value: 12 },
    { id: 'A', label: 'Eingangsamplitude û₁', unit: 'V', min: 1e-3, max: 0.5, value: 0.02, scale: 'log' },
    { id: 'f', label: 'Frequenz', unit: 'Hz', min: 20, max: 1e5, value: 1e3, scale: 'log' },
  ], (v, id) => { if (id === 'ce') buildSch(); run(); });
  const out = readout(root, [
    { id: 'ub', label: 'U_B,Basis' }, { id: 'uce', label: 'U_CE (Gleichwert)', hl: true }, { id: 'ic', label: 'I_C (Gleichwert)' },
    { id: 'vu', label: 'v_U = u₂/u₁' }, { id: 'uss', label: 'u₂,SS' }, { id: 'k', label: 'Klirrfaktor' }, { id: 'st', label: 'Signal' },
  ]);
  const g = goals(root, [
    { id: 'mid', label: 'Arbeitspunkt mittig: U_CE zwischen 40 % und 65 % von U_B' },
    { id: 'vpp', label: `${fnum(targetVpp, 0)} V_SS am Ausgang, Klirrfaktor < 5 %` },
  ], () => complete?.());
  const note = h('p', { class: 'vz-note' }); root.append(note);

  function buildSch() {
    const v = ui.values, ce = v.ce ? 100e-6 : 0;
    holder.replaceChildren();
    sch = drawSchematic(holder, ampSpec({ ...v, Ce: ce }, (id, val) => ui.set({ [id]: val })));
    lastCe = v.ce;
  }
  function run() {
    const v = ui.values, ce = v.ce ? 100e-6 : 0, N = 200, per = 6, T = 1 / v.f;
    const net = ampNet({ Vcc: v.Ucc, R1: v.R1, R2: v.R2, Rc: v.Rc, Re: v.Re, Ce: ce, Ck: v.Ck, A: v.A, f: v.f });
    const dc = dcSolve(net), tr = transient(net, { tstop: per * T, dt: T / N });
    const k0 = tr.n - 1 - 2 * N, len = 2 * N;
    const vin = tr.v.in, vout = tr.v.out, ic = tr.i.Q1;
    let lo = Infinity, hi = -Infinity, li = Infinity, hii = -Infinity, uceMin = Infinity, icMin = Infinity, mi = 0, mo = 0, cor = 0;
    for (let k = k0; k < k0 + len; k++) { mi += vin[k] / len; mo += vout[k] / len; }
    for (let k = k0; k < k0 + len; k++) {
      lo = Math.min(lo, vout[k]); hi = Math.max(hi, vout[k]); li = Math.min(li, vin[k]); hii = Math.max(hii, vin[k]);
      uceMin = Math.min(uceMin, tr.v.c[k] - tr.v.e[k]); icMin = Math.min(icMin, ic[k]); cor += (vin[k] - mi) * (vout[k] - mo);
    }
    const ppIn = hii - li, ppOut = hi - lo, vu = (cor < 0 ? -1 : 1) * ppOut / ppIn;
    const kl = thd(harmonics(vout, k0, len, 2, 8));
    const uceDC = dc.v.c - dc.v.e, icDC = dc.i.Q1;
    const sat = uceMin < 0.25, cut = icMin < Math.max(2e-6, 0.002 * icDC);
    sc.setSignal('in', { t: tr.t.subarray(k0), v: tr.v.in.subarray(k0) });
    sc.setSignal('out', { t: tr.t.subarray(k0), v: tr.v.out.subarray(k0) });
    sc.set({ timeDiv: nice125(2.5 * T / 10), channels: { in: { vdiv: nice125(ppIn / 4) }, out: { vdiv: nice125(Math.max(ppOut, 1e-3) / 4) } } });
    if (v.ce !== lastCe) buildSch();
    sch.set('R1', { value: v.R1 }); sch.set('R2', { value: v.R2 }); sch.set('Rc', { value: v.Rc }); sch.set('Re', { value: v.Re });
    sch.set('C1', { value: v.Ck }); sch.set('C2', { value: v.Ck });
    const kk = Math.min(tr.n - 1, k0 + Math.round(N * 0.25));
    sch.setState({ v: Object.fromEntries(Object.entries(tr.v).map(([n, a]) => [n, a[kk]])), i: Object.fromEntries(Object.entries(tr.i).map(([n, a]) => [n, a[kk]])) });
    out.set({
      ub: fmt(dc.v.b, 'V', 3), uce: fmt(uceDC, 'V', 3), ic: fmt(icDC, 'A', 3),
      vu: (vu < 0 ? '−' : '') + fnum(Math.abs(vu), Math.abs(vu) < 10 ? 2 : 0) + (vu < 0 ? ' (180°)' : ''),
      uss: fmt(ppOut, 'V', 3), k: fnum(kl * 100, 1) + ' %', st: sat && cut ? 'beidseitig begrenzt' : sat ? 'unten begrenzt (Sättigung)' : cut ? 'oben begrenzt (Sperren)' : 'unverzerrt',
    });
    note.textContent = sat || cut ? 'Warnung: Der Ausgang wird abgeschnitten (Clipping) — der Arbeitspunkt liegt zu nah an Sättigung bzw. Sperrbereich oder die Eingangsamplitude ist zu groß.' : '';
    const rel = uceDC / v.Ucc;
    if (rel >= 0.4 && rel <= 0.65) g.reach('mid');
    if (ppOut >= targetVpp * 0.95 && kl < 0.05 && !sat && !cut) g.reach('vpp');
  }
  buildSch(); run();
}

// ── Stromflusswinkel und Verstärkerklassen ───────────────────────────────────
function mountClasses(stage, { params = {}, complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const f = 1e3, T = 1 / f, N = 80;
  const p1 = plot(root, { h: 190, x: { unit: 's', label: 't', min: 0, max: 2 * T }, y: { unit: 'V', label: 'u_BE', min: 0, max: 1.1 }, title: 'Basis-Emitter-Spannung' });
  const p2 = plot(root, { h: 230, x: { unit: 's', label: 't', min: 0, max: 2 * T }, y: { unit: 'A', label: 'i_C', include: [0] }, y2: { unit: 'V', label: 'u_aus' }, legend: true, title: 'Kollektorstrom' });
  const ui = controls(root, [
    { type: 'presets', label: 'Betriebsart', items: [
      { label: 'A', values: { bias: 0.72, amp: 0.05 } }, { label: 'AB', values: { bias: 0.68, amp: 0.15 } },
      { label: 'B', values: { bias: 0.66, amp: 0.3 } }, { label: 'C', values: { bias: 0.5, amp: 0.5 } }] },
    { id: 'bias', label: 'Vorspannung U_BE,0 (Arbeitspunkt)', unit: 'V', min: 0.3, max: 0.8, step: 0.01, value: 0.72 },
    { id: 'amp', label: 'Eingangsamplitude û', unit: 'V', min: 0.02, max: 1, step: 0.01, value: 0.05 },
    { id: 'load', type: 'seg', label: 'Last', options: [['r', 'Widerstand 100 Ω'], ['tank', 'Schwingkreis (1 kHz)']], value: 'r' },
  ], run);
  const out = readout(root, [
    { id: 'theta', label: 'Stromflusswinkel Θ', hl: true }, { id: 'cls', label: 'Klasse' }, { id: 'eta', label: 'Wirkungsgrad η' }, { id: 'k', label: 'Klirrfaktor u_aus' }, { id: 'iavg', label: 'Ø I_C' },
  ]);
  const g = goals(root, [
    { id: 'a', label: 'Klasse A (Θ ≈ 360°)' }, { id: 'b', label: 'Klasse B (Θ ≈ 180° ± 10°)' }, { id: 'c', label: 'Klasse C mit Schwingkreis: Θ < 150°, sauberer Sinus (k < 10 %)' },
  ], () => complete?.());
  const note = h('p', { class: 'vz-note' }); root.append(note);
  void params;

  function run() {
    const v = ui.values, tank = v.load === 'tank', per = tank ? 16 : 6, Vcc = 12, Rac = tank ? 1e3 : 100;
    const net = new Netlist().V('Vcc', 'vcc', '0', Vcc).V('Vg', 'g', '0', { wave: waves.sine(v.amp, f, v.bias) }).R('Rb', 'g', 'b', 470).Q('Q1', 'c', 'b', '0', { bf: 100 });
    if (tank) net.L('L1', 'vcc', 'c', 25.33e-3).C('C1', 'vcc', 'c', 1e-6).R('Rp', 'vcc', 'c', 1e3); else net.R('Rc', 'vcc', 'c', 100);
    const tr = transient(net, { tstop: per * T, dt: T / N });
    const len = 2 * N, k0 = tr.n - 1 - len, ic = tr.i.Q1;
    let mx = 0, av = 0;
    for (let k = 0; k < len; k++) { mx = Math.max(mx, ic[k0 + k]); av += ic[k0 + k] / len; }
    let cnt = 0; for (let k = 0; k < len; k++) if (ic[k0 + k] > 0.03 * mx) cnt++;
    const theta = cnt / len * 360, hI = harmonics(ic, k0, len, 2, 8), kU = thd(harmonics(tr.v.c, k0, len, 2, 8));
    const eta = 0.5 * hI[0] * hI[0] * Rac / (Vcc * Math.max(av, 1e-9));
    const t = Float64Array.from({ length: len + 1 }, (_, k) => k * T / N * 1); const cut = a => Float64Array.from(a.subarray(k0, k0 + len + 1));
    p1.line('ube', t, cut(tr.v.b), { color: 'var(--accent)', label: 'u_BE' }).hline('thr', 0.6, { label: 'Schwelle ≈ 0,6 V', color: 'var(--muted)', dash: '5 4' });
    p2.line('ic', t, cut(ic), { color: 'var(--accent)', label: 'i_C', width: 2.4 });
    p2.line('uc', t, cut(tr.v.c), { axis: 'y2', color: 'var(--accent-2)', label: 'u_aus (Kollektor)', dash: '6 4' });
    const cls = theta >= 340 ? 'A' : theta > 190 ? 'AB' : theta >= 170 ? 'B' : 'C';
    out.set({ theta: Math.round(theta) + '°', cls, eta: fnum(eta * 100, 0) + ' %', k: fnum(kU * 100, 0) + ' %', iavg: fmt(av, 'A', 3) });
    note.textContent = tank ? 'Der Schwingkreis „schwingt nach“ und füllt die Lücken zwischen den Stromimpulsen — der Ausgang bleibt ein Sinus.' : 'Mit reinem Widerstand als Last ist die Ausgangsspannung so verzerrt wie der Kollektorstrom.';
    if (theta >= 350 && mx > 1e-3) g.reach('a');
    if (theta >= 170 && theta <= 190) g.reach('b');
    if (tank && theta < 150 && kU < 0.1) g.reach('c');
  }
  run();
}
