// vizkit/schematic.js — Schaltplan-Zeichner (SVG) im IEC/DIN-Stil mit Live-Visualisierung.
//
//   const sch = drawSchematic(stage, {
//     grid: 16,
//     parts: [
//       { id: 'V1', type: 'V',  at: [2, 3], rot: 90, value: 10 },                 // Bezugspunkt = erster Pin, rot in Grad (0|90|180|270)
//       { id: 'R1', type: 'R',  at: [6, 3], value: 1000, adjust: { min: 100, max: 1e5, scale: 'log', snap: 'E12' } },
//       { id: 'R2', type: 'R',  at: [12, 3], rot: 90, value: 2200 },
//       { type: 'GND', at: [7, 9] },
//     ],
//     wires: [ { pts: ['V1.p', 'R1.a'], net: 'in' }, { pts: ['R1.b', 'R2.a'], net: 'out' }, ['V1.n', [2, 9], [12, 9], 'R2.b'] ],
//     onChange: (id, value) => …,                                                 // Bauteil gezogen/geklickt
//   });
//   sch.setState({ v: sim.voltages(), i: sim.currents() });                       // Potenzialfärbung + Stromfluss
//   sch.set('R1', { value: 4700 });   sch.highlight('R1');   sch.pin('R1', 'b') → [x, y] (Rasterpunkte)
//
// Koordinaten sind Rasterpunkte (grid px). Zweipole liegen bei rot 0 waagerecht (Pin a → b nach rechts, Länge 4);
// rot 90 = nach unten, 180 = nach links, 270 = nach oben. Wire-Punkte: [x, y] oder 'ID.pin'; zwischen nicht ausgerichteten
// Punkten wird eine Ecke (erst waagerecht) eingefügt. Verbindungspunkte (●) entstehen automatisch.
// Bauteile: R POT C CPOL L V VAC VBAT I SW D LED ZD SD FUSE LAMP XTAL VM AM SPK MIC ANT GND TERM Q (npn/pnp) FET (n/p) OA T TEXT.
import { fmt, valueToSlider, sliderToValue, eNearest, eStep, clamp } from './si.js';
import { ensureCss, h, s, boxWidth } from './base.js';
import { animate } from './anim.js';

const f2 = n => +n.toFixed(3);
function head(tx, ty, ux, uy, len = 0.55, w = 0.22) {   // gefüllte Pfeilspitze (Einheiten)
  const L = Math.hypot(ux, uy) || 1; ux /= L; uy /= L;
  const bx = tx - ux * len, by = ty - uy * len;
  return `<path d="M${f2(tx)} ${f2(ty)}L${f2(bx - uy * w)} ${f2(by + ux * w)}L${f2(bx + uy * w)} ${f2(by - ux * w)}Z" class="fillb"/>`;
}
const humps = (x0, y0, n, r, vert, sweep) => { let d = `M${x0} ${y0}`; for (let i = 0; i < n; i++) d += vert ? `a${r} ${r} 0 0 ${sweep} 0 ${2 * r}` : `a${r} ${r} 0 0 ${sweep} ${2 * r} 0`; return d; };

/**
 * Komponentenbibliothek. Jede Definition: { pins: {name: [x, y]} (erster Pin = Ursprung), box: [x0, y0, x1, y1] (für Beschriftung/Treffer),
 * draw(part) → SVG-Markup in Einheiten (1 Einheit = 1 Rasterpunkt), unit?, cur?: { pin: [Element-Suffix, Vorzeichen] } }.
 * Eigene Bauteile: components.MYPART = { … } vor drawSchematic().
 */
export const components = {
  R: { pins: { a: [0, 0], b: [4, 0] }, box: [0, -0.6, 4, 0.6], unit: 'Ω', cur: { a: ['', 1], b: ['', -1] }, draw: () => '<path d="M0 0H1M3 0H4"/><rect x="1" y="-.55" width="2" height="1.1"/>' },
  POT: { pins: { a: [0, 0], b: [4, 0], w: [2, -1.9] }, box: [0, -1.9, 4, 0.6], unit: 'Ω', cur: { a: ['', 1], b: ['', -1] }, draw: () => `<path d="M0 0H1M3 0H4M2 -1.9V-1.1"/><rect x="1" y="-.55" width="2" height="1.1"/>${head(2, -0.6, 0, 1, 0.5, 0.2)}` },
  C: { pins: { a: [0, 0], b: [4, 0] }, box: [0, -1, 4, 1], unit: 'F', cur: { a: ['', 1], b: ['', -1] }, draw: () => '<path d="M0 0H1.8M2.2 0H4M1.8 -1V1M2.2 -1V1"/>' },
  CPOL: { pins: { a: [0, 0], b: [4, 0] }, box: [0, -1.1, 4, 1], unit: 'F', cur: { a: ['', 1], b: ['', -1] }, draw: () => '<path d="M0 0H1.75M2.45 0H4M1.75 -1V1M2.75 -1Q2.15 0 2.75 1"/><path d="M.9 -.95H1.5M1.2 -1.25V-.65"/>' },
  L: { pins: { a: [0, 0], b: [4, 0] }, box: [0, -0.8, 4, 0.4], unit: 'H', cur: { a: ['', 1], b: ['', -1] }, draw: () => '<path d="M0 0H.5a.375 .375 0 0 1 .75 0a.375 .375 0 0 1 .75 0a.375 .375 0 0 1 .75 0a.375 .375 0 0 1 .75 0H4"/>' },
  V: { pins: { p: [0, 0], n: [4, 0] }, box: [0, -1.15, 4, 1.15], unit: 'V', cur: { p: ['', 1], n: ['', -1] }, draw: () => '<path d="M0 0H.9M3.1 0H4"/><circle cx="2" cy="0" r="1.1"/><path d="M1.15 -.35H1.65M1.4 -.6V-.1M2.35 -.35H2.85"/>' },
  VAC: { pins: { a: [0, 0], b: [4, 0] }, box: [0, -1.15, 4, 1.15], unit: 'V', cur: { a: ['', 1], b: ['', -1] }, draw: () => '<path d="M0 0H.9M3.1 0H4"/><circle cx="2" cy="0" r="1.1"/><path d="M1.2 0Q1.6 -.95 2 0T2.8 0"/>' },
  VBAT: { pins: { p: [0, 0], n: [4, 0] }, box: [0, -1, 4, 1], unit: 'V', cur: { p: ['', 1], n: ['', -1] }, draw: () => '<path d="M0 0H1.7M2.3 0H4M1.7 -1V1"/><path d="M2.3 -.55V.55" style="stroke-width:.3"/><path d="M.8 -.85H1.4M1.1 -1.15V-.55"/>' },
  I: { pins: { a: [0, 0], b: [4, 0] }, box: [0, -1.15, 4, 1.15], unit: 'A', cur: { a: ['', 1], b: ['', -1] }, draw: () => `<path d="M0 0H.9M3.1 0H4M1.3 0H2.5"/><circle cx="2" cy="0" r="1.1"/>${head(2.7, 0, 1, 0, 0.6, 0.25)}` },
  SW: { pins: { a: [0, 0], b: [4, 0] }, box: [0, -1.3, 4, 0.5], cur: { a: ['', 1], b: ['', -1] }, draw: p => `<path d="M0 0H1M3 0H4"/><circle cx="1" cy="0" r=".13" class="fillb"/><circle cx="3" cy="0" r=".13" class="fillb"/>${p.closed ? '<path d="M1 0L3 0" style="stroke-width:.16"/>' : '<path d="M1 0L2.85 -1.1"/>'}` },
  D: { pins: { a: [0, 0], k: [4, 0] }, box: [0, -1, 4, 1], cur: { a: ['', 1], k: ['', -1] }, draw: () => '<path d="M0 0H1.4M2.6 0H4M1.4 -.9L2.6 0L1.4 .9ZM2.6 -.9V.9"/>' },
  LED: { pins: { a: [0, 0], k: [4, 0] }, box: [0, -2.1, 4, 1], cur: { a: ['', 1], k: ['', -1] }, draw: p => `${p.lit ? `<circle cx="2" cy="0" r="1.6" fill="${p.color || 'var(--warn)'}" fill-opacity="${f2(clamp(p.lit, 0, 1) * 0.45)}" stroke="none"/>` : ''}<path d="M0 0H1.4M2.6 0H4M1.4 -.9L2.6 0L1.4 .9ZM2.6 -.9V.9"/><path d="M1.7 -1.25L2.55 -2.05M2.5 -1L3.35 -1.8"/>${head(2.55, -2.05, 1, -1, 0.5, 0.2)}${head(3.35, -1.8, 1, -1, 0.5, 0.2)}` },
  ZD: { pins: { a: [0, 0], k: [4, 0] }, box: [0, -1, 4, 1], cur: { a: ['', 1], k: ['', -1] }, draw: () => '<path d="M0 0H1.4M2.6 0H4M1.4 -.9L2.6 0L1.4 .9Z"/><path d="M2.25 .9H2.6V-.9H2.95"/>' },
  SD: { pins: { a: [0, 0], k: [4, 0] }, box: [0, -1, 4, 1], cur: { a: ['', 1], k: ['', -1] }, draw: () => '<path d="M0 0H1.4M2.6 0H4M1.4 -.9L2.6 0L1.4 .9Z"/><path d="M2.15 -.55V-.9H2.6V.9H3.05V.55"/>' },
  FUSE: { pins: { a: [0, 0], b: [4, 0] }, box: [0, -0.6, 4, 0.6], unit: 'A', cur: { a: ['', 1], b: ['', -1] }, draw: () => '<path d="M0 0H4"/><rect x="1" y="-.5" width="2" height="1" style="fill:var(--surface)"/>' },
  LAMP: { pins: { a: [0, 0], b: [4, 0] }, box: [0, -1.1, 4, 1.1], cur: { a: ['', 1], b: ['', -1] }, draw: p => `${p.lit ? `<circle cx="2" cy="0" r="1.7" fill="var(--warn)" fill-opacity="${f2(clamp(p.lit, 0, 1) * 0.5)}" stroke="none"/>` : ''}<path d="M0 0H1M3 0H4"/><circle cx="2" cy="0" r="1" style="fill:var(--surface);fill-opacity:.5"/><path d="M1.3 -.7L2.7 .7M2.7 -.7L1.3 .7"/>` },
  XTAL: { pins: { a: [0, 0], b: [4, 0] }, box: [0, -1, 4, 1], unit: 'Hz', cur: { a: ['', 1], b: ['', -1] }, draw: () => '<path d="M0 0H1.4M2.6 0H4M1.4 -.9V.9M2.6 -.9V.9"/><rect x="1.75" y="-.7" width=".5" height="1.4"/>' },
  VM: { pins: { a: [0, 0], b: [4, 0] }, box: [0, -1.15, 4, 1.15], cur: { a: ['', 1], b: ['', -1] }, draw: p => `<path d="M0 0H.9M3.1 0H4"/><circle cx="2" cy="0" r="1.1"/><path d="${p.letter === 'A' ? 'M1.55 .5L2 -.6L2.45 .5M1.7 .15H2.3' : 'M1.55 -.5L2 .55L2.45 -.5'}"/>` },
  AM: { pins: { a: [0, 0], b: [4, 0] }, box: [0, -1.15, 4, 1.15], cur: { a: ['', 1], b: ['', -1] }, draw: () => '<path d="M0 0H.9M3.1 0H4"/><circle cx="2" cy="0" r="1.1"/><path d="M1.55 .5L2 -.6L2.45 .5M1.7 .15H2.3"/>' },
  SPK: { pins: { a: [0, 0], b: [0, 2] }, box: [0, -0.4, 3.4, 2.4], cur: { a: ['', 1], b: ['', -1] }, draw: () => '<path d="M0 0H1.2V.4M0 2H1.2V1.6"/><rect x="1.2" y=".4" width=".9" height="1.2"/><path d="M2.1 .4L3.2 -.4V2.4L2.1 1.6"/>' },
  MIC: { pins: { a: [0, 0], b: [0, 2] }, box: [0, -0.2, 2.8, 2.2], cur: { a: ['', 1], b: ['', -1] }, draw: () => '<path d="M0 0H1V.1M0 2H1V1.9"/><circle cx="1.7" cy="1" r="1"/><path d="M2.7 .1V1.9" style="stroke-width:.2"/>' },
  ANT: { pins: { a: [0, 0] }, box: [-1.1, -3.5, 1.1, 0], draw: () => '<path d="M0 0V-2.5M-1.1 -3.5L0 -2.4L1.1 -3.5"/>' },
  GND: { pins: { a: [0, 0] }, box: [-1, 0, 1, 1.7], draw: () => '<path d="M0 0V.8M-1 .8H1M-.62 1.25H.62M-.25 1.7H.25"/>' },
  TERM: { pins: { a: [0, 0] }, box: [-0.3, -0.3, 0.3, 0.3], draw: () => '<circle cx="0" cy="0" r=".28" style="fill:var(--surface)"/>' },
  Q: { pins: { b: [0, 0], c: [2, -2], e: [2, 2] }, box: [0, -2, 2.8, 2], cur: { c: ['', 1], b: ['.b', 1], e: ['.e', 1] },
    draw: p => `<circle cx="1.35" cy="0" r="1.65" style="stroke-width:.09;stroke:var(--ink-2)"/><path d="M0 0H1M1 -.95V.95M1 -.45L2 -1.25V-2M1 .45L2 1.25V2"/>${p.pol === 'pnp' ? head(1.12, 0.6, -0.8, -0.6, 0.55, 0.2) : head(1.82, 1.06, 0.8, 0.6, 0.55, 0.2)}` },
  FET: { pins: { g: [0, 0], d: [2, -2], s: [2, 2] }, box: [0, -2, 2.4, 2], cur: { d: ['', 1], s: ['', -1] },
    draw: p => `<path d="M0 0H.75M.75 -.95V.95M1.15 -1V-.55M1.15 -.25V.25M1.15 .55V1M1.15 -.8H2V-2M1.15 .8H2V2M1.15 0H2V.8"/>${p.pol === 'p' ? head(2, 0, 1, 0, 0.5, 0.2) : head(1.15, 0, -1, 0, 0.5, 0.2)}` },
  OA: { pins: { m: [0, 0], p: [0, 2], o: [4, 1] }, box: [0, -1.2, 4, 3.2], cur: { o: ['', -1] },
    draw: () => '<path d="M0 0H1M0 2H1M3.8 1H4M1 -1.25V3.25L3.8 1Z"/><path d="M1.3 0H1.85M1.3 2H1.85M1.575 1.725V2.275" style="stroke-width:.1"/>' },
  T: { pins: { p1: [0, 0], p2: [0, 4], s1: [4, 0], s2: [4, 4] }, box: [0, 0, 4, 4], cur: { p1: ['.p', 1], p2: ['.p', -1], s1: ['.s', 1], s2: ['.s', -1] },
    draw: () => `<path d="M0 0H1.2M0 4H1.2M4 0H2.8M4 4H2.8"/><path d="${humps(1.2, 0.4, 4, 0.4, true, 0)}"/><path d="${humps(2.8, 0.4, 4, 0.4, true, 1)}"/><path d="M1.9 .2V3.8M2.1 .2V3.8"/>` },
  TEXT: { pins: {}, box: [0, 0, 0, 0], draw: () => '' },
};

const rotPt = ([x, y], rot, flip) => { if (flip) y = -y; switch (((rot % 360) + 360) % 360) { case 90: return [-y, x]; case 180: return [-x, -y]; case 270: return [y, -x]; default: return [x, y]; } };
const key = ([x, y]) => `${f2(x)},${f2(y)}`;

/**
 * Schaltplan zeichnen.
 * @param {Element} target  <svg> oder Container (dann wird ein <svg> angelegt)
 * @param {object} spec  { grid=16, parts, wires, texts?, pad=2.2, size?: [w, h] (sonst automatisch), onChange(id, value, part), onSelect(id),
 *                          potential?: { range: Volt }, iScale?: Ampere (Strom für volle Punktdichte), animate?: false }
 *   Bauteil: { id, type, at: [x, y], rot?, flip?, value?, unit?, label?, labelPos?: 't'|'b'|'l'|'r', el?: Elementname (Standard id),
 *              adjust?: { min, max, scale?, snap?, step? } (ziehbar), toggle?: true (Klick schaltet closed), pol?: 'npn'|'pnp'|'n'|'p' }
 *   Leitung: [Punkte…] oder { pts, net?: Knotenname (Potenzialfarbe), i?: 'R1' | '-R1' (Strom; sonst aus Pin abgeleitet) }
 * @returns {object} sch — { svg, el, setState, set, get, highlight, select, pin, animate, destroy }
 */
export function drawSchematic(target, spec) {
  ensureCss();
  const g = spec.grid ?? 16;
  const fs = spec.fontScale ?? (boxWidth(target, 0, 2000) < 520 ? 1.3 : 1);
  let wrap = null, svg;
  if (target.tagName?.toLowerCase() === 'svg') svg = target;
  else { wrap = h('div', { class: 'vk-sch' }); svg = s('svg', { role: 'img', 'aria-label': spec.title || 'Schaltplan' }); wrap.append(svg); target.append(wrap); }
  svg.replaceChildren();

  const parts = new Map();
  const state = { v: {}, i: {} };
  // ── Bauteile ──
  let anon = 0;
  for (const p0 of [...spec.parts, ...(spec.texts || []).map(t => ({ type: 'TEXT', at: t.at, text: t.text, anchor: t.anchor, size: t.size, color: t.color }))]) {
    const def = components[p0.type]; if (!def) throw new Error('Unbekanntes Schaltplan-Bauteil: ' + p0.type);
    const p = { rot: 0, flip: false, ...p0, def }; p.id = p.id ?? p.type + '#' + (++anon); p.el = p.el ?? p.id;
    p.pol = p.pol ?? (p.type === 'Q' ? 'npn' : p.type === 'FET' ? 'n' : undefined);
    p.abs = {};
    for (const [n, c] of Object.entries(def.pins)) { const r = rotPt(c, p.rot, p.flip); p.abs[n] = [p.at[0] + r[0], p.at[1] + r[1]]; }
    parts.set(p.id, p);
  }
  const pinOf = ref => { const [id, pin] = ref.split('.'); const pt = parts.get(id); if (!pt || !pt.abs[pin]) throw new Error('Unbekannter Pin: ' + ref); return pt.abs[pin]; };
  const toPt = q => typeof q === 'string' ? pinOf(q) : q;

  // ── Leitungen ──
  const wires = (spec.wires || []).map(w0 => {
    const w = Array.isArray(w0) ? { pts: w0 } : { ...w0 };
    const raw = w.pts.map(toPt), pts = [raw[0]];
    for (let k = 1; k < raw.length; k++) {
      const a = pts[pts.length - 1], b = raw[k];
      if (a[0] !== b[0] && a[1] !== b[1]) pts.push(w.vfirst ? [a[0], b[1]] : [b[0], a[1]]);
      pts.push(b);
    }
    w.P = pts;
    if (w.i) w.cur = w.i.startsWith('-') ? [w.i.slice(1), -1] : [w.i, 1];
    else for (const [end, ref] of [[0, w.pts[0]], [1, w.pts[w.pts.length - 1]]]) {
      if (typeof ref !== 'string') continue;
      const [id, pin] = ref.split('.'), pt = parts.get(id), c = pt?.def.cur?.[pin]; if (!c) continue;
      w.cur = [pt.el + c[0], end === 1 ? c[1] : -c[1]]; break;   // Strom positiv = in das Bauteil hinein → Leitung endet am Pin: entlang der Leitung
    }
    return w;
  });

  // ── Verbindungspunkte ──
  const cnt = new Map(), bump = (pt, n = 1) => cnt.set(key(pt), (cnt.get(key(pt)) || 0) + n);
  for (const w of wires) { bump(w.P[0]); bump(w.P[w.P.length - 1]); for (let k = 1; k < w.P.length - 1; k++) bump(w.P[k], 2); }
  for (const p of parts.values()) for (const pt of Object.values(p.abs)) bump(pt);
  const onInterior = pt => wires.some(w => { for (let k = 1; k < w.P.length; k++) { const a = w.P[k - 1], b = w.P[k]; if (a[0] === b[0] && pt[0] === a[0] && pt[1] > Math.min(a[1], b[1]) && pt[1] < Math.max(a[1], b[1])) return true; if (a[1] === b[1] && pt[1] === a[1] && pt[0] > Math.min(a[0], b[0]) && pt[0] < Math.max(a[0], b[0])) return true; } return false; });
  const dots = new Map();
  for (const w of wires) for (const pt of [w.P[0], w.P[w.P.length - 1]]) if (onInterior(pt)) dots.set(key(pt), pt);
  for (const p of parts.values()) if (p.type !== 'TERM') for (const pt of Object.values(p.abs)) if (onInterior(pt)) dots.set(key(pt), pt);
  for (const [k, c] of cnt) if (c >= 3) dots.set(k, k.split(',').map(Number));
  for (const d of spec.dots || []) dots.set(key(d), d);

  // ── Ausdehnung ──
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  const ext = (x, y) => { x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); };
  for (const p of parts.values()) {
    if (p.type === 'TEXT') { ext(p.at[0], p.at[1]); continue; }
    const b = p.def.box;
    for (const c of [[b[0], b[1]], [b[2], b[1]], [b[0], b[3]], [b[2], b[3]]]) { const r = rotPt(c, p.rot, p.flip); ext(p.at[0] + r[0], p.at[1] + r[1]); }
    if (p.type === 'TERM' && p.label) ext(p.at[0] + (p.labelPos === 'l' ? -3 : 3), p.at[1]);
  }
  for (const w of wires) for (const pt of w.P) ext(pt[0], pt[1]);
  const pad = spec.pad ?? 3, padX = spec.pad ?? 4.6;
  const vb = spec.size ? [0, 0, spec.size[0] * g, spec.size[1] * g] : [(x0 - padX) * g, (y0 - pad) * g, (x1 - x0 + 2 * padX) * g, (y1 - y0 + 2 * pad) * g];
  svg.setAttribute('viewBox', vb.map(f2).join(' '));
  svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
  if (spec.maxWidth !== false) { svg.style.maxWidth = (spec.maxWidth ?? Math.round(vb[2] * 1.45)) + 'px'; svg.style.marginInline = 'auto'; }

  // ── DOM ──
  const style = s('style');
  style.textContent = '.body{stroke:var(--ink);stroke-width:.12px;fill:none;stroke-linecap:round;stroke-linejoin:round}.body .fillb{fill:var(--ink);stroke:none}.wire{fill:none;stroke-width:2.2px;stroke-linecap:round;stroke-linejoin:round}';
  const gW = s('g'), gF = s('g'), gP = s('g'), gJ = s('g');
  svg.append(style, gW, gF, gP, gJ);
  for (const w of wires) {
    const d = w.P.map((p, k) => (k ? 'L' : 'M') + f2(p[0] * g) + ' ' + f2(p[1] * g)).join('');
    w.base = s('path', { d, class: 'wire', stroke: 'var(--ink-2)' });
    w.flow = s('path', { d, fill: 'none', stroke: 'var(--accent-2)', 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-dasharray': '0.01 40', opacity: 0 });
    w.off = Math.random() * 40; w.dir = 0; w.r = 0;
    gW.append(w.base); gF.append(w.flow);
  }
  for (const d of dots.values()) gJ.append(s('circle', { cx: d[0] * g, cy: d[1] * g, r: 3.1, fill: 'var(--ink-2)' }));

  const valueText = p => p.toggle ? (p.closed ? 'EIN' : 'AUS') : (p.valueText ?? (typeof p.value === 'number' ? fmt(p.value, p.unit ?? p.def.unit ?? '') : (p.value ?? '')));
  const hitRect = p => { const b = p.def.box; return `<rect class="hit" x="${b[0] - 0.2}" y="${b[1] - 0.2}" width="${b[2] - b[0] + 0.4}" height="${b[3] - b[1] + 0.4}" rx="0.4"/>`; };
  const redrawBody = p => { if (p.body) p.body.innerHTML = hitRect(p) + p.def.draw(p); };

  function layoutLabel(p) {
    const b = p.def.box, cs = [[b[0], b[1]], [b[2], b[1]], [b[0], b[3]], [b[2], b[3]]].map(c => rotPt(c, p.rot, p.flip));
    const bx0 = Math.min(...cs.map(c => c[0])) + p.at[0], bx1 = Math.max(...cs.map(c => c[0])) + p.at[0], by0 = Math.min(...cs.map(c => c[1])) + p.at[1], by1 = Math.max(...cs.map(c => c[1])) + p.at[1];
    const cx = (bx0 + bx1) / 2, cy = (by0 + by1) / 2;
    const vertical = (bx1 - bx0) < (by1 - by0) * 0.8 || ['Q', 'FET', 'OA', 'T', 'SPK', 'MIC', 'ANT', 'GND'].includes(p.type);
    const pos = p.labelPos || (vertical ? 'r' : 't');
    const lab = p.label ?? (['TERM', 'GND', 'TEXT'].includes(p.type) ? '' : p.id), val = valueText(p), lh = g * 0.95 * fs;
    let lx, ly, ax;
    if (pos === 'r') { lx = (bx1 + 0.45) * g; ly = cy * g - (val && lab ? 0.1 * g : -0.3 * g); ax = 'start'; }
    else if (pos === 'l') { lx = (bx0 - 0.45) * g; ly = cy * g - (val && lab ? 0.1 * g : -0.3 * g); ax = 'end'; }
    else if (pos === 'b') { lx = cx * g; ly = (by1 + 1.3) * g; ax = 'middle'; }
    else { lx = cx * g; ly = (by0 - (val ? 1.25 : 0.55)) * g; ax = 'middle'; }
    p.lab.setAttribute('x', f2(lx)); p.lab.setAttribute('y', f2(ly)); p.lab.setAttribute('text-anchor', ax); p.lab.textContent = lab;
    p.val.setAttribute('x', f2(lx)); p.val.setAttribute('y', f2(ly + lh)); p.val.setAttribute('text-anchor', ax); p.val.textContent = val;
  }

  const adjustable = p => !!(p.adjust || p.toggle);
  function renderPart(p) {
    const gp = s('g', { class: 'part' + (adjustable(p) ? ' adj' : ''), 'data-id': p.id });
    p.g = gp;
    p.lab = s('text', { class: 'lab', style: `font-size:${f2(g * 0.82 * fs)}px`, 'pointer-events': 'none' });
    p.val = s('text', { class: 'val', style: `font-size:${f2(g * 0.74 * fs)}px`, 'pointer-events': 'none' });
    if (p.type === 'TEXT') {
      p.lab.setAttribute('x', f2(p.at[0] * g)); p.lab.setAttribute('y', f2(p.at[1] * g)); p.lab.textContent = p.text ?? p.label ?? '';
      p.lab.setAttribute('text-anchor', p.anchor ?? 'start'); p.lab.style.fontSize = g * (p.size ?? 0.82) + 'px'; p.lab.style.fontWeight = '500'; p.lab.style.fill = p.color ?? 'var(--ink-2)';
    } else {
      const body = s('g', { class: 'body', transform: `translate(${f2(p.at[0] * g)} ${f2(p.at[1] * g)}) rotate(${p.rot})${p.flip ? ' scale(1 -1)' : ''} scale(${g})` });
      p.body = body; redrawBody(p); gp.append(body);
      if (p.type === 'TERM') {
        const left = p.labelPos === 'l';
        p.lab.setAttribute('x', f2((p.at[0] + (left ? -0.6 : 0.6)) * g)); p.lab.setAttribute('y', f2(p.at[1] * g + g * 0.3)); p.lab.setAttribute('text-anchor', left ? 'end' : 'start'); p.lab.textContent = p.label ?? '';
      } else layoutLabel(p);
    }
    gp.append(p.lab, p.val);
    gP.append(gp);
    if (adjustable(p)) interact(p);
  }

  // ── Interaktion ──
  function setValue(p, v) {
    if (p.toggle) p.closed = !!v; else p.value = v;
    redrawBody(p); p.val.textContent = valueText(p);
    spec.onChange?.(p.id, p.toggle ? p.closed : p.value, p);
  }
  function interact(p) {
    const gp = p.g, a = p.adjust, sc = a?.scale || 'lin';
    gp.setAttribute('tabindex', 0); gp.setAttribute('role', a ? 'slider' : 'switch'); gp.setAttribute('aria-label', (p.label ?? p.id) + (a ? ' einstellen' : ' schalten'));
    let drag = null;
    const apply = t => {
      let v = sliderToValue(clamp(t, 0, 1), a.min, a.max, sc);
      if (typeof a.snap === 'string') v = clamp(eNearest(v, a.snap), a.min, a.max); else if (a.step) v = clamp(Math.round(v / a.step) * a.step, a.min, a.max);
      if (v !== p.value) setValue(p, v);
    };
    gp.addEventListener('pointerdown', e => {
      select(p.id);
      if (p.toggle) { setValue(p, !p.closed); return; }
      drag = { x: e.clientX, y: e.clientY, t: valueToSlider(p.value, a.min, a.max, sc) }; gp.setPointerCapture(e.pointerId); e.preventDefault();
    });
    gp.addEventListener('pointermove', e => { if (drag) apply(drag.t + ((drag.y - e.clientY) + (e.clientX - drag.x)) / 140); });
    const end = () => { drag = null; }; gp.addEventListener('pointerup', end); gp.addEventListener('pointercancel', end);
    gp.addEventListener('keydown', e => {
      if (p.toggle && (e.key === ' ' || e.key === 'Enter')) { setValue(p, !p.closed); e.preventDefault(); return; }
      if (!a) return;
      const up = e.key === 'ArrowUp' || e.key === 'ArrowRight', dn = e.key === 'ArrowDown' || e.key === 'ArrowLeft'; if (!up && !dn) return;
      e.preventDefault();
      if (typeof a.snap === 'string') { const v = clamp(eStep(p.value, a.snap, up ? 1 : -1), a.min, a.max); if (v !== p.value) setValue(p, v); }
      else apply(valueToSlider(p.value, a.min, a.max, sc) + (up ? 0.03 : -0.03));
    });
  }
  const select = id => { for (const p of parts.values()) p.g?.classList.toggle('sel', p.id === id); spec.onSelect?.(id, parts.get(id)); };

  for (const p of parts.values()) renderPart(p);

  // ── Zustand: Potenzialfärbung + Stromfluss ──
  let vRange = 0, iRef = 0;
  function setState(st) {
    state.v = st.v || state.v; state.i = st.i || state.i;
    const autoV = Math.max(1e-9, ...Object.values(state.v).map(Math.abs));
    vRange = spec.potential?.range ?? (vRange ? Math.max(autoV, vRange * 0.995) : autoV);
    const iMax = Math.max(1e-12, ...wires.map(w => w.cur ? Math.abs(state.i[w.cur[0]] || 0) : 0));
    iRef = spec.iScale ?? (iRef ? Math.max(iMax, iRef * 0.99) : iMax);
    for (const w of wires) {
      if (w.net != null && state.v[w.net] !== undefined) {
        const t = clamp(state.v[w.net] / vRange, -1, 1), a = Math.abs(t);
        w.base.style.stroke = a < 0.02 ? 'var(--ink-2)' : `color-mix(in oklab, var(--ink-2), ${t > 0 ? 'var(--bad)' : 'var(--accent)'} ${Math.round(Math.pow(a, 0.7) * 100)}%)`;
      }
      if (w.cur) {
        const I = (state.i[w.cur[0]] ?? 0) * w.cur[1], r = Math.abs(I) / iRef;
        w.flow.setAttribute('opacity', r < 2e-3 ? 0 : 1);
        w.dir = r < 2e-3 ? 0 : Math.sign(I); w.r = Math.min(1, r);
        w.flow.setAttribute('stroke-dasharray', `0.01 ${f2(34 / (0.28 + 2.6 * Math.sqrt(w.r)))}`);
      }
    }
    for (const p of parts.values()) if (p.type === 'LED' || p.type === 'LAMP') {
      const lit = Math.min(1, Math.abs(state.i[p.el] ?? 0) / (p.iNom ?? (p.type === 'LED' ? 0.012 : 0.1)));
      if (Math.abs((p.lit || 0) - lit) > 0.02) { p.lit = lit; redrawBody(p); }
    }
    return S;
  }
  const loop = animate(svg, dt => { for (const w of wires) if (w.dir) { w.off -= w.dir * (22 + 60 * Math.sqrt(w.r)) * dt; w.flow.setAttribute('stroke-dashoffset', f2(w.off)); } }, { paused: spec.animate === false });

  const S = {
    svg, parts, wires, el: wrap || svg, loop,
    setState,
    /** Zustand aus einem transient()-Ergebnis an Index k übernehmen */
    setStateAt(res, k) { const v = {}, i = {}; for (const n in res.v) v[n] = res.v[n][k]; for (const n in res.i) i[n] = res.i[n][k]; return setState({ v, i }); },
    /** Bauteil-Eigenschaften ändern: sch.set('R1', { value: 4700, label: 'R₁', closed: true }) */
    set(id, props) { const p = parts.get(id); if (!p) return S; Object.assign(p, props); redrawBody(p); if (p.type !== 'TEXT' && p.type !== 'TERM') layoutLabel(p); return S; },
    get: id => parts.get(id),
    highlight(id, on = true) { for (const p of parts.values()) p.g?.classList.toggle('hot', on && p.id === id); return S; },
    select,
    /** Rasterposition eines Pins */
    pin: (id, pin) => parts.get(id).abs[pin],
    animate(on = true) { on ? loop.play() : loop.pause(); return S; },
    destroy() { loop.stop(); (wrap || svg).remove(); },
  };
  return S;
}
