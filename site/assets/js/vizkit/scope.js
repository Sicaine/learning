// vizkit/scope.js — Oszilloskop-Anzeige (SVG): Raster, Kanäle, Zeit/Div, Volt/Div, Trigger, Cursor, Messwerte.
//
//   const sc = scope(stage, {
//     channels: [{ id: 'ch1', label: 'CH1', signal: t => 2 * Math.sin(2 * Math.PI * 1e3 * t), vdiv: 1 }],
//     timeDiv: 0.5e-3,
//   });
//   sc.setSignal('ch1', t => …);                    // Funktion t → V  …
//   sc.setSignal('ch2', { t: tArr, v: vArr });       // … oder Arrays (z. B. aus transient()) bzw. { dt, t0, data }
//   sc.set({ timeDiv: 1e-3, trigger: { level: 0.5 } });   sc.measure('ch1') → { vpp, vrms, vavg, freq, … }
//
// Trigger: { source, level [V], edge: 'rise'|'fall', mode: 'auto' (ohne Flanke freilaufend) | 'normal' | 'none' (rollt) }.
// Die Anzeige animiert sich selbst (stoppt, wenn das Element verschwindet / unsichtbar ist); controls:false schaltet das Bedienfeld ab.
import { fmt, seq125 } from './si.js';
import { ensureCss, h, s, PALETTE, esc, boxWidth } from './base.js';
import { animate } from './anim.js';
import { controls } from './controls.js';

const DEF_COLORS = ['var(--accent)', 'var(--accent-2)', 'var(--good)', 'var(--warn)'];

/** Signal → Wert bei t (Funktion, { t, v }, { dt, t0, data }); NaN außerhalb. */
function sampler(sig) {
  if (typeof sig === 'function') return sig;
  if (!sig) return () => NaN;
  if (sig.data) { const { data, dt, t0 = 0 } = sig; return t => { const x = (t - t0) / dt; if (x < 0 || x > data.length - 1) return NaN; const i = Math.floor(x), f = x - i; return i >= data.length - 1 ? data[data.length - 1] : data[i] + (data[i + 1] - data[i]) * f; }; }
  const T = sig.t, V = sig.v, n = Math.min(T.length, V.length); let last = 0;
  return t => {
    if (t < T[0] || t > T[n - 1]) return NaN;
    if (!(T[last] <= t && (last === n - 1 || t <= T[last + 1]))) { let lo = 0, hi = n - 1; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (T[m] <= t) lo = m; else hi = m; } last = lo; }
    const j = Math.min(last + 1, n - 1), f = T[j] === T[last] ? 0 : (t - T[last]) / (T[j] - T[last]);
    return V[last] + (V[j] - V[last]) * f;
  };
}
const span = sig => sig && !(typeof sig === 'function') ? (sig.data ? [sig.t0 ?? 0, (sig.t0 ?? 0) + sig.dt * (sig.data.length - 1)] : [sig.t[0], sig.t[sig.t.length - 1]]) : null;

export function scope(container, o = {}) {
  ensureCss();
  const divX = o.divs?.[0] ?? 10, divY = o.divs?.[1] ?? 8;
  const W = o.w ?? boxWidth(container, 360, 760), PX = W / divX, SH = PX * divY * 0.7, BAR = 30, H = SH + BAR, PY = SH / divY;   // Bildschirm + Statusleiste
  const st = {
    timeDiv: o.timeDiv ?? 1e-3, running: o.running ?? true, cursor: o.cursor ?? 'off', cx: [2, 5], cy: [-1.5, 1.5],
    trigger: { source: o.channels?.[0]?.id ?? 'ch1', level: 0, edge: 'rise', mode: 'auto', ...o.trigger },
    now: 0, t0: 0,
  };
  const chans = (o.channels || [{ id: 'ch1' }]).map((c, i) => ({ id: c.id ?? 'ch' + (i + 1), label: c.label ?? 'CH' + (i + 1), color: c.color ?? DEF_COLORS[i % 4], vdiv: c.vdiv ?? 1, pos: c.pos ?? 0, coupling: c.coupling ?? 'dc', unit: c.unit ?? 'V', on: c.on !== false, sig: c.signal, f: sampler(c.signal) }));
  const byId = id => chans.find(c => c.id === id);

  const root = h('div', { class: 'vk vk-scope' });
  const screen = h('div', { class: 'vk-scope-screen' });
  const uid = 'vks' + Math.random().toString(36).slice(2, 7);
  const svg = s('svg', { viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': 'Oszilloskop' });
  const clip = s('clipPath', { id: uid }, s('rect', { x: 0, y: 0, width: W, height: SH }));
  let grid = '';
  for (let i = 0; i <= divX; i++) grid += `<line x1="${i * PX}" x2="${i * PX}" y1="0" y2="${SH}" stroke="${i === 0 || i === divX ? 'var(--line-2)' : i === divX / 2 ? 'var(--line-2)' : 'var(--line)'}"/>`;
  for (let j = 0; j <= divY; j++) grid += `<line x1="0" x2="${W}" y1="${j * PY}" y2="${j * PY}" stroke="${j === 0 || j === divY || j === divY / 2 ? 'var(--line-2)' : 'var(--line)'}"/>`;
  let ticks = '';
  for (let i = 0; i < divX * 5; i++) { const x = i * PX / 5, big = i % 5 === 0; if (!big) ticks += `<line x1="${x}" x2="${x}" y1="${SH / 2 - 3}" y2="${SH / 2 + 3}" stroke="var(--line-2)"/>`; }
  for (let j = 0; j < divY * 5; j++) { const y = j * PY / 5; if (j % 5) ticks += `<line y1="${y}" y2="${y}" x1="${W / 2 - 3}" x2="${W / 2 + 3}" stroke="var(--line-2)"/>`; }
  const gGrid = s('g', { html: '' }); gGrid.innerHTML = grid + ticks;
  const gTr = s('g', { 'clip-path': `url(#${uid})` });
  const gCur = s('g'), gBar = s('g', { transform: `translate(0 ${SH})` });
  const paths = chans.map(c => { const p = s('path', { fill: 'none', stroke: c.color, 'stroke-width': 2.4, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }); const glow = s('path', { fill: 'none', stroke: c.color, 'stroke-width': 6, opacity: .12, 'stroke-linejoin': 'round' }); gTr.append(glow, p); return [p, glow]; });
  const trigMark = s('path', { d: 'M0 -5 L9 0 L0 5Z', fill: 'var(--ink-2)', opacity: .8 });
  const trigTime = s('path', { d: 'M-5 0 L5 0 L0 8Z', fill: 'var(--ink-2)', opacity: .8 });
  const zeroMarks = chans.map(c => s('path', { d: 'M0 -5 L-9 0 L0 5Z', fill: c.color, transform: 'translate(0,0)' }));
  svg.append(clip, gGrid, gTr, trigMark, trigTime, ...zeroMarks, gCur, gBar);
  screen.append(svg);
  const info = h('div', { class: 'vk-scope-info' });
  root.append(screen, info);
  container.append(root);

  const ypx = (c, v) => SH / 2 - (v / c.vdiv + c.pos) * PY;
  const N = Math.round(W);

  // ── Triggersuche ──
  function findTrigger(c, from, T) {
    const f = c.f, lvl = st.trigger.level, rise = st.trigger.edge !== 'fall';
    const rng = span(c.sig);
    const step = T / 100, maxN = 2000;
    let t = rng ? Math.max(from, rng[0] + T * 0.1) : from, prev = f(t) - lvl;
    for (let k = 0; k < maxN; k++) {
      const t2 = t + step, cur = f(t2) - lvl;
      if (rng && t2 > rng[1]) return null;
      if (Number.isFinite(prev) && Number.isFinite(cur) && (rise ? (prev < 0 && cur >= 0) : (prev > 0 && cur <= 0))) {
        let a = t, b = t2;
        for (let i = 0; i < 24; i++) { const mid = (a + b) / 2, v = f(mid) - lvl; if (rise ? v < 0 : v > 0) a = mid; else b = mid; }
        return (a + b) / 2;
      }
      prev = cur; t = t2;
    }
    return null;
  }

  function draw() {
    const T = st.timeDiv * divX;
    const src = byId(st.trigger.source) || chans[0];
    let t0 = st.now;
    if (st.trigger.mode !== 'none' && src) {
      const tc = findTrigger(src, st.now, T);
      if (tc != null) { t0 = tc - T * 0.1; st.locked = true; }
      else { st.locked = false; if (st.trigger.mode === 'normal' && st.t0 != null) t0 = st.t0; }
    }
    st.t0 = t0;
    const readT = [];
    chans.forEach((c, k) => {
      const [p, glow] = paths[k];
      p.style.display = glow.style.display = c.on ? '' : 'none';
      if (!c.on) return;
      let d = '', pen = false, mean = 0, cnt = 0;
      const vals = new Float64Array(N);
      for (let i = 0; i < N; i++) { const v = c.f(t0 + T * i / (N - 1)); vals[i] = v; if (Number.isFinite(v)) { mean += v; cnt++; } }
      if (c.coupling === 'ac' && cnt) mean /= cnt; else mean = 0;
      for (let i = 0; i < N; i++) {
        const v = vals[i];
        if (!Number.isFinite(v)) { pen = false; continue; }
        const x = i * W / (N - 1), y = Math.max(-30, Math.min(SH + 30, ypx(c, v - mean)));
        d += (pen ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1); pen = true;
      }
      p.setAttribute('d', d); glow.setAttribute('d', d);
      zeroMarks[k].setAttribute('transform', `translate(0 ${Math.max(6, Math.min(SH - 6, ypx(c, 0))).toFixed(1)})`);
      c.vals = vals; c.mean = mean;
    });
    // Trigger-Pfeile
    const tsrc = src;
    trigMark.setAttribute('transform', `translate(${W} ${Math.max(6, Math.min(SH - 6, ypx(tsrc, st.trigger.level))).toFixed(1)}) scale(-1 1)`);
    trigMark.style.display = st.trigger.mode === 'none' ? 'none' : '';
    trigMark.setAttribute('fill', tsrc.color);
    trigTime.setAttribute('transform', `translate(${(0.1 * W).toFixed(1)} 0)`);
    trigTime.style.display = st.trigger.mode === 'none' ? 'none' : '';
    // Statusleiste
    let bar = '';
    let x = 10;
    const nar = W < 520, pw = nar ? 112 : 126;
    chans.forEach(c => { if (!c.on) return; bar += `<g transform="translate(${x} 4)"><rect width="${pw}" height="21" rx="10.5" fill="var(--surface)" stroke="${c.color}"/><text x="9" y="14.5" style="font:700 ${nar ? 10 : 11}px var(--mono);fill:${c.color}">${esc(c.label)}</text><text x="${nar ? 38 : 46}" y="14.5" style="font:500 ${nar ? 10 : 11}px var(--mono);fill:var(--ink-2)">${esc(fmt(c.vdiv, c.unit + '/Div', 2))}${c.coupling === 'ac' ? '~' : ''}</text></g>`; x += pw + 8; });
    const trigTxt = W < 520 ? '' : st.trigger.mode === 'none' ? 'Roll' : `${st.trigger.edge === 'fall' ? '↘' : '↗'} ${fmt(st.trigger.level, 'V', 2)}${st.locked === false ? ' · wartet' : ''}`;
    bar += `<text x="${W - 10}" y="19" text-anchor="end" style="font:600 12px var(--mono);fill:var(--ink)">${esc(fmt(st.timeDiv, 's/Div', 2))}<tspan dx="12" style="fill:var(--muted)">${esc(trigTxt)}</tspan></text>`;
    gBar.innerHTML = bar;
    drawCursors(T);
    updateInfo(T);
    return S;
  }

  // ── Messung ──
  function measure(id) {
    const c = byId(id) || chans[0];
    const v = c.vals; if (!v) return {};
    let mx = -Infinity, mn = Infinity, sum = 0, sq = 0, n = 0;
    for (let i = 0; i < v.length; i++) { const x = v[i] - (c.mean || 0); if (!Number.isFinite(x)) continue; mx = Math.max(mx, x); mn = Math.min(mn, x); sum += x; sq += x * x; n++; }
    if (!n) return {};
    const T = st.timeDiv * divX, mid = (mx + mn) / 2, cr = [];
    for (let i = 1; i < v.length; i++) { const a = v[i - 1] - (c.mean || 0) - mid, b = v[i] - (c.mean || 0) - mid; if (a < 0 && b >= 0) cr.push(i - 1 + (-a) / (b - a)); }
    let freq = null;
    if (cr.length >= 2) { freq = (cr.length - 1) / ((cr[cr.length - 1] - cr[0]) * T / (v.length - 1)); }
    return { vmax: mx, vmin: mn, vpp: mx - mn, vavg: sum / n, vrms: Math.sqrt(sq / n), freq, period: freq ? 1 / freq : null };
  }

  function updateInfo(T) {
    const c = byId(st.cursor === 'off' ? st.trigger.source : st.trigger.source) || chans[0];
    const m = measure(c.id);
    let html = `<span style="color:${c.color}">${esc(c.label)}</span>`;
    html += m.vpp != null ? `<span>U<sub>ss</sub> ${esc(fmt(m.vpp, c.unit))}</span><span>U<sub>eff</sub> ${esc(fmt(m.vrms, c.unit))}</span><span>Ū ${esc(fmt(m.vavg, c.unit))}</span>` : '';
    if (m.freq) html += `<span>f ${esc(fmt(m.freq, 'Hz'))}</span><span>T ${esc(fmt(m.period, 's'))}</span>`;
    if (st.cursor === 'time') { const dt = Math.abs(st.cx[1] - st.cx[0]) * st.timeDiv; html += `<span style="color:var(--accent-2)">ΔT ${esc(fmt(dt, 's'))}</span><span style="color:var(--accent-2)">1/ΔT ${esc(fmt(1 / dt, 'Hz'))}</span>`; }
    if (st.cursor === 'volt') { const dv = Math.abs(st.cy[1] - st.cy[0]) * c.vdiv; html += `<span style="color:var(--accent-2)">ΔU ${esc(fmt(dv, c.unit))}</span>`; }
    if (info.dataset.h !== html) { info.innerHTML = html; info.dataset.h = html; }
  }

  // ── Cursor (ziehbar) ──
  function drawCursors() {
    gCur.replaceChildren();
    if (st.cursor === 'off') return;
    const c = byId(st.trigger.source) || chans[0], T = st.timeDiv * divX;
    if (st.cursor === 'time') st.cx.forEach((d, i) => {
      const x = d * PX;
      gCur.append(s('line', { x1: x, x2: x, y1: 0, y2: SH, stroke: 'var(--accent-2)', 'stroke-width': 1.5, 'stroke-dasharray': '5 4' }));
      gCur.append(s('rect', { x: x - 14, y: 0, width: 28, height: SH, fill: 'transparent', style: 'cursor:ew-resize', 'data-cur': 'x' + i }));
      const v = c.f(st.t0 + T * d / divX);
      if (Number.isFinite(v)) { gCur.append(s('circle', { cx: x, cy: Math.max(0, Math.min(SH, ypx(c, v - (c.mean || 0)))), r: 4.5, fill: 'var(--surface)', stroke: 'var(--accent-2)', 'stroke-width': 2 })); gCur.append(s('text', { x: x + (d < divX - 2 ? 6 : -6), y: 14, 'text-anchor': d < divX - 2 ? 'start' : 'end', style: 'font:600 11px var(--mono);fill:var(--accent-2)' }, fmt(v, c.unit, 3))); }
    });
    else st.cy.forEach((d, i) => {
      const y = SH / 2 - d * PY;
      gCur.append(s('line', { x1: 0, x2: W, y1: y, y2: y, stroke: 'var(--accent-2)', 'stroke-width': 1.5, 'stroke-dasharray': '5 4' }));
      gCur.append(s('rect', { x: 0, y: y - 14, width: W, height: 28, fill: 'transparent', style: 'cursor:ns-resize', 'data-cur': 'y' + i }));
      gCur.append(s('text', { x: W - 6, y: y - 5, 'text-anchor': 'end', style: 'font:600 11px var(--mono);fill:var(--accent-2)' }, fmt((d - c.pos) * c.vdiv, c.unit, 3)));
    });
  }
  let drag = null;
  svg.addEventListener('pointerdown', e => { const t = e.target.closest?.('[data-cur]'); if (!t) return; drag = t.dataset.cur; svg.setPointerCapture(e.pointerId); e.preventDefault(); });
  svg.addEventListener('pointermove', e => {
    if (!drag) return;
    const r = svg.getBoundingClientRect(), px = (e.clientX - r.left) / r.width * W, py = (e.clientY - r.top) / r.height * H;
    const i = +drag[1];
    if (drag[0] === 'x') st.cx[i] = Math.max(0, Math.min(divX, px / PX)); else st.cy[i] = Math.max(-divY / 2, Math.min(divY / 2, (SH / 2 - py) / PY));
    drawCursors(); updateInfo();
  });
  const end = () => { drag = null; }; svg.addEventListener('pointerup', end); svg.addEventListener('pointercancel', end);

  // ── Bedienfeld ──
  let ui = null, loop = null;
  const tdList = seq125(o.timeMin ?? 1e-7, o.timeMax ?? 5);
  const vList = c => seq125(c.vmin ?? 1e-3, c.vmax ?? 100);
  const mode = o.controls === undefined ? 'basic' : o.controls === true ? 'full' : o.controls;   // 'full' | 'basic' | false
  if (mode) {
    const full = mode === 'full';
    const defs = [
      { id: 'timeDiv', label: 'Zeit/Div', unit: 's', values: tdList, scale: 'log', value: st.timeDiv, digits: 2 },
      ...(full ? chans.map(c => ({ id: 'v_' + c.id, label: `${c.label} Volt/Div`, unit: c.unit, values: vList(c), scale: 'log', value: c.vdiv, digits: 2 })) : []),
      ...(full ? [
        { id: 'level', label: 'Trigger-Pegel', unit: 'V', min: -(o.levelMax ?? 10), max: o.levelMax ?? 10, step: 0.05, value: st.trigger.level },
        { id: 'edge', type: 'seg', options: [['rise', '↗ steigend'], ['fall', '↘ fallend']], value: st.trigger.edge },
        { id: 'mode', type: 'seg', options: [['auto', 'Auto'], ['normal', 'Normal'], ['none', 'Roll']], value: st.trigger.mode },
      ] : []),
      { id: 'cursor', type: 'seg', options: [['off', 'Cursor aus'], ['time', 'Zeit'], ['volt', 'Spannung']], value: st.cursor },
    ];
    ui = controls(root, defs, vals => {
      st.timeDiv = vals.timeDiv; st.cursor = vals.cursor;
      if (full) { st.trigger.level = vals.level; st.trigger.edge = vals.edge; st.trigger.mode = vals.mode; chans.forEach(c => { c.vdiv = vals['v_' + c.id]; }); }
      sync(); S.draw();
    });
    root.insertBefore(ui.el, info);
  }
  const needsLoop = () => st.trigger.mode === 'none' || chans.some(c => typeof c.sig === 'function');
  const sync = () => { if (loop) { if (st.running && needsLoop()) loop.play(); else if (!st.running || !needsLoop()) loop.pause(); } };

  const S = {
    el: root, svg, chans, state: st, ui, draw, measure,
    setSignal(id, sig) { const c = byId(id); c.sig = sig; c.f = sampler(sig); sync(); if (!loop?.running) draw(); return S; },
    /** Parameter setzen: { timeDiv, trigger: {…}, cursor, channels: { ch1: { vdiv, coupling, on, pos } } } */
    set(p) {
      if (p.timeDiv != null) { st.timeDiv = p.timeDiv; ui?.set({ timeDiv: p.timeDiv }, { silent: true }); }
      if (p.trigger) { Object.assign(st.trigger, p.trigger); ui?.set({ level: st.trigger.level, edge: st.trigger.edge, mode: st.trigger.mode }, { silent: true }); }
      if (p.cursor) { st.cursor = p.cursor; ui?.set({ cursor: p.cursor }, { silent: true }); }
      for (const [id, cp] of Object.entries(p.channels || {})) { const c = byId(id); Object.assign(c, cp); if (cp.vdiv) ui?.set({ ['v_' + id]: cp.vdiv }, { silent: true }); }
      sync(); draw(); return S;
    },
    run() { st.running = true; sync(); return S; },
    stop() { st.running = false; sync(); return S; },
    get running() { return st.running; },
    destroy() { loop?.stop(); root.remove(); },
  };
  // Animation: nur nötig, wenn Funktionssignale laufen oder im Roll-Modus
  const rollSpeed = o.rollSpeed ?? (st.timeDiv * divX) / 4;
  loop = animate(root, (dt, t) => { st.now = st.trigger.mode === 'none' ? t * rollSpeed : t; draw(); }, { paused: !st.running || !needsLoop() });
  if (mode === 'full' && o.runButton !== false) {
    const row = h('div', { class: 'vk-row', style: 'display:flex;gap:10px;align-items:center;flex-wrap:wrap' });
    loop.controls(row, { speeds: [[1, '1×'], [0.1, '0,1×'], [0.01, '0,01×']] });
    root.insertBefore(row, info);
  }
  draw();
  return S;
}
