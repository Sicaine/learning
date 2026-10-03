export default {
  id: 'feiertage',
  title: 'Feiertage & Bräuche',
  summary: 'Warum hat Bayern mehr freie Tage als Berlin? Woher kommen Adventskranz und Maibaum, und warum beginnt der Karneval am 11.11.? Ein Gang durch das deutsche Festjahr.',
  minutes: 20,
  goals: [
    'Die neun bundesweiten gesetzlichen Feiertage nennen',
    'Erklären, warum Feiertage Ländersache sind, und regionale Beispiele kennen',
    'Ursprung und Ablauf von [[karneval|Karneval]] und [[advent|Advent]] beschreiben',
    'Wichtige Bräuche im Jahreslauf zeitlich einordnen',
  ],
  blocks: [
    {
      id: 'laendersache', type: 'text', title: 'Feiertage sind Ländersache',
      md: `
In Deutschland bestimmen die **[Bundesländer](wiki:Land (Deutschland)|States of Germany)**, welche Tage gesetzliche Feiertage sind. Der Bund hat nur einen einzigen Feiertag selbst festgelegt: den **[[tag-der-deutschen-einheit|Tag der Deutschen Einheit]]** am **3. Oktober** (seit 1990).

Neun Feiertage gelten in **allen** 16 Ländern:

<table>
<tr><th>Feiertag</th><th>Datum</th><th>Anlass</th></tr>
<tr><td>[Neujahr](wiki:Neujahr|New Year)</td><td>1. Januar</td><td>Jahresbeginn</td></tr>
<tr><td>[Karfreitag](wiki:Karfreitag|Good Friday)</td><td>Freitag vor Ostern</td><td>Kreuzigung Jesu</td></tr>
<tr><td>[Ostermontag](wiki:Ostermontag|Easter Monday)</td><td>Montag nach Ostern</td><td>Auferstehung Jesu</td></tr>
<tr><td>[Tag der Arbeit](wiki:Maifeiertag|Labour Day)</td><td>1. Mai</td><td>Arbeiterbewegung</td></tr>
<tr><td>[Christi Himmelfahrt](wiki:Christi Himmelfahrt|Feast of the Ascension)</td><td>39 Tage nach Ostersonntag (immer Donnerstag)</td><td>Rückkehr Jesu zu Gott; zugleich „[Vatertag](wiki:Vatertag|Father\'s Day)“</td></tr>
<tr><td>[Pfingstmontag](wiki:Pfingsten|Pentecost)</td><td>50 Tage nach Ostern (plus 1)</td><td>Ausgießung des Heiligen Geistes</td></tr>
<tr><td>Tag der Deutschen Einheit</td><td>3. Oktober</td><td>Wiedervereinigung 1990</td></tr>
<tr><td>1. [Weihnachtstag](wiki:Weihnachten|Christmas)</td><td>25. Dezember</td><td>Geburt Jesu</td></tr>
<tr><td>2. Weihnachtstag</td><td>26. Dezember</td><td>Geburt Jesu</td></tr>
</table>

Dazu kommen regionale Feiertage. Die meisten hat **[Bayern](wiki:Bayern|Bavaria)** (in überwiegend katholischen Gemeinden mit [Mariä Himmelfahrt](wiki:Mariä Himmelfahrt|Assumption of Mary) am 15. August bis zu 14), die wenigsten haben vor allem nord- und ostdeutsche Länder. Einige Beispiele:

- **[Heilige Drei Könige](wiki:Heilige Drei Könige|Biblical Magi)** (6. Januar): Bayern, Baden-Württemberg, [Sachsen](wiki:Sachsen|Saxony)-Anhalt
- **[Fronleichnam](wiki:Fronleichnam|Feast of Corpus Christi)** (Donnerstag, 60 Tage nach Ostern): vor allem katholisch geprägte Länder im Süden und Westen
- **[Reformationstag](wiki:Reformationstag|Reformation Day)** (31. Oktober): in den ostdeutschen Ländern und seit 2018 auch in Bremen, [Hamburg](wiki:Hamburg), Niedersachsen und Schleswig-Holstein
- **[Allerheiligen](wiki:Allerheiligen|All Saints\' Day)** (1. November): katholisch geprägte Länder
- **[Buß- und Bettag](wiki:Buß- und Bettag)**: nur noch in Sachsen
- **[Internationaler Frauentag](wiki:Weltfrauentag|International Women\'s Day)** (8. März): [Berlin](wiki:Berlin) (seit 2019) und [Mecklenburg-Vorpommern](wiki:Mecklenburg-Vorpommern) (seit 2023)
- **[Weltkindertag](wiki:Weltkindertag|Children\'s Day)** (20. September): [Thüringen](wiki:Thüringen|Thuringia) (seit 2019)[^wiki-feiertage]`,
    },
    {
      id: 'map-feiertage-konfession', type: 'map', title: 'Süd-West gegen Nord-Ost: Fronleichnam und Reformationstag',
      view: 'de',
      layers: { cities: false, rivers: false, stateLabels: true },
      highlight: [
        { countries: [], states: ['Baden-Württemberg', 'Bayern', 'Hessen', 'Nordrhein-Westfalen', 'Rheinland-Pfalz', 'Saarland'], label: 'Fronleichnam ist gesetzlicher Feiertag', color: '#7c3aed' },
        { countries: [], states: ['Brandenburg', 'Bremen', 'Hamburg', 'Mecklenburg-Vorpommern', 'Niedersachsen', 'Sachsen', 'Sachsen-Anhalt', 'Schleswig-Holstein', 'Thüringen'], label: 'Reformationstag ist gesetzlicher Feiertag', color: '#0d9488' },
      ],
      caption: 'Stand 2026, Quelle: Feiertagsgesetze der Länder (zusammengefasst bei [Wikipedia](wiki:Feiertage in Deutschland|Public holidays in Germany)). In einzelnen Gemeinden in Sachsen und Thüringen gilt zusätzlich Fronleichnam. Berlin hat keinen von beiden.',
    },
    {
      id: 'ostern-beweglich', type: 'callout', tone: 'insight', title: 'Warum wandert Ostern?',
      md: 'Ostern fällt auf den **ersten Sonntag nach dem ersten Frühlingsvollmond** — frühestens am 22. März, spätestens am 25. April. Diese Regel geht auf das [Konzil von Nicäa](wiki:Erstes Konzil von Nicäa|First Council of Nicaea) (325) zurück. Weil Karfreitag, Himmelfahrt, Pfingsten und Fronleichnam von Ostern abhängen, wandern sie alle mit. Weihnachten dagegen ist fest.',
    },
    {
      id: 'calc-himmelfahrt', type: 'numeric', title: 'Bewegliche Feiertage rechnen',
      question: 'Ostersonntag fällt auf den 5. April. Christi Himmelfahrt ist 39 Tage später. Auf welchen **Tag im Mai** fällt Himmelfahrt? (nur die Zahl)',
      answer: 14, tolerance: 0,
      hint: 'Vom 5. April bis 30. April sind es 25 Tage. Wie viele fehlen dann noch?',
      explain: '25 Tage bis Ende April, dann noch 14 Tage → **14. Mai**. Weil 39 Tage fünf Wochen plus vier Tage sind, fällt Himmelfahrt immer auf einen Donnerstag.',
    },
    {
      id: 'karneval', type: 'text', title: 'Karneval, Fastnacht, Fasching',
      md: `
Die „fünfte Jahreszeit“ hat drei Namen: **[Karneval](wiki:Karneval|Carnival)** im Rheinland, **[Fastnacht](wiki:Fastnacht|Carnival)** (oder [Fasnet](wiki:Schwäbisch-alemannische Fastnacht|Swabian-Alemannic Fastnacht)) im Südwesten, **Fasching** in Bayern und Österreich. Gemeint ist immer die ausgelassene Zeit **vor der [Fastenzeit](wiki:Fastenzeit|Lent)**, die mit dem **[Aschermittwoch](wiki:Aschermittwoch|Ash Wednesday)** beginnt und 40 Tage bis Ostern dauert.

- Die Session beginnt offiziell am **11.11. um 11:11 Uhr**. Die Elf gilt als „Narrenzahl“.
- Höhepunkt ist die Woche vor Aschermittwoch: **[Weiberfastnacht](wiki:Weiberfastnacht)** (Donnerstag; Frauen schneiden Männern die Krawatten ab), **[Rosenmontag](wiki:Rosenmontag)** mit den großen Umzügen in [Köln](wiki:Köln|Cologne), [Düsseldorf](wiki:Düsseldorf) und [Mainz](wiki:Mainz), **Veilchendienstag**.
- Der Ruf ist regional verschieden: „**Alaaf**“ in Köln, „**Helau**“ in Düsseldorf und Mainz.
- Die schwäbisch-alemannische **Fasnet** ist älter und ernster: holzgeschnitzte Masken, Hästräger, Umzüge mit Narrensprüngen.

Mit dem Aschermittwoch ist alles vorbei — traditionell isst man Fisch.`,
    },
    {
      id: 'advent', type: 'text', title: 'Advent und Weihnachten',
      md: `
Der **[[advent|Advent]]** (lat. *adventus*, „Ankunft“) umfasst die vier Sonntage vor Weihnachten. Viele heute weltweit verbreitete Bräuche stammen aus Deutschland:

- Der **[Adventskranz](wiki:Adventskranz|Advent wreath)** wurde **1839** vom Hamburger Theologen **[Johann Hinrich Wichern](wiki:Johann Hinrich Wichern)** erfunden — ursprünglich ein Wagenrad mit 20 kleinen roten und 4 großen weißen Kerzen, damit Waisenkinder die Tage bis Weihnachten zählen konnten.
- Der **[Weihnachtsbaum](wiki:Weihnachtsbaum|Christmas tree)** ist seit dem 16. Jahrhundert in Deutschland belegt und verbreitete sich im 19. Jahrhundert weltweit.
- **Weihnachtsmärkte** gibt es seit dem Spätmittelalter; berühmt sind der **[Dresdner Striezelmarkt](wiki:Dresdner Striezelmarkt|Striezelmarkt)** (seit 1434) und der **[Nürnberger Christkindlesmarkt](wiki:Nürnberger Christkindlesmarkt|Christkindlesmarkt, Nuremberg)**.
- Am **6. Dezember** kommt der **[Nikolaus](wiki:Nikolaus von Myra|Saint Nicholas)**; die Bescherung findet in Deutschland — anders als in England oder den USA — schon an **[Heiligabend](wiki:Heiligabend|Christmas Eve)** (24. Dezember) statt. Im Süden bringt das **[Christkind](wiki:Christkind)** die Geschenke, im Norden eher der **[Weihnachtsmann](wiki:Weihnachtsmann|Santa Claus)**.`,
    },
    {
      id: 'jahreslauf', type: 'game', viz: 'timeline', title: 'Das Festjahr in der richtigen Reihenfolge',
      params: { mode: 'sort', events: [
        { year: 1, label: 'Heilige Drei Könige', detail: '6. Januar — Sternsinger ziehen von Haus zu Haus.' },
        { year: 2, label: 'Weiberfastnacht', detail: 'Donnerstag vor Aschermittwoch (Februar/März).' },
        { year: 3, label: 'Walpurgisnacht', detail: 'Nacht zum 1. Mai; im Harz treffen sich der Sage nach die Hexen auf dem Brocken.' },
        { year: 4, label: 'Maibaum aufstellen', detail: '1. Mai — besonders in Bayern.' },
        { year: 5, label: 'Oktoberfest-Anstich', detail: 'Ende September in München: „O’zapft is!“' },
        { year: 6, label: 'Erntedankfest', detail: 'Erster Sonntag im Oktober.' },
        { year: 7, label: 'Sankt Martin', detail: '11. November — Laternenumzüge der Kinder.' },
        { year: 8, label: 'Nikolaus', detail: '6. Dezember.' },
      ] },
      caption: 'Hier sind die „Jahre“ nur Positionen im Kalender — tippe die Bräuche von Januar bis Dezember an.',
    },
    {
      id: 'weitere', type: 'text', title: 'Noch mehr Bräuche',
      md: `
- **[Oktoberfest](wiki:Oktoberfest):** Das größte Volksfest der Welt geht auf die **Hochzeit von Kronprinz Ludwig (später König [Ludwig I.](wiki:Ludwig I. (Bayern)|Ludwig I of Bavaria)) mit [Therese von Sachsen-Hildburghausen](wiki:Therese von Sachsen-Hildburghausen|Therese of Saxe-Hildburghausen) 1810** zurück — daher der Name [Theresienwiese](wiki:Theresienwiese). Es beginnt Ende September und endet am ersten Oktobersonntag (bzw. am 3. Oktober).
- **[Sankt Martin](wiki:Martin von Tours|Martin of Tours)** (11. November): Kinder ziehen mit Laternen durch die Straßen und erinnern an den heiligen Martin, der seinen Mantel mit einem Bettler teilte.
- **[Maibaum](wiki:Maibaum|Maypole):** Am 1. Mai wird vielerorts ein geschmückter Baum aufgestellt; das „Maibaumklauen“ benachbarter Dörfer ist eine beliebte Tradition.
- **[Silvester](wiki:Silvester|New Year\'s Eve):** Feuerwerk um Mitternacht, [Bleigießen](wiki:Bleigießen|Molybdomancy) (heute meist Wachsgießen) und — ein kurioser deutscher Brauch — der britische Sketch **„[Dinner for One](wiki:Dinner for One)“** im Fernsehen.
- **[Schultüte](wiki:Schultüte):** Zur Einschulung bekommen Kinder eine mit Süßigkeiten gefüllte Tüte — ein typisch deutscher Brauch.`,
    },
    {
      id: 'map-feste-orte', type: 'map', title: 'Wo wird was gefeiert?',
      view: 'de',
      layers: { cities: false },
      rivers: [{ name: 'Rhein', label: false }],
      places: [
        { name: 'Köln', pos: 'l', color: '#dc2626', detail: '**[Köln](wiki:Köln|Cologne)** — „Alaaf“. Der **[Kölner Karneval](wiki:Kölner Karneval|Cologne Carnival)** beginnt am 11.11. und gipfelt im Rosenmontagszug.' },
        { name: 'Düsseldorf', pos: 'l', color: '#dc2626', detail: '**[Düsseldorf](wiki:Düsseldorf)** — hier ruft man „Helau“; Rosenmontagszug mit Motivwagen.' },
        { name: 'Mainz', pos: 'l', color: '#dc2626', detail: '**[Mainz](wiki:Mainz)** — „Helau“; die **[Mainzer Fastnacht](wiki:Mainzer Fastnacht)** ist durch das Fernsehen bundesweit bekannt.' },
        { name: 'München', pos: 'r', color: '#2563eb', detail: '**[München](wiki:München|Munich)** — Fasching im Süden, und im Herbst das **[Oktoberfest](wiki:Oktoberfest)** auf der Theresienwiese (Ende September bis Anfang Oktober).' },
        { name: 'Dresden', pos: 'r', color: '#ca8a04', detail: '**[Dresden](wiki:Dresden)** — der **[Dresdner Striezelmarkt](wiki:Dresdner Striezelmarkt)** gilt mit seinem Beginn 1434 als ältester Weihnachtsmarkt Deutschlands.' },
        { name: 'Nürnberg', pos: 'r', color: '#ca8a04', detail: '**[Nürnberg](wiki:Nürnberg|Nuremberg)** — berühmt für den **[Christkindlesmarkt](wiki:Nürnberger Christkindlesmarkt|Christkindlesmarkt, Nuremberg)**.' },
        { name: 'Hamburg', pos: 'l', color: '#ca8a04', detail: '**[Hamburg](wiki:Hamburg)** — hier erfand [Johann Hinrich Wichern](wiki:Johann Hinrich Wichern|Johann Hinrich Wichern) 1839 im Rauhen Haus den **Adventskranz**.' },
      ],
      points: [
        { lon: 8.625, lat: 48.168, label: 'Rottweil', pos: 'l', color: '#16a34a', detail: '**[Rottweil](wiki:Rottweil)** — Hochburg der schwäbisch-alemannischen **[Fasnet](wiki:Schwäbisch-alemannische Fastnacht)** mit dem Narrensprung.' },
        { lon: 10.617, lat: 51.799, label: 'Brocken', kind: 'peak', pos: 'r', color: '#7c3aed', detail: 'Auf dem **[Brocken](wiki:Brocken)** im Harz treffen sich der Sage nach in der **[Walpurgisnacht](wiki:Walpurgisnacht)** (30. April) die Hexen.' },
      ],
      caption: 'Rot: Karneval am Rhein · Grün: Fasnet im Südwesten · Blau: Fasching und Oktoberfest · Gelb: Advent und Weihnachtsmärkte · Violett: Walpurgisnacht.',
    },
    {
      id: 'quiz-karneval', type: 'quiz', title: 'Kölle Alaaf?',
      question: 'Welche Aussagen zum Karneval stimmen? (Mehrfachauswahl)',
      options: [
        { text: 'Die Session beginnt am 11.11. um 11:11 Uhr.', correct: true, why: 'Die Elf gilt als Narrenzahl.' },
        { text: 'In Köln ruft man „Alaaf“, in Düsseldorf und Mainz „Helau“.', correct: true, why: 'Die Rufe sind ein Erkennungszeichen der Karnevalshochburgen.' },
        { text: 'Mit dem Aschermittwoch beginnt die Fastenzeit.', correct: true, why: '40 Tage (ohne Sonntage) bis Ostern.' },
        { text: 'Rosenmontag ist ein bundesweiter gesetzlicher Feiertag.', correct: false, why: 'Rosenmontag ist nirgends gesetzlicher Feiertag — im Rheinland haben aber viele Betriebe frei.' },
      ],
    },
    {
      id: 'match', type: 'match', title: 'Brauch und Herkunft',
      pairs: [
        ['Adventskranz', 'Johann Hinrich Wichern, Hamburg 1839'],
        ['Oktoberfest', 'Hochzeit von Ludwig und Therese, 1810'],
        ['Striezelmarkt', 'Dresden, seit 1434'],
        ['Sankt Martin', 'Laternenumzug am 11. November'],
        ['Walpurgisnacht', 'Hexen auf dem Brocken im Harz'],
        ['Tag der Deutschen Einheit', 'Einziger vom Bund festgelegter Feiertag'],
      ],
    },
    {
      id: 'fact-dinner', type: 'callout', tone: 'fact', title: '„The same procedure as every year“',
      md: 'Der englische Sketch „Dinner for One“ wurde 1963 vom [NDR](wiki:Norddeutscher Rundfunk) aufgezeichnet und läuft seit Jahrzehnten an Silvester im deutschen Fernsehen — er gilt als eine der meistwiederholten Sendungen der Fernsehgeschichte. In Großbritannien selbst ist er dagegen kaum bekannt.',
    },
    {
      id: 'map-quiz-feste', type: 'map', title: 'Wo gehört das Fest hin?',
      view: 'de',
      layers: { cities: false },
      quiz: { rounds: 5 },
      points: [
        { lon: 11.550, lat: 48.133, label: 'Oktoberfest', kind: 'site' },
        { lon: 13.738, lat: 51.050, label: 'Striezelmarkt (ältester Weihnachtsmarkt)', kind: 'site' },
        { lon: 11.077, lat: 49.454, label: 'Christkindlesmarkt', kind: 'site' },
        { lon: 10.072, lat: 53.554, label: 'Erfindung des Adventskranzes (1839)', kind: 'site' },
        { lon: 10.617, lat: 51.799, label: 'Hexenberg der Walpurgisnacht', kind: 'peak' },
      ],
    },
    {
      id: 'recall', type: 'recall', title: 'Erklär es',
      prompt: 'Warum hat nicht jeder in Deutschland gleich viele Feiertage? Nenne zwei Beispiele für regionale Feiertage.',
      answer: 'Feiertage sind in Deutschland **Ländersache**: Jedes Bundesland legt seine gesetzlichen Feiertage selbst fest; nur den **3. Oktober** hat der Bund bestimmt. Die Unterschiede spiegeln vor allem die **konfessionelle Prägung**: Katholische Länder im Süden haben z. B. **Fronleichnam** und **Allerheiligen**, evangelisch geprägte Länder den **Reformationstag** (31.10.). Sachsen hat den Buß- und Bettag, Berlin und Mecklenburg-Vorpommern den Frauentag, Thüringen den Weltkindertag.',
      hints: ['Wer ist zuständig: Bund oder Länder?', 'Denk an katholisch und evangelisch.'],
      cards: ['laendersache', 'regional'],
    },
  ],
  cards: [
    { id: 'laendersache', front: 'Wer legt in Deutschland die gesetzlichen Feiertage fest?', back: 'Die Bundesländer — nur den Tag der Deutschen Einheit (3. Oktober) hat der Bund festgelegt.' },
    { id: 'neun', front: 'Die neun bundesweiten Feiertage', back: 'Neujahr, Karfreitag, Ostermontag, 1. Mai, Christi Himmelfahrt, Pfingstmontag, 3. Oktober, 1. und 2. Weihnachtstag.' },
    { id: 'einheit', front: 'Tag der Deutschen Einheit — Datum und Anlass', back: '3. Oktober — Wiedervereinigung am 3.10.1990.' },
    { id: 'ostern', front: 'Wie wird der Ostertermin bestimmt?', back: 'Erster Sonntag nach dem ersten Frühlingsvollmond (22. März bis 25. April).' },
    { id: 'himmelfahrt', front: 'Wann ist Christi Himmelfahrt?', back: '39 Tage nach Ostersonntag, immer an einem Donnerstag (zugleich „Vatertag“).' },
    { id: 'regional', front: 'Beispiele für regionale Feiertage', back: 'Heilige Drei Könige, Fronleichnam, Mariä Himmelfahrt, Reformationstag, Allerheiligen, Buß- und Bettag (Sachsen), Frauentag (Berlin, MV), Weltkindertag (Thüringen).' },
    { id: 'reformationstag', front: 'Reformationstag — Datum', back: '31. Oktober (Luthers Thesenanschlag 1517); Feiertag im Osten und seit 2018 in vier norddeutschen Ländern.' },
    { id: 'bayern', front: 'Welches Bundesland hat die meisten Feiertage?', back: 'Bayern.' },
    { id: 'karneval-start', front: 'Wann beginnt die Karnevalssession?', back: 'Am 11.11. um 11:11 Uhr.' },
    { id: 'karneval-namen', front: 'Karneval, Fastnacht, Fasching — wo sagt man was?', back: 'Karneval: Rheinland. Fastnacht/Fasnet: Südwesten (Mainz, schwäbisch-alemannisch). Fasching: Bayern, Österreich.' },
    { id: 'alaaf', front: 'Alaaf oder Helau?', back: 'Köln: „Alaaf“. Düsseldorf und Mainz: „Helau“.' },
    { id: 'aschermittwoch', front: 'Was beginnt am Aschermittwoch?', back: 'Die 40-tägige Fastenzeit vor Ostern — der Karneval ist vorbei.' },
    { id: 'adventskranz', front: 'Wer erfand den Adventskranz, wann?', back: 'Johann Hinrich Wichern, 1839 in Hamburg (für Waisenkinder).' },
    { id: 'bescherung', front: 'Wann ist in Deutschland Bescherung?', back: 'An Heiligabend, dem 24. Dezember.' },
    { id: 'oktoberfest', front: 'Ursprung des Oktoberfests', back: 'Hochzeit von Kronprinz Ludwig mit Therese von Sachsen-Hildburghausen 1810 (daher „Theresienwiese“).' },
    { id: 'martin', front: 'Sankt Martin — Datum und Brauch', back: '11. November; Laternenumzüge; Martin teilte seinen Mantel mit einem Bettler.' },
    { id: 'walpurgis', front: 'Walpurgisnacht', back: 'Nacht zum 1. Mai; der Sage nach Hexentreffen auf dem Brocken im Harz.' },
  ],
};
