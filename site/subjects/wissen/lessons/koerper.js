export default {
  id: 'koerper',
  title: 'Der menschliche Körper',
  summary: 'Organe, [[blutkreislauf]], [[nervensystem]] und [[immunsystem]]: wie dein Körper funktioniert — mit den Zahlen und Namen, die man einfach wissen sollte.',
  minutes: 20,
  goals: [
    'Die wichtigsten Organe und ihre Aufgaben benennen',
    'Den Weg des Blutes durch Herz, Lunge und Körper beschreiben',
    'Zentrales und peripheres [[nervensystem]] unterscheiden',
    'Angeborene und erworbene Abwehr des [[immunsystem|Immunsystems]] erklären und Blutgruppen einordnen',
  ],
  blocks: [
    {
      id: 'organe', type: 'text', title: 'Ein Körper, viele Spezialisten',
      md: `
Der Körper ist arbeitsteilig organisiert: Zellen bilden **Gewebe**, Gewebe bilden **Organe**, Organe arbeiten in **Organsystemen** zusammen.

<table>
<tr><th>Organ</th><th>Hauptaufgabe</th><th>Merkenswert</th></tr>
<tr><td>Herz</td><td>pumpt Blut</td><td>schlägt in Ruhe etwa 60–80-mal pro Minute, rund 100.000-mal am Tag</td></tr>
<tr><td>Lunge</td><td>Gasaustausch: Sauerstoff rein, CO₂ raus</td><td>rund 300 Millionen Lungenbläschen</td></tr>
<tr><td>Leber</td><td>Stoffwechsel, Entgiftung, Galle</td><td>größte innere Drüse, kann nachwachsen</td></tr>
<tr><td>Nieren</td><td>filtern das Blut, bilden Urin</td><td>filtern täglich rund 1.500 Liter Blut</td></tr>
<tr><td>Magen & Darm</td><td>Verdauung, Aufnahme von Nährstoffen</td><td>Dünndarm: mehrere Meter lang</td></tr>
<tr><td>Gehirn</td><td>Steuerzentrale</td><td>rund 2 % des Körpergewichts, aber etwa 20 % des Energieverbrauchs</td></tr>
<tr><td>Haut</td><td>Schutz, Temperatur, Tastsinn</td><td><b>größtes Organ</b> (knapp 2 m²)</td></tr>
</table>

Das Skelett eines Erwachsenen besteht aus **206 Knochen**[^nat-wp-skelett]; der kleinste ist der Steigbügel im Ohr, der größte der Oberschenkelknochen.`,
    },
    {
      id: 'match-organe', type: 'match', title: 'Wer macht was?',
      pairs: [['Nieren', 'Filtern das Blut und bilden Urin'], ['Leber', 'Entgiftet und steuert den Stoffwechsel'], ['Lunge', 'Nimmt Sauerstoff auf, gibt CO₂ ab'], ['Haut', 'Größtes Organ, schützt den Körper'], ['Dünndarm', 'Nimmt Nährstoffe ins Blut auf']],
    },
    {
      id: 'kreislauf', type: 'text', title: 'Der Blutkreislauf',
      md: `
Der englische Arzt **William Harvey** beschrieb 1628 als Erster korrekt, dass das Blut im Kreis gepumpt wird.[^nat-wp-kreislauf] Das Herz ist eine **Doppelpumpe** mit vier Kammern (zwei Vorhöfe, zwei Herzkammern) — und damit gibt es zwei Kreisläufe:

- **Lungenkreislauf:** Die *rechte* Herzhälfte pumpt sauerstoffarmes Blut in die Lunge; dort gibt es CO₂ ab und nimmt Sauerstoff auf.
- **Körperkreislauf:** Die *linke* Herzhälfte pumpt das sauerstoffreiche Blut in den ganzen Körper.

**Arterien** führen *vom* Herzen weg (Merkhilfe: **A** wie „ab“), **Venen** *zum* Herzen hin. Dazwischen liegen haarfeine **Kapillaren**, in denen der Stoffaustausch passiert. Ein Erwachsener hat rund **5–6 Liter Blut**. Den Sauerstoff tragen die **roten Blutkörperchen** mit dem eisenhaltigen Farbstoff Hämoglobin — deshalb ist Blut rot.`,
    },
    {
      id: 'order-blut', type: 'order', title: 'Der Weg eines Blutkörperchens',
      prompt: 'Ein rotes Blutkörperchen startet sauerstoffarm in der rechten Herzhälfte. Bringe seine Stationen in die richtige Reihenfolge.',
      items: ['Rechte Herzhälfte', 'Lungenarterie', 'Lunge (nimmt Sauerstoff auf)', 'Linke Herzhälfte', 'Hauptschlagader (Aorta)', 'Kapillaren in einem Muskel (gibt Sauerstoff ab)', 'Venen zurück zum Herzen'],
      explain: 'Eine Runde durch den ganzen Körper dauert in Ruhe nur etwa eine Minute.',
    },
    {
      id: 'calc-herz', type: 'numeric', title: 'Ein Leben lang',
      question: 'Ein Herz schlägt durchschnittlich **70-mal pro Minute**. Wie oft schlägt es an einem Tag? (Auf Tausender gerundet genügt.)',
      answer: 100800, tolerance: 1000, unit: 'Schläge',
      hint: '70 × 60 Minuten × 24 Stunden.',
      explain: '70 × 60 × 24 = **100.800** — rund 100.000 Schläge am Tag, fast 3 Milliarden in einem 80-jährigen Leben.',
    },
    {
      id: 'nerven', type: 'text', title: 'Nervensystem und Gehirn',
      md: `
Das [[nervensystem]] ist das Kommunikationsnetz des Körpers. Das **zentrale Nervensystem** (ZNS) besteht aus **Gehirn und Rückenmark**, das **periphere** aus den Nerven, die in jeden Winkel des Körpers ziehen. Nervenzellen (**Neuronen**) leiten elektrische Impulse — bis zu rund 100 m/s schnell — und geben sie an **Synapsen** mit chemischen Botenstoffen (Neurotransmittern) weiter.

Das Gehirn hat etwa **86 Milliarden Neuronen**.[^nat-wp-gehirn] Grob: Das **Großhirn** denkt, plant und nimmt bewusst wahr (linke Hälfte steuert die rechte Körperseite und umgekehrt), das **Kleinhirn** koordiniert Bewegungen, der **Hirnstamm** regelt Lebenswichtiges wie Atmung und Herzschlag. Das **vegetative** Nervensystem arbeitet unbewusst: Der *Sympathikus* macht uns kampf- oder fluchtbereit, der *Parasympathikus* sorgt für Ruhe und Verdauung.`,
    },
    {
      id: 'immun', type: 'text', title: 'Das Immunsystem: eine lernende Armee',
      md: `
Das [[immunsystem]] verteidigt uns gegen Krankheitserreger wie [[bakterien]] und [[viren]] — in zwei Linien:[^nat-wp-immunsystem]

1. **Angeborene Abwehr:** sofort, aber unspezifisch. Haut und Schleimhäute als Barriere, Fresszellen, Entzündung und Fieber.
2. **Erworbene (adaptive) Abwehr:** langsamer, aber passgenau. **B-Zellen** bilden **Antikörper**, die genau zu einem Erreger passen; **T-Zellen** töten befallene Körperzellen. **Gedächtniszellen** merken sich den Erreger — beim zweiten Kontakt geht es blitzschnell. Genau das nutzt die [[impfung]].

**Blutgruppen:** Der Wiener Arzt **Karl Landsteiner** entdeckte 1901 das **AB0-System**[^nat-wp-blutgruppe] (Nobelpreis 1930). Es gibt die Gruppen **A, B, AB und 0**, dazu den Rhesusfaktor (+/−). In Deutschland sind A und 0 am häufigsten. **0 negativ** gilt als „Universalspender“ für rote Blutkörperchen, **AB positiv** als „Universalempfänger“.`,
    },
    {
      id: 'quiz-koerper', type: 'quiz', title: 'Körperwissen',
      question: 'Welche Aussagen sind richtig?',
      options: [
        { text: 'Arterien führen immer sauerstoffreiches Blut.', correct: false, why: 'Arterien führen vom Herzen *weg*. Die Lungenarterie transportiert sauerstoff*armes* Blut zur Lunge.' },
        { text: 'Das größte Organ des Menschen ist die Haut.', correct: true, why: 'Knapp 2 m² und mehrere Kilogramm schwer.' },
        { text: 'Ein Erwachsener hat 206 Knochen.', correct: true, why: 'Babys haben mehr — viele Knochen verwachsen später.' },
        { text: 'Antikörper werden von roten Blutkörperchen gebildet.', correct: false, why: 'Antikörper bilden B-Zellen (weiße Blutkörperchen).' },
        { text: 'Die linke Gehirnhälfte steuert vor allem die rechte Körperseite.', correct: true, why: 'Die Nervenbahnen kreuzen sich.' },
      ],
    },
    {
      id: 'fact-gefaesse', type: 'callout', tone: 'fact', title: 'Zweimal um die Erde',
      md: `Alle Blutgefäße eines Erwachsenen aneinandergelegt ergäben eine Strecke von rund **100.000 Kilometern** — genug, um die Erde mehr als zweimal zu umwickeln. Der allergrößte Teil davon sind winzige Kapillaren.`,
    },
    {
      id: 'recall-impfung', type: 'recall', title: 'Erkläre es in eigenen Worten',
      prompt: 'Warum wird man die Windpocken normalerweise nur einmal im Leben? Erkläre mit den Begriffen **Gedächtniszellen** und **Antikörper**.',
      answer: `Beim ersten Kontakt mit dem Windpocken-Virus braucht die **erworbene Abwehr** einige Tage, bis passende **Antikörper** (von B-Zellen) und T-Zellen gebildet sind — in dieser Zeit ist man krank. Danach bleiben **Gedächtniszellen** zurück, die das Virus wiedererkennen. Bei einem erneuten Kontakt werden sofort große Mengen Antikörper gebildet, sodass das Virus bekämpft wird, bevor man krank wird: Man ist **immun**. Eine Impfung löst diesen Lerneffekt ohne die Krankheit aus.`,
      hints: ['Was passiert beim ersten Kontakt — und wie lange dauert es?', 'Was bleibt nach der Krankheit zurück?'],
      cards: ['gedaechtnis'],
    },
  ],
  cards: [
    { id: 'knochen', front: 'Wie viele Knochen hat ein erwachsener Mensch?', back: '206.' },
    { id: 'haut', front: 'Größtes Organ des Menschen', back: 'Die Haut (knapp 2 m²).' },
    { id: 'herzschlag', front: 'Ruhepuls eines Erwachsenen', back: 'Etwa 60–80 Schläge pro Minute (rund 100.000 am Tag).' },
    { id: 'blutmenge', front: 'Wie viel Blut hat ein Erwachsener?', back: 'Rund 5–6 Liter.' },
    { id: 'harvey', front: 'Wer beschrieb 1628 den Blutkreislauf?', back: 'William Harvey.' },
    { id: 'arterie-vene', front: 'Unterschied Arterie und Vene', back: 'Arterien führen vom Herzen weg, Venen zum Herzen hin.' },
    { id: 'zwei-kreislaeufe', front: 'Welche zwei Kreisläufe gibt es?', back: 'Lungenkreislauf (rechte Herzhälfte → Lunge) und Körperkreislauf (linke Herzhälfte → Körper).' },
    { id: 'haemoglobin', front: 'Warum ist Blut rot?', back: 'Wegen des eisenhaltigen Hämoglobins in den roten Blutkörperchen, das Sauerstoff bindet.' },
    { id: 'nieren', front: 'Hauptaufgabe der Nieren', back: 'Blut filtern und Urin bilden (rund 1.500 Liter Blut pro Tag).' },
    { id: 'zns', front: 'Woraus besteht das zentrale Nervensystem?', back: 'Aus Gehirn und Rückenmark.' },
    { id: 'neuronen', front: 'Wie viele Nervenzellen hat das Gehirn?', back: 'Rund 86 Milliarden.' },
    { id: 'kleinhirn', front: 'Aufgabe des Kleinhirns', back: 'Koordination von Bewegungen und Gleichgewicht.' },
    { id: 'sympathikus', front: 'Sympathikus vs. Parasympathikus', back: 'Sympathikus: Aktivierung („Kampf oder Flucht“). Parasympathikus: Ruhe, Erholung, Verdauung.' },
    { id: 'gedaechtnis', front: 'Warum ist man nach manchen Krankheiten immun?', back: 'Gedächtniszellen erkennen den Erreger wieder; es werden sofort passende Antikörper gebildet.' },
    { id: 'abwehr', front: 'Angeborene vs. erworbene Abwehr', back: 'Angeboren: schnell, unspezifisch (Haut, Fresszellen, Fieber). Erworben: passgenau, lernfähig (B-Zellen/Antikörper, T-Zellen, Gedächtnis).' },
    { id: 'blutgruppen', front: 'Wer entdeckte 1901 die Blutgruppen — und welche gibt es?', back: 'Karl Landsteiner; A, B, AB, 0 (plus Rhesusfaktor).' },
    { id: 'universal', front: 'Universalspender und Universalempfänger', back: '0 negativ spendet an alle (rote Blutkörperchen), AB positiv kann von allen empfangen.' },
  ],
};
