export default {
  id: 'modulation',
  title: 'AM, SSB, FM',
  summary: 'Wie eine Information auf einen Träger kommt: Amplitudenmodulation mit Modulationsgrad und Seitenbändern, Einseitenband (SSB) mit halber Bandbreite, Frequenzmodulation mit Hub und Carson-Bandbreite.',
  minutes: 35,
  needs: ['fourier-spektrum'],
  goals: [
    'Erklären, warum man Information auf einen [[traeger|Träger]] [[modulation|moduliert]], und die Seitenbänder im [[spektrum|Spektrum]] erkennen',
    'Den [[modulationsgrad]] $m=\\hat U_\\text{mod}/\\hat U_T$ berechnen, [[uebermodulation|Übermodulation]] erkennen und die AM-Bandbreite $B=2f_\\text{mod,max}$ angeben',
    '[[einseitenband|SSB]] beschreiben (Träger und ein [[seitenband|Seitenband]] unterdrückt) und den Bandbreiten- und Leistungsvorteil erklären',
    '[[frequenzmodulation|FM]]: [[frequenzhub|Frequenzhub]], [[modulationsindex|Modulationsindex]] und [[carson-bandbreite|Carson-Bandbreite]] $B\\approx2(\\Delta f+f_\\text{mod,max})$ berechnen',
    'Das passende Verfahren (AM, SSB, FM, Tastung) zur Anwendung nennen',
  ],
  blocks: [
    {
      id: 'intuition', type: 'text', title: 'Der Träger ist der Briefumschlag',
      md: String.raw`
Eine Sprachaufnahme besteht aus Frequenzen von etwa 300 Hz bis 3 kHz. Wollte man die direkt als elektromagnetische Welle ausstrahlen, bräuchte man Antennen von hundert Kilometern Länge, und alle Sender würden sich gegenseitig überlagern. Die Lösung: Man erzeugt eine **hochfrequente Schwingung** — den **Träger** (z. B. 7,1 MHz) — und beeinflusst eine seiner Eigenschaften im Takt der Information. Das ist **[Modulation](wiki:Modulation (Technik)|Signal modulation)**.

Ein Sinusträger hat nur drei Eigenschaften, die man verändern kann: **Amplitude**, **Frequenz** und **Phase**. Daraus ergeben sich die Verfahren: [Amplitudenmodulation](wiki:Amplitudenmodulation|Amplitude modulation) (AM, mit ihren Abkömmlingen DSB und [SSB](wiki:Einseitenbandmodulation|Single-sideband modulation)), [Frequenzmodulation](wiki:Frequenzmodulation|Frequency modulation) (FM) und Phasenmodulation (PM). Früher Pionier der AM-Sprachübertragung war [Reginald Fessenden](wiki:Reginald Fessenden|Reginald Fessenden); die rauscharme FM geht auf [Edwin Howard Armstrong](wiki:Edwin Howard Armstrong|Edwin Howard Armstrong) zurück.

Der Empfänger macht es umgekehrt: Er wählt den Träger aus, und die **Demodulation** gewinnt die Information zurück. Wir betrachten alle Verfahren im Spektrum (letzte Lektion), denn dort sieht man sofort, **wie viel Platz** ein Signal belegt — die [Bandbreite](wiki:Bandbreite|Bandwidth (signal processing)) ist im Funk das knappste Gut.`,
    },
    {
      id: 'am', type: 'text', title: 'Amplitudenmodulation: Modulationsgrad und Seitenbänder',
      md: String.raw`
Bei der **AM** folgt die Amplitude des Trägers dem NF-Signal $u_\text{mod}(t)$ (der Umriss heißt **Hüllkurve**):

$$ u(t) = \hat U_T\,\bigl(1 + m\cos\omega_\text{mod}t\bigr)\cos\omega_T t \qquad m = \frac{\hat U_\text{mod}}{\hat U_T} $$

$m$ ist der **[Modulationsgrad](wiki:Amplitudenmodulation|Amplitude modulation)** (oft in Prozent). Bei $m=1$ (100 %) schwingt die Hüllkurve zwischen 0 und $2\hat U_T$, die Aussteuerung ist voll. Bei $m>1$ kehrt die Hüllkurve ihr Vorzeichen um: **Übermodulation** — das Signal ist verzerrt und belegt wegen der entstehenden Oberwellen der NF eine **größere Bandbreite** (Splatter). Auf dem Oszilloskop liest man $m$ aus dem Hüllkurvenbild ab:

$$ m = \frac{\hat U_\text{max}-\hat U_\text{min}}{\hat U_\text{max}+\hat U_\text{min}} $$

**Im Spektrum** (Produktformel des Cosinus) besteht die AM aus drei Linien: dem **Träger** bei $f_T$ mit Amplitude $\hat U_T$ und zwei **[Seitenbändern](wiki:Seitenband|Sideband)** bei $f_T\pm f_\text{mod}$ mit je $m\hat U_T/2$. Bei Sprache sind es ganze Bänder: das **obere** (USB) und das **untere Seitenband** (LSB). Die Bandbreite ist

$$ B_\text{AM} = 2\,f_\text{mod,max} $$

Für Sprache mit $f_\text{mod,max}=3$ kHz sind das 6 kHz. Die Leistung (an einem Widerstand) ist $P_T$ für den Träger plus je $P_T m^2/4$ pro Seitenband:

$$ P_\text{AM} = P_T\left(1+\frac{m^2}{2}\right) $$

Bei $m=1$ hat die AM also $1{,}5\,P_T$, davon trägt der **Träger** zwei Drittel — und der enthält *keine* Information. Das ist der große Nachteil von AM; ihr Vorteil: Ein einfacher [Hüllkurvendemodulator](wiki:Hüllkurvendemodulator|Envelope detector) (Diode + RC) reicht zum Empfang. So arbeiten [Mittelwellen-Rundfunk](wiki:Mittelwelle|Medium frequency) und der Flugfunk.[^wiki-modulation-c9]`,
    },
    {
      id: 'calc-m', type: 'numeric', title: 'Modulationsgrad',
      question: String.raw`Ein Träger mit $\hat U_T = 4\,\text{V}$ wird mit einem NF-Signal von $\hat U_\text{mod} = 2\,\text{V}$ moduliert. Wie groß ist der Modulationsgrad $m$ (als Zahl)?`,
      answer: 0.5, tolerance: 0.01,
      explain: String.raw`$m = \hat U_\text{mod}/\hat U_T = 2\,\text{V}/4\,\text{V} = 0{,}5$ (50 %).`,
    },
    {
      id: 'calc-m-scope', type: 'numeric', title: 'Modulationsgrad aus dem Oszillogramm',
      question: String.raw`Auf dem Oszilloskop erreicht die Hüllkurve eines AM-Signals $\hat U_\text{max} = 6\,\text{V}$ und $\hat U_\text{min} = 2\,\text{V}$. Wie groß ist $m$ (als Zahl)?`,
      answer: 0.5, tolerance: 0.01,
      hint: String.raw`$m = (\hat U_\text{max}-\hat U_\text{min})/(\hat U_\text{max}+\hat U_\text{min})$.`,
      explain: String.raw`$m = (6-2)/(6+2) = 4/8 = 0{,}5$. Gleiches Ergebnis wie oben: $\hat U_T = (6+2)/2 = 4$ V, $\hat U_\text{mod} = (6-2)/2 = 2$ V.`,
    },
    {
      id: 'calc-bam', type: 'numeric', title: 'AM-Bandbreite',
      question: String.raw`Ein AM-Sender überträgt Modulationsfrequenzen bis $f_\text{mod,max} = 3\,\text{kHz}$. Welche Bandbreite belegt das Signal?`,
      answer: 6, tolerance: 0.05, unit: 'kHz',
      explain: String.raw`$B_\text{AM} = 2\cdot f_\text{mod,max} = 2\cdot3\,\text{kHz} = 6\,\text{kHz}$ — oberes und unteres Seitenband.`,
    },
    {
      id: 'calc-pam', type: 'numeric', title: 'AM-Leistung',
      question: String.raw`Ein AM-Sender hat eine Trägerleistung $P_T = 10\,\text{W}$ und wird mit $m = 0{,}8$ moduliert. Wie groß ist die gesamte abgestrahlte Leistung?`,
      answer: 13.2, tolerance: 0.1, unit: 'W',
      hint: String.raw`$P = P_T\,(1 + m^2/2)$.`,
      explain: String.raw`$P = 10\,\text{W}\cdot(1+0{,}64/2) = 10\,\text{W}\cdot1{,}32 = 13{,}2\,\text{W}$. Davon stecken nur $3{,}2$ W in den Seitenbändern.`,
    },
    {
      id: 'demo-mod', type: 'viz', viz: 'modulation-lab', title: 'AM, DSB, SSB und FM im Zeit- und Frequenzbereich',
      intro: String.raw`Schalte zwischen **AM**, **DSB** (nur Seitenbänder, Träger unterdrückt), **SSB** (nur ein Seitenband) und **FM**. Oben das Sendesignal (Träger zur Anschauung stark verlangsamt), unten das Spektrum relativ zum Träger. Die **Bandbreite** und die **Leistung** stehen in den Anzeigen.`,
      params: { fT: 7.1e6 },
      task: String.raw`Erzeuge bei AM eine **Übermodulation** ($m>100\,\%$), stelle bei **FM** Hub $\Delta f=3$ kHz und $f_\text{mod}=3$ kHz ein (Carson-Bandbreite 12 kHz ablesen) und schalte auf **SSB**.`,
      caption: 'AM: Träger + 2 Seitenbänder. DSB: ohne Träger. SSB: nur ein Seitenband (ein Einzelton ergibt eine einzige Linie). FM: konstante Hüllkurve, viele Seitenlinien im Abstand f_mod.',
    },
    {
      id: 'quiz-uebermod', type: 'quiz', title: 'Übermodulation',
      question: 'Was passiert bei AM mit einem Modulationsgrad $m>1$?',
      options: [
        { text: 'Das Signal wird verzerrt und belegt mehr Bandbreite (Splatter); die Hüllkurve kehrt ihr Vorzeichen um.', correct: true, why: 'Die Hüllkurve $1+m\\cos(\\dots)$ wird negativ; der Hüllkurvendetektor kann sie nicht mehr abbilden, es entstehen Oberwellen der NF und damit Störungen auf Nachbarfrequenzen.' },
        { text: 'Das Signal wird einfach lauter, ohne dass sich sonst etwas ändert.', correct: false, why: 'Das ist die Fehlvorstellung: Über 100 % wird die Information verfälscht; zusätzlich steigt die Bandbreite.' },
        { text: 'Der Träger wird unterdrückt, und es entsteht SSB.', correct: false, why: 'Für SSB muss man den Träger und ein Seitenband gezielt filtern, Übermodulation unterdrückt nichts.' },
        { text: 'Die Frequenz des Trägers steigt.', correct: false, why: 'Bei AM bleibt die Trägerfrequenz konstant; nur die Amplitude ändert sich.' },
      ],
    },
    {
      id: 'ssb', type: 'text', title: 'DSB und SSB: Träger und ein Seitenband einsparen',
      md: String.raw`
Die Information steckt vollständig in **einem** Seitenband; der Träger trägt gar nichts. Daraus ergeben sich zwei Sparstufen:

- **DSB** (*double sideband suppressed carrier*): Träger unterdrückt, beide Seitenbänder bleiben. Ein **Balancemischer** erzeugt das (nächste Lektion). Bandbreite $2f_\text{mod,max}$, aber ohne Trägerleistung.
- **SSB** (*single sideband*, [Einseitenbandmodulation](wiki:Einseitenbandmodulation|Single-sideband modulation)): zusätzlich ein Seitenband unterdrückt — meist durch ein steiles **Filter** hinter dem Balancemischer, z. B. ein Quarzfilter mit etwa 2,4 kHz Bandbreite. Man wählt das **obere** (USB) oder das **untere Seitenband** (LSB).

Der Gewinn: Die **Bandbreite** halbiert sich ($B_\text{SSB}\approx f_\text{mod,max}\approx 2{,}4$ kHz statt 6 kHz bei AM) — doppelt so viele Stationen im Band. Außerdem steckt die ganze Sendeleistung in der Information; kein Träger, der nur Pfeiftöne und Verluste verursacht. Bei gleicher Reichweite braucht SSB deutlich weniger Leistung als AM. Ohne Modulation sendet ein SSB-Sender **gar nichts**; beim Sprechen schwankt die Leistung mit der Sprachlautstärke (angegeben als Spitzenleistung, PEP).

**Konvention im Amateurfunk:** Unterhalb von 10 MHz verwendet man **LSB** (80 m, 40 m), oberhalb **USB** (20 m, 10 m, 2 m, 70 cm). Digitale Betriebsarten wie FT8 werden in SSB gesendet, indem man ein Tonsignal in den SSB-Sender einspeist (EE402).[^50ohm-ssb]`,
    },
    {
      id: 'quiz-usb', type: 'quiz', title: 'LSB oder USB?',
      question: 'Du möchtest im 80-m-Band bei 3,7 MHz Sprechfunk in SSB hören. Auf welche Betriebsart stellst du den Transceiver?',
      options: [
        { text: 'LSB (unteres Seitenband)', correct: true, why: 'Unter 10 MHz ist LSB üblich — im Katalog NE211 für 80 m. Im 2-m-Band wird dagegen USB genutzt (NE210).' },
        { text: 'USB (oberes Seitenband)', correct: false, why: 'USB ist auf den Bändern oberhalb von 10 MHz üblich, z. B. auf 2 m.' },
        { text: 'FM', correct: false, why: 'FM ist für Kurzwelle unüblich (zu große Bandbreite) und würde ein SSB-Signal nicht verständlich machen.' },
        { text: 'AM mit 100 % Modulation', correct: false, why: 'Ein SSB-Signal ist ohne Träger; ein AM-Demodulator liefert Kauderwelsch.' },
      ],
    },
    {
      id: 'fm', type: 'text', title: 'Frequenzmodulation: Hub, Modulationsindex, Carson-Bandbreite',
      md: String.raw`
Bei der **[FM](wiki:Frequenzmodulation|Frequency modulation)** bleibt die **Amplitude konstant**; die **Momentanfrequenz** des Trägers schwankt im Takt der NF um die Mittenfrequenz. Die größte Abweichung heißt **Frequenzhub** $\Delta f$ — er ist proportional zur NF-Amplitude (zu laut ins Mikrofon gesprochen: Hub zu groß, das Signal wird breiter und belegt den Nachbarkanal; NE306: „Leiser ins Mikrofon sprechen“).

Das Verhältnis aus Hub und Modulationsfrequenz ist der **Modulationsindex**:

$$ m_\text{FM} = \frac{\Delta f}{f_\text{mod}} $$

Das Spektrum der FM besteht aus dem Träger und **vielen Seitenlinien** im Abstand $f_\text{mod}$ (ihre Höhen folgen den [Besselfunktionen](wiki:Besselsche Differentialgleichung|Bessel function)). Die belegte Bandbreite schätzt die **Carson-Regel**:

$$ B_\text{FM} \approx 2\,(\Delta f + f_\text{mod,max}) $$

Beispiel: Hub $\Delta f=3$ kHz bei Modulationsfrequenzen bis $f_\text{mod,max}=3$ kHz → $B\approx 12$ kHz — doppelt so breit wie AM mit 6 kHz. Dafür sind die Vorteile groß: Rauschen und Störungen verändern vor allem die **Amplitude**, ein **Begrenzer** im Empfänger schneidet sie ab; FM ist deshalb für Störungen durch Zündfunken, Motoren und Fading weit weniger anfällig (EE303). Außerdem darf die Sender-Endstufe nichtlinear (effizient) arbeiten, weil die Amplitude nicht informationstragend ist. FM wird im Amateurfunk auf UKW/UHF für Sprache und besonders auf **Relaisfunkstellen** genutzt (NE309); der [UKW-Rundfunk](wiki:UKW-Rundfunk|FM broadcasting) arbeitet mit ±75 kHz Hub und braucht entsprechend ca. 200 kHz Kanalbreite.

**Faustregeln:** *Schmaler Hub* ($m_\text{FM}<1$): Schmalband-FM, Bandbreite ≈ AM. *Großer Hub*: Breitband-FM mit viel Rauschvorteil, aber eben viel Bandbreite — der Preis für Qualität.[^carson-1922]`,
    },
    {
      id: 'calc-carson', type: 'numeric', title: 'Carson-Bandbreite',
      question: String.raw`Bei einem FM-Sender ist der Hub $\Delta f = 3\,\text{kHz}$ und $f_\text{mod,max} = 3\,\text{kHz}$. Wie groß ist die Bandbreite nach der Carson-Regel?`,
      answer: 12, tolerance: 0.1, unit: 'kHz',
      explain: String.raw`$B \approx 2\,(3+3)\,\text{kHz} = 12\,\text{kHz}$.`,
    },
    {
      id: 'calc-carson2', type: 'numeric', title: 'Größerer Hub',
      question: String.raw`Der Hub wird auf $\Delta f = 5\,\text{kHz}$ vergrößert, $f_\text{mod,max}=3\,\text{kHz}$ bleibt. Wie groß ist jetzt die Carson-Bandbreite?`,
      answer: 16, tolerance: 0.1, unit: 'kHz',
      explain: String.raw`$B \approx 2\,(5+3)\,\text{kHz} = 16\,\text{kHz}$ — mit dem Hub wächst die Bandbreite, deshalb darf er nicht beliebig groß werden.`,
    },
    {
      id: 'calc-idx', type: 'numeric', title: 'Modulationsindex',
      question: String.raw`Hub $\Delta f = 3\,\text{kHz}$, Modulationsfrequenz $f_\text{mod}=3\,\text{kHz}$: Wie groß ist der Modulationsindex $m_\text{FM}$?`,
      answer: 1, tolerance: 0.01,
      explain: String.raw`$m_\text{FM} = \Delta f/f_\text{mod} = 3/3 = 1$. Bei $f_\text{mod}=1$ kHz wäre der Index 3, die Bandbreite aber bei Carson immer noch von $f_\text{mod,max}$ bestimmt.`,
    },
    {
      id: 'match-verfahren', type: 'match', title: 'Verfahren und Merkmal',
      prompt: 'Welches Merkmal gehört zu welchem Verfahren?',
      pairs: [
        ['AM', 'Träger und zwei Seitenbänder, Hüllkurve = NF'],
        ['SSB', 'nur ein Seitenband, halbe Bandbreite der AM'],
        ['FM', 'konstante Amplitude, Frequenz folgt der NF'],
        ['DSB', 'zwei Seitenbänder ohne Träger'],
      ],
    },
    {
      id: 'tastung', type: 'text', title: 'Ausblick: Tastung, CW und digitale Verfahren',
      md: String.raw`
Der einfachste Sonderfall der AM ist das **An- und Ausschalten** des Trägers: [Morsetelegrafie](wiki:Morsetelegrafie|Morse code) (CW). Die Information liegt in den Pausen; das Signal braucht nur etwa 100–500 Hz Bandbreite und kommt deshalb mit sehr wenig Leistung durch — die Grundlage für den Erfolg der Telegrafie auf Kurzwelle. Das Tasten sollte **weich** erfolgen (abgerundete Flanken), sonst entstehen harte Tastklicks mit großem Spektrum (zurück zur ersten Lektion: scharfe Flanken = viel Bandbreite).

Digitale Informationen (0/1) tastet man auf zwei Arten: [Amplitudenumtastung](wiki:Amplitudenumtastung|Amplitude-shift keying) (ASK, Träger an/aus) oder [Frequenzumtastung](wiki:Frequenzumtastung|Frequency-shift keying) (FSK, Träger springt zwischen zwei Frequenzen). Moderne Verfahren wie FT8 oder PSK31 kombinieren Phasen- oder Frequenzumtastung mit sehr schmaler Bandbreite und werden meist über **SSB** gesendet (EE402). Details zu den Betriebsarten findest du im Fach **Amateurfunk**; hier genügt die Grundidee: *Information verändert eine Eigenschaft des Trägers.*`,
    },
    {
      id: 'warning-mod', type: 'callout', tone: 'warning', title: 'Typische Fehlvorstellungen',
      md: String.raw`
- „**Übermodulation macht das Signal lauter.**“ — Sie macht es *breiter und verzerrter*. Die Lautstärke beim Empfänger steigt kaum, die Nachbarn hören dich als Splatter.
- „**SSB braucht doppelt so viel Bandbreite wie AM.**“ — Umgekehrt: **halb** so viel (ein Seitenband statt zwei).
- „**FM hat die Bandbreite $2\cdot\Delta f$.**“ — Nein: Carson: $2(\Delta f+f_\text{mod,max})$. Bei kleinem Hub dominiert $f_\text{mod,max}$.
- „**Bei SSB sendet der Sender dauernd.**“ — Ohne Besprechen kommt (fast) keine Leistung aus der Antenne.`,
    },
    {
      id: 'deep-bessel', type: 'callout', tone: 'deep', title: 'Wo bleibt der Träger bei FM?',
      md: String.raw`
Bei AM bleibt die Trägeramplitude immer $\hat U_T$. Bei FM verteilt sich die konstante Gesamtleistung auf Träger und Seitenlinien: Die Trägeramplitude ist $J_0(m_\text{FM})\cdot\hat U_T$ (Besselfunktion nullter Ordnung). Bei $m_\text{FM}\approx 2{,}405$ ist $J_0=0$ — der **Träger verschwindet** komplett! Das ist eine klassische Messmethode, um den Hub eines FM-Senders zu eichen: Man spricht einen Einton ein und regelt, bis der Träger im Spektrum zu null wird. Im Modulationslabor oben siehst du das bei $f_\text{mod}=1$ kHz und $\Delta f = 2{,}5$ kHz ($m_\text{FM}=2{,}5$): Die Mittellinie ist dort fast verschwunden.`,
    },
    {
      id: 'mission-mod', type: 'callout', tone: 'mission', title: 'Prüfung & Funkpraxis',
      md: String.raw`
- **Prüfungsbezug:** Modulation überträgt Information auf einen Träger (NE101); Modulationsarten SSB, FM, AM (NE102); Seitenbänder bei AM-Spektrum (NE205, NE206); oberes Seitenband auf 2 m = USB, 80 m = LSB (NE210, NE211); FM-Beschreibung (NE302); Hub zu groß → leiser sprechen (NE306); FM für Sprache auf Relais (NE309); FM am wenigsten störanfällig (EE303); Filterbandbreite zur SSB-Erzeugung 2,4 kHz (EF310); schmalbandige Digitalverfahren per SSB (EE402).
- **Praxis:** Beim Einstellen des Mikrofonpegels bei SSB und FM gilt: **ALC-Anzeige** nicht überschreiten, Mikrofon nicht übersteuern — sonst Splatter (SSB) bzw. zu großer Hub (FM). Mit dem **SDR-Wasserfall** siehst du, wie breit Signale sind: SSB ≈ 2,4 kHz, FM-Relais ≈ 10–12 kHz, AM ≈ 6 kHz.
- **Rechentipp:** $m = \hat U_\text{mod}/\hat U_T$ und $B_\text{AM}=2f_\text{mod,max}$ — beide stehen in der Formelsammlung. Carson: Hub **plus** NF-Grenzfrequenz, **mal 2**.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: String.raw`
<table><tr><th>Deutsch</th><th>English</th><th>Notation</th></tr>
<tr><td>Träger</td><td>carrier</td><td>$f_T$, $\hat U_T$</td></tr>
<tr><td>Modulation, Modulationsgrad</td><td>modulation, modulation index (AM)</td><td>$m$</td></tr>
<tr><td>Seitenband (oberes / unteres)</td><td>sideband (upper / lower), USB / LSB</td><td></td></tr>
<tr><td>Hüllkurve</td><td>envelope</td><td></td></tr>
<tr><td>Frequenzhub</td><td>frequency deviation</td><td>$\Delta f$</td></tr>
<tr><td>Modulationsindex (FM)</td><td>modulation index (FM)</td><td>$m_\text{FM}=\Delta f/f_\text{mod}$</td></tr>
<tr><td>Einseitenband / Zweiseitenband</td><td>single / double sideband</td><td>SSB / DSB</td></tr>
<tr><td>Übermodulation</td><td>overmodulation</td><td>$m>1$</td></tr>
<tr><td>Tastung</td><td>keying</td><td>ASK, FSK</td></tr></table>`,
    },
    {
      id: 'recall-ssb', type: 'recall', title: 'Erkläre es mit eigenen Worten',
      prompt: 'Warum belegt SSB nur halb so viel Bandbreite wie AM? Und wo steckt bei AM die „verschwendete“ Leistung?',
      answer: 'AM besteht aus dem Träger und zwei Seitenbändern, die beide dieselbe Information tragen (jedes spiegelt das NF-Spektrum), also $B = 2 f_\\text{mod,max}$. SSB überträgt nur eins der beiden Seitenbänder (das andere und der Träger werden unterdrückt), also $B \\approx f_\\text{mod,max}$ — halb so breit. Bei AM steckt bei m = 1 etwa zwei Drittel der Leistung im Träger, der keine Information enthält; bei SSB entfällt sie.',
      hints: ['Wie viele Seitenbänder hat AM, wie viele SSB?', 'Welche Anteile am Spektrum tragen Information?'],
      cards: ['b-am', 'ssb-vorteil'],
    },
  ],
  cards: [
    { id: 'm-def', front: 'Modulationsgrad bei AM?', back: '$m = \\hat U_\\text{mod}/\\hat U_T$ (auch: $m=(\\hat U_\\text{max}-\\hat U_\\text{min})/(\\hat U_\\text{max}+\\hat U_\\text{min})$).' },
    { id: 'b-am', front: 'Bandbreite von AM?', back: '$B_\\text{AM} = 2\\,f_\\text{mod,max}$ (Träger + oberes + unteres Seitenband).' },
    { id: 'p-am', front: 'Leistung bei AM mit Modulationsgrad $m$?', back: '$P = P_T\\,(1+m^2/2)$. Bei $m=1$: $1{,}5\\,P_T$, davon 2/3 im Träger.' },
    { id: 'uebermod', front: 'Was ist Übermodulation?', back: '$m>1$ bei AM: Hüllkurve kehrt Vorzeichen um, Verzerrung und Splatter (größere Bandbreite).' },
    { id: 'ssb-vorteil', front: 'Vorteile von SSB gegenüber AM?', back: 'Halbe Bandbreite ($\\approx f_\\text{mod,max}$) und volle Leistung in der Information; Träger und ein Seitenband unterdrückt.' },
    { id: 'usb-lsb', front: 'Seitenband-Konvention im Amateurfunk?', back: 'Unter 10 MHz: LSB (80 m, 40 m); über 10 MHz: USB (20 m, 2 m, 70 cm).' },
    { id: 'fm-merkmal', front: 'Merkmal der FM?', back: 'Konstante Amplitude, die Momentanfrequenz folgt der NF (proportional zur NF-Amplitude: Hub). Unempfindlich gegen Amplitudenstörungen.' },
    { id: 'idx-fm', front: 'Modulationsindex bei FM?', back: '$m_\\text{FM} = \\Delta f / f_\\text{mod}$' },
    { id: 'carson', front: 'Carson-Bandbreite der FM?', back: '$B \\approx 2\\,(\\Delta f + f_\\text{mod,max})$. Beispiel: 3 kHz Hub, 3 kHz NF → 12 kHz.' },
    { id: 'hub-zu-gross', front: 'Was tun, wenn der FM-Hub zu groß ist?', back: 'Leiser ins Mikrofon sprechen (Mikrofonpegel/Hub reduzieren) — sonst wird das Signal zu breit.' },
    { id: 'cw-bw', front: 'Warum eignet sich CW (Telegrafie) für schwache Signale?', back: 'Sehr schmale Bandbreite (einige 100 Hz) → wenig Rauschen im Filter; Träger an/aus tasten, Flanken weich.' },
    { id: 'ask-fsk', front: 'ASK und FSK?', back: 'ASK: Träger an/aus (Amplitudenumtastung). FSK: Träger wechselt zwischen zwei Frequenzen (Frequenzumtastung).' },
  ],
};
