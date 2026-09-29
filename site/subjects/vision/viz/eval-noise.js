// How big must the evaluation set be? Paired comparison of two models:
// observed mIoU difference ~ Normal(Δ, σd/√n). Shows the chance the eval set
// ranks the models correctly. params.goal: { delta, prob } (default 1 point, 95%).

function phi(x) { // standard normal CDF (Abramowitz–Stegun)
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.3989423 * Math.exp(-x * x / 2);
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return x > 0 ? 1 - p : p;
}

export default function mount(stage, { params, complete }) {
  const goal = params.goal || { delta: 1, prob: 0.95 };
  const s = { n: 50, delta: 1, sigma: 10 };
  const W = 460, H = 200;
  let done = false;
  stage.innerHTML = `
    <div class="vz">
      <svg class="vz-svg" viewBox="0 0 ${W} ${H}"></svg>
      <div class="vz-controls">
        <div class="vz-control"><label>Eval images n <output data-o="n"></output></label><input type="range" data-k="n" min="10" max="2000" step="10"></div>
        <div class="vz-control"><label>True improvement Δ (mIoU points) <output data-o="delta"></output></label><input type="range" data-k="delta" min="0.2" max="5" step="0.1"></div>
        <div class="vz-control"><label>Per-image spread σ of the difference <output data-o="sigma"></output></label><input type="range" data-k="sigma" min="2" max="25" step="1"></div>
      </div>
      <div class="vz-readout"></div>
      <p class="vz-note">Curve: the distribution of the mIoU difference you would <i>observe</i> on a random eval set of n images. Red area: the eval set says the worse model wins. σ is how much the per-image IoU difference between the two models varies — on hard, diverse watch photos 8–15 points is realistic.</p>
    </div>`;
  const svg = stage.querySelector('svg');

  function draw() {
    const se = s.sigma / Math.sqrt(s.n);
    const pCorrect = phi(s.delta / se);
    const lo = Math.min(-4, s.delta - 4 * se), hi = Math.max(s.delta + 4 * se, 4);
    const X = v => 20 + (v - lo) / (hi - lo) * (W - 40);
    const pdf = v => Math.exp(-((v - s.delta) ** 2) / (2 * se * se));
    const pts = [];
    for (let i = 0; i <= 200; i++) { const v = lo + (hi - lo) * i / 200; pts.push([X(v), H - 30 - pdf(v) * (H - 50)]); }
    const line = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join('');
    const neg = pts.filter(p => p[0] <= X(0));
    const negPath = neg.length ? `M${neg[0][0]},${H - 30}` + neg.map(p => `L${p[0].toFixed(1)},${p[1].toFixed(1)}`).join('') + `L${X(0)},${H - 30}Z` : '';
    const ticks = [];
    const stepT = (hi - lo) > 12 ? 2 : 1;
    for (let v = Math.ceil(lo / stepT) * stepT; v <= hi; v += stepT) ticks.push(`<line x1="${X(v)}" x2="${X(v)}" y1="${H - 30}" y2="${H - 25}" stroke="var(--muted)"/><text x="${X(v)}" y="${H - 12}" text-anchor="middle" font-size="10" fill="var(--muted)">${v}</text>`);
    svg.innerHTML = `
      <path d="${line}L${X(hi)},${H - 30}L${X(lo)},${H - 30}Z" fill="color-mix(in oklab, var(--accent) 14%, transparent)"/>
      ${negPath ? `<path d="${negPath}" fill="rgba(212,81,61,.35)"/>` : ''}
      <path d="${line}" fill="none" stroke="var(--accent)" stroke-width="2"/>
      <line x1="${X(0)}" x2="${X(0)}" y1="12" y2="${H - 30}" stroke="var(--ink)" stroke-dasharray="4 3"/>
      <text x="${X(0) + 4}" y="20" font-size="10" fill="var(--ink-2)">no difference</text>
      <line x1="${X(s.delta)}" x2="${X(s.delta)}" y1="12" y2="${H - 30}" stroke="var(--accent)" stroke-width="1"/>
      <text x="${X(s.delta) + 4}" y="34" font-size="10" fill="var(--accent)">true Δ</text>
      <line x1="20" x2="${W - 20}" y1="${H - 30}" y2="${H - 30}" stroke="var(--line-2)"/>
      ${ticks.join('')}
      <text x="${W - 20}" y="${H - 1}" text-anchor="end" font-size="10" fill="var(--muted)">observed mIoU difference (points)</text>`;
    const nNeeded = Math.ceil((1.645 * s.sigma / s.delta) ** 2);
    const ci = 1.96 * se;
    stage.querySelectorAll('[data-o]').forEach(o => { o.textContent = s[o.dataset.o]; });
    stage.querySelector('.vz-readout').innerHTML = `
      <span class="vz-stat">standard error<b>±${se.toFixed(2)}</b></span>
      <span class="vz-stat">95% interval of observed Δ<b>${(s.delta - ci).toFixed(1)} … ${(s.delta + ci).toFixed(1)}</b></span>
      <span class="vz-stat hl">P(correct ranking)<b>${(pCorrect * 100).toFixed(1)}%</b></span>
      <span class="vz-stat">n for 95% at this Δ, σ<b>≈ ${nNeeded}</b></span>`;
    if (!done && s.delta <= goal.delta && pCorrect >= goal.prob && s.sigma >= 8) { done = true; complete(); }
  }
  stage.querySelectorAll('input[type=range]').forEach(i => { i.value = s[i.dataset.k]; i.addEventListener('input', () => { s[i.dataset.k] = +i.value; draw(); }); });
  draw();
}
