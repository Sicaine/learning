// Dipol-Längenrechner: Frequenz → Wellenlänge → Halbwellendipol mit Verkürzungsfaktor; Draht kürzen/verlängern bis zur Resonanz;
// Strom- und Spannungsverteilung auf dem Halbwellendipol und der Speisepunkt (Mitte = stromgespeist, Ende = spannungsgespeist).
// Formeln wie in der Formelsammlung: λ[m] ≈ 300/f[MHz], Resonanzfrequenz eines Drahtes der Länge L = k·150/L (L in m, f in MHz).
import { h, s } from '../../../assets/js/vizkit/base.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';

const de = (x, d = 2) => x.toFixed(d).replace('.', ',');
const BANDS = [['80 m', 3.65], ['40 m', 7.1], ['20 m', 14.2], ['10 m', 28.5], ['2 m', 145]];

export default function mount(stage, { params = {}, complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const W = 360, Hh = 230;
  const svg = s('svg', { class: 'vz-svg', viewBox: `0 0 ${W} ${Hh}`, role: 'img', 'aria-label': 'Dipol mit Strom- und Spannungsverteilung', style: 'max-width:560px;margin:0 auto;background:var(--surface-2);border:1px solid var(--line);border-radius:12px' });
  root.append(svg);
  const ui = controls(root, [
    { type: 'presets', label: 'Band', items: BANDS.map(([l, f]) => ({ label: l, values: { f } })) },
    { id: 'f', label: 'Betriebsfrequenz', min: 1.8, max: 146, value: params.f ?? 7.1, scale: 'log', format: v => de(v, v < 10 ? 2 : 1) + ' MHz' },
    { id: 'L', label: 'Drahtlänge des Dipols (gesamt)', min: 0.5, max: 90, step: 0.01, scale: 'log', value: params.L ?? 24, format: v => de(v, 2) + ' m', wide: true },
    { id: 'k', label: 'Verkürzungsfaktor k', min: 0.90, max: 1.00, step: 0.01, value: 0.95, format: v => de(v, 2) },
    { id: 'feed', type: 'seg', label: 'Speisepunkt', options: [['mid', 'Mitte'], ['end', 'Ende']], value: 'mid' },
  ], run);
  const out = readout(root, [
    { id: 'lam', label: 'Wellenlänge λ' }, { id: 'lopt', label: 'Halbwellendipol (λ/2 · k)', hl: true }, { id: 'fres', label: 'Resonanz deines Drahtes', hl: true }, { id: 'state', label: 'Urteil' },
  ]);
  const out2 = readout(root, [
    { id: 'q', label: 'λ/4-Strahler (elektr.)' }, { id: 'q58', label: '5/8-λ-Strahler (elektr.)' }, { id: 'fold', label: 'Faltdipol: Drahtlänge ≈ λ' }, { id: 'rf', label: 'Speisewiderstand' },
  ]);
  const g = goals(root, [
    { id: 'res', label: 'Dipol auf die Betriebsfrequenz abgestimmt (±1,5 %)' },
    { id: 'cut', label: 'Zu langen Draht (Resonanz zu tief) auf Resonanz gekürzt' },
    { id: 'two', label: 'Dasselbe auf 2 m (145 MHz): ein Dipol hat dort nur etwa einen Meter' },
  ], () => complete?.());
  let wasLong = false, live = false;

  function run() {
    const v = ui.values, lam = 300 / v.f, lopt = lam / 2 * v.k, fres = 150 * v.k / v.L;
    const dev = fres / v.f - 1;
    const long = dev < -0.015, short = dev > 0.015;
    // Zeichnung
    const kids = [];
    const cx = W / 2, cy = 96, rel = Math.max(0.12, Math.min(1.25, v.L / lopt)), half = 105 * rel;
    kids.push(s('line', { x1: 10, y1: cy, x2: W - 10, y2: cy, stroke: 'var(--line)', 'stroke-dasharray': '2 5' }));
    // Sollbereich: Marker für optimale Länge
    const o = 105; kids.push(s('line', { x1: cx - o, y1: cy + 46, x2: cx - o, y2: cy + 56, stroke: 'var(--good)', 'stroke-width': 2 }), s('line', { x1: cx + o, y1: cy + 46, x2: cx + o, y2: cy + 56, stroke: 'var(--good)', 'stroke-width': 2 }), s('line', { x1: cx - o, y1: cy + 51, x2: cx + o, y2: cy + 51, stroke: 'var(--good)', 'stroke-width': 1.5 }));
    kids.push(s('text', { x: cx, y: cy + 69, 'text-anchor': 'middle', 'font-size': 10, fill: 'var(--good)', 'font-weight': 600 }, `Sollänge ${de(lopt, 2)} m`));
    // Draht
    const feedEnd = v.feed === 'end';
    kids.push(s('line', { x1: cx - half, y1: cy, x2: cx + half, y2: cy, stroke: 'var(--ink)', 'stroke-width': 4, 'stroke-linecap': 'round' }));
    // Isolatoren an den Enden
    for (const sg of [-1, 1]) kids.push(s('circle', { cx: cx + sg * half, cy, r: 4, fill: 'var(--surface)', stroke: 'var(--ink)', 'stroke-width': 2 }));
    // Speisepunkt
    const fx = feedEnd ? cx - half : cx;
    kids.push(s('circle', { cx: fx, cy: cy, r: 6, fill: 'var(--accent)' }), s('line', { x1: fx, y1: cy + 6, x2: fx, y2: cy + 24, stroke: 'var(--accent)', 'stroke-width': 3 }));
    kids.push(s('text', { x: fx + (feedEnd ? 4 : 0), y: cy + 36, 'text-anchor': feedEnd ? 'start' : 'middle', 'font-size': 10, fill: 'var(--accent)', 'font-weight': 700 }, 'Speisung'));
    // Strom (blau) und Spannung (orange) bei Halbwellen-Grundschwingung der gezeichneten Länge: I ∝ cos, U ∝ sin entlang des Drahtes
    const N = 60;
    const ip = [], up = [];
    for (let i = 0; i <= N; i++) { const t = i / N, x = cx - half + 2 * half * t; ip.push(`${x.toFixed(1)},${(cy - 24 - 40 * Math.cos((t - 0.5) * Math.PI)).toFixed(1)}`); up.push(`${x.toFixed(1)},${(cy - 24 - 40 * Math.abs(Math.sin((t - 0.5) * Math.PI))).toFixed(1)}`); }
    kids.push(s('polyline', { points: ip.join(' '), fill: 'none', stroke: 'var(--accent)', 'stroke-width': 2.5 }));
    kids.push(s('polyline', { points: up.join(' '), fill: 'none', stroke: 'var(--warn)', 'stroke-width': 2.5, 'stroke-dasharray': '5 3' }));
    kids.push(s('line', { x1: cx - half, y1: cy - 24, x2: cx + half, y2: cy - 24, stroke: 'var(--line-2)' }));
    kids.push(s('text', { x: 12, y: 14, 'font-size': 11, fill: 'var(--accent)', 'font-weight': 700 }, '— Strom I'));
    kids.push(s('text', { x: 90, y: 14, 'font-size': 11, fill: 'var(--warn)', 'font-weight': 700 }, '- - Spannung U'));
    // Frequenzachse: Resonanz gegen Betriebsfrequenz
    const ay = 196, fx0 = v.f * 0.6, fx1 = v.f * 1.6;
    const px = f => 20 + (Math.log(f / fx0) / Math.log(fx1 / fx0)) * (W - 40);
    kids.push(s('line', { x1: 20, y1: ay, x2: W - 20, y2: ay, stroke: 'var(--ink-2)', 'stroke-width': 1.5 }));
    kids.push(s('line', { x1: px(v.f), y1: ay - 12, x2: px(v.f), y2: ay + 12, stroke: 'var(--good)', 'stroke-width': 3 }), s('text', { x: px(v.f), y: ay + 26, 'text-anchor': 'middle', 'font-size': 10, fill: 'var(--good)', 'font-weight': 700 }, `Soll ${de(v.f, v.f < 10 ? 2 : 1)} MHz`));
    const rp = Math.max(24, Math.min(W - 24, px(fres)));
    kids.push(s('path', { d: `M ${rp} ${ay - 2} l -7 -12 h 14 z`, fill: Math.abs(dev) <= 0.015 ? 'var(--good)' : 'var(--bad)' }), s('text', { x: rp, y: ay - 18, 'text-anchor': 'middle', 'font-size': 10, fill: 'var(--ink)', 'font-weight': 700 }, `Resonanz ${de(fres, fres < 10 ? 2 : 1)} MHz`));
    svg.replaceChildren(...kids);

    const verdict = Math.abs(dev) <= 0.015 ? 'in Resonanz' : long ? 'zu lang: Resonanz zu tief → beide Enden kürzen' : 'zu kurz: Resonanz zu hoch → beide Enden verlängern';
    out.set({ lam: `${de(lam, 2)} m`, lopt: `${de(lopt, 2)} m`, fres: `${de(fres, 3)} MHz`, state: verdict });
    out2.set({ q: `${de(lam / 4, 2)} m`, q58: `${de(lam * 5 / 8, 2)} m`, fold: `${de(lam * v.k, 2)} m`, rf: feedEnd ? 'hochohmig (einige kΩ)' : 'niederohmig (ca. 73 Ω)' });

    if (long) wasLong = true;
    if (!live) return;
    if (Math.abs(dev) <= 0.015) { g.reach('res'); if (wasLong) g.reach('cut'); if (v.f > 100) g.reach('two'); }
  }
  run();
  live = true;
}
