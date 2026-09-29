export default {
  id: 'welt',
  title: 'Die Welt: Kontinente & Länder',
  summary: 'Sieben Kontinente, fünf Ozeane, rund 8 Milliarden Menschen: das Grundgerüst, mit dem man jede Weltkarte und jede Nachricht einordnen kann — vom [[gradnetz|Gradnetz]] bis zu den Rekorden der Erde.',
  minutes: 25,
  goals: [
    'Kontinente und Ozeane nennen und nach Größe ordnen',
    'Mit dem [[gradnetz|Gradnetz]] Orte bestimmen: Breite, Länge, Äquator, Wendekreise',
    'Die wichtigsten Rekorde der Erde kennen',
    'Erklären, warum sich Kontinente bewegen ([[plattentektonik|Plattentektonik]])',
  ],
  blocks: [
    {
      id: 'erde', type: 'text', title: 'Unser Planet in Zahlen',
      md: `
Die Erde hat einen Radius von rund **6.371 km**; am [[aequator|Äquator]] misst ihr Umfang etwa **40.075 km**. Von ihrer Oberfläche (rund **510 Mio. km²**) sind etwa **71 % Wasser** — deshalb nennt man sie auch den „blauen Planeten“.[^wp-erde]

Die Landflächen teilt man in **[[kontinent|Kontinente]]** ein. Im deutschen Unterricht sind es meist sieben:

<table>
<tr><th>Kontinent</th><th>Fläche (rund)</th><th>Menschen (rund)</th></tr>
<tr><td>Asien</td><td>44,5 Mio. km²</td><td>4,8 Mrd.</td></tr>
<tr><td>Afrika</td><td>30,3 Mio. km²</td><td>1,5 Mrd.</td></tr>
<tr><td>Nordamerika (mit Mittelamerika)</td><td>24,7 Mio. km²</td><td>0,6 Mrd.</td></tr>
<tr><td>Südamerika</td><td>17,8 Mio. km²</td><td>0,4 Mrd.</td></tr>
<tr><td>Antarktika</td><td>14 Mio. km²</td><td>keine dauerhaften Einwohner</td></tr>
<tr><td>Europa</td><td>10,5 Mio. km²</td><td>0,74 Mrd.</td></tr>
<tr><td>Australien (Ozeanien)</td><td>8,5 Mio. km²</td><td>0,05 Mrd.</td></tr>
</table>

Wie viele Kontinente es „gibt“, ist Konvention: In Lateinamerika lernt man oft *América* als einen Kontinent, anderswo *Eurasien*.[^wp-kontinent]`,
    },
    {
      id: 'kontinente-flaeche', type: 'order', title: 'Kontinente nach Fläche',
      prompt: 'Sortiere die Kontinente nach ihrer **Fläche**, den größten zuerst.',
      items: ['Asien', 'Afrika', 'Nordamerika', 'Südamerika', 'Antarktika', 'Europa', 'Australien'],
      explain: 'Asien ist allein größer als Afrika und Europa zusammen. Überraschend für viele: **Antarktika** ist größer als Europa und Australien.',
    },
    {
      id: 'ozeane', type: 'text', title: 'Die Ozeane',
      md: `
Die großen Meeresbecken heißen **[[ozean|Ozeane]]**:

1. **Pazifik** (Pazifischer oder Stiller Ozean) — der größte und tiefste, größer als alle Landflächen zusammen. In ihm liegt der **[[marianengraben|Marianengraben]]** mit dem Challengertief, knapp 11.000 m tief.
2. **Atlantik** — zwischen Amerika auf der einen, Europa und Afrika auf der anderen Seite; er wächst jedes Jahr um einige Zentimeter.
3. **Indischer Ozean** — zwischen Afrika, Asien und Australien.
4. Dazu zählt man meist den **Arktischen Ozean** (Nordpolarmeer) und den **Südlichen Ozean** rund um die Antarktis.`,
    },
    {
      id: 'gradnetz-text', type: 'text', title: 'Das Gradnetz: die Adresse jedes Ortes',
      md: `
Jeder Ort der Erde lässt sich mit zwei Zahlen beschreiben:

- **Geografische Breite:** wie weit nördlich oder südlich des **Äquators** (0°) — bis 90° am Nord- bzw. Südpol. Linien gleicher Breite heißen **Breitenkreise**.
- **Geografische Länge:** wie weit östlich oder westlich des **[[nullmeridian|Nullmeridians]]** durch Greenwich (0°) — bis 180°. Die Linien heißen **Längenkreise** oder **Meridiane**.

Berlin liegt etwa bei **52,5° N, 13,4° O**. Besondere Breitenkreise: die **Wendekreise** bei ±23,4° (dort steht die Sonne einmal im Jahr mittags senkrecht) und die **Polarkreise** bei ±66,6° (ab dort gibt es Polartag und Polarnacht). Gegenüber dem Nullmeridian, bei 180°, verläuft grob die **Datumsgrenze**.`,
    },
    {
      id: 'gradnetz-spiel', type: 'game', viz: 'geo-gradnetz', title: 'Orte nach Koordinaten finden',
      intro: 'Wechsle zu „Orte finden“: Dir werden Koordinaten genannt, und du klickst die Stelle auf der Karte an. Fünf Treffer mit weniger als 1.000 km Abstand lösen die Aufgabe.',
      caption: 'Kartengrundlage: Natural Earth (gemeinfrei), Plattkarte.[^natural-earth]',
    },
    {
      id: 'quiz-gradnetz', type: 'quiz', title: 'Breite oder Länge?',
      question: 'Welche Aussagen zum Gradnetz stimmen?',
      options: [
        { text: 'Der Äquator ist der Breitenkreis 0°.', correct: true, why: 'Er teilt die Erde in Nord- und Südhalbkugel.' },
        { text: 'Der Nullmeridian verläuft durch Greenwich bei London.', correct: true, why: 'International festgelegt 1884.' },
        { text: 'Alle Längenkreise sind gleich lang.', correct: true, why: 'Jeder Meridian ist ein halber Großkreis von Pol zu Pol.' },
        { text: 'Alle Breitenkreise sind gleich lang.', correct: false, why: 'Nur der Äquator ist ein Großkreis; zu den Polen hin werden die Breitenkreise immer kürzer.' },
        { text: 'Deutschland liegt zwischen den Wendekreisen.', correct: false, why: 'Deutschland liegt bei etwa 47–55° N, also zwischen nördlichem Wendekreis und Polarkreis.' },
      ],
    },
    {
      id: 'aequator-umfang', type: 'numeric', title: 'Einmal um die Welt',
      question: 'Wie lang ist der Äquator ungefähr (in Kilometern)?',
      answer: 40075, tolerance: 500, unit: 'km',
      hint: 'Der Meter wurde ursprünglich so definiert, dass ein Viertel eines Meridians 10.000 km lang ist.',
      explain: 'Rund **40.075 km**. Der Meter wurde im 18. Jahrhundert als zehnmillionster Teil der Strecke vom Pol zum Äquator definiert — daher der „runde“ Erdumfang von etwa 40.000 km.',
    },
    {
      id: 'tektonik', type: 'text', title: 'Wandernde Kontinente',
      md: `
Schon auf alten Karten fällt auf, wie gut die Küsten von Südamerika und Afrika zusammenpassen. Der deutsche Meteorologe **Alfred Wegener** schloss daraus 1912: Die Kontinente bildeten einst einen Urkontinent — **Pangaea** — und sind auseinandergedriftet ([[kontinentaldrift|Kontinentaldrift]]).[^wp-wegener] Er wurde zu Lebzeiten verspottet, weil er keinen Antrieb erklären konnte.

Erst in den 1960er-Jahren setzte sich die **[[plattentektonik|Plattentektonik]]** durch: Die Erdkruste besteht aus großen Platten, die auf dem zähflüssigen Erdmantel wenige Zentimeter pro Jahr wandern.

- Wo Platten **zusammenstoßen**, falten sich Gebirge auf (Himalaya, Alpen) oder eine Platte taucht ab — mit Erdbeben und Vulkanen (Pazifischer Feuerring).
- Wo sie **auseinanderdriften**, entsteht neuer Meeresboden (Mittelatlantischer Rücken; Island liegt direkt darauf).`,
    },
    {
      id: 'rekorde', type: 'text', title: 'Rekorde der Erde',
      md: `
<table>
<tr><th>Rekord</th><th>Wer?</th></tr>
<tr><td>Höchster Berg</td><td>[[mount-everest|Mount Everest]], 8.849 m (Nepal/China)</td></tr>
<tr><td>Tiefste Meeresstelle</td><td>Challengertief im Marianengraben, knapp 11.000 m</td></tr>
<tr><td>Längster Fluss</td><td>Nil (≈ 6.650 km) — der Amazonas ist fast gleich lang und führt weit mehr Wasser</td></tr>
<tr><td>Größter See</td><td>Kaspisches Meer (≈ 371.000 km², ein Salzsee)</td></tr>
<tr><td>Tiefster See</td><td>Baikalsee in Sibirien (über 1.600 m)</td></tr>
<tr><td>Größte Insel</td><td>Grönland</td></tr>
<tr><td>Größte Hitzewüste</td><td>Sahara (die Antarktis ist als Kältewüste noch größer)</td></tr>
<tr><td>Flächengrößter Staat</td><td>Russland (≈ 17 Mio. km²), dann Kanada</td></tr>
<tr><td>Bevölkerungsreichster Staat</td><td>Indien (seit 2023 vor China)</td></tr>
<tr><td>Kleinster Staat</td><td>Vatikanstadt</td></tr>
</table>

Die **Weltbevölkerung** überschritt laut UN am **15. November 2022** die Marke von 8 Milliarden.[^un-8-milliarden] Die Vereinten Nationen haben **193 Mitgliedstaaten**.`,
    },
    {
      id: 'match-rekorde', type: 'match', title: 'Rekorde zuordnen',
      pairs: [['Höchster Berg', 'Mount Everest'], ['Größter See', 'Kaspisches Meer'], ['Tiefster See', 'Baikalsee'], ['Größte Insel', 'Grönland'], ['Größte Hitzewüste', 'Sahara'], ['Bevölkerungsreichster Staat', 'Indien']],
    },
    {
      id: 'fact-wegener', type: 'callout', tone: 'fact', title: 'Der Mann, der Recht behielt',
      md: `Alfred Wegener starb 1930 auf einer Expedition im grönländischen Eis — Jahrzehnte bevor seine Idee von den wandernden Kontinenten anerkannt wurde. Heute trägt das **Alfred-Wegener-Institut** in Bremerhaven, Deutschlands Zentrum für Polar- und Meeresforschung, seinen Namen.`,
    },
    {
      id: 'recall-tektonik', type: 'recall', title: 'Erkläre die Plattentektonik',
      prompt: 'Warum gibt es in Island Vulkane und im Himalaya die höchsten Berge der Welt? Erkläre mit der Plattentektonik in 3–4 Sätzen.',
      answer: `Die Erdkruste besteht aus **Platten**, die sich auf dem zähflüssigen Erdmantel einige Zentimeter pro Jahr bewegen. **Island** liegt auf dem Mittelatlantischen Rücken, wo die Nordamerikanische und die Eurasische Platte **auseinanderdriften**: Magma steigt auf, es entstehen Vulkane und neuer Meeresboden. Im **Himalaya** dagegen **stößt** die Indische Platte mit der Eurasischen zusammen; die Kruste wird gestaucht und aufgefaltet — so entstehen die höchsten Gebirge der Erde (und sie wachsen noch). Die Grundidee stammt von Alfred Wegeners Kontinentaldrift (1912).`,
      hints: ['Was passiert, wenn Platten auseinandergehen — und was, wenn sie kollidieren?'],
      cards: ['plattentektonik', 'wegener'],
    },
  ],
  cards: [
    { id: 'sieben', front: 'Die sieben Kontinente (nach deutscher Zählung)?', back: 'Asien, Afrika, Nordamerika, Südamerika, Antarktika, Europa, Australien (Ozeanien).' },
    { id: 'groesster-kontinent', front: 'Größter und kleinster Kontinent?', back: 'Größter: Asien (≈ 44,5 Mio. km²). Kleinster: Australien.' },
    { id: 'ozeane', front: 'Die drei großen Ozeane nach Größe?', back: 'Pazifik, Atlantik, Indischer Ozean (dazu Arktischer und Südlicher Ozean).' },
    { id: 'wasseranteil', front: 'Welcher Anteil der Erdoberfläche ist von Wasser bedeckt?', back: 'Rund 71 %.' },
    { id: 'aequator', front: 'Länge des Äquators?', back: 'Rund 40.075 km.' },
    { id: 'breite-laenge', front: 'Was geben geografische Breite und Länge an?', back: 'Breite: Nord–Süd-Lage vom Äquator (0°) bis zu den Polen (90°). Länge: Ost–West-Lage vom Nullmeridian in Greenwich (0°) bis 180°.' },
    { id: 'wendekreise', front: 'Wo liegen die Wendekreise und was passiert dort?', back: 'Bei etwa 23,4° N und S. Dort steht die Sonne einmal im Jahr (zur Sonnenwende) mittags senkrecht.' },
    { id: 'polarkreise', front: 'Was kennzeichnet die Polarkreise (≈ 66,6°)?', back: 'Jenseits davon gibt es mindestens einen Tag Polartag (Mitternachtssonne) und Polarnacht im Jahr.' },
    { id: 'berlin-koord', front: 'Ungefähre Koordinaten von Berlin?', back: 'Etwa 52,5° N, 13,4° O.' },
    { id: 'everest', front: 'Höchster Berg der Erde — Höhe?', back: 'Mount Everest, 8.849 m (Himalaya, Nepal/China). Erstbesteigung 1953 (Hillary, Tenzing Norgay).' },
    { id: 'marianen', front: 'Tiefste Stelle der Weltmeere?', back: 'Das Challengertief im Marianengraben (westlicher Pazifik), knapp 11.000 m.' },
    { id: 'nil', front: 'Längster Fluss der Erde?', back: 'Der Nil (≈ 6.650 km) — knapp vor dem Amazonas, der aber das meiste Wasser führt. Die Rangfolge ist umstritten.' },
    { id: 'kaspi', front: 'Größter See der Erde?', back: 'Das Kaspische Meer (≈ 371.000 km², Salzsee). Tiefster See: der Baikalsee.' },
    { id: 'indien', front: 'Bevölkerungsreichster Staat der Welt?', back: 'Indien — seit 2023 vor China (UN-Schätzung).' },
    { id: '8mrd', front: 'Wann überschritt die Weltbevölkerung 8 Milliarden?', back: 'Am 15. November 2022 (Festlegung der UN).' },
    { id: 'plattentektonik', front: 'Was passiert, wo tektonische Platten zusammenstoßen bzw. auseinanderdriften?', back: 'Zusammenstoß: Gebirgsbildung (Himalaya, Alpen), Erdbeben, Vulkane an Subduktionszonen. Auseinanderdriften: neuer Meeresboden, Vulkanismus (Mittelatlantischer Rücken, Island).' },
    { id: 'wegener', front: 'Wer entwickelte die Theorie der Kontinentaldrift — und wann?', back: 'Alfred Wegener, 1912 (Urkontinent Pangaea).' },
  ],
};
