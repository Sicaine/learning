// Digimode-Pegel: NF-Pegel vom PC am SSB-Transceiver. Zu viel Pegel → ALC greift ein → Übersteuerung → Nebenaussendungen.
// FT8 hat konstante Amplitude (die ALC ist dort nur ein Warnsignal), PSK31 hat veränderliche Amplitude (die ALC verzerrt das Signal).
// Modell vereinfacht. params: { }
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { chart, h, txt, line, rect, dec, clamp } from './_funk.js';

const PMAX = 100;
const amp = d => (d <= 0.5 ? d : 0.5 + 0.5 * (1 - Math.exp(-(d - 0.5) / 0.35)));

export default function mount(stage, { complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const sp = chart(root, { h: 230, x: [1100, 5200], y: [-75, 5], xticks: [1500, 3000, 4500], xfmt: v => (v / 1000) + ' kHz', yticks: [0, -20, -40, -60], yfmt: v => v + ' dB', aria: 'Spektrum der Aussendung: Nutzsignal bei 1,5 kHz und mögliche Nebenaussendungen' });
  const ui = controls(root, [
    { id: 'mode', type: 'seg', label: 'Digimode', options: [['ft8', 'FT8 (konstante Amplitude)'], ['psk', 'PSK31 (veränderliche Amplitude)']], value: 'ft8' },
    { id: 'lvl', label: 'NF-Pegel am Mikrofon-/Daten-Eingang', min: 0, max: 100, step: 1, value: 40, format: v => v + ' %', digits: 0 },
  ], run);
  const out = readout(root, [{ id: 'alc', label: 'ALC-Anzeige' }, { id: 'p', label: 'Sendeleistung', hl: true }, { id: 'u', label: 'unerwünschte Aussendung' }, { id: 'n', label: 'Nachbarfrequenzen', hl: true }]);
  const g = goals(root, [
    { id: 'ok', label: 'FT8: ALC ruht und Leistung ≥ 15 W' },
    { id: 'bad', label: 'PSK31 übersteuern: Nachbarfrequenzen werden gestört' },
    { id: 'fix', label: 'Danach den Pegel senken, bis die ALC ruht und die Störung weg ist' },
  ], () => complete?.());
  let broke = false;

  function run(v, id) {
    const d = v.lvl / 100 * 1.5, A = amp(d), P = PMAX * A * A;
    const alc = clamp((d - 0.5) / 0.4, 0, 1);
    const over = clamp((d - 0.75) / 0.6, 0, 1);   // beginnende Übersteuerung der NF-/Treiberstufen
    const psk = v.mode === 'psk';
    const sk = clamp(alc * 0.75 + over * 0.6, 0, 1);   // Maß für Splatter (nur PSK: ALC verformt die Amplitude)
    const lines = [];   // [f, dB]
    lines.push([1500, 0]);
    const worstHarm = -68 + 58 * over;
    lines.push([3000, worstHarm], [4500, worstHarm - 10]);
    if (psk) for (const k of [1, 2, 3, 4]) { const db = -48 + 40 * sk - 6 * (k - 1); lines.push([1500 - k * 62.5 * 2, db], [1500 + k * 62.5 * 2, db]); }
    else if (over > 0) for (const k of [1, 2]) { const db = -62 + 50 * over - 8 * k; lines.push([1500 - k * 120, db], [1500 + k * 120, db]); }
    const worst = Math.max(...lines.slice(1).map(l => l[1]));
    const noisy = worst > -40;
    sp.clear();
    sp.add(rect(sp.X(1200), sp.m.t, sp.X(1800) - sp.X(1200), sp.Y(-75) - sp.m.t, { fill: 'var(--accent)', fo: 0.06 }));
    for (const [f, db] of lines) {
      if (f < 1100 || f > 5200) continue;
      const wanted = f === 1500, y = Math.max(-75, db);
      sp.add(line(sp.X(f), sp.Y(-75), sp.X(f), sp.Y(y), { color: wanted ? 'var(--accent)' : (noisy && db > -40 ? 'var(--bad)' : 'var(--warn)'), w: wanted ? 5 : 3 }));
    }
    sp.add(txt(sp.X(1500), sp.Y(0) - 6, 'Nutzsignal', { anchor: 'middle', fill: 'var(--accent)', size: 11 }),
      txt(sp.X(3000), sp.Y(Math.max(-70, worstHarm)) - 6, '2. Oberwelle', { anchor: 'middle', fill: 'var(--warn)', size: 10.5 }),
      txt(sp.X(4500), sp.Y(Math.max(-70, worstHarm - 10)) - 6, '3.', { anchor: 'middle', fill: 'var(--warn)', size: 10.5 }),
      line(sp.m.l, sp.Y(-40), sp.W - sp.m.r, sp.Y(-40), { color: 'var(--bad)', w: 1.2, dash: '5 4' }), txt(sp.m.l + 4, sp.Y(-40) - 4, 'stört andere ab hier', { anchor: 'start', fill: 'var(--bad)', size: 10.5 }));
    out.set({ alc: alc < 0.02 ? 'ruht' : alc < 0.4 ? 'spricht an' : 'voll', p: dec(P, 0) + ' W', u: worst < -60 ? 'kaum messbar' : dec(worst, 0) + ' dB', n: noisy ? 'gestört (Splatter)' : 'nicht gestört' });
    if (!id) return;
    if (!psk && alc < 0.02 && P >= 15) g.reach('ok');
    if (psk && noisy) { g.reach('bad'); broke = true; }
    if (broke && alc < 0.02 && !noisy && g.has('bad')) g.reach('fix');
  }
  run(ui.values);
}
