// Polite Wikipedia API client shared by the tools: unique user agent, honours Retry-After, backs off on 429/5xx.
const UA = { 'User-Agent': `learning-platform/0.1 (https://github.com/Sicaine/learning; pid ${process.pid})` };

export async function wikiQuery(lang, params) {
  const u = `https://${lang}.wikipedia.org/w/api.php?format=json&${params}`;
  let wait = 2000;
  for (let attempt = 0; attempt < 8; attempt++) {
    const res = await fetch(u, { headers: UA });
    if (res.ok) return res.json();
    if (res.status !== 429 && res.status < 500) throw new Error(`Wikipedia API ${lang}: HTTP ${res.status}`);
    const ra = Number(res.headers.get('retry-after'));
    await new Promise(s => setTimeout(s, Math.min(60000, (ra ? ra * 1000 : wait) + Math.random() * 1000)));
    wait *= 1.7;
  }
  throw new Error(`Wikipedia API unavailable (${lang}, rate limited) — wait a few minutes and rerun`);
}
