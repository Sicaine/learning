// Two modes: (1) plot activation functions and their derivatives,
// (2) build a curve from N ReLU "hinges" to see why nonlinearity = expressive power.

export default function mount(stage, { params, complete }) {
  const W = 420, H = 260;
  const fns = {
    ReLU: [x => Math.max(0, x), x => (x > 0 ? 1 : 0)],
    GELU: [x => 0.5 * x * (1 + Math.tanh(0.7978845608 * (x + 0.044715 * x ** 3))), x => { const h = 1e-4, g = t => 0.5 * t * (1 + Math.tanh(0.7978845608 * (t + 0.044715 * t ** 3))); return (g(x + h) - g(x - h)) / (2 * h); }],
    sigmoid: [x => 1 / (1 + Math.exp(-x)), x => { const s = 1 / (1 + Math.exp(-x)); return s * (1 - s); }],
    tanh: [x => Math.tanh(x), x => 1 - Math.tanh(x) ** 2],
    linear: [x => x, () => 1],
  };
  let fn = 'ReLU', mode = params.mode || 'functions', units = 2;
  const target = x => Math.sin(1.6 * x) + 0.3 * x;

  stage.innerHTML = `
    <div class="vz">
      <div class="vz-seg modes"><button data-m="functions">Activation functions</button><button data-m="build">Build a curve from ReLUs</button></div>
      <svg class="vz-svg" viewBox="0 0 ${W} ${H}"></svg>
      <div class="controls"></div>
      <div class="vz-readout"></div>
    </div>`;
  const svg = stage.querySelector('svg');
  const X = x => W / 2 + x * (W / 8), Y = y => H / 2 - y * (H / 6);
  const axes = () => {
    let s = '';
    for (let i = -4; i <= 4; i++) s += `<line x1="${X(i)}" y1="0" x2="${X(i)}" y2="${H}" stroke="var(--line)" stroke-width="${i ? 1 : 1.6}"/>`;
    for (let j = -3; j <= 3; j++) s += `<line x1="0" y1="${Y(j)}" x2="${W}" y2="${Y(j)}" stroke="var(--line)" stroke-width="${j ? 1 : 1.6}"/>`;
    return s;
  };
  const curve = (f, color, width = 2.6, dash = '') => {
    const pts = [];
    for (let i = 0; i <= 200; i++) { const x = -4 + i * 0.04; const y = Math.max(-3.4, Math.min(3.4, f(x))); pts.push(`${X(x).toFixed(1)},${Y(y).toFixed(1)}`); }
    return `<polyline points="${pts.join(' ')}" fill="none" stroke="${color}" stroke-width="${width}" stroke-dasharray="${dash}" stroke-linejoin="round"/>`;
  };

  function drawFunctions() {
    const [f, d] = fns[fn];
    svg.innerHTML = axes() + curve(d, 'var(--accent-2)', 2, '5 4') + curve(f, 'var(--accent)', 3);
    stage.querySelector('.vz-readout').innerHTML = `
      <span class="vz-stat"><b style="color:var(--accent);margin:0">━</b> ${fn}(x)</span>
      <span class="vz-stat"><b style="color:var(--accent-2);margin:0">╍</b> derivative</span>
      <span class="vz-stat hl">${{ ReLU: 'gradient is exactly 1 for x > 0 — it flows through deep stacks', GELU: 'smooth ReLU; used in every ViT / DINO MLP', sigmoid: 'max slope 0.25 → gradients shrink layer after layer', tanh: 'saturates at ±1 → tiny gradients for large |x|', linear: 'no bend: stacking these stays linear' }[fn]}</span>`;
  }

  // Piecewise-linear interpolation of target at N+1 knots = sum of N ReLU hinges.
  function drawBuild() {
    const knots = Array.from({ length: units + 1 }, (_, i) => -4 + (8 * i) / units);
    const vals = knots.map(target);
    const approx = x => {
      if (x <= knots[0]) return vals[0];
      for (let i = 0; i < units; i++) if (x <= knots[i + 1]) { const t = (x - knots[i]) / (knots[i + 1] - knots[i]); return vals[i] * (1 - t) + vals[i + 1] * t; }
      return vals[units];
    };
    let err = 0;
    for (let i = 0; i <= 400; i++) { const x = -4 + i * 0.02; err += (approx(x) - target(x)) ** 2; }
    err /= 401;
    svg.innerHTML = axes() + curve(target, 'var(--muted)', 2, '4 4') + curve(approx, 'var(--accent)', 3) +
      knots.map((k, i) => `<circle cx="${X(k)}" cy="${Y(vals[i])}" r="3.5" fill="var(--accent-2)"/>`).join('');
    stage.querySelector('.vz-readout').innerHTML = `
      <span class="vz-stat">hidden ReLU units<b>${units}</b></span>
      <span class="vz-stat hl">mean squared error<b>${err.toFixed(4)}</b></span>
      <span class="vz-stat ${err < 0.005 ? 'hl' : ''}">${err < 0.005 ? '✓ good fit' : '○ goal: error < 0.005'}</span>`;
    if (err < 0.005) complete();
  }

  function setMode(m) {
    mode = m;
    stage.querySelectorAll('.modes button').forEach(b => b.classList.toggle('on', b.dataset.m === m));
    const c = stage.querySelector('.controls');
    if (m === 'functions') {
      c.innerHTML = `<div class="vz-seg fns">${Object.keys(fns).map(k => `<button data-f="${k}" class="${k === fn ? 'on' : ''}">${k}</button>`).join('')}</div>`;
      c.querySelectorAll('[data-f]').forEach(b => b.onclick = () => { fn = b.dataset.f; c.querySelectorAll('[data-f]').forEach(x => x.classList.toggle('on', x === b)); drawFunctions(); });
      drawFunctions();
    } else {
      c.innerHTML = `<div class="vz-controls"><div class="vz-control"><label>Number of ReLU units <output>${units}</output></label><input type="range" min="1" max="40" value="${units}"></div></div>
        <p class="vz-note">A one-hidden-layer ReLU network computes a sum of “hinges” — a piecewise-linear curve with one kink per unit. More units → more kinks → any continuous curve (universal approximation).</p>`;
      const inp = c.querySelector('input');
      inp.oninput = () => { units = +inp.value; c.querySelector('output').textContent = units; drawBuild(); };
      drawBuild();
    }
  }
  stage.querySelectorAll('.modes button').forEach(b => b.onclick = () => setMode(b.dataset.m));
  setMode(mode);
}
