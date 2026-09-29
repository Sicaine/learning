// Fach: Allgemeinwissen (Sprache: Deutsch). Etappen, Glossar und Quellen je Etappe getrennt.

import s_geschichte_de_1 from './stages/1-geschichte-de-1.js';
import g_geschichte_de_1 from './glossary/1-geschichte-de-1.js';
import q_geschichte_de_1 from './sources/1-geschichte-de-1.js';
import s_geschichte_de_2 from './stages/2-geschichte-de-2.js';
import g_geschichte_de_2 from './glossary/2-geschichte-de-2.js';
import q_geschichte_de_2 from './sources/2-geschichte-de-2.js';
import s_weltgeschichte from './stages/3-weltgeschichte.js';
import g_weltgeschichte from './glossary/3-weltgeschichte.js';
import q_weltgeschichte from './sources/3-weltgeschichte.js';
import s_politik from './stages/4-politik.js';
import g_politik from './glossary/4-politik.js';
import q_politik from './sources/4-politik.js';
import s_recht_gesellschaft from './stages/5-recht-gesellschaft.js';
import g_recht_gesellschaft from './glossary/5-recht-gesellschaft.js';
import q_recht_gesellschaft from './sources/5-recht-gesellschaft.js';
import s_wirtschaft from './stages/6-wirtschaft.js';
import g_wirtschaft from './glossary/6-wirtschaft.js';
import q_wirtschaft from './sources/6-wirtschaft.js';
import s_geografie from './stages/7-geografie.js';
import g_geografie from './glossary/7-geografie.js';
import q_geografie from './sources/7-geografie.js';
import s_naturwissenschaften from './stages/8-naturwissenschaften.js';
import g_naturwissenschaften from './glossary/8-naturwissenschaften.js';
import q_naturwissenschaften from './sources/8-naturwissenschaften.js';
import s_technik from './stages/9-technik.js';
import g_technik from './glossary/9-technik.js';
import q_technik from './sources/9-technik.js';
import s_literatur from './stages/10-literatur.js';
import g_literatur from './glossary/10-literatur.js';
import q_literatur from './sources/10-literatur.js';
import s_kunst_musik from './stages/11-kunst-musik.js';
import g_kunst_musik from './glossary/11-kunst-musik.js';
import q_kunst_musik from './sources/11-kunst-musik.js';
import s_philosophie_religion from './stages/12-philosophie-religion.js';
import g_philosophie_religion from './glossary/12-philosophie-religion.js';
import q_philosophie_religion from './sources/12-philosophie-religion.js';
import s_alltag from './stages/13-alltag.js';
import g_alltag from './glossary/13-alltag.js';
import q_alltag from './sources/13-alltag.js';
import wiki from './glossary/wiki.js';

export default {
  intro: `Das Wissen, das man in Deutschland als gebildeter Mensch haben sollte — **breit statt tief**: Geschichte, Politik, Wirtschaft, Geografie, Naturwissenschaften, Literatur, Kunst, Musik, Philosophie und Alltag. Jede Lektion bringt die wichtigsten Namen, Daten und Zusammenhänge, und die Lernkarten sorgen dafür, dass sie bleiben.`,
  stages: [s_geschichte_de_1, s_geschichte_de_2, s_weltgeschichte, s_politik, s_recht_gesellschaft, s_wirtschaft, s_geografie, s_naturwissenschaften, s_technik, s_literatur, s_kunst_musik, s_philosophie_religion, s_alltag],
  glossary: [g_geschichte_de_1, g_geschichte_de_2, g_weltgeschichte, g_politik, g_recht_gesellschaft, g_wirtschaft, g_geografie, g_naturwissenschaften, g_technik, g_literatur, g_kunst_musik, g_philosophie_religion, g_alltag],
  wiki,
  sources: [q_geschichte_de_1, q_geschichte_de_2, q_weltgeschichte, q_politik, q_recht_gesellschaft, q_wirtschaft, q_geografie, q_naturwissenschaften, q_technik, q_literatur, q_kunst_musik, q_philosophie_religion, q_alltag],
};
