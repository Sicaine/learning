export default {
  id: 'registers',
  title: 'Registers & attention artifacts',
  summary: 'Large ViTs quietly repurpose boring background patches as scratch memory. The result: spiky attention maps and polluted patch features. Four extra tokens fix it — and understanding why teaches you a lot about how ViTs compute.',
  minutes: 20,
  goals: [
    'Describe the [[high-norm-tokens|high-norm artifact tokens]] of large ViTs: where, when, how many',
    'Explain what information they carry and why the model creates them',
    'Explain how [[registers]] fix the problem and what they cost',
    'Choose the right checkpoints for dense work on your watch images',
  ],
  blocks: [
    {
      id: 'mystery', type: 'text', title: 'A puzzle in the attention maps',
      md: `
DINO v1's [[attention]] maps were famous: ask where the [[cls-token]] looks and you get a clean silhouette of the object. But when people looked at DINOv2 — a much better model by every benchmark — the maps had **bright spikes in random background spots**: a patch of sky, a piece of empty wall.

Darcet et al. investigated and found the spikes are not a visualization glitch. They are real tokens with a very particular behaviour, and they appear in many large ViTs — DINOv2, OpenCLIP, and the supervised DeiT-III. Only DINO v1 was an exception.[^registers]`,
    },
    {
      id: 'game-find', type: 'game', viz: 'register-artifacts', title: 'Find the artifact tokens',
      params: { need: 6 },
    },
    {
      id: 'facts', type: 'text', title: 'Anatomy of an artifact',
      md: `
What the paper measured:[^registers]

- **Norm about 10× the rest.** Plot the [[norm]] of every output token and a small group sits far above the others (they used a threshold of 150).
- **About 2% of tokens.** In their measurements roughly 2.4% of the sequence.
- **Only in big, long-trained models.** They appear in models of size ViT-L and larger, around the middle of the network (layer ~15 of 40 in ViT-g), and only after about one third of training.
- **On redundant patches.** Artifacts sit on patches that are highly similar to their neighbours — uniform background. Losing *local* information there costs almost nothing.
- **They hold global, not local, information.** Linear probes show outlier tokens are *worse* at predicting their own position or reconstructing their pixels, but *better* at predicting the image class than normal patch tokens.

The interpretation: a big network wants extra memory for global computation. The CLS token alone isn't enough, so it **recycles** patches whose local content is redundant and uses them as scratch space.`,
    },
    {
      id: 'quiz-facts', type: 'quiz', title: 'What do we know about the artifacts?',
      question: 'Select every correct statement about high-norm artifact tokens.',
      options: [
        { text: 'They appear on patches that look like their neighbours, such as uniform background.', correct: true, why: 'The model recycles redundant patches, where local information is cheap to lose.' },
        { text: 'They carry more fine-grained local detail than normal patch tokens.', correct: false, why: 'The opposite: they are worse at predicting their position and pixels.' },
        { text: 'They are more useful than normal patches for predicting the image class.', correct: true, why: 'They hold global information.' },
        { text: 'Small models like ViT-S show them just as strongly.', correct: false, why: 'They appear in ViT-L and larger, after substantial training.' },
        { text: 'They make up roughly 2% of the output tokens.', correct: true, why: 'About 2.4% in the paper’s measurements.' },
      ],
    },
    {
      id: 'fix', type: 'text', title: 'The fix: give the model its own scratch space',
      md: `
If the network needs extra tokens for global computation, **give it some**. Append $R$ additional learnable tokens — **[[registers]]** — to the input sequence, just like the CLS token. They have no image content and no position; at the output they are simply thrown away.[^registers]

$$[\\,\\texttt{CLS},\\ \\texttt{reg}_1, \\dots, \\texttt{reg}_R,\\ \\mathbf{p}_1, \\dots, \\mathbf{p}_N\\,]$$

What happens:

- The high-norm behaviour **moves into the registers**; patch tokens become clean.
- Attention maps look like DINO v1's again.
- One register already removes visible artifacts; **4 registers** were the best trade-off for dense tasks, at under 2% extra FLOPs.
- DINOv2 with registers improved ADE20k linear segmentation from 46.6 to 47.9 mIoU and depth estimation slightly — and unsupervised object discovery (LOST) jumped from 35.3 to 55.4 CorLoc on VOC2007.

DINOv3 has 4 registers built in from the start.[^dinov3]`,
    },
    {
      id: 'calc-seq', type: 'numeric', title: 'Count the tokens',
      question: 'A DINOv2 ViT-L/14 **with 4 registers** processes a 224×224 image. How many tokens enter the transformer?',
      answer: 261, tolerance: 0,
      hint: 'Patch tokens: $(224/14)^2$. Then add the CLS token and the registers.',
      explain: '$256$ patches $+ 1$ CLS $+ 4$ registers $= 261$. When you take the patch features out, skip the first $1 + 4$ tokens — a classic off-by-4 bug if you forget the registers.',
    },
    {
      id: 'code', type: 'text', title: 'In code: skip the registers',
      md: `
With Hugging Face Transformers, DINOv3 (and DINOv2 "with-registers") return CLS, registers and patches in one sequence:[^hf-dinov3]

\`\`\`python
out = model(**inputs).last_hidden_state        # [B, 1 + R + N, D]
R = model.config.num_register_tokens            # 4
cls     = out[:, 0]                             # global embedding
patches = out[:, 1 + R:]                        # [B, N, D] dense features
patches = patches.unflatten(1, (H // 16, W // 16))
\`\`\`

For DINOv2 via torch.hub, pick the \`_reg\` entry points, e.g. \`dinov2_vitl14_reg\`.[^dinov2-repo]`,
    },
    {
      id: 'mission-registers', type: 'callout', tone: 'mission', title: 'Why you care',
      md: `
Your watch photos often have **large uniform backgrounds** — a white product table, a gradient backdrop, a blurred desk. That is exactly where artifacts like to sit.

- If you cluster or PCA-visualize patch features of a DINOv2 model *without* registers, artifacts can show up as isolated "objects" in the background — false positives that no head can fully explain away.
- For dense work use **DINOv2 \`_reg\`** checkpoints or **DINOv3** (registers built in).
- A cheap sanity check on your own data: plot the per-patch norm map for 20 images. If you see isolated bright dots on the background, you are using a model without registers.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>English</th><th>Deutsch</th></tr>
<tr><td>artifact</td><td>Artefakt</td></tr>
<tr><td>outlier</td><td>Ausreißer</td></tr>
<tr><td>norm of a token</td><td>Norm (Betrag) eines Token-Vektors</td></tr>
<tr><td>redundant</td><td>redundant, überflüssig</td></tr>
<tr><td>register (memory slot)</td><td>Register (Speicherplatz)</td></tr>
<tr><td>to discard</td><td>verwerfen</td></tr></table>`,
    },
    {
      id: 'recall-registers', type: 'recall', title: 'Explain the mechanism',
      prompt: 'Why do large ViTs produce high-norm tokens on background patches, and why do register tokens fix it? Answer in 3–4 sentences.',
      answer: `Large, long-trained ViTs need extra "memory" for global computation beyond the single CLS token. They learn to recycle patch tokens whose local content is redundant — uniform background patches that look like their neighbours — and store global information there; these tokens get a very high norm and lose their local information, which pollutes attention maps and dense features. Registers are extra learnable tokens without image content that are discarded at the output; they give the model dedicated scratch space, so it no longer needs to hijack patches, and the patch tokens stay clean.`,
      hints: ['What does the model need that it doesn’t have?', 'Why background patches and not the object?'],
      cards: ['reg-why', 'reg-fix'],
    },
  ],
  cards: [
    { id: 'reg-what', front: 'What are high-norm artifact tokens in ViTs?', back: 'About 2% of output tokens with ~10× the normal norm, on redundant background patches, in large (≥ ViT-L) long-trained models. They hold global info and little local info.' },
    { id: 'reg-why', front: 'Why do large ViTs create artifact tokens?', back: 'They need extra memory for global computation and recycle redundant (background) patches as scratch space.' },
    { id: 'reg-fix', front: 'How do register tokens work?', back: 'Extra learnable tokens appended to the input (like CLS), no image content, discarded at the output. The model uses them as scratch space instead of hijacking patches.' },
    { id: 'reg-count', front: 'How many registers are recommended, and at what cost?', back: '4 registers — best for dense tasks, under 2% extra FLOPs. DINOv3 uses 4 by default.' },
    { id: 'reg-models', front: 'Which models showed artifacts — and which classic model did not?', back: 'DINOv2, OpenCLIP, DeiT-III (large sizes). DINO v1 did not.' },
    { id: 'reg-tokens', front: 'Token count for ViT/14 with 4 registers at 224×224?', back: '256 patches + 1 CLS + 4 registers = 261. Patch features start at index 1 + 4 = 5.' },
    { id: 'reg-effect', front: 'Effect of registers on DINOv2 dense results?', back: 'ADE20k linear segmentation 46.6 → 47.9 mIoU; object discovery (LOST, VOC2007) 35.3 → 55.4 CorLoc; clean attention maps.' },
  ],
};
