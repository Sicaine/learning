// Shared procedural watch scene for stage-6 visualizations (not a viz itself).
// Coordinates are normalized to [0,1]². labelAt() gives the ground-truth part.

export const PARTS = ['background', 'strap', 'case', 'bezel', 'dial', 'hands', 'crown', 'indices'];
export const PART_COLORS = ['#eef0f4', '#6b4a33', '#b9bec8', '#2c3140', '#f3efe6', '#1b1d24', '#9aa0ab', '#8a7a55'];

const C = { x: 0.5, y: 0.5 };
const R_CASE = 0.33, R_BEZEL = 0.29, R_DIAL = 0.29;
// Hands: angle (radians, 0 = 12 o'clock), length, half-width — in normalized units (1 = image width).
export const HANDS = [
  { name: 'hour', a: -0.95, len: 0.15, hw: 0.008 },
  { name: 'minute', a: 1.2, len: 0.235, hw: 0.005 },
  { name: 'seconds', a: 2.6, len: 0.26, hw: 0.0015 },
];

function distToSegment(px, py, ax, ay, bx, by) {
  const dx = bx - ax, dy = by - ay;
  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)));
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}

export function labelAt(x, y) {
  const dx = x - C.x, dy = y - C.y, r = Math.hypot(dx, dy);
  if (r < R_DIAL) {
    for (const h of HANDS) {
      const ex = C.x + Math.sin(h.a) * h.len, ey = C.y - Math.cos(h.a) * h.len;
      if (distToSegment(x, y, C.x, C.y, ex, ey) < h.hw) return 5;
    }
    if (r < 0.012) return 5;
    const ang = Math.atan2(dx, -dy);
    const k = Math.round(ang / (Math.PI / 6));
    if (r > 0.235 && r < 0.27 && Math.abs(ang - k * Math.PI / 6) * r < 0.007) return 7;
    return 4;
  }
  if (r < R_CASE) return r < R_BEZEL + 0.035 && r >= R_BEZEL ? 3 : 2;
  if (x > 0.825 && x < 0.87 && Math.abs(y - 0.5) < 0.03) return 6;
  if (Math.abs(dx) < 0.14 && r >= R_CASE - 0.01) return 1;
  return 0;
}

// Fraction of each part inside a patch (sub-sampled), returns array of length PARTS.length.
export function patchMix(x0, y0, size, samples = 5) {
  const mix = new Array(PARTS.length).fill(0);
  for (let i = 0; i < samples; i++) for (let j = 0; j < samples; j++) {
    mix[labelAt(x0 + (i + 0.5) / samples * size, y0 + (j + 0.5) / samples * size)]++;
  }
  return mix.map(v => v / (samples * samples));
}

export function patchLabel(mix) { let b = 0; mix.forEach((v, i) => { if (v > mix[b]) b = i; }); return b; }

// Draw the watch into a 2D canvas context covering (0,0)-(w,h).
export function drawWatch(g, w, h) {
  const s = Math.min(w, h), X = v => v * s, cx = X(C.x), cy = X(C.y);
  g.fillStyle = PART_COLORS[0]; g.fillRect(0, 0, w, h);
  g.fillStyle = PART_COLORS[1];
  g.fillRect(X(0.36), 0, X(0.28), h);
  g.strokeStyle = 'rgba(0,0,0,.18)'; g.lineWidth = X(0.004);
  for (let yy = 0.04; yy < 1; yy += 0.06) { if (Math.abs(yy - 0.5) < 0.34) continue; g.beginPath(); g.moveTo(X(0.37), X(yy)); g.lineTo(X(0.63), X(yy)); g.stroke(); }
  g.fillStyle = PART_COLORS[6]; g.fillRect(X(0.825), X(0.47), X(0.045), X(0.06));
  const grad = g.createRadialGradient(cx - X(0.1), cy - X(0.1), X(0.05), cx, cy, X(R_CASE));
  grad.addColorStop(0, '#dfe3ea'); grad.addColorStop(1, '#9ca2ad');
  g.fillStyle = grad; g.beginPath(); g.arc(cx, cy, X(R_CASE), 0, 7); g.fill();
  g.fillStyle = PART_COLORS[3]; g.beginPath(); g.arc(cx, cy, X(R_BEZEL + 0.035), 0, 7); g.fill();
  g.fillStyle = PART_COLORS[4]; g.beginPath(); g.arc(cx, cy, X(R_DIAL), 0, 7); g.fill();
  g.strokeStyle = PART_COLORS[7]; g.lineWidth = X(0.012);
  for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; g.beginPath(); g.moveTo(cx + Math.sin(a) * X(0.237), cy - Math.cos(a) * X(0.237)); g.lineTo(cx + Math.sin(a) * X(0.268), cy - Math.cos(a) * X(0.268)); g.stroke(); }
  g.lineCap = 'round';
  for (const hnd of HANDS) {
    g.strokeStyle = hnd.name === 'seconds' ? '#c0392b' : PART_COLORS[5];
    g.lineWidth = Math.max(1, X(hnd.hw * 2));
    g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx + Math.sin(hnd.a) * X(hnd.len), cy - Math.cos(hnd.a) * X(hnd.len)); g.stroke();
  }
  g.fillStyle = PART_COLORS[5]; g.beginPath(); g.arc(cx, cy, X(0.012), 0, 7); g.fill();
}

// Deterministic PRNG so "random" features are stable between renders.
export function rng(seed = 1) {
  let s = seed >>> 0;
  return () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
export function gauss(r) { return Math.sqrt(-2 * Math.log(r() + 1e-12)) * Math.cos(2 * Math.PI * r()); }

// Diverging-free sequential color map (light → accent-ish) for heatmaps, v in [0,1].
export function heat(v) {
  v = Math.max(0, Math.min(1, v));
  const stops = [[250, 250, 252], [196, 181, 253], [124, 58, 237], [76, 29, 149], [251, 191, 36]];
  const f = v * (stops.length - 1), i = Math.min(stops.length - 2, Math.floor(f)), t = f - i;
  const c = stops[i].map((a, k) => Math.round(a + (stops[i + 1][k] - a) * t));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}

export function makeCanvas(stage, w, h, cls = '') {
  const c = document.createElement('canvas');
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  c.width = w * dpr; c.height = h * dpr; c.className = cls;
  c.style.aspectRatio = `${w} / ${h}`;
  const g = c.getContext('2d'); g.scale(dpr, dpr);
  stage.append(c);
  return { c, g, w, h };
}

export function canvasPoint(c, e, w, h) {
  const r = c.getBoundingClientRect();
  return { x: (e.clientX - r.left) * w / r.width, y: (e.clientY - r.top) * h / r.height };
}
