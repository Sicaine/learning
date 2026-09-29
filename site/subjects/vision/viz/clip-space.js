// CLIP zero-shot in 2D: normalized embeddings live on a circle (a sphere in
// high dimensions). Drag the text prompts around the circle; each image is
// classified by the nearest prompt (highest cosine similarity), softmaxed with
// a temperature. Goal: classify every image correctly.

export default function mount(stage, { complete }) {
  const W = 420, H = 400, C = { x: 210, y: 200 }, R = 150;
  const colors = ['#5b5bd6', '#d4513d', '#1f9d6b', '#c7861b'];
  const labels = ['dive watch', 'dress watch', 'chronograph', 'pocket watch'];
  // image embeddings: angle (deg) + true class
  const images = [
    { a: 18, c: 0, name: 'diver, black bezel' }, { a: 40, c: 0, name: 'diver on rubber' },
    { a: 105, c: 1, name: 'thin gold dress' }, { a: 128, c: 1, name: 'white dial, leather' },
    { a: 200, c: 2, name: 'racing chrono' }, { a: 228, c: 2, name: 'panda chrono' },
    { a: 300, c: 3, name: 'open-face pocket' }, { a: 332, c: 3, name: 'hunter case' },
  ];
  // text prompt embeddings start badly placed
  const texts = [{ a: 80 }, { a: 170 }, { a: 250 }, { a: 350 }];
  let temp = 0.07, sel = 0, solved = false;

  stage.innerHTML = `
    <div class="vz">
      <svg class="vz-svg" viewBox="0 0 ${W} ${H}"></svg>
      <div class="vz-controls">
        <div class="vz-control"><label>temperature τ <output></output></label><input type="range" min="0.01" max="1" step="0.01" value="0.07"></div>
      </div>
      <div class="vz-readout probs"></div>
      <div class="vz-readout acc"></div>
      <p class="vz-note">Squares = image embeddings (click one to inspect), diamonds = text embeddings of <code>"a photo of a {label}"</code>. All vectors are normalized, so they sit on the unit circle and cosine similarity = cos(angle). <b>Drag the diamonds</b> — that's what better prompts (or fine-tuning) do.</p>
    </div>`;
  const svg = stage.querySelector('svg');
  const rad = d => d * Math.PI / 180;
  const pos = (a, r = R) => [C.x + r * Math.cos(rad(a)), C.y - r * Math.sin(rad(a))];

  function probs(img) {
    const sims = texts.map(t => Math.cos(rad(img.a - t.a)));
    const ex = sims.map(s => Math.exp(s / temp));
    const z = ex.reduce((a, b) => a + b, 0);
    return { sims, p: ex.map(e => e / z) };
  }

  function draw() {
    const preds = images.map(img => { const { p } = probs(img); return p.indexOf(Math.max(...p)); });
    const correct = preds.filter((p, i) => p === images[i].c).length;
    svg.innerHTML = `
      <circle cx="${C.x}" cy="${C.y}" r="${R}" fill="none" stroke="var(--line)" stroke-width="2"/>
      <circle cx="${C.x}" cy="${C.y}" r="3" fill="var(--muted)"/>
      ${(() => { const [x, y] = pos(images[sel].a); return `<line x1="${C.x}" y1="${C.y}" x2="${x}" y2="${y}" stroke="var(--ink)" stroke-width="1.5" stroke-dasharray="3 3"/>`; })()}
      ${texts.map((t, i) => { const [x, y] = pos(t.a); return `<line x1="${C.x}" y1="${C.y}" x2="${x}" y2="${y}" stroke="${colors[i]}" stroke-width="1" opacity=".35"/>`; }).join('')}
      ${images.map((img, i) => {
        const [x, y] = pos(img.a);
        const ok = preds[i] === img.c;
        return `<g data-img="${i}" style="cursor:pointer"><rect x="${x - 8}" y="${y - 8}" width="16" height="16" rx="3" fill="${colors[img.c]}" stroke="${i === sel ? 'var(--ink)' : '#fff'}" stroke-width="${i === sel ? 3 : 2}"/>
          <text x="${x}" y="${y + 4}" text-anchor="middle" font-size="10" fill="#fff" font-weight="700">${ok ? '✓' : '✗'}</text></g>`;
      }).join('')}
      ${texts.map((t, i) => {
        const [x, y] = pos(t.a); const [lx, ly] = pos(t.a, R + 30);
        return `<g data-text="${i}" style="cursor:grab"><path d="M${x} ${y - 12} L${x + 12} ${y} L${x} ${y + 12} L${x - 12} ${y} Z" fill="#fff" stroke="${colors[i]}" stroke-width="3"/>
          <text x="${lx}" y="${ly + 4}" text-anchor="middle" font-size="11.5" font-family="Inter" font-weight="600" fill="${colors[i]}">${labels[i]}</text></g>`;
      }).join('')}`;

    const { sims, p } = probs(images[sel]);
    stage.querySelector('.probs').innerHTML = `<span class="vz-stat">image: <b>${images[sel].name}</b></span>` +
      labels.map((l, i) => `<span class="vz-stat ${p[i] === Math.max(...p) ? 'hl' : ''}" style="border-left:3px solid ${colors[i]}">${l}: cos ${sims[i].toFixed(2)} → p <b>${(p[i] * 100).toFixed(0)}%</b></span>`).join('');
    stage.querySelector('.acc').innerHTML = `<span class="vz-stat ${correct === images.length ? 'hl' : ''}">zero-shot accuracy <b>${correct}/${images.length}</b></span>`;
    stage.querySelector('output').textContent = temp.toFixed(2);
    if (correct === images.length && !solved) { solved = true; complete(); }
  }

  let drag = null;
  const angleOf = e => {
    const r = svg.getBoundingClientRect();
    const x = (e.clientX - r.left) * W / r.width - C.x, y = C.y - (e.clientY - r.top) * H / r.height;
    return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
  };
  svg.addEventListener('pointerdown', e => {
    const t = e.target.closest('[data-text]'), im = e.target.closest('[data-img]');
    if (t) { drag = +t.dataset.text; svg.setPointerCapture(e.pointerId); }
    else if (im) { sel = +im.dataset.img; draw(); }
  });
  svg.addEventListener('pointermove', e => { if (drag !== null) { texts[drag].a = Math.round(angleOf(e)); draw(); } });
  svg.addEventListener('pointerup', () => { drag = null; });
  stage.querySelector('input').oninput = e => { temp = +e.target.value; draw(); };
  draw();
}
