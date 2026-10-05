// vizkit/si.js — SI-Einheiten, E-Reihen, Widerstands-Farbcode, dB-Helfer, Slider-Mapping.
// Reines ES-Modul ohne Abhängigkeiten (Browser + Node).
//
//   fmt(4700, 'Ω')            → "4,7 kΩ"          parse('4k7') → 4700
//   eNearest(5000, 'E12')     → 4700              colorCode(4700) → [gelb, violett, rot, gold]
//   dbV(10) → 20                                  sliderToValue(0.5, 10, 1e5, 'log') → 1000

// ── Formatierung ─────────────────────────────────────────────────────────────
const CFG = { comma: true };
/** Globale Einstellung: si.config({ comma: false }) für Dezimalpunkt. */
export function config(o) { Object.assign(CFG, o); return CFG; }

const PRE = [[12, 'T'], [9, 'G'], [6, 'M'], [3, 'k'], [0, ''], [-3, 'm'], [-6, 'µ'], [-9, 'n'], [-12, 'p'], [-15, 'f']];
const NOPREFIX = new Set(['°', '%', 'dB', 'dBm', 'dBW', 'dBµV', '°C', '×', 'x', 'Np']);
const MINUS = '−', NBSP = ' ';

/**
 * Zahl mit SI-Vorsatz formatieren.
 * @param {number} value
 * @param {string} [unit]   z. B. 'Ω', 'F', 'Hz'
 * @param {number|object} [digits=3]  signifikante Stellen, oder Optionsobjekt
 *   opts: { digits, comma (Dezimalkomma), prefix: 'k' (erzwingen), sign: true ('+' bei positiv), plain: true (kein Leerzeichen) }
 */
export function fmt(value, unit = '', digits = 3) {
  const o = typeof digits === 'object' ? digits : { digits };
  const d = o.digits ?? 3;
  const comma = o.comma ?? CFG.comma;
  if (value == null || Number.isNaN(value)) return '–';
  if (!Number.isFinite(value)) return (value < 0 ? MINUS : '') + '∞' + (unit ? NBSP + unit : '');
  const neg = value < 0;
  let a = Math.abs(value), pre = '', scaled = a;
  if (a !== 0 && !NOPREFIX.has(unit)) {
    let e = Math.floor(Math.log10(a) / 3) * 3;
    if (o.prefix != null) { const f = PRE.find(p => p[1] === o.prefix); e = f ? f[0] : e; }
    e = Math.max(-15, Math.min(12, e));
    scaled = a / 10 ** e;
    // Rundung kann 999,6 → 1000 ergeben: Vorsatz hochschalten
    if (o.prefix == null && +scaled.toPrecision(d) >= 1000 && e < 12) { e += 3; scaled = a / 10 ** e; }
    pre = PRE.find(p => p[0] === e)[1];
  }
  let s = a === 0 ? '0' : String(+scaled.toPrecision(d));
  if (/e/.test(s)) s = (+scaled.toPrecision(d)).toFixed(Math.max(0, d - 1));
  if (comma) s = s.replace('.', ',');
  const sgn = neg && +s.replace(',', '.') !== 0 ? MINUS : (o.sign && value > 0 ? '+' : '');
  const tail = pre + unit;
  return sgn + s + (tail ? (o.plain || unit === '°' || unit === '%' && false ? '' : NBSP) + tail : '');
}

const PMAP = { T: 1e12, G: 1e9, M: 1e6, k: 1e3, K: 1e3, m: 1e-3, u: 1e-6, 'µ': 1e-6, 'μ': 1e-6, n: 1e-9, p: 1e-12, f: 1e-15 };

/**
 * Text → Zahl. "4k7" → 4700, "2u2" → 2.2e-6, "10 nF" → 1e-8, "1,5 kΩ", "1e3", "4R7" → 4.7, "2.2Meg".
 * Gibt NaN zurück, wenn nichts erkannt wird.
 */
export function parse(str) {
  if (typeof str === 'number') return str;
  let s = String(str ?? '').trim().replace(MINUS, '-').replace(/ /g, ' ');
  if (!s) return NaN;
  // RKM-Code: 4k7, 2u2, 4R7, 1M5
  let m = s.match(/^(-?)(\d+)([RrKkMGTmuµμnpf])(\d+)\s*[a-zA-ZΩµμ°%]*$/);
  if (m) {
    const mult = m[3] === 'R' || m[3] === 'r' ? 1 : PMAP[m[3]];
    return (m[1] ? -1 : 1) * parseFloat(m[2] + '.' + m[4]) * mult;
  }
  m = s.match(/^([+-]?)\s*(\d*[.,]?\d+|\d+[.,])(?:[eE]([+-]?\d+))?\s*([^\d\s].*)?$/);
  if (!m) return NaN;
  let v = parseFloat(m[2].replace(',', '.'));
  if (m[3]) v *= 10 ** +m[3];
  if (m[1] === '-') v = -v;
  const rest = (m[4] || '').trim();
  if (rest) {
    if (/^meg/i.test(rest)) v *= 1e6;
    else if (rest.length === 1 && PMAP[rest] && !/^[KT]$/.test(rest) || rest.length > 1 && PMAP[rest[0]] && rest[0] !== 'K' && !/^(min|mil|ms$)/i.test(rest) || rest === 'K') v *= PMAP[rest[0]];
  }
  return v;
}

// ── E-Reihen ─────────────────────────────────────────────────────────────────
const E_TAB = {
  E3: [1.0, 2.2, 4.7],
  E6: [1.0, 1.5, 2.2, 3.3, 4.7, 6.8],
  E12: [1.0, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2],
  E24: [1.0, 1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2.0, 2.2, 2.4, 2.7, 3.0, 3.3, 3.6, 3.9, 4.3, 4.7, 5.1, 5.6, 6.2, 6.8, 7.5, 8.2, 9.1],
};
const E_N = { E48: 48, E96: 96 };
/** Mantissen einer Reihe (1.0 … 9.x). E48/E96 per Formel gerundet (auf wenige Ausnahmen exakt). */
export function eMantissas(series = 'E12') {
  if (E_TAB[series]) return E_TAB[series];
  const n = E_N[series];
  if (!n) throw new Error('Unbekannte E-Reihe: ' + series);
  return (E_TAB[series] = Array.from({ length: n }, (_, i) => +(10 ** (i / n)).toFixed(2)));
}
/** Alle Normwerte von lo bis hi, z. B. eSeries('E12', 100, 10e3). */
export function eSeries(series = 'E12', lo = 1, hi = 10) {
  const man = eMantissas(series), out = [];
  for (let dec = Math.floor(Math.log10(lo)) - 1; dec <= Math.ceil(Math.log10(hi)); dec++)
    for (const m of man) { const v = +(m * 10 ** dec).toPrecision(6); if (v >= lo * (1 - 1e-9) && v <= hi * (1 + 1e-9)) out.push(v); }
  return out;
}
/** Nächster Normwert (logarithmisch gemessen). dir: 0 nächster, 1 aufwärts (≥), -1 abwärts (≤). */
export function eNearest(value, series = 'E12', dir = 0) {
  if (!(value > 0)) return value;
  const man = eMantissas(series);
  const dec = Math.floor(Math.log10(value));
  let best = null, bd = Infinity;
  for (let k = dec - 1; k <= dec + 1; k++) for (const m of man) {
    const v = +(m * 10 ** k).toPrecision(6);
    if (dir > 0 && v < value * (1 - 1e-9)) continue;
    if (dir < 0 && v > value * (1 + 1e-9)) continue;
    const d = Math.abs(Math.log(v / value));
    if (d < bd) { bd = d; best = v; }
  }
  return best;
}
export const snapE = (value, series = 'E12') => eNearest(value, series);
/** Normwert-Nachbar: eStep(4700, 'E12', +1) → 5600. */
export function eStep(value, series = 'E12', n = 1) {
  let v = eNearest(value, series);
  for (let i = 0; i < Math.abs(n); i++) v = eNearest(v * (n > 0 ? 1.0001 : 0.9999), series, n > 0 ? 1 : -1);
  return v;
}
/** Abweichung in % vom nächsten Normwert. */
export const eError = (value, series = 'E12') => (eNearest(value, series) / value - 1) * 100;

// ── Widerstands-Farbcode ─────────────────────────────────────────────────────
export const COLORS = [
  { digit: 0, name: 'schwarz', en: 'black', hex: '#1a1a1a', mult: 1 },
  { digit: 1, name: 'braun', en: 'brown', hex: '#8b5a2b', mult: 10, tol: 1 },
  { digit: 2, name: 'rot', en: 'red', hex: '#d63a32', mult: 100, tol: 2 },
  { digit: 3, name: 'orange', en: 'orange', hex: '#f08a24', mult: 1e3 },
  { digit: 4, name: 'gelb', en: 'yellow', hex: '#f2cb2e', mult: 1e4 },
  { digit: 5, name: 'grün', en: 'green', hex: '#2f9e5b', mult: 1e5, tol: 0.5 },
  { digit: 6, name: 'blau', en: 'blue', hex: '#2f6fd0', mult: 1e6, tol: 0.25 },
  { digit: 7, name: 'violett', en: 'violet', hex: '#8a47c6', mult: 1e7, tol: 0.1 },
  { digit: 8, name: 'grau', en: 'grey', hex: '#8a8a96', mult: 1e8, tol: 0.05 },
  { digit: 9, name: 'weiß', en: 'white', hex: '#f6f6f8', mult: 1e9 },
  { digit: null, name: 'gold', en: 'gold', hex: '#c9a227', mult: 0.1, tol: 5 },
  { digit: null, name: 'silber', en: 'silver', hex: '#b4b8c0', mult: 0.01, tol: 10 },
];
const byName = n => COLORS.find(c => c.name === n || c.en === n);
/**
 * Wert → Ringe. bands: 4 (2 Ziffern) oder 5 (3 Ziffern), tol in % (Standard 5 → gold, 1 → braun).
 * Rückgabe: Array aus { name, en, hex, role: 'digit'|'mult'|'tol' }.
 */
export function colorCode(value, { bands = 4, tol = bands === 5 ? 1 : 5 } = {}) {
  if (!(value > 0)) return [];
  const nd = bands - 2;
  let e = Math.floor(Math.log10(value)) - (nd - 1);
  let mant = Math.round(value / 10 ** e);
  if (mant >= 10 ** nd) { mant = Math.round(mant / 10); e++; }
  const digits = String(mant).padStart(nd, '0').split('').map(Number);
  const out = digits.map(d => ({ ...COLORS[d], role: 'digit' }));
  const mc = COLORS.find(c => c.mult != null && Math.abs(Math.log10(c.mult) - e) < 1e-9);
  if (!mc) throw new Error('Wert außerhalb des Farbcode-Bereichs');
  out.push({ ...mc, role: 'mult' });
  const tc = COLORS.find(c => c.tol === tol);
  out.push({ ...(tc || COLORS[10]), role: 'tol' });
  return out;
}
/** Ringe (Namen deutsch/englisch) → { value, tol }. ['gelb','violett','rot','gold'] → { value: 4700, tol: 5 } */
export function fromColorCode(names) {
  const c = names.map(n => byName(String(n).toLowerCase()));
  if (c.some(x => !x)) return null;
  const nd = c.length - 2;
  let m = 0;
  for (let i = 0; i < nd; i++) { if (c[i].digit == null) return null; m = m * 10 + c[i].digit; }
  return { value: +(m * c[nd].mult).toPrecision(6), tol: c[nd + 1].tol ?? 20 };
}

// ── dB ───────────────────────────────────────────────────────────────────────
export const dbV = r => 20 * Math.log10(r);         // Spannungs-/Stromverhältnis → dB
export const dbP = r => 10 * Math.log10(r);         // Leistungsverhältnis → dB
export const fromDbV = d => 10 ** (d / 20);
export const fromDbP = d => 10 ** (d / 10);
export const wattToDbm = w => 10 * Math.log10(w / 1e-3);
export const dbmToWatt = d => 1e-3 * 10 ** (d / 10);
/** dBµV an 50 Ω ↔ dBm: dBm = dBµV − 107 */
export const dbuvToDbm = d => d - 107;

// ── Slider-Mapping ───────────────────────────────────────────────────────────
/** t ∈ [0,1] → Wert; scale: 'lin' | 'log' */
export function sliderToValue(t, min, max, scale = 'lin') {
  t = Math.min(1, Math.max(0, t));
  return scale === 'log' ? min * (max / min) ** t : min + (max - min) * t;
}
export function valueToSlider(v, min, max, scale = 'lin') {
  const t = scale === 'log' ? Math.log(v / min) / Math.log(max / min) : (v - min) / (max - min);
  return Math.min(1, Math.max(0, t));
}

// ── Sonstiges ────────────────────────────────────────────────────────────────
export const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
export const linspace = (a, b, n) => Array.from({ length: n }, (_, i) => n === 1 ? a : a + (b - a) * i / (n - 1));
export const logspace = (a, b, n) => Array.from({ length: n }, (_, i) => n === 1 ? a : a * (b / a) ** (i / (n - 1)));
export const omega = f => 2 * Math.PI * f;
/** Resonanzfrequenz LC: 1/(2π√(LC)) */
export const lcFreq = (L, C) => 1 / (2 * Math.PI * Math.sqrt(L * C));
export const deg = rad => rad * 180 / Math.PI;
export const rad = d => d * Math.PI / 180;

/** 1-2-5-Folge von min bis max (für Zeit/Div, Volt/Div): seq125(1e-6, 1) → [1e-6, 2e-6, 5e-6, 1e-5, …, 1] */
export function seq125(min, max) {
  const out = [];
  for (let d = Math.floor(Math.log10(min)); d <= Math.ceil(Math.log10(max)); d++) for (const m of [1, 2, 5]) { const v = +(m * 10 ** d).toPrecision(6); if (v >= min * (1 - 1e-9) && v <= max * (1 + 1e-9)) out.push(v); }
  return out;
}
