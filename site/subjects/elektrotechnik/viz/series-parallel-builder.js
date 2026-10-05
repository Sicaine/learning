// D10 series-parallel-builder — Baukasten für Reihen-/Parallelschaltungen aus Widerständen, Kondensatoren oder Spulen.
//
// Bedienung (Touch-tauglich, kein Ziehen nötig): Bauteil im Schaltplan antippen → es ist gewählt (blauer Rahmen).
// „In Reihe +" / „Parallel +" fügt ein neues Bauteil (gleicher Wert) an die Auswahl an; „Auswahl ↑" wählt die umgebende
// Gruppe (damit lässt sich z. B. eine ganze Reihenkette parallel schalten); „Löschen" entfernt; der Wert-Regler ändert das
// gewählte Bauteil (E-Reihe). Unter dem Plan stehen Gesamtwert, Ausdruck (+ = Reihe, ‖ = parallel) und Spannung/Strom je Teil.
//
// ── params (alle optional) ──────────────────────────────────────────────────────────────────────────────────────
//   mode:      'R' (Standard) | 'C' | 'L'      Bauteilart. R, L: Reihe addiert, parallel Kehrwerte. C: umgekehrt.
//   series:    'E12' (Standard) | 'E6' | 'E24' | 'E3' | 'E48' | 'E96'   Wertereihe des Wert-Reglers
//   range:     [min, max]                      Wertebereich in SI-Einheit (R: 10 Ω…100 kΩ, C: 1 nF…1 mF, L: 1 µH…100 mH)
//   start:     Zahl | { ser: [...] } | { par: [...] }   Startnetz; Zahl = ein Bauteil. Beispiel: { par: [150, 150] },
//                                              { ser: [100, { par: [200, 300] }] }. Standard: ein Bauteil (R 100 Ω, C 100 nF, L 10 mH)
//   source:    Zahl (V)                        Quellenspannung (Standard 12 V für R, 10 V sonst); false = keine Quelle, nur Gesamtwert
//   maxParts:  Zahl (Standard 8)               höchstens so viele Bauteile
//   editable:  true (Standard) | false         false = nur ansehen (Startnetz), keine Bedienung außer Quellenspannung
//   flow:      true (Standard) | false         Spannung/„Fluss" je Teil anzeigen (R: Strom, C: Ladung, L: Stromanstieg di/dt)
//   goals:     [{ id?, label?, target, tol?: 0.01, maxParts?, minParts?, needs?: 'parallel'|'series'|'mixed' }]
//              target in SI-Einheit; tol relativ. complete() wird gerufen, wenn alle Ziele erreicht sind.
//              Ohne goals (und für C/L ohne eigene goals) gibt es kein Ziel und kein complete().
//   intro:     Text über dem Plan (Markdown wie md())
// Standard-Ziele für mode 'R': 75 Ω (±1 %, mind. 2 Teile) und 62 Ω (±2 %, höchstens 3 Teile).
// Einbinden aus einer Lektion: { type: 'viz', viz: 'series-parallel-builder', params: { mode: 'C', start: 100e-9, goals: [...] }, task: '…' }
import { drawSchematic } from '../../../assets/js/vizkit/schematic.js';
import { controls, readout, goals as goalsUi } from '../../../assets/js/vizkit/controls.js';
import { fmt } from '../../../assets/js/vizkit/si.js';
import { h } from '../../../assets/js/vizkit/base.js';

const MODES = {
  R: { sym: 'R', unit: 'Ω', range: [10, 100e3], start: 100, U: 12, g: v => 1 / v, fromG: g => 1 / g, flowUnit: 'A', flowSym: 'I', name: 'Widerstand', total: 'R_ges' },
  C: { sym: 'C', unit: 'F', range: [1e-9, 1e-3], start: 100e-9, U: 10, g: v => v, fromG: g => g, flowUnit: 'C', flowSym: 'Q', name: 'Kondensator', total: 'C_ges' },
  L: { sym: 'L', unit: 'H', range: [1e-6, 100e-3], start: 10e-3, U: 10, g: v => 1 / v, fromG: g => 1 / g, flowUnit: 'A/s', flowSym: 'di/dt', name: 'Spule', total: 'L_ges' },
};
const SUB = '₀₁₂₃₄₅₆₇₈₉';
const sub = n => String(n).split('').map(d => SUB[+d]).join('');
const ROW = 4.8;

const part = v => ({ t: 'p', v });
const grp = (t, k) => ({ t, k });
function build(spec) {
  if (typeof spec === 'number') return part(spec);
  if (spec.ser) return grp('s', spec.ser.map(build));
  if (spec.par) return grp('p', spec.par.map(build));
  throw new Error('series-parallel-builder: ungültiges start');
}
const countParts = n => n.t === 'p' ? 1 : n.k.reduce((a, c) => a + countParts(c), 0);
const has = (n, t) => n.t !== 'p' && (n.t === t || n.k.some(c => has(c, t)));

export default function mount(stage, { params = {}, md, complete }) {
  const M = MODES[params.mode || 'R'] || MODES.R;
  const series = params.series || 'E12';
  const [vmin, vmax] = params.range || M.range;
  const maxParts = params.maxParts ?? 8;
  const editable = params.editable !== false;
  const showFlow = params.flow !== false && params.source !== false;
  let U = params.source === false ? 0 : (params.source ?? M.U);
  let root = build(params.start ?? M.start);
  let sel = root.t === 'p' ? root : null;
  let lastVal = root.t === 'p' ? root.v : M.start;

  const goalDefs = (params.goals || (M === MODES.R && !params.start ? [
    { id: 'g75', label: '75 Ω (±1 %)', target: 75, tol: 0.01, minParts: 2 },
    { id: 'g62', label: '62 Ω mit höchstens 3 Teilen (±2 %)', target: 62, tol: 0.02, maxParts: 3 },
  ] : [])).map((g, i) => ({ id: g.id || 'g' + i, tol: 0.01, label: g.label || `${M.total} = ${fmt(g.target, M.unit)} (±${+(100 * (g.tol ?? 0.01)).toFixed(1)} %)`, ...g }));

  const wrap = h('div', { class: 'vz vk' }); stage.append(wrap);
  if (params.intro) wrap.append(h('div', { class: 'vz-note', html: md ? md(params.intro) : params.intro }));
  const schBox = h('div'); wrap.append(schBox);

  // Bedienleiste
  const bar = h('div', { class: 'vk-presetrow', role: 'toolbar', 'aria-label': 'Schaltung bearbeiten' });
  const mkBtn = (txt, fn, cls = 'btn small ghost') => h('button', { type: 'button', class: cls, text: txt, onclick: fn });
  const bSer = mkBtn(`${M.sym}-Teil in Reihe +`, () => add('s'));
  const bPar = mkBtn(`${M.sym}-Teil parallel +`, () => add('p'));
  const bUp = mkBtn('Auswahl ↑', () => up());
  const bDel = mkBtn('Löschen', () => del());
  const bNew = mkBtn('Neu', () => reset());
  if (editable) { bar.append(bSer, bPar, bUp, bDel, bNew); wrap.append(bar); }
  const selInfo = h('div', { class: 'vz-note', 'aria-live': 'polite' });
  if (editable) wrap.append(selInfo);

  const ui = controls(wrap, [
    ...(editable ? [{ id: 'val', label: `Wert des gewählten Teils (${series})`, unit: M.unit, min: vmin, max: vmax, scale: 'log', snap: series, value: lastVal, wide: true }] : []),
    ...(params.source === false ? [] : [{ id: 'U', label: 'Quellenspannung', unit: 'V', min: 1, max: 24, step: 0.5, value: U }]),
  ], (v, id) => {
    if (id === 'val') { lastVal = v.val; if (sel && sel.t === 'p') sel.v = v.val; }
    if (id === 'U') U = v.U;
    render();
  });
  const out = readout(wrap, [{ id: 'tot', label: M.total, hl: true }, { id: 'n', label: 'Teile' }, ...(showFlow ? [{ id: 'f', label: M.flowSym + ' gesamt' }] : []), ...(showFlow && M === MODES.R ? [{ id: 'p', label: 'P gesamt' }] : [])]);
  const expr = h('div', { class: 'vz-note', 'aria-live': 'polite' }); wrap.append(expr);
  const gu = goalDefs.length ? goalsUi(wrap, goalDefs.map(g => ({ id: g.id, label: g.label })), () => complete?.()) : null;

  // ── Baum-Operationen ──
  const parentOf = (n, r = root) => { if (r.t === 'p') return null; for (let i = 0; i < r.k.length; i++) { if (r.k[i] === n) return { p: r, i }; const f = parentOf(n, r.k[i]); if (f) return f; } return null; };
  function add(kind) {
    if (!sel || countParts(root) >= maxParts) return;
    const np = part(sel.t === 'p' ? sel.v : lastVal);
    if (sel.t === kind) sel.k.push(np);
    else { const pr = parentOf(sel); if (!pr) root = grp(kind, [sel, np]); else if (pr.p.t === kind) pr.p.k.splice(pr.i + 1, 0, np); else pr.p.k[pr.i] = grp(kind, [sel, np]); }
    select(np);
  }
  function up() { if (!sel) return; const pr = parentOf(sel); if (pr) select(pr.p); }
  function del() {
    if (!sel) return;
    if (sel === root) { reset(); return; }
    const pr = parentOf(sel); pr.p.k.splice(pr.i, 1);
    let keep = pr.p;
    if (pr.p.k.length === 1) { const only = pr.p.k[0], gp = parentOf(pr.p); if (!gp) root = only; else gp.p.k[gp.i] = only; keep = only; }
    select(keep);
  }
  function reset() { root = build(params.start ?? M.start); select(root.t === 'p' ? root : null); }
  function select(n) {
    sel = n;
    if (n && n.t === 'p') { lastVal = n.v; ui.set({ val: n.v }, { silent: true }); }
    render();
  }

  // ── Rechnung ──
  const G = n => n.t === 'p' ? M.g(n.v) : n.t === 's' ? 1 / n.k.reduce((a, c) => a + 1 / G(c), 0) : n.k.reduce((a, c) => a + G(c), 0);
  function distribute(n, u, f, acc) {      // u: Spannung, f: „Fluss" (I, Q, di/dt)
    acc.set(n, { u, f });
    if (n.t === 's') for (const c of n.k) distribute(c, f / G(c), f, acc);
    else if (n.t === 'p') for (const c of n.k) distribute(c, u, u * G(c), acc);
  }
  const exprOf = (n, parent) => n.t === 'p' ? fmt(n.v, M.unit) : (() => { const s = n.k.map(c => exprOf(c, n.t)).join(n.t === 's' ? ' + ' : ' ‖ '); return parent && parent !== n.t ? `(${s})` : s; })();

  // ── Layout ──
  const measure = n => {
    if (n.t === 'p') return (n.m = { w: 4, h: 0 });
    n.k.forEach(measure);
    if (n.t === 's') return (n.m = { w: n.k.reduce((a, c) => a + c.m.w, 0) + 2 * (n.k.length - 1), h: Math.max(...n.k.map(c => c.m.h)) });
    const w = Math.max(...n.k.map(c => c.m.w)) + 4;
    let hh = 0; n.k.forEach((c, i) => { hh += (i ? ROW : 0) + (i < n.k.length - 1 ? c.m.h : 0); });
    return (n.m = { w, h: hh + n.k[n.k.length - 1].m.h });
  };

  let sch = null, flowState = {};
  function render() {
    measure(root);
    const acc = new Map(); const gt = G(root);
    if (U > 0) distribute(root, U, U * gt, acc);
    const parts = [], wires = [], texts = [], hits = [], boxes = [];
    let pid = 0, wid = 0; flowState = {};
    const wire = (pts, f) => { if (pts.length < 2 || (pts.length === 2 && pts[0][0] === pts[1][0] && pts[0][1] === pts[1][1])) return; const k = 'w' + (++wid); flowState[k] = f; wires.push({ pts, i: k }); };
    const flowOf = n => (acc.get(n)?.f) ?? 0;
    function place(n, x, y) {
      boxes.push({ n, x, y, w: n.m.w, hh: n.m.h });
      if (n.t === 'p') {
        const id = M.sym + (++pid), a = acc.get(n);
        parts.push({ id, type: M.sym, at: [x, y], value: n.v, label: M.sym + sub(pid), labelPos: 't' });
        if (showFlow && a) texts.push({ at: [x + 2, y + 1.9], text: `${fmt(a.u, 'V')} · ${fmt(a.f, M.flowUnit)}`, anchor: 'middle', size: 0.62, color: 'var(--ink-2)' });
        hits.push({ n, x, y });
        return;
      }
      if (n.t === 's') {
        let cx = x;
        n.k.forEach((c, i) => { place(c, cx, y); if (i < n.k.length - 1) wire([[cx + c.m.w, y], [cx + c.m.w + 2, y]], flowOf(c)); cx += c.m.w + 2; });
        return;
      }
      const inner = n.m.w - 4; let cy = y; const ys = [];
      n.k.forEach((c, i) => { ys.push(cy); place(c, x + 2, cy); cy += c.m.h + ROW; if (i < n.k.length - 1) { /* next */ } });
      // Zuleitungen links/rechts und Sammelschienen
      wire([[x, y], [x + 2, y]], flowOf(n));
      wire([[x + n.m.w - 2, y], [x + n.m.w, y]], flowOf(n));
      n.k.forEach((c, i) => {
        if (c.m.w < inner) wire([[x + 2 + c.m.w, ys[i]], [x + 2 + inner, ys[i]]], flowOf(c));
        if (i < n.k.length - 1) {
          const rest = n.k.slice(i + 1).reduce((a, cc) => a + flowOf(cc), 0);
          wire([[x + 2, ys[i]], [x + 2, ys[i + 1]]], rest);
          wire([[x + n.m.w - 2, ys[i + 1]], [x + n.m.w - 2, ys[i]]], rest);
        }
      });
    }
    const x0 = U > 0 ? 8 : 6, yt = 3;
    place(root, x0, yt);
    const xr = x0 + root.m.w, yb = yt + Math.max(root.m.h, 4) + 3.6;
    if (U > 0) {
      parts.unshift({ id: 'V1', type: 'V', at: [2, yt], rot: 90, value: U, label: 'U', labelPos: 'l' });
      wire([[2, yt], [x0, yt]], flowOf(root));
      wire([[xr, yt], [xr, yb], [2, yb], [2, yt + 4]], flowOf(root));
    } else {
      parts.unshift({ id: 'tA', type: 'TERM', at: [x0 - 3, yt], label: 'A', labelPos: 'l' }, { id: 'tB', type: 'TERM', at: [xr + 3, yt], label: 'B', labelPos: 'r' });
      wire([[x0 - 3, yt], [x0, yt]], 0); wire([[xr, yt], [xr + 3, yt]], 0);
    }
    sch?.destroy();
    sch = drawSchematic(schBox, { grid: 16, parts, wires, texts, maxWidth: 640, iScale: Math.max(1e-12, ...Object.values(flowState).map(Math.abs)), animate: M === MODES.R && U > 0 });
    if (M === MODES.R && U > 0) sch.setState({ v: {}, i: flowState });
    // Auswahlrahmen und Tippflächen
    const g = 16, svg = sch.svg, ns = 'http://www.w3.org/2000/svg';
    const mk = (tag, a) => { const e = document.createElementNS(ns, tag); for (const k in a) e.setAttribute(k, a[k]); return e; };
    if (sel && editable) {
      const b = boxes.find(q => q.n === sel);
      if (b) svg.insertBefore(mk('rect', { x: (b.x - 0.5) * g, y: (b.y - 2.6) * g, width: (b.w + 1) * g, height: (b.hh + 4.6) * g, rx: 8, fill: 'color-mix(in oklab, var(--accent) 9%, transparent)', stroke: 'var(--accent)', 'stroke-width': 2, 'stroke-dasharray': '6 4', 'pointer-events': 'none' }), svg.firstChild.nextSibling);
    }
    if (editable) for (const q of hits) {
      const r = mk('rect', { x: q.x * g, y: (q.y - 2.4) * g, width: 4 * g, height: 4.9 * g, fill: 'transparent', style: 'cursor:pointer', role: 'button', tabindex: 0, 'aria-label': 'Bauteil wählen' });
      r.addEventListener('click', e => { e.stopPropagation(); select(q.n); });
      r.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(q.n); } });
      svg.append(r);
    }
    // Anzeigen
    const tot = M.fromG(gt), np = countParts(root);
    out.set({ tot: fmt(tot, M.unit), n: String(np), ...(showFlow ? { f: fmt(U * gt, M.flowUnit) } : {}), ...(showFlow && M === MODES.R ? { p: fmt(U * U * gt, 'W') } : {}) });
    expr.textContent = `${M.total} = ${exprOf(root)} = ${fmt(tot, M.unit)}`;
    if (editable) {
      selInfo.textContent = !sel ? 'Tippe ein Bauteil an.' : sel.t === 'p' ? `Gewählt: ${M.name} mit ${fmt(sel.v, M.unit)}.` : `Gewählt: ${sel.t === 's' ? 'Reihenschaltung' : 'Parallelschaltung'} aus ${countParts(sel)} Bauteilen = ${fmt(M.fromG(G(sel)), M.unit)}.`;
      bSer.disabled = bPar.disabled = !sel || np >= maxParts; bUp.disabled = !sel || !parentOf(sel); bDel.disabled = !sel || (sel === root && root.t === 'p');
    }
    // Ziele
    for (const g of goalDefs) {
      const ok = Math.abs(tot / g.target - 1) <= g.tol && (g.maxParts == null || np <= g.maxParts) && (g.minParts == null || np >= g.minParts)
        && (!g.needs || (g.needs === 'parallel' ? has(root, 'p') : g.needs === 'series' ? has(root, 's') : has(root, 'p') && has(root, 's')));
      if (ok) gu?.reach(g.id);
    }
  }
  render();
}
