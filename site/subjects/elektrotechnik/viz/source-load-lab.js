// D12 source-load-lab — reale Spannungsquelle (U₀ + Rᵢ) mit Last R_L: Klemmenspannung, Strom, Leistung, Wirkungsgrad.
// params: { U0?: V, Ri?: Ω, RL?: Ω, matchTol?: 0.06 (relativ), akku?: true (zweites Ziel „Akku: η ≥ 95 %“) }
import { Netlist, dcSolve, logspace } from '../../../assets/js/vizkit/circuit.js';
import { drawSchematic } from '../../../assets/js/vizkit/schematic.js';
import { plot } from '../../../assets/js/vizkit/plot.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { fmt } from '../../../assets/js/vizkit/si.js';
import { h, s } from '../../../assets/js/vizkit/base.js';

const pct = x => (x * 100).toFixed(1).replace('.', ',') + ' %';

export default function mount(stage, { params = {}, complete, md }) {
  const tol = params.matchTol ?? 0.06;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const net = new Netlist().V('V1', 'q', '0', 12).R('Ri', 'q', 'k', 0.5).R('RL', 'k', '0', 2.5);
  const adj = (min, max) => ({ min, max, scale: 'log' });
  const sch = drawSchematic(root, {
    title: 'Reale Spannungsquelle mit Last',
    parts: [
      { id: 'V1', type: 'VBAT', at: [3, 4], rot: 90, value: 12, label: 'U₀', labelPos: 'l' },
      { id: 'Ri', type: 'R', at: [5, 4], value: 0.5, label: 'Rᵢ', adjust: adj(0.05, 100) },
      { id: 'RL', type: 'R', at: [15, 4], rot: 90, value: 2.5, label: 'R_L', adjust: adj(0.1, 1000) },
      { type: 'GND', at: [9, 10] },
      { id: 'k', type: 'TERM', at: [12, 4] },
    ],
    wires: [
      { pts: ['V1.p', [3, 4], 'Ri.a'], net: 'q' }, { pts: ['Ri.b', 'k.a', 'RL.a'], net: 'k' }, { pts: ['V1.n', [3, 10], [15, 10], 'RL.b'], net: '0' },
    ],
    texts: [{ at: [5, 5.4], text: 'reale Quelle', size: 0.8 }, { at: [12, 3.1], text: 'U_K', anchor: 'middle', size: 0.8 }],
  });
  // gestrichelter Kasten um die reale Quelle
  sch.svg.append(s('rect', { x: 1.6 * 16, y: 2 * 16, width: 11.8 * 16, height: 4.2 * 16, rx: 10, fill: 'none', stroke: 'var(--muted)', 'stroke-width': 1.5, 'stroke-dasharray': '6 5' }));

  const pP = plot(root, { h: 250, x: { scale: 'log', unit: 'Ω', label: 'R_L', min: 0.1, max: 1000 }, y: { unit: 'W', label: 'P_L', include: [0] }, y2: { unit: '', label: 'η in %', min: 0, max: 100, format: v => v + ' %' }, legend: true });
  const pU = plot(root, { h: 220, x: { unit: 'A', label: 'I', include: [0] }, y: { unit: 'V', label: 'U_K', include: [0] } });
  const RLs = logspace(0.1, 1000, 160);

  const ui = controls(root, [
    { type: 'presets', items: [
      { label: 'Labornetzteil 12 V / 0,5 Ω', values: { U0: 12, Ri: 0.5, RL: 2.5 } },
      { label: 'Bleiakku 12,6 V / 0,05 Ω', values: { U0: 12.6, Ri: 0.05, RL: 1 } },
      { label: 'Knopfzelle 3 V / 50 Ω', values: { U0: 3, Ri: 50, RL: 1000 } },
    ] },
    { id: 'U0', label: 'Leerlaufspannung U₀', unit: 'V', min: 1, max: 24, step: 0.1, value: params.U0 ?? 12 },
    { id: 'Ri', label: 'Innenwiderstand Rᵢ', unit: 'Ω', min: 0.05, max: 100, scale: 'log', value: params.Ri ?? 0.5 },
    { id: 'RL', label: 'Lastwiderstand R_L', unit: 'Ω', min: 0.1, max: 1000, scale: 'log', value: params.RL ?? 2.5 },
  ], run);
  const out = readout(root, [
    { id: 'uk', label: 'U_K', hl: true }, { id: 'i', label: 'I' }, { id: 'pl', label: 'P_L' }, { id: 'pv', label: 'P in Rᵢ' }, { id: 'eta', label: 'η' }, { id: 'ik', label: 'I_K (Kurzschluss)' },
  ]);
  const defs = [{ id: 'match', label: 'Leistung maximal: R_L = Rᵢ (±6 %)' }];
  if (params.akku !== false) defs.push({ id: 'akku', label: 'Bleiakku-Preset: η ≥ 95 %' });
  const g = goals(root, defs, () => complete?.());
  const note = h('p', { class: 'vz-note' }); root.append(note);

  function run() {
    const v = ui.values;
    net.set('V1', { dc: v.U0 }); net.set('Ri', v.Ri); net.set('RL', v.RL);
    const r = dcSolve(net);
    const I = r.i.RL, UK = r.v.k, PL = UK * I, PV = I * I * v.Ri, eta = v.RL / (v.Ri + v.RL);
    sch.set('V1', { value: v.U0 }); sch.set('Ri', { value: v.Ri }); sch.set('RL', { value: v.RL });
    sch.setState({ v: r.v, i: r.i });
    pP.line('p', RLs, RLs.map(x => v.U0 * v.U0 * x / ((v.Ri + x) ** 2)), { color: 'var(--accent)', label: 'P_L(R_L)' });
    pP.line('eta', RLs, RLs.map(x => 100 * x / (v.Ri + x)), { axis: 'y2', color: 'var(--accent-2)', dash: '5 4', label: 'η(R_L)' });
    pP.vline('ri', v.Ri, { label: 'R_L = Rᵢ', color: 'var(--good)', dash: '4 4' });
    pP.marker('op', v.RL, PL, { label: fmt(PL, 'W') });
    const ik = v.U0 / v.Ri;
    pU.line('u', [0, ik], [v.U0, 0], { color: 'var(--accent)', label: 'U_K(I)' });
    pU.marker('op', I, UK, { label: `${fmt(UK, 'V')} bei ${fmt(I, 'A')}` });
    out.set({ uk: fmt(UK, 'V'), i: fmt(I, 'A'), pl: fmt(PL, 'W'), pv: fmt(PV, 'W'), eta: pct(eta), ik: fmt(ik, 'A') });
    note.textContent = eta > 0.9 ? 'Kaum Verlust in Rᵢ, aber die Last bekommt nicht die maximal mögliche Leistung.' : Math.abs(v.RL / v.Ri - 1) < tol ? 'Anpassung: Quelle und Last teilen sich die Leistung zu gleichen Teilen — η = 50 %.' : eta < 0.3 ? 'Die Last ist viel kleiner als Rᵢ: Fast alles bleibt als Wärme in der Quelle.' : '';
    if (Math.abs(v.RL / v.Ri - 1) < tol) g.reach('match');
    if (params.akku !== false && v.Ri <= 0.051 && eta >= 0.95) g.reach('akku');
  }
  run();
  void md;
}
