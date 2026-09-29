export default {
  id: 'experiment-plan',
  title: 'Designing your experiments',
  summary: 'Turn “quality is unstable” into a sequence of small, decisive experiments: a trustworthy real evaluation set, a ladder of baselines, clean [[ablation|ablations]] and systematic [[error-analysis]].',
  minutes: 35,
  goals: [
    'Build an evaluation set you can trust — and know how large it must be',
    'Climb a baseline ladder instead of jumping to the most complex model',
    'Read per-class IoU tables and tell real improvements from noise',
    'Run error analysis that tells you *what to do next*',
  ],
  blocks: [
    {
      id: 'mindset', type: 'text', title: 'The experiment mindset',
      md: `
Deep learning projects rarely fail because of one wrong architecture choice; they fail because nobody can tell whether a change helped. Two classic guides say the same thing in different words: become one with your data, start simple, and change one thing at a time;[^karpathy-recipe] treat tuning as a scientific process with explicit hypotheses and controlled comparisons.[^tuning-playbook]

For your problem this means:

1. A **fixed real evaluation set** that every experiment is measured on.
2. A **baseline ladder**: each rung adds one idea, so every gain has a name.
3. **[[ablation|Ablations]]** for the ideas that matter (synthetic ratio, resolution, frozen vs fine-tuned).
4. **[[error-analysis|Error analysis]]** after each rung to choose the next one.`,
    },
    {
      id: 'eval-set', type: 'text', title: 'An evaluation set you can trust',
      md: `
Your eval set is the ruler for every decision. Rules:

- **Real photos only**, from the distribution you actually care about (the images your system will see).
- **Carefully labeled**: two-pass review, following the written [[class-taxonomy]]. No [[pseudo-label|pseudo-labels]].
- **Stratified and tagged**: cover lighting conditions, dial colors, materials, angles, brands, reflections, occlusion — and store these tags so you can compute scores *per slice*.
- **Leak-free**: no image (and no near-duplicate — check with [[cosine-similarity]] of embeddings) appears in training. Split by *product/watch model*, not by image, if the same watch appears in many photos.
- **Frozen**: once created, it doesn't change. Tune hyperparameters on a separate validation split ([[train-val-test]]); look at the test set rarely.

How big? Big enough that the differences you care about are larger than the noise — which you can calculate.`,
    },
    {
      id: 'viz-noise', type: 'viz', viz: 'eval-noise', title: 'How many eval images do you need?',
      params: { goal: { delta: 1, prob: 0.95 } },
      task: 'Set a realistic per-image spread (σ ≥ 8) and a true improvement of **1 mIoU point or less**. Increase n until the eval set ranks the two models correctly with ≥ 95% probability. How many images is that? What happens at n = 100?',
    },
    {
      id: 'calc-n', type: 'numeric', title: 'Sizing the eval set',
      question: 'Two models are compared on the same images. The per-image IoU difference has a standard deviation of **σ = 12** points, and you want to detect a true improvement of **Δ = 2** points with 95% confidence (one-sided, $z = 1.645$). Using $n \\approx (z\\,\\sigma / \\Delta)^2$, how many images do you need?',
      answer: 98, tolerance: 3,
      hint: '$(1.645 \\times 12 / 2)^2$',
      explain: '$(1.645 \\cdot 6)^2 = 9.87^2 \\approx 97.4$ → about **98 images**. For Δ = 1 point it is four times as many (~390). Small eval sets are fine for big effects and useless for small ones — which is why "unstable quality" is sometimes just a small eval set.',
    },
    {
      id: 'ladder', type: 'text', title: 'The baseline ladder',
      md: `
Climb one rung at a time; stop climbing when the next rung doesn't pay:

1. **Sanity check:** overfit 10 images to ~100% IoU. If that fails, you have a bug (labels, class mapping, augmentation), not a modeling problem.
2. **Frozen features + linear head:** [[frozen-backbone|frozen]] DINOv3 ViT-B/L, a linear classifier per patch, upsampled to pixels ([[dense-features]], [[feature-upsampling]]). Real images only. Minutes to train; tells you how much the features already know.
3. **Frozen features + light decoder:** a small convolutional/upsampling head that recovers sharper boundaries.
4. **+ synthetic data** (mixed batches, several ratios) — does the renderer help *on real*?
5. **+ adaptation:** [[lora|LoRA]] or full [[fine-tuning]] of the backbone.
6. **+ resolution:** crop to the watch and/or go to higher input resolution for thin parts.
7. **Stronger decoders:** e.g. [[mask2former|Mask2Former]]-style heads with the DINOv3 backbone, or instance-level outputs if needed.

Each rung reports **per-class IoU** on the same eval set, plus training cost. The table of rungs *is* your project report.`,
    },
    {
      id: 'order-ladder', type: 'order', title: 'Order the ladder',
      prompt: 'Put these experiments in the order you would run them.',
      items: [
        'Overfit 10 images (sanity check)',
        'Frozen DINOv3 + linear head on real images',
        'Frozen DINOv3 + light decoder head',
        'Add synthetic renders to the training mix',
        'Fine-tune the backbone (LoRA or full)',
        'Higher resolution / watch crops for thin parts',
      ],
      explain: 'Cheap, informative experiments first. Each step isolates one idea, so you always know what bought the improvement — and you may find that rung 3 or 4 is already good enough.',
    },
    {
      id: 'read-table', type: 'text', title: 'Reading a results table',
      md: `
A hypothetical table on an eval set of **120 real images** (per-image σ of differences ≈ 10 points, so the standard error of a difference is ≈ 0.9 points):

<table>
<tr><th>Run</th><th>mIoU</th><th>case</th><th>dial</th><th>hands</th><th>crown</th><th>bracelet</th></tr>
<tr><td>A · frozen + linear</td><td>71.2</td><td>88</td><td>90</td><td>41</td><td>58</td><td>79</td></tr>
<tr><td>B · A + 50% renders</td><td>72.0</td><td>88</td><td>90</td><td>44</td><td>60</td><td>78</td></tr>
<tr><td>C · B + LoRA</td><td>78.5</td><td>91</td><td>93</td><td>63</td><td>67</td><td>79</td></tr>
</table>

Look at **per-class** numbers, not only [[miou|mIoU]]: the mean hides that *hands* are the problem everywhere. A → B is +0.8 mIoU, within noise at n = 120 — maybe helpful for hands, needs more eval data or seeds to claim. B → C is +6.5, far outside noise, and mostly from hands and crown: adapting the backbone helps thin and small parts.`,
    },
    {
      id: 'quiz-table', type: 'quiz', title: 'Which conclusion is justified?',
      question: 'Based on the table above (n = 120, standard error of a difference ≈ 0.9 points), which conclusion is best supported?',
      options: [
        { text: 'LoRA clearly helps, mostly on hands and crown; the benefit of renders is not yet established.', correct: true, why: '+6.5 is ~7 standard errors; +0.8 is less than one. Per-class numbers show where the gain comes from.' },
        { text: 'Renders improve mIoU by 0.8 points, so the renderer works.', correct: false, why: '0.8 points is within one standard error at n = 120 — could easily be noise. Repeat with more images/seeds.' },
        { text: 'The bracelet class got worse with renders, so renders hurt bracelets.', correct: false, why: 'A 1-point per-class change on a small eval set is noise until proven otherwise (per-class estimates are even noisier than mIoU).' },
        { text: 'mIoU 78.5 means the model is ready for production.', correct: false, why: 'Hands at 63 IoU may be unacceptable for your use case; the mean hides the weakest class.' },
      ],
    },
    {
      id: 'error-analysis', type: 'text', title: 'Error analysis that leads somewhere',
      md: `
After each rung, spend an hour looking at failures — systematically:

1. **Rank** eval images by IoU of the worst class (or overall) and open the worst 50 with predictions overlaid.
2. **Tag** each failure with a cause: reflection, thin hand at low resolution, crystal confusion, unusual dial, label error, occlusion, background confusion, …
3. **Count** tags. Usually 2–3 causes explain most of the lost points.
4. **Slice** metrics by your eval-set tags (e.g. "strong reflections" vs "none") to confirm with numbers.
5. **Fix the biggest bucket** with the matching tool: more/better renders for a condition, resolution for thin parts, rulebook fixes for label disagreements.

Label errors will show up in step 2 — expect some, and fix them in the eval set (keeping a version history).[^label-errors]`,
    },
    {
      id: 'match-remedy', type: 'match', title: 'Failure pattern → next experiment',
      pairs: [
        ['Hands broken into pieces at 512 px', 'Crop to the watch / increase resolution'],
        ['Errors cluster in images with strong reflections', 'Randomize lighting & HDRI reflections in renders'],
        ['Model and label disagree, model looks right', 'Audit and fix labels / rulebook'],
        ['Good on renders, poor on real overall', 'Measure the domain gap, add real data'],
        ['Scores fluctuate between identical runs', 'Larger eval set, multiple seeds'],
      ],
    },
    {
      id: 'mission-week', type: 'callout', tone: 'mission', title: 'Your first two weeks, concretely',
      md: `
- **Days 1–2:** write the class rulebook; label (with SAM-assisted proposals) a **300–500 image** real eval set, tagged by condition; dedupe it against everything else.
- **Day 3:** rungs 1–2 — sanity overfit, then frozen DINOv3 + linear head. First honest number.
- **Days 4–5:** rungs 3–4 — light decoder; renders at 0%, 25%, 50%, 75% of each batch. Per-class table.
- **Week 2:** rungs 5–6 — LoRA/full fine-tune of ViT-B/L; watch crops at higher resolution. Error analysis after each run; one targeted renderer change based on the biggest failure bucket.

At the end you know, with numbers, what your renderer is worth, which classes are hard and why, and whether the bottleneck is data, labels, resolution or model.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>English</th><th>Deutsch</th></tr>
<tr><td>evaluation set</td><td>Evaluierungsdatensatz, Testmenge</td></tr>
<tr><td>standard error</td><td>Standardfehler</td></tr>
<tr><td>confidence interval</td><td>Konfidenzintervall</td></tr>
<tr><td>significant</td><td>signifikant</td></tr>
<tr><td>baseline</td><td>Vergleichsbasis, Baseline</td></tr>
<tr><td>data leakage</td><td>Datenleck (Informationsleck)</td></tr></table>`,
    },
    {
      id: 'recall-ablations', type: 'recall', title: 'Your ablation plan',
      prompt: 'List the **four experiments** you would run first on your watch data, what each one isolates, and what result would make you change direction.',
      answer: `1. **Frozen DINOv3 + linear head (real only)** — isolates the quality of off-the-shelf features. If hands/crown are already fine, focus on data; if everything is weak, check labels and resolution first.
2. **Same + renders at several ratios (0/25/50/75%)** — isolates the value of synthetic data *on real*. No gain → measure the domain gap / fix label rules before rendering more.
3. **Adaptation: LoRA or full fine-tune of ViT-B/L** — isolates the benefit of adapting features to watches. Big gains on thin parts → keep; small gains → the bottleneck is data or labels.
4. **Resolution / watch crops** — isolates detail for thin and small parts. If hands jump, resolution was the limit.

All on the same frozen, tagged real eval set, sized so the expected differences exceed the noise, with per-class IoU and a quick error analysis after each.`,
      hints: ['What is the cheapest experiment that tells you something?', 'Which single factor does each step change?'],
      cards: ['ladder', 'per-class'],
    },
  ],
  cards: [
    { id: 'eval-rules', front: 'Five rules for a trustworthy evaluation set', back: 'Real target-distribution images; carefully human-labeled (no pseudo-labels); stratified & tagged; leak-free (dedupe, split by watch model); frozen.' },
    { id: 'n-formula', front: 'Eval images needed to detect a difference Δ with per-image spread σ (95%, one-sided)?', back: '$n \\approx (1.645\\,\\sigma/\\Delta)^2$. σ=10, Δ=1 → ~270; Δ=2 → ~68.' },
    { id: 'ladder', front: 'The baseline ladder for your watch segmentation (7 rungs)', back: 'Overfit 10 images → frozen DINOv3 + linear → + light decoder → + renders → + LoRA/full FT → + resolution/crops (→ stronger decoders).' },
    { id: 'sanity', front: 'Why overfit 10 images first?', back: 'If the model can\'t reach ~100% on 10 training images, there is a bug (labels, class mapping, augmentation) — no point tuning anything else.' },
    { id: 'per-class', front: 'Why report per-class IoU rather than only mIoU?', back: 'The mean hides weak classes (e.g. hands) and where gains come from; decisions depend on the worst classes.' },
    { id: 'ablation-def', front: 'What is an ablation?', back: 'An experiment that changes exactly one component relative to a fixed baseline, measured on a fixed eval set.' },
    { id: 'error-steps', front: 'Error analysis in five steps', back: 'Rank worst images → tag causes → count tags → slice metrics by tags → fix the biggest bucket.' },
    { id: 'noise-claim', front: 'Your eval set has SE of a difference ≈ 0.9 points. A change gives +0.8 mIoU. Conclusion?', back: 'Not established — within noise. Use more eval images or several seeds before claiming it helps.' },
  ],
};
