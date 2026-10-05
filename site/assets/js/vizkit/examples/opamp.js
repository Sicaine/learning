// Invertierender Operationsverstärker am Oszilloskop: Verstärkung −R_f/R_in, Übersteuerung an den Betriebsspannungsgrenzen.
// params: { rails?: Volt } — Ziel: Verstärkung −10 einstellen UND die Übersteuerung (Clipping) einmal erzeugen.
// Einbinden: export { default } from '../../../assets/js/vizkit/examples/opamp.js';
import { transient, waves } from '../circuit.js';
import { layouts } from '../schematic-layouts.js';
import { drawSchematic } from '../schematic.js';
import { scope } from '../scope.js';
import { controls, readout, goals } from '../controls.js';
import { fmt } from '../si.js';
import { h } from '../base.js';

export default function mount(stage, { params = {}, complete }) {
  const rail = params.rails ?? 12;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const { spec, net } = layouts.opamp({ Rin: 1e3, Rf: 10e3, rails: [-rail, rail] });
  const sch = drawSchematic(root, { ...spec, onChange: (id, v) => ui.set({ [id]: v }) });
  const sc = scope(root, { channels: [{ id: 'in', label: 'u₁', vdiv: 1 }, { id: 'out', label: 'u₂', vdiv: 5 }], trigger: { source: 'in', level: 0 }, timeDiv: 0.5e-3 });
  const ui = controls(root, [
    { id: 'Rin', label: 'R_in', unit: 'Ω', min: 100, max: 100e3, value: 1e3, scale: 'log', snap: 'E12' },
    { id: 'Rf', label: 'R_f', unit: 'Ω', min: 1e3, max: 1e6, value: 10e3, scale: 'log', snap: 'E12' },
    { id: 'A', label: 'Eingangsamplitude', unit: 'V', min: 0.1, max: 3, step: 0.05, value: 0.5 },
    { id: 'f', label: 'Frequenz', unit: 'Hz', min: 100, max: 5e3, value: 1e3, scale: 'log' },
  ], run);
  const out = readout(root, [{ id: 'g', label: 'Verstärkung −R_f/R_in', hl: true }, { id: 'gm', label: 'gemessen' }, { id: 'sat', label: 'Ausgang' }]);
  const g = goals(root, [{ id: 'gain', label: 'Verstärkung ≈ −10 (±5 %)' }, { id: 'clip', label: 'Übersteuerung erzeugen' }], () => complete?.());

  function run() {
    const v = ui.values;
    net.set('Rin', v.Rin); net.set('Rf', v.Rf); net.get('V1').wave = waves.sine(v.A, v.f);
    const T = 1 / v.f, tr = transient(net, { tstop: 6 * T, dt: T / 200 }), k0 = 2 * 200;
    sc.setSignal('in', { t: tr.t.subarray(k0), v: tr.v.in.subarray(k0) });
    sc.setSignal('out', { t: tr.t.subarray(k0), v: tr.v.out.subarray(k0) });
    sc.set({ timeDiv: [1e-4, 2e-4, 5e-4, 1e-3, 2e-3, 5e-3].reduce((b, x) => Math.abs(Math.log(x * 10 / (2.5 * T))) < Math.abs(Math.log(b * 10 / (2.5 * T))) ? x : b) });
    const gain = -v.Rf / v.Rin, peak = Math.max(...tr.v.out.subarray(k0)), clip = Math.abs(gain * v.A) > rail * 0.98;
    out.set({ g: gain.toFixed(1).replace('.', ','), gm: (peak / v.A).toFixed(1).replace('.', ',') + (clip ? ' (begrenzt)' : ''), sat: clip ? 'übersteuert' : 'linear' });
    sch.set('Rin', { value: v.Rin }); sch.set('Rf', { value: v.Rf });
    const k = tr.n - 1 - 50; sch.setState({ v: Object.fromEntries(Object.entries(tr.v).map(([n, a]) => [n, a[k]])), i: Object.fromEntries(Object.entries(tr.i).map(([n, a]) => [n, a[k]])) });
    if (Math.abs(gain / -10 - 1) < 0.05) g.reach('gain');
    if (clip) g.reach('clip');
  }
  run();
}
