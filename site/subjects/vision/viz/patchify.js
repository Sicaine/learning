// Patchify a watch image: pick input resolution and patch size, see the token grid,
// the token count, attention cost, and how wide the second hand is relative to one patch.

import { renderWatch, drawToCanvas, labelAt, LABEL_COLORS } from './watch-scene.js';

const RES = [112, 224, 336, 448, 518, 672, 896, 1024];
const SECOND_W = 0.007; // second-hand width as fraction of image side (see watch-scene.js)
const HOUR_W = 0.034;

export default function mount(stage, { complete }) {
  let ri = 1, P = 16;
  const reached = new Set();
  const disp = renderWatch(448);
  const rgb = LABEL_COLORS.map(h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)));

  stage.innerHTML = `
    <div class="vz">
      <div class="vz-controls">
        <div class="vz-control"><label>Input resolution <output class="ro"></output></label><input type="range" class="r" min="0" max="${RES.length - 1}" step="1" value="${ri}"></div>
        <div><div class="vz-note" style="margin-bottom:4px">Patch size</div><div class="vz-seg ps">${[8, 14, 16, 32].map(p => `<button data-p="${p}">${p}</button>`).join('')}</div></div>
      </div>
      <div style="display:grid;grid-template-columns:minmax(0,1.4fr) minmax(0,1fr);gap:14px;align-items:start" class="pf-grid">
        <div style="position:relative"><canvas class="img" style="width:100%"></canvas><canvas class="grid" style="position:absolute;inset:0;width:100%;height:100%;border:0;background:none"></canvas></div>
        <div><canvas class="zoom" style="width:100%;image-rendering:pixelated"></canvas><div class="vz-note zl" style="text-align:center"></div></div>
      </div>
      <div class="vz-readout stats"></div>
      <div class="vz-readout goals"></div>
    </div>`;
  const $ = s => stage.querySelector(s);
  if (window.innerWidth < 640) $('.pf-grid').style.gridTemplateColumns = '1fr';
  drawToCanvas($('.img'), disp);
  const grid = $('.grid'); grid.width = 448; grid.height = 448;

  function drawZoom(R) {
    // 3×3 patches around a point on the second hand, at true input resolution
    const n = 3 * P, z = $('.zoom');
    z.width = n; z.height = n;
    const a = (216 - 90) * Math.PI / 180;
    const cx = ((Math.cos(a) * 0.4 + 1) / 2) * R, cy = ((Math.sin(a) * 0.4 + 1) / 2) * R;
    const x0 = Math.round(cx / P - 1.5) * P, y0 = Math.round(cy / P - 1.5) * P;
    const ctx = z.getContext('2d'), id = ctx.createImageData(n, n);
    for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
      let acc = [0, 0, 0];
      for (let s = 0; s < 4; s++) {
        const x = ((x0 + i + (s % 2 + 0.5) / 2) / R) * 2 - 1, y = ((y0 + j + (Math.floor(s / 2) + 0.5) / 2) / R) * 2 - 1;
        const c = rgb[labelAt(x, y)];
        acc = acc.map((v, k) => v + c[k] / 4);
      }
      id.data.set([...acc, 255], (j * n + i) * 4);
    }
    ctx.putImageData(id, 0, 0);
    ctx.strokeStyle = 'rgba(91,91,214,.9)'; ctx.lineWidth = Math.max(0.15, n / 300);
    for (let k = 0; k <= 3; k++) { ctx.beginPath(); ctx.moveTo(k * P, 0); ctx.lineTo(k * P, n); ctx.moveTo(0, k * P); ctx.lineTo(n, k * P); ctx.stroke(); }
    $('.zl').textContent = `3×3 patches near the second hand, at ${R}px input (each square = one token)`;
  }

  function draw() {
    const R = RES[ri];
    const g = R / P, N = Math.floor(g) ** 2;
    const gctx = grid.getContext('2d');
    gctx.clearRect(0, 0, 448, 448);
    const step = 448 / g;
    gctx.strokeStyle = 'rgba(255,255,255,.75)'; gctx.lineWidth = g > 60 ? 0.4 : 0.8;
    gctx.beginPath();
    for (let k = 0; k <= Math.floor(g); k++) { gctx.moveTo(k * step, 0); gctx.lineTo(k * step, 448); gctx.moveTo(0, k * step); gctx.lineTo(448, k * step); }
    gctx.stroke();
    drawZoom(R);
    const secPx = SECOND_W * R, hourPx = HOUR_W * R;
    const cost = (N * N) / (196 * 196);
    $('.ro').textContent = `${R}×${R}`;
    stage.querySelectorAll('.ps button').forEach(b => b.classList.toggle('on', +b.dataset.p === P));
    $('.stats').innerHTML = `
      <span class="vz-stat">grid<b>${Math.floor(g)}×${Math.floor(g)}${R % P ? ' (crops!)' : ''}</b></span>
      <span class="vz-stat hl">patch tokens N<b>${N.toLocaleString('en')}</b></span>
      <span class="vz-stat">attention entries N² / head<b>${(N * N).toLocaleString('en')}</b></span>
      <span class="vz-stat">cost vs 224/16<b>${cost < 10 ? cost.toFixed(1) : Math.round(cost)}×</b></span>
      <span class="vz-stat hl">second hand<b>${secPx.toFixed(1)} px = ${(secPx / P).toFixed(2)} patch</b></span>
      <span class="vz-stat">hour hand<b>${hourPx.toFixed(1)} px</b></span>`;
    if (secPx < 1) reached.add('vanish');
    if (secPx / P >= 0.5) reached.add('half');
    if (R === 518 && P === 14) reached.add('dino');
    const labels = { vanish: 'Find a setting where the second hand is thinner than 1 pixel', dino: 'Set DINOv2’s typical dense setting: 518 px, patch 14', half: 'Make the second hand at least half a patch wide — and look at the cost' };
    $('.goals').innerHTML = Object.entries(labels).map(([k, t]) => `<span class="vz-stat ${reached.has(k) ? 'hl' : ''}">${reached.has(k) ? '✓' : '○'} ${t}</span>`).join('');
    if (reached.size === 3) complete();
  }
  $('.r').oninput = e => { ri = +e.target.value; draw(); };
  $('.ps').onclick = e => { const b = e.target.closest('button'); if (b) { P = +b.dataset.p; draw(); } };
  draw();
}
