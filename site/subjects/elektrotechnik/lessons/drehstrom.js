export default {
  id: 'drehstrom',
  title: 'Dreiphasenwechselstrom, Stern und Dreieck',
  summary: 'Drei Wechselspannungen, je 120° gegeneinander verschoben: Warum die Steckdose 230 V und der Herd 400 V hat, wann der Neutralleiter stromlos bleibt und warum Motoren Drehstrom lieben.',
  minutes: 30,
  needs: ['sinus-wechselspannung', 'zeiger-impedanz'],
  goals: [
    'Die drei Phasen eines [[drehstrom|Drehstromsystems]] und ihren Versatz von 120° beschreiben',
    'Zwischen [[aussenleiter|Außenleiter-]] und Strangspannung unterscheiden und $U_L = \\sqrt{3}\\,U_\\text{Str}$ anwenden',
    '[[sternschaltung|Stern-]] und [[dreieckschaltung|Dreieckschaltung]] vergleichen und die Ströme bestimmen',
    'Erklären, warum der [[neutralleiter]] bei symmetrischer Last stromlos ist',
    'Die Drehstromleistung $P = \\sqrt{3}\\,U_L I_L \\cos\\varphi$ berechnen und die Adernfarben zuordnen',
  ],
  blocks: [
    {
      id: 'idee', type: 'text', title: 'Eine Phase pendelt, drei Phasen fließen',
      md: `
Eine einzelne [Wechselspannung](wiki:Wechselstrom|Alternating current) hat einen Schönheitsfehler: Die Momentanleistung pendelt mit der doppelten Netzfrequenz und geht sogar durch null. Ein Verbraucher wie ein Motor müsste dann ständig neu „anschieben".

Der Trick: Man baut den [[generator]] gleich mit **drei** um je 120° versetzten Wicklungen. Jede liefert eine [Sinusspannung](wiki:Sinus und Kosinus|Sine and cosine) gleicher Amplitude und Frequenz:

$$u_1 = \\hat u \\sin(\\omega t) \\qquad u_2 = \\hat u \\sin(\\omega t - 120°) \\qquad u_3 = \\hat u \\sin(\\omega t - 240°)$$

Das Ganze heißt [Drehstrom](wiki:Dreiphasenwechselstrom|Three-phase electric power) oder Dreiphasenwechselstrom.[^wiki-drehstrom-e8] Entwickelt wurde es Ende des 19. Jahrhunderts, unter anderem von [Michail Doliwo-Dobrowolski](wiki:Michail Ossipowitsch Doliwo-Dobrowolski|Mikhail Dolivo-Dobrovolsky) und im Umfeld von [Nikola Tesla](wiki:Nikola Tesla|Nikola Tesla); heute läuft das gesamte öffentliche [Stromnetz](wiki:Stromnetz|Electrical grid) damit.

Zwei Eigenschaften machen es so erfolgreich:

- **Die Summe der drei Spannungen ist zu jedem Zeitpunkt null.** Deshalb braucht man nicht sechs Leitungen (Hin und Zurück je Phase), sondern drei – oder vier mit Neutralleiter.
- **Die Gesamtleistung bei symmetrischer Last ist konstant**, nicht pendelnd. Das ergibt ein gleichmäßiges Drehmoment und – im nächsten Schritt – ein *rotierendes Magnetfeld*.`,
    },
    {
      id: 'video', type: 'video', youtube: 'q-Pf6tQ1qmA', label: 'Sternschaltung, Dreieckschaltung und Klemmbrett – Drehstrommotor', channel: '#Sogeht by Sven Stemmler', minutes: 5,
      why: 'Kurz (knapp 5 Minuten): Stern und Dreieck am Klemmbrett eines Motors. Das Video zeigt, wie dieselben Wicklungen je nach Brücken am Klemmbrett mit 400 V oder 230 V Strangspannung betrieben werden.',
    },
    {
      id: 'zeiger', type: 'text', title: 'Strangspannung und Außenleiterspannung',
      md: `
Man unterscheidet zwei Spannungen:

- **Strangspannung** $U_\\text{Str}$ (Phasenspannung): zwischen einem [Außenleiter](wiki:Außenleiter) (L1, L2, L3) und dem [Neutralleiter](wiki:Neutralleiter|Neutral wire) N – im Haushalt **230 V**.
- **Außenleiterspannung** $U_L$ (verkettete Spannung): zwischen zwei Außenleitern, z. B. L1–L2 – im Haushalt **400 V**.

Im [Zeigerdiagramm](wiki:Zeigerdiagramm|Phasor diagram) ist $U_{12} = U_1 - U_2$ die Verbindung der Spitzen von $U_2$ und $U_1$. Aus der Geometrie (gleichschenkliges Dreieck mit 120° Spitzenwinkel) folgt:

$$U_L = \\sqrt{3}\\;U_\\text{Str} \\qquad\\text{also}\\qquad 230\\,\\text{V}\\cdot\\sqrt{3} \\approx 400\\,\\text{V}$$

Die Wurzel aus drei ([$\\sqrt{3}\\approx 1{,}732$](wiki:Quadratwurzel aus 3|Square root of 3)) steckt in allen Drehstromformeln. Die genaue Netzspannung beträgt 230 V ± 10 %, die „400 V" sind also gerundet – gerechnet wird mit den Nennwerten.`,
    },
    {
      id: 'stern-dreieck', type: 'text', title: 'Stern oder Dreieck?',
      md: `
Drei gleiche Verbraucher (oder drei Motorwicklungen, sogenannte **Stränge**) lassen sich auf zwei Arten verschalten:

**[Sternschaltung](wiki:Sternschaltung):** Je ein Ende der Stränge liegt am gemeinsamen [Sternpunkt](wiki:Sternpunkt) (dort hängt der Neutralleiter), die anderen drei Enden an L1, L2, L3. Jeder Strang bekommt $U_\\text{Str}$, der Leiterstrom ist gleich dem Strangstrom: $I_L = I_\\text{Str}$.

**[Dreieckschaltung](wiki:Dreieckschaltung):** Die Stränge bilden einen Ring, jeder liegt zwischen zwei Außenleitern. Jeder Strang bekommt die volle Außenleiterspannung $U_\\text{Str} = U_L$. In jedem Leiter fließt die (vektorielle) Differenz zweier Strangströme:

$$I_L = \\sqrt{3}\\;I_\\text{Str}\\qquad\\text{(Dreieck)}$$

Derselbe Verbraucher nimmt im Dreieck die **dreifache Leistung** auf wie im Stern, denn er liegt an $\\sqrt{3}$-facher Spannung (Faktor 3 in $U^2/R$). Bei Motoren nutzt man das für die **Stern-Dreieck-Anlaufschaltung**: Anlauf im Stern (ein Drittel Strom), danach Umschalten auf Dreieck.

Alle Drehstrom-Verbraucher können den Neutralleiter weglassen, wenn die Last gleichmäßig ist: Dann ist der Neutralleiterstrom null – das zeigt die Demo.`,
    },
    {
      id: 'viz-lab', type: 'viz', viz: 'three-phase-lab', title: 'Drehstrom-Labor',
      intro: 'Drei Phasen, Zeigerbild, Stern/Dreieck. Last je Strang: 23 Ω (bei 230 V also 10 A).',
      params: { R: 23 },
      task: 'Erreiche alle vier Ziele: **U_L bei 230 V ablesen**, mit **Schieflast** einen Neutralleiterstrom erzeugen, die Schieflast wieder auf 0 % stellen (I_N = 0) und im **Dreieck** die dreifache Leistung messen. Beobachte die rote gestrichelte Summenkurve $u_1+u_2+u_3$.',
    },
    {
      id: 'calc-ul', type: 'numeric', title: 'Außenleiterspannung',
      question: 'Die Strangspannung beträgt $U_\\text{Str} = 230\\,\\text{V}$. Wie groß ist die Außenleiterspannung $U_L$?',
      answer: 398, tolerance: 2, unit: 'V',
      hint: '$U_L = \\sqrt{3}\\cdot U_\\text{Str}$',
      explain: '$230\\,\\text{V}\\cdot 1{,}732 = 398{,}4\\,\\text{V} \\approx 400\\,\\text{V}$. Die Nennspannung 400 V ergibt sich aus der gerundeten Rechnung.',
    },
    {
      id: 'calc-p', type: 'numeric', title: 'Drehstromleistung',
      question: 'Ein Drehstrommotor am 400-V-Netz nimmt $I_L = 10\\,\\text{A}$ bei $\\cos\\varphi = 0{,}85$ auf. Wie groß ist die Wirkleistung in kW?',
      answer: 5.89, tolerance: 0.05, unit: 'kW',
      hint: '$P = \\sqrt{3}\\cdot U_L\\cdot I_L\\cdot\\cos\\varphi$',
      explain: '$P = 1{,}732\\cdot 400\\,\\text{V}\\cdot 10\\,\\text{A}\\cdot 0{,}85 = 5{,}89\\,\\text{kW}$. Der Faktor $\\cos\\varphi$ ist der [Leistungsfaktor](wiki:Leistungsfaktor|Power factor) (Wirkleistung zu Scheinleistung).',
    },
    {
      id: 'calc-idelta', type: 'numeric', title: 'Strom in der Dreieckschaltung',
      question: 'In jedem Strang einer Dreieckschaltung fließen $I_\\text{Str} = 10\\,\\text{A}$. Wie groß ist der Strom $I_L$ in jedem Außenleiter?',
      answer: 17.3, tolerance: 0.2, unit: 'A',
      hint: 'Im Dreieck gilt $I_L = \\sqrt{3}\\cdot I_\\text{Str}$.',
      explain: '$10\\,\\text{A}\\cdot 1{,}732 = 17{,}3\\,\\text{A}$. Die Ströme der beiden Stränge an einem Knoten addieren sich *vektoriell* (120° Versatz), nicht arithmetisch (20 A).',
    },
    {
      id: 'quiz-summe', type: 'quiz', title: 'Summe der Phasen',
      question: 'Wie groß ist die Summe dreier um 120° verschobener Sinusspannungen gleicher Amplitude zu jedem Zeitpunkt?',
      options: [
        { text: 'Null', correct: true, why: 'Die drei Zeiger bilden einen gleichseitigen Stern; ihre Vektorsumme verschwindet. Deshalb ist der Neutralleiter bei Gleichlast stromlos.' },
        { text: 'Das Dreifache einer Einzelspannung', correct: false, why: 'Das wäre bei drei *gleichphasigen* Spannungen so, nicht bei 120° Versatz.' },
        { text: 'Das $\\sqrt{3}$-fache einer Einzelspannung', correct: false, why: 'Das gilt für die Differenz zweier Phasen ($U_L$), nicht für die Summe aller drei.' },
        { text: 'Sie pendelt mit der Netzfrequenz', correct: false, why: 'Auch die Summe von Sinusspannungen mit Versatz 0°, 120°, 240° bleibt konstant – und zwar bei null.' },
      ],
    },
    {
      id: 'quiz-neutral', type: 'quiz', title: 'Vier Leiter, drei belastet?',
      question: 'Ein Haushalt hat drei Außenleiter und einen Neutralleiter. Welche Aussagen stimmen?',
      options: [
        { text: 'Bei gleich belasteten Außenleitern fließt im Neutralleiter kein Strom.', correct: true, why: 'Die drei gleich großen, um 120° versetzten Ströme addieren sich zu null.' },
        { text: 'Bei Schieflast fließt die vektorielle Summe der Außenleiterströme im Neutralleiter zurück.', correct: true, why: 'Nach der Knotenregel muss $I_N = -(I_1+I_2+I_3)$ sein.' },
        { text: 'Der Neutralleiter führt immer den Summenstrom aller drei Außenleiter (arithmetisch addiert).', correct: false, why: 'Falsch: Die Ströme sind phasenverschoben, die Addition ist vektoriell. Bei gleichen Strömen ergibt sich sogar null.' },
        { text: 'Ein Drehstrommotor braucht keinen Neutralleiter.', correct: true, why: 'Die drei Wicklungen sind gleich; ihre Ströme addieren sich zu null. Motoren werden daher nur mit drei Außenleitern (plus Schutzleiter) angeschlossen.' },
      ],
    },
    {
      id: 'match-farben', type: 'match', title: 'Adernfarben',
      prompt: 'Ordne jedem Leiter seine normgerechte Aderfarbe zu.',
      pairs: [['Außenleiter L1', 'braun'], ['Außenleiter L2', 'schwarz'], ['Außenleiter L3', 'grau'], ['Neutralleiter N', 'blau'], ['Schutzleiter PE', 'grün-gelb']],
    },
    {
      id: 'mission-pruefung', type: 'callout', tone: 'mission', title: 'Prüfung und Funkpraxis',
      md: `
Das Funkgeräte-Netzteil hängt an 230 V – ein einzelner Außenleiter gegen N. Den **Adernfarben** begegnest du aber spätestens beim Anschließen eines Verlängerungskabels oder einer Verteilerdose; die Prüfung fragt sie direkt ab (Katalog **EK205**: grüngelb, braun, blau bei dreiadrigen Leitungen).[^bnetza-katalog-e8] Drehstrom selbst wird nicht geprüft; er erklärt aber, warum Generatoren, Motoren und das Stromnetz so gebaut sind, und liefert die Brücke zum Drehfeld der nächsten Lektion.`,
    },
    {
      id: 'warning-vier', type: 'callout', tone: 'warning', title: 'Typische Fehlvorstellung',
      md: `
„Drehstrom hat vier gleich belastete Leiter." – Nein: Es sind **drei** Außenleiter plus N. Der Neutralleiter ist bei symmetrischer Last **stromlos**, er führt nur den Ausgleich bei Schieflast. Ebenso falsch: „400 V liegen zwischen Außenleiter und Erde" – das sind 230 V; 400 V liegen zwischen zwei Außenleitern.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>Deutsch</th><th>English</th><th>Notiz</th></tr>
<tr><td>Drehstrom / Dreiphasenwechselstrom</td><td>three-phase power</td><td>L1, L2, L3</td></tr>
<tr><td>Außenleiter (früher „Phase")</td><td>line conductor, phase</td><td>$U_L$ zwischen zwei Außenleitern</td></tr>
<tr><td>Strangspannung</td><td>phase voltage</td><td>Außenleiter–Neutralleiter</td></tr>
<tr><td>Außenleiterspannung</td><td>line-to-line voltage</td><td>$\\sqrt{3}\\cdot U_\\text{Str}$</td></tr>
<tr><td>Sternpunkt</td><td>star point, neutral point</td><td></td></tr>
<tr><td>Sternschaltung / Dreieckschaltung</td><td>star (wye) / delta connection</td><td>Y / Δ</td></tr>
<tr><td>Schieflast</td><td>unbalanced load</td><td>$I_N\\neq 0$</td></tr></table>`,
    },
    {
      id: 'recall-neutral', type: 'recall', title: 'Erkläre es in eigenen Worten',
      prompt: 'Warum ist der Neutralleiter bei symmetrischer Last stromlos? Und was ändert sich bei Schieflast? Antworte in 2–4 Sätzen.',
      answer: 'Die drei Phasenströme haben gleichen Betrag und sind um 120° gegeneinander verschoben. Ihre Vektorsumme ist null (im Zeigerbild ein geschlossenes gleichseitiges Dreieck). Nach der Knotenregel muss der Neutralleiter genau diese Summe zurückführen – also null. Bei Schieflast sind die Beträge verschieden, die Summe ist nicht mehr null, und der Differenzstrom fließt über N.',
      hints: ['Knotenregel am Sternpunkt: Σ Ströme = 0', 'Wie sieht die Summe dreier gleich langer Zeiger mit 120° Versatz aus?'],
      cards: ['summe-null', 'neutral-strom'],
    },
    {
      id: 'deep-leistung', type: 'callout', tone: 'deep', title: 'Warum die Leistung konstant ist',
      md: `
Bei einer Phase gilt $p(t) = u\\cdot i = \\hat u\\hat i\\,\\sin^2(\\omega t) = \\tfrac12\\hat u\\hat i\\,(1-\\cos 2\\omega t)$ – sie pendelt mit der doppelten Frequenz. Addiert man die drei Phasen (Cosinus-Terme mit $2\\omega t$, $2\\omega t-240°$ und $2\\omega t-480°$), heben sich diese Anteile auf, und es bleibt

$$p_\\text{ges} = \\tfrac32\\,\\hat u\\hat i = 3\\,U_\\text{Str} I_\\text{Str} = \\sqrt{3}\\,U_L I_L$$

für ohmsche Last. Bei Phasenverschiebung $\\varphi$ ergibt sich der Faktor $\\cos\\varphi$ – die bekannte Formel $P=\\sqrt{3}U_LI_L\\cos\\varphi$.`,
    },
  ],
  cards: [
    { id: 'phasen', front: 'Phasenversatz der drei Außenleiter L1, L2, L3?', back: '120° (eine Drittelperiode, 6,67 ms bei 50 Hz).' },
    { id: 'ul-ustr', front: 'Zusammenhang Außenleiter- und Strangspannung (Stern)?', back: '$U_L = \\sqrt{3}\\,U_\\text{Str}$, z. B. 230 V → 400 V.' },
    { id: 'stern', front: 'Sternschaltung: Spannung und Strom im Strang?', back: 'Strang liegt an $U_\\text{Str} = U_L/\\sqrt{3}$; $I_L = I_\\text{Str}$.' },
    { id: 'dreieck', front: 'Dreieckschaltung: Spannung und Strom im Strang?', back: 'Strang liegt an $U_L$; $I_L = \\sqrt{3}\\,I_\\text{Str}$.' },
    { id: 'stern-dreieck-p', front: 'Welche Leistung nimmt derselbe Verbraucher im Dreieck gegenüber dem Stern auf?', back: 'Das Dreifache ($U^2/R$ mit $\\sqrt{3}$-facher Spannung).' },
    { id: 'drehstrom-p', front: 'Wirkleistung im Drehstromnetz (symmetrische Last)?', back: '$P = \\sqrt{3}\\,U_L I_L \\cos\\varphi$' },
    { id: 'summe-null', front: 'Summe dreier Phasenspannungen (gleiche Amplitude, 120°)?', back: 'Zu jedem Zeitpunkt null.' },
    { id: 'neutral-strom', front: 'Wann ist der Neutralleiter stromlos?', back: 'Bei symmetrischer Last (gleiche Ströme der drei Außenleiter). Bei Schieflast fließt $I_N = -(I_1+I_2+I_3)$ (vektoriell).' },
    { id: 'adernfarben', front: 'Adernfarben: L1/L2/L3, N, PE?', back: 'L1 braun, L2 schwarz, L3 grau, N blau, PE grün-gelb.' },
    { id: 'dreh-vorteil', front: 'Zwei Vorteile von Drehstrom gegenüber Einphasen-Wechselstrom?', back: 'Konstante Leistung/gleichmäßiges Drehmoment (Drehfeld) und weniger Leitungen/Leitermaterial für dieselbe Leistung.' },
  ],
};
