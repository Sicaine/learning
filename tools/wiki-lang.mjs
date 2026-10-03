// Finds the article title in the other language (via Wikipedia's interlanguage links) and checks the title exists.
//   node tools/wiki-lang.mjs "Cherusker" "Köln" "Limes"            German titles → prints   Cherusker|Cherusci
//   node tools/wiki-lang.mjs --en "Cherusci" "Cologne"              English titles → prints  Cherusci|Cherusker
// Output is the exact spec for [text](wiki:SPEC). "(no article)" means the title does not exist; "(no counterpart)" = only one language.

import { wikiQuery } from './lib/wiki-fetch.mjs';
const args = process.argv.slice(2);
const from = args.includes('--en') ? 'en' : 'de', to = from === 'de' ? 'en' : 'de';
const titles = args.filter(a => !a.startsWith('--'));

async function query(lang, list) {
  return (await wikiQuery(lang, `action=query&redirects=1&prop=langlinks|pageprops&ppprop=disambiguation&lllang=${to}&lllimit=max&titles=${encodeURIComponent(list.join('|'))}`)).query;
}

for (let i = 0; i < titles.length; i += 50) {
  const chunk = titles.slice(i, i + 50);
  const r = await query(from, chunk);
  const norm = Object.fromEntries([...(r.normalized || []), ...(r.redirects || [])].map(x => [x.from, x.to]));
  const pages = Object.values(r.pages);
  for (const t of chunk) {
    let n = t; while (norm[n]) n = norm[n];
    const p = pages.find(p => p.title === n);
    if (!p || 'missing' in p) { console.log(`✗ ${t}  (no article)`); continue; }
    if (p.pageprops && 'disambiguation' in p.pageprops) { console.log(`✗ ${t}  (disambiguation page — pick a specific article)`); continue; }
    const other = p.langlinks?.[0]?.['*'];
    console.log(other ? `${t}|${other}${n !== t ? `      (redirects to "${n}")` : ''}` : `${t}      (no counterpart in ${to})`);
  }
}
