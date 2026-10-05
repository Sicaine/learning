// Shell + hash router. Routes:
//   #/                         home (all subjects)
//   #/s/:sid                   subject overview (stages & lessons)
//   #/s/:sid/l/:lid            lesson
//   #/s/:sid/review            card review session
//   #/s/:sid/glossary[/:term]  glossary
//   #/s/:sid/sources           library of sources
//   #/s/:sid/practice[/:topic|weak|new|due|all]  question practice (subjects with a question catalogue)
//   #/s/:sid/exam              exam simulation
//   #/backup                   export / import / settings

import * as store from './store.js';
import { subjects, subjectMeta, loadSubject } from './content.js';
import { deckStats } from './progress.js';
import { el, $, $$, icon } from './ui.js';
import { md, mdInline, sourceLine, wikiLinks, parseWikiSpec, altName, altLabel, esc } from './markup.js';
import { t as tr, setLang } from './i18n.js';
import home from './views/home.js';
import overview from './views/subject.js';
import lessonView from './views/lesson.js';
import review from './views/review.js';
import practice from './views/practice.js';
import examView from './views/exam.js';
import glossary from './views/glossary.js';
import library from './views/sources.js';
import backup from './views/backup.js';

const app = document.getElementById('app');
let current = { subject: null };

function parse() {
  const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean).map(decodeURIComponent);
  if (parts[0] === 's' && parts[1]) {
    const [, sid, section, arg] = parts;
    return { sid, section: section || 'overview', arg };
  }
  if (parts[0] === 'backup') return { section: 'backup' };
  return { section: 'home' };
}

async function route() {
  const r = parse();
  let subject = null;
  try {
    if (r.sid) subject = await loadSubject(r.sid);
  } catch (e) {
    console.error(e);
    location.hash = '#/';
    return;
  }
  current = { subject, route: r };
  setLang(subject?.lang || 'en');
  applyTheme(subject);
  renderHeader();
  $(app, 'footer').innerHTML = `${tr('foot.saved')} · <a href="#/backup">${tr('foot.backup')}</a>`;

  const main = $(app, 'main');
  main.innerHTML = '';
  main.classList.remove('enter');
  void main.offsetWidth;
  main.classList.add('enter');

  const view = {
    home, backup, overview, review, practice, exam: examView, glossary, sources: library,
    l: lessonView,
  }[r.section] || home;
  try {
    await view(main, { subject, arg: r.arg, route: r });
  } catch (e) {
    console.error(e);
    main.innerHTML = `<div class="empty"><h2>Something went wrong</h2><p>${esc(e.message)}</p></div>`;
  }
  if (r.section !== 'l') window.scrollTo({ top: 0 });
}

function applyTheme(subject) {
  const root = document.documentElement;
  const accent = subject?.accent || '#5b5bd6';
  const accent2 = subject?.accent2 || '#b14fd8';
  root.style.setProperty('--accent', accent);
  root.style.setProperty('--accent-2', accent2);
  document.title = subject ? `${subject.title} · Learning` : 'Learning';
  $$(document, '#accentGrad stop')[0]?.setAttribute('stop-color', accent);
  $$(document, '#accentGrad stop')[1]?.setAttribute('stop-color', accent2);
}

function renderHeader() {
  const { subject, route: r } = current;
  const st = store.get();
  const header = $(app, 'header');
  const due = subject ? deckStats(subject.id).due : 0;
  const nav = subject ? `
    <nav class="subnav">
      <a href="#/s/${subject.id}" class="${r.section === 'overview' ? 'on' : ''}">${icon.map}<span>${tr('nav.path')}</span></a>
      <a href="#/s/${subject.id}/review" class="${r.section === 'review' ? 'on' : ''}">${icon.cards}<span>${tr('nav.review')}</span>${due ? `<b class="badge">${due}</b>` : ''}</a>
      ${subject.hasQuestions ? `<a href="#/s/${subject.id}/practice" class="${r.section === 'practice' ? 'on' : ''}">${icon.check}<span>${tr('nav.practice')}</span></a>` : ''}
      ${subject.exam ? `<a href="#/s/${subject.id}/exam" class="${r.section === 'exam' ? 'on' : ''}">${icon.spark}<span>${tr('nav.exam')}</span></a>` : ''}
      <a href="#/s/${subject.id}/glossary" class="${r.section === 'glossary' ? 'on' : ''}">${icon.book}<span>${tr('nav.glossary')}</span></a>
      <a href="#/s/${subject.id}/sources" class="${r.section === 'sources' ? 'on' : ''}">${icon.quote}<span>${tr('nav.sources')}</span></a>
    </nav>` : '';

  header.innerHTML = `
    <div class="bar-inner">
      <a class="brand" href="#/"><span class="mark"></span><span>Learning</span></a>
      <div class="switcher">
        <button class="switch-btn" aria-haspopup="true">
          <span class="dot"></span><span class="switch-label">${subject ? esc(subject.title) : 'All subjects'}</span>${icon.chevron}
        </button>
        <div class="switch-menu" hidden>
          ${subjects.map(s => `<a href="#/s/${s.id}" style="--dot:${s.accent}"><span class="dot"></span><span><b>${esc(s.title)}</b><small>${esc(s.tagline)}</small></span></a>`).join('')}
          <a href="#/" class="all"><span>All subjects</span></a>
        </div>
      </div>
      ${nav}
      <div class="tools">
        <button class="de-toggle ${st.settings.german ? 'on' : ''}" title="${tr('de.toggle')}"><span>${altLabel(subject)}</span></button>
        <a class="tool-btn ${r.section === 'backup' ? 'on' : ''}" href="#/backup" title="Backup & settings">${icon.save}</a>
      </div>
    </div>`;

  const on = $(header, '.subnav a.on'), sn = $(header, '.subnav');
  if (on && sn) sn.scrollLeft = on.offsetLeft - (sn.clientWidth - on.offsetWidth) / 2;

  const btn = $(header, '.switch-btn');
  const menu = $(header, '.switch-menu');
  btn.onclick = e => { e.stopPropagation(); menu.hidden = !menu.hidden; };
  document.addEventListener('click', () => { menu.hidden = true; }, { once: true });
  $(header, '.de-toggle').onclick = () => {
    store.update(s => { s.settings.german = !s.settings.german; });
    applyGerman();
    renderHeader();
  };
}

function applyGerman() {
  document.body.classList.toggle('lang-de', !!store.get().settings.german);
}

// --- Popovers for glossary terms and footnotes (work in every view) ----------

let pop, popTimer;
function showPop(target, html) {
  clearTimeout(popTimer);
  pop ??= document.body.appendChild(el('<div class="popover" role="tooltip"></div>'));
  pop.innerHTML = html;
  pop.classList.add('show');
  const r = target.getBoundingClientRect();
  const pw = Math.min(340, window.innerWidth - 24);
  pop.style.width = pw + 'px';
  let left = Math.max(12, Math.min(r.left + r.width / 2 - pw / 2, window.innerWidth - pw - 12));
  pop.style.left = left + 'px';
  const below = r.bottom + 10;
  pop.style.top = (below + pop.offsetHeight > window.innerHeight - 8 ? r.top - pop.offsetHeight - 10 : below) + window.scrollY + 'px';
}
function hidePop() { popTimer = setTimeout(() => pop?.classList.remove('show'), 120); }

document.addEventListener('mouseover', e => {
  const subj = current.subject;
  if (!subj) return;
  const term = e.target.closest?.('.term');
  const fn = e.target.closest?.('.fn');
  const wl = e.target.closest?.('.wlink');
  if (e.target.closest?.('.popover')) { clearTimeout(popTimer); return; }
  if (wl) {
    const wiki = parseWikiSpec(wl.dataset.w, subj.lang || 'en');
    showPop(wl, `<div class="pop-head"><b>Wikipedia</b></div><div class="pop-wiki-row">${wikiLinks({ wiki }, { titles: true })}</div>`);
    return;
  }
  if (term) {
    const t = subj.glossary[term.dataset.term];
    if (!t) return;
    showPop(term, `
      <div class="pop-head"><b>${esc(t.term)}</b>${altName(t, subj) ? `<span class="pop-de">${altLabel(subj)} · ${esc(altName(t, subj))}</span>` : ''}</div>
      <div class="pop-body">${mdInline(t.short, { subject: subj })}</div>
      <div class="pop-foot"><span>${tr('pop.glossary')}</span>${t.wiki ? `<span class="pop-wiki">${wikiLinks(t)}</span>` : ''}</div>`);
  } else if (fn) {
    const s = subj.sources[fn.dataset.source];
    if (!s) return;
    showPop(fn, `<div class="pop-src">${sourceLine(s, { subject: subj })}</div>`);
  } else if (pop?.classList.contains('show')) hidePop();
});

document.addEventListener('click', e => {
  const fn = e.target.closest?.('.fn[data-fn]');
  if (fn) {
    const target = document.getElementById(`fn-${fn.dataset.source}`);
    target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    target?.classList.add('flash');
    setTimeout(() => target?.classList.remove('flash'), 1400);
  }
});

store.subscribe(() => { if (current.route) renderHeaderSoon(); });
let headerQueued = false;
function renderHeaderSoon() {
  if (headerQueued) return;
  headerQueued = true;
  requestAnimationFrame(() => { headerQueued = false; renderHeader(); });
}

app.innerHTML = `
  <svg width="0" height="0" style="position:absolute"><defs><linearGradient id="accentGrad" x1="0" x2="1" y1="0" y2="1">
    <stop offset="0" stop-color="#5b5bd6"/><stop offset="1" stop-color="#b14fd8"/></linearGradient></defs></svg>
  <header class="topbar"></header>
  <main></main>
  <footer class="foot"></footer>`;

applyGerman();
window.addEventListener('hashchange', route);
route();
