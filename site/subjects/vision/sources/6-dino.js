// Sources cited in stage 6-dino. See CLAUDE.md for the source format.
export default [
  { id: 'dinov2', kind: 'Paper', title: 'DINOv2: Learning Robust Visual Features without Supervision', authors: 'Oquab et al. (Meta AI)', year: 2023, venue: 'TMLR 2024', url: 'https://arxiv.org/abs/2304.07193' },
  { id: 'registers', kind: 'Paper', title: 'Vision Transformers Need Registers', authors: 'Darcet, Oquab, Mairal, Bojanowski', year: 2023, venue: 'ICLR 2024', url: 'https://arxiv.org/abs/2309.16588' },
  { id: 'dinov3', kind: 'Paper', title: 'DINOv3', authors: 'Siméoni et al. (Meta AI)', year: 2025, url: 'https://arxiv.org/abs/2508.10104', note: 'Introduces Gram anchoring; 7B teacher distilled into a family of ViT and ConvNeXt models.' },
  { id: 'koleo-paper', kind: 'Paper', title: 'Spreading vectors for similarity search', authors: 'Sablayrolles, Douze, Schmid, Jégou', year: 2018, venue: 'ICLR 2019', url: 'https://arxiv.org/abs/1806.03198', note: 'Origin of the KoLeo regularizer used in DINOv2/v3.' },
  { id: 'rope', kind: 'Paper', title: 'RoFormer: Enhanced Transformer with Rotary Position Embedding (RoPE)', authors: 'Su et al.', year: 2021, url: 'https://arxiv.org/abs/2104.09864' },
  { id: 'flashattention', kind: 'Paper', title: 'FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness', authors: 'Dao, Fu, Ermon, Rudra, Ré', year: 2022, venue: 'NeurIPS 2022', url: 'https://arxiv.org/abs/2205.14135' },
  { id: 'featup', kind: 'Paper', title: 'FeatUp: A Model-Agnostic Framework for Features at Any Resolution', authors: 'Fu et al.', year: 2024, venue: 'ICLR 2024', url: 'https://arxiv.org/abs/2403.10516' },
  { id: 'dinov2-repo', kind: 'Docs', title: 'facebookresearch/dinov2 — code and weights (Apache 2.0)', authors: 'Meta AI', year: 2023, url: 'https://github.com/facebookresearch/dinov2', note: 'torch.hub entry points incl. the *_reg checkpoints with registers.' },
  { id: 'hf-dinov3', kind: 'Docs', title: 'Hugging Face Transformers: DINOv3 model documentation', authors: 'Hugging Face', year: 2025, url: 'https://huggingface.co/docs/transformers/main/en/model_doc/dinov3', note: 'Shows how to split CLS, register and patch tokens.' },
];
