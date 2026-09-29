// Tiny Markdown dialect used by all content.
//   **bold** *italic* `code` [text](url)
//   $inline math$  $$display math$$           (KaTeX)
//   [[term-id]] or [[term-id|shown text]]      glossary cross-reference
//   [^source-id]                                footnote to a source
//   paragraphs, ## headings, - lists, 1. lists, > quotes, ``` code fences
// Content is authored by us, so raw HTML is allowed.

import * as store from './store.js';

export function createNotes() { return { order: [], index: new Map() }; }

export function md(text, ctx = {}) {
  if (!text) return '';
  const math = [];
  const stash = (src, display) => `\u0000${math.push({ src, display }) - 1}\u0000`;
  let s = String(text)
    .replace(/\$\$([\s\S]+?)\$\$/g, (_, m) => stash(m, true))
    .replace(/(^|[^\\])\$([^\n$]+?)\$/g, (_, pre, m) => pre + stash(m, false));

  s = blocks(s.replace(/^\n+|\s+$/g, ''), ctx);
  return s.replace(/\u0000(\d+)\u0000/g, (_, i) => renderMath(math[i]));
}

// Inline-only variant (no <p> wrapper), for short strings like card faces and options.
export function mdInline(text, ctx = {}) {
  const html = md(text, ctx);
  const m = html.match(/^<p>([\s\S]*)<\/p>$/);
  return m && !m[1].includes('<p>') ? m[1] : html;
}

function renderMath({ src, display }) {
  if (window.katex) {
    try { return window.katex.renderToString(src, { displayMode: display, throwOnError: false }); }
    catch { /* fall through */ }
  }
  return display ? `<div class="math-fallback">${esc(src)}</div>` : `<code>${esc(src)}</code>`;
}

function blocks(s, ctx) {
  const out = [];
  const fences = [];
  s = s.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) =>
    `\u0001${fences.push(`<pre class="code"><code>${esc(code.replace(/\n$/, ''))}</code></pre>`) - 1}\u0001`);

  for (const chunk of s.split(/\n\s*\n/)) {
    const c = chunk.trim();
    if (!c) continue;
    let m;
    if ((m = c.match(/^\u0001(\d+)\u0001$/))) out.push(fences[m[1]]);
    else if ((m = c.match(/^(#{2,4})\s+(.*)$/))) out.push(`<h${m[1].length + 1}>${inline(m[2], ctx)}</h${m[1].length + 1}>`);
    else if (/^[-*]\s/.test(c)) out.push(list(c, 'ul', /^[-*]\s+/, ctx));
    else if (/^\d+\.\s/.test(c)) out.push(list(c, 'ol', /^\d+\.\s+/, ctx));
    else if (/^>\s?/.test(c)) out.push(`<blockquote>${md(c.replace(/^>\s?/gm, ''), ctx)}</blockquote>`);
    else if (/^\u0000\d+\u0000$/.test(c)) out.push(`<div class="math-block">${c}</div>`);
    else if (/^<(div|table|figure|svg|details)/.test(c)) out.push(inline(c, ctx));
    else out.push(`<p>${inline(c, ctx)}</p>`);
  }
  return out.join('\n');
}

function list(c, tag, re, ctx) {
  const items = [];
  for (const line of c.split('\n')) {
    if (re.test(line)) items.push(line.replace(re, ''));
    else if (items.length) items[items.length - 1] += ' ' + line.trim();
  }
  const start = tag === 'ol' ? parseInt(c, 10) : 1;
  return `<${tag}${start !== 1 ? ` start="${start}"` : ''}>${items.map(i => `<li>${inline(i, ctx)}</li>`).join('')}</${tag}>`;
}

function inline(s, ctx) {
  return s
    .replace(/`([^`]+)`/g, (_, c) => `<code>${esc(c)}</code>`)
    .replace(/\[\[([\w-]+)(?:\|([^\]]+))?\]\]/g, (_, id, shown) => termLink(id, shown, ctx))
    .replace(/\[\^([\w-]+)\]/g, (_, id) => footnote(id, ctx))
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, url) => `<a href="${url}" target="_blank" rel="noopener">${t}</a>`)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*\w])\*([^*\n]+)\*(?!\w)/g, '$1<em>$2</em>')
    .replace(/\n/g, ' ');
}

// The "language aid" name of a term: German for English subjects, English for German ones.
export function altName(term, subject) { return subject?.lang === 'de' ? term.en : term.de; }
export function altLabel(subject) { return subject?.lang === 'de' ? 'EN' : 'DE'; }

export function termLink(id, shown, ctx) {
  const subj = ctx.subject;
  const t = subj?.glossary?.[id];
  if (!t) {
    console.warn(`[markup] unknown term "${id}"`);
    return `<span class="term-missing">${shown || id}</span>`;
  }
  const alt = altName(t, subj);
  const de = alt ? `<span class="de">${esc(alt)}</span>` : '';
  return `<a class="term" data-term="${id}" href="#/s/${subj.id}/glossary/${id}">${shown || inlineName(t)}${de}</a>`;
}

// How a term reads mid-sentence: "Norm (L2)" -> "norm", but "ViT" stays "ViT".
function inlineName(t) {
  if (t.inline) return t.inline;
  const name = t.term.replace(/\s*\(.*\)$/, '');
  return /^[A-Z][a-z]/.test(name) ? name[0].toLowerCase() + name.slice(1) : name;
}

function footnote(id, ctx) {
  const src = ctx.subject?.sources?.[id];
  if (!src) { console.warn(`[markup] unknown source "${id}"`); return ''; }
  if (!ctx.notes) return `<sup class="fn" data-source="${id}">†</sup>`;
  if (!ctx.notes.index.has(id)) { ctx.notes.order.push(id); ctx.notes.index.set(id, ctx.notes.order.length); }
  const n = ctx.notes.index.get(id);
  return `<sup class="fn" data-source="${id}" data-fn="${n}">${n}</sup>`;
}

export function sourceLine(src, ctx = {}) {
  const meta = [src.authors, src.venue, src.year].filter(Boolean).join(' · ');
  const title = src.url ? `<a href="${src.url}" target="_blank" rel="noopener">${esc(src.title)}</a>` : esc(src.title);
  return `<span class="src-title">${title}</span>${meta ? `<span class="src-meta">${esc(meta)}</span>` : ''}${src.note ? `<span class="src-note">${mdInline(src.note, ctx)}</span>` : ''}`;
}

// Wikipedia links for a term: { en: 'Title', de: 'Titel' } → small EN/DE pills.
export function wikiUrl(lang, title) {
  const [page, frag] = title.split('#');
  return `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(page.replace(/ /g, '_'))}${frag ? '#' + encodeURIComponent(frag.replace(/ /g, '_')) : ''}`;
}

export function wikiLinks(t, { titles = false } = {}) {
  if (!t?.wiki) return '';
  return ['en', 'de'].filter(l => t.wiki[l]).map(l =>
    `<a class="wiki" href="${wikiUrl(l, t.wiki[l])}" target="_blank" rel="noopener" title="Wikipedia (${l.toUpperCase()}): ${esc(t.wiki[l])}"><span class="wiki-w">W</span>${l.toUpperCase()}${titles ? `<span class="wiki-title">${esc(t.wiki[l].replace(/#.*/, ''))}</span>` : ''}</a>`).join('');
}

export function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

export function germanOn() { return !!store.get().settings.german; }
