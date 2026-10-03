export default {
  id: 'dinov3',
  title: 'DINOv3: Gram anchoring & dense features',
  summary: '[[dinov3|DINOv3]] scales self-supervised learning to a 7B-parameter ViT and 1.7B images — and discovers that at this scale, **patch features get worse the longer you train**. The fix, [[gram-anchoring]], is the main new idea and the reason DINOv3 features are so clean for segmentation.',
  minutes: 40,
  goals: [
    'Summarize what DINOv3 changed relative to DINOv2 (model, data, schedule, resolution, family)',
    'Explain why [[dense-features]] degrade in long training while global metrics improve',
    'Write down the Gram anchoring loss and explain every symbol',
    'Choose a DINOv3 model for inference and for adaptation on 2× RTX 4090',
  ],
  blocks: [
    {
      id: 'overview', type: 'text', title: 'DINOv3 at a glance',
      md: `
DINOv3 ([Meta AI](wiki:Meta AI|Meta AI), August 2025) keeps the DINOv2 recipe — DINO + iBOT + [[koleo]] losses, EMA teacher, multi-crop — and pushes every dial:[^dinov3]

<table><tr><th></th><th>DINOv2</th><th>DINOv3</th></tr>
<tr><td>Largest model</td><td>ViT-g/14, 1.1B</td><td>ViT-7B/16, 6.7B (4096-dim, 40 blocks, 32 heads)</td></tr>
<tr><td>Patch size</td><td>14</td><td>16</td></tr>
<tr><td>Positions</td><td>learned embeddings</td><td>RoPE (rotary)[^rope] with box jittering</td></tr>
<tr><td>Registers</td><td>added later ("_reg")</td><td>4, built in</td></tr>
<tr><td>Data</td><td>LVD-142M (from ~1.2B)</td><td>LVD-1689M (from ~17B Instagram images)</td></tr>
<tr><td>Schedule</td><td>cosine schedules</td><td>constant LR, weight decay and EMA momentum (after warm-up)</td></tr>
<tr><td>New loss</td><td>—</td><td><b>Gram anchoring</b></td></tr>
<tr><td>Family</td><td>ViT-S/B/L distilled</td><td>ViT-S, S+, B, L, H+ and ConvNeXt-T/S/B/L distilled; satellite models</td></tr></table>

The **constant schedule** matters more than it looks: with cosine decay you must fix the training length in advance. With constant hyper-parameters you can keep training as long as it helps — which is exactly how the team discovered the problem this lesson is about.`,
    },
    {
      id: 'data', type: 'text', title: 'Data: curation, scaled up',
      md: `
LVD-1689M mixes three sources:[^dinov3]

- **Clustering-based curation:** [hierarchical k-means](wiki:Hierarchical clustering|Hierarchische Clusteranalyse) on DINOv2 embeddings of the ~17B-image pool, then balanced sampling across clusters — broad coverage of visual concepts.
- **Retrieval-based curation:** images similar to seed datasets, for concepts relevant to downstream tasks.
- **Raw public datasets:** [ImageNet](wiki:ImageNet|ImageNet)-1k, ImageNet-22k, [Mapillary](wiki:Mapillary|Mapillary).

A detail with a lesson for you: about 10% of training batches are *homogeneous* batches of ImageNet-1k only, the rest are mixed. Data composition is a design decision, not an afterthought.`,
    },
    {
      id: 'problem', type: 'text', title: 'The problem: dense features rot in long training',
      md: `
Train the 7B model with the DINOv2 objective and watch two numbers over time:

- **Global quality** (e.g. ImageNet linear probe) keeps improving.
- **Dense quality** (e.g. ADE20k linear segmentation) **peaks early — around 200k iterations — and then declines.**

Looking at [[cosine-similarity]] maps (pick one patch, compute its similarity to every other patch) explains why: early on, maps are crisp and localized. By 600k iterations and beyond they become noisy — irrelevant patches far away show high similarity. At the same time, the similarity between the CLS token and the patch tokens grows: the patch features drift towards *global* information and lose their locality.[^dinov3]

This is a big deal for a model whose selling point is dense features. You cannot simply stop at 200k either — the global features are still far from done.`,
    },
    {
      id: 'viz-gram', type: 'viz', viz: 'gram-anchoring', title: 'Watch dense features degrade — and recover',
      intro: 'A toy model of the training dynamics (illustrative numbers, shaped after the paper’s curves). Patch features are a mix of part-specific signal, a shared global component and noise.',
      task: '1) Slide from 0 to ~200k and click the **crown** or a **hand** — the similarity map is sharp and the Gram matrix shows clean blocks. 2) Slide on to 1M: blocks wash out, the map lights up everywhere, dense quality drops while global quality rises. 3) Switch on **Gram anchoring from 1M** and slide past 1.1M: the structure comes back while global quality keeps improving.',
    },
    {
      id: 'gram-loss', type: 'text', title: 'Gram anchoring: constrain similarities, not features',
      md: `
Stack the L2-normalized patch features of one image as rows of a matrix $X \\in \\mathbb{R}^{P \\times d}$ ($P$ patches, $d$ dimensions). Its **[[gram-matrix|Gram matrix]]** $XX^\\top \\in \\mathbb{R}^{P \\times P}$ contains every pairwise cosine similarity between patches — the *similarity structure* of the image.

DINOv3 keeps a **Gram teacher**: an earlier checkpoint of the EMA teacher whose dense features were still good. The new loss asks the student's Gram matrix to stay close to the Gram teacher's:[^dinov3]

$$\\mathcal{L}_{\\text{Gram}} = \\left\\lVert X_S X_S^\\top - X_G X_G^\\top \\right\\rVert_F^2$$

- $X_S$: student patch features, $X_G$: Gram-teacher patch features (same image, same crop), both L2-normalized per patch.
- $\\lVert A \\rVert_F^2 = \\sum_{i,j} A_{ij}^2$ — the squared **[Frobenius norm](wiki:Matrix norm|Matrixnorm)**, i.e. the sum of all squared entries of the difference.

The clever part: the loss only fixes **which patches are similar to which**. The features themselves may rotate, sharpen and keep learning — as long as the pattern of similarities stays local and clean. It would be far too restrictive to pin the features themselves to an old checkpoint.

How it is used:

- Applied in a **refinement phase after 1M iterations**, added to the other losses.
- The Gram teacher is **refreshed every 10k iterations** from the EMA teacher.
- **High-resolution Gram teacher:** feed the Gram teacher images at 2× resolution and downsample its feature map ([bicubic](wiki:Bicubic interpolation)) to the student's grid. Averaging finer features gives smoother, better targets.

Result: dense quality recovers — even surpasses its early peak — within the refinement phase, while global quality is unaffected.`,
    },
    {
      id: 'calc-gram', type: 'numeric', title: 'How big is a Gram matrix?',
      question: 'The student sees a 512×512 crop with patch size 16. How many entries does its patch Gram matrix $X_S X_S^\\top$ have?',
      answer: 1048576, tolerance: 0,
      hint: 'First count patches: $(512/16)^2$. The Gram matrix is $P \\times P$.',
      explain: '$P = 32^2 = 1024$ patches, so $1024^2 = 1{,}048{,}576$ entries — cheap compared to the transformer itself (one $P\\times d$ by $d\\times P$ matrix product).',
    },
    {
      id: 'quiz-gram', type: 'quiz', title: 'Gram anchoring, precisely',
      question: 'Which statements about Gram anchoring are correct?',
      options: [
        { text: 'It penalizes differences between the patch-to-patch similarity matrices of student and Gram teacher.', correct: true, why: '$\\lVert X_S X_S^\\top - X_G X_G^\\top \\rVert_F^2$.' },
        { text: 'It forces student patch features to be identical to the Gram teacher’s features.', correct: false, why: 'Only similarities are constrained; features may rotate and keep improving.' },
        { text: 'The Gram teacher is an earlier checkpoint with good dense features, refreshed periodically.', correct: true, why: 'Updated every 10k iterations from the EMA teacher during refinement.' },
        { text: 'It is needed because the CLS token stops improving in long training.', correct: false, why: 'Global quality keeps improving; it is the *patch* features that degrade.' },
        { text: 'Feeding the Gram teacher higher-resolution images gives smoother similarity targets.', correct: true, why: 'Features at 2× resolution are downsampled to the student grid.' },
      ],
    },
    {
      id: 'highres', type: 'text', title: 'High-resolution adaptation',
      md: `
After the main training, DINOv3 runs a short **resolution adaptation** (about 10k iterations): global crops at a mix of 512 and 768 pixels, local crops from 112 to 336, with Gram anchoring still active.[^dinov3]

With patch size 16, a 768×768 crop is 48×48 = 2,304 tokens. The payoff: the model produces stable, semantically meaningful feature maps far above its training resolution — the paper shows crisp features at resolutions **above [4k](wiki:4K resolution|4K (Bildauflösung))**. For you, that means you can feed DINOv3 large, detailed watch photos and still get consistent features (memory permitting).`,
    },
    {
      id: 'family', type: 'text', title: 'The distilled family',
      md: `
Almost nobody will run the 7B model. It exists to be distilled into models you *can* run — each student trained for 1M iterations plus a 250k-iteration cooldown:[^dinov3][^dinov3-repo]

<table><tr><th>Model</th><th>Params</th><th>Notes</th></tr>
<tr><td>ViT-S/16</td><td>21M</td><td>laptop-friendly</td></tr>
<tr><td>ViT-S+/16</td><td>29M</td><td></td></tr>
<tr><td>ViT-B/16</td><td>86M</td><td></td></tr>
<tr><td>ViT-L/16</td><td>300M</td><td>also a satellite version (SAT-493M)</td></tr>
<tr><td>ViT-H+/16</td><td>840M</td><td></td></tr>
<tr><td>ViT-7B/16</td><td>6,716M</td><td>the teacher; also a satellite version</td></tr>
<tr><td>ConvNeXt T / S / B / L</td><td>29M / 50M / 89M / 198M</td><td>CNN students, efficient at high resolution</td></tr></table>

Frozen quality is the headline: with only a linear head, the 7B model reaches **55.9 mIoU on ADE20k**, versus about 49.5 for DINOv2 and 42.7 for SigLIP 2 in the paper's comparison. There is also a text-aligned variant (trained LiT-style with the vision backbone frozen) for open-vocabulary use.

**License:** unlike DINOv2 ([Apache 2.0](wiki:Apache License|Apache-Lizenz)), DINOv3 weights come under the custom **DINOv3 License**, and downloads require accepting it. Read it before building a product on top.`,
    },
    {
      id: 'match-family', type: 'match', title: 'Know your models',
      prompt: 'Match each DINOv3 model to its parameter count.',
      pairs: [
        ['ViT-S/16', '21M'],
        ['ViT-B/16', '86M'],
        ['ViT-L/16', '300M'],
        ['ViT-H+/16', '840M'],
        ['ViT-7B/16', '6.7B'],
        ['ConvNeXt-Large', '198M'],
      ],
    },
    {
      id: 'calc-7b', type: 'numeric', title: 'Does the 7B model fit on a 4090?',
      question: 'How many GB do the ViT-7B weights (6,716M parameters) take in bf16 (2 bytes per parameter)? Use 1 GB = $10^9$ bytes.',
      answer: 13.4, tolerance: 0.15, unit: 'GB',
      hint: '$6.716 \\times 10^9 \\times 2$ bytes.',
      explain: '≈ 13.4 GB. That leaves ~10 GB of a 24 GB card for activations — enough for **inference** at moderate resolution with a small batch. Full fine-tuning is out of reach: with AdamW and mixed precision you need roughly 16 bytes per parameter for weights, gradients and optimizer states ≈ 107 GB, before activations.',
    },
    {
      id: 'mission-dinov3', type: 'callout', tone: 'mission', title: 'A sizing plan for 2× RTX 4090',
      md: `
Rules of thumb (training memory ≈ 16 bytes/parameter with AdamW + mixed precision, plus activations):

<table><tr><th>Model</th><th>Frozen features (inference)</th><th>Full fine-tuning</th></tr>
<tr><td>ViT-B/16 (86M)</td><td>trivial</td><td>easy (~1.4 GB of states)</td></tr>
<tr><td>ViT-L/16 (300M)</td><td>easy, even at 1024 px</td><td>comfortable (~4.8 GB of states) — the practical workhorse</td></tr>
<tr><td>ViT-H+/16 (840M)</td><td>easy</td><td>tight (~13.4 GB of states) — gradient checkpointing, small batches</td></tr>
<tr><td>ViT-7B/16</td><td>possible on one card (13.4 GB bf16 weights)</td><td>not feasible; use it as a frozen feature extractor or teacher</td></tr></table>

A strategy that fits your hardware well:

1. **Explore with frozen ViT-L/16** (or 7B for an upper bound) and a linear head on watch parts. This tells you how far pure features get.
2. If renders and photos land in different regions of feature space, adapt the model with [[lora]] or by fine-tuning the last blocks of ViT-L. Your synthetic generator gives you as many labelled renders as you want.
3. Use the 7B model **offline as a teacher**: compute its features or pseudo-labels on your 100k real photos once, then train a smaller model to match — the same distillation idea that produced the DINOv3 family.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>English</th><th>Deutsch</th><th>Notation</th></tr>
<tr><td>Gram matrix</td><td>Gram-Matrix (Gramsche Matrix)</td><td>$XX^\\top$</td></tr>
<tr><td>Frobenius norm</td><td>Frobeniusnorm</td><td>$\\lVert A\\rVert_F = \\sqrt{\\sum_{ij} A_{ij}^2}$</td></tr>
<tr><td>anchoring</td><td>Verankerung</td><td></td></tr>
<tr><td>constant learning-rate schedule</td><td>konstante Lernrate</td><td></td></tr>
<tr><td>rotary position embedding</td><td>rotierende Positionskodierung</td><td>RoPE</td></tr>
<tr><td>degradation</td><td>Verschlechterung, Degradation</td><td></td></tr></table>`,
    },
    {
      id: 'recall-dinov3', type: 'recall', title: 'The core idea in your own words',
      prompt: 'Explain (a) what goes wrong with patch features in very long self-supervised training and (b) how Gram anchoring fixes it without freezing the features.',
      answer: `(a) While global metrics keep improving, patch features drift towards global information: patch–CLS similarity rises and cosine-similarity maps become noisy and non-local, so dense tasks like segmentation get worse after ~200k iterations. (b) Gram anchoring adds the loss $\\lVert X_S X_S^\\top - X_G X_G^\\top\\rVert_F^2$ between the student's patch-similarity (Gram) matrix and that of an earlier "Gram teacher" checkpoint with good dense features (refreshed every 10k iterations, optionally at higher resolution). Because only the *similarity structure* is matched, the features themselves can still move and improve; the loss just keeps patches that belong together similar and unrelated patches dissimilar.`,
      hints: ['Which metric keeps improving and which one drops?', 'What does a Gram matrix contain — and what does it ignore?'],
      cards: ['v3-degrade', 'v3-gram'],
    },
  ],
  cards: [
    { id: 'v3-glance', front: 'DINOv3 teacher model: size, patch size, key architecture facts', back: 'ViT-7B/16: 6.7B params, 4096-dim, 40 blocks, 32 heads, RoPE positions, 4 registers.' },
    { id: 'v3-data', front: 'DINOv3 training data', back: 'LVD-1689M: 1.689B images curated from ~17B Instagram images (clustering-based + retrieval-based) plus ImageNet-1k/22k and Mapillary.' },
    { id: 'v3-degrade', front: 'What goes wrong with dense features in long DINO-style training?', back: 'Global quality keeps improving, but dense (patch) quality peaks ~200k iterations then degrades: similarity maps get noisy, patches drift towards CLS/global info.' },
    { id: 'v3-gram', front: 'Gram anchoring loss', back: '$\\lVert X_S X_S^\\top - X_G X_G^\\top\\rVert_F^2$ with L2-normalized patch features of student (S) and Gram teacher (G). Constrains patch similarities, not the features.' },
    { id: 'v3-gteacher', front: 'What is the Gram teacher and how is it updated?', back: 'An earlier EMA-teacher checkpoint with good dense features; refreshed every 10k iterations in the refinement phase (after 1M iterations). High-res variant: 2× input, features downsampled.' },
    { id: 'v3-schedule', front: 'Why does DINOv3 use constant hyper-parameter schedules?', back: 'No need to fix the training length in advance — you can keep training as long as it helps (and observe long-run effects).' },
    { id: 'v3-family', front: 'DINOv3 distilled family', back: 'ViT-S 21M, S+ 29M, B 86M, L 300M, H+ 840M; ConvNeXt T/S/B/L 29/50/89/198M. Plus satellite ViT-L and 7B (SAT-493M).' },
    { id: 'v3-ade', front: 'Frozen ADE20k linear segmentation: DINOv3-7B vs DINOv2?', back: '55.9 mIoU vs ~49.5 (SigLIP 2: 42.7).' },
    { id: 'v3-license', front: 'License difference DINOv2 vs DINOv3?', back: 'DINOv2: Apache 2.0. DINOv3: custom DINOv3 License (must be accepted to download; check terms for products).' },
    { id: 'v3-fit', front: 'On a 24 GB RTX 4090: 7B inference? 7B fine-tuning? ViT-L fine-tuning?', back: '7B inference: yes (13.4 GB bf16 weights). 7B full fine-tuning: no (~107 GB of states). ViT-L fine-tuning: comfortably (~4.8 GB states + activations).' },
  ],
};
