// Antennengewinn: dBi ↔ dBd (g_i = g_d + 2,15 dB) mit Gewinnfaktoren, und Parabolspiegel (Gewinn und Öffnungswinkel aus Durchmesser/λ).
// Parabolspiegel-Näherung (Lehrbuchwert, nicht Prüfungsstoff Klasse E): G ≈ η·(π·D/λ)², Halbwertsbreite ≈ 70°·λ/D, Wirkungsgrad η ≈ 0,55.
import { h, s } from '../../../assets/js/vizkit/base.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';

const de = (x, d = 2) => (+x.toFixed(d)).toString().replace('.', ',');
const DI = 2.15;
const ETA = 0.55;

export default function mount(stage, { complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const svg = s('svg', { class: 'vz-svg', viewBox: '0 0 360 120', role: 'img', 'aria-label': 'Skala der Antennengewinne in dBi und dBd', style: 'max-width:560px;margin:0 auto;background:var(--surface-2);border:1px solid var(--line);border-radius:12px' });
  root.append(svg);
  const ui = controls(root, [
    { id: 'tab', type: 'seg', label: 'Rechnen mit', options: [['conv', 'dBi ↔ dBd'], ['dish', 'Parabolspiegel']], value: 'conv' },
    { id: 'gd', label: 'Gewinn in dBd (Bezug Dipol)', min: -3, max: 20, step: 0.05, value: 2, format: v => de(v, 2) + ' dBd', wide: true },
    { id: 'f', label: 'Frequenz', min: 1, max: 30, step: 0.1, scale: 'log', value: 10.4, format: v => de(v, 1) + ' GHz' },
    { id: 'D', label: 'Spiegeldurchmesser', min: 0.2, max: 3, step: 0.05, value: 0.6, format: v => de(v, 2) + ' m' },
  ], run);
  const out = readout(root, [{ id: 'a', label: '', hl: true }, { id: 'b', label: '' }, { id: 'c', label: '' }, { id: 'd', label: '' }]);
  const g = goals(root, [
    { id: 'conv', label: '5 dBd einstellen: das sind 7,15 dBi' },
    { id: 'dip', label: 'Der Halbwellendipol: 0 dBd = 2,15 dBi' },
    { id: 'dish', label: 'Parabolspiegel mit mehr als 30 dBi Gewinn' },
  ], () => complete?.());
  root.append(h('div', { class: 'vz-note', text: 'Der gleiche Antennengewinn wird in dBi immer um 2,15 größer angegeben als in dBd, weil der Dipol selbst schon 2,15 dB mehr abstrahlt als der Kugelstrahler.' }));

  let live = false;
  function run() {
    const v = ui.values;
    const conv = v.tab === 'conv';
    for (const id of ['gd']) ui.el.querySelector(`[data-id=${id}]`).style.display = conv ? '' : 'none';
    for (const id of ['f', 'D']) ui.el.querySelector(`[data-id=${id}]`).style.display = conv ? 'none' : '';
    let gi, gd, name;
    const kids = [];
    if (conv) {
      gd = v.gd; gi = gd + DI;
      out.set({ a: `${de(gi, 2)} dBi`, b: `${de(gd, 2)} dBd`, c: `×${de(Math.pow(10, gi / 10), 2)} (Isotrop)`, d: `×${de(Math.pow(10, gd / 10), 2)} (Dipol)` });
      // Beschriftung der Readouts
    } else {
      const lam = 0.29979 / v.f, ratio = v.D / lam, G = ETA * Math.pow(Math.PI * ratio, 2);
      gi = 10 * Math.log10(G); gd = gi - DI;
      const hp = 70 / ratio;
      out.set({ a: `${de(gi, 1)} dBi`, b: `${de(gd, 1)} dBd`, c: `D/λ = ${de(ratio, 1)}`, d: `Öffnungswinkel ≈ ${de(hp, 1)}°` });
    }
    // Skala 0 … 40 dBi
    const x = val => 34 + Math.max(0, Math.min(40, val)) / 40 * 306;
    kids.push(s('line', { x1: 34, y1: 60, x2: 340, y2: 60, stroke: 'var(--ink-2)', 'stroke-width': 2 }));
    for (let d = 0; d <= 40; d += 5) kids.push(s('line', { x1: x(d), y1: 56, x2: x(d), y2: 64, stroke: 'var(--ink-2)' }), s('text', { x: x(d), y: 78, 'text-anchor': 'middle', 'font-size': 9, fill: 'var(--muted)' }, d));
    kids.push(s('text', { x: 340, y: 94, 'text-anchor': 'end', 'font-size': 9, fill: 'var(--muted)' }, 'dBi'));
    kids.push(s('circle', { cx: x(0), cy: 60, r: 5, fill: 'var(--ink-2)' }), s('text', { x: x(0) - 6, y: 94, 'text-anchor': 'start', 'font-size': 9, fill: 'var(--ink-2)', 'font-weight': 700 }, 'Kugel 0 dBi'));
    kids.push(s('circle', { cx: x(DI), cy: 60, r: 5, fill: 'var(--warn)' }), s('text', { x: x(DI) + 10, y: 22, 'text-anchor': 'start', 'font-size': 9, fill: 'var(--warn)', 'font-weight': 700 }, 'Dipol 2,15 dBi = 0 dBd'));
    kids.push(s('line', { x1: x(DI), y1: 26, x2: x(DI), y2: 56, stroke: 'var(--warn)' }));
    kids.push(s('path', { d: `M ${x(gi)} 58 l -8 -16 h 16 z`, fill: 'var(--accent)' }), s('text', { x: x(gi), y: 112, 'text-anchor': 'middle', 'font-size': 10, fill: 'var(--accent)', 'font-weight': 800 }, `${de(gi, 2)} dBi / ${de(gd, 2)} dBd`));
    svg.replaceChildren(...kids);
    // Beschriftung (readout hat keine Labels → über Stat-Zellen)
    const cells = out.el.querySelectorAll('.vz-stat');
    const lbl = conv ? ['in dBi', 'in dBd', 'Faktor', 'Faktor'] : ['Gewinn in dBi', 'Gewinn in dBd', 'Größe', 'Bündelung'];
    cells.forEach((c, i) => { c.firstChild.textContent = lbl[i]; });
    if (!live) return;
    if (conv && Math.abs(v.gd - 5) < 0.03) g.reach('conv');
    if (conv && Math.abs(v.gd) < 0.03) g.reach('dip');
    if (!conv && gi > 30) g.reach('dish');
  }
  run();
  live = true;
}
