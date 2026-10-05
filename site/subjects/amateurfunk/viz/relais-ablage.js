// Relais-Simulator: Ausgabe-/Eingabefrequenz, Ablage und Vorzeichen richtig einstellen; Doppeln erleben.
// Ablagen laut DARC-Kurs 50ohm.de: 10 m 100 kHz, 2 m 600 kHz, 70 cm 7,6 MHz, 23 cm 28 MHz; Eingabe liegt bei 2 m und 70 cm tiefer als die Ausgabe.
import { h, s } from '../../../assets/js/vizkit/base.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';

const BANDS = {
  '10m': { name: '10 m', out: 29.640, shift: 0.1, label: '29,640 MHz' },
  '2m': { name: '2 m', out: 145.6875, shift: 0.6, label: '145,6875 MHz' },
  '70cm': { name: '70 cm', out: 438.875, shift: 7.6, label: '438,875 MHz' },
  '23cm': { name: '23 cm', out: 1298.150, shift: 28, label: '1298,150 MHz' },
};
const f = (x, d = 4) => x.toFixed(d).replace(/0+$/, '').replace(/\.$/, '').replace('.', ',') + ' MHz';
const eq = (a, b) => Math.abs(a - b) < 1e-6;

export default function mount(stage, { params = {}, complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const svg = s('svg', { class: 'vz-svg', viewBox: '0 0 640 250', role: 'img', 'aria-label': 'Zwei Stationen im Tal, ein Relais auf dem Berg dazwischen' });
  root.append(svg);
  const ui = controls(root, [
    { id: 'band', type: 'seg', label: 'Band des Relais', options: Object.entries(BANDS).map(([k, b]) => [k, b.name]), value: '2m' },
    { id: 'dir', type: 'seg', label: 'Richtung der Ablage (Sendefrequenz …)', options: [['minus', '− tiefer als Empfang'], ['plus', '+ höher als Empfang'], ['simplex', 'keine (Simplex)']], value: 'simplex' },
    { id: 'shift', type: 'seg', label: 'Ablage', options: [[0.1, '100 kHz'], [0.6, '600 kHz'], [7.6, '7,6 MHz'], [28, '28 MHz']], value: 0.6 },
    { id: 'b', type: 'toggle', label: 'Station B drückt gleichzeitig die Sendetaste (Doppeln)', value: false },
  ], run);
  const out = readout(root, [{ id: 'rx', label: 'du hörst (Ausgabe)' }, { id: 'tx', label: 'du sendest' }, { id: 'in', label: 'Relais hört (Eingabe)', hl: true }, { id: 'res', label: 'Ergebnis', hl: true }]);
  const g = goals(root, [
    { id: '2m', label: '2-m-Relais korrekt öffnen' }, { id: '70', label: '70-cm-Relais korrekt öffnen' },
    { id: 'dbl', label: 'Doppeln erzeugen' }, { id: 'sx', label: 'Simplex auf der Ausgabe: das Relais bleibt zu' },
  ], () => complete?.());

  function run(_, id) {
    const act = !!id;
    const v = ui.values, b = BANDS[v.band];
    const rx = b.out, input = b.out - b.shift;
    const sh = v.dir === 'simplex' ? 0 : +v.shift;
    const tx = v.dir === 'minus' ? rx - sh : v.dir === 'plus' ? rx + sh : rx;
    const hit = eq(tx, input);
    const dbl = hit && v.b;
    out.set({ rx: f(rx), tx: f(tx), in: f(input), res: dbl ? 'Doppeln: unlesbar' : hit ? 'Relais öffnet' : 'Relais hört nichts' });
    const col = hit ? 'var(--good)' : 'var(--bad)';
    svg.replaceChildren(
      s('rect', { x: 0, y: 0, width: 640, height: 250, fill: 'var(--surface-2)' }),
      s('polygon', { points: '220,215 320,70 420,215', fill: '#cfd8cf', stroke: '#9aa89a' }),
      s('rect', { x: 0, y: 215, width: 640, height: 35, fill: '#e3ebe0' }),
      // Relais
      s('line', { x1: 320, y1: 70, x2: 320, y2: 36, stroke: 'var(--ink)', 'stroke-width': 3 }),
      s('circle', { cx: 320, cy: 33, r: 6, fill: hit ? 'var(--good)' : 'var(--muted)' }),
      s('text', { x: 320, y: 20, 'text-anchor': 'middle', 'font-size': 13, fill: 'var(--ink)', 'font-weight': 700 }, 'Relais'),
      // Stationen
      ...[[70, 'Du (A)'], [570, 'Station B']].map(([x, t]) => [s('rect', { x: x - 18, y: 190, width: 36, height: 25, rx: 4, fill: 'var(--surface)', stroke: 'var(--ink-2)' }), s('line', { x1: x, y1: 190, x2: x, y2: 160, stroke: 'var(--ink-2)', 'stroke-width': 2 }), s('text', { x, y: 238, 'text-anchor': 'middle', 'font-size': 13, fill: 'var(--ink)' }, t)]).flat(),
      // direkte Verbindung gesperrt
      s('line', { x1: 80, y1: 165, x2: 560, y2: 165, stroke: 'var(--muted)', 'stroke-dasharray': '4 6', opacity: .6 }),
      s('text', { x: 320, y: 188, 'text-anchor': 'middle', 'font-size': 12, fill: 'var(--muted)' }, 'direkt: Berg im Weg'),
      // Strecke A → Relais (Eingabe)
      s('line', { x1: 78, y1: 160, x2: 314, y2: 40, stroke: col, 'stroke-width': 2.5, 'stroke-dasharray': hit ? '' : '6 5' }),
      s('text', { x: 130, y: 90, 'font-size': 12, fill: col, 'font-weight': 600 }, 'sendet ' + f(tx, 4)),
      // Relais → B (Ausgabe)
      s('line', { x1: 326, y1: 40, x2: 562, y2: 160, stroke: hit ? 'var(--accent-2)' : 'var(--line-2)', 'stroke-width': 2.5, 'stroke-dasharray': hit ? '' : '6 5' }),
      s('text', { x: 400, y: 90, 'font-size': 12, fill: hit ? 'var(--accent-2)' : 'var(--muted)', 'font-weight': 600 }, 'strahlt aus ' + f(rx, 4)),
      dbl ? s('text', { x: 570, y: 120, 'text-anchor': 'middle', 'font-size': 18, fill: 'var(--bad)', 'font-weight': 700 }, '##&%§!') : null,
    );
    if (!act) return;
    if (hit && v.band === '2m' && v.dir === 'minus') g.reach('2m');
    if (hit && v.band === '70cm' && v.dir === 'minus') g.reach('70');
    if (dbl) g.reach('dbl');
    if (v.dir === 'simplex' && !hit) g.reach('sx');
  }
  run();
}
