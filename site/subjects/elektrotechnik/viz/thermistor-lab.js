// D07 Temperaturabhängige Widerstände: NTC / PTC / Pt100 als Kennlinie R(ϑ) und als Thermometer im Spannungsteiler.
// params: { target?: °C Schaltschwelle (Standard 60), uref?: V Schwelle (Standard 2,5), tolU?: V (Standard 0,15), ucc?: V (Standard 5) }
// Ziel: Vorwiderstand so wählen, dass U_aus bei der Schalttemperatur gleich U_ref ist (Komparator-Schwelle).
// Modelle: NTC  R = R25·exp(B·(1/T − 1/T25)); Pt100  R = R0(1 + Aϑ + Bϑ² [+ C(ϑ−100)ϑ³ für ϑ<0]) (Callendar–Van Dusen);
// PTC: qualitatives Modell eines keramischen Kaltleiters (Sprung oberhalb der Referenztemperatur).
import { plot } from '../../../assets/js/vizkit/plot.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { fmt } from '../../../assets/js/vizkit/si.js';
import { h, s } from '../../../assets/js/vizkit/base.js';

const dec = (x, d = 2) => x.toFixed(d).replace('.', ',');

export default function mount(stage, { params = {}, complete, md }) {
  const target = params.target ?? 60, uref = params.uref ?? 2.5, tolU = params.tolU ?? 0.15, ucc = params.ucc ?? 5;
  const root = h('div', { class: 'vz vk' }); stage.append(root);

  const R = {
    ntc: (T, B) => 10e3 * Math.exp(B * (1 / (T + 273.15) - 1 / 298.15)),
    ptc: T => 100 * (1 + 10 ** ((T - 80) / 10)),
    pt: T => T >= 0 ? 100 * (1 + 3.9083e-3 * T - 5.775e-7 * T * T) : 100 * (1 + 3.9083e-3 * T - 5.775e-7 * T * T - 4.183e-12 * (T - 100) * T ** 3),
  };
  const val = (type, T, B) => type === 'ntc' ? R.ntc(T, B) : type === 'ptc' ? R.ptc(T) : R.pt(T);

  const p = plot(root, { h: 250, x: { unit: '°C', label: 'Temperatur ϑ', min: -20, max: 120, format: v => dec(v, 0) + ' °C' }, y: { scale: 'log', unit: 'Ω', label: 'Widerstand R' } });
  const Ts = Array.from({ length: 141 }, (_, i) => -20 + i);
  const ui = controls(root, [
    { id: 'type', type: 'seg', label: 'Bauteil', options: [['ntc', 'NTC 10 kΩ'], ['ptc', 'PTC (Kaltleiter)'], ['pt', 'Pt100']], value: 'ntc' },
    { id: 'T', label: 'Temperatur ϑ', unit: '°C', min: -20, max: 120, step: 1, value: 25, format: v => dec(v, 0) + ' °C' },
    { id: 'B', label: 'B-Wert (NTC)', unit: 'K', min: 3000, max: 4500, step: 50, value: 3950, format: v => dec(v, 0) + ' K' },
    { id: 'Rv', label: 'Vorwiderstand R_V (oben)', unit: 'Ω', min: 100, max: 100e3, scale: 'log', snap: 'E12', value: 10e3 },
  ], run);
  const out = readout(root, [
    { id: 'R', label: 'R(ϑ)', hl: true }, { id: 'a', label: 'Temperaturkoeffizient' },
    { id: 'U', label: 'U_aus bei ϑ' }, { id: 'Ut', label: `U_aus bei ${dec(target, 0)} °C` },
  ]);
  const g = goals(root, [{ id: 'g', label: `U_aus = ${fmt(uref, 'V')} (± ${fmt(tolU, 'V')}) bei ${dec(target, 0)} °C` }], () => complete?.());
  const note = h('p', { class: 'vz-note' }); root.append(note);
  p.vline('t', target, { label: `${dec(target, 0)} °C`, color: 'var(--good)', dash: '5 4' });

  function run() {
    const v = ui.values, B = v.B;
    const r = val(v.type, v.T, B);
    const dT = 0.5, alpha = (val(v.type, v.T + dT, B) - val(v.type, v.T - dT, B)) / (2 * dT) / r;     // 1/K
    const Uout = ucc * r / (r + v.Rv);
    const rt = val(v.type, target, B), Ut = ucc * rt / (rt + v.Rv);
    p.line('r', Ts, Ts.map(T => val(v.type, T, B)), { color: 'var(--accent)', label: 'R(ϑ)' });
    p.marker('op', v.T, r, { label: fmt(r, 'Ω') });
    out.set({ R: fmt(r, 'Ω'), a: `${dec(alpha * 100, 1)} %/K`, U: fmt(Uout, 'V'), Ut: fmt(Ut, 'V') });
    ui.el.querySelector('[data-id="B"]')?.style.setProperty('opacity', v.type === 'ntc' ? 1 : 0.35);
    const txt = {
      ntc: 'NTC: Der Widerstand **sinkt** mit der Temperatur (hier $R = R_{25}\\,e^{B(1/T-1/T_{25})}$, $T$ in Kelvin). Beachte die logarithmische Achse.',
      ptc: 'PTC (Modell eines keramischen Kaltleiters): fast konstant, oberhalb von etwa 80 °C steigt der Widerstand steil an — er regelt sich selbst gegen Überhitzung.',
      pt: 'Pt100: 100 Ω bei 0 °C, nahezu linear mit rund 0,39 %/K — sehr genau und austauschbar, aber nur wenige Ohm Änderung pro 10 K.',
    }[v.type];
    note.innerHTML = md ? md(txt + ` Schaltung: $U_\\text{aus} = U_\\text{cc}\\cdot\\dfrac{R(\\vartheta)}{R(\\vartheta)+R_V}$ mit $U_\\text{cc}=${dec(ucc, 0)}\\,\\mathrm{V}$.`) : txt;
    if (Math.abs(Ut - uref) <= tolU) g.reach('g');
  }
  run();
}
