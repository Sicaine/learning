// Question practice (Leitner boxes) and exam simulation logic. No DOM here except where noted.
// State: store.practice(sid)[qid] = { n, ok, last, box 1..5, due, res }, store.exams(sid), store.subject(sid).examRun.

import * as store from './store.js';
import { shuffle } from './ui.js';

const DAY = 86400000;
export const INTERVALS = [0, 1, 3, 7, 21];   // days until a question in box 1..5 is due again
export const MASTERED_BOX = 4;
export const SESSION_SIZE = 15;

export const rec = (sid, qid) => store.get().subjects[sid]?.practice?.[qid];

export function nextState(r, ok, now = Date.now()) {
  const box = ok ? Math.min(5, (r?.box || 1) + 1) : 1;
  return { n: (r?.n || 0) + 1, ok: (r?.ok || 0) + (ok ? 1 : 0), last: now, box, due: now + INTERVALS[box - 1] * DAY, res: ok };
}

// results: [[qid, ok], …] — one store write
export function recordMany(sid, results, now = Date.now()) {
  store.update(() => {
    const p = store.practice(sid);
    for (const [qid, ok] of results) p[qid] = nextState(p[qid], ok, now);
  });
}

export const isSeen = r => !!r;
export const isDue = (r, now = Date.now()) => !!r && r.due <= now;
export const isWeak = r => !!r && (r.res === false || r.box <= 2);
export const isMastered = r => !!r && r.box >= MASTERED_BOX && r.res !== false;

export function topicStats(subject, now = Date.now()) {
  const p = store.get().subjects[subject.id]?.practice || {};
  const mk = qs => {
    const o = { total: qs.length, seen: 0, mastered: 0, weak: 0, due: 0, fresh: 0, learning: 0, n: 0, ok: 0 };
    for (const q of qs) {
      const r = p[q.id];
      if (!r) { o.fresh++; continue; }
      o.seen++; o.n += r.n || 0; o.ok += r.ok || 0;
      if (isDue(r, now)) o.due++;
      if (isMastered(r)) o.mastered++; else if (isWeak(r)) o.weak++; else o.learning++;
    }
    return o;
  };
  return { all: mk(subject.questions), byTopic: Object.fromEntries(subject.qTopics.map(tp => [tp.id, mk(tp.questions)])),
    byPart: Object.fromEntries((subject.exam?.parts || []).map(pt => [pt.id, mk(pt.questions)])) };
}

// Practice queue. mode: topic id | 'all' | 'due' | 'new' | 'weak'.
export function buildQueue(subject, mode, now = Date.now(), size = SESSION_SIZE) {
  const p = store.get().subjects[subject.id]?.practice || {};
  if (mode === 'last') return lastMistakes(subject).slice(0, 50);
  let pool;
  if (subject.qTopicById[mode]) pool = subject.qTopicById[mode].questions;
  else if (mode.startsWith('part:')) pool = subject.exam?.parts.find(x => x.id === mode.slice(5))?.questions || [];
  else if (mode.startsWith('lesson:')) { pool = subject.questions.filter(q => q.lesson === mode.slice(7)); size = Math.max(size, 30); }
  else pool = subject.questions;
  const withR = pool.map(q => ({ q, r: p[q.id] }));
  const due = withR.filter(x => isDue(x.r, now)).sort((a, b) => a.r.box - b.r.box || a.r.due - b.r.due);
  const fresh = shuffle(withR.filter(x => !x.r));
  const rest = withR.filter(x => x.r && !isDue(x.r, now)).sort((a, b) => a.r.due - b.r.due);
  let list;
  if (mode === 'due') list = due;
  else if (mode === 'new') list = fresh;
  else if (mode === 'weak') list = withR.filter(x => isWeak(x.r)).sort((a, b) => (a.r.res === false ? 0 : 1) - (b.r.res === false ? 0 : 1) || a.r.box - b.r.box || a.r.due - b.r.due);
  else list = [...shuffleTies(due), ...fresh, ...rest];
  return list.slice(0, size).map(x => x.q);
}
function shuffleTies(arr) { return arr; }

// --- Runtime question: shuffled answers, correct one tracked -----------------

export function prepare(q) {
  const order = shuffle(q.answers.map((_, i) => i));
  return { qid: q.id, order, pick: null, flag: false };
}
// pick = displayed position; correct iff order[pick] === 0
export const isCorrect = it => it.pick != null && it.order[it.pick] === 0;

// --- Exam --------------------------------------------------------------------
// run = { startedAt, mode: 'full' | partId, segs: [{ parts: [ids], minutes, startedAt?, endedAt?, seconds? }], seg, items, cur, done }
// A segment is one timed block: one per part in a sequential exam (each part has its own timer), otherwise a single one.
// Between two segments the run waits (segs[seg].startedAt unset) until the learner continues; there is no way back.

// Points needed to pass a part (passCount, else passPercent), scaled when the pool is smaller than `count`.
export function need(p, total) {
  if (p.passCount != null) return total === p.count ? p.passCount : Math.ceil(p.passCount / p.count * total - 1e-9);
  return Math.ceil((p.passPercent ?? 50) / 100 * total - 1e-9);
}

// Take `count` questions from the part's topics, round-robin over topics so every topic is represented evenly.
export function composeExam(subject, partIds) {
  const items = [];
  for (const part of subject.exam.parts) {
    if (partIds && !partIds.includes(part.id)) continue;
    const pools = shuffle(part.topics.map(tp => shuffle(tp.questions)).filter(a => a.length));
    const total = pools.reduce((a, b) => a + b.length, 0);
    const want = Math.min(part.count || total, total);
    const picked = [];
    for (let i = 0; picked.length < want; i++) { const pool = pools[i % pools.length]; if (pool.length) picked.push(pool.pop()); }
    for (const q of shuffle(picked)) items.push({ ...prepare(q), part: part.id });
  }
  return items;
}

export function startExam(subject, mode = 'full') {
  const ex = subject.exam;
  const parts = mode === 'full' ? ex.parts : ex.parts.filter(p => p.id === mode);
  const segs = mode === 'full' && ex.sequential ? parts.map(p => ({ parts: [p.id], minutes: p.minutes }))
    : [{ parts: parts.map(p => p.id), minutes: mode === 'full' ? ex.minutes : parts[0].minutes }];
  const now = Date.now();
  segs[0].startedAt = now;
  const run = { startedAt: now, mode, segs, seg: 0, items: composeExam(subject, parts.map(p => p.id)), cur: 0, done: false };
  run.cur = segIdx(run)[0] ?? 0;
  store.update(() => { store.subject(subject.id).examRun = run; });
  return run;
}

export const segIdx = (run, k = run.seg) => { const ps = run.segs[k].parts, out = []; run.items.forEach((it, i) => { if (ps.includes(it.part)) out.push(i); }); return out; };
export const segWaiting = run => !run.done && !run.segs[run.seg].startedAt;
export const segDeadline = run => run.segs[run.seg].startedAt + run.segs[run.seg].minutes * 60000;
export const lastSeg = run => run.seg >= run.segs.length - 1;

export function beginSegment(run) {
  store.update(() => { run.segs[run.seg].startedAt = Date.now(); run.cur = segIdx(run)[0] ?? 0; });
}

// Ends the current segment. Returns true when the whole exam is finished (result saved).
export function endSegment(subject, run, now = Date.now()) {
  const sg = run.segs[run.seg];
  sg.endedAt = now;
  sg.seconds = Math.min(Math.round((now - sg.startedAt) / 1000), sg.minutes * 60);
  if (lastSeg(run)) { finishExam(subject, run, now); return true; }
  store.update(() => { run.seg++; });
  return false;
}

export function scoreExam(subject, run) {
  const present = new Set(run.items.map(i => i.part));
  const parts = {}, failed = [];
  for (const p of subject.exam.parts) if (present.has(p.id)) parts[p.id] = { ok: 0, total: 0 };
  for (const it of run.items) { const o = (parts[it.part] ??= { ok: 0, total: 0 }); o.total++; if (isCorrect(it)) o.ok++; }
  for (const p of subject.exam.parts) {
    const o = parts[p.id]; if (!o) continue;
    o.need = need(p, o.total);
    o.pct = o.total ? Math.round(o.ok / o.total * 100) : 0;
    o.passed = o.total > 0 && o.ok >= o.need;
    o.oral = !o.passed && p.oralFrom != null && o.ok >= p.oralFrom;
    if (!o.passed) failed.push(p.id);
  }
  const status = !failed.length ? 'passed' : failed.length === 1 && parts[failed[0]].oral ? 'oral' : 'failed';
  return { parts, passed: status === 'passed', status, failed };
}

// Finish: stores the result (last 20) and feeds every answer into the practice boxes.
export function finishExam(subject, run, now = Date.now()) {
  if (run.done) return run;
  const { parts, status } = scoreExam(subject, run);
  const seconds = (run.segs || []).reduce((a, s) => a + (s.seconds || 0), 0);
  run.done = true; run.finishedAt = now; run.seconds = seconds; run.passed = status === 'passed'; run.status = status;
  const entry = { at: now, mode: run.mode || 'full', parts: Object.fromEntries(Object.entries(parts).map(([k, v]) => [k, { ok: v.ok, total: v.total }])), passed: status === 'passed', status, seconds };
  store.update(() => {
    store.subject(subject.id).examRun = run;
    const ex = store.exams(subject.id);
    ex.push(entry);
    if (ex.length > 20) ex.splice(0, ex.length - 20);
    const p = store.practice(subject.id);
    for (const it of run.items) p[it.qid] = nextState(p[it.qid], isCorrect(it), now);
  });
  return run;
}

export function discardExam(sid) { store.update(() => { delete store.subject(sid).examRun; }); }
export const currentRun = sid => store.get().subjects[sid]?.examRun;
export const entryStatus = e => e.status ?? (e.passed ? 'passed' : 'failed');   // older entries only have `passed`

// Questions answered wrongly (or not at all) in the last finished exam.
export function lastMistakes(subject) {
  const run = currentRun(subject.id);
  if (!run?.done) return [];
  return run.items.filter(it => !isCorrect(it)).map(it => subject.qById[it.qid]).filter(Boolean);
}

export function fmtClock(sec) {
  sec = Math.max(0, Math.ceil(sec));
  const h = Math.floor(sec / 3600), m = Math.floor(sec % 3600 / 60), s = sec % 60;
  const mm = String(m).padStart(2, '0'), ss = String(s).padStart(2, '0');
  return h ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}
