export default {
  id: 'masked-modeling',
  title: 'Masked image modeling: MAE & iBOT',
  summary: 'Hide most of an image and ask the network to fill in the gaps. [[mae|MAE]] predicts raw pixels; [[ibot|iBOT]] predicts a teacher\'s features. The second idea is half of the DINOv2/DINOv3 recipe — and the main reason their **patch** features are so good for segmentation.',
  minutes: 30,
  goals: [
    'Explain masked image modeling and its origin in BERT',
    'Describe MAE\'s design: 75% masking, encoder on visible patches only, light decoder, loss on masked patches',
    'Compute token counts and the compute savings of masking',
    'Explain how iBOT differs from MAE and why feature targets help dense tasks',
  ],
  blocks: [
    {
      id: 'bert', type: 'text', title: 'From BERT to images',
      md: `
In language, **[BERT](wiki:BERT (language model)|Bidirectional Encoder Representations from Transformers)** learned from raw text by hiding ~15% of the words and predicting them from context.[^bert] The vision version is **[[masked-image-modeling]]** (MIM): cut the image into patches (like a [[vit|ViT]] does anyway), hide some, and predict what's under the mask.

It sounds like the jigsaw puzzles from the first lesson, but it's much harder to cheat: to fill in a hidden patch of the dial, the network must understand what a dial looks like, where the hands point, and how the bezel continues around the circle.

Images differ from text in one important way: they are **highly [redundant](wiki:Redundancy (information theory)|Redundanz (Informationstheorie))**. Neighbouring [pixels](wiki:Pixel) are almost identical. Hide 15% of an image and a network can simply [interpolate](wiki:Interpolation|Interpolation (Mathematik)) from the neighbours — no understanding needed. That observation drives MAE's most striking choice.`,
    },
    {
      id: 'video-mae', type: 'video', youtube: 'Dp6iICL2dVI', label: 'Masked Autoencoders Are Scalable Vision Learners – Paper explained and animated', channel: 'AI Coffee Break with Letitia', minutes: 13,
      why: 'A compact, animated explanation of MAE — masking ratio, the asymmetric encoder/decoder, and what the reconstructions look like.[^mae]',
    },
    {
      id: 'mae', type: 'text', title: 'MAE: masked autoencoders',
      md: `
**[[mae|MAE]]** ([He](wiki:Kaiming He) et al., 2021)[^mae] is almost aggressively simple:

1. **Patchify** a 224×224 image into 16×16 patches → 196 [[token|tokens]].
2. **Mask 75% at random.** Only 49 patches remain visible.
3. **Encode only the visible patches** with a large ViT. No mask tokens enter the encoder.
4. A **lightweight decoder** receives the encoded visible patches plus a learned *mask token* at every hidden position (with [[positional-embedding|positional embeddings]] so it knows where each one is) and predicts the pixels of every patch.
5. **Loss:** [mean squared error](wiki:Mean squared error|Mittlere quadratische Abweichung) on the **masked patches only**, using per-patch normalized pixels as targets:

$$\\mathcal{L}_{\\text{MAE}} = \\frac{1}{|M|} \\sum_{i \\in M} \\big\\lVert \\hat{x}_i - x_i \\big\\rVert_2^2$$

where $M$ is the set of masked patch indices.

After pretraining, the decoder is thrown away — only the encoder is kept as the [[backbone]].

Why **75%**? Because of redundancy: with little masking the task is solvable by interpolation. With three quarters hidden, the model must reason about whole objects. The paper found high ratios work best — and they have a huge side benefit, as the next tasks show.`,
    },
    {
      id: 'viz-mask', type: 'viz', viz: 'mask-patches', title: 'Mask a watch',
      params: { goal: { patch: 16, ratio: 75 } },
      task: 'Set up MAE\'s default configuration (patch 16, 75% masked). Then compare **random** and **block-wise** masking at the same ratio: which one would be harder to solve by copying from neighbouring patches? Finally try patch 14 — the patch size of DINOv2/DINOv3.',
    },
    {
      id: 'calc-visible', type: 'numeric', title: 'Tokens in the encoder',
      question: 'A 224×224 image, patch size 16, 75% masking. How many patch tokens does the MAE **encoder** process?',
      answer: 49, tolerance: 0,
      hint: '$224 / 16 = 14$ patches per side.',
      explain: '$14 \\times 14 = 196$ patches; 25% visible → $49$ tokens (plus a CLS token in the official implementation).',
    },
    {
      id: 'calc-cost', type: 'numeric', title: 'Why masking is cheap',
      question: 'Self-attention cost grows with the **square** of the number of tokens. What fraction of the full-image attention cost does the MAE encoder pay with 25% of patches visible? Answer in percent.',
      answer: 6.25, tolerance: 0.05, unit: '%',
      hint: '$(49/196)^2$',
      explain: '$(1/4)^2 = 1/16 = 6.25\\%$ for attention; the MLP layers scale linearly, costing 25%. Overall the encoder is roughly 3–4× cheaper per image than processing the full image, which is why MAE scales well to big models — and why MAE-style pretraining on your 100k images is among the cheaper SSL options on a 2×4090 box.',
    },
    {
      id: 'mae-properties', type: 'text', title: 'What MAE features are good at — and what not',
      md: `
MAE is excellent as **initialization for fine-tuning**: a ViT-Huge pretrained with MAE reached 87.8% [ImageNet](wiki:ImageNet) top-1 after fine-tuning, using only ImageNet-1K images.[^mae]

But under a **[[linear-probe]]** — frozen features, linear readout — MAE is clearly weaker than contrastive or DINO-style features. Pixel reconstruction makes the encoder keep lots of low-level detail (textures, exact intensities) that a linear classifier can't easily use; the semantics are there but not linearly organized.

For you this distinction matters: if you plan to use a **[[frozen-backbone]]** with a light segmentation head, you want features that are good *out of the box* — DINO-family features. MAE-style models need [[fine-tuning]].`,
    },
    {
      id: 'ibot', type: 'text', title: 'iBOT: predict features, not pixels',
      md: `
**[[ibot|iBOT]]**[^ibot] (image BERT pre-training with Online Tokenizer) combines masked modeling with DINO's self-distillation:

- The **student** sees a *masked* image (blockwise masking); the **teacher** — an [[ema]] of the student, as in DINO — sees the *full* image.
- At each masked position $i$, the student's patch output must match the teacher's patch output distribution. With $m_i = 1$ for masked patches, $u_i$ the teacher's patch token (unmasked view) and $\\hat{u}_i$ the student's (masked view):

$$\\mathcal{L}_{\\text{MIM}} = -\\sum_{i=1}^{N} m_i \; P_t(u_i)^\\top \\log P_s(\\hat{u}_i)$$

- Plus the usual **DINO loss on the [[cls-token]]** across two augmented views.

The teacher plays the role of a **tokenizer** — it turns each patch into a distribution over learned "visual words" — and because it keeps improving during training, it's called an *online* tokenizer. BERT predicts discrete words; iBOT predicts the teacher's soft "visual words" for each patch.

Why this helps: the target is **semantic** (what kind of thing is here?), not pixel-exact (which brightness value?). And it's applied **per patch**, so every patch token learns to be meaningful — exactly what dense tasks like segmentation need. This is why **DINOv2 and DINOv3 use DINO loss + iBOT loss** together.`,
    },
    {
      id: 'compare', type: 'text', title: 'Side by side',
      md: `
<table>
<tr><th></th><th>DINO</th><th>MAE</th><th>iBOT</th></tr>
<tr><td>Input to student</td><td>multi-crop views</td><td>visible 25% of patches</td><td>masked image (+ views)</td></tr>
<tr><td>Target</td><td>teacher distribution (CLS)</td><td>raw pixels of masked patches</td><td>teacher distributions: CLS <i>and</i> masked patches</td></tr>
<tr><td>Teacher</td><td>EMA</td><td>none (pixels are the target)</td><td>EMA ("online tokenizer")</td></tr>
<tr><td>Strength</td><td>global semantics, k-NN / linear</td><td>fine-tuning, cheap to scale</td><td>global <i>and</i> dense features</td></tr>
<tr><td>Frozen features</td><td>strong</td><td>weak (needs fine-tuning)</td><td>strong</td></tr>
</table>`,
    },
    {
      id: 'quiz-mim', type: 'quiz', title: 'MAE or iBOT?',
      question: 'Select every correct statement.',
      options: [
        { text: 'MAE\'s encoder processes mask tokens for the hidden patches.', correct: false, why: 'Only the decoder sees mask tokens. The encoder processes visible patches only — that\'s where the compute savings come from.' },
        { text: 'MAE computes the reconstruction loss only on masked patches.', correct: true, why: 'Reconstructing visible patches would be trivial copying.' },
        { text: 'iBOT\'s targets for masked patches come from an EMA teacher that sees the unmasked image.', correct: true, why: 'The teacher acts as an online tokenizer.' },
        { text: 'A low masking ratio (15%) works best for images, like in BERT.', correct: false, why: 'Images are redundant; low ratios are solvable by interpolation. MAE uses 75%.' },
        { text: 'DINOv2 combines the DINO image-level loss with the iBOT patch-level loss.', correct: true, why: 'That combination is the core of DINOv2 (and DINOv3) training.' },
      ],
    },
    {
      id: 'match-targets', type: 'match', title: 'Match the method to its prediction target',
      pairs: [
        ['BERT', 'Hidden words in a sentence'],
        ['MAE', 'Normalized pixels of masked patches'],
        ['iBOT (patch loss)', 'Teacher\'s patch distributions at masked positions'],
        ['DINO', 'Teacher\'s CLS distribution for another crop'],
        ['SimCLR', 'Which candidate is my other augmented view'],
      ],
    },
    {
      id: 'mission-dense', type: 'callout', tone: 'mission', title: 'Why this matters for segmenting watch parts',
      md: `
Segmentation quality depends on **patch features**, not on the one global image vector. The iBOT-style patch loss inside DINOv2/DINOv3 is what makes their patch tokens so useful: every patch has been trained to "know what it is" in context — dial, index, hand, bezel insert.

Two practical takeaways:

- **Frozen DINOv3 patch features + light head** is a strong first baseline for your 100k-image problem — no SSL training needed on your side.
- **If you do domain-adaptive pretraining**, a masked objective is attractive: renders and real photos can be mixed freely (no labels), and masking makes each step cheaper. But compare against the off-the-shelf backbone on a fixed, labeled evaluation set before believing it helped.

A nice diagnostic: mask the region around the crown in a real photo and look at how a masked model fills it. If reconstructions are plausible on renders but garbage on real photos, you're seeing your domain gap.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>English</th><th>Deutsch</th><th>Notation</th></tr>
<tr><td>masked image modeling</td><td>maskierte Bildmodellierung</td><td></td></tr>
<tr><td>masking ratio</td><td>Maskierungsanteil, Maskierungsrate</td><td>75 %</td></tr>
<tr><td>patch</td><td>Bildausschnitt, Bildkachel (meist „Patch“)</td><td>$x_i$</td></tr>
<tr><td>encoder / decoder</td><td>Kodierer / Dekodierer</td><td></td></tr>
<tr><td>mean squared error</td><td>mittlerer quadratischer Fehler</td><td>$\\frac{1}{|M|}\\sum \\lVert\\hat x_i - x_i\\rVert^2$</td></tr>
<tr><td>set of masked indices</td><td>Indexmenge der maskierten Patches</td><td>$M$, $|M|$ = Mächtigkeit</td></tr>
<tr><td>reconstruction</td><td>Rekonstruktion</td><td>$\\hat{x}$</td></tr></table>`,
    },
    {
      id: 'recall-mim', type: 'recall', title: 'Explain it to a colleague',
      prompt: 'Explain the difference between predicting **pixels** (MAE) and predicting **teacher features** (iBOT) for masked patches. Why does the feature target give better frozen features for segmentation?',
      answer: `MAE's target is the exact (normalized) pixel content of each masked patch, so the encoder must retain lots of low-level detail — textures, precise intensities — to reconstruct well. Those details are not linearly organized by meaning, so frozen MAE features are mediocre under a linear probe and need fine-tuning. iBOT's target is the **EMA teacher's output distribution** for each patch, computed from the unmasked image — a *semantic* description ("which learned visual word is here") rather than exact pixels. Matching it per patch makes **every patch token semantically meaningful in context**, and the targets improve as the teacher improves. Segmentation reads classes off individual patch tokens, so this directly produces better dense, frozen features — which is why DINOv2/DINOv3 include the iBOT loss.`,
      hints: ['What does a network need to remember to reproduce exact pixels?', 'Who produces iBOT\'s targets, and from which view?', 'Segmentation needs good features at which level — image or patch?'],
      cards: ['pixel-vs-feature', 'ibot-loss'],
    },
  ],
  cards: [
    { id: 'mim-def', front: 'What is masked image modeling?', back: 'Hide a large fraction of image patches and train the network to predict the hidden content (pixels or features) from the visible context.' },
    { id: 'mae-ratio', front: 'MAE masking ratio and why so high?', back: '75%. Images are redundant; low ratios can be solved by interpolating neighbours instead of understanding.' },
    { id: 'mae-asym', front: 'MAE\'s asymmetric design', back: 'Large encoder on visible patches only (no mask tokens); small decoder gets encoded patches + mask tokens and reconstructs pixels. Decoder discarded after pretraining.' },
    { id: 'mae-loss', front: 'MAE loss', back: 'MSE between predicted and (per-patch normalized) true pixels, **only on masked patches**: $\\frac{1}{|M|}\\sum_{i\\in M}\\lVert\\hat x_i - x_i\\rVert^2$.' },
    { id: 'mae-tokens', front: '224² image, patch 16, 75% masked: tokens in the MAE encoder?', back: '196 patches → 49 visible tokens. Attention cost ≈ (1/4)² = 6.25% of full.' },
    { id: 'mae-probe', front: 'MAE features: strong under fine-tuning or linear probe?', back: 'Fine-tuning (ViT-H: 87.8% ImageNet). Linear probe is comparatively weak — features keep low-level detail.' },
    { id: 'ibot-loss', front: 'iBOT\'s patch-level objective', back: 'At masked positions, the student\'s patch distribution must match the EMA teacher\'s patch distribution from the unmasked image: $-\\sum_i m_i P_t(u_i)^\\top \\log P_s(\\hat u_i)$. Plus DINO loss on CLS.' },
    { id: 'online-tokenizer', front: 'Why is iBOT\'s teacher called an "online tokenizer"?', back: 'It maps each patch to a distribution over learned visual words (like BERT\'s token vocabulary), and it keeps improving during training.' },
    { id: 'pixel-vs-feature', front: 'Why do feature targets (iBOT) give better frozen dense features than pixel targets (MAE)?', back: 'Feature targets are semantic, not pixel-exact, and applied per patch — every patch token learns meaning in context instead of storing low-level detail.' },
  ],
};
