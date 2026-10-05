// Lektion digitaltechnik-grundlagen: Binärsystem, Bit/Baud/Datenrate, ASK/FSK/AFSK/PSK, Vielfachzugriff, Computer am Funkgerät, Abtastung und DSP/SDR.
// Quellen für Fakten: DARC 50ohm.de (CC BY 4.0), BNetzA-Fragenkatalog 3. Auflage.

export default {
  id: 'digitaltechnik-grundlagen',
  title: 'Binärsystem, Datenrate und digitale Signalverarbeitung',
  summary: 'Dual- und Zweierpotenzen, Datenübertragungsrate, ASK/FSK/AFSK, Vielfachzugriff, Abtastung und DSP-Prinzip.',
  minutes: 25,
  goals: [
    'Dualzahlen in Dezimalzahlen umrechnen und mit $2^n$ die Zahl der Zustände von $n$ Bit bestimmen',
    'Bandbreite (Hz), Datenübertragungsrate (Bit/s) und Symbolrate (Baud) unterscheiden',
    'ASK, FSK, PSK und AFSK an Bild und Beschreibung erkennen und FDMA, TDMA, CDMA einordnen',
    'CAT-Schnittstelle, Audioverbindung und DATA-Port unterscheiden und das Prinzip von A/D-Umsetzer, DSP, D/A-Umsetzer und SDR erklären',
  ],
  needs: ['elektrotechnik/zahlensysteme', 'elektrotechnik/ad-da-wandlung'],
  blocks: [
    {
      id: 'intro', type: 'text', title: 'Analog, digital und warum Computer nur 0 und 1 kennen',
      md: `
**Analog** heißt kontinuierlich: Ein Wert darf jede Zwischenstufe annehmen (die Amplitude eines Sprachsignals). **Digital** heißt gestuft: Es gibt nur bestimmte Werte, nichts dazwischen. Im Funk bedeutet das zum Beispiel, dass die Amplitude eines Trägers nur 25, 50, 75 oder 100 % betragen darf (und nicht dazwischen).[^darc-50ohm] Alltags-Verfahren wie [WLAN](wiki:Wireless Local Area Network|Wireless LAN), LTE oder DVB sind längst digital.

Computer und Digitalschaltungen arbeiten mit nur **zwei** Ziffern: 0 und 1. Dahinter stehen zwei **elektrische Zustände**, etwa „Transistor gesperrt/leitend“ oder 0 V und 5 V. Zwei Zustände lassen sich mit Schaltelementen (Transistoren) einfach und zuverlässig herstellen und unterscheiden; das ist der Vorteil des [Dualsystems](wiki:Dualsystem|Binary number) in elektronischen Schaltungen (EA201). Es ist weder „fünfmal genauer“ als das Dezimalsystem noch lässt sich der Zwischenbereich zwischen 0 und 1 „mit hoher Genauigkeit abbilden“, und eine binäre Ziffer überträgt **ein** [Bit](wiki:Bit|Bit) an Information, nicht 8 Dezimalziffern.
`,
    },
    {
      id: 'dual-text', type: 'text', title: 'Dualzahlen: Stellenwerte verdoppeln sich',
      md: `
Im Dezimalsystem ist jede Stelle zehnmal so viel wert wie die rechts daneben (1, 10, 100, 1000 …), weil es zehn Ziffern gibt. Im **Dualsystem** gibt es nur zwei, deshalb **verdoppeln** sich die Stellenwerte: 1, 2, 4, 8, 16, 32, 64, 128 …. Eine Stelle heißt **Bit**.

**Dual → Dezimal:** Schreibe über jede Ziffer ihren Stellenwert und addiere die Stellenwerte, unter denen eine **1** steht.

<table>
<tr><th>128</th><th>64</th><th>32</th><th>16</th><th>8</th><th>4</th><th>2</th><th>1</th></tr>
<tr><td>0</td><td>0</td><td>1</td><td>0</td><td>1</td><td>1</td><td>0</td><td>1</td></tr>
</table>

$00101101_2 = 32 + 8 + 4 + 1 = 45$. Nullen vorn ändern den Wert nicht: In Hardware und Software hat jede Zahl eine feste **Breite** (8, 16, 32, 64 Bit), und vorn wird mit Nullen aufgefüllt.

**Wie viele Zustände hat eine Folge von $n$ Bit?** Ein Bit hat 2 Zustände, jedes weitere Bit verdoppelt die Zahl: $2^n$. Also hat eine Dualzahl aus **3 Bit 8 Zustände** (nicht 4, 6 oder 16), aus **4 Bit 16**, aus **5 Bit 32** (nicht 5, 64 oder 128) und aus 8 Bit 256. Der größte darstellbare Wert ist $2^n - 1$, bei 8 Bit also 255 (11111111). Das ist die größte Zahl, die in einem Block einer IPv4-Adresse stehen kann.

Als Prüfungsrechnung genügt dir ein sicheres Gefühl für die Zweierpotenzen bis 128: 1, 2, 4, 8, 16, 32, 64, 128. Prüfungsbezug: EA202 bis EA208.
`,
    },
    {
      id: 'demo-bits', type: 'viz', viz: 'bit-toggler', title: 'Bit-Schalter',
      params: { rounds: 6, width: 8, hexEvery: 0 },
      intro: 'Schalte die Bits an und aus. Rechts steht der Dezimalwert, darunter die Dualzahl. Rechne im Kopf mit den Stellenwerten 128, 64, 32, 16, 8, 4, 2, 1 mit.',
      task: 'Stelle sechs Zufallszahlen richtig ein.',
    },
    {
      id: 'rate-text', type: 'text', title: 'Bandbreite, Datenrate, Symbolrate',
      md: `
Drei Größen, die im Alltag („mein DSL hat 100 MBit/s Bandbreite“) vermischt werden, in der Prüfung aber **streng getrennt** sind:

<table>
<tr><th>Größe</th><th>Was wird gemessen?</th><th>Einheit</th></tr>
<tr><td><b>Bandbreite</b></td><td>der genutzte <b>Frequenzbereich</b></td><td><b>Hertz</b> (Hz)</td></tr>
<tr><td><b>Datenübertragungsrate</b></td><td>die je Zeiteinheit übertragene <b>Datenmenge</b></td><td><b>Bit pro Sekunde</b> (Bit/s)</td></tr>
<tr><td><b>Symbolrate</b></td><td>die je Sekunde gesendeten <b>Symbole</b> (Zustände, zwischen denen umgeschaltet wird)</td><td><b>[Baud](wiki:Baud|Baud)</b> (Bd)</td></tr>
</table>

Die Datenrate ist die **Bit/s**-Größe (EA106): Baud, Hertz und Dezibel sind falsch. Die **Bandbreite** hat die Einheit Hertz (EA105). Der Unterschied (EE401): *Als Bandbreite wird der genutzte Frequenzbereich (in Hz), als Datenübertragungsrate die je Zeiteinheit übertragene Datenmenge (in Bit/s) bezeichnet.* Die falschen Antworten vertauschen Einheiten („Datenmenge in Hz“, „Datenrate in Baud“) oder behaupten Gleichheiten („Datenrate entspricht der Symbolrate“).[^darc-50ohm]

Zwischen Baud und Bit/s liegt der Faktor **Bit je Symbol**: $\\text{Datenrate} = \\text{Symbolrate} \\cdot \\text{Bit je Symbol}$. Mit zwei Zuständen je Symbol (ein Bit) sind 9600 Bd gleich 9600 Bit/s = 9,6 kbit/s. Mit vier Zuständen (zwei Bit je Symbol) schafft dieselbe Symbolrate das Doppelte. Mehr Daten pro Sekunde brauchen mehr Bandbreite; beide Größen hängen zusammen, sind aber **nicht dasselbe**.
`,
    },
    {
      id: 'tasten-text', type: 'text', title: 'Digitale Modulation: ASK, FSK, PSK und AFSK',
      md: `
Die drei Eigenschaften eines Trägers, Amplitude, Frequenz und Phase, kann man auch **zwischen festen Werten umschalten**. Das nennt man **Umtastung** (englisch *shift keying*); die festen Zustände heißen **Symbole**.[^darc-50ohm]

- **[Amplitudenumtastung](wiki:Amplitudenumtastung|Amplitude-shift keying) (ASK)**: zwei Amplituden stehen für 0 und 1. Der Sonderfall, bei dem der Träger ganz aus- und eingeschaltet wird, heißt **On-Off-Keying (OOK)**: das ist die Telegrafie (CW).
- **[Frequenzumtastung](wiki:Frequenzumtastung|Frequency-shift keying) (FSK)**: zwei Frequenzen stehen für 0 und 1; die Amplitude bleibt gleich (RTTY).
- **Phasenumtastung (PSK)**: Die Phase springt (z. B. um 180°); Amplitude und Frequenz bleiben gleich (PSK31).
- **AFSK** (*Audio Frequency Shift Keying*): Das „A“ steht hier für **Audio**. Es ist eine Frequenzumtastung im Hörbereich, oft zwischen 300 und 2700 Hz, die dann mit einem normalen Sprechfunkgerät per **FM, AM oder SSB** übertragen wird (EE408). Auf dem Band sieht ein SSB-übertragenes AFSK-Signal wieder aus wie ein FSK-Signal. Beispiel: **APRS** auf 144,800 MHz mit 1200 Bit/s per AFSK und FM-Funkgeräten.[^aprs-fi] AFSK ist langsam, funktioniert aber mit fast jedem Funkgerät: Mikrofon- und Lautsprecheranschluss genügen. AFSK ist **kein** PSK-Signal, **keine** Kombination aus Amplituden- und Frequenzmodulation und **kein** unmodulierter Träger.

Beim Erkennen im Bild (EE406, EE407) achtest du auf das, was sich im Takt der Bits ändert: **Höhe** (ASK/OOK), **Abstand der Nulldurchgänge** (FSK).
`,
    },
    {
      id: 'demo-tasten', type: 'viz', viz: 'ask-fsk-psk', title: 'ASK, FSK, PSK und AFSK',
      intro: 'Klicke die Bits um und wähle das Verfahren. Das Zeitbild ist herabskaliert (wenige Trägerschwingungen je Bit).',
      task: 'Sieh dir alle fünf Verfahren an und stelle das Bitmuster 01001110 ein (= 78).',
    },
    {
      id: 'zugriff-text', type: 'text', title: 'Viele Teilnehmer, ein Band: FDMA, TDMA, CDMA',
      md: `
Wie teilen sich mehrere Teilnehmer ein Frequenzband?

<table>
<tr><th>Verfahren</th><th>Trennung nach …</th><th>Merksatz</th><th>Beispiele</th></tr>
<tr><td><b>FDMA</b> (Frequenzmultiplex)</td><td>Frequenz</td><td><b>zeitgleich auf unterschiedlichen Frequenzen</b></td><td>Relaiskanäle, frühe analoge Mobilfunknetze</td></tr>
<tr><td><b>TDMA</b> (Zeitmultiplex)</td><td>Zeit</td><td><b>im schnellen zeitlichen Wechsel auf derselben Frequenz</b></td><td>DMR, GSM, DECT</td></tr>
<tr><td><b>CDMA</b> (Codemultiplex)</td><td>Code</td><td><b>zeitgleich mit Spreizcodierung im selben Frequenzbereich</b></td><td>UMTS, GPS</td></tr>
</table>

Im Amateurfunk begegnet dir davon vor allem **TDMA bei DMR** (zwei Zeitschlitze auf einer Frequenz). Die Antwort „zeitgleich auf unterschiedlichen Wegen“ ist bei allen drei Fragen (EE409 bis EE411) falsch.[^darc-50ohm]
`,
    },
    {
      id: 'demo-zugriff', type: 'viz', viz: 'vielfachzugriff', title: 'Zeit-Frequenz-Bild',
      intro: 'In der Ansicht „FDMA“, „TDMA“ und „CDMA“ siehst du, wer wann auf welcher Frequenz sendet. Im Quiz musst du das Verfahren am Bild erkennen.',
      task: 'Sieh dir alle drei Verfahren an und beantworte im Quiz mindestens 4 von 5 Fragen richtig.',
    },
    {
      id: 'rig-text', type: 'text', title: 'Computer und Funkgerät verbinden',
      md: `
Für Digimodes (z. B. FT8, WSPR) braucht der Computer zwei Dinge vom Funkgerät: das **NF-Signal** (hören und senden) und, bequemerweise, eine **Steuerung** (Frequenz, PTT). Dafür gibt es drei Anschlüsse, die du nicht verwechseln darfst:[^darc-50ohm]

- **Audioverbindung**: Das NF-Signal geht über Audiobuchsen oder eine USB-Verbindung (bei vielen Geräten als USB-Soundkarte) zum Computer. Alternativ übernimmt ein **Hardware-Modem** die Umsetzung zwischen Daten und Audio (NF114). Mit dem **ALC-Anschluss** hat das nichts zu tun, und der **HF-Anschluss** (Antennenbuchse) wird nicht mit einem Y-Kabel an den Computer gehängt!
- **CAT-Schnittstelle** (*Computer Aided Tuning/Transceiver*): Über ein **serielles Protokoll** steuert der Computer den Transceiver und fragt Werte ab, zum Beispiel **Frequenz, Sendeleistung und PTT** (NF116). Sie liefert kein NF-Signal und gibt kein HF-Signal an den Computer aus.
- **DATA-/9600-Port** (bei FM-Transceivern): ein **analoger** Anschluss, der **Verstärker- und Filterstufen umgeht**, damit ein NF-Signal (z. B. für Digital Voice oder POCSAG) **möglichst verzerrungsfrei** abgegriffen oder eingespeist werden kann (NF115). Er ist keine Steuerschnittstelle und dient nicht dem Anschluss eines Drehgebers für die Frequenzeinstellung.

**Gefahr:** Wenn ein Funkgerät vom Computer gesteuert wird, kann es **unerwartet auf Sendung schalten** (ein Benachrichtigungston des Betriebssystems, eine falsch gesetzte PTT). Dann entstehen unerwünschte Aussendungen, und **Menschen können in Gefahr geraten**, die gerade an der Antennenanlage arbeiten oder in deren Nähe sind (NF117). Mit dem Vorverstärker, dem ALC-Zeiger oder einem „Kondensator im Antennenkreis“ hat das nichts zu tun. Fahre deshalb Systemklänge herunter und schalte das Funkgerät aus, bevor jemand an die Antenne geht.
`,
    },
    {
      id: 'warn-rig', type: 'callout', tone: 'warning', title: 'Anschlüsse nicht vermischen',
      md: `
Die falschen Antworten in NF114 bis NF116 sind **vertauschte Beschreibungen**: Was bei CAT steht, wird beim DATA-Port behauptet und umgekehrt. Merke: **CAT = Steuerung** (Befehle, Frequenz, PTT), **DATA/9600 = analoges NF-Signal ohne Filter**, **Audio/USB = NF zwischen Computer und Funkgerät**.
`,
    },
    {
      id: 'dsp-text', type: 'text', title: 'Digitale Signalverarbeitung (DSP) und SDR',
      md: `
Moderne Funkgeräte verarbeiten Signale zunehmend **in Software**: Filter, Demodulation, Rauschminderung, Notch. Dazu muss das analoge Signal erst **digitalisiert** werden:[^darc-50ohm]

1. Der **[Analog-Digital-Umsetzer](wiki:Analog-Digital-Umsetzer|Analog-to-digital converter)** (A/D-Umsetzer, ADC) misst die Spannung in **festen Zeitabständen** (**Abtastung**, englisch *sampling*; jeder Messwert ist ein *Sample*) und bildet jeden Wert auf eine Zahl ab, z. B. von −128 bis +127. Das sind 256 Werte, genau $2^8$: 8 Bit.
2. Die [digitale Signalverarbeitung](wiki:Digitale Signalverarbeitung|Digital signal processing) rechnet mit den Zahlen: Filtern, Mischen, Demodulieren. Die Voraussetzung für das Filtern eines analogen Signals ist also, dass es **zuerst digitalisiert** wird (EF602); Demodulieren, Rauschbefreien oder Oberschwingungen entfernen sind nicht die Voraussetzung, sondern höchstens das Ergebnis.
3. Der **D/A-Umsetzer** (DAC) macht aus den Zahlen wieder eine **analoge Spannung**: für den Lautsprecher oder für die Antenne.

Im Blockschaltbild steht also **vorn der A/D-Umsetzer, hinten der D/A-Umsetzer** (EF601): $\\text{Eingang} \\to \\text{A/D} \\to \\text{DSP} \\to \\text{D/A} \\to \\text{Ausgang}$. Vertauscht sind sie falsch („beide D/A“ oder „beide A/D“ ergibt keinen Sinn).

Ein Gerät, in dem **zumindest ein Teil der Signalverarbeitung in Software** realisiert ist, heißt **[SDR](wiki:Software Defined Radio|Software-defined radio)** (*Software Defined Radio*; EF603). Es hat nichts mit besonderen Antennenanschlüssen, mit Analogtechnik für besseren Klang oder mit einem Funkverkehr über das Internet zu tun.

<details><summary>Vertiefung (kein Prüfungsstoff): Wie schnell muss man abtasten?</summary>
Damit ein Signal der höchsten Frequenz $f_\\text{max}$ aus den Samples wieder fehlerfrei rekonstruiert werden kann, muss die Abtastrate größer als $2\\cdot f_\\text{max}$ sein ([Abtasttheorem](wiki:Nyquist-Shannon-Abtasttheorem|Nyquist–Shannon sampling theorem)). Bei zu langsamer Abtastung entstehen falsche, tiefere Frequenzen (Aliasing). Dazu das Labor unten.
</details>
`,
    },
    {
      id: 'demo-adc', type: 'viz', viz: 'adc-lab', title: 'A/D- und D/A-Umsetzung im Labor',
      params: { fTarget: 3000, lsbGoal: 0.02 },
      intro: 'Stelle Signalfrequenz, Abtastrate und Auflösung ein und beobachte, wie aus der Kurve Messpunkte und wieder eine Kurve werden. Je mehr Bit, desto feiner die Stufen ($2^n$).',
      task: 'Bilde ein 3-kHz-Signal korrekt ab, erreiche eine feine Auflösung und löse einmal absichtlich Aliasing aus.',
    },
    {
      id: 'calc-zustaende', type: 'numeric', title: 'Zustände eines Bytes',
      question: 'Wie viele verschiedene Werte kann ein A/D-Umsetzer mit **8 Bit** Auflösung unterscheiden?',
      answer: 256, tolerance: 0,
      hint: 'Jedes Bit verdoppelt die Zahl der Zustände.',
      explain: '$2^8 = 256$. Mit 10 Bit wären es 1024, mit 16 Bit 65 536: Jedes Bit mehr halbiert die Stufenhöhe.',
    },
    {
      id: 'calc-dual', type: 'numeric', title: 'Dual → Dezimal',
      question: 'Berechne den dezimalen Wert der Dualzahl $01101001$.',
      answer: 105, tolerance: 0,
      hint: 'Stellenwerte 128, 64, 32, 16, 8, 4, 2, 1 über die Ziffern schreiben, die Stellenwerte unter den Einsen addieren.',
      explain: '$64 + 32 + 8 + 1 = 105$.',
    },
    {
      id: 'calc-rate', type: 'numeric', title: 'Datenrate aus Symbolrate',
      question: 'Ein Verfahren sendet 1200 Symbole pro Sekunde (1200 Baud) mit 2 Bit je Symbol. Wie groß ist die Datenübertragungsrate in Bit/s?',
      answer: 2400, tolerance: 0, unit: 'Bit/s',
      hint: 'Datenrate = Symbolrate mal Bit je Symbol.',
      explain: '$1200\\,\\text{Bd} \\cdot 2\\,\\text{Bit/Symbol} = 2400\\,\\text{Bit/s}$. Die Bandbreite in Hz ist eine ganz andere Größe und folgt aus dem Verfahren.',
    },
    {
      id: 'match-tasten', type: 'match', title: 'Verfahren und Merkmal',
      prompt: 'Ordne jedem digitalen Verfahren zu, was es tut.',
      pairs: [
        ['ASK', 'schaltet zwischen zwei Amplituden um'],
        ['OOK', 'Träger wird ein- und ausgeschaltet (CW)'],
        ['FSK', 'schaltet zwischen zwei Frequenzen um'],
        ['PSK', 'Phase des Trägers springt'],
        ['AFSK', 'Frequenzumtastung im Hörbereich, dann per FM oder SSB gesendet'],
      ],
    },
    {
      id: 'match-zugriff', type: 'match', title: 'Zugriffsverfahren',
      prompt: 'Ordne jedem Vielfachzugriff seine Arbeitsweise zu.',
      pairs: [
        ['FDMA', 'zeitgleich auf unterschiedlichen Frequenzen'],
        ['TDMA', 'im schnellen zeitlichen Wechsel auf derselben Frequenz'],
        ['CDMA', 'zeitgleich mit Spreizcodierung im selben Frequenzbereich'],
      ],
    },
    {
      id: 'quiz-anschluesse', type: 'quiz', title: 'Welcher Anschluss ist das?',
      question: 'Welche Aussagen über die Verbindung von Funkgerät und Computer sind richtig? (Mehrfachauswahl)',
      options: [
        { text: 'Über die CAT-Schnittstelle steuert der Computer per seriellem Protokoll Frequenz, Leistung und PTT.', correct: true, why: 'CAT ist die Steuerschnittstelle.' },
        { text: 'Der DATA-/9600-Port führt ein NF-Signal ohne Sprachfilter und -verstärker heraus oder hinein.', correct: true, why: 'Gerade für Datenverfahren (DV, POCSAG) möglichst verzerrungsfrei.' },
        { text: 'Die Audioverbindung (NF oder USB) oder ein Hardware-Modem verbinden Digimode-Software und Funkgerät.', correct: true, why: 'So kommt das NF-Signal zum Computer und zurück.' },
        { text: 'Ein Software-Modem wird direkt an den ALC-Anschluss gehängt.', correct: false, why: 'Der ALC-Anschluss liefert eine Regelspannung, kein NF.' },
        { text: 'Die Antennenbuchse wird über ein Y-Kabel mit dem Computer verbunden.', correct: false, why: 'Das HF-Signal gehört an die Antenne, nicht an eine Datenschnittstelle.' },
      ],
    },
    {
      id: 'order-dsp', type: 'order', title: 'Signalweg in einem SDR',
      prompt: 'Ordne die Stationen eines digital verarbeiteten Empfangssignals.',
      items: ['Antennensignal (analog)', 'A/D-Umsetzer: Abtasten und Quantisieren', 'Digitale Signalverarbeitung: Filtern und Demodulieren (Software)', 'D/A-Umsetzer', 'Lautsprecher'],
      explain: 'Erst digitalisieren, dann rechnen, dann wieder in eine analoge Spannung zurückwandeln.',
    },
    {
      id: 'recall-digital', type: 'recall', title: 'In eigenen Worten',
      prompt: 'Erkläre den Unterschied zwischen Bandbreite, Datenübertragungsrate und Symbolrate (mit Einheiten), und wie viele Zustände eine Folge von n Bit hat.',
      answer: 'Die Bandbreite ist der genutzte Frequenzbereich in Hertz. Die Datenübertragungsrate ist die je Sekunde übertragene Datenmenge in Bit/s. Die Symbolrate ist die Zahl der Symbole (Zustände) pro Sekunde in Baud; Datenrate = Symbolrate mal Bit je Symbol. Eine Folge von n Bit hat 2^n verschiedene Zustände (3 Bit: 8, 4 Bit: 16, 5 Bit: 32, 8 Bit: 256).',
      hints: ['Welche Einheit gehört zur Frequenz, welche zur Datenmenge?', 'Jedes zusätzliche Bit verdoppelt die Zustände.'],
      cards: ['bw-vs-datenrate', 'zustaende-2n'],
    },
  ],
  cards: [
    { id: 'binaer-vorteil', front: 'Vorteil des Dualsystems in elektronischen Schaltungen?', back: 'Die Ziffern 0 und 1 entsprechen zwei elektrischen Zuständen (z. B. Transistor gesperrt/leitend) und lassen sich einfach mit Schaltelementen verarbeiten.' },
    { id: 'zustaende-2n', front: 'Wie viele Zustände hat eine Dualzahl aus n Bit?', back: '2ⁿ: 3 Bit → 8, 4 Bit → 16, 5 Bit → 32, 8 Bit → 256. Größter Wert 2ⁿ − 1 (8 Bit: 255).' },
    { id: 'dual-dezimal', front: 'Wie rechnet man Dual in Dezimal um?', back: 'Stellenwerte 1, 2, 4, 8, 16, 32, 64, 128 (von rechts) über die Ziffern schreiben und die Stellenwerte der Einsen addieren. 01001110 = 64 + 8 + 4 + 2 = 78.' },
    { id: 'bw-vs-datenrate', front: 'Bandbreite oder Datenübertragungsrate: Einheiten?', back: 'Bandbreite = genutzter Frequenzbereich in Hz. Datenübertragungsrate = Datenmenge je Zeit in Bit/s. Symbolrate in Baud (Datenrate = Symbolrate · Bit je Symbol).' },
    { id: 'ask-fsk', front: 'ASK, OOK, FSK, PSK?', back: 'ASK: Amplitude umgetastet; OOK: Träger ein/aus (CW); FSK: Frequenz umgetastet; PSK: Phase umgetastet.' },
    { id: 'afsk', front: 'Was ist AFSK?', back: 'Ein durch Frequenzumtastung erzeugtes NF-Signal (Hörbereich), mit dem ein HF-Träger moduliert wird, z. B. per FM oder SSB (z. B. APRS auf 144,800 MHz, 1200 Bit/s).' },
    { id: 'fdma', front: 'FDMA: Wie werden mehrere Signale übertragen?', back: 'Zeitgleich auf unterschiedlichen Frequenzen.' },
    { id: 'tdma', front: 'TDMA: Wie werden mehrere Signale übertragen?', back: 'Im schnellen zeitlichen Wechsel (Zeitschlitze) auf derselben Frequenz (z. B. DMR).' },
    { id: 'cdma', front: 'CDMA: Wie werden mehrere Signale übertragen?', back: 'Zeitgleich mit Spreizcodierung im selben Frequenzbereich.' },
    { id: 'cat', front: 'Wofür dient die CAT-Schnittstelle?', back: 'Steuerung des Transceivers per seriellem Protokoll (Frequenz, Sendeleistung, PTT abfragen/setzen). Nicht für NF- oder HF-Signale.' },
    { id: 'data-port', front: 'Wofür dient der DATA-/9600-Port am FM-Transceiver?', back: 'Ein analoges NF-Signal (z. B. für DV, POCSAG) unter Umgehung von Verstärker- und Filterstufen möglichst verzerrungsfrei abgreifen oder einspeisen.' },
    { id: 'pc-sendet', front: 'Gefahr bei computergesteuertem Funkgerät?', back: 'Das Gerät könnte unerwartet auf Sendung schalten: unerwünschte Aussendungen, Gefahr für Personen an der Antennenanlage.' },
    { id: 'dsp-kette', front: 'Prinzip der digitalen Signalverarbeitung?', back: 'A/D-Umsetzer (digitalisieren) → digitale Signalverarbeitung → D/A-Umsetzer. Voraussetzung zum Filtern: zuerst digitalisieren.' },
    { id: 'sdr', front: 'Was bedeutet SDR?', back: 'Software Defined Radio: zumindest ein Teil der Signalaufbereitung ist in Software realisiert.' },
  ],
};
