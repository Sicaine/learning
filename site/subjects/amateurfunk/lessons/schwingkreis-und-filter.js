export default {
  id: 'schwingkreis-und-filter',
  title: 'Schwingkreise und Filter',
  summary: 'Tief-, Hoch- und Bandpass sowie Sperr- und Saugkreis an Schaltung und Frequenzgang erkennen, Resonanzfrequenz, Güte und Bandbreite berechnen und die richtigen Kondensatoren für HF-Filter wählen.',
  minutes: 20,
  goals: [
    'Tiefpass, Hochpass, Bandpass und Bandsperre an der **Filtercharakteristik** und an der **Schaltung** erkennen (Regel: Kondensator im Längszweig = Hochpass)',
    'Serien- und Parallelschwingkreis unterscheiden: Serienkreis **niederohmig**, Parallelkreis **hochohmig** bei [[resonanz|Resonanz]]',
    'Resonanzfrequenz $f_0 = 1/(2\\pi\\sqrt{LC})$, Güte $Q$ und Bandbreite $B = f_0/Q$ berechnen',
    '[[saugkreis|Saugkreis]] und [[sperrkreis|Sperrkreis]] auseinanderhalten und HF-taugliche Kondensatoren (Keramik, Luft) wählen',
  ],
  needs: ['elektrotechnik/schwingkreis', 'elektrotechnik/rc-rl-filter', 'elektrotechnik/bandpass-filterordnung'],
  blocks: [
    {
      id: 'filter', type: 'text', title: 'Filter als frequenzabhängiger Spannungsteiler',
      md: `
Kondensator und Spule haben einen **frequenzabhängigen** Widerstand: $X_\\mathrm{C}$ sinkt mit der Frequenz, $X_\\mathrm{L}$ steigt. Setzt man sie in einen [Spannungsteiler](wiki:Spannungsteiler|Voltage divider), entsteht ein **[Filter](wiki:Filter (Elektrotechnik)|Electronic filter)**, das bestimmte Frequenzen durchlässt und andere dämpft.[^darc-50ohm] Vier Grundtypen kennt der Katalog (ED201–ED204): Man erkennt sie an der **Filterkurve** (Ausgangsspannung über der Frequenz):

| Filter | Kurve | Wirkung |
|---|---|---|
| **[Tiefpass](wiki:Tiefpass|Low-pass filter)** | hoch links, fällt nach rechts ab | lässt tiefe Frequenzen durch, dämpft hohe |
| **[Hochpass](wiki:Hochpass|High-pass filter)** | niedrig links, steigt nach rechts | lässt hohe Frequenzen durch, dämpft tiefe |
| **[Bandpass](wiki:Bandpass|Band-pass filter)** | Hügel in der Mitte | lässt ein Frequenzband durch |
| **[Bandsperre](wiki:Bandsperre|Band-stop filter)** | Einbruch in der Mitte | sperrt ein Frequenzband |

**Die Grenzfrequenz** $f_\\mathrm{g}$ ([Grenzfrequenz](wiki:Grenzfrequenz|Cutoff frequency)) ist dort, wo die Leistung auf die Hälfte gefallen ist (−3 dB), die Spannung also auf etwa 70 %. Beim einfachen RC-Glied ist $f_\\mathrm{g} = 1/(2\\pi RC)$.

**So erkennst du die Schaltung (ED208–ED213):** Im **Längszweig** (Signalweg) und im **Querzweig** (nach Masse) sitzt je ein Bauteil.
- **Kondensator im Längszweig** — „aufrechtes **H**“ — bedeutet **Hochpass**: Der Kondensator sperrt tiefe Frequenzen (hoher $X_\\mathrm{C}$). Quer sitzt dann ein Widerstand oder eine Spule.
- **Widerstand oder Spule im Längszweig**, Kondensator quer: **Tiefpass** — hohe Frequenzen werden vom Kondensator nach Masse abgeleitet bzw. von der Spule gesperrt.

Für das Mikrofonverstärker-Tiefpassfilter (ED210) suchst du also: Widerstand (oder Spule) längs, Kondensator quer.`,
    },
    {
      id: 'warn-filter', type: 'callout', tone: 'warning', title: 'Hoch- und Tiefpass nicht verwechseln',
      md: `Die vier Antworten Tiefpass/Hochpass/Bandpass/Bandsperre werden im Katalog immer gemischt. Zwei Sicherheitsnetze: **(1)** Frequenzgang ansehen — wo ist die Kurve hoch? Links = Tiefpass. **(2)** Schaltung ansehen — Kondensator im Längszweig = Hochpass. Und **Tiefpass hinter dem Sender** filtert Oberwellen (hohe Frequenzen!) heraus; ein **Hochpass** in der Antennenweiche hält zum Beispiel Kurzwellen vom UKW-Empfänger fern.`,
    },
    {
      id: 'viz-erkennen', type: 'viz', viz: 'filter-erkennen', title: 'Filter an der Schaltung erkennen',
      params: { need: 6 },
      task: 'Erkenne **sechs Filterschaltungen in Folge** richtig. Die Erklärung nach jeder Antwort zeigt dir die Merkregel.',
    },
    {
      id: 'schwing', type: 'text', title: 'Schwingkreise: Resonanz, Güte, Bandbreite',
      md: `
Kombinierst du Spule **und** Kondensator, entsteht ein **[Schwingkreis](wiki:Schwingkreis|LC circuit)**: Energie pendelt zwischen dem elektrischen Feld des Kondensators und dem Magnetfeld der Spule hin und her — wie eine angestoßene Stimmgabel. Bei der **[[resonanz|Resonanzfrequenz]]** (vgl. [Resonanz](wiki:Resonanz|Resonance)) sind die Blindwiderstände gleich groß, $X_\\mathrm{L} = X_\\mathrm{C}$, und daraus folgt die **Thomsonsche Schwingungsformel**:[^bnetza-formelsammlung]

$$f_0 = \\frac{1}{2\\pi\\sqrt{L\\cdot C}}$$

Kleinere $L$ oder $C$ → höhere Resonanzfrequenz; vierfaches $C$ halbiert $f_0$. Die **Güte** $Q$ (vgl. [Güte](wiki:Güte)) misst, wie scharf der Kreis ist (Verluste klein = $Q$ groß), und bestimmt die **[Bandbreite](wiki:Bandbreite|Bandwidth (signal processing))**:

$$B = \\frac{f_0}{Q}$$

Ein Kreis mit $f_0 = 7{,}1\\,\\text{MHz}$ und $Q = 50$ hat $B = 142\\,\\text{kHz}$: je größer die Güte, desto schmaler das Band, in dem der Kreis anspricht.

**Serien- und Parallelschwingkreis** verhalten sich im Resonanzfall **entgegengesetzt** (ED205–ED207):

| | Serienschwingkreis | Parallelschwingkreis |
|---|---|---|
| Impedanz bei $f_0$ | **Minimum**, niederohmig | **Maximum**, **hochohmig** |
| Impedanzkurve | tiefes Tal bei $f_0$ („V“) | hoher Gipfel bei $f_0$ („Λ“) |
| Abseits von $f_0$ | steigt, bestimmt vom größeren Blindwiderstand | sinkt, bestimmt vom kleineren Blindwiderstand |

Ein Parallelschwingkreis verhält sich bei Resonanz also wie ein **hochohmiger Widerstand** — nicht wie ein niederohmiger Widerstand und nicht wie eine Spule oder ein Kondensator. Die Bilder zur Impedanz sind leicht zu unterscheiden: *Tal* = Serienkreis, *Gipfel* = Parallelkreis.`,
    },
    {
      id: 'viz-resonanz', type: 'viz', viz: 'resonance-lab', title: 'Resonanzlabor',
      params: { targetF: 7.1e6, targetQ: 100 },
      task: 'Stelle $L$, $C$ und den Verlustwiderstand so ein, dass der Kreis auf **7,1 MHz** schwingt und eine Güte von etwa **100** erreicht. Wechsle zwischen Serien- und Parallelkreis und beobachte die Impedanz.',
    },
    {
      id: 'calc-f0', type: 'numeric', title: 'Resonanzfrequenz',
      question: 'Ein Schwingkreis hat $L = 1\\,\\mu\\text{H}$ und $C = 200\\,\\text{pF}$. Wie groß ist $f_0$?',
      answer: 11.25, tolerance: 0.15, unit: 'MHz',
      hint: '$f_0 = 1/(2\\pi\\sqrt{L C})$; $L = 10^{-6}$ H, $C = 2\\cdot10^{-10}$ F.',
      explain: '$L\\cdot C = 2\\cdot10^{-16}$, $\\sqrt{\\ } = 1{,}414\\cdot10^{-8}$, mal $2\\pi$ = $8{,}886\\cdot10^{-8}$, Kehrwert $= 11{,}25\\cdot10^{6}$ Hz.',
    },
    {
      id: 'calc-bw', type: 'numeric', title: 'Bandbreite',
      question: 'Ein Parallelschwingkreis hat $f_0 = 3{,}65\\,\\text{MHz}$ und die Güte $Q = 73$. Welche Bandbreite hat er?',
      answer: 50, tolerance: 1, unit: 'kHz',
      hint: '$B = f_0/Q$.',
      explain: '$B = 3{,}65\\,\\text{MHz}/73 = 50\\,\\text{kHz}$.',
    },
    {
      id: 'sperr', type: 'text', title: 'Bandsperre und Bandpass aus Schwingkreisen',
      md: `
Mit dem entgegengesetzten Verhalten bauen wir Filter — je nachdem, **wo** der Kreis im Signalweg sitzt:

**Bandsperre** (zwei Wege):
- **[[sperrkreis|Sperrkreis]]**: ein **Parallelschwingkreis im Längszweig**. Bei Resonanz ist er hochohmig und **sperrt** die Frequenz (ED214).
- **[[saugkreis|Saugkreis]]**: ein **Serienschwingkreis im Querzweig** (nach Masse). Bei Resonanz ist er niederohmig und **saugt** die Frequenz in die Masse ab (ED215).

**Bandpass** (ebenfalls zwei Wege):
- **Serienschwingkreis im Längszweig** (niederohmig bei $f_0$ = lässt durch),
- **Parallelschwingkreis im Querzweig** (hochohmig bei $f_0$ = das Signal bleibt erhalten, andere Frequenzen werden kurzgeschlossen).

Eselsbrücke: *Sperrkreis sperrt im Signalweg* (Parallelkreis seriell), *Saugkreis saugt aus dem Signalweg heraus* (Serienkreis parallel). Bandpässe findest du in fast jedem Empfänger als Vorfilter, bei Fielddays und Contesten als Sendefilter, die Nachbarstationen vor deinen Oberwellen schützen. Mit Hoch- und Tiefpässen baut man **Diplexer** — zum Beispiel für 2 m und 70 cm an einer gemeinsamen Antenne.`,
    },
    {
      id: 'viz-filter', type: 'viz', viz: 'filter-lab', title: 'Filter-Labor',
      params: {
        builds: ['rc', 'lc'], build: 'rc', type: 'tp', init: { R: 1e3, C: 100e-9, L: 10e-3, fin: 1e3, Rb: 22, Lb: 5.03e-6, Cb: 100e-12 }, signal: 'square', fmin: 10, fmax: 1e8,
        goals: [
          { id: 'tp3k', label: 'Tiefpass mit C = 10 nF und f_g ≈ 3 kHz (±7 %)', test: s => s.build === 'rc' && s.type === 'tp' && Math.abs(s.C / 10e-9 - 1) < 0.01 && Math.abs(s.fg / 3e3 - 1) <= 0.07 },
          { id: 'bp142', label: 'Bandpass: f₀ = 14,2 MHz (±3 %) und B ≈ 200 kHz (±20 %)', test: s => s.type === 'bp' && Math.abs(s.f0 / 14.2e6 - 1) <= 0.03 && Math.abs(s.B / 200e3 - 1) <= 0.2 },
          { id: 'bs365', label: 'Bandsperre: f₀ = 3,65 MHz (±3 %) mit ≥ 20 dB Dämpfung in der Mitte', test: s => s.type === 'bs' && Math.abs(s.f0 / 3.65e6 - 1) <= 0.03 && s.att(s.f0) >= 20 },
        ],
      },
      task: 'Erreiche alle drei Ziele: (1) **RC-Tiefpass** mit $C = 10$ nF und $f_g \\approx 3$ kHz. (2) **Bandpass** (LC-Aufbau) auf 14,2 MHz mit etwa 200 kHz Bandbreite. (3) **Bandsperre** auf 3,65 MHz mit mindestens 20 dB Dämpfung in der Mitte. Tipp: erst $L$ und $C$ für $f_0$, dann $R$ für die Bandbreite.',
    },
    {
      id: 'kondensatoren', type: 'text', title: 'Kondensatoren in HF-Filtern',
      md: `
In einem HF-Filter zählt nicht nur der Kapazitätswert, sondern auch das **Hochfrequenzverhalten** des Bauteils (ED216):

- **Keramikkondensatoren** (kleine Verluste, wenig frequenz- und temperaturabhängig) und **Luftkondensatoren** (Drehkondensatoren, auch für hohe Spannungen im Antennentuner) sind **die richtige Wahl**.
- **Elektrolytkondensatoren** (Aluminium oder Tantal) sind **ungeeignet**: Ihre Kapazität ist stark frequenzabhängig, und sie haben bei hohen Frequenzen einen hohen Innenwiderstand.
- **Folienkondensatoren** sind ungeeignet, weil sie gewickelt sind und dadurch eine **Eigeninduktivität** haben (besonders ab Kurzwelle stark frequenzabhängig, schlechte Güte).

Genau wie bei den Widerständen gilt: Jedes Bauteil ist auch ein bisschen Spule — bei HF zählt die Bauform.`,
    },
    {
      id: 'quiz-fk', type: 'quiz', title: 'Welcher Kondensator ins HF-Filter?',
      question: 'Welche Kondensatoren sollen vorzugsweise für HF-Filter verwendet werden?',
      options: [
        { text: 'Keramik- oder Luftkondensatoren', correct: true, why: 'Kleine Verluste, wenig frequenzabhängig, hohe Güte.' },
        { text: 'Aluminium-Elektrolytkondensatoren', why: 'Stark frequenzabhängige Kapazität und hoher Innenwiderstand bei HF.' },
        { text: 'Tantal-Elektrolytkondensatoren', why: 'Auch Elkos: für HF ungeeignet.' },
        { text: 'Folienkondensatoren', why: 'Wickelkondensatoren haben Eigeninduktivität und schlechte Güte bei Kurzwelle.' },
      ],
    },
    {
      id: 'match-filter', type: 'match', title: 'Bauform → Filtertyp',
      prompt: 'Welches Filter entsteht?',
      pairs: [
        ['Kondensator im Längszweig, Widerstand quer', 'Hochpass'],
        ['Widerstand im Längszweig, Kondensator quer', 'Tiefpass'],
        ['Parallelschwingkreis im Längszweig', 'Sperrkreis'],
        ['Serienschwingkreis im Querzweig', 'Saugkreis'],
      ],
    },
    {
      id: 'order-impedanz', type: 'order', title: 'Reihenfolge der Resonanzfrequenzen',
      prompt: 'Sortiere diese Schwingkreise nach ihrer Resonanzfrequenz, **niedrigste zuerst** ($L = 1\\,\\mu\\text{H}$).',
      items: ['C = 1000 pF', 'C = 470 pF', 'C = 100 pF', 'C = 22 pF'],
      explain: 'Je kleiner $C$, desto höher $f_0$: 1000 pF → 5,0 MHz, 470 pF → 7,3 MHz, 100 pF → 15,9 MHz, 22 pF → 33,9 MHz.',
    },
    {
      id: 'mission-filter', type: 'callout', tone: 'mission', title: 'Funkpraxis: Wo dir Filter begegnen',
      md: `Dein Empfänger hat Bandpässe, damit nur das gewünschte Band hineinkommt; hinter dem Sender sitzt ein **Tiefpass**, der Oberwellen herausfiltert (siehe Lektion zu unerwünschten Aussendungen); ein **Saugkreis** kann einen starken Störer (z. B. Rundfunksender) abschwächen; ein **Sperrkreis** („Wave Trap“) in der Antennenzuleitung blockiert einen Störer. Beim Antennentuner bildet ein Drehkondensator mit einer Rollspule einen **Schwingkreis**, den du auf Resonanz abstimmst. Der Fachbegriff **Güte** erklärt, warum ein schmaler Quarzfilter besser trennt als ein einfacher LC-Kreis.`,
    },
    {
      id: 'video', type: 'video', youtube: '0oZhDHWorlU', label: 'Amateurfunkvorlesung Klasse E – Lektion 11 Schwingkreise (Teil 2)', channel: 'Computer Engineering @ JMU Würzburg',
      why: 'Vorlesungsaufzeichnung der Universität Würzburg zu Schwingkreisen, zur Vertiefung dieser Lektion.',
    },
    {
      id: 'recall-filter', type: 'recall', title: 'In eigenen Worten',
      prompt: 'Erkläre den Unterschied zwischen Serien- und Parallelschwingkreis bei Resonanz und wie daraus Saugkreis und Sperrkreis entstehen. Wie berechnest du Resonanzfrequenz und Bandbreite?',
      answer: 'Bei Resonanz sind X_L und X_C gleich. Der Serienschwingkreis ist dann niederohmig (Impedanzminimum), der Parallelschwingkreis hochohmig (Impedanzmaximum). Ein Parallelkreis im Signalweg sperrt die Resonanzfrequenz (Sperrkreis), ein Serienkreis quer zum Signalweg saugt sie ab (Saugkreis). f0 = 1/(2π√(L·C)), B = f0/Q mit Güte Q.',
      cards: ['sf-resonanz', 'sf-sperr'],
    },
  ],
  cards: [
    { id: 'sf-typen', front: 'Filterkurven: Tiefpass, Hochpass, Bandpass, Bandsperre?', back: 'Tiefpass: hoch links. Hochpass: hoch rechts. Bandpass: Hügel in der Mitte. Bandsperre: Einbruch in der Mitte.' },
    { id: 'sf-h', front: 'Schaltung: Hochpass oder Tiefpass?', back: 'Kondensator im Längszweig („H“) = **Hochpass**. Widerstand oder Spule im Längszweig, C quer = **Tiefpass**.' },
    { id: 'sf-fg', front: 'Grenzfrequenz?', back: 'Leistung auf die Hälfte (−3 dB), Spannung auf ≈ 70 %. RC: $f_\\mathrm{g}=1/(2\\pi RC)$.' },
    { id: 'sf-resonanz', front: 'Resonanzfrequenz eines Schwingkreises?', back: '$f_0=\\dfrac{1}{2\\pi\\sqrt{L\\cdot C}}$ (dort $X_\\mathrm{L}=X_\\mathrm{C}$).' },
    { id: 'sf-b', front: 'Bandbreite und Güte?', back: '$B=f_0/Q$ — hohe Güte, schmale Bandbreite.' },
    { id: 'sf-serie', front: 'Serienschwingkreis bei Resonanz?', back: 'Impedanzminimum, **niederohmig**. Kurve: Tal.' },
    { id: 'sf-par', front: 'Parallelschwingkreis bei Resonanz?', back: 'Impedanzmaximum, **hochohmig** (wie ein hochohmiger Widerstand). Kurve: Gipfel.' },
    { id: 'sf-sperr', front: 'Sperrkreis vs. Saugkreis?', back: 'Sperrkreis: Parallelkreis im Signalweg (sperrt). Saugkreis: Serienkreis quer zum Signalweg (saugt ab). Beides Bandsperren.' },
    { id: 'sf-bp', front: 'Bandpass aus Schwingkreisen?', back: 'Serienkreis im Längszweig oder Parallelkreis im Querzweig.' },
    { id: 'sf-tpsender', front: 'Wozu ein Tiefpass hinter dem Sender?', back: 'Er unterdrückt Oberwellen (hohe Frequenzen).' },
    { id: 'sf-hfc', front: 'Welche Kondensatoren für HF-Filter?', back: 'Keramik- oder Luftkondensatoren. Nicht Elkos (Frequenzgang, Innenwiderstand) und nicht Folien (Eigeninduktivität).' },
  ],
};
