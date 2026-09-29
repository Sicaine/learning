// Verifies every Wikipedia title in the glossaries exists and is not a
// disambiguation page: node tools/check-wiki.mjs   (needs network)

import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'site');
const { subjects } = await import(join(root, 'subjects/index.js'));
const UA = { 'User-Agent': 'learning-platform-dev/0.1' };
let bad = 0;

for (const meta of subjects) {
  const raw = (await meta.load()).default;
  const byLang = { en: new Map(), de: new Map() };
  for (const t of raw.glossary.flat()) {
    const w = t.wiki || raw.wiki?.[t.id];
    for (const l of ['en', 'de']) if (w?.[l]) byLang[l].set(w[l].split('#')[0], t.id);
  }
  for (const [lang, titles] of Object.entries(byLang)) {
    const list = [...titles.keys()];
    for (let i = 0; i < list.length; i += 45) {
      const chunk = list.slice(i, i + 45);
      const u = `https://${lang}.wikipedia.org/w/api.php?action=query&format=json&redirects=1&prop=pageprops&ppprop=disambiguation&titles=${encodeURIComponent(chunk.join('|'))}`;
      const r = (await (await fetch(u, { headers: UA })).json()).query;
      const norm = Object.fromEntries([...(r.normalized || []), ...(r.redirects || [])].map(x => [x.from, x.to]));
      const pages = Object.values(r.pages);
      for (const title of chunk) {
        let t = title; while (norm[t]) t = norm[t];
        const p = pages.find(p => p.title === t);
        const problem = !p || 'missing' in p ? 'missing' : p.pageprops && 'disambiguation' in p.pageprops ? 'disambiguation page' : null;
        if (problem) { bad++; console.log(`✗ ${meta.id}/${titles.get(title)}: ${lang} "${title}" — ${problem}`); }
      }
    }
  }
  console.log(`${meta.id}: checked ${byLang.en.size} en + ${byLang.de.size} de titles`);
}
process.exit(bad ? 1 : 0);
