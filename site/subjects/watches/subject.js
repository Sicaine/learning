// Subject: Horology (watches). Stages, glossary and sources are split per stage.

import time from './stages/1-time.js';
import movement from './stages/2-movement.js';
import complications from './stages/3-complications.js';
import quartz from './stages/4-quartz.js';
import houses from './stages/5-houses.js';
import anatomy from './stages/6-anatomy.js';
import judging from './stages/7-judging.js';

import gTime from './glossary/1-time.js';
import gMovement from './glossary/2-movement.js';
import gComplications from './glossary/3-complications.js';
import gQuartz from './glossary/4-quartz.js';
import gHouses from './glossary/5-houses.js';
import gAnatomy from './glossary/6-anatomy.js';

import sources from './sources/index.js';
import wiki from './glossary/wiki.js';

export default {
  intro: `How humans learned to carry time on their wrist: from sundials and pendulums to the **lever escapement**, the quartz shock of 1969, and the houses that turned timekeeping into an art. Along the way you learn to *read* a watch — its movement and its anatomy.`,
  mission: `**A bridge to your other subject.** You are teaching a machine to see watches. The better you know the object — which parts exist, what they are called, how they look across brands and eras — the better you can design segmentation classes, spot labeling mistakes, and judge whether your synthetic renders look like real watches. Stage 6 (*Anatomy*) is written with exactly that in mind.`,
  stages: [time, movement, complications, quartz, houses, anatomy, judging],
  glossary: [gTime, gMovement, gComplications, gQuartz, gHouses, gAnatomy],
  wiki,
  sources: [sources],
};
