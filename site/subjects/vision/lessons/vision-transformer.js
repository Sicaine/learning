export default {
  id: 'vision-transformer',
  title: 'The Vision Transformer (ViT)',
  summary: 'In 2020 a paper titled “An Image is Worth 16x16 Words” showed that you can drop convolutions almost entirely: cut the image into patches, treat them like words, and run a standard [[transformer]]. This is the architecture of DINO, DINOv2, DINOv3, SAM and CLIP — so it is worth knowing down to the tensor shapes.',
  minutes: 35,
  goals: [
    'Walk through a ViT from pixels to patch features, with shapes',
    'Compute token counts for any resolution and [[patch-size]]',
    'Explain the [[cls-token|CLS token]] and [[positional-embedding|positional embeddings]] (and why they get interpolated)',
    'Read model names like ViT-L/14 and know their rough size',
    'Judge what patch size means for thin structures in your watch images',
  ],
  blocks: [
    {
      id: 'idea', type: 'text', title: 'Images as sequences of patches',
      md: `
Transformers process a set of [[token|tokens]]. Text has natural tokens (word pieces). For images, the [ViT](wiki:Vision transformer)[^vit] makes its own:

1. **Patchify.** Cut the $H \\times W \\times 3$ image into non-overlapping $P \\times P$ patches. With $P = 16$ and a 224 px image: a $14 \\times 14$ grid, $N = 196$ patches.
2. **[[patch-embedding|Patch embedding]].** Flatten each patch ($16 \\cdot 16 \\cdot 3 = 768$ numbers) and multiply by a learned matrix → a $D$-dimensional token. (In code this is a convolution with kernel size $P$ and stride $P$.)
3. **Add a [[cls-token|CLS token]]** — an extra learned token with no pixels, prepended to the sequence.
4. **Add [[positional-embedding|positional embeddings]]** — a learned vector per position, added to each token.
5. **Run $L$ transformer blocks.** Shapes never change: $(N + 1) \\times D$ in, $(N+1) \\times D$ out.
6. **Read out.** The CLS token's final state is the global image [[embedding]]; the $N$ patch tokens are **dense features** — one vector per patch.`,
    },
    {
      id: 'figure', type: 'figure', title: 'ViT data flow',
      html: `<svg viewBox="0 0 640 210" width="640" style="font-family:Inter;font-size:11.5px">
  <defs><marker id="vtA" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#74748c"/></marker></defs>
  <g transform="translate(10 40)">
    <rect width="110" height="110" rx="8" fill="#f4efe4" stroke="#d9d3c4"/>
    ${''}<g stroke="#5b5bd6" stroke-opacity=".5">${[1,2,3].map(i=>`<line x1="${i*27.5}" y1="0" x2="${i*27.5}" y2="110"/><line x1="0" y1="${i*27.5}" x2="110" y2="${i*27.5}"/>`).join('')}</g>
    <circle cx="55" cy="55" r="36" fill="none" stroke="#27336b" stroke-width="6"/>
    <text x="55" y="130" text-anchor="middle" fill="#3b3b55">image → P×P patches</text>
  </g>
  <line x1="130" y1="95" x2="160" y2="95" stroke="#74748c" marker-end="url(#vtA)"/>
  <g transform="translate(165 30)">
    ${[0,1,2,3,4,5,6].map(i=>`<rect x="0" y="${i*19}" width="70" height="15" rx="4" fill="${i===0?'#b14fd8':'#5b5bd6'}" fill-opacity="${i===0?0.85:0.25+i*0.08}"/>`).join('')}
    <text x="35" y="11" text-anchor="middle" fill="#fff" font-weight="600">CLS</text>
    <text x="35" y="152" text-anchor="middle" fill="#3b3b55">tokens (N+1)×D</text>
    <text x="35" y="166" text-anchor="middle" fill="#74748c">+ positions</text>
  </g>
  <line x1="245" y1="95" x2="275" y2="95" stroke="#74748c" marker-end="url(#vtA)"/>
  <g transform="translate(280 45)">
    <rect width="150" height="100" rx="12" fill="#fff" stroke="#d9d9e4"/>
    <rect x="12" y="14" width="126" height="30" rx="7" fill="#5b5bd6" fill-opacity=".14" stroke="#5b5bd6" stroke-opacity=".4"/>
    <text x="75" y="33" text-anchor="middle" fill="#16162a">LN → multi-head attention</text>
    <rect x="12" y="56" width="126" height="30" rx="7" fill="#b14fd8" fill-opacity=".12" stroke="#b14fd8" stroke-opacity=".4"/>
    <text x="75" y="75" text-anchor="middle" fill="#16162a">LN → MLP (4D, GELU)</text>
    <text x="75" y="120" text-anchor="middle" fill="#3b3b55">× L blocks (residual adds)</text>
  </g>
  <line x1="440" y1="95" x2="470" y2="95" stroke="#74748c" marker-end="url(#vtA)"/>
  <g transform="translate(478 30)">
    <rect x="0" y="0" width="150" height="34" rx="8" fill="#b14fd8" fill-opacity=".14"/>
    <text x="75" y="21" text-anchor="middle" fill="#16162a">CLS → image embedding</text>
    <rect x="0" y="48" width="150" height="100" rx="8" fill="#5b5bd6" fill-opacity=".1"/>
    <g fill="#5b5bd6">${[0,1,2,3,4,5].map(r=>[0,1,2,3,4,5,6,7].map(c=>`<rect x="${14+c*16}" y="${58+r*14}" width="12" height="10" rx="2" fill-opacity="${0.2+((r*3+c*5)%7)/10}"/>`).join('')).join('')}</g>
    <text x="75" y="166" text-anchor="middle" fill="#3b3b55">patch tokens → dense features</text>
  </g>
</svg>`,
      caption: 'Shapes stay $(N+1) \\times D$ through all blocks. Unlike a CNN there is no downsampling: one token per patch from start to end.',
    },
    {
      id: 'block', type: 'text', title: 'Inside a transformer block',
      md: `
Each of the $L$ blocks does two things, each wrapped in a [[layer-norm]] and a residual add — the same $x + F(x)$ trick as ResNet:

$$x \\leftarrow x + \\mathrm{MHSA}(\\mathrm{LN}(x)), \\qquad x \\leftarrow x + \\mathrm{MLP}(\\mathrm{LN}(x))$$

- **[[multi-head-attention|MHSA]]** mixes information *between* tokens.
- The **[[mlp|MLP]]** (two linear layers, hidden width $4D$, [[gelu|GELU]] in between) processes each token *individually*.

That's the whole architecture. Everything else — DINO's losses, SAM's decoder, registers — is built around this backbone.`,
    },
    {
      id: 'sizes', type: 'text', title: 'Reading model names: ViT-S/14, ViT-L/16 …',
      md: `
"ViT-B/16" means *Base* size with patch size 16. The common sizes (B and L come from the original ViT paper;[^vit] S and g are the smaller/larger variants used by DINOv2[^dinov2]):

<table><tr><th>Model</th><th>Width D</th><th>Blocks L</th><th>Heads</th><th>Params</th></tr>
<tr><td>ViT-S</td><td>384</td><td>12</td><td>6</td><td>~22M</td></tr>
<tr><td>ViT-B</td><td>768</td><td>12</td><td>12</td><td>~86M</td></tr>
<tr><td>ViT-L</td><td>1024</td><td>24</td><td>16</td><td>~300M</td></tr>
<tr><td>ViT-g (DINOv2)</td><td>1536</td><td>40</td><td>24</td><td>~1.1B</td></tr></table>

**Patch size** is the other knob. The original ViT used 16. **DINOv2 uses 14** (so a 224 px image gives $16 \\times 16 = 256$ patches) and is typically run at 518 px for dense tasks ($37 \\times 37$).[^dinov2] **DINOv3 goes back to 16** for its whole family, from ViT-S/16 up to ViT-7B/16.[^dinov3]`,
    },
    {
      id: 'calc-tokens', type: 'numeric', title: 'Token count',
      question: 'How many patch tokens does a ViT with patch size 16 produce for a $1024 \\times 1024$ image?',
      answer: 4096, tolerance: 0,
      hint: '$(1024/16)^2$',
      explain: '$64 \\times 64 = 4096$ tokens — 21× the 196 tokens at 224 px, and about $21^2 \\approx 436\\times$ the attention cost.',
    },
    {
      id: 'calc-embed', type: 'numeric', title: 'Patch-embedding parameters',
      question: 'The patch embedding of ViT-B/16 maps each flattened $16\\times16\\times3$ patch to $D=768$ (with bias). How many parameters does it have?',
      answer: 590592, tolerance: 0,
      hint: 'Inputs per patch: $16\\cdot16\\cdot3$. Weights: inputs × 768. Plus 768 biases.',
      explain: '$768 \\cdot 768 + 768 = 590{,}592$. Tiny compared to the 86M of the whole model — nearly all capacity lives in the transformer blocks.',
    },
    {
      id: 'viz', type: 'viz', viz: 'patchify', title: 'Patchify your watch',
      intro: 'Change input resolution and patch size. The right panel shows 3 × 3 patches near the second hand at the true input resolution — each square becomes *one* token vector.',
      task: 'Reach all three goals. Then answer for yourself: what happens to the token count and cost when you make the second hand half a patch wide?',
    },
    {
      id: 'positions', type: 'text', title: 'Positions, and running at other resolutions',
      md: `
[[self-attention|Self-attention]] has no idea where tokens are — shuffle the patches and the outputs just shuffle along. So the ViT adds a **[[positional-embedding]]** to every token: a learned vector for grid position $(r, c)$.

Those embeddings are learned for one grid size (e.g. $16 \\times 16$). To run at 518 px ($37 \\times 37$), implementations **[interpolate](wiki:Interpolation|Interpolation (Mathematik))** the position table to the new grid. That works surprisingly well — within limits. Models are therefore often trained briefly at high resolution at the end of pretraining (DINOv2 does this) so that high-resolution features are reliable. Newer models (including DINOv3) use rotary position embeddings (RoPE), which extrapolate more gracefully to different resolutions.[^dinov3]`,
    },
    {
      id: 'bias', type: 'callout', tone: 'insight', title: 'Inductive bias: why ViTs needed so much data',
      md: `
A CNN has a strong [inductive bias](wiki:Inductive bias|Induktive Verzerrung) — it is *built* to assume locality and translation equivariance. A ViT assumes almost nothing — it must *learn* that nearby patches matter, from data. The original ViT lost to [ResNets](wiki:Residual neural network) when trained on [ImageNet](wiki:ImageNet|ImageNet) (1.3M images) alone and only won when pretrained on 300M images.[^vit]

This is the deep reason self-supervised learning (next stage) matters so much for ViTs: it lets them learn from hundreds of millions of *unlabeled* images. It is also why you should almost never train a ViT from scratch on your 100k watch images — start from a pretrained backbone.`,
    },
    {
      id: 'match', type: 'match', title: 'Match the component to its role',
      pairs: [
        ['Patch embedding', 'Linear map from P×P×3 pixels to a D-dim token'],
        ['CLS token', 'Extra token whose output is the global image vector'],
        ['Positional embedding', 'Tells tokens where their patch sits in the grid'],
        ['MHSA', 'Mixes information between tokens'],
        ['MLP block', 'Processes each token individually'],
        ['Patch tokens at the output', 'Dense per-patch features for segmentation'],
      ],
    },
    {
      id: 'mission', type: 'callout', tone: 'mission', title: 'Patch size vs. your second hand',
      md: `
At 518 px with patch 14, a watch filling the frame has a second hand of roughly **3–4 px** — a quarter of a patch. There is no token "for" the second hand; it is a thin line crossing through a few patch vectors, which must encode it *implicitly* ("contains a thin dark line at ~216°, offset left").

What this means in practice:

1. **A linear head on patch features can only produce patch-resolution masks** (37 × 37 here). Thin parts need a decoder that upsamples and ideally sees the original pixels too ([U-Net](wiki:U-Net)-style skips, or [[feature-upsampling|feature upsampling]] methods).
2. **Crop instead of shrink.** If watches occupy only part of your 100k photos, first detect/crop the watch, then run the segmenter on the crop at full backbone resolution. That's often the cheapest big win.
3. **Resolution costs 4th power in attention.** Going from 518 to 1036 px buys 2× detail at ~16× attention cost — you'll quantify what fits on your 4090s in the last stage.`,
    },
    {
      id: 'quiz', type: 'quiz', title: 'Check yourself',
      question: 'Which statements about ViTs are true?',
      options: [
        { text: 'A ViT keeps the same number of tokens through all blocks.', correct: true, why: 'Unlike CNNs, plain ViTs never downsample.' },
        { text: 'DINOv2 on a 224 px image yields 196 patch tokens.', correct: false, why: 'Patch size 14 → $16 \\times 16 = 256$. 196 is for patch 16.' },
        { text: 'The patch embedding is equivalent to a convolution with kernel size P and stride P.', correct: true, why: 'Non-overlapping windows, one linear map per window.' },
        { text: 'ViTs have a stronger built-in locality bias than CNNs.', correct: false, why: 'Weaker — they must learn locality from data.' },
        { text: 'The CLS token has no pixels of its own and gathers information via attention.', correct: true, why: 'It is a learned vector prepended to the patch tokens.' },
      ],
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>English</th><th>Deutsch</th></tr>
<tr><td>patch</td><td>Bildausschnitt, Kachel (Patch)</td></tr>
<tr><td>to flatten</td><td>abflachen / in einen Vektor umformen</td></tr>
<tr><td>linear projection</td><td>lineare Abbildung (Projektion)</td></tr>
<tr><td>positional embedding</td><td>Positionseinbettung</td></tr>
<tr><td>interpolation</td><td>Interpolation</td></tr>
<tr><td>inductive bias</td><td>induktive Verzerrung / Vorannahme</td></tr>
<tr><td>width, depth</td><td>Breite, Tiefe (des Netzes)</td></tr></table>`,
    },
    {
      id: 'recall', type: 'recall', title: 'Explain it',
      prompt: 'Describe the path of a $518\\times518$ watch image through DINOv2 ViT-L/14 with **shapes**: patches, tokens, blocks, and what you get out.',
      answer: `The image is cut into $14 \\times 14$ patches: $518/14 = 37$ per side, $N = 1369$ patches of $14\\cdot14\\cdot3 = 588$ values. The patch embedding maps each to $D = 1024$ → $1369 \\times 1024$. A CLS token (plus, for the register variants, a few register tokens) is prepended and interpolated positional embeddings are added. 24 transformer blocks (16 heads, MLP width 4096) keep the shape $(1370) \\times 1024$. Output: the CLS vector (1024-d global embedding) and a $37 \\times 37 \\times 1024$ grid of patch features — the dense features a segmentation head works on.`,
      hints: ['518 / 14 = ?', 'ViT-L width is 1024.'],
      cards: ['vitl-shapes'],
    },
  ],
  cards: [
    { id: 'vit-steps', front: 'The ViT pipeline in 5 steps', back: 'Patchify → linear patch embedding → prepend CLS + add positional embeddings → L transformer blocks → CLS = global embedding, patch tokens = dense features.' },
    { id: 'tokens', front: 'Number of patch tokens for an $H\\times W$ image with patch size $P$', back: '$(H/P)(W/P)$ — e.g. 224/16 → 196, 224/14 → 256, 518/14 → 1369.' },
    { id: 'sizes', front: 'Width D of ViT-S, ViT-B, ViT-L, ViT-g', back: '384, 768, 1024, 1536 (≈22M, 86M, 300M, 1.1B parameters).' },
    { id: 'patch-sizes', front: 'Patch size of DINOv2 vs DINOv3', back: 'DINOv2: 14. DINOv3: 16 (like the original ViT).' },
    { id: 'pos-interp', front: 'What must happen to learned positional embeddings when running a ViT at a new resolution?', back: 'They are interpolated to the new patch grid (e.g. 16×16 → 37×37).' },
    { id: 'vit-block', front: 'Formulas of a pre-norm transformer block', back: '$x \\leftarrow x + \\mathrm{MHSA}(\\mathrm{LN}(x))$, then $x \\leftarrow x + \\mathrm{MLP}(\\mathrm{LN}(x))$.' },
    { id: 'vit-data', front: 'Why did ViTs need far more data than CNNs?', back: 'Weak inductive bias: they must learn locality and translation structure from data. Self-supervised pretraining on huge unlabeled sets solves this.' },
    { id: 'vitl-shapes', front: 'DINOv2 ViT-L/14 at 518 px: shape of the patch-feature output', back: '$37 \\times 37 \\times 1024$ (1369 patch tokens of width 1024), plus a 1024-d CLS vector.' },
    { id: 'crop', front: 'Cheapest big win for thin watch parts with a ViT backbone?', back: 'Detect and crop the watch, then segment the crop at full backbone resolution instead of shrinking the whole photo.' },
  ],
};
