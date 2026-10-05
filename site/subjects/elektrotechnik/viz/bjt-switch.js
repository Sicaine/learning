// Bipolartransistor als Schalter: Basisvorwiderstand dimensionieren, Streuung der Stromverstärkung berücksichtigen.
// params: { ucc?: 5, bmin?: 50, maxOverdrive?: 5 } — Ziel: auch beim schlechtesten Exemplar (B_min) sicher sättigen, ohne den Basisstrom zu verschwenden.
import { Netlist, dcSolve } from '../../../assets/js/vizkit/circuit.js';
import { drawSchematic } from '../../../assets/js/vizkit/schematic.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { fmt } from '../../../assets/js/vizkit/si.js';
import { h } from '../../../assets/js/vizkit/base.js';

export default function mount(stage, { params = {}, complete }) {
  const ucc = params.ucc ?? 5, bmin = params.bmin ?? 50, maxOv = params.maxOverdrive ?? 5;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const net = (RB, RC, B, on) => new Netlist().V('Vcc', 'vcc', '0', ucc).V('Vin', 'in', '0', on ? ucc : 0).R('RB', 'in', 'b', RB).R('RC', 'vcc', 'c', RC).Q('Q1', 'c', 'b', '0', { bf: B });
  const spec = {
    parts: [
      { id: 'uin', type: 'TERM', at: [0, 8], label: 'U_ein', labelPos: 't' },
      { id: 'SW', type: 'SW', at: [1, 8], closed: true },
      { id: 'RB', type: 'R', at: [6, 8], value: 1e4 },
      { id: 'Q1', type: 'Q', at: [12, 8], pol: 'npn' },
      { id: 'RC', type: 'LAMP', at: [14, 2], rot: 90, label: 'Last R_C' },
      { id: 'vcc', type: 'TERM', at: [14, 1], label: '+' + ucc + ' V', labelPos: 'r' },
      { type: 'GND', at: [14, 11] },
    ],
    wires: [
      { pts: ['uin.a', 'SW.a'], net: 'in' }, { pts: ['SW.b', 'RB.a'], net: 'in' }, { pts: ['RB.b', 'Q1.b'], net: 'b' },
      { pts: ['vcc.a', 'RC.a'], net: 'vcc' }, { pts: ['RC.b', 'Q1.c'], net: 'c' }, { pts: ['Q1.e', [14, 11]], net: '0' },
    ],
  };
  const holder = h('div'); root.append(holder);
  const sch = drawSchematic(holder, spec);
  const ui = controls(root, [
    { id: 'on', type: 'toggle', label: `Eingang auf ${ucc} V (Schalter ein)`, value: true },
    { id: 'RB', label: 'Basisvorwiderstand R_B', unit: 'Ω', min: 100, max: 100e3, value: 10e3, scale: 'log', snap: 'E12' },
    { id: 'B', label: 'Stromverstärkung B dieses Exemplars', min: 50, max: 300, step: 10, value: 100, format: v => String(v) },
    { id: 'RC', type: 'seg', label: 'Last', options: [[100, '100 Ω ≈ 50 mA'], [47, '47 Ω ≈ 100 mA'], [22, '22 Ω ≈ 200 mA']], value: params.rc ?? 47 },
  ], run);
  const out = readout(root, [
    { id: 'ib', label: 'I_B' }, { id: 'ic', label: 'I_C', hl: true }, { id: 'uce', label: 'U_CE' }, { id: 'pv', label: 'Verlust im Transistor' }, { id: 'state', label: 'Zustand' },
  ]);
  const out2 = readout(root, [
    { id: 'ucemin', label: `U_CE bei B = ${bmin}` }, { id: 'ov', label: `Übersteuerung bei B = ${bmin}` },
  ]);
  const g = goals(root, [
    { id: 'sat', label: `sättigt auch bei B = ${bmin} (U_CE < 0,3 V)` },
    { id: 'eco', label: `Übersteuerung höchstens ${maxOv}-fach` },
  ], () => complete?.());

  function run() {
    const { on, RB, B, RC } = ui.values;
    const r = dcSolve(net(RB, RC, B, on));
    const ic = r.i.Q1, ib = r.i['Q1.b'], uce = r.v.c, ube = r.v.b;
    const isat = (ucc - 0.2) / RC;
    sch.set('RB', { value: RB }); sch.set('SW', { closed: on });
    sch.set('RC', { lit: Math.min(1, Math.max(0, ic / isat)), label: RC + ' Ω' });
    sch.setState({ v: r.v, i: r.i });
    const state = !on || ic < 1e-6 ? 'gesperrt' : uce < 0.3 ? 'gesättigt' : 'aktiv (Verstärker!)';
    out.set({ ib: fmt(ib, 'A', 3), ic: fmt(ic, 'A', 3), uce: fmt(uce, 'V', 3), pv: fmt(uce * ic + ube * ib, 'W', 2), state });
    const w = dcSolve(net(RB, RC, bmin, true)), uceW = w.v.c, ov = w.i['Q1.b'] * bmin / isat;
    out2.set({ ucemin: fmt(uceW, 'V', 3), ov: ov.toFixed(1).replace('.', ',') + '×' });
    if (uceW < 0.3) g.reach('sat');
    if (uceW < 0.3 && ov <= maxOv) g.reach('eco');
  }
  run();
}
