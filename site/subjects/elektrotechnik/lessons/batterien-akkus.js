export default {
  id: 'batterien-akkus',
  title: 'Batterien, Akkus, Kapazität, Laden',
  summary: 'Woher kommt die Nennspannung einer Zelle, was sagen Ah und Wh aus, warum bricht die Spannung bei Last ein und wie lädt man sicher? Mit Laufzeitrechnung für die tragbare Funkstelle und den Gefahren, die der Prüfungskatalog nennt.',
  minutes: 30,
  needs: ['reale-quellen', 'leistung-und-energie'],
  goals: [
    '[[batterie|Primär-]] und Sekundärzellen ([[akkumulator|Akkus]]) unterscheiden und typische Nennspannungen verschiedener Zelltypen nennen',
    'Kapazität ([[kapazitaet-akku|Ah]]), Energie (Wh) und C-Rate berechnen und ineinander umrechnen',
    'Den Spannungseinbruch über den [[innenwiderstand]] bestimmen und eine Laufzeit abschätzen',
    'Das CC/CV-Ladeverfahren für [[lithium-ionen-akku|Li-Ion-Akkus]] beschreiben',
    'Die Gefahren von Kurzschluss, Tiefentladung und Überladung benennen',
  ],
  blocks: [
    {
      id: 'idee', type: 'text', title: 'Chemie macht die Spannung, Größe macht die Menge',
      md: `
In einer [Batterie](wiki:Batterie (Elektrotechnik)|Electric battery) wandelt eine chemische Reaktion Energie in elektrische Energie. Die Spannung einer einzelnen Zelle legt die **Chemie** fest, also die Wahl der Elektrodenmaterialien – nicht die Größe. Eine Mignon-Zelle (AA) und eine Monozelle (D) haben beide 1,5 V; die größere liefert nur länger Strom. Für höhere Spannungen schaltet man Zellen **in Reihe** (die Spannungen addieren sich), für mehr Kapazität **parallel**.

Man unterscheidet zwei Familien:

- **Primärzellen** (Batterien im engeren Sinn) sind nicht wiederaufladbar – Alkali-Mangan, Zink-Kohle, Lithium-Knopfzellen.
- **Sekundärzellen** ([Akkumulatoren](wiki:Akkumulator|Rechargeable battery), kurz Akkus) kann man wieder laden, weil die Reaktion umkehrbar ist.

Die wichtigsten Akku-Typen der Funkpraxis mit typischen Nennspannungen je Zelle (typische Richtwerte, immer ins Datenblatt schauen):

<table><tr><th>Zelltyp</th><th>Nennspannung je Zelle</th><th>Bemerkung</th></tr>
<tr><td>[Bleiakku](wiki:Bleiakkumulator|Lead–acid battery)</td><td>ca. 2 V</td><td>12 V = 6 Zellen; robust, schwer</td></tr>
<tr><td>[NiMH](wiki:Nickel-Metallhydrid-Akkumulator|Nickel–metal hydride battery)</td><td>1,2 V</td><td>Ersatz für 1,5-V-Batterien (AA/AAA)</td></tr>
<tr><td>[Li-Ion](wiki:Lithium-Ionen-Akkumulator|Lithium-ion battery)</td><td>3,6 / 3,7 V</td><td>hohe Energiedichte, braucht Schutzschaltung</td></tr>
<tr><td>[LiFePO₄](wiki:Lithium-Eisenphosphat-Akkumulator|Lithium iron phosphate battery)</td><td>3,2 V</td><td>4 Zellen ≈ 12,8 V, sehr flache Entladekurve</td></tr></table>

Dass 13,8 V die klassische Betriebsspannung von Funkgeräten ist, hat denselben Hintergrund: Es ist die typische Lade-/Erhaltungsspannung eines 12-V-Bleiakkus (rund 2,3 V je Zelle), die das Bordnetz im Auto liefert.[^wp-akkumulator]`,
    },
    {
      id: 'kapazitaet', type: 'text', title: 'Kapazität in Ah, Energie in Wh',
      md: `
Die **[[kapazitaet-akku|Kapazität]]** $C$ eines Akkus gibt man in [Amperestunden](wiki:Amperestunde|Ampere-hour) (**Ah**, bei kleinen Zellen mAh) an: die elektrische Ladung, die er abgeben kann. Fließt der konstante Strom $I$, hält er (ideal)

$$t = \\frac{C}{I}$$

2000 mAh bei 200 mA halten 10 h. Ah ist aber **keine Energie**: Für die Energie braucht man die Spannung, $W=U\\cdot C$ in **Wattstunden** (Wh) – ein 3,7-V-Akku mit 2,5 Ah speichert $3{,}7\\cdot2{,}5=9{,}25$ Wh, ein 12-V-Akku mit 2,5 Ah dagegen 30 Wh. Beim Vergleich unterschiedlicher Spannungen ist Wh die ehrliche Größe.

Die **C-Rate** setzt den Strom ins Verhältnis zur Kapazität: Bei 1C fließt $I=C$ (2,5 Ah → 2,5 A), bei 0,5C die Hälfte, bei 2C das Doppelte. 1C entlädt den Akku in (idealen) einer Stunde. Hohe C-Raten belasten den Akku, senken die nutzbare Kapazität und erhitzen ihn.

Nutzbar ist oft weniger als die Nennkapazität: **Bleiakkus** entlädt man nur bis etwa 20 % Restladung (also 80 % nutzbar), sonst sinkt die Lebensdauer; **Kälte** verringert die nutzbare Kapazität spürbar.`,
    },
    {
      id: 'innenwiderstand', type: 'text', title: 'Innenwiderstand und Spannungseinbruch',
      md: `
Jede reale Quelle hat einen [[innenwiderstand|Innenwiderstand]] $R_i$ (siehe Lektion zu realen Quellen): Die Klemmenspannung ist

$$U_\\text{Kl} = U_0 - I\\cdot R_i$$

Ein Akku mit $R_i=0{,}05\\,\\Omega$ bricht bei 20 A um $20\\cdot0{,}05=1$ V ein. Beim Funkgerät, das beim Senden plötzlich 20 A zieht, kann das den Unterschied zwischen „läuft" und „Unterspannungs-Abschaltung" bedeuten. Je älter und kälter der Akku, desto größer $R_i$. Leistungsstarke Zellen (Blei-Starterbatterien, Li-Ion-Hochstromzellen) haben kleine $R_i$, die kleine Knopfzelle ein großes – deshalb versagt sie bei Last schon, wenn sie „noch voll" ist.

Dasselbe $R_i$ erklärt die **Gefahr des Kurzschlusses**: Der Kurzschlussstrom ist $I_K=U_0/R_i$ – bei 12 V und 10 mΩ sind das über 1000 A. Leitungen glühen, Kontakte schmelzen, und der Akku wird heiß.`,
    },
    {
      id: 'laden', type: 'text', title: 'Laden: Strom und Spannung begrenzen',
      md: `
Laden heißt, Strom gegen die Zellenspannung zu drücken – dafür braucht man eine Quelle mit höherer Spannung und eine **Begrenzung**. Das Verfahren hängt vom Typ ab:

- **Blei:** Ladung mit Spannungsbegrenzung (typisch 13,8…14,4 V für 12-V-Akkus) und Strombegrenzung; die Erhaltungsladung liegt etwas tiefer.
- **Li-Ion / LiFePO₄:** **CC/CV** ([Konstantstrom–Konstantspannung](wiki:Lithium-Ionen-Akkumulator|Lithium-ion battery)): Zuerst fließt ein konstanter Strom (CC, meist ≤ 1C), bis die Ladeschlussspannung erreicht ist (Li-Ion typisch 4,2 V je Zelle, LiFePO₄ 3,65 V). Dann hält das Ladegerät die Spannung konstant (CV), und der Strom sinkt von selbst, bis er unter etwa C/10 liegt – dann ist der Akku voll.
- **NiMH:** Das Ladeende erkennt man am Spannungsverlauf bzw. an der Temperatur; einfache Konstantstrom-Ladung ohne Abschaltung ist riskant.

Lithium-Akkus brauchen eine **Schutzschaltung** (BMS, *battery management system*): Sie trennt bei Über- und Tiefentladung, bei Überstrom und Kurzschluss und achtet bei Reihenschaltung auf gleiche Zellspannungen.[^wp-lithium-akku]`,
    },
    {
      id: 'viz-lab', type: 'viz', viz: 'battery-lab', title: 'Akku-Labor',
      intro: 'Wähle Zelltyp, Kapazität und Last. Die Kurve zeigt die Klemmenspannung bis zur Abschaltspannung; darunter Laufzeit und Energie.',
      task: 'Schätze die **Laufzeit eines 12-V-Bleiakkus mit 7 Ah bei 50 W Last** (Funkgerät): Wähle „konstante Leistung", $P=50\\,\\text{W}$. Erzeuge außerdem einen **Spannungseinbruch von mindestens 1 V** am Innenwiderstand und sieh dir alle vier Zelltypen an.',
    },
    {
      id: 'calc-t', type: 'numeric', title: 'Laufzeit (ideal)',
      question: 'Ein Akku mit $2000\\,\\text{mAh}$ versorgt ein Gerät mit $200\\,\\text{mA}$. Wie lange hält er (ideal)?',
      answer: 10, tolerance: 0.05, unit: 'h',
      hint: '$t=C/I$',
      explain: '$t=2000\\,\\text{mAh}/200\\,\\text{mA}=10\\,\\text{h}$.',
    },
    {
      id: 'calc-wh', type: 'numeric', title: 'Energie',
      question: 'Eine Li-Ion-Zelle hat $3{,}7\\,\\text{V}$ und $2{,}5\\,\\text{Ah}$. Wie viel Energie speichert sie?',
      answer: 9.25, tolerance: 0.05, unit: 'Wh',
      hint: '$W=U\\cdot C$',
      explain: '$3{,}7\\,\\text{V}\\cdot2{,}5\\,\\text{Ah}=9{,}25\\,\\text{Wh}$.',
    },
    {
      id: 'calc-c', type: 'numeric', title: 'C-Rate',
      question: 'Wie groß ist der Strom bei 1C für diese Zelle mit $2{,}5\\,\\text{Ah}$?',
      answer: 2.5, tolerance: 0.02, unit: 'A',
      hint: 'Bei 1C gilt $I=C$ (numerisch in A, wenn $C$ in Ah).',
      explain: '$I_{1C}=2{,}5\\,\\text{A}$. Bei 0,2C wären es 0,5 A, bei 2C 5 A.',
    },
    {
      id: 'calc-blei', type: 'numeric', title: 'Funkgerät am Bleiakku',
      question: 'Ein 12-V-Bleiakku mit $7\\,\\text{Ah}$ (davon $80\\,\\%$ nutzbar) speist ein Funkgerät, das $5\\,\\text{A}$ (60 W) zieht. Wie lange läuft es etwa?',
      answer: 1.12, tolerance: 0.03, unit: 'h',
      hint: 'Nutzbare Kapazität $0{,}8\\cdot7\\,\\text{Ah}$ durch Strom teilen.',
      explain: '$t=0{,}8\\cdot7\\,\\text{Ah}/5\\,\\text{A}=5{,}6\\,\\text{Ah}/5\\,\\text{A}=1{,}12\\,\\text{h}$ ≈ 67 min. Wer auf Sendebetrieb mit 50 % Sendezeit rechnet, kommt mit dem Tastverhältnis (Empfang zieht viel weniger) deutlich länger aus.',
    },
    {
      id: 'calc-ri', type: 'numeric', title: 'Spannungseinbruch',
      question: 'Ein Akku mit dem Innenwiderstand $R_i=0{,}05\\,\\Omega$ liefert $20\\,\\text{A}$. Um wie viel Volt bricht die Klemmenspannung gegenüber der Leerlaufspannung ein?',
      answer: 1, tolerance: 0.02, unit: 'V',
      hint: '$\\Delta U=I\\cdot R_i$',
      explain: '$\\Delta U=20\\,\\text{A}\\cdot0{,}05\\,\\Omega=1\\,\\text{V}$.',
    },
    {
      id: 'quiz-gefahr', type: 'quiz', title: 'Hauptgefahren',
      question: 'Welche Gefahren drohen beim unsachgemäßen Umgang mit Lithium-Ionen-Akkus? (Mehrfachauswahl)',
      options: [
        { text: 'Überladung kann zu Überhitzung und Brand führen', correct: true, why: 'Über der Ladeschlussspannung wird die Zelle instabil; sie kann sich stark erhitzen, Gas abgeben oder brennen.' },
        { text: 'Tiefentladung schädigt die Zelle und macht späteres Laden gefährlich', correct: true, why: 'Unterhalb der Entladeschlussspannung bilden sich bleibende Schäden; die Zelle darf dann nicht mehr normal geladen werden.' },
        { text: 'Ein Kurzschluss lässt sehr hohe Ströme fließen und kann Brand auslösen', correct: true, why: 'Der Kurzschlussstrom $U_0/R_i$ ist riesig; Leitungen und Zelle heizen sich auf.' },
        { text: 'Ein „Memory-Effekt" zerstört die Zelle bei Teilentladung', correct: false, why: 'Der Memory-Effekt war ein Problem der NiCd-Zellen und ist bei Li-Ion praktisch irrelevant; die echten Gefahren sind Tiefentladung, Überladung und Kurzschluss.' },
      ],
    },
    {
      id: 'quiz-schutz', type: 'quiz', title: 'Lithiumzelle ohne Schutz',
      question: 'Du willst ein Funkgerät direkt an eine einzelne Lithiumzelle ohne Schutzschaltung anschließen. Was ist das Hauptproblem?',
      options: [
        { text: 'Verpolung, Überstrom und Tiefentladung sind nicht abgesichert', correct: true, why: 'Eine Schutzschaltung (BMS) schaltet bei Fehlern ab; ohne sie kann ein Fehler zu Zellschäden oder Brand führen.' },
        { text: 'Die Spannung ist immer zu niedrig', correct: false, why: 'Mit 3,0–4,2 V je Zelle lassen sich viele Geräte (mit Aufwärtswandler) speisen; das ist nicht das Problem.' },
        { text: 'Lithium leitet nicht', correct: false, why: 'Natürlich leitet die Zelle; das Problem ist ihre Empfindlichkeit gegen Fehlbehandlung.' },
        { text: 'Es ist gesetzlich verboten', correct: false, why: 'Es geht um Sicherheit, nicht um ein Verbot.' },
      ],
    },
    {
      id: 'order-cccv', type: 'order', title: 'Li-Ion-Laden (CC/CV)',
      prompt: 'Bringe die Phasen einer CC/CV-Ladung in die richtige Reihenfolge.',
      items: [
        'Das Ladegerät speist einen konstanten Strom (CC), die Zellspannung steigt',
        'Die Ladeschlussspannung (z. B. 4,2 V je Zelle) ist erreicht',
        'Das Ladegerät hält die Spannung konstant (CV)',
        'Der Ladestrom sinkt von selbst',
        'Bei sehr kleinem Strom (z. B. unter C/10) wird die Ladung beendet',
      ],
      explain: 'Das Beenden bei kleinem Strom (nicht nach Zeit) verhindert Überladung.',
    },
    {
      id: 'match-typ', type: 'match', title: 'Typ und Nennspannung',
      prompt: 'Ordne jedem Zelltyp die typische Nennspannung je Zelle zu.',
      pairs: [['NiMH', '1,2 V'], ['Bleiakku', 'ca. 2 V'], ['LiFePO₄', '3,2 V'], ['Li-Ion', '3,6–3,7 V']],
    },
    {
      id: 'recall-ah-wh', type: 'recall', title: 'Erkläre es in eigenen Worten',
      prompt: 'Warum ist „X Ah" bei 12 V nicht dasselbe wie „X Ah" bei 3,7 V? Welche Größe vergleicht Akkus ehrlicher?',
      answer: 'Ah ist eine Ladungsmenge (Strom mal Zeit), keine Energie. Die Energie ist W = U·C: Bei 12 V steckt in jedem Ah mehr als dreimal so viel Energie wie bei 3,7 V (12 Wh gegenüber 3,7 Wh). Zum Vergleich unterschiedlicher Spannungen nimmt man Wh (oder man rechnet die Laufzeit über die Leistung: t = W / P).',
      hints: ['Wie wird aus Ah eine Energie?'],
      cards: ['ah-wh', 'laufzeit'],
    },
    {
      id: 'mission', type: 'callout', tone: 'mission', title: 'Prüfung und Funkpraxis',
      md: `
Die Prüfung greift die Praxis auf: Bei Akkus und Batterien ist ein **Kurzschluss zu vermeiden** (Katalog **ND110**), unsachgemäßer Umgang mit wiederaufladbaren Batterien kann zu **Verbrennungen, Verätzungen und Vergiftungen** führen (**NK306**), und beim falschen Anschluss eines Funkgeräts an die 12-V-Fahrzeugbatterie drohen **Lichtbogen und Fahrzeugbrand** (**NK307**). Die Leistungsaufnahme rechnest du wie in **NB601** (13,8 V, 1,5 A → 20,7 W) – und die Laufzeit einer tragbaren Station daraus: $t=W_\\text{nutzbar}/P$.[^bnetza-pruefungsfragen-2024] Praktische Regel: Immer eine Sicherung **direkt am Batteriepol**, bevor die Leitung ins Auto oder Zelt führt.`,
    },
    {
      id: 'warning', type: 'callout', tone: 'warning', title: 'Typische Fehlvorstellung',
      md: `
„Li-Ion-Akkus haben einen Memory-Effekt, man muss sie erst ganz leer fahren." – Nein: Der Memory-Effekt betraf NiCd-Zellen und spielt bei Li-Ion praktisch keine Rolle; häufiges Teilladen schadet nicht. Gefährlich sind dagegen Tief- und Überladung sowie Kurzschluss. Ebenso falsch: „12 V sind immer ungefährlich" – die Spannung ist harmlos, der **Strom** bei Kurzschluss nicht.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>Deutsch</th><th>English</th><th>Notiz</th></tr>
<tr><td>Batterie (Primärzelle)</td><td>(primary) battery</td><td>nicht wiederaufladbar</td></tr>
<tr><td>Akku, Akkumulator</td><td>rechargeable battery</td><td>Sekundärzelle</td></tr>
<tr><td>Kapazität</td><td>capacity</td><td>in Ah</td></tr>
<tr><td>Innenwiderstand</td><td>internal resistance</td><td>$R_i$</td></tr>
<tr><td>Ladeschlussspannung</td><td>end-of-charge voltage</td><td>Li-Ion 4,2 V (typ.)</td></tr>
<tr><td>Tiefentladung</td><td>deep discharge</td><td>Zellschaden</td></tr>
<tr><td>Schutzschaltung</td><td>protection circuit, BMS</td><td></td></tr>
<tr><td>Erhaltungsladung</td><td>float charge</td><td>Blei, ca. 13,8 V</td></tr></table>`,
    },
    {
      id: 'deep-peukert', type: 'callout', tone: 'deep', title: 'Warum bei hoher Last weniger herauskommt',
      md: `
Die Nennkapazität gilt für einen bestimmten Entladestrom (bei Bleiakkus oft für 10 oder 20 Stunden). Entlädt man schneller, ist die nutzbare Kapazität **kleiner**: Der Innenwiderstand lässt die Klemmenspannung früher unter die Abschaltschwelle sinken, und chemische Vorgänge hinken dem Strom hinterher (bei Bleiakkus als [Peukert-Effekt](wiki:Peukert-Gleichung|Peukert's law) bekannt). Deshalb rechnen die Laufzeit-Formeln in dieser Lektion mit einem Abschlag („80 % nutzbar"). Bei LiFePO₄ ist die Entladekurve fast waagerecht – die Spannung verrät dort den Ladezustand kaum, das macht die Anzeige schwierig.`,
    },
  ],
  cards: [
    { id: 'prim-sek', front: 'Primär- vs. Sekundärzelle?', back: 'Primärzelle: nicht wiederaufladbar (Batterie). Sekundärzelle: wiederaufladbar (Akku).' },
    { id: 'nennspannungen', front: 'Typische Nennspannungen je Zelle?', back: 'NiMH 1,2 V · Blei ≈ 2 V · LiFePO₄ 3,2 V · Li-Ion 3,6/3,7 V (typisch, Datenblatt prüfen).' },
    { id: 'ah-wh', front: 'Ah vs. Wh?', back: 'Ah = Ladung (Strom · Zeit). Wh = Energie = $U\\cdot C_\\text{Ah}$ (3,7 V · 2,5 Ah = 9,25 Wh).' },
    { id: 'c-rate', front: 'C-Rate?', back: 'Strom im Verhältnis zur Kapazität: 1C ⇒ $I=C$ (2,5 Ah → 2,5 A); 0,5C halber Strom.' },
    { id: 'laufzeit', front: 'Laufzeit aus Kapazität und Strom?', back: '$t=C/I$ (ideal); bei Blei nur etwa 80 % nutzbar: $t=0{,}8\\,C/I$.' },
    { id: 'ri-einbruch', front: 'Spannungseinbruch am Innenwiderstand?', back: '$\\Delta U=I\\cdot R_i$ (z. B. 20 A · 0,05 Ω = 1 V).' },
    { id: 'kurzschluss-akku', front: 'Kurzschlussstrom einer Quelle?', back: '$I_K=U_0/R_i$ – bei Akkus sehr groß (hunderte Ampere): Brand-/Verbrennungsgefahr.' },
    { id: 'cccv', front: 'CC/CV-Ladung (Li-Ion)?', back: 'Erst konstanter Strom bis zur Ladeschlussspannung (4,2 V/Zelle), dann konstante Spannung, bis der Strom unter ca. C/10 sinkt.' },
    { id: 'li-gefahr', front: 'Hauptgefahren von Li-Ion-Akkus?', back: 'Tiefentladung, Überladung, Kurzschluss/Verpolung → Überhitzung, Brand. Schutzschaltung (BMS) nötig. (Kein Memory-Effekt.)' },
    { id: 'memory', front: 'Memory-Effekt – wo?', back: 'Eine Eigenschaft älterer NiCd-Zellen; bei Li-Ion praktisch irrelevant.' },
    { id: 'blei-138', front: 'Warum 13,8 V am Funkgerät?', back: 'Typische Lade-/Erhaltungsspannung eines 12-V-Bleiakkus (≈ 2,3 V je Zelle), die das Bordnetz liefert.' },
  ],
};
