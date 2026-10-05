export default {
  id: 'koerperstrom-schutz',
  title: 'Wirkung des Stroms auf den Körper und Schutzklassen',
  summary: 'Gefährlich ist der Strom durch den Körper, nicht die Spannung allein. Du lernst Größenordnungen der Wirkungen, die 50-V-Grenze der Schutzkleinspannung, die drei Schutzklassen und die Regeln für Arbeiten am Netzteil.',
  minutes: 30,
  needs: ['leistung-und-energie', 'reale-quellen'],
  goals: [
    'Erklären, wovon die Gefährlichkeit eines [[stromunfall|Stromunfalls]] abhängt (Stromhöhe, Dauer, Weg, Stromart/Frequenz)',
    'Den Körperstrom $I=U/R_K$ abschätzen und die Wirkungsbereiche qualitativ einordnen',
    'Die Grenze der [[schutzkleinspannung|Schutzkleinspannung]] (50 V AC / 120 V DC) und ihre Bedeutung nennen',
    'Die [[schutzklasse|Schutzklassen]] I, II und III unterscheiden und ihre Symbole erkennen',
    'Vor Arbeiten an Netzgeräten die Sicherheitsmaßnahmen in richtiger Reihenfolge benennen (Netztrennen, Entladen, Prüfen)',
  ],
  blocks: [
    {
      id: 'idee', type: 'text', title: 'Der Strom macht den Schaden, nicht die Spannung',
      md: `
Ein Vogel auf der Hochspannungsleitung stirbt nicht, ein Mensch mit nassen Händen an 230 V aber schon ([Stromunfall](wiki:Stromunfall|Electrical injury)). Der Unterschied liegt nicht in der Spannung, sondern im **Stromkreis**: Der Vogel sitzt nur an einem Leiter – es fließt kein Strom durch ihn. Der Mensch bildet einen Pfad zwischen zwei Potentialen, und durch ihn fließt nach dem ohmschen Gesetz

$$I = \\frac{U}{R_K}$$

Die Spannung bestimmt den Strom also nur **zusammen** mit dem Körperwiderstand $R_K$ ([ohmsches Gesetz](wiki:Ohmsches Gesetz|Ohm's law)). Der besteht aus dem Übergangswiderstand an der Haut (trocken sehr hoch, nass klein), dem Körperinneren und dem Übergang zum Boden (Schuhe, Bodenbelag). Für den Weg Hand–Fuß werden Werte von etwa 500 Ω bis 3 kΩ genannt; der Widerstand ist nicht konstant und sinkt bei höherer Spannung, weil die Haut „durchschlägt".[^wp-stromunfall]

Was am Ende passiert, hängt von vier Dingen ab:

1. **Stromstärke** – wenige Milliampere spürt man, einige zehn Milliampere gefährden das Herz.
2. **Einwirkdauer** – je länger, desto gefährlicher.
3. **Stromweg** – quer durch den Brustkorb (Hand–Hand, Brust–Hand) ist schlimmer als Fuß–Fuß.
4. **Stromart und Frequenz** – Wechselstrom von 50 Hz ist bei niedriger Spannung deutlich gefährlicher als Gleichstrom (je nach Quelle um etwa den Faktor 4–5).`,
    },
    {
      id: 'wirkung', type: 'text', title: 'Wirkungsbereiche – nur als grobe Orientierung',
      md: `
Die folgenden Größenordnungen gelten für **Wechselstrom von 50 Hz** und den Weg Hand–Fuß; sie schwanken von Person zu Person (Kinder und Frauen sind empfindlicher), und es sind **keine medizinischen Grenzwerte**. Die Zahlen stammen aus der Fachliteratur (u. a. der Wikipedia-Zusammenfassung zu den Werten der IEC/TS 60479-1) und dienen nur dazu, das Gefühl für die Größenordnung zu schärfen:[^wp-stromunfall]

- **Wahrnehmungsschwelle:** individuell zwischen etwa 10 µA und 4 mA – man spürt ein Kribbeln.
- **Loslassgrenze:** um 10 mA (etwa 6–9 mA bei Erwachsenen): Die Beugemuskeln krampfen, man kann die Spannungsquelle **nicht mehr loslassen** – damit verlängert sich die Einwirkdauer.
- **Rhythmusstörungen und Atemverkrampfung:** ab etwa 25–30 mA sind Herzrhythmusstörungen möglich, ab 30–50 mA verkrampft der Brustkorb.
- **[Herzkammerflimmern](wiki:Kammerflimmern|Ventricular fibrillation):** ab etwa 50 mA bei einer Einwirkdauer von mehr als einer Sekunde; je nach Stromweg schon ab 27–40 mA. Das Herz pumpt dann kein Blut mehr – lebensgefährlich.[^wp-kammerflimmern]
- **Verbrennungen:** ab etwa 100 mA deutlich.

Der Prüfungskatalog fasst es so: Das Berühren elektrischer Spannung kann ab **50 V Wechselspannung bzw. 120 V Gleichspannung** lebensgefährlich werden (**NK301**); gefährlich sind Körperdurchströmung, Störlichtbogen und Sekundärunfälle (**NK302**), mögliche Folgen Verbrennungen, Muskelverkrampfungen und Herzrhythmusstörungen (**NK303**). Nach einem Stromschlag soll man **einen Arzt aufsuchen**, da Herzrhythmusstörungen auch noch Stunden später auftreten können (**NK304**).[^bnetza-pruefungsfragen-2024]`,
    },
    {
      id: 'viz-lab', type: 'viz', viz: 'body-current-lab', title: 'Körperstrom-Labor',
      intro: 'Wähle Spannung, Hautzustand und Stromweg. Das Lehrmodell rechnet $R_K$ mit einer spannungsabhängigen Hautkomponente; die Skala rechts zeigt die Wirkungsbereiche logarithmisch.',
      task: 'Finde heraus, **warum 12 V bei nasser Haut unter 10 mA bleiben** und **230 V bei feuchter oder nasser Haut im Flimmerbereich** liegen – und stelle **50 V** ein: Das ist die Grenze der Schutzkleinspannung (AC).',
    },
    {
      id: 'schutz', type: 'text', title: 'Schutzkleinspannung: so klein, dass es nicht reicht',
      md: `
Die einfachste Schutzmaßnahme ist, die Spannung so zu begrenzen, dass selbst im ungünstigen Fall kein gefährlicher Strom fließt: die **[Schutzkleinspannung](wiki:Kleinspannung|Extra-low voltage)** (SELV). Sie darf **50 V Wechselspannung bzw. 120 V (glatte) Gleichspannung** nicht überschreiten und muss durch einen [Sicherheitstransformator](wiki:Trenntransformator|Isolation transformer) (oder eine Quelle mit sicherer Trennung) vom Netz getrennt sein. In besonders gefährdeten Bereichen gelten niedrigere Grenzen – etwa **25 V AC / 60 V DC** in Räumen mit Badewanne oder Dusche und in der Landwirtschaft; im Bereich 0 (in der Wanne) sogar nur 12 V AC / 30 V DC.[^wp-stromunfall]

Das Funkgerät an 13,8 V Gleichspannung liegt damit weit unter jeder Grenze – für den Menschen. Für Leitungen und Akkus ist es dagegen nicht harmlos: Beim Kurzschluss kann ein 12-V-Akku Hunderte Ampere liefern und Leitungen zum Glühen bringen (siehe Batterie-Lektion).

Am Netz hilft die Spannungsbegrenzung nicht, dort verhindern **Schutzklassen** den Kontakt mit gefährlichen Teilen.`,
    },
    {
      id: 'klassen', type: 'figure', title: 'Die drei Schutzklassen',
      html: `<svg viewBox="0 0 520 200" role="img" aria-label="Symbole der Schutzklassen I, II und III" style="width:100%;max-width:640px;height:auto;color:var(--ink)">
<g fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
<path d="M90 40 V110"/><path d="M60 110 H120"/><path d="M68 122 H112"/><path d="M78 134 H102"/><path d="M86 146 H94"/>
<rect x="215" y="55" width="70" height="70"/><rect x="233" y="73" width="34" height="34"/>
<path d="M430 50 L470 90 L430 130 L390 90 Z"/>
</g>
<g font-family="sans-serif" fill="currentColor" font-size="14">
<text x="90" y="30" text-anchor="middle" font-weight="700">Schutzklasse I</text><text x="90" y="170" text-anchor="middle">Schutzleiter (PE)</text><text x="90" y="188" text-anchor="middle" font-size="12">Gehäuse an PE</text>
<text x="250" y="30" text-anchor="middle" font-weight="700">Schutzklasse II</text><text x="250" y="170" text-anchor="middle">doppelte Isolierung</text><text x="250" y="188" text-anchor="middle" font-size="12">kein PE nötig</text>
<text x="430" y="30" text-anchor="middle" font-weight="700">Schutzklasse III</text><text x="430" y="97" text-anchor="middle" font-size="18" font-weight="700">III</text><text x="430" y="170" text-anchor="middle">Schutzkleinspannung</text><text x="430" y="188" text-anchor="middle" font-size="12">Speisung ≤ 50 V AC</text>
</g></svg>`,
      caption: 'Symbole der Schutzklassen: I – Schutzleiter-Zeichen (Erde) am Gehäuse; II – Quadrat im Quadrat; III – Raute mit der römischen Drei.',
    },
    {
      id: 'klassen-text', type: 'text', title: 'Schutzklassen I, II, III',
      md: `
- **Schutzklasse I:** Basisisolierung plus **Schutzleiter** ([Schutzleiter](wiki:Schutzleiter|Protective earth), grün-gelb), der das berührbare Metallgehäuse mit dem Erdungssystem verbindet. Bei einem Isolationsfehler fließt der Fehlerstrom über PE ab, Sicherung oder FI löst aus (nächste Lektion). Ohne PE-Anschluss fehlt der Schutz – das Gehäuse kann auf 230 V liegen. Beispiele: Waschmaschine, Netzteil mit Metallgehäuse, viele Amateurfunk-Endstufen.
- **Schutzklasse II** ([Schutzklassen](wiki:Schutzklasse (Elektrotechnik)|Appliance classes)): **doppelte oder verstärkte Isolierung** – ein einzelner Isolationsfehler macht berührbare Teile nicht gefährlich; ein Schutzleiter ist nicht nötig (und deshalb haben solche Geräte oft einen zweipoligen Eurostecker). Symbol: Quadrat im Quadrat.
- **Schutzklasse III:** Betrieb mit **Schutzkleinspannung** (bis 50 V AC), gespeist aus einer sicheren Quelle, z. B. einem Steckernetzteil (das selbst Schutzklasse II hat). Symbol: Raute mit der römischen III.

Die Schutzklasse sagt etwas über die **Schutzart gegen elektrischen Schlag**, nichts über Wasser- oder Staubschutz (das regelt die IP-Schutzart).`,
    },
    {
      id: 'arbeiten', type: 'text', title: 'Beim Selbstbau: Ziehen, Entladen, Prüfen – dann erst arbeiten',
      md: `
Ein Amateur baut gern selbst, aber an der Netzspannung gelten strenge Regeln. Wo es möglich ist, arbeitet man nur an **Kleinspannung** (eine [Elektrofachkraft](wiki:Elektrofachkraft) darf mehr) und kauft das Netzteil fertig mit CE-Zeichen. Wenn ein Gerät dennoch geöffnet werden muss, ist die Reihenfolge entscheidend:

1. **Netzstecker ziehen** (nicht nur ausschalten) – damit der Stecker in Sichtweite bleibt und niemand versehentlich wieder einschaltet.
2. **Entladen:** Siebkondensatoren im Netzteil können nach dem Ziehen noch gefährliche Ladung halten – **Katalog EK203** fragt genau danach: Beim Öffnen eines vom Netz getrennten Gerätes droht ein elektrischer Schlag durch aufgeladene Kondensatoren. Über einen passenden Widerstand entladen, nie mit dem Schraubendreher kurzschließen.
3. **Spannungsfreiheit prüfen:** mit einem geeigneten Messgerät kontrollieren, dass wirklich nichts mehr anliegt.
4. **Erst dann arbeiten**, das Gehäuse isoliert abdecken, keinen Schmuck tragen und möglichst nur mit einer Hand an einem Pol arbeiten.

Die professionellen **[fünf Sicherheitsregeln](wiki:Fünf Sicherheitsregeln)** für Elektrofachkräfte (freischalten, gegen Wiedereinschalten sichern, Spannungsfreiheit feststellen, erden und kurzschließen, benachbarte Teile abdecken) gehen darüber hinaus; hier geht es um die Kurzfassung für den Funkamateur. Das Gleiche gilt für die Antennenanlage: Die HF an der Antenne kann **Verbrennungen** verursachen (**EK202**), ein Blitzschlag ([Blitzschutz](wiki:Blitzschutzanlage|Lightning rod)) kann die Antennenleitung unter Spannung setzen.

Nach einem Stromunfall: erst den Stromkreis unterbrechen (Stecker, Sicherung) – Eigenschutz geht vor –, dann Notruf **112** und Erste Hilfe; auch bei scheinbarem Wohlbefinden zum Arzt (**NK304**).`,
    },
    {
      id: 'calc-230', type: 'numeric', title: 'Körperstrom bei Netzspannung',
      question: 'Eine Person berührt Netzspannung ($230\\,\\text{V}$) und schließt den Stromkreis über einen Körperwiderstand von angenommen $R_K=1\\,\\text{k}\\Omega$. Wie groß ist der Körperstrom in mA?',
      answer: 230, tolerance: 1, unit: 'mA',
      hint: '$I=U/R_K$',
      explain: '$I=230\\,\\text{V}/1000\\,\\Omega=0{,}23\\,\\text{A}=230\\,\\text{mA}$. Das liegt weit über allen Gefährdungsschwellen (Loslassgrenze ≈ 10 mA, Kammerflimmern ab ≈ 50 mA). Der Wert ist eine Annahme zum Üben; reale Werte hängen von Haut, Weg und Spannung ab.',
    },
    {
      id: 'calc-50', type: 'numeric', title: 'Körperstrom an der Grenze',
      question: 'Bei der Schutzkleinspannung-Grenze $U=50\\,\\text{V}$ und einem angenommenen $R_K=2\\,\\text{k}\\Omega$ (feuchte Haut): Welcher Strom fließt in mA?',
      answer: 25, tolerance: 0.5, unit: 'mA',
      hint: '$I=U/R_K$',
      explain: '$I=50\\,\\text{V}/2000\\,\\Omega=25\\,\\text{mA}$ – über der Loslassgrenze. Deshalb gelten in feuchten Räumen niedrigere Grenzen (25 V AC), und deshalb ist „unter 50 V" kein Freibrief.',
    },
    {
      id: 'quiz-selv', type: 'quiz', title: 'Schutzkleinspannung',
      question: 'Bis zu welcher Wechselspannung spricht man von Schutzkleinspannung?',
      options: [
        { text: '50 V', correct: true, why: 'Die Grenze liegt bei 50 V Wechselspannung bzw. 120 V (glatter) Gleichspannung (Katalog NK301).' },
        { text: '12 V', correct: false, why: '12 V gilt nur für besonders gefährdete Bereiche (z. B. Bereich 0 in Bädern) – nicht als allgemeine Grenze.' },
        { text: '120 V', correct: false, why: '120 V ist die Grenze für **Gleich**spannung, nicht für Wechselspannung.' },
        { text: '230 V', correct: false, why: 'Das ist die Netzspannung – gefährlich, keine Kleinspannung.' },
      ],
    },
    {
      id: 'quiz-sk2', type: 'quiz', title: 'Schutzklasse II',
      question: 'Was bedeutet Schutzklasse II (Symbol: Quadrat im Quadrat)?',
      options: [
        { text: 'Doppelte oder verstärkte Isolierung; ein Schutzleiter ist nicht erforderlich', correct: true, why: 'Auch bei einem Isolationsfehler bleiben berührbare Teile ungefährlich, weil eine zweite Isolierung folgt.' },
        { text: 'Das Gerät hat ein geerdetes Metallgehäuse', correct: false, why: 'Das beschreibt Schutzklasse I (Schutzleiter).' },
        { text: 'Das Gerät arbeitet nur mit Schutzkleinspannung', correct: false, why: 'Das ist Schutzklasse III.' },
        { text: 'Das Gerät ist wasserdicht', correct: false, why: 'Wasserschutz regelt die IP-Schutzart, nicht die Schutzklasse.' },
      ],
    },
    {
      id: 'quiz-massnahme', type: 'quiz', title: 'Beim Selbstbau am Netz',
      question: 'Welche Maßnahmen senken das Risiko beim Öffnen eines Netzgeräts? (Mehrfachauswahl)',
      options: [
        { text: 'Netzstecker ziehen', correct: true, why: 'Nur so ist das Gerät wirklich vom Netz getrennt; der Schalter allein trennt oft nur einpolig.' },
        { text: 'Siebkondensatoren über einen Widerstand entladen', correct: true, why: 'Kondensatoren können nach dem Abschalten gefährliche Ladung halten (Katalog EK203).' },
        { text: 'Mit einem geeigneten Messgerät prüfen, dass nichts mehr anliegt', correct: true, why: 'Erst die Messung beweist Spannungsfreiheit.' },
        { text: 'Das Gerät nur ausschalten und dann am offenen Gerät arbeiten', correct: false, why: 'Auch ausgeschaltet können Teile unter Spannung stehen (z. B. Netzseite hinter dem Schalter, geladene Kondensatoren).' },
      ],
    },
    {
      id: 'order-vorgehen', type: 'order', title: 'Vorgehen vor Arbeiten am Gerät',
      prompt: 'Bringe die Schritte vor Arbeiten am geöffneten Netzgerät in die richtige Reihenfolge.',
      items: [
        'Netzstecker ziehen',
        'Kondensatoren entladen / Gerät spannungsfrei machen',
        'Mit dem Messgerät auf Spannungsfreiheit prüfen',
        'Erst dann am Gerät arbeiten',
      ],
      explain: 'Kurz: Ziehen – Entladen – Prüfen – dann arbeiten.',
    },
    {
      id: 'recall-faktoren', type: 'recall', title: 'Erkläre es in eigenen Worten',
      prompt: 'Welche Faktoren bestimmen die Gefährlichkeit eines Stromunfalls? Warum ist die Spannung allein nicht entscheidend?',
      answer: 'Entscheidend ist der Strom durch den Körper, der sich aus Spannung und Körperwiderstand ergibt (I = U/R_K). Die Gefährdung hängt von der Stromstärke, der Einwirkdauer, dem Stromweg (Herz im Weg?) und der Stromart/Frequenz ab. Eine hohe Spannung ist harmlos, wenn kein geschlossener Stromkreis durch den Körper entsteht (Vogel auf der Leitung) oder der Strom winzig bleibt (Funkenüberschlag, elektrostatische Entladung); eine mittlere Spannung kann bei nasser Haut und kleinem Widerstand lebensgefährlich werden.',
      hints: ['Welche Größe fließt durch das Herz?', 'Wie verändert nasse Haut den Körperwiderstand?'],
      cards: ['faktoren', 'selv'],
    },
    {
      id: 'mission', type: 'callout', tone: 'mission', title: 'Prüfung und Funkpraxis',
      md: `
Dieses Kapitel ist direkt prüfungsrelevant: die **50-V-AC/120-V-DC**-Grenze (**NK301**), die Gefährdungen und Folgen der Körperdurchströmung (**NK302**, **NK303**), das Verhalten nach einem Stromschlag (**NK304**) und die Gefahr geladener Kondensatoren beim Öffnen von Netzteilen (**EK203**).[^bnetza-pruefungsfragen-2024] Für die Funkpraxis: Endstufen und Röhrengeräte arbeiten mit hohen Gleichspannungen (hunderte Volt bis kV) – hier zählt jede Regel doppelt; ein Netzteil wird gekauft, nicht gebaut, es sei denn, du kennst die Normen und hast Erfahrung.

Hinweis: Die genannten Zahlen sind Größenordnungen zur Orientierung, kein Ersatz für eine Unterweisung oder Erste-Hilfe-Ausbildung.`,
    },
    {
      id: 'warning', type: 'callout', tone: 'warning', title: 'Typische Fehlvorstellung',
      md: `
„Gefährlich ist nur hohe Spannung." – Nein: Gefährlich ist der **Körperstrom**; Spannung und Körperwiderstand bestimmen ihn. Nasse Haut und ein Weg über das Herz machen auch 50 V kritisch. Umgekehrt: „12 V sind immer ungefährlich" – für den Körper meist, aber nicht für Leitungen: Der Kurzschluss an einem Akku ist ein Brandrisiko. Und: „Mit Schutzklasse I bin ich sicher" – nur, wenn der Schutzleiter **angeschlossen und intakt** ist.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>Deutsch</th><th>English</th><th>Notiz</th></tr>
<tr><td>Stromunfall, Stromschlag</td><td>electric shock</td><td></td></tr>
<tr><td>Körperwiderstand</td><td>body resistance</td><td>$R_K$</td></tr>
<tr><td>Loslassgrenze</td><td>let-go threshold</td><td>≈ 10 mA</td></tr>
<tr><td>Herzkammerflimmern</td><td>ventricular fibrillation</td><td></td></tr>
<tr><td>Berührungsspannung</td><td>touch voltage</td><td></td></tr>
<tr><td>Schutzkleinspannung</td><td>safety extra-low voltage (SELV)</td><td>≤ 50 V AC / 120 V DC</td></tr>
<tr><td>Schutzklasse</td><td>protection class</td><td>I, II, III</td></tr>
<tr><td>Schutzleiter</td><td>protective earth conductor (PE)</td><td>grün-gelb</td></tr>
<tr><td>Freischalten</td><td>to isolate / de-energise</td><td></td></tr></table>`,
    },
    {
      id: 'deep-hf', type: 'callout', tone: 'deep', title: 'Hochfrequenz: Verbrennung statt Flimmern',
      md: `
Bei Hochfrequenz (Funkantenne) wirkt der Strom anders als bei 50 Hz: Oberhalb einiger zehn Kilohertz reizt er Nerven und Muskeln kaum noch, dafür **erwärmt** er das Gewebe stark und verbrennt die Haut (daher **EK202**: Verbrennungen beim Berühren sendender Antennen). Der Skin-Effekt lässt den Strom eher an der Oberfläche fließen. Ungefährlich ist HF damit nicht – im Gegenteil, die Wärmewirkung kann tiefer gehen, als man sieht; und die Sicherheitsabstände zu Antennen (Personenschutz in elektromagnetischen Feldern, **NK201**) sind ein eigenes Prüfungsthema im Fach Amateurfunk.`,
    },
  ],
  cards: [
    { id: 'faktoren', front: 'Wovon hängt die Gefährlichkeit eines Stromunfalls ab?', back: 'Stromstärke, Einwirkdauer, Stromweg (Herz!), Stromart/Frequenz – der Strom ergibt sich aus $U/R_K$.' },
    { id: 'ik', front: 'Körperstrom?', back: '$I=U/R_K$; $R_K$ ≈ 0,5…3 kΩ (Hand–Fuß), bei nasser Haut klein, bei höherer Spannung sinkend.' },
    { id: 'wirkung-orient', front: 'Orientierung: Wirkung von 50-Hz-Wechselstrom?', back: 'Wahrnehmung ab µA…mA · Loslassgrenze ≈ 10 mA · Rhythmusstörungen ab ≈ 25 mA · Kammerflimmern ab ≈ 50 mA (> 1 s). Keine medizinischen Grenzwerte.' },
    { id: 'selv', front: 'Grenze der Schutzkleinspannung (Katalog)?', back: '50 V Wechselspannung bzw. 120 V (glatte) Gleichspannung (NK301).' },
    { id: 'sk1', front: 'Schutzklasse I?', back: 'Basisisolierung + Schutzleiter (PE) am Gehäuse; Symbol: Erdzeichen.' },
    { id: 'sk2', front: 'Schutzklasse II?', back: 'Doppelte/verstärkte Isolierung, kein PE nötig; Symbol: Quadrat im Quadrat.' },
    { id: 'sk3', front: 'Schutzklasse III?', back: 'Betrieb mit Schutzkleinspannung (≤ 50 V AC); Symbol: Raute mit „III".' },
    { id: 'adernfarben-pe', front: 'Aderfarben 3-adriger Leitung (Schutzleiter, Außenleiter, Neutralleiter)?', back: 'Grün-gelb, braun, blau (EK205).' },
    { id: 'elko-entladen', front: 'Gefahr beim Öffnen eines vom Netz getrennten Geräts?', back: 'Aufgeladene Kondensatoren im Netzteil (EK203): erst entladen.' },
    { id: 'ziehen-entladen', front: 'Reihenfolge vor Arbeiten am Netzgerät?', back: 'Stecker ziehen – entladen – auf Spannungsfreiheit prüfen – dann arbeiten.' },
    { id: 'arzt-nach-stromschlag', front: 'Nach einem Stromschlag?', back: 'Stromkreis unterbrechen, Erste Hilfe/Notruf, immer zum Arzt: Herzrhythmusstörungen können Stunden später auftreten (NK304).' },
  ],
};
