export default {
  id: 'data-strategy',
  title: 'Labels at scale: 100k images',
  summary: 'You have 100,000 images and cannot hand-draw masks for all of them. Design a [[class-taxonomy]] that humans and renderer agree on, let foundation models draft the labels, and spend human effort where it moves the score.',
  minutes: 35,
  goals: [
    'Estimate what pixel-level labeling of 100k images would cost — and why you won’t do it',
    'Write a [[class-taxonomy]] for watch parts with rules for ambiguous cases',
    'Use [[pseudo-label|pseudo-labels]] from SAM-style models and your own model safely',
    'Pick samples with [[active-learning]] and embeddings instead of at random',
    'Set up label quality checks',
  ],
  blocks: [
    {
      id: 'budget', type: 'text', title: 'The arithmetic of labeling',
      md: `
Drawing accurate polygon masks for ~10 watch parts per image takes an experienced annotator several minutes — say **5–15 minutes per image** (an estimate; thin hands and bracelets are slow). For 100,000 images at 10 minutes:

$$100{,}000 \\times 10\\,\\text{min} \\approx 16{,}700\\ \\text{hours} \\approx 8\\ \\text{person-years}$$

So the question is never "how do we label everything?" but **"which few thousand labels buy the most mIoU, and how do we make each one cheaper?"** Three levers:

1. **Make labels cheaper:** correct machine proposals instead of drawing from scratch.
2. **Choose better images:** diverse and informative ones, not random ones.
3. **Use unlabeled images anyway:** [[pseudo-label|pseudo-labels]], self-training, and self-supervised features (DINOv3 learned from unlabeled images — you benefit from that for free).`,
    },
    {
      id: 'taxonomy', type: 'text', title: 'Class taxonomy: the most underrated decision',
      md: `
Before any labeling, write down the **[[class-taxonomy]]**: the classes *and* the rules. A starting point for watches:

<table>
<tr><th>Group</th><th>Classes</th><th>Notes</th></tr>
<tr><td>Case</td><td>case (incl. lugs), bezel, crown, pushers, caseback</td><td>Crown guards → case. Lugs as separate class only if you need them.</td></tr>
<tr><td>Dial</td><td>dial, subdial, date window, indices/numerals, logo/text</td><td>Indices and text are tiny — only worth separate classes if the task needs them.</td></tr>
<tr><td>Hands</td><td>hour, minute, seconds (+ chrono hands)</td><td>Semantic class "hand" or separate instances? Decide from your use case.</td></tr>
<tr><td>Crystal</td><td>crystal (or: none)</td><td>Transparent! Either define it by the bezel's inner edge or don't label it at all.</td></tr>
<tr><td>Attachment</td><td>strap, bracelet, clasp</td><td>Bracelet links as one region, not instances.</td></tr>
<tr><td>Rest</td><td>background</td><td>Wrist, sleeve, box, table.</td></tr>
</table>

Design principles:

- **Hierarchical:** label finely (hour/minute/seconds hand) so you can *merge* later (→ "hands"). Splitting coarse labels later means relabeling.
- **Visible vs amodal:** label only what is visible? Or the full shape behind occlusions (amodal)? Renders make amodal masks trivial, humans can't draw them reliably — pick **visible** unless you truly need amodal.
- **Semantic vs instance:** do you need to tell hands apart (instances, see [[instance-segmentation]]) or just "hand pixels" ([[semantic-segmentation]])? [[panoptic-segmentation|Panoptic]] covers both.
- **Written rules with pictures** for every ambiguous boundary. Ambiguity you don't resolve becomes [[label-noise]] that caps achievable IoU.`,
    },
    {
      id: 'mission-crystal', type: 'callout', tone: 'mission', title: 'Renderer and humans must agree',
      md: `
Your renderer knows the exact 3D geometry, so it can output things no annotator would draw: the crystal as a separate mask, the hidden part of a hand under a subdial, a lug seen edge-on as a 1-pixel sliver. If the human-labeled real set follows different rules, the model learns renderer rules and gets penalized on real data — it looks like a [[domain-gap]] but is a **task mismatch**.

Concrete fix: write the taxonomy once, then **implement the same rules in the render pipeline's mask export** (visible-only masks, merge classes the same way, minimum-area thresholds for slivers). Check it by overlaying render masks and asking: "Would an annotator following the rulebook draw exactly this?"`,
    },
    {
      id: 'match-parts', type: 'match', title: 'Why each part is hard',
      prompt: 'Match the watch part to its main segmentation difficulty.',
      pairs: [
        ['Seconds hand', 'Thinner than one patch at typical resolutions'],
        ['Crystal', 'Transparent; boundary defined by reflections'],
        ['Bracelet', 'Repetitive links, many small gaps'],
        ['Bezel vs case', 'Same material, ambiguous boundary'],
        ['Date window', 'Tiny area — errors barely move mIoU but matter to users'],
      ],
    },
    {
      id: 'pseudo', type: 'text', title: 'Let foundation models draft the labels',
      md: `
**Promptable segmenters.** The SAM family produces masks from clicks or boxes;[^sam] SAM 2 extends this to video and improves quality;[^sam2] SAM 3 accepts short text concepts like "watch hand" and returns all matching instances.[^sam3] In an annotation tool this turns "draw a polygon" into "click, check, fix" — often several times faster (measure it on your data; fine watch parts are harder than the everyday objects SAM was trained on).

**Self-training with your own model.** Train on renders + a small real set → predict on all 100k real images → keep confident predictions as [[pseudo-label|pseudo-labels]] → retrain on the larger set. Works when predictions are confident *and* correct; amplifies errors when they are confidently wrong — so audit samples of every pseudo-labeled batch.

**Iron rule:** pseudo-labels never go into the **evaluation** set. The eval set is human-verified, always.`,
    },
    {
      id: 'calc-budget', type: 'numeric', title: 'What does the budget buy?',
      question: 'You have **300 annotator-hours**. Drawing masks from scratch takes 10 min/image; correcting a SAM-based proposal takes **2 min/image**. How many images can you label with proposals?',
      answer: 9000, tolerance: 0,
      hint: 'Convert hours to minutes, then divide.',
      explain: '$300 \\times 60 / 2 = 9{,}000$ images — versus 1,800 from scratch. Five times more data for the same money, *if* the corrections are really done and not rubber-stamped. Spot-check corrected images for "accepted without looking".',
    },
    {
      id: 'active', type: 'text', title: 'Choose which images to label',
      md: `
Random sampling wastes labels on the typical case — a frontal, well-lit steel diver — that the model already handles. **[[active-learning|Active learning]]** picks samples by:

- **Uncertainty:** where the current model is unsure (per-pixel [[entropy]] averaged over the watch, small margin between the top two classes, disagreement between models).
- **Diversity:** samples covering regions of feature space nothing labeled covers yet — the core-set idea.[^coreset-al] Pure uncertainty sampling tends to pick many near-identical hard images; mixing in diversity fixes that.

Your embeddings make this practical: compute a global DINOv3 [[embedding]] for all 100k images (about an hour on your GPUs — see the compute lesson), then

1. **Deduplicate:** pairs with [[cosine-similarity]] above ~0.95 are near-duplicates (same product shot, crops, resized copies). Keep one — and make sure no duplicate spans train and eval.
2. **Cluster** (k-means with e.g. 200 clusters) and sample from every cluster → coverage of brands, styles, angles.
3. **Rank by uncertainty within clusters** for later labeling rounds.`,
    },
    {
      id: 'game-al', type: 'game', viz: 'active-learning', title: 'Beat random sampling',
      params: { budget: 40, target: 0.9 },
    },
    {
      id: 'qa', type: 'text', title: 'Label quality: measure it like a model',
      md: `
Treat annotations as a noisy process and measure them:

- **Inter-annotator agreement:** have two people label the same ~100 images; compute IoU between them per class. That is roughly the **ceiling** for your model — if humans agree only at 80% IoU on bracelet boundaries, 95% model IoU would be suspicious.
- **Model-assisted review:** images where a good model and the label disagree most are often label errors. Even famous benchmark test sets contain enough label errors to change model rankings.[^label-errors]
- **Gold questions:** mix already-verified images into annotation batches to monitor annotators.
- **Version your labels** (rulebook version, annotator, date). When the rules change, you'll know which masks follow which rules.`,
    },
    {
      id: 'quiz-pseudo', type: 'quiz', title: 'Pseudo-label hygiene',
      question: 'Which data should **never** be replaced by pseudo-labels?',
      options: [
        { text: 'The evaluation (and test) set', correct: true, why: 'Evaluating against model-generated labels measures agreement with that model, not correctness. The eval set must be human-verified.' },
        { text: 'The unlabeled bulk of the 100k images', correct: false, why: 'That is exactly where pseudo-labels are useful, with confidence filtering and audits.' },
        { text: 'Images of common watch styles that the model already handles well', correct: false, why: 'Fine to pseudo-label — though they add little new information.' },
        { text: 'Renders', correct: false, why: 'Renders have exact masks from the renderer; no need for pseudo-labels, but also no harm in comparing.' },
      ],
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>English</th><th>Deutsch</th></tr>
<tr><td>annotation, label</td><td>Annotation, Label, Beschriftung</td></tr>
<tr><td>taxonomy, class</td><td>Taxonomie, Klasse</td></tr>
<tr><td>inter-annotator agreement</td><td>Übereinstimmung zwischen Annotatoren</td></tr>
<tr><td>uncertainty</td><td>Unsicherheit</td></tr>
<tr><td>deduplication</td><td>Deduplizierung (Dubletten entfernen)</td></tr>
<tr><td>amodal mask</td><td>amodale Maske (inkl. verdeckter Teile)</td></tr></table>`,
    },
    {
      id: 'recall-taxonomy', type: 'recall', title: 'Write your first rulebook entries',
      prompt: 'Draft rules for three ambiguous cases in your data: **(a)** the crystal, **(b)** the boundary between case and lugs/crown guards, **(c)** a hand partly hidden under a subdial or another hand. For each, say what renders must do to match.',
      answer: `**(a) Crystal:** either no crystal class (pixels belong to what is seen through it: dial, hands) or crystal defined as the area inside the bezel's inner edge. Reflections do not create a class. Renders must export masks of the *visible* surface behind the glass, not the glass object.

**(b) Case vs lugs/crown guards:** merge lugs and crown guards into *case* unless you truly need them separate; if separate, define a geometric cut (e.g. where the lug leaves the case outline) with reference pictures. Renderer merges or cuts by the same rule.

**(c) Occluded hand:** label **visible pixels only** (modal). The renderer must compute visibility (depth test) instead of exporting the full hand geometry; drop fragments below a minimum area so 1-pixel slivers don't become labels.

General: finer classes that can be merged later; written rules with example images; the same rules implemented in the render mask exporter.`,
      hints: ['What does an annotator actually *see* for each case?', 'Which of these could the renderer output that a human never would?'],
      cards: ['taxonomy-rules', 'modal'],
    },
  ],
  cards: [
    { id: 'label-cost', front: 'Rough cost of pixel-labeling 100k watch images by hand (10 min each)?', back: '≈ 16,700 hours ≈ 8 person-years. Hence: cheaper labels (proposals), smarter selection (active learning), and use of unlabeled data.' },
    { id: 'taxonomy-rules', front: 'Four principles for a segmentation class taxonomy', back: 'Hierarchical (fine classes you can merge), visible (modal) unless amodal is needed, decide semantic vs instance, written rules with pictures for ambiguous boundaries.' },
    { id: 'modal', front: 'Modal vs amodal masks — which should real annotations and renders use by default?', back: 'Modal (visible pixels only). Humans can\'t draw amodal masks reliably; renders must apply the same visibility rule.' },
    { id: 'pseudo-rule', front: 'The iron rule for pseudo-labels', back: 'Never in the evaluation/test set. Filter by confidence and audit samples of every pseudo-labeled batch.' },
    { id: 'sam-assist', front: 'How do SAM-style models speed up annotation?', back: 'They turn polygon drawing into click-and-correct: prompts (points, boxes, or text concepts in SAM 3) produce mask proposals a human fixes.' },
    { id: 'al-two', front: 'Two criteria for active learning sample selection', back: 'Uncertainty (model unsure: entropy, margin, disagreement) and diversity (cover unlabeled regions of feature space, core-set). Mix both.' },
    { id: 'dedupe', front: 'How to find near-duplicates among 100k images, and why it matters', back: 'Cosine similarity of global embeddings (e.g. > 0.95). Duplicates waste labels and, across train/eval, leak and inflate scores.' },
    { id: 'iaa', front: 'What does inter-annotator IoU tell you?', back: 'The practical ceiling for model IoU per class — how consistently humans draw that class.' },
  ],
};
