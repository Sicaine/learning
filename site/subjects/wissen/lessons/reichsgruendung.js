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
Nach 1815 wollten viele Bürger, Studenten und Professoren zweierlei: einen **Nationalstaat** statt rund 40 Einzelstaaten und **Freiheit** — Verfassung, Pressefreiheit, Mitsprache. Die Fürsten des [[deutscher-bund|Deutschen Bundes]] reagierten mit Zensur und Verfolgung (**Karlsbader Beschlüsse 1819**).

Stationen des **[[vormaerz|Vormärz]]**:

- **Wartburgfest 1817**: Burschenschaften fordern nationale Einheit.
- **Hambacher Fest 1832**: 20.000 bis 30.000 Menschen auf dem Hambacher Schloss (Pfalz) — **Schwarz-Rot-Gold** wird zum Symbol von Einheit und Freiheit.
- **Göttinger Sieben 1837**: sieben Professoren (darunter die Brüder **Grimm**) protestieren gegen einen Verfassungsbruch und werden entlassen.

Wirtschaftlich wuchs Deutschland schneller zusammen als politisch: Der **Deutsche Zollverein** (1834) schuf einen Binnenmarkt ohne Österreich, und 1835 fuhr die erste deutsche Eisenbahn von **Nürnberg nach Fürth**.[^lemo-vormaerz]`,
    },
    {
      id: 'revolution', type: 'text', title: '1848: Revolution und Paulskirche',
      md: `
Im Februar 1848 stürzte in Paris der König; im **März** sprang die Revolution auf die deutschen Staaten über. In Berlin kam es zu Barrikadenkämpfen (18. März). Die Fürsten gaben zunächst nach und beriefen liberale „Märzminister".

Am **18. Mai 1848** trat in der Frankfurter **Paulskirche** die **[[paulskirche|Nationalversammlung]]** zusammen — das erste frei gewählte gesamtdeutsche Parlament. Sie verabschiedete einen modernen **Grundrechtekatalog** und am **28. März 1849** eine Reichsverfassung. Zentrale Streitfrage:

- **großdeutsch**: mit den deutschsprachigen Gebieten Österreichs, oder
- **kleindeutsch**: ohne Österreich, unter Führung Preußens.

Man entschied sich kleindeutsch und bot dem preußischen König **Friedrich Wilhelm IV.** die Kaiserkrone an. Er lehnte ab — eine Krone „aus Dreck und Letten" von Volksvertretern wollte er nicht. Preußische und österreichische Truppen schlugen 1849 die letzten Aufstände nieder (Festung **Rastatt**, Juli 1849).[^wp-maerzrevolution]`,
    },
    {
      id: 'erbe', type: 'callout', tone: 'insight', title: 'Gescheitert — und doch erfolgreich',
      md: `Die Revolution scheiterte, aber ihre Ideen blieben: Die **Grundrechte der Paulskirche** wurden Vorbild für die Weimarer Verfassung 1919 und das **Grundgesetz** 1949. Und **Schwarz-Rot-Gold** ist heute die Bundesflagge — als Farben der Demokratie, nicht des Kaiserreichs (das Schwarz-Weiß-Rot führte).`,
    },
    {
      id: 'bismarck', type: 'text', title: 'Bismarck: Einheit durch „Eisen und Blut"',
      md: `
1862 wurde **[[bismarck|Otto von Bismarck]]** preußischer Ministerpräsident, mitten in einem Verfassungskonflikt um die Heeresreform.[^lemo-reaktionszeit] Vor dem Landtag sagte er: *„Nicht durch Reden und Majoritätsbeschlüsse werden die großen Fragen der Zeit entschieden — das ist der große Fehler von 1848 und 1849 gewesen —, sondern durch Eisen und Blut."*

Die Einheit kam durch drei **[[einigungskriege]]**:

1. **1864** gegen **Dänemark** (gemeinsam mit Österreich) — um Schleswig und Holstein.
2. **1866** gegen **Österreich** — Entscheidungsschlacht bei **Königgrätz**. Der Deutsche Bund zerbricht, Preußen gründet den **Norddeutschen Bund** (1867).
3. **1870/71** gegen **Frankreich** — ausgelöst durch die von Bismarck zugespitzte **Emser Depesche**. Nach dem Sieg bei **Sedan** (September 1870) schließen sich die süddeutschen Staaten an.`,
    },
    {
      id: 'gruendung', type: 'text', title: '18. Januar 1871: Kaiserproklamation in Versailles',
      md: `
Im **Spiegelsaal von Versailles** — im besiegten Frankreich — wurde der preußische König **Wilhelm I.** am **18. Januar 1871** zum **Deutschen Kaiser** ausgerufen. Frankreich musste **Elsass-Lothringen** abtreten und hohe Reparationen zahlen — eine Demütigung mit langen Folgen.

Das **Deutsche Kaiserreich** war ein Bundesstaat aus 25 Staaten und dem Reichsland Elsass-Lothringen:

- **Kaiser** = König von Preußen; er ernannte den **Reichskanzler** (Bismarck bis 1890).
- Der **Reichstag** wurde nach allgemeinem, gleichem und geheimem Wahlrecht für **Männer** ab 25 gewählt — für damalige Verhältnisse fortschrittlich. Die Regierung war ihm aber nicht verantwortlich.
- **Preußen** stellte rund zwei Drittel von Fläche und Bevölkerung.

Die Einheit war eine „Revolution von oben" — geschaffen von Fürsten, Militär und Diplomatie, nicht vom Volk wie 1848 erhofft.[^wp-reichsgruendung]`,
    },
    {
      id: 'innenpolitik', type: 'text', title: 'Zuckerbrot und Peitsche',
      md: `
Bismarck bekämpfte, wen er für „Reichsfeinde" hielt: im **Kulturkampf** (ab 1871) die katholische Kirche, mit dem **Sozialistengesetz** (1878–1890) die Sozialdemokratie. Gleichzeitig wollte er den Arbeitern die SPD abspenstig machen — und schuf die erste staatliche **Sozialversicherung** der Welt:

- **1883** Krankenversicherung
- **1884** Unfallversicherung
- **1889** Invaliditäts- und Altersversicherung

Diese Säulen tragen den deutschen Sozialstaat bis heute. Außenpolitisch sicherte Bismarck das Reich mit einem komplizierten Bündnissystem. **1890** entließ ihn der junge Kaiser **Wilhelm II.** („Der Lotse geht von Bord").[^lemo-kaiserreich]`,
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
