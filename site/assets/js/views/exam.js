// #/s/:sid/exam[/new|result] — exam simulation in the real format.
// Complete exam = parts one after another, each with its own timer (when every part has `minutes`);
// or a single part under exam conditions. Resumable, no feedback until the end, no way back between parts.
import * as store from '../store.js';
import { el, $, $$, icon, toast } from '../ui.js';
import { esc, md } from '../markup.js';
import { t } from '../i18n.js';
import { startExam, beginSegment, endSegment, discardExam, currentRun, segIdx, segWaiting, segDeadline, lastSeg, fmtClock, isCorrect, scoreExam } from '../examkit.js';
import { questionHTML, answersHTML, answersClass, answerHTML, explainHTML, noteHTML } from './qparts.js';
import { examHistory } from './practice.js';

const go = (subject, sub) => { location.hash = `#/s/${subject.id}/exam${sub ? '/' + sub : ''}`; };

export default async function exam(main, { subject, arg }) {
  if (!subject?.exam) { location.hash = subject ? `#/s/${subject.id}` : '#/'; return; }
  const sid = subject.id;
  let run = currentRun(sid);
  // drop a saved run that cannot be resumed (old format without segments, removed questions)
  if (run && ((!run.done && !run.segs) || run.items.some(it => !subject.qById[it.qid]))) { discardExam(sid); run = null; }
  if (run && !run.done) {
    if (!segWaiting(run) && Date.now() >= segDeadline(run)) {
      const fin = endSegment(subject, run);
      toast(t('ex.partTimeUp'));
      if (fin) return go(subject, 'result');
    }
    return segWaiting(run) ? between(main, subject, run) : running(main, subject, run);
  }
  if (run?.done && arg === 'result') return results(main, subject, run);
  return intro(main, subject, run?.done ? run : null);
}

const partOf = (subject, id) => subject.exam.parts.find(p => p.id === id);
const passLabel = p => p.passCount != null ? t('ex.passPoints', { n: p.passCount, m: p.count }) : t('ex.passAt', { p: Math.round(p.passPercent) });

function intro(main, subject, done) {
  const sid = subject.id, ex = subject.exam;
  const size = p => Math.min(p.count || Infinity, p.questions.length);
  const total = ex.parts.reduce((a, p) => a + size(p), 0);
  const partRow = p => `<li><b>${esc(p.title)}</b><span>${t('ex.questions', { n: size(p) })}${p.count > size(p) ? ` <i class="bad">(${t('ex.poolShort', { n: p.count })})</i>` : ''} · ${t('ex.minutes', { n: p.minutes })} · ${passLabel(p)}</span></li>`;
  const root = el(`
    <section class="exam-intro">
      <span class="eyebrow">${t('ex.eyebrow')}</span>
      <h1 class="display">${esc(ex.title || t('ex.title'))}</h1>
      ${ex.rules ? `<div class="exam-rules-md prose">${md(ex.rules, { subject })}</div>` : `<p class="lede">${t('ex.intro', { n: total, m: ex.minutes })}</p>
      <ul class="exam-rules"><li>${t('ex.rule1')}</li><li>${t('ex.rule2')}</li><li>${t('ex.rule3')}</li></ul>`}
      <div class="exam-parts">
        <div class="panel exam-card full"><h3>${icon.spark} ${t('ex.fullTitle')}</h3>
          <p>${ex.sequential ? t('ex.fullDesc') : t('ex.intro', { n: total, m: ex.minutes })}</p>
          <ul class="exam-plist">${ex.parts.map(partRow).join('')}</ul>
          <button class="btn primary big start" data-mode="full">${t('ex.start')} ${icon.arrow}</button></div>
        ${ex.parts.length > 1 ? ex.parts.map(p => `<div class="panel exam-card"><h3>${esc(p.title)}</h3>
          <p class="muted">${t('ex.questions', { n: size(p) })} · ${t('ex.minutes', { n: p.minutes })}<br>${passLabel(p)}</p>
          <button class="btn start" data-mode="${esc(p.id)}" title="${t('ex.partOnly', { p: esc(p.title) })}">${t('ex.startOnly')}</button></div>`).join('') : ''}
      </div>
      <div class="hero-actions">${done ? `<a class="btn" href="#/s/${sid}/exam/result">${t('ex.lastResult')}</a>` : ''}<a class="btn ghost" href="#/s/${sid}/practice">${t('pr.backHub')}</a></div>
      <h2 class="q-h2">${t('pr.lastExams')}</h2>${examHistory(subject, 10)}
      ${noteHTML(subject)}
    </section>`);
  main.append(root);
  $$(root, '.start').forEach(b => b.onclick = () => { startExam(subject, b.dataset.mode); main.replaceChildren(); exam(main, { subject }); window.scrollTo({ top: 0 }); });
}

// Waiting room between two parts.
function between(main, subject, run) {
  const sid = subject.id;
  const prev = partOf(subject, run.segs[run.seg - 1].parts[0]), next = run.segs[run.seg].parts.map(id => partOf(subject, id));
  const nextTitle = next.map(p => p.title).join(', ');
  const root = el(`
    <section class="exam-between qs">
      <div class="review-empty">
        <div class="big-icon">${icon.check}</div>
        <span class="eyebrow">${t('ex.partOf', { i: run.seg + 1, n: run.segs.length })}</span>
        <h1 class="display">${t('ex.partDone', { p: esc(prev.title) })}</h1>
        <p class="lede">${t('ex.nextPart', { p: esc(nextTitle) })}. ${t('ex.betweenLede')}</p>
        <p class="muted">${next.map(p => `${t('ex.questions', { n: run.items.filter(i => i.part === p.id).length })} · ${t('ex.minutes', { n: run.segs[run.seg].minutes })} · ${passLabel(p)}`).join(' · ')}</p>
        <div class="hero-actions"><button class="btn primary big go">${t('ex.startPart', { p: esc(nextTitle) })} ${icon.arrow}</button>
          <button class="btn ghost abort">${t('ex.abort')}</button></div>
      </div></section>`);
  main.append(root);
  $(root, '.go').focus();
  $(root, '.go').onclick = () => { beginSegment(run); main.replaceChildren(); exam(main, { subject }); window.scrollTo({ top: 0 }); };
  $(root, '.abort').onclick = () => { if (confirm(t('ex.abortConfirm'))) { discardExam(sid); main.replaceChildren(); exam(main, { subject }); } };
}

function running(main, subject, run) {
  const sid = subject.id, ctx = { subject };
  const root = el(`<section class="exam-run qs"></section>`);
  main.append(root);
  const items = run.items, idxs = segIdx(run), first = idxs[0], n = idxs.length;
  const multi = run.segs.length > 1, final = lastSeg(run);
  let warned = segDeadline(run) - Date.now() <= 300000;
  const partTitle = id => partOf(subject, id)?.title || id;
  const persist = () => store.save();
  const segTitle = run.segs[run.seg].parts.map(partTitle).join(', ');

  root.innerHTML = `
    <div class="exam-bar">
      <div class="exam-title"><span class="eyebrow">${esc(subject.exam.title || t('ex.title'))}${multi ? ` · ${t('ex.partOf', { i: run.seg + 1, n: run.segs.length })}` : ''}</span><b class="exam-part">${esc(segTitle)}</b></div>
      <div class="exam-timer" role="timer" aria-label="${t('ex.timeLeft')}"><span class="et-label">${t('ex.timeLeft')}</span> <b class="et-val">--:--</b></div>
      <button class="btn small submit">${icon.check} ${multi && !final || run.segs.length === 1 && run.mode !== 'full' ? t('ex.submitPart') : t('ex.submit')}</button>
    </div>
    <div class="exam-layout">
      <div class="q-card exam-q"></div>
      <aside class="exam-nav" aria-label="${t('ex.nav')}"><div class="exam-grid"></div>
        <div class="exam-count" aria-live="polite"></div>
        <div class="q-legend"><span><i class="a"></i>${t('ex.answered')}</span><span><i class="f"></i>${t('ex.flagged')}</span><span><i class="o"></i>${t('ex.open')}</span></div>
        <button class="btn ghost small abort">${t('ex.abort')}</button>
      </aside>
    </div>
    <div class="modal-back" hidden><div class="modal" role="alertdialog" aria-modal="true" aria-labelledby="mTitle"><h3 id="mTitle"></h3><p class="m-body"></p>
      <div class="row"><button class="btn primary m-yes">${t('ex.confirmYes')}</button><button class="btn m-no">${t('ex.confirmNo')}</button></div></div></div>`;

  const grid = $(root, '.exam-grid');
  grid.innerHTML = idxs.map((gi, k) => {
    const it = items[gi], firstOfPart = k === 0 || items[idxs[k - 1]].part !== it.part;
    return `${firstOfPart && run.segs[run.seg].parts.length > 1 ? `<div class="eg-part">${esc(partTitle(it.part))}</div>` : ''}<button class="eg" data-i="${gi}" aria-label="${t('pr.q', { i: k + 1, n })}">${k + 1}</button>`;
  }).join('');
  $$(root, '.eg').forEach(b => b.onclick = () => goTo(+b.dataset.i));

  function paintNav() {
    const done = idxs.filter(i => items[i].pick != null).length, fl = idxs.filter(i => items[i].flag).length;
    $$(root, '.eg').forEach(b => {
      const i = +b.dataset.i, it = items[i];
      b.classList.toggle('answered', it.pick != null);
      b.classList.toggle('flagged', !!it.flag);
      b.classList.toggle('cur', i === run.cur);
      b.setAttribute('aria-current', i === run.cur ? 'true' : 'false');
    });
    $(root, '.exam-count').textContent = `${done}/${n} ${t('ex.answered')} · ${fl} ${t('ex.flagged')}`;
  }

  function goTo(i) { run.cur = Math.max(first, Math.min(first + n - 1, i)); persist(); showQ(); }

  function showQ() {
    if (run.cur < first || run.cur >= first + n) run.cur = first;
    const it = items[run.cur], q = subject.qById[it.qid], k = run.cur - first;
    const box = $(root, '.exam-q');
    box.innerHTML = `
      <div class="review-top"><span class="eyebrow">${t('pr.q', { i: k + 1, n })}</span>
        <button class="btn small flag" aria-pressed="${!!it.flag}">${icon.spark} <span>${it.flag ? t('ex.unflag') : t('ex.flag')}</span></button></div>
      ${questionHTML(q, ctx)}
      <div class="${answersClass(q)}" role="radiogroup" aria-label="${t('pr.answers')}">${answersHTML(q, it, ctx)}</div>
      <div class="q-actions"><button class="btn prev" ${k === 0 ? 'disabled' : ''}>${icon.back} ${t('ex.prev')}</button>
        <span class="q-keys">${t('ex.keys')}</span>
        <button class="btn primary next" ${k === n - 1 ? 'disabled' : ''}>${t('ex.next')} ${icon.arrow}</button></div>`;
    $$(box, '.q-ans').forEach(b => {
      const p = +b.dataset.pos;
      b.setAttribute('aria-checked', it.pick === p ? 'true' : 'false');
      b.classList.toggle('picked', it.pick === p);
      b.onclick = () => pick(p);
    });
    $(box, '.flag').classList.toggle('on', !!it.flag);
    $(box, '.flag').onclick = toggleFlag;
    $(box, '.prev').onclick = () => goTo(run.cur - 1);
    $(box, '.next').onclick = () => goTo(run.cur + 1);
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

  function endNow() {
    cleanup();
    const fin = endSegment(subject, run);
    if (fin) return go(subject, 'result');
    main.replaceChildren(); between(main, subject, run);
    window.scrollTo({ top: 0 });
  }

  const modal = $(root, '.modal-back');
  $(root, '.submit').onclick = () => {
    const open = idxs.filter(i => items[i].pick == null).length, fl = idxs.filter(i => items[i].flag).length;
    $(root, '#mTitle').textContent = multi && !final || run.segs.length === 1 && run.mode !== 'full' ? t('ex.confirmPartTitle') : t('ex.confirmTitle');
    $(root, '.m-body').innerHTML = [open ? t('ex.confirmOpen', { n: open }) : t('ex.confirmAll'), fl ? t('ex.confirmFlag', { n: fl }) : '', multi && !final ? t('ex.noBack') : ''].filter(Boolean).join(' · ');
    modal.hidden = false; $(root, '.m-yes').focus();
  };
  $(root, '.m-no').onclick = () => { modal.hidden = true; };
  $(root, '.m-yes').onclick = endNow;
  $(root, '.abort').onclick = () => {
    if (confirm(t('ex.abortConfirm'))) { cleanup(); discardExam(sid); main.replaceChildren(); exam(main, { subject }); }
  };

  const tick = () => {
    if (!document.body.contains(root)) return cleanup();
    const left = (segDeadline(run) - Date.now()) / 1000;
    $(root, '.et-val').textContent = fmtClock(left);
    const low = left <= 300;
    $(root, '.exam-timer').classList.toggle('low', low);
    if (low && !warned) { warned = true; toast(t('ex.fiveMin')); }
    if (left <= 0) { toast(t('ex.partTimeUp')); endNow(); }
  };
  const timer = setInterval(tick, 500);

  const onKey = e => {
    if (!document.body.contains(root)) return cleanup();
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (!modal.hidden) { if (e.key === 'Escape') modal.hidden = true; return; }
    if (['1', '2', '3', '4'].includes(e.key)) { e.preventDefault(); pick(+e.key - 1); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); goTo(run.cur + 1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(run.cur - 1); }
    else if (e.key === 'm' || e.key === 'M') { e.preventDefault(); toggleFlag(); }
  };
  function cleanup() { clearInterval(timer); document.removeEventListener('keydown', onKey); }
  document.addEventListener('keydown', onKey);
  tick(); showQ();
}

function results(main, subject, run) {
  const sid = subject.id, ctx = { subject };
  const { parts, status } = scoreExam(subject, run);
  const total = run.items.length, ok = run.items.filter(isCorrect).length;
  const wrong = run.items.filter(it => !isCorrect(it));
  const oralPart = Object.entries(parts).find(([, o]) => o.oral);
  const root = el(`
    <section class="exam-result qs">
      <span class="eyebrow">${t('ex.eyebrow')} · ${esc(subject.exam.title || t('ex.title'))}</span>
      <div class="result-hero ${status}">
        <div class="rh-badge" role="status">${t('ex.st.' + status)}</div>
        <div class="rh-sub">${t('ex.overall')}: ${ok}/${total} ${t('ex.pointsWord')} · ${t('ex.time', { t: fmtClock(run.seconds ?? 0) })}</div>
        ${status === 'oral' ? `<div class="rh-note">${t('ex.oralNote', { n: oralPart ? partOf(subject, oralPart[0]).oralFrom : '' })}</div>` : ''}
      </div>
      <div class="exam-parts">${Object.entries(parts).map(([id, o]) => {
        const p = partOf(subject, id), st = o.passed ? 'passed' : o.oral ? 'oral' : 'failed';
        return `<div class="panel part-res ${st}"><h3>${esc(p.title)}</h3>
          <div class="pr-pct"><b>${o.ok}/${o.total}</b><span>${t('ex.pointsWord')} · ${o.pct} %</span></div>
          <div class="bar pass-bar"><span style="width:${o.pct}%"></span><i style="left:${o.total ? o.need / o.total * 100 : 0}%" title="${t('ex.passPoints', { n: o.need, m: o.total })}"></i></div>
          <p class="pr-state">${t('ex.st.' + st)} · ${t('ex.passPoints', { n: o.need, m: o.total })}</p></div>`;
      }).join('')}</div>
      <p class="muted">${wrong.length ? t('ex.mistakesNote') : ''}</p>
      <div class="hero-actions">
        <a class="btn primary" href="#/s/${sid}/exam/new">${t('ex.again')}</a>
        ${wrong.length ? `<a class="btn" href="#/s/${sid}/practice/last">${t('ex.toPractice')}</a>` : ''}
        <a class="btn ghost" href="#/s/${sid}/practice">${t('pr.backHub')}</a>
      </div>
      <h2 class="q-h2">${wrong.length ? t('ex.mistakes', { n: wrong.length }) : t('ex.noMistakes')}</h2>
      <ol class="wrong-list">${wrong.map(it => {
        const q = subject.qById[it.qid];
        const mine = it.pick != null ? answerHTML(q.answers[it.order[it.pick]], it.order[it.pick], ctx) : `<i>${t('ex.unanswered')}</i>`;
        const exp = explainHTML(q, ctx, subject);
        return `<li class="q-card">
          <div class="q-id">${esc(q.id)} · ${esc(subject.qTopicById[q.topic]?.title || '')}</div>
          ${questionHTML(q, ctx)}
          <div class="ans-row bad"><span class="ar-l">${t('ex.yourAnswer')}</span><div>${mine}</div></div>
          <div class="ans-row good"><span class="ar-l">${t('ex.correctAnswer')}</span><div>${answerHTML(q.answers[0], 0, ctx)}</div></div>
          ${exp.trim() ? `<div class="q-explain">${exp}</div>` : ''}</li>`;
      }).join('')}</ol>
      ${noteHTML(subject)}
    </section>`);
  main.append(root);
}
