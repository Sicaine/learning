export default {
  id: 'transistor-und-verstaerker',
  title: 'Transistor und Verstärker',
  summary: 'Aufbau, Anschlüsse und Schaltzeichen des Bipolartransistors, Stromverstärkung und Arbeitspunkt, dazu was ein Verstärker ist, warum er Energie braucht und weshalb SSB-Endstufen linear sein müssen.',
  minutes: 20,
  goals: [
    'Den [[bipolartransistor|Bipolartransistor]] (NPN/PNP) mit seinen Anschlüssen **Emitter, Basis, Kollektor** und seinem Schaltzeichen erkennen',
    'Stromverstärkung erklären: ein kleiner Basisstrom **steuert** einen großen Kollektorstrom ($I_\\mathrm{E} = I_\\mathrm{C} + I_\\mathrm{B}$)',
    'Beurteilen, ob ein Transistor leitet (NPN: $U_\\mathrm{BE}\\approx 0{,}6$ V und Kollektor positiver als Emitter)',
    'Verstärker einordnen: Leistungsverstärkung braucht eine Spannungsquelle; NF-, HF-Leistungsverstärker, lineare SSB-Endstufe',
  ],
  needs: ['elektrotechnik/bipolartransistor', 'elektrotechnik/emitterschaltung', 'elektrotechnik/halbleiter-pn'],
  blocks: [
    {
      id: 'transistor', type: 'text', title: 'Der Transistor: Halbleiter mit drei Anschlüssen',
      md: `
Ein [Transistor](wiki:Transistor|Transistor) ist ein **[Halbleiterbauelement](wiki:Halbleiter|Semiconductor)** (und kein Laser-, Nichtleiter- oder Kaltleiterbauelement, EC602). Mit ihm baut man **Schalter, Verstärker und steuerbare Widerstände** (EC601) — Diode, Kondensator oder Transformator können das nicht. Es gibt zwei große Familien:

- **Bipolartransistoren** (bipolar = beide Ladungsträgerarten Elektronen **und** Löcher): die Typen **NPN** und **PNP** (EC604).
- **Feldeffekttransistoren (FET):** [Sperrschicht-FET](wiki:Sperrschicht-Feldeffekttransistor|JFET) und Isolierschicht-FET ([MOSFET](wiki:MOSFET|MOSFET)), auch Dual-Gate-MOSFETs — sie werden durch eine **Spannung** am Gate gesteuert und gehören **nicht** zu den bipolaren.

Der [Bipolartransistor](wiki:Bipolartransistor|Bipolar junction transistor) hat drei Anschlüsse: **Emitter (E)**, **Basis (B)** und **Kollektor (C)** (EC608). Drain, Gate, Source sind die FET-Anschlüsse.[^darc-50ohm] Im Schaltzeichen sitzt die Basis auf der **Seite des senkrechten Strichs**, Emitter und Kollektor liegen schräg daran. Der **Pfeil am Emitter** zeigt die technische Stromrichtung: beim **NPN** vom Transistor **weg** (nach außen), beim **PNP** zur **Basis hin** (EC606, EC607). **Anschlüsse im Bild erkennen (EC605, EC609):** Der Anschluss mit dem **Pfeil** ist der **Emitter**, der Anschluss am **senkrechten Strich** die **Basis**, der dritte (schräg ohne Pfeil) der **Kollektor**. Bei einem NPN-Symbol mit Basis links ist also oben der Kollektor (1), links die Basis (2) und unten der Emitter (3). Das Gehäuse spielt für den Strom keine Rolle.

> Eselsbrücke: **NPN = „Nicht Pfeil Nach innen“**, der Pfeil zeigt hinaus. Beim PNP zeigt er zur Basis.`,
    },
    {
      id: 'viz-sym', type: 'viz', viz: 'schaltzeichen-trainer', title: 'Transistor-Schaltzeichen',
      params: { set: ['npn', 'pnp', 'diode', 'led', 'zdiode', 'kondensator', 'spule', 'trafo', 'widerstand', 'batterie'], need: 8 },
      task: 'Erkenne **acht** Schaltzeichen in Folge, darunter NPN und PNP.',
    },
    {
      id: 'strom', type: 'text', title: 'Stromverstärkung und leitender Zustand',
      md: `
Das Prinzip des Bipolartransistors: Ein **kleiner Basisstrom** $I_\\mathrm{B}$ **steuert** einen **großen Kollektorstrom** $I_\\mathrm{C}$. Das Verhältnis heißt **Stromverstärkung** (Formelsammlung):[^bnetza-formelsammlung]

$$B = \\frac{I_\\mathrm{C}}{I_\\mathrm{B}} \\quad\\text{(typisch 100 und mehr)}$$

Es wird also nicht der Emitterstrom gesteuert (EC603), und der Kollektor steuert nicht den Emitter. Durch den **Emitter fließt der größte Strom**, denn Basis- und Kollektorstrom fließen dort zusammen heraus: $I_\\mathrm{E} = I_\\mathrm{C} + I_\\mathrm{B}$ (EC611).

**Wann leitet der Transistor?** Die Basis-Emitter-Strecke verhält sich wie eine Diode. Beim **NPN** muss die Basis um etwa **0,6 V positiver als der Emitter** sein: $U_\\mathrm{BE}\\approx 0{,}6\\ldots0{,}7\\,\\text{V}$ (EC610, **nicht** −0,6 V und nicht 0 V). Außerdem muss der **Kollektor positiver als der Emitter** liegen, damit der Kollektorstrom fließen kann. Beim **PNP** ist alles umgekehrt gepolt: Basis ca. 0,6 V **unter** dem Emitter, Kollektor **unter** dem Emitter. So beantwortest du die Bildfragen EC612–EC615: Prüfe zuerst $U_\\mathrm{BE}$ (richtiges Vorzeichen, etwa 0,6 V), dann die Lage des Kollektors.

| Fall | NPN | Ergebnis |
|---|---|---|
| E = 0 V, B = +0,7 V, C = +5,6 V | $U_\\mathrm{BE} = 0{,}7$ V, C über E | **leitet** |
| E = 0 V, B = −2 V, C = +5,6 V | $U_\\mathrm{BE}$ negativ | sperrt |
| E = 0 V, B = 0 V, C = +5,6 V | $U_\\mathrm{BE} = 0$ | sperrt |`,
    },
    {
      id: 'warn-transistor', type: 'callout', tone: 'warning', title: 'Basisstrom, Emitterstrom — wer steuert wen?',
      md: `Alle falschen Antworten bei der Stromverstärkung vertauschen die Anschlüsse: „kleiner Emitterstrom steuert großen Basisstrom“ oder „kleiner Kollektorstrom steuert großen Emitterstrom“. Merke: Gesteuert wird **vom Eingang (Basis)** aus; der **Ausgangsstrom (Kollektor)** ist das Vielfache. Und: $U_\\mathrm{BE}$ ist beim NPN **positiv**, nie negativ.`,
    },
    {
      id: 'viz-check', type: 'viz', viz: 'transistor-check', title: 'Fließt Kollektorstrom?',
      params: { need: 5 },
      task: 'Beurteile **fünf Schaltungen in Folge** richtig: Fließt ein Kollektorstrom? Achte auf NPN und PNP.',
    },
    {
      id: 'viz-bjt', type: 'viz', viz: 'bjt-curves', title: 'Kennlinien und Arbeitspunkt',
      task: 'Stelle mit dem Basisstrom einen **Kollektorstrom von 20 mA** ein und beobachte, wie der Arbeitspunkt auf der Lastgeraden wandert.',
    },
    {
      id: 'calc-b', type: 'numeric', title: 'Stromverstärkung',
      question: 'Ein Transistor hat die Stromverstärkung $B = 150$. Welcher Kollektorstrom fließt bei einem Basisstrom von $0{,}2\\,\\text{mA}$?',
      answer: 30, tolerance: 0.3, unit: 'mA',
      hint: '$I_\\mathrm{C} = B\\cdot I_\\mathrm{B}$.',
      explain: '$I_\\mathrm{C} = 150\\cdot0{,}2\\,\\text{mA} = 30\\,\\text{mA}$; der Emitterstrom ist $I_\\mathrm{E} = I_\\mathrm{C} + I_\\mathrm{B} = 30{,}2\\,\\text{mA}$.',
    },
    {
      id: 'verstaerker', type: 'text', title: 'Verstärker',
      md: `
Ein [Verstärker](wiki:Verstärker (Elektrotechnik)|Amplifier) liefert am Ausgang **mehr Leistung**, als am Eingang hineingeht. Woher kommt sie? **Aus der Spannungsquelle**: Der Verstärker steuert nur, wie viel Leistung aus der Stromversorgung zum Ausgang fließt — deshalb braucht er immer eine ausreichend belastbare Spannungsquelle (ED401). Ohne Versorgung gibt es keine Verstärkung. Dazu passend die dB-Schreibweise: Das **Verstärkungsmaß** $g = 10\\cdot\\log(P_\\mathrm{aus}/P_\\mathrm{ein})$ in dB ([Dezibel](wiki:Dezibel|Bel (unit))), +3 dB = Verdopplung.

Man unterscheidet Verstärker nach dem Frequenzbereich:
- **NF-Verstärker** (Niederfrequenz, Audio): z. B. Mikrofonverstärker oder die Endstufe für den Lautsprecher. Im Schaltplan erkennst du ihn am **Lautsprecher**-Symbol am Ausgang und Koppelkondensatoren (ED402).
- **HF-Leistungsverstärker** (Endstufe, PA): **hebt das Sendesignal an**, bevor es zur Antenne geht (ED403) — er moduliert, mischt oder filtert nicht.
- **ZF-Verstärker** im Empfänger arbeiten auf der Zwischenfrequenz.

**Mikrofonverstärker.** Für Sprache braucht man nur einen kleinen Frequenzbereich: Man begrenzt oben und unten durch eine **Bandpasscharakteristik** — tiefe Anteile (unter ca. 300 Hz, Netzbrummen, Poltern) und hohe Anteile (über ca. 3 kHz) werden unterdrückt. Der geeignete Frequenzgang ist daher **ein Bandpass** (flacher Durchlassbereich, abfallende Flanken, EF307). Eine NF-Bandbreite von **ca. 2,5 kHz** genügt für gute Sprachverständlichkeit (EF308) — 1 kHz klingt zu dumpf, 6 kHz oder mehr verschwendet Bandbreite.[^darc-50ohm]

**Linearität.** Ein Verstärker ist **linear**, wenn doppelte Eingangsamplitude zu doppelter Ausgangsamplitude führt. Bei SSB steckt die Information in der **Amplitude** (und Phase) des Signals; deshalb muss die Endstufe eines **SSB-Senders linear** sein (EF403) — kein Begrenzer, kein Vervielfacher. Nichtlineare Verstärkung erzeugt Frequenzanteile, die im Eingangssignal nicht vorkommen: im NF-Bereich **Verzerrungen** (siehe [Klirrfaktor](wiki:Klirrfaktor|Total harmonic distortion#Definitions and examples)), im HF-Bereich **Oberwellen** und „Splatter“ — beides stört andere Stationen. Bei FM ist Nichtlinearität dagegen tolerierbar, weil die Information in der Frequenz steckt.

Die **Stromzufuhr eines Senders** sollte gegen HF-Einstrahlung **gut entkoppelt** sein (Drosseln, Kondensatoren), damit keine HF in die Versorgung gelangt und über sie unerwünschte Rückkopplungen entstehen — nicht hochohmig, nicht über das PA-Gehäuse geführt (EF405).`,
    },
    {
      id: 'viz-amp', type: 'viz', viz: 'ce-amplifier', title: 'Emitterschaltung als Verstärker',
      params: { mode: 'amp', targetVpp: 1 },
      task: 'Stelle den Arbeitspunkt so ein, dass das Ausgangssignal die Zielamplitude erreicht, ohne sichtbar zu verzerren. Beobachte, was bei Übersteuerung mit der Sinuskurve passiert.',
    },
    {
      id: 'quiz-verst', type: 'quiz', title: 'Verstärker verstehen',
      question: 'Ein Verstärker gibt am Ausgang 10 W ab, am Eingang gehen 0,1 W hinein. Woher kommt die zusätzliche Leistung?',
      options: [
        { text: 'Aus der Spannungsquelle (Stromversorgung) des Verstärkers.', correct: true, why: 'Der Verstärker steuert nur den Energiefluss aus der Versorgung.' },
        { text: 'Aus dem Transistor selbst, der Energie erzeugt.', why: 'Ein Bauteil erzeugt keine Energie, es wandelt sie nur um und steuert sie.' },
        { text: 'Aus der Antenne.', why: 'Die Antenne liefert beim Senden keine Leistung zurück.' },
        { text: 'Sie entsteht durch die Stromverstärkung B aus dem Nichts.', why: 'Stromverstärkung heißt: Basisstrom steuert Kollektorstrom; die Leistung kommt aus der Betriebsspannung.' },
      ],
    },
    {
      id: 'match-verst', type: 'match', title: 'Verstärker und Zweck',
      prompt: 'Ordne zu.',
      pairs: [
        ['Lautsprecher am Ausgang', 'NF-Verstärker'],
        ['Anhebung des Sendesignals vor der Antenne', 'HF-Leistungsverstärker'],
        ['SSB-Endstufe', 'linearer Verstärker'],
        ['Mikrofonverstärker für Sprache', 'Bandpass, ca. 2,5 kHz'],
      ],
    },
    {
      id: 'mission-trans', type: 'callout', tone: 'mission', title: 'Funkpraxis: Linear heißt sauber senden',
      md: `Wer seinen Transceiver zu laut besprechen lässt (Mikrofonverstärkung zu hoch) oder ein SSB-Signal mit einer übersteuerten Endstufe verstärkt, erzeugt **Verzerrungen und Splatter**: Dein Signal belegt dann mehr Bandbreite als nötig und stört die Nachbarfrequenzen. Darum sind **ALC** und die richtige Mikrofonaussteuerung wichtig, und darum sind die SSB-Endstufen **linear**. Der Transistor in der PA muss bei richtigem Arbeitspunkt arbeiten und, wie du gesehen hast, mit ausreichend entkoppelter, stabiler Versorgung.`,
    },
    {
      id: 'recall-trans', type: 'recall', title: 'In eigenen Worten',
      prompt: 'Beschreibe, wie ein NPN-Transistor funktioniert (Anschlüsse, Steuerung, Bedingung zum Leiten) und warum die Endstufe eines SSB-Senders linear sein muss.',
      answer: 'Der NPN-Transistor hat Emitter, Basis und Kollektor. Ein kleiner Basisstrom steuert einen großen Kollektorstrom (Stromverstärkung B = I_C/I_B); der Emitterstrom ist die Summe aus beiden und damit der größte. Er leitet, wenn die Basis etwa 0,6 V positiver als der Emitter ist und der Kollektor positiver als der Emitter liegt. Die SSB-Endstufe muss linear sein, weil die Information in der Amplitude steckt; Nichtlinearität erzeugt Verzerrungen, Oberwellen und Splatter, die andere Stationen stören.',
      cards: ['trv-strom', 'trv-linear'],
    },
  ],
  cards: [
    { id: 'trv-art', front: 'Was ist ein Transistor? Welche Typen sind bipolar?', back: 'Halbleiterbauelement (Schalter, Verstärker, steuerbarer Widerstand). Bipolar: **NPN** und **PNP**; FETs (Sperrschicht, MOSFET) sind nicht bipolar.' },
    { id: 'trv-anschl', front: 'Anschlüsse des Bipolartransistors?', back: '**Emitter, Basis, Kollektor** (Drain, Gate, Source gehören zum FET).' },
    { id: 'trv-pfeil', front: 'Schaltzeichen NPN vs. PNP?', back: 'Pfeil am Emitter: NPN nach **außen** (vom Transistor weg), PNP **zur Basis**.' },
    { id: 'trv-strom', front: 'Was ist Stromverstärkung?', back: 'Ein kleiner **Basisstrom** steuert einen großen **Kollektorstrom**: $B=I_\\mathrm{C}/I_\\mathrm{B}$.' },
    { id: 'trv-emitter', front: 'Durch welchen Anschluss fließt der größte Strom?', back: 'Durch den **Emitter**: $I_\\mathrm{E}=I_\\mathrm{C}+I_\\mathrm{B}$.' },
    { id: 'trv-ube', front: 'U_BE für den leitenden Transistor?', back: 'Etwa **+0,6 V** (NPN, Silizium). Nicht negativ, nicht 0.' },
    { id: 'trv-kollektor', front: 'Wann fließt Kollektorstrom (NPN)?', back: 'U_BE ≈ 0,6 V **und** Kollektor positiver als Emitter. PNP: alles umgekehrt.' },
    { id: 'trv-verst', front: 'Leistungsverstärkung: Woher kommt die Leistung?', back: 'Aus der **Spannungsquelle**; ohne Versorgung keine Verstärkung.' },
    { id: 'trv-nf', front: 'NF-Verstärker im Schaltplan erkennen?', back: 'Lautsprecher (oder Kopfhörer) am Ausgang, Koppelkondensator am Eingang.' },
    { id: 'trv-hf', front: 'Zweck eines HF-Leistungsverstärkers?', back: 'Anhebung des Sendesignals (nicht Modulation, Mischung oder Filterung).' },
    { id: 'trv-linear', front: 'Endstufe eines SSB-Senders?', back: '**Linearer** Verstärker (sonst Verzerrungen, Oberwellen, Splatter).' },
    { id: 'trv-mikro', front: 'Mikrofonverstärker: Frequenzgang und Bandbreite?', back: 'Bandpass (ca. 300 Hz bis 3 kHz); für gute Sprachverständlichkeit mindestens ca. **2,5 kHz**.' },
    { id: 'trv-entkoppelt', front: 'Stromzufuhr eines Senders?', back: 'Gegen HF-Einstrahlung **gut entkoppelt**.' },
  ],
};
