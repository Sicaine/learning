// Sources cited in stage 3-cnn. See CLAUDE.md for the source format.
export default [
  { id: 'resnet', kind: 'Paper', title: 'Deep Residual Learning for Image Recognition (ResNet)', authors: 'He, Zhang, Ren, Sun', year: 2015, venue: 'CVPR 2016', url: 'https://arxiv.org/abs/1512.03385' },
  { id: 'unet', kind: 'Paper', title: 'U-Net: Convolutional Networks for Biomedical Image Segmentation', authors: 'Ronneberger, Fischer, Brox', year: 2015, venue: 'MICCAI 2015', url: 'https://arxiv.org/abs/1505.04597' },
  { id: 'conv-arithmetic', kind: 'Paper', title: 'A guide to convolution arithmetic for deep learning', authors: 'Dumoulin, Visin', year: 2016, url: 'https://arxiv.org/abs/1603.07285', note: 'The classic illustrated reference for stride, padding and output sizes (incl. transposed convolutions).' },
  { id: 'vgg', kind: 'Paper', title: 'Very Deep Convolutional Networks for Large-Scale Image Recognition (VGG)', authors: 'Simonyan, Zisserman', year: 2014, venue: 'ICLR 2015', url: 'https://arxiv.org/abs/1409.1556', note: 'Showed that stacks of small 3×3 filters beat large filters.' },
  { id: 'fcn', kind: 'Paper', title: 'Fully Convolutional Networks for Semantic Segmentation (FCN)', authors: 'Long, Shelhamer, Darrell', year: 2014, venue: 'CVPR 2015', url: 'https://arxiv.org/abs/1411.4038' },
  { id: 'fpn', kind: 'Paper', title: 'Feature Pyramid Networks for Object Detection (FPN)', authors: 'Lin, Dollár, Girshick, He, Hariharan, Belongie', year: 2016, venue: 'CVPR 2017', url: 'https://arxiv.org/abs/1612.03144' },
  { id: 'panoptic', kind: 'Paper', title: 'Panoptic Segmentation', authors: 'Kirillov, He, Girshick, Rother, Dollár', year: 2018, venue: 'CVPR 2019', url: 'https://arxiv.org/abs/1801.00868', note: 'Defines the panoptic task and the PQ metric; introduces the “things” vs “stuff” split.' },
  { id: 'convnext', kind: 'Paper', title: 'A ConvNet for the 2020s (ConvNeXt)', authors: 'Liu, Mao, Wu, Feichtenhofer, Darrell, Xie', year: 2022, venue: 'CVPR 2022', url: 'https://arxiv.org/abs/2201.03545', note: 'Modernized CNN that matches ViTs; DINOv3 also distills into ConvNeXt students.' },
];
