// Loads subject content (see CLAUDE.md for the content model) and normalizes it
// into lookup maps. Also validates cross-references so content mistakes show up
// in the console instead of silently.

import { subjects } from '../../subjects/index.js';

const cache = new Map();
const lessonCache = new Map();

export { subjects };

export function subjectMeta(id) { return subjects.find(s => s.id === id); }

export async function loadSubject(id) {
  if (cache.has(id)) return cache.get(id);
  const meta = subjectMeta(id);
  if (!meta) throw new Error(`Unknown subject "${id}"`);
  const raw = (await meta.load()).default;

  const glossary = {};
  for (const t of raw.glossary.flat()) {
    if (glossary[t.id]) console.warn(`[content:${id}] duplicate term "${t.id}"`);
    glossary[t.id] = t;
    t.wiki ??= raw.wiki?.[t.id];
  }
  const sources = {};
  for (const s of raw.sources.flat()) {
    if (sources[s.id]) console.warn(`[content:${id}] duplicate source "${s.id}"`);
    sources[s.id] = s;
  }
  const lessons = {};
  const order = [];
  raw.stages.forEach((stage, si) => {
    stage.index = si;
    for (const l of stage.lessons) {
      if (lessons[l.id]) console.warn(`[content:${id}] duplicate lesson "${l.id}"`);
      lessons[l.id] = { ...l, stage };
      if (l.ready) order.push(l.id);
    }
  });
  for (const t of Object.values(glossary)) {
    for (const r of t.related || []) if (!glossary[r]) console.warn(`[content:${id}] term "${t.id}" relates to unknown "${r}"`);
  }

  const qa = normalizeQuestions(id, raw, lessons);

  const subject = { ...meta, ...raw, glossary, sources, lessons, order, ...qa };
  cache.set(id, subject);
  return subject;
}

// Question catalogue + exam format (see CLAUDE.md "Exam & practice"). A subject without
// `questions` gets hasQuestions=false and no extra menu entries.
function normalizeQuestions(id, raw, lessons) {
  const questions = (raw.questions || []).flat();
  const qById = {};
  const warn = m => console.warn(`[content:${id}] ${m}`);
  const ex = raw.exam && Array.isArray(raw.exam.parts) ? raw.exam : null;
  const sequential = !!ex && ex.parts.length > 0 && ex.parts.every(p => p.minutes > 0);   // every part has its own timer
  const totalCount = ex ? ex.parts.reduce((a, p) => a + (p.count || 0), 0) || 1 : 1;
  const parts = ex ? ex.parts.map(p => ({
    ...p,
    minutes: p.minutes || Math.round((ex.minutes || 90) * (p.count || 1) / totalCount) || 1,
    passPercent: p.passPercent ?? (p.passCount != null && p.count ? p.passCount / p.count * 100 : 50),
  })) : [];
  const partById = Object.fromEntries(parts.map(p => [p.id, p]));
  const topics = (ex?.topics || []).map(tp => ({ ...tp, questions: [] }));
  const topicById = Object.fromEntries(topics.map(tp => [tp.id, tp]));
  for (const q of questions) {   // one pass, no per-topic filtering
    if (!q.id) { warn('question without id'); continue; }
    if (qById[q.id]) warn(`duplicate question "${q.id}"`);
    qById[q.id] = q;
    if (!Array.isArray(q.answers) || q.answers.length !== 4) warn(`question "${q.id}" needs exactly 4 answers`);
    if (q.lesson && !lessons[q.lesson]) warn(`question "${q.id}" links unknown lesson "${q.lesson}"`);
    let tp = topicById[q.topic];
    if (!tp) {
      if (ex) warn(`question "${q.id}" has unknown topic "${q.topic}"`);
      tp = { id: q.topic ?? '-', title: q.topic ?? '-', questions: [] }; topics.push(tp); topicById[tp.id] = tp;   // no exam topics → derive
    }
    tp.questions.push(q);
  }
  for (const tp of topics) tp.partObj = partById[tp.part];
  for (const p of parts) { p.topics = topics.filter(tp => tp.part === p.id); p.questions = p.topics.flatMap(tp => tp.questions); }
  const hasQuestions = questions.length > 0;
  const exam = ex && hasQuestions ? { ...ex, parts, topics, sequential, minutes: ex.minutes || parts.reduce((a, p) => a + p.minutes, 0) } : null;
  return { questions, qById, qTopics: topics.filter(tp => tp.questions.length || ex), qTopicById: topicById, hasQuestions, exam };
}

export async function loadLesson(subject, lid) {
  const key = `${subject.id}/${lid}`;
  if (lessonCache.has(key)) return lessonCache.get(key);
  const mod = await import(`../../subjects/${subject.id}/lessons/${lid}.js`);
  const lesson = mod.default;
  const seen = new Set();
  for (const b of lesson.blocks) {
    if (!b.id) console.warn(`[content:${key}] block without id`, b);
    if (seen.has(b.id)) console.warn(`[content:${key}] duplicate block id "${b.id}"`);
    seen.add(b.id);
  }
  lessonCache.set(key, lesson);
  return lesson;
}

export async function loadAllLessons(subject) {
  return Promise.all(subject.order.map(lid => loadLesson(subject, lid).catch(e => {
    console.warn(`[content] could not load lesson ${lid}`, e); return null;
  })));
}

// Blocks that count as a task (they have a "done" state).
const TASK_TYPES = new Set(['video', 'quiz', 'recall', 'numeric', 'order', 'match', 'viz', 'game']);
export function tasksOf(lesson) {
  return lesson.blocks.filter(b => (TASK_TYPES.has(b.type) && !(b.type === 'viz' && !b.task)) || (b.type === 'map' && b.quiz));
}

export function cardKey(lid, cid) { return `${lid}:${cid}`; }

// Which lessons mention a term (for glossary cross-references). Scans source text.
export async function termUsage(subject) {
  if (subject._usage) return subject._usage;
  const usage = {};
  const lessons = await loadAllLessons(subject);
  for (const l of lessons) {
    if (!l) continue;
    const text = JSON.stringify(l);
    for (const m of text.matchAll(/\[\[([\w-]+)/g)) {
      (usage[m[1]] ??= new Set()).add(l.id);
    }
  }
  subject._usage = usage;
  return usage;
}
