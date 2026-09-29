export default {
  id: 'generalization',
  title: 'Generalization, overfitting & augmentation',
  summary: 'A model that is perfect on its training images can still fail on the next real photo. This lesson is about the gap between "fits the data" and "works in the world" — the gap you are fighting right now.',
  minutes: 30,
  goals: [
    'Diagnose [[overfitting]] vs underfitting from training and validation curves',
    'Set up a leak-free [[train-val-test]] split for your watch data',
    'Choose [[data-augmentation|augmentations]] that are safe for segmentation masks',
    'Explain the difference between [[batch-norm]] and [[layer-norm]] and why ViTs use the latter',
  ],
  blocks: [
    {
      id: 'goal', type: 'text', title: 'The only number that matters',
      md: `
Training minimizes the loss on the training set. But nobody cares about the training set — you already have its labels. What matters is **[[generalization]]**: performance on new data from the situation you will deploy in.

To estimate it honestly you need data the model never learned from:

- **Training set** — used for gradient updates.
- **Validation set** — used to make decisions: which checkpoint, which learning rate, which architecture.
- **Test set** — touched once, at the end, for the number you report.

Every decision made by looking at a dataset leaks a bit of information about it. Tune 50 configurations on the same validation set and its score becomes optimistic. That's why the test set stays locked away.`,
    },
    {
      id: 'viz-overfit', type: 'viz', viz: 'overfit-curve', title: 'Capacity vs data',
      task: 'Raise the polynomial degree with 12 training points until the model clearly overfits, then find the degree with the lowest validation error. Afterwards: switch to 80 points, and separately try weight decay λ at a high degree. What changes?',
    },
    {
      id: 'diagnosis', type: 'text', title: 'Reading the curves',
      md: `
- **Underfitting:** training *and* validation error high. The model is too weak or undertrained. → more capacity, train longer, better features.
- **[[overfitting]]:** training error low and falling, validation error rising. The model memorizes noise and specifics. → more (varied) data, augmentation, [[regularization]], early stopping, fewer trainable parameters.
- **Good fit:** both low, small gap.

Modern deep networks are a twist on this classic picture: they are big enough to memorize *random* labels perfectly,[^rethinking-generalization] yet trained normally they generalize well. Capacity alone does not decide; the data, the architecture's built-in assumptions, the optimizer and — above all — **pretraining** matter enormously. A backbone pretrained on 142M images arrives with knowledge your 100k images alone could never teach it.`,
    },
    {
      id: 'match-diag', type: 'match', title: 'Diagnose the run',
      prompt: 'Match each symptom with the most likely diagnosis.',
      pairs: [
        ['train loss high, val loss high', 'underfitting'],
        ['train loss ↓ to ~0, val loss ↑', 'overfitting'],
        ['val on renders great, real photos poor', 'distribution shift (domain gap)'],
        ['loss explodes to NaN in the first 100 steps', 'learning rate too high / no warmup'],
        ['val score great, but same watches appear in train and val', 'data leakage'],
      ],
    },
    {
      id: 'defenses', type: 'text', title: 'The standard defenses',
      md: `
**More and more varied data** beats everything else. After that:

- **[[data-augmentation]]:** random crops, flips, rotations, scale changes, color jitter, blur, noise. Each tells the model "this change doesn't matter". For segmentation, *geometric* transforms must be applied to the image and the mask identically; *photometric* ones (color, blur, noise) only to the image.
- **[[weight-decay]]:** keep weights small; standard in AdamW.
- **Dropout / stochastic depth:** randomly silence units or skip whole blocks during training so no single path becomes indispensable.[^dropout] ViT and DINO use stochastic depth.
- **Early stopping:** keep the checkpoint with the best validation score.
- **Fewer trainable parameters:** freeze a pretrained backbone, or train only low-rank adapters.

**Normalization layers** are not regularizers primarily, but they make deep nets trainable at all:

- **[[batch-norm]]:** normalize each channel by the mean/variance over the *batch*.[^batchnorm] Great for CNNs, but depends on batch size — awkward when high-resolution segmentation only fits 2 images per GPU.
- **[[layer-norm]]:** normalize each token's features by *its own* mean/variance.[^layernorm] Batch-independent; used in every Transformer, including ViT and DINO.`,
    },
    {
      id: 'quiz-aug', type: 'quiz', title: 'Augmentations for segmentation',
      question: 'You train a watch-part segmenter. For which augmentations must the **mask** be transformed too?',
      options: [
        { text: 'Random resized crop', correct: true, why: 'Geometry changes — the mask must be cropped and resized identically (with nearest-neighbour interpolation to keep class ids).' },
        { text: 'Horizontal flip', correct: true, why: 'Geometric. (Bonus thought: a flipped watch has the crown on the wrong side — fine for part segmentation, but not if you ever classify "left vs right crown".)' },
        { text: 'Color jitter (brightness, contrast, hue)', correct: false, why: 'Photometric: pixels change, but which pixel is which part does not.' },
        { text: 'Rotation by ±20°', correct: true, why: 'Geometric: rotate the mask the same way.' },
        { text: 'Gaussian blur / JPEG compression noise', correct: false, why: 'Photometric — and very useful to make renders look more like real phone photos.' },
      ],
    },
    {
      id: 'order-split', type: 'order', title: 'A leak-free workflow',
      prompt: 'Put these steps into a sound order for your watch project.',
      items: [
        'Collect a set of **real** photos that represents deployment and label it carefully',
        'Split by watch model / photo session so near-duplicates never cross splits',
        'Lock away the test split',
        'Train a simple baseline on the training data (renders and/or real)',
        'Tune decisions on the validation split only',
        'Evaluate once on the test split and report',
      ],
      explain: 'The first two steps are where most real projects go wrong. If near-identical photos of the same watch sit in both train and validation, validation measures memory, not generalization.',
    },
    {
      id: 'mission-split', type: 'callout', tone: 'mission', title: 'Your validation set must look like your deployment',
      md: `
With 100k images and a render generator, it is tempting to validate on held-out renders. That measures how well the model learned *the renderer*. Your problem, "stable quality on real watch photos", can only be measured on **real photos**.

Concrete recommendation: before any more training runs, build a small, carefully labeled real test set (even 200–500 images), split by watch reference/photo source, covering hard cases: reflections on the crystal, unusual angles, bracelets vs leather straps, busy backgrounds. Every experiment from now on reports its score on it. This single step turns vague impressions ("quality is unstable") into numbers you can improve.`,
    },
    {
      id: 'deep-shift', type: 'callout', tone: 'deep', title: 'Generalization assumes “same distribution”',
      md: `
All classic guarantees assume training and test data are drawn from the same distribution. When they are not — renders vs photos, studio vs smartphone, one brand vs another — we speak of **distribution shift** or a [[domain-gap]]. No amount of regularization on the training distribution fixes a shift; you need data or augmentations that cover the target distribution, or features robust to the difference. The mission stage is largely about this.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>English</th><th>Deutsch</th></tr>
<tr><td>generalization</td><td>Generalisierung, Verallgemeinerung</td></tr>
<tr><td>overfitting / underfitting</td><td>Überanpassung / Unteranpassung</td></tr>
<tr><td>training / validation / test set</td><td>Trainings- / Validierungs- / Testdatensatz</td></tr>
<tr><td>regularization</td><td>Regularisierung</td></tr>
<tr><td>data augmentation</td><td>Datenaugmentierung, Datenanreicherung</td></tr>
<tr><td>early stopping</td><td>frühes Stoppen</td></tr>
<tr><td>data leakage</td><td>Datenleck</td></tr>
<tr><td>distribution shift</td><td>Verteilungsverschiebung</td></tr>
<tr><td>mean / standard deviation (normalization)</td><td>Mittelwert / Standardabweichung (Normierung)</td></tr></table>`,
    },
    {
      id: 'recall-val', type: 'recall', title: 'Explain it to a colleague',
      prompt: 'Your model reaches excellent mIoU on held-out **renders** but is unstable on real watch photos. Explain why the render validation score is misleading, and what you would change in your evaluation setup.',
      answer: `Held-out renders come from the same distribution as the training renders, so they measure fit to the renderer, not generalization to real photos — the deployment distribution is different (lighting, reflections, sensor noise, backgrounds, wear, compression). The score is also inflated if near-duplicate renders (same 3D model, similar poses) appear in train and validation. Fix: build a carefully labeled real-photo validation and test set, split by watch model/photo source to avoid leakage, track it for every experiment, and keep the test split for final numbers only.`,
      hints: ['What distribution is the validation set drawn from?', 'Could the same 3D model appear in both splits?'],
      cards: ['val-real', 'leakage'],
    },
  ],
  cards: [
    { id: 'splits', front: 'Roles of training, validation and test sets', back: 'Train: gradient updates. Validation: decisions/tuning. Test: final, one-time estimate.' },
    { id: 'overfit-sign', front: 'Curve signature of overfitting', back: 'Training loss keeps falling, validation loss rises — gap grows.' },
    { id: 'underfit-sign', front: 'Curve signature of underfitting', back: 'Both training and validation loss stay high.' },
    { id: 'aug-mask', front: 'Which augmentations must also be applied to the segmentation mask?', back: 'Geometric ones (crop, flip, rotate, scale) — with nearest-neighbour interpolation. Photometric ones (color, blur, noise) only touch the image.' },
    { id: 'bn-ln', front: 'BatchNorm vs LayerNorm', back: 'BN normalizes each channel over the batch (CNNs; batch-size dependent). LN normalizes each token over its features (Transformers; batch-independent).' },
    { id: 'leakage', front: 'What is data leakage in a train/val split — example for watches?', back: 'Information from the evaluation set reaching training, e.g. near-identical photos/renders of the same watch in both splits.' },
    { id: 'val-real', front: 'Why must your watch validation set be real photos?', back: 'Deployment is real photos; renders measure fit to the renderer, not generalization across the domain gap.' },
    { id: 'random-labels', front: 'What did Zhang et al. (2016) show about deep networks and random labels?', back: 'They can memorize completely random labels — so capacity alone doesn\'t explain why they generalize on real labels.' },
  ],
};
