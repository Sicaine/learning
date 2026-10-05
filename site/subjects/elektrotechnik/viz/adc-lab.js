// ADC-Labor (L48): Abtasten, Quantisieren, Rekonstruieren, Aliasing.
// Signal: Sinus mit Amplitude U_ref/2 um U_ref/2 (unipolar). Code = round(u/LSB), LSB = U_ref/2ⁿ.
// params: { fTarget?: 5000 (Hz), lsbGoal?: 0.005 (V) }
import { plot } from '../../../assets/js/vizkit/plot.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { fmt } from '../../../assets/js/vizkit/si.js';
import { h } from '../../../assets/js/vizkit/base.js';

const F_LIST = [10, 20, 50, 100, 200, 500, 1000, 1500, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 10000, 12000, 15000, 20000];
const FS_LIST = [1000, 2000, 4000, 5000, 6000, 8000, 10000, 11025, 12000, 16000, 22050, 24000, 32000, 44100, 48000];
const sinc = x => Math.abs(x) < 1e-9 ? 1 : Math.sin(Math.PI * x) / (Math.PI * x);

export default function mount(stage, { params = {}, complete, md }) {
  const fT = params.fTarget ?? 5000, lsbGoal = params.lsbGoal ?? 0.005;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const pBox = h('div'); root.append(pBox);
  const pl = plot(pBox, { h: 300, x: { unit: 's', label: 't' }, y: { unit: 'V', label: 'Spannung', min: 0 }, legend: true, cursor: false });

  const ui = controls(root, [
    { id: 'f', label: 'Signalfrequenz f', unit: 'Hz', min: 10, max: 20000, value: 1000, values: F_LIST, scale: 'log' },
    { id: 'fs', label: 'Abtastrate f_s', unit: 'Hz', min: 1000, max: 48000, value: 8000, values: FS_LIST, scale: 'log' },
    { id: 'bits', label: 'Auflösung n', unit: 'bit', min: 1, max: 16, value: 3, step: 1, format: v => v + ' bit' },
    { id: 'uref', type: 'seg', label: 'U_ref', options: [[1.8, '1,8 V'], [3.3, '3,3 V'], [5, '5 V']], value: 5 },
    { id: 'rec', type: 'seg', label: 'Ausgabe', options: [['hold', 'Treppe (DA-Wandler)'], ['smooth', 'glatt (Rekonstruktionsfilter)']], value: 'hold' },
    { type: 'presets', items: [
      { label: 'sauber: 5 kHz, 48 kHz', values: { f: 5000, fs: 48000, bits: 8 } },
      { label: 'Aliasing: 7 kHz mit 10 kHz', values: { f: 7000, fs: 10000, bits: 8 } },
      { label: 'grobe Quantisierung', values: { f: 1000, fs: 48000, bits: 3 } }], reset: true },
  ], run);
  const out = readout(root, [
    { id: 'lsb', label: 'LSB = U_ref/2ⁿ', hl: true }, { id: 'steps', label: 'Stufen 2ⁿ' }, { id: 'nyq', label: 'Nyquist f_s/2' },
    { id: 'alias', label: 'Erscheinungsfrequenz' }, { id: 'snr', label: 'SNR ≈ 6,02·n + 1,76 dB' }]);
  const note = h('p', { class: 'vz-note' }); root.append(note);
  const g = goals(root, [
    { id: 'ok', label: `${fmt(fT, 'Hz')}-Signal korrekt abbilden (f_s > 2·f)` },
    { id: 'lsb', label: `Auflösung: LSB unter ${fmt(lsbGoal, 'V')}` },
    { id: 'alias', label: `Aliasing auslösen (f_s < 2·f) mit ${fmt(fT, 'Hz')}` },
  ], () => complete?.());

  function run() {
    const v = ui.values, f = v.f, fs = v.fs, n = v.bits, U = v.uref, lsb = U / 2 ** n, top = 2 ** n - 1;
    const Tw = Math.min(64 / fs, Math.max(4 / f, 10 / fs));
    const sig = t => U / 2 * (1 + Math.sin(2 * Math.PI * f * t));
    const q = x => Math.max(0, Math.min(top, Math.round(x / lsb))) * lsb;
    const N0 = -20, N1 = Math.ceil(Tw * fs) + 20, samples = [];
    for (let k = N0; k <= N1; k++) samples.push(q(sig(k / fs)));
    // Originalkurve
    const M = 1200, ts = new Float64Array(M + 1), orig = new Float64Array(M + 1), rec = new Float64Array(M + 1);
    for (let i = 0; i <= M; i++) {
      const t = Tw * i / M; ts[i] = t; orig[i] = sig(t);
      if (v.rec === 'smooth') { let sum = 0; for (let k = N0; k <= N1; k++) sum += samples[k - N0] * sinc(t * fs - k); rec[i] = sum; }
      else rec[i] = samples[Math.floor(t * fs + 1e-9) - N0];
    }
    const kk = []; const sx = [], sy = [];
    for (let k = 0; k * 1 <= Tw * fs + 1e-9; k++) { sx.push(k / fs); sy.push(samples[k - N0]); }
    pl.range({ x: [0, Tw], y: [0, U * 1.08] });
    pl.line('o', ts, orig, { color: 'var(--muted)', label: 'Eingangssignal', width: 1.5, dash: '5 4' });
    pl.line('r', ts, rec, { color: 'var(--accent)', label: v.rec === 'smooth' ? 'rekonstruiert (glatt)' : 'Ausgabe nach D/A (Treppe)', width: 2.2, step: v.rec === 'hold' });
    pl.bars('s', sx, sy, { color: 'var(--accent-2)', barWidth: 2, opacity: 0.8 });
    const fr = Math.abs(f - Math.round(f / fs) * fs), aliased = f >= fs / 2 - 1e-9;
    out.set({ lsb: fmt(lsb, 'V', 3), steps: String(2 ** n), nyq: fmt(fs / 2, 'Hz'), alias: aliased ? fmt(fr, 'Hz') + ' (falsch!)' : fmt(f, 'Hz') + ' (richtig)', snr: (6.02 * n + 1.76).toFixed(1).replace('.', ',') + ' dB' });
    note.innerHTML = md(aliased
      ? `$f = ${fmt(f, 'Hz')} \\ge f_s/2 = ${fmt(fs / 2, 'Hz')}$: Das Abtasttheorem ist verletzt. Aus den Abtastwerten rekonstruiert man ein Signal mit $|f_s - f| = ${fmt(fr, 'Hz')}$ — das Original ist nicht mehr zu erkennen (Aliasing).`
      : `$f_s = ${fmt(fs, 'Hz')} > 2f = ${fmt(2 * f, 'Hz')}$ ✓. Der Rest ist Quantisierungsfehler: höchstens $\\pm\\,\\text{LSB}/2 = \\pm ${fmt(lsb / 2, 'V', 3)}$.`);
    if (Math.abs(f - fT) < 1 && fs > 2 * f) g.reach('ok');
    if (lsb < lsbGoal) g.reach('lsb');
    if (Math.abs(f - fT) < 1 && fs < 2 * f) g.reach('alias');
  }
  run();
}
