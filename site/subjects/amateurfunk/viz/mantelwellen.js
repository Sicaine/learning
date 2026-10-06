// Mantelwellen: Koaxkabel an einem symmetrischen Dipol. Ströme I₁ (Innenleiter), I₂ (Innenseite des Schirms), I₃ (Außenseite = Mantelstrom).
// Ohne Symmetrierung fließt ein Teil des Dipolstroms außen auf dem Schirm zurück (I₁ = I₂ + I₃); Balun oder Mantelwellensperre unterdrücken I₃.
import { h, s } from '../../../assets/js/vizkit/base.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { animate } from '../../../assets/js/vizkit/anim.js';

const MODES = { none: { label: 'ohne Symmetrierung', i3: 0.42 }, balun: { label: 'Balun (Symmetrierglied)', i3: 0.03 }, choke: { label: 'Mantelwellensperre (Ferrit)', i3: 0.04 } };

export default function mount(stage, { complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const svg = s('svg', { class: 'vz-svg', viewBox: '0 0 360 300', role: 'img', 'aria-label': 'Dipol mit Koaxkabel und den Strömen I1, I2 und I3', style: 'max-width:520px;margin:0 auto;background:var(--surface-2);border:1px solid var(--line);border-radius:12px' });
  root.append(svg);
  const ui = controls(root, [{ id: 'mode', type: 'seg', label: 'Anschluss des Koaxkabels', options: Object.entries(MODES).map(([k, m]) => [k, m.label]), value: 'none' }], run);
  const out = readout(root, [{ id: 'i3', label: 'Mantelstrom I₃ im Verhältnis zu I₁', hl: true }, { id: 'pat', label: 'Richtdiagramm' }, { id: 'ef', label: 'Wirkung' }]);
  const g = goals(root, [
    { id: 'all', label: 'Alle drei Anschlussarten angesehen' },
    { id: 'tap', label: 'Mantelstrom I₃ in der Zeichnung angetippt' },
  ], () => complete?.());
  const seen = new Set();
  const loop = animate(svg, (dt, t) => draw(t));
  let tapped = false;

  function arrow(x, y1, y2, col, w, label, anchor, id) {
    const dir = y2 > y1 ? 1 : -1, tip = y2;
    const grp = s('g', { style: id ? 'cursor:pointer' : '' });
    grp.append(s('line', { x1: x, y1, x2: x, y2: tip - dir * 7, stroke: col, 'stroke-width': w, 'stroke-linecap': 'round' }),
      s('path', { d: `M ${x - 5 - w / 2} ${tip - dir * 9} L ${x} ${tip} L ${x + 5 + w / 2} ${tip - dir * 9} z`, fill: col }));
    if (label) grp.append(s('text', { x: x + (anchor === 'start' ? 12 : -12), y: (y1 + y2) / 2 + 3, 'text-anchor': anchor, 'font-size': 11, fill: col, 'font-weight': 800 }, label));
    if (id) { grp.append(s('rect', { x: x - 20, y: Math.min(y1, y2), width: 40, height: Math.abs(y2 - y1), fill: 'transparent' })); grp.addEventListener('click', () => { tapped = true; g.reach('tap'); run(); }); }
    return grp;
  }
  function draw(t) {
    const m = MODES[ui.values.mode], i3 = m.i3, i2 = 1 - i3;
    const kids = [];
    const cx = 160, fy = 58, top = fy + 6, bot = fy + 190;
    // Dipolarme: links am Innenleiter, rechts am Schirm
    kids.push(s('line', { x1: 24, y1: fy, x2: cx, y2: fy, stroke: 'var(--ink)', 'stroke-width': 5, 'stroke-linecap': 'round' }), s('line', { x1: cx + 15, y1: fy, x2: 336, y2: fy, stroke: 'var(--ink)', 'stroke-width': 5, 'stroke-linecap': 'round' }));
    kids.push(s('text', { x: 24, y: fy - 10, 'font-size': 10, fill: 'var(--muted)' }, `Dipolarm: ${100} % von I₁`), s('text', { x: 336, y: fy - 10, 'text-anchor': 'end', 'font-size': 10, fill: 'var(--muted)' }, `Dipolarm: ${(i2 * 100).toFixed(0)} % von I₁`));
    // Koaxkabel: Schirm als Rohr, Innenleiter in der Mitte
    kids.push(s('rect', { x: cx - 15, y: top, width: 30, height: bot - top, fill: 'var(--surface)', stroke: 'var(--ink-2)', 'stroke-width': 2.5 }));
    kids.push(s('line', { x1: cx, y1: fy, x2: cx, y2: bot, stroke: 'var(--ink)', 'stroke-width': 2 }));
    // Balun-Kasten bzw. Ferritkern
    if (ui.values.mode === 'balun') kids.push(s('rect', { x: cx - 30, y: top + 10, width: 60, height: 32, rx: 6, fill: 'color-mix(in oklab, var(--good) 14%, var(--surface))', stroke: 'var(--good)', 'stroke-width': 2 }), s('text', { x: cx, y: top + 31, 'text-anchor': 'middle', 'font-size': 11, fill: 'var(--good)', 'font-weight': 800 }, 'Balun'));
    if (ui.values.mode === 'choke') { for (let k = 0; k < 3; k++) kids.push(s('ellipse', { cx, cy: top + 24 + k * 12, rx: 22, ry: 7, fill: 'none', stroke: 'var(--good)', 'stroke-width': 3 })); kids.push(s('text', { x: cx - 30, y: top + 44, 'text-anchor': 'end', 'font-size': 10, fill: 'var(--good)', 'font-weight': 800 }, 'Ferritkern')); }
    // Funkgerät
    kids.push(s('rect', { x: cx - 40, y: bot + 2, width: 80, height: 28, rx: 6, fill: 'var(--surface)', stroke: 'var(--ink-2)' }), s('text', { x: cx, y: bot + 20, 'text-anchor': 'middle', 'font-size': 11, fill: 'var(--ink)', 'font-weight': 700 }, 'Funkgerät'));
    // Ströme
    const w = k => 1.5 + 4 * k;
    kids.push(arrow(cx, top + 150, top + 56, 'var(--accent)', w(1), null));
    kids.push(s('text', { x: cx - 22, y: top + 104, 'text-anchor': 'end', 'font-size': 12, fill: 'var(--accent)', 'font-weight': 800 }, 'I₁ (Innenleiter)'));
    kids.push(arrow(cx + 9, top + 56, top + 150, 'var(--accent-2)', w(i2), null));
    kids.push(s('text', { x: cx - 22, y: top + 124, 'text-anchor': 'end', 'font-size': 12, fill: 'var(--accent-2)', 'font-weight': 800 }, 'I₂ (Schirm innen)'));
    const phase = (t * 40) % 20;
    if (i3 > 0.1) {
      kids.push(arrow(cx + 34, top + 30, top + 160, 'var(--bad)', w(i3), null, 'start', 'i3'));
      kids.push(s('text', { x: cx + 46, y: top + 90, 'font-size': 12, fill: 'var(--bad)', 'font-weight': 800 }, 'I₃ Mantelstrom'));
      for (let k = 0; k < 3; k++) { const r = 20 + k * 14 + phase * 0.5; kids.push(s('path', { d: `M ${cx + 40} ${top + 95 - r * 0.8} A ${r} ${r} 0 0 1 ${cx + 40} ${top + 95 + r * 0.8}`, fill: 'none', stroke: 'var(--bad)', 'stroke-width': 1.4, 'stroke-dasharray': '3 4', opacity: Math.max(0.1, 0.8 - k * 0.2 - phase * 0.015), transform: `translate(${r * 0.35} 0)` })); }
      kids.push(s('text', { x: cx + 46, y: top + 108, 'font-size': 10, fill: 'var(--bad)' }, 'strahlt mit, stört,'), s('text', { x: cx + 46, y: top + 121, 'font-size': 10, fill: 'var(--bad)' }, 'fängt Störungen ein'));
    } else {
      kids.push(arrow(cx + 34, top + 30, top + 160, 'var(--good)', 1.5, null, 'start', 'i3'));
      kids.push(s('text', { x: cx + 46, y: top + 90, 'font-size': 12, fill: 'var(--good)', 'font-weight': 800 }, 'I₃ ≈ 0'), s('text', { x: cx + 46, y: top + 106, 'font-size': 10, fill: 'var(--muted)' }, 'Schirm außen stromlos'));
    }
    svg.replaceChildren(...kids);
  }
  function run() {
    const v = ui.values, m = MODES[v.mode];
    seen.add(v.mode); if (seen.size === 3) g.reach('all');
    out.set({ i3: m.i3 > 0.1 ? 'groß: etwa 40 %' : 'klein, nahezu null', pat: m.i3 > 0.1 ? 'verformt (Kabel strahlt mit)' : 'sauber (nur die Antenne strahlt)', ef: m.i3 > 0.1 ? 'Störungen im Haus und im eigenen Empfang' : 'Kabel bleibt „unsichtbar“' });
    loop.once();
  }
  run();
}
