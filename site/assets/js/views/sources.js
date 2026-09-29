import { el } from '../ui.js';
import { sourceLine, esc } from '../markup.js';
import { t } from '../i18n.js';

export default async function library(main, { subject }) {
  const ctx = { subject };
  const groups = {};
  for (const s of Object.values(subject.sources)) (groups[s.kind || t('src.other')] ??= []).push(s);
  for (const g of Object.values(groups)) g.sort((a, b) => (a.year || 0) - (b.year || 0));
  main.append(el(`
    <section class="library">
      <span class="eyebrow">${t('src.eyebrow', { n: Object.keys(subject.sources).length })}</span>
      <h1 class="display">${t('src.title')}</h1>
      <p class="lede">${t('src.lede')}</p>
      ${Object.entries(groups).map(([kind, list]) => `
        <h2>${esc(kind)}</h2>
        <ol class="src-list">${list.map(s => `<li id="fn-${s.id}"><span class="src-year">${s.year || ''}</span><div>${sourceLine(s, ctx)}</div></li>`).join('')}</ol>`).join('')}
    </section>`));
}
