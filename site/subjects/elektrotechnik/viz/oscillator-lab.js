// Oszillator-Labor (L41): Rückkopplungsschleife V·β, Phasenfehler, LC-Schwingkreis oder Quarz.
// Modell (je Periode): Schleifenverstärkung g = k·cos(φ). Der Schwingkreis zieht die Frequenz so, dass die Gesamtphase 0° wird:
//   f = f₀·(1 + tan φ / (2Q)).  g > 1 → Amplitude wächst, bis die Verstärkung sättigt (a² = g² − 1); g < 1 → klingt ab.
// params: { targetF?: 7.1e6 (Hz), tol?: 0.015, dT?: 30 (K, Ziel Quarz-Vergleich) }
import { plot } from '../../../assets/js/vizkit/plot.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { fmt } from '../../../assets/js/vizkit/si.js';
import { h, s } from '../../../assets/js/vizkit/base.js';

const Q_LC = 50, Q_XTAL = 40000, F_XTAL = 7.1e6;
const TC_LC = -100e-6, TC_XTAL = 0.3e-6;   // Modellwerte je Kelvin (nur zur Veranschaulichung)
const N_CYC = 500, PPC = 8;

export default function mount(stage, { params = {}, complete, md }) {
  const targetF = params.targetF ?? 7.1e6, tol = params.tol ?? 0.015, dTgoal = params.dT ?? 30;
  const root = h('div', { class: 'vz vk' }); stage.append(root);

  // Blockschaltbild der Schleife
  const diag = s('svg', { viewBox: '0 0 420 96', role: 'img', 'aria-label': 'Rückkopplungsschleife aus Verstärker V und Rückkopplungsglied β', style: 'width:100%;max-width:520px;margin:0 auto;display:block' });
  const t = (x, y, txt, o = {}) => s('text', { x, y, 'text-anchor': o.a || 'middle', style: `font:${o.w || 500} ${o.fs || 13}px var(--sans);fill:${o.c || 'var(--ink)'}` }, txt);
  diag.append(
    s('rect', { x: 40, y: 14, width: 110, height: 40, rx: 6, fill: 'var(--surface)', stroke: 'var(--ink-2)', 'stroke-width': 1.6 }), t(95, 39, 'Verstärker V'),
    s('rect', { x: 270, y: 14, width: 110, height: 40, rx: 6, fill: 'var(--surface)', stroke: 'var(--ink-2)', 'stroke-width': 1.6 }),
    s('path', { d: 'M10 34H40M150 34H270M380 34H410V78H210' + 'M210 78H10V34', fill: 'none', stroke: 'var(--ink-2)', 'stroke-width': 1.6 }),
    s('path', { d: 'M34 30l6 4-6 4zM264 30l6 4-6 4z', fill: 'var(--ink-2)' }),
    s('circle', { cx: 210, cy: 34, r: 0, fill: 'none' }));
  const lblB = t(325, 39, 'Schwingkreis β');
  const lblLoop = t(210, 92, '', { c: 'var(--accent)', w: 600 });
  diag.append(lblB, lblLoop);
  root.append(diag);

  const pBox = h('div'); root.append(pBox);
  const pl = plot(pBox, { h: 250, x: { label: 'Zeit in Perioden', unit: '', format: v => String(Math.round(v)), min: 0, max: N_CYC }, y: { label: 'Ausgangsamplitude (willk. Einh.)', unit: '', format: v => (+v.toFixed(2)).toString().replace('.', ',') }, cursor: false });

  const ui = controls(root, [
    { id: 'mode', type: 'seg', options: [['lc', 'LC-Oszillator'], ['xtal', 'Quarz 7,1 MHz']], value: 'lc' },
    { id: 'k', label: 'Schleifenverstärkung V·β', unit: '', min: 0.5, max: 5, value: 0.8, step: 0.01, digits: 3, format: v => (+v.toFixed(2)).toString().replace('.', ',') },
    { id: 'phi', label: 'Phasenfehler der Schleife φ', unit: '°', min: -30, max: 30, value: 0, step: 1, format: v => (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(v) + ' °' },
    { id: 'L', label: 'Induktivität L', unit: 'H', min: 1e-6, max: 20e-6, value: 10e-6, scale: 'log', snap: 'E24' },
    { id: 'C', label: 'Kapazität C', unit: 'F', min: 22e-12, max: 470e-12, value: 220e-12, scale: 'log', snap: 'E12' },
    { id: 'dT', label: 'Temperaturänderung ΔT', unit: 'K', min: -20, max: 60, value: 0, step: 1, format: v => (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(v) + ' K' },
    { type: 'presets', items: [{ label: 'zu wenig Verstärkung', values: { k: 0.8, phi: 0 } }, { label: 'knapp über 1', values: { k: 1.05, phi: 0 } }, { label: 'stark übersteuert', values: { k: 3, phi: 0 } }], reset: true },
  ], run);
  const el = id => ui.el.querySelector(`[data-id="${id}"]`);
  const out = readout(root, [
    { id: 'g', label: 'Schleife k·cos φ', hl: true }, { id: 'state', label: 'Zustand' }, { id: 'f0', label: 'Resonanz f₀' }, { id: 'f', label: 'Schwingfrequenz' }, { id: 'drift', label: 'Drift durch ΔT' }, { id: 'amp', label: 'Endamplitude' },
  ]);
  const note = h('p', { class: 'vz-note' }); root.append(note);
  const g = goals(root, [
    { id: 'on', label: 'Schwingung anfachen (Schleife > 1)' },
    { id: 'f', label: `LC-Oszillator auf ${fmt(targetF, 'Hz')} (± ${Math.round(tol * 1000) / 10} %)` },
    { id: 'q', label: `Quarz: Frequenz bei ΔT = ${dTgoal} K vergleichen` },
  ], () => complete?.());

  const comma = x => (+x.toFixed(2)).toString().replace('.', ',');
  function run() {
    const v = ui.values, xt = v.mode === 'xtal';
    el('L').style.display = el('C').style.display = xt ? 'none' : '';
    const Q = xt ? Q_XTAL : Q_LC, f0n = xt ? F_XTAL : 1 / (2 * Math.PI * Math.sqrt(v.L * v.C));
    const f0 = f0n * (1 + (xt ? TC_XTAL : TC_LC) * v.dT);
    const ph = v.phi * Math.PI / 180, gl = v.k * Math.cos(ph);
    const f = f0 * (1 + Math.tan(ph) / (2 * Q)), f0nom = f0n * (1 + Math.tan(ph) / (2 * Q));
    const on = gl > 1.0001, aS = on ? Math.sqrt(gl * gl - 1) : 0;
    // Hüllkurve je Periode
    const env = new Float64Array(N_CYC + 1); env[0] = on ? 0.02 : 0.5;
    for (let n = 0; n < N_CYC; n++) env[n + 1] = gl * env[n] / Math.sqrt(1 + env[n] * env[n]);
    const xs = new Float64Array(N_CYC * PPC + 1), ys = new Float64Array(xs.length);
    for (let i = 0; i < xs.length; i++) {
      const c = i / PPC, n = Math.floor(c), fr = c - n, a = env[n] + (env[Math.min(N_CYC, n + 1)] - env[n]) * fr;
      xs[i] = c; ys[i] = a * Math.sin(2 * Math.PI * c);
    }
    const top = Math.max(0.3, ...env) * 1.15;
    pl.line('w', xs, ys, { color: 'var(--accent)', width: 1.4, hover: false });
    pl.line('ep', Float64Array.from(env, (_, i) => i), env, { color: 'var(--accent-2)', dash: '5 4', width: 1.4, hover: false });
    pl.line('en', Float64Array.from(env, (_, i) => i), env.map(x => -x), { color: 'var(--accent-2)', dash: '5 4', width: 1.4, hover: false });
    pl.range({ y: [-top, top] });
    lblLoop.textContent = `k = ${comma(v.k)}   φ = ${v.phi}°   →   k·cos φ = ${comma(gl)}`;
    const drift = f0 - f0n;
    const state = !on ? 'klingt ab' : env[N_CYC] > aS * 0.9 ? 'stationär' : 'schwingt an …';
    out.set({ g: comma(gl), state, f0: fmt(f0n, 'Hz', 4), f: fmt(f, 'Hz', 5), drift: v.dT ? fmt(drift, 'Hz', { digits: 3, sign: true }) : '0 Hz', amp: on ? comma(aS) : '0' });
    note.innerHTML = md(on
      ? `Die Schleife ist $k\\cos\\varphi = ${comma(gl)} > 1$: aus Rauschen wächst die Schwingung, bis der Verstärker sättigt und die effektive Verstärkung auf genau 1 sinkt.`
      : `Mit $k\\cos\\varphi = ${comma(gl)} < 1$ reicht die Rückkopplung nicht, um die Verluste auszugleichen — eine angestoßene Schwingung klingt ab, von selbst entsteht keine.`)
      + ' ' + (Math.abs(v.phi) > 0 ? md(`Phasenfehler ziehen die Frequenz um $\\Delta f/f = \\tan\\varphi/2Q$ ${xt ? '— beim Quarz mit $Q\\approx 40\\,000$ nur um ' + fmt(f0nom - f0n, 'Hz', 2) : '— beim LC-Kreis mit $Q\\approx 50$ um ' + fmt(f0nom - f0n, 'Hz', 2)}.`) : '');
    if (on) g.reach('on');
    if (!xt && on && Math.abs(f / targetF - 1) < tol) g.reach('f');
    if (xt && on && Math.abs(v.dT) >= dTgoal) g.reach('q');
  }
  run();
}
