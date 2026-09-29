// PCA of (synthetic) patch features on a procedurally drawn watch.
// Patch features = mixture of part prototypes (boundary patches mix) + noise.
// Top-3 principal components → RGB, exactly how people visualize DINOv2/v3 features.
// Task auto-completes when a PC1 threshold separates watch from background (IoU ≥ 0.9).

import { PARTS, drawWatch, patchMix, patchLabel, rng, gauss, makeCanvas, canvasPoint } from './dino-watch-scene.js';

const D = 24;

export default function mount(stage, { complete }) {
  let grid = 28, noise = 0.35, mode = 'pca', thr = 0.12;
  const protoR = rng(7);
  const protos = PARTS.map(() => Array.from({ length: D }, () => gauss(protoR)));

  stage.innerHTML = `<div class="vz">
    <div class="pca-row" style="display:grid;grid-template-columns:1fr 1fr;gap:12px"></div>
    <div class="vz-controls">
      <div class="vz-control"><label>Backbone quality <output class="o-n"></output></label><input type="range" class="r-n" min="0" max="1.4" step="0.05" value="${noise}"></div>
      <div class="vz-control"><label>Patch grid <output class="o-g"></output></label><input type="range" class="r-g" min="12" max="48" step="2" value="${grid}"></div>
    </div>
    <div class="vz-controls">
      <div class="vz-seg"><button data-m="pca" class="on">PCA → RGB</button><button data-m="pc1">PC1 only</button><button data-m="mask">Foreground mask</button></div>
      <div class="vz-control thr-wrap"><label>PC1 threshold <output class="o-t"></output></label><input type="range" class="r-t" min="0" max="1" step="0.01" value="${thr}"></div>
    </div>
    <div class="vz-readout"></div>
    <p class="vz-note">Left: the image. Right: each patch's feature vector projected onto the top principal components. Lower quality = more feature noise (think: small or badly matched backbone, or big domain gap).</p>
  </div>`;
  const row = stage.querySelector('.pca-row');
  const img = makeCanvas(row, 300, 300);
  const out = makeCanvas(row, 300, 300);
  drawWatch(img.g, 300, 300);

  let feats, labels, fg, pcs;

  function build() {
    const r = rng(11);
    feats = []; labels = []; fg = [];
    const size = 1 / grid;
    for (let j = 0; j < grid; j++) for (let i = 0; i < grid; i++) {
      const mix = patchMix(i * size, j * size, size, 4);
      const f = new Array(D).fill(0);
      mix.forEach((m, p) => { if (m) for (let k = 0; k < D; k++) f[k] += m * protos[p][k]; });
      for (let k = 0; k < D; k++) f[k] += noise * gauss(r) * 1.6;
      feats.push(f); labels.push(patchLabel(mix)); fg.push(mix[0] < 0.5);
    }
    pcs = pca(feats, 3);
    // orient PC1 so that background is low
    const bgMean = mean(pcs.map((p, i) => fg[i] ? null : p[0]).filter(v => v !== null));
    const fgMean = mean(pcs.map((p, i) => fg[i] ? p[0] : null).filter(v => v !== null));
    if (bgMean > fgMean) pcs.forEach(p => { p[0] = -p[0]; });
    for (let c = 0; c < 3; c++) {
      const vals = pcs.map(p => p[c]); const lo = Math.min(...vals), hi = Math.max(...vals);
      pcs.forEach(p => { p[c] = (p[c] - lo) / (hi - lo || 1); });
    }
  }

  function draw() {
    const g = out.g, s = 300 / grid;
    let tp = 0, fp = 0, fn = 0;
    pcs.forEach((p, idx) => {
      const i = idx % grid, j = Math.floor(idx / grid);
      let col;
      if (mode === 'pca') col = `rgb(${p.map(v => Math.round(40 + v * 215)).join(',')})`;
      else if (mode === 'pc1') { const v = Math.round(p[0] * 255); col = `rgb(${v},${v},${v})`; }
      else {
        const on = p[0] > thr;
        if (on && fg[idx]) tp++; else if (on) fp++; else if (fg[idx]) fn++;
        col = on ? (fg[idx] ? 'rgba(91,91,214,.85)' : 'rgba(212,81,61,.85)') : (fg[idx] ? 'rgba(212,81,61,.35)' : '#f4f4f8');
      }
      g.fillStyle = col; g.fillRect(i * s, j * s, s + 0.5, s + 0.5);
    });
    if (mode !== 'mask') { tp = 0; fp = 0; fn = 0; pcs.forEach((p, i) => { const on = p[0] > thr; if (on && fg[i]) tp++; else if (on) fp++; else if (fg[i]) fn++; }); }
    const iou = tp / (tp + fp + fn || 1);
    stage.querySelector('.vz-readout').innerHTML = `
      <span class="vz-stat">patches<b>${grid}×${grid} = ${grid * grid}</b></span>
      <span class="vz-stat">feature dim<b>${D}</b></span>
      <span class="vz-stat ${iou >= 0.9 ? 'hl' : ''}">foreground IoU at threshold<b>${iou.toFixed(2)}</b></span>`;
    stage.querySelector('.thr-wrap').style.opacity = mode === 'mask' ? 1 : 0.45;
    if (iou >= 0.9 && mode === 'mask') complete();
  }

  const q = s => stage.querySelector(s);
  const sync = () => {
    q('.o-n').textContent = noise < 0.3 ? 'strong' : noise < 0.8 ? 'medium' : 'weak';
    q('.o-g').textContent = `${grid}×${grid}`;
    q('.o-t').textContent = thr.toFixed(2);
  };
  q('.r-n').oninput = e => { noise = +e.target.value; sync(); build(); draw(); };
  q('.r-g').oninput = e => { grid = +e.target.value; sync(); build(); draw(); };
  q('.r-t').oninput = e => { thr = +e.target.value; sync(); draw(); };
  stage.querySelectorAll('.vz-seg button').forEach(b => b.onclick = () => {
    mode = b.dataset.m; stage.querySelectorAll('.vz-seg button').forEach(x => x.classList.toggle('on', x === b)); draw();
  });
  out.c.addEventListener('pointermove', e => {
    const p = canvasPoint(out.c, e, 300, 300), s = 300 / grid;
    const idx = Math.floor(p.y / s) * grid + Math.floor(p.x / s);
    if (labels?.[idx] !== undefined) out.c.title = `patch labelled "${PARTS[labels[idx]]}"`;
  });
  sync(); build(); draw();
}

function mean(a) { return a.reduce((s, v) => s + v, 0) / (a.length || 1); }

// Top-k PCA via power iteration with deflation. Returns projections [n][k].
function pca(X, k) {
  const n = X.length, d = X[0].length;
  const mu = new Array(d).fill(0);
  X.forEach(x => x.forEach((v, i) => { mu[i] += v / n; }));
  const Xc = X.map(x => x.map((v, i) => v - mu[i]));
  const C = Array.from({ length: d }, () => new Array(d).fill(0));
  Xc.forEach(x => { for (let i = 0; i < d; i++) for (let j = i; j < d; j++) C[i][j] += x[i] * x[j] / n; });
  for (let i = 0; i < d; i++) for (let j = 0; j < i; j++) C[i][j] = C[j][i];
  const vecs = [];
  for (let c = 0; c < k; c++) {
    let v = Array.from({ length: d }, (_, i) => Math.sin(i * 1.7 + c + 1));
    for (let it = 0; it < 60; it++) {
      const w = C.map(row => row.reduce((s, a, j) => s + a * v[j], 0));
      const nrm = Math.hypot(...w) || 1; v = w.map(a => a / nrm);
    }
    const lam = v.reduce((s, a, i) => s + a * C[i].reduce((t, b, j) => t + b * v[j], 0), 0);
    for (let i = 0; i < d; i++) for (let j = 0; j < d; j++) C[i][j] -= lam * v[i] * v[j];
    vecs.push(v);
  }
  return Xc.map(x => vecs.map(v => x.reduce((s, a, i) => s + a * v[i], 0)));
}
