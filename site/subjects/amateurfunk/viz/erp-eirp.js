// ERP/EIRP-Kette: Sender → Kabel → Antenne. Alles in dB rechnen: P_EIRP = P_Sender · 10^((g_i − a)/10 dB), g_i = g_d + 2,15 dB, ERP = EIRP / 1,64.
import { h, s } from '../../../assets/js/vizkit/base.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';

const de = (x, d = 2) => (+x.toPrecision(d + 1)).toString().replace('.', ',');
const fmtW = w => w >= 1000 ? de(w / 1000, 2) + ' kW' : w >= 1 ? de(w, 3) + ' W' : de(w * 1000, 3) + ' mW';
const DI = 2.15;

export default function mount(stage, { complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const svg = s('svg', { class: 'vz-svg', viewBox: '0 0 360 190', role: 'img', 'aria-label': 'Leistungskette Sender, Kabel, Antenne', style: 'max-width:560px;margin:0 auto;background:var(--surface-2);border:1px solid var(--line);border-radius:12px' });
  root.append(svg);
  const ui = controls(root, [
    { id: 'P', label: 'Sendeleistung am Sender', min: 0.1, max: 1000, scale: 'log', value: 100, format: v => fmtW(v) },
    { id: 'a', label: 'Kabeldämpfung (inkl. Steckverbinder, Anpassgerät)', min: 0, max: 12, step: 0.5, value: 1, format: v => de(v, 1) + ' dB', wide: true },
    { id: 'g', label: 'Antennengewinn', min: -3, max: 30, step: 0.05, value: 11, format: v => de(v, 3) + ' dB', wide: true },
    { id: 'ref', type: 'seg', label: 'Gewinn bezogen auf', options: [['dBi', 'Isotropstrahler (dBi)'], ['dBd', 'Halbwellendipol (dBd)']], value: 'dBi' },
    { type: 'presets', label: 'Beispiele', items: [
      { label: 'Dipol', values: { g: 0, ref: 'dBd', a: 0 } },
      { label: 'Vertikal 5,15 dBi', values: { g: 5.15, ref: 'dBi', a: 0, P: 3 } },
      { label: 'Yagi 11 dBd', values: { g: 11, ref: 'dBd', a: 1, P: 0.6 } },
      { label: 'Parabol 26 dBi', values: { g: 26, ref: 'dBi', a: 0, P: 0.25 } },
    ] },
  ], run);
  const out = readout(root, [
    { id: 'pant', label: 'Leistung an der Antenne' }, { id: 'gi', label: 'Gesamtgewinn bis Isotrop' }, { id: 'eirp', label: 'EIRP', hl: true }, { id: 'erp', label: 'ERP', hl: true }, { id: 'lim', label: '10-W-EIRP-Grenze' },
  ]);
  const g = goals(root, [
    { id: 'lim', label: 'Mit ≥ 5 dBi Gewinn und mindestens 2 W Sendeleistung unter 10 W EIRP bleiben' },
    { id: 'k', label: '100 W, 1 dB Kabel und 11 dBi: etwa 1000 W EIRP erreichen' },
    { id: 'd', label: 'Gewinn von dBi auf dBd umschalten: ERP und EIRP unterscheiden sich um 2,15 dB' },
  ], () => complete?.());
  let refSeen = new Set(); // Bezug-Umschaltung zählen ab der ersten Bedienung
  root.append(h('div', { class: 'vz-note', text: 'Leistungen werden nicht addiert, sondern über dB-Werte verknüpft: Kabeldämpfung und Antennengewinn werden zusammengezählt (Gewinn positiv, Dämpfung negativ), danach wird der Gesamtfaktor aus der Tabelle (3 dB = 2, 10 dB = 10, 2,15 dB = 1,64) auf die Sendeleistung angewendet.' }));

  let live = false;
  function run() {
    const v = ui.values;
    const gi = v.ref === 'dBd' ? v.g + DI : v.g;           // Gewinn bezogen auf Isotrop
    const net = gi - v.a;                                   // dB gegenüber Sendeleistung (EIRP)
    const pant = v.P * Math.pow(10, -v.a / 10);
    const eirp = v.P * Math.pow(10, net / 10), erp = eirp / Math.pow(10, DI / 10);
    out.set({ pant: fmtW(pant), gi: `${de(gi, 3)} dBi`, eirp: fmtW(eirp), erp: fmtW(erp), lim: eirp < 10 ? 'eingehalten (< 10 W)' : 'überschritten (≥ 10 W)' });
    // Zeichnung: Balkenkette
    const bars = [['Sender', v.P], ['nach Kabel', pant], ['ERP', erp], ['EIRP', eirp]];
    const max = Math.max(...bars.map(b => b[1]), 1e-9), kids = [];
    const bw = 62, gap = 22, x0 = 22, base = 148, top = 34;
    const sc = val => Math.max(2, Math.log10(1 + val / 1e-3 * 1) / Math.log10(1 + max / 1e-3) * (base - top));
    bars.forEach(([n, val], i) => {
      const x = x0 + i * (bw + gap), hgt = sc(val), col = i === 0 ? 'var(--ink-2)' : i === 1 ? 'var(--warn)' : i === 2 ? 'var(--accent-2)' : 'var(--accent)';
      kids.push(s('rect', { x, y: base - hgt, width: bw, height: hgt, rx: 5, fill: col, opacity: .9 }), s('text', { x: x + bw / 2, y: base - hgt - 6, 'text-anchor': 'middle', 'font-size': 11, fill: 'var(--ink)', 'font-weight': 700 }, fmtW(val)), s('text', { x: x + bw / 2, y: base + 16, 'text-anchor': 'middle', 'font-size': 11, fill: 'var(--muted)', 'font-weight': 600 }, n));
    });
    kids.push(s('line', { x1: 12, y1: base, x2: 348, y2: base, stroke: 'var(--line-2)' }));
    kids.push(s('text', { x: 348, y: 183, 'text-anchor': 'end', 'font-size': 9, fill: 'var(--muted)' }, 'Balken logarithmisch'));
    // 10-W-Grenze
    if (10 <= max * 1.001) { const y = base - sc(10); kids.push(s('line', { x1: 12, y1: y, x2: 348, y2: y, stroke: 'var(--bad)', 'stroke-dasharray': '5 4' }), s('text', { x: 14, y: y - 4, 'font-size': 9, fill: 'var(--bad)', 'font-weight': 700 }, '10 W')); }
    kids.push(s('text', { x: 12, y: 183, 'text-anchor': 'start', 'font-size': 9, fill: 'var(--muted)' }, `Kabel ${de(-v.a, 1)} dB, Antenne ${de(v.g, 3)} ${v.ref}  →  gesamt ${net >= 0 ? '+' : ''}${de(net, 3)} dB (EIRP)`));
    svg.replaceChildren(...kids);
    if (!live) return;
    if (v.g >= 5 && v.P >= 2 && eirp < 10 && gi - v.a > 0) g.reach('lim');
    if (Math.abs(v.P - 100) < 5 && Math.abs(v.a - 1) < 0.01 && Math.abs(gi - 11) < 0.1 && eirp > 950 && eirp < 1060) g.reach('k');
    refSeen.add(v.ref); if (refSeen.size === 2) g.reach('d');
  }
  run();
  live = true;
}
