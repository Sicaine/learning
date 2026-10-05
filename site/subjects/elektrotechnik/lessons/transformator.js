export default {
  id: 'transformator',
  title: 'Trafo, Übertrager, Impedanztransformation',
  summary: 'Zwei Spulen auf einem gemeinsamen Kern wandeln Wechselspannungen um — herauf oder herunter — und übersetzen nebenbei Impedanzen. Dieselbe Idee steckt im Netzteil, im Balun und im Antennenübertrager.',
  minutes: 30,
  goals: [
    'Aufbau und Funktion eines [[transformator|Transformators]] erklären (Fremdinduktion, nur bei Wechselspannung)',
    'Mit dem [[uebersetzungsverhaeltnis|Übersetzungsverhältnis]] $\\ddot u = N_P/N_S = U_P/U_S = I_S/I_P$ Spannungen, Ströme und Windungszahlen berechnen',
    'Die Impedanztransformation $Z_P = \\ddot u^2\\cdot Z_S$ herleiten und für eine Anpassung (z. B. 50 Ω auf 450 Ω) verwenden',
    'Verluste (Kupfer, Eisen, Streuung), den Einfluss des Kopplungsfaktors und die Besonderheit des [[spartransformator|Spartransformators]] nennen',
  ],
  needs: ['induktion'],
  blocks: [
    {
      id: 'video-trafo', type: 'video', youtube: '7cxnnmUGpkk', label: 'Transformator einfach erklärt: Aufbau und Funktion eines Trafos', channel: '#Sogeht by Sven Stemmler', minutes: 6,
      why: 'Aufbau und Wirkungsweise des Trafos in sechs Minuten — ein guter Einstieg, bevor du in der Demo mit den Windungszahlen experimentierst.',
    },
    {
      id: 'idee', type: 'text', title: 'Zwei Spulen, ein Kern',
      md: `
Ein [Transformator](wiki:Transformator|Transformer) besteht aus zwei Spulen (Wicklungen), die ein gemeinsamer Eisen- oder Ferritkern magnetisch koppelt. Legt man an die **Primärwicklung** (Windungszahl $N_P$) eine *Wechsel*spannung, fließt ein Wechselstrom und erzeugt einen **wechselnden** magnetischen Fluss im Kern. Dieser Fluss durchsetzt auch die **Sekundärwicklung** ($N_S$) und induziert dort nach dem Induktionsgesetz eine Spannung (Fremdinduktion, [Gegeninduktion](wiki:Gegeninduktion|Inductive coupling)).[^wp-transformator]

Weil derselbe Fluss pro Windung in beiden Wicklungen gleich ist, ist die Spannung pro Windung gleich: Mehr Windungen heißt mehr Spannung. Beim **idealen** Transformator (ohne Verluste, mit vollständiger Kopplung) gilt

$$\\ddot u = \\frac{N_P}{N_S} = \\frac{U_P}{U_S} = \\frac{I_S}{I_P}$$

Die Leistung bleibt gleich ($U_P I_P = U_S I_S$), deshalb verhalten sich die Ströme *umgekehrt* wie die Spannungen: Wer die Spannung herabsetzt, erhält mehr Strom. Beispiele: Soll aus $230\\,\\mathrm{V}$ eine Spannung von $12\\,\\mathrm{V}$ werden und die Primärseite hat 1150 Windungen, so braucht die Sekundärseite $N_S = 1150\\cdot 12/230 = 60$ Windungen ($\\ddot u = 19{,}2$). Liefert die Sekundärseite $12\\,\\mathrm{V}$ bei $2\\,\\mathrm{A}$ ($24\\,\\mathrm{W}$), fließen primär nur $I_P = 24\\,\\mathrm{W}/230\\,\\mathrm{V} = 0{,}104\\,\\mathrm{A}$.

Katalog-Beispiele: Hat die Primärspule die **fünffache** Windungszahl und liegen $230\\,\\mathrm{V}$ an, kommen sekundär $230/5 = 46\\,\\mathrm{V}$ heraus (EC402); $600$ Windungen bei $230\\,\\mathrm{V}$ und $11{,}5\\,\\mathrm{V}$ sekundär bedeuten $N_S = 30$ (EC403); $150$ Windungen, $45\\,\\mathrm{V}$ primär und $180\\,\\mathrm{V}$ sekundär ergeben $N_S = 600$ (EC404).`,
    },
    {
      id: 'gleichspannung', type: 'text', title: 'Warum nur Wechselspannung?',
      md: `
Ein Transformator braucht einen **sich ändernden Fluss**. Bei Gleichspannung ist der Fluss nach dem Einschalten konstant, es wird nichts induziert — der Trafo überträgt dann nichts. Schlimmer: Die Primärwicklung hat nur ihren kleinen Gleichstromwiderstand, es fließt ein sehr hoher Strom, und der Trafo brennt durch (oder der Kern geht in Sättigung). Ein Netztrafo gehört deshalb nur an Wechselspannung.

Nur Wechsel*spannung* in dem Sinn, dass sich der Fluss ändert: Auch Impulse und Rechtecksignale werden übertragen (Schaltnetzteile!), solange sie sich ändern.`,
    },
    {
      id: 'impedanz', type: 'text', title: 'Impedanztransformation',
      md: `
Der Trafo „übersetzt" auch Widerstände. Schließt man an die Sekundärseite eine Last $Z_S$ an, ist der Strom dort $I_S = U_S/Z_S$. Von der Primärseite aus sieht die Quelle $Z_P = U_P/I_P$. Mit $U_P = \\ddot u\\, U_S$ und $I_P = I_S/\\ddot u$ folgt:

$$Z_P = \\frac{U_P}{I_P} = \\frac{\\ddot u\\,U_S}{I_S/\\ddot u} = \\ddot u^2\\cdot Z_S \\qquad\\Longleftrightarrow\\qquad \\ddot u = \\sqrt{\\frac{Z_P}{Z_S}}$$

Das Windungsverhältnis geht **quadratisch** ein. Beispiel: $Z_S = 8\\,\\Omega$ (Lautsprecher) und $\\ddot u = 4$ ergeben $Z_P = 16\\cdot 8 = 128\\,\\Omega$; das Verfahren nutzten Röhrenverstärker mit [Ausgangsübertrager](wiki:Ausgangsübertrager|Valve amplifier), um hochohmige Röhren an niederohmige Lautsprecher anzupassen.

Genau dieses Prinzip braucht der Funkamateur für die **Anpassung**: Soll eine Last von $450\\,\\Omega$ für eine Quelle wie $50\\,\\Omega$ aussehen, brauchst du ein Impedanzverhältnis von $450/50 = 9$, also ein Windungsverhältnis von $\\sqrt 9 = 3$. Das kommt in der Antennenpraxis ständig vor: Übertrager mit festen Impedanzverhältnissen (z. B. 4:1, 9:1, 49:1) passen Drahtantennen an das $50\\,\\Omega$-Kabel an; ein [[balun|Balun]] ([Wikipedia](wiki:Balun|Balun); balanced–unbalanced) trennt symmetrische von unsymmetrischen Leitungen. Das ist die Brücke zur Leistungsanpassung aus der Lektion über reale Quellen.`,
    },
    {
      id: 'verluste', type: 'text', title: 'Reale Trafos: Verluste, Kopplung, Sparschaltung',
      md: `
Ein realer Transformator verliert Energie und ist nie ganz ideal:

- **Kupferverluste:** Die Wicklungen haben einen Widerstand; $I^2 R$ erwärmt sie. Sie wachsen mit der Last.
- **Eisenverluste:** Hysterese (Ummagnetisierung) und [Wirbelströme](wiki:Wirbelstrom|Eddy current) im Kern. Gegenmittel: dünne isolierte Bleche ([Elektroblech](wiki:Elektroblech|Electrical steel)) oder bei hohen Frequenzen Ferrit. Sie fallen schon im Leerlauf an.
- **Streuung:** Nicht der ganze Fluss durchsetzt beide Wicklungen; der Kopplungsfaktor $k$ ist kleiner als 1. Der Streufluss wirkt wie eine zusätzliche Reiheninduktivität (**[[streuinduktivitaet|Streuinduktivität]]**) und lässt die Sekundärspannung unter Last einbrechen. In der Demo siehst du das mit dem $k$-Regler.
- **Wirkungsgrad:** Große Netztrafos erreichen weit über 90 %, kleine nur 70 bis 85 %.

Ein **[Spartransformator](wiki:Spartransformator|Autotransformer)** hat nur *eine* Wicklung mit Anzapfung: Primär- und Sekundärseite teilen sich einen Teil der Windungen. Das spart Material, ist aber **nicht galvanisch getrennt** — eine Berührung der Sekundärseite kann gefährlich sein, wenn die Primärseite am Netz liegt. Ein **[Trenntransformator](wiki:Trenntransformator|Isolation transformer)** (z. B. 230 V zu 230 V) dagegen trennt galvanisch und erhöht die Sicherheit am Netz.`,
    },
    {
      id: 'viz-trafo', type: 'viz', viz: 'transformer-lab', title: 'Transformator-Labor',
      task: 'Zwei Aufgaben: **(1)** Erzeuge aus $230\\,\\mathrm{V}$ eine Spannung von etwa $12\\,\\mathrm{V}$ bei etwa $2\\,\\mathrm{A}$ an der Last (Tipp: Preset „Netztrafo", dann $N_S$ so wählen, dass die Spannung unter Last passt). **(2)** Übersetze eine Last von rund $450\\,\\Omega$ so, dass die Quelle $Z_P = 50\\,\\Omega$ sieht. Beobachte, was der Kopplungsfaktor mit der Sekundärspannung macht.',
    },
    {
      id: 'num-ns', type: 'numeric', title: 'Windungszahl sekundär',
      question: 'Ein Netztrafo soll $230\\,\\mathrm{V}$ auf $12\\,\\mathrm{V}$ herabsetzen. Die Primärseite hat 1150 Windungen. Wie viele Windungen braucht die Sekundärseite (ideal)?',
      answer: 60, tolerance: 0.5, unit: 'Wdg.',
      explain: '$N_S = N_P\\cdot U_S/U_P = 1150\\cdot 12/230 = 60$; $\\ddot u = 19{,}2$.',
    },
    {
      id: 'num-ip', type: 'numeric', title: 'Primärstrom',
      question: 'Ein (idealer) Trafo liefert sekundär $12\\,\\mathrm{V}$ bei $2\\,\\mathrm{A}$ und wird primär mit $230\\,\\mathrm{V}$ gespeist. Wie groß ist der Primärstrom (in A)?',
      answer: 0.104, tolerance: 0.002, unit: 'A',
      explain: '$P = 12\\,\\mathrm{V}\\cdot 2\\,\\mathrm{A} = 24\\,\\mathrm{W}$; $I_P = P/U_P = 24/230 = 0{,}104\\,\\mathrm{A}$.',
    },
    {
      id: 'num-zp', type: 'numeric', title: 'Impedanz auf der Primärseite',
      question: 'An der Sekundärseite eines Übertragers mit $\\ddot u = 4$ hängt $Z_S = 8\\,\\Omega$. Welche Impedanz sieht die Primärseite?',
      answer: 128, tolerance: 1, unit: 'Ω',
      explain: '$Z_P = \\ddot u^2\\cdot Z_S = 16\\cdot 8\\,\\Omega = 128\\,\\Omega$.',
    },
    {
      id: 'num-uebers', type: 'numeric', title: 'Anpassung 50 Ω auf 450 Ω',
      question: 'Eine Last von $450\\,\\Omega$ soll für eine Quelle wie $50\\,\\Omega$ aussehen. Welches Windungsverhältnis ($\\ddot u$ = Windungen auf der Lastseite : Windungen auf der Quellenseite) braucht der Übertrager?',
      answer: 3, tolerance: 0.03, unit: ':1',
      hint: 'Das Impedanzverhältnis $450/50 = 9$ ist das *Quadrat* des Windungsverhältnisses.',
      explain: '$\\ddot u = \\sqrt{450/50} = \\sqrt 9 = 3$ (Windungen lastseitig : quellenseitig).',
    },
    {
      id: 'num-ec402', type: 'numeric', title: 'Spannung sekundär',
      question: 'Die Primärspule eines Übertragers hat die fünffache Windungszahl der Sekundärspule und liegt an $230\\,\\mathrm{V}$. Wie hoch ist die Sekundärspannung?',
      answer: 46, tolerance: 0.5, unit: 'V',
      explain: '$U_S = U_P/\\ddot u = 230/5 = 46\\,\\mathrm{V}$ (EC402).',
    },
    {
      id: 'quiz-gleich', type: 'quiz', title: 'Trafo an Gleichspannung',
      question: 'Warum arbeitet ein Netztransformator nicht mit Gleichspannung?',
      options: [
        { text: 'Bei Gleichspannung ändert sich der Fluss nicht, es wird nichts induziert; die Primärwicklung hat nur ihren kleinen Widerstand — es droht Überstrom und Sättigung.', correct: true, why: 'Induktion braucht eine Flussänderung; im Gleichstrombetrieb begrenzt nur der Wicklungswiderstand den Strom.' },
        { text: 'Weil Gleichspannung die Isolation zerstört.', correct: false, why: 'Die Isolation ist für die Spannung ausgelegt, egal ob Gleich- oder Wechselspannung.' },
        { text: 'Weil Gleichspannung keine Leistung überträgt.', correct: false, why: 'Gleichspannung überträgt sehr wohl Leistung, nur nicht über einen Transformator.' },
        { text: 'Weil der Eisenkern bei Gleichstrom verdampft.', correct: false, why: 'Der Kern wird schlimmstenfalls gesättigt und heiß, verdampft aber nicht.' },
      ],
    },
    {
      id: 'quiz-strom', type: 'quiz', title: 'Strom beim Abwärtstrafo',
      question: 'Ein idealer Transformator setzt die Spannung von $230\\,\\mathrm{V}$ auf $23\\,\\mathrm{V}$ herab. Wie verhalten sich die Ströme?',
      options: [
        { text: 'Der Sekundärstrom ist zehnmal so groß wie der Primärstrom.', correct: true, why: 'Leistung bleibt gleich: $U_P I_P = U_S I_S$, also $I_S = 10\\cdot I_P$.' },
        { text: 'Beide Ströme sind gleich.', correct: false, why: 'Gleiche Ströme hätte man bei gleicher Spannung; hier ändert sich die Spannung um den Faktor 10.' },
        { text: 'Der Sekundärstrom ist zehnmal kleiner.', correct: false, why: 'Bei Abwärtstransformation steigt der Strom auf der Sekundärseite.' },
        { text: 'Der Sekundärstrom ist nur $\\sqrt{10}$-mal so groß.', correct: false, why: 'Die Wurzel gehört zur Impedanz, nicht zum Strom.' },
      ],
    },
    {
      id: 'match-trafo', type: 'match', title: 'Trafo-Zuordnung',
      prompt: 'Ordne zu.',
      pairs: [
        ['Abwärtstrafo: Primärseite', 'viele Windungen, kleiner Strom'],
        ['Abwärtstrafo: Sekundärseite', 'wenige Windungen, großer Strom'],
        ['Hochspannungsseite', 'mehr Windungen'],
        ['Spartransformator', 'nicht galvanisch getrennt'],
      ],
    },
    {
      id: 'recall-impedanz', type: 'recall', title: 'Impedanztransformation',
      prompt: 'Was bedeutet „ein Übertrager transformiert Impedanzen"? Leite $Z_P = \\ddot u^2\\, Z_S$ her.',
      answer: `Die Last $Z_S$ sekundärseitig wirkt von der Primärseite wie eine andere Impedanz. Herleitung: $U_P = \\ddot u\\,U_S$ und $I_P = I_S/\\ddot u$ (Leistung bleibt gleich). Dann ist $Z_P = U_P/I_P = \\ddot u\\,U_S\\cdot\\ddot u/I_S = \\ddot u^2\\,Z_S$. Das Windungsverhältnis geht also *quadratisch* ein. Anwendung: Ein Übertrager mit $\\ddot u = 3$ lässt eine $450\\,\\Omega$-Last für eine $50\\,\\Omega$-Quelle wie $50\\,\\Omega$ aussehen — Leistungsanpassung (z. B. bei Antennen).`,
      hints: ['Welche Größen ändern sich: $U$ und $I$ — in welche Richtung?', 'Wie verhält sich $Z = U/I$ dann?'],
      cards: ['zp-formel', 'ueberset-formel'],
    },
    {
      id: 'mission', type: 'callout', tone: 'mission', title: 'Prüfung und Funkpraxis',
      md: `
Der Katalog (Abschnitt „Übertrager und Transformatoren") fragt das Spannungsverhältnis: **EC401** (Spannung zwischen a und b bei einem Transformationsverhältnis 15:1), **EC402** (fünffache Windungszahl, 230 V: 46 V), **EC403** und **EC404** (Windungszahl berechnen).[^bnetza-pruefungsfragen-2024] Die Impedanzbeziehung $\\ddot u = \\sqrt{Z_P/Z_S}$ steht in der Formelsammlung zum Katalog und ist unverzichtbar für Anpassung und HF-Übertrager.

Praxis: Dein Funkgeräte-Netzteil enthält entweder einen Netztrafo (Linearnetzteil) oder einen kleinen Ferrittrafo (Schaltnetzteil). Der **Balun** am Dipol, die **Mantelwellensperre** am Koaxkabel und der **Antennenübertrager** an einer Drahtantenne sind alle Transformatoren auf Ferritkernen. Ein falsch gewählter Kern (Sättigung, zu hohe Verluste bei der Betriebsfrequenz) ist eine häufige Fehlerquelle: Der Übertrager wird heiß oder verzerrt.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>Deutsch</th><th>English</th></tr>
<tr><td>Transformator, Trafo, Übertrager</td><td>transformer</td></tr>
<tr><td>Primär- / Sekundärwicklung</td><td>primary / secondary winding</td></tr>
<tr><td>Übersetzungsverhältnis</td><td>turns ratio</td></tr>
<tr><td>Windungszahl</td><td>number of turns</td></tr>
<tr><td>Kopplungsfaktor</td><td>coupling coefficient</td></tr>
<tr><td>Streuinduktivität</td><td>leakage inductance</td></tr>
<tr><td>Spartransformator</td><td>autotransformer</td></tr>
<tr><td>galvanische Trennung</td><td>galvanic isolation</td></tr>
<tr><td>Anpassung, Impedanztransformation</td><td>matching, impedance transformation</td></tr></table>`,
    },
    {
      id: 'warning', type: 'callout', tone: 'warning', title: 'Typische Denkfehler',
      md: `
- **„Der Trafo funktioniert auch mit Gleichspannung."** Nein — ohne Flussänderung keine Induktion; die Primärwicklung brennt durch.
- **„Bei einem Trafo bleiben Strom und Spannung gleich."** Die Spannung folgt dem Windungsverhältnis, der Strom verhält sich umgekehrt; nur die Leistung bleibt (ideal) gleich.
- **Impedanzverhältnis mit Windungsverhältnis verwechseln.** $Z_P/Z_S = \\ddot u^2$: Ein Windungsverhältnis 3:1 ist ein Impedanzverhältnis 9:1.
- **Spartransformator mit Trenntrafo verwechseln.** Beim Spartrafo gibt es keine galvanische Trennung.
- **Primär und sekundär vertauschen.** Der Abwärtstrafo hat primär *mehr* Windungen als sekundär.`,
    },
  ],
  cards: [
    { id: 'ueberset-formel', front: 'Übersetzungsverhältnis des Transformators', back: '$\\ddot u = N_P/N_S = U_P/U_S = I_S/I_P$ (ideal).' },
    { id: 'zp-formel', front: 'Impedanztransformation', back: '$Z_P = \\ddot u^2\\cdot Z_S$, also $\\ddot u = \\sqrt{Z_P/Z_S}$.' },
    { id: 'trafo-wechsel', front: 'Warum nur Wechselspannung?', back: 'Induktion braucht einen sich ändernden Fluss; bei Gleichspannung nur Wicklungswiderstand → Überstrom, Sättigung.' },
    { id: 'trafo-leistung', front: 'Leistungsbilanz idealer Trafo', back: '$U_P I_P = U_S I_S$; Spannung ↓ bedeutet Strom ↑ (umgekehrt proportional).' },
    { id: 'ns-berechnen', front: '230 V → 12 V bei $N_P = 1150$', back: '$N_S = 60$; $\\ddot u = 19{,}2$. Bei $12\\,\\mathrm{V}$/$2\\,\\mathrm{A}$: $I_P = 0{,}104\\,\\mathrm{A}$.' },
    { id: 'trafo-verluste', front: 'Verluste im Trafo', back: 'Kupferverluste ($I^2R$), Eisenverluste (Hysterese, Wirbelströme), Streuung ($k<1$); Blechung bzw. Ferrit verringern Wirbelströme.' },
    { id: 'spartrafo', front: 'Spartransformator', back: 'Eine Wicklung mit Anzapfung; spart Material, aber nicht galvanisch getrennt.' },
    { id: 'trafo-anpassung', front: 'Anpassung 50 Ω → 450 Ω', back: 'Impedanzverhältnis 9:1 → Windungsverhältnis 3:1 (Wurzel).' },
    { id: 'trafo-kern', front: 'Kernmaterial für Netztrafo / HF-Übertrager', back: 'Netz (50 Hz): geblechter Eisenkern. HF: Ferrit (kaum Wirbelströme).' },
    { id: 'ec402-karte', front: 'Primär fünffache Windungszahl, 230 V primär: $U_S$?', back: '$230/5 = 46\\,\\mathrm{V}$ (EC402).' },
  ],
};
