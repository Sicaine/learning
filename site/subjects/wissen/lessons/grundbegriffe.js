export default {
  id: 'grundbegriffe',
  title: 'Wirtschaftliche Grundbegriffe',
  summary: 'Angebot und Nachfrage, [[bruttoinlandsprodukt|BIP]], [[konjunktur|Konjunktur]], [[inflation|Inflation]], Arbeitslosigkeit — die Wörter, die in jeder Nachrichtensendung fallen, und was wirklich dahintersteckt.',
  minutes: 25,
  goals: [
    'Erklären, wie Preise durch [[angebot-nachfrage|Angebot und Nachfrage]] entstehen',
    'Das [[bruttoinlandsprodukt|Bruttoinlandsprodukt]] definieren und die Größenordnung für Deutschland kennen',
    'Die Phasen der [[konjunktur|Konjunktur]] und den Begriff [[rezession|Rezession]] einordnen',
    '[[inflation|Inflation]], Deflation und Arbeitslosenquote verstehen und aktuelle Werte nennen',
  ],
  blocks: [
    {
      id: 'markt', type: 'text', title: 'Wie ein Preis entsteht',
      md: `
Ein **Markt** ist jeder Ort, an dem Anbieter und Nachfrager zusammenkommen — der Wochenmarkt ebenso wie eine Online-Börse. Dort gilt das Gesetz von **[[angebot-nachfrage|Angebot und Nachfrage]]**:

- Je **teurer** ein Gut, desto **weniger** wollen Käufer davon (die Nachfragekurve fällt).
- Je **teurer** ein Gut, desto **mehr** wollen Verkäufer anbieten (die Angebotskurve steigt).

Wo sich beide Kurven schneiden, liegt der **Gleichgewichtspreis**: Genau so viel wird angeboten, wie nachgefragt wird — der Markt ist „geräumt“. Liegt der Preis darüber, bleiben Waren liegen (**Angebotsüberhang**) und der Preis sinkt. Liegt er darunter, entsteht Knappheit (**Nachfrageüberhang**) und der Preis steigt.

Ändert sich etwas an den Bedingungen — ein Hitzesommer, eine Missernte, eine neue Technik — **verschiebt sich eine Kurve**, und es entsteht ein neuer Gleichgewichtspreis.`,
    },
    {
      id: 'viz-markt', type: 'viz', viz: 'wirtschaft-markt', title: 'Spiel mit dem Markt',
      params: { goals: ['gleichgewicht', 'nachfrage', 'angebot'] },
      task: 'Erreiche alle drei Ziele unter der Grafik. Beobachte: Wenn die Nachfrage steigt, steigen Gleichgewichtspreis **und** Menge. Wenn das Angebot sinkt, steigt der Preis, aber die Menge sinkt.',
    },
    {
      id: 'bip', type: 'text', title: 'Das Bruttoinlandsprodukt: die Wirtschaftsleistung eines Landes',
      md: `
Das **[[bruttoinlandsprodukt|Bruttoinlandsprodukt (BIP)]]** ist der Wert aller Waren und Dienstleistungen, die in einem Jahr **innerhalb eines Landes** hergestellt werden — abzüglich der Vorleistungen, damit nichts doppelt gezählt wird. Es ist *die* zentrale Kennzahl der Wirtschaft.

- **Nominal** misst in laufenden Preisen. **Real** (preisbereinigt) rechnet die Inflation heraus — nur so sieht man, ob wirklich *mehr* produziert wurde oder nur alles teurer wurde.
- Deutschlands BIP lag **2025 bei rund 4,47 Billionen Euro** (nominal). Real wuchs es um nur **0,2 %** — nach zwei Jahren mit leichtem Rückgang.[^destatis-bip-2025]
- Deutschland ist damit die **drittgrößte Volkswirtschaft der Welt** nach den USA und China.

Das BIP misst allerdings nur, was einen Marktpreis hat. Hausarbeit, Ehrenamt oder Umweltzerstörung tauchen nicht auf — deshalb gibt es alternative Wohlstandsmaße wie den Human Development Index.`,
    },
    {
      id: 'calc-bip', type: 'numeric', title: 'Wachstumsrate berechnen',
      question: 'Das reale BIP eines Landes steigt von 2.000 Mrd. € auf 2.050 Mrd. €. Wie hoch ist die Wachstumsrate in Prozent?',
      answer: 2.5, tolerance: 0.05, unit: '%',
      hint: 'Zuwachs geteilt durch Ausgangswert, mal 100.',
      explain: '$\\frac{50}{2000} \\cdot 100 = 2{,}5\\,\\%$. Zum Vergleich: Deutschland wuchs 2025 real nur um 0,2 %.',
    },
    {
      id: 'konjunktur', type: 'text', title: 'Konjunktur: das Auf und Ab',
      md: `
Die Wirtschaft wächst nicht gleichmäßig, sondern in Wellen — die **[[konjunktur|Konjunktur]]**. Man unterscheidet vier Phasen:

1. **Aufschwung** (Expansion): Aufträge und Investitionen nehmen zu, Arbeitslosigkeit sinkt.
2. **Hochkonjunktur** (Boom): Kapazitäten sind ausgelastet, Löhne und Preise steigen.
3. **Abschwung**: Nachfrage und Investitionen gehen zurück.
4. **Tiefphase** (Depression): Produktion und Beschäftigung sind niedrig — bis der nächste Aufschwung beginnt.

Schrumpft das reale BIP zwei Quartale in Folge, spricht man meist von einer **[[rezession|Rezession]]**. Die tiefste Nachkriegsrezession erlebte Deutschland 2009 (Finanzkrise, etwa −5,7 %), einen weiteren Einbruch 2020 durch die Corona-Pandemie.`,
    },
    {
      id: 'order-konjunktur', type: 'order', title: 'Der Konjunkturzyklus',
      prompt: 'Bring die Phasen in die richtige Reihenfolge — beginnend mit dem Aufschwung.',
      items: ['Aufschwung: Aufträge und Investitionen steigen', 'Hochkonjunktur: Kapazitäten ausgelastet, Preise steigen', 'Abschwung: Nachfrage lässt nach', 'Tiefphase: niedrige Produktion und hohe Arbeitslosigkeit'],
      explain: 'Danach beginnt der Zyklus von vorn. Die Politik versucht, die Ausschläge zu dämpfen — etwa mit Konjunkturprogrammen im Abschwung.',
    },
    {
      id: 'inflation', type: 'text', title: 'Inflation: wenn Geld an Wert verliert',
      md: `
**[[inflation|Inflation]]** bedeutet: Das **allgemeine Preisniveau steigt** — für denselben Euro bekommt man weniger. Gemessen wird sie in Deutschland vom Statistischen Bundesamt mit dem **Verbraucherpreisindex (VPI)**: Ein „Warenkorb“ aus rund 650 typischen Gütern wird jeden Monat neu bepreist.

- Die **Europäische Zentralbank** strebt mittelfristig **2 %** an — etwas Inflation gilt als gesund.
- Nach dem russischen Angriff auf die Ukraine schoss die Inflation hoch: **6,9 % (2022)** und **5,9 % (2023)**. 2024 und **2025 lag sie jeweils bei 2,2 %**.[^destatis-vpi-2025]
- Das Gegenteil, **Deflation** (sinkende Preise), klingt gut, ist aber gefährlich: Menschen verschieben Käufe, Unternehmen investieren nicht, die Wirtschaft kann in eine Abwärtsspirale geraten.
- Extremfall **Hyperinflation**: 1923 kostete in Deutschland ein Brot zeitweise Milliarden Mark.`,
    },
    {
      id: 'calc-inflation', type: 'numeric', title: 'Kaufkraftverlust',
      question: 'Ein Fahrrad kostet 800 €. Die Preise steigen ein Jahr lang um 5 %. Was kostet das Fahrrad danach (bei gleichem Anstieg)?',
      answer: 840, tolerance: 0.5, unit: '€',
      hint: '5 % von 800 € sind …',
      explain: '$800 \\cdot 1{,}05 = 840$ €. Faustregel: Teilt man 70 durch die Inflationsrate, erhält man ungefähr die Jahre, bis sich die Preise verdoppeln — bei 2 % also etwa 35 Jahre.',
    },
    {
      id: 'arbeit', type: 'text', title: 'Arbeitslosigkeit',
      md: `
Als **arbeitslos** gilt in der deutschen Statistik, wer bei der **Bundesagentur für Arbeit** (Sitz: Nürnberg) gemeldet ist, keine oder nur eine Beschäftigung unter 15 Wochenstunden hat und Arbeit sucht. Die **[[arbeitslosenquote|Arbeitslosenquote]]** setzt diese Zahl ins Verhältnis zu allen zivilen Erwerbspersonen.

- **2025**: im Jahresdurchschnitt rund **2,98 Millionen** Arbeitslose, Quote **6,3 %**.[^ba-2025]
- Zum Vergleich: Um 2005 waren es fast 5 Millionen; bis 2019 sank die Zahl auf rund 2,3 Millionen.
- Die Zahl der **Erwerbstätigen** lag 2025 bei etwa **46 Millionen** — so viele wie nie zuvor, aber erstmals seit Langem nicht mehr steigend.

Ökonomen unterscheiden Ursachen: **konjunkturelle** (zu wenig Nachfrage), **strukturelle** (Qualifikationen passen nicht zu den offenen Stellen), **friktionelle** (kurze Übergangszeiten beim Jobwechsel) und **saisonale** Arbeitslosigkeit (z. B. auf dem Bau im Winter).`,
    },
    {
      id: 'match-begriffe', type: 'match', title: 'Begriff und Bedeutung',
      pairs: [
        ['Inflation', 'Das allgemeine Preisniveau steigt'],
        ['Deflation', 'Das allgemeine Preisniveau sinkt'],
        ['Rezession', 'Reales BIP schrumpft zwei Quartale in Folge'],
        ['Reales BIP', 'Wirtschaftsleistung, um Preisänderungen bereinigt'],
        ['Nachfrageüberhang', 'Mehr Käufer als Waren — der Preis steigt'],
        ['Verbraucherpreisindex', 'Misst die Preise eines typischen Warenkorbs'],
      ],
    },
    {
      id: 'quiz-real', type: 'quiz', title: 'Nominal oder real?',
      question: 'Das nominale BIP steigt um 3 %, die Preise steigen im selben Jahr um 3 %. Was ist mit der realen Wirtschaftsleistung?',
      options: [
        { text: 'Sie ist ungefähr gleich geblieben.', correct: true, why: 'Das nominale Plus wird komplett durch höhere Preise erklärt — real wurde nicht mehr produziert.' },
        { text: 'Sie ist um 3 % gestiegen.', correct: false, why: 'Das wäre das nominale Wachstum. Real muss man die Preissteigerung abziehen.' },
        { text: 'Sie ist um 6 % gestiegen.', correct: false, why: 'Preissteigerung und nominales Wachstum addiert man nicht.' },
        { text: 'Sie ist um 3 % gesunken.', correct: false, why: 'Ein Rückgang läge nur vor, wenn die Preise stärker gestiegen wären als das nominale BIP.' },
      ],
    },
    {
      id: 'fact-warenkorb', type: 'callout', tone: 'fact', title: 'Der Warenkorb verrät die Zeit',
      md: 'Der Warenkorb des Verbraucherpreisindex wird regelmäßig angepasst. Im Lauf der Jahrzehnte flogen Dinge wie Schreibmaschinen, Farbfilme und Videorekorder hinaus, dafür kamen Smartphones, Streamingdienste und E-Bikes hinein. Wer die Liste liest, sieht, wie sich der Alltag verändert hat.',
    },
    {
      id: 'recall-inflation', type: 'recall', title: 'Erklär es einem Freund',
      prompt: 'Warum strebt die EZB eine Inflation von **2 %** an und nicht von 0 %?',
      answer: 'Eine leichte Inflation gibt einen **Sicherheitsabstand zur Deflation**: Sinkende Preise können eine gefährliche Spirale auslösen (Käufe und Investitionen werden aufgeschoben, Schulden werden real schwerer). Außerdem wird Inflation im Warenkorb tendenziell leicht überschätzt (Qualitätsverbesserungen), und die Notenbank braucht Spielraum, die Zinsen in Krisen zu senken. 2 % gelten als Preisstabilität, ohne diese Risiken.',
      hints: ['Was passiert bei sinkenden Preisen mit Kaufentscheidungen?'],
      cards: ['ziel-2'],
    },
  ],
  cards: [
    { id: 'gleichgewicht', front: 'Was ist der Gleichgewichtspreis?', back: 'Der Preis, bei dem angebotene und nachgefragte Menge gleich sind — der Markt ist geräumt (Schnittpunkt der Kurven).' },
    { id: 'nachfrage-steigt', front: 'Die Nachfrage steigt (Kurve nach rechts). Was passiert mit Preis und Menge?', back: 'Beide steigen.' },
    { id: 'angebot-sinkt', front: 'Das Angebot sinkt (z. B. Missernte). Was passiert mit Preis und Menge?', back: 'Der Preis steigt, die Menge sinkt.' },
    { id: 'bip-def', front: 'Was misst das Bruttoinlandsprodukt?', back: 'Den Wert aller in einem Jahr im Inland produzierten Waren und Dienstleistungen (abzüglich Vorleistungen).' },
    { id: 'bip-real', front: 'Unterschied nominales und reales BIP', back: 'Nominal: in laufenden Preisen. Real: um Preisänderungen (Inflation) bereinigt — zeigt echtes Wachstum.' },
    { id: 'bip-de', front: 'BIP Deutschlands 2025 — Größenordnung und Wachstum', back: 'Rund 4,47 Billionen € (nominal); real +0,2 %. Drittgrößte Volkswirtschaft nach USA und China.' },
    { id: 'phasen', front: 'Die vier Konjunkturphasen', back: 'Aufschwung → Hochkonjunktur (Boom) → Abschwung → Tiefphase (Depression).' },
    { id: 'rezession', front: 'Übliche Definition einer Rezession', back: 'Das reale BIP schrumpft zwei Quartale in Folge.' },
    { id: 'inflation-def', front: 'Inflation — Definition und Messung in Deutschland', back: 'Anstieg des allgemeinen Preisniveaus; gemessen mit dem Verbraucherpreisindex (Warenkorb) des Statistischen Bundesamts.' },
    { id: 'ziel-2', front: 'Inflationsziel der EZB', back: '2 % mittelfristig — Abstand zur gefährlichen Deflation, Spielraum für Zinssenkungen.' },
    { id: 'inflation-werte', front: 'Inflationsraten Deutschland 2022, 2023, 2025', back: '6,9 % (2022), 5,9 % (2023), 2,2 % (2025).' },
    { id: 'deflation', front: 'Warum ist Deflation gefährlich?', back: 'Käufe und Investitionen werden aufgeschoben, Schulden werden real schwerer — Gefahr einer Abwärtsspirale.' },
    { id: 'hyper', front: 'Wann erlebte Deutschland eine Hyperinflation?', back: '1923 (Weimarer Republik).' },
    { id: 'alq', front: 'Arbeitslose und Arbeitslosenquote 2025', back: 'Rund 2,98 Mio. im Jahresdurchschnitt, Quote 6,3 % (Bundesagentur für Arbeit, Nürnberg).' },
    { id: 'arten', front: 'Vier Arten von Arbeitslosigkeit', back: 'Konjunkturell, strukturell, friktionell, saisonal.' },
    { id: 'regel-70', front: 'Faustregel: Wann verdoppeln sich die Preise bei 2 % Inflation?', back: 'Nach etwa 70 ÷ 2 = 35 Jahren.' },
  ],
};
