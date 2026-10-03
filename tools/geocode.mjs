// Coordinates for places, straight from Wikipedia (primary article coordinates).
//   node tools/geocode.mjs "Kalkriese" "Xanten" "Teutoburger Wald"      (German Wikipedia)
//   node tools/geocode.mjs --en "Hadrian's Wall"                         (English Wikipedia)
// Prints ready-to-paste point snippets. Always sanity-check the result on the map.

import { geocode } from './lib/wiki-geo.mjs';

const args = process.argv.slice(2);
const lang = args.includes('--en') ? 'en' : 'de';
const titles = args.filter(a => !a.startsWith('--'));
if (!titles.length) { console.log('usage: node tools/geocode.mjs [--en] "Title" ...'); process.exit(1); }
const found = await geocode(titles, lang);
const missing = titles.filter(t => !found[t]);
if (missing.length) Object.assign(found, await geocode(missing, lang === 'de' ? 'en' : 'de'));  // fall back to the other language
for (const t of titles) {
  const r = found[t];
  if (!r) { console.log(`✗ ${t}: no coordinates on ${lang}.wikipedia.org (try the exact article title or --en)`); continue; }
  console.log(`{ lon: ${r.lon.toFixed(3)}, lat: ${r.lat.toFixed(3)}, label: '${t}' },   // ${r.title}`);
}
