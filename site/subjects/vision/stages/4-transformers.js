export default {
  id: 'transformers',
  level: 'Intermediate',
  title: 'Attention & Vision Transformers',
  summary: 'The architecture behind DINO, SAM and nearly all state-of-the-art vision: images as sequences of patches that attend to each other.',
  lessons: [
    { id: 'attention', title: 'Attention: queries, keys & values', summary: 'Every token asks a question and every other token answers — weighted by a softmax of dot products.', minutes: 35, ready: true },
    { id: 'vision-transformer', title: 'The Vision Transformer (ViT)', summary: 'Patchify, embed, add positions, stack transformer blocks. Patch size 14 vs 16, ViT-S/B/L/g.', minutes: 35, ready: true },
  ],
};
