export default {
  id: 'cnn',
  level: 'Intermediate',
  title: 'Seeing with convolutions',
  summary: 'Convolutional networks: the classic way to build vision models, and the origin of the segmentation architectures still used today.',
  lessons: [
    { id: 'convolution', title: 'Convolution: sliding pattern detectors', summary: 'Kernels, stride, padding, channels — and how a 3×3 filter finds edges.', minutes: 30, ready: true },
    { id: 'cnn-architectures', title: 'Deep CNNs, receptive fields & ResNet', summary: 'Why depth works, skip connections, feature pyramids.', minutes: 30, ready: true },
    { id: 'segmentation-basics', title: 'Segmentation 101: U-Net & IoU', summary: 'Semantic vs instance vs panoptic, encoder–decoder designs, and how quality is measured.', minutes: 35, ready: true },
  ],
};
