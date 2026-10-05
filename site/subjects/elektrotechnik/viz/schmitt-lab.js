// Schmitt-Trigger (invertierend): Eingang am −Eingang, Mitkopplung R₂ von Ausgang auf +Eingang, R₁ nach Masse.
// Schwellen ±U_sat·R₁/(R₁+R₂). Das verrauschte Eingangssignal wird mit und ohne Hysterese verglichen.
// params: { rails?: 12 } — Ziel: sauberes Rechtecksignal ohne Mehrfachschalten (genau 2 Flanken je Periode), obwohl Rauschen überlagert ist.
import { Netlist, transient } from '../../../assets/js/vizkit/circuit.js';
import { drawSchematic } from '../../../assets/js/vizkit/schematic.js';
import { plot } from '../../../assets/js/vizkit/plot.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { fmt } from '../../../assets/js/vizkit/si.js';
import { h } from '../../../assets/js/vizkit/base.js';

const noiseShape = t => 0.55 * Math.sin(2 * Math.PI * 41e3 * t + 1) + 0.45 * Math.sin(2 * Math.PI * 97e3 * t + 2);   // Störung, normiert auf ca. ±1

export default function mount(stage, { params = {}, complete }) {
  const rail = params.rails ?? 12, f = 1e3, T = 1 / f;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const holder = h('div'), pbox = h('div'); root.append(holder, pbox);
  const R1 = { id: 'R1', type: 'R', at: [7, 11], rot: 90, value: 10e3 }, R2 = { id: 'R2', type: 'R', at: [10, 11], value: 100e3 };
  const sch = drawSchematic(holder, {
    parts: [{ id: 'OA1', type: 'OA', at: [8, 6] }, { id: 'in', type: 'TERM', at: [2, 6], label: 'u₁', labelPos: 'l' }, R1, R2,
      { id: 'g1', type: 'GND', at: [7, 15] }, { id: 'out', type: 'TERM', at: [17, 7], label: 'u₂', labelPos: 'r' }],
    wires: [{ pts: ['in.a', 'OA1.m'], net: 'in' }, { pts: ['OA1.o', [14, 7], [14, 11], 'R2.b'], net: 'out' }, { pts: [[14, 7], 'out.a'], net: 'out' },
      { pts: ['R2.a', 'R1.a'], net: 'p' }, { pts: [[7, 11], [7, 8], 'OA1.p'], net: 'p' }, { pts: ['R1.b', 'g1.a'], net: '0' }],
  });
  const p = plot(pbox, { h: 300, legend: true, x: { unit: 's', label: 't' }, y: { unit: 'V', label: 'u₁', min: -2, max: 2 }, y2: { unit: 'V', label: 'u₂', min: -rail * 1.2, max: rail * 1.2 } });
  const ui = controls(root, [
    { id: 'R1', label: 'R₁ (nach Masse)', unit: 'Ω', min: 100, max: 1e5, value: 1e3, scale: 'log', snap: 'E12' },
    { id: 'R2', label: 'R₂ (Mitkopplung)', unit: 'Ω', min: 1e3, max: 1e6, value: 100e3, scale: 'log', snap: 'E12' },
    { id: 'rail', label: 'Ausgang ±U_sat', unit: 'V', min: 5, max: 15, step: 1, value: rail },
    { id: 'A', label: 'Signalamplitude', unit: 'V', min: 0.5, max: 2, step: 0.1, value: 1 },
    { id: 'noise', label: 'Rauschen (Spitze)', unit: 'V', min: 0, max: 1, step: 0.05, value: 0.5 },
  ], run);
  const out = readout(root, [{ id: 'th', label: 'Schwellen ±U_sat·R₁/(R₁+R₂)', hl: true }, { id: 'hy', label: 'Hysterese' }, { id: 'tog', label: 'Flanken pro Periode' }]);
  const g = goals(root, [{ id: 'clean', label: 'Genau 2 Flanken je Periode trotz Rauschen (Rauschen ≥ 0,5 V)' }], () => complete?.());

  function run() {
    const v = ui.values, N = 12, dt = T / 100;
    const net = new Netlist().V('Vin', 'in', '0', { wave: t => v.A * Math.sin(2 * Math.PI * f * t) + v.noise * noiseShape(t) })
      .OA('OA1', 'p', 'in', 'out', { rails: [-v.rail, v.rail] }).R('R2', 'out', 'p', v.R2).R('R1', 'p', '0', v.R1);
    const tr = transient(net, { tstop: N * T, dt });
    const k0 = 200, ts = tr.t.subarray(k0), vin = tr.v.in.subarray(k0), vo = tr.v.out.subarray(k0);
    const uth = v.rail * v.R1 / (v.R1 + v.R2);
    p.line('in', ts, vin, { color: 'var(--accent)', label: 'u₁ (Signal + Rauschen)', width: 1.4, axis: 'y' });
    p.line('out', ts, vo, { color: 'var(--accent-2)', label: 'u₂', axis: 'y2', width: 2.2 });
    p.hband('band', -uth, uth, { color: 'var(--warn)', opacity: 0.18, axis: 'y' });
    p.hline('hi', uth, { dash: '4 4', axis: 'y', color: 'var(--warn)' }); p.hline('lo', -uth, { dash: '4 4', axis: 'y', color: 'var(--warn)' });
    let edges = 0, prev = Math.sign(vo[0]); for (const x of vo) { const s = Math.sign(x); if (Math.abs(x) > v.rail * 0.5 && s !== prev) { edges++; prev = s; } }
    const per = edges / (N - 2);
    ['R1', 'R2'].forEach(k => sch.set(k, { value: v[k] }));
    const kk = tr.n - 1 - 20; sch.setState({ v: Object.fromEntries(Object.entries(tr.v).map(([nm, a]) => [nm, a[kk]])), i: Object.fromEntries(Object.entries(tr.i).map(([nm, a]) => [nm, a[kk]])) });
    out.set({ th: '± ' + fmt(uth, 'V'), hy: fmt(2 * uth, 'V'), tog: per.toFixed(1).replace('.', ',') });
    if (v.noise >= 0.5 && Math.abs(per - 2) < 0.05) g.reach('clean');
  }
  run();
}
