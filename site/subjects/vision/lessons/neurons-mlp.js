export default {
  id: 'neurons-mlp',
  title: 'Neurons, layers & activations',
  summary: 'A [[neuron]] is a [[dot-product]] with a bend. Stack thousands of them in layers and you get an [[mlp]] — the building block that still sits inside every Vision Transformer.',
  minutes: 25,
  goals: [
    'Compute a [[neuron]]\'s output by hand',
    'Explain why an [[activation-function]] is essential — and why [[relu]] and [[gelu]] won',
    'Count the parameters of an [[mlp]], including the one inside a ViT block',
    'See how a tiny head on top of pretrained features can already segment',
  ],
  blocks: [
    {
      id: 'neuron', type: 'text', title: 'One neuron',
      md: `
A **[[neuron]]** takes a vector $\\mathbf{x}$, computes a weighted sum, adds a bias and applies a [nonlinearity](wiki:Nonlinear system|Nichtlineares System) $\\sigma$:

$$y = \\sigma(\\mathbf{w} \\cdot \\mathbf{x} + b)$$

Read it with what you know: $\\mathbf{w}\\cdot\\mathbf{x}$ measures how well the input matches the neuron's pattern $\\mathbf{w}$; the bias $b$ shifts the threshold; $\\sigma$ decides how to respond. A **layer** is many neurons reading the same input — mathematically $\\sigma(W\\mathbf{x} + \\mathbf{b})$ with $\\sigma$ applied entry by entry.`,
    },
    {
      id: 'video-nn', type: 'video', youtube: 'aircAruvnKk', label: 'But what is a neural network?', channel: '3Blue1Brown', minutes: 18,
      why: 'The classic visual introduction: layers, weights, biases, activations — on [handwritten digits](wiki:MNIST database|MNIST-Datenbank).[^3b1b-nn]',
    },
    {
      id: 'calc-neuron', type: 'numeric', title: 'Fire a neuron',
      question: 'A ReLU neuron has $\\mathbf{w} = (0.5, -1, 2)$ and $b = -0.5$. What is its output for $\\mathbf{x} = (2, 1, 0.5)$?',
      answer: 0.5, tolerance: 0.001,
      hint: 'Dot product first: $0.5\\cdot2 + (-1)\\cdot1 + 2\\cdot0.5$. Add the bias, then $\\max(0, \\cdot)$.',
      explain: '$1 - 1 + 1 - 0.5 = 0.5$, and $\\mathrm{ReLU}(0.5) = 0.5$. With $b = -2$ the neuron would output 0 — it would be "silent" for this input.',
    },
    {
      id: 'why-nonlinear', type: 'text', title: 'Why the bend is everything',
      md: `
Suppose we drop $\\sigma$ and stack two layers:

$$W_2(W_1\\mathbf{x} + \\mathbf{b}_1) + \\mathbf{b}_2 = \\underbrace{(W_2 W_1)}_{W}\\mathbf{x} + \\underbrace{(W_2\\mathbf{b}_1 + \\mathbf{b}_2)}_{\\mathbf{b}}$$

Just one affine layer again! A hundred linear layers are no more expressive than one — they can only rotate, stretch and shear space ([[linear-map|linear maps]]), never *fold* it. Separating "watch hand" pixels from "index" pixels needs curved decision boundaries.

An **[[activation-function]]** between the layers breaks this. The modern choices are simple:

- **[[relu]]** $\\max(0, x)$ — gradient exactly 1 where active, so signals and gradients pass through deep stacks. The default in CNNs; paired with a matching weight initialization it made very deep networks trainable.[^he-init]
- **[[gelu]]** $x\\,\\Phi(x)$ — a smooth ReLU; used in every Transformer, including ViT and DINOv2/v3.[^gelu]
- sigmoid and tanh — historically popular, but they **saturate**: for large $|x|$ their slope is ~0, and after many layers gradients vanish.`,
    },
    {
      id: 'viz-act', type: 'viz', viz: 'activation-plot', title: 'Activation functions and their slopes',
      params: { mode: 'functions' },
      caption: 'Solid: the function. Dashed: its derivative — what the gradient gets multiplied by when it flows backwards through this unit.',
    },
    {
      id: 'viz-build', type: 'viz', viz: 'activation-plot', title: 'Build any curve from hinges',
      params: { mode: 'build' },
      task: 'Increase the number of ReLU units until the approximation error drops below 0.005. Each unit adds one kink — this is the *universal approximation* idea in action.',
    },
    {
      id: 'mlp', type: 'text', title: 'The MLP',
      md: `
Stack layers with activations in between and you have a **multi-layer perceptron ([[mlp]])**:

$$\\mathbf{h} = \\sigma(W_1\\mathbf{x} + \\mathbf{b}_1), \\qquad \\mathbf{y} = W_2\\mathbf{h} + \\mathbf{b}_2$$

The middle vector $\\mathbf{h}$ is the **hidden layer**. With enough hidden units, even one hidden layer can [approximate any continuous function](wiki:Universal approximation theorem) — but deep, narrow stacks usually learn far more efficiently than one enormous layer.

**MLPs are alive and well.** Every Transformer block is "attention + MLP". In ViT-B the MLP expands each 768-dim token to 3072 dims, applies GELU, and projects back to 768.[^vit] Attention mixes information *between* tokens; the MLP processes each token *individually*.`,
    },
    {
      id: 'calc-mlp', type: 'numeric', title: 'Parameters of a classic MLP',
      question: 'An MLP classifies 28×28 grayscale [digits](wiki:MNIST database|MNIST-Datenbank): 784 inputs → 128 hidden (ReLU) → 10 outputs, with biases. How many parameters?',
      answer: 101770, tolerance: 0,
      hint: '$784\\cdot128 + 128$ for the first layer, $128\\cdot10 + 10$ for the second.',
      explain: '$100{,}352 + 128 + 1{,}280 + 10 = 101{,}770$. Now compare with the next question.',
    },
    {
      id: 'calc-vit-mlp', type: 'numeric', title: 'The MLP inside one ViT-B block',
      question: 'The MLP in a ViT-B block maps $768 \\to 3072 \\to 768$ with biases. How many parameters? (ViT-B has 12 such blocks and ~86M parameters in total.)',
      answer: 4722432, tolerance: 0,
      hint: 'Two linear layers: $768\\cdot3072 + 3072$ and $3072\\cdot768 + 768$.',
      explain: '$2{,}362{,}368 + 2{,}360{,}064 = 4{,}722{,}432$. Times 12 blocks ≈ 57M — about two thirds of ViT-B. The rest is mostly attention projections (4 × 768² per block).',
    },
    {
      id: 'match-act', type: 'match', title: 'Which activation?',
      pairs: [
        ['ReLU', 'zero for negatives, identity for positives'],
        ['GELU', 'smooth ReLU used in ViT / DINO'],
        ['sigmoid', 'squashes to (0, 1); max slope 0.25'],
        ['tanh', 'squashes to (−1, 1); saturates'],
        ['no activation', 'the whole stack collapses to one linear map'],
      ],
    },
    {
      id: 'quiz-mlp', type: 'quiz', title: 'Check yourself',
      question: 'Select every correct statement.',
      options: [
        { text: 'Two linear layers without activation equal one linear (affine) layer.', correct: true, why: '$W_2(W_1\\mathbf{x}+\\mathbf{b}_1)+\\mathbf{b}_2$ is again affine.' },
        { text: 'Sigmoid is preferred in deep networks because its gradient never vanishes.', correct: false, why: 'The opposite: sigmoid saturates, and its slope is at most 0.25, so gradients shrink layer after layer.' },
        { text: 'In a Transformer block, the MLP is applied to each token independently.', correct: true, why: 'Same weights for every token; mixing between tokens is attention\'s job.' },
        { text: 'A layer of 3072 neurons reading a 768-vector is one matrix multiplication plus an element-wise activation.', correct: true, why: '$\\sigma(W\\mathbf{x}+\\mathbf{b})$ with $W \\in \\mathbb{R}^{3072\\times768}$.' },
      ],
    },
    {
      id: 'mission-head', type: 'callout', tone: 'mission', title: 'A tiny head on a big backbone',
      md: `
Here is a surprisingly strong baseline for your watch segmentation, which you'll understand fully by the DINO stage: take a **frozen** DINOv2/v3 backbone, get its 768-dim feature for every 14×14 patch, and train only a tiny head — a single linear layer or a 2-layer MLP — mapping each patch vector to your $C$ part classes. Upsample the patch predictions to pixel resolution.

That head has only $768 \\cdot C + C$ parameters for the linear version (≈ 6k for 8 classes). It trains in minutes on one [4090](wiki:GeForce 40 series|Nvidia-GeForce-40-Serie) and tells you how much "watch-part knowledge" is already inside the features. If this baseline is bad on real photos, a bigger decoder will not magically fix it; if it is decent, you have a solid foundation to build on.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>English</th><th>Deutsch</th></tr>
<tr><td>neuron / unit</td><td>Neuron / Einheit</td></tr>
<tr><td>weight / bias</td><td>Gewicht / Bias (Schwellwert, Verschiebung)</td></tr>
<tr><td>activation function</td><td>Aktivierungsfunktion</td></tr>
<tr><td>hidden layer</td><td>verdeckte Schicht (Zwischenschicht)</td></tr>
<tr><td>fully connected layer</td><td>vollständig verbundene Schicht</td></tr>
<tr><td>multi-layer perceptron</td><td>mehrschichtiges Perzeptron</td></tr>
<tr><td>to saturate / vanishing gradient</td><td>sättigen / verschwindender Gradient</td></tr>
<tr><td>universal approximation theorem</td><td>universeller Approximationssatz</td></tr>
<tr><td>piecewise linear</td><td>stückweise linear</td></tr></table>`,
    },
    {
      id: 'recall-nonlin', type: 'recall', title: 'Explain it to a colleague',
      prompt: 'Why can\'t a deep network work without activation functions? And why did ReLU/GELU replace sigmoid in deep networks?',
      answer: `Without activations every layer is [affine](wiki:Affine transformation|Affinität (Mathematik)), and a composition of affine maps is a single affine map: $W_2(W_1\\mathbf{x}+\\mathbf{b}_1)+\\mathbf{b}_2 = W\\mathbf{x}+\\mathbf{b}$. Depth would add nothing; [decision boundaries](wiki:Decision boundary) stay flat. Activations fold space so the network can represent curved boundaries and complex functions. [Sigmoid](wiki:Sigmoid function|Sigmoidfunktion) saturates (slope ≈ 0 for large |x|, max 0.25), so gradients shrink multiplicatively through many layers ([vanishing gradients](wiki:Vanishing gradient problem)). ReLU has slope exactly 1 where active, so gradients survive deep stacks; GELU is a smooth variant that works well in Transformers.`,
      hints: ['Multiply out two affine layers.', 'What does the chain rule do with many factors < 1?'],
      cards: ['no-act', 'vanish'],
    },
  ],
  cards: [
    { id: 'neuron', front: 'Formula of a single neuron', back: '$y = \\sigma(\\mathbf{w}\\cdot\\mathbf{x} + b)$ — dot product, bias, activation.' },
    { id: 'no-act', front: 'What happens if you remove all activation functions from a deep network?', back: 'It collapses to one affine map; depth adds no expressive power.' },
    { id: 'relu', front: 'ReLU formula and why it helps deep networks', back: '$\\max(0,x)$; slope 1 where active, so gradients don\'t shrink through many layers.' },
    { id: 'gelu', front: 'Which activation do ViT and DINO use?', back: 'GELU, $x\\,\\Phi(x)$ — a smooth ReLU.' },
    { id: 'vanish', front: 'Why do sigmoid networks suffer from vanishing gradients?', back: 'Sigmoid saturates (slope ≤ 0.25, ≈0 for large |x|); the chain rule multiplies many small factors.' },
    { id: 'mlp-vit', front: 'Shape of the MLP inside a ViT-B block', back: '$768 \\to 3072 \\to 768$ with GELU (hidden = 4× width), applied to each token independently.' },
    { id: 'attn-vs-mlp', front: 'In a Transformer block, what does attention do vs the MLP?', back: 'Attention mixes information between tokens; the MLP transforms each token individually.' },
    { id: 'ua', front: 'Universal approximation, in one sentence', back: 'An MLP with one hidden layer and enough units can approximate any continuous function (on a bounded domain) arbitrarily well.' },
    { id: 'linear-head', front: 'Parameters of a linear segmentation head on 768-dim patch features for $C$ classes', back: '$768C + C$ — e.g. 6,152 for 8 classes.' },
  ],
};
