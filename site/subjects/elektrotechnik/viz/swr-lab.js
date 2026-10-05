// SWR-Labor (L59): Reflexionsfaktor, SWR, reflektierte/abgegebene Leistung, Rückflussdämpfung, optional λ/4-Transformator.
// params: { z0?: 50, rl?: 200 (Start-Last), goalSwr?: 1.5 }
// Anzeige: Spannungsverlauf |U(d)| entlang der Leitung (Stehwellen) und SWR über R_L.
import { plot } from '../../../assets/js/vizkit/plot.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { fmt } from '../../../assets/js/vizkit/si.js';
import { h } from '../../../assets/js/vizkit/base.js';
import { comma } from './_9-helper.js';

const OPEN = 1e9;
const RL = [0, 5, 10, 12.5, 15, 20, 25, 30, 37.5, 50, 60, 75, 100, 150, 200, 300, 400, 500, OPEN];
const rlName = v => (v === 0 ? 'Kurzschluss' : v >= OPEN ? 'offen' : fmt(v, 'Ω'));
// komplexe Hilfen
const cdiv = (a, b) => { const d = b[0] * b[0] + b[1] * b[1]; return [(a[0] * b[0] + a[1] * b[1]) / d, (a[1] * b[0] - a[0] * b[1]) / d]; };
const cabs = a => Math.hypot(a[0], a[1]);

export default function mount(stage, { params = {}, complete }) {
  const z0 = params.z0 ?? 50, goalS = params.goalSwr ?? 1.5;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const pat = plot(root, { h: 220, x: { label: 'Abstand von der Last d in Wellenlängen', unit: '', min: 0, max: 1, ticks: [0, 0.25, 0.5, 0.75, 1], format: v => comma(v, 2) + ' λ' }, y: { min: 0, max: 2.1, ticks: [0, 0.5, 1, 1.5, 2], format: v => comma(v, 1), label: '' }, legend: true, cursor: false });
  const cur = plot(root, { h: 200, x: { scale: 'log', label: 'Lastwiderstand R_L (reell)', unit: 'Ω', min: 5, max: 500 }, y: { min: 1, max: 10, ticks: [1, 2, 3, 5, 10], format: v => 's = ' + comma(v, 0) }, legend: false, cursor: true });
  const ui = controls(root, [
    { id: 'rl', label: 'Last R_L', min: 0, max: OPEN, values: RL, value: params.rl ?? 200, scale: 'lin', format: rlName },
    { id: 'xl', label: 'Blindanteil X_L', unit: 'Ω', min: -100, max: 100, step: 5, value: 0, format: v => (v > 0 ? '+j' : v < 0 ? '−j' : '') + fmt(Math.abs(v), 'Ω') },
    { id: 'pv', label: 'Vorlaufende Leistung P_v', unit: 'W', min: 1, max: 100, step: 1, value: 100, format: v => fmt(v, 'W') },
    { id: 'tr', type: 'toggle', label: 'λ/4-Transformator einfügen', value: false },
    { id: 'zt', label: 'Z des λ/4-Stücks', min: 25, max: 200, step: 1, value: 70, format: v => fmt(v, 'Ω') },
  ], run);
  const out = readout(root, [
    { id: 'r', label: '|r|', hl: true }, { id: 's', label: 'SWR s', hl: true }, { id: 'pr', label: 'reflektiert P_r' }, { id: 'pa', label: 'abgegeben P_ab' },
    { id: 'rl', label: 'Rückflussdämpfung' }, { id: 'loss', label: 'Fehlanpassungsverlust' }]);
  const g = goals(root, [
    { id: 'swr3', label: 'SWR 3 einstellen (R_L = 150 Ω oder 16,7 Ω): 25 % der Leistung kommen zurück' },
    { id: 'open', label: 'Leerlauf oder Kurzschluss: |r| = 1, alles wird reflektiert' },
    { id: 'tr', label: `200-Ω-Last mit λ/4-Transformator auf SWR < ${comma(goalS, 1)} bringen` },
  ], () => complete?.());
  const ZL = (rl, xl) => (rl >= OPEN ? [OPEN, 0] : [rl, xl]);
  function gammaOf(rl, xl, tr, zt) {
    let Z = ZL(rl, xl);
    if (tr) Z = Z[0] >= OPEN ? [0, 0] : cdiv([zt * zt, 0], Z);    // Z_ein = Z_T²/Z_L (λ/4)
    if (Z[0] >= OPEN || cabs(Z) > 1e8) return [1, 0];
    return cdiv([Z[0] - z0, Z[1]], [Z[0] + z0, Z[1]]);
  }
  function run() {
    const { rl, xl, pv, tr, zt } = ui.values;
    const gm = gammaOf(rl, xl, tr, zt), r = cabs(gm), s = r >= 0.99999 ? Infinity : (1 + r) / (1 - r);
    const N = 240, ds = new Float64Array(N), us = new Float64Array(N), ph = Math.atan2(gm[1], gm[0]);
    for (let i = 0; i < N; i++) { const d = i / (N - 1); ds[i] = d; us[i] = Math.hypot(1 + r * Math.cos(ph - 4 * Math.PI * d), r * Math.sin(ph - 4 * Math.PI * d)); }
    pat.line('u', ds, us, { color: 'var(--accent)', width: 2.4 });
    pat.hline('umax', 1 + r, { color: 'var(--bad)', dash: '4 4', label: 'U_max = 1 + |r|' }); pat.hline('umin', 1 - r, { color: 'var(--good)', dash: '4 4', label: 'U_min = 1 − |r|' });
    // SWR über R_L (reell, mit gleichem Transformator-Zustand)
    const rs = [], ss = []; for (let i = 0; i <= 120; i++) { const R = 5 * (100) ** (i / 120), gg = gammaOf(R, xl, tr, zt), rr = cabs(gg); rs.push(R); ss.push(Math.min(10, (1 + rr) / (1 - rr + 1e-9))); }
    cur.line('s', rs, ss, { color: 'var(--accent)', width: 2.4 }); cur.hline('g', goalS, { color: 'var(--good)', dash: '4 4', label: 'SWR ' + comma(goalS, 1) });
    if (rl > 0 && rl < OPEN) cur.marker('now', rl, Math.min(10, s), { label: 'jetzt' }); else cur.removeAnn('now');
    const pr = pv * r * r, pa = pv - pr;
    out.set({ r: comma(r, 3), s: Number.isFinite(s) ? comma(s, 2) : '∞', pr: `${comma(pr, 1)} W (${comma(r * r * 100, 1)} %)`, pa: `${comma(pa, 1)} W (${comma((1 - r * r) * 100, 1)} %)`, rl: r > 1e-6 ? comma(-20 * Math.log10(r), 2) + ' dB' : '∞ dB', loss: r < 0.99999 ? comma(-10 * Math.log10(1 - r * r), 2) + ' dB' : '∞ dB' });
    if (Math.abs(s - 3) < 0.06) g.reach('swr3');
    if (r > 0.9999) g.reach('open');
    if (tr && rl === 200 && xl === 0 && s < goalS) g.reach('tr');
  }
  run();
}
