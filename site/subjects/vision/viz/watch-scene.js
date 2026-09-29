// Procedural watch image + pixel-exact ground-truth labels, shared by several vizzes.
// Coordinates are normalized to [-1, 1]; renderWatch() rasterizes at any resolution,
// so the same "photo" can be shown at 32 px or 1024 px.

export const LABELS = ['background', 'strap', 'case', 'bezel', 'dial', 'index', 'hand', 'crown'];
export const LABEL_COLORS = ['#e9e9f1', '#8a5a3c', '#b9bcc6', '#27336b', '#f4efe4', '#3a3a48', '#161a3a', '#9ea2ad'];

const RGB = LABEL_COLORS.map(h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)));

function segDist(px, py, ax, ay, bx, by) {
  const dx = bx - ax, dy = by - ay;
  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)));
  return Math.hypot(px - ax - t * dx, py - ay - t * dy);
}

// Hands at 10:09:36 (the classic "smile" pose), angles clockwise from 12.
const deg = d => (d - 90) * Math.PI / 180;
const HANDS = [
  { a: deg(304), len: 0.34, w: 0.034 },  // hour
  { a: deg(58), len: 0.5, w: 0.022 },    // minute
  { a: deg(216), len: 0.56, w: 0.007 },  // second (very thin)
];

export function labelAt(x, y, opt = {}) {
  const hw = opt.handScale ?? 1;
  const r = Math.hypot(x, y);
  for (const h of HANDS) {
    if (segDist(x, y, 0, 0, Math.cos(h.a) * h.len, Math.sin(h.a) * h.len) < h.w * hw) return 6;
  }
  if (r < 0.035) return 6;
  if (r < 0.6) {
    const ang = Math.atan2(y, x);
    for (let k = 0; k < 12; k++) {
      const a = k * Math.PI / 6;
      const ir = k % 3 === 0 ? 0.43 : 0.47;
      if (segDist(x, y, Math.cos(a) * ir, Math.sin(a) * ir, Math.cos(a) * 0.56, Math.sin(a) * 0.56) < (k % 3 === 0 ? 0.024 : 0.014)) return 5;
    }
    void ang;
    return 4;
  }
  if (r < 0.72) return 3;
  if (r < 0.8) return 2;
  if (x > 0.76 && x < 0.9 && Math.abs(y) < 0.08) return 7;
  if (Math.abs(x) < 0.42 && r >= 0.8) return 1;
  return 0;
}

// Returns { rgb: Uint8ClampedArray (RGBA), labels: Uint8Array, gray: Float32Array (0..1) }.
export function renderWatch(size, opt = {}) {
  const ss = opt.supersample ?? 2;
  const rgb = new Uint8ClampedArray(size * size * 4);
  const labels = new Uint8Array(size * size);
  const gray = new Float32Array(size * size);
  const light = opt.light ?? 1;
  for (let j = 0; j < size; j++) {
    for (let i = 0; i < size; i++) {
      let R = 0, G = 0, B = 0;
      const counts = new Uint8Array(LABELS.length);
      for (let sy = 0; sy < ss; sy++) for (let sx = 0; sx < ss; sx++) {
        const x = ((i + (sx + 0.5) / ss) / size) * 2 - 1;
        const y = ((j + (sy + 0.5) / ss) / size) * 2 - 1;
        const l = labelAt(x, y, opt);
        counts[l]++;
        let [r, g, b] = RGB[l];
        // simple shading so it reads as a photo: vignette + dome highlight on the dial/case
        const shade = 1 - 0.12 * Math.hypot(x + 0.3, y + 0.4);
        const f = shade * light;
        R += r * f; G += g * f; B += b * f;
      }
      const n = ss * ss, k = (j * size + i);
      rgb[k * 4] = R / n; rgb[k * 4 + 1] = G / n; rgb[k * 4 + 2] = B / n; rgb[k * 4 + 3] = 255;
      let best = 0; for (let c = 1; c < counts.length; c++) if (counts[c] > counts[best]) best = c;
      labels[k] = best;
      gray[k] = (0.299 * R + 0.587 * G + 0.114 * B) / n / 255;
    }
  }
  return { rgb, labels, gray, size };
}

export function drawToCanvas(canvas, img) {
  canvas.width = img.size; canvas.height = img.size;
  canvas.getContext('2d').putImageData(new ImageData(img.rgb, img.size, img.size), 0, 0);
}
