// VNA-Kurven-Leser: SWR einer Dipol-Antenne über der Frequenz, Resonanz (X = 0), Realteil R und Blindanteil jX.
// Modell: Antenne = Reihenschwingkreis um f₀: Z(f) = R₀ + j·X_s·(f/f₀ − f₀/f), X_s = 120 Ω (Lernmodell); f₀ = 150·k/L (k = 0,95, L in m, f in MHz).
// Mit einem echten VNA liest du dieselben Größen ab: erst kalibrieren (Leerlauf, Kurzschluss, 50-Ω-Abschluss), dann messen.
import { h } from '../../../assets/js/vizkit/base.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { plot } from '../../../assets/js/vizkit/plot.js';

const Z0 = 50, XS = 120, K = 0.95;
const de = (x, d = 2) => Number.isFinite(x) ? (+x.toFixed(d)).toString().replace('.', ',') : '∞';
function gam(f, f0, R0) { const X = XS * (f / f0 - f0 / f), nr = R0 - Z0, dr = R0 + Z0, den = dr * dr + X * X; const re = (nr * dr + X * X) / den, im = (X * dr - nr * X) / den; const m = Math.hypot(re, im); return { m, X, swr: (1 + m) / (1 - m) }; }

export default function mount(stage, { params = {}, complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const target = params.target ?? 7.1;
  const box = h('div'); root.append(box);
  const p = plot(box, { x: { min: target * 0.8, max: target * 1.2, unit: 'MHz', label: 'Frequenz', format: v => String(+v.toFixed(2)).replace('.', ',') }, y: { scale: 'log', min: 1, max: 20, label: 'SWR', format: v => String(v) }, h: 250, legend: false });
  const ui = controls(root, [
    { id: 'L', label: 'Drahtlänge (gesamt)', min: 15, max: 25, step: 0.05, value: params.L ?? 22.4, format: v => de(v, 2) + ' m', wide: true },
    { id: 'R', label: 'Fußpunktwiderstand', min: 25, max: 120, step: 1, value: 73, format: v => v + ' Ω' },
    { id: 'f', label: 'Cursor (Messfrequenz)', min: target * 0.8, max: target * 1.2, step: 0.01, value: target * 0.9, format: v => de(v, 2) + ' MHz', wide: true },
  ], run);
  const out = readout(root, [
    { id: 'fres', label: 'Resonanz (SWR-Minimum)', hl: true }, { id: 'swrmin', label: 'SWR dort' }, { id: 'sw', label: 'SWR am Cursor' }, { id: 'rx', label: 'Z am Cursor (R + jX)', hl: true },
  ]);
  const g = goals(root, [
    { id: 'find', label: 'Cursor auf die Resonanz stellen (X ≈ 0, ±1 %)' },
    { id: 'tune', label: `Draht so abstimmen, dass die Resonanz bei ${de(target, 1)} MHz liegt (±1,5 %)` },
  ], () => complete?.());
  root.append(h('div', { class: 'vz-note', text: `Resonanz heißt: der Blindanteil jX ist null, der Realteil R ist der Fußpunktwiderstand. Das SWR-Minimum liegt dort; es ist 1, wenn R gleich 50 Ω ist (hier ${de(73, 0)} Ω: SWR 1,46). Zu lang → Resonanz zu tief → Draht kürzen.` }));
  let live = false;

  function run() {
    const v = ui.values, f0 = 150 * K / v.L;
    const xs = [], ys = [];
    for (let i = 0; i <= 160; i++) { const f = target * 0.8 + target * 0.4 * i / 160; xs.push(f); ys.push(Math.min(20, gam(f, f0, v.R).swr)); }
    p.line('swr', xs, ys, { color: 'var(--accent)', label: 'SWR' });
    p.vline('t', target, { label: 'Soll', dash: '4 4' });
    p.marker('cur', v.f, Math.min(20, gam(v.f, f0, v.R).swr), { label: 'Cursor' });
    const gm = gam(v.f, f0, v.R), g0 = gam(f0, f0, v.R);
    out.set({ fres: `${de(f0, 3)} MHz`, swrmin: de(g0.swr, 2), sw: de(gm.swr, 2), rx: `${de(v.R, 0)} ${gm.X >= 0 ? '+' : '−'} j${de(Math.abs(gm.X), 0)} Ω` });
    if (!live) return;
    if (Math.abs(v.f / f0 - 1) < 0.01) g.reach('find');
    if (Math.abs(f0 / target - 1) < 0.015) g.reach('tune');
  }
  run();
  live = true;
}
