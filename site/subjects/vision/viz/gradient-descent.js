// Gradient descent on an elongated valley f(x,y) = ½(x² + κ·y²).
// Learning rate + momentum sliders, click to choose the start. Goals: converge, diverge.

export default function mount(stage, { params, complete }) {
  const W = 420, H = 300, R = 3.2; // world coords x∈[-R,R], y∈[-R*H/W, ..]
  const kappa = params.kappa ?? 8;
  const goals = params.goals || ['converge', 'diverge'];
  const reached = new Set();
  let lr = params.lr ?? 0.02, mom = 0, start = [-2.8, 1.4], path = [], timer = null;
  const f = (x, y) => 0.5 * (x * x + kappa * y * y);
  const grad = (x, y) => [x, kappa * y];
  const sx = x => W / 2 + x / R * (W / 2), sy = y => H / 2 - y / R * (W / 2);

  stage.innerHTML = `
    <div class="vz">
      <div style="position:relative">
        <canvas width="${W * 2}" height="${H * 2}" style="aspect-ratio:${W}/${H}"></canvas>
        <svg class="overlay" viewBox="0 0 ${W} ${H}" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none"></svg>
      </div>
      <div class="vz-controls">
        <div class="vz-control"><label>Learning rate η <output class="o-lr"></output></label><input type="range" class="lr" min="-3" max="-0.52" step="0.01"></div>
        <div class="vz-control"><label>Momentum β <output class="o-m"></output></label><input type="range" class="mom" min="0" max="0.95" step="0.05" value="0"></div>
        <button class="btn primary small run">Run 60 steps</button>
      </div>
      <div class="vz-readout"></div>
      <div class="vz-readout goals"></div>
      <p class="vz-note">Click anywhere on the map to set a new starting point. Darker = lower loss. The valley is ${kappa}× steeper across (y) than along (x), like real loss surfaces where some weights matter far more than others.</p>
    </div>`;
  const canvas = stage.querySelector('canvas');
  const ctx2 = canvas.getContext('2d');
  const ov = stage.querySelector('.overlay');

  // heatmap + contours once
  const img = ctx2.createImageData(W * 2, H * 2);
  const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#5b5bd6';
  const [ar, ag, ab] = hex(accent);
  for (let py = 0; py < H * 2; py++) for (let px = 0; px < W * 2; px++) {
    const x = (px / 2 - W / 2) / (W / 2) * R, y = -(py / 2 - H / 2) / (W / 2) * R;
    const v = Math.log1p(f(x, y));
    const t = Math.min(1, v / 4);
    const band = Math.abs((v * 4) % 1 - 0.5) < 0.04 ? 0.12 : 0;
    const k = (1 - t) * 0.55 + band;
    const i = (py * W * 2 + px) * 4;
    img.data[i] = 255 - (255 - ar) * k; img.data[i + 1] = 255 - (255 - ag) * k; img.data[i + 2] = 255 - (255 - ab) * k; img.data[i + 3] = 255;
  }
  ctx2.putImageData(img, 0, 0);

  function hex(c) { const m = c.replace('#', '').match(/.{2}/g); return m ? m.map(h => parseInt(h, 16)) : [91, 91, 214]; }

  function simulate() {
    let [x, y] = start, v = [0, 0];
    path = [[x, y]];
    for (let i = 0; i < 60; i++) {
      const g = grad(x, y);
      v = [mom * v[0] + g[0], mom * v[1] + g[1]];
      x -= lr * v[0]; y -= lr * v[1];
      path.push([x, y]);
      if (!isFinite(x) || Math.abs(x) > 1e6 || Math.abs(y) > 1e6) break;
    }
  }

  function draw(n = path.length) {
    const pts = path.slice(0, n);
    const clip = v => Math.max(-50, Math.min(W + 50, v));
    ov.innerHTML = `
      <polyline points="${pts.map(([x, y]) => `${clip(sx(x)).toFixed(1)},${clip(sy(y)).toFixed(1)}`).join(' ')}" fill="none" stroke="var(--accent-2)" stroke-width="2" stroke-linejoin="round"/>
      ${pts.map(([x, y], i) => `<circle cx="${clip(sx(x))}" cy="${clip(sy(y))}" r="${i ? 2.6 : 5}" fill="${i ? 'var(--accent-2)' : 'var(--ink)'}"/>`).join('')}
      <circle cx="${sx(0)}" cy="${sy(0)}" r="4" fill="none" stroke="var(--ink)" stroke-width="1.5"/>`;
    const last = pts[pts.length - 1];
    const loss = f(...last);
    const done = n >= path.length;
    const diverged = !isFinite(loss) || loss > 1e3;
    if (done && loss < 0.01) reached.add('converge');
    if (done && diverged) reached.add('diverge');
    stage.querySelector('.vz-readout').innerHTML = `
      <span class="vz-stat">step<b>${pts.length - 1}</b></span>
      <span class="vz-stat hl">loss<b>${diverged ? '∞ (diverged)' : loss.toFixed(4)}</b></span>
      <span class="vz-stat">η·κ =<b>${(lr * kappa).toFixed(2)}</b></span>
      <span class="vz-stat">${lr * kappa > 2 && mom === 0 ? 'η·κ > 2 → overshoots across the valley' : lr < 0.02 ? 'tiny steps — slow' : 'stable'}</span>`;
    const labels = { converge: 'Reach loss < 0.01 within 60 steps', diverge: 'Make it diverge (η too large)' };
    stage.querySelector('.goals').innerHTML = goals.map(g => `<span class="vz-stat ${reached.has(g) ? 'hl' : ''}">${reached.has(g) ? '✓' : '○'} ${labels[g]}</span>`).join('');
    if (goals.every(g => reached.has(g))) complete();
  }

  function run() {
    clearInterval(timer);
    simulate();
    let n = 1;
    timer = setInterval(() => { n++; draw(n); if (n >= path.length || !document.body.contains(stage)) clearInterval(timer); }, 45);
  }

  const lrIn = stage.querySelector('.lr'), mIn = stage.querySelector('.mom');
  lrIn.value = Math.log10(lr);
  const sync = () => {
    lr = 10 ** +lrIn.value; mom = +mIn.value;
    stage.querySelector('.o-lr').textContent = lr.toFixed(3);
    stage.querySelector('.o-m').textContent = mom.toFixed(2);
    simulate(); draw();
  };
  lrIn.oninput = sync; mIn.oninput = sync;
  stage.querySelector('.run').onclick = run;
  canvas.addEventListener('click', e => {
    const r = canvas.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width * W, py = (e.clientY - r.top) / r.height * H;
    start = [(px - W / 2) / (W / 2) * R, -(py - H / 2) / (W / 2) * R];
    run();
  });
  sync();
}
