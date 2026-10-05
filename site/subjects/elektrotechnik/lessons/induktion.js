export default {
  id: 'induktion',
  title: 'Induktionsgesetz und Lenzsche Regel',
  summary: 'Ändert sich der magnetische Fluss durch eine Spule, entsteht in ihr eine Spannung — und die wirkt immer so, dass sie der Änderung entgegenarbeitet. Das ist das Prinzip von Generator, Transformator und Drossel.',
  minutes: 30,
  goals: [
    'Das [[induktionsgesetz|Induktionsgesetz]] $u_i = -N\\cdot\\mathrm{d}\\Phi/\\mathrm{d}t$ erklären und Spannungen aus Flussänderungen berechnen',
    'Die [[lenzsche-regel|Lenzsche Regel]] anwenden: Der Induktionsstrom wirkt seiner Ursache entgegen',
    'Erklären, warum die Polung beim Annähern und Entfernen eines Magneten umkehrt und warum Gleichstrom nichts induziert',
    'Das Prinzip des [[generator|Generators]] und die Entstehung von [[wirbelstrom|Wirbelströmen]] (Blechung, Ferrit) beschreiben',
  ],
  needs: ['magnetfeld'],
  blocks: [
    {
      id: 'video-lenz', type: 'video', youtube: 'FOZ6wAaBVrs', label: 'Die Lenzsche Regel', channel: 'M.M. - Physik mit c', minutes: 11,
      why: 'Anschauliche Experimente zur Lenzschen Regel — hilfreich, wenn du nach dem Text und der Demo noch Zweifel an der Richtung der Induktionsspannung hast.',
    },
    {
      id: 'idee', type: 'text', title: 'Der Umkehrschluss zu Ørsted',
      md: `
Ørsted zeigte 1820: Strom erzeugt ein Magnetfeld. Elf Jahre später stellte sich [Michael Faraday](wiki:Michael Faraday|Michael Faraday) die Umkehrfrage: Kann ein Magnetfeld Strom erzeugen? Er fand heraus: **Ja, aber nur, wenn sich das Magnetfeld ändert.** Schiebt man einen Stabmagneten in eine Spule hinein, zeigt ein Voltmeter während der Bewegung einen Ausschlag — liegt der Magnet still in der Spule, bleibt das Voltmeter bei null, so stark der Magnet auch ist. Das ist die [elektromagnetische Induktion](wiki:Elektromagnetische Induktion|Electromagnetic induction).[^wp-induktion]

Entscheidend ist der **magnetische Fluss** $\\Phi = B\\cdot A$ (Flussdichte mal Fläche, Einheit Weber, $1\\,\\mathrm{Wb} = 1\\,\\mathrm{V\\,s}$) durch die Spule. Er ändert sich, wenn
- der Magnet bewegt wird (näher/ferner),
- die Spule bewegt oder gedreht wird (Fläche/Winkel ändert sich),
- oder das Feld selbst sich ändert, etwa weil der Strom in einer zweiten Spule schwankt (das ist der Transformator).`,
    },
    {
      id: 'gesetz', type: 'text', title: 'Induktionsgesetz und Lenzsche Regel',
      md: `
Quantitativ gilt: Die induzierte Spannung ist proportional zur **Änderungsgeschwindigkeit** des Flusses und zur Windungszahl $N$:

$$u_i = -N\\cdot\\frac{\\mathrm{d}\\Phi}{\\mathrm{d}t}$$

Bei konstanter Änderung genügt $|u_i| = N\\cdot\\Delta\\Phi/\\Delta t$. Beispiel: $N = 200$ Windungen, der Fluss steigt in $10\\,\\mathrm{ms}$ von 0 auf $0{,}5\\,\\mathrm{mWb}$: $|u| = 200\\cdot 0{,}5\\cdot 10^{-3}/0{,}01 = 10\\,\\mathrm{V}$. Verdoppelt man die Windungszahl *und* halbiert die Zeit (doppelte Geschwindigkeit), steigt die Spannung auf das Vierfache.

Das **Minuszeichen** steckt in der **[Lenzschen Regel](wiki:Lenzsche Regel|Lenz's law)** (nach [Emil Lenz](wiki:Emil Lenz|Emil Lenz)): Die induzierte Spannung treibt einen Strom, dessen Magnetfeld **der Ursache entgegenwirkt**, also der Flussänderung. Nähert man den Nordpol der Spule, baut der Induktionsstrom ein Feld auf, das den Magneten *abstößt* — man muss Arbeit leisten, und genau diese Arbeit steckt in der erzeugten elektrischen Energie. Entfernst du den Magnet, zieht die Spule ihn zurück. Das ist die Energieerhaltung in Aktion: Gäbe es das Minus nicht, könnte man sich den Magneten selbst beschleunigen lassen und Energie aus dem Nichts gewinnen.

Daraus folgt auch: **Beim Annähern und Entfernen kehrt sich die Polung um** (der Fluss wächst, dann fällt er), und in der Demo siehst du zwei Pulse mit entgegengesetztem Vorzeichen. Bei der **Selbstinduktion** wirkt dieselbe Regel auf die *eigene* Spule: Ändert sich der Strom in ihr, ändert sich ihr Fluss, und es entsteht eine Spannung, die der Stromänderung entgegenwirkt — mehr dazu in der Lektion über die Spule.`,
    },
    {
      id: 'anwendungen', type: 'text', title: 'Generator und Wirbelstrom',
      md: `
**[Generator](wiki:Elektrischer Generator|Electric generator):** Dreht man eine Spule in einem Magnetfeld, ändert sich ihr Fluss ständig (Winkel zwischen Fläche und Feld). Die Induktionsspannung ist sinusförmig, $u(t) = \\hat u\\cdot\\sin\\omega t$ mit $\\hat u = N\\,B\\,A\\,\\omega$. Die Kette im Kraftwerk: Dampf oder Wasser dreht die Welle → die Spule bewegt sich im Feld → der Fluss ändert sich → es entsteht eine Induktionsspannung → bei angeschlossener Last fließt ein Strom → dieser Strom erzeugt nach Lenz eine Gegenkraft, die den Antrieb bremst. Je mehr elektrische Leistung entnommen wird, desto schwerer lässt sich die Welle drehen.

**Bewegter Leiter:** Schiebt man einen geraden Leiter der Länge $l$ mit der Geschwindigkeit $v$ senkrecht durch ein Feld $B$, gilt $u = B\\cdot l\\cdot v$. Mit $B = 0{,}5\\,\\mathrm{T}$, $l = 0{,}2\\,\\mathrm{m}$ und $v = 2\\,\\mathrm{m/s}$ sind das $0{,}2\\,\\mathrm{V}$.

**Wirbelströme:** Auch in massivem Metall, das sich in einem Wechselfeld befindet (oder bewegt wird), entstehen Induktionsspannungen — und weil das Metall ein guter Leiter ist, fließen große Kreisströme, die [Wirbelströme](wiki:Wirbelstrom|Eddy current). Nach Lenz bremsen sie die Bewegung ([Wirbelstrombremse](wiki:Wirbelstrombremse|Eddy current brake)) und erwärmen das Metall, was beim [Induktionsherd](wiki:Induktionskochfeld|Induction cooking) erwünscht ist. In Transformatoren und Spulenkernen sind Wirbelströme dagegen Verlust: Man unterteilt den Kern in dünne, gegeneinander isolierte Bleche ([Elektroblech](wiki:Elektroblech|Electrical steel)) oder verwendet bei hohen Frequenzen Ferrit.`,
    },
    {
      id: 'viz-induction', type: 'viz', viz: 'induction-lab', title: 'Magnet durch die Spule',
      task: 'Erzeuge eine **Spitzenspannung über 5 V**: Du kannst $N$, die Geschwindigkeit und die Magnetstärke verändern. Dreh dann den **Magneten um** (N-Pol rechts / links) und lass ihn jeweils durchfahren, um beide Polungen zu sehen. Beobachte den Bremspfeil (Lenz): Er zeigt immer entgegen der Bewegung.',
    },
    {
      id: 'num-induktion', type: 'numeric', title: 'Induktionsspannung',
      question: 'Eine Spule mit $N = 200$ Windungen wird von einem Fluss durchsetzt, der in $10\\,\\mathrm{ms}$ gleichmäßig von 0 auf $0{,}5\\,\\mathrm{mWb}$ steigt. Wie groß ist die induzierte Spannung (Betrag)?',
      answer: 10, tolerance: 0.1, unit: 'V',
      hint: '$|u| = N\\cdot\\Delta\\Phi/\\Delta t$; $0{,}5\\,\\mathrm{mWb} = 5\\cdot10^{-4}\\,\\mathrm{Wb}$.',
      explain: '$|u| = 200\\cdot 5\\cdot 10^{-4}\\,\\mathrm{Wb}/0{,}01\\,\\mathrm{s} = 10\\,\\mathrm{V}$.',
    },
    {
      id: 'num-faktor', type: 'numeric', title: 'N verdoppeln, Zeit halbieren',
      question: 'Man verdoppelt die Windungszahl und halbiert die Zeit, in der sich derselbe Fluss ändert. Um welchen Faktor ändert sich die Induktionsspannung?',
      answer: 4, tolerance: 0.01, unit: '×',
      explain: '$u \\propto N/\\Delta t$: $2\\cdot 2 = 4$.',
    },
    {
      id: 'num-leiter', type: 'numeric', title: 'Bewegter Leiter',
      question: 'Ein Leiter von $0{,}2\\,\\mathrm{m}$ Länge wird mit $2\\,\\mathrm{m/s}$ senkrecht durch ein homogenes Feld von $0{,}5\\,\\mathrm{T}$ bewegt. Welche Spannung wird induziert?',
      answer: 0.2, tolerance: 0.002, unit: 'V',
      explain: '$u = B\\cdot l\\cdot v = 0{,}5\\cdot 0{,}2\\cdot 2 = 0{,}2\\,\\mathrm{V}$.',
    },
    {
      id: 'quiz-lenz', type: 'quiz', title: 'Lenzsche Regel',
      question: 'Was sagt die Lenzsche Regel über den Induktionsstrom?',
      options: [
        { text: 'Der Induktionsstrom wirkt seiner Ursache (der Flussänderung) entgegen.', correct: true, why: 'Das ist Energieerhaltung: Die Gegenkraft erfordert Arbeit, die als elektrische Energie wiederkommt.' },
        { text: 'Der Induktionsstrom verstärkt die Flussänderung.', correct: false, why: 'Dann könnte sich ein System selbst aufschaukeln und Energie aus dem Nichts erzeugen.' },
        { text: 'Der Induktionsstrom hat immer dieselbe Richtung.', correct: false, why: 'Er kehrt sich um, wenn die Flussänderung ihr Vorzeichen wechselt.' },
        { text: 'Induktion tritt nur bei Gleichstrom auf.', correct: false, why: 'Bei konstantem Strom ändert sich der Fluss nicht, es wird nichts induziert.' },
      ],
    },
    {
      id: 'quiz-wirbel', type: 'quiz', title: 'Erwärmter Eisenkern',
      question: 'Warum erwärmt sich ein massiver Eisenkern in einem Wechselfeld, und was hilft dagegen?',
      options: [
        { text: 'Im Kern werden Wirbelströme induziert; man unterteilt ihn in isolierte Bleche oder nimmt Ferrit.', correct: true, why: 'Dünne, gegeneinander isolierte Bleche unterbrechen die Strombahnen; Ferrit leitet kaum.' },
        { text: 'Weil Eisen in Wechselfeldern verdampft; man nimmt Kupfer.', correct: false, why: 'Kupfer wäre noch leitfähiger, die Wirbelströme noch größer.' },
        { text: 'Weil das Feld den Kern entmagnetisiert; man erhöht die Spannung.', correct: false, why: 'Höhere Spannung verstärkt das Problem eher.' },
        { text: 'Das passiert nur bei Gleichstrom.', correct: false, why: 'Bei Gleichstrom ändert sich das Feld nicht, es entstehen keine Wirbelströme.' },
      ],
    },
    {
      id: 'order-generator', type: 'order', title: 'Kette im Generator',
      prompt: 'Ordne die Vorgänge im Generator in ihrer ursächlichen Reihenfolge.',
      items: [
        'Die Welle wird angetrieben und dreht die Spule im Magnetfeld',
        'Der magnetische Fluss durch die Spule ändert sich laufend',
        'In der Spule wird eine Spannung induziert',
        'Bei angeschlossener Last fließt ein Strom',
        'Der Strom erzeugt nach Lenz eine Gegenkraft, die den Antrieb bremst',
      ],
      explain: 'Die elektrische Energie stammt aus der Antriebsarbeit; die Bremswirkung der Lenzschen Regel ist ihr „Preis".',
    },
    {
      id: 'recall-vorzeichen', type: 'recall', title: 'Welche Polung?',
      prompt: 'Wer sagt dir, ob die induzierte Spannung „+" oder „−" ist? Erkläre am Beispiel eines Magneten, der in eine Spule hineingeschoben und wieder herausgezogen wird.',
      answer: `Die Lenzsche Regel bestimmt das Vorzeichen: Der Induktionsstrom erzeugt ein Magnetfeld, das der Flussänderung entgegenwirkt. Beim *Hineinschieben* des Nordpols wächst der Fluss; der Strom baut ein Feld auf, das den Nordpol abstößt (Spule zeigt ihm ihren Nordpol). Beim *Herausziehen* nimmt der Fluss ab; jetzt hält die Spule den Magneten fest (zeigt ihm ihren Südpol) — der Strom fließt in die Gegenrichtung, die Polung der Spannung kehrt sich um. Merke: Das Minus im Induktionsgesetz steht für „Gegenwirkung".`,
      hints: ['Was passiert mit dem Fluss beim Hineinschieben, was beim Herausziehen?', 'Welche Polarität stößt den Magneten ab?'],
      cards: ['lenz', 'induktionsgesetz'],
    },
    {
      id: 'mission', type: 'callout', tone: 'mission', title: 'Prüfung und Funkpraxis',
      md: `
Im Klasse-E-Katalog begegnet dir die Induktion nicht als eigene Frage, sondern als *Grundlage*: Spule und Induktivität (EC301–EC307), Übertrager und Transformatoren (EC401–EC404) und das Verhalten der Spule bei Gleichspannung (EC301, EC302) beruhen auf Induktion und Lenzscher Regel. Auch die Funktionsweise von Antennen (induziertes Signal im Empfangsleiter) kann man so verstehen.[^bnetza-pruefungsfragen-2024]

Praxis: Eine **Rahmenantenne** oder **Ferritstabantenne** im Empfänger wirkt wie die Spule im Experiment: Das magnetische Wechselfeld der Funkwelle durchsetzt die Windungen und induziert die Empfangsspannung (die Windungszahl $N$ und die Fläche $A$ entscheiden über die Höhe). Und warum kleine Schaltnetzteile Funkstörungen machen? Schnelle Stromänderungen in Spulen und Leitungsschleifen induzieren Störspannungen in benachbarten Leitungen (EMV).`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>Deutsch</th><th>English</th></tr>
<tr><td>Induktion, Induktionsgesetz</td><td>induction, Faraday's law of induction</td></tr>
<tr><td>induzierte Spannung</td><td>induced voltage (emf)</td></tr>
<tr><td>Lenzsche Regel</td><td>Lenz's law</td></tr>
<tr><td>magnetischer Fluss</td><td>magnetic flux</td></tr>
<tr><td>Flussänderung</td><td>flux change</td></tr>
<tr><td>Wirbelstrom</td><td>eddy current</td></tr>
<tr><td>Generator, Dynamo</td><td>generator, dynamo</td></tr>
<tr><td>Selbstinduktion / Fremdinduktion</td><td>self-induction / mutual induction</td></tr>
<tr><td>Blechung</td><td>lamination</td></tr></table>`,
    },
    {
      id: 'warning', type: 'callout', tone: 'warning', title: 'Typische Denkfehler',
      md: `
- **„Eine Spule erzeugt Spannung, wenn Gleichstrom fließt."** Nur bei *Stromänderung*; ein konstanter Strom erzeugt ein konstantes Feld und keine Spannung.
- **„Der Magnet in der Spule induziert immer."** Nur wenn er sich bewegt. Ruhender Magnet → keine Spannung.
- **Minus als Rechenfehler streichen.** Das Vorzeichen bedeutet „entgegen der Ursache" und liefert die Richtung.
- **Wirbelströme als nutzlos ansehen.** Im Transformator sind sie Verlust, im Induktionsherd und in der Wirbelstrombremse die eigentliche Wirkung.`,
    },
  ],
  cards: [
    { id: 'induktionsgesetz', front: 'Induktionsgesetz', back: '$u_i = -N\\cdot\\mathrm{d}\\Phi/\\mathrm{d}t$ — Spannung proportional zur Änderungsgeschwindigkeit des Flusses und zu $N$.' },
    { id: 'lenz', front: 'Lenzsche Regel', back: 'Der Induktionsstrom wirkt seiner Ursache (der Flussänderung) entgegen — das Minuszeichen im Induktionsgesetz.' },
    { id: 'fluss-formel', front: 'Magnetischer Fluss', back: '$\\Phi = B\\cdot A$ in Weber (Wb $= \\mathrm{V\\,s}$).' },
    { id: 'induktion-bedingung', front: 'Wann wird Spannung induziert?', back: 'Nur bei Änderung des Flusses (Bewegung, Drehung oder Stromänderung) — nie bei Gleichstrom bzw. ruhendem Magnet.' },
    { id: 'wirbelstrom-induktion', front: 'Wirbelstrom', back: 'Kreisströme in leitendem Material im Wechselfeld; heizen (Induktionsherd), bremsen (Wirbelstrombremse), sind Verlust im Kern (Blechung/Ferrit).' },
    { id: 'generator-prinzip', front: 'Generatorprinzip', back: 'Spule dreht sich im Magnetfeld → Fluss ändert sich → sinusförmige Induktionsspannung, $\\hat u = N B A \\omega$; Gegenkraft nach Lenz bremst den Antrieb.' },
    { id: 'bewegter-leiter', front: 'Bewegter Leiter im Feld', back: '$u = B\\cdot l\\cdot v$ (senkrecht); $0{,}5\\,\\mathrm{T}$, $0{,}2\\,\\mathrm{m}$, $2\\,\\mathrm{m/s}$ → $0{,}2\\,\\mathrm{V}$.' },
    { id: 'selbst-fremd', front: 'Selbstinduktion und Fremdinduktion', back: 'Selbstinduktion: Flussänderung durch den eigenen Strom. Fremdinduktion: durch das Feld einer anderen Spule (Transformator).' },
    { id: 'polung-umkehr', front: 'Warum kehrt die Polung beim Entfernen um?', back: 'Beim Annähern wächst der Fluss, beim Entfernen nimmt er ab; Lenz verlangt jeweils Gegenwirkung → entgegengesetzte Stromrichtung.' },
    { id: 'faktor4', front: 'N verdoppeln, Zeit halbieren: Spannung?', back: 'Vierfach ($u \\propto N/\\Delta t$).' },
  ],
};
