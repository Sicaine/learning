export default {
  id: 'schwingkreis',
  title: 'LC-Schwingkreis, Resonanz, Güte',
  summary: 'Warum Spule und Kondensator zusammen schwingen, bei welcher Frequenz (f₀ = 1/(2π√(LC))), und was Güte und Bandbreite über die Trennschärfe verraten.',
  minutes: 35,
  needs: ['zeiger-impedanz'],
  goals: [
    'Erklären, wie im [[schwingkreis|Schwingkreis]] Energie zwischen Kondensator (E-Feld) und Spule (Magnetfeld) pendelt',
    'Die [[resonanzfrequenz]] mit der [[thomson-formel]] berechnen und umstellen (L, C oder f₀ gesucht)',
    'Verhalten von [[reihenschwingkreis]] (niederohmig) und [[parallelschwingkreis]] (hochohmig) bei Resonanz unterscheiden',
    '[[guete|Güte]] Q und [[bandbreite|Bandbreite]] B ineinander umrechnen und die Spannungsüberhöhung abschätzen',
    'Einen Kreis auf eine Zielfrequenz (7,1 MHz) und eine Zielgüte abstimmen',
  ],
  blocks: [
    {
      id: 'intuition', type: 'text', title: 'Schaukel mit Gedächtnis: Energie pendelt hin und her',
      md: String.raw`
Eine [Schaukel](wiki:Schaukel|Swing (seat)) und ein [Pendel](wiki:Pendel|Pendulum) haben zwei Energiespeicher: Höhe (Lageenergie) und Bewegung (kinetische Energie). Am höchsten Punkt steht alles still, in der Mitte ist die Geschwindigkeit am größten — und so pendelt die Energie hin und her. Wer im richtigen **Takt** anschiebt, braucht wenig Kraft und schaukelt trotzdem hoch. Das ist [Resonanz](wiki:Resonanz|Resonance).

Ein elektrischer **[[schwingkreis|Schwingkreis]]** hat ebenfalls zwei Speicher:

- der [[kondensator|Kondensator]] ([Kondensator](wiki:Kondensator (Elektrotechnik)|Capacitor)) speichert Energie im **elektrischen Feld**: $W_C = \tfrac12 C U^2$
- die [[spule|Spule]] ([Spule](wiki:Spule (Elektrotechnik)|Electromagnetic coil)) speichert Energie im **Magnetfeld**: $W_L = \tfrac12 L I^2$

Lädst du den Kondensator auf und schaltest ihn an die Spule, entlädt er sich: Der Strom steigt langsam an (die Spule wehrt sich dagegen, [[induktionsgesetz|Induktion]]), und wenn der Kondensator leer ist, **treibt die Spule den Strom weiter** und lädt den Kondensator mit umgekehrter Polung wieder auf. Dann beginnt es von vorn. Die Energie wandert zwischen E-Feld und Magnetfeld — ein Hertzscher Schwingkreis, wie ihn [Heinrich Hertz](wiki:Heinrich Hertz|Heinrich Hertz) 1886 für seine ersten Funkversuche nutzte.[^wiki-schwingkreis-c4]`,
    },
    {
      id: 'order-pendel', type: 'order', title: 'Ein halber Schwingungszyklus',
      prompt: 'Bringe die Phasen in die richtige Reihenfolge (Start: Kondensator voll geladen, Strom null).',
      items: [
        'Kondensator voll geladen, Strom null — die gesamte Energie steckt im E-Feld',
        'Der Kondensator entlädt sich, der Strom steigt, die Spule baut ein Magnetfeld auf',
        'Kondensator leer, Strom maximal — die gesamte Energie steckt im Magnetfeld',
        'Die Spule treibt den Strom weiter und lädt den Kondensator umgekehrt auf',
        'Kondensator voll mit umgekehrter Polung, Strom wieder null',
      ],
      explain: 'Nach der halben Periode ist alles gespiegelt (umgekehrte Polung); nach der ganzen Periode sind wir wieder am Anfang. Ohne Verluste ginge das ewig so weiter.',
    },
    {
      id: 'f0', type: 'text', title: 'Die Resonanzfrequenz: wann X_L = X_C',
      md: String.raw`
Wie schnell pendelt es? Je größer $L$ (träge Spule) und je größer $C$ (viel Ladung nötig), desto **langsamer**. Genau das steckt in der [[thomson-formel|Thomsonschen Schwingungsformel]] (nach [William Thomson](wiki:William Thomson, 1. Baron Kelvin|Lord Kelvin), dem späteren Lord Kelvin):

$$ f_0 = \frac{1}{2\pi\sqrt{L\,C}} $$

Herleitung aus der letzten Lektion: Bei der [[resonanzfrequenz|Resonanz]] sind die beiden [[reaktanz|Blindwiderstände]] gleich groß — $X_L = X_C$:

$$ \omega_0 L = \frac{1}{\omega_0 C} \;\Rightarrow\; \omega_0^2 = \frac{1}{LC} \;\Rightarrow\; f_0 = \frac{\omega_0}{2\pi} = \frac{1}{2\pi\sqrt{LC}} $$

Umgestellt, wenn du eine Frequenz vorgibst und ein Bauteil suchst:

$$ L = \frac{1}{(2\pi f_0)^2\, C} \qquad\qquad C = \frac{1}{(2\pi f_0)^2\, L} $$

**Merkregel für den Prüfungsalltag:** Vervierfachst du $L$ *oder* $C$, halbiert sich $f_0$ (Wurzel!). Vervierfachst du beide, wird $f_0$ sogar nur ein Viertel.[^bnetza-pruefungsfragen-2024]`,
    },
    {
      id: 'calc-f0', type: 'numeric', title: 'Resonanzfrequenz berechnen',
      question: 'Ein Schwingkreis besteht aus $L = 10\\,\\mu\\text{H}$ und $C = 100\\,\\text{pF}$. Wie groß ist $f_0$ in MHz?',
      answer: 5.03, tolerance: 0.03, unit: 'MHz',
      hint: '$L = 10\\cdot10^{-6}$ H, $C = 100\\cdot10^{-12}$ F. Erst $\\sqrt{LC}$ ausrechnen, dann $2\\pi$ davor.',
      explain: '$LC = 10^{-5}\\cdot10^{-10} = 10^{-15}$, $\\sqrt{LC} = 3{,}162\\cdot10^{-8}$ s, also $f_0 = 1/(2\\pi\\cdot3{,}162\\cdot10^{-8}) \\approx 5{,}03$ MHz.',
    },
    {
      id: 'calc-L', type: 'numeric', title: 'Spule für das 40-m-Band',
      question: 'Du willst einen Kreis auf $7{,}1\\,\\text{MHz}$ ([40-Meter-Band](wiki:40-Meter-Band|40-meter band)) abstimmen und hast $C = 100\\,\\text{pF}$. Welche Induktivität $L$ brauchst du, in µH?',
      answer: 5.03, tolerance: 0.05, unit: 'µH',
      hint: '$L = 1/((2\\pi f_0)^2 C)$ mit $f_0 = 7{,}1\\cdot10^{6}$ Hz.',
      explain: '$(2\\pi\\cdot7{,}1\\cdot10^6)^2 = 1{,}99\\cdot10^{15}$; mal $100\\cdot10^{-12}$ ergibt $1{,}99\\cdot10^{5}$; Kehrwert: $L = 5{,}02\\cdot10^{-6}$ H $\\approx 5{,}0\\,\\mu$H.',
    },
    {
      id: 'quiz-c4', type: 'quiz', title: 'Was passiert, wenn C vervierfacht wird?',
      question: 'Die Kapazität eines Schwingkreises wird vervierfacht, $L$ bleibt gleich. Wie ändert sich $f_0$?',
      options: [
        { text: '$f_0$ halbiert sich.', correct: true, why: '$f_0 \\propto 1/\\sqrt{C}$: vierfaches $C$ → $1/\\sqrt4 = 1/2$.' },
        { text: '$f_0$ wird auf ein Viertel verkleinert.', correct: false, why: 'Das wäre der Fall bei $f_0 \\propto 1/C$ — die Formel hat aber eine Wurzel.' },
        { text: '$f_0$ verdoppelt sich.', correct: false, why: 'Mehr Kapazität macht den Kreis träger, die Frequenz sinkt.' },
        { text: '$f_0$ bleibt gleich, nur die Güte ändert sich.', correct: false, why: 'C geht direkt in $f_0 = 1/(2\\pi\\sqrt{LC})$ ein.' },
      ],
    },
    {
      id: 'video-schwingkreis', type: 'video', youtube: 'bTwO2zEeUXk', label: 'Der Schwingkreis – ganz einfach erklärt / Funktechnik', channel: 'MiKs Welt', minutes: 5,
      why: 'Kurzer Überblick über Aufbau und Wirkung des Schwingkreises (ca. 5 Min) — gut als Auffrischung vor der Demo.',
    },
    {
      id: 'viz-resonance', type: 'viz', viz: 'resonance-lab', title: 'Schwingkreis abstimmen',
      intro: 'Stelle $L$, $C$ und den Verlustwiderstand $R$ ein. Oben siehst du den Betrag der Impedanz (mit $X_L$ und $X_C$ gestrichelt), darunter die Resonanzkurve, unten das Ein- und Ausschwingen. Wechsle zwischen **Reihen-** und **Parallelkreis** und achte auf Minimum und Maximum von $|Z|$.',
      params: { targetF: 7.1e6, targetQ: 100, tolF: 0.02 },
      task: 'Stimme den **Reihenkreis** auf $f_0 = 7{,}1$ MHz (±2 %) ab **und** erreiche gleichzeitig eine Güte $Q \\ge 100$. Tipp: erst $L$ und $C$ für die Frequenz, dann $R$ für die Güte.',
      caption: 'Der Verlustwiderstand R verschiebt f₀ praktisch nicht, bestimmt aber Güte, Bandbreite und die Zeitkonstante τ = 2L/R des Ausschwingens.',
    },
    {
      id: 'reihe-parallel', type: 'text', title: 'Reihenkreis: niederohmig – Parallelkreis: hochohmig',
      md: String.raw`
Wie ein Schwingkreis auf eine Quelle wirkt, hängt davon ab, wie $L$ und $C$ verschaltet sind. Bei der Resonanz heben sich $X_L$ und $X_C$ gegenseitig auf — aber auf **entgegengesetzte** Weise:

<table>
<tr><th></th><th>Reihenkreis (Serienschwingkreis)</th><th>Parallelkreis</th></tr>
<tr><td>Impedanz bei $f_0$</td><td>**minimal** — nur der Verlustwiderstand $R_S$ bleibt</td><td>**maximal** — Resonanzwiderstand $R_P \approx Q\cdot X_L$</td></tr>
<tr><td>Strom</td><td>aus der Quelle **maximal**</td><td>aus der Quelle **minimal** (Strom pendelt im Kreis)</td></tr>
<tr><td>Wirkt wie</td><td>Kurzschluss für $f_0$ („Saugkreis")</td><td>Sperre für $f_0$ („Sperrkreis")</td></tr>
<tr><td>Ansicht des Impedanzverlaufs</td><td>tiefe, schmale Senke</td><td>hoher, schmaler Berg</td></tr>
</table>

Im Reihenkreis fließt derselbe Strom durch $L$ und $C$; im Parallelkreis liegt dieselbe Spannung an beiden. Weit unterhalb von $f_0$ dominiert beim Reihenkreis der Kondensator (kapazitiv), oberhalb die Spule (induktiv) — beim Parallelkreis ist es umgekehrt, und genau bei $f_0$ ist der Kreis rein ohmsch ($\varphi = 0°$, siehe [Zeigerdiagramm](wiki:Zeigerdiagramm)).

Typischer Einsatz: Der Parallelkreis wählt aus dem Gemisch der Antennensignale **eine** Frequenz aus (hohe Spannung bei $f_0$). Der Reihenkreis lässt eine Frequenz durch bzw. zieht sie nach Masse.`,
    },
    {
      id: 'match-kreise', type: 'match', title: 'Kreise und Kennzahlen',
      prompt: 'Was gehört zusammen?',
      pairs: [
        ['Reihenkreis (Saugkreis)', 'Impedanz minimal, Quellenstrom maximal'],
        ['Parallelkreis (Sperrkreis)', 'Impedanz maximal, Quellenstrom minimal'],
        ['Güte Q', 'f₀ geteilt durch B'],
        ['Thomson-Formel', '1 / (2π·√(L·C))'],
      ],
    },
    {
      id: 'guete', type: 'text', title: 'Güte und Bandbreite: wie scharf ist der Kreis?',
      md: String.raw`
Ein echter Kreis hat Verluste (Draht der Spule, Kondensator, Abstrahlung), die wir als **Verlustwiderstand** $R$ zusammenfassen. Er entscheidet, wie scharf die Resonanz ist. Dafür gibt es zwei Kennzahlen:

- Die [[bandbreite|Bandbreite]] $B$ ([Bandbreite](wiki:Bandbreite|Bandwidth (signal processing))): der Frequenzbereich, in dem die Resonanzkurve nicht mehr als 3 dB (Spannung auf $1/\sqrt2$, Leistung auf die Hälfte) unter dem Maximum liegt — zwischen den −3-dB-Punkten $f_1$ und $f_2$, also $B = f_2 - f_1$.
- Die [[guete|Güte]] $Q$ ([Gütefaktor](wiki:Gütefaktor|Q factor)): das Verhältnis aus Mittenfrequenz und Bandbreite.

$$ Q = \frac{f_0}{B} \qquad\Longleftrightarrow\qquad B = \frac{f_0}{Q} $$

Hohe Güte = schmale Kurve = **hohe Trennschärfe**.[^wiki-trennschaerfe-c4] Aus den Bauteilen folgt (Reihenkreis bzw. Parallelkreis mit Verlust als Serienwiderstand der Spule):

$$ Q_\text{Reihe} = \frac{X_L}{R_S} = \frac{2\pi f_0 L}{R_S} \qquad\qquad Q_\text{par} = \frac{R_P}{X_L} $$

**Beispiel Funkpraxis:** $f_0 = 7{,}1$ MHz und $Q = 100$ → $B = 71$ kHz. Ein SSB-Signal braucht rund 2,7 kHz — ein Kreis mit $Q = 100$ ist also für Sprache schon sehr schmal, aber für einzelne Stationen noch lange nicht scharf genug. Dafür nimmt man Quarz-/ZF-Filter (siehe Lektion zu Filtern).

**Spannungsüberhöhung:** Im Reihenkreis ist bei Resonanz $I = U/R$, also $U_C = I\,X_C = U\cdot X_C/R = Q\cdot U$. Mit $Q = 100$ liegen an Spule und Kondensator also das **100-fache** der Quellenspannung! Das ist kein Fehler, sondern Energiependeln: Spule und Kondensator tauschen ständig Energie, die Quelle ersetzt nur die Verluste.

**Ausschwingen:** Ohne Anregung nimmt die Amplitude mit $\mathrm e^{-t/\tau}$ ab, $\tau = 2L/R = Q/(\pi f_0)$. Hohe Güte → langes Nachschwingen. Genau das zeigt das untere Diagramm der Demo.`,
    },
    {
      id: 'calc-q1', type: 'numeric', title: 'Güte aus Mittenfrequenz und Bandbreite',
      question: 'Ein Kreis hat $f_0 = 7{,}1\\,\\text{MHz}$ und eine Bandbreite $B = 71\\,\\text{kHz}$. Wie groß ist die Güte $Q$?',
      answer: 100, tolerance: 1,
      explain: '$Q = f_0/B = 7{,}1\\,\\text{MHz}/71\\,\\text{kHz} = 100$.',
    },
    {
      id: 'calc-b', type: 'numeric', title: 'Bandbreite aus der Güte',
      question: 'Ein Kreis mit $Q = 50$ ist auf $f_0 = 3{,}65\\,\\text{MHz}$ abgestimmt. Wie groß ist seine Bandbreite in kHz?',
      answer: 73, tolerance: 0.5, unit: 'kHz',
      explain: '$B = f_0/Q = 3{,}65\\,\\text{MHz}/50 = 73\\,\\text{kHz}$.',
    },
    {
      id: 'calc-q2', type: 'numeric', title: 'Güte des Reihenkreises',
      question: 'Beim Reihenkreis ist $X_L = 450\\,\\Omega$ und der Verlustwiderstand $R_S = 4{,}5\\,\\Omega$. Welche Güte hat der Kreis?',
      answer: 100, tolerance: 1,
      explain: '$Q = X_L/R_S = 450/4{,}5 = 100$. Bei Resonanz ist $X_C = X_L$, also gilt dasselbe mit $X_C$.',
    },
    {
      id: 'calc-uc', type: 'numeric', title: 'Spannungsüberhöhung',
      question: 'Ein Reihenkreis mit $Q = 100$ wird bei Resonanz mit $U = 0{,}5\\,\\text{V}$ gespeist. Welche Spannung liegt am Kondensator, in V?',
      answer: 50, tolerance: 0.5, unit: 'V',
      explain: '$U_C = Q\\cdot U = 100\\cdot0{,}5\\,\\text{V} = 50\\,\\text{V}$. Die Überhöhung entsteht durch das Energiependeln; die Quelle liefert nur die Verlustleistung $I^2R$.',
    },
    {
      id: 'calc-c', type: 'numeric', title: 'Kondensator für 3,65 MHz',
      question: 'Eine Spule mit $L = 10\\,\\mu\\text{H}$ soll auf $3{,}65\\,\\text{MHz}$ (80-m-Band) abgestimmt werden. Welche Kapazität ist nötig, in pF?',
      answer: 190, tolerance: 3, unit: 'pF',
      hint: '$C = 1/((2\\pi f_0)^2 L)$.',
      explain: '$(2\\pi\\cdot3{,}65\\cdot10^6)^2 = 5{,}26\\cdot10^{14}$; mal $10^{-5}$ ergibt $5{,}26\\cdot10^{9}$; Kehrwert $\\approx 1{,}9\\cdot10^{-10}$ F $= 190$ pF.',
    },
    {
      id: 'warning-par', type: 'callout', tone: 'warning', title: 'Vorsicht: Parallelkreis ist bei Resonanz hochohmig!',
      md: String.raw`
Die häufigste Verwechslung: „Bei Resonanz hat alles minimalen Widerstand." Das gilt nur für den **Reihenkreis**. Der **Parallelkreis** zeigt an den Klemmen bei $f_0$ einen **sehr hohen** Widerstand $R_P \approx Q\,X_L$ — im Kreis selbst fließt ein großer Strom, aus der Quelle aber nur ein kleiner. Merkhilfe: *Reihe: Strom max., Parallel: Strom min.* (aus der Quelle). Und: Eine kleine Güte bedeutet **mehr** Dämpfung, nicht „kleinere Frequenz".`,
    },
    {
      id: 'quiz-impedanz', type: 'quiz', title: 'Impedanz bei Resonanz',
      question: 'Wie verhält sich ein **Parallelschwingkreis** bei seiner Resonanzfrequenz?',
      options: [
        { text: 'Wie ein hochohmiger Widerstand.', correct: true, why: 'Die Blindströme von L und C kompensieren sich, aus der Quelle fließt nur der kleine Verluststrom.' },
        { text: 'Wie ein niederohmiger Widerstand.', correct: false, why: 'Das gilt für den Reihenkreis.' },
        { text: 'Wie ein Kondensator mit sehr kleiner Kapazität.', correct: false, why: 'Bei $f_0$ ist der Kreis rein ohmsch, nicht kapazitiv.' },
        { text: 'Wie eine Spule mit sehr großer Induktivität.', correct: false, why: 'Auch nicht induktiv: bei $f_0$ ist die Phase null.' },
      ],
    },
    {
      id: 'mission-schwingkreis', type: 'callout', tone: 'mission', title: 'Prüfung & Funkpraxis',
      md: String.raw`
- **Prüfungsbezug:** Impedanzverläufe erkennen — Senke = Reihenkreis (ED205), Berg = Parallelkreis (ED206); „Parallelkreis bei Resonanz → hochohmig" (ED207); Resonanzfrequenz bestimmen durch Rechnung oder [Netzwerkanalysator](wiki:Netzwerkanalysator|Network analyzer (electrical)) (EI202); LC-Schwingkreis als frequenzbestimmendes Glied eines Oszillators (ED501).
- **Praxis:** In jedem Empfänger wählt ein (abstimmbarer) Parallelkreis, oft mit [Drehkondensator](wiki:Drehkondensator|Variable capacitor), den gewünschten Sender aus — im [Überlagerungsempfänger](wiki:Überlagerungsempfänger|Superheterodyne receiver) und in der Antennenanpassung. Antennen selbst verhalten sich in der Nähe ihrer Resonanz wie Reihenkreise.
- **Rechentipp:** $f_0$ mit dem Taschenrechner in einem Zug: $1/(2\pi\sqrt{LC})$ — Vorsätze erst in Basiseinheiten (µH → $10^{-6}$, pF → $10^{-12}$) umrechnen.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: String.raw`
<table><tr><th>Deutsch</th><th>English</th><th>Notation</th></tr>
<tr><td>Schwingkreis</td><td>resonant circuit, LC circuit, tank circuit</td><td>$L$, $C$</td></tr>
<tr><td>Resonanzfrequenz</td><td>resonant frequency</td><td>$f_0$</td></tr>
<tr><td>Reihenschwingkreis / Serienkreis</td><td>series resonant circuit</td><td></td></tr>
<tr><td>Parallelschwingkreis</td><td>parallel resonant circuit</td><td></td></tr>
<tr><td>Güte</td><td>quality factor, Q factor</td><td>$Q = f_0/B$</td></tr>
<tr><td>Bandbreite</td><td>bandwidth</td><td>$B = f_2 - f_1$</td></tr>
<tr><td>Trennschärfe</td><td>selectivity</td><td></td></tr>
<tr><td>Verlustwiderstand</td><td>loss resistance</td><td>$R_S$, $R_P$</td></tr>
<tr><td>Ausschwingen / Einschwingen</td><td>ringdown / build-up</td><td>$\tau = 2L/R$</td></tr></table>`,
    },
    {
      id: 'deep-q', type: 'callout', tone: 'deep', title: 'Woher kommt Q = f₀/B? (Energiebilanz)',
      md: String.raw`
Q lässt sich auch energetisch lesen: $Q = 2\pi\cdot\dfrac{W_\text{gespeichert}}{W_\text{Verlust pro Periode}}$. Bei $Q=100$ verliert der Kreis pro Periode rund $2\pi/100 \approx 6\,\%$ seiner Schwingungsenergie. Die Amplitude fällt dann um den halben Wert, also $\approx 3\,\%$ pro Periode — nach $Q/\pi \approx 32$ Perioden ist sie auf $1/\mathrm e$ gesunken. Passend dazu ist $\tau = Q/(\pi f_0)$: Eine hohe Güte bedeutet langes Nachschwingen **und** eine schmale Resonanzkurve — beides sind zwei Seiten derselben Medaille (Zeit und Frequenz, [Fourier](wiki:Fourier-Transformation|Fourier transform)).`,
    },
    {
      id: 'recall-uc', type: 'recall', title: 'Erkläre es mit eigenen Worten',
      prompt: 'Warum sind im **Reihenkreis** bei Resonanz die Spannungen an L und C ($Q$-mal) größer als die Quellenspannung? Erkläre in 2–4 Sätzen, wo die Energie bleibt.',
      answer: 'Bei Resonanz heben sich die Blindwiderstände auf, nur der kleine Verlustwiderstand R begrenzt den Strom: $I = U/R$ ist groß. Dieser große Strom fließt durch L und C, dort entsteht $U_C = I X_C = Q\\,U$. Die Spannungen an L und C sind entgegengesetzt gleich groß und heben sich in der Reihenschaltung auf, die Quelle sieht nur R. Die Energie pendelt zwischen Magnetfeld und E-Feld; die Quelle liefert lediglich die Verluste in R.',
      hints: ['Wie groß ist die Impedanz des ganzen Kreises bei $f_0$?', 'Welche Größe ist an L und C gleich, welche verschieden?'],
      cards: ['uc-q'],
    },
  ],
  cards: [
    { id: 'thomson', front: 'Resonanzfrequenz eines LC-Kreises (Thomson)?', back: '$f_0 = \\dfrac{1}{2\\pi\\sqrt{L\\,C}}$' },
    { id: 'xl-xc', front: 'Welche Bedingung gilt bei Resonanz für die Blindwiderstände?', back: '$X_L = X_C$, also $\\omega_0 L = 1/(\\omega_0 C)$.' },
    { id: 'reihe-z', front: 'Impedanz des **Reihenkreises** bei $f_0$?', back: 'Minimal: nur der Verlustwiderstand $R_S$. Strom aus der Quelle maximal.' },
    { id: 'par-z', front: 'Impedanz des **Parallelkreises** bei $f_0$?', back: 'Maximal (hochohmig, $R_P\\approx Q X_L$). Strom aus der Quelle minimal.' },
    { id: 'q-def', front: 'Definition der Güte $Q$ (aus der Kurve)?', back: '$Q = f_0/B$ mit der −3-dB-Bandbreite $B$.' },
    { id: 'b-def', front: 'Bandbreite $B$ bei gegebenem $Q$ und $f_0$?', back: '$B = f_0/Q$. Beispiel: 7,1 MHz, $Q=100$ → 71 kHz.' },
    { id: 'q-reihe', front: 'Güte des Reihenkreises aus den Bauteilen?', back: '$Q = X_L/R_S = 2\\pi f_0 L/R_S$' },
    { id: 'q-par', front: 'Güte des Parallelkreises (Resonanzwiderstand)?', back: '$Q = R_P/X_L$, d. h. $R_P \\approx Q\\cdot X_L$.' },
    { id: 'uc-q', front: 'Spannung am Kondensator im Reihenkreis bei Resonanz?', back: '$U_C = Q\\cdot U$ — das $Q$-fache der Quellenspannung (ebenso $U_L$).' },
    { id: 'c4', front: '$C$ vervierfacht — was passiert mit $f_0$?', back: '$f_0$ halbiert sich ($f_0\\propto 1/\\sqrt{C}$).' },
    { id: 'tau', front: 'Zeitkonstante des Ausschwingens eines Schwingkreises?', back: '$\\tau = 2L/R = Q/(\\pi f_0)$. Hohe Güte → langes Nachschwingen, schmale Kurve.' },
    { id: 'saugsperr', front: 'Welcher Kreis ist „Saugkreis", welcher „Sperrkreis"?', back: 'Reihenkreis (nach Masse) = Saugkreis, zieht $f_0$ weg. Parallelkreis (in der Leitung) = Sperrkreis, sperrt $f_0$.' },
  ],
};
