export default {
  id: 'dino',
  level: 'Advanced',
  title: 'DINOv2 & DINOv3',
  summary: 'The current state of the art in general-purpose visual features: what changed, why it matters, and how to use them.',
  lessons: [
    { id: 'dinov2', title: 'DINOv2: scaling data & recipes', summary: 'Curated LVD-142M data, DINO + iBOT losses, KoLeo, high-resolution training and distillation into small models.', minutes: 40, ready: true },
    { id: 'registers', title: 'Registers & attention artifacts', summary: 'Why big ViTs grow high-norm “garbage” tokens and how a few extra tokens fix feature maps.', minutes: 20, ready: true },
    { id: 'dinov3', title: 'DINOv3: Gram anchoring & dense features', summary: '7B parameters, 1.7B images, and a new loss that keeps patch features clean over long training.', minutes: 40, ready: true },
    { id: 'using-features', title: 'Using foundation features in practice', summary: 'Frozen backbones, linear heads, k-NN, PCA visualizations, feature upsampling — what works for dense tasks.', minutes: 35, ready: true },
  ],
};
