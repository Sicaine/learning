// Waveform-Lab (D24): Signalform wählen, Mittelwert, Gleichrichtwert, Effektivwert, Form- und Scheitelfaktor ablesen.
// params: { shape?: Startform, amp?: Û, duty?: Tastverhältnis 0..1, goals?: false | 'pwm' (Standard) }
//   Ziel 'pwm': (1) Puls 0/10 V mit 20 % einstellen, (2) mit 10 V Pulshöhe den Effektivwert 5 V erreichen (→ 25 %).
//   Zielwerte änderbar: params.targetAmp (10), targetDuty (0.2), targetU (5).
import { plot } from '../../../assets/js/vizkit/plot.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { fmt } from '../../../assets/js/vizkit/si.js';
import { h } from '../../../assets/js/vizkit/base.js';

const SHAPES = [['sine', 'Sinus'], ['tri', 'Dreieck'], ['saw', 'Sägezahn'], ['square', 'Rechteck ±Û'], ['pulse', 'Puls 0…Û (PWM)']];
// Augenblickswert innerhalb einer Periode, p ∈ [0, 1)
function u(shape, A, D, O, p) {
  switch (shape) {
    case 'sine': return O + A * Math.sin(2 * Math.PI * p);
    case 'tri': return O + A * (p < 0.25 ? 4 * p : p < 0.75 ? 2 - 4 * p : 4 * p - 4);
    case 'saw': return O + A * (2 * p - 1);
    case 'square': return O + (p < D ? A : -A);
    default: return O + (p < D ? A : 0);
  }
}
/** Mittelwert, Gleichrichtwert, Effektivwert, Spitzenwert über eine Periode (Mittelpunktsregel, N Stützstellen) */
export function stats(shape, A, D, O, N = 4000) {
  let s = 0, sa = 0, sq = 0, pk = 0;
  for (let k = 0; k < N; k++) { const v = u(shape, A, D, O, (k + 0.5) / N); s += v; sa += Math.abs(v); sq += v * v; pk = Math.max(pk, Math.abs(v)); }
  let mean = s / N; if (Math.abs(mean) < 1e-9 * (pk + 1)) mean = 0;
  const rect = sa / N, rms = Math.sqrt(sq / N);
  return { mean, rect, rms, peak: pk, F: rect > 1e-9 ? rms / rect : NaN, ks: rms > 1e-9 ? pk / rms : NaN };
}
function curve(shape, A, D, O, periods = 3) {
  const xs = [], ys = [], push = (x, y) => { xs.push(x); ys.push(y); };
  for (let k = 0; k < periods; k++) {
    if (shape === 'sine') for (let i = 0; i < 100; i++) push(k + i / 100, u(shape, A, D, O, i / 100));
    else if (shape === 'tri') [[0, 0], [0.25, 1], [0.75, -1], [1, 0]].forEach(([p, v]) => push(k + p, O + A * v));
    else if (shape === 'saw') [[0, -1], [1, 1]].forEach(([p, v]) => { push(k + p, O + A * v); if (p === 1) push(k + 1, O - A); });
    else { const hi = O + A, lo = shape === 'square' ? O - A : O; [[0, hi], [D, hi], [D, lo], [1, lo], [1, hi]].forEach(([p, v]) => push(k + p, v)); }
  }
  if (shape === 'sine') push(periods, O); else if (shape === 'tri') { /* schon bis 1 */ }
  return [xs, ys];
}
const nice = v => { const e = 10 ** Math.floor(Math.log10(v)), f = v / e; return ([1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10].find(x => f <= x + 1e-9)) * e; };
const dec = (x, d = 2) => (Number.isFinite(x) ? x.toFixed(d).replace('.', ',') : '–');

export default function mount(stage, { params = {}, complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const p = plot(root, { x: { label: 't / T', unit: '', min: 0, max: 3, ticks: [0, 1, 2, 3], format: v => String(v) }, y: { unit: 'V', include: [0] }, cursor: true, title: 'Signalform' });
  const ui = controls(root, [
    { id: 'shape', type: 'seg', options: SHAPES, value: params.shape ?? 'pulse' },
    { id: 'A', label: 'Pulshöhe / Spitzenwert Û', unit: 'V', min: 1, max: 20, step: 0.5, value: params.amp ?? 10, digits: 3 },
    { id: 'D', label: 'Tastverhältnis', unit: '%', min: 5, max: 95, step: 1, value: Math.round((params.duty ?? 0.2) * 100), format: v => v + ' %' },
    { id: 'O', label: 'Gleichanteil (Offset)', unit: 'V', min: -5, max: 5, step: 0.5, value: 0, digits: 3 },
    { type: 'presets', label: 'Beispiele', items: [
      { label: 'Sinus 10 V', values: { shape: 'sine', A: 10, O: 0 } },
      { label: 'Rechteck ±5 V', values: { shape: 'square', A: 5, D: 50, O: 0 } },
      { label: 'Dreieck ±6 V', values: { shape: 'tri', A: 6, O: 0 } },
      { label: 'PWM 0/10 V, 20 %', values: { shape: 'pulse', A: 10, D: 20, O: 0 } },
    ] },
  ], run);
  const dutyBox = root.querySelector('[data-id="D"]');
  const out = readout(root, [
    { id: 'mean', label: 'Mittelwert Ū (Gleichanteil)', hl: true }, { id: 'rect', label: 'Gleichrichtwert |ū|' }, { id: 'rms', label: 'Effektivwert U_eff', hl: true },
    { id: 'F', label: 'Formfaktor F = U_eff / |ū|' }, { id: 'ks', label: 'Scheitelfaktor k_s = û / U_eff' },
  ]);
  const meters = readout(root, [{ id: 'avg', label: 'Mittelwert-Multimeter (AC, auf Sinus geeicht) zeigt' }, { id: 'trms', label: 'True-RMS-Multimeter (AC) zeigt' }]);
  const useGoals = params.goals !== false;
  const tA = params.targetAmp ?? 10, tD = Math.round((params.targetDuty ?? 0.2) * 100), tU = params.targetU ?? 5;
  const g = useGoals ? goals(root, [
    { id: 'pwm', label: `PWM einstellen: 0/${fmt(tA, 'V')}, ${tD} % — Ū und U_eff ablesen` },
    { id: 'ueff', label: `Mit ${fmt(tA, 'V')} Pulshöhe U_eff = ${fmt(tU, 'V')} erreichen (±3 %)` },
  ], () => complete?.()) : null;

  function run(v) {
    const D = v.D / 100, hasDuty = v.shape === 'square' || v.shape === 'pulse';
    dutyBox.style.display = hasDuty ? '' : 'none';
    const st = stats(v.shape, v.A, D, v.O), [xs, ys] = curve(v.shape, v.A, D, v.O);
    const m = nice(Math.max(st.peak * 1.15, 1));
    if (p.series.has('u')) p.set('u', xs, ys); else p.line('u', xs, ys, { color: 'var(--accent)', width: 2.6, label: 'u(t)' });
    p.hline('mean', st.mean, { label: 'Ū', color: 'var(--accent-2)' });
    p.hline('rms', st.rms, { label: 'U_eff', color: 'var(--warn)', dash: '7 4' });
    p.range({ y: [-m, m] });
    out.set({ mean: fmt(st.mean, 'V'), rect: fmt(st.rect, 'V'), rms: fmt(st.rms, 'V'), F: dec(st.F), ks: dec(st.ks) });
    const acMean = (() => { let s = 0, N = 2000; for (let k = 0; k < N; k++) s += Math.abs(u(v.shape, v.A, D, v.O, (k + 0.5) / N) - st.mean); return s / N; })();
    const acRms = Math.sqrt(Math.max(0, st.rms ** 2 - st.mean ** 2));
    meters.set({ avg: fmt(acMean * Math.PI / (2 * Math.SQRT2), 'V'), trms: fmt(acRms, 'V') });
    if (g) {
      if (v.shape === 'pulse' && Math.abs(v.A - tA) < 0.05 && v.D === tD && v.O === 0) g.reach('pwm');
      if (v.shape === 'pulse' && Math.abs(v.A - tA) < 0.05 && v.O === 0 && Math.abs(st.rms / tU - 1) <= 0.03) g.reach('ueff');
    }
  }
  root._test = { ui };
  run(ui.values);
}
