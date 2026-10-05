// D02 Wasseranalogie: Pumpe/Rohr/Engstelle neben dem Stromkreis (Spannungsquelle/Widerstand).
// params: { target?: A (Standard 0,06), tol?: relative Toleranz (Standard 0,03) }
import { drawSchematic } from '../../../assets/js/vizkit/schematic.js';
import { animate } from '../../../assets/js/vizkit/anim.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { fmt } from '../../../assets/js/vizkit/si.js';
import { h, s } from '../../../assets/js/vizkit/base.js';

export default function mount(stage, { params = {}, complete, md }) {
  const target = params.target ?? 0.06, tol = params.tol ?? 0.03;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const pair = h('div', { style: 'display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px;align-items:start' });
  root.append(pair);

  // ── Wasserkreislauf (links) ──
  const W = 300, H = 230;
  const svg = s('svg', { viewBox: `0 0 ${W} ${H}`, class: 'vz-svg', role: 'img', 'aria-label': 'Wasserkreislauf mit Pumpe und Engstelle' });
  pair.append(svg);
  const L = 40, R = 260, T = 50, B = 190;                         // Rohrmitte (Rechteckschleife)
  const pts = [[L, T], [R, T], [R, B], [L, B]];                    // Start oben links, im Uhrzeigersinn
  const segs = []; let total = 0;
  for (let k = 0; k < 4; k++) { const a = pts[k], b = pts[(k + 1) % 4], len = Math.hypot(b[0] - a[0], b[1] - a[1]); segs.push({ a, b, len, s0: total }); total += len; }
  const at = d => { d = ((d % total) + total) % total; for (const g of segs) if (d <= g.s0 + g.len) { const t = (d - g.s0) / g.len; return [g.a[0] + (g.b[0] - g.a[0]) * t, g.a[1] + (g.b[1] - g.a[1]) * t]; } return pts[0]; };
  const W0 = 26;                                                   // normale Rohrbreite
  // Engstelle: oben mittig, Position s ≈ 110…190 (Segment 1: 40..260 → x)
  const cS = 90, cE = 210;                                         // x-Bereich der Engstelle (Segment 1 beginnt bei s = 0 → x = L + s)
  const widthAt = (d, wc) => { d = ((d % total) + total) % total; const x = L + d; if (d > R - L) return W0; if (x < cS - 20 || x > cE + 20) return W0; const e = Math.min(1, Math.min(x - (cS - 20), (cE + 20) - x) / 20); return W0 + (wc - W0) * e; };
  const gPipe = s('g'), gP = s('g');
  const pipe = s('path', { d: `M${L} ${T}H${R}V${B}H${L}Z`, fill: 'none', stroke: 'var(--line-2)', 'stroke-width': W0 + 8, 'stroke-linejoin': 'round' });
  const water = s('path', { d: `M${L} ${T}H${R}V${B}H${L}Z`, fill: 'none', stroke: 'color-mix(in oklab, var(--accent) 22%, white)', 'stroke-width': W0, 'stroke-linejoin': 'round' });
  const choke = s('rect', { x: cS - 10, y: T - W0 / 2 - 5, width: cE - cS + 20, height: W0 + 10, fill: 'var(--surface-2)', stroke: 'none' });
  const narrow = s('rect', { x: cS - 10, y: T - W0 / 2, width: cE - cS + 20, height: W0, fill: 'color-mix(in oklab, var(--accent) 22%, white)' });
  const chokeTop = s('rect', { x: cS, y: T - W0 / 2 - 5, width: cE - cS, height: 10, rx: 3, fill: 'var(--ink-2)' });
  const chokeBot = s('rect', { x: cS, y: T + W0 / 2 - 5, width: cE - cS, height: 10, rx: 3, fill: 'var(--ink-2)' });
  // Pumpe links
  const pump = s('g', {}, s('circle', { cx: L, cy: (T + B) / 2, r: 26, fill: 'var(--surface)', stroke: 'var(--ink)', 'stroke-width': 2.5 }),
    s('path', { d: `M${L - 10} ${(T + B) / 2 + 10}L${L} ${(T + B) / 2 - 12}L${L + 10} ${(T + B) / 2 + 10}`, fill: 'none', stroke: 'var(--ink)', 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }));
  const pumpTxt = s('text', { x: L + 34, y: (T + B) / 2 + 4, 'font-size': 12, fill: 'var(--ink-2)' }, 'Pumpe');
  const gauge = s('rect', { x: W / 2 - 55, y: 112, width: 0, height: 10, rx: 5, fill: 'var(--accent)' });
  const gaugeBg = s('rect', { x: W / 2 - 55, y: 112, width: 110, height: 10, rx: 5, fill: 'var(--line)' });
  const labels = [
    s('text', { x: W / 2, y: 20, 'text-anchor': 'middle', 'font-size': 13, fill: 'var(--ink-2)', 'font-weight': 600 }, 'Wasserkreislauf'),
    s('text', { x: W / 2, y: 96, 'text-anchor': 'middle', 'font-size': 11.5 }, 'Druck (≙ Spannung U)'),
    s('text', { x: W / 2, y: 148, 'text-anchor': 'middle', 'font-size': 11.5 }, 'Durchfluss (≙ Strom I)'),
    s('text', { x: (cS + cE) / 2, y: T - 26, 'text-anchor': 'middle', 'font-size': 11.5 }, 'Engstelle (≙ R)'),
  ];
  const flowTxt = s('text', { x: W / 2, y: 168, 'text-anchor': 'middle', 'font-size': 13, 'font-weight': 600, fill: 'var(--accent)' }, '');
  gPipe.append(pipe, water, choke, narrow, chokeTop, chokeBot);
  svg.append(gPipe, pump, pumpTxt, gaugeBg, gauge, ...labels, flowTxt, gP);
  const N = 46, parts = [];
  for (let k = 0; k < N; k++) { const c = s('circle', { r: 3.1, fill: 'var(--accent)', opacity: 0.85 }); gP.append(c); parts.push({ d: k * total / N, c }); }

  // ── Stromkreis (rechts) ──
  const sch = drawSchematic(pair, {
    title: 'Einfacher Stromkreis', iScale: 1, potential: { range: 12 }, maxWidth: 360,
    parts: [
      { id: 'V1', type: 'V', at: [2, 3], rot: 90, label: 'U', labelPos: 'l' },
      { id: 'R1', type: 'R', at: [6, 3], label: 'R' },
    ],
    wires: [{ pts: ['V1.p', 'R1.a'], net: 'in' }, { pts: ['R1.b', [14, 3], [14, 7], 'V1.n'], net: '0' }],
  });

  const ui = controls(root, [
    { id: 'U', label: 'Pumpendruck „U“', unit: 'V', min: 0, max: 12, step: 0.1, value: 6, digits: 3 },
    { id: 'R', label: 'Engstelle „R“', unit: 'Ω', min: 1, max: 100, value: 20, scale: 'log', snap: 'E24' },
  ], run);
  const out = readout(root, [{ id: 'I', label: 'Strom I', hl: true }, { id: 'P', label: 'Leistung P' }]);
  const g = goals(root, [{ id: 'a', label: `I = ${fmt(target, 'A')} (erste Einstellung)` }, { id: 'b', label: 'dieselbe Stromstärke mit anderem U und R' }], () => complete?.());
  root.append(h('p', { class: 'vz-note', html: 'Die Partikel zeigen die <b>Strömung</b>: mehr Druck → schneller, engere Stelle → langsamer (<i>I = U / R</i>). In der Engstelle fließt das Wasser <i>schneller</i> hindurch, der Durchfluss pro Sekunde bleibt aber überall gleich.' }));

  let first = null, speed = 0, wc = W0;
  function run() {
    const { U, R } = ui.values, I = U / R;
    speed = I > 0 ? 18 + 150 * Math.sqrt(Math.min(1, I / 1)) : 0;   // visuelle Skalierung
    wc = 26 - 17 * (Math.log(R) - Math.log(1)) / (Math.log(100) - Math.log(1));    // Engstelle: R=1 → breit, R=100 → eng
    narrow.setAttribute('y', T - wc / 2); narrow.setAttribute('height', wc); chokeTop.setAttribute('y', T - wc / 2 - 5); chokeBot.setAttribute('y', T + wc / 2 - 5);
    gauge.setAttribute('width', 110 * U / 12);
    flowTxt.textContent = fmt(I, 'A');
    sch.set('V1', { value: U }); sch.set('R1', { value: R });
    sch.setState({ v: { in: U, 0: 0 }, i: { V1: -I, R1: I } });
    out.set({ I: fmt(I, 'A'), P: fmt(U * I, 'W') });
    if (Math.abs(I / target - 1) <= tol && U > 0) {
      if (!first) { first = { U, R }; g.reach('a'); }
      else if (Math.abs(R / first.R - 1) > 0.3) g.reach('b');
    }
  }
  animate(svg, dt => {
    for (const p of parts) {
      const wLoc = widthAt(p.d, wc);
      p.d += speed * (W0 / Math.max(6, wLoc)) * dt;
      const [x, y] = at(p.d); p.c.setAttribute('cx', x.toFixed(1)); p.c.setAttribute('cy', y.toFixed(1));
    }
  });
  run();
}
