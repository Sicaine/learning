export default {
  id: 'roemer-germanen',
  title: 'Römer, Germanen & die Varusschlacht',
  summary: 'Warum Köln und Trier römische Städte sind, was im Jahr 9 n. Chr. im Teutoburger Wald geschah — und wie aus dem Ende Roms das Frankenreich hervorging.',
  minutes: 20,
  goals: [
    'Erklären, wo und warum das Römische Reich in Germanien seine Grenze zog ([[limes]], Rhein, Donau)',
    'Die [[varusschlacht]] datieren, ihre Hauptpersonen nennen und ihre Folgen einordnen',
    'Römische Stadtgründungen in Deutschland erkennen',
    'Den Übergang von der [[voelkerwanderung|Völkerwanderung]] zum [[frankenreich|Frankenreich]] skizzieren',
  ],
  blocks: [
    {
      id: 'intro', type: 'text', title: 'Rom am Rhein',
      md: `
Um die Zeitenwende reichte das Römische Reich bis an **[Rhein](wiki:Rhein|Rhine) und [Donau](wiki:Donau|Danube)**. Links des Rheins und südlich der Donau entstanden römische Provinzen mit Straßen, Legionslagern, Thermen und Städten. Viele deutsche Städte sind römische Gründungen:

- **[Köln](wiki:Köln|Cologne)** — *Colonia Claudia Ara Agrippinensium*, Stadtrecht 50 n. Chr.
- **[Trier](wiki:Trier)** — *Augusta Treverorum*, später sogar Kaiserresidenz ([Porta Nigra](wiki:Porta Nigra))
- **[Mainz](wiki:Mainz)**, **[Bonn](wiki:Bonn)**, **[Koblenz](wiki:Koblenz)**, **[Augsburg](wiki:Augsburg)**, **[Regensburg](wiki:Regensburg)** — aus Legionslagern oder Siedlungen hervorgegangen

Jenseits davon lebten die **[Germanen](wiki:Germanen|Germanic peoples)** — kein einheitliches Volk, sondern viele Stämme ([Cherusker](wiki:Cherusker|Cherusci), [Chatten](wiki:Chatten|Chatti), [Sueben](wiki:Sueben|Suebi) …), deren Sammelname von den Römern stammt. Sie hinterließen keine eigenen Geschichtsbücher; was wir über sie wissen, stammt großteils von römischen Autoren wie **Tacitus** (*Germania*, um 98 n. Chr.) und aus der Archäologie.`,
    },
    {
      id: 'map-rom-germanien', type: 'map', title: 'Rom am Rhein: Städte, Flüsse und der Limes',
      view: [3.9, 47.2, 14.0, 52.9],
      rivers: [{ name: 'Rhein', labelAt: 0.18 }, { name: 'Donau', labelAt: 0.8 }],
      places: [
        { name: 'Köln', pos: 'l', detail: '**[Köln](wiki:Köln|Cologne)** — *Colonia Claudia Ara Agrippinensium*, Stadtrecht 50 n. Chr.; Hauptstadt der Provinz Niedergermanien.' },
        { name: 'Xanten', pos: 'l', detail: '**[Xanten](wiki:Xanten)** — am Niederrhein lag das Legionslager *Vetera*, später die *Colonia Ulpia Traiana*.' },
        { name: 'Bonn', pos: 'l', detail: '**[Bonn](wiki:Bonn)** — Legionslager *Bonna*.' },
        { name: 'Koblenz', pos: 'l', detail: '**[Koblenz](wiki:Koblenz)** — *Confluentes* (Zusammenfluss von Rhein und Mosel).' },
        { name: 'Mainz', pos: 'l', detail: '**[Mainz](wiki:Mainz)** — *Mogontiacum*, Legionslager und Hauptstadt der Provinz Obergermanien.' },
        { name: 'Trier', pos: 'l', detail: '**[Trier](wiki:Trier)** — *Augusta Treverorum*, im 4. Jahrhundert Kaiserresidenz; die [Porta Nigra](wiki:Porta Nigra) ist das römische Stadttor.' },
        { name: 'Augsburg', detail: '**[Augsburg](wiki:Augsburg)** — *Augusta Vindelicum*, Hauptstadt der Provinz Raetien.' },
        { name: 'Regensburg', detail: '**[Regensburg](wiki:Regensburg)** — Legionslager *Castra Regina* an der Donau.' },
        { name: 'Kalkriese', kind: 'battle', pos: 'r', detail: '**[Kalkriese](wiki:Museum und Park Kalkriese|Kalkriese)** — wahrscheinlicher Schauplatz der Varusschlacht (9 n. Chr.).' },
      ],
      lines: [
        { label: 'Limes (ungefährer Verlauf)', dashed: true, color: '#b91c1c', coords: [[7.331,50.496],[7.711,50.338],[8.567,50.272],[8.985,50.082],[9.264,49.704],[9.368,49.583],[9.426,49.431],[9.470,49.310],[9.579,48.980],[9.688,48.798],[10.094,48.837],[10.157,48.917],[10.754,49.115],[10.972,49.031],[11.771,48.854]],
          detail: 'Der **Obergermanisch-Raetische [Limes](wiki:Obergermanisch-Raetischer Limes|Upper Germanic-Rhaetian Limes)** — von Rheinbrohl am Rhein bis Eining an der Donau, rund 550 km. Der Verlauf ist hier vereinfacht.' },
      ],
      caption: 'Tippe auf Marker und Linien. Südlich der Donau und westlich des Rheins lagen die römischen Provinzen; dazwischen sicherte der Limes das „Dekumatland“.',
    },
    {
      id: 'video-varus', type: 'video', youtube: 'scPZum-mi4A', label: '1. Jahrhundert – Germanen gegen Rom – Varusschlacht', channel: 'MrWissen2go | Terra X',
      why: 'Mirko Drotschmann erzählt die Varusschlacht und ihre Folgen kompakt — ein guter Einstieg in die Reihe „#jahr100".',
    },
    {
      id: 'varus', type: 'text', title: 'Das Jahr 9 n. Chr.: die Varusschlacht',
      md: `
Kaiser [Augustus](wiki:Augustus) wollte Germanien bis zur **[Elbe](wiki:Elbe)** zur Provinz machen. Statthalter war **[Publius Quinctilius Varus](wiki:Publius Quinctilius Varus)**. Einer seiner Vertrauten war der [Cherusker](wiki:Cherusker|Cherusci) **[Arminius](wiki:Arminius)** — ein germanischer Adliger, der im römischen Heer gedient und das römische Bürgerrecht erhalten hatte.

Im Herbst 9 n. Chr. lockte Arminius Varus mit der Meldung eines Aufstands in unwegsames Gelände. Auf dem Marsch wurden drei Legionen samt Hilfstruppen in einem tagelangen Hinterhalt vernichtet — die **[[varusschlacht]]**. Varus nahm sich das Leben. Überliefert ist Augustus' Ausruf: *„Varus, gib mir meine Legionen wieder!"*

Die Folgen:

- Rom gab den Plan einer Provinz bis zur Elbe auf; nach Strafzügen unter [Germanicus](wiki:Germanicus) (bis 16 n. Chr.) wurde der **[Rhein](wiki:Rhein|Rhine)** zur dauerhaften Grenze.
- Später sicherten die Römer das Gebiet zwischen Rhein und Donau mit dem **[[limes]]**.
- Der genaue Ort war lange umstritten; seit den Funden ab 1987 gilt **[Kalkriese](wiki:Museum und Park Kalkriese|Kalkriese)** bei [Osnabrück](wiki:Osnabrück|Osnabrück) als wahrscheinlicher Schauplatz.[^museum-kalkriese][^wp-varusschlacht]`,
    },
    {
      id: 'map-varus', type: 'map', title: 'Wo geschah die Varusschlacht?',
      view: [5.6, 50.7, 10.2, 53.0],
      rivers: [{ name: 'Rhein' }, { name: 'Lippe' }, { name: 'Ems' }, { name: 'Weser' }],
      landscapes: ['Teutoburger Wald'],
      places: [
        { name: 'Xanten', pos: 'l', detail: '**[Xanten](wiki:Xanten)** — römisches Legionslager *Vetera* am Rhein, Ausgangspunkt der Feldzüge in die Germania.' },
        { name: 'Kalkriese', kind: 'battle', pos: 'r', detail: '**[Kalkriese](wiki:Museum und Park Kalkriese|Kalkriese)** — die Funde seit 1987 sprechen dafür, dass hier der Hinterhalt von 9 n. Chr. stattfand; ganz sicher ist das nicht.' },
      ],
      points: [
        { lon: 7.187, lat: 51.744, label: 'Haltern am See', pos: 'l', detail: '**[Haltern am See](wiki:Haltern am See|Haltern am See)** — römisches Militärlager an der Lippe.' },
        { lon: 8.839, lat: 51.912, label: 'Hermannsdenkmal', kind: 'site', pos: 'r', detail: '**[Hermannsdenkmal](wiki:Hermannsdenkmal|Hermannsdenkmal)** bei [Detmold](wiki:Detmold), 1875 eingeweiht — ein Denkmal des 19. Jahrhunderts, kein Fundort.' },
      ],
      caption: 'Römische Armeen stießen vom Rhein aus an der Lippe entlang nach Osten vor. Der genaue Schlachtort bleibt in der Forschung umstritten.',
    },
    {
      id: 'fact-hermann', type: 'callout', tone: 'fact', title: 'Aus Arminius wurde „Hermann"',
      md: `Im 19. Jahrhundert machten Nationalisten aus Arminius den „Hermann, Befreier Germaniens". Das **[Hermannsdenkmal](wiki:Hermannsdenkmal|Hermannsdenkmal)** bei [Detmold](wiki:Detmold) (eingeweiht 1875, kurz nach der Reichsgründung) ist mit Figur rund 53 m hoch. Mit den historischen Germanen, die sich nicht als „Deutsche" verstanden, hat dieser Mythos wenig zu tun.`,
    },
    {
      id: 'limes-text', type: 'text', title: 'Der Limes: eine Grenze zum Handeln',
      md: `
Der **Obergermanisch-Raetische [[limes]]** verlief rund 550 km von **[Rheinbrohl](wiki:Rheinbrohl)** (Rhein) bis **[Eining](wiki:Eining)** (Donau). Er bestand aus Palisade bzw. Wall und Graben (in Raetien einer Mauer), rund 900 Wachtürmen und etwa 120 größeren und kleineren Kastellen. Er war weniger eine Festung als eine kontrollierte Grenze: An Durchgängen wurden Waren verzollt, Germanen und Römer trieben Handel.

Um 260 n. Chr. gaben die Römer das Gebiet hinter dem Limes auf und zogen sich wieder an Rhein und Donau zurück. Seit **2005** ist der Limes **[UNESCO-Welterbe](wiki:UNESCO-Welterbe|World Heritage Site)**; die rekonstruierte **[Saalburg](wiki:Kastell Saalburg|Saalburg)** im [Taunus](wiki:Taunus) zeigt, wie ein Kastell aussah.[^limeskommission]`,
    },
    {
      id: 'quiz-roman', type: 'quiz', title: 'Römisch oder nicht?',
      question: 'Welche dieser Städte gehen auf eine **römische Gründung** zurück?',
      options: [
        { text: 'Köln', correct: true, why: 'Colonia Claudia Ara Agrippinensium, Stadtrecht 50 n. Chr.' },
        { text: 'Trier', correct: true, why: 'Augusta Treverorum — oft als älteste Stadt Deutschlands bezeichnet.' },
        { text: 'Augsburg', correct: true, why: 'Augusta Vindelicum, benannt nach Kaiser Augustus.' },
        { text: 'Berlin', correct: false, why: 'Berlin wurde im 13. Jahrhundert erstmals urkundlich erwähnt, weit außerhalb des römischen Gebiets.' },
        { text: 'Hamburg', correct: false, why: 'Hamburg entstand im 9. Jahrhundert als Hammaburg — nie römisch.' },
      ],
    },
    {
      id: 'map-quiz-rom', type: 'map', title: 'Wo liegen die römischen Städte?',
      view: [3.9, 47.2, 14.0, 52.9],
      layers: { cities: false },
      quiz: { rounds: 7 },
      rivers: [{ name: 'Rhein', quiz: true }, { name: 'Donau', quiz: true }],
      places: [{ name: 'Köln' }, { name: 'Trier' }, { name: 'Mainz' }, { name: 'Augsburg' }, { name: 'Xanten' }, { name: 'Kalkriese', kind: 'battle' }],
    },
    {
      id: 'voelkerwanderung', type: 'text', title: 'Vom Ende Roms zu den Franken',
      md: `
Ab dem 3. Jahrhundert geriet das Römische Reich unter Druck. Der Einfall der **[Hunnen](wiki:Hunnen|Huns) 375** gilt als Beginn der **[[voelkerwanderung|Völkerwanderung]]**: [Goten](wiki:Goten|Goths), [Vandalen](wiki:Vandalen|Vandals), [Burgunder](wiki:Burgunden|Burgundians), [Langobarden](wiki:Langobarden|Lombards) und andere zogen durch Europa und gründeten Reiche auf römischem Boden. **476** setzte der germanische Heerführer [Odoaker](wiki:Odoaker|Odoacer) den letzten weströmischen Kaiser ab — das **[Weströmische Reich](wiki:Weströmisches Reich|Western Roman Empire)** endete. Das Oströmische ([Byzantinische](wiki:Byzantinisches Reich|Byzantine Empire)) Reich bestand bis 1453 weiter.

Das dauerhafteste der neuen Reiche war das der **[Franken](wiki:Franken (Volk)|Franks)**. Der [Merowinger](wiki:Merowinger|Merovingian dynasty) **[Chlodwig I.](wiki:Chlodwig I.|Clovis I)** einte um 500 die fränkischen Stämme und trat zum katholischen Christentum über — ein Bündnis mit der Kirche und der romanischen Bevölkerung, das das [[frankenreich|Frankenreich]] stark machte. Aus ihm gingen später Frankreich und Deutschland hervor.`,
    },
    {
      id: 'timeline-antike', type: 'game', viz: 'timeline', title: 'Bring die Ereignisse in die richtige Reihenfolge',
      params: {
        mode: 'sort',
        events: [
          { year: 9, label: 'Varusschlacht' },
          { year: 50, label: 'Köln erhält Stadtrecht' },
          { year: 98, label: 'Tacitus: „Germania"' },
          { year: 260, label: 'Aufgabe des Limes' },
          { year: 375, label: 'Einfall der Hunnen' },
          { year: 476, label: 'Ende Westroms' },
          { year: 500, label: 'Chlodwig eint die Franken' },
        ],
      },
    },
    {
      id: 'match-people', type: 'match', title: 'Wer war wer?',
      pairs: [
        ['Arminius', 'Cherusker, Sieger der Varusschlacht'],
        ['Varus', 'römischer Statthalter, 9 n. Chr. besiegt'],
        ['Augustus', 'erster römischer Kaiser'],
        ['Tacitus', 'römischer Autor der „Germania"'],
        ['Chlodwig', 'fränkischer König, um 500 getauft'],
      ],
    },
    {
      id: 'num-limes', type: 'numeric', title: 'Kopfrechnen am Limes',
      question: 'Der Obergermanisch-Raetische Limes war etwa **550 km** lang und hatte rund **900 Wachtürme**. Wie viele Meter lagen im Durchschnitt zwischen zwei Türmen? (auf 10 m genau)',
      answer: 611, tolerance: 15, unit: 'm',
      hint: '550 km = 550.000 m, geteilt durch 900.',
      explain: '550.000 m ÷ 900 ≈ 611 m. Die Türme standen also meist in Sicht- und Rufweite — Signale konnten schnell weitergegeben werden.',
    },
    {
      id: 'recall-folgen', type: 'recall', title: 'Warum ist die Varusschlacht so berühmt?',
      prompt: 'Erkläre in 2–4 Sätzen, **welche langfristigen Folgen** die Varusschlacht hatte — und warum sie im 19. Jahrhundert eine besondere Rolle spielte.',
      answer: `Nach der Niederlage 9 n. Chr. gab Rom den Plan auf, Germanien bis zur Elbe zur Provinz zu machen; **Rhein und Donau** (später der Limes) blieben die Grenze. Dadurch wurde das Gebiet östlich des Rheins nie dauerhaft romanisiert — anders als Gallien, aus dem das romanischsprachige Frankreich hervorging. Im 19. Jahrhundert wurde Arminius als „Hermann" zum **nationalen Gründungsmythos** stilisiert (Hermannsdenkmal 1875), obwohl die Germanen keine „Deutschen" waren.`,
      hints: ['Was passierte mit der geplanten Provinz?', 'Denk an das Hermannsdenkmal.'],
      cards: ['varus-folgen'],
    },
  ],
  cards: [
    { id: 'varus-jahr', front: 'In welchem Jahr fand die Varusschlacht statt?', back: '**9 n. Chr.**' },
    { id: 'varus-personen', front: 'Wer besiegte wen in der Varusschlacht?', back: 'Der Cherusker **Arminius** besiegte den römischen Statthalter **Publius Quinctilius Varus** und drei Legionen.' },
    { id: 'varus-ort', front: 'Welcher Ort gilt heute als wahrscheinlicher Schauplatz der Varusschlacht?', back: '**Kalkriese** bei Osnabrück (Funde seit 1987).' },
    { id: 'varus-folgen', front: 'Wichtigste Folge der Varusschlacht?', back: 'Rom verzichtete auf eine Provinz bis zur Elbe; der **Rhein** blieb Grenze — Germanien östlich davon wurde nie romanisiert.' },
    { id: 'augustus-zitat', front: '„Varus, gib mir meine Legionen wieder!" — wer soll das gesagt haben?', back: 'Kaiser **Augustus** (überliefert bei Sueton).' },
    { id: 'limes-was', front: 'Was war der Limes?', back: 'Die befestigte Grenze des Römischen Reiches gegen das freie Germanien (Wall/Palisade, Graben, Wachtürme, Kastelle).' },
    { id: 'limes-laenge', front: 'Wie lang war der Obergermanisch-Raetische Limes — und seit wann ist er Welterbe?', back: 'Rund **550 km** (Rhein bis Donau); UNESCO-Welterbe seit **2005**.' },
    { id: 'koeln-name', front: 'Lateinischer Name von Köln?', back: '*Colonia Claudia Ara Agrippinensium* (Stadtrecht 50 n. Chr.) — daher „Köln" von *Colonia*.' },
    { id: 'trier', front: 'Welche deutsche Stadt war römische Kaiserresidenz und besitzt die Porta Nigra?', back: '**Trier** (*Augusta Treverorum*).' },
    { id: 'tacitus', front: 'Welcher römische Autor schrieb um 98 n. Chr. die „Germania"?', back: '**Tacitus**.' },
    { id: 'hunnen', front: 'Welches Ereignis gilt traditionell als Beginn der Völkerwanderung — und wann?', back: 'Der Einfall der **Hunnen 375**.' },
    { id: 'westrom', front: 'Wann endete das Weströmische Reich?', back: '**476** — Odoaker setzte den letzten weströmischen Kaiser ab.' },
    { id: 'chlodwig', front: 'Wer einte um 500 die Franken und trat zum katholischen Christentum über?', back: 'Der Merowinger **Chlodwig I.**' },
    { id: 'hermannsdenkmal', front: 'Wo steht das Hermannsdenkmal und wann wurde es eingeweiht?', back: 'Bei **Detmold** im Teutoburger Wald, eingeweiht **1875**.' },
  ],
};
