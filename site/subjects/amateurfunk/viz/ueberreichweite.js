// Überreichweiten oberhalb 30 MHz: normaler Funkhorizont, troposphärische Inversion, Sporadic-E und Aurora im Querschnitt (Höhen stark überzeichnet).
import { h, s } from '../../../assets/js/vizkit/base.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { animate } from '../../../assets/js/vizkit/anim.js';

const SC = {
  normal: { name: 'Normal', hoehe: 'Boden bis wenige km', reich: 'Funkhorizont (≈ 15 % über der optischen Sicht)', wann: 'immer', baender: '2 m, 70 cm und höher', text: 'Die Welle läuft fast geradlinig und folgt der Erdkrümmung nur ein wenig. Dahinter ist Schluss.' },
  tropo: { name: 'Troposphäre (Inversion)', hoehe: 'Troposphäre (Wetterschicht, bis ≈ 15 km)', reich: '≈ 800 bis über 1000 km', wann: 'oft im Frühjahr und Herbst, Hochdruckwetter', baender: 'VHF/UHF, auch höher', text: 'Warme Luft liegt über kalter (Inversion). An der Grenze zwischen den Schichten werden die Wellen zur Erde zurückgelenkt. Wetterabhängig, aber häufig der Weg für VHF-Weitverbindungen.' },
  es: { name: 'Sporadic-E', hoehe: '≈ 100 bis 110 km (E-Region)', reich: '≈ 1000 bis 2000 km (maximal etwa 2200 km), kleine tote Zone („Short Skip“)', wann: 'meist im Sommer, nicht vorhersagbar', baender: 'oberes Kurzwellenband bis 2 m', text: 'Kleinräumige, außergewöhnlich stark ionisierte Wolken in der E-Region brechen die Wellen zur Erde zurück.' },
  aurora: { name: 'Aurora', hoehe: 'ab ≈ 90 km (E-Region)', reich: 'Richtung Norden, mehrere hundert bis über tausend km', wann: 'bei Sonnenstürmen; polnahe Breiten', baender: 'vor allem 6 m und 2 m', text: 'Teilchen aus dem Sonnenwind ionisieren die Hochatmosphäre nahe den Polen (Polarlicht). Die streuende Schicht bewegt sich ständig: Signale flattern und klingen rau. Im Telegrafie-Rapport steht deshalb A statt T (z. B. 59A).' },
};

export default function mount(stage, { complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const svg = s('svg', { class: 'vz-svg', viewBox: '0 0 360 200', role: 'img', 'aria-label': 'Querschnitt der Atmosphäre mit Funkwellenwegen', style: 'max-width:620px;margin:0 auto;background:var(--surface-2);border:1px solid var(--line);border-radius:12px' });
  root.append(svg);
  const ui = controls(root, [{ id: 'sc', type: 'seg', label: 'Ausbreitung', options: Object.entries(SC).map(([k, v]) => [k, v.name]), value: 'normal' }], run);
  const out = readout(root, [{ id: 'hoehe', label: 'Wo' }, { id: 'reich', label: 'Reichweite', hl: true }, { id: 'wann', label: 'Wann' }, { id: 'baender', label: 'Bänder' }]);
  const note = h('div', { class: 'vz-note' }); root.append(note);
  const g = goals(root, [{ id: 'all', label: 'Alle vier Ausbreitungsarten angesehen' }], () => complete?.());
  const seen = new Set();
  const loop = animate(svg, (dt, t) => draw(t));
  const A = 28, B = 332;           // x der Stationen
  const earthY = x => 168 - 22 * (1 - Math.pow((x - 180) / 180, 2));
  function earth() { let d = `M 0 ${earthY(0)}`; for (let x = 10; x <= 360; x += 10) d += ` L ${x} ${earthY(x).toFixed(1)}`; return d + ' L 360 200 L 0 200 Z'; }
  const ey = earthY;
  function draw(t) {
    const v = ui.values.sc, kids = [];
    // Himmel: Schichten
    kids.push(s('rect', { x: 0, y: 0, width: 360, height: 200, fill: 'color-mix(in oklab, var(--accent) 5%, var(--surface-2))' }));
    kids.push(s('path', { d: earth(), fill: 'color-mix(in oklab, var(--good) 20%, var(--surface))', stroke: 'var(--ink-2)', 'stroke-width': 1.5 }));
    // E-Region-Band oben
    kids.push(s('line', { x1: 0, y1: 36, x2: 360, y2: 36, stroke: 'var(--line-2)', 'stroke-dasharray': '3 5' }), s('text', { x: 6, y: 30, 'font-size': 9, fill: 'var(--muted)' }, 'E-Region (≈ 90–130 km)'));
    kids.push(s('line', { x1: 0, y1: 118, x2: 360, y2: 118, stroke: 'var(--line-2)', 'stroke-dasharray': '3 5' }), s('text', { x: 6, y: 112, 'font-size': 9, fill: 'var(--muted)' }, 'Troposphäre (Wetter, bis ≈ 15 km)'));
    const ya = ey(A) - 8, yb = ey(B) - 8;
    const st = (x, y, lab) => { kids.push(s('line', { x1: x, y1: y + 8, x2: x, y2: y - 10, stroke: 'var(--ink)', 'stroke-width': 3 }), s('circle', { cx: x, cy: y - 12, r: 3, fill: 'var(--accent)' }), s('text', { x, y: y + 22, 'text-anchor': 'middle', 'font-size': 10, fill: 'var(--ink)', 'font-weight': 700 }, lab)); };
    const dash = -t * 30;
    const ray = (d, col = 'var(--accent)') => kids.push(s('path', { d, fill: 'none', stroke: col, 'stroke-width': 2.4, 'stroke-dasharray': '6 5', 'stroke-dashoffset': dash, 'stroke-linecap': 'round' }));
    if (v === 'normal') {
      // Tangenten
      ray(`M ${A} ${ya - 4} Q 150 ${ya - 14} 190 ${ey(190) - 4}`);
      kids.push(s('text', { x: 190, y: ey(190) - 10, 'font-size': 10, fill: 'var(--bad)', 'font-weight': 700 }, 'Funkhorizont'), s('text', { x: 255, y: 82, 'text-anchor': 'middle', 'font-size': 11, fill: 'var(--bad)', 'font-weight': 700 }, 'dahinter: kein Empfang'));
    }
    if (v === 'tropo') {
      kids.push(s('rect', { x: 0, y: 118, width: 360, height: 10, fill: 'color-mix(in oklab, var(--warn) 30%, transparent)' }), s('text', { x: 354, y: 138, 'text-anchor': 'end', 'font-size': 9, fill: 'var(--warn)', 'font-weight': 700 }, 'warme Luft über kalter Luft (Inversion)'));
      ray(`M ${A} ${ya - 4} C 60 125 80 118 120 119 S 250 118 ${B - 8} ${yb - 4}`);
    }
    if (v === 'es') {
      kids.push(s('ellipse', { cx: 180, cy: 42, rx: 38, ry: 6, fill: 'color-mix(in oklab, var(--bad) 30%, transparent)', stroke: 'var(--bad)' }), s('text', { x: 180, y: 58, 'text-anchor': 'middle', 'font-size': 10, fill: 'var(--bad)', 'font-weight': 700 }, 'Sporadic-E-Wolke'));
      ray(`M ${A} ${ya - 4} L 176 42 L ${B} ${yb - 4}`);
    }
    if (v === 'aurora') {
      kids.push(s('path', { d: 'M 150 46 Q 180 14 210 46 Q 195 60 180 40 Q 165 62 150 46 Z', fill: 'color-mix(in oklab, var(--good) 45%, transparent)', stroke: 'var(--good)' }), s('text', { x: 180, y: 72, 'text-anchor': 'middle', 'font-size': 10, fill: 'var(--good)', 'font-weight': 700 }, 'Polarlicht (ionisiert, zuckend)'));
      for (let k = 0; k < 4; k++) { const x1 = 120 + k * 40 + Math.sin(t * 5 + k) * 8; ray(`M ${A} ${ya - 4} L ${x1} 46 L ${B} ${yb - 4}`, k % 2 ? 'var(--accent-2)' : 'var(--accent)'); }
      kids.push(s('text', { x: 354, y: 190, 'text-anchor': 'end', 'font-size': 9, fill: 'var(--muted)' }, 'Richtung Norden →'));
    }
    st(A, ya, 'A'); st(B, yb, 'B');
    svg.replaceChildren(...kids);
  }
  function run() {
    const v = ui.values.sc, c = SC[v];
    out.set({ hoehe: c.hoehe, reich: c.reich, wann: c.wann, baender: c.baender });
    note.textContent = c.text;
    seen.add(v); if (seen.size === 4) g.reach('all');
    loop.once();
  }
  run();
}
