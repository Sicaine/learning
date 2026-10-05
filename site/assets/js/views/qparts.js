// Shared rendering of questions and answers for practice and exam views.
import { md, mdInline, esc } from '../markup.js';
import { t } from '../i18n.js';

export function figureHTML(q) {
  if (!q.figure) return '';
  const f = String(q.figure).trim();
  const inner = f.startsWith('<') ? f : `<img src="${esc(f)}" alt="${esc(q.figureAlt || t('pr.figure'))}" loading="lazy">`;
  return `<figure class="q-figure"${f.startsWith('<') ? ` role="img" aria-label="${esc(q.figureAlt || t('pr.figure'))}"` : ''}>${inner}</figure>`;
}

export function answerHTML(a, i, ctx) {
  if (a && typeof a === 'object') {
    if (a.svg) return `<span class="ans-fig" role="img" aria-label="${esc(a.alt || t('pr.option', { n: i + 1 }))}">${a.svg}</span>`;
    if (a.img) return `<img class="ans-img" src="${esc(a.img)}" alt="${esc(a.alt || t('pr.option', { n: i + 1 }))}" loading="lazy">`;
  }
  return mdInline(String(a), ctx).replace(/<div class="math-block">([\s\S]*?)<\/div>/g, '$1');
}

export const questionHTML = (q, ctx) => `<div class="q-text prose">${md(q.q, ctx)}</div>${figureHTML(q)}`;

// Answer buttons in the shuffled order of `item`.
export function answersHTML(q, item, ctx) {
  return item.order.map((orig, pos) => `
    <button type="button" class="q-ans" role="radio" aria-checked="false" data-pos="${pos}">
      <span class="q-key" aria-hidden="true">${pos + 1}</span><span class="q-ans-body">${answerHTML(q.answers[orig], orig, ctx)}</span>
    </button>`).join('');
}

export function explainHTML(q, ctx, subject) {
  const lesson = q.lesson && subject.lessons[q.lesson];
  return `${q.explain ? `<div class="prose">${md(q.explain, ctx)}</div>` : ''}
    ${lesson ? `<a class="btn small q-lesson" href="#/s/${subject.id}/l/${q.lesson}">${t('pr.lesson')}: ${esc(lesson.title)}</a>` : ''}
    ${q.source ? `<div class="q-source">${t('pr.source')}: ${esc(q.source)}</div>` : ''}`;
}

// Segmented bar: mastered | learning | weak | unseen
export function statBar(s) {
  const tot = s.total || 1, w = n => (n / tot * 100).toFixed(1) + '%';
  return `<div class="qbar" role="img" aria-label="${s.mastered}/${s.total}"><span class="m" style="width:${w(s.mastered)}"></span><span class="l" style="width:${w(s.learning)}"></span><span class="w" style="width:${w(s.weak)}"></span></div>`;
}

export const dateFmt = (ms, lang) => new Date(ms).toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }) + ' ' + new Date(ms).toLocaleTimeString(lang === 'de' ? 'de-DE' : 'en-GB', { hour: '2-digit', minute: '2-digit' });
