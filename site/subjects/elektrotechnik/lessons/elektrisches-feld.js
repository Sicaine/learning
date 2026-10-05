export default {
  id: 'elektrisches-feld',
  title: 'Das elektrische Feld',
  summary: 'Zwischen zwei Ladungen oder zwei Platten mit Spannung gibt es ein Kraftfeld: Es zieht an Ladungen, lässt sich mit Feldlinien zeichnen und hat eine Grenze — den Durchschlag.',
  minutes: 25,
  goals: [
    'Ein Feldlinienbild lesen: Linien von Plus nach Minus, senkrecht auf der Leiteroberfläche, dichter bedeutet stärker',
    'Die [[feldstaerke-e|elektrische Feldstärke]] im homogenen Feld mit $E = U/d$ berechnen (Einheit V/m)',
    'Die Kraft auf eine Ladung mit $F = Q\\cdot E$ und die Kraft zwischen zwei Punktladungen mit dem [[coulombsches-gesetz|Coulombschen Gesetz]] bestimmen',
    'Die Durchschlagfestigkeit eines Isolierstoffes nutzen, um die höchste zulässige Spannung zu berechnen',
    'Erklären, warum Spitzen sprühen und warum ein Faradayscher Käfig schützt',
  ],
  needs: ['strom-und-spannung'],
  blocks: [
    {
      id: 'idee', type: 'text', title: 'Kraft ohne Berührung',
      md: `
Reibst du einen Kamm an einem Wollpullover und hältst ihn über Papierschnipsel, springen sie an. Der Kamm berührt sie nicht, und trotzdem wirkt eine Kraft. Der Grund: Jede [elektrische Ladung](wiki:Elektrische Ladung|Electric charge) umgibt sich mit einem **[elektrischen Feld](wiki:Elektrisches Feld|Electric field)** — einem Zustand des Raumes, der auf jede andere Ladung in der Nähe eine Kraft ausübt. Gleichnamige Ladungen stoßen sich ab, ungleichnamige ziehen sich an.

Die Stärke dieser Kraft zwischen zwei Punktladungen $Q_1$ und $Q_2$ im Abstand $r$ beschreibt das **[Coulombsche Gesetz](wiki:Coulombsches Gesetz|Coulomb's law)** (nach [Charles Augustin de Coulomb](wiki:Charles Augustin de Coulomb|Charles-Augustin de Coulomb)):

$$F = k\\cdot\\frac{Q_1\\,Q_2}{r^2} \\qquad\\text{mit}\\qquad k \\approx 8{,}99\\cdot 10^{9}\\ \\mathrm{N\\,m^2/C^2}$$

Beispiel: Zwei Ladungen von je $1\\,\\mathrm{\\mu C}$ im Abstand $10\\,\\mathrm{cm}$ ziehen oder stoßen sich mit $F = 8{,}99\\cdot 10^9\\cdot 10^{-12}/0{,}01 \\approx 0{,}90\\,\\mathrm{N}$. Verdoppelst du den Abstand, sinkt die Kraft auf ein Viertel. Der Zusammenhang gleicht dem Gravitationsgesetz, nur dass es Anziehung *und* Abstoßung gibt.[^wp-coulomb]`,
    },
    {
      id: 'feldlinien', type: 'text', title: 'Feldlinien und Feldstärke',
      md: `
Damit man ein Feld zeichnen kann, erfand [Michael Faraday](wiki:Michael Faraday|Michael Faraday) die [Feldlinien](wiki:Feldlinie|Field line): Sie zeigen an jedem Punkt die Richtung der Kraft auf eine *positive Probeladung*. Daraus folgen feste Regeln:

- Feldlinien beginnen an positiven und enden an negativen Ladungen.
- Sie kreuzen sich nie (an einem Punkt gibt es nur eine Kraftrichtung).
- Sie treffen **senkrecht** auf die Oberfläche eines Leiters.
- Wo sie dichter liegen, ist das Feld stärker.

Die Größe, die das Feld an einem Punkt beschreibt, ist die **[elektrische Feldstärke](wiki:Elektrische Feldstärke|Electric field strength)** $E$: Kraft pro Ladung, $E = F/Q$, Einheit $\\mathrm{N/C} = \\mathrm{V/m}$. Kennt man $E$, bekommt man die Kraft auf jede Ladung: $F = Q\\cdot E$. Eine Ladung von $1\\,\\mathrm{\\mu C}$ in einem Feld von $1500\\,\\mathrm{V/m}$ erfährt $F = 10^{-6}\\cdot 1500 = 1{,}5\\,\\mathrm{mN}$.

Am wichtigsten für uns ist das **homogene Feld** zwischen zwei parallelen, ebenen Platten: Dort liegen die Feldlinien parallel und gleich dicht, $E$ ist überall gleich, nur am Rand wölbt sich das Bild nach außen. Liegt die Spannung $U$ an den Platten im Abstand $d$, dann gilt

$$E = \\frac{U}{d}$$

Das ist die Grundlage des Kondensators in der nächsten Lektion.[^bnetza-pruefungsfragen-2024] Beispiel: $9\\,\\mathrm{V}$ an einem Plattenabstand von $0{,}6\\,\\mathrm{cm}$ ergeben $E = 9/0{,}006 = 1500\\,\\mathrm{V/m}$ — Einheiten vorher in Meter umrechnen!`,
    },
    {
      id: 'durchschlag', type: 'text', title: 'Wenn das Feld zu stark wird',
      md: `
Jeder Isolierstoff hält nur eine bestimmte Feldstärke aus. Wird sie überschritten, reißen Elektronen aus den Atomen, es entsteht ein leitender Kanal: der **Durchschlag** (Funke, Lichtbogen). Die Grenze heißt [[durchschlagfestigkeit|Durchschlagfestigkeit]] ([Wikipedia](wiki:Durchschlagfestigkeit|Dielectric strength)) $E_d$. Richtwerte: Luft rund $3\\,\\mathrm{kV/mm}$ (Näherung, hängt von Feuchte, Druck und Elektrodenform ab), PTFE etwa $400\\,\\mathrm{kV/cm}$ ($= 40\\,\\mathrm{kV/mm}$, Wert aus dem Prüfungskatalog).

Die höchste zulässige Spannung folgt direkt aus $U_{\\max} = E_d\\cdot d$: Eine PTFE-Folie von $0{,}15\\,\\mathrm{mm} = 0{,}015\\,\\mathrm{cm}$ hält $400\\,\\mathrm{kV/cm}\\cdot 0{,}015\\,\\mathrm{cm} = 6\\,\\mathrm{kV}$ aus. Deshalb nutzt man in Hochspannungs- und Sendekondensatoren Isolierfolien mit hoher Durchschlagfestigkeit statt Luft.

**Spitzen sprühen ([[spitzenwirkung|Spitzenwirkung]]):** An einer Spitze drängen sich die Feldlinien dicht zusammen, dort ist $E$ bei gleicher Spannung viel größer als an glatten Flächen. Es kommt zur [Koronaentladung](wiki:Koronaentladung|Corona discharge) und im Extremfall zum Funken. Das ist der Grund, warum Hochspannungsteile abgerundet sind und warum ein [Blitzableiter](wiki:Blitzableiter|Lightning rod) mit Spitze eine Entladung gezielt einfängt. Für Funkamateure heißt das: Wo hohe Spannungen auftreten (Endstufe, Antennenspitzen bei hoher Sendeleistung), vermeidet man Spitzen und scharfe Kanten, sonst gibt es Sprühverluste und Störungen.

**[[faradayscher-kaefig|Faradayscher Käfig]]:** Im Inneren eines geschlossenen Metallgehäuses ist das äußere Feld null, weil sich die Ladungen im Metall (durch [Influenz](wiki:Influenz|Electrostatic induction)) so verschieben, dass sie das Feld im Inneren auslöschen. Deshalb schützt das Blechgehäuse eines Autos bei Gewitter, und deshalb bekommt ein Funkgerät in einer Metallkiste keinen Empfang. Der [Faradaysche Käfig](wiki:Faradayscher Käfig|Faraday cage) wird in der Etappe zur elektromagnetischen Verträglichkeit wiederkehren.`,
    },
    {
      id: 'viz-plates', type: 'viz', viz: 'field-plates', title: 'Plattenfeld',
      task: 'Zwei Aufgaben: **(1)** Stelle bei **300 V** mit Luft zwischen den Platten den *kleinsten* Plattenabstand ein, bei dem noch kein Funke überspringt. **(2)** Wechsle auf PTFE-Folie und erzeuge ein Feld, das größer ist, als Luft aushält, ohne dass es durchschlägt. Beobachte, wie sich die Feldlinien und die Kraft auf die Probeladung ändern.',
    },
    {
      id: 'num-ed', type: 'numeric', title: 'Feldstärke im Plattenkondensator',
      question: 'An einem Plattenkondensator mit $0{,}6\\,\\mathrm{cm}$ Plattenabstand liegen $9\\,\\mathrm{V}$. Wie groß ist die Feldstärke zwischen den Platten (in V/m)?',
      answer: 1500, tolerance: 15, unit: 'V/m',
      hint: 'Abstand erst in Meter umrechnen: $0{,}6\\,\\mathrm{cm} = 0{,}006\\,\\mathrm{m}$.',
      explain: '$E = U/d = 9\\,\\mathrm{V}/0{,}006\\,\\mathrm{m} = 1500\\,\\mathrm{V/m}$ (Katalogfrage EB102).',
    },
    {
      id: 'num-wickel', type: 'numeric', title: 'Wickelkondensator',
      question: 'An den Metallbelägen eines Wickelkondensators mit $0{,}15\\,\\mathrm{mm}$ starkem Kunststoff-Dielektrikum liegen $300\\,\\mathrm{V}$. Wie groß ist die Feldstärke im Dielektrikum (in kV/m)?',
      answer: 2000, tolerance: 20, unit: 'kV/m',
      explain: '$E = 300\\,\\mathrm{V}/(0{,}15\\cdot 10^{-3}\\,\\mathrm{m}) = 2\\cdot 10^6\\,\\mathrm{V/m} = 2000\\,\\mathrm{kV/m}$ (EB103).',
    },
    {
      id: 'num-ptfe', type: 'numeric', title: 'Höchste Spannung für PTFE',
      question: 'Ein Kondensator hat eine $0{,}15\\,\\mathrm{mm}$ starke PTFE-Folie als Dielektrikum. Die Durchschlagfestigkeit von PTFE beträgt etwa $400\\,\\mathrm{kV/cm}$. Welche Spannung darf höchstens anliegen?',
      answer: 6, tolerance: 0.06, unit: 'kV',
      explain: '$U_{\\max} = E_d\\cdot d = 400\\,\\mathrm{kV/cm}\\cdot 0{,}015\\,\\mathrm{cm} = 6\\,\\mathrm{kV}$ (EB104).',
    },
    {
      id: 'num-kraft', type: 'numeric', title: 'Kraft auf eine Ladung',
      question: 'Wie groß ist die Kraft auf eine Ladung von $1\\,\\mathrm{\\mu C}$ in einem homogenen Feld von $1500\\,\\mathrm{V/m}$ (in mN)?',
      answer: 1.5, tolerance: 0.02, unit: 'mN',
      explain: '$F = Q\\cdot E = 10^{-6}\\,\\mathrm{C}\\cdot 1500\\,\\mathrm{V/m} = 1{,}5\\cdot 10^{-3}\\,\\mathrm{N} = 1{,}5\\,\\mathrm{mN}$.',
    },
    {
      id: 'num-coulomb', type: 'numeric', title: 'Coulomb-Kraft',
      question: 'Zwei Punktladungen von je $1\\,\\mathrm{\\mu C}$ haben $10\\,\\mathrm{cm}$ Abstand. Mit $k = 8{,}99\\cdot 10^9\\,\\mathrm{N\\,m^2/C^2}$: Wie groß ist die Kraft zwischen ihnen?',
      answer: 0.90, tolerance: 0.01, unit: 'N',
      explain: '$F = 8{,}99\\cdot 10^9\\cdot (10^{-6})^2/(0{,}1)^2 = 8{,}99\\cdot 10^{-3}/0{,}01 \\approx 0{,}90\\,\\mathrm{N}$.',
    },
    {
      id: 'quiz-homogen', type: 'quiz', title: 'Feld zwischen Platten',
      question: 'Welches Feld stellt sich zwischen zwei parallelen Kondensatorplatten bei Anliegen einer Gleichspannung näherungsweise ein?',
      options: [
        { text: 'Ein homogenes elektrisches Feld.', correct: true, why: 'Parallele Feldlinien gleicher Dichte: $E = U/d$ ist überall gleich (Randeffekte vernachlässigt). Katalogfrage EB101.' },
        { text: 'Ein homogenes magnetisches Feld.', correct: false, why: 'Magnetische Felder entstehen durch *bewegte* Ladungen, hier liegt eine ruhende Spannung an.' },
        { text: 'Ein inhomogenes elektrisches Feld mit konzentrischen Kreisen.', correct: false, why: 'Konzentrische Kreise sind das Bild der magnetischen Feldlinien um einen geraden Leiter.' },
        { text: 'Gar kein Feld, weil kein Strom fließt.', correct: false, why: 'Ein Feld existiert, sobald Spannung anliegt — auch ohne Strom.' },
      ],
    },
    {
      id: 'quiz-spitze', type: 'quiz', title: 'Warum sprühen Spitzen?',
      question: 'Warum entstehen Entladungen bevorzugt an Spitzen und Kanten?',
      options: [
        { text: 'Dort drängen sich die Feldlinien, die Feldstärke wird lokal sehr groß und überschreitet die Durchschlagfestigkeit der Luft.', correct: true, why: 'Bei gleicher Spannung ist $E$ an einer kleinen Krümmung viel größer als an einer glatten Fläche.' },
        { text: 'Weil Metall an Spitzen weniger leitfähig ist.', correct: false, why: 'Die Leitfähigkeit ist überall gleich; entscheidend ist die Geometrie des Feldes.' },
        { text: 'Weil an Spitzen die Spannung höher ist.', correct: false, why: 'Das Potential ist auf einem Leiter überall gleich; die *Feldstärke* ist an der Spitze höher.' },
        { text: 'Weil Spitzen die Temperatur erhöhen.', correct: false, why: 'Die Erwärmung ist Folge, nicht Ursache.' },
      ],
    },
    {
      id: 'recall-spitzen', type: 'recall', title: 'Feldkonzentration',
      prompt: 'Warum sprühen Spitzen schneller als glatte Flächen, und was bedeutet das für den Aufbau von Hochspannungsteilen?',
      answer: `An einer Spitze (kleiner Krümmungsradius) drängen sich die Feldlinien zusammen; bei gleicher Spannung wird die Feldstärke dort sehr viel größer. Sobald sie die Durchschlagfestigkeit der Luft ($\\approx 3\\,\\mathrm{kV/mm}$) übersteigt, ionisiert die Luft: Sprühentladung (Korona), im Extremfall Funke. Konsequenz: Hochspannungsteile und Antennenenden werden abgerundet (große Radien), Isolierabstände müssen für die Spitzenspannung ausgelegt sein. Ein Blitzableiter nutzt den Effekt umgekehrt.`,
      hints: ['Wie sieht das Feldlinienbild an einer Spitze aus?', 'Was passiert, wenn $E$ die Durchschlagfestigkeit übersteigt?'],
      cards: ['spitzenwirkung', 'durchschlag-luft'],
    },
    {
      id: 'mission', type: 'callout', tone: 'mission', title: 'Prüfung und Funkpraxis',
      md: `
Der Katalog fragt hier Rechnen und Verstehen: **EB101** (Feld zwischen Kondensatorplatten: homogenes elektrisches Feld), **EB102** (9 V an $0{,}6\\,\\mathrm{cm}$: $1500\\,\\mathrm{V/m}$), **EB103** (300 V an $0{,}15\\,\\mathrm{mm}$: $2000\\,\\mathrm{kV/m}$) und **EB104** (PTFE-Folie: $6\\,\\mathrm{kV}$). Dazu die Einheit der Feldstärke in **EA103**: Volt pro Meter.[^bnetza-pruefungsfragen-2024]

Das E-Feld begegnet dir im Funkbetrieb direkt: Eine elektromagnetische Welle besteht aus einem elektrischen und einem magnetischen Feld. Die elektrischen Feldlinien einer Vertikalantenne laufen von der Antenne zur Erde (EB105); die Polarisation einer Welle ist durch die Richtung des E-Feldes festgelegt. In Etappe 9 knüpfen wir daran an.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>Deutsch</th><th>English</th></tr>
<tr><td>elektrisches Feld</td><td>electric field</td></tr>
<tr><td>Feldstärke</td><td>field strength</td></tr>
<tr><td>Feldlinie</td><td>field line</td></tr>
<tr><td>homogenes Feld</td><td>uniform (homogeneous) field</td></tr>
<tr><td>Plattenabstand</td><td>plate separation</td></tr>
<tr><td>Durchschlag(festigkeit)</td><td>breakdown (dielectric strength)</td></tr>
<tr><td>Probeladung</td><td>test charge</td></tr>
<tr><td>Faradayscher Käfig</td><td>Faraday cage</td></tr>
<tr><td>Spitzenwirkung, Korona</td><td>point discharge, corona</td></tr></table>`,
    },
    {
      id: 'warning', type: 'callout', tone: 'warning', title: 'Typische Denkfehler',
      md: `
- **„Ohne Strom gibt es kein Feld."** Das E-Feld hängt an der *Spannung*, nicht am Strom. Zwischen den Platten eines geladenen Kondensators fließt kein Strom, aber das Feld ist da.
- **Einheiten nicht umgerechnet.** Bei $E = U/d$ den Abstand immer in Meter einsetzen (cm → ÷100, mm → ÷1000) — der Katalog liebt gemischte Einheiten.
- **„Die Feldlinien zeigen die Bahn einer Ladung."** Sie zeigen die *Kraftrichtung*; eine bewegte Ladung folgt ihnen nur bei langsamer Bewegung ohne Trägheit.
- **Faradayscher Käfig hält alles ab.** Er schirmt statische und niederfrequente Felder ab, bei Hochfrequenz nur dann, wenn Löcher und Fugen klein gegen die Wellenlänge sind.`,
    },
  ],
  cards: [
    { id: 'feldstaerke', front: 'Elektrische Feldstärke im homogenen Feld', back: '$E = U/d$ in V/m (Abstand in Meter!). Allgemein $E = F/Q$.' },
    { id: 'feldlinien-regeln', front: 'Feldlinien-Regeln', back: 'Von + nach −; kreuzen sich nie; senkrecht auf Leiteroberflächen; dichter = stärkeres Feld.' },
    { id: 'homogenes-feld', front: 'Welches Feld liegt zwischen zwei parallelen Platten?', back: 'Näherungsweise ein homogenes elektrisches Feld (parallele Feldlinien, überall gleiches $E$) — Katalog EB101.' },
    { id: 'kraft-feld', front: 'Kraft auf eine Ladung im Feld', back: '$F = Q\\cdot E$; Richtung wie das Feld (für positive Ladung).' },
    { id: 'coulomb-gesetz', front: 'Coulombsches Gesetz', back: '$F = k\\,Q_1 Q_2/r^2$ mit $k \\approx 8{,}99\\cdot10^9\\,\\mathrm{N\\,m^2/C^2}$; doppelter Abstand → ein Viertel der Kraft.' },
    { id: 'durchschlag-luft', front: 'Durchschlagfestigkeit von Luft', back: 'Rund $3\\,\\mathrm{kV/mm}$ (Näherung); PTFE etwa $400\\,\\mathrm{kV/cm}$. $U_{\\max} = E_d\\cdot d$.' },
    { id: 'spitzenwirkung', front: 'Spitzenwirkung', back: 'An Spitzen sind die Feldlinien dicht, $E$ ist hoch → Sprühentladung. Hochspannungsteile werden abgerundet.' },
    { id: 'faraday-kaefig', front: 'Faradayscher Käfig', back: 'Ein geschlossenes Metallgehäuse hält äußere statische Felder vom Inneren fern (Influenz); schützt z. B. im Auto bei Gewitter.' },
    { id: 'einheit-e', front: 'Einheit der elektrischen Feldstärke', back: 'Volt pro Meter (V/m) $= \\mathrm{N/C}$ (Katalog EA103).' },
    { id: 'ptfe-6kv', front: 'PTFE-Folie 0,15 mm: höchste Spannung?', back: '$400\\,\\mathrm{kV/cm}\\cdot 0{,}015\\,\\mathrm{cm} = 6\\,\\mathrm{kV}$ (EB104).' },
  ],
};
