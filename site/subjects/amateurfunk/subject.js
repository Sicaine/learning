// Fach: Amateurfunk — Vorbereitung auf die Prüfung Klasse E (Sprache: Deutsch).
// Fragen: amtlicher Katalog der Bundesnetzagentur (Lizenzhinweis: LIZENZ-HINWEIS.md, Pflichttext unten in QUESTIONS_NOTE).

import s1 from './stages/1-einstieg.js';
import g1 from './glossary/1-einstieg.js';
import q1 from './sources/1-einstieg.js';
import s2 from './stages/2-frequenzen.js';
import g2 from './glossary/2-frequenzen.js';
import q2 from './sources/2-frequenzen.js';
import s3 from './stages/3-betriebstechnik.js';
import g3 from './glossary/3-betriebstechnik.js';
import q3 from './sources/3-betriebstechnik.js';
import s4 from './stages/4-elektrotechnik-bruecke.js';
import g4 from './glossary/4-elektrotechnik-bruecke.js';
import q4 from './sources/4-elektrotechnik-bruecke.js';
import s5 from './stages/5-modulation-digital.js';
import g5 from './glossary/5-modulation-digital.js';
import q5 from './sources/5-modulation-digital.js';
import s6 from './stages/6-sender-empfaenger.js';
import g6 from './glossary/6-sender-empfaenger.js';
import q6 from './sources/6-sender-empfaenger.js';
import s7 from './stages/7-antennen-ausbreitung.js';
import g7 from './glossary/7-antennen-ausbreitung.js';
import q7 from './sources/7-antennen-ausbreitung.js';
import s8 from './stages/8-emv-vorschriften.js';
import g8 from './glossary/8-emv-vorschriften.js';
import q8 from './sources/8-emv-vorschriften.js';
import s9 from './stages/9-pruefung.js';
import g9 from './glossary/9-pruefung.js';
import q9 from './sources/9-pruefung.js';
import qVorschriften from './questions/vorschriften.js';
import qBetrieb from './questions/betrieb.js';
import qTechnikN from './questions/technik-n.js';
import qTechnikE from './questions/technik-e.js';
import qQuellen from './sources/quellen.js';
import exam from './exam.js';

const QUESTIONS_NOTE = "**Quellen der Fragen:** Prüfungsfragen zum Erwerb von Amateurfunkprüfungsbescheinigungen, Bundesnetzagentur, 3. Auflage, März 2024, ([www.bundesnetzagentur.de/amateurfunk](https://www.bundesnetzagentur.de/amateurfunk)), Datenlizenz Deutschland – Namensnennung – Version 2.0 ([www.govdata.de/dl-de/by-2-0](https://www.govdata.de/dl-de/by-2-0)). **Daten geändert:** Umwandlung ins Format der Plattform, Typografie, Abbildungen mit eindeutigen IDs, ergänzte Alternativtexte und Erklärungen. Einzelne Erklärungen nach dem 50ohm.de-Autorenteam (DARC e. V.), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.de), bearbeitet.";

export default {
  intro: `Dein Weg zum Rufzeichen: **Technik, Betrieb und Vorschriften** für die Amateurfunkprüfung **Klasse E** der Bundesnetzagentur. Der Pfad folgt dem amtlichen Fragenkatalog (1034 Fragen in vier Prüfungsteilen) — jede Lektion bereitet genau die Fragen vor, die sie behandelt, mit Demos, Rechenaufgaben und Karteikarten. Im Bereich „Üben“ trainierst du die echten Fragen mit Wiederholungslogik, und die **Prüfungssimulation** läuft im Originalformat.`,
  mission: `**Ziel: bestehen.** Vier Teile à 25 Fragen, je Teil mindestens **19 richtig**. Das schaffst du, wenn du die Zusammenhänge verstehst, statt Antworten auswendig zu lernen — deshalb erklären die Lektionen die Physik und die Praxis hinter den Fragen. Die Technik-Grundlagen findest du ausführlich im Fach **Elektrotechnik**; hier gibt es sie kompakt und prüfungsnah.`,
  stages: [s1, s2, s3, s4, s5, s6, s7, s8, s9],
  glossary: [g1, g2, g3, g4, g5, g6, g7, g8, g9],
  sources: [q1, q2, q3, q4, q5, q6, q7, q8, q9, qQuellen],
  questions: [qVorschriften, qBetrieb, qTechnikN, qTechnikE],
  exam: { ...exam, questionsNote: QUESTIONS_NOTE },
};
