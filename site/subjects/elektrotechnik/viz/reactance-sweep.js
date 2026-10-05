// Blindwiderstand-Labor: X_L(f) und X_C(f) auf logarithmischen Achsen, dazu Strom und Spannung im Zeitbereich.
// params: { U?: Effektivspannung in V (Standard 10), L?: H, C?: F, f?: Hz (Startwerte), goals?: ['below','res','above'] }
// Ziel: je einmal unterhalb von f₀/2 (C dominiert), bei f₀ (X_L = X_C, ±3 %) und oberhalb von 2·f₀ (L dominiert) messen.
import { plot } from '../../../assets/js/vizkit/plot.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { fmt, logspace, linspace } from '../../../assets/js/vizkit/si.js';
import { h } from '../../../assets/js/vizkit/base.js';

const tex = r => { if (r >= 1e4 || r < 1e-3) { const e = Math.floor(Math.log10(r)); return (r / 10 ** e).toFixed(1).replace('.', '{,}') + '\\cdot 10^{' + e + '}'; } return String(+r.toPrecision(3)).replace('.', '{,}'); };

export default function mount(stage, { params = {}, complete, md }) {
  const U = params.U ?? 10;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const fs = logspace(1, 1e9, 240);

  const pf = plot(root, {
    x: { scale: 'log', unit: 'Hz', min: 1, max: 1e9, label: 'f' },
    y: { scale: 'log', unit: 'Ω', min: 1e-2, max: 1e8, label: 'Blindwiderstand X' },
    legend: true,
  });
  const pt = plot(root, {
    x: { unit: '', min: 0, max: 2, label: 't / T', ticks: [0, 0.5, 1, 1.5, 2] },
    y: { unit: '', min: -1.3, max: 1.3, label: 'normiert (û = 1)', ticks: [-1, -0.5, 0, 0.5, 1] },
    legend: true, h: 200,
  });
  const ts = linspace(0, 2, 241), TAU = 2 * Math.PI;
  pt.line('u', ts, ts.map(t => Math.sin(TAU * t)), { color: 'var(--ink-2)', label: 'Spannung u' });

  const ui = controls(root, [
    { id: 'L', label: 'Induktivität L', unit: 'H', min: 1e-9, max: 1, value: params.L ?? 10e-6, scale: 'log', snap: 'E12' },
    { id: 'C', label: 'Kapazität C', unit: 'F', min: 1e-12, max: 1e-3, value: params.C ?? 100e-12, scale: 'log', snap: 'E12' },
    { id: 'f', label: 'Frequenz f', unit: 'Hz', min: 1, max: 1e9, value: params.f ?? 1e6, scale: 'log' },
    { id: 'show', type: 'seg', options: [['both', 'C und L'], ['C', 'nur Kondensator'], ['L', 'nur Spule']], value: 'both' },
    { type: 'presets', items: [
      { label: '7,1 MHz: 10 µH / 100 pF', values: { L: 10e-6, C: 100e-12, f: 7.1e6 } },
      { label: '50 Hz: 100 mH / 1 µF', values: { L: 0.1, C: 1e-6, f: 50 } },
    ], reset: true },
  ], run);
  const out = readout(root, [
    { id: 'xl', label: 'X_L = ωL', unit: 'Ω', hl: true }, { id: 'xc', label: 'X_C = 1/(ωC)', unit: 'Ω', hl: true },
    { id: 'il', label: `I_L bei ${fmt(U, 'V')}`, unit: 'A' }, { id: 'ic', label: `I_C bei ${fmt(U, 'V')}`, unit: 'A' },
    { id: 'f0', label: 'f₀ (X_L = X_C)', unit: 'Hz' },
  ]);
  const note = h('p', { class: 'vz-note' }); root.append(note);
  const want = params.goals ?? ['below', 'res', 'above'];
  const defs = { below: 'Unter f₀/2 messen (X_C > X_L)', res: 'Bei f₀ messen: X_L = X_C (±3 %)', above: 'Über 2·f₀ messen (X_L > X_C)' };
  const g = goals(root, want.map(id => ({ id, label: defs[id] })), () => complete?.());

  function run() {
    const { L, C, f, show } = ui.values, w = TAU * f, XL = w * L, XC = 1 / (w * C), f0 = 1 / (TAU * Math.sqrt(L * C));
    pf.line('xl', fs, fs.map(x => TAU * x * L), { color: 'var(--accent)', label: 'X_L = ωL (steigt)' });
    pf.line('xc', fs, fs.map(x => 1 / (TAU * x * C)), { color: 'var(--warn)', label: 'X_C = 1/ωC (fällt)' });
    pf.vline('f', f, { color: 'var(--ink-2)', label: fmt(f, 'Hz') });
    pf.vline('f0', f0, { color: 'var(--accent-2)', label: 'f₀', dash: '2 4' });
    pf.marker('ml', f, XL, { color: 'var(--accent)' });
    pf.marker('mc', f, XC, { color: 'var(--warn)' });
    // Zeitbereich: Strom am Kondensator eilt vor (+90°), an der Spule nach (−90°)
    pt.remove('ic'); pt.remove('il');
    if (show !== 'L') pt.line('ic', ts, ts.map(t => Math.sin(TAU * t + Math.PI / 2)), { color: 'var(--warn)', label: 'Strom i_C (eilt vor)' });
    if (show !== 'C') pt.line('il', ts, ts.map(t => Math.sin(TAU * t - Math.PI / 2)), { color: 'var(--accent)', label: 'Strom i_L (eilt nach)' });
    pt.range({ x: [0, 2], y: [-1.3, 1.3] });
    out.set({ xl: XL, xc: XC, il: U / XL, ic: U / XC, f0 });
    const r = (f / f0) ** 2;
    note.innerHTML = md ? md(`Aktuell überwiegt **${XL > XC ? 'X_L: die Schaltung verhält sich induktiv' : 'X_C: die Schaltung verhält sich kapazitiv'}**. Es gilt $X_L/X_C = \\omega^2 LC = (f/f_0)^2 = ${tex(r)}$.`) : '';
    if (f <= f0 / 2) g.reach('below');
    if (Math.abs(XL / XC - 1) < 0.06) g.reach('res');   // ±3 % in f ↔ ±6 % in X_L/X_C
    if (f >= f0 * 2) g.reach('above');
  }
  run();
}
