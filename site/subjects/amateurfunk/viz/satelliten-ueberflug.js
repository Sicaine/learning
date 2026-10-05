// Satelliten-Überflug: Himmelsansicht (Azimut/Elevation), Antenne nachführen, Uplink und Downlink über den Transponder.
// Die Bahn ist ein vereinfachtes Beispiel (kein echter Satellit); die Bänder des Beispiel-Transponders: Uplink 70 cm, Downlink 2 m.
import { h, s } from '../../../assets/js/vizkit/base.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';

const MAXEL = 62, AZ0 = 200, AZ1 = 345;
const pos = t => ({ az: AZ0 + (AZ1 - AZ0) * t, el: MAXEL * Math.sin(Math.PI * t) });
const R = 120, C = 160;
const xy = (az, el) => { const r = (90 - el) / 90 * R, a = az * Math.PI / 180; return [C + r * Math.sin(a), C - r * Math.cos(a)]; };
const dirName = az => ['N', 'NO', 'O', 'SO', 'S', 'SW', 'W', 'NW'][Math.round(((az % 360) + 360) % 360 / 45) % 8];

export default function mount(stage, { complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const svg = s('svg', { class: 'vz-svg', viewBox: '0 0 320 320', role: 'img', 'aria-label': 'Himmelsansicht mit Satellitenbahn', style: 'max-width:420px;margin:0 auto' });
  root.append(svg);
  const ui = controls(root, [
    { id: 't', label: 'Zeit im Überflug', min: 0, max: 100, step: 1, value: 0, unit: '%', format: v => `${v} %` },
    { id: 'az', label: 'Antenne: Azimut', min: 0, max: 359, step: 1, value: 90, unit: '°', format: v => `${v}° (${dirName(v)})` },
    { id: 'el', label: 'Antenne: Elevation', min: 0, max: 90, step: 1, value: 45, unit: '°', format: v => `${v}°` },
    { id: 'tx', type: 'toggle', label: 'Ich sende (Uplink 70 cm)', value: false },
  ], run);
  const out = readout(root, [{ id: 'saz', label: 'Satellit: Azimut' }, { id: 'sel', label: 'Satellit: Elevation' }, { id: 'sig', label: 'Antenne', hl: true }, { id: 'link', label: 'Funkstrecke' }]);
  const g = goals(root, [
    { id: 'rise', label: 'Satelliten beim Aufgang (Elevation < 15°) erfassen' },
    { id: 'top', label: 'Höchststand (Elevation > 55°) erfassen' },
    { id: 'qso', label: 'senden und über den Downlink hören' },
  ], () => complete?.());

  const track = [];
  for (let i = 0; i <= 40; i++) track.push(xy(pos(i / 40).az, pos(i / 40).el).join(','));

  function run(_, id) {
    const v = ui.values, p = pos(v.t / 100);
    const [sx, sy] = xy(p.az, p.el), [ax, ay] = xy(v.az, v.el);
    const dAz = Math.abs(((v.az - p.az + 540) % 360) - 180), dEl = Math.abs(v.el - p.el);
    const hit = dAz < 12 && dEl < 12;
    const ring = [90, 60, 30, 0].map(el => s('circle', { cx: C, cy: C, r: (90 - el) / 90 * R, fill: 'none', stroke: 'var(--line-2)' }));
    const labels = [['N', 0], ['O', 90], ['S', 180], ['W', 270]].map(([t, a]) => { const [x, y] = [C + (R + 14) * Math.sin(a * Math.PI / 180), C - (R + 14) * Math.cos(a * Math.PI / 180)]; return s('text', { x, y: y + 4, 'text-anchor': 'middle', 'font-size': 13, fill: 'var(--ink)', 'font-weight': 700 }, t); });
    svg.replaceChildren(
      ...ring,
      s('line', { x1: C - R, y1: C, x2: C + R, y2: C, stroke: 'var(--line-2)' }), s('line', { x1: C, y1: C - R, x2: C, y2: C + R, stroke: 'var(--line-2)' }),
      ...labels,
      s('text', { x: C + 4, y: C - (30 / 90 * R) - 3, 'font-size': 10, fill: 'var(--muted)' }, '60°'), s('text', { x: C + 4, y: C - (60 / 90 * R) - 3, 'font-size': 10, fill: 'var(--muted)' }, '30°'),
      s('text', { x: C + 4, y: C - R + 12, 'font-size': 10, fill: 'var(--muted)' }, '0° Horizont'),
      s('polyline', { points: track.join(' '), fill: 'none', stroke: 'var(--accent-line)', 'stroke-width': 3, 'stroke-dasharray': '2 5' }),
      s('line', { x1: C, y1: C, x2: ax, y2: ay, stroke: hit ? 'var(--good)' : 'var(--warn)', 'stroke-width': 2 }),
      s('circle', { cx: ax, cy: ay, r: 12, fill: 'none', stroke: hit ? 'var(--good)' : 'var(--warn)', 'stroke-width': 2 }),
      s('circle', { cx: sx, cy: sy, r: 7, fill: 'var(--accent)' }),
      s('text', { x: sx + 10, y: sy - 8, 'font-size': 12, fill: 'var(--accent)', 'font-weight': 700 }, 'OSCAR'),
      s('circle', { cx: C, cy: C, r: 3, fill: 'var(--ink)' }),
    );
    const sig = hit ? 'Satellit im Strahl' : 'daneben';
    const link = !hit ? 'keine Verbindung' : v.tx ? 'Uplink 70 cm ↑ · Downlink 2 m ↓' : 'Downlink 2 m ↓ (nur Empfang)';
    out.set({ saz: `${Math.round(p.az)}° (${dirName(p.az)})`, sel: `${Math.round(p.el)}°`, sig, link });
    if (!id) return;
    if (hit && p.el < 15) g.reach('rise');
    if (hit && p.el > 55) g.reach('top');
    if (hit && v.tx) g.reach('qso');
  }
  run();
}
