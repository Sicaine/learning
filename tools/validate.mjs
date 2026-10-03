// Content validator: node tools/validate.mjs
// Checks every subject for broken glossary refs, unknown sources, missing
// lesson/viz files, duplicate ids and unknown block types.

import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'site');
const { subjects } = await import(join(root, 'subjects/index.js'));
const BLOCK_TYPES = new Set(['text', 'callout', 'figure', 'video', 'quiz', 'recall', 'numeric', 'order', 'match', 'viz', 'game', 'map']);
const geoDir = join(root, 'assets/data/geo');
const catalog = (await import(join(geoDir, 'catalog.js'))).default;
const gazetteer = (await import(join(geoDir, 'places.js'))).default;
const cityRows = [];
for (const lod of ['central', 'europe', 'world']) for (const c of (await import(join(geoDir, `${lod}.js`))).default.cities || []) cityRows.push(c);
globalThis.localStorage ??= { getItem: () => null, setItem() {} };
const VIEWS = (await import(join(root, 'assets/js/blocks/map.js')).catch(() => null))?.VIEWS || {};
const WIKI_RE = /\[([^\]]+)\]\(wiki:((?:[^()]|\([^()]*\))+)\)/g;
const km = (a, b) => { const r = Math.PI / 180, dx = (a[0] - b[0]) * r * Math.cos((a[1] + b[1]) / 2 * r), dy = (a[1] - b[1]) * r; return 6371 * Math.hypot(dx, dy); };
let errors = 0, warnings = 0;
const err = (m) => { errors++; console.log(`  ✗ ${m}`); };
const warn = (m) => { warnings++; console.log(`  ! ${m}`); };

function checkMap(w, b, meta) {
  const known = n => gazetteer.some(p => p[0] === n) || cityRows.some(c => c[0] === n);
  const bbox = Array.isArray(b.view) ? b.view : VIEWS[b.view];
  if (b.view && !bbox) err(`${w}: unknown map view "${b.view}" (presets: ${Object.keys(VIEWS).join(', ')})`);
  if (Array.isArray(b.view) && (b.view.length !== 4 || b.view[0] >= b.view[2] || b.view[1] >= b.view[3])) err(`${w}: view must be [lonMin, latMin, lonMax, latMax]`);
  const targets = [];
  for (const p of b.places || []) {
    const o = typeof p === 'string' ? { name: p } : p;
    if (!known(o.name) && !(o.lon != null && o.lat != null)) err(`${w}: unknown place "${o.name}" (not in gazetteer; use points with lon/lat from tools/geocode.mjs)`);
    targets.push(o.label || o.name);
  }
  for (const p of b.points || []) {
    if (typeof p.lon !== 'number' || typeof p.lat !== 'number' || Math.abs(p.lon) > 180 || Math.abs(p.lat) > 90) { err(`${w}: point "${p.label}" needs numeric lon/lat (lon first!)`); continue; }
    if (bbox && (p.lon < bbox[0] || p.lon > bbox[2] || p.lat < bbox[1] || p.lat > bbox[3])) warn(`${w}: point "${p.label}" lies outside the map view`);
    const ref = gazetteer.find(g => g[0] === p.label) || cityRows.find(c => c[0] === p.label);
    if (ref && km([p.lon, p.lat], [ref[1], ref[2]]) > 40) warn(`${w}: point "${p.label}" is ${Math.round(km([p.lon, p.lat], [ref[1], ref[2]]))} km from the gazetteer position — lon/lat swapped?`);
    if (!p.label) warn(`${w}: point without label`);
    targets.push(p.label);
  }
  for (const r of b.rivers || []) { const n = typeof r === 'string' ? r : r.name; if (!catalog.rivers.includes(n)) err(`${w}: unknown river "${n}" (see site/assets/data/geo/CATALOG.txt)`); }
  for (const h of b.highlight || []) {
    for (const c of h.countries || []) if (!catalog.countries.includes(c)) err(`${w}: unknown country "${c}" (German names, see CATALOG.txt)`);
    for (const c of h.states || []) if (!catalog.states.includes(c) && !catalog.states.some(x => x.replace('Freie Hansestadt ', '') === c)) err(`${w}: unknown state "${c}"`);
  }
  for (const l of [...(b.lines || []), ...(b.areas || [])]) {
    if (!Array.isArray(l.coords) || l.coords.length < 2 || l.coords.some(c => !Array.isArray(c) || typeof c[0] !== 'number' || Math.abs(c[0]) > 180 || Math.abs(c[1]) > 90)) err(`${w}: line/area "${l.label}" needs coords [[lon, lat], …]`);
  }
  for (const lsc of Array.isArray(b.landscapes) ? b.landscapes : []) if (!gazetteer.some(p => p[0] === lsc && p[3] === 'land')) err(`${w}: unknown landscape "${lsc}"`);
  if (b.quiz) {
    const n = targets.length + (b.rivers || []).filter(r => r.quiz).length + [...(b.lines || []), ...(b.areas || [])].filter(l => l.quiz).length + (b.highlight || []).filter(h => h.quiz).length;
    if (n < 3) err(`${w}: quiz map needs at least 3 targets (places/points/quiz rivers/lines/areas), has ${n}`);
  }
  if (!bbox && !(b.places?.length || b.points?.length || b.lines?.length || b.areas?.length)) err(`${w}: map without view and without anything to show`);
}

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
  for (const [id, w] of Object.entries(raw.wiki || {})) {
    if (!terms.has(id)) err(`wiki.js: unknown term "${id}"`);
    if (!w || !(w.en || w.de) || Object.keys(w).some(k => !['en', 'de'].includes(k))) err(`wiki.js: "${id}" needs { en?, de? } titles`);
  }
  scan('subject intro', JSON.stringify({ a: raw.intro, b: raw.mission }));

  let ready = 0, cards = 0; const wikiStats = [];
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
      if (b.type === 'map') checkMap(w, b, meta);
      if (b.type === 'quiz' && !b.options?.some(o => o.correct)) err(`${w}: quiz without correct option`);
      if (b.type === 'numeric' && typeof b.answer !== 'number') err(`${w}: numeric answer must be a number`);
      if (b.type === 'video' && !/^[\w-]{11}$/.test(b.youtube || '')) err(`${w}: bad youtube id`);
      for (const c of b.cards || []) if (!lesson.cards?.some(x => x.id === c)) err(`${w}: references unknown card "${c}"`);
    }
    const cids = new Set();
    for (const c of lesson.cards || []) { if (cids.has(c.id)) err(`${l.id}: duplicate card ${c.id}`); cids.add(c.id); cards++; }
    scan(l.id, JSON.stringify(lesson));
    const wikis = [...JSON.stringify(lesson).matchAll(WIKI_RE)];
    for (const m of wikis) if (!m[2].split('|')[0].trim()) err(`${l.id}: empty wiki title in link "${m[1]}"`);
    const mapCount = lesson.blocks.filter(b => b.type === 'map').length;
    wikiStats.push({ id: l.id, wikis: new Set(wikis.map(m => m[2].split('|')[0].trim())).size, maps: mapCount });
  }
  for (const s of sources.keys()) if (!usedSources.has(s)) warn(`source ${s} is never cited`);
  const MIN_WIKI = meta.id === 'vision' ? 4 : 8;
  for (const w of wikiStats) if (w.wikis < MIN_WIKI) warn(`lesson ${w.id}: only ${w.wikis} distinct inline Wikipedia links (aim for ${MIN_WIKI}+)`);
  console.log(`  maps: ${wikiStats.reduce((a, w) => a + w.maps, 0)} · inline wiki links: ${wikiStats.reduce((a, w) => a + w.wikis, 0)}`);
  console.log(`  ${ready}/${lessons.size} lessons ready · ${terms.size} terms (${[...terms.values()].filter(t => t.wiki || raw.wiki?.[t.id]).length} with Wikipedia) · ${sources.size} sources · ${cards} cards`);
}
console.log(`\n${errors} error(s), ${warnings} warning(s)`);
process.exit(errors ? 1 : 0);
