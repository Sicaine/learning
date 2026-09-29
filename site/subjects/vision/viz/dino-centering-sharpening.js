// DINO's two anti-collapse knobs on a toy teacher.
// 8 images, K = 10 output dimensions. Each image's logits = its own signal + a shared
// component that favors dimension 0 for *every* image. Teacher output:
//   P_t(x) = softmax((g(x) − c) / τ_t),  c = batch mean of logits (if centering is on)

export default function mount(stage, { complete }) {
  const B = 8, K = 10;
  let seed = 11;
  const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  const gauss = () => Math.sqrt(-2 * Math.log(rnd() + 1e-9)) * Math.cos(2 * Math.PI * rnd());
  // each image has a clear preferred dimension + noise
  const signal = Array.from({ length: B }, (_, i) => Array.from({ length: K }, (_, k) => (k === (i % (K - 1)) + 1 ? 1.2 : 0) + gauss() * 0.35));
  let tauExp = Math.log10(0.04), center = false, dominance = 2;
  const reached = new Set();

  stage.innerHTML = `
    <div class="vz">
      <div class="vz-controls">
        <div class="vz-control"><label>teacher temperature τ<sub>t</sub> <output class="o-t"></output></label><input class="r-t" type="range" min="-2" max="0.5" step="0.01"></div>
        <div class="vz-control"><label>shared bias toward dim 0 <output class="o-d"></output></label><input class="r-d" type="range" min="0" max="4" step="0.1"></div>
        <div class="vz-seg"><button data-c="0" class="on">Centering off</button><button data-c="1">Centering on</button></div>
      </div>
      <svg class="vz-svg" viewBox="0 0 470 250"></svg>
      <div class="vz-readout stats"></div>
      <div class="vz-readout goals"></div>
      <p class="vz-note"><b>Per-image entropy</b> low = each target is sharp (confident). <b>Entropy of the batch mean</b> high = different images use different dimensions. Healthy training needs <i>both</i>. (Simplification: real DINO updates the center as an EMA over batches, $c \\leftarrow 0.9\\,c + 0.1\\,\\bar g$.)</p>
    </div>`;
  const svg = stage.querySelector('svg');
  const rt = stage.querySelector('.r-t'), rd = stage.querySelector('.r-d');
  rt.value = tauExp; rd.value = dominance;

  const softmax = (v, t) => { const m = Math.max(...v.map(x => x / t)); const e = v.map(x => Math.exp(x / t - m)); const s = e.reduce((a, b) => a + b); return e.map(x => x / s); };
  const H = p => -p.reduce((a, x) => a + (x > 1e-12 ? x * Math.log(x) : 0), 0) / Math.log(K);

  function draw() {
    const tau = 10 ** tauExp;
    stage.querySelector('.o-t').textContent = tau.toFixed(3);
    stage.querySelector('.o-d').textContent = dominance.toFixed(1);
    const logits = signal.map(s => s.map((v, k) => v + (k === 0 ? dominance : 0)));
    const c = Array.from({ length: K }, (_, k) => center ? logits.reduce((a, l) => a + l[k], 0) / B : 0);
    const P = logits.map(l => softmax(l.map((v, k) => v - c[k]), tau));
    const mean = Array.from({ length: K }, (_, k) => P.reduce((a, p) => a + p[k], 0) / B);
    const hs = P.reduce((a, p) => a + H(p), 0) / B, hm = H(mean);

    let state = 'healthy';
    if (hs > 0.85) state = 'uniform';
    else if (hm < 0.3) state = 'onehot';
    else if (!(hs < 0.5 && hm > 0.75)) state = 'between';
    if (state !== 'between' && !(state === 'healthy' && dominance < 2)) reached.add(state);

    // mini bar charts: 8 images in a 4×2 grid, plus the batch mean
    const cw = 90, ch = 70, bw = cw / K;
    let html = '';
    P.forEach((p, i) => {
      const ox = 10 + (i % 4) * (cw + 12), oy = 10 + Math.floor(i / 4) * (ch + 26);
      html += `<text x="${ox}" y="${oy + 8}" font-size="9" fill="var(--muted)" font-family="Inter">image ${i + 1}</text>`;
      p.forEach((v, k) => {
        const h = v * ch;
        html += `<rect x="${ox + k * bw + 0.5}" y="${oy + 12 + ch - h}" width="${bw - 1}" height="${Math.max(0.5, h)}" rx="1" fill="${k === 0 ? 'var(--accent-2)' : 'var(--accent)'}" opacity="${0.35 + 0.65 * v}"/>`;
      });
      html += `<line x1="${ox}" y1="${oy + 12 + ch}" x2="${ox + cw}" y2="${oy + 12 + ch}" stroke="var(--line-2)"/>`;
    });
    const mx = 10 + 4 * (cw + 12) - 4;
    html += `<text x="${mx}" y="18" font-size="9" fill="var(--ink)" font-weight="600" font-family="Inter">batch mean</text>`;
    mean.forEach((v, k) => {
      const h = v * 166;
      html += `<rect x="${mx + k * 3.6}" y="${22 + 166 - h}" width="3" height="${Math.max(0.5, h)}" fill="${k === 0 ? 'var(--accent-2)' : 'var(--accent)'}"/>`;
    });
    const verdict = { uniform: 'Uniform collapse — every target is flat, nothing to learn', onehot: 'Dimension collapse — every image gets the same one-hot target', healthy: 'Healthy — sharp targets, diverse across images', between: 'In between' }[state];
    html += `<text x="235" y="243" text-anchor="middle" font-size="12" font-weight="600" font-family="Inter" fill="${state === 'healthy' ? 'var(--good)' : state === 'between' ? 'var(--muted)' : 'var(--bad)'}">${verdict}</text>`;
    svg.innerHTML = html;

    stage.querySelector('.stats').innerHTML = `
      <span class="vz-stat hl">per-image entropy<b>${hs.toFixed(2)}</b></span>
      <span class="vz-stat hl">entropy of batch mean<b>${hm.toFixed(2)}</b></span>
      <span class="vz-stat">(1 = uniform over ${K} dims, 0 = one-hot)</span>`;
    const labels = { onehot: 'Cause dimension collapse', uniform: 'Cause uniform collapse', healthy: 'Find a healthy setting with a strong shared bias (≥ 2)' };
    stage.querySelector('.goals').innerHTML = ['onehot', 'uniform', 'healthy'].map(g =>
      `<span class="vz-stat ${reached.has(g) ? 'hl' : ''}">${reached.has(g) ? '✓' : '○'} ${labels[g]}</span>`).join('');
    if (reached.size === 3) complete();
  }

  rt.oninput = () => { tauExp = +rt.value; draw(); };
  rd.oninput = () => { dominance = +rd.value; draw(); };
  stage.querySelectorAll('.vz-seg button').forEach(b => b.onclick = () => {
    center = b.dataset.c === '1';
    stage.querySelectorAll('.vz-seg button').forEach(x => x.classList.toggle('on', x === b));
    draw();
  });
  const note = stage.querySelector('.vz-note');
  if (window.katex) note.innerHTML = note.innerHTML.replace(/\$([^$]+)\$/g, (_, m) => window.katex.renderToString(m, { throwOnError: false }));
  draw();
}
