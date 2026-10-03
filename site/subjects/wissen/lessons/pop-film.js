export default {
  id: 'pop-film',
  title: 'Film & Popkultur',
  summary: 'Von *Metropolis* bis *Im Westen nichts Neues*, von Marlene Dietrich bis Rammstein: Deutschland hat Filmgeschichte geschrieben und elektronische Popmusik miterfunden. Hier geht es um die Filme, Bands und Fernsehklassiker, die man kennen sollte.',
  minutes: 20,
  goals: [
    'Die großen Phasen der deutschen Filmgeschichte kennen',
    'Wichtige Regisseure und Filme einander zuordnen',
    'Deutsche Oscar-Gewinner für den besten internationalen Film nennen',
    '[[krautrock|Krautrock]], Kraftwerk und die [[neue-deutsche-welle|Neue Deutsche Welle]] einordnen',
  ],
  blocks: [
    {
      id: 'weimar-film', type: 'text', title: 'Stummfilm und Weimarer Kino: eine Weltmacht',
      md: `
In den 1920er Jahren war Deutschland neben [Hollywood](wiki:Hollywood|Hollywood, Los Angeles) die wichtigste Filmnation der Welt. Zentrum war die **[UFA](wiki:Universum Film AG|UFA GmbH)** (Universum Film AG, gegründet 1917) mit ihren Studios in **[Potsdam-Babelsberg](wiki:Studio Babelsberg|Babelsberg Studio)** — dem ältesten Großatelier-Filmstudio der Welt.[^wp-deutscher-film]

Der [[expressionistischer-film|expressionistische Film]] erfand eine neue Bildsprache aus schiefen Kulissen und harten Schatten:

- *[Das Cabinet des Dr. Caligari](wiki:Das Cabinet des Dr. Caligari|The Cabinet of Dr. Caligari)* (1920, [Robert Wiene](wiki:Robert Wiene|Robert Wiene))
- *[Nosferatu](wiki:Nosferatu – Eine Symphonie des Grauens|Nosferatu) – Eine Symphonie des Grauens* (1922, [F. W. Murnau](wiki:Friedrich Wilhelm Murnau|F. W. Murnau)) — der erste große Vampirfilm
- ***[Metropolis](wiki:Metropolis (Film)|Metropolis (1927 film))*** (1927, **[Fritz Lang](wiki:Fritz Lang|Fritz Lang)**) — eine Zukunftsstadt mit Maschinenmensch; heute als erster Film UNESCO-Weltdokumentenerbe[^wp-metropolis]
- *[M – Eine Stadt sucht einen Mörder](wiki:M (1931)|M (1931 film))* (1931, Fritz Lang) — einer der ersten großen Tonfilme

Mit *[Der blaue Engel](wiki:Der blaue Engel|The Blue Angel)* (1930) wurde **[Marlene Dietrich](wiki:Marlene Dietrich|Marlene Dietrich)** („Ich bin von Kopf bis Fuß auf Liebe eingestellt“) zum Weltstar. Nach 1933 flohen viele Filmschaffende nach [Hollywood](wiki:Hollywood|Hollywood, Los Angeles), darunter Fritz Lang, [Billy Wilder](wiki:Billy Wilder|Billy Wilder) und Marlene Dietrich selbst, die sich gegen das NS-Regime stellte.`,
    },
    {
      id: 'nachkrieg-film', type: 'text', title: 'Nachkriegszeit und Neuer Deutscher Film',
      md: `
In den 1950ern dominierten in der Bundesrepublik **Heimatfilme** und Komödien, in der DDR produzierte die staatliche **[DEFA](wiki:DEFA|DEFA)** in Babelsberg. 1962 erklärten junge Filmemacher im **[Oberhausener Manifest](wiki:Oberhausener Manifest|Oberhausen Manifesto)**: „Papas Kino ist tot.“ Daraus entstand der [[neuer-deutscher-film|Neue Deutsche Film]]:[^wp-neuer-deutscher-film]

- **[Rainer Werner Fassbinder](wiki:Rainer Werner Fassbinder|Rainer Werner Fassbinder)**: *[Angst essen Seele auf](wiki:Angst essen Seele auf|Ali: Fear Eats the Soul)* (1974), *[Die Ehe der Maria Braun](wiki:Die Ehe der Maria Braun|The Marriage of Maria Braun)* (1979)
- **[Werner Herzog](wiki:Werner Herzog|Werner Herzog)**: *[Aguirre, der Zorn Gottes](wiki:Aguirre, der Zorn Gottes|Aguirre, the Wrath of God)* (1972), *[Fitzcarraldo](wiki:Fitzcarraldo|Fitzcarraldo)* (1982), mit [Klaus Kinski](wiki:Klaus Kinski|Klaus Kinski)
- **[Wim Wenders](wiki:Wim Wenders|Wim Wenders)**: *[Paris, Texas](wiki:Paris, Texas|Paris, Texas (film))* ([Goldene Palme](wiki:Goldene Palme|Palme d'Or) 1984), *[Der Himmel über Berlin](wiki:Der Himmel über Berlin|Wings of Desire)* (1987)
- **[Volker Schlöndorff](wiki:Volker Schlöndorff|Volker Schlöndorff)**: *[Die Blechtrommel](wiki:Die Blechtrommel (Film)|The Tin Drum (film))* (1979)

Weitere Klassiker: [Wolfgang Petersens](wiki:Wolfgang Petersen|Wolfgang Petersen) *[Das Boot](wiki:Das Boot (Film)|Das Boot)* (1981), [Tom Tykwers](wiki:Tom Tykwer|Tom Tykwer) *[Lola rennt](wiki:Lola rennt|Run Lola Run)* (1998), [Wolfgang Beckers](wiki:Wolfgang Becker (Regisseur, 1954)|Wolfgang Becker (director, born 1954)) *[Good Bye, Lenin!](wiki:Good Bye, Lenin!|Good Bye, Lenin!)* (2003), [Oliver Hirschbiegels](wiki:Oliver Hirschbiegel|Oliver Hirschbiegel) *[Der Untergang](wiki:Der Untergang|Downfall (2004 film))* (2004). Wichtigstes deutsches Filmfestival ist die [[berlinale|Berlinale]] (seit 1951, Goldener Bär).[^wp-berlinale]`,
    },
    {
      id: 'oscars', type: 'callout', tone: 'fact', title: 'Vier deutsche Oscars für den besten internationalen Film',
      md: `
- 1980: *[Die Blechtrommel](wiki:Die Blechtrommel (Film)|The Tin Drum (film))* ([Volker Schlöndorff](wiki:Volker Schlöndorff|Volker Schlöndorff))
- 2003: *[Nirgendwo in Afrika](wiki:Nirgendwo in Afrika|Nowhere in Africa)* ([Caroline Link](wiki:Caroline Link|Caroline Link))
- 2007: *[Das Leben der Anderen](wiki:Das Leben der Anderen|The Lives of Others)* ([Florian Henckel von Donnersmarck](wiki:Florian Henckel von Donnersmarck|Florian Henckel von Donnersmarck)) — über einen [Stasi-Offizier](wiki:Ministerium für Staatssicherheit|Stasi), der ein Künstlerpaar abhört
- 2023: *[Im Westen nichts Neues](wiki:Im Westen nichts Neues (2022)|All Quiet on the Western Front (2022 film))* ([Edward Berger](wiki:Edward Berger|Edward Berger)) — nach [Remarques](wiki:Erich Maria Remarque|Erich Maria Remarque) Roman; der Film gewann insgesamt vier Oscars`,
    },
    {
      id: 'musik', type: 'text', title: 'Popmusik: Schlager, Krautrock, NDW und mehr',
      md: `
- **[Schlager](wiki:Schlager|Schlager music)**: der Sound der Wirtschaftswunderzeit bis heute — von [Peter Alexander](wiki:Peter Alexander|Peter Alexander (Austrian performer)) bis [Helene Fischer](wiki:Helene Fischer|Helene Fischer).
- [[krautrock|Krautrock]] (späte 1960er/70er): [Can](wiki:Can (Band)|Can (band)), [Neu!](wiki:Neu!|Neu!), [Tangerine Dream](wiki:Tangerine Dream|Tangerine Dream) — experimentell, hypnotisch, elektronisch. Die Düsseldorfer Band **[Kraftwerk](wiki:Kraftwerk|Power station)** (*[Autobahn](wiki:Autobahn (Album)|Autobahn (album))*, 1974; *[Die Roboter](wiki:Die Roboter|The Robots)*, 1978) gilt als Pionier der elektronischen Popmusik; [Techno](wiki:Techno|Techno), [Synthpop](wiki:Synthpop|Synth-pop) und [Hip-Hop](wiki:Hip-Hop|Hip-hop) berufen sich auf sie.[^wp-kraftwerk]
- [[neue-deutsche-welle|Neue Deutsche Welle]] (ca. 1980–1984): Pop mit deutschen Texten — [Ideal](wiki:Ideal (Band)|Ideal (German band)), [Trio](wiki:Trio (Band)|Trio (band)) (*Da Da Da*), [Extrabreit](wiki:Extrabreit|Extrabreit), [Peter Schilling](wiki:Peter Schilling|Peter Schilling). **[Nenas](wiki:Nena|Nena) *[99 Luftballons](wiki:99 Luftballons|99 Luftballons)*** (1983) schaffte es auf Platz 2 der US-Charts.[^wp-ndw]
- Liedermacher und Deutschrock: [Udo Lindenberg](wiki:Udo Lindenberg|Udo Lindenberg), [Herbert Grönemeyer](wiki:Herbert Grönemeyer|Herbert Grönemeyer) (*[Bochum](wiki:Bochum|Bochum)*, *Männer*, 1984), [Marius Müller-Westernhagen](wiki:Marius Müller-Westernhagen|Marius Müller-Westernhagen), [BAP](wiki:BAP|BAP (German band)) (auf [Kölsch](wiki:Kölsch (Sprache)|Colognian dialect))
- Punk und Rock: [Die Toten Hosen](wiki:Die Toten Hosen|Die Toten Hosen), [Die Ärzte](wiki:Die Ärzte|Die Ärzte), und **[Rammstein](wiki:Rammstein|Rammstein)** — die international erfolgreichste deutschsprachige Band
- Techno: Nach dem Mauerfall wurde [Berlin](wiki:Berlin|Berlin) zur Techno-Hauptstadt; die **[Love Parade](wiki:Loveparade|Love Parade)** (1989–2006 in Berlin) zog zeitweise über eine Million Menschen an.

Beim **[Eurovision Song Contest](wiki:Eurovision Song Contest|Eurovision Song Contest)** gewann Deutschland zweimal: 1982 mit [Nicole](wiki:Nicole (Sängerin, 1964)|Nicole Seibert) (*Ein bißchen Frieden*) und 2010 mit [Lena](wiki:Lena Meyer-Landrut|Lena Meyer-Landrut) (*Satellite*).`,
    },
    {
      id: 'tv', type: 'text', title: 'Fernsehen: gemeinsame Erinnerungen',
      md: `
Einige Sendungen kennt fast jeder: die **[Tagesschau](wiki:Tagesschau (ARD)|Tagesschau (German TV programme))** (seit 1952, die älteste noch laufende Nachrichtensendung im deutschen Fernsehen), der **[Tatort](wiki:Tatort (Fernsehreihe)|Tatort)** (seit 1970, sonntags um 20:15 Uhr), *[Die Sendung mit der Maus](wiki:Die Sendung mit der Maus|Die Sendung mit der Maus)* (seit 1971), *[Wetten, dass..?](wiki:Wetten, dass..?|Wetten, dass..?)* (1981–2014) und zu Silvester der Sketch *[Dinner for One](wiki:Dinner for One|Dinner for One)* — in Deutschland ein Kult, in Großbritannien fast unbekannt.`,
    },
    {
      id: 'map-pop-film',
      type: 'map',
      title: 'Orte der Film- und Popgeschichte',
      view: 'de',
      layers: { cities: false },
      points: [
        {
          lon: 13.1195,
          lat: 52.387,
          label: 'Babelsberg',
          kind: 'site',
          pos: 'l',
          detail: 'Seit 1912 Filmstudios: Hier drehten UFA und DEFA; *Metropolis* (1927) entstand in Babelsberg.',
        },
        {
          lon: 13.405,
          lat: 52.52,
          label: 'Berlin',
          kind: 'place',
          pos: 'r',
          detail: 'Die Berlinale findet seit 1951 hier statt; nach dem Mauerfall wurde Berlin zur Techno-Hauptstadt (Love Parade 1989–2006).',
        },
        {
          lon: 9.9937,
          lat: 53.5511,
          label: 'Hamburg',
          kind: 'place',
          pos: 'l',
          detail: 'Die *Tagesschau* wird seit 1952 in Hamburg produziert; die Beatles spielten hier 1960–1962 auf der Reeperbahn, und Udo Lindenberg lebt in Hamburg.',
        },
        {
          lon: 6.7735,
          lat: 51.2277,
          label: 'Düsseldorf',
          kind: 'place',
          pos: 'l',
          detail: 'Kraftwerk gründete sich 1970 in Düsseldorf und baute hier sein Kling-Klang-Studio.',
        },
        {
          lon: 6.8522,
          lat: 51.4703,
          label: 'Oberhausen',
          kind: 'site',
          pos: 'l',
          detail: 'Beim Kurzfilmfestival erklärten junge Filmemacher 1962 im *Oberhausener Manifest*: „Papas Kino ist tot.“',
        },
        {
          lon: 7.2166,
          lat: 51.4801,
          label: 'Bochum',
          kind: 'place',
          pos: 'r',
          detail: 'Herbert Grönemeyer wuchs in Bochum auf; sein Lied *Bochum* erschien 1984.',
        },
        {
          lon: 6.9603,
          lat: 50.9375,
          label: 'Köln',
          kind: 'place',
          pos: 'l',
          detail: 'BAP singt auf Kölsch; Köln ist einer der größten Medienstandorte Deutschlands.',
        },
      ],
      caption: 'Von den Babelsberger Studios bis zum Ruhrgebiet: Orte, an denen deutsche Film- und Popgeschichte geschrieben wurde.',
    },
    {
      id: 'match-filme', type: 'match', title: 'Regie ↔ Film',
      pairs: [
        ['Fritz Lang', 'Metropolis'],
        ['F. W. Murnau', 'Nosferatu'],
        ['Rainer Werner Fassbinder', 'Die Ehe der Maria Braun'],
        ['Wim Wenders', 'Der Himmel über Berlin'],
        ['Tom Tykwer', 'Lola rennt'],
        ['Wolfgang Becker', 'Good Bye, Lenin!'],
        ['Florian Henckel von Donnersmarck', 'Das Leben der Anderen'],
      ],
    },
    {
      id: 'timeline', type: 'game', viz: 'timeline', title: 'Filmgeschichte in Reihenfolge',
      params: {
        mode: 'sort',
        events: [
          { year: 1922, label: 'Nosferatu' },
          { year: 1927, label: 'Metropolis' },
          { year: 1930, label: 'Der blaue Engel' },
          { year: 1962, label: 'Oberhausener Manifest' },
          { year: 1981, label: 'Das Boot' },
          { year: 1998, label: 'Lola rennt' },
          { year: 2006, label: 'Das Leben der Anderen' },
          { year: 2022, label: 'Im Westen nichts Neues' },
        ],
      },
    },
    {
      id: 'map-pop-film-quiz',
      type: 'map',
      title: 'Wo entstand das?',
      view: 'de',
      layers: { cities: false },
      quiz: { rounds: 6 },
      points: [
        { lon: 13.1195, lat: 52.387, label: 'UFA-Studios (Babelsberg)', kind: 'site' },
        { lon: 6.7735, lat: 51.2277, label: 'Gründungsstadt von Kraftwerk' },
        { lon: 6.8522, lat: 51.4703, label: 'Ort des Oberhausener Manifests', kind: 'site' },
        { lon: 9.9937, lat: 53.5511, label: 'Produktionsort der Tagesschau' },
        { lon: 13.405, lat: 52.52, label: 'Stadt der Berlinale' },
        { lon: 7.2166, lat: 51.4801, label: 'Stadt aus Grönemeyers Song' },
      ],
    },
    {
      id: 'quiz-musik', type: 'quiz', title: 'Musik-Check',
      question: 'Welche Aussagen stimmen?',
      options: [
        { text: 'Kraftwerk gelten als Pioniere der elektronischen Popmusik.', correct: true, why: 'Ihr Einfluss reicht von Synthpop über Detroit-Techno bis zum Hip-Hop.' },
        { text: '*99 Luftballons* von Nena war auch in den USA ein Hit.', correct: true, why: 'Platz 2 der Billboard Hot 100 (1984).' },
        { text: 'Deutschland hat den Eurovision Song Contest noch nie gewonnen.', correct: false, why: 'Zweimal: 1982 (Nicole) und 2010 (Lena).' },
        { text: 'Die Neue Deutsche Welle war eine Bewegung der 1960er Jahre.', correct: false, why: 'Sie hatte ihren Höhepunkt um 1980–1984.' },
      ],
    },
    {
      id: 'order-oscars', type: 'order', title: 'Die Oscar-Gewinner',
      prompt: 'Sortiere die deutschen Oscar-Gewinner (bester internationaler Film) nach dem Jahr der Verleihung.',
      items: ['*Die Blechtrommel*', '*Nirgendwo in Afrika*', '*Das Leben der Anderen*', '*Im Westen nichts Neues*'],
      explain: '1980 → 2003 → 2007 → 2023.',
    },
    {
      id: 'berlinale-numeric', type: 'numeric', title: 'Festival-Alter',
      question: 'Die Berlinale wurde 1951 gegründet. Die wievielte Ausgabe fand im Februar 2025 statt, wenn es jedes Jahr genau ein Festival gab?',
      answer: 75, tolerance: 0,
      hint: 'Von 1951 bis 2025 sind es 74 Jahre — aber die erste Ausgabe zählt mit.',
      explain: '2025 − 1951 + 1 = 75. Die 75. Berlinale fand tatsächlich im Februar 2025 statt.',
    },
    {
      id: 'recall-weimar', type: 'recall', title: 'Warum verlor der deutsche Film seine Spitzenstellung?',
      prompt: 'In den 1920ern war der deutsche Film Weltspitze. Warum verlor er diese Stellung nach 1933?',
      answer: `Nach der Machtübernahme 1933 wurde die Filmindustrie **gleichgeschaltet** und in den Dienst der Propaganda gestellt (Goebbels, Reichsfilmkammer). Jüdische und politisch unerwünschte Filmschaffende wurden verfolgt und entlassen; viele der besten Regisseure, Autoren, Kameraleute und Schauspieler **emigrierten nach Hollywood** (Fritz Lang, Billy Wilder, Marlene Dietrich, Ernst Lubitsch war schon dort). Deren Talent stärkte Hollywood, während der deutsche Film künstlerisch verarmte — ein Verlust, von dem er sich lange nicht erholte.`,
      hints: ['Wohin gingen Fritz Lang und Billy Wilder?'],
      cards: ['exil-film'],
    },
  ],
  cards: [
    { id: 'ufa', front: 'Wofür steht UFA, und wo war ihr Studio?', back: 'Universum Film AG (1917); Studios in Potsdam-Babelsberg.' },
    { id: 'caligari', front: 'Welcher Film von 1920 begründete den expressionistischen Film?', back: '*Das Cabinet des Dr. Caligari* (Robert Wiene).' },
    { id: 'nosferatu', front: 'Wer drehte *Nosferatu* (1922)?', back: 'F. W. Murnau.' },
    { id: 'metropolis', front: '*Metropolis*: Regisseur und Jahr?', back: 'Fritz Lang, 1927 — heute UNESCO-Weltdokumentenerbe.' },
    { id: 'blauer-engel', front: 'Mit welchem Film wurde Marlene Dietrich zum Weltstar?', back: '*Der blaue Engel* (1930).' },
    { id: 'oberhausen', front: 'Was ist das Oberhausener Manifest?', back: '1962: „Papas Kino ist tot“ — Startschuss des Neuen Deutschen Films.' },
    { id: 'ndf', front: 'Vier Regisseure des Neuen Deutschen Films?', back: 'Fassbinder, Herzog, Wenders, Schlöndorff.' },
    { id: 'oscars', front: 'Die vier deutschen Oscar-Gewinner (internationaler Film)?', back: '*Die Blechtrommel* (1980), *Nirgendwo in Afrika* (2003), *Das Leben der Anderen* (2007), *Im Westen nichts Neues* (2023).' },
    { id: 'leben-anderen', front: 'Worum geht es in *Das Leben der Anderen*?', back: 'Ein Stasi-Offizier hört ein Künstlerpaar in Ost-Berlin ab und beginnt zu zweifeln.' },
    { id: 'berlinale', front: 'Berlinale: Gründung und Hauptpreis?', back: '1951; Goldener Bär.' },
    { id: 'kraftwerk', front: 'Warum ist Kraftwerk so einflussreich?', back: 'Pioniere der elektronischen Popmusik (*Autobahn*, 1974) — Vorbild für Synthpop, Techno, Hip-Hop.' },
    { id: 'krautrock', front: 'Drei Krautrock-Bands?', back: 'Can, Neu!, Tangerine Dream (frühe Kraftwerk).' },
    { id: 'ndw', front: 'Neue Deutsche Welle: Zeit und Hits?', back: 'Ca. 1980–1984; Nena *99 Luftballons*, Trio *Da Da Da*, Ideal *Blaue Augen*.' },
    { id: 'esc', front: 'Deutsche ESC-Siege?', back: '1982 Nicole (*Ein bißchen Frieden*), 2010 Lena (*Satellite*).' },
    { id: 'tatort', front: 'Seit wann läuft der *Tatort*?', back: 'Seit 1970.' },
    { id: 'tagesschau', front: 'Seit wann gibt es die *Tagesschau*?', back: 'Seit 1952.' },
    { id: 'exil-film', front: 'Welche Filmgrößen gingen nach 1933 nach Hollywood?', back: 'U. a. Fritz Lang, Billy Wilder, Marlene Dietrich.' },
  ],
};
