// Slide a 3×3 kernel over a small procedural watch image. Hover to inspect one output value.

import { renderWatch } from './watch-scene.js';

const KERNELS = {
  identity: { name: 'Identity', k: [0, 0, 0, 0, 1, 0, 0, 0, 0] },
  blur: { name: 'Box blur', k: [1, 1, 1, 1, 1, 1, 1, 1, 1].map(v => v / 9) },
  sharpen: { name: 'Sharpen', k: [0, -1, 0, -1, 5, -1, 0, -1, 0] },
  sobelX: { name: 'Vertical edges', k: [-1, 0, 1, -2, 0, 2, -1, 0, 1], signed: true },
  sobelY: { name: 'Horizontal edges', k: [-1, -2, -1, 0, 0, 0, 1, 2, 1], signed: true },
  line: { name: 'Thin-line detector', k: [-1, 2, -1, -1, 2, -1, -1, 2, -1], signed: true },
};

export default function mount(stage, { params }) {
  const N = params.size || 48;
  const img = renderWatch(N);
  const I = img.gray;
  let key = params.kernel || 'sobelX', stride = 1, pad = 1, hover = null;

  stage.innerHTML = `
    <div class="vz">
      <div class="vz-controls">
        <div class="vz-seg kern">${Object.entries(KERNELS).map(([k, v]) => `<button data-k="${k}">${v.name}</button>`).join('')}</div>
      </div>
      <div class="cv-row" style="display:grid;grid-template-columns:1fr auto 1fr;gap:14px;align-items:center">
        <div><canvas class="in" style="image-rendering:pixelated;width:100%"></canvas><div class="vz-note" style="text-align:center">Input ${N}×${N}</div></div>
        <div class="kgrid" style="display:grid;grid-template-columns:repeat(3,44px);gap:3px;font-family:var(--mono);font-size:.78rem"></div>
        <div><canvas class="out" style="image-rendering:pixelated;width:100%"></canvas><div class="vz-note out-label" style="text-align:center"></div></div>
      </div>
      <div class="vz-controls">
        <div class="vz-control"><label>Stride <output class="so">1</output></label><input type="range" class="s" min="1" max="3" step="1" value="1"></div>
        <div class="vz-control"><label>Padding <output class="po">1</output></label><input type="range" class="p" min="0" max="2" step="1" value="1"></div>
      </div>
      <div class="vz-readout calc"></div>
    </div>`;
  const $ = s => stage.querySelector(s);
  const cin = $('.in'), cout = $('.out');

  function conv() {
    const K = KERNELS[key].k;
    const O = Math.floor((N - 3 + 2 * pad) / stride) + 1;
    const out = new Float32Array(O * O);
    const px = (x, y) => (x < 0 || y < 0 || x >= N || y >= N ? 0 : I[y * N + x]);
    for (let oy = 0; oy < O; oy++) for (let ox = 0; ox < O; ox++) {
      let s = 0;
      const x0 = ox * stride - pad, y0 = oy * stride - pad;
      for (let m = 0; m < 3; m++) for (let n = 0; n < 3; n++) s += px(x0 + n, y0 + m) * K[m * 3 + n];
      out[oy * O + ox] = s;
    }
    return { out, O, px };
  }

  function draw() {
    const { out, O, px } = conv();
    const K = KERNELS[key];
    // input
    cin.width = N; cin.height = N;
    const ictx = cin.getContext('2d');
    const id = ictx.createImageData(N, N);
    for (let i = 0; i < N * N; i++) { const v = I[i] * 255; id.data.set([v, v, v, 255], i * 4); }
    ictx.putImageData(id, 0, 0);
    // output
    cout.width = O; cout.height = O;
    const octx = cout.getContext('2d');
    const od = octx.createImageData(O, O);
    let mx = 1e-6; for (const v of out) mx = Math.max(mx, Math.abs(v));
    for (let i = 0; i < O * O; i++) {
      const v = out[i];
      if (K.signed) { const t = Math.abs(v) / mx; const c = v > 0 ? [91, 91, 214] : [214, 79, 120]; od.data.set([255 - (255 - c[0]) * t, 255 - (255 - c[1]) * t, 255 - (255 - c[2]) * t, 255], i * 4); }
      else { const g = Math.max(0, Math.min(1, v)) * 255; od.data.set([g, g, g, 255], i * 4); }
    }
    octx.putImageData(od, 0, 0);
    $('.out-label').textContent = `Output ${O}×${O}${K.signed ? ' · blue = positive, pink = negative' : ''}`;
    $('.kgrid').innerHTML = K.k.map(v => `<span style="display:grid;place-items:center;height:44px;border-radius:8px;background:${v > 0 ? 'var(--accent-soft)' : v < 0 ? '#fcecea' : 'var(--surface-2)'};border:1px solid var(--line)">${Number.isInteger(v) ? v : v.toFixed(2)}</span>`).join('');
    $$('.kern button').forEach(b => b.classList.toggle('on', b.dataset.k === key));

    // hover inspection
    if (hover && hover.ox < O && hover.oy < O) {
      const { ox, oy } = hover;
      const x0 = ox * stride - pad, y0 = oy * stride - pad;
      const sc = cin.clientWidth / N;
      ictx.strokeStyle = '#b14fd8'; ictx.lineWidth = Math.max(0.3, 1 / sc * 1.5);
      ictx.strokeRect(x0, y0, 3, 3);
      octx.strokeStyle = '#b14fd8'; octx.lineWidth = Math.max(0.3, 1.5 * O / cout.clientWidth);
      octx.strokeRect(ox, oy, 1, 1);
      const terms = [];
      for (let m = 0; m < 3; m++) for (let n = 0; n < 3; n++) terms.push(`${px(x0 + n, y0 + m).toFixed(2)}·${Number.isInteger(K.k[m * 3 + n]) ? K.k[m * 3 + n] : K.k[m * 3 + n].toFixed(2)}`);
      $('.calc').innerHTML = `<span class="vz-stat">output (${ox}, ${oy}) = Σ window × kernel = ${terms.slice(0, 3).join(' + ')} + … </span><span class="vz-stat hl">=<b>${out[oy * O + ox].toFixed(3)}</b></span>`;
    } else {
      $('.calc').innerHTML = `<span class="vz-stat">Output size = ⌊(${N} − 3 + 2·${pad}) / ${stride}⌋ + 1 =<b>${O}</b></span><span class="vz-stat">Hover over the output to inspect one weighted sum</span>`;
    }
  }
  const $$ = s => [...stage.querySelectorAll(s)];

  $('.kern').onclick = e => { const b = e.target.closest('button'); if (b) { key = b.dataset.k; draw(); } };
  $('.s').oninput = e => { stride = +e.target.value; $('.so').textContent = stride; draw(); };
  $('.p').oninput = e => { pad = +e.target.value; $('.po').textContent = pad; draw(); };
  const onMove = (e, isOut) => {
    const c = isOut ? cout : cin, r = c.getBoundingClientRect();
    const O = Math.floor((N - 3 + 2 * pad) / stride) + 1;
    if (isOut) hover = { ox: Math.floor((e.clientX - r.left) / r.width * O), oy: Math.floor((e.clientY - r.top) / r.height * O) };
    else { const x = Math.floor((e.clientX - r.left) / r.width * N), y = Math.floor((e.clientY - r.top) / r.height * N); hover = { ox: Math.max(0, Math.round((x - 1 + pad) / stride)), oy: Math.max(0, Math.round((y - 1 + pad) / stride)) }; }
    draw();
  };
  cout.addEventListener('pointermove', e => onMove(e, true));
  cin.addEventListener('pointermove', e => onMove(e, false));
  [cin, cout].forEach(c => c.addEventListener('pointerleave', () => { hover = null; draw(); }));
  draw();
}
