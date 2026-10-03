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
Nach dem Zweiten Weltkrieg blieben zwei Supermächte übrig: die **USA** mit Demokratie und Marktwirtschaft und die **[Sowjetunion](wiki:Sowjetunion|Soviet Union) (UdSSR)** mit kommunistischer Einparteienherrschaft und Planwirtschaft. Aus Verbündeten wurden Gegner. Weil beide bald Atomwaffen besaßen (die UdSSR ab 1949), führten sie keinen direkten Krieg gegeneinander — daher „**[[kalter-krieg|Kalter Krieg]]**“.

[Winston Churchill](wiki:Winston Churchill|Winston Churchill) sprach 1946 von einem „**[[eiserner-vorhang|Eisernen Vorhang]]**“, der sich quer durch Europa gesenkt habe. Die USA stützten Westeuropa mit dem **[Marshallplan](wiki:Marshallplan|Marshall Plan)** (ab 1948). Militärisch standen sich die **[NATO](wiki:NATO|NATO)** (gegründet 1949) und der **[Warschauer Pakt](wiki:Warschauer Pakt|Warsaw Pact)** (1955) gegenüber. Die Frontlinie verlief mitten durch Deutschland; Berlin war ihr Brennpunkt — von der **[Berlin-Blockade](wiki:Berlin-Blockade|Berlin Blockade) 1948/49** mit der [Luftbrücke](wiki:Berliner Luftbrücke|Berlin Airlift) bis zum [Mauerbau](wiki:Berliner Mauer|Berlin Wall) 1961.[^wp-kalter-krieg]`,
    },
    {
      id: 'map-bloecke', type: 'map', title: 'Europa im Kalten Krieg (um 1960)',
      view: [-12, 34, 66, 72],
      layers: { cities: false, countryLabels: false, mountains: false },
      highlight: [
        { label: 'NATO', color: '#1d4ed8', countries: ['Belgien', 'Dänemark', 'Frankreich', 'Griechenland', 'Island', 'Italien', 'Luxemburg', 'Niederlande', 'Norwegen', 'Portugal', 'Türkei', 'Vereinigtes Königreich'], states: ['Schleswig-Holstein', 'Hamburg', 'Niedersachsen', 'Bremen', 'Nordrhein-Westfalen', 'Hessen', 'Rheinland-Pfalz', 'Saarland', 'Baden-Württemberg', 'Bayern'] },
        { label: 'Sowjetunion', color: '#b91c1c', countries: ['Russland', 'Ukraine', 'Belarus', 'Litauen', 'Lettland', 'Estland', 'Republik Moldau', 'Georgien', 'Armenien', 'Aserbaidschan', 'Kasachstan', 'Usbekistan', 'Turkmenistan'] },
        { label: 'Warschauer Pakt (ohne UdSSR)', color: '#ea580c', countries: ['Polen', 'Tschechien', 'Slowakei', 'Ungarn', 'Rumänien', 'Bulgarien', 'Albanien'], states: ['Mecklenburg-Vorpommern', 'Brandenburg', 'Sachsen-Anhalt', 'Sachsen', 'Thüringen'] },
      ],
      points: [
        { lon: 13.405, lat: 52.52, label: 'Berlin', kind: 'site', pos: 'l', detail: `**[Berlin](wiki:Berlin|Berlin)** — die geteilte Stadt mitten im Ostblock: [Berlin-Blockade](wiki:Berlin-Blockade|Berlin Blockade) 1948/49, [Mauerbau](wiki:Berliner Mauer|Berlin Wall) 1961.` },
        { lon: 37.617, lat: 55.756, label: 'Moskau', kind: 'capital', pos: 'r', detail: `**[Moskau](wiki:Moskau|Moscow)** — Hauptstadt der Sowjetunion und Zentrum des Ostblocks.` },
      ],
      caption: 'Die Farben zeigen **heutige Staaten** (Deutschland nach Bundesländern) und die Blockzugehörigkeit etwa 1960. Jugoslawien, Finnland, Schweden, Schweiz, Österreich, Spanien und Irland waren blockfrei oder neutral — sie sind nicht eingefärbt.',
    },
    {
      id: 'heisse-kriege', type: 'text', title: 'Stellvertreterkriege und Wettrüsten',
      md: `
Kalt war der Krieg nur zwischen den Supermächten. Anderswo wurde gekämpft: im **[Koreakrieg](wiki:Koreakrieg|Korean War)** (1950–1953), der die Halbinsel bis heute teilt, und im **[Vietnamkrieg](wiki:Vietnamkrieg|Vietnam War)**, in dem die USA bis 1973 kämpften; 1975 fiel [Saigon](wiki:Ho-Chi-Minh-Stadt|Ho Chi Minh City) an das kommunistische Nordvietnam.

Zugleich lieferten sich beide Seiten einen Wettlauf um Waffen und Prestige. Der sowjetische Satellit **[Sputnik](wiki:Sputnik 1|Sputnik 1)** (1957) schockierte den Westen; 1961 flog **[Juri Gagarin](wiki:Juri Gagarin|Yuri Gagarin)** als erster Mensch ins All. Die USA antworteten mit dem [Apollo-Programm](wiki:Apollo-Programm|Apollo program): Am **20./21. Juli 1969** betrat **[Neil Armstrong](wiki:Neil Armstrong|Neil Armstrong)** als erster Mensch den Mond.`,
    },
    {
      id: 'map-korea', type: 'map', title: 'Korea: eine Halbinsel, zwei Staaten',
      view: [123.5, 33, 131.5, 43.5],
      layers: { cities: false, countryLabels: false, mountains: false },
      highlight: [
        { label: 'Nordkorea (kommunistisch)', color: '#b91c1c', countries: ['Nordkorea'] },
        { label: 'Südkorea (mit den USA verbündet)', color: '#1d4ed8', countries: ['Südkorea'] },
      ],
      places: [
        { name: 'Pjöngjang', pos: 'r', detail: `**[Pjöngjang](wiki:Pjöngjang)** — Hauptstadt Nordkoreas.` },
        { name: 'Seoul', pos: 'l', detail: `**[Seoul](wiki:Seoul)** — Hauptstadt Südkoreas; im [Koreakrieg](wiki:Koreakrieg) 1950 mehrfach erobert.` },
        { name: 'Panmunjeom', kind: 'site', pos: 'r', detail: `**[Panmunjeom](wiki:Panmunjeom)** — 1953 wurde hier der Waffenstillstand unterzeichnet; ein Friedensvertrag fehlt bis heute.` },
      ],
      caption: 'Nach dem Koreakrieg (1950–1953) verläuft die Grenze nahe dem 38. Breitengrad — bis heute eine der am stärksten bewachten Grenzen der Welt.',
    },
    {
      id: 'map-vietnam', type: 'map', title: 'Vietnam: das geteilte Land',
      view: [101, 7.5, 111.5, 24.5],
      layers: { cities: false, countryLabels: true, mountains: false },
      highlight: [{ label: 'Vietnam (1954–1975 geteilt)', color: '#7c3aed', countries: ['Vietnam'] }],
      places: [
        { name: 'Hanoi', pos: 'r', detail: `**[Hanoi](wiki:Hanoi)** — Hauptstadt Nordvietnams, seit 1976 des vereinten Vietnams.` },
        { name: 'Ho-Chi-Minh-Stadt', label: 'Saigon', pos: 'r', detail: `**[Ho-Chi-Minh-Stadt](wiki:Ho-Chi-Minh-Stadt)** — als Saigon Hauptstadt Südvietnams; 1975 fiel sie an den kommunistischen Norden.` },
      ],
      caption: '1954 wurde Vietnam am 17. Breitengrad geteilt: im Norden ein kommunistischer, im Süden ein mit den USA verbündeter Staat. Der [Vietnamkrieg](wiki:Vietnamkrieg) endete 1975 mit dem Sieg des Nordens.',
    },
    {
      id: 'kuba', type: 'callout', tone: 'history', title: 'Dreizehn Tage im Oktober 1962',
      md: `Die Sowjetunion stationierte heimlich Atomraketen auf **[Kuba](wiki:Kuba|Cuba)**, nur rund 150 Kilometer vor der Küste Floridas. US-Präsident **[John F. Kennedy](wiki:John F. Kennedy|John F. Kennedy)** verhängte eine Seeblockade. Dreizehn Tage lang stand die Welt am Rand eines Atomkriegs, bis der sowjetische Staatschef **[Nikita Chruschtschow](wiki:Nikita Chruschtschow|Nikita Khrushchev)** die Raketen abziehen ließ — im Gegenzug zogen die USA später Raketen aus der Türkei ab. Danach richteten beide Seiten einen direkten „heißen Draht“ ein.`,
    },
    {
      id: 'map-kuba', type: 'map', title: 'Kuba, nur eine Seereise von Florida entfernt',
      view: [-90, 19, -74, 29],
      layers: { cities: false, countryLabels: false, mountains: false },
      highlight: [{ label: 'Kuba', color: '#b91c1c', countries: ['Kuba'] }],
      places: [
        { name: 'Havanna', kind: 'capital', pos: 'b', detail: `**[Havanna](wiki:Havanna|Havana)** — Hauptstadt Kubas; in der Nähe wurden 1962 sowjetische Raketenstellungen entdeckt.` },
        { name: 'Miami', pos: 'r', detail: `**[Miami](wiki:Miami|Miami)** — Zentrum der Exilkubaner in den USA.` },
      ],
      points: [
        { lon: -81.784, lat: 24.559, label: 'Key West', pos: 'l', detail: `**[Key West](wiki:Key West|Key West)** — der südlichste Punkt der Florida Keys, rund 170 km von Havanna entfernt.` },
      ],
      lines: [
        { color: '#0f172a', dashed: true, detail: `Key West liegt nur rund 170 km von Havanna entfernt.`, coords: [[-81.784, 24.559], [-82.386, 23.123]] },
      ],
      caption: 'Zwischen Key West und Havanna liegen nur rund 170 km. Die Atomraketen auf Kuba hätten fast jede Stadt der USA erreichen können; das war der Kern der [Kubakrise](wiki:Kubakrise|Cuban Missile Crisis) 1962.',
    },
    {
      id: 'dekolonisation', type: 'text', title: 'Dekolonisation: Die Kolonien werden unabhängig',
      md: `
Nach 1945 zerfielen die Kolonialreiche. **Indien** wurde **1947** unabhängig, maßgeblich durch den gewaltfreien Widerstand **[Mahatma Gandhis](wiki:Mahatma Gandhi|Mahatma Gandhi)** — und zugleich in Indien und Pakistan geteilt, begleitet von Gewalt und Millionen Flüchtlingen. **1949** rief **[Mao Zedong](wiki:Mao Zedong|Mao Zedong)** die Volksrepublik China aus. **1960** wurden allein in Afrika 17 Staaten unabhängig („**[Afrikanisches Jahr](wiki:Afrikanisches Jahr|Year of Africa)**“). Die [[dekolonisation|Dekolonisation]] verlief teils friedlich, teils in blutigen Kriegen wie in [Algerien](wiki:Algerienkrieg|Algerian War) (1954–1962).[^wp-dekolonisation]

Viele neue Staaten wollten sich keinem Block anschließen und gründeten die **[Bewegung der Blockfreien Staaten](wiki:Bewegung der Blockfreien Staaten|Non-Aligned Movement)** (1961).`,
    },
    {
      id: 'map-afrika-1960', type: 'map', title: 'Das „Afrikanische Jahr“ 1960',
      view: [-50, -36, 60, 38],
      proj: 'natural',
      layers: { cities: false },
      highlight: [
        { label: '1960 unabhängig geworden (17 Staaten)', color: '#047857', countries: ['Kamerun', 'Togo', 'Madagaskar', 'Demokratische Republik Kongo', 'Republik Kongo', 'Somalia', 'Benin', 'Niger', 'Burkina Faso', 'Elfenbeinküste', 'Tschad', 'Zentralafrikanische Republik', 'Gabun', 'Senegal', 'Mali', 'Nigeria', 'Mauretanien'] },
        { label: 'Algerien (Unabhängigkeit 1962 nach dem Krieg)', color: '#b91c1c', countries: ['Algerien'] },
      ],
      points: [
        { lon: 3.05, lat: 36.767, label: 'Algier', pos: 'r', detail: `**[Algier](wiki:Algier|Algiers)** — Zentrum des [Algerienkriegs](wiki:Algerienkrieg|Algerian War) (1954–1962) gegen die französische Kolonialherrschaft.` },
      ],
      caption: 'Heutige Staatsgrenzen; die Kolonialgrenzen waren oft willkürlich durch europäische Mächte gezogen worden.',
    },
    {
      id: 'ende', type: 'text', title: 'Das Ende des Kalten Kriegs',
      md: `
In den 1970er-Jahren folgte eine Phase der **Entspannung**: Abrüstungsverträge und die **[KSZE-Schlussakte von Helsinki](wiki:KSZE-Schlussakte|Helsinki Accords)** (1975), in der sich auch der Ostblock zu Menschenrechten bekannte. Nach neuer Aufrüstung in den frühen 1980ern leitete **[Michail Gorbatschow](wiki:Michail Gorbatschow|Mikhail Gorbachev)** ab 1985 Reformen ein: **[Glasnost](wiki:Glasnost|Glasnost)** (Offenheit) und **[Perestroika](wiki:Perestroika|Perestroika)** (Umbau).

1989 stürzten in Mittel- und Osteuropa die kommunistischen Regime, in Berlin fiel am 9. November die Mauer. Am **26. Dezember 1991** löste sich die **Sowjetunion** auf; 15 unabhängige Staaten entstanden, darunter Russland und die Ukraine. Der Kalte Krieg war vorbei.[^bpb-kalter-krieg]`,
    },
    {
      id: 'map-sowjet-nachfolger', type: 'map', title: 'Die 15 Nachfolgestaaten der Sowjetunion',
      view: [18, 36, 100, 72],
      layers: { cities: false, countryLabels: true, mountains: false },
      highlight: [{ label: 'Nachfolgestaaten (1991)', color: '#b91c1c', countries: ['Russland', 'Ukraine', 'Belarus', 'Republik Moldau', 'Estland', 'Lettland', 'Litauen', 'Georgien', 'Armenien', 'Aserbaidschan', 'Kasachstan', 'Usbekistan', 'Turkmenistan', 'Tadschikistan', 'Kirgisistan'] }],
      places: [{ name: 'Moskau', kind: 'capital', pos: 'r', detail: `**[Moskau](wiki:Moskau|Moscow)** — Hauptstadt der Sowjetunion und heute Russlands.` }],
      caption: 'Am 26. Dezember 1991 löste sich die [Sowjetunion](wiki:Sowjetunion|Soviet Union) auf. Russland erstreckt sich weiter nach Osten, als die Karte zeigt.',
    },
    {
      id: 'heute', type: 'text', title: 'Die Welt nach 1991',
      md: `
Das Ende der Blockkonfrontation brachte neue Konflikte und Krisen:

- **1990er:** Kriege im zerfallenden **[Jugoslawien](wiki:Jugoslawien|Yugoslavia)**, darunter das Massaker von **[Srebrenica](wiki:Massaker von Srebrenica|Srebrenica massacre)** 1995; **[Völkermord in Ruanda](wiki:Völkermord in Ruanda|Rwandan genocide)** 1994 mit etwa 800.000 Opfern.
- **[11. September 2001](wiki:Terroranschläge am 11. September 2001|September 11 attacks):** Terroranschläge von [al-Qaida](wiki:Al-Qaida|Al-Qaeda) in den USA; es folgen der Krieg in **[Afghanistan](wiki:Krieg in Afghanistan seit 2001|War in Afghanistan (2001–2021))** (2001–2021) und der **[Irakkrieg](wiki:Irakkrieg|Iraq War)** (ab 2003).
- **2008:** Die Pleite der US-Bank **[Lehman Brothers](wiki:Lehman Brothers|Lehman Brothers)** löst eine weltweite **[Finanzkrise](wiki:Weltfinanzkrise|2008 financial crisis)** aus.
- **2010/11:** Proteste des **[Arabischen Frühlings](wiki:Arabischer Frühling|Arab Spring)**; in [Syrien](wiki:Bürgerkrieg in Syrien|Syrian civil war) folgt ein langer Bürgerkrieg.
- **2014:** Russland annektiert die ukrainische Halbinsel **[Krim](wiki:Krim|Crimea)**.
- **2020:** Die **[Covid-19-Pandemie](wiki:COVID-19-Pandemie|COVID-19 pandemic)** verändert weltweit den Alltag.
- **24. Februar 2022:** Russland beginnt einen umfassenden **[Angriffskrieg gegen die Ukraine](wiki:Russischer Überfall auf die Ukraine seit 2022|Russo-Ukrainian war (2022–present))** — der größte Krieg in Europa seit 1945.`,
    },
    {
      id: 'map-krisen-heute', type: 'map', title: 'Krisenherde seit 1990',
      view: [-110, -40, 110, 62],
      layers: { cities: false, countryLabels: false, mountains: false },
      places: [
        { name: 'New York City', kind: 'battle', pos: 'r', detail: `**[New York](wiki:New York City|New York City)** — am 11. September 2001 zerstörten Terroristen das World Trade Center.` },
        { name: 'Kabul', pos: 'r', detail: `**[Kabul](wiki:Kabul|Kabul)** — nach 2001 begann der Krieg in Afghanistan; im August 2021 übernahmen die Taliban wieder die Macht.` },
        { name: 'Bagdad', pos: 'r', detail: `**[Bagdad](wiki:Bagdad|Baghdad)** — Ziel des [Irakkriegs](wiki:Irakkrieg|Iraq War) ab 2003.` },
        { name: 'Damaskus', pos: 'b', detail: `**[Damaskus](wiki:Damaskus|Damascus)** — Hauptstadt Syriens, wo seit 2011 ein [Bürgerkrieg](wiki:Bürgerkrieg in Syrien|Syrian civil war) tobte.` },
        { name: 'Kiew', pos: 'r', detail: `**[Kiew](wiki:Kiew|Kyiv)** — Hauptstadt der Ukraine; seit Februar 2022 greift Russland das Land an.` },
        { name: 'Sarajevo', pos: 'l', detail: `**[Sarajevo](wiki:Sarajevo|Sarajevo)** — wurde 1992–1996 belagert, im [Bosnienkrieg](wiki:Bosnienkrieg|Bosnian War).` },
      ],
      points: [
        { lon: 19.298, lat: 44.103, label: 'Srebrenica', kind: 'battle', pos: 'b', detail: `**[Srebrenica](wiki:Massaker von Srebrenica|Srebrenica massacre)** — 1995 ermordeten bosnisch-serbische Truppen rund 8.000 muslimische Männer und Jungen.` },
        { lon: 30.067, lat: -1.95, label: 'Kigali', kind: 'battle', pos: 'r', detail: `**[Kigali](wiki:Kigali|Kigali)** — Hauptstadt Ruandas; 1994 wurden im [Völkermord](wiki:Völkermord in Ruanda|Rwandan genocide) rund 800.000 Menschen ermordet.` },
        { lon: 33.522, lat: 44.595, label: 'Krim (Sewastopol)', pos: 'r', detail: `**[Sewastopol](wiki:Sewastopol|Sevastopol)** — die Krim wurde 2014 von Russland annektiert.` },
      ],
      caption: 'Eine Auswahl der Orte, die in dieser Lektion genannt werden.',
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
      id: 'map-quiz-kalter-krieg', type: 'map', title: 'Finde die Brennpunkte des Kalten Krieges',
      view: [-100, -10, 140, 62],
      proj: 'lcc',
      layers: { cities: false, countryLabels: false, mountains: false },
      quiz: { rounds: 6 },
      places: [{ name: 'Berlin' }, { name: 'Moskau' }, { name: 'Washington, D.C.' }, { name: 'Havanna' }, { name: 'Seoul' }, { name: 'Hanoi' }],
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
