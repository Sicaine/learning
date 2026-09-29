// Drag a predicted mask over the ground truth and watch IoU and Dice.
// "Thin hand" mode shows how brutal IoU is for thin structures like a second hand.

export default function mount(stage, { complete }) {
  const W = 420, H = 300;
  let mode = 'box';
  const gtBox = { x: 130, y: 80, w: 150, h: 120 };
  let pred = { x: 230, y: 150, w: 150, h: 120 };
  const gtHand = { cx: 210, cy: 150, len: 170, w: 4, ang: -28 };
  let handOff = { dx: 3, dy: 5 };
  let handW = 4;
  const reached = new Set();

  stage.innerHTML = `
    <div class="vz">
      <div class="vz-controls">
        <div class="vz-seg mode"><button data-m="box" class="on">Boxes / blobs</button><button data-m="hand">Thin hand</button></div>
        <div class="vz-control hw" hidden><label>Predicted hand width <output>4 px</output></label><input type="range" min="2" max="14" value="4"></div>
      </div>
      <svg class="vz-svg" viewBox="0 0 ${W} ${H}"></svg>
      <div class="vz-readout stats"></div>
      <div class="vz-readout goals"></div>
      <p class="vz-note">Green dashed = ground truth · blue = prediction (drag it${' '}— in box mode drag the corner dot to resize).</p>
    </div>`;
  const svg = stage.querySelector('svg');
  const $ = s => stage.querySelector(s);

  function rectIoU(a, b) {
    const ix = Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x));
    const iy = Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
    const inter = ix * iy, A = a.w * a.h, B = b.w * b.h;
    return { inter, A, B, union: A + B - inter };
  }
  function inHand(px, py, h, w) {
    const a = h.ang * Math.PI / 180, ux = Math.cos(a), uy = Math.sin(a);
    const dx = px - h.cx, dy = py - h.cy;
    const along = dx * ux + dy * uy, across = -dx * uy + dy * ux;
    return Math.abs(along) <= h.len / 2 && Math.abs(across) <= w / 2;
  }
  function handIoU() {
    const p = { ...gtHand, cx: gtHand.cx + handOff.dx, cy: gtHand.cy + handOff.dy };
    let inter = 0, A = 0, B = 0; const st = 0.5;
    for (let y = 40; y < 260; y += st) for (let x = 80; x < 340; x += st) {
      const g = inHand(x, y, gtHand, gtHand.w), q = inHand(x, y, p, handW);
      if (g) A++; if (q) B++; if (g && q) inter++;
    }
    return { inter, A, B, union: A + B - inter };
  }
  const handPoly = (h, w) => {
    const a = h.ang * Math.PI / 180, ux = Math.cos(a), uy = Math.sin(a), vx = -uy, vy = ux, L = h.len / 2, s = w / 2;
    return [[L, s], [L, -s], [-L, -s], [-L, s]].map(([p, q]) => `${h.cx + ux * p + vx * q},${h.cy + uy * p + vy * q}`).join(' ');
  };

  function draw() {
    let r;
    if (mode === 'box') {
      r = rectIoU(gtBox, pred);
      svg.innerHTML = `
        <rect x="${gtBox.x}" y="${gtBox.y}" width="${gtBox.w}" height="${gtBox.h}" fill="rgba(31,157,107,.12)" stroke="#1f9d6b" stroke-width="2" stroke-dasharray="6 4"/>
        <rect class="p" x="${pred.x}" y="${pred.y}" width="${pred.w}" height="${pred.h}" fill="color-mix(in oklab, var(--accent) 22%, transparent)" stroke="var(--accent)" stroke-width="2" style="cursor:move"/>
        <circle class="rs" cx="${pred.x + pred.w}" cy="${pred.y + pred.h}" r="8" fill="var(--accent)" style="cursor:nwse-resize"/>`;
    } else {
      r = handIoU();
      const p = { ...gtHand, cx: gtHand.cx + handOff.dx, cy: gtHand.cy + handOff.dy };
      svg.innerHTML = `
        <circle cx="${gtHand.cx}" cy="${gtHand.cy}" r="125" fill="#f4efe4" stroke="#d9d3c4"/>
        <polygon points="${handPoly(gtHand, gtHand.w)}" fill="rgba(31,157,107,.35)" stroke="#1f9d6b" stroke-width="1" stroke-dasharray="3 2"/>
        <polygon class="p" points="${handPoly(p, handW)}" fill="color-mix(in oklab, var(--accent) 45%, transparent)" stroke="var(--accent)" stroke-width="1" style="cursor:move"/>
        <rect x="0" y="0" width="${W}" height="${H}" fill="transparent" class="p" style="cursor:move"/>`;
    }
    const iou = r.union ? r.inter / r.union : 0, dice = r.A + r.B ? 2 * r.inter / (r.A + r.B) : 0;
    const off = Math.hypot(handOff.dx, handOff.dy);
    $('.stats').innerHTML = `
      <span class="vz-stat">intersection<b>${Math.round(r.inter * (mode === 'hand' ? 0.25 : 1))} px²</b></span>
      <span class="vz-stat">union<b>${Math.round(r.union * (mode === 'hand' ? 0.25 : 1))} px²</b></span>
      <span class="vz-stat hl">IoU<b>${iou.toFixed(3)}</b></span>
      <span class="vz-stat hl">Dice<b>${dice.toFixed(3)}</b></span>
      ${mode === 'hand' ? `<span class="vz-stat">offset<b>${off.toFixed(1)} px</b></span>` : ''}`;
    if (mode === 'box' && iou >= 0.9) reached.add('box');
    if (mode === 'box' && iou > 0 && iou < 0.5 && dice > 0.5) reached.add('dice');
    if (mode === 'hand' && off >= 1.5 && off <= 4 && iou < 0.5) reached.add('hand');
    const labels = {
      box: 'Box mode: reach IoU ≥ 0.90',
      dice: 'Box mode: find a spot where Dice > 0.5 but IoU < 0.5',
      hand: 'Thin hand: offset of only 1.5–4 px with IoU < 0.5',
    };
    $('.goals').innerHTML = Object.entries(labels).map(([k, t]) => `<span class="vz-stat ${reached.has(k) ? 'hl' : ''}">${reached.has(k) ? '✓' : '○'} ${t}</span>`).join('');
    if (reached.size === 3) complete();
  }

  const pt = e => { const b = svg.getBoundingClientRect(); return { x: (e.clientX - b.left) * W / b.width, y: (e.clientY - b.top) * H / b.height }; };
  let drag = null;
  svg.addEventListener('pointerdown', e => {
    const p = pt(e);
    if (mode === 'box') {
      if (e.target.classList.contains('rs')) drag = { kind: 'resize' };
      else if (e.target.classList.contains('p')) drag = { kind: 'move', ox: p.x - pred.x, oy: p.y - pred.y };
    } else drag = { kind: 'hand', ox: p.x - handOff.dx * 8, oy: p.y - handOff.dy * 8 };
    if (drag) svg.setPointerCapture(e.pointerId);
  });
  svg.addEventListener('pointermove', e => {
    if (!drag) return;
    const p = pt(e);
    if (drag.kind === 'move') { pred.x = p.x - drag.ox; pred.y = p.y - drag.oy; }
    else if (drag.kind === 'resize') { pred.w = Math.max(20, p.x - pred.x); pred.h = Math.max(20, p.y - pred.y); }
    else {
      // hand moves at 1/8 speed so pixel-level offsets are controllable
      handOff = { dx: Math.round((p.x - drag.ox) / 8 * 2) / 2, dy: Math.round((p.y - drag.oy) / 8 * 2) / 2 };
    }
    draw();
  });
  svg.addEventListener('pointerup', () => { drag = null; });
  $('.mode').onclick = e => {
    const b = e.target.closest('button'); if (!b) return;
    mode = b.dataset.m;
    stage.querySelectorAll('.mode button').forEach(x => x.classList.toggle('on', x === b));
    $('.hw').hidden = mode !== 'hand';
    draw();
  };
  $('.hw input').oninput = e => { handW = +e.target.value; $('.hw output').textContent = `${handW} px`; draw(); };
  draw();
}
