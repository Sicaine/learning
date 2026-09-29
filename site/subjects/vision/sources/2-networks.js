// Sources cited in stage 2-networks. See CLAUDE.md for the source format.
export default [
  { id: 'adam', kind: 'Paper', title: 'Adam: A Method for Stochastic Optimization', authors: 'Kingma, Ba', year: 2014, venue: 'ICLR 2015', url: 'https://arxiv.org/abs/1412.6980' },
  { id: 'adamw', kind: 'Paper', title: 'Decoupled Weight Decay Regularization (AdamW)', authors: 'Loshchilov, Hutter', year: 2017, venue: 'ICLR 2019', url: 'https://arxiv.org/abs/1711.05101' },
  { id: 'sgdr', kind: 'Paper', title: 'SGDR: Stochastic Gradient Descent with Warm Restarts (cosine schedule)', authors: 'Loshchilov, Hutter', year: 2016, venue: 'ICLR 2017', url: 'https://arxiv.org/abs/1608.03983' },
  { id: 'batchnorm', kind: 'Paper', title: 'Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift', authors: 'Ioffe, Szegedy', year: 2015, venue: 'ICML 2015', url: 'https://arxiv.org/abs/1502.03167' },
  { id: 'dropout', kind: 'Paper', title: 'Improving neural networks by preventing co-adaptation of feature detectors (Dropout)', authors: 'Hinton, Srivastava, Krizhevsky, Sutskever, Salakhutdinov', year: 2012, url: 'https://arxiv.org/abs/1207.0580' },
  { id: 'he-init', kind: 'Paper', title: 'Delving Deep into Rectifiers (He initialization, PReLU)', authors: 'He, Zhang, Ren, Sun', year: 2015, venue: 'ICCV 2015', url: 'https://arxiv.org/abs/1502.01852' },
  { id: 'gelu', kind: 'Paper', title: 'Gaussian Error Linear Units (GELUs)', authors: 'Hendrycks, Gimpel', year: 2016, url: 'https://arxiv.org/abs/1606.08415', note: 'The activation used inside ViT and DINO MLP blocks.' },
  { id: 'layernorm', kind: 'Paper', title: 'Layer Normalization', authors: 'Ba, Kiros, Hinton', year: 2016, url: 'https://arxiv.org/abs/1607.06450' },
  { id: 'rethinking-generalization', kind: 'Paper', title: 'Understanding deep learning requires rethinking generalization', authors: 'Zhang, Bengio, Hardt, Recht, Vinyals', year: 2016, venue: 'ICLR 2017', url: 'https://arxiv.org/abs/1611.03530', note: 'Networks can memorize random labels — capacity alone does not explain generalization.' },
  { id: 'goyal-warmup', kind: 'Paper', title: 'Accurate, Large Minibatch SGD: Training ImageNet in 1 Hour', authors: 'Goyal et al.', year: 2017, url: 'https://arxiv.org/abs/1706.02677', note: 'Popularized linear learning-rate scaling and warmup.' },
  { id: 'karpathy-micrograd', kind: 'Video', title: 'The spelled-out intro to neural networks and backpropagation: building micrograd', authors: 'Andrej Karpathy', year: 2022, url: 'https://www.youtube.com/watch?v=VMj-3S1tku0', note: 'Backprop implemented from scratch in ~100 lines of Python.' },
];
