export default {
  id: 'halbleiter-pn',
  title: 'Halbleiter und pn-Übergang',
  summary: 'Warum Silizium weder Leiter noch Isolator ist, wie man es mit Fremdatomen steuerbar macht — und wie aus zwei Stücken Kristall die Diode entsteht. Hier entdeckst du selbst, warum eine Diode erst ab etwa 0,6 V leitet.',
  minutes: 30,
  needs: ['strom-und-spannung'],
  goals: [
    'Erklären, warum ein [[halbleiter|Halbleiter]] zwischen [[leiter|Leiter]] und [[isolator|Isolator]] liegt und wie [[dotierung|Dotierung]] und Temperatur die Leitfähigkeit verändern',
    'n- und p-Gebiet unterscheiden: bewegliche [[elektron|Elektronen]] bzw. [[loch|Löcher]] als Ladungsträger',
    'Die [[sperrschicht|Raumladungszone]] am [[pn-uebergang|pn-Übergang]] ohne Formel erklären und Sperr- von Durchlassrichtung unterscheiden',
    'Die typischen [[flussspannung|Flussspannungen]] von Silizium, Germanium und Schottky-Dioden nennen und begründen, warum der Strom oberhalb der Schwelle exponentiell steigt',
    'Das Temperaturverhalten eines pn-Übergangs vorhersagen (Flussspannung sinkt, Sperrstrom steigt)',
  ],
  blocks: [
    {
      id: 'intro', type: 'text', title: 'Weder Leiter noch Isolator',
      md: `
Ein Kupferdraht hat rund $8{,}5\\cdot 10^{22}$ frei bewegliche Elektronen pro Kubikzentimeter, ein Stück Glas praktisch keine. Ein Kristall aus **[Silizium](wiki:Silizium|Silicon)** liegt dazwischen: Jedes Atom hat vier Außenelektronen und teilt sie mit seinen vier Nachbarn. Bei tiefer Temperatur sitzt jedes Elektron fest in einer dieser Bindungen — der Kristall isoliert. Bei Zimmertemperatur schüttelt die Wärmebewegung aber hin und wieder eines los: Es wird frei beweglich und hinterlässt eine Lücke, ein **[Loch](wiki:Defektelektron|Electron hole)**. In reinem Silizium sind das größenordnungsmäßig nur $10^{10}$ Paare pro cm³ — bei etwa $5\\cdot 10^{22}$ Atomen pro cm³ ist das ein Elektron auf Billionen Atome.[^wp-halbleiter]

Das [Bändermodell](wiki:Bändermodell|Band theory) fasst das so zusammen: Zwischen dem Band der gebundenen und dem der freien Elektronen liegt eine **[Bandlücke](wiki:Bandlücke|Band gap)** — bei Silizium $1{,}12\\,\\mathrm{eV}$, bei [Germanium](wiki:Germanium) nur $0{,}66\\,\\mathrm{eV}$ (zur Einheit: [Elektronenvolt](wiki:Elektronenvolt|Electronvolt)). Je kleiner die Lücke, desto leichter reicht die Wärme zum „Losreißen". Deshalb leitet Germanium bei gleicher Temperatur besser — und ist temperaturempfindlicher.

Eine wichtige Folge: Anders als beim Metall **sinkt der Widerstand eines Halbleiters mit steigender Temperatur**, denn es entstehen mehr Ladungsträger. Er verhält sich also wie ein [[ntc|Heißleiter]] — daher kommt das thermische Weglaufen von Transistoren, das du später noch fürchten wirst.`,
    },
    {
      id: 'dotierung', type: 'text', title: 'Dotieren: gezielt Ladungsträger einbauen',
      md: `
Reines Silizium wäre ein schlechter Baustoff, denn seine Leitfähigkeit hängt zu stark von der Temperatur ab. Der Trick: **[[dotierung|Dotieren]]** — man ersetzt eines von etwa fünf Millionen Siliziumatomen durch ein Fremdatom (rund $10^{16}$ Fremdatome pro cm³).

- **n-Leiter:** ein Atom mit *fünf* Außenelektronen, z. B. [Phosphor](wiki:Phosphor|Phosphorus) oder [Arsen](wiki:Arsen|Arsenic). Vier Elektronen binden mit, das fünfte bleibt übrig und ist frei beweglich. Das Fremdatom bleibt als ortsfestes **positives Ion** zurück (Donator). Beweglich sind **Elektronen** (n = negativ).
- **p-Leiter:** ein Atom mit *drei* Außenelektronen, z. B. [Bor](wiki:Bor|Boron). Eine Bindung bleibt unbesetzt — ein Loch. Ein Nachbarelektron springt hinein, das Loch wandert weiter. Das Atom bleibt als ortsfestes **negatives Ion** zurück (Akzeptor). Beweglich sind **Löcher** (p = positiv).

Beide Kristallarten sind für sich **elektrisch neutral** — jedes bewegliche Elektron hat sein positives Ion in der Nähe. Entscheidend ist: Die Zahl der Ladungsträger wird nun von uns bestimmt (Dotierung) und nicht mehr von der Temperatur. Ein Loch verhält sich dabei wie eine positive Ladung, auch wenn „nur" ein Elektron fehlt. Merke dir das Loch am besten als Blase in einer vollen Flasche: Die Blase steigt nach oben, obwohl sich in Wahrheit das Wasser nach unten bewegt.`,
    },
    {
      id: 'pn-text', type: 'text', title: 'Der pn-Übergang: die Raumladungszone',
      md: `
Setzt man ein n-Gebiet direkt an ein p-Gebiet, entsteht der **[[pn-uebergang|pn-Übergang]]**. Auf der n-Seite gibt es viele Elektronen, auf der p-Seite fast keine — genau wie ein Tropfen Tinte im Wasser breiten sie sich aus: Das heißt **[Diffusion](wiki:Diffusion)**. Elektronen wandern nach rechts, Löcher nach links und löschen sich gegenseitig aus (Rekombination).

Zurück bleiben auf der n-Seite die positiven Donator-Ionen und auf der p-Seite die negativen Akzeptor-Ionen. Diese **[[sperrschicht|Raumladungszone]]** ist ladungsträgerarm und baut ein elektrisches Feld auf, das die Diffusion bremst, bis sich ein Gleichgewicht einstellt. Die Spannung über der Zone heißt **Diffusionsspannung**; bei Silizium liegt sie bei etwa $0{,}7\\,\\mathrm{V}$. Du kannst sie nicht mit einem Voltmeter messen — sie wird von den Kontaktspannungen an den Anschlüssen genau aufgehoben.

**Sperrrichtung** (Pluspol am n-Gebiet): Die äußere Spannung verstärkt das Feld, die Raumladungszone wird *breiter*, nur ein winziger [[sperrstrom|Sperrstrom]] fließt. **Durchlassrichtung** (Pluspol am p-Gebiet): Die äußere Spannung wirkt dem Feld entgegen, die Zone schrumpft, Ladungsträger werden über die Grenze „gedrückt". Sobald die äußere Spannung die Größenordnung der Diffusionsspannung erreicht, steigt der Strom steil an. Der Zusammenhang ist die **[Shockley-Gleichung](wiki:Shockley-Gleichung|Shockley diode equation)**:

$$ I = I_S\\left(e^{\\,U/(n\\,U_T)} - 1\\right) \\qquad U_T = \\frac{k\\,T}{q} \\approx 25{,}85\\,\\mathrm{mV}\\ \\ (300\\,\\mathrm{K}) $$

$I_S$ ist der Sperrsättigungsstrom (bei Silizium extrem klein, in der Größenordnung $10^{-14}\\,\\mathrm{A}$), $n \\approx 1\\dots 2$ ein Korrekturfaktor, $U_T$ die **Temperaturspannung** (mit der [Boltzmann-Konstante](wiki:Boltzmann-Konstante|Boltzmann constant) $k$ und der Elementarladung $q$). Pro $60\\,\\mathrm{mV}$ mehr Spannung wächst der Strom etwa um den Faktor 10 — eine Kennlinie, die man *linear* gar nicht zeichnen kann, ohne dass sie wie eine Wand aussieht.[^wp-pn]`,
    },
    {
      id: 'viz-pn', type: 'viz', viz: 'pn-junction', title: 'Der pn-Übergang zum Anfassen',
      intro: 'Oben siehst du den Kristall: Links das **n-Gebiet** (blaue Elektronen, rote **+**-Ionen), rechts das **p-Gebiet** (rote Löcher, blaue **−**-Ionen). Unten steht die Kennlinie im logarithmischen Maßstab — jede Rasterlinie ist ein Faktor 10 im Strom.',
      task: 'Fahre die Spannung durch: In **Sperrrichtung** (−3 V und weiter) wächst die Raumladungszone. In **Durchlassrichtung** findest du die Schwelle, bei der 1 mA fließen. Erwärme zuletzt den Kristall auf 100 °C und sieh zu, wie sich die Kennlinie verschiebt.',
      params: { targetI: 1e-3, hotC: 100, reverseV: 3 },
      caption: 'Vereinfachtes Modell: symmetrisch dotiertes Silizium. Die Ladungsträger sind stark vergrößert, zur Zone gehören real nur Bruchteile eines Mikrometers.',
    },
    {
      id: 'warn-null-volt', type: 'callout', tone: 'warning', title: 'Eine Diode leitet nicht „ab 0 V"',
      md: `Ein verbreiteter Irrtum: „Eine Diode ist ein Ventil — sobald Plus am Pfeil anliegt, fließt Strom." Tatsächlich bleibt der Strom bei 0,3 V in Silizium noch winzig (Nanoampere!) und steigt erst bei etwa 0,6–0,7 V so weit, dass man von „leitend" spricht. Dafür steigt er dann so steil, dass die Spannung an der Diode kaum noch zunimmt: Mehr Strom heißt nur ein paar zehn Millivolt mehr. Deshalb rechnet man mit einer festen **Flussspannung** $U_F \\approx 0{,}7\\,\\mathrm{V}$ — und lässt den Strom von außen begrenzen.`,
    },
    {
      id: 'quiz-leitfaehigkeit', type: 'quiz', title: 'Was macht einen Halbleiter leitfähiger?',
      question: 'Welche Maßnahmen **erhöhen** die elektrische Leitfähigkeit eines Siliziumkristalls?',
      options: [
        { text: 'Dotieren mit Phosphor', correct: true, why: 'Jedes Phosphoratom liefert ein frei bewegliches Elektron — die Leitfähigkeit steigt um viele Größenordnungen.' },
        { text: 'Dotieren mit Bor', correct: true, why: 'Bor erzeugt Löcher, auch sie tragen den Strom (p-Leitung).' },
        { text: 'Erwärmen', correct: true, why: 'Wärme reißt mehr Elektronen aus den Bindungen: Halbleiter verhalten sich wie ein NTC.' },
        { text: 'Abkühlen auf nahe 0 K', correct: false, why: 'Bei sehr tiefer Temperatur sitzen alle Elektronen in ihren Bindungen — der Kristall isoliert fast.' },
        { text: 'Den Kristall möglichst rein halten', correct: false, why: 'Reines Silizium hat nur etwa 10¹⁰ Ladungsträger pro cm³ und leitet schlecht; erst die Dotierung macht es nutzbar.' },
      ],
    },
    {
      id: 'match-material', type: 'match', prompt: 'Ordne Material und Leitfähigkeitsklasse zu.',
      pairs: [['Kupfer', 'Leiter'], ['Silizium', 'Halbleiter'], ['Germanium', 'Halbleiter'], ['Glas', 'Isolator'], ['Porzellan', 'Isolator']],
    },
    {
      id: 'order-durchlass', type: 'order', prompt: 'Bringe die Vorgänge in die richtige Reihenfolge, wenn du eine Siliziumdiode von 0 V aus in **Durchlassrichtung** aufsteuerst.',
      items: [
        'Die äußere Spannung wirkt dem Feld der Raumladungszone entgegen.',
        'Die Raumladungszone wird schmaler.',
        'Elektronen und Löcher diffundieren über die Grenze und rekombinieren.',
        'Ab etwa 0,6 V steigt der Strom exponentiell an.',
      ],
      explain: 'Die Zone ist wie ein Damm: Mit wachsender Spannung sinkt der Damm, bis die Ladungsträger in Massen darüber laufen — und weil die Zahl der „überlaufenden" Ladungsträger exponentiell von der Spannung abhängt, wird der Strom steil.',
    },
    {
      id: 'quiz-schwellen', type: 'quiz', title: 'Typische Schwellspannungen',
      question: 'Welche Werte nennt man für die Durchlassspannung von **Germanium-, Silizium- und Schottky-Dioden** (typisch, bei einigen mA)?',
      options: [
        { text: 'Ge ≈ 0,3 V, Si ≈ 0,6–0,7 V, Schottky ≈ 0,2–0,4 V', correct: true, why: 'Die kleinere Bandlücke von Germanium und die Metall-Halbleiter-Barriere der Schottky-Diode erklären die niedrigeren Werte.' },
        { text: 'Ge ≈ 0,7 V, Si ≈ 0,3 V, Schottky ≈ 0,6 V', correct: false, why: 'Vertauscht: Silizium hat die größere Bandlücke und damit die höhere Schwelle als Germanium.' },
        { text: 'Alle drei etwa 0 V — die Diode leitet sofort', correct: false, why: 'Auch Germanium braucht etwa 0,2–0,4 V, bevor nennenswert Strom fließt.' },
        { text: 'Ge ≈ 1,5 V, Si ≈ 3 V, Schottky ≈ 0,7 V', correct: false, why: 'Das sind eher die Größenordnungen von Leuchtdioden (rot bis blau).' },
      ],
    },
    {
      id: 'numeric-ut', type: 'numeric', title: 'Temperaturspannung',
      question: 'Berechne die Temperaturspannung $U_T = k\\,T/q$ bei $T = 300\\,\\mathrm{K}$. Es gilt $k/q = 8{,}617\\cdot 10^{-5}\\,\\mathrm{V/K}$.',
      answer: 25.85, tolerance: 0.1, unit: 'mV',
      hint: '$8{,}617\\cdot 10^{-5} \\cdot 300$ in Volt, dann in Millivolt umrechnen.',
      explain: '$U_T = 8{,}617\\cdot 10^{-5}\\,\\mathrm{V/K}\\cdot 300\\,\\mathrm{K} = 25{,}85\\,\\mathrm{mV}$. Diese Größe steckt im Exponenten der Shockley-Gleichung: Alle $60\\,\\mathrm{mV}$ ($\\approx U_T \\cdot \\ln 10$) wächst der Strom um den Faktor 10.',
    },
    {
      id: 'numeric-temp', type: 'numeric', title: 'Flussspannung und Temperatur',
      question: 'Eine Siliziumdiode hat bei $20\\,^\\circ\\mathrm{C}$ und konstantem Strom die Flussspannung $0{,}65\\,\\mathrm{V}$. Die Flussspannung sinkt um etwa $2\\,\\mathrm{mV}$ pro Kelvin. Wie groß ist sie bei $70\\,^\\circ\\mathrm{C}$?',
      answer: 0.55, tolerance: 0.005, unit: 'V',
      hint: 'Temperaturunterschied: 50 K.',
      explain: '$\\Delta U = -2\\,\\mathrm{mV/K}\\cdot 50\\,\\mathrm{K} = -100\\,\\mathrm{mV}$, also $0{,}65\\,\\mathrm{V} - 0{,}10\\,\\mathrm{V} = 0{,}55\\,\\mathrm{V}$. Der Wert −2 mV/K ist eine Faustregel für Silizium; die Demo rechnet mit etwa −1,6 mV/K bei 10 mA.',
    },
    {
      id: 'recall-rlz', type: 'recall', title: 'Erkläre es mit eigenen Worten',
      prompt: 'Erkläre ohne Formel, **was die Raumladungszone ist**, warum sie entsteht und wie sie sich in Sperr- und Durchlassrichtung verändert.',
      answer: 'Am Übergang von n- zu p-Material diffundieren Elektronen und Löcher ineinander und rekombinieren. Zurück bleiben ortsfeste, geladene Atomrümpfe: positive Donatoren auf der n-Seite, negative Akzeptoren auf der p-Seite. Dazwischen liegt eine ladungsträgerarme Zone mit einem elektrischen Feld, das die weitere Diffusion stoppt (Diffusionsspannung ≈ 0,7 V bei Si). In Sperrrichtung verstärkt die äußere Spannung das Feld, die Zone wird breiter, es fließt nur ein winziger Sperrstrom. In Durchlassrichtung schwächt sie das Feld, die Zone wird schmal, ab etwa 0,6 V fließt ein exponentiell wachsender Strom.',
      hints: ['Was bleibt zurück, wenn Elektronen und Löcher sich auslöschen?', 'Wohin zeigt das Feld — und wen bremst es?'],
      cards: ['raumladungszone', 'dotierung-n-p'],
    },
    {
      id: 'mission-pruefung', type: 'callout', tone: 'mission', title: 'Prüfung und Funkpraxis',
      md: `Der Fragenkatalog der Klasse E verlangt hier **keine** Halbleiterphysik, aber die Ergebnisse davon: In **EC503** geht es um die typischen Schwellspannungen von Germanium und Silizium, in **EC501** darum, dass eine in Sperrrichtung betriebene Diode einen *hohen Widerstand* zeigt, und in **EC513** darum, bei welchen Spannungen an Anode und Kathode eine Siliziumdiode leitet — etwa $0{,}7\\,\\mathrm{V}$ an der Anode mehr als an der Kathode.[^bnetza-katalog] Praktisch begegnet dir der pn-Übergang im Amateurfunk als Demodulator ([Detektorempfänger](wiki:Detektorempfänger|Crystal radio): erste Empfänger mit Kristalldiode), als Schutzdiode im Empfängereingang, als Ringmischer aus Schottky-Dioden und überall dort, wo Gleichrichter und Spannungsregler arbeiten. Das Bauteil dahinter ist immer derselbe Übergang.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table>
<tr><th>Deutsch</th><th>English</th></tr>
<tr><td>Halbleiter</td><td>semiconductor</td></tr>
<tr><td>Dotierung (n-/p-)</td><td>doping (n-/p-type)</td></tr>
<tr><td>Loch, Defektelektron</td><td>hole</td></tr>
<tr><td>Raumladungszone (Sperrschicht)</td><td>depletion region (depletion layer)</td></tr>
<tr><td>Durchlassrichtung / Sperrrichtung</td><td>forward bias / reverse bias</td></tr>
<tr><td>Flussspannung, Schwellspannung</td><td>forward voltage, threshold voltage</td></tr>
<tr><td>Temperaturspannung</td><td>thermal voltage</td></tr>
<tr><td>Bandlücke</td><td>band gap</td></tr>
</table>`,
    },
    {
      id: 'history', type: 'callout', tone: 'history', title: 'Vom Kristalldetektor zum Transistor',
      md: `Schon 1874 bemerkte [Ferdinand Braun](wiki:Ferdinand Braun|K. Ferdinand Braun), dass der Kontakt zwischen Metallspitze und bestimmten Kristallen den Strom nur in einer Richtung durchlässt — der Ursprung der Diode und des Kristalldetektors der frühen Radioempfänger. 1947 bauten [John Bardeen](wiki:John Bardeen|John Bardeen) und [Walter Brattain](wiki:Walter Brattain|Walter Brattain) in den Bell Labs den ersten Transistor, mit dabei war [William Shockley](wiki:William Bradford Shockley|William Shockley), nach dem die Diodengleichung benannt ist. 1956 bekamen alle drei dafür den Physik-Nobelpreis.[^wp-pn]`,
    },
  ],
  cards: [
    { id: 'dotierung-n-p', front: 'Was ist **Dotierung**, und was ist der Unterschied zwischen **n-** und **p-Leiter**?', back: 'Gezielter Einbau von Fremdatomen (≈ 10¹⁶ je cm³). **n:** fünf Außenelektronen (P, As) → bewegliche Elektronen. **p:** drei Außenelektronen (B) → bewegliche Löcher.' },
    { id: 'raumladungszone', front: 'Was ist die **Raumladungszone** eines pn-Übergangs?', back: 'Ladungsträgerarme Zone mit ortsfesten Ionen (n-Seite +, p-Seite −) und einem Feld, das die Diffusion stoppt. Sperrrichtung: breiter. Durchlass: schmaler.' },
    { id: 'flussspannung-si', front: 'Typische Flussspannung: **Silizium / Germanium / Schottky**?', back: 'Si ≈ 0,6–0,7 V · Ge ≈ 0,2–0,4 V · Schottky ≈ 0,2–0,4 V.' },
    { id: 'sperrstrom', front: 'Wie groß ist der **Sperrstrom** einer Si-Diode, und wovon hängt er ab?', back: 'Winzig (nA oder weniger bei Kleinsignaldioden). Steigt stark mit der Temperatur.' },
    { id: 'si-vs-ge', front: 'Warum hat **Germanium** die kleinere Schwelle als Silizium?', back: 'Kleinere Bandlücke (0,66 eV gegenüber 1,12 eV): Ladungsträger werden leichter frei.' },
    { id: 'shockley', front: 'Schreibe die **Shockley-Gleichung** auf.', back: '$I = I_S\\left(e^{U/(n\\,U_T)}-1\\right)$ mit $U_T = kT/q \\approx 25{,}85\\,\\mathrm{mV}$ (300 K).' },
    { id: 'faktor-10', front: 'Um welchen Faktor wächst der Diodenstrom pro **60 mV**?', back: 'Etwa um den Faktor 10 (genauer: $U_T\\cdot\\ln 10 \\approx 60\\,\\mathrm{mV}$ bei $n=1$).' },
    { id: 'temp-diode', front: 'Wie ändert sich die **Flussspannung** einer Si-Diode mit der Temperatur (bei festem Strom)?', back: 'Sie sinkt um etwa 2 mV pro Kelvin; der Sperrstrom steigt dagegen stark.' },
    { id: 'loch', front: 'Was ist ein **Loch** im Halbleiter?', back: 'Eine unbesetzte Bindung, die sich wie eine bewegliche positive Ladung verhält.' },
    { id: 'halbleiter-temp', front: 'Wie verhält sich der Widerstand eines **Halbleiters** bei Erwärmung — und der eines Metalls?', back: 'Halbleiter: sinkt (mehr Ladungsträger, NTC-artig). Metall: steigt (mehr Streuung).' },
    { id: 'durchlass-sperr', front: 'Welche Polung ist **Durchlass-**, welche **Sperrrichtung**?', back: 'Durchlass: Plus an Anode (p), Minus an Kathode (n). Sperrrichtung: umgekehrt.' },
  ],
};
