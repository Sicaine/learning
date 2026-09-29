import * as store from '../store.js';
import { subjects, loadSubject } from '../content.js';
import { subjectProgress, deckStats, nextLesson } from '../progress.js';
import { el, ring, icon } from '../ui.js';
import { esc } from '../markup.js';

export default async function home(main) {
  const st = store.get();
  const loaded = await Promise.all(subjects.map(s => loadSubject(s.id)));
  const lastSid = st.lastSubject;
  const last = loaded.find(s => s.id === lastSid);

  let resume = '';
  if (last) {
    const next = nextLesson(last);
    if (next) {
      const l = last.lessons[next.lid];
      resume = `
        <a class="resume" href="#/s/${last.id}/l/${l.id}" style="--accent:${last.accent};--accent-2:${last.accent2}">
          <span class="eyebrow">${next.resume ? 'Pick up where you left off' : 'Up next'} · ${esc(last.title)}</span>
          <span class="resume-title">${esc(l.title)}</span>
          <span class="resume-meta">${esc(l.stage.title)} · ${l.minutes || 15} min</span>
          <span class="resume-go">${icon.arrow}</span>
        </a>`;
    }
  }

  main.append(el(`
    <section class="home">
      <div class="hero">
        <h1 class="display">What are we <em>learning</em> today?</h1>
        <p class="lede">Deep, focused learning paths — explanations, visual experiments, recall practice and spaced repetition. Everything stays in your browser.</p>
      </div>
      ${resume}
      <div class="subject-grid">
        ${loaded.map(s => {
          const p = subjectProgress(s);
          const d = deckStats(s.id);
          return `
          <a class="subject-card" href="#/s/${s.id}" style="--accent:${s.accent};--accent-2:${s.accent2}">
            <div class="subject-art">${s.art || ''}</div>
            <div class="subject-body">
              <span class="eyebrow">${s.stages.length} stages · ${p.total} lesson${p.total === 1 ? '' : 's'}${p.planned ? ` · ${p.planned} planned` : ''}</span>
              <h2>${esc(s.title)}</h2>
              <p>${esc(s.tagline)}</p>
              <div class="subject-foot">
                <span class="ring-wrap">${ring(p.pct, 40, 4)}<b>${Math.round(p.pct * 100)}%</b></span>
                ${d.due ? `<span class="pill due">${icon.cards} ${d.due} cards due</span>` : d.total ? `<span class="pill">${icon.cards} ${d.total} cards</span>` : ''}
              </div>
            </div>
          </a>`;
        }).join('')}
      </div>
    </section>`));
}
