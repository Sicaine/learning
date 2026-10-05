export default {
  id: 'oszillatoren',
  title: 'Rückkopplung, LC-, RC- und Quarzoszillator',
  summary: 'Wie aus einem Verstärker ein Schwingungserzeuger wird: Das Barkhausen-Kriterium, die Frequenz von LC-, RC- und Quarzoszillatoren und warum der Quarz im Funkgerät so wichtig ist.',
  minutes: 35,
  needs: ['schwingkreis', 'operationsverstaerker'],
  goals: [
    'Erklären, warum eine [[mitkopplung|Mitkopplung]] aus einem Verstärker einen [[oszillator]] macht',
    'Das [[barkhausen-kriterium]] anwenden: [[schleifenverstaerkung]] ≥ 1 und Schleifenphase n·360°',
    'Die Frequenz eines [[lc-oszillator|LC-Oszillators]] sowie von Phasenschieber- und [[wien-oszillator|Wien-Oszillatoren]] berechnen',
    'Begründen, warum ein [[quarzoszillator]] frequenzstabiler ist als ein LC-Oszillator',
  ],
  blocks: [
    {
      id: 'pfeifen', type: 'text', title: 'Das Pfeifen der Lautsprecheranlage',
      md: String.raw`
Stellst du ein Mikrofon vor den Lautsprecher, an dem es angeschlossen ist, beginnt es zu pfeifen — ohne dass jemand einen Ton erzeugt. Ein winziges Geräusch gelangt ins Mikrofon, wird verstärkt, kommt aus dem Lautsprecher, wird wieder vom Mikrofon aufgenommen und noch einmal verstärkt. Das ist eine **[[rueckkopplung|Rückkopplung]]** (engl. *feedback*), und zwar eine *mit* dem Signal laufende, eine [[mitkopplung|Mitkopplung]]: Aus Rauschen wird in Sekundenbruchteilen ein lauter Dauerton.

Genau diesen Effekt nutzt man absichtlich in jedem **[[oszillator|Oszillator]]** (siehe [Oszillatorschaltung](wiki:Oszillatorschaltung|Electronic oscillator)): Ein Verstärker speist einen Teil seines Ausgangssignals über ein *frequenzbestimmendes Glied* wieder an seinen Eingang. Dieses Glied sorgt dafür, dass nur **eine** Frequenz die Schleife „richtig" durchläuft — das Pfeifen bekommt eine feste Tonhöhe. Jeder Sender, jeder Mischer im Empfänger und jeder Mikrocontroller-Takt braucht so eine Schwingungsquelle.[^bnetza-pruefungsfragen-2024]`,
    },
    {
      id: 'barkhausen', type: 'text', title: 'Wann schwingt eine Schleife? Das Barkhausen-Kriterium',
      md: String.raw`
Der Verstärker hat die Verstärkung $V$, das Rückkopplungsglied überträgt den Bruchteil $\beta$ des Signals zurück. Einmal rund um die Schleife wird ein Signal also mit $V\cdot\beta$ multipliziert — das ist die **[[schleifenverstaerkung|Schleifenverstärkung]]**. Der Elektroingenieur [Heinrich Barkhausen](wiki:Heinrich Barkhausen|Heinrich Barkhausen) formulierte zwei Bedingungen für eine ungedämpfte Schwingung (das **[[barkhausen-kriterium|Barkhausen-Kriterium]]**):[^wiki-barkhausen-kriterium]

$$|V\cdot\beta| \ge 1 \qquad\text{und}\qquad \varphi_\text{Schleife} = n\cdot 360^\circ$$

- **Betrag:** Bei jedem Umlauf muss mindestens so viel Signal zurückkommen, wie verloren geht — sonst klingt die Schwingung ab.
- **Phase:** Das zurückgeführte Signal muss mit dem ursprünglichen *in Phase* sein (0° bzw. ein Vielfaches von 360°), sonst löscht es sich teilweise aus.

**Anschwingen:** Anfangs ist die Schleifenverstärkung *etwas größer als 1*. Dann wächst das kleine Rauschsignal von Umlauf zu Umlauf. Bei großer Amplitude wird der Verstärker nichtlinear (er geht in die Sättigung), seine Verstärkung sinkt — und die Amplitude pendelt sich dort ein, wo die effektive Schleifenverstärkung genau 1 beträgt. Ein Eingangssignal braucht der Oszillator nicht: er schwingt *aus dem [Rauschen](wiki:Rauschen (Physik)|Noise (electronics)) heraus* an.`,
    },
    {
      id: 'viz-oszillator', type: 'viz', viz: 'oscillator-lab', title: 'Oszillator-Labor: Anschwingen, Abklingen, Quarz',
      params: { targetF: 7.1e6, tol: 0.015, dT: 30 },
      task: 'Drei Ziele: (1) Fache die Schwingung an — stelle $k\\cdot\\cos\\varphi$ über 1. (2) Stimme den LC-Oszillator auf **7,1 MHz** ab (Kurzwellenband 40 m). (3) Wechsle auf **Quarz** und erwärme um mindestens 30 K (Temperaturregler) — vergleiche die Drift mit der des LC-Kreises. Probiere auch einen **Phasenfehler**: Er verschiebt die Frequenz — beim Quarz kaum, beim LC-Kreis deutlich.',
    },
    {
      id: 'lc-frequenz', type: 'text', title: 'LC-Oszillator: Der Schwingkreis legt die Frequenz fest',
      md: String.raw`
Beim **[[lc-oszillator|LC-Oszillator]]** besteht das Rückkopplungsglied aus einem [[schwingkreis|Schwingkreis]]. Nur bei seiner Resonanzfrequenz liefert er die richtige Phase und die größte Rückkopplung, deshalb schwingt die Schaltung genau dort (die Thomsonsche Schwingungsformel):

$$f_0 = \frac{1}{2\pi\sqrt{L\cdot C}}$$

Bekannte Bauformen sind die [Hartley-Schaltung](wiki:Hartley-Schaltung|Hartley oscillator) (angezapfte Spule) und die [Colpitts-Schaltung](wiki:Colpitts-Schaltung|Colpitts oscillator) (kapazitiver Spannungsteiler aus zwei Kondensatoren). Im Amateurfunk heißt ein LC-Oszillator mit einstellbarem Kondensator oder einer [Kapazitätsdiode](wiki:Kapazitätsdiode|Varicap) *VFO* (variable frequency oscillator): Damit stimmt man den Sender ab.

**Wichtig für die Prüfung:** Ändern sich $L$ oder $C$ mit der Temperatur, dann ändert sich auch $f_0$ — und zwar in die *entgegengesetzte* Richtung: Wird $C$ oder $L$ größer, sinkt die Frequenz, denn beide stehen unter der Wurzel im Nenner (ED502–ED505). Ein Oszillator im warm werdenden Gerät „wandert" deshalb langsam — der Grund, warum VFOs gut gekühlt, temperaturkompensiert und nach dem Einschalten erst einmal aufgewärmt werden.`,
    },
    {
      id: 'calc-lc', type: 'numeric', title: 'Frequenz eines LC-Oszillators',
      question: 'Ein LC-Oszillator hat $L = 5\\,\\mu\\text{H}$ und $C = 100\\,\\text{pF}$. Wie groß ist die Frequenz $f_0$ in MHz?',
      answer: 7.12, tolerance: 0.05, unit: 'MHz',
      hint: '$f_0 = \\dfrac{1}{2\\pi\\sqrt{LC}}$ — $LC = 5\\cdot10^{-6}\\cdot10^{-10} = 5\\cdot10^{-16}$, die Wurzel ist $2{,}236\\cdot10^{-8}$.',
      explain: '$f_0 = 1/(2\\pi\\cdot 2{,}236\\cdot10^{-8}\\,\\text{s}) = 7{,}12\\,\\text{MHz}$ — mitten im 40-m-Band.',
    },
    {
      id: 'quiz-lc-faktor', type: 'quiz', title: 'Was ändert die Frequenz wie?',
      question: 'Bei einem LC-Oszillator wird die Induktivität $L$ auf **ein Viertel** verkleinert, $C$ bleibt gleich. Was geschieht mit der Frequenz?',
      options: [
        { text: 'Sie verdoppelt sich.', correct: true, why: '$f\\propto 1/\\sqrt{L}$: ein Viertel von $L$ ergibt $\\sqrt{4}=2$ — doppelte Frequenz.' },
        { text: 'Sie vervierfacht sich.', why: 'Die Frequenz hängt von der *Wurzel* aus $L\\cdot C$ ab, nicht linear.' },
        { text: 'Sie halbiert sich.', why: 'Kleinere Induktivität erhöht die Frequenz.' },
        { text: 'Sie bleibt gleich, nur die Amplitude ändert sich.', why: '$L$ geht direkt in $f_0$ ein.' },
      ],
    },
    {
      id: 'rc-osz', type: 'text', title: 'RC-Oszillatoren: tiefe Frequenzen ohne Spule',
      md: String.raw`
Bei niedrigen Frequenzen (Audio, bis einige 100 kHz) wären Spulen riesig. Dort baut man Oszillatoren aus Widerständen und Kondensatoren; die Phasenbedingung erfüllt dann ein RC-Netzwerk.

**Phasenschieber-Oszillator:** Ein invertierender Verstärker dreht die Phase um 180°. Drei gleiche RC-Glieder liefern bei einer Frequenz zusammen weitere 180° (je 60°):

$$f = \frac{1}{2\pi RC\sqrt{6}}$$

Die Dämpfung der drei Glieder beträgt dort 29 — der Verstärker braucht also $V\ge 29$.

**[Wien](wiki:Max Wien|Max Wien)-Oszillator:** Die [Wien-Robinson-Brücke](wiki:Wien-Robinson-Brücke|Wien bridge) aus zwei RC-Gliedern dreht bei ihrer Mittenfrequenz die Phase gar nicht, dämpft aber auf $\tfrac13$:

$$f = \frac{1}{2\pi RC}\qquad V = 3$$

Der Wien-Oszillator ist durch die Mitkopplung über die Brücke und eine Gegenkopplung zur Amplitudenregelung sehr sauber sinusförmig.`,
    },
    {
      id: 'calc-phase', type: 'numeric', title: 'Phasenschieber-Oszillator',
      question: 'Ein Phasenschieber-Oszillator mit drei gleichen RC-Gliedern hat $R = 10\\,\\text{k}\\Omega$ und $C = 10\\,\\text{nF}$. Frequenz in Hz?',
      answer: 650, tolerance: 8, unit: 'Hz',
      hint: '$f = 1/(2\\pi RC\\sqrt{6})$ mit $RC = 10^{-4}\\,\\text{s}$ und $\\sqrt{6}\\approx 2{,}449$.',
      explain: '$f = 1/(2\\pi\\cdot10^{-4}\\cdot2{,}449) = 650\\,\\text{Hz}$.',
    },
    {
      id: 'calc-wien', type: 'numeric', title: 'Wien-Oszillator',
      question: 'Ein Wien-Oszillator hat $R = 10\\,\\text{k}\\Omega$ und $C = 10\\,\\text{nF}$. Frequenz in Hz?',
      answer: 1592, tolerance: 15, unit: 'Hz',
      hint: '$f = 1/(2\\pi RC)$.',
      explain: '$f = 1/(2\\pi\\cdot10^{-4}\\,\\text{s}) = 1{,}59\\,\\text{kHz}$; der Verstärker braucht $V = 3$.',
    },
    {
      id: 'ord-anschwingen', type: 'order', title: 'Vom Rauschen zur Dauerschwingung',
      prompt: 'Bringe das Anschwingen eines Oszillators in die richtige Reihenfolge.',
      items: [
        'Rauschen enthält auch die Resonanzfrequenz und wird verstärkt',
        'Schleifenverstärkung ≥ 1 und Phase 0°: Die Amplitude wächst Umlauf für Umlauf',
        'Der Verstärker wird nichtlinear, seine Verstärkung sinkt',
        'Die effektive Schleifenverstärkung wird genau 1',
        'Stationäre Schwingung mit konstanter Amplitude',
      ],
      explain: 'Zu Beginn muss die Schleifenverstärkung leicht über 1 liegen, im stationären Zustand sorgt die Nichtlinearität (Begrenzung) dafür, dass sie genau 1 wird.',
    },
    {
      id: 'quarz', type: 'text', title: 'Der Quarz: Frequenznormal im Funkgerät',
      md: String.raw`
Ein **[[quarz|Schwingquarz]]** ([Schwingquarz](wiki:Schwingquarz|Crystal resonator)) ist ein dünnes Plättchen aus Quarzkristall. Durch den [piezoelektrischen Effekt](wiki:Piezoelektrizität|Piezoelectricity) wandeln sich elektrische Spannung und mechanische Verformung ineinander um; das Plättchen schwingt mechanisch bei einer sehr genau festgelegten Frequenz, die durch Schnitt und Dicke bestimmt ist. Elektrisch verhält es sich wie ein Schwingkreis mit extrem hoher [Güte](wiki:Gütefaktor|Q factor) — typisch $Q = 10^4\ldots10^6$ gegenüber etwa 50–200 bei einem LC-Kreis.

Im **[[quarzoszillator|Quarzoszillator]]** ersetzt der Quarz den LC-Kreis.[^wiki-quarzoszillator] Daraus folgt:

- **sehr hohe Frequenzstabilität** — Temperatur und Betriebsspannung verschieben die Frequenz nur um wenige Millionstel (ppm); Quarzuhren ([Quarzuhr](wiki:Quarzuhr|Quartz clock)) gehen deshalb auf Sekunden pro Monat genau,
- **kaum abstimmbar** — man kann die Frequenz nur um Bruchteile eines Promille „ziehen" (zum Beispiel mit einer Kapazitätsdiode für Frequenzmodulation).

Für höchste Ansprüche wird der Quarz in einen temperaturgeregelten Behälter gesetzt ([Quarzofen](wiki:Quarzofen|Crystal oven), OCXO) oder die Temperaturabhängigkeit elektronisch kompensiert (TCXO).

**Merksatz:** *LC = abstimmbar, aber driftet; Quarz = stabil, aber fest.* Moderne Funkgeräte kombinieren beides: Ein Quarzoszillator als Referenz, von dem ein Synthesizer die einstellbaren Frequenzen ableitet.`,
    },
    {
      id: 'quiz-quarz', type: 'quiz', title: 'Quarz oder LC?',
      question: 'Welchen Vorteil hat ein **Quarzoszillator** gegenüber einem LC-Oszillator?',
      options: [
        { text: 'Er weist eine bessere Frequenzstabilität auf.', correct: true, why: 'Die Resonanz des Quarzes ist extrem scharf (Güte $10^4$ und mehr) und kaum temperaturabhängig.' },
        { text: 'Er lässt sich über einen viel größeren Frequenzbereich durchstimmen.', why: 'Das Gegenteil: Der Quarz schwingt auf einer festen Frequenz, der Abstimmbereich ist winzig.' },
        { text: 'Er benötigt keinen Verstärker.', why: 'Auch der Quarzoszillator braucht einen Verstärker, der die Verluste ausgleicht.' },
        { text: 'Er liefert eine höhere Ausgangsleistung.', why: 'Die Ausgangsleistung hängt vom Verstärker ab, nicht vom frequenzbestimmenden Element.' },
      ],
    },
    {
      id: 'calc-drift', type: 'numeric', title: 'Wie weit wandert die Frequenz?',
      question: 'Ein LC-Oszillator schwingt auf 7,1 MHz. Als Modellwert ändert sich seine Frequenz um 100 ppm je Kelvin. Um wie viele kHz wandert sie bei 20 K Erwärmung (Betrag)?',
      answer: 14.2, tolerance: 0.1, unit: 'kHz',
      hint: '$100\\,\\text{ppm} = 10^{-4}$; $\\Delta f = f\\cdot 10^{-4}/\\text{K}\\cdot 20\\,\\text{K}$.',
      explain: '$7{,}1\\,\\text{MHz}\\cdot 100\\cdot10^{-6}\\cdot 20 = 14{,}2\\,\\text{kHz}$ — im SSB-Betrieb völlig unbrauchbar (Verständlichkeit leidet schon bei wenigen hundert Hz). Ein Quarz mit 0,3 ppm/K driftet im selben Fall nur um etwa 43 Hz.',
    },
    {
      id: 'match-osz', type: 'match', title: 'Wer bestimmt die Frequenz?',
      prompt: 'Ordne jedem Oszillator das frequenzbestimmende Element zu.',
      pairs: [
        ['LC-Oszillator', 'Schwingkreis aus Spule und Kondensator'],
        ['Quarzoszillator', 'mechanische Resonanz eines Quarzplättchens'],
        ['Wien-Oszillator', 'Wien-Robinson-Brücke aus zwei RC-Gliedern'],
        ['Phasenschieber-Oszillator', 'drei RC-Glieder mit je 60° Phasendrehung'],
      ],
    },
    {
      id: 'mission-osz', type: 'callout', tone: 'mission', title: 'Prüfung / Funkpraxis',
      md: String.raw`
**Prüfungsbezug (Klasse E):** *ED501* — ein LC-Oszillator ist ein Schwingungserzeuger, dessen Frequenz von Spule und Kondensator bestimmt wird; *ED502–ED505* — Temperaturdrift von $L$ und $C$ (steigt $C$ oder $L$, **sinkt** die Frequenz); *ED506/ED507* — Quarzoszillator: Frequenz durch einen Quarz bestimmt, Vorteil ist die bessere **Frequenzstabilität**.[^bnetza-pruefungsfragen-2024] Später in Klasse A kommen VFO-Drift (EF304), TCXO/OCXO und Dreipunktschaltungen dazu.

**Funkpraxis:** Der Oszillator ist die Quelle von Senderfrequenz und Empfängerüberlagerung. Driftet er, wandert dein Signal über das Band — bei SSB hörst du dann „Micky Maus". Und weil jeder Oszillator selbst *abstrahlt*, gehört er in ein Metallgehäuse (EF207), und ein Messtastkopf verstimmt ihn schon durch seine Kapazität. Auf [Kurzwelle](wiki:Kurzwelle|High frequency) nutzt du im [40-m-Band](wiki:40-Meter-Band|40-meter band) 7,000–7,200 MHz — genau der Bereich, in den der Oszillator oben abgestimmt wurde.`,
    },
    {
      id: 'warn-osz', type: 'callout', tone: 'warning', title: 'Typische Fehlvorstellungen',
      md: String.raw`
- *„Ein Oszillator braucht ein Eingangssignal."* — Nein: Er schwingt aus Rauschen und Einschaltvorgang an, sobald $|V\beta|\ge 1$ und die Phase passt.
- *„Quarzoszillatoren sind sehr gut durchstimmbar."* — Das Gegenteil: hohe Stabilität, aber nur winziger Abstimmbereich (ED507).
- *„Schleifenverstärkung genau 1 reicht zum Anschwingen."* — Zum Anschwingen muss sie leicht **über** 1 liegen; erst die Begrenzung bringt sie auf 1 zurück.
- *„Phasenfehler machen nichts."* — Sie verschieben die Frequenz (beim LC-Kreis stark) und reduzieren die nutzbare Schleifenverstärkung auf $k\cos\varphi$.`,
    },
    {
      id: 'german-osz', type: 'callout', tone: 'german', title: 'Deutsch ↔ English',
      md: `
<table>
<tr><th>Deutsch</th><th>English</th></tr>
<tr><td>Rückkopplung / Mitkopplung</td><td>feedback / positive feedback</td></tr>
<tr><td>Schleifenverstärkung</td><td>loop gain</td></tr>
<tr><td>Schwingquarz</td><td>crystal (quartz resonator)</td></tr>
<tr><td>Quarzoszillator</td><td>crystal oscillator (XO)</td></tr>
<tr><td>Frequenzstabilität / Drift</td><td>frequency stability / drift</td></tr>
<tr><td>Anschwingen</td><td>start-up</td></tr>
<tr><td>Phasenschieber-Oszillator</td><td>phase-shift oscillator</td></tr>
</table>`,
    },
    {
      id: 'recall-osz', type: 'recall',
      prompt: 'Warum muss die Schleifenverstärkung eines Oszillators beim Einschalten **leicht größer als 1** sein, und was begrenzt danach die Amplitude?',
      answer: 'Das winzige Anfangssignal (Rauschen) wird bei jedem Umlauf mit $V\\beta>1$ größer — nur dann wächst die Schwingung an. Bei $V\\beta=1$ bliebe sie unendlich klein, bei $<1$ klänge sie ab. Mit wachsender Amplitude wird der Verstärker nichtlinear (Sättigung, Begrenzung), seine effektive Verstärkung sinkt, bis die Schleifenverstärkung genau 1 beträgt — dann bleibt die Amplitude konstant.',
      hints: ['Was passiert bei $V\\beta<1$ nach jedem Umlauf?', 'Was geschieht mit dem Verstärker bei großer Aussteuerung?'],
      cards: ['barkhausen', 'anschwingen'],
    },
  ],
  cards: [
    { id: 'barkhausen', front: 'Barkhausen-Kriterium (Schwingbedingung)?', back: 'Schleifenverstärkung $|V\\beta|\\ge 1$ und Schleifenphase $0^\\circ$ bzw. $n\\cdot 360^\\circ$ (Mitkopplung).' },
    { id: 'anschwingen', front: 'Woher kommt das erste Signal im Oszillator? Welche Verstärkung beim Start?', back: 'Aus Rauschen/Einschaltimpuls; $V\\beta$ muss zunächst $>1$ sein, die Begrenzung stellt sie später auf 1.' },
    { id: 'lc-freq', front: 'Frequenz des LC-Oszillators?', back: '$f_0 = \\dfrac{1}{2\\pi\\sqrt{LC}}$ — Spule und Kondensator des Schwingkreises bestimmen sie.' },
    { id: 'lc-temp', front: 'Wie ändert sich die Frequenz eines LC-Oszillators, wenn bei Erwärmung $C$ (oder $L$) größer wird?', back: 'Die Frequenz sinkt ($f\\propto 1/\\sqrt{LC}$).' },
    { id: 'quarz-vorteil', front: 'Vorteil eines Quarzoszillators gegenüber LC? Nachteil?', back: 'Bessere Frequenzstabilität (Güte $10^4\\ldots10^6$); dafür fast nicht abstimmbar.' },
    { id: 'quarz-effekt', front: 'Auf welchem Effekt beruht der Schwingquarz?', back: 'Piezoelektrischer Effekt: Spannung ↔ mechanische Verformung; mechanische Resonanz sehr genau und hoher Güte.' },
    { id: 'phasenschieber', front: 'Frequenz und Mindestverstärkung des Phasenschieber-Oszillators (3 RC-Glieder)?', back: '$f = \\dfrac{1}{2\\pi RC\\sqrt{6}}$, $V\\ge 29$.' },
    { id: 'wien', front: 'Frequenz und erforderliche Verstärkung des Wien-Oszillators?', back: '$f = \\dfrac{1}{2\\pi RC}$, $V = 3$.' },
    { id: 'vfo-quarz', front: 'Wie kombinieren moderne Funkgeräte Stabilität und Abstimmbarkeit?', back: 'Quarzoszillator als Referenz, daraus erzeugt ein Synthesizer die einstellbaren Frequenzen.' },
    { id: 'osz-def', front: 'Was ist ein Oszillator?', back: 'Ein Schwingungserzeuger: Verstärker mit Mitkopplung über ein frequenzbestimmendes Glied, schwingt ohne Eingangssignal.' },
  ],
};
