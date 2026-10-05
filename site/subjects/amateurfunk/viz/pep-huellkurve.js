// PEP-Hüllkurve: Zweiton-Signal (SSB-Test) — Spitzenleistung (PEP) und mittlere Leistung am 50-Ω-Abschluss.
// PEP = û² / (2·R) mit û = Scheitelwert der HF-Schwingung an der höchsten Spitze der Hüllkurve. params: { goals?: ['pep75','half'] }
import { h, s } from '../../../assets/js/vizkit/base.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';

const R = 50;
const fw = x => (+x.toPrecision(3)).toString().replace('.', ',');
export default function mount(stage, { params = {}, complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const ui = controls(root, [
    { id: 'mode', type: 'seg', label: 'Signal', options: [['carrier', 'unmodulierter Träger'], ['two', 'Zweiton (SSB-Test)']], value: 'two' },
    { id: 'u', label: 'Scheitelwert û an der Hüllkurvenspitze', unit: 'V', min: 5, max: 200, value: 50, step: 0.5 },
  ], draw);
  const svg = s('svg', { viewBox: '0 0 360 190', class: 'vz-svg', role: 'img', 'aria-label': 'HF-Signal mit Hüllkurve', style: 'width:100%;background:#fff;border:1px solid var(--line);border-radius:10px' });
  root.append(svg);
  const out = readout(root, [{ id: 'pep', label: 'PEP (Spitzenleistung)', hl: true }, { id: 'avg', label: 'mittlere Leistung' }, { id: 'ratio', label: 'PEP : Mittel' }]);
  const need = params.goals ?? ['pep75', 'half'];
  const g = goals(root, [{ id: 'pep75', label: 'PEP = 75 W einstellen (û ≈ 86,6 V)' }, { id: 'half', label: 'beide Signalarten ansehen: Zweiton hat nur halb so viel mittlere Leistung wie PEP' }].filter(x => need.includes(x.id)), () => complete?.());
  const seen = new Set();
  function draw() {
    const { mode, u } = ui.values, pep = u * u / (2 * R), avg = mode === 'two' ? pep / 2 : pep;
    svg.replaceChildren();
    const x0 = 20, x1 = 345, yc = 95, A = 80 * u / 200 + 8, N = 600, T = 1;   // T: Hüllkurvenperiode (Schwebung)
    svg.append(s('line', { x1: x0, x2: x1, y1: yc, y2: yc, stroke: 'var(--line-2)' }));
    let d = '', up = '', lo = '';
    for (let i = 0; i <= N; i++) {
      const t = i / N * 2, env = mode === 'two' ? Math.abs(Math.cos(Math.PI * t * 2)) : 1;
      const x = x0 + (x1 - x0) * i / N;
      d += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + (yc - A * (mode === 'two' ? Math.cos(Math.PI * t * 2) * Math.sin(2 * Math.PI * t * 24) : Math.sin(2 * Math.PI * t * 24))).toFixed(1);
      up += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + (yc - A * env).toFixed(1); lo += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + (yc + A * env).toFixed(1);
    }
    svg.append(s('path', { d, fill: 'none', stroke: 'var(--accent)', 'stroke-width': 1 }), s('path', { d: up, fill: 'none', stroke: 'var(--bad)', 'stroke-width': 2 }), s('path', { d: lo, fill: 'none', stroke: 'var(--bad)', 'stroke-width': 2 }));
    svg.append(s('line', { x1: x0, x2: x1, y1: yc - A, y2: yc - A, stroke: 'var(--accent-2)', 'stroke-dasharray': '4 3' }), s('text', { x: x1, y: yc - A - 4, 'text-anchor': 'end', 'font-size': 11, fill: 'var(--accent-2)', 'font-weight': 700 }, `höchste Spitze der Hüllkurve: û = ${fw(u)} V`));
    svg.append(s('text', { x: x0 + 2, y: 182, 'font-size': 11, fill: 'var(--muted)' }, mode === 'two' ? 'rot: Hüllkurve (Schwebung der beiden Töne) · blau: HF-Schwingung' : 'rot: Hüllkurve (konstant) · blau: HF-Schwingung'));
    out.set({ pep: fw(pep) + ' W', avg: fw(avg) + ' W', ratio: mode === 'two' ? '2 : 1' : '1 : 1' });
    if (Math.abs(pep - 75) < 1) g.reach('pep75');
    seen.add(mode); if (seen.size === 2) g.reach('half');
  }
  draw();
}
