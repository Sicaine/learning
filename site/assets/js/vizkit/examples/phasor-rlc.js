// Zeigerdiagramm einer Reihenschaltung R–L–C: Spannungszeiger addieren sich Spitze an Fuß, φ, Z und Impedanzdreieck.
// params: { goal?: 'resonance' } — Ziel: Resonanz finden (φ ≈ 0°, U_L = U_C) und danach den kapazitiven Bereich einstellen.
// Einbinden: export { default } from '../../../assets/js/vizkit/examples/phasor-rlc.js';
import { phasor, impedanceTriangle } from '../phasor.js';
import { controls, readout, goals } from '../controls.js';
import { fmt } from '../si.js';
import { h } from '../base.js';

export default function mount(stage, { params = {}, complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const row = h('div', { style: 'display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:12px;align-items:start' }); root.append(row);
  const ph = phasor(row, { unit: 'V', wave: true, rotate: true, rps: 0.12 });
  const tri = impedanceTriangle(row, { unit: 'Ω' });
  ph.loop.controls(root, { speeds: [[1, '1×'], [0.25, '¼×'], [0, 'Stopp']] });
  const ui = controls(root, [
    { id: 'f', label: 'Frequenz f', unit: 'Hz', min: 100, max: 20e3, value: 1e3, scale: 'log' },
    { id: 'R', label: 'R', unit: 'Ω', min: 10, max: 1e3, value: 100, scale: 'log', snap: 'E12' },
    { id: 'L', label: 'L', unit: 'H', min: 1e-3, max: 100e-3, value: 10e-3, scale: 'log', snap: 'E12' },
    { id: 'C', label: 'C', unit: 'F', min: 100e-9, max: 10e-6, value: 1e-6, scale: 'log', snap: 'E12' },
  ], run);
  const out = readout(root, [{ id: 'z', label: '|Z|', hl: true }, { id: 'phi', label: 'φ' }, { id: 'i', label: 'I (bei 1 V)' }, { id: 'f0', label: 'f₀' }, { id: 'kind', label: 'Verhalten' }]);
  const g = goals(root, [{ id: 'res', label: 'Resonanz finden: φ ≈ 0° (±3°)' }, { id: 'cap', label: 'Kapazitiv (φ < −30°) einstellen' }], () => complete?.());
  function run() {
    const { f, R, L, C } = ui.values, w = 2 * Math.PI * f, XL = w * L, XC = 1 / (w * C), X = XL - XC, Z = Math.hypot(R, X), phi = Math.atan2(X, R) * 180 / Math.PI;
    const I = 1 / Z;   // Strom bei 1 V Quellenspannung
    ph.set([
      { id: 'UR', mag: I * R, phase: 0, label: 'U_R', color: 'var(--accent)' },
      { id: 'UL', mag: I * XL, phase: 90, label: 'U_L', color: 'var(--accent-2)', from: 'UR' },
      { id: 'UC', mag: I * XC, phase: -90, label: 'U_C', color: 'var(--warn)', from: 'UL' },
    ], { sum: { id: 'U', of: ['UR', 'UL', 'UC'], label: 'U', dashed: true }, arc: 'U' });
    tri.set({ R, X });
    out.set({ z: fmt(Z, 'Ω'), phi: phi.toFixed(1).replace('.', ',') + '°', i: fmt(I, 'A'), f0: fmt(1 / (2 * Math.PI * Math.sqrt(L * C)), 'Hz'), kind: Math.abs(phi) < 3 ? 'ohmsch (Resonanz)' : phi > 0 ? 'induktiv' : 'kapazitiv' });
    if (Math.abs(phi) < 3) g.reach('res');
    if (phi < -30) g.reach('cap');
  }
  run();
}
