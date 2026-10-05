export default {
  id: 'fourier-spektrum',
  title: 'Fourier, Oberwellen, Spektrum',
  summary: 'Jedes periodische Signal ist eine Summe von Sinus-Schwingungen: Grundwelle plus Oberwellen. Warum ein Rechteck nur ungerade Harmonische mit 1/n hat, warum Übersteuerung Störungen auf anderen Bändern erzeugt und was ein Spektrumanalysator zeigt.',
  minutes: 30,
  needs: ['dezibel', 'schwingkreis', 'rc-rl-filter'],
  goals: [
    'Erklären, dass jedes periodische Signal nach [[fourier-analyse|Fourier]] aus [[sinus|Sinus-Schwingungen]] besteht: [[grundwelle|Grundwelle]] plus [[oberwellen|Oberwellen]] mit Frequenzen $n\\cdot f_0$',
    'Das [[spektrum|Spektrum]] einer [[rechteckschwingung|Rechteckschwingung]] angeben: nur ungerade Harmonische mit Amplitude $1/n$',
    'Verstehen, warum [[uebersteuerung|Übersteuerung]] (Begrenzung) Oberwellen erzeugt und der [[klirrfaktor|Klirrfaktor]] steigt',
    'Zeit- und Frequenzbereich zusammendenken: ein [[tiefpass|Tiefpass]] schneidet Oberwellen ab und rundet die Ecken',
    'Oberwellenfrequenzen eines Senders berechnen und den Bändern zuordnen',
  ],
  blocks: [
    {
      id: 'intuition', type: 'text', title: 'Ein Akkord statt einer einzelnen Saite',
      md: String.raw`
Schlägst du auf dem Klavier die Taste $a$ an, hörst du einen **Grundton**; zugleich schwingen aber leiser die Töne mit doppelter, dreifacher, vierfacher Frequenz mit. Genau diese Beimischung unterscheidet eine Geige von einer Flöte, obwohl beide dieselbe Tonhöhe spielen: sie haben ein anderes **Spektrum**.

Der Mathematiker [Joseph Fourier](wiki:Joseph Fourier|Joseph Fourier) hat 1822 gezeigt, dass sich jede periodische Schwingung als Summe von Sinus-Schwingungen schreiben lässt, deren Frequenzen ganzzahlige Vielfache der Grundfrequenz $f_0$ sind — die [Fourierreihe](wiki:Fourierreihe|Fourier series):

$$ u(t) = U_0 + \sum_{n=1}^{\infty} \hat U_n \,\sin\!\big(2\pi\, n f_0\, t + \varphi_n\big) $$

Der Term mit $n=1$ ist die **Grundwelle** (Grundschwingung) mit $f_0$, die Terme mit $n\ge2$ heißen **Oberwellen** oder [Harmonische](wiki:Oberschwingung|Harmonic): die 2. Oberwelle hat $2f_0$, die 3. hat $3f_0$ usw. (Vorsicht bei der Zählung: manche Autoren nennen $2f_0$ die „1. Oberwelle“; in der Prüfung steht meist „2. Harmonische = 2. Oberwelle = $2f_0$“.)

Eine reine Sinusschwingung hat also genau **eine** Spektrallinie. Jede Abweichung von der Sinusform — eine Ecke, eine Kappung, eine Pulsform — bedeutet: weitere Linien kommen hinzu.[^kuphaldt-ac-kap7]`,
    },
    {
      id: 'demo-fourier', type: 'viz', viz: 'fourier-lab', title: 'Signale aus Sinus bauen, filtern, verzerren',
      intro: String.raw`**Teil 1:** Ziehe im Spektrum die Balken der Oberwellen nach oben/unten (Grundwelle = 100 %). Die blaue Kurve oben ist die Summe aller Sinus-Schwingungen, die gestrichelte das Ziel. Probiere die Vorlagen (Rechteck, Dreieck, Sägezahn, Impulsfolge), den Phasenversatz und den Tiefpass. **Teil 2:** Ein Sinus wird begrenzt — schau, welche Oberwellen entstehen.`,
      params: { f0: 1000, distortGoal: 20 },
      task: String.raw`Baue zuerst **von Hand** ein Rechteck (Vorlage „Eigenbau“, ungerade Oberwellen bis $n=13$ mit etwa $100\,\%/n$, ohne Hilfe), wende dann einen **Tiefpass** ($n_g\le5$) auf ein Rechteck an und **übersteuere** schließlich den Verstärker in Teil 2, bis der Klirrfaktor über 20 % liegt.`,
      caption: 'Das Rechteck braucht viele Oberwellen für scharfe Ecken. Der Überschwinger an den Ecken bleibt trotz mehr Oberwellen (Gibbssches Phänomen). Der Phasenversatz ändert die Form, aber nicht das Spektrum.',
    },
    {
      id: 'rechteck', type: 'text', title: 'Das Rechteck: nur ungerade Harmonische, Amplitude 1/n',
      md: String.raw`
Das [Rechtecksignal](wiki:Rechteckschwingung|Square wave (waveform)) ist das wichtigste Beispiel, denn es entsteht überall, wo ein Transistor schaltet (Taktgeber, Schaltnetzteil, Digitalschaltung). Seine Fourierreihe für ein symmetrisches Rechteck mit Spitzenwert $\hat U$ lautet

$$ u(t) = \frac{4\hat U}{\pi}\left(\sin\omega_0 t + \frac13\sin 3\omega_0 t + \frac15\sin 5\omega_0 t + \frac17\sin 7\omega_0 t+\dots\right) $$

- **Nur ungerade** Harmonische ($3f_0, 5f_0, 7f_0, \dots$): Das Signal ist punktsymmetrisch und hat keinen Gleichanteil.
- Die Amplitude fällt wie **$1/n$**: die 3. Harmonische hat $1/3$ der Grundwelle (≈ −9,5 dB), die 5. nur $1/5$ (−14 dB). Das ist ein *langsamer* Abfall — deshalb sind Rechteck-Störungen bis weit ins HF-Gebiet zu hören.
- Je **schärfer die Flanke**, desto mehr Oberwellen: Ein ideales Rechteck bräuchte unendlich viele.

Andere Signalformen haben andere Spektren: Das [Dreieck](wiki:Dreieckschwingung|Triangular function) hat ebenfalls nur ungerade Harmonische, aber mit $1/n^2$ (viel schneller abfallend, deshalb ist es „weicher“); der [Sägezahn](wiki:Sägezahnschwingung|Sawtooth wave) hat *alle* Harmonischen mit $1/n$. Eine **schmale Impulsfolge** hat ein sehr breites Spektrum, weil sie kurze, steile Flanken enthält — Faustregel: kürzere Impulse → größere Bandbreite.

Wie stark die Oberwellen insgesamt sind, misst der [Klirrfaktor](wiki:Klirrfaktor|Total harmonic distortion#Definitions and examples) $k$ (englisch THD, *total harmonic distortion*):

$$ k = \frac{\sqrt{U_2^2 + U_3^2 + U_4^2+\dots}}{U_1} $$

Beim Rechteck ist $k \approx 48\,\%$, beim Dreieck nur etwa $12\,\%$, beim Sinus $0\,\%$.`,
    },
    {
      id: 'calc-ratio', type: 'numeric', title: 'Amplitude der 3. Oberwelle',
      question: String.raw`Ein symmetrisches Rechtecksignal hat die Grundwelle $\hat U_1 = 1$. Wie groß ist die Amplitude der **3. Harmonischen** relativ zur Grundwelle (als Zahl, nicht in Prozent)?`,
      answer: 0.333, tolerance: 0.005,
      hint: String.raw`Ungerade Harmonische fallen mit $1/n$.`,
      explain: String.raw`$\hat U_3/\hat U_1 = 1/3 \approx 0{,}333$. Das sind $20\lg(1/3) \approx -9{,}5$ dB unter der Grundwelle.`,
    },
    {
      id: 'calc-db5', type: 'numeric', title: 'Die 5. Harmonische in dB',
      question: String.raw`Um wie viel dB liegt die **5. Harmonische** eines Rechtecks unter der Grundwelle? (Betrag in dB, positive Zahl)`,
      answer: 14, tolerance: 0.2, unit: 'dB',
      hint: String.raw`Amplitudenverhältnis $1/5$; Spannungsverhältnis → $20\lg$.`,
      explain: String.raw`$20\lg(1/5) = -13{,}98$ dB, also rund $14$ dB unter der Grundwelle. (Merke: 3. Harmonische ≈ 9,5 dB, 5. ≈ 14 dB, 7. ≈ 17 dB.)`,
    },
    {
      id: 'quiz-gerade', type: 'quiz', title: 'Welche Harmonischen?',
      question: 'Welche Harmonischen enthält ein symmetrisches Rechtecksignal (ohne Gleichanteil)?',
      options: [
        { text: 'Nur ungerade: $f_0, 3f_0, 5f_0, \\dots$', correct: true, why: 'Die Symmetrie des Rechtecks lässt alle geraden Harmonischen verschwinden.' },
        { text: 'Alle ganzzahligen Vielfachen von $f_0$ mit gleicher Amplitude.', correct: false, why: 'Dann hätte das Signal unendliche Leistung; die Amplituden fallen wie $1/n$.' },
        { text: 'Nur gerade: $2f_0, 4f_0, 6f_0, \\dots$', correct: false, why: 'Gerade Harmonische gehören zum Sägezahn und zu unsymmetrischen Signalen, nicht zum symmetrischen Rechteck.' },
        { text: 'Nur die Grundwelle: Ein Rechteck ist eine Frequenz.', correct: false, why: 'Das ist die klassische Fehlvorstellung: nur der Sinus hat genau eine Frequenz. Ein Rechteck ist eine Summe vieler Sinus-Schwingungen.' },
      ],
    },
    {
      id: 'verzerrung', type: 'text', title: 'Verzerrung erzeugt Oberwellen',
      md: String.raw`
Ein **linearer** Verstärker, Filter oder Kondensator macht aus einem Sinus wieder einen Sinus (nur anders groß oder verschoben). Eine **nichtlineare** Kennlinie dagegen nicht — und dabei entstehen neue Frequenzen: Oberwellen.

Das kennst du aus Teil 2 der Demo: Wird der Sinus bei $\pm 1\,\text{V}$ **abgeschnitten** (Clipping, Sättigung), bekommt er „Ecken“; im Spektrum tauchen die **3., 5., 7., … Harmonischen** auf. Bei zwei Mal so großer Eingangsamplitude wie die Begrenzung (Faktor 2) beträgt der Klirrfaktor bereits etwa 23 %.

Für den Funkamateur ist das der Grund, warum man **Endstufen nie übersteuern** darf: Eine zu große Aussteuerung erzeugt Oberwellen, die im Sender mit der Grundwelle verstärkt und ausgestrahlt werden. Sendest du auf 145 MHz, liegt die 3. Oberwelle bei 435 MHz — mitten im 70-cm-Band und im Fernsehband anderer Dienste. Auf Kurzwelle fällt die 2. Oberwelle von 7,1 MHz auf 14,2 MHz, die 3. auf 21,3 MHz — beide in anderen Amateurfunkbändern.[^bnetza-pruefungsfragen-2024]

Gegenmaßnahme: ein **Oberwellenfilter** hinter dem Sender — ein [Tiefpass](wiki:Tiefpass|Low-pass filter), dessen Grenzfrequenz knapp über dem Nutzband liegt. Er lässt die Grundwelle durch und dämpft alles darüber.`,
    },
    {
      id: 'calc-harm', type: 'numeric', title: 'Oberwelle eines KW-Senders',
      question: String.raw`Ein Sender arbeitet auf $f_0 = 7{,}1\,\text{MHz}$. Auf welcher Frequenz liegt die **3. Oberwelle**?`,
      answer: 21.3, tolerance: 0.05, unit: 'MHz',
      explain: String.raw`$3\cdot7{,}1\,\text{MHz} = 21{,}3\,\text{MHz}$ — im 15-m-Band (21,0 – 21,45 MHz). Die 2. Oberwelle liegt bei $14{,}2$ MHz im 20-m-Band.`,
    },
    {
      id: 'calc-thd', type: 'numeric', title: 'Klirrfaktor ausrechnen',
      question: String.raw`Ein Verstärker liefert bei der Grundwelle $U_1 = 10\,\text{V}$ außerdem $U_2 = 1\,\text{V}$ und $U_3 = 0{,}5\,\text{V}$ (höhere Harmonische vernachlässigt). Wie groß ist der Klirrfaktor $k$ in Prozent?`,
      answer: 11.2, tolerance: 0.2, unit: '%',
      hint: String.raw`Quadrate addieren, Wurzel ziehen, durch $U_1$ teilen.`,
      explain: String.raw`$k = \sqrt{1^2+0{,}5^2}\,/\,10 = \sqrt{1{,}25}/10 = 0{,}1118 \approx 11{,}2\,\%$.`,
    },
    {
      id: 'quiz-ueberst', type: 'quiz', title: 'Warum stört eine übersteuerte Endstufe?',
      question: 'Warum erzeugt eine übersteuerte Endstufe Störungen auf anderen Frequenzen und Bändern?',
      options: [
        { text: 'Die Begrenzung verformt den Sinus; die Verzerrung erzeugt Oberwellen, die mit ausgestrahlt werden.', correct: true, why: 'Nichtlinearität → neue Spektrallinien bei $2f_0$, $3f_0$, … Im Katalog: „Die Übersteuerung eines Leistungsverstärkers führt zu einem hohen Anteil an Nebenaussendungen“ (EJ213).' },
        { text: 'Der Sender wird dann automatisch schneller und damit höherfrequent.', correct: false, why: 'Die Grundfrequenz bestimmt der Oszillator, nicht die Aussteuerung.' },
        { text: 'Die Grundwelle wird kleiner und die Antenne strahlt dann zufällig auf anderen Bändern.', correct: false, why: 'Die Grundwelle wird nicht kleiner; zusätzlich entstehen Oberwellen.' },
        { text: 'Übersteuerung macht das Signal lauter und deshalb breiter in der Frequenz, aber nur um die Grundfrequenz herum.', correct: false, why: 'Bei AM/SSB verbreitert Übersteuerung auch das Signal (Splatter), aber hier geht es um die ganzzahligen Vielfachen von $f_0$.' },
      ],
    },
    {
      id: 'video-fourier', type: 'video', youtube: '7IlR_BRkfPI', label: 'Fourier-Transformation einfach erklärt!', channel: 'Schrack for Students', minutes: 5,
      why: 'Kurze deutsche Einführung in die Idee der Fourier-Transformation (ca. 4,5 Min.) — passend als Wiederholung nach der Demo.',
    },
    {
      id: 'video-fourier-3b1b', type: 'video', youtube: 'spUNpyF58BY', label: 'But what is the Fourier Transform? A visual introduction.', channel: '3Blue1Brown', minutes: 20,
      why: 'Optional und auf Englisch: wunderschöne Visualisierung, wie die Zerlegung in Frequenzen „aufgewickelt“ wird. Vertiefung, nicht Prüfungsstoff.',
    },
    {
      id: 'spektrum-analysator', type: 'text', title: 'Zeitbereich und Frequenzbereich: zwei Sichtweisen auf dasselbe Signal',
      md: String.raw`
Das **Oszilloskop** zeigt den **Zeitbereich**: Spannung über der Zeit. Der **[Spektrumanalysator](wiki:Spektrumanalysator|Spectrum analyzer)** zeigt den **Frequenzbereich**: Pegel (meist in dB oder dBm) über der Frequenz. Rechnerisch geht der Weg über die [Fourier-Transformation](wiki:Fourier-Transformation|Fourier transform), in der Praxis meist über die schnelle Variante, die [FFT](wiki:Schnelle Fourier-Transformation|Fast Fourier transform) — dieselbe Idee steckt in jedem SDR-Wasserfall und in jedem Audio-Analyzer-Programm.

Was der Spektrumanalysator zeigt, das ein Oszilloskop nicht zeigt:

- **Mehrere Signale gleichzeitig**, getrennt nach Frequenz (Oszilloskop: nur das Gemisch).
- **Sehr kleine Anteile** neben einem großen Signal (z. B. eine Oberwelle 60 dB unter der Grundwelle) — im Zeitbereich unsichtbar, im dB-Spektrum klar erkennbar.
- **Oberwellen, Nebenaussendungen, Brummspannungen** und Seitenbänder (nächste Lektion).

Ein **Filter** wirkt im Frequenzbereich: Er multipliziert jede Spektrallinie mit seinem Betragsverlauf. Ein [Tiefpass](wiki:Tiefpass|Low-pass filter) dämpft hohe Linien; im Zeitbereich *rundet* das die Ecken des Rechtecks ab (siehe die Tiefpass-Regler in der Demo). Dasselbe haben wir beim RC-Glied in der Zeit gesehen — es ist nur eine andere Beschreibung.

> Merke: **Spektrum = Rezeptur** des Signals — welche Sinus-Anteile in welcher Stärke. **Zeitverlauf = fertiges Gericht.** Man kann in beiden Richtungen rechnen (Analyse und Synthese).`,
    },
    {
      id: 'order-chain', type: 'order', title: 'Filtern im Spektrum',
      prompt: 'Bringe die Schritte in die richtige Reihenfolge: ein Zeitsignal soll im Spektrum gefiltert werden.',
      items: [
        'Zeitsignal aufnehmen (z. B. Rechteck mit Oberwellen)',
        'Fourier-Zerlegung: Amplituden der Harmonischen bestimmen',
        'Im Spektrum filtern: unerwünschte Linien dämpfen oder entfernen',
        'Rücksynthese: die verbleibenden Sinus-Anteile wieder zum Zeitsignal addieren',
      ],
      explain: 'Genau das macht ein Tiefpass: Er lässt die tiefen Linien durch, dämpft die hohen — das Ergebnis ist ein abgerundetes Zeitsignal.',
    },
    {
      id: 'match-formen', type: 'match', title: 'Signalform und Spektrum',
      prompt: 'Welche Spektraleigenschaft passt zu welcher Signalform?',
      pairs: [
        ['Sinus', 'genau eine Spektrallinie'],
        ['Symmetrisches Rechteck', 'nur ungerade Harmonische, Amplitude 1/n'],
        ['Dreieck', 'nur ungerade Harmonische, Amplitude 1/n²'],
        ['Sägezahn', 'alle Harmonischen, Amplitude 1/n'],
      ],
    },
    {
      id: 'warning-rechteck', type: 'callout', tone: 'warning', title: 'Fehlvorstellung: „Ein Rechteck hat eine Frequenz“',
      md: String.raw`
Ein Rechteck mit 1 kHz Wiederholrate *hat* eine Grundfrequenz von 1 kHz — aber es **besteht** aus 1 kHz, 3 kHz, 5 kHz, 7 kHz, … Wer das Rechteck mit einem Tiefpass bei 1,5 kHz filtert, behält nur die Grundwelle und erhält einen Sinus. Wer einen NF-Verstärker mit 3 kHz Bandbreite mit einem 1-kHz-Rechteck speist, sieht an den Ecken Verrundung, weil die 3., 5. … Harmonischen fehlen.

Und umgekehrt: Wenn die Ecken eines Signals nicht scharf sein dürfen, muss das Spektrum **weit** reichen. Daraus folgt der wichtige Zusammenhang der HF-Technik: **Scharfe Zeitverläufe brauchen große Bandbreite.**`,
    },
    {
      id: 'mission-fourier', type: 'callout', tone: 'mission', title: 'Prüfung & Funkpraxis',
      md: String.raw`
- **Prüfungsbezug:** Oberwellen vermeiden — Sinusträger (EJ201), Oberwellenfilter bzw. Tiefpass hinter dem Sender (EJ202, EJ203, EJ204, EJ205), Übersteuerung des Leistungsverstärkers → Nebenaussendungen (EJ213), Sender nach Verstellen des Arbeitspunkts auf Oberwellen prüfen (EF404).
- **Praxis:** Ein 100-W-Sender mit −50 dBc Oberwellen strahlt immer noch 1 mW auf der 3. Oberwelle — das reicht, um den Nachbarn zu stören. Darum: Tiefpassfilter einsetzen, nicht übersteuern, bei neuen Aufbauten das Spektrum messen (Spektrumanalysator, SDR mit Dämpfungsglied!).
- **Rechentipp:** $n$-te Oberwelle = $n\cdot f_0$. Katalogaufgaben fragen oft „auf welcher Frequenz liegt die 2./3. Oberwelle von …“.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: String.raw`
<table><tr><th>Deutsch</th><th>English</th><th>Notation</th></tr>
<tr><td>Grundwelle / Grundschwingung</td><td>fundamental</td><td>$f_0$, $\hat U_1$</td></tr>
<tr><td>Oberwelle / Oberschwingung / Harmonische</td><td>harmonic (overtone)</td><td>$n f_0$</td></tr>
<tr><td>Frequenzspektrum</td><td>frequency spectrum</td><td></td></tr>
<tr><td>Klirrfaktor</td><td>total harmonic distortion (THD)</td><td>$k$</td></tr>
<tr><td>Rechteck / Dreieck / Sägezahn</td><td>square / triangle / sawtooth wave</td><td></td></tr>
<tr><td>Spektrumanalysator</td><td>spectrum analyzer</td><td></td></tr>
<tr><td>Übersteuerung</td><td>overdrive, clipping</td><td></td></tr>
<tr><td>Oberwellenfilter</td><td>harmonic filter, low-pass filter</td><td></td></tr></table>`,
    },
    {
      id: 'recall-spektrum', type: 'recall', title: 'Erkläre es mit eigenen Worten',
      prompt: 'Was zeigt ein Spektrumanalysator, was ein Oszilloskop nicht zeigt? Nenne zwei Dinge und ein Beispiel aus der Funkpraxis.',
      answer: 'Der Spektrumanalysator zeigt den Pegel über der Frequenz. Er trennt gleichzeitige Signale nach Frequenz und macht sehr kleine Anteile neben einem großen Signal sichtbar (z. B. Oberwellen 50–60 dB unter der Grundwelle, Seitenbänder, Nebenaussendungen, Brummen). Das Oszilloskop zeigt nur die Summe als Zeitverlauf. Beispiel: Die 3. Oberwelle eines 145-MHz-Senders bei 435 MHz ist im Zeitbereich nicht erkennbar, im Spektrum klar als Linie.',
      hints: ['Welche Achse wird dargestellt?', 'Was passiert, wenn mehrere Sender gleichzeitig im Bild sind?'],
      cards: ['spek-vs-zeit', 'oberwellen-def'],
    },
  ],
  cards: [
    { id: 'fourier-idee', front: 'Grundidee der Fourier-Reihe?', back: 'Jedes periodische Signal = Summe von Sinus-Schwingungen mit Frequenzen $n\\cdot f_0$ (Grundwelle + Oberwellen), mit passenden Amplituden und Phasen.' },
    { id: 'oberwellen-def', front: 'Was ist die 3. Oberwelle eines Signals mit $f_0$?', back: 'Die Schwingung mit $3f_0$ (3. Harmonische). Beispiel: $f_0 = 145$ MHz → 435 MHz.' },
    { id: 'rechteck-harm', front: 'Welche Harmonischen hat ein symmetrisches Rechteck?', back: 'Nur ungerade ($f_0, 3f_0, 5f_0, \\dots$) mit Amplitude $\\propto 1/n$.' },
    { id: 'drittel', front: 'Amplitude der 3. Harmonischen eines Rechtecks relativ zur Grundwelle?', back: '$1/3$, also $\\approx -9{,}5$ dB. (5.: $1/5$, $-14$ dB.)' },
    { id: 'dreieck-saege', front: 'Spektren von Dreieck und Sägezahn?', back: 'Dreieck: ungerade Harmonische, $\\propto 1/n^2$. Sägezahn: alle Harmonischen, $\\propto 1/n$.' },
    { id: 'thd', front: 'Definition des Klirrfaktors $k$?', back: '$k = \\dfrac{\\sqrt{U_2^2+U_3^2+\\dots}}{U_1}$ — Effektivwert der Oberwellen bezogen auf die Grundwelle.' },
    { id: 'clip-harm', front: 'Wie entstehen Oberwellen im Verstärker?', back: 'Durch nichtlineare Kennlinie (Übersteuerung, Begrenzung, Sättigung): der Sinus wird verformt, neue Linien bei $2f_0, 3f_0,\\dots$ entstehen.' },
    { id: 'spek-vs-zeit', front: 'Spektrum vs. Zeitbereich?', back: 'Zeitbereich (Oszilloskop): Spannung über der Zeit. Frequenzbereich (Spektrumanalysator): Pegel über der Frequenz; trennt gleichzeitige Signale und zeigt kleine Anteile.' },
    { id: 'tp-ecken', front: 'Was macht ein Tiefpass mit einem Rechteck?', back: 'Er dämpft die hohen Harmonischen: die Ecken werden rund, im Grenzfall bleibt nur die Grundwelle (Sinus).' },
    { id: 'schaerfe', front: 'Wie hängen scharfe Flanken und Bandbreite zusammen?', back: 'Steile Flanken brauchen viele Oberwellen, also große Bandbreite. Kürzere Impulse → breiteres Spektrum.' },
    { id: 'oberwellen-filter', front: 'Gegenmaßnahme gegen Oberwellenaussendung beim Sender?', back: 'Tiefpassfilter (Oberwellenfilter) zwischen Sender und Antenne; Endstufe nicht übersteuern.' },
  ],
};
