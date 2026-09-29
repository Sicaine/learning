export default {
  id: 'using-features',
  title: 'Using foundation features in practice',
  summary: 'You have a DINOv2/v3 checkpoint and a folder of watch photos. What now? This lesson is the practical bridge: the ladder of adaptation options, how to look at features with PCA, how a linear segmentation head works — and the resolution trap that thin watch hands set for patch-based models.',
  minutes: 35,
  goals: [
    'Order the adaptation options from k-NN to full [[fine-tuning]] by cost and data need',
    'Extract CLS and patch features correctly and budget their storage',
    'Read a PCA visualization of patch features and use it as a diagnostic',
    'Explain how a linear head turns patch features into a segmentation map',
    'Quantify how thin structures relate to [[patch-size]] and pick a resolution',
  ],
  blocks: [
    {
      id: 'ladder', type: 'text', title: 'The adaptation ladder',
      md: `
Foundation features are meant to be used with as little training as possible. Climb the ladder only as far as your results require:

<table><tr><th>Rung</th><th>What you train</th><th>Labels needed</th><th>Good for</th></tr>
<tr><td>1. k-NN / similarity</td><td>nothing</td><td>a few examples</td><td>retrieval, sanity checks, finding near-duplicates</td></tr>
<tr><td>2. Linear probe</td><td>one linear layer on frozen features</td><td>hundreds–thousands</td><td>measuring feature quality; surprisingly strong segmentation</td></tr>
<tr><td>3. Light head / decoder</td><td>MLP, DPT- or Mask2Former-style decoder on a [[frozen-backbone]]</td><td>thousands</td><td>production-quality dense prediction</td></tr>
<tr><td>4. Parameter-efficient tuning</td><td>[[lora]] adapters or the last few blocks</td><td>thousands+</td><td>closing a domain gap (renders vs photos)</td></tr>
<tr><td>5. Full fine-tuning</td><td>everything</td><td>many, diverse</td><td>last few points; risk of forgetting general features</td></tr></table>

DINOv2 and DINOv3 report almost everything on rungs 1–3 on purpose: the features are the product.[^dinov2][^dinov3] Each rung up costs more memory, more labels and more risk of [[overfitting]] — and on your data it may or may not pay off. Measure, don't assume.`,
    },
    {
      id: 'order-ladder', type: 'order', title: 'Fewest to most trainable parameters',
      prompt: 'Order these setups for a ViT-L backbone from **fewest** to **most** trainable parameters.',
      items: [
        'k-NN on frozen patch features',
        'Linear segmentation head on frozen features',
        'Mask2Former-style decoder on frozen features',
        'LoRA adapters in all attention layers + decoder',
        'Full fine-tuning of backbone + decoder',
      ],
      explain: 'k-NN trains nothing; a linear head for 8 classes on 1024-dim features has ~8k parameters; a decoder has millions; LoRA adds a few million to the backbone; full fine-tuning updates all ~300M.',
    },
    {
      id: 'extract', type: 'text', title: 'Extracting features without bugs',
      md: `
With Hugging Face Transformers (DINOv3 checkpoints require accepting the license on the Hub first):[^hf-dinov3]

\`\`\`python
import torch
from transformers import AutoImageProcessor, AutoModel

name = "facebook/dinov3-vitl16-pretrain-lvd1689m"
proc = AutoImageProcessor.from_pretrained(name)
model = AutoModel.from_pretrained(name, torch_dtype=torch.float16).cuda().eval()

inputs = proc(images=img, return_tensors="pt", size={"height": 768, "width": 768}).to("cuda", torch.float16)
with torch.inference_mode():
    h = model(**inputs).last_hidden_state            # [1, 1 + 4 + N, 1024]
R = model.config.num_register_tokens                 # 4
cls = h[:, 0]                                        # global embedding
patches = h[:, 1 + R:].unflatten(1, (768 // 16, 768 // 16))   # [1, 48, 48, 1024]
\`\`\`

Three classic mistakes: forgetting the register tokens (off by 4), resizing to a size that is not a multiple of the patch size, and silently using the processor's default 224×224 when you meant high resolution.

**Storage budget:** one image at 768 px gives $48 \\times 48 \\times 1024$ fp16 values ≈ 4.7 MB. For 100k images that is ~470 GB. Cache only what you need (a labelled subset, PCA-reduced features), or compute on the fly.`,
    },
    {
      id: 'pca-text', type: 'text', title: 'PCA: the first thing to look at',
      md: `
Patch features have 384–4096 dimensions — you cannot look at them directly. The standard trick from the DINO papers:[^dinov2]

1. Collect the patch features of one image (or several) as rows of a matrix: $N$ patches × $d$ dims.
2. Run **PCA** and keep the top 3 principal components.
3. Map component 1, 2, 3 to red, green, blue and paint each patch.

Because PCA finds the directions of largest variance, patches with similar features get similar colours. With a strong backbone you see the object separate from the background (often already in component 1) and **object parts get consistent colours across different images** — e.g. every dial the same hue. A common recipe: threshold component 1 to get a foreground mask, then run PCA again on the foreground patches only to reveal parts.

It is a *diagnostic*, not a model — but it tells you in five minutes whether the backbone "sees" the structure you want to segment.`,
    },
    {
      id: 'viz-pca', type: 'viz', viz: 'feature-pca', title: 'PCA of patch features on a watch',
      intro: 'Synthetic patch features: each patch is a mix of part prototypes (patches on a boundary mix several parts) plus noise.',
      task: 'Switch to **Foreground mask** and move the threshold until the mask separates watch from background with IoU ≥ 0.9. Then lower the backbone quality: at which point does PCA stop showing clean parts? Also try a coarse 12×12 grid — what happens to the hands?',
    },
    {
      id: 'linear-head', type: 'text', title: 'A linear head is a segmentation model',
      md: `
The simplest dense head applies the *same* linear map to every patch feature $\\mathbf{f}_{ij} \\in \\mathbb{R}^d$:

$$\\mathbf{z}_{ij} = W \\mathbf{f}_{ij} + \\mathbf{b}, \\qquad W \\in \\mathbb{R}^{C \\times d}$$

giving $C$ class [[logits]] per patch. Upsample the logit map bilinearly to image resolution, apply [[softmax]] per pixel and train with [[cross-entropy]] against the mask. Evaluate with [[miou|mIoU]].

That this works at all is remarkable: it means the classes are *linearly separable* in feature space — the backbone has already done the hard work. DINOv3-7B reaches 55.9 mIoU on ADE20k (150 classes) this way.[^dinov3] It is also your best **measurement instrument**: if a linear head can't separate "bezel" from "dial" on real photos, a fancier decoder may hide the problem but not solve it.`,
    },
    {
      id: 'calc-head', type: 'numeric', title: 'How small is a linear head?',
      question: 'A linear segmentation head on DINOv3 ViT-L/16 features (1024-dim) for 8 watch classes (background, strap, case, bezel, dial, hands, crown, indices). How many trainable parameters, including biases?',
      answer: 8200, tolerance: 0,
      hint: '$W$ is $8 \\times 1024$, plus one bias per class.',
      explain: '$8 \\cdot 1024 + 8 = 8{,}200$ parameters — you could train it on a CPU. Compare with ~300M in the backbone.',
    },
    {
      id: 'thin', type: 'text', title: 'The resolution trap: thin hands, fat patches',
      md: `
A ViT sees the world through its patch grid. With [[patch-size]] 16, one feature vector summarizes a 16×16-pixel square *of the resized input*. Anything much thinner than a patch gets blended with its surroundings in that one vector.

Watch hands are the worst case: long, thin, high-contrast lines. Suppose your photo is 1024 px wide and the seconds hand is 3 px wide, the minute hand 10 px. At the common 224–518 px input sizes, even the minute hand covers only a fraction of a patch width. The model may still *know* a hand passes through a patch — features are rich — but a linear head predicting one label per patch will draw it as a chunky staircase, or miss it.

The only honest fixes cost compute: tokens grow with resolution², attention with resolution⁴ — see the numbers in the visualization below.`,
    },
    {
      id: 'viz-res', type: 'viz', viz: 'patch-resolution', title: 'How many patches wide is a watch hand?',
      task: 'Find the smallest input resolution at which the **minute hand** is at least half a patch wide — first with patch 16, then with patch 14. Note the token count and attention cost you pay for it.',
    },
    {
      id: 'calc-sec', type: 'numeric', title: 'The seconds hand',
      question: 'The seconds hand is 3 px wide in a 1024-px photo. You resize to 512×512 and use patch size 16. How many patches wide is the seconds hand? (decimal)',
      answer: 0.094, tolerance: 0.003,
      hint: 'After resizing it is $3 \\cdot 512/1024$ px wide. Divide by the patch size.',
      explain: '$1.5 / 16 \\approx 0.094$ — less than a tenth of a patch. At patch level the seconds hand is essentially sub-pixel. You need higher resolution, a pixel-level decoder, or a separate refinement step for it.',
    },
    {
      id: 'fixes', type: 'text', title: 'Ways out for thin structures',
      md: `
- **Higher input resolution.** DINOv3 was adapted to 512–768 px and stays stable far beyond.[^dinov3] ViT-L at 1024 px = 4,096 tokens: fine for inference on a 4090, expensive for training.
- **Crop around the watch first.** Detect the watch, crop tightly, then run the segmenter at high resolution on the crop. Most of a product photo is background — don't spend tokens on it.
- **Tiling / sliding windows** over a high-resolution image, stitching the feature maps.
- **[[feature-upsampling|Feature upsampling]]:** learned, model-agnostic upsamplers like FeatUp turn coarse feature maps into high-resolution ones guided by the image.[^featup]
- **Decoders with image-resolution skip connections** (the [[u-net|U-Net]] idea): combine coarse semantic features with fine edges from early layers or the raw image.
- **Promptable refinement:** use the coarse DINO-based prediction as a prompt for a SAM-style model that is good at crisp boundaries (next stage).`,
    },
    {
      id: 'quiz-practice', type: 'quiz', title: 'Pick the right move',
      question: 'Your frozen DINOv3 ViT-L + linear head gives good dial and case masks on photos, but hands are blobby and renders score much higher than photos. Which conclusions are reasonable?',
      options: [
        { text: 'Blobby hands point to a resolution / patch-size limit rather than bad features.', correct: true, why: 'Thin structures are sub-patch; the head predicts one label per patch.' },
        { text: 'The gap between renders and photos suggests a domain gap worth measuring in feature space.', correct: true, why: 'Check whether render and photo patches of the same part are nearest neighbours.' },
        { text: 'The first fix should be full fine-tuning of the 7B model.', correct: false, why: 'Not feasible on 2× 4090, and not the cheapest fix. Try crops, resolution, a decoder, LoRA on ViT-L first.' },
        { text: 'Cropping to the watch before segmenting can help the hands at no extra token cost.', correct: true, why: 'The same token budget covers far fewer source pixels per patch.' },
      ],
    },
    {
      id: 'mission-plan', type: 'callout', tone: 'mission', title: 'A first week with your data',
      md: `
1. **PCA check (hour 1):** DINOv3 ViT-L/16 at 768 px on 20 real photos and 20 renders. Do parts get consistent colours across images? Across photos *and* renders?
2. **Domain-gap check:** for patches you label roughly (dial, bezel, hands), compute nearest neighbours across the render/photo divide. Low cross-domain agreement = generator problem, not model problem.
3. **Linear probe:** label ~200 real photos (or use renders + a small real set), train a linear head on frozen features, report per-class IoU. This is your baseline number.
4. **Crop-then-segment** and compare resolutions 512/768/1024 on the *hands* IoU specifically.
5. Only then decide on a decoder, LoRA, or distillation from the 7B model.

Each step is cheap on 2× 4090, and each one answers a concrete question before you spend days training.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>English</th><th>Deutsch</th></tr>
<tr><td>principal component analysis (PCA)</td><td>Hauptkomponentenanalyse</td></tr>
<tr><td>principal component</td><td>Hauptkomponente</td></tr>
<tr><td>linearly separable</td><td>linear separierbar (trennbar)</td></tr>
<tr><td>linear probe / head</td><td>linearer Klassifikator, linearer Kopf</td></tr>
<tr><td>upsampling</td><td>Hochskalieren, Hochabtasten</td></tr>
<tr><td>bilinear interpolation</td><td>bilineare Interpolation</td></tr>
<tr><td>sliding window</td><td>gleitendes Fenster</td></tr></table>`,
    },
    {
      id: 'recall-practice', type: 'recall', title: 'Plan it out loud',
      prompt: 'Explain why a linear head on frozen DINOv3 features is both a strong baseline **and** a diagnostic tool, and name its main limitation for watch images.',
      answer: `A linear head can only separate classes that are already linearly separable in the frozen feature space, so its accuracy directly measures how well the backbone represents your parts — it is cheap (thousands of parameters, trains in minutes) and cannot overfit much, which makes it an honest baseline. If it fails on real photos but works on renders, the problem is the features/domain gap, not the head. Its main limitation is spatial: it predicts one label per patch (16×16 px of the input), so thin structures like watch hands are sub-patch and come out blocky or missing unless you raise resolution, crop, upsample features, or add a decoder with fine-resolution information.`,
      hints: ['What does it mean if a *linear* model succeeds?', 'What size is the smallest unit a patch-level head can label?'],
      cards: ['use-linear', 'use-thin'],
    },
  ],
  cards: [
    { id: 'use-ladder', front: 'The adaptation ladder for foundation features (5 rungs)', back: 'k-NN → linear probe → light head/decoder on frozen backbone → parameter-efficient tuning (LoRA / last blocks) → full fine-tuning.' },
    { id: 'use-split', front: 'DINOv3 HF output: how to get the patch features?', back: '`last_hidden_state[:, 1 + num_register_tokens:]`, then unflatten to (H/16, W/16). Index 0 is CLS, then 4 registers.' },
    { id: 'use-storage', front: 'Storage for fp16 patch features of ViT-L/16 at 768 px, 100k images?', back: '48·48·1024·2 B ≈ 4.7 MB per image → ~470 GB. Cache selectively or reduce dims.' },
    { id: 'use-pca', front: 'How do you make a PCA visualization of patch features?', back: 'Stack patch features (N×d), PCA to 3 components, map to RGB per patch. Threshold PC1 for a foreground mask; PCA again on foreground for parts.' },
    { id: 'use-linear', front: 'Why is a linear head on frozen features a good diagnostic?', back: 'It succeeds only if classes are linearly separable in the backbone’s feature space — so it measures feature quality directly, cheaply, with little overfitting.' },
    { id: 'use-head-params', front: 'Parameters of a linear seg head: 1024-dim features, 8 classes?', back: '8·1024 + 8 = 8,200.' },
    { id: 'use-thin', front: 'Why are watch hands hard for patch-based models?', back: 'They are much thinner than a patch (e.g. seconds hand ≈ 0.09 patch at 512 px / patch 16), so one patch vector mixes hand and dial; per-patch labels become blocky or miss them.' },
    { id: 'use-thin-fix', front: 'Fixes for thin structures with ViT features', back: 'Higher resolution, crop around the object first, tiling, learned feature upsampling (e.g. FeatUp), decoders with fine skip connections, SAM-style boundary refinement.' },
  ],
};
