// Active learning game: label points with a limited budget; compare random vs
// uncertainty vs diverse (core-set-like) picks. Classifier: k-NN on labeled points.
// params.budget (default 40), params.target accuracy (default 0.9)

function rng(seed) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }

export default function mount(stage, { params, complete }) {
  const budget = params.budget ?? 40, target = params.target ?? 0.9;
  const W = 460, H = 300;
  const r = rng(11);
  // Two classes with a curvy boundary plus a small separate island (rare case).
  const truth = (x, y) => (y > 0.5 + 0.18 * Math.sin(x * 9) ? 1 : 0) ^ (Math.hypot(x - 0.83, y - 0.2) < 0.08 ? 1 : 0);
  const pts = Array.from({ length: 500 }, () => { const x = r(), y = r(); return { x, y, c: truth(x, y), l: false }; });
  let labeled = [], done = false;
  const history = { random: [], uncertain: [], diverse: [], you: [] };

  stage.innerHTML = `
    <div class="vz">
      <canvas width="${W * 2}" height="${H * 2}" style="aspect-ratio:${W}/${H}"></canvas>
      <div class="vz-controls">
        <button class="btn small" data-s="random">+5 random</button>
        <button class="btn small" data-s="uncertain">+5 most uncertain</button>
        <button class="btn small" data-s="diverse">+5 most diverse</button>
        <button class="btn small ghost" data-reset>Reset</button>
      </div>
      <div class="vz-readout"></div>
      <canvas class="curve" width="${W * 2}" height="${140 * 2}" style="aspect-ratio:${W}/140"></canvas>
      <p class="vz-note">Click points on the map to label them yourself, or use a strategy. Shaded background = the k-NN model's current prediction. Curve: accuracy vs. labels used for each strategy (a strategy's curve is simulated automatically when you first use it).</p>
    </div>`;
  const cv = stage.querySelector('canvas'), g = cv.getContext('2d');
  const cc = stage.querySelector('.curve'), gc = cc.getContext('2d');

  function predict(x, y, L) {
    if (!L.length) return { p: 0.5 };
    const d = L.map(q => [(q.x - x) ** 2 + (q.y - y) ** 2, q.c]).sort((a, b) => a[0] - b[0]).slice(0, 3);
    let w0 = 0, w1 = 0;
    for (const [dd, c] of d) { const w = 1 / (Math.sqrt(dd) + 0.02); if (c) w1 += w; else w0 += w; }
    return { p: w1 / (w0 + w1) };
  }
  const accuracy = L => pts.filter(q => (predict(q.x, q.y, L).p > 0.5 ? 1 : 0) === q.c).length / pts.length;

  function pick(strategy, L, k = 5) {
    const pool = pts.filter(q => !L.includes(q));
    if (strategy === 'random' || L.length < 2) {
      const rr = rng(L.length * 31 + 5);
      return pool.map(q => [rr(), q]).sort((a, b) => a[0] - b[0]).slice(0, k).map(x => x[1]);
    }
    if (strategy === 'uncertain') {
      return pool.map(q => [Math.abs(predict(q.x, q.y, L).p - 0.5), q]).sort((a, b) => a[0] - b[0]).slice(0, k).map(x => x[1]);
    }
    // diverse: greedy farthest-point from labeled set (core-set flavour)
    const chosen = [];
    for (let i = 0; i < k; i++) {
      let best = null, bd = -1;
      for (const q of pool) {
        if (chosen.includes(q)) continue;
        let md = Infinity;
        for (const s of L.concat(chosen)) md = Math.min(md, (s.x - q.x) ** 2 + (s.y - q.y) ** 2);
        if (md > bd) { bd = md; best = q; }
      }
      chosen.push(best);
    }
    return chosen;
  }

  function seedSet() { return [pts.find(q => q.c === 0), pts.find(q => q.c === 1)]; }

  function simulate(strategy) {
    if (history[strategy].length) return;
    let L = seedSet();
    history[strategy].push([L.length, accuracy(L)]);
    while (L.length < 80) { L = L.concat(pick(strategy, L)); history[strategy].push([L.length, accuracy(L)]); }
  }

  function draw() {
    const css = getComputedStyle(stage);
    const accent = css.getPropertyValue('--accent').trim() || '#5b5bd6';
    g.setTransform(2, 0, 0, 2, 0, 0);
    const step = 10;
    for (let x = 0; x < W; x += step) for (let y = 0; y < H; y += step) {
      const p = predict((x + step / 2) / W, 1 - (y + step / 2) / H, labeled).p;
      g.fillStyle = p > 0.5 ? `rgba(227,155,59,${0.08 + (p - 0.5) * 0.3})` : `rgba(91,91,214,${0.08 + (0.5 - p) * 0.3})`;
      g.fillRect(x, y, step, step);
    }
    for (const q of pts) {
      g.beginPath(); g.arc(q.x * W, (1 - q.y) * H, labeled.includes(q) ? 5 : 2.2, 0, 7);
      g.fillStyle = labeled.includes(q) ? (q.c ? '#e39b3b' : accent) : 'rgba(22,22,42,.28)';
      g.fill();
      if (labeled.includes(q)) { g.strokeStyle = '#fff'; g.lineWidth = 1.5; g.stroke(); }
    }
    const acc = accuracy(labeled);
    const ok = acc >= target && labeled.length <= budget;
    stage.querySelector('.vz-readout').innerHTML = `
      <span class="vz-stat">labels used<b>${labeled.length} / ${budget}</b></span>
      <span class="vz-stat hl">accuracy on all 500<b>${(acc * 100).toFixed(1)}%</b></span>
      <span class="vz-stat ${ok ? 'hl' : ''}">${ok ? '✓' : '○'} goal: ≥ ${target * 100}% with ≤ ${budget} labels</span>`;
    if (!done && ok) { done = true; complete(); }
    drawCurve();
  }

  function drawCurve() {
    const CW = W, CH = 140, pad = 26;
    gc.setTransform(2, 0, 0, 2, 0, 0);
    gc.clearRect(0, 0, CW, CH);
    gc.strokeStyle = 'rgba(0,0,0,.12)'; gc.fillStyle = 'rgba(22,22,42,.55)'; gc.font = '10px Inter, sans-serif';
    gc.beginPath(); gc.moveTo(pad, 6); gc.lineTo(pad, CH - pad); gc.lineTo(CW - 6, CH - pad); gc.stroke();
    const X = n => pad + (n / 80) * (CW - pad - 10), Y = a => CH - pad - ((a - 0.5) / 0.5) * (CH - pad - 8);
    gc.fillText('50%', 2, Y(0.5) + 3); gc.fillText('100%', 0, Y(1) + 8); gc.fillText('labels →', CW - 50, CH - 8);
    gc.setLineDash([3, 3]); gc.beginPath(); gc.moveTo(X(budget), 6); gc.lineTo(X(budget), CH - pad); gc.moveTo(pad, Y(target)); gc.lineTo(CW - 6, Y(target)); gc.stroke(); gc.setLineDash([]);
    const colors = { random: '#9a9ab0', uncertain: '#e39b3b', diverse: '#1f9d6b', you: getComputedStyle(stage).getPropertyValue('--accent').trim() || '#5b5bd6' };
    let lx = pad + 8;
    for (const [k, h] of Object.entries(history)) {
      if (!h.length) continue;
      gc.strokeStyle = colors[k]; gc.lineWidth = k === 'you' ? 2.5 : 1.8;
      gc.beginPath(); h.forEach(([n, a], i) => i ? gc.lineTo(X(n), Y(a)) : gc.moveTo(X(n), Y(a))); gc.stroke();
      gc.fillStyle = colors[k]; gc.fillText(k, lx, 14); lx += 62;
    }
    gc.lineWidth = 1;
  }

  const record = () => { history.you.push([labeled.length, accuracy(labeled)]); };
  stage.querySelectorAll('[data-s]').forEach(b => b.addEventListener('click', () => {
    if (!labeled.length) { labeled = seedSet(); record(); }
    simulate(b.dataset.s);
    labeled = labeled.concat(pick(b.dataset.s, labeled));
    record(); draw();
  }));
  stage.querySelector('[data-reset]').addEventListener('click', () => { labeled = []; history.you = []; draw(); });
  cv.addEventListener('click', e => {
    const rc = cv.getBoundingClientRect();
    const x = (e.clientX - rc.left) / rc.width, y = 1 - (e.clientY - rc.top) / rc.height;
    let best = null, bd = Infinity;
    for (const q of pts) { const d = (q.x - x) ** 2 + (q.y - y) ** 2; if (d < bd && !labeled.includes(q)) { bd = d; best = q; } }
    if (best && bd < 0.002) { labeled.push(best); record(); draw(); }
  });
  draw();
}
