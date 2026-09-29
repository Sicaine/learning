export default {
  id: 'nachkrieg',
  title: 'Nachkriegs- & Gegenwartsliteratur',
  summary: 'Nach 1945 muss die deutsche Literatur eine neue Sprache finden — für Schuld, Trümmer und Teilung. Es entstehen Weltbestseller wie *Die Blechtrommel*, eine eigene DDR-Literatur und eine lebendige Gegenwartsliteratur mit Preisen, Messen und Bestsellern.',
  minutes: 22,
  goals: [
    '[[truemmerliteratur|Trümmerliteratur]] und [[gruppe-47|Gruppe 47]] erklären',
    'Böll, Grass, Lenz, Celan, Frisch, Dürrenmatt und Christa Wolf mit ihren Hauptwerken verbinden',
    'Deutschsprachige [[nobelpreis-literatur|Literaturnobelpreisträger]] der Nachkriegszeit nennen',
    'Wichtige Literaturpreise und Romane der Gegenwart kennen',
  ],
  blocks: [
    {
      id: 'stunde-null', type: 'text', title: '„Stunde Null“ und Trümmerliteratur',
      md: `
1945 liegen die Städte in Trümmern — und auch die Sprache ist beschädigt: Zwölf Jahre NS-Propaganda haben Wörter wie „Volk“ oder „Heimat“ vergiftet. Junge Autoren, viele selbst Kriegsheimkehrer, schreiben deshalb bewusst **karg und ungeschönt**: die [[truemmerliteratur|Trümmerliteratur]].[^wp-truemmerliteratur]

Das bekannteste Beispiel ist **Wolfgang Borcherts** Drama *Draußen vor der Tür* (1947): Der Heimkehrer Beckmann findet keinen Platz mehr in der Gesellschaft. Borchert starb einen Tag vor der Uraufführung, mit 26 Jahren.

1947 gründet **Hans Werner Richter** die [[gruppe-47|Gruppe 47]]: Autorinnen und Autoren lesen einander unveröffentlichte Texte vor und müssen sich sofort der Kritik stellen. Bis 1967 wird die Gruppe zur wichtigsten Bühne der westdeutschen Literatur.[^wp-gruppe-47]`,
    },
    {
      id: 'celan', type: 'callout', tone: 'history', title: 'Paul Celan: „Todesfuge“',
      md: `
Der jüdische Dichter **Paul Celan** (1920–1970), dessen Eltern in einem Lager umkamen, schrieb mit der *Todesfuge* das bekannteste Gedicht über den Holocaust. Es beginnt: „Schwarze Milch der Frühe wir trinken sie abends“ — und wiederholt die Zeile „der Tod ist ein Meister aus Deutschland“. Das Gedicht wurde zu einer Antwort auf Adornos berühmten Satz, nach Auschwitz ein Gedicht zu schreiben, sei barbarisch.`,
    },
    {
      id: 'bundesrepublik', type: 'text', title: 'Die großen Namen der Bundesrepublik',
      md: `
- **Heinrich Böll** (1917–1985), Köln: kritischer Chronist der jungen Bundesrepublik — *Billard um halb zehn* (1959), *Ansichten eines Clowns* (1963), *Die verlorene Ehre der Katharina Blum* (1974, über Boulevardpresse und Hysterie im „Deutschen Herbst“). Literaturnobelpreis **1972**.[^wp-boell]
- **Günter Grass** (1927–2015), Danzig: *Die Blechtrommel* (1959) — Oskar Matzerath beschließt mit drei Jahren, nicht mehr zu wachsen, und erlebt die NS-Zeit als trommelnder Zwerg. Mit *Katz und Maus* und *Hundejahre* bildet der Roman die „Danziger Trilogie“. Literaturnobelpreis **1999**. 2006 wurde bekannt, dass Grass als 17-Jähriger Mitglied der Waffen-SS gewesen war — eine späte Offenbarung, die heftige Debatten auslöste.[^wp-grass]
- **Siegfried Lenz**: *Deutschstunde* (1968) — über Pflichterfüllung im NS-Staat.
- **Ingeborg Bachmann** (Österreich): Lyrikerin; nach ihr ist der Preis beim Klagenfurter Wettlesen benannt.

Und aus der Schweiz zwei Dramatiker, die jede Schulklasse kennt:

- **Max Frisch**: *Homo faber* (1957), *Andorra* (1961), *Biedermann und die Brandstifter*
- **Friedrich Dürrenmatt**: *Der Besuch der alten Dame* (1956), *Die Physiker* (1962), *Der Richter und sein Henker*`,
    },
    {
      id: 'ddr', type: 'text', title: 'Literatur in der DDR',
      md: `
In der DDR sollte Literatur den Sozialismus unterstützen („sozialistischer Realismus“) und unterlag der Zensur. Dennoch entstanden eigenständige Werke:

- **Christa Wolf** (1929–2011): *Der geteilte Himmel* (1963) über ein Paar, das die Teilung trennt; *Kassandra* (1983).[^wp-christa-wolf]
- **Ulrich Plenzdorf**: *Die neuen Leiden des jungen W.* (1972) — ein junger Mann in der DDR, der sich in Goethes *Werther* wiederfindet.
- **Anna Seghers** kehrte aus dem Exil zurück (*Das siebte Kreuz*).
- **Wolf Biermann**, Liedermacher, wurde **1976** während einer Konzertreise im Westen ausgebürgert — viele Künstler protestierten, und die Ausbürgerung gilt als Wendepunkt im Verhältnis von DDR-Staat und Künstlern.`,
    },
    {
      id: 'gegenwart', type: 'text', title: 'Gegenwart: Preise, Messen, Bestseller',
      md: `
Einige Romane der letzten Jahrzehnte sind längst Klassiker:

- **Patrick Süskind**, *Das Parfum* (1985) — die Geschichte eines Mörders mit dem absoluten Geruchssinn, weltweit millionenfach verkauft
- **Bernhard Schlink**, *Der Vorleser* (1995) — Liebe und NS-Schuld, verfilmt mit Kate Winslet
- **Daniel Kehlmann**, *Die Vermessung der Welt* (2005) — Gauß und Humboldt als komisches Doppelporträt
- **Wolfgang Herrndorf**, *Tschick* (2010) — ein Roadtrip zweier Jugendlicher, heute Schullektüre
- **Uwe Tellkamp**, *Der Turm* (2008) — das Dresdner Bildungsbürgertum in der späten DDR

Wichtige Institutionen: der [[georg-buechner-preis|Georg-Büchner-Preis]] (seit 1951, wichtigster Preis), der **Deutsche Buchpreis** (seit 2005), der **Friedenspreis des Deutschen Buchhandels** in der Frankfurter Paulskirche — und die **Frankfurter Buchmesse**, die größte Buchmesse der Welt.[^wp-buechner-preis]`,
    },
    {
      id: 'nobel-timeline', type: 'game', viz: 'timeline', title: 'Nobelpreise in die richtige Reihenfolge',
      params: {
        mode: 'sort',
        events: [
          { year: 1912, label: 'Gerhart Hauptmann' },
          { year: 1929, label: 'Thomas Mann' },
          { year: 1946, label: 'Hermann Hesse' },
          { year: 1966, label: 'Nelly Sachs' },
          { year: 1972, label: 'Heinrich Böll' },
          { year: 1999, label: 'Günter Grass' },
          { year: 2004, label: 'Elfriede Jelinek' },
          { year: 2009, label: 'Herta Müller' },
          { year: 2019, label: 'Peter Handke' },
        ],
      },
      intro: 'Deutschsprachige Literaturnobelpreisträger — vom frühesten zum jüngsten.[^wp-nobel-liste]',
    },
    {
      id: 'match-werke', type: 'match', title: 'Autor ↔ Werk',
      pairs: [
        ['Wolfgang Borchert', 'Draußen vor der Tür'],
        ['Heinrich Böll', 'Ansichten eines Clowns'],
        ['Günter Grass', 'Die Blechtrommel'],
        ['Friedrich Dürrenmatt', 'Der Besuch der alten Dame'],
        ['Max Frisch', 'Homo faber'],
        ['Christa Wolf', 'Der geteilte Himmel'],
        ['Patrick Süskind', 'Das Parfum'],
      ],
    },
    {
      id: 'quiz-gruppe47', type: 'quiz', title: 'Gruppe 47',
      question: 'Was war das Besondere an den Treffen der Gruppe 47?',
      options: [
        { text: 'Autoren lasen unveröffentlichte Texte vor und wurden sofort öffentlich kritisiert', correct: true, why: 'Der Vorlesende saß auf dem „elektrischen Stuhl“ und durfte auf die Kritik nicht antworten.' },
        { text: 'Sie war eine Partei, die bei Bundestagswahlen antrat', correct: false, why: 'Die Gruppe war ein loser literarischer Kreis ohne Satzung oder Mitgliedsliste.' },
        { text: 'Sie war die offizielle Schriftstellervereinigung der DDR', correct: false, why: 'Das war der Schriftstellerverband der DDR; die Gruppe 47 war westdeutsch.' },
      ],
    },
    {
      id: 'fact-blechtrommel', type: 'callout', tone: 'fact', title: 'Oscar für die Blechtrommel',
      md: `Volker Schlöndorffs Verfilmung der *Blechtrommel* gewann 1979 die Goldene Palme in Cannes und 1980 als erster deutscher Film den **Oscar für den besten fremdsprachigen Film**.`,
    },
    {
      id: 'grass-alter', type: 'numeric', title: 'Kurze Rechnung',
      question: '*Die Blechtrommel* erschien 1959, der Nobelpreis für Günter Grass kam 1999. Wie viele Jahre liegen dazwischen?',
      answer: 40, tolerance: 0, unit: 'Jahre',
      explain: '40 Jahre. Die Schwedische Akademie hob in ihrer Begründung ausdrücklich die *Blechtrommel* hervor.',
    },
    {
      id: 'recall-truemmer', type: 'recall', title: 'Warum so karg?',
      prompt: 'Warum schrieben viele Autoren direkt nach 1945 so bewusst schlicht und schmucklos?',
      answer: `Weil die NS-Propaganda die Sprache mit Pathos, großen Wörtern und Ideologie („Volk“, „Heldentod“) missbraucht hatte. Die Autoren der **Trümmerliteratur** wollten ehrlich über Krieg, Zerstörung und Schuld schreiben und misstrauten jeder schönen, feierlichen Sprache („Kahlschlag“). Beispiel: Borcherts *Draußen vor der Tür*.`,
      hints: ['Was hatte die Propaganda mit der Sprache gemacht?'],
      cards: ['truemmer'],
    },
  ],
  cards: [
    { id: 'truemmer', front: 'Was ist Trümmerliteratur?', back: 'Literatur ab 1945 in karger Sprache über Krieg, Heimkehr, Zerstörung und Schuld — z. B. Borcherts *Draußen vor der Tür* (1947).' },
    { id: 'borchert', front: 'Wolfgang Borcherts bekanntestes Drama?', back: '*Draußen vor der Tür* (1947) — der Heimkehrer Beckmann.' },
    { id: 'gruppe47', front: 'Gruppe 47: Gründer, Zeitraum?', back: 'Hans Werner Richter; 1947–1967.' },
    { id: 'celan', front: 'Paul Celans bekanntestes Gedicht und seine erste Zeile?', back: '*Todesfuge*: „Schwarze Milch der Frühe wir trinken sie abends“.' },
    { id: 'boell-nobel', front: 'Wann erhielt Heinrich Böll den Literaturnobelpreis?', back: '1972.' },
    { id: 'boell-werke', front: 'Zwei Romane Heinrich Bölls?', back: '*Ansichten eines Clowns* (1963), *Die verlorene Ehre der Katharina Blum* (1974).' },
    { id: 'blechtrommel', front: 'Wer ist Oskar Matzerath?', back: 'Der Erzähler in Grass\' *Die Blechtrommel* (1959), der mit drei Jahren beschließt, nicht mehr zu wachsen.' },
    { id: 'grass-nobel', front: 'Wann erhielt Günter Grass den Literaturnobelpreis?', back: '1999.' },
    { id: 'deutschstunde', front: 'Siegfried Lenz\' bekanntester Roman?', back: '*Deutschstunde* (1968).' },
    { id: 'duerrenmatt', front: 'Zwei Dramen von Friedrich Dürrenmatt?', back: '*Der Besuch der alten Dame* (1956), *Die Physiker* (1962).' },
    { id: 'frisch', front: 'Zwei Werke von Max Frisch?', back: '*Homo faber* (1957), *Andorra* (1961) — auch *Biedermann und die Brandstifter*.' },
    { id: 'christa-wolf', front: 'Christa Wolfs Roman über ein durch die Teilung getrenntes Paar?', back: '*Der geteilte Himmel* (1963).' },
    { id: 'biermann', front: 'Was geschah 1976 mit Wolf Biermann?', back: 'Die DDR bürgerte ihn während einer Konzertreise in der Bundesrepublik aus.' },
    { id: 'nobel-liste', front: 'Deutschsprachige Literaturnobelpreisträger seit 1966?', back: 'Nelly Sachs 1966, Böll 1972, Canetti 1981, Grass 1999, Jelinek 2004, Herta Müller 2009, Handke 2019.' },
    { id: 'buechner-preis', front: 'Wichtigster Literaturpreis im deutschen Sprachraum?', back: 'Der Georg-Büchner-Preis (seit 1951, Deutsche Akademie für Sprache und Dichtung).' },
    { id: 'parfum', front: 'Süskinds Weltbestseller von 1985?', back: '*Das Parfum. Die Geschichte eines Mörders*.' },
    { id: 'vermessung', front: 'Wer sind die Helden in Kehlmanns *Die Vermessung der Welt*?', back: 'Carl Friedrich Gauß und Alexander von Humboldt.' },
  ],
};
