export default {
  id: 'modern-segmenters',
  title: 'Mask R-CNN to Mask2Former',
  summary: 'How the field went from “detect a box, then paint inside it” to **set prediction with object queries** — the design behind today’s universal segmenters.',
  minutes: 35,
  goals: [
    'Explain the two-stage pipeline of [[mask-rcnn]] and why [[roi-align]] matters',
    'Describe detection as set prediction with [[object-query|object queries]] and [[hungarian-matching]]',
    'Explain how [[mask2former]] turns a query into a mask with a [[dot-product]], and what [[masked-attention]] adds',
    'Judge which design suits thin, repeated watch parts',
  ],
  blocks: [
    {
      id: 'recap', type: 'text', title: 'Three questions a segmenter can answer',
      md: `
Look at a watch photo and ask:

1. **Which [pixels](wiki:Pixel|Pixel) are "hand"?** — [[semantic-segmentation]]: one class per pixel, no notion of *which* hand.
2. **Which pixels belong to *each* hand, separately?** — [[instance-segmentation]]: every object gets its own mask and label.
3. **Both at once, for everything** — [[panoptic-segmentation]]: countable *things* (hands, indices, crown) get instances, uncountable *stuff* (dial surface, background) gets semantic labels.

A per-pixel classifier like a [[u-net]] answers question 1 well but struggles with 2: twelve hour indices of identical look are just "index pixels" — which pixels form index 3 versus index 4 is not something per-pixel labels express. This lesson follows the two big answers to that problem.`,
    },
    {
      id: 'maskrcnn', type: 'text', title: 'Detect first, then segment: Mask R-CNN',
      md: `
[[mask-rcnn]] (2017) extends the [Faster R-CNN](wiki:Region Based Convolutional Neural Networks) [detector](wiki:Object detection)[^faster-rcnn] with a small mask branch.[^mask-rcnn] The pipeline:

1. A [[backbone]] (e.g. a [[resnet]] with a [[feature-pyramid]]) computes feature maps.
2. A *region proposal network* slides over the features and proposes ~1000 candidate boxes ("something might be here").
3. For each proposal, **[[roi-align]]** crops a fixed-size feature patch (e.g. 14×14).
4. Heads predict the **class**, a **refined box**, and a **28×28 binary mask** for each class.
5. Non-maximum suppression (NMS) removes duplicate detections of the same object.

Two design choices made it work. First, the mask is predicted *per class* with a per-pixel [sigmoid](wiki:Sigmoid function|Sigmoidfunktion), so classes don't compete inside the mask — the classifier alone decides *what* it is. Second, RoIAlign: the older RoIPool **rounded** box coordinates to the feature grid; at a stride of 16 px that's up to 16 px of misalignment, fatal for crisp masks. RoIAlign samples at the exact (fractional) positions with [bilinear interpolation](wiki:Bilinear interpolation).`,
    },
    {
      id: 'fig-maskrcnn', type: 'figure', title: 'Mask R-CNN at a glance',
      html: `<svg viewBox="0 0 680 190" width="680" font-family="Inter" font-size="12">
        <defs><marker id="mrA" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#74748c"/></marker></defs>
        <rect x="8" y="60" width="78" height="70" rx="10" fill="#e9ecf5" stroke="#c9cde0"/><text x="47" y="99" text-anchor="middle">image</text>
        <rect x="112" y="50" width="104" height="90" rx="10" fill="color-mix(in oklab, var(--accent) 14%, white)" stroke="var(--accent)"/><text x="164" y="90" text-anchor="middle" font-weight="600">backbone</text><text x="164" y="108" text-anchor="middle" fill="#74748c">+ FPN</text>
        <rect x="244" y="18" width="110" height="54" rx="10" fill="#fff" stroke="#c9cde0"/><text x="299" y="42" text-anchor="middle" font-weight="600">region proposals</text><text x="299" y="59" text-anchor="middle" fill="#74748c">~1000 boxes</text>
        <rect x="244" y="112" width="110" height="54" rx="10" fill="#fff" stroke="#c9cde0"/><text x="299" y="136" text-anchor="middle" font-weight="600">RoIAlign</text><text x="299" y="153" text-anchor="middle" fill="#74748c">14×14 crop / box</text>
        <rect x="390" y="18" width="130" height="44" rx="10" fill="#fff" stroke="#c9cde0"/><text x="455" y="45" text-anchor="middle">class + box refine</text>
        <rect x="390" y="120" width="130" height="44" rx="10" fill="color-mix(in oklab, var(--accent-2) 14%, white)" stroke="var(--accent-2)"/><text x="455" y="147" text-anchor="middle" font-weight="600">28×28 mask</text>
        <rect x="560" y="68" width="110" height="54" rx="10" fill="#fff" stroke="#c9cde0"/><text x="615" y="92" text-anchor="middle" font-weight="600">NMS</text><text x="615" y="109" text-anchor="middle" fill="#74748c">drop duplicates</text>
        <path d="M86 95 H110" stroke="#74748c" marker-end="url(#mrA)"/><path d="M216 80 L242 50" stroke="#74748c" marker-end="url(#mrA)"/><path d="M299 72 V110" stroke="#74748c" marker-end="url(#mrA)"/><path d="M216 110 L242 135" stroke="#74748c" stroke-dasharray="3 3"/>
        <path d="M354 130 L388 45" stroke="#74748c" marker-end="url(#mrA)"/><path d="M354 142 H388" stroke="#74748c" marker-end="url(#mrA)"/><path d="M520 40 L558 85" stroke="#74748c" marker-end="url(#mrA)"/><path d="M520 142 L558 105" stroke="#74748c" marker-end="url(#mrA)"/>
      </svg>`,
      caption: 'Two stages: propose boxes, then classify, refine and segment each box independently.',
    },
    {
      id: 'order-maskrcnn', type: 'order', title: 'Rebuild the pipeline',
      prompt: 'Put the steps of Mask R-CNN inference in the right order.',
      items: [
        'Backbone + feature pyramid compute multi-scale feature maps',
        'Region proposal network suggests candidate boxes',
        'RoIAlign crops a fixed-size feature patch for each box',
        'Heads predict class, refined box and a 28×28 mask per box',
        'Non-maximum suppression removes duplicate detections',
        'Each 28×28 mask is resized to its box and thresholded',
      ],
      explain: 'Note the hand-engineered pieces: proposals, NMS, fixed mask resolution. The next generation of models removes most of them.',
    },
    {
      id: 'calc-res', type: 'numeric', title: 'How coarse is a 28×28 mask?',
      question: 'A minute hand has a bounding box of **280 × 20 px** in the image. Mask R-CNN predicts a 28 × 28 mask for that box. How many image pixels does one mask cell span **along the length** of the hand?',
      answer: 10, tolerance: 0.01, unit: 'px',
      hint: 'The 28 cells are stretched over the 280 px of the box.',
      explain: '$280 / 28 = 10$ px per cell along the hand. Across the hand it is $20/28 \\approx 0.7$ px — so thin *vertical* boxes are fine, but a long diagonal hand (whose box is large and mostly empty) gets a blurry, blocky mask. Box-based masks struggle exactly with thin diagonal structures like watch hands.',
    },
    {
      id: 'set-prediction', type: 'text', title: 'A different idea: predict a *set* of objects',
      md: `
[[detr]] (2020)[^detr] asked: why propose thousands of boxes and then delete duplicates? Instead:

- Start with $N$ learned vectors, the **[[object-query|object queries]]** (e.g. $N = 100$).
- A [[transformer]] decoder lets every query [[attention|attend]] to the image features and to the other queries.
- Each query outputs **one** prediction: a class — or the special class **∅ "no object"** — plus a box.

For training, the $N$ predictions have to be compared to, say, 3 ground-truth objects. Which prediction should be responsible for which object? **[[hungarian-matching]]** answers this: build a cost matrix (class probability + box mismatch), and pick the one-to-one assignment with the lowest total cost:

$$\\hat\\sigma = \\arg\\min_{\\sigma} \\sum_{i=1}^{3} \\mathcal{C}\\big(y_i, \\hat y_{\\sigma(i)}\\big)$$

Matched queries learn "predict this object"; *every other query learns to predict ∅*. Because a duplicate prediction is never matched, it gets pushed toward ∅ — the model learns to not produce duplicates, and **NMS disappears**.`,
    },
    {
      id: 'video-detr', type: 'video', youtube: 'T35ba_VXkMY', label: 'DETR: End-to-End Object Detection with Transformers', channel: 'Yannic Kilcher',
      why: 'A paper walk-through. The parts on object queries and the bipartite matching loss are the ones to focus on; skip the benchmarks if you like.',
    },
    {
      id: 'viz-match', type: 'viz', viz: 'query-matching', title: 'Be the Hungarian algorithm',
      intro: 'Three ground-truth objects (solid boxes), five object queries (dashed). Click cells in the cost matrix to assign each ground truth to one query.',
      task: 'Find the matching with the **minimum** total cost. Then press “New scene” and try once more — notice how the leftover queries become ∅ and a near-duplicate never gets rewarded.',
    },
    {
      id: 'maskformer', type: 'text', title: 'From boxes to masks: one dot product per pixel',
      md: `
MaskFormer (2021)[^maskformer] applied set prediction to segmentation: each query predicts a class and a **mask embedding** $\\mathbf{q}_i \\in \\mathbb{R}^{256}$. Meanwhile a *pixel decoder* upsamples the backbone features so that every pixel $(x, y)$ has its own embedding $\\mathbf{e}(x,y) \\in \\mathbb{R}^{256}$. The mask is simply

$$m_i(x, y) = \\sigma\\big(\\mathbf{q}_i \\cdot \\mathbf{e}(x,y)\\big)$$

— the [[dot-product]] from lesson one, followed by a sigmoid. "Is this pixel part of object $i$?" becomes "does this pixel's vector point the same way as the query's vector?"

The same model does semantic segmentation (merge all masks of the same class) and instance segmentation (keep masks separate). The task is decided by how you *read out* the set, not by the architecture.`,
    },
    {
      id: 'mask2former', type: 'text', title: 'Mask2Former: masked attention',
      md: `
[[mask2former]] (2022)[^mask2former] made this approach state of the art on all three tasks at once — 57.8 PQ on COCO panoptic, 50.1 AP on COCO instance, 57.7 mIoU on ADE20K semantic — with three changes:

- **[[masked-attention]]**: in each decoder layer, a query's cross-attention is limited to the pixels inside *its own mask from the previous layer*:
$$\\mathrm{softmax}(\\mathcal{M} + QK^\\top)\\,V, \\qquad \\mathcal{M}(x,y) = \\begin{cases} 0 & \\text{inside the mask} \\\\ -\\infty & \\text{outside} \\end{cases}$$
Adding $-\\infty$ before the [[softmax]] gives those pixels exactly zero weight. Each query stops getting distracted by the rest of the image and refines *its* object.
- **Multi-scale features** fed to successive decoder layers in turn (coarse → fine), which helps small objects.
- Training efficiencies (e.g. computing the mask loss on sampled points instead of every pixel).

Today, the common strong recipe is a large pretrained ViT [[backbone]] — increasingly DINOv2/DINOv3 features — with a Mask2Former-style query head on top.`,
    },
    {
      id: 'quiz-nms', type: 'quiz', title: 'Why no NMS?',
      question: 'Why can DETR-style models (DETR, Mask2Former) skip non-maximum suppression?',
      options: [
        { text: 'Hungarian matching assigns each ground-truth object to exactly one query during training, so duplicates are trained toward “no object”.', correct: true, why: 'The one-to-one loss makes duplicate predictions costly — the model learns to suppress them itself.' },
        { text: 'Transformers are too slow to produce duplicate boxes.', correct: false, why: 'Speed has nothing to do with it.' },
        { text: 'They only ever predict one object per image.', correct: false, why: 'They predict up to $N$ objects (e.g. 100); most queries simply output ∅.' },
        { text: 'Masked attention removes overlapping masks after prediction.', correct: false, why: 'Masked attention restricts where a query looks while refining; it is not a post-processing step.' },
      ],
    },
    {
      id: 'mission-choice', type: 'callout', tone: 'mission', title: 'What this means for watch parts',
      md: `
Your classes mix *stuff-like* regions (dial, strap, case) with *thing-like*, repeated, thin parts (12 indices, 3 hands, pushers, bracelet links). That is a **panoptic** problem — and exactly what query-based heads were built for.

- **Box-first models** ([[mask-rcnn]]) waste resolution on diagonal hands: a 28×28 mask over a mostly empty box.
- **Query-based models** ([[mask2former]]) predict masks at pixel-decoder resolution (typically 1/4 of the input), so a 1024 px image gives 256×256 masks — better, but a 3 px seconds hand is still under one mask cell wide. Input resolution will matter for you; keep that in mind for the compute lesson.
- Repeated indices are easy for queries: 12 queries each claim one index.

A good first baseline for your data: a pretrained backbone + Mask2Former head, trained on your synthetic renders (perfect masks for free), evaluated on a small **real** hand-labeled set.`,
    },
    {
      id: 'deep-pq', type: 'callout', tone: 'deep', title: 'How panoptic quality is computed',
      md: `
A predicted segment and a ground-truth segment *match* when their [[iou]] is above 0.5 — at that threshold a match is guaranteed to be unique. Then

$$\\mathrm{PQ} = \\underbrace{\\frac{\\sum_{(p,g)\\in TP}\\mathrm{IoU}(p,g)}{|TP|}}_{\\text{segmentation quality}} \\times \\underbrace{\\frac{|TP|}{|TP| + \\frac12|FP| + \\frac12|FN|}}_{\\text{recognition quality (F1)}}$$

So PQ punishes both sloppy masks (low IoU of matches) and wrong counts (missed or hallucinated objects). For watches, report PQ **per class**: a model can be superb on dials and terrible on seconds hands, and the average hides it.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>English</th><th>Deutsch</th><th>Notation</th></tr>
<tr><td>set (prediction)</td><td>Menge (Mengenvorhersage)</td><td>$\\{\\hat y_1, \\dots, \\hat y_N\\}$</td></tr>
<tr><td>assignment problem</td><td>Zuordnungsproblem</td><td>$\\sigma \\in \\mathfrak{S}_N$ (Permutation)</td></tr>
<tr><td>bipartite matching</td><td>bipartites Matching, Paarung</td><td></td></tr>
<tr><td>cost matrix</td><td>Kostenmatrix</td><td>$\\mathcal{C}_{ij}$</td></tr>
<tr><td>sigmoid function</td><td>Sigmoidfunktion (logistische Funktion)</td><td>$\\sigma(z) = \\frac{1}{1+e^{-z}}$</td></tr>
<tr><td>intersection / union</td><td>Schnittmenge / Vereinigungsmenge</td><td>$A \\cap B$, $A \\cup B$</td></tr>
<tr><td>bilinear interpolation</td><td>bilineare Interpolation</td><td></td></tr></table>

Careful: $\\sigma$ is used for both the sigmoid function and the permutation in matching — context tells them apart.`,
    },
    {
      id: 'match-ideas', type: 'match', title: 'Who introduced what?',
      pairs: [
        ['Mask R-CNN', 'RoIAlign + a small mask head per box'],
        ['DETR', 'Object queries + Hungarian matching, no NMS'],
        ['MaskFormer', 'Mask = sigmoid(query · pixel embedding)'],
        ['Mask2Former', 'Cross-attention limited to the predicted mask'],
        ['Faster R-CNN', 'Region proposal network'],
      ],
    },
    {
      id: 'recall-matching', type: 'recall', title: 'Explain set prediction',
      prompt: 'Explain to a colleague how a query-based segmenter is trained when it outputs 100 predictions but the image contains only 3 objects. Why does this remove the need for NMS?',
      answer: `Each of the 100 [[object-query|queries]] outputs a class (including ∅ "no object") and a mask. For each training image, [[hungarian-matching]] finds the one-to-one assignment between the 3 ground-truth objects and 3 of the 100 predictions with the lowest total cost (class probability + mask/box overlap). Those 3 get the object's class and mask as targets; the other 97 are trained to predict ∅. A second prediction of an already-matched object is never rewarded — it is pushed to ∅ — so the network learns not to output duplicates, and no hand-crafted NMS is needed.`,
      hints: ['What target does an unmatched query receive?', 'What happens to a near-duplicate of a matched prediction during training?'],
      cards: ['hungarian', 'no-nms'],
    },
  ],
  cards: [
    { id: 'three-tasks', front: 'Semantic vs instance vs panoptic segmentation — one line each', back: 'Semantic: class per pixel. Instance: separate mask per countable object. Panoptic: both — instances for things, classes for stuff.' },
    { id: 'maskrcnn-pipeline', front: 'The two stages of Mask R-CNN', back: '1) Region proposal network proposes boxes. 2) Per box (via RoIAlign): class, box refinement, 28×28 mask. Then NMS.' },
    { id: 'roialign', front: 'What problem does RoIAlign fix?', back: 'RoIPool rounded box coordinates to the feature grid (misalignment up to a stride). RoIAlign samples exact fractional positions with bilinear interpolation → pixel-accurate masks.' },
    { id: 'object-query', front: 'What is an object query?', back: 'A learned vector that the transformer decoder turns into one prediction (class or ∅, plus box/mask).' },
    { id: 'hungarian', front: 'What does Hungarian matching do in DETR-style training?', back: 'Finds the minimum-cost one-to-one assignment between predictions and ground-truth objects; unmatched predictions are trained to output ∅.' },
    { id: 'no-nms', front: 'Why do DETR / Mask2Former not need NMS?', back: 'The one-to-one matching loss trains duplicate predictions toward "no object", so the model suppresses duplicates itself.' },
    { id: 'maskformer-mask', front: 'How does MaskFormer/Mask2Former compute mask $i$ at pixel $(x,y)$?', back: '$\\sigma(\\mathbf{q}_i \\cdot \\mathbf{e}(x,y))$ — sigmoid of the dot product between the query\'s mask embedding and the per-pixel embedding.' },
    { id: 'masked-attn', front: 'What is masked attention (Mask2Former)?', back: 'Cross-attention where logits outside the previous layer\'s predicted mask get $-\\infty$, so each query only attends to its own object region.' },
    { id: 'pq', front: 'Panoptic quality (PQ) = ? × ?', back: 'Segmentation quality (mean IoU of matched segments) × recognition quality (F1 of matches at IoU > 0.5).' },
  ],
};
