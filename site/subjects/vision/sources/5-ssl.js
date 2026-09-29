// Sources cited in stage 5-ssl. See CLAUDE.md for the source format.
export default [
  { id: 'colorization', kind: 'Paper', title: 'Colorful Image Colorization', authors: 'Zhang, Isola, Efros', year: 2016, venue: 'ECCV 2016', url: 'https://arxiv.org/abs/1603.08511', note: 'Early pretext task: predict color from grayscale.' },
  { id: 'jigsaw', kind: 'Paper', title: 'Unsupervised Learning of Visual Representations by Solving Jigsaw Puzzles', authors: 'Noroozi, Favaro', year: 2016, venue: 'ECCV 2016', url: 'https://arxiv.org/abs/1603.09246', note: 'Pretext task: reorder shuffled image tiles.' },
  { id: 'rotnet', kind: 'Paper', title: 'Unsupervised Representation Learning by Predicting Image Rotations', authors: 'Gidaris, Singh, Komodakis', year: 2018, venue: 'ICLR 2018', url: 'https://arxiv.org/abs/1803.07728', note: 'Pretext task: was the image rotated by 0°, 90°, 180° or 270°?' },
  { id: 'cpc', kind: 'Paper', title: 'Representation Learning with Contrastive Predictive Coding (InfoNCE)', authors: 'van den Oord, Li, Vinyals', year: 2018, url: 'https://arxiv.org/abs/1807.03748' },
  { id: 'bert', kind: 'Paper', title: 'BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding', authors: 'Devlin, Chang, Lee, Toutanova', year: 2018, venue: 'NAACL 2019', url: 'https://arxiv.org/abs/1810.04805', note: 'Masked language modeling — the NLP ancestor of masked image modeling.' },
  { id: 'moco', kind: 'Paper', title: 'Momentum Contrast for Unsupervised Visual Representation Learning (MoCo)', authors: 'He, Fan, Wu, Xie, Girshick', year: 2019, venue: 'CVPR 2020', url: 'https://arxiv.org/abs/1911.05722' },
  { id: 'simclr', kind: 'Paper', title: 'A Simple Framework for Contrastive Learning of Visual Representations (SimCLR)', authors: 'Chen, Kornblith, Norouzi, Hinton', year: 2020, venue: 'ICML 2020', url: 'https://arxiv.org/abs/2002.05709' },
  { id: 'byol', kind: 'Paper', title: 'Bootstrap Your Own Latent (BYOL)', authors: 'Grill et al.', year: 2020, venue: 'NeurIPS 2020', url: 'https://arxiv.org/abs/2006.07733' },
  { id: 'swav', kind: 'Paper', title: 'Unsupervised Learning of Visual Features by Contrasting Cluster Assignments (SwAV)', authors: 'Caron, Misra, Mairal, Goyal, Bojanowski, Joulin', year: 2020, venue: 'NeurIPS 2020', url: 'https://arxiv.org/abs/2006.09882', note: 'Introduced multi-crop, later reused by DINO.' },
  { id: 'dino', kind: 'Paper', title: 'Emerging Properties in Self-Supervised Vision Transformers (DINO)', authors: 'Caron et al.', year: 2021, venue: 'ICCV 2021', url: 'https://arxiv.org/abs/2104.14294' },
  { id: 'mae', kind: 'Paper', title: 'Masked Autoencoders Are Scalable Vision Learners (MAE)', authors: 'He et al.', year: 2021, venue: 'CVPR 2022', url: 'https://arxiv.org/abs/2111.06377' },
  { id: 'ibot', kind: 'Paper', title: 'iBOT: Image BERT Pre-Training with Online Tokenizer', authors: 'Zhou et al.', year: 2021, venue: 'ICLR 2022', url: 'https://arxiv.org/abs/2111.07832' },
  { id: 'yannic-dino', kind: 'Video', title: 'DINO: Emerging Properties in Self-Supervised Vision Transformers (explained)', authors: 'Yannic Kilcher', year: 2021, url: 'https://www.youtube.com/watch?v=h3ij3F3cPIk' },
];
