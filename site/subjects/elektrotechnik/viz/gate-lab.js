// Gatter-Spielwiese: Gattertyp wählen, Eingänge A/B schalten, Ausgang beobachten; Wahrheitstabelle selbst ausfüllen; Logikpegel (TTL/CMOS).
// params: { gates?: ['and','or','not','nand','nor','xor','xnor'], goals?: ['xor'] (Tabellen, die vollständig richtig ausgefüllt werden sollen), levels?: true }
import { h, s, boxWidth } from '../../../assets/js/vizkit/base.js';
import { controls, goals } from '../../../assets/js/vizkit/controls.js';
import { fmt } from '../../../assets/js/vizkit/si.js';
import { digitalStyle, switchBtn, GATES, drawGate } from './_digital-helper.js';

export default function mount(stage, { params = {}, complete }) {
  digitalStyle();
  const list = params.gates ?? ['and', 'or', 'not', 'nand', 'nor', 'xor', 'xnor'];
  const goalGates = params.goals ?? ['xor'];
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  let type = list.includes('and') ? 'and' : list[0];
  const inp = [0, 0];

  const ui = controls(root, [{ id: 'g', type: 'seg', label: 'Gatter', options: list.map(k => [k, GATES[k].name]), value: type }], v => { type = v.g; reset(); });
  const box = h('div', { class: 'dg-stage' }); root.append(box);
  const swA = switchBtn('A', 0, v => { inp[0] = v ? 1 : 0; update(); }), swB = switchBtn('B', 0, v => { inp[1] = v ? 1 : 0; update(); });
  const sw = h('div', { class: 'dg-swrow' }, swA.el, swB.el);
  root.append(sw);
  const note = h('div', { class: 'dg-note' }); root.append(note);
  const tblBox = h('div'); root.append(tblBox);
  const gl = goals(root, goalGates.map(k => ({ id: k, label: `Tabelle ${GATES[k].name} richtig ausgefüllt` })), () => complete?.());
  let levelsBox = null, uIn = null, fam = 'ttl';
  if (params.levels !== false) {
    levelsBox = h('div'); root.append(h('h4', { text: 'Was ist eigentlich „0“ und „1“? Logikpegel', style: 'margin:14px 0 4px;font-size:.95rem' }), levelsBox);
  }

  const user = {};   // je Gatter: Array der Nutzereingaben (null | 0 | 1)
  const rows = () => GATES[type].n === 1 ? [[0], [1]] : [[0, 0], [0, 1], [1, 0], [1, 1]];
  const ev = (t, r) => GATES[t].f(r[0], r[1]);
  function reset() { swB.el.style.display = GATES[type].n === 1 ? 'none' : ''; update(); buildTable(); }

  function update() {
    const def = GATES[type], W = boxWidth(box, 320, 560), H = 120;
    box.replaceChildren();
    const svg = s('svg', { viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': `Gatter ${def.name}` });
    const gx = W / 2 - 28 - (def.neg ? 5 : 0), gy = 32;
    const g = s('g'); svg.append(g);
    const sym = drawGate(g, type, gx, gy);
    const out = def.f(inp[0], inp[1]);
    const col = v => v ? 'var(--accent)' : 'var(--muted)';
    // Leitungen + Beschriftung
    sym.ins.forEach(([px, py], k) => {
      g.append(s('line', { x1: 52, x2: px, y1: py, y2: py, stroke: col(inp[k]), 'stroke-width': 3.5, 'stroke-linecap': 'round' }));
      g.append(s('text', { x: 14, y: py + 5, 'font-size': 15, 'font-weight': 700 }, k ? 'B' : 'A'));
      g.append(s('text', { x: 38, y: py + 5, 'font-size': 13, 'font-weight': 700, 'text-anchor': 'end', class: 'dg-mono', style: `fill:${col(inp[k])}` }, String(inp[k])));
    });
    g.append(s('line', { x1: sym.out[0], x2: W - 70, y1: sym.out[1], y2: sym.out[1], stroke: col(out), 'stroke-width': 3.5, 'stroke-linecap': 'round' }));
    g.append(s('circle', { cx: W - 52, cy: sym.out[1], r: 14, style: `fill:${out ? 'var(--good)' : 'var(--surface)'};stroke:${out ? 'var(--good)' : 'var(--line-2)'}`, 'stroke-width': 2 }));
    g.append(s('text', { x: W - 52, y: sym.out[1] + 5, 'text-anchor': 'middle', 'font-size': 14, 'font-weight': 700, style: `fill:${out ? '#fff' : 'var(--muted)'}` }, String(out)));
    g.append(s('text', { x: W - 52, y: sym.out[1] - 22, 'text-anchor': 'middle', 'font-size': 13, 'font-weight': 700 }, 'Y'));
    g.append(s('text', { x: W / 2, y: 16, 'text-anchor': 'middle', 'font-size': 12, style: 'fill:var(--muted)' }, `${def.name} (${def.en})`));
    box.append(svg);
    note.textContent = def.n === 1 ? 'Y = ¬A' : `Y = ${eq(type)}`;
    tblBox.querySelectorAll('tr.cur').forEach(r => r.classList.remove('cur'));
    const idx = def.n === 1 ? inp[0] : inp[0] * 2 + inp[1];
    tblBox.querySelectorAll('tbody tr')[idx]?.classList.add('cur');
  }

  const eq = t => ({ and: 'A ∧ B  (A · B)', or: 'A ∨ B  (A + B)', nand: '¬(A ∧ B)', nor: '¬(A ∨ B)', xor: 'A ⊕ B', xnor: '¬(A ⊕ B)' }[t]);

  function buildTable() {
    const def = GATES[type], rs = rows(); user[type] ??= rs.map(() => null);
    const tbl = h('table', { class: 'dg-tbl' });
    tbl.append(h('thead', {}, h('tr', {}, ...(def.n === 1 ? ['A'] : ['A', 'B']).map(t => h('th', { text: t })), h('th', { text: 'Y (deine Antwort)' }))));
    const tb = h('tbody');
    rs.forEach((r, k) => {
      const mine = user[type][k], right = ev(type, r);
      const cell = h('td', { class: mine == null ? '' : mine === right ? 'ok' : 'bad' }, h('button', { type: 'button', 'aria-label': 'Ausgabe wählen', text: mine == null ? '?' : String(mine), onclick: () => { user[type][k] = mine == null ? 0 : mine === 0 ? 1 : mine === 1 ? null : 0; if (user[type][k] === null) user[type][k] = null; buildTable(); check(); } }));
      tb.append(h('tr', {}, ...r.map(v => h('td', { text: String(v) })), cell));
    });
    tbl.append(tb);
    tblBox.replaceChildren(h('div', { class: 'dg-note', text: 'Tippe in die Y-Spalte, um 0 oder 1 zu setzen — grün heißt richtig. Prüfe mit den Schaltern oben.' }), tbl);
    update();
  }
  function check() {
    for (const k of goalGates) {
      const rs = k === type ? rows() : (GATES[k].n === 1 ? [[0], [1]] : [[0, 0], [0, 1], [1, 0], [1, 1]]);
      const u = user[k]; if (u && u.every((v, i) => v === ev(k, rs[i]))) gl.reach(k);
    }
  }

  // Pegel
  if (levelsBox) {
    const lc = controls(levelsBox, [
      { id: 'fam', type: 'seg', label: 'Familie', options: [['ttl', 'TTL (74LS, 5 V)'], ['cmos', 'CMOS (4000, 5 V)']], value: 'ttl' },
      { id: 'u', label: 'Eingangsspannung', unit: 'V', min: 0, max: 5, value: 0.4, snap: 0.05 },
    ], v => { fam = v.fam; uIn = v.u; drawLevels(); });
    const bar = h('div', { class: 'dg-stage' }); levelsBox.append(bar);
    uIn = lc.values.u;
    // Richtwerte: TTL (74LS) V_IL max 0,8 V, V_IH min 2,0 V; CMOS (4000B) bei 5 V grob 30 % / 70 % der Betriebsspannung (1,5 V / 3,5 V)
    const TH = { ttl: [0.8, 2.0], cmos: [1.5, 3.5] };
    function drawLevels() {
      const W = boxWidth(bar, 320, 560), H = 86, [lo, hi] = TH[fam], X = u => 16 + u / 5 * (W - 32);
      const svg = s('svg', { viewBox: `0 0 ${W} ${H}` });
      svg.append(s('rect', { x: X(0), y: 28, width: X(lo) - X(0), height: 22, style: 'fill:color-mix(in oklab,var(--accent) 22%,white)' }));
      svg.append(s('rect', { x: X(lo), y: 28, width: X(hi) - X(lo), height: 22, style: 'fill:var(--bad-soft)' }));
      svg.append(s('rect', { x: X(hi), y: 28, width: X(5) - X(hi), height: 22, style: 'fill:color-mix(in oklab,var(--good) 25%,white)' }));
      const lab = (x, t, a = 'middle', y = 43) => svg.append(s('text', { x, y, 'text-anchor': a, 'font-size': 12, 'font-weight': 600 }, t));
      lab((X(0) + X(lo)) / 2, 'LOW (0)'); lab((X(lo) + X(hi)) / 2, 'verboten'); lab((X(hi) + X(5)) / 2, 'HIGH (1)');
      [0, lo, hi, 5].forEach(u => svg.append(s('text', { x: X(u), y: 70, 'text-anchor': u === 0 ? 'start' : u === 5 ? 'end' : 'middle', 'font-size': 11, style: 'fill:var(--muted)' }, fmt(u, 'V', 2))));
      svg.append(s('path', { d: `M${X(uIn)} 22 l-6 -12 h12 z`, style: 'fill:var(--ink)' }));
      bar.replaceChildren(svg);
      const lvl = uIn <= lo ? 'LOW — wird als 0 gelesen' : uIn >= hi ? 'HIGH — wird als 1 gelesen' : 'verbotener Bereich — Ergebnis undefiniert';
      bar.append(h('div', { class: 'dg-note', text: `${fmt(uIn, 'V', 2)}: ${lvl}` }));
    }
    drawLevels();
    levelsBox.append(h('div', { class: 'dg-note', text: 'Richtwerte: TTL (Reihe 74LS) V_IL ≤ 0,8 V, V_IH ≥ 2,0 V; CMOS (Reihe 4000) bei 5 V etwa 30 % bzw. 70 % der Betriebsspannung. Genaue Werte stehen im Datenblatt.' }));
  }
  reset();
}
