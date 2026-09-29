import * as store from '../store.js';
import { loadLesson, tasksOf } from '../content.js';
import { lessonProgress, completeLesson, reopenLesson, touch, markTask, saveTaskData } from '../progress.js';
import { renderBlock, blockLabel } from '../blocks/index.js';
import { el, $, $$, ring, icon, toast } from '../ui.js';
import { t } from '../i18n.js';
import { md, mdInline, createNotes, sourceLine, wikiLinks, esc } from '../markup.js';

export default async function lessonView(main, { subject, arg: lid }) {
  const meta = subject.lessons[lid];
  if (!meta?.ready) { location.hash = `#/s/${subject.id}`; return; }
  const lesson = await loadLesson(subject, lid);
  const sid = subject.id;
  const notes = createNotes();
  const idx = subject.order.indexOf(lid);
  const prev = subject.lessons[subject.order[idx - 1]];
  const next = subject.lessons[subject.order[idx + 1]];
  const taskIds = new Set(tasksOf(lesson).map(t => t.id));
  // Terms this lesson links to that have Wikipedia articles, one entry per article.
  const seenWiki = new Set();
  const wikiTerms = [...new Set([...JSON.stringify(lesson).matchAll(/\[\[([\w-]+)/g)].map(m => m[1]))]
    .map(id => subject.glossary[id])
    .filter(t => t?.wiki && !seenWiki.has(t.wiki.en || t.wiki.de) && seenWiki.add(t.wiki.en || t.wiki.de));

  const ctx = {
    subject, lesson, notes, sid,
    task: tid => store.lesson(sid, lid).tasks[tid] || {},
    done: (tid, data) => { markTask(sid, lid, tid, data); refresh(); },
    save: (tid, data) => saveTaskData(sid, lid, tid, data),
  };

  const page = el(`
    <article class="lesson">
      <aside class="rail">
        <a class="rail-back" href="#/s/${sid}">${icon.back} ${esc(subject.title)}</a>
        <div class="rail-prog"></div>
        <ol class="rail-steps"></ol>
      </aside>
      <div class="lesson-main">
        <header class="lesson-head">
          <span class="eyebrow">${t('lesson.stage', { n: meta.stage.index + 1 })} · ${esc(meta.stage.title)}</span>
          <h1 class="display">${esc(lesson.title)}</h1>
          ${lesson.summary ? `<div class="lede">${md(lesson.summary, ctx)}</div>` : ''}
          ${lesson.goals?.length ? `<div class="goals"><span class="eyebrow">${t('lesson.goals')}</span><ul>${lesson.goals.map(g => `<li>${mdInline(g, ctx)}</li>`).join('')}</ul></div>` : ''}
        </header>
        <div class="blocks"></div>
        <footer class="lesson-end"></footer>
      </div>
    </article>`);
  main.append(page);

  const blocksEl = $(page, '.blocks');
  for (const b of lesson.blocks) {
    const section = el(`<section class="block block-${b.type}" id="b-${b.id}" data-block="${b.id}"></section>`);
    if (taskIds.has(b.id)) section.classList.add('is-task');
    try { section.append(await renderBlock(b, ctx)); }
    catch (e) { console.error(e); section.append(el(`<p class="error">Block "${esc(b.id)}" failed: ${esc(e.message)}</p>`)); }
    blocksEl.append(section);
  }

  function renderEnd() {
    const prog = lessonProgress(sid, lesson);
    const cards = lesson.cards || [];
    const end = $(page, '.lesson-end');
    end.innerHTML = `
      ${cards.length ? `
        <div class="end-cards">
          <div class="end-cards-head">${icon.cards}<div><b>${t('lesson.cards', { n: cards.length })}</b><span>${prog.complete ? t('lesson.cardsIn') : t('lesson.cardsJoin')}</span></div></div>
          <div class="card-peek">${cards.slice(0, 3).map(c => `<div class="peek">${mdInline(c.front, ctx)}</div>`).join('')}${cards.length > 3 ? `<div class="peek more">+${cards.length - 3}</div>` : ''}</div>
        </div>` : ''}
      <div class="complete-row">
        ${prog.complete
          ? `<div class="completed">${icon.check} ${t('lesson.completed')}</div><button class="btn ghost reopen">${t('lesson.reopen')}</button>`
          : `<button class="btn primary big complete">${t('lesson.complete')} ${prog.total ? `<small>${t('lesson.tasks', { d: prog.done, t: prog.total })}</small>` : ''}</button>`}
      </div>
      ${notes.order.length ? `
        <div class="footnotes">
          <span class="eyebrow">${t('lesson.sources')}</span>
          <ol>${notes.order.map(id => `<li id="fn-${id}">${sourceLine(subject.sources[id], ctx)}</li>`).join('')}</ol>
        </div>` : ''}
      ${wikiTerms.length ? `
        <div class="wiki-list">
          <span class="eyebrow">${t('lesson.wiki')}</span>
          <ul>${wikiTerms.map(t => `<li><a class="term" data-term="${t.id}" href="#/s/${sid}/glossary/${t.id}">${esc(t.term)}</a><span class="wiki-pills">${wikiLinks(t)}</span></li>`).join('')}</ul>
        </div>` : ''}
      <nav class="pager">
        ${prev ? `<a href="#/s/${sid}/l/${prev.id}" class="prev">${icon.back}<span><small>${t('lesson.prev')}</small>${esc(prev.title)}</span></a>` : '<span></span>'}
        ${next ? `<a href="#/s/${sid}/l/${next.id}" class="next"><span><small>${t('lesson.next')}</small>${esc(next.title)}</span>${icon.arrow}</a>` : `<a href="#/s/${sid}" class="next"><span><small>${t('lesson.backTo')}</small>${t('lesson.path')}</span>${icon.arrow}</a>`}
      </nav>`;
    $(end, '.complete')?.addEventListener('click', () => {
      const open = prog.total - prog.done;
      if (open > 0 && !confirm(t('lesson.openConfirm', { n: open }))) return;
      const added = completeLesson(sid, lesson);
      toast(`${icon.spark} ${t('lesson.doneToast')}${added ? ` · ${t('lesson.addedToast', { n: added })}` : ''}`);
      refresh();
      $(end, '.complete-row')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    $(end, '.reopen')?.addEventListener('click', () => { reopenLesson(sid, lid); refresh(); });
  }

  function renderRail() {
    const prog = lessonProgress(sid, lesson);
    $(page, '.rail-prog').innerHTML = `${ring(prog.pct, 38, 4)}<div><b>${prog.complete ? t('lesson.railDone') : t('lesson.railTasks', { d: prog.done, t: prog.total })}</b><span>${t('lesson.min', { n: lesson.minutes || meta.minutes || 15 })}</span></div>`;
    $(page, '.rail-steps').innerHTML = lesson.blocks
      .filter(b => b.title || taskIds.has(b.id))
      .map(b => {
        const done = taskIds.has(b.id) && ctx.task(b.id).done;
        return `<li class="${done ? 'done' : ''} ${taskIds.has(b.id) ? 'is-task' : ''}"><a href="javascript:void 0" data-go="${b.id}"><span class="tick">${done ? icon.check : ''}</span>${esc(blockLabel(b))}</a></li>`;
      }).join('');
  }

  function refresh() { renderRail(); renderEnd(); }
  refresh();

  $(page, '.rail-steps').addEventListener('click', e => {
    const go = e.target.closest('[data-go]');
    if (go) document.getElementById(`b-${go.dataset.go}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // Remember position; resume there next time.
  const ls = store.lesson(sid, lid);
  const last = store.get().subjects[sid]?.last;
  const resumeId = !ls.complete && last?.lessonId === lid ? last.blockId : null;
  touch(sid, lid, resumeId || lesson.blocks[0]?.id);
  if (resumeId && resumeId !== lesson.blocks[0]?.id) {
    requestAnimationFrame(() => {
      document.getElementById(`b-${resumeId}`)?.scrollIntoView({ block: 'start' });
      toast(t('lesson.resumed'));
    });
  } else window.scrollTo({ top: 0 });

  let pending;
  const io = new IntersectionObserver(entries => {
    const vis = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
    if (!vis) return;
    clearTimeout(pending);
    pending = setTimeout(() => {
      if (!document.body.contains(vis.target)) return;
      touch(sid, lid, vis.target.dataset.block);
      $$(page, '.rail-steps a').forEach(a => a.classList.toggle('here', a.dataset.go === vis.target.dataset.block));
    }, 800);
  }, { rootMargin: '-20% 0px -60% 0px' });
  $$(page, '.block').forEach(b => io.observe(b));
  window.addEventListener('hashchange', () => io.disconnect(), { once: true });
}
