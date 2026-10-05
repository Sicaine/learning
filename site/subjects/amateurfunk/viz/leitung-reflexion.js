// Leitung mit Abschluss: Reflexionsfaktor, SWR, hin- und rücklaufende Welle, stehende Welle; optional Kabeldämpfung.
// Rechnung (verlustfrei am Abschluss): Γ = (Z_L − Z_0)/(Z_L + Z_0), s = (1+|Γ|)/(1−|Γ|), P_r/P_v = |Γ|².
// Mit Kabeldämpfung a (dB, einfache Strecke) sieht der Sender |Γ_ein| = |Γ|·10^(−a/10): das SWR am Sender ist besser als an der Antenne.
import { h, s } from '../../../assets/js/vizkit/base.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { animate } from '../../../assets/js/vizkit/anim.js';

const Z0 = 50;
const de = (x, d = 2) => Number.isFinite(x) ? (+x.toFixed(d)).toString().replace('.', ',') : '∞';

export default function mount(stage, { params = {}, complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const W = 360, Hh = 250;
  const svg = s('svg', { class: 'vz-svg', viewBox: `0 0 ${W} ${Hh}`, role: 'img', 'aria-label': 'Leitung mit hin- und rücklaufender Welle und stehender Welle', style: 'max-width:620px;margin:0 auto;background:var(--surface-2);border:1px solid var(--line);border-radius:12px' });
  root.append(svg);
  const ui = controls(root, [
    { id: 'mode', type: 'seg', label: 'Abschluss', options: [['r', 'Widerstand'], ['short', 'Kurzschluss'], ['open', 'Leerlauf']], value: params.mode || 'r' },
    { id: 'R', label: 'Lastwiderstand R', min: 5, max: 1000, scale: 'log', value: params.R ?? 150, format: v => de(v, v < 100 ? 1 : 0) + ' Ω' },
    { id: 'X', label: 'Blindanteil jX', min: -200, max: 200, step: 5, value: 0, format: v => (v > 0 ? '+' : '') + v + ' Ω' },
    { id: 'a', label: 'Kabeldämpfung (einfach)', min: 0, max: 10, step: 0.5, value: 0, format: v => de(v, 1) + ' dB' },
  ], run);
  const out = readout(root, [
    { id: 'gam', label: 'Reflexionsfaktor |Γ|' }, { id: 'swr', label: 'SWR an der Antenne', hl: true }, { id: 'swrin', label: 'SWR am Sender gemessen', hl: true },
    { id: 'pr', label: 'reflektiert (an der Antenne)' }, { id: 'pa', label: 'von der Last aufgenommen' },
  ]);
  const g = goals(root, [
    { id: 'm', label: 'Anpassung: SWR 1 an der Antenne (R = 50 Ω, jX = 0)' },
    { id: 's3', label: 'SWR 3 einstellen: 25 % der Leistung kommen zurück' },
    { id: 'ext', label: 'Leerlauf oder Kurzschluss: volle Reflexion' },
    { id: 'att', label: 'Schlecht angepasst (SWR ≥ 3) und ≥ 3 dB Kabeldämpfung: der Sender misst ein besseres SWR' },
  ], () => complete?.());
  const ctl = animate(svg, (dt, t) => draw(t), { speed: 0.5 });
  ctl.controls(root);
  root.append(h('div', { class: 'vz-note', text: 'Die Zeichnung zeigt die Spannung entlang der Leitung (Länge 2 λ, links Sender, rechts Last), ohne die Kabeldämpfung. Dünn: hinlaufende (blau) und rücklaufende (orange) Welle; dick: die Summe, gestrichelt: die Hüllkurve der stehenden Welle.' }));

  let G = { re: 0, im: 0 };
  function calc() {
    const v = ui.values;
    let zr, zi;
    if (v.mode === 'short') { zr = 0; zi = 0; } else if (v.mode === 'open') { zr = 1e12; zi = 0; } else { zr = v.R; zi = v.X; }
    // Γ = (Z − Z0)/(Z + Z0)
    const nr = zr - Z0, ni = zi, dr = zr + Z0, di = zi, den = dr * dr + di * di;
    const re = (nr * dr + ni * di) / den, im = (ni * dr - nr * di) / den;
    const mag = Math.hypot(re, im);
    const swr = mag > 0.9999999 ? Infinity : (1 + mag) / (1 - mag);
    const gin = mag * Math.pow(10, -v.a / 10);
    const swrin = gin > 0.9999999 ? Infinity : (1 + gin) / (1 - gin);
    return { re, im, mag, swr, gin, swrin };
  }
  function draw(t) {
    const c = calc(); G = c;
    const x0 = 16, x1 = W - 40, mid = 130, A = 56, L = 2;      // L in λ
    const px = d => x1 - d / L * (x1 - x0);                       // d = Abstand von der Last
    const w = 2 * Math.PI * t * 0.6, bl = 2 * Math.PI, ang = Math.atan2(c.im, c.re);
    const kids = [];
    // Blockbild oben
    kids.push(s('rect', { x: 4, y: 6, width: 38, height: 22, rx: 5, fill: 'var(--surface)', stroke: 'var(--ink-2)' }), s('text', { x: 23, y: 21, 'text-anchor': 'middle', 'font-size': 10, fill: 'var(--ink)', 'font-weight': 700 }, 'Sender'));
    kids.push(s('line', { x1: 42, y1: 17, x2: W - 70, y2: 17, stroke: 'var(--ink)', 'stroke-width': 2 }), s('text', { x: W / 2 - 12, y: 12, 'text-anchor': 'middle', 'font-size': 9, fill: 'var(--muted)' }, 'Leitung, Z₀ = 50 Ω'));
    kids.push(s('rect', { x: W - 70, y: 6, width: 62, height: 22, rx: 5, fill: 'var(--surface)', stroke: 'var(--ink-2)' }), s('text', { x: W - 39, y: 21, 'text-anchor': 'middle', 'font-size': 10, fill: 'var(--ink)', 'font-weight': 700 }, ui.values.mode === 'short' ? 'Kurzschl.' : ui.values.mode === 'open' ? 'offen' : `${de(ui.values.R, 0)} Ω${ui.values.X ? (ui.values.X > 0 ? '+j' : '−j') + Math.abs(ui.values.X) : ''}`));
    // Achsen
    kids.push(s('line', { x1: x0, y1: mid, x2: x1, y2: mid, stroke: 'var(--line-2)' }), s('line', { x1: x1, y1: mid - 70, x2: x1, y2: mid + 70, stroke: 'var(--line-2)', 'stroke-dasharray': '3 3' }));
    kids.push(s('text', { x: x1 + 4, y: mid + 4, 'font-size': 9, fill: 'var(--muted)' }, 'Last'));
    for (let k = 0; k <= 4; k++) { const d = k * 0.5; kids.push(s('line', { x1: px(d), y1: mid + 70, x2: px(d), y2: mid + 75, stroke: 'var(--muted)' }), s('text', { x: px(d), y: mid + 86, 'text-anchor': 'middle', 'font-size': 8, fill: 'var(--muted)' }, d === 0 ? '0' : `${de(d, 1)} λ`)); }
    const N = 200, f = [], r = [], sm = [], hu = [], hl = [];
    for (let i = 0; i <= N; i++) {
      const d = i / N * L, ph = bl * d;
      const fw = Math.cos(w + ph), rw = c.mag * Math.cos(w - ph + ang);
      const sx = px(d).toFixed(1);
      f.push(sx + ',' + (mid - fw * A * 0.8).toFixed(1));
      r.push(sx + ',' + (mid - rw * A * 0.8).toFixed(1));
      sm.push(sx + ',' + (mid - (fw + rw) * A * 0.8).toFixed(1));
      // Hüllkurve |1 + Γ e^{-j2βd}|
      const env = Math.hypot(1 + c.mag * Math.cos(ang - 2 * ph), c.mag * Math.sin(ang - 2 * ph));
      hu.push(sx + ',' + (mid - env * A * 0.8).toFixed(1)); hl.push(sx + ',' + (mid + env * A * 0.8).toFixed(1));
    }
    kids.push(s('polyline', { points: hu.join(' '), fill: 'none', stroke: 'var(--muted)', 'stroke-width': 1.2, 'stroke-dasharray': '4 3' }), s('polyline', { points: hl.join(' '), fill: 'none', stroke: 'var(--muted)', 'stroke-width': 1.2, 'stroke-dasharray': '4 3' }));
    kids.push(s('polyline', { points: f.join(' '), fill: 'none', stroke: 'var(--accent)', 'stroke-width': 1.4, opacity: .75 }));
    kids.push(s('polyline', { points: r.join(' '), fill: 'none', stroke: 'var(--warn)', 'stroke-width': 1.4, opacity: .85 }));
    kids.push(s('polyline', { points: sm.join(' '), fill: 'none', stroke: 'var(--ink)', 'stroke-width': 2.4 }));
    svg.replaceChildren(...kids);
  }
  let live = false;
  function run() {
    const v = ui.values, c = calc();
    out.set({
      gam: de(c.mag, 2), swr: Number.isFinite(c.swr) ? de(c.swr, 2) : '∞', swrin: Number.isFinite(c.swrin) ? de(c.swrin, 2) : '∞',
      pr: `${de(c.mag * c.mag * 100, 1)} %`, pa: `${de((1 - c.mag * c.mag) * 100, 1)} %`,
    });
    if (!live) { ctl.once(); return; }
    if (v.mode === 'r' && c.swr < 1.05) g.reach('m');
    if (c.swr > 2.85 && c.swr < 3.15) g.reach('s3');
    if (v.mode !== 'r') g.reach('ext');
    if (c.swr >= 3 && v.a >= 3 && c.swrin < c.swr - 0.4) g.reach('att');
    ctl.once();
  }
  run();
  live = true;
}
