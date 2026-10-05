export default {
  id: 'wechselstromleistung',
  title: 'Wirk-, Blind- und Scheinleistung',
  summary: 'Warum bei Wechselstrom $P = U\\cdot I\\cdot\\cos\\varphi$ gilt, was Blindleistung ist, wie das Leistungsdreieck funktioniert — und warum man Motoren kompensiert.',
  minutes: 30,
  needs: ['zeiger-impedanz', 'leistung-und-energie'],
  goals: [
    '[[wirkleistung|Wirkleistung]] $P$, [[blindleistung|Blindleistung]] $Q$ und [[scheinleistung|Scheinleistung]] $S$ unterscheiden und mit $P=UI\\cos\\varphi$, $Q=UI\\sin\\varphi$, $S=UI$ berechnen',
    'Den [[leistungsfaktor|Leistungsfaktor]] $\\cos\\varphi$ deuten und das Leistungsdreieck zeichnen',
    'Verstehen, warum Blindleistung ohne Verbrauch Leitungen belastet, und eine einfache [[blindleistungskompensation|Kompensation]] mit einem Kondensator berechnen',
    'Spitzenleistung (PEP) und mittlere Leistung eines Senders unterscheiden',
  ],
  blocks: [
    {
      id: 'intuition', type: 'text', title: 'Die Bierschaum-Analogie',
      md: String.raw`
Ein Bier im Glas besteht aus Flüssigkeit (die du trinken willst) und Schaum (der das Glas füllt, aber nicht satt macht). Beim Wechselstrom ist es ähnlich: Bei einer Last mit Blindwiderstand — [Elektromotor](wiki:Elektromotor|Electric motor), [Transformator](wiki:Transformator|Transformer), Drossel — fließt ein Strom, der **teilweise gegen die Spannung phasenverschoben** ist. Der Anteil, der in Phase ist, leistet Arbeit (Wärme, Bewegung). Der Rest pendelt nur: Das Magnetfeld im Motor wird auf- und abgebaut, Energie fließt zur Quelle zurück und wieder hin. Die Leitung muss den **ganzen** Strom tragen, auch den „Schaum".

Genau dafür gibt es drei Leistungen:

- **Wirkleistung** $P$ in **Watt** (W): wird tatsächlich umgesetzt (in Wärme, Licht, Bewegung, Funkwellen).
- **Blindleistung** $Q$ in **var** (volt-ampere reactive): pendelt zwischen Quelle und Blindelement; die mittlere Leistung ist null.
- **Scheinleistung** ([Scheinleistung](wiki:Scheinleistung|Apparent power)) $S$ in **VA** ([Voltampere](wiki:Voltampere|Volt-ampere)): das Produkt $U\cdot I$ — das, was Leitung, Sicherung und [Generator](wiki:Elektrischer Generator|Electric generator) auslegen müssen.[^wp-wechselstromleistung]`,
    },
    {
      id: 'formeln', type: 'text', title: 'Das Leistungsdreieck',
      md: String.raw`
Aus dem Zeigerdiagramm (Strom in Phase mit $U$ + Strom um 90° gegen $U$) wird mit Effektivwerten:

$$ S = U\cdot I \qquad P = U\cdot I\cdot\cos\varphi \qquad Q = U\cdot I\cdot\sin\varphi $$

$P$ und $Q$ stehen senkrecht aufeinander — $S$ ist die Hypotenuse: $S = \sqrt{P^2+Q^2}$. Das Verhältnis $\cos\varphi = P/S$ heißt [[leistungsfaktor|Leistungsfaktor]] ([Leistungsfaktor](wiki:Leistungsfaktor|Power factor)): der Anteil des Stroms, der wirklich Arbeit leistet. Für reine Wirkwiderstände ist $\varphi=0$, $\cos\varphi=1$, $P=S$. Für reine Blindwiderstände ist $\varphi=\pm90^\circ$, $\cos\varphi=0$, $P=0$.

Warum der Faktor $\cos\varphi$? Die Augenblicksleistung $p(t)=u(t)\cdot i(t)$ ist das Produkt zweier Sinusse; ihr Mittelwert hängt vom Phasenwinkel ab. Beim Wirkwiderstand ist $p$ immer positiv (Quelle liefert), beim Blindwiderstand wechselt $p$ das Vorzeichen: Energie wird im [Feld](wiki:Elektromagnetisches Feld|Electromagnetic field) gespeichert und zurückgegeben — im Mittel null. Die Leistungsformeln gelten also nur dann einfach mit $U\cdot I$, wenn $\varphi=0$ ist, und wieder mit Effektivwerten.`,
    },
    {
      id: 'calc-s', type: 'numeric', title: 'Scheinleistung',
      question: String.raw`Ein Gerät nimmt an $230\,\text{V}$ einen Strom von $2\,\text{A}$ auf, $\cos\varphi=0{,}8$. Wie groß ist die Scheinleistung $S$, in VA?`,
      answer: 460, tolerance: 1, unit: 'VA',
      explain: String.raw`$S = U\cdot I = 230\,\text{V}\cdot2\,\text{A} = 460\,\text{VA}$ — unabhängig vom $\cos\varphi$.`,
    },
    {
      id: 'calc-p', type: 'numeric', title: 'Wirkleistung',
      question: String.raw`Dasselbe Gerät ($230\,\text{V}$, $2\,\text{A}$, $\cos\varphi=0{,}8$): Wie groß ist die Wirkleistung $P$, in W?`,
      answer: 368, tolerance: 1, unit: 'W',
      explain: String.raw`$P = S\cos\varphi = 460\,\text{VA}\cdot0{,}8 = 368\,\text{W}$.`,
    },
    {
      id: 'calc-q', type: 'numeric', title: 'Blindleistung',
      question: String.raw`Wie groß ist die Blindleistung $Q$ dieses Geräts, in var?`,
      answer: 276, tolerance: 1, unit: 'var',
      hint: String.raw`Bei $\cos\varphi=0{,}8$ ist $\sin\varphi=0{,}6$ (3-4-5-Dreieck).`,
      explain: String.raw`$Q = S\sin\varphi = 460\cdot0{,}6 = 276\,\text{var}$. Kontrolle: $\sqrt{368^2+276^2}=460$ ✓.`,
    },
    {
      id: 'viz-triangle', type: 'viz', viz: 'power-triangle', title: 'Leistungsdreieck',
      intro: String.raw`Stelle Spannung $U$, Strom $I$ und Phasenwinkel $\varphi$ ein ($+$ induktiv, $-$ kapazitiv): Das Dreieck mit $P$ (waagerecht), $Q$ (senkrecht) und $S$ (Hypotenuse) ändert sich mit. Beobachte: Bei gleichem $S$ schrumpft $P$, wenn $|\varphi|$ wächst — die Last wird „blinder".`,
      params: { mode: 'triangle', U: 230, I: 2, phi: 37 },
      task: String.raw`Erreiche **drei Zustände**: (1) $P=S$ ($\varphi=0^\circ$, reine Wirklast); (2) $P\approx0$ ($|\varphi|\approx90^\circ$, reine Blindlast); (3) eine **kapazitive** Last ($\varphi<-30^\circ$).`,
    },
    {
      id: 'komp', type: 'text', title: 'Blindleistungskompensation',
      md: String.raw`
Ein Motor mit $\cos\varphi=0{,}7$ braucht für 1 kW Wirkleistung an 230 V einen Strom von $I = P/(U\cos\varphi) = 6{,}2$ A, bei $\cos\varphi=1$ wären es nur $4{,}3$ A. Der zusätzliche Strom erhitzt Zuleitungen und belastet Generatoren, **ohne** nutzbare Arbeit zu leisten — Industriebetriebe zahlen deshalb für Blindleistung extra. Abhilfe: [[blindleistungskompensation|Kompensation]] ([Blindleistungskompensation](wiki:Blindleistungskompensation|Power factor correction)) — ein Kondensator **parallel** zum Motor liefert Blindleistung mit entgegengesetztem Vorzeichen (Kondensator: kapazitiv, Motor: induktiv), die dann nicht mehr aus dem Netz kommen muss.

Rechenweg für Wirkleistung $P$ und Netzspannung $U$ von $\cos\varphi_1$ auf $\cos\varphi_2$:

$$ Q_C = P\,(\tan\varphi_1-\tan\varphi_2) \qquad\qquad C = \frac{Q_C}{2\pi f\,U^2} $$

Beispiel: $P = 1\,\text{kW}$, $\cos\varphi_1=0{,}7$ ($\tan\varphi_1=1{,}020$), Ziel $\cos\varphi_2=0{,}95$ ($\tan\varphi_2=0{,}329$): $Q_C = 1000\cdot0{,}692 = 692$ var, $C = 692/(314{,}2\cdot230^2) = 41{,}6\,\mu$F. Der Leitungsstrom sinkt von 6,21 A auf 4,58 A.`,
    },
    {
      id: 'calc-c', type: 'numeric', title: 'Kompensationskondensator',
      question: String.raw`Ein Motor nimmt $P = 1\,\text{kW}$ bei $\cos\varphi_1=0{,}7$ an $230\,\text{V}/50\,\text{Hz}$ auf. Welche Kapazität kompensiert ihn auf $\cos\varphi_2=0{,}95$, in µF?`,
      answer: 41.6, tolerance: 0.6, unit: 'µF',
      hint: String.raw`$Q_C=P(\tan\varphi_1-\tan\varphi_2)$ mit $\tan\varphi_1=1{,}020$, $\tan\varphi_2=0{,}329$; dann $C=Q_C/(\omega U^2)$.`,
      explain: String.raw`$Q_C = 1000\,\text{W}\cdot(1{,}0202-0{,}3287)=691{,}5\,\text{var}$. $C=691{,}5/(2\pi\cdot50\cdot230^2)=41{,}6\,\mu\text{F}$.`,
    },
    {
      id: 'viz-comp', type: 'viz', viz: 'power-triangle', title: 'Kompensieren',
      intro: String.raw`Ein induktiver Verbraucher (z. B. Motor) mit festem $P$ und $\cos\varphi$ vorher. Mit dem Parallelkondensator $C_k$ ziehst du die Blindleistung in der Zeichnung zurück — und siehst, wie der Leitungsstrom sinkt. Zu viel $C_k$ kompensiert **über**: Die Last wird kapazitiv.`,
      params: { mode: 'comp', U: 230, f: 50, P: 1000, cos: 0.7 },
      task: String.raw`Hebe $\cos\varphi$ von $0{,}7$ auf mindestens $0{,}95$ (noch induktiv), drücke den Leitungsstrom unter $5\,\text{A}$ — und probiere dann bewusst eine **Überkompensation**.`,
      caption: 'Preset „C_k = 41,6 µF" setzt genau den berechneten Wert.',
    },
    {
      id: 'quiz-pgleichs', type: 'quiz', title: 'Wann ist P = S?',
      question: 'Wann sind Wirkleistung und Scheinleistung gleich groß?',
      options: [
        { text: 'Bei einer rein ohmschen Last ($\\varphi=0$, $\\cos\\varphi=1$).', correct: true, why: 'Dann ist $P = UI\\cos0 = UI = S$ — Strom und Spannung sind in Phase.' },
        { text: 'Bei einer rein induktiven Last.', correct: false, why: 'Dann ist $\\cos\\varphi=0$ und $P=0$: nur Blindleistung.' },
        { text: 'Bei einem Kondensator an Wechselspannung.', correct: false, why: 'Auch dort ist $\\varphi=-90^\\circ$ und $P=0$.' },
        { text: 'Nur bei Gleichspannung mit $f=0$.', correct: false, why: 'Bei Gleichspannung gilt $P=UI$ ebenfalls — aber das ist ein Sonderfall; die Frage zielt auf Wechselspannung mit Phasenwinkel.' },
      ],
    },
    {
      id: 'quiz-eff', type: 'quiz', title: 'Warum mit Effektivwerten?',
      question: 'Warum rechnet man in Leistungsformeln bei Wechselspannung mit Effektivwerten?',
      options: [
        { text: 'Mit Effektivwerten liefert $P=U\\cdot I$ (am Wirkwiderstand) direkt die mittlere umgesetzte Leistung — wie bei Gleichspannung.', correct: true, why: 'Der Effektivwert ist genau über die gleiche Wärmewirkung definiert.' },
        { text: 'Weil Spitzenwerte nicht messbar sind.', correct: false, why: 'Spitzenwerte sind am Oszilloskop gut messbar; sie liefern aber die Spitzenleistung, nicht die mittlere.' },
        { text: 'Weil der Effektivwert immer größer ist.', correct: false, why: 'Er ist beim Sinus kleiner als der Spitzenwert (Faktor $1/\\sqrt2$).' },
        { text: 'Weil Wechselstrom keine Leistung überträgt.', correct: false, why: 'Natürlich überträgt er Leistung — im Mittel $P=UI\\cos\\varphi$.' },
      ],
    },
    {
      id: 'pep', type: 'text', title: 'Ausblick Funk: Spitzenleistung und mittlere Leistung',
      md: String.raw`
Beim Funk interessiert dich die Leistung eines Senders. Zwei Begriffe, die in der Prüfung auftauchen:

- **Spitzenleistung (PEP)**, [Peak Envelope Power](wiki:Peak Envelope Power|Peak envelope power): die Leistung, die der Sender bei der **höchsten Spitze der Modulationshüllkurve** — gemittelt über eine HF-Periode — an einen reellen Abschlusswiderstand abgibt (EB501).
- **Mittlere Leistung**: die durchschnittliche Leistung über ein Zeitintervall, das lang gegen die Periode der tiefsten Modulationsfrequenz ist (EB502).

Bei einem unmodulierten Träger sind beide gleich. Bei [Einseitenband](wiki:Einseitenbandmodulation|Single-sideband modulation) (SSB)-Sprache schwankt die Hüllkurve stark — die mittlere Leistung ist deutlich kleiner als die PEP. Dort ist der Abstand zwischen Spitzen- und Mittelwert groß (hoher Scheitelfaktor, vgl. die Lektion zu Signalformen). Die zulässige Höchstleistung im Amateurfunk wird als PEP angegeben.[^bnetza-pruefungsfragen-2024]`,
    },
    {
      id: 'warning-schein', type: 'callout', tone: 'warning', title: 'Vorsicht: Blindleistung ist nicht „verbraucht"',
      md: String.raw`
Blindleistung wird nicht in Wärme umgesetzt — sie *pendelt* — aber sie belastet die Leitung: $I=S/U$ fließt komplett durch Kabel und Sicherung. Das Gegenstück zu „Blindwiderstand verbraucht nichts": Eine Leitung mit viel Blindleistung erwärmt sich trotzdem durch $I^2R_\text{Leitung}$. Die Einheiten sind deshalb getrennt: W für Wirkleistung, **var** für Blindleistung, **VA** für Scheinleistung — verwechsle sie nicht. Und: Zwei Leistungen mit verschiedenen Phasen addieren sich nicht arithmetisch — $S=\sqrt{P^2+Q^2}$.`,
    },
    {
      id: 'mission', type: 'callout', tone: 'mission', title: 'Prüfung & Funkpraxis',
      md: String.raw`
- **Prüfungsbezug:** EB501 (PEP), EB502 (mittlere Leistung), EB503 (Formeln mit Effektivwerten), EB507/EB508 (Leistung an der künstlichen 50-Ω-Antenne aus Effektivwerten: 100 V an 50 Ω → 200 W). Blind- und Scheinleistung selbst gehören nicht zum Klasse-E-Katalog; sie sind Grundlage für ein echtes Verständnis von Antennenanpassung und Netzteilen.
- **Praxis:** Ein Funkgerät-Netzteil mit induktiver Last belastet die Hausleitung mit der Scheinleistung, auch wenn der Zähler nur die Wirkleistung zählt. Eine schlecht angepasste Antenne reflektiert Blindleistung zurück zum Senderausgang — die **Endstufe** sieht sie als zusätzliche Belastung (später: SWR).
- **Faustregel:** Glühlampen und Heizungen sind reine Wirklasten ($\cos\varphi=1$); Motoren, Transformatoren und Drosseln haben $\cos\varphi<1$.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: String.raw`
<table><tr><th>Deutsch</th><th>English</th><th>Notation</th></tr>
<tr><td>Wirkleistung</td><td>active (real) power</td><td>$P$ in W</td></tr>
<tr><td>Blindleistung</td><td>reactive power</td><td>$Q$ in var</td></tr>
<tr><td>Scheinleistung</td><td>apparent power</td><td>$S$ in VA</td></tr>
<tr><td>Leistungsfaktor</td><td>power factor</td><td>$\cos\varphi=P/S$</td></tr>
<tr><td>Leistungsdreieck</td><td>power triangle</td><td></td></tr>
<tr><td>Blindleistungskompensation</td><td>power factor correction</td><td></td></tr>
<tr><td>Spitzenleistung (PEP)</td><td>peak envelope power</td><td></td></tr>
<tr><td>mittlere Leistung</td><td>average power</td><td></td></tr></table>`,
    },
    {
      id: 'recall-pendeln', type: 'recall', title: 'Erkläre es mit eigenen Worten',
      prompt: 'Was pendelt bei Blindleistung zwischen Quelle und Verbraucher, und warum belastet sie trotzdem die Leitung?',
      answer: 'Bei Blindleistung pendelt Energie: Das Blindelement (Spule: Magnetfeld, Kondensator: elektrisches Feld) nimmt sie in einer Viertelperiode auf und gibt sie in der nächsten zurück. Im Mittel wird keine Energie verbraucht ($P=0$). Der dazugehörige Strom fließt aber trotzdem durch die Leitung und erzeugt dort $I^2R$-Verluste; Kabel, Sicherungen und Generator müssen für die Scheinleistung $S=UI$ ausgelegt sein.',
      hints: ['In welcher Form wird die Energie zwischengespeichert?', 'Wovon hängt die Verlustleistung in der Leitung ab: von $P$ oder von $I$?'],
      cards: ['blind-def', 'komp-prinzip'],
    },
  ],
  cards: [
    { id: 'p-formel', front: 'Wirkleistung bei Wechselstrom?', back: '$P = U\\cdot I\\cdot\\cos\\varphi$ in W (Effektivwerte).' },
    { id: 'q-formel', front: 'Blindleistung?', back: '$Q = U\\cdot I\\cdot\\sin\\varphi$ in var.' },
    { id: 's-formel', front: 'Scheinleistung?', back: '$S = U\\cdot I = \\sqrt{P^2+Q^2}$ in VA.' },
    { id: 'cosphi', front: 'Leistungsfaktor $\\cos\\varphi$?', back: '$\\cos\\varphi = P/S$; 1 bei Wirklast, 0 bei reiner Blindlast.' },
    { id: 'blind-def', front: 'Was ist Blindleistung physikalisch?', back: 'Energie, die zwischen Quelle und Feld (L oder C) hin- und herpendelt; im Mittel keine Wirkung.' },
    { id: 'einheiten-pqs', front: 'Einheiten von $P$, $Q$, $S$?', back: '$P$: W (Watt), $Q$: var, $S$: VA (Voltampere).' },
    { id: 'komp-prinzip', front: 'Prinzip der Blindleistungskompensation?', back: 'Kondensator parallel zur induktiven Last: seine kapazitive Blindleistung hebt die induktive auf.' },
    { id: 'komp-formel', front: 'Kompensationskondensator berechnen?', back: '$Q_C=P(\\tan\\varphi_1-\\tan\\varphi_2)$, $C=Q_C/(2\\pi f U^2)$.' },
    { id: 'pep', front: 'Spitzenleistung (PEP) eines Senders?', back: 'Leistung an reellem Abschluss bei der höchsten Spitze der Modulationshüllkurve (über eine HF-Periode gemittelt).' },
    { id: 'p-mittel', front: 'Mittlere Leistung eines Senders?', back: 'Durchschnittsleistung über ein Intervall, das lang gegen die Periode der tiefsten Modulationsfrequenz ist.' },
    { id: 'p-eq-s', front: 'Wann ist $P=S$?', back: 'Bei reiner Wirklast: $\\varphi=0$, $\\cos\\varphi=1$.' },
  ],
};
