// Serienresonanzkreis (R, L, C) mit Bode-Diagramm: Resonanzfrequenz, Güte und Bandbreite einstellen.
// params: { targetF?: Hz, targetQ?: Güte } — Ziel: f₀ ≈ targetF (±5 %) und Q ≥ targetQ. Standard 5 kHz und Q ≥ 10.
// Einbinden: export { default } from '../../../assets/js/vizkit/examples/rlc-bode.js';
import { Netlist, acSweep, qFactor, logspace } from '../circuit.js';
import { bode } from '../plot.js';
import { controls, readout, goals } from '../controls.js';
import { fmt } from '../si.js';
import { h } from '../base.js';

export default function mount(stage, { params = {}, complete }) {
  const tf = params.targetF ?? 5e3, tq = params.targetQ ?? 10;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const b = bode(root, { fmin: 100, fmax: 100e3, dbMin: -60, dbMax: 6, phaseMin: -90, phaseMax: 90, legend: true });
  const net = new Netlist().V('V1', 'in', '0', { ac: 1 }).L('L1', 'in', 'a', 1e-3).C('C1', 'a', 'b', 1e-6).R('R1', 'b', '0', 10);
  const f = logspace(100, 100e3, 400);
  const ui = controls(root, [
    { id: 'R', label: 'Widerstand R', unit: 'Ω', min: 1, max: 1e3, value: 50, scale: 'log', snap: 'E12' },
    { id: 'L', label: 'Induktivität L', unit: 'H', min: 100e-6, max: 100e-3, value: 1e-3, scale: 'log', snap: 'E12' },
    { id: 'C', label: 'Kapazität C', unit: 'F', min: 1e-9, max: 10e-6, value: 1e-6, scale: 'log', snap: 'E12' },
    { type: 'presets', items: [{ label: 'schmalbandig', values: { R: 5.6, L: 10e-3, C: 100e-9 } }, { label: 'breitbandig', values: { R: 470, L: 1e-3, C: 1e-6 } }], reset: true },
  ], run);
  const out = readout(root, [{ id: 'f0', label: 'f₀ (Messung)', hl: true }, { id: 'th', label: 'f₀ = 1/(2π√LC)' }, { id: 'q', label: 'Güte Q' }, { id: 'bw', label: 'Bandbreite B' }]);
  const g = goals(root, [{ id: 'f', label: `f₀ ≈ ${fmt(tf, 'Hz')} (±5 %)` }, { id: 'q', label: `Q ≥ ${tq}` }], () => complete?.());

  function run() {
    const v = ui.values;
    net.set('R1', v.R); net.set('L1', v.L); net.set('C1', v.C);
    const ac = acSweep(net, f), m = ac.mag('b'), q = qFactor(f, m);
    b.set('h', f, ac.db('b'), ac.phase('b'), { color: 'var(--accent)', label: 'H = U_R / U₁' });
    b.minus3dB(0).mark(q.f0, { label: 'f₀' });
    const f0 = 1 / (2 * Math.PI * Math.sqrt(v.L * v.C)), Q = Math.sqrt(v.L / v.C) / v.R;
    out.set({ f0: fmt(q.f0, 'Hz'), th: fmt(f0, 'Hz'), q: Q.toFixed(1).replace('.', ','), bw: fmt(f0 / Q, 'Hz') });
    if (Math.abs(f0 / tf - 1) < 0.05) g.reach('f');
    if (Q >= tq) g.reach('q');
  }
  run();
}
