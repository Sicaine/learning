export default {
  id: 'reichsgruendung',
  title: '1848 & die Reichsgründung 1871',
  summary: 'Vom Hambacher Fest über die Revolution in der Paulskirche bis zu Bismarcks Einigungskriegen: zwei Wege zur deutschen Einheit — einer von unten, einer von oben.',
  minutes: 22,
  goals: [
    'Den [[vormaerz|Vormärz]] und die Herkunft von Schwarz-Rot-Gold erklären',
    'Ziele und Scheitern der [[maerzrevolution|Revolution 1848/49]] und der [[paulskirche|Nationalversammlung]] beschreiben',
    'Die drei [[einigungskriege]] und die [[reichsgruendung|Reichsgründung]] 1871 einordnen',
    '[[bismarck|Bismarcks]] Innenpolitik zwischen Repression und Sozialversicherung erklären',
  ],
  blocks: [
    {
      id: 'vormaerz', type: 'text', title: 'Einheit und Freiheit: der Vormärz',
      md: `
Nach 1815 wollten viele Bürger, Studenten und Professoren zweierlei: einen **Nationalstaat** statt rund 40 Einzelstaaten und **Freiheit** — Verfassung, Pressefreiheit, Mitsprache. Die Fürsten des [[deutscher-bund|Deutschen Bundes]] reagierten mit Zensur und Verfolgung (**[Karlsbader Beschlüsse](wiki:Karlsbader Beschlüsse|Carlsbad Decrees) 1819**).

Stationen des **[[vormaerz|Vormärz]]**:

- **[Wartburgfest](wiki:Wartburgfest|Wartburg Festival) 1817**: [Burschenschaften](wiki:Burschenschaft|Burschenschaft) fordern nationale Einheit.
- **[Hambacher Fest](wiki:Hambacher Fest|Hambach Festival) 1832**: 20.000 bis 30.000 Menschen auf dem [Hambacher Schloss](wiki:Hambacher Schloss|Hambach Castle) (Pfalz) — **[Schwarz-Rot-Gold](wiki:Schwarz-Rot-Gold)** wird zum Symbol von Einheit und Freiheit.
- **[Göttinger Sieben](wiki:Göttinger Sieben|Göttingen Seven) 1837**: sieben Professoren (darunter die Brüder **[Grimm](wiki:Brüder Grimm|Brothers Grimm)**) protestieren gegen einen Verfassungsbruch und werden entlassen.

Wirtschaftlich wuchs Deutschland schneller zusammen als politisch: Der **[Deutsche Zollverein](wiki:Deutscher Zollverein|Zollverein)** (1834) schuf einen Binnenmarkt ohne Österreich, und 1835 fuhr die erste deutsche Eisenbahn von **[Nürnberg nach Fürth](wiki:Bayerische Ludwigsbahn|Bavarian Ludwig Railway)**.[^lemo-vormaerz]`,
    },
    {
      id: 'revolution', type: 'text', title: '1848: Revolution und Paulskirche',
      md: `
Im [Februar 1848](wiki:Februarrevolution 1848|French Revolution of 1848) stürzte in Paris der König; im **[März](wiki:Märzrevolution|German revolutions of 1848–1849)** sprang die Revolution auf die deutschen Staaten über. In Berlin kam es zu Barrikadenkämpfen (18. März). Die Fürsten gaben zunächst nach und beriefen liberale „Märzminister".

Am **18. Mai 1848** trat in der Frankfurter **[Paulskirche](wiki:Paulskirche (Frankfurt am Main)|St. Paul's Church, Frankfurt)** die **[[paulskirche|Nationalversammlung]]** zusammen — das erste frei gewählte gesamtdeutsche Parlament. Sie verabschiedete einen modernen **Grundrechtekatalog** und am **28. März 1849** eine [Reichsverfassung](wiki:Paulskirchenverfassung|Frankfurt Constitution). Zentrale Streitfrage:

- **[großdeutsch](wiki:Großdeutsche Lösung|Greater Germany)**: mit den deutschsprachigen Gebieten Österreichs, oder
- **[kleindeutsch](wiki:Kleindeutsche Lösung|Lesser Germany)**: ohne Österreich, unter Führung Preußens.

Man entschied sich kleindeutsch und bot dem preußischen König **[Friedrich Wilhelm IV.](wiki:Friedrich Wilhelm IV.|Frederick William IV)** die Kaiserkrone an. Er lehnte ab — eine Krone „aus Dreck und Letten" von Volksvertretern wollte er nicht. Preußische und österreichische Truppen schlugen 1849 die letzten Aufstände nieder (Festung **[Rastatt](wiki:Rastatt|Rastatt)**, Juli 1849).[^wp-maerzrevolution]`,
    },
    {
      id: 'map-vormaerz', type: 'map', title: 'Orte von Einheit und Freiheit 1817–1849',
      view: [6.2, 47.8, 14.0, 52.9],
      layers: { cities: false },
      rivers: [{ name: 'Rhein', labelAt: 0.45 }, { name: 'Main', labelAt: 0.5 }],
      places: [
        { name: 'Wartburg', num: 1, pos: 'r', detail: '**[Wartburg](wiki:Wartburg|Wartburg)** — 1817 das Wartburgfest der Burschenschaften.' },
        { name: 'Hambacher Schloss', num: 2, pos: 'l', label: 'Hambach', detail: '**[Hambacher Schloss](wiki:Hambacher Schloss|Hambach Castle)** — 1832 das Hambacher Fest: Schwarz-Rot-Gold als Symbol von Einheit und Freiheit.' },
        { name: 'Göttingen', num: 3, pos: 'r', detail: '**[Göttingen](wiki:Göttingen|Göttingen)** — 1837 protestieren die „Göttinger Sieben“ gegen den Verfassungsbruch.' },
        { name: 'Frankfurt am Main', num: 4, label: 'Frankfurt', pos: 'r', detail: '**[Frankfurt](wiki:Frankfurt am Main|Frankfurt)** — 1848/49 tagt hier in der Paulskirche die Nationalversammlung.' },
        { name: 'Berlin', num: 5, pos: 'l', detail: '**[Berlin](wiki:Berlin|Berlin)** — im März 1848 Barrikadenkämpfe.' },
      ],
      points: [
        { lon: 8.209, lat: 48.859, label: 'Rastatt', num: 6, pos: 'r', detail: '**[Rastatt](wiki:Rastatt|Rastatt)** — im Juli 1849 fällt die letzte Bastion der Revolution.' },
      ],
      caption: 'Die Ziffern führen durch die Jahre: 1 = 1817, 2 = 1832, 3 = 1837, 4 = 1848, 5 = 1848, 6 = 1849.',
    },
    {
      id: 'erbe', type: 'callout', tone: 'insight', title: 'Gescheitert — und doch erfolgreich',
      md: `Die Revolution scheiterte, aber ihre Ideen blieben: Die **Grundrechte der Paulskirche** wurden Vorbild für die [Weimarer Verfassung](wiki:Weimarer Verfassung|Weimar Constitution) 1919 und das **[Grundgesetz](wiki:Grundgesetz für die Bundesrepublik Deutschland|Basic Law for the Federal Republic of Germany)** 1949. Und **Schwarz-Rot-Gold** ist heute die Bundesflagge — als Farben der Demokratie, nicht des Kaiserreichs (das Schwarz-Weiß-Rot führte).`,
    },
    {
      id: 'bismarck', type: 'text', title: 'Bismarck: Einheit durch „Eisen und Blut"',
      md: `
1862 wurde **[[bismarck|Otto von Bismarck]]** preußischer Ministerpräsident, mitten in einem [Verfassungskonflikt](wiki:Preußischer Verfassungskonflikt) um die Heeresreform.[^lemo-reaktionszeit] Vor dem Landtag sagte er: *„Nicht durch Reden und Majoritätsbeschlüsse werden die großen Fragen der Zeit entschieden — das ist der große Fehler von 1848 und 1849 gewesen —, sondern durch [Eisen und Blut](wiki:Blut und Eisen|Blood and Iron (speech))."*

Die Einheit kam durch drei **[[einigungskriege]]**:

1. **[1864](wiki:Deutsch-Dänischer Krieg|Second Schleswig War)** gegen **Dänemark** (gemeinsam mit Österreich) — um [Schleswig und Holstein](wiki:Schleswig-Holstein|Schleswig-Holstein).
2. **[1866](wiki:Deutscher Krieg|Austro-Prussian War)** gegen **Österreich** — Entscheidungsschlacht bei **[Königgrätz](wiki:Schlacht bei Königgrätz|Battle of Königgrätz)**. Der Deutsche Bund zerbricht, Preußen gründet den **[Norddeutschen Bund](wiki:Norddeutscher Bund|North German Confederation)** (1867).
3. **[1870/71](wiki:Deutsch-Französischer Krieg|Franco-Prussian War)** gegen **Frankreich** — ausgelöst durch die von Bismarck zugespitzte **[Emser Depesche](wiki:Emser Depesche|Ems dispatch)**. Nach dem Sieg bei **[Sedan](wiki:Schlacht bei Sedan|Battle of Sedan)** (September 1870) schließen sich die süddeutschen Staaten an.`,
    },
    {
      id: 'map-einigungskriege', type: 'map', title: 'Die Einigungskriege',
      view: [-1.0, 46.5, 18.0, 56.3],
      layers: { cities: false },
      highlight: [
        { label: 'Gegner 1864: Dänemark', color: '#2563eb', countries: ['Dänemark'] },
        { label: 'Gegner 1866: Österreich', color: '#c2410c', countries: ['Österreich'] },
        { label: 'Gegner 1870/71: Frankreich', color: '#7c3aed', countries: ['Frankreich'] },
      ],
      places: [
        { name: 'Berlin', kind: 'capital', pos: 'l', detail: '**[Berlin](wiki:Berlin|Berlin)** — Hauptstadt Preußens und später des Reiches.' },
        { name: 'Sedan', num: 3, pos: 'l', detail: '**[Sedan](wiki:Schlacht bei Sedan|Battle of Sedan)** — September 1870: Napoleon III. gerät in Gefangenschaft.' },
        { name: 'Versailles', num: 4, pos: 'l', detail: '**[Versailles](wiki:Versailles|Versailles, Yvelines)** — 18. Januar 1871: Kaiserproklamation im Spiegelsaal.' },
      ],
      points: [
        { lon: 9.783, lat: 54.917, label: 'Düppel', num: 1, pos: 'r', detail: '**Düppel** (Dybbøl) — 1864: Preußen stürmt die dänischen Schanzen.' },
        { lon: 15.832, lat: 50.210, label: 'Königgrätz', num: 2, pos: 'r', detail: '**[Königgrätz](wiki:Schlacht bei Königgrätz|Battle of Königgrätz)** — 3. Juli 1866: Preußen entscheidet den Krieg gegen Österreich.' },
      ],
      caption: 'Die Gegner sind mit heutigen Staatsgrenzen markiert (die Grenzen von 1864–1871 waren andere). Ziffern: 1 Düppel (1864), 2 Königgrätz (1866), 3 Sedan (1870), 4 Versailles (1871).',
    },
    {
      id: 'gruendung', type: 'text', title: '18. Januar 1871: Kaiserproklamation in Versailles',
      md: `
Im **[Spiegelsaal von Versailles](wiki:Spiegelsaal von Versailles|Hall of Mirrors)** — im besiegten Frankreich — wurde der preußische König **[Wilhelm I.](wiki:Wilhelm I. (Deutsches Reich)|Wilhelm I)** am **18. Januar 1871** zum **Deutschen Kaiser** ausgerufen. Frankreich musste **[Elsass-Lothringen](wiki:Elsass-Lothringen|Alsace–Lorraine)** abtreten und hohe Reparationen zahlen — eine Demütigung mit langen Folgen.

Das **[Deutsche Kaiserreich](wiki:Deutsches Kaiserreich|German Empire)** war ein Bundesstaat aus 25 Staaten und dem Reichsland Elsass-Lothringen:

- **Kaiser** = König von Preußen; er ernannte den **[Reichskanzler](wiki:Reichskanzler|Reich Chancellor)** (Bismarck bis 1890).
- Der **Reichstag** wurde nach allgemeinem, gleichem und geheimem Wahlrecht für **Männer** ab 25 gewählt — für damalige Verhältnisse fortschrittlich. Die Regierung war ihm aber nicht verantwortlich.
- **Preußen** stellte rund zwei Drittel von Fläche und Bevölkerung.

Die Einheit war eine „Revolution von oben" — geschaffen von Fürsten, Militär und Diplomatie, nicht vom Volk wie 1848 erhofft.[^wp-reichsgruendung]`,
    },
    {
      id: 'innenpolitik', type: 'text', title: 'Zuckerbrot und Peitsche',
      md: `
Bismarck bekämpfte, wen er für „Reichsfeinde" hielt: im **[Kulturkampf](wiki:Kulturkampf|Culture war)** (ab 1871) die katholische Kirche, mit dem **[Sozialistengesetz](wiki:Sozialistengesetz|Anti-Socialist Laws)** (1878–1890) die Sozialdemokratie. Gleichzeitig wollte er den Arbeitern die SPD abspenstig machen — und schuf die erste staatliche **[Sozialversicherung](wiki:Bismarcksche Sozialgesetzgebung)** der Welt:

- **1883** Krankenversicherung
- **1884** Unfallversicherung
- **1889** Invaliditäts- und Altersversicherung

Diese Säulen tragen den deutschen Sozialstaat bis heute. Außenpolitisch sicherte Bismarck das Reich mit einem komplizierten Bündnissystem. **1890** entließ ihn der junge Kaiser **[Wilhelm II.](wiki:Wilhelm II. (Deutsches Reich)|Wilhelm II)** („[Der Lotse geht von Bord](wiki:Der Lotse geht von Bord|Dropping the Pilot)").[^lemo-kaiserreich]`,
    },
    {
      id: 'timeline-einheit', type: 'game', viz: 'timeline', title: 'Der Weg zur Einheit',
      params: {
        mode: 'sort',
        events: [
          { year: 1817, label: 'Wartburgfest' },
          { year: 1832, label: 'Hambacher Fest' },
          { year: 1834, label: 'Deutscher Zollverein' },
          { year: 1848, label: 'Paulskirche tritt zusammen' },
          { year: 1862, label: 'Bismarck Ministerpräsident' },
          { year: 1866, label: 'Schlacht bei Königgrätz' },
          { year: 1871, label: 'Kaiserproklamation' },
          { year: 1883, label: 'Krankenversicherung' },
        ],
      },
    },
    {
      id: 'order-kriege', type: 'order', title: 'Die Einigungskriege',
      prompt: 'Bringe die Einigungskriege in die richtige Reihenfolge.',
      items: ['Krieg gegen Dänemark um Schleswig und Holstein', 'Krieg gegen Österreich, Schlacht bei Königgrätz', 'Gründung des Norddeutschen Bundes', 'Emser Depesche und Krieg gegen Frankreich', 'Kaiserproklamation in Versailles'],
      explain: '1864 → 1866 → 1867 → 1870 → 18. Januar 1871.',
    },
    {
      id: 'quiz-1848', type: 'quiz', title: 'Die Paulskirche',
      question: 'Welche Aussagen über die Frankfurter Nationalversammlung stimmen?',
      options: [
        { text: 'Sie war das erste frei gewählte gesamtdeutsche Parlament.', correct: true, why: 'Gewählt im Frühjahr 1848, Eröffnung am 18. Mai 1848.' },
        { text: 'Sie verabschiedete einen Katalog von Grundrechten.', correct: true, why: 'Vorbild für Weimar und das Grundgesetz.' },
        { text: 'Friedrich Wilhelm IV. nahm die angebotene Kaiserkrone an.', correct: false, why: 'Er lehnte sie 1849 ab — eine Krone vom Parlament wollte er nicht.' },
        { text: 'Sie entschied sich für die großdeutsche Lösung mit Österreich.', correct: false, why: 'Am Ende setzte sich die kleindeutsche Lösung durch.' },
      ],
    },
    {
      id: 'match-orte', type: 'match', title: 'Orte der Einheit',
      pairs: [
        ['Hambach', 'Fest 1832, Schwarz-Rot-Gold'],
        ['Paulskirche', 'Nationalversammlung 1848/49'],
        ['Rastatt', 'letzte Bastion der Revolution 1849'],
        ['Königgrätz', 'Sieg Preußens über Österreich 1866'],
        ['Sedan', 'Sieg über Frankreich 1870'],
        ['Versailles', 'Kaiserproklamation 1871'],
      ],
    },
    {
      id: 'map-quiz-einheit', type: 'map', title: 'Orte der Einheit',
      view: [2.0, 47.0, 18.0, 55.3],
      layers: { cities: false },
      quiz: { rounds: 6 },
      places: [{ name: 'Hambacher Schloss', label: 'Hambacher Schloss' }, { name: 'Wartburg' }, { name: 'Frankfurt am Main', label: 'Frankfurt' }, { name: 'Sedan' }, { name: 'Versailles' }, { name: 'Berlin' }],
      points: [{ lon: 15.832, lat: 50.210, label: 'Königgrätz' }],
    },
    {
      id: 'recall-wege', type: 'recall', title: 'Zwei Wege zur Einheit',
      prompt: 'Vergleiche die Einigungsversuche von **1848** und **1871**: Wer trieb sie an, mit welchen Mitteln — und was bedeutete das für den Charakter des neuen Staates?',
      answer: `**1848** kam der Anstoß **von unten**: Bürger, Studenten und Parlamentarier wollten Einheit **und Freiheit** — mit Verfassung und Grundrechten, beschlossen von einem gewählten Parlament. Das scheiterte an den Fürsten. **1871** entstand die Einheit **von oben**: durch Bismarcks Diplomatie und drei Kriege, proklamiert von Fürsten und Militär in Versailles. Das Kaiserreich hatte zwar einen Reichstag, doch Kaiser, Kanzler, Militär und Preußen dominierten — Einheit ja, Demokratie nur eingeschränkt.`,
      hints: ['Wer handelte jeweils — Volk oder Fürsten?', 'Einheit „und Freiheit" oder Einheit „durch Eisen und Blut"?'],
      cards: ['1848-vs-1871'],
    },
  ],
  cards: [
    { id: 'hambach', front: 'Welches Fest von 1832 machte Schwarz-Rot-Gold zum Symbol der Einheitsbewegung?', back: 'Das **Hambacher Fest** (Pfalz).' },
    { id: 'zollverein', front: 'Wann entstand der Deutsche Zollverein?', back: '**1834** (unter preußischer Führung, ohne Österreich).' },
    { id: 'eisenbahn', front: 'Zwischen welchen Städten fuhr 1835 die erste deutsche Eisenbahn?', back: '**Nürnberg und Fürth**.' },
    { id: 'goettinger-sieben', front: 'Wer waren die Göttinger Sieben?', back: 'Sieben Professoren (u. a. die **Brüder Grimm**), die 1837 gegen einen Verfassungsbruch protestierten und entlassen wurden.' },
    { id: 'paulskirche-datum', front: 'Wann trat die Frankfurter Nationalversammlung zusammen?', back: 'Am **18. Mai 1848** in der **Paulskirche**.' },
    { id: 'klein-gross', front: 'Was unterschied die groß- von der kleindeutschen Lösung?', back: 'Großdeutsch: **mit Österreich**. Kleindeutsch: **ohne Österreich**, unter Preußens Führung.' },
    { id: 'krone-abgelehnt', front: 'Wer lehnte 1849 die Kaiserkrone der Paulskirche ab?', back: 'Der preußische König **Friedrich Wilhelm IV.**' },
    { id: 'eisen-blut', front: 'Wer sagte 1862, die großen Fragen würden „durch Eisen und Blut" entschieden?', back: '**Otto von Bismarck**.' },
    { id: 'einigungskriege', front: 'Nenne die drei Einigungskriege mit Jahreszahl.', back: '**1864** gegen Dänemark, **1866** gegen Österreich, **1870/71** gegen Frankreich.' },
    { id: 'koeniggraetz', front: 'Welche Schlacht entschied 1866 den Krieg gegen Österreich?', back: '**Königgrätz**.' },
    { id: 'emser-depesche', front: 'Welches Dokument nutzte Bismarck 1870, um den Krieg mit Frankreich zu provozieren?', back: 'Die **Emser Depesche**.' },
    { id: 'reichsgruendung-datum', front: 'Wann und wo wurde das Deutsche Kaiserreich proklamiert?', back: 'Am **18. Januar 1871** im **Spiegelsaal von Versailles**.' },
    { id: 'erster-kaiser', front: 'Wer wurde 1871 erster Deutscher Kaiser?', back: '**Wilhelm I.** (König von Preußen).' },
    { id: 'elsass', front: 'Welches Gebiet musste Frankreich 1871 abtreten?', back: '**Elsass-Lothringen**.' },
    { id: 'sozialversicherung', front: 'Nenne Bismarcks Sozialversicherungen mit Jahreszahl.', back: 'Kranken- **1883**, Unfall- **1884**, Invaliditäts- und Altersversicherung **1889**.' },
    { id: 'sozialistengesetz', front: 'Was war das Sozialistengesetz?', back: 'Gesetz (**1878–1890**) gegen die Sozialdemokratie: Verbot von Vereinen, Versammlungen und Schriften.' },
    { id: '1848-vs-1871', front: 'Kernunterschied der Einigungsversuche 1848 und 1871?', back: '1848 **von unten** (Parlament, Einheit + Freiheit) — gescheitert. 1871 **von oben** (Fürsten, Kriege) — Einheit ohne volle Demokratie.' },
  ],
};
