export default {
  id: 'derivatives-gradients',
  title: 'Derivatives, gradients & the chain rule',
  summary: 'A ViT-B has 86 million numbers to tune. The [[gradient]] tells you, for all of them at once, which way to turn each knob to reduce the error — and the [[chain-rule]] makes computing it feasible.',
  minutes: 30,
  goals: [
    'Explain a [[derivative]] as a local slope and compute simple ones',
    'Build a [[gradient]] from [[partial-derivative|partial derivatives]] and say what direction it points',
    'Run [[gradient-descent]] and see how the [[learning-rate]] makes or breaks it',
    'Apply the [[chain-rule]] to a tiny model — the core of [[backpropagation]]',
  ],
  blocks: [
    {
      id: 'knobs', type: 'text', title: 'The problem: millions of knobs',
      md: `
Training means: find weights $\\theta$ that make the [[loss-function|loss]] $\\mathcal{L}(\\theta)$ small. You can't try all combinations — with 86 million weights the space is unimaginably large. What you *can* do is ask, at the current weights: **if I nudge each weight a tiny bit, how does the loss change?** That question is answered by derivatives.

The **[[derivative]]** of a function of one variable is its local [slope](wiki:Slope|Steigung):

$$f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$$

If $f'(x) = 3$, then increasing $x$ by a small $\\varepsilon$ increases $f$ by about $3\\varepsilon$. Positive slope → go left to decrease $f$. Negative slope → go right.

Rules you will actually use: $(x^n)' = n x^{n-1}$, $(e^x)' = e^x$, $(\\ln x)' = 1/x$, and derivatives of sums are sums of derivatives.`,
    },
    {
      id: 'partials', type: 'text', title: 'Many inputs: partial derivatives and the gradient',
      md: `
For $f(x, y)$, the **[[partial-derivative]]** $\\frac{\\partial f}{\\partial x}$ is the slope in the $x$ direction while $y$ is frozen. Example:

$$f(x, y) = x^2 + 3xy \\quad\\Rightarrow\\quad \\frac{\\partial f}{\\partial x} = 2x + 3y, \\qquad \\frac{\\partial f}{\\partial y} = 3x$$

Stack all partials into a vector and you get the **[[gradient]]**:

$$\\nabla f = \\left( \\frac{\\partial f}{\\partial x}, \\frac{\\partial f}{\\partial y} \\right)$$

Two facts make it the most useful object in deep learning:

- $\\nabla f$ points in the direction of **steepest ascent**; $-\\nabla f$ is steepest descent.
- For a small step $\\boldsymbol{\\delta}$: $f(\\mathbf{x} + \\boldsymbol{\\delta}) \\approx f(\\mathbf{x}) + \\nabla f \\cdot \\boldsymbol{\\delta}$ — a [[dot-product]] again! The change is largest when $\\boldsymbol{\\delta}$ is aligned with the gradient.`,
    },
    {
      id: 'calc-px', type: 'numeric', title: 'Partial derivative',
      question: 'For $f(x,y) = x^2 + 3xy$, compute $\\frac{\\partial f}{\\partial x}$ at the point $(1, 2)$.',
      answer: 8, tolerance: 0,
      hint: '$\\frac{\\partial f}{\\partial x} = 2x + 3y$. Plug in.',
      explain: '$2 \\cdot 1 + 3 \\cdot 2 = 8$. Together with $\\partial f/\\partial y = 3x = 3$, the gradient at $(1,2)$ is $(8, 3)$: moving in $x$ changes $f$ much faster than moving in $y$.',
    },
    {
      id: 'video-gd', type: 'video', youtube: 'IHZwWFHWa-w', label: 'Gradient descent, how neural networks learn', channel: '3Blue1Brown', minutes: 21,
      why: 'How "the gradient of the cost function" turns into learning. Watch at least until ~12:00 ([3Blue1Brown](wiki:3Blue1Brown|3Blue1Brown)).[^3b1b-nn]',
    },
    {
      id: 'gd', type: 'text', title: 'Gradient descent in one line',
      md: `
**[[gradient-descent]]** repeats a single update:

$$\\theta \\leftarrow \\theta - \\eta \\, \\nabla_\\theta \\mathcal{L}(\\theta)$$

The **[[learning-rate]]** $\\eta$ is the step size. Too small and you crawl; too large and you overshoot the valley floor, bounce up the other side, and can even diverge. Real loss surfaces are like long narrow valleys: steep across, shallow along. The steep direction limits how large $\\eta$ can be; the shallow direction then makes progress painfully slow. This tension is why smarter [optimizers](wiki:Mathematical optimization|Mathematische Optimierung) ([[momentum]], [[adamw]]) exist — the next stage covers them.`,
    },
    {
      id: 'viz-gd', type: 'viz', viz: 'gradient-descent', title: 'Walk down the valley',
      params: { kappa: 8, goals: ['converge', 'diverge'] },
      task: 'Find a learning rate that reaches the minimum within 60 steps, then push it until it **diverges**. Bonus: with a slightly too-large learning rate, see how momentum changes the path.',
    },
    {
      id: 'chain', type: 'text', title: 'The chain rule: derivatives multiply along a chain',
      md: `
A [neural network](wiki:Neural network (machine learning)|Künstliches neuronales Netz) is a long [composition](wiki:Function composition|Komposition (Mathematik)): pixels → layer 1 → layer 2 → … → loss. The **[[chain-rule]]** says how to differentiate compositions: if $y = g(x)$ and $z = f(y)$, then

$$\\frac{dz}{dx} = \\frac{dz}{dy} \\cdot \\frac{dy}{dx}$$

Rates of change multiply. If $y$ moves 2× as fast as $x$ and $z$ moves 3× as fast as $y$, then $z$ moves 6× as fast as $x$.

**A tiny model.** Prediction $\\hat y = w x$, loss $\\mathcal{L} = (\\hat y - y)^2$. How does the loss depend on the weight $w$?

$$\\frac{\\partial \\mathcal{L}}{\\partial w} = \\underbrace{\\frac{\\partial \\mathcal{L}}{\\partial \\hat y}}_{2(\\hat y - y)} \\cdot \\underbrace{\\frac{\\partial \\hat y}{\\partial w}}_{x} = 2(wx - y)\\,x$$

**[[backpropagation]]** is nothing more than this, done systematically from the loss backwards through every layer, reusing the products computed so far so that each weight's gradient costs almost nothing extra.`,
    },
    {
      id: 'calc-chain', type: 'numeric', title: 'Chain rule by hand',
      question: 'With $\\hat y = wx$ and $\\mathcal{L} = (\\hat y - y)^2$: compute $\\frac{\\partial \\mathcal{L}}{\\partial w}$ for $w = 2$, $x = 3$, $y = 4$.',
      answer: 12, tolerance: 0,
      hint: '$\\hat y = 6$. Then $2(\\hat y - y) \\cdot x$.',
      explain: '$2(6 - 4) \\cdot 3 = 12$. Positive: increasing $w$ increases the loss, so gradient descent will *decrease* $w$ — correct, since $w = 4/3$ would be perfect.',
    },
    {
      id: 'video-chain', type: 'video', youtube: 'YG15m2VwSjA', label: 'Visualizing the chain rule and product rule', channel: '3Blue1Brown', minutes: 16,
      why: 'Optional but excellent: why the chain rule is true, with nudges of $dx$.[^3b1b-calculus]',
    },
    {
      id: 'order-backprop', type: 'order', title: 'One gradient computation',
      prompt: 'Put the steps of computing gradients for a network in order.',
      items: [
        'Forward pass: compute every layer\'s output and **store** the intermediate values',
        'Compute the loss from the final output and the target',
        'Start at the loss: $\\partial \\mathcal{L} / \\partial \\mathcal{L} = 1$',
        'Move backwards layer by layer, multiplying by each layer\'s local derivative (chain rule)',
        'Read off $\\partial \\mathcal{L} / \\partial \\theta$ for every weight',
        'Update the weights: $\\theta \\leftarrow \\theta - \\eta \\nabla_\\theta \\mathcal{L}$',
      ],
      explain: 'Note step 1: the backward pass needs the stored forward values. That is why **training uses far more GPU memory than inference** — and why "gradient checkpointing" (recompute instead of store) is a key trick on a 24 GB card.',
    },
    {
      id: 'quiz-grad', type: 'quiz', title: 'Gradient facts',
      question: 'Select every correct statement.',
      options: [
        { text: 'The gradient points in the direction in which the function increases fastest.', correct: true, why: 'That is why we step in the *negative* gradient direction.' },
        { text: 'At a minimum, the gradient is the zero vector.', correct: true, why: 'All partial slopes are zero — but a zero gradient could also be a maximum or a saddle point.' },
        { text: 'The gradient of the loss has as many entries as the model has parameters.', correct: true, why: 'One partial derivative per weight: 86M entries for ViT-B.' },
        { text: 'A larger learning rate always trains faster.', correct: false, why: 'Beyond a threshold (set by the steepest direction) updates overshoot and training becomes unstable or diverges.' },
        { text: 'The chain rule adds the derivatives of the composed functions.', correct: false, why: 'It **multiplies** them.' },
      ],
    },
    {
      id: 'mission-frozen', type: 'callout', tone: 'mission', title: 'Where gradients flow in your segmentation model',
      md: `
In a segmentation model, the loss is computed per pixel (did we predict "bezel" where the label says bezel?). Its gradient flows back through the segmentation head into the backbone (e.g. DINOv3).

A crucial practical choice: **freeze the backbone** (no gradient flows into it) or **fine-tune** it (gradients update all weights). Frozen: no stored activations for backprop through the backbone, no optimizer state for its weights → far less memory, and the powerful pretrained features cannot be damaged by a small or synthetic dataset. Fine-tuning: potentially better accuracy, much more memory, real risk of overfitting to render artifacts. You'll revisit this trade-off with real numbers in the mission stage.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>English</th><th>Deutsch</th><th>Notation</th></tr>
<tr><td>derivative</td><td>Ableitung</td><td>$f'(x)$, $\\frac{df}{dx}$</td></tr>
<tr><td>slope</td><td>Steigung</td><td></td></tr>
<tr><td>partial derivative</td><td>partielle Ableitung</td><td>$\\frac{\\partial f}{\\partial x}$ („d f nach d x“)</td></tr>
<tr><td>gradient (nabla)</td><td>Gradient (Nabla-Operator)</td><td>$\\nabla f$, $\\operatorname{grad} f$</td></tr>
<tr><td>chain rule</td><td>Kettenregel</td><td>$(f\\circ g)' = (f'\\circ g)\\, g'$</td></tr>
<tr><td>gradient descent</td><td>Gradientenverfahren, Gradientenabstieg</td><td></td></tr>
<tr><td>learning rate / step size</td><td>Lernrate / Schrittweite</td><td>$\\eta$</td></tr>
<tr><td>local minimum / saddle point</td><td>lokales Minimum / Sattelpunkt</td><td></td></tr></table>`,
    },
    {
      id: 'recall-grad', type: 'recall', title: 'Explain it to a colleague',
      prompt: 'Why do we update weights in the direction of the **negative** gradient, and what role does the chain rule play in computing that gradient for a deep network?',
      answer: `The gradient points in the direction of steepest increase of the loss; to first order, $\\mathcal{L}(\\theta + \\boldsymbol\\delta) \\approx \\mathcal{L}(\\theta) + \\nabla\\mathcal{L}\\cdot\\boldsymbol\\delta$, which is most negative when $\\boldsymbol\\delta$ points opposite to the gradient. A deep network is a composition of many functions, so the derivative of the loss w.r.t. an early weight is a **product** of local derivatives along the path from that weight to the loss (chain rule). Backpropagation computes these products from the loss backwards, reusing intermediate results, so all gradients cost about as much as one extra forward pass.`,
      hints: ['Think of the first-order approximation with a dot product.', 'What is a network, mathematically? A ... of functions.'],
      cards: ['neg-grad', 'chain'],
    },
  ],
  cards: [
    { id: 'deriv', front: 'Definition of the derivative $f\'(x)$ (and German name)', back: '$\\lim_{h\\to0}\\frac{f(x+h)-f(x)}{h}$ — the local slope. German: Ableitung.' },
    { id: 'partial', front: 'What is a partial derivative $\\partial f / \\partial x$?', back: 'The slope of $f$ along $x$ while all other variables are held fixed.' },
    { id: 'gradient', front: 'What is the gradient $\\nabla f$ and where does it point?', back: 'The vector of all partial derivatives; it points in the direction of steepest ascent.' },
    { id: 'neg-grad', front: 'Why step along $-\\nabla\\mathcal{L}$?', back: 'First order: $\\Delta\\mathcal{L} \\approx \\nabla\\mathcal{L}\\cdot\\boldsymbol\\delta$, most negative for $\\boldsymbol\\delta$ opposite the gradient.' },
    { id: 'gd-update', front: 'Gradient descent update rule', back: '$\\theta \\leftarrow \\theta - \\eta\\,\\nabla_\\theta\\mathcal{L}(\\theta)$' },
    { id: 'lr-too-big', front: 'What goes wrong with a too-large learning rate?', back: 'Steps overshoot across steep directions; loss oscillates or diverges.' },
    { id: 'chain', front: 'Chain rule — and German name', back: '$\\frac{dz}{dx} = \\frac{dz}{dy}\\frac{dy}{dx}$: derivatives multiply along a composition. Kettenregel.' },
    { id: 'tiny-grad', front: 'For $\\mathcal{L} = (wx - y)^2$, what is $\\partial\\mathcal{L}/\\partial w$?', back: '$2(wx - y)\\,x$' },
    { id: 'train-mem', front: 'Why does training need much more memory than inference?', back: 'Backprop needs the intermediate activations stored from the forward pass (plus gradients and optimizer state).' },
  ],
};
