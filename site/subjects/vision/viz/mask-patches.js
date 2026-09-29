// Masked image modeling on a procedurally drawn watch: choose patch size, masking
// ratio and strategy; see how many tokens the encoder actually processes.
// params.goal: { patch, ratio } completes the task when matched (default MAE: 16 / 75%).

export default function mount(stage, { params, complete }) {
  const IMG = 224, SCALE = 2;
  const goal = params.goal || { patch: 16, ratio: 75 };
  let patch = 16, ratio = 50, strategy = 'random', mask = [], seed = 1;

  stage.innerHTML = `
    <div class="vz">
      <div class="vz-controls">
        <div class="vz-seg sz">${[14, 16, 32].map(p => `<button data-p="${p}" class="${p === patch ? 'on' : ''}">patch ${p}</button>`).join('')}</div>
        <div class="vz-seg st"><button data-s="random" class="on">random</button><button data-s="block">block-wise</button></div>
        <button class="btn small ghost again">Resample mask</button>
      </div>
      <div class="vz-control"><label>masking ratio <output>50%</output></label><input type="range" min="0" max="95" step="5" value="50"></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div><canvas class="c-in" width="${IMG * SCALE}" height="${IMG * SCALE}"></canvas><p class="vz-note" style="text-align:center;margin:6px 0 0">what the encoder sees</p></div>
        <div><canvas class="c-full" width="${IMG * SCALE}" height="${IMG * SCALE}"></canvas><p class="vz-note" style="text-align:center;margin:6px 0 0">the full image (reconstruction target)</p></div>
      </div>
      <div class="vz-readout stats"></div>
      <div class="vz-readout goals"></div>
    </div>`;

  const full = document.createElement('canvas');
  full.width = full.height = IMG * SCALE;
  drawWatch(full.getContext('2d'), IMG * SCALE);
  stage.querySelector('.c-full').getContext('2d').drawImage(full, 0, 0);

  const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };

  function makeMask() {
    const g = Math.floor(IMG / patch), n = g * g, m = Math.round(n * ratio / 100);
    mask = new Array(n).fill(false);
    if (strategy === 'random') {
      const idx = [...Array(n).keys()];
      for (let i = n - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; }
      idx.slice(0, m).forEach(i => { mask[i] = true; });
    } else {
      // BEiT/iBOT-style: mask rectangular blocks until the target count is reached
      let count = 0, guard = 0;
      while (count < m && guard++ < 1000) {
        const bw = 1 + Math.floor(rnd() * Math.max(1, g / 3)), bh = 1 + Math.floor(rnd() * Math.max(1, g / 3));
        const x0 = Math.floor(rnd() * (g - bw + 1)), y0 = Math.floor(rnd() * (g - bh + 1));
        for (let y = y0; y < y0 + bh; y++) for (let x = x0; x < x0 + bw; x++) {
          if (!mask[y * g + x] && count < m) { mask[y * g + x] = true; count++; }
        }
      }
    }
  }

  function draw() {
    const g = Math.floor(IMG / patch), n = g * g, masked = mask.filter(Boolean).length, vis = n - masked;
    const c = stage.querySelector('.c-in'), ctx = c.getContext('2d'), P = patch * SCALE;
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.drawImage(full, 0, 0);
    for (let i = 0; i < n; i++) {
      const x = (i % g) * P, y = Math.floor(i / g) * P;
      if (mask[i]) { ctx.fillStyle = '#e4e4ee'; ctx.fillRect(x, y, P, P); }
      ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 1; ctx.strokeRect(x + .5, y + .5, P - 1, P - 1);
    }
    const cost = n ? (vis * vis) / (n * n) : 0;
    stage.querySelector('output').textContent = `${ratio}%`;
    stage.querySelector('.stats').innerHTML = `
      <span class="vz-stat">grid<b>${g}×${g}</b></span>
      <span class="vz-stat">patches N<b>${n}</b></span>
      <span class="vz-stat hl">visible → encoder<b>${vis}</b></span>
      <span class="vz-stat">masked → predict<b>${masked}</b></span>
      <span class="vz-stat">attention cost vs. full<b>${(cost * 100).toFixed(1)}%</b></span>`;
    const ok = patch === goal.patch && ratio === goal.ratio;
    stage.querySelector('.goals').innerHTML = `<span class="vz-stat ${ok ? 'hl' : ''}">${ok ? '✓' : '○'} Set up MAE's default: patch ${goal.patch}, ${goal.ratio}% masked</span>`;
    if (ok) complete();
  }

  stage.querySelectorAll('.sz button').forEach(b => b.onclick = () => {
    patch = +b.dataset.p; stage.querySelectorAll('.sz button').forEach(x => x.classList.toggle('on', x === b)); makeMask(); draw();
  });
  stage.querySelectorAll('.st button').forEach(b => b.onclick = () => {
    strategy = b.dataset.s; stage.querySelectorAll('.st button').forEach(x => x.classList.toggle('on', x === b)); makeMask(); draw();
  });
  stage.querySelector('.again').onclick = () => { seed = Math.floor(Math.random() * 1e6) + 1; makeMask(); draw(); };
  const range = stage.querySelector('input[type=range]');
  range.oninput = () => { ratio = +range.value; makeMask(); draw(); };
  makeMask();
  draw();
}

function drawWatch(ctx, S) {
  const c = S / 2;
  const bg = ctx.createLinearGradient(0, 0, S, S);
  bg.addColorStop(0, '#d9d4cc'); bg.addColorStop(1, '#a9a198');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, S, S);
  // strap
  ctx.fillStyle = '#5a3b26';
  ctx.fillRect(c - S * 0.17, 0, S * 0.34, S);
  ctx.strokeStyle = 'rgba(255,255,255,.25)'; ctx.setLineDash([6, 6]); ctx.lineWidth = 2;
  ctx.strokeRect(c - S * 0.15, -10, S * 0.30, S + 20); ctx.setLineDash([]);
  // lugs
  ctx.fillStyle = '#c9ccd2';
  [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sy]) => ctx.fillRect(c + sx * S * 0.2 - S * 0.03, c + sy * S * 0.33 - S * 0.06, S * 0.06, S * 0.12));
  // crown
  ctx.fillStyle = '#b8bcc4'; ctx.fillRect(c + S * 0.36, c - S * 0.045, S * 0.07, S * 0.09);
  // case + bezel
  const cg = ctx.createRadialGradient(c - S * 0.1, c - S * 0.1, S * 0.05, c, c, S * 0.4);
  cg.addColorStop(0, '#f4f5f7'); cg.addColorStop(1, '#9ea3ab');
  ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(c, c, S * 0.38, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#1d2a4a'; ctx.beginPath(); ctx.arc(c, c, S * 0.34, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#fff';
  for (let i = 0; i < 60; i++) {
    if (i % 5) continue;
    const a = i * Math.PI / 30;
    ctx.save(); ctx.translate(c + Math.sin(a) * S * 0.315, c - Math.cos(a) * S * 0.315); ctx.rotate(a);
    ctx.fillRect(-S * 0.006, -S * 0.012, S * 0.012, S * 0.024); ctx.restore();
  }
  // dial
  const dg = ctx.createRadialGradient(c, c - S * 0.08, S * 0.02, c, c, S * 0.29);
  dg.addColorStop(0, '#2f5c8f'); dg.addColorStop(1, '#10233f');
  ctx.fillStyle = dg; ctx.beginPath(); ctx.arc(c, c, S * 0.28, 0, Math.PI * 2); ctx.fill();
  for (let i = 0; i < 12; i++) {
    const a = i * Math.PI / 6;
    ctx.save(); ctx.translate(c + Math.sin(a) * S * 0.24, c - Math.cos(a) * S * 0.24); ctx.rotate(a);
    ctx.fillStyle = '#f0f0f0'; ctx.fillRect(-S * 0.008, -S * 0.025, S * 0.016, S * 0.05); ctx.restore();
  }
  // date window
  ctx.fillStyle = '#fff'; ctx.fillRect(c + S * 0.14, c - S * 0.022, S * 0.06, S * 0.044);
  ctx.fillStyle = '#111'; ctx.font = `bold ${S * 0.032}px Inter, sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('14', c + S * 0.17, c + S * 0.002);
  // hands
  const hand = (a, len, w, col) => { ctx.save(); ctx.translate(c, c); ctx.rotate(a); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(-w, S * 0.03); ctx.lineTo(0, -len); ctx.lineTo(w, S * 0.03); ctx.closePath(); ctx.fill(); ctx.restore(); };
  hand(-0.9, S * 0.16, S * 0.016, '#e9e9e9');
  hand(1.05, S * 0.23, S * 0.011, '#e9e9e9');
  hand(2.6, S * 0.25, S * 0.003, '#e8542f');
  ctx.fillStyle = '#e8542f'; ctx.beginPath(); ctx.arc(c, c, S * 0.012, 0, Math.PI * 2); ctx.fill();
}
