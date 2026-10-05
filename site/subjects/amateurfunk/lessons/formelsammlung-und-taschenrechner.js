export default {
  id: 'formelsammlung-und-taschenrechner',
  title: 'Formelsammlung und Taschenrechner in der Prüfung',
  summary: 'Die amtliche Formelsammlung (liegt in Teil N und E aus) lesen, Größengleichungen sicher umstellen und den Taschenrechner so bedienen, dass Zehnerpotenzen und Klammern keine Fehler mehr machen.',
  minutes: 15,
  goals: [
    'Aufbau der amtlichen [[formelsammlung]] kennen und eine gesuchte Formel in unter einer halben Minute finden',
    'Eine [[groessengleichung]] nach jeder Größe umstellen und Einheiten mitrechnen',
    'Mit [[einheitenvorsatz|Vorsätzen]] und [[zehnerpotenz|Zehnerpotenzen]] sicher umgehen (p, n, µ, m, k, M, G)',
    'Eingaben wie 1/(2·π·√(L·C)) mit EE-Taste und Klammern fehlerfrei in den Taschenrechner tippen',
  ],
  needs: ['elektrotechnik/einheiten-und-groessen'],
  blocks: [
    {
      id: 'aufbau', type: 'text', title: 'Was in der Prüfung auf deinem Tisch liegt',
      md: `
In den beiden Technikteilen N und E bekommst du von der [Bundesnetzagentur](wiki:Bundesnetzagentur|Federal Network Agency) eine **Formelsammlung** zum Prüfungsbogen dazu; mitbringen darfst du einen einfachen wissenschaftlichen oder nicht programmierbaren **Taschenrechner** ohne Textspeicher.[^bnetza-formelsammlung] Es gibt also nichts auswendig zu lernen, was dort steht — aber du musst wissen, **dass** es dort steht, **wo** und **wie** du es benutzt. Wer in der Prüfung erst suchen lernt, verliert Zeit, und die ist mit 45 Minuten je Teil knapp bemessen.

Die Sammlung besteht aus zwei Teilen:

1. **Formeln, nach Themen geordnet:** Vorsätze und Zweierpotenzen, Widerstände (Ohm, Reihen-/Parallelschaltung, Spannungs-/Stromteiler, Normreihen E6/E12/E24, Farbcode), Leistung und Wirkungsgrad, Wechselspannung, Spule, Transformator, Kondensator, Filter, Schwingkreis, Transistor, Zwischen- und Spiegelfrequenz, Pegel/Dezibel, Antennen, Rauschen, Modulation, Wellenlänge, Reflexion/SWR, Wellenwiderstand und weitere Formeln.
2. **Formelzeichen, Konstanten und Tabellen:** Hier steht, **was ein Buchstabe bedeutet** (z. B. $R_\\mathrm{i}$ Innenwiderstand, $\\ddot u$ Übersetzungsverhältnis, $\\nu_\\mathrm{U}$ Wechselspannungsverstärkung) sowie die Tabellen für den spezifischen Widerstand $\\rho$ und die relative Dielektrizitätszahl $\\epsilon_\\mathrm{r}$.

Die Notation der Formelsammlung ist auch die Notation der Prüfungsfragen. In dieser Etappe benutzen wir sie durchgehend — gewöhne dir z. B. $R_\\mathrm{G}$ (Gesamtwiderstand), $U_\\mathrm{eff}$, $\\hat U$ (Spitzenwert) und $U_\\mathrm{SS}$ (Spitze-Spitze) an.`,
    },
    {
      id: 'mission-pruefung', type: 'callout', tone: 'mission', title: 'Funkpraxis: Formeln im Shack',
      md: `Auch nach der Prüfung brauchst du dieselben Formeln: Welche Länge hat ein Dipol für 7,1 MHz? Welche Dämpfung hat das Koaxkabel in Dezibel? Welche Spule schwingt mit dem Drehkondensator auf 3,6 MHz? Im Shack klebt deshalb oft ein Zettel mit genau diesen Formeln an der Wand. Die Formelsammlung ist dein erster, gut sortierter Zettel.`,
    },
    {
      id: 'groessengleichung', type: 'text', title: 'Größengleichungen: Zahl mal Einheit',
      md: `
Alle Formeln der Sammlung sind **[[groessengleichung|Größengleichungen]]** (vgl. [Größengleichung](wiki:Größengleichung|Quantity calculus)) im [Internationalen Einheitensystem](wiki:Internationales Einheitensystem|International System of Units): Jede Größe ist ein Produkt aus **Zahlenwert und Einheit**, z. B. $U = 4{,}7\\,\\text{V}$. Setzt du Werte ein, rechnest du die Einheiten mit — und die Einheit des Ergebnisses ist dann automatisch richtig:

$$R = \\frac{U}{I} = \\frac{12\\,\\text{V}}{0{,}02\\,\\text{A}} = 600\\,\\frac{\\text{V}}{\\text{A}} = 600\\,\\Omega$$

**Umstellen** geht nach einer Regel: *Was du auf einer Seite tust, tust du auf der anderen.* Aus $U = R\\cdot I$ wird durch Teilen durch $I$ die Formel $R = U/I$, durch Teilen durch $R$ die Formel $I = U/R$. Die Formelsammlung druckt die häufigsten Umstellungen schon mit ab (z. B. die Leistung in drei Varianten); bei allen anderen musst du selbst umstellen.

Drei Muster kommen in fast jeder Aufgabe vor:

- **Produkt:** $A = B\\cdot C$ → $B = A/C$.
- **Quotient im Nenner:** $f = \\dfrac{c}{\\lambda}$ → $\\lambda = \\dfrac{c}{f}$ (Nenner und Ergebnis tauschen!).
- **Wurzel / Quadrat:** $P = \\dfrac{U^2}{R}$ → $U = \\sqrt{P\\cdot R}$.

Vor dem Einsetzen rechnest du alle Werte in **Grundeinheiten** um (Hz, F, H, Ω, V, A, m, s). Genau dort passieren die meisten Fehler.`,
    },
    {
      id: 'vorsaetze', type: 'text', title: 'Vorsätze und Zehnerpotenzen',
      md: `
Die Formelsammlung beginnt mit der Tabelle der **[[einheitenvorsatz|Vorsätze]]** (SI-Präfixe, siehe [Vorsätze für Maßeinheiten](wiki:Vorsätze für Maßeinheiten|Metric prefix)). Sie ist für den Funkamateur die wichtigste Tabelle überhaupt:

| Vorsatz | Symbol | Faktor | Typisches Beispiel |
|---|---|---|---|
| Piko | p | $10^{-12}$ | Kondensator 47 pF |
| Nano | n | $10^{-9}$ | Spule 470 nH, Zeit 100 ns |
| Mikro | µ | $10^{-6}$ | 2,2 µH, 10 µA |
| Milli | m | $10^{-3}$ | 42 mA, 4200 mV |
| Kilo | k | $10^{3}$ | 4,7 kΩ, 7100 kHz |
| Mega | M | $10^{6}$ | 145 MHz, 1 MΩ |
| Giga | G | $10^{9}$ | 10 GHz |

Dazu stehen dort die **Zweierpotenzen** ($2^8 = 256$, $2^{10} = 1024$, …) für die Digitaltechnik.

> **Umrechnen:** Beim Wechsel zu einem **kleineren** Vorsatz wird die Zahl **größer**. 4,2 V = 4200 mV, denn ein Millivolt ist nur ein Tausendstel Volt. Beim Wechsel zu einem größeren Vorsatz wird die Zahl kleiner: 42 mA = 0,042 A.

Die **[Zehnerpotenz](wiki:Zehnerpotenz|Power of 10)**-Schreibweise ersetzt lange Nullenketten: $4{,}7\\,\\text{k}\\Omega = 4{,}7\\cdot10^{3}\\,\\Omega$, $47\\,\\text{pF} = 47\\cdot10^{-12}\\,\\text{F}$ (vgl. [wissenschaftliche Notation](wiki:Wissenschaftliche Notation|Scientific notation)).`,
    },
    {
      id: 'warn-vorsatz', type: 'callout', tone: 'warning', title: 'Typischer Fehler: Faktor 1000 daneben',
      md: `Verwechsle nicht **m** (Milli, $10^{-3}$) mit **M** (Mega, $10^{6}$) und nicht **µ** (Mikro, $10^{-6}$) mit **m**: Groß- und Kleinschreibung entscheidet über einen Faktor von einer Milliarde! 4,2 V sind **nicht** 4,200 µV (Faktor 10⁶ zu klein) und **nicht** 4200 kV. Probe: Passt die Größenordnung? Ein Handfunkgerät fließt mit 1 A, nicht mit 1 kA.`,
    },
    {
      id: 'ee-taste', type: 'text', title: 'Der Taschenrechner: EE-Taste, Klammern, Wurzel, log',
      md: `
Prüfungsrechnungen haben fast immer **sehr kleine oder sehr große Zahlen** (µH, pF, MHz). Dafür hat der [Taschenrechner](wiki:Taschenrechner|Calculator) die Taste **EE** oder **EXP** („mal Zehn hoch“):

- \`2,2 EE -6\` bedeutet $2{,}2\\cdot10^{-6}$ — also 2,2 µH als 0,0000022 H. Das Vorzeichen des Exponenten tippst du mit der Taste **(−)** oder **+/−**.
- Tippe **nicht** „2,2 × 10 EE −6“: Dann steht die Zehn doppelt in der Rechnung.

Die vier Stolperfallen:

1. **Klammern.** Ein Bruch mit Summe oder Produkt im Nenner braucht Klammern: $\\dfrac{1}{2\\pi f C}$ ist \`1 ÷ ( 2 × π × f × C )\`, nicht \`1 ÷ 2 × π × f × C\` (das wäre $\\pi f C/2$).
2. **Wurzel.** Die Taste **√** öffnet bei manchen Rechnern eine Klammer, die du mit **)** schließen musst. Die ganze Wurzel von $L\\cdot C$ steht unter einer Klammer.
3. **Logarithmus.** \`10 × log ( P2 ÷ P1 )\`: erst teilen, dann log, dann mal 10. Der Zehnerlogarithmus ist die Taste „log“, nicht „ln“.
4. **Zehn hoch x.** Die Umkehrung des Logarithmus ist Shift/2nd + log (**10^x**). Damit gehst du von dB auf Faktoren zurück.

Bei Doppelbrüchen wie der **Parallelschaltung** $\\dfrac{1}{R_\\mathrm{G}} = \\dfrac{1}{R_1}+\\dfrac{1}{R_2}$ vergisst man leicht den letzten Schritt: Du hast dann $1/R_\\mathrm{G}$ ausgerechnet und musst das Ergebnis noch einmal **kehrwertbilden** (Taste $x^{-1}$ oder 1/x). Bei zwei Widerständen ist $R_\\mathrm{G} = \\dfrac{R_1\\cdot R_2}{R_1+R_2}$ (Produkt durch Summe) bequemer.`,
    },
    {
      id: 'demo-rechner', type: 'viz', viz: 'taschenrechner-trainer', title: 'Taschenrechner-Trainer',
      params: { need: 5 },
      task: 'Löse **fünf Aufgaben in Folge richtig** (Toleranz 2 %). Nach jeder Antwort zeigt dir der Trainer die Tastenfolge. Wechsle zwischendurch die Aufgabenart.',
    },
    {
      id: 'calc-f0', type: 'numeric', title: 'Resonanzfrequenz rechnen',
      question: 'Ein Schwingkreis hat $L = 2{,}2\\,\\mu\\text{H}$ und $C = 470\\,\\text{pF}$. Berechne mit der Formelsammlung $f_0 = \\dfrac{1}{2\\cdot\\pi\\cdot\\sqrt{L\\cdot C}}$ die Resonanzfrequenz.',
      answer: 4.95, tolerance: 0.1, unit: 'MHz',
      hint: 'In Grundeinheiten: L = 2,2 EE −6 H, C = 470 EE −12 H. Das Ergebnis kommt in Hz heraus.',
      explain: '$L\\cdot C = 2{,}2\\cdot10^{-6}\\cdot470\\cdot10^{-12} = 1{,}034\\cdot10^{-15}$; Wurzel $\\approx 3{,}22\\cdot10^{-8}$; mal $2\\pi$ ergibt $2{,}02\\cdot10^{-7}$; Kehrwert $\\approx 4{,}95\\cdot10^{6}$ Hz = 4,95 MHz. Plausibel: so kleine Bauteile schwingen im MHz-Bereich.',
    },
    {
      id: 'calc-umrechnen', type: 'numeric', title: 'Vorsätze umrechnen',
      question: 'Eine Kapazität von $4{,}7\\cdot10^{-10}\\,\\text{F}$ soll in Pikofarad angegeben werden.',
      answer: 470, tolerance: 0, unit: 'pF',
      hint: 'Ein pF sind 10⁻¹² F. Um wie viele Zehnerpotenzen musst du die Zahl verschieben?',
      explain: '$4{,}7\\cdot10^{-10}\\,\\text{F} = 470\\cdot10^{-12}\\,\\text{F} = 470\\,\\text{pF}$. Wechsel zu einem kleineren Vorsatz (pico) bedeutet eine größere Zahl.',
    },
    {
      id: 'order-vorgehen', type: 'order', title: 'Rechenweg in der Prüfung',
      prompt: 'Bringe die Schritte einer Technikaufgabe in die sinnvolle Reihenfolge.',
      items: [
        'Gesucht und gegeben herausschreiben (mit Einheiten)',
        'Passende Formel in der Formelsammlung suchen und gegebenenfalls umstellen',
        'Alle Werte in Grundeinheiten umrechnen (Vorsätze auflösen)',
        'Einsetzen und mit dem Taschenrechner rechnen (EE-Taste, Klammern)',
        'Größenordnung und Einheit prüfen, passende Antwort ankreuzen',
      ],
      explain: 'Die Antworten im Katalog sind oft um genau einen Faktor 10, 1000 oder 10⁶ verschieden. Die Plausibilitätsprobe am Schluss fängt Vorsatzfehler ab.',
    },
    {
      id: 'match-formeln', type: 'match', title: 'Aufgabe → Abschnitt der Formelsammlung',
      prompt: 'Ordne jeder Aufgabe den Abschnitt zu, in dem du die Formel findest.',
      pairs: [
        ['Zwei parallele Widerstände zusammenfassen', 'Widerstände in Parallelschaltung'],
        ['Welche Resonanzfrequenz hat L mit C?', 'Schwingkreis'],
        ['Dämpfung eines Kabels in dB', 'Pegel (Dämpfung/Verluste)'],
        ['Zwischenfrequenz eines Superhets', 'ZF und Spiegelfrequenzen'],
        ['Wellenlänge zur Frequenz', 'Wellenlänge und Frequenz'],
        ['Wirkungsgrad eines Netzteils', 'Leistung / Wirkungsgrad'],
      ],
    },
    {
      id: 'quiz-tasten', type: 'quiz', title: 'Fehler in der Tastenfolge',
      question: 'Du willst $X_\\mathrm{C} = \\dfrac{1}{2\\cdot\\pi\\cdot f\\cdot C}$ ausrechnen und tippst  `1 ÷ 2 × π × f × C =`. Welcher Fehler steckt darin?',
      options: [
        { text: 'Der Nenner steht nicht in Klammern; gerechnet wird $\\pi f C/2$.', correct: true, why: 'Punkt vor Strich gilt auch für ÷ und ×: Der Rechner arbeitet von links nach rechts, teilt also nur durch 2. Richtig: 1 ÷ ( 2 × π × f × C ).' },
        { text: 'Die Taste π darf in einer Formel nicht verwendet werden.', why: 'π darf selbstverständlich verwendet werden; sie liefert die genaueste Zahl.' },
        { text: 'Man muss immer erst f quadrieren.', why: 'Beim Blindwiderstand kommt f nur einfach vor; quadriert wird hier nichts.' },
        { text: 'Es fehlt die EE-Taste für den Faktor 10 hinter π.', why: 'π ist 3,14159…, kein Zehnerpotenzfaktor nötig; EE brauchst du nur für f und C.' },
      ],
    },
    {
      id: 'recall-groessen', type: 'recall', title: 'In eigenen Worten',
      prompt: 'Eine Prüfungsaufgabe gibt L in µH und C in pF. Beschreibe in vier Sätzen, wie du vom Aufgabentext zur Antwort kommst und welche Fehler du dabei bewusst vermeidest.',
      answer: 'Ich suche in der Formelsammlung die Formel für die gesuchte Größe (hier f₀ = 1/(2·π·√(L·C))), schreibe L und C in Grundeinheiten (H bzw. F) mit der EE-Taste (z. B. 2,2 EE −6 und 470 EE −12) und tippe die Formel mit Klammern um den ganzen Nenner. Das Ergebnis liegt in Hz vor; ich rechne in kHz oder MHz um und prüfe, ob die Größenordnung zum Bauteil passt (kleine L und C → hohe Frequenz, MHz). Vermeiden will ich: Vorsatzfehler (µ statt m, p statt n), fehlende Klammern, doppelte Zehn bei EE und das Vergessen des Kehrwerts.',
      cards: ['fs-groessengl', 'fs-ee'],
    },
    {
      id: 'wiki-hinweis', type: 'callout', tone: 'fact', title: 'Übrigens',
      md: `Die Formelsammlung ist ein amtliches Hilfsmittel; die Bundesnetzagentur hat sie nach dem Erscheinen der 3. Auflage des Fragenkatalogs (März 2024) an einigen Stellen berichtigt (Parabolspiegelgewinn, Stehwellenverhältnis, spezifischer Widerstand). Maßgeblich ist die Fassung, die in der Prüfung ausliegt.[^bnetza-formelsammlung] Die Rechnungen in dieser Etappe benutzen das gerundete Lichtgeschwindigkeits-Maß $c_0\\approx3\\cdot10^8$ m/s und $\\lambda[\\text{m}]\\approx300/f[\\text{MHz}]$ aus der Sammlung; mit dem genauen Wert $299\\,792\\,458$ m/s ändert sich nur die dritte Stelle. Kleine Rundungsunterschiede sind in den Antworten des Katalogs einkalkuliert; rechne mit der Taste π und dem [Logarithmus](wiki:Logarithmus|Logarithm) deines Rechners, nicht mit gerundeten Werten wie 3,14 ([Kreiszahl](wiki:Kreiszahl|Pi)).`,
    },
  ],
  cards: [
    { id: 'fs-groessengl', front: 'Wie rechnest du mit einer Größengleichung?', back: 'Zahlenwert **und** Einheit einsetzen, Einheiten mitrechnen (V/A = Ω). Vorher alle Werte auf Grundeinheiten umrechnen.' },
    { id: 'fs-ee', front: 'Taschenrechner: 2,2 µH eingeben', back: '`2,2 EE −6` (H). Nicht „2,2 × 10 EE −6“ — die Zehn steckt schon in EE.' },
    { id: 'fs-klammer', front: 'Warum Klammern bei $\\dfrac{1}{2\\pi f C}$?', back: 'Ohne Klammern teilt der Rechner nur durch 2: `1 ÷ ( 2 × π × f × C )`.' },
    { id: 'fs-prefix-1', front: 'Vorsätze klein: p, n, µ, m', back: 'Piko $10^{-12}$, Nano $10^{-9}$, Mikro $10^{-6}$, Milli $10^{-3}$' },
    { id: 'fs-prefix-2', front: 'Vorsätze groß: k, M, G', back: 'Kilo $10^{3}$, Mega $10^{6}$, Giga $10^{9}$' },
    { id: 'fs-umrechnen', front: '4,2 V in mV? 42 mA in A?', back: '4,2 V = 4200 mV. 42 mA = 0,042 A. Kleinerer Vorsatz → größere Zahl.' },
    { id: 'fs-hilfsmittel', front: 'Welche Hilfsmittel gibt es in den Technikteilen N und E?', back: 'Amtliche Formelsammlung (liegt aus) und eigener einfacher wissenschaftlicher oder nicht programmierbarer Taschenrechner ohne Textspeicher.' },
    { id: 'fs-log', front: 'Dezibel am Rechner: Leistungsverhältnis → dB', back: '`10 × log ( P₂ ÷ P₁ )` — Taste log (Basis 10), nicht ln.' },
    { id: 'fs-10hoch', front: 'dB zurück in einen Faktor?', back: 'Leistung: `10 ^ ( g ÷ 10 )`, Spannung: `10 ^ ( g ÷ 20 )` (Taste 10^x oder Shift + log).' },
    { id: 'fs-lambda', front: 'Schnelle Umrechnung Frequenz ↔ Wellenlänge', back: '$\\lambda[\\text{m}]\\approx\\dfrac{300}{f[\\text{MHz}]}$ und $f[\\text{MHz}]\\approx\\dfrac{300}{\\lambda[\\text{m}]}$' },
  ],
};
