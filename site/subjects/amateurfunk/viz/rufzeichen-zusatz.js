// Rufzeichen-Zusatz-Würfel: Szenario → richtigen Zusatz wählen (/p, /m, /mm, /am, /R, /T, keiner), dann „Pflicht oder freiwillig?“.
// Stand der Regeln: AFuV § 11, Rufzeichenplan Vfg. 15/2025 Nr. 9–11.
import { deck } from './_betrieb.js';

const OPT = ['/p', '/m', '/mm', '/am', '/R bzw. /Remote', '/T bzw. /Trainee', 'kein Zusatz'];
const [P, M, MM, AM, R, T, NONE] = OPT;
const optional = (what) => ({
  q: 'Muss dieser Zusatz angehängt werden — oder ist er freiwillig?',
  options: ['Freiwillig', 'Pflicht'], correct: 0,
  explain: `Nur **/T bzw. /Trainee** ist Pflicht. ${what} ist eine freiwillige Zusatzinformation; man darf ihn auch weglassen.`,
});

const ITEMS = [
  { q: 'Du wanderst mit einem Handfunkgerät auf einen Gipfel und rufst von dort CQ.', correct: OPT.indexOf(P), explain: '**/p** (portabel): zu Fuß unterwegs oder vorübergehend ortsfest an einem anderen Standort als dem Heimatstandort.', then: optional('/p') },
  { q: 'Du fährst im Auto auf der Autobahn und funkst mit deinem Mobilgerät.', correct: OPT.indexOf(M), explain: '**/m** (mobil): bewegliche Station in einem Landfahrzeug (Auto, Zug) oder auf einem Schiff auf Binnengewässern.', then: optional('/m') },
  { q: 'Du sitzt als Passagier auf der Fähre über den Bodensee, der Kapitän hat zugestimmt.', correct: OPT.indexOf(M), explain: 'Ein Binnengewässer ist **kein „auf See“**: dafür gilt **/m**. (Zustimmung des Schiffsführers brauchst du trotzdem.)' },
  { q: 'Du segelst als Crewmitglied mitten auf dem Atlantik, der Skipper erlaubt den Funkbetrieb.', correct: OPT.indexOf(MM), explain: '**/mm** (maritim mobil): an Bord eines Wasserfahrzeugs, das sich **auf See** befindet (DARC-Kurs: außerhalb der 12-Seemeilen-Zone, in internationalen Gewässern).', then: optional('/mm') },
  { q: 'Du fliegst als Passagier im Linienflugzeug. Der Flugzeugführer hat den Funkbetrieb erlaubt; das Flugzeug ist in der Luft.', correct: OPT.indexOf(AM), explain: '**/am** (aeronautisch mobil): an Bord eines Luftfahrzeugs. Nötig ist die **Zustimmung des Luftfahrzeugführers**, aber **keine Sondergenehmigung** der Bundesnetzagentur.', then: optional('/am') },
  { q: 'Du bedienst über das Internet die Klasse-A-Station deines Funkfreunds, die in 300 km Entfernung steht (Remote-Betrieb). Welcher Zusatz ist vorgesehen?', correct: OPT.indexOf(R), explain: '**/R** bzw. im Sprechfunk **Remote** kennzeichnet Remote-Betrieb. Er kann angefügt werden, ist aber freiwillig.', then: optional('/R') },
  { q: 'Dein Neffe (kein Funkamateur) spricht unter deiner Aufsicht in SSB mit deinem Rufzeichen DL1PZ. Welchen Zusatz muss **er** verwenden?', correct: OPT.indexOf(T), explain: 'Ausbildungsfunk: der **Auszubildende** hängt an dein Rufzeichen den Zusatz an — im Sprechfunk **„Trainee“** (DL1PZ/Trainee).', then: { q: 'Muss dieser Zusatz angehängt werden — oder ist er freiwillig?', options: ['Freiwillig', 'Pflicht'], correct: 1, explain: 'Der Zusatz für Ausbildungsfunk ist **verpflichtend** (AFuV § 11 Abs. 5). Alle anderen Zusätze sind freiwillig.' } },
  { q: 'Du bist zu Hause an deinem Heimatstandort (laut Zuteilungsurkunde) und rufst CQ. Welcher Zusatz?', correct: OPT.indexOf(NONE), explain: 'Am Heimatstandort ist kein Zusatz nötig. Zusätze sind freiwillige Hinweise auf einen anderen Betriebsort oder eine besondere Betriebsart.' },
  { q: 'Dein Ortsverband baut eine Station auf dem Feldtag in einer Wiese auf (vorübergehend ortsfest).', correct: OPT.indexOf(P), explain: '**/p** gilt auch für vorübergehend ortsfeste Stationen — nicht nur für Handfunkgeräte.', then: optional('/p') },
  { q: 'Du sendest im Zug während der Fahrt mit einem Handfunkgerät aus dem Fenster. Der Zusatz für eine bewegliche Station in einem Landfahrzeug heißt ...', correct: OPT.indexOf(M), explain: 'Zug = Landfahrzeug → **/m**. (Wer zu Fuß mit dem Handfunkgerät unterwegs ist, nimmt /p.)' },
  { q: 'An der Klubstation DL0MOL wird Ausbildungsfunk in **Telegrafie** gemacht. Wie nennt sich der Auszubildende?', options: ['DL0MOL/T', 'DL0MOL/Trainee', 'T/DL0MOL', 'DL0MOL/A'], correct: 0, explain: 'Bei Telegrafie und digitalen Betriebsarten gilt **/T**, im Sprechfunk **/Trainee**. Der Zusatz steht **hinter** dem Rufzeichen. (Klubstationen dürfen für Ausbildung genutzt werden.)', shuffle: true },
  { q: 'Du bist Ausbilder und möchtest selbst einmal in Ruhe funken, während dein Schüler zuhört. Welches Rufzeichen verwendest du?', options: ['Mein normales Rufzeichen, ohne Zusatz', 'Mein Rufzeichen mit /Trainee', 'Das Ausbildungsrufzeichen DN1AA', 'Mein Rufzeichen mit /A'], correct: 0, explain: 'Der Zusatz /T bzw. /Trainee macht aus deinem Rufzeichen ein **Ausbildungsrufzeichen**; es darf **nicht vom Ausbilder selbst** für eigene Aussendungen benutzt werden.', shuffle: true },
];

export default function mount(stage, { params = {}, complete, md }) {
  const items = ITEMS.map(i => i.options ? i : { ...i, options: OPT });
  deck(stage, {
    complete, md, items, count: params.count ?? 8, need: params.need ?? 7,
    goal: `${params.need ?? 7} von ${params.count ?? 8} Szenarien richtig`,
    optionsFixed: true,
    intro: 'Wähle in jedem Szenario den **passenden Rufzeichenzusatz**. Bei manchen Szenarien folgt eine Nachfrage: Pflicht oder freiwillig?',
  });
}
