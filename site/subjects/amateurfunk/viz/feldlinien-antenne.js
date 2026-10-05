// Feldlinien einer Vertikalantenne: elektrische Feldlinien (Bögen in der senkrechten Ebene) und magnetische (waagerechte Ringe).
// Aufgabe: die mit X markierte Feldlinie als elektrisch oder magnetisch erkennen. params: { need?: richtige Antworten in Folge (Standard 4) }
import { h, s } from '../../../assets/js/vizkit/base.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';

export default function mount(stage, { params = {}, complete }) {
  const need = params.need ?? 4;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const svg = s('svg', { class: 'vz-svg', viewBox: '0 0 420 270', role: 'img', 'aria-label': 'Vertikalantenne mit elektrischen und magnetischen Feldlinien' });
  root.append(svg);
  const AX = 210, TOP = 62, BOT = 212, MID = 137;
  const ui = controls(root, [
    { id: 'e', type: 'toggle', label: 'Elektrische Feldlinien zeigen', value: true },
    { id: 'm', type: 'toggle', label: 'Magnetische Feldlinien zeigen', value: true },
  ], draw);
  const q = h('div', { class: 'vz-stat hl', style: 'display:block;padding:10px 14px;margin:8px 0' }, 'Wie heißt die mit X markierte Feldlinie?');
  const row = h('div', { style: 'display:flex;gap:8px;flex-wrap:wrap' });
  const fb = h('div', { class: 'vz-note', style: 'margin-top:8px;min-height:2.6em' });
  root.append(q, row, fb);
  const out = readout(root, [{ id: 'streak', label: 'Serie', hl: true }, { id: 'n', label: 'Aufgaben' }]);
  const g = goals(root, [{ id: 'g', label: `${need} Markierungen in Folge richtig` }], () => complete?.());
  let target = 'e', streak = 0, n = 0, locked = false, mark = null;

  function draw() {
    const v = ui.values; const el = [];
    el.push(s('rect', { x: 0, y: 0, width: 420, height: 270, fill: '#fff', rx: 10 }));
    el.push(s('line', { x1: 20, y1: 232, x2: 400, y2: 232, stroke: 'var(--muted)', 'stroke-width': 2 }));
    if (v.m) for (const r of [38, 74, 112, 150]) el.push(s('ellipse', { cx: AX, cy: MID, rx: r, ry: r * 0.26, fill: 'none', stroke: 'var(--warn)', 'stroke-width': 2 }));
    if (v.e) for (const w of [34, 72, 112, 150]) for (const sg of [-1, 1]) el.push(s('path', { d: `M${AX},${TOP + 4} C${AX + sg * w * 1.1},${TOP - 6} ${AX + sg * w * 1.1},${BOT + 6} ${AX},${BOT - 4}`, fill: 'none', stroke: 'var(--accent)', 'stroke-width': 2 }));
    el.push(s('line', { x1: AX, y1: TOP, x2: AX, y2: BOT, stroke: 'var(--ink)', 'stroke-width': 5, 'stroke-linecap': 'round' }));
    el.push(s('text', { x: 20, y: 22, 'font-size': 12, fill: 'var(--accent)', 'font-weight': 600 }, v.e ? '— E: Bögen in der Senkrechten' : ''));
    el.push(s('text', { x: 20, y: 40, 'font-size': 12, fill: 'var(--warn)', 'font-weight': 600 }, v.m ? '— H: waagerechte Ringe um die Antenne' : ''));
    if (mark) el.push(s('circle', { cx: mark.x, cy: mark.y, r: 13, fill: '#fff', stroke: 'var(--ink)', 'stroke-width': 1.6 }), s('text', { x: mark.x, y: mark.y + 5, 'text-anchor': 'middle', 'font-size': 15, 'font-weight': 700, fill: 'var(--ink)' }, 'X'));
    svg.replaceChildren(...el);
  }
  function next() {
    locked = false; fb.textContent = '';
    target = Math.random() < 0.5 ? 'e' : 'm';
    ui.set({ e: true, m: true });
    const sg = Math.random() < 0.5 ? -1 : 1;
    if (target === 'e') {
      const w = [72, 112][Math.floor(Math.random() * 2)], tt = 0.2, k = w * 1.1;
      const b = (a, c, d, e) => (1 - tt) ** 3 * a + 3 * (1 - tt) ** 2 * tt * c + 3 * (1 - tt) * tt * tt * d + tt ** 3 * e;
      mark = { x: b(AX, AX + sg * k, AX + sg * k, AX), y: b(TOP + 4, TOP - 6, BOT + 6, BOT - 4) };
    } else {
      const r = [74, 112][Math.floor(Math.random() * 2)], th = 1.05;
      mark = { x: AX + sg * r * Math.cos(th), y: MID + r * 0.26 * Math.sin(th) };
    }
    draw();
  }
  for (const [id, label] of [['e', 'Elektrische Feldlinie'], ['m', 'Magnetische Feldlinie'], ['x', 'Radiale Feldlinie'], ['v', 'Vertikale Feldlinie']]) {
    const b = h('button', { type: 'button', class: 'btn ghost', text: label }); row.append(b);
    b.onclick = () => {
      if (locked) return; locked = true; n++;
      const ok = id === target; streak = ok ? streak + 1 : 0;
      fb.innerHTML = ok ? '<b>Richtig.</b> ' + (target === 'e' ? 'Elektrische Feldlinien beginnen und enden an Ladungen (hier den Antennenenden) und liegen in der Ebene der Antenne.' : 'Magnetische Feldlinien sind immer in sich geschlossen — hier Ringe um den Strom in der Antenne.')
        : 'Nicht ganz: ' + (target === 'e' ? 'Das ist eine <b>elektrische</b> Feldlinie (Bogen von einem Antennenende zum anderen).' : 'Das ist eine <b>magnetische</b> Feldlinie (geschlossener Ring um den Antennenstrom).');
      out.set({ streak, n }); if (streak >= need) g.reach('g');
      setTimeout(next, ok ? 1500 : 2800);
    };
  }
  root.__target = () => target;

  out.set({ streak, n }); next();
}
