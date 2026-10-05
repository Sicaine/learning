// Kabeldämpfungs-Rechner: Kabeltyp, Länge, Frequenz → Dämpfung in dB und Leistung am Kabelende.
// Datenbasis: Dämpfung je 100 m an den Punkten des Kabeldämpfungsdiagramms der Formelsammlung, die in den Prüfungsfragen abgelesen werden
// (RG174 und RG58 bei 145 MHz, 12,7-mm-Schaumkabel bei 435 MHz, 10,3-mm-Schaumkabel bei 1296 MHz); dazwischen Näherung a ∝ √f (Skineffekt).
// Das ist ein Lernmodell, kein Datenblatt: echte Kabel weichen je nach Fabrikat ab.
import { h } from '../../../assets/js/vizkit/base.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { plot } from '../../../assets/js/vizkit/plot.js';

const CABLES = {
  rg174: { name: 'RG174 (2,8 mm, Voll-PE)', f0: 145, a0: 40, color: 'var(--bad)' },
  rg58: { name: 'RG58 (4,95 mm, Voll-PE)', f0: 145, a0: 20, color: 'var(--warn)' },
  f103: { name: '10,3 mm, PE-Schaum', f0: 1296, a0: 20.5, color: 'var(--accent-2)' },
  f127: { name: '12,7 mm, PE-Schaum', f0: 435, a0: 7, color: 'var(--accent)' },
};
export const per100 = (c, f) => CABLES[c].a0 * Math.sqrt(f / CABLES[c].f0);
const de = (x, d = 2) => (+x.toFixed(d)).toString().replace('.', ',');
const FREQS = [['10 m', 28.5], ['2 m', 145], ['70 cm', 435], ['23 cm', 1296]];

export default function mount(stage, { complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const box = h('div'); root.append(box);
  const p = plot(box, { x: { scale: 'log', min: 10, max: 2000, unit: 'MHz', label: 'Frequenz', format: v => String(v) }, y: { scale: 'log', min: 0.5, max: 100, unit: 'dB', label: 'dB je 100 m', format: v => String(v) }, legend: true, h: 260 });
  const fs = []; for (let i = 0; i <= 40; i++) fs.push(10 * Math.pow(200, i / 40));
  for (const [id, c] of Object.entries(CABLES)) p.line(id, fs, fs.map(f => per100(id, f)), { color: c.color, label: c.name });
  const ui = controls(root, [
    { id: 'cab', type: 'seg', label: 'Kabel', options: Object.entries(CABLES).map(([k, c]) => [k, c.name.split(' (')[0]]), value: 'rg58' },
    { type: 'presets', label: 'Band', items: FREQS.map(([l, f]) => ({ label: l, values: { f } })) },
    { id: 'f', label: 'Frequenz', min: 10, max: 2000, scale: 'log', value: 145, format: v => de(v, v < 100 ? 1 : 0) + ' MHz' },
    { id: 'len', label: 'Kabellänge', min: 1, max: 100, step: 1, value: 15, format: v => v + ' m' },
    { id: 'P', label: 'Sendeleistung', min: 1, max: 1000, scale: 'log', value: 100, format: v => de(v, v < 10 ? 1 : 0) + ' W' },
  ], run);
  const out = readout(root, [
    { id: 'a100', label: 'Dämpfung je 100 m' }, { id: 'a', label: 'Dämpfung des Kabels', hl: true }, { id: 'fac', label: 'Leistungsfaktor' }, { id: 'pend', label: 'Leistung am Kabelende', hl: true },
  ]);
  const g = goals(root, [
    { id: 'g3', label: '3 dB Kabeldämpfung einstellen (Leistung halbiert)' },
    { id: 'g10', label: '10 dB Kabeldämpfung (nur noch ein Zehntel)' },
    { id: 'best', label: 'Bei 70 cm und 40 m Kabel unter 3 dB bleiben' },
  ], () => complete?.());
  root.append(h('div', { class: 'vz-note', text: 'Die Kurven sind ein Lernmodell: die Punkte stammen aus den Aufgaben der Formelsammlung, dazwischen gilt a ∝ √f. Im Prüfungsdiagramm liest du dieselbe Größe ab: Wert je 100 m, dann mal Länge/100 m.' }));

  let live = false;
  function run() {
    const v = ui.values, a100 = per100(v.cab, v.f), a = a100 * v.len / 100, fac = Math.pow(10, a / 10);
    p.marker('op', v.f, a100, { label: 'Betriebspunkt' });
    out.set({ a100: `${de(a100, 1)} dB`, a: `${de(a, 2)} dB`, fac: `${de(fac, 2)} ×` , pend: `${de(v.P / fac, 1)} W` });
    if (!live) return;
    if (Math.abs(a - 3) < 0.3) g.reach('g3');
    if (Math.abs(a - 10) < 0.7) g.reach('g10');
    if (v.f > 380 && v.f < 480 && v.len >= 40 && a < 3) g.reach('best');
  }
  run();
  live = true;
}
