// vizkit/base.js — gemeinsame Kleinigkeiten (CSS laden, DOM-Helfer, Farben). Intern.

export const SVGNS = 'http://www.w3.org/2000/svg';
/** Kanal-/Kurvenfarben (aus den Fach-Variablen der Seite) */
export const PALETTE = ['var(--accent)', 'var(--accent-2)', 'var(--good)', 'var(--warn)', 'var(--bad)', 'var(--ink-2)'];

let cssDone = false;
/** vizkit.css einmalig in <head> einhängen (relativ zu diesem Modul). */
export function ensureCss() {
  if (cssDone || typeof document === 'undefined') return;
  cssDone = true;
  if (document.getElementById('vk-css')) return;
  const l = document.createElement('link');
  l.id = 'vk-css'; l.rel = 'stylesheet'; l.href = new URL('./vizkit.css', import.meta.url).href;
  document.head.appendChild(l);
}

/** HTML-Element bauen: h('div', { class: 'x', onclick }, child…) */
export function h(tag, attrs = {}, ...kids) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v == null || v === false) continue;
    if (k.startsWith('on') && typeof v === 'function') e[k] = v;
    else if (k === 'html') e.innerHTML = v;
    else if (k === 'text') e.textContent = v;
    else e.setAttribute(k, v === true ? '' : v);
  }
  for (const k of kids.flat()) if (k != null) e.append(k.nodeType ? k : document.createTextNode(k));
  return e;
}
/** SVG-Element bauen: s('line', { x1: 0, … }) */
export function s(tag, attrs = {}, ...kids) {
  const e = document.createElementNS(SVGNS, tag);
  for (const [k, v] of Object.entries(attrs || {})) if (v != null && v !== false) e.setAttribute(k, v);
  for (const k of kids.flat()) if (k != null) e.append(k.nodeType ? k : document.createTextNode(k));
  return e;
}
export const esc = str => String(str).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
export const num = (x, d = 2) => +x.toFixed(d);

/** Breite eines Containers in CSS-px (Fallback 640), begrenzt — für „echte“ Schriftgrößen im viewBox. */
export function boxWidth(el, min = 300, max = 760) {
  const w = (el && (el.getBoundingClientRect?.().width || el.clientWidth)) || 640;
  return Math.max(min, Math.min(max, Math.round(w)));
}
