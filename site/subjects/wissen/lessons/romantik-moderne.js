export default {
  id: 'romantik-moderne',
  title: 'Romantik bis Moderne',
  summary: 'Ein Jahrhundert voller Umbrüche: Märchen und Mondnächte der [[romantik|Romantik]], politische Wut im [[vormaerz|Vormärz]], genaue Gesellschaftsbilder im [[realismus-literatur|Realismus]] — und schließlich die Moderne mit Thomas Mann, Kafka und Brecht, bis die Bücherverbrennung 1933 alles abbricht.',
  minutes: 24,
  goals: [
    'Die Epochen von der Romantik bis zur Moderne in die richtige Reihenfolge bringen',
    'Zentrale Autoren (Grimm, Heine, Büchner, Fontane, Thomas Mann, Kafka, Brecht) und ihre Hauptwerke kennen',
    'Erklären, was „kafkaesk“ und [[episches-theater|episches Theater]] bedeuten',
    'Die Bücherverbrennung 1933 und die [[exilliteratur|Exilliteratur]] einordnen',
  ],
  blocks: [
    {
      id: 'romantik', type: 'text', title: 'Romantik: Sehnsucht, Nacht und Märchen',
      md: `
Um 1800 wenden sich junge Dichter von der Klarheit der Klassik ab. Die [[romantik|Romantik]] (ca. 1795–1835) sucht das **Geheimnisvolle, Unendliche und Unheimliche**: Nacht, Traum, Wald, Mittelalter, Volkspoesie. Ihr Symbol ist die **„blaue Blume“** aus [Novalis](wiki:Novalis|Novalis)' Roman *[Heinrich von Ofterdingen](wiki:Heinrich von Ofterdingen|Heinrich von Ofterdingen)* — Inbegriff unstillbarer Sehnsucht.[^wp-romantik]

- **[Joseph von Eichendorff](wiki:Joseph von Eichendorff|Joseph Freiherr von Eichendorff)**: *[Aus dem Leben eines Taugenichts](wiki:Aus dem Leben eines Taugenichts|Memoirs of a Good-for-Nothing)* (1826), das Gedicht *Mondnacht* („Es war, als hätt' der Himmel / Die Erde still geküsst“)
- **[E. T. A. Hoffmann](wiki:E. T. A. Hoffmann|E. T. A. Hoffmann)**: unheimliche Erzählungen wie *[Der Sandmann](wiki:Der Sandmann (Hoffmann)|The Sandman (short story))* (1816) und *[Nussknacker und Mausekönig](wiki:Nussknacker und Mausekönig|The Nutcracker and the Mouse King)* — Vorlage für [Tschaikowskys](wiki:Pjotr Iljitsch Tschaikowski|Pyotr Ilyich Tchaikovsky) Ballett
- **[Jacob und Wilhelm Grimm](wiki:Brüder Grimm|Brothers Grimm)**: die [[kinder-und-hausmaerchen|Kinder- und Hausmärchen]] (1812/1815) mit *[Rotkäppchen](wiki:Rotkäppchen|Little Red Riding Hood)*, *[Hänsel und Gretel](wiki:Hänsel und Gretel|Hansel and Gretel)*, *[Schneewittchen](wiki:Schneewittchen|Snow White)* — heute in weit über hundert Sprachen übersetzt[^wp-grimms-maerchen]`,
    },
    {
      id: 'heine-buechner', type: 'text', title: 'Heine und Büchner: Dichtung wird politisch',
      md: `
**[Heinrich Heine](wiki:Heinrich Heine|Heinrich Heine)** (1797–1856) ist Romantiker und Spötter zugleich. Sein *[Buch der Lieder](wiki:Buch der Lieder (Heine)|Book of Songs (Heinrich Heine))* (1827) enthält die *Loreley* („Ich weiß nicht, was soll es bedeuten, / Dass ich so traurig bin“). Als Jude und Liberaler geht er 1831 nach [Paris](wiki:Paris|Paris) ins Exil. In *[Deutschland. Ein Wintermärchen](wiki:Deutschland. Ein Wintermärchen|Germany. A Winter's Tale)* (1844) verspottet er Zensur und Kleinstaaterei, und in den *Nachtgedanken* heißt es: „Denk ich an Deutschland in der Nacht, / Dann bin ich um den Schlaf gebracht.“[^wp-heine]

**[Georg Büchner](wiki:Georg Büchner|Georg Büchner)** (1813–1837) wird nur 23 Jahre alt und hinterlässt trotzdem Weltliteratur. Mit der Flugschrift *[Der Hessische Landbote](wiki:Der Hessische Landbote|The Hessian Courier)* (1834) ruft er die Bauern zum Aufstand auf: „Friede den Hütten! Krieg den Palästen!“ Sein Dramenfragment *[Woyzeck](wiki:Woyzeck|Woyzeck)* zeigt einen armen Soldaten, der von Arzt und Hauptmann gedemütigt wird und seine Geliebte ersticht — ein Stück, das seiner Zeit um Jahrzehnte voraus war.[^wp-buechner] Beide gehören zum [[vormaerz|Vormärz]], der Literatur vor der Revolution von 1848.`,
    },
    {
      id: 'realismus', type: 'text', title: 'Realismus und Naturalismus: die Gesellschaft im Blick',
      md: `
Nach der gescheiterten Revolution von 1848 wird die Literatur nüchterner. Der [[realismus-literatur|Realismus]] (ca. 1848–1890) beobachtet die bürgerliche Welt genau:

- **[Theodor Fontane](wiki:Theodor Fontane|Theodor Fontane)** (1819–1898): *[Effi Briest](wiki:Effi Briest|Effi Briest)* (1894/95) — eine junge Frau wird mit einem viel älteren Baron verheiratet, eine alte Affäre fliegt auf, die Gesellschaft verstößt sie. Effis Vater sagt dazu den berühmten Satz: „Das ist ein zu weites Feld.“[^wp-fontane]
- **[Theodor Storm](wiki:Theodor Storm|Theodor Storm)**: *[Der Schimmelreiter](wiki:Der Schimmelreiter|The Rider on the White Horse)* (1888) — eine [[novelle]] über einen Deichgrafen an der Nordseeküste

Der [[naturalismus|Naturalismus]] (ca. 1880–1900) geht weiter: **[Gerhart Hauptmann](wiki:Gerhart Hauptmann|Gerhart Hauptmann)** zeigt in *[Die Weber](wiki:Die Weber|The Weavers (play))* (1892) das Elend der schlesischen Weber — teilweise im Dialekt.`,
    },
    {
      id: 'moderne', type: 'text', title: 'Die Moderne: Thomas Mann, Kafka, Brecht',
      md: `
Um 1900 zerbrechen Gewissheiten: Großstadt, Technik, Psychoanalyse, Erster Weltkrieg. Die Literatur reagiert mit neuen Formen.

**[Thomas Mann](wiki:Thomas Mann|Thomas Mann)** (1875–1955) veröffentlicht mit 26 Jahren *[Buddenbrooks](wiki:Buddenbrooks|Buddenbrooks). Verfall einer Familie* (1901) über eine Lübecker Kaufmannsfamilie; 1929 erhält er dafür den [[nobelpreis-literatur|Literaturnobelpreis]]. Weitere Werke: *[Der Tod in Venedig](wiki:Der Tod in Venedig|Death in Venice)* (1912), *[Der Zauberberg](wiki:Der Zauberberg|The Magic Mountain)* (1924).[^wp-thomas-mann]

**[Franz Kafka](wiki:Franz Kafka|Franz Kafka)** (1883–1924), ein deutschsprachiger Jude aus [Prag](wiki:Prag|Prague), schreibt über Menschen, die in undurchschaubaren Mächten gefangen sind. *[Die Verwandlung](wiki:Die Verwandlung|The Metamorphosis)* (1915) beginnt mit einem der berühmtesten ersten Sätze der Literatur:

> Als Gregor Samsa eines Morgens aus unruhigen Träumen erwachte, fand er sich in seinem Bett zu einem ungeheueren Ungeziefer verwandelt.

Kafka wollte, dass sein Freund **[Max Brod](wiki:Max Brod|Max Brod)** nach seinem Tod alle Manuskripte verbrennt. Brod tat das Gegenteil und veröffentlichte *[Der Process](wiki:Der Process|The Trial)* (1925) und *[Das Schloss](wiki:Das Schloss|The Castle (novel))* (1926). Das Wort **„kafkaesk“** steht heute für bedrohlich-absurde, bürokratische Situationen.[^wp-kafka]

**[Bertolt Brecht](wiki:Bertolt Brecht|Bertolt Brecht)** (1898–1956) erfindet das [[episches-theater|epische Theater]]: Das Publikum soll nicht mitweinen, sondern nachdenken. *[Die Dreigroschenoper](wiki:Die Dreigroschenoper|The Threepenny Opera)* (1928, Musik: [Kurt Weill](wiki:Kurt Weill|Kurt Weill)) mit der „Moritat von Mackie Messer“ wird ein Welterfolg; später folgen *[Mutter Courage und ihre Kinder](wiki:Mutter Courage und ihre Kinder|Mother Courage and Her Children)* und *[Leben des Galilei](wiki:Leben des Galilei|Life of Galileo)*.[^wp-brecht]

Außerdem: **[Hermann Hesse](wiki:Hermann Hesse|Hermann Hesse)** (*[Siddhartha](wiki:Siddhartha (Hermann Hesse)|Siddhartha (novel))* 1922, *[Der Steppenwolf](wiki:Der Steppenwolf|Steppenwolf (novel))* 1927; Nobelpreis 1946), **[Rainer Maria Rilke](wiki:Rainer Maria Rilke|Rainer Maria Rilke)** (*Der Panther*), **[Erich Maria Remarque](wiki:Erich Maria Remarque|Erich Maria Remarque)** (*[Im Westen nichts Neues](wiki:Im Westen nichts Neues|All Quiet on the Western Front)*, 1929) und **[Erich Kästner](wiki:Erich Kästner|Erich Kästner)** (*[Emil und die Detektive](wiki:Emil und die Detektive|Emil and the Detectives)*, 1929).`,
    },
    {
      id: 'buecherverbrennung', type: 'callout', tone: 'warning', title: '10. Mai 1933: die Bücherverbrennung',
      md: `
Wenige Monate nach der Machtübernahme verbrennen Studenten auf dem Berliner Opernplatz (heute [Bebelplatz](wiki:Bebelplatz|Bebelplatz)) und in vielen Universitätsstädten Bücher „undeutscher“ Autoren: Heine, Marx, [Freud](wiki:Sigmund Freud|Sigmund Freud), Kästner, Remarque, [Tucholsky](wiki:Kurt Tucholsky|Kurt Tucholsky), die Brüder Mann und viele andere.[^wp-buecherverbrennung] Hunderte Schriftsteller fliehen ins Ausland — die [[exilliteratur|Exilliteratur]] entsteht.

Heine hatte schon 1821 in seiner Tragödie *Almansor* geschrieben: „Das war ein Vorspiel nur, dort wo man Bücher verbrennt, verbrennt man auch am Ende Menschen.“ Der Satz steht heute am Mahnmal auf dem Bebelplatz.`,
    },
    {
      id: 'map-dichterorte',
      type: 'map',
      title: 'Geburtsorte, Wirkungsstätten und Exil',
      view: [0.8, 46.7, 17.8, 55.2],
      rivers: [
        { name: 'Rhein', label: false },
        { name: 'Elbe', label: false },
      ],
      places: [
        { name: 'Düsseldorf', pos: 'l', detail: '[Heinrich Heine](wiki:Heinrich Heine|Heinrich Heine) wurde hier 1797 geboren.' },
        {
          name: 'Paris',
          pos: 'r',
          detail: 'Heine ging 1831 ins Exil nach [Paris](wiki:Paris|Paris) und lebte dort bis zu seinem Tod 1856.',
        },
        {
          name: 'Kassel',
          pos: 'r',
          detail: '[Jacob und Wilhelm Grimm](wiki:Brüder Grimm|Brothers Grimm) lebten hier von 1805 bis 1830 und sammelten die Märchen für die *Kinder- und Hausmärchen*.',
        },
        {
          name: 'Lübeck',
          pos: 'r',
          detail: '[Thomas Mann](wiki:Thomas Mann|Thomas Mann) wurde 1875 in [Lübeck](wiki:Lübeck|Lübeck) geboren; *[Buddenbrooks](wiki:Buddenbrooks|Buddenbrooks)* erzählt vom Niedergang einer Lübecker Kaufmannsfamilie.',
        },
        {
          name: 'Prag',
          pos: 'r',
          detail: '[Franz Kafka](wiki:Franz Kafka|Franz Kafka) lebte fast sein ganzes Leben in [Prag](wiki:Prag|Prague) und schrieb auf Deutsch.',
        },
        { name: 'Augsburg', pos: 'r', detail: '[Bertolt Brecht](wiki:Bertolt Brecht|Bertolt Brecht) wurde hier 1898 geboren.' },
        {
          name: 'Berlin',
          pos: 'r',
          detail: 'Am 10. Mai 1933 verbrannten Studenten auf dem Opernplatz (heute [Bebelplatz](wiki:Bebelplatz|Bebelplatz)) Tausende Bücher „undeutscher“ Autoren.',
          kind: 'site',
        },
        {
          name: 'Zürich',
          pos: 'l',
          detail: '[Georg Büchner](wiki:Georg Büchner|Georg Büchner) starb hier 1837 im Exil; Thomas Mann lebte ab 1933 im Exil in Küsnacht bei [Zürich](wiki:Zürich|Zurich).',
        },
      ],
      points: [
        {
          lon: 8.9167,
          lat: 50.1333,
          label: 'Hanau',
          pos: 'l',
          detail: 'Hier wurden Jacob (1785) und Wilhelm Grimm (1786) geboren.',
        },
        {
          lon: 12.8053,
          lat: 52.9249,
          label: 'Neuruppin',
          pos: 'l',
          detail: '[Theodor Fontane](wiki:Theodor Fontane|Theodor Fontane) wurde hier 1819 geboren; in den *Wanderungen durch die Mark Brandenburg* beschrieb er seine Heimat.',
        },
        {
          lon: 9.0511,
          lat: 54.477,
          label: 'Husum',
          pos: 'r',
          detail: '[Theodor Storm](wiki:Theodor Storm|Theodor Storm) wurde hier 1817 geboren; sein *Schimmelreiter* spielt an der nordfriesischen Küste.',
        },
      ],
      layers: { cities: false, countryLabels: false },
      caption: 'Viele Autoren dieser Epochen gingen ins Exil: Heine nach Paris, Büchner und Thomas Mann in die Schweiz.',
    },
    {
      id: 'timeline-epochen', type: 'game', viz: 'timeline', title: 'Epochen in Reihenfolge',
      params: {
        mode: 'sort',
        events: [
          { year: 1812, label: 'Grimms Märchen (Bd. 1)' },
          { year: 1827, label: 'Heine: Buch der Lieder' },
          { year: 1834, label: 'Hessischer Landbote' },
          { year: 1892, label: 'Hauptmann: Die Weber' },
          { year: 1895, label: 'Fontane: Effi Briest' },
          { year: 1901, label: 'Buddenbrooks' },
          { year: 1915, label: 'Kafka: Verwandlung' },
          { year: 1928, label: 'Dreigroschenoper' },
          { year: 1933, label: 'Bücherverbrennung' },
        ],
      },
    },
    {
      id: 'match-autoren', type: 'match', title: 'Autor ↔ Werk',
      pairs: [
        ['Joseph von Eichendorff', 'Aus dem Leben eines Taugenichts'],
        ['Georg Büchner', 'Woyzeck'],
        ['Theodor Fontane', 'Effi Briest'],
        ['Thomas Mann', 'Buddenbrooks'],
        ['Franz Kafka', 'Der Process'],
        ['Bertolt Brecht', 'Mutter Courage und ihre Kinder'],
        ['Hermann Hesse', 'Der Steppenwolf'],
      ],
    },
    {
      id: 'fact-grimm', type: 'callout', tone: 'fact', title: 'Die Grimms und das Wörterbuch',
      md: `Die [Brüder Grimm](wiki:Brüder Grimm|Brothers Grimm) begannen 1838 das **[Deutsche Wörterbuch](wiki:Deutsches Wörterbuch|Deutsches Wörterbuch)**, das die Herkunft jedes deutschen Wortes dokumentieren sollte. Sie selbst kamen nur bis zum Buchstaben F (Jacob starb über dem Wort „Frucht“). Fertig wurde das Werk erst **1961** — nach 123 Jahren und in 32 Bänden.`,
    },
    {
      id: 'order-epochen', type: 'order', title: 'Die Epochen ordnen',
      prompt: 'Bringe die literarischen Epochen in die zeitliche Reihenfolge.',
      items: ['Romantik', 'Vormärz', 'Realismus', 'Naturalismus', 'Expressionismus', 'Exilliteratur'],
      explain: 'Romantik (ca. 1795–1835) → Vormärz (bis 1848) → Realismus (ca. 1848–1890) → Naturalismus (ca. 1880–1900) → Expressionismus (ca. 1905–1925) → Exilliteratur (1933–1945).',
    },
    {
      id: 'quiz-kafka', type: 'quiz', title: 'Kafka',
      question: 'Was bedeutet das Adjektiv **kafkaesk**?',
      options: [
        { text: 'Eine undurchschaubare, bedrohlich-absurde Situation, oft mit anonymer Bürokratie', correct: true, why: 'So wie Josef K. im *Process*, der verhaftet wird, ohne je zu erfahren, warum.' },
        { text: 'Besonders romantisch und verträumt', correct: false, why: 'Das passt eher zur Romantik — Kafka ist das Gegenteil von verträumt.' },
        { text: 'Humorvoll und derb', correct: false, why: 'Kafka hat zwar einen trockenen Humor, aber „kafkaesk“ meint das Beklemmende.' },
      ],
    },
    {
      id: 'mann-nobel', type: 'numeric', title: 'Wie lange hat es gedauert?',
      question: '*Buddenbrooks* erschien 1901; Thomas Mann bekam den Nobelpreis ausdrücklich vor allem für diesen Roman. In welchem Jahr war das? (Tipp: Es war 28 Jahre später.)',
      answer: 1929, tolerance: 0,
      explain: '1929. Vier Jahre später musste Thomas Mann Deutschland verlassen; er lebte im Exil in der Schweiz und in den USA und kehrte nie dauerhaft zurück.',
    },
    {
      id: 'recall-brecht', type: 'recall', title: 'Brechts Theater',
      prompt: 'Was wollte Bertolt Brecht mit dem **epischen Theater** erreichen, und mit welchen Mitteln?',
      answer: `Brecht wollte, dass das Publikum sich **nicht** in die Figuren einfühlt und mitleidet, sondern **kritisch nachdenkt** und erkennt, dass gesellschaftliche Verhältnisse veränderbar sind. Dazu nutzte er den **Verfremdungseffekt**: Songs, die die Handlung unterbrechen, einen Erzähler, Schrifttafeln, Schauspieler, die aus der Rolle fallen oder das Publikum direkt ansprechen. Beispiele: *Die Dreigroschenoper*, *Mutter Courage und ihre Kinder*.`,
      hints: ['Das Gegenteil von „mitfühlen“ ist …', 'Wie heißt der Effekt, der Vertrautes fremd macht?'],
      cards: ['episches-theater'],
    },
  ],
  cards: [
    { id: 'romantik-zeit', front: 'Romantik: Zeitraum und Merkmale?', back: 'Ca. 1795–1835: Gefühl, Sehnsucht, Natur, Nacht, Traum, Mittelalter, Volkspoesie, das Unheimliche.' },
    { id: 'blaue-blume', front: 'Wofür steht die „blaue Blume“?', back: 'Symbol der romantischen Sehnsucht — aus Novalis\' *Heinrich von Ofterdingen*.' },
    { id: 'grimm-jahr', front: 'Wann erschienen die Kinder- und Hausmärchen der Brüder Grimm?', back: '1812 (Band 1) und 1815 (Band 2).' },
    { id: 'eichendorff', front: 'Eichendorffs bekannteste Erzählung?', back: '*Aus dem Leben eines Taugenichts* (1826).' },
    { id: 'hoffmann', front: 'Welche Hoffmann-Erzählung wurde zum Ballett von Tschaikowsky?', back: '*Nussknacker und Mausekönig* (1816).' },
    { id: 'heine-loreley', front: 'Aus welchem Gedicht: „Ich weiß nicht, was soll es bedeuten, / Dass ich so traurig bin“?', back: 'Heinrich Heine, *Die Loreley* (im *Buch der Lieder*, 1827).' },
    { id: 'heine-nacht', front: '„Denk ich an Deutschland in der Nacht, …“ — wie geht es weiter, und von wem?', back: '„… dann bin ich um den Schlaf gebracht.“ Heinrich Heine, *Nachtgedanken* (1844).' },
    { id: 'landbote', front: '„Friede den Hütten! Krieg den Palästen!“ — Quelle?', back: 'Georg Büchner, *Der Hessische Landbote* (1834).' },
    { id: 'woyzeck', front: 'Worum geht es in Büchners *Woyzeck*?', back: 'Ein armer, gedemütigter Soldat ersticht seine Geliebte Marie — soziales Drama als Fragment.' },
    { id: 'effi', front: 'Fontanes bekanntester Roman und sein berühmter Schlusssatz?', back: '*Effi Briest* (1894/95); „Das ist ein zu weites Feld.“' },
    { id: 'weber', front: 'Hauptwerk des Naturalismus von Gerhart Hauptmann?', back: '*Die Weber* (1892) über den schlesischen Weberaufstand.' },
    { id: 'buddenbrooks', front: 'Thomas Manns erster Roman (1901)?', back: '*Buddenbrooks. Verfall einer Familie* — Lübecker Kaufmannsfamilie; Nobelpreis 1929.' },
    { id: 'mann-weitere', front: 'Zwei weitere Werke von Thomas Mann?', back: '*Der Tod in Venedig* (1912), *Der Zauberberg* (1924).' },
    { id: 'verwandlung', front: 'Wer erwacht als „ungeheueres Ungeziefer“?', back: 'Gregor Samsa in Kafkas *Die Verwandlung* (1915).' },
    { id: 'max-brod', front: 'Warum kennen wir Kafkas Romane überhaupt?', back: 'Max Brod sollte die Manuskripte verbrennen, veröffentlichte sie aber: *Der Process* (1925), *Das Schloss* (1926).' },
    { id: 'episches-theater', front: 'Episches Theater: Ziel und Mittel?', back: 'Publikum soll kritisch denken statt mitfühlen; Mittel: Verfremdungseffekt (Songs, Erzähler, Tafeln, aus der Rolle fallen).' },
    { id: 'dreigroschenoper', front: 'Brecht-Stück von 1928 mit Musik von Kurt Weill?', back: '*Die Dreigroschenoper* (mit „Mackie Messer“).' },
    { id: 'buecherverbrennung', front: 'Wann und wo fand die zentrale Bücherverbrennung statt?', back: '10. Mai 1933, Berliner Opernplatz (heute Bebelplatz).' },
  ],
};
