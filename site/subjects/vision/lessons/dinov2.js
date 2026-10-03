export default {
  id: 'dinov2',
  title: 'DINOv2: scaling data & recipes',
  summary: 'DINO showed that self-supervised ViTs learn to see objects. [[dinov2|DINOv2]] turned that into **all-purpose visual features** you can use frozen — mostly through better data, a combined recipe, and engineering for scale.',
  minutes: 40,
  goals: [
    'Explain how LVD-142M was built by automatic [[data-curation]] and why that matters',
    'Name the four ingredients of the DINOv2 objective and what each one is for',
    'Explain the [[koleo]] regularizer and what it does to a feature space',
    'Estimate the cost of high-resolution training and of reproducing DINOv2 on your own GPUs',
    'Pick a sensible DINOv2 model size for your watch images',
  ],
  blocks: [
    {
      id: 'from-dino', type: 'text', title: 'Where DINO left off',
      md: `
[[dino|DINO]] (2021) trained a [[vit|ViT]] on [ImageNet](wiki:ImageNet|ImageNet) — 1.3M images — with [[self-distillation]]: a student matches an [[ema|EMA]] teacher on different crops of the same image. Its attention maps segmented objects without ever seeing a mask.[^dino]

But in 2022 the best *general-purpose* features still came from text–image models like [CLIP](wiki:Contrastive Language-Image Pre-training), trained on hundreds of millions of image–caption pairs. The DINOv2 team asked a simple question: **if we scale self-supervised learning the same way — more and better data, bigger models — do we get features that work out of the box for everything?**[^dinov2]

Their definition of "works out of the box": the [[backbone]] stays **frozen**, and a linear layer or k-NN on top must perform well — on classification, retrieval, segmentation, depth. No [[fine-tuning]]. That is exactly the situation you want for 100k watch images: extract features once, train small heads quickly.`,
    },
    {
      id: 'video-dinov2', type: 'video', youtube: 'RZEkdOc3szU', label: 'DINOv2 from Meta AI: data pipeline, model training and results explained', channel: 'AI Bites',
      why: 'A compact walk-through of the paper. Watch it once now for the big picture; the lesson then goes deeper on each piece.',
    },
    {
      id: 'curation', type: 'text', title: 'Ingredient 1: data you choose, not data you scrape',
      md: `
Training on raw web images sounds like the obvious way to scale — but the web is a **[long tail](wiki:Long tail)**: millions of near-identical product shots and memes, very few images of rare concepts. A model trained on that learns the head of the distribution very well and everything else poorly.

DINOv2 built **LVD-142M** automatically, without any labels:[^dinov2]

1. Start from ~1.2B uncurated web images and a set of *curated* seed datasets (ImageNet-22k, ImageNet-1k train, Google Landmarks, several fine-grained datasets).
2. **[Deduplicate](wiki:Data deduplication|Deduplikation)** with a copy-detection model — remove near-duplicates, including copies of evaluation images.
3. **Embed** every image with a self-supervised ViT and compare embeddings by [[cosine-similarity]].
4. **Retrieve**: for each curated image, take its [nearest neighbours](wiki:Nearest neighbor search) from the web pool (e.g. N = 4); for smaller seed sets, sample from the matching [k-means](wiki:K-means clustering|K-Means-Algorithmus) cluster instead.
5. Result: 142M images that *look like* the curated data but are far more diverse.

The whole pipeline ran in under two days on 20 nodes with 8 [V100](wiki:Volta (microarchitecture)) GPUs each. The key idea — **[[data-curation]] by embedding similarity** — is something you can reuse directly: your 100k watch images plus a few hand-picked "hard" examples can serve as seeds to mine more relevant images from a larger unlabeled pool.`,
    },
    {
      id: 'curation-figure', type: 'figure', title: 'The LVD-142M pipeline',
      html: `<svg viewBox="0 0 640 170" width="640" font-family="Inter, sans-serif" font-size="12">
  <defs><marker id="cfa" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#8b8ba3"/></marker></defs>
  <g fill="#fff" stroke="#d9d9e4">
    <rect x="8" y="20" width="118" height="54" rx="10"/><rect x="8" y="96" width="118" height="54" rx="10"/>
    <rect x="166" y="58" width="108" height="54" rx="10"/><rect x="314" y="58" width="108" height="54" rx="10"/>
    <rect x="462" y="58" width="80" height="54" rx="10"/>
  </g>
  <rect x="566" y="52" width="66" height="66" rx="12" fill="#5b5bd6"/>
  <text x="67" y="44" text-anchor="middle" font-weight="600" fill="#16162a">Curated seeds</text><text x="67" y="61" text-anchor="middle" fill="#74748c">ImageNet, Landmarks…</text>
  <text x="67" y="120" text-anchor="middle" font-weight="600" fill="#16162a">Web pool</text><text x="67" y="137" text-anchor="middle" fill="#74748c">~1.2B images</text>
  <text x="220" y="82" text-anchor="middle" font-weight="600" fill="#16162a">Deduplicate</text><text x="220" y="99" text-anchor="middle" fill="#74748c">copy detection</text>
  <text x="368" y="82" text-anchor="middle" font-weight="600" fill="#16162a">Embed</text><text x="368" y="99" text-anchor="middle" fill="#74748c">self-sup. ViT</text>
  <text x="502" y="82" text-anchor="middle" font-weight="600" fill="#16162a">Retrieve</text><text x="502" y="99" text-anchor="middle" fill="#74748c">k-NN / k-means</text>
  <text x="599" y="82" text-anchor="middle" font-weight="700" fill="#fff">LVD</text><text x="599" y="99" text-anchor="middle" fill="#fff">142M</text>
  <g stroke="#8b8ba3" stroke-width="1.5" fill="none" marker-end="url(#cfa)">
    <path d="M126 47 C146 47 146 78 164 80"/><path d="M126 123 C146 123 146 92 164 90"/>
    <path d="M274 85 H312"/><path d="M422 85 H460"/><path d="M542 85 H564"/>
  </g></svg>`,
      caption: 'Curation by similarity: the web pool is filtered towards images that resemble the curated seeds, while clustering keeps concepts balanced.',
    },
    {
      id: 'order-curation', type: 'order', title: 'Rebuild the pipeline',
      prompt: 'Put the steps of DINOv2’s data curation in the right order.',
      items: [
        'Collect a large uncurated web pool and curated seed datasets',
        'Remove near-duplicates with a copy-detection model',
        'Compute a self-supervised embedding for every image',
        'Retrieve web images that are nearest neighbours of the seeds (or share their cluster)',
        'Train DINOv2 on the resulting 142M-image dataset',
      ],
      explain: 'Deduplication must come before retrieval — otherwise one popular image and its thousand copies would all be retrieved and dominate training.',
    },
    {
      id: 'recipe', type: 'text', title: 'Ingredient 2: one recipe, two levels',
      md: `
DINOv2's objective combines losses you met in the previous stage, each with its own job:[^dinov2]

**Image level — the DINO loss.** Student and teacher each map their [[cls-token]] to scores over $K$ prototypes; the teacher's scores become a sharp probability distribution $p_t$ and the student is trained with [[cross-entropy]] to match it on *other crops* of the same image:

$$\\mathcal{L}_{\\text{DINO}} = -\\sum_k p_{t,k} \\log p_{s,k}$$

**Patch level — the iBOT loss.** Some input patches of the student are *masked*. For each masked patch $i$, the student must predict the teacher's output for that (unmasked) patch:

$$\\mathcal{L}_{\\text{iBOT}} = -\\sum_{i \\in \\text{masked}} \\sum_k p_{t,ik} \\log p_{s,ik}$$

This is what makes the *patch* features — the [[dense-features]] you need for segmentation — good, not only the global one.[^ibot]

**Untied heads.** DINO and iBOT get *separate* projection heads. Sharing one head (as in iBOT) worked worse at scale.

**Sinkhorn-Knopp [[centering]].** Instead of subtracting a running mean from the teacher's scores, DINOv2 normalizes them with 3 iterations of the [Sinkhorn-Knopp algorithm](wiki:Sinkhorn's theorem) — a balancing step (borrowed from SwAV[^swav]) that forces the batch to use all prototypes roughly equally. This fights [[collapse]].

**KoLeo regularizer.** A small extra term that spreads features out in the space — see below.`,
    },
    {
      id: 'koleo-text', type: 'text', title: 'KoLeo: every feature wants some personal space',
      md: `
Take a batch of $n$ L2-normalized features $\\mathbf{x}_1, \\dots, \\mathbf{x}_n$ (points on a [hypersphere](wiki:N-sphere|Sphäre (Mathematik))). For each one, let $d_{n,i}$ be the distance to its **nearest neighbour** in the batch. The [[koleo]] loss is

$$\\mathcal{L}_{\\text{KoLeo}} = -\\frac{1}{n} \\sum_{i=1}^{n} \\log d_{n,i}$$

Minimizing it means *making the smallest distances larger*. The $\\log$ makes it brutal on near-duplicates: as $d \\to 0$, $-\\log d \\to \\infty$. It comes from the Kozachenko–Leonenko estimator of [differential entropy](wiki:Differential entropy|Differentielle Entropie) — high entropy = features spread uniformly.[^koleo-paper]

Why bother? Features that crowd into a few dense regions are bad for nearest-neighbour search: everything looks similar to everything. DINOv2 reports KoLeo mainly helps retrieval, at almost no cost elsewhere.`,
    },
    {
      id: 'viz-koleo', type: 'viz', viz: 'koleo-spread', title: 'Balance task pull against KoLeo',
      intro: 'Each dot is a normalized feature on the unit circle. A "task" force pulls features toward three prototypes (dashed lines); the KoLeo term pushes nearest neighbours apart.',
      task: 'Start at weight 0 and watch the features pile up on the prototypes (the smallest distances collapse towards 0). Then raise the KoLeo weight until the minimum distance clearly grows **but three groups are still visible**. That is the balance DINOv2 wants: structure *and* spread.',
    },
    {
      id: 'match-recipe', type: 'match', title: 'Which ingredient does what?',
      prompt: 'Match each component of the DINOv2 objective to its role.',
      pairs: [
        ['DINO loss (CLS token)', 'Image-level agreement between crops'],
        ['iBOT loss (masked patches)', 'Good patch-level (dense) features'],
        ['Sinkhorn-Knopp centering', 'Balanced use of prototypes, prevents collapse'],
        ['KoLeo regularizer', 'Uniform spread of features in the batch'],
        ['Untied heads', 'Separate projections for image and patch losses'],
      ],
    },
    {
      id: 'scale', type: 'text', title: 'Ingredient 3: engineering for scale',
      md: `
The recipe only pays off with big models trained on lots of data, so half of the paper is engineering:[^dinov2]

- **[[patch-size|Patch size]] 14** for all models; training at 224×224 → 16×16 = 256 patch tokens.
- **High-resolution phase:** only for the **last 10k iterations**, images are 518×518 (37×37 = 1,369 tokens). Small objects and thin structures need resolution — but attention cost grows with the *square* of the token count, so high-res training for the whole run would be ruinous.
- **FlashAttention**[^flashattention], **sequence packing** (crops of different sizes packed into one sequence with a block-diagonal mask), **stochastic depth** at 40% (skipping computation for dropped blocks) and **FSDP** (sharding student, teacher and optimizer states over GPUs).
- Net effect: about **2× faster and 3× less memory** than the iBOT implementation they started from.

Training the biggest model, ViT-g/14, took **22,016 [A100](wiki:Nvidia A100) GPU-hours**.`,
    },
    {
      id: 'calc-attn', type: 'numeric', title: 'Why high resolution is saved for last',
      question: 'Self-attention cost grows with the square of the number of tokens. By roughly what factor is attention more expensive at 518×518 than at 224×224 (patch size 14)?',
      answer: 28.6, tolerance: 0.6, unit: '×',
      hint: 'Tokens: $(224/14)^2 = 256$ and $(518/14)^2 = 1369$. Then square their ratio.',
      explain: '$(1369/256)^2 \\approx 5.35^2 \\approx 28.6$. The MLP part only grows 5.35×, but attention dominates at high resolution. Hence: train cheap at 224, adapt briefly at 518.',
    },
    {
      id: 'family', type: 'text', title: 'Ingredient 4: train one giant, distill the rest',
      md: `
Instead of training every model size from scratch, DINOv2 trains **ViT-g/14** once and then uses it as a frozen teacher for smaller students — [[knowledge-distillation]]. The distilled ViT-L beats a ViT-L trained from scratch on all 12 benchmarks they tested.[^dinov2]

<table><tr><th>Model</th><th>Parameters</th><th>Embedding dim</th><th>Notes</th></tr>
<tr><td>ViT-S/14</td><td>~22M</td><td>384</td><td>distilled</td></tr>
<tr><td>ViT-B/14</td><td>~86M</td><td>768</td><td>distilled</td></tr>
<tr><td>ViT-L/14</td><td>~304M</td><td>1024</td><td>distilled</td></tr>
<tr><td>ViT-g/14</td><td>~1.1B</td><td>1536</td><td>the teacher</td></tr></table>

Frozen ViT-g features reach 86.5% [ImageNet](wiki:ImageNet|ImageNet) top-1 with a linear classifier and **49.0 mIoU** on ADE20k semantic segmentation with only a *linear* head on the patch features. Code and weights are [Apache 2.0](wiki:Apache License|Apache-Lizenz),[^dinov2-repo] which made DINOv2 the default backbone of 2023–2024. Later "_reg" checkpoints add [[registers]] — the next lesson explains why.`,
    },
    {
      id: 'calc-gpu', type: 'numeric', title: 'Could you train DINOv2 yourself?',
      question: 'ViT-g/14 took 22,016 A100 GPU-hours. Pretend a 4090 is exactly as fast as an A100 and memory were no issue. How many **days** would your 2 GPUs need?',
      answer: 458.7, tolerance: 3, unit: 'days',
      hint: 'Divide GPU-hours by the number of GPUs, then by 24.',
      explain: '$22016 / 2 / 24 \\approx 459$ days — and that ignores that you could not even fit the training state (student + teacher + optimizer for 1.1B parameters) in 2×24 GB. **Pretraining foundation models is not your job; choosing and adapting them is.**',
    },
    {
      id: 'mission-dinov2', type: 'callout', tone: 'mission', title: 'What this means for your 100k watch images',
      md: `
- **Don't pretrain, adapt.** You will start from released weights. The practical choices are: which model, which resolution, frozen or adapted.
- **ViT-B/14 or ViT-L/14 are the sweet spot on a [4090](wiki:GeForce RTX 40 series|Nvidia-GeForce-40-Serie).** Feature extraction (inference only, fp16) for ViT-L at 518×518 fits easily on one card. It costs roughly 1 [TFLOP](wiki:FLOPS|Floating Point Operations Per Second) per image, so 100k images take well under an hour per GPU at realistic utilization.
- **But mind the disk:** caching *all* patch features of ViT-L at 518 px is $100{,}000 \times 1369 \times 1024 \times 2$ bytes ≈ **280 GB** in fp16. Cache a labelled subset, reduce dimensions ([PCA](wiki:Principal component analysis|Hauptkomponentenanalyse) to 128–256 dims), or compute features on the fly while training the head.
- **Curation applies to you too.** Your renders are a "curated seed set" you control. Embed renders and real photos with DINOv2, and look at which real photos have *no* nearby render — those are the conditions your generator doesn't cover yet (lighting, reflections, angles, straps).
- **Patch size 14 at 518 px = 37×37 tokens.** A seconds hand only a few pixels wide is far smaller than one patch. Keep that in mind; the last lesson of this stage returns to it.`,
    },
    {
      id: 'quiz-dinov2', type: 'quiz', title: 'Check your understanding',
      question: 'Which statements about DINOv2 are correct?',
      options: [
        { text: 'LVD-142M was selected using image embeddings — no human labels were needed.', correct: true, why: 'Deduplication, embedding and nearest-neighbour retrieval are all automatic.' },
        { text: 'The iBOT loss is computed on the CLS token only.', correct: false, why: 'iBOT works on *masked patch tokens*; the DINO loss uses the CLS token.' },
        { text: 'Training ran at 518×518 for the whole schedule.', correct: false, why: 'Only the final 10k iterations use 518×518; the rest is 224×224.' },
        { text: 'Smaller DINOv2 models were distilled from a frozen ViT-g.', correct: true, why: 'And distillation beat training them from scratch.' },
        { text: 'DINOv2 is evaluated mainly with a frozen backbone plus linear or k-NN heads.', correct: true, why: 'The goal was all-purpose features that work without fine-tuning.' },
      ],
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>English</th><th>Deutsch</th></tr>
<tr><td>data curation</td><td>Datenkuratierung, Datenauswahl</td></tr>
<tr><td>deduplication</td><td>Deduplizierung</td></tr>
<tr><td>nearest neighbour</td><td>nächster Nachbar</td></tr>
<tr><td>long tail (distribution)</td><td>Long Tail, "lange Schwanzverteilung"</td></tr>
<tr><td>(differential) entropy estimator</td><td>Schätzer der (differentiellen) Entropie</td></tr>
<tr><td>knowledge distillation</td><td>Wissensdestillation</td></tr>
<tr><td>frozen backbone</td><td>eingefrorenes Backbone</td></tr></table>`,
    },
    {
      id: 'recall-dinov2', type: 'recall', title: 'Explain it to a colleague',
      prompt: 'Your colleague says: "DINOv2 is just DINO with a bigger model." Explain in 3–5 sentences what else changed and why it matters.',
      answer: `Besides scale, DINOv2 changed the **data**: LVD-142M is automatically curated (deduplicated, then retrieved by embedding similarity to curated seed datasets), which avoids the long-tail bias of raw web data. It changed the **objective**: the image-level DINO loss is combined with the patch-level iBOT masked-token loss (separate heads), Sinkhorn-Knopp centering and the KoLeo regularizer — the iBOT part is what makes dense patch features good. It added **engineering** (FlashAttention, sequence packing, stochastic depth, FSDP, a short 518-px high-res phase) that made training a 1.1B ViT-g feasible. And smaller models are **distilled** from ViT-g rather than trained from scratch. The result is features that work *frozen* across classification, segmentation, depth and retrieval.`,
      hints: ['Think: data, loss, engineering, model family.', 'Which loss is responsible for good patch features?'],
      cards: ['v2-ingredients', 'v2-ibot'],
    },
  ],
  cards: [
    { id: 'v2-ingredients', front: 'The four main ingredients of DINOv2 beyond “bigger model”?', back: '1) Automatically curated data (LVD-142M). 2) DINO + iBOT losses with untied heads, Sinkhorn-Knopp centering, KoLeo. 3) Engineering for scale (FlashAttention, sequence packing, stochastic depth, FSDP, short high-res phase). 4) Distillation of smaller models from ViT-g.' },
    { id: 'v2-data', front: 'How was LVD-142M built?', back: '~1.2B web images → deduplicate (copy detection) → embed with a self-supervised ViT → retrieve nearest neighbours / cluster members of curated seed datasets → 142M images. No labels needed.' },
    { id: 'v2-ibot', front: 'In DINOv2, which loss is responsible for good **patch** features?', back: 'The iBOT loss: the student predicts the teacher’s outputs for **masked** patch tokens.' },
    { id: 'v2-koleo', front: 'KoLeo loss formula and effect', back: '$-\\frac1n\\sum_i \\log d_{n,i}$ with $d_{n,i}$ the distance to the nearest neighbour in the batch. Spreads features uniformly; mainly helps retrieval.' },
    { id: 'v2-sk', front: 'What does Sinkhorn-Knopp do in DINOv2’s teacher?', back: 'Replaces moving-average centering: 3 normalization iterations balance the teacher’s prototype assignments across the batch, which prevents collapse.' },
    { id: 'v2-res', front: 'DINOv2 training resolution and patch size?', back: 'Patch 14. 224×224 (256 tokens) for most of training; 518×518 (1369 tokens) only for the last 10k iterations.' },
    { id: 'v2-sizes', front: 'DINOv2 model family: sizes and embedding dims', back: 'ViT-S/14 ~22M (384), ViT-B/14 ~86M (768), ViT-L/14 ~304M (1024), ViT-g/14 ~1.1B (1536). S/B/L distilled from g.' },
    { id: 'v2-cost', front: 'Compute to train DINOv2 ViT-g/14?', back: '≈ 22,016 A100 GPU-hours — ~459 days on two GPUs even if memory were no problem.' },
    { id: 'v2-attn', front: 'Attention cost ratio 518 px vs 224 px at patch 14?', back: '(1369/256)² ≈ 28.6×.' },
  ],
};
