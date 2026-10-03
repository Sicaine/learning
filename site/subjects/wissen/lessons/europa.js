export default {
  id: 'europa',
  title: 'Europa',
  summary: 'Europa ist klein, aber dicht gepackt: über 40 Staaten auf rund 10 Mio. km². Hier lernst du seine Grenzen, Regionen, Gebirge und Flüsse kennen — und findest jeden Staat samt Hauptstadt auf der Karte.',
  minutes: 25,
  goals: [
    'Erklären, wo Europa endet — und warum das eine Konvention ist',
    'Die europäischen Staaten auf der Karte finden und ihre Hauptstädte nennen',
    'Die großen Gebirge, Flüsse und Rekorde Europas kennen',
    'Europa, Europäische Union und Euroraum auseinanderhalten',
  ],
  blocks: [
    {
      id: 'grenzen', type: 'text', title: 'Ein Kontinent ohne klare Ostgrenze',
      md: `
Europa ist geografisch eigentlich eine große Halbinsel im Westen [Eurasiens](wiki:Eurasien|Eurasia) — das westliche Fünftel der Landmasse.[^wp-europa] Dass man es trotzdem als eigenen [[kontinent|Kontinent]] zählt, hat historische und kulturelle Gründe. Die übliche Grenze zu Asien verläuft entlang:

- **[[ural|Ural]]-Gebirge** und **[Uralfluss](wiki:Ural (Fluss)|Ural (river))**,
- **[Kaspischem Meer](wiki:Kaspisches Meer|Caspian Sea)** und **[Kaukasus](wiki:Kaukasus|Caucasus Mountains)** (je nach Konvention auch weiter nördlich entlang der [Manytsch-Niederung](wiki:Manytschniederung|Kuma–Manych Depression)),
- **[Schwarzem Meer](wiki:Schwarzes Meer|Black Sea)** und **[Bosporus](wiki:Bosporus|Bosporus)** — mitten durch [Istanbul](wiki:Istanbul|Istanbul).

Deshalb liegen **[Russland](wiki:Russland|Russia)**, die **[Türkei](wiki:Türkei|Turkey)** und **[Kasachstan](wiki:Kasachstan|Kazakhstan)** in zwei Erdteilen. Insgesamt leben in Europa über **740 Mio. Menschen** auf etwa **10,5 Mio. km²**.`,
    },
    {
      id: 'map-europa-grenze', type: 'map', title: 'Wo endet Europa?',
      view: [18, 36, 72, 70],
      layers: { cities: false, countryLabels: false, mountainLabels: false },
      highlight: [{ countries: ['Russland', 'Türkei', 'Kasachstan'], label: 'Staaten in Europa und Asien', color: '#f59e0b' }],
      places: [{ name: 'Istanbul', detail: '**[Istanbul](wiki:Istanbul)** — die Stadt liegt auf beiden Seiten des [Bosporus](wiki:Bosporus), also in Europa und in Asien.' }],
      points: [
        { lon: 48.0, lat: 59.0, label: 'RUSSLAND', kind: 'land', detail: '**[Russland](wiki:Russland|Russia)** — der größere Teil des Landes liegt in Asien, die Hauptstadt Moskau in Europa.' },
        { lon: 62.0, lat: 48.8, label: 'KASACHSTAN', kind: 'land', detail: '**[Kasachstan](wiki:Kasachstan|Kazakhstan)** — nur der westliche Zipfel (westlich des Uralflusses) liegt in Europa.' },
        { lon: 35.0, lat: 39.0, label: 'TÜRKEI', kind: 'land', detail: '**[Türkei](wiki:Türkei|Turkey)** — nur der kleine Teil um Istanbul (Ostthrakien) liegt in Europa.' },
        { lon: 60.112, lat: 65.036, label: 'Narodnaja', kind: 'peak', pos: 'r', detail: '**[Narodnaja](wiki:Narodnaja)** — mit rund 1.900 m der höchste Gipfel des [Urals](wiki:Ural|Ural Mountains).' },
        { lon: 51.883, lat: 47.117, label: 'Mündung des Urals', kind: 'site', pos: 'l', detail: 'Der [Uralfluss](wiki:Ural (Fluss)|Ural (river)) mündet bei Atyrau ins [Kaspische Meer](wiki:Kaspisches Meer|Caspian Sea).' },
        { lon: 42.439, lat: 43.355, label: 'Elbrus', kind: 'peak', pos: 'b', detail: '**[Elbrus](wiki:Elbrus|Mount Elbrus)** (5.642 m) — höchster Berg des [Kaukasus](wiki:Kaukasus|Caucasus Mountains); je nachdem, wo man die Grenze zieht, auch der höchste Berg Europas.' },
      ],
      lines: [
        { label: 'Grenze Europa–Asien (schematisch)', color: '#b91c1c', dashed: true, labelAt: 0.36, coords: [[60.112, 65.036], [59.033, 53.383], [58.567, 51.200], [51.883, 47.117], [42.439, 43.355], [29.05, 41.12]], detail: 'Üblicher Verlauf: [Ural](wiki:Ural|Ural Mountains) und Uralfluss, [Kaspisches Meer](wiki:Kaspisches Meer|Caspian Sea), [Kaukasus](wiki:Kaukasus|Caucasus Mountains) bzw. Manytsch-Niederung, [Schwarzes Meer](wiki:Schwarzes Meer|Black Sea), [Bosporus](wiki:Bosporus). Hier schematisch gezogen.' },
      ],
      caption: 'Die Ostgrenze Europas ist eine Konvention: Zwischen Kaspischem und Schwarzem Meer wird sie unterschiedlich gezogen (Kaukasus-Kamm oder Manytsch-Niederung) — die Linie ist deshalb nur schematisch, über den Elbrus.',
    },
    {
      id: 'karte-entdecken', type: 'viz', viz: 'geo-europa', title: 'Europa auf der Karte',
      params: { mode: 'explore', lockMode: true },
      caption: 'Kartengrundlage: Natural Earth (gemeinfrei), vereinfacht. Kleinststaaten wie Andorra oder Liechtenstein sind zu klein für die Karte.[^natural-earth]',
      task: 'Finde alle **Nachbarstaaten Deutschlands** (es sind neun) und klicke sie an.',
    },
    {
      id: 'regionen', type: 'text', title: 'Regionen und Rekorde',
      md: `
Grob teilt man Europa in **Nord-** ([Skandinavien](wiki:Skandinavien|Scandinavia), [Island](wiki:Island|Iceland), [Finnland](wiki:Finnland|Finland), [Baltikum](wiki:Baltikum)), **West-** ([Frankreich](wiki:Frankreich|France), [Benelux](wiki:Benelux|Benelux), [Britische Inseln](wiki:Britische Inseln|British Isles)), **Mittel-** (Deutschland, Polen, Tschechien, Österreich, Schweiz), **Süd-** ([Iberische Halbinsel](wiki:Iberische Halbinsel|Iberian Peninsula), [Italien](wiki:Italien|Italy), [Griechenland](wiki:Griechenland|Greece)) und **Ost-/Südosteuropa** ([Ukraine](wiki:Ukraine|Ukraine), [Belarus](wiki:Belarus|Belarus), [Russland](wiki:Russland|Russia), Balkan).

<table>
<tr><th>Rekord</th><th>Wer?</th></tr>
<tr><td>Größter Staat</td><td>Russland (auch ohne den asiatischen Teil)</td></tr>
<tr><td>Größter Staat ganz in Europa</td><td>Ukraine (rund 600.000 km²)</td></tr>
<tr><td>Kleinster Staat</td><td>[Vatikanstadt](wiki:Vatikanstadt|Vatican City) (0,44 km²) — auch der kleinste der Welt</td></tr>
<tr><td>Bevölkerungsreichster EU-Staat</td><td>Deutschland</td></tr>
<tr><td>Längster Fluss</td><td>[[wolga|Wolga]] (≈ 3.530 km), dann [[donau|Donau]]</td></tr>
<tr><td>Größter See</td><td>[Ladogasee](wiki:Ladogasee|Lake Ladoga) in Russland (≈ 18.000 km²)</td></tr>
<tr><td>Größte Insel</td><td>[Großbritannien](wiki:Großbritannien (Insel)|Great Britain), dann Island</td></tr>
<tr><td>Höchster Alpengipfel</td><td>[[mont-blanc|Mont Blanc]] (4.806 m)</td></tr>
</table>

**Gebirge**, die man kennen sollte: [[alpen|Alpen]], [Pyrenäen](wiki:Pyrenäen|Pyrenees) (Grenze Frankreich–Spanien), [Apenninen](wiki:Apennin|Apennine Mountains) (Rückgrat Italiens), [Karpaten](wiki:Karpaten|Carpathian Mountains) (Bogen durch Slowakei, Ukraine, Rumänien), [Skanden](wiki:Skanden|Scandinavian Mountains) (Norwegen/Schweden), [Balkangebirge](wiki:Balkangebirge|Balkan Mountains), [Kaukasus](wiki:Kaukasus|Caucasus Mountains) und Ural.`,
    },
    {
      id: 'map-europa-natur', type: 'map', title: 'Flüsse und Gebirge Europas',
      view: [-11, 35, 52, 67],
      layers: { cities: false, countryLabels: false, mountainLabels: false },
      rivers: [
        { name: 'Donau', labelAt: 0.5 }, { name: 'Rhein', labelAt: 0.5 }, { name: 'Wolga', labelAt: 0.5 }, { name: 'Weichsel', labelAt: 0.5 }, { name: 'Loire', labelAt: 0.5 },
        { name: 'Seine', labelAt: 0.5 }, { name: 'Po', labelAt: 0.5 }, { name: 'Ebro', labelAt: 0.5 }, { name: 'Elbe', labelAt: 0.5 }, { name: 'Dnepr', labelAt: 0.5 },
      ],
      points: [
        { lon: 10.7, lat: 45.9, label: 'Alpen', kind: 'land' }, { lon: 0.4, lat: 42.7, label: 'Pyrenäen', kind: 'land' }, { lon: 24.5, lat: 47.8, label: 'Karpaten', kind: 'land' },
        { lon: 15.0, lat: 64.3, label: 'Skanden', kind: 'land' }, { lon: 12.6, lat: 42.5, label: 'Apennin', kind: 'land' }, { lon: 24.9, lat: 43.2, label: 'Balkangebirge', kind: 'land' },
        { lon: 6.864, lat: 45.833, label: 'Mont Blanc', kind: 'peak', pos: 'l', detail: '**[Mont Blanc](wiki:Mont Blanc)** (4.806 m) — höchster Berg der [Alpen](wiki:Alpen|Alps).' },
        { lon: 42.439, lat: 43.355, label: 'Elbrus', kind: 'peak', pos: 'b', detail: '**[Elbrus](wiki:Elbrus|Mount Elbrus)** (5.642 m) — im Kaukasus; zählt zu Europa, wenn man die Grenze am Kaukasus-Kamm zieht.' },
        { lon: 31.529, lat: 60.816, label: 'Ladogasee', color: '#2f6fb6', pos: 'r', detail: 'Der **[Ladogasee](wiki:Ladogasee|Lake Ladoga)** (rund 18.000 km²) ist der größte See Europas.' },
      ],
      caption: 'Die Wolga (rund 3.530 km) ist der längste Fluss Europas, gefolgt von der Donau. Die braunen Flächen zeigen die großen Gebirge.',
    },
    {
      id: 'groesse', type: 'order', title: 'Wer ist größer?',
      prompt: 'Sortiere die Staaten nach ihrer **Fläche**, den größten zuerst.',
      items: ['Ukraine', 'Frankreich', 'Spanien', 'Schweden', 'Deutschland', 'Italien'],
      explain: 'Ukraine ≈ 604.000 km², Frankreich (europäischer Teil) ≈ 544.000, Spanien ≈ 506.000, Schweden ≈ 447.000, Deutschland ≈ 358.000, Italien ≈ 302.000 km². Russland wäre noch weit vor allen anderen.',
    },
    {
      id: 'karte-wo-liegt', type: 'game', viz: 'geo-europa', title: 'Wo liegt …?',
      params: { mode: 'locate', lockMode: true, goal: 'locate', rounds: 12 },
    },
    {
      id: 'map-quiz-nachbarn', type: 'map', title: 'Finde die Nachbarstaaten Deutschlands',
      view: [1.5, 46.0, 20.5, 57.6],
      layers: { cities: false, countryLabels: false, mountainLabels: false },
      quiz: { rounds: 9 },
      highlight: [
        { countries: ['Dänemark'], label: 'Dänemark', color: '#64748b', quiz: true }, { countries: ['Polen'], label: 'Polen', color: '#64748b', quiz: true },
        { countries: ['Tschechien'], label: 'Tschechien', color: '#64748b', quiz: true }, { countries: ['Österreich'], label: 'Österreich', color: '#64748b', quiz: true },
        { countries: ['Schweiz'], label: 'Schweiz', color: '#64748b', quiz: true }, { countries: ['Frankreich'], label: 'Frankreich', color: '#64748b', quiz: true },
        { countries: ['Luxemburg'], label: 'Luxemburg', color: '#64748b', quiz: true }, { countries: ['Belgien'], label: 'Belgien', color: '#64748b', quiz: true },
        { countries: ['Niederlande'], label: 'Niederlande', color: '#64748b', quiz: true },
      ],
    },
    {
      id: 'match-hauptstaedte', type: 'match', title: 'Die kniffligen Hauptstädte',
      prompt: 'Ordne die Hauptstädte zu — diese werden am häufigsten verwechselt.',
      pairs: [['Schweiz', 'Bern'], ['Slowenien', 'Ljubljana'], ['Slowakei', 'Bratislava'], ['Litauen', 'Vilnius'], ['Lettland', 'Riga'], ['Estland', 'Tallinn'], ['Republik Moldau', 'Chișinău']],
    },
    {
      id: 'hauptstadt-hinweise', type: 'callout', tone: 'warning', title: 'Fallen bei Hauptstädten',
      md: `
- **Schweiz:** [Bern](wiki:Bern|Bern) ist offiziell nur „Bundesstadt“ — eine Hauptstadt im Verfassungssinn hat die Schweiz nicht. [Zürich](wiki:Zürich|Zurich) ist größer, [Genf](wiki:Genf|Geneva) internationaler.
- **Niederlande:** Hauptstadt ist **[Amsterdam](wiki:Amsterdam|Amsterdam)**, Regierung und Parlament sitzen aber in **[Den Haag](wiki:Den Haag|The Hague)**.
- **Türkei:** Hauptstadt ist **[Ankara](wiki:Ankara|Ankara)**, nicht [Istanbul](wiki:Istanbul|Istanbul).
- **Ukraine:** Die Hauptstadt heißt heute auch im Deutschen meist **[Kyjiw](wiki:Kiew|Kyiv)** (früher *Kiew*, nach dem Russischen).`,
    },
    {
      id: 'karte-hauptstaedte', type: 'game', viz: 'geo-europa', title: 'Hauptstadt-Quiz Europa',
      params: { mode: 'capital', lockMode: true, goal: 'capital', rounds: 12 },
    },
    {
      id: 'map-quiz-hauptstaedte', type: 'map', title: 'Finde die Hauptstadt',
      view: 'europe',
      layers: { cities: false },
      quiz: { rounds: 10 },
      places: [
        { name: 'Bern', kind: 'capital' }, { name: 'Ljubljana', kind: 'capital' }, { name: 'Bratislava', kind: 'capital' }, { name: 'Vilnius', kind: 'capital' },
        { name: 'Riga', kind: 'capital' }, { name: 'Tallinn', kind: 'capital' }, { name: 'Den Haag', kind: 'capital' }, { name: 'Ankara', kind: 'capital' }, { name: 'Kiew', kind: 'capital' },
      ],
      points: [{ lon: 28.850, lat: 47.014, label: 'Chișinău', kind: 'capital' }],
    },
    {
      id: 'eu-europa', type: 'text', title: 'Europa ≠ EU ≠ Euro',
      md: `
Drei Begriffe, die oft vermischt werden:

- **Europa** ist der Erdteil mit über 40 Staaten.
- Die **[Europäische Union](wiki:Europäische Union|European Union)** ist ein Staatenverbund aus **27** Mitgliedern. Das [Vereinigte Königreich](wiki:Vereinigtes Königreich|United Kingdom) ist am 31. Januar 2020 ausgetreten („[Brexit](wiki:EU-Austritt des Vereinigten Königreichs|Brexit)“). Nicht dabei sind z. B. [Norwegen](wiki:Norwegen|Norway), die [Schweiz](wiki:Schweiz|Switzerland), [Island](wiki:Island|Iceland), das Vereinigte Königreich, [Serbien](wiki:Serbien|Serbia) und die [Ukraine](wiki:Ukraine|Ukraine).
- Der **[Euroraum](wiki:Euroraum|Eurozone)** umfasst nur die EU-Staaten, die den Euro eingeführt haben — [Dänemark](wiki:Dänemark|Denmark), [Schweden](wiki:Schweden|Sweden) oder [Polen](wiki:Polen|Poland) zahlen weiter mit eigener Währung.

Wie die EU funktioniert, lernst du in der Etappe *Politik & Staat*.`,
    },
    {
      id: 'map-eu', type: 'map', title: 'Die Europäische Union auf der Karte',
      view: 'europe',
      layers: { cities: false, mountains: false },
      highlight: [
        { countries: ['Belgien', 'Bulgarien', 'Dänemark', 'Deutschland', 'Estland', 'Finnland', 'Frankreich', 'Griechenland', 'Irland', 'Italien', 'Kroatien', 'Lettland', 'Litauen', 'Luxemburg', 'Malta', 'Niederlande', 'Österreich', 'Polen', 'Portugal', 'Rumänien', 'Schweden', 'Slowakei', 'Slowenien', 'Spanien', 'Tschechien', 'Ungarn', 'Republik Zypern'], label: 'EU-Mitgliedstaaten (27)', color: '#2563eb' },
        { countries: ['Norwegen', 'Schweiz', 'Island', 'Vereinigtes Königreich', 'Serbien', 'Ukraine'], label: 'Beispiele für Nicht-Mitglieder', color: '#ea580c' },
      ],
      points: [
        { lon: 9.906, lat: 49.845, label: 'Mitte der EU', kind: 'site', pos: 'r', detail: '**[Gadheim](wiki:Gadheim)** bei [Veitshöchheim](wiki:Veitshöchheim) nahe [Würzburg](wiki:Würzburg) ist seit dem Brexit der geografische Mittelpunkt der EU.' },
      ],
      caption: 'Blau: die 27 EU-Mitglieder. Orange: einige Staaten Europas, die nicht dazugehören. Tippe auf einen Legendeneintrag, um hineinzuzoomen.',
    },
    {
      id: 'quiz-eu', type: 'quiz', title: 'Drin oder draußen?',
      question: 'Welche dieser Staaten sind **nicht** Mitglied der Europäischen Union?',
      options: [
        { text: 'Norwegen', correct: true, why: 'Norwegen hat den Beitritt zweimal per Volksabstimmung abgelehnt (1972, 1994), ist aber im [Europäischen Wirtschaftsraum](wiki:Europäischer Wirtschaftsraum|European Economic Area).' },
        { text: 'Schweiz', correct: true, why: 'Die Schweiz ist über viele bilaterale Verträge eng mit der EU verbunden, aber kein Mitglied.' },
        { text: 'Vereinigtes Königreich', correct: true, why: 'Ausgetreten am 31. Januar 2020.' },
        { text: 'Island', correct: true, why: 'Island hat seinen Beitrittsantrag 2015 zurückgezogen.' },
        { text: 'Irland', correct: false, why: 'Irland ist seit 1973 Mitglied und hat den Euro.' },
        { text: 'Finnland', correct: false, why: 'Finnland ist seit 1995 Mitglied.' },
        { text: 'Kroatien', correct: false, why: 'Kroatien ist seit 2013 Mitglied — das bisher jüngste.' },
      ],
    },
    {
      id: 'eu-anzahl', type: 'numeric', title: 'Mitglieder zählen',
      question: 'Wie viele Mitgliedstaaten hat die Europäische Union seit dem Brexit?',
      answer: 27, tolerance: 0,
      explain: '**27.** Vor dem Austritt des Vereinigten Königreichs waren es 28.',
    },
    {
      id: 'fact-mitte', type: 'callout', tone: 'fact', title: 'Die Mitte der EU liegt in Unterfranken',
      md: `Seit dem Brexit liegt der geografische Mittelpunkt der EU in **[Gadheim](wiki:Gadheim|Gadheim)**, einem Ortsteil von [Veitshöchheim](wiki:Veitshöchheim|Veitshöchheim) bei [Würzburg](wiki:Würzburg|Würzburg). Und noch ein Klassiker: Das berühmte **[Nordkap](wiki:Nordkap|North Cape (Norway))** ist gar nicht der nördlichste Punkt des europäischen Festlands — es liegt auf einer Insel. Der nördlichste Festlandspunkt ist die Felsspitze **[Kinnarodden](wiki:Kinnarodden|Cape Nordkinn)** in Norwegen.`,
    },
    {
      id: 'recall-grenze', type: 'recall', title: 'Wo hört Europa auf?',
      prompt: 'Erkläre in 3–4 Sätzen, wo die Ostgrenze Europas verläuft, warum sie umstritten ist und welche Staaten deshalb in zwei Erdteilen liegen.',
      answer: `Nach der üblichen Konvention verläuft die Grenze entlang des **Uralgebirges** und des **Uralflusses**, über das **Kaspische Meer** und den **Kaukasus** (oder die Manytsch-Niederung nördlich davon), durch das **Schwarze Meer** und den **Bosporus**. Umstritten ist sie, weil Europa geologisch kein eigener Kontinent ist, sondern ein Teil der eurasischen Landmasse — die Grenze ist eine kulturell-historische Festlegung, und beim Kaukasus gibt es mehrere Varianten. Deshalb liegen **Russland**, die **Türkei** (Istanbul liegt auf beiden Seiten des Bosporus) und **Kasachstan** in Europa und Asien; je nach Kaukasus-Variante auch Georgien, Armenien und Aserbaidschan.`,
      hints: ['Welches Gebirge und welcher Fluss bilden den nördlichen Teil der Grenze?', 'Durch welche Stadt verläuft die Grenze mitten hindurch?'],
      cards: ['ostgrenze', 'transkontinental'],
    },
  ],
  cards: [
    { id: 'ostgrenze', front: 'Wo verläuft (nach üblicher Konvention) die Grenze zwischen Europa und Asien?', back: 'Ural-Gebirge, Uralfluss, Kaspisches Meer, Kaukasus (bzw. Manytsch-Niederung), Schwarzes Meer, Bosporus.' },
    { id: 'transkontinental', front: 'Welche Staaten liegen in Europa **und** Asien?', back: 'Vor allem Russland, die Türkei und Kasachstan (je nach Kaukasus-Grenze auch Georgien, Armenien, Aserbaidschan).' },
    { id: 'nachbarn', front: 'Die neun Nachbarstaaten Deutschlands?', back: 'Dänemark, Polen, Tschechien, Österreich, Schweiz, Frankreich, Luxemburg, Belgien, Niederlande.' },
    { id: 'wolga', front: 'Längster Fluss Europas?', back: 'Die Wolga (≈ 3.530 km, mündet ins Kaspische Meer). Zweitlängster: die Donau.' },
    { id: 'ladoga', front: 'Größter See Europas?', back: 'Der Ladogasee in Nordwestrussland (≈ 18.000 km²).' },
    { id: 'vatikan', front: 'Kleinster Staat Europas (und der Welt)?', back: 'Die Vatikanstadt, 0,44 km², vollständig von Rom umgeben.' },
    { id: 'ukraine', front: 'Größter Staat, der **vollständig** in Europa liegt?', back: 'Die Ukraine (rund 600.000 km²).' },
    { id: 'mont-blanc', front: 'Höchster Berg der Alpen?', back: 'Mont Blanc, 4.806 m (Frankreich/Italien). Zählt man den Kaukasus zu Europa, ist der Elbrus (5.642 m) höher.' },
    { id: 'pyrenaeen', front: 'Welches Gebirge trennt Frankreich und Spanien?', back: 'Die Pyrenäen (mit dem Kleinstaat Andorra).' },
    { id: 'karpaten', front: 'Welches Gebirge zieht sich im Bogen durch Slowakei, Ukraine und Rumänien?', back: 'Die Karpaten.' },
    { id: 'bern', front: 'Hauptstadt der Schweiz — und was ist daran besonders?', back: 'Bern — offiziell nur „Bundesstadt“; eine Hauptstadt im Verfassungssinn gibt es nicht.' },
    { id: 'amsterdam', front: 'Hauptstadt der Niederlande — und wo sitzt die Regierung?', back: 'Hauptstadt Amsterdam; Regierung und Parlament sitzen in Den Haag.' },
    { id: 'baltikum', front: 'Die Hauptstädte der drei baltischen Staaten (Nord → Süd)?', back: 'Estland: Tallinn · Lettland: Riga · Litauen: Vilnius.' },
    { id: 'eu27', front: 'Wie viele Mitglieder hat die EU — und seit wann ist das Vereinigte Königreich draußen?', back: '27 Mitglieder; Austritt des Vereinigten Königreichs am 31. Januar 2020.' },
    { id: 'nicht-eu', front: 'Nenne vier westeuropäische Staaten, die **nicht** in der EU sind.', back: 'Z. B. Norwegen, Schweiz, Island, Vereinigtes Königreich (dazu Kleinstaaten wie Liechtenstein).' },
    { id: 'nordkap', front: 'Ist das Nordkap der nördlichste Punkt des europäischen Festlands?', back: 'Nein — es liegt auf der Insel Magerøya. Nördlichster Festlandspunkt ist Kinnarodden (Norwegen).' },
    { id: 'eu-mitte', front: 'Wo liegt seit dem Brexit der geografische Mittelpunkt der EU?', back: 'In Gadheim (Veitshöchheim) bei Würzburg, Unterfranken.' },
  ],
};
