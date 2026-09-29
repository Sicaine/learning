export default {
  id: 'wahlen-parteien',
  title: 'Wahlen & Parteien',
  summary: 'Wie die Bundestagswahl funktioniert, was sich 2023 am Wahlrecht geändert hat, warum Deutschland von Koalitionen regiert wird — und welche Parteien im Bundestag sitzen.',
  minutes: 25,
  goals: [
    'Die fünf [[wahlgrundsaetze|Wahlrechtsgrundsätze]] nennen',
    '[[erststimme]] und [[zweitstimme]] erklären — und die [[zweitstimmendeckung]] seit 2023',
    '[[fuenf-prozent-huerde|Fünf-Prozent-Hürde]] und [[grundmandatsklausel]] erklären',
    'Die Parteien im 21. Bundestag und die Bundeskanzler seit 1949 kennen',
  ],
  blocks: [
    {
      id: 'grundsaetze', type: 'text', title: 'Allgemein, unmittelbar, frei, gleich, geheim',
      md: `
„Alle Staatsgewalt geht vom Volke aus“ — konkret wird das vor allem in Wahlen. Art. 38 GG legt fünf [[wahlgrundsaetze|Wahlrechtsgrundsätze]] fest: Die Abgeordneten werden in **allgemeiner, unmittelbarer, freier, gleicher und geheimer** Wahl gewählt.

Wählen darf bei der Bundestagswahl, wer Deutscher und mindestens **18 Jahre** alt ist. Bei der Europawahl liegt das Wahlalter seit 2024 bei **16 Jahren**, bei Kommunal- und manchen Landtagswahlen ebenfalls — das regelt jedes Land selbst.

Und: In Deutschland gibt es **keine Wahlpflicht**. Die Wahlbeteiligung lag 2025 bei **82,5 %** — dem höchsten Wert seit der Wiedervereinigung.[^wiki-btw2025]`,
    },
    {
      id: 'stimmen', type: 'text', title: 'Zwei Stimmen, eine davon entscheidet',
      md: `
Auf dem Stimmzettel stehen zwei Spalten:

- Mit der **[[erststimme|Erststimme]]** (links) wählt man eine Person, die den eigenen **Wahlkreis** vertreten soll. Es gibt **299 Wahlkreise**; gewählt ist, wer dort die meisten Stimmen erhält (relative Mehrheit).
- Mit der **[[zweitstimme|Zweitstimme]]** (rechts) wählt man die Landesliste einer Partei. Sie ist die **wichtigere Stimme**: Nach ihr werden die Sitze im Bundestag verhältnismäßig auf die Parteien verteilt.

Das Ergebnis ist eine **personalisierte Verhältniswahl**: Die Zusammensetzung des Bundestages spiegelt die Zweitstimmen wider, aber jeder Wahlkreis soll ein Gesicht haben.`,
    },
    {
      id: 'reform', type: 'text', title: 'Die Reform: Schluss mit dem XXL-Bundestag',
      md: `
Früher galt: Gewann eine Partei mehr Wahlkreise, als ihr nach Zweitstimmen Sitze zustanden, durfte sie die zusätzlichen Sitze behalten (**Überhangmandate**) — und die anderen Parteien bekamen **Ausgleichsmandate**. Der Bundestag wuchs so auf **736 Abgeordnete** (2021) statt der vorgesehenen 598.

Die Wahlrechtsreform von 2023, erstmals angewandt 2025, ändert das grundlegend:[^wiki-wahlrecht]

- Der Bundestag hat fest **630 Sitze**.
- Es gilt die **[[zweitstimmendeckung|Zweitstimmendeckung]]**: Eine Partei erhält höchstens so viele Sitze, wie ihr nach Zweitstimmen zustehen. Hat sie mehr Wahlkreise gewonnen, gehen ihre Wahlkreissieger mit den **schwächsten Ergebnissen leer aus**.
- 2025 betraf das **23 Wahlkreissieger** — sie gewannen ihren Wahlkreis und zogen trotzdem nicht in den Bundestag ein.

Die Reform wollte auch die [[grundmandatsklausel]] abschaffen. Das Bundesverfassungsgericht entschied 2024 jedoch, dass sie vorerst weiter gilt.`,
    },
    {
      id: 'huerde', type: 'text', title: 'Die Fünf-Prozent-Hürde',
      md: `
In der Weimarer Republik saßen zeitweise über ein Dutzend Parteien im Reichstag, stabile Mehrheiten waren kaum möglich. Deshalb gilt die **[[fuenf-prozent-huerde|Fünf-Prozent-Hürde]]**: Nur Parteien mit mindestens 5 % der Zweitstimmen erhalten Sitze. Ausnahmen:

- **Grundmandatsklausel**: Wer mindestens **drei Wahlkreise** gewinnt, zieht entsprechend seinem Zweitstimmenanteil ein, auch unter 5 %.
- **Parteien nationaler Minderheiten** sind befreit — etwa der **SSW** (Südschleswigscher Wählerverband) der dänischen Minderheit und der Friesen, der 2025 einen Sitz errang.

2025 scheiterten zwei Parteien knapp: die **FDP** mit 4,3 % und das **BSW** mit 4,98 %.[^wiki-btw2025]`,
    },
    {
      id: 'quiz-stimmen', type: 'quiz', title: 'Erst- oder Zweitstimme?',
      question: 'Welche Aussagen zur Bundestagswahl (Stand 2026) sind richtig?',
      options: [
        { text: 'Die Zweitstimme entscheidet über die Sitzverteilung zwischen den Parteien.', correct: true, why: 'Genau — sie ist die wichtigere Stimme.' },
        { text: 'Wer seinen Wahlkreis gewinnt, zieht immer in den Bundestag ein.', correct: false, why: 'Seit der Reform nicht mehr: Ohne Zweitstimmendeckung bleibt das Mandat aus — 2025 traf das 23 Wahlkreissieger.' },
        { text: 'Der Bundestag hat 630 Sitze.', correct: true, why: 'Feste Größe seit der Wahlrechtsreform 2023.' },
        { text: 'Eine Partei mit 4 % der Zweitstimmen und drei gewonnenen Wahlkreisen zieht in Fraktionsstärke ein.', correct: true, why: 'Das ist die Grundmandatsklausel — sie bekommt Sitze entsprechend ihren 4 %.' },
        { text: 'In Deutschland besteht Wahlpflicht.', correct: false, why: 'Nein, anders als etwa in Belgien oder Australien.' },
      ],
    },
    {
      id: 'bundestag-2025', type: 'text', title: 'Der 21. Bundestag',
      md: `
Die vorgezogene Wahl vom **23. Februar 2025** ergab folgende Sitzverteilung (Stand 2026):[^bundeswahlleiterin-2025]

<table>
<tr><th>Partei</th><th>Zweitstimmen</th><th>Sitze</th></tr>
<tr><td>CDU/CSU („Union“)</td><td>28,5 %</td><td>208</td></tr>
<tr><td>AfD</td><td>20,8 %</td><td>152</td></tr>
<tr><td>SPD</td><td>16,4 %</td><td>120</td></tr>
<tr><td>Bündnis 90/Die Grünen</td><td>11,6 %</td><td>85</td></tr>
<tr><td>Die Linke</td><td>8,8 %</td><td>64</td></tr>
<tr><td>SSW</td><td>0,2 %</td><td>1</td></tr>
<tr><td><b>Gesamt</b></td><td></td><td><b>630</b></td></tr>
</table>

Union und SPD bildeten eine [[koalition]]; am 6. Mai 2025 wurde Friedrich Merz zum Bundeskanzler gewählt.`,
    },
    {
      id: 'numeric-koalition', type: 'numeric', title: 'Reicht es für die Mehrheit?',
      question: 'Union (208 Sitze) und SPD (120 Sitze) bilden eine Koalition. Wie viele Sitze liegt sie **über** der Kanzlermehrheit von 316?',
      answer: 12, tolerance: 0, unit: 'Sitze',
      hint: 'Erst die Koalitionssitze addieren, dann 316 abziehen.',
      explain: '208 + 120 = 328 Sitze; 328 − 316 = **12**. Eine knappe Mehrheit — das erklärt auch, warum Merz im ersten Wahlgang scheitern konnte: Schon wenige Abweichler aus den eigenen Reihen reichten.',
    },
    {
      id: 'parteien', type: 'text', title: 'Die Parteien im Bundestag',
      md: `
Parteien wirken nach Art. 21 GG „bei der politischen Willensbildung des Volkes mit“. Ein kurzer, neutraler Steckbrief der Parteien im 21. Bundestag:

- **CDU** (1945 gegründet) und **CSU** (nur in Bayern) — christdemokratisch bzw. christlich-sozial, bilden eine gemeinsame Fraktion. Stellten mit Adenauer, Erhard, Kiesinger, Kohl, Merkel und Merz die meisten Kanzler.
- **SPD** — die älteste Partei Deutschlands, Wurzeln im Jahr 1863 (Allgemeiner Deutscher Arbeiterverein); sozialdemokratisch. Kanzler: Brandt, Schmidt, Schröder, Scholz.
- **AfD** — 2013 gegründet, seit 2017 im Bundestag, 2025 zweitstärkste Kraft. Wird vom Bundesamt für Verfassungsschutz als rechtsextremistischer Verdachtsfall beobachtet; die Hochstufung zur „gesichert rechtsextremistischen Bestrebung“ vom Mai 2025 ist gerichtlich vorläufig gestoppt (Stand 2026).
- **Bündnis 90/Die Grünen** — 1980 als Grüne gegründet, 1993 mit dem ostdeutschen Bündnis 90 vereinigt; ökologisch orientiert.
- **Die Linke** — 2007 aus der PDS (Nachfolgerin der DDR-Staatspartei SED) und der westdeutschen WASG entstanden; demokratisch-sozialistisch.
- **SSW** — Partei der dänischen Minderheit und der Friesen in Schleswig-Holstein.

Die **FDP**, die über Jahrzehnte oft Koalitionspartner war, ist seit 2025 nicht mehr im Bundestag vertreten.`,
    },
    {
      id: 'match-kanzler', type: 'match', title: 'Kanzler und ihre Partei',
      prompt: 'Ordne die Bundeskanzler ihrer Partei zu.',
      pairs: [
        ['Konrad Adenauer', 'CDU — erster Bundeskanzler'],
        ['Willy Brandt', 'SPD — Ostpolitik'],
        ['Helmut Kohl', 'CDU — Kanzler der Einheit'],
        ['Gerhard Schröder', 'SPD — Agenda 2010'],
        ['Angela Merkel', 'CDU — erste Bundeskanzlerin'],
        ['Olaf Scholz', 'SPD — Ampelkoalition'],
      ],
    },
    {
      id: 'kanzler-zeit', type: 'game', viz: 'timeline', title: 'Die Bundeskanzler in der richtigen Reihenfolge',
      params: {
        mode: 'sort',
        events: [
          { year: 1949, label: 'Adenauer (CDU)' },
          { year: 1963, label: 'Erhard (CDU)' },
          { year: 1969, label: 'Brandt (SPD)' },
          { year: 1974, label: 'Schmidt (SPD)' },
          { year: 1982, label: 'Kohl (CDU)' },
          { year: 1998, label: 'Schröder (SPD)' },
          { year: 2005, label: 'Merkel (CDU)' },
          { year: 2021, label: 'Scholz (SPD)' },
          { year: 2025, label: 'Merz (CDU)' },
        ],
      },
    },
    {
      id: 'fact-kiesinger', type: 'callout', tone: 'fact', title: 'Wer fehlt?',
      md: `In der Zeitleiste fehlt **Kurt Georg Kiesinger** (CDU, 1966–1969), Kanzler der ersten Großen Koalition. Damit gab es bis heute **zehn** Bundeskanzler. Am längsten regierten Helmut Kohl (16 Jahre, 1982–1998) und Angela Merkel (16 Jahre, 2005–2021).`,
    },
    {
      id: 'recall-reform', type: 'recall', title: 'Erkläre es',
      prompt: 'Was waren **Überhang- und Ausgleichsmandate**, und wie verhindert die Wahlrechtsreform von 2023, dass der Bundestag weiter wächst?',
      answer: `Überhangmandate entstanden, wenn eine Partei mehr Wahlkreise direkt gewann, als ihr nach Zweitstimmen Sitze zustanden — sie durfte die zusätzlichen Sitze behalten. Damit das Kräfteverhältnis stimmt, erhielten die anderen Parteien Ausgleichsmandate. So wuchs der Bundestag 2021 auf 736 Sitze. Seit der Reform gilt eine feste Größe von **630 Sitzen** und die **Zweitstimmendeckung**: Eine Partei bekommt nie mehr Sitze, als ihr nach Zweitstimmen zustehen; überzählige Wahlkreissieger mit den schwächsten Ergebnissen erhalten kein Mandat (2025: 23 Fälle).`,
      hints: ['Was passierte, wenn eine Partei „zu viele“ Wahlkreise gewann?', 'Welche Zahl ist seit 2025 fest?'],
      cards: ['reform', 'ueberhang'],
    },
  ],
  cards: [
    { id: 'grundsaetze', front: 'Die fünf Wahlrechtsgrundsätze (Art. 38 GG)', back: 'Allgemein, unmittelbar, frei, gleich, geheim.' },
    { id: 'wahlalter', front: 'Wahlalter bei Bundestags- und bei Europawahl?', back: 'Bundestag: **18**. Europawahl: **16** (seit 2024).' },
    { id: 'erst', front: 'Wofür ist die Erststimme?', back: 'Für eine Person im eigenen **Wahlkreis** (299 Wahlkreise); dort gilt die relative Mehrheit.' },
    { id: 'zweit', front: 'Wofür ist die Zweitstimme?', back: 'Für die Landesliste einer Partei — sie **entscheidet über die Sitzverteilung** im Bundestag.' },
    { id: 'reform', front: 'Was ist die Zweitstimmendeckung?', back: 'Seit der Reform 2023: Direktmandate zählen nur, soweit die Zweitstimmen der Partei sie decken. Keine Überhang- und Ausgleichsmandate mehr, feste 630 Sitze.' },
    { id: 'ueberhang', front: 'Wie groß war der Bundestag 2021 wegen Überhang- und Ausgleichsmandaten?', back: '**736** Abgeordnete.' },
    { id: 'leer', front: 'Wie viele Wahlkreissieger bekamen 2025 kein Mandat?', back: '**23** — wegen fehlender Zweitstimmendeckung.' },
    { id: 'huerde', front: 'Ausnahmen von der Fünf-Prozent-Hürde', back: 'Grundmandatsklausel (mindestens **3 Wahlkreise**) und Parteien nationaler Minderheiten (z. B. **SSW**).' },
    { id: 'btw2025', front: 'Datum der Bundestagswahl 2025 und Wahlbeteiligung?', back: '**23. Februar 2025**, Wahlbeteiligung **82,5 %** (höchste seit der Wiedervereinigung).' },
    { id: 'sitze2025', front: 'Sitzverteilung im 21. Bundestag (630 Sitze)', back: 'CDU/CSU 208, AfD 152, SPD 120, Grüne 85, Linke 64, SSW 1.' },
    { id: 'gescheitert', front: 'Welche Parteien scheiterten 2025 knapp an der Fünf-Prozent-Hürde?', back: '**FDP** (4,3 %) und **BSW** (4,98 %).' },
    { id: 'kanzler-liste', front: 'Die zehn Bundeskanzler in Reihenfolge', back: 'Adenauer, Erhard, Kiesinger, Brandt, Schmidt, Kohl, Schröder, Merkel, Scholz, Merz.' },
    { id: 'laengste', front: 'Welche Kanzler regierten am längsten?', back: '**Helmut Kohl** (1982–1998) und **Angela Merkel** (2005–2021), je 16 Jahre.' },
    { id: 'spd-alter', front: 'Älteste Partei Deutschlands — und ihre Wurzel?', back: 'Die **SPD**; Wurzel ist der Allgemeine Deutsche Arbeiterverein von **1863**.' },
    { id: 'linke', front: 'Woraus entstand die Partei Die Linke?', back: '2007 aus der **PDS** (Nachfolgerin der SED) und der westdeutschen **WASG**.' },
    { id: 'koalition', front: 'Welche Koalition regiert seit 2025 (Stand 2026)?', back: 'CDU/CSU und SPD, 328 von 630 Sitzen; Kanzler Friedrich Merz.' },
  ],
};
