// Kondensator-Baukasten (D17).
// params: { mode: 'plates' | 'network' (Standard 'plates') }
//   plates  — Plattenkondensator aus Fläche A, Abstand d und Dielektrikum (ε_r); Ausgabe C, Q, E, W.   params: { target?: Farad (100e-12), tol?: 0,03, U?: Volt (12) }
//   network — drei Kondensatoren in vier Schaltungen (parallel, Reihe, gemischt); C_ges wird mit dem Schaltungssimulator (AC) bestimmt.
//             params: { target?: Farad, tol?: 0,02, fixed?: Farad (dann sind alle drei Kondensatoren fest und nur die Schaltung wählbar) }
import { Netlist, acSweep } from '../../../assets/js/vizkit/circuit.js';
import { drawSchematic } from '../../../assets/js/vizkit/schematic.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { fmt } from '../../../assets/js/vizkit/si.js';
import { h, s, boxWidth } from '../../../assets/js/vizkit/base.js';

const E0 = 8.854e-12;
const DIEL = [[1.0, 'Luft 1,0'], [1.5, 'Schaum-PE 1,5'], [2.0, 'PTFE 2,0'], [2.29, 'Voll-PE 2,29'], [1000, 'Keramik ≈ 1000']];

export default function mount(stage, opts) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  (opts.params?.mode === 'network' ? network : plates)(root, opts.params || {}, opts.complete);
}

// ── Plattenkondensator ───────────────────────────────────────────────────────
function plates(root, params, complete) {
  const target = params.target ?? 100e-12, tol = params.tol ?? 0.03;
  const W = boxWidth(root, 300, 640), H = Math.round(W * 0.5), k = W / 640;
  const svg = s('svg', { viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': 'Plattenkondensator', style: 'width:100%;height:auto;display:block;background:var(--surface-2);border:1px solid var(--line);border-radius:12px' });
  root.append(h('div', {}, svg));
  const ui = controls(root, [
    { id: 'A', label: 'Plattenfläche A', unit: 'm²', min: 1e-4, max: 1e-2, value: 1e-3, scale: 'log', format: v => fmt(v * 1e4, 'cm²') },
    { id: 'd', label: 'Plattenabstand d', unit: 'm', min: 1e-4, max: 5e-3, value: 1e-3, scale: 'log', format: v => fmt(v, 'm', { prefix: 'm' }) },
    { id: 'er', type: 'seg', label: 'Dielektrikum ε_r', options: DIEL, value: 1.0 },
    { id: 'U', label: 'Spannung U', unit: 'V', min: 1, max: 50, value: params.U ?? 12, snap: 1 },
  ], draw);
  const out = readout(root, [{ id: 'C', label: 'C = ε₀·ε_r·A/d', hl: true }, { id: 'Q', label: 'Q = C·U' }, { id: 'E', label: 'E = U/d' }, { id: 'W', label: 'W = ½·C·U²' }]);
  const g = goals(root, [{ id: 'c', label: `Baue C = ${fmt(target, 'F')} (±${Math.round(tol * 100)} %)` }], () => complete?.());
  root.append(h('p', { class: 'vz-note', text: 'Die Anzeige zeigt die Größenverhältnisse nur ungefähr; die Ladungszeichen werden mit Q zahlreicher. Tipp: Auf den Zahlenwert klicken und tippen (z. B. „11,3 cm²“ → 11.3e-4).' }));

  function draw() {
    const v = ui.values, C = E0 * v.er * v.A / v.d, Q = C * v.U, E = v.U / v.d, Wj = 0.5 * C * v.U * v.U;
    const side = k * (110 + 190 * Math.sqrt((v.A - 1e-4) / (1e-2 - 1e-4))), gap = k * (16 + 80 * (Math.log(v.d / 1e-4) / Math.log(50))), dx = side * 0.5, dy = -side * 0.26;
    const x0 = (W - side - dx) / 2 + 10, yb = H / 2 + gap / 2 + 26 - dy / 2;   // vordere linke Ecke der unteren Platte
    const P = (x, y) => `${x.toFixed(1)},${y.toFixed(1)}`;
    const plate = (y, fill, id) => `<polygon points="${P(x0, y)} ${P(x0 + side, y)} ${P(x0 + side + dx, y + dy)} ${P(x0 + dx, y + dy)}" fill="${fill}" stroke="var(--ink-2)" stroke-width="1.2" stroke-linejoin="round" data-p="${id}"/>`;
    const yTop = yb - gap, tint = v.er === 1 ? 'none' : `color-mix(in oklab, var(--warn) ${Math.min(30, 10 + Math.log10(v.er) * 7)}%, transparent)`;
    let html = '';
    html += plate(yb, 'color-mix(in oklab, var(--accent) 55%, white)', 'b');
    // Dielektrikum (Vorderseite, rechte Seite)
    html += `<polygon points="${P(x0, yb)} ${P(x0 + side, yb)} ${P(x0 + side, yTop)} ${P(x0, yTop)}" fill="${tint}" stroke="var(--line-2)"/>`;
    html += `<polygon points="${P(x0 + side, yb)} ${P(x0 + side + dx, yb + dy)} ${P(x0 + side + dx, yTop + dy)} ${P(x0 + side, yTop)}" fill="${tint}" stroke="var(--line-2)"/>`;
    // Feldlinien
    const nl = Math.max(3, Math.round(3 + 5 * Math.sqrt((v.A - 1e-4) / 1e-2)));
    for (let i = 0; i < nl; i++) for (let j = 0; j < 2; j++) {
      const fx = (i + 0.5) / nl * 0.8 + 0.1, fy = (j + 0.5) / 2, px = x0 + fx * side + fy * dx, py = yb - fy * (-dy) * 1 + 0;
      html += `<line x1="${px.toFixed(1)}" y1="${(py - gap + 3).toFixed(1)}" x2="${px.toFixed(1)}" y2="${(py - 3).toFixed(1)}" stroke="var(--accent)" stroke-width="1.4" opacity=".55" marker-end="url(#cb-a)"/>`;
    }
    html += plate(yTop, 'color-mix(in oklab, var(--bad) 55%, white)', 't');
    // Ladungen (Anzahl ~ log Q)
    const nq = Math.max(2, Math.min(28, Math.round(2 + 4 * Math.log10(Math.max(Q, 1e-13) / 1e-12))));
    const cols = Math.ceil(Math.sqrt(nq * 1.5)), rows = Math.ceil(nq / cols);
    for (let i = 0; i < nq; i++) {
      const fx = 0.12 + 0.76 * ((i % cols) + 0.5) / cols, fy = 0.12 + 0.76 * (Math.floor(i / cols) + 0.5) / rows, qx = (x0 + fx * side + fy * dx).toFixed(1);
      html += `<text x="${qx}" y="${(yTop + dy * fy + 4.5).toFixed(1)}" text-anchor="middle" style="font:700 13px var(--sans);fill:var(--bad)" pointer-events="none">+</text>`;
      html += `<text x="${qx}" y="${(yb + dy * fy + 5).toFixed(1)}" text-anchor="middle" style="font:700 15px var(--sans);fill:var(--accent)" pointer-events="none">−</text>`;
    }
    // Maße
    html += `<line x1="${x0 - 14}" y1="${yTop}" x2="${x0 - 14}" y2="${yb}" stroke="var(--ink-2)" marker-start="url(#cb-a2)" marker-end="url(#cb-a2)"/><text x="${x0 - 20}" y="${(yTop + yb) / 2 + 4}" text-anchor="end" style="font:600 12px var(--mono);fill:var(--ink-2)">d</text>`;
    html += `<text x="${x0 + side / 2}" y="${yb + 36}" text-anchor="middle" style="font:600 12px var(--mono);fill:var(--ink-2)">A = ${fmt(v.A * 1e4, 'cm²')}</text>`;
    html += `<text x="${x0 + side + dx + 10}" y="${yTop + dy / 2}" style="font:600 12px var(--sans);fill:var(--bad)">+ U</text>`;
    svg.innerHTML = `<defs><marker id="cb-a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--accent)"/></marker><marker id="cb-a2" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="var(--ink-2)"/></marker></defs>` + html;
    out.set({ C: fmt(C, 'F'), Q: fmt(Q, 'C'), E: fmt(E, 'V/m'), W: fmt(Wj, 'J') });
    if (Math.abs(C / target - 1) <= tol) g.reach('c');
  }
  draw();
}

// ── Netzwerk aus drei Kondensatoren ──────────────────────────────────────────
const TOPO = {
  par: { label: 'Parallel', formula: 'C_ges = C₁ + C₂ + C₃' },
  ser: { label: 'Reihe', formula: '1/C_ges = 1/C₁ + 1/C₂ + 1/C₃' },
  m1: { label: 'C₁ ∥ (C₂ – C₃)', formula: 'C_ges = C₁ + C₂·C₃/(C₂ + C₃)' },
  m2: { label: '(C₁ ∥ C₂) – C₃', formula: 'C_ges = (C₁ + C₂)·C₃/(C₁ + C₂ + C₃)' },
};
function layout(topo, val, adj) {
  const cap = (id, at, rot) => ({ id, type: 'C', at, rot, value: val[id], adjust: adj });
  const T = (id, at, label) => ({ id, type: 'TERM', at, label, labelPos: id === 'A' ? 'l' : 'r' });
  let parts, wires, net = new Netlist().V('V1', 'A', '0', { ac: 1 });
  const C = (n, a, b) => net.C(n, a, b, val[n]);
  if (topo === 'par') {
    parts = [T('A', [2, 3], 'A'), T('B', [2, 7], 'B'), cap('C1', [6, 3], 90), cap('C2', [11, 3], 90), cap('C3', [16, 3], 90)];
    wires = [['A.a', 'C1.a', 'C2.a', 'C3.a'], ['B.a', 'C1.b', 'C2.b', 'C3.b']];
    C('C1', 'A', '0'); C('C2', 'A', '0'); C('C3', 'A', '0');
  } else if (topo === 'ser') {
    parts = [T('A', [2, 3], 'A'), cap('C1', [5, 3], 0), cap('C2', [11, 3], 0), cap('C3', [17, 3], 0), T('B', [24, 3], 'B')];
    wires = [['A.a', 'C1.a'], ['C1.b', 'C2.a'], ['C2.b', 'C3.a'], ['C3.b', 'B.a']];
    C('C1', 'A', 'x'); C('C2', 'x', 'y'); C('C3', 'y', '0');
  } else if (topo === 'm1') {
    parts = [T('A', [2, 3], 'A'), T('B', [2, 11], 'B'), cap('C1', [7, 3], 90), cap('C2', [12, 3], 90), cap('C3', [12, 7], 90)];
    wires = [['A.a', 'C1.a', 'C2.a'], ['C2.b', 'C3.a'], ['C1.b', [7, 11]], ['B.a', [7, 11], 'C3.b']];
    C('C1', 'A', '0'); C('C2', 'A', 'x'); C('C3', 'x', '0');
  } else {
    parts = [T('A', [2, 3], 'A'), cap('C1', [7, 3], 90), cap('C2', [12, 3], 90), cap('C3', [15, 7], 0), T('B', [22, 7], 'B')];
    wires = [['A.a', 'C1.a', 'C2.a'], ['C1.b', 'C2.b', 'C3.a'], ['C3.b', 'B.a']];
    C('C1', 'A', 'x'); C('C2', 'A', 'x'); C('C3', 'x', '0');
  }
  return { spec: { parts, wires }, net };
}
function network(root, params, complete) {
  const fixed = params.fixed, target = params.target ?? 150e-9, tol = params.tol ?? 0.02;
  const val = { C1: fixed ?? 100e-9, C2: fixed ?? 100e-9, C3: fixed ?? 100e-9 };
  const holder = h('div'); root.append(holder);
  const defs = [{ id: 'topo', type: 'seg', label: 'Schaltung', options: Object.entries(TOPO).map(([k, t]) => [k, t.label]), value: 'par' }];
  if (!fixed) for (const n of ['C1', 'C2', 'C3']) defs.push({ id: n, label: n.replace('C', 'C') + ' = ', unit: 'F', min: 1e-9, max: 1e-6, value: val[n], scale: 'log', snap: 'E12' });
  let sch, net, cur = '';
  const ui = controls(root, defs, (v, id) => { if (id === 'topo') build(); run(); if (id && id !== 'topo') sch?.set(id, { value: v[id] }); });
  const out = readout(root, [{ id: 'C', label: 'C_ges (Simulation)', hl: true }, { id: 'f', label: 'Formel' }]);
  const g = goals(root, [{ id: 'c', label: `C_ges = ${fmt(target, 'F')} (±${Math.round(tol * 100)} %)` }], () => complete?.());
  function build() {
    holder.replaceChildren();
    for (const n of ['C1', 'C2', 'C3']) if (!fixed && ui.values[n]) val[n] = ui.values[n];
    const L = layout(ui.values.topo, val, fixed ? false : { min: 1e-9, max: 1e-6, scale: 'log', snap: 'E12' });
    net = L.net; L.spec.onChange = (id, v) => { if (!fixed) ui.set({ [id]: v }); };
    sch = drawSchematic(holder, L.spec); cur = ui.values.topo;
  }
  function run() {
    for (const n of ['C1', 'C2', 'C3']) { if (!fixed) val[n] = ui.values[n]; net.set(n, val[n]); }
    const f = 1000, ac = acSweep(net, [f]), Y = ac.i('V1').mag[0];   // |I| bei 1 V
    const C = Y / (2 * Math.PI * f);
    out.set({ C: fmt(C, 'F'), f: TOPO[ui.values.topo].formula });
    if (Math.abs(C / target - 1) <= tol) g.reach('c');
  }
  build(); run();
}
