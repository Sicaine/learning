export default {
  id: 'physik',
  title: 'Physik: Kräfte, Energie, Strom',
  summary: 'Von Newtons Apfel bis zu Einsteins $E = mc^2$: die Grundideen der Physik, die in keiner Allgemeinbildung fehlen dürfen — und die Einheiten, mit denen du im Alltag ständig zu tun hast.',
  minutes: 22,
  goals: [
    'Die drei [[newtonsche-gesetze|Newtonschen Gesetze]] und die [[gravitation]] in eigenen Worten erklären',
    'Den Satz von der [[energieerhaltung]] anwenden und Watt, Kilowattstunde und Joule unterscheiden',
    'Spannung, Stromstärke und Widerstand beim [[elektrischer-strom|elektrischen Strom]] auseinanderhalten',
    'Wissen, was [[relativitaetstheorie]] und [[quantenphysik]] im Kern besagen und wer dahintersteht',
  ],
  blocks: [
    {
      id: 'newton', type: 'text', title: 'Newton: Warum der Apfel fällt — und der Mond nicht',
      md: `
1687 veröffentlichte **[Isaac Newton](wiki:Isaac Newton|Isaac Newton)** sein Hauptwerk *[Philosophiae Naturalis Principia Mathematica](wiki:Philosophiae Naturalis Principia Mathematica|Philosophiæ Naturalis Principia Mathematica)*.[^nat-wp-newton] Darin stehen die drei Grundgesetze der Bewegung, die [[newtonsche-gesetze]]:

1. **Trägheit:** Ohne Kraft bleibt ein Körper in Ruhe oder fliegt geradeaus weiter. (Deshalb schiebt es dich beim Bremsen im Bus nach vorn.)
2. **Kraft = Masse × Beschleunigung:** $F = m \\cdot a$. Die Einheit der Kraft heißt ihm zu Ehren **Newton** (N).
3. **Actio = reactio:** Jede Kraft hat eine gleich große Gegenkraft. Eine Rakete stößt Gas nach hinten — und wird dadurch nach vorn gedrückt.

Dazu kam das [Gravitationsgesetz](wiki:Newtonsches Gravitationsgesetz|Newton's law of universal gravitation): Dieselbe [[gravitation]], die den Apfel zu Boden zieht, hält den Mond auf seiner Bahn. Der Mond „fällt“ ständig um die Erde herum, nur ist er so schnell, dass er sie immer wieder verfehlt. Auf der Erdoberfläche beschleunigt die Schwerkraft alles mit rund $g \\approx 9{,}81\\,\\text{m/s}^2$ — ohne Luftwiderstand fallen Feder und Hammer gleich schnell ([Apollo 15](wiki:Apollo 15|Apollo 15) hat das 1971 auf dem Mond vorgeführt).`,
    },
    {
      id: 'quiz-newton', type: 'quiz', title: 'Welches Gesetz ist das?',
      question: 'Ein Astronaut wirft im All einen [Schraubenschlüssel](wiki:Schraubenschlüssel|Wrench) von sich weg — und treibt dabei selbst in die entgegengesetzte Richtung. Welches Prinzip zeigt das am direktesten?',
      options: [
        { text: 'Das Trägheitsprinzip', correct: false, why: 'Trägheit erklärt, warum der Schlüssel danach immer weiterfliegt — nicht, warum der Astronaut zurückweicht.' },
        { text: 'Actio = reactio (Wechselwirkungsprinzip)', correct: true, why: 'Der Astronaut drückt auf den Schlüssel, der Schlüssel drückt gleich stark zurück — genau wie bei einer Rakete.' },
        { text: 'Das Gravitationsgesetz', correct: false, why: 'Die Anziehung zwischen Astronaut und Schlüssel ist verschwindend gering.' },
        { text: 'Der Energieerhaltungssatz', correct: false, why: 'Energie bleibt zwar erhalten, aber das Zurückweichen erklärt das Wechselwirkungsprinzip.' },
      ],
    },
    {
      id: 'energie', type: 'text', title: 'Energie: nichts geht verloren',
      md: `
Der vielleicht wichtigste Satz der Physik: **Energie kann weder erzeugt noch vernichtet, nur umgewandelt werden** — die [[energieerhaltung]].[^nat-wp-energieerhaltung] Ein [Fahrraddynamo](wiki:Fahrraddynamo|Bicycle lighting#Dynamo systems) wandelt Bewegungsenergie in elektrische Energie, eine Glühbirne elektrische Energie in Licht und (vor allem) Wärme. Wenn wir von „Energieverbrauch“ sprechen, meinen wir eigentlich: Energie wird in eine Form umgewandelt, mit der wir nichts mehr anfangen können, meist Abwärme.

Drei Begriffe werden ständig verwechselt:

<table>
<tr><th>Größe</th><th>Einheit</th><th>Bedeutung</th><th>Beispiel</th></tr>
<tr><td>Energie</td><td>[Joule](wiki:Joule|Joule) (J), [Kilowattstunde](wiki:Kilowattstunde|Watt hour) (kWh)</td><td>Wie viel Arbeit insgesamt</td><td>Ein 2-Personen-Haushalt braucht gut 2.000–3.000 kWh Strom im Jahr</td></tr>
<tr><td>Leistung</td><td>Watt (W)</td><td>Energie pro Zeit — wie schnell</td><td>Wasserkocher: rund 2.000 W</td></tr>
<tr><td>Kraft</td><td>Newton (N)</td><td>Was eine Bewegung ändert</td><td>Gewichtskraft von 1 kg: rund 9,81 N</td></tr>
</table>

Merke: **Kilowattstunde = Leistung × Zeit.** Ein Gerät mit 1.000 Watt, das eine Stunde läuft, verbraucht 1 kWh.`,
    },
    {
      id: 'calc-kwh', type: 'numeric', title: 'Was kostet der Wasserkocher?',
      question: 'Ein Wasserkocher mit **2.000 Watt** läuft jeden Tag insgesamt **6 Minuten**. Wie viele Kilowattstunden verbraucht er in einem Jahr (365 Tage)?',
      answer: 73, tolerance: 0.5, unit: 'kWh',
      hint: '6 Minuten sind 0,1 Stunden. 2 kW × 0,1 h = ? kWh pro Tag.',
      explain: '2 kW × 0,1 h = 0,2 kWh pro Tag; × 365 = **73 kWh** pro Jahr. Bei rund 35 Cent pro kWh sind das etwa 25 € — Energie ist Leistung *mal* Zeit.',
    },
    {
      id: 'strom', type: 'text', title: 'Strom: Spannung, Stromstärke, Widerstand',
      md: `
[[elektrischer-strom|Elektrischer Strom]] ist die Bewegung von Ladungen — in Metallkabeln fließen [Elektronen](wiki:Elektron|Electron).[^nat-wp-strom] Das beste Bild ist ein Wasserkreislauf:

- **[Spannung](wiki:Elektrische Spannung|Voltage)** $U$ (Volt) ist der Druck, der das Wasser antreibt. Steckdose in Deutschland: **230 V**, Autobatterie: 12 V.
- **[Stromstärke](wiki:Elektrische Stromstärke|Electric current intensity)** $I$ (Ampere) ist, wie viel Wasser pro Sekunde fließt.
- **[Widerstand](wiki:Elektrischer Widerstand|Electrical resistance)** $R$ (Ohm, Ω) ist, wie eng das Rohr ist.

Das **[Ohmsche Gesetz](wiki:Ohmsches Gesetz|Ohm's law)** verbindet sie: $U = R \\cdot I$. Und die Leistung ist $P = U \\cdot I$ — bei 230 V und 10 A also 2.300 Watt.

Die Einheiten ehren Pioniere: **[Volta](wiki:Alessandro Volta|Alessandro Volta)** (Batterie, um 1800), **[Ampère](wiki:André-Marie Ampère|André-Marie Ampère)**, **[Georg Simon Ohm](wiki:Georg Simon Ohm|Georg Ohm)** (ein deutscher Physiker, 1827) und **[James Watt](wiki:James Watt|James Watt)**. Den Zusammenhang von Elektrizität und Magnetismus fassten [James Clerk Maxwell](wiki:James Clerk Maxwell|James Clerk Maxwell)s Gleichungen in den 1860ern zusammen — die Grundlage für Motoren, Generatoren und Funk.`,
    },
    {
      id: 'match-einheiten', type: 'match', title: 'Größe und Einheit',
      prompt: 'Ordne jeder physikalischen Größe ihre Einheit zu.',
      pairs: [['Kraft', 'Newton (N)'], ['Leistung', 'Watt (W)'], ['Energie', 'Joule (J)'], ['Spannung', 'Volt (V)'], ['Stromstärke', 'Ampere (A)'], ['Widerstand', 'Ohm (Ω)']],
    },
    {
      id: 'moderne', type: 'text', title: 'Das 20. Jahrhundert: Einstein und die Quanten',
      md: `
Um 1900 zeigten sich Risse in Newtons Weltbild. Zwei neue Theorien lösten sie — und beide gehören zum Allgemeinwissen:

**[[relativitaetstheorie|Relativitätstheorie]] ([Albert Einstein](wiki:Albert Einstein|Albert Einstein)).**[^nat-wp-einstein] 1905, in seinem „Wunderjahr“, veröffentlichte der damals 26-jährige Patentprüfer in [Bern](wiki:Bern|Bern) die *spezielle* Relativitätstheorie: Die [Lichtgeschwindigkeit](wiki:Lichtgeschwindigkeit|Speed of light) (rund 300.000 km/s) ist für alle gleich; dafür sind Zeit und Raum relativ. Daraus folgt die berühmteste Formel der Welt:

$$E = m c^2$$

Schon eine winzige Masse entspricht einer riesigen Energie — das erklärt, warum die Sonne leuchtet und warum [Kernspaltung](wiki:Kernspaltung|Nuclear fission) so viel Energie freisetzt. 1915 folgte die *allgemeine* Relativitätstheorie: Masse krümmt Raum und Zeit, und diese Krümmung spüren wir als Schwerkraft.

**[[quantenphysik|Quantenphysik]].**[^nat-wp-quanten] 1900 stellte **[Max Planck](wiki:Max Planck|Max Planck)** in Berlin fest, dass Energie nur in winzigen Portionen, *[Quanten](wiki:Quant|Quantum)*, abgegeben wird — die Geburtsstunde der Quantenphysik. In der Welt der Atome gelten seltsame Regeln: Teilchen sind zugleich Wellen, und man kann Ort und Impuls nicht gleichzeitig genau kennen (**[Heisenbergsche Unschärferelation](wiki:Heisenbergsche Unschärferelation|Uncertainty principle)**, 1927). Ohne Quantenphysik gäbe es keine [Laser](wiki:Laser|Laser), keine Computerchips, keine [LEDs](wiki:Leuchtdiode|Light-emitting diode).

Einstein bekam seinen [Nobelpreis](wiki:Nobelpreis für Physik|Nobel Prize in Physics) 1921 übrigens nicht für die Relativitätstheorie, sondern für die Erklärung des [Photoeffekts](wiki:Photoelektrischer Effekt|Photoelectric effect) — ein Beitrag zur Quantenphysik.`,
    },
    {
      id: 'fact-gps', type: 'callout', tone: 'fact', title: 'Einstein in deiner Hosentasche',
      md: `Die Uhren in [GPS](wiki:Global Positioning System|Global Positioning System)-Satelliten gehen wegen ihrer hohen Geschwindigkeit langsamer (spezielle Relativität), wegen der schwächeren Schwerkraft in 20.000 km Höhe aber schneller (allgemeine Relativität). Unterm Strich laufen sie pro Tag rund 38 Mikrosekunden vor. Ohne Korrektur läge dein Navi nach einem Tag um etwa 10 Kilometer daneben.`,
    },
    {
      id: 'timeline-physik', type: 'viz', viz: 'timeline', title: 'Meilensteine der Physik',
      params: {
        events: [
          { year: 1687, label: 'Newtons Principia', detail: 'Bewegungsgesetze und Gravitationsgesetz.' },
          { year: 1800, label: 'Voltas Batterie', detail: 'Erste Quelle für dauerhaften elektrischen Strom.' },
          { year: 1827, label: 'Ohmsches Gesetz', detail: '[Georg Simon Ohm](wiki:Georg Simon Ohm|Georg Ohm): $U = R \\cdot I$.' },
          { year: 1847, label: 'Energieerhaltung', detail: '[Hermann von Helmholtz](wiki:Hermann von Helmholtz|Hermann von Helmholtz) formuliert den Energieerhaltungssatz allgemein.' },
          { year: 1864, label: 'Maxwell-Gleichungen', detail: 'Elektrizität, Magnetismus und Licht in einer Theorie.' },
          { year: 1900, label: 'Plancks Quanten', detail: '[Max Planck](wiki:Max Planck|Max Planck): Energie kommt in Portionen.' },
          { year: 1905, label: 'Spezielle Relativität', detail: 'Einsteins Wunderjahr, $E = mc^2$.' },
          { year: 1915, label: 'Allgemeine Relativität', detail: 'Gravitation als Krümmung der Raumzeit.' },
          { year: 1927, label: 'Unschärferelation', detail: '[Werner Heisenberg](wiki:Werner Heisenberg|Werner Heisenberg).' },
          { year: 1938, label: 'Kernspaltung', detail: '[Otto Hahn](wiki:Otto Hahn|Otto Hahn) und [Fritz Straßmann](wiki:Fritz Straßmann|Fritz Strassmann) in Berlin; Deutung durch [Lise Meitner](wiki:Lise Meitner|Lise Meitner) und [Otto Frisch](wiki:Otto Robert Frisch|Otto Robert Frisch).' },
        ],
      },
    },
    {
      id: 'order-physik', type: 'game', viz: 'timeline', title: 'Chronologie-Spiel',
      params: {
        mode: 'sort',
        events: [
          { year: 1687, label: 'Newtons Principia' },
          { year: 1827, label: 'Ohmsches Gesetz' },
          { year: 1900, label: 'Plancks Quanten' },
          { year: 1905, label: 'E = mc²' },
          { year: 1915, label: 'Allgemeine Relativität' },
          { year: 1938, label: 'Kernspaltung entdeckt' },
        ],
      },
    },
    {
      id: 'quiz-irrtum', type: 'quiz', title: 'Mythen-Check',
      question: 'Welche Aussagen sind **richtig**?',
      options: [
        { text: 'Ohne Luftwiderstand fallen eine Feder und ein Hammer gleich schnell.', correct: true, why: 'Die Fallbeschleunigung hängt nicht von der Masse ab — [David Scott](wiki:David Scott (Astronaut)|David Scott) hat es auf dem Mond vorgeführt.' },
        { text: 'Ein Kraftwerk erzeugt Energie aus dem Nichts.', correct: false, why: 'Es *wandelt* Energie um (chemische, nukleare, Bewegungsenergie) — Energieerhaltung.' },
        { text: 'Einstein erhielt den Nobelpreis für die Relativitätstheorie.', correct: false, why: 'Er erhielt ihn 1921 für die Erklärung des [Photoeffekts](wiki:Photoelektrischer Effekt|Photoelectric effect).' },
        { text: 'Kilowattstunde ist eine Einheit der Energie, Watt eine der Leistung.', correct: true, why: 'kWh = Leistung × Zeit.' },
        { text: 'Im Weltall gibt es keine Schwerkraft.', correct: false, why: 'Auch auf der [ISS](wiki:Internationale Raumstation|International Space Station) wirkt fast 90 % der Erdschwerkraft — die Astronauten schweben, weil sie ständig um die Erde „fallen“.' },
      ],
    },
    {
      id: 'recall-emc2', type: 'recall', title: 'Erkläre es einem Freund',
      prompt: 'Was bedeutet $E = mc^2$ — und warum ist diese Formel so folgenreich? Antworte in 2–4 Sätzen.',
      answer: `Die Formel sagt, dass **Masse eine Form von Energie** ist: Energie $E$ = Masse $m$ mal Lichtgeschwindigkeit $c$ zum Quadrat. Weil $c^2$ riesig ist (rund $9 \\cdot 10^{16}\\,\\text{m}^2/\\text{s}^2$), steckt schon in einer winzigen Masse eine gewaltige Energie. Das erklärt, warum die Sonne durch [Kernfusion](wiki:Kernfusion|Nuclear fusion) Milliarden Jahre leuchten kann und warum [Kernkraftwerke](wiki:Kernkraftwerk|Nuclear power plant) und Atombomben aus wenigen Kilogramm [Uran](wiki:Uran|Uranium) so viel Energie freisetzen. Einstein leitete sie 1905 aus der speziellen Relativitätstheorie ab.`,
      hints: ['Welche zwei Dinge setzt die Formel gleich?', 'Wie groß ist die Lichtgeschwindigkeit — und was passiert beim Quadrieren?'],
      cards: ['emc2'],
    },
  ],
  cards: [
    { id: 'newton1', front: 'Die drei Newtonschen Gesetze', back: '1. Trägheitsprinzip, 2. $F = m \\cdot a$ (Aktionsprinzip), 3. actio = reactio (Wechselwirkungsprinzip). Veröffentlicht 1687 in den *Principia*.' },
    { id: 'principia', front: 'Wann erschien Newtons *Principia*?', back: '1687.' },
    { id: 'g', front: 'Fallbeschleunigung auf der Erde', back: '$g \\approx 9{,}81\\,\\text{m/s}^2$.' },
    { id: 'energieerh', front: 'Energieerhaltungssatz in einem Satz', back: 'Energie kann weder erzeugt noch vernichtet, nur von einer Form in eine andere umgewandelt werden.' },
    { id: 'kwh', front: 'Was ist eine Kilowattstunde?', back: 'Eine Einheit der **Energie**: 1.000 Watt eine Stunde lang (= 3,6 Millionen Joule).' },
    { id: 'watt', front: 'Unterschied Watt und Kilowattstunde', back: 'Watt = Leistung (Energie pro Zeit), Kilowattstunde = Energie (Leistung × Zeit).' },
    { id: 'ohm', front: 'Ohmsches Gesetz', back: '$U = R \\cdot I$ — Spannung = Widerstand × Stromstärke (Georg Simon Ohm, 1827).' },
    { id: 'steckdose', front: 'Spannung einer Haushaltssteckdose in Deutschland', back: '230 Volt (Wechselspannung, 50 Hertz).' },
    { id: 'leistung', front: 'Formel für elektrische Leistung', back: '$P = U \\cdot I$ (Watt = Volt × Ampere).' },
    { id: 'emc2', front: 'Was sagt $E = mc^2$?', back: 'Masse ist eine Form von Energie; wegen des riesigen $c^2$ entspricht wenig Masse sehr viel Energie. Einstein, 1905.' },
    { id: 'srt-art', front: 'Spezielle und allgemeine Relativitätstheorie — Jahre?', back: 'Spezielle 1905, allgemeine 1915 (Albert Einstein).' },
    { id: 'licht', front: 'Lichtgeschwindigkeit (gerundet)', back: 'Rund 300.000 km pro Sekunde (genau 299.792.458 m/s).' },
    { id: 'planck', front: 'Wer begründete 1900 die Quantenphysik?', back: 'Max Planck (Energie wird in Portionen, „Quanten“, abgegeben).' },
    { id: 'heisenberg', front: 'Was besagt die Heisenbergsche Unschärferelation?', back: 'Ort und Impuls eines Teilchens lassen sich nicht gleichzeitig beliebig genau bestimmen (1927).' },
    { id: 'einstein-nobel', front: 'Wofür bekam Einstein den Nobelpreis?', back: 'Für die Erklärung des Photoeffekts (Nobelpreis für Physik 1921) — nicht für die Relativitätstheorie.' },
    { id: 'gps', front: 'Warum braucht GPS die Relativitätstheorie?', back: 'Die Satellitenuhren laufen relativistisch rund 38 Mikrosekunden pro Tag vor; ohne Korrektur wäre die Position nach einem Tag etwa 10 km falsch.' },
  ],
};
