// Rauschlabor (L61): thermisches Rauschen P_N = k·T·B·F, SNR, Shannon-Hartley-Kapazität.
// params: { goalRate?: 10000 (bit/s), maxB?: 3000 (Hz) }
import { plot } from '../../../assets/js/vizkit/plot.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { fmt, logspace } from '../../../assets/js/vizkit/si.js';
import { h } from '../../../assets/js/vizkit/base.js';
import { comma, gauss } from './_9-helper.js';

const K = 1.380649e-23;
const B_LIST = [100, 200, 300, 500, 1000, 1500, 2000, 2400, 2700, 3000, 6000, 12500, 25000, 50000, 100e3, 500e3, 1e6, 3e6, 10e6];

export default function mount(stage, { params = {}, complete }) {
  const goalRate = params.goalRate ?? 10000, maxB = params.maxB ?? 3000;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const tp = plot(root, { h: 220, x: { unit: 's', label: 't', format: v => comma(v * 1000, 1) + ' ms' }, y: { unit: '', min: -3, max: 3, ticks: [-2, -1, 0, 1, 2] }, legend: true, cursor: false, ml: 44 });
  const cp = plot(root, { h: 210, x: { scale: 'log', unit: 'Hz', label: 'Bandbreite B', min: 100, max: 1e7 }, y: { scale: 'log', unit: 'bit/s', min: 10, max: 1e8 }, legend: true, cursor: true, ml: 74 });
  let seed = 11, noise = gauss(900, seed);
  const ui = controls(root, [
    { id: 'B', label: 'Bandbreite B', min: 100, max: 1e7, values: B_LIST, scale: 'log', value: 12500, format: v => fmt(v, 'Hz') },
    { id: 'T', label: 'Temperatur T', unit: 'K', min: 100, max: 500, step: 10, value: 290, format: v => v + ' K' },
    { id: 'F', label: 'Rauschzahl F (Empfänger)', min: 0, max: 20, step: 1, value: 0, format: v => v + ' dB' },
    { id: 'PS', label: 'Signalleistung P_S', min: -150, max: -80, step: 1, value: -135, format: v => v + ' dBm' },
    { id: 'new', type: 'button', label: 'Neues Rauschen', onClick: () => { seed += 1; noise = gauss(900, seed); run(); } },
  ], run);
  const out = readout(root, [
    { id: 'pn', label: 'Rauschleistung P_N', hl: true }, { id: 'snr', label: 'SNR', hl: true }, { id: 'c', label: 'Shannon C' }, { id: 'n0', label: 'Rauschleistungsdichte' }]);
  const g = goals(root, [
    { id: 'read', label: 'B = 2,4 kHz, T = 290 K, F = 0 dB: P_N = −140,2 dBm ablesen' },
    { id: 'rate', label: `Mit B ≤ ${fmt(maxB, 'Hz')} sind ${fmt(goalRate, 'bit/s')} möglich (C ≥ Ziel)` },
  ], () => complete?.());
  function run() {
    const { B, T, F, PS } = ui.values, nf = 10 ** (F / 10);
    const pn = K * T * B * nf, pnDbm = 10 * Math.log10(pn / 1e-3), snrDb = PS - pnDbm, snr = 10 ** (snrDb / 10);
    const C = B * Math.log2(1 + snr);
    out.set({ pn: comma(pnDbm, 1) + ' dBm', snr: comma(snrDb, 1) + ' dB', c: fmt(C, 'bit/s'), n0: comma(10 * Math.log10(K * T * nf / 1e-3), 1) + ' dBm/Hz' });
    // Zeitverlauf: Sinus mit Amplitude 1, Rauschen mit Effektivwert σ = 1/√2 · 10^(−SNR/20)
    const N = 900, ts = new Float64Array(N), ys = new Float64Array(N), sg = new Float64Array(N), sigma = Math.SQRT1_2 * 10 ** (-snrDb / 20);
    for (let i = 0; i < N; i++) { ts[i] = 3e-3 * i / (N - 1); sg[i] = Math.sin(2 * Math.PI * 1000 * ts[i]); ys[i] = sg[i] + sigma * noise[i]; }
    tp.line('n', ts, ys, { color: 'var(--accent-2)', width: 1.2, label: 'Signal + Rauschen', hover: false });
    tp.line('s', ts, sg, { color: 'var(--accent)', width: 2.2, label: 'reines Signal (1 kHz)', hover: false });
    // C(B) bei konstanter Signalleistung
    const bs = logspace(100, 1e7, 100), cs = bs.map(b => b * Math.log2(1 + 10 ** (PS / 10) * 1e-3 / (K * T * nf * b)));
    cp.line('c', bs, cs, { color: 'var(--accent)', width: 2.4, label: 'C(B) bei dieser Signalleistung' });
    cp.hline('goal', goalRate, { color: 'var(--good)', dash: '4 4', label: fmt(goalRate, 'bit/s') });
    cp.marker('now', B, Math.max(C, 10), { label: 'jetzt' });
    if (Math.abs(B - 2400) < 1 && T === 290 && F === 0 && Math.abs(pnDbm + 140.2) < 0.15) g.reach('read');
    if (B <= maxB && C >= goalRate) g.reach('rate');
  }
  run();
}
