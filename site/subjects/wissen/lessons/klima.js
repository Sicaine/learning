export default {
  id: 'klima',
  title: 'Klima, Klimazonen & Klimawandel',
  summary: 'Wetter ist heute, [[klima|Klima]] ist der lange Durchschnitt. Hier lernst du die Klimazonen der Erde kennen, verstehst den [[treibhauseffekt|Treibhauseffekt]] und kannst die wichtigsten Zahlen und Abkommen zum [[klimawandel|Klimawandel]] einordnen.',
  minutes: 25,
  goals: [
    'Wetter und Klima sauber unterscheiden',
    'Die Klimazonen der Erde nennen und Deutschland einordnen',
    'Den natürlichen und den menschengemachten Treibhauseffekt erklären',
    'Die Kernzahlen und Meilensteine der Klimapolitik kennen (1,5 °C, Paris 2015, 2045)',
  ],
  blocks: [
    {
      id: 'wetter-klima', type: 'text', title: 'Wetter oder Klima?',
      md: `
**Wetter** ist der Zustand der Atmosphäre an einem Ort zu einem Zeitpunkt: Heute regnet es in [Hamburg](wiki:Hamburg|Hamburg), 14 °C.

**[[klima|Klima]]** ist die Statistik des Wetters über lange Zeit — üblich sind **30-jährige Mittelwerte** von Temperatur, Niederschlag, Wind und Sonnenschein. Ein einzelner kalter Winter sagt deshalb nichts über den Klimawandel aus; entscheidend sind Trends über Jahrzehnte.

> Wetter ist, was du heute anziehst. Klima ist, was in deinem Kleiderschrank hängt.`,
    },
    {
      id: 'quiz-wetter', type: 'quiz', title: 'Wetter oder Klima?',
      question: 'Welche Aussagen beschreiben **Klima** (nicht Wetter)?',
      options: [
        { text: 'In Freiburg ist es im Jahresmittel wärmer als in Rostock.', correct: true, why: 'Ein langjähriger Durchschnitt — Klima.' },
        { text: 'Die Sommer in Deutschland sind seit 1990 im Mittel deutlich heißer geworden.', correct: true, why: 'Ein Trend über Jahrzehnte — Klima.' },
        { text: 'Morgen gibt es in München Gewitter.', correct: false, why: 'Eine Vorhersage für einen Tag — Wetter.' },
        { text: 'Der Januar 2024 war in Berlin ungewöhnlich mild.', correct: false, why: 'Ein einzelner Monat ist Wetter (bzw. Witterung) — erst viele solcher Monate ergeben einen Klimatrend.' },
      ],
    },
    {
      id: 'zonen', type: 'text', title: 'Die Klimazonen der Erde',
      md: `
Weil die Sonne am Äquator steil und an den Polen flach einstrahlt, ordnet sich das Klima grob in Gürteln an — den **[[klimazone|Klimazonen]]**. Die bekannteste Einteilung stammt vom Klimaforscher [Wladimir Köppen](wiki:Wladimir Köppen|Wladimir Köppen):

- **Tropisch** — heiß und feucht, kaum Jahreszeiten: Regenwälder am [Amazonas](wiki:Amazonas-Regenwald|Amazon rainforest), im [Kongobecken](wiki:Kongobecken|Congo Basin), in Indonesien.
- **Trocken** — Wüsten und Steppen: [Sahara](wiki:Sahara|Sahara), Arabien, Innerasien, Australiens [Outback](wiki:Outback).
- **Warmgemäßigt** — dazu gehört das **[Mittelmeerklima](wiki:Mittelmeerklima|Mediterranean climate)** mit trockenen Sommern und das ozeanische Klima Westeuropas.
- **Kaltgemäßigt (boreal)** — lange, kalte Winter, riesige Nadelwälder ([Taiga](wiki:Borealer Nadelwald|Taiga)) in Sibirien, [Skandinavien](wiki:Skandinavien|Scandinavia), [Kanada](wiki:Kanada|Canada).
- **Polar** — Eis und Tundra: [Arktis](wiki:Arktis|Arctic), [Grönland](wiki:Grönland|Greenland), [Antarktis](wiki:Antarktis|Antarctic).

**Deutschland** liegt in der **gemäßigten Zone**: im Westen eher ozeanisch (milde Winter, kühle Sommer), nach Osten kontinentaler (kältere Winter, wärmere Sommer). Dass es hier viel milder ist als etwa in Kanada auf gleicher Breite, verdanken wir auch dem **[[golfstrom|Golfstrom]]** und seinem Ausläufer, dem [Nordatlantikstrom](wiki:Nordatlantikstrom|North Atlantic Current).`,
    },
    {
      id: 'map-klimazonen', type: 'map', title: 'Die Klimagürtel der Erde',
      view: [-180, -84, 180, 84],
      layers: { cities: false, rivers: false },
      areas: [
        { label: 'Tropen (zwischen den Wendekreisen)', color: '#dc2626', coords: [[-180, 23.44], [-150, 23.44], [-120, 23.44], [-90, 23.44], [-60, 23.44], [-30, 23.44], [0, 23.44], [30, 23.44], [60, 23.44], [90, 23.44], [120, 23.44], [150, 23.44], [180, 23.44], [180, 13], [180, 3], [180, -7], [180, -17], [180, -23.44], [150, -23.44], [120, -23.44], [90, -23.44], [60, -23.44], [30, -23.44], [0, -23.44], [-30, -23.44], [-60, -23.44], [-90, -23.44], [-120, -23.44], [-150, -23.44], [-180, -23.44], [-180, -13], [-180, -3], [-180, 7], [-180, 17]] },
        { label: 'Gemäßigte Zone Nord', color: '#16a34a', coords: [[-180, 66.56], [-150, 66.56], [-120, 66.56], [-90, 66.56], [-60, 66.56], [-30, 66.56], [0, 66.56], [30, 66.56], [60, 66.56], [90, 66.56], [120, 66.56], [150, 66.56], [180, 66.56], [180, 56], [180, 46], [180, 36], [180, 26], [180, 23.44], [150, 23.44], [120, 23.44], [90, 23.44], [60, 23.44], [30, 23.44], [0, 23.44], [-30, 23.44], [-60, 23.44], [-90, 23.44], [-120, 23.44], [-150, 23.44], [-180, 23.44], [-180, 33], [-180, 43], [-180, 53], [-180, 63]] },
        { label: 'Gemäßigte Zone Süd', color: '#16a34a', coords: [[-180, -23.44], [-150, -23.44], [-120, -23.44], [-90, -23.44], [-60, -23.44], [-30, -23.44], [0, -23.44], [30, -23.44], [60, -23.44], [90, -23.44], [120, -23.44], [150, -23.44], [180, -23.44], [180, -33], [180, -43], [180, -53], [180, -63], [180, -66.56], [150, -66.56], [120, -66.56], [90, -66.56], [60, -66.56], [30, -66.56], [0, -66.56], [-30, -66.56], [-60, -66.56], [-90, -66.56], [-120, -66.56], [-150, -66.56], [-180, -66.56], [-180, -56], [-180, -46], [-180, -36], [-180, -26]] },
        { label: 'Polare Zone Nord', color: '#2563eb', coords: [[-180, 90], [-150, 90], [-120, 90], [-90, 90], [-60, 90], [-30, 90], [0, 90], [30, 90], [60, 90], [90, 90], [120, 90], [150, 90], [180, 90], [180, 80], [180, 70], [180, 66.56], [150, 66.56], [120, 66.56], [90, 66.56], [60, 66.56], [30, 66.56], [0, 66.56], [-30, 66.56], [-60, 66.56], [-90, 66.56], [-120, 66.56], [-150, 66.56], [-180, 66.56], [-180, 76], [-180, 86]] },
        { label: 'Polare Zone Süd', color: '#2563eb', coords: [[-180, -66.56], [-150, -66.56], [-120, -66.56], [-90, -66.56], [-60, -66.56], [-30, -66.56], [0, -66.56], [30, -66.56], [60, -66.56], [90, -66.56], [120, -66.56], [150, -66.56], [180, -66.56], [180, -76], [180, -86], [180, -90], [150, -90], [120, -90], [90, -90], [60, -90], [30, -90], [0, -90], [-30, -90], [-60, -90], [-90, -90], [-120, -90], [-150, -90], [-180, -90], [-180, -80], [-180, -70]] },
      ],
      lines: [
        { label: 'Äquator', color: '#1e293b', width: 1.4, dashed: true, labelAt: 0.2, coords: [[-180, 0], [-160, 0], [-140, 0], [-120, 0], [-100, 0], [-80, 0], [-60, 0], [-40, 0], [-20, 0], [0, 0], [20, 0], [40, 0], [60, 0], [80, 0], [100, 0], [120, 0], [140, 0], [160, 0], [180, 0]] },
        { label: 'Wendekreis des Krebses 23,4° N', color: '#1e293b', width: 1.2, dashed: true, labelAt: 0.2, coords: [[-180, 23.44], [-160, 23.44], [-140, 23.44], [-120, 23.44], [-100, 23.44], [-80, 23.44], [-60, 23.44], [-40, 23.44], [-20, 23.44], [0, 23.44], [20, 23.44], [40, 23.44], [60, 23.44], [80, 23.44], [100, 23.44], [120, 23.44], [140, 23.44], [160, 23.44], [180, 23.44]] },
        { label: 'Wendekreis des Steinbocks 23,4° S', color: '#1e293b', width: 1.2, dashed: true, labelAt: 0.2, coords: [[-180, -23.44], [-160, -23.44], [-140, -23.44], [-120, -23.44], [-100, -23.44], [-80, -23.44], [-60, -23.44], [-40, -23.44], [-20, -23.44], [0, -23.44], [20, -23.44], [40, -23.44], [60, -23.44], [80, -23.44], [100, -23.44], [120, -23.44], [140, -23.44], [160, -23.44], [180, -23.44]] },
        { label: 'Nördlicher Polarkreis 66,6° N', color: '#1e293b', width: 1.2, dashed: true, labelAt: 0.2, coords: [[-180, 66.56], [-160, 66.56], [-140, 66.56], [-120, 66.56], [-100, 66.56], [-80, 66.56], [-60, 66.56], [-40, 66.56], [-20, 66.56], [0, 66.56], [20, 66.56], [40, 66.56], [60, 66.56], [80, 66.56], [100, 66.56], [120, 66.56], [140, 66.56], [160, 66.56], [180, 66.56]] },
        { label: 'Südlicher Polarkreis 66,6° S', color: '#1e293b', width: 1.2, dashed: true, labelAt: 0.2, coords: [[-180, -66.56], [-160, -66.56], [-140, -66.56], [-120, -66.56], [-100, -66.56], [-80, -66.56], [-60, -66.56], [-40, -66.56], [-20, -66.56], [0, -66.56], [20, -66.56], [40, -66.56], [60, -66.56], [80, -66.56], [100, -66.56], [120, -66.56], [140, -66.56], [160, -66.56], [180, -66.56]] },
      ],
      places: [
        { name: 'Rom', label: 'Mittelmeerraum', detail: 'Im **[Mittelmeerraum](wiki:Mittelmeerraum|Mediterranean basin)** gilt das [Mittelmeerklima](wiki:Mittelmeerklima|Mediterranean climate): trockene, heiße Sommer, milde Winter.' },
      ],
      points: [
        { lon: -60.017, lat: -3.100, label: 'Amazonas-Regenwald', kind: 'site', pos: 'l', detail: '**[Amazonas-Regenwald](wiki:Amazonas-Regenwald|Amazon rainforest)** — tropisch: heiß, feucht, kaum Jahreszeiten (hier bei Manaus).' },
        { lon: 25.200, lat: 0.517, label: 'Kongobecken', kind: 'site', pos: 'r', detail: 'Das **[Kongobecken](wiki:Kongobecken|Congo Basin)** — tropischer Regenwald am Äquator (hier bei Kisangani).' },
        { lon: 133.800, lat: -23.700, label: 'Outback', kind: 'site', detail: 'Das australische **[Outback](wiki:Outback)** — trockenes Klima, Wüsten und Steppen (hier bei Alice Springs).' },
        { lon: 129.733, lat: 62.033, label: 'Sibirische Taiga', kind: 'site', pos: 'l', detail: 'Die **[Taiga](wiki:Borealer Nadelwald|Taiga)** in Sibirien — kaltgemäßigt, mit extrem kalten Wintern (hier bei Jakutsk).' },
        { lon: 13.0, lat: 23.0, label: 'Sahara', kind: 'site', detail: 'Die **[Sahara](wiki:Sahara|Sahara)** — das Klima ist trocken: die größte Hitzewüste der Erde.' },
        { lon: -40.0, lat: 72.0, label: 'Grönländisches Inlandeis', kind: 'site', pos: 'r', detail: '**[Grönland](wiki:Grönland|Greenland)** — polares Klima, das Inland ist von einem Eisschild bedeckt.' },
      ],
      caption: 'Die Farbbänder zeigen die astronomischen Beleuchtungszonen (Wende- und Polarkreise). Die Köppen-Klimazonen hängen zusätzlich von Meeresströmungen, Höhe und Land-Meer-Verteilung ab — deshalb sind Wüsten und Regenwälder keine glatten Gürtel.',
    },
    {
      id: 'map-golfstrom', type: 'map', title: 'Der Golfstrom: Warum Westeuropa so mild ist',
      view: [-85, 18, 25, 68],
      layers: { cities: false },
      places: [{ name: 'Hamburg', pos: 'r', detail: '**[Hamburg](wiki:Hamburg)** liegt auf 53,6° N — im Winter deutlich milder als Orte in Kanada auf gleicher Breite.' }],
      points: [
        { lon: -80.224, lat: 25.788, label: 'Florida', pos: 'r', detail: 'Vor Florida beginnt der [Golfstrom](wiki:Golfstrom|Gulf Stream) seinen Weg Richtung Nordosten.' },
        { lon: -60.362, lat: 53.294, label: 'Goose Bay (Labrador)', pos: 'l', detail: '**[Happy Valley-Goose Bay](wiki:Happy Valley-Goose Bay|Happy Valley-Goose Bay)** in Kanada liegt auf fast derselben Breite wie Hamburg — mit viel kälteren Wintern.' },
        { lon: 5.340, lat: 60.380, label: 'Bergen', pos: 'r', detail: '**[Bergen](wiki:Bergen (Norwegen)|Bergen)** in Norwegen — dank des [Nordatlantikstroms](wiki:Nordatlantikstrom|North Atlantic Current) weit im Norden mit mildem Klima.' },
      ],
      lines: [
        { label: 'Golfstrom → Nordatlantikstrom (schematisch)', color: '#dc2626', arrow: true, labelAt: 0.45, coords: [[-80.224, 25.788], [-75.529, 35.251], [-52.705, 47.566], [5.340, 60.380]], detail: 'Der **[Golfstrom](wiki:Golfstrom|Gulf Stream)** bringt warmes Wasser aus den Tropen nach Norden; sein Ausläufer, der **[Nordatlantikstrom](wiki:Nordatlantikstrom|North Atlantic Current)**, wärmt die Küsten Westeuropas. Der Verlauf ist hier stark vereinfacht.' },
        { label: 'Breite von Hamburg (53,6° N)', color: '#64748b', dashed: true, width: 1.4, labelAt: 0.55, coords: [[-85, 53.55], [-80, 53.55], [-75, 53.55], [-70, 53.55], [-65, 53.55], [-60, 53.55], [-55, 53.55], [-50, 53.55], [-45, 53.55], [-40, 53.55], [-35, 53.55], [-30, 53.55], [-25, 53.55], [-20, 53.55], [-15, 53.55], [-10, 53.55], [-5, 53.55], [0, 53.55], [5, 53.55], [10, 53.55], [15, 53.55]] },
      ],
      caption: 'Schematisch: Die rote Linie deutet den Weg des warmen Wassers an. Auf der Breite von Hamburg (grau gestrichelt) liegt in Kanada Labrador — dort ist es im Winter viel kälter.',
    },
    {
      id: 'match-zonen', type: 'match', title: 'Zonen und Landschaften',
      pairs: [['Tropisch', 'Amazonas-Regenwald'], ['Trocken', 'Sahara'], ['Warmgemäßigt, trockene Sommer', 'Mittelmeerraum'], ['Kaltgemäßigt (boreal)', 'Sibirische Taiga'], ['Polar', 'Grönländisches Inlandeis']],
    },
    {
      id: 'treibhaus', type: 'text', title: 'Der Treibhauseffekt',
      md: `
Sonnenlicht durchdringt die Atmosphäre und erwärmt den Boden. Der Boden gibt die Energie als **Wärmestrahlung** (Infrarot) wieder ab. **[[treibhausgas|Treibhausgase]]** — [Wasserdampf](wiki:Wasserdampf|Water vapor), [Kohlendioxid](wiki:Kohlendioxid|Carbon dioxide) (CO₂), [Methan](wiki:Methan|Methane), [Lachgas](wiki:Lachgas|Nitrous oxide) — lassen das Sonnenlicht durch, halten aber einen Teil der Wärmestrahlung zurück, wie die Scheiben eines [Gewächshauses](wiki:Gewächshaus|Greenhouse).

- Der **natürliche** Treibhauseffekt ist lebenswichtig: Ohne ihn läge die mittlere Temperatur der Erde bei etwa **−18 °C** statt bei rund **+15 °C**.
- Der **menschengemachte** Treibhauseffekt entsteht, weil wir durch das Verbrennen von Kohle, Öl und Gas, durch Entwaldung und Landwirtschaft zusätzliche Treibhausgase ausstoßen. Die CO₂-Konzentration stieg von rund **280 ppm** vor der [Industrialisierung](wiki:Industrielle Revolution|Industrial Revolution) auf etwa **422 ppm** im Jahr 2024 — den höchsten Wert seit mindestens zwei Millionen Jahren.[^copernicus-2024]`,
    },
    {
      id: 'co2-regler', type: 'viz', viz: 'geo-klima-co2', title: 'Wie viel Erwärmung bringt mehr CO₂?',
      task: 'Stelle den **heutigen** CO₂-Wert und eine **Verdopplung** gegenüber vorindustriell ein. Wie ändert sich das Ergebnis, wenn die Klimasensitivität 2,5 statt 4 °C beträgt?',
    },
    {
      id: 'ohne-treibhaus', type: 'numeric', title: 'Eine Welt ohne Treibhauseffekt',
      question: 'Welche mittlere Temperatur hätte die Erde ungefähr **ohne** natürlichen Treibhauseffekt (in °C)?',
      answer: -18, tolerance: 2, unit: '°C',
      hint: 'Deutlich unter dem Gefrierpunkt — etwa 33 Grad kälter als heute.',
      explain: '**Etwa −18 °C** statt +15 °C. Der natürliche Treibhauseffekt macht die Erde also erst bewohnbar; das Problem ist seine Verstärkung durch den Menschen.',
    },
    {
      id: 'folgen', type: 'text', title: 'Wo wir heute stehen',
      md: `
Der [[weltklimarat|Weltklimarat]] IPCC hält fest, dass der Mensch die Erwärmung „eindeutig“ verursacht hat.[^ipcc-ar6]

- **Global:** Die letzten zehn Jahre waren im Mittel gut **1,2 °C** wärmer als vorindustriell. **2024** war das wärmste Jahr seit Beginn der Messungen und das erste Kalenderjahr über **1,5 °C** (1,60 °C laut Copernicus).[^copernicus-2024]
- **Deutschland:** Hier ist es seit 1881 laut [Deutschem Wetterdienst](wiki:Deutscher Wetterdienst|Deutscher Wetterdienst) sogar um rund **2,5 °C** wärmer geworden — Landflächen erwärmen sich schneller als Ozeane.[^dwd-klimawandel]
- **Folgen:** Der [Meeresspiegel](wiki:Meeresspiegel|Sea level) ist seit 1900 um rund 20 cm gestiegen; [Gletscher](wiki:Gletscher|Glacier) schrumpfen (auch in den bayerischen Alpen); [Hitzewellen](wiki:Hitzewelle|Heat wave), Dürren und Starkregen werden häufiger und heftiger — etwa die Flutkatastrophe im **[Ahrtal](wiki:Ahrtal|Ahr Valley)** im Juli 2021 mit über 130 Todesopfern allein dort.`,
    },
    {
      id: 'politik', type: 'text', title: 'Klimapolitik in Meilensteinen',
      md: `
- **1988** — Gründung des **[Weltklimarats](wiki:Weltklimarat|Intergovernmental Panel on Climate Change)** (IPCC).
- **1992** — **Klimarahmenkonvention** der UN auf dem [Erdgipfel](wiki:Erdgipfel|Earth Summit) in [Rio de Janeiro](wiki:Rio de Janeiro|Rio de Janeiro); seitdem jährliche Weltklimakonferenzen (COP).
- **1997** — **[Kyoto-Protokoll](wiki:Kyoto-Protokoll|Kyoto Protocol)**: erstmals verbindliche Reduktionsziele, aber nur für Industriestaaten.
- **2015** — **[[pariser-klimaabkommen|Pariser Klimaabkommen]]**: Erwärmung deutlich unter 2 °C halten, möglichst 1,5 °C; alle Staaten legen eigene Ziele vor.[^unfccc-paris]
- **2021** — Nach einem Urteil des [Bundesverfassungsgerichts](wiki:Bundesverfassungsgericht|Federal Constitutional Court) verschärft Deutschland sein [Klimaschutzgesetz](wiki:Bundes-Klimaschutzgesetz): **[[klimaneutralitaet|Klimaneutralität]] bis 2045**, minus 65 % Treibhausgase bis 2030 (gegenüber 1990).`,
    },
    {
      id: 'map-klimapolitik', type: 'map', title: 'Orte der Klimapolitik',
      view: [-120, -40, 160, 70],
      layers: { cities: false, rivers: false },
      places: [
        { name: 'Rio de Janeiro', num: 1, pos: 'r', detail: '**[Rio de Janeiro](wiki:Rio de Janeiro)** — 1992 fand hier der [Erdgipfel](wiki:Erdgipfel|Earth Summit) statt; dort wurde die Klimarahmenkonvention der UN beschlossen.' },
        { name: 'Kyōto', num: 2, pos: 'r', detail: '**[Kyōto](wiki:Kyōto|Kyoto)** — 1997 wurde hier das [Kyoto-Protokoll](wiki:Kyoto-Protokoll|Kyoto Protocol) verabschiedet.' },
        { name: 'Paris', num: 3, pos: 'l', detail: '**[Paris](wiki:Paris)** — 2015 beschlossen die Staaten hier das [Pariser Klimaabkommen](wiki:Übereinkommen von Paris|Paris Agreement).' },
      ],
      caption: 'Drei Orte, drei Meilensteine: 1 Rio de Janeiro (1992), 2 Kyoto (1997), 3 Paris (2015).',
    },
    {
      id: 'zeitleiste', type: 'game', viz: 'timeline', title: 'Klimapolitik ordnen',
      params: {
        mode: 'sort', events: [
          { year: 1988, label: 'Weltklimarat gegründet' },
          { year: 1992, label: 'Erdgipfel Rio' },
          { year: 1997, label: 'Kyoto-Protokoll' },
          { year: 2015, label: 'Pariser Abkommen' },
          { year: 2021, label: 'Ziel: neutral bis 2045' },
          { year: 2024, label: 'Erstes Jahr über 1,5 °C' },
        ],
      },
    },
    {
      id: 'fact-koeppen', type: 'callout', tone: 'fact', title: 'Ein Klimaforscher mit deutscher Familie',
      md: `Die Klimazonen-Einteilung, die bis heute weltweit genutzt wird, stammt von **[Wladimir Köppen](wiki:Wladimir Köppen|Wladimir Köppen)** (1846–1940), der in [Hamburg](wiki:Hamburg|Hamburg) an der [Deutschen Seewarte](wiki:Deutsche Seewarte|German Maritime Observatory) arbeitete. Sein Schwiegersohn war — **[Alfred Wegener](wiki:Alfred Wegener|Alfred Wegener)**, der Vater der Kontinentaldrift.`,
    },
    {
      id: 'recall-treibhaus', type: 'recall', title: 'Erkläre den Treibhauseffekt',
      prompt: 'Erkläre einem Zwölfjährigen in 3–4 Sätzen, was der Treibhauseffekt ist, warum wir ihn eigentlich brauchen — und was der Mensch daran verändert.',
      answer: `Sonnenlicht wärmt die Erde; die warme Erde strahlt die Wärme wieder ab. **Treibhausgase** wie CO₂, Methan und Wasserdampf halten einen Teil dieser Wärme in der Luft fest — wie eine Decke oder die Scheiben eines Gewächshauses. Ohne diesen **natürlichen** Treibhauseffekt wäre es auf der Erde im Schnitt etwa −18 °C kalt statt +15 °C. Der Mensch macht die „Decke“ dicker, weil er durch Kohle, Öl und Gas viel zusätzliches CO₂ ausstößt (von 280 auf über 420 ppm) — deshalb wird es wärmer, mit Folgen wie Hitzewellen, Dürren und steigendem Meeresspiegel.`,
      hints: ['Welche Rolle spielen die Gase — lassen sie Licht durch, halten sie Wärme zurück?', 'Wie warm wäre die Erde ohne den Effekt?'],
      cards: ['treibhaus-natuerlich', 'co2-ppm'],
    },
  ],
  cards: [
    { id: 'wetter-klima', front: 'Unterschied zwischen Wetter und Klima?', back: 'Wetter: Zustand der Atmosphäre zu einem Zeitpunkt. Klima: langjährige Statistik des Wetters, meist über 30 Jahre gemittelt.' },
    { id: 'zonen', front: 'Die Hauptklimazonen der Erde (nach Köppen)?', back: 'Tropisch, trocken, warmgemäßigt, kaltgemäßigt (boreal), polar.' },
    { id: 'de-zone', front: 'In welcher Klimazone liegt Deutschland?', back: 'In der gemäßigten Zone — im Westen eher ozeanisch, nach Osten kontinentaler.' },
    { id: 'golfstrom', front: 'Warum ist Westeuropa milder als Kanada auf gleicher Breite?', back: 'Wegen des Golfstroms bzw. Nordatlantikstroms, der warmes Wasser nach Nordeuropa bringt (und der vorherrschenden Westwinde vom Atlantik).' },
    { id: 'treibhausgase', front: 'Die wichtigsten Treibhausgase?', back: 'Wasserdampf, Kohlendioxid (CO₂), Methan (CH₄), Lachgas (N₂O).' },
    { id: 'treibhaus-natuerlich', front: 'Mittlere Erdtemperatur mit und ohne natürlichen Treibhauseffekt?', back: 'Mit: etwa +15 °C. Ohne: etwa −18 °C.' },
    { id: 'co2-ppm', front: 'CO₂-Konzentration vorindustriell und heute?', back: 'Rund 280 ppm vorindustriell; etwa 422 ppm im Jahr 2024.' },
    { id: 'erwaermung', front: 'Wie stark hat sich die Erde bisher erwärmt — und Deutschland?', back: 'Global gut 1,2 °C (Mittel der letzten zehn Jahre, 2024 erstmals über 1,5 °C). Deutschland seit 1881 rund 2,5 °C (DWD).' },
    { id: 'klimasensitivitaet', front: 'Was bedeutet „Klimasensitivität“ — und welchen Wert nennt der IPCC?', back: 'Die langfristige Erwärmung bei einer Verdopplung der CO₂-Konzentration; beste Schätzung etwa 3 °C (wahrscheinlich 2,5–4 °C).' },
    { id: 'ipcc', front: 'Was ist der Weltklimarat (IPCC)?', back: 'Ein 1988 gegründetes zwischenstaatliches UN-Gremium, das den Forschungsstand zum Klimawandel in Sachstandsberichten zusammenfasst.' },
    { id: 'kyoto', front: 'Was war das Kyoto-Protokoll (1997)?', back: 'Das erste Klimaabkommen mit verbindlichen Reduktionszielen — allerdings nur für Industriestaaten.' },
    { id: 'paris', front: 'Kernziel des Pariser Klimaabkommens (2015)?', back: 'Erwärmung deutlich unter 2 °C halten, Anstrengungen für 1,5 °C; alle Staaten legen eigene, regelmäßig verschärfte Ziele vor.' },
    { id: 'de-2045', front: 'Bis wann will Deutschland klimaneutral sein?', back: 'Bis 2045 (Klimaschutzgesetz, 2021 nach einem Urteil des Bundesverfassungsgerichts verschärft); bis 2030 minus 65 % gegenüber 1990.' },
    { id: 'meeresspiegel', front: 'Um wie viel ist der Meeresspiegel seit 1900 gestiegen?', back: 'Um rund 20 cm — Tendenz beschleunigt.' },
    { id: 'koeppen', front: 'Von wem stammt die bekannteste Klimaklassifikation?', back: 'Von Wladimir Köppen (Köppen-Geiger-Klassifikation) — Schwiegervater von Alfred Wegener.' },
  ],
};
