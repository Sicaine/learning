export default {
  id: 'entdeckungen',
  title: 'Entdeckungen, Kolonialismus & Imperien',
  summary: 'Ab dem 15. Jahrhundert fuhren Europäer über die Ozeane — und unterwarfen große Teile der Welt. Eine Geschichte von Neugier, Gier und Gewalt, deren Folgen bis heute nachwirken.',
  minutes: 22,
  goals: [
    'Die großen Entdeckungsfahrten mit Namen und Jahreszahlen nennen',
    'Die [[conquista|Conquista]] und den [[atlantischer-sklavenhandel|atlantischen Sklavenhandel]] in ihren Folgen beschreiben',
    '[[kolonialismus|Kolonialismus]] und [[imperialismus|Imperialismus]] unterscheiden und datieren',
    'Die deutsche Kolonialgeschichte und den Völkermord an Herero und Nama einordnen',
  ],
  blocks: [
    {
      id: 'warum', type: 'text', title: 'Warum aufs offene Meer?',
      md: `
Gewürze wie Pfeffer und Zimt waren in Europa extrem wertvoll. Doch die Landwege nach Asien kontrollierten Zwischenhändler — und nach **1453** das [[osmanisches-reich|Osmanische Reich]]. Portugal und Spanien suchten deshalb einen **Seeweg nach Indien**.

Möglich wurde das durch neue Technik: die wendige **[Karavelle](wiki:Karavelle|Caravel)**, [Kompass](wiki:Kompass|Compass) und [Astrolabium](wiki:Astrolabium|Astrolabe) sowie bessere Karten. Der portugiesische Prinz **[Heinrich der Seefahrer](wiki:Heinrich der Seefahrer|Prince Henry the Navigator)** förderte systematisch Fahrten entlang der afrikanischen Küste.[^wp-entdeckungsfahrten]`,
    },
    {
      id: 'fahrten', type: 'text', title: 'Die großen Fahrten',
      md: `
- **1488** umrundet **[Bartolomeu Dias](wiki:Bartolomeu Dias|Bartolomeu Dias)** das [Kap der Guten Hoffnung](wiki:Kap der Guten Hoffnung|Cape of Good Hope) an der Südspitze Afrikas.
- **1492** erreicht **[Christoph Kolumbus](wiki:Christoph Kolumbus|Christopher Columbus)** (ein Genuese in spanischen Diensten) am 12. Oktober eine Insel der [Bahamas](wiki:Bahamas|The Bahamas). Er glaubt bis zu seinem Tod, in Asien gewesen zu sein — daher „Indianer“ und „Westindische Inseln“.
- **1494** teilen Spanien und Portugal im **[Vertrag von Tordesillas](wiki:Vertrag von Tordesillas|Treaty of Tordesillas)** die „neue Welt“ unter sich auf. Deshalb spricht man in [Brasilien](wiki:Brasilien|Brazil) heute Portugiesisch.
- **1498** erreicht **[Vasco da Gama](wiki:Vasco da Gama|Vasco da Gama)** Indien — der Seeweg ist gefunden.
- **1519–1522** gelingt die erste **[Weltumsegelung](wiki:Weltumsegelung|List of circumnavigations)**. **[Magellan](wiki:Ferdinand Magellan|Ferdinand Magellan)** stirbt unterwegs auf den [Philippinen](wiki:Philippinen|Philippines); **[Elcano](wiki:Juan Sebastián Elcano|Juan Sebastián Elcano)** bringt das letzte Schiff zurück.

Übrigens: Den Namen „Amerika“ erhielt der Kontinent nach **[Amerigo Vespucci](wiki:Amerigo Vespucci|Amerigo Vespucci)**, der erkannte, dass es sich um einen neuen Kontinent handelt. Die Weltkarte des deutschen Kartografen **[Martin Waldseemüller](wiki:Martin Waldseemüller|Martin Waldseemüller)** von 1507 verwendete den Namen zum ersten Mal.`,
    },
    {
      id: 'map-fahrten-atlantik', type: 'map', title: 'Dias, Kolumbus und Vasco da Gama',
      view: [-100, -45, 100, 50],
      layers: { cities: false, countryLabels: false, mountains: false },
      places: [
        { name: 'Lissabon', pos: 't', detail: `**[Lissabon](wiki:Lissabon|Lisbon)** — Ausgangspunkt der portugiesischen Entdeckungsfahrten.` },
        { name: 'Kap der Guten Hoffnung', num: 1, pos: 'b', detail: `**[Kap der Guten Hoffnung](wiki:Kap der Guten Hoffnung|Cape of Good Hope)** — 1488 von [Bartolomeu Dias](wiki:Bartolomeu Dias|Bartolomeu Dias) umrundet; das Ende der Landverbindung Afrikas war erreicht.` },
        { name: 'San Salvador', num: 2, pos: 'b', detail: `**[San Salvador](wiki:San Salvador (Bahamas)|San Salvador Island)** — am 12. Oktober 1492 betrat [Christoph Kolumbus](wiki:Christoph Kolumbus|Christopher Columbus) hier amerikanischen Boden, glaubte aber, Asien erreicht zu haben.` },
      ],
      points: [
        { lon: -6.883, lat: 37.217, label: 'Palos', pos: 'b', detail: `**[Palos de la Frontera](wiki:Palos de la Frontera|Palos de la Frontera)** — von hier lief Kolumbus am 3. August 1492 mit drei Schiffen aus.` },
        { lon: 75.783, lat: 11.25, label: 'Kalikut', num: 3, pos: 't', detail: `**[Kalikut](wiki:Kozhikode|Kozhikode)** — 1498 erreichte [Vasco da Gama](wiki:Vasco da Gama|Vasco da Gama) hier Indien: Der Seeweg um Afrika war gefunden.` },
      ],
      lines: [
        { label: 'Dias 1488', color: '#475569', arrow: true, labelAt: 0.5, coords: [[-9.167, 38.717], [-16, 27], [-20, 15], [-16, 6], [-4, 2], [6, -5], [8, -16], [11, -28], [18.472, -34.358]] },
        { label: 'Kolumbus 1492', color: '#b91c1c', arrow: true, labelAt: 0.5, coords: [[-6.883, 37.217], [-17, 28.5], [-45, 25], [-74.489, 24.036]] },
        { label: 'Vasco da Gama 1498', color: '#047857', arrow: true, labelAt: 0.75, coords: [[-9.167, 38.717], [-14, 27], [-18, 15], [-14, 6], [-2, 3.5], [8, -3], [10, -15], [13, -27], [18.472, -34.358], [25, -37], [36, -28], [43, -17], [42, -8], [42, -3], [58, 5], [75.783, 11.25]] },
      ],
      caption: '1 Dias (1488) · 2 Kolumbus (1492) · 3 Vasco da Gama (1498). Die Routen sind schematisch.',
    },
    {
      id: 'map-weltumsegelung', type: 'map', title: 'Die erste Weltumsegelung 1519–1522',
      view: 'world',
      layers: { cities: false, countryLabels: false, mountains: false, seaLabels: false },
      points: [
        { lon: -5.992, lat: 37.393, label: 'Sevilla (Start 1519, Ziel 1522)', num: 1, pos: 'r', detail: `**[Sevilla](wiki:Sevilla|Seville)** — von hier (genauer: vom Hafen [Sanlúcar de Barrameda](wiki:Sanlúcar de Barrameda|Sanlúcar de Barrameda)) brachen fünf Schiffe unter [Magellan](wiki:Ferdinand Magellan|Ferdinand Magellan) auf; nur eines kehrte zurück.` },
        { lon: -30, lat: 15, label: 'Atlantik', kind: 'land' },
        { lon: -140, lat: 5, label: 'Pazifik', kind: 'land' },
        { lon: 80, lat: -22, label: 'Indischer Ozean', kind: 'land' },
        { lon: -70.916, lat: -53.154, label: 'Magellanstraße', num: 2, pos: 't', detail: `**[Magellanstraße](wiki:Magellanstraße|Strait of Magellan)** — 1520 fand die Flotte die Durchfahrt zwischen Atlantik und Pazifik an der Südspitze Südamerikas (Punta Arenas liegt an ihrer Küste).` },
        { lon: 123.899, lat: 10.303, label: 'Philippinen (Cebu)', num: 3, pos: 'l', detail: `**[Cebu](wiki:Cebu City|Cebu City)** — 1521 starb Magellan auf den [Philippinen](wiki:Philippinen|Philippines) im Kampf; [Juan Sebastián Elcano](wiki:Juan Sebastián Elcano|Juan Sebastián Elcano) übernahm das Kommando.` },
        { lon: 127.4, lat: 0.683, label: 'Gewürzinseln (Tidore)', num: 4, pos: 'b', detail: `**[Tidore](wiki:Tidore|Tidore Island)** — auf den Molukken luden die Schiffe Gewürze, das eigentliche Ziel der Reise.` },
        { lon: 18.472, lat: -34.358, label: 'Kap der Guten Hoffnung', pos: 'l', detail: `**[Kap der Guten Hoffnung](wiki:Kap der Guten Hoffnung|Cape of Good Hope)** — die „Victoria“ umrundete es im Mai 1522 auf der Heimfahrt.` },
      ],
      lines: [
        { label: 'Magellan und Elcano (schematisch)', color: '#1d4ed8', arrow: false, labelAt: 0.2, coords: [[-5.992, 37.393], [-12, 33], [-20, 15], [-33, -5], [-43.196, -22.908], [-52, -38], [-62, -47], [-70.916, -53.154], [-85, -47], [-110, -35], [-140, -15], [-179.5, -5]],
          detail: `Von Spanien über den Atlantik und durch die Magellanstraße in den Pazifik.` },
        { color: '#1d4ed8', arrow: true, coords: [[179.5, -3], [150, 8], [144.8, 13.4], [123.899, 10.303], [127.4, 0.683], [115, -9], [95, -15], [60, -30], [18.472, -34.358], [-5, -15], [-15, 10], [-12, 33], [-5.992, 37.393]],
          detail: `Weiter über die Philippinen, die Gewürzinseln und den Indischen Ozean um Afrika zurück nach Spanien — nach rund 3 Jahren kehrte nur die „Victoria“ mit 18 Männern zurück.` },
      ],
      caption: 'Der Verlauf ist schematisch, die Pazifikquerung ist wegen der Kartenränder in zwei Teile geteilt. Etwa 270 Männer waren aufgebrochen; 18 kamen zurück.',
    },
    {
      id: 'tl-game', type: 'game', viz: 'timeline', title: 'Wer war zuerst?',
      params: { mode: 'sort', events: [
        { year: 1488, label: 'Dias am Kap' },
        { year: 1492, label: 'Kolumbus in Amerika' },
        { year: 1494, label: 'Vertrag von Tordesillas' },
        { year: 1498, label: 'Da Gama in Indien' },
        { year: 1521, label: 'Tenochtitlan fällt' },
        { year: 1522, label: 'Erste Weltumsegelung' },
        { year: 1602, label: 'Niederl. VOC gegründet' },
        { year: 1884, label: 'Berliner Kongokonferenz' },
      ] },
    },
    {
      id: 'conquista', type: 'text', title: 'Conquista und Sklavenhandel',
      md: `
Den Entdeckern folgten die Eroberer. **[Hernán Cortés](wiki:Hernán Cortés|Hernán Cortés)** zerstörte 1519–1521 das Reich der **[Azteken](wiki:Azteken|Aztecs)** mit seiner Hauptstadt [Tenochtitlan](wiki:Tenochtitlán|Tenochtitlan) (heute [Mexiko-Stadt](wiki:Mexiko-Stadt|Mexico City)). **[Francisco Pizarro](wiki:Francisco Pizarro|Francisco Pizarro)** unterwarf 1532/33 das Reich der **[Inka](wiki:Inka)** in Peru. Mit wenigen hundert Soldaten gelang das auch, weil verfeindete indigene Völker mit den Spaniern kämpften — und weil eingeschleppte Krankheiten wie die **[Pocken](wiki:Pocken|Smallpox)** einen Großteil der Bevölkerung töteten. Die [[conquista|Conquista]] brachte gewaltige Mengen Silber und Gold nach Europa.

Für die Plantagen in Amerika wurden Arbeitskräfte gebraucht. Im **[[atlantischer-sklavenhandel|atlantischen Sklavenhandel]]** verschleppten Europäer vom 16. bis ins 19. Jahrhundert rund **12,5 Millionen** Afrikanerinnen und Afrikaner über den Atlantik; fast zwei Millionen starben schon auf der Überfahrt.[^slavevoyages] Man spricht vom **[Dreieckshandel](wiki:Atlantischer Dreieckshandel|Triangular trade)**: Waren nach Afrika, Menschen nach Amerika, Zucker, Baumwolle und Tabak nach Europa.`,
    },
    {
      id: 'map-conquista', type: 'map', title: 'Silber, Zucker und Menschen: der Atlantik als Handelsraum',
      view: [-100, -45, 100, 62],
      layers: { cities: false, countryLabels: false, mountains: false },
      places: [
        { name: 'Sevilla', pos: 'b', detail: `**[Sevilla](wiki:Sevilla|Seville)** — Spaniens Hafen für den Handel mit Amerika; hierher kamen Silber und Gold.` },
        { name: 'Lissabon', pos: 'l', detail: `**[Lissabon](wiki:Lissabon|Lisbon)** — Portugals Hafen für den Handel mit Brasilien und Afrika.` },
        { name: 'Mexiko-Stadt', pos: 'r', detail: `**[Mexiko-Stadt](wiki:Mexiko-Stadt|Mexico City)** — gebaut auf den Trümmern der Aztekenhauptstadt [Tenochtitlán](wiki:Tenochtitlán|Tenochtitlan), 1521 von [Cortés](wiki:Hernán Cortés|Hernán Cortés) erobert.` },
        { name: 'Cusco', pos: 'l', detail: `**[Cusco](wiki:Cusco|Cusco)** — Hauptstadt des Inka-Reichs; [Pizarro](wiki:Francisco Pizarro|Francisco Pizarro) nahm sie 1533 ein.` },
        { name: 'Havanna', pos: 'l', detail: `**[Havanna](wiki:Havanna|Havana)** — Sammelhafen der spanischen Silberflotte.` },
      ],
      points: [
        { lon: -65.754, lat: -19.589, label: 'Potosí', kind: 'site', pos: 'r', detail: `**[Potosí](wiki:Potosí|Potosí)** — der „Silberberg“ (Cerro Rico) in den Anden lieferte jahrhundertelang einen Großteil des Silbers der Welt; Zwangsarbeit kostete viele Menschen das Leben.` },
        { lon: -1.35, lat: 5.083, label: 'Elmina', kind: 'site', pos: 'r', detail: `**[Elmina](wiki:Elmina|Elmina)** — Handelsfestung an der Küste des heutigen Ghana, von den Portugiesen 1482 gegründet; später ein Umschlagplatz des Sklavenhandels.` },
        { lon: -38.517, lat: -12.983, label: 'Salvador', pos: 'l', detail: `**[Salvador da Bahia](wiki:Salvador (Bahia)|Salvador, Bahia)** — einer der größten Sklavenmärkte Amerikas, Zentrum der brasilianischen Zuckerwirtschaft.` },
      ],
      lines: [
        { label: 'Waren nach Afrika', color: '#475569', arrow: true, labelAt: 0.5, coords: [[-9.167, 38.717], [-18, 22], [-12, 8], [-1.35, 5.083]] },
        { label: 'Versklavte nach Amerika', color: '#b91c1c', arrow: true, labelAt: 0.5, coords: [[-1.35, 5.083], [-38.517, -12.983]],
          detail: `Die „Mittelpassage“ des Dreieckshandels: Rund 12,5 Millionen Menschen wurden über den Atlantik verschleppt.` },
        { label: 'Zucker, Tabak, Baumwolle nach Europa', color: '#047857', arrow: true, labelAt: 0.4, coords: [[-38.517, -12.983], [-28, 15], [-9.167, 38.717]] },
        { label: 'Silberflotte', color: '#b45309', arrow: true, dashed: true, labelAt: 0.6, coords: [[-82.386, 23.123], [-30, 38], [-5.992, 37.393]] },
      ],
      caption: 'Der Dreieckshandel verband Europa, Afrika und Amerika — die Linien sind schematisch.',
    },
    {
      id: 'warn-sprache', type: 'callout', tone: 'warning', title: '„Entdeckung“ — aus wessen Sicht?',
      md: `Amerika, Afrika und Asien waren längst bewohnt, als Europäer ankamen. Der Begriff „Entdeckung“ beschreibt die europäische Perspektive. Heute spricht man daher oft auch von „Kontakt“ oder „Eroberung“ — je nachdem, was gemeint ist.`,
    },
    {
      id: 'imperialismus', type: 'text', title: 'Das Zeitalter des Imperialismus',
      md: `
Nach Spanien und Portugal wurden **die Niederlande** ([Ostindien-Kompanie](wiki:Niederländische Ostindien-Kompanie|Dutch East India Company) *VOC*, 1602), **England** (*[East India Company](wiki:British East India Company|East India Company)*, 1600) und **Frankreich** zu Kolonialmächten. Im 19. Jahrhundert folgte der **[[imperialismus|Imperialismus]]**: ein Wettlauf der Großmächte um Kolonien, Rohstoffe und Prestige, begründet mit rassistischen Überlegenheitsideen.

Auf der **[Berliner Kongokonferenz](wiki:Kongokonferenz|Berlin Conference) 1884/85** unter [Bismarcks](wiki:Otto von Bismarck|Otto von Bismarck) Vorsitz legten europäische Staaten Regeln für die Aufteilung Afrikas fest — ohne dass ein einziger Afrikaner beteiligt war. Um 1914 waren fast ganz Afrika und große Teile Asiens kolonisiert; das **[Britische Empire](wiki:Britisches Weltreich|British Empire)** umfasste um 1920 rund ein Viertel der Landfläche der Erde („das Reich, in dem die Sonne nie untergeht“).`,
    },
    {
      id: 'deutsch', type: 'callout', tone: 'history', title: 'Deutsche Kolonien 1884–1919',
      md: `Das Deutsche Reich erwarb ab 1884 Kolonien: **[Deutsch-Südwestafrika](wiki:Deutsch-Südwestafrika|German South West Africa)** (heute [Namibia](wiki:Namibia|Namibia)), **[Deutsch-Ostafrika](wiki:Deutsch-Ostafrika|German East Africa)** (Tansania, Ruanda, Burundi), **[Kamerun](wiki:Deutsch-Kamerun|Kamerun)**, **[Togo](wiki:Togoland|Togoland)**, Inseln im Pazifik und das Pachtgebiet **[Kiautschou](wiki:Kiautschou|Kiautschou Bay Leased Territory)** in China. In Südwestafrika verübten deutsche Truppen **1904–1908** einen **Völkermord an den [Herero und Nama](wiki:Völkermord an den Herero und Nama|Herero and Nama genocide)**; Zehntausende wurden getötet oder in die Wüste getrieben. Die Bundesregierung hat 2021 anerkannt, dass es sich aus heutiger Sicht um einen Völkermord handelte. Mit dem [Versailler Vertrag](wiki:Versailler Vertrag|Treaty of Versailles) 1919 verlor Deutschland alle Kolonien.[^wp-deutsche-kolonien]`,
    },
    {
      id: 'map-deutsche-kolonien', type: 'map', title: 'Deutsche Kolonien in Afrika',
      view: [-50, -38, 60, 38],
      proj: 'natural',
      layers: { cities: false },
      highlight: [
        { label: 'heutige Staaten mit früheren deutschen Kolonien', color: '#92400e', countries: ['Namibia', 'Tansania', 'Ruanda', 'Burundi', 'Kamerun', 'Togo'] },
      ],
      points: [
        { lon: 17.084, lat: -22.57, label: 'Windhuk', pos: 'r', detail: `**[Windhuk](wiki:Windhuk|Windhoek)** — Hauptstadt von Deutsch-Südwestafrika; hier und im ganzen Land verübten deutsche Truppen 1904–1908 den [Völkermord an den Herero und Nama](wiki:Völkermord an den Herero und Nama|Herero and Nama genocide).` },
        { lon: 39.28, lat: -6.816, label: 'Daressalam', pos: 'l', detail: `**[Daressalam](wiki:Daressalam|Dar es Salaam)** — Hauptstadt von Deutsch-Ostafrika; der Maji-Maji-Aufstand 1905–1907 wurde brutal niedergeschlagen.` },
      ],
      caption: 'Die Farben zeigen **heutige Staaten**, die ganz oder teilweise Kolonien des Deutschen Reichs waren (1884–1919). Nicht gezeigt: Inseln im Pazifik und das Pachtgebiet Kiautschou in China.',
    },
    {
      id: 'match-entdecker', type: 'match', title: 'Wer tat was?',
      pairs: [
        ['Bartolomeu Dias', 'Kap der Guten Hoffnung (1488)'],
        ['Christoph Kolumbus', 'Bahamas (1492)'],
        ['Vasco da Gama', 'Seeweg nach Indien (1498)'],
        ['Hernán Cortés', 'Eroberung der Azteken'],
        ['Francisco Pizarro', 'Eroberung der Inka'],
        ['Amerigo Vespucci', 'Namensgeber Amerikas'],
      ],
    },
    {
      id: 'map-quiz-entdeckungen', type: 'map', title: 'Finde die Schauplätze der Entdeckungen',
      view: [-100, -56, 100, 50],
      layers: { cities: false, countryLabels: false, mountains: false },
      quiz: { rounds: 7 },
      places: [{ name: 'Lissabon' }, { name: 'Kap der Guten Hoffnung' }, { name: 'San Salvador' }, { name: 'Mexiko-Stadt' }, { name: 'Cusco' }, { name: 'Havanna' }],
      points: [{ lon: 75.783, lat: 11.25, label: 'Kalikut', kind: 'place' }, { lon: -70.916, lat: -53.154, label: 'Magellanstraße', kind: 'place' }],
    },
    {
      id: 'quiz-tordesillas', type: 'quiz', title: 'Spuren bis heute',
      question: 'Warum spricht man in Brasilien Portugiesisch, im restlichen Südamerika meist Spanisch?',
      options: [
        { text: 'Wegen des Vertrags von Tordesillas (1494), der die Welt zwischen Spanien und Portugal aufteilte.', correct: true, why: 'Die Teilungslinie verlief so, dass der Osten Südamerikas an Portugal fiel.' },
        { text: 'Weil Kolumbus Portugiese war.', correct: false, why: 'Kolumbus stammte aus Genua und segelte für Spanien.' },
        { text: 'Weil Brasilien erst im 19. Jahrhundert kolonisiert wurde.', correct: false, why: 'Cabral landete bereits 1500 in Brasilien.' },
        { text: 'Weil Portugal Brasilien von Spanien kaufte.', correct: false, why: 'Es gab keinen solchen Kauf.' },
      ],
    },
    {
      id: 'num-sklaven', type: 'numeric', title: 'Eine Zahl, die man kennen sollte',
      question: 'Wie viele Millionen Menschen wurden im atlantischen Sklavenhandel ungefähr über den Atlantik verschleppt?',
      answer: 12.5, tolerance: 1.5, unit: 'Millionen',
      explain: 'Die Forschungsdatenbank *SlaveVoyages* schätzt rund **12,5 Millionen** Eingeschiffte; etwa 10,7 Millionen überlebten die Überfahrt.',
    },
    {
      id: 'recall-folgen', type: 'recall', title: 'Folgen bis heute',
      prompt: 'Nenne drei Folgen des Kolonialismus, die bis in die Gegenwart sichtbar sind.',
      answer: `Zum Beispiel: **Sprachen** (Spanisch, Portugiesisch, Englisch, Französisch als Amtssprachen in Amerika und Afrika), **Grenzen** (viele afrikanische Grenzen wurden am Reißbrett gezogen, ohne Rücksicht auf Völker), **wirtschaftliche Ungleichheit** (Rohstoffabhängigkeit, Ausbeutung), die afroamerikanische Bevölkerung Amerikas als Folge des Sklavenhandels, sowie aktuelle Debatten über **Rückgabe von Kulturgütern** (z. B. Benin-Bronzen) und Erinnerungskultur.`,
      cards: ['kongo', 'herero'],
    },
  ],
  cards: [
    { id: 'motiv', front: 'Hauptmotiv der Entdeckungsfahrten im 15. Jh.?', back: 'Ein Seeweg nach Indien/Asien für den Gewürzhandel, vorbei an Zwischenhändlern und dem Osmanischen Reich.' },
    { id: 'dias', front: 'Bartolomeu Dias — was und wann?', back: 'Umrundete 1488 als erster Europäer das Kap der Guten Hoffnung.' },
    { id: 'kolumbus', front: 'Wann erreichte Kolumbus Amerika — und für wen segelte er?', back: '12. Oktober 1492, im Auftrag der spanischen Krone.' },
    { id: 'tordesillas', front: 'Was regelte der Vertrag von Tordesillas (1494)?', back: 'Die Aufteilung der neu entdeckten Gebiete zwischen Spanien und Portugal.' },
    { id: 'gama', front: 'Vasco da Gama — was und wann?', back: 'Erreichte 1498 als erster Europäer auf dem Seeweg Indien.' },
    { id: 'magellan', front: 'Erste Weltumsegelung: wann und von wem?', back: '1519–1522; Expedition Magellans, vollendet von Elcano (Magellan starb unterwegs).' },
    { id: 'amerika-name', front: 'Nach wem ist Amerika benannt?', back: 'Nach Amerigo Vespucci (Karte von Martin Waldseemüller, 1507).' },
    { id: 'cortes-pizarro', front: 'Wer eroberte die Azteken, wer die Inka?', back: 'Cortés die Azteken (1519–1521), Pizarro die Inka (1532/33).' },
    { id: 'pocken', front: 'Warum konnten wenige Spanier große Reiche erobern?', back: 'Eingeschleppte Krankheiten (v. a. Pocken), Verbündete unter verfeindeten Völkern, Waffen und Pferde.' },
    { id: 'sklavenhandel', front: 'Atlantischer Sklavenhandel: Zeitraum und Zahl?', back: '16.–19. Jh.; rund 12,5 Mio. verschleppte Menschen.' },
    { id: 'dreieckshandel', front: 'Was war der Dreieckshandel?', back: 'Waren von Europa nach Afrika, versklavte Menschen nach Amerika, Plantagenprodukte (Zucker, Baumwolle, Tabak) nach Europa.' },
    { id: 'imperialismus', front: 'Hochphase des Imperialismus?', back: 'Etwa 1880–1914.' },
    { id: 'kongo', front: 'Was war die Berliner Kongokonferenz?', back: '1884/85 unter Bismarck: europäische Mächte legten Regeln für die Aufteilung Afrikas fest — ohne Afrikaner.' },
    { id: 'deutsche-kolonien', front: 'Nenne drei ehemalige deutsche Kolonien.', back: 'z. B. Deutsch-Südwestafrika (Namibia), Deutsch-Ostafrika (Tansania u. a.), Kamerun, Togo, Kiautschou.' },
    { id: 'herero', front: 'Was geschah 1904–1908 in Deutsch-Südwestafrika?', back: 'Völkermord deutscher Truppen an den Herero und Nama.' },
    { id: 'empire', front: 'Wie groß war das Britische Empire auf seinem Höhepunkt?', back: 'Rund ein Viertel der Landfläche der Erde (um 1920).' },
  ],
};
