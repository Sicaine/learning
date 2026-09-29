export default {
  id: 'vectors-dot-product',
  title: 'Vectors, dot products & similarity',
  summary: 'Every modern vision model turns images into [[vector|vectors]] and compares them with one tiny operation. Master it here and attention, embeddings and retrieval later become obvious.',
  minutes: 25,
  goals: [
    'Read a [[vector]] both as a list of numbers and as an arrow',
    'Compute a [[dot-product]] and explain what its sign means',
    'Explain why models compare [[embedding|embeddings]] with [[cosine-similarity]]',
    'Connect this to your watch images: patch features and nearest neighbours',
  ],
  blocks: [
    {
      id: 'images-are-vectors', type: 'text', title: 'An image is already a vector',
      md: `
A 224 × 224 RGB photo of a watch is just $224 \\cdot 224 \\cdot 3 = 150{,}528$ numbers. Write them in a row and you have a **[[vector]]** — a point in a space with 150,528 [[dimension|dimensions]].

That raw pixel space is almost useless for understanding: shift the watch by three pixels and nearly every number changes, even though a human sees *the same watch*. So vision models learn a function that maps the image to a much shorter vector — an **[[embedding]]** — where "similar to a human" means "close together".

A DINOv2 ViT-B model, for instance, turns the whole image into a 768-dimensional vector *and* gives every 14×14-pixel patch its own 768-dimensional vector.[^dinov2] Everything in this course — attention, self-supervised learning, segmentation — is ultimately about producing and comparing such vectors.`,
    },
    {
      id: 'video-dot', type: 'video', youtube: 'LyGKycYT2v0', label: 'Dot products and duality', channel: '3Blue1Brown', minutes: 14,
      why: 'Watch the first ~6 minutes for the geometric meaning of the dot product (projection). The duality part is a bonus.[^3b1b-linalg]',
    },
    {
      id: 'two-views', type: 'text', title: 'Two ways to see a vector',
      md: `
**As a list:** $\\mathbf{v} = (3, 4)$. Each entry is one feature.

**As an arrow:** from the origin to the point $(3,4)$. It has a *direction* and a *length*, the **[[norm]]**:

$$\\lVert \\mathbf{v} \\rVert = \\sqrt{3^2 + 4^2} = 5$$

The same formula works in 768 dimensions — it's Pythagoras applied over and over: $\\lVert\\mathbf{v}\\rVert = \\sqrt{\\sum_i v_i^2}$.`,
    },
    {
      id: 'dot-def', type: 'text', title: 'The dot product: one number that says “how aligned?”',
      md: `
The **[[dot-product]]** multiplies matching entries and adds everything up:

$$\\mathbf{a} \\cdot \\mathbf{b} = \\sum_{i=1}^{d} a_i b_i = a_1 b_1 + a_2 b_2 + \\dots + a_d b_d$$

The magic is that this simple sum has a geometric meaning:

$$\\mathbf{a} \\cdot \\mathbf{b} = \\lVert\\mathbf{a}\\rVert \\, \\lVert\\mathbf{b}\\rVert \\cos\\theta$$

where $\\theta$ is the angle between the arrows. So the sign tells you the relationship:

- **positive** → pointing roughly the same way
- **zero** → at a right angle, **[[orthogonal]]** — "unrelated"
- **negative** → pointing in opposite directions`,
    },
    {
      id: 'viz-dot', type: 'viz', viz: 'dot-product', title: 'Feel the dot product',
      params: { goals: ['orthogonal', 'opposite', 'same-direction'] },
      task: 'Reach all three goals below the plot. Notice how the dot product changes when you only change the *length* of one arrow — but cos θ does not.',
    },
    {
      id: 'calc-dot', type: 'numeric', title: 'Compute by hand',
      question: 'Let $\\mathbf{a} = (2, 1, 3)$ and $\\mathbf{b} = (1, -4, 2)$. What is $\\mathbf{a}\\cdot\\mathbf{b}$?',
      answer: 4, tolerance: 0,
      hint: 'Multiply position by position: $2\\cdot1$, $1\\cdot(-4)$, $3\\cdot2$ — then add.',
      explain: '$2 - 4 + 6 = 4$. Positive, so the vectors point into the same half-space — but only weakly, given their lengths ($\\sqrt{14}$ and $\\sqrt{21}$). That "given their lengths" is exactly what cosine similarity fixes.',
    },
    {
      id: 'cosine', type: 'text', title: 'Cosine similarity: compare direction, ignore length',
      md: `
Raw dot products mix two things: *alignment* and *length*. A long vector has large dot products with everything. To compare only direction, divide the lengths out — this is **[[cosine-similarity]]**:

$$\\cos\\theta = \\frac{\\mathbf{a}\\cdot\\mathbf{b}}{\\lVert\\mathbf{a}\\rVert\\,\\lVert\\mathbf{b}\\rVert} \\in [-1, 1]$$

Equivalent trick used everywhere in practice: first scale every vector to length 1 (a **[[unit-vector]]**, "L2-normalize"), then plain dot products *are* cosine similarities. DINO's projection head, for example, L2-normalizes its features before the final layer,[^dino] and k-NN evaluation of self-supervised features uses cosine similarity.`,
    },
    {
      id: 'calc-cos', type: 'numeric', title: 'Cosine similarity',
      question: 'What is the cosine similarity of $(3, 4)$ and $(4, 3)$? Give a decimal.',
      answer: 0.96, tolerance: 0.005,
      hint: 'Dot product is $3\\cdot4 + 4\\cdot3$. Both vectors have length 5.',
      explain: '$\\frac{24}{5 \\cdot 5} = 0.96$ — about 16°. Very similar, but not identical: the two features are swapped.',
    },
    {
      id: 'quiz-dot', type: 'quiz', title: 'Which statements are true?',
      question: 'Select every correct statement.',
      options: [
        { text: 'If $\\mathbf{a}\\cdot\\mathbf{b} = 0$, the vectors are at 90°.', correct: true, why: 'Because $\\cos 90° = 0$ (assuming neither vector is zero).' },
        { text: 'Doubling the length of $\\mathbf{a}$ doubles $\\mathbf{a}\\cdot\\mathbf{b}$.', correct: true, why: 'The dot product is linear: $(2\\mathbf{a})\\cdot\\mathbf{b} = 2(\\mathbf{a}\\cdot\\mathbf{b})$.' },
        { text: 'Doubling the length of $\\mathbf{a}$ doubles the cosine similarity.', correct: false, why: 'Cosine similarity divides the length out — it stays the same.' },
        { text: 'For unit vectors, dot product and cosine similarity are the same number.', correct: true, why: 'Both norms are 1, so the denominator disappears.' },
        { text: 'A negative dot product means the vectors are far apart in distance.', correct: false, why: 'It is about *angle*, not distance. Two tiny opposite vectors are close in distance but have negative dot product.' },
      ],
    },
    {
      id: 'mission-patches', type: 'callout', tone: 'mission', title: 'This is how a model “sees” your watch parts',
      md: `
Run DINOv2 or DINOv3 on a watch photo and you get one [[embedding]] per patch — for a 518×518 input with patch size 14 that is a 37 × 37 grid, 1,369 vectors.

Now pick the patch on the **crown** and compute its [[cosine-similarity]] with every other patch. With a strong backbone, the other crown-like patches light up — in *this* image and in *other* images. Segmentation is, at its heart, **grouping patches whose vectors point the same way** and deciding where the boundaries are.

A great first experiment for your data (later in this path): take 20 real photos and 20 renders, compute patch features, and check whether "dial" patches from renders are nearest neighbours of "dial" patches from real photos. If not, you have measured your **domain gap** in one plot.`,
    },
    {
      id: 'deep-highdim', type: 'callout', tone: 'deep', title: 'Why random high-dimensional vectors are almost orthogonal',
      md: `
Draw two random directions in 2D and the angle can be anything. In 768 dimensions, the cosine similarity of two random unit vectors is roughly normally distributed around 0 with standard deviation $1/\\sqrt{d} \\approx 0.036$.

Consequence: in a trained embedding space, a cosine similarity of 0.3 can already be a *strong* signal — it's many standard deviations above chance. Don't judge similarity scores by 2D intuition.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>English</th><th>Deutsch</th><th>Notation</th></tr>
<tr><td>vector</td><td>Vektor</td><td>$\\mathbf{v}$ (DE school: $\\vec v$)</td></tr>
<tr><td>dot product / inner product</td><td>Skalarprodukt</td><td>$\\mathbf{a}\\cdot\\mathbf{b}$, $\\mathbf{a}^\\top\\mathbf{b}$, $\\langle \\mathbf{a},\\mathbf{b}\\rangle$</td></tr>
<tr><td>norm, length, magnitude</td><td>Norm, Betrag, Länge</td><td>$\\lVert\\mathbf{v}\\rVert$ (DE school: $|\\vec v|$)</td></tr>
<tr><td>unit vector</td><td>Einheitsvektor</td><td>$\\hat{\\mathbf{v}}$</td></tr>
<tr><td>orthogonal</td><td>orthogonal, senkrecht</td><td>$\\mathbf{a}\\perp\\mathbf{b}$</td></tr>
<tr><td>to normalize</td><td>normieren</td><td>$\\mathbf{v}/\\lVert\\mathbf{v}\\rVert$</td></tr></table>

Note: ML papers write $\\mathbf{a}^\\top\\mathbf{b}$ (a row vector times a column vector) for the dot product — you'll see why in the matrix lesson.`,
    },
    {
      id: 'recall-cos', type: 'recall', title: 'Explain it to a colleague',
      prompt: 'Why do vision systems usually compare image embeddings with **cosine similarity** rather than the raw dot product or pixel distance? Answer in 2–4 sentences.',
      answer: `Pixel distance fails because tiny shifts or lighting changes alter almost every pixel although the content is the same; embeddings are trained so that *meaning* determines position. Among embeddings, the raw dot product is influenced by vector **length**, which often encodes things like confidence or image statistics rather than content. Cosine similarity keeps only the **direction** — the "what is it" — and gives a bounded score in $[-1, 1]$ that is comparable across images.`,
      hints: ['What happens to pixel values when the watch moves 3 pixels?', 'What does the length of a vector have to do with its dot products?'],
      cards: ['cos-why'],
    },
  ],
  cards: [
    { id: 'dot-def', front: 'Algebraic definition of the dot product $\\mathbf{a}\\cdot\\mathbf{b}$', back: '$\\sum_i a_i b_i$ — multiply entry by entry, then sum.' },
    { id: 'dot-geo', front: 'Geometric meaning of the dot product', back: '$\\mathbf{a}\\cdot\\mathbf{b} = \\lVert\\mathbf{a}\\rVert\\lVert\\mathbf{b}\\rVert\\cos\\theta$ — lengths times cosine of the angle. Equivalently: length of a × signed length of b\'s projection onto a.' },
    { id: 'dot-sign', front: 'What does the **sign** of a dot product tell you?', back: 'Positive: same general direction. Zero: orthogonal (90°). Negative: opposing directions.' },
    { id: 'norm', front: 'Formula for the L2 norm $\\lVert\\mathbf{v}\\rVert$ — and its German name', back: '$\\sqrt{\\sum_i v_i^2} = \\sqrt{\\mathbf{v}\\cdot\\mathbf{v}}$. German: Norm / Betrag.' },
    { id: 'cos', front: 'Cosine similarity formula and range', back: '$\\frac{\\mathbf{a}\\cdot\\mathbf{b}}{\\lVert\\mathbf{a}\\rVert\\lVert\\mathbf{b}\\rVert}$, in $[-1, 1]$.' },
    { id: 'cos-why', front: 'Why compare embeddings by cosine similarity instead of raw dot product?', back: 'It removes vector length (often unrelated to content) and compares only direction; the score is bounded and comparable.' },
    { id: 'unit', front: 'For unit vectors, how are dot product and cosine similarity related?', back: 'They are identical — that\'s why embeddings are usually L2-normalized first.' },
    { id: 'highdim', front: 'Typical cosine similarity of two **random** unit vectors in $d$ = 768 dimensions?', back: '≈ 0, with standard deviation about $1/\\sqrt{d} \\approx 0.036$. High-dimensional random vectors are nearly orthogonal.' },
    { id: 'patch-grid', front: 'DINOv2 with patch size 14 on a 518×518 image: how many patch embeddings?', back: '$518/14 = 37$, so $37 \\times 37 = 1369$ patch vectors (plus the CLS token).' },
  ],
};
