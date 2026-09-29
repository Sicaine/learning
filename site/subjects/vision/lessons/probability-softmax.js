export default {
  id: 'probability-softmax',
  title: 'Probability, softmax & cross-entropy',
  summary: 'Models output raw scores; we need beliefs. [[softmax]] turns scores into a [[probability-distribution]], [[cross-entropy]] measures how wrong those beliefs are, and [[temperature]] — the knob DINO depends on — controls how confident they look.',
  minutes: 30,
  goals: [
    'Turn [[logits]] into probabilities with [[softmax]] and explain its properties',
    'Predict what [[temperature]] does — and why DINO\'s teacher uses a low one',
    'Compute [[entropy]] and [[cross-entropy]] and explain them as "surprise"',
    'See per-pixel segmentation as thousands of small classification problems',
  ],
  blocks: [
    {
      id: 'scores', type: 'text', title: 'From scores to beliefs',
      md: `
A classifier looking at a patch of a watch photo produces one raw number per class — for example for *dial, bezel, hands, crown, strap*. These **[[logits]]** can be any real numbers: $(2.0,\\ 1.2,\\ 0.4,\\ -0.5,\\ -1.0)$.

We want a **[[probability-distribution]]** instead: non-negative numbers that sum to 1, so we can say "72% dial". Requirements: bigger score → bigger probability, everything positive, total 1, and — crucial for training — smooth, so gradients exist.`,
    },
    {
      id: 'softmax', type: 'text', title: 'Softmax',
      md: `
**[[softmax]]** does exactly this:

$$p_k = \\frac{e^{z_k}}{\\sum_{j=1}^{K} e^{z_j}}$$

Exponentiate (all positive; gaps get amplified), then divide by the total (sum to 1). Useful properties:

- **Order is preserved:** the largest logit gets the largest probability.
- **Only differences matter:** adding the same constant $c$ to every logit changes nothing, because $e^{z_k + c} = e^c e^{z_k}$ and $e^c$ cancels. (Implementations subtract $\\max_j z_j$ for numerical stability.)
- It's a smooth "soft" version of argmax: it gives most mass to the winner but keeps the others alive, so every logit receives gradient.

Softmax appears everywhere: classification outputs, per-pixel segmentation outputs, and inside every [[attention]] layer.`,
    },
    {
      id: 'calc-softmax', type: 'numeric', title: 'Softmax by hand',
      question: 'Two classes with logits $(2, 0)$. What probability does softmax give the first class? (Use $e^2 \\approx 7.389$.)',
      answer: 0.881, tolerance: 0.002,
      hint: '$\\frac{e^2}{e^2 + e^0}$',
      explain: '$\\frac{7.389}{7.389 + 1} \\approx 0.881$. With two classes, softmax is the familiar sigmoid of the difference: $\\sigma(2 - 0)$.',
    },
    {
      id: 'temperature', type: 'text', title: 'Temperature: the confidence knob',
      md: `
Divide the logits by a **[[temperature]]** $T > 0$ before the softmax:

$$p_k = \\frac{e^{z_k / T}}{\\sum_j e^{z_j / T}}$$

- $T < 1$ stretches the gaps → **sharper**, more confident; $T \\to 0$ approaches a one-hot argmax.
- $T > 1$ shrinks the gaps → **flatter**, less confident; $T \\to \\infty$ approaches uniform.

This is not a curiosity. In DINO, both a *teacher* and a *student* network output a softmax over thousands of dimensions. The teacher uses a very low temperature (around 0.04 in DINO) and the student a higher one (0.1). The student is trained to match the teacher's **sharpened** distribution — called [[sharpening]] — and combined with [[centering]] this prevents the trivial solution where every image gets the same output ([[collapse]]).[^dino]`,
    },
    {
      id: 'viz-softmax', type: 'viz', viz: 'softmax-temperature', title: 'Play with temperature',
      params: { dino: true },
      task: 'Reach both goals: make the output almost one-hot, then almost uniform — using only the temperature. Then press “Add +3 to every logit” and check that nothing changes. Finally compare the DINO teacher and student presets.',
    },
    {
      id: 'entropy', type: 'text', title: 'Surprise, entropy and cross-entropy',
      md: `
Information theory gives us a way to score beliefs. The **surprise** of an event with probability $p$ is $-\\log p$: certain events ($p = 1$) are not surprising at all, rare events are very surprising.

**[[entropy]]** is the average surprise of a distribution — how uncertain it is:

$$H(p) = -\\sum_k p_k \\log p_k$$

It is 0 for a one-hot distribution and maximal, $\\log K$, for a uniform one.

**[[cross-entropy]]** measures the average surprise of a model with beliefs $q$ when outcomes actually follow $p$:

$$H(p, q) = -\\sum_k p_k \\log q_k$$

For classification the target $p$ is one-hot (the true class $y$), so everything collapses to

$$\\mathcal{L} = -\\log q_y$$

"Negative log of the probability you gave the right answer." Give the truth 90% → loss 0.105. Give it 1% → loss 4.6. Confidently wrong answers are punished hard. This is the standard [[loss-function]] for classification and for [[semantic-segmentation]], where it is averaged over every pixel.`,
    },
    {
      id: 'calc-ce', type: 'numeric', title: 'Cross-entropy loss',
      question: 'The model assigns probability 0.25 to the correct class. What is the cross-entropy loss (natural log)?',
      answer: 1.386, tolerance: 0.005,
      hint: '$-\\ln 0.25 = \\ln 4$',
      explain: '$\\ln 4 \\approx 1.386$ nats. Coincidence worth noticing: that is exactly the loss of a model that guesses uniformly among 4 classes. A freshly initialized segmentation model with $K$ classes starts near $\\ln K$ — a handy sanity check for your first training run.',
    },
    {
      id: 'calc-entropy', type: 'numeric', title: 'Maximum entropy',
      question: 'What is the entropy (natural log) of a uniform distribution over 8 classes?',
      answer: 2.079, tolerance: 0.005,
      hint: 'Each $p_k = 1/8$. The sum of $8$ identical terms $-\\frac18 \\ln \\frac18$.',
      explain: '$\\ln 8 \\approx 2.079$ nats (= 3 bits). No distribution over 8 outcomes can be more uncertain.',
    },
    {
      id: 'kl', type: 'text', title: 'KL divergence in one paragraph',
      md: `
Cross-entropy decomposes as

$$H(p, q) = H(p) + \\mathrm{KL}(p \\,\\|\\, q), \\qquad \\mathrm{KL}(p\\,\\|\\,q) = \\sum_k p_k \\log \\frac{p_k}{q_k} \\ge 0$$

The **[[kl-divergence]]** is the *extra* surprise caused by using $q$ instead of the true $p$. It is zero only when $q = p$. Since $H(p)$ does not depend on the model, minimizing cross-entropy is the same as minimizing KL — pulling the model's distribution towards the target. That is exactly what DINO's student does with the teacher's output.`,
    },
    {
      id: 'match-info', type: 'match', title: 'Formula match',
      pairs: [
        ['softmax', '$\\frac{e^{z_k}}{\\sum_j e^{z_j}}$'],
        ['entropy', '$-\\sum_k p_k \\log p_k$'],
        ['cross-entropy with one-hot target', '$-\\log q_y$'],
        ['KL divergence', '$\\sum_k p_k \\log \\frac{p_k}{q_k}$'],
        ['temperature scaling', '$\\mathrm{softmax}(\\mathbf{z}/T)$'],
        ['expectation', '$\\sum_x p(x)\\, x$'],
      ],
    },
    {
      id: 'quiz-softmax', type: 'quiz', title: 'Softmax & temperature',
      question: 'Select every correct statement.',
      options: [
        { text: 'Adding 10 to all logits changes the softmax output.', correct: false, why: 'Only differences matter; the constant cancels.' },
        { text: 'Lowering the temperature makes the distribution sharper.', correct: true, why: 'Dividing by $T < 1$ enlarges the gaps between logits.' },
        { text: 'Temperature can change which class has the highest probability.', correct: false, why: 'Dividing all logits by the same positive $T$ preserves their order.' },
        { text: 'Cross-entropy is minimized when the model gives probability 1 to the true class.', correct: true, why: '$-\\log 1 = 0$.' },
        { text: 'KL divergence is symmetric: $\\mathrm{KL}(p\\|q) = \\mathrm{KL}(q\\|p)$.', correct: false, why: 'Not in general — which is why it is called a *divergence*, not a distance.' },
      ],
    },
    {
      id: 'mission-pixels', type: 'callout', tone: 'mission', title: 'Segmentation = a softmax at every pixel',
      md: `
A semantic segmentation model for watches outputs logits of shape $(C, H, W)$ — say $C = 8$ classes (background, case, bezel, dial, hands, indices, crown, strap). A softmax over $C$ at every pixel gives a class distribution; the loss is the cross-entropy averaged over all pixels.

Two consequences worth remembering for your data:

- **Class imbalance.** Background and dial cover most pixels; hands and crown are tiny. Plain averaged cross-entropy lets the model ignore small parts cheaply. Remedies: class weights, Dice loss, or cropping around the watch — covered in the segmentation stage.
- **Confidence ≠ correctness.** A model can be very confident (low entropy) on renders and just as confident — but wrong — on real photos. Plotting the per-pixel entropy of predictions on real images is a cheap way to find where your model is unsure.`,
    },
    {
      id: 'deep-mle', type: 'callout', tone: 'deep', title: 'Why the logarithm? Maximum likelihood',
      md: `
If a model assigns probability $q_{y_i}$ to the correct label of each training example, the probability of the whole dataset (assuming independence) is the product $\\prod_i q_{y_i}$. Maximizing that product = maximizing $\\sum_i \\log q_{y_i}$ = minimizing $\\sum_i -\\log q_{y_i}$, the cross-entropy. So cross-entropy training *is* maximum-likelihood estimation. The log also turns a product of tiny numbers (numerical underflow) into a friendly sum.[^goodfellow-dl]`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>English</th><th>Deutsch</th><th>Notation</th></tr>
<tr><td>probability distribution</td><td>Wahrscheinlichkeitsverteilung</td><td>$p(x)$</td></tr>
<tr><td>expected value</td><td>Erwartungswert</td><td>$\\mathbb{E}[X]$</td></tr>
<tr><td>variance / standard deviation</td><td>Varianz / Standardabweichung</td><td>$\\sigma^2$ / $\\sigma$</td></tr>
<tr><td>entropy</td><td>Entropie</td><td>$H(p)$</td></tr>
<tr><td>cross-entropy</td><td>Kreuzentropie</td><td>$H(p, q)$</td></tr>
<tr><td>KL divergence</td><td>Kullback-Leibler-Divergenz</td><td>$D_{\\mathrm{KL}}(p\\,\\|\\,q)$</td></tr>
<tr><td>natural logarithm</td><td>natürlicher Logarithmus</td><td>$\\ln$ (papers often write $\\log$)</td></tr>
<tr><td>likelihood</td><td>Likelihood / Plausibilität</td><td>$\\prod_i q_{y_i}$</td></tr>
<tr><td>maximum likelihood estimation</td><td>Maximum-Likelihood-Schätzung</td><td></td></tr></table>`,
    },
    {
      id: 'recall-temp', type: 'recall', title: 'Explain it to a colleague',
      prompt: 'What does the softmax temperature do, and why would a self-supervised method like DINO give the **teacher** a lower temperature than the student?',
      answer: `Temperature divides the logits before softmax: low $T$ enlarges the differences and makes the distribution peaked; high $T$ flattens it; the ranking of classes is unchanged. In DINO the student learns to match the teacher's output distribution. A low teacher temperature **sharpens** the target so the teacher effectively commits to a few dimensions per image; that pushes different images towards different outputs. On its own, sharpening would let one dimension dominate for all images, so DINO pairs it with **centering** (subtracting a running mean of teacher outputs), which pushes towards uniform. The balance of both prevents collapse.`,
      hints: ['What happens to the targets if the teacher is almost uniform?', 'What must prevent all images from getting the same output?'],
      cards: ['temp', 'dino-temp'],
    },
  ],
  cards: [
    { id: 'softmax', front: 'Softmax formula', back: '$p_k = \\frac{e^{z_k}}{\\sum_j e^{z_j}}$' },
    { id: 'shift', front: 'What happens to softmax if you add a constant to all logits?', back: 'Nothing — only differences between logits matter.' },
    { id: 'temp', front: 'Effect of temperature $T$ in $\\mathrm{softmax}(\\mathbf{z}/T)$', back: '$T<1$: sharper (→ one-hot as $T\\to0$). $T>1$: flatter (→ uniform). Class order unchanged.' },
    { id: 'dino-temp', front: 'DINO: teacher vs student temperature — and why?', back: 'Teacher low (~0.04), student higher (0.1). The sharpened teacher target, balanced by centering, avoids collapse.' },
    { id: 'entropy', front: 'Entropy $H(p)$: formula, min and max (German name?)', back: '$-\\sum p_k\\log p_k$. 0 for one-hot, $\\log K$ for uniform. Entropie.' },
    { id: 'ce', front: 'Cross-entropy loss with a one-hot target', back: '$-\\log q_y$: negative log-probability assigned to the true class.' },
    { id: 'ce-init', front: 'Expected initial loss of a $K$-class classifier/segmenter?', back: '≈ $\\ln K$ (uniform guessing). Good sanity check for the first training steps.' },
    { id: 'kl', front: 'Relation between cross-entropy, entropy and KL divergence', back: '$H(p,q) = H(p) + \\mathrm{KL}(p\\|q)$; minimizing CE over $q$ minimizes KL.' },
    { id: 'seg-softmax', front: 'Semantic segmentation output and loss, in one sentence', back: 'Logits $(C, H, W)$; softmax over $C$ at every pixel; loss = cross-entropy averaged over pixels.' },
  ],
};
