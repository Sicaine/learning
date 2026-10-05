// #/s/:sid/exam — exam simulation in the real format; resumable, timed, no feedback until submit.
import * as store from '../store.js';
import { el, $, $$, icon, toast } from '../ui.js';
import { esc, md } from '../markup.js';
import { t, getLang } from '../i18n.js';
import { startExam, finishExam, discardExam, currentRun, deadline, fmtClock, isCorrect, scoreExam } from '../examkit.js';
import { questionHTML, answersHTML, answerHTML, explainHTML } from './qparts.js';
import { examHistory } from './practice.js';

export default async function exam(main, { subject }) {
  if (!subject?.exam) { location.hash = subject ? `#/s/${subject.id}` : '#/'; return; }
  const sid = subject.id;
  const run = currentRun(sid);
  // drop a saved run whose questions no longer exist
  if (run && run.items.some(it => !subject.qById[it.qid])) discardExam(sid);
  const r = currentRun(sid);
  if (!r) return intro(main, subject);
  if (r.done) return results(main, subject, r);
  if (Date.now() >= deadline(r)) { finishExam(subject, r); toast(t('ex.timeUp')); return results(main, subject, r); }
  return running(main, subject, r);
}

function intro(main, subject) {
  const sid = subject.id, ex = subject.exam;
  const planned = ex.parts.map(p => ({ p, n: Math.min(p.count || Infinity, p.topics.reduce((a, tp) => a + tp.questions.length, 0)) }));
  const total = planned.reduce((a, x) => a + x.n, 0);
  const root = el(`
    <section class="exam-intro">
      <span class="eyebrow">${t('ex.eyebrow')}</span>
      <h1 class="display">${esc(ex.title || t('ex.title'))}</h1>
      <p class="lede">${t('ex.intro', { n: total, m: ex.minutes })}</p>
      <div class="exam-parts">${planned.map(({ p, n }) => `
        <div class="panel"><h3>${esc(p.title)}</h3>
          <p>${t('ex.questions', { n })}${p.count > n ? ` <span class="bad">(${t('ex.poolShort', { n: p.count })})</span>` : ''} · ${t('ex.passAt', { p: p.passPercent })}</p></div>`).join('')}</div>
      <ul class="exam-rules">
        <li>${t('ex.rule1')}</li><li>${t('ex.rule2')}</li><li>${t('ex.rule3')}</li>
      </ul>
      <div class="hero-actions"><button class="btn primary big start">${t('ex.start')} ${icon.arrow}</button>
        <a class="btn ghost" href="#/s/${sid}/practice">${t('pr.backHub')}</a></div>
      <h2 class="q-h2">${t('pr.lastExams')}</h2>${examHistory(subject, 10)}
    </section>`);
  main.append(root);
  $(root, '.start').onclick = () => { startExam(subject); main.replaceChildren(); exam(main, { subject }); };
}

function running(main, subject, run) {
  const sid = subject.id, ctx = { subject };
  const root = el(`<section class="exam-run qs"></section>`);
  main.append(root);
  let warned = deadline(run) - Date.now() <= 300000;
  const items = run.items;
  const partTitle = id => subject.exam.parts.find(p => p.id === id)?.title || id;
  const persist = () => store.save();

  root.innerHTML = `
    <div class="exam-bar">
      <div class="exam-title"><span class="eyebrow">${esc(subject.exam.title || t('ex.title'))}</span><b class="exam-part"></b></div>
      <div class="exam-timer" role="timer" aria-label="${t('ex.timeLeft')}"><span class="et-label">${t('ex.timeLeft')}</span> <b class="et-val">--:--</b></div>
      <button class="btn small submit">${icon.check} ${t('ex.submit')}</button>
    </div>
    <div class="exam-layout">
      <div class="q-card exam-q"></div>
      <aside class="exam-nav" aria-label="${t('ex.nav')}"><div class="exam-grid"></div>
        <div class="exam-count" aria-live="polite"></div>
        <div class="q-legend"><span><i class="a"></i>${t('ex.answered')}</span><span><i class="f"></i>${t('ex.flagged')}</span><span><i class="o"></i>${t('ex.open')}</span></div>
        <button class="btn ghost small abort">${t('ex.abort')}</button>
      </aside>
    </div>
    <div class="modal-back" hidden><div class="modal" role="alertdialog" aria-modal="true" aria-labelledby="mTitle"><h3 id="mTitle">${t('ex.confirmTitle')}</h3><p class="m-body"></p>
      <div class="row"><button class="btn primary m-yes">${t('ex.confirmYes')}</button><button class="btn m-no">${t('ex.confirmNo')}</button></div></div></div>`;

  const grid = $(root, '.exam-grid');
  grid.innerHTML = items.map((it, i) => {
    const first = i === 0 || items[i - 1].part !== it.part;
    return `${first ? `<div class="eg-part">${esc(partTitle(it.part))}</div>` : ''}<button class="eg" data-i="${i}" aria-label="${t('pr.q', { i: i + 1, n: items.length })}">${i + 1}</button>`;
  }).join('');
  $$(root, '.eg').forEach(b => b.onclick = () => go(+b.dataset.i));

  function paintNav() {
    const done = items.filter(it => it.pick != null).length, fl = items.filter(it => it.flag).length;
    $$(root, '.eg').forEach((b, i) => {
      const it = items[i];
      b.classList.toggle('answered', it.pick != null);
      b.classList.toggle('flagged', !!it.flag);
      b.classList.toggle('cur', i === run.cur);
      b.setAttribute('aria-current', i === run.cur ? 'true' : 'false');
    });
    $(root, '.exam-count').textContent = `${done}/${items.length} ${t('ex.answered')} · ${fl} ${t('ex.flagged')}`;
  }

  function go(i) {
    run.cur = Math.max(0, Math.min(items.length - 1, i));
    persist(); showQ();
  }

  function showQ() {
    const it = items[run.cur], q = subject.qById[it.qid];
    $(root, '.exam-part').textContent = partTitle(it.part);
    const box = $(root, '.exam-q');
    box.innerHTML = `
      <div class="review-top"><span class="eyebrow">${t('pr.q', { i: run.cur + 1, n: items.length })}</span>
        <button class="btn small flag" aria-pressed="${!!it.flag}">${icon.spark} <span>${it.flag ? t('ex.unflag') : t('ex.flag')}</span></button></div>
      ${questionHTML(q, ctx)}
      <div class="q-answers" role="radiogroup" aria-label="${t('pr.answers')}">${answersHTML(q, it, ctx)}</div>
      <div class="q-actions"><button class="btn prev" ${run.cur === 0 ? 'disabled' : ''}>${icon.back} ${t('ex.prev')}</button>
        <span class="q-keys">${t('ex.keys')}</span>
        <button class="btn primary next" ${run.cur === items.length - 1 ? 'disabled' : ''}>${t('ex.next')} ${icon.arrow}</button></div>`;
    $$(box, '.q-ans').forEach(b => {
      const p = +b.dataset.pos;
      b.setAttribute('aria-checked', it.pick === p ? 'true' : 'false');
      b.classList.toggle('picked', it.pick === p);
      b.onclick = () => pick(p);
    });
    $(box, '.flag').classList.toggle('on', !!it.flag);
    $(box, '.flag').onclick = toggleFlag;
    $(box, '.prev').onclick = () => go(run.cur - 1);
    $(box, '.next').onclick = () => go(run.cur + 1);
    paintNav();
  }

  function pick(p) {
    const it = items[run.cur];
    it.pick = it.pick === p ? null : p;
    persist();
    $$(root, '.exam-q .q-ans').forEach(b => { const on = +b.dataset.pos === it.pick; b.classList.toggle('picked', on); b.setAttribute('aria-checked', on ? 'true' : 'false'); });
    paintNav();
  }
  function toggleFlag() {
    const it = items[run.cur];
    it.flag = !it.flag; persist();
    const f = $(root, '.exam-q .flag');
    f.classList.toggle('on', it.flag); f.setAttribute('aria-pressed', it.flag); $(f, 'span').textContent = it.flag ? t('ex.unflag') : t('ex.flag');
    paintNav();
  }

  function submit() {
    finishExam(subject, run);
    cleanup();
    main.replaceChildren();
    results(main, subject, run);
    window.scrollTo({ top: 0 });
  }

  const modal = $(root, '.modal-back');
  $(root, '.submit').onclick = () => {
    const open = items.filter(it => it.pick == null).length, fl = items.filter(it => it.flag).length;
    $(root, '.m-body').innerHTML = [open ? t('ex.confirmOpen', { n: open }) : t('ex.confirmAll'), fl ? t('ex.confirmFlag', { n: fl }) : ''].filter(Boolean).join(' · ');
    modal.hidden = false; $(root, '.m-yes').focus();
  };
  $(root, '.m-no').onclick = () => { modal.hidden = true; };
  $(root, '.m-yes').onclick = submit;
  $(root, '.abort').onclick = () => {
    if (confirm(t('ex.abortConfirm'))) { cleanup(); discardExam(sid); main.replaceChildren(); exam(main, { subject }); }
  };

  const tick = () => {
    if (!document.body.contains(root)) return cleanup();
    const left = (deadline(run) - Date.now()) / 1000;
    const tv = $(root, '.et-val'); tv.textContent = fmtClock(left);
    const low = left <= 300;
    $(root, '.exam-timer').classList.toggle('low', low);
    if (low && !warned) { warned = true; toast(t('ex.fiveMin')); }
    if (left <= 0) { toast(t('ex.timeUp')); submit(); }
  };
  const timer = setInterval(tick, 500);

  const onKey = e => {
    if (!document.body.contains(root)) return cleanup();
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (!modal.hidden) { if (e.key === 'Escape') modal.hidden = true; return; }
    if (['1', '2', '3', '4'].includes(e.key)) { e.preventDefault(); pick(+e.key - 1); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); go(run.cur + 1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); go(run.cur - 1); }
    else if (e.key === 'm' || e.key === 'M') { e.preventDefault(); toggleFlag(); }
  };
  function cleanup() { clearInterval(timer); document.removeEventListener('keydown', onKey); }
  document.addEventListener('keydown', onKey);
  tick(); showQ();
}

function results(main, subject, run) {
  const sid = subject.id, ctx = { subject };
  const { parts, passed } = scoreExam(subject, run);
  const total = run.items.length, ok = run.items.filter(isCorrect).length;
  const wrong = run.items.filter(it => !isCorrect(it));
  const root = el(`
    <section class="exam-result qs">
      <span class="eyebrow">${t('ex.eyebrow')} · ${esc(subject.exam.title || t('ex.title'))}</span>
      <div class="result-hero ${passed ? 'pass' : 'fail'}">
        <div class="rh-badge" role="status">${passed ? t('ex.passed') : t('ex.failed')}</div>
        <div class="rh-sub">${t('ex.overall')}: ${ok}/${total} · ${t('ex.time', { t: fmtClock(run.seconds ?? 0) })}</div>
      </div>
      <div class="exam-parts">${subject.exam.parts.map(p => {
        const o = parts[p.id];
        return `<div class="panel part-res ${o.passed ? 'pass' : 'fail'}"><h3>${esc(p.title)}</h3>
          <div class="pr-pct"><b>${o.pct} %</b><span>${o.ok}/${o.total}</span></div>
          <div class="bar pass-bar"><span style="width:${o.pct}%"></span><i style="left:${p.passPercent}%" title="${t('ex.passAt', { p: p.passPercent })}"></i></div>
          <p class="pr-state">${o.passed ? t('ex.passed') : t('ex.failed')} · ${t('ex.passAt', { p: p.passPercent })}</p></div>`;
      }).join('')}</div>
      <p class="muted">${wrong.length ? t('ex.mistakesNote') : ''}</p>
      <div class="hero-actions">
        <button class="btn primary again">${t('ex.again')}</button>
        ${wrong.length ? `<a class="btn" href="#/s/${sid}/practice/weak">${t('ex.toPractice')}</a>` : ''}
        <a class="btn ghost" href="#/s/${sid}/practice">${t('pr.backHub')}</a>
      </div>
      <h2 class="q-h2">${wrong.length ? t('ex.mistakes', { n: wrong.length }) : t('ex.noMistakes')}</h2>
      <ol class="wrong-list">${wrong.map(it => {
        const q = subject.qById[it.qid];
        const mine = it.pick != null ? answerHTML(q.answers[it.order[it.pick]], it.order[it.pick], ctx) : `<i>${t('ex.unanswered')}</i>`;
        return `<li class="q-card">
          <div class="q-id">${esc(q.id)} · ${esc(subject.qTopicById[q.topic]?.title || '')}</div>
          ${questionHTML(q, ctx)}
          <div class="ans-row bad"><span class="ar-l">${t('ex.yourAnswer')}</span><div>${mine}</div></div>
          <div class="ans-row good"><span class="ar-l">${t('ex.correctAnswer')}</span><div>${answerHTML(q.answers[0], 0, ctx)}</div></div>
          ${explainHTML(q, ctx, subject).trim() ? `<div class="q-explain">${explainHTML(q, ctx, subject)}</div>` : ''}</li>`;
      }).join('')}</ol>
    </section>`);
  main.append(root);
  $(root, '.again').onclick = () => { discardExam(sid); main.replaceChildren(); exam(main, { subject }); };
}
