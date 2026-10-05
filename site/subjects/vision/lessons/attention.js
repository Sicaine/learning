export default {
  id: 'attention',
  title: 'Attention: queries, keys & values',
  summary: 'A convolution uses the same fixed weights everywhere and only looks nearby. **[[attention|Attention]]** lets every patch decide, *based on content*, which other patches to listen to — anywhere in the image, in a single layer. It is a [[softmax]] over [[dot-product|dot products]], and it powers DINO, SAM and every modern foundation model.',
  needs: ['vectors-dot-product', 'probability-softmax'],
  minutes: 35,
  goals: [
    'Write down scaled dot-product attention and explain every symbol',
    'Explain the roles of [[query-key-value|queries, keys and values]]',
    'Explain why the scores are divided by $\\sqrt{d_k}$',
    'Compute attention matrix sizes and explain the $N^2$ cost',
    'Explain what [[multi-head-attention|multiple heads]] add',
  ],
  blocks: [
    {
      id: 'motivation', type: 'text', title: 'What convolutions can’t do',
      md: `
A convolution's weights are **fixed after training** and **local**. The kernel that processes the crown region is the same one that processes the strap, and it only sees a few pixels. Long-range relations — "this bar is a minute hand *because* it reaches the minute track on the other side of the dial" — need many layers of slowly growing [[receptive-field|receptive fields]].

Attention flips both properties:

- **Content-dependent weights:** how much patch A uses patch B is computed on the fly from what A and B contain.
- **Global from layer one:** every [[token]] can read from every other token.`,
    },
    {
      id: 'video', type: 'video', youtube: 'eMlx5fFNoYc', label: 'Attention in transformers, step-by-step', channel: '3Blue1Brown', minutes: 26,
      why: 'Explained for [language](wiki:Natural language processing|Verarbeitung natürlicher Sprache) (tokens are words), but the mechanism is identical for image patches. Focus on the query/key dot products, the softmax, and the value vectors.[^3b1b-nn]',
    },
    {
      id: 'qkv', type: 'text', title: 'Queries, keys and values',
      md: `
Start with $N$ tokens, each a vector of width $D$, stacked into a matrix $X \\in \\mathbb{R}^{N \\times D}$ (for a ViT: one token per image patch). Three learned [[matrix|matrices]] project every token three ways:

$$Q = X W_Q, \\qquad K = X W_K, \\qquad V = X W_V$$

Think of a library:

- **Query** $q_i$ — what token $i$ is *looking for* ("I'm a bright thin bar — where is the center of the dial?")
- **Key** $k_j$ — what token $j$ *advertises* about itself ("I'm the center hub")
- **Value** $v_j$ — what token $j$ actually *hands over* if selected

The match between a query and a key is — of course — a [[dot-product]]: $q_i \\cdot k_j$. Big when they point the same way.`,
    },
    {
      id: 'formula', type: 'text', title: 'Scaled dot-product attention',
      md: `
Put it together:[^attention-is-all]

$$\\mathrm{Attention}(Q, K, V) = \\mathrm{softmax}\\!\\left( \\frac{Q K^\\top}{\\sqrt{d_k}} \\right) V$$

Step by step:

1. $S = QK^\\top$ — an $N \\times N$ matrix of scores. Row $i$ holds $q_i \\cdot k_j$ for every $j$.
2. Divide by $\\sqrt{d_k}$ (the width of queries/keys) — explained below.
3. [[softmax]] **along each row** → weights $A_{ij} \\ge 0$ with $\\sum_j A_{ij} = 1$.
4. Output for token $i$: $\\sum_j A_{ij}\\, v_j$ — a **[weighted average](wiki:Weighted arithmetic mean|Gewichtetes arithmetisches Mittel) of values**.

So each token's new representation is a blend of information from the tokens it found relevant. When all tokens come from the same image, it is called **[[self-attention]]**; when queries come from somewhere else (e.g. a prompt or object queries), it's *cross-attention*.`,
    },
    {
      id: 'order', type: 'order', title: 'Order the computation',
      prompt: 'Put the steps of one self-attention head in order.',
      items: [
        'Stack the $N$ patch tokens into $X$ ($N \\times D$)',
        'Project: $Q = XW_Q$, $K = XW_K$, $V = XW_V$',
        'Scores: $S = QK^\\top$ ($N \\times N$)',
        'Scale: divide by $\\sqrt{d_k}$',
        'Row-wise softmax → attention weights $A$',
        'Output: $AV$ — weighted sums of values',
      ],
    },
    {
      id: 'viz', type: 'viz', viz: 'attention-map', title: 'Attention on a watch',
      params: { head: 'content' },
      intro: 'A toy model: 14 × 14 patches (like ViT-B/16 on 224 px). Click a patch to make it the **query**; brightness shows its attention weights over all patches.',
      task: 'Click a **hand** patch with Head A, then a **dial** patch with Head C. Then drag the temperature: what happens to "effective # patches attended" as τ goes down? Relate it to dividing by $\\sqrt{d_k}$.',
    },
    {
      id: 'sqrt', type: 'text', title: 'Why divide by √dₖ?',
      md: `
If the entries of $q$ and $k$ are roughly independent with mean 0 and variance 1, then

$$q \\cdot k = \\sum_{m=1}^{d_k} q_m k_m \\quad\\text{has variance } d_k.$$

With $d_k = 64$ the scores typically spread over $\\pm 8$ or more. The [[softmax]] of such large numbers is nearly one-hot: one weight ≈ 1, the rest ≈ 0 — and its gradients vanish, so learning stalls. Dividing by $\\sqrt{d_k}$ brings the variance back to 1.

It's exactly the **[[temperature]]** knob you saw in the viz: dividing scores by a number > 1 makes the softmax softer. (DINO will later use temperature deliberately to *sharpen* its teacher's outputs.)`,
    },
    {
      id: 'mha', type: 'text', title: 'Multiple heads: several questions at once',
      md: `
One attention pattern per token is limiting — a patch may want to know "which patches are the same part as me?" *and* "where is the dial center?". **[[multi-head-attention|Multi-head attention]]** runs $h$ attention operations in parallel, each in a smaller space of $d_k = D / h$ dimensions with its own $W_Q, W_K, W_V$:

$$\\mathrm{MHA}(X) = \\mathrm{Concat}(\\mathrm{head}_1, \\dots, \\mathrm{head}_h)\\, W_O$$

Same total cost as one big head, but many different relations. In trained [ViTs](wiki:Vision transformer) you find heads that attend locally (like a convolution), heads that attend to the same object, and heads that attend almost everywhere.`,
    },
    {
      id: 'calc-head', type: 'numeric', title: 'Head width',
      question: 'ViT-B has token width $D = 768$ and 12 heads. What is $d_k$, the width of each head’s queries and keys?',
      answer: 64, tolerance: 0,
      explain: '$768 / 12 = 64$, so the scaling factor is $1/\\sqrt{64} = 1/8$.',
    },
    {
      id: 'cost', type: 'text', title: 'The price: N² ',
      md: `
The score matrix has $N \\times N$ entries — per head, per layer. For 196 tokens (224 px, patch 16) that's 38k entries: trivial. But tokens grow with the *square* of resolution, and attention with the square of tokens, so **attention cost grows with the 4th power of the image side length**. Doubling resolution → 4× tokens → 16× attention compute and memory.

Modern kernels like [FlashAttention](wiki:FlashAttention) avoid ever storing the full matrix, which fixes the memory problem but not the compute. Hierarchical designs like Swin[^swin] restrict attention to local windows to stay affordable at high resolution.`,
    },
    {
      id: 'calc-n2', type: 'numeric', title: 'How big is the attention matrix?',
      question: 'DINOv2 at 518 × 518 with patch size 14 produces 1369 patch tokens (ignore the CLS token). How many entries does one head’s attention matrix have?',
      answer: 1874161, tolerance: 0,
      hint: '$1369^2$',
      explain: '$1369^2 = 1{,}874{,}161$ — per head, per layer. [ViT-L](wiki:Vision transformer) has 16 heads × 24 layers. That is why high-resolution inference with big ViTs gets expensive fast — you’ll compute what fits on a [4090](wiki:GeForce 40 series|Nvidia-GeForce-40-Serie) in the last stage.',
    },
    {
      id: 'mission', type: 'callout', tone: 'mission', title: 'Attention is why DINO features “know” the whole watch',
      md: `
In a ViT, the patch token on the tip of the minute hand can, in one layer, attend to the dial center, the minute track and the other hand. Its output [[embedding]] therefore encodes *context*: "I'm the tip of the long hand", not just "dark thin bar". That's the property you want for part segmentation — and why DINO-family patch features are so much better for dense tasks than raw [CNN](wiki:Convolutional neural network|Convolutional Neural Network) features of the same size.

The flip side: context can also *mislead*. A patch in a render with a perfectly clean, reflection-free crystal "sees" a globally different image than a patch in a real photo with glare — so even locally identical regions get different features. Keep that in mind for the domain-gap lesson.`,
    },
    {
      id: 'quiz', type: 'quiz', title: 'Check yourself',
      question: 'Which statements about self-attention are true?',
      options: [
        { text: 'The attention weights of one query sum to 1.', correct: true, why: 'They are a softmax over the row.' },
        { text: 'The attention weights are learned parameters fixed after training.', correct: false, why: 'The *projections* $W_Q, W_K, W_V$ are fixed; the weights $A$ are computed from the input every time.' },
        { text: 'Without positional information, shuffling the patches just shuffles the outputs.', correct: true, why: 'Self-attention is permutation-equivariant; positions must be added explicitly (next lesson).' },
        { text: 'Dividing by $\\sqrt{d_k}$ keeps the softmax from saturating.', correct: true, why: 'It normalizes the variance of the dot products to about 1.' },
        { text: 'Doubling the image side length doubles the attention cost.', correct: false, why: 'Tokens ×4, attention entries ×16.' },
      ],
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>English</th><th>Deutsch</th><th>Notation</th></tr>
<tr><td>attention</td><td>Aufmerksamkeit</td><td></td></tr>
<tr><td>query, key, value</td><td>Anfrage, Schlüssel, Wert</td><td>$Q, K, V$</td></tr>
<tr><td>transpose</td><td>Transponierte</td><td>$K^\\top$ (DE auch $K^T$)</td></tr>
<tr><td>weighted average</td><td>gewichtetes Mittel</td><td>$\\sum_j A_{ij} v_j$</td></tr>
<tr><td>row-wise</td><td>zeilenweise</td><td></td></tr>
<tr><td>variance</td><td>Varianz</td><td>$\\mathrm{Var}(q\\cdot k) = d_k$</td></tr>
<tr><td>permutation equivariant</td><td>permutationsäquivariant</td><td></td></tr>
<tr><td>quadratic complexity</td><td>quadratische Komplexität</td><td>$\\mathcal{O}(N^2)$</td></tr></table>`,
    },
    {
      id: 'recall', type: 'recall', title: 'Explain it',
      prompt: 'Explain self-attention to a colleague who knows convolutions: what are $Q$, $K$, $V$, what is computed, and what is the key difference to a convolution?',
      answer: `Each token (patch) is projected by three learned matrices into a query (what it looks for), a key (what it offers), and a value (the information it passes on). The dot products of one query with all keys, scaled by $1/\\sqrt{d_k}$ and softmaxed, give weights that sum to 1; the token's output is the weighted sum of all values. Unlike a convolution — fixed weights over a small local window — attention weights are **computed from the content** of the tokens and can connect **any two positions** in a single layer. The price is $N^2$ cost in the number of tokens.`,
      hints: ['Library analogy: what you search for, the label on the book, the book’s content.', 'Are the attention weights the same for every image?'],
      cards: ['qkv-roles', 'att-vs-conv'],
    },
  ],
  cards: [
    { id: 'att-formula', front: 'Scaled dot-product attention formula', back: '$\\mathrm{softmax}\\!\\left(\\frac{QK^\\top}{\\sqrt{d_k}}\\right)V$' },
    { id: 'qkv-roles', front: 'Roles of query, key and value', back: 'Query: what a token looks for. Key: what a token offers for matching. Value: the information it passes on when attended to.' },
    { id: 'sqrt-dk', front: 'Why divide attention scores by $\\sqrt{d_k}$?', back: 'Dot products of $d_k$-dim vectors have variance ≈ $d_k$; large scores saturate the softmax (near one-hot, vanishing gradients). Scaling restores variance ≈ 1.' },
    { id: 'att-vs-conv', front: 'Key difference between attention and convolution', back: 'Attention weights are computed from content and can be global; conv weights are fixed after training and local.' },
    { id: 'mha', front: 'What does multi-head attention do?', back: 'Runs $h$ attention operations in parallel in $D/h$-dim subspaces with separate projections, concatenates them and mixes with $W_O$ — several relations at once.' },
    { id: 'n2', front: 'How does attention cost scale with image side length (fixed patch size)?', back: 'Tokens grow with side², attention with tokens² → side⁴. Doubling resolution ≈ 16× attention compute.' },
    { id: 'self-cross', front: 'Self-attention vs cross-attention', back: 'Self: Q, K, V from the same token set. Cross: queries from one set (e.g. prompts, object queries), keys/values from another (image features).' },
    { id: 'dk-vitb', front: 'ViT-B: token width, heads, head width', back: '$D = 768$, 12 heads, $d_k = 64$.' },
  ],
};
