// Gemeinsame Helfer für die Funktechnik-Demos (Amateurfunk, Etappen 5 und 6): Zahlenformat, SVG-Diagramm, Rauschen.
import { h, s, boxWidth } from '../../../assets/js/vizkit/base.js';

export { h, s };
export const dec = (x, d = 1) => (+x).toFixed(d).replace('.', ',');
export const trimDec = (x, d = 4) => String(+(+x).toFixed(d)).replace('.', ',');
export const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
export const pick = a => a[Math.floor(Math.random() * a.length)];
export const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };

/** Frequenz in Hz → "7,1 MHz" / "455 kHz" / "800 Hz" (so viele Nachkommastellen wie nötig, höchstens d). */
export function fmtF(hz, d = 4) {
  const a = Math.abs(hz);
  if (a >= 1e9) return trimDec(hz / 1e9, d) + ' GHz';
  if (a >= 1e6) return trimDec(hz / 1e6, d) + ' MHz';
  if (a >= 1e3) return trimDec(hz / 1e3, d) + ' kHz';
  return trimDec(hz, d) + ' Hz';
}

/** Mini-Interaktions-Helfer: Textelement im SVG. */
export const txt = (x, y, t, o = {}) => s('text', { x, y, 'font-size': o.size ?? 11, fill: o.fill ?? 'var(--muted)', 'text-anchor': o.anchor ?? 'start', 'font-weight': o.bold ? 700 : null, 'font-style': o.italic ? 'italic' : null, ...(o.attr || {}) }, t);
export const line = (x1, y1, x2, y2, o = {}) => s('line', { x1, y1, x2, y2, stroke: o.color ?? 'var(--ink-2)', 'stroke-width': o.w ?? 1.5, 'stroke-dasharray': o.dash ?? null, opacity: o.opacity ?? null, 'stroke-linecap': 'round' });
export const rect = (x, y, w, hh, o = {}) => s('rect', { x, y, width: Math.max(0, w), height: Math.max(0, hh), rx: o.r ?? 0, fill: o.fill ?? 'none', stroke: o.stroke ?? null, 'stroke-width': o.sw ?? 1, opacity: o.opacity ?? null, 'fill-opacity': o.fo ?? null });

/**
 * Einfaches Diagramm als SVG mit Achsen.
 *   const c = chart(root, { h: 200, x: [-3, 3], y: [0, 1.1], xticks: [-2, 0, 2], xfmt: v => v + ' kHz', yticks: [], xlabel, ylabel, aria });
 *   c.add(el, el, …) / c.clear();  c.X(v), c.Y(v) rechnen in SVG-Koordinaten um.
 */
export function chart(root, o) {
  const W = o.w ?? boxWidth(root), H = o.h ?? 200;
  const m = { l: o.yticks?.length || o.ylabel ? 46 : 12, r: 14, t: 12, b: o.xlabel ? 40 : 28, ...o.margin };
  const svg = s('svg', { class: 'vz-svg', viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': o.aria || 'Diagramm' });
  root.append(svg);
  const [x0, x1] = o.x, [y0, y1] = o.y;
  const X = v => m.l + (v - x0) / (x1 - x0) * (W - m.l - m.r);
  const Y = v => H - m.b - (v - y0) / (y1 - y0) * (H - m.t - m.b);
  const frame = s('g'), layer = s('g');
  for (const v of o.yticks ?? []) { frame.append(line(m.l, Y(v), W - m.r, Y(v), { color: 'var(--line)', w: 1 }), txt(m.l - 6, Y(v) + 4, (o.yfmt ?? (t => t))(v), { anchor: 'end', size: 10.5 })); }
  for (const v of o.xticks ?? []) { frame.append(line(X(v), m.t, X(v), H - m.b, { color: 'var(--line)', w: 1 }), txt(X(v), H - m.b + 15, (o.xfmt ?? (t => t))(v), { anchor: X(v) < m.l + 22 ? 'start' : X(v) > W - m.r - 22 ? 'end' : 'middle', size: 10.5 })); }
  frame.append(line(m.l, H - m.b, W - m.r, H - m.b, { color: 'var(--ink-2)', w: 1.2 }));
  if (o.yAxis) frame.append(line(m.l, m.t, m.l, H - m.b, { color: 'var(--ink-2)', w: 1.2 }));
  if (o.xlabel) frame.append(txt((m.l + W - m.r) / 2, H - 6, o.xlabel, { anchor: 'middle', size: 11 }));
  if (o.ylabel) frame.append(s('text', { x: 12, y: (m.t + H - m.b) / 2, 'font-size': 11, fill: 'var(--muted)', 'text-anchor': 'middle', transform: `rotate(-90 12 ${(m.t + H - m.b) / 2})` }, o.ylabel));
  svg.append(frame, layer);
  return { svg, X, Y, W, H, m, layer, clear() { layer.replaceChildren(); }, add(...els) { layer.append(...els.flat(3).filter(Boolean)); } };
}

/** Polylinie aus Zahlenpaaren. */
export const poly = (pts, o = {}) => s('polyline', { points: pts.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' '), fill: 'none', stroke: o.color ?? 'var(--accent)', 'stroke-width': o.w ?? 1.5, 'stroke-linejoin': 'round', 'stroke-dasharray': o.dash ?? null, opacity: o.opacity ?? null });

/** Deterministisches Pseudo-Rauschen (Hash), damit Bilder beim Neuzeichnen nicht flackern. */
export const hash = n => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };

/** Sprachähnliche Ersatz-Signale (vereinfachte „Sprache“): drei Töne im Sprachband 300–2700 Hz. */
export const SPEECH = { f: [500, 1200, 2200], a: [1, 0.7, 0.45], fmin: 300, fmax: 2700 };
