// Block registry. A lesson is a list of blocks; each block type renders itself
// and (for tasks) reports completion through ctx.done(). Subject-specific
// visualizations and games live in subjects/<sid>/viz/<name>.js.

import { el, $, $$, icon, shuffle, toast } from '../ui.js';
import { md, mdInline, esc } from '../markup.js';
import * as store from '../store.js';
import { addCards } from '../progress.js';
import { t } from '../i18n.js';

const LABELLED = new Set(['video', 'quiz', 'recall', 'numeric', 'order', 'match', 'viz', 'game', 'map']);
export function blockLabel(b) { return b.title || t(LABELLED.has(b.type) ? `label.${b.type}` : 'label.read'); }

export async function renderBlock(b, ctx) {
  const r = renderers[b.type];
  if (!r) throw new Error(`Unknown block type "${b.type}"`);
  return r(b, ctx);
}

function head(b, ctx, kind) {
  const done = ctx.task(b.id).done;
  return `<div class="task-head"><span class="task-kind">${kind}</span>${b.title ? `<h3>${esc(b.title)}</h3>` : ''}<span class="task-done ${done ? 'on' : ''}">${icon.check}</span></div>`;
}
function setDone(root) { $(root, '.task-done')?.classList.add('on'); root.classList.add('solved'); }

const renderers = {
  text(b, ctx) {
    return el(`<div class="prose">${b.title ? `<h2>${esc(b.title)}</h2>` : ''}${md(b.md, ctx)}</div>`);
  },

  callout(b, ctx) {
    const tone = b.tone || 'insight';
    if (tone === 'deep') {
      return el(`<details class="callout deep"><summary><span class="callout-tag">${t('callout.deep')}</span>${esc(b.title || '')}</summary><div class="prose">${md(b.md, ctx)}</div></details>`);
    }
    return el(`<div class="callout ${tone}"><span class="callout-tag">${esc(b.label || t(`callout.${tone}`))}</span>${b.title ? `<h3>${esc(b.title)}</h3>` : ''}<div class="prose">${md(b.md, ctx)}</div></div>`);
  },

  figure(b, ctx) {
    return el(`<figure class="figure">${b.title ? `<h3>${esc(b.title)}</h3>` : ''}<div class="figure-body">${b.html}</div>${b.caption ? `<figcaption>${mdInline(b.caption, ctx)}</figcaption>` : ''}</figure>`);
  },

  video(b, ctx) {
    const root = el(`
      <div class="task video">
        ${head(b, ctx, t('kind.watch'))}
        ${b.src
          ? `<video class="video-frame video-local" controls preload="metadata" playsinline src="${esc(b.src)}"${b.poster ? ` poster="${esc(b.poster)}"` : ''}></video>`
          : `<div class="video-frame" style="background-image:url(https://i.ytimg.com/vi/${b.youtube}/hqdefault.jpg)">
          <button class="video-play" aria-label="${t('video.play')}">${icon.play}</button>
        </div>`}
        <div class="video-meta">
          <div><b>${esc(b.label || '')}</b><span>${esc([b.channel, b.minutes && `${b.minutes} min`].filter(Boolean).join(' · '))}</span></div>
          <button class="btn small watched">${ctx.task(b.id).done ? `${icon.check} ${t('video.watched')}` : t('video.mark')}</button>
        </div>
        ${b.why ? `<div class="prose small">${md(b.why, ctx)}</div>` : ''}
      </div>`);
    if (b.src) $(root, 'video').addEventListener('ended', () => { ctx.done(b.id); $(root, '.watched').innerHTML = `${icon.check} ${t('video.watched')}`; setDone(root); });
    else $(root, '.video-play').onclick = () => {
      const start = b.start ? `&start=${b.start}` : '';
      $(root, '.video-frame').innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${b.youtube}?autoplay=1&rel=0${start}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen title="${esc(b.label || 'video')}"></iframe>`;
    };
    $(root, '.watched').onclick = e => { ctx.done(b.id); e.target.closest('button').innerHTML = `${icon.check} ${t('video.watched')}`; setDone(root); };
    if (ctx.task(b.id).done) root.classList.add('solved');
    return root;
  },

  quiz(b, ctx) {
    const multi = b.options.filter(o => o.correct).length > 1;
    const order = b.shuffle === false ? b.options.map((_, i) => i) : shuffle(b.options.map((_, i) => i));
    const saved = ctx.task(b.id);
    const root = el(`
      <div class="task quiz">
        ${head(b, ctx, multi ? t('kind.multi') : t('kind.single'))}
        <div class="prose q">${md(b.question, ctx)}</div>
        <div class="options">${order.map(i => `
          <label class="option" data-i="${i}">
            <input type="${multi ? 'checkbox' : 'radio'}" name="q-${b.id}" value="${i}">
            <span class="opt-text" data-missed="${t('quiz.missed')}">${mdInline(b.options[i].text, ctx)}</span>
            <span class="opt-why">${b.options[i].why ? mdInline(b.options[i].why, ctx) : ''}</span>
          </label>`).join('')}
        </div>
        <div class="task-actions"><button class="btn primary check">${t('check')}</button><span class="feedback"></span></div>
      </div>`);
    const check = () => {
      const chosen = $$(root, 'input:checked').map(i => +i.value);
      if (!chosen.length) return;
      let allRight = true;
      $$(root, '.option').forEach(opt => {
        const i = +opt.dataset.i, o = b.options[i], picked = chosen.includes(i);
        opt.classList.remove('right', 'wrong', 'missed');
        if (picked && o.correct) opt.classList.add('right');
        else if (picked && !o.correct) { opt.classList.add('wrong'); allRight = false; }
        else if (!picked && o.correct) { if (multi) opt.classList.add('missed'); allRight = false; }
        opt.classList.add('revealed');
      });
      $(root, '.feedback').textContent = allRight ? t('correct') : multi ? t('quiz.retryMulti') : t('quiz.retry');
      $(root, '.feedback').className = `feedback ${allRight ? 'good' : 'bad'}`;
      if (allRight) { ctx.done(b.id, { chosen }); setDone(root); }
    };
    $(root, '.check').onclick = check;
    if (saved.done && saved.chosen) {
      saved.chosen.forEach(i => { const inp = $(root, `input[value="${i}"]`); if (inp) inp.checked = true; });
      check();
    }
    return root;
  },

  recall(b, ctx) {
    const saved = ctx.task(b.id);
    const root = el(`
      <div class="task recall">
        ${head(b, ctx, t('kind.recall'))}
        <div class="prose q">${md(b.prompt, ctx)}</div>
        <textarea rows="4" placeholder="${t('recall.placeholder')}"></textarea>
        <div class="hints"></div>
        <div class="task-actions">
          ${b.hints?.length ? `<button class="btn ghost hint">${t('hint')}</button>` : ''}
          <button class="btn primary reveal">${t('recall.reveal')}</button>
          <button class="btn ghost copy" title="${t('recall.askTitle')}">${icon.copy} ${t('recall.ask')}</button>
        </div>
        <div class="model" hidden>
          <span class="eyebrow">${t('recall.reference')}</span>
          <div class="prose">${md(b.answer, ctx)}</div>
          <div class="rate"><span>${t('recall.how')}</span>
            <button class="btn small" data-r="2">${t('recall.nailed')}</button>
            <button class="btn small" data-r="1">${t('recall.partly')}</button>
            <button class="btn small" data-r="0">${t('recall.missed')}</button>
          </div>
        </div>
      </div>`);
    const ta = $(root, 'textarea');
    ta.value = saved.answer || '';
    let saveTimer;
    ta.oninput = () => { clearTimeout(saveTimer); saveTimer = setTimeout(() => ctx.save(b.id, { answer: ta.value }), 400); };
    let hintI = 0;
    $(root, '.hint')?.addEventListener('click', () => {
      if (hintI < b.hints.length) $(root, '.hints').append(el(`<div class="hint-line">${mdInline(b.hints[hintI++], ctx)}</div>`));
    });
    const reveal = () => { $(root, '.model').hidden = false; $(root, '.reveal').hidden = true; };
    $(root, '.reveal').onclick = () => { ctx.save(b.id, { answer: ta.value }); reveal(); };
    $(root, '.copy').onclick = async () => {
      const plain = s => String(s).replace(/\[\[([\w-]+)(?:\|([^\]]+))?\]\]/g, (_, id, shown) => shown || ctx.subject.glossary[id]?.term || id).replace(/\[\^[\w-]+\]/g, '');
      const prompt = t('recall.prompt', { subject: ctx.subject.title, lesson: ctx.lesson.title, q: plain(b.prompt), a: ta.value || t('recall.none'), ref: plain(b.answer) });
      try { await navigator.clipboard.writeText(prompt); toast(t('recall.copied')); }
      catch { toast(t('recall.blocked')); }
    };
    $$(root, '.rate button').forEach(btn => btn.onclick = () => {
      const r = +btn.dataset.r;
      $$(root, '.rate button').forEach(x => x.classList.toggle('on', x === btn));
      ctx.done(b.id, { answer: ta.value, rating: r });
      setDone(root);
      if (r < 2 && b.cards?.length) {
        let n = 0;
        store.update(() => { n = addCards(ctx.sid, ctx.lesson, b.cards); });
        if (n) toast(`${icon.cards} ${t('recall.cardsAdded', { n })}`);
      }
    });
    if (saved.done) { reveal(); $(root, `.rate button[data-r="${saved.rating}"]`)?.classList.add('on'); }
    return root;
  },

  numeric(b, ctx) {
    const saved = ctx.task(b.id);
    const root = el(`
      <div class="task numeric">
        ${head(b, ctx, t('kind.numeric'))}
        <div class="prose q">${md(b.question, ctx)}</div>
        <div class="num-row">
          <input type="text" inputmode="decimal" placeholder="${t('num.placeholder')}">${b.unit ? `<span class="unit">${esc(b.unit)}</span>` : ''}
          <button class="btn primary check">${t('check')}</button>
          ${b.hint ? `<button class="btn ghost hint">${t('hint')}</button>` : ''}
        </div>
        <div class="feedback"></div>
        <div class="explain prose" hidden>${md(b.explain || '', ctx)}</div>
      </div>`);
    const input = $(root, 'input');
    const check = () => {
      const v = parseFloat(input.value.replace(',', '.').replace(/[^\d.eE+-]/g, ''));
      if (Number.isNaN(v)) return;
      const tol = b.tolerance ?? Math.abs(b.answer) * 0.01;
      const ok = Math.abs(v - b.answer) <= tol;
      const fb = $(root, '.feedback');
      fb.className = `feedback ${ok ? 'good' : 'bad'}`;
      fb.textContent = ok ? t('correct') : v > b.answer ? t('num.high') : t('num.low');
      if (ok) { $(root, '.explain').hidden = !b.explain; ctx.done(b.id, { value: v }); setDone(root); }
    };
    $(root, '.check').onclick = check;
    input.onkeydown = e => { if (e.key === 'Enter') check(); };
    $(root, '.hint')?.addEventListener('click', e => { e.target.replaceWith(el(`<span class="hint-line">${mdInline(b.hint, ctx)}</span>`)); });
    if (saved.done) { input.value = saved.value; check(); }
    return root;
  },

  order(b, ctx) {
    const saved = ctx.task(b.id);
    let order = saved.done ? b.items.map((_, i) => i) : shuffle(b.items.map((_, i) => i));
    if (order.every((v, i) => v === i) && b.items.length > 2 && !saved.done) order = [...order.slice(1), order[0]];
    const root = el(`
      <div class="task order">
        ${head(b, ctx, t('kind.order'))}
        <div class="prose q">${md(b.prompt, ctx)}</div>
        <ol class="order-list"></ol>
        <div class="task-actions"><button class="btn primary check">${t('order.check')}</button><span class="feedback"></span></div>
        ${b.explain ? `<div class="explain prose" hidden>${md(b.explain, ctx)}</div>` : ''}
      </div>`);
    const list = $(root, '.order-list');
    const draw = (mark) => {
      list.innerHTML = order.map((i, pos) => `
        <li draggable="true" data-pos="${pos}" class="${mark ? (i === pos ? 'right' : 'wrong') : ''}">
          <span class="grip">⋮⋮</span><span class="ord-text">${mdInline(b.items[i], ctx)}</span>
          <span class="ord-btns"><button data-mv="-1" aria-label="${t('order.up')}">↑</button><button data-mv="1" aria-label="${t('order.down')}">↓</button></span>
        </li>`).join('');
    };
    draw(saved.done);
    const move = (from, to) => {
      if (to < 0 || to >= order.length) return;
      const [x] = order.splice(from, 1); order.splice(to, 0, x); draw();
    };
    list.onclick = e => {
      const btn = e.target.closest('button[data-mv]');
      if (btn) { const pos = +btn.closest('li').dataset.pos; move(pos, pos + +btn.dataset.mv); }
    };
    let dragFrom = null;
    list.ondragstart = e => { dragFrom = +e.target.closest('li').dataset.pos; e.target.closest('li').classList.add('dragging'); };
    list.ondragover = e => e.preventDefault();
    list.ondrop = e => { e.preventDefault(); const li = e.target.closest('li'); if (li && dragFrom !== null) move(dragFrom, +li.dataset.pos); dragFrom = null; };
    $(root, '.check').onclick = () => {
      const ok = order.every((v, i) => v === i);
      draw(true);
      const fb = $(root, '.feedback');
      fb.className = `feedback ${ok ? 'good' : 'bad'}`;
      fb.textContent = ok ? t('order.perfect') : t('order.partial', { k: order.filter((v, i) => v === i).length, n: order.length });
      if (ok) { ctx.done(b.id); setDone(root); const ex = $(root, '.explain'); if (ex) ex.hidden = false; }
    };
    if (saved.done) { const ex = $(root, '.explain'); if (ex) ex.hidden = false; }
    return root;
  },

  match(b, ctx) {
    const root = el(`
      <div class="task match">
        ${head(b, ctx, t('kind.match'))}
        ${b.prompt ? `<div class="prose q">${md(b.prompt, ctx)}</div>` : ''}
        <div class="match-board"></div>
        <div class="task-actions"><span class="feedback"></span><button class="btn ghost small again">${t('match.again')}</button></div>
      </div>`);
    renderMatchGame($(root, '.match-board'), b.pairs, ctx, (mistakes) => {
      const fb = $(root, '.feedback');
      fb.className = 'feedback good';
      fb.textContent = mistakes ? t('match.done', { n: mistakes }) : t('match.flawless');
      ctx.done(b.id, { mistakes }); setDone(root);
    });
    $(root, '.again').onclick = () => renderMatchGame($(root, '.match-board'), b.pairs, ctx, () => {});
    return root;
  },

  async map(b, ctx) { return (await import('./map.js')).renderMap(b, ctx); },
  async viz(b, ctx) { return mountModule(b, ctx, t('kind.viz')); },
  async game(b, ctx) { return mountModule(b, ctx, t('kind.game')); },
};

async function mountModule(b, ctx, kind) {
  const isTask = b.type === 'game' || !!b.task;
  const root = el(`
    <div class="${isTask ? 'task' : ''} viz">
      ${isTask ? head(b, ctx, kind) : b.title ? `<h3 class="viz-title">${esc(b.title)}</h3>` : ''}
      ${b.intro ? `<div class="prose">${md(b.intro, ctx)}</div>` : ''}
      <div class="viz-stage"></div>
      ${b.caption ? `<p class="viz-caption">${mdInline(b.caption, ctx)}</p>` : ''}
      ${b.task ? `<div class="viz-task"><span class="eyebrow">${t('viz.task')}</span><div class="prose">${md(b.task, ctx)}</div><button class="btn small did">${ctx.task(b.id).done ? `${icon.check} ${t('viz.done')}` : t('viz.did')}</button></div>` : ''}
    </div>`);
  const complete = () => { if (!ctx.task(b.id).done) { ctx.done(b.id); } setDone(root); const d = $(root, '.did'); if (d) d.innerHTML = `${icon.check} ${t('viz.done')}`; };
  $(root, '.did')?.addEventListener('click', complete);
  if (ctx.task(b.id).done) root.classList.add('solved');
  const mod = await import(`../../../subjects/${ctx.sid}/viz/${b.viz}.js`);
  await mod.default($(root, '.viz-stage'), { params: b.params || {}, ctx, complete, md: s => md(s, ctx) });
  return root;
}

// Shared match game, also used by the glossary's term practice.
export function renderMatchGame(board, pairs, ctx, onWin) {
  const left = shuffle(pairs.map((p, i) => ({ i, t: p[0] })));
  const right = shuffle(pairs.map((p, i) => ({ i, t: p[1] })));
  board.innerHTML = `
    <div class="col">${left.map(x => `<button class="chip" data-side="l" data-i="${x.i}">${mdInline(x.t, ctx)}</button>`).join('')}</div>
    <div class="col">${right.map(x => `<button class="chip" data-side="r" data-i="${x.i}">${mdInline(x.t, ctx)}</button>`).join('')}</div>`;
  let sel = null, mistakes = 0, found = 0;
  board.onclick = e => {
    const chip = e.target.closest('.chip');
    if (!chip || chip.classList.contains('matched')) return;
    e.preventDefault();
    if (!sel || sel.dataset.side === chip.dataset.side) {
      sel?.classList.remove('sel'); sel = chip; chip.classList.add('sel'); return;
    }
    if (sel.dataset.i === chip.dataset.i) {
      [sel, chip].forEach(c => { c.classList.remove('sel'); c.classList.add('matched'); });
      found++;
      if (found === pairs.length) onWin(mistakes);
    } else {
      mistakes++;
      [sel, chip].forEach(c => { c.classList.add('shake'); setTimeout(() => c.classList.remove('shake', 'sel'), 450); });
    }
    sel = null;
  };
}
