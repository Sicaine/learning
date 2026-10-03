// Map block: real geodata (Natural Earth, public domain), projection, pan/zoom,
// markers, routes, areas, labelled rivers and an optional "find it on the map" quiz.
// Block fields are documented in CLAUDE.md ("map" block). Data: assets/data/geo/*.js (tools/build-geo.mjs).

import { el, $, $$, icon, shuffle } from '../ui.js';
import { md, mdInline, esc } from '../markup.js';
import { t } from '../i18n.js';

const W = 1000;
const rad = Math.PI / 180;

export const VIEWS = {
  de: [5.4, 47.0, 15.6, 55.3],
  'de-west': [4.6, 47.4, 10.8, 52.9],
  'de-nord': [6.0, 51.8, 15.0, 55.2],
  'de-sued': [6.8, 46.9, 14.2, 50.6],
  'de-ost': [10.0, 49.8, 15.2, 55.2],
  rhein: [3.8, 46.8, 10.2, 53.0],
  'central-europe': [2.0, 43.0, 24.0, 56.0],
  europe: [-11.5, 34.0, 38.0, 66.0],
  mediterranean: [-10.0, 29.0, 40.0, 47.8],
  'near-east': [24.0, 22.0, 56.0, 42.0],
  atlantic: [-85.0, -10.0, 20.0, 60.0],
  asia: [25.0, -12.0, 150.0, 58.0],
  world: [-180, -58, 180, 84],
};

// ---------- projections ----------
function lcc(lonC, latC, p1, p2) {
  const f1 = p1 * rad, f2 = p2 * rad, f0 = latC * rad, l0 = lonC * rad;
  const n = Math.abs(f1 - f2) < 1e-9 ? Math.sin(f1) : Math.log(Math.cos(f1) / Math.cos(f2)) / Math.log(Math.tan(Math.PI / 4 + f2 / 2) / Math.tan(Math.PI / 4 + f1 / 2));
  const F = Math.cos(f1) * Math.pow(Math.tan(Math.PI / 4 + f1 / 2), n) / n;
  const rho0 = F / Math.pow(Math.tan(Math.PI / 4 + f0 / 2), n);
  return (lon, lat) => {
    const la = Math.max(-84, Math.min(84, lat)) * rad;
    const rho = F / Math.pow(Math.tan(Math.PI / 4 + la / 2), n), th = n * (lon * rad - l0);
    return [rho * Math.sin(th), rho * Math.cos(th) - rho0];
  };
}
function naturalEarth(lonC) {
  return (lon, lat) => {
    let l = (lon - lonC); if (l > 180) l -= 360; if (l < -180) l += 360;
    l *= rad; const p = lat * rad, p2 = p * p, p4 = p2 * p2;
    return [l * (0.8707 - 0.131979 * p2 + p4 * (-0.013791 + p4 * (0.003971 * p2 - 0.001529 * p4))),
      -p * (1.007226 + p2 * (0.015085 + p4 * (-0.044475 + 0.028874 * p2 - 0.005916 * p4)))];
  };
}

function makeView(bbox, kind) {
  const [x0, y0, x1, y1] = bbox;
  const lonSpan = x1 - x0, latSpan = y1 - y0;
  const world = kind === 'natural' || (!kind && lonSpan > 100);
  const project = world ? naturalEarth((x0 + x1) / 2) : lcc((x0 + x1) / 2, (y0 + y1) / 2, y0 + latSpan * 0.2, y1 - latSpan * 0.2);
  // Bounds of the bbox in projected space (sample its outline and a grid).
  let minX = 1e9, minY = 1e9, maxX = -1e9, maxY = -1e9;
  for (let i = 0; i <= 24; i++) for (let j = 0; j <= 24; j++) {
    if (i && i < 24 && j && j < 24) continue;
    const [px, py] = project(x0 + lonSpan * i / 24, y0 + latSpan * j / 24);
    minX = Math.min(minX, px); maxX = Math.max(maxX, px); minY = Math.min(minY, py); maxY = Math.max(maxY, py);
  }
  const pad = 10, rawW = maxX - minX, rawH = maxY - minY;
  let s = (W - 2 * pad) / rawW, H = rawH * s + 2 * pad;
  const maxH = W * 0.95, minH = W * 0.5;
  if (H > maxH) { s = (maxH - 2 * pad) / rawH; H = maxH; }
  if (H < minH) H = minH;
  const ox = (W - rawW * s) / 2 - minX * s, oy = (H - rawH * s) / 2 - minY * s;
  const to = (lon, lat) => { const [px, py] = project(lon, lat); return [px * s + ox, py * s + oy]; };
  to.wrap = world;
  return { to, H, scale: s, project, world, bbox };
}

// ---------- data ----------
const cache = {};
const load = name => (cache[name] ??= import(`../../data/geo/${name}.js`).then(m => m.default));

export async function lookupPlace(name) {
  const places = await load('places');
  const hit = places.find(p => p[0] === name);
  if (hit) return { lon: hit[1], lat: hit[2], kind: hit[3] };
  for (const lod of ['central', 'europe', 'world']) {
    const c = (await load(lod)).cities?.find(c => c[0] === name);
    if (c) return { lon: c[1], lat: c[2], kind: c[4] === 2 ? 'capital' : 'place' };
  }
  return null;
}

const within = (bb, [x0, y0, x1, y1], m = 0) => bb[0] >= x0 - m && bb[1] >= y0 - m && bb[2] <= x1 + m && bb[3] <= y1 + m;
// [name, lon, lat, max lon-span of the view in which the label is shown]
const STATES_EN = { Bayern: 'Bavaria', 'Baden-Württemberg': 'Baden-Württemberg', Hessen: 'Hesse', Niedersachsen: 'Lower Saxony', 'Nordrhein-Westfalen': 'North Rhine-Westphalia', 'Rheinland-Pfalz': 'Rhineland-Palatinate', Sachsen: 'Saxony', 'Sachsen-Anhalt': 'Saxony-Anhalt', Thüringen: 'Thuringia', 'Mecklenburg-Vorpommern': 'Mecklenburg-Vorpommern', 'Freie Hansestadt Bremen': 'Bremen' };
const SEAS_EN = { Nordsee: 'North Sea', Ostsee: 'Baltic Sea', Atlantik: 'Atlantic Ocean', Mittelmeer: 'Mediterranean Sea', 'Schwarzes Meer': 'Black Sea', Adria: 'Adriatic Sea', Ägäis: 'Aegean Sea', 'Tyrrhenisches Meer': 'Tyrrhenian Sea', 'Ionisches Meer': 'Ionian Sea', 'Kaspisches Meer': 'Caspian Sea', 'Rotes Meer': 'Red Sea', 'Persischer Golf': 'Persian Gulf', 'Golf von Biskaya': 'Bay of Biscay', Ärmelkanal: 'English Channel', Nordmeer: 'Norwegian Sea', Barentssee: 'Barents Sea', 'Weißes Meer': 'White Sea', 'Bottnischer Meerbusen': 'Gulf of Bothnia', 'Atlantischer Ozean': 'Atlantic Ocean', 'Pazifischer Ozean': 'Pacific Ocean', 'Indischer Ozean': 'Indian Ocean', 'Arktischer Ozean': 'Arctic Ocean', 'Karibisches Meer': 'Caribbean Sea', 'Golf von Mexiko': 'Gulf of Mexico', 'Arabisches Meer': 'Arabian Sea' };
const SEAS = [['Nordsee', 3.2, 55.8, 60], ['Ostsee', 19.5, 57.6, 60], ['Atlantik', -15, 46, 120], ['Mittelmeer', 17, 35.2], ['Schwarzes Meer', 34.5, 43.2, 100], ['Adria', 15.4, 43.1, 40], ['Ägäis', 25, 38.7, 40], ['Tyrrhenisches Meer', 12, 39.7, 40], ['Ionisches Meer', 18.6, 37.4, 40], ['Kaspisches Meer', 51, 41.5, 120], ['Rotes Meer', 38.5, 20.5, 120], ['Persischer Golf', 51.5, 27, 80], ['Golf von Biskaya', -4.5, 45.3, 60], ['Ärmelkanal', -1.5, 50.1, 40], ['Nordmeer', 2, 68, 80], ['Barentssee', 40, 73, 80], ['Weißes Meer', 38, 65.5, 60], ['Bottnischer Meerbusen', 20, 62.5, 40], ['Atlantischer Ozean', -35, 20], ['Atlantischer Ozean ', -22, -20], ['Pazifischer Ozean', -150, 5], ['Pazifischer Ozean ', 165, 15], ['Indischer Ozean', 80, -15], ['Arktischer Ozean', 0, 83], ['Karibisches Meer', -75, 15, 120], ['Golf von Mexiko', -90, 25, 120], ['Arabisches Meer', 65, 15, 130]];

// ---------- helpers ----------
const num = n => Math.round(n * 10) / 10;
// Features that straddle the seam of a world projection would be drawn as a line across the whole map:
// start a new sub-path whenever consecutive points jump by more than half the map width.
function subpaths(flat, to) {
  let d = '', px = null;
  for (let i = 0; i < flat.length; i += 2) {
    const [x, y] = to(flat[i], flat[i + 1]);
    d += (px === null || Math.abs(x - px) > W * 0.5 ? 'M' : 'L') + num(x) + ' ' + num(y);
    px = x;
  }
  return d;
}
const ringPath = (flat, to) => subpaths(flat, to) + 'Z';
const linePath = (flat, to) => subpaths(flat, to);
// Polygons entirely outside the (padded) view are skipped — this also keeps Antarctica from flooding world maps.
function ringBounds(flat) { let a = 1e9, b = 1e9, c = -1e9, d = -1e9; for (let i = 0; i < flat.length; i += 2) { a = Math.min(a, flat[i]); c = Math.max(c, flat[i]); b = Math.min(b, flat[i + 1]); d = Math.max(d, flat[i + 1]); } return [a, b, c, d]; }
const touches = (flat, v) => { const [a, b, c, d] = ringBounds(flat); return !(c < v[0] || a > v[2] || d < v[1] || b > v[3]); };
const polysPath = (polys, to, vis) => polys.filter(rings => !vis || touches(rings[0], vis)).map(rings => rings.map(r => ringPath(r, to)).join('')).join('');
function polysBox(polys, to) {
  let big = null, area = -1;
  for (const rings of polys) {
    const r = rings[0]; let a = 1e9, b = 1e9, c = -1e9, d = -1e9;
    for (let i = 0; i < r.length; i += 2) { const [x, y] = to(r[i], r[i + 1]); a = Math.min(a, x); c = Math.max(c, x); b = Math.min(b, y); d = Math.max(d, y); }
    const ar = (c - a) * (d - b); if (ar > area) { area = ar; big = [a, b, c, d]; }
  }
  return big;
}
const colorOf = (c, fallback) => c || fallback;
function plain(s) { return String(s).replace(/\[\[([\w-]+)(?:\|([^\]]+))?\]\]/g, (_, id, sh) => sh || id).replace(/\[\^[\w-]+\]/g, ''); }

// ---------- block ----------
export async function renderMap(b, ctx) {
  const quiz = !!b.quiz;
  const saved = ctx.task(b.id);

  // Resolve points: explicit + gazetteer names.
  const points = [];
  for (const pl of b.places || []) {
    const o = typeof pl === 'string' ? { name: pl } : pl;
    const f = await lookupPlace(o.name);
    if (!f) { console.warn(`[map ${b.id}] unknown place "${o.name}"`); continue; }
    points.push({ kind: f.kind === 'land' ? 'land' : f.kind, ...o, label: o.label || o.name, lon: o.lon ?? f.lon, lat: o.lat ?? f.lat });
  }
  for (const p of b.points || []) points.push({ kind: 'place', ...p });

  const lines = b.lines || [], areas = b.areas || [], highlight = b.highlight || [];
  const riverReqs = (b.rivers || []).map(r => typeof r === 'string' ? { name: r } : r);

  // View.
  let bbox = Array.isArray(b.view) ? b.view : VIEWS[b.view];
  if (!bbox) {
    const pts = [...points.map(p => [p.lon, p.lat]), ...lines.flatMap(l => l.coords), ...areas.flatMap(a => a.coords)];
    if (pts.length) {
      const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
      let [a, c, d, e] = [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
      const mx = Math.max((d - a) * 0.14, 1.6), my = Math.max((e - c) * 0.14, 1.1);
      bbox = [a - mx, c - my, d + mx, e + my];
    } else bbox = VIEWS.de;
  }
  const view = makeView(bbox, b.proj);
  const padLon = Math.max((bbox[2] - bbox[0]) * 0.35, 4), padLat = Math.max((bbox[3] - bbox[1]) * 0.35, 3);
  const vis = [bbox[0] - padLon, bbox[1] - padLat, bbox[2] + padLon, bbox[3] + padLat];
  const lang = ctx.subject?.lang || 'en';
  const names = lang === 'en' ? await load('names-en') : null;
  const nm = (k, n) => names?.[k]?.[n] ?? n;

  // Level of detail.
  const central = await load('central');
  const ctrBox = central.bbox;
  let lodName = within(bbox, ctrBox, 0.3) ? 'central' : within(bbox, [-25, 14, 66, 72]) ? 'europe' : 'world';
  const geo = await load(lodName);
  const needStates = (b.layers?.states ?? (lodName === 'central')) || highlight.some(h => h.states);
  const states = lodName === 'central' ? central.states : (needStates ? central.states : null);
  const layers = {
    countries: true, borders: true, states: lodName === 'central', stateLabels: false, rivers: true, riverLabels: false, lakes: true,
    mountains: lodName !== 'world', peaks: false, countryLabels: 'auto', seaLabels: true,
    cities: lodName === 'central' ? 'major' : lodName === 'europe' ? 'capitals' : false,
    ...(b.layers || {}),
  };
  const lonSpan = bbox[2] - bbox[0];
  const showCountryLabels = layers.countryLabels === 'auto' ? lonSpan > 7 : !!layers.countryLabels;

  // ----- markup -----
  const root = el(`
    <div class="${quiz ? 'task ' : ''}mp-block">
      ${quiz ? `<div class="task-head"><span class="task-kind">${t('kind.mapQuiz')}</span>${b.title ? `<h3>${esc(b.title)}</h3>` : ''}<span class="task-done ${saved.done ? 'on' : ''}">${icon.check}</span></div>`
        : b.title ? `<h3 class="viz-title">${esc(b.title)}</h3>` : ''}
      ${b.intro ? `<div class="prose">${md(b.intro, ctx)}</div>` : ''}
      <div class="mp-prompt" ${quiz ? '' : 'hidden'}></div>
      <div class="mp-wrap">
        <svg class="mp-svg" viewBox="0 0 ${W} ${num(view.H)}" role="img" aria-label="${esc(plain(b.title || 'Karte'))}">
          <rect class="mp-sea" width="${W}" height="${num(view.H)}"/>
          <g class="mp-view"></g>
        </svg>
        <div class="mp-ctl"><button data-z="in" aria-label="+">+</button><button data-z="out" aria-label="−">−</button><button data-z="reset" aria-label="Reset">⌂</button></div>
        <div class="mp-scale"></div>
        <div class="mp-tip" hidden></div>
        <div class="mp-hint">${t('map.hint')}</div>
      </div>
      <div class="mp-detail" hidden></div>
      <div class="mp-legend"></div>
      ${b.caption ? `<p class="viz-caption">${mdInline(b.caption, ctx)}</p>` : ''}
      <div class="mp-credit">${t('map.credit')}</div>
    </div>`);

  const svg = $(root, '.mp-svg'), vg = $(root, '.mp-view');
  const to = view.to;
  const parts = [];
  const hit = [];   // quiz targets: { id, name, kind, el }

  // Land & borders
  parts.push('<g class="mp-land">');
  for (const c of geo.countries) parts.push(`<path class="mp-country" data-name="${esc(nm('country', c.n))}" d="${polysPath(c.p, to, vis)}"/>`);
  parts.push('</g>');

  // Highlights (countries / states)
  const hlPaths = [];
  highlight.forEach((h, hi) => {
    const col = colorOf(h.color, ['#c2410c', '#2563eb', '#059669', '#9333ea', '#ca8a04'][hi % 5]);
    const ds = [];
    for (const n of h.countries || []) { const c = geo.countries.find(x => x.n === n) || (lodName !== 'central' ? null : null); if (c) ds.push(polysPath(c.p, to, vis)); else console.warn(`[map ${b.id}] unknown country "${n}" in this detail level`); }
    for (const n of h.states || []) { const s = states?.find(x => x.n === n || x.n.replace('Freie Hansestadt ', '') === n); if (s) ds.push(polysPath(s.p, to, vis)); else console.warn(`[map ${b.id}] unknown state "${n}"`); }
    if (ds.length) hlPaths.push(`<path class="mp-hl" data-q="hl${hi}" data-name="${esc(h.label || '')}" style="--c:${col}" d="${ds.join('')}"/>`);
    if (h.quiz && h.label) hit.push({ id: `hl${hi}`, name: h.label, kind: 'area' });
  });
  if (layers.states && states) parts.push(`<g class="mp-states">${states.map(s => `<path data-name="${esc(lang === 'en' ? (STATES_EN[s.n] || s.n) : s.n)}" d="${polysPath(s.p, to, vis)}"/>`).join('')}</g>`);
  parts.push(`<g class="mp-hls">${hlPaths.join('')}</g>`);
  if (layers.mountains && geo.mountains) parts.push(`<g class="mp-mount">${geo.mountains.map(m => `<path d="${polysPath(m.p, to, vis)}"/>`).join('')}</g>`);
  if (layers.lakes && geo.lakes) parts.push(`<g class="mp-lakes">${geo.lakes.map(l => `<path ${l.n ? `data-name="${esc(nm('lake', l.n))}"` : ''} d="${polysPath(l.p, to, vis)}"/>`).join('')}</g>`);

  // Rivers
  const wanted = new Map(riverReqs.map(r => [r.name, r]));
  const emphasised = [];
  if (layers.rivers) {
    const rv = [];
    for (const r of geo.rivers) {
      if (wanted.has(r.n)) continue;
      const cls = `i${r.i}`;
      rv.push(`<path class="mp-river ${cls}" data-name="${esc(nm('river', r.n))}" d="${r.l.map(l => linePath(l, to)).join('')}"/>`);
    }
    parts.push(`<g class="mp-rivers">${rv.join('')}</g>`);
  }
  riverReqs.forEach((rq, ri) => {
    const r = geo.rivers.find(x => x.n === rq.name);
    if (!r) { console.warn(`[map ${b.id}] unknown river "${rq.name}" (see assets/data/geo/CATALOG.txt)`); return; }
    const id = `rv-${b.id}-${ri}`;
    const longest = r.l.reduce((a, c) => (c.length > a.length ? c : a), r.l[0]);
    const pts = []; for (let i = 0; i < longest.length; i += 2) pts.push(to(longest[i], longest[i + 1]));
    if (pts[0][0] > pts[pts.length - 1][0]) pts.reverse();
    const d = pts.map(([x, y], i) => (i ? 'L' : 'M') + num(x) + ' ' + num(y)).join('');
    emphasised.push({ id, name: nm('river', r.n), rq, d, all: r.l.map(l => linePath(l, to)).join(''), col: rq.color });
    if (rq.quiz) hit.push({ id, name: nm('river', r.n), kind: 'line' });
  });
  parts.push(`<g class="mp-rivers-hi">${emphasised.map(e => `<path class="mp-river hi" data-q="${e.id}" data-name="${esc(e.name)}" style="${e.col ? `--c:${e.col}` : ''}" d="${e.all}"/><path class="mp-hitline" data-q="${e.id}" data-name="${esc(e.name)}" d="${e.all}"/><path id="${e.id}" d="${e.d}" fill="none" stroke="none"/>`).join('')}</g>`);

  // User areas
  const areaEls = areas.map((a, i) => {
    const col = colorOf(a.color, '#7c3aed');
    const d = a.coords.map(([x, y], j) => { const [px, py] = to(x, y); return (j ? 'L' : 'M') + num(px) + ' ' + num(py); }).join('') + 'Z';
    if (a.quiz && a.label) hit.push({ id: `ar${i}`, name: a.label, kind: 'area' });
    return `<path class="mp-area" data-q="ar${i}" data-name="${esc(a.label || '')}" style="--c:${col}" d="${d}"/>`;
  });
  parts.push(`<g class="mp-areas">${areaEls.join('')}</g>`);

  // User lines
  const lineLabels = [];  // { id, d, text, col, at }
  const lineEls = lines.map((l, i) => {
    const col = colorOf(l.color, i % 2 ? '#0d9488' : '#c2410c');
    let pts = l.coords.map(([x, y]) => to(x, y));
    const d = pts.map(([x, y], j) => (j ? 'L' : 'M') + num(x) + ' ' + num(y)).join('');
    if (pts[0][0] > pts[pts.length - 1][0]) pts = [...pts].reverse();
    const dl = pts.map(([x, y], j) => (j ? 'L' : 'M') + num(x) + ' ' + num(y)).join('');
    if (l.label) lineLabels.push({ id: `ln-${b.id}-${i}`, d: dl, text: l.label, col, at: l.labelAt ?? 0.5 });
    if (l.quiz && l.label) hit.push({ id: `ln${i}`, name: l.label, kind: 'line' });
    return `<path class="mp-line ${l.dashed ? 'dashed' : ''}" data-q="ln${i}" data-name="${esc(l.label || '')}" style="--c:${col};${l.width ? `--w:${l.width}px` : ''}" d="${d}"/>` +
      `<path class="mp-hitline" data-q="ln${i}" data-name="${esc(l.label || '')}" d="${d}"/>` +
      (l.label ? `<path id="ln-${b.id}-${i}" d="${dl}" fill="none" stroke="none"/>` : '');
  });
  parts.push(`<g class="mp-lines">${lineEls.join('')}</g>`);
  vg.innerHTML = parts.join('');

  // ----- labels (px-sized via CSS transform scale) -----
  const L = document.createElementNS('http://www.w3.org/2000/svg', 'g'); L.setAttribute('class', 'mp-labels'); vg.append(L);
  const addLabel = (x, y, text, cls, dx = 0, dy = 0, anchor = 'middle') => {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', 'mp-lg'); g.style.transform = `translate(${num(x)}px, ${num(y)}px) scale(calc(1 / var(--u) / var(--k)))`;
    g.innerHTML = `<text class="mp-t ${cls}" x="${dx}" y="${dy}" text-anchor="${anchor}">${esc(text)}</text>`;
    L.append(g); return g;
  };
  if (layers.seaLabels) for (const [n, lon, lat, maxSpan = 999] of SEAS) if (lonSpan <= maxSpan && lon > bbox[0] && lon < bbox[2] && lat > bbox[1] && lat < bbox[3]) { const [x, y] = to(lon, lat); if (x > 55 && x < W - 55 && y > 16 && y < view.H - 16) addLabel(x, y, lang === 'en' ? (SEAS_EN[n.trim()] || n.trim()) : n.trim(), 'sea'); }
  if (showCountryLabels) {
    // Greedy culling: biggest countries first; a label must fit inside its country and not overlap another label.
    const uEst = 0.7, placed = [], cand = [];
    for (const c of geo.countries) {
      if (!c.p.length || (b.layers?.countryLabels === undefined && lodName === 'world' && lonSpan > 100)) continue;
      const bb = polysBox(c.p, to); if (!bb) continue;
      const cx = (bb[0] + bb[2]) / 2, cy = (bb[1] + bb[3]) / 2;
      if (cx < 0 || cx > W || cy < 0 || cy > view.H) continue;
      cand.push({ c, cx, cy, wpx: (bb[2] - bb[0]) * uEst });
    }
    cand.sort((a, d) => d.wpx - a.wpx);
    for (const { c, cx, cy, wpx } of cand) {
      const w = c.n.length * 7.6 + 8, x = cx * uEst, y = cy * uEst;
      if (wpx < w * 0.75 || x - w / 2 < 6 || x + w / 2 > W * uEst - 6) continue;
      const box = [x - w / 2, y - 8, x + w / 2, y + 8];
      if (placed.some(o => !(box[2] < o[0] || box[0] > o[2] || box[3] < o[1] || box[1] > o[3]))) continue;
      placed.push(box);
      addLabel(cx, cy, nm('country', c.n).toUpperCase(), 'country');
    }
  }
  if (layers.states && layers.stateLabels && states) for (const s of states) { const bb = polysBox(s.p, to); if (bb) addLabel((bb[0] + bb[2]) / 2, (bb[1] + bb[3]) / 2, (lang === 'en' ? (STATES_EN[s.n] || s.n) : s.n).replace('Freie Hansestadt ', ''), 'state'); }
  if (layers.mountains && geo.mountains && b.layers?.mountainLabels !== false) for (const m of geo.mountains) { const bb = polysBox(m.p, to); if (bb && (bb[2] - bb[0]) > 24 && bb[2] > 0 && bb[0] < W) addLabel((bb[0] + bb[2]) / 2, (bb[1] + bb[3]) / 2, nm('range', m.n), 'range'); }
  if (b.landscapes) {
    const places = await load('places');
    const want = b.landscapes === true ? null : new Set(b.landscapes);
    for (const p of places) if (p[3] === 'land' && (want ? want.has(p[0]) : p[1] > bbox[0] && p[1] < bbox[2] && p[2] > bbox[1] && p[2] < bbox[3])) { const [x, y] = to(p[1], p[2]); addLabel(x, y, p[0], 'range'); }
  }
  // river & line labels along the path
  const tp = document.createElementNS('http://www.w3.org/2000/svg', 'g'); tp.setAttribute('class', 'mp-pathlabels'); vg.append(tp);
  const pathText = (id, text, cls, col, at = 0.5) => {
    const t_ = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    t_.setAttribute('class', `mp-pt ${cls}`); if (col) t_.style.setProperty('--c', col);
    t_.innerHTML = `<textPath href="#${id}" startOffset="${Math.round(at * 100)}%" text-anchor="middle">${esc(text)}</textPath>`; tp.append(t_);
  };
  emphasised.forEach(e => { if (e.rq.label !== false) pathText(e.id, e.rq.label || e.name, 'river', e.col, e.rq.labelAt ?? 0.5); });
  lineLabels.forEach(l => pathText(l.id, l.text, 'route', l.col, l.at));
  if (layers.riverLabels) for (const r of geo.rivers) if (r.i <= (layers.riverLabels === 'all' ? 2 : 1) && !wanted.has(r.n)) {
    const longest = r.l.reduce((a, c) => (c.length > a.length ? c : a), r.l[0]); if (longest.length < 8) continue;
    const pts = []; for (let i = 0; i < longest.length; i += 2) pts.push(to(longest[i], longest[i + 1]));
    if (pts[0][0] > pts[pts.length - 1][0]) pts.reverse();
    const id = `rl-${b.id}-${r.n.replace(/\W/g, '')}`;
    const p = document.createElementNS('http://www.w3.org/2000/svg', 'path'); p.setAttribute('id', id); p.setAttribute('fill', 'none'); p.setAttribute('d', pts.map(([x, y], i) => (i ? 'L' : 'M') + num(x) + ' ' + num(y)).join('')); tp.append(p);
    pathText(id, nm('river', r.n), 'river faint');
  }

  // Cities (zoom-dependent, collision-culled)
  const cg = document.createElementNS('http://www.w3.org/2000/svg', 'g'); cg.setAttribute('class', 'mp-cities'); vg.append(cg);
  const cityList = (geo.cities || []).filter(c => layers.cities === 'all' || (layers.cities === 'capitals' ? c[4] >= 1 && (c[4] === 2 || lodName === 'central') : layers.cities === 'major' ? c[3] >= 250 || c[4] >= 1 : false))
    .map(c => ({ n: nm('city', c[0]), pop: c[3], cap: c[4], xy: to(c[1], c[2]) })).filter(c => c.xy[0] > -5 && c.xy[0] < W + 5 && c.xy[1] > -5 && c.xy[1] < view.H + 5)
    .sort((a, b) => (b.cap === 2) - (a.cap === 2) || b.pop - a.pop);

  // Markers
  const pg = document.createElementNS('http://www.w3.org/2000/svg', 'g'); pg.setAttribute('class', 'mp-points'); vg.append(pg);
  const pointEls = points.map((p, i) => {
    const [x, y] = to(p.lon, p.lat);
    const col = colorOf(p.color, '#be123c');
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', `mp-pt-g k-${p.kind}`); g.dataset.q = `pt${i}`; g.dataset.name = p.label || '';
    g.style.transform = `translate(${num(x)}px, ${num(y)}px) scale(calc(1 / var(--u) / var(--k)))`; g.style.setProperty('--c', col);
    const shape = p.num != null ? `<circle r="11" class="mk"/><text class="mk-n" text-anchor="middle" dy="4">${esc(p.num)}</text>`
      : p.kind === 'site' ? '<rect x="-6" y="-6" width="12" height="12" transform="rotate(45)" class="mk"/>'
      : p.kind === 'battle' ? '<g class="mk-x"><path d="M-6 -6L6 6M6 -6L-6 6"/></g>'
      : p.kind === 'peak' ? '<path d="M-7 5L0 -7L7 5Z" class="mk"/>'
      : p.kind === 'capital' ? '<circle r="5.5" class="mk"/><circle r="2" fill="#fff"/>'
      : p.kind === 'land' ? '' : '<circle r="5.5" class="mk"/>';
    const pos = p.pos || 'r';
    const [lx, ly, an] = { r: [11, 4, 'start'], l: [-11, 4, 'end'], t: [0, -11, 'middle'], b: [0, 21, 'middle'] }[pos] || [11, 4, 'start'];
    const off = p.num != null ? 6 : 0;
    g.innerHTML = `<circle r="16" class="hit"/>${shape}${p.label ? `<text class="mp-t pt ${p.kind === 'land' ? 'range' : ''}" x="${lx + (pos === 'r' ? off : pos === 'l' ? -off : 0)}" y="${ly}" text-anchor="${an}">${esc(p.label)}</text>` : ''}`;
    pg.append(g);
    if (quiz && p.quiz !== false && p.label) hit.push({ id: `pt${i}`, name: p.label, kind: 'point' });
    return { g, p, xy: [x, y] };
  });

  // Arrowheads (screen-sized, rotated along the last segment)
  lines.forEach((l, i) => {
    if (!l.arrow || l.coords.length < 2) return;
    const a = to(...l.coords[l.coords.length - 2]), c = to(...l.coords[l.coords.length - 1]);
    const ang = Math.atan2(c[1] - a[1], c[0] - a[0]) * 180 / Math.PI;
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', 'mp-arrow'); g.style.setProperty('--c', colorOf(l.color, i % 2 ? '#0d9488' : '#c2410c'));
    g.style.transform = `translate(${num(c[0])}px, ${num(c[1])}px) rotate(${num(ang)}deg) scale(calc(1 / var(--u) / var(--k)))`;
    g.innerHTML = '<path d="M-11 -6.5L2 0L-11 6.5z"/>'; pg.append(g);
  });

  // ----- zoom / pan -----
  let k = 1, tx = 0, ty = 0, u = 1;
  const clamp = () => { tx = Math.min(0, Math.max(W - W * k, tx)); ty = Math.min(0, Math.max(view.H - view.H * k, ty)); };
  const apply = () => {
    clamp(); vg.setAttribute('transform', `translate(${num(tx)} ${num(ty)}) scale(${k})`);
    svg.classList.toggle('zoomed', k > 1.001);
    svg.style.setProperty('--k', k); layoutCities(); scaleBar();
  };
  const measure = () => { u = svg.clientWidth / W || 1; svg.style.setProperty('--u', u); };
  const ro = new ResizeObserver(() => { measure(); apply(); });

  function layoutCities() {
    cg.innerHTML = '';
    if (!cityList.length) return;
    const boxes = pointEls.map(({ xy, p }) => { const sx = (xy[0] * k + tx) * u, sy = (xy[1] * k + ty) * u; return [sx - 12, sy - 12, sx + 12 + (p.label ? (p.label.length * 6.4 + 16) : 0), sy + 12]; });
    const cap = Math.round(10 * k * k) + (layers.cities === 'all' ? 25 : 0);
    let shown = 0;
    for (const c of cityList) {
      const sx = (c.xy[0] * k + tx) * u, sy = (c.xy[1] * k + ty) * u;
      if (sx < 0 || sx > W * u || sy < 0 || sy > view.H * u) continue;
      const w = c.n.length * 6.2 + 6, bx = [sx + 3, sy - 8, sx + 3 + w, sy + 8];
      if (boxes.some(o => !(bx[2] < o[0] || bx[0] > o[2] || bx[3] < o[1] || bx[1] > o[3]))) continue;
      if (shown >= cap && c.cap !== 2) continue;
      boxes.push(bx); shown++;
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('class', 'mp-lg'); g.style.transform = `translate(${num(c.xy[0])}px, ${num(c.xy[1])}px) scale(calc(1 / var(--u) / var(--k)))`;
      g.innerHTML = `<circle r="${c.cap === 2 ? 3.4 : 2.4}" class="city ${c.cap === 2 ? 'cap' : ''}"/><text class="mp-t city" x="5" y="4">${esc(c.n)}</text>`;
      cg.append(g);
    }
  }
  function scaleBar() {
    // Kilometres per CSS pixel at the view centre.
    const [cx, cy] = [(bbox[0] + bbox[2]) / 2, (bbox[1] + bbox[3]) / 2];
    const a = to(cx, cy), c = to(cx + 1, cy);
    const pxPerDeg = Math.hypot(c[0] - a[0], c[1] - a[1]) * k * u, kmPerDeg = 111.32 * Math.cos(cy * rad);
    const kmPerPx = kmPerDeg / pxPerDeg;
    const nice = [1, 2, 5, 10, 20, 50, 100, 200, 250, 500, 1000, 2000, 5000].filter(n => n / kmPerPx >= 50 && n / kmPerPx <= 140)[0] || 100;
    $(root, '.mp-scale').innerHTML = `<span style="width:${Math.round(nice / kmPerPx)}px"></span>${nice} km`;
  }
  const zoomAt = (nk, cx, cy) => { nk = Math.max(1, Math.min(10, nk)); const px = (cx - tx) / k, py = (cy - ty) / k; k = nk; tx = cx - px * k; ty = cy - py * k; apply(); };
  const toUser = e => { const r = svg.getBoundingClientRect(); return [(e.clientX - r.left) / u, (e.clientY - r.top) / u]; };
  $(root, '.mp-ctl').addEventListener('click', e => {
    const z = e.target.closest('[data-z]')?.dataset.z; if (!z) return;
    if (z === 'reset') { k = 1; tx = ty = 0; apply(); } else zoomAt(k * (z === 'in' ? 1.6 : 1 / 1.6), W / 2, view.H / 2);
  });
  svg.addEventListener('wheel', e => { if (!(e.ctrlKey || e.metaKey)) return; e.preventDefault(); const [cx, cy] = toUser(e); zoomAt(k * (e.deltaY < 0 ? 1.25 : 0.8), cx, cy); }, { passive: false });
  svg.addEventListener('dblclick', e => { const [cx, cy] = toUser(e); zoomAt(k * 1.8, cx, cy); });

  const ptrs = new Map(); let drag = null, moved = false, pinch = null;
  svg.addEventListener('pointerdown', e => {
    ptrs.set(e.pointerId, [e.clientX, e.clientY]); svg.setPointerCapture(e.pointerId); moved = false;
    if (ptrs.size === 1) drag = { x: e.clientX, y: e.clientY, tx, ty };
    if (ptrs.size === 2) { const [a, c] = [...ptrs.values()]; pinch = { d: Math.hypot(a[0] - c[0], a[1] - c[1]), k }; }
  });
  svg.addEventListener('pointermove', e => {
    if (!ptrs.has(e.pointerId)) { hover(e); return; }
    ptrs.set(e.pointerId, [e.clientX, e.clientY]);
    if (ptrs.size === 2 && pinch) { const [a, c] = [...ptrs.values()]; const d = Math.hypot(a[0] - c[0], a[1] - c[1]); const r = svg.getBoundingClientRect(); zoomAt(pinch.k * d / pinch.d, ((a[0] + c[0]) / 2 - r.left) / u, ((a[1] + c[1]) / 2 - r.top) / u); moved = true; return; }
    if (drag && k > 1) { const dx = e.clientX - drag.x, dy = e.clientY - drag.y; if (Math.abs(dx) + Math.abs(dy) > 4) moved = true; if (moved) { tx = drag.tx + dx / u; ty = drag.ty + dy / u; apply(); } }
  });
  const end = e => { ptrs.delete(e.pointerId); if (ptrs.size < 2) pinch = null; if (!ptrs.size) drag = null; };
  svg.addEventListener('pointerup', e => { end(e); if (!moved) click(e); });
  svg.addEventListener('pointercancel', end);
  svg.addEventListener('pointerleave', () => { $(root, '.mp-tip').hidden = true; });

  // Focus (animate to a bbox given in lon/lat)
  function focus(lon0, lat0, lon1, lat1) {
    const [x0, y0] = to(lon0, lat1), [x1, y1] = to(lon1, lat0);
    const w = Math.max(30, Math.abs(x1 - x0)), h = Math.max(30, Math.abs(y1 - y0));
    const nk = Math.max(1, Math.min(8, 0.8 * Math.min(W / w, view.H / h)));
    const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, ntx = W / 2 - cx * nk, nty = view.H / 2 - cy * nk;
    const sk = k, stx = tx, sty = ty, t0 = performance.now();
    const step = now => { const f = Math.min(1, (now - t0) / 350), e = f < .5 ? 2 * f * f : 1 - Math.pow(-2 * f + 2, 2) / 2; k = sk + (nk - sk) * e; tx = stx + (ntx - stx) * e; ty = sty + (nty - sty) * e; apply(); if (f < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }

  // ----- tooltip & detail -----
  const tip = $(root, '.mp-tip'), detail = $(root, '.mp-detail');
  function hover(e) {
    const tgt = e.target.closest?.('[data-name]');
    const name = tgt?.dataset.name;
    if (!name || (quiz && !qState.done && !qState.revealed.has(tgt.dataset.q))) { tip.hidden = true; return; }
    const box = $(root, '.mp-wrap').getBoundingClientRect();
    tip.hidden = false; tip.textContent = name; tip.style.left = (e.clientX - box.left) + 'px'; tip.style.top = (e.clientY - box.top) + 'px';
  }
  function showDetail(p) {
    if (!p.detail && !p.label) { detail.hidden = true; return; }
    detail.hidden = false;
    const body = p.detail ? md(p.detail, ctx) : '';
    const probe = document.createElement('div'); probe.innerHTML = body;
    const dup = p.label && probe.textContent.trim().toLowerCase().startsWith(p.label.toLowerCase());   // detail already starts with the name
    detail.innerHTML = `${dup ? '' : `<b>${esc(p.label || '')}</b>`}${body ? `<div class="prose small">${body}</div>` : ''}`;
  }

  // ----- legend -----
  const legend = [];
  lines.forEach((l, i) => l.label && legend.push({ col: colorOf(l.color, i % 2 ? '#0d9488' : '#c2410c'), label: l.label, kind: 'line', bb: bboxOf(l.coords) }));
  areas.forEach((a, i) => a.label && legend.push({ col: colorOf(a.color, '#7c3aed'), label: a.label, kind: 'area', bb: bboxOf(a.coords) }));
  highlight.forEach((h, i) => h.label && legend.push({ col: colorOf(h.color, ['#c2410c', '#2563eb', '#059669', '#9333ea', '#ca8a04'][i % 5]), label: h.label, kind: 'area' }));
  function bboxOf(c) { const xs = c.map(p => p[0]), ys = c.map(p => p[1]); return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)]; }
  if (legend.length && !quiz) {
    $(root, '.mp-legend').innerHTML = legend.map((l, i) => `<button class="mp-lg-item" data-i="${i}"><span class="sw ${l.kind}" style="--c:${l.col}"></span>${esc(l.label)}</button>`).join('');
    $(root, '.mp-legend').addEventListener('click', e => { const it = e.target.closest('.mp-lg-item'); if (it && legend[+it.dataset.i].bb) focus(...legend[+it.dataset.i].bb); });
  }

  // ----- quiz -----
  const qState = { done: !!saved.done, revealed: new Set(), mistakes: 0, tries: 0, i: 0, items: [] };
  const prompt = $(root, '.mp-prompt');
  function qNext() {
    $$(root, '.mp-wrap .flash, .mp-wrap .pulse').forEach(n => n.classList.remove('flash', 'pulse'));
    if (qState.i >= qState.items.length) {
      qState.done = true;
      prompt.innerHTML = `<b class="good">${t('map.done')}</b> — ${qState.mistakes ? t('map.mistakes', { n: qState.mistakes }) : t('map.flawless')} <button class="btn small ghost mp-again">${t('map.again')}</button>`;
      $(root, '.task-done')?.classList.add('on'); root.classList.add('solved');
      if (!ctx.task(b.id).done) ctx.done(b.id, { mistakes: qState.mistakes });
      $(root, '.mp-again').onclick = startQuiz;
      return;
    }
    qState.tries = 0;
    prompt.innerHTML = `<span class="mp-q-n">${qState.i + 1}/${qState.items.length}</span> ${t('map.find', { n: `<b>${esc(qState.items[qState.i].name)}</b>` })}`;
  }
  function startQuiz() {
    qState.done = false; qState.revealed = new Set(); qState.mistakes = 0; qState.i = 0;
    root.classList.add('quizzing'); $$(root, '.mp-wrap .found').forEach(n => n.classList.remove('found'));
    $$(root, '.mp-lg-hidden').forEach(n => n.classList.remove('mp-lg-hidden'));
    qState.items = shuffle(hit).slice(0, b.quiz?.rounds || 12);
    // hide target labels until found
    root.querySelectorAll('.mp-pt-g .mp-t').forEach(n => n.classList.add('mp-lg-hidden'));
    tp.querySelectorAll('.mp-pt').forEach(n => n.classList.add('mp-lg-hidden'));
    qNext();
  }
  function click(e) {
    const tgt = e.target.closest?.('[data-q]');
    if (!quiz) {
      const pt = tgt && /^pt\d+$/.test(tgt.dataset.q) ? pointEls[+tgt.dataset.q.slice(2)] : null;
      if (pt) showDetail(pt.p); else if (tgt?.dataset.q?.startsWith('ln')) { const l = lines[+tgt.dataset.q.slice(2)]; if (l?.detail || l?.label) showDetail(l); } else if (!tgt) detail.hidden = true;
      return;
    }
    if (qState.done || !qState.items.length) return;
    const goal = qState.items[qState.i];
    const els = $$(root, `[data-q="${goal.id}"]`);
    if (tgt && tgt.dataset.q === goal.id) {
      qState.revealed.add(goal.id);
      els.forEach(n => n.classList.add('found', 'flash'));
      root.querySelectorAll(`[data-q="${goal.id}"] .mp-t`).forEach(n => n.classList.remove('mp-lg-hidden'));
      tp.querySelectorAll('.mp-pt').forEach(n => { if (n.textContent === goal.name) n.classList.remove('mp-lg-hidden'); });
      qState.i++; setTimeout(qNext, 650);
    } else {
      qState.mistakes++; qState.tries++;
      const said = tgt?.dataset.name;
      prompt.innerHTML = `<span class="mp-q-n">${qState.i + 1}/${qState.items.length}</span> ${t('map.find', { n: `<b>${esc(goal.name)}</b>` })} <span class="bad">${said ? t('map.wrong', { n: esc(said) }) : t('map.miss')}</span>`;
      if (qState.tries >= 2) els.forEach(n => n.classList.add('pulse'));
    }
  }
  if (quiz) { if (saved.done) { prompt.innerHTML = `<b class="good">${t('map.done')}</b> <button class="btn small ghost mp-again">${t('map.again')}</button>`; $(root, '.mp-again').onclick = startQuiz; root.classList.add('solved'); } else startQuiz(); }

  // mount
  requestAnimationFrame(() => { measure(); apply(); ro.observe(svg); });
  return root;
}
