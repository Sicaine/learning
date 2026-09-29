// Glossary terms introduced in stage 4-transformers. See CLAUDE.md for the term format.
export default [
  {
    id: 'token', term: 'Token', de: 'Token', cat: 'ml',
    short: 'One element of the sequence a Transformer processes — a word piece in text, an image patch in vision.',
    long: `Transformers operate on a set of $N$ vectors of width $D$, the tokens. A ViT turns a $518\\times518$ image with [[patch-size]] 14 into $37 \\cdot 37 = 1369$ patch tokens, plus a [[cls-token]] (and, in DINOv2/v3, [[registers]]).`,
    related: ['patch-embedding', 'cls-token', 'transformer'],
  },
  {
    id: 'attention', term: 'Attention', de: 'Aufmerksamkeit (Attention)', cat: 'ml',
    short: 'Each token computes a weighted average of other tokens’ values, with weights from a softmax over query–key dot products.',
    symbol: '$\\mathrm{Attention}(Q,K,V) = \\mathrm{softmax}\\!\\left(\\dfrac{QK^\\top}{\\sqrt{d_k}}\\right) V$',
    long: `The core operation of Transformers. Every token emits a query, a key and a value ([[query-key-value]]). Query·key [[dot-product|dot products]], scaled by $1/\\sqrt{d_k}$ and passed through a [[softmax]], give weights that sum to 1; the output is the weighted sum of values. Unlike [[convolution]], the weights depend on *content* and can span the whole image in one layer. Cost grows with $N^2$.`,
    related: ['self-attention', 'query-key-value', 'multi-head-attention', 'softmax', 'dot-product'],
  },
  {
    id: 'self-attention', term: 'Self-attention', de: 'Selbstaufmerksamkeit (Self-Attention)', cat: 'ml',
    short: 'Attention where queries, keys and values all come from the same set of tokens — the image attends to itself.',
    long: `In self-attention, $Q = XW_Q$, $K = XW_K$, $V = XW_V$ are all computed from the same token matrix $X$. In **cross-attention**, queries come from one set (e.g. object queries in Mask2Former, or SAM's prompt tokens) and keys/values from another (the image features).`,
    related: ['attention', 'query-key-value'],
  },
  {
    id: 'query-key-value', term: 'Query, key, value', de: 'Anfrage, Schlüssel, Wert (Q, K, V)', cat: 'ml', inline: 'queries, keys and values', aka: ['Q, K, V'],
    short: 'Three learned projections of each token: the query asks, keys are matched against it, values are what gets mixed.',
    long: `Each token $x$ is multiplied by three learned [[matrix|matrices]]: $q = xW_Q$ ("what am I looking for?"), $k = xW_K$ ("what do I offer to be found by?"), $v = xW_V$ ("what information do I pass on?"). Separating *matching* (q·k) from *content* (v) is what makes attention flexible.`,
    related: ['attention', 'self-attention', 'matrix-multiplication'],
  },
  {
    id: 'multi-head-attention', term: 'Multi-head attention', de: 'Mehrkopf-Attention', cat: 'ml', aka: ['MHSA', 'attention heads'],
    short: 'Run several attention operations (“heads”) in parallel on smaller slices of the vector, then concatenate.',
    long: `With width $D$ and $h$ heads, each head works in $d_k = D/h$ dimensions with its own $W_Q, W_K, W_V$. Different heads learn different relations (nearby texture, same object, symmetric part…). Outputs are concatenated and mixed by $W_O$. ViT-B: $D=768$, 12 heads of 64 dims.`,
    related: ['attention', 'transformer'],
  },
  {
    id: 'transformer', term: 'Transformer', de: 'Transformer', cat: 'ml',
    short: 'A network built from repeated blocks of multi-head self-attention and an MLP, each wrapped in a residual connection with layer norm.',
    long: `One (pre-norm) block: $x \\leftarrow x + \\mathrm{MHSA}(\\mathrm{LN}(x))$, then $x \\leftarrow x + \\mathrm{MLP}(\\mathrm{LN}(x))$. The token count and width stay constant through all blocks. Introduced for translation (2017), now the architecture of LLMs, ViTs, DINO, SAM and CLIP.`,
    related: ['attention', 'multi-head-attention', 'layer-norm', 'skip-connection', 'mlp', 'vit'],
  },
  {
    id: 'vit', term: 'ViT (Vision Transformer)', de: 'ViT (Vision Transformer)', cat: 'ml', inline: 'ViT',
    short: 'A Transformer applied to images: cut the image into patches, embed each as a token, add positions, run Transformer blocks.',
    long: `Introduced in 2020 ("An Image is Worth 16x16 Words"). Sizes: **ViT-S** (D=384, 12 blocks, ~22M params), **ViT-B** (768, 12, ~86M), **ViT-L** (1024, 24, ~300M), **ViT-g** (1536, 40, ~1.1B, used by DINOv2). Notation "ViT-B/16" = Base with [[patch-size]] 16. The backbone of DINO, DINOv2, DINOv3, SAM and CLIP.`,
    related: ['transformer', 'patch-embedding', 'patch-size', 'cls-token', 'positional-embedding'],
  },
  {
    id: 'patch-embedding', term: 'Patch embedding', de: 'Patch-Einbettung', cat: 'ml',
    short: 'The first ViT layer: flatten each P×P×3 patch and project it linearly to a D-dimensional token.',
    long: `A linear map from $P^2 \\cdot 3$ pixel values to $D$ dimensions — implemented as a [[convolution]] with kernel size $P$ and [[stride]] $P$. ViT-B/16: $16\\cdot16\\cdot3 = 768$ inputs → 768 outputs. Everything finer than one patch must be encoded *inside* that single vector.`,
    related: ['vit', 'patch-size', 'token', 'embedding'],
  },
  {
    id: 'positional-embedding', term: 'Positional embedding', de: 'Positionseinbettung (Positionskodierung)', cat: 'ml', aka: ['position encoding'],
    short: 'A vector added to each token that tells the Transformer where the patch came from — attention itself ignores order.',
    long: `Self-attention is permutation-invariant: shuffle the patches and the outputs shuffle identically. Positional embeddings (learned, sinusoidal, or rotary like RoPE) inject location. Learned ViT position tables are **interpolated** when you run the model at a different resolution than it was trained on.`,
    related: ['token', 'vit', 'attention'],
  },
  {
    id: 'cls-token', term: 'CLS token', de: 'CLS-Token (Klassifikations-Token)', cat: 'ml', inline: 'CLS token',
    short: 'An extra learned token prepended to the patch tokens; its final state serves as the global image embedding.',
    long: `Has no pixels of its own; through [[attention]] it gathers information from all patches. Its output is used for classification or as the image-level [[embedding]]. In DINO its attention map over the patches famously outlines the main object.`,
    related: ['token', 'vit', 'embedding'],
  },
  {
    id: 'patch-size', term: 'Patch size', de: 'Patch-Größe (Kachelgröße)', cat: 'ml',
    short: 'The side length P of the square image tiles a ViT turns into tokens — commonly 16 or 14 pixels.',
    long: `Sets the trade-off between detail and cost: $N = (H/P)(W/P)$ tokens, and attention costs $\\propto N^2$. Halving P gives 4× the tokens and ~16× the attention cost. Original ViT and DINOv3 use 16; DINOv2 uses 14 ($224/14 = 16$ patches per side).`,
    related: ['patch-embedding', 'vit', 'token'],
  },
];
