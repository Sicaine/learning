export default {
  id: 'zaehler-register',
  title: 'Zähler, Teiler und Schieberegister',
  summary: 'Aneinandergereihte Flipflops zählen Impulse, teilen Frequenzen und schieben Bits seriell hin und her. Du baust im Kopf einen Ripple-Zähler, teilst 10 MHz auf 1 Hz herunter und verstehst das Messprinzip des Frequenzzählers.',
  minutes: 30,
  needs: ['flipflops'],
  goals: [
    'Aus T-Flipflops einen [[zaehler|Zähler]] aufbauen und den Zählerstand als Dualzahl lesen',
    'Das Teilerverhältnis einer Kette ($2^n$, mit Rücksetzen auch beliebiges Modulo) bestimmen',
    'Erklären, warum asynchrone Zähler kurze Fehlzustände (Glitches) haben',
    'Die Funktion eines [[schieberegister|Schieberegisters]] (seriell ↔ parallel) beschreiben',
    'Das Messprinzip eines [[frequenzzaehler|Frequenzzählers]] (Zeitbasis, Tor, Zähler, Vorteiler) erklären',
  ],
  blocks: [
    {
      id: 'idee', type: 'text', title: 'Flipflops hintereinander: aus Teilen wird Zählen',
      md: `
Im letzten Schritt hast du gesehen: Ein T-Flipflop halbiert die Frequenz. Schaltet man den Ausgang einer Stufe als **Takt** der nächsten, entsteht eine Kette:

- Stufe 0 kippt bei jeder Flanke des Eingangstakts – $Q_0$ hat $f/2$.
- Stufe 1 kippt bei jeder fallenden Flanke von $Q_0$ – $Q_1$ hat $f/4$.
- Stufe 2: $f/8$, Stufe 3: $f/16$ …

Liest man die Ausgänge als Ziffern einer Dualzahl $Q_3Q_2Q_1Q_0$, **zählt** die Kette die Eingangsimpulse: 0000, 0001, 0010, 0011 … 1111, dann springt sie auf 0000 zurück (*Überlauf*). Ein Zähler mit $n$ Stufen kennt $2^n$ Zustände – bei vier Stufen 16 (0 bis 15) – und teilt die Frequenz am letzten Ausgang durch $2^n$.[^wp-zaehler]

Weil jede Stufe auf die vorige wartet, heißt diese Bauart **asynchroner** Zähler ([Asynchronzähler](wiki:Asynchronzähler)) oder *Ripple-Zähler* (engl. *ripple* = Welligkeit: Die Änderung „läuft durch" die Kette). **Synchrone** Zähler ([Synchronzähler](wiki:Synchronzähler)) legen den Takt an alle Flipflops gleichzeitig und berechnen über Gatter, welche kippen sollen – schneller und glitchfrei, aber aufwendiger.`,
    },
    {
      id: 'glitch', type: 'text', title: 'Modulo n und Glitches',
      md: `
Wer nicht bis 15 zählen will, setzt den Zähler beim Erreichen eines Werts auf null zurück: Ein **Dezimalzähler** (Modulo 10) läuft 0 … 9 und kehrt dann zu 0 zurück. Eine Teilerkette aus Dezimalzählern teilt jeweils durch 10 – und lässt sich gut ablesen.

Beim Ripple-Zähler hat das Hintereinanderkippen eine Nebenwirkung. Beim Schritt von 7 (0111) auf 8 (1000) kippt zuerst $Q_0$, dadurch $Q_1$, dann $Q_2$ und zuletzt $Q_3$: Kurz erscheinen 0110, 0100 und 0000, bevor 1000 steht. Diese **Zwischenzustände** (*Glitches*) sind nur Nanosekunden kurz, aber ein Dekoder, der auf sie reagiert, löst fälschlich aus. Gegenmittel: synchrone Zähler oder einen Takt zum Übernehmen der Anzeige.

Auch das Rücksetzen auf null beim Erreichen von 10 ist so ein Glitch: Der Zähler *sieht* kurz 1010, bevor er zurückgesetzt wird.`,
    },
    {
      id: 'viz-counter', type: 'viz', viz: 'counter-lab', title: 'Der Ripple-Zähler in Zeitlupe',
      intro: 'Vier Stufen, Zeitdiagramm und Dezimalanzeige. Mit „Modulo" begrenzt du den Zählumfang; die Glitch-Ansicht zeigt die Zwischenzustände beim Übertrag.',
      params: { mode: 'counter', goals: ['wrap16', 'mod10'] },
      task: 'Lass den Zähler einmal von **15 auf 0 überlaufen**, stelle dann **Modulo 10** ein und beobachte den Sprung von 9 auf 0.',
    },
    {
      id: 'teiler', type: 'text', title: 'Teilerketten: von 10 MHz auf 1 Hz',
      md: `
Ein [Frequenzteiler](wiki:Frequenzteiler|Frequency divider) ist ein Zähler, dessen letzter Ausgang einen Impuls je $N$ Eingangsimpulse liefert. Aus einer genauen Frequenz – etwa dem **10-MHz-Quarz** eines Messgeräts ([[quarzoszillator|Quarzoszillator]], [Quarz](wiki:Quarzoszillator|Crystal oscillator)) – wird so jede *genauso genaue* niedrigere Frequenz:

$$f_\\text{aus} = \\frac{f_\\text{ein}}{N}\\qquad N=N_1\\cdot N_2\\cdots$$

Die Teilerverhältnisse **multiplizieren** sich (wie bei [Dualzahlen](wiki:Dualsystem|Binary number): $2^n$). Von 10 MHz auf 1 Hz sind es $10^7$: sieben Dezimalzähler hintereinander (je ÷ 10). Zwischen den Stufen entstehen bequeme Frequenzen: 1 MHz, 100 kHz, 10 kHz, 1 kHz, 100 Hz, 10 Hz, 1 Hz.

In einem **[Frequenzzähler](wiki:Frequenzzähler|Frequency counter)** passiert der Umkehrschluss: Eine Zeitbasis aus dem Quarz erzeugt ein **Tor**, das genau 1 s (oder 0,1 s, 10 s) offen ist. Während dieser Zeit zählt ein Zähler die Impulse des Messsignals; die Zahl ist direkt die Frequenz in Hz. Für hohe Frequenzen schaltet man einen **Vorteiler** davor (z. B. 10:1 oder 100:1), weil die Zählerelektronik nicht beliebig schnell ist – die Anzeige muss man dann mit dem Teilerverhältnis zurückrechnen.`,
    },
    {
      id: 'viz-chain', type: 'viz', viz: 'counter-lab', title: 'Teilerkette',
      intro: 'Wechsle in die Teilerkette und stelle die Teilerverhältnisse der einzelnen Stufen ein; unten siehst du die Frequenz an jedem Ausgang.',
      params: { mode: 'chain', goals: ['hz1'] },
      task: 'Mache aus **10 MHz** genau **1 Hz**: Wie viele Dezimalstufen brauchst du?',
    },
    {
      id: 'register', type: 'text', title: 'Schieberegister: Bits auf Wanderschaft',
      md: `
Hängt man D-Flipflops so hintereinander, dass der Ausgang jeder Stufe der Eingang der nächsten ist (und alle am **gleichen** Takt), wandert ein Bit bei jeder Taktflanke **eine Stelle** weiter. Das ist ein [Schieberegister](wiki:Schieberegister|Shift register).

Damit lässt sich zwischen zwei Arten der Datenübertragung wandeln:

- **seriell → parallel:** acht Bits kommen nacheinander an einer Leitung an; nach acht Takten stehen sie gleichzeitig an acht Ausgängen.
- **parallel → seriell:** acht Bits werden gleichzeitig geladen und dann nacheinander an einer Leitung herausgeschoben.

Eine Leitung statt acht spart Kabel und Pins: Deshalb stecken Schieberegister in vielen Schnittstellen-ICs (etwa [SPI](wiki:Serial Peripheral Interface|Serial Peripheral Interface)-Bausteinen für Displays und Synthesizer) und in der seriellen Kommunikation mit dem Computer. Mit einem 100-kHz-Takt schiebt man 8 Bit in $8\\cdot10\\,\\mu\\text{s}=80\\,\\mu\\text{s}$ durch.`,
    },
    {
      id: 'calc-16', type: 'numeric', title: 'Vier Stufen',
      question: 'Ein 4-Bit-Zähler läuft von 0 an aufwärts. Welchen größten Zählerstand (dezimal) erreicht er, bevor er auf 0 überläuft?',
      answer: 15, tolerance: 0.01,
      hint: 'Zustände: $2^4$ – der erste ist 0.',
      explain: '$2^4=16$ Zustände von 0 bis $16-1=15$ (binär 1111).',
    },
    {
      id: 'calc-teiler4', type: 'numeric', title: 'Teilerkette mit vier Stufen',
      question: 'Ein Takt von $10\\,\\text{MHz}$ wird durch vier T-Flipflop-Stufen geteilt. Welche Frequenz in kHz liegt am letzten Ausgang?',
      answer: 625, tolerance: 1, unit: 'kHz',
      hint: 'Teilerverhältnis $2^4=16$.',
      explain: '$10\\,\\text{MHz}/16=0{,}625\\,\\text{MHz}=625\\,\\text{kHz}$.',
    },
    {
      id: 'calc-stufen', type: 'numeric', title: 'Von 10 MHz auf 1 Hz',
      question: 'Wie viele Dezimalteiler (je ÷ 10) braucht man, um aus $10\\,\\text{MHz}$ die Frequenz $1\\,\\text{Hz}$ zu gewinnen?',
      answer: 7, tolerance: 0.01,
      hint: 'Verhältnis $10\\,\\text{MHz}/1\\,\\text{Hz}=10^7$.',
      explain: '$10^7$ entspricht sieben Stufen mit je ÷ 10.',
    },
    {
      id: 'calc-vorteiler', type: 'numeric', title: 'Frequenzzähler mit Vorteiler',
      question: 'Vor einem Frequenzzähler sitzt ein 100:1-Vorteiler. Der Zähler zeigt $1{,}4437\\,\\text{MHz}$ an. Welche Frequenz hat das Eingangssignal in MHz?',
      answer: 144.37, tolerance: 0.01, unit: 'MHz',
      hint: 'Die Anzeige muss mit dem Teilerverhältnis multipliziert werden.',
      explain: '$1{,}4437\\,\\text{MHz}\\cdot100=144{,}37\\,\\text{MHz}$.',
    },
    {
      id: 'quiz-glitch', type: 'quiz', title: 'Fehlzustände',
      question: 'Warum zeigen asynchrone Zähler beim Übertrag kurzzeitig falsche Zählerstände (Glitches)?',
      options: [
        { text: 'Weil sich die Stufen nacheinander ändern: Jede Stufe wartet auf die Laufzeit der vorherigen', correct: true, why: 'Die Änderung läuft durch die Kette („ripple"); für wenige Nanosekunden stehen Zwischenzustände wie 0110 oder 0100 an den Ausgängen.' },
        { text: 'Weil Dualzahlen weniger genau sind als Dezimalzahlen', correct: false, why: 'Die Zahlendarstellung ist exakt; Glitches kommen von der Laufzeit, nicht von der Zahlendarstellung.' },
        { text: 'Weil der Quarz nicht stabil genug schwingt', correct: false, why: 'Auch ein perfekter Takt führt beim Ripple-Zähler zu Zwischenzuständen.' },
        { text: 'Weil der Zähler zu viele Bits hat', correct: false, why: 'Mehr Stufen verlängern die Laufzeitkette und verschlimmern den Effekt, aber die Ursache bleibt das Hintereinanderkippen.' },
      ],
    },
    {
      id: 'order-messung', type: 'order', title: 'Frequenzmessung',
      prompt: 'Bringe die Schritte einer Frequenzzähler-Messung in die richtige Reihenfolge.',
      items: [
        'Der Zähler wird auf null gesetzt',
        'Die Zeitbasis öffnet das Tor für genau 1 Sekunde',
        'Der Zähler zählt die Impulse des Messsignals',
        'Das Tor schließt',
        'Der Zählerstand wird als Frequenz in Hz angezeigt',
      ],
      explain: 'Die Genauigkeit hängt an der Zeitbasis: Ein Quarz mit kleiner Abweichung macht die Torzeit genau.',
    },
    {
      id: 'match-bausteine', type: 'match', title: 'Bausteine zuordnen',
      prompt: 'Ordne jeden Baustein seiner Aufgabe zu.',
      pairs: [
        ['Ripple-Zähler', 'Stufen kippen nacheinander (asynchron)'],
        ['Synchroner Zähler', 'alle Flipflops am gleichen Takt'],
        ['Frequenzteiler', 'liefert einen Impuls je N Eingangsimpulse'],
        ['Schieberegister', 'wandelt seriell ↔ parallel'],
      ],
    },
    {
      id: 'recall-schiebe', type: 'recall', title: 'Erkläre es in eigenen Worten',
      prompt: 'Wozu dient ein Schieberegister in einem Schnittstellen-IC? Was spart man damit?',
      answer: 'Es wandelt zwischen serieller und paralleler Darstellung. Ein Byte wird bitweise über eine einzige Datenleitung ins Register geschoben (oder aus ihm heraus), und liegt dann parallel an mehreren Anschlüssen (oder umgekehrt). Man braucht für die Verbindung zwischen zwei Bausteinen nur wenige Leitungen (Takt, Daten) statt eines Kabels mit einer Leitung je Bit.',
      hints: ['Wie viele Leitungen brauchen 8 Bit parallel, wie viele seriell?', 'Was bewirkt jede Taktflanke im Register?'],
      cards: ['schieberegister', 'ser-par'],
    },
    {
      id: 'mission', type: 'callout', tone: 'mission', title: 'Prüfung und Funkpraxis',
      md: `
Frequenzzähler sind in der Prüfung ein Thema der Messtechnik: Der Katalog fragt, welchen **Stellenwert** eine Ziffer der Anzeige hat (**EI502**, **EI503**: Kilohertz, zehn Hertz) und wie man die Anzeige umrechnet, wenn ein **10:1-Frequenzteiler** vor dem Zähler liegt (**EI504**).[^bnetza-pruefungsfragen-2024] Dahinter stecken genau die Bausteine dieser Lektion: Zeitbasis (Quarz, **ED506/ED507**), Teiler, Tor und Zähler. Auch die Dualzahlen aus dem Zählerstand tauchen im Katalog auf (**EA205–EA208**), und jeder Synthesizer-Sender teilt die Frequenz seines Oszillators digital herunter, um sie mit einer Referenz zu vergleichen.`,
    },
    {
      id: 'warning', type: 'callout', tone: 'warning', title: 'Typische Fehlvorstellung',
      md: `
„Vier Flipflop-Stufen teilen durch vier." – Nein: Jede Stufe halbiert, die Verhältnisse **multiplizieren** sich: $2\\cdot2\\cdot2\\cdot2=2^4=16$. Und: „Der Zähler springt ohne Zwischenstufen von 7 auf 8" gilt nur für synchrone Zähler; beim Ripple-Zähler gibt es Zwischenzustände.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>Deutsch</th><th>English</th><th>Notiz</th></tr>
<tr><td>Zähler</td><td>counter</td><td>asynchron: ripple counter</td></tr>
<tr><td>Frequenzteiler</td><td>frequency divider, prescaler</td><td>$f/N$</td></tr>
<tr><td>Schieberegister</td><td>shift register</td><td>seriell ↔ parallel</td></tr>
<tr><td>Überlauf</td><td>overflow, wrap-around</td><td>15 → 0</td></tr>
<tr><td>Frequenzzähler</td><td>frequency counter</td><td>Zeitbasis, Tor</td></tr>
<tr><td>Torzeit</td><td>gate time</td><td>z. B. 1 s</td></tr>
<tr><td>Vorteiler</td><td>prescaler</td><td>10:1, 100:1</td></tr>
<tr><td>Fehlzustand</td><td>glitch</td><td>Zwischenzustand</td></tr></table>`,
    },
    {
      id: 'deep-gray', type: 'callout', tone: 'deep', title: 'Warum der Gray-Code Glitches entschärft',
      md: `
Beim Übergang 7 → 8 ändern sich im Dualcode alle vier Bits – bei nicht ganz gleichzeitiger Änderung entstehen beliebige Zwischenwerte. Der [Gray-Code](wiki:Gray-Code|Gray code) wechselt dagegen bei jedem Schritt **genau ein Bit**: 0000, 0001, 0011, 0010, 0110, 0111, 0101, 0100, 1100 … Dann ist auch bei verzögertem Umschalten jeder Zwischenwert ein gültiger Nachbar. Deshalb verwendet man ihn z. B. in Drehgebern und überall dort, wo ein Zählerstand asynchron abgetastet wird.`,
    },
  ],
  cards: [
    { id: 'zaehler-prinzip', front: 'Wie arbeitet ein Ripple-Zähler?', back: 'Kette aus T-Flipflops, der Ausgang jeder Stufe taktet die nächste (asynchron). Die Ausgänge $Q_n\\ldots Q_0$ bilden die Dualzahl.' },
    { id: 'zaehler-zustaende', front: 'Zustände eines n-Bit-Zählers?', back: '$2^n$ (4 Bit: 0 bis 15); die Frequenz am letzten Ausgang ist $f/2^n$.' },
    { id: 'teilerkette', front: 'Gesamtteilerverhältnis einer Teilerkette?', back: 'Das Produkt der Einzelverhältnisse: $N=N_1\\cdot N_2\\cdots$ (z. B. 7 × ÷ 10 = $10^7$).' },
    { id: 'ripple-glitch', front: 'Warum haben asynchrone Zähler Glitches?', back: 'Die Stufen kippen nacheinander (Laufzeit); kurz erscheinen Zwischenzustände wie 7 → 6 → 4 → 0 → 8.' },
    { id: 'synchron', front: 'Synchroner vs. asynchroner Zähler?', back: 'Synchron: gemeinsamer Takt für alle Flipflops, glitchfrei, schneller. Asynchron: Stufen kippen nacheinander, einfacher.' },
    { id: 'schieberegister', front: 'Funktion eines Schieberegisters?', back: 'Kette aus D-Flipflops am gleichen Takt; bei jeder Flanke wandert das Datenbit eine Stelle weiter.' },
    { id: 'ser-par', front: 'Wozu seriell ↔ parallel wandeln?', back: 'Wenige Leitungen für die Übertragung (Takt + Daten), parallele Weiterverarbeitung im Baustein.' },
    { id: 'frequenzzaehler', front: 'Prinzip des Frequenzzählers?', back: 'Quarz-Zeitbasis öffnet das Tor für genau 1 s (o. ä.); der Zähler zählt die Impulse – der Zählerstand ist die Frequenz in Hz.' },
    { id: 'vorteiler', front: 'Anzeige eines Frequenzzählers mit Vorteiler 10:1?', back: 'Anzeige × 10 = tatsächliche Frequenz (z. B. Anzeige 7,2 MHz → 72 MHz).' },
    { id: 'modulo', front: 'Wie macht man aus dem Dualzähler einen Dezimalzähler?', back: 'Beim Erreichen von 10 (1010) auf 0 zurücksetzen (Modulo 10): Zählumfang 0 … 9.' },
  ],
};
