// Glossary terms introduced in stage 6-dino. See CLAUDE.md for the term format.
export default [
  {
    id: 'dinov2', term: 'DINOv2', de: 'DINOv2', cat: 'ml',
    short: 'Meta’s 2023 self-supervised ViT family (S/B/L/g, patch 14) trained on 142M curated images; the first “all-purpose” frozen visual features.',
    long: `Self-supervised Vision Transformers from Meta AI (2023). Combines the image-level [[dino]] loss with the patch-level [[ibot]] loss, adds the [[koleo]] regularizer and Sinkhorn-Knopp [[centering]], and trains on **LVD-142M**, a dataset built by automatic [[data-curation]]. A ViT-g/14 (1.1B parameters) is trained first; ViT-S/B/L are obtained by [[knowledge-distillation]]. Released under Apache 2.0. Later versions with [[registers]] ("_reg") give cleaner dense features.`,
    related: ['dino', 'ibot', 'koleo', 'data-curation', 'knowledge-distillation', 'dinov3'],
  },
  {
    id: 'data-curation', term: 'Data curation', de: 'Datenkuratierung', cat: 'ml',
    short: 'Automatically selecting a balanced, deduplicated training set from a huge raw image pool — by embedding similarity, not by labels.',
    long: `Building a training set by *selecting* from a raw pool instead of labelling. In DINOv2: deduplicate (copy detection), embed all images with a self-supervised model, then retrieve nearest neighbours of curated seed datasets and use k-means clusters to balance concepts — 1.2B web images → 142M. DINOv3 scales this to ~17B raw images → 1.689B (clustering-based + retrieval-based + raw datasets). Curation fights the long tail: raw web data is dominated by a few concepts.`,
    related: ['dinov2', 'dinov3', 'embedding'],
  },
  {
    id: 'koleo', term: 'KoLeo regularizer', inline: 'KoLeo regularizer', de: 'KoLeo-Regularisierer (Kozachenko-Leonenko-Entropieschätzer)', cat: 'ml',
    short: 'A loss $-\\tfrac1n\\sum_i \\log d_{n,i}$ that pushes each feature away from its nearest neighbour in a batch, spreading features uniformly.',
    symbol: '$\\mathcal{L}_{\\text{KoLeo}} = -\\frac{1}{n}\\sum_{i=1}^{n} \\log d_{n,i},\\quad d_{n,i} = \\min_{j\\neq i}\\lVert \\mathbf{x}_i - \\mathbf{x}_j \\rVert$',
    long: `Derived from the Kozachenko–Leonenko differential-entropy estimator. For L2-normalized features $\\mathbf{x}_i$ in a batch, $d_{n,i}$ is the distance to the nearest other feature; minimizing $-\\frac1n\\sum \\log d_{n,i}$ penalizes features that crowd together. Effect: features use the whole space, which helps nearest-neighbour retrieval. Used in DINOv2 and DINOv3 (weight 0.1).`,
    related: ['dinov2', 'collapse', 'unit-vector', 'entropy'],
  },
  {
    id: 'knowledge-distillation', term: 'Knowledge distillation', de: 'Wissensdestillation', cat: 'ml', aka: ['distillation'],
    short: 'Training a smaller “student” model to reproduce the outputs of a large, frozen “teacher” model.',
    long: `A large model (teacher) is trained first and frozen; a smaller model (student) is trained to match its outputs. DINOv2 distills ViT-g into ViT-S/B/L; DINOv3 distills its 7B model into ViT-S, S+, B, L, H+ and ConvNeXt T/S/B/L. Distilled students beat the same architectures trained from scratch — they inherit what the giant learned from billions of images. Not the same as [[self-distillation]], where the teacher is an EMA copy of the student itself.`,
    related: ['teacher-student', 'self-distillation', 'dinov2', 'dinov3'],
  },
  {
    id: 'registers', term: 'Register tokens', inline: 'register tokens', de: 'Register-Token', cat: 'ml', aka: ['registers'],
    short: 'A few extra learnable tokens appended to a ViT’s input and discarded at the output; they absorb global computation so patch tokens stay clean.',
    long: `Extra learnable input tokens (like the [[cls-token]]) that the network can use as scratch memory; they are thrown away at the output. Darcet et al. showed large ViTs otherwise hijack uninformative background patches for global computation, producing [[high-norm-tokens]]. With registers (4 recommended, <2% extra FLOPs) the artifacts disappear, attention maps are clean and dense tasks improve. DINOv3 uses 4 registers by default.`,
    related: ['high-norm-tokens', 'cls-token', 'vit', 'dinov2'],
  },
  {
    id: 'high-norm-tokens', term: 'High-norm artifact tokens', inline: 'high-norm tokens', de: 'Artefakt-Token mit hoher Norm', cat: 'ml', aka: ['attention artifacts', 'outlier tokens'],
    short: 'Output tokens with ~10× the usual norm that appear in redundant background patches of large ViTs; they carry global instead of local information.',
    long: `About 2% of the output tokens of large (≥ ViT-L), long-trained ViTs such as DINOv2, OpenCLIP and DeiT-III have a [[norm]] roughly 10× higher than the rest. They sit on patches that look like their neighbours (background, sky), appear mid-network and after about a third of training, hold little local information (bad at predicting their own position or pixels) but a lot of global information. They show up as spikes in attention maps and PCA plots. Fix: [[registers]].`,
    related: ['registers', 'norm', 'attention'],
  },
  {
    id: 'dinov3', term: 'DINOv3', de: 'DINOv3', cat: 'ml',
    short: 'Meta’s 2025 successor: a 7B-parameter ViT (patch 16) trained on 1.7B curated images with Gram anchoring, distilled into a family of smaller ViTs and ConvNeXts.',
    long: `Self-supervised foundation model from Meta AI (2025). ViT-7B/16 (4096-dim, 40 blocks, RoPE, 4 [[registers]]) trained on **LVD-1689M** with DINO + iBOT + KoLeo losses and constant hyper-parameter schedules. New: [[gram-anchoring]] to stop [[dense-features]] from degrading in long training, a high-resolution adaptation phase, [[knowledge-distillation]] into ViT-S/S+/B/L/H+ and ConvNeXt-T/S/B/L, a satellite variant (SAT-493M) and a text-aligned version. Frozen, it reaches 55.9 mIoU with a linear head on ADE20k. Released under the custom *DINOv3 License*.`,
    related: ['dinov2', 'gram-anchoring', 'registers', 'dense-features', 'knowledge-distillation'],
  },
  {
    id: 'gram-matrix', term: 'Gram matrix', de: 'Gram-Matrix', cat: 'math',
    short: 'The matrix of all pairwise dot products of a set of vectors: $G = XX^\\top$, $G_{ij} = \\mathbf{x}_i\\cdot\\mathbf{x}_j$.',
    symbol: '$G = XX^\\top \\in \\mathbb{R}^{P\\times P}$ for $X \\in \\mathbb{R}^{P\\times d}$',
    long: `Stack $P$ vectors as rows of $X$; then $G = XX^\\top$ holds every pairwise [[dot-product]]. With L2-normalized rows, $G_{ij}$ is the [[cosine-similarity]] of vectors $i$ and $j$. It describes the *similarity structure* of a set while ignoring rotations of the feature space — which is exactly what [[gram-anchoring]] constrains. (Named after Jørgen Pedersen Gram; in German: *Gram-Matrix* or *Gramsche Matrix*.)`,
    related: ['dot-product', 'cosine-similarity', 'gram-anchoring', 'matrix-multiplication'],
  },
  {
    id: 'gram-anchoring', term: 'Gram anchoring', inline: 'Gram anchoring', de: 'Gram-Verankerung', cat: 'ml',
    short: 'DINOv3’s loss $\\lVert X_S X_S^\\top - X_G X_G^\\top\\rVert_F^2$: keep the student’s patch-similarity structure close to that of an earlier “Gram teacher”.',
    symbol: '$\\mathcal{L}_{\\text{Gram}} = \\lVert X_S X_S^\\top - X_G X_G^\\top \\rVert_F^2$',
    long: `Introduced in DINOv3. Long training makes global metrics improve while patch features become noisy and similar to the CLS token. Gram anchoring compares the [[gram-matrix|Gram matrices]] of L2-normalized patch features of the student ($X_S$) and of a *Gram teacher* ($X_G$, an earlier EMA checkpoint with good dense features, refreshed every 10k iterations) using the squared Frobenius norm. Because only similarities are matched, the features themselves may still move. A high-resolution variant feeds the Gram teacher 2× resolution images and downsamples its features for smoother targets.`,
    related: ['gram-matrix', 'dinov3', 'dense-features', 'ema'],
  },
  {
    id: 'dense-features', term: 'Dense features', de: 'dichte Merkmale (Patch-Merkmale)', cat: 'ml', aka: ['patch features', 'local features'],
    short: 'One feature vector per image location (per patch) rather than one per image — the input for segmentation, depth and correspondence.',
    long: `A feature map with one vector per spatial position, e.g. a $H/16 \\times W/16 \\times d$ grid from a ViT with [[patch-size]] 16. Needed for pixel-level tasks: [[semantic-segmentation]], depth, matching. Their quality is measured with frozen-backbone linear segmentation (ADE20k mIoU) or keypoint correspondence. Contrast with the *global* [[cls-token]] embedding used for classification and retrieval.`,
    related: ['embedding', 'patch-size', 'semantic-segmentation', 'gram-anchoring', 'feature-upsampling'],
  },
  {
    id: 'frozen-backbone', term: 'Frozen backbone', de: 'eingefrorenes Backbone', cat: 'ml',
    short: 'Using a pretrained feature extractor without updating its weights; only a small head on top is trained.',
    long: `The [[backbone]] weights are fixed (\`requires_grad=False\`); you train only a head — a linear layer, an MLP or a light decoder. Cheap (features can even be precomputed and cached), data-efficient and robust against overfitting a small labelled set. DINOv2/v3 are explicitly designed and evaluated this way. Its limit: the backbone cannot adapt to domain specifics (e.g. rendered vs. photographed watches) — then consider [[lora]] or [[fine-tuning]].`,
    related: ['backbone', 'fine-tuning', 'linear-probe', 'lora'],
  },
  {
    id: 'fine-tuning', term: 'Fine-tuning', de: 'Feinabstimmung (Fine-Tuning)', cat: 'ml',
    short: 'Continuing to train a pretrained model’s weights on your own task and data.',
    long: `Updating some or all pretrained weights on the target task, usually with a small learning rate. Full fine-tuning adapts best but needs the most memory (weights + gradients + optimizer states, ~16 bytes/parameter with AdamW in mixed precision) and enough labelled data to avoid forgetting the general features. Middle grounds: fine-tune only the last blocks, or parameter-efficient methods like [[lora]].`,
    related: ['frozen-backbone', 'lora', 'overfitting', 'vram'],
  },
  {
    id: 'feature-upsampling', term: 'Feature upsampling', de: 'Merkmals-Hochskalierung', cat: 'ml',
    short: 'Increasing the spatial resolution of a coarse feature map (e.g. 1/16 of the image) so that thin structures can be resolved.',
    long: `ViT features live on a coarse grid (one vector per 14×14 or 16×16 pixels). Ways to get finer maps: bilinear interpolation (cheap, blurry), running the backbone at higher input resolution (cost grows quadratically in tokens), sliding-window tiling, decoders that fuse image-resolution skip connections, or learned, model-agnostic upsamplers such as FeatUp. Crucial for thin objects — like watch hands.`,
    related: ['dense-features', 'patch-size', 'u-net'],
  },
];
