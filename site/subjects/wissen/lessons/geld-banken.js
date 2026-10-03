export default {
  id: 'geld-banken',
  title: 'Geld, Banken & die EZB',
  summary: 'Was Geld eigentlich ist, wie Banken Geld „schaffen“ und warum eine Behörde in Frankfurt mit einer einzigen Zahl — dem [[leitzins|Leitzins]] — über Kredite in 21 Ländern mitentscheidet.',
  minutes: 25,
  goals: [
    'Die drei Funktionen von Geld nennen',
    'Erklären, wie Banken arbeiten und warum Kredite neues Geld erzeugen',
    'Aufgabe, Sitz und Instrumente der [[ezb|Europäischen Zentralbank]] kennen',
    'Die Geschichte des [[euro|Euro]] und den aktuellen Leitzins einordnen',
  ],
  blocks: [
    {
      id: 'was-ist-geld', type: 'text', title: 'Was ist Geld?',
      md: `
Geld ist alles, was eine Gesellschaft als Zahlungsmittel **akzeptiert**. Ökonomen nennen drei Funktionen:

1. **Tauschmittel** — man muss nicht mehr Kartoffeln gegen Schuhe tauschen.
2. **Recheneinheit** — alles bekommt einen vergleichbaren Preis.
3. **Wertaufbewahrungsmittel** — man kann heute sparen und morgen ausgeben (solange die [[inflation|Inflation]] nicht zu hoch ist).

Die Geschichte des Geldes ist eine Geschichte der Abstraktion: Vom **[Warengeld](wiki:Warengeld|History of money)** (Muscheln, Salz, Vieh) über **[Münzen](wiki:Münze|Coin)** aus Edelmetall zum **[Papiergeld](wiki:Papiergeld|Banknote)** und schließlich zum **[Buchgeld](wiki:Buchgeld|Demand deposit)** — Zahlen auf Konten. Heute ist der allergrößte Teil des Geldes Buchgeld; Bargeld macht nur einen kleinen Teil aus.

Unser Geld ist **„[Fiatgeld](wiki:Fiatgeld|Fiat money)“** (lat. *fiat*: es werde): Es ist nicht durch Gold gedeckt, sondern hat Wert, weil der Staat es als gesetzliches Zahlungsmittel festlegt und alle darauf vertrauen, dass es knapp gehalten wird.`,
    },
    {
      id: 'banken', type: 'text', title: 'Wie Banken arbeiten',
      md: `
Banken sind **Vermittler**: Sie nehmen Einlagen an ([Girokonto](wiki:Girokonto|Transaction account), Sparbuch) und vergeben **Kredite** an Haushalte, Unternehmen und den Staat. Ihr Gewinn entsteht vor allem aus der **Zinsdifferenz** — für Kredite verlangen sie höhere Zinsen, als sie Sparern zahlen.

Das deutsche Bankensystem hat **drei Säulen**:

- **[Sparkassen](wiki:Sparkasse|Savings bank)** und [Landesbanken](wiki:Landesbank) (öffentlich-rechtlich, regional verankert)
- **[Genossenschaftsbanken](wiki:Genossenschaftsbank|Cooperative banking)** (Volks- und Raiffeisenbanken; gehören ihren Mitgliedern)
- **Private Geschäftsbanken** (z. B. [Deutsche Bank](wiki:Deutsche Bank), [Commerzbank](wiki:Commerzbank))

**Geld aus dem Nichts?** Vergibt eine Bank einen Kredit, schreibt sie dem Kunden den Betrag einfach auf dem Konto gut — dabei entsteht **neues Buchgeld** ([Geldschöpfung](wiki:Geldschöpfung|Money creation)). Wird der Kredit zurückgezahlt, verschwindet es wieder. Begrenzt wird das durch Vorschriften: Eigenkapitalregeln, die [Mindestreserve](wiki:Mindestreserve|Reserve requirement) bei der Zentralbank und die Zinsen, zu denen sich Banken bei der Zentralbank Geld leihen.

Guthaben sind in der EU durch die **[Einlagensicherung](wiki:Einlagensicherung|Deposit insurance)** bis **100.000 € pro Kunde und Bank** geschützt.`,
    },
    {
      id: 'calc-zins', type: 'numeric', title: 'Zinseszins',
      question: 'Du legst 1.000 € für **zwei Jahre** zu **3 %** Zinsen pro Jahr an; die Zinsen werden mitverzinst. Wie viel Geld hast du am Ende?',
      answer: 1060.9, tolerance: 0.1, unit: '€',
      hint: 'Nach einem Jahr: 1.030 €. Im zweiten Jahr bekommst du 3 % auf 1.030 €.',
      explain: '$1000 \\cdot 1{,}03^2 = 1060{,}90$ €. Ohne [Zinseszins](wiki:Zinseszins|Compound interest) wären es 1.060 €. Der Unterschied wächst mit der Zeit enorm — [Albert Einstein](wiki:Albert Einstein) wird (vermutlich fälschlich) der Satz zugeschrieben, der Zinseszins sei das achte Weltwunder.',
    },
    {
      id: 'ezb', type: 'text', title: 'Die Europäische Zentralbank',
      md: `
Die **[[ezb|Europäische Zentralbank (EZB)]]** wurde **1998** gegründet und hat ihren Sitz in **[Frankfurt am Main](wiki:Frankfurt am Main|Frankfurt)**. Sie ist für die Geldpolitik aller Länder zuständig, die den Euro nutzen. Präsidentin ist seit November 2019 die Französin **[Christine Lagarde](wiki:Christine Lagarde)**; ihre Vorgänger waren [Wim Duisenberg](wiki:Wim Duisenberg), [Jean-Claude Trichet](wiki:Jean-Claude Trichet) und [Mario Draghi](wiki:Mario Draghi). Zusammen mit den nationalen Zentralbanken — in Deutschland die **[Deutsche Bundesbank](wiki:Deutsche Bundesbank)** (gegründet 1957, ebenfalls Frankfurt) — bildet sie das [Eurosystem](wiki:Eurosystem).

**Hauptziel: Preisstabilität**, konkret eine Inflation von **2 %** auf mittlere Sicht. Die EZB ist **unabhängig**: Regierungen dürfen ihr keine Weisungen erteilen, und sie darf Staaten nicht direkt finanzieren. Dieses Modell folgt dem Vorbild der Bundesbank.

Ihr wichtigstes Werkzeug ist der **[[leitzins|Leitzins]]**. Maßgeblich ist heute der **Einlagesatz**: der Zins, den Banken für Geld bekommen, das sie über Nacht bei der Zentralbank parken.

- **Zinsen hoch** → Kredite werden teurer, es wird weniger gekauft und investiert → die Inflation sinkt (aber die Konjunktur bremst ab).
- **Zinsen runter** → Kredite werden billiger, die Wirtschaft wird angekurbelt → die Preise können steigen.

**Stand September 2026:** Einlagesatz **2,50 %** (seit 16. September 2026), Hauptrefinanzierungssatz 2,65 %. Die EZB hatte die Zinsen im Juni und September 2026 wegen steigender Energiepreise infolge des [Nahostkonflikts](wiki:Nahostkonflikt|Arab–Israeli conflict) jeweils um 0,25 Prozentpunkte angehoben.[^ezb-2026-09]`,
    },
    {
      id: 'timeline-zins', type: 'viz', viz: 'timeline', title: 'Euro und Zinsen: eine Zeitleiste',
      params: { events: [
        { year: 1948, label: 'D-Mark eingeführt', detail: 'Währungsreform in den Westzonen am 20./21. Juni 1948.' },
        { year: 1957, label: 'Bundesbank gegründet', detail: 'Die Bundesbank wird zum Symbol für stabiles Geld.' },
        { year: 1992, label: 'Vertrag von Maastricht', detail: 'Beschließt die Wirtschafts- und Währungsunion samt Konvergenzkriterien.' },
        { year: 1998, label: 'EZB gegründet', detail: 'Am 1. Juni 1998 in Frankfurt am Main.' },
        { year: 1999, label: 'Euro als Buchgeld', detail: '1. Januar 1999: Wechselkurse werden unwiderruflich fixiert — 1 € = 1,95583 DM.' },
        { year: 2002, label: 'Euro-Bargeld', detail: '1. Januar 2002: Scheine und Münzen ersetzen die D-Mark.' },
        { year: 2014, label: 'Negativzinsen', detail: 'Die EZB senkt den Einlagesatz im Juni 2014 unter null — bis 2022.' },
        { year: 2023, label: 'Einlagesatz 4 %', detail: 'Höchststand nach der Zinswende gegen die hohe Inflation.' },
        { year: 2026, label: 'Bulgarien: 21. Euroland', detail: '1. Januar 2026. Kurios: 1 € = 1,95583 Lew — derselbe Kurs wie einst für die D-Mark, weil der Lew an sie gekoppelt war.' },
      ] },
    },
    {
      id: 'quiz-zins', type: 'quiz', title: 'Was bewirkt eine Zinserhöhung?',
      question: 'Die EZB erhöht den Leitzins deutlich. Welche Folgen sind typisch? (Mehrfachauswahl)',
      options: [
        { text: 'Baukredite werden teurer.', correct: true, why: 'Banken geben höhere Refinanzierungskosten an Kreditnehmer weiter.' },
        { text: 'Sparer bekommen tendenziell mehr Zinsen.', correct: true, why: 'Auch Einlagen werden besser verzinst, wenn auch oft verzögert.' },
        { text: 'Die Inflation soll sinken.', correct: true, why: 'Weniger kreditfinanzierte Nachfrage dämpft den Preisanstieg — das ist der Zweck.' },
        { text: 'Die Konjunktur wird angekurbelt.', correct: false, why: 'Im Gegenteil: Höhere Zinsen bremsen Investitionen und Konsum.' },
        { text: 'Die Regierung kann der EZB die Erhöhung verbieten.', correct: false, why: 'Die EZB ist unabhängig; Regierungen dürfen ihr keine Weisungen geben.' },
      ],
    },
    {
      id: 'euro', type: 'text', title: 'Der Euro',
      md: `
Der **[[euro|Euro]]** wurde am **1. Januar 1999** als Buchgeld eingeführt; seit dem **1. Januar 2002** gibt es Scheine und Münzen. Die D-Mark wurde zum Kurs von **1 € = 1,95583 DM** umgetauscht — noch heute kann man D-Mark unbefristet bei der Bundesbank umtauschen.

Seit **1. Januar 2026** zahlen **21 EU-Staaten** mit dem Euro; jüngstes Mitglied ist **[Bulgarien](wiki:Bulgarien|Bulgaria)**, davor kam 2023 [Kroatien](wiki:Kroatien|Croatia) dazu. Nicht dabei sind unter anderem [Dänemark](wiki:Dänemark|Denmark), [Schweden](wiki:Schweden|Sweden), [Polen](wiki:Polen|Poland), [Tschechien](wiki:Tschechien|Czech Republic) und [Ungarn](wiki:Ungarn|Hungary).

Die **Scheine** sind in allen Ländern gleich und zeigen keine realen Bauwerke, sondern Baustile Europas (Fenster, Tore, Brücken). Die **Münzen** haben eine gemeinsame und eine nationale Seite: Deutsche Münzen zeigen den **Bundesadler** (1 €, 2 €), das **[Brandenburger Tor](wiki:Brandenburger Tor|Brandenburg Gate)** (10, 20, 50 Cent) und einen **[Eichenzweig](wiki:Eiche|Oak)** (1, 2, 5 Cent).`,
    },
    {
      id: 'map-euroraum', type: 'map', title: 'Wer zahlt mit dem Euro? (Stand 2026)',
      view: [-11.5, 34.5, 32.0, 62.5],
      layers: { cities: false },
      highlight: [
        { countries: ['Deutschland', 'Frankreich', 'Italien', 'Spanien', 'Portugal', 'Irland', 'Belgien', 'Niederlande', 'Luxemburg', 'Österreich', 'Finnland', 'Estland', 'Lettland', 'Litauen', 'Slowakei', 'Slowenien', 'Griechenland', 'Malta', 'Republik Zypern', 'Kroatien', 'Bulgarien'], label: 'Euroraum (21 Staaten)', color: '#2563eb' },
        { countries: ['Dänemark', 'Schweden', 'Polen', 'Tschechien', 'Ungarn', 'Rumänien'], label: 'EU, aber ohne Euro', color: '#ca8a04' },
      ],
      points: [
        { lon: 8.683, lat: 50.110, label: 'Frankfurt am Main', kind: 'capital', pos: 'r', detail: '**[Frankfurt am Main](wiki:Frankfurt am Main|Frankfurt)** — Sitz der **[Europäischen Zentralbank](wiki:Europäische Zentralbank|European Central Bank)** (seit 1998) und der **[Deutschen Bundesbank](wiki:Deutsche Bundesbank)**. Von hier aus wird die Geldpolitik für alle Euro-Staaten gemacht.' },
      ],
      caption: 'Kroatien kam 2023 dazu, **Bulgarien am 1. Januar 2026**. Die Karte zeigt die heutigen Staatsgebiete; alle anderen Länder sind grau.',
    },
    {
      id: 'match-euro', type: 'match', title: 'Zuordnen',
      pairs: [
        ['1. Januar 1999', 'Euro wird als Buchgeld eingeführt'],
        ['1. Januar 2002', 'Euro-Bargeld kommt in Umlauf'],
        ['1,95583', 'D-Mark pro Euro'],
        ['Christine Lagarde', 'EZB-Präsidentin seit 2019'],
        ['Frankfurt am Main', 'Sitz von EZB und Bundesbank'],
        ['100.000 €', 'Gesetzliche Einlagensicherung pro Bank und Kunde'],
      ],
    },
    {
      id: 'order-geld', type: 'order', title: 'Die Entwicklung des Geldes',
      prompt: 'Ordne die Formen des Geldes nach ihrem historischen Auftreten (frühestes oben).',
      items: ['Warengeld (Muscheln, Salz, Vieh)', 'Edelmetallmünzen', 'Papiergeld', 'Buchgeld auf Bankkonten', 'Kartenzahlung und digitales Bezahlen'],
      explain: 'Jeder Schritt macht Geld abstrakter — und abhängiger vom Vertrauen in Banken und Staat.',
    },
    {
      id: 'fact-bargeld', type: 'callout', tone: 'fact', title: 'Deutsche lieben Bargeld',
      md: 'Im europäischen Vergleich zahlen Deutsche nach wie vor gern bar, auch wenn Karten- und Handyzahlungen stark zugenommen haben. Und: Noch immer sind D-Mark-Bestände im Milliardenwert nicht umgetauscht — in Sparstrümpfen, Sammlungen oder schlicht verloren.',
    },
    {
      id: 'recall-geldschoepfung', type: 'recall', title: 'Erklär es in eigenen Worten',
      prompt: 'Wie kann eine Geschäftsbank **neues Geld schaffen** — und was begrenzt das?',
      answer: 'Vergibt eine Bank einen Kredit, schreibt sie dem Kreditnehmer den Betrag auf dessen Konto gut. Dieses **Buchgeld entsteht neu** — es wird nicht einem Sparer weggenommen. Bei Rückzahlung verschwindet es wieder. Begrenzt wird die Geldschöpfung durch **Eigenkapitalvorschriften**, die **Mindestreserve** bei der Zentralbank, die Nachfrage nach Krediten und vor allem durch den **Leitzins** der Zentralbank, der bestimmt, wie teuer Refinanzierung ist.',
      hints: ['Was passiert auf dem Konto des Kreditnehmers?', 'Welche Rolle spielt die Zentralbank?'],
      cards: ['geldschoepfung'],
    },
  ],
  cards: [
    { id: 'funktionen', front: 'Die drei Funktionen des Geldes', back: 'Tauschmittel, Recheneinheit, Wertaufbewahrungsmittel.' },
    { id: 'fiat', front: 'Was ist „Fiatgeld“?', back: 'Geld ohne Warendeckung (z. B. Gold), das seinen Wert durch staatliche Festlegung und Vertrauen erhält.' },
    { id: 'saeulen', front: 'Die drei Säulen des deutschen Bankensystems', back: 'Sparkassen (öffentlich-rechtlich), Genossenschaftsbanken (Volks- und Raiffeisenbanken), private Geschäftsbanken.' },
    { id: 'geldschoepfung', front: 'Wie entsteht bei einem Kredit neues Geld?', back: 'Die Bank schreibt den Kreditbetrag als Buchgeld gut — es entsteht neu und verschwindet bei der Tilgung.' },
    { id: 'einlagen', front: 'Einlagensicherung in der EU', back: 'Bis 100.000 € pro Kunde und Bank.' },
    { id: 'ezb-basis', front: 'EZB: Gründung, Sitz, Präsidentin', back: '1998, Frankfurt am Main, Christine Lagarde (seit 2019).' },
    { id: 'ezb-ziel', front: 'Vorrangiges Ziel der EZB', back: 'Preisstabilität: Inflation von 2 % auf mittlere Sicht.' },
    { id: 'unabhaengig', front: 'Was bedeutet die Unabhängigkeit der EZB?', back: 'Regierungen dürfen ihr keine Weisungen geben; sie darf Staaten nicht direkt finanzieren.' },
    { id: 'zins-wirkung', front: 'Wirkung einer Leitzinserhöhung', back: 'Kredite teurer → weniger Konsum und Investitionen → Inflation sinkt, Konjunktur bremst ab.' },
    { id: 'leitzins-2026', front: 'EZB-Einlagesatz im September 2026', back: '2,50 % (seit 16.9.2026, nach Erhöhungen im Juni und September 2026).' },
    { id: 'negativ', front: 'Wann gab es negative EZB-Einlagezinsen?', back: 'Von Juni 2014 bis 2022.' },
    { id: 'euro-daten', front: 'Euro: Buchgeld und Bargeld seit …', back: 'Buchgeld 1.1.1999, Bargeld 1.1.2002.' },
    { id: 'dm-kurs', front: 'Umrechnungskurs D-Mark / Euro', back: '1 € = 1,95583 DM.' },
    { id: 'euroland-21', front: 'Wie viele Staaten haben den Euro (2026), wer kam zuletzt dazu?', back: '21; Bulgarien am 1.1.2026 (davor Kroatien 2023).' },
    { id: 'muenzen', front: 'Motive der deutschen Euro-Münzen', back: 'Bundesadler (1 €, 2 €), Brandenburger Tor (10–50 Cent), Eichenzweig (1–5 Cent).' },
    { id: 'bundesbank', front: 'Deutsche Bundesbank: gegründet wann, wo?', back: '1957, Frankfurt am Main.' },
  ],
};
