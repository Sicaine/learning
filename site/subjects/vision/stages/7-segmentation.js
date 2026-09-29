export default {
  id: 'segmentation',
  level: 'Advanced',
  title: 'Segmentation today',
  summary: 'From Mask R-CNN to query-based segmenters and promptable foundation models like SAM — and how text enters the picture.',
  lessons: [
    { id: 'modern-segmenters', title: 'Mask R-CNN to Mask2Former', summary: 'Two-stage instance segmentation, then object queries that unify semantic, instance and panoptic.', minutes: 35, ready: true },
    { id: 'segment-anything', title: 'Segment Anything (SAM family)', summary: 'Promptable segmentation with points and boxes, the data engine, and video with SAM 2.', minutes: 35, ready: true },
    { id: 'open-vocabulary', title: 'Open vocabulary: CLIP & text prompts', summary: 'Aligning images and text, zero-shot recognition, and text-prompted detection and segmentation.', minutes: 30, ready: true },
  ],
};
