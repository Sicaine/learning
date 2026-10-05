// Modulations-Labor (L56): AM, DSB, SSB, FM — Zeitverlauf (Träger zur Anschauung stark herabgesetzt), Spektrum mit Seitenbändern, Bandbreite.
// params: { fT?: 7.1e6 (Hz, Träger — nur für die Frequenzangaben), secret?: false }
// Ziele: Übermodulation (m > 100 %) erzeugen; FM mit Hub 3 kHz und f_mod 3 kHz → Bandbreite 12 kHz; SSB einstellen.
import { timePlot, spectrum } from '../../../assets/js/vizkit/plot.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { fmt } from '../../../assets/js/vizkit/si.js';
import { h } from '../../../assets/js/vizkit/base.js';
import { comma } from './_9-helper.js';

const TAU = 2 * Math.PI;
function bessel(n, x) {   // J_n(x) = 1/π ∫₀^π cos(nτ − x sin τ) dτ
  const N = 360; let s = 0; for (let k = 0; k < N; k++) { const t = Math.PI * (k + 0.5) / N; s += Math.cos(n * t - x * Math.sin(t)); } return s / N;
}

export default function mount(stage, { params = {}, complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const tp = timePlot(root, { h: 240, legend: true, cursor: false, x: { label: 't', format: v => comma(v * 1000, 1) + ' ms' }, y: { min: -2.4, max: 2.4, unit: 'V', ticks: [-2, -1, 0, 1, 2] } });
  const note = h('p', { class: 'vz-note', text: 'Zeitachse: Der Träger ist hier nur etwa 20-mal schneller als das Nutzsignal gezeichnet, in Wirklichkeit liegen Welten dazwischen.' });
  root.append(note);
  const sp = spectrum(root, { h: 230, fmin: -20e3, fmax: 20e3, unit: 'V', x: { min: -20e3, max: 20e3, format: v => (v === 0 ? 'f_T' : (v > 0 ? '+' : '−') + fmt(Math.abs(v), 'Hz')) } });
  const ui = controls(root, [
    { id: 'mode', type: 'seg', options: [['am', 'AM'], ['dsb', 'DSB (ohne Träger)'], ['ssb', 'SSB (oberes SB)'], ['fm', 'FM']], value: 'am' },
    { id: 'fmod', label: 'Frequenz f_mod', unit: 'Hz', min: 300, max: 3000, step: 100, value: 1000, format: v => fmt(v, 'Hz') },
    { id: 'm', label: 'Modulationsgrad m', min: 0, max: 1.5, step: 0.05, value: 0.5, format: v => Math.round(v * 100) + ' %' },
    { id: 'df', label: 'Hub Δf (FM)', min: 500, max: 15000, step: 500, value: 3000, format: v => comma(v / 1000, 1) + ' kHz' },
    { id: 'fT', label: 'Träger f_T', min: 1e5, max: 1e7, value: params.fT ?? 7.1e6, scale: 'log', format: v => fmt(v, 'Hz') },
  ], run);
  const out = readout(root, [
    { id: 'bw', label: 'Bandbreite', hl: true }, { id: 'pw', label: 'Sendeleistung / P_T (AM, m = 0)' }, { id: 'info', label: 'Zustand' }, { id: 'freqs', label: 'Frequenzen' }]);
  const g = goals(root, [
    { id: 'over', label: 'AM übermodulieren (m > 100 %)' },
    { id: 'fm12', label: 'FM: Δf = 3 kHz, f_mod = 3 kHz → B = 12 kHz' },
    { id: 'ssb', label: 'SSB einstellen: nur ein Seitenband bleibt' },
  ], () => complete?.());

  function run() {
    const { mode, fmod, m, df, fT } = ui.values, N = 900, T = 2 / fmod, FC = 20 * fmod;   // gezeichneter Träger
    const ts = new Float64Array(N), u = new Float64Array(N), e1 = new Float64Array(N), e2 = new Float64Array(N);
    const beta = df / fmod, betaD = 2 + 8 * df / 15000;
    for (let i = 0; i < N; i++) {
      const t = T * i / (N - 1); ts[i] = t; const c = Math.cos(TAU * FC * t), a = Math.cos(TAU * fmod * t);
      if (mode === 'am') { u[i] = (1 + m * a) * c; e1[i] = 1 + m * a; }
      else if (mode === 'dsb') { u[i] = m * a * c; e1[i] = m * a; }
      else if (mode === 'ssb') { u[i] = (m / 2) * Math.cos(TAU * (FC + fmod) * t); e1[i] = m / 2; }
      else { u[i] = Math.cos(TAU * FC * t + betaD * Math.sin(TAU * fmod * t)); e1[i] = 1; }
      e2[i] = -e1[i];
    }
    tp.line('u', ts, u, { color: 'var(--accent)', width: 1.3, label: 'Sendesignal u(t)', hover: false });
    if (mode === 'am' || mode === 'dsb') { tp.line('e1', ts, e1, { color: 'var(--accent-2)', dash: '5 4', width: 1.6, label: 'Hüllkurve', hover: false }); tp.line('e2', ts, e2, { color: 'var(--accent-2)', dash: '5 4', width: 1.6, hover: false }); }
    else { tp.remove('e1'); tp.remove('e2'); }
    // Spektrum
    let fs = [], as = [], bw, power, info, freqs;
    if (mode === 'am') { fs = [0, -fmod, fmod]; as = [1, m / 2, m / 2]; bw = 2 * fmod; power = 1 + m * m / 2; info = m > 1 ? 'übermoduliert! (Verzerrung, Splatter)' : (m === 1 ? 'volle Aussteuerung' : 'ok'); freqs = fmt(fT - fmod, 'Hz', 5) + ' … ' + fmt(fT + fmod, 'Hz', 5); }
    else if (mode === 'dsb') { fs = [-fmod, fmod]; as = [m / 2, m / 2]; bw = 2 * fmod; power = m * m / 2; info = 'Träger unterdrückt'; freqs = 'USB/LSB bei f_T ± ' + fmt(fmod, 'Hz'); }
    else if (mode === 'ssb') { fs = [fmod]; as = [m / 2]; bw = fmod; power = m * m / 4; info = 'ein Seitenband, kein Träger'; freqs = 'USB: ' + fmt(fT + fmod, 'Hz', 5); }
    else {
      const nmax = Math.min(40, Math.ceil(beta + 3));
      for (let n = -nmax; n <= nmax; n++) { const a = Math.abs(bessel(Math.abs(n), beta)); if (a > 0.015) { fs.push(n * fmod); as.push(a); } }
      bw = 2 * (df + fmod); power = 1; info = 'konstante Hüllkurve, β = ' + comma(beta, 2); freqs = 'f_T ± ' + fmt(df, 'Hz') + ' Hub';
    }
    const span = Math.max(mode === 'fm' ? bw * 0.65 : 2.6 * fmod, 6e3);
    sp.set(fs, as, { labels: (x, y) => comma(y, 2), labelMin: 0.04 }); sp.range({ x: [-span, span], y: [0, Math.max(...as, 0.1) * 1.2] });
    out.set({ bw: fmt(bw, 'Hz'), pw: comma(power, 2) + ' ×', info, freqs });
    if (mode === 'am' && m > 1) g.reach('over');
    if (mode === 'fm' && Math.abs(df - 3000) < 1 && Math.abs(fmod - 3000) < 1) g.reach('fm12');
    if (mode === 'ssb') g.reach('ssb');
  }
  run();
}
