// KoLeo regularizer, visualized on the unit circle. Each point is an L2-normalized feature.
// A "task pull" drags features toward 3 prototypes (what the DINO/iBOT losses reward);
// KoLeo = −(1/n) Σ log d_i (d_i = distance to nearest neighbour) pushes nearest neighbours apart.

import { rng } from './dino-watch-scene.js';

const N = 36;

export default function mount(stage) {
  let w = 0, running = true, pts;
  const protos = [0.4, 2.3, 4.3];
  function reset() {
    const r = rng(9);
    pts = Array.from({ length: N }, (_, i) => protos[i % 3] + (r() - 0.5) * 0.9);
  }
  reset();
  stage.innerHTML = `<div class="vz">
    <svg class="vz-svg" viewBox="0 0 520 300"></svg>
    <div class="vz-controls">
      <div class="vz-control"><label>KoLeo weight <output class="o-w"></output></label><input type="range" class="r-w" min="0" max="1" step="0.02" value="0"></div>
      <div class="vz-seg"><button class="b-reset">Reset points</button><button class="b-run on">Running</button></div>
    </div>
    <div class="vz-readout"></div>
  </div>`;
  const svg = stage.querySelector('svg');
  const nn = (i) => { let m = 9; pts.forEach((b, j) => { if (j !== i) { const d = chord(pts[i], b); if (d < m) m = d; } }); return m; };
  function chord(a, b) { return 2 * Math.abs(Math.sin((a - b) / 2)); }

  function step() {
    const g = pts.map((a, i) => {
      // task pull toward nearest prototype
      let best = protos[0], bd = 9;
      for (const p of protos) { const d = Math.abs(Math.atan2(Math.sin(a - p), Math.cos(a - p))); if (d < bd) { bd = d; best = p; } }
      let force = -0.06 * Math.atan2(Math.sin(a - best), Math.cos(a - best));
      // KoLeo push away from nearest neighbour
      let j = -1, m = 9; pts.forEach((b, k) => { if (k !== i) { const d = chord(a, b); if (d < m) { m = d; j = k; } } });
      const diff = Math.atan2(Math.sin(a - pts[j]), Math.cos(a - pts[j]));
      force += w * 0.02 * (Math.abs(diff) < 1e-6 ? (i < j ? -1 : 1) : Math.sign(diff)) / Math.max(0.02, m);
      return force;
    });
    pts = pts.map((a, i) => a + Math.max(-0.03, Math.min(0.03, g[i])));
  }

  function draw() {
    const cx = 150, cy = 150, R = 110;
    const dists = pts.map((_, i) => nn(i));
    const koleo = -dists.reduce((s, d) => s + Math.log(Math.max(1e-4, d)), 0) / N;
    svg.innerHTML = `
      <circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="var(--line-2)" stroke-width="1.5"/>
      ${protos.map(p => `<line x1="${cx}" y1="${cy}" x2="${cx + Math.cos(p) * (R + 22)}" y2="${cy - Math.sin(p) * (R + 22)}" stroke="var(--accent-2)" stroke-opacity=".35" stroke-dasharray="3 4"/>`).join('')}
      ${pts.map(a => `<circle cx="${cx + Math.cos(a) * R}" cy="${cy - Math.sin(a) * R}" r="6" fill="var(--accent)" fill-opacity=".75" stroke="#fff" stroke-width="1.5"/>`).join('')}
      <text x="300" y="60" font-size="13" font-weight="600" fill="var(--ink)" font-family="Inter">Nearest-neighbour distances</text>
      ${[...dists].sort((a, b) => a - b).map((d, k) => `<rect x="${300 + k * 5.6}" y="${240 - Math.min(150, d * 300)}" width="4.2" height="${Math.min(150, d * 300)}" rx="1.5" fill="var(--accent)" fill-opacity=".7"/>`).join('')}
      <line x1="300" y1="240" x2="505" y2="240" stroke="var(--line-2)"/>
      <text x="300" y="258" font-size="11" fill="var(--muted)" font-family="Inter">sorted, smallest → largest</text>`;
    stage.querySelector('.o-w').textContent = w.toFixed(2);
    stage.querySelector('.vz-readout').innerHTML = `
      <span class="vz-stat hl">KoLeo loss<b>${koleo.toFixed(2)}</b></span>
      <span class="vz-stat">min distance<b>${Math.min(...dists).toFixed(3)}</b></span>
      <span class="vz-stat">max distance<b>${Math.max(...dists).toFixed(3)}</b></span>`;
  }

  let frames = 0, seen = false;
  function loop() {
    const inDoc = document.body.contains(stage);
    if (inDoc) seen = true; else if (seen) return;
    if (running && frames++ < 100000) { step(); draw(); }
    requestAnimationFrame(loop);
  }
  stage.querySelector('.r-w').oninput = e => { w = +e.target.value; };
  stage.querySelector('.b-reset').onclick = () => { reset(); draw(); };
  const run = stage.querySelector('.b-run');
  run.onclick = () => { running = !running; run.classList.toggle('on', running); run.textContent = running ? 'Running' : 'Paused'; };
  draw();
  requestAnimationFrame(loop);
}
