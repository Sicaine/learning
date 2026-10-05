export default {
  id: 'operationsverstaerker',
  title: 'Operationsverstärker: Idee und ideales Modell',
  summary: 'Ein Differenzverstärker mit riesiger Verstärkung — und wie die Gegenkopplung daraus ein präzises Bauteil macht. Mit den zwei Goldenen Regeln lässt sich fast jede OPV-Schaltung im Kopf lösen.',
  minutes: 35,
  needs: ['bipolartransistor'],
  goals: [
    'Den [[operationsverstaerker|Operationsverstärker]] als [[differenzverstaerker|Differenzverstärker]] mit $U_\\text{aus} = A_0\\,(U_+ - U_-)$ beschreiben',
    'Erklären, warum ohne Rückkopplung nur „oben" oder „unten" möglich ist (Sättigung, [[komparator|Komparator]])',
    'Die Wirkung von [[gegenkopplung|Gegenkopplung]] und [[mitkopplung|Mitkopplung]] unterscheiden',
    'Die zwei **Goldenen Regeln** formulieren und anwenden',
    'Mit dem [[verstaerkungs-bandbreite-produkt|Verstärkungs-Bandbreite-Produkt]] die Grenzfrequenz $f_g = \\text{GBW}/V$ abschätzen',
  ],
  blocks: [
    {
      id: 'idee', type: 'text', title: 'Eine extrem empfindliche Waage',
      md: `
Stell dir eine Waage mit riesigem Hebel vor: Schon ein Hauch mehr Gewicht links als rechts, und der Zeiger schlägt voll aus — bis zum Anschlag. Ein [Operationsverstärker](wiki:Operationsverstärker|Operational amplifier) (OPV, engl. *op-amp*) ist so eine Waage für Spannungen: Er verstärkt die **Differenz** zweier Eingangsspannungen um den enormen Faktor $A_0$ (Leerlaufverstärkung, typisch $10^5$ und mehr):

$$U_\\text{aus} = A_0\\cdot(U_+ - U_-)$$

$U_+$ liegt am **nichtinvertierenden** („+") Eingang, $U_-$ am **invertierenden** („−") Eingang. Der Ausgang kann aber nicht höher steigen als die **Versorgungsspannung**: Er „schlägt an" und bleibt bei etwa $+U_\\text{B}$ oder $-U_\\text{B}$ stehen (Sättigung, engl. *clipping*).

Mit $A_0 = 10^5$ genügen schon $50\\,\\mu\\text{V}$ Eingangsdifferenz für 5 V am Ausgang. Der **lineare Bereich** ist also winzig: Bei ±12 V Versorgung liegt er nur bei etwa ±120 µV Eingangsdifferenz. Ein OPV ohne Beschaltung ist damit kein brauchbarer Verstärker, sondern ein **Komparator**: Er meldet nur, welcher Eingang höher liegt.

Intern besteht ein OPV aus mehreren Transistorstufen: einem [Differenzverstärker](wiki:Differenzverstärker|Differential amplifier) am Eingang, einer Verstärkerstufe und einer Ausgangsstufe — heute als [integrierter Schaltkreis](wiki:Integrierter Schaltkreis|Integrated circuit) in einem kleinen Gehäuse.[^et5-wp-opv]`,
    },
    {
      id: 'demo-offen', type: 'viz', viz: 'opamp-lab', title: 'Ohne Rückkopplung: nur „oben" oder „unten"',
      intro: 'Stelle $U_-$ (Referenz) und $U_+$ ein. Das Kennlinien-Diagramm zeigt $U_\\text{aus}$ über der Eingangsdifferenz — nur im Bereich von etwa ±120 µV (links und rechts vom Nullpunkt) verläuft der Ausgang linear. Der **Feinregler** verschiebt $U_+$ um bis zu ±1 mV.',
      params: { modes: ['open', 'follower'], mode: 'open', goals: ['cmp', 'lin', 'follow', 'limit'], rails: 12 },
      task: 'Erreiche alle vier Ziele. **Ohne Rückkopplung:** Treibe den Ausgang an beide Anschläge und triff mit dem Feinregler den linearen Bereich (2 V Ausgang bei etwa 20 µV Differenz). **Spannungsfolger** (zweite Schaltfläche): Der Ausgang ist direkt mit dem „−"-Eingang verbunden — beobachte, was die Rückkopplung bewirkt, und treibe den Eingang über die Versorgung hinaus.',
    },
    {
      id: 'gegenkopplung', type: 'text', title: 'Gegenkopplung: Der Verstärker korrigiert sich selbst',
      md: `
Führt man einen Teil der Ausgangsspannung **zum invertierenden Eingang** zurück, entsteht [Gegenkopplung](wiki:Gegenkopplung|Negative feedback) (negative [Rückkopplung](wiki:Rückkopplung|Feedback)). Der Ablauf im Spannungsfolger-Beispiel aus der Demo:

- $U_+$ steigt. Die Differenz $U_+ - U_-$ wird positiv.
- Der Ausgang steigt stark.
- Weil der Ausgang an den $-$-Eingang zurückgeführt ist, steigt auch $U_-$ — die Differenz **schrumpft** wieder.
- Es stellt sich ein Gleichgewicht ein, in dem die Differenz winzig ist: $U_- \\approx U_+$.

Gegenkopplung ist ein Regelkreis (vgl. [Regelkreis](wiki:Regelkreis|Control loop)): Der OPV *regelt* die Differenz auf null. Daraus folgen die **zwei Goldenen Regeln** für den idealen OPV mit Gegenkopplung:

1. **Die Eingangsspannungen sind (fast) gleich:** $U_+ = U_-$. Die Differenz ist so klein, dass man sie als null behandelt.
2. **Die Eingänge ziehen keinen Strom:** $I_+ = I_- = 0$, denn der Eingangswiderstand ist sehr hoch (MΩ bis TΩ).

Beim ausgeführten Beispiel Spannungsfolger folgt daraus sofort $U_\\text{aus} = U_-$ = $U_+$ — Verstärkung genau **1**. Das ist nützlich als **Impedanzwandler**: Der Folger belastet die Quelle nicht (kein Eingangsstrom) und liefert selbst niederohmig am Ausgang.

Gegenkopplung bringt vier Vorteile — auf Kosten der Verstärkung: Die Verstärkung wird **stabil** (hängt nur von den Widerständen ab, nicht vom streuenden $A_0$), **genauer**, **verzerrungsärmer** und die **Bandbreite** wächst. Bei **Mitkopplung** (Rückführung auf den *nicht*invertierenden Eingang) wird dagegen jede Abweichung verstärkt: Der Ausgang kippt in die Sättigung. Genau das nutzt der Schmitt-Trigger in der nächsten Lektion.`,
    },
    {
      id: 'video', type: 'video', youtube: 'D5g2bgEEDMY', label: 'Operationsverstärker Grundlagen', channel: 'Deutschland reparieren', minutes: 5,
      why: 'Kurz (unter 5 Minuten): ein erster Überblick über Anschlüsse und Funktionsprinzip des OPV.',
    },
    {
      id: 'gbw', type: 'text', title: 'Grenzen eines echten OPV',
      md: `
Reale OPVs weichen vom Idealmodell ab. Für den Anfang sind drei Grenzen wichtig:

- **Versorgungsspannung und Aussteuerung:** Der Ausgang kann nie höher als die Versorgung. Bei den meisten Typen bleibt er sogar ein bis zwei Volt darunter. Gespeist wird oft symmetrisch (z. B. ±12 V) oder mit einer einzelnen Spannung gegen Masse.
- **Bandbreite:** $A_0$ fällt mit steigender Frequenz. Näherungsweise gilt: das Produkt aus Verstärkung und Grenzfrequenz ist konstant, das **Verstärkungs-Bandbreite-Produkt** (GBW, auch [Transitfrequenz](wiki:Transitfrequenz|Gain–bandwidth product)):
$$f_g \\approx \\frac{\\text{GBW}}{V}$$
Ein OPV mit $\\text{GBW} = 1\\,\\text{MHz}$ schafft bei $V = 100$ also nur noch $10\\,\\text{kHz}$ Bandbreite.
- **Anstiegsgeschwindigkeit** ([Slew-Rate](wiki:Slew-Rate|Slew rate)): Der Ausgang kann sich nur mit begrenzter Geschwindigkeit ändern (V/µs); große, schnelle Signale werden dadurch verzerrt.

Außerdem gibt es einen kleinen Gleichspannungsfehler am Eingang ([Offsetspannung](wiki:Offsetspannung|Input offset voltage), typisch Millivolt) und einen winzigen Eingangsstrom. Das Idealmodell vernachlässigt all das — für Niederfrequenz-Schaltungen mit moderaten Verstärkungen stimmt es sehr gut.[^kuphaldt-lessons-in-electric-circuits]`,
    },
    {
      id: 'mission', type: 'callout', tone: 'mission', title: 'Prüfung und Funkpraxis',
      md: `
Der Operationsverstärker ist **kein Stoff des Klasse-E-Fragenkatalogs**. Es geht dort um Verstärker als Funktionsblock: Was ist Leistungsverstärkung (Katalog **ED401**: Ausgangsleistung größer als Eingangsleistung, Energie kommt aus der Versorgung), wozu dienen HF-Leistungsverstärker (**ED403**), und wie sieht ein NF-Verstärker im Blockschaltbild aus (**ED402**).[^bnetza-pruefungsfragen-2024]

Praktisch ist der OPV allgegenwärtig: Im Funkgerät verstärkt er das Mikrofonsignal und filtert aktiv das NF-Signal; Komparatoren stecken in der Rauschsperre ([Squelch](wiki:Rauschsperre|Squelch)), in Pegelwandlern und in Messgeräten. Wer die Goldenen Regeln beherrscht, kann solche Schaltungen aus dem Schaltplan lesen.`,
    },
    {
      id: 'calc-udiff', type: 'numeric', title: 'Wie viel Ausgang bei wenig Eingang?',
      question: 'Ein OPV hat $A_0 = 10^5$, die Versorgung beträgt ±12 V. Zwischen den Eingängen liegen $U_+ - U_- = 50\\,\\mu\\text{V}$. Wie groß ist $U_\\text{aus}$?',
      answer: 5, tolerance: 0.05, unit: 'V',
      hint: '$U_\\text{aus} = A_0\\cdot(U_+ - U_-)$. 50 µV = $50\\cdot10^{-6}$ V.',
      explain: '$10^5\\cdot 50\\cdot10^{-6}\\,\\text{V} = 5\\,\\text{V}$. Das liegt unterhalb der Versorgung, der OPV arbeitet also noch linear. Bei $U_+ - U_- = 1\\,\\text{mV}$ wären rechnerisch 100 V nötig — der Ausgang begrenzt dann auf ca. ±12 V (Sättigung).',
    },
    {
      id: 'calc-gbw', type: 'numeric', title: 'Bandbreite bei Verstärkung 100',
      question: 'Ein OPV hat $\\text{GBW} = 1\\,\\text{MHz}$. Wie groß ist die Grenzfrequenz bei einer Schaltungsverstärkung von $V = 100$?',
      answer: 10, tolerance: 0.1, unit: 'kHz',
      hint: '$f_g \\approx \\text{GBW}/V$',
      explain: '$f_g = 1\\,\\text{MHz}/100 = 10\\,\\text{kHz}$. Hohe Verstärkung kostet Bandbreite; für mehr Bandbreite stuft man mehrere Stufen mit kleinerer Verstärkung hintereinander.',
    },
    {
      id: 'calc-sat', type: 'numeric', title: 'Linearer Bereich',
      question: 'Bei $A_0 = 10^5$ und ±12 V Versorgung: Bei welcher Eingangsdifferenz (Betrag) erreicht der Ausgang die Sättigung (12 V)? Antwort in µV.',
      answer: 120, tolerance: 2, unit: 'µV',
      hint: '$U_\\text{diff} = U_\\text{aus}/A_0$',
      explain: '$12\\,\\text{V}/10^5 = 120\\,\\mu\\text{V}$. Der lineare Bereich eines OPV ohne Gegenkopplung ist winzig.',
    },
    {
      id: 'quiz-gegen', type: 'quiz', title: 'Was bewirkt Gegenkopplung?',
      question: 'Was bewirkt die Gegenkopplung beim Operationsverstärker?',
      options: [
        { text: 'Die Verstärkung wird stabil und hängt von der äußeren Beschaltung ab; Genauigkeit und Bandbreite wachsen, die Verzerrungen sinken.', correct: true, why: 'Die Rückführung korrigiert Abweichungen von $A_0$; man „tauscht" Verstärkung gegen Genauigkeit.' },
        { text: 'Sie erhöht die Verstärkung weiter über $A_0$ hinaus.', correct: false, why: 'Gegenkopplung *verringert* die Verstärkung (von $A_0$ auf den kleinen Wert $V$).' },
        { text: 'Sie schaltet den OPV bei großer Ausgangsspannung ab.', correct: false, why: 'Das wäre eine Schutzschaltung, nicht der Zweck der Gegenkopplung.' },
        { text: 'Sie macht den Ausgang unabhängig von der Versorgungsspannung.', correct: false, why: 'Auch mit Gegenkopplung kann der Ausgang nie über die Versorgung steigen.' },
      ],
    },
    {
      id: 'quiz-mit', type: 'quiz', title: 'Mitkopplung',
      question: 'Der Ausgang eines OPV wird auf den **nichtinvertierenden** Eingang zurückgeführt (Mitkopplung). Was passiert?',
      options: [
        { text: 'Der Ausgang kippt in eine der beiden Sättigungen und bleibt dort — Grundlage von Schmitt-Trigger und Oszillatoren.', correct: true, why: 'Jede kleine Abweichung wird verstärkt zurückgeführt, bis der Ausgang am Anschlag ist.' },
        { text: 'Der Ausgang wird auf $U_+ = U_-$ geregelt.', correct: false, why: 'Das ist die Wirkung der Gegenkopplung.' },
        { text: 'Die Verstärkung wird genau 1.', correct: false, why: 'Das gilt für den Spannungsfolger (Gegenkopplung).' },
        { text: 'Nichts — Mitkopplung beeinflusst den OPV nicht.', correct: false, why: 'Sie verändert das Verhalten grundlegend.' },
      ],
    },
    {
      id: 'match-anschluesse', type: 'match', title: 'Anschlüsse des OPV',
      prompt: 'Ordne zu.',
      pairs: [['Eingang „+"', 'nichtinvertierender Eingang ($U_+$)'], ['Eingang „−"', 'invertierender Eingang ($U_-$)'], ['Ausgang', 'liefert $A_0\\,(U_+-U_-)$, begrenzt durch die Versorgung'], ['Versorgungsanschlüsse', 'liefern die Energie; bestimmen die Aussteuergrenzen'], ['Rückführung auf „−"', 'Gegenkopplung']],
    },
    {
      id: 'order-regelung', type: 'order', title: 'So regelt die Gegenkopplung',
      prompt: 'Der Folger (Ausgang mit „−" verbunden) erhält eine höhere Eingangsspannung $U_+$. Bringe die Schritte in die richtige Reihenfolge.',
      items: [
        '$U_+$ steigt über $U_-$: Die Eingangsdifferenz wird positiv',
        'Der OPV verstärkt die Differenz um $A_0$: Die Ausgangsspannung steigt',
        'Die Rückführung hebt $U_-$ mit an',
        'Die Differenz $U_+ - U_-$ schrumpft wieder',
        'Es stellt sich ein Gleichgewicht ein: $U_-\\approx U_+$, also $U_\\text{aus}\\approx U_+$',
      ],
      explain: 'Das ist ein Regelkreis: Der OPV regelt die Differenz auf (fast) null. Daher die Goldene Regel $U_+ = U_-$.',
    },
    {
      id: 'warning', type: 'callout', tone: 'warning', title: 'Typische Fehlvorstellung',
      md: `
„Der OPV hat die Verstärkung der Schaltung." — Nein: Seine **Leerlaufverstärkung** $A_0$ ist riesig (und streut stark von Exemplar zu Exemplar). Die *Schaltungsverstärkung* $V$ bestimmt die **Gegenkopplung** durch äußere Widerstände. Ebenso falsch: „Der Ausgang kann höher als die Versorgung werden" — er bleibt immer innerhalb der Versorgung, oft ein bis zwei Volt darunter. Und: Die Goldene Regel $U_+ = U_-$ gilt **nur mit Gegenkopplung**. Ohne sie ist der OPV ein Komparator, und die beiden Eingangsspannungen dürfen sehr verschieden sein.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>Deutsch</th><th>English</th><th>Notiz</th></tr>
<tr><td>Operationsverstärker (OPV)</td><td>operational amplifier (op-amp)</td><td></td></tr>
<tr><td>nichtinvertierender / invertierender Eingang</td><td>non-inverting / inverting input</td><td>„+" / „−"</td></tr>
<tr><td>Leerlaufverstärkung</td><td>open-loop gain</td><td>$A_0$, typisch $10^5$</td></tr>
<tr><td>Gegenkopplung / Mitkopplung</td><td>negative / positive feedback</td><td></td></tr>
<tr><td>Differenzspannung</td><td>differential input voltage</td><td>$U_+ - U_-$</td></tr>
<tr><td>Sättigung / Übersteuerung</td><td>saturation / clipping</td><td>Ausgang am Anschlag</td></tr>
<tr><td>Verstärkungs-Bandbreite-Produkt</td><td>gain–bandwidth product (GBW)</td><td>$f_g\\approx \\text{GBW}/V$</td></tr>
<tr><td>Spannungsfolger / Impedanzwandler</td><td>voltage follower / buffer</td><td>$V = 1$</td></tr></table>`,
    },
    {
      id: 'recall-regeln', type: 'recall', title: 'Erkläre es in eigenen Worten',
      prompt: 'Formuliere die **beiden Goldenen Regeln** für den Operationsverstärker mit Gegenkopplung und erkläre, warum sie gelten.',
      answer: '1. Die Spannung zwischen den beiden Eingängen ist (nahezu) null: $U_+ = U_-$. Der Ausgang wird durch die Gegenkopplung so geregelt, dass die Eingangsdifferenz verschwindet; bei $A_0\\approx 10^5$ genügen schon Mikrovolt. 2. Die Eingänge nehmen keinen Strom auf: $I_+ = I_- = 0$, weil der Eingangswiderstand sehr hoch ist. Beide Regeln gelten nur mit Gegenkopplung und nur, solange der Ausgang nicht in die Sättigung läuft.',
      hints: ['Was macht die Gegenkopplung mit der Eingangsdifferenz?', 'Wie hoch ist der Eingangswiderstand eines OPV?'],
      cards: ['opv-regeln', 'opv-gegenkopplung', 'opv-a0'],
    },
    {
      id: 'deep-realer-opv', type: 'callout', tone: 'deep', title: 'Warum die Gegenkopplung stabilisiert',
      md: `
Rückführfaktor $k$ und Leerlaufverstärkung $A_0$ ergeben die Schaltungsverstärkung $V = \\dfrac{A_0}{1 + k\\,A_0}$. Für $k\\,A_0 \\gg 1$ wird daraus $V\\approx 1/k$ — der Wert von $A_0$ spielt kaum noch eine Rolle. Beispiel Folger: $k = 1$, also $V = A_0/(1+A_0) = 0{,}99999$ bei $A_0 = 10^5$. Ändert sich $A_0$ um die Hälfte, ändert sich $V$ nur in der fünften Nachkommastelle. Das ist der Grund, warum man Gegenkopplung überall einsetzt.`,
    },
  ],
  cards: [
    { id: 'opv-formel', front: 'Ausgangsspannung des OPV (ohne Rückkopplung)?', back: '$U_\\text{aus} = A_0\\,(U_+ - U_-)$, begrenzt durch die Versorgungsspannung (Sättigung).' },
    { id: 'opv-a0', front: 'Typische Leerlaufverstärkung $A_0$ eines OPV, und was folgt daraus?', back: 'Ca. $10^5$ (und mehr). Daher ist der lineare Bereich winzig (±120 µV bei ±12 V); ohne Rückkopplung wirkt der OPV als Komparator.' },
    { id: 'opv-regeln', front: 'Die zwei Goldenen Regeln des OPV (mit Gegenkopplung)', back: '1. $U_+ = U_-$ (Eingangsdifferenz ≈ 0)  2. $I_+ = I_- = 0$ (Eingänge nehmen keinen Strom auf).' },
    { id: 'opv-gegenkopplung', front: 'Wirkung der Gegenkopplung beim OPV?', back: 'Verstärkung stabil und durch äußere Widerstände festgelegt; genauer, geringere Verzerrungen, größere Bandbreite — dafür kleinere Verstärkung.' },
    { id: 'opv-mitkopplung', front: 'Wirkung der Mitkopplung beim OPV?', back: 'Abweichungen werden verstärkt: Der Ausgang kippt in die Sättigung. Anwendung: Schmitt-Trigger, Oszillator.' },
    { id: 'opv-gbw', front: 'Verstärkungs-Bandbreite-Produkt (GBW) — Formel und Beispiel', back: '$f_g\\approx\\text{GBW}/V$. 1 MHz bei $V=100$ → 10 kHz.' },
    { id: 'opv-folger', front: 'Spannungsfolger: Schaltung und Verstärkung?', back: 'Ausgang direkt mit „−" verbunden, Signal am „+"-Eingang. $V=1$; hoher Eingangs-, niedriger Ausgangswiderstand: Impedanzwandler.' },
    { id: 'opv-anschluesse', front: 'Anschlüsse eines OPV im Schaltzeichen (Dreieck)?', back: 'Eingang „+" (nichtinvertierend), Eingang „−" (invertierend), Ausgang, zwei Versorgungsanschlüsse (+U_B, −U_B).' },
    { id: 'opv-sat', front: 'Wie hoch kann der OPV-Ausgang steigen?', back: 'Nie über die Versorgungsspannung; meist ein bis zwei Volt darunter (Sättigung/Clipping).' },
    { id: 'opv-diff', front: 'Wie nennt man die interne Eingangsstufe eines OPV?', back: 'Differenzverstärker: Er verstärkt nur die Spannungsdifferenz $U_+-U_-$ und unterdrückt Gleichtaktsignale.' },
  ],
};
