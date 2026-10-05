// EMV-Fallentscheider: Nachbar meldet Störungen. Station vorschriftsmäßig? Feldstärke am Gerät über/unter der Störfestigkeitsgrenze der Norm?
// → welcher der drei Fälle liegt vor, was darf die Bundesnetzagentur (EMVG, AFuG § 7, AFuV § 17). Quelle: DARC 50ohm.de (CC BY 4.0), AFuG, EMVG.
// params: { goals?: ['f1','f2','f3'] }
import { h, s } from '../../../assets/js/vizkit/base.js';
import { controls, goals } from '../../../assets/js/vizkit/controls.js';

const FALLS = {
  f1: { title: 'Fall 1: Deine Station verletzt die Vorschriften', col: 'var(--bad)',
    txt: 'Die unerwünschten Aussendungen sind zu stark (z. B. eine Oberwelle im UKW-Rundfunkbereich). **Du** musst abhelfen, und die Bundesnetzagentur darf **kostenpflichtig** eine Betriebseinschränkung anordnen, zum Beispiel eine Leistungsbegrenzung.' },
  f2: { title: 'Fall 2: Das Gerät ist nicht störfest genug', col: 'var(--good)',
    txt: 'Deine Station ist in Ordnung, und die Feldstärke am Gerät liegt **unter** dem Wert, den ein Gerät nach Norm aushalten muss. Die Ursache ist die mangelnde Störfestigkeit des Geräts: Verantwortlich ist sein **Betreiber**. **Du darfst deinen Funkbetrieb unverändert fortsetzen.**' },
  f3: { title: 'Fall 3: Konfliktfall, beide Seiten korrekt', col: 'var(--warn)',
    txt: 'Deine Station ist vorschriftsmäßig, das Gerät hält seine Störfestigkeit ein, und trotzdem stört dein Feld. Hier ist die Bundesnetzagentur befugt, **Abhilfemaßnahmen in Zusammenarbeit mit allen Beteiligten** zu veranlassen. Ein automatisches Bußgeld, ein Betriebsverbot oder der Entzug der Zulassung folgen daraus **nicht**.' },
};

import { adaptive } from './_fit.js';

export default function mount(stage, opts) { adaptive(stage, W => build(stage, opts, W)); }

function build(stage, { params = {}, complete, md }, W) {
  const need = params.goals ?? ['f1', 'f2', 'f3'];
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const H = 236;
  const svg = s('svg', { class: 'vz-svg', viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': 'Amateurfunkstation links, gestörter Fernseher beim Nachbarn rechts, darunter eine Skala der Feldstärke relativ zum Störfestigkeits-Grenzwert' });
  root.append(svg);
  const ui = controls(root, [
    { id: 'ok', type: 'toggle', label: 'Deine Amateurfunkstelle wird vorschriftsmäßig betrieben (unerwünschte Aussendungen innerhalb der Grenzwerte)', value: true },
    { id: 'db', label: 'Feldstärke deiner Station am gestörten Gerät, bezogen auf den Störfestigkeits-Grenzwert der Norm', min: -30, max: 30, value: -12, step: 1, format: v => (v > 0 ? '+' : v < 0 ? '−' : '±') + Math.abs(v) + ' dB', wide: true },
  ], run);
  const verdict = h('div', { class: 'vz-note', style: 'font-size:1rem;line-height:1.55;padding:12px 14px;border-radius:10px;border:2px solid var(--line);background:#fff;margin-top:6px' });
  root.append(verdict);
  const g = goals(root, [
    { id: 'f1', label: 'Fall 1 gefunden' }, { id: 'f2', label: 'Fall 2 gefunden' }, { id: 'f3', label: 'Fall 3 gefunden' },
  ].filter(x => need.includes(x.id)), () => complete?.());

  function which(v) { return !v.ok ? 'f1' : v.db <= 0 ? 'f2' : 'f3'; }
  function run(_, id) {
    const act = !!id;
    const v = ui.values, k = which(v), F = FALLS[k];
    const m = 16, x = db => m + (db + 30) / 60 * (W - 2 * m);
    const X = x(v.db), L = 52, R = W - 52;
    const house = (cx, tv) => [
      s('rect', { x: cx - 30, y: 76, width: 60, height: 46, fill: 'var(--surface)', stroke: 'var(--ink-2)', 'stroke-width': 1.5 }),
      s('polygon', { points: `${cx - 36},76 ${cx},48 ${cx + 36},76`, fill: 'var(--surface)', stroke: 'var(--ink-2)', 'stroke-width': 1.5 }),
      tv ? s('rect', { x: cx - 18, y: 86, width: 36, height: 24, rx: 3, fill: '#222', stroke: 'var(--bad)', 'stroke-width': 2 }) : null,
      tv ? s('text', { x: cx, y: 103, 'text-anchor': 'middle', 'font-size': 13, fill: 'var(--bad)', 'font-weight': 700 }, '#%&') : null,
    ];
    const nWaves = Math.max(2, Math.floor((R - L - 90) / 38));
    svg.replaceChildren(
      s('rect', { x: 0, y: 0, width: W, height: H, fill: 'var(--surface-2)' }),
      s('line', { x1: L, y1: 48, x2: L, y2: 16, stroke: 'var(--ink)', 'stroke-width': 3 }), s('line', { x1: L - 12, y1: 24, x2: L + 12, y2: 24, stroke: 'var(--ink)', 'stroke-width': 2.5 }),
      ...house(L, false), ...house(R, true),
      s('text', { x: 6, y: 144, 'font-size': 13, fill: 'var(--ink)', 'font-weight': 700 }, 'Deine Station'),
      s('text', { x: 6, y: 160, 'font-size': 12, fill: v.ok ? 'var(--good)' : 'var(--bad)', 'font-weight': 600 }, v.ok ? 'vorschriftsmäßig' : 'Grenzwerte verletzt'),
      s('text', { x: W - 6, y: 144, 'text-anchor': 'end', 'font-size': 13, fill: 'var(--ink)', 'font-weight': 700 }, 'Nachbar: TV gestört'),
      ...Array.from({ length: nWaves }, (_, i) => s('path', { d: `M ${L + 56 + i * 38} 62 q 12 18 0 36`, fill: 'none', stroke: v.db > 0 || !v.ok ? 'var(--accent)' : 'var(--accent-2)', 'stroke-width': 2.2, opacity: Math.max(.25, .9 - i * .15) })),
      s('rect', { x: m, y: 186, width: x(0) - m, height: 12, fill: 'var(--good)', opacity: .35 }),
      s('rect', { x: x(0), y: 186, width: W - m - x(0), height: 12, fill: 'var(--bad)', opacity: .3 }),
      s('line', { x1: x(0), y1: 178, x2: x(0), y2: 206, stroke: 'var(--ink)', 'stroke-width': 2 }),
      s('text', { x: x(0), y: 172, 'text-anchor': 'middle', 'font-size': 12, fill: 'var(--ink)', 'font-weight': 700 }, 'Grenzwert der Norm'),
      s('text', { x: m, y: 216, 'font-size': 11.5, fill: 'var(--muted)' }, '− Feld kleiner'),
      s('text', { x: W - m, y: 216, 'text-anchor': 'end', 'font-size': 11.5, fill: 'var(--muted)' }, 'Feld größer +'),
      s('polygon', { points: `${X - 8},210 ${X + 8},210 ${X},198`, fill: 'var(--ink)' }),
      s('text', { x: Math.min(W - 30, Math.max(30, X)), y: 230, 'text-anchor': 'middle', 'font-size': 12.5, fill: 'var(--ink)', 'font-weight': 700 }, (v.db > 0 ? '+' : v.db < 0 ? '−' : '±') + Math.abs(v.db) + ' dB'),
    );
    verdict.style.borderColor = F.col;
    verdict.innerHTML = `<b style="color:${F.col}">${F.title}</b><br>${md(F.txt)}`;
    if (act && need.includes(k)) g.reach(k);
  }
  run();
  stage._test = { ui, run };
}
