// Hungarian matching toy: 3 ground-truth objects, 5 object queries.
// The learner assigns each ground truth to one query (click cells in the
// cost matrix) and tries to reach the minimum total cost.

export default function mount(stage, { complete }) {
  const CLASSES = ['hour hand', 'minute hand', 'crown'];
  const W = 360, H = 260;
  let scene, pick, solved = false;

  const rnd = (a, b) => a + Math.random() * (b - a);
  function newScene() {
    const gts = [
      { cls: 0, box: [120, 70, 60, 70] },
      { cls: 1, box: [170, 40, 40, 110] },
      { cls: 2, box: [272, 115, 30, 30] },
    ].map(g => ({ ...g, box: g.box.map(v => v + rnd(-8, 8)) }));
    // queries: jittered copies of GTs (sometimes of the wrong one) + a stray duplicate
    const qs = [];
    const order = [0, 1, 2, 1, 0].sort(() => Math.random() - 0.5);
    order.forEach((gi, k) => {
      const g = gts[gi];
      const noise = k < 3 ? 10 : 22;
      const probs = [0.1, 0.1, 0.1];
      probs[Math.random() < 0.8 ? g.cls : (g.cls + 1) % 3] = rnd(0.55, 0.9);
      const sum = probs.reduce((a, b) => a + b, 0);
      qs.push({ box: g.box.map(v => v + rnd(-noise, noise)), probs: probs.map(p => p / sum) });
    });
    scene = { gts, qs };
    pick = {}; // gtIndex -> queryIndex
    solved = false;
  }

  const iou = (a, b) => {
    const x1 = Math.max(a[0], b[0]), y1 = Math.max(a[1], b[1]);
    const x2 = Math.min(a[0] + a[2], b[0] + b[2]), y2 = Math.min(a[1] + a[3], b[1] + b[3]);
    const inter = Math.max(0, x2 - x1) * Math.max(0, y2 - y1);
    return inter / (a[2] * a[3] + b[2] * b[3] - inter);
  };
  const cost = (q, g) => -q.probs[g.cls] + 2 * (1 - iou(q.box, g.box));
  const total = p => Object.entries(p).reduce((s, [gi, qi]) => s + cost(scene.qs[qi], scene.gts[gi]), 0);
  function optimal() {
    let best = null, bestC = Infinity;
    const n = scene.qs.length;
    for (let a = 0; a < n; a++) for (let b = 0; b < n; b++) for (let c = 0; c < n; c++) {
      if (a === b || b === c || a === c) continue;
      const p = { 0: a, 1: b, 2: c }, t = total(p);
      if (t < bestC) { bestC = t; best = p; }
    }
    return { p: best, c: bestC };
  }

  stage.innerHTML = `
    <div class="vz">
      <svg class="vz-svg" viewBox="0 0 ${W} ${H}"></svg>
      <div class="qm-table"></div>
      <div class="vz-readout"></div>
      <div class="vz-controls"><button class="btn small show">Show optimal matching</button><button class="btn small ghost new">New scene</button></div>
      <p class="vz-note">Cost = <code>−p(correct class) + 2·(1 − IoU)</code>. Lower is better. Each ground-truth object gets exactly one query; the 2 leftover queries are trained to predict ∅ “no object”.</p>
    </div>`;
  const svg = stage.querySelector('svg');
  const colors = ['#5b5bd6', '#b14fd8', '#1f9d6b'];

  function draw(showOpt) {
    const opt = optimal();
    const shown = showOpt ? opt.p : pick;
    const qToG = Object.fromEntries(Object.entries(shown).map(([g, q]) => [q, +g]));
    svg.innerHTML = `
      <rect width="${W}" height="${H}" fill="#f4f5f8"/>
      <circle cx="170" cy="130" r="112" fill="#1f4f8f" opacity=".12"/>
      ${scene.gts.map((g, i) => `<rect x="${g.box[0]}" y="${g.box[1]}" width="${g.box[2]}" height="${g.box[3]}" fill="${colors[i]}" fill-opacity=".14" stroke="${colors[i]}" stroke-width="2.5"/>
        <text x="${g.box[0] + 3}" y="${g.box[1] - 5}" font-size="11" font-family="Inter" font-weight="700" fill="${colors[i]}">GT: ${CLASSES[g.cls]}</text>`).join('')}
      ${scene.qs.map((q, k) => {
        const m = qToG[k];
        const col = m === undefined ? '#8a8aa0' : colors[m];
        return `<rect x="${q.box[0]}" y="${q.box[1]}" width="${q.box[2]}" height="${q.box[3]}" fill="none" stroke="${col}" stroke-width="1.6" stroke-dasharray="5 4" opacity="${m === undefined ? .6 : 1}"/>
          <text x="${q.box[0] + q.box[2] - 2}" y="${q.box[1] + q.box[3] + 12}" text-anchor="end" font-size="10.5" font-family="JetBrains Mono" fill="${col}">Q${k + 1}${m === undefined ? ' ∅' : ''}</text>`;
      }).join('')}`;

    stage.querySelector('.qm-table').innerHTML = `
      <table class="qm" style="width:100%;border-collapse:collapse;font-size:.85rem;font-family:var(--mono)">
        <tr><th style="text-align:left;padding:6px">query</th><th style="padding:6px;text-align:left">p(hour, min, crown)</th>${scene.gts.map((g, i) => `<th style="padding:6px;color:${colors[i]}">→ ${CLASSES[g.cls]}</th>`).join('')}</tr>
        ${scene.qs.map((q, k) => `<tr style="border-top:1px solid var(--line)"><td style="padding:6px">Q${k + 1}</td><td style="padding:6px;color:var(--muted)">${q.probs.map(p => p.toFixed(2)).join(' ')}</td>
          ${scene.gts.map((g, i) => {
            const on = shown[i] === k;
            return `<td style="padding:3px"><button data-g="${i}" data-q="${k}" style="width:100%;padding:5px;border-radius:8px;border:1.5px solid ${on ? colors[i] : 'var(--line)'};background:${on ? colors[i] + '22' : 'var(--surface)'};font-family:var(--mono);font-weight:${on ? 700 : 400}">${cost(q, g).toFixed(2)}</button></td>`;
          }).join('')}</tr>`).join('')}
      </table>`;

    const n = Object.keys(pick).length;
    const t = total(pick);
    const done = n === 3 && Math.abs(t - opt.c) < 1e-9;
    if (done && !solved) { solved = true; complete(); }
    stage.querySelector('.vz-readout').innerHTML = `
      <span class="vz-stat">assigned <b>${n}/3</b></span>
      <span class="vz-stat ${done ? 'hl' : ''}">your total cost <b>${n ? t.toFixed(2) : '—'}</b></span>
      ${showOpt || solved ? `<span class="vz-stat hl">optimal <b>${opt.c.toFixed(2)}</b></span>` : ''}
      ${done ? '<span class="vz-stat hl">✓ You found the optimal one-to-one matching</span>' : n === 3 ? '<span class="vz-stat">Valid matching — but a cheaper one exists</span>' : ''}`;
  }

  stage.querySelector('.qm-table').addEventListener('click', e => {
    const b = e.target.closest('button[data-g]');
    if (!b) return;
    const gi = +b.dataset.g, qi = +b.dataset.q;
    const was = pick[gi] === qi;
    for (const [g, q] of Object.entries(pick)) if (q === qi) delete pick[g]; // a query serves one GT
    if (was) delete pick[gi]; else pick[gi] = qi;
    draw();
  });
  stage.querySelector('.show').onclick = () => draw(true);
  stage.querySelector('.new').onclick = () => { newScene(); draw(); };
  newScene();
  draw();
}
