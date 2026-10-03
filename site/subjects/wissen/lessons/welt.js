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
<tr><td>[Asien](wiki:Asien|Asia)</td><td>44,5 Mio. km²</td><td>4,8 Mrd.</td></tr>
<tr><td>[Afrika](wiki:Afrika|Africa)</td><td>30,3 Mio. km²</td><td>1,5 Mrd.</td></tr>
<tr><td>[Nordamerika](wiki:Nordamerika|North America) (mit Mittelamerika)</td><td>24,7 Mio. km²</td><td>0,6 Mrd.</td></tr>
<tr><td>[Südamerika](wiki:Südamerika|South America)</td><td>17,8 Mio. km²</td><td>0,4 Mrd.</td></tr>
<tr><td>[Antarktika](wiki:Antarktika|Antarctica)</td><td>14 Mio. km²</td><td>keine dauerhaften Einwohner</td></tr>
<tr><td>[Europa](wiki:Europa|Europe)</td><td>10,5 Mio. km²</td><td>0,74 Mrd.</td></tr>
<tr><td>[Australien](wiki:Australien (Kontinent)|Australia (continent)) (Ozeanien)</td><td>8,5 Mio. km²</td><td>0,05 Mrd.</td></tr>
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

1. **[Pazifik](wiki:Pazifischer Ozean|Pacific Ocean)** (Pazifischer oder Stiller Ozean) — der größte und tiefste, größer als alle Landflächen zusammen. In ihm liegt der **[[marianengraben|Marianengraben]]** mit dem [Challengertief](wiki:Challengertief|Challenger Deep), knapp 11.000 m tief.
2. **[Atlantik](wiki:Atlantischer Ozean|Atlantic Ocean)** — zwischen Amerika auf der einen, Europa und Afrika auf der anderen Seite; er wächst jedes Jahr um einige Zentimeter.
3. **[Indischer Ozean](wiki:Indischer Ozean|Indian Ocean)** — zwischen Afrika, Asien und Australien.
4. Dazu zählt man meist den **[Arktischen Ozean](wiki:Arktischer Ozean|Arctic Ocean)** (Nordpolarmeer) und den **[Südlichen Ozean](wiki:Südlicher Ozean|Southern Ocean)** rund um die Antarktis.`,
    },
    {
      id: 'map-welt-kontinente', type: 'map', title: 'Kontinente und Ozeane',
      view: [-180, -82, 180, 84],
      layers: { cities: false, rivers: false },
      points: [
        { lon: 90, lat: 45, label: 'ASIEN', kind: 'land', detail: '**[Asien](wiki:Asien|Asia)** — der größte Kontinent: rund 44,5 Mio. km² und etwa 4,8 Mrd. Menschen.' },
        { lon: 20, lat: 5, label: 'AFRIKA', kind: 'land', detail: '**[Afrika](wiki:Afrika|Africa)** — rund 30,3 Mio. km² und etwa 1,5 Mrd. Menschen.' },
        { lon: -100, lat: 45, label: 'NORDAMERIKA', kind: 'land', detail: '**[Nordamerika](wiki:Nordamerika|North America)** (mit Mittelamerika) — rund 24,7 Mio. km².' },
        { lon: -56, lat: -9, label: 'SÜDAMERIKA', kind: 'land', pos: 'l', detail: '**[Südamerika](wiki:Südamerika|South America)** — rund 17,8 Mio. km².' },
        { lon: 15, lat: 52, label: 'EUROPA', kind: 'land', pos: 't', detail: '**[Europa](wiki:Europa|Europe)** — rund 10,5 Mio. km², aber über 740 Mio. Menschen.' },
        { lon: 134, lat: -25, label: 'AUSTRALIEN', kind: 'land', detail: '**[Australien](wiki:Australien (Kontinent)|Australia (continent))** — der kleinste Kontinent, rund 8,5 Mio. km².' },
        { lon: -50, lat: -77, label: 'ANTARKTIKA', kind: 'land', detail: '**[Antarktika](wiki:Antarktika|Antarctica)** — rund 14 Mio. km², größer als Europa und Australien; keine dauerhaften Einwohner.' },
      ],
      caption: 'Die sieben Kontinente (großgeschrieben) und die großen Ozeane (kursiv). Tippe auf einen Kontinent für Fläche und Einwohner.',
    },
    {
      id: 'gradnetz-text', type: 'text', title: 'Das Gradnetz: die Adresse jedes Ortes',
      md: `
Jeder Ort der Erde lässt sich mit zwei Zahlen beschreiben:

- **Geografische Breite:** wie weit nördlich oder südlich des **Äquators** (0°) — bis 90° am Nord- bzw. Südpol. Linien gleicher Breite heißen **Breitenkreise**.
- **Geografische Länge:** wie weit östlich oder westlich des **[[nullmeridian|Nullmeridians]]** durch Greenwich (0°) — bis 180°. Die Linien heißen **Längenkreise** oder **Meridiane**.

Berlin liegt etwa bei **52,5° N, 13,4° O**. Besondere Breitenkreise: die **[Wendekreise](wiki:Wendekreis (Breitenkreis)|Tropical circle)** bei ±23,4° (dort steht die Sonne einmal im Jahr mittags senkrecht) und die **[Polarkreise](wiki:Polarkreis|Polar circle)** bei ±66,6° (ab dort gibt es Polartag und Polarnacht). Gegenüber dem Nullmeridian, bei 180°, verläuft grob die **[Datumsgrenze](wiki:Datumsgrenze|International Date Line)**.`,
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
Schon auf alten Karten fällt auf, wie gut die Küsten von Südamerika und Afrika zusammenpassen. Der deutsche Meteorologe **[Alfred Wegener](wiki:Alfred Wegener|Alfred Wegener)** schloss daraus 1912: Die Kontinente bildeten einst einen Urkontinent — **[Pangaea](wiki:Pangaea|Pangaea)** — und sind auseinandergedriftet ([[kontinentaldrift|Kontinentaldrift]]).[^wp-wegener] Er wurde zu Lebzeiten verspottet, weil er keinen Antrieb erklären konnte.

Erst in den 1960er-Jahren setzte sich die **[[plattentektonik|Plattentektonik]]** durch: Die Erdkruste besteht aus großen Platten, die auf dem zähflüssigen Erdmantel wenige Zentimeter pro Jahr wandern.

- Wo Platten **zusammenstoßen**, falten sich Gebirge auf ([Himalaya](wiki:Himalaya|Himalayas), [Alpen](wiki:Alpen|Alps)) oder eine Platte taucht ab — mit Erdbeben und Vulkanen ([Pazifischer Feuerring](wiki:Pazifischer Feuerring|Ring of Fire)).
- Wo sie **auseinanderdriften**, entsteht neuer Meeresboden ([Mittelatlantischer Rücken](wiki:Mittelatlantischer Rücken|Mid-Atlantic Ridge); [Island](wiki:Island|Iceland) liegt direkt darauf).`,
    },
    {
      id: 'map-welt-tektonik', type: 'map', title: 'Wo die Erde in Bewegung ist',
      view: [-180, -70, 180, 80],
      layers: { cities: false, rivers: false },
      points: [
        { lon: -21.121, lat: 64.259, label: 'Island: Platten driften auseinander', kind: 'site', pos: 'r', detail: 'In **[Þingvellir](wiki:Þingvellir)** (Island) lässt sich die Nahtstelle zwischen der Nordamerikanischen und der Eurasischen Platte als Spalte im Boden sehen.' },
        { lon: 86.925, lat: 27.988, label: 'Himalaya: Platten kollidieren', kind: 'peak', pos: 'l', detail: 'Im **[Himalaya](wiki:Himalaya|Himalayas)** stößt die Indische Platte auf die Eurasische — der Mount Everest wächst noch immer.' },
      ],
      lines: [
        { label: 'Mittelatlantischer Rücken', color: '#b45309', labelAt: 0.5, coords: [[-21.121, 64.259], [-27.213, 38.728], [-14.370, -7.940], [-12.286, -37.106], [3.362, -54.423]], detail: 'Am **[Mittelatlantischen Rücken](wiki:Mittelatlantischer Rücken|Mid-Atlantic Ridge)** driften Amerika und Europa/Afrika auseinander. Die Linie verbindet hier nur Inseln auf dem Rücken: Island, Azoren, Ascension, Tristan da Cunha, Bouvetinsel.' },
        { label: 'Feuerring (West)', color: '#dc2626', labelAt: 0.35, coords: [[174.776, -41.288], [147.167, -9.467], [121.000, 14.583], [139.774, 35.684], [158.650, 53.017]], detail: 'Der **[Pazifische Feuerring](wiki:Pazifischer Feuerring|Ring of Fire)** umrahmt den Pazifik mit Erdbeben und Vulkanen. Die Linie verbindet hier Orte entlang der Plattengrenzen.' },
        { label: 'Feuerring (Ost)', color: '#dc2626', labelAt: 0.5, coords: [[-149.883, 61.217], [-123.122, 49.281], [-122.419, 37.779], [-99.146, 19.419], [-78.510, -0.219], [-77.019, -12.035], [-70.667, -33.450]], detail: 'Der östliche Teil des **[Feuerrings](wiki:Pazifischer Feuerring|Ring of Fire)** folgt den Küsten Nord- und Südamerikas — mit dem Andengebirge und den Vulkanen Mittelamerikas.' },
      ],
      caption: 'Schematisch: Die Linien verbinden bekannte Orte an den Plattengrenzen und zeigen nur die Richtung — die genauen Grenzen verlaufen im Detail anders.',
    },
    {
      id: 'rekorde', type: 'text', title: 'Rekorde der Erde',
      md: `
<table>
<tr><th>Rekord</th><th>Wer?</th></tr>
<tr><td>Höchster Berg</td><td>[[mount-everest|Mount Everest]], 8.849 m (Nepal/China)</td></tr>
<tr><td>Tiefste Meeresstelle</td><td>Challengertief im Marianengraben, knapp 11.000 m</td></tr>
<tr><td>Längster Fluss</td><td>[Nil](wiki:Nil|Nile) (≈ 6.650 km) — der [Amazonas](wiki:Amazonas|Amazon River) ist fast gleich lang und führt weit mehr Wasser</td></tr>
<tr><td>Größter See</td><td>[Kaspisches Meer](wiki:Kaspisches Meer|Caspian Sea) (≈ 371.000 km², ein Salzsee)</td></tr>
<tr><td>Tiefster See</td><td>[Baikalsee](wiki:Baikalsee|Lake Baikal) in Sibirien (über 1.600 m)</td></tr>
<tr><td>Größte Insel</td><td>[Grönland](wiki:Grönland|Greenland)</td></tr>
<tr><td>Größte Hitzewüste</td><td>[Sahara](wiki:Sahara|Sahara) (die Antarktis ist als Kältewüste noch größer)</td></tr>
<tr><td>Flächengrößter Staat</td><td>[Russland](wiki:Russland|Russia) (≈ 17 Mio. km²), dann [Kanada](wiki:Kanada|Canada)</td></tr>
<tr><td>Bevölkerungsreichster Staat</td><td>[Indien](wiki:Indien|India) (seit 2023 vor China)</td></tr>
<tr><td>Kleinster Staat</td><td>[Vatikanstadt](wiki:Vatikanstadt|Vatican City)</td></tr>
</table>

Die **Weltbevölkerung** überschritt laut UN am **15. November 2022** die Marke von 8 Milliarden.[^un-8-milliarden] Die [Vereinten Nationen](wiki:Vereinte Nationen|United Nations) haben **193 Mitgliedstaaten**.`,
    },
    {
      id: 'map-welt-rekorde', type: 'map', title: 'Rekorde der Erde auf der Karte',
      view: [-180, -62, 180, 84],
      layers: { cities: false, rivers: false },
      highlight: [
        { countries: ['Russland', 'Kanada'], label: 'Flächengrößte Staaten', color: '#2563eb' },
        { countries: ['Indien'], label: 'Bevölkerungsreichster Staat', color: '#ea580c' },
      ],
      lines: [
        { label: 'Nil', color: '#2f6fb6', width: 2.6, labelAt: 0.5, coords: [[33.204, 0.424], [31.600, 4.850], [31.650, 9.530], [32.520, 15.580], [32.898, 24.094], [31.239, 30.056], [31.817, 31.417]], detail: 'Der **[Nil](wiki:Nil|Nile)** (≈ 6.650 km) gilt als längster Fluss der Erde: vom Viktoriasee durch Uganda, Südsudan, Sudan und Ägypten ins Mittelmeer. Der Verlauf ist hier schematisch über Städte am Fluss gezeichnet.' },
        { label: 'Amazonas', color: '#2f6fb6', width: 2.6, labelAt: 0.5, coords: [[-73.249, -3.755], [-60.017, -3.100], [-54.700, -2.450], [-51.058, 0.033]], detail: 'Der **[Amazonas](wiki:Amazonas|Amazon River)** ist fast so lang wie der Nil und führt weit mehr Wasser als jeder andere Fluss. Der Verlauf ist hier schematisch über Städte am Fluss gezeichnet.' },
        { label: 'Jangtse', color: '#2f6fb6', width: 2.2, labelAt: 0.5, coords: [[106.567, 29.558], [114.279, 30.573], [118.779, 32.044], [121.467, 31.233]], detail: 'Der **[Jangtse](wiki:Jangtse|Yangtze)** ist der längste Fluss Asiens. Der Verlauf ist hier schematisch über Städte am Fluss gezeichnet.' },
        { label: 'Mississippi', color: '#2f6fb6', width: 2.2, labelAt: 0.5, coords: [[-93.264, 44.980], [-90.199, 38.627], [-90.049, 35.149], [-90.075, 29.955]], detail: 'Der **[Mississippi](wiki:Mississippi (Fluss)|Mississippi River)** durchquert die USA von Nord nach Süd und mündet bei New Orleans in den Golf von Mexiko. Der Verlauf ist hier schematisch über Städte am Fluss gezeichnet.' },
      ],
      points: [
        { lon: 86.925, lat: 27.988, label: 'Mount Everest', kind: 'peak', pos: 'r', detail: '**[Mount Everest](wiki:Mount Everest|Mount Everest)** — mit 8.849 m der höchste Berg der Erde (Nepal/China).' },
        { lon: 142.592, lat: 11.373, label: 'Challengertief', pos: 'l', kind: 'site', detail: '**[Challengertief](wiki:Challengertief|Challenger Deep)** im [Marianengraben](wiki:Marianengraben|Mariana Trench) — die tiefste bekannte Stelle der Ozeane, knapp 11.000 m.' },
        { lon: 108.005, lat: 53.303, label: 'Baikalsee', color: '#2f6fb6', pos: 'r', detail: 'Der **[Baikalsee](wiki:Baikalsee|Lake Baikal)** ist mit über 1.600 m der tiefste See der Erde.' },
        { lon: 51.0, lat: 41.0, label: 'Kaspisches Meer', color: '#2f6fb6', pos: 'l', detail: 'Das **[Kaspische Meer](wiki:Kaspisches Meer|Caspian Sea)** ist der größte See der Erde (ein Salzsee).' },
        { lon: 13.0, lat: 23.0, label: 'Sahara', kind: 'land', detail: 'Die **[Sahara](wiki:Sahara|Sahara)** ist die größte Hitzewüste der Erde.' },
        { lon: -40.0, lat: 72.0, label: 'Grönland', kind: 'land', detail: '**[Grönland](wiki:Grönland|Greenland)** ist die größte Insel der Erde.' },
      ],
      caption: 'Die Flüsse sind schematisch über Städte am Ufer gezeichnet. Der Nil (≈ 6.650 km) und der Amazonas sind die längsten; dazu Jangtse und Mississippi. Blau: Russland und Kanada (größte Fläche); orange: Indien (meiste Einwohner).',
    },
    {
      id: 'match-rekorde', type: 'match', title: 'Rekorde zuordnen',
      pairs: [['Höchster Berg', 'Mount Everest'], ['Größter See', 'Kaspisches Meer'], ['Tiefster See', 'Baikalsee'], ['Größte Insel', 'Grönland'], ['Größte Hitzewüste', 'Sahara'], ['Bevölkerungsreichster Staat', 'Indien']],
    },
    {
      id: 'map-quiz-welt', type: 'map', title: 'Finde die Rekorde',
      view: [-180, -62, 180, 84],
      layers: { cities: false, rivers: false },
      quiz: { rounds: 7 },
      lines: [
        { label: 'Nil', color: '#2f6fb6', width: 2.6, quiz: true, coords: [[33.204, 0.424], [31.600, 4.850], [31.650, 9.530], [32.520, 15.580], [32.898, 24.094], [31.239, 30.056], [31.817, 31.417]] },
        { label: 'Amazonas', color: '#2f6fb6', width: 2.6, quiz: true, coords: [[-73.249, -3.755], [-60.017, -3.100], [-54.700, -2.450], [-51.058, 0.033]] },
      ],
      points: [
        { lon: 86.925, lat: 27.988, label: 'Mount Everest', kind: 'peak' },
        { lon: 142.592, lat: 11.373, label: 'Challengertief', kind: 'site' },
        { lon: 108.005, lat: 53.303, label: 'Baikalsee', kind: 'site' },
        { lon: 51.0, lat: 41.0, label: 'Kaspisches Meer', kind: 'site' },
        { lon: 13.0, lat: 23.0, label: 'Sahara', kind: 'site' },
        { lon: -40.0, lat: 72.0, label: 'Grönland', kind: 'site' },
      ],
    },
    {
      id: 'fact-wegener', type: 'callout', tone: 'fact', title: 'Der Mann, der Recht behielt',
      md: `[Alfred Wegener](wiki:Alfred Wegener|Alfred Wegener) starb 1930 auf einer Expedition im grönländischen Eis — Jahrzehnte bevor seine Idee von den wandernden Kontinenten anerkannt wurde. Heute trägt das **[Alfred-Wegener-Institut](wiki:Alfred-Wegener-Institut|Alfred Wegener Institute for Polar and Marine Research)** in [Bremerhaven](wiki:Bremerhaven|Bremerhaven), Deutschlands Zentrum für Polar- und Meeresforschung, seinen Namen.`,
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
