// VRAM & throughput estimator for ViT training/inference on RTX 4090-class GPUs.
// A deliberately simple model (see the lesson for the formulas). All numbers are estimates.
// params.goals: subset of GOALS keys; the task completes when all are reached.

const MODELS = [
  { id: 'S', name: 'ViT-S/16', P: 21e6, d: 384, L: 12, p: 16 },
  { id: 'B', name: 'ViT-B/16', P: 86e6, d: 768, L: 12, p: 16 },
  { id: 'L', name: 'ViT-L/16', P: 300e6, d: 1024, L: 24, p: 16 },
  { id: 'H', name: 'ViT-H+/16', P: 840e6, d: 1280, L: 32, p: 16 },
  { id: 'g', name: 'ViT-g/14', P: 1.1e9, d: 1536, L: 40, p: 14 },
  { id: '7B', name: 'ViT-7B/16', P: 6.7e9, d: 4096, L: 40, p: 16 },
];
const GPU_GIB = 24;
const HEAD_PARAMS = 5e6;
const GiB = 2 ** 30;

const GOALS = {
  'fit-l-full': { label: 'Full fine-tune ViT-L/16 at ≥ 512 px with batch ≥ 8 that fits', test: (s, r) => s.model === 'L' && s.mode === 'full' && s.res >= 512 && s.batch >= 8 && r.total <= GPU_GIB },
  'oom-7b': { label: 'See why full fine-tuning ViT-7B is out of reach', test: (s, r) => s.model === '7B' && s.mode === 'full' && r.total > GPU_GIB * 2 },
  '7b-frozen': { label: 'Find a setting where the 7B model runs frozen (feature extraction) on one GPU', test: (s, r) => s.model === '7B' && s.mode === 'frozen' && r.total <= GPU_GIB },
  'lora-l': { label: 'LoRA on ViT-L at 1024 px with batch ≥ 8 that fits (hint: checkpointing)', test: (s, r) => s.model === 'L' && s.mode === 'lora' && s.res >= 1024 && s.batch >= 8 && r.total <= GPU_GIB },
  '7b-lora': { label: 'Make LoRA on the 7B model fit on one card', test: (s, r) => s.model === '7B' && s.mode === 'lora' && r.total <= GPU_GIB },
};

export function estimate(s) {
  const m = MODELS.find(x => x.id === s.model);
  const p = s.patch;
  const N = Math.round(s.res / p) ** 2 + 1;
  const heads = m.d / 64;
  const fp32 = s.precision === 'fp32';
  const pure = s.precision === 'bf16';
  const actScale = fp32 ? 2 : 1;

  // parameters
  const loraParams = m.L * 8 * m.d * s.rank;
  const trainable = s.mode === 'full' ? m.P + HEAD_PARAMS : s.mode === 'lora' ? loraParams + HEAD_PARAMS : HEAD_PARAMS;
  const frozen = s.mode === 'full' ? 0 : m.P;
  const wBytes = pure ? 2 : 4, gBytes = pure ? 2 : 4;
  const oBytes = (s.optim === 'adamw' ? 2 : 1) * (pure ? 2 : 4);
  const frozenBytes = fp32 ? 4 : 2;
  const shard = s.parallel === 'fsdp' ? 2 : 1;
  const weights = (trainable * wBytes + frozen * frozenBytes) / shard;
  const grads = trainable * gBytes / shard;
  const optim = trainable * oBytes / shard;

  // activations (per GPU; batch is per GPU)
  const perLayer = s.batch * N * m.d * 34 * actScale + (s.flash ? 0 : 5 * heads * N * N * s.batch * actScale);
  const headAct = s.batch * (s.res / 4) ** 2 * 256 * 8 * actScale;
  let acts;
  if (s.mode === 'frozen') acts = perLayer + headAct;
  else if (s.ckpt) acts = m.L * s.batch * N * m.d * 2 * actScale + perLayer + headAct;
  else acts = m.L * perLayer + headAct;
  const overhead = 1.2 * GiB;
  const total = (weights + grads + optim + acts + overhead) / GiB;

  // throughput
  const fwd = 2 * m.P * N + 4 * N * N * m.d * m.L;
  const mult = s.mode === 'frozen' ? 1 : s.mode === 'lora' ? 2 : 3;
  const flops = fwd * (mult + (s.mode !== 'frozen' && s.ckpt ? 1 : 0));
  const eff = (fp32 ? 20 : 40) * 1e12;
  const gpus = s.parallel === 'single' ? 1 : 2;
  const commPenalty = s.parallel === 'fsdp' ? 0.7 : s.parallel === 'ddp' ? 0.92 : 1;
  const ips = eff / flops * gpus * commPenalty;

  return {
    m, N, trainable, total,
    parts: { weights: weights / GiB, grads: grads / GiB, optim: optim / GiB, acts: acts / GiB, overhead: overhead / GiB },
    ips, hours100k: 100000 / ips / 3600,
    featGB: 100000 * (N - 1) * m.d * 2 / 1e9,
  };
}

export default function mount(stage, { params, complete }) {
  const goals = params.goals || [];
  const reached = new Set();
  const s = Object.assign({ model: 'B', patch: 16, mode: 'frozen', precision: 'amp', optim: 'adamw', parallel: 'single', ckpt: false, flash: true, batch: 16, res: 512, rank: 16 }, params.start || {});

  const seg = (key, opts) => `<div class="vz-seg" data-key="${key}">${opts.map(([v, l]) => `<button data-v="${v}">${l}</button>`).join('')}</div>`;
  stage.innerHTML = `
    <div class="vz vram">
      <div class="vz-controls">${seg('model', MODELS.map(m => [m.id, m.name]))}</div>
      <div class="vz-controls">
        ${seg('mode', [['frozen', 'Frozen + head'], ['lora', 'LoRA'], ['full', 'Full fine-tune']])}
        ${seg('precision', [['fp32', 'fp32'], ['amp', 'bf16 mixed'], ['bf16', 'pure bf16']])}
      </div>
      <div class="vz-controls">
        ${seg('optim', [['adamw', 'AdamW'], ['sgd', 'SGD+momentum']])}
        ${seg('parallel', [['single', '1 GPU'], ['ddp', 'DDP ×2'], ['fsdp', 'FSDP ×2']])}
        ${seg('patch', [['14', 'patch 14'], ['16', 'patch 16']])}
      </div>
      <div class="vz-controls">
        <div class="vz-control"><label>Batch per GPU <output data-o="batch"></output></label><input type="range" data-k="batch" min="1" max="64" step="1"></div>
        <div class="vz-control"><label>Resolution <output data-o="res"></output></label><input type="range" data-k="res" min="224" max="1024" step="32"></div>
        <div class="vz-control lora-only"><label>LoRA rank r <output data-o="rank"></output></label><input type="range" data-k="rank" min="4" max="64" step="4"></div>
      </div>
      <div class="vz-controls">
        <label class="vz-note"><input type="checkbox" data-c="ckpt"> Gradient checkpointing</label>
        <label class="vz-note"><input type="checkbox" data-c="flash"> Memory-efficient attention (SDPA / Flash)</label>
      </div>
      <div class="vram-bar-wrap">
        <div class="vram-bar"></div>
        <div class="vram-limit"><span>24 GB · one RTX 4090</span></div>
      </div>
      <div class="vram-legend"></div>
      <div class="vram-verdict"></div>
      <div class="vz-readout stats"></div>
      <div class="vz-readout goals"></div>
      <p class="vz-note">Estimates only: 16 bytes/trainable parameter for mixed-precision AdamW, ~34 bytes per token × width per layer for activations, ~40 effective TFLOP/s per GPU in bf16. Real numbers vary ±30% with implementation, data loading and kernel choice.</p>
    </div>
    <style>
      .vram-bar-wrap { position: relative; padding-top: 22px; }
      .vram-bar { display: flex; height: 34px; border-radius: 10px; overflow: hidden; background: var(--surface-2); border: 1px solid var(--line); }
      .vram-bar span { height: 100%; transition: width .3s; }
      .vram-limit { position: absolute; top: 0; bottom: 0; border-left: 2px dashed var(--ink); pointer-events: none; }
      .vram-limit span { position: absolute; top: 0; left: 6px; font-size: .72rem; white-space: nowrap; color: var(--ink-2); font-weight: 600; }
      .vram-legend { display: flex; flex-wrap: wrap; gap: 6px 14px; font-size: .8rem; color: var(--ink-2); }
      .vram-legend i { display: inline-block; width: 10px; height: 10px; border-radius: 3px; margin-right: 5px; vertical-align: -1px; }
      .vram-verdict { font-weight: 600; font-size: 1.02rem; }
      .vram-verdict.ok { color: var(--good); } .vram-verdict.tight { color: var(--warn); } .vram-verdict.oom { color: var(--bad); }
      .vram .vz-seg button { font-size: .8rem; }
    </style>`;

  const COLORS = { weights: 'var(--accent)', grads: 'color-mix(in oklab, var(--accent) 55%, var(--accent-2))', optim: 'var(--accent-2)', acts: '#e39b3b', overhead: '#b9b9c9' };
  const NAMES = { weights: 'Weights', grads: 'Gradients', optim: 'Optimizer state', acts: 'Activations', overhead: 'CUDA context & fragmentation' };
  const fmt = (x) => x >= 100 ? x.toFixed(0) : x >= 10 ? x.toFixed(1) : x.toFixed(2);
  const fmtP = (x) => x >= 1e9 ? (x / 1e9).toFixed(1) + 'B' : x >= 1e6 ? (x / 1e6).toFixed(1) + 'M' : (x / 1e3).toFixed(0) + 'k';
  const fmtT = (h) => h < 1 / 60 ? `${Math.max(1, Math.round(h * 3600))} s` : h < 1 ? `${Math.round(h * 60)} min` : h < 48 ? `${h.toFixed(1)} h` : `${(h / 24).toFixed(1)} days`;

  function sync() {
    stage.querySelectorAll('.vz-seg').forEach(g => g.querySelectorAll('button').forEach(b => b.classList.toggle('on', String(s[g.dataset.key]) === b.dataset.v)));
    stage.querySelectorAll('input[type=range]').forEach(i => { i.value = s[i.dataset.k]; });
    stage.querySelectorAll('[data-o]').forEach(o => { o.textContent = o.dataset.o === 'res' ? `${s.res} px` : s[o.dataset.o]; });
    stage.querySelectorAll('input[data-c]').forEach(c => { c.checked = s[c.dataset.c]; });
    stage.querySelector('.lora-only').style.display = s.mode === 'lora' ? '' : 'none';
    draw();
  }

  function draw() {
    const r = estimate(s);
    const scale = Math.max(GPU_GIB * 1.25, r.total * 1.05);
    stage.querySelector('.vram-bar').innerHTML = Object.entries(r.parts).map(([k, v]) => `<span title="${NAMES[k]}: ${fmt(v)} GB" style="width:${(v / scale) * 100}%;background:${COLORS[k]}"></span>`).join('');
    stage.querySelector('.vram-limit').style.left = `${(GPU_GIB / scale) * 100}%`;
    stage.querySelector('.vram-legend').innerHTML = Object.entries(r.parts).map(([k, v]) => `<span><i style="background:${COLORS[k]}"></i>${NAMES[k]} ${fmt(v)} GB</span>`).join('');
    const v = stage.querySelector('.vram-verdict');
    const pct = r.total / GPU_GIB;
    v.className = `vram-verdict ${pct <= 0.85 ? 'ok' : pct <= 1 ? 'tight' : 'oom'}`;
    v.textContent = pct <= 0.85 ? `≈ ${fmt(r.total)} GB per GPU — fits comfortably.`
      : pct <= 1 ? `≈ ${fmt(r.total)} GB per GPU — tight; may OOM with fragmentation or a bigger head.`
      : `≈ ${fmt(r.total)} GB per GPU — out of memory (${(pct).toFixed(1)}× a 24 GB card).`;
    const task = s.mode === 'frozen' ? 'one pass over 100k images' : 'one epoch over 100k images';
    stage.querySelector('.stats').innerHTML = `
      <span class="vz-stat">tokens / image<b>${r.N}</b></span>
      <span class="vz-stat">trainable params<b>${fmtP(r.trainable)}</b></span>
      <span class="vz-stat hl">≈ images/s (total)<b>${r.ips >= 10 ? r.ips.toFixed(0) : r.ips.toFixed(1)}</b></span>
      <span class="vz-stat hl">${task}<b>${fmtT(r.hours100k)}</b></span>
      ${s.mode === 'frozen' ? `<span class="vz-stat">patch features for 100k imgs (fp16)<b>${r.featGB >= 1000 ? (r.featGB / 1000).toFixed(1) + ' TB' : r.featGB.toFixed(0) + ' GB'}</b></span>` : ''}`;
    for (const g of goals) if (GOALS[g]?.test(s, r)) reached.add(g);
    stage.querySelector('.goals').innerHTML = goals.map(g => `<span class="vz-stat ${reached.has(g) ? 'hl' : ''}">${reached.has(g) ? '✓' : '○'} ${GOALS[g].label}</span>`).join('');
    if (goals.length && goals.every(g => reached.has(g))) complete();
  }

  stage.querySelectorAll('.vz-seg').forEach(g => g.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    const k = g.dataset.key;
    s[k] = k === 'patch' ? +b.dataset.v : b.dataset.v;
    if (k === 'model') s.patch = MODELS.find(m => m.id === s.model).p;
    sync();
  }));
  stage.querySelectorAll('input[type=range]').forEach(i => i.addEventListener('input', () => { s[i.dataset.k] = +i.value; sync(); }));
  stage.querySelectorAll('input[data-c]').forEach(c => c.addEventListener('change', () => { s[c.dataset.c] = c.checked; sync(); }));
  sync();
}
