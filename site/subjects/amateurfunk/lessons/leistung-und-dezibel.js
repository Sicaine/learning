export default {
  id: 'leistung-und-dezibel',
  title: 'Leistung, Wirkungsgrad und Dezibel',
  summary: 'Elektrische Leistung aus Spannung, Strom und Widerstand berechnen, Belastbarkeit von Widerständen und Dummy Loads beurteilen und mit dem Dezibel Leistungsverhältnisse kompakt ausdrücken.',
  minutes: 20,
  goals: [
    'Die drei Leistungsformeln $P = U\\cdot I$, $P = U^2/R$ und $P = I^2\\cdot R$ anwenden und nach $U$, $I$, $R$ umstellen',
    'Prüfen, ob ein Widerstand genug [[belastbarkeit|Belastbarkeit]] hat, und Grenzspannung bzw. Grenzstrom berechnen',
    'Verstehen, warum man für Wechselspannung mit Effektivwerten rechnet und wie sich Belastbarkeiten parallel addieren',
    'Das [[dezibel]] als Verhältnismaß nutzen: 3 dB = Faktor 2, 10 dB = Faktor 10, $g = 10\\cdot\\log(P_2/P_1)$',
  ],
  needs: ['elektrotechnik/leistung-und-energie', 'elektrotechnik/dezibel'],
  blocks: [
    {
      id: 'leistung', type: 'text', title: 'Elektrische Leistung',
      md: `
Die **[elektrische Leistung](wiki:Elektrische Leistung|Electric power)** $P$ sagt, wie viel Energie pro Sekunde umgesetzt wird. Ihre Einheit ist das **Watt (W)** — nach [James Watt](wiki:James Watt|James Watt). Nicht zu verwechseln: Joule (J) ist die Einheit der Energie, [Kilowattstunden](wiki:Kilowattstunde|Watt hour) (kWh) und Amperestunden (Ah) sind Mengen, keine Leistungen (NA204). Mit den Vorsätzen: $1\\,\\text{W} = 1000\\,\\text{mW}$, also $0{,}010\\,\\text{W} = 10\\,\\text{mW}$ (NA210, NA211).

Bei Gleichstrom ist die Leistung das Produkt aus Spannung und Strom:

$$P = U\\cdot I$$

Setzt man das [Ohmsche Gesetz](wiki:Ohmsches Gesetz|Ohm's law) ein ($U = R\\cdot I$ oder $I = U/R$), erhält man zwei weitere Formen — die du **alle drei** in der Formelsammlung findest:[^bnetza-formelsammlung]

$$P = U\\cdot I \\qquad P = \\frac{U^2}{R} \\qquad P = I^2\\cdot R$$

Praktisch: Kennst du **zwei** der Größen $U$, $I$, $R$, $P$, lässt sich jede andere berechnen. Welche Formel? Die, in der nur **eine unbekannte** Größe vorkommt.

| Gegeben | Gesucht | Formel |
|---|---|---|
| $U$, $I$ | $P$ | $P = U\\cdot I$ |
| $P$, $U$ | $I$ | $I = P/U$ |
| $P$, $R$ | $U$ | $U = \\sqrt{P\\cdot R}$ |
| $P$, $R$ | $I$ | $I = \\sqrt{P/R}$ |
| $U$, $P$ | $R$ | $R = U^2/P$ |
| $P$, $I$ | $R$ | $R = P/I^2$ |

**Beispiele:** Ein Transceiver nimmt bei 13,8 V und 1,5 A $P = 13{,}8\\,\\text{V}\\cdot1{,}5\\,\\text{A} = 20{,}7\\,\\text{W}$ auf (NB601). Ein Mobilgerät mit 100 W bei 12 V zieht $I = 100\\,\\text{W}/12\\,\\text{V} = 8{,}33\\,\\text{A}$ (NB604). Ein Leuchtmittel 12 V / 3 W braucht $3/12 = 0{,}25\\,\\text{A} = 250\\,\\text{mA}$ (NB605), bei 48 W sind es $4\\,\\text{A}$ (NB606). An einem Vorwiderstand mit 3,2 V und 20 mA gehen $3{,}2\\,\\text{V}\\cdot0{,}02\\,\\text{A} = 64\\,\\text{mW}$ in Wärme über (NB603), bei 50 V und 50 mA sind es 2,5 W (NB602).`,
    },
    {
      id: 'warn-leistung', type: 'callout', tone: 'warning', title: 'Wurzel-Fallen',
      md: `Bei $U = \\sqrt{P\\cdot R}$ und $I = \\sqrt{P/R}$ stolpern die meisten: Die falschen Katalogantworten vertauschen Produkt und Quotient ($U = \\sqrt{P/R}$) oder lassen die Wurzel weg ($U = R\\cdot P$). Eselsbrücke über die Einheiten: $\\sqrt{\\text{W}\\cdot\\Omega} = \\sqrt{\\text{V}^2} = \\text{V}$ ✓ — aber $\\sqrt{\\text{W}/\\Omega} = \\sqrt{\\text{A}^2} = \\text{A}$ (Strom!). Prüfungsbezug: EB504–EB506.`,
    },
    {
      id: 'calc-p', type: 'numeric', title: 'Leistung am Widerstand',
      question: 'An einem Widerstand von $220\\,\\Omega$ liegen $12\\,\\text{V}$ an. Wie viel Leistung setzt er um?',
      answer: 0.654, tolerance: 0.01, unit: 'W',
      hint: '$P = U^2/R$.',
      explain: '$P = (12\\,\\text{V})^2/220\\,\\Omega = 144/220\\,\\text{W} = 0{,}654\\,\\text{W}$ — ein ¼-W-Widerstand (0,25 W) wäre überlastet, ein 1-W-Typ genügt.',
    },
    {
      id: 'wechselspannung', type: 'text', title: 'Wechselspannung, Belastbarkeit und Grenzwerte',
      md: `
Die Leistungsformeln gelten auch bei **Wechselspannung** an einem rein ohmschen Widerstand — **wenn man mit Effektivwerten rechnet** (EB503). Der [[effektivwert]] ist ja gerade so definiert, dass er dieselbe Leistung liefert wie eine Gleichspannung. Mit den Spitzenwerten würde man die Leistung um den Faktor 2 zu hoch bekommen. Beispiele:

- 100 V (eff) an einer 50-Ω-Dummy-Load: $P = U^2/R = 10\\,000/50 = 200\\,\\text{W}$ (EB507).
- 2 A (eff) durch 50 Ω: $P = I^2\\cdot R = 4\\cdot50 = 200\\,\\text{W}$ (EB508).
- Oszilloskop zeigt $U_\\mathrm{SS} = 25\\,\\text{V}$ an 1000 Ω: $\\hat U = 12{,}5\\,\\text{V}$, $U_\\mathrm{eff} = 8{,}84\\,\\text{V}$, $I_\\mathrm{eff} = 8{,}8\\,\\text{mA}$ (EB513).

**Belastbarkeit.** Jeder Widerstand hat eine Nennleistung (z. B. 0,25 W, 1 W, 23 W); die in Wärme umgesetzte [Verlustleistung](wiki:Verlustleistung) darf sie nicht überschreiten, sonst verbrennt er ([Joulesche Wärme](wiki:Joulesche Wärme|Joule heating)). Zwei Fragen kommen immer wieder:

1. **Wie viel Leistung muss er aushalten?** 100 Ω mit 10 V: $P = 100/100 = 1\\,\\text{W}$ — mindestens ein 1-W-Typ (EB509).
2. **Wie viel Strom oder Spannung darf ich maximal anlegen?** 120 Ω, 23 W: $I = \\sqrt{23/120} = 0{,}438\\,\\text{A}$ (EB512). 10 kΩ, 1 W: $U = \\sqrt{1\\cdot10\\,000} = 100\\,\\text{V}$ (EB510).

Sind **zwei** Grenzen angegeben (Leistung **und** Spannungsfestigkeit), gilt die **kleinere** der beiden Spannungen: Beim 10-kΩ-Widerstand mit 700 V Festigkeit begrenzt schon die Leistung bei 100 V, beim 100-kΩ-Widerstand (6 W, 1000 V Festigkeit) ergibt $\\sqrt{6\\cdot10^5} = 775\\,\\text{V}$ und die Leistung ist wieder der engere Wert (EB511).

**Belastbarkeiten addieren sich bei gleichen Parallelwiderständen:** Jeder von $n$ gleichen Widerständen trägt $1/n$ der Leistung, also darf die Gruppe das $n$-fache einer Einzelbelastbarkeit aufnehmen. 11 parallele 560-Ω-Widerstände zu je 5 W ergeben $\\approx 50{,}9\\,\\Omega$ und 55 W (EB514) — eine gut belastbare Dummy Load.`,
    },
    {
      id: 'viz-budget', type: 'viz', viz: 'power-budget', title: 'Leistungsbilanz und Belastbarkeit',
      params: { u: 12, r: 100, kwh: 6 },
      task: 'Wähle für **12 V an 100 Ω** die **kleinste** Belastbarkeit, die nicht überlastet ist, und stelle im Energierechner die Zielenergie ein.',
    },
    {
      id: 'calc-umax', type: 'numeric', title: 'Höchste Gleichspannung',
      question: 'Ein Widerstand von $4{,}7\\,\\text{k}\\Omega$ ist mit **0,5 W** belastbar (Spannungsfestigkeit 350 V). Welche Gleichspannung darf höchstens angelegt werden?',
      answer: 48.5, tolerance: 0.5, unit: 'V',
      hint: '$U = \\sqrt{P\\cdot R}$; vergleiche mit der Spannungsfestigkeit und nimm den kleineren Wert.',
      explain: '$U = \\sqrt{0{,}5\\,\\text{W}\\cdot4700\\,\\Omega} = \\sqrt{2350} = 48{,}5\\,\\text{V}$ — deutlich unter den 350 V Spannungsfestigkeit, also begrenzt die Leistung.',
    },
    {
      id: 'calc-parallel', type: 'numeric', title: 'Dummy Load aus Parallelwiderständen',
      question: 'Eine Dummy Load besteht aus 8 parallel geschalteten Widerständen zu je 2 W. Wie viele Watt verträgt sie insgesamt?',
      answer: 16, tolerance: 0.1, unit: 'W',
      hint: 'Die Leistung verteilt sich gleichmäßig.',
      explain: '$8\\cdot2\\,\\text{W} = 16\\,\\text{W}$.',
    },
    {
      id: 'dezibel', type: 'text', title: 'Dezibel: Verhältnisse in Zehnerlogarithmen',
      md: `
In der Funktechnik ändern sich Leistungen um riesige Faktoren: Ein Empfänger verstärkt ein Signal um den Faktor 1 000 000 000 000, ein Koaxkabel verschluckt die Hälfte der Leistung, eine Antenne bündelt sie. Mit dem [Logarithmus](wiki:Logarithmus|Logarithm) („Anzahl der Nullen zählen“) wird daraus eine handliche Zahl: das **[Dezibel](wiki:Dezibel|Bel (unit))** (dB), der zehnte Teil eines Bel. Für ein **Leistungsverhältnis** gilt (Formelsammlung):

$$g = 10\\cdot\\log_{10}\\!\\left(\\frac{P_2}{P_1}\\right)\\,\\text{dB}$$

$P_1$ ist die Eingangs-, $P_2$ die Ausgangsleistung. Positive dB bedeuten **Verstärkung** (Gewinn), negative **Dämpfung**. Auf dem Taschenrechner nimmst du die Taste **log** (Basis 10), **nicht** ln.

**Das Merktabellchen für die Prüfung** (Leistungsfaktoren):

| dB | Leistung |
|---|---|
| 0 | 1 (unverändert) |
| 3 | **2** (Verdopplung) |
| 6 | 4 |
| 10 | **10** |
| 20 | 100 |
| −3 | 0,5 (Halbierung) |
| −10 | 0,1 |

Daraus folgt: 50 W → 100 W ist $10\\cdot\\log 2 \\approx 3\\,\\text{dB}$ (EA107). Eine Verdopplung ergibt **nicht** 6 dB (das ist Faktor 4) und nicht 1,5 dB. Dezibelwerte **addieren** sich bei hintereinander geschalteten Stufen: Verstärker +10 dB, Kabel −3 dB → insgesamt +7 dB. Ohne Taschenrechner: Endet der dB-Wert auf 0, gibt die Zahl vor der Null die Nullen des Faktors an: 30 dB ≙ 1000, 40 dB ≙ 10 000.

Später begegnen dir Zusätze wie **dBi** und **dBd** bei Antennen (Gewinn gegen Kugelstrahler bzw. Halbwellendipol, $g_\\mathrm{dBi} = g_\\mathrm{dBd} + 2{,}15\\,\\text{dB}$) sowie dBm und dBW (Leistung bezogen auf 1 mW bzw. 1 W).`,
    },
    {
      id: 'viz-db', type: 'viz', viz: 'db-lab', title: 'dB-Labor',
      params: { mode: 'convert' },
      task: 'Erreiche im Umrechner die drei Ziele (Leistung verdoppeln = +3 dB, Spannung verzehnfachen = +20 dB, Leistung auf ein Zehntel = −10 dB).',
    },
    {
      id: 'quiz-db', type: 'quiz', title: 'Dezibel im Kopf',
      question: 'Ein Endstufenverstärker erhöht die Leistung von 10 W auf 20 W. Wie viel Verstärkung ist das?',
      options: [
        { text: 'etwa 3 dB', correct: true, why: 'Verdopplung der Leistung = +3 dB.' },
        { text: 'etwa 6 dB', why: '6 dB wären Faktor 4 (10 W → 40 W).' },
        { text: 'etwa 10 dB', why: '10 dB wären Faktor 10 (10 W → 100 W).' },
        { text: 'etwa 1,5 dB', why: '1,5 dB entsprechen nur dem Faktor 1,41.' },
      ],
    },
    {
      id: 'calc-db', type: 'numeric', title: 'Dezibel berechnen',
      question: 'Ein Transceiver gibt 5 W ab; hinter dem Anpassgerät kommen 2,5 W an. Wie groß ist die Dämpfung in dB (negativer Wert = Dämpfung)?',
      answer: -3, tolerance: 0.1, unit: 'dB',
      hint: '$g = 10\\cdot\\log(P_2/P_1)$ mit $P_2/P_1 = 0{,}5$.',
      explain: '$10\\cdot\\log(0{,}5) = -3{,}01\\,\\text{dB}$ — die Hälfte der Leistung geht verloren.',
    },
    {
      id: 'match-formel', type: 'match', title: 'Gesucht → Formel',
      prompt: 'Welche Formel passt zur Aufgabe?',
      pairs: [
        ['Spannung aus Leistung und Widerstand', 'U = √(P·R)'],
        ['Strom aus Leistung und Widerstand', 'I = √(P/R)'],
        ['Widerstand aus Spannung und Leistung', 'R = U²/P'],
        ['Widerstand aus Leistung und Strom', 'R = P/I²'],
      ],
    },
    {
      id: 'mission-leistung', type: 'callout', tone: 'mission', title: 'Funkpraxis: Netzteil, Kabel, Dummy Load',
      md: `Ein 100-W-Transceiver zieht bei 13,8 V bei Vollast rund 20 A (der Wirkungsgrad der Endstufe liegt weit unter 100 %) — dein Netzteil muss das **dauerhaft** können, und dünne Leitungen werden warm ($P = I^2\\cdot R$: doppelter Strom, vierfache Wärme). Eine Dummy Load verträgt nur ihre Nennleistung, und zwar dauerhaft nur, wenn sie gekühlt wird. Und das Dezibel begegnet dir im Alltag ständig: Kabeldämpfung, Antennengewinn, S-Meter (je S-Stufe 6 dB). **Wirkungsgrad** $\\eta = P_\\mathrm{ab}/P_\\mathrm{zu}$: Was nicht als Nutzleistung herauskommt, bleibt als Verlustleistung (Wärme) im Gerät.`,
    },
    {
      id: 'recall-leistung', type: 'recall', title: 'In eigenen Worten',
      prompt: 'Ein 12-V-Gerät nimmt 36 W auf. Welcher Strom fließt, welche Leistung geht durch einen Vorwiderstand mit 6 V Spannungsabfall bei diesem Strom verloren, und was bedeutet „−3 dB“?',
      answer: 'Strom $I = P/U = 36\\,\\text{W}/12\\,\\text{V} = 3\\,\\text{A}$. Am Vorwiderstand: $P = U\\cdot I = 6\\,\\text{V}\\cdot3\\,\\text{A} = 18\\,\\text{W}$ Verlustleistung (Wärme). −3 dB bedeutet eine Dämpfung auf die Hälfte der Leistung (Faktor 0,5), +3 dB eine Verdopplung.',
      cards: ['lei-formeln', 'lei-db'],
    },
  ],
  cards: [
    { id: 'lei-formeln', front: 'Die drei Leistungsformeln?', back: '$P=U\\cdot I$, $P=\\dfrac{U^2}{R}$, $P=I^2\\cdot R$' },
    { id: 'lei-einheit', front: 'Einheit der Leistung? 1 W in mW?', back: 'Watt (W). 1 W = 1000 mW. (J = Energie, kWh/Ah = Mengen.)' },
    { id: 'lei-u', front: 'U aus P und R?', back: '$U=\\sqrt{P\\cdot R}$' },
    { id: 'lei-i', front: 'I aus P und R?', back: '$I=\\sqrt{P/R}$' },
    { id: 'lei-r', front: 'R aus U und P? R aus P und I?', back: '$R=U^2/P$ und $R=P/I^2$' },
    { id: 'lei-wechsel', front: 'Leistungsformeln bei Wechselspannung?', back: 'Gelten am ohmschen Widerstand, wenn man mit **Effektivwerten** rechnet.' },
    { id: 'lei-grenze', front: 'Zwei Grenzen (P und U_max): welche gilt?', back: 'Die **kleinere** Spannung: berechne $U=\\sqrt{P\\cdot R}$ und vergleiche mit der Spannungsfestigkeit.' },
    { id: 'lei-parallel', front: 'Belastbarkeit paralleler gleicher Widerstände?', back: 'Summe der Einzelbelastbarkeiten (11 × 5 W = 55 W).' },
    { id: 'lei-db', front: 'dB-Formel für Leistung?', back: '$g=10\\cdot\\log_{10}(P_2/P_1)$ dB — Taste log, nicht ln.' },
    { id: 'lei-3db', front: '3 dB, 6 dB, 10 dB, 20 dB als Leistungsfaktor?', back: '3 dB = 2, 6 dB = 4, 10 dB = 10, 20 dB = 100. Negative dB: Dämpfung (−3 dB = ½).' },
    { id: 'lei-dbadd', front: 'Mehrere Stufen in dB?', back: 'Dezibelwerte **addieren** sich (Verstärkung +, Dämpfung −).' },
    { id: 'lei-eta', front: 'Wirkungsgrad?', back: '$\\eta=P_\\mathrm{ab}/P_\\mathrm{zu}$; die Differenz ist Verlustleistung (Wärme).' },
  ],
};
