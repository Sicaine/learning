// Why DINOv3 needs Gram anchoring. A toy model of long self-supervised training:
// after ~200k iterations the global (CLS-like) component increasingly dominates patch
// features and similarity maps get noisy, so dense quality falls while global quality rises.
// Gram anchoring (from 1M iterations) pulls the patch-similarity structure back towards an
// earlier "Gram teacher". Curves are illustrative, shaped after Fig. 5–6 of the DINOv3 paper.

import { drawWatch, patchMix, patchLabel, rng, gauss, heat, makeCanvas, canvasPoint } from './dino-watch-scene.js';

const G = 20, D = 16, MAX = 1300;

export default function mount(stage, { complete }) {
  let step = 150, anchor = false, query = { i: 10, j: 7 };
  const r = rng(5);
  const protos = Array.from({ length: 8 }, () => Array.from({ length: D }, () => gauss(r)));
  const gv = Array.from({ length: D }, () => gauss(r));
  const cells = [];
  for (let j = 0; j < G; j++) for (let i = 0; i < G; i++) {
    const mix = patchMix(i / G, j / G, 1 / G, 4);
    const base = new Array(D).fill(0);
    mix.forEach((m, p) => { if (m) for (let k = 0; k < D; k++) base[k] += m * protos[p][k]; });
    cells.push({ i, j, base, noise: Array.from({ length: D }, () => gauss(r)), label: patchLabel(mix) });
  }
  const order = cells.map((c, k) => k).sort((a, b) => cells[a].label - cells[b].label || a - b).filter((_, n) => n % 3 === 0);

  const lerp = (a, b, t) => a + (b - a) * Math.max(0, Math.min(1, t));
  function schedule(s, anc) {
    let alpha = lerp(0.3, 1, s / 200);
    let beta = s < 200 ? 0.2 : lerp(0.2, 2.2, (s - 200) / 800);
    let sigma = s < 200 ? lerp(1.2, 0.35, s / 200) : lerp(0.35, 0.8, (s - 200) / 800);
    if (anc && s > 1000) { const t = (s - 1000) / 150; beta = lerp(beta, 0.25, t); sigma = lerp(sigma, 0.3, t); }
    return { alpha, beta, sigma };
  }
  function features(s, anc) {
    const { alpha, beta, sigma } = schedule(s, anc);
    return cells.map(c => {
      const f = c.base.map((v, k) => alpha * v + beta * gv[k] + sigma * c.noise[k]);
      const n = Math.hypot(...f); return f.map(v => v / n);
    });
  }
  const dot = (a, b) => a.reduce((s, v, k) => s + v * b[k], 0);
  function denseQuality(F) {
    let w = 0, nw = 0, b = 0, nb = 0;
    for (let x = 0; x < F.length; x += 2) for (let y = x + 1; y < F.length; y += 3) {
      const s = dot(F[x], F[y]);
      if (cells[x].label === cells[y].label) { w += s; nw++; } else { b += s; nb++; }
    }
    return (w / nw - b / nb);
  }
  const globalQuality = s => 1 - Math.exp(-(s + 40) / 320);

  const curves = { plain: [], anch: [] };
  for (let s = 0; s <= MAX; s += 25) {
    curves.plain.push([s, denseQuality(features(s, false))]);
    curves.anch.push([s, denseQuality(features(s, true))]);
  }
  const dqMax = Math.max(...curves.plain.map(p => p[1]), ...curves.anch.map(p => p[1]));

  stage.innerHTML = `<div class="vz">
    <div class="ga-row" style="display:grid;grid-template-columns:1fr 1fr;gap:12px"></div>
    <svg class="vz-svg ga-chart" viewBox="0 0 580 150"></svg>
    <div class="vz-controls">
      <div class="vz-control"><label>Training iterations <output class="o-s"></output></label><input type="range" class="r-s" min="0" max="${MAX}" step="10" value="${step}"></div>
      <div class="vz-seg"><button data-a="0" class="on">Plain training</button><button data-a="1">Gram anchoring from 1M</button></div>
    </div>
    <div class="vz-readout"></div>
    <p class="vz-note">Left: cosine similarity of the <b>selected patch</b> (click the image to move it) to all other patches. Right: the Gram matrix X·Xᵀ of patch features, patches sorted by part — clean blocks mean clean dense features.</p>
  </div>`;
  const row = stage.querySelector('.ga-row');
  const img = makeCanvas(row, 280, 280);
  const gram = makeCanvas(row, 280, 280);
  const chartEl = stage.querySelector('.ga-chart');
  const bg = document.createElement('canvas'); bg.width = 280; bg.height = 280; drawWatch(bg.getContext('2d'), 280, 280);

  function draw() {
    const F = features(step, anchor);
    const qk = query.j * G + query.i, s = 280 / G;
    img.g.drawImage(bg, 0, 0, 280, 280);
    F.forEach((f, k) => {
      const sim = dot(f, F[qk]);
      img.g.fillStyle = heat((sim + 0.2) / 1.2).replace('rgb', 'rgba').replace(')', ',0.72)');
      img.g.fillRect(cells[k].i * s, cells[k].j * s, s, s);
    });
    img.g.strokeStyle = '#1f9d6b'; img.g.lineWidth = 2.5; img.g.strokeRect(query.i * s + 1, query.j * s + 1, s - 2, s - 2);

    const n = order.length, gs = 280 / n;
    order.forEach((a, x) => order.forEach((b, y) => {
      gram.g.fillStyle = heat((dot(F[a], F[b]) + 0.2) / 1.2);
      gram.g.fillRect(x * gs, y * gs, gs + 0.4, gs + 0.4);
    }));

    const W = 580, H = 150, px = t => 40 + (t / MAX) * (W - 60), py = v => H - 22 - v * (H - 40);
    const path = pts => pts.map(([t, v], k) => `${k ? 'L' : 'M'}${px(t).toFixed(1)},${py(v).toFixed(1)}`).join(' ');
    const gl = []; for (let t = 0; t <= MAX; t += 25) gl.push([t, globalQuality(t)]);
    const ticks = [0, 200, 400, 600, 800, 1000, 1200].map(t => `<text x="${px(t)}" y="${H - 6}" text-anchor="middle">${t === 0 ? '0' : t < 1000 ? t + 'k' : t / 1000 + 'M'}</text>`).join('');
    chartEl.innerHTML = `
      <g font-family="Inter, sans-serif" font-size="11" fill="var(--muted)">${ticks}</g>
      <line x1="${px(0)}" y1="${py(0)}" x2="${px(MAX)}" y2="${py(0)}" stroke="var(--line-2)"/>
      ${anchor ? `<line x1="${px(1000)}" y1="10" x2="${px(1000)}" y2="${H - 22}" stroke="#1f9d6b" stroke-dasharray="4 4"/><text x="${px(1000) + 4}" y="30" font-family="Inter, sans-serif" font-size="11" fill="#1f9d6b">Gram anchoring on</text>` : ''}
      <path d="${path(curves.plain.map(([t, v]) => [t, v / dqMax]))}" fill="none" stroke="var(--accent)" stroke-width="2.2" ${anchor ? 'stroke-dasharray="3 4" opacity=".6"' : ''}/>
      ${anchor ? `<path d="${path(curves.anch.map(([t, v]) => [t, v / dqMax]))}" fill="none" stroke="var(--accent)" stroke-width="2.4"/>` : ''}
      <path d="${path(gl)}" fill="none" stroke="var(--accent-2)" stroke-width="2.2"/>
      <text x="46" y="14" font-family="Inter, sans-serif" font-size="11.5" font-weight="600" fill="var(--accent)">dense quality (segmentation)</text>
      <text x="250" y="14" font-family="Inter, sans-serif" font-size="11.5" font-weight="600" fill="var(--accent-2)">global quality (classification)</text>
      <circle cx="${px(step)}" cy="${py(denseQuality(F) / dqMax)}" r="5" fill="var(--ink)"/>`;

    const { beta, sigma } = schedule(step, anchor);
    stage.querySelector('.o-s').textContent = step >= 1000 ? `${(step / 1000).toFixed(2)}M` : `${step}k`;
    stage.querySelector('.vz-readout').innerHTML = `
      <span class="vz-stat hl">dense quality<b>${(denseQuality(F) / dqMax).toFixed(2)}</b></span>
      <span class="vz-stat">global quality<b>${globalQuality(step).toFixed(2)}</b></span>
      <span class="vz-stat">global share of patch features<b>${(beta / (1 + beta)).toFixed(2)}</b></span>
      <span class="vz-stat">patch noise<b>${sigma.toFixed(2)}</b></span>`;
    if (anchor && step >= 1100) complete();
  }

  stage.querySelector('.r-s').oninput = e => { step = +e.target.value; draw(); };
  stage.querySelectorAll('.vz-seg button').forEach(b => b.onclick = () => {
    anchor = b.dataset.a === '1'; stage.querySelectorAll('.vz-seg button').forEach(x => x.classList.toggle('on', x === b)); draw();
  });
  img.c.addEventListener('pointerdown', e => {
    const p = canvasPoint(img.c, e, 280, 280);
    query = { i: Math.min(G - 1, Math.floor(p.x / (280 / G))), j: Math.min(G - 1, Math.floor(p.y / (280 / G))) };
    draw();
  });
  draw();
}
