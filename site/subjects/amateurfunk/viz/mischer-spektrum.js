// Mischer-Spektrum: Eingangsfrequenz und Oszillatorfrequenz einstellen, Summen- und Differenzfrequenz ablesen.
// params: { fe?: MHz (Start 28), fo?: MHz (Start 38,7) }
import { h, s } from '../../../assets/js/vizkit/base.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';

const de = x => (+x.toFixed(3)).toString().replace('.', ',');

export default function mount(stage, { params = {}, complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const svg = s('svg', { class: 'vz-svg', viewBox: '0 0 460 190', role: 'img', 'aria-label': 'Frequenzspektrum am Mischerausgang' }); root.append(svg);
  const ui = controls(root, [
    { id: 'fe', label: 'Eingangsfrequenz f_e', unit: 'MHz', min: 1, max: 150, step: 0.1, value: params.fe ?? 28, digits: 4 },
    { id: 'fo', label: 'Oszillatorfrequenz f_o', unit: 'MHz', min: 1, max: 150, step: 0.1, value: params.fo ?? 38.7, digits: 4 },
  ], run);
  const out = readout(root, [{ id: 'diff', label: 'Differenz |f_e − f_o|', hl: true }, { id: 'sum', label: 'Summe f_e + f_o', hl: true }]);
  const g = goals(root, [
    { id: 'zf', label: 'Eingang 28 MHz, Differenz 10,7 MHz (f_o = 38,7 MHz)' },
    { id: 'zf2', label: 'Differenz 9 MHz bei f_e = 145 MHz (f_o = 136 MHz)' },
    { id: 'kl', label: 'Summe 66,7 MHz und Differenz 10,7 MHz erzeugen' },
  ], () => complete?.());
  root.append(h('p', { class: 'vz-note', html: 'Ein Mischer erzeugt am Ausgang vor allem die <b>Summe</b> und die <b>Differenz</b> der beiden Eingangsfrequenzen; die Eingangsfrequenzen selbst sind unerwünscht (kommen durch Unvollkommenheiten ebenfalls etwas durch). Ein Filter wählt hinterher das gewünschte Produkt.' }));
  const near = (a, b) => Math.abs(a - b) < 0.051;
  function run() {
    const { fe, fo } = ui.values, sum = fe + fo, diff = Math.abs(fe - fo), max = Math.max(sum * 1.12, 20);
    const X = f => 25 + (f / max) * 410, els = [s('rect', { x: 0, y: 0, width: 460, height: 190, fill: '#fff', rx: 10 }), s('line', { x1: 25, y1: 150, x2: 440, y2: 150, stroke: 'var(--ink)', 'stroke-width': 1.5 })];
    const bar = (f, label, col, hgt, wide) => { els.push(s('line', { x1: X(f), y1: 150, x2: X(f), y2: 150 - hgt, stroke: col, 'stroke-width': wide ? 5 : 3, 'stroke-linecap': 'round' })); els.push(s('text', { x: X(f), y: 144 - hgt, 'text-anchor': 'middle', 'font-size': 11, 'font-weight': 600, fill: 'var(--ink)' }, label)); };
    bar(fe, `f_e ${de(fe)}`, 'var(--muted)', 40); bar(fo, `f_o ${de(fo)}`, 'var(--muted)', 40);
    bar(diff, `Δ ${de(diff)}`, 'var(--accent)', 95, true); bar(sum, `Σ ${de(sum)}`, 'var(--accent-2)', 95, true);
    for (let t = 0; t <= max; t += max > 150 ? 50 : 25) { els.push(s('line', { x1: X(t), y1: 150, x2: X(t), y2: 155, stroke: 'var(--ink)' }), s('text', { x: X(t), y: 168, 'text-anchor': 'middle', 'font-size': 10, fill: 'var(--muted)' }, `${t}`)); }
    els.push(s('text', { x: 440, y: 184, 'text-anchor': 'end', 'font-size': 10, fill: 'var(--muted)' }, 'MHz'));
    svg.replaceChildren(...els);
    out.set({ diff: `${de(diff)} MHz`, sum: `${de(sum)} MHz` });
    if (near(fe, 28) && near(diff, 10.7)) g.reach('zf');
    if (near(fe, 145) && near(diff, 9)) g.reach('zf2');
    if (near(sum, 66.7) && near(diff, 10.7)) g.reach('kl');
  }
  run();
}
