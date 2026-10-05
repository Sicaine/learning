export default {
  id: 'rauschen-shannon',
  title: 'Rauschen, SNR, Shannon-Hartley',
  summary: 'Warum jeder Widerstand rauscht (P_R = k·T·B, −174 dBm/Hz bei 290 K), wie man das Signal-Rausch-Verhältnis in dB rechnet und wie Bandbreite und SNR die Datenrate begrenzen (Shannon-Hartley: C = B·log₂(1 + SNR)).',
  minutes: 25,
  needs: ['dezibel', 'fourier-spektrum'],
  goals: [
    'Erklären, dass [[thermisches-rauschen|thermisches Rauschen]] unvermeidlich ist und über der Frequenz gleichmäßig verteilt (weißes Rauschen), und $P_R=k\\,T\\,B$ berechnen',
    'Das [[signal-rausch-verhaeltnis|Signal-Rausch-Verhältnis]] in dB bestimmen und die Rolle der [[rauschzahl|Rauschzahl]] des Empfängers einordnen',
    'Begründen, warum ein schmaler Filter (CW, SSB) schwache Signale besser hörbar macht: Rauschleistung $\\propto B$',
    'Mit [[shannon-hartley|Shannon-Hartley]] $C=B\\log_2(1+\\text{SNR})$ die maximale Datenrate eines Kanals abschätzen',
  ],
  blocks: [
    {
      id: 'intuition', type: 'text', title: 'Das Zischen im Lautsprecher',
      md: String.raw`
Drehst du die Rauschsperre am Empfänger auf, hörst du ein Zischen — auch ohne jedes Signal. Ein Teil davon kommt von außen (Atmosphäre, Sonne, Störer), ein Teil aber entsteht **in jedem Widerstand und jeder Schaltung selbst**: Die Ladungsträger bewegen sich wegen der **Wärme** ständig zufällig hin und her, und das ergibt eine winzige, unvorhersagbare Rauschspannung. 1928 haben [John B. Johnson](wiki:John Bertrand Johnson|John Bertrand Johnson) sie gemessen und [Harry Nyquist](wiki:Harry Nyquist|Harry Nyquist) theoretisch erklärt; man nennt sie [thermisches Rauschen](wiki:Wärmerauschen|Johnson–Nyquist noise) oder Johnson-Nyquist-Rauschen.[^johnson-1928][^nyquist-1928]

Wichtig ist: Es hat über einen weiten Frequenzbereich **dieselbe Leistung je Hertz** — ein *weißes* Rauschen (wie weißes Licht, das alle Farben gleichmäßig enthält). Darum gilt: **Je mehr Bandbreite der Empfänger hat, desto mehr Rauschleistung nimmt er auf.** Das Signal bleibt, das Rauschen wächst. Das ist die Grundregel dieser Lektion.`,
    },
    {
      id: 'ktb', type: 'text', title: 'P = k · T · B',
      md: String.raw`
Die verfügbare Rauschleistung eines Widerstands (oder einer Antenne) bei der absoluten Temperatur $T$ in einer Bandbreite $B$:

$$ P_R = k\,T\,B \qquad k=1{,}380649\cdot10^{-23}\,\tfrac{\text{J}}{\text{K}} $$

mit der [Boltzmann-Konstante](wiki:Boltzmann-Konstante|Boltzmann constant) $k$.

Hier ist $T$ in [Kelvin](wiki:Kelvin|Kelvin) einzusetzen (Raumtemperatur ≈ 290 K ≈ 17 °C, die Referenztemperatur der Rauschmessung). Der Wert von $k$ ist seit 2019 exakt festgelegt.[^nist-boltzmann] Der Faktor $kT$ ist die **Rauschleistungsdichte** (Leistung je Hz) und kommt in der Funktechnik so oft vor, dass man sich ihren Wert merkt:

$$ 10\lg\frac{kT}{1\,\text{mW}}\Big|_{290\,\text{K}} = 10\lg\frac{1{,}38\cdot10^{-23}\cdot290}{10^{-3}} \approx -174\;\text{dBm/Hz} $$

Beispiel **SSB-Kanal** $B=2{,}4$ kHz bei 290 K: $P_R=1{,}38\cdot10^{-23}\cdot290\cdot2400=9{,}6\cdot10^{-18}$ W $=-140{,}2$ dBm. Man erhält dasselbe, wenn man $-174\,\text{dBm}+10\lg(2400)=-174+33{,}8=-140{,}2$ dBm rechnet. **Zehnfache Bandbreite = +10 dB Rauschen**, 100-fache = +20 dB. Der Temperatureinfluss ist dagegen klein: von 290 K auf 580 K sind es nur 3 dB.

**Rauschzahl:** Ein realer Empfänger rauscht zusätzlich selbst. Das gibt man als **Rauschzahl** $F$ (oder *Noise Figure* $NF=10\lg F$ in dB) an: $P_N=F\,k\,T\,B$. Ein Empfänger mit $NF=3$ dB hat doppelt so viel Rauschen am Ausgang wie ein rauschfreier mit gleicher Verstärkung. Auf den Kurzwellenbändern ist das Außenrauschen (Atmosphäre, Industrie) meist größer als das Eigenrauschen des Empfängers, auf VHF/UHF zählt die Rauschzahl.`,
    },
    {
      id: 'calc-pn', type: 'numeric', title: 'Rauschleistung im SSB-Kanal',
      question: String.raw`Wie groß ist die thermische Rauschleistung bei $B=2{,}4\,\text{kHz}$ und $T=290\,\text{K}$ in dBm? ($k=1{,}38\cdot10^{-23}$ J/K)`,
      answer: -140.2, tolerance: 0.2, unit: 'dBm',
      hint: String.raw`$P_R=kTB$ in Watt, dann $10\lg(P_R/1\,\text{mW})$ — oder $-174\,\text{dBm}+10\lg(B/\text{Hz})$.`,
      explain: String.raw`$P_R=1{,}38\cdot10^{-23}\cdot290\cdot2400=9{,}6\cdot10^{-18}$ W $=9{,}6\cdot10^{-15}$ mW → $10\lg(9{,}6\cdot10^{-15})=-140{,}2$ dBm.`,
    },
    {
      id: 'calc-b10', type: 'numeric', title: 'Zehnfache Bandbreite',
      question: String.raw`Die Empfängerbandbreite wird von $2{,}4\,\text{kHz}$ auf $24\,\text{kHz}$ vergrößert (gleiche Temperatur). Um wie viel dB steigt die Rauschleistung?`,
      answer: 10, tolerance: 0.1, unit: 'dB',
      explain: String.raw`$P_R\propto B$: Faktor 10 in der Leistung entspricht $10\lg10=10$ dB.`,
    },
    {
      id: 'snr', type: 'text', title: 'Signal-Rausch-Verhältnis',
      md: String.raw`
Ob ein Signal verständlich ist, hängt nicht von seiner absoluten Stärke ab, sondern davon, wie weit es **über dem Rauschen** liegt — dem [Signal-Rausch-Verhältnis](wiki:Signal-Rausch-Verhältnis|Signal-to-noise ratio) (SNR, S/N):

$$ \text{SNR}=10\lg\frac{P_S}{P_N}\ \text{dB} $$

Mit Pegeln in dBm wird daraus eine einfache Subtraktion: $\text{SNR}=P_S[\text{dBm}]-P_N[\text{dBm}]$. Ein Signal mit $-120$ dBm in einem Kanal mit Rauschen $-140{,}2$ dBm hat also $20{,}2$ dB SNR. Für Sprache in SSB sind etwa 10 dB SNR gut verständlich; Telegrafie ist mit sehr kleinem SNR aus dem Rauschen noch lesbar, weil das Ohr ein schmales Tonsignal herausfiltert.

**Konsequenz für die Praxis:** Um schwache Signale zu hören, kann man (1) das Signal stärken (bessere Antenne, kürzeres Kabel, Vorverstärker nahe der Antenne), (2) das Eigenrauschen senken (rauscharmer Empfängereingang) oder (3) die **Bandbreite verkleinern** — schmales ZF-Filter bzw. CW-Filter, passend zum Signal. Wer ein 500-Hz-Telegrafiesignal mit einem 2,4-kHz-SSB-Filter hört, nimmt $10\lg(2400/500)=6{,}8$ dB zu viel Rauschen auf. Genau deshalb ist CW mit schmalem Filter im Rauschen so gut hörbar.`,
    },
    {
      id: 'calc-snr', type: 'numeric', title: 'SNR aus Pegeln',
      question: String.raw`Ein Signal hat am Empfängereingang $-120\,\text{dBm}$. Die Rauschleistung im SSB-Kanal beträgt $-140{,}2\,\text{dBm}$. Wie groß ist das SNR?`,
      answer: 20.2, tolerance: 0.2, unit: 'dB',
      explain: String.raw`$\text{SNR}=-120-(-140{,}2)=20{,}2$ dB — ein Leistungsverhältnis von etwa 105:1.`,
    },
    {
      id: 'shannon', type: 'text', title: 'Shannon-Hartley: wie schnell darf man senden?',
      md: String.raw`
[Claude Shannon](wiki:Claude Shannon|Claude Shannon) (aufbauend auf Arbeiten von [Ralph Hartley](wiki:Ralph Hartley|Ralph Hartley)) zeigte 1948, dass jeder gestörte Kanal eine **Obergrenze der Datenrate** hat, die man mit guter Codierung beliebig nahe erreichen, aber nie überschreiten kann — das [Shannon-Hartley-Gesetz](wiki:Shannon-Hartley-Gesetz|Shannon–Hartley theorem):

$$ C = B\cdot\log_2\!\Bigl(1+\frac{P_S}{P_N}\Bigr)\quad\text{in bit/s}\qquad(P_S/P_N\ \text{als Faktor, nicht in dB!}) $$

Beispiel: Telefonkanal mit $B=3$ kHz und 30 dB SNR (Faktor 1000): $C=3000\cdot\log_2(1001)=3000\cdot9{,}97=29{,}9$ kbit/s. Das war lange die Grenze der Analogmodems (V.34: 33,6 kbit/s). Die Aussagen:

- **Mehr SNR hilft nur logarithmisch**: +3 dB (doppelte Leistung) bringt höchstens +1 bit/s je Hz; 20 dB mehr bringen etwa 6,6 zusätzliche bit je Hz.
- **Mehr Bandbreite hilft linear**, solange das SNR hoch bleibt — aber mehr $B$ heißt mehr Rauschen ($P_N\propto B$): Bei fester Signalleistung geht $C$ für große $B$ gegen den Grenzwert $P_S/(N_0\ln2)$. Das Demo-Diagramm zeigt diese Sättigung.
- **Man kann Bandbreite gegen SNR tauschen**: Verfahren mit sehr breitem Spektrum (Spreizband) arbeiten mit negativem SNR; sehr schmale Digitalmodi (z. B. FT8) erreichen mit Fehlerkorrektur noch Verbindungen bei SNR unter 0 dB (bezogen auf die Referenzbandbreite) — alles Folgen von Shannon.

Die Demo verbindet Rauschleistung, SNR und Kapazität.[^shannon-1949]`,
    },
    {
      id: 'calc-c', type: 'numeric', title: 'Kanalkapazität',
      question: String.raw`Ein Kanal hat $B=3\,\text{kHz}$ und ein SNR von $30\,\text{dB}$ (Faktor 1000). Wie groß ist die maximale Datenrate nach Shannon-Hartley?`,
      answer: 29.9, tolerance: 0.2, unit: 'kbit/s',
      hint: String.raw`$C=B\log_2(1+\text{SNR})$; $\log_2 x=\lg x/\lg 2$.`,
      explain: String.raw`$C=3000\cdot\log_2(1001)=3000\cdot9{,}967=29\,900$ bit/s $\approx29{,}9$ kbit/s.`,
    },
    {
      id: 'calc-snr10k', type: 'numeric', title: 'SNR für 10 kbit/s',
      question: String.raw`Wie groß muss das SNR in dB mindestens sein, damit in $B=3\,\text{kHz}$ nach Shannon-Hartley $10\,\text{kbit/s}$ möglich sind?`,
      answer: 9.6, tolerance: 0.2, unit: 'dB',
      hint: String.raw`$10\,000/3000=3{,}33=\log_2(1+\text{SNR})$ → $\text{SNR}=2^{3{,}33}-1$.`,
      explain: String.raw`$2^{3{,}333}=10{,}08$, also $\text{SNR}=9{,}08$ (Faktor) und $10\lg9{,}08=9{,}6$ dB.`,
    },
    {
      id: 'demo-noise', type: 'viz', viz: 'noise-lab', title: 'Rauschlabor: Bandbreite, Temperatur und Datenrate',
      intro: String.raw`Oben siehst du ein 1-kHz-Signal (blau) mit dem Rauschen, das zu den eingestellten Werten gehört. Unten die Shannon-Kapazität $C(B)$ bei der gewählten Signalleistung: Sie steigt mit der Bandbreite, **sättigt** aber, weil mit $B$ auch das Rauschen wächst.`,
      params: { goalRate: 10000, maxB: 3000 },
      task: String.raw`Stelle $B=2{,}4$ kHz, $T=290$ K und $F=0$ dB ein und lies die Rauschleistung ab ($-140{,}2$ dBm). Wähle dann Signalleistung und Bandbreite (≤ 3 kHz) so, dass **10 kbit/s** nach Shannon möglich sind.`,
      caption: 'Doppelt logarithmische Achsen: C wächst zuerst linear mit B, dann flacht die Kurve ab, weil das Rauschen mit B mitwächst.',
    },
    {
      id: 'quiz-breit', type: 'quiz', title: 'Warum rauscht ein breiter Empfänger mehr?',
      question: 'Warum rauscht ein Empfänger mit großer Bandbreite stärker als einer mit kleiner?',
      options: [
        { text: 'Die Rauschleistung ist proportional zur Bandbreite ($P_R=kTB$); mehr Bandbreite nimmt mehr Rauschen auf.', correct: true, why: 'Weißes Rauschen hat in jedem Hertz die gleiche Leistung; ein breiter Empfänger addiert mehr Hertz.' },
        { text: 'Weil ein breiter Empfänger wärmer wird.', correct: false, why: 'Die Temperatur geht nur linear in die Rauschleistung ein ($T$ von 290 K auf 580 K = +3 dB); die Bandbreite wirkt 10fach, wenn $B$ zehnmal größer wird.' },
        { text: 'Weil das Signal durch die Bandbreite schwächer wird.', correct: false, why: 'Das Signal bleibt gleich; es ist das Rauschen, das wächst.' },
        { text: 'Weil die Bandbreite die Frequenz des Rauschens erhöht.', correct: false, why: 'Weißes Rauschen hat keine bevorzugte Frequenz; es wird nur mehr davon durchgelassen.' },
      ],
    },
    {
      id: 'match-rausch', type: 'match', title: 'Formel und Bedeutung',
      prompt: 'Was gehört zusammen?',
      pairs: [
        ['$P_R=k\\,T\\,B$', 'thermische Rauschleistung'],
        ['$10\\lg(P_S/P_N)$', 'Signal-Rausch-Verhältnis in dB'],
        ['$C=B\\log_2(1+\\text{SNR})$', 'Shannon-Hartley-Kanalkapazität'],
        ['−174 dBm/Hz', 'Rauschleistungsdichte bei 290 K'],
      ],
    },
    {
      id: 'warning-rausch', type: 'callout', tone: 'warning', title: 'Typische Fehlvorstellungen',
      md: String.raw`
- „**Rauschen kommt nur von schlechten Bauteilen.**“ — Thermisches Rauschen ist **unvermeidlich**, solange $T>0$ K. Gute Schaltungen minimieren nur das *zusätzliche* Rauschen (Rauschzahl).
- „**Ein stärkeres Signal verbessert das SNR immer proportional.**“ — Im dB-Maß schon (+3 dB je Leistungsverdopplung), für die Kapazität nach Shannon aber nur logarithmisch.
- „**Man muss $P_S/P_N$ in dB in die Shannon-Formel einsetzen.**“ — Nein: als **Faktor**. 30 dB heißt 1000, nicht 30!`,
    },
    {
      id: 'deep-shannon', type: 'callout', tone: 'deep', title: 'Das Shannon-Limit und −1,59 dB',
      md: String.raw`
Lässt man $B\to\infty$ gehen, so wird aus $C=B\log_2(1+P_S/(N_0B))$ im Grenzfall $C_\infty=P_S/(N_0\ln2)\approx1{,}44\,P_S/N_0$. Teilt man durch die Datenrate $R$, erhält man die **Energie je Bit** $E_b=P_S/R$: Fehlerfreie Übertragung ist nur möglich, wenn $E_b/N_0\ge\ln2=0{,}693$, in dB: **$-1{,}59$ dB**. Diese Zahl ist die absolute Grenze der Nachrichtentechnik — kein Verfahren kann mit weniger Energie je Bit auskommen, wenn die Bandbreite beliebig groß ist. Moderne Codes (Turbo-, LDPC-Codes) kommen ihr auf weniger als 1 dB nahe.`,
    },
    {
      id: 'mission-rausch', type: 'callout', tone: 'mission', title: 'Prüfung & Funkpraxis',
      md: String.raw`
- **Prüfungsbezug:** Klasse E enthält keine direkte Rechenaufgabe zu $kTB$; die Ideen kehren als Verständnisfragen wieder — Rauschunterdrückung im Empfänger (EF213), Wirkung schmaler Filter auf das Rauschen, Übersteuerung vs. Empfindlichkeit (EF217, EJ107). In Klasse A rechnet man dagegen mit dem thermischen Rauschen des Empfängerausgangs, wenn sich die Filterbandbreite ändert (AB409: engeres Quarzfilter → weniger Rauschen).
- **Praxis:** Bei SSB und CW wählst du das schmalste Filter, in dem das Signal noch sauber ankommt. Das ist der billigste „Gewinn“, den ein Funkamateur kennt: Halbe Bandbreite sind 3 dB, ein 500-Hz-CW-Filter statt 2,4 kHz sind 6,8 dB — mehr als die meisten Antennenverbesserungen. Auf VHF/UHF ist ein rauscharmer Vorverstärker (Rauschzahl) *an der Antenne* sinnvoll, damit das Kabel das Signal nicht unter das Eigenrauschen drückt.
- **Rechentipp:** $-174\,\text{dBm}+10\lg(B/\text{Hz})$ für Rauschen bei 290 K; für Shannon der Faktor $2^{C/B}-1$.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: String.raw`
<table><tr><th>Deutsch</th><th>English</th><th>Notation</th></tr>
<tr><td>Thermisches Rauschen</td><td>thermal noise, Johnson–Nyquist noise</td><td>$P_R=kTB$</td></tr>
<tr><td>Weißes Rauschen</td><td>white noise</td><td></td></tr>
<tr><td>Boltzmann-Konstante</td><td>Boltzmann constant</td><td>$k=1{,}38\cdot10^{-23}$ J/K</td></tr>
<tr><td>Signal-Rausch-Verhältnis</td><td>signal-to-noise ratio (SNR)</td><td>$10\lg(P_S/P_N)$</td></tr>
<tr><td>Rauschzahl / Rauschmaß</td><td>noise factor / noise figure</td><td>$F$, $NF$ in dB</td></tr>
<tr><td>Rauschleistungsdichte</td><td>noise power density</td><td>$N_0=kT$</td></tr>
<tr><td>Kanalkapazität</td><td>channel capacity</td><td>$C$ in bit/s</td></tr>
<tr><td>Bandbreite</td><td>bandwidth</td><td>$B$</td></tr></table>`,
    },
    {
      id: 'recall-schmal', type: 'recall', title: 'Erkläre es mit eigenen Worten',
      prompt: 'Warum sind SSB und CW mit schmalem Filter im Rauschen besser hörbar? Wie viele dB sparst du, wenn du von 2,4 kHz auf 500 Hz Filterbandbreite gehst?',
      answer: 'Das thermische Rauschen ist weiß: Rauschleistung $P_R=kTB$ ist proportional zur Bandbreite. Ein schmaleres Filter lässt dasselbe Signal durch (es passt in die kleinere Bandbreite), nimmt aber weniger Rauschen auf — das SNR steigt. Von 2,4 kHz auf 500 Hz ist das Bandbreitenverhältnis 4,8, also $10\\lg4{,}8=6{,}8$ dB weniger Rauschen.',
      hints: ['Wie hängt die Rauschleistung von $B$ ab?', 'Wie rechnet man ein Leistungsverhältnis in dB?'],
      cards: ['ptb', 'bandbreite-rauschen'],
    },
  ],
  cards: [
    { id: 'ptb', front: 'Thermische Rauschleistung?', back: '$P_R=k\\,T\\,B$ mit $k=1{,}38\\cdot10^{-23}$ J/K, $T$ in Kelvin, $B$ in Hz.' },
    { id: 'bandbreite-rauschen', front: 'Wie ändert sich das Rauschen, wenn die Bandbreite verzehnfacht wird?', back: '$+10$ dB (Leistung ×10). Halbe Bandbreite: $-3$ dB.' },
    { id: 'minus174', front: 'Rauschleistungsdichte bei 290 K?', back: '$-174$ dBm/Hz. Rauschen in $B$: $-174\\,\\text{dBm}+10\\lg(B/\\text{Hz})$. Beispiel 2,4 kHz: $-140{,}2$ dBm.' },
    { id: 'snr-def', front: 'Signal-Rausch-Verhältnis in dB?', back: '$\\text{SNR}=10\\lg(P_S/P_N)$; bei Pegeln in dBm: $P_S-P_N$.' },
    { id: 'rauschzahl', front: 'Was ist die Rauschzahl?', back: 'Maß, um wie viel ein Empfänger zusätzlich rauscht: $P_N=F\\,kTB$; $NF=10\\lg F$ in dB. 3 dB = doppeltes Rauschen.' },
    { id: 'weiss', front: 'Was heißt „weißes Rauschen“?', back: 'Gleiche Rauschleistung je Hz über alle Frequenzen — Gesamtleistung wächst proportional zur Bandbreite.' },
    { id: 'shannon-f', front: 'Shannon-Hartley-Gesetz?', back: '$C=B\\log_2(1+P_S/P_N)$ in bit/s; $P_S/P_N$ als Faktor (nicht in dB).' },
    { id: 'shannon-bsp', front: 'Shannon: 3 kHz, 30 dB SNR → ?', back: '$C=3000\\cdot\\log_2(1001)\\approx29{,}9$ kbit/s.' },
    { id: 'shannon-bw', front: 'Bandbreite oder SNR — was bringt mehr Datenrate?', back: 'Bandbreite wirkt linear, SNR nur logarithmisch; aber mehr Bandbreite = mehr Rauschen, deshalb sättigt $C(B)$.' },
    { id: 'cw-schmal', front: 'Warum CW/SSB mit schmalem Filter?', back: 'Schmale Bandbreite = weniger Rauschleistung bei gleichem Signal: 500 Hz statt 2,4 kHz sind 6,8 dB.' },
    { id: 'limit', front: 'Shannon-Limit der Energie je Bit?', back: '$E_b/N_0\\ge\\ln2$, d. h. $-1{,}59$ dB, für beliebig große Bandbreite.' },
  ],
};
