export default {
  id: 'zahlen',
  title: 'Zahlen & Mathematik im Alltag',
  summary: '[[prozent]], [[kreiszahl-pi|π]], [[zehnerpotenz|Zehnerpotenzen]], [[wahrscheinlichkeit]] und [[exponentielles-wachstum|exponentielles Wachstum]]: die Mathematik, ohne die man Nachrichten, Kredite und Statistiken nicht versteht — plus die großen Namen dahinter.',
  minutes: 22,
  goals: [
    'Prozent und Prozentpunkte unterscheiden und typische Prozentfallen erkennen',
    'Million, Milliarde und Billion sicher auseinanderhalten — auch im Vergleich zum Englischen',
    'Einfache [[wahrscheinlichkeit|Wahrscheinlichkeiten]] berechnen und die Lotto-Chance einordnen',
    '[[exponentielles-wachstum|Exponentielles]] von linearem Wachstum unterscheiden und die 70er-Regel anwenden',
    '[[kreiszahl-pi|π]], den [[satz-des-pythagoras|Satz des Pythagoras]], [[primzahl|Primzahlen]] und große Mathematiker kennen',
  ],
  blocks: [
    {
      id: 'prozent', type: 'text', title: 'Prozent: die meistmissbrauchte Zahl',
      md: `
[[prozent|Prozent]] heißt „von Hundert“: 15 % = 15/100 = 0,15.[^tech-wp-prozent] Klingt einfach — trotzdem stolpern selbst Nachrichtensendungen regelmäßig über zwei Fallen:

**1. Prozent oder Prozentpunkte?** Steigt der Stimmenanteil einer Partei von 10 % auf 12 %, dann sind das **2 Prozentpunkte** mehr — aber **20 Prozent** mehr (denn 2 ist ein Fünftel von 10). Wer „um 2 Prozent gestiegen“ sagt, liegt falsch.

**2. Hoch und runter ist nicht dasselbe.** Eine Aktie verliert 50 % und gewinnt danach 50 %. Du hast *nicht* wieder deinen Einsatz: Aus 100 € werden 50 €, und 50 % von 50 € sind 25 € — also 75 €. Um einen Verlust von 50 % auszugleichen, braucht man +100 %.

Ein dritter Klassiker: **relative vs. absolute Risiken**. „Verdoppelt das Risiko“ klingt dramatisch — ist es aber kaum, wenn es von 1 in 100.000 auf 2 in 100.000 steigt.`,
    },
    {
      id: 'calc-prozentpunkt', type: 'numeric', title: 'Prozentpunkte',
      question: 'Die Arbeitslosenquote sinkt von **8 %** auf **6 %**. Um wie viel **Prozent** ist sie gesunken?',
      answer: 25, tolerance: 0, unit: '%',
      hint: 'Der Rückgang beträgt 2 Prozentpunkte. Welcher Anteil von 8 ist 2?',
      explain: '2 von 8 = ein Viertel = **25 %**. Die Quote sank also um 2 Prozentpunkte bzw. um 25 Prozent.',
    },
    {
      id: 'potenzen', type: 'text', title: 'Große Zahlen: Million, Milliarde, Billion',
      md: `
Staatshaushalte, Weltbevölkerung, Entfernungen im All: Große Zahlen schreibt man am besten als [[zehnerpotenz|Zehnerpotenzen]].

<table>
<tr><th>Zahl</th><th>Deutsch</th><th>Englisch (US/UK heute)</th><th>Vorsilbe</th></tr>
<tr><td>$10^3$</td><td>Tausend</td><td>thousand</td><td>Kilo</td></tr>
<tr><td>$10^6$</td><td>Million</td><td>million</td><td>Mega</td></tr>
<tr><td>$10^9$</td><td><b>Milliarde</b></td><td><b>billion</b></td><td>Giga</td></tr>
<tr><td>$10^{12}$</td><td><b>Billion</b></td><td><b>trillion</b></td><td>Tera</td></tr>
</table>

Achtung Übersetzungsfalle: Das englische *billion* ist die deutsche **Milliarde**![^tech-wp-zahlwort] Wer „Elon Musk ist Billionär“ aus dem Englischen übernimmt, übertreibt um den Faktor 1.000.

Zur Einordnung: Die Weltbevölkerung liegt bei gut 8 Milliarden ($8 \\cdot 10^9$) Menschen, der Bundeshaushalt bei einigen hundert Milliarden Euro pro Jahr.`,
    },
    {
      id: 'match-zahlen', type: 'match', title: 'Wie heißt die Zahl?',
      pairs: [['10⁶', 'Million'], ['10⁹', 'Milliarde (engl. billion)'], ['10¹²', 'Billion (engl. trillion)'], ['10⁻³', 'Milli (ein Tausendstel)'], ['10⁻⁹', 'Nano (ein Milliardstel)']],
    },
    {
      id: 'wahrscheinlichkeit', type: 'text', title: 'Wahrscheinlichkeit: Würfel und Lotto',
      md: `
Eine [[wahrscheinlichkeit]] liegt zwischen 0 (unmöglich) und 1 (sicher). Bei gleich wahrscheinlichen Ausgängen gilt: **günstige Fälle ÷ mögliche Fälle**. Die Chance auf eine Sechs beim Würfeln ist 1/6. Für zwei *unabhängige* Ereignisse multipliziert man: zweimal hintereinander eine Sechs = 1/6 · 1/6 = 1/36.

Begründet wurde die Wahrscheinlichkeitsrechnung 1654 im Briefwechsel zwischen Blaise Pascal und Pierre de Fermat — es ging um Glücksspiel.

**Lotto 6 aus 49:** Die Chance auf 6 Richtige beträgt **1 : 13.983.816**, mit Superzahl sogar **1 : 139.838.160**.[^tech-wp-lotto] Zum Vergleich: Die Wahrscheinlichkeit, in einem Jahr vom Blitz getroffen zu werden, ist in Deutschland deutlich höher.

Die **Spielerfalle**: Nach fünfmal Rot beim Roulette ist Schwarz *nicht* wahrscheinlicher — die Kugel hat kein Gedächtnis.`,
    },
    {
      id: 'quiz-wahrsch', type: 'quiz', title: 'Denkfallen',
      question: 'Eine faire Münze zeigt fünfmal hintereinander „Kopf“. Wie groß ist die Wahrscheinlichkeit, dass der sechste Wurf „Zahl“ zeigt?',
      options: [
        { text: 'Größer als 50 % — jetzt ist Zahl „fällig“.', correct: false, why: 'Das ist der Spielerfehlschluss (Gambler’s Fallacy): Die Münze hat kein Gedächtnis.' },
        { text: 'Genau 50 %.', correct: true, why: 'Jeder Wurf ist unabhängig von den vorherigen.' },
        { text: 'Kleiner als 50 % — die Münze hat offenbar einen Hang zu Kopf.', correct: false, why: 'Bei einer *fairen* Münze bleibt es 50 %; fünfmal Kopf passiert zufällig in rund 3 % aller Fünferserien.' },
      ],
    },
    {
      id: 'exponentiell', type: 'text', title: 'Exponentielles Wachstum: warum wir uns immer verschätzen',
      md: `
Beim **linearen** Wachstum kommt jedes Jahr derselbe *Betrag* dazu. Beim **[[exponentielles-wachstum|exponentiellen]]** kommt derselbe *Anteil* dazu — etwa beim **Zinseszins**, bei Bakterien oder am Anfang einer Pandemie. Das menschliche Gehirn denkt linear und unterschätzt Exponentialfunktionen systematisch.

Die wichtigste Faustregel: **Verdopplungszeit ≈ 70 ÷ Wachstumsrate (in %)**. Bei 7 % Rendite verdoppelt sich Geld in rund 10 Jahren, bei 2 % Inflation halbiert sich die Kaufkraft in etwa 35 Jahren.

Die berühmte **Schachbrett-Legende**: Ein Weiser wünscht sich für das erste Feld ein Reiskorn, für jedes weitere das Doppelte. Auf dem 64. Feld lägen $2^{63}$ Körner — mehr Reis, als je auf der Erde geerntet wurde.`,
    },
    {
      id: 'viz-exp', type: 'viz', viz: 'technik-exponential', title: 'Linear gegen exponentiell',
      task: 'Stelle die Regler so ein, dass die exponentielle Kurve am Ende **mindestens zehnmal** so hoch liegt wie die lineare. Vergleiche die echte Verdopplungszeit mit der 70er-Faustregel.',
    },
    {
      id: 'calc-70', type: 'numeric', title: 'Die 70er-Regel',
      question: 'Die Preise steigen dauerhaft um **3,5 % pro Jahr**. Nach etwa wie vielen Jahren haben sie sich verdoppelt (70er-Regel)?',
      answer: 20, tolerance: 0.5, unit: 'Jahre',
      hint: '70 ÷ 3,5.',
      explain: '70 ÷ 3,5 = **20 Jahre**. Genau gerechnet sind es 20,1 Jahre — die Faustregel ist erstaunlich präzise.',
    },
    {
      id: 'klassiker', type: 'text', title: 'Drei Klassiker und ihre Köpfe',
      md: `
- **[[kreiszahl-pi|π]]** ≈ 3,14159 ist das Verhältnis von Kreisumfang zu Durchmesser: $U = \\pi \\cdot d$, $A = \\pi r^2$. Die Zahl hat unendlich viele Nachkommastellen ohne Muster.[^tech-wp-pi] Am 14. März (3/14 in US-Schreibweise) ist „Pi-Tag“.
- Der **[[satz-des-pythagoras|Satz des Pythagoras]]**: Im rechtwinkligen Dreieck gilt $a^2 + b^2 = c^2$. Mit einem Seil mit 3 + 4 + 5 gleichen Abschnitten konnte man schon in der Antike rechte Winkel abstecken.
- **[[primzahl|Primzahlen]]** (2, 3, 5, 7, 11, 13, …) sind nur durch 1 und sich selbst teilbar. Euklid bewies, dass es unendlich viele gibt; heute sichern riesige Primzahlen die Verschlüsselung beim Online-Banking.

**Carl Friedrich Gauß** (1777–1855) aus Braunschweig gilt als „Fürst der Mathematiker“.[^tech-wp-gauss] Der Legende nach addierte er als Schüler die Zahlen von 1 bis 100 in Sekunden: 50 Paare mit der Summe 101 ergeben 5.050. Seine Glockenkurve (Normalverteilung) zierte den letzten 10-DM-Schein. Weitere große Namen: **Euklid** (Geometrie), **Leonhard Euler**, **Gottfried Wilhelm Leibniz** (Infinitesimalrechnung, unabhängig von Newton) und **Emmy Noether**, die Begründerin der modernen Algebra.`,
    },
    {
      id: 'calc-pythagoras', type: 'numeric', title: 'Pythagoras anwenden',
      question: 'Ein Fernseher ist **48 cm hoch** und **64 cm breit**. Wie lang ist seine Bildschirmdiagonale in cm?',
      answer: 80, tolerance: 0.5, unit: 'cm',
      hint: '$48^2 + 64^2 = c^2$. Tipp: Das ist das 3-4-5-Dreieck mal 16.',
      explain: '$48^2 + 64^2 = 2304 + 4096 = 6400$, $\\sqrt{6400} = 80$ cm — das 3-4-5-Dreieck mit Faktor 16. In Zoll sind das rund 31,5".',
    },
    {
      id: 'fact-null', type: 'callout', tone: 'fact', title: 'Die Null kam spät',
      md: `Unsere Ziffern heißen **„arabische Ziffern“**, stammen aber ursprünglich aus **Indien**, wo auch die Null als eigene Zahl entwickelt wurde. Über die arabische Welt kamen sie nach Europa; Leonardo Fibonacci warb 1202 in seinem *Liber abaci* für sie. Die Römer hatten keine Null — und rechneten entsprechend mühsam.`,
    },
    {
      id: 'recall-prozent', type: 'recall', title: 'Entlarve die Schlagzeile',
      prompt: 'Eine Schlagzeile lautet: **„Risiko für Krankheit X verdoppelt!“** Die Studie zeigt, dass es von 1 in 50.000 auf 2 in 50.000 gestiegen ist. Was ist irreführend — und wie würdest du es korrekt formulieren?',
      answer: `Die Schlagzeile nennt nur das **relative** Risiko (+100 %), nicht das **absolute**. Absolut steigt es um winzige 0,002 Prozentpunkte: von 0,002 % auf 0,004 %, also 1 zusätzlicher Fall pro 50.000 Menschen. Korrekt wäre z. B.: „Risiko steigt von 1 auf 2 Fälle pro 50.000 Menschen.“ Bei jeder Prozentangabe sollte man fragen: Prozent wovon — und wie groß ist die Ausgangszahl?`,
      hints: ['Relativ vs. absolut.', 'Wie viele zusätzliche Fälle sind das pro 50.000?'],
      cards: ['relativ'],
    },
  ],
  cards: [
    { id: 'prozentpunkt', front: 'Anteil steigt von 10 % auf 12 %: Um wie viel ist er gestiegen?', back: 'Um 2 Prozent**punkte** — das sind 20 Prozent.' },
    { id: 'minus50', front: 'Erst −50 %, dann +50 %: Wo landest du?', back: 'Bei 75 % des Ausgangswerts. Um −50 % auszugleichen, braucht man +100 %.' },
    { id: 'relativ', front: 'Relatives vs. absolutes Risiko', back: 'Relativ: Veränderung im Verhältnis („verdoppelt“). Absolut: tatsächliche Veränderung („von 1 auf 2 pro 50.000“). Immer beides erfragen.' },
    { id: 'milliarde', front: 'Englisch *billion* auf Deutsch?', back: 'Milliarde ($10^9$). Das englische *trillion* ist die deutsche Billion ($10^{12}$).' },
    { id: 'billion', front: 'Wie viele Nullen hat eine (deutsche) Billion?', back: '12 ($10^{12}$ = tausend Milliarden).' },
    { id: 'mega-giga', front: 'Kilo, Mega, Giga, Tera', back: '$10^3$, $10^6$, $10^9$, $10^{12}$.' },
    { id: 'lotto', front: 'Chance auf 6 Richtige im Lotto 6 aus 49', back: '1 : 13.983.816 (mit Superzahl 1 : 139.838.160).' },
    { id: 'unabhaengig', front: 'Wahrscheinlichkeit für zwei Sechsen hintereinander', back: '1/6 · 1/6 = 1/36 (unabhängige Ereignisse multiplizieren).' },
    { id: 'spieler', front: 'Was ist der Spielerfehlschluss?', back: 'Der Irrglaube, nach einer Serie (z. B. fünfmal Rot) sei das Gegenteil „fällig“. Unabhängige Zufallsereignisse haben kein Gedächtnis.' },
    { id: 'pascal', front: 'Wer begründete 1654 die Wahrscheinlichkeitsrechnung?', back: 'Blaise Pascal und Pierre de Fermat (Briefwechsel über Glücksspiel).' },
    { id: 'expo', front: 'Linear vs. exponentiell', back: 'Linear: pro Schritt derselbe Betrag dazu. Exponentiell: pro Schritt derselbe Anteil (Prozentsatz) — feste Verdopplungszeit.' },
    { id: 'regel70', front: '70er-Regel', back: 'Verdopplungszeit ≈ 70 ÷ Wachstumsrate in % (z. B. 7 % → rund 10 Jahre).' },
    { id: 'pi', front: 'Was ist π — und wie groß ungefähr?', back: 'Verhältnis von Kreisumfang zu Durchmesser, ≈ 3,14159 (irrational).' },
    { id: 'kreis', front: 'Formeln für Kreisumfang und Kreisfläche', back: '$U = \\pi \\cdot d = 2\\pi r$, $A = \\pi r^2$.' },
    { id: 'pythagoras', front: 'Satz des Pythagoras', back: 'Im rechtwinkligen Dreieck: $a^2 + b^2 = c^2$ ($c$ = Hypotenuse, gegenüber dem rechten Winkel).' },
    { id: 'primzahl', front: 'Was ist eine Primzahl — und ist 1 eine?', back: 'Eine natürliche Zahl > 1, nur durch 1 und sich selbst teilbar. 1 ist keine Primzahl; 2 ist die einzige gerade.' },
    { id: 'gauss', front: 'Carl Friedrich Gauß', back: '„Fürst der Mathematiker“ (1777–1855, Braunschweig); Normalverteilung/Glockenkurve, auf dem 10-DM-Schein.' },
    { id: 'ziffern', front: 'Woher stammen die „arabischen“ Ziffern und die Null?', back: 'Aus Indien; über die arabische Welt nach Europa (Fibonacci, *Liber abaci*, 1202).' },
  ],
};
