// Polynomial fits of increasing degree to noisy data: training error vs validation error.
// Goals: find an overfitting degree, then the degree with the lowest validation error.

export default function mount(stage, { params, complete }) {
  const W = 420, H = 250, MAXD = 12;
  let deg = 1, many = false, lam = 0;
  const reached = new Set();
  const truth = x => 0.8 * Math.sin(2.5 * x) + 0.3 * x;
  let seed = 7;
  const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  const gauss = () => Math.sqrt(-2 * Math.log(rnd() + 1e-12)) * Math.cos(2 * Math.PI * rnd());
  const sample = n => Array.from({ length: n }, () => { const x = rnd() * 2 - 1; return [x, truth(x) + 0.22 * gauss()]; });
  const trainFew = sample(12), trainMany = sample(80), val = sample(60);

  stage.innerHTML = `
    <div class="vz">
      <svg class="vz-svg fit" viewBox="0 0 ${W} ${H}"></svg>
      <div class="vz-controls">
        <div class="vz-control"><label>Polynomial degree (model capacity) <output class="od"></output></label><input type="range" class="deg" min="0" max="${MAXD}" value="1"></div>
        <div class="vz-control"><label>Weight decay λ <output class="ol"></output></label><input type="range" class="lam" min="-7" max="0" step="0.1" value="-7"></div>
      </div>
      <div class="vz-seg data"><button data-many="0" class="on">12 training points</button><button data-many="1">80 training points</button></div>
      <svg class="vz-svg curve" viewBox="0 0 ${W} 150"></svg>
      <div class="vz-readout"></div>
      <div class="vz-readout goals"></div>
    </div>`;

  // Legendre basis on [-1, 1] keeps the least-squares problem well conditioned.
  const basis = (x, d) => { const P = [1, x]; for (let n = 1; n < d; n++) P.push(((2 * n + 1) * x * P[n] - n * P[n - 1]) / (n + 1)); return P.slice(0, d + 1); };
  function fit(data, d, l) {
    const n = d + 1, A = Array.from({ length: n }, () => new Array(n + 1).fill(0));
    for (const [x, y] of data) { const b = basis(x, d); for (let i = 0; i < n; i++) { for (let j = 0; j < n; j++) A[i][j] += b[i] * b[j]; A[i][n] += b[i] * y; } }
    for (let i = 0; i < n; i++) A[i][i] += l * data.length + 1e-9;
    for (let c = 0; c < n; c++) { let p = c; for (let r = c + 1; r < n; r++) if (Math.abs(A[r][c]) > Math.abs(A[p][c])) p = r; [A[c], A[p]] = [A[p], A[c]];
      for (let r = 0; r < n; r++) if (r !== c) { const f = A[r][c] / A[c][c]; for (let k = c; k <= n; k++) A[r][k] -= f * A[c][k]; } }
    const w = A.map((row, i) => row[n] / row[i]);
    return x => basis(x, d).reduce((s, b, i) => s + b * w[i], 0);
  }
  const mse = (f, data) => data.reduce((s, [x, y]) => s + (f(x) - y) ** 2, 0) / data.length;
  const X = x => (x + 1.05) / 2.1 * W, Y = y => H / 2 - y * (H / 3.2);

  function draw() {
    const train = many ? trainMany : trainFew;
    const f = fit(train, deg, lam);
    const errs = Array.from({ length: MAXD + 1 }, (_, d) => { const g = fit(train, d, lam); return [mse(g, train), mse(g, val)]; });
    const best = errs.reduce((b, e, d) => (e[1] < errs[b][1] ? d : b), 0);
    const pts = [];
    for (let i = 0; i <= 200; i++) { const x = -1 + i / 100; pts.push(`${X(x).toFixed(1)},${Math.max(-20, Math.min(H + 20, Y(f(x)))).toFixed(1)}`); }
    const tpts = []; for (let i = 0; i <= 100; i++) { const x = -1 + i / 50; tpts.push(`${X(x)},${Y(truth(x))}`); }
    stage.querySelector('.fit').innerHTML = `
      <polyline points="${tpts.join(' ')}" fill="none" stroke="var(--muted)" stroke-dasharray="4 4" stroke-width="1.5"/>
      ${val.map(([x, y]) => `<circle cx="${X(x)}" cy="${Y(y)}" r="3" fill="none" stroke="var(--accent-2)" stroke-width="1.4"/>`).join('')}
      ${train.map(([x, y]) => `<circle cx="${X(x)}" cy="${Y(y)}" r="3.6" fill="var(--ink)"/>`).join('')}
      <polyline points="${pts.join(' ')}" fill="none" stroke="var(--accent)" stroke-width="3" stroke-linejoin="round"/>
      <text x="10" y="18" font-size="11.5" font-family="Inter" fill="var(--ink-2)">● training   ○ validation   ┅ true function</text>`;
    // error-vs-degree chart (log scale)
    const lx = d => 30 + d * (W - 50) / MAXD, ly = e => 130 - (Math.log10(e) + 2.3) / 2.6 * 115;
    const line = (k, color) => `<polyline points="${errs.map((e, d) => `${lx(d)},${Math.max(4, Math.min(140, ly(e[k])))}`).join(' ')}" fill="none" stroke="${color}" stroke-width="2.4"/>`;
    stage.querySelector('.curve').innerHTML = `
      <line x1="${lx(deg)}" y1="4" x2="${lx(deg)}" y2="138" stroke="var(--line-2)" stroke-width="10" opacity=".6"/>
      ${line(0, 'var(--ink)')}${line(1, 'var(--accent-2)')}
      ${Array.from({ length: MAXD + 1 }, (_, d) => `<text x="${lx(d)}" y="148" font-size="9.5" text-anchor="middle" fill="var(--muted)" font-family="Inter">${d}</text>`).join('')}
      <text x="30" y="14" font-size="11" fill="var(--ink-2)" font-family="Inter">error (log) vs degree —  <tspan fill="var(--ink)">training</tspan>  ·  <tspan fill="var(--accent-2)">validation</tspan></text>`;
    const [tr, va] = errs[deg];
    if (deg >= 8 && va > 2 * tr && !many && lam < 1e-5) reached.add('overfit');
    if (deg === best && reached.has('overfit')) reached.add('sweet');
    stage.querySelector('.od').textContent = deg;
    stage.querySelector('.ol').textContent = lam ? lam.toExponential(1) : '0';
    stage.querySelector('.vz-readout').innerHTML = `
      <span class="vz-stat">train MSE<b>${tr.toFixed(4)}</b></span>
      <span class="vz-stat hl">validation MSE<b>${va.toFixed(4)}</b></span>
      <span class="vz-stat">gap<b>${(va - tr).toFixed(4)}</b></span>
      <span class="vz-stat">${deg < 3 ? 'underfitting: too simple' : va > 2 * tr ? 'overfitting: memorizing noise' : 'reasonable'}</span>`;
    const gl = { overfit: 'With 12 points and λ≈0, find a degree ≥ 8 that clearly overfits', sweet: 'Then find the degree with the lowest validation error' };
    stage.querySelector('.goals').innerHTML = ['overfit', 'sweet'].map(g => `<span class="vz-stat ${reached.has(g) ? 'hl' : ''}">${reached.has(g) ? '✓' : '○'} ${gl[g]}</span>`).join('');
    if (reached.has('sweet')) complete();
  }
  stage.querySelector('.deg').oninput = e => { deg = +e.target.value; draw(); };
  stage.querySelector('.lam').oninput = e => { const v = +e.target.value; lam = v <= -7 ? 0 : 10 ** v; draw(); };
  stage.querySelectorAll('.data button').forEach(b => b.onclick = () => { many = b.dataset.many === '1'; stage.querySelectorAll('.data button').forEach(x => x.classList.toggle('on', x === b)); draw(); });
  draw();
}
