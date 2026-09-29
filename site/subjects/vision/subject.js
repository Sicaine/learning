// Subject: Seeing Machines (modern computer vision).
// Stages, glossary and sources are split per stage so they can be authored independently.

import foundations from './stages/1-foundations.js';
import networks from './stages/2-networks.js';
import cnn from './stages/3-cnn.js';
import transformers from './stages/4-transformers.js';
import ssl from './stages/5-ssl.js';
import dino from './stages/6-dino.js';
import segmentation from './stages/7-segmentation.js';
import mission from './stages/8-mission.js';

import gFoundations from './glossary/1-foundations.js';
import gNetworks from './glossary/2-networks.js';
import gCnn from './glossary/3-cnn.js';
import gTransformers from './glossary/4-transformers.js';
import gSsl from './glossary/5-ssl.js';
import gDino from './glossary/6-dino.js';
import gSegmentation from './glossary/7-segmentation.js';
import gMission from './glossary/8-mission.js';

import sFoundations from './sources/1-foundations.js';
import sNetworks from './sources/2-networks.js';
import sCnn from './sources/3-cnn.js';
import sTransformers from './sources/4-transformers.js';
import sSsl from './sources/5-ssl.js';
import sDino from './sources/6-dino.js';
import sSegmentation from './sources/7-segmentation.js';
import sMission from './sources/8-mission.js';

export default {
  intro: `From vectors and gradients to **self-supervised Vision Transformers** like DINOv2 and DINOv3, and on to modern **segmentation**. Every stage builds on the one before it; math shows up exactly when it is needed.`,
  mission: `**Why this path exists.** You have ~100k watch images and a synthetic 3D render pipeline, and segmentation quality is not yet where you want it. A human glances at a watch and sees case, bezel, dial, hands, crown, strap — instantly. By the end of this path you should understand *why* that is hard for a model, what today's best models (DINOv3 features, SAM-style segmenters) actually do, how synthetic data helps and hurts, and what experiments fit on **2× RTX 4090 (24 GB each) + 128 GB RAM**.`,
  stages: [foundations, networks, cnn, transformers, ssl, dino, segmentation, mission],
  glossary: [gFoundations, gNetworks, gCnn, gTransformers, gSsl, gDino, gSegmentation, gMission],
  sources: [sFoundations, sNetworks, sCnn, sTransformers, sSsl, sDino, sSegmentation, sMission],
};
