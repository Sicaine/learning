// #/s/:sid/practice[/:topic|weak|new|due|all] — hub with statistics, and practice sessions.
import * as store from '../store.js';
import { el, $, $$, icon } from '../ui.js';
import { esc, mdInline } from '../markup.js';
import { t, getLang } from '../i18n.js';
import { topicStats, buildQueue, recordMany, prepare, isCorrect, SESSION_SIZE } from '../examkit.js';
import { questionHTML, answersHTML, explainHTML, statBar, dateFmt } from './qparts.js';

const MODES = ['due', 'new', 'weak', 'all'];

export default async function practice(main, { subject, arg }) {
  if (!subject?.hasQuestions) { location.hash = subject ? `#/s/${subject.id}` : '#/'; return; }
  if (!arg) return hub(main, subject);
  if (!MODES.includes(arg) && !subject.qTopicById[arg]) { location.hash = `#/s/${subject.id}/practice`; return; }
  session(main, subject, arg);
}

export function legend() {
  return `<div class="q-legend"><span><i class="m"></i>${t('pr.lMastered')}</span><span><i class="l"></i>${t('pr.lLearning')}</span><span><i class="w"></i>${t('pr.lWeak')}</span><span><i class="n"></i>${t('pr.lNew')}</span></div>`;
}

export function examHistory(subject, limit = 5) {
  const ex = [...(store.get().subjects[subject.id]?.exams || [])].reverse().slice(0, limit);
  if (!ex.length) return `<p class="muted">${t('pr.noExams')}</p>`;
  return `<ul class="exam-hist">${ex.map(e => `<li class="${e.passed ? 'pass' : 'fail'}"><span class="eh-date">${dateFmt(e.at, getLang())}</span>
    <span class="eh-parts">${Object.entries(e.parts).map(([id, p]) => `<span title="${esc(subject.exam?.parts.find(x => x.id === id)?.title || id)}">${p.total ? Math.round(p.ok / p.total * 100) : 0} %</span>`).join('')}</span>
    <b class="eh-badge">${e.passed ? t('ex.passed') : t('ex.failed')}</b></li>`).join('')}</ul>`;
}

export function topicRows(subject, stats) {
  const groups = subject.exam ? subject.exam.parts.map(p => ({ title: p.title, topics: p.topics })) : [{ title: '', topics: subject.qTopics }];
  const orphan = subject.qTopics.filter(tp => !groups.some(g => g.topics.includes(tp)));
  if (orphan.length && subject.exam) groups.push({ title: '', topics: orphan });
  return groups.map(g => `${g.title ? `<h3 class="q-group">${esc(g.title)}</h3>` : ''}
    <ul class="q-topics">${g.topics.filter(tp => tp.questions.length).map(tp => {
      const s = stats.byTopic[tp.id];
      return `<li><a class="q-topic" href="#/s/${subject.id}/practice/${encodeURIComponent(tp.id)}">
        <span class="qt-title">${esc(tp.title)}</span>
        <span class="qt-meta">${s.mastered}/${s.total}${s.due ? ` · <b>${s.due} ${t('pr.due')}</b>` : ''}</span>${statBar(s)}</a></li>`;
    }).join('')}</ul>`).join('');
}

function hub(main, subject) {
  const sid = subject.id;
  const st = topicStats(subject), a = st.all;
  const cnt = { due: a.due, new: a.fresh, weak: a.weak + 0, all: a.total };
  const acc = a.n ? Math.round(a.ok / a.n * 100) : 0;
  const root = el(`
    <section class="practice-hub">
      <span class="eyebrow">${t('pr.hubEyebrow')}</span>
      <h1 class="display">${t('pr.hubTitle')}</h1>
      <p class="lede">${t('pr.hubLede')}</p>
      <div class="q-tiles">
        <div class="stat mini"><b>${a.mastered}/${a.total}</b><span>${t('pr.mastered')}</span></div>
        <div class="stat mini"><b>${a.seen}</b><span>${t('pr.seen')}</span></div>
        <div class="stat mini"><b>${a.n ? acc + ' %' : '–'}</b><span>${t('pr.accuracy')}</span></div>
        <div class="stat mini"><b>${a.due}</b><span>${t('pr.due')}</span></div>
      </div>
      <div class="hero-actions q-modes">
        ${MODES.map(m => {
          const n = cnt[m];
          const label = m === 'all' ? t('pr.modeAll') : t('pr.mode' + m[0].toUpperCase() + m.slice(1), { n });
          return `<a class="btn ${m === 'due' && n ? 'primary' : ''} ${m !== 'all' && !n ? 'disabled' : ''}" ${m !== 'all' && !n ? 'aria-disabled="true" tabindex="-1"' : ''} href="#/s/${sid}/practice/${m}">${label}</a>`;
        }).join('')}
        ${subject.exam ? `<a class="btn" href="#/s/${sid}/exam">${t('pr.examBtn')}</a>` : ''}
      </div>
      <h2 class="q-h2">${t('pr.byTopic')}</h2>
      ${legend()}
      ${topicRows(subject, st)}
      ${subject.exam ? `<h2 class="q-h2">${t('pr.lastExams')}</h2>${examHistory(subject, 10)}` : ''}
    </section>`);
  main.append(root);
  $$(root, 'a.disabled').forEach(x => x.addEventListener('click', e => e.preventDefault()));
}

function session(main, subject, mode) {
  const sid = subject.id;
  const ctx = { subject };
  const queue = buildQueue(subject, mode);
  const root = el(`<section class="qpractice qs"></section>`);
  main.append(root);
  const title = subject.qTopicById[mode]?.title || t('pr.title.' + mode);
  const stats = { n: 0, ok: 0, wrong: [] };
  let queueRef = queue, idx = 0, item = null, answered = false;

  function end() {
    const pct = stats.n ? Math.round(stats.ok / stats.n * 100) : 0;
    root.innerHTML = `<div class="review-empty">
      <div class="big-icon">${icon.cards}</div>
      <h1 class="display">${stats.n ? t('pr.done') : t('pr.empty')}</h1>
      ${stats.n ? `<p class="lede">${t('pr.result', { ok: stats.ok, n: stats.n, p: pct })}</p>` : ''}
      ${stats.wrong.length ? `<ul class="q-wrong">${stats.wrong.map(q => `<li>${mdInline(q.q, ctx)}</li>`).join('')}</ul>` : ''}
      <div class="hero-actions">
        ${stats.wrong.length ? `<button class="btn primary retry">${t('pr.retryWrong')}</button>` : ''}
        <button class="btn ${stats.wrong.length ? '' : 'primary'} more">${t('pr.again')}</button>
        <a class="btn ghost" href="#/s/${sid}/practice">${t('pr.backHub')}</a>
      </div></div>`;
    $(root, '.more').onclick = () => { main.replaceChildren(); session(main, subject, mode); };
    const rt = $(root, '.retry');
    if (rt) rt.onclick = () => { const w = stats.wrong; stats.wrong = []; stats.n = 0; stats.ok = 0; queueRef = w; idx = 0; show(); };
    $(root, '.btn.primary').focus();
  }

  function show() {
    if (idx >= queueRef.length) return end();
    const q = queueRef[idx];
    item = prepare(q); answered = false;
    const r = store.get().subjects[sid]?.practice?.[q.id];
    const topic = subject.qTopicById[q.topic];
    root.innerHTML = `
      <div class="review-top"><span class="eyebrow">${esc(topic?.title || title)}</span>
        <span class="review-count">${t('pr.q', { i: idx + 1, n: queueRef.length })}${r ? ` · ${t('pr.box', { n: r.box })}` : ` · ${t('pr.lNew')}`}</span></div>
      <div class="bar q-progress" role="progressbar" aria-valuemin="0" aria-valuemax="${queueRef.length}" aria-valuenow="${idx}"><span style="width:${idx / queueRef.length * 100}%"></span></div>
      <div class="q-card">
        <div class="q-id">${esc(q.id)}</div>
        ${questionHTML(q, ctx)}
        <div class="q-answers" role="radiogroup" aria-label="${t('pr.answers')}">${answersHTML(q, item, ctx)}</div>
        <div class="q-feedback" aria-live="polite"></div>
        <div class="q-explain" hidden></div>
        <div class="q-actions"><span class="q-keys">${t('pr.keys')}</span><button class="btn primary next" hidden>${idx + 1 >= queueRef.length ? t('pr.finish') : t('pr.next')} ${icon.arrow}</button></div>
      </div>`;
    $$(root, '.q-ans').forEach(b => b.onclick = () => answer(+b.dataset.pos));
    $(root, '.next').onclick = next;
    if (window.innerWidth > 720) root.querySelector('.q-answers').scrollIntoView?.({ block: 'nearest' });
  }

  function answer(pos) {
    if (answered) return;
    answered = true;
    item.pick = pos;
    const q = queueRef[idx];
    const ok = isCorrect(item);
    stats.n++; if (ok) stats.ok++; else stats.wrong.push(q);
    recordMany(sid, [[q.id, ok]]);
    const nr = store.get().subjects[sid].practice[q.id];
    $$(root, '.q-ans').forEach(b => {
      const p = +b.dataset.pos;
      b.disabled = true;
      const right = item.order[p] === 0;
      b.classList.toggle('right', right);
      b.classList.toggle('wrong', p === pos && !right);
      b.setAttribute('aria-checked', p === pos ? 'true' : 'false');
      if (right) b.insertAdjacentHTML('beforeend', `<span class="sr-only"> (${t('pr.right')})</span>`);
    });
    $(root, '.q-feedback').innerHTML = `<b class="${ok ? 'good' : 'bad'}">${ok ? t('pr.right') : t('pr.wrong')}</b> <span class="muted">${t('pr.boxUp', { n: nr.box })}</span>`;
    const ex = $(root, '.q-explain');
    const html = explainHTML(q, ctx, subject);
    if (html.trim()) { ex.innerHTML = html; ex.hidden = false; }
    const nb = $(root, '.next'); nb.hidden = false; nb.focus();
  }

  function next() {
    idx++; show();
    window.scrollTo({ top: 0 });
  }

  const onKey = e => {
    if (!document.body.contains(root)) return document.removeEventListener('keydown', onKey);
    if (e.ctrlKey || e.metaKey || e.altKey || e.target.matches?.('input, textarea')) return;
    if (['1', '2', '3', '4'].includes(e.key) && item && !answered && $(root, '.q-answers')) { e.preventDefault(); answer(+e.key - 1); }
    else if (e.key === 'Enter' && answered && !$(root, '.next')?.hidden && e.target !== $(root, '.next')) { e.preventDefault(); next(); }
  };
  document.addEventListener('keydown', onKey);
  show();
}
