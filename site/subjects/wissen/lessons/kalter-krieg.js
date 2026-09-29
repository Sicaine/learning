export default {
  id: 'kalter-krieg',
  title: 'Kalter Krieg & Welt von heute',
  summary: 'Nach 1945 teilte sich die Welt in zwei Blöcke. Wie der Kalte Krieg ablief, warum er 1991 endete — und welche Krisen die Welt seither geprägt haben.',
  minutes: 24,
  goals: [
    'Den [[kalter-krieg|Kalten Krieg]] als Systemkonflikt erklären und seine Blöcke benennen',
    'Wichtige Krisen wie Berlin-Blockade, Koreakrieg und [[kuba-krise|Kuba-Krise]] einordnen',
    'Die [[dekolonisation|Dekolonisation]] mit Beispielen beschreiben',
    'Die wichtigsten Weltereignisse nach 1991 mit Jahreszahlen nennen',
  ],
  blocks: [
    {
      id: 'zwei-bloecke', type: 'text', title: 'Zwei Blöcke, zwei Systeme',
      md: `
Nach dem Zweiten Weltkrieg blieben zwei Supermächte übrig: die **USA** mit Demokratie und Marktwirtschaft und die **Sowjetunion (UdSSR)** mit kommunistischer Einparteienherrschaft und Planwirtschaft. Aus Verbündeten wurden Gegner. Weil beide bald Atomwaffen besaßen (die UdSSR ab 1949), führten sie keinen direkten Krieg gegeneinander — daher „**[[kalter-krieg|Kalter Krieg]]**“.

Winston Churchill sprach 1946 von einem „**[[eiserner-vorhang|Eisernen Vorhang]]**“, der sich quer durch Europa gesenkt habe. Die USA stützten Westeuropa mit dem **Marshallplan** (ab 1948). Militärisch standen sich die **NATO** (gegründet 1949) und der **Warschauer Pakt** (1955) gegenüber. Die Frontlinie verlief mitten durch Deutschland; Berlin war ihr Brennpunkt — von der **Berlin-Blockade 1948/49** mit der Luftbrücke bis zum Mauerbau 1961.[^wp-kalter-krieg]`,
    },
    {
      id: 'heisse-kriege', type: 'text', title: 'Stellvertreterkriege und Wettrüsten',
      md: `
Kalt war der Krieg nur zwischen den Supermächten. Anderswo wurde gekämpft: im **Koreakrieg** (1950–1953), der die Halbinsel bis heute teilt, und im **Vietnamkrieg**, in dem die USA bis 1973 kämpften; 1975 fiel Saigon an das kommunistische Nordvietnam.

Zugleich lieferten sich beide Seiten einen Wettlauf um Waffen und Prestige. Der sowjetische Satellit **Sputnik** (1957) schockierte den Westen; 1961 flog **Juri Gagarin** als erster Mensch ins All. Die USA antworteten mit dem Apollo-Programm: Am **20./21. Juli 1969** betrat **Neil Armstrong** als erster Mensch den Mond.`,
    },
    {
      id: 'kuba', type: 'callout', tone: 'history', title: 'Dreizehn Tage im Oktober 1962',
      md: `Die Sowjetunion stationierte heimlich Atomraketen auf **Kuba**, nur rund 150 Kilometer vor der Küste Floridas. US-Präsident **John F. Kennedy** verhängte eine Seeblockade. Dreizehn Tage lang stand die Welt am Rand eines Atomkriegs, bis der sowjetische Staatschef **Nikita Chruschtschow** die Raketen abziehen ließ — im Gegenzug zogen die USA später Raketen aus der Türkei ab. Danach richteten beide Seiten einen direkten „heißen Draht“ ein.`,
    },
    {
      id: 'dekolonisation', type: 'text', title: 'Dekolonisation: Die Kolonien werden unabhängig',
      md: `
Nach 1945 zerfielen die Kolonialreiche. **Indien** wurde **1947** unabhängig, maßgeblich durch den gewaltfreien Widerstand **Mahatma Gandhis** — und zugleich in Indien und Pakistan geteilt, begleitet von Gewalt und Millionen Flüchtlingen. **1949** rief **Mao Zedong** die Volksrepublik China aus. **1960** wurden allein in Afrika 17 Staaten unabhängig („**Afrikanisches Jahr**“). Die [[dekolonisation|Dekolonisation]] verlief teils friedlich, teils in blutigen Kriegen wie in Algerien (1954–1962).[^wp-dekolonisation]

Viele neue Staaten wollten sich keinem Block anschließen und gründeten die **Bewegung der Blockfreien Staaten** (1961).`,
    },
    {
      id: 'ende', type: 'text', title: 'Das Ende des Kalten Kriegs',
      md: `
In den 1970er-Jahren folgte eine Phase der **Entspannung**: Abrüstungsverträge und die **KSZE-Schlussakte von Helsinki** (1975), in der sich auch der Ostblock zu Menschenrechten bekannte. Nach neuer Aufrüstung in den frühen 1980ern leitete **Michail Gorbatschow** ab 1985 Reformen ein: **Glasnost** (Offenheit) und **Perestroika** (Umbau).

1989 stürzten in Mittel- und Osteuropa die kommunistischen Regime, in Berlin fiel am 9. November die Mauer. Am **26. Dezember 1991** löste sich die **Sowjetunion** auf; 15 unabhängige Staaten entstanden, darunter Russland und die Ukraine. Der Kalte Krieg war vorbei.[^bpb-kalter-krieg]`,
    },
    {
      id: 'heute', type: 'text', title: 'Die Welt nach 1991',
      md: `
Das Ende der Blockkonfrontation brachte neue Konflikte und Krisen:

- **1990er:** Kriege im zerfallenden **Jugoslawien**, darunter das Massaker von **Srebrenica** 1995; **Völkermord in Ruanda** 1994 mit etwa 800.000 Opfern.
- **11. September 2001:** Terroranschläge von al-Qaida in den USA; es folgen der Krieg in **Afghanistan** (2001–2021) und der **Irakkrieg** (ab 2003).
- **2008:** Die Pleite der US-Bank **Lehman Brothers** löst eine weltweite **Finanzkrise** aus.
- **2010/11:** Proteste des **Arabischen Frühlings**; in Syrien folgt ein langer Bürgerkrieg.
- **2014:** Russland annektiert die ukrainische Halbinsel **Krim**.
- **2020:** Die **Covid-19-Pandemie** verändert weltweit den Alltag.
- **24. Februar 2022:** Russland beginnt einen umfassenden **Angriffskrieg gegen die Ukraine** — der größte Krieg in Europa seit 1945.`,
    },
    {
      id: 'tl-explore', type: 'viz', viz: 'timeline', title: 'Von 1945 bis heute',
      params: { events: [
        { year: 1945, label: 'Gründung der UNO' },
        { year: 1949, label: 'NATO gegründet' },
        { year: 1957, label: 'Sputnik' },
        { year: 1962, label: 'Kuba-Krise' },
        { year: 1969, label: 'Mondlandung' },
        { year: 1989, label: 'Fall der Mauer' },
        { year: 1991, label: 'Ende der UdSSR' },
        { year: 2001, label: '11. September' },
        { year: 2008, label: 'Finanzkrise' },
        { year: 2022, label: 'Angriff auf die Ukraine' },
      ] },
    },
    {
      id: 'tl-game', type: 'game', viz: 'timeline', title: 'Kalter Krieg in Reihenfolge',
      params: { mode: 'sort', events: [
        { year: 1947, label: 'Unabhängigkeit Indiens' },
        { year: 1948, label: 'Berlin-Blockade' },
        { year: 1950, label: 'Beginn Koreakrieg' },
        { year: 1955, label: 'Warschauer Pakt' },
        { year: 1961, label: 'Gagarin im All' },
        { year: 1962, label: 'Kuba-Krise' },
        { year: 1975, label: 'KSZE-Schlussakte' },
        { year: 1985, label: 'Gorbatschow an der Macht' },
      ] },
    },
    {
      id: 'match-personen', type: 'match', title: 'Wer gehört wozu?',
      pairs: [
        ['Winston Churchill', '„Eiserner Vorhang“ (1946)'],
        ['John F. Kennedy', 'Kuba-Krise'],
        ['Michail Gorbatschow', 'Glasnost und Perestroika'],
        ['Mahatma Gandhi', 'Gewaltfreie Unabhängigkeit Indiens'],
        ['Neil Armstrong', 'Erster Mensch auf dem Mond'],
      ],
    },
    {
      id: 'quiz-kalt', type: 'quiz', title: 'Warum „kalt“?',
      question: 'Warum nennt man den Konflikt „Kalten Krieg“?',
      options: [
        { text: 'Weil die Supermächte USA und UdSSR nie direkt gegeneinander Krieg führten.', correct: true, why: 'Die Angst vor einem Atomkrieg verhinderte den direkten Schlagabtausch; gekämpft wurde in Stellvertreterkriegen.' },
        { text: 'Weil er vor allem im Winter ausgetragen wurde.', correct: false, why: 'Mit Jahreszeiten hat der Begriff nichts zu tun.' },
        { text: 'Weil es keinerlei Todesopfer gab.', correct: false, why: 'In Stellvertreterkriegen wie Korea und Vietnam starben Millionen.' },
        { text: 'Weil er hauptsächlich in der Arktis stattfand.', correct: false, why: 'Die Frontlinie verlief quer durch Europa, besonders durch Deutschland.' },
      ],
    },
    {
      id: 'num-udssr', type: 'numeric', title: 'Das Ende einer Supermacht',
      question: 'In welchem Jahr löste sich die Sowjetunion auf?',
      answer: 1991, tolerance: 0,
      explain: 'Am **26. Dezember 1991**; 15 Nachfolgestaaten entstanden.',
    },
    {
      id: 'recall-ende', type: 'recall', title: 'Warum endete der Kalte Krieg?',
      prompt: 'Nenne mindestens drei Gründe, warum der Kalte Krieg 1989–1991 zu Ende ging.',
      answer: `Die **Planwirtschaft** der Sowjetunion war wirtschaftlich erschöpft, auch durch das teure **Wettrüsten** und den Krieg in Afghanistan (1979–1989). **Gorbatschow** leitete mit Glasnost und Perestroika Reformen ein und verzichtete darauf, Aufstände in Osteuropa militärisch niederzuschlagen. **Bürgerbewegungen** wie Solidarność in Polen und die Friedliche Revolution in der DDR erzwangen den Wandel. Auch die Menschenrechts-Zusagen der **KSZE** gaben Oppositionellen Rückhalt.`,
      hints: ['Wirtschaft, Personen, Menschen auf der Straße.'],
      cards: ['gorbatschow', 'udssr-ende'],
    },
  ],
  cards: [
    { id: 'kalter-krieg', front: 'Wer stand sich im Kalten Krieg gegenüber — und wie lange?', back: 'USA/Westen (NATO) gegen UdSSR/Ostblock (Warschauer Pakt), etwa 1947–1991.' },
    { id: 'eiserner-vorhang', front: 'Woher stammt der Ausdruck „Eiserner Vorhang“?', back: 'Aus einer Rede Winston Churchills 1946 in Fulton (USA).' },
    { id: 'marshallplan', front: 'Was war der Marshallplan?', back: 'US-Wiederaufbauprogramm für Westeuropa ab 1948.' },
    { id: 'nato-wp', front: 'Gründungsjahre von NATO und Warschauer Pakt?', back: 'NATO 1949, Warschauer Pakt 1955.' },
    { id: 'blockade', front: 'Was war die Berlin-Blockade?', back: '1948/49 sperrte die UdSSR die Zugänge nach West-Berlin; die Westmächte versorgten die Stadt per Luftbrücke.' },
    { id: 'korea', front: 'Wann war der Koreakrieg?', back: '1950–1953; Korea ist bis heute geteilt.' },
    { id: 'sputnik', front: 'Was war der „Sputnik-Schock“?', back: '1957 brachte die UdSSR den ersten Satelliten ins All — der Westen fühlte sich technisch überholt.' },
    { id: 'mond', front: 'Wann betraten Menschen erstmals den Mond?', back: '20./21. Juli 1969 (Apollo 11, Neil Armstrong).' },
    { id: 'kuba', front: 'Kuba-Krise: wann, wer, was?', back: 'Oktober 1962; sowjetische Atomraketen auf Kuba; Kennedy gegen Chruschtschow; die Raketen wurden abgezogen.' },
    { id: 'indien', front: 'Wann wurde Indien unabhängig?', back: '1947 (mit der Teilung in Indien und Pakistan).' },
    { id: 'afrika-1960', front: 'Warum heißt 1960 das „Afrikanische Jahr“?', back: 'In diesem Jahr wurden 17 afrikanische Staaten unabhängig.' },
    { id: 'gorbatschow', front: 'Wofür stehen Glasnost und Perestroika?', back: 'Gorbatschows Reformen ab 1985: Offenheit (Glasnost) und Umbau (Perestroika).' },
    { id: 'udssr-ende', front: 'Wann löste sich die Sowjetunion auf?', back: 'Am 26. Dezember 1991.' },
    { id: 'ruanda', front: 'Was geschah 1994 in Ruanda?', back: 'Völkermord an den Tutsi mit etwa 800.000 Opfern.' },
    { id: '911', front: 'Was geschah am 11. September 2001?', back: 'Terroranschläge von al-Qaida in New York und Washington; Folge u. a. der Afghanistan-Krieg.' },
    { id: 'finanzkrise', front: 'Welches Ereignis steht für den Beginn der Finanzkrise 2008?', back: 'Die Pleite der US-Investmentbank Lehman Brothers (September 2008).' },
    { id: 'ukraine', front: 'Wann begann Russlands umfassender Angriffskrieg gegen die Ukraine?', back: 'Am 24. Februar 2022 (die Krim hatte Russland bereits 2014 annektiert).' },
  ],
};
