export default {
  id: 'saxony-glashuette',
  title: 'Saxony: the Glashütte story',
  summary: 'A former mining town in the Ore Mountains became the heart of German watchmaking — then lost everything, and rose again after reunification.',
  minutes: 30,
  goals: [
    'Tell the history of [[glashuette|Glashütte]] from 1845 to today',
    'Recognize Glashütte movement hallmarks like the [[three-quarter-plate]]',
    'Distinguish A. Lange & Söhne, Glashütte Original and NOMOS',
  ],
  blocks: [
    {
      id: 'founding', type: 'text', title: '1845: Lange comes to Glashütte',
      md: `
In 1845 the [Dresden](wiki:Dresden|Dresden) watchmaker **Ferdinand Adolph Lange** founded a workshop in **[[glashuette|Glashütte]]**, a small town in the [Ore Mountains](wiki:Ore Mountains|Erzgebirge) south of Dresden ([Kingdom of Saxony](wiki:Kingdom of Saxony|Königreich Sachsen)).[^wiki-lange] He trained local people as specialized watchmakers, and around his firm a cluster of suppliers and competitors grew. Glashütte became *the* center of German fine watchmaking — precision [pocket watches](wiki:Pocket watch|Taschenuhr), [marine chronometers](wiki:Marine chronometer|Längenuhr) and later [wristwatches](wiki:Wristwatch|Armbanduhr).`,
    },
    {
      id: 'map-saxony', type: 'map', title: 'Glashütte in the Ore Mountains',
      view: [12.4, 50.3, 14.8, 51.4],
      rivers: [{ name: 'Elbe', labelAt: 0.35 }],
      layers: { cities: false, countryLabels: false, mountainLabels: false },
      places: [{ name: 'Erzgebirge', label: 'Ore Mountains' }],
      points: [
        { lon: 13.738, lat: 51.049, label: 'Dresden', kind: 'capital', pos: 'l',
          detail: '**[Dresden](wiki:Dresden|Dresden)** on the Elbe — Ferdinand Adolph Lange’s home town and the capital of the Kingdom of Saxony.' },
        { lon: 13.783, lat: 50.85, label: 'Glashütte', pos: 'r', color: '#b45309',
          detail: '**[Glashütte](wiki:Glashütte|Glashütte (Sachsen))** — here Lange founded his workshop in 1845, about 22 km (straight line) south of Dresden, in the foothills of the [Ore Mountains](wiki:Ore Mountains|Erzgebirge).' },
      ],
      caption: 'A small town a short way up into the mountains south of Dresden became the centre of German fine watchmaking.',
    },
    {
      id: 'hallmarks', type: 'text', title: 'How to recognize a Glashütte movement',
      md: `
Glashütte developed its own technical and decorative language, still used by Lange and others today:

- **[[three-quarter-plate|Three-quarter plate]]** (*Dreiviertelplatine*): one large bridge covering most of the gear train instead of many small bridges — very stable.
- **Glashütte ribbing** (*Glashütter Streifenschliff*): parallel stripes on the plates, the local cousin of Swiss *[Côtes de Genève](wiki:Côtes de Genève)*.
- **Screwed gold chatons**: jewels set in gold rings held by blued screws.
- **Hand-engraved balance cock** (*Unruhkloben*), each one unique.
- **Swan-neck fine adjustment** (*Schwanenhalsfeinregulierung*): a curved spring for fine regulation of the rate.
- Untreated **[German silver](wiki:German silver|Neusilber)** (*Neusilber*) plates that develop a warm patina.`,
    },
    {
      id: 'dark-years', type: 'callout', tone: 'history', title: 'Destruction and expropriation',
      md: `
On 8 May 1945, the last day of the war in Europe, a Soviet air raid nearly destroyed Lange's headquarters. In 1948 the company was [nationalized](wiki:Nationalization|Verstaatlichung).[^wiki-lange] In 1951 all seven watch companies of Glashütte were forcibly merged into the state combine **[[gub|VEB Glashütter Uhrenbetriebe (GUB)]]**, which produced watches for the [Eastern Bloc](wiki:Eastern Bloc|Ostblock) for four decades.[^wiki-glashuette-original]`,
    },
    {
      id: 'rebirth', type: 'text', title: 'After 1990: three paths',
      md: `
[Reunification](wiki:German reunification|Deutsche Wiedervereinigung) reopened Glashütte — and three very different companies emerged:

**[A. Lange & Söhne](wiki:A. Lange & Söhne|A. Lange & Söhne).** On 7 December 1990, **[Walter Lange](wiki:Walter Lange)**, great-grandson of the founder, and the manager **Günter Blümlein** re-founded the company.[^wiki-lange] Its first new wristwatch collection appeared in 1994 (including the Lange 1 with its off-center dial and outsized date). Since 2000 Lange belongs to the [Richemont](wiki:Richemont|Richemont) group and makes roughly 5,000 watches a year — firmly in the top tier of haute horlogerie.

**[Glashütte Original](wiki:Glashütte Original|Glashütte Original).** GUB was privatized in 1990; in 1994 it was bought by Heinz W. Pfeifer and renamed **Glashütte Original** — a name recalling the "Original Glashütte" inscription that once distinguished genuine local watches from imitations. Since 2000 it belongs to the [Swatch Group](wiki:Swatch Group|Swatch Group).[^wiki-glashuette-original]

**[NOMOS Glashütte](wiki:NOMOS Glashütte|Nomos Glashütte).** Founded in January 1990 — two months after the fall of the [Berlin Wall](wiki:Berlin Wall|Berliner Mauer) — by **Roland Schwertner**, a newcomer from [Düsseldorf](wiki:Düsseldorf|Düsseldorf).[^wiki-nomos] Its [Bauhaus](wiki:Bauhaus|Bauhaus)-inspired designs (the Tangente, 1992) made it Germany's best-known modern brand, and in 2014 it introduced its own escapement, the *NOMOS swing system*, reducing its dependence on Swiss suppliers. It is independent and makes around 20,000 watches a year.`,
    },
    {
      id: 'map-watch-regions', type: 'map', title: 'Europe’s watch regions',
      view: [3.5, 45.6, 15.5, 52.2],
      layers: { cities: false, countryLabels: false, seaLabels: false, mountainLabels: false },
      points: [
        { lon: 6.825, lat: 47.101, label: 'La Chaux-de-Fonds', pos: 'b',
          detail: '**[La Chaux-de-Fonds](wiki:La Chaux-de-Fonds|La Chaux-de-Fonds)** is described as the most important centre of watchmaking in the Swiss “Watch Valley”.' },
        { lon: 7.247, lat: 47.137, label: 'Biel/Bienne', pos: 'r',
          detail: '**[Biel/Bienne](wiki:Biel/Bienne|Biel/Bienne)** — Rolex, Omega and Swatch are based here.' },
        { lon: 6.233, lat: 46.617, label: 'Vallée de Joux', pos: 'l',
          detail: 'The **[Vallée de Joux](wiki:Vallée de Joux|Vallée de Joux)**, together with Neuchâtel, is regarded as a birthplace of Swiss horology; Audemars Piguet, Blancpain and Jaeger-LeCoultre have their factories there.' },
        { lon: 8.634, lat: 47.697, label: 'Schaffhausen', pos: 'r',
          detail: '**[IWC Schaffhausen](wiki:IWC Schaffhausen|International Watch Company)** was founded here in 1868 by the American watchmaker Florentine Ariosto Jones.' },
        { lon: 6.021, lat: 47.242, label: 'Besançon', pos: 't',
          detail: '**[Besançon](wiki:Besançon|Besançon)** is the historical capital of watchmaking in France; the quartz watches from Asia hit its industry hard in the 1970s.' },
        { lon: 8.702, lat: 48.891, label: 'Pforzheim', pos: 'r',
          detail: '**[Pforzheim](wiki:Pforzheim|Pforzheim)** is known for its jewellery and watch industry and nicknamed *Goldstadt*, “Gold City”.' },
        { lon: 8.385, lat: 48.225, label: 'Schramberg', pos: 'l',
          detail: '**[Junghans](wiki:Junghans|Junghans)** was founded in **[Schramberg](wiki:Schramberg|Schramberg)** in the Black Forest in 1861; in 1903 it was the largest watch factory in the world.' },
        { lon: 8.201, lat: 48.05, label: 'Furtwangen', pos: 'b',
          detail: '**[Furtwangen](wiki:Furtwangen im Schwarzwald|Furtwangen im Schwarzwald)** in the Black Forest is a town shaped by its historic clock industry.' },
        { lon: 13.783, lat: 50.85, label: 'Glashütte', pos: 'l', color: '#b45309',
          detail: '**[Glashütte](wiki:Glashütte|Glashütte (Sachsen))** — Ferdinand Adolph Lange founded his workshop here in 1845.' },
      ],
      caption: 'Fine watchmaking clusters in a few small regions rather than in big cities.',
    },
    {
      id: 'order-timeline', type: 'order', title: 'Glashütte timeline',
      prompt: 'Put these events in chronological order.',
      items: [
        'Ferdinand Adolph Lange founds his firm in Glashütte',
        'Lange headquarters nearly destroyed in an air raid',
        'All Glashütte watch companies merged into GUB',
        'NOMOS Glashütte founded by Roland Schwertner',
        'Walter Lange and Günter Blümlein re-found A. Lange & Söhne',
        'GUB renamed Glashütte Original',
      ],
      explain: '1845 → 1945 → 1951 → January 1990 → December 1990 → 1994. Both NOMOS and the new Lange were founded in the same year, 1990.',
    },
    {
      id: 'match-brands', type: 'match', title: 'Which house?',
      pairs: [
        ['A. Lange & Söhne', 'Re-founded 1990 by the founder’s great-grandson; Richemont'],
        ['Glashütte Original', 'Successor of the state combine GUB; Swatch Group'],
        ['NOMOS Glashütte', 'Founded 1990, Bauhaus design, independent'],
      ],
    },
    {
      id: 'quiz-plate', type: 'quiz', title: 'The three-quarter plate',
      question: 'What is a three-quarter plate?',
      options: [
        { text: 'A single bridge covering most of the gear train, leaving the balance visible.', correct: true, why: 'It replaces individual wheel bridges with one stiff plate — a Glashütte signature.' },
        { text: 'A dial that shows only three quarters of the hours.', correct: false, why: 'It is a movement part, not a dial layout.' },
        { text: 'A case back made of three-quarters gold.', correct: false, why: 'Not a case or material term.' },
        { text: 'A balance that swings through 270°.', correct: false, why: '270° is a typical amplitude, but unrelated to this term.' },
      ],
    },
    {
      id: 'map-quiz-watch-towns', type: 'map', title: 'Where do the watches come from?',
      view: [3.5, 45.6, 15.5, 52.2],
      layers: { cities: false, countryLabels: false, seaLabels: false, mountainLabels: false },
      quiz: { rounds: 6 },
      points: [
        { lon: 6.825, lat: 47.101, label: 'La Chaux-de-Fonds' },
        { lon: 7.247, lat: 47.137, label: 'Biel/Bienne' },
        { lon: 8.634, lat: 47.697, label: 'Schaffhausen' },
        { lon: 6.021, lat: 47.242, label: 'Besançon' },
        { lon: 8.702, lat: 48.891, label: 'Pforzheim' },
        { lon: 8.385, lat: 48.225, label: 'Schramberg' },
        { lon: 13.783, lat: 50.85, label: 'Glashütte' },
      ],
    },
    {
      id: 'recall-rebirth', type: 'recall', title: 'Explain it',
      prompt: 'Why could Glashütte become a top watchmaking center again so quickly after 1990? Name at least two factors.',
      answer: `The town still had generations of trained watchmakers and a workforce from GUB, plus a strong historical brand and technical tradition (Lange, three-quarter plate, Glashütte decoration). Reunification made investment possible: Lange was re-founded with experienced management (Blümlein) and support from Swiss manufacturers ([IWC](wiki:IWC Schaffhausen|International Watch Company), [Jaeger-LeCoultre](wiki:Jaeger-LeCoultre|Jaeger-LeCoultre)), GUB was privatized into Glashütte Original, and newcomers like NOMOS could build on local skills and suppliers. The "Glashütte" name itself carried prestige comparable to Swiss origin.`,
      hints: ['What did GUB leave behind?', 'Who helped re-found Lange?'],
      cards: ['rebirth'],
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Fachbegriffe',
      md: `
<table><tr><th>Deutsch</th><th>English</th></tr>
<tr><td>Dreiviertelplatine</td><td>three-quarter plate</td></tr>
<tr><td>Glashütter Streifenschliff</td><td>Glashütte ribbing</td></tr>
<tr><td>verschraubte Goldchatons</td><td>screwed gold chatons</td></tr>
<tr><td>Unruhkloben (handgraviert)</td><td>balance cock (hand-engraved)</td></tr>
<tr><td>Schwanenhalsfeinregulierung</td><td>swan-neck fine adjustment</td></tr>
<tr><td>Neusilber</td><td>German silver (nickel silver)</td></tr>
<tr><td>Manufaktur</td><td>manufacture (in-house movement maker)</td></tr></table>`,
    },
  ],
  cards: [
    { id: 'founding', front: 'Who founded watchmaking in Glashütte, and when?', back: 'Ferdinand Adolph Lange, 1845.' },
    { id: 'gub', front: 'What was GUB?', back: 'VEB Glashütter Uhrenbetriebe — the East German state combine formed in 1951 from all seven Glashütte watch companies.' },
    { id: 'lange-refound', front: 'When and by whom was A. Lange & Söhne re-founded?', back: '7 December 1990, by Walter Lange (great-grandson) and Günter Blümlein. First new collection 1994.' },
    { id: 'go', front: 'Glashütte Original: origin and owner', back: 'Successor of GUB, renamed 1994 (Heinz W. Pfeifer); Swatch Group since 2000.' },
    { id: 'nomos', front: 'NOMOS Glashütte: founded when, by whom, known for?', back: 'January 1990, Roland Schwertner; Bauhaus design (Tangente, 1992); own "swing system" escapement (2014); independent.' },
    { id: 'three-quarter', front: 'What is a Dreiviertelplatine?', back: 'A three-quarter plate: one bridge covering most of the gear train — Glashütte signature.' },
    { id: 'hallmarks', front: 'Name four Glashütte movement hallmarks', back: 'Three-quarter plate, Glashütte ribbing, screwed gold chatons, hand-engraved balance cock, swan-neck regulator, German silver.' },
    { id: 'rebirth', front: 'Why did Glashütte recover quickly after 1990?', back: 'Skilled workforce and suppliers from GUB, strong heritage and name, investment and expertise after reunification.' },
  ],
};
