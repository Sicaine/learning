// Frequenzvervielfacher-Kette: Quarz- oder VFO-Frequenz mit ×2- und ×3-Stufen vervielfachen; die Abweichung wächst mit.
// params: { }
import { h, s } from '../../../assets/js/vizkit/base.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';

const de = (x, d = 4) => (+x.toPrecision(d)).toString().replace('.', ',');

export default function mount(stage, { complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const svg = s('svg', { class: 'vz-svg', viewBox: '0 0 460 110', role: 'img', 'aria-label': 'Kette aus Oszillator und Vervielfacherstufen' }); root.append(svg);
  const ui = controls(root, [
    { id: 'f0', type: 'seg', label: 'Oszillatorfrequenz', options: [[3.55, '3,55 MHz'], [12.1, '12,1 MHz'], [18.15, '18,15 MHz'], [24.2, '24,2 MHz']], value: 3.55 },
    { id: 'df', label: 'Abweichung des Oszillators Δf', unit: 'Hz', min: 0, max: 500, step: 10, value: 100 },
  ], run);
  const stages = [];
  const row = h('div', { style: 'display:flex;gap:8px;flex-wrap:wrap;margin:8px 0' });
  for (const [label, k] of [['+ ×2', 2], ['+ ×3', 3]]) { const b = h('button', { type: 'button', class: 'btn ghost', text: label }); b.onclick = () => { if (stages.length < 4) { stages.push(k); run(); } }; row.append(b); }
  const back = h('button', { type: 'button', class: 'btn ghost', text: 'Letzte Stufe entfernen' }); back.onclick = () => { stages.pop(); run(); }; row.append(back);
  root.append(row);
  const out = readout(root, [{ id: 'n', label: 'Gesamtfaktor' }, { id: 'f', label: 'Ausgangsfrequenz', hl: true }, { id: 'd', label: 'Abweichung am Ausgang' }]);
  const g = goals(root, [
    { id: 'a', label: '3,55 MHz → 14,2 MHz (Faktor 4)' }, { id: 'b', label: '12,1 MHz → 145,2 MHz (Faktor 12, PA-Frequenz im 2-m-Band)' }, { id: 'c', label: '145,2 MHz mit weniger als 1 kHz Abweichung am Ausgang (Oszillator-Drift verkleinern!)' },
  ], () => complete?.());
  root.append(h('p', { class: 'vz-note', html: 'Bei jeder Vervielfachung wird auch die <b>Frequenzabweichung</b> mit vervielfacht: 100 Hz Drift bei 12,1 MHz werden bei Faktor 12 zu 1,2 kHz bei 145,2 MHz. Deshalb müssen Oszillatoren für hohe Endfrequenzen besonders stabil sein.' }));
  function run() {
    const { f0, df } = ui.values, n = stages.reduce((p, q) => p * q, 1), f = f0 * n, d = df * n;
    out.set({ n: `× ${n}`, f: `${de(f)} MHz`, d: d >= 1000 ? `${de(d / 1000, 3)} kHz` : `${d} Hz` });
    const els = [s('rect', { x: 0, y: 0, width: 460, height: 110, fill: '#fff', rx: 10 })];
    const box = (x, label, sub) => { els.push(s('rect', { x, y: 30, width: 70, height: 44, rx: 6, fill: 'none', stroke: 'var(--ink)', 'stroke-width': 1.8 }), s('text', { x: x + 35, y: 50, 'text-anchor': 'middle', 'font-size': 13, 'font-weight': 700, fill: 'var(--ink)' }, label), s('text', { x: x + 35, y: 66, 'text-anchor': 'middle', 'font-size': 11, fill: 'var(--muted)' }, sub)); };
    let x = 8, cf = f0; box(x, 'Osz.', `${de(f0)}`); x += 70;
    stages.forEach(k => { els.push(s('line', { x1: x, y1: 52, x2: x + 18, y2: 52, stroke: 'var(--ink)', 'stroke-width': 1.8 })); x += 18; cf *= k; box(x, `× ${k}`, `${de(cf)}`); x += 70; });
    els.push(s('line', { x1: x, y1: 52, x2: Math.min(x + 30, 450), y2: 52, stroke: 'var(--ink)', 'stroke-width': 1.8 }), s('text', { x: 230, y: 100, 'text-anchor': 'middle', 'font-size': 12, fill: 'var(--ink)' }, `Ausgang: ${de(f)} MHz`));
    svg.replaceChildren(...els);
    if (Math.abs(f - 14.2) < 0.001 && f0 === 3.55) g.reach('a');
    if (Math.abs(f - 145.2) < 0.001 && f0 === 12.1) g.reach('b');
    if (Math.abs(f - 145.2) < 0.001 && f0 === 12.1 && d < 1000) g.reach('c');
  }
  run();
}
