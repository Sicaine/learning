// k-NN evaluation in a toy 2D embedding space. Similarity is cosine (angle only):
// points at different distances from the center but the same direction are "the same".
// Click to place a query; the k most similar labeled embeddings vote.

export default function mount(stage, { params, complete }) {
  const W = 420, H = 320, cx = W / 2, cy = H / 2, R = 120;
  const classes = [
    { name: 'dial', color: 'var(--accent)', angle: 0.4 },
    { name: 'bezel', color: 'var(--accent-2)', angle: 2.5 },
    { name: 'strap', color: 'var(--good)', angle: 4.4 },
  ];
  let seed = 7;
  const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  const gauss = () => Math.sqrt(-2 * Math.log(rnd() + 1e-9)) * Math.cos(2 * Math.PI * rnd());
  let mode = 'good', k = 5, query = null;
  const reached = new Set();
  let points = [];

  function makePoints() {
    seed = 7;
    points = [];
    classes.forEach((c, ci) => {
      for (let i = 0; i < 14; i++) {
        const spread = mode === 'good' ? 0.35 : 2.2;
        const a = c.angle + gauss() * spread;
        const r = 0.35 + rnd() * 0.65; // length varies — cosine ignores it
        points.push({ ci, a, r });
      }
    });
  }

  stage.innerHTML = `
    <div class="vz">
      <div class="vz-controls">
        <div class="vz-seg"><button data-m="good" class="on">Good features</button><button data-m="bad">Bad features</button></div>
        <div class="vz-control"><label>k (neighbours) <output>5</output></label><input type="range" min="1" max="21" step="2" value="5"></div>
      </div>
      <svg class="vz-svg" viewBox="0 0 ${W} ${H}" style="cursor:crosshair"></svg>
      <div class="vz-readout votes"></div>
      <div class="vz-readout goals"></div>
      <p class="vz-note">Click anywhere to embed a "test image". Only its <b>direction</b> matters: the k labeled points with the highest cosine similarity vote on its class.</p>
    </div>`;
  const svg = stage.querySelector('svg');

  function draw() {
    const pos = p => [cx + Math.cos(p.a) * p.r * R, cy - Math.sin(p.a) * p.r * R];
    let nn = [];
    if (query) {
      nn = points.map((p, i) => ({ i, sim: Math.cos(p.a - query.a) })).sort((x, y) => y.sim - x.sim).slice(0, k);
    }
    const nnSet = new Set(nn.map(n => n.i));
    let html = `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="var(--line-2)" stroke-dasharray="3 5"/>
      <circle cx="${cx}" cy="${cy}" r="3" fill="var(--muted)"/>`;
    if (query) {
      const [qx, qy] = pos({ a: query.a, r: query.r });
      const [ex, ey] = [cx + Math.cos(query.a) * R * 1.25, cy - Math.sin(query.a) * R * 1.25];
      html += `<line x1="${cx}" y1="${cy}" x2="${ex}" y2="${ey}" stroke="var(--ink)" stroke-width="1" stroke-dasharray="2 4" opacity=".5"/>`;
      nn.forEach(n => { const [x, y] = pos(points[n.i]); html += `<line x1="${qx}" y1="${qy}" x2="${x}" y2="${y}" stroke="${classes[points[n.i].ci].color}" stroke-width="1.2" opacity=".55"/>`; });
    }
    points.forEach((p, i) => {
      const [x, y] = pos(p);
      html += `<circle cx="${x}" cy="${y}" r="${nnSet.has(i) ? 6.5 : 4.5}" fill="${classes[p.ci].color}" fill-opacity="${nnSet.size && !nnSet.has(i) ? 0.25 : 0.9}" stroke="#fff" stroke-width="1.5"/>`;
    });
    let votes = [0, 0, 0], winner = null;
    if (query) {
      nn.forEach(n => votes[points[n.i].ci]++);
      winner = votes.indexOf(Math.max(...votes));
      const [qx, qy] = pos({ a: query.a, r: query.r });
      html += `<rect x="${qx - 8}" y="${qy - 8}" width="16" height="16" rx="4" fill="#fff" stroke="${classes[winner].color}" stroke-width="3" transform="rotate(45 ${qx} ${qy})"/>`;
      if (mode === 'good') reached.add(classes[winner].name);
    }
    svg.innerHTML = html;
    stage.querySelector('.votes').innerHTML = classes.map((c, i) =>
      `<span class="vz-stat ${winner === i ? 'hl' : ''}"><span style="color:${c.color}">●</span> ${c.name}<b>${votes[i]}</b></span>`).join('') +
      (query ? `<span class="vz-stat">prediction<b>${classes[winner].name}</b></span>` : '<span class="vz-stat">click to place a query</span>');
    stage.querySelector('.goals').innerHTML = classes.map(c =>
      `<span class="vz-stat ${reached.has(c.name) ? 'hl' : ''}">${reached.has(c.name) ? '✓' : '○'} Get a “${c.name}” prediction (good features)</span>`).join('');
    if (reached.size === classes.length) complete();
  }

  svg.addEventListener('pointerdown', e => {
    const r = svg.getBoundingClientRect();
    const x = (e.clientX - r.left) * W / r.width - cx, y = cy - (e.clientY - r.top) * H / r.height;
    query = { a: Math.atan2(y, x), r: Math.min(1, Math.hypot(x, y) / R) };
    draw();
  });
  stage.querySelectorAll('.vz-seg button').forEach(b => b.onclick = () => {
    mode = b.dataset.m;
    stage.querySelectorAll('.vz-seg button').forEach(x => x.classList.toggle('on', x === b));
    makePoints(); draw();
  });
  const range = stage.querySelector('input[type=range]');
  range.oninput = () => { k = +range.value; stage.querySelector('output').textContent = k; draw(); };
  makePoints();
  draw();
}
