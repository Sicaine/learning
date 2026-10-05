export default {
  id: 'gleichrichter',
  title: 'Einweg-, Zweiweg- und Brückengleichrichtung',
  summary: 'Aus dem Wechselstrom der Steckdose wird mit [[diode|Dioden]] eine Spannung, die nur noch in eine Richtung fließt. Du siehst, welchen Weg der Strom nimmt, was jede Diode kostet und warum das Ergebnis noch lange keine saubere Gleichspannung ist.',
  minutes: 30,
  needs: ['dioden', 'sinus-wechselspannung'],
  goals: [
    'Den Strompfad von [[einweggleichrichter|Einweg-]], [[mittelpunktschaltung|Mittelpunkt-]] und [[bruecken-gleichrichter|Brückenschaltung]] für beide Halbwellen nachzeichnen',
    'Die Ausgangs-Spitzenspannung vorhersagen: $\\hat u = \\sqrt 2\\, U_\\text{eff}$ minus [[flussspannung|Diodenspannungen]]',
    'Mittelwert ($2\\hat u/\\pi$) und Frequenz der Welligkeit (50 Hz bzw. 100 Hz) bestimmen',
    'Erklären, warum die [[pulsierende-gleichspannung]] am Ausgang noch geglättet werden muss',
  ],
  blocks: [
    {
      id: 'wozu', type: 'text', title: 'Wozu überhaupt gleichrichten?',
      md: `
Die Steckdose liefert [Wechselspannung](wiki:Wechselspannung|Alternating current): 230 V Effektivwert, 50 Hz, einmal hin und einmal her. Fast jede Elektronik — auch dein Transceiver — will aber **[Gleichstrom](wiki:Gleichstrom|Direct current)** mit einer festen Polung, zum Beispiel 13,8 V. Der erste Schritt dorthin ist die **[[gleichrichter|Gleichrichtung]]**.

Die Analogie ist ein [Rückschlagventil](wiki:Rückschlagventil|Check valve) im Wasserrohr: Das Wasser darf nur in eine Richtung strömen. Eine [Diode](wiki:Diode|Diode) macht das mit Strom — du kennst sie aus dem Halbleiter-Teil: In Durchlassrichtung leitet sie ab etwa 0,7 V ([[flussspannung]] bei Silizium), in Sperrrichtung fließt (fast) nichts.[^kuphaldt-semi-3]

Die Netzspannung wird dabei vorher mit einem [Transformator](wiki:Transformator|Transformer) auf eine ungefährliche, passende Höhe heruntergesetzt — das ist auch der Grund, warum in einem Funkgeräte-Netzteil zuerst ein schwerer Trafo sitzt und erst danach die Dioden kommen.`,
    },
    {
      id: 'einweg', type: 'text', title: 'Einweg: nur jede zweite Halbwelle',
      md: `
Die einfachste Schaltung hat **eine** Diode in Reihe zur Last. Bei der positiven Halbwelle leitet sie, bei der negativen sperrt sie — dann ist die Ausgangsspannung null. Der Strom fließt also nur in jeder zweiten Halbwelle.

Mit dem [Effektivwert](wiki:Effektivwert|Root mean square) $U_\\text{eff}$ der Trafo-Sekundärspannung ist der Spitzenwert (der [Scheitelwert](wiki:Scheitelwert|Amplitude#Peak amplitude)) der Sinusspannung

$$\\hat u = \\sqrt 2 \\cdot U_\\text{eff}$$

Am Ausgang fehlt die Durchlassspannung der Diode:

$$U_\\text{aus,Spitze} = \\hat u - U_F$$

Der **Mittelwert** (der [Gleichrichtwert](wiki:Gleichrichtwert|Average rectified value)) der Halbwellen ist $\\bar u = \\hat u/\\pi \\approx 0{,}32\\,\\hat u$ — viel kleiner als die Spitze, weil die halbe Zeit nichts passiert. Die Welligkeit hat die **Netzfrequenz** ([[netzfrequenz]]) von 50 Hz: eine Halbwelle pro Periode.`,
    },
    {
      id: 'bruecke', type: 'text', title: 'Brücke: beide Halbwellen nutzen',
      md: `
Die **Brückenschaltung** (nach dem Physiker [Leo Graetz](wiki:Leo Graetz|Leo Graetz) auch *Graetz-Schaltung*) nutzt vier Dioden so, dass der Strom durch die Last **immer in dieselbe Richtung** fließt:

- **positive Halbwelle:** Strom durch D1, die Last und D4 zurück,
- **negative Halbwelle:** Strom durch D3, die Last (wieder von oben nach unten!) und D2.

In jedem Moment liegen **zwei** Dioden im Strompfad, es gehen also zwei Durchlassspannungen verloren:

$$U_\\text{aus,Spitze} = \\hat u - 2\\,U_F \\qquad \\bar u = \\frac{2\\,\\hat u}{\\pi} \\approx 0{,}64\\,\\hat u$$

Weil jetzt jede Halbwelle genutzt wird, **verdoppelt** sich die Frequenz der Welligkeit auf 100 Hz.

Die **Mittelpunktschaltung** erreicht dasselbe mit nur zwei Dioden, braucht dafür aber einen Trafo mit [Mittelanzapfung](wiki:Mittelanzapfung|Transformer): Jede Hälfte der Sekundärwicklung bedient eine Diode. Dafür geht nur eine Durchlassspannung verloren, aber jede Wicklungshälfte liefert nur die halbe Spannung.`,
    },
    {
      id: 'video-bruecke', type: 'video', youtube: 'f9ebog1g5vM', label: 'GLEICHRICHTUNG endlich verstehen – Vollbrückengleichrichter einfach erklärt', channel: 'Elektrotechnik einfach erklärt', minutes: 8,
      why: 'Erklärt den Vollbrückengleichrichter mit den Strompfaden — ideal als Zweitblick, nachdem du den Strom im Schaltplan unten selbst verfolgt hast.',
    },
    {
      id: 'viz-rectifier', type: 'viz', viz: 'rectifier-lab', title: 'Gleichrichter-Labor',
      task: 'Wähle Schaltung, Dioden, Trafo-Spannung und Last, rechne die Spitzenspannung am Ausgang **im Kopf** aus und gib sie ein (Faustformel $\\hat u - n\\cdot U_F$, Si ≈ 0,7 V, Schottky ≈ 0,3 V). Nach „Prüfen" siehst du den Messwert. Schaffe drei richtige Vorhersagen mit verschiedenen Einstellungen. Der Strom im Schaltplan läuft in Zeitlupe mit.',
    },
    {
      id: 'warn-gleichspannung', type: 'callout', tone: 'warning', title: 'Das ist noch keine Gleichspannung',
      md: `
Am Ausgang steht eine **[[pulsierende-gleichspannung]]**: Sie wechselt zwar nie das Vorzeichen, schwankt aber zwischen null und der Spitze — im Oszillogramm sind es Sinus-Kuppen. Der Mittelwert liegt weit unter der Spitze, und ein Verbraucher sieht dieses Brummen als Störung. Gleichgerichtet ≠ geglättet: Dafür gibt es in der nächsten Lektion den Ladekondensator.

Ein häufiger Irrtum ist außerdem, die Ausgangsspannung für den *Effektivwert* der Trafospannung zu halten: Sie liegt nach der Gleichrichtung bei $\\hat u$, also rund 41 % **höher** — das merkst du spätestens, wenn ein Spannungsregler mehr verheizt als gedacht.`,
    },
    {
      id: 'calc-bruecke', type: 'numeric', title: 'Brücke rechnen',
      question: 'Ein Trafo liefert 12 V Effektivwert. Welche Spitzenspannung (in V) steht hinter einer Brücke aus zwei Si-Dioden pro Strompfad (je $U_F = 0{,}7$ V) am unbelasteten Ausgang ohne Kondensator?',
      answer: 15.6, tolerance: 0.1, unit: 'V',
      hint: 'Erst $\\hat u = \\sqrt 2 \\cdot 12$ V, dann zwei Durchlassspannungen abziehen.',
      explain: '$\\hat u = 1{,}414 \\cdot 12\\,\\text{V} = 16{,}97\\,\\text{V}$, abzüglich $2 \\cdot 0{,}7\\,\\text{V}$ ergibt $15{,}57\\,\\text{V} \\approx 15{,}6\\,\\text{V}$.',
    },
    {
      id: 'calc-einweg', type: 'numeric', title: 'Einweg rechnen',
      question: 'Gleicher Trafo (12 V Effektivwert), aber Einweggleichrichter mit einer Si-Diode ($U_F = 0{,}7$ V). Spitzenspannung am Ausgang in V?',
      answer: 16.3, tolerance: 0.1, unit: 'V',
      explain: '$16{,}97\\,\\text{V} - 0{,}7\\,\\text{V} = 16{,}27\\,\\text{V} \\approx 16{,}3\\,\\text{V}$. Es geht nur **eine** Diodenspannung verloren — dafür ist die Welligkeit grob und ihre Frequenz niedriger.',
    },
    {
      id: 'calc-freq', type: 'numeric', title: 'Frequenz der Welligkeit',
      question: 'Mit welcher Frequenz (in Hz) pulsiert die Ausgangsspannung einer Brückenschaltung am 50-Hz-Netz?',
      answer: 100, tolerance: 0, unit: 'Hz',
      explain: 'Pro Netzperiode gibt es zwei Halbwellen, und beide werden zu positiven Kuppen. Der Einweggleichrichter bleibt bei 50 Hz.',
    },
    {
      id: 'calc-mittel', type: 'numeric', title: 'Mittelwert',
      question: 'Eine Brücke (ideale Dioden, ohne Kondensator) bekommt eine Sinusspannung mit 10 V Spitze. Wie groß ist der Mittelwert der Ausgangsspannung in V?',
      answer: 6.37, tolerance: 0.02, unit: 'V',
      hint: 'Mittelwert eines gleichgerichteten Sinus: $2\\hat u / \\pi$.',
      explain: '$\\bar u = 2 \\cdot 10\\,\\text{V}/\\pi = 6{,}37\\,\\text{V}$. Beim Einweggleichrichter wäre es nur $10\\,\\text{V}/\\pi = 3{,}18\\,\\text{V}$.',
    },
    {
      id: 'quiz-sperr', type: 'quiz', question: 'Ein Einweggleichrichter lädt später einen Kondensator auf die Spitzenspannung $\\hat u$. Welche Sperrspannung muss die Diode mindestens aushalten?',
      options: [
        { text: 'ungefähr $2\\hat u$', correct: true, why: 'Der Kondensator hält die Kathode auf $+\\hat u$, während die Anode in der negativen Halbwelle auf $-\\hat u$ fällt: dazwischen liegt $2\\hat u$.' },
        { text: 'ungefähr $\\hat u$', correct: false, why: 'Das gilt nur ohne Kondensator, wo die Kathode bei Sperrung auf null liegt. Mit Ladekondensator addiert sich dessen Spannung.' },
        { text: 'ungefähr $U_\\text{eff}$', correct: false, why: 'Der Effektivwert ist nicht der Scheitelwert; Bauteile müssen immer für Spitzenwerte ausgelegt werden.' },
        { text: 'nur $U_F = 0{,}7$ V', correct: false, why: 'Die Durchlassspannung hat mit der Sperrrichtung nichts zu tun.' },
      ],
    },
    {
      id: 'quiz-brumm', type: 'quiz', question: 'Welche Aussage über die Ausgangsspannung einer Brücke ohne Kondensator ist richtig?',
      options: [
        { text: 'Pulsierende Gleichspannung: nie negativ, aber stark schwankend', correct: true, why: 'Sinus-Kuppen mit 100 Hz — der Mittelwert liegt bei etwa 64 % der Spitze.' },
        { text: 'Reine Gleichspannung mit dem Wert $U_\\text{eff}$', correct: false, why: 'Das ist der häufigste Denkfehler: Es fehlt die Glättung, und der Mittelwert ist nicht $U_\\text{eff}$.' },
        { text: 'Wechselspannung mit halber Amplitude', correct: false, why: 'Das Vorzeichen wechselt nicht mehr, und die Amplitude ist nicht halbiert.' },
        { text: 'Gleichspannung, die ohne Last auf 0 V fällt', correct: false, why: 'Ohne Last (und ohne Kondensator) steht dort die pulsierende Spannung, nicht dauerhaft null.' },
      ],
    },
    {
      id: 'match-schaltungen', type: 'match', prompt: 'Ordne jede Schaltung ihren Merkmalen zu.',
      pairs: [
        ['Einweg', '1 Diode, 50 Hz Welligkeit'],
        ['Brücke (Graetz)', '4 Dioden, 100 Hz, zwei Dioden im Strompfad'],
        ['Mittelpunktschaltung', '2 Dioden, Trafo mit Mittelanzapfung'],
      ],
    },
    {
      id: 'recall-bruecke', type: 'recall', prompt: 'Beschreibe den Strompfad der Brückenschaltung: Welche Dioden leiten bei der positiven, welche bei der negativen Halbwelle — und in welcher Richtung fließt der Strom jeweils durch die Last?',
      answer: 'Positive Halbwelle: Strom vom oberen Trafoanschluss durch D1, durch die Last von oben nach unten, über D4 zurück zum unteren Anschluss. Negative Halbwelle: Jetzt ist der untere Anschluss positiv, der Strom geht durch D3, durch die Last (wieder von oben nach unten) und über D2 zurück. In beiden Fällen leiten zwei Dioden gleichzeitig, die anderen beiden sperren. Darum steht die Ausgangsspannung immer in dieselbe Richtung und pulsiert mit 100 Hz.',
      hints: ['Bei jeder Halbwelle leiten die zwei Dioden, die gerade „in Durchlassrichtung" zwischen Trafo und Last liegen.'],
      cards: ['bruecke-strompfad', 'bruecke-ausgang'],
    },
    {
      id: 'mission', type: 'callout', tone: 'mission', title: 'Prüfung & Funkpraxis',
      md: `
Klasse E fragt nach den **Eigenschaften der Bauteile** und nach Spannungsverläufen: zum Beispiel, wofür Dioden verwendet werden (*zur Gleichrichtung von Wechselspannung*, EC502), welche Schwellspannung Silizium- und Germaniumdioden haben (0,6–0,8 V bzw. 0,2–0,4 V, EC503) und welchen Verlauf die Ausgangsspannung eines Einweggleichrichters ohne Kondensator hat — Halbwellen mit Lücken (ED304). Die Schottkydiode punktet mit niedriger Durchlassspannung und hoher Schaltfrequenz (EC504).

In der Praxis steckt jede Gleichrichter-Schaltung in deinem **Funkgeräte-Netzteil**: 13,8 V an 1,5 A bedeuten 20,7 W Aufnahme (NB601) — und jede Diodenspannung, die du in der Brücke verlierst, ist Wärme im Gehäuse. Die Schottky-Diode im Demo spart 0,4 V pro Strompfad.[^bnetza-pruefungsfragen-2024]`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table>
<tr><th>Deutsch</th><th>English</th></tr>
<tr><td>Gleichrichter</td><td>rectifier</td></tr>
<tr><td>Einweggleichrichter</td><td>half-wave rectifier</td></tr>
<tr><td>Brückengleichrichter</td><td>bridge rectifier / full-wave bridge</td></tr>
<tr><td>Mittelpunktschaltung</td><td>center-tap full-wave rectifier</td></tr>
<tr><td>Durchlassspannung</td><td>forward voltage</td></tr>
<tr><td>Sperrspannung</td><td>reverse voltage</td></tr>
<tr><td>Scheitelwert / Effektivwert</td><td>peak value / RMS value</td></tr>
<tr><td>Mittelwert (Gleichrichtwert)</td><td>average (rectified) value</td></tr>
<tr><td>pulsierende Gleichspannung</td><td>pulsating DC</td></tr>
</table>`,
    },
    {
      id: 'deep-geschichte', type: 'callout', tone: 'history', title: 'Vor den Halbleitern',
      md: `
Vor Silizium und Germanium wurde mit Vakuumröhren und, in der Starkstromtechnik, mit dem [Quecksilberdampfgleichrichter](wiki:Quecksilberdampfgleichrichter|Mercury-arc valve) gleichgerichtet. Die Idee der Schaltungen blieb gleich — heute übernimmt die Halbleiterdiode ([Silizium](wiki:Silizium|Silicon) oder die verlustärmere [Schottky-Diode](wiki:Schottky-Diode|Schottky diode) nach [Walter Schottky](wiki:Walter Schottky|Walter Schottky)) den Job.`,
    },
  ],
  cards: [
    { id: 'bruecke-strompfad', front: 'Wie viele Dioden liegen bei der **Brückenschaltung** gleichzeitig im Strompfad?', back: 'Zwei (je zwei der vier leiten pro Halbwelle) — daher zwei Durchlassspannungen Verlust.' },
    { id: 'bruecke-ausgang', front: 'Brückengleichrichter: Spitzenspannung am Ausgang (ohne C)?', back: '$U_\\text{aus,Spitze} = \\hat u - 2U_F$ mit $\\hat u = \\sqrt 2\\,U_\\text{eff}$.' },
    { id: 'einweg-ausgang', front: 'Einweggleichrichter: Spitzenspannung am Ausgang?', back: '$U_\\text{aus,Spitze} = \\hat u - U_F$.' },
    { id: 'frequenz-verdoppelung', front: 'Frequenz der Welligkeit bei Einweg und bei Brücke (50-Hz-Netz)?', back: 'Einweg 50 Hz, Brücke 100 Hz (beide Halbwellen werden genutzt).' },
    { id: 'mittelwert-bruecke', front: 'Mittelwert des gleichgerichteten Sinus (Brücke, ideal)?', back: '$\\bar u = \\dfrac{2\\hat u}{\\pi} \\approx 0{,}64\\,\\hat u$ (Einweg: $\\hat u/\\pi$).' },
    { id: 'u-spitze-effektiv', front: 'Zusammenhang Spitzen- und Effektivwert eines Sinus?', back: '$\\hat u = \\sqrt 2\\cdot U_\\text{eff}$ (230 V → 325 V).' },
    { id: 'pulsierende-gleichspannung', front: 'Was liefert ein Gleichrichter ohne Kondensator?', back: 'Eine **pulsierende Gleichspannung**: ändert nie das Vorzeichen, schwankt aber zwischen 0 und $\\hat u$ — Glättung nötig.' },
    { id: 'sperrspannung-mit-c', front: 'Sperrspannung einer Einweg-Diode mit Ladekondensator?', back: 'Ungefähr $2\\hat u$ (Kondensatorspannung + negative Spitze der Sekundärspannung).' },
    { id: 'mittelpunkt', front: 'Mittelpunktschaltung: Merkmale?', back: 'Trafo mit Mittelanzapfung, nur 2 Dioden, ein $U_F$ Verlust, aber jede Wicklungshälfte liefert nur die halbe Spannung.' },
    { id: 'schottky-vorteil', front: 'Warum Schottky-Dioden im Gleichrichter?', back: 'Niedrige Durchlassspannung (≈ 0,3 V statt 0,7 V) und hohe Schaltfrequenz → weniger Verlust.' },
  ],
};
