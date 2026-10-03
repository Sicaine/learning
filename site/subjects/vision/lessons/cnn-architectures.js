export default {
  id: 'cnn-architectures',
  title: 'Deep CNNs, receptive fields & ResNet',
  summary: 'One $3\\times3$ layer sees 9 pixels. How does a network end up recognizing a whole watch? By stacking layers, downsampling, and — since 2015 — adding [[skip-connection|skip connections]] so that very deep stacks still train.',
  minutes: 30,
  goals: [
    'Compute the [[receptive-field]] of a stack of conv and pooling layers',
    'Explain the depth ↔ resolution trade-off of a CNN [[backbone]]',
    'Explain what a residual block does and why it made 100+ layer networks trainable',
    'Describe a [[feature-pyramid]] and why dense prediction needs multiple scales',
  ],
  blocks: [
    {
      id: 'hierarchy', type: 'text', title: 'From edges to watches: a hierarchy of features',
      md: `
Stack convolutions and something remarkable happens. Layer 1 learns [edges](wiki:Edge detection|Kantendetektion) and color blobs. Layer 2 combines edges into corners, arcs and textures. Deeper layers respond to parts — a lug, a crown's [knurling](wiki:Knurling|Rändeln), a row of indices — and the deepest to whole objects.

Each layer only ever looks at a small window *of the previous layer*. But that previous layer already summarizes a window of the one before. So the region of the **original image** that can influence a unit — its **[[receptive-field]]** — grows with depth.`,
    },
    {
      id: 'rf-math', type: 'text', title: 'How fast does the receptive field grow?',
      md: `
Track two numbers layer by layer: the receptive field $r$ and the **jump** $j$ (how many input pixels one step on the current feature map corresponds to — the product of all strides so far). Start with $r_0 = 1$, $j_0 = 1$:

$$r_l = r_{l-1} + (k_l - 1)\\, j_{l-1}, \\qquad j_l = j_{l-1} \\cdot s_l$$

- A stack of $n$ plain $3 \\times 3$ layers (stride 1): $r = 2n + 1$. Painfully slow — 67 layers to cover 134 px.
- Every stride-2 layer (or $2\\times2$ pooling) **doubles the growth rate of everything after it**.

That's why every CNN [[backbone]] downsamples in stages: typical feature maps are at $\\tfrac14, \\tfrac18, \\tfrac1{16}, \\tfrac1{32}$ of the input resolution. Two $3 \\times 3$ layers also see as much as one $5 \\times 5$ (with $18C^2$ instead of $25C^2$ weights and an extra nonlinearity) — the insight behind [VGG](wiki:VGGNet).[^vgg]`,
    },
    {
      id: 'viz-rf', type: 'viz', viz: 'receptive-field', title: 'Grow a receptive field',
      params: { start: ['c3', 'c3'], maxLayers: 8 },
      intro: 'Add layers and watch the receptive field (blue square) of one output unit. The dashed circle is the dial: telling the hour hand from the minute hand requires seeing both *and* the center.',
      task: 'Reach the goal with **at most 8 layers**. Then look at the "output map" size — how many units are left to describe the whole image?',
    },
    {
      id: 'calc-rf', type: 'numeric', title: 'Receptive field by hand',
      question: 'A network applies: $3\\times3$ conv (stride 1) → $3\\times3$ conv (stride 1) → $2\\times2$ max pool (stride 2) → $3\\times3$ conv (stride 1). What is the receptive field (in input pixels) of one unit after the last layer?',
      answer: 10, tolerance: 0,
      hint: 'Go layer by layer: $r$ = 3, 5, then the pool adds $(2-1)\\cdot 1$ and sets $j = 2$, then the last conv adds $(3-1) \\cdot 2$.',
      explain: '$r$: 1 → 3 → 5 → 6 (pool, $j$ becomes 2) → $6 + 2 \\cdot 2 = 10$. After the pool, every $3\\times3$ layer adds 4 pixels instead of 2.',
    },
    {
      id: 'tradeoff', type: 'callout', tone: 'insight', title: 'The central tension of dense prediction',
      md: `
**Big receptive fields need downsampling. Downsampling destroys detail.** A classifier doesn't care — it only needs "this is a watch". A segmenter must answer "is *this pixel* part of the minute hand?", which needs both context (which hand is longer, where is the center) *and* pixel-precise boundaries. Every segmentation architecture in the rest of this path is a different answer to this tension.`,
    },
    {
      id: 'resnet', type: 'text', title: 'The depth problem and the residual fix',
      md: `
Around 2015 people noticed something odd: a 56-layer plain [CNN](wiki:Convolutional neural network|Convolutional Neural Network) had *higher training error* than a 20-layer one. Not overfitting — the deeper net was simply harder to optimize. [Gradients](wiki:Vanishing gradient problem) had to pass through dozens of layers, each distorting them.

**[[resnet|ResNet]]**'s answer is almost embarrassingly simple.[^resnet] Instead of asking a block to compute a new representation $H(x)$, let it compute a *correction* and add the input back:

$$y = F(x) + x$$

The $+x$ is a **[[skip-connection]]**. If a block has nothing useful to add, it can learn $F(x) \\approx 0$ and pass its input through unchanged (an [identity](wiki:Identity function|Identische Abbildung) map) — so adding depth can no longer hurt. And the gradient has a direct highway: $\\frac{\\partial y}{\\partial x} = \\frac{\\partial F}{\\partial x} + I$.

ResNet-50 (≈25M parameters) became *the* default vision [[backbone]]. And the same $x + F(x)$ pattern sits inside every [[transformer]] block you will meet in the next stage.`,
    },
    {
      id: 'order-resnet', type: 'order', title: 'Assemble a ResNet-50',
      prompt: 'Put the parts of a ResNet-50 forward pass in order (input at the top).',
      items: [
        '$7\\times7$ conv, stride 2 → 112×112',
        '$3\\times3$ max pool, stride 2 → 56×56',
        'Stage 1: 3 residual blocks at 56×56 (¼ resolution)',
        'Stage 2: 4 residual blocks at 28×28 (⅛)',
        'Stage 3: 6 residual blocks at 14×14 (1/16)',
        'Stage 4: 3 residual blocks at 7×7 (1/32)',
        'Global average pooling → one 2048-d vector',
        'Linear classifier → 1000 class scores',
      ],
      explain: 'Resolution halves at every stage while channels grow (256 → 512 → 1024 → 2048). For segmentation you drop the last two steps and keep the stage outputs — a ready-made pyramid.',
    },
    {
      id: 'pyramid', type: 'text', title: 'Feature pyramids: keep every scale',
      md: `
The stage outputs of a CNN form a natural **[[feature-pyramid]]**: fine but "dumb" features at ¼ resolution, coarse but semantic features at 1/32. A Feature Pyramid Network (FPN)[^fpn] adds a top-down path that upsamples the semantic features and merges them into the finer maps, giving *semantic features at every scale*. Small objects are then handled at high resolution, large ones at low resolution.

Modern CNNs like ConvNeXt[^convnext] keep this structure with Transformer-inspired design choices — and DINOv3 distills its features into ConvNeXt students as well. Plain [[vit|ViTs]], in contrast, have a *single* scale (one token per patch through all layers), so segmentation heads on top of DINO backbones usually rebuild a pyramid from them.`,
    },
    {
      id: 'match-arch', type: 'match', title: 'Match the building block to its job',
      pairs: [
        ['Max pooling', 'Cheap downsampling, keeps the strongest response'],
        ['Residual connection', 'Learn a correction $F(x)$; gradients flow through $+x$'],
        ['Global average pooling', 'Collapse a feature map into one image vector'],
        ['Stride-2 conv', 'Downsample while learning features'],
        ['Top-down pathway (FPN)', 'Bring semantics back into high-resolution maps'],
        ['Backbone', 'Pretrained feature extractor shared by many tasks'],
      ],
    },
    {
      id: 'mission', type: 'callout', tone: 'mission', title: 'Hour hand vs minute hand is a receptive-field question',
      md: `
Locally, an hour hand and a minute hand look identical: a dark bar with parallel edges. What distinguishes them is **global**: length relative to the dial, width relative to each other, which one reaches the minute track. A unit that sees only 40 px of a 224 px image *cannot* know which hand it is on.

Diagnostic for later: if your model segments "hand" well but confuses **which** hand, its effective context is too small (or your labels are inconsistent). If it knows which hand but the masks are blobby, it's a **resolution** problem. Two different failures, two different fixes.`,
    },
    {
      id: 'quiz', type: 'quiz', title: 'Check yourself',
      question: 'Which statements are correct?',
      options: [
        { text: 'The receptive field of $n$ stacked $3\\times3$ stride-1 convs is $2n+1$.', correct: true, why: 'Each layer adds $(3-1)\\cdot 1 = 2$.' },
        { text: 'Downsampling early makes all later layers grow the receptive field faster.', correct: true, why: 'The jump $j$ multiplies the growth of every later layer.' },
        { text: 'Deeper plain CNNs failed mainly because of overfitting.', correct: false, why: 'They had *higher training error* — an [optimization problem](wiki:Optimization problem|Optimierungsproblem), which residual connections solved.' },
        { text: 'A residual block can easily represent the identity function.', correct: true, why: 'Set $F(x) = 0$ and $y = x$.' },
        { text: 'The theoretical receptive field tells you exactly which pixels matter.', correct: false, why: 'The *effective* receptive field is much smaller and concentrated in the center.' },
      ],
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>English</th><th>Deutsch</th></tr>
<tr><td>receptive field</td><td>rezeptives Feld</td></tr>
<tr><td>pooling / downsampling</td><td>Pooling / Unterabtastung (Downsampling)</td></tr>
<tr><td>upsampling</td><td>Hochskalierung (Upsampling)</td></tr>
<tr><td>residual connection</td><td>Residualverbindung</td></tr>
<tr><td>identity function / matrix</td><td>Identität, Einheitsmatrix $I$</td></tr>
<tr><td>recurrence (the $r_l$ formula)</td><td>Rekursionsformel</td></tr>
<tr><td>feature pyramid</td><td>Merkmalspyramide</td></tr></table>`,
    },
    {
      id: 'recall', type: 'recall', title: 'Explain it',
      prompt: 'Explain in your own words **why residual connections** made very deep networks trainable. Use the formula.',
      answer: `A residual block outputs $y = F(x) + x$: the layers only learn a *correction* to their input. (1) If extra depth is not useful, the block can learn $F \\approx 0$ and pass $x$ through, so a deeper network is never worse than a shallower one in principle. (2) During backpropagation $\\frac{\\partial y}{\\partial x} = \\frac{\\partial F}{\\partial x} + I$, so there is always a direct path for the gradient; it doesn't have to survive a long chain of multiplications through every layer. Plain deep networks suffered from exactly that optimization difficulty (higher *training* error), not from overfitting.`,
      hints: ['What does the block output if $F(x) = 0$?', 'Differentiate $F(x) + x$ with respect to $x$.'],
      cards: ['resnet-why'],
    },
  ],
  cards: [
    { id: 'rf-def', front: 'What is the receptive field of a unit?', back: 'The region of the input image that can influence that unit\'s value.' },
    { id: 'rf-formula', front: 'Recurrence for the receptive field $r_l$ and jump $j_l$', back: '$r_l = r_{l-1} + (k_l - 1) j_{l-1}$, $\\, j_l = j_{l-1} s_l$, starting at $r_0 = j_0 = 1$.' },
    { id: 'rf-stack', front: 'Receptive field of $n$ stacked $3\\times3$ convs with stride 1?', back: '$2n + 1$ pixels.' },
    { id: 'tension', front: 'The central tension of segmentation architectures', back: 'Large receptive fields (context, semantics) need downsampling, but downsampling destroys the fine detail needed for precise boundaries.' },
    { id: 'resnet-block', front: 'Formula of a residual block', back: '$y = F(x) + x$ — the layers learn a correction; the skip adds the input back.' },
    { id: 'resnet-why', front: 'Why did residual connections enable 100+ layer networks?', back: 'Identity is easy ($F=0$), so depth can\'t hurt; and gradients get a direct path ($\\partial y/\\partial x = \\partial F/\\partial x + I$). The problem was optimization, not overfitting.' },
    { id: 'pyramid', front: 'What is a feature pyramid and why does segmentation want one?', back: 'Features at several resolutions (¼ … 1/32). Small objects need fine maps, large objects and context need coarse semantic maps; FPN merges semantics into all scales.' },
    { id: 'which-hand', front: 'Model finds "hand" pixels but mixes up hour vs minute hand. Likely cause?', back: 'Too little context (effective receptive field) — locally the hands look identical — or inconsistent labels.' },
  ],
};
