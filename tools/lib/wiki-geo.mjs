// Wikipedia geocoding helper: titles → { title, lat, lon } using the article's coordinates.
const UA = { 'User-Agent': 'learning-platform-dev/0.1 (personal project)' };

export async function geocode(titles, lang = 'de') {
  const out = {};
  for (let i = 0; i < titles.length; i += 40) {
    const chunk = titles.slice(i, i + 40);
    const u = `https://${lang}.wikipedia.org/w/api.php?action=query&format=json&redirects=1&prop=coordinates&colimit=max&coprimary=all&titles=${encodeURIComponent(chunk.join('|'))}`;
    let r;
    for (let attempt = 0; attempt < 4; attempt++) {
      const res = await fetch(u, { headers: UA });
      if (res.ok) { r = (await res.json()).query; break; }
      await new Promise(s => setTimeout(s, 1500 * (attempt + 1)));
    }
    if (!r) continue;
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
