// Statische Aufladung einer ungeerdeten Drahtantenne: Ableitwiderstand R zwischen Antennenanschluss und Erdanschluss der Station.
// Modell: Aufladestrom I (Regen/Hagel; Größenordnung hier eine Annahme für die Demo, keine Katalogangabe) → U = I · R; R liegt parallel zu 50 Ω → Anteil 50/(R+50) der HF-Leistung geht verloren.
// Fakten laut DARC 50ohm.de (CC BY 4.0): Aufladung durch Regen/Hagel; hochohmige Ableitwiderstände (z. B. 100 kΩ), um die Antennenfunktion nicht zu beeinträchtigen.
// params: { uMax?: 50, lossMax?: 0.1 }
import { h, s } from '../../../assets/js/vizkit/base.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { fmt } from '../../../assets/js/vizkit/si.js';

const dec = (x, d = 1) => (+x).toFixed(d).replace('.', ',');

import { adaptive } from './_fit.js';

export default function mount(stage, opts) { adaptive(stage, W => build(stage, opts, W)); }

function build(stage, { params = {}, complete }, W) {
  const uMax = params.uMax ?? 50, lossMax = params.lossMax ?? 0.1;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const H = 190;
  const svg = s('svg', { class: 'vz-svg', viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': 'Zwei Balken: oben die statische Spannung an der Antenne, unten der HF-Verlust durch den Ableitwiderstand' });
  root.append(svg);
  const ui = controls(root, [
    { id: 'R', label: 'Ableitwiderstand R (zwischen Antennenanschluss und Erdanschluss)', unit: 'Ω', min: 100, max: 1e8, value: 1e3, scale: 'log', digits: 3, wide: true },
    { id: 'I', label: 'Aufladestrom durch Regen/Hagel (Annahme der Demo)', unit: 'A', min: 1e-7, max: 1e-4, value: 1e-5, scale: 'log', digits: 2 },
    { id: 'open', type: 'toggle', label: 'Ohne Ableitwiderstand (Antenne gegen Erde offen)', value: false },
  ], run);
  const out = readout(root, [{ id: 'u', label: 'Statische Spannung U = I · R', hl: true }, { id: 'loss', label: 'HF-Verlust (R parallel zu 50 Ω)', hl: true }]);
  const note = h('div', { class: 'vz-note', style: 'line-height:1.55;margin-top:6px' }); root.append(note);
  const g = goals(root, [
    { id: 'open', label: 'ohne Widerstand ausprobiert: Aufladung ohne Grenze' },
    { id: 'lo', label: 'zu niederohmig gewählt: HF-Verlust über 10 %' },
    { id: 'ok', label: `Sweet Spot: Spannung unter ${uMax} V und HF-Verlust unter ${dec(lossMax)} %` },
  ], () => complete?.());
  function run(_, id) {
    const act = !!id, v = ui.values;
    const U = v.open ? Infinity : v.I * v.R, loss = v.open ? 0 : 50 / (v.R + 50) * 100;
    out.set({ u: v.open ? 'steigt bis zum Überschlag' : fmt(U, 'V', 3), loss: dec(loss, loss < 1 ? 3 : 1) + ' %' });
    const uBar = v.open ? 1 : Math.min(1, Math.log10(Math.max(U, 1e-3) / 1e-3) / 6);          // 1 mV … 1 kV
    const lBar = Math.min(1, Math.log10(Math.max(loss, 1e-3) / 1e-3) / 5);                       // 0,001 % … 100 %
    const bw = W - 40;
    const bar = (y, label, frac, col, val) => [
      s('text', { x: 20, y: y - 8, 'font-size': 12.5, fill: 'var(--ink)', 'font-weight': 700 }, label),
      s('rect', { x: 20, y, width: bw, height: 28, fill: 'var(--line)', opacity: .5, rx: 6 }),
      s('rect', { x: 20, y, width: Math.max(2, bw * frac), height: 28, fill: col, rx: 6 }),
      s('text', { x: 28, y: y + 19, 'font-size': 12.5, fill: '#fff', 'font-weight': 700, style: 'paint-order:stroke;stroke:rgba(0,0,0,.45);stroke-width:2px' }, val),
    ];
    svg.replaceChildren(
      s('rect', { x: 0, y: 0, width: W, height: H, fill: 'var(--surface-2)' }),
      ...bar(34, 'Statische Spannung (Skala: 1 mV bis 1 kV)', uBar, (v.open || U > uMax) ? 'var(--bad)' : 'var(--good)', v.open ? 'ohne Grenze' : fmt(U, 'V', 3)),
      ...bar(100, 'HF-Verlust (Skala: 0,001 % bis 100 %)', lBar, loss > lossMax ? 'var(--bad)' : 'var(--good)', dec(loss, loss < 1 ? 3 : 1) + ' %'),
      s('text', { x: W / 2, y: 170, 'text-anchor': 'middle', 'font-size': 12.5, fill: 'var(--ink-2)' }, 'Antenne ── R ── Erdanschluss der Station'),
    );
    note.innerHTML = v.open ? '<b>Ohne Ableitung</b> lädt sich die Antenne durch Regen oder Hagel auf, bis es zu Entladungen kommt: im harmlosen Fall Prasselstörungen, im ungünstigen Fall gefährliche Spannungen für Geräte und Personen.'
      : loss > lossMax ? '<b>Zu niederohmig:</b> Der Widerstand liegt parallel zur Antenne und „frisst“ Sendeleistung. Hochohmige Ableitwiderstände (z. B. 100 kΩ) stören die Funktion nicht.'
      : (U > uMax) ? '<b>Zu hochohmig:</b> Die Ladung fließt zu langsam ab; die statische Spannung bleibt zu hoch.'
      : '<b>Passt:</b> Die Ladung fließt ab, und der HF-Verlust ist vernachlässigbar. Ein hochohmiger Ableitwiderstand ist das Mittel der Wahl.';
    if (!act) return;
    if (v.open) g.reach('open');
    if (!v.open && loss > 10) g.reach('lo');
    if (!v.open && U <= uMax && loss <= lossMax) g.reach('ok');
  }
  run();
  stage._test = { ui, run };
}
