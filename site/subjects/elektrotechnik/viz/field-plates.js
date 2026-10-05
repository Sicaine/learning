// Elektrisches Feld zwischen zwei Platten (D16): Feldlinien (analytisch, endliche Platten), E = U/d, Kraft auf eine Probeladung, Durchschlag.
// params: { goals?: ['air', 'ptfe'] }
//   air  — bei 300 V den kleinsten Plattenabstand einstellen, bei dem Luft (≈ 3 kV/mm) noch nicht durchschlägt
//   ptfe — mit PTFE ein Feld oberhalb der Luft-Durchschlagfestigkeit aushalten (Dielektrikum!)
// Das Feldbild stammt aus zwei endlich langen, gleichmäßig geladenen Platten (2D); die Plattenbreite im Bild ist fest,
// der gezeichnete Abstand folgt dem Regler logarithmisch (der echte Wert steht in der Anzeige).
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { animate } from '../../../assets/js/vizkit/anim.js';
import { fmt } from '../../../assets/js/vizkit/si.js';
import { h, s, boxWidth } from '../../../assets/js/vizkit/base.js';

const MAT = {
  air: { label: 'Luft', Ed: 3e6, fill: 'none', note: 'Luft ≈ 3 kV/mm (Näherung)' },
  pe: { label: 'PE-Folie', Ed: 2e7, fill: 'color-mix(in oklab, var(--warn) 14%, transparent)', note: 'Polyethylen ≈ 20 kV/mm (Richtwert)' },
  ptfe: { label: 'PTFE-Folie', Ed: 4e7, fill: 'color-mix(in oklab, var(--accent) 12%, transparent)', note: 'PTFE ≈ 400 kV/cm = 40 kV/mm (Prüfungskatalog EB104)' },
};

// Feld einer geraden Strecke mit gleichmäßiger Linienladung: von x=-1 bis 1 auf der Höhe yp (Einheiten: halbe Plattenbreite)
function segField(x, y, yp, sign) {
  const dy = y - yp, e = 1e-4, d = Math.abs(dy) < e ? (dy < 0 ? -e : e) : dy;
  const a = -1, b = 1;
  const ex = 0.5 * Math.log(((x - a) ** 2 + d * d) / ((x - b) ** 2 + d * d));
  const ey = Math.atan((b - x) / d) - Math.atan((a - x) / d);
  return [sign * ex, sign * ey];
}
function field(x, y, g) {
  const [ax, ay] = segField(x, y, g / 2, 1), [bx, by] = segField(x, y, -g / 2, -1);
  return [ax + bx, ay + by];
}
// Feldlinie von (x0,y0) in Feldrichtung verfolgen, bis die untere Platte erreicht ist oder das Bild verlassen wird
function trace(x0, y0, g, lim) {
  const pts = [[x0, y0]]; let x = x0, y = y0;
  const ds = 0.018;
  for (let k = 0; k < 2200; k++) {
    let [fx, fy] = field(x, y, g); let n = Math.hypot(fx, fy) || 1; fx /= n; fy /= n;
    const [mx, my] = field(x + fx * ds / 2, y + fy * ds / 2, g); n = Math.hypot(mx, my) || 1;
    x += mx / n * ds; y += my / n * ds; pts.push([x, y]);
    if (y <= -g / 2 + 0.006 && Math.abs(x) <= 1.02) break;
    if (Math.abs(x) > lim.x || Math.abs(y) > lim.y) break;
  }
  return pts;
}

export default function mount(stage, { params = {}, complete }) {
  const want = params.goals ?? ['air', 'ptfe'];
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const W = boxWidth(root, 300, 640), H = Math.round(W * 0.6), cx = W / 2, cy = H / 2, PW = Math.min(W * 0.5, 320), S = PW / 2;
  const svg = s('svg', { viewBox: `0 0 ${W} ${H}`, class: 'vz-svg', role: 'img', 'aria-label': 'Feldlinien zwischen zwei geladenen Platten', style: 'width:100%;height:auto;display:block;background:var(--surface-2);border:1px solid var(--line);border-radius:12px' });
  const gDiel = s('g'), gLines = s('g'), gPlates = s('g'), gCharge = s('g'), gSpark = s('g'), gDim = s('g');
  svg.append(gDiel, gLines, gPlates, gCharge, gSpark, gDim);
  const wrap = h('div', {}, svg); root.append(wrap);

  const ui = controls(root, [
    { id: 'U', label: 'Spannung U', unit: 'V', min: 0, max: 1000, value: 100, snap: 10, digits: 4 },
    { id: 'd', label: 'Plattenabstand d', unit: 'm', min: 2e-5, max: 2e-2, value: 5e-3, scale: 'log', snap: 'E12', format: v => fmt(v * 1e3, 'mm') },
    { id: 'mat', type: 'seg', label: 'Zwischenraum', options: Object.entries(MAT).map(([k, m]) => [k, m.label]), value: 'air' },
    { id: 'q', type: 'seg', label: 'Probeladung', options: [[1e-9, '+1 nC'], [1e-6, '+1 µC']], value: 1e-6 },
  ], draw);
  const out = readout(root, [
    { id: 'E', label: 'E = U/d', hl: true }, { id: 'F', label: 'Kraft F = q·E' }, { id: 'Ed', label: 'Durchschlagfestigkeit' }, { id: 'use', label: 'Auslastung' },
  ]);
  const note = h('p', { class: 'vz-note', 'aria-live': 'polite' }); root.append(note);
  const gl = [];
  if (want.includes('air')) gl.push({ id: 'air', label: 'Luft, 300 V: kleinster Abstand ohne Funken' });
  if (want.includes('ptfe')) gl.push({ id: 'ptfe', label: 'PTFE hält mehr aus als Luft' });
  const g = gl.length ? goals(root, gl, () => complete?.()) : null;

  let breakdown = false, sparkT = 0, sparkD = '';
  const arrowDef = s('defs', {}, s('marker', { id: 'fp-arr', viewBox: '0 0 10 10', refX: 8, refY: 5, markerWidth: 6, markerHeight: 6, orient: 'auto-start-reverse' }, s('path', { d: 'M0 0L10 5L0 10z', fill: 'var(--accent)' })),
    s('marker', { id: 'fp-force', viewBox: '0 0 10 10', refX: 8, refY: 5, markerWidth: 6, markerHeight: 6, orient: 'auto' }, s('path', { d: 'M0 0L10 5L0 10z', fill: 'var(--warn)' })));
  svg.prepend(arrowDef);

  let gDraw = -1, lineCache = null;
  function visGap(d) { const t = Math.log(d / 2e-5) / Math.log(2e-2 / 2e-5); return 0.12 * W + t * 0.2 * W; }   // Pixel
  function layout(g) {   // Feldlinien neu berechnen (nur wenn sich der gezeichnete Abstand ändert)
    const lim = { x: (W / 2 - 6) / S, y: (H / 2 - 6) / S }, out = [];
    const inN = 15, ep = 0.012;
    for (let i = 0; i < inN; i++) { const x = -0.96 + 1.92 * i / (inN - 1); out.push({ pts: trace(x, g / 2 - ep, g, lim), inner: true, x }); }
    for (const x of [-1.0, -0.75, -0.45, -0.15, 0.15, 0.45, 0.75, 1.0]) out.push({ pts: trace(x, g / 2 + ep, g, lim), inner: false, x });
    return out;
  }
  function draw() {
    const v = ui.values, mat = MAT[v.mat], E = v.U / v.d, gpx = visGap(v.d), gu = gpx / S;
    breakdown = E > mat.Ed * 1.0001;
    if (gDraw !== Math.round(gpx)) { gDraw = Math.round(gpx); lineCache = layout(gu); }
    const px = (x, y) => [cx + x * S, cy - y * S];
    // Dielektrikum
    gDiel.replaceChildren(s('rect', { x: cx - S, y: cy - gpx / 2, width: PW, height: gpx, fill: mat.fill }));
    // Feldlinien
    gLines.replaceChildren();
    if (v.U > 0) {
      const dens = Math.min(1, 0.35 + v.U / 400);
      for (const L of lineCache) {
        const d = L.pts.map((p, k) => (k ? 'L' : 'M') + px(p[0], p[1]).map(n => n.toFixed(1)).join(' ')).join('');
        gLines.append(s('path', { d, fill: 'none', stroke: 'var(--accent)', 'stroke-width': 1.6, opacity: (L.inner ? 0.85 : 0.55) * dens, 'stroke-linecap': 'round' }));
        const k = Math.floor(L.pts.length * 0.5), a = px(L.pts[k][0], L.pts[k][1]), b = px(L.pts[k + 1][0], L.pts[k + 1][1]);
        gLines.append(s('path', { d: `M${a[0].toFixed(1)} ${a[1].toFixed(1)}L${b[0].toFixed(1)} ${b[1].toFixed(1)}`, stroke: 'var(--accent)', 'stroke-width': 1.6, opacity: dens, 'marker-end': 'url(#fp-arr)' }));
      }
    }
    // Platten
    gPlates.replaceChildren(
      s('rect', { x: cx - S, y: cy - gpx / 2 - 9, width: PW, height: 9, rx: 2, fill: 'var(--bad)' }),
      s('rect', { x: cx - S, y: cy + gpx / 2, width: PW, height: 9, rx: 2, fill: 'var(--accent)' }),
      s('text', { x: cx - S - 10, y: cy - gpx / 2 - 2, 'text-anchor': 'end', style: 'font:700 15px var(--sans)', fill: 'var(--bad)' }, '+'),
      s('text', { x: cx - S - 10, y: cy + gpx / 2 + 14, 'text-anchor': 'end', style: 'font:700 18px var(--sans)', fill: 'var(--accent)' }, '−'));
    // Probeladung + Kraftpfeil (Länge logarithmisch skaliert)
    gCharge.replaceChildren();
    if (!breakdown) {
      const qx = cx + S * 0.45, qy = cy - gpx * 0.18;
      gCharge.append(s('circle', { cx: qx, cy: qy, r: 9, fill: 'var(--bad)' }), s('text', { x: qx, y: qy + 4, 'text-anchor': 'middle', style: 'font:700 11px var(--sans)', fill: '#fff' }, '+q'));
      if (E > 0) {
        const len = Math.max(8, Math.min(gpx * 0.5, 10 + 8 * (Math.log10(E) - 1)));
        gCharge.append(s('line', { x1: qx, y1: qy + 11, x2: qx, y2: qy + 11 + len, stroke: 'var(--warn)', 'stroke-width': 3.2, 'marker-end': 'url(#fp-force)' }),
          s('text', { x: qx + 12, y: qy + 16 + len / 2, style: 'font:600 12px var(--sans)', fill: 'var(--warn)' }, 'F'));
      }
    }
    // Maßpfeil d
    gDim.replaceChildren(
      s('line', { x1: cx + S + 16, x2: cx + S + 16, y1: cy - gpx / 2, y2: cy + gpx / 2, stroke: 'var(--ink-2)', 'stroke-width': 1.2, 'marker-start': 'url(#fp-arr)', 'marker-end': 'url(#fp-arr)' }),
      s('text', { x: cx + S + 24, y: cy + 4, style: 'font:600 12px var(--mono)', fill: 'var(--ink-2)' }, 'd'),
      s('text', { x: cx, y: H - 10, 'text-anchor': 'middle', style: 'font:500 12px var(--sans)', fill: 'var(--muted)' }, 'Abstand im Bild logarithmisch gestreckt'));
    out.set({
      E: E === 0 ? '0 V/m' : fmt(E, 'V/m'), F: fmt(v.q * E, 'N'), Ed: fmt(mat.Ed, 'V/m'), use: Math.round(E / mat.Ed * 100) + ' %',
    });
    out.hl('use', breakdown);
    note.textContent = breakdown ? `Durchschlag! E = ${fmt(E, 'V/m')} liegt über der Durchschlagfestigkeit (${mat.note}). Das Dielektrikum wird leitend, es kommt zum Funken.` : mat.note + (E > 0 ? `. Das Feld ist zwischen den Platten (fast) homogen: überall gleich stark, senkrecht zu den Platten.` : '. Ohne Spannung gibt es kein Feld.');
    gSpark.replaceChildren(); sparkT = 0;
    loop.once?.();
    if (g) {
      if (v.mat === 'air' && Math.abs(v.U - 300) < 1 && !breakdown && v.d <= 0.12e-3 * 1.001) g.reach('air');
      if (v.mat === 'ptfe' && E > MAT.air.Ed && !breakdown) g.reach('ptfe');
    }
  }
  const loop = animate(svg, dt => {
    if (!breakdown) { if (gSpark.firstChild) gSpark.replaceChildren(); return; }
    sparkT -= dt; if (sparkT > 0) return; sparkT = 0.09;
    const v = ui.values, gpx = visGap(v.d), x = cx + (Math.random() - 0.5) * PW * 0.7;
    let d = `M${x.toFixed(1)} ${(cy - gpx / 2).toFixed(1)}`; const n = 7;
    for (let i = 1; i <= n; i++) d += `L${(x + (i < n ? (Math.random() - 0.5) * 26 : 0)).toFixed(1)} ${(cy - gpx / 2 + gpx * i / n).toFixed(1)}`;
    gSpark.replaceChildren(s('path', { d, fill: 'none', stroke: 'var(--warn)', 'stroke-width': 5, opacity: 0.35, 'stroke-linejoin': 'round' }), s('path', { d, fill: 'none', stroke: '#fff7c2', 'stroke-width': 2, 'stroke-linejoin': 'round' }));
  });
  draw();
}
