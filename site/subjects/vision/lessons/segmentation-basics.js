export default {
  id: 'segmentation-basics',
  title: 'Segmentation 101: U-Net & IoU',
  summary: 'Segmentation means answering a classification question for *every pixel*. This lesson covers the three flavours of the task, the [[encoder-decoder]] architecture that solves it, and the metrics that judge it — including why they are so harsh on thin watch hands.',
  minutes: 35,
  goals: [
    'Distinguish [[semantic-segmentation|semantic]], [[instance-segmentation|instance]] and [[panoptic-segmentation|panoptic]] segmentation',
    'Describe how a network outputs a per-pixel prediction and how it is trained',
    'Explain the [[u-net|U-Net]] design and what its skip connections carry',
    'Compute [[iou]], [[dice]] and [[miou]], and explain why pixel accuracy misleads',
  ],
  blocks: [
    {
      id: 'flavours', type: 'text', title: 'Three questions you can ask about pixels',
      md: `
- **[[semantic-segmentation|Semantic segmentation]]** — *which class is this pixel?* Output: one label per pixel ("dial", "hand", "strap"). Two touching hands merge into one "hand" region.
- **[[instance-segmentation|Instance segmentation]]** — *which object is this pixel part of?* Each hand gets its own mask; background is ignored.
- **[[panoptic-segmentation|Panoptic segmentation]]** — both at once.[^panoptic] Countable **things** (hands, indices, pushers) get instance ids; amorphous **stuff** (dial surface, background) just gets a class.

For watches you will likely want panoptic-style output eventually: the dial is stuff-like, but "hour hand", "minute hand", "second hand" are distinct instances whose geometry you may want to measure.`,
    },
    {
      id: 'figure', type: 'figure', title: 'Same image, three outputs',
      html: `<svg viewBox="0 0 600 190" width="600" style="font-family:Inter;font-size:12px">
  <g transform="translate(20 10)">
    <circle cx="80" cy="80" r="70" fill="#27336b"/><circle cx="80" cy="80" r="58" fill="#f4efe4"/>
    <line x1="80" y1="80" x2="55" y2="45" stroke="#161a3a" stroke-width="7" stroke-linecap="round"/><line x1="80" y1="80" x2="120" y2="55" stroke="#161a3a" stroke-width="4" stroke-linecap="round"/>
    <text x="80" y="172" text-anchor="middle" fill="#3b3b55">input</text>
  </g>
  <g transform="translate(210 10)">
    <circle cx="80" cy="80" r="70" fill="#8fb3ff"/><circle cx="80" cy="80" r="58" fill="#ffe29a"/>
    <line x1="80" y1="80" x2="55" y2="45" stroke="#e0507a" stroke-width="7" stroke-linecap="round"/><line x1="80" y1="80" x2="120" y2="55" stroke="#e0507a" stroke-width="4" stroke-linecap="round"/>
    <text x="80" y="172" text-anchor="middle" fill="#3b3b55">semantic: one color per class</text>
  </g>
  <g transform="translate(400 10)">
    <circle cx="80" cy="80" r="70" fill="#8fb3ff"/><circle cx="80" cy="80" r="58" fill="#ffe29a"/>
    <line x1="80" y1="80" x2="55" y2="45" stroke="#e0507a" stroke-width="7" stroke-linecap="round"/><line x1="80" y1="80" x2="120" y2="55" stroke="#2bb38a" stroke-width="4" stroke-linecap="round"/>
    <text x="80" y="172" text-anchor="middle" fill="#3b3b55">panoptic: + one id per hand</text>
  </g>
</svg>`,
      caption: 'Semantic segmentation colors both hands the same; panoptic (or instance) separates them.',
    },
    {
      id: 'per-pixel', type: 'text', title: 'A classifier for every pixel',
      md: `
A classifier outputs $C$ [[logits]] per image. A semantic segmenter outputs $C$ logits **per pixel**: a tensor of shape $H \\times W \\times C$. A [[softmax]] over the class axis turns each pixel's logits into probabilities, and training minimizes the average per-pixel [[cross-entropy]]:

$$\\mathcal{L} = -\\frac{1}{HW} \\sum_{\\text{pixels } p} \\log \\hat{y}_{p,\\, c^*_p}$$

where $c^*_p$ is the true class of pixel $p$. The first successful deep version simply took a classification CNN, replaced its final fully connected layers by convolutions and upsampled the coarse output — the **Fully Convolutional Network** (FCN).[^fcn] The output was blurry: at 1/32 resolution, a whole second hand fits inside one cell.`,
    },
    {
      id: 'unet', type: 'text', title: 'U-Net: go down for meaning, come back up for detail',
      md: `
The **[[u-net|U-Net]]**[^unet] turns the [[encoder-decoder]] idea into a clean, symmetric design:

1. **Encoder (contracting path):** conv blocks + downsampling. Resolution goes $1 \\to \\tfrac12 \\to \\tfrac14 \\to \\tfrac18 \\to \\tfrac1{16}$, channels grow. Receptive field and semantics grow.
2. **Decoder (expanding path):** upsample step by step back to full resolution.
3. **Skip connections at every scale:** concatenate the encoder's feature map of the same resolution onto the decoder's. The encoder features know *exactly where* the edges are; the decoder features know *what* things are. Together: sharp, semantically correct masks.

Draw it and it looks like a U — hence the name. U-Net was designed to work with very few labeled images, is easy to train, and remains the strongest *simple* baseline. With a pretrained [[backbone]] (ResNet, ConvNeXt, or a DINO ViT) as the encoder it gets much stronger.`,
    },
    {
      id: 'order-unet', type: 'order', title: 'Trace a pixel through a U-Net',
      prompt: 'Order the steps of a U-Net forward pass for a $512 \\times 512$ watch image.',
      items: [
        'Input image 512×512×3',
        'Encoder block + downsample → 256×256×64',
        'Encoder block + downsample → 128×128×128 (… continue down to 32×32)',
        'Bottleneck: coarsest, most semantic features',
        'Upsample ×2 and concatenate the encoder features of the same size',
        'Decoder conv block fuses "what" (decoder) with "where" (skip)',
        'Repeat upsample + skip up to 512×512',
        '1×1 conv → 512×512×C logits → softmax per pixel',
      ],
      explain: 'The skip connections are what distinguish U-Net from FCN: without them, the decoder would have to hallucinate boundary positions from coarse features.',
    },
    {
      id: 'metrics', type: 'text', title: 'Measuring quality: IoU, Dice, mIoU',
      md: `
For a predicted mask $A$ and ground-truth mask $B$:

$$\\mathrm{IoU} = \\frac{|A \\cap B|}{|A \\cup B|}, \\qquad \\mathrm{Dice} = \\frac{2|A \\cap B|}{|A| + |B|} = \\frac{2\\,\\mathrm{IoU}}{1 + \\mathrm{IoU}}$$

**[[iou|IoU]]** (Jaccard index) is 1 for a perfect match and 0 for no overlap. **[[dice|Dice]]** is its more generous sibling (it's the F1 score over pixels).

The standard benchmark number is **[[miou|mIoU]]**: compute the IoU *per class* (accumulating over the whole dataset), then average over classes. Every class counts equally, no matter how few pixels it has.

**Why not pixel accuracy?** On a watch photo maybe 60% of pixels are background and 25% dial. A model that never predicts "hand" at all can still reach ~95% pixel accuracy. mIoU would expose it: the "hand" IoU is 0, dragging the mean down.`,
    },
    {
      id: 'calc-iou', type: 'numeric', title: 'Compute IoU',
      question: 'A predicted hand mask has 100 pixels, the ground-truth mask has 80 pixels, and they overlap in 60 pixels. What is the IoU?',
      answer: 0.5, tolerance: 0.005,
      hint: 'Union = $|A| + |B| - |A \\cap B|$.',
      explain: 'Union $= 100 + 80 - 60 = 120$, IoU $= 60/120 = 0.5$. Dice would be $2\\cdot60/180 \\approx 0.667$ — same prediction, very different-looking number. Always state which metric you report.',
    },
    {
      id: 'viz-iou', type: 'viz', viz: 'iou-playground', title: 'IoU playground',
      task: 'Reach all three goals. In thin-hand mode, compare moving the prediction **along** the hand vs **across** it. What does that tell you about evaluating second hands?',
    },
    {
      id: 'thin', type: 'callout', tone: 'mission', title: 'Your metric might be lying about your hands',
      md: `
A 4-pixel-wide hand predicted just 3 pixels to the side has IoU ≈ 0.14 — a human would call it "basically right". Meanwhile a dial mask that is off by 3 px has IoU ≈ 0.98. Consequences for your project:

- **Report per-class IoU**, never only mIoU or pixel accuracy. "Hands 0.45, dial 0.97" tells a story; "mIoU 0.78" hides it.
- **Label noise dominates thin classes.** If your annotators' hand masks vary by ±2 px, even a perfect model can't exceed IoU ≈ 0.5 on second hands. Measure annotator agreement on 50 images before blaming the model.
- **Consider boundary or skeleton metrics** for thin parts (e.g. is the predicted hand's *centerline* within 2 px of the true one? is its *angle* within 1°?). If the goal is reading the time, angle error is what matters.
- **Synthetic renders give pixel-perfect labels** — a real advantage — but also a mismatch: real annotations are always a bit fatter or thinner than rendered ones.`,
    },
    {
      id: 'loss', type: 'callout', tone: 'deep', title: 'Class imbalance in the loss: weighting and Dice loss',
      md: `
Per-pixel cross-entropy is dominated by the classes with the most pixels; tiny classes contribute little gradient. Common fixes:

- **Class weights** in the cross-entropy (e.g. inversely proportional to frequency).
- **Soft Dice loss**: $1 - \\frac{2\\sum_p \\hat y_p y_p}{\\sum_p \\hat y_p + \\sum_p y_p}$ per class, averaged over classes. Because it normalizes by object size, a small class counts as much as a large one.
- **Combined loss**: cross-entropy + Dice is a robust default.
- **Higher resolution crops** around small structures during training.`,
    },
    {
      id: 'quiz', type: 'quiz', title: 'Check yourself',
      question: 'Which statements are true?',
      options: [
        { text: 'Dice is always greater than or equal to IoU for the same masks.', correct: true, why: '$\\mathrm{Dice} = 2\\,\\mathrm{IoU}/(1+\\mathrm{IoU}) \\ge \\mathrm{IoU}$ for IoU in [0,1].' },
        { text: 'mIoU weights each class by how many pixels it has.', correct: false, why: 'mIoU averages per-class IoUs — each class counts equally.' },
        { text: 'U-Net’s skip connections carry precise spatial detail from the encoder to the decoder.', correct: true, why: 'Encoder features at the same resolution know where edges are.' },
        { text: 'Semantic segmentation distinguishes the hour hand from the minute hand as separate instances.', correct: false, why: 'Only if they are separate *classes*. Instances are the job of instance/panoptic segmentation.' },
        { text: 'High pixel accuracy guarantees good masks for small parts.', correct: false, why: 'Small classes barely affect pixel accuracy.' },
      ],
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>English</th><th>Deutsch</th><th>Notation</th></tr>
<tr><td>intersection</td><td>Schnittmenge</td><td>$A \\cap B$</td></tr>
<tr><td>union</td><td>Vereinigungsmenge</td><td>$A \\cup B$</td></tr>
<tr><td>cardinality (number of elements)</td><td>Mächtigkeit, Kardinalität</td><td>$|A|$</td></tr>
<tr><td>Jaccard index</td><td>Jaccard-Koeffizient</td><td></td></tr>
<tr><td>mean</td><td>Mittelwert</td><td>$\\frac1n\\sum$</td></tr>
<tr><td>class imbalance</td><td>Klassenungleichgewicht</td><td></td></tr>
<tr><td>ground truth</td><td>Referenz (Grundwahrheit), Soll-Maske</td><td></td></tr></table>`,
    },
    {
      id: 'recall', type: 'recall', title: 'Explain it',
      prompt: 'Your model has **97% pixel accuracy** on watch photos, yet the hands look terrible. Explain how that is possible and what you would report instead.',
      answer: `Pixel accuracy counts every pixel equally, so it is dominated by large classes (background, dial, strap). Hands cover only a few percent of the pixels — the model could miss them almost entirely and still be ~95%+ accurate. Instead report **per-class IoU** (and mIoU, which averages classes equally), so the hand IoU is visible on its own. For thin structures, add boundary/centerline or angle-based metrics, and check label consistency, since a 2–3 px annotation difference already caps the achievable IoU.`,
      hints: ['What fraction of a watch photo is hand pixels?', 'Which metric gives every class the same weight?'],
      cards: ['pixel-acc', 'miou'],
    },
  ],
  cards: [
    { id: 'three-tasks', front: 'Semantic vs instance vs panoptic segmentation', back: 'Semantic: class per pixel. Instance: separate mask per object (things only). Panoptic: class per pixel + instance ids for countable "things"; "stuff" gets only a class.' },
    { id: 'iou', front: 'IoU formula', back: '$|A \\cap B| / |A \\cup B|$ — intersection over union, 0 to 1.' },
    { id: 'dice', front: 'Dice formula and its relation to IoU', back: '$2|A\\cap B| / (|A| + |B|) = 2\\,\\mathrm{IoU}/(1 + \\mathrm{IoU})$; always ≥ IoU.' },
    { id: 'miou', front: 'How is mIoU computed?', back: 'IoU per class (intersection and union accumulated over the dataset), then the unweighted mean over classes.' },
    { id: 'pixel-acc', front: 'Why is pixel accuracy a bad segmentation metric for watches?', back: 'It is dominated by big classes (background, dial); missing all the tiny hand pixels barely lowers it.' },
    { id: 'unet-skip', front: 'What do U-Net\'s skip connections contribute?', back: 'Precise spatial detail ("where") from encoder features at the same resolution, fused with the decoder\'s semantics ("what").' },
    { id: 'seg-loss', front: 'Standard loss for semantic segmentation (and a fix for tiny classes)', back: 'Per-pixel cross-entropy over the $C$ class logits; add class weights or a soft Dice loss for small classes.' },
    { id: 'thin-iou', front: 'A 4 px wide hand, predicted 3 px sideways: roughly what IoU?', back: 'About 0.14 (overlap width 1 px of 7 px union width) — IoU is brutal on thin structures.' },
  ],
};
