// Sources cited in stage 7-segmentation. See CLAUDE.md for the source format.
export default [
  { id: 'mask-rcnn', kind: 'Paper', title: 'Mask R-CNN', authors: 'He, Gkioxari, Dollár, Girshick', year: 2017, venue: 'ICCV 2017', url: 'https://arxiv.org/abs/1703.06870' },
  { id: 'clip', kind: 'Paper', title: 'Learning Transferable Visual Models From Natural Language Supervision (CLIP)', authors: 'Radford et al.', year: 2021, venue: 'ICML 2021', url: 'https://arxiv.org/abs/2103.00020' },
  { id: 'mask2former', kind: 'Paper', title: 'Masked-attention Mask Transformer for Universal Image Segmentation (Mask2Former)', authors: 'Cheng et al.', year: 2021, venue: 'CVPR 2022', url: 'https://arxiv.org/abs/2112.01527' },
  { id: 'sam', kind: 'Paper', title: 'Segment Anything', authors: 'Kirillov et al. (Meta AI)', year: 2023, venue: 'ICCV 2023', url: 'https://arxiv.org/abs/2304.02643' },
  { id: 'grounding-dino', kind: 'Paper', title: 'Grounding DINO: Marrying DINO with Grounded Pre-Training for Open-Set Object Detection', authors: 'Liu et al.', year: 2023, venue: 'ECCV 2024', url: 'https://arxiv.org/abs/2303.05499', note: 'Different “DINO”: a DETR-style detector, not the self-supervised DINO.' },
  { id: 'sam2', kind: 'Paper', title: 'SAM 2: Segment Anything in Images and Videos', authors: 'Ravi et al. (Meta AI)', year: 2024, url: 'https://arxiv.org/abs/2408.00714' },
  { id: 'sam3', kind: 'Paper', title: 'SAM 3: Segment Anything with Concepts', authors: 'Carion et al. (Meta AI)', year: 2025, url: 'https://arxiv.org/abs/2511.16719' },
  { id: 'faster-rcnn', kind: 'Paper', title: 'Faster R-CNN: Towards Real-Time Object Detection with Region Proposal Networks', authors: 'Ren, He, Girshick, Sun', year: 2015, venue: 'NeurIPS 2015', url: 'https://arxiv.org/abs/1506.01497' },
  { id: 'detr', kind: 'Paper', title: 'End-to-End Object Detection with Transformers (DETR)', authors: 'Carion et al.', year: 2020, venue: 'ECCV 2020', url: 'https://arxiv.org/abs/2005.12872', note: 'Object queries + Hungarian matching: detection as set prediction, no NMS.' },
  { id: 'maskformer', kind: 'Paper', title: 'Per-Pixel Classification is Not All You Need for Semantic Segmentation (MaskFormer)', authors: 'Cheng, Schwing, Kirillov', year: 2021, venue: 'NeurIPS 2021', url: 'https://arxiv.org/abs/2107.06278' },
  { id: 'dino-detr', kind: 'Paper', title: 'DINO: DETR with Improved DeNoising Anchor Boxes for End-to-End Object Detection', authors: 'Zhang et al.', year: 2022, venue: 'ICLR 2023', url: 'https://arxiv.org/abs/2203.03605', note: 'The *detector* called DINO — unrelated to self-supervised DINO despite the name.' },
  { id: 'grounded-sam', kind: 'Paper', title: 'Grounded SAM: Assembling Open-World Models for Diverse Visual Tasks', authors: 'Ren et al.', year: 2024, url: 'https://arxiv.org/abs/2401.14159', note: 'Grounding DINO boxes as prompts for SAM: text in, masks out.' },
];
