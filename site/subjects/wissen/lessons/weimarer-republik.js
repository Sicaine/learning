export default {
  id: 'weimarer-republik',
  title: 'Die Weimarer Republik',
  summary: 'Die erste deutsche Demokratie: von der Novemberrevolution über Krisenjahr, Hyperinflation und Goldene Zwanziger bis zur Weltwirtschaftskrise und ihrem Scheitern 1933.',
  minutes: 22,
  goals: [
    'Die Entstehung der Republik in der [[novemberrevolution|Novemberrevolution]] beschreiben',
    'Stärken und Schwächen der [[weimarer-verfassung|Weimarer Verfassung]] benennen',
    'Das Krisenjahr 1923 mit [[hyperinflation]] und Hitlerputsch erklären',
    'Die Gründe für das Scheitern der Republik 1930–1933 abwägen',
  ],
  blocks: [
    {
      id: 'revolution', type: 'text', title: 'November 1918: Die Republik entsteht',
      md: `
Anfang November 1918 meuterten die Matrosen in **Kiel**, als die Admiralität die Flotte zu einem letzten, sinnlosen Gefecht auslaufen lassen wollte. Binnen Tagen bildeten sich im ganzen Reich Arbeiter- und Soldatenräte — die **[[novemberrevolution|Novemberrevolution]]**.

Am **9. November 1918** überschlugen sich die Ereignisse: Reichskanzler Max von Baden verkündete eigenmächtig die Abdankung des Kaisers; **Philipp Scheidemann** (SPD) rief vom Reichstagsgebäude die „deutsche Republik" aus, zwei Stunden später **Karl Liebknecht** vom Berliner Schloss die „freie sozialistische Republik". Wilhelm II. ging ins Exil in die Niederlande. **Friedrich Ebert** (SPD) führte die Übergangsregierung — und setzte, gestützt auf das alte Militär, auf Wahlen statt Räterepublik. Den kommunistischen Spartakusaufstand im Januar 1919 schlugen Freikorps blutig nieder; Rosa Luxemburg und Karl Liebknecht wurden ermordet.`,
    },
    {
      id: 'verfassung', type: 'text', title: 'Eine Verfassung aus Weimar',
      md: `
Am **19. Januar 1919** wählten erstmals auch **Frauen** — 37 Frauen zogen in die Nationalversammlung ein. Sie tagte im ruhigeren **Weimar** und beschloss am **11. August 1919** die **[[weimarer-verfassung|Weimarer Verfassung]]**. Ebert wurde erster Reichspräsident.

<table><tr><th>Stärken</th><th>Schwächen</th></tr>
<tr><td>Allgemeines Wahlrecht für Männer und Frauen ab 20</td><td>Sehr mächtiger, direkt gewählter <strong>Reichspräsident</strong> („Ersatzkaiser")</td></tr>
<tr><td>Umfangreiche Grundrechte</td><td><strong>Artikel 48</strong>: Regieren per Notverordnung</td></tr>
<tr><td>Parlamentarische Regierung</td><td>Reines Verhältniswahlrecht <strong>ohne Sperrklausel</strong> → viele Kleinparteien</td></tr>
<tr><td>Volksbegehren und Volksentscheid</td><td>Grundrechte nicht unabänderlich, kein Verfassungsgericht wie heute</td></tr></table>

Die größte Schwäche war aber keine Paragrafenfrage: Viele Eliten in Militär, Justiz, Verwaltung und Universitäten lehnten die Republik ab — man sprach von einer „**Republik ohne Republikaner**".`,
    },
    {
      id: 'krisen', type: 'text', title: 'Krisenjahre 1919–1923',
      md: `
Die junge Republik wurde von links und rechts angegriffen: **Kapp-Putsch** (1920) rechtsradikaler Militärs, kommunistische Aufstände, politische Morde (Finanzminister Erzberger 1921, Außenminister **Walther Rathenau** 1922).

**1923** wurde zum Krisenjahr:
- Frankreich und Belgien besetzten im Januar das **Ruhrgebiet**, weil Deutschland mit Reparationen im Rückstand war. Die Regierung rief zum passiven Widerstand auf und bezahlte die Streikenden mit frisch gedrucktem Geld.
- Die **[[hyperinflation]]** explodierte: Im November 1923 kostete ein US-Dollar **4,2 Billionen Mark**, ein Brot Milliarden. Ersparnisse des Mittelstands wurden vernichtet.
- Am **8./9. November 1923** versuchte **Adolf Hitler** in München einen Putsch („Hitlerputsch"). Er scheiterte; Hitler schrieb in der Festungshaft „Mein Kampf".

Die **Rentenmark** (November 1923) stabilisierte die Währung.[^wp-inflation]`,
    },
    {
      id: 'video-1923', type: 'video', youtube: 'sVkEY87L-xI', label: 'Die Weimarer Republik – Das Krisenjahr 1923', channel: 'musstewissen Geschichte | Terra X',
    },
    {
      id: 'num-inflation', type: 'numeric', title: 'Was kostete ein Brot?',
      question: 'Ein Brot kostete 1914 etwa **0,30 Mark**. Im November 1923 lagen Brotpreise in der Größenordnung von **Hunderten Milliarden Mark**. Angenommen, ein Brot kostete **200 Milliarden Mark**: Auf das Wievielfache wäre der Preis gestiegen? Gib das Ergebnis in **Milliarden** an.',
      answer: 667, tolerance: 10, unit: 'Milliarden Mal',
      hint: '200.000.000.000 ÷ 0,3 — und dann durch 1.000.000.000 teilen.',
      explain: '200 Mrd ÷ 0,3 ≈ 667 Mrd — das rund **667-Milliardenfache**. Die Erfahrung, dass Geld über Nacht wertlos werden kann, prägt die deutsche Geldpolitik bis heute.',
    },
    {
      id: 'zwanziger', type: 'text', title: 'Die „Goldenen Zwanziger" (1924–1929)',
      md: `
Mit dem **Dawes-Plan** (1924) wurden die Reparationen tragbar geregelt, amerikanische Kredite flossen. Außenminister **Gustav Stresemann** führte Deutschland zurück in die internationale Gemeinschaft: **Locarno-Verträge** (1925), Aufnahme in den **Völkerbund** (1926), Friedensnobelpreis 1926 gemeinsam mit dem Franzosen Aristide Briand.

Kulturell erlebte vor allem Berlin eine Blütezeit: das **Bauhaus** (gegründet 1919 in Weimar), der Film „**Metropolis**" (Fritz Lang, 1927), die „**Dreigroschenoper**" (Brecht/Weill, 1928), Kabarett, Jazz, die „Neue Frau". Doch der Aufschwung stand auf Pump — auf kurzfristigen Krediten aus den USA.[^lemo-weimar]`,
    },
    {
      id: 'untergang', type: 'text', title: 'Weltwirtschaftskrise und Untergang 1929–1933',
      md: `
Nach dem New Yorker Börsenkrach im **Oktober 1929** zogen US-Banken ihr Geld ab. Die **[[weltwirtschaftskrise|Weltwirtschaftskrise]]** traf Deutschland besonders hart: Anfang 1932 waren über **6 Millionen** Menschen arbeitslos.

Im März 1930 zerbrach die letzte Regierung mit parlamentarischer Mehrheit (Große Koalition unter Hermann Müller) am Streit um die Arbeitslosenversicherung. Reichspräsident **Paul von Hindenburg** ernannte nun **Präsidialkabinette**, die mit Notverordnungen nach Artikel 48 regierten (Brüning, Papen, Schleicher). Brünings Sparpolitik verschärfte die Not.

Die **NSDAP** wuchs von 2,6 % (1928) auf **37,3 %** im Juli 1932 und wurde stärkste Partei; auch die KPD legte zu. Demokratische Parteien hatten keine Mehrheit mehr. Konservative Kreise um Papen überredeten Hindenburg, Hitler zum Reichskanzler zu machen — in der Erwartung, ihn „einrahmen" zu können. Am **30. Januar 1933** wurde Hitler ernannt.[^bpb-weimar]`,
    },
    {
      id: 'timeline-weimar', type: 'game', viz: 'timeline', title: 'Weimar in der richtigen Reihenfolge',
      params: {
        mode: 'sort',
        events: [
          { year: 1918, label: 'Ausrufung der Republik' },
          { year: 1919, label: 'Weimarer Verfassung' },
          { year: 1920, label: 'Kapp-Putsch' },
          { year: 1923, label: 'Hyperinflation & Hitlerputsch' },
          { year: 1926, label: 'Beitritt zum Völkerbund' },
          { year: 1929, label: 'Börsenkrach in New York' },
          { year: 1932, label: 'NSDAP stärkste Partei' },
          { year: 1933, label: 'Hitler Reichskanzler' },
        ],
      },
    },
    {
      id: 'match-weimar', type: 'match', title: 'Köpfe der Weimarer Republik',
      pairs: [
        ['Friedrich Ebert', 'erster Reichspräsident (SPD)'],
        ['Philipp Scheidemann', 'rief am 9. November 1918 die Republik aus'],
        ['Gustav Stresemann', 'Außenminister, Friedensnobelpreis 1926'],
        ['Walther Rathenau', 'Außenminister, 1922 ermordet'],
        ['Paul von Hindenburg', 'Reichspräsident ab 1925'],
        ['Rosa Luxemburg', 'Kommunistin, 1919 ermordet'],
      ],
    },
    {
      id: 'quiz-scheitern', type: 'quiz', title: 'Warum scheiterte Weimar?',
      question: 'Welche Faktoren trugen zum Scheitern der Weimarer Republik bei?',
      options: [
        { text: 'Das Notverordnungsrecht des Reichspräsidenten (Art. 48)', correct: true, why: 'Ab 1930 wurde am Parlament vorbei regiert.' },
        { text: 'Die Belastung durch Versailler Vertrag und Dolchstoßlegende', correct: true, why: 'Beides diskreditierte die Republik von Anfang an.' },
        { text: 'Die Weltwirtschaftskrise mit Massenarbeitslosigkeit', correct: true, why: 'Sie trieb die Wähler zu den Radikalen.' },
        { text: 'Eine Fünf-Prozent-Hürde, die kleine Parteien ausschloss', correct: false, why: 'Im Gegenteil: Es gab keine Sperrklausel — die Fünf-Prozent-Hürde ist eine Lehre aus Weimar.' },
        { text: 'Antidemokratische Eliten in Militär, Justiz und Verwaltung', correct: true, why: '„Republik ohne Republikaner".' },
      ],
    },
    {
      id: 'recall-lehren', type: 'recall', title: 'Lehren aus Weimar',
      prompt: 'Das Grundgesetz von 1949 zog bewusst Lehren aus dem Scheitern von Weimar. Nenne mindestens drei Unterschiede und erkläre, welches Weimarer Problem sie jeweils lösen sollen.',
      answer: `- **Schwacher Bundespräsident** (von der Bundesversammlung gewählt, kein Notverordnungsrecht) statt eines übermächtigen Reichspräsidenten mit Art. 48.
- **Konstruktives Misstrauensvotum**: Der Kanzler kann nur gestürzt werden, wenn gleichzeitig ein Nachfolger gewählt wird — gegen rein destruktive Mehrheiten.
- **Fünf-Prozent-Hürde** gegen Parteienzersplitterung.
- **Ewigkeitsklausel** und unantastbare Grundrechte (Art. 1, Art. 79 Abs. 3), dazu das **Bundesverfassungsgericht** und die Möglichkeit von Parteiverboten — die „**wehrhafte Demokratie**", damit die Demokratie nicht legal abgeschafft werden kann.`,
      hints: ['Denk an Artikel 48 und die Stellung des Präsidenten.', 'Wie kann man heute einen Kanzler stürzen?'],
      cards: ['weimar-lehren'],
    },
  ],
  cards: [
    { id: 'kiel', front: 'Womit begann die Novemberrevolution 1918?', back: 'Mit dem **Matrosenaufstand in Kiel**.' },
    { id: '9-november-1918', front: 'Wer rief am 9. November 1918 die Republik aus?', back: '**Philipp Scheidemann** (SPD) vom Reichstag; Karl Liebknecht rief die „freie sozialistische Republik" aus.' },
    { id: 'frauenwahlrecht', front: 'Wann durften Frauen in Deutschland erstmals wählen?', back: 'Bei der Wahl zur Nationalversammlung am **19. Januar 1919**.' },
    { id: 'verfassung-datum', front: 'Wann wurde die Weimarer Verfassung beschlossen und warum in Weimar?', back: '**11. August 1919**; Weimar galt als ruhiger als das unruhige Berlin.' },
    { id: 'ebert', front: 'Wer war der erste Reichspräsident der Weimarer Republik?', back: '**Friedrich Ebert** (SPD).' },
    { id: 'art48', front: 'Was erlaubte Artikel 48 der Weimarer Verfassung?', back: 'Dem Reichspräsidenten das Regieren per **Notverordnung** im Ausnahmezustand.' },
    { id: 'republik-ohne', front: 'Was meint „Republik ohne Republikaner"?', back: 'Viele Eliten und Bürger lehnten die Demokratie innerlich ab.' },
    { id: 'ruhrbesetzung', front: 'Warum besetzten Frankreich und Belgien 1923 das Ruhrgebiet?', back: 'Wegen **ausstehender Reparationszahlungen**.' },
    { id: 'inflation-dollar', front: 'Was kostete ein US-Dollar im November 1923?', back: 'Rund **4,2 Billionen Mark**.' },
    { id: 'rentenmark', front: 'Womit wurde die Hyperinflation 1923 beendet?', back: 'Mit der **Rentenmark** (November 1923).' },
    { id: 'hitlerputsch', front: 'Wann und wo fand der Hitlerputsch statt?', back: 'Am **8./9. November 1923** in **München**.' },
    { id: 'stresemann', front: 'Wofür steht Gustav Stresemann?', back: 'Außenpolitik der Verständigung: **Locarno 1925**, **Völkerbund 1926**, Friedensnobelpreis 1926.' },
    { id: 'kultur-20er', front: 'Nenne drei kulturelle Symbole der Goldenen Zwanziger.', back: 'z. B. **Bauhaus** (1919), **Metropolis** (1927), **Dreigroschenoper** (1928).' },
    { id: 'arbeitslose-1932', front: 'Wie viele Arbeitslose gab es in Deutschland Anfang 1932?', back: 'Über **6 Millionen**.' },
    { id: 'nsdap-1932', front: 'Welchen Stimmenanteil erreichte die NSDAP im Juli 1932?', back: '**37,3 %** — stärkste Partei.' },
    { id: 'hitler-ernennung', front: 'Wann wurde Hitler Reichskanzler — und von wem ernannt?', back: 'Am **30. Januar 1933** von Reichspräsident **Paul von Hindenburg**.' },
    { id: 'weimar-lehren', front: 'Nenne drei Lehren, die das Grundgesetz aus Weimar zog.', back: 'Schwacher Bundespräsident ohne Notverordnungsrecht; konstruktives Misstrauensvotum; Fünf-Prozent-Hürde; Ewigkeitsklausel und wehrhafte Demokratie.' },
  ],
};
