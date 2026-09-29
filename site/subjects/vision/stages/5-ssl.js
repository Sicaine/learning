export default {
  id: 'ssl',
  level: 'Advanced',
  title: 'Learning without labels',
  summary: 'Self-supervised learning: how models learn rich visual features from millions of unlabeled images — the key idea behind DINO.',
  lessons: [
    { id: 'why-self-supervised', title: 'Why self-supervised learning?', summary: 'Labels are the bottleneck. Pretext tasks, representations, linear probes and k-NN evaluation.', minutes: 25, ready: true },
    { id: 'contrastive', title: 'Contrastive learning & collapse', summary: 'SimCLR, MoCo, InfoNCE: pull views of the same image together, push others apart.', minutes: 30, ready: true },
    { id: 'dino-v1', title: 'DINO: self-distillation with no labels', summary: 'Student, EMA teacher, centering & sharpening, multi-crop — and attention maps that segment objects for free.', minutes: 40, ready: true },
    { id: 'masked-modeling', title: 'Masked image modeling: MAE & iBOT', summary: 'Hide most of the image and predict what’s missing — at pixel level or feature level.', minutes: 30, ready: true },
  ],
};
