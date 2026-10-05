export default {
  id: 'rc-rl-filter',
  title: 'Tief- und Hochpass, Grenzfrequenz, Bode-Diagramm',
  summary: 'RC- und RL-Glieder als frequenzabhängige Spannungsteiler: Tiefpass und Hochpass, Grenzfrequenz f_g = 1/(2πRC), −3 dB, 45° und 20 dB je Dekade — und wie man ein Bode-Diagramm liest.',
  minutes: 35,
  needs: ['dezibel', 'schwingkreis', 'rc-glied'],
  goals: [
    'Einen [[tiefpass|Tief-]] und einen [[hochpass|Hochpass]] an der Schaltung erkennen (wer liegt in Reihe, wer quer?)',
    'Die [[grenzfrequenz]] eines RC- und RL-Glieds berechnen und umgekehrt R, C oder L dimensionieren',
    'Ein [[bode-diagramm|Bode-Diagramm]] lesen: −3 dB, 45°, 20 dB je [[dekade|Dekade]]',
    'Die Wirkung auf Signale mit [[oberwellen|Oberwellen]] im Zeitbereich vorhersagen',
  ],
  blocks: [
    {
      id: 'intuition', type: 'text', title: 'Ein Spannungsteiler, der auf die Frequenz hört',
      md: String.raw`
Im [[spannungsteiler|Spannungsteiler]] teilen zwei Widerstände die Spannung im festen Verhältnis. Ersetzt man einen davon durch einen **Blindwiderstand**, hängt das Teilerverhältnis von der Frequenz ab — denn $X_C = 1/(2\pi f C)$ **fällt** mit der Frequenz, $X_L = 2\pi f L$ **steigt**.

Beim **RC-Tiefpass** ([Tiefpass](wiki:Tiefpass|Low-pass filter)) liegt $R$ in Reihe und $C$ quer zum Ausgang:

- **tiefe Frequenzen**: $X_C$ ist riesig, praktisch kein Strom fließt, am Ausgang liegt fast die volle Eingangsspannung — das Signal geht durch.
- **hohe Frequenzen**: $X_C$ ist winzig, der Kondensator schließt den Ausgang fast kurz — das Signal verschwindet.

Vertauscht man $R$ und $C$ (Kondensator in Reihe, Widerstand quer), entsteht der **Hochpass** ([Hochpass](wiki:Hochpass|High-pass filter)): Der Kondensator lässt Hohes passieren und blockt Tiefes — [Gleichspannung](wiki:Gleichstrom|Direct current) blockt er ganz. Genau deshalb nennt man ihn auch *Koppelkondensator*, wenn man damit zwei Verstärkerstufen gleichspannungsfrei verbindet. Beim **RL-Glied** (RL-Glied) gilt dasselbe mit umgekehrter Rolle der Spule: $L$ in Reihe = Tiefpass, $L$ quer = Hochpass.

> Merkhilfe: **Hochpass: C in Reihe — lässt das Hohe durch das C.**

Im Alltag begegnen dir Filter überall: die [Frequenzweiche](wiki:Frequenzweiche) im Lautsprecher, die Höhen- und Tiefenregler eines [Equalizers](wiki:Equalizer|Equalizer (audio)) und die Tiefpässe am Senderausgang, die Oberwellen unterdrücken.`,
    },
    {
      id: 'formel', type: 'text', title: 'Grenzfrequenz, −3 dB und 45°',
      md: String.raw`
Die Frequenz, bei der Reaktanz und Widerstand **gleich groß** sind ($X_C = R$), heißt [[grenzfrequenz|Grenzfrequenz]] $f_g$ (engl. [cutoff frequency](wiki:Grenzfrequenz|Cutoff frequency)). Daraus folgt:

$$ X_C = R \;\Rightarrow\; f_g = \frac{1}{2\pi R C}\ \text{(RC)} \qquad\qquad X_L = R \;\Rightarrow\; f_g = \frac{R}{2\pi L}\ \text{(RL)} $$

Das Verhältnis $H = U_2/U_1$ ([[uebertragungsfunktion|Übertragungsfunktion]]) des **Tiefpasses** erster Ordnung ist

$$ |H| = \frac{1}{\sqrt{1 + (f/f_g)^2}}, \qquad \varphi = -\arctan\frac{f}{f_g} $$

(beim Hochpass steht $f/f_g$ im Zähler, die Phase ist $90° - \arctan(f/f_g)$). An der Grenzfrequenz ist

- $|H| = 1/\sqrt2 \approx 0{,}707$ — die Spannung ist auf **70,7 %** gefallen, die Leistung auf die **Hälfte**, das sind **−3 dB**,
- die Phase genau **45°** (Tiefpass: Ausgang eilt 45° nach).

<table>
<tr><th>Frequenz</th><th>$f_g/10$</th><th>$f_g$</th><th>$2 f_g$</th><th>$10 f_g$</th><th>$100 f_g$</th></tr>
<tr><td>Dämpfung Tiefpass</td><td>0,04 dB</td><td>3,0 dB</td><td>7,0 dB</td><td>20,0 dB</td><td>40,0 dB</td></tr>
<tr><td>Phase Tiefpass</td><td>−5,7°</td><td>−45°</td><td>−63°</td><td>−84°</td><td>−89,4°</td></tr>
</table>

Weit oberhalb von $f_g$ sinkt der Pegel mit **20 dB je Dekade** (Faktor 10 in der Frequenz → Faktor 10 in der Spannung): Das ist die [[filterordnung|Filterordnung]] 1. Die Grenzfrequenz ist **keine Mauer**: Bei $f_g$ geht noch mehr als 70 % durch, bei $2f_g$ immer noch fast die Hälfte.[^bnetza-pruefungsfragen-2024]

Die Zeitkonstante aus der letzten Etappe ist mit $f_g$ verwandt: $\tau = RC$, also $f_g = \dfrac{1}{2\pi\tau}$ — dieselbe Schaltung, einmal im Zeit-, einmal im Frequenzbereich betrachtet.`,
    },
    {
      id: 'bode', type: 'text', title: 'Das Bode-Diagramm lesen',
      md: String.raw`
Ein [Bode-Diagramm](wiki:Bode-Diagramm|Bode plot) (nach [Hendrik Wade Bode](wiki:Hendrik Wade Bode)) zeigt zwei Kurven über der **logarithmischen** Frequenzachse:

1. **Betrag** in [[dezibel|dB]] — oben. Ein Tiefpass 1. Ordnung ist bis $f_g$ fast waagerecht (0 dB) und fällt dann als Gerade mit −20 dB/Dekade ab. Der Knick der Asymptoten liegt bei $f_g$; die tatsächliche Kurve liegt dort 3 dB darunter.
2. **Phase** in Grad — unten. Der Übergang von 0° nach −90° ist um $f_g$ herum am steilsten und dauert etwa zwei Dekaden.

Weil die Achsen logarithmisch bzw. in dB gezeichnet sind, werden Multiplikationen zu Additionen: Zwei Filter hintereinander addieren ihre dB-Werte. Das nutzt du in der nächsten Lektion bei Filtern höherer Ordnung.[^wiki-bode-diagramm-c4]`,
    },
    {
      id: 'video-tp', type: 'video', youtube: 'O10F4mlQw88', label: 'Tiefpass mit Widerstand und Kondensator', channel: 'TeTeacher', minutes: 3,
      why: 'Kurze Erklärung des RC-Tiefpasses (ca. 3 Min).',
    },
    {
      id: 'video-hp', type: 'video', youtube: 'lCF8PEeU_Go', label: 'Hochpass mit Widerstand und Kondensator', channel: 'TeTeacher', minutes: 2,
      why: 'Das Gegenstück: RC-Hochpass in rund 2 Minuten.',
    },
    {
      id: 'viz-filter', type: 'viz', viz: 'filter-lab', title: 'Filter-Labor',
      intro: 'Wähle **RC-** oder **RL-Glied**, **Tief-** oder **Hochpass** und verändere die Bauteile (E12-Werte). Im Bode-Diagramm siehst du Betrag und Phase mit dem $f_g$-Marker. Unten läuft ein Rechtecksignal (Grundwelle plus Oberwellen) durch: Ein Tiefpass rundet die Kanten ab, ein Hochpass lässt nur die Kanten übrig.',
      params: {
        builds: ['rc', 'rl'], build: 'rc', type: 'tp', init: { R: 1e3, C: 100e-9, L: 10e-3, fin: 1e3 }, signal: 'square',
        goals: [
          { id: 'tp3k', label: 'Tiefpass mit C = 10 nF und f_g ≈ 3 kHz (±7 %)', test: s => s.build === 'rc' && s.type === 'tp' && Math.abs(s.C / 10e-9 - 1) < 0.01 && Math.abs(s.fg / 3e3 - 1) <= 0.07 },
          { id: 'harm', label: 'Tiefpass: 7,1 MHz durchlassen (≤ 2 dB), 14,2 MHz um ≥ 4 dB dämpfen', test: s => s.type === 'tp' && s.att(7.1e6) <= 2 && s.att(14.2e6) >= 4 },
        ],
      },
      task: 'Erreiche beide Ziele: (1) Dimensioniere einen **RC-Tiefpass** mit $C = 10$ nF für $f_g \\approx 3$ kHz. (2) Baue einen Tiefpass für 7,1 MHz (Oberwellenfilter): 7,1 MHz soll fast ungedämpft durchgehen, die 2. Oberwelle (14,2 MHz) mindestens 4 dB leiser sein. Tipp: Mit $R \\approx 50\\,\\Omega$ und $f_g \\approx 10$ MHz ist $C \\approx 330$ pF.',
      caption: 'Ein Filter 1. Ordnung dämpft die 2. Oberwelle nur um etwa 4,6 dB — für einen Sender viel zu wenig. Deshalb nimmt man Filter höherer Ordnung (nächste Lektion).',
    },
    {
      id: 'calc-fg1', type: 'numeric', title: 'Grenzfrequenz RC-Tiefpass',
      question: 'Ein RC-Tiefpass hat $R = 1\\,\\text{k}\\Omega$ und $C = 100\\,\\text{nF}$. Wie groß ist $f_g$ in kHz?',
      answer: 1.59, tolerance: 0.02, unit: 'kHz',
      explain: '$f_g = 1/(2\\pi RC) = 1/(2\\pi\\cdot10^3\\cdot10^{-7}) = 1/(6{,}283\\cdot10^{-4}) \\approx 1{,}59$ kHz.',
    },
    {
      id: 'calc-fg2', type: 'numeric', title: 'Noch ein RC-Glied',
      question: '$R = 10\\,\\text{k}\\Omega$ und $C = 1\\,\\text{nF}$: Wie groß ist die Grenzfrequenz in kHz?',
      answer: 15.9, tolerance: 0.2, unit: 'kHz',
      explain: '$RC = 10^4\\cdot10^{-9} = 10^{-5}$ s, $f_g = 1/(2\\pi\\cdot10^{-5}) \\approx 15{,}9$ kHz.',
    },
    {
      id: 'calc-fg-rl', type: 'numeric', title: 'RL-Tiefpass',
      question: 'Ein RL-Tiefpass besteht aus $R = 100\\,\\Omega$ und $L = 1\\,\\text{mH}$. Wie groß ist $f_g$ in kHz?',
      answer: 15.9, tolerance: 0.2, unit: 'kHz',
      explain: '$f_g = R/(2\\pi L) = 100/(2\\pi\\cdot10^{-3}) = 15{,}9$ kHz. Bei der Spule steht $R$ im Zähler: größeres $R$ → höhere Grenzfrequenz.',
    },
    {
      id: 'calc-dim', type: 'numeric', title: 'Kondensator dimensionieren',
      question: 'Ein RC-Tiefpass mit $R = 5{,}3\\,\\text{k}\\Omega$ soll $f_g = 3\\,\\text{kHz}$ haben. Wie groß muss $C$ sein, in nF?',
      answer: 10, tolerance: 0.2, unit: 'nF',
      hint: 'Umstellen: $C = 1/(2\\pi f_g R)$.',
      explain: '$C = 1/(2\\pi\\cdot3000\\cdot5300) = 1/(9{,}99\\cdot10^7) \\approx 10\\cdot10^{-9}$ F $= 10$ nF.',
    },
    {
      id: 'calc-att', type: 'numeric', title: 'Dämpfung bei zehnfacher Grenzfrequenz',
      question: 'Wie groß ist die Dämpfung eines RC-Tiefpasses 1. Ordnung bei $f = 10\\cdot f_g$, ungefähr in dB?',
      answer: 20, tolerance: 0.5, unit: 'dB',
      explain: '$a = 10\\lg(1 + 10^2) = 10\\lg 101 = 20{,}04$ dB — eine Dekade über $f_g$ sind es also fast genau 20 dB; bei $f_g$ selbst 3 dB.',
    },
    {
      id: 'quiz-hp', type: 'quiz', title: 'Wer ist der Hochpass?',
      question: 'Welche RC-Schaltung (Eingang links, Ausgang an der Verbindung von R und C) stellt einen **Hochpass** dar?',
      options: [
        { text: 'C in Reihe im Signalweg, R von dort nach Masse.', correct: true, why: 'Der Kondensator lässt hohe Frequenzen durch (kleines $X_C$) und blockt tiefe, der Widerstand zieht sie nach Masse.' },
        { text: 'R in Reihe im Signalweg, C von dort nach Masse.', correct: false, why: 'Das ist der Tiefpass: Hohe Frequenzen werden vom Kondensator nach Masse kurzgeschlossen.' },
        { text: 'R und C parallel im Signalweg.', correct: false, why: 'Eine Parallelschaltung im Signalweg bildet keinen Spannungsteiler gegen Masse und damit kein Filter dieser Art.' },
        { text: 'Zwei Kondensatoren in Reihe nach Masse.', correct: false, why: 'Ohne Widerstand entsteht kein frequenzabhängiger Teiler mit definierter Grenzfrequenz.' },
      ],
    },
    {
      id: 'quiz-fg', type: 'quiz', title: 'Was ist die Grenzfrequenz?',
      question: 'Was bedeutet die Grenzfrequenz $f_g$ eines Tiefpasses?',
      options: [
        { text: 'Die Frequenz, bei der die Spannung auf etwa 70,7 % (−3 dB) gefallen ist.', correct: true, why: 'Dort sind $X_C = R$, die Phase beträgt 45° und die Leistung ist halbiert.' },
        { text: 'Die Frequenz, ab der kein Signal mehr durchgeht.', correct: false, why: 'Die Dämpfung nimmt allmählich zu (20 dB/Dekade); es gibt keine Mauer.' },
        { text: 'Die Frequenz, bei der die Spannung auf die Hälfte (50 %) gesunken ist.', correct: false, why: '50 % der Spannung wären −6 dB; bei −3 dB ist die *Leistung* halbiert.' },
        { text: 'Die Frequenz mit der größten Verstärkung.', correct: false, why: 'Ein passiver RC-Tiefpass verstärkt nie; sein Maximum (0 dB) liegt bei tiefen Frequenzen.' },
      ],
    },
    {
      id: 'match-filter', type: 'match', title: 'Filterarten',
      prompt: 'Ordne die Filterart ihrer Wirkung zu.',
      pairs: [
        ['Tiefpass', 'lässt tiefe Frequenzen durch, sperrt hohe'],
        ['Hochpass', 'lässt hohe Frequenzen durch, sperrt tiefe (auch Gleichspannung)'],
        ['Bandpass', 'lässt nur ein Frequenzband durch'],
        ['Bandsperre', 'sperrt nur ein Frequenzband, der Rest geht durch'],
      ],
    },
    {
      id: 'order-dim', type: 'order', title: 'Filter dimensionieren',
      prompt: 'Bringe die Schritte beim Entwurf eines RC-Tiefpasses in eine sinnvolle Reihenfolge.',
      items: [
        'Gewünschte Grenzfrequenz $f_g$ festlegen',
        'Einen passenden Kondensatorwert $C$ wählen (z. B. aus der E12-Reihe)',
        'Den Widerstand mit $R = 1/(2\\pi f_g C)$ berechnen',
        'Den nächstliegenden Normwert für $R$ wählen',
        'Mit dem Normwert die tatsächliche $f_g$ nachrechnen (Toleranz!)',
      ],
      explain: 'Man wählt einen Wert vor (hier $C$) und berechnet den anderen. Die Bauteiltoleranz (E12-Abstufung, Widerstände oft ±5 %, Kondensatoren oft ±10…20 %) verschiebt $f_g$ spürbar, deshalb am Ende nachrechnen.',
    },
    {
      id: 'warning-fg', type: 'callout', tone: 'warning', title: 'Typische Fehlvorstellungen',
      md: String.raw`
- **„Hoch- und Tiefpass unterscheiden sich im Bauteilwert."** Nein: Dieselben Bauteile, nur die **Position** wechselt. Tiefpass: C quer (Spule in Reihe), Hochpass: C in Reihe (Spule quer).
- **„An der Grenzfrequenz geht nichts mehr durch."** Dort sind noch 70,7 % der Spannung übrig; die Grenzfrequenz ist der −3-dB-Punkt, keine Mauer.
- **„20 dB je Dekade heißt: pro Dekade 20-mal weniger Spannung."** Nein: Eine Dekade höher ist die Spannung **zehnmal** kleiner (20 dB = Faktor 10 in der Spannung).`,
    },
    {
      id: 'mission-filter', type: 'callout', tone: 'mission', title: 'Prüfung & Funkpraxis',
      md: String.raw`
- **Prüfungsbezug:** Filtercharakteristik am Diagramm erkennen — Tiefpass (ED201), Hochpass (ED202), Bandpass (ED203), Bandsperre (ED204); Schaltungen als Tief- oder Hochpass erkennen (ED208–ED213); „Welches Filter zwischen Senderausgang und Antenne gegen Oberwellen?" → **Tiefpass** (EJ203, EJ204).
- **Praxis:** Stört dein 28-MHz-Sender den DVB-T2-Fernseher, hilft ein **Hochpass** am Antenneneingang des Fernsehers, der die 28 MHz bremst (EJ116) — das Nutzsignal liegt weit darüber. Umgekehrt gehört an den Senderausgang ein **Tiefpass**, der die Oberwellen dämpft.
- **Rechentipp:** $f_g$ berechnest du mit $1/(2\pi RC)$; in der Prüfung sind meist runde Werte gewählt (1 kΩ, 100 nF → 1,59 kHz).`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: String.raw`
<table><tr><th>Deutsch</th><th>English</th><th>Notation</th></tr>
<tr><td>Tiefpass</td><td>low-pass filter</td><td>TP, LP</td></tr>
<tr><td>Hochpass</td><td>high-pass filter</td><td>HP</td></tr>
<tr><td>Bandpass / Bandsperre</td><td>band-pass / band-stop filter</td><td>BP / BS</td></tr>
<tr><td>Grenzfrequenz</td><td>cutoff frequency</td><td>$f_g$ (engl. $f_c$)</td></tr>
<tr><td>Übertragungsfunktion</td><td>transfer function</td><td>$H = U_2/U_1$</td></tr>
<tr><td>Dämpfung</td><td>attenuation</td><td>$a$ in dB</td></tr>
<tr><td>Flankensteilheit</td><td>roll-off</td><td>dB/Dekade</td></tr>
<tr><td>Koppelkondensator</td><td>coupling (DC-blocking) capacitor</td><td></td></tr></table>`,
    },
    {
      id: 'deep-tau', type: 'callout', tone: 'deep', title: 'Dieselbe Schaltung im Zeitbereich',
      md: String.raw`
Der RC-Tiefpass aus dieser Lektion ist exakt das RC-Glied aus den Schaltvorgängen. Springt die Eingangsspannung, folgt die Ausgangsspannung wie $1-\mathrm e^{-t/\tau}$ mit $\tau = RC$; ein Sinus am Eingang erscheint am Ausgang mit der Amplitude $|H|$ und um $\varphi$ verschoben. Die Rechteckflanken in der Demo werden „rund", weil der Tiefpass die hohen Oberwellen (aus denen die steile Flanke besteht) abschwächt. Faustregel: Anstiegszeit (10–90 %) $\approx 2{,}2\,\tau \approx 0{,}35/f_g$.`,
    },
    {
      id: 'recall-dek', type: 'recall', title: 'Erkläre es mit eigenen Worten',
      prompt: 'Was bedeutet „20 dB pro Dekade" in Worten, und wie hängt das mit der Ordnung des Filters zusammen?',
      answer: 'Oberhalb der Grenzfrequenz sinkt die Ausgangsspannung bei jeder Verzehnfachung der Frequenz auf ein Zehntel (20 dB). Ein Filter 1. Ordnung (ein Energiespeicher, z. B. ein RC-Glied) hat genau diese Flanke. Jede weitere Ordnung (zusätzlicher Speicher) addiert weitere 20 dB/Dekade: 2. Ordnung 40 dB, 3. Ordnung 60 dB je Dekade.',
      hints: ['Wie groß ist der Spannungsfaktor bei 20 dB?', 'Was passiert beim Hintereinanderschalten von zwei Filtern mit den dB-Werten?'],
      cards: ['dek20'],
    },
  ],
  cards: [
    { id: 'fg-rc', front: 'Grenzfrequenz eines RC-Glieds?', back: '$f_g = \\dfrac{1}{2\\pi R C}$ (dort ist $X_C = R$).' },
    { id: 'fg-rl', front: 'Grenzfrequenz eines RL-Glieds?', back: '$f_g = \\dfrac{R}{2\\pi L}$ (dort ist $X_L = R$).' },
    { id: 'tp-aufbau', front: 'Wie ist ein RC-**Tiefpass** aufgebaut?', back: '$R$ in Reihe im Signalweg, $C$ quer nach Masse (Ausgang am Kondensator).' },
    { id: 'hp-aufbau', front: 'Wie ist ein RC-**Hochpass** aufgebaut?', back: '$C$ in Reihe im Signalweg, $R$ quer nach Masse. Merke: C in Reihe lässt das Hohe durch.' },
    { id: 'drei-db', front: 'Was gilt an der Grenzfrequenz (Betrag, dB, Phase)?', back: '$|H| = 1/\\sqrt2 = 0{,}707$, −3 dB, Phase 45° (Tiefpass: −45°). Leistung halbiert.' },
    { id: 'dek20', front: 'Was bedeutet „20 dB/Dekade" in Worten?', back: 'Bei 10-facher Frequenz ist die Spannung 10-mal kleiner (−20 dB). Typisch für Filter 1. Ordnung.' },
    { id: 'bode', front: 'Was zeigt ein Bode-Diagramm?', back: 'Betrag (in dB) und Phase (in °) der Übertragungsfunktion über der logarithmischen Frequenz.' },
    { id: 'hp-kopp', front: 'Warum blockt ein Hochpass mit C in Reihe Gleichspannung?', back: 'Bei $f = 0$ ist $X_C = \\infty$: kein Gleichstrom fließt. Deshalb Koppelkondensator.' },
    { id: 'att-fg10', front: 'Dämpfung eines RC-Tiefpasses bei $f_g$, $2f_g$, $10f_g$?', back: 'Etwa 3 dB, 7 dB und 20 dB.' },
    { id: 'fg-tau', front: 'Zusammenhang zwischen Zeitkonstante und Grenzfrequenz?', back: '$f_g = 1/(2\\pi\\tau)$ mit $\\tau = RC$ (bzw. $L/R$).' },
    { id: 'tp-sender', front: 'Welches Filter gehört zwischen Senderausgang und Antenne?', back: 'Ein Tiefpass: er dämpft die Oberwellen (EJ203/EJ204).' },
  ],
};
