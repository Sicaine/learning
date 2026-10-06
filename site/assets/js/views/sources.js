import { el } from '../ui.js';
import { sourceLine, esc } from '../markup.js';
import { t } from '../i18n.js';

export default async function library(main, { subject }) {
  const ctx = { subject };
  const groups = {};
  for (const s of Object.values(subject.sources)) (groups[s.kind || t('src.other')] ??= []).push(s);
  for (const g of Object.values(groups)) g.sort((a, b) => (a.year || 0) - (b.year || 0));
  const learn = {};   // sources with `learn: '<category>'` also appear up front as further learning material
  for (const s of Object.values(subject.sources)) if (s.learn) (learn[s.learn] ??= []).push(s);
  main.append(el(`
    <section class="library">
      <span class="eyebrow">${t('src.eyebrow', { n: Object.keys(subject.sources).length })}</span>
      <h1 class="display">${t('src.title')}</h1>
      <p class="lede">${t('src.lede')}</p>
      ${Object.keys(learn).length ? `<div class="learn-more"><h2>${t('src.learn')}</h2><p class="lede">${t('src.learnLede')}</p>
        ${Object.entries(learn).map(([cat, list]) => `<h3>${esc(cat)}</h3><ul class="src-list">${list.map(s => `<li><div>${sourceLine(s, ctx)}</div></li>`).join('')}</ul>`).join('')}</div>` : ''}
      ${Object.entries(groups).map(([kind, list]) => `
        <h2>${esc(kind)}</h2>
        <ol class="src-list">${list.map(s => `<li id="fn-${s.id}"><span class="src-year">${s.year || ''}</span><div>${sourceLine(s, ctx)}</div></li>`).join('')}</ol>`).join('')}
    </section>`));
}
