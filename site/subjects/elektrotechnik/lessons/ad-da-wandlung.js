export default {
  id: 'ad-da-wandlung',
  title: 'Abtasten, Quantisieren, Aliasing',
  summary: 'Wie aus einer analogen Spannung Zahlen werden und zurück: Abtastrate, Auflösung, Quantisierungsfehler, Abtasttheorem und warum zu langsames Abtasten Phantomfrequenzen erzeugt.',
  minutes: 30,
  needs: ['zahlensysteme', 'sinus-wechselspannung'],
  goals: [
    'Den Weg Signal → [[ad-wandler|A/D-Umsetzer]] → Zahlen → [[da-wandler|D/A-Umsetzer]] → Signal beschreiben',
    '[[quantisierung|Quantisierung]] und [[lsb|LSB]] berechnen: $\\text{LSB} = U_\\text{ref}/2^n$',
    'Das [[abtasttheorem]] anwenden: $f_s > 2\\cdot f_{max}$, und [[aliasing|Aliasfrequenzen]] bestimmen',
    'Wissen, wozu [[anti-aliasing-filter|Anti-Aliasing-Tiefpass]] und Rekonstruktionsfilter da sind',
  ],
  blocks: [
    {
      id: 'zahlen-statt-spannung', type: 'text', title: 'Von der Spannung zur Zahl',
      md: String.raw`
Ein Mikrofon liefert eine Spannung, die sich stetig mit dem Schall ändert — ein *analoges* Signal. Computer, [Mikrocontroller](wiki:Mikrocontroller|Microcontroller) und das [Software Defined Radio](wiki:Software Defined Radio|Software-defined radio) arbeiten aber mit Zahlen. Ein **[[ad-wandler|Analog-Digital-Umsetzer]]** (ADC, [A/D-Umsetzer](wiki:Analog-Digital-Umsetzer|Analog-to-digital converter)) macht daraus eine Folge von Zahlen; ein **[[da-wandler|Digital-Analog-Umsetzer]]** (DAC, [D/A-Umsetzer](wiki:Digital-Analog-Umsetzer|Digital-to-analog converter)) erzeugt wieder eine Spannung. Dazwischen steht die [digitale Signalverarbeitung](wiki:Digitale Signalverarbeitung|Digital signal processing): Filter, Modulation, Spektrum — alles als Rechnung.

Zwei *unabhängige* Dinge werden beim Wandeln diskretisiert:

1. **Die Zeit** — man misst nur zu bestimmten Zeitpunkten, im Abstand $T_s = 1/f_s$ (**[[abtastrate|Abtastrate]]** $f_s$, [Abtastung](wiki:Abtastung (Signalverarbeitung)|Sampling (signal processing))).
2. **Den Wert** — jede Messung wird auf eine von endlich vielen Stufen gerundet (**[[quantisierung|Quantisierung]]**, [Quantisierung](wiki:Quantisierung (Signalverarbeitung)|Quantization (signal processing))). Die Zahl der Bits $n$ legt die Stufenzahl fest.

Dieses Prinzip heißt auch [Pulscodemodulation](wiki:Pulscodemodulation|Pulse-code modulation) (PCM) und steckt in der Audio-CD ([Compact Disc](wiki:Compact Disc|Compact disc): 44,1 kHz, 16 bit), im Telefon (8 kHz, 8 bit) und in jeder Soundkarte.[^bnetza-pruefungsfragen-2024]`,
    },
    {
      id: 'quantisierung', type: 'text', title: 'Quantisierung: Wie fein sind die Stufen?',
      md: String.raw`
Ein $n$-Bit-Wandler kennt $2^n$ Stufen. Deckt der Eingangsbereich $0\ldots U_\text{ref}$ ab, ist ein Schritt, ein **[[lsb|LSB]]** (*least significant bit*):

$$\text{LSB} = \frac{U_\text{ref}}{2^n}$$

Der **Quantisierungsfehler** beträgt höchstens $\pm\tfrac12\text{LSB}$. Mehr Bits bedeuten *feinere Stufen* — nicht höhere Spannung! Jedes zusätzliche Bit halbiert den Stufenabstand. Für einen voll ausgesteuerten Sinus ergibt sich als Faustformel für den Abstand zum Quantisierungsrauschen (SNR, [Signal-Rausch-Verhältnis](wiki:Signal-Rausch-Verhältnis|Signal-to-noise ratio)):

$$\text{SNR}_\text{ideal} \approx 6{,}02\,n + 1{,}76\ \text{dB}$$

also etwa **6 dB je Bit** (nach dem Dezibel-Rechnen: Amplitude verdoppelt ≙ 6 dB). Ein 8-Bit-Wandler (SDR-Stick) schafft ideal knapp 50 dB, ein 16-Bit-Wandler fast 98 dB.`,
    },
    {
      id: 'calc-lsb', type: 'numeric', title: 'Stufenhöhe eines 10-Bit-Wandlers',
      question: 'Ein 10-Bit-A/D-Umsetzer hat $U_\\text{ref} = 5\\,\\text{V}$. Wie groß ist ein LSB in mV?',
      answer: 4.88, tolerance: 0.03, unit: 'mV',
      hint: '$2^{10} = 1024$ Stufen.',
      explain: '$5\\,\\text{V}/1024 = 4{,}88\\,\\text{mV}$.',
    },
    {
      id: 'calc-lsb12', type: 'numeric', title: 'Stufenhöhe eines 12-Bit-Wandlers',
      question: 'Ein 12-Bit-Wandler mit $U_\\text{ref} = 3{,}3\\,\\text{V}$: Wie groß ist ein LSB in mV?',
      answer: 0.806, tolerance: 0.005, unit: 'mV',
      hint: '$2^{12} = 4096$.',
      explain: '$3{,}3\\,\\text{V}/4096 = 0{,}806\\,\\text{mV}$ — ein Mikrocontroller-ADC löst also unter einem Millivolt auf.',
    },
    {
      id: 'calc-snr', type: 'numeric', title: 'Rauschabstand durch Quantisierung',
      question: 'Wie groß ist der ideale Signal-Rausch-Abstand eines 8-Bit-Wandlers (in dB)?',
      answer: 49.9, tolerance: 0.2, unit: 'dB',
      hint: '$\\text{SNR}\\approx 6{,}02\\,n+1{,}76\\,\\text{dB}$ mit $n=8$.',
      explain: '$6{,}02\\cdot8 + 1{,}76 = 49{,}9\\,\\text{dB}$.',
    },
    {
      id: 'abtasttheorem', type: 'text', title: 'Abtasttheorem und Aliasing',
      md: String.raw`
Wie oft muss man messen, um ein Signal nicht zu verlieren? Das sagt das **[[abtasttheorem|Abtasttheorem]]** von [Harry Nyquist](wiki:Harry Nyquist|Harry Nyquist) und [Claude Shannon](wiki:Claude Shannon|Claude Shannon) ([Nyquist-Shannon-Abtasttheorem](wiki:Nyquist-Shannon-Abtasttheorem|Nyquist–Shannon sampling theorem)):[^shannon-1949][^wiki-abtasttheorem]

$$f_s > 2\cdot f_{max}$$

Die Abtastrate muss **mehr als doppelt so hoch** sein wie die höchste im Signal vorkommende Frequenz. Die Grenze $f_s/2$ heißt **[[nyquist-frequenz|Nyquist-Frequenz]]**. Sprache bis 3,4 kHz → Telefon tastet mit 8 kHz ab; Audio bis 20 kHz → CD mit 44,1 kHz.

**Was passiert bei zu niedriger Abtastrate?** Frequenzen oberhalb $f_s/2$ gehen nicht einfach verloren — sie erscheinen als *falsche* niedrigere Frequenz, **Alias** ([Alias-Effekt](wiki:Alias-Effekt|Aliasing)). Die Alias-Frequenz ist der Abstand zum nächsten Vielfachen der Abtastrate:

$$f_\text{Alias} = |f - k\cdot f_s|\quad (k\text{ so, dass das Ergebnis} \le f_s/2)$$

Beispiel: 7 kHz mit 10 kHz abgetastet → $|7-10| = 3\,\text{kHz}$. Aus den Abtastwerten ist nicht mehr zu erkennen, ob 3 kHz oder 7 kHz im Original steckten. Das ist wie beim Hubschrauber im Film, dessen Rotor scheinbar rückwärts läuft: Die Kamera tastet nur 24 Mal je Sekunde ab.

**Gegenmittel — das [[anti-aliasing-filter|Anti-Aliasing-Filter]]:** Ein [Tiefpass](wiki:Tiefpass|Low-pass filter) *vor* dem Wandler sperrt alle Frequenzen oberhalb $f_s/2$, damit sie gar nicht erst abgetastet werden. Auf der Ausgangsseite glättet ein **Rekonstruktionsfilter** (wieder ein Tiefpass) die Treppenkurve des D/A-Umsetzers zu einem glatten Signal.`,
    },
    {
      id: 'dac', type: 'text', title: 'Der D/A-Umsetzer: Zahl → Spannung',
      md: String.raw`
Ein einfacher D/A-Umsetzer ist das **[[r2r-leiter|R-2R-Leiternetzwerk]]**: Es besteht nur aus Widerständen der Werte $R$ und $2R$, die jedes Bit binär gewichtet (MSB zählt halb, das nächste ein Viertel, …) zur Ausgangsspannung addieren. Es gilt

$$U_\text{aus} = U_\text{ref}\cdot\frac{\text{Code}}{2^n}$$

Beispiel $n=8$, Code 128 ($=10000000_2$), $U_\text{ref}=5\,\text{V}$: $U_\text{aus} = 5\,\text{V}\cdot128/256 = 2{,}5\,\text{V}$. Weil der Code nur zu den Abtastzeitpunkten wechselt, erzeugt ein DAC eine **Treppenkurve** (zero-order hold); erst der Tiefpass dahinter macht daraus das glatte Signal.

Der Wandler braucht dazu nur eine stabile Referenzspannung und genaue Widerstände — der *Aufbau* ist so einfach, dass man ihn im Selbstbau mit E96-Widerständen nachbauen kann. Moderne Wandler nutzen oft die [Delta-Sigma-Modulation](wiki:Sigma-Delta-Modulation|Delta-sigma modulation), die mit einem 1-Bit-Wandler und sehr hoher Abtastrate arbeitet.`,
    },
    {
      id: 'viz-adc', type: 'viz', viz: 'adc-lab', title: 'ADC-Labor: Abtasten, Quantisieren, Aliasing',
      params: { fTarget: 5000, lsbGoal: 0.005 },
      task: 'Drei Ziele: (1) Stelle **5 kHz** mit einer Abtastrate **über 10 kHz** ein: Das Signal wird korrekt abgebildet. (2) Wähle die **Auflösung** so, dass 1 LSB unter **5 mV** liegt. (3) Löse **Aliasing** aus: Dasselbe 5-kHz-Signal mit einer Abtastrate **unter 10 kHz** abtasten — welche Frequenz „erscheint"? Teste auch, wie wenige Bits eine Sprache noch verständlich lassen würden (Treppenform sichtbar bei 3 Bit).',
    },
    {
      id: 'calc-nyq', type: 'numeric', title: 'Abtastrate für Sprache',
      question: 'Sprache wird auf 3 kHz bandbegrenzt. Welche Abtastrate muss **mindestens überschritten** werden (in kHz)? (Üblich sind 8 kHz.)',
      answer: 6, tolerance: 0.1, unit: 'kHz',
      hint: '$f_s > 2\\cdot f_{max}$.',
      explain: '$2\\cdot3\\,\\text{kHz} = 6\\,\\text{kHz}$ ist die Untergrenze; praktisch nimmt man mehr (8 kHz), weil ein Filter nicht unendlich steil sperrt.',
    },
    {
      id: 'calc-alias', type: 'numeric', title: 'Aliasfrequenz',
      question: 'Ein 7-kHz-Signal wird mit $f_s = 10\\,\\text{kHz}$ abgetastet. Bei welcher Frequenz (in kHz) „erscheint" es?',
      answer: 3, tolerance: 0.05, unit: 'kHz',
      hint: '$f_\\text{Alias} = |f - f_s|$, da $7\\,\\text{kHz} > f_s/2 = 5\\,\\text{kHz}$.',
      explain: '$|7 - 10| = 3\\,\\text{kHz}$. Das Abtasttheorem ist verletzt ($10 < 14$).',
    },
    {
      id: 'calc-dac', type: 'numeric', title: 'DAC-Ausgangsspannung',
      question: 'Ein 8-Bit-D/A-Umsetzer mit $U_\\text{ref} = 5\\,\\text{V}$ bekommt den Code 64. Welche Spannung gibt er aus (in V)?',
      answer: 1.25, tolerance: 0.01, unit: 'V',
      hint: '$U = U_\\text{ref}\\cdot\\text{Code}/2^n$ mit $2^8=256$.',
      explain: '$5\\,\\text{V}\\cdot64/256 = 1{,}25\\,\\text{V}$.',
    },
    {
      id: 'ord-adc', type: 'order', title: 'Die Signalkette',
      prompt: 'Ordne die Stufen einer digitalen Signalverarbeitung vom analogen Eingang bis zum analogen Ausgang.',
      items: [
        'Anti-Aliasing-Tiefpass',
        'Abtast-Halte-Glied (Abtastung)',
        'A/D-Umsetzer (Quantisierung, Code)',
        'Digitale Signalverarbeitung (Rechnung)',
        'D/A-Umsetzer (Treppenkurve)',
        'Rekonstruktions-Tiefpass',
      ],
      explain: 'Das Anti-Aliasing-Filter muss *vor* der Abtastung sitzen, das Rekonstruktionsfilter hinter dem D/A-Umsetzer.',
    },
    {
      id: 'quiz-aa', type: 'quiz', title: 'Wozu das Filter vor dem Wandler?',
      question: 'Wozu dient ein Tiefpass **vor** dem A/D-Umsetzer?',
      options: [
        { text: 'Er entfernt Frequenzanteile oberhalb von $f_s/2$, damit keine Alias-Frequenzen entstehen.', correct: true, why: 'Alles über der Nyquist-Frequenz würde als falsche tiefe Frequenz im Nutzband landen — danach kann man es nicht mehr trennen.' },
        { text: 'Er erhöht die Auflösung des Wandlers.', why: 'Die Auflösung hängt nur von $n$ und $U_\\text{ref}$ ab.' },
        { text: 'Er verdoppelt die Abtastrate.', why: 'Die Abtastrate bestimmt der Takt, nicht das Filter.' },
        { text: 'Er macht aus der Treppenkurve ein glattes Signal.', why: 'Das tut der Tiefpass *nach* dem D/A-Umsetzer (Rekonstruktionsfilter).' },
      ],
    },
    {
      id: 'quiz-bits', type: 'quiz', title: 'Was bringen mehr Bits?',
      question: 'Ein A/D-Umsetzer erhält statt 8 jetzt 12 Bit bei gleichem $U_\\text{ref}$. Was ändert sich?',
      options: [
        { text: 'Die Stufen werden 16-mal feiner (LSB sinkt auf ein Sechzehntel).', correct: true, why: '$2^{12}/2^8 = 16$; der Quantisierungsfehler sinkt entsprechend, der SNR steigt um etwa 24 dB.' },
        { text: 'Der Wandler kann 12-mal höhere Frequenzen erfassen.', why: 'Die erfassbare Frequenz hängt an der Abtastrate, nicht an der Bit-Zahl.' },
        { text: 'Die maximale Eingangsspannung wird größer.', why: 'Der Messbereich wird durch $U_\\text{ref}$ bestimmt; mehr Bits teilen ihn nur feiner.' },
        { text: 'Nichts — Bits betreffen nur den Speicherplatz.', why: 'Sie bestimmen die Auflösung und damit die Genauigkeit der Zahlen.' },
      ],
    },
    {
      id: 'mission-adc', type: 'callout', tone: 'mission', title: 'Prüfung / Funkpraxis',
      md: String.raw`
**Prüfungsbezug:** *EF601* (Klasse E) zeigt ein Blockschaltbild digitaler Signalverarbeitung und fragt nach A/D- und D/A-Umsetzer. In Klasse A kommen *AF605–AF625* hinzu: Quantisierung als Wandlung wertkontinuierlich → wertdiskret (AF605), Quantisierungsfehler (AF607), Zahl der Stufen ($2^n$: 8 bit → 256, AF608; 10 bit → 1024, AF609), Abtastrate (AF615), Abtasttheorem (AF616, AF618: knapp über $2f_{max}$), Alias-Effekt (AF617) und der Tiefpass vor dem Wandler (AF622).[^bnetza-pruefungsfragen-2024]

**Funkpraxis:** In einem **SDR** wandelt ein ADC direkt das Antennensignal (oder die Zwischenfrequenz) in Zahlen, alles Weitere macht Software. Ein RTL-SDR-Stick tastet mit bis zu 2,4 MHz ab und hat nur 8 bit — bei starken Signalen übersteuert er schnell; Nutzer *bändern* mit Bandfiltern vor, genau wie das Anti-Aliasing-Filter. Digitalmodi wie FT8 laufen über die Soundkarte: Das Audiosignal wird mit 48 kHz abgetastet und erst in der Software dekodiert.`,
    },
    {
      id: 'warn-adc', type: 'callout', tone: 'warning', title: 'Typische Fehlvorstellungen',
      md: String.raw`
- *„Abtastrate = Signalfrequenz reicht."* — Es braucht **mehr als das Doppelte** der höchsten Frequenz. Bei genau $f_s=f$ sieht man immer denselben Punkt der Schwingung (eine Gerade!).
- *„Mehr Bits = größere Spannung."* — Mehr Bits = *feinere Stufen*: $\text{LSB}=U_\text{ref}/2^n$.
- *„Höhere Abtastrate macht das Signal genauer."* — Sie erweitert den erfassbaren Frequenzbereich; die Genauigkeit des *Wertes* bestimmt die Bit-Zahl.
- *„Aliasing kann man später herausfiltern."* — Nein: Nach der Abtastung sind Alias und echtes Signal nicht mehr zu trennen; das Filter muss *davor* sitzen.
- *„Binär ist genauer als dezimal."* — Binär ist nur technisch einfacher (zwei Zustände); die Genauigkeit liegt an der Bit-Breite.`,
    },
    {
      id: 'german-adc', type: 'callout', tone: 'german', title: 'Deutsch ↔ English',
      md: `
<table>
<tr><th>Deutsch</th><th>English</th></tr>
<tr><td>Abtastung, Abtastrate</td><td>sampling, sampling rate</td></tr>
<tr><td>Quantisierung</td><td>quantization</td></tr>
<tr><td>Auflösung / Stufenhöhe (LSB)</td><td>resolution / step size (LSB)</td></tr>
<tr><td>Abtasttheorem</td><td>sampling theorem (Nyquist–Shannon)</td></tr>
<tr><td>Alias-Effekt</td><td>aliasing</td></tr>
<tr><td>Anti-Aliasing-Filter</td><td>anti-aliasing filter</td></tr>
<tr><td>Analog-Digital-Umsetzer (A/D-Wandler)</td><td>analog-to-digital converter (ADC)</td></tr>
<tr><td>Rekonstruktionsfilter</td><td>reconstruction filter</td></tr>
</table>`,
    },
    {
      id: 'recall-adc', type: 'recall',
      prompt: 'Was passiert, wenn man ein Signal mit **zu niedriger Abtastrate** abtastet? Wie berechnet man die scheinbare Frequenz, und was verhindert den Effekt?',
      answer: 'Frequenzanteile oberhalb von f_s/2 (Nyquist-Frequenz) werden nicht korrekt erfasst, sondern erscheinen als niedrigere Alias-Frequenz: f_Alias = |f − k·f_s| (k ganzzahlig, sodass das Ergebnis unter f_s/2 liegt; z. B. 7 kHz bei f_s = 10 kHz → 3 kHz). Das Abtasttheorem verlangt f_s > 2·f_max. Verhindern kann man es nur *vor* der Abtastung durch einen Tiefpass (Anti-Aliasing-Filter), der alles über f_s/2 sperrt.',
      hints: ['Wie weit liegt 7 kHz vom nächsten Vielfachen von 10 kHz entfernt?', 'Warum kann man den Effekt nachher nicht mehr rückgängig machen?'],
      cards: ['aliasing', 'abtasttheorem'],
    },
  ],
  cards: [
    { id: 'lsb', front: 'LSB eines $n$-Bit-Wandlers?', back: '$\\text{LSB} = U_\\text{ref}/2^n$ — der Spannungsschritt einer Stufe; Fehler höchstens $\\pm\\tfrac12$ LSB.' },
    { id: 'stufen', front: 'Wie viele Stufen hat ein $n$-Bit-Wandler?', back: '$2^n$: 8 bit → 256, 10 bit → 1024, 12 bit → 4096.' },
    { id: 'abtasttheorem', front: 'Abtasttheorem?', back: '$f_s > 2\\cdot f_{max}$ — mehr als doppelt so schnell abtasten wie die höchste Signalfrequenz.' },
    { id: 'aliasing', front: 'Was ist Aliasing, wie berechnet man die Alias-Frequenz?', back: 'Anteile über $f_s/2$ erscheinen als falsche tiefe Frequenz: $f_A = |f - k\\,f_s|$.' },
    { id: 'aa-filter', front: 'Wozu dient das Anti-Aliasing-Filter, wohin gehört es?', back: 'Tiefpass vor dem A/D-Umsetzer, sperrt alles über $f_s/2$.' },
    { id: 'snr-bits', front: 'SNR-Faustformel für $n$ Bit?', back: '$\\text{SNR}\\approx 6{,}02\\,n + 1{,}76\\,\\text{dB}$ — etwa 6 dB je Bit.' },
    { id: 'quant', front: 'Was bedeutet Quantisierung?', back: 'Abbildung eines wertkontinuierlichen Signals auf endlich viele diskrete Stufen; Ursache des Quantisierungsfehlers.' },
    { id: 'dac-r2r', front: 'Wie arbeitet ein einfacher D/A-Umsetzer (R-2R)?', back: 'Binär gewichtete Addition der Bits: $U = U_\\text{ref}\\cdot\\text{Code}/2^n$; Ausgang ist eine Treppe, danach Tiefpass.' },
    { id: 'abtastrate-def', front: 'Wie ist die Abtastrate definiert?', back: 'Anzahl der Abtastungen je Zeiteinheit (Samples pro Sekunde), $f_s = 1/T_s$.' },
    { id: 'adc-bloecke', front: 'Reihenfolge der Blöcke eines digitalen Direktempfängers?', back: 'Antialiasing-Filter → Abtastratengenerator/Abtasthalten → A/D-Umsetzer → digitale Verarbeitung → D/A.' },
  ],
};
