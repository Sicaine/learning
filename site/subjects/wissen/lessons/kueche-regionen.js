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

- **Norden:** Fisch ([Matjes](wiki:Matjes|Soused herring), Scholle, Krabben), **[Labskaus](wiki:Labskaus)** (Seemannsgericht aus Pökelfleisch, Kartoffeln, Roter Bete und Spiegelei), [Grünkohl](wiki:Grünkohl|Kale) mit Pinkel, [Franzbrötchen](wiki:Franzbrötchen) in Hamburg.
- **Rheinland und Westen:** **[Sauerbraten](wiki:Sauerbraten)** (traditionell teils vom Pferd), [Himmel un Ääd](wiki:Himmel un Ääd|Himmel und Erde) (Kartoffelpüree mit Apfelmus und Blutwurst), [Reibekuchen](wiki:Reibekuchen|Potato pancake), [Halve Hahn](wiki:Halve Hahn) (ein Roggenbrötchen mit Käse — kein Hähnchen!).
- **Hessen:** **[Frankfurter Grüne Soße](wiki:Frankfurter Grüne Soße)** aus sieben Kräutern, [Handkäs mit Musik](wiki:Handkäs mit Musik|Handkäse), Apfelwein („[Ebbelwoi](wiki:Apfelwein)“).
- **Schwaben und Baden:** **[Spätzle](wiki:Spätzle)**, **[Maultaschen](wiki:Maultaschen|Maultasche)** (angeblich erfunden, um am Karfreitag Fleisch vor Gott zu verstecken — „Herrgottsbscheißerle“), **[Schwarzwälder Kirschtorte](wiki:Schwarzwälder Kirschtorte|Black Forest gateau)**.
- **Bayern:** **[Weißwurst](wiki:Weißwurst)** (traditionell vor dem Mittagsläuten gegessen), [Schweinshaxe](wiki:Schweinshaxe|Eisbein), [Obatzda](wiki:Obatzda), [Brezn](wiki:Laugengebäck|Lye roll), [Leberkäse](wiki:Leberkäse).
- **Osten:** **[Thüringer Rostbratwurst](wiki:Thüringer Rostbratwurst|Bratwurst)**, [Thüringer Klöße](wiki:Thüringer Klöße), [Königsberger Klopse](wiki:Königsberger Klopse), [Soljanka](wiki:Soljanka|Solyanka), [Spreewaldgurken](wiki:Spreewälder Gurken|Spreewald gherkins), [Dresdner Christstollen](wiki:Dresdner Stollen|Stollen).`,
    },
    {
      id: 'map-kueche-regionen', type: 'map', title: 'Eine Landkarte des Geschmacks',
      view: 'de',
      layers: { cities: false, rivers: false },
      places: [
        { name: 'Hamburg', pos: 'l', color: '#0369a1', detail: '**[Hamburg](wiki:Hamburg)** — Fisch und **[Labskaus](wiki:Labskaus|Lobscouse)**, dazu Franzbrötchen.' },
        { name: 'Lübeck', pos: 'r', color: '#0369a1', detail: '**[Lübeck](wiki:Lübeck)** — das **[Lübecker Marzipan](wiki:Lübecker Marzipan|Marzipan)** trägt eine geschützte geografische Angabe.' },
        { name: 'Köln', pos: 'l', color: '#b45309', detail: '**[Köln](wiki:Köln|Cologne)** — **[Kölsch](wiki:Kölsch (Bier)|Kölsch (beer))** aus der 0,2-Liter-Stange, dazu Himmel un Ääd und Halve Hahn.' },
        { name: 'Düsseldorf', pos: 'l', color: '#b45309', detail: '**[Düsseldorf](wiki:Düsseldorf)** — das dunkle **[Altbier](wiki:Altbier|Altbier)**, die große Rivalin des Kölsch.' },
        { name: 'Aachen', pos: 'l', color: '#b45309', detail: '**[Aachen](wiki:Aachen)** — die **[Aachener Printen](wiki:Aachener Printen|Aachener Printen)** sind ein Lebkuchen-Gebäck.' },
        { name: 'Frankfurt am Main', pos: 'r', color: '#15803d', detail: '**[Frankfurt am Main](wiki:Frankfurt am Main|Frankfurt)** — **[Grüne Soße](wiki:Frankfurter Grüne Soße|Green sauce)** aus sieben Kräutern und Apfelwein („Ebbelwoi“).' },
        { name: 'Erfurt', pos: 'r', color: '#be123c', detail: 'In Thüringen (hier: **[Erfurt](wiki:Erfurt)**) gibt es die **[Thüringer Rostbratwurst](wiki:Thüringer Rostbratwurst)** und Thüringer Klöße.' },
        { name: 'Dresden', pos: 'r', color: '#be123c', detail: '**[Dresden](wiki:Dresden)** — der **[Dresdner Stollen](wiki:Dresdner Stollen|Stollen)** gehört zum Striezelmarkt.' },
        { name: 'Berlin', pos: 'r', color: '#be123c', detail: '**[Berlin](wiki:Berlin)** — Heimat von **[Currywurst](wiki:Currywurst)** (Herta Heuwer, 1949) und **[Döner](wiki:Döner Kebab|Doner kebab)** im Fladenbrot.' },
        { name: 'Spreewald', kind: 'place', pos: 'r', color: '#be123c', detail: 'Der **[Spreewald](wiki:Spreewald)** in Brandenburg — berühmt für **Spreewälder Gurken**.' },
        { name: 'Nürnberg', pos: 'r', color: '#7e22ce', detail: '**[Nürnberg](wiki:Nürnberg|Nuremberg)** — die **[Nürnberger Rostbratwurst](wiki:Nürnberger Rostbratwurst)** ist kleiner als die Thüringer und hat eine geschützte geografische Angabe.' },
        { name: 'Bamberg', pos: 'r', color: '#7e22ce', detail: '**[Bamberg](wiki:Bamberg)** — **[Rauchbier](wiki:Rauchbier|Rauchbier)** mit Buchenholz-Aroma.' },
        { name: 'Ingolstadt', pos: 'r', color: '#7e22ce', detail: '**[Ingolstadt](wiki:Ingolstadt)** — hier erließen die bayerischen Herzöge am 23. April 1516 das **Reinheitsgebot**.' },
        { name: 'München', pos: 'r', color: '#7e22ce', detail: '**[München](wiki:München|Munich)** — **[Weißwurst](wiki:Weißwurst|Weisswurst)** mit süßem Senf und Brezn, dazu Weißbier.' },
        { name: 'Allgäu', kind: 'place', pos: 'r', color: '#7e22ce', detail: 'Das **[Allgäu](wiki:Allgäu|Allgäu)** — **Allgäuer Emmentaler** und Bergkäse.' },
        { name: 'Schwarzwald', kind: 'place', pos: 'l', color: '#c2410c', detail: 'Der **[Schwarzwald](wiki:Schwarzwald|Black Forest)** — **Schwarzwälder Schinken** und **[Schwarzwälder Kirschtorte](wiki:Schwarzwälder Kirschtorte|Black Forest gateau)**.' },
      ],
      points: [
        { lon: 8.813, lat: 49.001, label: 'Maulbronn', pos: 'r', color: '#c2410c', detail: 'Im **[Kloster Maulbronn](wiki:Kloster Maulbronn|Maulbronn Monastery)** sollen die **[Maultaschen](wiki:Maultasche|Maultasche)** erfunden worden sein — der Legende nach, um das Fleisch in der Fastenzeit vor Gott zu verstecken. Beweisen lässt sich das nicht.' },
      ],
      caption: 'Farben nach Region: Blau Norden · Braun Rheinland · Grün Hessen · Orange Südwesten · Violett Bayern · Rot Osten. Tippe auf die Punkte für die Spezialitäten.',
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
Am **23. April 1516** erließen die bayerischen Herzöge **[Wilhelm IV.](wiki:Wilhelm IV. (Bayern)|William IV of Bavaria)** und **[Ludwig X.](wiki:Ludwig X. (Bayern)|Louis X of Bavaria)** in **[Ingolstadt](wiki:Ingolstadt)** eine Landesordnung, die festlegte: Bier darf nur aus **Wasser, Gerste und Hopfen** gebraut werden. Das **[[reinheitsgebot|Reinheitsgebot]]** gilt als älteste noch wirksame Lebensmittelvorschrift der Welt — auch wenn es damals vor allem darum ging, Weizen und Roggen fürs Brot zu sichern und gefährliche Zusätze wie [Bilsenkraut](wiki:Bilsenkraut|Hyoscyamus) zu verbieten. Die **Hefe** kannte man 1516 noch nicht; sie wurde später ergänzt. Der 23. April ist heute „Tag des Deutschen Bieres“.[^wiki-reinheitsgebot]

Regionale Bierkultur ist Identität:

- **[Kölsch](wiki:Kölsch (Bier)|Kölsch (beer))** in [Köln](wiki:Köln|Cologne) (obergärig, hell, in kleinen 0,2-Liter-„Stangen“) — und **[Altbier](wiki:Altbier)** im 40 km entfernten [Düsseldorf](wiki:Düsseldorf). Die Rivalität der beiden Städte ist legendär.
- **[Weißbier](wiki:Weißbier)/Weizen** und das **Helle** in Bayern, **Pils** im Norden, **[Rauchbier](wiki:Rauchbier|Smoked beer)** in [Bamberg](wiki:Bamberg), **[Berliner Weiße](wiki:Berliner Weisse)** (mit Schuss) in Berlin.
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
**Brot** ist vielleicht das deutscheste aller Lebensmittel. Das [Deutsche Brotinstitut](wiki:Deutsches Brotinstitut) führt ein Register mit weit über **3.000 Brotspezialitäten** — von [Pumpernickel](wiki:Pumpernickel) über Vollkornbrot bis zur [Brezel](wiki:Brezel|Pretzel). Seit **2014** steht die **„Deutsche [[brotkultur|Brotkultur]]“** im bundesweiten Verzeichnis des **immateriellen Kulturerbes** der [UNESCO-Kommission](wiki:Deutsche UNESCO-Kommission|German Commission for UNESCO). Daher auch das „**Abendbrot**“: Abends isst man in vielen Familien traditionell kalt, mit Brot, Wurst und Käse.

**Wein** wird in **13 Anbaugebieten** angebaut, fast alle im Südwesten entlang von Rhein, [Mosel](wiki:Mosel|Moselle), Main, Neckar und [Nahe](wiki:Nahe (Weinbaugebiet)|Nahe (wine region)) — und im Osten an Saale-Unstrut und in Sachsen. Das größte Gebiet ist **[Rheinhessen](wiki:Rheinhessen|Rhenish Hesse)**, die wichtigste Rebsorte der **[Riesling](wiki:Riesling)**, für den Deutschland weltweit bekannt ist. Die Weinberge der **Mosel** gehören zu den steilsten Europas.

Die **[Kartoffel](wiki:Kartoffel|Potato)** kam aus Südamerika. **[Friedrich der Große](wiki:Friedrich der Große|Frederick the Great)** ließ ihren Anbau in Preußen ab den 1750er-Jahren mit sogenannten „[Kartoffelbefehlen](wiki:Kartoffelbefehl|Potato Edict)“ fördern — der Legende nach ließ er Felder bewachen, damit die Bauern die Knollen für wertvoll hielten und stahlen. Bis heute legen Besucher Kartoffeln auf sein Grab in [Sanssouci](wiki:Schloss Sanssouci|Sanssouci).`,
    },
    {
      id: 'map-weinregionen', type: 'map', title: 'Die 13 Weinanbaugebiete',
      view: [5.8, 47.4, 15.2, 52.0],
      layers: { cities: false },
      rivers: [{ name: 'Rhein', label: false }, { name: 'Mosel' }, { name: 'Main' }, { name: 'Neckar' }, { name: 'Saale' }, { name: 'Elbe' }],
      points: [
        { lon: 7.113, lat: 50.545, label: 'Ahr', pos: 'l', color: '#9f1239', detail: 'Die **[Ahr](wiki:Ahr (Weinbaugebiet)|Ahr (wine region))** ist bekannt für Rotwein (Spätburgunder). Der Ort Ahrweiler steht hier als Anhaltspunkt für das Gebiet.' },
        { lon: 7.769, lat: 50.061, label: 'Mittelrhein', pos: 'l', color: '#9f1239', detail: 'Das **[Mittelrhein](wiki:Mittelrhein (Weinbaugebiet)|Mittelrhein (wine region))**-Tal rund um Bacharach — steile Hänge, Riesling.' },
        { lon: 7.069, lat: 49.916, label: 'Mosel', pos: 'l', color: '#9f1239', detail: 'Die **[Mosel](wiki:Mosel (Weinbaugebiet)|Mosel (wine region))** — hier um Bernkastel-Kues — hat einige der steilsten Weinberge Europas; Riesling.' },
        { lon: 7.867, lat: 49.847, label: 'Nahe', pos: 'l', color: '#9f1239', detail: 'Die **[Nahe](wiki:Nahe (Weinbaugebiet)|Nahe (wine region))** — Anhaltspunkt: Bad Kreuznach.' },
        { lon: 8.116, lat: 49.752, label: 'Rheinhessen', pos: 'l', color: '#9f1239', detail: '**[Rheinhessen](wiki:Rheinhessen|Rheinhessen)** — Deutschlands größtes Weinbaugebiet (hier: Alzey als Anhaltspunkt).' },
        { lon: 7.923, lat: 49.979, label: 'Rheingau', pos: 'r', color: '#9f1239', detail: 'Der **[Rheingau](wiki:Rheingau|Rheingau)** — Rüdesheim am Rhein steht für das Gebiet; Riesling-Hochburg.' },
        { lon: 8.645, lat: 49.642, label: 'Hessische Bergstraße', pos: 'r', color: '#9f1239', detail: 'Die **[Hessische Bergstraße](wiki:Hessische Bergstraße|Hessische Bergstraße)** (Anhaltspunkt: Heppenheim) ist Deutschlands kleinstes Weinbaugebiet.' },
        { lon: 8.150, lat: 49.350, label: 'Pfalz', pos: 'l', color: '#9f1239', detail: 'Die **[Pfalz](wiki:Pfalz (Weinbaugebiet)|Palatinate (wine region))** — die „Deutsche Weinstraße“ (Anhaltspunkt: Neustadt an der Weinstraße).' },
        { lon: 9.222, lat: 49.142, label: 'Württemberg', pos: 'r', color: '#9f1239', detail: '**[Württemberg](wiki:Württemberg (Weinbaugebiet)|Württemberg (wine region))** — Trollinger und Lemberger (Anhaltspunkt: Heilbronn).' },
        { lon: 7.850, lat: 48.000, label: 'Baden', pos: 'l', color: '#9f1239', detail: '**[Baden](wiki:Baden (Weinbaugebiet)|Baden (wine region))** — das südlichste Gebiet, am Kaiserstuhl und rund um Freiburg.' },
        { lon: 9.930, lat: 49.794, label: 'Franken (Main)', pos: 'r', color: '#9f1239', detail: '**[Franken](wiki:Franken (Weinbaugebiet)|Franconia (wine region))** — um Würzburg am Main; bekannt für den Bocksbeutel und Silvaner.' },
        { lon: 11.770, lat: 51.212, label: 'Saale-Unstrut', pos: 'r', color: '#9f1239', detail: '**[Saale-Unstrut](wiki:Saale-Unstrut (Weinanbaugebiet)|Saale-Unstrut)** — eines der nördlichsten Weinbaugebiete Europas (Freyburg).' },
        { lon: 13.659, lat: 51.106, label: 'Sachsen', pos: 'r', color: '#9f1239', detail: 'Die **[Sachsen](wiki:Sachsen (Weinbaugebiet)|Saxony (wine region))** — an der Elbe um Radebeul, ein kleines Gebiet im Osten.' },
      ],
      caption: 'Die Punkte stehen für die Gebiete, nicht für einzelne Weinberge — die Lage ist nach bekannten Orten des jeweiligen Gebiets gesetzt. Die Karte zeigt die Flüsse, an denen die meisten Rebflächen liegen.',
    },
    {
      id: 'neu', type: 'text', title: 'Neue Klassiker',
      md: `
Was „typisch deutsch“ ist, ändert sich:

- Die **[Currywurst](wiki:Currywurst)** erfand der Überlieferung nach **[Herta Heuwer](wiki:Herta Heuwer) 1949** an ihrem Imbissstand in [Berlin-Charlottenburg](wiki:Berlin-Charlottenburg|Charlottenburg) — mit Ketchup, Currypulver und Worcestersauce, die sie angeblich von britischen Soldaten bekam. Berlin und das Ruhrgebiet streiten gern darum, wo sie am besten ist.
- Der **[Döner](wiki:Döner Kebab|Doner kebab)** in der heute bekannten Form (im Fladenbrot mit Salat und Soße) entstand Anfang der 1970er-Jahre in **Berlin**, erfunden von türkischen Einwanderern. Er ist inzwischen eines der beliebtesten Schnellgerichte Deutschlands.
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

- **[Nürnberger Rostbratwürste](wiki:Nürnberger Rostbratwurst|Bratwurst)** und **Thüringer Rostbratwurst**
- **[Schwarzwälder Schinken](wiki:Schwarzwälder Schinken|Black Forest ham)**, **[Aachener Printen](wiki:Aachener Printen)**, **[Lübecker Marzipan](wiki:Lübecker Marzipan|Lübeck Marzipan)**, **Dresdner Christstollen**
- **Spreewälder Gurken**, **Kölsch**, **[Allgäuer Emmentaler](wiki:Allgäuer Emmentaler|Emmental cheese)**

Das Prinzip kennt man von [Champagner](wiki:Champagner|Champagne) oder [Parmaschinken](wiki:Parmaschinken|Parma ham): Die Herkunft ist Teil des Produkts.`,
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
      id: 'map-quiz-gerichte', type: 'map', title: 'Wo gehört das Gericht hin?',
      view: 'de',
      layers: { cities: false, rivers: false },
      quiz: { rounds: 7 },
      points: [
        { lon: 9.993, lat: 53.551, label: 'Labskaus', kind: 'site' },
        { lon: 8.683, lat: 50.111, label: 'Frankfurter Grüne Soße', kind: 'site' },
        { lon: 11.576, lat: 48.137, label: 'Weißwurst (Weißwurstäquator)', kind: 'site' },
        { lon: 13.405, lat: 52.520, label: 'Currywurst', kind: 'site' },
        { lon: 6.083, lat: 50.776, label: 'Aachener Printen', kind: 'site' },
        { lon: 13.738, lat: 51.050, label: 'Dresdner Stollen', kind: 'site' },
        { lon: 13.900, lat: 51.900, label: 'Spreewaldgurken', kind: 'site' },
      ],
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
