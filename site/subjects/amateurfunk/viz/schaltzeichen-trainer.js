// Schaltzeichen-Trainer: Bauteil zum gezeigten Schaltzeichen (DIN/IEC) erkennen – im Stil der Prüfungsfragen.
// params: { set?: Liste von Symbol-IDs (Standard: alle), need?: Serie richtiger Antworten (Standard 8) }
import { h, s } from '../../../assets/js/vizkit/base.js';
import { readout, goals } from '../../../assets/js/vizkit/controls.js';

const W = { stroke: 'var(--ink)', 'stroke-width': 2.2, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' };
const ln = (x1, y1, x2, y2, extra = {}) => s('line', { x1, y1, x2, y2, ...W, ...extra });
const path = (d, extra = {}) => s('path', { d, ...W, ...extra });
const txt = (x, y, t, size = 13, anchor = 'middle') => s('text', { x, y, 'text-anchor': anchor, 'font-size': size, fill: 'var(--ink)', 'font-weight': 600 }, t);
const wire = (a = 10, b = 110) => [ln(10, 35, a, 35), ln(b, 35, 110, 35)];
const arrowHead = (x, y, ang, len = 8) => { // gefüllte Pfeilspitze, Spitze bei (x,y), Richtung ang (rad)
  const p = (da) => [x - len * Math.cos(ang + da), y - len * Math.sin(ang + da)];
  const a = p(0.42), b = p(-0.42);
  return s('path', { d: `M${x},${y} L${a[0]},${a[1]} L${b[0]},${b[1]} Z`, fill: 'var(--ink)', stroke: 'none' });
};
const lightArrows = (x, y) => [ln(x, y, x + 12, y - 12), arrowHead(x + 12, y - 12, -Math.PI / 4, 7), ln(x + 9, y + 4, x + 21, y - 8), arrowHead(x + 21, y - 8, -Math.PI / 4, 7)];

export const SYMBOLS = {
  schalter: { name: 'Schalter', draw: () => [ln(10, 35, 40, 35), ln(80, 35, 110, 35), ln(40, 35, 76, 14), s('circle', { cx: 40, cy: 35, r: 2.5, fill: 'var(--ink)' }), s('circle', { cx: 80, cy: 35, r: 2.5, fill: 'var(--ink)' })] },
  widerstand: { name: 'Widerstand', draw: () => [...wire(35, 85), s('rect', { x: 35, y: 24, width: 50, height: 22, ...W })] },
  poti: { name: 'Einstellbarer Widerstand (Potentiometer)', draw: () => [...wire(35, 85), s('rect', { x: 35, y: 24, width: 50, height: 22, ...W }), ln(60, 4, 60, 24), arrowHead(60, 24, Math.PI / 2, 8)] },
  ntc: { name: 'NTC (Heißleiter)', draw: () => [...wire(35, 85), s('rect', { x: 35, y: 24, width: 50, height: 22, ...W }), path('M28,56 L44,56 L88,14'), txt(94, 52, 'ϑ', 14), ln(92, 22, 92, 4), arrowHead(92, 4, -Math.PI / 2, 7), ln(103, 4, 103, 22), arrowHead(103, 22, Math.PI / 2, 7)] },
  ptc: { name: 'PTC (Kaltleiter)', draw: () => [...wire(35, 85), s('rect', { x: 35, y: 24, width: 50, height: 22, ...W }), path('M28,56 L44,56 L88,14'), txt(94, 52, 'ϑ', 14), ln(92, 22, 92, 4), arrowHead(92, 4, -Math.PI / 2, 7), ln(103, 22, 103, 4), arrowHead(103, 4, -Math.PI / 2, 7)] },
  ldr: { name: 'LDR (Fotowiderstand)', draw: () => [...wire(35, 85), s('rect', { x: 35, y: 24, width: 50, height: 22, ...W }), ln(36, 4, 48, 16), arrowHead(48, 16, Math.PI / 4, 7), ln(28, 10, 40, 22), arrowHead(40, 22, Math.PI / 4, 7)] },
  vdr: { name: 'VDR (Varistor)', draw: () => [...wire(35, 85), s('rect', { x: 35, y: 24, width: 50, height: 22, ...W }), path('M26,56 L40,56 L88,12'), txt(60, 66, 'U', 12)] },
  kondensator: { name: 'Kondensator', draw: () => [...wire(52, 68), ln(52, 14, 52, 56, { 'stroke-width': 3 }), ln(68, 14, 68, 56, { 'stroke-width': 3 })] },
  elko: { name: 'Elektrolytkondensator (gepolt)', draw: () => [...wire(52, 68), ln(52, 14, 52, 56, { 'stroke-width': 3 }), s('rect', { x: 68, y: 14, width: 7, height: 42, fill: 'var(--ink)' }), ln(75, 35, 110, 35), txt(40, 24, '+', 15)] },
  drehko: { name: 'Drehkondensator (veränderbar)', draw: () => [...wire(52, 68), ln(52, 14, 52, 56, { 'stroke-width': 3 }), ln(68, 14, 68, 56, { 'stroke-width': 3 }), ln(30, 60, 90, 8), arrowHead(90, 8, -0.72, 8)] },
  spule: { name: 'Spule', draw: () => [...wire(22, 98), path('M22,35 a9.5,11 0 0 1 19,0 a9.5,11 0 0 1 19,0 a9.5,11 0 0 1 19,0 a9.5,11 0 0 1 19,0')] },
  spulekern: { name: 'Spule mit Eisen-/Ferritkern', draw: () => [...wire(22, 98), path('M22,35 a9.5,11 0 0 1 19,0 a9.5,11 0 0 1 19,0 a9.5,11 0 0 1 19,0 a9.5,11 0 0 1 19,0'), ln(22, 14, 98, 14), ln(22, 8, 98, 8)] },
  trafo: { name: 'Transformator', draw: () => [] },
  diode: { name: 'Diode', draw: () => [...wire(46, 74), path('M46,16 L46,54 L74,35 Z'), ln(74, 16, 74, 54)] },
  led: { name: 'Leuchtdiode (LED)', draw: () => [...wire(46, 74), path('M46,18 L46,52 L74,35 Z'), ln(74, 18, 74, 52), ...lightArrows(56, 14)] },
  zdiode: { name: 'Z-Diode', draw: () => [...wire(46, 74), path('M46,16 L46,54 L74,35 Z'), path('M68,12 L74,16 L74,54 L80,58')] },
  kapdiode: { name: 'Kapazitätsdiode', draw: () => [...wire(40, 80), path('M40,16 L40,54 L62,35 Z'), ln(62, 16, 62, 54), ln(68, 16, 68, 54)] },
  npn: { name: 'Bipolartransistor (npn)', draw: () => [ln(10, 35, 46, 35), ln(46, 15, 46, 55, { 'stroke-width': 3.2 }), ln(46, 28, 84, 10), ln(84, 10, 84, 2), ln(46, 42, 84, 60), ln(84, 60, 84, 68), s('circle', { cx: 62, cy: 35, r: 30, ...W, 'stroke-width': 1.6 }), arrowHead(80, 58, 0.62, 10)] },
  pnp: { name: 'Bipolartransistor (pnp)', draw: () => [ln(10, 35, 46, 35), ln(46, 15, 46, 55, { 'stroke-width': 3.2 }), ln(46, 28, 84, 10), ln(84, 10, 84, 2), ln(46, 42, 84, 60), ln(84, 60, 84, 68), s('circle', { cx: 62, cy: 35, r: 30, ...W, 'stroke-width': 1.6 }), arrowHead(50, 44, Math.PI + 0.62, 10)] },
  batterie: { name: 'Batterie (Spannungsquelle)', draw: () => [...wire(52, 68), ln(52, 8, 52, 62), ln(68, 22, 68, 48, { 'stroke-width': 5 }), txt(40, 26, '+', 15), txt(80, 26, '−', 15)] },
  masse: { name: 'Masse', draw: () => [ln(60, 8, 60, 40), ln(38, 40, 82, 40, { 'stroke-width': 3.4 })] },
  erde: { name: 'Erde', draw: () => [ln(60, 6, 60, 26), ln(36, 26, 84, 26, { 'stroke-width': 3 }), ln(44, 36, 76, 36, { 'stroke-width': 3 }), ln(52, 46, 68, 46, { 'stroke-width': 3 })] },
  antenne: { name: 'Antenne', draw: () => [ln(60, 6, 60, 62), ln(60, 6, 36, 28), ln(60, 6, 84, 28)] },
  lampe: { name: 'Glühlampe', draw: () => [...wire(40, 80), s('circle', { cx: 60, cy: 35, r: 20, ...W }), ln(46, 21, 74, 49), ln(46, 49, 74, 21)] },
  sicherung: { name: 'Sicherung', draw: () => [...wire(35, 85), s('rect', { x: 35, y: 24, width: 50, height: 22, ...W }), ln(35, 35, 85, 35)] },
  voltmeter: { name: 'Spannungsmessgerät (Voltmeter)', draw: () => [...wire(38, 82), s('circle', { cx: 60, cy: 35, r: 22, ...W }), txt(60, 42, 'V', 20)] },
  amperemeter: { name: 'Strommessgerät (Amperemeter)', draw: () => [...wire(38, 82), s('circle', { cx: 60, cy: 35, r: 22, ...W }), txt(60, 42, 'A', 20)] },
  quarz: { name: 'Schwingquarz', draw: () => [...wire(50, 70), ln(50, 14, 50, 56, { 'stroke-width': 3 }), ln(70, 14, 70, 56, { 'stroke-width': 3 }), s('rect', { x: 56, y: 16, width: 8, height: 38, ...W })] },
};
SYMBOLS.trafo.draw = () => [ln(10, 15, 30, 15), ln(10, 55, 30, 55), ln(90, 15, 110, 15), ln(90, 55, 110, 55),
  path('M30,15 a6,6.67 0 0 0 0,13.33 a6,6.67 0 0 0 0,13.33 a6,6.67 0 0 0 0,13.34'), path('M90,15 a6,6.67 0 0 1 0,13.33 a6,6.67 0 0 1 0,13.33 a6,6.67 0 0 1 0,13.34'),
  ln(55, 12, 55, 58), ln(65, 12, 65, 58)];

export function symbolSvg(id, size = 150) {
  const sy = SYMBOLS[id];
  return s('svg', { viewBox: '0 0 120 70', width: size, height: size * 70 / 120, role: 'img', 'aria-label': 'Schaltzeichen', style: 'max-width:100%' }, ...sy.draw());
}

export default function mount(stage, { params = {}, complete }) {
  const ids = (params.set || Object.keys(SYMBOLS)).filter(i => SYMBOLS[i]);
  const need = params.need ?? 8;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const card = h('div', { class: 'vz-stat', style: 'display:block;padding:14px 16px' });
  const fig = h('div', { style: 'display:flex;justify-content:center;background:#fff;border:1px solid var(--line);border-radius:12px;padding:10px;margin-bottom:12px' });
  const opts = h('div', { style: 'display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:8px' });
  const fb = h('div', { class: 'vz-note', style: 'margin-top:10px;min-height:2.4em' });
  card.append(h('div', { style: 'font-weight:600;margin-bottom:8px', text: 'Welches Bauteil zeigt dieses Schaltzeichen?' }), fig, opts, fb);
  root.append(card);
  const out = readout(root, [{ id: 'streak', label: 'Serie', hl: true }, { id: 'best', label: 'Beste Serie' }, { id: 'n', label: 'Aufgaben' }]);
  const g = goals(root, [{ id: 'g', label: `${need} Schaltzeichen in Folge richtig` }], () => complete?.());
  let cur = null, streak = 0, best = 0, n = 0, locked = false, last = null;
  const shuffle = a => a.map(x => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map(p => p[1]);
  function next() {
    locked = false;
    do { cur = ids[Math.floor(Math.random() * ids.length)]; } while (cur === last && ids.length > 1);
    last = cur; opts.dataset.answer = cur;
    const wrong = shuffle(ids.filter(i => i !== cur)).slice(0, 3);
    fig.replaceChildren(symbolSvg(cur, 200));
    opts.replaceChildren(...shuffle([cur, ...wrong]).map(id => {
      const b = h('button', { type: 'button', class: 'btn ghost', text: SYMBOLS[id].name, style: 'text-align:left;white-space:normal' });
      b.onclick = () => answer(id, b);
      b.dataset.id = id;
      return b;
    }));
    fb.textContent = '';
  }
  function answer(id, btn) {
    if (locked) return; locked = true; n++;
    const ok = id === cur;
    streak = ok ? streak + 1 : 0; best = Math.max(best, streak);
    [...opts.children].forEach(b => { if (b.dataset.id === cur) b.style.cssText += ';border-color:var(--good);background:#e8f6ec'; });
    if (!ok) btn.style.cssText += ';border-color:var(--bad);background:#fbe9e9';
    fb.textContent = ok ? 'Richtig.' : `Das ist: ${SYMBOLS[cur].name}.`;
    out.set({ streak, best, n });
    if (streak >= need) g.reach('g');
    setTimeout(next, ok ? 700 : 1800);
  }
  out.set({ streak, best, n });
  next();
}
