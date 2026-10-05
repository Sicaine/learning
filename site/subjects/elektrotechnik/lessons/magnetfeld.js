export default {
  id: 'magnetfeld',
  title: 'Magnetfeld, Spule, Kern',
  summary: 'Jeder Strom umgibt sich mit einem Magnetfeld. Eine Spule bündelt es, ein Eisen- oder Ferritkern verstärkt es — bis zur Sättigung. Daraus entstehen Elektromagnete, Drosseln und Antennenkerne.',
  minutes: 30,
  goals: [
    'Die Form des [[magnetisches-feld|Magnetfeldes]] um einen geraden Leiter und im Inneren einer Zylinderspule beschreiben und die Rechte-Faust-Regel anwenden',
    'Die [[magnetische-feldstaerke|magnetische Feldstärke]] $H = I\\cdot N/l_m$ und die [[magnetische-flussdichte|Flussdichte]] $B = \\mu_0\\mu_r H$ berechnen',
    'Erklären, was [[ferromagnetismus|Ferromagnetismus]], Sättigung und [[hysterese|Hysterese]] bedeuten, und Eisen, Ferrit und Kupfer als Spulenkern unterscheiden',
    'Die [[lorentzkraft|Lorentzkraft]] $F = B\\cdot I\\cdot l$ auf einen stromdurchflossenen Leiter berechnen',
  ],
  needs: ['strom-und-spannung'],
  blocks: [
    {
      id: 'idee', type: 'text', title: 'Strom erzeugt ein Magnetfeld',
      md: `
Im Jahr 1820 sah der dänische Physiker [Hans Christian Ørsted](wiki:Hans Christian Ørsted|Hans Christian Ørsted) bei einem Vortrag, wie die Nadel eines [Kompasses](wiki:Kompass|Compass) ausschlug, sobald er einen Strom in einem Draht in der Nähe einschaltete. Seine Entdeckung: **Bewegte Ladungen — ein elektrischer Strom — erzeugen ein [Magnetfeld](wiki:Magnetismus|Magnetism).** [André-Marie Ampère](wiki:André-Marie Ampère|André-Marie Ampère) arbeitete den Zusammenhang kurz darauf mathematisch aus.[^wp-magnetfeld]

Um einen **geraden Leiter** liegen die magnetischen Feldlinien als **konzentrische Kreise** (Katalog EB201): Sie sind in sich geschlossen und haben weder Anfang noch Ende, anders als die elektrischen Feldlinien, die von Plus nach Minus laufen. Die Richtung gibt die **Rechte-Faust-Regel** an: Zeigt der Daumen in die technische Stromrichtung, umschließen die gekrümmten Finger den Leiter in Feldrichtung.

Je näher am Draht, desto stärker das Feld: $B = \\dfrac{\\mu_0\\, I}{2\\pi\\, r}$ — bei $5\\,\\mathrm{A}$ und $1\\,\\mathrm{cm}$ Abstand sind es $100\\,\\mathrm{\\mu T}$ (das Erdmagnetfeld hat je nach Ort rund $25$ bis $65\\,\\mathrm{\\mu T}$). Für starke Felder muss man also die Wirkung vieler Windungen zusammenlegen: die **Spule**.`,
    },
    {
      id: 'spule', type: 'text', title: 'Spule, Durchflutung und Feldstärke',
      md: `
Wickelt man den Draht zu einer Spule, addieren sich die Felder der einzelnen Windungen. Im Inneren einer **langen Zylinderspule** entsteht ein **homogenes magnetisches Feld** (Katalog EB202): parallele Feldlinien, überall gleich stark. Außen schließen sich die Linien in weiten Bögen, und die Spule wirkt wie ein Stabmagnet mit Nord- und Südpol — ein **Elektromagnet**, den man ein- und ausschalten kann.

Die Ursache des Feldes ist das Produkt aus Strom und Windungszahl, die **Durchflutung** $\\Theta = I\\cdot N$ (Einheit A, „Amperewindungen"). Auf die Länge $l_m$ des Feldweges verteilt, ergibt das die **magnetische Feldstärke**

$$H = \\frac{I\\cdot N}{l_m} \\qquad\\text{(Einheit A/m)}$$

Beispiel (Katalog EB203): Ein Ringkern mit $2{,}6\\,\\mathrm{cm}$ mittlerem Durchmesser hat die Feldlinienlänge $l_m = \\pi\\cdot 2{,}6\\,\\mathrm{cm} = 8{,}17\\,\\mathrm{cm}$. Bei $N = 6$ Windungen und $I = 2{,}5\\,\\mathrm{A}$ ist $H = \\dfrac{2{,}5\\cdot 6}{0{,}0817} = 183{,}6\\,\\mathrm{A/m}$.

$H$ beschreibt die *Ursache* (Strom und Geometrie) und hängt nicht vom Material ab. Die tatsächliche Wirkung im Material ist die **magnetische Flussdichte** $B$ in Tesla (T):

$$B = \\mu_0\\,\\mu_r\\, H \\qquad\\text{mit}\\qquad \\mu_0 = 4\\pi\\cdot 10^{-7}\\,\\frac{\\mathrm{V\\,s}}{\\mathrm{A\\,m}} \\approx 1{,}2566\\cdot 10^{-6}\\,\\frac{\\mathrm{V\\,s}}{\\mathrm{A\\,m}}$$

$\\mu_r$ ist die relative [Permeabilität](wiki:Permeabilität (Magnetismus)|Permeability (electromagnetism)) des Kernmaterials: Luft $\\approx 1$, Ferrit einige hundert bis tausend, Eisen mehrere tausend. Mit $\\mu_r = 100$ wird aus $183{,}6\\,\\mathrm{A/m}$ eine Flussdichte von $B = 4\\pi\\cdot 10^{-7}\\cdot 100\\cdot 183{,}6 \\approx 23{,}1\\,\\mathrm{mT}$. Der Fluss durch eine Fläche $A$ ist $\\Phi = B\\cdot A$ (Einheit Weber).`,
    },
    {
      id: 'kern', type: 'text', title: 'Kernmaterial: Verstärken, Sättigen, Verlieren',
      md: `
Steckt man einen **[ferromagnetischen](wiki:Ferromagnetismus|Ferromagnetism)** Kern in die Spule, vervielfacht sich das Feld. Ferromagnetische Stoffe wie Eisen, Nickel und Kobalt besitzen winzige Bereiche (Weiss-Bezirke), die sich im äußeren Feld ausrichten. Bei Raumtemperatur sind **Eisen** und seine Legierungen ferromagnetisch (Katalog EB204), **Kupfer, Aluminium und Chrom** dagegen nicht.

Das hat drei wichtige Folgen:

- **[[magnetische-saettigung|Sättigung]]:** Wenn alle Bezirke ausgerichtet sind, steigt $B$ bei weiterem Strom kaum noch (nur noch wie in Luft). Der Kern ist gesättigt, die Spule verliert dann stark an Wirkung — der Knick im $B(H)$-Diagramm der Demo unten.
- **[Hysterese](wiki:Hysterese|Hysteresis):** Fährt man $H$ hoch und wieder zurück, geht $B$ nicht denselben Weg. Es bleibt eine [[remanenz|Remanenz]] ([Remanence](wiki:Remanenz|Remanence), Restmagnetismus) zurück. Pro Ummagnetisierung geht Energie als Wärme verloren; harte Magnete (Dauermagnete) haben viel, weiche Kerne wenig Remanenz.
- **[Wirbelströme](wiki:Wirbelstrom|Eddy current):** Ein massiver Metallkern in einem Wechselfeld ist selbst eine kurzgeschlossene Windung — es fließen Ströme, die ihn aufheizen. Gegenmittel: Blechpakete aus gegeneinander isolierten Blechen für 50 Hz, bei hohen Frequenzen **[Ferrit](wiki:Ferrite)** (ein keramischer Werkstoff, der den Strom kaum leitet).

Warum bringt ein **Kupfer- oder Aluminiumkern** in einer Spule bei hoher Frequenz *weniger* statt mehr Induktivität? Beide sind nicht magnetisch, aber leitfähig: Das schnell wechselnde Feld induziert im Kern Wirbelströme, die das Feld aus dem Kern *verdrängen* (Katalog EB205) — das Feld hat dann weniger Querschnitt, und $L$ sinkt. Ferritkerne dagegen nutzt man gerade im Funkbereich: für Antennenstäbe, Drosseln und Übertrager.[^wp-ferromagnetismus]`,
    },
    {
      id: 'lorentz', type: 'text', title: 'Kraft im Magnetfeld',
      md: `
Ein stromdurchflossener Leiter in einem Magnetfeld erfährt eine Kraft: die [Lorentzkraft](wiki:Lorentzkraft|Lorentz force) (benannt nach [Hendrik Antoon Lorentz](wiki:Hendrik Antoon Lorentz|Hendrik Lorentz)). Steht der Leiter der Länge $l$ senkrecht zum Feld $B$, gilt

$$F = B\\cdot I\\cdot l$$

Beispiel: $B = 0{,}5\\,\\mathrm{T}$, $I = 10\\,\\mathrm{A}$, $l = 0{,}2\\,\\mathrm{m}$ ergeben $F = 0{,}5\\cdot 10\\cdot 0{,}2 = 1\\,\\mathrm{N}$. Die Richtung ergibt sich aus der Dreifingerregel (Daumen = Strom, Zeigefinger = Feld, Mittelfinger = Kraft). Auf dieser Kraft beruhen jeder [Elektromotor](wiki:Elektromotor|Electric motor), der [Lautsprecher](wiki:Lautsprecher|Loudspeaker) und das Drehspulmesswerk aus der Messtechnik.`,
    },
    {
      id: 'viz-magnet', type: 'viz', viz: 'magnet-field-lab', title: 'Magnetfeld-Labor',
      task: 'Wechsle zum **Ringkern** und erzeuge darin eine Flussdichte von **50 mT** (±5 %): Welche Kombination aus Kern, Windungszahl und Strom schafft das? Probiere es auch mit Luft. Treibe danach einen Kern mit großem Strom in die **Sättigung** und beobachte den Arbeitspunkt im $B(H)$-Diagramm. Schau dir außerdem das Feld des geraden Leiters an.',
    },
    {
      id: 'num-h', type: 'numeric', title: 'Feldstärke im Ringkern',
      question: 'Ein Ringkern hat einen mittleren Durchmesser von $2{,}6\\,\\mathrm{cm}$ und trägt 6 Windungen. Durch den Draht fließen $2{,}5\\,\\mathrm{A}$. Wie groß ist die mittlere magnetische Feldstärke (in A/m)?',
      answer: 183.6, tolerance: 1, unit: 'A/m',
      hint: 'Der mittlere Umfang ist $l_m = \\pi\\cdot d$; $H = I\\cdot N/l_m$.',
      explain: '$l_m = \\pi\\cdot 0{,}026\\,\\mathrm{m} = 0{,}0817\\,\\mathrm{m}$; $H = 2{,}5\\cdot 6/0{,}0817 = 183{,}6\\,\\mathrm{A/m}$ (Katalogfrage EB203).',
    },
    {
      id: 'num-b', type: 'numeric', title: 'Flussdichte mit Kern',
      question: 'Derselbe Ringkern hat ein Kernmaterial mit $\\mu_r = 100$. Wie groß ist die Flussdichte $B$ bei $H = 183{,}6\\,\\mathrm{A/m}$ (in mT)?',
      answer: 23.1, tolerance: 0.2, unit: 'mT',
      explain: '$B = \\mu_0\\mu_r H = 4\\pi\\cdot 10^{-7}\\cdot 100\\cdot 183{,}6 \\approx 0{,}0231\\,\\mathrm{T} = 23{,}1\\,\\mathrm{mT}$.',
    },
    {
      id: 'num-lorentz', type: 'numeric', title: 'Lorentzkraft',
      question: 'Ein $0{,}2\\,\\mathrm{m}$ langer Leiter führt $10\\,\\mathrm{A}$ senkrecht zu einem Feld von $0{,}5\\,\\mathrm{T}$. Welche Kraft wirkt auf ihn?',
      answer: 1, tolerance: 0.01, unit: 'N',
      explain: '$F = B I l = 0{,}5\\,\\mathrm{T}\\cdot 10\\,\\mathrm{A}\\cdot 0{,}2\\,\\mathrm{m} = 1\\,\\mathrm{N}$.',
    },
    {
      id: 'num-bwire', type: 'numeric', title: 'Feld um einen Draht',
      question: 'Wie groß ist die Flussdichte im Abstand $r = 1\\,\\mathrm{cm}$ von einem Draht, der $5\\,\\mathrm{A}$ führt (in µT)? Es gilt $B = \\mu_0 I/(2\\pi r)$.',
      answer: 100, tolerance: 1, unit: 'µT',
      explain: '$B = 2\\cdot 10^{-7}\\,\\mathrm{Vs/(Am)}\\cdot 5\\,\\mathrm{A}/0{,}01\\,\\mathrm{m} = 10^{-4}\\,\\mathrm{T} = 100\\,\\mathrm{\\mu T}$.',
    },
    {
      id: 'quiz-ferro', type: 'quiz', title: 'Ferromagnetisch bei Raumtemperatur',
      question: 'Welcher der Werkstoffe ist bei Raumtemperatur ferromagnetisch?',
      options: [
        { text: 'Eisen', correct: true, why: 'Eisen (neben Nickel und Kobalt) ist ferromagnetisch (Katalog EB204).' },
        { text: 'Kupfer', correct: false, why: 'Kupfer ist diamagnetisch, ein Kupferkern verstärkt das Feld nicht.' },
        { text: 'Aluminium', correct: false, why: 'Aluminium ist paramagnetisch, aber nur ganz schwach; praktisch kein Effekt.' },
        { text: 'Chrom', correct: false, why: 'Chrom ist bei Raumtemperatur antiferromagnetisch, nicht ferromagnetisch.' },
      ],
    },
    {
      id: 'quiz-linien', type: 'quiz', title: 'Feldlinien um einen Leiter',
      question: 'Durch einen gestreckten Leiter fließt ein konstanter Gleichstrom. Wie sehen die Feldlinien aus?',
      options: [
        { text: 'Die magnetischen Feldlinien sind konzentrische Kreise um den Leiter.', correct: true, why: 'Magnetische Feldlinien sind geschlossen; um einen geraden Leiter bilden sie Kreise (EB201).' },
        { text: 'Die elektrischen Feldlinien sind konzentrische Kreise um den Leiter.', correct: false, why: 'Elektrische Feldlinien beginnen und enden an Ladungen; Kreise sind ein Merkmal magnetischer Felder.' },
        { text: 'Die magnetischen Feldlinien laufen sternförmig vom Leiter weg.', correct: false, why: 'Sternförmig wäre das Bild einer Punktladung (elektrisch), nicht eines Stromes.' },
        { text: 'Es gibt kein Feld, weil der Strom konstant ist.', correct: false, why: 'Ein konstanter Strom erzeugt ein konstantes Magnetfeld; erst Änderungen erzeugen zusätzlich eine Spannung.' },
      ],
    },
    {
      id: 'quiz-kupferkern', type: 'quiz', title: 'Kupferkern in der Spule',
      question: 'Eine Spule für hohe Frequenzen bekommt einen Kupferkern. Was geschieht mit ihrer Induktivität?',
      options: [
        { text: 'Sie sinkt, weil das hochfrequente Feld nicht in den leitenden Kern eindringen kann (Wirbelströme).', correct: true, why: 'Wirbelströme im Kupfer verdrängen das Feld; der wirksame Feldquerschnitt wird kleiner (EB205).' },
        { text: 'Sie steigt, weil Kupfer ein sehr guter Leiter ist.', correct: false, why: 'Leitfähigkeit allein erhöht $L$ nicht; dafür bräuchte man eine hohe Permeabilität.' },
        { text: 'Sie bleibt gleich, weil Kupfer nicht magnetisch ist.', correct: false, why: 'Nicht magnetisch stimmt, aber im Wechselfeld wirken induzierte Wirbelströme trotzdem.' },
        { text: 'Sie steigt, weil Kupfer ferromagnetisch ist.', correct: false, why: 'Kupfer ist nicht ferromagnetisch.' },
      ],
    },
    {
      id: 'recall-zylinder', type: 'recall', title: 'Feld in der Spule',
      prompt: 'Welches Feld stellt sich im Inneren einer langen Zylinderspule ein? Wie berechnest du seine Feldstärke, und was ändert ein Eisenkern?',
      answer: `Im Inneren einer langen Zylinderspule ist das magnetische Feld näherungsweise **homogen** (parallele Feldlinien, überall gleich stark); außen schließen sich die Linien zu weiten Bögen. Die Feldstärke ist $H = I\\cdot N/l$ (Durchflutung durch Länge) und hängt nur von Strom, Windungszahl und Länge ab. Ein Eisenkern verändert nicht $H$, aber die Flussdichte $B = \\mu_0\\mu_r H$: Sie wird um den Faktor $\\mu_r$ größer, bis der Kern in die Sättigung geht.`,
      hints: ['Welche Größe hängt vom Kernmaterial ab — $H$ oder $B$?'],
      cards: ['h-formel', 'b-formel'],
    },
    {
      id: 'mission', type: 'callout', tone: 'mission', title: 'Prüfung und Funkpraxis',
      md: `
Der Katalog prüft die Grundlagen zum Magnetfeld breit: **EB201** (Feldlinien um einen Leiter), **EB202** (homogenes Feld in der Zylinderspule), **EB203** (Rechenaufgabe $H = I\\cdot N/(\\pi d)$ mit dem Ringkern), **EB204** (Eisen ist ferromagnetisch) und **EB205** (Kupfer-/Aluminiumkern in HF-Spulen). Die Einheit der magnetischen Feldstärke steht in **EA104** (A/m).[^bnetza-pruefungsfragen-2024]

Praxis: **Ferritkerne und Ringkerne** gehören zur Standardausrüstung: Eine Mantelwellensperre (mehrere Windungen Koaxkabel auf einem Ferritring) hält Gleichtaktströme vom Kabelmantel fern; Ringkernspulen und Balune in Antennenanpassungen nutzen die Kernform, weil das Feld im Kern geschlossen bleibt und kaum nach außen streut. Zu viel Strom treibt den Kern in die Sättigung — dann verliert die Drossel ihre Wirkung und das Signal wird verzerrt.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>Deutsch</th><th>English</th></tr>
<tr><td>Magnetfeld</td><td>magnetic field</td></tr>
<tr><td>magnetische Feldstärke H</td><td>magnetic field strength</td></tr>
<tr><td>magnetische Flussdichte B</td><td>magnetic flux density</td></tr>
<tr><td>magnetischer Fluss</td><td>magnetic flux</td></tr>
<tr><td>Durchflutung</td><td>magnetomotive force (ampere-turns)</td></tr>
<tr><td>Permeabilität</td><td>permeability</td></tr>
<tr><td>Sättigung, Hysterese, Remanenz</td><td>saturation, hysteresis, remanence</td></tr>
<tr><td>Ringkern, Ferritkern</td><td>toroidal core, ferrite core</td></tr>
<tr><td>Wirbelstrom</td><td>eddy current</td></tr>
<tr><td>Lorentzkraft</td><td>Lorentz force</td></tr></table>`,
    },
    {
      id: 'warning', type: 'callout', tone: 'warning', title: 'Typische Denkfehler',
      md: `
- **„Kupfer- oder Aluminiumkerne verstärken das Feld einer Spule."** Sie sind nicht ferromagnetisch; im HF-Feld verringern sie $L$ sogar durch Wirbelströme.
- **$H$ und $B$ verwechseln.** $H$ kommt aus Strom und Geometrie; $B$ entsteht erst durch das Material, $B = \\mu_0\\mu_r H$.
- **Mehr Strom, immer mehr Feld.** Nur bis zur Sättigung des Kerns.
- **Magnetische Feldlinien haben einen Anfang.** Sie sind immer geschlossen (es gibt keine magnetischen Einzelladungen).
- **Windungen in $l_m$ mitrechnen.** $l_m$ ist die *Länge des Feldweges* (Ringumfang), nicht die Zahl der Windungen.`,
    },
  ],
  cards: [
    { id: 'h-formel', front: 'Magnetische Feldstärke', back: '$H = \\dfrac{I\\cdot N}{l_m}$ in A/m — hängt von Strom, Windungszahl und Länge ab, nicht vom Kernmaterial.' },
    { id: 'b-formel', front: 'Magnetische Flussdichte', back: '$B = \\mu_0\\mu_r H$ in Tesla; $\\mu_0 = 4\\pi\\cdot10^{-7}\\,\\mathrm{Vs/(Am)} \\approx 1{,}2566\\cdot10^{-6}$.' },
    { id: 'rechte-hand', front: 'Rechte-Faust-Regel', back: 'Daumen in Richtung des Stroms, die gekrümmten Finger zeigen die Richtung der magnetischen Feldlinien um den Leiter.' },
    { id: 'feld-leiter', front: 'Magnetfeld um einen geraden Leiter', back: 'Konzentrische, geschlossene Kreise um den Leiter (EB201); $B = \\mu_0 I/(2\\pi r)$.' },
    { id: 'feld-spule', front: 'Feld im Inneren einer langen Zylinderspule', back: 'Näherungsweise homogen (EB202).' },
    { id: 'ferro', front: 'Ferromagnetische Stoffe', back: 'Eisen, Nickel, Kobalt (Raumtemperatur). Kupfer, Aluminium, Chrom sind es nicht.' },
    { id: 'hysterese-saettigung', front: 'Sättigung und Hysterese', back: 'Sättigung: $B$ steigt kaum noch, wenn alle Bezirke ausgerichtet sind. Hysterese: $B(H)$ geht hin und zurück nicht denselben Weg; Remanenz und Ummagnetisierungsverluste.' },
    { id: 'ferrit-eisen', front: 'Ferrit oder Eisenblech?', back: 'Eisenblech (isolierte Bleche) für 50 Hz; Ferrit (kaum leitend, kaum Wirbelströme) für hohe Frequenzen.' },
    { id: 'wirbelstrom', front: 'Wirbelstrom', back: 'Im leitenden Kern im Wechselfeld induzierte Ströme: heizen den Kern auf und verdrängen bei Cu/Al-Kernen das Feld (L sinkt, EB205).' },
    { id: 'lorentz', front: 'Lorentzkraft auf einen Leiter', back: '$F = B\\cdot I\\cdot l$ (Leiter senkrecht zum Feld); Prinzip von Motor und Lautsprecher.' },
    { id: 'eb203', front: 'Ringkern d = 2,6 cm, N = 6, I = 2,5 A: H?', back: '$H = 2{,}5\\cdot 6/(\\pi\\cdot0{,}026) = 183{,}6\\,\\mathrm{A/m}$.' },
  ],
};
