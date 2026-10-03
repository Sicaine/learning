export default {
  id: 'open-vocabulary',
  title: 'Open vocabulary: CLIP & text prompts',
  summary: 'What if classes were just *text*? How CLIP aligns images and language, how that enables zero-shot recognition, and how text reaches detection and segmentation.',
  minutes: 30,
  goals: [
    'Explain [[clip]]’s contrastive training with a batch similarity matrix',
    'Do [[zero-shot]] classification by hand: text embeddings as classifier weights',
    'Untangle the three different “DINO”s',
    'Build a text → boxes → masks pipeline and judge how it will handle horology vocabulary',
  ],
  blocks: [
    {
      id: 'closed-vs-open', type: 'text', title: 'Closed sets vs. open vocabulary',
      md: `
A classic classifier ends in a layer with one weight vector per class: $K$ classes, $K$ rows. The class list is frozen at training time. Want to add "skeleton dial"? Collect labels and retrain.

An **[[open-vocabulary]]** model instead maps images (or regions) *and text* into the same [[embedding]] space. Any phrase you can type becomes a class, at test time. The key model that made this practical is [CLIP](wiki:Contrastive Language-Image Pre-training).`,
    },
    {
      id: 'clip', type: 'text', title: 'CLIP: learn from 400 million captions',
      md: `
[[clip]] (2021)[^clip] trains two encoders — one for images, one for text — on **400 million (image, text) pairs** collected from the internet. No labels, just the captions that already sit next to images.

The training task: in a batch of $N$ pairs, figure out which caption belongs to which image. Embed all images ($\\mathbf{u}_i$) and all texts ($\\mathbf{v}_j$), L2-normalize them, and compute the $N \\times N$ matrix of [[cosine-similarity|cosine similarities]], scaled by a learned [[temperature]] $\\tau$:

$$S_{ij} = \\frac{\\mathbf{u}_i \\cdot \\mathbf{v}_j}{\\tau}$$

The correct pairs sit on the diagonal. The loss is a [[cross-entropy]] in both directions — each row must pick its own column (image → text), each column its own row (text → image):

$$\\mathcal{L} = \\tfrac12\\Big[\\mathrm{CE}_{\\text{rows}}(S) + \\mathrm{CE}_{\\text{cols}}(S)\\Big]$$

This is [[contrastive-learning]] (the [[infonce]] loss) with *text* playing the role of the second view. Every other caption in the batch is a negative — CLIP used batches of 32,768.`,
    },
    {
      id: 'fig-matrix', type: 'figure', title: 'The batch similarity matrix',
      html: `<svg viewBox="0 0 440 250" width="440" font-family="Inter" font-size="11.5">
        ${['diver', 'dress', 'chrono', 'pocket', 'smart'].map((t, j) => `<text x="${130 + j * 58 + 26}" y="22" text-anchor="middle" fill="#74748c">“${t}…”</text>`).join('')}
        ${['🖼 diver', '🖼 dress', '🖼 chrono', '🖼 pocket', '🖼 smart'].map((t, i) => `<text x="118" y="${52 + i * 42}" text-anchor="end" fill="#74748c">${t}</text>`).join('')}
        ${[0, 1, 2, 3, 4].map(i => [0, 1, 2, 3, 4].map(j => { const v = i === j ? 0.9 : [0.3, 0.1, 0.2, 0.05, 0.15][(i * 3 + j) % 5]; return `<rect x="${130 + j * 58}" y="${32 + i * 42}" width="52" height="36" rx="6" fill="${i === j ? 'var(--accent)' : '#8a8aa0'}" fill-opacity="${i === j ? 0.85 : v}"/><text x="${130 + j * 58 + 26}" y="${54 + i * 42}" text-anchor="middle" fill="${i === j || v > 0.25 ? '#fff' : '#3b3b55'}" font-family="JetBrains Mono">${v.toFixed(2)}</text>`; }).join('')).join('')}
      </svg>`,
      caption: 'Rows = image embeddings, columns = text embeddings. Training pushes the diagonal (matching pairs) up and everything else down — in both directions.',
    },
    {
      id: 'calc-negatives', type: 'numeric', title: 'Negatives for free',
      question: 'With CLIP’s batch size of 32,768 pairs, how many **negative** captions does each image get compared against in one training step?',
      answer: 32767, tolerance: 0,
      explain: 'Every caption in the batch except its own: $32{,}768 - 1 = 32{,}767$. The similarity matrix has $32{,}768^2 \\approx 1.07$ billion entries — huge batches are one reason contrastive image–text training is compute-hungry, and why you won’t retrain CLIP on 2 GPUs.',
    },
    {
      id: 'zero-shot', type: 'text', title: 'Zero-shot classification: text as classifier weights',
      md: `
To classify an image among classes you choose at test time:

1. Write a prompt per class: *"a photo of a dive watch"*, *"a photo of a dress watch"*, …
2. Embed each prompt with the text encoder → vectors $\\mathbf{v}_1, \\dots, \\mathbf{v}_K$.
3. Embed the image → $\\mathbf{u}$. Pick the class with the highest $\\mathbf{u} \\cdot \\mathbf{v}_k$; a [[softmax]] over $\\mathbf{u}\\cdot\\mathbf{v}_k/\\tau$ gives probabilities.

Look closely: the text embeddings play exactly the role of the $K$ rows of a classifier's last layer — they *are* the weights, generated from language. That's **[[zero-shot]]** transfer: CLIP matched the accuracy of the original, fully supervised [ResNet-50](wiki:Residual neural network) on [ImageNet](wiki:ImageNet|ImageNet) without using any of its 1.28 million labeled training images.

[Prompt](wiki:Prompt engineering|Prompt-Engineering) wording matters ("a photo of a {class}" beats the bare class name), and averaging several prompts per class (prompt ensembling) helps further.`,
    },
    {
      id: 'viz-clip', type: 'viz', viz: 'clip-space', title: 'Zero-shot in two dimensions',
      task: 'Drag the text embeddings until **all 8 images** are classified correctly. Then play with τ: at small τ the softmax is confident, at large τ it becomes nearly uniform — but the predicted class (argmax) never changes. Why?',
    },
    {
      id: 'deep-temp', type: 'callout', tone: 'deep', title: 'The learned temperature',
      md: `
CLIP learns $\\tau$ as a parameter (stored as a log-scale "logit scale", initialised to the equivalent of $\\tau = 0.07$ and clipped so the logits are never multiplied by more than 100). Cosine similarities live in $[-1, 1]$; without dividing by a small $\\tau$ the softmax could never become confident — even a perfect match would be only slightly more likely than a random caption. The same knob returns in self-supervised DINO as *sharpening*.`,
    },
    {
      id: 'quiz-clip-dense', type: 'quiz', title: 'CLIP for segmentation?',
      question: 'Why are CLIP’s *patch* features typically weaker for pixel-accurate segmentation than DINOv2/DINOv3 features?',
      options: [
        { text: 'CLIP is trained only to match a whole image to a whole caption, so nothing forces individual patch features to be spatially precise.', correct: true, why: 'The loss only sees the global embedding. Self-supervised DINO-family methods train patch-level objectives (e.g. iBOT’s masked patch prediction), which pays off in dense tasks.[^dinov2]' },
        { text: 'CLIP uses convolutions, which cannot represent patches.', correct: false, why: 'CLIP has both ResNet and ViT variants, and convolutions are perfectly spatial.' },
        { text: 'CLIP images are grayscale.', correct: false, why: 'No — they are ordinary RGB images.' },
        { text: 'Text encoders destroy the image features during training.', correct: false, why: 'The encoders are separate; the text encoder never touches image features directly.' },
      ],
    },
    {
      id: 'three-dinos', type: 'callout', tone: 'warning', title: 'Three different things called “DINO”',
      md: `
This trips up everyone reading the literature:

- **DINO** (Caron et al., 2021) = *self-**DI**stillation with **NO** labels* — the self-supervised method of the previous stage, parent of **DINOv2** and **DINOv3**.[^dino]
- **DINO** (Zhang et al., 2022) = *DETR with Improved deNoising anchOr boxes* — an object **[detector](wiki:Object detection)** in the [[detr]] family.[^dino-detr]
- **Grounding DINO** (2023) builds on the *detector* DINO and adds text. It has nothing to do with self-supervised DINO features.[^grounding-dino]

Rule of thumb: if it outputs boxes, it's the detector family; if it outputs general-purpose features, it's the self-supervised family.`,
    },
    {
      id: 'grounding', type: 'text', title: 'Text to boxes to masks',
      md: `
CLIP classifies whole images. To *locate* phrases, [[grounding-dino]][^grounding-dino] fuses image and text inside a DETR-style detector: a feature enhancer mixes the two modalities, *language-guided query selection* initialises [[object-query|object queries]] from image regions that match the text, and a cross-modality decoder refines them. Result: type "crown . bezel . hands", get boxes with phrase labels. It reached 52.5 AP on COCO **without any COCO training data**.

Boxes are exactly what SAM takes as prompts. Chaining the two is "Grounded SAM":[^grounded-sam]

**text → Grounding DINO → boxes → SAM → masks**

[[sam3]] now does text-to-masks natively in one model. Both are open-vocabulary segmentation — and both are candidates for pre-labeling your data.`,
    },
    {
      id: 'order-pipeline', type: 'order', title: 'Assemble the pipeline',
      prompt: 'Order the steps of a Grounded-SAM style pipeline that turns the prompt “watch hands” into masks.',
      items: [
        'Encode the image and the text prompt “watch hands”',
        'Grounding DINO fuses both and selects queries matching the phrase',
        'The detector outputs boxes with confidence scores for the phrase',
        'Boxes above a confidence threshold become box prompts for SAM',
        'SAM’s mask decoder returns one mask per box',
      ],
      explain: 'Each stage can fail on its own: the detector may miss a thin seconds hand (no box → no mask), or SAM may segment a glare inside a correct box. Evaluate the stages separately.',
    },
    {
      id: 'match-models', type: 'match', title: 'Inputs and outputs',
      pairs: [
        ['CLIP', 'image + list of texts → best-matching text'],
        ['Grounding DINO', 'image + phrase → boxes'],
        ['SAM', 'image + points/box → class-agnostic masks'],
        ['SAM 3', 'image + noun phrase → masks of all instances'],
        ['Mask2Former (trained on your classes)', 'image → masks with your fixed labels'],
      ],
    },
    {
      id: 'mission-vocab', type: 'callout', tone: 'mission', title: 'Does the internet know what a “chapter ring” is?',
      md: `
Open-vocabulary models know what their web captions contained. "Watch", "dial", maybe "crown" and "strap" appear often. **Horological jargon** — *chapter ring, applied indices, lume plots, cyclops, pushers, rehaut, subdial* — is rare in captions, so text prompts for these will be weak or wrong.

A sensible plan:

1. Build a small **real** evaluation set: ~50 photos with careful masks for your part taxonomy.
2. Measure per-part [[iou]] for text-prompted pipelines (SAM 3, Grounded SAM) with *plain-language* prompts ("the little knob on the side" may beat "crown").
3. Use them where they work as a [[pseudo-label]] generator for real images; fill the gaps with clicks.
4. Train a **specialist** (strong backbone + Mask2Former-style head) on synthetic + pseudo-labeled real data. For a fixed taxonomy on a narrow domain, a specialist trained on your 100k images will almost always beat a generalist.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>English</th><th>Deutsch</th><th>Notation</th></tr>
<tr><td>open vocabulary</td><td>offenes Vokabular</td><td></td></tr>
<tr><td>similarity matrix</td><td>Ähnlichkeitsmatrix</td><td>$S \\in \\mathbb{R}^{N\\times N}$</td></tr>
<tr><td>diagonal</td><td>Diagonale</td><td>$S_{ii}$</td></tr>
<tr><td>temperature</td><td>Temperatur(parameter)</td><td>$\\tau$</td></tr>
<tr><td>cross-entropy</td><td>Kreuzentropie</td><td>$\\mathrm{CE}$</td></tr>
<tr><td>symmetric</td><td>symmetrisch</td><td>$\\tfrac12(\\cdot + \\cdot)$</td></tr>
<tr><td>zero-shot</td><td>Zero-Shot (ohne Beispiele)</td><td></td></tr></table>`,
    },
    {
      id: 'recall-zeroshot', type: 'recall', title: 'Explain zero-shot classification',
      prompt: 'Explain how CLIP can classify an image into classes it was never explicitly trained on. Mention what plays the role of the classifier weights.',
      answer: `CLIP was trained contrastively so that an image embedding and the embedding of its caption have high cosine similarity, and non-matching pairs low similarity. At test time, each candidate class is turned into a text prompt ("a photo of a {class}") and embedded by the text encoder; these normalized text embeddings act as the rows of the classifier's weight matrix. The image embedding is compared with each of them by dot product (cosine similarity), scaled by the temperature and passed through a softmax; the highest score wins. Because any text can be embedded, the set of classes is open — no retraining, only new prompts.`,
      hints: ['What does a normal classifier’s last layer contain?', 'Where does CLIP get a vector per class from?'],
      cards: ['zeroshot-weights'],
    },
  ],
  cards: [
    { id: 'clip-data', front: 'What was CLIP trained on, with which objective?', back: '400M web image–text pairs; symmetric contrastive (InfoNCE) loss over an $N\\times N$ batch similarity matrix.' },
    { id: 'clip-matrix', front: 'In CLIP’s batch similarity matrix, where are the positives?', back: 'On the diagonal ($S_{ii}$); every off-diagonal entry is a negative pair. Loss = cross-entropy over rows and over columns.' },
    { id: 'zeroshot-weights', front: 'In CLIP zero-shot classification, what acts as the classifier weights?', back: 'The normalized text embeddings of the class prompts ("a photo of a {class}").' },
    { id: 'clip-temp', front: 'Why does CLIP divide cosine similarities by a small temperature τ?', back: 'Cosines lie in [−1, 1]; scaling by 1/τ (learned, init 0.07) lets the softmax become confident.' },
    { id: 'clip-dense', front: 'Why are CLIP patch features weaker for segmentation than DINOv2’s?', back: 'CLIP only aligns global image and caption embeddings; nothing enforces precise per-patch features.' },
    { id: 'three-dinos', front: 'Name the three “DINO”s', back: 'Self-supervised DINO (self-distillation, → DINOv2/v3); DINO detector (DETR with improved denoising anchor boxes); Grounding DINO (text-conditioned detector built on the latter).' },
    { id: 'grounded-sam', front: 'Grounded SAM pipeline', back: 'Text → Grounding DINO → boxes → SAM box prompts → masks.' },
    { id: 'jargon', front: 'Why might “chapter ring” fail as a text prompt?', back: 'Rare horology jargon is underrepresented in web captions; use plain descriptions, measure per-part IoU on a real eval set, and train a specialist.' },
  ],
};
