export default {
  id: 'bandpass-filterordnung',
  title: 'Bandpass, Bandsperre, Filter höherer Ordnung',
  summary: 'Warum ein einzelnes RC-Glied als Oberwellenfilter nicht reicht: Filterordnung (n × 20 dB/Dekade), Butterworth und Bessel, Bandpass und Bandsperre aus dem Schwingkreis, Saug- und Sperrkreis, Dämpfungsglied.',
  minutes: 30,
  needs: ['rc-rl-filter', 'schwingkreis'],
  goals: [
    'Die [[filterordnung|Ordnung]] eines Filters mit der Flankensteilheit (n · 20 dB/Dekade) verknüpfen',
    '[[bandpass|Bandpass]] und [[bandsperre|Bandsperre]] aus einem Schwingkreis aufbauen und Mittenfrequenz sowie Bandbreite bestimmen',
    '[[saugkreis|Saug-]] und [[sperrkreis|Sperrkreis]] unterscheiden und ein [[notchfilter|Notchfilter]] einordnen',
    'Den Unterschied zwischen [[butterworth-filter|Butterworth-]] und [[bessel-filter|Bessel-Filter]] qualitativ benennen',
    'Ein [[daempfungsglied|Dämpfungsglied]] als frequenzunabhängige „Bremse" verstehen',
  ],
  blocks: [
    {
      id: 'intuition', type: 'text', title: 'Ein RC-Glied reicht nicht',
      md: String.raw`
Ein Kurzwellensender strahlt neben der Grundwelle immer auch **Oberwellen** aus (ganzzahlige Vielfache). Sendest du auf 7,1 MHz, entstehen schwächer auch 14,2 MHz, 21,3 MHz, … — und die können andere Funkdienste stören. Zwischen Senderausgang und Antenne gehört deshalb ein **Tiefpass** (siehe letzte Lektion).

In der Demo der letzten Lektion hast du gesehen: Ein einfaches RC-Tiefpass-Glied mit $f_g \approx 10$ MHz dämpft die 14,2-MHz-Oberwelle gerade mal um etwa **4,6 dB** — also nicht einmal um den Faktor 3 in der Leistung. Gesetzlich verlangt werden Dämpfungen von vielen zig dB. Die Flanke muss steiler werden.

Die Lösung: **Mehrere Stufen hintereinander**. Jede zusätzliche Stufe (genauer: jeder zusätzliche unabhängige Energiespeicher, also ein weiteres $L$ oder $C$) erhöht die **Ordnung** $n$ des Filters um eins und die Flankensteilheit um 20 dB je Dekade:

$$ \text{Flankensteilheit} = n \cdot 20\,\frac{\text{dB}}{\text{Dekade}} \;\approx\; n\cdot 6\,\frac{\text{dB}}{\text{Oktave}} $$

Ein Tiefpass 3. Ordnung fällt also mit **60 dB/Dekade**: Bei $10\,f_g$ sind die Signale idealisiert um 60 dB (Spannungsfaktor 1000) gedämpft. Die Dämpfungen der Stufen **addieren sich in dB** (weil sich die Faktoren multiplizieren).`,
    },
    {
      id: 'ordnung', type: 'text', title: 'Butterworth, Bessel & Co.: dieselbe Ordnung, anderer Charakter',
      md: String.raw`
Bei gleicher Ordnung kann man die Bauteilwerte verschieden wählen und so den Charakter des Filters festlegen:

- **[Butterworth-Filter](wiki:Butterworth-Filter|Butterworth filter)** (nach [Stephen Butterworth](wiki:Stephen Butterworth), 1930): im Durchlassbereich *maximal flach*, $|H|^2 = 1/(1+(f/f_g)^{2n})$ — ein guter Allround-Kompromiss und typisch für Oberwellenfilter.
- **[Bessel-Filter](wiki:Bessel-Filter|Bessel filter)** (nach [Friedrich Wilhelm Bessel](wiki:Friedrich Wilhelm Bessel)): möglichst konstante [Gruppenlaufzeit](wiki:Gruppenlaufzeit|Group delay and phase delay) — Rechtecke und Impulse werden kaum verformt (kein Überschwingen), dafür fällt die Flanke langsamer.
- **[Tschebyscheff-Filter](wiki:Tschebyscheff-Filter|Chebyshev filter)**: noch steilere Flanke, dafür eine Welligkeit im Durchlassbereich.

Mit der Demo kannst du es selbst sehen: Schalte auf **Ordnung n** und vergleiche die drei Bauarten bei gleicher Grenzfrequenz. Beim Butterworth-Filter 3. Ordnung betragen die Dämpfungen $10\lg\bigl(1+(f/f_g)^{6}\bigr)$: bei $2f_g$ rund 18 dB, bei $10 f_g$ genau 60 dB.[^wiki-butterworth-c4]

**Wichtig:** Hängt man einfach RC-Glieder hintereinander, belasten sich die Stufen gegenseitig — das Filter verhält sich dann anders als die Theorie. In der Demo sind die RC-Stufen deshalb *durch Puffer entkoppelt* gedacht; sie zeigen dann, dass die Gesamt-Grenzfrequenz **kleiner** ist als die einer einzelnen Stufe (bei $n=2$ nur noch 64 % ). Echte HF-Filter bestehen aus LC-Gliedern (Pi- und T-Filter), die gerade so dimensioniert sind, dass die Gesamtanordnung die gewünschte Charakteristik hat.`,
    },
    {
      id: 'viz-order', type: 'viz', viz: 'filter-lab', title: 'Filter höherer Ordnung',
      intro: 'Wähle **Aufbau: Ordnung n**, **Tief-** oder **Hochpass**, die Ordnung 1–4 und eine Bauart. Stelle die Grenzfrequenz mit dem Regler ein. Beobachte im Bode-Diagramm die Flanke und im Zeitbereich, wie ein Rechtecksignal verformt wird (Butterworth überschwingt etwas, Bessel kaum).',
      params: {
        builds: ['order'], build: 'order', type: 'tp', n: 1, response: 'butter', signal: 'square', init: { fc: 1e3, fin: 300 },
        goals: [
          { id: 'tp3', label: 'Tiefpass mit ≥ 55 dB Dämpfung bei 10·f_g', test: s => s.build === 'order' && s.type === 'tp' && s.att(10 * s.fg) >= 55 },
          { id: 'hp2', label: 'Hochpass 2. Ordnung: ≥ 10 dB Dämpfung bei f_g/2', test: s => s.build === 'order' && s.type === 'hp' && s.n >= 2 && s.att(s.fg / 2) >= 10 },
        ],
      },
      task: 'Erreiche beide Ziele: (1) Ein **Tiefpass** mit mindestens 55 dB Dämpfung bei $10\\,f_g$ (welche Ordnung braucht das?). (2) Ein **Hochpass** mindestens 2. Ordnung, der bei der halben Grenzfrequenz mindestens 10 dB dämpft.',
      caption: 'Hinweis: Das ist nur das Verhalten der Übertragungsfunktion; reale Bauteile (Spulen mit Verlusten, Streukapazitäten) verfälschen die Kurve bei hohen Dämpfungen.',
    },
    {
      id: 'calc-steil', type: 'numeric', title: 'Flankensteilheit',
      question: 'Wie viele dB pro Dekade fällt die Flanke eines Tiefpasses **3. Ordnung** weit oberhalb der Grenzfrequenz ab?',
      answer: 60, tolerance: 0.5, unit: 'dB/Dekade',
      explain: 'Jede Ordnung trägt 20 dB/Dekade bei: $3\\cdot20 = 60$ dB/Dekade. Bei $10 f_g$ sind das (idealisiert) etwa 60 dB.',
    },
    {
      id: 'calc-2fg', type: 'numeric', title: 'Dämpfung bei 2·f_g (Butterworth)',
      question: 'Ein Butterworth-Tiefpass 3. Ordnung hat die Grenzfrequenz $f_g$. Wie groß ist seine Dämpfung bei $2 f_g$, in dB? ($|H|^2 = 1/(1+(f/f_g)^{6})$)',
      answer: 18.1, tolerance: 0.3, unit: 'dB',
      hint: '$a = 10\\lg(1 + 2^6)$.',
      explain: '$a = 10\\lg(1 + 64) = 10\\lg 65 = 18{,}1$ dB. Zum Vergleich: ein Filter 1. Ordnung schafft bei $2f_g$ nur 7 dB.',
    },
    {
      id: 'band', type: 'text', title: 'Bandpass und Bandsperre aus dem Schwingkreis',
      md: String.raw`
Aus der Schwingkreis-Lektion kennst du das Maximum bzw. die Senke bei $f_0$. Damit lassen sich Filter bauen, die nicht „alles oberhalb" oder „alles unterhalb", sondern ein **Band** bearbeiten:

- **[[bandpass|Bandpass]]:** lässt nur ein Band um $f_0$ durch. Beispiel: Reihenkreis ($L$ und $C$ in Reihe) im Signalweg, Ausgang am Widerstand — bei $f_0$ ist der Kreis niederohmig und das Signal kommt durch, sonst sperren $X_L$ oder $X_C$.
- **[[bandsperre|Bandsperre]]:** sperrt ein Band um $f_0$, der Rest geht durch. Beispiel: Reihenkreis **quer** nach Masse („**[[saugkreis|Saugkreis]]**") — bei $f_0$ zieht er das Signal nach Masse. Alternativ: Parallelkreis **in** der Leitung („**[[sperrkreis|Sperrkreis]]**") — bei $f_0$ ist er hochohmig und sperrt.

Beide haben dieselben Kenngrößen wie der Schwingkreis: Mittenfrequenz $f_0 = 1/(2\pi\sqrt{LC})$, [[guete|Güte]] $Q$ und [[bandbreite|Bandbreite]] $B = f_0/Q$. Beim Bandpass ist das Durchlassband $B$ breit, bei der Bandsperre das *Sperr*band. Eine sehr schmale Bandsperre heißt **[[notchfilter|Notchfilter]]** („Kerbfilter"): Sie schneidet einen einzelnen Störträger — etwa einen Pfeifton — aus dem Empfangssignal, ohne die Sprache zu beschädigen.[^wiki-bandsperre-c4]

Beispiel Funkpraxis: Ein Bandpass auf 14,2 MHz mit $Q = 71$ hat $B = 14{,}2\,\text{MHz}/71 = 200$ kHz. Eine Bandsperre auf 7,1 MHz im Antennenzug unterdrückt z. B. einen starken Rundfunksender in der Nähe, ohne dein übriges Band zu stören.`,
    },
    {
      id: 'viz-band', type: 'viz', viz: 'filter-lab', title: 'Bandpass und Bandsperre bauen',
      intro: 'Hier arbeitest du mit einem **LC-Kreis**: Der **Bandpass** nutzt den Kreis im Signalweg, die **Bandsperre** quer zur Leitung. Stelle $L$, $C$ und $R$ ein und beobachte Mittenfrequenz, Bandbreite und die Verformung des Rechtecksignals. Bei passender Eingangsfrequenz filtert der Bandpass aus einem Rechteck eine einzelne Oberwelle heraus.',
      params: {
        builds: ['lc'], build: 'lc', type: 'bp', signal: 'square', init: { Rb: 22, Lb: 5.03e-6, Cb: 100e-12, fin: 2.37e6 }, fmin: 1e5, fmax: 1e8,
        goals: [
          { id: 'bp142', label: 'Bandpass: f₀ = 14,2 MHz (±3 %) und B ≈ 200 kHz (±20 %)', test: s => s.type === 'bp' && Math.abs(s.f0 / 14.2e6 - 1) <= 0.03 && Math.abs(s.B / 200e3 - 1) <= 0.2 },
          { id: 'bs365', label: 'Bandsperre: f₀ = 3,65 MHz (±3 %) mit ≥ 20 dB Dämpfung in der Mitte', test: s => s.type === 'bs' && Math.abs(s.f0 / 3.65e6 - 1) <= 0.03 && s.att(s.f0) >= 20 },
        ],
      },
      task: 'Erreiche beide Ziele: (1) **Bandpass** auf 14,2 MHz mit einer Bandbreite von etwa 200 kHz ($Q \\approx 71$). (2) **Bandsperre** auf 3,65 MHz, die in der Mitte mindestens 20 dB dämpft. Tipp: erst $L$ und $C$ für $f_0$, dann $R$ für die Bandbreite; bei der Sperre darf $R$ nicht zu klein sein, sonst ist die Spule mit ihrem Eigenverlust nicht verlustarm genug.',
      caption: 'Ein höheres R verbreitert den Bandpass (kleineres Q). Bei der Bandsperre bestimmt das Verhältnis aus Quellwiderstand R und Spulenverlust die Tiefe der Kerbe.',
    },
    {
      id: 'calc-b', type: 'numeric', title: 'Bandbreite eines Bandpasses',
      question: 'Ein Bandpass hat die Mittenfrequenz $f_0 = 14{,}2\\,\\text{MHz}$ und die Güte $Q = 71$. Wie groß ist die Bandbreite $B$ in kHz?',
      answer: 200, tolerance: 2, unit: 'kHz',
      explain: '$B = f_0/Q = 14{,}2\\,\\text{MHz}/71 = 200\\,\\text{kHz}$.',
    },
    {
      id: 'quiz-oberwellen', type: 'quiz', title: 'Oberwellen am Senderausgang',
      question: 'Welches Filter muss zwischen Transceiver und Antennenzuleitung eingefügt werden, um Oberwellen zu reduzieren?',
      options: [
        { text: 'Ein Tiefpassfilter.', correct: true, why: 'Die Oberwellen liegen oberhalb der Sendefrequenz — der Tiefpass lässt die Grundwelle durch und dämpft die höheren Frequenzen.' },
        { text: 'Ein Hochpassfilter.', correct: false, why: 'Ein Hochpass würde gerade die Oberwellen durchlassen und die Grundwelle schwächen.' },
        { text: 'Ein NF-Filter.', correct: false, why: 'NF-Filter arbeiten im Audio-Bereich, nicht am HF-Ausgang.' },
        { text: 'Ein CW-Filter.', correct: false, why: 'Das ist ein schmales Empfangsfilter für Telegrafie.' },
      ],
    },
    {
      id: 'quiz-attenuator', type: 'quiz', title: 'Dämpfungsglied',
      question: 'Ein richtig ausgelegtes Pi-Dämpfungsglied (aus Widerständen) wird in eine 50-Ω-Leitung eingefügt. Was bewirkt es?',
      options: [
        { text: 'Es schwächt das Signal bei allen Frequenzen gleich stark und bewahrt den 50-Ω-Wellenwiderstand.', correct: true, why: 'Es besteht nur aus Widerständen und ist daher frequenzunabhängig; die Widerstandswerte sind so gewählt, dass die Eingangs- und Ausgangsimpedanz 50 Ω bleibt.' },
        { text: 'Es dämpft nur Oberwellen.', correct: false, why: 'Das wäre ein Tiefpass; ein reines Widerstandsnetzwerk hat keine Frequenzabhängigkeit.' },
        { text: 'Es verstärkt das Signal, ohne den Wellenwiderstand zu verändern.', correct: false, why: 'Passive Widerstandsnetzwerke können nicht verstärken.' },
        { text: 'Es transformiert 50 Ω auf einen anderen Wert.', correct: false, why: 'Dafür gibt es Anpassglieder; ein Dämpfungsglied behält den Wellenwiderstand bei.' },
      ],
    },
    {
      id: 'calc-att', type: 'numeric', title: 'Leistung nach dem Dämpfungsglied',
      question: 'Ein Sender mit $10\\,\\text{W}$ speist ein Dämpfungsglied mit $6\\,\\text{dB}$. Welche Leistung kommt am Ausgang an, in W?',
      answer: 2.5, tolerance: 0.1, unit: 'W',
      hint: '6 dB Dämpfung ≙ Leistungsfaktor $10^{-6/10}$.',
      explain: '$P_2 = 10\\,\\text{W}\\cdot10^{-0{,}6} = 10\\,\\text{W}\\cdot0{,}251 = 2{,}51$ W — 6 dB sind rund ein Viertel der Leistung. (Ein 6-dB-Pi-Glied für 50 Ω: 150 Ω – 37,5 Ω – 150 Ω; $K = 10^{6/20} = 2$, $R_\\text{quer} = 50\\cdot3/1$, $R_\\text{längs} = 50\\cdot3/4$.)',
    },
    {
      id: 'match-einsatz', type: 'match', title: 'Filter und Einsatzzweck',
      prompt: 'Welches Filter löst welches Problem?',
      pairs: [
        ['Tiefpass', 'Oberwellen am Senderausgang unterdrücken'],
        ['Hochpass', 'Sender-Störungen (z. B. 28 MHz) vor dem Fernseher-Eingang bremsen'],
        ['Bandpass', 'ein einzelnes Band bzw. eine Zwischenfrequenz auswählen'],
        ['Notchfilter', 'einen einzelnen Störträger im Empfänger herausschneiden'],
        ['Dämpfungsglied', 'Pegel frequenzunabhängig senken, z. B. gegen Übersteuerung'],
      ],
    },
    {
      id: 'warning-filter', type: 'callout', tone: 'warning', title: 'Typische Fehlvorstellungen',
      md: String.raw`
- **„Ein Filter 2. Ordnung ist zwei hintereinandergeschaltete RC-Glieder."** Nur mit Entkopplung (Puffer): Ohne sie belasten sich die Stufen, und die Flanke wird kaum steiler als bei einem einzelnen Glied bei gleicher Grenzfrequenz. Echte Filter werden gemeinsam entworfen.
- **„Bei Resonanz ist der Parallelkreis niederohmig."** Nein: Parallelkreis **hochohmig** (Sperrkreis), Reihenkreis **niederohmig** (Saugkreis).
- **„Ein Dämpfungsglied ist ein Filter."** Nur in dem Sinne, dass es das Signal schwächt — es hat *keine* Frequenzabhängigkeit.`,
    },
    {
      id: 'mission-band', type: 'callout', tone: 'mission', title: 'Prüfung & Funkpraxis',
      md: String.raw`
- **Prüfungsbezug:** Schaltungen als Sperrkreis oder Saugkreis erkennen (ED214, ED215); Notchfilter im Empfänger gegen schmalbandige Störungen (EF215, EF216); Dämpfungsglied gegen Übersteuerung des Empfängereingangs (EF217); Oberwellenfilter am Sender: Tiefpass (EJ203–EJ205, Schaltungsauswahl EJ206–EJ208); Seitenband-Unterdrückung im SSB-Sender durch ein Filter mit rund 2,4 kHz Bandbreite (EF310).
- **Praxis:** Ein starkes Signal in der Nähe überlastet den Empfängereingang: Ein **Dämpfungsglied** (z. B. 10 dB) davor hilft oft mehr als jede Verstärkung. Bei einem Pfeifton im Band nimmt man das **Notchfilter**. Die schmalen **Quarzfilter** ([Quarzfilter](wiki:Quarzfilter|Crystal filter)) im Zwischenfrequenzteil des [Überlagerungsempfängers](wiki:Überlagerungsempfänger|Superheterodyne receiver) sind Bandpässe mit extrem hoher Güte.
- **Faustregel:** Mit jeder Ordnung fällt die Flanke um 20 dB/Dekade (6 dB/Oktave) mehr ab.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: String.raw`
<table><tr><th>Deutsch</th><th>English</th><th>Notation</th></tr>
<tr><td>Filterordnung</td><td>filter order</td><td>$n$</td></tr>
<tr><td>Bandpass</td><td>band-pass filter</td><td>BP</td></tr>
<tr><td>Bandsperre, Kerbfilter</td><td>band-stop filter, notch filter</td><td>BS</td></tr>
<tr><td>Saugkreis</td><td>series trap (shunt resonator)</td><td></td></tr>
<tr><td>Sperrkreis</td><td>parallel trap (wave trap)</td><td></td></tr>
<tr><td>Dämpfungsglied</td><td>attenuator, pad</td><td>T-, Pi-Glied</td></tr>
<tr><td>Oberwellenfilter</td><td>harmonic filter</td><td></td></tr>
<tr><td>Gruppenlaufzeit</td><td>group delay</td><td>$\tau_g$</td></tr></table>`,
    },
    {
      id: 'recall-notch', type: 'recall', title: 'Erkläre es mit eigenen Worten',
      prompt: 'Wozu dient ein **Notchfilter** (Bandsperre) im Empfänger, und warum wäre ein Tiefpass dafür ungeeignet?',
      answer: 'Ein Notchfilter dämpft nur ein sehr schmales Frequenzband stark, z. B. einen Pfeifton oder Störträger im Empfangsband. Das übrige Signal (Sprache, Nachbarfrequenzen) bleibt unverändert. Ein Tiefpass dagegen schneidet alles oberhalb seiner Grenzfrequenz ab und würde dabei auch Nutzsignale unterdrücken.',
      hints: ['Welche Frequenzen sollen weiter durchkommen?', 'Wie breit ist die Störung im Vergleich zum Nutzsignal?'],
      cards: ['notch'],
    },
  ],
  cards: [
    { id: 'ordnung', front: 'Flankensteilheit eines Filters der Ordnung $n$?', back: '$n\\cdot20$ dB/Dekade (≈ $n\\cdot6$ dB/Oktave).' },
    { id: 'tp3', front: 'Tiefpass 3. Ordnung: Dämpfung bei $10f_g$ (idealisiert)?', back: 'Etwa 60 dB (3 × 20 dB).' },
    { id: 'db-add', front: 'Wie verknüpft man die Dämpfung hintereinandergeschalteter Stufen?', back: 'In dB **addieren** (die Faktoren werden multipliziert).' },
    { id: 'butter', front: 'Butterworth-Filter: Merkmal?', back: 'Im Durchlassbereich maximal flach, $|H|^2 = 1/(1+(f/f_g)^{2n})$; guter Kompromiss.' },
    { id: 'bessel', front: 'Bessel-Filter: Merkmal?', back: 'Konstante Gruppenlaufzeit, kaum Überschwingen; dafür flachere Flanke.' },
    { id: 'bp-b', front: 'Bandbreite eines Bandpasses?', back: '$B = f_0/Q$. Beispiel: 14,2 MHz, $Q=71$ → 200 kHz.' },
    { id: 'saug-sperr', front: 'Saugkreis oder Sperrkreis?', back: 'Reihenkreis quer nach Masse = Saugkreis. Parallelkreis in der Leitung = Sperrkreis.' },
    { id: 'notch', front: 'Wozu dient ein Notchfilter im Empfänger?', back: 'Es schneidet eine einzelne schmale Störfrequenz heraus, ohne das übrige Signal zu verändern.' },
    { id: 'oberwellen-tp', front: 'Welches Filter am Senderausgang gegen Oberwellen?', back: 'Ein Tiefpass (EJ203/EJ204).' },
    { id: 'pi-dg', front: 'Was bewirkt ein richtig ausgelegtes Dämpfungsglied (Pi/T)?', back: 'Es dämpft frequenzunabhängig und bewahrt den Wellenwiderstand (z. B. 50 Ω).' },
    { id: 'tp-hp', front: 'Wie bekommt man einen Hochpass 2. Ordnung aus einem Tiefpass 2. Ordnung?', back: 'Durch Vertauschen von R↔C bzw. L↔C (Tiefpass-Teilerpositionen tauschen); die Flanke ist dann bei tiefen Frequenzen 40 dB/Dekade.' },
  ],
};
