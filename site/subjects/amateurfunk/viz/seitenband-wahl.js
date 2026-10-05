// Seitenband-Wahl: Die Gegenstation sendet SSB (USB oder LSB), du stellst Seitenband und VFO ein.
// Modell: Das Signal liegt bei f_T + s·f (s = +1 USB, −1 LSB, f = 0,3 … 2,7 kHz); dein Empfänger bildet die NF a = r·(f_HF − f_VFO) (r = +1 USB, −1 LSB).
// Ist r = s, entsteht a = f − r·d (natürlich bei d = 0); ist r ≠ s, ist die NF gespiegelt.  d = VFO − Trägerfrequenz der Gegenstation.
// params: { }
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { chart, h, txt, line, rect, dec } from './_funk.js';

export default function mount(stage, { complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const ch = chart(root, { h: 200, x: [-0.2, 3.4], y: [0, 1.15], xticks: [0, 0.5, 1, 1.5, 2, 2.5, 3], xfmt: t => t + ' kHz', xlabel: 'NF-Frequenz aus deinem Lautsprecher', aria: 'NF-Spektrum am Lautsprecher mit hörbarem Bereich 0,3 bis 2,7 kHz' });
  const ui = controls(root, [
    { id: 's', type: 'seg', label: 'Gegenstation sendet', options: [[1, 'USB'], [-1, 'LSB']], value: 1 },
    { id: 'r', type: 'seg', label: 'Dein MODE-Schalter', options: [[1, 'USB'], [-1, 'LSB']], value: -1 },
    { id: 'd', label: 'VFO relativ zur Trägerfrequenz der Gegenstation', min: -3.5, max: 3.5, step: 0.05, value: 3, format: v => (v > 0 ? '+' : '') + dec(v, 2) + ' kHz', digits: 2 },
  ], run);
  const out = readout(root, [{ id: 'sb', label: 'Seitenband passt?' }, { id: 'hear', label: 'hörbar', hl: true }, { id: 'clang', label: 'Klang', hl: true }]);
  root.append(h('p', { class: 'vz-note', text: 'Tipp: Bei falschem Seitenband liegt das Signal auf der anderen Seite deines Filters. Erst etwa 3 kHz weiter oben oder unten hörst du es überhaupt, aber gespiegelt. Bei richtigem Seitenband bist du bei 0 kHz genau richtig.' }));
  const g = goals(root, [
    { id: 'ok', label: 'Stimme natürlich: gleiches Seitenband, VFO auf Träger (±0,1 kHz)' },
    { id: 'mirror', label: 'Falsches Seitenband: gespiegelte NF hören' },
    { id: 'off', label: 'Richtiges Seitenband, VFO daneben: Stimme zu hoch oder zu tief' },
  ], () => complete?.());

  function run(v, id) {
    const { s, r, d } = v, same = s === r;
    ch.clear();
    ch.add(rect(ch.X(0.3), ch.m.t, ch.X(2.7) - ch.X(0.3), ch.Y(0) - ch.m.t, { fill: 'var(--accent-2)', fo: 0.1, stroke: 'var(--accent-2)' }), txt(ch.X(1.5), ch.m.t + 12, 'Empfängerfilter 0,3 … 2,7 kHz', { anchor: 'middle', size: 10.5, fill: 'var(--accent-2)' }));
    // Spektrallinien der Stimme: f = 0,4 … 2,6 kHz in Schritten von 0,12 kHz, Pegel fällt mit f (tiefe Töne stark)
    let heard = 0, mid = 0;
    for (let f = 0.3; f <= 2.7001; f += 0.12) {
      const amp = 1.0 - 0.7 * (f - 0.3) / 2.4;
      const a = same ? f - r * d : -(f + r * d);
      if (a < -0.2 || a > 3.4) continue;
      const aud = a >= 0.3 && a <= 2.7; if (aud) { heard++; mid += a * amp; }
      ch.add(line(ch.X(a), ch.Y(0), ch.X(a), ch.Y(amp), { color: aud ? (same && Math.abs(d) < 0.11 ? 'var(--good)' : same ? 'var(--accent)' : 'var(--bad)') : 'var(--muted)', w: 3, opacity: aud ? 1 : 0.35 }));
    }
    const nat = same && Math.abs(d) < 0.11, total = 21;
    const clang = heard < 3 ? 'kaum etwas im Filter' : nat ? 'natürliche Stimme' : same ? (d * r > 0 ? 'zu tief' : 'zu hoch') + (heard < total - 2 ? ', Anteile abgeschnitten' : '') : 'gespiegelt, Entengeschnatter';
    out.set({ sb: same ? 'ja' : 'nein (gespiegelt)', hear: heard + ' von ' + total + ' Anteilen', clang });
    ch.add(txt(ch.m.l + 4, ch.Y(1.05), 'tiefe Stimmenanteile sind im Original am stärksten', { size: 10.5 }));
    if (!id) return;
    if (nat) g.reach('ok');
    if (!same && heard >= 8) g.reach('mirror');
    if (same && Math.abs(d) >= 0.4 && heard >= 3) g.reach('off');
  }
  run(ui.values);
}
