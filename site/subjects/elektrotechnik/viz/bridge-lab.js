// D13 bridge-lab — Wheatstone-Brücke abgleichen, unbekannten Widerstand R_x bestimmen; Ansicht „Thévenin“: Teiler als Ersatzquelle.
// params: { U?: V (10), R1?: Ω (1k), R2?: Ω (2k), rx?: Ω (sonst zufällig aus einer Liste) , tol?: V Abgleichschwelle (0.001) }
import { Netlist, dcSolve } from '../../../assets/js/vizkit/circuit.js';
import { drawSchematic } from '../../../assets/js/vizkit/schematic.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { fmt, parse } from '../../../assets/js/vizkit/si.js';
import { h } from '../../../assets/js/vizkit/base.js';

const RX = [330, 470, 680, 1500, 2200, 3300, 4700];

export default function mount(stage, { params = {}, complete }) {
  const U = params.U ?? 10, R1 = params.R1 ?? 1e3, R2 = params.R2 ?? 2e3, tolV = params.tol ?? 0.001;
  const rx = params.rx ?? RX[Math.floor(Math.random() * RX.length)];
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  root.__rx = rx;   // für automatische Tests; steht nicht im DOM

  // ── Netz: links Teiler R1/R2, rechts R3/Rx, Brücke zwischen a und b ──
  const net = new Netlist().V('V1', 'in', '0', U).R('R1', 'in', 'a', R1).R('R2', 'a', '0', R2).R('R3', 'in', 'b', 1e3).R('RX', 'b', '0', rx).R('RM', 'a', 'b', 1e9);
  const bridgeSch = drawSchematic(root, {
    title: 'Wheatstone-Brücke',
    parts: [
      { id: 'V1', type: 'V', at: [2, 6], rot: 90, value: U, label: 'U' },
      { id: 'R1', type: 'R', at: [8, 2], rot: 90, value: R1, label: 'R₁' },
      { id: 'R2', type: 'R', at: [8, 10], rot: 90, value: R2, label: 'R₂' },
      { id: 'R3', type: 'R', at: [20, 2], rot: 90, value: 1e3, label: 'R₃', adjust: false },
      { id: 'RX', type: 'R', at: [20, 10], rot: 90, valueText: '?', label: 'R_x' },
      { id: 'RM', type: 'VM', at: [10, 8], value: 0, label: 'U_B', letter: 'V' },
      { type: 'GND', at: [14, 14] },
      { id: 'a', type: 'TERM', at: [8, 8] }, { id: 'b', type: 'TERM', at: [20, 8] },
    ],
    wires: [
      { pts: ['V1.p', [2, 2], 'R1.a', [14, 2], 'R3.a'], net: 'in' },
      { pts: ['R1.b', 'a.a', 'R2.a'], net: 'a' }, { pts: ['R3.b', 'b.a', 'RX.a'], net: 'b' },
      { pts: ['a.a', 'RM.a'], net: 'a' }, { pts: ['RM.b', 'b.a'], net: 'b' },
      { pts: ['V1.n', [2, 14], [20, 14], 'RX.b'], net: '0' }, { pts: ['R2.b', [8, 14]], net: '0' },
    ],
  });
  // ── Thévenin-Ansicht ──
  const thev = h('div', { class: 'vk' });
  const tnet = new Netlist().V('V0', 'u', '0', U * R2 / (R1 + R2)).R('RIT', 'u', 'k', R1 * R2 / (R1 + R2)).R('RLT', 'k', '0', 1e3);
  const lnet = new Netlist().V('V1', 'in', '0', U).R('R1', 'in', 'k', R1).R('R2', 'k', '0', R2).R('RL', 'k', '0', 1e3);
  const origSch = drawSchematic(thev, {
    title: 'Original-Teiler mit Last',
    parts: [
      { id: 'V1', type: 'V', at: [2, 4], rot: 90, value: U, label: 'U' },
      { id: 'R1', type: 'R', at: [6, 2], value: R1, label: 'R₁' }, { id: 'R2', type: 'R', at: [11, 4], rot: 90, value: R2, label: 'R₂' },
      { id: 'RL', type: 'R', at: [17, 4], rot: 90, value: 1e3, label: 'R_L' }, { type: 'GND', at: [8, 8] },
      { id: 'k', type: 'TERM', at: [14, 2] },
    ],
    wires: [{ pts: ['V1.p', [2, 2], 'R1.a'], net: 'in' }, { pts: ['R1.b', [11, 2], 'k.a', [17, 2], 'RL.a'], net: 'k' }, { pts: ['R2.a', [11, 2]], net: 'k' }, { pts: ['V1.n', [2, 8], [17, 8], 'RL.b'], net: '0' }, { pts: ['R2.b', [11, 8]], net: '0' }],
  });
  const thSch = drawSchematic(thev, {
    title: 'Ersatzspannungsquelle mit Last',
    parts: [
      { id: 'V0', type: 'V', at: [2, 4], rot: 90, value: U * R2 / (R1 + R2), label: 'U₀' },
      { id: 'RIT', type: 'R', at: [6, 2], value: R1 * R2 / (R1 + R2), label: 'Rᵢ' },
      { id: 'RLT', type: 'R', at: [17, 4], rot: 90, value: 1e3, label: 'R_L' }, { type: 'GND', at: [8, 8] },
      { id: 'k', type: 'TERM', at: [14, 2] },
    ],
    wires: [{ pts: ['V0.p', [2, 2], 'RIT.a'], net: 'u' }, { pts: ['RIT.b', 'k.a', [17, 2], 'RLT.a'], net: 'k' }, { pts: ['V0.n', [2, 8], [17, 8], 'RLT.b'], net: '0' }],
  });
  root.append(thev);

  // ── Bedienung ──
  const ui = controls(root, [
    { type: 'seg', id: 'view', label: 'Ansicht', options: [['bridge', 'Brücke abgleichen'], ['thev', 'Thévenin: Ersatzquelle']], value: 'bridge' },
    { id: 'grob', label: 'R₃ grob', unit: 'Ω', min: 100, max: 10e3, scale: 'log', value: 1e3 },
    { id: 'fein', label: 'R₃ fein', unit: '%', min: -5, max: 5, step: 0.01, value: 0, digits: 3, format: v => (v >= 0 ? '+' : '') + v.toFixed(2).replace('.', ',') + ' %' },
    { id: 'RL', label: 'Last R_L (Ersatzquelle-Ansicht)', unit: 'Ω', min: 100, max: 10e3, scale: 'log', value: 3e3 },
  ], run);
  const out = readout(root, [{ id: 'r3', label: 'R₃' }, { id: 'ub', label: 'U_B', hl: true }, { id: 'state', label: 'Brücke' }, { id: 'u0', label: 'U₀ (Teiler)' }, { id: 'ri', label: 'Rᵢ (Teiler)' }, { id: 'ul', label: 'U an R_L (Original)' }, { id: 'ule', label: 'U an R_L (Ersatz)' }]);
  const guess = h('div', { class: 'vz-controls', style: 'gap:8px' });
  const inp = h('input', { type: 'text', inputmode: 'text', placeholder: 'R_x = … (z. B. 940 oder 1k5)', 'aria-label': 'Ergebnis für R_x', style: 'flex:1;min-width:150px;padding:7px 10px;border:1px solid var(--line-2);border-radius:9px;font:500 .9rem var(--mono)' });
  const btn = h('button', { type: 'button', class: 'btn small', text: 'R_x prüfen' });
  const msg = h('span', { class: 'vz-note' });
  guess.append(inp, btn, msg); root.append(guess);
  const g = goals(root, [
    { id: 'bal', label: 'Brücke abgeglichen (|U_B| < 1 mV)' },
    { id: 'rx', label: 'R_x richtig bestimmt (±2 %)' },
    { id: 'th', label: 'Ersatzquelle: R_L = Rᵢ → U = U₀/2' },
  ], () => complete?.());
  let balanced = false;
  btn.onclick = () => {
    const v = parse(inp.value.replace(/\s|Ω/g, ''));
    if (Number.isNaN(v)) { msg.textContent = 'Zahl nicht lesbar — z. B. 940 oder 1k5.'; return; }
    if (Math.abs(v / rx - 1) <= 0.02) { msg.textContent = 'Stimmt: ' + fmt(rx, 'Ω'); g.reach('rx'); }
    else msg.textContent = balanced ? 'Noch nicht: R_x = R₃·R₂/R₁ — rechne mit dem abgeglichenen R₃.' : 'Gleiche zuerst die Brücke ab (U_B → 0).';
  };

  function run() {
    const v = ui.values, R3 = v.grob * (1 + v.fein / 100);
    for (const id of ['grob', 'fein']) ui.el.querySelector(`[data-id="${id}"]`).style.display = v.view === 'bridge' ? '' : 'none';
    ui.el.querySelector('[data-id="RL"]').style.display = v.view === 'thev' ? '' : 'none';
    bridgeSch.el.style.display = v.view === 'bridge' ? '' : 'none';
    thev.style.display = v.view === 'thev' ? '' : 'none';
    guess.style.display = v.view === 'bridge' ? '' : 'none';
    const showB = v.view === 'bridge';
    for (const id of ['r3', 'ub', 'state']) out.el.children[['r3', 'ub', 'state'].indexOf(id)].style.display = showB ? '' : 'none';
    for (let k = 3; k < 7; k++) out.el.children[k].style.display = showB ? 'none' : '';
    net.set('R3', R3);
    const r = dcSolve(net), ub = r.v.a - r.v.b;
    bridgeSch.set('R3', { value: R3 }); bridgeSch.set('RM', { value: Math.abs(ub) < 1e-4 ? 0 : ub, valueText: (ub >= 0 ? '' : '−') + fmt(Math.abs(ub), 'V', 3) });
    bridgeSch.setState({ v: r.v, i: r.i });
    balanced = Math.abs(ub) < tolV;
    out.set({ r3: fmt(R3, 'Ω', 4), ub: fmt(ub, 'V'), state: balanced ? 'abgeglichen ✓' : ub > 0 ? 'a höher als b' : 'b höher als a' });
    if (balanced) { g.reach('bal'); if (!msg.textContent.startsWith('Stimmt')) msg.textContent = 'Abgeglichen! Welches R_x folgt aus R₁/R₂ = R₃/R_x?'; }
    // Thévenin
    tnet.set('RLT', v.RL); lnet.set('RL', v.RL);
    const a = dcSolve(lnet), b = dcSolve(tnet);
    origSch.set('RL', { value: v.RL }); thSch.set('RLT', { value: v.RL });
    origSch.setState({ v: a.v, i: a.i }); thSch.setState({ v: b.v, i: b.i });
    const u0 = U * R2 / (R1 + R2), ri = R1 * R2 / (R1 + R2);
    out.set({ u0: fmt(u0, 'V'), ri: fmt(ri, 'Ω'), ul: fmt(a.v.k, 'V'), ule: fmt(b.v.k, 'V') });
    if (v.view === 'thev' && Math.abs(v.RL / ri - 1) < 0.05) g.reach('th');
  }
  run();
}
