export default {
  id: 'globalisierung',
  title: 'Globalisierung & Welthandel',
  summary: 'Dein Smartphone wurde in Asien montiert, mit Rohstoffen aus Afrika, entworfen in Kalifornien und per Container verschifft. Was [[globalisierung|Globalisierung]] ist, warum Deutschland besonders davon lebt — und warum sie gerade unter Druck steht.',
  minutes: 20,
  goals: [
    '[[globalisierung|Globalisierung]] definieren und ihre Treiber nennen',
    'Deutschlands Rolle im Welthandel mit aktuellen Zahlen beschreiben',
    'Die [[wto|WTO]] und die Idee des Freihandels erklären',
    'Chancen und Risiken globaler [[lieferkette|Lieferketten]] abwägen',
  ],
  blocks: [
    {
      id: 'was', type: 'text', title: 'Was ist Globalisierung?',
      md: `
**[[globalisierung|Globalisierung]]** bezeichnet die zunehmende weltweite Verflechtung — von Wirtschaft, aber auch Politik, Kultur, Kommunikation und Umwelt. Waren, Kapital, Informationen und Menschen bewegen sich immer schneller über Grenzen.

Neu ist Fernhandel nicht: Die **Seidenstraße** verband China schon in der Antike mit dem Mittelmeer, die **Hanse** beherrschte im Mittelalter den Handel in Nord- und Ostsee, und vor dem Ersten Weltkrieg war die Weltwirtschaft bereits eng verflochten. Seit den 1990er-Jahren aber hat sich das Tempo enorm beschleunigt. Treiber waren:

- **Transport:** Der **Standardcontainer** (erstmals 1956 eingesetzt) machte den Seetransport extrem billig. Rund 80 % des Welthandels nach Volumen gehen heute übers Meer.
- **Kommunikation:** Internet und Mobilfunk erlauben es, Produktion weltweit in Echtzeit zu steuern.
- **Politik:** Abbau von Zöllen, Ende des Kalten Kriegs 1989/91, Chinas Beitritt zur WTO 2001.`,
    },
    {
      id: 'timeline', type: 'game', viz: 'timeline', title: 'Stationen des Welthandels',
      params: { mode: 'sort', events: [
        { year: 1241, label: 'Anfänge der Hanse', detail: 'Bündnis Lübeck–Hamburg gilt als Keimzelle der Hanse.' },
        { year: 1947, label: 'GATT unterzeichnet', detail: 'Allgemeines Zoll- und Handelsabkommen.' },
        { year: 1956, label: 'Erstes Containerschiff', detail: 'Malcom McLeans „Ideal X“ fährt mit Containern von New Jersey nach Houston.' },
        { year: 1995, label: 'WTO gegründet', detail: 'Welthandelsorganisation mit Sitz in Genf.' },
        { year: 2001, label: 'China tritt WTO bei', detail: 'Beginn von Chinas Aufstieg zur „Werkbank der Welt“.' },
        { year: 2009, label: 'China Exportweltmeister', detail: 'China löst Deutschland als größten Warenexporteur ab.' },
        { year: 2021, label: 'Suezkanal blockiert', detail: 'Die „Ever Given“ steckt sechs Tage fest — ein Symbol für verletzliche Lieferketten.' },
      ] },
    },
    {
      id: 'deutschland', type: 'text', title: 'Deutschland: eine Exportnation',
      md: `
Kaum ein großes Land hängt so stark vom Außenhandel ab wie Deutschland. Die Zahlen für **2025**:[^destatis-aussenhandel-2025]

<table>
<tr><th>Kennzahl</th><th>2025</th></tr>
<tr><td>Warenexporte</td><td>1.569,6 Mrd. €</td></tr>
<tr><td>Warenimporte</td><td>1.366,9 Mrd. €</td></tr>
<tr><td>Exportüberschuss</td><td>202,8 Mrd. €</td></tr>
<tr><td>Wichtigster Handelspartner (Exporte + Importe)</td><td>China, 251,8 Mrd. € — vor den USA (240,5 Mrd. €) und den Niederlanden</td></tr>
<tr><td>Wichtigstes Exportziel</td><td>USA</td></tr>
</table>

Die wichtigsten Exportgüter sind **Autos und Autoteile, Maschinen und chemisch-pharmazeutische Erzeugnisse**. Bis 2008 war Deutschland „**Exportweltmeister**“ (größter Warenexporteur der Welt), seitdem liegt China vorn; auch die USA exportieren mehr.

Der dauerhafte **[[handelsbilanz|Exportüberschuss]]** ist umstritten: Befürworter sehen darin die Stärke deutscher Produkte. Kritiker — auch die EU-Kommission und die USA — bemängeln, Deutschland sei zu abhängig von der Nachfrage anderer und investiere im Inland zu wenig.`,
    },
    {
      id: 'calc-anteil', type: 'numeric', title: 'Überschuss nachrechnen',
      question: 'Deutschland exportierte 2025 Waren für 1.569,6 Mrd. € und importierte für 1.366,9 Mrd. €. Wie hoch war der Exportüberschuss in Mrd. €?',
      answer: 202.7, tolerance: 0.2, unit: 'Mrd. €',
      hint: 'Exporte minus Importe.',
      explain: 'Rund **202,7–202,8 Mrd. €** (Destatis meldet 202,8 Mrd. € wegen Rundung der Einzelwerte). Das ist die **Handelsbilanz** — ein positiver Saldo heißt Exportüberschuss.',
    },
    {
      id: 'freihandel', type: 'text', title: 'Freihandel, Zölle und die WTO',
      md: `
Warum handeln Länder überhaupt? Der britische Ökonom **David Ricardo** zeigte 1817 mit dem Prinzip der **komparativen Kostenvorteile**: Selbst wenn ein Land *alles* effizienter herstellen könnte, lohnt es sich für beide Seiten, dass sich jedes auf das spezialisiert, was es *vergleichsweise* am besten kann — und dann tauscht.

**Zölle** sind Abgaben auf importierte Waren. Sie schützen heimische Produzenten (**Protektionismus**), machen Waren für Verbraucher aber teurer und provozieren oft Gegenzölle.

Die **[[wto|Welthandelsorganisation (WTO)]]**, 1995 aus dem GATT von 1947 hervorgegangen, mit Sitz in **Genf** und 166 Mitgliedern, soll Zölle abbauen, Regeln festlegen und Handelsstreitigkeiten schlichten. Wichtig für Deutschland: **Handelspolitik ist EU-Sache**. Zölle und Handelsabkommen verhandelt die EU-Kommission für alle Mitgliedstaaten — die EU bildet eine **Zollunion**.

**Aktuell:** 2025 verhängten die USA unter Präsident Donald Trump umfangreiche Zölle. Im Juli 2025 einigten sich EU und USA auf einen Basiszoll von **15 %** auf die meisten EU-Waren — eine Einigung, die in Europa als einseitig kritisiert wurde und politisch umstritten blieb.[^eu-usa-zoll]`,
    },
    {
      id: 'quiz-komparativ', type: 'quiz', title: 'Komparativer Vorteil',
      question: 'Land A stellt Autos **und** Wein effizienter her als Land B. Was sagt Ricardos Theorie?',
      options: [
        { text: 'Es lohnt sich trotzdem für beide, sich zu spezialisieren und zu handeln.', correct: true, why: 'Entscheidend sind die *relativen* Kosten: A spezialisiert sich auf das, worin sein Vorsprung am größten ist; B auf das, worin sein Nachteil am kleinsten ist.' },
        { text: 'Land A sollte alles selbst herstellen.', correct: false, why: 'Das wäre der absolute Vorteil. Ricardo zeigte, dass Handel auch dann beiden nützt.' },
        { text: 'Land B hat nichts anzubieten und kann nicht handeln.', correct: false, why: 'Auch B hat einen komparativen Vorteil — irgendwo ist sein Nachteil am kleinsten.' },
        { text: 'Beide sollten hohe Zölle erheben.', correct: false, why: 'Zölle verringern die Vorteile der Spezialisierung.' },
      ],
    },
    {
      id: 'lieferketten', type: 'text', title: 'Lieferketten: effizient, aber verletzlich',
      md: `
Moderne Produkte entstehen in **[[lieferkette|globalen Lieferketten]]**: Ein Auto besteht aus Tausenden Teilen von Zulieferern aus vielen Ländern. Das senkt Kosten — macht aber anfällig:

- **2020/21:** Corona-Lockdowns in Asien lösten weltweit einen Mangel an Halbleitern aus; Autowerke standen still.
- **März 2021:** Das Containerschiff „Ever Given“ blockierte sechs Tage den **Suezkanal**.
- **2022:** Der russische Angriff auf die Ukraine zeigte die Abhängigkeit Deutschlands von russischem Gas.

Seitdem ist von **„De-Risking“** die Rede: Lieferanten streuen, kritische Güter (Chips, Batterien, Medikamente) wieder stärker in Europa herstellen. Zugleich verlangt das **Lieferkettengesetz** (seit 2023), dass große Unternehmen Menschenrechte und Umweltstandards bei ihren Zulieferern achten.

**Globalisierungskritik** gibt es von vielen Seiten: Arbeitsplatzverluste in Industrieländern, Ausbeutung in Billiglohnländern, Umweltkosten des Transports, Macht multinationaler Konzerne. Befürworter verweisen darauf, dass seit 1990 Hunderte Millionen Menschen — vor allem in Asien — der extremen Armut entkommen sind.`,
    },
    {
      id: 'match', type: 'match', title: 'Begriffe zuordnen',
      pairs: [
        ['WTO', 'Welthandelsorganisation, Sitz Genf, seit 1995'],
        ['Zollunion', 'Gemeinsame Außenzölle, keine Binnenzölle (z. B. EU)'],
        ['Protektionismus', 'Schutz heimischer Produzenten durch Zölle und Quoten'],
        ['Komparativer Vorteil', 'David Ricardo, 1817'],
        ['Handelsbilanz', 'Differenz zwischen Waren-Exporten und -Importen'],
        ['De-Risking', 'Abhängigkeiten durch breiter gestreute Lieferanten verringern'],
      ],
    },
    {
      id: 'fact-container', type: 'callout', tone: 'fact', title: 'Die Kiste, die die Welt veränderte',
      md: 'Ein Standardcontainer (20 Fuß, „TEU“) ist rund 6 Meter lang. Die größten Containerschiffe tragen über 24.000 davon. Weil Umladen per Kran statt per Hand geschieht, kostet der Seetransport eines T-Shirts von Asien nach Europa nur wenige Cent. Deutschlands größter Hafen ist **Hamburg**.',
    },
    {
      id: 'recall', type: 'recall', title: 'Pro und Contra',
      prompt: 'Nenne je **zwei Vorteile und zwei Risiken** der starken Exportorientierung Deutschlands.',
      answer: '**Vorteile:** Viele gut bezahlte Industriearbeitsplätze hängen am Export; deutsche Unternehmen profitieren von großen Weltmärkten und Skaleneffekten; Spezialisierung auf hochwertige Produkte (Autos, Maschinen, Chemie) bringt Wohlstand. **Risiken:** Abhängigkeit von der Konjunktur und Politik anderer Länder (z. B. US-Zölle, Chinas Wirtschaft); verletzliche Lieferketten; Exportüberschüsse führen zu Handelskonflikten und bedeuten, dass im Inland vergleichsweise wenig investiert und konsumiert wird.',
      hints: ['Denk an Arbeitsplätze und an Zölle.'],
      cards: ['export-risiko'],
    },
  ],
  cards: [
    { id: 'def', front: 'Globalisierung — Definition', back: 'Zunehmende weltweite Verflechtung von Wirtschaft, Politik, Kultur und Kommunikation.' },
    { id: 'treiber', front: 'Drei Treiber der modernen Globalisierung', back: 'Billiger Transport (Container), Kommunikation (Internet), politischer Abbau von Handelsschranken.' },
    { id: 'container', front: 'Wann fuhr das erste Containerschiff?', back: '1956 (Malcom McLeans „Ideal X“).' },
    { id: 'wto', front: 'WTO — Gründung, Sitz, Vorgänger', back: '1995, Genf; Vorgänger GATT (1947).' },
    { id: 'china-wto', front: 'Wann trat China der WTO bei?', back: '2001.' },
    { id: 'export-2025', front: 'Deutsche Warenexporte 2025', back: 'Rund 1.570 Mrd. € (1.569,6 Mrd.); Überschuss rund 203 Mrd. €.' },
    { id: 'partner', front: 'Wichtigster Handelspartner Deutschlands 2025', back: 'China (vor USA und Niederlanden); wichtigstes Exportziel: USA.' },
    { id: 'gueter', front: 'Wichtigste deutsche Exportgüter', back: 'Autos und Autoteile, Maschinen, chemisch-pharmazeutische Erzeugnisse.' },
    { id: 'weltmeister', front: 'Bis wann war Deutschland „Exportweltmeister“?', back: 'Bis 2008; seit 2009 exportiert China am meisten.' },
    { id: 'ricardo', front: 'Komparative Kostenvorteile — wer und was?', back: 'David Ricardo (1817): Handel lohnt sich, wenn sich jedes Land auf das spezialisiert, was es relativ am günstigsten herstellt.' },
    { id: 'eu-handel', front: 'Wer verhandelt Zölle und Handelsabkommen für Deutschland?', back: 'Die EU (Kommission) — Handelspolitik ist EU-Kompetenz; die EU ist eine Zollunion.' },
    { id: 'suez', front: 'Was geschah im März 2021 im Suezkanal?', back: 'Das Containerschiff „Ever Given“ blockierte ihn sechs Tage lang.' },
    { id: 'lkg', front: 'Was verlangt das Lieferkettengesetz (seit 2023)?', back: 'Große Unternehmen müssen Menschenrechte und Umweltstandards bei Zulieferern beachten.' },
    { id: 'export-risiko', front: 'Hauptrisiko starker Exportabhängigkeit', back: 'Abhängigkeit von Nachfrage, Konjunktur und Handelspolitik anderer Länder (z. B. Zölle) und von Lieferketten.' },
    { id: 'zoll-2025', front: 'EU-USA-Zolleinigung Juli 2025', back: 'Basiszoll von 15 % auf die meisten EU-Waren in die USA.' },
    { id: 'hamburg', front: 'Größter Seehafen Deutschlands', back: 'Hamburg.' },
  ],
};
