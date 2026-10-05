// D15 multimeter-trainer — virtuelles Digitalmultimeter: Messart, Bereich, Buchse und Prüfspitzen wählen; Falschbedienung zerstört die Sicherung.
// params: { need?: 5 (Anzahl korrekter Messungen = Aufgaben), tol?: 0.05, order?: ['u-r2','i','r3','uq','ub'] (feste Reihenfolge, z. B. zum Testen) }
import { Netlist, dcSolve } from '../../../assets/js/vizkit/circuit.js';
import { drawSchematic } from '../../../assets/js/vizkit/schematic.js';
import { goals } from '../../../assets/js/vizkit/controls.js';
import { fmt } from '../../../assets/js/vizkit/si.js';
import { h, s, ensureCss } from '../../../assets/js/vizkit/base.js';

const UQ = 12, RI = 0.5, R1 = 1e3, R2 = 2.2e3, R3 = 4.7e3;
const NODES = ['P', 'A', 'B', 'C', 'D'];
const nodeName = n => (n === 'D' ? '0' : n);
// Bereiche: [Endwert (SI), Anzeigefaktor, Dezimalstellen, Einheit]
const RANGES = {
  V: [[0.2, 1e3, 1, 'mV'], [2, 1, 3, 'V'], [20, 1, 2, 'V'], [200, 1, 1, 'V']],
  A: [[0.002, 1e3, 3, 'mA'], [0.02, 1e3, 2, 'mA'], [0.2, 1e3, 1, 'mA'], [10, 1, 2, 'A']],
  R: [[200, 1, 1, 'Ω'], [2e3, 1e-3, 3, 'kΩ'], [2e4, 1e-3, 2, 'kΩ'], [2e5, 1e-3, 1, 'kΩ'], [2e6, 1e-6, 3, 'MΩ']],
};
const BURDEN = [100, 10, 1, 0.01];       // Bürde je A-Bereich (Ω)
const FUSE = { ma: 0.2, a10: 10 };
const MODES = [['off', 'AUS'], ['V', 'V ⎓'], ['A', 'A ⎓'], ['R', 'Ω']];
const JACKS = [['a10', '10 A'], ['ma', 'mA'], ['vo', 'VΩ']];

function buildNet(st) {
  const n = new Netlist().V('V1', 'vp', '0', UQ).SW('S1', 'vp', 'si', { closed: st.s1 }).R('Ri', 'si', 'P', RI)
    .SW('J1', 'P', 'A', { closed: st.j1 }).R('R1', 'A', 'B', R1).R('R2', 'B', 'C', R2).R('R3', 'C', '0', R3);
  return n;
}
// Widerstand zwischen zwei Knoten bei getrennter Quelle: Reihenkette P–A–B–C–D
function chainR(a, b, j1) {
  const order = ['P', 'A', 'B', 'C', 'D'], seg = [j1 ? 0 : Infinity, R1, R2, R3];
  const i = order.indexOf(a), k = order.indexOf(b); let sum = 0;
  for (let x = Math.min(i, k); x < Math.max(i, k); x++) sum += seg[x];
  return sum;
}

/** Messung auswerten → { kind, raw (SI), text, unit, state: 'ok'|'OL'|'none'|'err'|'fuse', hint } */
export function measure(st) {
  const res = { kind: st.mode, raw: 0, text: '', unit: '', state: 'ok', hint: '' };
  if (st.mode === 'off') return { ...res, state: 'none', text: '', hint: 'Das Gerät ist ausgeschaltet.' };
  const rg = RANGES[st.mode][st.range];
  const fmtV = x => { const v = x * rg[1]; return (Math.abs(v) < 0.5 * 10 ** -rg[2] ? 0 : v).toFixed(rg[2]).replace('.', ','); };
  const same = st.red === st.black;
  if (st.mode === 'V') {
    if (st.jack !== 'vo') return { ...res, state: 'err', text: '- - - -', hint: 'Spannung misst man mit der roten Leitung in der VΩ-Buchse.' };
    let raw = 0;
    if (!same) { const n = buildNet(st).R('RM', nodeName(st.red), nodeName(st.black), 1e7); const r = dcSolve(n); raw = (r.v[nodeName(st.red)] ?? 0) - (r.v[nodeName(st.black)] ?? 0); }
    res.raw = raw; res.unit = rg[3];
    if (Math.abs(raw) > rg[0]) return { ...res, state: 'OL', text: 'OL', hint: 'Überlauf: Bereich zu klein — nächsthöheren Bereich wählen.' };
    return { ...res, text: fmtV(raw) };
  }
  if (st.mode === 'A') {
    const wantJack = st.range === 3 ? 'a10' : 'ma';
    if (st.jack === 'vo') return { ...res, state: 'none', raw: 0, text: fmtV(0), unit: rg[3], hint: 'Die rote Leitung steckt in der VΩ-Buchse: Das Gerät ist nicht im Stromweg, es misst nichts. Strom braucht die Buchse mA oder 10 A.' };
    if (st.jack !== wantJack) return { ...res, state: 'err', text: '- - - -', hint: st.range === 3 ? 'Der Bereich 10 A gehört zur 10-A-Buchse.' : 'Die mA-Bereiche gehören zur mA-Buchse.' };
    if (st.blown[st.jack]) return { ...res, state: 'fuse', text: 'FUSE', hint: 'Sicherung durchgebrannt: Ersetze sie, bevor du weiter Strom misst.' };
    if (same) return { ...res, text: fmtV(0), unit: rg[3] };
    const n = buildNet(st).R('RM', nodeName(st.red), nodeName(st.black), BURDEN[st.range]); const r = dcSolve(n);
    const I = r.i.RM; res.raw = I; res.unit = rg[3];
    if (Math.abs(I) > FUSE[st.jack]) { st.blown[st.jack] = true; return { ...res, state: 'fuse', fused: true, text: 'FUSE', hint: `Die Messstrecke lag parallel zu einer Spannungsquelle bzw. einem Widerstand: ${fmt(Math.abs(I), 'A')} durch das Gerät — die ${st.jack === 'ma' ? '200-mA' : '10-A'}-Sicherung hat ausgelöst. Strom misst man in Reihe, im aufgetrennten Stromkreis!` }; }
    if (Math.abs(I) > rg[0]) return { ...res, state: 'OL', text: 'OL', hint: 'Überlauf: Bereich zu klein.' };
    return { ...res, text: fmtV(I) };
  }
  // Ω
  if (st.jack !== 'vo') return { ...res, state: 'err', text: '- - - -', hint: 'Widerstand misst man in der VΩ-Buchse.' };
  if (st.s1) return { ...res, state: 'err', text: 'Err', hint: 'Widerstand nur an spannungsfreien Schaltungen messen! Hier ist die Quelle noch angeschlossen — der Messwert wäre falsch und das Gerät gefährdet. Quelle trennen (Schalter S1 im Schaltplan).' };
  const R = same ? 0 : chainR(st.red, st.black, st.j1); res.raw = R; res.unit = rg[3];
  if (!Number.isFinite(R) || R > rg[0]) return { ...res, state: 'OL', text: 'OL', hint: Number.isFinite(R) ? 'Überlauf: Bereich zu klein.' : 'Unendlich: Zwischen den Spitzen besteht keine leitende Verbindung (Brücke J1 gezogen?).' };
  return { ...res, text: fmtV(R) };
}

// ── Aufgaben (erwartete Werte in der korrekt aufgebauten Schaltung) ──
function tasks() {
  const full = dcSolve(buildNet({ s1: true, j1: true }));
  const I = -full.i.V1;
  return [
    { id: 'u-r2', kind: 'V', exp: Math.abs(full.v.B - full.v.C), text: 'Miss die **Spannung über R₂** (zwischen B und C).', tip: 'Spannung parallel zum Bauteil: Messart V ⎓, rote Leitung in VΩ, Spitzen an B und C. Bereich so wählen, dass er nicht überläuft.' },
    { id: 'i', kind: 'A', exp: I, text: 'Miss den **Strom im Stromkreis**.', tip: 'Strom in Reihe: Brücke J1 ziehen (Stromkreis auftrennen), Spitzen an P und A, rote Leitung in mA, Messart A ⎓.' },
    { id: 'r3', kind: 'R', exp: R3, text: 'Miss den **Widerstand R₃** (zwischen C und D).', tip: 'Quelle trennen (S1 öffnen), Messart Ω, rote Leitung in VΩ, Spitzen an C und D.' },
    { id: 'uq', kind: 'V', exp: full.v.P, text: 'Miss die **Klemmenspannung der Quelle** (P gegen D).', tip: 'Quelle angeschlossen lassen, Messart V ⎓, Spitzen an P (rot) und D (schwarz).' },
    { id: 'ub', kind: 'V', exp: full.v.B, text: 'Miss die **Spannung am Punkt B gegen Masse D**.', tip: 'Messart V ⎓, rote Spitze an B, schwarze an D (Masse).' },
  ];
}
function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

export default function mount(stage, { params = {}, complete, md }) {
  ensureCss();
  const tol = params.tol ?? 0.05;
  const all = tasks(), queue = params.order ? params.order.map(id => all.find(x => x.id === id)) : shuffle(all).slice(0, params.need ?? 5);
  const st = { mode: 'off', range: 1, jack: 'vo', red: 'B', black: 'C', s1: true, j1: true, blown: { ma: false, a10: false } };
  let taskI = 0, wrong = 0, blownCount = 0;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const schHost = h('div', { class: 'vk' }); root.append(schHost);
  const grid = h('div', { style: 'display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:14px;align-items:start' });
  root.append(grid);

  // ── Messgerät (SVG) ──
  const svg = s('svg', { viewBox: '0 0 260 400', class: 'vz-svg', role: 'img', 'aria-label': 'Digitalmultimeter', style: 'max-width:300px;margin:auto' });
  const body = s('rect', { x: 8, y: 6, width: 244, height: 388, rx: 26, fill: 'var(--surface)', stroke: 'var(--ink-2)', 'stroke-width': 2 });
  const lcdBg = s('rect', { x: 28, y: 26, width: 204, height: 74, rx: 8, fill: 'color-mix(in oklab, var(--good) 14%, var(--surface-2))', stroke: 'var(--line-2)', 'stroke-width': 2 });
  const lcd = s('text', { x: 214, y: 78, 'text-anchor': 'end', style: 'font:600 38px var(--mono);fill:var(--ink)' });
  const lcdUnit = s('text', { x: 214, y: 42, 'text-anchor': 'end', style: 'font:600 15px var(--mono);fill:var(--ink-2)' });
  const lcdMode = s('text', { x: 38, y: 42, style: 'font:600 13px var(--mono);fill:var(--ink-2)' });
  svg.append(body, lcdBg, lcd, lcdUnit, lcdMode);
  const KX = 130, KY = 190, KR = 52;
  const ang = { off: -125, V: -42, A: 42, R: 125 };
  const knob = s('g'); knob.append(s('circle', { cx: KX, cy: KY, r: KR, fill: 'var(--surface-2)', stroke: 'var(--ink-2)', 'stroke-width': 2.5 }), s('path', { d: `M${KX} ${KY - KR + 6}V${KY - 10}`, stroke: 'var(--accent)', 'stroke-width': 5, 'stroke-linecap': 'round' }), s('circle', { cx: KX, cy: KY, r: 8, fill: 'var(--line-2)' }));
  const modeBtns = {};
  for (const [m, lab] of MODES) {
    const a = (ang[m] - 90) * Math.PI / 180, x = KX + Math.cos(a) * (KR + 22), y = KY + Math.sin(a) * (KR + 22);
    const g = s('g', { style: 'cursor:pointer', tabindex: 0, role: 'button', 'aria-label': 'Messart ' + lab });
    const bg = s('circle', { cx: x, cy: y, r: 17, fill: 'transparent' });
    const t = s('text', { x, y: y + 5, 'text-anchor': 'middle', style: 'font:600 14px var(--sans);fill:var(--ink-2)' }, lab);
    g.append(bg, t); g.onclick = () => set({ mode: m, range: m === 'R' ? 2 : m === 'A' ? 1 : 2 }); g.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') g.onclick(); };
    modeBtns[m] = t; svg.append(g);
  }
  svg.append(knob);
  // Buchsen + Leitungen
  const jx = { a10: 52, ma: 104, com: 156, vo: 208 }, jy = 350;
  const leadRed = s('path', { fill: 'none', stroke: 'var(--bad)', 'stroke-width': 5, 'stroke-linecap': 'round' });
  const leadBlk = s('path', { fill: 'none', stroke: 'var(--ink)', 'stroke-width': 5, 'stroke-linecap': 'round' });
  svg.append(leadRed, leadBlk);
  const jackEls = {};
  for (const [k, lab] of [['a10', '10 A'], ['ma', 'mA'], ['com', 'COM'], ['vo', 'VΩ']]) {
    const g = s('g', { style: k === 'com' ? '' : 'cursor:pointer', tabindex: k === 'com' ? null : 0, role: k === 'com' ? null : 'button', 'aria-label': k === 'com' ? null : 'rote Leitung in Buchse ' + lab });
    const c = s('circle', { cx: jx[k], cy: jy, r: 15, fill: 'var(--ink)', stroke: 'var(--ink-2)', 'stroke-width': 2 });
    const t = s('text', { x: jx[k], y: jy - 22, 'text-anchor': 'middle', style: 'font:600 12px var(--sans);fill:var(--ink-2)' }, lab);
    g.append(c, t); jackEls[k] = c;
    if (k !== 'com') { g.onclick = () => set({ jack: k }); g.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') set({ jack: k }); }; }
    svg.append(g);
  }
  const fuseNote = s('text', { x: 130, y: 120, 'text-anchor': 'middle', style: 'font:600 12px var(--sans);fill:var(--bad)' });
  svg.append(fuseNote);
  const left = h('div', { class: 'vk' }, svg); grid.append(left);

  // ── Schaltplan ──
  const right = h('div', { class: 'vk' }); grid.append(right);
  const sch = drawSchematic(schHost, {
    title: 'Messschaltung',
    parts: [
      { id: 'V1', type: 'VBAT', at: [2, 8], rot: 90, value: UQ, label: 'U_Q', labelPos: 'l' },
      { id: 'S1', type: 'SW', at: [2, 6], rot: 270, toggle: true, closed: true, label: 'S1', labelPos: 'l' },
      { id: 'Ri', type: 'R', at: [4, 2], value: RI, label: 'Rᵢ' },
      { id: 'J1', type: 'SW', at: [10, 2], toggle: true, closed: true, label: 'J1' },
      { id: 'R1', type: 'R', at: [16, 2], value: R1, label: 'R₁' },
      { id: 'R2', type: 'R', at: [20, 2], rot: 90, value: R2, label: 'R₂', labelPos: 'l' },
      { id: 'R3', type: 'R', at: [20, 6], rot: 90, value: R3, label: 'R₃', labelPos: 'l' },
      { type: 'GND', at: [11, 12] },
      ...NODES.map(n => ({ id: 'T' + n, type: 'TERM', at: { P: [8, 2], A: [14, 2], B: [20, 2], C: [20, 6], D: [20, 10] }[n] })),
    ],
    wires: [
      { pts: ['V1.p', 'S1.a'], i: '-V1' }, { pts: ['S1.b', [2, 2], 'Ri.a'], i: 'S1' }, { pts: ['Ri.b', 'J1.a'], i: 'Ri' }, { pts: ['J1.b', 'R1.a'], i: 'J1' },
      { pts: ['R1.b', 'R2.a'], i: 'R1' }, { pts: ['R2.b', 'R3.a'], i: 'R2' }, { pts: ['R3.b', [20, 12], [2, 12], 'V1.n'], i: 'R3' },
    ],
    texts: [{ at: [8, 3.4], text: 'P', anchor: 'middle' }, { at: [14, 3.4], text: 'A', anchor: 'middle' }, { at: [21.2, 2.4], text: 'B' }, { at: [21.2, 6.4], text: 'C' }, { at: [21.2, 10.4], text: 'D' }],
    onChange: (id, closed) => { if (id === 'S1') set({ s1: closed }); if (id === 'J1') set({ j1: closed }); },
  });

  // ── Bedienelemente ──
  const ctrl = h('div', { class: 'vk', style: 'gap:8px' }); right.append(ctrl);
  function seg(label, opts, key) {
    const row = h('div', { class: 'vk-segbox' }, h('span', { class: 'vk-seglabel', text: label }));
    const box = h('div', { class: 'vz-seg vk-seg' }); row.append(box); ctrl.append(row);
    const api = { row, box, opts, draw() { box.replaceChildren(...api.opts.map(([v, l]) => h('button', { type: 'button', class: st[key] === v ? 'on' : '', 'aria-pressed': st[key] === v, text: l, onclick: () => set({ [key]: v }) }))); } };
    return api;
  }
  const segRange = seg('Bereich', [], 'range');
  const segRed = seg('Rote Spitze an', NODES.map(n => [n, n]), 'red');
  const segBlk = seg('Schwarze Spitze an', NODES.map(n => [n, n]), 'black');
  const fuseBtn = h('button', { type: 'button', class: 'btn small ghost', text: 'Sicherung ersetzen', onclick: () => { st.blown = { ma: false, a10: false }; set({}); } });
  ctrl.append(fuseBtn);

  // ── Aufgabe ──
  const taskBox = h('div', { class: 'vz-note', style: 'background:var(--accent-soft);border:1px solid var(--accent-line);border-radius:12px;padding:10px 12px' });
  const submit = h('button', { type: 'button', class: 'btn small', text: 'Messwert übernehmen' });
  const fb = h('p', { class: 'vz-note', 'aria-live': 'polite' });
  const g = goals(root, [{ id: 'all', label: `${queue.length} Messungen korrekt` }], () => complete?.());
  root.append(taskBox, submit, fb);
  const showTask = () => {
    if (taskI >= queue.length) { taskBox.innerHTML = md ? md('**Alle Messungen geschafft.**') : 'Alle Messungen geschafft.'; submit.style.display = 'none'; return; }
    const t = queue[taskI];
    taskBox.innerHTML = `<b>Aufgabe ${taskI + 1} von ${queue.length}:</b> ` + t.text.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
  };
  submit.onclick = () => {
    const t = queue[taskI]; if (!t) return;
    const m = measure(st);   // könnte Sicherung auslösen
    redraw(m);
    if (m.state !== 'ok' || m.kind !== t.kind) { fb.textContent = m.state === 'ok' ? `Das ist eine falsche Messart für diese Aufgabe. Tipp: ${t.tip}` : `Kein gültiger Messwert (${m.hint || 'Anzeige: ' + m.text}).`; wrong++; return; }
    const rg = RANGES[m.kind][st.range], shown = parseFloat(m.text.replace(',', '.')) / rg[1];
    if (Math.abs(m.raw - t.exp) <= tol * Math.abs(t.exp) && Math.abs(shown - t.exp) <= tol * Math.abs(t.exp)) {
      fb.textContent = `✓ Richtig: ${m.text} ${m.unit}. (Erwartet ${fmt(t.exp, m.kind === 'V' ? 'V' : m.kind === 'A' ? 'A' : 'Ω')}.)`; taskI++; showTask(); if (taskI >= queue.length) g.reach('all');
    } else if (Math.abs(m.raw - t.exp) <= tol * Math.abs(t.exp)) {
      fb.textContent = 'Der Wert stimmt ungefähr, aber die Anzeige ist zu grob aufgelöst — wähle einen kleineren Bereich.'; wrong++;
    } else { fb.textContent = `Der angezeigte Wert (${m.text} ${m.unit}) passt nicht zur Aufgabe. Tipp: ${t.tip}`; wrong++; }
  };

  function set(p) {
    Object.assign(st, p);
    if (p.mode && p.mode !== 'off' && st.range >= RANGES[p.mode].length) st.range = 1;
    const m = measure(st);
    if (m.fused) blownCount++;
    redraw(m);
  }
  function redraw(m) {
    const [mode] = [st.mode];
    knob.setAttribute('transform', `rotate(${ang[mode]} ${KX} ${KY})`);
    for (const k in modeBtns) { modeBtns[k].style.fill = k === mode ? 'var(--accent)' : 'var(--ink-2)'; modeBtns[k].style.fontWeight = k === mode ? 700 : 600; }
    lcd.textContent = m.text; lcdUnit.textContent = mode === 'off' ? '' : m.state === 'ok' || m.state === 'OL' || m.state === 'none' ? m.unit || RANGES[mode][st.range][3] : '';
    lcdMode.textContent = mode === 'off' ? '' : { V: 'DC V', A: 'DC A', R: 'Ω' }[mode] + (st.range != null ? '' : '');
    lcd.style.fill = m.state === 'fuse' || m.state === 'err' ? 'var(--bad)' : 'var(--ink)';
    for (const k of ['a10', 'ma', 'vo']) jackEls[k].style.stroke = st.jack === k ? 'var(--bad)' : 'var(--ink-2)', jackEls[k].style.strokeWidth = st.jack === k ? 4 : 2;
    const jxr = jx[st.jack];
    leadRed.setAttribute('d', `M${jxr} ${jy + 15}V${jy + 30}H250`); leadBlk.setAttribute('d', `M${jx.com} ${jy + 15}V${jy + 40}H250`);
    fuseNote.textContent = st.blown.ma || st.blown.a10 ? 'Sicherung ' + [st.blown.ma ? 'mA' : '', st.blown.a10 ? '10 A' : ''].filter(Boolean).join(' + ') + ' defekt' : '';
    fuseBtn.style.display = st.blown.ma || st.blown.a10 ? '' : 'none';
    segRange.opts = mode === 'off' ? [] : RANGES[mode].map((r, i) => [i, fmt(r[0], mode === 'V' ? 'V' : mode === 'A' ? 'A' : 'Ω', 2).replace(/ /g, ' ')]);
    segRange.row.style.display = mode === 'off' ? 'none' : '';
    segRange.draw();
    segRed.draw(); segBlk.draw();
    // Schaltplan
    sch.set('S1', { closed: st.s1 }); sch.set('J1', { closed: st.j1 });
    const net = buildNet(st); const r = dcSolve(net); sch.setState({ v: r.v, i: Object.fromEntries(Object.entries(r.i).map(([k, v]) => [k, v])) });
    // Hinweis
    if (m.hint && taskI < queue.length) fb.textContent = m.hint;
  }
  set({ mode: 'off' });
  showTask();
  fb.textContent = 'Wähle Messart, Bereich, Buchse und Prüfspitzen — dann „Messwert übernehmen“.';
  void wrong; void blownCount;
}
