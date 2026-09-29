import { termUsage } from '../content.js';
import { renderMatchGame } from '../blocks/index.js';
import { el, $, $$, icon, shuffle } from '../ui.js';
import { md, mdInline, termLink, wikiLinks, esc } from '../markup.js';

export default async function glossary(main, { subject, arg }) {
  const ctx = { subject };
  const terms = Object.values(subject.glossary).sort((a, b) => a.term.localeCompare(b.term));
  const cats = [...new Set(terms.map(t => t.cat).filter(Boolean))];
  const usage = await termUsage(subject);
  let filter = '', cat = '';

  const root = el(`
    <section class="glossary">
      <div class="gl-head">
        <div><span class="eyebrow">Glossary · ${terms.length} terms</span><h1 class="display">Words that matter</h1></div>
        <div class="gl-tools">
          <input type="search" placeholder="Search terms, German names, definitions…">
          <div class="chips">${['', ...cats].map(c => `<button class="chip-f ${c === '' ? 'on' : ''}" data-cat="${c}">${c || 'All'}</button>`).join('')}</div>
        </div>
      </div>
      <div class="practice">
        <div><b>${icon.spark} Term practice</b><span>A quick matching round from this glossary.</span></div>
        <div class="practice-btns">
          <button class="btn small" data-mode="de">English ↔ Deutsch</button>
          <button class="btn small" data-mode="def">Term ↔ meaning</button>
        </div>
        <div class="practice-board match-board" hidden></div>
      </div>
      <div class="gl-layout">
        <ul class="gl-list"></ul>
        <div class="gl-detail"></div>
      </div>
    </section>`);
  main.append(root);

  function drawList() {
    const q = filter.toLowerCase();
    const shown = terms.filter(t => (!cat || t.cat === cat) &&
      (!q || [t.term, t.de, t.short, ...(t.aka || [])].some(x => x?.toLowerCase().includes(q))));
    $(root, '.gl-list').innerHTML = shown.map(t => `
      <li class="${t.id === arg ? 'on' : ''}"><a href="#/s/${subject.id}/glossary/${t.id}">
        <b>${esc(t.term)}</b>${t.de ? `<span class="gl-de">${esc(t.de)}</span>` : ''}
        <span class="gl-short">${mdInline(t.short, ctx)}</span>
      </a></li>`).join('') || '<li class="none">No matches.</li>';
  }

  function drawDetail() {
    const t = subject.glossary[arg];
    const d = $(root, '.gl-detail');
    if (!t) { d.innerHTML = `<div class="gl-placeholder">${icon.book}<p>Pick a term to see its full explanation, German name, related ideas and where it is used.</p></div>`; return; }
    const used = [...(usage[t.id] || [])].map(lid => subject.lessons[lid]).filter(Boolean);
    d.innerHTML = `
      <div class="gl-card">
        <span class="eyebrow">${esc(t.cat || 'term')}</span>
        <h2>${esc(t.term)}</h2>
        ${t.de ? `<div class="gl-de-big"><span>DE</span>${esc(t.de)}</div>` : ''}
        ${t.aka?.length ? `<p class="aka">Also: ${t.aka.map(esc).join(', ')}</p>` : ''}
        ${t.symbol ? `<div class="gl-symbol">${md(t.symbol, ctx)}</div>` : ''}
        <div class="prose">${md(t.long || t.short, ctx)}</div>
        ${t.wiki ? `<div class="gl-sec"><span class="eyebrow">Read more on Wikipedia</span><div class="wiki-row">${wikiLinks(t, { titles: true })}</div></div>` : ''}
        ${t.related?.length ? `<div class="gl-sec"><span class="eyebrow">Related</span><div class="rel">${t.related.map(r => termLink(r, null, ctx)).join('')}</div></div>` : ''}
        ${used.length ? `<div class="gl-sec"><span class="eyebrow">Appears in</span><div class="used">${used.map(l => `<a href="#/s/${subject.id}/l/${l.id}">${esc(l.title)}</a>`).join('')}</div></div>` : ''}
      </div>`;
    if (window.innerWidth < 900) d.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  $(root, 'input').oninput = e => { filter = e.target.value; drawList(); };
  $$(root, '.chip-f').forEach(b => b.onclick = () => {
    cat = b.dataset.cat; $$(root, '.chip-f').forEach(x => x.classList.toggle('on', x === b)); drawList();
  });
  $$(root, '.practice-btns button').forEach(b => b.onclick = () => {
    const pool = b.dataset.mode === 'de' ? terms.filter(t => t.de && t.de !== t.term) : terms;
    const pick = shuffle(pool).slice(0, 6);
    const board = $(root, '.practice-board');
    board.hidden = false;
    const pairs = pick.map(t => [t.term, b.dataset.mode === 'de' ? t.de : t.short]);
    renderMatchGame(board, pairs, ctx, m => {
      board.insertAdjacentHTML('beforeend', `<p class="feedback good win">${m ? `Done · ${m} slip${m > 1 ? 's' : ''}` : 'Flawless round.'} <button class="btn small ghost">Another round</button></p>`);
      $(board, '.win button').onclick = () => b.click();
    });
  });

  drawList();
  drawDetail();
}
