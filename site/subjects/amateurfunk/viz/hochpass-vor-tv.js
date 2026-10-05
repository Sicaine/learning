// Filter vor dem Antenneneingang: Butterworth-Hoch- oder -Tiefpass, Ordnung und Grenzfrequenz einstellen.
// Ziel: Kurzwelle (hier 28 MHz) ≥ 30 dB dämpfen, ohne das Fernsehband (ab 470 MHz) zu beschneiden. Frequenzbereiche: DARC 50ohm.de (KW 3–30 MHz, DVB-T2 470–690 MHz).
// params: { hpMin?: 30 }  — geforderte Dämpfung bei 28 MHz in dB
import { h } from '../../../assets/js/vizkit/base.js';
import { plot } from '../../../assets/js/vizkit/plot.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { logspace, fmt } from '../../../assets/js/vizkit/si.js';

const F_KW = 28e6, F_TV = 470e6;
const att = (f, fc, n, type) => 10 * Math.log10(1 + (type === 'hp' ? (fc / f) ** (2 * n) : (f / fc) ** (2 * n)));
const db = x => (x < 0.05 ? '0,0' : x.toFixed(x < 10 ? 1 : 0).replace('.', ',')) + ' dB';

import { adaptive } from './_fit.js';

export default function mount(stage, opts) { adaptive(stage, W => build(stage, opts, W)); }

function build(stage, { params = {}, complete }, W) {
  const need = params.hpMin ?? 30;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const p = plot(root, { w: W, x: { scale: 'log', min: 1e6, max: 1e9, unit: 'Hz' }, y: { unit: 'dB', min: -80, max: 3, label: 'Durchgang |H| in dB', ticks: [-80, -60, -40, -20, 0] } });
  p.band('kw', 3e6, 30e6, { label: 'KW', color: 'var(--accent)' });
  p.band('tv', 470e6, 690e6, { label: 'TV', color: 'var(--accent-2)' });
  root.append(h('div', { class: 'vz-note', style: 'font-size:.86rem;margin:2px 0 6px' }, 'KW = Kurzwelle 3–30 MHz (gestrichelt: 28 MHz) · TV = DVB-T2-Band 470–690 MHz'));
  p.vline('f28', F_KW, { dash: '4 4', color: 'var(--muted)' });
  const f = logspace(1e6, 1e9, 220);
  const ui = controls(root, [
    { id: 'type', type: 'seg', label: 'Filterart', options: [['hp', 'Hochpass'], ['lp', 'Tiefpass']], value: 'hp' },
    { id: 'n', type: 'seg', label: 'Ordnung (Anzahl der Glieder)', options: [[1, '1'], [3, '3'], [5, '5']], value: 1 },
    { id: 'fc', label: 'Grenzfrequenz (−3 dB)', unit: 'Hz', min: 3e6, max: 900e6, value: 60e6, scale: 'log', wide: true },
  ], run);
  const out = readout(root, [{ id: 'kw', label: 'Dämpfung bei 28 MHz', hl: true }, { id: 'tv', label: 'Dämpfung bei 470 MHz (Fernsehen)', hl: true }]);
  const g = goals(root, [
    { id: 'hp', label: `Hochpass: 28 MHz um mindestens ${need} dB gedämpft, Fernsehband höchstens 3 dB` },
    { id: 'lp', label: 'Tiefpass ausprobiert: das Fernsehband verschwindet' },
  ], () => complete?.());
  function run(_, id) {
    const v = ui.values, n = +v.n;
    p.set('h', f, f.map(x => -att(x, v.fc, n, v.type)), { color: 'var(--ink)', label: v.type === 'hp' ? 'Hochpass' : 'Tiefpass' });
    const aKW = att(F_KW, v.fc, n, v.type), aTV = att(F_TV, v.fc, n, v.type);
    out.set({ kw: db(aKW), tv: db(aTV) });
    if (!id) return;
    if (v.type === 'hp' && aKW >= need && aTV <= 3) g.reach('hp');
    if (v.type === 'lp' && aTV >= 20) g.reach('lp');
  }
  run();
  stage._test = { ui, att };
}
