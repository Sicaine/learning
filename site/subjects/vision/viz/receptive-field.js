// Build a stack of conv/pool layers and watch the receptive field of one output unit grow.
// Goal: one unit that sees the whole dial (both hands + center) with at most 8 layers.

import { renderWatch, drawToCanvas } from './watch-scene.js';

const TYPES = {
  c3: { label: '3×3 conv', k: 3, s: 1 },
  c3s2: { label: '3×3 conv, stride 2', k: 3, s: 2 },
  p2: { label: '2×2 max pool', k: 2, s: 2 },
  c7s2: { label: '7×7 conv, stride 2', k: 7, s: 2 },
};
const IMG = 224, DIAL = Math.round(0.6 * IMG);

export default function mount(stage, { params, complete }) {
  let layers = (params.start || ['c3', 'c3']).slice();
  let focus = { x: 0.5, y: 0.5 };
  const maxLayers = params.maxLayers || 8;
  const img = renderWatch(112);

  stage.innerHTML = `
    <div class="vz">
      <div style="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:16px;align-items:start" class="rf-grid">
        <div style="position:relative">
          <canvas class="img" style="width:100%;image-rendering:auto"></canvas>
          <svg class="ov" viewBox="0 0 ${IMG} ${IMG}" style="position:absolute;inset:0;width:100%;height:100%;border:0;background:none"></svg>
          <div class="vz-note" style="text-align:center">Input ${IMG}×${IMG} · click to move the unit</div>
        </div>
        <div>
          <div class="vz-controls" style="gap:6px">${Object.entries(TYPES).map(([k, t]) => `<button class="btn small add" data-t="${k}">+ ${t.label}</button>`).join('')}</div>
          <ol class="stack" style="margin:12px 0;padding-left:1.4em;font-size:.88rem;display:grid;gap:4px"></ol>
          <button class="btn small ghost clear">Reset</button>
        </div>
      </div>
      <div class="vz-readout stats"></div>
      <div class="vz-readout goal"></div>
    </div>`;
  const $ = s => stage.querySelector(s);
  const canvas = $('.img');
  drawToCanvas(canvas, img);
  if (window.innerWidth < 640) $('.rf-grid').style.gridTemplateColumns = '1fr';

  function compute() {
    let r = 1, j = 1;
    const rows = [];
    for (const key of layers) {
      const t = TYPES[key];
      r = r + (t.k - 1) * j;
      j = j * t.s;
      rows.push({ t, r, j });
    }
    return { r, j, rows };
  }

  function draw() {
    const { r, j, rows } = compute();
    $('.stack').innerHTML = rows.map((x, i) => `<li><span>${x.t.label}</span> <span style="color:var(--muted)">→ RF ${x.r}px · map ${Math.max(1, Math.round(IMG / x.j))}²</span> <button data-rm="${i}" style="border:0;background:none;color:var(--muted);cursor:pointer">✕</button></li>`).join('') || '<li style="list-style:none;color:var(--muted)">No layers yet — add some.</li>';
    const out = Math.max(1, Math.round(IMG / j));
    const cx = focus.x * IMG, cy = focus.y * IMG;
    // snap to output grid
    const gx = (Math.floor(cx / j) + 0.5) * j, gy = (Math.floor(cy / j) + 0.5) * j;
    const grid = j >= 4 ? Array.from({ length: out + 1 }, (_, i) => `<line x1="${i * j}" y1="0" x2="${i * j}" y2="${IMG}" stroke="#fff" stroke-opacity=".35" stroke-width=".5"/><line x1="0" y1="${i * j}" x2="${IMG}" y2="${i * j}" stroke="#fff" stroke-opacity=".35" stroke-width=".5"/>`).join('') : '';
    $('.ov').innerHTML = `${grid}
      <circle cx="${IMG / 2}" cy="${IMG / 2}" r="${DIAL / 2}" fill="none" stroke="var(--accent-2)" stroke-dasharray="3 3" stroke-width="1"/>
      <rect x="${gx - r / 2}" y="${gy - r / 2}" width="${r}" height="${r}" fill="color-mix(in oklab, var(--accent) 22%, transparent)" stroke="var(--accent)" stroke-width="1.5"/>
      <rect x="${gx - j / 2}" y="${gy - j / 2}" width="${Math.max(2, j)}" height="${Math.max(2, j)}" fill="var(--accent)"/>`;
    $('.stats').innerHTML = `
      <span class="vz-stat">layers<b>${layers.length}</b></span>
      <span class="vz-stat hl">receptive field<b>${r}×${r} px</b></span>
      <span class="vz-stat">jump (total stride)<b>${j}</b></span>
      <span class="vz-stat">output map<b>${out}×${out}</b></span>`;
    const ok = r >= DIAL && layers.length <= maxLayers;
    $('.goal').innerHTML = `<span class="vz-stat ${ok ? 'hl' : ''}">${ok ? '✓' : '○'} One unit sees the whole dial (≥ ${DIAL}px, dashed circle) using ≤ ${maxLayers} layers</span>`;
    if (ok) complete();
  }

  $('.vz-controls').onclick = e => { const b = e.target.closest('.add'); if (b && layers.length < 12) { layers.push(b.dataset.t); draw(); } };
  $('.stack').onclick = e => { const b = e.target.closest('[data-rm]'); if (b) { layers.splice(+b.dataset.rm, 1); draw(); } };
  $('.clear').onclick = () => { layers = []; draw(); };
  $('.ov').addEventListener('pointerdown', e => {
    const rct = e.currentTarget.getBoundingClientRect();
    focus = { x: (e.clientX - rct.left) / rct.width, y: (e.clientY - rct.top) / rct.height };
    draw();
  });
  draw();
}
