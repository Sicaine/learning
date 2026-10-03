export default {
  id: 'training-loop',
  title: 'Loss, backprop & optimizers',
  summary: 'Every deep-learning model — from a digit classifier to DINOv3 — is trained by the same four-step loop. Understand it once, including [[adamw]] and the warmup + cosine [[lr-schedule]], and you can read any training recipe.',
  minutes: 35,
  goals: [
    'Write down the four steps of a training iteration',
    'Explain [[sgd]], [[momentum]] and [[adamw]] and when each is used',
    'Read a modern recipe: AdamW, linear warmup, cosine decay, [[weight-decay]]',
    'Estimate the GPU memory that training (not inference) needs',
  ],
  blocks: [
    {
      id: 'loop', type: 'text', title: 'The loop',
      md: `
Training is the same four steps, repeated hundreds of thousands of times:

1. **Forward:** push a [[batch]] of images through the model to get predictions.
2. **Loss:** compare predictions with targets using a [[loss-function]] (e.g. [[cross-entropy]]).
3. **Backward:** compute the gradient of the loss w.r.t. every weight with [[backpropagation]].
4. **Step:** let the optimizer update the weights using those gradients.

In [PyTorch](wiki:PyTorch|PyTorch) it literally looks like this:

\`\`\`python
for images, masks in loader:              # one batch
    logits = model(images)                 # 1. forward   (B, C, H, W)
    loss = F.cross_entropy(logits, masks)  # 2. loss      scalar
    optimizer.zero_grad()
    loss.backward()                        # 3. backward  fills p.grad for every weight
    optimizer.step()                       # 4. step      AdamW update
    scheduler.step()                       #    adjust the learning rate
\`\`\`

One pass over all data is an **[[epoch]]**. Everything else in a training recipe — optimizer, schedule, augmentations, regularization — is a choice *inside* this loop.[^udl-book]`,
    },
    {
      id: 'video-bp', type: 'video', youtube: 'Ilg3gGewQ5U', label: 'Backpropagation, intuitively', channel: '3Blue1Brown', minutes: 13,
      why: 'What backpropagation is doing, without the calculus ([3Blue1Brown](wiki:3Blue1Brown|3Blue1Brown)). The follow-up "Backpropagation calculus" (chapter 4) adds the chain-rule details.[^3b1b-nn] For a hands-on version, [Andrej Karpathy](wiki:Andrej Karpathy|Andrej Karpathy) builds backprop from scratch in Python.[^karpathy-micrograd]',
    },
    {
      id: 'order-step', type: 'order', title: 'One training iteration',
      prompt: 'Put the operations of a single training iteration in the right order.',
      items: [
        'Sample a mini-batch of images and masks',
        'Apply random augmentations (crop, flip, color jitter)',
        'Forward pass → logits',
        'Compute the loss against the masks',
        'Zero old gradients, then backward pass',
        'Optimizer step (update weights)',
        'Update the learning rate from the schedule',
      ],
    },
    {
      id: 'backprop-cost', type: 'text', title: 'What backprop costs',
      md: `
Backprop applies the [[chain-rule]] from the loss backwards. Two practical facts follow:

- **Compute:** the backward pass costs about **2×** the forward pass, so one training step ≈ **3×** a forward pass.
- **Memory:** the backward pass needs the intermediate activations of the forward pass. They must be kept in [GPU](wiki:Graphics processing unit|Grafikprozessor) memory until used. For a ViT at high resolution, these activations — not the weights — are usually what fills a 24 GB card.

Memory for training = weights + gradients + optimizer state + activations. Inference needs only weights + a small working buffer.`,
    },
    {
      id: 'optimizers', type: 'text', title: 'From SGD to AdamW',
      md: `
**[[sgd]] (stochastic gradient descent).** Estimate the gradient on a random mini-batch instead of the whole dataset and step: $\\theta \\leftarrow \\theta - \\eta\\,\\mathbf{g}$. Noisy but cheap, and the noise even helps find solutions that generalize.

**[[momentum]].** Keep a running average of past gradients and step along it:

$$\\mathbf{v} \\leftarrow \\beta\\mathbf{v} + \\mathbf{g}, \\qquad \\theta \\leftarrow \\theta - \\eta\\mathbf{v}$$

Zig-zags across a narrow valley cancel; consistent directions accumulate speed. SGD + momentum is still a strong choice for CNNs.

**Adam / [[adamw]].** Keep running averages of the gradient ($\\mathbf{m}$) *and* of its square ($\\mathbf{v}$), and scale each parameter's step by $1/\\sqrt{\\mathbf{v}}$:[^adam]

$$\\theta \\leftarrow \\theta - \\eta \\left( \\frac{\\hat{\\mathbf{m}}}{\\sqrt{\\hat{\\mathbf{v}}} + \\epsilon} + \\lambda\\theta \\right)$$

Parameters with consistently large gradients get smaller steps, rarely-updated ones get larger steps — every weight gets its own effective learning rate. The "W" means [[weight-decay]] $\\lambda\\theta$ is applied directly to the weights ("decoupled") instead of being mixed into the gradient, which works better with Adam.[^adamw] **AdamW is the default for Vision Transformers**: [ViT](wiki:Vision transformer), DINO, DINOv2/v3 and [SAM](wiki:Segment Anything) are all trained with it.`,
    },
    {
      id: 'schedule', type: 'text', title: 'Warmup + cosine: the modern schedule',
      md: `
The [[learning-rate]] is rarely constant. The recipe you will see in almost every ViT paper is an **[[lr-schedule]]** with two phases:

- **Linear warmup:** start near 0 and ramp up over the first few epochs. Early on, AdamW's running statistics are unreliable and the randomly initialized network produces huge gradients; big steps now can wreck training.[^goyal-warmup]
- **Cosine decay:** then lower the rate smoothly along half a cosine wave towards a small value.[^sgdr] Big steps explore early; small steps settle into a good minimum at the end.

DINO, for example, warms the learning rate up linearly over the first 10 epochs, then decays it with a cosine schedule — and it schedules the weight decay (0.04 → 0.4) and the teacher's momentum the same way.[^dino]`,
    },
    {
      id: 'viz-lr', type: 'viz', viz: 'lr-schedule', title: 'Shape a schedule',
      caption: 'Linear warmup followed by cosine decay. Change warmup and total length and watch how long the learning rate stays high.',
    },
    {
      id: 'calc-steps', type: 'numeric', title: 'Steps per epoch',
      question: 'You train on your 100,000 watch images with batch size 64. How many optimizer steps are in one epoch (round up)?',
      answer: 1563, tolerance: 0,
      hint: '$100{,}000 / 64 = 1562.5$',
      explain: '1,563 steps. With 2 GPUs doing [data-parallel](wiki:Data parallelism) training at 64 images *each*, the effective batch is 128 and an epoch is 782 steps. When the batch size changes, papers usually scale the learning rate proportionally (the "linear scaling rule").',
    },
    {
      id: 'calc-mem', type: 'numeric', title: 'The memory bill for AdamW',
      question: 'In plain [FP32](wiki:Single-precision floating-point format|Einfache Genauigkeit), each parameter needs 4 bytes for the weight, 4 for its gradient, and 8 for AdamW\'s two running averages. How many GB (10⁹ bytes) does that take for a 300M-parameter model (≈ ViT-L), **before** any activations?',
      answer: 4.8, tolerance: 0.1, unit: 'GB',
      hint: '$300 \\times 10^6 \\times 16$ bytes.',
      explain: '$4.8$ GB. Fine on a 24 GB [RTX 4090](wiki:GeForce 40 series|Nvidia-GeForce-40-Serie) — but activations for a batch of high-resolution images come on top and often dominate. For the 7B-parameter DINOv3 teacher the same arithmetic gives 112 GB: impossible to train on your hardware, which is exactly why [Meta](wiki:Meta AI|Meta AI) distills it into smaller models you *can* use.',
    },
    {
      id: 'quiz-opt', type: 'quiz', title: 'Optimizer check',
      question: 'Select every correct statement.',
      options: [
        { text: 'AdamW keeps two extra numbers per parameter.', correct: true, why: 'The running mean of gradients and of squared gradients.' },
        { text: 'Warmup exists because the learning rate should be as large as possible from the first step.', correct: false, why: 'The opposite: early steps are dangerous, so the rate starts small and ramps up.' },
        { text: 'Momentum dampens oscillations across steep directions and accelerates along consistent ones.', correct: true, why: 'Opposite-sign gradients cancel in the running average; same-sign ones accumulate.' },
        { text: 'One training step costs roughly the same compute as one forward pass.', correct: false, why: 'Forward + backward ≈ 3× a forward pass.' },
        { text: 'In AdamW, weight decay is applied directly to the weights rather than through the gradient.', correct: true, why: 'That is the "decoupled" in decoupled weight decay.' },
      ],
    },
    {
      id: 'mission-4090', type: 'callout', tone: 'mission', title: 'Reading this against your 2× RTX 4090',
      md: `
Each card has 24 GB. A realistic memory budget for fine-tuning a ViT-L-sized backbone with a segmentation head at 518×518:

- weights + gradients + AdamW state: ~5 GB (FP32), less with mixed precision
- activations: grows with batch size × tokens × depth — easily 10–20 GB for a handful of images

So: a **frozen** backbone plus a trained head is easy; **full fine-tuning** of ViT-L is feasible with small per-GPU batches, mixed precision and possibly gradient checkpointing; anything at the multi-billion-parameter scale is out of reach for training. The mission stage turns this into a calculator.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>English</th><th>Deutsch</th></tr>
<tr><td>loss function</td><td>Verlustfunktion (Kostenfunktion)</td></tr>
<tr><td>backpropagation</td><td>Fehlerrückführung, Backpropagation</td></tr>
<tr><td>(mini-)batch / epoch</td><td>(Mini-)Batch, Stapel / Epoche</td></tr>
<tr><td>stochastic gradient descent</td><td>stochastischer Gradientenabstieg</td></tr>
<tr><td>momentum</td><td>Impuls, Momentum</td></tr>
<tr><td>running / moving average</td><td>gleitender Mittelwert</td></tr>
<tr><td>weight decay</td><td>Gewichtsabnahme, L2-Regularisierung</td></tr>
<tr><td>learning-rate schedule, warmup</td><td>Lernraten-Zeitplan, Aufwärmphase</td></tr>
<tr><td>optimizer state</td><td>Optimierer-Zustand</td></tr></table>`,
    },
    {
      id: 'recall-step', type: 'recall', title: 'Explain it to a colleague',
      prompt: 'Walk through one training step of a segmentation model, and explain why fine-tuning needs much more GPU memory than running the same model for inference.',
      answer: `Take a mini-batch of (augmented) images and masks; forward pass to per-pixel logits; compute the cross-entropy between logits and masks; zero the old gradients and run the backward pass, which applies the chain rule from the loss back through every layer; the optimizer (AdamW) updates every weight; the scheduler adjusts the learning rate. Training memory holds weights **plus** a gradient per weight, the optimizer's two running averages per weight, and all intermediate activations stored during the forward pass for use in backprop. Inference only needs the weights and transient activations, which can be freed layer by layer.`,
      hints: ['Four steps: forward, loss, backward, step.', 'What does backward need from forward? What does AdamW keep per weight?'],
      cards: ['loop', 'train-mem-breakdown'],
    },
  ],
  cards: [
    { id: 'loop', front: 'The four steps of a training iteration', back: 'Forward → loss → backward (gradients) → optimizer step.' },
    { id: 'epoch', front: 'Epoch vs step (iteration)', back: 'Step: one batch + one update. Epoch: one pass over the full training set.' },
    { id: 'bp-cost', front: 'Compute cost of one training step relative to a forward pass', back: '≈ 3× (backward ≈ 2× forward).' },
    { id: 'momentum', front: 'Momentum update rule', back: '$\\mathbf{v} \\leftarrow \\beta\\mathbf{v} + \\mathbf{g}$, $\\theta \\leftarrow \\theta - \\eta\\mathbf{v}$ (β ≈ 0.9).' },
    { id: 'adam', front: 'Core idea of Adam', back: 'Per-parameter step size: running mean of gradients divided by the square root of the running mean of squared gradients.' },
    { id: 'adamw', front: 'What does the "W" in AdamW change?', back: 'Weight decay is applied directly to the weights (decoupled), not added to the gradient.' },
    { id: 'schedule', front: 'Standard ViT/DINO learning-rate schedule', back: 'Linear warmup (few epochs), then cosine decay to a small value; optimizer AdamW.' },
    { id: 'warmup-why', front: 'Why warm up the learning rate?', back: 'Early gradients are large/erratic and Adam\'s statistics unreliable; big early steps can destabilize training.' },
    { id: 'train-mem-breakdown', front: 'What occupies GPU memory during training?', back: 'Weights + gradients + optimizer state (AdamW: 2 per weight) + stored activations.' },
    { id: 'adamw-bytes', front: 'FP32 bytes per parameter for weights + grads + AdamW state', back: '16 bytes (4 + 4 + 8). ViT-L ≈ 300M params → ~4.8 GB before activations.' },
  ],
};
