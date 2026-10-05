// resonance-lab — Reihen- und Parallelschwingkreis: L, C und Verlustwiderstand einstellen, f₀, Güte Q und Bandbreite B ablesen,
// Resonanzkurve, Impedanzverlauf und Ein-/Ausschwingen im Zeitbereich beobachten.
// params: { mode?: 'series'|'parallel' (Start), modeFixed?: true (Umschalter ausblenden),
//           targetF?: Hz (Standard 7,1 MHz), tolF?: relative Toleranz (0,02), targetQ?: Güte (100), goals?: ['f0','q'] (Teilmenge),
//           init?: { L, C, R } }
// Modell: Verlust als Serienwiderstand R der Spule (bzw. Gesamtverlust beim Reihenkreis). Q = 2πf₀L/R, B = f₀/Q, τ = 2L/R.
import { Netlist, impedance, transient, logspace, qFactor } from '../../../assets/js/vizkit/circuit.js';
import { plot } from '../../../assets/js/vizkit/plot.js';
import { drawSchematic } from '../../../assets/js/vizkit/schematic.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { fmt } from '../../../assets/js/vizkit/si.js';
import { h } from '../../../assets/js/vizkit/base.js';

const TAU = 2 * Math.PI;
const f0Of = (L, C) => 1 / (TAU * Math.sqrt(L * C));

/** Zweipol zwischen Knoten 'p' und Masse: Reihenkreis (L–R–C in Reihe) oder Parallelkreis (C ∥ (L–R)). */
function zNet(mode, { L, C, R }) {
  const n = new Netlist().L('L1', 'p', 'a', L);
  if (mode === 'series') n.R('R1', 'a', 'b', R).C('C1', 'b', '0', C);
  else n.R('R1', 'a', '0', R).C('C1', 'p', '0', C);
  return n;
}

function schematicSpec(mode) {
  if (mode === 'series') return {
    parts: [
      { id: 'V1', type: 'VAC', at: [2, 3], rot: 90, label: 'u' },
      { id: 'L1', type: 'L', at: [6, 3], value: 1e-5 },
      { id: 'R1', type: 'R', at: [11, 3], value: 10, label: 'R (Verlust)' },
      { id: 'C1', type: 'C', at: [16, 3], rot: 90, value: 1e-10 },
    ],
    wires: [['V1.a', 'L1.a'], ['L1.b', 'R1.a'], ['R1.b', [16, 3], 'C1.a'], ['C1.b', [16, 7], [2, 7], 'V1.b']],
  };
  return {
    parts: [
      { id: 'I1', type: 'I', at: [2, 3], rot: 90, label: 'i' },
      { id: 'C1', type: 'C', at: [9, 3], rot: 90, value: 1e-10 },
      { id: 'L1', type: 'L', at: [14, 3], rot: 90, value: 1e-5 },
      { id: 'R1', type: 'R', at: [14, 7], rot: 90, value: 10, label: 'R (Verlust)' },
    ],
    wires: [['I1.a', 'C1.a', 'L1.a'], ['C1.b', [9, 11]], ['I1.b', [2, 11], [14, 11], 'R1.b']],
  };
}

export default function mount(stage, { params = {}, complete }) {
  const targetF = params.targetF ?? 7.1e6, tolF = params.tolF ?? 0.02, targetQ = params.targetQ ?? 100;
  const wanted = params.goals ?? ['f0', 'q'];
  const init = { L: 10e-6, C: 100e-12, R: 10, ...params.init };
  const root = h('div', { class: 'vz vk' }); stage.append(root);

  const schWrap = h('div', { style: 'max-width:520px;width:100%;margin:0 auto' }); root.append(schWrap);
  let sch = null, schMode = null;
  function drawSch(mode, v) {
    if (schMode === mode) return;
    schMode = mode; schWrap.replaceChildren();
    const sp = schematicSpec(mode);
    for (const p of sp.parts) { if (p.id === 'L1') p.value = v.L; if (p.id === 'C1') p.value = v.C; if (p.id === 'R1') p.value = v.R; }
    sch = drawSchematic(schWrap, sp);
  }

  const ui = controls(root, [
    ...(params.modeFixed ? [] : [{ id: 'mode', type: 'seg', label: 'Schaltung', options: [['series', 'Reihenkreis'], ['parallel', 'Parallelkreis']], value: params.mode ?? 'series' }]),
    { id: 'L', label: 'Induktivität L', unit: 'H', min: 100e-9, max: 10e-3, value: init.L, scale: 'log' },
    { id: 'C', label: 'Kapazität C', unit: 'F', min: 1e-12, max: 10e-9, value: init.C, scale: 'log' },
    { id: 'R', label: 'Verlustwiderstand R', unit: 'Ω', min: 0.1, max: 100, value: init.R, scale: 'log' },
    { type: 'presets', items: [
      { label: '40 m, Q ≈ 100', values: { L: 5.03e-6, C: 100e-12, R: 2.24 } },
      { label: 'schmal (Q ≈ 300)', values: { L: 5.03e-6, C: 100e-12, R: 0.75 } },
      { label: 'breit (Q ≈ 10)', values: { L: 5.03e-6, C: 100e-12, R: 22.4 } },
    ], reset: true },
  ], run);
  if (params.mode) ui.set({ mode: params.mode }, { silent: true });
  const out = readout(root, [
    { id: 'f0', label: 'f₀ = 1/(2π√LC)', hl: true }, { id: 'q', label: 'Güte Q' }, { id: 'b', label: 'Bandbreite B = f₀/Q' },
    { id: 'xl', label: 'X_L bei f₀' }, { id: 'zr', label: '|Z| bei f₀' },
  ]);
  const gdefs = [];
  if (wanted.includes('f0')) gdefs.push({ id: 'f0', label: `f₀ = ${fmt(targetF, 'Hz')} (±${Math.round(tolF * 100)} %)` });
  if (wanted.includes('q')) gdefs.push({ id: 'q', label: `Q ≥ ${targetQ}` });
  const g = goals(root, gdefs, () => complete?.());

  const pz = plot(root, { x: { scale: 'log', unit: 'Hz', label: 'f' }, y: { scale: 'log', unit: 'Ω', label: '|Z|, X' }, legend: true, h: 260 });
  const prTitle = h('div', { class: 'vz-note', style: 'margin:6px 0 -6px', text: 'Resonanzkurve (Ausschnitt um f₀, auf den Maximalwert bezogen)' }); root.append(prTitle);
  const pr = plot(root, { x: { unit: 'Hz', label: 'f' }, y: { unit: 'dB', min: -30, max: 3, label: 'dB', ticks: [-30, -20, -10, -3, 0] }, h: 230 });
  const pt = plot(root, { x: { unit: 's', label: 't' }, y: { unit: 'V', label: 'u' }, legend: true, h: 230 });
  const note = h('p', { class: 'vz-note', style: 'margin:0' }); root.append(note);

  function run() {
    const v = ui.values, mode = v.mode ?? 'series';
    drawSch(mode, v);
    sch.set('L1', { value: v.L }); sch.set('C1', { value: v.C }); sch.set('R1', { value: v.R });
    const f0 = f0Of(v.L, v.C), w0 = TAU * f0, XL = w0 * v.L, Q = XL / v.R, B = f0 / Q;
    const fmin = Math.min(1e5, f0 / 10), fmax = Math.max(30e6, f0 * 10);
    // Frequenzraster: grob über den ganzen Bereich + dicht um f₀ (für die Bandbreite)
    const lo = Math.max(f0 * 0.2, f0 * (1 - 6 / Math.max(Q, 1))), hi = f0 * (1 + 6 / Math.max(Q, 1));
    const f = [...logspace(fmin, fmax, 360), ...logspace(Math.max(lo, f0 * 0.2), Math.min(hi, f0 * 5), 240)].sort((a, b) => a - b);
    const net = zNet(mode, v), z = impedance(net, 'p', f), zm = z.mag;
    const pk = mode === 'series' ? Math.min(...zm) : Math.max(...zm);
    const rel = Float64Array.from(zm, m => mode === 'series' ? pk / m : m / pk);
    const qm = qFactor(f, rel);
    pz.line('z', f, zm, { color: 'var(--accent)', width: 3, label: '|Z|' });
    pz.line('xl', f, f.map(x => TAU * x * v.L), { color: 'var(--accent-2)', dash: '5 4', width: 1.6, label: 'X_L' });
    pz.line('xc', f, f.map(x => 1 / (TAU * x * v.C)), { color: 'var(--warn)', dash: '5 4', width: 1.6, label: 'X_C' });
    pz.range({ x: [fmin, fmax], y: [Math.min(v.R * 0.5, 1), Math.max(XL * Q * 3, 1e3)] });
    pz.vline('f0', f0, { color: 'var(--ink-2)', label: 'f₀' });
    pr.line('r', f, Float64Array.from(rel, m => 20 * Math.log10(Math.max(m, 1e-9))), { color: 'var(--accent)', width: 3 });
    const k = Math.min(0.6, Math.max(0.004, 4 / Q));
    pr.range({ x: [f0 * (1 - k), f0 * (1 + k)] });
    pr.vline('f0', f0, { color: 'var(--ink-2)' });
    pr.hline('m3', -3.0103, { color: 'var(--muted)', label: '−3 dB' });
    if (Number.isFinite(qm.f1) && Number.isFinite(qm.f2)) pr.band('B', qm.f1, qm.f2, { color: 'var(--accent-2)', opacity: 0.18 }); else pr.removeAnn('B');
    if (params.showTarget !== false) { pz.vline('t', targetF, { color: 'var(--good)', label: fmt(targetF, 'Hz') }); pr.vline('t', targetF, { color: 'var(--good)', label: fmt(targetF, 'Hz') }); }

    // Zeitbereich: Quelle mit f₀ an, dann aus → Einschwingen und Ausschwingen
    const T = 1 / f0, tau = 2 * v.L / v.R, tOn = Math.min(3 * tau, 90 * T), tstop = 2 * tOn, dt = T / 36;
    const ztest = impedance(zNet(mode, v), 'p', [f0]);
    const Zres = ztest.mag[0];
    const drive = t => t < tOn ? Math.sin(TAU * f0 * t) : 0;
    const tn = new Netlist();
    if (mode === 'series') tn.V('V1', 'p', '0', { wave: drive }).L('L1', 'p', 'a', v.L).R('R1', 'a', 'b', v.R).C('C1', 'b', '0', v.C);
    else tn.I('I1', '0', 'p', { wave: t => 1e-3 * drive(t) }).L('L1', 'p', 'a', v.L).R('R1', 'a', '0', v.R).C('C1', 'p', '0', v.C);
    const tr = transient(tn, { tstop, dt, every: 1 });
    const node = mode === 'series' ? 'b' : 'p';
    const Ainf = mode === 'series' ? (1 / (w0 * v.C)) / Zres : 1e-3 * Zres;   // Amplitude im eingeschwungenen Zustand (bei 1 V bzw. 1 mA)
    const env = (t) => t < tOn ? Ainf * (1 - Math.exp(-t / tau)) : Ainf * (1 - Math.exp(-tOn / tau)) * Math.exp(-(t - tOn) / tau);
    const ts = [0, ...Array.from({ length: 80 }, (_, k) => (k + 1) * tstop / 80)];
    pt.line('u', tr.t, tr.v[node], { color: 'var(--accent)', width: 1.6, label: mode === 'series' ? 'u_C' : 'u am Kreis' });
    pt.line('e', ts, ts.map(env), { color: 'var(--warn)', dash: '6 4', width: 2, label: 'Hüllkurve' });
    pt.line('e2', ts, ts.map(t => -env(t)), { color: 'var(--warn)', dash: '6 4', width: 2 });
    pt.vline('off', tOn, { color: 'var(--muted)', label: 'Quelle aus' });
    pt.range({ x: [0, tstop] });

    out.set({
      f0: fmt(f0, 'Hz'), q: Q < 10 ? Q.toFixed(1).replace('.', ',') : String(Math.round(Q)), b: fmt(B, 'Hz'),
      xl: fmt(XL, 'Ω'), zr: fmt(Zres, 'Ω'),
    });
    note.textContent = mode === 'series'
      ? `Reihenkreis: bei f₀ ist |Z| nur noch R. Die Spannung an C (und an L) ist ${Q < 10 ? Q.toFixed(1).replace('.', ',') : Math.round(Q)}-mal so groß wie die Quellenspannung. Zeitkonstante der Hüllkurve τ = 2L/R = ${fmt(tau, 's')}.`
      : `Parallelkreis: bei f₀ ist |Z| ≈ Q·X_L = X_L²/R, also hochohmig. Die Spannung wächst mit der Zeitkonstante τ = 2L/R = ${fmt(tau, 's')} auf ihren Endwert (hier Speisung mit 1 mA).`;
    const okF = Math.abs(f0 / targetF - 1) <= tolF, okQ = Q >= targetQ;
    if (wanted.every(k => (k === 'f0' ? okF : okQ))) wanted.forEach(k => g.reach(k));   // alle Ziele gleichzeitig erfüllt
  }
  run();
}
