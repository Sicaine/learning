export default {
  id: 'convolution',
  title: 'Convolution: sliding pattern detectors',
  summary: 'A [[convolution]] slides a tiny grid of weights over the image and asks, at every position, “does this look like my pattern?”. It is a [[dot-product]] repeated thousands of times — and the foundation of every CNN.',
  minutes: 30,
  goals: [
    'Compute one output value of a convolution by hand',
    'Predict output sizes from [[kernel]] size, [[stride]] and [[padding]]',
    'Count the parameters of a conv layer with several [[channel|channels]]',
    'Explain locality, weight sharing and why thin watch hands are fragile under downsampling',
  ],
  blocks: [
    {
      id: 'why', type: 'text', title: 'The problem with treating pixels as one long vector',
      md: `
In the last stage a layer was a big [[matrix]]: every output connected to every input. For a 224 × 224 RGB image that is 150,528 inputs — a single fully connected layer with 1,000 outputs would already need 150 million weights. Worse, it would have to learn "edge at top-left" and "edge at bottom-right" as two completely unrelated things.

Images have structure we can exploit:

- **Locality** — what a pixel means depends mostly on its neighbours. An edge is a *local* pattern.
- **Translation** — a crown is a crown whether it is on the left or the right of the frame.

A **[[convolution]]** bakes both assumptions into the architecture: use a *small* set of weights (a **[[kernel]]**) and *reuse the same weights at every position*.`,
    },
    {
      id: 'video', type: 'video', youtube: 'KuXjwB4LzSA', label: 'But what is a convolution?', channel: '3Blue1Brown', minutes: 23,
      why: 'Watch from about minute 8 (image processing part) for the blur and edge-detection intuition. The first part (probability, polynomials) is a lovely bonus but optional.',
    },
    {
      id: 'definition', type: 'text', title: 'The operation',
      md: `
Take a $3 \\times 3$ kernel $K$. Place it over a $3 \\times 3$ window of the image $I$, multiply element by element, and add everything up:

$$(I \\star K)(i, j) = \\sum_{m=0}^{2} \\sum_{n=0}^{2} I(i+m,\\, j+n)\\, K(m, n)$$

That is exactly a [[dot-product]] between the flattened window and the flattened kernel — so the output is **large where the window looks like the kernel**. Slide the window one step, repeat, and you get a new image: a **[[feature-map]]**.

Example — a vertical-edge kernel (Sobel):

$$K = \\begin{pmatrix} -1 & 0 & 1 \\\\ -2 & 0 & 2 \\\\ -1 & 0 & 1 \\end{pmatrix}$$

On a flat region the negative and positive columns cancel → 0. Where the image gets brighter from left to right → large positive. Brighter to darker → large negative.`,
    },
    {
      id: 'viz-conv', type: 'viz', viz: 'convolution-kernel', title: 'Slide a kernel over a watch',
      params: { kernel: 'sobelX', size: 48 },
      task: 'Try every kernel. Which one makes the **hands and indices** stand out most? Then hover over the output and read one weighted sum. Finally set stride 2 and watch what happens to the thin second hand in the output.',
    },
    {
      id: 'calc-one', type: 'numeric', title: 'One output value by hand',
      question: `Window of a grayscale image and the vertical-edge kernel:

$$W = \\begin{pmatrix} 1 & 2 & 8 \\\\ 1 & 3 & 9 \\\\ 0 & 2 & 8 \\end{pmatrix}, \\qquad K = \\begin{pmatrix} -1 & 0 & 1 \\\\ -2 & 0 & 2 \\\\ -1 & 0 & 1 \\end{pmatrix}$$

What is the output value $\\sum W \\odot K$?`,
      answer: 31, tolerance: 0,
      hint: 'The middle column is multiplied by 0. Left column: $-1 \\cdot 1 - 2 \\cdot 1 - 1 \\cdot 0$. Right column: $1\\cdot 8 + 2 \\cdot 9 + 1 \\cdot 8$.',
      explain: 'Left column: $-1 - 2 - 0 = -3$. Right column: $8 + 18 + 8 = 34$. Total $= 31$ — a strong positive response: the window gets much brighter from left to right, i.e. a vertical edge.',
    },
    {
      id: 'sizes', type: 'text', title: 'Stride, padding and the output-size formula',
      md: `
Three knobs decide how big the output is:

- **Kernel size** $k$ — usually 3 (sometimes 1, 5, 7).
- **[[stride]]** $s$ — how far the window jumps. Stride 2 halves the resolution.
- **[[padding]]** $p$ — how many (zero) pixels are added around the border.

For an input of width $W$:

$$W_{out} = \\left\\lfloor \\frac{W - k + 2p}{s} \\right\\rfloor + 1$$

With $k=3, p=1, s=1$ the size stays the same ("same" padding). With $s = 2$ it roughly halves.[^conv-arithmetic]`,
    },
    {
      id: 'calc-size', type: 'numeric', title: 'Output size',
      question: 'The first layer of ResNet-50 is a $7 \\times 7$ convolution with stride 2 and padding 3 on a $224 \\times 224$ input. What is the output width?',
      answer: 112, tolerance: 0,
      hint: '$\\lfloor (224 - 7 + 2\\cdot 3) / 2 \\rfloor + 1$',
      explain: '$\\lfloor 223 / 2 \\rfloor + 1 = 111 + 1 = 112$. One layer in, the image already has half its resolution — a 2-pixel second hand is now 1 pixel.',
    },
    {
      id: 'channels', type: 'text', title: 'Channels: many kernels, many feature maps',
      md: `
Real images have 3 **[[channel|channels]]** (R, G, B), so a kernel is really $3 \\times 3 \\times 3$: it looks at all colors at once. And a layer doesn't learn one kernel but many — say 64. Each produces one output channel, so the output is a $H \\times W \\times 64$ **[[tensor]]**: at every position, a 64-dimensional vector saying how strongly each of 64 patterns is present.

Parameters of a conv layer:

$$\\#\\text{params} = \\underbrace{k \\cdot k \\cdot C_{in}}_{\\text{one kernel}} \\cdot C_{out} + \\underbrace{C_{out}}_{\\text{biases}}$$

Notice what is **not** in the formula: the image size. Thanks to weight sharing, a conv layer costs the same number of parameters on a 224 px or a 1024 px image — only the compute grows.`,
    },
    {
      id: 'calc-params', type: 'numeric', title: 'Count the parameters',
      question: 'A $3 \\times 3$ convolution maps 64 input channels to 128 output channels (with biases). How many parameters does it have?',
      answer: 73856, tolerance: 0,
      hint: '$3 \\cdot 3 \\cdot 64 \\cdot 128 + 128$',
      explain: '$9 \\cdot 64 \\cdot 128 = 73{,}728$ weights $+ 128$ biases $= 73{,}856$. A fully connected layer between two $56\\times56$ feature maps of those sizes would need about $1.6 \\cdot 10^{11}$ weights.',
    },
    {
      id: 'match-props', type: 'match', title: 'Match the idea to its effect',
      pairs: [
        ['Locality', 'Each output only looks at a small neighbourhood'],
        ['Weight sharing', 'Same kernel at every position → few parameters'],
        ['Translation equivariance', 'Shift the input, the feature map shifts the same way'],
        ['Stride 2', 'Output has half the resolution'],
        ['Padding', 'Kernel fits at the borders; size can be preserved'],
        ['More output channels', 'More different patterns detected per position'],
      ],
    },
    {
      id: 'mission-thin', type: 'callout', tone: 'mission', title: 'Why your thin parts are the first victims',
      md: `
Suppose a watch fills a 1000 px photo and the second hand is ~7 px wide. Resize to 224 px for a standard backbone: the hand is now **~1.6 px**. After the stride-2 stem: **< 1 px**. After the next stride-2 stage it exists only as a faint smear in a 3 × 3 window.

Every stride and every pooling step is a place where thin structures — second hands, indices, the gap between bezel and case — can fall between samples. When your model gets dials right but hands wrong, **resolution along the pipeline** is suspect number one. Keep that in mind for the [[receptive-field]] and [[u-net|U-Net]] lessons: segmentation architectures are largely *about* getting this detail back.`,
    },
    {
      id: 'quiz-conv', type: 'quiz', title: 'Check your understanding',
      question: 'Which statements about a $3\\times3$ convolution layer are true?',
      options: [
        { text: 'Its number of parameters grows with the input image size.', correct: false, why: 'Weights are shared across positions — image size only affects compute and output size.' },
        { text: 'Each output value is a dot product between a kernel and an image window.', correct: true, why: 'Element-wise multiply + sum = dot product of the flattened arrays.' },
        { text: 'A kernel for RGB input has $3 \\cdot 3 \\cdot 3 = 27$ weights (plus a bias).', correct: true, why: 'It spans all input channels.' },
        { text: 'With padding 1 and stride 1 the output has the same width as the input.', correct: true, why: '$(W - 3 + 2)/1 + 1 = W$.' },
        { text: 'Convolutions can relate the crown and the opposite side of the case in one layer.', correct: false, why: 'A single $3\\times3$ layer only sees a 3-pixel neighbourhood. Long-range relations need depth (next lesson) or [[attention]].' },
      ],
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>English</th><th>Deutsch</th></tr>
<tr><td>convolution</td><td>Faltung</td></tr>
<tr><td>(cross-)correlation</td><td>Kreuzkorrelation</td></tr>
<tr><td>kernel, filter</td><td>Faltungskern, Filter(maske)</td></tr>
<tr><td>stride</td><td>Schrittweite</td></tr>
<tr><td>padding</td><td>Randauffüllung (Zero-Padding)</td></tr>
<tr><td>channel</td><td>Kanal</td></tr>
<tr><td>feature map</td><td>Merkmalskarte</td></tr>
<tr><td>element-wise product</td><td>elementweises Produkt (Hadamard-Produkt) $\\odot$</td></tr>
<tr><td>floor</td><td>Abrunden (Gauß-Klammer) $\\lfloor x \\rfloor$</td></tr></table>

In German math lectures convolution is written $(f * g)(x) = \\int f(t)\\,g(x-t)\\,dt$ — note the *flipped* $g$. Deep learning skips the flip (strictly a *Kreuzkorrelation*), which makes no difference when kernels are learned.`,
    },
    {
      id: 'recall', type: 'recall', title: 'Explain it',
      prompt: 'Why does a convolutional layer need **far fewer parameters** than a fully connected layer on images, and what assumption about images makes that acceptable?',
      answer: `A conv layer uses one small kernel (e.g. $3\\times3\\times C_{in}$) per output channel and **reuses it at every position** (weight sharing), and each output connects only to a **local** window. So the parameter count depends on kernel size and channels, not on image size. This is acceptable because images are **local** (meaning depends on neighbourhoods) and **translation-invariant in their statistics** (an edge or a crown looks the same wherever it appears), so the same detector is useful everywhere.`,
      hints: ['What happens to the weights when the kernel moves to the next position?', 'Does an edge look different in the top-left vs. the bottom-right?'],
      cards: ['weight-sharing', 'conv-params'],
    },
  ],
  cards: [
    { id: 'conv-op', front: 'What does one output value of a convolution compute?', back: 'The dot product of the kernel with the image window under it (element-wise multiply, then sum). High where the window resembles the kernel.' },
    { id: 'out-size', front: 'Output-size formula for a convolution (input $W$, kernel $k$, padding $p$, stride $s$)', back: '$\\left\\lfloor \\frac{W - k + 2p}{s} \\right\\rfloor + 1$' },
    { id: 'conv-params', front: 'Parameter count of a $k\\times k$ conv from $C_{in}$ to $C_{out}$ channels', back: '$k^2 \\cdot C_{in} \\cdot C_{out} + C_{out}$ — independent of image size.' },
    { id: 'weight-sharing', front: 'What is **weight sharing** in a CNN and what does it buy?', back: 'The same kernel is applied at every position. Few parameters, and translation equivariance: a pattern is detected wherever it appears.' },
    { id: 'stride', front: 'What does stride 2 do — and what is the risk for watch images?', back: 'Halves the output resolution. Thin structures (second hand, indices) can fall between samples and disappear.' },
    { id: 'same-pad', front: 'Which padding keeps the size for a $3\\times3$ kernel with stride 1?', back: 'Padding 1 ("same" padding).' },
    { id: 'sobel', front: 'Why does the Sobel kernel $\\begin{pmatrix}-1&0&1\\\\-2&0&2\\\\-1&0&1\\end{pmatrix}$ respond to vertical edges?', back: 'Left and right columns have opposite signs: flat regions cancel to 0, a left→right brightness change gives a large value.' },
    { id: 'faltung', front: 'German: convolution, kernel, stride, feature map', back: 'Faltung, Faltungskern, Schrittweite, Merkmalskarte.' },
  ],
};
