// Derived progress numbers. State only stores facts (tasks done, lesson complete,
// card schedule); everything here is computed from that.

import * as store from './store.js';
import { tasksOf, cardKey } from './content.js';
import { newCard, isDue } from './srs.js';

export function lessonProgress(sid, lesson) {
  const ls = store.lesson(sid, lesson.id);
  const tasks = tasksOf(lesson);
  const done = tasks.filter(t => ls.tasks[t.id]?.done).length;
  return { done, total: tasks.length, complete: ls.complete, pct: ls.complete ? 1 : tasks.length ? done / tasks.length : 0 };
}

// Coarse status without loading lesson content.
export function lessonStatus(sid, lid) {
  const ls = store.get().subjects[sid]?.lessons?.[lid];
  if (!ls) return 'new';
  if (ls.complete) return 'complete';
  return Object.keys(ls.tasks || {}).length || ls.visited ? 'started' : 'new';
}

export function subjectProgress(subject) {
  const ready = subject.order;
  const complete = ready.filter(lid => lessonStatus(subject.id, lid) === 'complete').length;
  const planned = Object.values(subject.lessons).filter(l => !l.ready).length;
  return { complete, total: ready.length, planned, pct: ready.length ? complete / ready.length : 0 };
}

export function stageProgress(sid, stage) {
  const ready = stage.lessons.filter(l => l.ready);
  const complete = ready.filter(l => lessonStatus(sid, l.id) === 'complete').length;
  return { complete, total: ready.length, pct: ready.length ? complete / ready.length : 0 };
}

export function deckStats(sid, now = Date.now()) {
  const cards = Object.values(store.get().subjects[sid]?.cards || {});
  return {
    total: cards.length,
    due: cards.filter(c => isDue(c, now)).length,
    learned: cards.filter(c => c.interval >= 21).length,
  };
}

export function markTask(sid, lid, tid, data = {}) {
  store.update(() => {
    const ls = store.lesson(sid, lid);
    ls.tasks[tid] = { ...(ls.tasks[tid] || {}), ...data, done: true, at: Date.now() };
  });
}

export function saveTaskData(sid, lid, tid, data) {
  store.update(() => {
    const ls = store.lesson(sid, lid);
    ls.tasks[tid] = { ...(ls.tasks[tid] || {}), ...data };
  });
}

// Completing a lesson adds its cards to the deck. Returns number of new cards.
export function completeLesson(sid, lesson) {
  let added = 0;
  store.update(() => {
    const ls = store.lesson(sid, lesson.id);
    ls.complete = true;
    ls.completedAt ??= Date.now();
    added = addCards(sid, lesson, (lesson.cards || []).map(c => c.id));
  });
  return added;
}

export function addCards(sid, lesson, ids) {
  const deck = store.subject(sid).cards;
  let added = 0;
  for (const cid of ids) {
    const k = cardKey(lesson.id, cid);
    if (!deck[k]) { deck[k] = newCard(); added++; }
  }
  return added;
}

export function reopenLesson(sid, lid) {
  store.update(() => { store.lesson(sid, lid).complete = false; });
}

export function touch(sid, lid, blockId) {
  const st = store.get();
  st.lastSubject = sid;
  const s = store.subject(sid);
  s.last = { lessonId: lid, blockId, at: Date.now() };
  store.lesson(sid, lid).visited = true;
  store.save();
}

// Next lesson to work on: last touched if unfinished, otherwise first unfinished in order.
export function nextLesson(subject) {
  const last = store.get().subjects[subject.id]?.last;
  if (last && subject.lessons[last.lessonId]?.ready && lessonStatus(subject.id, last.lessonId) !== 'complete') {
    return { lid: last.lessonId, resume: true };
  }
  const lid = subject.order.find(id => lessonStatus(subject.id, id) !== 'complete');
  return lid ? { lid, resume: false } : null;
}
