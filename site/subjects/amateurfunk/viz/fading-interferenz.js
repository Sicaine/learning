// Fading als Interferenz: zwei Wellen gleicher Frequenz (z. B. Bodenwelle + Raumwelle, oder zwei Raumwellenwege) addieren sich im Empfänger.
// Summenamplitude = √(a² + b² + 2ab·cos Δφ). "Ionosphäre bewegt sich": Δφ driftet langsam, die Feldstärke schwankt (QSB).
import { h, s } from '../../../assets/js/vizkit/base.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { animate } from '../../../assets/js/vizkit/anim.js';

const de = (x, d = 2) => (+x.toFixed(d)).toString().replace('.', ',');

export default function mount(stage, { complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const W = 360, H = 190;
  const svg = s('svg', { class: 'vz-svg', viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': 'Zwei Wellen und ihre Summe', style: 'max-width:620px;margin:0 auto;background:var(--surface-2);border:1px solid var(--line);border-radius:12px' });
  root.append(svg);
  const ui = controls(root, [
    { id: 'b', label: 'Amplitude Welle 2 (Welle 1 = 1,0)', min: 0.1, max: 1, step: 0.05, value: 0.6, format: v => de(v) },
    { id: 'ph', label: 'Phasenlage von Welle 2 zu Welle 1', min: 0, max: 360, step: 5, value: 90, format: v => v + '°' },
    { id: 'drift', type: 'toggle', label: 'Ionosphäre bewegt sich (Phase driftet)', value: false },
  ], () => draw());
  const out = readout(root, [{ id: 'sum', label: 'Summenamplitude', hl: true }, { id: 'eff', label: 'Wirkung' }]);
  const g = goals(root, [
    { id: 'plus', label: 'Verstärkung: beide Wellen in Phase (Summe größer als 1,5)' },
    { id: 'minus', label: 'Auslöschung: gleiche Amplituden, 180° Phasenunterschied (Summe praktisch 0)' },
    { id: 'qsb', label: 'QSB erleben: Phase driften lassen und mindestens eine volle Schwankung abwarten' },
  ], () => complete?.());
  root.append(h('div', { class: 'vz-note', text: 'Zu den Zeitverläufen: Oben Welle 1 (blau) und Welle 2 (orange), unten ihre Summe. Auf Kurzwelle ändert die bewegte Ionosphäre die Weglänge und damit die Phase ständig; auf VHF und höher entsteht Fading oft durch Reflexion an bewegten Objekten.' }));

  let ph = ui.values.ph, driftT = 0, minSeen = Infinity, maxSeen = 0, live = false;
  animate(svg, dt => { if (ui.values.drift) { ph = (ph + dt * 50) % 360; driftT += dt; draw(true); } });
  function draw(fromLoop) {
    const v = ui.values; if (!fromLoop && !v.drift) ph = v.ph;
    const a = 1, b = v.b, phi = ph * Math.PI / 180, sum = Math.sqrt(a * a + b * b + 2 * a * b * Math.cos(phi));
    const kids = [];
    let d1 = ''; let d2 = '';
    for (let i = 0; i <= 200; i++) { const x = 10 + (W - 20) * i / 200, t = i / 200 * 4 * Math.PI; d1 += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + (60 - a * Math.sin(t) * 24).toFixed(1); d2 += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + (60 - b * Math.sin(t + phi) * 24).toFixed(1); }
    kids.push(s('line', { x1: 10, y1: 60, x2: W - 10, y2: 60, stroke: 'var(--line)' }), s('path', { d: d1, fill: 'none', stroke: 'var(--accent)', 'stroke-width': 2 }), s('path', { d: d2, fill: 'none', stroke: 'var(--warn)', 'stroke-width': 2 }));
    kids.push(s('text', { x: 12, y: 14, 'font-size': 10, 'font-weight': 700, fill: 'var(--accent)' }, 'Welle 1'), s('text', { x: 62, y: 14, 'font-size': 10, 'font-weight': 700, fill: 'var(--warn)' }, 'Welle 2'));
    let d3 = ''; const sc = 15;
    for (let i = 0; i <= 200; i++) { const x = 10 + (W - 20) * i / 200, t = i / 200 * 4 * Math.PI; d3 += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + (142 - (a * Math.sin(t) + b * Math.sin(t + phi)) * sc).toFixed(1); }
    kids.push(s('line', { x1: 10, y1: 142, x2: W - 10, y2: 142, stroke: 'var(--line)' }), s('path', { d: d3, fill: 'none', stroke: 'var(--good)', 'stroke-width': 2.5 }), s('text', { x: 12, y: 108, 'font-size': 10, 'font-weight': 700, fill: 'var(--good)' }, 'Summe im Empfänger'));
    // Pegelanzeige
    kids.push(s('rect', { x: 10, y: 176, width: W - 20, height: 8, rx: 4, fill: 'var(--line)' }), s('rect', { x: 10, y: 176, width: (W - 20) * sum / 2, height: 8, rx: 4, fill: sum < 0.3 ? 'var(--bad)' : sum > 1.3 ? 'var(--good)' : 'var(--accent)' }));
    svg.replaceChildren(...kids);
    out.set({ sum: de(sum), eff: sum > 1.001 ? 'verstärkt (Welle 1 allein: 1,0)' : sum < 0.999 ? 'abgeschwächt' : 'unverändert' });
    if (v.drift) { if (sum < minSeen) minSeen = sum; if (sum > maxSeen) maxSeen = sum; if (maxSeen > 1.3 && minSeen < 0.7 * maxSeen && driftT > 2.5) g.reach('qsb'); }
    if (!live) return;
    if (!v.drift) {
      if (sum > 1.5) g.reach('plus');
      if (b >= 0.95 && Math.abs(ph - 180) < 6 && sum < 0.1) g.reach('minus');
    }
  }
  draw(); live = true;
}
