export default {
  id: 'antike',
  title: 'Antike Hochkulturen',
  summary: 'Schrift, Pyramiden, Demokratie und ein Weltreich: Wie Mesopotamien, Ägypten, Griechenland und Rom die Grundlagen unserer Welt legten.',
  minutes: 22,
  goals: [
    'Die ersten [[hochkultur|Hochkulturen]] verorten und erklären, was sie auszeichnet',
    'Wichtige Stationen Griechenlands nennen: [[polis|Polis]], [[attische-demokratie|Demokratie]], Alexander, [[hellenismus|Hellenismus]]',
    'Die großen Etappen des [[roemisches-reich|Römischen Reichs]] mit Jahreszahlen einordnen',
    'Erklären, was wir heute noch der Antike verdanken',
  ],
  blocks: [
    {
      id: 'fluesse', type: 'text', title: 'Am Anfang war der Fluss',
      md: `
Die ersten **[[hochkultur|Hochkulturen]]** entstanden dort, wo große Flüsse fruchtbares Land schufen: zwischen **[Euphrat](wiki:Euphrat|Euphrates) und [Tigris](wiki:Tigris|Tigris)** ([Mesopotamien](wiki:Mesopotamien|Mesopotamia), „Zwischenstromland“, heute vor allem Irak), am **[Nil](wiki:Nil|Nile)**, am **[Indus](wiki:Indus|Indus River)** und am **[Gelben Fluss](wiki:Huang He|Yellow River)** in China. Bewässerung brauchte Organisation — und Organisation brauchte Aufzeichnungen.

So erfanden die **[Sumerer](wiki:Sumerer|Sumerians)** um 3300 v. Chr. in Städten wie [Uruk](wiki:Uruk|Uruk) die **[[keilschrift|Keilschrift]]**, zunächst für Buchhaltung: Wie viel Getreide hat wer abgeliefert? Später hielt man damit Gesetze fest — berühmt ist der **[Codex Hammurapi](wiki:Codex Hammurapi|Code of Hammurabi)** aus [Babylon](wiki:Babylon|Babylon) (um 1750 v. Chr.) mit dem Prinzip „Auge um Auge“ — und die erste große Dichtung, das **[Gilgamesch-Epos](wiki:Gilgamesch-Epos|Epic of Gilgamesh)**.[^wp-alter-orient]

In **Ägypten** wurden Ober- und Unterägypten um 3000 v. Chr. vereint. Die [Pharaonen](wiki:Pharao|Pharaoh) galten als göttlich; die **[Cheops-Pyramide](wiki:Cheops-Pyramide|Great Pyramid of Giza)** von [Gizeh](wiki:Nekropole von Gizeh|Giza Necropolis) (um 2600–2500 v. Chr.) war rund 3800 Jahre lang das höchste Bauwerk der Welt. Geschrieben wurde in **[Hieroglyphen](wiki:Ägyptische Hieroglyphen|Egyptian hieroglyphs)**, die erst 1822 mithilfe des *[Steins von Rosette](wiki:Stein von Rosette|Rosetta Stone)* entziffert wurden. Mit dem Tod **[Kleopatras VII.](wiki:Kleopatra VII.|Cleopatra)** 30 v. Chr. wurde Ägypten römisch.[^wp-altes-aegypten]`,
    },
    {
      id: 'map-hochkulturen', type: 'map', title: 'Flusskulturen der Alten Welt',
      view: [24, 16, 123, 46],
      layers: { cities: false, countryLabels: false },
      rivers: [
        { name: 'Nil', labelAt: 0.55 },
        { name: 'Euphrat', labelAt: 0.4 },
        { name: 'Tigris', labelAt: 0.75 },
        { name: 'Indus', labelAt: 0.55 },
        { name: 'Huang', label: 'Gelber Fluss', labelAt: 0.5 },
      ],
      places: [
        { name: 'Uruk', kind: 'site', pos: 'l', detail: `**[Uruk](wiki:Uruk|Uruk)** — eine der ersten Städte der Welt, im Süden Mesopotamiens; hier entstand um 3300 v. Chr. die Keilschrift.` },
        { name: 'Babylon', kind: 'site', pos: 't', detail: `**[Babylon](wiki:Babylon|Babylon)** — Hauptstadt des Königs Hammurapi (um 1750 v. Chr.), später Zentrum des Neubabylonischen Reichs.` },
        { name: 'Gizeh', kind: 'site', pos: 'l', detail: `**[Gizeh](wiki:Nekropole von Gizeh|Giza Necropolis)** — hier stehen die großen Pyramiden, darunter die Cheops-Pyramide, am Rand des Niltals bei Kairo.` },
      ],
      points: [
        { lon: 68.139, lat: 27.329, label: 'Mohenjo-Daro', kind: 'site', pos: 'b', detail: `**[Mohenjo-Daro](wiki:Mohenjo-Daro|Mohenjo-daro)** — Stadt der [Indus-Kultur](wiki:Indus-Kultur|Indus Valley Civilisation) (um 2500 v. Chr.) im heutigen Pakistan, mit geplanten Straßen und Abwasserkanälen.` },
        { lon: 114.392, lat: 36.099, label: 'Anyang', kind: 'site', pos: 'b', detail: `**[Anyang](wiki:Anyang (Henan)|Anyang)** — Hauptstadt der [Shang-Dynastie](wiki:Shang-Dynastie|Shang dynasty) (um 1300 v. Chr.) am Gelben Fluss; hier finden sich die ältesten chinesischen Schriftzeichen auf Orakelknochen.` },
      ],
      caption: 'Alle vier frühen Hochkulturen liegen an großen Strömen: Wasser, Schlamm und Bewässerung machten Landwirtschaft im Überfluss möglich. Tippe auf die Orte.',
    },
    {
      id: 'fact-kleopatra', type: 'callout', tone: 'fact', title: 'Kleopatra lebte näher an uns als an den Pyramiden',
      md: `Zwischen dem Bau der Cheops-Pyramide (um 2560 v. Chr.) und Kleopatra (gest. 30 v. Chr.) liegen rund 2500 Jahre — zwischen Kleopatra und heute nur gut 2050. Die Antike war für die Antike selbst schon uralt.`,
    },
    {
      id: 'griechenland', type: 'text', title: 'Griechenland: Stadtstaaten, Demokratie, Denken',
      md: `
Griechenland war nie ein einheitlicher Staat, sondern eine Welt vieler **[[polis|Poleis]]** (Stadtstaaten) wie [Athen](wiki:Athen|Athens), [Sparta](wiki:Sparta|Sparta) oder [Korinth](wiki:Korinth|Corinth (modern city)). Gemeinsam waren Sprache, Götter ([Zeus](wiki:Zeus|Zeus) und die Olympier) und Feste — etwa die **[Olympischen Spiele](wiki:Olympische Spiele der Antike|Ancient Olympic Games)**, der Überlieferung nach seit 776 v. Chr.

In **Athen** führte [Kleisthenes](wiki:Kleisthenes von Athen|Cleisthenes) 508/507 v. Chr. die **[[attische-demokratie|Demokratie]]** ein: Die Volksversammlung entschied direkt. Mitbestimmen durften allerdings nur freie Männer mit Bürgerrecht. Gegen das riesige [Perserreich](wiki:Achämenidenreich|Achaemenid Empire) siegten die Griechen bei **[Marathon](wiki:Schlacht bei Marathon|Battle of Marathon)** (490 v. Chr.) und in der Seeschlacht von **[Salamis](wiki:Schlacht von Salamis|Battle of Salamis)** (480 v. Chr.). Im „perikleischen Zeitalter“ entstand die [Akropolis](wiki:Akropolis von Athen|Acropolis of Athens) mit dem [Parthenon](wiki:Parthenon|Parthenon); Theater, Geschichtsschreibung ([Herodot](wiki:Herodot|Herodotus)) und Philosophie ([Sokrates](wiki:Sokrates|Socrates), [Platon](wiki:Platon|Plato), [Aristoteles](wiki:Aristoteles|Aristotle)) blühten.[^wp-antikes-griechenland]

**[Alexander der Große](wiki:Alexander der Große|Alexander the Great)** (356–323 v. Chr.) aus [Makedonien](wiki:Makedonien|Macedonia (region)) eroberte in nur elf Jahren ein Reich bis nach Ägypten und Indien. Nach seinem Tod zerfiel es, aber griechische Sprache und Kultur prägten die Region weiter: der **[[hellenismus|Hellenismus]]**. [Alexandria](wiki:Alexandria|Alexandria) in Ägypten mit seiner berühmten Bibliothek wurde zum geistigen Zentrum der Welt.`,
    },
    {
      id: 'map-alexander', type: 'map', title: 'Alexanders Zug von Pella bis zum Indus',
      view: [14, 24, 80, 46],
      layers: { cities: false, countryLabels: false, mountains: false },
      places: [
        { name: 'Troja', pos: 'l', detail: `**[Troja](wiki:Troja|Troy)** — hier setzte Alexander 334 v. Chr. nach Kleinasien über, bei Troja lag der Schauplatz der Ilias.` },
        { name: 'Alexandria', pos: 'b', detail: `**[Alexandria](wiki:Alexandria|Alexandria)** — 331 v. Chr. von Alexander gegründet, später Sitz der berühmten Bibliothek.` },
        { name: 'Babylon', pos: 'b', detail: `**[Babylon](wiki:Babylon|Babylon)** — Alexander zog 331 v. Chr. ein; hier starb er 323 v. Chr.` },
        { name: 'Persepolis', pos: 'b', detail: `**[Persepolis](wiki:Persepolis|Persepolis)** — Residenz der persischen Könige; 330 v. Chr. brannten Alexanders Truppen den Palast nieder.` },
        { name: 'Samarkand', pos: 't', detail: `**[Samarkand](wiki:Samarkand|Samarkand)** — das antike Marakanda, 329 v. Chr. von Alexander erobert.` },
      ],
      points: [
        { lon: 22.417, lat: 40.783, label: 'Pella', pos: 'l', detail: `**[Pella](wiki:Pella (Makedonien)|Pella (municipality))** — Hauptstadt Makedoniens und Geburtsort Alexanders (356 v. Chr.).` },
        { lon: 35.2, lat: 33.267, label: 'Tyros', pos: 'l', detail: `**[Tyros](wiki:Tyros|Tyre, Lebanon)** — die Inselstadt der Phönizier wurde 332 v. Chr. nach monatelanger Belagerung erobert.` },
        { lon: 36.157, lat: 36.854, label: 'Issos (333)', kind: 'battle', pos: 'r', detail: `**[Schlacht bei Issos](wiki:Schlacht bei Issos|Battle of Issus)** (333 v. Chr.) — Alexander besiegt den Perserkönig [Dareios III.](wiki:Dareios III.|Darius III).` },
        { lon: 43.44, lat: 36.56, label: 'Gaugamela (331)', kind: 'battle', pos: 'r', detail: `**[Schlacht von Gaugamela](wiki:Schlacht von Gaugamela|Battle of Gaugamela)** (331 v. Chr.) — die Entscheidung gegen das Perserreich; der genaue Ort ist unsicher.` },
        { lon: 72.829, lat: 33.757, label: 'Taxila', kind: 'site', pos: 'r', detail: `**[Taxila](wiki:Taxila|Taxila)** — Stadt im Indus-Gebiet, wo Alexander 326 v. Chr. ankam; am Hyphasis ließen ihn seine Soldaten umkehren.` },
      ],
      lines: [
        { label: 'Alexanders Zug (schematisch)', color: '#b91c1c', arrow: true, labelAt: 0.8, coords: [[22.417, 40.783], [26.2, 39.96], [36.157, 36.854], [35.2, 33.267], [29.9, 31.2], [44.4, 32.54], [52.89, 29.93], [66.97, 39.65], [72.829, 33.757]], detail: `Von Pella (336/334 v. Chr.) über Issos, Tyros und Ägypten nach Babylon, Persepolis und Baktrien bis zum Indus (326 v. Chr.). Die Linie verbindet nur die Stationen; Alexanders tatsächliche Wege waren verschlungener.` },
      ],
      caption: 'Der Weg ist schematisch; die Linie verbindet die wichtigsten Stationen in zeitlicher Reihenfolge.',
    },
    {
      id: 'rom', type: 'text', title: 'Rom: vom Stadtstaat zum Weltreich',
      md: `
Der Sage nach gründeten **[Romulus und Remus](wiki:Romulus und Remus|Romulus and Remus)** Rom im Jahr **753 v. Chr.** Nach der Vertreibung der Könige wurde Rom **509 v. Chr.** eine Republik, regiert von [Senat](wiki:Römischer Senat|Roman Senate) und zwei jährlich gewählten Konsuln. In den **[Punischen Kriegen](wiki:Punische Kriege|Punic Wars)** (264–146 v. Chr.) besiegte Rom [Karthago](wiki:Karthago|Carthage) — trotz [Hannibals](wiki:Hannibal|Hannibal) Zug mit Elefanten über die Alpen.

Im 1. Jahrhundert v. Chr. zerbrach die Republik in Bürgerkriegen. **[Gaius Julius Caesar](wiki:Gaius Iulius Caesar|Julius Caesar)** eroberte [Gallien](wiki:Gallischer Krieg|Gallic Wars) und machte sich zum [Diktator](wiki:Diktator|Dictatorship) auf Lebenszeit; an den [Iden des März](wiki:Iden des März|Ides of March) (**15. März 44 v. Chr.**) wurde er ermordet. Sein Adoptivsohn **[Augustus](wiki:Augustus|Augustus)** wurde **27 v. Chr.** der erste Kaiser. Es folgten rund 200 Jahre relativer Stabilität, die **[[pax-romana|Pax Romana]]**. Unter [Trajan](wiki:Trajan|Trajan) erreichte das Reich um **117 n. Chr.** seine größte Ausdehnung — vom [Hadrianswall](wiki:Hadrianswall|Hadrian's Wall) in Britannien bis [Mesopotamien](wiki:Mesopotamien|Mesopotamia).[^wp-roemisches-reich]

Das [Christentum](wiki:Christentum|Christianity), anfangs verfolgt, wurde unter **[Konstantin](wiki:Konstantin der Große|Constantine the Great)** geduldet (313) und unter [Theodosius](wiki:Theodosius I.|Theodosius I) **380** Staatsreligion. **395** wurde das Reich endgültig geteilt. Das **Weströmische Reich** endete **476**, als der germanische Heerführer [Odoaker](wiki:Odoaker|Odoacer) den letzten Kaiser absetzte. Das **Oströmische Reich** ([[byzanz|Byzanz]]) bestand bis **1453**.`,
    },
    {
      id: 'map-imperium', type: 'map', title: 'Das Römische Reich um 117 n. Chr.',
      view: [-12, 28, 48, 58],
      layers: { cities: false, countryLabels: false, mountains: false },
      highlight: [
        { label: 'ganz oder überwiegend römisch', color: '#9a3412', countries: ['Italien', 'Spanien', 'Portugal', 'Frankreich', 'Schweiz', 'Belgien', 'Luxemburg', 'Griechenland', 'Türkei', 'Syrien', 'Libanon', 'Israel', 'Jordanien', 'Palästina', 'Ägypten', 'Libyen', 'Tunesien', 'Algerien', 'Bulgarien', 'Kroatien', 'Serbien', 'Bosnien und Herzegowina', 'Albanien', 'Nordmazedonien', 'Slowenien', 'Montenegro', 'Kosovo', 'Österreich', 'Malta'] },
        { label: 'nur teilweise römisch', color: '#f59e0b', countries: ['Vereinigtes Königreich', 'Deutschland', 'Niederlande', 'Ungarn', 'Rumänien', 'Marokko', 'Irak'] },
      ],
      places: [
        { name: 'Rom', kind: 'capital', pos: 'r', detail: `**[Rom](wiki:Rom|Rome)** — Hauptstadt des Reichs und mit rund einer Million Einwohnern die größte Stadt der Antike.` },
        { name: 'Konstantinopel', kind: 'site', pos: 'r', detail: `**[Konstantinopel](wiki:Konstantinopel|Constantinople)** — erst 330 n. Chr. von Konstantin zur neuen Hauptstadt gemacht, später Hauptstadt des Oströmischen Reichs.` },
        { name: 'Karthago', pos: 'b', detail: `**[Karthago](wiki:Karthago|Carthage)** — Roms große Gegnerin in den Punischen Kriegen, 146 v. Chr. zerstört und später als römische Stadt neu gegründet.` },
        { name: 'Alexandria', pos: 'b', detail: `**[Alexandria](wiki:Alexandria|Alexandria)** — nach Rom die zweitgrößte Stadt des Reichs.` },
        { name: 'Trier', pos: 'l', detail: `**[Trier](wiki:Trier|Trier)** — römische Kaiserresidenz im Norden, mit der Porta Nigra.` },
        { name: 'Köln', pos: 'l', detail: `**[Köln](wiki:Köln|Cologne)** — Hauptstadt der Provinz Niedergermanien.` },
      ],
      points: [
        { lon: -2.6, lat: 55.0, label: 'Hadrianswall', kind: 'site', pos: 'r', detail: `**[Hadrianswall](wiki:Hadrianswall|Hadrian's Wall)** — ab 122 n. Chr. unter Kaiser Hadrian gebaut; er sicherte die Nordgrenze der Provinz Britannien.` },
      ],
      lines: [
        { label: 'Hannibal 218 v. Chr.', color: '#1d4ed8', arrow: true, labelAt: 0.3, coords: [[-0.983, 37.6], [4.8, 43.95], [7.68, 45.07], [16.13, 41.3]], detail: `Von Carthago Nova (Cartagena) über Pyrenäen, Rhône und Alpen nach Italien; 216 v. Chr. besiegte Hannibal die Römer bei [Cannae](wiki:Schlacht bei Cannae|Battle of Cannae). Die Linie ist nur schematisch.` },
      ],
      caption: 'Die Farben zeigen **heutige Staaten**, die ganz oder teilweise zum Reich gehörten — die damaligen Grenzen verliefen anders.',
    },
    {
      id: 'tl-explore', type: 'viz', viz: 'timeline', title: 'Die Antike auf einen Blick',
      params: { events: [
        { year: -3300, label: 'Keilschrift in Sumer', detail: 'Älteste Schrift der Welt, zuerst für Buchhaltung.' },
        { year: -2560, label: 'Cheops-Pyramide', detail: 'Größte der drei Pyramiden von Gizeh.' },
        { year: -1750, label: 'Codex Hammurapi', detail: 'Babylonische Gesetzessammlung auf einer Steinstele.' },
        { year: -776, label: 'Erste Olympische Spiele', detail: 'Traditionelles Datum; Beginn der griechischen Olympiaden-Zählung.' },
        { year: -508, label: 'Demokratie in Athen', detail: 'Reformen des Kleisthenes.' },
        { year: -323, label: 'Tod Alexanders', detail: 'Beginn des Hellenismus.' },
        { year: -44, label: 'Caesar ermordet', detail: 'Iden des März, 15. März 44 v. Chr.' },
        { year: -27, label: 'Augustus erster Kaiser', detail: 'Beginn der römischen Kaiserzeit.' },
        { year: 476, label: 'Ende Westroms', detail: 'Odoaker setzt [Romulus Augustulus](wiki:Romulus Augustulus|Romulus Augustulus) ab.' },
      ] },
      caption: 'Beachte die Abstände: Die ägyptische Geschichte allein umfasst fast 3000 Jahre.',
    },
    {
      id: 'tl-game', type: 'game', viz: 'timeline', title: 'Bring die Antike in Reihenfolge',
      params: { mode: 'sort', events: [
        { year: -2560, label: 'Cheops-Pyramide' },
        { year: -1750, label: 'Codex Hammurapi' },
        { year: -753, label: 'Sagenhafte Gründung Roms' },
        { year: -490, label: 'Schlacht bei Marathon' },
        { year: -323, label: 'Tod Alexanders' },
        { year: -44, label: 'Caesar ermordet' },
        { year: 380, label: 'Christentum Staatsreligion' },
        { year: 476, label: 'Ende Westroms' },
      ] },
    },
    {
      id: 'match-orte', type: 'match', title: 'Wer gehört wohin?',
      prompt: 'Ordne die Errungenschaft der Kultur zu.',
      pairs: [
        ['Keilschrift', 'Sumer / Mesopotamien'],
        ['Hieroglyphen', 'Ägypten'],
        ['Demokratie', 'Athen'],
        ['Senat und Konsuln', 'Römische Republik'],
        ['Bibliothek von Alexandria', 'Hellenismus'],
      ],
    },
    {
      id: 'map-quiz-antike', type: 'map', title: 'Wo lagen die Zentren der Antike?',
      view: [-10, 22, 50, 48],
      layers: { cities: false, countryLabels: false, mountains: false },
      quiz: { rounds: 8 },
      rivers: [{ name: 'Nil', quiz: true }],
      places: [{ name: 'Athen' }, { name: 'Rom' }, { name: 'Karthago' }, { name: 'Alexandria' }, { name: 'Babylon' }, { name: 'Sparta' }, { name: 'Troja' }, { name: 'Gizeh' }],
    },
    {
      id: 'quiz-demokratie', type: 'quiz', title: 'Athens Demokratie',
      question: 'Wer durfte in der attischen Demokratie in der Volksversammlung abstimmen?',
      options: [
        { text: 'Alle Einwohner Athens', correct: false, why: 'Frauen, Sklaven und Zugezogene (Metöken) waren ausgeschlossen.' },
        { text: 'Freie, erwachsene Männer mit athenischem Bürgerrecht', correct: true, why: 'Nur ein Teil der Bevölkerung — nach Schätzungen ein Zehntel bis ein Fünftel.' },
        { text: 'Nur die reichen Adligen', correct: false, why: 'Das war gerade der Unterschied zur Aristokratie: Auch arme Bürger stimmten mit.' },
        { text: 'Ein gewähltes Parlament', correct: false, why: 'Athen hatte eine *direkte* Demokratie; das Volk entschied selbst.' },
      ],
    },
    {
      id: 'num-westrom', type: 'numeric', title: 'Ein Datum, das man kennen sollte',
      question: 'In welchem Jahr endete das Weströmische Reich (n. Chr.)?',
      answer: 476, tolerance: 0,
      hint: 'Ein Jahr im letzten Viertel des 5. Jahrhunderts.',
      explain: '**476**: Odoaker setzte Kaiser Romulus Augustulus ab. Mit diesem Jahr lassen viele Historiker das Mittelalter beginnen — das Oströmische Reich bestand aber noch fast 1000 Jahre.',
    },
    {
      id: 'erbe', type: 'text', title: 'Was von der Antike bleibt',
      md: `
Vieles, was uns selbstverständlich scheint, stammt aus der Antike:

- **Schrift und Alphabet:** Unser lateinisches Alphabet geht über die Griechen auf die [Phönizier](wiki:Phönizier|Phoenicians) zurück.
- **Recht:** Das [römische Recht](wiki:Römisches Recht|Roman law), gesammelt im *[Corpus iuris civilis](wiki:Corpus iuris civilis|Corpus Juris Civilis)*, prägt bis heute das deutsche [Bürgerliche Gesetzbuch](wiki:Bürgerliches Gesetzbuch|Bürgerliches Gesetzbuch).
- **Politik und Sprache:** Demokratie, Republik, Senat, Diktator — alles antike Begriffe.
- **Kalender:** Unser Kalender geht auf den *[Julianischen Kalender](wiki:Julianischer Kalender|Julian calendar)* Caesars zurück; die Monate Juli und August sind nach Caesar und Augustus benannt.
- **Städte:** [Köln](wiki:Köln|Cologne), [Trier](wiki:Trier|Trier), [Mainz](wiki:Mainz|Mainz), [Augsburg](wiki:Augsburg|Augsburg) und [Regensburg](wiki:Regensburg|Regensburg) waren römische Gründungen. Trier gilt als älteste Stadt Deutschlands.`,
    },
    {
      id: 'recall-rom', type: 'recall', title: 'Erkläre den Wandel Roms',
      prompt: 'Rom war erst Königreich, dann Republik, dann Kaiserreich. Beschreibe in 3–4 Sätzen die Übergänge mit ungefähren Jahreszahlen und je einem Namen.',
      answer: `Nach der sagenhaften Gründung **753 v. Chr.** herrschten zunächst Könige. **509 v. Chr.** wurden sie vertrieben; die **Republik** mit Senat und zwei Konsuln entstand. Im 1. Jh. v. Chr. zerbrach sie in Bürgerkriegen — **Caesar** machte sich zum Alleinherrscher und wurde **44 v. Chr.** ermordet. Sein Erbe **Augustus** wurde **27 v. Chr.** erster Kaiser; damit begann die **Kaiserzeit**, die im Westen **476** endete.`,
      hints: ['Die Republik endet mit einem berühmten Mord.', 'Der erste Kaiser gab einem Monat seinen Namen.'],
      cards: ['rom-phasen', 'augustus'],
    },
  ],
  cards: [
    { id: 'hochkultur-fluesse', front: 'An welchen vier Flüssen entstanden die ersten Hochkulturen?', back: 'Euphrat/Tigris (Mesopotamien), Nil (Ägypten), Indus, Gelber Fluss (China).' },
    { id: 'keilschrift', front: 'Wer erfand die Keilschrift — und ungefähr wann?', back: 'Die Sumerer in Mesopotamien, um 3300 v. Chr.' },
    { id: 'hammurapi', front: 'Was ist der Codex Hammurapi?', back: 'Babylonische Gesetzessammlung (um 1750 v. Chr.), bekannt für das Prinzip „Auge um Auge“.' },
    { id: 'cheops', front: 'Wann ungefähr entstand die Cheops-Pyramide?', back: 'Um 2600–2500 v. Chr. (Altes Reich, 4. Dynastie).' },
    { id: 'rosette', front: 'Womit wurden die Hieroglyphen entziffert — und wann?', back: 'Mit dem Stein von Rosette; Champollion entzifferte sie 1822.' },
    { id: 'polis', front: 'Was ist eine Polis?', back: 'Ein griechischer Stadtstaat der Antike (z. B. Athen, Sparta); Wurzel von „Politik“.' },
    { id: 'demokratie-athen', front: 'Wann und durch wen wurde in Athen die Demokratie eingeführt?', back: '508/507 v. Chr. durch die Reformen des Kleisthenes.' },
    { id: 'perser', front: 'Zwei berühmte griechische Siege gegen die Perser?', back: 'Marathon (490 v. Chr.) und die Seeschlacht von Salamis (480 v. Chr.).' },
    { id: 'alexander', front: 'Lebensdaten Alexanders des Großen und die Epoche nach ihm?', back: '356–323 v. Chr.; danach folgt der Hellenismus.' },
    { id: 'rom-gruendung', front: 'Sagenhaftes Gründungsjahr Roms?', back: '753 v. Chr. („sieben-fünf-drei, Rom schlüpft aus dem Ei“).' },
    { id: 'rom-phasen', front: 'Die drei Phasen der römischen Staatsform mit Beginnjahren?', back: 'Königszeit (ab 753 v. Chr.), Republik (ab 509 v. Chr.), Kaiserzeit (ab 27 v. Chr.).' },
    { id: 'caesar', front: 'Wann wurde Caesar ermordet?', back: 'An den Iden des März, 15. März 44 v. Chr.' },
    { id: 'augustus', front: 'Wer war der erste römische Kaiser — ab wann?', back: 'Augustus, ab 27 v. Chr.' },
    { id: 'pax-romana', front: 'Was bedeutet „Pax Romana“?', back: 'Rund 200 Jahre relativer Frieden und Stabilität im Römischen Reich ab Augustus.' },
    { id: 'christentum-rom', front: 'Zwei Etappen des Christentums im Römischen Reich?', back: '313 Duldung unter Konstantin; 380 Staatsreligion unter Theodosius.' },
    { id: 'westrom-ostrom', front: 'Wann endeten West- und Oströmisches Reich?', back: 'Westrom 476, Ostrom (Byzanz) 1453.' },
    { id: 'roemerstaedte', front: 'Nenne drei deutsche Städte römischen Ursprungs.', back: 'z. B. Trier, Köln, Mainz, Augsburg, Regensburg.' },
  ],
};
