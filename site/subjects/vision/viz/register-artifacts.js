// Game: find the high-norm "artifact" tokens in a large ViT's output, then add registers.
// Synthetic but faithful to Darcet et al.: ~2% of tokens, ~10× norm, in redundant background
// patches; they hog the CLS attention. With registers the artifacts move into the extra tokens.

import { drawWatch, patchMix, rng, gauss, heat, makeCanvas, canvasPoint } from './dino-watch-scene.js';

const G = 24;

export default function mount(stage, { params, complete }) {
  const need = params.need || 6;
  let registers = false, view = 'norm';
  const found = new Set();

  // Per-patch content + "redundancy" (how similar a patch is to its neighbours).
  const r = rng(3);
  const cells = [];
  for (let j = 0; j < G; j++) for (let i = 0; i < G; i++) {
    const mix = patchMix(i / G, j / G, 1 / G, 4);
    const purity = Math.max(...mix);
    cells.push({ i, j, bg: mix[0] > 0.99, fg: mix[0] < 0.5, edge: purity < 0.9, base: 1 + 0.25 * gauss(r) * 0.4 + (purity < 0.9 ? 0.25 : 0) });
  }
  // Outliers: ~2.4% of tokens, chosen among pure background patches far from the watch.
  const bgIdx = cells.map((c, k) => (c.bg ? k : -1)).filter(k => k >= 0);
  const nOut = Math.round(G * G * 0.024);
  const outliers = new Set();
  const rr = rng(21);
  while (outliers.size < nOut) outliers.add(bgIdx[Math.floor(rr() * bgIdx.length)]);

  stage.innerHTML = `<div class="vz">
    <div class="ra-row" style="display:grid;grid-template-columns:1fr 1fr;gap:12px"></div>
    <div class="vz-controls">
      <div class="vz-seg view"><button data-v="norm" class="on">Token norms</button><button data-v="attn">CLS attention</button></div>
      <div class="vz-seg reg"><button data-r="0" class="on">No registers</button><button data-r="1">+ 4 registers</button></div>
    </div>
    <p class="vz-note legend"></p>
    <div class="vz-readout"></div>
    <p class="vz-note">Click the brightest cells in the right map — tokens whose norm is ~10× the rest. Then switch on registers.</p>
  </div>`;
  const row = stage.querySelector('.ra-row');
  const img = makeCanvas(row, 300, 300);
  const map = makeCanvas(row, 300, 336);
  drawWatch(img.g, 300, 300);

  function norms() {
    return cells.map((c, k) => (!registers && outliers.has(k) ? 10 + gauss(r) * 0.3 : c.base));
  }
  function attention() {
    // CLS attends to the object; without registers it also dumps mass on the artifacts.
    const a = cells.map((c, k) => {
      if (!registers && outliers.has(k)) return 9;
      return c.fg ? 1 + (c.edge ? 0.3 : 0.6) : 0.15;
    });
    const s = a.reduce((x, y) => x + y, 0);
    return a.map(v => v / s);
  }

  function draw() {
    const g = map.g, s = 300 / G;
    g.clearRect(0, 0, 300, 336);
    const vals = view === 'norm' ? norms() : attention();
    const max = Math.max(...vals);
    vals.forEach((v, k) => {
      const c = cells[k];
      g.fillStyle = heat(view === 'norm' ? v / 11 : Math.sqrt(v / max));
      g.fillRect(c.i * s, c.j * s, s - 0.6, s - 0.6);
      if (found.has(k) && !registers) { g.strokeStyle = '#1f9d6b'; g.lineWidth = 2; g.strokeRect(c.i * s + 1, c.j * s + 1, s - 2.6, s - 2.6); }
    });
    // extra tokens row: CLS (+ registers), labelled in the HTML legend below
    g.fillStyle = heat(view === 'norm' ? 0.12 : 0.1); g.fillRect(4, 312, 22, 20);
    if (registers) for (let k = 0; k < 4; k++) { g.fillStyle = heat(view === 'norm' ? 0.9 : 0.75); g.fillRect(40 + k * 24, 312, 20, 20); }
    stage.querySelector('.legend').textContent = registers
      ? 'Bottom row: CLS token, then the 4 register tokens — they now carry the high norms and are discarded at the output.'
      : 'Bottom row: the CLS token. No registers — the model hides its global computation in background patches.';
    const hi = vals.filter((v, k) => !registers && outliers.has(k)).length;
    stage.querySelector('.vz-readout').innerHTML = `
      <span class="vz-stat">tokens<b>${G * G}</b></span>
      <span class="vz-stat">high-norm tokens<b>${registers ? 0 : hi} (${registers ? '0' : (hi / (G * G) * 100).toFixed(1)}%)</b></span>
      <span class="vz-stat ${found.size >= need ? 'hl' : ''}">found<b>${Math.min(found.size, nOut)} / ${need}</b></span>
      ${registers ? '<span class="vz-stat hl">artifacts absorbed by registers</span>' : ''}`;
  }

  map.c.addEventListener('pointerdown', e => {
    if (registers) return;
    const p = canvasPoint(map.c, e, 300, 336), s = 300 / G;
    const i = Math.floor(p.x / s), j = Math.floor(p.y / s);
    if (j >= G) return;
    const k = j * G + i;
    if (outliers.has(k)) { found.add(k); draw(); if (found.size >= need) complete(); }
  });
  stage.querySelectorAll('.view button').forEach(b => b.onclick = () => {
    view = b.dataset.v; stage.querySelectorAll('.view button').forEach(x => x.classList.toggle('on', x === b)); draw();
  });
  stage.querySelectorAll('.reg button').forEach(b => b.onclick = () => {
    registers = b.dataset.r === '1'; stage.querySelectorAll('.reg button').forEach(x => x.classList.toggle('on', x === b)); draw();
  });
  draw();
}
