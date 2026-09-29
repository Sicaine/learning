export default {
  id: 'eu-welt',
  title: 'Europäische Union & internationale Ordnung',
  summary: 'Von der Montanunion zur EU der 27, wer in Brüssel was entscheidet — und welche Rolle UNO und NATO spielen.',
  minutes: 25,
  goals: [
    'Die wichtigsten Stationen der europäischen Einigung nennen',
    'Die EU-Institutionen und ihre Aufgaben unterscheiden',
    '[[europarat]], [[europaeischer-rat|Europäischen Rat]] und [[rat-der-eu|Rat der EU]] auseinanderhalten',
    'Aufbau und Zweck von [[vereinte-nationen|UNO]] und [[nato|NATO]] erklären',
  ],
  blocks: [
    {
      id: 'idee', type: 'text', title: 'Nie wieder Krieg — durch Kohle und Stahl',
      md: `
Nach zwei Weltkriegen suchte man einen Weg, Frieden dauerhaft zu machen. Die Idee des französischen Außenministers **Robert Schuman** (1950): Die kriegswichtigen Industrien Kohle und Stahl gemeinsam verwalten — dann wird Krieg zwischen Deutschland und Frankreich „materiell unmöglich“.

So entstand **1951** die Europäische Gemeinschaft für Kohle und Stahl (**Montanunion**). **1957** folgten die **Römischen Verträge** und mit ihnen die Europäische Wirtschaftsgemeinschaft (EWG). Die sechs Gründerstaaten: **Belgien, Deutschland, Frankreich, Italien, Luxemburg und die Niederlande**.

Mit dem **Vertrag von Maastricht** (1992 unterzeichnet, 1993 in Kraft) wurde daraus die **[[europaeische-union|Europäische Union]]** — mit Unionsbürgerschaft und dem Plan einer gemeinsamen Währung. Der **Vertrag von Lissabon** (2009 in Kraft) gab der EU ihre heutige Form. Heute hat sie **27 Mitgliedstaaten**; das Vereinigte Königreich trat 2020 aus.[^wiki-eu]`,
    },
    {
      id: 'timeline-eu', type: 'game', viz: 'timeline', title: 'Stationen der Einigung',
      params: {
        mode: 'sort',
        events: [
          { year: 1951, label: 'Montanunion' },
          { year: 1957, label: 'Römische Verträge' },
          { year: 1979, label: 'Erste Europawahl' },
          { year: 1985, label: 'Schengener Abkommen' },
          { year: 1993, label: 'Maastricht: EU gegründet' },
          { year: 2002, label: 'Euro-Bargeld' },
          { year: 2004, label: 'Osterweiterung (+10)' },
          { year: 2009, label: 'Vertrag von Lissabon' },
          { year: 2020, label: 'Brexit' },
        ],
      },
    },
    {
      id: 'institutionen', type: 'text', title: 'Wer entscheidet in der EU?',
      md: `
Die EU hat ein eigenes System von Institutionen:[^eu-portal]

<table>
<tr><th>Institution</th><th>Wer?</th><th>Aufgabe</th><th>Sitz</th></tr>
<tr><td>Europäische Kommission</td><td>27 Kommissare, einer pro Land</td><td>schlägt Gesetze vor, überwacht die Einhaltung</td><td>Brüssel</td></tr>
<tr><td>Europäisches Parlament</td><td>720 direkt gewählte Abgeordnete</td><td>beschließt Gesetze und Haushalt mit</td><td>Straßburg / Brüssel</td></tr>
<tr><td>Rat der EU</td><td>Fachminister der Mitgliedstaaten</td><td>beschließt Gesetze mit dem Parlament</td><td>Brüssel</td></tr>
<tr><td>Europäischer Rat</td><td>Staats- und Regierungschefs</td><td>gibt die politische Richtung vor</td><td>Brüssel</td></tr>
<tr><td>Gerichtshof der EU (EuGH)</td><td>Richter aus allen Staaten</td><td>legt EU-Recht verbindlich aus</td><td>Luxemburg</td></tr>
<tr><td>Europäische Zentralbank</td><td>Direktorium und Notenbankchefs</td><td>Geldpolitik für den Euro</td><td>Frankfurt am Main</td></tr>
</table>

Ein EU-Gesetz entsteht meist so: Die **[[europaeische-kommission|Kommission]]** schlägt vor, **[[europaeisches-parlament|Parlament]]** und **[[rat-der-eu|Rat]]** beschließen gemeinsam. Präsidentin der Kommission ist seit 2019 **Ursula von der Leyen** (Stand 2026). Deutschland stellt mit **96** die meisten Abgeordneten im Europäischen Parlament.`,
    },
    {
      id: 'warn-raete', type: 'callout', tone: 'warning', title: 'Drei Räte, die man ständig verwechselt',
      md: `
- **[[europaeischer-rat|Europäischer Rat]]** — die Gipfeltreffen der **Staats- und Regierungschefs** (EU-Institution).
- **[[rat-der-eu|Rat der Europäischen Union]]** — die **Fachminister**, Mitgesetzgeber (EU-Institution).
- **[[europarat|Europarat]]** — eine **eigene internationale Organisation** mit 46 Staaten, 1949 gegründet, Sitz Straßburg; zuständig für die Europäische Menschenrechtskonvention und den **Europäischen Gerichtshof für Menschenrechte**. Er hat mit der EU nichts zu tun!`,
    },
    {
      id: 'quiz-raete', type: 'quiz', title: 'Welcher Rat?',
      question: 'Ein Bürger will sich über eine Verletzung seiner Rechte aus der Europäischen Menschenrechtskonvention beschweren. An welches Gericht — und zu welcher Organisation gehört es?',
      options: [
        { text: 'Europäischer Gerichtshof für Menschenrechte in Straßburg — Europarat', correct: true, why: 'Der EGMR ist das Gericht des Europarats, nicht der EU.' },
        { text: 'Gerichtshof der EU in Luxemburg — Europäische Union', correct: false, why: 'Der EuGH legt EU-Recht aus, nicht die Menschenrechtskonvention.' },
        { text: 'Europäischer Rat in Brüssel — Europäische Union', correct: false, why: 'Der Europäische Rat ist kein Gericht, sondern das Gremium der Staats- und Regierungschefs.' },
        { text: 'Internationaler Gerichtshof in Den Haag — UNO', correct: false, why: 'Dort klagen nur Staaten gegen Staaten, keine Einzelpersonen.' },
      ],
    },
    {
      id: 'euro-schengen', type: 'text', title: 'Euro und Schengen: Europa im Alltag',
      md: `
Zwei Dinge machen die EU im Alltag spürbar:

- **Der Euro**: 1999 als Buchgeld, seit **1. Januar 2002** als Bargeld. Seit dem Beitritt Bulgariens am 1. Januar 2026 nutzen ihn **21 der 27 EU-Staaten** (Stand 2026). Die Geldpolitik macht die Europäische Zentralbank in Frankfurt.
- **[[schengen|Schengen]]**: Das 1985 im luxemburgischen Winzerort Schengen unterzeichnete Abkommen schaffte die Personenkontrollen an den Binnengrenzen ab. Zum Schengen-Raum gehören 29 Staaten — auch Nicht-EU-Länder wie die Schweiz und Norwegen, dafür nicht die EU-Mitglieder Irland und Zypern.`,
    },
    {
      id: 'numeric-euro', type: 'numeric', title: 'Wer zahlt nicht mit Euro?',
      question: 'Die EU hat 27 Mitgliedstaaten, die Eurozone 21 (Stand 2026). Wie viele EU-Staaten haben den Euro **nicht**?',
      answer: 6, tolerance: 0, unit: 'Staaten',
      explain: '27 − 21 = **6**: Dänemark (hat sich dauerhaft ausnehmen lassen), Schweden, Polen, Tschechien, Ungarn und Rumänien.',
    },
    {
      id: 'uno-nato', type: 'text', title: 'Die Welt: UNO und NATO',
      md: `
Die **[[vereinte-nationen|Vereinten Nationen]]** wurden **1945** gegründet, um den Weltfrieden zu sichern. Sitz ist **New York**; heute gehören ihnen **193 Staaten** an. In der Generalversammlung hat jeder Staat eine Stimme. Das mächtigste Gremium ist der **[[sicherheitsrat|Sicherheitsrat]]**: 15 Mitglieder, davon fünf ständige mit **Vetorecht** — die USA, Russland, China, Frankreich und das Vereinigte Königreich. Beide deutschen Staaten traten **1973** bei.[^un-org]

Die **[[nato|NATO]]** ist ein Verteidigungsbündnis, **1949** gegründet. Ihr Kern ist **Artikel 5**: Ein bewaffneter Angriff auf ein Mitglied gilt als Angriff auf alle. Die Bundesrepublik wurde **1955** Mitglied. Nach Russlands Angriff auf die Ukraine traten Finnland (2023) und Schweden (2024) bei; heute hat die NATO **32 Mitglieder**.[^nato-int]`,
    },
    {
      id: 'match-sitze', type: 'match', title: 'Wo sitzt wer?',
      pairs: [
        ['Europäische Kommission', 'Brüssel'],
        ['Europäisches Parlament (Plenum)', 'Straßburg'],
        ['Gerichtshof der EU', 'Luxemburg'],
        ['Europäische Zentralbank', 'Frankfurt am Main'],
        ['UNO-Hauptquartier', 'New York'],
        ['Internationaler Gerichtshof', 'Den Haag'],
      ],
    },
    {
      id: 'fact-art5', type: 'callout', tone: 'fact', title: 'Artikel 5 — nur einmal ausgerufen',
      md: `Der Bündnisfall nach Artikel 5 wurde in der Geschichte der NATO bisher **ein einziges Mal** ausgerufen: nach den Terroranschlägen vom **11. September 2001** — zugunsten der USA.`,
    },
    {
      id: 'recall-eu', type: 'recall', title: 'Erkläre es',
      prompt: 'Wie entsteht ein typisches EU-Gesetz? Nenne die beteiligten Institutionen und ihre Rolle.',
      answer: `Die **Europäische Kommission** hat das Initiativrecht und legt einen Vorschlag vor. Dann beraten und beschließen **Europäisches Parlament** (die direkt gewählten Abgeordneten) und **Rat der EU** (die Fachminister der Mitgliedstaaten) gemeinsam — im „ordentlichen Gesetzgebungsverfahren“ müssen beide zustimmen. Der **Europäische Rat** gibt nur die politische Richtung vor, der **EuGH** legt das fertige Recht im Streitfall verbindlich aus.`,
      hints: ['Wer darf Gesetze vorschlagen?', 'Zwei Institutionen müssen zustimmen.'],
      cards: ['gesetzgebung'],
    },
  ],
  cards: [
    { id: 'gruender', front: 'Die sechs Gründerstaaten der EWG (1957)', back: 'Belgien, Deutschland, Frankreich, Italien, Luxemburg, Niederlande.' },
    { id: 'montan', front: 'Wann und womit begann die europäische Einigung?', back: '**1951** mit der Montanunion (Europäische Gemeinschaft für Kohle und Stahl) — nach dem Plan von Robert Schuman.' },
    { id: 'roemisch', front: 'Was wurde mit den Römischen Verträgen gegründet — und wann?', back: 'Die **Europäische Wirtschaftsgemeinschaft (EWG)**, **1957**.' },
    { id: 'maastricht', front: 'Welcher Vertrag gründete die Europäische Union?', back: 'Der **Vertrag von Maastricht** (1992 unterzeichnet, 1993 in Kraft).' },
    { id: 'lissabon', front: 'Welcher Vertrag gab der EU ihre heutige Form?', back: 'Der **Vertrag von Lissabon** (2007 unterzeichnet, 2009 in Kraft).' },
    { id: 'mitglieder', front: 'Wie viele Mitglieder hat die EU (Stand 2026)?', back: '**27** (seit dem Brexit 2020).' },
    { id: 'kommission', front: 'Aufgabe der Europäischen Kommission — und wer leitet sie?', back: 'Schlägt Gesetze vor und überwacht die Einhaltung („Hüterin der Verträge“); Präsidentin **Ursula von der Leyen** (Stand 2026).' },
    { id: 'gesetzgebung', front: 'Wer beschließt EU-Gesetze?', back: '**Europäisches Parlament** und **Rat der EU** gemeinsam, auf Vorschlag der Kommission.' },
    { id: 'raete', front: 'Europäischer Rat, Rat der EU, Europarat — der Unterschied?', back: 'Europäischer Rat = Staats- und Regierungschefs (EU). Rat der EU = Fachminister, Mitgesetzgeber (EU). Europarat = eigene Organisation für Menschenrechte (nicht EU), Straßburg.' },
    { id: 'euro', front: 'Seit wann gibt es Euro-Bargeld, und wie viele Staaten nutzen den Euro (Stand 2026)?', back: 'Seit **1. Januar 2002**; **21** Staaten (Bulgarien seit 2026).' },
    { id: 'schengen', front: 'Was regelt das Schengener Abkommen (1985)?', back: 'Den **Wegfall der Personenkontrollen** an den Binnengrenzen; 29 Staaten, auch Nicht-EU-Länder wie die Schweiz.' },
    { id: 'uno', front: 'UNO: Gründungsjahr, Sitz, Zahl der Mitglieder?', back: '**1945**, **New York**, **193** Staaten.' },
    { id: 'sr', front: 'Die fünf ständigen Mitglieder des UN-Sicherheitsrats', back: 'USA, Russland, China, Frankreich, Vereinigtes Königreich — alle mit **Vetorecht**.' },
    { id: 'deutsch-uno', front: 'Wann traten die beiden deutschen Staaten der UNO bei?', back: '**1973**.' },
    { id: 'nato', front: 'NATO: Gründung, deutscher Beitritt, Kernartikel?', back: 'Gegründet **1949**; Bundesrepublik seit **1955**; **Artikel 5** (Beistandspflicht).' },
    { id: 'nato-zahl', front: 'Wie viele Mitglieder hat die NATO, und wer kam zuletzt dazu?', back: '**32**; zuletzt **Finnland** (2023) und **Schweden** (2024).' },
  ],
};
