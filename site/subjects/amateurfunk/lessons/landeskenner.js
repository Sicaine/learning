// Landeskenner: Karten-Quiz je Land. Highlight-Einträge werden aus einer Tabelle erzeugt.
const NACHBAR = '#b45309', ANDERE = '#2563eb', DE = '#64748b';
const hl = (country, label, ask, color = ANDERE, detail) => ({ countries: [country], label, ask, quiz: true, color, detail });
const EUROPA = [
  hl('Frankreich', 'F · Frankreich', 'Landeskenner F', NACHBAR, '**F** — [Frankreich](wiki:Frankreich|France), Nachbar Deutschlands.'),
  hl('Schweiz', 'HB9 · Schweiz', 'Landeskenner HB9', NACHBAR, '**HB9** — [Schweiz](wiki:Schweiz|Switzerland), Nachbar. Liechtenstein hat HB0 (kleine Berge, kleines Land).'),
  hl('Dänemark', 'OZ · Dänemark', 'Landeskenner OZ', NACHBAR, '**OZ** — [Dänemark](wiki:Dänemark|Denmark), Nachbar im Norden („oberer Zipfel“).'),
  hl('Polen', 'SP · Polen', 'Landeskenner SP', NACHBAR, '**SP** — [Polen](wiki:Polen|Poland), Nachbar im Osten.'),
  hl('Österreich', 'OE · Österreich', 'Landeskenner OE', NACHBAR, '**OE** — [Österreich](wiki:Österreich|Austria), Nachbar im Süden.'),
  hl('Belgien', 'ON · Belgien', 'Landeskenner ON', NACHBAR, '**ON** — Belgien, Nachbar im Westen.'),
  hl('Niederlande', 'PA · Niederlande', 'Landeskenner PA', NACHBAR, '**PA** — Niederlande, Nachbar im Nordwesten.'),
  hl('Luxemburg', 'LX · Luxemburg', 'Landeskenner LX', NACHBAR, '**LX** — Luxemburg, Nachbar im Westen.'),
  hl('Tschechien', 'OK · Tschechien', 'Landeskenner OK', NACHBAR, '**OK** — Tschechien, Nachbar im Osten (die Slowakei ist OM).'),
  hl('Spanien', 'EA · Spanien', 'Landeskenner EA'),
  hl('Portugal', 'CT · Portugal', 'Landeskenner CT'),
  hl('Irland', 'EI · Irland', 'Landeskenner EI'),
  hl('Italien', 'I · Italien', 'Landeskenner I'),
  hl('Schweden', 'SM · Schweden', 'Landeskenner SM'),
  hl('Ukraine', 'EM · Ukraine', 'Landeskenner EM'),
  hl('Estland', 'ES · Estland', 'Landeskenner ES'),
  hl('Vereinigtes Königreich', 'G · Vereinigtes Königreich', 'Landeskenner G'),
];
const WELT = [
  hl('Volksrepublik China', 'BY · China', 'Landeskenner BY'),
  hl('Japan', 'JA · Japan', 'Landeskenner JA'),
  hl('Indien', 'VU · Indien', 'Landeskenner VU'),
  hl('Südkorea', 'DS–DT · Südkorea', 'Landeskenner DS oder DT'),
  hl('Philippinen', 'DU–DZ · Philippinen', 'Landeskenner DU bis DZ'),
  hl('Armenien', 'EK · Armenien', 'Landeskenner EK'),
  hl('Israel', '4X · Israel', 'Landeskenner 4X'),
  hl('Vereinigte Staaten', 'K, W, N, AA–AL · USA', 'Landeskenner W (oder K, N)'),
  hl('Kanada', 'VE · Kanada', 'Landeskenner VE'),
  hl('Mexiko', 'XE · Mexiko', 'Landeskenner XE'),
  hl('Brasilien', 'PY · Brasilien', 'Landeskenner PY'),
  hl('Argentinien', 'LU · Argentinien', 'Landeskenner LU'),
  hl('Chile', 'CE · Chile', 'Landeskenner CE'),
  hl('Südafrika', 'ZS · Südafrika', 'Landeskenner ZS'),
  hl('Australien', 'VK · Australien', 'Landeskenner VK'),
  hl('Neuseeland', 'ZL · Neuseeland', 'Landeskenner ZL'),
];

export default {
  id: 'landeskenner',
  title: 'Landeskenner und internationale Präfixe',
  summary: 'Welches Land hinter welchem Präfix steckt (DA–DR, OE, HB9, F, PA, SP, W, VE, JA, …), woher man die Liste bekommt und wie man sie sich merkt — mit Karten-Quiz.',
  minutes: 20,
  goals: [
    'Erklären, wie man am [[landeskenner|Landeskenner]] eines Rufzeichens das Land erkennt und wo man unbekannte Präfixe nachschlägt',
    'Die Landeskenner der Nachbarländer Deutschlands sowie der wichtigsten europäischen und außereuropäischen Länder zuordnen',
    'US-amerikanische Rufzeichen erkennen (K, W, N, AA–AL) und Länder den Kontinenten zuordnen',
    'Typische Verwechslungen vermeiden (DA–DZ ist nicht nur Deutschland; „US“ ist nicht USA)',
  ],
  needs: [],
  blocks: [
    {
      id: 'intro', type: 'text', title: 'Am Rufzeichen erkennst du das Land',
      md: `
„**CQ CQ, hier SP5XYZ**“ — und ohne zu fragen weißt du: Der Funkpartner sitzt in Polen. Das geht, weil der Anfang jedes Rufzeichens ein **Landeskenner** (auch *Präfix*) ist. Die [Internationale Fernmeldeunion](wiki:Internationale Fernmeldeunion|International Telecommunication Union) (ITU) weist jedem Staat **Blöcke von Rufzeichen-Anfängen** zu; jedes Land vergibt seine nationalen Rufzeichen daraus. Deutschland hat zum Beispiel einen Block, der mit **D** beginnt, und teilt daraus die Präfixe **DA bis DR** an die Amateure.[^bnetza-rufzeichenplan]

Wo schlägst du einen **unbekannten** Landeskenner nach? In der **Landeskennerliste der ITU**, in **Amateurfunkhandbüchern** oder in **Rufzeichenlisten**. Nicht in der Rufzeichenliste der Bundesnetzagentur (die enthält nur *deutsche* Rufzeichen), nicht in IARU-Empfehlungen (die regeln Bandpläne) und nicht im nationalen Frequenzzuweisungsplan.[^darc-50ohm]

Der Anfang eines [Rufzeichens](wiki:Amateurfunkrufzeichen|Amateur radio call signs) heißt auch [ITU-Präfix](wiki:ITU-Präfix|ITU prefix); wer Länder sammelt, jagt später das [DXCC](wiki:DXCC|DX Century Club)-Diplom. Ein Rufzeichen liest du so: **Präfix** (ein oder zwei Buchstaben, ggf. mit Ziffer) + **Ziffer** + **Suffix**. In **HB9ABC** ist **HB9** der Landeskenner (Schweiz); in **4X1AB** ist es **4X** (Israel); in **VE3XYZ** ist **VE** Kanada und die 3 das Gebiet (Ontario).
`,
    },
    {
      id: 'warn-da', type: 'callout', tone: 'warning', title: 'Der Block DA–DZ gehört nicht nur Deutschland',
      md: `
Ein Block beginnt oft bei einem Buchstaben, aber **ein Buchstabe ≠ ein Land**. Der Bereich **DA bis DZ** teilt sich so auf:

- **DA–DR**: **Deutschland** (ohne DE und DI)
- **DS–DT**: **Südkorea**
- **DU–DZ**: **Philippinen**

Es stimmt also weder „DA–DZ ist ganz Deutschland“ noch „DA–DT Deutschland“ noch „DP–DT Taiwan“. Ähnlich bei den [USA](wiki:Vereinigte Staaten|United States): Dort sind es **K, W, N und AA–AL**. Ein Präfix **„US“** ist *nicht* USA, denn US gehört zur [Ukraine](wiki:Ukraine|Ukraine). Und **UA** ist Russland (UA3RUS), **VE** ist [Kanada](wiki:Kanada|Canada), nicht USA.
`,
    },
    {
      id: 'europa-tabelle', type: 'text', title: 'Europa: die wichtigsten Landeskenner',
      md: `
Die **fett** gedruckten tauchen im Fragenkatalog auf, die anderen sind Hintergrundwissen und helfen beim Ausschlussverfahren. Die Eselsbrücken sind eine Auswahl nach dem DARC-Kurs (50ohm.de, CC BY 4.0).[^darc-50ohm]

<table>
<thead><tr><th>Kenner</th><th>Land</th><th>Eselsbrücke</th></tr></thead>
<tbody>
<tr><td>**DA–DR**</td><td>Deutschland</td><td>—</td></tr>
<tr><td>**OE**</td><td>Österreich</td><td>OEsterreich</td></tr>
<tr><td>**HB9**</td><td>Schweiz</td><td>Hohe Berge (groß)</td></tr>
<tr><td>HB0</td><td>[Liechtenstein](wiki:Liechtenstein|Liechtenstein)</td><td>Hohe Berge (klein)</td></tr>
<tr><td>**F**</td><td>Frankreich</td><td>**F**rankreich</td></tr>
<tr><td>**ON**</td><td>Belgien</td><td>—</td></tr>
<tr><td>**PA**</td><td>Niederlande</td><td>—</td></tr>
<tr><td>**LX**</td><td>Luxemburg</td><td>—</td></tr>
<tr><td>**OK**</td><td>Tschechien</td><td>— (OM = Slowakei)</td></tr>
<tr><td>**SP**</td><td>Polen</td><td>**S**chönes **P**olen</td></tr>
<tr><td>**OZ**</td><td>Dänemark</td><td>**O**berer **Z**ipfel</td></tr>
<tr><td>**SM**</td><td>Schweden</td><td>**S**chwedische **M**öbel</td></tr>
<tr><td>LA</td><td>Norwegen</td><td>**LA**chse (links außen)</td></tr>
<tr><td>OH</td><td>Finnland</td><td>**O**ben **H**inten</td></tr>
<tr><td>**EA**</td><td>Spanien</td><td>**E**spani**A**</td></tr>
<tr><td>CT</td><td>Portugal</td><td>**C**os**T**a (Küste)</td></tr>
<tr><td>**EI**</td><td>Irland</td><td>—</td></tr>
<tr><td>**EM**</td><td>Ukraine</td><td>—</td></tr>
<tr><td>**ES**</td><td>Estland</td><td>—</td></tr>
<tr><td>EU</td><td>Belarus</td><td>—</td></tr>
<tr><td>I</td><td>Italien</td><td>—</td></tr>
<tr><td>G</td><td>Vereinigtes Königreich</td><td>**G**roßbritannien</td></tr>
<tr><td>LZ</td><td>Bulgarien</td><td>—</td></tr>
<tr><td>S5</td><td>Slowenien</td><td>—</td></tr>
<tr><td>SV</td><td>Griechenland</td><td>—</td></tr>
</tbody>
</table>

Das **Ausschlussverfahren** funktioniert gut, wenn du die fettgedruckten sicher kannst: In Mehrfachfragen genügt es oft, *einen* Eintrag sicher zu erkennen und die Antworten mit falschen Länderkombinationen auszusortieren. Bei Fragen mit mehreren Präfixen hintereinander kommt es auf die **Reihenfolge** an: **EA, EI, EK, EM, ES** sind Spanien, Irland, **Armenien**, Ukraine, Estland — die falschen Antworten enthalten dieselben Länder in vertauschter Reihenfolge.
`,
    },
    {
      id: 'map-europa', type: 'map', title: 'Europa: Landeskenner auf der Karte',
      intro: 'Orange sind die **Nachbarländer Deutschlands**. Tippe ein Land an, um Details zu sehen; unten kannst du dich abfragen lassen.',
      view: [-12, 34, 34, 66],
      layers: { cities: false, countryLabels: false, mountains: false, rivers: false },
      highlight: [{ countries: ['Deutschland'], label: 'DA–DR · Deutschland', color: DE, quiz: false }, ...EUROPA],
      quiz: { rounds: 8 },
      caption: 'Nachbarländer Deutschlands (orange): **F, HB9, OZ, SP, OE, ON, PA, LX, OK**. Im Quiz bekommst du einen Landeskenner genannt und tippst das passende Land auf der Karte an.',
    },
    {
      id: 'welt-text', type: 'text', title: 'Außerhalb Europas',
      md: `
<table>
<thead><tr><th>Kenner</th><th>Land</th><th>Eselsbrücke</th></tr></thead>
<tbody>
<tr><td>**K, W, N, AA–AL**</td><td>USA (Nordamerika)</td><td>**K**einer **W**ill **N**ach **A**merika</td></tr>
<tr><td>**VE**</td><td>Kanada (Nordamerika)</td><td>**V**iele **E**lche</td></tr>
<tr><td>**XE**</td><td>Mexiko (Nordamerika)</td><td>m**EX**iko</td></tr>
<tr><td>**PY**</td><td>Brasilien (Südamerika)</td><td>„**Py**ranhas“</td></tr>
<tr><td>**LU**</td><td>Argentinien (Südamerika)</td><td>**L**inks **U**nten</td></tr>
<tr><td>**CE**</td><td>Chile (Südamerika)</td><td>—</td></tr>
<tr><td>**JA**</td><td>Japan (Asien)</td><td>**JA**pan</td></tr>
<tr><td>**BY**</td><td>China (Asien)</td><td>**B**ezahle in **Y**uan</td></tr>
<tr><td>**VU**</td><td>Indien (Asien)</td><td>—</td></tr>
<tr><td>DS–DT</td><td>Südkorea (Asien)</td><td>—</td></tr>
<tr><td>DU–DZ</td><td>Philippinen (Asien)</td><td>—</td></tr>
<tr><td>**EK**</td><td>Armenien (Asien)</td><td>—</td></tr>
<tr><td>4X</td><td>Israel (Asien)</td><td>—</td></tr>
<tr><td>**VK**</td><td>Australien (Ozeanien)</td><td>**V**iele **K**ängurus</td></tr>
<tr><td>**ZL**</td><td>Neuseeland (Ozeanien)</td><td>**Z**ea-**L**and</td></tr>
<tr><td>ZS</td><td>Südafrika (Afrika)</td><td>—</td></tr>
</tbody>
</table>

Daraus folgen Merkregeln für die Kontinent-Fragen: **W, VE, XE** liegen alle in [Nordamerika](wiki:Nordamerika|North America); **PY, CE, LU** in [Südamerika](wiki:Südamerika|South America); **BY, JA, VU** in [Asien](wiki:Asien|Asia). Ein Präfix wie **K** (USA) in einer Gruppe mit Asien (**BY**), oder **LU** (Argentinien) in einer Gruppe mit Asiaten, zeigt sofort: falsche Antwort.

**US-Rufzeichen** erkennst du am Präfix: **K3LR**, **W3DZZ**, **K4EAX**, **N6CAL**, **AB0GC**, **KA7KLE** sind amerikanisch. **VE5VK** ist kanadisch, **UA3RUS** russisch, **US2ABC** gehört zur Ukraine und hat nichts mit den USA zu tun.[^darc-50ohm]
`,
    },
    {
      id: 'map-welt', type: 'map', title: 'Außereuropäische Landeskenner',
      intro: 'Tippe die Länder an — und lass dich dann abfragen.',
      view: 'world',
      layers: { cities: false, countryLabels: false, mountains: false, rivers: false },
      highlight: WELT,
      quiz: { rounds: 8 },
      caption: 'Heutige Staaten; Eselsbrücken stehen in der Tabelle oben.',
    },
    {
      id: 'viz-trainer', type: 'viz', viz: 'landeskenner-trainer', title: 'Landeskenner-Trainer',
      params: { count: 12, need: 10 },
      task: 'Beantworte **10 von 12** Fragen richtig.',
      caption: 'Präfix → Land, Land → Präfix, Nachbarländer und Kontinente.',
    },
    {
      id: 'match-lk', type: 'match', prompt: 'Welches Präfix gehört zu welchem Land?',
      pairs: [
        ['OE', 'Österreich'],
        ['ON', 'Belgien'],
        ['OK', 'Tschechien'],
        ['PA', 'Niederlande'],
        ['SM', 'Schweden'],
        ['SP', 'Polen'],
        ['EA', 'Spanien'],
        ['HB9', 'Schweiz'],
      ],
    },
    {
      id: 'quiz-nachbar', type: 'quiz', title: 'Nachbarn und Kontinente',
      question: 'Welche Aussagen sind richtig? (Mehrfachauswahl)',
      options: [
        { text: 'F, HB9, OZ und SP gehören zu Ländern, die an Deutschland grenzen.', correct: true, why: 'Frankreich, Schweiz, Dänemark und Polen.' },
        { text: 'EA (Spanien), GM (Schottland), OE und ON sind alles Nachbarländer Deutschlands.', correct: false, why: 'Spanien und Schottland grenzen nicht an Deutschland.' },
        { text: 'W, VE und XE gehören zu Ländern in Nordamerika.', correct: true, why: 'USA, Kanada, Mexiko.' },
        { text: 'K, VE und BY liegen alle in Nordamerika.', correct: false, why: 'BY ist China (Asien).' },
        { text: 'Rufzeichen mit dem Präfix K, W, N und AA–AL sind USA-Rufzeichen.', correct: true, why: 'So ist der amerikanische Block aufgeteilt.' },
        { text: 'Die Rufzeichenliste der Bundesnetzagentur ist die richtige Quelle, um ein unbekanntes ausländisches Präfix nachzuschlagen.', correct: false, why: 'Sie enthält nur deutsche Rufzeichen; die ITU-Landeskennerliste ist die Quelle.' },
      ],
    },
    {
      id: 'mission-dx', type: 'callout', tone: 'mission', title: 'Funkpraxis: Erste DX-Länder',
      md: `
Wenn du auf 10 m oder 15 m im Sommer **VE**, **W** oder **PY** hörst, ist das schon ein Stück DX — und eine gute Aufgabe für deine ersten Wochen: **jeden Tag ein neues Land loggen** und die QSL sammeln (mehr dazu in der Lektion „DX, Contest, Fuchsjagd“). Das Präfix-Wissen aus diesem Kapitel liefert dir die Länderzuordnung ohne Nachschlagen.

Prüfungsbezug: BD301–BD318.
`,
    },
    {
      id: 'recall-lk', type: 'recall', title: 'In eigenen Worten',
      prompt: 'Nenne fünf Nachbarländer Deutschlands mit Landeskenner und erkläre, wie du bei einem unbekannten Präfix (z. B. „5Z4“) herausfindest, wo die Station sitzt.',
      answer: 'Z. B. Frankreich F, Schweiz HB9, Österreich OE, Polen SP, Dänemark OZ (auch ON Belgien, PA Niederlande, LX Luxemburg, OK Tschechien). Ein unbekanntes Präfix schlage ich in der Landeskennerliste der ITU, in einem Amateurfunkhandbuch oder einer Rufzeichenliste nach — nicht in der Rufzeichenliste der Bundesnetzagentur, die nur deutsche Rufzeichen enthält.',
      cards: ['lk-nachbarn', 'lk-quelle'],
    },
  ],
  cards: [
    { id: 'lk-quelle', front: 'Wo schlägt man einen unbekannten Landeskenner nach?', back: 'ITU-**Landeskennerliste**, Amateurfunkhandbücher, Rufzeichenlisten (nicht die BNetzA-Liste, die nur deutsche Rufzeichen hat).' },
    { id: 'lk-da', front: 'DA–DR / DS–DT / DU–DZ?', back: '**Deutschland** (DA–DR) / **Südkorea** (DS–DT) / **Philippinen** (DU–DZ).' },
    { id: 'lk-nachbarn', front: 'Landeskenner der Nachbarländer Deutschlands?', back: '**F** (Frankreich), **HB9** (Schweiz), **OE** (Österreich), **OK** (Tschechien), **SP** (Polen), **OZ** (Dänemark), **PA** (Niederlande), **ON** (Belgien), **LX** (Luxemburg).' },
    { id: 'lk-oe-on-ok', front: 'OE / ON / OK?', back: '**Österreich / Belgien / Tschechien** (OM = Slowakei, OH = Finnland, OZ = Dänemark).' },
    { id: 'lk-ea-ei', front: 'EA / EI / EK / EM / ES?', back: '**Spanien / Irland / Armenien / Ukraine / Estland**.' },
    { id: 'lk-nord', front: 'SM / SP / OZ / LA?', back: '**Schweden / Polen / Dänemark / Norwegen**.' },
    { id: 'lk-pa-f', front: 'PA / F / LX / I?', back: '**Niederlande / Frankreich / Luxemburg / Italien**.' },
    { id: 'lk-usa', front: 'Welche Präfixe sind USA?', back: '**K, W, N, AA–AL**. Nicht VE (Kanada), nicht „US“ (Ukraine).' },
    { id: 'lk-amerika', front: 'W / VE / XE und PY / CE / LU?', back: '**Nordamerika**: USA, Kanada, Mexiko. **Südamerika**: Brasilien, Chile, Argentinien.' },
    { id: 'lk-asien', front: 'BY / JA / VU und 4X?', back: '**Asien**: China / Japan / Indien / Israel.' },
    { id: 'lk-ozeanien', front: 'VK / ZL / ZS?', back: '**Australien / Neuseeland / Südafrika**.' },
    { id: 'lk-hb', front: 'HB9 und HB0?', back: '**HB9** = Schweiz, **HB0** = Liechtenstein.' },
  ],
};
