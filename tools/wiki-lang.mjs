// Finds the article title in the other language (via Wikipedia's interlanguage links) and checks the title exists.
//   node tools/wiki-lang.mjs "Cherusker" "Köln" "Limes"            German titles → prints   Cherusker|Cherusci
//   node tools/wiki-lang.mjs --en "Cherusci" "Cologne"              English titles → prints  Cherusci|Cherusker
// Output is the exact spec for [text](wiki:SPEC). "(no article)" means the title does not exist; "(no counterpart)" = only one language.

const UA = { 'User-Agent': `learning-platform/0.1 (https://github.com/Sicaine/learning; pid ${process.pid})` };
const args = process.argv.slice(2);
const from = args.includes('--en') ? 'en' : 'de', to = from === 'de' ? 'en' : 'de';
const titles = args.filter(a => !a.startsWith('--'));

async function query(lang, list) {
  const u = `https://${lang}.wikipedia.org/w/api.php?action=query&format=json&redirects=1&prop=langlinks|pageprops&ppprop=disambiguation&lllang=${to}&lllimit=max&titles=${encodeURIComponent(list.join('|'))}`;
  for (let i = 0; i < 5; i++) { const r = await fetch(u, { headers: UA }); if (r.ok) return (await r.json()).query; await new Promise(s => setTimeout(s, 1500 * (i + 1))); }
  throw new Error('Wikipedia API unavailable');
}

for (let i = 0; i < titles.length; i += 40) {
  const chunk = titles.slice(i, i + 40);
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
