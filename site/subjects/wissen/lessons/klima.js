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
**Wetter** ist der Zustand der Atmosphäre an einem Ort zu einem Zeitpunkt: Heute regnet es in Hamburg, 14 °C.

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
Weil die Sonne am Äquator steil und an den Polen flach einstrahlt, ordnet sich das Klima grob in Gürteln an — den **[[klimazone|Klimazonen]]**. Die bekannteste Einteilung stammt vom Klimaforscher Wladimir Köppen:

- **Tropisch** — heiß und feucht, kaum Jahreszeiten: Regenwälder am Amazonas, im Kongobecken, in Indonesien.
- **Trocken** — Wüsten und Steppen: Sahara, Arabien, Innerasien, Australiens Outback.
- **Warmgemäßigt** — dazu gehört das **Mittelmeerklima** mit trockenen Sommern und das ozeanische Klima Westeuropas.
- **Kaltgemäßigt (boreal)** — lange, kalte Winter, riesige Nadelwälder (Taiga) in Sibirien, Skandinavien, Kanada.
- **Polar** — Eis und Tundra: Arktis, Grönland, Antarktis.

**Deutschland** liegt in der **gemäßigten Zone**: im Westen eher ozeanisch (milde Winter, kühle Sommer), nach Osten kontinentaler (kältere Winter, wärmere Sommer). Dass es hier viel milder ist als etwa in Kanada auf gleicher Breite, verdanken wir auch dem **[[golfstrom|Golfstrom]]** und seinem Ausläufer, dem Nordatlantikstrom.`,
    },
    {
      id: 'match-zonen', type: 'match', title: 'Zonen und Landschaften',
      pairs: [['Tropisch', 'Amazonas-Regenwald'], ['Trocken', 'Sahara'], ['Warmgemäßigt, trockene Sommer', 'Mittelmeerraum'], ['Kaltgemäßigt (boreal)', 'Sibirische Taiga'], ['Polar', 'Grönländisches Inlandeis']],
    },
    {
      id: 'treibhaus', type: 'text', title: 'Der Treibhauseffekt',
      md: `
Sonnenlicht durchdringt die Atmosphäre und erwärmt den Boden. Der Boden gibt die Energie als **Wärmestrahlung** (Infrarot) wieder ab. **[[treibhausgas|Treibhausgase]]** — Wasserdampf, Kohlendioxid (CO₂), Methan, Lachgas — lassen das Sonnenlicht durch, halten aber einen Teil der Wärmestrahlung zurück, wie die Scheiben eines Gewächshauses.

- Der **natürliche** Treibhauseffekt ist lebenswichtig: Ohne ihn läge die mittlere Temperatur der Erde bei etwa **−18 °C** statt bei rund **+15 °C**.
- Der **menschengemachte** Treibhauseffekt entsteht, weil wir durch das Verbrennen von Kohle, Öl und Gas, durch Entwaldung und Landwirtschaft zusätzliche Treibhausgase ausstoßen. Die CO₂-Konzentration stieg von rund **280 ppm** vor der Industrialisierung auf etwa **422 ppm** im Jahr 2024 — den höchsten Wert seit mindestens zwei Millionen Jahren.[^copernicus-2024]`,
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
- **Deutschland:** Hier ist es seit 1881 laut Deutschem Wetterdienst sogar um rund **2,5 °C** wärmer geworden — Landflächen erwärmen sich schneller als Ozeane.[^dwd-klimawandel]
- **Folgen:** Der Meeresspiegel ist seit 1900 um rund 20 cm gestiegen; Gletscher schrumpfen (auch in den bayerischen Alpen); Hitzewellen, Dürren und Starkregen werden häufiger und heftiger — etwa die Flutkatastrophe im **Ahrtal** im Juli 2021 mit über 130 Todesopfern allein dort.`,
    },
    {
      id: 'politik', type: 'text', title: 'Klimapolitik in Meilensteinen',
      md: `
- **1988** — Gründung des **Weltklimarats** (IPCC).
- **1992** — **Klimarahmenkonvention** der UN auf dem Erdgipfel in Rio de Janeiro; seitdem jährliche Weltklimakonferenzen (COP).
- **1997** — **Kyoto-Protokoll**: erstmals verbindliche Reduktionsziele, aber nur für Industriestaaten.
- **2015** — **[[pariser-klimaabkommen|Pariser Klimaabkommen]]**: Erwärmung deutlich unter 2 °C halten, möglichst 1,5 °C; alle Staaten legen eigene Ziele vor.[^unfccc-paris]
- **2021** — Nach einem Urteil des Bundesverfassungsgerichts verschärft Deutschland sein Klimaschutzgesetz: **[[klimaneutralitaet|Klimaneutralität]] bis 2045**, minus 65 % Treibhausgase bis 2030 (gegenüber 1990).`,
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
      md: `Die Klimazonen-Einteilung, die bis heute weltweit genutzt wird, stammt von **Wladimir Köppen** (1846–1940), der in Hamburg an der Deutschen Seewarte arbeitete. Sein Schwiegersohn war — **Alfred Wegener**, der Vater der Kontinentaldrift.`,
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
