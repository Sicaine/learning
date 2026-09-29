import * as store from '../store.js';
import { loadAllLessons, cardKey } from '../content.js';
import { GRADES, schedule, preview, isDue, formatSpan } from '../srs.js';
import { deckStats } from '../progress.js';
import { el, $, $$, icon, shuffle } from '../ui.js';
import { md, mdInline, esc } from '../markup.js';

export default async function review(main, { subject }) {
  const sid = subject.id;
  const lessons = (await loadAllLessons(subject)).filter(Boolean);
  const cardIndex = {};
  for (const l of lessons) for (const c of l.cards || []) cardIndex[cardKey(l.id, c.id)] = { ...c, lesson: l };
  const ctx = { subject };

  const deck = () => store.subject(sid).cards;
  const now = Date.now();
  let queue = shuffle(Object.keys(deck()).filter(k => cardIndex[k] && isDue(deck()[k], now)));
  let reviewed = 0;
  const session = { again: 0, good: 0 };

  const root = el(`<section class="review"></section>`);
  main.append(root);

  function summary() {
    const d = deckStats(sid);
    const upcoming = Object.values(deck()).filter(c => !isDue(c)).sort((a, b) => a.due - b.due)[0];
    root.innerHTML = `
      <div class="review-empty">
        <div class="big-icon">${icon.cards}</div>
        <h1 class="display">${reviewed ? 'Session complete' : d.total ? 'All caught up' : 'Your deck is empty'}</h1>
        <p class="lede">${reviewed
          ? `You reviewed ${reviewed} card${reviewed > 1 ? 's' : ''}. ${session.again ? `${session.again} will come back shortly.` : 'Nice and clean.'}`
          : d.total ? `Nothing due right now.${upcoming ? ` Next card in ${formatSpan(upcoming.due - Date.now())}.` : ''}`
          : 'Cards join your deck automatically when you complete a lesson, or when you miss a recall question.'}</p>
        <div class="deck-stats">
          <div><b>${d.total}</b><span>in deck</span></div>
          <div><b>${d.due}</b><span>due</span></div>
          <div><b>${d.learned}</b><span>mastered (21d+)</span></div>
        </div>
        <div class="hero-actions">
          ${d.due ? `<button class="btn primary again-btn">Review ${d.due} more</button>` : ''}
          <a class="btn" href="#/s/${sid}">${icon.map} Back to path</a>
          ${d.total ? '<button class="btn ghost browse">Browse all cards</button>' : ''}
        </div>
        <div class="card-browser"></div>
      </div>`;
    $(root, '.again-btn')?.addEventListener('click', () => review(main.replaceChildren() || main, { subject }));
    $(root, '.browse')?.addEventListener('click', e => {
      e.target.remove();
      const byLesson = {};
      for (const k of Object.keys(deck())) if (cardIndex[k]) (byLesson[cardIndex[k].lesson.title] ??= []).push(k);
      $(root, '.card-browser').innerHTML = Object.entries(byLesson).map(([title, keys]) => `
        <h3>${esc(title)}</h3>
        ${keys.map(k => `<details class="browse-card"><summary>${mdInline(cardIndex[k].front, ctx)}<span class="due-in">${isDue(deck()[k]) ? 'due' : formatSpan(deck()[k].due - Date.now())}</span></summary><div class="prose">${md(cardIndex[k].back, ctx)}</div></details>`).join('')}`).join('');
    });
  }

  function show() {
    if (!queue.length) return summary();
    const key = queue[0];
    const card = cardIndex[key];
    const st = deck()[key];
    root.innerHTML = `
      <div class="review-top">
        <span class="eyebrow">${esc(card.lesson.title)}</span>
        <span class="review-count">${queue.length} left</span>
      </div>
      <div class="flash-card" tabindex="0">
        <div class="face front"><div class="prose">${md(card.front, ctx)}</div><span class="flip-hint">Space to reveal</span></div>
        <div class="face back" hidden><div class="prose q-small">${md(card.front, ctx)}</div><hr><div class="prose">${md(card.back, ctx)}</div></div>
      </div>
      <div class="review-actions">
        <button class="btn primary big show">Show answer</button>
        <div class="grades" hidden>
          ${GRADES.map(g => `<button class="grade g${g.id}" data-g="${g.id}"><b>${g.label}</b><span>${preview(st, g.id)}</span></button>`).join('')}
        </div>
      </div>`;
    const flip = () => {
      $(root, '.front').hidden = true; $(root, '.back').hidden = false;
      $(root, '.show').hidden = true; $(root, '.grades').hidden = false;
      $(root, '.flash-card').classList.add('flipped');
    };
    $(root, '.show').onclick = flip;
    $(root, '.flash-card').onclick = () => { if (!$(root, '.front').hidden) flip(); };
    $$(root, '.grade').forEach(b => b.onclick = () => grade(+b.dataset.g));
  }

  function grade(g) {
    const key = queue.shift();
    store.update(() => { deck()[key] = schedule(deck()[key], g); });
    reviewed++;
    if (g === 0) { session.again++; queue.splice(Math.min(queue.length, 3), 0, key); }
    else session.good++;
    show();
  }

  const onKey = e => {
    if (!document.body.contains(root)) return document.removeEventListener('keydown', onKey);
    if (e.target.matches('input, textarea')) return;
    const grades = $(root, '.grades');
    if (e.code === 'Space' && grades?.hidden) { e.preventDefault(); $(root, '.show')?.click(); }
    else if (grades && !grades.hidden && ['1', '2', '3', '4'].includes(e.key)) grade(+e.key - 1);
  };
  document.addEventListener('keydown', onKey);
  show();
}
