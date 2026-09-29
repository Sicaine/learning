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
Europa ist geografisch eigentlich eine große Halbinsel im Westen Eurasiens — das westliche Fünftel der Landmasse.[^wp-europa] Dass man es trotzdem als eigenen [[kontinent|Kontinent]] zählt, hat historische und kulturelle Gründe. Die übliche Grenze zu Asien verläuft entlang:

- **[[ural|Ural]]-Gebirge** und **Uralfluss**,
- **Kaspischem Meer** und **Kaukasus** (je nach Konvention auch weiter nördlich entlang der Manytsch-Niederung),
- **Schwarzem Meer** und **Bosporus** — mitten durch Istanbul.

Deshalb liegen **Russland**, die **Türkei** und **Kasachstan** in zwei Erdteilen. Insgesamt leben in Europa über **740 Mio. Menschen** auf etwa **10,5 Mio. km²**.`,
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
Grob teilt man Europa in **Nord-** (Skandinavien, Island, Finnland, Baltikum), **West-** (Frankreich, Benelux, Britische Inseln), **Mittel-** (Deutschland, Polen, Tschechien, Österreich, Schweiz), **Süd-** (Iberische Halbinsel, Italien, Griechenland) und **Ost-/Südosteuropa** (Ukraine, Belarus, Russland, Balkan).

<table>
<tr><th>Rekord</th><th>Wer?</th></tr>
<tr><td>Größter Staat</td><td>Russland (auch ohne den asiatischen Teil)</td></tr>
<tr><td>Größter Staat ganz in Europa</td><td>Ukraine (rund 600.000 km²)</td></tr>
<tr><td>Kleinster Staat</td><td>Vatikanstadt (0,44 km²) — auch der kleinste der Welt</td></tr>
<tr><td>Bevölkerungsreichster EU-Staat</td><td>Deutschland</td></tr>
<tr><td>Längster Fluss</td><td>[[wolga|Wolga]] (≈ 3.530 km), dann [[donau|Donau]]</td></tr>
<tr><td>Größter See</td><td>Ladogasee in Russland (≈ 18.000 km²)</td></tr>
<tr><td>Größte Insel</td><td>Großbritannien, dann Island</td></tr>
<tr><td>Höchster Alpengipfel</td><td>[[mont-blanc|Mont Blanc]] (4.806 m)</td></tr>
</table>

**Gebirge**, die man kennen sollte: [[alpen|Alpen]], Pyrenäen (Grenze Frankreich–Spanien), Apenninen (Rückgrat Italiens), Karpaten (Bogen durch Slowakei, Ukraine, Rumänien), Skanden (Norwegen/Schweden), Balkangebirge, Kaukasus und Ural.`,
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
      id: 'match-hauptstaedte', type: 'match', title: 'Die kniffligen Hauptstädte',
      prompt: 'Ordne die Hauptstädte zu — diese werden am häufigsten verwechselt.',
      pairs: [['Schweiz', 'Bern'], ['Slowenien', 'Ljubljana'], ['Slowakei', 'Bratislava'], ['Litauen', 'Vilnius'], ['Lettland', 'Riga'], ['Estland', 'Tallinn'], ['Republik Moldau', 'Chișinău']],
    },
    {
      id: 'hauptstadt-hinweise', type: 'callout', tone: 'warning', title: 'Fallen bei Hauptstädten',
      md: `
- **Schweiz:** Bern ist offiziell nur „Bundesstadt“ — eine Hauptstadt im Verfassungssinn hat die Schweiz nicht. Zürich ist größer, Genf internationaler.
- **Niederlande:** Hauptstadt ist **Amsterdam**, Regierung und Parlament sitzen aber in **Den Haag**.
- **Türkei:** Hauptstadt ist **Ankara**, nicht Istanbul.
- **Ukraine:** Die Hauptstadt heißt heute auch im Deutschen meist **Kyjiw** (früher *Kiew*, nach dem Russischen).`,
    },
    {
      id: 'karte-hauptstaedte', type: 'game', viz: 'geo-europa', title: 'Hauptstadt-Quiz Europa',
      params: { mode: 'capital', lockMode: true, goal: 'capital', rounds: 12 },
    },
    {
      id: 'eu-europa', type: 'text', title: 'Europa ≠ EU ≠ Euro',
      md: `
Drei Begriffe, die oft vermischt werden:

- **Europa** ist der Erdteil mit über 40 Staaten.
- Die **Europäische Union** ist ein Staatenverbund aus **27** Mitgliedern. Das Vereinigte Königreich ist am 31. Januar 2020 ausgetreten („Brexit“). Nicht dabei sind z. B. Norwegen, die Schweiz, Island, das Vereinigte Königreich, Serbien und die Ukraine.
- Der **Euroraum** umfasst nur die EU-Staaten, die den Euro eingeführt haben — Dänemark, Schweden oder Polen zahlen weiter mit eigener Währung.

Wie die EU funktioniert, lernst du in der Etappe *Politik & Staat*.`,
    },
    {
      id: 'quiz-eu', type: 'quiz', title: 'Drin oder draußen?',
      question: 'Welche dieser Staaten sind **nicht** Mitglied der Europäischen Union?',
      options: [
        { text: 'Norwegen', correct: true, why: 'Norwegen hat den Beitritt zweimal per Volksabstimmung abgelehnt (1972, 1994), ist aber im Europäischen Wirtschaftsraum.' },
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
      md: `Seit dem Brexit liegt der geografische Mittelpunkt der EU in **Gadheim**, einem Ortsteil von Veitshöchheim bei Würzburg. Und noch ein Klassiker: Das berühmte **Nordkap** ist gar nicht der nördlichste Punkt des europäischen Festlands — es liegt auf einer Insel. Der nördlichste Festlandspunkt ist die Felsspitze **Kinnarodden** in Norwegen.`,
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
