// D11 divider-lab — Spannungsteiler unbelastet und belastet, mit Potentiometer-Variante.
// Plan mit Stromfluss, Kurve U_aus(R_L), Belastungsfehler und Querstrom-Faustregel.
// params: { target?: 5 (V), tol?: 0.1 (V), uin?: 12, rl?: 10e3 (Last für das Ziel, Ω), series?: 'E24', goals?: true }
//   Ziel 1: U_aus = target ± tol bei angeschlossener Last rl (±1 %).
//   Ziel 2: gleichzeitig Querstrom ≥ 10 × Laststrom (Faustregel).
import { Netlist, dcSolve } from '../../../assets/js/vizkit/circuit.js';
import { drawSchematic } from '../../../assets/js/vizkit/schematic.js';
import { plot } from '../../../assets/js/vizkit/plot.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { fmt, logspace } from '../../../assets/js/vizkit/si.js';
import { h } from '../../../assets/js/vizkit/base.js';

export default function mount(stage, { params = {}, complete }) {
  const target = params.target ?? 5, tol = params.tol ?? 0.1, rlGoal = params.rl ?? 10e3, ser = params.series || 'E24';
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const box = h('div'); root.append(box);
  const p = plot(root, { h: 250, x: { scale: 'log', unit: 'Ω', label: 'Last R_L', min: 100, max: 1e6 }, y: { unit: 'V', label: 'U_aus', min: 0 } });
  const ui = controls(root, [
    { id: 'mode', type: 'seg', options: [['fix', 'Festwiderstände'], ['pot', 'Potentiometer']], value: 'fix' },
    { id: 'U', label: 'Eingangsspannung U_ein', unit: 'V', min: 1, max: 24, step: 0.5, value: params.uin ?? 12 },
    { id: 'R1', label: 'R₁ (oben)', unit: 'Ω', min: 100, max: 100e3, scale: 'log', snap: ser, value: 4.7e3 },
    { id: 'R2', label: 'R₂ (unten)', unit: 'Ω', min: 100, max: 100e3, scale: 'log', snap: ser, value: 4.7e3 },
    { id: 'Rp', label: 'Poti-Gesamtwert', unit: 'Ω', min: 1e3, max: 100e3, scale: 'log', snap: 'E6', value: 10e3 },
    { id: 'pos', label: 'Schleiferstellung', unit: '%', min: 0, max: 100, step: 1, value: 50, format: v => v + ' %' },
    { id: 'load', type: 'toggle', label: 'Last R_L anschließen', value: false },
    { id: 'RL', label: 'Last R_L', unit: 'Ω', min: 100, max: 1e6, scale: 'log', snap: 'E12', value: rlGoal },
  ], run);
  const out = readout(root, [
    { id: 'uo', label: 'U_aus', hl: true }, { id: 'u0', label: 'U_aus unbelastet' }, { id: 'err', label: 'Belastungsfehler' },
    { id: 'iq', label: 'Querstrom I_q' }, { id: 'il', label: 'Laststrom I_L' }, { id: 'ratio', label: 'I_q / I_L' },
  ]);
  const g = goals(root, [
    { id: 'u', label: `${fmt(target, 'V')} ± ${fmt(tol, 'V')} bei R_L = ${fmt(rlGoal, 'Ω')}` },
    { id: 'q', label: 'Querstrom ≥ 10 × Laststrom' },
  ], () => complete?.());
  p.hline('tg', target, { label: 'Ziel', color: 'var(--good)' });
  const xs = logspace(100, 1e6, 140);
  let sch = null, lastKey = '';

  function layout(v) {
    const pot = v.mode === 'pot', yo = pot ? 5 : 3;
    const parts = [{ id: 'V1', type: 'V', at: [2, 3], rot: 90, value: v.U, label: 'U_ein', labelPos: 'l' }];
    const wires = [], texts = [];
    if (!pot) {
      parts.push({ id: 'R1', type: 'R', at: [6, 3], value: R1(v), label: 'R₁' }, { id: 'R2', type: 'R', at: [12, 3], rot: 90, value: R2(v), label: 'R₂' });
      wires.push({ pts: ['V1.p', 'R1.a'], net: 'in' }, { pts: ['R1.b', 'R2.a', [17, 3], 'o.a'], net: 'out' }, { pts: ['V1.n', [2, 9], [12, 9], 'R2.b'], net: '0' });
      if (v.load) wires.push({ pts: [[12, 9], [17, 9], 'RL.b'], net: '0' });
    } else {
      parts.push({ id: 'POT', type: 'POT', at: [10, 3], rot: 90, value: v.Rp, label: 'Poti', labelPos: 'l', el: 'Rpot' });
      wires.push({ pts: ['V1.p', [2, 3], [10, 3]], net: 'in' }, { pts: ['POT.w', [17, 5], 'o.a'], net: 'out' }, { pts: ['V1.n', [2, 9], [10, 9], 'POT.b'], net: '0' });
      if (v.load) wires.push({ pts: [[10, 9], [17, 9], 'RL.b'], net: '0' });
      texts.push({ at: [11.6, 3.2], text: `R₁ = ${fmt(R1(v), 'Ω')}`, anchor: 'start' }, { at: [11.6, 7.4], text: `R₂ = ${fmt(R2(v), 'Ω')}`, anchor: 'start' });
    }
    parts.push({ id: 'o', type: 'TERM', at: [21, yo], label: 'U_aus', labelPos: 'r' });
    if (v.load) parts.push({ id: 'RL', type: 'R', at: [17, yo], rot: 90, value: v.RL, label: 'R_L', labelPos: 'r' });
    parts.push({ type: 'GND', at: [pot ? 6 : 7, 9] });
    return { parts, wires, texts };
  }
  const R1 = v => v.mode === 'pot' ? v.Rp * (1 - v.pos / 100) : v.R1;
  const R2 = v => v.mode === 'pot' ? v.Rp * v.pos / 100 : v.R2;

  function run(v = ui.values) {
    const r1 = R1(v), r2 = Math.max(R2(v), 1e-3), rl = v.load ? v.RL : Infinity;
    // Sichtbarkeit der Regler
    const pot = v.mode === 'pot';
    for (const id of ['R1', 'R2']) ui.el.querySelector(`[data-id="${id}"]`).style.display = pot ? 'none' : '';
    for (const id of ['Rp', 'pos']) ui.el.querySelector(`[data-id="${id}"]`).style.display = pot ? '' : 'none';
    ui.el.querySelector('[data-id="RL"]').style.display = v.load ? '' : 'none';
    const net = new Netlist().V('V1', 'in', '0', v.U).R('R1', 'in', 'out', r1).R('R2', 'out', '0', r2);
    if (v.load) net.R('RL', 'out', '0', v.RL);
    const r = dcSolve(net);
    const key = [v.mode, v.load, pot ? 0 : 1].join();
    if (key !== lastKey || !sch) { sch?.destroy(); const L = layout(v); sch = drawSchematic(box, { grid: 16, maxWidth: 560, ...L }); lastKey = key; }
    else {
      sch.set('V1', { value: v.U });
      if (!pot) { sch.set('R1', { value: r1 }); sch.set('R2', { value: r2 }); } else { sch.set('POT', { value: v.Rp }); }
      if (v.load) sch.set('RL', { value: v.RL });
    }
    sch.setState({ v: r.v, i: { ...r.i, Rpot: r.i.R1 } });
    // Kurve
    const u0 = v.U * r2 / (r1 + r2), uo = r.v.out;
    p.line('u', xs, xs.map(x => { const rp = r2 * x / (r2 + x); return v.U * rp / (r1 + rp); }), { color: 'var(--accent)', label: 'U_aus(R_L)' });
    p.hline('u0', u0, { label: 'unbelastet', dash: '5 4', color: 'var(--muted)' });
    p.range({ y: [0, Math.max(v.U, 1)] });
    if (v.load) p.marker('op', v.RL, uo, { label: fmt(uo, 'V') }); else p.removeAnn('op');
    const iq = v.U / (r1 + r2), il = v.load ? uo / v.RL : 0;
    out.set({ uo: fmt(uo, 'V'), u0: fmt(u0, 'V'), err: ((uo / u0 - 1) * 100).toFixed(1).replace('.', ',').replace('-', '−') + ' %', iq: fmt(iq, 'A'), il: v.load ? fmt(il, 'A') : '—', ratio: v.load ? (iq / il).toFixed(1).replace('.', ',') : '—' });
    const okU = v.load && Math.abs(v.RL / rlGoal - 1) < 0.011 && Math.abs(uo - target) <= tol + 1e-9;
    if (okU) g.reach('u');
    if (okU && iq >= 10 * il) g.reach('q');
  }
  run();
}
