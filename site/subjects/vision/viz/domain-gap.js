// Real vs synthetic embeddings in a 2D "feature space". Toggle randomization axes
// and watch a k-NN domain classifier lose (or keep) its ability to tell them apart.
// params.target: domain-classifier accuracy to reach (default 0.65).

function rng(seed) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
function gauss(r) { let u = 0, v = 0; while (!u) u = r(); v = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }

const AXES = [
  { id: 'light', label: 'Lighting & HDRI environments', dir: [0.9, 0.2], spread: [0.55, 0.15] },
  { id: 'material', label: 'Materials & reflections', dir: [0.3, 0.8], spread: [0.15, 0.5] },
  { id: 'bg', label: 'Backgrounds & clutter', dir: [0.6, 0.55], spread: [0.4, 0.4] },
  { id: 'camera', label: 'Camera, blur & sensor noise', dir: [-0.2, 0.5], spread: [0.3, 0.3] },
  { id: 'crazy', label: 'Unrealistic textures (wild colors)', dir: [-0.4, -0.9], spread: [0.9, 0.9] },
];

export default function mount(stage, { params, complete }) {
  const target = params.target ?? 0.65;
  const W = 460, H = 320;
  const on = new Set();
  let strength = 0.6, done = false;
  const r0 = rng(7);
  const real = Array.from({ length: 140 }, () => {
    const a = gauss(r0), b = gauss(r0);
    return [0.66 + 0.13 * a + 0.03 * b, 0.62 + 0.05 * a + 0.1 * b];
  });
  const base = Array.from({ length: 140 }, () => [gauss(r0), gauss(r0), r0(), r0()]);

  stage.innerHTML = `
    <div class="vz">
      <canvas width="${W * 2}" height="${H * 2}" style="aspect-ratio:${W}/${H}"></canvas>
      <div class="vz-controls axes"></div>
      <div class="vz-controls"><div class="vz-control"><label>Randomization strength <output></output></label><input type="range" min="0" max="1" step="0.05" value="${strength}"></div></div>
      <div class="vz-readout"></div>
      <p class="vz-note"><b style="color:#e39b3b">●</b> real photos &nbsp; <b style="color:var(--accent)">●</b> renders. Each dot is one image's embedding (imagine a frozen DINOv3 feature projected to 2D). The domain classifier is a 5-nearest-neighbour vote "real or synthetic?" — 50% means it cannot tell.</p>
    </div>`;
  const cv = stage.querySelector('canvas');
  const g = cv.getContext('2d');
  const axesEl = stage.querySelector('.axes');
  axesEl.innerHTML = AXES.map(a => `<label class="vz-note"><input type="checkbox" data-a="${a.id}"> ${a.label}</label>`).join('');

  function synth() {
    let mx = 0.22, my = 0.25, sx = 0.035, sy = 0.035;
    for (const a of AXES) if (on.has(a.id)) {
      const k = strength;
      if (a.id === 'crazy') { sx += a.spread[0] * 0.25 * k; sy += a.spread[1] * 0.25 * k; mx += a.dir[0] * 0.08 * k; my += a.dir[1] * 0.08 * k; continue; }
      mx += a.dir[0] * 0.2 * k; my += a.dir[1] * 0.2 * k;
      sx += a.spread[0] * 0.14 * k; sy += a.spread[1] * 0.14 * k;
    }
    return base.map(([a, b]) => [mx + sx * a, my + sy * b]);
  }

  function knnAcc(A, B) {
    const pts = A.map(p => [...p, 0]).concat(B.map(p => [...p, 1]));
    let correct = 0;
    for (let i = 0; i < pts.length; i++) {
      const d = [];
      for (let j = 0; j < pts.length; j++) if (j !== i) d.push([(pts[i][0] - pts[j][0]) ** 2 + (pts[i][1] - pts[j][1]) ** 2, pts[j][2]]);
      d.sort((x, y) => x[0] - y[0]);
      const vote = d.slice(0, 5).reduce((s, x) => s + x[1], 0) > 2 ? 1 : 0;
      if (vote === pts[i][2]) correct++;
    }
    return correct / pts.length;
  }

  function coverage(A, B) {
    const eps = 0.05 ** 2;
    return A.filter(p => B.some(q => (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2 < eps)).length / A.length;
  }

  function draw() {
    const S = synth();
    const css = getComputedStyle(stage);
    const accent = css.getPropertyValue('--accent').trim() || '#5b5bd6';
    g.setTransform(2, 0, 0, 2, 0, 0);
    g.clearRect(0, 0, W, H);
    g.strokeStyle = 'rgba(0,0,0,.05)';
    for (let i = 1; i < 10; i++) { g.beginPath(); g.moveTo(i * W / 10, 0); g.lineTo(i * W / 10, H); g.stroke(); g.beginPath(); g.moveTo(0, i * H / 10); g.lineTo(W, i * H / 10); g.stroke(); }
    const dot = (p, c) => { g.fillStyle = c; g.beginPath(); g.arc(p[0] * W, (1 - p[1]) * H, 3.4, 0, 7); g.fill(); };
    g.globalAlpha = 0.7;
    S.forEach(p => dot(p, accent));
    real.forEach(p => dot(p, '#e39b3b'));
    g.globalAlpha = 1;
    const acc = knnAcc(real, S), cov = coverage(real, S);
    const wasted = S.filter(p => p[0] < 0 || p[0] > 1 || p[1] < 0 || p[1] > 1 || Math.hypot(p[0] - 0.66, p[1] - 0.62) > 0.55).length / S.length;
    stage.querySelector('output').textContent = strength.toFixed(2);
    stage.querySelector('.vz-readout').innerHTML = `
      <span class="vz-stat hl">domain classifier accuracy<b>${(acc * 100).toFixed(0)}%</b></span>
      <span class="vz-stat">real images covered by renders<b>${(cov * 100).toFixed(0)}%</b></span>
      <span class="vz-stat">renders far from any real image<b>${(wasted * 100).toFixed(0)}%</b></span>
      <span class="vz-stat ${acc <= target ? 'hl' : ''}">${acc <= target ? '✓' : '○'} goal: accuracy ≤ ${(target * 100).toFixed(0)}% with few wasted renders</span>`;
    if (!done && acc <= target && wasted < 0.35) { done = true; complete(); }
  }

  axesEl.addEventListener('change', e => { const a = e.target.dataset.a; if (e.target.checked) on.add(a); else on.delete(a); draw(); });
  stage.querySelector('input[type=range]').addEventListener('input', e => { strength = +e.target.value; draw(); });
  draw();
}
