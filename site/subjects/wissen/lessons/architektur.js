export default {
  id: 'architektur',
  title: 'Architektur',
  summary: 'Rundbogen oder Spitzbogen? Säule mit Schnecken oder mit Blättern? Mit ein paar Erkennungszeichen lassen sich Kirchen, Schlösser und Rathäuser in jeder deutschen Stadt datieren — vom Speyerer Dom über den Kölner Dom und das Brandenburger Tor bis zum Bauhaus und zur Elbphilharmonie.',
  minutes: 22,
  goals: [
    'Die großen Baustile an typischen Merkmalen erkennen',
    'Die drei antiken [[saeulenordnung|Säulenordnungen]] unterscheiden',
    'Bekannte deutsche Bauwerke ihrem Stil zuordnen',
    'Die Bedeutung des [[bauhaus|Bauhauses]] für die moderne Architektur erklären',
  ],
  blocks: [
    {
      id: 'antike', type: 'text', title: 'Das Erbe der Antike',
      md: `
Fast jede spätere Epoche greift auf die griechische und römische Baukunst zurück. Das wichtigste Vokabular sind die drei [[saeulenordnung|Säulenordnungen]], erkennbar am Kapitell:

- **dorisch** — schlicht, wie ein Kissen ([Parthenon](wiki:Parthenon|Parthenon) in Athen)
- **ionisch** — mit zwei Schnecken (Voluten)
- **korinthisch** — mit üppigen Akanthusblättern

Die Römer erfanden den **Beton** und perfektionierten **Bogen und Kuppel**: Die Kuppel des Pantheons in Rom (um 125 n. Chr.) war über 1300 Jahre lang die größte der Welt.`,
    },
    {
      id: 'mittelalter', type: 'text', title: 'Romanik und Gotik',
      md: `
Die [[romanik|Romanik]] (ca. 1000–1250) baut „Gottesburgen“: dicke Mauern, kleine Fenster, **Rundbögen**. Die Kaiserdome am Rhein — **Speyer** (geweiht 1061, UNESCO-Welterbe und größte erhaltene romanische Kirche der Welt), [Worms](wiki:Wormser Dom|Worms Cathedral) und [Mainz](wiki:Mainz|Mainz) — sind ihre Hauptwerke.[^wp-romanik]

Die [[gotik|Gotik]] (ca. 1140–1500) will das Gegenteil: Höhe und Licht. Drei Erfindungen machen das möglich: der [[spitzbogen|Spitzbogen]], das [Rippengewölbe](wiki:Kreuzrippengewölbe|Rib vault) und das außen liegende [[strebewerk|Strebewerk]]. Die Wände werden zu Glasfenstern.[^wp-gotik]

Der **[Kölner Dom](wiki:Kölner Dom|Cologne Cathedral)** ist das deutsche Paradebeispiel: Baubeginn **1248**, dann jahrhundertelang Stillstand (der Baukran auf dem Südturm blieb über 400 Jahre stehen und wurde zum Wahrzeichen der Stadt), vollendet erst **1880** nach den mittelalterlichen Plänen. Mit 157 Metern war er kurzzeitig das höchste Gebäude der Welt.[^wp-koelner-dom]`,
    },
    {
      id: 'neuzeit', type: 'text', title: 'Renaissance, Barock, Klassizismus',
      md: `
- **[[renaissance|Renaissance]]** (15./16. Jh.): Symmetrie, Proportion, antike Säulen und Kuppeln — Brunelleschis Domkuppel in [Florenz](wiki:Florenz|Florence), Michelangelos Kuppel des [Petersdoms](wiki:Petersdom|St. Peter's Basilica). In Deutschland z. B. das [Heidelberger Schloss](wiki:Heidelberger Schloss|Heidelberg Castle) ([Ottheinrichsbau](wiki:Ottheinrichsbau)) oder das [Augsburger Rathaus](wiki:Augsburger Rathaus|Augsburg Town Hall).
- **[[barock|Barock]]** (17./18. Jh.): Schwung, Pracht, Raumwirkung, Deckenfresken. Die **[Würzburger Residenz](wiki:Würzburger Residenz|Würzburg Residence)** ([Balthasar Neumann](wiki:Balthasar Neumann|Balthasar Neumann), mit [Tiepolos](wiki:Giovanni Battista Tiepolo|Giovanni Battista Tiepolo) riesigem Treppenhausfresko), der **[Dresdner Zwinger](wiki:Dresdner Zwinger|Zwinger (Dresden))** und die **[Frauenkirche](wiki:Frauenkirche (Dresden)|Frauenkirche, Dresden)** in [Dresden](wiki:Dresden|Dresden) (1726–1743). Die Frauenkirche wurde bei den [Luftangriffen](wiki:Luftangriffe auf Dresden|Bombing of Dresden) im Februar 1945 zerstört, blieb in der DDR als Trümmerhaufen und Mahnmal liegen und wurde nach der Wiedervereinigung mit Spenden aus aller Welt wieder aufgebaut — geweiht **2005**.[^wp-frauenkirche]
- **[[rokoko|Rokoko]]**: die [Wieskirche](wiki:Wieskirche|Wieskirche), [Schloss Sanssouci](wiki:Schloss Sanssouci|Sanssouci).
- **[[klassizismus|Klassizismus]]** (ca. 1770–1840): zurück zur antiken Strenge — das **[Brandenburger Tor](wiki:Brandenburger Tor|Brandenburg Gate)** (1788–1791) nach dem Vorbild der [Propyläen](wiki:Propyläen (Athen)|Propylaea (Acropolis of Athens)) der Athener [Akropolis](wiki:Akropolis (Athen)|Acropolis of Athens), [Karl Friedrich Schinkels](wiki:Karl Friedrich Schinkel|Karl Friedrich Schinkel) Bauten in [Berlin](wiki:Berlin|Berlin).[^wp-brandenburger-tor]`,
    },
    {
      id: 'modern', type: 'text', title: 'Vom Historismus zur Moderne',
      md: `
Im 19. Jahrhundert ahmt der [[historismus|Historismus]] alle früheren Stile nach: neugotische Rathäuser, neobarocke Opern — und das Märchenschloss **[Neuschwanstein](wiki:Schloss Neuschwanstein|Neuschwanstein Castle)** (ab 1869) von König [Ludwig II.](wiki:Ludwig II. (Bayern)|Ludwig II of Bavaria) Um 1900 antwortet der [[jugendstil|Jugendstil]] mit fließenden Pflanzenformen.

Dann kommt der radikale Bruch: **1919** gründet **[Walter Gropius](wiki:Walter Gropius|Walter Gropius)** in [Weimar](wiki:Weimar|Weimar) das [[bauhaus|Bauhaus]]. Kunst, Handwerk und Industrie sollen zusammenfinden; Häuser werden aus Glas, Stahl und Beton gebaut, mit Flachdach und ohne Ornament. 1925 zieht die Schule nach **[Dessau](wiki:Dessau|Dessau)**, 1932 nach [Berlin](wiki:Berlin|Berlin), 1933 wird sie unter dem Druck der Nationalsozialisten aufgelöst. Die emigrierten Lehrer machen den Bauhaus-Stil weltweit bekannt.[^wp-bauhaus] **[Ludwig Mies van der Rohe](wiki:Ludwig Mies van der Rohe|Ludwig Mies van der Rohe)** („Weniger ist mehr“) baute später die [Neue Nationalgalerie](wiki:Neue Nationalgalerie|Neue Nationalgalerie) in Berlin.

Neuere Wahrzeichen: die gläserne **[Reichstagskuppel](wiki:Reichstagskuppel|Reichstag building)** von [Norman Foster](wiki:Norman Foster|Norman Foster) (1999) und die **[Elbphilharmonie](wiki:Elbphilharmonie|Elbphilharmonie)** in [Hamburg](wiki:Hamburg|Hamburg) ([Herzog & de Meuron](wiki:Herzog & de Meuron|Herzog & de Meuron), eröffnet **2017**) — ursprünglich mit 77 Millionen Euro Kosten für die Stadt geplant, am Ende rund 866 Millionen.[^wp-elbphilharmonie]`,
    },
    {
      id: 'map-bauwerke',
      type: 'map',
      title: 'Baustile auf der Deutschlandkarte',
      view: 'de',
      layers: { cities: false },
      points: [
        {
          lon: 8.4425,
          lat: 49.3172,
          label: 'Speyerer Dom',
          kind: 'site',
          pos: 'b',
          color: '#b91c1c',
          detail: '**Romanik**: größte erhaltene romanische Kirche der Welt, geweiht 1061, UNESCO-Welterbe.',
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
          lon: 8.716,
          lat: 49.41,
          label: 'Heidelberger Schloss',
          kind: 'site',
          pos: 'r',
          color: '#15803d',
          detail: '**Renaissance**: berühmt ist der Ottheinrichsbau mit seiner Renaissance-Fassade.',
        },
        {
          lon: 9.9386,
          lat: 49.7928,
          label: 'Würzburger Residenz',
          kind: 'site',
          pos: 'r',
          color: '#7e22ce',
          detail: '**Barock**: von Balthasar Neumann, mit Tiepolos Deckenfresko im Treppenhaus.',
        },
        {
          lon: 13.7416,
          lat: 51.0519,
          label: 'Frauenkirche Dresden',
          kind: 'site',
          pos: 'r',
          color: '#7e22ce',
          detail: '**Barock**: 1945 zerstört, nach der Wiedervereinigung wieder aufgebaut und 2005 geweiht.',
        },
        {
          lon: 10.9004,
          lat: 47.6806,
          label: 'Wieskirche',
          kind: 'site',
          pos: 't',
          color: '#db2777',
          detail: '**Rokoko**: berühmte Wallfahrtskirche im Alpenvorland.',
        },
        {
          lon: 13.0384,
          lat: 52.4042,
          label: 'Schloss Sanssouci',
          kind: 'site',
          pos: 'l',
          color: '#db2777',
          detail: '**Rokoko**: Sommerschloss Friedrichs des Großen in Potsdam.',
        },
        {
          lon: 13.3777,
          lat: 52.5163,
          label: 'Brandenburger Tor',
          kind: 'site',
          pos: 'r',
          color: '#0f766e',
          detail: '**Klassizismus**: 1788–1791 nach dem Vorbild der Propyläen der Athener Akropolis.',
        },
        {
          lon: 10.75,
          lat: 47.558,
          label: 'Schloss Neuschwanstein',
          kind: 'site',
          pos: 'b',
          color: '#c2410c',
          detail: '**Historismus**: Märchenschloss König Ludwigs II., Baubeginn 1869.',
        },
        {
          lon: 12.2274,
          lat: 51.8394,
          label: 'Bauhaus Dessau',
          kind: 'site',
          pos: 'r',
          color: '#374151',
          detail: '**Moderne**: 1925/26 von Walter Gropius gebaut — das Schulgebäude des Bauhauses.',
        },
        {
          lon: 9.9842,
          lat: 53.5414,
          label: 'Elbphilharmonie',
          kind: 'site',
          pos: 'l',
          color: '#374151',
          detail: '**Moderne**: von Herzog & de Meuron, eröffnet 2017 in Hamburg.',
        },
      ],
      caption: 'Die Farben stehen für die Stile: Romanik rot, Gotik blau, Renaissance grün, Barock violett, Rokoko rosa, Klassizismus türkis, Historismus orange, Moderne grau.',
    },
    {
      id: 'match-bauwerke', type: 'match', title: 'Bauwerk ↔ Stil',
      pairs: [
        ['Speyerer Dom', 'Romanik'],
        ['Kölner Dom', 'Gotik'],
        ['Würzburger Residenz', 'Barock'],
        ['Wieskirche', 'Rokoko'],
        ['Brandenburger Tor', 'Klassizismus'],
        ['Schloss Neuschwanstein', 'Historismus'],
        ['Bauhausgebäude Dessau', 'Klassische Moderne'],
      ],
    },
    {
      id: 'order-stile', type: 'order', title: 'Baustile ordnen',
      prompt: 'Bringe die Baustile in die zeitliche Reihenfolge.',
      items: ['Romanik', 'Gotik', 'Renaissance', 'Barock', 'Klassizismus', 'Historismus', 'Jugendstil', 'Bauhaus'],
    },
    {
      id: 'quiz-saeulen', type: 'quiz', title: 'Säulen erkennen',
      question: 'Ein Säulenkopf trägt zwei seitliche Schnecken. Welche Ordnung ist das?',
      options: [
        { text: 'dorisch', correct: false, why: 'Dorische Kapitelle sind schlicht und kissenförmig.' },
        { text: 'ionisch', correct: true, why: 'Die Schnecken (Voluten) sind das Kennzeichen der ionischen Ordnung.' },
        { text: 'korinthisch', correct: false, why: 'Korinthische Kapitelle sind mit Akanthusblättern geschmückt.' },
      ],
    },
    {
      id: 'quiz-gotik', type: 'quiz', title: 'Kirche datieren',
      question: 'Du betrittst eine Kirche: sehr hoch, Spitzbögen, riesige bunte Fenster, außen ein Gerüst aus Strebebögen. Welche Aussagen stimmen?',
      options: [
        { text: 'Die Kirche ist sehr wahrscheinlich gotisch.', correct: true, why: 'Spitzbogen + Strebewerk + große Fenster = Gotik.' },
        { text: 'Sie könnte auch neugotisch aus dem 19. Jahrhundert sein.', correct: true, why: 'Der Historismus hat die Gotik nachgebaut — dann hilft nur ein Blick auf das Baudatum.' },
        { text: 'Die Strebebögen dienen nur als Schmuck.', correct: false, why: 'Sie tragen den Seitenschub der Gewölbe — ohne sie würden die dünnen Wände nach außen kippen.' },
      ],
    },
    {
      id: 'map-bauwerke-quiz',
      type: 'map',
      title: 'Wo steht das Bauwerk?',
      view: 'de',
      layers: { cities: false },
      quiz: { rounds: 7 },
      points: [
        { lon: 8.4425, lat: 49.3172, label: 'Speyerer Dom', kind: 'site', pos: 'b', color: '#be123c' },
        { lon: 6.9582, lat: 50.9413, label: 'Kölner Dom', kind: 'site', pos: 'l', color: '#be123c' },
        { lon: 13.7416, lat: 51.0519, label: 'Frauenkirche Dresden', kind: 'site', pos: 'r', color: '#be123c' },
        { lon: 13.3777, lat: 52.5163, label: 'Brandenburger Tor', kind: 'site', pos: 'r', color: '#be123c' },
        { lon: 10.75, lat: 47.558, label: 'Schloss Neuschwanstein', kind: 'site', pos: 'b', color: '#be123c' },
        { lon: 12.2274, lat: 51.8394, label: 'Bauhaus Dessau', kind: 'site', pos: 'r', color: '#be123c' },
        { lon: 9.9842, lat: 53.5414, label: 'Elbphilharmonie', kind: 'site', pos: 'l', color: '#be123c' },
      ],
    },
    {
      id: 'fact-kran', type: 'callout', tone: 'fact', title: 'Der Kran auf dem Dom',
      md: `Als der Bau des [Kölner Doms](wiki:Kölner Dom|Cologne Cathedral) um 1530 eingestellt wurde, blieb ein hölzerner Baukran auf dem unfertigen Südturm stehen — über 400 Jahre lang. Er war auf fast allen Stadtansichten zu sehen. Erst 1868, während der Vollendung des Doms im 19. Jahrhundert, wurde er abgebaut.`,
    },
    {
      id: 'dom-dauer', type: 'numeric', title: 'Eine lange Baustelle',
      question: 'Der Kölner Dom wurde 1248 begonnen und 1880 vollendet. Wie viele Jahre dauerte es vom Baubeginn bis zur Vollendung?',
      answer: 632, tolerance: 0, unit: 'Jahre',
      explain: '632 Jahre — allerdings mit einem Baustopp von rund 300 Jahren dazwischen (ca. 1530 bis 1842).',
    },
    {
      id: 'recall-bauhaus', type: 'recall', title: 'Was war das Bauhaus?',
      prompt: 'Erkläre in 2–4 Sätzen, was das **Bauhaus** war und warum es bis heute so einflussreich ist.',
      answer: `Das Bauhaus war eine **Kunst-, Design- und Architekturschule**, 1919 von Walter Gropius in **Weimar** gegründet, ab 1925 in **Dessau**, 1932 in Berlin und 1933 unter NS-Druck geschlossen. Es wollte Kunst, Handwerk und industrielle Produktion verbinden: klare, funktionale, schmucklose Formen, neue Materialien (Stahl, Glas, Beton), bezahlbare Gebrauchsgegenstände. Weil viele Lehrer und Schüler (Gropius, Mies van der Rohe, [Kandinsky](wiki:Wassily Kandinsky|Wassily Kandinsky), Klee) emigrierten, verbreitete sich der Stil weltweit — vom Stahlrohrstuhl bis zum Hochhaus prägt er die Moderne.`,
      hints: ['Drei Städte, ein Gründer.', 'Warum wurde es weltweit bekannt?'],
      cards: ['bauhaus'],
    },
  ],
  cards: [
    { id: 'saeulen', front: 'Die drei antiken Säulenordnungen und ihre Kennzeichen?', back: 'Dorisch (schlicht), ionisch (Schnecken/Voluten), korinthisch (Akanthusblätter).' },
    { id: 'pantheon', front: 'Welcher römische Bau hatte über 1300 Jahre die größte Kuppel der Welt?', back: 'Das Pantheon in Rom (um 125 n. Chr.).' },
    { id: 'rund-spitz', front: 'Faustregel Rundbogen / Spitzbogen?', back: 'Rundbogen → Romanik; Spitzbogen → Gotik.' },
    { id: 'speyer', front: 'Größte erhaltene romanische Kirche der Welt?', back: 'Der Speyerer Dom (geweiht 1061, UNESCO-Welterbe).' },
    { id: 'gotik-technik', front: 'Drei bautechnische Erfindungen der Gotik?', back: 'Spitzbogen, Rippengewölbe, Strebewerk.' },
    { id: 'koelner-dom', front: 'Kölner Dom: Baubeginn und Vollendung?', back: '1248 und 1880.' },
    { id: 'frauenkirche', front: 'Dresdner Frauenkirche: Bau, Zerstörung, Wiederweihe?', back: 'Erbaut 1726–1743, zerstört Februar 1945, wieder geweiht 2005.' },
    { id: 'wuerzburg', front: 'Barockschloss von Balthasar Neumann mit Tiepolo-Fresko?', back: 'Die Würzburger Residenz.' },
    { id: 'brandenburger-tor', front: 'Brandenburger Tor: Bauzeit, Architekt, Stil?', back: '1788–1791, Carl Gotthard Langhans, Klassizismus.' },
    { id: 'historismus', front: 'Was ist Historismus? Beispiel?', back: 'Nachahmung älterer Stile im 19. Jh. (Neugotik, Neobarock); Schloss Neuschwanstein (ab 1869).' },
    { id: 'bauhaus', front: 'Bauhaus: Gründer, Jahr, Stationen?', back: 'Walter Gropius, 1919; Weimar → Dessau (1925) → Berlin (1932) → geschlossen 1933.' },
    { id: 'mies', front: '„Weniger ist mehr“ — wer?', back: 'Ludwig Mies van der Rohe (letzter Bauhaus-Direktor; Neue Nationalgalerie Berlin).' },
    { id: 'reichstag', front: 'Wer entwarf die gläserne Reichstagskuppel?', back: 'Norman Foster (1999).' },
    { id: 'elphi', front: 'Elbphilharmonie: Architekten und Eröffnung?', back: 'Herzog & de Meuron; eröffnet 2017.' },
    { id: 'jugendstil', front: 'Jugendstil: Zeit, Merkmal, deutsches Zentrum?', back: 'Um 1900; geschwungene Pflanzenlinien; Darmstädter Mathildenhöhe (und München).' },
    { id: 'dom-kran', front: 'Was war das Wahrzeichen Kölns während des Baustopps am Dom?', back: 'Der mittelalterliche Baukran auf dem Südturm (über 400 Jahre, abgebaut 1868).' },
  ],
};
