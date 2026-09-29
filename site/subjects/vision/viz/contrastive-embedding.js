// A tiny "encoder" z = normalize(W x + b) maps 8 toy images (2 augmented views each)
// onto the unit circle. Train it with InfoNCE (positives + negatives) or with the
// positive term only — and watch the second one collapse to a single point.

export default function mount(stage, { complete }) {
  const W = 420, H = 320, cx = W / 2, cy = H / 2, R = 118;
  const N = 8, D = 6, NOISE = 0.35;
  let seed = 3;
  const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  const gauss = () => Math.sqrt(-2 * Math.log(rnd() + 1e-9)) * Math.cos(2 * Math.PI * rnd());

  let X, params, views, running = false, useNeg = true, tau = 0.3, steps = 0, raf;
  const reached = new Set();

  function reset() {
    seed = 3 + Math.floor(Math.random() * 1000);
    X = Array.from({ length: N }, () => Array.from({ length: D }, gauss));
    params = Array.from({ length: 2 * D + 2 }, () => gauss() * 0.3); // W (2×D) then b (2)
    steps = 0;
    resample();
  }
  function resample() {
    views = X.map(x => [0, 1].map(() => x.map(v => v + gauss() * NOISE)));
  }
  function embed(p, x) {
    let u = p[2 * D], v = p[2 * D + 1];
    for (let j = 0; j < D; j++) { u += p[j] * x[j]; v += p[D + j] * x[j]; }
    const n = Math.hypot(u, v) || 1e-9;
    return [u / n, v / n];
  }
  function loss(p) {
    const Z = views.map(vs => vs.map(x => embed(p, x)));
    let L = 0;
    for (let i = 0; i < N; i++) for (let a = 0; a < 2; a++) {
      const zi = Z[i][a], zp = Z[i][1 - a];
      const pos = (zi[0] * zp[0] + zi[1] * zp[1]) / tau;
      if (!useNeg) { L -= pos; continue; }
      let denom = 0;
      for (let k = 0; k < N; k++) for (let c = 0; c < 2; c++) {
        if (k === i && c === a) continue;
        const zk = Z[k][c];
        denom += Math.exp((zi[0] * zk[0] + zi[1] * zk[1]) / tau);
      }
      L -= pos - Math.log(denom);
    }
    return L / (2 * N);
  }
  function step() {
    resample(); // fresh augmentations every step
    const base = loss(params), eps = 1e-4, lr = 0.08;
    const g = params.map((_, j) => { const q = params.slice(); q[j] += eps; return (loss(q) - base) / eps; });
    const gn = Math.hypot(...g) || 1;
    const scale = gn > 5 ? 5 / gn : 1; // clip
    params = params.map((v, j) => v - lr * g[j] * scale);
    steps++;
  }

  stage.innerHTML = `
    <div class="vz">
      <div class="vz-controls">
        <div class="vz-seg"><button data-n="1" class="on">InfoNCE (with negatives)</button><button data-n="0">Positives only</button></div>
        <div class="vz-control"><label>temperature τ <output>0.30</output></label><input type="range" min="0.05" max="1" step="0.05" value="0.3"></div>
      </div>
      <div class="vz-controls">
        <button class="btn small primary play">Train</button>
        <button class="btn small ghost reset">Re-initialize</button>
      </div>
      <svg class="vz-svg" viewBox="0 0 ${W} ${H}"></svg>
      <div class="vz-readout stats"></div>
      <div class="vz-readout goals"></div>
      <p class="vz-note">Each color is one image; the dot and ring are its two augmented views. The encoder is $z = \\mathrm{normalize}(Wx + b)$ — the bias $b$ gives it an easy way to output the same vector for everything.</p>
    </div>`;
  const svg = stage.querySelector('svg');

  function metrics() {
    const Z = views.map(vs => vs.map(x => embed(params, x)));
    let align = 0, mx = 0, my = 0;
    Z.forEach(([a, b]) => { align += a[0] * b[0] + a[1] * b[1]; mx += a[0] + b[0]; my += a[1] + b[1]; });
    return { Z, align: align / N, spread: 1 - Math.hypot(mx, my) / (2 * N) };
  }

  function draw() {
    const { Z, align, spread } = metrics();
    let html = `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="var(--line-2)"/>`;
    Z.forEach(([a, b], i) => {
      const col = `hsl(${(i * 360) / N} 70% 52%)`;
      const pa = [cx + a[0] * R, cy - a[1] * R], pb = [cx + b[0] * R, cy - b[1] * R];
      html += `<line x1="${pa[0]}" y1="${pa[1]}" x2="${pb[0]}" y2="${pb[1]}" stroke="${col}" stroke-width="2" opacity=".5"/>
        <circle cx="${pa[0]}" cy="${pa[1]}" r="6" fill="${col}"/>
        <circle cx="${pb[0]}" cy="${pb[1]}" r="8" fill="none" stroke="${col}" stroke-width="2.5"/>`;
    });
    svg.innerHTML = html;
    const L = loss(params);
    stage.querySelector('.stats').innerHTML = `
      <span class="vz-stat">steps<b>${steps}</b></span>
      <span class="vz-stat hl">loss<b>${L.toFixed(3)}</b></span>
      <span class="vz-stat">alignment (pos. cos)<b>${align.toFixed(2)}</b></span>
      <span class="vz-stat">spread (1 − ‖mean z‖)<b>${spread.toFixed(2)}</b></span>`;
    if (!useNeg && align > 0.97 && spread < 0.08) reached.add('collapse');
    if (useNeg && align > 0.8 && spread > 0.6) reached.add('spread');
    const labels = { spread: 'With negatives: views aligned (> 0.8) and images spread out (> 0.6)', collapse: 'Positives only: reach collapse (spread < 0.08)' };
    stage.querySelector('.goals').innerHTML = ['spread', 'collapse'].map(g =>
      `<span class="vz-stat ${reached.has(g) ? 'hl' : ''}">${reached.has(g) ? '✓' : '○'} ${labels[g]}</span>`).join('');
    if (reached.size === 2) complete();
  }

  function loop() {
    if (!running || !document.body.contains(stage)) { running = false; return; }
    for (let i = 0; i < 3; i++) step();
    draw();
    raf = requestAnimationFrame(loop);
  }
  const play = stage.querySelector('.play');
  play.onclick = () => { running = !running; play.textContent = running ? 'Pause' : 'Train'; if (running) loop(); };
  stage.querySelector('.reset').onclick = () => { reset(); draw(); };
  stage.querySelectorAll('.vz-seg button').forEach(b => b.onclick = () => {
    useNeg = b.dataset.n === '1';
    stage.querySelectorAll('.vz-seg button').forEach(x => x.classList.toggle('on', x === b));
    draw();
  });
  const range = stage.querySelector('input[type=range]');
  range.oninput = () => { tau = +range.value; stage.querySelector('output').textContent = tau.toFixed(2); draw(); };

  // render the KaTeX in the note
  const note = stage.querySelector('.vz-note');
  if (window.katex) note.innerHTML = note.innerHTML.replace(/\$([^$]+)\$/g, (_, m) => window.katex.renderToString(m.replace(/\\\\/g, '\\'), { throwOnError: false }));
  reset();
  draw();
}
