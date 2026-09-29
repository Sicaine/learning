export default {
  id: 'sim-to-real',
  title: 'Synthetic data & the domain gap',
  summary: 'Renders give you perfect labels for free — and teach your model a world that does not exist. Learn why renders don’t transfer automatically, how to *measure* the [[domain-gap]], and how randomization and a little real data close it.',
  minutes: 35,
  goals: [
    'Name the concrete ways watch renders differ from real photos',
    'Explain [[domain-randomization]] and when “more randomization” stops helping',
    'Measure a domain gap with a [[domain-classifier]] on frozen features',
    'Choose a strategy for mixing synthetic and real data in your pipeline',
  ],
  blocks: [
    {
      id: 'promise', type: 'text', title: 'The promise and the catch',
      md: `
Your 3D generator is a superpower: every render comes with a **pixel-perfect mask** for every part, you can produce rare cases on demand (skeleton dials, exotic bracelets, extreme angles), and the marginal cost of an image is a few seconds of GPU time.

The catch: a network learns **whatever makes the training loss go down**. If renders have perfectly sharp edges, physically idealized reflections, no dust, no sensor noise, no JPEG artifacts and only a handful of HDRI backgrounds, the model may learn "a hand is the thin thing with the perfect specular highlight" — a rule that is true in the renderer and false on your photos.

That systematic difference between training distribution and deployment distribution is the **[[domain-gap]]**; making a model trained on simulation work in reality is **[[sim-to-real]]** transfer. It is the classic failure of synthetic data, and it is measurable.`,
    },
    {
      id: 'mission-symptom', type: 'callout', tone: 'mission', title: '“Unstable quality” — is it the domain gap?',
      md: `
Unstable segmentation quality can have several causes. Before fixing anything, find out which one you have:

- **Domain gap:** great on held-out *renders*, clearly worse on *real* photos; failures cluster around reflections, lighting, backgrounds. → this lesson.
- **Label inconsistency:** render masks and human masks follow different rules (is the crystal a class? where does the case end and the lug start?). → next lesson, [[class-taxonomy]].
- **Resolution:** hands, date windows and indices are thin/tiny; at 16-pixel patches a seconds hand may be narrower than one [[token]]. → compute lesson.
- **Evaluation noise:** a small eval set makes a model look "unstable" between runs even when it isn't. → experiment lesson.

The first test is cheap: evaluate the *same* model on 200 held-out renders and 200 real photos. The difference in [[miou|mIoU]] is your gap, in points.`,
    },
    {
      id: 'what-differs', type: 'text', title: 'Where renders and photos differ',
      md: `
<table>
<tr><th>Factor</th><th>Typical render</th><th>Typical real photo</th></tr>
<tr><td><b>Materials</b></td><td>Idealized PBR steel, uniform brushing</td><td>Scratches, fingerprints, dust, wear, anisotropic brushing, AR-coated crystal</td></tr>
<tr><td><b>Lighting & reflections</b></td><td>A few HDRI maps, clean highlights</td><td>Mixed light, the photographer reflected in the crystal, blown highlights</td></tr>
<tr><td><b>Camera</b></td><td>Pinhole, infinite depth of field, no noise</td><td>Lens distortion, shallow focus, motion blur, sensor noise, JPEG compression</td></tr>
<tr><td><b>Context</b></td><td>Floating watch, simple background</td><td>Wrists, sleeves, boxes, tables, partial occlusion, other watches</td></tr>
<tr><td><b>Distribution</b></td><td>Poses and models sampled uniformly</td><td>Mostly frontal 10:10 marketing shots, some brands dominate</td></tr>
<tr><td><b>Labels</b></td><td>Exact geometry, including barely visible parts</td><td>What a human can see and decides to draw</td></tr>
</table>

The last row is easy to overlook: even with a perfect renderer, if the *definition* of a mask differs between renders and human annotations, the model is trained on one task and evaluated on another.`,
    },
    {
      id: 'randomize', type: 'text', title: 'Two philosophies: photorealism vs randomization',
      md: `
**Photorealism** tries to make renders indistinguishable from photos. It works, but every missing detail becomes a shortcut the model can exploit, and the effort never really ends.

**[[domain-randomization|Domain randomization]]** takes the opposite route: vary everything that varies in the real world, *far beyond* realism — random lighting, HDRI environments, materials, textures, backgrounds, camera pose, focal length, blur, noise. If the training distribution is wide enough, the real world is just one more sample from it. It was introduced for robot vision trained purely in simulation,[^domain-randomization] and later shown to work for object detection, where synthetic pre-training followed by fine-tuning on a little real data worked best.[^dr-synthetic]

Two rules of thumb for watches:

1. **Randomize nuisances, keep structure faithful.** Lighting, reflections, backgrounds, camera and wear are nuisances — randomize them hard. Geometry, part relationships and typical proportions are the *signal* — keep them realistic.
2. **Randomization has a cost.** Every variation that never occurs in reality consumes model capacity and training time. Check that the synthetic distribution *covers* reality, not that it is as wide as possible.`,
    },
    {
      id: 'viz-gap', type: 'viz', viz: 'domain-gap', title: 'Close the gap in feature space',
      params: { target: 0.65 },
      task: 'Enable randomization axes and adjust the strength until the domain classifier drops to ≤ 65% while few renders are wasted far away from real data. Then try adding “unrealistic textures” — what happens to coverage and waste? Also try all four realistic axes at full strength: is more always better?',
    },
    {
      id: 'measure', type: 'callout', tone: 'deep', title: 'Recipe: measure your real gap in an afternoon',
      md: `
1. Pick ~1,000 real photos and ~1,000 renders (similar watch models if possible).
2. Embed them with a frozen [[dinov3|DINOv3]] ViT-B or ViT-L [[backbone]] — global embedding (CLS token or mean of patch features).[^dinov3]
3. Train a [[domain-classifier]]: logistic regression or k-NN, 5-fold cross-validated. Accuracy near 50% = overlap; near 100% = clear gap. (Naive renders are usually separated almost perfectly — that's normal, it is a very sensitive test.)
4. Look at the *most confidently classified* renders: they show you what the renderer gets wrong.
5. Go dense: average the patch features per class (dial, case, hands, …) using your masks, in real and synthetic images separately, and compare with [[cosine-similarity]]. If "synthetic dial" is closer to "synthetic case" than to "real dial", your model has to re-learn what a dial looks like on real data.
6. The ultimate test: train on renders only, evaluate on real — then add real data in steps (100, 500, 2,000 images) and plot real mIoU. That curve tells you what synthetic data is worth to you.`,
    },
    {
      id: 'mixing', type: 'text', title: 'Mixing real and synthetic data',
      md: `
Common, proven recipes — you will likely combine several:

- **Synthetic pre-training → real fine-tuning.** Train on renders first, then fine-tune on a smaller real set. Cheap on labels and usually the strongest simple baseline.[^dr-synthetic]
- **Mixed batches.** Every [[batch]] contains a fixed ratio (e.g. 50/50) of real and synthetic images. The ratio is a hyperparameter worth an [[ablation]].
- **Targeted synthesis.** Use renders mainly for what is *rare* in your real data: unusual dials, extreme angles, specific complications.
- **[[copy-paste-augmentation|Copy-paste]]:** cut real watches out with their masks and paste them onto varied real backgrounds — real appearance, synthetic composition.[^copy-paste]
- **Start from a strong real-image [[backbone]].** DINOv3 was pre-trained on ~1.7 billion real images;[^dinov3] a frozen or lightly fine-tuned backbone already "knows" what real steel and glass look like. Only a small head learns from renders — less room to memorize renderer quirks (though the head can still overfit to them).

What rarely works: a small amount of real data drowned in 50× more renders with no ratio control — the loss is dominated by the synthetic domain.`,
    },
    {
      id: 'quiz-random', type: 'quiz', title: 'Which randomizations are likely worth it for watches?',
      question: 'You render watches for part segmentation and evaluate on real photos. Select the randomizations that are most likely to **help**.',
      options: [
        { text: 'Random HDRI environments and light positions — reflections on crystal and case change a lot', correct: true, why: 'Reflections are a top real-world nuisance for watches; varying them prevents "highlight = hand" shortcuts.' },
        { text: 'Random backgrounds from real photos (tables, wrists, boxes)', correct: true, why: 'Real context varies enormously; floating watches on clean backgrounds are an easy shortcut.' },
        { text: 'Camera effects: focal length, depth of field, motion blur, noise, JPEG compression', correct: true, why: 'These are exactly what separates photos from pinhole renders.' },
        { text: 'Random non-physical geometry: bending the case and hands into arbitrary shapes', correct: false, why: 'Geometry and part relations are the signal. Distorting them teaches the model shapes that never occur.' },
        { text: 'Wear and surface variation: scratches, fingerprints, dust, varied brushing', correct: true, why: 'Real watches are rarely pristine; idealized PBR surfaces are a strong domain cue.' },
      ],
    },
    {
      id: 'calc-gap', type: 'numeric', title: 'How much of the gap did fine-tuning close?',
      question: 'Trained on renders only: **88.0** mIoU on held-out renders, **61.0** on real photos. After fine-tuning on 2,000 real images the real score is **74.0**. What percentage of the original gap was closed?',
      answer: 48.1, tolerance: 0.5, unit: '%',
      hint: 'Gap = render score − real score. Improvement on real divided by that gap.',
      explain: 'Gap: $88 - 61 = 27$ points. Closed: $74 - 61 = 13$ points. $13/27 \\approx 48\\%$. Repeat with 500 and 5,000 real images to draw the curve — its shape tells you whether more real labels or a better renderer is the cheaper next step.',
    },
    {
      id: 'order-diagnose', type: 'order', title: 'A sane diagnosis workflow',
      prompt: 'Order these steps from first to last when investigating why a synthetic-trained segmenter underperforms on real photos.',
      items: [
        'Build a fixed, carefully labeled real evaluation set',
        'Evaluate the same model on held-out renders and on the real set — quantify the gap',
        'Check that render masks and human masks follow the same class rules',
        'Run a domain classifier on frozen features and inspect the most “synthetic-looking” renders',
        'Change the renderer (randomization) or data mix, one factor at a time',
        'Re-measure on the same real set and keep the change only if it helps',
      ],
      explain: 'Measure first, fix second. Label-rule consistency comes before renderer work because no amount of photorealism fixes a task definition mismatch.',
    },
    {
      id: 'match-symptoms', type: 'match', title: 'Symptom → likely cause',
      prompt: 'Match each observation to its most likely cause.',
      pairs: [
        ['Hands vanish when a bright reflection crosses the crystal', 'Too little lighting/reflection variation in renders'],
        ['Model segments the table edge as “bracelet”', 'Unrealistic or too few backgrounds'],
        ['Case/lug boundary differs systematically from human masks', 'Label rules differ between renderer and annotators'],
        ['mIoU jumps ±3 points between identical re-runs', 'Evaluation set too small / training noise'],
        ['Works on sharp studio shots, fails on phone photos', 'Missing camera effects: blur, noise, compression'],
      ],
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>English</th><th>Deutsch</th></tr>
<tr><td>domain gap / domain shift</td><td>Domänenlücke / Domänenverschiebung</td></tr>
<tr><td>synthetic data, render</td><td>synthetische Daten, Rendering</td></tr>
<tr><td>distribution</td><td>Verteilung (Wahrscheinlichkeitsverteilung)</td></tr>
<tr><td>randomization</td><td>Randomisierung, zufällige Variation</td></tr>
<tr><td>ground truth / label</td><td>Grundwahrheit / Label, Annotation</td></tr>
<tr><td>held-out set</td><td>zurückgehaltene Testmenge</td></tr></table>`,
    },
    {
      id: 'recall-plan', type: 'recall', title: 'Apply it to your generator',
      prompt: 'Your renderer produces pixel-perfect masks, but real-photo quality is unstable. Name **three concrete randomizations** you would add first and **one measurement** you would run before and after, and explain why.',
      answer: `**Randomizations:** (1) lighting & HDRI environments with strong specular reflections on crystal and polished case — reflections are the main real-world nuisance for watches; (2) real-photo backgrounds and context (wrists, sleeves, tables, boxes, partial occlusion) — removes the "floating object" shortcut; (3) camera effects — focal length, depth of field, motion blur, sensor noise and JPEG compression. Surface wear (scratches, fingerprints) is a strong fourth.

**Measurement:** the real-vs-render mIoU gap on a fixed real evaluation set (per class), plus a [[domain-classifier]] on frozen DINOv3 features. The mIoU gap tells you whether the change helped the *task*; the classifier and its most confident examples tell you *what* still looks synthetic. Keep changes one at a time so each gain can be attributed.`,
      hints: ['Which things vary a lot in real photos but not in your renders?', 'What number would convince you a change helped?'],
      cards: ['dr-rules', 'gap-measure'],
    },
  ],
  cards: [
    { id: 'gap-def', front: 'What is the **domain gap**?', back: 'The systematic difference between training data (e.g. renders) and deployment data (real photos) — visible as a score drop from source to target.' },
    { id: 'dr-def', front: 'Domain randomization in one sentence', back: 'Vary nuisance factors (lighting, materials, backgrounds, camera) so widely during rendering that reality looks like just another variation.' },
    { id: 'dr-rules', front: 'Two rules of thumb for randomizing watch renders', back: '1) Randomize nuisances hard, keep structure (geometry, part relations) faithful. 2) Cover reality, don\'t just maximize width — unrealistic variation costs capacity.' },
    { id: 'gap-measure', front: 'How can you measure a domain gap without training a segmenter?', back: 'Embed real and synthetic images with a frozen backbone (e.g. DINOv3), train a domain classifier (real vs synthetic). ~50% accuracy = overlap; ~100% = clear gap. Inspect confidently classified renders.' },
    { id: 'gap-task', front: 'The most direct task-level gap measurement', back: 'Evaluate the same model on held-out renders and on a fixed real set; the mIoU difference (per class) is the gap in points.' },
    { id: 'mix-recipes', front: 'Three standard ways to combine synthetic and real data', back: 'Synthetic pre-train → real fine-tune; mixed batches with a fixed real:synthetic ratio; targeted synthesis for rare cases (plus copy-paste of real objects).' },
    { id: 'label-mismatch', front: 'Why can a *perfect* renderer still transfer badly?', back: 'If render masks follow different rules than human annotations (e.g. crystal, case vs lug), the model is trained on a different task than it is evaluated on.' },
    { id: 'backbone-real', front: 'Why does a strong real-image backbone (DINOv3) help sim-to-real?', back: 'It already encodes what real materials look like (pre-trained on ~1.7B real images); only a small head learns from renders, leaving less room to memorize renderer quirks.' },
  ],
};
