// Logits → softmax probabilities with a temperature knob.
// Goals: make the distribution peaked (max p > 0.95) and flat (entropy > 95% of max).
// params.dino: show the DINO teacher/student temperature presets.

export default function mount(stage, { params, complete }) {
  const labels = params.labels || ['dial', 'bezel', 'hands', 'crown', 'strap'];
  let z = params.logits || [2.0, 1.2, 0.4, -0.5, -1.0];
  let T = 1;
  const goals = params.goals || ['peaked', 'flat'];
  const reached = new Set();
  const K = labels.length;

  stage.innerHTML = `
    <div class="vz">
      <svg class="vz-svg" viewBox="0 0 420 240"></svg>
      <div class="vz-controls">
        <div class="vz-control"><label>Temperature T <output class="oT"></output></label><input type="range" class="T" min="-1.7" max="1" step="0.01" value="0"></div>
        <button class="btn small ghost shift">Add +3 to every logit</button>
      </div>
      ${params.dino ? `<div class="vz-seg dino"><button data-t="0.04">DINO teacher T = 0.04</button><button data-t="0.1">DINO student T = 0.1</button><button data-t="1">plain softmax T = 1</button></div>` : ''}
      <div class="vz-controls logits">${labels.map((l, i) => `<div class="vz-control"><label>logit “${l}” <output data-o="${i}"></output></label><input type="range" min="-4" max="7" step="0.1" data-i="${i}" value="${z[i]}"></div>`).join('')}</div>
      <div class="vz-readout"></div>
      <div class="vz-readout goals"></div>
    </div>`;
  const svg = stage.querySelector('svg');

  function softmax(v, t) {
    const s = v.map(x => x / t);
    const m = Math.max(...s);
    const e = s.map(x => Math.exp(x - m));
    const sum = e.reduce((a, b) => a + b, 0);
    return e.map(x => x / sum);
  }

  function draw() {
    const p = softmax(z, T);
    const H = -p.reduce((a, q) => a + (q > 0 ? q * Math.log(q) : 0), 0);
    const Hmax = Math.log(K);
    const bw = 420 / K;
    svg.innerHTML = p.map((q, i) => {
      const h = q * 180;
      return `<rect x="${i * bw + 14}" y="${200 - h}" width="${bw - 28}" height="${h}" rx="6" fill="url(#accentGrad)" opacity="${0.35 + 0.65 * q}"/>
        <text x="${i * bw + bw / 2}" y="${192 - h}" text-anchor="middle" font-size="13" font-family="JetBrains Mono" fill="var(--ink)">${(q * 100).toFixed(q < 0.1 ? 1 : 0)}%</text>
        <text x="${i * bw + bw / 2}" y="222" text-anchor="middle" font-size="12.5" font-family="Inter" fill="var(--ink-2)">${labels[i]}</text>
        <text x="${i * bw + bw / 2}" y="236" text-anchor="middle" font-size="10.5" font-family="JetBrains Mono" fill="var(--muted)">z=${z[i].toFixed(1)}</text>`;
    }).join('') + `<line x1="0" y1="200" x2="420" y2="200" stroke="var(--line-2)"/>`;
    stage.querySelector('.oT').textContent = T.toFixed(T < 0.1 ? 3 : 2);
    labels.forEach((_, i) => { stage.querySelector(`[data-o="${i}"]`).textContent = z[i].toFixed(1); stage.querySelector(`[data-i="${i}"]`).value = z[i]; });
    const maxp = Math.max(...p);
    if (maxp > 0.95) reached.add('peaked');
    if (H > 0.95 * Hmax) reached.add('flat');
    stage.querySelector('.vz-readout').innerHTML = `
      <span class="vz-stat hl">max p<b>${maxp.toFixed(3)}</b></span>
      <span class="vz-stat">entropy H<b>${H.toFixed(3)}</b></span>
      <span class="vz-stat">max possible log K<b>${Hmax.toFixed(3)}</b></span>
      <span class="vz-stat">Σp<b>${p.reduce((a, b) => a + b, 0).toFixed(3)}</b></span>`;
    const gl = { peaked: 'Make it nearly one-hot (max p > 0.95)', flat: 'Make it nearly uniform (H > 95% of log K)' };
    stage.querySelector('.goals').innerHTML = goals.map(g => `<span class="vz-stat ${reached.has(g) ? 'hl' : ''}">${reached.has(g) ? '✓' : '○'} ${gl[g]}</span>`).join('');
    if (goals.every(g => reached.has(g))) complete();
  }

  const Tin = stage.querySelector('.T');
  Tin.oninput = () => { T = 10 ** +Tin.value; draw(); };
  stage.querySelectorAll('[data-i]').forEach(inp => inp.oninput = () => { z[+inp.dataset.i] = +inp.value; draw(); });
  let shifted = false;
  stage.querySelector('.shift').onclick = e => { z = z.map(v => v + (shifted ? -3 : 3)); shifted = !shifted; e.target.textContent = shifted ? 'Subtract 3 again' : 'Add +3 to every logit'; draw(); };
  stage.querySelectorAll('.dino button').forEach(b => b.onclick = () => {
    T = +b.dataset.t; Tin.value = Math.log10(T);
    stage.querySelectorAll('.dino button').forEach(x => x.classList.toggle('on', x === b));
    draw();
  });
  draw();
}
