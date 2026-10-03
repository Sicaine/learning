export default {
  id: 'dino-v1',
  title: 'DINO: self-distillation with no labels',
  summary: '**DINO** (2021) is the direct ancestor of DINOv2 and DINOv3. A student network learns to match a teacher that is just an averaged copy of itself — no labels, no negatives — and its attention maps end up segmenting objects without ever seeing a mask.',
  minutes: 40,
  goals: [
    'Draw the DINO architecture: [[multi-crop]] views, student, [[ema]] teacher, stop-gradient',
    'Write the DINO loss and explain every symbol',
    'Explain how [[centering]] and [[sharpening]] together prevent both kinds of [[collapse]]',
    'Explain why DINO\'s attention maps look like segmentations — and their limits for watch parts',
  ],
  blocks: [
    {
      id: 'idea', type: 'text', title: 'The idea in one paragraph',
      md: `
DINO stands for **self-DIstillation with NO labels**.[^dino] In classic [[knowledge-distillation]], a small student learns to imitate a big, already-trained teacher. DINO keeps the student–teacher setup but has *no trained teacher*: the teacher is simply an **[[ema|exponential moving average]]** of the student's own past weights. The student sees small and large crops of an image and has to predict what the teacher says about the large crops. Because the averaged teacher is always a bit better than the student, the student keeps improving — it pulls itself up by its own bootstraps.`,
    },
    {
      id: 'arch', type: 'figure', title: 'DINO at a glance',
      html: `<svg viewBox="0 0 660 300" width="660" font-family="Inter, sans-serif" font-size="12">
  <defs><marker id="dnA" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#8a8aa3"/></marker></defs>
  <rect x="10" y="118" width="70" height="64" rx="10" fill="#f3f3f8" stroke="#d9d9e4"/>
  <circle cx="45" cy="150" r="20" fill="#1d2a4a"/><circle cx="45" cy="150" r="14" fill="#2f5c8f"/>
  <text x="45" y="200" text-anchor="middle" fill="#3b3b55">image x</text>
  <line x1="84" y1="140" x2="124" y2="80" stroke="#8a8aa3" stroke-width="1.4" marker-end="url(#dnA)"/>
  <line x1="84" y1="160" x2="124" y2="220" stroke="#8a8aa3" stroke-width="1.4" marker-end="url(#dnA)"/>
  <g><rect x="128" y="52" width="46" height="46" rx="6" fill="#fff" stroke="var(--accent-2)" stroke-width="2"/><rect x="138" y="62" width="46" height="46" rx="6" fill="#fff" stroke="var(--accent-2)" stroke-width="2"/>
  <text x="160" y="40" text-anchor="middle" fill="#3b3b55" font-weight="600">2 global crops</text><text x="160" y="124" text-anchor="middle" fill="#74748c" font-size="11">224²</text></g>
  <g>${[0, 1, 2, 3].map(i => `<rect x="${126 + i * 16}" y="${196 + (i % 2) * 8}" width="24" height="24" rx="4" fill="#fff" stroke="var(--accent)" stroke-width="1.8"/>`).join('')}
  <text x="160" y="250" text-anchor="middle" fill="#3b3b55" font-weight="600">local crops</text><text x="160" y="264" text-anchor="middle" fill="#74748c" font-size="11">96², several</text></g>
  <rect x="250" y="40" width="130" height="70" rx="12" fill="#16162a"/>
  <text x="315" y="68" text-anchor="middle" fill="#fff" font-weight="700">teacher g<tspan font-size="9" dy="3">θt</tspan></text>
  <text x="315" y="88" text-anchor="middle" fill="#c9c9e0" font-size="11">global crops only</text>
  <rect x="250" y="185" width="130" height="70" rx="12" fill="var(--accent-soft)" stroke="var(--accent-line)"/>
  <text x="315" y="213" text-anchor="middle" fill="var(--accent)" font-weight="700">student g<tspan font-size="9" dy="3">θs</tspan></text>
  <text x="315" y="233" text-anchor="middle" fill="var(--accent)" font-size="11">all crops</text>
  <line x1="190" y1="80" x2="246" y2="75" stroke="#8a8aa3" stroke-width="1.4" marker-end="url(#dnA)"/>
  <line x1="194" y1="95" x2="246" y2="195" stroke="#8a8aa3" stroke-width="1.2" stroke-dasharray="3 3" marker-end="url(#dnA)"/>
  <line x1="196" y1="215" x2="246" y2="220" stroke="#8a8aa3" stroke-width="1.4" marker-end="url(#dnA)"/>
  <path d="M315 181 L315 116" stroke="var(--accent-2)" stroke-width="2" stroke-dasharray="5 4" marker-end="url(#dnA)"/>
  <text x="322" y="146" fill="var(--accent-2)" font-weight="600" font-size="11">EMA of weights</text>
  <rect x="410" y="40" width="120" height="70" rx="12" fill="#fff" stroke="#d9d9e4"/>
  <text x="470" y="64" text-anchor="middle" fill="#16162a" font-weight="600">− center c</text>
  <text x="470" y="84" text-anchor="middle" fill="#16162a" font-weight="600">softmax(·/τt)</text>
  <text x="470" y="101" text-anchor="middle" fill="#74748c" font-size="10">τt = 0.04 (sharp)</text>
  <rect x="410" y="185" width="120" height="70" rx="12" fill="#fff" stroke="#d9d9e4"/>
  <text x="470" y="218" text-anchor="middle" fill="#16162a" font-weight="600">softmax(·/τs)</text>
  <text x="470" y="238" text-anchor="middle" fill="#74748c" font-size="10">τs = 0.1</text>
  <line x1="384" y1="75" x2="406" y2="75" stroke="#8a8aa3" stroke-width="1.4" marker-end="url(#dnA)"/>
  <line x1="384" y1="220" x2="406" y2="220" stroke="#8a8aa3" stroke-width="1.4" marker-end="url(#dnA)"/>
  <rect x="560" y="118" width="92" height="64" rx="12" fill="var(--accent)"/>
  <text x="606" y="146" text-anchor="middle" fill="#fff" font-weight="700">cross-</text><text x="606" y="162" text-anchor="middle" fill="#fff" font-weight="700">entropy</text>
  <line x1="534" y1="80" x2="572" y2="116" stroke="#8a8aa3" stroke-width="1.4" marker-end="url(#dnA)"/>
  <line x1="534" y1="215" x2="572" y2="184" stroke="#8a8aa3" stroke-width="1.4" marker-end="url(#dnA)"/>
  <text x="552" y="96" fill="#d4513d" font-weight="700" font-size="11">stop-grad</text>
  <text x="560" y="210" fill="var(--accent)" font-size="11">gradients</text>
</svg>`,
      caption: 'The teacher sees only the global crops; the student sees all crops. Only the student receives gradients; the teacher follows as an EMA of the student.',
    },
    {
      id: 'outputs', type: 'text', title: 'Two networks, one architecture',
      md: `
Student $g_{\\theta_s}$ and teacher $g_{\\theta_t}$ have **identical architecture**: a [[vit|ViT]] [[backbone]] followed by a projection head (a 3-layer [[mlp|MLP]], an L2-normalized bottleneck and a weight-normalized linear layer) that outputs $K$ numbers — $K = 65{,}536$ in the paper.[^dino]

Those $K$ numbers are [[logits]], turned into a probability distribution with a temperature-scaled [[softmax]]. For the student:

$$P_s(x)^{(i)} = \\frac{\\exp\\big(g_{\\theta_s}(x)^{(i)} / \\tau_s\\big)}{\\sum_{k=1}^{K} \\exp\\big(g_{\\theta_s}(x)^{(k)} / \\tau_s\\big)}$$

and the same for the teacher with $\\tau_t$ — **after subtracting a center** $c$ (more on that below):

$$P_t(x) = \\operatorname{softmax}\\!\\left(\\frac{g_{\\theta_t}(x) - c}{\\tau_t}\\right)$$

Think of the $K$ dimensions as learned, unnamed "prototypes" or pseudo-classes. Nobody defines them; the model invents a [clustering](wiki:Cluster analysis|Clusteranalyse) of the visual world on its own.`,
    },
    {
      id: 'multicrop', type: 'text', title: 'Multi-crop: local views must explain the global picture',
      md: `
From every image, DINO creates a set of views $V$ with **[[multi-crop]]** (an idea from SwAV[^swav]):

- **2 global views** $x_1^g, x_2^g$ at 224×224, each covering a large part of the image,
- **several local views** at 96×96, each covering a small region.

The **teacher sees only global views**; the **student sees all views**. So the student regularly gets a tiny crop — say, just a piece of bezel — and must output the same distribution the teacher produced for the whole watch. That teaches **local-to-global correspondence**: parts are understood in terms of the object they belong to. Local crops are small, so many of them cost little compute.`,
    },
    {
      id: 'loss', type: 'text', title: 'The loss',
      md: `
The student is trained to minimize the [[cross-entropy]] $H(a, b) = -\\sum_i a^{(i)} \\log b^{(i)}$ between teacher and student outputs, over all pairs of *different* views where the teacher saw a global view:

$$\\min_{\\theta_s} \\sum_{x \\in \\{x_1^g,\\, x_2^g\\}} \;\; \\sum_{\\substack{x' \\in V \\\\ x' \\neq x}} H\\big(P_t(x),\\, P_s(x')\\big)$$

Three details matter:

1. **Stop-gradient on the teacher.** $P_t$ is treated as a constant target; gradients flow only into $\\theta_s$.
2. **Different views only.** Matching a view to itself would be trivial.
3. **No negatives.** Unlike [[infonce]], nothing explicitly pushes different images apart — so collapse must be prevented another way.`,
    },
    {
      id: 'calc-pairs', type: 'numeric', title: 'Count the loss terms',
      question: 'With **2 global** and **10 local** crops per image, how many (teacher view, student view) pairs contribute to the loss for one image?',
      answer: 22, tolerance: 0,
      hint: 'The teacher has 2 views. Each is paired with every student view *except itself*. The student has 12 views in total.',
      explain: 'Each of the 2 teacher views pairs with $12 - 1 = 11$ student views → $2 \\cdot 11 = 22$ terms. Two of them are global↔global; twenty are global→local, which is where the local-to-global learning happens.',
    },
    {
      id: 'ema', type: 'text', title: 'The teacher: an average of the student\'s past',
      md: `
The teacher is never trained by backpropagation. After every step, its weights move a little toward the student's:

$$\\theta_t \\leftarrow \\lambda\\, \\theta_t + (1 - \\lambda)\\, \\theta_s$$

with $\\lambda$ following a **cosine schedule from 0.996 to 1** during training.[^dino] At $\\lambda = 0.996$ the teacher averages roughly the last $1/(1-\\lambda) = 250$ student versions. Averaging weights over time acts like an [ensemble](wiki:Ensemble learning) ("Polyak–Ruppert averaging"), and the paper observes that **the teacher outperforms the student throughout training** — so it provides targets that are genuinely better than what the student currently knows. As $\\lambda \\to 1$ the teacher freezes and training settles.`,
    },
    {
      id: 'center-sharpen', type: 'text', title: 'Centering and sharpening: two opposing forces',
      md: `
Without negatives, two kinds of collapse threaten:

- **Dimension collapse:** one of the $K$ dimensions wins for *every* image → all targets are the same [one-hot](wiki:One-hot|1-aus-n-Code) vector.
- **Uniform collapse:** the teacher's output becomes flat, $P_t = \\frac{1}{K}$ everywhere → every target says nothing.

DINO applies two simple operations to the **teacher** only:

**[[centering|Centering]]** subtracts a running mean $c$ of the teacher's logits, updated with momentum $m = 0.9$:

$$c \\leftarrow m\\, c + (1 - m)\\, \\frac{1}{B} \\sum_{i=1}^{B} g_{\\theta_t}(x_i)$$

A dimension that is high for every image gets subtracted away → prevents dimension collapse, but *encourages* a uniform output.

**[[sharpening|Sharpening]]** uses a low teacher temperature, $\\tau_t = 0.04$ (vs. $\\tau_s = 0.1$ for the student). Low temperature makes the distribution peaked → prevents uniform collapse, but *encourages* one dimension to dominate.

Balanced, the two cancel each other's failure mode. In the language of [[entropy]]: sharpening lowers the entropy of each target, centering keeps the targets *different across images*.`,
    },
    {
      id: 'viz-balance', type: 'viz', viz: 'dino-centering-sharpening', title: 'Balance the teacher',
      task: 'Reach all three states: (1) cause **dimension collapse**, (2) cause **uniform collapse**, (3) find a **healthy** setting while the shared bias is at least 2. Which knob fixes which collapse?',
    },
    {
      id: 'calc-softmax-temp', type: 'numeric', title: 'Feel the temperature',
      question: 'Teacher logits (after centering) are $(2, 1, 0)$. What probability does the softmax assign to the first dimension at temperature $\\tau = 0.5$? (Give a decimal.)',
      answer: 0.867, tolerance: 0.004,
      hint: 'Divide the logits by 0.5 → $(4, 2, 0)$. Then $\\frac{e^4}{e^4 + e^2 + e^0}$.',
      explain: '$\\frac{54.60}{54.60 + 7.39 + 1} \\approx 0.867$. At $\\tau = 1$ it would be only $0.665$; at DINO\'s $\\tau_t = 0.04$ it is essentially $1.0$. Same logits, very different targets — that\'s sharpening.',
    },
    {
      id: 'order-step', type: 'order', title: 'One DINO training step',
      prompt: 'Order the operations of one DINO iteration.',
      items: [
        'Create 2 global and several local crops of each image in the batch',
        'Teacher encodes the global crops; student encodes all crops',
        'Teacher output: subtract center $c$, softmax with $\\tau_t$',
        'Student output: softmax with $\\tau_s$',
        'Cross-entropy between teacher and student outputs over all pairs of different views',
        'Backpropagate and update the student with the optimizer',
        'Update the teacher weights as an EMA of the student weights',
        'Update the center $c$ with the batch mean of the teacher outputs',
      ],
      explain: 'Only step 6 uses gradients. Steps 7 and 8 are plain moving averages — the teacher and the center are *statistics* of the training run, not learned by backprop. (Steps 7 and 8 need no gradients, so their exact timing is flexible — the official code actually updates the center right when the loss is computed, and the teacher EMA after the optimizer step.)',
    },
    {
      id: 'emergent', type: 'text', title: 'The surprise: segmentation for free',
      md: `
Take a DINO-trained ViT and look at the **[[self-attention]]** of the [[cls-token|CLS token]] in the last layer: which patches does the image summary attend to? The maps outline the main objects — birds, cars, people — with sharp boundaries, although DINO never saw a mask or a label.[^dino] Supervised ViTs trained on [ImageNet](wiki:ImageNet|ImageNet) labels show much noisier maps.

Why? To match a teacher that saw the whole scene from tiny local crops, the network must figure out *which patches belong to the same object*. Grouping patches into objects is exactly what [segmentation](wiki:Image segmentation|Segmentierung (Bildverarbeitung)) needs.

Features were also strong by standard measures: DINO ViT-S/16 reached about 77% ImageNet linear-probe accuracy and ViT-B/8 about 80%, with k-NN close behind — without labels.[^dino]`,
    },
    {
      id: 'video-dino', type: 'video', youtube: 'h3ij3F3cPIk', label: 'DINO: Emerging Properties in Self-Supervised Vision Transformers', channel: 'Yannic Kilcher', minutes: 39,
      why: 'A thorough paper walkthrough.[^yannic-dino] The first ~15 minutes cover the attention maps and the architecture; the rest goes into centering, sharpening and ablations — good revision after this lesson.',
    },
    {
      id: 'quiz-dino', type: 'quiz', title: 'Check your model of DINO',
      question: 'Select every correct statement about DINO.',
      options: [
        { text: 'The teacher receives gradients, but with a smaller learning rate.', correct: false, why: 'The teacher gets no gradients at all (stop-gradient). It is updated only as an EMA of the student.' },
        { text: 'The teacher sees only the global crops.', correct: true, why: 'Local crops go only to the student, forcing local-to-global prediction.' },
        { text: 'Centering alone would push the teacher toward a uniform output.', correct: true, why: 'Removing the mean removes preferences; without sharpening the distribution flattens.' },
        { text: 'DINO needs large batches of negatives like SimCLR.', correct: false, why: 'DINO uses no negatives; centering + sharpening prevent collapse.' },
        { text: 'The teacher uses a lower temperature than the student.', correct: true, why: '$\\tau_t = 0.04$ vs. $\\tau_s = 0.1$ — the sharper teacher gives confident targets.' },
        { text: 'The $K$ output dimensions correspond to ImageNet classes.', correct: false, why: 'They are unnamed pseudo-classes the model invents; K = 65,536 is far more than any label set.' },
      ],
    },
    {
      id: 'match-parts', type: 'match', title: 'Which component does what?',
      pairs: [
        ['Centering', 'Stops one dimension from winning for every image'],
        ['Sharpening (low τ_t)', 'Stops the teacher output from becoming uniform'],
        ['EMA teacher', 'Provides stable targets that are better than the current student'],
        ['Stop-gradient', 'Makes the teacher output a fixed target for this step'],
        ['Multi-crop', 'Forces local views to predict the global content'],
      ],
    },
    {
      id: 'mission-attn', type: 'callout', tone: 'mission', title: 'Free segmentation — and its limits on watches',
      md: `
A cheap, very informative experiment for your data: run a DINO-family model (in practice DINOv2 or DINOv3 — same idea, much better features) on 50 of your photos and 50 renders and look at (a) the CLS attention maps and (b) a PCA of the patch features mapped to RGB. You'll see immediately whether the backbone separates **watch vs. background** and whether **dial, bezel, strap** fall into different feature clusters.

Expect two limitations:

- **Saliency, not parts.** CLS attention highlights the *main object*. Separating parts requires patch features plus a trained head.
- **Resolution.** Features live on the patch grid. At 224 px with patch size 16 you get a 14×14 grid — one patch covers 16×16 pixels. A second hand that is 3 px wide is *far* thinner than a patch. For hands, indices and the crown you will need higher input resolution (e.g. 518 px with patch 14 → 37×37) and/or feature upsampling — a theme in the DINOv3 stage.`,
    },
    {
      id: 'deep-ema', type: 'callout', tone: 'deep', title: 'Why doesn\'t the student just copy a bad teacher forever?',
      md: `
At initialization the teacher is random, so why doesn't the pair agree on nonsense? Three reasons combine:

1. **The task is non-trivial across views.** Matching a 96² bezel crop to the 224² global view is only possible if the features encode object structure; random features give high loss.
2. **The teacher is an ensemble.** EMA averaging smooths the student's noisy updates; the resulting teacher is measurably better than any single student snapshot, so there is always something to learn.
3. **Centering + sharpening keep the targets informative.** They block both degenerate solutions, so the only way to reduce the loss is to learn real, view-invariant features.

This "bootstrapping" dynamic is shared with BYOL[^byol] and was later combined with masked prediction in iBOT[^ibot] and DINOv2.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>English</th><th>Deutsch</th><th>Notation</th></tr>
<tr><td>self-distillation</td><td>Selbstdestillation</td><td></td></tr>
<tr><td>teacher / student</td><td>Lehrer- / Schülernetz</td><td>$\\theta_t$, $\\theta_s$</td></tr>
<tr><td>exponential moving average</td><td>exponentiell gleitender Mittelwert</td><td>$\\lambda\\theta_t + (1-\\lambda)\\theta_s$</td></tr>
<tr><td>centering</td><td>Zentrierung</td><td>$c$</td></tr>
<tr><td>sharpening / temperature</td><td>Schärfung / Temperatur</td><td>$\\tau_t$, $\\tau_s$</td></tr>
<tr><td>cross-entropy</td><td>Kreuzentropie</td><td>$H(a,b) = -\\sum a \\log b$</td></tr>
<tr><td>stop-gradient</td><td>Gradientenstopp (kein Gradientenfluss)</td><td>$\\mathrm{sg}[\\cdot]$</td></tr>
<tr><td>crop (global / local)</td><td>Bildausschnitt (global / lokal)</td><td></td></tr></table>`,
    },
    {
      id: 'recall-dino', type: 'recall', title: 'Explain it to a colleague',
      prompt: 'DINO has no negatives. Explain how it avoids collapse. Name both failure modes and which mechanism prevents which, and say what role the EMA teacher plays.',
      answer: `There are two degenerate solutions: **dimension collapse** (one output dimension dominates for all images, every target is the same one-hot vector) and **uniform collapse** (the teacher outputs a flat distribution, targets carry no information). **Centering** subtracts a running mean of the teacher logits, so a dimension that is high for *every* image is removed — this prevents dimension collapse but pushes toward uniform outputs. **Sharpening** — a low teacher temperature $\\tau_t = 0.04$ — makes the targets peaked, preventing uniform collapse but favoring domination. Applied together they balance. The **EMA teacher** (weights averaged over the student's recent past, $\\lambda$: 0.996→1, no gradients) provides stable targets that are slightly better than the current student, so there is always a meaningful signal to learn from instead of a moving, noisy target.`,
      hints: ['One failure mode is "everything the same peak", the other is "everything flat".', 'Which of the two operations works on the *mean over the batch*, which on each distribution?'],
      cards: ['two-collapses', 'center-vs-sharpen'],
    },
  ],
  cards: [
    { id: 'dino-name', front: 'What does DINO stand for, and what is its core idea?', back: 'Self-**DI**stillation with **NO** labels: a student matches the output distribution of an EMA teacher (its own averaged past) across different crops.' },
    { id: 'dino-loss', front: 'Write the DINO objective.', back: '$\\min_{\\theta_s} \\sum_{x\\in\\{x_1^g,x_2^g\\}} \\sum_{x\'\\in V, x\'\\neq x} H(P_t(x), P_s(x\'))$ with $H(a,b) = -\\sum a\\log b$; teacher output is centered and sharpened, stop-gradient on the teacher.' },
    { id: 'multicrop', front: 'DINO multi-crop: which views, and who sees what?', back: '2 global crops (224²) + several local crops (96²). Teacher: global only. Student: all views.' },
    { id: 'ema-update', front: 'DINO teacher update rule and schedule', back: '$\\theta_t \\leftarrow \\lambda\\theta_t + (1-\\lambda)\\theta_s$, $\\lambda$ cosine schedule 0.996 → 1. No gradients.' },
    { id: 'two-collapses', front: 'The two collapse modes DINO must avoid', back: '(1) Dimension collapse: one dimension dominates for all images. (2) Uniform collapse: flat teacher output.' },
    { id: 'center-vs-sharpen', front: 'Centering prevents ___ collapse; sharpening prevents ___ collapse.', back: 'Centering → dimension (one-dominates) collapse. Sharpening → uniform collapse. Each alone causes the other.' },
    { id: 'center-update', front: 'DINO center update', back: '$c \\leftarrow m c + (1-m)\\frac{1}{B}\\sum_i g_{\\theta_t}(x_i)$ with $m = 0.9$; subtracted from teacher logits.' },
    { id: 'temps', front: 'DINO temperatures: teacher vs. student', back: '$\\tau_t = 0.04$ (sharp teacher), $\\tau_s = 0.1$.' },
    { id: 'K', front: 'What are DINO\'s $K$ output dimensions?', back: 'Unnamed pseudo-classes/prototypes the model invents; $K = 65{,}536$. Not real classes.' },
    { id: 'emergent', front: 'DINO\'s famous emergent property', back: 'The last-layer self-attention of the CLS token segments the main objects, without any mask or label supervision.' },
    { id: 'resolution-limit', front: 'Why can\'t patch features at 224 px / patch 16 resolve a watch\'s second hand?', back: 'The feature grid is 14×14; each patch covers 16×16 px — much wider than a 2–4 px hand. Needs higher resolution and/or feature upsampling.' },
  ],
};
