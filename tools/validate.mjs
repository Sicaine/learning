// Content validator: node tools/validate.mjs
// Checks every subject for broken glossary refs, unknown sources, missing
// lesson/viz files, duplicate ids and unknown block types.

import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'site');
const { subjects } = await import(join(root, 'subjects/index.js'));
const BLOCK_TYPES = new Set(['text', 'callout', 'figure', 'video', 'quiz', 'recall', 'numeric', 'order', 'match', 'viz', 'game']);
let errors = 0, warnings = 0;
const err = (m) => { errors++; console.log(`  ✗ ${m}`); };
const warn = (m) => { warnings++; console.log(`  ! ${m}`); };

for (const meta of subjects) {
  console.log(`\n${meta.id} — ${meta.title}`);
  const raw = (await meta.load()).default;
  const terms = new Map(), sources = new Map(), lessons = new Map();
  for (const t of raw.glossary.flat()) { if (terms.has(t.id)) err(`duplicate term ${t.id}`); terms.set(t.id, t); }
  for (const s of raw.sources.flat()) { if (sources.has(s.id)) err(`duplicate source ${s.id}`); sources.set(s.id, s); }
  for (const st of raw.stages) for (const l of st.lessons) { if (lessons.has(l.id)) err(`duplicate lesson ${l.id}`); lessons.set(l.id, l); }

  const usedTerms = new Set(), usedSources = new Set();
  const scan = (where, text) => {
    for (const m of text.matchAll(/\[\[([\w-]+)(?:\|[^\]]*)?\]\]/g)) { usedTerms.add(m[1]); if (!terms.has(m[1])) err(`${where}: unknown term [[${m[1]}]]`); }
    for (const m of text.matchAll(/\[\^([\w-]+)\]/g)) { usedSources.add(m[1]); if (!sources.has(m[1])) err(`${where}: unknown source [^${m[1]}]`); }
  };
  for (const t of terms.values()) {
    if (!t.term || !t.short) err(`term ${t.id}: needs term + short`);
    for (const r of t.related || []) if (!terms.has(r)) err(`term ${t.id}: related unknown "${r}"`);
    scan(`term ${t.id}`, JSON.stringify(t));
  }
  scan('subject intro', JSON.stringify({ a: raw.intro, b: raw.mission }));

  let ready = 0, cards = 0;
  for (const l of lessons.values()) {
    const file = join(root, 'subjects', meta.id, 'lessons', `${l.id}.js`);
    if (!l.ready) { if (existsSync(file)) warn(`lesson ${l.id}: file exists but ready:false`); continue; }
    if (!existsSync(file)) { err(`lesson ${l.id}: ready but ${file} missing`); continue; }
    ready++;
    const lesson = (await import(file)).default;
    if (lesson.id !== l.id) err(`lesson ${l.id}: id mismatch (${lesson.id})`);
    const ids = new Set();
    for (const b of lesson.blocks) {
      const w = `${l.id}/${b.id}`;
      if (!b.id) err(`${l.id}: block without id`);
      if (ids.has(b.id)) err(`${w}: duplicate block id`);
      ids.add(b.id);
      if (!BLOCK_TYPES.has(b.type)) err(`${w}: unknown block type "${b.type}"`);
      if ((b.type === 'viz' || b.type === 'game') && !existsSync(join(root, 'subjects', meta.id, 'viz', `${b.viz}.js`))) err(`${w}: viz file ${b.viz}.js missing`);
      if (b.type === 'quiz' && !b.options?.some(o => o.correct)) err(`${w}: quiz without correct option`);
      if (b.type === 'numeric' && typeof b.answer !== 'number') err(`${w}: numeric answer must be a number`);
      if (b.type === 'video' && !/^[\w-]{11}$/.test(b.youtube || '')) err(`${w}: bad youtube id`);
      for (const c of b.cards || []) if (!lesson.cards?.some(x => x.id === c)) err(`${w}: references unknown card "${c}"`);
    }
    const cids = new Set();
    for (const c of lesson.cards || []) { if (cids.has(c.id)) err(`${l.id}: duplicate card ${c.id}`); cids.add(c.id); cards++; }
    scan(l.id, JSON.stringify(lesson));
  }
  for (const s of sources.keys()) if (!usedSources.has(s)) warn(`source ${s} is never cited`);
  console.log(`  ${ready}/${lessons.size} lessons ready · ${terms.size} terms · ${sources.size} sources · ${cards} cards`);
}
console.log(`\n${errors} error(s), ${warnings} warning(s)`);
process.exit(errors ? 1 : 0);
