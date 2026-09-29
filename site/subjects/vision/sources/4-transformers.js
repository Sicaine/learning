// Sources cited in stage 4-transformers. See CLAUDE.md for the source format.
export default [
  { id: 'attention-is-all', kind: 'Paper', title: 'Attention Is All You Need', authors: 'Vaswani et al.', year: 2017, venue: 'NeurIPS 2017', url: 'https://arxiv.org/abs/1706.03762', note: 'Introduced the Transformer.' },
  { id: 'vit', kind: 'Paper', title: 'An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale (ViT)', authors: 'Dosovitskiy et al.', year: 2020, venue: 'ICLR 2021', url: 'https://arxiv.org/abs/2010.11929' },
  { id: 'swin', kind: 'Paper', title: 'Swin Transformer: Hierarchical Vision Transformer using Shifted Windows', authors: 'Liu et al.', year: 2021, venue: 'ICCV 2021', url: 'https://arxiv.org/abs/2103.14030', note: 'Local windowed attention + a CNN-like pyramid; a popular segmentation backbone.' },
  { id: 'illustrated-transformer', kind: 'Article', title: 'The Illustrated Transformer', authors: 'Jay Alammar', year: 2018, url: 'https://jalammar.github.io/illustrated-transformer/', note: 'Step-by-step pictures of Q, K, V and multi-head attention.' },
];
