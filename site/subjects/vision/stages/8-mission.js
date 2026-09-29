export default {
  id: 'mission',
  level: 'Mastery',
  title: 'Your mission: watches in pixels',
  summary: 'Apply everything to your real problem: synthetic-to-real transfer, labeling strategy, compute on 2× RTX 4090, and an experiment plan.',
  lessons: [
    { id: 'sim-to-real', title: 'Synthetic data & the domain gap', summary: 'Why renders don’t transfer automatically: domain randomization, mixing real data, and diagnosing the gap.', minutes: 35, ready: true },
    { id: 'data-strategy', title: 'Labels at scale: 100k images', summary: 'Pseudo-labels with foundation models, active learning, annotation quality, and class design for watch parts.', minutes: 35, ready: true },
    { id: 'compute-budget', title: 'What fits on 2× RTX 4090?', summary: 'VRAM math for training and inference, mixed precision, checkpointing, DDP vs FSDP, LoRA — and realistic run times.', minutes: 40, ready: true },
    { id: 'experiment-plan', title: 'Designing your experiments', summary: 'Baselines, evaluation sets, ablations and error analysis — a concrete plan for your watch segmentation.', minutes: 35, ready: true },
  ],
};
