export default {
  id: 'oszillator-mischer-vervielfacher',
  title: 'Oszillator, Mischer, Vervielfacher, Transverter',
  summary: 'Wie Schwingungen entstehen (LC-Oszillator, Quarz, VFO, PLL), wie ein Mischer Summen- und Differenzfrequenz bildet, wie Vervielfacherketten arbeiten und wie Konverter und Transverter ein Funkgerät auf andere Bänder umsetzen.',
  minutes: 25,
  goals: [
    'LC- und Quarzoszillator unterscheiden und die **Frequenzdrift** durch Temperatur richtig beurteilen (C oder L größer ⇒ f niedriger)',
    'Mischprodukte berechnen: $f_\\mathrm{z} = |f_\\mathrm{e} \\pm f_\\mathrm{o}|$ — Summe und Differenz sind die erwünschten Produkte',
    'Frequenzvervielfacherketten auswerten (Faktoren multiplizieren) und erklären, warum Abweichungen mit vervielfacht werden',
    'Konverter und Transverter erkennen und erklären: Umsetzung **durch Mischung**, stabiler Lokaloszillator nötig',
  ],
  needs: ['elektrotechnik/oszillatoren', 'elektrotechnik/mischer-superhet', 'elektrotechnik/schwingkreis'],
  blocks: [
    {
      id: 'oszillator', type: 'text', title: 'Oszillatoren: das Herz des Funkgeräts',
      md: `
Ein **[Oszillator](wiki:Oszillator)** erzeugt eine hochfrequente Schwingung — er ist das Herz jedes Senders und Empfängers. Das Grundprinzip: Ein Verstärker speist einen Teil seines Ausgangssignals über eine [Rückkopplung](wiki:Rückkopplung|Feedback) wieder an den Eingang zurück, und ein **frequenzbestimmendes Bauteil** legt fest, bei welcher Frequenz das Ganze schwingt.[^darc-50ohm]

**LC-Oszillator (ED501).** Die Frequenz wird von einem **Schwingkreis aus Spule und Kondensator** bestimmt, $f_0 = 1/(2\\pi\\sqrt{L\\cdot C})$. Bekannte Schaltungen heißen [Colpitts](wiki:Colpitts-Schaltung|Colpitts oscillator) und [Hartley](wiki:Hartley-Schaltung|Hartley oscillator). Nachteil: $L$ und $C$ ändern sich mit der **Temperatur**, und damit die Frequenz.

**Drift (ED502–ED505).** Aus der Formel folgt direkt, in welche Richtung die Frequenz wandert:

| Bei steigender Temperatur … | … wird die Frequenz |
|---|---|
| Kapazität **größer** | **niedriger** |
| Kapazität **kleiner** | **höher** |
| Induktivität **größer** | **niedriger** |
| Induktivität **kleiner** | **höher** |

Die Frequenzänderung erfolgt **langsam** (thermische Trägheit), nicht sprunghaft, und die Schwingung reißt nicht ab (EF304): Die Frequenz des Oszillators ändert sich langsam. Ein **VFO** ([Variable Frequency Oscillator](wiki:Variable Frequency Oscillator|Variable-frequency oscillator)) ist ein durchstimmbarer LC-Oszillator und driftet entsprechend.

**Quarzoszillator (ED506, ED507).** Hier bestimmt ein **[Schwingquarz](wiki:Schwingquarz|Crystal resonator)** die Frequenz: ein [Quarzoszillator](wiki:Quarzoszillator|Crystal oscillator) schwingt auf der mechanischen Resonanz des Kristalls, die kaum von der Temperatur abhängt. Der Quarz **verstärkt nicht** und filtert nicht, er legt die Frequenz fest. Vorteil gegenüber dem LC-Oszillator: **bessere Frequenzstabilität** (nicht: breitere Resonanzkurve, größerer Abstimmbereich oder fehlende Oberschwingungen — ein Quarz lässt sich kaum abstimmen!).

Zur Erzeugung vieler frei einstellbarer Frequenzen mit Quarzstabilität nutzt man heute die [Phasenregelschleife](wiki:Phasenregelschleife|Phase-locked loop) (PLL) oder die [Direkte Digitale Synthese](wiki:Direct Digital Synthesis|Direct digital synthesis) (DDS): Ein steuerbarer Oszillator wird an einen Quarz „angebunden“.

**Abschirmung (EF206, EF207).** Oszillator und Mischer erzeugen HF und können sie abstrahlen. Gegen unerwünschte Abstrahlungen schirmt man sie **gut ab** (geerdetes Metallgehäuse) — nicht ungeschirmt, nicht mit ungesiebter Speisespannung.`,
    },
    {
      id: 'viz-osz', type: 'viz', viz: 'oscillator-lab', title: 'Oszillator-Labor',
      params: { targetF: 7.1e6, tol: 0.015, dT: 30 },
      task: 'Stelle den LC-Oszillator auf **7,1 MHz** ein und vergleiche danach die Frequenzdrift eines LC-Oszillators mit der eines Quarzes bei einer Temperaturänderung von 30 K.',
    },
    {
      id: 'quiz-drift', type: 'quiz', title: 'Temperaturdrift',
      question: 'Bei einem LC-Oszillator wird bei steigender Temperatur die **Induktivität kleiner**. Was passiert mit der Frequenz?',
      options: [
        { text: 'Die Frequenz wird höher.', correct: true, why: '$f_0 = 1/(2\\pi\\sqrt{LC})$: kleineres $L$ ergibt größeres $f_0$.' },
        { text: 'Die Frequenz wird niedriger.', why: 'Das gilt bei größer werdendem $L$ (oder $C$).' },
        { text: 'Die Schwingungen reißen sofort ab.', why: 'Der Oszillator schwingt weiter, nur auf geänderter Frequenz.' },
        { text: 'Die Frequenz bleibt stabil.', why: 'Das wäre ein Quarz — LC-Kreise driften.' },
      ],
    },
    {
      id: 'mischer', type: 'text', title: 'Der Mischer: Summe und Differenz',
      md: `
Ein [Mischer](wiki:Mischer (Elektronik)|Frequency mixer) **multipliziert** zwei Signale mit Hilfe einer Nichtlinearität (z. B. Dioden). Aus der Trigonometrie folgt: Das Produkt zweier Sinusschwingungen besteht aus zwei neuen Schwingungen bei der **Summe** und der **Differenz** der Eingangsfrequenzen. Im Blockschaltbild ist der Mischer ein **Kreis mit Malkreuz**. Am Ausgang erscheinen als **erwünschte Mischprodukte**:

$$f_\\mathrm{z1} = f_\\mathrm{e} + f_\\mathrm{o} \\qquad f_\\mathrm{z2} = |f_\\mathrm{e} - f_\\mathrm{o}|$$

$f_\\mathrm{e}$ ist die Eingangsfrequenz, $f_\\mathrm{o}$ die Oszillatorfrequenz (die Betragsstriche verhindern negative Frequenzen).[^bnetza-formelsammlung] Ein **Filter** nach dem Mischer wählt das gewünschte Produkt aus, das andere wird unterdrückt.

**Beispiele aus der Prüfung:**
- 21 MHz und 31,7 MHz → 52,7 MHz und **10,7 MHz** (EF201).
- 28 MHz und 38,7 MHz → 66,7 MHz und 10,7 MHz (EF202).
- 30 MHz und 39 MHz → 69 MHz und 9 MHz (EF203).
- 136 MHz und 145 MHz → 281 MHz und 9 MHz (EF204, EF205).

Die Fallen: die Eingangsfrequenzen selbst (30 MHz und 39 MHz) sind **nicht** die erwünschten Produkte; und die **Doppelte** oder die **Hälfte** (272 MHz, 290 MHz) kommt nicht heraus. Immer einfach: **addieren** und **subtrahieren**.

Im [Überlagerungsempfänger](wiki:Überlagerungsempfänger|Superheterodyne receiver) mischt man das Empfangssignal mit einem Oszillator auf die feste [Zwischenfrequenz](wiki:Zwischenfrequenz|Intermediate frequency) (z. B. 9 MHz oder 10,7 MHz). Zur [Spiegelfrequenz](wiki:Spiegelfrequenz|Image frequency) kommst du in der Empfänger-Lektion. Im Sender setzt man mit Mischern das Signal auf die Sendefrequenz um.`,
    },
    {
      id: 'viz-mischer', type: 'viz', viz: 'mischer-spektrum', title: 'Mischer-Spektrum',
      task: 'Erreiche die drei Ziele: ZF 10,7 MHz bei 28 MHz Eingang, 9 MHz bei 145 MHz Eingang und gleichzeitig Summe 66,7 MHz und Differenz 10,7 MHz.',
    },
    {
      id: 'calc-mix', type: 'numeric', title: 'Mischprodukt',
      question: 'Ein Mischer bekommt 14,2 MHz und 3,5 MHz zugeführt. Wie groß ist die **Differenzfrequenz**?',
      answer: 10.7, tolerance: 0.05, unit: 'MHz',
      hint: '$|f_\\mathrm{e} - f_\\mathrm{o}|$.',
      explain: '$14{,}2 - 3{,}5 = 10{,}7\\,\\text{MHz}$. Die Summe ($17{,}7$ MHz) ist das zweite erwünschte Produkt.',
    },
    {
      id: 'calc-mix2', type: 'numeric', title: 'Oszillatorfrequenz berechnen',
      question: 'Ein Empfänger soll das 2-m-Signal 145,5 MHz auf 10,7 MHz heruntermischen (Differenz, Oszillator oberhalb). Welche Oszillatorfrequenz brauchst du?',
      answer: 156.2, tolerance: 0.1, unit: 'MHz',
      hint: '$f_\\mathrm{o} - f_\\mathrm{e} = f_\\mathrm{ZF}$.',
      explain: '$f_\\mathrm{o} = 145{,}5 + 10{,}7 = 156{,}2\\,\\text{MHz}$ (alternativ unterhalb: 134,8 MHz).',
    },
    {
      id: 'verv', type: 'text', title: 'Frequenzvervielfacher',
      md: `
Früher baute man Mehrbandsender mit **einem** stabilen Oszillator im niedrigsten Band (z. B. 3,5 MHz) und erzeugte die höheren Bänder durch **Frequenzvervielfachung**. Ein Vervielfacher erzeugt mit einer Nichtlinearität (Diode, Verstärker im C-Betrieb) Oberwellen und wählt mit einem **Bandpass** die gewünschte aus. Im Blockschaltbild ist er ein Kästchen mit Diagonale: „$f$ / $2f$“ bedeutet **×2**, „$f$ / $3f$“ **×3**.

**Hintereinander geschaltete Vervielfacher multiplizieren ihre Faktoren:** Eine Kette ×2, ×3, ×2 ergibt Faktor $2\\cdot3\\cdot2 = 12$. Rückwärts rechnet man durch die Faktoren **dividieren**:

- **EF301:** 145,200 MHz am Ausgang der Kette ×2·×3·×2 → Quarz $= 145{,}2/12 = 12{,}1\\,\\text{MHz}$.
- **EF302/EF303:** Ein VFO speist Stufen ×2, dann weiter ×2 und ×3 an verschiedenen Abgriffen. Am Ausgang mit **21,360 MHz** (Faktor 6) ist der VFO auf $21{,}36/6 = 3{,}560\\,\\text{MHz}$ eingestellt; am Ausgang mit Faktor 4 und VFO 3,51 MHz erscheinen $4\\cdot3{,}51 = 14{,}04\\,\\text{MHz}$. Lies den **Signalweg** vom VFO bis zum markierten Ausgang ab und multipliziere die Faktoren auf dem Weg.

**Wichtig:** Die Vervielfachung wirkt auch auf die **Frequenzabweichung**. Driftet der Oszillator um 100 Hz, so driftet die Ausgangsfrequenz bei Faktor 12 um 1,2 kHz — bei SSB schon untragbar. Deshalb brauchen Sender für hohe Frequenzen besonders **stabile Oszillatoren** (Quarz, Thermostat, PLL).`,
    },
    {
      id: 'viz-verv', type: 'viz', viz: 'vervielfacher-kette', title: 'Vervielfacherkette bauen',
      task: 'Baue Ketten für **14,2 MHz** (aus 3,55 MHz) und **145,2 MHz** (aus 12,1 MHz) und reduziere die Oszillator-Abweichung so, dass am Ausgang weniger als **1 kHz** Abweichung entstehen.',
    },
    {
      id: 'calc-kette', type: 'numeric', title: 'Kettenfaktor',
      question: 'Ein Quarz schwingt auf 8,0 MHz; es folgen Stufen ×3, ×2 und ×3. Welche Ausgangsfrequenz entsteht?',
      answer: 144, tolerance: 0.5, unit: 'MHz',
      hint: 'Faktor = 3 · 2 · 3 = 18.',
      explain: '$8\\,\\text{MHz}\\cdot18 = 144\\,\\text{MHz}$ — genau das 2-m-Band. Eine Drift von 50 Hz am Quarz ergibt $18\\cdot50 = 900$ Hz am Ausgang.',
    },
    {
      id: 'transverter', type: 'text', title: 'Konverter und Transverter',
      md: `
Mit einem **Konverter** oder **Transverter** erschließt du mit einem vorhandenen Funkgerät **weitere Bänder**, die es nicht abdeckt. Die Umsetzung geschieht **durch Mischung** (nicht durch Vervielfachung, Frequenzteilung oder Rückkopplung; EF502): Das Signal wird mit einem festen Lokaloszillator in ein anderes Band geschoben.[^darc-50ohm]

- **Konverter:** setzt nur **in einer Richtung** um — entweder im Empfangspfad (RX) oder im Sendepfad (TX).
- **Transverter:** hat eine **Sende-/Empfangsumschaltung** und zwei Signalwege (TX und RX): **beim Senden** setzt er das Signal des Transceivers (z. B. im 10-m-Band) **hoch** auf das Zielband (z. B. 2 m), **beim Empfangen** setzt er das Zielband **herunter** in das Band des Transceivers (EF501). Es wird nicht in beiden Richtungen derselbe Weg gegangen und nicht die Betriebsart gewechselt (FM → AM oder DMR → D-Star ist keine Aufgabe eines Transverters).

**Blockschaltbilder lesen (EF503, EF504):**
- **2-m-Transverter:** Ein Quarz mit 38,666 MHz und ein Vervielfacher ×3 liefern 116 MHz als Lokaloszillator. TX: $28\\ldots30\\,\\text{MHz} + 116\\,\\text{MHz} = 144\\ldots146\\,\\text{MHz}$. RX: $144\\ldots146 - 116 = 28\\ldots30\\,\\text{MHz}$. Zwei Mischer, TX/RX-Umschaltung, Antenne → **Transverter**.
- **13-cm-Konverter:** Eingang 144 MHz (aus einem VHF-Sender), Mischer mit 2,256 GHz (aus einem 10-MHz-TCXO über eine PLL) → $144\\,\\text{MHz} + 2{,}256\\,\\text{GHz} = 2{,}4\\,\\text{GHz}$, mit Filtern. Nur ein Mischer, kein Umschalter: ein **Konverter für einen VHF-Sender** (z. B. für den Satelliten QO-100).

**Stabiler Lokaloszillator (EF505).** Bei Transvertern für den Satellitenbetrieb (Uplink 2,4 GHz) wird die Oszillatorfrequenz **vervielfacht**, und damit vervielfacht sich auch ihre **Abweichung** — für SSB wäre sie zu groß. Daher temperaturstabilisierter Oszillator (TCXO) oder Synchronisation mit einem höherwertigen Frequenznormal (z. B. GPS-Referenz). Nicht „heruntergemischt, deshalb kleinere Abweichung“ und nicht „Nebenaussendungen nehmen zu“.`,
    },
    {
      id: 'match-trans', type: 'match', title: 'Baugruppe → Aufgabe',
      prompt: 'Ordne die Baugruppe ihrer Aufgabe zu.',
      pairs: [
        ['Mischer', 'bildet Summe und Differenz zweier Frequenzen'],
        ['Frequenzvervielfacher', 'erzeugt ein ganzzahliges Vielfaches der Eingangsfrequenz'],
        ['Quarzoszillator', 'liefert eine sehr stabile Festfrequenz'],
        ['Transverter', 'setzt TX und RX zwischen zwei Bändern um'],
      ],
    },
    {
      id: 'order-signal', type: 'order', title: 'Sendezweig eines Transverters',
      prompt: 'Bringe die Stufen im **Sendezweig** eines 2-m-Transverters in die richtige Reihenfolge.',
      items: ['10-m-Signal vom Transceiver (28–30 MHz)', 'Mischer (mit 116 MHz vom Lokaloszillator)', 'Bandfilter (wählt 144–146 MHz)', 'Verstärker (PA)', 'Antenne (2 m)'],
      explain: 'Erst mischen, dann filtern (unerwünschte Produkte weg), dann verstärken und abstrahlen.',
    },
    {
      id: 'mission-osz', type: 'callout', tone: 'mission', title: 'Funkpraxis: Warum dein Transceiver driftet — oder nicht',
      md: `Alte Röhren- und Transistorgeräte mit VFO „wanderten“ beim Aufwärmen: Die Frequenz driftete langsam mit der Temperatur (typisch nach unten, weil Spulen und Kondensatoren sich erwärmen). Moderne Transceiver steuern alles aus **einem** Referenzquarz (oft temperaturstabilisiert, TCXO) über PLL und DDS — dadurch bleiben sie auf wenige Hertz stabil. Wer beim **Satellitenbetrieb auf 2,4 GHz** oder in 10 GHz-Schmalbandtechnik arbeitet, kommt um einen **GPS-synchronisierten** Lokaloszillator nicht herum, weil schon wenige ppm Drift auf der Endfrequenz mehrere kHz ergeben.`,
    },
    {
      id: 'recall-osz', type: 'recall', title: 'In eigenen Worten',
      prompt: 'Warum ist ein Quarzoszillator stabiler als ein LC-Oszillator? Welche Frequenzen entstehen, wenn ein Mischer 145 MHz und 136 MHz bekommt? Und warum muss der Oszillator eines GHz-Transverters besonders stabil sein?',
      answer: 'Beim LC-Oszillator hängen L und C von der Temperatur ab, und die Frequenz driftet langsam; beim Quarz bestimmt die kaum temperaturabhängige mechanische Resonanz des Kristalls die Frequenz, also bessere Frequenzstabilität. Der Mischer erzeugt Summe und Differenz: 145 + 136 = 281 MHz und 145 − 136 = 9 MHz. Beim GHz-Transverter wird die Oszillatorfrequenz vervielfacht und damit auch ihre Abweichung, die für SSB bzw. Schmalband sonst zu groß würde.',
      cards: ['osz-quarz', 'osz-mischer'],
    },
  ],
  cards: [
    { id: 'osz-lc', front: 'LC-Oszillator: was bestimmt die Frequenz?', back: 'Ein Schwingkreis aus Spule und Kondensator, $f_0=1/(2\\pi\\sqrt{LC})$.' },
    { id: 'osz-drift', front: 'LC-Oszillator: C oder L wird größer (Temperatur)?', back: 'Die Frequenz wird **niedriger** (kleiner ⇒ höher). Die Änderung erfolgt langsam.' },
    { id: 'osz-quarz', front: 'Quarzoszillator: Merkmal und Vorteil?', back: 'Frequenz wird durch den **Schwingquarz** bestimmt; **bessere Frequenzstabilität** (aber kaum abstimmbar).' },
    { id: 'osz-vfo', front: 'Was ist ein VFO und was passiert bei Temperaturschwankungen?', back: 'Durchstimmbarer Oszillator; die Frequenz ändert sich **langsam**.' },
    { id: 'osz-mischer', front: 'Mischprodukte?', back: '$f_\\mathrm{z}=|f_\\mathrm{e}\\pm f_\\mathrm{o}|$: **Summe und Differenz** sind die erwünschten Produkte.' },
    { id: 'osz-bsp', front: '136 MHz mischen mit 145 MHz?', back: '9 MHz und 281 MHz. (21 + 31,7 = 52,7; 31,7 − 21 = 10,7 MHz.)' },
    { id: 'osz-verv', front: 'Vervielfacherkette ×2, ×3, ×2?', back: 'Faktoren multiplizieren: ×12. Rückwärts dividieren: 145,2 MHz / 12 = 12,1 MHz.' },
    { id: 'osz-abw', front: 'Was passiert mit der Oszillatorabweichung bei Vervielfachung?', back: 'Sie wird mit vervielfacht (100 Hz × 12 = 1,2 kHz) — daher stabile Oszillatoren.' },
    { id: 'osz-abschirm', front: 'Wie vermeidet man unerwünschte Abstrahlung von Oszillator und Mischer?', back: 'Gute Abschirmung (geerdetes Metallgehäuse).' },
    { id: 'osz-trans', front: 'Transverter vs. Konverter?', back: 'Transverter: TX und RX, Umschaltung, zwei Mischer. Konverter: nur eine Richtung.' },
    { id: 'osz-mischen', front: 'Wie setzt ein Transverter um?', back: '**Durch Mischung** (nicht Vervielfachung, Teilung oder Rückkopplung).' },
    { id: 'osz-2m', front: '2-m-Transverter mit 116 MHz?', back: 'TX: 28–30 MHz + 116 MHz = 144–146 MHz; RX: 144–146 − 116 = 28–30 MHz. (116 = 38,666 MHz × 3)' },
    { id: 'osz-ghz', front: 'Warum stabiler Lokaloszillator bei 2,4-GHz-Transverter?', back: 'Die Oszillatorfrequenz wird vervielfacht und damit auch die Abweichung — für SSB zu groß. TCXO oder GPS-Referenz.' },
  ],
};
