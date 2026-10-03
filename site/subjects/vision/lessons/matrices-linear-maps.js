export default {
  id: 'matrices-linear-maps',
  title: 'Matrices as transformations',
  summary: 'A [[matrix]] is not a table of numbers you memorize rules for — it is a machine that moves space around. Every layer of a neural network is one.',
  minutes: 25,
  goals: [
    'Read a [[matrix]] as "where do the basis vectors land?"',
    'Apply the shape rule of [[matrix-multiplication]] without thinking',
    'Count parameters and FLOPs of a linear layer',
    'Explain why a ViT\'s cost grows with the number of tokens',
  ],
  blocks: [
    {
      id: 'layer-is-matrix', type: 'text', title: 'A layer is a matrix',
      md: `
In the last lesson a patch of a watch photo became a 768-dimensional [[vector]] $\\mathbf{x}$. What does a network *do* with it? The most common operation by far is

$$\\mathbf{y} = W\\mathbf{x} + \\mathbf{b}$$

where $W$ is a [[matrix]] of learned weights. If $W$ has shape $3072 \\times 768$, the output $\\mathbf{y}$ has 3072 entries, and **each entry is a [[dot-product]]** of one row of $W$ with $\\mathbf{x}$:

$$y_i = \\sum_{j=1}^{768} W_{ij}\\,x_j + b_i = \\mathbf{w}_i \\cdot \\mathbf{x} + b_i$$

So each row is a *pattern detector*: "how much does this input look like my pattern?" A layer asks 3072 such questions at once. Everything you learned about dot products carries over directly.`,
    },
    {
      id: 'video-linmap', type: 'video', youtube: 'kYB8IZa5AuE', label: 'Linear transformations and matrices', channel: '3Blue1Brown', minutes: 11,
      why: 'The single best explanation of the "columns = where the basis vectors land" view.[^3b1b-linalg]',
    },
    {
      id: 'columns', type: 'text', title: 'Columns tell you everything',
      md: `
A **[[linear-map]]** keeps grid lines parallel and evenly spaced and keeps the origin in place. It can [rotate](wiki:Rotation matrix|Drehmatrix), stretch, [shear](wiki:Shear mapping|Scherung (Geometrie)), mirror or flatten — but never bend.

Because of that, you only need to know where the two [basis vectors](wiki:Basis (linear algebra)|Basis (Vektorraum)) $\\hat{\\imath} = (1,0)$ and $\\hat{\\jmath} = (0,1)$ go. Write those landing spots as columns and you have the matrix:

$$\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} \\begin{pmatrix} x \\\\ y \\end{pmatrix} = x \\begin{pmatrix} a \\\\ c \\end{pmatrix} + y \\begin{pmatrix} b \\\\ d \\end{pmatrix}$$

"Take $x$ steps along the new $\\hat{\\imath}$ and $y$ steps along the new $\\hat{\\jmath}$." The **[determinant](wiki:Determinant|Determinante)** $ad - bc$ tells you how areas scale; if it is 0, the map squashes the plane onto a line and information is irreversibly lost.[^mml-book]`,
    },
    {
      id: 'viz-matrix', type: 'viz', viz: 'matrix-transform', title: 'Bend space (without bending it)',
      task: 'Try the presets, then drag the sliders to reach both goals. Watch the little watch face: a linear map can turn it into an ellipse, shear it, or mirror it — but its hands stay straight lines.',
    },
    {
      id: 'matmul', type: 'text', title: 'Matrix multiplication and the shape rule',
      md: `
**[[matrix-multiplication]]** $AB$ means "apply $B$, then $A$". Entry $(i,j)$ is the dot product of row $i$ of $A$ with column $j$ of $B$:

$$(AB)_{ij} = \\sum_{l} A_{il} B_{lj}$$

The only rule you really need is the **shape rule**:

$$\\underbrace{(m \\times k)}_{A} \\cdot \\underbrace{(k \\times n)}_{B} = \\underbrace{(m \\times n)}_{AB}$$

Inner dimensions must match and disappear. Order matters: $AB \\neq BA$ in general (rotate-then-shear is not shear-then-rotate).

In practice we process many vectors at once. Stack $N$ token vectors as rows of $X \\in \\mathbb{R}^{N\\times D}$; a linear layer is then $XW^\\top$ with $W \\in \\mathbb{R}^{D_{out}\\times D}$ — one big matmul, which is exactly what [GPUs](wiki:Graphics processing unit|Grafikprozessor) are built for. The **[[transpose]]** $W^\\top$ just flips rows and columns.`,
    },
    {
      id: 'match-shapes', type: 'match', title: 'Shape detective',
      prompt: 'Match each product to its result shape.',
      pairs: [
        ['$(3\\times 4)\\cdot(4\\times 2)$', '$3\\times 2$'],
        ['$(1\\times 768)\\cdot(768\\times 10)$', '$1\\times 10$'],
        ['$(197\\times 64)\\cdot(64\\times 197)$', '$197\\times 197$ (an attention map!)'],
        ['$(4\\times 3)\\cdot(4\\times 2)$', 'undefined — inner sizes differ'],
        ['$(1369\\times 768)\\cdot(768\\times 3072)$', '$1369\\times 3072$'],
      ],
    },
    {
      id: 'params', type: 'numeric', title: 'Count the parameters',
      question: 'A linear layer maps 768 inputs to 3072 outputs, with a bias. How many learnable parameters does it have?',
      answer: 2362368, tolerance: 0,
      hint: '$W$ has $3072 \\times 768$ entries, plus one bias per output.',
      explain: '$768 \\cdot 3072 + 3072 = 2{,}362{,}368$. This is the first half of the MLP inside **one** ViT-B block; there are 12 blocks. Parameter counts of transformers are dominated by these matrices.',
    },
    {
      id: 'tensors', type: 'text', title: 'Tensors: matrices with more axes',
      md: `
Deep-learning code talks about **[[tensor|tensors]]** — just arrays with any number of axes. Typical shapes you will meet constantly:

<table><tr><th>Thing</th><th>Shape</th></tr>
<tr><td>batch of RGB images</td><td>$(B, 3, H, W)$</td></tr>
<tr><td>ViT tokens for a batch</td><td>$(B, N, D)$, e.g. $(8, 1370, 768)$</td></tr>
<tr><td>linear-layer weights</td><td>$(D_{out}, D_{in})$</td></tr>
<tr><td>segmentation logits</td><td>$(B, C_{classes}, H, W)$</td></tr></table>

A linear layer applied to $(B, N, D)$ acts on the last axis only: the same $W$ is applied to every token of every image. Later you'll see attention compute $QK^\\top$ — a $(N \\times d)\\cdot(d \\times N)$ product giving an $N\\times N$ table of all token-to-token dot products.`,
    },
    {
      id: 'flops', type: 'numeric', title: 'How expensive is that?',
      question: 'Multiplying an $(m\\times k)$ matrix by a $(k\\times n)$ matrix costs about $2mkn$ floating-point operations (one multiply + one add per term). How many FLOPs for $(1369\\times768)\\cdot(768\\times768)$ — one linear projection of a 518×518 image in ViT-B? Answer in scientific notation, e.g. `1.2e9`.',
      answer: 1.615e9, tolerance: 0.02e9, unit: 'FLOPs',
      hint: '$2 \\cdot 1369 \\cdot 768 \\cdot 768$',
      explain: '$2 \\cdot 1369 \\cdot 768^2 \\approx 1.6 \\times 10^9$. A ViT-B block has several such products; the model has 12 blocks, and training costs ~3× the forward pass. An [RTX 4090](wiki:GeForce 40 series|Nvidia-GeForce-40-Serie) manages very roughly $1.6\\times 10^{14}$ dense [FP16](wiki:Half-precision floating-point format) [FLOP/s](wiki:FLOPS|Floating Point Operations Per Second) in practice-friendly conditions, so a single projection is trivial — but the count grows **linearly with tokens** for linear layers and **quadratically** for attention.',
    },
    {
      id: 'quiz-linear', type: 'quiz', title: 'Linear or not?',
      question: 'Which of these maps $\\mathbb{R}^2 \\to \\mathbb{R}^2$ are **linear**?',
      options: [
        { text: 'Rotate by 30°', correct: true, why: 'Keeps the origin, lines stay lines, evenly spaced.' },
        { text: 'Shift everything by $(1, 0)$', correct: false, why: 'The origin moves. This is *affine*, not linear — that is exactly what the bias $\\mathbf{b}$ adds to a layer.' },
        { text: 'Apply ReLU to each coordinate', correct: false, why: 'Not additive: $\\mathrm{ReLU}(-1) + \\mathrm{ReLU}(1) = 1$, but $\\mathrm{ReLU}(-1 + 1) = 0$. Bending is its whole point.' },
        { text: 'Project onto the x-axis: $(x, y) \\mapsto (x, 0)$', correct: true, why: 'Linear, with determinant 0 — information about $y$ is lost.' },
        { text: 'Mirror across the y-axis', correct: true, why: 'Linear with determinant −1.' },
      ],
    },
    {
      id: 'mission-cost', type: 'callout', tone: 'mission', title: 'Resolution is a matrix-shape decision',
      md: `
Your watch images contain tiny, important structures: hand tips, indices, the crown's edge. More resolution helps — but for a ViT, resolution means **more rows in $X$**. At patch size 14, a 518×518 image has 1,369 tokens; 1036×1036 has 5,476 tokens — 4× the linear-layer cost and **16×** the attention cost (it builds an $N\\times N$ matrix).

Keep this shape arithmetic in mind: it is the main reason why "just use higher resolution" quickly hits the 24 GB limit of an RTX 4090, and why tricks like feature upsampling or cropping into regions exist.`,
    },
    {
      id: 'deep-rank', type: 'callout', tone: 'deep', title: 'Rank, and why LoRA works',
      md: `
The **[rank](wiki:Rank (linear algebra)|Rang (Lineare Algebra))** of a matrix is the dimension of the space its outputs can reach. A $768\\times768$ matrix of rank 8 can be written as a product $BA$ with $B \\in \\mathbb{R}^{768\\times 8}$, $A \\in \\mathbb{R}^{8 \\times 768}$ — only $2 \\cdot 768 \\cdot 8 = 12{,}288$ numbers instead of 589,824.

[[lora|LoRA]] fine-tunes a big pretrained model by *adding* such a low-rank product to frozen weights: $W' = W + BA$. The bet: the change needed for a new task is low-rank. It is one of your options for adapting DINOv3 on two consumer GPUs.[^lora]`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>English</th><th>Deutsch</th><th>Notation</th></tr>
<tr><td>matrix, matrices</td><td>Matrix, Matrizen</td><td>$A \\in \\mathbb{R}^{m\\times n}$</td></tr>
<tr><td>row / column</td><td>Zeile / Spalte</td><td>$A_{ij}$: Zeile $i$, Spalte $j$</td></tr>
<tr><td>matrix multiplication</td><td>Matrixmultiplikation</td><td>$AB$</td></tr>
<tr><td>transpose</td><td>Transponierte</td><td>$A^\\top$ (DE auch $A^T$)</td></tr>
<tr><td>linear map / transformation</td><td>lineare Abbildung</td><td>$f(\\mathbf{x}) = A\\mathbf{x}$</td></tr>
<tr><td>determinant</td><td>Determinante</td><td>$\\det A$</td></tr>
<tr><td>rank</td><td>Rang</td><td>$\\operatorname{rank} A$</td></tr>
<tr><td>basis vector</td><td>Basisvektor (Einheitsvektor)</td><td>$\\hat{\\imath}, \\hat{\\jmath}$ / $\\mathbf{e}_1, \\mathbf{e}_2$</td></tr>
<tr><td>affine map</td><td>affine Abbildung</td><td>$A\\mathbf{x} + \\mathbf{b}$</td></tr></table>`,
    },
    {
      id: 'recall-matrix', type: 'recall', title: 'Explain it to a colleague',
      prompt: 'What do the **columns** of a matrix tell you, and what does it mean geometrically to multiply two matrices $AB$? Why must the inner dimensions match?',
      answer: `Column $j$ is the image of the $j$-th basis vector: where $\\mathbf{e}_j$ lands under the map. Since the map is linear, every other vector lands at the same combination of those columns. $AB$ is the composition "first apply $B$, then $A$". The inner dimensions must match because $B$'s outputs (its number of rows $k$) are $A$'s inputs (its number of columns $k$): $(m\\times k)(k\\times n) \\to (m\\times n)$.`,
      hints: ['What is $A\\mathbf{e}_1$?', 'If $B$ outputs vectors of length $k$, what length must $A$ accept?'],
      cards: ['columns', 'shape-rule'],
    },
  ],
  cards: [
    { id: 'layer', front: 'A linear layer $\\mathbf{y} = W\\mathbf{x} + \\mathbf{b}$: what is each output entry $y_i$?', back: 'The dot product of row $i$ of $W$ with $\\mathbf{x}$, plus bias $b_i$ — a pattern match.' },
    { id: 'columns', front: 'What do the columns of a matrix represent?', back: 'Where the basis vectors land: column $j$ = $A\\mathbf{e}_j$.' },
    { id: 'shape-rule', front: 'Shape rule of matrix multiplication', back: '$(m\\times k)\\cdot(k\\times n) = (m\\times n)$ — inner sizes must match and vanish.' },
    { id: 'commute', front: 'Is $AB = BA$ in general?', back: 'No. Composition order matters (rotate-then-shear ≠ shear-then-rotate).' },
    { id: 'det', front: 'Meaning of the determinant — and of $\\det A = 0$?', back: 'Factor by which areas/volumes scale (sign = orientation flip). $\\det A = 0$: space is squashed to lower dimension; information is lost; $A$ is not invertible.' },
    { id: 'affine', front: 'Is $\\mathbf{x} \\mapsto W\\mathbf{x} + \\mathbf{b}$ linear?', back: 'No, it is **affine** (the origin moves if $\\mathbf{b} \\neq 0$). Deep-learning people still call it a "linear layer".' },
    { id: 'params', front: 'Parameters of a linear layer $D_{in} \\to D_{out}$ with bias?', back: '$D_{in} \\cdot D_{out} + D_{out}$.' },
    { id: 'flops', front: 'FLOPs of multiplying $(m\\times k)$ by $(k\\times n)$?', back: '≈ $2mkn$ (a multiply and an add for each of the $mkn$ terms).' },
    { id: 'tokens-cost', front: 'Doubling image side length at fixed patch size: effect on ViT linear-layer cost and attention cost?', back: 'Tokens ×4 → linear layers ×4, attention ($N\\times N$) ×16.' },
  ],
};
