// Wellenlabor (L60): elektromagnetische Welle in Schrägansicht (E, H, Ausbreitung S), Polarisation, Wellenlänge, Dipol-Länge, Feldstärke im Fernfeld.
// params: { velocity?: 0.95 (Verkürzungsfaktor Dipol) }
// Ziele: 7,1 MHz → Dipol ≈ 20 m; 145 MHz → λ/4 ≈ 0,52 m; zirkulare Polarisation einstellen.
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { animate } from '../../../assets/js/vizkit/anim.js';
import { fmt } from '../../../assets/js/vizkit/si.js';
import { h, s, boxWidth } from '../../../assets/js/vizkit/base.js';
import { comma } from './_9-helper.js';

const C0 = 299792458;

export default function mount(stage, { params = {}, complete }) {
  const kv = params.velocity ?? 0.95;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const box = h('div', { class: 'vz-plotbox' }); root.append(box);
  const W = boxWidth(box), H = Math.round(Math.max(250, W * 0.5)), ox = 46, zl = W - ox - 16, lam = zl / 2.3, A = Math.min(H * 0.3, 70), oy = H * 0.5 + 6;
  const svg = s('svg', { viewBox: `0 0 ${W} ${H}`, class: 'vz-svg', style: 'width:100%;height:auto;display:block', role: 'img', 'aria-label': 'Elektromagnetische Welle: E-Feld, H-Feld und Ausbreitungsrichtung' });
  box.append(svg);
  const dxy = [A * 0.62, -A * 0.36];                       // „x“-Achse (in den Bildschirm hinein) → nach rechts oben
  const P = (z, x, y) => [ox + z + x * dxy[0], oy - y * A + x * dxy[1]];
  const f2 = p => p[0].toFixed(1) + ',' + p[1].toFixed(1);
  const ui = controls(root, [
    { id: 'f', label: 'Frequenz f', min: 1e6, max: 1e9, scale: 'log', value: 50e6, format: v => fmt(v, 'Hz') },
    { id: 'pol', type: 'seg', label: 'Polarisation', options: [['v', 'vertikal'], ['hz', 'horizontal'], ['c', 'zirkular']], value: 'v' },
    { id: 'P', label: 'Sendeleistung P', min: 1, max: 1000, scale: 'log', value: 100, format: v => fmt(v, 'W') },
    { id: 'G', type: 'seg', label: 'Antenne', options: [[1, 'Kugelstrahler G = 1'], [1.64, 'Halbwellendipol G = 1,64']], value: 1 },
    { id: 'd', label: 'Abstand d', min: 1, max: 100, scale: 'log', value: 10, format: v => fmt(v, 'm') },
  ], run);
  const out = readout(root, [
    { id: 'lam', label: 'Wellenlänge λ = c/f', hl: true }, { id: 'half', label: 'λ/2 (Freiraum)' }, { id: 'dip', label: `Dipol mechanisch (×${comma(kv, 2)})`, hl: true },
    { id: 'quarter', label: 'λ/4' }, { id: 'E', label: 'E-Feld im Abstand d' }]);
  const g = goals(root, [
    { id: 'kw', label: '7,1 MHz einstellen: Dipol ≈ 20 m' },
    { id: 'uk', label: '145 MHz einstellen: λ/4 ≈ 0,52 m' },
    { id: 'zir', label: 'zirkulare Polarisation ansehen: E dreht sich' },
  ], () => complete?.());
  const loop = animate(box, tick, { speed: 0.5 }); loop.controls(root);
  let phase = 0;
  const g1 = s('g'); svg.append(g1);
  function frame() {
    const { pol } = ui.values, f = ui.values.f;
    let html = '';
    // Achsen
    html += `<line x1="${ox}" y1="${oy}" x2="${ox + zl}" y2="${oy}" stroke="var(--ink-2)" stroke-width="1.6"/><polygon points="${ox + zl},${oy} ${ox + zl - 9},${oy - 4} ${ox + zl - 9},${oy + 4}" fill="var(--ink-2)"/><text x="${ox + zl - 4}" y="16" text-anchor="end" font-size="12" fill="var(--ink-2)">Ausbreitungsrichtung S →</text>`;
    // Dipole am Ursprung
    const dl = lam / 2, hd = ox - 20;
    const dipV = pol !== 'hz', dipH = pol !== 'v';
    if (dipV) html += `<line x1="${hd}" y1="${oy - dl / 2}" x2="${hd}" y2="${oy + dl / 2}" stroke="var(--ink)" stroke-width="4" stroke-linecap="round"/>`;
    if (dipH) { const a = [hd - dxy[0] / A * dl / 2, oy - dxy[1] / A * dl / 2], b = [hd + dxy[0] / A * dl / 2, oy + dxy[1] / A * dl / 2]; const n = Math.hypot(dxy[0], dxy[1]) / A; void n; html += `<line x1="${(hd + dxy[0] * dl / (2 * A) * 1).toFixed(1)}" y1="${(oy + dxy[1] * dl / (2 * A)).toFixed(1)}" x2="${(hd - dxy[0] * dl / (2 * A)).toFixed(1)}" y2="${(oy - dxy[1] * dl / (2 * A)).toFixed(1)}" stroke="var(--ink)" stroke-width="4" stroke-linecap="round"/>`; void a; void b; }
    html += `<text x="${hd}" y="${oy + dl / 2 + 16}" text-anchor="middle" font-size="11" fill="var(--muted)">Dipol</text>`;
    const N = 70, eP = [], hP = [];
    for (let i = 0; i <= N; i++) {
      const z = zl * i / N, ph = 2 * Math.PI * z / lam - phase;
      let Ex = 0, Ey = 0;
      if (pol === 'v') Ey = Math.cos(ph); else if (pol === 'hz') Ex = Math.cos(ph); else { Ex = Math.cos(ph); Ey = Math.sin(ph); }
      const Hx = -Ey, Hy = Ex;
      const pe = P(z, Ex, Ey), ph2 = P(z, Hx, Hy), p0 = P(z, 0, 0);
      eP.push(f2(pe)); hP.push(f2(ph2));
      if (i % 2 === 0) html += `<line x1="${p0[0].toFixed(1)}" y1="${p0[1].toFixed(1)}" x2="${pe[0].toFixed(1)}" y2="${pe[1].toFixed(1)}" stroke="var(--accent)" stroke-width="1.3" opacity="0.55"/><line x1="${p0[0].toFixed(1)}" y1="${p0[1].toFixed(1)}" x2="${ph2[0].toFixed(1)}" y2="${ph2[1].toFixed(1)}" stroke="var(--accent-2)" stroke-width="1.3" opacity="0.6"/>`;
    }
    html += `<polyline points="${eP.join(' ')}" fill="none" stroke="var(--accent)" stroke-width="2.4" stroke-linejoin="round"/><polyline points="${hP.join(' ')}" fill="none" stroke="var(--accent-2)" stroke-width="2.4" stroke-linejoin="round"/>`;
    html += `<text x="${ox + 8}" y="${H - 10}" font-size="12.5" fill="var(--accent)" font-weight="600">E (elektrisch)</text><text x="${ox + 130}" y="${H - 10}" font-size="12.5" fill="var(--accent-2)" font-weight="600">H (magnetisch)</text>`;
    // Wellenlänge-Maß
    const zm = lam * 0.4, yb = H - 34;
    html += `<line x1="${ox + zm}" y1="${yb}" x2="${ox + zm + lam}" y2="${yb}" stroke="var(--ink)" stroke-width="1.4"/><line x1="${ox + zm}" y1="${yb - 5}" x2="${ox + zm}" y2="${yb + 5}" stroke="var(--ink)"/><line x1="${ox + zm + lam}" y1="${yb - 5}" x2="${ox + zm + lam}" y2="${yb + 5}" stroke="var(--ink)"/><text x="${ox + zm + lam / 2}" y="${yb - 7}" text-anchor="middle" font-size="12.5" fill="var(--ink)">λ = ${fmt(C0 / f, 'm')}</text>`;
    g1.innerHTML = html;
  }
  function tick(dt) { phase += dt * 2 * Math.PI * 0.35; frame(); }
  function run() {
    const { f, pol, P: pw, G, d } = ui.values, lam0 = C0 / f, E = Math.sqrt(30 * pw * G) / d;
    out.set({ lam: fmt(lam0, 'm', 3), half: fmt(lam0 / 2, 'm', 3), dip: fmt(kv * lam0 / 2, 'm', 3), quarter: fmt(lam0 / 4, 'm', 3), E: comma(E, E < 10 ? 2 : 1) + ' V/m' });
    if (Math.abs(f / 7.1e6 - 1) < 0.02) g.reach('kw');
    if (Math.abs(f / 145e6 - 1) < 0.02) g.reach('uk');
    if (pol === 'c') g.reach('zir');
    frame();
  }
  run();
}
