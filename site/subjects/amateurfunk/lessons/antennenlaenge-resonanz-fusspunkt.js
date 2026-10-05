export default {
  id: 'antennenlaenge-resonanz-fusspunkt',
  title: 'Antennenlänge, Resonanz, Fußpunktimpedanz und Speisung',
  summary: 'Verkürzungsfaktor und Drahtlängen (λ/2, 5/8 λ, Faltdipol), Strom und Spannung auf dem Dipol, Strom- und Spannungsspeisung, Fußpunktwiderstände, Standortwahl und Kfz-Einbau.',
  minutes: 20,
  goals: [
    'Drahtlängen aus der Frequenz berechnen (λ/2, λ/4, 5/8 λ, Faltdipol) und den [[verkuerzungsfaktor]] richtig anwenden (etwa 0,95)',
    'Strom- und Spannungsverteilung auf dem Halbwellendipol benennen (Strombauch in der Mitte, Spannungsbauch an den Enden)',
    '[[stromspeisung]] (niederohmig) und [[spannungsspeisung]] (hochohmig) unterscheiden und den [[fusspunktimpedanz|Fußpunktwiderstand]] von Dipol, Faltdipol und Groundplane zuordnen',
    'Eine Antenne so aufstellen, dass sie sendet, ohne Nachbarn und Hausinstallation zu stören; Funkgerät und Antenne sicher im Kfz einbauen',
  ],
  needs: ['amateurfunk/dipol-und-rundstrahler', 'elektrotechnik/schwingkreis'],
  blocks: [
    {
      id: 'intro', type: 'text', title: 'Wie lang muss eine Antenne sein?',
      md: `
Kurze Antwort: nicht unbedingt eine bestimmte Länge. Eine Drahtantenne für den Kurzwellenbereich kann **grundsätzlich jede beliebige Länge** haben, sofern man sie über ein Anpassgerät (Antennentuner, vgl. [Anpassungsnetzwerk](wiki:Antennentuner|Antenna tuner)) an die Speiseleitung anpasst. Vorgeschrieben ist weder $\\lambda/2$ noch $\\lambda/4$ noch $3/4\\,\\lambda$; solche Längen sind nur bequem, weil die Antenne dann von selbst resonant ist und ohne Tuner direkt zum Kabel passt.

Wie genau diese „bequemen“ Längen (etwa die des [Halbwellendipols](wiki:Dipolantenne|Dipole antenna)) aus der Frequenz folgen, und welche Spannung und welcher Strom dabei am Speisepunkt anliegen, ist das Thema dieser Lektion.
`,
    },
    {
      id: 'kv', type: 'text', title: 'Wellenlänge, Verkürzungsfaktor und Drahtlängen',
      md: `
Im Vakuum und näherungsweise in der Luft gilt mit der [Lichtgeschwindigkeit](wiki:Lichtgeschwindigkeit|Speed of light) $c$:

$$\\lambda = \\frac{c}{f}\\qquad\\Rightarrow\\qquad \\lambda[\\text{m}] \\approx \\frac{300}{f[\\text{MHz}]}$$

Auf einem Draht oder einer Leitung breitet sich die Welle etwas **langsamer** aus. Das beschreibt der **[[verkuerzungsfaktor|Verkürzungsfaktor]]** $k_\\mathrm{v}$ (siehe [Verkürzungsfaktor](wiki:Verkürzungsfaktor|Velocity factor)): das **Verhältnis der Ausbreitungsgeschwindigkeit entlang einer Leitung zur Ausbreitungsgeschwindigkeit im Vakuum**. Die Wellenlänge auf der Leitung ist

$$\\lambda_\\text{Leitung} = k_\\mathrm{v}\\cdot\\frac{c}{f}$$

Für Drahtantennen rechnet man üblicherweise mit $k_\\mathrm{v}\\approx 0{,}95$ (95 %): Die Antenne wird etwa **5 % kürzer** als die rechnerische Länge, damit sie resonant ist. Der genaue Wert hängt vom Drahtdurchmesser, einer Isolierung (Dielektrikum) und der Umgebung ab. Bei Koaxialkabeln bestimmt vor allem das Dielektrikum den Verkürzungsfaktor, nicht Durchmesser oder Länge. Der Verkürzungsfaktor ist **nicht** das Verhältnis von Durchmesser zu Länge, nicht der Quotient aus Leiter- und Fußpunktwiderstand und nicht die Wurzel aus L/C einer Leitung (das wäre der Wellenwiderstand).

Daraus folgen die Längen der wichtigsten Antennen:

| Antenne | Länge | Beispiel 28,5 MHz ($\\lambda\\approx 10{,}53$ m) |
|---|---|---|
| Halbwellendipol | $\\lambda/2$ (mal $k_\\mathrm{v}$) | $5{,}26$ m, mit 0,95 etwa $5{,}0$ m |
| $\\lambda/4$-Strahler | $\\lambda/4$ | $2{,}63$ m |
| 5/8-$\\lambda$-Strahler | $\\tfrac{5}{8}\\lambda$ | $\\dfrac{300}{28{,}5}\\cdot\\tfrac{5}{8} = 6{,}58$ m |
| [[faltdipol|Faltdipol]] | Drahtlänge $\\approx\\lambda$ (eine Wellenlänge) | $10{,}5$ m |

Der Faltdipol ist im Prinzip eine plattgedrückte Ganzwellen-Schleife: Der Draht ist insgesamt eine Wellenlänge lang, nicht eine halbe, zwei oder vier.
`,
    },
    {
      id: 'demo-laenge', type: 'viz', viz: 'dipol-laenge', title: 'Dipol-Längenrechner',
      params: { f: 7.1, L: 24 },
      intro: 'Stelle Band und Verkürzungsfaktor ein und verändere die **Drahtlänge**. Die Marke zeigt die Resonanzfrequenz deines Drahtes ($f = k\\cdot 150/L$). Darunter siehst du Längen für $\\lambda/4$, 5/8 $\\lambda$ und den Faltdipol sowie Strom und Spannung auf dem Dipol.',
      task: 'Stimme den Dipol auf die Betriebsfrequenz ab (±1,5 %). Mach das zuerst mit einem zu langen Draht (kürzen!) und dann noch einmal auf 2 m (145 MHz).',
    },
    {
      id: 'sv', type: 'text', title: 'Strom und Spannung auf dem Dipol: Bauch und Knoten',
      md: `
Auf einem schwingenden Halbwellendipol pendeln Ladungen hin und her. In der **Mitte** werden besonders viele Ladungen bewegt: dort ist der **Strom** am größten, ein **Strombauch** (Maximum). An den **Enden** können keine Ladungen weiter, dort ist der Strom null (**Stromknoten**), dafür türmt sich die Ladung auf: die **Spannung** ist am größten, ein **Spannungsbauch**. In der Mitte ist die Spannung dagegen null, ein **Spannungsknoten**. Merke: Strom und Spannung sind auf dem Dipol gegeneinander um eine Viertelwelle versetzt (siehe [stehende Welle](wiki:Stehende Welle|Standing wave)):

- **Enden:** Stromknoten und Spannungsbauch, immer.
- **Mitte:** Spannungsknoten und Strombauch.

Dennoch fließt Leistung nur, wo **Spannung und Strom** zusammen vorhanden sind ($P = U\\cdot I$); aber das Verhältnis $R = U/I$ am Speisepunkt hängt davon ab, wo du einspeist:

- **[[stromspeisung|Stromspeisung]]:** Am Speisepunkt liegen ein **Spannungsknoten und ein Strombauch**. Es ist viel Strom bei wenig Spannung nötig, der Widerstand $R = U/I$ ist klein: die Antenne ist **niederohmig**. Ein Halbwellendipol wird auf der Grundfrequenz **in der Mitte stromgespeist**.
- **[[spannungsspeisung|Spannungsspeisung]]:** Am Speisepunkt liegen ein **Spannungsbauch und ein Stromknoten**: wenig Strom bei hoher Spannung, der Widerstand ist groß, **hochohmig**. Der **endgespeiste Halbwellendipol** (End-Fed, Fuchs-Antenne) ist spannungsgespeist und braucht dafür ein Anpassglied.

Üblich sind für stromgespeiste Antennen etwa 36 bis 100 Ω, für spannungsgespeiste einige Tausend Ohm (rund 1500 bis 4000 Ω). Das Schema $R = U/I$ ist das [ohmsche Gesetz](wiki:Ohmsches Gesetz|Ohm's law) angewandt auf den Speisepunkt.

Ein mittengespeister Dipol ist übrigens nur bei **ungeraden** Vielfachen seiner Grundfrequenz resonant (bei geraden Vielfachen entsteht in der Mitte ein Stromknoten). Mehrbandantennen verlegen deshalb den Speisepunkt (Windom) oder speisen am Ende (EFHW) und benötigen dann Anpassgeräte.
`,
    },
    {
      id: 'warn-sv', type: 'callout', tone: 'warning', title: 'Typisches Durcheinander: Bauch, Knoten, hochohmig, niederohmig',
      md: `Bei Spannungsspeisung liegt am Speisepunkt ein **Spannungsbauch** (und ein Stromknoten) und die Antenne ist **hochohmig**; bei Stromspeisung liegt dort ein **Strombauch** (und ein Spannungsknoten) und sie ist **niederohmig**. Gedächtnisstütze: Spannung ist viel, Strom ist wenig, $R = U/I$ ist groß, also hochohmig. An den **Enden** eines Dipols gilt immer Stromknoten und Spannungsbauch; am Einspeisepunkt kommt es darauf an, **wo** du einspeist: in der Mitte Strombauch, am Ende Spannungsbauch. Ein „immer Spannungsknoten und Strombauch“ am Einspeisepunkt ist falsch. Ein mittengespeister Halbwellendipol ist weder „spannungsgespeist“ noch „endgespeist“ noch „parallel gespeist“. Prüfungsbezug: EG203 bis EG206.`,
    },
    {
      id: 'fuss', type: 'text', title: 'Fußpunktimpedanz: der Widerstand am Speisepunkt',
      md: `
Die **[[fusspunktimpedanz|Fußpunktimpedanz]]** (eine [Impedanz](wiki:Impedanz|Electrical impedance), auch Fußpunktwiderstand oder Speisewiderstand) ist das Verhältnis von Spannung zu Strom am Speisepunkt einer Antenne. Sie hängt von der Bauform ab und, bei tiefen Antennen, von der Aufbauhöhe über dem Boden. Sie ist für die Anpassung an das Koaxkabel (50 Ω) entscheidend, und jeder Fehler äußert sich als SWR (übernächste Lektion).

| Antenne | Fußpunktwiderstand |
|---|---|
| mittengespeister Halbwellendipol im Freiraum (Höhe ab etwa $\\lambda$) | etwa 73 Ω, grob **75 Ω** |
| derselbe Dipol bei geringerer Höhe (Bodeneinfluss) | **40 bis 90 Ω** |
| Faltdipol | **240 bis 300 Ω** (etwa viermal der einfache Dipol) |
| Groundplane ($\\lambda/4$ mit Radials) | **30 bis 50 Ω** |
| endgespeister Halbwellendraht | hochohmig, einige kΩ |

Warum? Beim Faltdipol verdoppelt die Schleife die anliegende Spannung bei halbem Strom, das ergibt den vierfachen Widerstand. Bei der Groundplane fehlt ein Dipolschenkel (die Erde ersetzt ihn), deshalb halbiert sich der Wert auf etwa 37 Ω; mit um 45° nach unten geneigten Radials kommt man auf etwa 50 Ω. Dann passt sie direkt zu 50-Ω-Koaxkabel.

Wichtig: Der Dipol hat **etwa 73 Ω**, nicht 50 Ω, nicht 30 Ω und nicht 600 Ω. Bei Direktspeisung mit 50-Ω-Kabel entsteht daher eine kleine Fehlanpassung (SWR etwa 1,5); für ein ideales SWR kann man eine Anpassung vorsehen.
`,
    },
    {
      id: 'standort', type: 'text', title: 'Standortwahl: Antenne draußen und weit weg von Elektronik',
      md: `
Eine Sendeantenne beeinflusst und wird beeinflusst von allem, was in der Nähe liegt: Hausverkabelung, Fernseher, Router, Nachbarn. Daraus folgen einfache Regeln:

1. **Antenne möglichst im Außenbereich.** Draußen ist die **Kopplung mit den elektrischen Leitungen im Haus reduziert**. Das ist der Vorteil, nicht weniger Oberwellen und kein niedrigerer Pegel.
2. **Drahtantenne auf Kurzwelle rechtwinklig vom Haus wegführen.** Dann liegt sie nicht parallel zu den Leitungen im Haus. Im Reihenhaus zum Beispiel: Drahtführung **rechtwinklig zur Häuserzeile**, nicht entlang der Dachrinne, nicht neben der Fernsehantenne am Schornstein und nicht im Dachbereich.
3. **Richtantennen so hoch und so weit weg wie möglich** vom Nachbarn (die Feldstärke nimmt mit der Entfernung ab). Nicht niedrig und nah am Haus, nicht an der Seitenwand zum Nachbarn.

Auch **Netzkabel und HF-Leitungen gehören nicht gemeinsam in einen Kabelkanal**, weil eine eingekoppelte Hochfrequenz ins Versorgungsnetz geraten kann (Einkopplung), und umgekehrt (siehe EMV-Lektionen, [elektromagnetische Verträglichkeit](wiki:Elektromagnetische Verträglichkeit|Electromagnetic compatibility)).
`,
    },
    {
      id: 'kfz', type: 'text', title: 'Funk im Auto: Einbau und Sicherheit',
      md: `
Mobilfunk im Auto macht Spaß (die Bordspannung kommt aus der [Starterbatterie](wiki:Fahrzeugbatterie|Automotive battery)), will aber sorgfältig eingebaut sein:

- **Anweisungen des Kfz-Herstellers** beachten (Einbauorte, Leitungsführung, Anschluss). Sonst droht die **Zulassung** des Fahrzeugs ungültig zu werden. Nicht die Bundesnetzagentur und nicht das Kraftfahrt-Bundesamt oder der Funkgerätehersteller sind hier maßgeblich.
- **Antenne mittig auf dem Metalldach** (vor allem VHF/UHF). Dann bildet das Dach das Gegengewicht, wie die Erde bei der Marconi-Antenne. Nicht auf Stoßstange, Kotflügel oder Armaturenbrett.
- **Antennenkabel kurz** halten und **nicht parallel und möglichst weit entfernt von der Fahrzeugverkabelung** verlegen (nicht im Kabelbaum, nicht entlang des Motorraums), damit das Sendesignal die Fahrzeugelektronik nicht stört. Kreuzen anderer Leitungen ist meist unkritisch.
- **Versorgungsspannung:** 12 V Gleichspannung sind für den Menschen ungefährlich (kein Stromschlag), aber die Fahrzeugbatterie liefert **sehr hohe Ströme**. Bei Kurzschluss droht ein **[Lichtbogen](wiki:Lichtbogen|Electric arc), ein Kabelbrand oder Fahrzeugbrand**. Deshalb gehört in die Versorgungsleitung immer eine Sicherung passender Stärke, möglichst dicht an der Batterie.
`,
    },
    {
      id: 'mission-kfz', type: 'callout', tone: 'mission', title: 'Funkpraxis: Magnetfuß aufs Autodach',
      md: `Die schnellste Mobilstation für 2 m/70 cm ist ein Funkgerät mit **Magnetfußantenne mittig auf dem Autodach**. Das Dach ist das Gegengewicht, die Antenne ein λ/4- oder 5/8-λ-Strahler. Kabel nicht durch den Motorraum, Stromversorgung mit eigener Sicherung direkt an der Batterie. Der Betrieb während der Fahrt ist nur mit Freisprecheinrichtung erlaubt, wie beim Handy.`,
    },
    {
      id: 'q-sv', type: 'quiz', title: 'Speisung und Widerstand',
      question: 'Eine Antenne wird so gespeist, dass am Speisepunkt ein **Spannungsbauch und ein Stromknoten** liegen. Welche Aussage stimmt?',
      options: [
        { text: 'Die Antenne ist spannungsgespeist und hochohmig, z. B. der endgespeiste Halbwellendraht.', correct: true, why: 'Viel Spannung bei wenig Strom: R = U/I ist groß.' },
        { text: 'Die Antenne ist stromgespeist und niederohmig, wie der mittengespeiste Dipol.', why: 'Das wäre ein Strombauch mit Spannungsknoten.' },
        { text: 'Das gibt es nicht, am Speisepunkt muss immer ein Strombauch liegen.', why: 'Doch: an den Enden liegt immer ein Spannungsbauch, und wer dort einspeist, speist spannungsgespeist.' },
        { text: 'Die Antenne ist stromgespeist und hochohmig.', why: 'Stromspeisung heißt niederohmig; hochohmig gehört zur Spannungsspeisung.' },
      ],
    },
    {
      id: 'q-standort', type: 'quiz', title: 'Wohin mit der Drahtantenne?',
      question: 'Du wohnst in einem Reihenhaus und willst im 80-m-Band senden. Wie führst du den Draht, um Störungen bei den Nachbarn und im Haus gering zu halten?',
      options: [
        { text: 'Rechtwinklig von der Häuserzeile weg, möglichst weit vom Dach.', correct: true, why: 'So koppelt die Antenne am wenigsten auf parallele Leitungen im Haus.' },
        { text: 'Entlang der Häuserzeile in Höhe der Dachrinne.', why: 'Parallel zu den Hausleitungen koppelt die Antenne stark ein.' },
        { text: 'Am gemeinsamen Schornstein neben der Fernsehantenne.', why: 'Direkt neben der Fernsehantenne und dem Fernsehkabel ist die Gefahr von Einstreuungen am größten.' },
        { text: 'Möglichst im Dachboden, damit niemand etwas merkt.', why: 'Innen koppelt die Antenne fest auf die Elektroinstallation; außen ist besser.' },
      ],
    },
    {
      id: 'num-58', type: 'numeric', title: '5/8 λ im 2-m-Band',
      question: 'Berechne die elektrische Länge eines 5/8-$\\lambda$-Vertikalstrahlers für 145 MHz.',
      answer: 1.293, tolerance: 0.02, unit: 'm',
      hint: 'Wellenlänge 300/145 m, dann mal 5/8.',
      explain: '$\\lambda = 300/145 = 2{,}069$ m; $\\tfrac58\\lambda = 1{,}293$ m (elektrische Länge, ohne Verkürzungsfaktor). Beim Beispiel 28,5 MHz ergibt dieselbe Rechnung 6,58 m.',
    },
    {
      id: 'num-faltdipol', type: 'numeric', title: 'Drahtlänge für einen Faltdipol',
      question: 'Wie viel Draht (insgesamt) brauchst du für einen Faltdipol für 145 MHz (rechne mit einer Wellenlänge, ohne Verkürzungsfaktor)?',
      answer: 2.07, tolerance: 0.04, unit: 'm',
      explain: 'Der Faltdipol hat insgesamt eine Wellenlänge Draht: $\\lambda = 300/145\\approx 2{,}07$ m.',
    },
    {
      id: 'match-fuss', type: 'match', title: 'Antenne und Fußpunktwiderstand',
      prompt: 'Ordne jeder Antenne den ungefähren Fußpunktwiderstand zu.',
      pairs: [
        ['Halbwellendipol im Freiraum', 'etwa 73 Ω (grob 75 Ω)'],
        ['Halbwellendipol in geringer Höhe', '40 bis 90 Ω'],
        ['Faltdipol', '240 bis 300 Ω'],
        ['Groundplane', '30 bis 50 Ω'],
        ['Endgespeister Halbwellendraht', 'hochohmig (einige kΩ)'],
      ],
    },
    {
      id: 'order-kfz', type: 'order', title: 'Mobilstation einbauen',
      prompt: 'Bringe die Schritte in eine sinnvolle Reihenfolge.',
      items: [
        'Einbauhinweise des Kfz-Herstellers lesen (Zulassung nicht gefährden)',
        'Antenne mittig auf dem Metalldach montieren',
        'Antennenkabel kurz und mit Abstand zu den Fahrzeugleitungen verlegen',
        'Versorgungsleitung mit Sicherung direkt an der Batterie anschließen',
        'Funktion prüfen (SWR messen, Störungen der Fahrzeugelektronik beobachten)',
      ],
      explain: 'Erst die Vorgaben, dann Antenne und Kabel, zuletzt der Stromanschluss mit Sicherung und die Funktionsprobe.',
    },
    {
      id: 'recall-fuss', type: 'recall', title: 'In eigenen Worten',
      prompt: 'Erkläre, warum ein endgespeister Halbwellendraht ein Anpassglied braucht, ein mittengespeister Dipol aber nicht. Nenne dazu die Verteilung von Strom und Spannung und typische Widerstandswerte.',
      answer: 'Auf dem Halbwellendraht liegt in der Mitte ein Strombauch (Spannungsknoten), an den Enden ein Spannungsbauch (Stromknoten). In der Mitte ist die Antenne stromgespeist und niederohmig (etwa 73 Ω, 40 bis 90 Ω je nach Höhe), das passt grob zum 50-Ω-Kabel. Am Ende ist sie spannungsgespeist: viel Spannung bei wenig Strom, R = U/I ist hoch (einige kΩ), das passt nicht zu 50 Ω. Darum braucht die End-Fed ein Anpassglied (z. B. Fuchskreis).',
      cards: ['fp-sv', 'fp-widerstaende'],
    },
    {
      id: 'wrap', type: 'callout', tone: 'fact', title: 'Zum Mitnehmen',
      md: `Länge ergibt sich aus $\\lambda=300/f$ und dem Verkürzungsfaktor (etwa 0,95), Fußpunktwiderstand aus Bauform und Speisepunkt (Mitte: niederohmig, Ende: hochohmig). Beides entscheidet, ob die Antenne ohne Anpassung zum 50-Ω-Kabel passt.[^darc-50ohm]`,
    },
  ],
  cards: [
    { id: 'fp-kv', front: 'Verkürzungsfaktor: Definition und Größe', back: 'Verhältnis der Ausbreitungsgeschwindigkeit auf der Leitung zu der im Vakuum; für Drahtantennen etwa 0,95 (95 %), die Antenne wird etwa 5 % kürzer.' },
    { id: 'fp-beliebig', front: 'Muss eine KW-Drahtantenne λ/2 lang sein?', back: 'Nein, sie kann grundsätzlich beliebig lang sein (mit Anpassgerät).' },
    { id: 'fp-58', front: '5/8-λ-Strahler bei 28,5 MHz?', back: '$300/28{,}5\\cdot 5/8 = 6{,}58$ m.' },
    { id: 'fp-falt', front: 'Länge des Drahtes eines Faltdipols', back: 'Eine Wellenlänge (plattgedrückte Ganzwellen-Schleife).' },
    { id: 'fp-enden', front: 'Strom und Spannung an den Dipolenden', back: 'Stromknoten und Spannungsbauch (immer). In der Mitte: Strombauch und Spannungsknoten.' },
    { id: 'fp-sv', front: 'Stromspeisung vs. Spannungsspeisung', back: 'Stromspeisung: Strombauch + Spannungsknoten am Speisepunkt, niederohmig. Spannungsspeisung: Spannungsbauch + Stromknoten, hochohmig. Halbwellendipol in der Mitte: stromgespeist.' },
    { id: 'fp-widerstaende', front: 'Fußpunktwiderstände', back: 'Dipol 73 Ω (≈ 75 Ω im Freiraum, 40 bis 90 Ω je nach Höhe), Faltdipol 240 bis 300 Ω, Groundplane 30 bis 50 Ω, End-Fed einige kΩ.' },
    { id: 'fp-aussen', front: 'Vorteil einer Außenantenne?', back: 'Die Kopplung mit den elektrischen Leitungen im Haus ist geringer.' },
    { id: 'fp-richt', front: 'Standort einer HF-Richtantenne (Störungen beim Nachbarn)?', back: 'So hoch und so weit weg wie möglich.' },
    { id: 'fp-reihe', front: '80-m-Draht am Reihenhaus', back: 'Drahtführung rechtwinklig zur Häuserzeile.' },
    { id: 'fp-kfzhersteller', front: 'Funkgeräteinbau im Kfz: wessen Anweisungen?', back: 'Die des Kfz-Herstellers (sonst erlischt die Zulassung).' },
    { id: 'fp-kfzantenne', front: 'Kfz: Antennenort und Kabelführung', back: 'Mitte des Metalldaches; Kabel nicht parallel und möglichst weit weg von der Fahrzeugverkabelung. Bordnetz: Gefahr Lichtbogen/Fahrzeugbrand, daher Sicherung.' },
  ],
};
