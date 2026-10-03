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

Neu ist Fernhandel nicht: Die **[Seidenstraße](wiki:Seidenstraße|Silk Road)** verband [China](wiki:Volksrepublik China|China) schon in der Antike mit dem Mittelmeer, die **[Hanse](wiki:Hanse|Hanseatic League)** beherrschte im Mittelalter den Handel in Nord- und Ostsee, und vor dem [Ersten Weltkrieg](wiki:Erster Weltkrieg|World War I) war die [Weltwirtschaft](wiki:Weltwirtschaft|World economy) bereits eng verflochten. Seit den 1990er-Jahren aber hat sich das Tempo enorm beschleunigt. Treiber waren:

- **Transport:** Der **[Standardcontainer](wiki:ISO-Container|Intermodal container)** (erstmals 1956 eingesetzt) machte den Seetransport extrem billig. Rund 80 % des Welthandels nach Volumen gehen heute übers Meer.
- **Kommunikation:** Internet und Mobilfunk erlauben es, Produktion weltweit in Echtzeit zu steuern.
- **Politik:** Abbau von Zöllen, Ende des [Kalten Kriegs](wiki:Kalter Krieg|Cold War) 1989/91, Chinas Beitritt zur [WTO](wiki:Welthandelsorganisation|World Trade Organization) 2001.`,
    },
    {
      id: 'map-seewege', type: 'map', title: 'Der Weg der Container: von Shanghai nach Rotterdam',
      view: [-24, -38, 138, 66],
      layers: { cities: false },
      places: [
        { name: 'Shanghai', pos: 'b', kind: 'site', detail: '**[Shanghai](wiki:Shanghai)** — einer der größten Containerhäfen der Welt; hier beginnt für viele Waren die Reise nach Europa.' },
        { name: 'Singapur', pos: 'b', kind: 'site', detail: '**[Singapur](wiki:Singapur|Singapore)** — Drehscheibe zwischen Pazifik und Indischem Ozean an der Straße von Malakka.' },
        { name: 'Sueskanal', pos: 'r', kind: 'site', detail: 'Der **[Sueskanal](wiki:Sueskanal|Suez Canal)** (1869 eröffnet, rund 190 km lang) verbindet Rotes Meer und Mittelmeer. 2021 blockierte die „[Ever Given](wiki:Ever Given)“ ihn sechs Tage lang.' },
        { name: 'Kap der Guten Hoffnung', pos: 'r', kind: 'site', detail: 'Wer den Suezkanal meidet, fährt um das **[Kap der Guten Hoffnung](wiki:Kap der Guten Hoffnung|Cape of Good Hope)** — oft rund 10 bis 14 Tage länger und deutlich teurer.' },
        { name: 'Rotterdam', pos: 'l', kind: 'site', detail: '**[Rotterdam](wiki:Rotterdam)** — größter Seehafen Europas; von hier gehen Container per Schiff, Bahn und Lkw nach Deutschland.' },
        { name: 'Hamburg', pos: 'r', kind: 'site', detail: '**[Hamburg](wiki:Hamburg)** — Deutschlands größter Seehafen.' },
      ],
      lines: [
        { label: 'Suez-Route', color: '#c2410c', arrow: true, labelAt: 0.33, coords: [[122.2,30.6],[121.0,27.5],[119.8,25.0],[118.0,22.5],[114.5,21.0],[111.0,18.0],[110.5,14.5],[109.5,10.5],[106.0,7.5],[104.6,4.5],[104.0,1.3],[103.3,1.2],[101.2,2.6],[99.8,3.8],[98.0,5.5],[96.0,6.2],[93.5,6.4],[87.0,6.0],[80.5,5.4],[73.0,8.0],[65.0,11.5],[56.0,13.2],[52.0,13.2],[48.0,12.5],[45.0,12.3],[43.4,12.65],[41.5,15.0],[39.5,18.0],[37.5,21.0],[35.5,24.5],[34.0,27.2],[33.2,28.6],[32.55,29.9],[32.3,31.3],[31.0,32.5],[28.0,33.0],[24.0,34.0],[20.5,34.5],[16.0,35.2],[14.4,35.3],[11.5,36.3],[8.0,37.2],[3.0,37.9],[0.0,37.2],[-2.5,36.0],[-5.5,35.95],[-8.0,36.2],[-10.0,36.8],[-10.5,40.0],[-10.2,43.5],[-7.0,45.5],[-5.5,47.5],[-6.0,48.7],[-3.0,49.7],[-1.0,50.2],[1.5,51.0],[3.0,52.0],[4.05,52.0]] },
        { label: 'Kap-Route (Umweg um Afrika)', color: '#0d9488', dashed: true, labelAt: 0.28, coords: [[80.5,5.4],[72.0,-3.0],[62.0,-12.0],[48.0,-28.0],[34.0,-34.5],[18.4,-35.3],[10.0,-30.0],[5.0,-20.0],[3.0,-8.0],[2.0,2.0],[-10.0,2.5],[-17.0,8.5],[-19.5,14.0],[-19.5,21.0],[-19.5,28.0],[-14.5,33.0],[-11.0,36.0],[-10.0,36.8]] },
      ],
      caption: 'Die Linien sind schematisch, keine exakten Fahrrouten. Rund 80 % des Welthandels nach Volumen gehen über das Meer.',
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
<tr><td>Wichtigster Handelspartner (Exporte + Importe)</td><td>China, 251,8 Mrd. € — vor den [USA](wiki:Vereinigte Staaten|United States) (240,5 Mrd. €) und den [Niederlanden](wiki:Niederlande|Netherlands)</td></tr>
<tr><td>Wichtigstes Exportziel</td><td>USA</td></tr>
</table>

Die wichtigsten Exportgüter sind **[Autos](wiki:Automobil|Car) und Autoteile, Maschinen und chemisch-pharmazeutische Erzeugnisse**. Bis 2008 war Deutschland „**[Exportweltmeister](wiki:Exportweltmeister)**“ (größter Warenexporteur der Welt), seitdem liegt China vorn; auch die USA exportieren mehr.

Der dauerhafte **[[handelsbilanz|Exportüberschuss]]** ist umstritten: Befürworter sehen darin die Stärke deutscher Produkte. Kritiker — auch die [EU-Kommission](wiki:Europäische Kommission|European Commission) und die USA — bemängeln, Deutschland sei zu abhängig von der Nachfrage anderer und investiere im Inland zu wenig.`,
    },
    {
      id: 'map-handelspartner', type: 'map', title: 'Deutschlands wichtigste Handelspartner 2025',
      view: 'world',
      layers: { cities: false, countryLabels: false },
      highlight: [
        { countries: ['Deutschland'], label: 'Deutschland', color: '#111827' },
        { countries: ['Volksrepublik China'], label: 'Platz 1: China (251,8 Mrd. €)', color: '#dc2626' },
        { countries: ['Vereinigte Staaten'], label: 'Platz 2: USA (240,5 Mrd. €), wichtigstes Exportziel', color: '#2563eb' },
        { countries: ['Niederlande'], label: 'Platz 3: Niederlande', color: '#ea580c' },
      ],
      caption: 'Handelsvolumen (Exporte plus Importe) 2025 laut Statistischem Bundesamt. Die Niederlande sind klein, aber ein wichtiges Tor: In Rotterdam liegt Europas größter Seehafen.',
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
Warum handeln Länder überhaupt? Der britische Ökonom **[David Ricardo](wiki:David Ricardo)** zeigte 1817 mit dem Prinzip der **komparativen Kostenvorteile**: Selbst wenn ein Land *alles* effizienter herstellen könnte, lohnt es sich für beide Seiten, dass sich jedes auf das spezialisiert, was es *vergleichsweise* am besten kann — und dann tauscht.

**[Zölle](wiki:Zoll (Abgabe)|Tariff)** sind Abgaben auf importierte Waren. Sie schützen heimische Produzenten (**[Protektionismus](wiki:Protektionismus|Protectionism)**), machen Waren für Verbraucher aber teurer und provozieren oft Gegenzölle.

Die **[[wto|Welthandelsorganisation (WTO)]]**, 1995 aus dem [GATT](wiki:General Agreement on Tariffs and Trade) von 1947 hervorgegangen, mit Sitz in **[Genf](wiki:Genf|Geneva)** und 166 Mitgliedern, soll Zölle abbauen, Regeln festlegen und Handelsstreitigkeiten schlichten. Wichtig für Deutschland: **Handelspolitik ist EU-Sache**. Zölle und Handelsabkommen verhandelt die EU-Kommission für alle Mitgliedstaaten — die EU bildet eine **[Zollunion](wiki:Zollunion|Customs union)**.

**Aktuell:** 2025 verhängten die USA unter Präsident [Donald Trump](wiki:Donald Trump) umfangreiche Zölle. Im Juli 2025 einigten sich EU und USA auf einen Basiszoll von **15 %** auf die meisten EU-Waren — eine Einigung, die in Europa als einseitig kritisiert wurde und politisch umstritten blieb.[^eu-usa-zoll]`,
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

- **2020/21:** Corona-Lockdowns in Asien lösten weltweit einen Mangel an [Halbleitern](wiki:Halbleiter|Semiconductor) aus; Autowerke standen still.
- **März 2021:** Das [Containerschiff](wiki:Containerschiff|Container ship) „[Ever Given](wiki:Ever Given)“ blockierte sechs Tage den **[Suezkanal](wiki:Sueskanal|Suez Canal)**.
- **2022:** Der russische Angriff auf die Ukraine zeigte die Abhängigkeit Deutschlands von russischem Gas.

Seitdem ist von **„De-Risking“** die Rede: Lieferanten streuen, kritische Güter (Chips, Batterien, Medikamente) wieder stärker in Europa herstellen. Zugleich verlangt das **[Lieferkettengesetz](wiki:Lieferkettensorgfaltspflichtengesetz|Supply Chain Act)** (seit 2023), dass große Unternehmen Menschenrechte und Umweltstandards bei ihren Zulieferern achten.

**[Globalisierungskritik](wiki:Globalisierungskritik|Anti-globalization movement)** gibt es von vielen Seiten: Arbeitsplatzverluste in Industrieländern, Ausbeutung in Billiglohnländern, Umweltkosten des Transports, Macht [multinationaler Konzerne](wiki:Multinationaler Konzern|Multinational corporation). Befürworter verweisen darauf, dass seit 1990 Hunderte Millionen Menschen — vor allem in Asien — der extremen Armut entkommen sind.`,
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
      md: 'Ein Standardcontainer (20 Fuß, „TEU“) ist rund 6 Meter lang. Die größten Containerschiffe tragen über 24.000 davon. Weil Umladen per Kran statt per Hand geschieht, kostet der Seetransport eines T-Shirts von Asien nach Europa nur wenige Cent. Deutschlands größter Hafen ist **[Hamburg](wiki:Hamburg)**.',
    },
    {
      id: 'map-quiz-haefen', type: 'map', title: 'Wo liegen die Knotenpunkte des Welthandels?',
      view: [-15, -5, 128, 62],
      layers: { cities: false },
      quiz: { rounds: 5 },
      places: [{ name: 'Rotterdam', kind: 'site' }, { name: 'Hamburg', kind: 'site' }, { name: 'Shanghai', kind: 'site' }, { name: 'Singapur', kind: 'site' }, { name: 'Sueskanal', kind: 'site' }],
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
