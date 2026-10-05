export default {
  id: 'flipflops',
  title: 'Speichern: Latches und Flipflops',
  summary: 'Aus zwei kreuzgekoppelten Gattern entsteht ein Speicher für ein Bit. Du probierst den SR-Latch aus, siehst den Unterschied zwischen pegel- und flankengesteuerten Bausteinen und erkennst im T-Flipflop einen Frequenzteiler.',
  minutes: 30,
  needs: ['logikgatter'],
  goals: [
    'Erklären, wie die [[mitkopplung]] in einem [[sr-latch|SR-Latch]] ein Bit speichert',
    'Die Wahrheitstabelle des SR-Latch aus NOR-Gattern lesen und den verbotenen Zustand benennen',
    'Den Unterschied zwischen pegelgesteuertem [[latch|Latch]] und flankengesteuertem [[d-flipflop|D-Flipflop]] beschreiben',
    'Im [[t-flipflop|T-Flipflop]] einen Frequenzteiler 2:1 erkennen',
    'Eine Speicheraufgabe als Folge von Daten anlegen – Taktflanke – Ausgang folgt – Daten ändern sich einordnen',
  ],
  blocks: [
    {
      id: 'idee', type: 'text', title: 'Ein Schalter, der sich erinnert',
      md: `
Ein Logikgatter hat kein Gedächtnis: Sein Ausgang hängt **nur** von den Eingängen ab, die jetzt anliegen. Für einen [Rechner](wiki:Computer|Computer), ein Funkgerät mit Kanalspeicher oder eine Frequenzanzeige braucht man aber **Zustände**, die bleiben, wenn der Auslöser verschwindet.

Das Prinzip ist die [[mitkopplung|Mitkopplung]]: Der Ausgang eines Gatters wird auf den Eingang eines zweiten gelegt, dessen Ausgang wieder auf den ersten. Zwei [NOR-Gatter](wiki:NOR-Gatter|NOR gate) über Kreuz verschaltet halten sich gegenseitig fest – wie zwei Wippen, die sich gegenseitig blockieren: Hat Gatter 1 den Ausgang 1, hält er den Eingang von Gatter 2 auf 1 und damit dessen Ausgang auf 0; das stützt wiederum Gatter 1. Beide Lagen sind **stabil**. Das ist ein **bistabiles** Element – ein [Flipflop](wiki:Flipflop|Flip-flop (electronics)) im weiten Sinn.[^wp-flipflop]

Ein kurzer Impuls auf einen der Eingänge kippt die Wippe von einer Lage in die andere, danach bleibt sie liegen: Das Bit ist gespeichert. Man schreibt $Q$ für den Ausgang und $\\bar Q$ für sein Gegenstück.`,
    },
    {
      id: 'sr-tabelle', type: 'text', title: 'Der SR-Latch aus NOR-Gattern',
      md: `
Die [Wahrheitstabelle](wiki:Wahrheitstabelle|Truth table) kennst du von den Gattern; hier kommt der alte Zustand $Q$ als zusätzliche Größe dazu. Die Eingänge heißen **S** (*set*, setzen) und **R** (*reset*, rücksetzen). Bei NOR-Gattern sind sie *aktiv high*:

<table><tr><th>S</th><th>R</th><th>Q (neu)</th><th>Bedeutung</th></tr>
<tr><td>0</td><td>0</td><td>Q (alt)</td><td>**speichern** – nichts ändert sich</td></tr>
<tr><td>1</td><td>0</td><td>1</td><td>**setzen**</td></tr>
<tr><td>0</td><td>1</td><td>0</td><td>**rücksetzen**</td></tr>
<tr><td>1</td><td>1</td><td>(0, $\\bar Q$ = 0)</td><td>**verboten**: beide Ausgänge 0, beim Loslassen beider Eingänge landet der Latch zufällig in einer Lage</td></tr></table>

Aus NAND-Gattern baut man dasselbe mit invertierten Eingängen ($\\bar S$, $\\bar R$ aktiv low) – dann ist $\\bar S=\\bar R=0$ der verbotene Zustand. Das ist der klassische Entprell-Trick für Taster ([Prellen](wiki:Prellen|Switch#Contact bounce) der Kontakte): Ein SR-Latch macht aus einem prellenden Kontakt eine saubere Flanke.`,
    },
    {
      id: 'video', type: 'video', youtube: 'GgKkg4XlD74', label: 'Grundlagen RS-Flipflop einfach erklärt / Digitaltechnik', channel: 'AlexTbg - SimpleLearning', minutes: 4,
      why: 'Kurz gehalten (gut vier Minuten): Das RS-Flipflop aus zwei Gattern, mit Wahrheitstabelle und Zeitdiagramm – eine gute Wiederholung der Wippen-Idee, bevor du in der Demo selbst schaltest.',
    },
    {
      id: 'viz-sr', type: 'viz', viz: 'flipflop-lab', title: 'SR-Latch ausprobieren',
      intro: 'Schalte S und R und beobachte Q und $\\bar Q$ im Zeitdiagramm. Der Takt spielt beim SR-Latch keine Rolle.',
      params: { mode: 'sr', modes: ['sr'], goals: ['hold'] },
      task: 'Setze Q mit **S = 1**, lass S wieder los (**S = R = 0**) und beobachte: Q **bleibt** 1. Probiere auch den verbotenen Zustand S = R = 1.',
    },
    {
      id: 'takt', type: 'text', title: 'Mit Takt: Latch gegen Flipflop',
      md: `
In einem Rechenwerk sollen viele Speicher **gleichzeitig** neue Werte übernehmen. Dafür gibt es einen gemeinsamen **Takt** ([Taktsignal](wiki:Taktsignal|Clock signal)). Der **D-Latch** (D = *data*) hat einen Takt- („Enable"-)Eingang: Solange der Takt **high** ist, ist der Latch *transparent* – Q folgt D (auch wenn D sich ändert); fällt der Takt auf low, friert der letzte Wert ein. Das nennt man **pegelgesteuert**.

Das **D-Flipflop** ist **flankengesteuert**: Es übernimmt D nur im Augenblick der Taktflanke (steigende oder fallende) und ignoriert D sonst völlig. Man baut es aus zwei hintereinandergeschalteten Latches mit gegenphasigem Takt (*Master-Slave*): Während des Taktpegels sammelt der erste Latch, an der Flanke gibt der zweite weiter.

Damit das zuverlässig klappt, muss D **vor** der Flanke eine kurze Zeit stabil sein (*Setup-Zeit*) und danach noch kurz stehen bleiben (*Hold-Zeit*). Verletzt man das, kann der Ausgang für kurze Zeit zwischen 0 und 1 hängen bleiben – **[Metastabilität](wiki:Metastabilität|Metastability)**.`,
    },
    {
      id: 'viz-dff', type: 'viz', viz: 'flipflop-lab', title: 'Latch gegen Flipflop',
      intro: 'Wechsle zwischen D-Latch (Pegel) und D-Flipflop (Flanke), schalte D und vergleiche, wann Q reagiert.',
      params: { mode: 'dlatch', modes: ['dlatch', 'dff'], goals: ['edge'] },
      task: 'Wähle das **D-Flipflop**, ändere D und lasse **zwei Taktflanken** vorbeiziehen, bei denen Q den Wert von D übernimmt und dabei wechselt. Vergleiche mit dem D-Latch: Dort folgt Q auch zwischen den Flanken.',
    },
    {
      id: 't-ff', type: 'text', title: 'T-Flipflop: aus Speichern wird Teilen',
      md: `
Verbindet man beim D-Flipflop den Ausgang $\\bar Q$ mit dem Eingang D, kippt Q mit **jeder** Taktflanke um: 0 → 1 → 0 → 1 … Der Ausgang durchläuft also nur **eine Periode je zwei Taktperioden** – er hat die **halbe Frequenz**. Dieses *toggle*-Verhalten heißt **T-Flipflop** (T = *toggle*).

$$f_Q = \\frac{f_\\text{Takt}}{2}$$

Hintereinandergeschaltet teilt jede Stufe durch 2 (ein [Frequenzteiler](wiki:Frequenzteiler|Frequency divider)): drei Stufen teilen durch 8, zehn Stufen durch 1024. Das ist die Grundlage der Frequenzteiler und Zähler – das Thema der nächsten Lektion. Ein JK-Flipflop kann noch mehr (setzen, rücksetzen, speichern, toggeln), in der Praxis dient es aber vor allem als universeller Baustein für T und D.`,
    },
    {
      id: 'viz-t', type: 'viz', viz: 'flipflop-lab', title: 'Teilen durch zwei',
      intro: 'Das T-Flipflop kippt bei jeder Taktflanke um. Vergleiche Takt und Q im Zeitdiagramm.',
      params: { mode: 't', modes: ['t'], goals: ['divide'] },
      task: 'Beobachte **sechs Taktflanken** des T-Flipflops (T = 1). Erkenne: Q schwingt mit der **halben** Taktfrequenz.',
    },
    {
      id: 'quiz-verboten', type: 'quiz', title: 'Der verbotene Zustand',
      question: 'Welcher Eingangszustand ist beim SR-Latch aus NOR-Gattern verboten?',
      options: [
        { text: 'S = 1 und R = 1', correct: true, why: 'Beide Ausgänge werden 0, $Q=\\bar Q$ widerspricht dem Prinzip „Gegenstück". Beim gleichzeitigen Loslassen ist der Folgezustand nicht vorhersagbar.' },
        { text: 'S = 0 und R = 0', correct: false, why: 'Das ist der **Speicherzustand**: Q behält seinen Wert.' },
        { text: 'S = 1 und R = 0', correct: false, why: 'Das ist „Setzen": Q wird 1.' },
        { text: 'S = 0 und R = 1', correct: false, why: 'Das ist „Rücksetzen": Q wird 0.' },
      ],
    },
    {
      id: 'calc-teilen', type: 'numeric', title: 'Frequenzhalbierer',
      question: 'Ein T-Flipflop (T = 1) wird mit einem Takt von $1\\,\\text{kHz}$ betrieben. Welche Frequenz hat der Ausgang Q?',
      answer: 500, tolerance: 1, unit: 'Hz',
      hint: 'Q kippt bei jeder Taktflanke einmal; eine volle Periode von Q braucht zwei Taktperioden.',
      explain: '$f_Q = 1\\,\\text{kHz}/2 = 500\\,\\text{Hz}$.',
    },
    {
      id: 'calc-kette', type: 'numeric', title: 'Drei Stufen',
      question: 'Drei T-Flipflops sind hintereinandergeschaltet. Am Eingang liegt $1\\,\\text{MHz}$. Welche Frequenz hat der Ausgang der letzten Stufe in kHz?',
      answer: 125, tolerance: 0.5, unit: 'kHz',
      hint: 'Jede Stufe halbiert die Frequenz: Teilerverhältnis $2^3$.',
      explain: '$1\\,\\text{MHz}/2^3 = 1000\\,\\text{kHz}/8 = 125\\,\\text{kHz}$.',
    },
    {
      id: 'order-speichern', type: 'order', title: 'Daten werden gespeichert',
      prompt: 'Bringe den Ablauf beim Speichern in einem D-Flipflop in die richtige Reihenfolge.',
      items: [
        'Das Datenbit wird an D angelegt und bleibt kurz stabil (Setup-Zeit)',
        'Die aktive Taktflanke kommt',
        'Der Ausgang Q übernimmt den Wert von D',
        'D ändert sich wieder',
        'Q behält den gespeicherten Wert bis zur nächsten Taktflanke',
      ],
      explain: 'Zwischen den Flanken ist ein D-Flipflop „taub" – das unterscheidet es vom pegelgesteuerten Latch.',
    },
    {
      id: 'match-arten', type: 'match', title: 'Bausteine und ihre Funktion',
      prompt: 'Ordne jedem Baustein seine Funktion zu.',
      pairs: [
        ['SR-Latch', 'setzen und rücksetzen'],
        ['D-Latch', 'Eingang durchlassen, solange der Takt high ist'],
        ['D-Flipflop', 'Daten an der Taktflanke übernehmen'],
        ['T-Flipflop', 'bei jeder Taktflanke umschalten (Teiler 2:1)'],
      ],
    },
    {
      id: 'recall-latch', type: 'recall', title: 'Erkläre es in eigenen Worten',
      prompt: 'Was unterscheidet einen Latch von einem flankengesteuerten Flipflop? Warum bevorzugt man in Rechenwerken Flipflops?',
      answer: 'Ein Latch ist pegelgesteuert: Solange der Takt aktiv (high) ist, folgt der Ausgang dem Eingang – Änderungen von D während dieser Zeit laufen durch. Ein Flipflop ist flankengesteuert: Es übernimmt den Wert nur im Moment der Taktflanke und ignoriert D danach. Dadurch ändern sich in einem getakteten System alle Speicher gleichzeitig und nur einmal pro Takt; die Signale zwischen den Flipflops dürfen sich „einschwingen", ohne dass Zwischenzustände übernommen werden.',
      hints: ['Wann ist ein Latch „transparent"?', 'Wie vermeidet die Flankensteuerung Durchlaufen von Änderungen?'],
      cards: ['latch-vs-ff', 'dff-funktion'],
    },
    {
      id: 'mission', type: 'callout', tone: 'mission', title: 'Prüfung und Funkpraxis',
      md: `
Flipflops selbst werden in der Klasse-E-Prüfung nicht abgefragt; der Katalog verlangt im Digitalteil vor allem das **Dualsystem** (EA201–EA208) und – in den Messtechnik-Fragen – den **Frequenzzähler** mit vorgeschaltetem Teiler (**EI504**: 10:1-Teiler vor dem Zähler).[^bnetza-pruefungsfragen-2024] Genau dafür braucht man Flipflops: In Frequenzzählern und Synthesizern zählen und teilen Ketten aus Flipflops die Frequenz herunter, und in jedem Funkgerät mit Kanalspeicher und Display halten Latches die Daten fest. Wer die Bausteine kennt, versteht die Blockschaltbilder der nächsten Lektion.`,
    },
    {
      id: 'warning', type: 'callout', tone: 'warning', title: 'Typische Fehlvorstellung',
      md: `
„Ein Flipflop speichert ohne Takt." – Das hängt vom Typ ab: Der **SR-Latch** braucht keinen Takt, er speichert, solange Spannung anliegt. Ein **D-Flipflop** übernimmt dagegen nur an der Taktflanke; zwischen den Flanken ist D egal. Und: Ein Latch ist **kein** Flipflop im engen Sinn – Latch = Pegel, Flipflop = Flanke. Beide sind *flüchtig*: Ohne Betriebsspannung ist das Bit weg.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>Deutsch</th><th>English</th><th>Notiz</th></tr>
<tr><td>Flipflop, Kippstufe</td><td>flip-flop</td><td>bistabil</td></tr>
<tr><td>Zwischenspeicher</td><td>latch</td><td>pegelgesteuert</td></tr>
<tr><td>setzen / rücksetzen</td><td>set / reset</td><td>S, R</td></tr>
<tr><td>Taktflanke (steigend/fallend)</td><td>clock edge (rising/falling)</td><td></td></tr>
<tr><td>Vorbereitungszeit / Haltezeit</td><td>setup time / hold time</td><td>um die Flanke</td></tr>
<tr><td>Kippen (umschalten)</td><td>toggle</td><td>T-Flipflop</td></tr>
<tr><td>Frequenzteiler</td><td>frequency divider</td><td>2:1 je Flipflop</td></tr></table>`,
    },
    {
      id: 'deep-meta', type: 'callout', tone: 'deep', title: 'Metastabilität',
      md: `
Ein Flipflop hat zwei stabile Lagen und eine dazwischen *labile*, wie ein Ball auf der Spitze eines Hügels zwischen zwei Tälern. Ändert sich D genau im Moment der Taktflanke, kann der Ball auf der Spitze liegen bleiben: Der Ausgang hängt eine unvorhersehbare Zeit auf einem Zwischenpegel, bevor er in 0 oder 1 fällt. Bei **asynchronen** Eingängen (z. B. einem Tastendruck, der nichts mit dem Takt zu tun hat) lässt sich das nicht ganz vermeiden; man reduziert die Wahrscheinlichkeit durch zwei hintereinandergeschaltete Flipflops (*Synchronisierer*), die dem ersten Zeit zum Entscheiden geben.`,
    },
  ],
  cards: [
    { id: 'latch-idee', front: 'Wie speichert ein SR-Latch ein Bit?', back: 'Zwei kreuzgekoppelte NOR- (oder NAND-)Gatter halten sich durch Mitkopplung gegenseitig in einer von zwei stabilen Lagen.' },
    { id: 'sr-tabelle', front: 'SR-Latch (NOR): Tabelle S, R?', back: '00: speichern · 10: setzen (Q = 1) · 01: rücksetzen (Q = 0) · 11: verboten.' },
    { id: 'sr-verboten', front: 'Was ist am SR-Latch aus NOR-Gattern verboten?', back: 'S = R = 1: beide Ausgänge 0, nach dem Loslassen undefinierter Folgezustand.' },
    { id: 'latch-vs-ff', front: 'Latch vs. Flipflop?', back: 'Latch: pegelgesteuert (transparent, solange Takt high). Flipflop: flankengesteuert (übernimmt nur an der Taktflanke).' },
    { id: 'dff-funktion', front: 'Funktion eines D-Flipflops?', back: 'Übernimmt bei der aktiven Taktflanke den Wert von D nach Q und hält ihn bis zur nächsten Flanke.' },
    { id: 'tff-teiler', front: 'T-Flipflop als Teiler?', back: 'T = 1: Q kippt bei jeder Flanke → $f_Q=f_\\text{Takt}/2$ (Teiler 2:1).' },
    { id: 'tff-kette', front: 'Teilerverhältnis einer Kette aus n T-Flipflops?', back: '$2^n$ (drei Stufen: 8, zehn Stufen: 1024).' },
    { id: 'setup-hold', front: 'Setup- und Hold-Zeit?', back: 'D muss kurz vor (Setup) und kurz nach (Hold) der Taktflanke stabil sein, sonst droht Metastabilität.' },
    { id: 'metastabil', front: 'Metastabilität?', back: 'Ausgang hängt bei verletzter Setup-/Hold-Zeit eine unvorhersehbare Zeit zwischen 0 und 1.' },
    { id: 'flipflop-fluechtig', front: 'Behält ein Flipflop sein Bit ohne Betriebsspannung?', back: 'Nein, Flipflops und Latches sind flüchtig.' },
  ],
};
