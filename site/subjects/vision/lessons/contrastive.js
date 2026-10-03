export default {
  id: 'contrastive',
  title: 'Contrastive learning & collapse',
  summary: 'The first SSL idea that really worked at scale: two augmented views of the same image should get similar [[embedding|embeddings]], views of different images should not. Along the way you meet the central danger of all SSL — [[collapse]].',
  minutes: 30,
  goals: [
    'Explain how augmentations define what the model learns to ignore',
    'Explain why "make both views equal" alone collapses, and how negatives prevent it',
    'Write down the [[infonce]] loss and read it as a softmax classification',
    'Compare SimCLR, MoCo and BYOL in one sentence each',
  ],
  blocks: [
    {
      id: 'invariance', type: 'text', title: 'Views, invariances and the key idea',
      md: `
Take one watch photo and create two random **views**: a random [crop](wiki:Cropping (image)|Cropping), a horizontal flip, some color jitter, a little [blur](wiki:Gaussian blur|Weichzeichnen (Foto)). A human says immediately: *same watch*. So should the network.

Contrastive learning turns that into a training signal: encode both views, and make their [[embedding|embeddings]] similar — a **positive pair**. The choice of [[data-augmentation|augmentations]] is not a detail; it is the *definition* of what the model will learn to ignore:

- random crops → "the whole watch and a zoom on its bezel belong together"
- color jitter → "the exact color doesn't define what this is"
- blur → "fine texture is not essential"

Everything that survives all augmentations — shape, parts, structure — ends up in the representation.`,
    },
    {
      id: 'video-simclr', type: 'video', youtube: 'APki8LmdJwY', label: 'SimCLR Explained!', channel: 'Connor Shorten', minutes: 20,
      why: 'A walkthrough of the SimCLR paper: augmentations, projection head, the contrastive loss and why batch size matters.[^simclr]',
    },
    {
      id: 'collapse', type: 'text', title: 'The trap: collapse',
      md: `
If the only goal were "both views should have the same embedding", there is a perfect, useless solution: **output the same vector for every image.** Loss zero, features worthless. This is **[[collapse]]**, and every SSL method needs a mechanism against it.

Contrastive learning's mechanism: **negatives**. The embedding of a view must be close to its partner *and* far from the views of **other** images. A constant output now fails badly, because it cannot tell anything apart.`,
    },
    {
      id: 'infonce', type: 'text', title: 'InfoNCE: a classification over candidates',
      md: `
Take a batch of $N$ images, two views each → $2N$ embeddings $z$, all L2-normalized. For one anchor $z_i$ with positive partner $z_i^+$, the **[[infonce]]** loss (SimCLR calls it NT-Xent) is:[^cpc][^simclr]

$$\\ell_i = -\\log \\frac{\\exp\\big(\\mathrm{sim}(z_i, z_i^+)/\\tau\\big)}{\\sum_{k \\neq i} \\exp\\big(\\mathrm{sim}(z_i, z_k)/\\tau\\big)}$$

where $\\mathrm{sim}$ is [[cosine-similarity]] and the sum runs over all other $2N-1$ embeddings (1 positive + $2N-2$ negatives).

Read it with what you know: the fraction is a **[[softmax]]** over similarity scores, and $-\\log$ of the probability of the correct item is **[[cross-entropy]]**. InfoNCE is just a classifier whose question is: *"Among all these candidates, which one is my other view?"*

The **[[temperature]]** $\\tau$ (small, e.g. 0.1–0.5) sharpens the softmax: with small $\\tau$ the loss concentrates on the **hardest negatives** — the other images that currently look most similar.`,
    },
    {
      id: 'calc-negatives', type: 'numeric', title: 'Count the negatives',
      question: 'SimCLR with a batch of $N = 256$ images (two views each). How many **negatives** does each anchor embedding get?',
      answer: 510, tolerance: 0,
      hint: 'There are $2N$ embeddings. Remove the anchor itself and its positive.',
      explain: '$2N - 2 = 510$. More negatives make the task harder and the features better — that\'s why SimCLR used huge batches (4096 in most experiments), and why MoCo invented a way around it.',
    },
    {
      id: 'viz-contrastive', type: 'viz', viz: 'contrastive-embedding', title: 'Train a tiny contrastive encoder',
      task: 'First press **Train** with InfoNCE and wait until views are aligned *and* images spread around the circle. Then switch to **Positives only** and keep training. Watch the collapse happen — the loss keeps getting *better* while the embedding becomes useless. Also try a very low and a high temperature with negatives on.',
    },
    {
      id: 'order-simclr', type: 'order', title: 'One SimCLR training step',
      prompt: 'Put the steps of one training iteration in order.',
      items: [
        'Sample a batch of $N$ unlabeled images',
        'Apply two random augmentations to each image → $2N$ views',
        'Encode each view with the backbone $f$ (e.g. a ResNet)',
        'Pass through the small projection head $g$ and L2-normalize',
        'Compute all pairwise cosine similarities between the $2N$ embeddings',
        'Compute the InfoNCE loss for every anchor and average',
        'Backpropagate and update $f$ and $g$',
      ],
      explain: 'After training, the projection head $g$ is thrown away — SimCLR found that features *before* the head transfer better, because the head learns to discard information (like color) that the augmentations declared irrelevant.',
    },
    {
      id: 'moco-byol', type: 'text', title: 'MoCo and BYOL: two ways around big batches',
      md: `
**MoCo** (Momentum Contrast)[^moco] keeps a **[queue](wiki:Queue (abstract data type)|Warteschlange (Datenstruktur))** of embeddings from recent batches as negatives (65,536 in the paper), so the number of negatives no longer depends on batch size. The queue's keys come from a **momentum encoder** — an **[[ema]]** of the main encoder with $m = 0.999$ — so that old and new keys stay consistent.

**BYOL** (Bootstrap Your Own Latent)[^byol] made a surprising claim: **no negatives at all.** An online network with an extra *predictor* head must predict the output of a *target* network, which is an EMA of the online network, with a stop-gradient. The asymmetry (predictor on one side, slowly moving EMA target on the other) is enough to avoid collapse in practice.

BYOL's recipe — student, EMA teacher, stop-gradient, no negatives — is the direct ancestor of **DINO** in the next lesson.`,
    },
    {
      id: 'quiz-temp', type: 'quiz', title: 'Temperature and negatives',
      question: 'Which statements about InfoNCE are correct?',
      options: [
        { text: 'Lowering $\\tau$ makes the loss focus more on the hardest negatives.', correct: true, why: 'Dividing by a small $\\tau$ exaggerates differences, so the most similar negatives dominate the softmax denominator.' },
        { text: 'Without negatives, InfoNCE still prevents collapse.', correct: false, why: 'Without the denominator it reduces to "maximize positive similarity", which a constant output solves perfectly.' },
        { text: 'InfoNCE is a cross-entropy over a softmax of similarity scores.', correct: true, why: 'The positive is the "correct class" among all candidates.' },
        { text: 'MoCo\'s queue lets it use many negatives with a small batch.', correct: true, why: 'Negatives come from previous batches, encoded by a momentum encoder.' },
        { text: 'BYOL uses a queue of negatives like MoCo.', correct: false, why: 'BYOL uses no negatives at all — a predictor plus an EMA target.' },
      ],
    },
    {
      id: 'mission-aug', type: 'callout', tone: 'mission', title: 'Augmentations encode your assumptions',
      md: `
For your watches, think hard before copying the standard [data augmentation](wiki:Data augmentation) recipe:

- **Color jitter** teaches the model that color is irrelevant. For *part segmentation* (dial vs. bezel) that's mostly fine — a blue and a black dial are both dials. For *model identification* it would destroy a crucial cue.
- **Aggressive crops** teach "a zoomed bezel still belongs to this watch" — good for learning parts.
- **Your renderer is an augmentation engine.** Changing lighting, materials, backgrounds and camera angle in the renders is the same idea as augmentation, taken further — this is called **[[domain-randomization]]**, and it's a core tool in the mission stage.

One more limitation: SimCLR-style losses act on **one global vector per image**. [Segmentation](wiki:Image segmentation|Segmentierung (Bildverarbeitung)) needs good **per-patch** features. That's a reason the field moved on to DINO and masked modeling, which produce much better dense features.`,
    },
    {
      id: 'deep-mi', type: 'callout', tone: 'deep', title: 'Why the name “Info”NCE?',
      md: `
NCE = *Noise-Contrastive Estimation*. van den Oord et al. showed that minimizing InfoNCE maximizes a lower bound on the **[mutual information](wiki:Mutual information|Transinformation)** between the two views:[^cpc]

$$I(v_1; v_2) \;\\geq\; \\log N - \\mathcal{L}_{\\text{InfoNCE}}$$

with $N$ the number of candidates. The bound can never exceed $\\log N$ — one theoretical argument for why *more negatives* help.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>English</th><th>Deutsch</th></tr>
<tr><td>contrastive learning</td><td>kontrastives Lernen</td></tr>
<tr><td>augmentation / view</td><td>Datenaugmentierung / Ansicht</td></tr>
<tr><td>positive / negative pair</td><td>Positiv- / Negativpaar</td></tr>
<tr><td>temperature</td><td>Temperatur(parameter)</td></tr>
<tr><td>collapse</td><td>Kollaps</td></tr>
<tr><td>mutual information</td><td>Transinformation, wechselseitige Information</td></tr>
<tr><td>momentum encoder</td><td>Momentum-Encoder (gleitend gemittelter Encoder)</td></tr>
<tr><td>queue</td><td>Warteschlange</td></tr></table>`,
    },
    {
      id: 'recall-negatives', type: 'recall', title: 'Explain it to a colleague',
      prompt: 'Explain (1) why "make the two views\' embeddings identical" on its own fails, (2) how negatives in InfoNCE fix it, and (3) how BYOL manages without negatives.',
      answer: `(1) A network that outputs the **same constant vector** for every input makes every pair of views identical — the loss is perfect but the features carry no information. That's **collapse**. (2) InfoNCE is a softmax classification: the anchor must pick its own partner out of many candidates, i.e. be **more similar to its partner than to other images**. A constant output makes all candidates equally similar, so the loss stays high; the model is forced to spread different images apart. (3) BYOL uses an **asymmetric** setup: an online network with an extra predictor head must predict the output of a **target network that is an EMA** of the online network, with a **stop-gradient** on the target. The slowly moving target and the predictor break the symmetry so that the trivial solution is not reached in practice.`,
      hints: ['What is the simplest function that makes all outputs equal?', 'InfoNCE\'s denominator contains which embeddings?', 'BYOL has one extra head on one side only…'],
      cards: ['collapse', 'byol'],
    },
  ],
  cards: [
    { id: 'positive-pair', front: 'In contrastive learning, what is a positive pair?', back: 'Two differently augmented views of the **same** image.' },
    { id: 'collapse', front: 'What is representation collapse?', back: 'The trivial solution of invariance objectives: the network outputs (nearly) the same vector for every input — loss looks good, features are useless.' },
    { id: 'infonce', front: 'Write the InfoNCE loss for anchor $z_i$ with positive $z_i^+$.', back: '$\\ell_i = -\\log \\frac{\\exp(\\mathrm{sim}(z_i,z_i^+)/\\tau)}{\\sum_{k\\neq i} \\exp(\\mathrm{sim}(z_i,z_k)/\\tau)}$ — cross-entropy of a softmax over similarities.' },
    { id: 'tau', front: 'Effect of a small temperature $\\tau$ in InfoNCE?', back: 'Sharper softmax: the loss focuses on the hardest negatives (most similar other images).' },
    { id: 'neg-count', front: 'SimCLR with batch $N$: how many negatives per anchor?', back: '$2N - 2$ (all views except itself and its positive).' },
    { id: 'aug-meaning', front: 'What do augmentations determine in contrastive learning?', back: 'What the model learns to be **invariant** to — e.g. color jitter ⇒ color is treated as irrelevant.' },
    { id: 'proj-head', front: 'Why does SimCLR throw away the projection head after training?', back: 'Features before the head transfer better; the head discards information made irrelevant by the augmentations.' },
    { id: 'moco', front: 'MoCo in one sentence', back: 'Contrastive learning with a large queue of negatives from past batches, encoded by a momentum (EMA) encoder, so batch size doesn\'t limit negatives.' },
    { id: 'byol', front: 'BYOL in one sentence', back: 'No negatives: an online network + predictor predicts an EMA target network\'s output (stop-gradient); the asymmetry avoids collapse.' },
  ],
};
