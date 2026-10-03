// Wikipedia geocoding helper: titles → { title, lat, lon } using the article's coordinates.
import { wikiQuery } from './wiki-fetch.mjs';

export async function geocode(titles, lang = 'de') {
  const out = {};
  for (let i = 0; i < titles.length; i += 40) {
    const chunk = titles.slice(i, i + 40);
    const r = (await wikiQuery(lang, `action=query&redirects=1&prop=coordinates&colimit=max&coprimary=all&titles=${encodeURIComponent(chunk.join('|'))}`)).query;
    const back = {};
    for (const x of [...(r.normalized || []), ...(r.redirects || [])]) back[x.to] = x.from;
    const origin = t => { let o = t; while (back[o]) o = back[o]; return o; };
    for (const p of Object.values(r.pages)) {
      const c = p.coordinates?.find(x => x.primary !== undefined) || p.coordinates?.[0];
      if (!('missing' in p) && c) out[origin(p.title)] = { title: p.title, lat: c.lat, lon: c.lon };
    }
  }
  return out;
}
