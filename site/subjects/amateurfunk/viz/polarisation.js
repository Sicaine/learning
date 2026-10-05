// Polarisation: Sende- und Empfangsantenne (waagerecht, senkrecht, rechts-/linkszirkular) und der Verlust bei Fehlanpassung der Polarisation.
// Blick vom Sender zum Empfänger entlang der Ausbreitungsrichtung: die Pfeilspitze zeigt den elektrischen Feldvektor E.
// Konvention: rechtszirkular = Uhrzeigersinn, in Ausbreitungsrichtung gesehen (IEEE).
import { h, s } from '../../../assets/js/vizkit/base.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { animate } from '../../../assets/js/vizkit/anim.js';

const OPTS = [['h', 'waagerecht'], ['v', 'senkrecht'], ['r', 'rechtszirkular'], ['l', 'linkszirkular']];
const de = (x, d = 1) => x.toFixed(d).replace('.', ',');
const isLin = p => p === 'h' || p === 'v';
// Polarisationsverlust (Leistungsverhältnis Empfang/Maximum) Sende- und Empfangsantenne, ideal
function loss(tx, rx) {
  if (isLin(tx) && isLin(rx)) return tx === rx ? 1 : 0;
  if (!isLin(tx) && !isLin(rx)) return tx === rx ? 1 : 0;
  return 0.5;   // linear ↔ zirkular: 3 dB
}
const fmtLoss = l => l >= 0.999 ? '0 dB (volle Leistung)' : l === 0.5 ? '3 dB (halbe Leistung)' : 'sehr hoch (ideal unendlich)';

export default function mount(stage, { complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const svg = s('svg', { class: 'vz-svg', viewBox: '0 0 360 200', role: 'img', 'aria-label': 'Elektrisches Feld der Welle und Empfangsantenne', style: 'max-width:480px;margin:0 auto;background:var(--surface-2);border:1px solid var(--line);border-radius:12px' });
  root.append(svg);
  const ui = controls(root, [
    { id: 'tx', type: 'seg', label: 'Sendeantenne strahlt', options: OPTS, value: 'v' },
    { id: 'rx', type: 'seg', label: 'Empfangsantenne ist', options: OPTS, value: 'v' },
  ], () => { update(); });
  const out = readout(root, [{ id: 'verl', label: 'Polarisationsverlust', hl: true }, { id: 'e', label: 'Feldvektor' }]);
  const g = goals(root, [
    { id: 'same', label: 'gleiche Polarisation (Verlust 0 dB)' },
    { id: 'cross', label: 'waagerecht gegen senkrecht (Kreuzpolarisation)' },
    { id: 'circ', label: 'linear gegen zirkular (3 dB)' },
  ], () => complete?.());
  root.append(h('div', { class: 'vz-note', text: 'Ideale Antennen: Bei der Kreuzpolarisation bleibt in der Praxis immer ein Rest übrig (typisch 20 bis 30 dB Verlust), die Theorie sagt „unendlich“.' }));

  // Zeichnung: zwei Felder nebeneinander: links die Welle (E-Vektor, Blick in Ausbreitungsrichtung), rechts die Empfangsantenne (Draufsicht auf die Antennenebene)
  const CX1 = 100, CX2 = 260, CY = 100, A = 60;
  const state = { t: 0, tx: 'v', rx: 'v' };
  const draw = () => {
    const { tx, rx, t } = state, w = 2 * Math.PI * t * 0.6;
    let ex, ey;   // E in Bildschirmkoordinaten (x rechts, y oben)
    if (tx === 'h') { ex = Math.cos(w); ey = 0; } else if (tx === 'v') { ex = 0; ey = Math.cos(w); }
    else { const sg = tx === 'r' ? -1 : 1; ex = Math.cos(w); ey = sg * Math.sin(w); }   // Blick in Ausbreitungsrichtung: Uhrzeigersinn = rechts
    const kids = [];
    const axis = cx => [s('line', { x1: cx - A - 8, y1: CY, x2: cx + A + 8, y2: CY, stroke: 'var(--line-2)' }), s('line', { x1: cx, y1: CY - A - 8, x2: cx, y2: CY + A + 8, stroke: 'var(--line-2)' })];
    kids.push(...axis(CX1), ...axis(CX2));
    kids.push(s('text', { x: CX1, y: 14, 'text-anchor': 'middle', 'font-size': 11, fill: 'var(--muted)', 'font-weight': 600 }, 'Sender: elektrisches Feld E'));
    kids.push(s('text', { x: CX2, y: 14, 'text-anchor': 'middle', 'font-size': 11, fill: 'var(--muted)', 'font-weight': 600 }, 'Empfangsantenne'));
    kids.push(s('text', { x: CX1, y: 196, 'text-anchor': 'middle', 'font-size': 10, fill: 'var(--muted)' }, '(Blick in Ausbreitungsrichtung)'));
    if (!isLin(tx)) kids.push(s('circle', { cx: CX1, cy: CY, r: A, fill: 'none', stroke: 'var(--line-2)', 'stroke-dasharray': '3 4' }));
    // E-Pfeil
    const x = CX1 + ex * A, y = CY - ey * A;
    kids.push(s('line', { x1: CX1, y1: CY, x2: x, y2: y, stroke: 'var(--accent)', 'stroke-width': 3.5, 'stroke-linecap': 'round' }), s('circle', { cx: x, cy: y, r: 6, fill: 'var(--accent)' }));
    // Spur bei zirkular
    if (!isLin(tx)) { const pts = []; for (let k = 0; k < 24; k++) { const ww = w - k * 0.12; const sg = tx === 'r' ? -1 : 1; pts.push((CX1 + Math.cos(ww) * A).toFixed(1) + ',' + (CY - sg * Math.sin(ww) * A).toFixed(1)); } kids.push(s('polyline', { points: pts.join(' '), fill: 'none', stroke: 'var(--accent)', 'stroke-width': 2, opacity: .35 })); }
    // Empfangsantenne
    const P = { stroke: 'var(--ink)', 'stroke-width': 5, 'stroke-linecap': 'round' };
    if (rx === 'h') kids.push(s('line', { x1: CX2 - A, y1: CY, x2: CX2 + A, y2: CY, ...P }));
    else if (rx === 'v') kids.push(s('line', { x1: CX2, y1: CY - A, x2: CX2, y2: CY + A, ...P }));
    else {
      const sg = rx === 'r' ? -1 : 1;
      kids.push(s('circle', { cx: CX2, cy: CY, r: A * 0.55, fill: 'none', stroke: 'var(--ink)', 'stroke-width': 3 }));
      const a0 = rx === 'r' ? 0 : Math.PI, x0 = CX2 + Math.cos(a0 + 0) * A * 0.55, y0 = CY;
      kids.push(s('path', { d: sg < 0 ? `M ${CX2 + A * .55} ${CY} l -6 -8 m 6 8 l 8 -6` : `M ${CX2 - A * .55} ${CY} l -6 8 m 6 -8 l 8 6`, stroke: 'var(--ink)', 'stroke-width': 3, fill: 'none' }));
      kids.push(s('text', { x: CX2, y: CY + 4, 'text-anchor': 'middle', 'font-size': 11, fill: 'var(--ink-2)' }, rx === 'r' ? '↻' : '↺'));
    }
    // Projektion von E auf die Antenne: hell
    if (isLin(rx)) { const comp = rx === 'h' ? ex : ey; const px = rx === 'h' ? CX2 + comp * A : CX2, py = rx === 'h' ? CY : CY - comp * A; kids.push(s('circle', { cx: px, cy: py, r: 5, fill: 'var(--good)' })); }
    svg.replaceChildren(...kids);
    let t1 = tx === 'h' ? 'waagerecht' : tx === 'v' ? 'senkrecht' : tx === 'r' ? 'dreht rechtsherum' : 'dreht linksherum';
    out.set({ e: t1 });
  };
  const loop = animate(svg, (dt, t) => { state.t = t; draw(); });
  let live = false;
  function update() {
    state.tx = ui.values.tx; state.rx = ui.values.rx;
    const l = loss(state.tx, state.rx);
    out.set({ verl: fmtLoss(l) });
    if (!live) { loop.once(); return; }
    if (state.tx === state.rx) g.reach('same');
    if (isLin(state.tx) && isLin(state.rx) && state.tx !== state.rx) g.reach('cross');
    if (isLin(state.tx) !== isLin(state.rx)) g.reach('circ');
    loop.once();
  }
  update();
  live = true;
}
