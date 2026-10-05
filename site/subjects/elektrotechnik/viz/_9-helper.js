// Gemeinsame Kleinigkeiten der Etappe 9 (Signale und HF).
export const comma = (x, d = 1) => (Number.isFinite(x) ? x.toFixed(d).replace('.', ',').replace('-', '−') : '∞');
/** Dämpfungs-/Pegelzahl mit Vorzeichen-Minus und Komma. */
export const dB = (x, d = 1) => (Number.isFinite(x) ? comma(x, d) + ' dB' : '∞ dB');
/** Standard-Gaußzufall (Box-Muller) mit festem Seed (mulberry32). */
export function gauss(n, seed = 7) {
  let a = seed >>> 0;
  const rnd = () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const out = new Float64Array(n);
  for (let i = 0; i < n; i += 2) { const u = Math.max(rnd(), 1e-12), v = rnd(), r = Math.sqrt(-2 * Math.log(u)); out[i] = r * Math.cos(2 * Math.PI * v); if (i + 1 < n) out[i + 1] = r * Math.sin(2 * Math.PI * v); }
  return out;
}
