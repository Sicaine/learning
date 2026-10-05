// RC-Glied am Oszilloskop: R, C und Frequenz einstellen, Auf-/Entladekurve und Zeitkonstante τ beobachten.
// params: { target?: Sekunden } — Ziel: τ = R·C auf den Zielwert (±8 %) einstellen (Standard 1 ms).
// Einbinden in eine Lektion: export { default } from '../../../assets/js/vizkit/examples/rc-scope.js';
import { transient, waves } from '../circuit.js';
import { layouts } from '../schematic-layouts.js';
import { drawSchematic } from '../schematic.js';
import { scope } from '../scope.js';
import { controls, readout, goals } from '../controls.js';
import { seq125, fmt } from '../si.js';
import { h } from '../base.js';

export default function mount(stage, { params = {}, complete }) {
  const target = params.target ?? 1e-3;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const { spec, net } = layouts.rc({ R: 1e3, C: 1e-6 });
  const sch = drawSchematic(root, { ...spec, onChange: (id, v) => ui.set({ [id === 'R1' ? 'R' : 'C']: v }) });
  const sc = scope(root, { channels: [{ id: 'in', label: 'u₁', vdiv: 0.5 }, { id: 'out', label: 'u₂', vdiv: 0.5 }], trigger: { source: 'in', level: 0.5 }, timeDiv: 1e-3 });
  const ui = controls(root, [
    { id: 'R', label: 'Widerstand R', unit: 'Ω', min: 100, max: 100e3, value: 1e3, scale: 'log', snap: 'E12' },
    { id: 'C', label: 'Kapazität C', unit: 'F', min: 1e-9, max: 10e-6, value: 1e-6, scale: 'log', snap: 'E12' },
    { id: 'f', label: 'Frequenz f', unit: 'Hz', min: 20, max: 20e3, value: 250, scale: 'log' },
    { id: 'shape', type: 'seg', options: [['square', 'Rechteck'], ['sine', 'Sinus'], ['tri', 'Dreieck']], value: 'square' },
    { type: 'presets', items: [{ label: 'schnell', values: { R: 1e3, C: 100e-9 } }, { label: 'langsam', values: { R: 10e3, C: 1e-6 } }], reset: true },
  ], run);
  const out = readout(root, [{ id: 'tau', label: 'Zeitkonstante τ = R·C', hl: true }, { id: 'fc', label: 'Grenzfrequenz f_c' }, { id: 'ratio', label: 'T / τ' }]);
  const g = goals(root, [{ id: 'tau', label: `Stelle τ auf ${fmt(target, 's')} ein` }], () => complete?.());

  function run() {
    const v = ui.values, tau = v.R * v.C, T = 1 / v.f;
    net.set('R1', v.R); net.set('C1', v.C);
    net.get('V1').wave = v.shape === 'sine' ? waves.sine(0.5, v.f, 0.5) : v.shape === 'tri' ? waves.tri(0.5, v.f, { offset: 0.5 }) : waves.square(0.5, v.f, { offset: 0.5 });
    const periods = Math.max(6, Math.min(24, Math.ceil(7 * tau / T) + 3));
    const tr = transient(net, { tstop: periods * T, dt: T / 200 });
    const k0 = Math.round((periods - 4) * 200);
    sc.setSignal('in', { t: tr.t.subarray(k0), v: tr.v.in.subarray(k0) });
    sc.setSignal('out', { t: tr.t.subarray(k0), v: tr.v.out.subarray(k0) });
    const list = seq125(1e-6, 1), want = 2.5 * T / 10;
    sc.set({ timeDiv: list.reduce((b, x) => Math.abs(Math.log(x / want)) < Math.abs(Math.log(b / want)) ? x : b) });
    sch.set('R1', { value: v.R }); sch.set('C1', { value: v.C });
    out.set({ tau: fmt(tau, 's'), fc: fmt(1 / (2 * Math.PI * tau), 'Hz'), ratio: (T / tau).toFixed(2) });
    if (Math.abs(tau / target - 1) < 0.08) g.reach('tau');
    const k = Math.floor((tr.t.length - 1) * 0.9);
    sch.setState({ v: { in: tr.v.in[k], out: tr.v.out[k], 0: 0 }, i: { R1: tr.i.R1[k], C1: tr.i.C1[k], V1: tr.i.V1[k] } });
  }
  run();
}
