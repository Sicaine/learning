// MOSFET-Labor (n-Kanal, selbstsperrend): Kennlinienfeld mit Lastgerade und Schalterbetrieb mit Verlustleistung.
// params: { vdd?: 12, rload?: 12, uth?: 3, kp?: 0.5 }
// Ziele: (1) U_GS unter U_th: Transistor sperrt, (2) Last voll durchschalten (U_DS < 0,5 V), (3) 10 A mit unter 1 W Verlust schalten.
import { Netlist, dcSolve } from '../../../assets/js/vizkit/circuit.js';
import { drawSchematic } from '../../../assets/js/vizkit/schematic.js';
import { plot } from '../../../assets/js/vizkit/plot.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { fmt } from '../../../assets/js/vizkit/si.js';
import { h } from '../../../assets/js/vizkit/base.js';

export default function mount(stage, { params = {}, complete, md }) {
  const vdd = params.vdd ?? 12, rl = params.rload ?? 12, uth = params.uth ?? 3, kp = params.kp ?? 0.5;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const mode0 = params.mode ?? 'curves';
  const ui0 = controls(root, [{ id: 'mode', type: 'seg', options: [['curves', 'Kennlinienfeld'], ['switch', 'Schalter mit 10-A-Last']], value: mode0 }], () => show());
  const box1 = h('div'), box2 = h('div');
  root.append(box1, box2);

  // Level-1-Modell wie im Simulator (n-Kanal)
  const idOf = (ugs, uds) => {
    const vov = ugs - uth; if (vov <= 0 || uds <= 0) return 0;
    return uds < vov ? kp * (vov * uds - uds * uds / 2) : kp / 2 * vov * vov;
  };

  // ── Modus 1: Kennlinienfeld ──
  const net = new Netlist().V('Vdd', 'vdd', '0', vdd).R('RL', 'vdd', 'd', rl).V('Vg', 'g', '0', 0).M('M1', 'd', 'g', '0', { vto: uth, kp, lambda: 0 });
  const spec = {
    parts: [
      { id: 'Vdd', type: 'V', at: [2, 3], rot: 90, value: vdd },
      { id: 'RL', type: 'R', at: [10, 2], rot: 90, value: rl },
      { id: 'M1', type: 'FET', at: [8, 8], pol: 'n' },
      { id: 'Vg', type: 'V', at: [4, 8], rot: 90, label: 'U_GS' },
      { id: 'g1', type: 'GND', at: [8, 13] },
    ],
    wires: [
      { pts: ['Vdd.p', [2, 2], 'RL.a'], net: 'vdd' }, { pts: ['RL.b', 'M1.d'], net: 'd' },
      { pts: ['Vg.p', 'M1.g'], net: 'g' }, { pts: ['M1.s', [10, 13], 'g1.a'], net: '0' },
      { pts: ['Vdd.n', [2, 13], [10, 13]], net: '0' }, { pts: ['Vg.n', [4, 13]], net: '0' },
    ],
  };
  const sch = drawSchematic(box1, spec);
  const p = plot(box1, { h: 270, legend: false, x: { unit: 'V', label: 'U_DS', min: 0, max: vdd + 2 }, y: { unit: 'A', label: 'I_D', min: 0, max: 2.4 } });
  const U = [...Array.from({ length: 121 }, (_, k) => k * (vdd + 2) / 120)];
  [4, 5, 6, 8, 10].forEach((ug, i) => p.line('g' + ug, U, U.map(u => idOf(ug, u)), { color: 'var(--line-2)', width: 1.4, label: `U_GS = ${ug} V` }));
  p.line('last', [0, vdd], [vdd / rl, 0], { color: 'var(--accent-2)', dash: '6 4', width: 1.8 });
  const ui = controls(box1, [{ id: 'ugs', label: 'Gate-Source-Spannung U_GS', unit: 'V', min: 0, max: 10, step: 0.1, value: 0 }], run);
  const out = readout(box1, [{ id: 'state', label: 'Zustand', hl: true }, { id: 'id', label: 'I_D' }, { id: 'uds', label: 'U_DS' }, { id: 'p', label: 'Verlust U_DS·I_D' }]);
  const g1 = goals(box1, [{ id: 'off', label: 'Sperrt: U_GS < U_th (I_D = 0)' }, { id: 'on', label: `Durchgeschaltet: U_DS < 0,5 V bei R_L = ${rl} Ω` }], check);

  function run() {
    const ugs = ui.values.ugs;
    net.set('Vg', { dc: ugs });
    const r = dcSolve(net), ud = r.v.d, id = Math.abs(r.i.M1 ?? 0);
    const region = ugs <= uth ? 'sperrt' : ud < ugs - uth ? 'Triodenbereich (Schalter ein)' : 'Sättigung (Verstärker)';
    sch.set('Vg', { value: ugs }); sch.setState({ v: { vdd, d: ud, g: ugs, '0': 0 }, i: { RL: id, M1: id, Vdd: -id } });
    p.marker('op', ud, id, { label: 'Arbeitspunkt' });
    out.set({ state: region, id: fmt(id, 'A'), uds: fmt(ud, 'V'), p: fmt(ud * id, 'W') });
    if (ugs < uth - 0.05) g1.reach('off');
    if (ud < 0.5 && id > 0.5) g1.reach('on');
  }

  // ── Modus 2: Schalter, Verlustleistung ──
  const p2 = plot(box2, { h: 260, x: { scale: 'log', unit: 'Ω', label: 'R_DS(on)', min: 1e-3, max: 1 }, y: { scale: 'log', unit: 'W', label: 'P_V bei 10 A', min: 0.1, max: 100 } });
  const Rs = Array.from({ length: 40 }, (_, k) => 1e-3 * 1000 ** (k / 39));
  p2.line('p', Rs, Rs.map(r => 100 * r), { color: 'var(--accent)' });
  p2.hline('lim', 1, { label: '1 W', dash: '5 4', color: 'var(--bad)' });
  const ui2 = controls(box2, [
    { id: 'rds', label: 'R_DS(on)', unit: 'Ω', min: 1e-3, max: 1, value: 0.2, scale: 'log', snap: 'E12' },
    { id: 'I', label: 'Laststrom I', unit: 'A', min: 1, max: 20, step: 1, value: 10 },
  ], run2);
  const out2 = readout(box2, [{ id: 'pv', label: 'P_V = I²·R_DS(on)', hl: true }, { id: 'dt', label: 'Erwärmung (R_th = 60 K/W, Annahme)' }, { id: 'u', label: 'U_DS im Betrieb' }]);
  const g2 = goals(box2, [{ id: 'sw', label: '10 A schalten mit weniger als 1 W Verlust' }], check);
  function run2() {
    const { rds, I } = ui2.values, pv = I * I * rds;
    p2.marker('op', rds, Math.min(100, Math.max(0.1, I * I * rds)), { label: fmt(pv, 'W') });
    out2.set({ pv: fmt(pv, 'W'), dt: fmt(pv * 60, 'K').replace(' K', ' K') + (pv * 60 > 100 ? ' – viel zu heiß' : ''), u: fmt(I * rds, 'V') });
    if (I >= 10 && pv < 1) g2.reach('sw');
  }
  function check() { if (g1.all && g2.all) complete?.(); }
  function show() {
    const m = ui0.values.mode;
    box1.style.display = m === 'curves' ? '' : 'none'; box2.style.display = m === 'switch' ? '' : 'none';
  }
  run(); run2(); show();
}
