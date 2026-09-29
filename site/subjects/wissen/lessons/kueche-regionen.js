export default {
  id: 'kueche-regionen',
  title: 'Küche & Regionen',
  summary: 'Weißwurst oder Labskaus, Kölsch oder Alt, Berliner oder Krapfen: Deutschland isst und trinkt regional. Dazu das Reinheitsgebot, die Brotkultur und warum die Currywurst eine Berlinerin ist.',
  minutes: 20,
  goals: [
    'Regionale Spezialitäten ihren Regionen zuordnen',
    'Das [[reinheitsgebot|Reinheitsgebot]] von 1516 erklären',
    'Die Besonderheit der deutschen [[brotkultur|Brotkultur]] und des Weinbaus kennen',
    'Verstehen, was [[geschuetzte-herkunft|geschützte Herkunftsangaben]] bedeuten',
  ],
  blocks: [
    {
      id: 'vielfalt', type: 'text', title: 'Es gibt nicht „die“ deutsche Küche',
      md: `
Bis 1871 war Deutschland ein Flickenteppich aus Königreichen, Herzogtümern und freien Städten — entsprechend regional ist die Küche geblieben. Eine grobe Landkarte:

- **Norden:** Fisch (Matjes, Scholle, Krabben), **Labskaus** (Seemannsgericht aus Pökelfleisch, Kartoffeln, Roter Bete und Spiegelei), Grünkohl mit Pinkel, Franzbrötchen in Hamburg.
- **Rheinland und Westen:** **Sauerbraten** (traditionell teils vom Pferd), Himmel un Ääd (Kartoffelpüree mit Apfelmus und Blutwurst), Reibekuchen, Halve Hahn (ein Roggenbrötchen mit Käse — kein Hähnchen!).
- **Hessen:** **Frankfurter Grüne Soße** aus sieben Kräutern, Handkäs mit Musik, Apfelwein („Ebbelwoi“).
- **Schwaben und Baden:** **Spätzle**, **Maultaschen** (angeblich erfunden, um am Karfreitag Fleisch vor Gott zu verstecken — „Herrgottsbscheißerle“), **Schwarzwälder Kirschtorte**.
- **Bayern:** **Weißwurst** (traditionell vor dem Mittagsläuten gegessen), Schweinshaxe, Obatzda, Brezn, Leberkäse.
- **Osten:** **Thüringer Rostbratwurst**, Thüringer Klöße, Königsberger Klopse, Soljanka, Spreewaldgurken, Dresdner Christstollen.`,
    },
    {
      id: 'match-regionen', type: 'match', title: 'Wo isst man das?',
      pairs: [
        ['Labskaus', 'Norddeutschland / Hamburg'],
        ['Grüne Soße', 'Frankfurt am Main'],
        ['Maultaschen', 'Schwaben'],
        ['Weißwurst', 'Bayern'],
        ['Himmel un Ääd', 'Rheinland'],
        ['Spreewaldgurken', 'Brandenburg'],
      ],
    },
    {
      id: 'bier', type: 'text', title: 'Bier und das Reinheitsgebot',
      md: `
Am **23. April 1516** erließen die bayerischen Herzöge **Wilhelm IV.** und **Ludwig X.** in **Ingolstadt** eine Landesordnung, die festlegte: Bier darf nur aus **Wasser, Gerste und Hopfen** gebraut werden. Das **[[reinheitsgebot|Reinheitsgebot]]** gilt als älteste noch wirksame Lebensmittelvorschrift der Welt — auch wenn es damals vor allem darum ging, Weizen und Roggen fürs Brot zu sichern und gefährliche Zusätze wie Bilsenkraut zu verbieten. Die **Hefe** kannte man 1516 noch nicht; sie wurde später ergänzt. Der 23. April ist heute „Tag des Deutschen Bieres“.[^wiki-reinheitsgebot]

Regionale Bierkultur ist Identität:

- **Kölsch** in Köln (obergärig, hell, in kleinen 0,2-Liter-„Stangen“) — und **Altbier** im 40 km entfernten Düsseldorf. Die Rivalität der beiden Städte ist legendär.
- **Weißbier/Weizen** und das **Helle** in Bayern, **Pils** im Norden, **Rauchbier** in Bamberg, **Berliner Weiße** (mit Schuss) in Berlin.
- In Deutschland gibt es rund 1.500 Brauereien — gut 40 Prozent davon in Bayern.`,
    },
    {
      id: 'calc-reinheit', type: 'numeric', title: 'Ein altes Gesetz',
      question: 'Wie viele Jahre alt wird das Reinheitsgebot im Jahr 2026?',
      answer: 510, tolerance: 0, unit: 'Jahre',
      explain: '$2026 - 1516 = 510$. Zum 500. Jubiläum 2016 gab es in Ingolstadt ein großes Fest.',
    },
    {
      id: 'brot', type: 'text', title: 'Brot, Wein und Kartoffeln',
      md: `
**Brot** ist vielleicht das deutscheste aller Lebensmittel. Das Deutsche Brotinstitut führt ein Register mit weit über **3.000 Brotspezialitäten** — von Pumpernickel über Vollkornbrot bis zur Brezel. Seit **2014** steht die **„Deutsche [[brotkultur|Brotkultur]]“** im bundesweiten Verzeichnis des **immateriellen Kulturerbes** der UNESCO-Kommission. Daher auch das „**Abendbrot**“: Abends isst man in vielen Familien traditionell kalt, mit Brot, Wurst und Käse.

**Wein** wird in **13 Anbaugebieten** angebaut, fast alle im Südwesten entlang von Rhein, Mosel, Main, Neckar und Nahe — und im Osten an Saale-Unstrut und in Sachsen. Das größte Gebiet ist **Rheinhessen**, die wichtigste Rebsorte der **Riesling**, für den Deutschland weltweit bekannt ist. Die Weinberge der **Mosel** gehören zu den steilsten Europas.

Die **Kartoffel** kam aus Südamerika. **Friedrich der Große** ließ ihren Anbau in Preußen ab den 1750er-Jahren mit sogenannten „Kartoffelbefehlen“ fördern — der Legende nach ließ er Felder bewachen, damit die Bauern die Knollen für wertvoll hielten und stahlen. Bis heute legen Besucher Kartoffeln auf sein Grab in Sanssouci.`,
    },
    {
      id: 'neu', type: 'text', title: 'Neue Klassiker',
      md: `
Was „typisch deutsch“ ist, ändert sich:

- Die **Currywurst** erfand der Überlieferung nach **Herta Heuwer 1949** an ihrem Imbissstand in Berlin-Charlottenburg — mit Ketchup, Currypulver und Worcestersauce, die sie angeblich von britischen Soldaten bekam. Berlin und das Ruhrgebiet streiten gern darum, wo sie am besten ist.
- Der **Döner** in der heute bekannten Form (im Fladenbrot mit Salat und Soße) entstand Anfang der 1970er-Jahre in **Berlin**, erfunden von türkischen Einwanderern. Er ist inzwischen eines der beliebtesten Schnellgerichte Deutschlands.
- Das **Berliner** heißt in Berlin selbst „**Pfannkuchen**“, in Bayern „**Krapfen**“ — und ein Pfannkuchen heißt in Berlin „Eierkuchen“.
- **Kaffee und Kuchen** am Sonntagnachmittag bleibt eine liebgewonnene Tradition.`,
    },
    {
      id: 'timeline', type: 'game', viz: 'timeline', title: 'Kulinarische Geschichte sortieren',
      params: { mode: 'sort', events: [
        { year: 1434, label: 'Dresdner Striezelmarkt', detail: 'Ältester urkundlich belegter Weihnachtsmarkt Deutschlands — Heimat des Stollens.' },
        { year: 1516, label: 'Reinheitsgebot', detail: 'Ingolstadt, 23. April.' },
        { year: 1756, label: 'Kartoffelbefehl', detail: 'Friedrich der Große fördert den Kartoffelanbau in Preußen (bekanntester Befehl 1756).' },
        { year: 1810, label: 'Erstes Oktoberfest', detail: 'Hochzeit von Ludwig und Therese.' },
        { year: 1949, label: 'Currywurst', detail: 'Herta Heuwer, Berlin-Charlottenburg.' },
        { year: 1972, label: 'Döner im Brot', detail: 'Anfang der 1970er-Jahre in Berlin.' },
        { year: 2014, label: 'Brotkultur: Kulturerbe', detail: 'Aufnahme ins bundesweite Verzeichnis des immateriellen Kulturerbes.' },
      ] },
    },
    {
      id: 'herkunft', type: 'text', title: 'Geschützte Herkunft',
      md: `
Viele Spezialitäten sind in der EU als **[[geschuetzte-herkunft|geschützte geografische Angabe (g.g.A.)]]** oder **geschützte Ursprungsbezeichnung (g.U.)** eingetragen. Dann darf nur so heißen, was aus der Region stammt und nach festgelegten Regeln hergestellt wird. Beispiele aus Deutschland:

- **Nürnberger Rostbratwürste** und **Thüringer Rostbratwurst**
- **Schwarzwälder Schinken**, **Aachener Printen**, **Lübecker Marzipan**, **Dresdner Christstollen**
- **Spreewälder Gurken**, **Kölsch**, **Allgäuer Emmentaler**

Das Prinzip kennt man von Champagner oder Parmaschinken: Die Herkunft ist Teil des Produkts.`,
    },
    {
      id: 'quiz', type: 'quiz', title: 'Reinheitsgebot',
      question: 'Welche Aussagen zum Reinheitsgebot von 1516 stimmen? (Mehrfachauswahl)',
      options: [
        { text: 'Es wurde in Bayern (Ingolstadt) erlassen.', correct: true, why: 'Als bayerische Landesordnung der Herzöge Wilhelm IV. und Ludwig X.' },
        { text: 'Es erlaubte Wasser, Gerste und Hopfen.', correct: true, why: 'Genau diese drei Zutaten wurden genannt.' },
        { text: 'Hefe war ausdrücklich als Zutat vorgeschrieben.', correct: false, why: 'Hefe kannte man 1516 noch nicht als Zutat — sie wurde erst später ergänzt.' },
        { text: 'Ein Motiv war, Weizen und Roggen für das Brotbacken zu sichern.', correct: true, why: 'Brotgetreide sollte nicht zu Bier verbraut werden.' },
      ],
    },
    {
      id: 'fact-kartoffel', type: 'callout', tone: 'fact', title: 'Kartoffeln auf dem Königsgrab',
      md: 'Friedrich der Große wollte in einer schlichten Gruft auf der Terrasse von Schloss Sanssouci begraben werden — neben seinen Hunden. Erst 1991, nach der Wiedervereinigung, wurde dieser Wunsch erfüllt. Heute legen Besucher als Dank für den „Kartoffelkönig“ Kartoffeln auf die Grabplatte.',
    },
    {
      id: 'recall', type: 'recall', title: 'Erklär es einem Gast aus dem Ausland',
      prompt: 'Warum ist die deutsche Küche so **regional** geprägt? Nenne drei Beispiele aus unterschiedlichen Regionen.',
      answer: 'Deutschland war bis 1871 politisch zersplittert — viele Territorien mit eigener Geschichte, Konfession, Landwirtschaft und Klima. Der Norden am Meer isst Fisch (**Labskaus**, Matjes), der Süden hat eine bäuerlich-alpine Küche (**Weißwurst**, **Spätzle**, Maultaschen), der Westen Weinbau und Gerichte wie **Sauerbraten** oder **Grüne Soße**, der Osten z. B. **Thüringer Rostbratwurst** und Klöße. Auch beim Bier (Kölsch vs. Alt) und beim Gebäck (Berliner/Pfannkuchen/Krapfen) zeigt sich die Regionalität.',
      hints: ['Seit wann gibt es einen deutschen Nationalstaat?'],
      cards: ['regional'],
    },
  ],
  cards: [
    { id: 'regional', front: 'Warum ist die deutsche Küche so regional?', back: 'Jahrhundertelange politische Zersplitterung (bis 1871) sowie unterschiedliche Landschaften, Klima und Konfessionen.' },
    { id: 'labskaus', front: 'Was ist Labskaus und wo isst man es?', back: 'Seemannsgericht aus Pökelfleisch, Kartoffeln, Roter Bete, oft mit Spiegelei und Hering — Norddeutschland.' },
    { id: 'gruene-sosse', front: 'Frankfurter Grüne Soße — Besonderheit', back: 'Kalte Soße aus sieben Kräutern (Hessen).' },
    { id: 'maultaschen', front: 'Maultaschen — Region und Spitzname', back: 'Schwaben; „Herrgottsbscheißerle“ (Fleisch vor Gott versteckt in der Fastenzeit).' },
    { id: 'weisswurst', front: 'Weißwurst — Regel', back: 'Bayerische Spezialität, traditionell vor dem Mittagsläuten (12 Uhr) gegessen.' },
    { id: 'reinheitsgebot', front: 'Reinheitsgebot: Datum, Ort, Zutaten', back: '23. April 1516, Ingolstadt (Bayern); Wasser, Gerste, Hopfen (Hefe später ergänzt).' },
    { id: 'koelsch-alt', front: 'Kölsch und Alt — wo trinkt man was?', back: 'Kölsch in Köln (0,2-l-Stange), Altbier in Düsseldorf.' },
    { id: 'brauereien', front: 'In welchem Bundesland stehen mit Abstand die meisten Brauereien?', back: 'In Bayern (gut 40 % der rund 1.500 deutschen Brauereien).' },
    { id: 'brotkultur', front: 'Was ist seit 2014 immaterielles Kulturerbe?', back: 'Die Deutsche Brotkultur (bundesweites Verzeichnis) — über 3.000 registrierte Brotsorten.' },
    { id: 'wein', front: 'Deutscher Weinbau: Zahl der Anbaugebiete, größtes Gebiet, wichtigste Rebsorte', back: '13 Anbaugebiete; größtes: Rheinhessen; wichtigste Rebsorte: Riesling.' },
    { id: 'kartoffel', front: 'Welcher König förderte den Kartoffelanbau in Preußen?', back: 'Friedrich der Große („Kartoffelbefehle“, bekanntester 1756).' },
    { id: 'currywurst', front: 'Wer erfand die Currywurst, wann, wo?', back: 'Herta Heuwer, 1949, Berlin-Charlottenburg (Überlieferung).' },
    { id: 'doener', front: 'Wo entstand der Döner im Brot?', back: 'In Berlin, Anfang der 1970er-Jahre, durch türkische Einwanderer.' },
    { id: 'berliner', front: 'Wie heißt ein „Berliner“ in Berlin und in Bayern?', back: 'Berlin: Pfannkuchen. Bayern: Krapfen.' },
    { id: 'gga', front: 'Was bedeutet „g.g.A.“?', back: 'Geschützte geografische Angabe (EU): Der Name darf nur für Produkte aus der Region nach festgelegten Regeln verwendet werden.' },
    { id: 'gga-beispiele', front: 'Drei geschützte deutsche Spezialitäten', back: 'Z. B. Nürnberger Rostbratwürste, Thüringer Rostbratwurst, Schwarzwälder Schinken, Lübecker Marzipan, Aachener Printen, Kölsch.' },
  ],
};
