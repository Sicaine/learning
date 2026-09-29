// A 2×2 matrix acting on the plane: grid, basis vectors, unit square and a small watch face.
// Goals: squash space (det ≈ 0) and flip it (det < 0).

export default function mount(stage, { params, complete, md }) {
  const W = 420, H = 360, S = 42, ox = W / 2, oy = H / 2;
  let m = { a: 1, b: 0, c: 0, d: 1 }; // [[a b],[c d]]
  const reached = new Set();
  const goals = params.goals || ['singular', 'flip'];
  const presets = {
    identity: [1, 0, 0, 1], 'rotate 30°': [Math.cos(Math.PI / 6), -Math.sin(Math.PI / 6), Math.sin(Math.PI / 6), Math.cos(Math.PI / 6)],
    scale: [1.6, 0, 0, 0.6], shear: [1, 0.8, 0, 1], reflect: [-1, 0, 0, 1], project: [1, 0, 0, 0],
  };

  stage.innerHTML = `
    <div class="vz">
      <svg class="vz-svg" viewBox="0 0 ${W} ${H}"><g class="bg"></g><g class="fg"></g></svg>
      <div class="vz-seg presets">${Object.keys(presets).map(k => `<button data-p="${k}">${k}</button>`).join('')}</div>
      <div class="vz-controls">
        ${['a', 'b', 'c', 'd'].map(k => `<div class="vz-control"><label>${k} <output data-o="${k}"></output></label><input type="range" min="-2" max="2" step="0.05" data-k="${k}"></div>`).join('')}
      </div>
      <div class="vz-readout"></div>
      <div class="vz-readout goals"></div>
      <div class="vz-note note-m"></div>
    </div>`;
  stage.querySelector('.note-m').innerHTML = md(String.raw`The matrix is $\begin{pmatrix} a & b \\ c & d \end{pmatrix}$. Its <b style="color:var(--accent)">first column (a, c)</b> is where $\hat{\imath}=(1,0)$ lands, its <b style="color:var(--accent-2)">second column (b, d)</b> is where $\hat{\jmath}=(0,1)$ lands. Everything else follows.`);

  const T = (x, y) => [m.a * x + m.b * y, m.c * x + m.d * y];
  const P = (x, y) => { const [u, v] = T(x, y); return `${(ox + u * S).toFixed(1)},${(oy - v * S).toFixed(1)}`; };

  // static background grid (original space, faint)
  const bg = [];
  for (let i = -6; i <= 6; i++) {
    bg.push(`<line x1="${ox + i * S}" y1="0" x2="${ox + i * S}" y2="${H}" stroke="var(--line)" stroke-width="1"/>`);
    bg.push(`<line x1="0" y1="${oy + i * S}" x2="${W}" y2="${oy + i * S}" stroke="var(--line)" stroke-width="1"/>`);
  }
  stage.querySelector('.bg').innerHTML = bg.join('');

  function draw() {
    const g = [];
    for (let i = -6; i <= 6; i++) {
      g.push(`<polyline points="${P(i, -6)} ${P(i, 6)}" fill="none" stroke="color-mix(in oklab, var(--accent) 35%, white)" stroke-width="${i ? 1 : 1.8}"/>`);
      g.push(`<polyline points="${P(-6, i)} ${P(6, i)}" fill="none" stroke="color-mix(in oklab, var(--accent) 35%, white)" stroke-width="${i ? 1 : 1.8}"/>`);
    }
    g.push(`<polygon points="${P(0, 0)} ${P(1, 0)} ${P(1, 1)} ${P(0, 1)}" fill="color-mix(in oklab, var(--accent) 18%, transparent)" stroke="var(--accent)" stroke-width="1"/>`);
    // watch face: circle of radius 1.3 centered (2.2, 1.6)
    const cx = -2.2, cy = 1.4, R = 1.1;
    const circ = Array.from({ length: 49 }, (_, i) => { const t = i / 48 * 2 * Math.PI; return P(cx + R * Math.cos(t), cy + R * Math.sin(t)); }).join(' ');
    g.push(`<polyline points="${circ}" fill="rgba(255,255,255,.7)" stroke="var(--ink)" stroke-width="2"/>`);
    for (let k = 0; k < 12; k++) { const t = k / 12 * 2 * Math.PI; g.push(`<polyline points="${P(cx + 0.85 * R * Math.cos(t), cy + 0.85 * R * Math.sin(t))} ${P(cx + R * Math.cos(t), cy + R * Math.sin(t))}" stroke="var(--ink)" stroke-width="1.5"/>`); }
    g.push(`<polyline points="${P(cx, cy)} ${P(cx, cy + 0.8 * R)}" stroke="var(--ink)" stroke-width="2.5" stroke-linecap="round"/>`);
    g.push(`<polyline points="${P(cx, cy)} ${P(cx + 0.5 * R, cy - 0.2)}" stroke="var(--ink)" stroke-width="3.5" stroke-linecap="round"/>`);
    g.push(`<line x1="${ox}" y1="${oy}" x2="${ox + m.a * S}" y2="${oy - m.c * S}" stroke="var(--accent)" stroke-width="3.5" stroke-linecap="round"/>`);
    g.push(`<line x1="${ox}" y1="${oy}" x2="${ox + m.b * S}" y2="${oy - m.d * S}" stroke="var(--accent-2)" stroke-width="3.5" stroke-linecap="round"/>`);
    g.push(`<circle cx="${ox + m.a * S}" cy="${oy - m.c * S}" r="5" fill="var(--accent)"/><circle cx="${ox + m.b * S}" cy="${oy - m.d * S}" r="5" fill="var(--accent-2)"/>`);
    stage.querySelector('.fg').innerHTML = g.join('');

    for (const k of 'abcd') {
      stage.querySelector(`[data-k="${k}"]`).value = m[k];
      stage.querySelector(`[data-o="${k}"]`).textContent = m[k].toFixed(2);
    }
    const det = m.a * m.d - m.b * m.c;
    if (Math.abs(det) < 0.05) reached.add('singular');
    if (det < -0.2) reached.add('flip');
    stage.querySelector('.vz-readout').innerHTML = `
      <span class="vz-stat">î → (${m.a.toFixed(2)}, ${m.c.toFixed(2)})</span>
      <span class="vz-stat">ĵ → (${m.b.toFixed(2)}, ${m.d.toFixed(2)})</span>
      <span class="vz-stat hl">det = ad − bc =<b>${det.toFixed(2)}</b></span>
      <span class="vz-stat">${Math.abs(det) < 0.05 ? 'space squashed to a line: information lost' : det < 0 ? 'orientation flipped (mirror image)' : `areas scaled by ${det.toFixed(2)}×`}</span>`;
    const labels = { singular: 'Squash the plane onto a line (det ≈ 0)', flip: 'Mirror the watch (det < 0)' };
    stage.querySelector('.goals').innerHTML = goals.map(g => `<span class="vz-stat ${reached.has(g) ? 'hl' : ''}">${reached.has(g) ? '✓' : '○'} ${labels[g]}</span>`).join('');
    if (goals.every(g => reached.has(g))) complete();
  }

  stage.querySelectorAll('[data-k]').forEach(inp => inp.oninput = () => { m[inp.dataset.k] = +inp.value; draw(); });
  stage.querySelectorAll('[data-p]').forEach(b => b.onclick = () => {
    const [a, bb, c, d] = presets[b.dataset.p];
    m = { a, b: bb, c, d };
    stage.querySelectorAll('[data-p]').forEach(x => x.classList.toggle('on', x === b));
    draw();
  });
  stage.querySelector('[data-p="identity"]').classList.add('on');
  draw();
}
