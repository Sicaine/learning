// Sinus-Explorer: Frequenz und Amplitude einstellen, Periodendauer T = 1/f, Amplitude und Periode im Oszillogramm erkennen.
// params: { goals?: ['mains','vhf','amp'] }
import { h, s } from '../../../assets/js/vizkit/base.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { fmt } from '../../../assets/js/vizkit/si.js';

export default function mount(stage, { params = {}, complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const ui = controls(root, [
    { id: 'f', label: 'Frequenz f', unit: 'Hz', min: 1, max: 1e9, value: 50, scale: 'log' },
    { id: 'a', label: 'Amplitude û', unit: 'V', min: 0.1, max: 10, value: 5, step: 0.1 },
    { type: 'presets', label: 'Beispiele', items: [{ label: 'Netz 50 Hz', values: { f: 50 } }, { label: 'Ton 1 kHz', values: { f: 1e3 } }, { label: '80 m: 3,75 MHz', values: { f: 3.75e6 } }, { label: '2 m: 145 MHz', values: { f: 145e6 } }] },
  ], draw);
  const svg = s('svg', { viewBox: '0 0 360 200', class: 'vz-svg', role: 'img', 'aria-label': 'Sinusschwingung mit markierter Amplitude und Periode', style: 'width:100%;background:#fff;border:1px solid var(--line);border-radius:10px' });
  root.append(svg);
  const out = readout(root, [{ id: 'T', label: 'Periodendauer T = 1/f', hl: true }, { id: 'f', label: 'Frequenz f' }, { id: 'uss', label: 'Spitze-Spitze' }]);
  const need = params.goals ?? ['mains', 'vhf', 'amp'];
  const g = goals(root, [
    { id: 'mains', label: 'T = 20 ms einstellen (f = 50 Hz)' }, { id: 'vhf', label: '145 MHz: Periodendauer ablesen (≈ 6,9 ns)' }, { id: 'amp', label: 'Amplitude 8 V bei beliebiger Frequenz' },
  ].filter(x => need.includes(x.id)), () => complete?.());
  function draw() {
    const { f, a } = ui.values, T = 1 / f;
    const W = 360, H = 200, x0 = 30, x1 = 345, yc = 100, A = 70 * a / 10 + 10;
    const periods = 2.5, px = p => x0 + (x1 - x0) * p / periods;
    svg.replaceChildren();
    svg.append(s('line', { x1: x0, x2: x1, y1: yc, y2: yc, stroke: 'var(--line-2)' }), s('line', { x1: x0, x2: x0, y1: 10, y2: 190, stroke: 'var(--line-2)' }));
    let d = ''; for (let i = 0; i <= 200; i++) { const p = periods * i / 200; d += (i ? 'L' : 'M') + px(p).toFixed(1) + ' ' + (yc - A * Math.sin(2 * Math.PI * p)).toFixed(1); }
    svg.append(s('path', { d, fill: 'none', stroke: 'var(--accent)', 'stroke-width': 2.5 }));
    // Amplitude: bei p = 0,25 vom Nullpfad zur Spitze
    const ax = px(0.25) + 0, ay = yc - A;
    svg.append(s('line', { x1: ax + 12, x2: ax + 12, y1: yc, y2: ay, stroke: 'var(--accent-2)', 'stroke-width': 2 }), s('path', { d: `M${ax + 8} ${ay + 6}L${ax + 12} ${ay}L${ax + 16} ${ay + 6}`, fill: 'none', stroke: 'var(--accent-2)', 'stroke-width': 2 }),
      s('text', { x: ax + 20, y: yc - A / 2 + 4, 'font-size': 13, 'font-weight': 700, fill: 'var(--accent-2)' }, `Amplitude ${fmt(a, 'V')}`));
    // Periode: zwischen zwei Maxima p=0,25 und 1,25
    const bx0 = px(0.25), bx1 = px(1.25), by = 18;
    svg.append(s('line', { x1: bx0, x2: bx1, y1: by, y2: by, stroke: 'var(--bad)', 'stroke-width': 2 }), s('line', { x1: bx0, x2: bx0, y1: by - 5, y2: ay - 2, stroke: 'var(--bad)', 'stroke-dasharray': '3 3' }), s('line', { x1: bx1, x2: bx1, y1: by - 5, y2: ay - 2, stroke: 'var(--bad)', 'stroke-dasharray': '3 3' }),
      s('text', { x: (bx0 + bx1) / 2, y: by + 16, 'text-anchor': 'middle', 'font-size': 13, 'font-weight': 700, fill: 'var(--bad)' }, `Periode T = ${fmt(T, 's')}`));
    svg.append(s('text', { x: x1, y: 192, 'text-anchor': 'end', 'font-size': 11, fill: 'var(--muted)' }, 'Zeit →'), s('text', { x: x0 + 4, y: 190, 'font-size': 11, fill: 'var(--muted)' }, 'Spannung'));
    out.set({ T: fmt(T, 's'), f: fmt(f, 'Hz'), uss: fmt(2 * a, 'V') });
    if (Math.abs(f / 50 - 1) < 0.03) g.reach('mains');
    if (Math.abs(f / 145e6 - 1) < 0.03) g.reach('vhf');
    if (Math.abs(a - 8) < 0.05) g.reach('amp');
  }
  draw();
}
