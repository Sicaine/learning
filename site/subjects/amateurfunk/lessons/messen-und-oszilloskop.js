export default {
  id: 'messen-und-oszilloskop',
  title: 'Messen: Strom, Spannung, Effektiv-/Spitzenwert, Oszilloskop',
  summary: 'Spannungs- und Strommessgeräte richtig anschließen und ablesen, Spitzen-, Spitze-Spitze- und Effektivwert einer Sinusspannung umrechnen, Periodendauer und Frequenz am Oszilloskop-Bild bestimmen.',
  minutes: 25,
  goals: [
    'Spannungsmesser **parallel und hochohmig**, Strommesser **in Reihe und niederohmig** anschließen',
    'Zeigerinstrumente mit Messbereich und passender Skala ablesen',
    '$\\hat U$, $U_\\mathrm{SS}$ und $U_\\mathrm{eff}$ einer sinusförmigen Spannung ineinander umrechnen (230 V → 325 V → 651 V)',
    'Aus dem Oszilloskop-Bild (Skalenteile × Zeit/Div) die Periodendauer $T$ und mit $f = 1/T$ die Frequenz bestimmen',
  ],
  needs: ['elektrotechnik/messen-gleichstrom', 'elektrotechnik/signalformen-effektivwert'],
  blocks: [
    {
      id: 'anschluss', type: 'text', title: 'Spannung parallel, Strom in Reihe',
      md: `
Messen verändert die Schaltung — und das soll es möglichst wenig. Deshalb haben die beiden Messgerätearten **entgegengesetzte** Eigenschaften.[^darc-50ohm] Beide haben im Schaltzeichen einen Kreis, der Buchstabe sagt, was gemessen wird: **V** für das Spannungsmessgerät, **A** für das Strommessgerät (NI101, NI102).

| | Spannungsmesser (V) | Strommesser (A) |
|---|---|---|
| Anschluss | **parallel** zum Messobjekt (zwischen zwei Punkte) | **in Reihe** (der Stromkreis wird aufgetrennt, der Strom fließt durchs Gerät) |
| Innenwiderstand | **hochohmig** (idealerweise unendlich) | **niederohmig** (idealerweise 0 Ω) |
| Warum? | Es soll kein Strom über den Parallelzweig abfließen und die Spannung verfälschen | Das Gerät soll den Strom nicht durch zusätzlichen Widerstand begrenzen |

Beim [Multimeter](wiki:Multimeter|Multimeter) wählst du Messart und Messbereich am Drehschalter und steckst die Prüfspitzen in die zur Messart gehörenden Buchsen. Ein Strommesser **parallel** an eine Quelle geschaltet ist praktisch ein Kurzschluss (Sicherung im Gerät, oft Schaden an der Quelle). Aus dem Prüfungskatalog: Die Batteriespannung im laufenden Betrieb misst du mit dem Voltmeter **direkt an den Batterieklemmen** (parallel); den Strom durch Widerstand und LED misst du, indem du das Amperemeter **in die Leitung** schaltest (NI103, NI104).

**Widerstand bestimmen (Ohmsches Gesetz):** Um $R = U/I$ aus Messwerten zu bekommen, brauchst du beides: ein Amperemeter in Reihe mit dem Widerstand und ein Voltmeter parallel **am Widerstand** (EI102).`,
    },
    {
      id: 'warn-anschluss', type: 'callout', tone: 'warning', title: 'Die vier Antworten, die immer wieder auftauchen',
      md: `Der Katalog kombiniert „parallel/in Reihe“ mit „hochohmig/niederohmig“ in allen vier Varianten. Nur **eine** Paarung ist richtig: *Spannungsmesser: parallel, hochohmig.* Merke dir die Logik statt der Paare: Ein Voltmeter darf **keinen Strom ziehen** (= hoher Widerstand), ein Amperemeter darf **keinen Spannungsabfall** erzeugen (= niedriger Widerstand). Prüfungsbezug: EI101.`,
    },
    {
      id: 'viz-multimeter', type: 'viz', viz: 'multimeter-trainer', title: 'Virtuelles Multimeter',
      params: { need: 4 },
      task: 'Miss **vier Größen** richtig: Messart, Buchse und Messbereich wählen und die Prüfspitzen an die richtigen Punkte setzen. Falsch angeschlossen brennt dir die Sicherung durch.',
    },
    {
      id: 'quellen', type: 'text', title: 'Spannungsquellen in Reihe',
      md: `
Zwei [Spannungsquellen](wiki:Spannungsquelle|Voltage source) in einer Schleife mit einem Voltmeter: Die Spannungen **addieren sich**, wenn beide Quellen in dieselbe Richtung zeigen (Pluspol der einen am Minuspol der anderen — im Schaltzeichen: gleiche Orientierung der langen/kurzen Striche). Zeigen sie **gegeneinander**, **subtrahieren** sie sich. Zwei gleiche Zellen mit je 1,5 V ergeben also **3 V** (gleichsinnig) oder **0 V** (gegensinnig, NB205, NB206). Die falschen Antworten 1,5 V oder 2,25 V sind Rechenfehler: Es gibt keinen Mittelwert, sondern nur Summe oder Differenz.`,
    },
    {
      id: 'quiz-quellen', type: 'quiz', title: 'Zwei Batterien',
      question: 'Zwei Batterien mit je 4,5 V sind in Reihe geschaltet; die zweite ist **verkehrt herum** (Minus an Minus) eingesetzt. Was zeigt ein Voltmeter über beide an?',
      options: [
        { text: '0 V', correct: true, why: 'Gegensinnig geschaltete Quellen subtrahieren sich: 4,5 V − 4,5 V = 0 V.' },
        { text: '9 V', why: 'Das wäre die Summe bei gleichsinniger Reihenschaltung.' },
        { text: '4,5 V', why: 'Die Spannung einer einzelnen Batterie, es gibt aber keinen „Mittelwert“.' },
        { text: '−9 V', why: 'Beide heben sich auf, es ergibt sich keine doppelte Gegenspannung.' },
      ],
    },
    {
      id: 'zeiger', type: 'text', title: 'Zeigerinstrumente ablesen',
      md: `
[Zeigerinstrumente](wiki:Drehspulmesswerk) findest du im Funkamateur-Alltag noch häufig: im Multimeter, im SWR-Meter, als S-Meter. Auf der Frontplatte sitzen oft **zwei Skalen**, z. B. 0–100 und 0–30. Der **Messbereich** am Schalter bestimmt, wie du umrechnest: Bei 10 V gilt die Skala 0–100 (Vollausschlag 100 Teilstriche = 10 V, also Teilstrich ÷ 10). Bei 300 V nimmst du die Skala 0–30 und multiplizierst mit 10. Zeigt das Instrument 29 auf der 0–100-Skala bei 10 V Bereich, sind es **2,9 V**; 8,8 auf der 0–30-Skala bei 300 V Bereich sind **88 V** (EI103, EI104). Typische falsche Antworten sind genau die um den Faktor 10 verschobenen Werte (29 V, 8,8 V, 88 V, 290 V): erst die passende Skala, dann das Verhältnis Bereich/Skalenendwert.`,
    },
    {
      id: 'viz-zeiger', type: 'viz', viz: 'zeigerinstrument-trainer', title: 'Zeigerinstrument-Ablesetrainer',
      params: { need: 4 },
      task: 'Lies **vier Messwerte in Folge** richtig ab (Toleranz etwa ein Teilstrich).',
    },
    {
      id: 'sinus', type: 'text', title: 'Sinusspannung: Spitzenwert, Spitze-Spitze, Effektivwert',
      md: `
Eine sinusförmige [Wechselspannung](wiki:Wechselspannung) ändert ständig ihren Wert. Drei Kenngrößen beschreiben sie (Formelzeichen wie in der Formelsammlung):[^bnetza-formelsammlung]

- **Spitzenwert** $\\hat U$: der größte Betrag über der Nulllinie (auch Scheitelwert, vgl. [Scheitelwert](wiki:Spitzenwert|Amplitude#Peak amplitude)),
- **Spitze-Spitze-Wert** $U_\\mathrm{SS}$: von der negativen zur positiven Spitze, also $U_\\mathrm{SS} = 2\\cdot\\hat U$,
- **Effektivwert** $U_\\mathrm{eff}$: derjenige Gleichspannungswert, der an einem Widerstand **dieselbe Leistung** umsetzt.

Für den Sinus gilt der Zusammenhang

$$U_\\mathrm{eff} = \\frac{\\hat U}{\\sqrt{2}} \\approx 0{,}707\\cdot\\hat U \\qquad \\hat U = \\sqrt{2}\\cdot U_\\mathrm{eff} \\approx 1{,}414\\cdot U_\\mathrm{eff}$$

(vgl. [Effektivwert](wiki:Effektivwert)). Beispiele aus der Prüfung:

| Gegeben | Rechnung | Ergebnis |
|---|---|---|
| Netz 230 V (eff) | $\\hat U = 230\\,\\text{V}\\cdot\\sqrt 2$ | **325 V** |
| Netz, Spitze-Spitze | $U_\\mathrm{SS} = 2\\cdot 325\\,\\text{V}$ | **651 V** |
| 12 V eff, Spitze-Spitze? | $U_\\mathrm{SS} = 2\\sqrt2\\cdot 12\\,\\text{V}$ | **≈ 34 V** |
| 12 V Spitze, Effektivwert? | $12\\,\\text{V}/\\sqrt 2$ | **≈ 8,5 V** |

Ein Diagramm mit einem Sinus der Amplitude 1 V entspricht in der Leistung einer Gleichspannung von **±0,7 V** (EB405): Der Effektivwert $0{,}707\\cdot\\hat U$ ist die Gleichspannung gleicher Wirkung. Die Werte 1 V, 0,5 V oder 0 V verfehlen sie.

> **Merke:** „230 V“ ist immer der **Effektivwert**. Der Sinus der Steckdose pendelt tatsächlich zwischen +325 V und −325 V. Das Gerät muss diese Spitzen aushalten, der Strom heizt aber wie ein Gleichstrom von 230 V.`,
    },
    {
      id: 'warn-sinus', type: 'callout', tone: 'warning', title: 'Nicht Faktor 2 und nicht Faktor 1,41 vertauschen',
      md: `Die Katalogfallen: 163 V (= 230 V/√2 — das wäre „rückwärts“ gerechnet), 460 V (= 2 · 230 V) und 650 V (nahe am Spitze-Spitze-Wert von 651 V, aber Spitzenwert ist die Hälfte). Prüfe jedes Ergebnis: Der **Spitzenwert** ist **immer größer** als der Effektivwert (Faktor 1,41), der **Spitze-Spitze-Wert** noch einmal doppelt so groß (Faktor 2,83). Prüfungsbezug: EB401–EB404.`,
    },
    {
      id: 'calc-ueff', type: 'numeric', title: 'Spitze-Spitze aus Effektivwert',
      question: 'Ein Funkgerät-Netzteil liefert an der Sekundärseite 15 V Wechselspannung (Effektivwert). Wie groß ist der Spitze-Spitze-Wert?',
      answer: 42.4, tolerance: 0.5, unit: 'V',
      hint: '$U_\\mathrm{SS} = 2\\sqrt2\\cdot U_\\mathrm{eff}$; $2\\sqrt2\\approx 2{,}83$.',
      explain: '$U_\\mathrm{SS} = 2\\cdot\\sqrt{2}\\cdot15\\,\\text{V} = 42{,}4\\,\\text{V}$. Der Spitzenwert beträgt 21,2 V.',
    },
    {
      id: 'calc-uspitze', type: 'numeric', title: 'Effektivwert aus Spitzenwert',
      question: 'Ein Messsender gibt eine Sinusspannung mit Spitzenwert 2 V ab. Wie groß ist der Effektivwert?',
      answer: 1.41, tolerance: 0.02, unit: 'V',
      hint: 'Teile den Spitzenwert durch $\\sqrt2$.',
      explain: '$U_\\mathrm{eff} = 2\\,\\text{V}/\\sqrt2 = 1{,}41\\,\\text{V}$.',
    },
    {
      id: 'oszi', type: 'text', title: 'Oszilloskop: Spannung über der Zeit',
      md: `
Ein [Oszilloskop](wiki:Oszilloskop|Oscilloscope) ist ein **Spannungsmesser mit hohem Innenwiderstand**, der den **zeitlichen Verlauf** der Spannung zeigt. Der Bildschirm ist ein Raster aus Kästchen („Skalenteile“, **Div**ision). Zwei Drehknöpfe legen den Maßstab fest:

- **Zeitbasis** (Zeit pro Skalenteil, z. B. 0,5 ms/Div) — waagerecht,
- **Ablenkung** (Spannung pro Skalenteil, z. B. 500 mV/Div) — senkrecht.

**Ablesen** heißt abzählen und mit dem Maßstab multiplizieren:
1. **[Periodendauer](wiki:Periodendauer) $T$:** Skalenteile für eine volle Schwingung zählen (von Nulldurchgang zu Nulldurchgang gleicher Richtung), mal Zeit/Div. Beispiel: 8 Teile · 0,5 ms = **4 ms** (EI301).
2. **[Frequenz](wiki:Frequenz|Frequency):** $f = \\dfrac{1}{T}$. Aus 4 ms folgt $f = 1/0{,}004\\,\\text{s} = 250\\,\\text{Hz}$ (EI302).
3. **Spitze-Spitze-Spannung** $U_\\mathrm{SS}$: Skalenteile von Tal zu Gipfel zählen, mal Spannung/Div. Beispiel: 6 Teile · 2 V/Div = 12 V (EB406).
4. **Impulsdauer:** Skalenteile eines Impulses · Zeit/Div (EI303: 200 µs).

Die Umrechnung zwischen Periodendauer und Frequenz kommt in jedem Bild vor: 50 µs ↔ 20 kHz (EB408); 12 µs ↔ 83,3 kHz (EB409); 120 ns ↔ 8,33 MHz (EB411); 20 ms ↔ 50 Hz (EB410). Faustregel: **1 µs ↔ 1 MHz**, 1 ms ↔ 1 kHz, 1 ns ↔ 1 GHz. Die Falschantworten sind meist um Zehnerpotenzen daneben — rechne die Größenordnung nach.

Eine Spezialität im Funkbetrieb: Mit dem Oszilloskop **erkennt man NF-Verzerrungen** sichtbar (abgeflachte Spitzen bei Übersteuerung). Ein Transistorvoltmeter, ein Vielfachmessgerät oder ein Frequenzzähler zeigen nur einen Zahlenwert, nicht die Kurvenform (EI304). Mit dem Oszilloskop lässt sich also auch der Sendebetrieb beurteilen (z. B. übersteuerte SSB-Modulation: „flat-topping“).`,
    },
    {
      id: 'viz-scope', type: 'viz', viz: 'scope-reader', title: 'Oszilloskop-Ablesen',
      params: { mode: 'read', rounds: 5 },
      task: 'Lies von **fünf** Oszillogrammen Frequenz und Spitze-Spitze-Spannung ab: Skalenteile zählen, mit Zeit/Div und Volt/Div multiplizieren, $f = 1/T$ rechnen.',
    },
    {
      id: 'calc-freq', type: 'numeric', title: 'Frequenz aus der Periodendauer',
      question: 'Auf dem Oszilloskop (Zeitbasis 2 µs/Div) belegt eine volle Schwingung 6 Skalenteile. Welche Frequenz hat das Signal?',
      answer: 83.3, tolerance: 1, unit: 'kHz',
      hint: '$T = 6\\cdot2\\,\\mu\\text{s}$, dann $f = 1/T$.',
      explain: '$T = 12\\,\\mu\\text{s}$, $f = 1/(12\\cdot10^{-6}\\,\\text{s}) = 83{,}3\\,\\text{kHz}$.',
    },
    {
      id: 'match-geraete', type: 'match', title: 'Messaufgabe → Gerät',
      prompt: 'Welches Messgerät passt?',
      pairs: [
        ['Batteriespannung im Betrieb messen', 'Voltmeter parallel an die Klemmen'],
        ['Strom durch eine LED messen', 'Amperemeter in Reihe in die Leitung'],
        ['Verzerrung eines NF-Signals sichtbar machen', 'Oszilloskop'],
        ['Widerstand aus Messwerten bestimmen', 'Voltmeter parallel + Amperemeter in Reihe'],
      ],
    },
    {
      id: 'mission-messen', type: 'callout', tone: 'mission', title: 'Funkpraxis: Messen im Shack',
      md: `Das Multimeter ist dein wichtigstes Werkzeug: Akkuspannung prüfen, Netzteil messen, Durchgang einer Leitung testen. Wichtig ist, die **Messart** zu prüfen, bevor du an die Schaltung gehst — ein vergessenes „A“ am Drehschalter, während du die Netzspannung misst, ist ein Klassiker. Das Oszilloskop siehst du erst später, aber dann zeigt es dir sofort, ob dein Mikrofonsignal übersteuert (abgeflachte Sinus-Spitzen) oder dein Oszillator sauber schwingt.`,
    },
    {
      id: 'recall-messen', type: 'recall', title: 'In eigenen Worten',
      prompt: 'Wie schließt du Spannungs- und Strommesser an, welchen Innenwiderstand haben sie und warum? Wie kommst du bei der 230-V-Steckdose vom Effektivwert auf den Spitze-Spitze-Wert?',
      answer: 'Der Spannungsmesser liegt parallel zum Messobjekt und muss hochohmig sein, damit er kaum Strom zieht und die Schaltung nicht beeinflusst. Der Strommesser liegt in Reihe im aufgetrennten Stromkreis und muss niederohmig sein, damit er keinen merklichen Spannungsabfall verursacht. 230 V ist der Effektivwert; der Spitzenwert ist 230 V · √2 ≈ 325 V, der Spitze-Spitze-Wert das Doppelte, also etwa 651 V.',
      cards: ['mes-anschluss', 'mes-sinus'],
    },
  ],
  cards: [
    { id: 'mes-anschluss', front: 'Spannungsmesser: Anschluss und Innenwiderstand?', back: '**Parallel** zum Messobjekt, **hochohmig**.' },
    { id: 'mes-strom', front: 'Strommesser: Anschluss und Innenwiderstand?', back: '**In Reihe** (Kreis auftrennen), **niederohmig**.' },
    { id: 'mes-sinus', front: 'Sinus: Û, U_SS, U_eff?', back: '$U_\\mathrm{eff}=\\hat U/\\sqrt2\\approx0{,}707\\,\\hat U$; $U_\\mathrm{SS}=2\\hat U$.' },
    { id: 'mes-230', front: '230 V Netz: Spitzenwert und Spitze-Spitze?', back: 'Spitzenwert **325 V**, Spitze-Spitze **651 V** (230 V ist der Effektivwert).' },
    { id: 'mes-eff', front: 'Was ist der Effektivwert?', back: 'Gleichspannung, die an einem Widerstand dieselbe Leistung umsetzt wie die Wechselspannung.' },
    { id: 'mes-fT', front: 'Zusammenhang Frequenz und Periodendauer?', back: '$f=1/T$ bzw. $T=1/f$. 1 µs ↔ 1 MHz, 1 ms ↔ 1 kHz.' },
    { id: 'mes-50us', front: '50 µs ≙ ? Hz', back: '$1/50\\,\\mu\\text{s}=20\\,\\text{kHz}$.' },
    { id: 'mes-abl', front: 'Oszilloskop ablesen?', back: 'Skalenteile zählen · Zeit/Div (waagerecht, T) bzw. Volt/Div (senkrecht, U_SS). Dann $f=1/T$.' },
    { id: 'mes-verz', front: 'Welches Gerät zeigt NF-Verzerrungen?', back: 'Das **Oszilloskop** (zeigt die Kurvenform; Multimeter/Frequenzzähler zeigen nur Zahlen).' },
    { id: 'mes-quellen', front: 'Zwei 1,5-V-Zellen in Reihe?', back: 'Gleichsinnig 3 V (Summe), gegensinnig 0 V (Differenz).' },
    { id: 'mes-zeiger', front: 'Zeigerinstrument ablesen: Vorgehen?', back: 'Skala wählen, die zum Messbereich passt; Messwert = Skalenwert · Bereich/Skalenendwert.' },
    { id: 'mes-ohm', front: 'Widerstand messen nach Ohm?', back: 'Voltmeter parallel am Widerstand, Amperemeter in Reihe; $R=U/I$.' },
  ],
};
