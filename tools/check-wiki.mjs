// Verifies Wikipedia titles exist and are not disambiguation pages (needs network).
//   node tools/check-wiki.mjs                       all subjects: glossary wiki titles + inline [..](wiki:..) links
//   node tools/check-wiki.mjs wissen                one subject
//   node tools/check-wiki.mjs wissen roemer-germanen reformation    only these lessons (inline links + the glossary terms they use)

import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'site');
const { subjects } = await import(join(root, 'subjects/index.js'));
const UA = { 'User-Agent': `learning-platform/0.1 (https://github.com/Sicaine/learning; pid ${process.pid})` };
const [onlySubject, ...onlyLessons] = process.argv.slice(2);
const WIKI_RE = /\[([^\]]+)\]\(wiki:((?:[^()]|\([^()]*\))+)\)/g;

async function api(lang, titles) {
  const u = `https://${lang}.wikipedia.org/w/api.php?action=query&format=json&redirects=1&prop=pageprops&ppprop=disambiguation&titles=${encodeURIComponent(titles.join('|'))}`;
  for (let attempt = 0; attempt < 5; attempt++) {
    const res = await fetch(u, { headers: UA });
    if (res.ok) return (await res.json()).query;
    await new Promise(s => setTimeout(s, 1500 * (attempt + 1)));
  }
  throw new Error(`Wikipedia API unavailable (${lang})`);
}

let bad = 0;
for (const meta of subjects) {
  if (onlySubject && meta.id !== onlySubject) continue;
  const raw = (await meta.load()).default;
  const lang = meta.lang || 'en';
  const want = { en: new Map(), de: new Map() };   // title → where
  const add = (l, title, where) => { if (title) { const t = title.split('#')[0]; if (!want[l].has(t)) want[l].set(t, where); } };

  const terms = new Map(raw.glossary.flat().map(t => [t.id, { ...t, wiki: t.wiki || raw.wiki?.[t.id] }]));
  const lessonFiles = [];
  for (const st of raw.stages) for (const l of st.lessons) if (l.ready && (!onlyLessons.length || onlyLessons.includes(l.id))) lessonFiles.push(l.id);

  const usedTerms = new Set();
  for (const lid of lessonFiles) {
    const file = join(root, 'subjects', meta.id, 'lessons', `${lid}.js`);
    if (!existsSync(file)) continue;
    const text = JSON.stringify((await import(file)).default);
    for (const m of text.matchAll(/\[\[([\w-]+)/g)) usedTerms.add(m[1]);
    for (const m of text.matchAll(WIKI_RE)) {
      const [a, b] = m[2].split('|').map(s => s.trim());
      add(lang, a, `${lid}: [${m[1]}]`); add(lang === 'de' ? 'en' : 'de', b, `${lid}: [${m[1]}] (other language)`);
    }
  }
  for (const [id, t] of terms) if ((!onlyLessons.length || usedTerms.has(id)) && t.wiki) { add('en', t.wiki.en, `term ${id}`); add('de', t.wiki.de, `term ${id}`); }

  for (const l of ['en', 'de']) {
    const list = [...want[l].keys()];
    for (let i = 0; i < list.length; i += 40) {
      const chunk = list.slice(i, i + 40);
      const r = await api(l, chunk);
      const norm = Object.fromEntries([...(r.normalized || []), ...(r.redirects || [])].map(x => [x.from, x.to]));
      const pages = Object.values(r.pages);
      for (const title of chunk) {
        let t = title; while (norm[t]) t = norm[t];
        const p = pages.find(p => p.title === t);
        const problem = !p || 'missing' in p ? 'missing' : p.pageprops && 'disambiguation' in p.pageprops ? 'disambiguation page' : null;
        if (problem) { bad++; console.log(`✗ ${meta.id} ${l}.wikipedia "${title}" — ${problem}  (${want[l].get(title)})`); }
      }
    }
  }
  console.log(`${meta.id}: checked ${want.en.size} en + ${want.de.size} de titles`);
}
console.log(bad ? `${bad} problem(s)` : 'all titles ok');
process.exit(bad ? 1 : 0);
