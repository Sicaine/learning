// Spannungsteiler mit Schaltplan: Bauteile direkt im Plan ziehen (oder per Regler), Strom als wandernde Punkte,
// Leitungsfarbe nach Potenzial. params: { target?: Volt } — Ziel: U₂ auf den Zielwert (±2 %) bringen (Standard 3,3 V).
// Einbinden: export { default } from '../../../assets/js/vizkit/examples/divider-schematic.js';
import { dcSolve } from '../circuit.js';
import { layouts } from '../schematic-layouts.js';
import { drawSchematic } from '../schematic.js';
import { plot } from '../plot.js';
import { controls, readout, goals } from '../controls.js';
import { fmt, logspace } from '../si.js';
import { h } from '../base.js';

export default function mount(stage, { params = {}, complete }) {
  const target = params.target ?? 3.3;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const { spec, net } = layouts.divider({ V: 10, R1: 4.7e3, R2: 2.2e3 });
  const sch = drawSchematic(root, { ...spec, onChange: (id, v) => ui.set({ [id]: v }) });
  const p = plot(root, { h: 240, x: { scale: 'log', unit: 'Ω', label: 'R₂', min: 100, max: 1e5 }, y: { unit: 'V', label: 'U₂', min: 0, max: 10 } });
  const R2s = logspace(100, 1e5, 120);
  const ui = controls(root, [
    { id: 'V1', label: 'Quellenspannung U', unit: 'V', min: 1, max: 24, step: 0.5, value: 10 },
    { id: 'R1', label: 'R₁', unit: 'Ω', min: 100, max: 100e3, value: 4.7e3, scale: 'log', snap: 'E12' },
    { id: 'R2', label: 'R₂', unit: 'Ω', min: 100, max: 100e3, value: 2.2e3, scale: 'log', snap: 'E12' },
  ], run);
  const out = readout(root, [{ id: 'u2', label: 'U₂', hl: true }, { id: 'i', label: 'I' }, { id: 'p', label: 'P gesamt' }, { id: 'k', label: 'Teilerverhältnis' }]);
  const g = goals(root, [{ id: 'u2', label: `U₂ = ${fmt(target, 'V')} (±2 %)` }], () => complete?.());
  p.hline('t', target, { label: 'Ziel', color: 'var(--good)' });

  function run() {
    const v = ui.values;
    net.set('V1', { dc: v.V1 }); net.set('R1', v.R1); net.set('R2', v.R2);
    const r = dcSolve(net);
    sch.set('V1', { value: v.V1 }); sch.set('R1', { value: v.R1 }); sch.set('R2', { value: v.R2 });
    sch.setState({ v: r.v, i: r.i });
    p.line('u2', R2s, R2s.map(x => v.V1 * x / (v.R1 + x)), { color: 'var(--accent)', label: 'U₂(R₂)' });
    p.marker('op', v.R2, r.v.out, { label: fmt(r.v.out, 'V') });
    out.set({ u2: fmt(r.v.out, 'V'), i: fmt(-r.i.V1, 'A'), p: fmt(-r.i.V1 * v.V1, 'W'), k: (r.v.out / v.V1 * 100).toFixed(1).replace('.', ',') + ' %' });
    if (Math.abs(r.v.out / target - 1) < 0.02) g.reach('u2');
  }
  run();
}
