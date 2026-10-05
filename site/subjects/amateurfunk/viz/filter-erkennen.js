// Filter erkennen: aus der Schaltung (Reihenelement + Querelement) auf Tiefpass, Hochpass, Bandpass, Sperrkreis oder Saugkreis schließen.
// params: { need?: Serie richtiger Antworten (Standard 6) }
import { h, s } from '../../../assets/js/vizkit/base.js';
import { readout, goals } from '../../../assets/js/vizkit/controls.js';
import { SYMBOLS } from './schaltzeichen-trainer.js';

const SC = 0.6;
const W = { stroke: 'var(--ink)', 'stroke-width': 1.8, fill: 'none', 'stroke-linecap': 'round' };
const ln = (x1, y1, x2, y2) => s('line', { x1, y1, x2, y2, ...W });
const dot = (cx, cy, filled = true) => s('circle', { cx, cy, r: 3.5, fill: filled ? 'var(--ink)' : '#fff', stroke: 'var(--ink)', 'stroke-width': 1.6 });
const el = (id, cx, cy, vertical) => s('g', { transform: `translate(${cx},${cy}) rotate(${vertical ? 90 : 0}) scale(${SC}) translate(-60,-35)` }, ...SYMBOLS[id].draw());
const lab = (t, x, y) => s('text', { x, y, 'font-size': 11, fill: 'var(--muted)', 'text-anchor': 'middle' }, t);

// Reihenglied-Bausteine (Eingang links, Knoten bei x = 200, y = 40) und Querglieder (senkrecht bei x = 200 nach unten)
const SER = {
  R: () => [ln(10, 40, 60, 40), el('widerstand', 90, 40, false), ln(120, 40, 200, 40)],
  L: () => [ln(10, 40, 60, 40), el('spule', 90, 40, false), ln(120, 40, 200, 40)],
  C: () => [ln(10, 40, 60, 40), el('kondensator', 90, 40, false), ln(120, 40, 200, 40)],
  LC: () => [ln(10, 40, 30, 40), el('spule', 60, 40, false), ln(90, 40, 100, 40), el('kondensator', 130, 40, false), ln(160, 40, 200, 40)],
  parLC: () => [ln(10, 40, 50, 40), ln(50, 40, 50, 100), ln(50, 100, 60, 100), el('spule', 90, 40, false), el('kondensator', 90, 100, false), ln(120, 100, 130, 100), ln(130, 100, 130, 40), ln(50, 40, 60, 40), ln(120, 40, 130, 40), ln(130, 40, 200, 40), dot(50, 40), dot(130, 40)],
};
const SHUNT = {
  R: () => [ln(200, 40, 200, 95), el('widerstand', 200, 125, true), ln(200, 155, 200, 210)],
  L: () => [ln(200, 40, 200, 95), el('spule', 200, 125, true), ln(200, 155, 200, 210)],
  C: () => [ln(200, 40, 200, 95), el('kondensator', 200, 125, true), ln(200, 155, 200, 210)],
  LC: () => [ln(200, 40, 200, 70), el('spule', 200, 100, true), ln(200, 130, 200, 140), el('kondensator', 200, 170, true), ln(200, 200, 200, 210)],
  parLC: () => [ln(200, 40, 200, 60), ln(170, 60, 230, 60), ln(170, 60, 170, 95), el('spule', 170, 125, true), ln(170, 155, 170, 170), ln(230, 60, 230, 95), el('kondensator', 230, 125, true), ln(230, 155, 230, 170), ln(170, 170, 230, 170), ln(200, 170, 200, 210), dot(200, 60), dot(200, 170)],
};
const TEMPLATES = [
  { ser: 'R', sh: 'C', ans: 'tp', why: 'Widerstand im Längszweig, Kondensator quer: Bei hohen Frequenzen schließt der Kondensator das Signal kurz, tiefe passieren — **Tiefpass**.' },
  { ser: 'L', sh: 'C', ans: 'tp', why: 'Spule im Längszweig (X_L steigt mit f) und Kondensator quer (X_C sinkt): hohe Frequenzen werden gesperrt — **Tiefpass**.' },
  { ser: 'C', sh: 'R', ans: 'hp', why: 'Kondensator im Längszweig („aufrechtes H“): Tiefe Frequenzen werden gesperrt, hohe passieren — **Hochpass**.' },
  { ser: 'C', sh: 'L', ans: 'hp', why: 'Kondensator im Längszweig, Spule quer (schließt tiefe Frequenzen kurz) — **Hochpass**.' },
  { ser: 'parLC', sh: 'R', ans: 'sperr', why: 'Ein **Parallelschwingkreis** im Signalweg ist bei Resonanz hochohmig und sperrt diese Frequenz — **Sperrkreis**.' },
  { ser: 'R', sh: 'LC', ans: 'saug', why: 'Ein **Serienschwingkreis** quer zum Signalweg ist bei Resonanz niederohmig und saugt diese Frequenz ab — **Saugkreis**.' },
  { ser: 'LC', sh: 'R', ans: 'bp', why: 'Ein **Serienschwingkreis** im Signalweg ist bei Resonanz niederohmig und lässt genau diese Frequenz durch — **Bandpass**.' },
  { ser: 'R', sh: 'parLC', ans: 'bp', why: 'Ein **Parallelschwingkreis** quer zum Signalweg ist bei Resonanz hochohmig (das Signal bleibt erhalten) und schließt andere Frequenzen kurz — **Bandpass**.' },
];
const OPTS = [['tp', 'Tiefpass'], ['hp', 'Hochpass'], ['bp', 'Bandpass'], ['sperr', 'Sperrkreis'], ['saug', 'Saugkreis']];

export default function mount(stage, { params = {}, complete }) {
  const need = params.need ?? 6;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const svg = s('svg', { class: 'vz-svg', viewBox: '0 0 360 230', role: 'img', 'aria-label': 'Filterschaltung mit Eingang links und Ausgang rechts' }); root.append(svg);
  const row = h('div', { style: 'display:flex;gap:8px;flex-wrap:wrap;margin:8px 0' });
  const fb = h('div', { class: 'vz-note', style: 'min-height:3.4em' });
  root.append(row, fb);
  const out = readout(root, [{ id: 'streak', label: 'Serie', hl: true }, { id: 'n', label: 'Aufgaben' }]);
  const g = goals(root, [{ id: 'g', label: `${need} Filter in Folge richtig erkannt` }], () => complete?.());
  let cur = null, last = -1, streak = 0, n = 0, locked = false;
  function show() {
    locked = false; fb.textContent = '';
    let i; do { i = Math.floor(Math.random() * TEMPLATES.length); } while (i === last); last = i; cur = TEMPLATES[i];
    svg.replaceChildren(s('rect', { x: 0, y: 0, width: 360, height: 230, fill: '#fff', rx: 10 }),
      ...SER[cur.ser](), ...SHUNT[cur.sh](), ln(200, 40, 330, 40), ln(10, 210, 330, 210), dot(10, 40, false), dot(330, 40, false), dot(10, 210, false), dot(330, 210, false), dot(200, 40), dot(200, 210),
      lab('Eingang', 36, 28), lab('Ausgang', 322, 28));
    row.dataset.answer = cur.ans;
  }
  for (const [id, label] of OPTS) {
    const b = h('button', { type: 'button', class: 'btn ghost', text: label }); b.dataset.id = id; row.append(b);
    b.onclick = () => {
      if (locked) return; locked = true; n++;
      const ok = id === cur.ans; streak = ok ? streak + 1 : 0;
      fb.innerHTML = (ok ? '<b>Richtig.</b> ' : `<b>Nicht ganz</b> (${OPTS.find(o => o[0] === cur.ans)[1]}). `) + cur.why.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
      out.set({ streak, n }); if (streak >= need) g.reach('g');
      setTimeout(show, ok ? 1800 : 3600);
    };
  }
  out.set({ streak, n }); show();
}
