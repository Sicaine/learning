export default {
  id: 'compute-budget',
  title: 'What fits on 2× RTX 4090?',
  summary: 'Before you run an experiment, you can estimate whether it fits in 24 GB and how long it will take. Learn the four things that fill [[vram|VRAM]], the tricks that shrink each one, and realistic orders of magnitude for DINOv3-scale models on your machine.',
  minutes: 40,
  goals: [
    'Estimate training memory from parameters, precision, optimizer and activations',
    'Explain why resolution is the most expensive knob for ViTs',
    'Choose between frozen features, [[lora|LoRA]] and full [[fine-tuning]] for a given budget',
    'Know what two GPUs *without* NVLink can and cannot do together',
    'Give realistic run-time estimates for your 100k images — and verify them by measuring',
  ],
  blocks: [
    {
      id: 'four-consumers', type: 'text', title: 'Four things fill your GPU',
      md: `
During training, [[vram|VRAM]] holds:

1. **Weights** — the parameters $P$.
2. **Gradients** — one value per *trainable* parameter.
3. **Optimizer state** — [[adamw|AdamW]] keeps two running averages (momentum and variance) per trainable parameter.
4. **Activations** — every intermediate result of the forward pass that [[backpropagation]] needs later.

With standard [[mixed-precision|mixed precision]] ([bf16](wiki:Bfloat16 floating-point format|Bfloat16) compute, fp32 master weights), each **trainable** parameter costs about

$$\\underbrace{4}_{\\text{fp32 weight}} + \\underbrace{4}_{\\text{gradient}} + \\underbrace{8}_{\\text{AdamW } m, v} = 16\\ \\text{bytes}$$

— the accounting popularized by the ZeRO paper.[^zero] A **frozen** parameter only needs its weight: 2 bytes in bf16.

Activations for a [[vit|ViT]] scale with depth $L$, [[batch]] size $B$, number of [[token|tokens]] $N$ and width $d$ — roughly $L \\cdot B \\cdot N \\cdot d \\cdot 34$ bytes in bf16 with memory-efficient attention. Put together:

$$M \\approx 16\\,P_{\\text{train}} + 2\\,P_{\\text{frozen}} + 34\\,L B N d\\ \\ [\\text{bytes}] + \\text{overhead}$$

These are estimates (implementations differ by ±30%), but they are good enough to know *before* you start whether something has a chance.`,
    },
    {
      id: 'calc-adam', type: 'numeric', title: 'Full fine-tuning ViT-L: parameter memory',
      question: 'DINOv3 ViT-L/16 has about **300M** parameters.[^dinov3-repo] Using the 16 bytes/parameter rule, how much memory do weights + gradients + AdamW state need for full fine-tuning? (GB = $10^9$ bytes)',
      answer: 4.8, tolerance: 0.05, unit: 'GB',
      hint: '$300 \\times 10^6 \\times 16$ bytes.',
      explain: '$4.8 \\times 10^9$ bytes ≈ 4.8 GB. That fits easily — for ViT-L, **activations**, not parameters, decide how large your batch and resolution can be. For the 7B model the same rule gives ~107 GB before a single activation.',
    },
    {
      id: 'resolution', type: 'text', title: 'Resolution: the quadratic knob',
      md: `
A ViT cuts the image into patches of [[patch-size]] $p$; the number of tokens is

$$N = \\left(\\frac{\\text{resolution}}{p}\\right)^2$$

Double the resolution → **4× the tokens** → 4× activation memory and ≥4× compute. The attention matrix itself is $N \\times N$, so naive attention memory grows with $N^2$ — **16×** for double resolution. Memory-efficient attention kernels ([PyTorch](wiki:PyTorch|PyTorch) SDPA / FlashAttention) avoid storing that matrix, which is why they are non-negotiable at high resolution.

Why you care: a seconds hand that is 6 pixels wide in a 512-px image is less than half a 16-px patch wide. Higher resolution (or cropping the watch region first) is often the most effective fix for thin parts — and the most expensive one.`,
    },
    {
      id: 'calc-tokens', type: 'numeric', title: 'Tokens at high resolution',
      question: 'How many patch tokens does a patch-16 ViT produce for a **1024 × 1024** image?',
      answer: 4096, tolerance: 0,
      explain: '$(1024/16)^2 = 64^2 = 4096$ tokens (+1 CLS, + register tokens if the model has them). At 512 px it is 1,024 tokens — 4× fewer.',
    },
    {
      id: 'hardware', type: 'text', title: 'Your hardware, honestly',
      md: `
**2× RTX 4090, 24 GB each.** Consequences:

- **Memory does not pool.** Two 24 GB cards are not one 48 GB card. Every GPU must hold what its own work needs.
- **No [NVLink](wiki:NVLink|NVLink).** The [4090](wiki:GeForce RTX 40 series|Nvidia-GeForce-40-Serie) has no NVLink connector; [GPUs](wiki:Graphics processing unit|Grafikprozessor) talk over [PCIe](wiki:PCI Express|PCI Express) — on many consumer boards at x8/x8 when both slots are populated, and GeForce cards generally don't support direct peer-to-peer transfers, so traffic may route through system memory.
- **[[ddp|DDP]] works well:** each GPU keeps a full model copy and processes half the batch; only gradients are exchanged once per step. For ViT-L that is ~0.6–1.2 GB per step — noticeable but mostly hidden behind the backward pass. Expect close to 2× throughput.
- **[[fsdp|FSDP]] is a poor fit:** sharding weights across the two cards means gathering them over PCIe for every layer, forward and backward. It halves parameter memory at best and does nothing for activations.
- **128 GB [RAM](wiki:Random-access memory|Random-Access Memory)** is plenty for data loading and caching. It also allows CPU offloading of optimizer states ([DeepSpeed](wiki:DeepSpeed) ZeRO-Offload style), but at a large speed cost — useful for curiosity, not for iteration.
- **Compute:** a 4090 delivers very roughly 40 [TFLOP/s](wiki:FLOPS|Floating Point Operations Per Second) *sustained* in bf16 training (peak numbers on spec sheets are 2–4× higher). Data loading — decoding and resizing [JPEGs](wiki:JPEG|JPEG) — is frequently the real bottleneck; give the dataloader enough CPU workers or pre-resize your images.`,
    },
    {
      id: 'viz-vram', type: 'viz', viz: 'vram-calculator', title: 'VRAM & time calculator',
      params: { goals: ['fit-l-full', '7b-frozen', 'oom-7b', 'lora-l'] },
      task: 'Reach all four goals. Along the way, notice: (1) which bar segment dominates for ViT-L vs for ViT-7B, (2) that LoRA barely reduces **activation** memory, (3) what checkpointing costs in images/s, (4) how storage explodes if you cache dense features.',
    },
    {
      id: 'tricks', type: 'text', title: 'The toolbox, sorted by what it shrinks',
      md: `
<table>
<tr><th>Technique</th><th>Shrinks</th><th>Cost</th></tr>
<tr><td>bf16 mixed precision</td><td>activations (~½), faster matmuls</td><td>almost free on RTX 4090 — default</td></tr>
<tr><td>Memory-efficient attention (SDPA/Flash)</td><td>the $N^2$ attention matrix</td><td>free; default in recent PyTorch</td></tr>
<tr><td>Gradient checkpointing</td><td>activations (to ~1 layer + inputs)</td><td>~+30% compute</td></tr>
<tr><td>Smaller batch + gradient accumulation</td><td>activations</td><td>slower; BatchNorm-style layers suffer (ViTs use LayerNorm, fine)</td></tr>
<tr><td>Frozen backbone + head</td><td>gradients, optimizer, backbone activations</td><td>less adaptation</td></tr>
<tr><td>LoRA</td><td>gradients + optimizer state (~1% of params trainable)</td><td>activations stay large; slightly lower ceiling than full FT</td></tr>
<tr><td>FSDP / sharding</td><td>parameter memory ÷ GPUs</td><td>PCIe traffic — slow on your setup</td></tr>
<tr><td>Lower resolution / crop to the watch</td><td>everything, quadratically</td><td>detail on thin parts — crop smartly instead of shrinking</td></tr>
</table>

LoRA[^lora] deserves one more sentence: the frozen weights and the *activations flowing through all layers* are still there, so LoRA mainly removes the 14 extra bytes per parameter for gradients and AdamW. For ViT-7B that is the difference between impossible (~107 GB) and ~13 GB of weights — which is why LoRA on the 7B model fits on one card, just slowly.`,
    },
    {
      id: 'scenarios', type: 'text', title: 'Orders of magnitude for your 100k images',
      md: `
Estimates from the calculator's model for **2 GPUs with DDP at 512 px** — treat as ±50% and calibrate by measuring:

<table>
<tr><th>Scenario</th><th>Memory / GPU</th><th>Time</th></tr>
<tr><td>Extract DINOv3 ViT-L/16 features (frozen, batch 32)</td><td>~4 GB</td><td>~15–20 min compute for 100k; in practice often 30–60 min due to data loading</td></tr>
<tr><td>Extract ViT-7B/16 features (frozen, batch 4)</td><td>~14 GB (13.4 GB of bf16 weights)</td><td>~5–6 h for 100k</td></tr>
<tr><td>Train a light head on <b>cached</b> features</td><td>small</td><td>minutes per epoch — but storing dense ViT-L features for 100k images at 512 px is ~200 GB in fp16 (7B: ~800 GB)</td></tr>
<tr><td>Full fine-tune ViT-B/16 (batch 32)</td><td>~13 GB</td><td>~15 min per epoch</td></tr>
<tr><td>Full fine-tune ViT-L/16 (batch 8)</td><td>~12 GB</td><td>~50 min per epoch → 20 epochs ≈ a long day</td></tr>
<tr><td>LoRA on ViT-7B with checkpointing (batch 1)</td><td>~15 GB</td><td>~15–20 h per epoch</td></tr>
<tr><td>Full fine-tune ViT-7B</td><td>~100 GB before activations</td><td>not possible — even FSDP over 2 cards needs ~50 GB each</td></tr>
</table>

The practical reading: **everything up to ViT-L is comfortable**, including full fine-tuning at 512 px. The 7B model is usable as a frozen feature extractor or teacher (e.g. to produce [[pseudo-label|pseudo-labels]] or to distill into a smaller model via [[knowledge-distillation]]), not as something you fine-tune end to end. That is exactly why Meta released distilled ViT-S/B/L/H+ variants.[^dinov3-repo]`,
    },
    {
      id: 'measure', type: 'callout', tone: 'warning', title: 'Always calibrate: measure 30 steps',
      md: `
Estimates tell you what is *plausible*; a 2-minute measurement tells you what is *true*. Run 30 training steps with your real dataloader and read peak memory and throughput:

\`\`\`python
import time, torch
torch.cuda.reset_peak_memory_stats()
for step, (x, y) in zip(range(30), loader):
    with torch.autocast("cuda", dtype=torch.bfloat16):
        loss = criterion(model(x.cuda(non_blocking=True)), y.cuda(non_blocking=True))
    loss.backward()
    opt.step(); opt.zero_grad(set_to_none=True)
    if step == 9:
        torch.cuda.synchronize(); t0 = time.time()
torch.cuda.synchronize()
print(f"{20 * x.shape[0] / (time.time() - t0):.1f} img/s per GPU, "
      f"peak {torch.cuda.max_memory_allocated() / 2**30:.1f} GiB")
\`\`\`

If GPU utilization (\`nvidia-smi\`) sits well below ~90% while training, you are data-loading bound: more workers, pre-resized images, or caching decoded crops in RAM.`,
    },
    {
      id: 'quiz-parallel', type: 'quiz', title: 'Two GPUs, no NVLink',
      question: 'Select every correct statement about training on 2× RTX 4090.',
      options: [
        { text: 'With DDP, each GPU needs enough memory for the full model, its gradients and optimizer state.', correct: true, why: 'DDP replicates everything; it speeds up training but doesn\'t reduce per-GPU memory.' },
        { text: 'Two 24 GB cards let you train a model that needs 40 GB, as long as you use DDP.', correct: false, why: 'Memory doesn\'t pool under DDP. You would need sharding (FSDP) or offloading — slow over PCIe.' },
        { text: 'LoRA reduces gradient and optimizer memory much more than activation memory.', correct: true, why: 'Activations must still flow through (and be stored for) all layers for backprop.' },
        { text: 'Gradient checkpointing trades roughly one extra forward pass for much lower activation memory.', correct: true, why: 'Recompute instead of store: ~+30% compute.' },
        { text: 'Doubling the input resolution roughly doubles ViT activation memory.', correct: false, why: 'Tokens grow with the square of resolution: ~4× (and 16× for naive attention matrices).' },
      ],
    },
    {
      id: 'match-fixes', type: 'match', title: 'Symptom → first fix',
      pairs: [
        ['OOM only at 1024 px', 'Gradient checkpointing / memory-efficient attention'],
        ['Optimizer state dominates the memory bar', 'LoRA or freeze the backbone'],
        ['GPUs at 40% utilization', 'More dataloader workers, pre-resized images'],
        ['Batch of 2 gives noisy, unstable training', 'Gradient accumulation to a larger effective batch'],
        ['Model weights alone exceed 24 GB', 'Use a smaller distilled model (or shard/offload)'],
      ],
    },
    {
      id: 'mission-plan', type: 'callout', tone: 'mission', title: 'A compute plan that fits your machine',
      md: `
1. **Day 1:** extract global + patch features with frozen DINOv3 ViT-B/L for a few thousand images; train a linear or light head → first real baseline within hours.
2. **Week 1:** full fine-tune or LoRA of ViT-B/L at 512 px on real + synthetic mixes (~1 h per epoch on both GPUs); try cropping to the watch at higher resolution for thin parts.
3. **Only if needed:** use ViT-7B frozen as a teacher — extract its features or predictions overnight and distill into your ViT-B/L student.

Two GPUs are best used either as DDP for one run, or as **two independent experiments in parallel** — often the better choice while you are still comparing ideas.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>English</th><th>Deutsch</th></tr>
<tr><td>memory (GPU)</td><td>Grafikspeicher, Speicher</td></tr>
<tr><td>throughput</td><td>Durchsatz</td></tr>
<tr><td>floating-point precision</td><td>Gleitkommagenauigkeit</td></tr>
<tr><td>optimizer state</td><td>Optimiererzustand</td></tr>
<tr><td>to shard</td><td>aufteilen, partitionieren</td></tr>
<tr><td>quadratic growth</td><td>quadratisches Wachstum</td></tr></table>`,
    },
    {
      id: 'recall-plan', type: 'recall', title: 'Justify your first experiment',
      prompt: 'A colleague suggests fine-tuning the DINOv3 ViT-7B end to end on your 100k images "because it is the best model". Using numbers, explain why that won’t work on your machine and what you would do instead.',
      answer: `Full fine-tuning needs ~16 bytes per trainable parameter for weights, gradients and AdamW state: $6.7\\text{B} \\times 16 \\approx 107$ GB — before any activations. One 4090 has 24 GB, memory doesn't pool under DDP, and FSDP over two PCIe-connected cards would still need ~50 GB each and be slow. 

Instead: (1) run the 7B model **frozen** — its bf16 weights (~13.4 GB) fit on one card — to extract features or pseudo-labels overnight, or (2) use [[lora|LoRA]] with checkpointing if adaptation of the 7B is really needed (fits, but ~15–20 h/epoch), and mainly (3) fine-tune the **distilled ViT-B/L** (4.8 GB of parameter memory for ViT-L), optionally distilling from the 7B teacher. That keeps iterations at hours, not days.`,
      hints: ['Multiply parameters by bytes per trainable parameter.', 'Does DDP add memory together?'],
      cards: ['7b-why', 'bytes-param'],
    },
  ],
  cards: [
    { id: 'bytes-param', front: 'Bytes per **trainable** parameter for mixed-precision AdamW training — and the breakdown', back: '≈ 16: 4 (fp32 master weight) + 4 (gradient) + 8 (AdamW momentum + variance). Frozen bf16 parameter: 2.' },
    { id: 'four-mem', front: 'The four consumers of GPU memory during training', back: 'Weights, gradients, optimizer state, activations (+ CUDA context/fragmentation).' },
    { id: 'act-formula', front: 'How do ViT activations scale?', back: '∝ depth × batch × tokens × width; roughly $34\\,LBNd$ bytes in bf16 with memory-efficient attention. Tokens $N = (\\text{res}/p)^2$.' },
    { id: 'res-quad', front: 'Doubling ViT input resolution multiplies tokens by …?', back: '4× (quadratic). Naive attention memory: 16×.' },
    { id: 'lora-mem', front: 'What does LoRA save — and what not?', back: 'Saves gradients + optimizer state (only ~1% trainable). Does not save activations: backprop still goes through all layers.' },
    { id: 'ckpt', front: 'Gradient checkpointing trade-off', back: 'Store only block inputs, recompute inside blocks during backward: activation memory ↓ drastically, compute ↑ ~30%.' },
    { id: 'ddp-fsdp', front: 'DDP vs FSDP on 2× RTX 4090 (no NVLink)', back: 'DDP: full copy per GPU, ~2× throughput, no memory saving — good. FSDP: shards params/grads/optimizer, but gathers over PCIe every layer — slow, only halves parameter memory.' },
    { id: '7b-why', front: 'Can you fully fine-tune DINOv3 ViT-7B on 2× RTX 4090? What can you do with it?', back: 'No: ~107 GB for weights+grads+AdamW. But frozen inference fits (~13.4 GB bf16) and LoRA with checkpointing fits (slow). Use it as feature extractor / teacher.' },
    { id: 'measure', front: 'How to calibrate a memory/time estimate quickly?', back: 'Run ~30 real steps: torch.cuda.max_memory_allocated() for peak memory, time steps 10–30 for img/s; check nvidia-smi utilization for data-loading bottlenecks.' },
  ],
};
