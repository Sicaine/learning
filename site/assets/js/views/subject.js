import { subjectProgress, stageProgress, lessonStatus, deckStats, nextLesson } from '../progress.js';
import { el, ring, bar, icon } from '../ui.js';
import { esc, md } from '../markup.js';
import { t } from '../i18n.js';

export default async function overview(main, { subject }) {
  const p = subjectProgress(subject);
  const d = deckStats(subject.id);
  const next = nextLesson(subject);
  const nl = next && subject.lessons[next.lid];

  main.append(el(`
    <section class="overview">
      <div class="subject-hero">
        <div class="subject-hero-text">
          <span class="eyebrow">${t('path.eyebrow')}</span>
          <h1 class="display">${esc(subject.title)}</h1>
          <div class="lede">${md(subject.intro || subject.tagline, { subject })}</div>
          <div class="hero-actions">
            ${nl ? `<a class="btn primary" href="#/s/${subject.id}/l/${nl.id}">${next.resume ? t('path.continue') : p.complete ? t('path.next') : t('path.start')}: ${esc(nl.title)} ${icon.arrow}</a>` : ''}
            ${d.due ? `<a class="btn" href="#/s/${subject.id}/review">${icon.cards} ${t('path.reviewDue', { n: d.due })}</a>` : ''}
          </div>
        </div>
        <div class="stat-stack">
          <div class="stat">${ring(p.pct, 84, 7)}<div><b>${p.complete}/${p.total}</b><span>${t('path.lessonsDone')}</span></div></div>
          <div class="stat mini"><b>${d.total}</b><span>${t('path.inDeck')}</span></div>
          <div class="stat mini"><b>${d.learned}</b><span>${t('path.mastered')}</span></div>
        </div>
      </div>
      ${subject.mission ? `<div class="mission">${md(subject.mission, { subject })}</div>` : ''}
      <ol class="stages">
        ${subject.stages.map((stage, i) => {
          const sp = stageProgress(subject.id, stage);
          return `
          <li class="stage ${sp.total && sp.complete === sp.total ? 'done' : ''}">
            <div class="stage-rail"><span class="stage-num">${i + 1}</span></div>
            <div class="stage-body">
              <div class="stage-head">
                <div>
                  <span class="eyebrow">${esc(stage.level)}</span>
                  <h2>${esc(stage.title)}</h2>
                  <p>${esc(stage.summary)}</p>
                </div>
                ${sp.total ? `<div class="stage-prog"><span>${sp.complete}/${sp.total}</span>${bar(sp.pct)}</div>` : ''}
              </div>
              <div class="lesson-grid">
                ${stage.lessons.map(l => {
                  const status = l.ready ? lessonStatus(subject.id, l.id) : 'planned';
                  const tag = { complete: `${icon.check} ${t('status.complete')}`, started: t('status.started'), new: t('status.min', { n: l.minutes || 15 }), planned: t('status.planned') }[status];
                  return l.ready
                    ? `<a class="lesson-tile ${status}" href="#/s/${subject.id}/l/${l.id}"><span class="lt-tag">${tag}</span><b>${esc(l.title)}</b><span>${esc(l.summary || '')}</span></a>`
                    : `<div class="lesson-tile planned"><span class="lt-tag">${tag}</span><b>${esc(l.title)}</b><span>${esc(l.summary || '')}</span></div>`;
                }).join('')}
              </div>
            </div>
          </li>`;
        }).join('')}
      </ol>
    </section>`));
}
