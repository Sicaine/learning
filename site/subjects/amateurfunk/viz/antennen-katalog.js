// Antennenformen-Katalog zum Antippen und Erkennungs-Trainer (Skizze → Name). Alle Skizzen sind schematisch.
import { h, s } from '../../../assets/js/vizkit/base.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';

const L = (x1, y1, x2, y2, w = 3, c = 'var(--ink)') => s('line', { x1, y1, x2, y2, stroke: c, 'stroke-width': w, 'stroke-linecap': 'round' });
const dot = (x, y, c = 'var(--accent)', r = 3.5) => s('circle', { cx: x, cy: y, r, fill: c });
const ground = (x, y, w = 24) => [L(x - w / 2, y, x + w / 2, y, 3), L(x - w / 3, y + 5, x + w / 3, y + 5, 2.5), L(x - w / 6, y + 10, x + w / 6, y + 10, 2)];
const ICONS = {
  dipol: () => [L(15, 40, 82, 40), L(98, 40, 165, 40), dot(90, 40), s('text', { x: 90, y: 24, 'text-anchor': 'middle', 'font-size': 11, fill: 'var(--muted)' }, 'λ/2'), L(90, 44, 90, 70, 2, 'var(--accent)')],
  faltdipol: () => [s('rect', { x: 20, y: 34, width: 140, height: 12, rx: 6, fill: 'none', stroke: 'var(--ink)', 'stroke-width': 3 }), dot(90, 46), L(90, 48, 90, 70, 2, 'var(--accent)'), s('text', { x: 90, y: 24, 'text-anchor': 'middle', 'font-size': 11, fill: 'var(--muted)' }, 'Draht ≈ 1 λ')],
  gp: () => [L(90, 14, 90, 46), L(90, 46, 40, 66), L(90, 46, 140, 66), L(90, 46, 60, 72), L(90, 46, 120, 72), dot(90, 46)],
  marconi: () => [L(90, 8, 90, 58), dot(90, 58), ...ground(90, 62, 70), s('text', { x: 98, y: 24, 'font-size': 11, fill: 'var(--muted)' }, 'λ/4')],
  fuenfachtel: () => [L(90, 4, 90, 58), dot(90, 58), ...ground(90, 62, 50), s('text', { x: 98, y: 20, 'font-size': 11, fill: 'var(--muted)' }, '5/8 λ'), L(86, 46, 94, 46, 2, 'var(--warn)')],
  efhw: () => [L(60, 30, 168, 30), dot(60, 30), L(60, 30, 60, 52, 2), s('rect', { x: 36, y: 52, width: 48, height: 18, rx: 4, fill: 'var(--surface)', stroke: 'var(--accent)', 'stroke-width': 2 }), s('text', { x: 60, y: 65, 'text-anchor': 'middle', 'font-size': 9, fill: 'var(--accent)', 'font-weight': 700 }, 'Anpass'), L(14, 61, 36, 61, 2, 'var(--accent)')],
  langdraht: () => [L(30, 62, 40, 36), L(40, 36, 170, 30), dot(30, 62), s('text', { x: 100, y: 22, 'text-anchor': 'middle', 'font-size': 11, fill: 'var(--muted)' }, '> 1 λ'), ...ground(20, 66, 18)],
  windom: () => [L(14, 30, 166, 30), dot(64, 30), L(64, 30, 64, 66, 2, 'var(--accent)')],
  delta: () => [s('polygon', { points: '90,10 150,60 30,60', fill: 'none', stroke: 'var(--ink)', 'stroke-width': 3, 'stroke-linejoin': 'round' }), dot(30, 60), L(30, 62, 30, 72, 2, 'var(--accent)')],
  quad: () => [s('rect', { x: 52, y: 8, width: 76, height: 56, fill: 'none', stroke: 'var(--ink)', 'stroke-width': 3, transform: 'rotate(45 90 36)' }), dot(90, 70), L(90, 70, 90, 76, 2, 'var(--accent)')],
  mag: () => [s('circle', { cx: 90, cy: 34, r: 26, fill: 'none', stroke: 'var(--ink)', 'stroke-width': 3 }), s('circle', { cx: 90, cy: 12, r: 6, fill: 'none', stroke: 'var(--accent)', 'stroke-width': 2 }), s('text', { x: 126, y: 20, 'font-size': 11, fill: 'var(--muted)' }, 'Umfang ≈ λ/10')],
  yagi: () => [L(90, 40, 90, 10, 2, 'var(--muted)'), L(150, 40, 20, 40, 2, 'var(--muted)'), L(30, 14, 30, 66), L(62, 20, 62, 60, 3, 'var(--accent)'), L(94, 22, 94, 58), L(124, 24, 124, 56), L(152, 26, 152, 54)],
  parabol: () => [s('path', { d: 'M 60 8 Q 30 40 60 72', fill: 'none', stroke: 'var(--ink)', 'stroke-width': 4 }), L(60, 40, 120, 40, 2, 'var(--muted)'), dot(114, 40), L(114, 40, 114, 62, 2)],
};
const ANT = {
  dipol: { n: 'Halbwellendipol', ic: 'dipol', d: 'Zwei gleich lange Drahtstücke, zusammen λ/2, in der Mitte gespeist. Symmetrisch, Fußpunktwiderstand ca. 73 Ω (40 bis 90 Ω je nach Höhe). Strahlt quer zum Draht; 2,15 dBi.', tag: 'KW bis UKW' },
  faltdipol: { n: 'Faltdipol', ic: 'faltdipol', d: 'Zur Schleife gefaltet, Drahtlänge ≈ eine Wellenlänge. Symmetrisch, Fußpunktwiderstand ca. 240 bis 300 Ω (viermal der Dipol). Strahler vieler Yagi-Antennen.', tag: 'UKW, Yagi' },
  gp: { n: 'Groundplane', ic: 'gp', d: 'Senkrechter λ/4-Strahler mit mehreren Radials (Gegengewichte). Rundstrahler, vertikal polarisiert, flacher Abstrahlwinkel. Nicht symmetrisch, Fußpunktwiderstand ca. 30 bis 50 Ω.', tag: 'KW, UKW, UHF' },
  marconi: { n: 'Marconi-Antenne', ic: 'marconi', d: 'Gegen Erde erregte λ/4-Vertikalantenne: der Erdboden ersetzt das Gegengewicht. Auch Rundstrahler.', tag: 'Mittelwelle, KW' },
  fuenfachtel: { n: '5/8-λ-Vertikal', ic: 'fuenfachtel', d: 'Länge 0,625 λ, mehr Strahlung zum Horizont: mehr Gewinn als eine λ/4-Antenne. Typisch für den VHF/UHF-Mobilbetrieb.', tag: 'VHF/UHF mobil' },
  efhw: { n: 'Endgespeiste Antenne (Fuchs-Antenne)', ic: 'efhw', d: 'Halbwellendraht, am Ende über ein Anpassglied (z. B. Fuchskreis) gespeist: Spannungsspeisung, hochohmig. Mit Fuchskreis heißt sie Fuchs-Antenne. Länger als λ: Langdraht.', tag: 'KW' },
  langdraht: { n: 'Langdraht-Antenne', ic: 'langdraht', d: 'Endgespeister Draht, länger als eine Wellenlänge. Wird nur im Kurzwellenbereich verwendet, nicht im VHF/UHF-Bereich.', tag: 'nur KW' },
  windom: { n: 'Windom-Antenne', ic: 'windom', d: 'Dipol, der nicht in der Mitte gespeist wird (Speisepunkt versetzt). Mehrbandbetrieb auf KW.', tag: 'KW' },
  delta: { n: 'Delta-Loop', ic: 'delta', d: 'Ganzwellen-Schleife in Form eines Dreiecks: drei gleich lange Drahtstücke, Umfang ≈ λ.', tag: 'KW' },
  quad: { n: 'Quad-Loop', ic: 'quad', d: 'Ganzwellen-Schleife als Quadrat (Cubical Quad), Umfang ≈ λ. Mit mehreren Elementen als Quad-Beam.', tag: 'KW' },
  mag: { n: 'Magnetische Ringantenne', ic: 'mag', d: 'Kleine Schleife (Umfang etwa λ/10) mit starkem magnetischen Nahfeld; Wirkungsgrad im Sendebetrieb gering (1 bis 10 %), aber klein und unempfindlich gegen Umgebung.', tag: 'KW, klein' },
  yagi: { n: 'Yagi-Uda-Antenne', ic: 'yagi', d: 'Richtantenne: Reflektor (länger), Strahler (gespeist) und Direktoren (kürzer). Gespeist wird nur der Strahler.', tag: 'KW, UKW, UHF' },
  parabol: { n: 'Parabolspiegel', ic: 'parabol', d: 'Spiegelkörper plus Erregerantenne (Feed) im Brennpunkt. Für Mikrowellen; Durchmesser mindestens ca. fünf Wellenlängen.', tag: 'Mikrowellen' },
};
const KEYS = Object.keys(ANT);
const icon = k => s('svg', { viewBox: '0 0 180 80', role: 'img', 'aria-label': 'Skizze: ' + ANT[k].n, style: 'width:100%;max-width:300px;background:var(--surface);border:1px solid var(--line);border-radius:10px;display:block;margin:0 auto' }, ...ICONS[ANT[k].ic]());
const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };

export default function mount(stage, { complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const ui = controls(root, [{ id: 'mode', type: 'seg', label: 'Modus', options: [['cat', 'Katalog'], ['quiz', 'Erkennen']], value: 'cat' }], run);
  const body = h('div', { style: 'display:block;padding:14px 16px;border:1px solid var(--line);border-radius:12px;background:var(--surface)' }); root.append(body);
  const out = readout(root, [{ id: 'streak', label: 'Serie', hl: true }, { id: 'n', label: 'Versuche' }]);
  const g = goals(root, [{ id: 'cat', label: 'Alle Antennenformen angesehen' }, { id: 'q', label: '6 Antennen in Folge erkannt' }], () => complete?.());
  const seen = new Set(); let tries = 0, streak = 0, cur = KEYS[0];

  function catalog(sel) {
    cur = sel; seen.add(sel); if (seen.size === KEYS.length) g.reach('cat');
    const chips = h('div', { class: 'vz-seg', style: 'flex-wrap:wrap;margin-bottom:10px' }, ...KEYS.map(k => h('button', { type: 'button', text: ANT[k].n.split(' (')[0], class: k === sel ? 'on' : '', onclick: () => { body.replaceChildren(); catalog(k); } })));
    body.append(chips, icon(sel), h('div', { style: 'margin-top:10px;line-height:1.65', html: `<b>${ANT[sel].n}</b> <small style="color:var(--muted)">· ${ANT[sel].tag}</small><br>${ANT[sel].d}` }));
  }
  function quiz() {
    const k = KEYS[Math.floor(Math.random() * KEYS.length)];
    const opts = shuffle([k, ...shuffle(KEYS.filter(x => x !== k)).slice(0, 3)]);
    const row = h('div', { style: 'display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px;margin-top:10px' });
    const fb = h('div', { class: 'vz-note', style: 'margin-top:10px;min-height:2.4em' });
    for (const o of opts) row.append(h('button', { type: 'button', class: 'btn ghost', text: ANT[o].n, 'data-k': o, onclick: () => {
      tries++; const right = o === k; streak = right ? streak + 1 : 0; if (streak >= 6) g.reach('q');
      for (const b of row.children) { b.disabled = true; if (b.dataset.k === k) b.style.borderColor = 'var(--good)'; }
      fb.innerHTML = (right ? '<b style="color:var(--good)">Richtig.</b> ' : '<b style="color:var(--bad)">Nicht ganz.</b> ') + `<b>${ANT[k].n}</b>: ${ANT[k].d}`;
      out.set({ streak: `${streak} / 6`, n: tries });
      body.append(h('button', { type: 'button', class: 'btn primary', text: 'Weiter', style: 'margin-top:8px', onclick: run }));
    } }));
    body.append(h('div', { style: 'font-weight:600;margin-bottom:8px', text: 'Welche Antennenform zeigt die Skizze?' }), icon(k), row, fb);
  }
  function run() { body.replaceChildren(); if (ui.values.mode === 'cat') catalog(cur); else quiz(); }
  out.set({ streak: '0 / 6', n: 0 });
  run();
}
