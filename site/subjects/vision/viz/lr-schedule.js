// Linear warmup + cosine decay learning-rate schedule, as used by ViT / DINO training.

export default function mount(stage, { params }) {
  const W = 420, H = 200;
  let total = params.total || 100, warm = params.warmup || 10, peak = params.peak || 5e-4, floor = params.min || 1e-6;
  stage.innerHTML = `
    <div class="vz">
      <svg class="vz-svg" viewBox="0 0 ${W} ${H}"></svg>
      <div class="vz-controls">
        <div class="vz-control"><label>Warmup (epochs) <output class="ow"></output></label><input type="range" class="w" min="0" max="40" value="${warm}"></div>
        <div class="vz-control"><label>Total epochs <output class="ot"></output></label><input type="range" class="t" min="20" max="300" step="10" value="${total}"></div>
      </div>
      <div class="vz-readout"></div>
    </div>`;
  const lr = e => e < warm ? peak * e / Math.max(1, warm) : floor + 0.5 * (peak - floor) * (1 + Math.cos(Math.PI * (e - warm) / Math.max(1, total - warm)));
  function draw() {
    const X = e => 30 + e / total * (W - 45), Y = v => H - 25 - v / peak * (H - 45);
    const pts = []; for (let i = 0; i <= 200; i++) { const e = i / 200 * total; pts.push(`${X(e).toFixed(1)},${Y(lr(e)).toFixed(1)}`); }
    stage.querySelector('svg').innerHTML = `
      <rect x="${X(0)}" y="10" width="${X(warm) - X(0)}" height="${H - 35}" fill="var(--accent)" opacity=".08"/>
      <line x1="30" y1="${H - 25}" x2="${W - 10}" y2="${H - 25}" stroke="var(--line-2)"/>
      <line x1="30" y1="10" x2="30" y2="${H - 25}" stroke="var(--line-2)"/>
      <polygon points="${X(0)},${Y(0)} ${pts.join(' ')} ${X(total)},${Y(0)}" fill="url(#accentGrad)" opacity=".15"/>
      <polyline points="${pts.join(' ')}" fill="none" stroke="var(--accent)" stroke-width="3"/>
      ${warm ? `<text x="${X(warm / 2)}" y="24" text-anchor="middle" font-size="11" fill="var(--accent)" font-family="Inter">warmup</text>` : ''}
      <text x="${X((warm + total) / 2)}" y="24" text-anchor="middle" font-size="11" fill="var(--ink-2)" font-family="Inter">cosine decay</text>
      <text x="${W - 12}" y="${H - 8}" text-anchor="end" font-size="10.5" fill="var(--muted)" font-family="Inter">epoch ${total}</text>
      <text x="34" y="${Y(peak) + 12}" font-size="10.5" fill="var(--muted)" font-family="JetBrains Mono">peak ${peak.toExponential(0)}</text>`;
    stage.querySelector('.ow').textContent = warm; stage.querySelector('.ot').textContent = total;
    stage.querySelector('.vz-readout').innerHTML = `
      <span class="vz-stat">lr at 25%<b>${lr(total * 0.25).toExponential(1)}</b></span>
      <span class="vz-stat">lr at 50%<b>${lr(total * 0.5).toExponential(1)}</b></span>
      <span class="vz-stat">lr at 90%<b>${lr(total * 0.9).toExponential(1)}</b></span>`;
  }
  stage.querySelector('.w').oninput = e => { warm = +e.target.value; draw(); };
  stage.querySelector('.t').oninput = e => { total = +e.target.value; warm = Math.min(warm, total - 5); draw(); };
  draw();
}
