// Drag two vectors; see dot product, norms, angle and cosine similarity live.
// params.goals: which challenges to show (auto-completes the task when all reached).

export default function mount(stage, { params, complete }) {
  const W = 420, H = 340, S = 34, ox = W / 2, oy = H / 2 + 10;
  const goals = params.goals || ['orthogonal', 'opposite'];
  const reached = new Set();
  let a = { x: 3, y: 1.5 }, b = { x: 1, y: 3 };

  stage.innerHTML = `
    <div class="vz">
      <svg class="vz-svg" viewBox="0 0 ${W} ${H}">
        <defs>
          <marker id="dpA" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="var(--accent)"/></marker>
          <marker id="dpB" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="var(--accent-2)"/></marker>
        </defs>
        <g class="grid"></g>
        <path class="arc" fill="color-mix(in oklab, var(--accent) 12%, transparent)" stroke="var(--accent)" stroke-width="1"/>
        <line class="proj" stroke="var(--accent-2)" stroke-width="5" stroke-linecap="round" opacity=".28"/>
        <line class="drop" stroke="var(--muted)" stroke-dasharray="4 4"/>
        <line class="va" stroke="var(--accent)" stroke-width="3.2" marker-end="url(#dpA)"/>
        <line class="vb" stroke="var(--accent-2)" stroke-width="3.2" marker-end="url(#dpB)"/>
        <circle class="ha" r="13" fill="var(--accent)" fill-opacity=".14" style="cursor:grab"/>
        <circle class="hb" r="13" fill="var(--accent-2)" fill-opacity=".14" style="cursor:grab"/>
        <text class="la" font-weight="700" fill="var(--accent)" font-family="Inter">a</text>
        <text class="lb" font-weight="700" fill="var(--accent-2)" font-family="Inter">b</text>
        <text class="ang" font-size="12" fill="var(--ink-2)" font-family="Inter"></text>
      </svg>
      <div class="vz-readout"></div>
      <div class="vz-readout goals"></div>
      <p class="vz-note">Drag the arrow tips. The faint band on <b style="color:var(--accent-2)">b</b>'s side shows the projection of b onto a — the dot product is (length of a) × (signed length of that shadow).</p>
    </div>`;
  const svg = stage.querySelector('svg');
  const q = s => svg.querySelector(s);

  const grid = [];
  for (let i = -6; i <= 6; i++) {
    grid.push(`<line x1="${ox + i * S}" y1="0" x2="${ox + i * S}" y2="${H}" stroke="var(--line)" stroke-width="${i ? 1 : 1.6}"/>`);
    grid.push(`<line x1="0" y1="${oy + i * S}" x2="${W}" y2="${oy + i * S}" stroke="var(--line)" stroke-width="${i ? 1 : 1.6}"/>`);
  }
  q('.grid').innerHTML = grid.join('');

  const px = v => [ox + v.x * S, oy - v.y * S];
  const f = (n, d = 2) => (Math.abs(n) < 0.005 ? 0 : n).toFixed(d);

  function draw() {
    const [ax, ay] = px(a), [bx, by] = px(b);
    const set = (el, x1, y1, x2, y2) => { el.setAttribute('x1', x1); el.setAttribute('y1', y1); el.setAttribute('x2', x2); el.setAttribute('y2', y2); };
    set(q('.va'), ox, oy, ax, ay); set(q('.vb'), ox, oy, bx, by);
    q('.ha').setAttribute('cx', ax); q('.ha').setAttribute('cy', ay);
    q('.hb').setAttribute('cx', bx); q('.hb').setAttribute('cy', by);
    q('.la').setAttribute('x', ax + 10); q('.la').setAttribute('y', ay - 8);
    q('.lb').setAttribute('x', bx + 10); q('.lb').setAttribute('y', by - 8);

    const dot = a.x * b.x + a.y * b.y;
    const na = Math.hypot(a.x, a.y), nb = Math.hypot(b.x, b.y);
    const cos = na && nb ? dot / (na * nb) : 0;
    const theta = Math.acos(Math.max(-1, Math.min(1, cos))) * 180 / Math.PI;

    // projection of b onto a
    const t = na ? dot / (na * na) : 0;
    const p = { x: a.x * t, y: a.y * t };
    const [pX, pY] = px(p);
    set(q('.proj'), ox, oy, pX, pY);
    set(q('.drop'), bx, by, pX, pY);

    // angle arc
    const r = 30, a0 = Math.atan2(a.y, a.x), a1 = Math.atan2(b.y, b.x);
    let d = a1 - a0; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI;
    const e = a0 + d;
    q('.arc').setAttribute('d', `M${ox},${oy} L${ox + r * Math.cos(a0)},${oy - r * Math.sin(a0)} A${r},${r} 0 0 ${d > 0 ? 0 : 1} ${ox + r * Math.cos(e)},${oy - r * Math.sin(e)} Z`);
    const mid = a0 + d / 2;
    q('.ang').setAttribute('x', ox + 44 * Math.cos(mid) - 10); q('.ang').setAttribute('y', oy - 44 * Math.sin(mid) + 4);
    q('.ang').textContent = `${theta.toFixed(0)}°`;

    stage.querySelector('.vz-readout').innerHTML = `
      <span class="vz-stat">a = (${f(a.x, 1)}, ${f(a.y, 1)})</span>
      <span class="vz-stat">b = (${f(b.x, 1)}, ${f(b.y, 1)})</span>
      <span class="vz-stat hl">a·b =<b>${f(dot)}</b></span>
      <span class="vz-stat">‖a‖ =<b>${f(na)}</b></span>
      <span class="vz-stat">‖b‖ =<b>${f(nb)}</b></span>
      <span class="vz-stat hl">cos θ =<b>${f(cos, 3)}</b></span>`;

    if (Math.abs(cos) < 0.03) reached.add('orthogonal');
    if (cos < -0.97) reached.add('opposite');
    if (cos > 0.97 && Math.abs(na - nb) > 1.5) reached.add('same-direction');
    const labels = { orthogonal: 'Make them orthogonal (cos θ ≈ 0)', opposite: 'Point them in opposite directions (cos θ ≈ −1)', 'same-direction': 'Same direction, very different lengths (cos θ ≈ 1)' };
    stage.querySelector('.goals').innerHTML = goals.map(g => `<span class="vz-stat ${reached.has(g) ? 'hl' : ''}">${reached.has(g) ? '✓' : '○'} ${labels[g]}</span>`).join('');
    if (goals.every(g => reached.has(g))) complete();
  }

  let drag = null;
  const toVec = e => {
    const r = svg.getBoundingClientRect();
    const x = (e.clientX - r.left) * W / r.width, y = (e.clientY - r.top) * H / r.height;
    const snap = v => Math.round(v * 10) / 10;
    return { x: snap(Math.max(-5.8, Math.min(5.8, (x - ox) / S))), y: snap(Math.max(-5, Math.min(5, (oy - y) / S))) };
  };
  svg.addEventListener('pointerdown', e => {
    const v = toVec(e);
    const da = Math.hypot(v.x - a.x, v.y - a.y), db = Math.hypot(v.x - b.x, v.y - b.y);
    drag = da < db ? 'a' : 'b';
    svg.setPointerCapture(e.pointerId);
    move(e);
  });
  const move = e => {
    if (!drag) return;
    const v = toVec(e);
    if (drag === 'a') a = v; else b = v;
    draw();
  };
  svg.addEventListener('pointermove', move);
  svg.addEventListener('pointerup', () => { drag = null; });
  draw();
}
