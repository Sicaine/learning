// D09 kirchhoff-lab — Netz mit drei Zweigen (R₁ in Reihe, dahinter R₂ ∥ R₃).
// Modus „Aufgabe": Der Lerner berechnet I₁, I₂, I₃ selbst und prüft sein Ergebnis mit „Knoten prüfen" und
// „Maschen prüfen" (zeigt, ob SEINE Zahlen die Kirchhoffschen Regeln erfüllen) und mit „Lösung prüfen".
// Modus „Experiment": Regler für U_q, R₁…R₃, alle Ströme und Spannungen sichtbar.
// params: { nets?: [{ U, R1, R2, R3 }], tol?: 0.02 (relative Toleranz), mode?: 'task'|'play' }
import { Netlist, dcSolve } from '../../../assets/js/vizkit/circuit.js';
import { drawSchematic } from '../../../assets/js/vizkit/schematic.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { fmt } from '../../../assets/js/vizkit/si.js';
import { h } from '../../../assets/js/vizkit/base.js';

const NETS = [
  { U: 12, R1: 200, R2: 300, R3: 600 },
  { U: 10, R1: 1000, R2: 2000, R3: 2000 },
  { U: 18, R1: 600, R2: 900, R3: 1800 },
];

function solve(n) {
  const net = new Netlist().V('V1', 'in', '0', n.U).R('R1', 'in', 'a', n.R1).R('R2', 'a', '0', n.R2).R('R3', 'a', '0', n.R3);
  const r = dcSolve(net);
  return { net, r, I1: r.i.R1, I2: r.i.R2, I3: r.i.R3, Ua: r.v.a };
}

export default function mount(stage, { params = {}, complete }) {
  const nets = params.nets || NETS, tol = params.tol ?? 0.02;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  let mode = params.mode || 'task', idx = 0, cur = { ...nets[0] };
  const solved = new Set();

  const modeSeg = h('div', { class: 'vz-seg vk-seg', role: 'group', 'aria-label': 'Modus' });
  const mTask = h('button', { type: 'button', text: 'Aufgabe', onclick: () => setMode('task') });
  const mPlay = h('button', { type: 'button', text: 'Experiment', onclick: () => setMode('play') });
  modeSeg.append(mTask, mPlay);
  const netSeg = h('div', { class: 'vz-seg vk-seg', role: 'group', 'aria-label': 'Netz wählen' });
  const netBtns = nets.map((_, k) => h('button', { type: 'button', text: 'Netz ' + (k + 1), onclick: () => pick(k) }));
  netSeg.append(...netBtns);
  root.append(h('div', { class: 'vk-presetrow' }, modeSeg, netSeg));

  const sch = drawSchematic(root, {
    grid: 16, maxWidth: 560,
    parts: [
      { id: 'V1', type: 'V', at: [2, 3], rot: 90, value: cur.U, label: 'U_q', labelPos: 'l' },
      { id: 'R1', type: 'R', at: [6, 3], value: cur.R1, label: 'R₁' },
      { id: 'R2', type: 'R', at: [13, 3], rot: 90, value: cur.R2, label: 'R₂' },
      { id: 'R3', type: 'R', at: [20, 3], rot: 90, value: cur.R3, label: 'R₃' },
      { type: 'GND', at: [10, 9] },
    ],
    wires: [
      { pts: ['V1.p', 'R1.a'], net: 'in' },
      { pts: ['R1.b', 'R2.a', 'R3.a'], net: 'a' },
      { pts: ['V1.n', [2, 9], [20, 9], 'R3.b'], net: '0' },
      { pts: ['R2.b', [13, 9]], net: '0' },
    ],
    texts: [
      { at: [8, 5.2], text: 'I₁ →', anchor: 'middle', color: 'var(--accent)' },
      { at: [12.4, 5.2], text: 'I₂ ↓', anchor: 'end', color: 'var(--accent)' },
      { at: [19.4, 5.2], text: 'I₃ ↓', anchor: 'end', color: 'var(--accent)' },
      { at: [12, 2.2], text: 'A', anchor: 'middle', color: 'var(--ink)' },
    ],
  });

  // Aufgaben-Panel
  const taskBox = h('div', { class: 'vk-task', style: 'display:grid;gap:10px' });
  const inputs = {};
  const inRow = h('div', { class: 'vz-controls vk-row' });
  for (const k of ['I1', 'I2', 'I3']) {
    const inp = h('input', { type: 'text', inputmode: 'decimal', placeholder: 'mA', 'aria-label': k + ' in mA', style: 'width:5.5em;font:500 .95rem var(--mono);padding:6px 8px;border:1px solid var(--line-2);border-radius:8px;text-align:right' });
    inputs[k] = inp;
    inRow.append(h('label', { style: 'display:flex;align-items:center;gap:6px;font-size:.9rem;color:var(--ink-2)' }, h('span', { text: k === 'I1' ? 'I₁ =' : k === 'I2' ? 'I₂ =' : 'I₃ =' }), inp, h('span', { text: 'mA' })));
  }
  const btnRow = h('div', { class: 'vk-presetrow' });
  const bNode = h('button', { type: 'button', class: 'btn small ghost', text: 'Knoten A prüfen', onclick: () => checkKirchhoff('node') });
  const bMesh = h('button', { type: 'button', class: 'btn small ghost', text: 'Maschen prüfen', onclick: () => checkKirchhoff('mesh') });
  const bSolve = h('button', { type: 'button', class: 'btn small', text: 'Lösung prüfen', onclick: () => checkSolution() });
  btnRow.append(bNode, bMesh, bSolve);
  const info = h('div', { class: 'vz-note', 'aria-live': 'polite' });
  const task = h('div', { class: 'vz-note' });
  taskBox.append(task, inRow, btnRow, info);
  root.append(taskBox);

  const g = goals(root, nets.map((_, k) => ({ id: 'n' + k, label: `Netz ${k + 1} gelöst` })), () => complete?.());

  // Experiment-Panel
  const playBox = h('div', { style: 'display:grid;gap:10px' });
  root.append(playBox);
  const ui = controls(playBox, [
    { id: 'U', label: 'Quellenspannung U_q', unit: 'V', min: 1, max: 24, step: 0.5, value: cur.U },
    { id: 'R1', label: 'R₁', unit: 'Ω', min: 100, max: 10e3, scale: 'log', snap: 'E12', value: cur.R1 },
    { id: 'R2', label: 'R₂', unit: 'Ω', min: 100, max: 10e3, scale: 'log', snap: 'E12', value: cur.R2 },
    { id: 'R3', label: 'R₃', unit: 'Ω', min: 100, max: 10e3, scale: 'log', snap: 'E12', value: cur.R3 },
  ], v => { cur = { U: v.U, R1: v.R1, R2: v.R2, R3: v.R3 }; refresh(); });
  const out = readout(playBox, [
    { id: 'i1', label: 'I₁', hl: true }, { id: 'i2', label: 'I₂' }, { id: 'i3', label: 'I₃' },
    { id: 'ua', label: 'U_A (Knoten gegen Masse)' }, { id: 'u1', label: 'U₁' }, { id: 'u2', label: 'U₂ = U₃' },
  ]);
  const chk = readout(playBox, [
    { id: 'kn', label: 'Knoten A: I₁ − I₂ − I₃' }, { id: 'm1', label: 'Masche 1: U_q − U₁ − U₂' }, { id: 'm2', label: 'Masche 2: U₂ − U₃' },
  ]);

  function applyToSchematic(n, state) {
    for (const k of ['R1', 'R2', 'R3']) sch.set(k, { value: n[k] });
    sch.set('V1', { value: n.U });
    if (state) sch.setState({ v: state.r.v, i: state.r.i });
    else sch.setState({ v: { in: 0, a: 0, 0: 0 }, i: { R1: 0, R2: 0, R3: 0 } });
  }
  function refresh() {
    const s = solve(cur);
    applyToSchematic(cur, mode === 'play' || solved.has(idx) ? s : null);
    if (mode === 'play') {
      out.set({ i1: fmt(s.I1, 'A'), i2: fmt(s.I2, 'A'), i3: fmt(s.I3, 'A'), ua: fmt(s.Ua, 'V'), u1: fmt(s.I1 * cur.R1, 'V'), u2: fmt(s.Ua, 'V') });
      chk.set({ kn: fmt(s.I1 - s.I2 - s.I3, 'A'), m1: fmt(cur.U - s.I1 * cur.R1 - s.Ua, 'V'), m2: fmt(s.I2 * cur.R2 - s.I3 * cur.R3, 'V') });
    }
  }
  function setMode(m) {
    mode = m;
    mTask.classList.toggle('on', m === 'task'); mPlay.classList.toggle('on', m === 'play');
    taskBox.style.display = m === 'task' ? '' : 'none'; netSeg.style.display = m === 'task' ? '' : 'none';
    g.el.style.display = m === 'task' ? '' : 'none';
    playBox.style.display = m === 'play' ? '' : 'none';
    if (m === 'task') { cur = { ...nets[idx] }; showTask(); } else { ui.set(cur, { silent: true }); }
    refresh();
  }
  function pick(k) { idx = k; cur = { ...nets[k] }; showTask(); refresh(); }
  function showTask() {
    netBtns.forEach((b, k) => { b.classList.toggle('on', k === idx); b.textContent = 'Netz ' + (k + 1) + (solved.has(k) ? ' ✓' : ''); });
    const n = nets[idx];
    task.textContent = `Aufgabe: U_q = ${fmt(n.U, 'V')}, R₁ = ${fmt(n.R1, 'Ω')}, R₂ = ${fmt(n.R2, 'Ω')}, R₃ = ${fmt(n.R3, 'Ω')}. Bestimme die drei Zweigströme (in mA) und prüfe sie mit den Kirchhoffschen Regeln.`;
    for (const k in inputs) inputs[k].value = '';
    info.textContent = solved.has(idx) ? 'Dieses Netz ist gelöst — die Ströme fließen jetzt im Schaltplan.' : '';
  }
  const getMA = k => { const t = inputs[k].value.replace(',', '.').trim(); if (t === '') return NaN; const x = Number(t); return Number.isFinite(x) ? x / 1000 : NaN; };
  function checkKirchhoff(kind) {
    const n = nets[idx], I1 = getMA('I1'), I2 = getMA('I2'), I3 = getMA('I3');
    if ([I1, I2, I3].some(Number.isNaN)) { info.textContent = 'Trage erst alle drei Ströme ein (in mA).'; return; }
    const ref = Math.max(Math.abs(I1), 1e-6);
    if (kind === 'node') {
      const r = I1 - I2 - I3, ok = Math.abs(r) <= 0.02 * ref;
      info.textContent = `Knoten A: I₁ − I₂ − I₃ = ${fmt(r, 'A')} — ${ok ? '✓ der Knoten geht auf.' : '✗ es fließt nicht genauso viel ab, wie zufließt.'}`;
    } else {
      const m1 = n.U - I1 * n.R1 - I2 * n.R2, m2 = I2 * n.R2 - I3 * n.R3, ok = Math.abs(m1) <= 0.02 * n.U && Math.abs(m2) <= 0.02 * n.U;
      info.textContent = `Masche 1 (Quelle, R₁, R₂): ${fmt(m1, 'V')} · Masche 2 (R₂, R₃): ${fmt(m2, 'V')} — ${ok ? '✓ beide Maschen gehen auf.' : '✗ in mindestens einer Masche ist die Spannungssumme nicht null.'}`;
    }
  }
  function checkSolution() {
    const n = nets[idx], s = solve(n), want = { I1: s.I1, I2: s.I2, I3: s.I3 }, got = { I1: getMA('I1'), I2: getMA('I2'), I3: getMA('I3') };
    if (Object.values(got).some(Number.isNaN)) { info.textContent = 'Trage erst alle drei Ströme ein (in mA).'; return; }
    const bad = Object.keys(want).filter(k => Math.abs(got[k] / want[k] - 1) > tol);
    if (!bad.length) {
      solved.add(idx);
      showTask(); info.textContent = '✓ Richtig! Alle drei Ströme stimmen (±2 %). Im Schaltplan siehst du jetzt die Ströme.';
      for (const k of Object.keys(got)) inputs[k].value = String(+(want[k] * 1000).toPrecision(4)).replace('.', ',');
      refresh(); g.reach('n' + idx);
    } else {
      info.textContent = `Noch nicht: prüfe ${bad.map(k => 'I' + '₁₂₃'[+k[1] - 1]).join(', ')}. Tipp: erst R₂ ∥ R₃, dann I₁, dann U_A, dann I₂ und I₃.`;
    }
  }
  setMode(mode);
}
