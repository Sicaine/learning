// Drehstrom-Labor: drei Sinusspannungen (120°), Zeigerbild, Stern/Dreieck, Neutralleiterstrom bei Schieflast.
// params: { R?: Ω (Last je Strang, Standard 23 Ω) }
import { timePlot } from '../../../assets/js/vizkit/plot.js';
import { phasor } from '../../../assets/js/vizkit/phasor.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { fmt } from '../../../assets/js/vizkit/si.js';
import { h } from '../../../assets/js/vizkit/base.js';

const cx = (re, im) => ({ re, im });
const add = (a, b) => cx(a.re + b.re, a.im + b.im);
const sub = (a, b) => cx(a.re - b.re, a.im - b.im);
const scale = (a, k) => cx(a.re * k, a.im * k);
const abs = a => Math.hypot(a.re, a.im);
const pol = (m, deg) => cx(m * Math.cos(deg * Math.PI / 180), m * Math.sin(deg * Math.PI / 180));

export default function mount(stage, { params = {}, complete }) {
  const R0 = params.R ?? 23;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const row = h('div', { style: 'display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:12px;align-items:start' }); root.append(row);
  const ph = phasor(row, { unit: 'V', rotate: true, rps: 0.1 });
  const plotBox = h('div'); row.append(plotBox);
  const tp = timePlot(plotBox, { h: 300, legend: true, x: { min: 0, max: 0.02 } });
  ph.loop.controls(root, { speeds: [[1, '1×'], [0.25, '¼×'], [0, 'Stopp']] });
  const ui = controls(root, [
    { id: 'U', label: 'Strangspannung U_Str', unit: 'V', min: 100, max: 400, step: 1, value: 230, digits: 3 },
    { id: 'mode', type: 'seg', label: 'Last', options: [['star', 'Stern (mit N)'], ['delta', 'Dreieck']], value: 'star' },
    { id: 'asym', label: 'Schieflast (L1 mehr belastet)', unit: '%', min: 0, max: 100, step: 5, value: 0, format: v => Math.round(v) + ' %' },
  ], run);
  const out = readout(root, [
    { id: 'UL', label: 'Außenleiterspannung U_L', hl: true }, { id: 'IL', label: 'Leiterstrom (max)' },
    { id: 'IN', label: 'Neutralleiterstrom I_N', hl: true }, { id: 'P', label: 'Gesamtleistung P' },
  ]);
  const g = goals(root, [
    { id: 'u230', label: 'U_Str = 230 V: U_L ≈ 400 V' },
    { id: 'asym', label: 'Schieflast ≥ 50 % (Stern): I_N > 0' },
    { id: 'sym', label: 'danach wieder 0 %: I_N = 0' },
    { id: 'delta', label: 'Dreieck: P = 3 · P(Stern)' },
  ], () => complete?.());
  let pStar = null;

  function run() {
    const { U, mode, asym } = ui.values;
    const Rk = [R0 / (1 + asym / 100), R0, R0];
    const Us = [0, 1, 2].map(k => pol(U, -120 * k));
    // Zeitverlauf
    const N = 400, ts = new Float64Array(N), y = [0, 1, 2].map(() => new Float64Array(N)), sum = new Float64Array(N);
    for (let i = 0; i < N; i++) {
      const t = 0.02 * i / (N - 1); ts[i] = t;
      for (let k = 0; k < 3; k++) y[k][i] = U * Math.SQRT2 * Math.sin(2 * Math.PI * 50 * t - k * 2 * Math.PI / 3);
      sum[i] = y[0][i] + y[1][i] + y[2][i];
    }
    const cols = ['var(--warn)', 'var(--ink)', 'var(--muted)'];   // L1 braun-ish, L2 schwarz, L3 grau
    tp.line('u1', ts, y[0], { color: cols[0], label: 'u₁ (L1)', width: 2.4 });
    tp.line('u2', ts, y[1], { color: cols[1], label: 'u₂ (L2)', width: 2.4 });
    tp.line('u3', ts, y[2], { color: cols[2], label: 'u₃ (L3)', width: 2.4 });
    tp.line('s', ts, sum, { color: 'var(--bad)', dash: '6 4', label: 'u₁+u₂+u₃', width: 2 });
    tp.range({ y: [-U * Math.SQRT2 * 1.15, U * Math.SQRT2 * 1.15] });
    ph.set([
      { id: 'U1', mag: U, phase: 0, label: 'U₁', color: cols[0] },
      { id: 'U2', mag: U, phase: -120, label: 'U₂', color: cols[1] },
      { id: 'U3', mag: U, phase: -240, label: 'U₃', color: cols[2] },
      { id: 'U12', mag: U * Math.sqrt(3), phase: 30 - 0, label: 'U₁₂', color: 'var(--accent)', from: 'U2' },
    ]);
    // Rechnung
    let I, IN = cx(0, 0), P = 0, UL = U * Math.sqrt(3), IL;
    if (mode === 'star') {
      I = Us.map((u, k) => scale(u, 1 / Rk[k]));
      IN = scale(add(add(I[0], I[1]), I[2]), -1);
      P = Us.reduce((s, u, k) => s + (U * U) / Rk[k], 0);
      IL = I.map(abs);
    } else {
      const Ub = [sub(Us[0], Us[1]), sub(Us[1], Us[2]), sub(Us[2], Us[0])];
      const Ist = Ub.map((u, k) => scale(u, 1 / Rk[k]));
      I = [sub(Ist[0], Ist[2]), sub(Ist[1], Ist[0]), sub(Ist[2], Ist[1])];
      P = Ub.reduce((s, u, k) => s + (abs(u) ** 2) / Rk[k], 0);
      IL = I.map(abs);
    }
    out.set({ UL: fmt(UL, 'V'), IL: fmt(Math.max(...IL), 'A'), IN: mode === 'star' ? fmt(abs(IN), 'A') : '– (kein N)', P: fmt(P, 'W') });
    if (Math.abs(U - 230) < 3 && Math.abs(UL - 400) < 6) g.reach('u230');
    if (mode === 'star' && asym >= 50 && abs(IN) > 1) g.reach('asym');
    if (g.has('asym') && mode === 'star' && asym === 0) g.reach('sym');
    if (asym === 0) {
      if (mode === 'star') pStar = { U, P };
      else if (pStar && Math.abs(pStar.U - U) < 1e-9 && Math.abs(P / pStar.P - 3) < 0.02) g.reach('delta');
    }
  }
  run();
}
