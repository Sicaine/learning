// vizkit/plot.js — Diagramme als SVG (scharf, responsiv, ohne feste Pixelbreiten).
//
//   const p = plot(stage, { x: { unit: 's', label: 't' }, y: { unit: 'V' } });
//   p.line('u', ts, us, { color: 'var(--accent)', label: 'u(t)' });     // Kurve (xs, ys: Arrays oder Float64Array)
//   p.line('i', ts, is, { axis: 'y2', dash: '5 4' });                    // rechte Achse, gestrichelt
//   p.hline('lim', 5, { label: '5 V', dash: '4 4' });  p.vline('f0', 1591, { label: 'f₀' });
//   p.marker('op', 1.2, 0.003, { label: 'Arbeitspunkt' });  p.band('b', 100, 200);
//   p.set('u', ts, us2);                                                 // Daten ersetzen, neu zeichnen
//   p.onHover(({ x, values }) => …);                                     // Cursor-Anzeige ist eingebaut
//
// Achsen: { scale: 'lin'|'log', min, max (sonst automatisch), unit, label, ticks: Zahl|Array, format(v), include: [0] }.
// Spezialfälle: bode(), timePlot(), characteristic() (Kennlinie), spectrum() (Balken).
import { fmt } from './si.js';
import { ensureCss, h, s, PALETTE, esc, boxWidth } from './base.js';

let uidN = 0;
const niceStep = raw => { const e = Math.floor(Math.log10(raw)), f = raw / 10 ** e; return (f < 1.5 ? 1 : f < 3 ? 2 : f < 7 ? 5 : 10) * 10 ** e; };
function linTicks(min, max, count) {
  const step = niceStep((max - min) / Math.max(1, count)), out = [];
  for (let k = Math.ceil(min / step - 1e-9); k * step <= max + step * 1e-9; k++) out.push(+(k * step).toPrecision(12));
  return out;
}
function niceRange(min, max, count) {
  if (!(max > min)) { const d = Math.abs(min) * 0.1 || 1; min -= d; max += d; }
  const step = niceStep((max - min) / count);
  return [Math.floor(min / step + 1e-9) * step, Math.ceil(max / step - 1e-9) * step];
}
function logTicks(min, max) {
  const major = [], minor = [], d0 = Math.floor(Math.log10(min) + 1e-9), d1 = Math.ceil(Math.log10(max) - 1e-9), span = d1 - d0;
  for (let d = d0; d <= d1; d++) {
    const b = 10 ** d;
    for (const m of (span <= 2 ? [1, 2, 5] : [1])) { const v = b * m; if (v >= min * (1 - 1e-9) && v <= max * (1 + 1e-9)) major.push(+v.toPrecision(6)); }
    for (let m = 2; m <= 9; m++) { const v = b * m; if (v > min && v < max && !(span <= 2 && (m === 2 || m === 5))) minor.push(v); }
  }
  return { major, minor };
}

class Axis {
  constructor(o = {}) { Object.assign(this, { scale: 'lin', unit: '', label: '', include: [] }, o); this.fmin = o.min; this.fmax = o.max; this.min = o.min ?? 0; this.max = o.max ?? 1; }
  fit(lo, hi, count) {
    for (const v of this.include) { if (lo > v) lo = v; if (hi < v) hi = v; }
    if (!Number.isFinite(lo) || !Number.isFinite(hi)) { lo = 0; hi = 1; }
    if (this.scale === 'log') { lo = Math.max(lo, 1e-30); hi = Math.max(hi, lo * 1.0001); if (this.fmin == null) lo = 10 ** Math.floor(Math.log10(lo) + 1e-9); if (this.fmax == null) hi = 10 ** Math.ceil(Math.log10(hi) - 1e-9); if (hi <= lo) hi = lo * 10; }
    else { const [a, b] = niceRange(lo, hi, count); if (this.fmin == null) lo = a; if (this.fmax == null) hi = b; if (hi <= lo) hi = lo + 1; }
    this.min = this.fmin ?? lo; this.max = this.fmax ?? hi;
  }
  t(v) { return this.scale === 'log' ? (Math.log(v) - Math.log(this.min)) / (Math.log(this.max) - Math.log(this.min)) : (v - this.min) / (this.max - this.min); }
  inv(t) { return this.scale === 'log' ? this.min * (this.max / this.min) ** t : this.min + t * (this.max - this.min); }
  fmt(v, digits = 3) { return this.format ? this.format(v) : fmt(v, this.unit, digits); }
}

/**
 * @param {Element} container
 * @param {object} [o]  { x, y, y2, w=640, h=360, grid=true, cursor=true, legend=false, margin, zeroLine=false, tip(x,rows) }
 */
export function plot(container, o = {}) {
  ensureCss();
  const W = o.w ?? boxWidth(container), H = o.h ?? Math.round(W * 0.52);
  const ax = { x: new Axis(o.x), y: new Axis(o.y), y2: o.y2 ? new Axis(o.y2) : null };
  const m = { l: o.margin?.l ?? (o.ml ?? 58), r: o.margin?.r ?? (ax.y2 ? 58 : 16), t: o.margin?.t ?? ((o.y?.label || o.y2?.label) ? 28 : 16), b: o.margin?.b ?? (ax.x.label ? 38 : 30) };
  const id = 'vkp' + (++uidN);
  const root = h('div', { class: 'vk-plot' });
  const svg = s('svg', { viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': o.title || 'Diagramm', preserveAspectRatio: 'xMidYMid meet' });
  const gGrid = s('g'), gBand = s('g'), gSeries = s('g', { 'clip-path': `url(#${id}c)` }), gAnn = s('g'), gAxes = s('g'), gCur = s('g', { 'pointer-events': 'none' });
  const clip = s('clipPath', { id: id + 'c' }, s('rect', { x: m.l, y: m.t, width: W - m.l - m.r, height: H - m.t - m.b }));
  const hit = s('rect', { x: m.l, y: m.t, width: W - m.l - m.r, height: H - m.t - m.b, fill: 'transparent' });
  svg.append(clip, gGrid, gBand, gSeries, gAnn, gAxes, gCur, hit);
  const tip = h('div', { class: 'vk-tip' });
  const legend = h('div', { class: 'vk-legend' });
  root.append(svg, tip); if (o.legend) root.append(legend);
  container.append(root);
  const IW = W - m.l - m.r, IH = H - m.t - m.b;
  const X = v => m.l + ax.x.t(v) * IW;
  const Y = (v, a = 'y') => m.t + (1 - ax[a].t(v)) * IH;

  const series = new Map(), ann = new Map();
  const hoverFns = [];
  let lastKey = '', drawn = false;

  function ranges() {
    const ext = { x: [Infinity, -Infinity], y: [Infinity, -Infinity], y2: [Infinity, -Infinity] };
    for (const S of series.values()) {
      const a = S.o.axis || 'y';
      for (let i = 0; i < S.xs.length; i++) {
        const x = S.xs[i], y = S.ys[i];
        if (Number.isFinite(x)) { if (x < ext.x[0]) ext.x[0] = x; if (x > ext.x[1]) ext.x[1] = x; }
        if (Number.isFinite(y) && !(ax[a].scale === 'log' && y <= 0)) { if (y < ext[a][0]) ext[a][0] = y; if (y > ext[a][1]) ext[a][1] = y; }
      }
      if (S.o.type === 'bars') { if (ext[a][0] > 0) ext[a][0] = 0; }
    }
    ax.x.fit(ext.x[0], ext.x[1], Math.max(3, Math.round(IW / 80)));
    ax.y.fit(ext.y[0], ext.y[1], Math.max(3, Math.round(IH / 55)));
    ax.y2?.fit(ext.y2[0], ext.y2[1], Math.max(3, Math.round(IH / 55)));
  }

  function axesAndGrid() {
    gGrid.replaceChildren(); gAxes.replaceChildren();
    const lines = [], texts = [];
    const drawX = () => {
      const a = ax.x; let major, minor = [];
      if (a.scale === 'log') ({ major, minor } = logTicks(a.min, a.max)); else major = Array.isArray(a.ticks) ? a.ticks : linTicks(a.min, a.max, typeof a.ticks === 'number' ? a.ticks : Math.max(3, Math.round(IW / 80)));
      for (const v of minor) lines.push(`<line x1="${X(v)}" x2="${X(v)}" y1="${m.t}" y2="${m.t + IH}" class="mn"/>`);
      let lastR = -1e9;
      for (const v of major) {
        const x = X(v); if (x < m.l - 0.5 || x > m.l + IW + 0.5) continue;
        lines.push(`<line x1="${x}" x2="${x}" y1="${m.t}" y2="${m.t + IH}" class="mj"/>`);
        const label = a.fmt(v), wpx = label.length * 6.4;
        const anch = x + wpx / 2 > W - 2 ? 'end' : x - wpx / 2 < 2 ? 'start' : 'middle', x0 = anch === 'end' ? x + 4 : anch === 'start' ? x - 4 : x;
        const lo = anch === 'end' ? x0 - wpx : anch === 'start' ? x0 : x - wpx / 2;
        if (lo > lastR + 6) { texts.push(`<text x="${x0}" y="${m.t + IH + 16}" text-anchor="${anch}" class="vk-ticklabel">${esc(label)}</text>`); lastR = lo + wpx; }
      }
      if (a.label) texts.push(`<text x="${m.l + IW}" y="${H - 5}" text-anchor="end" class="vk-axlabel">${esc(a.label)}</text>`);
    };
    const drawY = (a, side) => {
      let major, minor = [];
      if (a.scale === 'log') ({ major, minor } = logTicks(a.min, a.max)); else major = Array.isArray(a.ticks) ? a.ticks : linTicks(a.min, a.max, typeof a.ticks === 'number' ? a.ticks : Math.max(3, Math.round(IH / 55)));
      const name = side === 'l' ? 'y' : 'y2';
      if (side === 'l') for (const v of minor) lines.push(`<line x1="${m.l}" x2="${m.l + IW}" y1="${Y(v, name)}" y2="${Y(v, name)}" class="mn"/>`);
      for (const v of major) {
        const y = Y(v, name); if (y < m.t - 0.5 || y > m.t + IH + 0.5) continue;
        if (side === 'l') lines.push(`<line x1="${m.l}" x2="${m.l + IW}" y1="${y}" y2="${y}" class="${v === 0 && ax.y.scale !== 'log' ? 'z' : 'mj'}"/>`);
        texts.push(`<text x="${side === 'l' ? m.l - 8 : m.l + IW + 8}" y="${y + 4}" text-anchor="${side === 'l' ? 'end' : 'start'}" class="vk-ticklabel">${esc(a.fmt(v))}</text>`);
      }
      if (a.label) texts.push(`<text x="${side === 'l' ? m.l - 8 : m.l + IW + 8}" y="${m.t - 4}" text-anchor="${side === 'l' ? 'end' : 'start'}" class="vk-axlabel">${esc(a.label)}</text>`);
    };
    drawX(); drawY(ax.y, 'l'); if (ax.y2) drawY(ax.y2, 'r');
    gGrid.innerHTML = `<style>.mj{stroke:var(--line-2);stroke-width:1}.mn{stroke:var(--line);stroke-width:1;opacity:.7}.z{stroke:var(--ink-2);stroke-width:1;opacity:.55}</style>${o.grid === false ? '' : lines.join('')}`;
    gAxes.innerHTML = `<rect x="${m.l}" y="${m.t}" width="${IW}" height="${IH}" fill="none" stroke="var(--line-2)"/>${texts.join('')}`;
  }

  // Pfad aus Daten (mit Min/Max-Dezimierung bei sehr vielen Punkten und Lücken bei NaN)
  function pathOf(S) {
    const a = S.o.axis || 'y', { xs, ys } = S, n = Math.min(xs.length, ys.length), parts = [];
    const f = v => v.toFixed(2);
    const px = new Float64Array(n), py = new Float64Array(n);
    for (let i = 0; i < n; i++) { px[i] = X(xs[i]); py[i] = ys[i] > 0 || ax[a].scale !== 'log' ? Y(ys[i], a) : NaN; }
    let pen = false;
    const dec = n > IW * 3;
    if (!dec) {
      for (let i = 0; i < n; i++) {
        if (!Number.isFinite(py[i]) || !Number.isFinite(px[i])) { pen = false; continue; }
        if (S.o.step && pen) parts.push('H' + f(px[i])); 
        parts.push((pen ? 'L' : 'M') + f(px[i]) + ' ' + f(py[i])); pen = true;
      }
    } else {
      let col = Math.floor(px[0]), lo = Infinity, hi = -Infinity, first = 0, last = 0, cnt = 0;
      const flush = () => { if (!cnt) return; const pts = [[col, first], [col + 0.3, lo], [col + 0.6, hi], [col + 0.9, last]].sort((p, q) => p[0] - q[0]); parts.push((pen ? 'L' : 'M') + f(col) + ' ' + f(first)); pen = true; if (lo !== first || hi !== first) { parts.push('L' + f(col + 0.3) + ' ' + f(lo), 'L' + f(col + 0.6) + ' ' + f(hi)); } parts.push('L' + f(col + 0.9) + ' ' + f(last)); void pts; };
      for (let i = 0; i < n; i++) {
        if (!Number.isFinite(py[i])) { flush(); cnt = 0; pen = false; lo = Infinity; hi = -Infinity; continue; }
        const c = Math.floor(px[i]);
        if (c !== col && cnt) { flush(); cnt = 0; lo = Infinity; hi = -Infinity; }
        if (!cnt) { col = c; first = py[i]; }
        lo = Math.min(lo, py[i]); hi = Math.max(hi, py[i]); last = py[i]; cnt++;
      }
      flush();
    }
    return { d: parts.join(''), px, py, n };
  }

  function drawSeries() {
    gSeries.replaceChildren();
    for (const S of series.values()) {
      const c = S.o.color;
      if (S.o.type === 'bars') {
        const n = Math.min(S.xs.length, S.ys.length); let html = '';
        const base = Y(Math.max(ax.y.min, Math.min(ax.y.max, 0)));
        let bw = S.o.barWidth ?? Math.max(2, Math.min(28, IW / Math.max(1, n) * 0.6));
        if (S.o.barWidth == null && n > 1) { let dmin = Infinity; const xsS = Array.from(S.xs).slice().sort((a, b) => a - b); for (let i = 1; i < xsS.length; i++) dmin = Math.min(dmin, X(xsS[i]) - X(xsS[i - 1])); bw = Math.max(2, Math.min(28, dmin * 0.62)); }
        for (let i = 0; i < n; i++) {
          const x = X(S.xs[i]), y = Y(Math.max(S.ys[i], ax.y.min));
          const top = Math.min(y, base), hgt = Math.abs(base - y);
          html += `<rect x="${(x - bw / 2).toFixed(2)}" y="${top.toFixed(2)}" width="${bw.toFixed(2)}" height="${Math.max(0, hgt).toFixed(2)}" rx="${Math.min(3, bw / 2)}" fill="${c}" opacity="${S.o.opacity ?? 0.85}"/>`;
          if (S.o.labels && S.ys[i] > (S.o.labelMin ?? 0)) html += `<text x="${x.toFixed(2)}" y="${(top - 5).toFixed(2)}" text-anchor="middle" class="vk-ticklabel" style="fill:var(--ink-2)">${esc(typeof S.o.labels === 'function' ? S.o.labels(S.xs[i], S.ys[i]) : ax.x.fmt(S.xs[i]))}</text>`;
        }
        gSeries.insertAdjacentHTML('beforeend', html); continue;
      }
      const P = pathOf(S);
      if (!P.d) continue;
      if (S.o.fill) {
        const a = S.o.axis || 'y', base = typeof S.o.fill === 'number' ? S.o.fill : 0, by = Y(Math.max(ax[a].min, Math.min(ax[a].max, base)), a);
        let first = 0, last = P.n - 1; while (first < P.n && !Number.isFinite(P.py[first])) first++; while (last >= 0 && !Number.isFinite(P.py[last])) last--;
        if (first < last) gSeries.append(s('path', { d: `${P.d}L${P.px[last].toFixed(2)} ${by.toFixed(2)}L${P.px[first].toFixed(2)} ${by.toFixed(2)}Z`, fill: c, 'fill-opacity': S.o.fillOpacity ?? 0.12, stroke: 'none' }));
      }
      gSeries.append(s('path', { d: P.d, fill: 'none', stroke: c, 'stroke-width': S.o.width, 'stroke-linejoin': 'round', 'stroke-linecap': 'round', 'stroke-dasharray': S.o.dash || null, opacity: S.o.opacity ?? 1 }));
      if (S.o.dots) for (let i = 0; i < P.n; i += S.o.dots === true ? 1 : S.o.dots) if (Number.isFinite(P.py[i])) gSeries.append(s('circle', { cx: P.px[i].toFixed(2), cy: P.py[i].toFixed(2), r: 3, fill: 'var(--surface)', stroke: c, 'stroke-width': 1.6 }));
    }
  }

  function drawAnn() {
    gBand.replaceChildren(); gAnn.replaceChildren();
    for (const A of ann.values()) {
      const c = A.o.color || 'var(--ink-2)';
      if (A.kind === 'band') {
        const x1 = Math.max(m.l, X(A.a)), x2 = Math.min(m.l + IW, X(A.b));
        if (x2 > x1) gBand.append(s('rect', { x: x1, y: m.t, width: x2 - x1, height: IH, fill: A.o.color || 'var(--accent)', 'fill-opacity': A.o.opacity ?? 0.1 }));
        if (A.o.label) gBand.append(s('text', { x: (x1 + x2) / 2, y: m.t + 13, 'text-anchor': 'middle', class: 'vk-ticklabel', style: 'fill:var(--ink-2)' }, A.o.label));
      } else if (A.kind === 'hband') {
        const y1 = Y(A.b, A.o.axis || 'y'), y2 = Y(A.a, A.o.axis || 'y');
        gBand.append(s('rect', { x: m.l, y: Math.max(m.t, y1), width: IW, height: Math.max(0, Math.min(m.t + IH, y2) - Math.max(m.t, y1)), fill: A.o.color || 'var(--accent)', 'fill-opacity': A.o.opacity ?? 0.1 }));
      } else if (A.kind === 'hline') {
        const y = Y(A.v, A.o.axis || 'y'); if (y < m.t || y > m.t + IH) continue;
        gAnn.append(s('line', { x1: m.l, x2: m.l + IW, y1: y, y2: y, stroke: c, 'stroke-width': A.o.width || 1.4, 'stroke-dasharray': A.o.dash ?? '5 4' }));
        if (A.o.label) gAnn.append(s('text', { x: m.l + IW - 6, y: y - 5, 'text-anchor': 'end', class: 'vk-ticklabel', style: `fill:${c}` }, A.o.label));
      } else if (A.kind === 'vline') {
        const x = X(A.v); if (x < m.l || x > m.l + IW) continue;
        gAnn.append(s('line', { x1: x, x2: x, y1: m.t, y2: m.t + IH, stroke: c, 'stroke-width': A.o.width || 1.4, 'stroke-dasharray': A.o.dash ?? '5 4' }));
        if (A.o.label) { const right = x < m.l + IW * 0.8; gAnn.append(s('text', { x: x + (right ? 6 : -6), y: m.t + 14, 'text-anchor': right ? 'start' : 'end', class: 'vk-ticklabel', style: `fill:${c}` }, A.o.label)); }
      } else if (A.kind === 'marker') {
        const x = X(A.x), y = Y(A.y, A.o.axis || 'y'); if (x < m.l - 1 || x > m.l + IW + 1 || y < m.t - 1 || y > m.t + IH + 1) continue;
        gAnn.append(s('circle', { cx: x, cy: y, r: A.o.r ?? 5.5, fill: 'var(--surface)', stroke: c === 'var(--ink-2)' ? 'var(--accent)' : c, 'stroke-width': 2.4 }));
        if (A.o.label) { const right = x < m.l + IW * 0.7, up = y > m.t + 24; gAnn.append(s('text', { x: x + (right ? 10 : -10), y: y + (up ? -9 : 16), 'text-anchor': right ? 'start' : 'end', class: 'vk-ticklabel', style: 'fill:var(--ink)' }, A.o.label)); }
      }
    }
  }

  function legendHtml() {
    if (!o.legend) return;
    legend.innerHTML = [...series.values()].filter(S => S.o.label).map(S => `<span><i style="background:${S.o.color}"></i>${esc(S.o.label)}</span>`).join('');
  }

  function draw(force) {
    ranges();
    const key = [ax.x, ax.y, ax.y2].map(a => a ? a.min + ',' + a.max : '').join('|');
    if (force || key !== lastKey || !drawn) { axesAndGrid(); lastKey = key; drawn = true; }
    drawSeries(); drawAnn();
    if (cursorX != null) moveCursor(cursorX);
    return P;
  }

  // ── Cursor / Hover ──
  let cursorX = null;
  function valueAt(S, x) {
    const { xs, ys } = S, n = Math.min(xs.length, ys.length);
    if (!n) return NaN;
    if (S.o.type === 'bars') { let b = 0; for (let i = 1; i < n; i++) if (Math.abs(xs[i] - x) < Math.abs(xs[b] - x)) b = i; return { x: xs[b], y: ys[b] }; }
    let lo = 0, hi = n - 1;
    if (xs[0] > xs[n - 1]) return NaN;
    if (x < xs[0] || x > xs[n - 1]) return NaN;
    while (hi - lo > 1) { const mid = (lo + hi) >> 1; if (xs[mid] <= x) lo = mid; else hi = mid; }
    const t = xs[hi] === xs[lo] ? 0 : (x - xs[lo]) / (xs[hi] - xs[lo]);
    return { x, y: ys[lo] + (ys[hi] - ys[lo]) * t };
  }
  function moveCursor(x) {
    cursorX = x;
    const rows = []; let html = '';
    const xs = X(x);
    for (const S of series.values()) {
      if (S.o.hover === false) continue;
      const r = valueAt(S, x); if (!r || !Number.isFinite(r.y)) continue;
      const a = S.o.axis || 'y';
      rows.push({ id: S.id, label: S.o.label || S.id, color: S.o.color, y: r.y, x: r.x, axis: a });
      const yy = Y(r.y, a);
      if (yy >= m.t - 1 && yy <= m.t + IH + 1) html += `<circle cx="${X(r.x).toFixed(2)}" cy="${yy.toFixed(2)}" r="4.2" fill="var(--surface)" stroke="${S.o.color}" stroke-width="2.2"/>`;
    }
    gCur.innerHTML = `<line x1="${xs}" x2="${xs}" y1="${m.t}" y2="${m.t + IH}" stroke="var(--ink-2)" stroke-opacity=".5" stroke-dasharray="3 3"/>${html}`;
    const xr = rows.length && rows[0].x != null && series.get(rows[0].id).o.type === 'bars' ? rows[0].x : x;
    const body = o.tip ? o.tip(xr, rows) : `<small>${esc(ax.x.fmt(xr, 4))}</small>` + rows.map(r => `<div><i style="background:${r.color}"></i>${esc(r.label)} ${esc(ax[r.axis].fmt(r.y, 4))}</div>`).join('');
    tip.innerHTML = body; tip.classList.add('on');
    const bw = root.clientWidth || W, sc = bw / W, tw = tip.offsetWidth;
    let left = xs * sc + 12; if (left + tw > bw - 4) left = xs * sc - tw - 12; tip.style.left = Math.max(2, left) + 'px'; tip.style.top = (m.t * sc + 6) + 'px';
    for (const f of hoverFns) f({ x: xr, values: Object.fromEntries(rows.map(r => [r.id, r.y])), rows });
  }
  function leave() { cursorX = null; gCur.replaceChildren(); tip.classList.remove('on'); }
  if (o.cursor !== false) {
    const pos = e => { const r = svg.getBoundingClientRect(); return (e.clientX - r.left) / r.width * W; };
    const handler = e => { if (e.pointerType === 'touch' && e.type === 'pointermove' && !(e.buttons & 1)) return; const px = pos(e); if (px < m.l || px > m.l + IW) return; moveCursor(ax.x.inv((px - m.l) / IW)); };
    hit.addEventListener('pointermove', handler); hit.addEventListener('pointerdown', handler);
    hit.addEventListener('pointerleave', e => { if (e.pointerType !== 'touch') leave(); });
    hit.addEventListener('pointercancel', leave);
  }

  const norm = (a, b) => [a, b];
  const P = {
    svg, el: root, ax, inner: { x: m.l, y: m.t, w: IW, h: IH }, X, Y, series, W, H,
    line(sid, xs, ys, so = {}) {
      const idx = series.size;
      series.set(sid, { id: sid, xs, ys, o: { color: PALETTE[idx % PALETTE.length], width: 2.2, ...so } }); legendHtml(); return draw();
    },
    bars(sid, xs, ys, so = {}) {
      const idx = series.size;
      series.set(sid, { id: sid, xs, ys, o: { color: PALETTE[idx % PALETTE.length], ...so, type: 'bars' } }); legendHtml(); return draw();
    },
    /** Daten einer vorhandenen Kurve ersetzen und neu zeichnen */
    set(sid, xs, ys) { const S = series.get(sid); if (!S) return P.line(sid, xs, ys); S.xs = xs; S.ys = ys; return draw(); },
    update(sid, xs, ys) { return P.set(sid, xs, ys); },
    remove(sid) { series.delete(sid); ann.delete(sid); legendHtml(); return draw(); },
    clear() { series.clear(); ann.clear(); legendHtml(); return draw(); },
    hline(aid, v, ao = {}) { ann.set(aid, { kind: 'hline', v, o: ao }); drawAnn(); return P; },
    vline(aid, v, ao = {}) { ann.set(aid, { kind: 'vline', v, o: ao }); drawAnn(); return P; },
    marker(aid, x, y, ao = {}) { ann.set(aid, { kind: 'marker', x, y, o: ao }); drawAnn(); return P; },
    band(aid, a, b, ao = {}) { ann.set(aid, { kind: 'band', a, b, o: ao }); drawAnn(); return P; },
    hband(aid, a, b, ao = {}) { ann.set(aid, { kind: 'hband', a, b, o: ao }); drawAnn(); return P; },
    removeAnn(aid) { ann.delete(aid); drawAnn(); return P; },
    /** Feste Bereiche setzen: p.range({ x: [0, 1], y: [-5, 5] }); null = wieder automatisch */
    range(r) {
      for (const k of ['x', 'y', 'y2']) if (r[k] !== undefined && ax[k]) { ax[k].fmin = r[k]?.[0]; ax[k].fmax = r[k]?.[1]; }
      return draw(true);
    },
    onHover(fn) { hoverFns.push(fn); return P; },
    cursorAt(x) { moveCursor(x); return P; },
    hideCursor: leave,
    draw,
    destroy() { root.remove(); },
  };
  void norm;
  draw(true);
  return P;
}

// ── Spezialfälle ─────────────────────────────────────────────────────────────

/** Zeitverlauf: x in s, y in V (anpassbar). */
export function timePlot(container, o = {}) {
  return plot(container, { ...o, x: { unit: 's', label: 't', ...o.x }, y: { unit: 'V', include: [0], ...o.y } });
}

/** Kennlinie: x/y linear mit Einheiten; Arbeitspunkt per p.marker(). */
export function characteristic(container, o = {}) {
  return plot(container, { ...o, x: { unit: 'V', label: 'U', include: [0], ...o.x }, y: { unit: 'A', label: 'I', include: [0], ...o.y } });
}

/**
 * Bode-Diagramm: Betrag in dB (oben) und Phase in ° (unten), gemeinsame log. Frequenzachse, verknüpfte Cursor.
 *   const b = bode(stage, { fmin: 10, fmax: 1e5 });
 *   b.set('h', freqs, dbArray, phaseArray, { color, label });
 *   b.mark(1591, { label: 'f_c' });   b.minus3dB(0);   // gestrichelte Hilfslinien
 * o: { fmin, fmax, dbMin, dbMax, phaseMin=-180, phaseMax=180 (z. B. -90…0 für Tiefpass 1. Ordnung), legend }
 */
export function bode(container, o = {}) {
  ensureCss();
  const box = h('div', { class: 'vk-bode' }); container.append(box);
  const xo = { scale: 'log', unit: 'Hz', min: o.fmin, max: o.fmax };
  const pmin = o.phaseMin ?? -180, pmax = o.phaseMax ?? 180, pstep = (pmax - pmin) > 200 ? 90 : 45;
  const ptick = []; for (let v = pmin; v <= pmax + 1e-9; v += pstep) ptick.push(v);
  const BW = o.w ?? boxWidth(container), mag = plot(box, { w: BW, h: o.h1 ?? Math.max(210, Math.round(BW * 0.4)), x: { ...xo }, y: { unit: 'dB', min: o.dbMin, max: o.dbMax, label: '|H| in dB', ticks: o.dbTicks }, legend: o.legend, margin: { b: 26 } });
  const ph = plot(box, { w: BW, h: o.h2 ?? Math.max(180, Math.round(BW * 0.3)), x: { ...xo, label: 'f' }, y: { unit: '°', min: pmin, max: pmax, ticks: ptick, label: 'φ in °' } });
  let busy = false;
  const sync = (a, b) => a.onHover(({ x }) => { if (busy) return; busy = true; try { b.cursorAt(x); } finally { busy = false; } });
  sync(mag, ph); sync(ph, mag);
  [mag, ph].forEach(p => p.svg.addEventListener('pointerleave', () => { mag.hideCursor(); ph.hideCursor(); }));
  const B = {
    mag, phase: ph, el: box,
    set(id, f, db, phase, so = {}) {
      mag.line(id, f, db, so); ph.line(id, f, phase, { ...so, label: so.label });
      mag.range({}); return B;
    },
    mark(f, mo = {}) { mag.vline('mk', f, { color: 'var(--accent-2)', ...mo }); ph.vline('mk', f, { color: 'var(--accent-2)', dash: '5 4' }); return B; },
    unmark() { mag.removeAnn('mk'); ph.removeAnn('mk'); return B; },
    /** Hilfslinie bei (Referenz − 3 dB) */
    minus3dB(ref = 0) { mag.hline('m3', ref - 3.0103, { label: '−3 dB', color: 'var(--muted)' }); return B; },
    phaseLine(deg, ph2 = {}) { ph.hline('pl' + deg, deg, { label: ph2.label ?? deg + '°', color: 'var(--muted)' }); return B; },
    destroy() { box.remove(); },
  };
  return B;
}

/**
 * Spektrum als Balken. s.set(freqs, amps): amps linear (V) oder, mit { db: true }, in dB.
 *   const sp = spectrum(stage, { fmax: 10e3, unit: 'V' });  sp.set([1000, 3000, 5000], [1, 0.33, 0.2]);
 */
export function spectrum(container, o = {}) {
  const db = !!o.db;
  const p = plot(container, { ...o, x: { unit: 'Hz', label: 'f', min: o.fmin ?? 0, max: o.fmax, ...o.x }, y: { unit: db ? 'dB' : (o.unit ?? 'V'), include: db ? [] : [0], min: db ? o.dbMin : undefined, ...o.y } });
  return Object.assign(p, {
    set(f, a, so = {}) { return p.bars('sp', f, a, { color: 'var(--accent)', labels: (x) => fmt(x, 'Hz'), labelMin: db ? -Infinity : (Math.max(...a) * 0.04), ...so }); },
  });
}
