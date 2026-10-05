// Linearregler und Wärme (L39): Verlustleistung P_V = (U_ein − U_aus)·I, Wirkungsgrad, Sperrschichttemperatur über den Kühlkörper.
// Rechenmodell (keine Netzliste): Dropout 2 V, Umgebung 25 °C, zulässige Sperrschichttemperatur 125 °C (Abschaltung darüber).
// params: { dropout?: 2, tamb?: 25, tmax?: 125 }
import { plot } from '../../../assets/js/vizkit/plot.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { fmt } from '../../../assets/js/vizkit/si.js';
import { h, s } from '../../../assets/js/vizkit/base.js';

export default function mount(stage, { params = {}, complete, md }) {
  const DROP = params.dropout ?? 2, TA = params.tamb ?? 25, TMAX = params.tmax ?? 125, ETA_SW = 0.9;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const svgBox = h('div', { class: 'vk-plot' });
  const svg = s('svg', { viewBox: '0 0 640 190', role: 'img', 'aria-label': 'Leistungsbilanz und Temperatur' });
  svgBox.append(svg);
  root.append(svgBox);
  const pbox = h('div'); root.append(pbox);
  const pl = plot(pbox, { h: 220, x: { unit: 'A', label: 'I_Last', min: 0, max: 1.5, format: v => fmt(v, 'A', 2) }, y: { label: 'T_j', include: [TA], min: TA, max: 250, format: v => Math.round(v) + ' °C' } });

  const ui = controls(root, [
    { id: 'uin', label: 'Eingangsspannung U_ein', unit: 'V', min: 7, max: 24, value: 12, step: 0.5 },
    { id: 'uout', type: 'seg', label: 'U_aus', options: [[3.3, '3,3 V'], [5, '5 V'], [9, '9 V'], [12, '12 V']], value: 5 },
    { id: 'i', label: 'Laststrom I', unit: 'A', min: 0, max: 1.5, value: 0.5, step: 0.05, digits: 3 },
    { id: 'rth', label: 'Wärmewiderstand R_th (Regler + Kühlkörper)', unit: 'K/W', min: 5, max: 60, value: 50, step: 1, digits: 3, wide: true },
    { type: 'presets', label: 'Kühlung', items: [{ label: 'ohne Kühlkörper', values: { rth: 50 } }, { label: 'kleiner Kühlkörper', values: { rth: 20 } }, { label: 'großer Kühlkörper', values: { rth: 8 } }] },
  ], draw);
  const out = readout(root, [
    { id: 'pa', label: 'P_aus' }, { id: 'pv', label: 'Verlust P_V', hl: true }, { id: 'eta', label: 'Wirkungsgrad η' },
    { id: 'tj', label: 'Sperrschicht T_j' }, { id: 'sw', label: 'Schaltregler (η ≈ 90 %): P_V' },
  ]);
  const note = h('div', { class: 'vz-note', 'aria-live': 'polite' }); root.append(note);
  const g = goals(root, [
    { id: 'cool', label: '5 V / 0,5 A aus 12 V ohne Abschaltung' },
    { id: 'eta', label: 'η ≥ 70 % bei 5 V / 0,5 A' },
  ], () => complete?.());

  function model(uin, uout, i, rth) {
    const reg = uin - uout >= DROP - 1e-9, uo = reg ? uout : Math.max(0, uin - DROP);
    const pv = (uin - uo) * i, pa = uo * i, tj = TA + pv * rth;
    return { reg, uo, pv, pa, tj, eta: uin ? uo / uin : 0, down: tj > TMAX };
  }
  function draw() {
    const v = ui.values, m = model(v.uin, v.uout, v.i, v.rth);
    const pin = m.pa + m.pv, scale = 560 / Math.max(10, pin);   // 560 px für max. 10 W (sonst skaliert)
    const wa = m.pa * scale, wv = m.pv * scale;
    const tfrac = Math.min(1, (m.tj - TA) / (250 - TA)), tlim = (TMAX - TA) / (250 - TA);
    svg.innerHTML = `
      <text x="40" y="22" font-size="13" font-weight="600" fill="var(--ink-2)">Leistungsbilanz: P_ein = P_aus + P_V = ${fmt(pin, 'W', 3)}</text>
      <rect x="40" y="32" width="${wa.toFixed(1)}" height="38" rx="6" fill="var(--accent)" opacity=".85"/>
      <rect x="${(40 + wa).toFixed(1)}" y="32" width="${wv.toFixed(1)}" height="38" rx="6" fill="var(--warn)" opacity=".9"/>
      <text x="${(48).toFixed(1)}" y="56" font-size="13" fill="#fff">${wa > 90 ? 'nutzbar ' + fmt(m.pa, 'W', 3) : ''}</text>
      <text x="${(48 + wa).toFixed(1)}" y="56" font-size="13" fill="var(--ink)">${wv > 80 ? 'Wärme ' + fmt(m.pv, 'W', 3) : ''}</text>
      <text x="40" y="100" font-size="13" font-weight="600" fill="var(--ink-2)">Sperrschichttemperatur: ${m.down ? 'Übertemperatur → Regler schaltet ab' : fmt(m.tj, '°C', 3).replace(/\s?°C/, ' °C')}</text>
      <rect x="40" y="110" width="560" height="22" rx="11" fill="var(--line)"/>
      <rect x="40" y="110" width="${(560 * tfrac).toFixed(1)}" height="22" rx="11" fill="${m.down ? 'var(--bad)' : m.tj > TMAX * 0.8 ? 'var(--warn)' : 'var(--good)'}"/>
      <line x1="${(40 + 560 * tlim).toFixed(1)}" x2="${(40 + 560 * tlim).toFixed(1)}" y1="104" y2="138" stroke="var(--bad)" stroke-width="2.5"/>
      <text x="${(40 + 560 * tlim).toFixed(1)}" y="154" font-size="12" text-anchor="middle" fill="var(--bad)">${TMAX} °C zulässig</text>
      <text x="40" y="154" font-size="12" fill="var(--muted)">${TA} °C Umgebung</text>
      <text x="40" y="180" font-size="12" fill="var(--muted)">${m.reg ? 'Regler regelt (U_ein − U_aus ≥ ' + fmt(DROP, 'V', 2) + ' Dropout)' : 'Dropout unterschritten: Ausgang folgt der Eingangsspannung − ' + fmt(DROP, 'V', 2) + ' = ' + fmt(m.uo, 'V', 3)}</text>`;
    // Kennlinie T_j über I (aktuelle Einstellung)
    const xs = [], ys = [];
    for (let k = 0; k <= 30; k++) { const I = k * 0.05, q = model(v.uin, v.uout, I, v.rth); xs.push(I); ys.push(Math.min(250, q.tj)); }
    pl.line('tj', xs, ys, { color: 'var(--accent-2)', label: 'T_j(I)' });
    pl.hline('lim', TMAX, { label: `${TMAX} °C`, color: 'var(--bad)', dash: '5 4' });
    pl.marker('op', v.i, Math.min(250, m.tj), { label: 'Betriebspunkt' });
    const sw = m.pa * (1 / ETA_SW - 1);
    out.set({ pa: fmt(m.pa, 'W', 3), pv: fmt(m.pv, 'W', 3), eta: (m.eta * 100).toFixed(1).replace('.', ',') + ' %', tj: m.down ? 'Abschaltung' : fmt(m.tj, '°C', 3).replace(/\s?°C/, ' °C'), sw: fmt(sw, 'W', 2) });
    note.textContent = m.down ? 'T_j über dem zulässigen Wert: ein größerer Kühlkörper (kleineres R_th) oder weniger Spannungsdifferenz hilft.' : '';
    if (v.uin === 12 && v.uout === 5 && v.i >= 0.5 && !m.down) g.reach('cool');
    if (v.uout === 5 && v.i >= 0.5 && m.reg && m.eta >= 0.7) g.reach('eta');
  }
  void md;
  draw();
}
