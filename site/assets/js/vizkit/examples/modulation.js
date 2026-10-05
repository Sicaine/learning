// Amplituden- und Frequenzmodulation: Träger, Modulationsgrad bzw. Hub, Zeitsignal und Spektrum (Seitenbänder).
// params: { mode?: 'am' | 'fm' } — Ziel (AM): Modulationsgrad über 100 % erzeugen (Übermodulation) und danach unter 80 % bleiben.
// Einbinden: export { default } from '../../../assets/js/vizkit/examples/modulation.js';
import { timePlot, spectrum } from '../plot.js';
import { controls, readout, goals } from '../controls.js';
import { fmt } from '../si.js';
import { h } from '../base.js';

const J = (n, x) => { let s = 0; for (let k = 0; k < 40; k++) { let t = (k % 2 ? -1 : 1) * (x / 2) ** (2 * k + n); let f = 1; for (let i = 2; i <= k; i++) f *= i; let g = 1; for (let i = 2; i <= k + n; i++) g *= i; s += t / (f * g); } return s; };   // Bessel J_n(x)

export default function mount(stage, { params = {}, complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const tp = timePlot(root, { h: 250, legend: true, y: { min: -2.5, max: 2.5 } });
  const sp = spectrum(root, { h: 220, fmin: 0, unit: 'V' });
  const ui = controls(root, [
    { id: 'mode', type: 'seg', options: [['am', 'AM'], ['fm', 'FM']], value: params.mode ?? 'am' },
    { id: 'fc', label: 'Trägerfrequenz f_T', unit: 'Hz', min: 5e3, max: 50e3, step: 1e3, value: 20e3 },
    { id: 'fm', label: 'Modulationsfrequenz f_M', unit: 'Hz', min: 500, max: 5e3, step: 100, value: 2e3 },
    { id: 'depth', label: 'Modulationsgrad m / Hub-Index β', min: 0, max: 2.5, step: 0.05, value: 0.5, digits: 2, format: v => v.toFixed(2).replace('.', ',') },
  ], run);
  const out = readout(root, [{ id: 'bw', label: 'Bandbreite', hl: true }, { id: 'p', label: 'Seitenbandleistung / Gesamt' }, { id: 'mode', label: 'Zustand' }]);
  const g = goals(root, [{ id: 'over', label: 'AM übermodulieren (m > 1)' }, { id: 'ok', label: 'danach m ≤ 0,8 einstellen' }], () => complete?.());
  function run() {
    const { mode, fc, fm, depth } = ui.values, N = 800, T = 6 / fm;
    const ts = new Float64Array(N), us = new Float64Array(N), env = new Float64Array(N), en2 = new Float64Array(N);
    for (let i = 0; i < N; i++) {
      const t = T * i / (N - 1); ts[i] = t;
      if (mode === 'am') { const m = Math.sin(2 * Math.PI * fm * t); us[i] = (1 + depth * m) * Math.sin(2 * Math.PI * fc * t) * 1; env[i] = 1 + depth * m; en2[i] = -(1 + depth * m); }
      else { us[i] = Math.sin(2 * Math.PI * fc * t - depth * Math.cos(2 * Math.PI * fm * t)); env[i] = 1; en2[i] = -1; }
    }
    tp.line('u', ts, us, { color: 'var(--accent)', width: 1.4, label: 'Sendesignal u(t)' });
    if (mode === 'am') { tp.line('e1', ts, env, { color: 'var(--accent-2)', dash: '5 4', width: 1.6, label: 'Hüllkurve', hover: false }); tp.line('e2', ts, en2, { color: 'var(--accent-2)', dash: '5 4', width: 1.6, hover: false }); }
    else { tp.remove('e1'); tp.remove('e2'); }
    const fs = [], as = [];
    if (mode === 'am') { fs.push(fc, fc - fm, fc + fm); as.push(1, depth / 2, depth / 2); }
    else for (let n = -4; n <= 4; n++) { const a = Math.abs(J(Math.abs(n), depth)); if (a > 0.01) { fs.push(fc + n * fm); as.push(a); } }
    sp.set(fs, as); sp.range({ x: [Math.max(0, fc - 5.5 * fm), fc + 5.5 * fm] });
    const tot = as.reduce((a, b) => a + b * b, 0), car = mode === 'am' ? 1 : J(0, depth) ** 2, side = mode === 'am' ? tot - 1 : tot - car;
    out.set({ bw: fmt(mode === 'am' ? 2 * fm : 2 * (depth + 1) * fm, 'Hz'), p: (side / tot * 100).toFixed(0) + ' %', mode: mode === 'am' ? (depth > 1 ? 'übermoduliert!' : 'ok') : 'konstante Hüllkurve' });
    if (mode === 'am' && depth > 1) g.reach('over');
    if (mode === 'am' && g.has('over') && depth <= 0.8) g.reach('ok');
  }
  run();
}
