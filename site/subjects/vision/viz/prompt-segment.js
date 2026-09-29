// A toy "Segment Anything": click points on a drawn watch. Each part has a
// hierarchy (subpart → part → whole). Like SAM, one point yields three
// candidate masks; more points (positive/negative) resolve the ambiguity.
// params.goals: subset of ['index', 'hands', 'watch', 'glare'].

export default function mount(stage, { params, complete }) {
  const W = 420, H = 420, C = { x: 210, y: 210 };
  const goals = params.goals || ['index', 'hands', 'watch'];
  const reached = new Set();

  // --- Build instances as Path2D objects ----------------------------------
  const P = () => new Path2D();
  const circle = (r, x = C.x, y = C.y) => { const p = P(); p.arc(x, y, r, 0, Math.PI * 2); return p; };
  const ring = (r1, r2) => { const p = P(); p.arc(C.x, C.y, r2, 0, Math.PI * 2); p.arc(C.x, C.y, r1, 0, Math.PI * 2, true); return p; };
  const poly = pts => { const p = P(); pts.forEach(([x, y], i) => i ? p.lineTo(x, y) : p.moveTo(x, y)); p.closePath(); return p; };
  const rot = (x, y, a) => [C.x + x * Math.cos(a) - y * Math.sin(a), C.y + x * Math.sin(a) + y * Math.cos(a)];
  const hand = (len, w, a, tail = 14) => poly([rot(-w / 2, tail, a), rot(-w / 2 * 0.6, -len, a), rot(0, -len - 6, a), rot(w / 2 * 0.6, -len, a), rot(w / 2, tail, a)]);

  const inst = [];
  const add = (id, label, path, paint, levels) => inst.push({ id, label, path, paint, levels });
  // levels: [subpart, part, whole] as group names
  add('strap-top', 'upper strap', poly([[168, 0], [252, 0], [246, 100], [174, 100]]), '#6b4a32', ['strap-top', 'strap', 'watch']);
  add('strap-bottom', 'lower strap', poly([[174, 320], [246, 320], [252, 420], [168, 420]]), '#6b4a32', ['strap-bottom', 'strap', 'watch']);
  const caseP = P(); caseP.addPath(circle(128)); caseP.addPath(poly([[160, 70], [260, 70], [262, 120], [158, 120]])); caseP.addPath(poly([[158, 300], [262, 300], [260, 350], [160, 350]]));
  add('case', 'case & lugs', caseP, '#b9bec7', ['case', 'case-assembly', 'watch']);
  const crownP = P(); crownP.roundRect(334, 196, 24, 28, 5);
  add('crown', 'crown', crownP, '#a7adb6', ['crown', 'case-assembly', 'watch']);
  add('bezel', 'bezel', ring(98, 118), '#1d2433', ['bezel', 'case-assembly', 'watch']);
  add('dial', 'dial', circle(98), '#1f4f8f', ['dial', 'dial-face', 'watch']);
  for (let i = 0; i < 12; i++) {
    const a = i * Math.PI / 6;
    const long = i % 3 === 0;
    add(`index-${i}`, `index ${i === 0 ? 12 : i}`, poly([rot(-3.5, -90, a), rot(3.5, -90, a), rot(3.5, long ? -70 : -76, a), rot(-3.5, long ? -70 : -76, a)]), '#f4f1e8', [`index-${i}`, 'indices', 'watch']);
  }
  add('hour', 'hour hand', hand(48, 9, -0.9), '#e6e8ec', ['hour', 'hands', 'watch']);
  add('minute', 'minute hand', hand(74, 7, 1.15), '#e6e8ec', ['minute', 'hands', 'watch']);
  add('second', 'seconds hand', hand(84, 2, 2.6, 22), '#e0452f', ['second', 'hands', 'watch']);
  const glareP = P(); glareP.ellipse(172, 160, 58, 22, -0.7, 0, Math.PI * 2);
  add('glare', 'glare on the crystal', glareP, 'rgba(255,255,255,.38)', ['glare', 'glare', 'watch']);

  const groupLabel = { strap: 'strap', 'case-assembly': 'case + bezel + crown', 'dial-face': 'dial + indices + hands', indices: 'all 12 indices', hands: 'all three hands', watch: 'the whole watch', glare: 'glare' };
  const members = name => inst.filter(i => i.levels.includes(name));
  const labelOf = name => groupLabel[name] || inst.find(i => i.id === name)?.label || name;

  stage.innerHTML = `
    <div class="vz">
      <div class="vz-controls">
        <div class="vz-seg mode"><button data-m="pos" class="on">＋ Foreground point</button><button data-m="neg">− Background point</button></div>
        <button class="btn small ghost clear">Clear points</button>
      </div>
      <canvas width="${W * 2}" height="${H * 2}" style="max-width:${W}px;margin:0 auto;cursor:crosshair"></canvas>
      <div class="vz-readout cands"></div>
      <div class="vz-readout vz-goals"></div>
      <p class="vz-note">Like SAM, the first point returns <b>three candidate masks</b> (subpart / part / whole) with a confidence score. Add more points to disambiguate: the chosen mask is the smallest candidate that contains every ＋ point and no − point.</p>
    </div>`;
  const cv = stage.querySelector('canvas');
  const g = cv.getContext('2d');
  g.scale(2, 2);
  let points = [], mode = 'pos', choice = null;

  const hit = (x, y) => { for (let i = inst.length - 1; i >= 0; i--) if (g.isPointInPath(inst[i].path, x * 2, y * 2)) return inst[i]; return null; };
  // isPointInPath uses the untransformed coordinate space → pass device pixels.

  function candidates() {
    const pos = points.filter(p => p.pos).map(p => hit(p.x, p.y)).filter(Boolean);
    const neg = points.filter(p => !p.pos).map(p => hit(p.x, p.y)).filter(Boolean);
    if (!pos.length) return { list: [], best: null };
    const list = pos[0].levels;
    const valid = new Set();
    for (const p of pos) for (const lv of p.levels) {
      const m = members(lv);
      if (pos.every(q => m.includes(q)) && !neg.some(q => m.includes(q))) valid.add(lv);
    }
    const ordered = [...valid].sort((a, b) => members(a).length - members(b).length);
    return { list, valid, best: ordered[0] || null };
  }

  function draw() {
    g.clearRect(0, 0, W, H);
    const bg = g.createLinearGradient(0, 0, W, H); bg.addColorStop(0, '#eef0f4'); bg.addColorStop(1, '#dfe3ea');
    g.fillStyle = bg; g.fillRect(0, 0, W, H);
    for (const i of inst) { g.fillStyle = i.paint; g.fill(i.path); }
    g.strokeStyle = 'rgba(0,0,0,.18)'; g.lineWidth = 1; g.stroke(circle(128)); g.stroke(circle(118));
    g.fillStyle = '#e6e8ec'; g.beginPath(); g.arc(C.x, C.y, 5, 0, Math.PI * 2); g.fill();

    const { list, valid, best } = candidates();
    const show = choice && valid?.has(choice) ? choice : best;
    if (show) {
      const accent = getComputedStyle(stage).getPropertyValue('--accent').trim() || '#5b5bd6';
      g.save();
      g.globalAlpha = 0.5; g.fillStyle = accent;
      for (const m of members(show)) g.fill(m.path);
      g.globalAlpha = 1; g.strokeStyle = '#fff'; g.lineWidth = 1.5;
      for (const m of members(show)) g.stroke(m.path);
      g.restore();
    }
    for (const p of points) {
      g.beginPath(); g.arc(p.x, p.y, 8, 0, Math.PI * 2);
      g.fillStyle = p.pos ? '#1f9d6b' : '#d4513d'; g.fill();
      g.strokeStyle = '#fff'; g.lineWidth = 2; g.stroke();
      g.fillStyle = '#fff'; g.font = 'bold 12px Inter'; g.textAlign = 'center'; g.textBaseline = 'middle';
      g.fillText(p.pos ? '+' : '−', p.x, p.y + 0.5);
    }

    const scores = [0.71, 0.86, 0.93];
    stage.querySelector('.cands').innerHTML = list.length
      ? list.map((lv, k) => `<button class="vz-stat ${lv === show ? 'hl' : ''}" data-lv="${lv}" ${valid.has(lv) ? '' : 'disabled style="opacity:.4"'}>${['subpart', 'part', 'whole'][k]}: ${labelOf(lv)} <b>${points.length > 1 ? (valid.has(lv) ? '✓' : '✗') : scores[k].toFixed(2)}</b></button>`).join('')
        + (best ? '' : '<span class="vz-stat">No candidate fits all points — a real model would return something odd here.</span>')
      : '<span class="vz-stat">Click anywhere on the watch to place a point.</span>';

    if (show) {
      if (show.startsWith('index-')) reached.add('index');
      if (show === 'hands') reached.add('hands');
      if (show === 'watch') reached.add('watch');
      if (show === 'glare') reached.add('glare');
    }
    const glabels = { index: 'Segment a single hour index', hands: 'Segment exactly the three hands (hint: 2+ points)', watch: 'Segment the whole watch', glare: 'Find the prompt that segments the reflection instead of the dial' };
    stage.querySelector('.vz-goals').innerHTML = goals.map(k => `<span class="vz-stat ${reached.has(k) ? 'hl' : ''}">${reached.has(k) ? '✓' : '○'} ${glabels[k]}</span>`).join('');
    if (goals.every(k => reached.has(k))) complete();
  }

  cv.addEventListener('pointerdown', e => {
    const r = cv.getBoundingClientRect();
    const x = (e.clientX - r.left) * W / r.width, y = (e.clientY - r.top) * H / r.height;
    points.push({ x, y, pos: mode === 'pos' });
    choice = null;
    draw();
  });
  stage.querySelector('.cands').addEventListener('click', e => {
    const b = e.target.closest('[data-lv]');
    if (b && !b.disabled) { choice = b.dataset.lv; draw(); }
  });
  stage.querySelectorAll('.mode button').forEach(b => b.onclick = () => {
    mode = b.dataset.m; stage.querySelectorAll('.mode button').forEach(x => x.classList.toggle('on', x === b));
  });
  stage.querySelector('.clear').onclick = () => { points = []; choice = null; draw(); };
  draw();
}
