// D32 diode-iv-lab — Diodenkennlinie, Arbeitsgerade und Arbeitspunkt (L29 dioden).
// Quelle U_q – Vorwiderstand R_V – Diode/LED. Schnittpunkt von Kennlinie und Arbeitsgerade = Arbeitspunkt.
// params: { targetI?: A (Standard 10 mA), tol?: relativ (0,1), ymax?: A (30 mA), type?: Startdiode ('si') }
import { characteristic } from '../../../assets/js/vizkit/plot.js';
import { drawSchematic } from '../../../assets/js/vizkit/schematic.js';
import { Netlist } from '../../../assets/js/vizkit/circuit.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { fmt } from '../../../assets/js/vizkit/si.js';
import { h } from '../../../assets/js/vizkit/base.js';
import { DIODES, idiode, loadPoint } from './_5a-diode.js';

void Netlist;
const OPTIONS = [['si', 'Si'], ['ge', 'Ge'], ['schottky', 'Schottky'], ['rot', 'LED rot'], ['gruen', 'LED grün'], ['blau', 'LED blau']];

export default function mount(stage, { params = {}, complete }) {
  const target = params.targetI ?? 10e-3, tol = params.tol ?? 0.1, ymax = params.ymax ?? 0.03;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const holder = h('div'), plotBox = h('div'); root.append(holder, plotBox);
  let sch = null, schLed = null;
  const p = characteristic(plotBox, { h: 300, legend: true, x: { label: 'U_D' } });
  const ui = controls(root, [
    { id: 'type', type: 'seg', label: 'Bauteil', options: OPTIONS, value: params.type ?? 'si' },
    { id: 'Uq', label: 'Quellspannung U_q', unit: 'V', min: 0.5, max: 12, step: 0.1, value: 5 },
    { id: 'R', label: 'Vorwiderstand R_V', unit: 'Ω', min: 47, max: 10e3, value: 330, scale: 'log', snap: 'E12' },
    { id: 'T', label: 'Temperatur', unit: '°C', min: -20, max: 100, step: 1, value: 27 },
  ], run);
  const out = readout(root, [
    { id: 'I', label: 'Strom I_D', hl: true }, { id: 'U', label: 'Diodenspannung U_D' }, { id: 'UR', label: 'U am Widerstand' }, { id: 'PD', label: 'P Diode' }, { id: 'PR', label: 'P Widerstand' },
  ]);
  const g = goals(root, [
    { id: 'plain', label: `Si-Diode: ${fmt(target, 'A')} (±${Math.round(tol * 100)} %)` },
    { id: 'led', label: `LED: ${fmt(target, 'A')} (±${Math.round(tol * 100)} %)` },
  ], () => complete?.());

  function build(isLed) {
    if (sch && schLed === isLed) return;
    holder.replaceChildren(); schLed = isLed;
    sch = drawSchematic(holder, {
      parts: [
        { id: 'V1', type: 'V', at: [2, 3], rot: 90, label: 'U_q' },
        { id: 'R1', type: 'R', at: [6, 3], label: 'R_V' },
        { id: 'D1', type: isLed ? 'LED' : 'D', at: [12, 3], rot: 90, label: 'D' },
        { type: 'GND', at: [7, 9] },
      ],
      wires: [{ pts: ['V1.p', 'R1.a'], net: 'in' }, { pts: ['R1.b', 'D1.a'], net: 'out' }, { pts: ['V1.n', [2, 9], [12, 9], 'D1.k'], net: '0' }],
      maxWidth: 420,
    });
  }

  function run() {
    const { type, Uq, R } = ui.values, T = ui.values.T + 273.15, d = DIODES[type];
    build(!!d.led);
    // Kennlinien: gewählte Diode kräftig, die übrigen blass zum Vergleich
    const xmax = d.xmax, xs = Array.from({ length: 161 }, (_, i) => (i / 160) * xmax);
    for (const [id] of OPTIONS) {
      const dd = DIODES[id];
      p.line('c-' + id, xs, xs.map(u => idiode(dd, u, T)), id === type
        ? { color: d.css || 'var(--accent)', width: 3, label: d.label }
        : { color: 'var(--line-2)', width: 1.4, opacity: 0.9, hover: false });
    }
    p.line('load', [0, Uq], [Uq / R, 0], { color: 'var(--accent-2)', dash: '7 5', width: 2, label: 'Arbeitsgerade' });
    p.range({ x: [0, xmax], y: [0, ymax] });
    const { I, Ud } = loadPoint(d, Uq, R, 1, T);
    p.marker('op', Ud, Math.min(I, ymax), { label: `${fmt(I, 'A')} · ${fmt(Ud, 'V')}`, color: 'var(--ink)' });
    sch.setState({ v: { in: Uq, out: Ud, 0: 0 }, i: { R1: I, D1: I } });
    sch.set('D1', { color: d.css, iNom: 0.01 });
    sch.set('R1', { value: R }); sch.set('V1', { value: Uq });
    out.set({ I: fmt(I, 'A'), U: fmt(Ud, 'V'), UR: fmt(Uq - Ud, 'V'), PD: fmt(Ud * I, 'W'), PR: fmt(I * I * R, 'W') });
    if (Math.abs(I / target - 1) <= tol) g.reach(d.led ? 'led' : (type === 'si' ? 'plain' : 'none'));
  }
  run();
}
