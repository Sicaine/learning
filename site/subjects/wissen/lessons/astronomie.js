export default {
  id: 'astronomie',
  title: 'Astronomie: Sonnensystem & Universum',
  summary: 'Vom Sonnensystem über die Milchstraße bis zum [[urknall]]: wo wir im Universum stehen, wie wir das herausgefunden haben — und wie klein und groß die Zahlen dabei werden.',
  minutes: 22,
  goals: [
    'Die acht Planeten in der richtigen Reihenfolge nennen und Gesteins- von Gasplaneten unterscheiden',
    'Die kopernikanische Wende zum [[heliozentrisches-weltbild|heliozentrischen Weltbild]] erklären',
    'Mit [[lichtjahr|Lichtjahren]] umgehen und die Größenordnungen von Sonnensystem, [[galaxie]] und Universum einordnen',
    'Den [[urknall]] und die wichtigsten Meilensteine der Raumfahrt kennen',
  ],
  blocks: [
    {
      id: 'sonnensystem', type: 'text', title: 'Unser Sonnensystem',
      md: `
Im Zentrum des [[sonnensystem|Sonnensystems]] steht die **[Sonne](wiki:Sonne|Sun)**, ein durchschnittlicher Stern, rund 4,6 Milliarden Jahre alt. Sie enthält über 99,8 % der gesamten Masse des Systems.[^nat-wp-sonnensystem] Um sie kreisen acht Planeten:

- **[Gesteinsplaneten](wiki:Terrestrischer Planet|Terrestrial planet)** (innen): **[Merkur](wiki:Merkur (Planet)|Mercury (planet)), [Venus](wiki:Venus (Planet)|Venus), [Erde](wiki:Erde|Earth), [Mars](wiki:Mars (Planet)|Mars)**
- **[Gasriesen](wiki:Gasplanet|Gas giant)**: **[Jupiter](wiki:Jupiter (Planet)|Jupiter), [Saturn](wiki:Saturn (Planet)|Saturn)**
- **Eisriesen**: **[Uranus](wiki:Uranus (Planet)|Uranus), [Neptun](wiki:Neptun (Planet)|Neptune)**

Zwischen Mars und Jupiter liegt der **[Asteroidengürtel](wiki:Asteroidengürtel|Asteroid belt)**, jenseits des Neptun der [Kuipergürtel](wiki:Kuipergürtel|Kuiper belt) mit **[Pluto](wiki:Pluto|Pluto)**. Pluto galt seit seiner Entdeckung 1930 als neunter Planet, wurde aber **2006** von der [Internationalen Astronomischen Union](wiki:Internationale Astronomische Union|International Astronomical Union) zum **[Zwergplaneten](wiki:Zwergplanet|Dwarf planet)** herabgestuft, weil er seine Umlaufbahn nicht von anderen Körpern „freigeräumt“ hat.[^nat-wp-pluto]

Merkspruch für die Reihenfolge: **„Mein Vater erklärt mir jeden Sonntag unseren Nachthimmel.“**

Die Entfernung Erde–Sonne (rund 150 Millionen km) heißt **[Astronomische Einheit](wiki:Astronomische Einheit|Astronomical unit)** (AE). Das Sonnenlicht braucht gut **8 Minuten** zu uns.`,
    },
    {
      id: 'order-planeten', type: 'order', title: 'Planeten sortieren',
      prompt: 'Bringe die Planeten in die richtige Reihenfolge — von der Sonne aus gesehen.',
      items: ['Merkur', 'Venus', 'Erde', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptun'],
      explain: '„**M**ein **V**ater **e**rklärt **m**ir **j**eden **S**onntag **u**nseren **N**achthimmel.“',
    },
    {
      id: 'viz-modell', type: 'viz', viz: 'natur-sonnensystem', title: 'Das Sonnensystem im Maßstab',
      intro: 'Stell dir die Sonne als Fußball vor. Wie groß ist dann die Erde — und wie weit weg? Die Daten stammen aus dem [NASA](wiki:National Aeronautics and Space Administration|NASA) Planetary Fact Sheet.[^nat-nasa-planets]',
      task: 'Wähle „maßstabsgetreu“ und klicke jeden der acht Planeten einmal an. Wie weit wäre der Neptun vom Fußball entfernt?',
    },
    {
      id: 'weltbild', type: 'text', title: 'Die kopernikanische Wende',
      md: `
Fast 1.500 Jahre lang galt das **[geozentrische Weltbild](wiki:Geozentrisches Weltbild|Geocentrism)** des griechischen Gelehrten [Claudius Ptolemäus](wiki:Claudius Ptolemäus|Ptolemy) (2. Jh.): Die Erde ruht im Mittelpunkt, Sonne, Mond und Planeten kreisen um sie. Die Kirche hatte es übernommen.

- **[Nikolaus Kopernikus](wiki:Nikolaus Kopernikus|Nicolaus Copernicus)**, Domherr im [Ermland](wiki:Ermland|Warmia), stellte 1543 in *[De revolutionibus orbium coelestium](wiki:De revolutionibus orbium coelestium|De revolutionibus orbium coelestium)* die Sonne ins Zentrum — das [[heliozentrisches-weltbild|heliozentrische Weltbild]].[^nat-wp-kopernikus]
- **[Galileo Galilei](wiki:Galileo Galilei|Galileo Galilei)** richtete ab 1609/10 als einer der Ersten ein [Fernrohr](wiki:Fernrohr|Refracting telescope) an den Himmel, entdeckte die vier großen [Jupitermonde](wiki:Galileische Monde|Galilean moons) und die Phasen der Venus — Beobachtungen, die gegen das geozentrische Modell sprachen. 1633 zwang ihn die [Inquisition](wiki:Inquisition|Inquisition) zum Widerruf („Und sie bewegt sich doch“ ist vermutlich eine Legende).
- **[Johannes Kepler](wiki:Johannes Kepler|Johannes Kepler)** fand 1609 und 1619 die **[Keplerschen Gesetze](wiki:Keplersche Gesetze|Kepler\'s laws of planetary motion)**: Die Planeten bewegen sich auf **[Ellipsen](wiki:Ellipse|Ellipse)**, nicht auf Kreisen.
- **[Isaac Newton](wiki:Isaac Newton|Isaac Newton)** erklärte 1687 mit der [[gravitation]], *warum* sie das tun.

Seitdem steht „kopernikanische Wende“ für jeden grundlegenden Perspektivwechsel.`,
    },
    {
      id: 'match-astronomen', type: 'match', title: 'Wer entdeckte was?',
      pairs: [['Kopernikus', 'Sonne im Mittelpunkt (1543)'], ['Galilei', 'Jupitermonde durchs Fernrohr'], ['Kepler', 'Elliptische Planetenbahnen'], ['Newton', 'Gravitationsgesetz'], ['Edwin Hubble', 'Das Universum dehnt sich aus'], ['Ptolemäus', 'Erde im Mittelpunkt']],
    },
    {
      id: 'universum', type: 'text', title: 'Lichtjahre, Galaxien und der Urknall',
      md: `
Jenseits des Sonnensystems werden Kilometer unpraktisch. Man misst in **[[lichtjahr|Lichtjahren]]**: der Strecke, die Licht in einem Jahr zurücklegt, rund **9,46 Billionen km**. Ein Lichtjahr ist also eine *Entfernung*, keine Zeit.

- Nächster Stern nach der Sonne: **[Proxima Centauri](wiki:Proxima Centauri|Proxima Centauri)**, rund **4,2 Lichtjahre**.
- Unsere [[galaxie]], die **[Milchstraße](wiki:Milchstraße|Milky Way)**, hat einen Durchmesser von etwa 100.000 Lichtjahren und 100 bis 400 Milliarden Sterne.[^nat-wp-milchstrasse] Die Sonne liegt rund 26.000 Lichtjahre vom Zentrum entfernt, in dem ein [[schwarzes-loch|Schwarzes Loch]] sitzt.
- Nächste große Galaxie: der **[Andromedanebel](wiki:Andromedagalaxie|Andromeda Galaxy)**, etwa 2,5 Millionen Lichtjahre entfernt.

1929 entdeckte **[Edwin Hubble](wiki:Edwin Hubble|Edwin Hubble)**, dass sich die Galaxien voneinander entfernen — je weiter weg, desto schneller. Das Universum **dehnt sich aus**. Rückwärts gerechnet war alles einst extrem dicht und heiß: der **[[urknall]]** vor rund **13,8 Milliarden Jahren**.[^nat-wp-urknall] Die Erde ist etwa 4,5 Milliarden Jahre alt.`,
    },
    {
      id: 'calc-licht', type: 'numeric', title: 'Blick in die Vergangenheit',
      question: 'Licht legt rund **300.000 km pro Sekunde** zurück. Die Sonne ist rund **150 Millionen km** entfernt. Wie viele **Sekunden** braucht ihr Licht bis zur Erde?',
      answer: 500, tolerance: 5, unit: 's',
      hint: '150.000.000 ÷ 300.000.',
      explain: '150.000.000 km ÷ 300.000 km/s = **500 Sekunden**, also gut 8 Minuten. Würde die Sonne plötzlich erlöschen, merkten wir es erst nach 8 Minuten.',
    },
    {
      id: 'raumfahrt', type: 'text', title: 'Raumfahrt: der Aufbruch ins All',
      md: `
Der Wettlauf ins All war Teil des [Kalten Krieges](wiki:Kalter Krieg|Cold War). Die [Sowjetunion](wiki:Sowjetunion|Soviet Union) legte vor: **[Sputnik 1](wiki:Sputnik 1|Sputnik 1)** (4. Oktober 1957) war der erste künstliche Satellit, **[Juri Gagarin](wiki:Juri Alexejewitsch Gagarin|Yuri Gagarin)** am 12. April 1961 der erste Mensch im Weltall. Die USA antworteten mit dem [Apollo-Programm](wiki:Apollo-Programm|Apollo program): Am **20. Juli 1969** (in Europa bereits der 21. Juli) betrat **[Neil Armstrong](wiki:Neil Armstrong|Neil Armstrong)** mit [Apollo 11](wiki:Apollo 11|Apollo 11) als erster Mensch den Mond — „Das ist ein kleiner Schritt für einen Menschen, aber ein riesiger Sprung für die Menschheit.“ Mit ihm landete [Buzz Aldrin](wiki:Buzz Aldrin|Buzz Aldrin), [Michael Collins](wiki:Michael Collins (Astronaut)|Michael Collins (astronaut)) blieb im Orbit.[^nat-wp-apollo11]

Weitere Meilensteine: 1978 flog mit **[Sigmund Jähn](wiki:Sigmund Jähn|Sigmund Jähn)** (DDR) der erste Deutsche ins All; seit 2000 ist die **[Internationale Raumstation](wiki:Internationale Raumstation|International Space Station) ISS** ständig bewohnt; das Weltraumteleskop **[Hubble](wiki:Hubble-Weltraumteleskop|Hubble Space Telescope)** (1990) und sein Nachfolger **[James Webb](wiki:James-Webb-Weltraumteleskop|James Webb Space Telescope)** (Start Ende 2021) blicken bis fast zum Anfang des Universums.`,
    },
    {
      id: 'map-raumfahrt', type: 'map', title: 'Von hier ging es ins All',
      view: [-108, -8, 122, 62],
      layers: { rivers: false, mountains: false, cities: false, seaLabels: false, countryLabels: false },
      points: [
        { lon: 13.794, lat: 54.148, kind: 'site', label: 'Peenemünde', pos: 't', detail: 'In [Peenemünde](wiki:Heeresversuchsanstalt Peenemünde|Peenemünde Army Research Center) an der Ostsee wurde als Kriegswaffe die Rakete A4 („V2“) entwickelt; im Juni 1944 erreichte ein Testflug mit rund 176 km Höhe als erste Rakete den Weltraum.' },
        { lon: 63.305, lat: 45.965, kind: 'site', label: 'Baikonur', pos: 'b', detail: 'Vom [Kosmodrom Baikonur](wiki:Kosmodrom Baikonur|Baikonur Cosmodrome) in Kasachstan startete am 4. Oktober 1957 Sputnik 1 und am 12. April 1961 Juri Gagarin.' },
        { lon: 100.292, lat: 40.957, kind: 'site', label: 'Jiuquan', pos: 'b', detail: 'Vom [Kosmodrom Jiuquan](wiki:Kosmodrom Jiuquan|Jiuquan Satellite Launch Center) in China startete 2003 mit [Yang Liwei](wiki:Yang Liwei|Yang Liwei) der erste chinesische Raumfahrer.' },
        { lon: -80.651, lat: 28.585, kind: 'site', label: 'Cape Canaveral', pos: 'b', detail: 'Vom [Kennedy Space Center](wiki:Kennedy Space Center|Kennedy Space Center) in Florida startete am 16. Juli 1969 [Apollo 11](wiki:Apollo 11|Apollo 11) zum Mond.' },
        { lon: -52.754, lat: 5.222, kind: 'site', label: 'Kourou', pos: 'r', detail: 'Europas Weltraumbahnhof, das [Raumfahrtzentrum Guayana](wiki:Raumfahrtzentrum Guayana|Guiana Space Centre): Nahe am Äquator hilft die Erdrotation beim Start — hier starten die Ariane-Raketen.' },
      ],
      caption: 'Fünf wichtige Startplätze. Je näher am Äquator, desto mehr Schwung gibt die Erddrehung.',
    },
    {
      id: 'timeline-raum', type: 'game', viz: 'timeline', title: 'Chronologie des Himmels',
      params: {
        mode: 'sort',
        events: [
          { year: 1543, label: 'Kopernikus: De revolutionibus' },
          { year: 1610, label: 'Galilei: Jupitermonde' },
          { year: 1687, label: 'Newtons Gravitation' },
          { year: 1929, label: 'Hubble: Expansion' },
          { year: 1957, label: 'Sputnik 1' },
          { year: 1969, label: 'Mondlandung' },
          { year: 2006, label: 'Pluto wird Zwergplanet' },
          { year: 2019, label: 'Erstes Bild Schwarzes Loch' },
        ],
      },
    },
    {
      id: 'quiz-astro', type: 'quiz', title: 'Himmelskunde',
      question: 'Welche Aussagen stimmen?',
      options: [
        { text: 'Ein Lichtjahr ist eine Zeitspanne.', correct: false, why: 'Es ist eine Entfernung — rund 9,46 Billionen km.' },
        { text: 'Der heißeste Planet ist die Venus, nicht der Merkur.', correct: true, why: 'Ihre dichte CO₂-Atmosphäre erzeugt einen extremen Treibhauseffekt (rund 465 °C).' },
        { text: 'Jupiter ist der größte Planet des Sonnensystems.', correct: true, why: 'Über 1.300 Erden hätten in ihm Platz.' },
        { text: 'Der Urknall war eine Explosion an einem bestimmten Ort im Raum.', correct: false, why: 'Er war der Beginn der Ausdehnung des Raums selbst — überall gleichzeitig.' },
        { text: 'Der erste Mensch im All war Neil Armstrong.', correct: false, why: 'Das war [Juri Gagarin](wiki:Juri Alexejewitsch Gagarin|Yuri Gagarin) (1961); Armstrong war der erste auf dem Mond (1969).' },
      ],
    },
    {
      id: 'fact-galle', type: 'callout', tone: 'fact', title: 'Ein Planet, gefunden am Schreibtisch',
      md: `Der [Neptun](wiki:Neptun (Planet)|Neptune) wurde **berechnet, bevor man ihn sah**: Aus Unregelmäßigkeiten der [Uranus](wiki:Uranus (Planet)|Uranus)bahn schloss der Franzose [Urbain Le Verrier](wiki:Urbain Le Verrier|Urbain Le Verrier) auf einen unbekannten Planeten. [Johann Gottfried Galle](wiki:Johann Gottfried Galle|Johann Gottfried Galle) fand ihn am 23. September 1846 an der **[Berliner Sternwarte](wiki:Berliner Sternwarte|Berlin Observatory)** — nur etwa ein Grad von der vorhergesagten Position entfernt.`,
    },
    {
      id: 'recall-weltbild', type: 'recall', title: 'Erkläre es in eigenen Worten',
      prompt: 'Was änderte sich mit der **kopernikanischen Wende** — und warum war sie mehr als eine astronomische Detailfrage?',
      answer: `[Kopernikus](wiki:Nikolaus Kopernikus|Nicolaus Copernicus) (1543) ersetzte das geozentrische Weltbild, in dem die Erde ruhend im Zentrum steht, durch das **heliozentrische**: Die Erde ist ein Planet, der wie die anderen um die Sonne kreist und sich um die eigene Achse dreht. [Galilei](wiki:Galileo Galilei|Galileo Galilei) lieferte mit dem Fernrohr Belege, [Kepler](wiki:Johannes Kepler|Johannes Kepler) die genauen Bahnen, [Newton](wiki:Isaac Newton|Isaac Newton) die physikalische Erklärung. Das war eine Revolution, weil es den Menschen **aus dem Mittelpunkt der Welt** rückte und kirchliche Autorität infrage stellte (Galileis Prozess 1633) — und weil sich **Beobachtung und Mathematik gegen Tradition** durchsetzten, ein Grundstein der modernen Naturwissenschaft.`,
      hints: ['Was steht vorher, was nachher im Zentrum?', 'Was bedeutete das für die Stellung des Menschen — und für die Kirche?'],
      cards: ['kopernikus'],
    },
  ],
  cards: [
    { id: 'planeten', front: 'Die acht Planeten in der Reihenfolge ab Sonne', back: 'Merkur, Venus, Erde, Mars, Jupiter, Saturn, Uranus, Neptun („Mein Vater erklärt mir jeden Sonntag unseren Nachthimmel“).' },
    { id: 'gesteinsplaneten', front: 'Welche Planeten sind Gesteinsplaneten?', back: 'Merkur, Venus, Erde, Mars.' },
    { id: 'pluto', front: 'Seit wann ist Pluto kein Planet mehr?', back: 'Seit 2006 (Beschluss der Internationalen Astronomischen Union) — er ist ein Zwergplanet.' },
    { id: 'groesster', front: 'Größter Planet des Sonnensystems', back: 'Jupiter.' },
    { id: 'heissester', front: 'Heißester Planet', back: 'Venus (rund 465 °C, extremer Treibhauseffekt).' },
    { id: 'ae', front: 'Entfernung Erde–Sonne', back: 'Rund 150 Millionen km (= 1 Astronomische Einheit); Licht braucht gut 8 Minuten.' },
    { id: 'lichtjahr', front: 'Was ist ein Lichtjahr?', back: 'Die Strecke, die Licht in einem Jahr zurücklegt: rund 9,46 Billionen km — eine Entfernung.' },
    { id: 'proxima', front: 'Nächster Stern nach der Sonne', back: 'Proxima Centauri, rund 4,2 Lichtjahre entfernt.' },
    { id: 'milchstrasse', front: 'Wie groß ist die Milchstraße?', back: 'Etwa 100.000 Lichtjahre Durchmesser, 100–400 Milliarden Sterne.' },
    { id: 'andromeda', front: 'Nächste große Nachbargalaxie', back: 'Der Andromedanebel, rund 2,5 Millionen Lichtjahre entfernt.' },
    { id: 'urknall', front: 'Wie alt ist das Universum?', back: 'Rund 13,8 Milliarden Jahre (Urknall).' },
    { id: 'hubble', front: 'Was entdeckte Edwin Hubble 1929?', back: 'Dass sich die Galaxien voneinander entfernen — das Universum dehnt sich aus.' },
    { id: 'kopernikus', front: 'Kopernikanische Wende: wer, wann, was?', back: 'Nikolaus Kopernikus, 1543 (*De revolutionibus*): Die Sonne statt der Erde steht im Mittelpunkt.' },
    { id: 'galilei', front: 'Was entdeckte Galilei mit dem Fernrohr (ab 1609/10)?', back: 'U. a. die vier großen Jupitermonde und die Venusphasen; 1633 von der Inquisition verurteilt.' },
    { id: 'kepler', front: 'Kernaussage der Keplerschen Gesetze', back: 'Planeten bewegen sich auf Ellipsen um die Sonne (Kepler, 1609/1619).' },
    { id: 'sputnik', front: 'Erster Satellit und erster Mensch im All', back: 'Sputnik 1 (1957) und Juri Gagarin (12. April 1961), beide Sowjetunion.' },
    { id: 'mond', front: 'Erste Mondlandung', back: '20. Juli 1969, Apollo 11: Neil Armstrong und Buzz Aldrin (Michael Collins im Orbit).' },
    { id: 'jaehn', front: 'Erster Deutscher im All', back: 'Sigmund Jähn (DDR), 1978.' },
  ],
};
