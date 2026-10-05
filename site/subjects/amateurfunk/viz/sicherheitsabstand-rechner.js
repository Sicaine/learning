// Sicherheitsabstand-Rechner (Personenschutz, BEMFV): EIRP = P·10^((g_d − a + 2,15 dB)/10 dB), d = √(30 Ω · EIRP) / E, gültig nur für d > λ/(2π).
// Formeln: Formelsammlung der BNetzA (Abschnitt Strahlungsleistung/Feldstärke), Erläuterung DARC 50ohm.de (CC BY 4.0). Grenzwert E: laut Prüfungsaufgabe.
// params: { goals?: ['anzeige','nah','ok'] }
import { h, s } from '../../../assets/js/vizkit/base.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { fmt } from '../../../assets/js/vizkit/si.js';

const dec = (x, d = 1) => (+x).toFixed(d).replace('.', ',');

import { adaptive } from './_fit.js';

export default function mount(stage, opts) { adaptive(stage, W => build(stage, opts, W)); }

function build(stage, { params = {}, complete }, W) {
  const need = params.goals ?? ['anzeige', 'nah', 'ok'];
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const H = 230;
  const svg = s('svg', { class: 'vz-svg', viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': 'Draufsicht: Antenne in der Mitte, Kreis des Sicherheitsabstands, Quadrat der Grundstücksgrenze, gestrichelter Kreis der Nahfeldgrenze' });
  const legend = h('div', { class: 'vz-note', style: 'font-size:.86rem;line-height:1.5;margin:2px 0 6px' });
  root.append(svg, legend);
  const ui = controls(root, [
    { id: 'f', label: 'Frequenz', unit: 'Hz', min: 1.8e6, max: 1.3e9, value: 29e6, scale: 'log', digits: 3 },
    { id: 'P', label: 'Senderausgangsleistung P', unit: 'W', min: 1, max: 100, value: 100, scale: 'log', digits: 3 },
    { id: 'a', label: 'Kabeldämpfung a', unit: 'dB', min: 0, max: 10, value: 1.5, step: 0.1, format: v => dec(v) + ' dB' },
    { id: 'g', label: 'Antennengewinn g_d (bezogen auf den Dipol, dBd)', unit: 'dBd', min: -3, max: 25, value: 7.5, step: 0.5, format: v => dec(v) + ' dBd' },
    { id: 'E', label: 'Grenzwert der Feldstärke E (Effektivwert, 6-Minuten-Mittel; laut Aufgabe)', unit: 'V/m', min: 5, max: 100, value: 28, step: 1, format: v => v + ' V/m', hint: '28 V/m gilt für 10 bis 400 MHz; in der Prüfung wird der Wert in der Aufgabe genannt.' },
    { id: 'D', label: 'Abstand der Antenne zur Grundstücksgrenze (kontrollierbarer Bereich)', unit: 'm', min: 1, max: 30, value: 3, step: 0.5, format: v => dec(v) + ' m' },
    { id: 'fix', type: 'toggle', label: 'Ortsfeste Amateurfunkanlage (nicht portabel/mobil)', value: true },
  ], run);
  const out = readout(root, [
    { id: 'eirp', label: 'Strahlungsleistung EIRP', hl: true }, { id: 'd', label: 'Sicherheitsabstand d', hl: true },
    { id: 'n', label: 'Nahfeldgrenze λ/(2π)' },
  ]);
  const verdict = h('div', { class: 'vz-note', style: 'line-height:1.6;padding:10px 14px;border:1px solid var(--line);border-radius:10px;background:#fff;margin-top:6px' });
  root.append(verdict);
  const g = goals(root, [
    { id: 'anzeige', label: 'Anzeigepflicht erreicht (ortsfest, EIRP ≥ 10 W)' },
    { id: 'nah', label: 'Nahfeld-Falle: Ergebnis kleiner als λ/(2π)' },
    { id: 'ok', label: 'anzeigepflichtig, Rechnung gültig und Sicherheitsabstand liegt auf dem eigenen Grundstück' },
  ].filter(x => need.includes(x.id)), () => complete?.());

  function run(_, id) {
    const act = !!id, v = ui.values;
    const eirp = v.P * 10 ** ((v.g - v.a + 2.15) / 10);
    const d = Math.sqrt(30 * eirp) / v.E;
    const lam = 3e8 / v.f, dn = lam / (2 * Math.PI);
    const valid = d > dn, anz = v.fix && eirp >= 10, inside = d <= v.D;
    out.set({ eirp: fmt(eirp, 'W', 3), d: fmt(d, 'm', 3), n: fmt(dn, 'm', 3) });
    const lines = [];
    lines.push(!v.fix ? `<b>Portabel/mobil:</b> Das Anzeigeverfahren gilt nur für <i>ortsfeste</i> Anlagen.`
      : eirp >= 10 ? `<b style="color:var(--warn)">Anzeigepflichtig</b> (EIRP ≥ 10 W, § 9 BEMFV): Anzeige <i>vor</i> Inbetriebnahme bei der zuständigen Außenstelle der BNetzA.`
      : `<b style="color:var(--good)">Keine Anzeige nötig:</b> EIRP unter 10 W.`);
    lines.push(valid ? `<b style="color:var(--good)">Rechnung gültig:</b> d = ${dec(d, 2)} m liegt außerhalb der Nahfeldgrenze λ/(2π) = ${dec(dn, 2)} m (Fernfeld bzw. strahlendes Nahfeld).`
      : `<b style="color:var(--bad)">Rechnung ungültig:</b> d = ${dec(d, 2)} m liegt im <i>reaktiven Nahfeld</i> (unter ${dec(dn, 2)} m). Die Fernfeldformel gilt hier nicht: E- und H-Feld messen, simulieren oder per Nahfeldberechnung bestimmen.`);
    lines.push(inside ? `<b style="color:var(--good)">Im kontrollierbaren Bereich:</b> Der Sicherheitsabstand (von jedem Punkt der Antenne aus) bleibt auf dem eigenen Grundstück.`
      : `<b style="color:var(--bad)">Ragt über die Grundstücksgrenze:</b> Außerhalb des kontrollierbaren Bereichs könnten Personen im Sicherheitsabstand stehen. Leistung senken, Gewinn senken oder die Antenne weiter weg montieren.`);
    verdict.innerHTML = lines.join('<br>');
    // Zeichnung
    const R = Math.max(d, dn, v.D) * 1.15, k = (H / 2 - 8) / R, cx = W / 2, cy = H / 2;
    const sw = (col, txt) => `<span style="display:inline-block;width:.8em;height:.8em;border-radius:2px;background:${col};opacity:.7;margin-right:.35em;vertical-align:-1px"></span>${txt}`;
    legend.innerHTML = `${sw('var(--good)', 'Grundstücksgrenze (kontrollierbarer Bereich)')} · ${sw(valid ? 'var(--bad)' : 'var(--warn)', 'Sicherheitsabstand d = ' + dec(d, 2) + ' m')} · <span style="border-bottom:2px dashed var(--muted)">gestrichelt</span>: Nahfeldgrenze λ/(2π) = ${dec(dn, 2)} m · Maßstab: 100 px ≙ ${dec(100 / k, 1)} m`;
    svg.replaceChildren(
      s('rect', { x: 0, y: 0, width: W, height: H, fill: 'var(--surface-2)' }),
      s('rect', { x: cx - v.D * k, y: cy - v.D * k, width: 2 * v.D * k, height: 2 * v.D * k, fill: 'var(--good)', opacity: .12, stroke: 'var(--good)', 'stroke-width': 2 }),
      s('circle', { cx, cy, r: d * k, fill: valid ? 'var(--bad)' : 'var(--warn)', opacity: .22, stroke: valid ? 'var(--bad)' : 'var(--warn)', 'stroke-width': 2 }),
      s('circle', { cx, cy, r: dn * k, fill: 'none', stroke: 'var(--muted)', 'stroke-width': 1.5, 'stroke-dasharray': '5 4' }),
      s('line', { x1: cx, y1: cy - 8, x2: cx, y2: cy + 8, stroke: 'var(--ink)', 'stroke-width': 3 }), s('line', { x1: cx - 8, y1: cy, x2: cx + 8, y2: cy, stroke: 'var(--ink)', 'stroke-width': 3 }),
    );
    if (!act) return;
    if (anz) g.reach('anzeige');
    if (!valid) g.reach('nah');
    if (anz && valid && inside) g.reach('ok');
  }
  run();
  stage._test = { ui, run };
}
