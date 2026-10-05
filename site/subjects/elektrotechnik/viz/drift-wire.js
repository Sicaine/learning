// D03 Driftgeschwindigkeit: Elektronen im Kupferdraht, v = I / (n·e·A). Schalter ein → Lampe sofort an, Elektronen kaum von der Stelle.
// params: {} (n_Cu = 8,5·10²⁸ m⁻³ fest)
import { animate } from '../../../assets/js/vizkit/anim.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { fmt } from '../../../assets/js/vizkit/si.js';
import { h, s } from '../../../assets/js/vizkit/base.js';

const N_CU = 8.5e28, E = 1.602e-19;
const de = (x, d = 3) => x.toPrecision(d).replace('.', ',');
/** v in mm/s als lesbarer String */
const vText = v => { const mm = v * 1e3; return mm >= 0.1 ? de(mm, 2) + ' mm/s' : mm >= 1e-4 ? de(mm * 1e3, 2) + ' µm/s' : de(mm * 1e6, 2) + ' nm/s'; };

export default function mount(stage, { params = {}, complete, md }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const W = 640, H = 250;
  const svg = s('svg', { viewBox: `0 0 ${W} ${H}`, class: 'vz-svg', role: 'img', 'aria-label': 'Elektronen im Draht, Schalter und Lampe' });
  root.append(svg);
  const x0 = 70, x1 = 520, cy = 120;
  const wire = s('rect', { x: x0, y: cy - 30, width: x1 - x0, height: 60, rx: 8, fill: 'color-mix(in oklab, var(--warn) 18%, white)', stroke: 'var(--ink-2)', 'stroke-width': 2 });
  const lead1 = s('path', { d: `M${x0 - 40} ${cy}H${x0}`, stroke: 'var(--ink-2)', 'stroke-width': 3, fill: 'none' });
  const lamp = s('g', {}, s('circle', { cx: 578, cy, r: 42, fill: 'none', stroke: 'var(--ink-2)', 'stroke-width': 3 }), s('path', { d: 'M560 140L596 100M560 100L596 140', stroke: 'var(--ink-2)', 'stroke-width': 3 }));
  const glow = s('circle', { cx: 578, cy, r: 62, fill: 'var(--warn)', opacity: 0 });
  const lead2 = s('path', { d: `M${x1} ${cy}H536`, stroke: 'var(--ink-2)', 'stroke-width': 3, fill: 'none' });
  const sw = s('path', { d: `M30 ${cy}L${x0 - 40} ${cy}`, stroke: 'var(--ink-2)', 'stroke-width': 3 });
  svg.append(glow, wire, lead1, lead2, lamp);
  const t1 = s('text', { x: x0 + 8, y: cy - 38, 'font-size': 12, 'font-weight': 600 }, 'Kupferdraht, 1 m lang (hier ein kurzes Stück)');
  const cs = s('text', { x: (x0 + x1) / 2, y: cy + 54, 'text-anchor': 'middle', 'font-size': 12 }, '');
  const mark = s('text', { x: 0, y: 0, 'font-size': 11, fill: 'var(--bad)', 'font-weight': 600 }, 'markiertes Elektron');
    const gE = s('g'); svg.append(t1, cs, gE, mark);
  const note = s('text', { x: 14, y: 232, 'font-size': 11.5 }, 'Animation stark überhöht: tatsächlich wäre die Drift unsichtbar langsam.');
  svg.append(note);

  const ui = controls(root, [
    { id: 'I', label: 'Strom I', unit: 'A', min: 0.1, max: 10, value: 1, scale: 'log' },
    { id: 'A', label: 'Querschnitt A', unit: 'mm²', min: 0.5, max: 10, value: 1, values: [0.5, 0.75, 1, 1.5, 2.5, 4, 6, 10], format: v => de(v, 3).replace(/,?0+$/, '') + ' mm²' },
    { id: 'sw', type: 'toggle', label: 'Schalter (Lampe)', value: false },
  ], run);
  const out = readout(root, [{ id: 'v', label: 'Driftgeschwindigkeit v', hl: true }, { id: 'm', label: '1 m zurücklegen dauert' }, { id: 'c', label: 'Signal: 1 m in ca.' }, { id: 't', label: 'seit Einschalten' }]);
  const g = goals(root, [{ id: 'on', label: 'Schalter einschalten' }, { id: 'fast', label: 'v über 1 mm/s einstellen' }, { id: 'slow', label: 'v unter 0,01 mm/s einstellen' }], () => complete?.());
  const info = h('p', { class: 'vz-note' }); root.append(info);

  const els = Array.from({ length: 70 }, () => ({ x: x0 + 8 + Math.random() * (x1 - x0 - 16), y: cy - 24 + Math.random() * 48, c: s('circle', { r: 3, fill: 'var(--accent)' }) }));
  els.forEach(e => gE.append(e.c));
  const me = els[20]; me.c.setAttribute('r', 5); me.c.setAttribute('fill', 'var(--bad)'); me.y = cy;
  let v = 0, driftVis = 0, tOn = 0, startX = me.x, driftSinceOn = 0;

  function run() {
    const { I, A, sw } = ui.values;
    v = I / (N_CU * E * A * 1e-6);                       // m/s
    driftVis = 6 * Math.sqrt(v * 1e3);                   // px/s (überhöht)
    glow.setAttribute('opacity', sw ? 0.45 : 0); lamp.firstChild.setAttribute('fill', sw ? 'color-mix(in oklab, var(--warn) 55%, white)' : 'none');
    cs.textContent = `A = ${de(A, 3).replace(/,?0+$/, '')} mm²`;
    wire.setAttribute('height', 30 + 8 * Math.sqrt(A)); wire.setAttribute('y', cy - (30 + 8 * Math.sqrt(A)) / 2);
    if (sw && !tOn) { tOn = 0.0001; driftSinceOn = 0; g.reach('on'); }
    if (!sw) { tOn = 0; driftSinceOn = 0; }
    out.set({ v: vText(v), m: fmtTime(1 / v), c: '≈ 5 ns' });
    if (v > 1e-3) g.reach('fast'); if (v < 1e-5) g.reach('slow');
    info.innerHTML = md(sw
      ? `Die Lampe leuchtet **sofort** — das elektrische Feld läuft fast mit Lichtgeschwindigkeit ($c \\approx 3\\cdot10^8$ m/s) durch den Draht, und alle Elektronen setzen sich gleichzeitig in Bewegung. Das rot markierte Elektron aber hat sich in dieser Zeit nur ${vText(v)} × t weit bewegt (siehe „seit Einschalten“).`
      : `Noch aus: Schalte ein und beobachte das rot markierte Elektron. Kupfer hat etwa $n = 8{,}5\\cdot10^{28}\\ \\mathrm{m^{-3}}$ freie Elektronen — deshalb genügt eine winzige Drift für große Ströme: $v = \\dfrac{I}{n\\,e\\,A}$.`);
  }
  const fmtTime = sec => sec < 120 ? de(sec, 3) + ' s' : sec < 7200 ? de(sec / 60, 3) + ' min' : sec < 172800 ? de(sec / 3600, 3) + ' h' : de(sec / 86400, 3) + ' Tage';
  animate(svg, dt => {
    const sw = ui.values.sw;
    for (const e of els) {
      e.x += (Math.random() - 0.5) * 4 + (sw ? driftVis * dt : 0); e.y += (Math.random() - 0.5) * 5;
      const hh = 14 + 4 * Math.sqrt(ui.values.A);
      if (e.y < cy - hh) e.y = cy - hh; if (e.y > cy + hh) e.y = cy + hh;
      if (e.x > x1 - 8) e.x -= (x1 - x0 - 16); if (e.x < x0 + 8) e.x = x0 + 8;
      if (e === me) { e.y = cy; }
      e.c.setAttribute('cx', e.x.toFixed(1)); e.c.setAttribute('cy', e.y.toFixed(1));
    }
    if (sw && tOn) {
      tOn += dt; driftSinceOn += v * dt;
      out.set({ t: `${de(tOn, 3)} s · Elektron: ${de(driftSinceOn * 1e3, 2)} mm` });
      mark.setAttribute('x', me.x + 8); mark.setAttribute('y', cy + 24);
    } else { out.set({ t: '—' }); mark.setAttribute('x', me.x + 8); mark.setAttribute('y', cy + 24); }
  });
  run();
}
