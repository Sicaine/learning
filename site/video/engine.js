// Explainer-video engine. A video is a list of scenes; each scene has narration lines
// ({ say: spoken text (spell out numbers/units), cap: caption text shown on screen })
// and drawing code that is a PURE function of the scene time (so any frame can be rendered alone).
// Rendering: tools/video/build.mjs drives player.html frame by frame in headless Chromium.
// This file must stay importable in Node (no DOM access at import time).

export const W = 1280, H = 720, FPS = 30;
export const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const lerp = (a, b, t) => a + (b - a) * t;
export const E = {
  lin: t => t,
  in: t => t * t * t,
  out: t => 1 - Math.pow(1 - t, 3),
  io: t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  back: t => { const c = 1.70158; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); },
};
/** 0→1 between t0 and t1 (clamped, eased). */
export const seg = (t, t0, t1, ease = E.io) => ease(clamp((t - t0) / Math.max(1e-6, t1 - t0)));
/** Visibility pulse: fades in at t0, out at t1 (both with fade seconds f). */
export const win = (t, t0, t1, f = 0.35) => Math.min(seg(t, t0, t0 + f, E.out), 1 - seg(t, t1 - f, t1, E.in));

export const COLORS = {
  ink: '#16162a', ink2: '#3b3b55', muted: '#74748c', line: '#d9d9e4', soft: '#f1f2f7', bg: '#f6f6f9',
  accent: '#047857', accent2: '#0ea5e9', forward: '#0369a1', reflect: '#d4513d', good: '#1f9d6b', warn: '#c7861b', violet: '#7c3aed',
};

const SVGNS = 'http://www.w3.org/2000/svg';
/** Create an SVG element with attributes (numbers rounded to 2 decimals). */
export function el(tag, attrs = {}, parent = null) {
  const n = document.createElementNS(SVGNS, tag);
  setA(n, attrs);
  if (parent) parent.append(n);
  return n;
}
export function setA(n, attrs) {
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null) continue;
    n.setAttribute(k, typeof v === 'number' ? (Math.round(v * 100) / 100) : v);
  }
  return n;
}
/** SVG text helper. */
export function text(parent, x, y, str, attrs = {}) {
  const t = el('text', { x, y, 'font-family': 'Inter, system-ui, sans-serif', 'font-size': 22, fill: COLORS.ink, ...attrs }, parent);
  t.textContent = str;
  return t;
}
/** Path "d" for y = fn(x) sampled at n points between x0 and x1 (screen coordinates). */
export function pathFn(fn, x0, x1, n = 240) {
  let d = '';
  for (let i = 0; i <= n; i++) { const x = lerp(x0, x1, i / n); d += (i ? 'L' : 'M') + (Math.round(x * 10) / 10) + ' ' + (Math.round(fn(x) * 10) / 10); }
  return d;
}
/** KaTeX → HTML string (KaTeX is loaded by player.html). */
export const tex = (s, display = false) => window.katex.renderToString(s, { displayMode: display, throwOnError: true });

/** Validate and normalise a video spec (also used by the Node build script). */
export function defineVideo(spec) {
  if (!spec.id || !Array.isArray(spec.scenes)) throw new Error('video needs id and scenes');
  spec.scenes.forEach((s, i) => {
    if (!s.id) throw new Error(`scene ${i} needs an id`);
    s.lines = (s.lines || []).map(l => (typeof l === 'string' ? { say: l, cap: l } : { cap: l.say, ...l }));
    if (!s.lines.length) throw new Error(`scene ${s.id} needs narration lines`);
  });
  return spec;
}

/** Timeline from line durations (seconds). dur[i][j] = duration of line j in scene i. */
export function buildTimeline(spec, dur, { lead = 0.5, gap = 0.4, pad = 0.9, outro = 1.2 } = {}) {
  let t = 0; const scenes = [];
  spec.scenes.forEach((s, i) => {
    const start = t; let c = start + lead; const lines = [];
    s.lines.forEach((l, j) => { const d = dur[i][j]; lines.push({ start: c, end: c + d, cap: l.cap, say: l.say }); c += d + gap; });
    const end = c - gap + (s.pad ?? pad);
    scenes.push({ id: s.id, start, end, lines }); t = end;
  });
  return { fps: FPS, total: t + outro, scenes };
}

/** Browser-side player: builds the stage and renders frame(t). */
export class Player {
  constructor(spec, timeline, host) {
    this.spec = spec; this.tl = timeline;
    host.innerHTML = `<div class="vstage" id="vstage">
      <div class="v-bg"></div>
      <div class="v-brand"><span class="mark"></span><span>${spec.brand || 'Learning'}</span></div>
      <div class="v-head"><div class="v-kicker"></div><div class="v-title"></div></div>
      <div class="v-scenes"></div>
      <div class="v-cap"><div class="v-cap-in"></div></div>
    </div>`;
    this.stage = host.querySelector('#vstage');
    this.scenesEl = host.querySelector('.v-scenes');
    this.kicker = host.querySelector('.v-kicker'); this.title = host.querySelector('.v-title');
    this.cap = host.querySelector('.v-cap-in');
    this.layers = spec.scenes.map(() => null);
  }
  ensure(i) {
    if (this.layers[i]) return this.layers[i];
    const L = document.createElement('div'); L.className = 'v-layer'; L.style.opacity = 0; this.scenesEl.append(L);
    const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, width: W, height: H, class: 'v-svg' }, L);
    const h = (html, style = '') => { const d = document.createElement('div'); d.className = 'v-abs'; d.style.cssText = style; d.innerHTML = html; L.append(d); return d; };
    const ctx = { L, svg, h, el, text, tex, pathFn, W, H };
    const scene = this.spec.scenes[i];
    const state = scene.init ? scene.init(ctx) : null;
    this.layers[i] = { L, ctx, state };
    return this.layers[i];
  }
  render(t) {
    const tl = this.tl;
    let active = -1;
    tl.scenes.forEach((s, i) => { if (t >= s.start && t < s.end + 0.001) active = i; });
    if (active < 0) active = t < 0 ? 0 : tl.scenes.length - 1;
    this.layers.forEach((l, i) => { if (l && i !== active) l.L.style.opacity = 0; });
    const s = tl.scenes[active], sp = this.spec.scenes[active];
    const lay = this.ensure(active);
    const local = t - s.start, dur = s.end - s.start;
    const fade = Math.min(seg(local, 0, 0.45, E.out), 1 - seg(local, dur - 0.45, dur, E.in));
    lay.L.style.opacity = active === tl.scenes.length - 1 ? seg(local, 0, 0.45, E.out) * (1 - seg(t, tl.total - 0.8, tl.total, E.in)) : fade;
    this.kicker.textContent = sp.kicker || '';
    this.title.textContent = sp.title || '';
    this.title.style.opacity = this.kicker.style.opacity = lay.L.style.opacity;
    if (sp.update) sp.update(lay.ctx, {
      t: local, p: clamp(local / dur), dur, state: lay.state,
      at: j => s.lines[j].start - s.start, end: j => s.lines[j].end - s.start, lines: s.lines.map(l => ({ s: l.start - s.start, e: l.end - s.start })),
    });
    const cur = s.lines.find(l => t >= l.start - 0.05 && t <= l.end + 0.25);
    this.cap.innerHTML = cur ? cur.cap : '';
    this.cap.parentElement.style.opacity = cur ? Math.min(seg(t, cur.start - 0.05, cur.start + 0.15, E.out), 1 - seg(t, cur.end + 0.05, cur.end + 0.25, E.in)) : 0;
  }
}
