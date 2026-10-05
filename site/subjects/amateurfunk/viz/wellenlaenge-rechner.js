// Frequenz-/Wellenlängen-Rechner mit Frequenzbereichs-Leiste (KW, UKW, UHF) und Amateurfunkbändern. λ = c / f, praktisch λ/m = 300 / (f/MHz).
// params: { goals?: ['m2','l80','ghz'] }
import { h, s } from '../../../assets/js/vizkit/base.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { fmt } from '../../../assets/js/vizkit/si.js';

const C = 3e8;
// log-Leiste von 1 MHz bis 10 GHz
const F0 = 1e6, F1 = 1e10, X0 = 14, X1 = 346;
const px = f => X0 + (X1 - X0) * Math.log(f / F0) / Math.log(F1 / F0);
const RANGES = [['MF (Mittelwelle)', 3e5, 3e6, '#e8eef7'], ['HF / Kurzwelle (KW)', 3e6, 3e7, '#d6ebe0'], ['VHF / UKW', 3e7, 3e8, '#f6e6c6'], ['UHF / Dezimeterwelle', 3e8, 3e9, '#f3d4d4'], ['SHF', 3e9, 3e10, '#e1d8f0']];
const BANDS = [['160 m', 1.84e6], ['80 m', 3.65e6], ['40 m', 7.1e6], ['20 m', 14.2e6], ['15 m', 21.2e6], ['10 m', 28.5e6], ['2 m', 145e6], ['70 cm', 433.5e6], ['23 cm', 1270e6], ['13 cm', 2380e6]];
const rangeOf = f => f < 3e6 ? 'Mittelwelle (MF, 300 kHz–3 MHz)' : f < 3e7 ? 'Kurzwelle (HF, 3–30 MHz)' : f < 3e8 ? 'Ultrakurzwelle (VHF, 30–300 MHz)' : f < 3e9 ? 'Dezimeterwelle (UHF, 300–3000 MHz)' : 'Zentimeterwelle (SHF, ab 3 GHz)';

export default function mount(stage, { params = {}, complete, md }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const ui = controls(root, [
    { id: 'f', label: 'Frequenz f', unit: 'Hz', min: 1e6, max: 1e10, value: 28.5e6, scale: 'log' },
    { id: 'l', label: 'Wellenlänge λ', unit: 'm', min: 0.03, max: 300, value: C / 28.5e6, scale: 'log' },
    { type: 'presets', label: 'Amateurfunkband', items: BANDS.map(([n, f]) => ({ label: n, values: { f, l: C / f } })) },
  ], (v, id) => { if (id === 'f') ui.set({ l: C / v.f }, { silent: true }); else if (id === 'l') ui.set({ f: C / v.l }, { silent: true }); draw(); });
  const svg = s('svg', { viewBox: '0 0 360 120', class: 'vz-svg', role: 'img', 'aria-label': 'Frequenzbereiche von 1 MHz bis 10 GHz mit Cursor', style: 'width:100%;background:#fff;border:1px solid var(--line);border-radius:10px;margin-top:8px' });
  root.append(svg);
  const calc = h('div', { class: 'vz-note', style: 'font-size:1rem;line-height:1.6;margin-top:8px' }); root.append(calc);
  const out = readout(root, [{ id: 'f', label: 'f' }, { id: 'l', label: 'λ', hl: true }, { id: 'r', label: 'Bereich' }]);
  const need = params.goals ?? ['m2', 'l80', 'ghz'];
  const g = goals(root, [{ id: 'm2', label: 'Wellenlänge des 2-m-Bandes (145 MHz) ablesen' }, { id: 'l80', label: 'λ = 80 m einstellen → f ≈ 3,75 MHz' }, { id: 'ghz', label: 'f = 10 GHz: λ = 3 cm' }].filter(x => need.includes(x.id)), () => complete?.());
  function draw() {
    const f = ui.values.f, lam = C / f;
    svg.replaceChildren();
    for (const [n, a, b, col] of RANGES) { const xa = px(Math.max(a, F0)), xb = px(Math.min(b, F1)); svg.append(s('rect', { x: xa, y: 30, width: xb - xa, height: 34, fill: col, stroke: '#fff' }), s('text', { x: (xa + xb) / 2, y: 50, 'text-anchor': 'middle', 'font-size': 8.5, fill: 'var(--ink)' }, n.split(' (')[0].replace('HF / ', ''))); }
    for (const e of [6, 7, 8, 9, 10]) { const x = px(10 ** e), lab = { 6: '1 MHz', 7: '10 MHz', 8: '100 MHz', 9: '1 GHz', 10: '10 GHz' }[e]; svg.append(s('line', { x1: x, x2: x, y1: 64, y2: 70, stroke: 'var(--ink-2)' }), s('text', { x, y: 82, 'text-anchor': x > 330 ? 'end' : x < 30 ? 'start' : 'middle', 'font-size': 9, fill: 'var(--muted)' }, lab)); }
    BANDS.forEach(([n, bf], i) => { const x = px(bf); svg.append(s('line', { x1: x, x2: x, y1: 24, y2: 30, stroke: 'var(--accent)', 'stroke-width': 2 }), s('text', { x, y: i % 2 ? 12 : 21, 'text-anchor': 'middle', 'font-size': 8, fill: 'var(--accent)' }, n)); });
    const cx = px(f);
    svg.append(s('line', { x1: cx, x2: cx, y1: 26, y2: 100, stroke: 'var(--bad)', 'stroke-width': 2 }), s('circle', { cx, cy: 100, r: 4, fill: 'var(--bad)' }),
      s('text', { x: cx > 300 ? cx - 6 : cx + 6, y: 108, 'text-anchor': cx > 300 ? 'end' : 'start', 'font-size': 10, 'font-weight': 700, fill: 'var(--bad)' }, `${fmt(f, 'Hz')} → λ ${fmt(lam, 'm')}`));
    const fm = f / 1e6;
    calc.innerHTML = md(`$\\lambda = \\dfrac{c}{f} \\approx \\dfrac{300}{f_{\\text{MHz}}}\\,\\text{m} = \\dfrac{300}{${(+fm.toPrecision(4)).toString().replace('.', '{,}')}}\\,\\text{m} = ${(+lam.toPrecision(3)).toString().replace('.', '{,}')}\\,\\text{m}$`);
    out.set({ f: fmt(f, 'Hz'), l: fmt(lam, 'm'), r: rangeOf(f) });
    if (Math.abs(f / 145e6 - 1) < 0.02) g.reach('m2');
    if (Math.abs(lam / 80 - 1) < 0.03) g.reach('l80');
    if (Math.abs(f / 1e10 - 1) < 0.02) g.reach('ghz');
  }
  draw();
}
