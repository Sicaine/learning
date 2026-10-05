// D08 Leistungsbilanz: (1) Widerstand mit Belastbarkeit — Überlast sichtbar; (2) Haushalts-Energierechner (kWh, Kosten).
// params: { u?: V (12), r?: Ω (100), kwh?: Ziel-Energie in kWh (6) }
// Ziele: (1) bei u/r die kleinste Belastbarkeit wählen, die nicht überlastet (2 W bei 12 V / 100 Ω);
//        (2) im Energierechner die Zielenergie (2 kW · 3 h = 6 kWh) einstellen.
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { animate } from '../../../assets/js/vizkit/anim.js';
import { fmt } from '../../../assets/js/vizkit/si.js';
import { h, s } from '../../../assets/js/vizkit/base.js';

const dec = (x, d = 2) => x.toFixed(d).replace('.', ',');
const RATINGS = [0.25, 0.5, 1, 2, 5];

export default function mount(stage, { params = {}, complete }) {
  const U0 = params.u ?? 12, R0 = params.r ?? 100, kwh0 = params.kwh ?? 6;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  let tab = 'res';
  const tabs = h('div', { class: 'vz-seg' });
  for (const [k, l] of [['res', 'Widerstand'], ['home', 'Haushalt: kWh und Kosten']]) tabs.append(h('button', { type: 'button', 'data-t': k, text: l, onclick: () => { tab = k; paint(); } }));
  root.append(h('div', { class: 'vz-controls' }, tabs));

  const g = goals(root, [
    { id: 'res', label: `${fmt(U0, 'V')} an ${fmt(R0, 'Ω')}: kleinste passende Belastbarkeit` },
    { id: 'home', label: `Energie ${dec(kwh0, 0)} kWh einstellen` },
  ], () => complete?.());

  // ── Tab 1 ──
  const A = h('div', { class: 'vk' }); root.append(A);
  const svg = s('svg', { viewBox: '0 0 520 150', class: 'vz-svg', role: 'img', 'aria-label': 'Widerstand mit Wärmeanzeige' });
  const body = s('rect', { x: 150, y: 55, width: 220, height: 40, rx: 4, fill: 'var(--surface)', stroke: 'var(--ink)', 'stroke-width': 3 });
  const glow = s('rect', { x: 150, y: 55, width: 220, height: 40, rx: 4, fill: '#ff6a2a', opacity: 0 });
  const bar = s('rect', { x: 150, y: 125, width: 0, height: 10, rx: 5, fill: 'var(--good)' });
  const barBg = s('rect', { x: 150, y: 125, width: 220, height: 10, rx: 5, fill: 'var(--line)' });
  const limit = s('path', { d: 'M370 119V141', stroke: 'var(--ink)', 'stroke-width': 2 });
  const lt = s('text', { x: 370, y: 116, 'text-anchor': 'middle', 'font-size': 12, fill: 'var(--ink-2)' }, '100 %');
  const status = s('text', { x: 260, y: 30, 'text-anchor': 'middle', 'font-size': 15, 'font-weight': 600, fill: 'var(--ink)' }, '');
  const smoke = s('g');
  svg.append(s('path', { d: 'M40 75H150M370 75H480', stroke: 'var(--ink-2)', 'stroke-width': 4, 'stroke-linecap': 'round' }), body, glow, barBg, bar, limit, lt, status, smoke);
  A.append(svg);
  const puffs = Array.from({ length: 6 }, (_, i) => { const c = s('circle', { r: 8, fill: '#8d8d98', opacity: 0 }); smoke.append(c); return { c, ph: i / 6 }; });
  let smokeAmt = 0;
  animate(svg, (dt, t) => {
    for (const p of puffs) {
      const ph = (t * 0.6 + p.ph) % 1;
      p.c.setAttribute('cx', 260 + Math.sin(ph * 9 + p.ph * 20) * 18 * ph + (p.ph - 0.5) * 60);
      p.c.setAttribute('cy', 52 - ph * 45); p.c.setAttribute('r', 6 + ph * 12);
      p.c.setAttribute('opacity', smokeAmt * (1 - ph) * 0.55);
    }
  });

  const uiR = controls(A, [
    { id: 'U', label: 'Spannung U', unit: 'V', min: 0, max: 24, step: 0.5, value: 6 },
    { id: 'R', label: 'Widerstand R', unit: 'Ω', min: 1, max: 10e3, scale: 'log', snap: 'E12', value: 220 },
    { id: 'Pm', type: 'seg', label: 'Belastbarkeit', options: RATINGS.map(x => [x, dec(x, x < 1 ? 2 : 0) + ' W']), value: 0.25 },
  ], runR);
  const outR = readout(A, [{ id: 'P', label: 'Leistung P', hl: true }, { id: 'I', label: 'Strom I' }, { id: 'ratio', label: 'Auslastung' }]);
  const noteR = h('p', { class: 'vz-note' }); A.append(noteR);

  function runR() {
    const { U, R, Pm } = uiR.values;
    const P = U * U / R, ratio = P / Pm, I = U / R;
    outR.set({ P: fmt(P, 'W'), I: fmt(I, 'A'), ratio: dec(ratio * 100, 0) + ' %' });
    bar.setAttribute('width', Math.min(1, ratio) * 220 * 1);
    bar.setAttribute('fill', ratio <= 0.8 ? 'var(--good)' : ratio <= 1 ? 'var(--warn)' : 'var(--bad)');
    glow.setAttribute('opacity', Math.min(0.75, Math.max(0, ratio - 0.3) * 0.7));
    smokeAmt = ratio > 2 ? 1 : ratio > 1 ? (ratio - 1) : 0;
    status.textContent = ratio > 2 ? 'Rauchzeichen! Der Widerstand verbrennt.' : ratio > 1 ? 'Überlast — wird zu heiß' : ratio > 0.8 ? 'Am Limit — wenig Reserve' : ratio > 0.4 ? 'Warm, im grünen Bereich' : 'Kühl';
    noteR.textContent = ratio > 1 ? `Es werden ${fmt(P, 'W')} umgesetzt, erlaubt sind ${fmt(Pm, 'W')}. Wähle einen größeren Typ oder senke Spannung/erhöhe R.` : `Reserve: ${dec((1 - ratio) * 100, 0)} % der Belastbarkeit.`;
    if (Math.abs(U - U0) < 0.3 && Math.abs(R / R0 - 1) < 0.01) {
      const minOk = RATINGS.find(x => x >= P);
      if (Pm === minOk) g.reach('res');
    }
  }

  // ── Tab 2 ──
  const B = h('div', { class: 'vk' }); root.append(B);
  const uiH = controls(B, [
    { type: 'presets', label: 'Beispielgerät (Annahme)', items: [
      { label: 'LED-Lampe 8 W', values: { P: 8, t: 4 } }, { label: 'Laptop-Netzteil 65 W', values: { P: 60, t: 8 } },
      { label: 'Fernseher 100 W', values: { P: 100, t: 4 } }, { label: 'Heizlüfter 2 kW', values: { P: 2000, t: 3 } },
    ] },
    { id: 'P', label: 'Leistung P', unit: 'W', values: [1, 2, 5, 8, 10, 20, 40, 60, 100, 200, 500, 1000, 2000, 3000], value: 100 },
    { id: 't', label: 'Dauer t', unit: 'h', values: [0.25, 0.5, 1, 2, 3, 4, 6, 8, 12, 24], value: 1, format: v => dec(v, v < 1 ? 2 : 0) + ' h' },
    { id: 'c', label: 'Preis je kWh', unit: '€', min: 0.1, max: 0.6, step: 0.01, value: 0.35, format: v => dec(v, 2) + ' €' },
  ], runH);
  const outH = readout(B, [{ id: 'W', label: 'Energie W', hl: true }, { id: 'MJ', label: 'in Megajoule' }, { id: 'cost', label: 'Kosten' }]);
  const noteH = h('p', { class: 'vz-note', text: 'W = P · t. Die Kilowattstunde ist eine Energieeinheit: 1 kWh = 3,6 MJ. Die Gerätewerte sind Beispielannahmen.' }); B.append(noteH);

  function runH() {
    const { P, t, c } = uiH.values;
    const kwh = P / 1000 * t;
    outH.set({ W: dec(kwh, kwh < 1 ? 3 : 2) + ' kWh', MJ: dec(kwh * 3.6, 2) + ' MJ', cost: dec(kwh * c, 2) + ' €' });
    if (Math.abs(kwh - kwh0) < 0.02 * kwh0) g.reach('home');
  }

  function paint() {
    [...tabs.children].forEach(b => b.classList.toggle('on', b.dataset.t === tab));
    A.style.display = tab === 'res' ? '' : 'none'; B.style.display = tab === 'home' ? '' : 'none';
  }
  paint(); runR(); runH();
}
