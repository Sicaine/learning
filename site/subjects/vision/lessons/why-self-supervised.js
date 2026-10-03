export default {
  id: 'why-self-supervised',
  title: 'Why self-supervised learning?',
  summary: 'Labels are the bottleneck of computer vision — and per-pixel labels most of all. [[self-supervised-learning|Self-supervised learning]] lets the images teach the network themselves. This lesson sets up the ideas that DINO, MAE and DINOv3 build on.',
  minutes: 25,
  goals: [
    'Explain why labels, especially segmentation masks, limit supervised learning',
    'Describe what a [[pretext-task]] is and why we throw its answers away',
    'Evaluate a frozen [[representation]] with a [[linear-probe]] and [[knn-eval|k-NN]]',
    'Judge which self-supervised option makes sense for your 100k unlabeled watch images',
  ],
  blocks: [
    {
      id: 'bottleneck', type: 'text', title: 'The label bottleneck',
      md: `
[Supervised learning](wiki:Supervised learning|Überwachtes Lernen) needs a human answer for every training example. For classification that's one word per image. For **[segmentation](wiki:Image segmentation|Segmentierung (Bildverarbeitung))** it's a precise outline for every object part — minutes of careful clicking per image.

Meanwhile *unlabeled* images are nearly free. You already have ~100k of them, plus a renderer that produces more. The question behind this whole stage:

> Can a network learn what watches look like — cases, dials, hands, crowns — **before** anyone tells it what those words mean?

If yes, the expensive labels are only needed for the last, small step: mapping already-good features to your class names. That's the promise of **[[self-supervised-learning]]** (SSL).`,
    },
    {
      id: 'calc-labels', type: 'numeric', title: 'What would full labeling cost?',
      question: 'Suppose drawing one careful polygon mask for a watch part takes **30 seconds**, and each image has **8 parts** (case, bezel, dial, hour hand, minute hand, second hand, crown, strap). How many **hours** would it take to label all **100,000** images?',
      answer: 6667, tolerance: 15, unit: 'hours',
      hint: '$100{,}000 \\times 8 \\times 30$ seconds, then divide by 3600.',
      explain: '$100{,}000 \\cdot 8 \\cdot 30\\,\\text{s} = 24{,}000{,}000\\,\\text{s} \\approx 6{,}667$ hours — more than three years of full-time work for one person. This is why nobody labels everything, and why SSL features + a few hundred good labels + clever pseudo-labeling is the modern recipe.',
    },
    {
      id: 'pretext', type: 'text', title: 'Pretext tasks: puzzles with free answers',
      md: `
The first idea (2015–2018): invent a task whose labels are generated automatically, and hope that solving it requires understanding images. Classic **[[pretext-task|pretext tasks]]**:

- **[Colorization](wiki:Image colorization):** predict the colors of a grayscale photo.[^colorization] To color a strap brown and a dial blue you must recognize them.
- **[Jigsaw](wiki:Jigsaw puzzle|Puzzle):** cut an image into 3×3 tiles, shuffle them, predict the permutation.[^jigsaw] Requires knowing which parts belong where.
- **Rotation:** rotate the image by 0°, 90°, 180° or 270° and predict which.[^rotnet] You can't tell "upright" without knowing what objects look like.

The answers themselves are worthless. What we keep is the network's internal **[[representation]]** — the features it built along the way.

The weakness: networks are lazy. They find **shortcuts** — [chromatic aberration](wiki:Chromatic aberration|Chromatische Aberration) at image borders, [JPEG](wiki:JPEG) artifacts, lighting direction — that solve the puzzle without semantic understanding. Modern SSL replaced hand-made puzzles with more general objectives that are much harder to cheat.`,
    },
    {
      id: 'match-pretext', type: 'match', title: 'Match each method to what it predicts',
      prompt: 'You will meet the last three in the next lessons — match them by their description.',
      pairs: [
        ['Rotation prediction', 'Which of 4 angles the image was turned'],
        ['Jigsaw', 'The permutation of shuffled tiles'],
        ['Colorization', 'Color channels from a grayscale image'],
        ['Contrastive learning', 'Which candidate is the other view of my image'],
        ['Masked image modeling', 'The content of hidden patches'],
        ['Self-distillation (DINO)', 'The output distribution of an averaged teacher network'],
      ],
    },
    {
      id: 'pipeline', type: 'figure', title: 'The pretrain → transfer recipe',
      html: `<svg viewBox="0 0 640 210" width="640" font-family="Inter, sans-serif" font-size="12">
  <defs><marker id="ssA" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#8a8aa3"/></marker></defs>
  <g>
    <rect x="10" y="30" width="120" height="70" rx="12" fill="#f3f3f8" stroke="#d9d9e4"/>
    ${[0, 1, 2, 3].map(i => `<rect x="${22 + i * 12}" y="${44 + i * 6}" width="60" height="40" rx="5" fill="#fff" stroke="#b9b9cc"/>`).join('')}
    <text x="70" y="120" text-anchor="middle" fill="#3b3b55" font-weight="600">millions of</text>
    <text x="70" y="135" text-anchor="middle" fill="#3b3b55" font-weight="600">unlabeled images</text>
  </g>
  <line x1="136" y1="65" x2="196" y2="65" stroke="#8a8aa3" stroke-width="1.6" marker-end="url(#ssA)"/>
  <rect x="200" y="30" width="150" height="70" rx="12" fill="var(--accent-soft)" stroke="var(--accent-line)"/>
  <text x="275" y="60" text-anchor="middle" fill="var(--accent)" font-weight="700">self-supervised</text>
  <text x="275" y="76" text-anchor="middle" fill="var(--accent)" font-weight="700">pretraining</text>
  <text x="275" y="120" text-anchor="middle" fill="#74748c">expensive, done once</text>
  <line x1="356" y1="65" x2="406" y2="65" stroke="#8a8aa3" stroke-width="1.6" marker-end="url(#ssA)"/>
  <rect x="410" y="30" width="100" height="70" rx="12" fill="#16162a"/>
  <text x="460" y="62" text-anchor="middle" fill="#fff" font-weight="700">backbone</text>
  <text x="460" y="78" text-anchor="middle" fill="#c9c9e0">(frozen)</text>
  <line x1="516" y1="50" x2="556" y2="28" stroke="#8a8aa3" stroke-width="1.4" marker-end="url(#ssA)"/>
  <line x1="516" y1="65" x2="556" y2="80" stroke="#8a8aa3" stroke-width="1.4" marker-end="url(#ssA)"/>
  <line x1="516" y1="82" x2="556" y2="132" stroke="#8a8aa3" stroke-width="1.4" marker-end="url(#ssA)"/>
  <text x="562" y="32" fill="#3b3b55">k-NN</text>
  <text x="562" y="84" fill="#3b3b55">linear probe</text>
  <text x="562" y="136" fill="#3b3b55">seg. head</text>
  <text x="460" y="170" text-anchor="middle" fill="#74748c">cheap: few labels,</text>
  <text x="460" y="185" text-anchor="middle" fill="#74748c">small trainable part</text>
</svg>`,
      caption: 'Pretrain once on unlabeled data, then reuse the [[backbone]] for many tasks with little labeled data.',
    },
    {
      id: 'evaluate', type: 'text', title: 'How do you grade features without the real task?',
      md: `
A self-supervised network never saw a label, so how do we know its features are good? Freeze it and test how *easily* labels can be read off:

**[[linear-probe|Linear probe]]:** keep the [[backbone]] $f$ frozen, train only one linear layer:

$$\\hat{y} = \\operatorname{softmax}\\big(W f(x) + b\\big)$$

If a *[linear classifier](wiki:Linear classifier)* suffices, the classes are already separated in feature space.

**[[knn-eval|k-NN]]:** no training at all. L2-normalize all training [[embedding|embeddings]]; for a test image, find the $k$ most similar ones by [[cosine-similarity]] and let them vote. DINO reports both, using a similarity-weighted vote with $k = 20$.[^dino]

For segmentation the same idea runs **per patch**: a linear layer on every patch embedding produces a segmentation map. That's the "linear segmentation" number you'll see in the DINOv2 and DINOv3 papers.`,
    },
    {
      id: 'viz-knn', type: 'viz', viz: 'knn-probe', title: 'k-NN on a toy embedding space',
      task: 'Get a prediction for each of the three classes with **good features**. Then switch to **bad features** and see how k-NN turns into a coin flip — the same classifier, only the representation changed. Notice that a point\'s distance from the center never matters: cosine similarity only looks at the direction.',
    },
    {
      id: 'families', type: 'text', title: 'Three families of modern SSL',
      md: `
Everything after the pretext-task era falls into three families — you'll study each in this stage:

<table>
<tr><th>Family</th><th>Training signal</th><th>Examples</th><th>Anti-collapse trick</th></tr>
<tr><td><b>Contrastive</b></td><td>two views of one image close, other images far</td><td>SimCLR, MoCo</td><td>negatives</td></tr>
<tr><td><b>Self-distillation</b></td><td>student matches an averaged teacher</td><td>BYOL, DINO</td><td>EMA teacher, centering, sharpening</td></tr>
<tr><td><b>Masked modeling</b></td><td>predict hidden patches</td><td>MAE, iBOT</td><td>reconstruction target is not trivial</td></tr>
</table>

**DINOv2 and DINOv3 = self-distillation (DINO) + masked modeling (iBOT)** plus careful data and scale. So after this stage you'll know every ingredient of the current state of the art.`,
    },
    {
      id: 'quiz-eval', type: 'quiz', title: 'Evaluating representations',
      question: 'A team pretrains a ViT with SSL on unlabeled images. Which statements are correct?',
      options: [
        { text: 'A linear probe trains the whole network end-to-end on labels.', correct: false, why: 'That is fine-tuning. A linear probe freezes the backbone and trains only one linear layer.' },
        { text: 'k-NN evaluation needs no gradient-based training at all.', correct: true, why: 'It just embeds the labeled set and votes among nearest neighbours.' },
        { text: 'High linear-probe accuracy suggests the classes are (nearly) linearly separable in feature space.', correct: true, why: 'That is precisely what a linear classifier can exploit.' },
        { text: 'The pretext task\'s predictions are what we deploy afterwards.', correct: false, why: 'We keep the backbone\'s features; the pretext head is thrown away.' },
        { text: 'A per-patch linear layer on frozen features can produce a segmentation map.', correct: true, why: 'This "linear segmentation" protocol is used to evaluate dense features in DINOv2/DINOv3.' },
      ],
    },
    {
      id: 'mission-options', type: 'callout', tone: 'mission', title: 'What can SSL do with your 100k watch images?',
      md: `
Three realistic options, from cheapest to most ambitious:

1. **Use a pretrained backbone as is.** DINOv3 was trained on about 1.7 billion curated images.[^dinov3] Your 100k images are a rounding error in comparison. Start here: extract patch features and check whether watch parts are already separated (k-NN / linear probe per patch on a small labeled set).
2. **Continue SSL pretraining on your domain.** If your photos are unusual (macro shots, reflections on sapphire crystal, studio lighting), a few epochs of DINO/iBOT-style training on your images — real *and* rendered — can adapt the features. Risk: with small data you can also make them worse; always compare against option 1.
3. **SSL from scratch on 100k images.** For ViTs this is usually a bad trade: far less data than the public models saw, and weeks of compute for worse features.

A key point for later: your **renders are unlabeled data too** — and SSL features trained on both real and rendered images may shrink the [[domain-gap]].`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>English</th><th>Deutsch</th></tr>
<tr><td>self-supervised learning</td><td>selbstüberwachtes Lernen</td></tr>
<tr><td>label / annotation</td><td>Label, Annotation, Beschriftung</td></tr>
<tr><td>pretext task</td><td>Vorwandaufgabe, Hilfsaufgabe</td></tr>
<tr><td>representation / features</td><td>Repräsentation, Merkmale</td></tr>
<tr><td>linear probe</td><td>lineare Sonde, linearer Klassifikator auf eingefrorenen Merkmalen</td></tr>
<tr><td>nearest neighbour</td><td>nächster Nachbar</td></tr>
<tr><td>frozen (weights)</td><td>eingefroren</td></tr>
<tr><td>downstream task</td><td>nachgelagerte Aufgabe, Zielaufgabe</td></tr></table>`,
    },
    {
      id: 'recall-why', type: 'recall', title: 'Explain it to a colleague',
      prompt: 'Your colleague asks: "Why would training a network on a task nobody cares about — like predicting rotations or matching crops — help with *segmenting watches*? And how would you even check that it helped before building the segmenter?" Answer in 3–5 sentences.',
      answer: `To solve the pretext task well, the network has to build internal features that capture *what* is in the image — shapes, parts, objects — because that's what the task implicitly depends on; the answers are discarded, the **representation** is kept. Since those features were learned from lots of unlabeled data, the downstream segmenter only has to learn a small mapping from good features to class names, which needs far fewer labeled masks. To check quality without building the full system, freeze the backbone and test how easily labels can be read off: a **k-NN** vote on cosine similarities (no training) or a **linear probe** — for segmentation, a per-patch linear layer on a small labeled set. If those simple readouts work, the features are good.`,
      hints: ['What does the network have to "know" to tell whether a photo is upside down?', 'What is kept after pretraining — the answers or the features?', 'Which evaluation needs zero training?'],
      cards: ['pretext-keep', 'linear-probe'],
    },
  ],
  cards: [
    { id: 'ssl-def', front: 'What is self-supervised learning?', back: 'Learning from unlabeled data with a training signal generated from the data itself (e.g. predict hidden parts, match two views of one image).' },
    { id: 'pretext-keep', front: 'After solving a pretext task, what do we keep — and what do we throw away?', back: 'Keep the backbone\'s learned representation (features). Throw away the pretext head and its answers.' },
    { id: 'pretext-examples', front: 'Name three classic pretext tasks.', back: 'Rotation prediction (0/90/180/270°), jigsaw puzzles (tile permutation), colorization (color from grayscale).' },
    { id: 'shortcut', front: 'Main weakness of hand-designed pretext tasks?', back: 'Shortcuts: the network solves the puzzle using low-level cues (artifacts, borders, lighting) instead of semantics.' },
    { id: 'linear-probe', front: 'What is a linear probe?', back: 'Freeze the pretrained backbone, train only a linear layer $W f(x) + b$ on labels. Measures how linearly usable the features are.' },
    { id: 'knn', front: 'How does k-NN evaluation of features work?', back: 'Embed + L2-normalize labeled images; for a test image take the k most cosine-similar ones and let them vote (DINO: weighted vote, k = 20). No training.' },
    { id: 'families', front: 'The three families of modern visual SSL and one example each', back: 'Contrastive (SimCLR/MoCo), self-distillation (BYOL/DINO), masked image modeling (MAE/iBOT).' },
    { id: 'dinov2-recipe', front: 'DINOv2/DINOv3 combine which two SSL objectives?', back: 'DINO (image-level self-distillation) + iBOT (masked patch-level self-distillation) — plus curated data and scale.' },
    { id: 'linear-seg', front: 'How is a frozen backbone\'s *dense* feature quality evaluated?', back: 'Linear segmentation: a linear layer applied to each patch embedding predicts the class of that patch; measured in mIoU.' },
  ],
};
