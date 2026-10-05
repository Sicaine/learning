// Fach: Elektrotechnik (Sprache: Deutsch). Etappen, Glossar und Quellen je Etappe getrennt.

import s1 from './stages/1-grundgroessen.js';
import g1 from './glossary/1-grundgroessen.js';
import q1 from './sources/1-grundgroessen.js';
import s2 from './stages/2-gleichstromnetze.js';
import g2 from './glossary/2-gleichstromnetze.js';
import q2 from './sources/2-gleichstromnetze.js';
import s3 from './stages/3-felder.js';
import g3 from './glossary/3-felder.js';
import q3 from './sources/3-felder.js';
import s4 from './stages/4-wechselstrom.js';
import g4 from './glossary/4-wechselstrom.js';
import q4 from './sources/4-wechselstrom.js';
import s5 from './stages/5-halbleiter.js';
import g5 from './glossary/5-halbleiter.js';
import q5 from './sources/5-halbleiter.js';
import s6 from './stages/6-schaltungstechnik.js';
import g6 from './glossary/6-schaltungstechnik.js';
import q6 from './sources/6-schaltungstechnik.js';
import s7 from './stages/7-digitaltechnik.js';
import g7 from './glossary/7-digitaltechnik.js';
import q7 from './sources/7-digitaltechnik.js';
import s8 from './stages/8-energie-sicherheit.js';
import g8 from './glossary/8-energie-sicherheit.js';
import q8 from './sources/8-energie-sicherheit.js';
import s9 from './stages/9-signale-hf.js';
import g9 from './glossary/9-signale-hf.js';
import q9 from './sources/9-signale-hf.js';
import gSeed from './glossary/seed.js';

export default {
  intro: `Elektrotechnik zum **Verstehen und Ausprobieren**: von Ladung, Strom und Spannung über Felder und Wechselstrom bis zu Halbleitern, Digitaltechnik und den Grundlagen der Hochfrequenz. Fast jede Lektion hat eine Schaltung oder ein Messgerät zum Mitspielen — mit Reglern, Oszilloskop und Rechenaufgaben, die du sofort überprüfen kannst.`,
  mission: `**Wofür das Ganze?** Elektrotechnik ist die Grundlage für alles, was du an Funk, Elektronik und Netzteilen anfassen wirst. Der Pfad ist so gebaut, dass er direkt zum Fach **Amateurfunk** (Prüfung Klasse E) führt: Die Lektionen mit Prüfungsbezug sind im Lehrplan markiert, und die Rechenwege entsprechen der offiziellen Formelsammlung.`,
  stages: [s1, s2, s3, s4, s5, s6, s7, s8, s9],
  glossary: [gSeed, g1, g2, g3, g4, g5, g6, g7, g8, g9],
  sources: [q1, q2, q3, q4, q5, q6, q7, q8, q9],
};
