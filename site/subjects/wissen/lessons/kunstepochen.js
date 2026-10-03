export default {
  id: 'kunstepochen',
  title: 'Epochen der Kunst',
  summary: 'Ein Spaziergang durch 2500 Jahre Kunstgeschichte: Wer die großen Epochen und ihre Erkennungszeichen kennt, kann fast jedes Bild und fast jede Kirche grob einordnen — vom griechischen Tempel bis zur Pop Art.',
  minutes: 22,
  goals: [
    'Die großen Kunstepochen von der Antike bis zur Gegenwart in der richtigen Reihenfolge nennen',
    'Jeder Epoche typische Merkmale zuordnen',
    'Die Moderne-„Ismen“ ([[impressionismus|Impressionismus]], [[expressionismus|Expressionismus]], [[kubismus|Kubismus]], [[surrealismus|Surrealismus]]) unterscheiden',
    'Ein unbekanntes Bild anhand von Merkmalen grob datieren',
  ],
  blocks: [
    {
      id: 'antike-mittelalter', type: 'text', title: 'Antike und Mittelalter',
      md: `
**[Antike](wiki:Antike|Classical antiquity)** (ca. 800 v. Chr. – 400 n. Chr.): Die Griechen suchen das **ideale Menschenbild** — perfekte Proportionen, ruhige Standfiguren mit Stand- und Spielbein (der [[kontrapost|Kontrapost]]). Ihre Tempel mit den drei [[saeulenordnung|Säulenordnungen]] und die römische Baukunst ([Kolosseum](wiki:Kolosseum|Colosseum), [Pantheon](wiki:Pantheon (Rom)|Pantheon, Rome)) werden später immer wieder zum Vorbild.[^wp-kunstgeschichte]

**Mittelalter**: Kunst dient vor allem dem Glauben. Figuren wirken flächig, goldener Hintergrund steht für den Himmel, Wichtiges ist groß dargestellt („Bedeutungsperspektive“).

- [[romanik|Romanik]] (ca. 1000–1250): wuchtige Kirchen mit Rundbögen, strenge, feierliche Figuren
- [[gotik|Gotik]] (ca. 1140–1500): himmelstrebende Kathedralen mit Spitzbögen und bunten Glasfenstern, Figuren werden lebendiger, anmutig geschwungen`,
    },
    {
      id: 'renaissance-barock', type: 'text', title: 'Renaissance, Barock, Rokoko',
      md: `
Die [[renaissance|Renaissance]] (ca. 1400–1600, „Wiedergeburt“ der [Antike](wiki:Antike|Classical antiquity)) beginnt in **[Florenz](wiki:Florenz|Florence)**. Der Mensch rückt in den Mittelpunkt, Künstler studieren Anatomie und Natur, und mit der [[zentralperspektive|Zentralperspektive]] entsteht erstmals mathematisch korrekter Raum. Stars: [Leonardo da Vinci](wiki:Leonardo da Vinci|Leonardo da Vinci), [Michelangelo](wiki:Michelangelo|Michelangelo), [Raffael](wiki:Raffael|Raphael) — und nördlich der Alpen [Albrecht Dürer](wiki:Albrecht Dürer|Albrecht Dürer).[^wp-renaissance]

Der [[barock|Barock]] (ca. 1600–1750) will überwältigen: Bewegung, Drama, Prunk, starke Hell-Dunkel-Kontraste ([[chiaroscuro|Chiaroscuro]]). Kirchen und Schlösser der Gegenreformation und des Absolutismus sollen die Macht von Kirche und Fürst zeigen. Maler: [Caravaggio](wiki:Caravaggio|Caravaggio), [Rubens](wiki:Peter Paul Rubens|Peter Paul Rubens), [Rembrandt](wiki:Rembrandt van Rijn|Rembrandt), [Vermeer](wiki:Johannes Vermeer|Johannes Vermeer).[^wp-barock]

Das [[rokoko|Rokoko]] (ca. 1730–1770) ist die verspielte Spätform: Pastellfarben, Muschelornamente, galante Szenen.`,
    },
    {
      id: 'klassizismus-romantik', type: 'text', title: 'Klassizismus, Romantik, Realismus',
      md: `
- [[klassizismus|Klassizismus]] (ca. 1770–1840): Gegenbewegung zum Rokoko — klare Linien, antike Strenge. [Brandenburger Tor](wiki:Brandenburger Tor|Brandenburg Gate), Gemälde von [Jacques-Louis David](wiki:Jacques-Louis David|Jacques-Louis David).
- [[romantik|Romantik]] (ca. 1790–1840): Gefühl, Natur, Sehnsucht, Nacht. In Deutschland vor allem [[caspar-david-friedrich|Caspar David Friedrich]].
- **Realismus** (Mitte 19. Jh.): Die Wirklichkeit ungeschönt, auch einfache Arbeit — [Gustave Courbet](wiki:Gustave Courbet|Gustave Courbet), [Adolph Menzel](wiki:Adolph von Menzel|Adolph Menzel) (*[Das Eisenwalzwerk](wiki:Das Eisenwalzwerk|The Iron Rolling Mill (Modern Cyclopes))*).`,
    },
    {
      id: 'moderne', type: 'text', title: 'Die Moderne: ein „Ismus“ nach dem anderen',
      md: `
Mit der [Fotografie](wiki:Fotografie|Photography) verliert die Malerei ab etwa 1840 ihre Aufgabe, die Welt abzubilden. Künstler erfinden immer neue Sichtweisen:

- [[impressionismus|Impressionismus]] (ab 1874, [Paris](wiki:Paris|Paris)): Licht und Augenblick, gemalt im Freien, sichtbare Pinseltupfer — [Monet](wiki:Claude Monet|Claude Monet), [Renoir](wiki:Auguste Renoir|Pierre-Auguste Renoir), [Degas](wiki:Edgar Degas|Edgar Degas).[^wp-impressionismus]
- **Nachimpressionismus**: [van Gogh](wiki:Vincent van Gogh|Vincent van Gogh), [Cézanne](wiki:Paul Cézanne|Paul Cézanne), [Gauguin](wiki:Paul Gauguin|Paul Gauguin) — starke Farben, eigene Handschrift.
- [[jugendstil|Jugendstil]] (um 1900): geschwungene Pflanzenlinien, Ornament — [Klimt](wiki:Gustav Klimt|Gustav Klimt).
- [[expressionismus|Expressionismus]] (ab 1905): grelle Farben, verzerrte Formen, inneres Erleben — [Munch](wiki:Edvard Munch|Edvard Munch), [[die-bruecke|Die Brücke]], [[blauer-reiter|Der Blaue Reiter]].[^wp-expressionismus]
- [[kubismus|Kubismus]] (ab 1907): Zerlegung in geometrische Flächen, mehrere Ansichten zugleich — [Picasso](wiki:Pablo Picasso|Pablo Picasso), [Braque](wiki:Georges Braque|Georges Braque).
- **Abstrakte Kunst** (ab 1910/11): [Kandinsky](wiki:Wassily Kandinsky|Wassily Kandinsky), später [Mondrian](wiki:Piet Mondrian|Piet Mondrian) — keine Gegenstände mehr.
- [[dada|Dada]] (1916, [Zürich](wiki:Zürich|Zurich)): Anti-Kunst, Zufall, Provokation — [Duchamp](wiki:Marcel Duchamp|Marcel Duchamp), [Arp](wiki:Hans Arp|Jean Arp).
- [[surrealismus|Surrealismus]] (ab 1924): Träume und Unbewusstes — [Dalí](wiki:Salvador Dalí|Salvador Dalí), [Magritte](wiki:René Magritte|René Magritte), [Max Ernst](wiki:Max Ernst|Max Ernst).
- [[pop-art|Pop Art]] (1950er/60er): Werbung, Comics, Konsum — [Warhol](wiki:Andy Warhol|Andy Warhol), [Lichtenstein](wiki:Roy Lichtenstein|Roy Lichtenstein).

Ab 1955 zeigt die [[documenta]] in [Kassel](wiki:Kassel|Kassel) alle fünf Jahre, was zeitgenössische Kunst gerade bewegt.`,
    },
    {
      id: 'timeline-explore', type: 'viz', viz: 'timeline', title: 'Zeitleiste der Epochen',
      params: {
        events: [
          { year: 1030, label: 'Romanik', detail: 'Ca. 1000–1250. Rundbögen, dicke Mauern: [Speyerer Dom](wiki:Speyerer Dom|Speyer Cathedral) (Baubeginn um 1030).' },
          { year: 1248, label: 'Gotik', detail: 'Ca. 1140–1500. 1248 Baubeginn des [Kölner Doms](wiki:Kölner Dom|Cologne Cathedral).' },
          { year: 1503, label: 'Renaissance', detail: 'Ca. 1400–1600. Um 1503 beginnt Leonardo die *[Mona Lisa](wiki:Mona Lisa|Mona Lisa)*.' },
          { year: 1642, label: 'Barock', detail: 'Ca. 1600–1750. 1642 malt [Rembrandt](wiki:Rembrandt van Rijn|Rembrandt) *[Die Nachtwache](wiki:Die Nachtwache|The Night Watch)*.' },
          { year: 1745, label: 'Rokoko', detail: 'Ca. 1730–1770. 1745–47 Bau von [Schloss Sanssouci](wiki:Schloss Sanssouci|Sanssouci).' },
          { year: 1791, label: 'Klassizismus', detail: '1791 Fertigstellung des Brandenburger Tors.' },
          { year: 1818, label: 'Romantik', detail: 'Um 1818 *[Der Wanderer über dem Nebelmeer](wiki:Der Wanderer über dem Nebelmeer|Wanderer Above the Sea of Fog)*.' },
          { year: 1874, label: 'Impressionismus', detail: 'Erste Ausstellung der Impressionisten in [Paris](wiki:Paris|Paris).' },
          { year: 1905, label: 'Expressionismus', detail: 'Gründung der Künstlergruppe *Die Brücke* in [Dresden](wiki:Dresden|Dresden).' },
          { year: 1907, label: 'Kubismus', detail: '[Picasso](wiki:Pablo Picasso|Pablo Picasso) malt *Les Demoiselles d\'Avignon*.' },
          { year: 1924, label: 'Surrealismus', detail: '[André Bretons](wiki:André Breton|André Breton) *Surrealistisches Manifest*.' },
          { year: 1962, label: 'Pop Art', detail: 'Warhols *Campbell\'s Soup Cans*.' },
        ],
      },
      caption: 'Tippe auf eine Epoche für ein Schlüsseldatum. Die Jahre markieren je ein typisches Werk, nicht den Anfang der Epoche. (Die Antike, um 450 v. Chr., würde die Leiste sprengen.)',
    },
    {
      id: 'map-kunstorte',
      type: 'map',
      title: 'Wo die Epochen zu sehen sind',
      view: [1, 43, 19.8, 54.8],
      layers: { cities: false },
      points: [
        {
          lon: 8.4425,
          lat: 49.3172,
          label: 'Speyerer Dom',
          kind: 'site',
          pos: 'l',
          color: '#b91c1c',
          detail: '**Romanik**: Baubeginn um 1030; die größte erhaltene romanische Kirche der Welt.',
        },
        {
          lon: 6.9582,
          lat: 50.9413,
          label: 'Kölner Dom',
          kind: 'site',
          pos: 'l',
          color: '#1d4ed8',
          detail: '**Gotik**: 1248 begonnen, 1880 vollendet.',
        },
        {
          lon: 9.9386,
          lat: 49.7928,
          label: 'Würzburger Residenz',
          kind: 'site',
          pos: 'r',
          color: '#7e22ce',
          detail: '**Barock**: Balthasar Neumann baute sie; im Treppenhaus malte Tiepolo das größte Deckenfresko der Welt.',
        },
        {
          lon: 13.0384,
          lat: 52.4042,
          label: 'Schloss Sanssouci',
          kind: 'site',
          pos: 'l',
          color: '#db2777',
          detail: '**Rokoko**: Sommerschloss Friedrichs des Großen, 1745–1747 erbaut.',
        },
      ],
      places: [
        {
          name: 'Florenz',
          pos: 'r',
          color: '#15803d',
          detail: '**Renaissance**: Hier begann um 1400 die „Wiedergeburt“ der Antike — Brunelleschi, Donatello, Botticelli, Leonardo und Michelangelo arbeiteten in Florenz.',
        },
        {
          name: 'Brandenburger Tor',
          label: 'Brandenburger Tor',
          pos: 'r',
          color: '#0f766e',
          detail: '**Klassizismus**: 1788–1791 nach dem Vorbild der Propyläen der Athener Akropolis erbaut.',
        },
        {
          name: 'Dresden',
          pos: 'r',
          color: '#92400e',
          detail: '**Romantik und Expressionismus**: Caspar David Friedrich lebte und arbeitete in Dresden; 1905 wurde hier die Künstlergruppe *Die Brücke* gegründet.',
        },
        {
          name: 'Paris',
          pos: 'r',
          color: '#a16207',
          detail: '**Impressionismus**: 1874 fand hier die erste Ausstellung der Impressionisten statt.',
        },
        { name: 'Zürich', pos: 'b', color: '#475569', detail: '**Dada**: 1916 im Cabaret Voltaire gegründet.' },
        {
          name: 'München',
          pos: 'l',
          color: '#0369a1',
          detail: '**Expressionismus**: 1911 entstand hier der *Blaue Reiter* um Kandinsky und Franz Marc.',
        },
        {
          name: 'Kassel',
          pos: 'r',
          color: '#be123c',
          detail: '**Gegenwartskunst**: Seit 1955 findet hier alle fünf Jahre die documenta statt.',
        },
      ],
      caption: 'Ein Ort pro Epoche — tippe auf die Marker. Die Farben unterscheiden die Epochen.',
    },
    {
      id: 'order-epochen', type: 'order', title: 'Epochen ordnen',
      prompt: 'Bringe die Epochen in die richtige Reihenfolge — die älteste zuerst.',
      items: ['Romanik', 'Gotik', 'Renaissance', 'Barock', 'Rokoko', 'Klassizismus', 'Impressionismus', 'Kubismus'],
    },
    {
      id: 'match-merkmale', type: 'match', title: 'Epoche ↔ Erkennungszeichen',
      pairs: [
        ['Romanik', 'Rundbögen, wuchtige Mauern'],
        ['Gotik', 'Spitzbögen, riesige Glasfenster'],
        ['Renaissance', 'Zentralperspektive, antike Ideale'],
        ['Barock', 'Prunk, Bewegung, Hell-Dunkel-Drama'],
        ['Impressionismus', 'Lichtstimmung, sichtbare Pinseltupfer'],
        ['Kubismus', 'Geometrische Zerlegung, mehrere Ansichten'],
        ['Surrealismus', 'Traumbilder, zerfließende Uhren'],
      ],
    },
    {
      id: 'fact-impression', type: 'callout', tone: 'fact', title: 'Ein Schimpfwort wird zum Namen',
      md: `Viele Epochennamen waren ursprünglich abfällig gemeint: **„Gotik“** hieß in der Renaissance so viel wie „barbarisch, wie die [Goten](wiki:Goten|Goths)“; **„Barock“** kommt vermutlich vom portugiesischen *barroco*, einer unregelmäßigen Perle; und **„Impressionisten“** nannte ein Kritiker 1874 spöttisch die Maler um [Monet](wiki:Claude Monet|Claude Monet), deren Bilder für ihn nur unfertige „Eindrücke“ waren.`,
    },
    {
      id: 'quiz-datieren', type: 'quiz', title: 'Bild datieren',
      question: 'Ein Gemälde zeigt ein Seerosenbecken im Morgenlicht, gemalt mit kurzen, sichtbaren Pinseltupfern, ohne klare Umrisse. Welche Epoche ist am wahrscheinlichsten?',
      options: [
        { text: 'Barock', correct: false, why: 'Barocke Bilder sind glatt gemalt und dramatisch beleuchtet.' },
        { text: 'Impressionismus', correct: true, why: 'Licht, Augenblick, sichtbare Pinselstriche — und Monets *Seerosen* sind das Paradebeispiel.' },
        { text: 'Kubismus', correct: false, why: 'Der Kubismus zerlegt Formen geometrisch; Lichtstimmungen interessieren ihn kaum.' },
        { text: 'Gotik', correct: false, why: 'Gotische Tafelbilder zeigen religiöse Szenen, oft auf Goldgrund.' },
      ],
    },
    {
      id: 'quiz-expressionismus', type: 'quiz', title: 'Expressionismus in Deutschland',
      question: 'Welche Aussagen über die deutschen Expressionisten stimmen?',
      options: [
        { text: '*Die Brücke* wurde 1905 in Dresden gegründet.', correct: true, why: 'Von [Kirchner](wiki:Ernst Ludwig Kirchner|Ernst Ludwig Kirchner), [Heckel](wiki:Erich Heckel|Erich Heckel) und [Schmidt-Rottluff](wiki:Karl Schmidt-Rottluff|Karl Schmidt-Rottluff).' },
        { text: '*Der Blaue Reiter* entstand 1911 in München um Kandinsky und Franz Marc.', correct: true, why: 'Genau — Kandinsky malte zu dieser Zeit einige der ersten abstrakten Bilder.' },
        { text: 'Die Nationalsozialisten feierten den Expressionismus als deutsche Nationalkunst.', correct: false, why: 'Im Gegenteil: Sie diffamierten ihn 1937 in der Ausstellung „[Entartete Kunst](wiki:Entartete Kunst|Degenerate art)“.' },
      ],
    },
    {
      id: 'recall-foto', type: 'recall', title: 'Warum so viele „Ismen“?',
      prompt: 'Warum entstanden ab dem 19. Jahrhundert so schnell hintereinander neue Kunstrichtungen? Nenne mindestens einen Grund.',
      answer: `Ein wichtiger Grund ist die **Fotografie** (ab etwa 1839): Sie konnte die Wirklichkeit genauer und billiger abbilden als jeder Maler. Die Malerei suchte deshalb neue Aufgaben — Licht und Augenblick (Impressionismus), inneres Erleben (Expressionismus), neue Sicht auf Form (Kubismus), das Unbewusste (Surrealismus). Dazu kamen Industrialisierung, Großstadt, Psychoanalyse und die Erschütterung durch den Ersten Weltkrieg, die neue Ausdrucksformen herausforderten, sowie ein Kunstmarkt, der Neues belohnte.`,
      hints: ['Welche Erfindung konnte plötzlich die Welt exakt abbilden?'],
      cards: ['fotografie'],
    },
  ],
  cards: [
    { id: 'romanik', front: 'Romanik: Zeitraum und Erkennungszeichen?', back: 'Ca. 1000–1250; Rundbögen, dicke Mauern, kleine Fenster (z. B. Speyerer Dom).' },
    { id: 'gotik', front: 'Gotik: Zeitraum und Erkennungszeichen?', back: 'Ca. 1140–1500; Spitzbögen, Strebewerk, große Glasfenster (z. B. Kölner Dom).' },
    { id: 'renaissance', front: 'Renaissance: Bedeutung, Zeitraum, Ausgangsort?', back: '„Wiedergeburt“ der Antike, ca. 1400–1600, ausgehend von Florenz.' },
    { id: 'renaissance-meister', front: 'Drei große Meister der italienischen Renaissance?', back: 'Leonardo da Vinci, Michelangelo, Raffael.' },
    { id: 'barock', front: 'Barock: Zeitraum und Merkmale?', back: 'Ca. 1600–1750; Prunk, Bewegung, Drama, Hell-Dunkel-Kontraste.' },
    { id: 'rokoko', front: 'Was ist Rokoko?', back: 'Verspielte Spätphase des Barock (ca. 1730–1770): Pastell, Muschelornament (Rocaille) — z. B. Sanssouci.' },
    { id: 'klassizismus', front: 'Klassizismus: Merkmale und deutsches Beispiel?', back: 'Antike Strenge, klare Linien, Säulen; Brandenburger Tor (1788–1791).' },
    { id: 'impressionismus-name', front: 'Woher hat der Impressionismus seinen Namen?', back: 'Von Monets Bild *Impression, soleil levant* (1872), gezeigt auf der ersten Ausstellung 1874 in Paris.' },
    { id: 'impressionisten', front: 'Drei Impressionisten?', back: 'Claude Monet, Auguste Renoir, Edgar Degas (in Deutschland: Max Liebermann).' },
    { id: 'bruecke', front: 'Die Brücke: wann, wo, wer?', back: '1905 in Dresden; Kirchner, Heckel, Schmidt-Rottluff.' },
    { id: 'blauer-reiter', front: 'Der Blaue Reiter: wann, wo, wer?', back: '1911 in München; Kandinsky, Franz Marc, Macke, Münter, Klee.' },
    { id: 'kubismus', front: 'Kubismus: wer und was?', back: 'Picasso und Braque, ab ca. 1907; Gegenstände in geometrische Flächen zerlegt, mehrere Ansichten zugleich.' },
    { id: 'dada', front: 'Wo und wann entstand Dada?', back: '1916 im Cabaret Voltaire in Zürich.' },
    { id: 'surrealismus', front: 'Surrealismus: Beginn und zwei Vertreter?', back: 'Manifest von André Breton 1924; Salvador Dalí, René Magritte.' },
    { id: 'pop-art', front: 'Pop Art: zwei Vertreter und Motive?', back: 'Andy Warhol, Roy Lichtenstein; Werbung, Comics, Konsumprodukte.' },
    { id: 'documenta', front: 'Was ist die documenta?', back: 'Wichtigste Ausstellung zeitgenössischer Kunst, seit 1955 alle fünf Jahre in Kassel.' },
    { id: 'entartet', front: 'Was war die Ausstellung „Entartete Kunst“?', back: '1937 in München: NS-Propagandaschau, die moderne Kunst (u. a. Expressionisten) diffamierte.' },
    { id: 'fotografie', front: 'Warum löste sich die Malerei im 19. Jh. vom exakten Abbilden?', back: 'Die Fotografie konnte das besser; die Malerei suchte neue Aufgaben (Licht, Gefühl, Form, Unbewusstes).' },
  ],
};
