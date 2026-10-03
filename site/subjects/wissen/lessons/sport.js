export default {
  id: 'sport',
  title: 'Sport',
  summary: 'Vom „Wunder von Bern“ bis zum 7:1 in Belo Horizonte, von Steffi Graf bis Michael Schumacher: Momente und Namen der deutschen Sportgeschichte, die man kennen sollte — und ihre Schattenseiten.',
  minutes: 20,
  goals: [
    'Die vier Fußball-Weltmeistertitel der Männer mit Ort und Gegner nennen',
    'Die Bedeutung des [[wunder-von-bern|Wunders von Bern]] für die junge Bundesrepublik erklären',
    'Olympische Spiele in Deutschland (1936, 1972) historisch einordnen',
    'Deutsche Sportlegenden aus verschiedenen Sportarten kennen',
  ],
  blocks: [
    {
      id: 'fussball', type: 'text', title: 'Fußball: vier Sterne auf dem Trikot',
      md: `
Fußball ist mit Abstand Deutschlands beliebtester Sport. Der **[Deutsche Fußball-Bund](wiki:Deutscher Fußball-Bund|German Football Association) (DFB)**, gegründet 1900, ist mit über sieben Millionen Mitgliedern der größte nationale Sportfachverband der Welt. Die **[[bundesliga|Bundesliga]]** startete **1963**; Rekordmeister ist mit großem Abstand der **[FC Bayern München](wiki:FC Bayern München|FC Bayern Munich)**.

Die Männer-Nationalmannschaft wurde **viermal Weltmeister**:

<table>
<tr><th>Jahr</th><th>Ort des Finales</th><th>Finale</th><th>Held des Finales</th></tr>
<tr><td>1954</td><td>Bern (Schweiz)</td><td>3:2 gegen [Ungarn](wiki:Ungarn|Hungary)</td><td>[Helmut Rahn](wiki:Helmut Rahn); Trainer [Sepp Herberger](wiki:Sepp Herberger)</td></tr>
<tr><td>1974</td><td>München</td><td>2:1 gegen die Niederlande</td><td>[Gerd Müller](wiki:Gerd Müller); Kapitän [Franz Beckenbauer](wiki:Franz Beckenbauer)</td></tr>
<tr><td>1990</td><td>Rom</td><td>1:0 gegen Argentinien</td><td>[Andreas Brehme](wiki:Andreas Brehme) (Elfmeter); Teamchef Beckenbauer</td></tr>
<tr><td>2014</td><td>Rio de Janeiro</td><td>1:0 n. V. gegen Argentinien</td><td>[Mario Götze](wiki:Mario Götze); Trainer [Joachim Löw](wiki:Joachim Löw)</td></tr>
</table>

Dazu kommen drei **Europameistertitel** (1972, 1980, 1996). Die **Frauen** wurden 2003 und 2007 Weltmeisterinnen, achtmal Europameisterinnen und 2016 Olympiasiegerinnen.

**Franz Beckenbauer** („der Kaiser“) ist einer von nur drei Menschen, die als Spieler und als Trainer Weltmeister wurden. Unvergessen auch die **[WM 2006](wiki:Fußball-Weltmeisterschaft 2006|2006 FIFA World Cup)** in Deutschland, das „**Sommermärchen**“ — Deutschland wurde Dritter, das Land feierte sich als fröhlicher Gastgeber.`,
    },
    {
      id: 'wm-sort', type: 'game', viz: 'timeline', title: 'Große Fußballmomente sortieren',
      params: { mode: 'sort', events: [
        { year: 1954, label: 'Wunder von Bern', detail: 'Erster WM-Titel, 3:2 gegen Ungarn.' },
        { year: 1963, label: 'Start der Bundesliga', detail: 'Erster Meister: 1. FC Köln.' },
        { year: 1974, label: 'WM-Titel in München', detail: '2:1 gegen die Niederlande.' },
        { year: 1990, label: 'WM-Titel in Rom', detail: '1:0 gegen Argentinien — kurz vor der Wiedervereinigung.' },
        { year: 1996, label: 'Golden Goal Wembley', detail: 'Oliver Bierhoff entscheidet das EM-Finale gegen Tschechien.' },
        { year: 2006, label: 'Sommermärchen', detail: 'WM im eigenen Land, Platz 3.' },
        { year: 2014, label: 'WM-Titel in Rio', detail: 'Götzes Tor in der Verlängerung gegen Argentinien.' },
      ] },
    },
    {
      id: 'map-wm-finals', type: 'map', title: 'Vier WM-Finals: von Bern bis Rio',
      view: [-50, -30, 25, 58],
      layers: { cities: false },
      places: [
        { name: 'Bern', label: 'Bern 1954', kind: 'site', pos: 'l', detail: '**1954** — **[Wunder von Bern](wiki:Wunder von Bern|Miracle of Bern)**: 3:2 gegen Ungarn im Wankdorfstadion.' },
        { name: 'München', label: 'München 1974', kind: 'site', pos: 'r', detail: '**1974** — 2:1 gegen die Niederlande im [Olympiastadion](wiki:Olympiastadion München|Olympiastadion (Munich)).' },
        { name: 'Rom', label: 'Rom 1990', kind: 'site', pos: 'b', detail: '**1990** — 1:0 gegen Argentinien im [Olympiastadion](wiki:Olympiastadion Rom|Stadio Olimpico), Elfmeter von Andreas Brehme.' },
        { name: 'Rio de Janeiro', label: 'Rio de Janeiro 2014', kind: 'site', pos: 'r', detail: '**2014** — 1:0 nach Verlängerung gegen Argentinien im [Maracanã](wiki:Maracanã|Maracanã Stadium); Tor von Mario Götze.' },
      ],
      caption: 'Vier Finals, drei Kontinente: Europa dreimal, Südamerika einmal. 2014 war der erste WM-Titel einer europäischen Mannschaft in Südamerika.',
    },
    {
      id: 'bern', type: 'callout', tone: 'history', title: 'Das Wunder von Bern',
      md: `
Am **4. Juli 1954** besiegte die krasse Außenseitermannschaft der Bundesrepublik im Berner Wankdorfstadion die als unschlagbar geltenden **Ungarn** um [Ferenc Puskás](wiki:Ferenc Puskás) mit **3:2** — nachdem sie in der Vorrunde noch 3:8 gegen dieselben Ungarn verloren hatte. Legendär ist die Radioreportage von **[Herbert Zimmermann](wiki:Herbert Zimmermann (Reporter)|Herbert Zimmermann (football commentator))**: „Rahn müsste schießen … Rahn schießt … Tor! Tor! Tor! Tor!“

Für viele Historiker war das **[[wunder-von-bern|Wunder von Bern]]** mehr als ein Sieg: Neun Jahre nach Kriegsende gab es der jungen Bundesrepublik ein neues, unbelastetes Selbstwertgefühl — „Wir sind wieder wer“. Manche sehen darin die eigentliche Geburtsstunde der Bundesrepublik, neben Grundgesetz und Wirtschaftswunder.[^wiki-wunder-von-bern]`,
    },
    {
      id: 'calc-tore', type: 'numeric', title: 'Das 7:1',
      question: 'Im WM-Halbfinale 2014 in [Belo Horizonte](wiki:Belo Horizonte) schlug Deutschland Gastgeber [Brasilien](wiki:Brasilien|Brazil) 7:1. Zur Halbzeit stand es bereits 5:0. Wie viele Tore fielen **in der zweiten Halbzeit** insgesamt (beide Teams)?',
      answer: 3, tolerance: 0,
      hint: 'Endstand: 8 Tore insgesamt.',
      explain: '8 Tore insgesamt minus 5 in der ersten Halbzeit = **3** (zwei für Deutschland, eins für Brasilien). Die fünf Tore der ersten Halbzeit fielen zwischen der 11. und der 29. Minute.',
    },
    {
      id: 'olympia', type: 'text', title: 'Olympische Spiele in Deutschland',
      md: `
Deutschland war zweimal Gastgeber von Olympischen **Sommerspielen** — beide Male überschattet von Politik:

- **[Berlin 1936](wiki:Olympische Sommerspiele 1936|1936 Summer Olympics):** Die Nationalsozialisten nutzten die Spiele als **Propagandaschau**; im selben Jahr fanden die Winterspiele in [Garmisch-Partenkirchen](wiki:Garmisch-Partenkirchen) statt. Erstmals gab es einen **Fackellauf**. Star der Spiele war ausgerechnet der afroamerikanische Sprinter **[Jesse Owens](wiki:Jesse Owens)** mit vier Goldmedaillen — ein Widerspruch zur Rassenideologie der Gastgeber.
- **[München 1972](wiki:Olympische Sommerspiele 1972|1972 Summer Olympics):** Die „heiteren Spiele“ sollten ein neues, demokratisches Deutschland zeigen — mit dem [Olympiastadion](wiki:Olympiastadion (München)|Olympiastadion (Munich)) unter dem berühmten Zeltdach. Am 5. September überfielen palästinensische Terroristen die **israelische Mannschaft**; **elf Israelis** wurden ermordet, eine Befreiungsaktion in [Fürstenfeldbruck](wiki:Fürstenfeldbruck) scheiterte. IOC-Präsident [Avery Brundage](wiki:Avery Brundage) verkündete: „The Games must go on.“ Im Schwimmen gewann der Amerikaner [Mark Spitz](wiki:Mark Spitz) sieben Goldmedaillen.

Im **[Kalten Krieg](wiki:Kalter Krieg|Cold War)** traten BRD und DDR ab 1968 mit getrennten Mannschaften an. Die DDR war sportlich eine Großmacht — auch dank eines **staatlich organisierten Dopingsystems**, dessen gesundheitliche Folgen viele Athletinnen und Athleten bis heute tragen.`,
    },
    {
      id: 'map-olympia-de', type: 'map', title: 'Olympia in Deutschland',
      view: 'de',
      layers: { cities: false },
      places: [
        { name: 'Berlin', label: 'Berlin 1936', kind: 'site', pos: 'r', detail: '**1936** — Sommerspiele im [Olympiastadion](wiki:Olympiastadion Berlin|Olympiastadion (Berlin)); Propagandaschau der Nationalsozialisten, [Jesse Owens](wiki:Jesse Owens|Jesse Owens) gewinnt vier Goldmedaillen.' },
      ],
      points: [
        { lon: 11.105, lat: 47.494, label: 'Garmisch-Partenkirchen 1936', kind: 'site', pos: 'l', detail: '**1936** — [Olympische Winterspiele](wiki:Olympische Winterspiele 1936|1936 Winter Olympics) in **[Garmisch-Partenkirchen](wiki:Garmisch-Partenkirchen)**.' },
        { lon: 11.552, lat: 48.170, label: 'München 1972', kind: 'site', pos: 'r', detail: '**1972** — die „heiteren Spiele“ im [Olympiapark](wiki:Olympiapark (München)|Olympiapark, Munich); am 5. September überfallen Terroristen die israelische Mannschaft, die Befreiungsaktion in Fürstenfeldbruck scheitert.' },
      ],
      caption: 'Dreimal Olympia, dreimal überschattet von Politik. Die Winterspiele 1936 waren die vierten Winterspiele überhaupt.',
    },
    {
      id: 'legenden', type: 'text', title: 'Legenden jenseits des Fußballs',
      md: `
- **[Steffi Graf](wiki:Steffi Graf)** (Tennis) gewann 22 Grand-Slam-Titel und 1988 den bislang einmaligen **[[golden-slam|„Golden Slam“]]**: alle vier Grand-Slam-Turniere *und* Olympiagold in einem Jahr.
- **[Boris Becker](wiki:Boris Becker)** gewann **1985 mit 17 Jahren [Wimbledon](wiki:Wimbledon Championships)** — als jüngster Sieger im Herreneinzel und erster ungesetzter Champion. Ein Tennisboom erfasste Deutschland.
- **[Michael Schumacher](wiki:Michael Schumacher)** wurde **siebenmal [Formel-1](wiki:Formel 1|Formula One)-Weltmeister** (1994, 1995, 2000–2004); später holten **[Sebastian Vettel](wiki:Sebastian Vettel)** (vier Titel, 2010–2013) und **[Nico Rosberg](wiki:Nico Rosberg)** (2016) den Titel.
- **[Dirk Nowitzki](wiki:Dirk Nowitzki)** wurde **2011 mit den [Dallas Mavericks](wiki:Dallas Mavericks) NBA-Meister** und wertvollster Spieler der Finalserie.
- **[Max Schmeling](wiki:Max Schmeling)** war 1930 als erster Europäer Box-Weltmeister im Schwergewicht.
- **[Katarina Witt](wiki:Katarina Witt)** (DDR) gewann 1984 und 1988 Olympiagold im [Eiskunstlauf](wiki:Eiskunstlauf|Figure skating).
- **[Birgit Fischer](wiki:Birgit Fischer (Kanutin)|Birgit Fischer)** gewann im Kanu **acht olympische Goldmedaillen** über 20 Jahre (1980–2004).
- Im **[Handball](wiki:Handball)** wurde Deutschland 2007 im eigenen Land Weltmeister.`,
    },
    {
      id: 'match', type: 'match', title: 'Wer gehört zu welchem Sport?',
      pairs: [
        ['Steffi Graf', 'Golden Slam 1988'],
        ['Michael Schumacher', 'Sieben Formel-1-Titel'],
        ['Dirk Nowitzki', 'NBA-Meister 2011'],
        ['Boris Becker', 'Wimbledon-Sieger mit 17'],
        ['Birgit Fischer', 'Acht Olympiasiege im Kanu'],
        ['Helmut Rahn', 'Siegtor im WM-Finale 1954'],
      ],
    },
    {
      id: 'quiz', type: 'quiz', title: 'Olympia 1972',
      question: 'Was geschah bei den Olympischen Spielen 1972 in München?',
      options: [
        { text: 'Palästinensische Terroristen überfielen die israelische Mannschaft; elf Israelis wurden ermordet.', correct: true, why: 'Das Attentat vom 5. September 1972 überschattete die als „heitere Spiele“ geplanten Wettkämpfe.' },
        { text: 'Die Nationalsozialisten nutzten die Spiele zur Propaganda.', correct: false, why: 'Das war 1936 in Berlin.' },
        { text: 'Die Spiele wurden nach dem Anschlag abgebrochen.', correct: false, why: 'Nach einer Trauerfeier wurden die Spiele fortgesetzt — „The Games must go on“.' },
        { text: 'Jesse Owens gewann vier Goldmedaillen.', correct: false, why: 'Das war 1936 in Berlin.' },
      ],
    },
    {
      id: 'fact-rahn', type: 'callout', tone: 'fact', title: '„Das Runde muss ins Eckige“',
      md: 'Sepp Herberger, Trainer der Weltmeister von 1954, prägte Sätze, die zu Sprichwörtern wurden: „Der Ball ist rund“, „Das Spiel dauert 90 Minuten“ und „Nach dem Spiel ist vor dem Spiel“.',
    },
    {
      id: 'map-quiz-sport', type: 'map', title: 'Wo wurde Geschichte geschrieben?',
      view: [-50, -30, 25, 58],
      layers: { cities: false },
      quiz: { rounds: 5 },
      points: [
        { lon: 7.465, lat: 46.963, label: 'Wunder von Bern (WM-Finale 1954)', kind: 'site' },
        { lon: 11.552, lat: 48.170, label: 'WM-Finale 1974', kind: 'site' },
        { lon: 12.455, lat: 41.934, label: 'WM-Finale 1990', kind: 'site' },
        { lon: -43.230, lat: -22.912, label: 'WM-Finale 2014', kind: 'site' },
        { lon: 13.240, lat: 52.515, label: 'Olympische Spiele 1936', kind: 'site' },
      ],
    },
    {
      id: 'recall', type: 'recall', title: 'Mehr als ein Spiel',
      prompt: 'Warum gilt das **Wunder von Bern** als Ereignis von historischer Bedeutung und nicht nur als Sportgeschichte?',
      answer: 'Der überraschende WM-Sieg am **4. Juli 1954** (3:2 gegen die favorisierten Ungarn) kam nur neun Jahre nach Kriegsende. Er gab vielen Deutschen erstmals wieder ein **positives, unbelastetes Gemeinschaftsgefühl** („Wir sind wieder wer“) und fiel in die Zeit des beginnenden **Wirtschaftswunders**. Deshalb sehen Historiker darin einen emotionalen Gründungsmoment der Bundesrepublik.',
      hints: ['Welches Jahr? Wie lange war der Krieg vorbei?'],
      cards: ['bern-bedeutung'],
    },
  ],
  cards: [
    { id: 'wm-jahre', front: 'Die vier WM-Titel der deutschen Männer', back: '1954, 1974, 1990, 2014.' },
    { id: 'wm-1954', front: 'WM-Finale 1954: Ort, Gegner, Ergebnis', back: 'Bern, Ungarn, 3:2 (Tor: Helmut Rahn; Trainer Sepp Herberger).' },
    { id: 'wm-1974', front: 'WM-Finale 1974', back: 'München, 2:1 gegen die Niederlande (Siegtor Gerd Müller).' },
    { id: 'wm-1990', front: 'WM-Finale 1990', back: 'Rom, 1:0 gegen Argentinien (Elfmeter Andreas Brehme; Teamchef Beckenbauer).' },
    { id: 'wm-2014', front: 'WM-Finale 2014', back: 'Rio de Janeiro, 1:0 n. V. gegen Argentinien (Mario Götze; Trainer Joachim Löw).' },
    { id: 'em', front: 'EM-Titel der deutschen Männer', back: '1972, 1980, 1996.' },
    { id: 'frauen', front: 'WM-Titel der deutschen Frauen', back: '2003 und 2007 (dazu acht EM-Titel, Olympiagold 2016).' },
    { id: 'bundesliga', front: 'Seit wann gibt es die Bundesliga? Wer ist Rekordmeister?', back: 'Seit 1963; FC Bayern München.' },
    { id: 'beckenbauer', front: 'Was ist das Besondere an Franz Beckenbauer?', back: 'Weltmeister als Spieler (1974, Kapitän) und als Teamchef (1990).' },
    { id: 'bern-bedeutung', front: 'Warum war das „Wunder von Bern“ historisch bedeutsam?', back: 'Neues, unbelastetes Selbstwertgefühl neun Jahre nach Kriegsende („Wir sind wieder wer“).' },
    { id: 'sommermaerchen', front: 'Was war das „Sommermärchen“?', back: 'Die Fußball-WM 2006 in Deutschland (Platz 3), ein fröhliches Fest im ganzen Land.' },
    { id: 'olympia-1936', front: 'Olympia 1936', back: 'Berlin (Winter: Garmisch-Partenkirchen); NS-Propaganda; erster Fackellauf; Jesse Owens vier Goldmedaillen.' },
    { id: 'olympia-1972', front: 'Olympia 1972 in München — was überschattete die Spiele?', back: 'Das Attentat auf die israelische Mannschaft am 5. September; elf Israelis wurden ermordet.' },
    { id: 'graf', front: 'Steffi Grafs „Golden Slam“', back: '1988: alle vier Grand-Slam-Turniere und Olympiagold in einem Jahr.' },
    { id: 'becker', front: 'Boris Becker — der große Moment', back: 'Wimbledon-Sieg 1985 mit 17 Jahren (jüngster Herrensieger).' },
    { id: 'schumacher', front: 'Wie viele F1-Titel hat Michael Schumacher?', back: 'Sieben (1994, 1995, 2000–2004).' },
    { id: 'nowitzki', front: 'Dirk Nowitzki — größter Erfolg', back: 'NBA-Meister 2011 mit den Dallas Mavericks, Finals-MVP.' },
    { id: 'ddr-doping', front: 'Was war die Schattenseite der DDR-Sporterfolge?', back: 'Ein staatlich organisiertes Dopingsystem, oft ohne Wissen der (teils minderjährigen) Athleten.' },
  ],
};
