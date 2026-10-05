// vizkit/controls.js — Regler, Schalter, Segmentwahl, Presets, Anzeigen und Ziel-Chips.
//
//   const ui = controls(root, [
//     { id: 'R', label: 'Widerstand R', unit: 'Ω', min: 100, max: 100e3, value: 1e3, scale: 'log', snap: 'E12' },
//     { id: 'f', label: 'Frequenz', unit: 'Hz', min: 10, max: 1e5, value: 1e3, scale: 'log' },
//     { id: 'shape', type: 'seg', options: [['sine', 'Sinus'], ['square', 'Rechteck']], value: 'sine' },
//     { id: 'sw', type: 'toggle', label: 'Schalter', value: true },
//     { type: 'presets', items: [{ label: 'Tiefpass', values: { R: 1e3 } }], reset: true },
//   ], (values, changedId) => redraw());
//   ui.values.R   ui.set({ R: 2200 })   ui.on(fn)   ui.reset()
//
// Klick auf den Zahlenwert erlaubt Eingabe per Tastatur („4k7“, „10 nF“).
import { fmt, parse, eSeries, eNearest, sliderToValue, valueToSlider, clamp } from './si.js';
import { ensureCss, h } from './base.js';

const RES = 1000;   // Auflösung stetiger Regler

function makeSlider(d, ui) {
  const scale = d.scale || 'lin';
  let list = d.values ? d.values.slice() : null;
  if (!list && typeof d.snap === 'string') list = eSeries(d.snap, d.min, d.max);
  const stepped = !!list;
  const dist = scale === 'log' ? (a, b) => Math.abs(Math.log(a / b)) : (a, b) => Math.abs(a - b);
  const idxOf = v => { let b = 0; for (let i = 1; i < list.length; i++) if (dist(list[i], v) < dist(list[b], v)) b = i; return b; };
  const toPos = v => stepped ? idxOf(v) : Math.round(valueToSlider(v, d.min, d.max, scale) * RES);
  const quant = v => {
    if (typeof d.snap === 'number') v = Math.round(v / d.snap) * d.snap;
    else if (d.step) v = Math.round((v - d.min) / d.step) * d.step + d.min;
    return clamp(+v.toPrecision(12), d.min, d.max);
  };
  const fromPos = p => stepped ? list[p] : quant(sliderToValue(p / RES, d.min, d.max, scale));
  const format = d.format || (v => fmt(v, d.unit || '', d.digits ?? 3));
  const inp = h('input', { type: 'range', min: 0, max: stepped ? list.length - 1 : RES, step: 1, 'aria-label': d.label || d.id });
  const out = h('output', { tabindex: 0, class: 'vk-val', title: 'Klicken zum Eingeben' });
  const label = h('label', {}, h('span', { text: d.label || d.id }), out);
  const box = h('div', { class: 'vz-control vk-control' + (d.wide ? ' vk-wide' : ''), 'data-id': d.id }, label, inp);
  if (d.hint) box.append(h('small', { class: 'vk-hint', text: d.hint }));
  const api = {
    box, d,
    show(v) {
      const p = toPos(v); inp.value = p;
      const pct = (p - +inp.min) / (+inp.max - +inp.min) * 100;
      inp.style.setProperty('--vk-fill', pct + '%');
      out.textContent = format(v); inp.setAttribute('aria-valuetext', out.textContent);
    },
    clean: v => stepped ? list[idxOf(clamp(v, d.min ?? list[0], d.max ?? list[list.length - 1]))] : quant(v),
  };
  inp.addEventListener('input', () => { const v = fromPos(+inp.value); ui.set({ [d.id]: v }, { from: d.id }); });
  // Eingabe per Tastatur
  const edit = () => {
    const f = h('input', { class: 'vk-edit', value: out.textContent, 'aria-label': (d.label || d.id) + ' eingeben', inputmode: 'text' });
    out.replaceWith(f); f.focus(); f.select();
    let done = false;
    const end = ok => { if (done) return; done = true; if (ok) { const v = parse(f.value.replace(/[^\d.,eE+\-−kKMGTmuµμnpf]/g, m => /[a-zA-ZΩ]/.test(m) ? '' : m)); if (!Number.isNaN(v)) ui.set({ [d.id]: v }, { from: d.id }); } f.replaceWith(out); api.show(ui.values[d.id]); };
    f.onkeydown = e => { if (e.key === 'Enter') end(true); else if (e.key === 'Escape') end(false); };
    f.onblur = () => end(true);
  };
  out.onclick = edit; out.onkeydown = e => { if (e.key === 'Enter') edit(); };
  return api;
}

function makeSeg(d, ui) {
  const opts = d.options.map(o => Array.isArray(o) ? o : [o, String(o)]);
  const seg = h('div', { class: 'vz-seg vk-seg', role: 'group', 'aria-label': d.label || d.id });
  const btns = opts.map(([v, l]) => h('button', { type: 'button', text: l, onclick: () => ui.set({ [d.id]: v }, { from: d.id }) }));
  seg.append(...btns);
  const box = h('div', { class: 'vk-control vk-segbox', 'data-id': d.id }, d.label ? h('span', { class: 'vk-seglabel', text: d.label }) : null, seg);
  return { box, d, show(v) { btns.forEach((b, i) => { const on = opts[i][0] === v; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); }); }, clean: v => v };
}

function makeToggle(d, ui) {
  const b = h('button', { type: 'button', class: 'vk-toggle', role: 'switch', 'aria-label': d.label || d.id }, h('span', { class: 'vk-knob' }));
  b.onclick = () => ui.set({ [d.id]: !ui.values[d.id] }, { from: d.id });
  const box = h('div', { class: 'vk-control vk-togglebox', 'data-id': d.id }, b, h('span', { class: 'vk-togglelabel', text: d.label || d.id }));
  box.onclick = e => { if (e.target !== b && !b.contains(e.target)) b.click(); };
  return { box, d, show(v) { b.setAttribute('aria-checked', !!v); b.classList.toggle('on', !!v); }, clean: v => !!v };
}

/**
 * Regler-Panel bauen.
 * @param {Element} root
 * @param {object[]} defs  Regler-Definitionen (siehe Dateikopf); type: 'slider' (Standard) | 'seg' | 'toggle' | 'presets' | 'button'
 * @param {(values:object, changedId?:string)=>void} [onChange]  wird bei jeder Änderung durch den Benutzer (und set() ohne silent) gerufen
 * @returns {{ el, values, set(obj, {silent}), get(id), on(fn), reset(), setRange(id, {min,max}) }}
 */
export function controls(root, defs, onChange) {
  ensureCss();
  const el = h('div', { class: 'vk vk-controls-wrap' });
  const row = h('div', { class: 'vz-controls vk-row' });
  el.append(row);
  const listeners = onChange ? [onChange] : [];
  const values = {}, widgets = {}, initial = {};
  const ui = {
    el, values, defs,
    get: id => values[id],
    on(fn) { listeners.push(fn); return () => listeners.splice(listeners.indexOf(fn), 1); },
    /** Werte setzen. opts.silent = onChange nicht aufrufen */
    set(obj, opts = {}) {
      let changed = null;
      for (const [id, raw] of Object.entries(obj)) {
        const w = widgets[id]; if (!w) { values[id] = raw; continue; }
        const v = w.clean(raw);
        if (values[id] !== v) changed = id;
        values[id] = v; w.show(v);
      }
      refreshPresets();
      if (!opts.silent && (changed || opts.force)) for (const f of listeners) f(values, opts.from || changed);
      return ui;
    },
    reset(opts) { return ui.set(initial, opts); },
    setRange(id, r) { const w = widgets[id]; if (!w) return; Object.assign(w.d, r); const nw = makeSlider(w.d, ui); w.box.replaceWith(nw.box); widgets[id] = nw; nw.show(values[id] = nw.clean(values[id])); },
  };
  const presetRows = [];
  function refreshPresets() {
    for (const p of presetRows) p.btns.forEach((b, i) => {
      const vals = p.items[i].values;
      b.classList.toggle('on', Object.entries(vals).every(([k, v]) => Math.abs((values[k] ?? NaN) - v) <= Math.abs(v) * 1e-6 || values[k] === v));
    });
  }
  for (const d of defs) {
    const type = d.type || 'slider';
    if (type === 'presets') {
      const items = d.items;
      const seg = h('div', { class: 'vz-seg vk-presets' });
      const btns = items.map(it => h('button', { type: 'button', text: it.label, onclick: () => { ui.set(it.values, { from: 'preset', force: true }); } }));
      seg.append(...btns);
      const wrap = h('div', { class: 'vk-presetrow' }, d.label ? h('span', { class: 'vk-seglabel', text: d.label }) : null, seg);
      if (d.reset) wrap.append(h('button', { type: 'button', class: 'btn small ghost vk-reset', text: typeof d.reset === 'string' ? d.reset : 'Zurücksetzen', onclick: () => ui.reset({ from: 'reset', force: true }) }));
      presetRows.push({ btns, items });
      el.append(wrap); continue;
    }
    if (type === 'button') { row.append(h('button', { type: 'button', class: 'btn small ghost', text: d.label, onclick: () => d.onClick?.(ui) })); continue; }
    const w = type === 'seg' ? makeSeg(d, ui) : type === 'toggle' ? makeToggle(d, ui) : makeSlider(d, ui);
    widgets[d.id] = w; row.append(w.box);
    initial[d.id] = values[d.id] = w.clean(d.value ?? (type === 'toggle' ? false : type === 'seg' ? (Array.isArray(d.options[0]) ? d.options[0][0] : d.options[0]) : d.min));
    w.show(values[d.id]);
  }
  refreshPresets();
  root.append(el);
  return ui;
}

/**
 * Zahlenanzeigen (.vz-stat). items: [{ id, label, unit?, digits?, hl?, format? }]
 *   const r = readout(root, [{ id: 'fc', label: 'Grenzfrequenz', unit: 'Hz', hl: true }]);
 *   r.set({ fc: 1591 });   // Zahlen werden mit si.fmt formatiert, Strings unverändert
 */
export function readout(root, items) {
  ensureCss();
  const box = h('div', { class: 'vz-readout vk-readout' });
  const cells = {};
  for (const it of items) {
    const b = h('b'); const sp = h('span', { class: 'vz-stat' + (it.hl ? ' hl' : '') }, it.label, b);
    cells[it.id] = { b, sp, it }; box.append(sp);
  }
  root.append(box);
  return {
    el: box,
    set(vals) {
      for (const [id, v] of Object.entries(vals)) {
        const c = cells[id]; if (!c) continue;
        const t = typeof v === 'number' ? (c.it.format ? c.it.format(v) : fmt(v, c.it.unit || '', c.it.digits ?? 3)) : String(v);
        if (c.b.textContent !== t) c.b.textContent = t;
      }
    },
    hl(id, on = true) { cells[id]?.sp.classList.toggle('hl', on); },
  };
}

/**
 * Ziel-Chips („○ Stelle fc auf 1 kHz ein“ → „✓ …“). onAll wird einmal gerufen, wenn alle erreicht sind (→ complete()).
 *   const g = goals(root, [{ id: 'a', label: 'Ziel A' }], () => complete());   g.reach('a');
 */
export function goals(root, defs, onAll) {
  ensureCss();
  const box = h('div', { class: 'vz-readout vk-goals' });
  const done = new Set(), chips = {};
  for (const d of defs) { chips[d.id] = h('span', { class: 'vz-stat' }); box.append(chips[d.id]); }
  const paint = () => { for (const d of defs) { const ok = done.has(d.id); chips[d.id].className = 'vz-stat' + (ok ? ' hl' : ''); chips[d.id].textContent = (ok ? '✓ ' : '○ ') + d.label; } };
  let fired = false;
  paint(); root.append(box);
  return {
    el: box,
    reach(id) { if (done.has(id)) return; done.add(id); paint(); if (!fired && defs.every(d => done.has(d.id))) { fired = true; onAll?.(); } },
    has: id => done.has(id),
    get all() { return defs.every(d => done.has(d.id)); },
  };
}
