export default {
  id: 'strom-spannung-stromkreis',
  title: 'Spannung, Strom, Stromkreis und Gefahren',
  summary: 'Spannung und Stromstärke unterscheiden, Leiter von Isolatoren trennen, einen geschlossenen Stromkreis erkennen und wissen, ab wann und warum Strom für den Menschen gefährlich wird.',
  minutes: 20,
  goals: [
    '[[spannung]] (Einheit Volt) und [[stromstaerke]] (Einheit Ampere) auseinanderhalten und Vorsätze sicher umrechnen',
    'Die Reihenfolge der Leitfähigkeit **Silber – Kupfer – Zinn** kennen und Leiter von Isolatoren trennen',
    'Erkennen, wann ein [[stromkreis]] geschlossen ist, und die [[technische-stromrichtung]] richtig einzeichnen',
    'Die Gefahren des Stroms (50 V AC / 120 V DC, [[koerperdurchstroemung]], [[stoerlichtbogen]]) und das Verhalten nach einem Stromunfall kennen',
  ],
  needs: ['elektrotechnik/strom-und-spannung', 'elektrotechnik/einheiten-und-groessen'],
  blocks: [
    {
      id: 'wasser', type: 'text', title: 'Spannung und Strom: zwei verschiedene Dinge',
      md: `
Stell dir einen Wasserkreislauf vor: Eine Pumpe drückt Wasser nach oben, es fließt durch ein Rohr zu einem Wasserrad und kommt unten wieder an. Der **Druck** der Pumpe bringt das Wasser zum Fließen; die **Menge pro Sekunde** ist der Strom. Genau so arbeitet ein elektrischer Stromkreis.[^darc-50ohm]

- Die **[Spannung](wiki:Elektrische Spannung|Voltage)** $U$ ist der „elektrische Druck“. Sie entsteht, wenn man positive und negative [Ladungen](wiki:Elektrische Ladung|Electric charge) trennt, etwa in einer Batterie. Einheit: **Volt (V)**, benannt nach [Alessandro Volta](wiki:Alessandro Volta|Alessandro Volta).
- Die **[Stromstärke](wiki:Elektrische Stromstärke|Electric current intensity)** $I$ ist die Menge an Ladung, die pro Sekunde durch den Leiter fließt. Einheit: **Ampere (A)**, benannt nach [André-Marie Ampère](wiki:André-Marie Ampère|André-Marie Ampère).

Eine Spannung kann **anliegen**, ohne dass ein Strom fließt (offener Schalter, Batterie im Regal): Der Druck ist da, aber das Ventil ist zu. Strom fließt erst, wenn der Kreis geschlossen ist.

> Merkhilfe: Spannung liegt **an** (zwischen zwei Punkten), Strom fließt **durch** (an einer Stelle der Leitung).

Die Einheit **Amperestunde (Ah)** gehört **nicht** zur Stromstärke: Sie ist das Produkt aus Strom und Zeit, also eine Ladungsmenge — die Kapazität eines Akkus (mehr dazu in der Lektion „Stromversorgung“).`,
    },
    {
      id: 'warn-einheiten', type: 'callout', tone: 'warning', title: 'Typische Verwechslungen bei den Einheiten',
      md: `Im Katalog stehen bei „Einheit der Spannung“ als falsche Antworten gern **Ampere**, **Ohm** und **Amperestunden**. Eselsbrücke: Spannung = **V**olt = Druck; Strom = **A**mpere = Durchfluss; Widerstand = **Ω** = Engstelle; Ah = Ladungsvorrat. Prüfungsbezug: NA201, NA202.`,
    },
    {
      id: 'viz-water', type: 'viz', viz: 'water-analogy', title: 'Pumpe, Engstelle, Strom',
      params: { target: 0.06, tol: 0.03 },
      task: 'Stelle den Strom auf **60 mA** ein (±3 %). Finde danach eine **zweite**, deutlich andere Kombination aus Druck $U$ und Engstelle $R$, die denselben Strom ergibt. Tipp: Klicke auf einen Zahlenwert, um ihn einzutippen.',
    },
    {
      id: 'vorsaetze', type: 'text', title: 'Vorsätze: Millivolt und Milliampere',
      md: `
Im Amateurfunk begegnen dir Spannungen von Mikrovolt (Empfängereingang) bis zu einigen hundert Volt (Röhrenendstufen) und Ströme von Mikroampere bis zu mehreren Ampere. Die **[[einheitenvorsatz|Vorsätze]]** liefern die passende Größenordnung:

| Umrechnung | Rechnung |
|---|---|
| 4,2 V in mV | ein Volt sind 1000 mV, also $4{,}2\\cdot1000 = 4200$ mV |
| 42 mA in A | ein Milliampere ist ein Tausendstel Ampere, also $42/1000 = 0{,}042$ A |

Beim Wechsel zu einem **kleineren** Vorsatz (V → mV) wird die Zahl **größer**, beim Wechsel zu einem größeren (mA → A) **kleiner**. Rechne im Zweifel über die Zehnerpotenz: $\\text{m} = 10^{-3}$, $\\mu = 10^{-6}$, $\\text{k} = 10^{3}$, $\\text{M} = 10^{6}$. Falsche Katalogantworten sind meist um Faktor 10, 1000 oder 10⁶ verschoben (Prüfungsbezug: NA208, NA209).`,
    },
    {
      id: 'calc-mv', type: 'numeric', title: 'Spannung umrechnen',
      question: 'Ein Empfänger liefert am Ausgang 85 mV. Wie viel Volt sind das?',
      answer: 0.085, tolerance: 0.001, unit: 'V',
      hint: 'Milli bedeutet Tausendstel: Teile durch 1000.',
      explain: '$85\\,\\text{mV} = 85\\cdot10^{-3}\\,\\text{V} = 0{,}085\\,\\text{V}$.',
    },
    {
      id: 'calc-ma', type: 'numeric', title: 'Strom umrechnen',
      question: 'Ein Mikrofonverstärker nimmt 0,0047 A auf. Wie viel Milliampere sind das?',
      answer: 4.7, tolerance: 0.02, unit: 'mA',
      hint: 'Ein Ampere sind 1000 mA — die Zahl muss größer werden.',
      explain: '$0{,}0047\\,\\text{A}\\cdot1000 = 4{,}7\\,\\text{mA}$.',
    },
    {
      id: 'leiter', type: 'text', title: 'Leiter, Halbleiter und Isolatoren',
      md: `
Materialien teilt man nach ihrem Verhalten in drei Gruppen ein: **[Leiter](wiki:Elektrischer Leiter)** haben frei bewegliche Ladungsträger (bei Metallen: Elektronen, siehe [Elektron](wiki:Elektron|Electron)), **[Isolatoren](wiki:Isolator (Elektrotechnik)|Insulator (telegraph and power transmission))** (Nichtleiter) leiten praktisch gar nicht, und **[Halbleiter](wiki:Halbleiter|Semiconductor)** leiten nur unter bestimmten Bedingungen — sie sind die Grundlage von Diode und Transistor.

Wie gut ein Metall leitet, sagt die **[elektrische Leitfähigkeit](wiki:Elektrische Leitfähigkeit|Electrical conductivity)**. Sortiert vom besten zum schlechtesten Leiter (alle Materialien, die im Katalog vorkommen):

| Rang | Material |
|---|---|
| 1 | **[Silber](wiki:Silber|Silver)** |
| 2 | **[Kupfer](wiki:Kupfer|Copper)** |
| 3 | Gold |
| 4 | Aluminium |
| 5 | Wolfram |
| 6 | Zink |
| 7 | **Zinn** |

Merke dir die Reihenfolge **Silber – Kupfer – Zinn**: Dann lassen sich alle Fragen zur Leitfähigkeit beantworten (Prüfungsbezug: NB101–NB103). Die zugehörigen Werte stehen als spezifischer Widerstand in der Formelsammlung (gute Leiter haben einen kleinen Widerstand).[^bnetza-formelsammlung] Silber ist zu teuer für Kabel, Kupfer der Standard. Zinn leitet vergleichsweise schlecht, wird aber als Lot verwendet, weil es früh schmilzt.

**Isolatoren** im Katalog: Porzellan, Polyethylen (PE), Polystyrol (PS), Polytetrafluorethylen (PTFE), Polyvinylchlorid (PVC), Kork. **Leiter** sind dagegen Wolfram, Messing und Bronze — wer in einer Antwortliste ein Metall findet, kann die ganze Gruppe als „alles Nichtleiter“ ausschließen (NB104).`,
    },
    {
      id: 'match-leiter', type: 'match', title: 'Leiter oder Isolator?',
      prompt: 'Ordne die Materialien ihrer Gruppe zu.',
      pairs: [
        ['Kupfer', 'Leiter'], ['Messing', 'Leiter'], ['Wolfram', 'Leiter'],
        ['Porzellan', 'Isolator'], ['PTFE (Teflon)', 'Isolator'], ['Kork', 'Isolator'],
      ],
    },
    {
      id: 'order-leitfaehigkeit', type: 'order', title: 'Leitfähigkeit sortieren',
      prompt: 'Sortiere vom **besten** zum **schlechtesten** Leiter.',
      items: ['Silber', 'Kupfer', 'Gold', 'Aluminium', 'Zinn'],
      explain: 'Silber > Kupfer > Gold > Aluminium > … > Zinn. Die drei Eckpunkte Silber – Kupfer – Zinn reichen für den Katalog.',
    },
    {
      id: 'stromkreis', type: 'text', title: 'Der Stromkreis',
      md: `
Ein **[Stromkreis](wiki:Stromkreis)** besteht mindestens aus einer **Spannungsquelle** (Batterie), **Leitungen**, einem **Schalter** und einem **Verbraucher**, etwa einer Lampe oder einem [Widerstand](wiki:Widerstand (Bauelement)|Resistor). Der Verbraucher wandelt elektrische Energie um — im Widerstand in Wärme — und **begrenzt** zugleich den Strom. Der Schalter öffnet oder schließt den Kreis, wie das Ventil im Wasserkreislauf.

Die **[technische Stromrichtung](wiki:Technische Stromrichtung)** läuft außerhalb der Quelle immer vom **Pluspol zum Minuspol**. Das ist eine Vereinbarung aus der Zeit, bevor man Elektronen kannte: Die tatsächlichen Elektronen wandern in die entgegengesetzte Richtung (von Minus nach Plus). Für alle Prüfungsfragen gilt: **Pfeile von Plus nach Minus.**

Zeichnen wir einen Stromkreis, benutzen wir genormte **Schaltzeichen** (vgl. [Schaltplan](wiki:Schaltplan|Circuit diagram)):
- **Schalter:** unterbrochene Leitung mit schräg gestelltem Kontakt,
- **Widerstand:** Rechteck mit zwei Anschlüssen,
- **Batterie:** zwei parallele Striche — der **lange, dünne** Strich ist der **Pluspol**, der **kurze, dicke** der Minuspol,
- **Masse / Erde / Antenne:** drei Symbole, die man nicht verwechseln darf (siehe Trainer unten).`,
    },
    {
      id: 'viz-symbole', type: 'viz', viz: 'schaltzeichen-trainer', title: 'Schaltzeichen-Trainer',
      params: { set: ['schalter', 'widerstand', 'batterie', 'masse', 'erde', 'antenne', 'lampe', 'sicherung', 'voltmeter', 'amperemeter'], need: 8 },
      task: 'Erkenne **acht Schaltzeichen in Folge** richtig. (Weitere Symbole übst du später bei Diode, Kondensator, Spule und Transistor.)',
    },
    {
      id: 'warn-kreis', type: 'callout', tone: 'warning', title: 'Offener Kreis: Strom fließt nicht',
      md: `Zwei **gleiche** Spannungsquellen, die zusammen keinen **geschlossenen** Weg für den Strom bilden, liefern **keinen** Strom. Die Begründung ist nicht, dass die Quellen verschieden sein müssten, und auch nicht, dass sie „nie exakt identisch“ seien. Entscheidend ist allein: Ohne geschlossenen Stromkreis gibt es keinen Stromfluss (NB207).

**Kurzschluss:** Besteht der Kreis nur aus Quelle, Draht und geschlossenem Schalter, fließt ein riesiger Strom, der Leitungen, Quelle und Geräte zerstören und einen Brand auslösen kann. Darum muss immer ein Verbraucher (Widerstand) im Kreis liegen — und deshalb gehören Sicherungen in jede Stromversorgung.`,
    },
    {
      id: 'quiz-kreis', type: 'quiz', title: 'Fließt hier Strom?',
      question: 'Eine Taschenlampe besteht aus Batterie, Schalter und Lampe in einem Ring. Der Schalter ist **offen**. Was gilt?',
      options: [
        { text: 'Die Batteriespannung liegt an den offenen Schalterkontakten an, aber es fließt kein Strom.', correct: true, why: 'Spannung kann anliegen, ohne dass Strom fließt — der Kreis ist unterbrochen.' },
        { text: 'Es fließt ein kleiner Strom, weil die Batterie ja Spannung liefert.', why: 'Ohne geschlossenen Kreis fließt gar kein (messbarer) Strom, egal wie hoch die Spannung ist.' },
        { text: 'Die Spannung ist null, weil die Lampe aus ist.', why: 'Die Quellenspannung bleibt; null Strom bedeutet nicht null Spannung.' },
        { text: 'Der Strom fließt vom Minus- zum Pluspol.', why: 'Es fließt keiner; und die technische Stromrichtung ginge außerhalb der Quelle ohnehin von Plus nach Minus.' },
      ],
    },
    {
      id: 'gefahren', type: 'text', title: 'Gefahren des elektrischen Stroms',
      md: `
Als Funkamateur arbeitest du mit Netzteilen, Akkus und Endstufen. Für Eigenbaugeräte gilt: Die Stromversorgung ist **nach den anerkannten Regeln der Technik** aufzubauen, wie sie etwa in den [VDE](wiki:Verband der Elektrotechnik Elektronik Informationstechnik|VDE e.V.)-Normen stehen. Ein Funkamateur ist keine Ausnahme, und es gibt auch keine besonderen Vorschriften „der Stromversorger“ oder aus CEPT-Empfehlungen für den Eigenbau (Prüfungsbezug: VE601).

**Gefährliche Berührungsspannung:** Ab **50 V Wechselspannung (AC)** oder **120 V Gleichspannung (DC)** kann das Berühren lebensgefährlich sein (NK301). Wechselspannung (vgl. [Wechselstrom](wiki:Wechselstrom|Alternating current)) beeinflusst vor allem den Herzrhythmus, Gleichspannung führt eher zu Verbrennungen — deshalb liegt die Grenze für DC höher.[^darc-50ohm] Schon über etwa 30 mA durch den Körper kann es zu lebensgefährlichen Schäden kommen; entscheidend sind Stromstärke, Dauer und der **Weg** durch den Körper.

**Die drei großen Gefährdungen (NK302):**
1. **[[koerperdurchstroemung]]** — der Strom fließt durch den Körper,
2. **[[stoerlichtbogen]]** — ein [Lichtbogen](wiki:Lichtbogen|Electric arc) durch die eigentlich isolierende Luft, z. B. bei Kurzschluss: sehr heiß, extrem hell, Brand- und Augengefahr,
3. **Sekundärunfälle** — Sturz von der Leiter nach dem Schreck oder einer Muskelverkrampfung.

**Folgen der Körperdurchströmung (NK303):** Verbrennungen (meist an Ein- und Austrittsstelle), Muskelverkrampfungen und Herzrhythmusstörungen bis hin zum [Herzkammerflimmern](wiki:Herzkammerflimmern|Ventricular fibrillation).

**Nach einem Stromunfall (NK304):** immer **zum Arzt**, auch wenn man sich gut fühlt — Herzrhythmusstörungen und Kammerflimmern können noch **viele Stunden später** auftreten, bei Wechsel- **und** Gleichstrom. Stabile Seitenlage ist keine Standardmaßnahme für jeden Stromunfall.`,
    },
    {
      id: 'mission-sicherheit', type: 'callout', tone: 'mission', title: 'Funkpraxis: Die fünf Sicherheitsregeln',
      md: `Bevor du ein Funkgerät, ein Netzteil oder einen Antennentuner öffnest, gelten die **fünf Sicherheitsregeln** der Elektrotechnik: freischalten, gegen Wiedereinschalten sichern, Spannungsfreiheit feststellen, erden und kurzschließen, benachbarte Teile abdecken. Und: In **Kondensatoren** bleibt auch nach dem Ausschalten Ladung gespeichert — besonders in Röhrenendstufen und Schaltnetzteilen. Wer unsicher ist, fragt einen erfahrenen Funkamateur oder eine Elektrofachkraft.`,
    },
    {
      id: 'order-regeln', type: 'order', title: 'Fünf Sicherheitsregeln',
      prompt: 'Bringe die fünf Sicherheitsregeln in die richtige Reihenfolge.',
      items: [
        'Freischalten (z. B. Gerät ausschalten)',
        'Gegen Wiedereinschalten sichern (z. B. Netzstecker ziehen)',
        'Spannungsfreiheit feststellen (z. B. mit dem Multimeter)',
        'Erden und kurzschließen',
        'Benachbarte, unter Spannung stehende Teile abdecken',
      ],
      explain: 'Erst abschalten, dann sichern, dann **messen**, dann erden — und zuletzt Nachbarteile abdecken.',
    },
    {
      id: 'recall-gefahr', type: 'recall', title: 'In eigenen Worten',
      prompt: 'Erkläre in wenigen Sätzen den Unterschied zwischen Spannung und Strom und nenne die drei großen Gefährdungen durch Strom sowie das richtige Verhalten nach einem Stromunfall.',
      answer: 'Spannung (Volt) ist der „Druck“, der Ladungen antreibt, und kann auch ohne Stromfluss anliegen; Strom (Ampere) ist die Ladungsmenge pro Zeit und fließt nur im geschlossenen Stromkreis (technische Richtung von Plus nach Minus). Gefahren: Körperdurchströmung, Störlichtbogen und Sekundärunfälle. Ab 50 V AC bzw. 120 V DC kann Berühren lebensgefährlich sein. Nach einem Stromunfall immer zum Arzt, weil Herzrhythmusstörungen und Kammerflimmern auch noch Stunden später auftreten können.',
      cards: ['ssk-unterschied', 'ssk-grenzen'],
    },
  ],
  cards: [
    { id: 'ssk-unterschied', front: 'Spannung oder Strom: Einheit und Bild?', back: 'Spannung: Volt (V), „Druck“, liegt **an**. Strom: Ampere (A), „Durchfluss“, fließt **durch**. Ah ist keine Stromstärke, sondern Ladung (Akkukapazität).' },
    { id: 'ssk-grenzen', front: 'Ab welcher Spannung ist Berühren lebensgefährlich?', back: '**50 V** Wechselspannung (AC), **120 V** Gleichspannung (DC).' },
    { id: 'ssk-gefahren', front: 'Die großen Gefährdungen durch Strom?', back: 'Körperdurchströmung, Störlichtbogen, Sekundärunfälle.' },
    { id: 'ssk-folgen', front: 'Folgen einer Körperdurchströmung?', back: 'Verbrennungen, Muskelverkrampfungen, Herzrhythmusstörungen (bis Kammerflimmern).' },
    { id: 'ssk-arzt', front: 'Verhalten nach einem Stromschlag?', back: 'Immer zum Arzt: Herzrhythmusstörungen können noch viele Stunden später auftreten (AC und DC).' },
    { id: 'ssk-leiter', front: 'Leitfähigkeit: die Reihenfolge für den Katalog', back: '**Silber – Kupfer – Zinn** (Silber am besten, Zinn am schlechtesten). Dazwischen Gold, Aluminium, Wolfram, Zink.' },
    { id: 'ssk-isolator', front: 'Typische Isolatoren?', back: 'Porzellan, PE, PS, PTFE, PVC, Kork. (Wolfram, Messing, Bronze sind Leiter.)' },
    { id: 'ssk-richtung', front: 'Technische Stromrichtung?', back: 'Von Plus nach Minus (Elektronen wandern umgekehrt).' },
    { id: 'ssk-batterie', front: 'Batterie-Schaltzeichen: Plus und Minus?', back: 'Langer dünner Strich = **Plus**, kurzer dicker Strich = **Minus**.' },
    { id: 'ssk-kreis', front: 'Wann fließt Strom?', back: 'Nur im **geschlossenen** Stromkreis. Zwei gleiche Quellen ohne Schleife: kein Strom.' },
    { id: 'ssk-regeln', front: 'Die fünf Sicherheitsregeln', back: 'Freischalten – gegen Wiedereinschalten sichern – Spannungsfreiheit feststellen – erden und kurzschließen – Nachbarteile abdecken.' },
    { id: 'ssk-vde', front: 'Wie baut man Eigenbau-Stromversorgungen sicher?', back: 'Nach den anerkannten Regeln der Technik (z. B. VDE-Normen).' },
  ],
};
