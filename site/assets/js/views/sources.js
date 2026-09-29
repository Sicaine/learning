import { el } from '../ui.js';
import { sourceLine, esc } from '../markup.js';

export default async function library(main, { subject }) {
  const ctx = { subject };
  const groups = {};
  for (const s of Object.values(subject.sources)) (groups[s.kind || 'Other'] ??= []).push(s);
  for (const g of Object.values(groups)) g.sort((a, b) => (a.year || 0) - (b.year || 0));
  main.append(el(`
    <section class="library">
      <span class="eyebrow">Sources · ${Object.keys(subject.sources).length}</span>
      <h1 class="display">Where the ideas come from</h1>
      <p class="lede">Every footnote in the lessons points here. Sorted by year, so you can read the field's history as a timeline.</p>
      ${Object.entries(groups).map(([kind, list]) => `
        <h2>${esc(kind)}</h2>
        <ol class="src-list">${list.map(s => `<li id="fn-${s.id}"><span class="src-year">${s.year || ''}</span><div>${sourceLine(s, ctx)}</div></li>`).join('')}</ol>`).join('')}
    </section>`));
}
