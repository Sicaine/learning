// L31 — Bipolartransistor als Stromverstärker und Schalter (Etappe 5)

// Schaltzeichen npn/pnp (DIN-Stil: Kreis, Basisstrich, Emitterpfeil) als Inline-SVG
const symbol = (ox, oy, pnp) => {
  const u = 26, P = (x, y) => `${(ox + x * u).toFixed(1)} ${(oy + y * u).toFixed(1)}`;
  const arrow = (tx, ty, dx, dy) => { const L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, bx = tx - ux * 0.55, by = ty - uy * 0.55; return `<path d="M${P(tx, ty)}L${P(bx - uy * 0.2, by + ux * 0.2)}L${P(bx + uy * 0.2, by - ux * 0.2)}Z" fill="currentColor"/>`; };
  const t = (x, y, s) => `<text x="${(ox + x * u).toFixed(1)}" y="${(oy + y * u).toFixed(1)}" font-size="15" font-weight="700" fill="var(--ink)" text-anchor="middle">${s}</text>`;
  return `<g stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round"><circle cx="${(ox + 1.35 * u).toFixed(1)}" cy="${oy}" r="${(1.65 * u).toFixed(1)}" stroke-width="1.4"/>
<path d="M${P(0, 0)}H${(ox + u).toFixed(1)}M${P(1, -0.95)}V${(oy + 0.95 * u).toFixed(1)}M${P(1, -0.45)}L${P(2, -1.25)}V${(oy - 2 * u).toFixed(1)}M${P(1, 0.45)}L${P(2, 1.25)}V${(oy + 2 * u).toFixed(1)}"/></g>
${pnp ? arrow(1.12, 0.6, -0.8, -0.6) : arrow(1.82, 1.06, 0.8, 0.6)}${t(-0.35, 0.2, 'B')}${t(2, -2.35, 'C')}${t(2, 2.75, 'E')}${t(1.35, 3.6, pnp ? 'pnp — Pfeil zur Basis' : 'npn — Pfeil vom Emitter weg')}`;
};
const FIG = `<svg viewBox="0 0 400 200" role="img" aria-label="Schaltzeichen von npn- und pnp-Transistor mit Anschlüssen B, C, E" style="width:100%;height:auto;color:var(--ink-2)">${symbol(60, 90, false)}${symbol(250, 90, true)}</svg>`;

export default {
  id: 'bipolartransistor',
  title: 'Bipolartransistor als Stromverstärker und Schalter',
  summary: 'Ein kleiner Basisstrom steuert einen großen Kollektorstrom: Anschlüsse, Kennlinien, Sättigung — und wie man mit dem richtigen Basisvorwiderstand eine Last sicher schaltet.',
  minutes: 35,
  needs: ['dioden'],
  goals: [
    'Anschlüsse (Basis, Kollektor, Emitter) und Schaltzeichen von [[bipolartransistor|npn- und pnp-Transistor]] erkennen',
    'Mit $I_E = I_C + I_B$ und der [[stromverstaerkung|Stromverstärkung]] $B = I_C/I_B$ rechnen; die [[basis-emitter-spannung]] von etwa 0,6 bis 0,7 V kennen',
    'Das Ausgangskennlinienfeld lesen: Sperrbereich, aktiver Bereich, Sättigung, [[lastgerade-bjt|Lastgerade]] und [[arbeitspunkt]]',
    'Einen [[basisvorwiderstand]] für den Schaltbetrieb dimensionieren — auch bei streuender Stromverstärkung',
    'Erklären, warum ein Transistor Leistung „verstärkt“ und woher die Energie kommt',
  ],
  blocks: [
    {
      id: 'intro', type: 'text', title: 'Ein Wasserhahn, den ein Fingerdruck steuert',
      md: `
Stell dir einen dicken Wasserschlauch vor, dessen Ventil sich von einem hauchdünnen Steuerstrahl öffnen lässt: Fast nichts fließt im Steuerkreis, aber im Hauptkreis rauscht es. Genau das leistet ein **[[transistor|Transistor]]** — nur mit Elektronen. Er ist Verstärker *und* Schalter, und praktisch jede Schaltung, die du später im Funkgerät findest, enthält davon Hunderte bis Milliarden.

Erfunden wurde der erste funktionsfähige Transistor 1947 in den [Bell Laboratories](wiki:Bell Laboratories|Bell Labs) von [John Bardeen](wiki:John Bardeen|John Bardeen), [Walter Brattain](wiki:Walter Houser Brattain|Walter Brattain) und [William Shockley](wiki:William Bradford Shockley|William Shockley); alle drei erhielten dafür 1956 den Physik-Nobelpreis. Er löste die [Elektronenröhre](wiki:Elektronenröhre|Vacuum tube) ab: kleiner, robuster, ohne Heizung.[^et5-wp-bjt]

Heute geht es um den **[[bipolartransistor|Bipolartransistor]]** (englisch *bipolar junction transistor*, BJT). „Bipolar“ heißt: Elektronen **und** Löcher tragen den Strom — wie in der [[diode|Diode]], nur mit *zwei* [[pn-uebergang|pn-Übergängen]] hintereinander. Der Trick: Die mittlere, hauchdünne Schicht (die Basis) ist so schmal, dass fast alle Ladungsträger, die vom Emitter in sie einströmen, sie durchqueren und vom Kollektor eingesammelt werden. Nur ein kleiner Teil bleibt hängen — das ist der Basisstrom.`,
    },
    {
      id: 'aufbau', type: 'text', title: 'Drei Anschlüsse, zwei Bauformen',
      md: `
Der Transistor hat drei Anschlüsse: **[[basis-transistor|Basis]] (B)**, **[[kollektor|Kollektor]] (C)** und **[[emitter|Emitter]] (E)**. Die Schichtfolge entscheidet über den Typ:

- **npn**: n-dotierter Emitter, dünne p-Basis, n-Kollektor. Der Kollektor liegt an *plus*, der Emitter an *minus* (Masse). Der häufigste Typ.
- **pnp**: alles umgekehrt, alle Spannungen und Ströme drehen ihr Vorzeichen.

Im Schaltzeichen sitzt der **Pfeil am Emitter** und zeigt die [[technische-stromrichtung|technische Stromrichtung]]: beim **npn vom Basisstrich weg** (Strom fließt aus dem Emitter heraus), beim **pnp zur Basis hin**. Merkhilfe: Der Pfeil zeigt immer vom **p-Gebiet zum n-Gebiet** — wie beim Dreieck der Diode (Anode p → Kathode n). Beim npn ist die Basis das p-Gebiet, also zeigt der Pfeil von ihr weg zum n-Emitter.`,
    },
    { id: 'fig-symbole', type: 'figure', title: 'Schaltzeichen nach DIN', html: FIG, caption: 'Links der npn-, rechts der pnp-Transistor. Basis links (Steuereingang), Kollektor oben, Emitter unten — am Emitter sitzt der Pfeil.' },
    {
      id: 'formeln', type: 'text', title: 'Strom steuert Strom: die drei Grundgleichungen',
      md: `
Was in den Transistor hineinfließt, muss wieder heraus — die [[kirchhoff-knotenregel|Knotenregel]] von [Gustav Kirchhoff](wiki:Gustav Robert Kirchhoff|Gustav Kirchhoff) liefert die erste Gleichung:

$$I_E = I_C + I_B$$

Der Emitterstrom ist die Summe aus Kollektor- und Basisstrom; durch den Emitter fließt also im leitenden Zustand **der größte Strom**. Der Kollektorstrom ist ein fester Vielfaches des Basisstroms — die **[[gleichstromverstaerkung-b|Gleichstromverstärkung]]** $B$:

$$B = \\frac{I_C}{I_B} \\qquad\\Rightarrow\\qquad I_C = B \\cdot I_B$$

Typische Werte liegen bei Kleinsignaltransistoren zwischen etwa 100 und 500, bei Leistungstransistoren oft nur zwischen 20 und 100 — und sie **streuen stark** von Exemplar zu Exemplar und mit der Temperatur. Für sehr kleine Änderungen interessiert die **[[wechselstromverstaerkung-beta|Wechselstromverstärkung]]** (Kleinsignalverstärkung), die Steigung der Kennlinie:

$$\\beta = \\frac{\\Delta I_C}{\\Delta I_B}$$

Und schließlich die Eingangsseite: Zwischen Basis und Emitter sitzt eine [[diode|Diode]]. Sie leitet erst ab der **[[basis-emitter-spannung|Basis-Emitter-Spannung]]** $U_{BE} \\approx 0{,}6\\ldots0{,}7\\,\\mathrm{V}$ (Silizium) — und dann ändert sich $U_{BE}$ kaum noch, auch wenn der Strom stark steigt.[^et5-katalog]

**Beispiel:** $I_C = 100\\,\\mathrm{mA}$ bei $B = 100$ → $I_B = 1\\,\\mathrm{mA}$ und $I_E = 101\\,\\mathrm{mA}$. Mit einem Tausendstel des Stroms steuerst du die Last.`,
    },
    {
      id: 'warn-ube', type: 'callout', tone: 'warning', title: 'Der Transistor verstärkt nicht aus dem Nichts',
      md: `
Ein verbreiteter Irrtum: „Der Transistor macht aus 1 mA einfach 100 mA.“ Er **erzeugt keine Energie**. Der Kollektorstrom stammt aus der **Versorgungsspannungsquelle**; der Basisstrom *öffnet nur den Hahn*. Deshalb ist „Leistungsverstärkung“ möglich, ohne den Energieerhaltungssatz zu verletzen: Die Ausgangsleistung ist größer als die Eingangsleistung, *und dazu ist eine Spannungsquelle nötig*.

Zweiter Irrtum: „$U_{BE}$ kann man beliebig erhöhen.“ Nein — die Basis-Emitter-Strecke ist eine Diode. Legst du 5 V direkt an, fließt ein riesiger Basisstrom und der Transistor stirbt. Deshalb sitzt vor der Basis fast immer ein Widerstand.`,
    },
    {
      id: 'viz-curves', type: 'viz', viz: 'bjt-curves', title: 'Kennlinien erforschen',
      intro: 'Oben die **Eingangskennlinie** $I_B(U_{BE})$: eine Diodenkennlinie. Unten das **[[ausgangskennlinienfeld|Ausgangskennlinienfeld]]** $I_C(U_{CE})$: für jeden Basisstrom eine eigene Kurve, fast waagerecht — der Kollektorstrom hängt kaum von $U_{CE}$ ab, sondern vom Basisstrom. Die gestrichelte **Lastgerade** $U_{CE} = U_B - R_C \\cdot I_C$ zeigt, wo sich Transistor und Widerstand einigen: der **[[arbeitspunkt|Arbeitspunkt]]**.',
      params: { ucc: 12, rc: 220, targetIc: 0.02 },
      task: 'Drei Aufgaben: Stelle den Basisstrom so ein, dass der Kollektorstrom 20 mA beträgt (Tipp: $I_B = I_C/B$). Treibe den Transistor in die Sättigung. Erwärme ihn auf mindestens 75 °C — und beobachte, was mit $U_{BE}$ passiert.',
      caption: 'Probiere auch andere Werte für B (Streuung zwischen Exemplaren) und R_C (Steilheit der Lastgerade).',
    },
    {
      id: 'bereiche', type: 'text', title: 'Drei Betriebsbereiche',
      md: `
Im Kennlinienfeld liest man drei Zonen ab:

1. **Sperrbereich** — $U_{BE}$ unter etwa 0,6 V: kein Basisstrom, praktisch kein Kollektorstrom. Der Schalter ist *aus*.
2. **Aktiver Bereich** — der Kollektorstrom folgt dem Basisstrom ($I_C = B \\cdot I_B$), $U_{CE}$ ist größer als etwa 1 V. Hier arbeitet der **Verstärker** (nächste Lektion).
3. **[[saettigung-bjt|Sättigung]]** — der Lastwiderstand bestimmt den Strom, nicht mehr der Transistor: $U_{CE}$ fällt auf etwa 0,1 bis 0,3 V (typisch rund 0,2 V). Mehr Basisstrom bringt jetzt kaum mehr Kollektorstrom. Der Schalter ist *ein*.

Bei der **Temperatur** läuft der Eingang nach der Diodenphysik weg: $U_{BE}$ sinkt um etwa 2 mV pro Kelvin (Faustwert), außerdem steigt die Stromverstärkung leicht. Wer den Transistor mit fester $U_{BE}$ treibt, bekommt bei Erwärmung *mehr* Strom, damit mehr Verlustleistung, also noch mehr Wärme — das **thermische Durchgehen**. Die Gegenmittel (Emitterwiderstand, Basisvorwiderstand) sind die Lektion der nächsten Stunde.`,
    },
    {
      id: 'schalter', type: 'text', title: 'Als Schalter: Basisvorwiderstand richtig wählen',
      md: `
Im Schaltbetrieb nutzt man nur die beiden Endzustände *Sperren* und *Sättigung*: Im Sperren fließt nichts, in Sättigung fällt am Transistor fast nichts ab (Verlust $\\approx U_{CE,sat} \\cdot I_C$) — beides ist verlustarm. Gefährlich ist nur der Zwischenbereich, in dem hohe Spannung *und* hoher Strom gleichzeitig am Transistor liegen.

**So dimensionierst du $R_B$:**

1. Laststrom $I_C$ festlegen, z. B. 100 mA.
2. Basisstrom für Sättigung: $I_B = \\ddot u \\cdot I_C / B_{min}$ mit dem **Übersteuerungsfaktor** $\\ddot u \\approx 2\\ldots 5$. Das *kleinste* B aus dem Datenblatt nehmen — Exemplare streuen!
3. $R_B = (U_{ein} - U_{BE}) / I_B$

**Beispiel:** 5 V Steuerspannung, $I_C = 100\\,\\mathrm{mA}$, $B_{min} = 50$, $\\ddot u = 2$ ⇒ $I_B = 2 \\cdot 100\\,\\mathrm{mA}/50 = 4\\,\\mathrm{mA}$ und $R_B = (5 - 0{,}7)\\,\\mathrm{V}/4\\,\\mathrm{mA} \\approx 1{,}08\\,\\mathrm{k\\Omega}$ → nächster [[normreihe-e12|E12-Wert]]: **1 kΩ**. Wer dagegen mit dem *typischen* $B = 100$ und ohne Übersteuerung rechnet, bekommt 4,3 kΩ — und der Transistor sättigt bei einem schlechten Exemplar nicht, wird heiß und die Last bekommt zu wenig Spannung.`,
    },
    {
      id: 'viz-switch', type: 'viz', viz: 'bjt-switch', title: 'Lampe schalten — mit streuendem B',
      params: { ucc: 5, bmin: 50, maxOverdrive: 5 },
      task: 'Wähle $R_B$ so, dass der Transistor auch beim schlechtesten Exemplar ($B = 50$) sicher sättigt ($U_{CE} < 0{,}3\\,\\mathrm{V}$), aber den Basisstrom nicht verschwendet (Übersteuerung höchstens 5-fach). Die Zahlen unter dem Schaltplan zeigen, was bei $B = 50$ passieren würde — egal, welches B du mit dem Regler einstellst.',
      caption: 'Ziehe am Regler B: Bei zu großem R_B bleibt der Transistor im aktiven Bereich — er wird heiß statt zu schalten.',
    },
    {
      id: 'video-bjt', type: 'video', youtube: 'kUw04tVOtjo', label: 'Das solltest du über Bipolartransistoren wissen!', channel: 'Schrack for Students', minutes: 3,
      why: 'Sehr kurze Zusammenfassung von Aufbau, npn/pnp und Stromverstärkung — zur Wiederholung nach der Demo.',
    },
    {
      id: 'mission', type: 'callout', tone: 'mission', title: 'Prüfung und Funkpraxis',
      md: `
**Klasse E (Kapitel „Transistor“):** Verlangt werden die Anschlüsse *Emitter, Basis, Kollektor* (EC608, EC609), die Schaltzeichen von npn und pnp (EC605–EC607), die **Stromverstärkung** — ein kleiner Basisstrom steuert einen großen Kollektorstrom (EC603) —, der Wert von $U_{BE}$ im leitenden Zustand von etwa **0,6 V** (EC610), und dass im leitenden Zustand der **Emitter** den größten Strom führt (EC611). Dazu kommen Aufgaben mit gemessenen Anschlussspannungen, bei denen du den Transistor finden sollst, durch den Kollektorstrom fließt (EC612–EC615): Suche die Variante mit $U_{BE}$ von 0,6 bis 0,7 V und $U_C > U_E$.[^et5-katalog]

**Funkpraxis:** Das Tasten des Senders („PTT“) schaltet in jedem Funkgerät ein Relais oder einen Transistor — genau diese Schaltung. Und die Endstufe, die später deine Antenne speist, ist im Prinzip auch ein Transistor, dem man eine hohe Spannung und einen hohen Strom zumutet (Leistungsverstärkung, ED401).`,
    },
    {
      id: 'q-source', type: 'quiz', title: 'Woher kommt die Energie?',
      question: 'Ein Transistor steuert mit 1 mA Basisstrom eine Last mit 100 mA. Woher stammt die zusätzliche Leistung am Ausgang?',
      options: [
        { text: 'Aus der Versorgungsspannungsquelle im Lastkreis', correct: true, why: 'Der Basisstrom steuert nur, wie viel von der Quelle zur Last fließen darf.' },
        { text: 'Aus dem Transistor selbst — er erzeugt Ladungsträger aus dem Silizium', correct: false, why: 'Der Transistor ist ein passives Steuerelement; er erzeugt keine Energie.' },
        { text: 'Aus dem Basisstrom, der um den Faktor B vergrößert wird', correct: false, why: 'Ströme werden nicht „vergrößert“; es fließt ein zweiter, von der Quelle gespeister Strom.' },
        { text: 'Aus der Wärme, die der Transistor aufnimmt', correct: false, why: 'Der Transistor erwärmt sich durch seine Verluste — er gibt Wärme ab, er wandelt keine Wärme in Strom.' },
      ],
    },
    {
      id: 'q-emitter', type: 'quiz', title: 'Der größte Strom',
      question: 'Durch welchen Anschluss eines leitenden npn-Transistors fließt der größte Strom?',
      options: [
        { text: 'Emitter', correct: true, why: '$I_E = I_C + I_B$ — der Emitter führt die Summe.' },
        { text: 'Kollektor', correct: false, why: 'Der Kollektorstrom ist nur $I_C = I_E - I_B$ — etwas kleiner.' },
        { text: 'Basis', correct: false, why: 'Der Basisstrom ist der kleinste, nur ein Bruchteil von $I_C$.' },
        { text: 'Alle drei gleich groß', correct: false, why: 'Gleich groß wären sie nur ohne Stromverstärkung.' },
      ],
    },
    {
      id: 'q-ube', type: 'quiz', title: 'Spannung an der Basis',
      question: 'Du misst an einem leitenden Silizium-Transistor $U_{BE}$. Welcher Wert ist plausibel?',
      options: [
        { text: 'etwa 0,7 V', correct: true, why: 'Die Basis-Emitter-Strecke ist eine Silizium-Diode in Durchlassrichtung.' },
        { text: '0 V, sonst fließt ja kein Strom', correct: false, why: 'Ohne etwa 0,6 V Schwellspannung leitet die Diodenstrecke nicht — der Transistor sperrt.' },
        { text: 'gleich der Versorgungsspannung, z. B. 12 V', correct: false, why: 'Dann wäre die Basis-Emitter-Diode ohne Strombegrenzung zerstört.' },
        { text: 'etwa 0,2 V', correct: false, why: '0,2 V ist typisch für $U_{CE}$ in der Sättigung — oder für Schottky-Dioden, nicht für $U_{BE}$.' },
      ],
    },
    {
      id: 'num-ib', type: 'numeric', title: 'Basisstrom',
      question: 'Eine Last zieht $I_C = 100\\,\\mathrm{mA}$; der Transistor hat $B = 100$. Wie groß ist der Basisstrom $I_B$?',
      answer: 1, unit: 'mA', tolerance: 0.02,
      hint: '$I_B = I_C / B$.',
      explain: '$I_B = 100\\,\\mathrm{mA}/100 = 1\\,\\mathrm{mA}$.',
    },
    {
      id: 'num-ie', type: 'numeric', title: 'Emitterstrom',
      question: 'Gleicher Transistor ($I_C = 100\\,\\mathrm{mA}$, $I_B = 1\\,\\mathrm{mA}$): Wie groß ist der Emitterstrom?',
      answer: 101, unit: 'mA', tolerance: 0.5,
      explain: '$I_E = I_C + I_B = 100\\,\\mathrm{mA} + 1\\,\\mathrm{mA} = 101\\,\\mathrm{mA}$.',
    },
    {
      id: 'num-beta', type: 'numeric', title: 'Wechselstromverstärkung',
      question: 'Erhöhst du den Basisstrom um $\\Delta I_B = 20\\,\\mathrm{\\mu A}$, steigt der Kollektorstrom um $\\Delta I_C = 2\\,\\mathrm{mA}$. Wie groß ist $\\beta$?',
      answer: 100, tolerance: 1,
      hint: '$\\beta = \\Delta I_C/\\Delta I_B$ — beide Ströme in dieselbe Einheit umrechnen.',
      explain: '$\\beta = 2\\,\\mathrm{mA}/20\\,\\mathrm{\\mu A} = 2000\\,\\mathrm{\\mu A}/20\\,\\mathrm{\\mu A} = 100$.',
    },
    {
      id: 'num-rb', type: 'numeric', title: 'Basisvorwiderstand',
      question: 'Schalte $I_C = 100\\,\\mathrm{mA}$ aus einer 5-V-Steuerung. Rechne mit $B_{min} = 50$, Übersteuerungsfaktor 2 und $U_{BE} = 0{,}7\\,\\mathrm{V}$. Wie groß ist $R_B$ (ungerundet)?',
      answer: 1075, unit: 'Ω', tolerance: 40,
      hint: 'Erst $I_B = 2\\cdot I_C/B_{min}$, dann $R_B = (5\\,\\mathrm{V} - 0{,}7\\,\\mathrm{V})/I_B$.',
      explain: '$I_B = 2 \\cdot 100\\,\\mathrm{mA}/50 = 4\\,\\mathrm{mA}$; $R_B = 4{,}3\\,\\mathrm{V}/4\\,\\mathrm{mA} = 1075\\,\\Omega$ ≈ 1,08 kΩ → gewählt 1 kΩ (E12). Falle: Mit $B = 100$ und ohne Übersteuerung kämen 4,3 kΩ heraus.',
    },
    {
      id: 'match-pins', type: 'match', title: 'Anschluss und Aufgabe',
      prompt: 'Ordne zu.',
      pairs: [
        ['Basis', 'Steuereingang — hier fließt der kleine Steuerstrom hinein'],
        ['Kollektor', 'Lastanschluss, beim npn der positivere Pol'],
        ['Emitter', 'führt die Summe aus Basis- und Kollektorstrom'],
        ['Pfeil nach außen am Emitter', 'npn-Transistor'],
        ['Pfeil zur Basis am Emitter', 'pnp-Transistor'],
      ],
    },
    {
      id: 'order-switch', type: 'order', title: 'Der Schaltvorgang',
      prompt: 'Bringe die Vorgänge beim Einschalten eines Transistorschalters in die richtige Reihenfolge.',
      items: [
        'Die Steuerspannung steigt über etwa 0,6 V an der Basis-Emitter-Strecke',
        'Es fließt ein Basisstrom',
        'Der Kollektorstrom steigt auf etwa B · I_B',
        'Am Lastwiderstand fällt mehr Spannung ab, U_CE sinkt',
        'Sättigung: U_CE ≈ 0,2 V, die Last begrenzt den Kollektorstrom',
      ],
      explain: 'Ursache und Wirkung laufen von links nach rechts: Spannung → Basisstrom → Kollektorstrom → Spannungsabfall → Sättigung.',
    },
    {
      id: 'recall-controlled', type: 'recall', title: 'In eigenen Worten',
      prompt: 'Warum nennt man den Bipolartransistor „stromgesteuert“, und was bedeutet das für die Dimensionierung der Schaltung? Antworte in 2 bis 4 Sätzen.',
      answer: 'Der Kollektorstrom folgt dem Basisstrom ($I_C = B \\cdot I_B$); die Basis-Emitter-Strecke ist eine Diode, deren Spannung bei Stromfluss fast konstant bei etwa 0,6 bis 0,7 V bleibt. Man kann den Transistor deshalb nicht sinnvoll mit einer festen Spannung betreiben — kleine Änderungen von $U_{BE}$ würden riesige Stromänderungen auslösen (und die Temperatur verschiebt $U_{BE}$ zusätzlich). Man begrenzt den Basisstrom mit einem Vorwiderstand: $R_B = (U_{ein} - U_{BE})/I_B$, und plant wegen der Streuung mit dem kleinsten B und einem Übersteuerungsfaktor.',
      hints: ['Was ist die Basis-Emitter-Strecke elektrisch gesehen?', 'Was passiert mit dem Strom, wenn du U_BE um 60 mV erhöhst?'],
      cards: ['bjt-stromgesteuert', 'bjt-rb'],
    },
    {
      id: 'deep-shockley', type: 'callout', tone: 'deep', title: 'Warum der Strom exponentiell mit U_BE wächst',
      md: `
Die Basis-Emitter-Diode folgt der [Shockley-Gleichung](wiki:Shockley-Gleichung|Shockley diode equation):

$$I_C \\approx I_S \\cdot e^{U_{BE}/U_T} \\qquad U_T = \\frac{k\\,T}{q} \\approx 25{,}85\\,\\mathrm{mV}\\ (\\text{bei }300\\,\\mathrm{K})$$

$U_T$ ist die **Temperaturspannung**. Rechenbeispiel: Erhöhst du $U_{BE}$ um $\\Delta U = U_T \\cdot \\ln 10 \\approx 60\\,\\mathrm{mV}$, wird der Kollektorstrom **zehnmal** so groß. Das erklärt, warum $U_{BE}$ praktisch immer „etwa 0,7 V“ ist — der Strom variiert über viele Dekaden, die Spannung nur über 100 bis 200 mV — und warum man Transistoren mit einem Strom und nicht mit einer Spannung einstellt. Mit der Temperatur ändert sich $I_S$ stark: Daraus folgt der Faustwert von etwa −2 mV/K für $U_{BE}$ bei konstantem Strom.[^et5-wp-bjt]`,
    },
    {
      id: 'history-lilienfeld', type: 'callout', tone: 'history', title: 'Der Transistor war schon 1925 erdacht',
      md: `
Die Idee eines Halbleiterverstärkers ist älter als der funktionierende Transistor: [Julius Edgar Lilienfeld](wiki:Julius Edgar Lilienfeld|Julius Edgar Lilienfeld) meldete 1925 ein Patent auf ein Feldeffekt-Bauelement an — es ließ sich damals aber nicht herstellen, weil die Reinheit der Halbleiter fehlte. Der Bell-Labs-Transistor von 1947 war ein Spitzentransistor aus [Germanium](wiki:Germanium|Germanium); den Bipolartransistor aus [Silizium](wiki:Silicium|Silicon) gibt es seit den 1950er-Jahren. Den Feldeffekttransistor lernst du in der Lektion zum MOSFET kennen.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>Deutsch</th><th>English</th><th>Hinweis</th></tr>
<tr><td>Bipolartransistor</td><td>bipolar junction transistor (BJT)</td><td>„bipolar“: beide Ladungsträgerarten</td></tr>
<tr><td>Basis / Kollektor / Emitter</td><td>base / collector / emitter</td><td>B, C, E</td></tr>
<tr><td>Stromverstärkung</td><td>current gain, h<sub>FE</sub></td><td>$B$ (Gleichstrom), $\\beta$ (Wechselstrom)</td></tr>
<tr><td>Sättigung</td><td>saturation</td><td>Schalter „ein“, U<sub>CE</sub> ≈ 0,2 V</td></tr>
<tr><td>Sperrbereich</td><td>cut-off</td><td>Schalter „aus“</td></tr>
<tr><td>Basisvorwiderstand</td><td>base resistor</td><td>begrenzt den Basisstrom</td></tr>
<tr><td>Übersteuerungsfaktor</td><td>overdrive factor</td><td>$\\ddot u = I_B \\cdot B_{min}/I_C$</td></tr>
<tr><td>Lastgerade</td><td>load line</td><td>$U_{CE} = U_B - R_C I_C$</td></tr></table>`,
    },
  ],
  cards: [
    { id: 'bjt-pins', front: 'Wie heißen die drei Anschlüsse des Bipolartransistors, und welcher ist der Steuereingang?', back: '**Basis (B)** = Steuereingang, **Kollektor (C)** und **Emitter (E)** = Hauptstrompfad.' },
    { id: 'bjt-npn-pnp', front: 'Woran erkennst du im Schaltzeichen npn und pnp?', back: 'Am **Emitterpfeil**: npn — Pfeil vom Basisstrich *weg*; pnp — Pfeil *zur* Basis hin (technische Stromrichtung).' },
    { id: 'bjt-ie', front: 'Welche Beziehung gilt zwischen $I_E$, $I_C$ und $I_B$?', back: '$I_E = I_C + I_B$ — der Emitter führt den größten Strom.' },
    { id: 'bjt-b', front: 'Gleichstromverstärkung $B$ — Definition?', back: '$B = I_C/I_B$, also $I_C = B\\cdot I_B$. Streut stark mit Exemplar und Temperatur.' },
    { id: 'bjt-beta', front: 'Wechselstromverstärkung $\\beta$ — Definition?', back: '$\\beta = \\Delta I_C/\\Delta I_B$ (Steigung der Kennlinie, Kleinsignal).' },
    { id: 'bjt-ube', front: 'Welche Spannung liegt am leitenden Si-Transistor zwischen Basis und Emitter?', back: '$U_{BE} \\approx 0{,}6\\ldots0{,}7\\,\\mathrm{V}$ (Katalog: etwa 0,6 V) — es ist eine Siliziumdiode.' },
    { id: 'bjt-stromgesteuert', front: 'Warum gilt der Bipolartransistor praktisch als „stromgesteuert“?', back: 'Weil $I_C = B\\cdot I_B$ und $U_{BE}$ bei Stromfluss fast konstant bleibt — man stellt den **Basisstrom** über einen Widerstand ein, nicht $U_{BE}$.' },
    { id: 'bjt-regions', front: 'Die drei Betriebsbereiche des Transistors?', back: '**Sperrbereich** (aus), **aktiver Bereich** (Verstärker, $I_C = B\\cdot I_B$), **Sättigung** (Schalter ein, $U_{CE} \\approx 0{,}2\\,\\mathrm{V}$).' },
    { id: 'bjt-sat', front: 'Wie groß ist $U_{CE}$ in Sättigung, und was begrenzt dort den Strom?', back: '$U_{CE,sat} \\approx 0{,}2\\,\\mathrm{V}$ (0,1 bis 0,3 V); die **Last** begrenzt den Strom, nicht mehr der Transistor.' },
    { id: 'bjt-rb', front: 'Formel für den Basisvorwiderstand im Schaltbetrieb?', back: '$R_B = \\dfrac{U_{ein} - U_{BE}}{I_B}$ mit $I_B = \\ddot u\\cdot I_C/B_{min}$, $\\ddot u \\approx 2\\ldots5$.' },
    { id: 'bjt-energy', front: 'Woher stammt die Leistung, die der Transistor „verstärkt“?', back: 'Aus der **Versorgungsspannungsquelle**. Der Basisstrom steuert nur, wie viel davon zur Last fließt.' },
    { id: 'bjt-temp', front: 'Wie ändert sich $U_{BE}$ mit der Temperatur (bei gleichem Strom)?', back: 'Es **sinkt** um etwa 2 mV pro Kelvin (Faustwert) — bei fester $U_{BE}$ würde der Strom steigen: thermisches Durchgehen.' },
    { id: 'bjt-loadline', front: 'Wie lautet die Lastgerade im Ausgangskennlinienfeld?', back: '$U_{CE} = U_B - R_C\\cdot I_C$; ihr Schnitt mit der Kennlinie des gewählten $I_B$ ist der **Arbeitspunkt**.' },
  ],
};
