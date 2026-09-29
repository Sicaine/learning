export default {
  id: 'segment-anything',
  title: 'Segment Anything (SAM family)',
  summary: 'A segmentation model that knows no classes but can cut out *anything* you point at — and the data engine that made it. Then video with SAM 2 and text concepts with SAM 3.',
  minutes: 35,
  goals: [
    'Define [[promptable-segmentation]] and explain why ambiguity is part of the task',
    'Sketch [[sam]]’s three components and say which one runs per click',
    'Explain the [[data-engine]] and how you could copy it for your watch images',
    'Tell apart [[sam]], [[sam2]] and [[sam3]] — and predict where they fail on watches',
  ],
  blocks: [
    {
      id: 'task', type: 'text', title: 'A new task: segment whatever I point at',
      md: `
Classic segmenters have a fixed list of classes. Segment Anything (2023)[^sam] defines a different task, **[[promptable-segmentation]]**: given an image and a *prompt* — one or more foreground/background points, a box, or a rough mask — return a valid mask for the thing the prompt refers to.

The model never outputs a class name. It answers "*where* is the object you mean?", not "*what* is it?". That makes it a general-purpose tool: the same model works on microscopy, satellite images and — hopefully — watches, without retraining.

To learn this, Meta built SA-1B: **11 million images with 1.1 billion masks**, about 100 masks per image, far more than any earlier segmentation dataset.`,
    },
    {
      id: 'fig-arch', type: 'figure', title: 'SAM: heavy once, light per click',
      html: `<svg viewBox="0 0 680 210" width="680" font-family="Inter" font-size="12">
        <defs><marker id="saA" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#74748c"/></marker></defs>
        <rect x="8" y="30" width="90" height="80" rx="10" fill="#e9ecf5" stroke="#c9cde0"/><text x="53" y="66" text-anchor="middle">image</text><text x="53" y="83" text-anchor="middle" fill="#74748c">1024×1024</text>
        <rect x="124" y="20" width="160" height="100" rx="12" fill="color-mix(in oklab, var(--accent) 14%, white)" stroke="var(--accent)" stroke-width="1.5"/>
        <text x="204" y="54" text-anchor="middle" font-weight="700">image encoder</text><text x="204" y="72" text-anchor="middle" fill="#74748c">ViT-H, MAE-pretrained</text><text x="204" y="90" text-anchor="middle" fill="#74748c">runs once per image</text>
        <rect x="310" y="40" width="110" height="60" rx="10" fill="#fff" stroke="#c9cde0"/><text x="365" y="66" text-anchor="middle" font-weight="600">embedding</text><text x="365" y="83" text-anchor="middle" fill="#74748c">64×64×256</text>
        <rect x="124" y="140" width="160" height="56" rx="12" fill="#fff" stroke="#c9cde0"/><text x="204" y="164" text-anchor="middle" font-weight="600">prompt encoder</text><text x="204" y="181" text-anchor="middle" fill="#74748c">points · box · mask</text>
        <rect x="8" y="140" width="90" height="56" rx="10" fill="#fff" stroke="#c9cde0"/><text x="53" y="164" text-anchor="middle">prompt</text><text x="53" y="181" text-anchor="middle" fill="#74748c">＋ / − clicks</text>
        <rect x="446" y="70" width="110" height="80" rx="12" fill="color-mix(in oklab, var(--accent-2) 14%, white)" stroke="var(--accent-2)" stroke-width="1.5"/><text x="501" y="100" text-anchor="middle" font-weight="700">mask decoder</text><text x="501" y="118" text-anchor="middle" fill="#74748c">lightweight</text><text x="501" y="134" text-anchor="middle" fill="#74748c">~50 ms</text>
        <rect x="582" y="40" width="90" height="36" rx="8" fill="#fff" stroke="#c9cde0"/><text x="627" y="63" text-anchor="middle">mask 1 · 0.71</text>
        <rect x="582" y="92" width="90" height="36" rx="8" fill="#fff" stroke="#c9cde0"/><text x="627" y="115" text-anchor="middle">mask 2 · 0.86</text>
        <rect x="582" y="144" width="90" height="36" rx="8" fill="#fff" stroke="#c9cde0"/><text x="627" y="167" text-anchor="middle">mask 3 · 0.93</text>
        <path d="M98 70 H122" stroke="#74748c" marker-end="url(#saA)"/><path d="M284 70 H308" stroke="#74748c" marker-end="url(#saA)"/><path d="M98 168 H122" stroke="#74748c" marker-end="url(#saA)"/>
        <path d="M420 80 L444 95" stroke="#74748c" marker-end="url(#saA)"/><path d="M284 168 L444 130" stroke="#74748c" marker-end="url(#saA)"/>
        <path d="M556 95 L580 60" stroke="#74748c" marker-end="url(#saA)"/><path d="M556 110 H580" stroke="#74748c" marker-end="url(#saA)"/><path d="M556 125 L580 160" stroke="#74748c" marker-end="url(#saA)"/>
      </svg>`,
      caption: 'The expensive image embedding is computed once; every new click only re-runs the tiny decoder, which is why SAM feels interactive. Scores are the model’s own predicted IoU.',
    },
    {
      id: 'arch', type: 'text', title: 'Three components',
      md: `
- **Image encoder** — a large [[vit]] (ViT-H) pretrained with [[mae]], run at 1024×1024 input. It outputs a 64×64 grid of 256-dimensional [[embedding|embeddings]]. This is ~all of the compute.
- **Prompt encoder** — turns clicks and boxes into [[token|tokens]] (positional encodings of the coordinates plus a learned "foreground"/"background" embedding); a rough mask prompt is added to the image embedding via small convolutions.
- **Mask decoder** — a small two-layer transformer in which prompt tokens and image embedding [[attention|attend]] to each other, then upsample to a mask. Fast enough to run in a web browser in about 50 ms.

Because the encoder runs once and the decoder per click, an annotator can click, see a mask, click again — in real time.`,
    },
    {
      id: 'calc-tokens', type: 'numeric', title: 'Tokens in SAM’s encoder',
      question: 'SAM’s ViT-H uses a [[patch-size]] of 16 on a 1024 × 1024 input. How many patch tokens does the image encoder process?',
      answer: 4096, tolerance: 0,
      hint: 'Patches per side: $1024 / 16$. Then square it.',
      explain: '$1024/16 = 64$ per side, $64^2 = 4096$ tokens — matching the 64×64 embedding grid. Attention cost grows with the *square* of the token count, which is why SAM uses windowed attention in most blocks and why the encoder dominates the runtime.',
    },
    {
      id: 'ambiguity', type: 'text', title: 'Ambiguity is a feature, not a bug',
      md: `
You click on one hour index. Do you mean the index, the dial with all its markings, or the whole watch? All three are valid answers. A model forced to output one mask would learn to *average* them — a blurry mess.

SAM therefore outputs **three masks** for a single ambiguous prompt (roughly *subpart*, *part*, *whole*) plus a predicted [[iou]] score for each. During training only the best of the three is penalised:

$$\\mathcal{L} = \\min_{k \\in \\{1,2,3\\}} \\mathcal{L}_{\\text{mask}}\\big(\\hat m_k, m\\big)$$

so each output slot is free to specialise on one level of granularity. With several points the prompt is less ambiguous, and SAM returns a single mask.`,
    },
    {
      id: 'viz-prompt', type: 'viz', viz: 'prompt-segment', title: 'Prompt a (toy) Segment Anything',
      params: { goals: ['index', 'hands', 'watch', 'glare'] },
      intro: 'A simplified imitation of SAM’s behaviour on a drawn watch — no neural network, just the part hierarchy — but it shows how prompts and ambiguity interact.',
      task: 'Reach all four goals. Getting **exactly the three hands** with one click is impossible — which extra prompt fixes it? And notice what happens when you click on the reflection.',
    },
    {
      id: 'quiz-perclick', type: 'quiz', title: 'What runs per click?',
      question: 'An annotator adds a third click to refine a mask. Which parts of SAM have to be re-run?',
      options: [
        { text: 'Prompt encoder and mask decoder', correct: true, why: 'The image embedding is cached; only the cheap prompt-dependent parts run again.' },
        { text: 'Image encoder, prompt encoder and mask decoder', correct: false, why: 'The image didn’t change, so its embedding can be reused.' },
        { text: 'Only the image encoder', correct: false, why: 'The image encoder doesn’t see the prompt at all.' },
        { text: 'Nothing — SAM predicts all possible masks in advance', correct: false, why: 'Masks depend on the prompt; the decoder must run for each new prompt.' },
      ],
    },
    {
      id: 'data-engine', type: 'text', title: 'The data engine: how 1.1 billion masks were made',
      md: `
Nobody hand-draws a billion masks. SAM was trained with a **[[data-engine]]**: model and dataset grew together in three stages.

1. **Assisted-manual** — annotators click; an early SAM proposes masks; humans correct them. The model is retrained as data accumulates.
2. **Semi-automatic** — SAM pre-fills the masks it is confident about; annotators focus on the objects it missed, increasing diversity.
3. **Fully automatic** — SAM is prompted with a regular 32×32 grid of points on each image; confident, *stable* masks (unchanged when the threshold shifts slightly) are kept, duplicates filtered.

99.1% of SA-1B's masks come from stage 3. The general lesson: **a model in the labeling loop turns annotators from painters into reviewers.**`,
    },
    {
      id: 'video-sam', type: 'video', youtube: 'qa3uK3Ewd9Q', label: 'Segment Anything Model (SAM): architecture, data engine, results and limitations', channel: 'AI Bites',
      why: 'A compact walk-through of the paper — good to consolidate the architecture and data engine after reading the section above.',
    },
    {
      id: 'sam2', type: 'text', title: 'SAM 2: memory for video',
      md: `
[[sam2]] (2024)[^sam2] extends promptable segmentation to video. Click on an object in one frame; the mask follows it through the clip. The additions:

- A **memory bank**: FIFO queues holding features of the last few frames and of the frames where you clicked, plus compact *object-pointer* vectors.
- **Memory attention**: each new frame's features cross-attend to that memory before decoding — "what did the object look like before?"
- An **occlusion head** that predicts whether the object is visible at all in the current frame.
- A hierarchical, MAE-pretrained **Hiera** image encoder (multi-scale features, faster than SAM's plain ViT-H).

It was trained with the SA-V dataset (50.9K videos, 642.6K *masklets* — masks tracked over time — about 35.5M masks). SAM 2 is reported to be more accurate and 6× faster than SAM on images, and to need 3× fewer interactions on video.`,
    },
    {
      id: 'sam3', type: 'text', title: 'SAM 3: prompts become concepts',
      md: `
[[sam3]] (2025)[^sam3] changes the prompt from "*this* thing" to "*every* thing of this kind". **Promptable Concept Segmentation**: give a short noun phrase ("yellow school bus", "watch hands") or example crops, and get masks for **all** matching instances, in images and videos.

Architecturally: a shared [[backbone]] feeds an image-level detector and a memory-based video tracker (SAM 2 style). A **presence head** first answers "is this concept in the image at all?", separately from "where are the instances?" — decoupling recognition from localization cuts down false positives on hard negatives. The data engine produced 4 million unique concept labels, including hard negatives, and SAM 3 is reported at about twice the accuracy of earlier systems on its new SA-Co benchmark.

With SAM 3, SAM moves from a pure "where" model toward the [[open-vocabulary]] world of the next lesson.`,
    },
    {
      id: 'match-sam', type: 'match', title: 'Which model, which prompt?',
      pairs: [
        ['One click on the crown in a single photo', 'SAM'],
        ['Click once, follow the crown through a turntable video', 'SAM 2'],
        ['“crown” as text → every crown in 500 images', 'SAM 3'],
        ['Automatic masks from a 32×32 grid of points', 'SAM’s data engine, stage 3'],
      ],
    },
    {
      id: 'calc-thin', type: 'numeric', title: 'How thin is a seconds hand to SAM?',
      question: 'In the 1024 × 1024 input, the seconds hand is **3 px** wide. Each token of SAM’s 64 × 64 embedding covers 16 × 16 px. How many tokens wide is the hand? (decimal)',
      answer: 0.1875, tolerance: 0.006,
      hint: 'Divide the width by the token size.',
      explain: '$3/16 \\approx 0.19$ tokens. The hand occupies less than a fifth of every token it passes through — its evidence is mixed with dial pixels. The decoder upsamples to a 256×256 low-resolution mask (4 px per cell) before resizing to full resolution, so thin structures often come out broken, too thick, or missing entirely. Zooming in (cropping the watch before prompting) is the cheapest fix.',
    },
    {
      id: 'mission-labeling', type: 'callout', tone: 'mission', title: 'SAM as your labeling assistant — and where it will fail',
      md: `
For your **real** photos, SAM-family models are the obvious way to bootstrap masks: click → mask → accept/correct. Expect these failure modes on watches:

- **Thin hands and seconds hands**: sub-token width (see the calculation above). Crop to the watch and prompt at high resolution; check hands with extra care.
- **Reflections on the crystal**: a bright glare is a perfectly valid "object" for a class-agnostic model. It may segment the glare, or split the dial along the glare boundary.
- **Repeated indices**: one click = one index. You want all twelve → many clicks, or SAM 3 with a concept prompt ("hour markers") — if it knows the concept.
- **Nested parts**: dial vs. dial + indices vs. whole watch — you *must* pick the right granularity every time; write it down in your labeling guide ([[class-taxonomy]]).
- **Transparent parts**: the sapphire crystal itself is nearly invisible.

A realistic data engine for you: SAM (or SAM 3) proposes → a human reviews in seconds → train your own specialist model → it proposes better masks on the next batch ([[pseudo-label]], [[active-learning]]). Your synthetic renders don't need any of this: their masks are exact by construction.`,
    },
    {
      id: 'deep-noclass', type: 'callout', tone: 'deep', title: 'Why a class-agnostic model generalises so well',
      md: `
SAM never learns "dog" or "crown"; it learns what *object boundaries* look like — color and texture discontinuities, closed contours, parts that move together. That is a far more universal skill than recognising a fixed list of classes, which is why it transfers "[[zero-shot]]" to new image domains.

The flip side: SAM cannot tell you *what* it segmented, and its notion of "object" is whatever SA-1B annotators considered one. For a fixed taxonomy like watch parts, you still need a model that assigns labels — either a class head trained on your data, or a text-conditioned model (next lesson).`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>English</th><th>Deutsch</th></tr>
<tr><td>ambiguity</td><td>Mehrdeutigkeit</td></tr>
<tr><td>foreground / background</td><td>Vordergrund / Hintergrund</td></tr>
<tr><td>threshold</td><td>Schwellenwert</td></tr>
<tr><td>queue (FIFO)</td><td>Warteschlange (FIFO)</td></tr>
<tr><td>occlusion</td><td>Verdeckung</td></tr>
<tr><td>minimum over $k$</td><td>Minimum über $k$: $\\min_k$</td></tr>
<tr><td>resolution</td><td>Auflösung</td></tr></table>`,
    },
    {
      id: 'recall-ambiguity', type: 'recall', title: 'Explain SAM’s three masks',
      prompt: 'Why does SAM output three masks for a single point prompt, and how is it trained so that the three outputs become different levels of granularity?',
      answer: `A single point is ambiguous — it could refer to a subpart (one index), a part (the dial) or the whole object (the watch). A model forced to output one mask would average over these interpretations and produce blurry masks. So SAM predicts three masks plus a predicted IoU score for each. During training only the output with the lowest loss is backpropagated ($\\min$ over the three), so each output slot is free to specialise on one granularity level instead of all of them compromising. At inference, the predicted IoU scores rank the candidates; with multiple points SAM returns a single mask.`,
      hints: ['Think of a click on an hour index: what could the user mean?', 'What would a regression toward the average of three valid masks look like?'],
      cards: ['sam-three-masks'],
    },
  ],
  cards: [
    { id: 'promptable', front: 'What is promptable segmentation?', back: 'Given an image + prompt (points, box, mask; in SAM 3 also text/exemplars), return a valid mask for what the prompt refers to — no class label needed.' },
    { id: 'sam-parts', front: 'SAM’s three components', back: 'Heavy image encoder (MAE ViT-H, once per image) → prompt encoder → lightweight mask decoder (~50 ms, per prompt).' },
    { id: 'sam-embed', front: 'SAM image embedding size for a 1024×1024 input', back: '64×64 grid of 256-d vectors (patch size 16).' },
    { id: 'sam-three-masks', front: 'Why three masks per prompt in SAM, and how is it trained?', back: 'Ambiguity (subpart/part/whole). Only the best of the three gets the loss (min over outputs), so slots specialise. Predicted IoU ranks them.' },
    { id: 'sa1b', front: 'SA-1B dataset size', back: '11M images, 1.1B masks (≈100 per image); 99.1% of masks generated automatically.' },
    { id: 'data-engine', front: 'SAM’s three data-engine stages', back: 'Assisted-manual → semi-automatic → fully automatic (32×32 point grid, keep confident & stable masks).' },
    { id: 'sam2', front: 'What does SAM 2 add to SAM?', back: 'Video: memory bank (recent + prompted frames, object pointers), memory attention, occlusion head; Hiera encoder. Trained on SA-V.' },
    { id: 'sam3', front: 'What is new in SAM 3?', back: 'Promptable Concept Segmentation: noun phrase or exemplar → masks for all instances; presence head decouples “is it here?” from “where?”.' },
    { id: 'sam-watch-fail', front: 'Three SAM failure modes on watch photos', back: 'Thin hands (sub-token width), glare on the crystal segmented as an object, repeated indices needing many prompts (plus granularity ambiguity).' },
  ],
};
