// Click a patch (the query) and see how much it attends to every other patch.
// Patch features are derived from the procedural watch's part labels, so "heads"
// can be defined transparently: same-part, neighbourhood, and a relational head.

import { renderWatch, drawToCanvas, LABELS } from './watch-scene.js';

const G = 14, P = 16, S = G * P; // 14×14 patches of 16 px = 224 px, like ViT-B/16
const RELATION = { background: 'background', strap: 'case', case: 'crown', bezel: 'dial', dial: 'hand', index: 'hand', hand: 'index', crown: 'case' };

export default function mount(stage, { params }) {
  const img = renderWatch(S, { supersample: 1 });
  // content feature per patch = fraction of each label inside the patch
  const feats = [];
  for (let gy = 0; gy < G; gy++) for (let gx = 0; gx < G; gx++) {
    const f = new Float32Array(LABELS.length);
    for (let y = 0; y < P; y++) for (let x = 0; x < P; x++) f[img.labels[(gy * P + y) * S + gx * P + x]]++;
    for (let i = 0; i < f.length; i++) f[i] /= P * P;
    // thin parts cover few pixels; boost so a patch containing a hand "is" a hand patch
    f[5] = Math.min(1, f[5] * 4); f[6] = Math.min(1, f[6] * 4);
    const n = Math.hypot(...f) || 1;
    feats.push({ f: f.map(v => v / n), gx, gy });
  }
  let head = params.head || 'content', temp = 1, query = params.query ?? (7 * G + 10);

  stage.innerHTML = `
    <div class="vz">
      <div class="vz-controls">
        <div class="vz-seg heads">
          <button data-h="content">Head A · same part</button>
          <button data-h="position">Head B · neighbours</button>
          <button data-h="relation">Head C · related part</button>
        </div>
      </div>
      <div style="position:relative;max-width:440px;margin:0 auto;width:100%">
        <canvas class="img" style="width:100%"></canvas>
        <canvas class="heat" style="position:absolute;inset:0;width:100%;height:100%;border:0;background:none;cursor:crosshair"></canvas>
      </div>
      <div class="vz-controls">
        <div class="vz-control"><label>Softmax temperature τ <output class="to">1.00</output></label><input type="range" class="t" min="-2" max="2" step="0.05" value="0"></div>
      </div>
      <div class="vz-readout stats"></div>
      <p class="vz-note head-note"></p>
    </div>`;
  const $ = s => stage.querySelector(s);
  drawToCanvas($('.img'), img);
  const heat = $('.heat'); heat.width = S; heat.height = S;
  const hctx = heat.getContext('2d');

  function scores(qi) {
    const q = feats[qi];
    return feats.map(k => {
      if (head === 'content') return 6 * q.f.reduce((s, v, i) => s + v * k.f[i], 0);
      if (head === 'position') return -((q.gx - k.gx) ** 2 + (q.gy - k.gy) ** 2) / 3;
      const main = q.f.indexOf(Math.max(...q.f));
      const target = LABELS.indexOf(RELATION[LABELS[main]]);
      return 6 * k.f[target];
    });
  }

  function draw() {
    const s = scores(query).map(v => v / temp);
    const mx = Math.max(...s);
    const e = s.map(v => Math.exp(v - mx));
    const Z = e.reduce((a, b) => a + b, 0);
    const w = e.map(v => v / Z);
    const wmax = Math.max(...w);
    const H = -w.reduce((a, p) => a + (p > 0 ? p * Math.log(p) : 0), 0);
    hctx.clearRect(0, 0, S, S);
    for (let i = 0; i < w.length; i++) {
      const { gx, gy } = feats[i];
      const a = w[i] / wmax;
      hctx.fillStyle = `rgba(22,22,42,${0.72 * (1 - a)})`;
      hctx.fillRect(gx * P, gy * P, P, P);
      if (a > 0.15) { hctx.fillStyle = `rgba(177,79,216,${0.45 * a})`; hctx.fillRect(gx * P, gy * P, P, P); }
    }
    const q = feats[query];
    hctx.strokeStyle = '#fff'; hctx.lineWidth = 2.5; hctx.strokeRect(q.gx * P + 1, q.gy * P + 1, P - 2, P - 2);
    hctx.strokeStyle = '#5b5bd6'; hctx.lineWidth = 1.2; hctx.strokeRect(q.gx * P + 1, q.gy * P + 1, P - 2, P - 2);
    const main = LABELS[q.f.indexOf(Math.max(...q.f))];
    $('.stats').innerHTML = `
      <span class="vz-stat">query patch<b>(${q.gx}, ${q.gy}) · ${main}</b></span>
      <span class="vz-stat">tokens<b>${G * G}</b></span>
      <span class="vz-stat hl">max weight<b>${wmax.toFixed(3)}</b></span>
      <span class="vz-stat hl">effective # patches attended<b>${Math.exp(H).toFixed(1)}</b></span>`;
    $('.head-note').innerHTML = {
      content: 'Head A scores patches by the dot product of their content features: patches showing the <b>same part</b> as the query win.',
      position: 'Head B ignores content and prefers <b>nearby</b> patches — a learned, soft version of a convolution’s local window.',
      relation: `Head C maps the query to a <b>related</b> part (${main} → ${RELATION[main]}): the query’s projection $W_Q$ need not look like the key it matches.`,
    }[head].replace(/\$W_Q\$/, 'W<sub>Q</sub>');
    stage.querySelectorAll('.heads button').forEach(b => b.classList.toggle('on', b.dataset.h === head));
  }

  heat.addEventListener('pointerdown', e => {
    const r = heat.getBoundingClientRect();
    const gx = Math.floor((e.clientX - r.left) / r.width * G), gy = Math.floor((e.clientY - r.top) / r.height * G);
    query = Math.max(0, Math.min(G - 1, gy)) * G + Math.max(0, Math.min(G - 1, gx));
    draw();
  });
  $('.heads').onclick = e => { const b = e.target.closest('button'); if (b) { head = b.dataset.h; draw(); } };
  $('.t').oninput = e => { temp = Math.pow(4, +e.target.value); $('.to').textContent = temp.toFixed(2); draw(); };
  draw();
}
