export default {
  id: 'felder-und-wellen',
  title: 'Elektrisches, magnetisches und elektromagnetisches Feld',
  summary: 'Elektrische und magnetische Felder erkennen und berechnen (E = U/d, H = N·I/l), Feldlinien einer Antenne zuordnen und verstehen, wie aus einem veränderlichen Strom eine elektromagnetische Welle wird.',
  minutes: 20,
  goals: [
    'Einheiten der Feldstärken nennen: **V/m** für das elektrische, **A/m** für das magnetische Feld',
    'Die Feldstärke im Plattenkondensator ($E = U/d$) und im Ringkern ($H = N\\cdot I/l_\\mathrm{m}$) berechnen',
    'Feldlinien zuordnen: elektrische Feldlinien (Bögen, Anfang und Ende an Ladungen), magnetische (geschlossene Ringe)',
    'Entstehung und Ausbreitung einer [[elektromagnetische-welle|elektromagnetischen Welle]] beschreiben: $\\vec E$, $\\vec H$ und Ausbreitungsrichtung stehen senkrecht aufeinander',
  ],
  needs: ['elektrotechnik/elektrisches-feld', 'elektrotechnik/magnetfeld', 'elektrotechnik/wellen-felder-antennen-intro'],
  blocks: [
    {
      id: 'efeld', type: 'text', title: 'Das elektrische Feld',
      md: `
Zwischen zwei unterschiedlich geladenen Körpern herrscht ein **[[e-feld|elektrisches Feld]]** (vgl. [elektrisches Feld](wiki:Elektrisches Feld|Electric field)). Man zeichnet es mit **Feldlinien**: Sie beginnen an positiven Ladungen, enden an negativen und zeigen die Richtung der Kraft auf eine positive Probeladung. Zwischen den Platten eines **Plattenkondensators** laufen die Linien parallel und gleich dicht — ein **homogenes elektrisches Feld** (EB101). Die Platten tragen die [Ladung](wiki:Elektrische Ladung|Electric charge); ein isolierendes [Dielektrikum](wiki:Dielektrikum|Dielectric) dazwischen erhöht die Kapazität, ändert aber an der Feldstärke bei gleicher Spannung nichts.

Die **[elektrische Feldstärke](wiki:Elektrische Feldstärke|Electric field strength)** $E$ ist die Spannung pro Länge (Plattenabstand $d$):[^bnetza-formelsammlung]

$$E = \\frac{U}{d} \\qquad\\text{Einheit: } \\frac{\\text{V}}{\\text{m}}$$

Rechnen in Grundeinheiten! 9 V an 0,6 cm Abstand: $E = 9\\,\\text{V}/0{,}006\\,\\text{m} = 1500\\,\\text{V/m}$ (EB102). Ein Wickelkondensator mit 0,15 mm Kunststofffolie an 300 V: $E = 300/0{,}00015 = 2\\,000\\,000\\,\\text{V/m} = 2000\\,\\text{kV/m}$ (EB103). Solche dünnen Schichten halten enorme Feldstärken aus — bis zur **Durchschlagfeldstärke** $E_\\mathrm{d}$ des Isolierstoffs. Daraus folgt die **Durchschlagspannung** $U_\\mathrm{d} = E_\\mathrm{d}\\cdot d$: Eine 0,15 mm dicke PTFE-Folie mit 400 kV/cm hält $400\\,\\text{kV/cm}\\cdot0{,}015\\,\\text{cm} = 6\\,\\text{kV}$ aus (EB104). Luft schlägt schon bei etwa 3 kV/mm durch — deshalb funkt es zwischen eng stehenden Platten eines Drehkondensators in der Endstufe.`,
    },
    {
      id: 'viz-platten', type: 'viz', viz: 'field-plates', title: 'Plattenkondensator und Durchschlag',
      params: { goals: ['air', 'ptfe'] },
      task: 'Erfülle beide Ziele: **Luft** (300 V, kleinster Abstand ohne Durchschlag) und **PTFE** (Feld oberhalb der Luft-Durchschlagfestigkeit aushalten).',
    },
    {
      id: 'calc-e', type: 'numeric', title: 'Feldstärke im Plattenkondensator',
      question: 'An einem Plattenkondensator mit **2 mm** Plattenabstand liegen **500 V**. Wie groß ist die elektrische Feldstärke?',
      answer: 250, tolerance: 1, unit: 'kV/m',
      hint: '$E = U/d$ mit $d = 0{,}002\\,\\text{m}$.',
      explain: '$E = 500\\,\\text{V}/0{,}002\\,\\text{m} = 250\\,000\\,\\text{V/m} = 250\\,\\text{kV/m}$. Luft hält etwa 3000 kV/m (3 kV/mm) aus, hier ist also noch Reserve.',
    },
    {
      id: 'hfeld', type: 'text', title: 'Das magnetische Feld',
      md: `
Fließt ein Strom, entsteht um den Leiter ein **[Magnetfeld](wiki:Magnetfeld|Magnetism)** — das entdeckte Hans Christian Ørsted 1820 an einer abgelenkten Kompassnadel.[^darc-50ohm] Magnetische Feldlinien sind **immer in sich geschlossen**:

- Um einen **geraden Leiter** mit Gleichstrom verlaufen sie als **konzentrische Kreise** (EB201). Die Feldstärke fällt mit dem Abstand: $H = I/(2\\pi r)$.
- Im Inneren einer **langen Zylinderspule** (Gleichstrom) ist das Feld näherungsweise ein **homogenes magnetisches Feld** (EB202). Außen schließen sich die Linien als Streufeld; formt man die Spule zum Ring (**[Ringkern](wiki:Ringkernspule|Toroidal inductors and transformers)**), schließt sich das Feld fast vollständig im Kern.

Die **[magnetische Feldstärke](wiki:Magnetische Feldstärke|H-field)** $H$ hat die Einheit **Ampere pro Meter (A/m)** (EA104). Für $N$ Windungen auf einem Ringkern mit mittlerer Länge $l_\\mathrm{m} = \\pi\\cdot d_\\mathrm{m}$ gilt

$$H = \\frac{N\\cdot I}{l_\\mathrm{m}}$$

Beispiel (EB203): $d_\\mathrm{m} = 2{,}6\\,\\text{cm}$, $N = 6$, $I = 2{,}5\\,\\text{A}$ → $l_\\mathrm{m} = \\pi\\cdot0{,}026\\,\\text{m} = 0{,}0817\\,\\text{m}$ und $H = 6\\cdot2{,}5/0{,}0817 = 183{,}6\\,\\text{A/m}$. Die Fallen: den Durchmesser statt des **Umfangs** nehmen (5769 A/m ist $N\\cdot I/d$) und cm nicht umrechnen (zu klein um Faktor 100).

> **Merke die Einheiten:** E-Feld **V/m** (Spannung pro Meter), H-Feld **A/m** (Strom pro Meter). W/m wäre Leistung pro Länge, H/m gehört zur Permeabilität — beides ist es nicht.`,
    },
    {
      id: 'calc-h', type: 'numeric', title: 'Feldstärke im Ringkern',
      question: 'Ein Ringkern mit mittlerem Durchmesser **4 cm** trägt **10 Windungen**; es fließen **1 A**. Wie groß ist die mittlere magnetische Feldstärke?',
      answer: 79.6, tolerance: 1, unit: 'A/m',
      hint: '$l_\\mathrm{m} = \\pi\\cdot d$ mit $d$ in Metern, dann $H = N\\cdot I/l_\\mathrm{m}$.',
      explain: '$l_\\mathrm{m} = \\pi\\cdot0{,}04\\,\\text{m} = 0{,}1257\\,\\text{m}$; $H = 10\\cdot1\\,\\text{A}/0{,}1257\\,\\text{m} = 79{,}6\\,\\text{A/m}$.',
    },
    {
      id: 'em', type: 'text', title: 'Das elektromagnetische Feld und die Welle',
      md: `
Gleichströme und Gleichspannungen erzeugen **zeitlich konstante** Felder — interessant für Kondensator und Spule, aber sie strahlen nicht. Die Funktechnik lebt vom **zeitlich veränderlichen** Strom:

- Ein veränderliches Magnetfeld erzeugt in einem Leiter eine Spannung (**[Induktion](wiki:Elektromagnetische Induktion|Electromagnetic induction)**, Faraday 1831 — das Prinzip des Transformators).
- Umgekehrt erzeugt ein veränderliches elektrisches Feld ein Magnetfeld (Ladungen bewegen sich → Strom → Magnetfeld).
- Beide Felder brauchen keinen Leiter; sie existieren auch im Vakuum. Ein sich änderndes E-Feld erzeugt ein sich änderndes H-Feld, das wieder ein E-Feld erzeugt, und so weiter: Das Feld **löst sich von der Antenne** und läuft als **[elektromagnetische Welle](wiki:Elektromagnetische Welle|Electromagnetic wave)** davon.

Mathematisch fasst das [James Clerk Maxwell](wiki:James Clerk Maxwell|James Clerk Maxwell) in den **[Maxwellschen Gleichungen](wiki:Maxwell-Gleichungen|Maxwell's equations)** (1861–64); nachgewiesen hat die Wellen [Heinrich Hertz](wiki:Heinrich Hertz|Heinrich Hertz) 1886 — nach ihm heißt das Hertz. Mit [Lichtgeschwindigkeit](wiki:Lichtgeschwindigkeit|Speed of light) breiten sie sich im Freiraum aus (Licht ist selbst eine elektromagnetische Welle, vgl. [elektromagnetisches Spektrum](wiki:Elektromagnetisches Spektrum|Electromagnetic spectrum)).

Was die Prüfung wissen will:

1. **Entstehung (EB301):** Ein elektromagnetisches Feld entsteht, wenn ein **zeitlich veränderlicher Strom** durch einen Leiter fließt. Konstanter Strom oder konstante Spannung (auch an einem Isolator) genügen nicht.
2. **Ausbreitung (EB302):** durch **Wechselwirkung** von elektrischem und magnetischem Feld — nicht durch eines allein und nicht unabhängig voneinander.
3. **Geometrie im Fernfeld (EB303, EB304):** $\\vec E$ und $\\vec H$ stehen **90°** aufeinander, und die **Ausbreitungsrichtung steht senkrecht auf beiden** (alle drei rechtwinklig, wie die Raumachsen). 45°, 180° oder „phasengleich parallel“ sind falsch.`,
    },
    {
      id: 'viz-antenne', type: 'viz', viz: 'feldlinien-antenne', title: 'Feldlinien einer Vertikalantenne',
      params: { need: 4 },
      task: 'Ordne **vier** markierte Feldlinien (X) in Folge richtig zu: elektrisch oder magnetisch?',
    },
    {
      id: 'warn-felder', type: 'callout', tone: 'warning', title: 'Elektrische und magnetische Feldlinien der Antenne',
      md: `Bei der **Vertikalantenne** liegt die Antenne senkrecht. Der Strom fließt in ihr hin und her, an den Enden häufen sich abwechselnd positive und negative Ladungen: Die **elektrischen** Feldlinien laufen als **Bögen** von einem Ende zum anderen (sie beginnen und enden an Ladungen). Die **magnetischen** Feldlinien umlaufen den Strom als **waagerechte, geschlossene Ringe**. Falsche Katalogantworten wie „radiale“, „vertikale“ oder „offene“ Feldlinien sind keine Fachbegriffe für diese Unterscheidung. Prüfungsbezug: EB105, EB206.`,
    },
    {
      id: 'video', type: 'video', youtube: 'UmVe7LDDLSY', label: 'Amateurfunkvorlesung Klasse E – Lektion 7 Elektromagnetisches Feld und Lektion 8 (Teil 1)', channel: 'Computer Engineering @ JMU Würzburg',
      why: 'Vorlesungsaufzeichnung der Universität Würzburg zum Thema Elektromagnetisches Feld zur Vertiefung nach dieser Lektion.',
    },
    {
      id: 'match-einheiten', type: 'match', title: 'Feldgröße → Einheit',
      prompt: 'Ordne jeder Größe die passende Einheit zu.',
      pairs: [
        ['Elektrische Feldstärke', 'Volt pro Meter (V/m)'],
        ['Magnetische Feldstärke', 'Ampere pro Meter (A/m)'],
        ['Elektrische Spannung', 'Volt (V)'],
        ['Elektrische Stromstärke', 'Ampere (A)'],
      ],
    },
    {
      id: 'order-welle', type: 'order', title: 'Von der Antenne zur Welle',
      prompt: 'Bringe die Schritte der Wellenentstehung in eine sinnvolle Reihenfolge.',
      items: [
        'Ein zeitlich veränderlicher Strom fließt in der Antenne',
        'Er erzeugt ein veränderliches Magnetfeld und verschiebt Ladungen (veränderliches E-Feld)',
        'Veränderliches E-Feld und H-Feld erzeugen sich gegenseitig',
        'Die Felder lösen sich von der Antenne',
        'Im Fernfeld stehen E, H und Ausbreitungsrichtung senkrecht aufeinander',
      ],
      explain: 'Ohne zeitliche Änderung (Gleichstrom) gibt es keine Abstrahlung.',
    },
    {
      id: 'quiz-em', type: 'quiz', title: 'Wann strahlt ein Leiter?',
      question: 'Durch welchen der folgenden Fälle entsteht ein **elektromagnetisches Feld**, das sich ausbreiten kann?',
      options: [
        { text: 'Ein Wechselstrom fließt durch einen Draht.', correct: true, why: 'Ein zeitlich veränderlicher Strom erzeugt wechselnde E- und H-Felder, die sich ablösen.' },
        { text: 'Ein konstanter Gleichstrom fließt durch einen Draht.', why: 'Das ergibt nur ein zeitlich konstantes Magnetfeld ohne Abstrahlung.' },
        { text: 'Eine konstante Spannung liegt an einem Isolator an.', why: 'Ein statisches E-Feld, keine Welle.' },
        { text: 'Ein Magnet liegt ruhig auf dem Tisch.', why: 'Ein zeitlich konstantes Magnetfeld strahlt nicht.' },
      ],
    },
    {
      id: 'mission-felder', type: 'callout', tone: 'mission', title: 'Funkpraxis: Warum die Antenne strahlt',
      md: `Dein Sender erzeugt einen hochfrequenten Wechselstrom (z. B. 7,1 MHz = 7,1 Millionen Richtungswechsel pro Sekunde), der in der Antenne fließt. Gerade weil er sich ändert, löst sich jedes Mal ein Stück Feld ab und läuft als Welle davon. Mit einem Gleichstrom funktioniert das nicht. Und: Die Feldstärke in V/m am Ort einer Antenne spielt später im Personenschutz (BEMFV-Grenzwerte) eine Rolle — die Einheit V/m aus dieser Lektion kommt dort wieder vor.`,
    },
    {
      id: 'recall-felder', type: 'recall', title: 'In eigenen Worten',
      prompt: 'Erkläre, wie aus dem Strom in einer Antenne eine elektromagnetische Welle wird. Welche Beziehung haben E-Feld, H-Feld und Ausbreitungsrichtung im Fernfeld, und in welchen Einheiten misst man die beiden Feldstärken?',
      answer: 'Ein zeitlich veränderlicher Strom (Wechselstrom) in der Antenne erzeugt ein sich änderndes Magnetfeld und bewegt Ladungen, was ein sich änderndes elektrisches Feld ergibt. Beide Felder erzeugen sich gegenseitig, lösen sich von der Antenne ab und breiten sich als Welle aus. Im Fernfeld stehen E-Feld, H-Feld und Ausbreitungsrichtung jeweils im rechten Winkel zueinander. Die elektrische Feldstärke wird in V/m gemessen, die magnetische in A/m.',
      cards: ['fel-welle', 'fel-einheiten'],
    },
  ],
  cards: [
    { id: 'fel-einheiten', front: 'Einheit der elektrischen und der magnetischen Feldstärke?', back: 'Elektrisch: **V/m**. Magnetisch: **A/m**.' },
    { id: 'fel-e', front: 'Elektrische Feldstärke im Plattenkondensator?', back: '$E=U/d$ (V/m); homogenes elektrisches Feld. In Metern rechnen!' },
    { id: 'fel-ud', front: 'Durchschlagspannung eines Dielektrikums?', back: '$U_\\mathrm{d}=E_\\mathrm{d}\\cdot d$; 400 kV/cm · 0,015 cm = 6 kV.' },
    { id: 'fel-h', front: 'Magnetische Feldstärke im Ringkern?', back: '$H=\\dfrac{N\\cdot I}{l_\\mathrm{m}}$ mit $l_\\mathrm{m}=\\pi\\cdot d_\\mathrm{m}$ (Umfang, nicht Durchmesser).' },
    { id: 'fel-draht', front: 'Magnetische Feldlinien um einen geraden Leiter?', back: 'Konzentrische Kreise um den Leiter; magnetische Feldlinien sind immer geschlossen.' },
    { id: 'fel-spule', front: 'Feld im Inneren einer langen Zylinderspule?', back: 'Näherungsweise **homogenes magnetisches Feld**.' },
    { id: 'fel-entstehung', front: 'Wann entsteht ein elektromagnetisches Feld?', back: 'Wenn ein **zeitlich veränderlicher** Strom durch einen Leiter fließt.' },
    { id: 'fel-welle', front: 'Wie breitet sich eine EM-Welle aus?', back: 'Durch gegenseitige **Wechselwirkung** von E- und H-Feld.' },
    { id: 'fel-90', front: 'Winkel E–H im Fernfeld? Ausbreitungsrichtung?', back: '90°; E, H und Ausbreitungsrichtung stehen paarweise **senkrecht**.' },
    { id: 'fel-ant', front: 'Feldlinien einer Vertikalantenne?', back: 'Elektrisch: Bögen (Enden an Ladungen). Magnetisch: waagerechte geschlossene Ringe um die Antenne.' },
    { id: 'fel-luft', front: 'Durchschlagfestigkeit von Luft?', back: 'Etwa 3 kV/mm (3000 kV/m) — Grund für Überschläge in Drehkondensatoren.' },
  ],
};
