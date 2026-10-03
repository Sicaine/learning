export default {
  id: 'watch-anatomy',
  title: 'Anatomy of a watch',
  summary: 'Learn to name every visible part of a watch, how each part varies between designs — and which of them are hard for a machine to see.',
  minutes: 30,
  goals: [
    'Name the visible parts of a watch in English and German',
    'Describe how [[case]], [[bezel]], [[dial]], [[hands]] and [[strap]] vary across designs',
    'Draft a segmentation class taxonomy for watches',
    'Predict which parts are hard for a segmentation model, and why',
  ],
  blocks: [
    {
      id: 'intro', type: 'text', title: 'Seeing like a watch person',
      md: `
When a collector glances at a watch, they parse it instantly: *round steel case, fluted bezel, applied baton indices, dauphine hands, date at three, on a bracelet*. That fluency comes from a precise vocabulary. This lesson gives you that vocabulary — and uses it to think about how to teach a machine the same skill.`,
    },
    {
      id: 'viz-explore', type: 'viz', viz: 'anatomy', title: 'Explore the parts',
      params: { mode: 'explore' },
      caption: 'Hover or tap a part to see its name, German name and a short description.',
    },
    {
      id: 'case-parts', type: 'text', title: 'Case, bezel, lugs, crown',
      md: `
- **[[case|Case]]** (*Gehäuse*): the housing. Shapes: round, cushion, tonneau (barrel-shaped), rectangular (tank), octagonal. The middle part carries the lugs and the crown; finishes alternate brushed and polished surfaces.
- **[[bezel|Bezel]]** (*Lünette*): the ring holding the crystal. Plain, fluted, gem-set, or a functional scale: rotating [diver's](wiki:Diving watch|Taucheruhr) bezel (elapsed minutes), 24-hour [GMT](wiki:Greenwich Mean Time|Greenwich Mean Time) bezel, [tachymeter](wiki:Tachymeter (watch)|Tachymeter (Uhr)).
- **[[lugs|Lugs]]** (*Bandanstöße*): the four horns where strap or bracelet attaches with spring bars. Some watches have an *integrated* bracelet that flows directly out of the case.
- **[[crown|Crown]]** (*Krone*): winds and sets. Often screw-down for water resistance, sometimes protected by *crown guards*. [Chronographs](wiki:Chronograph|Chronograph (Uhr)) add **[[pusher|pushers]]** (*Drücker*) around it.
- **[[case-back|Case back]]** (*Gehäuseboden*): solid or with a sapphire window.`,
    },
    {
      id: 'dial-parts', type: 'text', title: 'Dial, indices, hands, crystal',
      md: `
- **[[crystal|Crystal]]** (*Uhrglas*): [acrylic](wiki:Poly(methyl methacrylate)|Polymethylmethacrylat) (domed, warm, distorts at the edge), mineral glass, or [sapphire](wiki:Sapphire|Saphir) (hard, often anti-reflective coated). Invisible when perfect — but it reflects windows and lamps.
- **[[dial|Dial]]** (*Zifferblatt*): finishes include sunburst (radial brushing that changes brightness with angle), matte, lacquer, enamel, [guilloché](wiki:Guilloché|Guilloche) (engine-turned patterns), and [skeletonized](wiki:Skeleton watch) (cut away to show the movement).
- **[[indices|Indices]]** (*Indizes*): batons, dots, triangles, Arabic or Roman numerals; *applied* (separate metal pieces, casting shadows) or *printed*. Often with [luminous material](wiki:Luminous paint|Leuchtfarbe).
- **[[chapter-ring|Chapter ring]]** (*Minuterie*): the minute track around the edge.
- **[[hands|Hands]]** (*Zeiger*): hour, minute, seconds — styles such as baton, dauphine, sword, leaf, Mercedes (on [Rolex](wiki:Rolex|Rolex) divers), [Breguet](wiki:Abraham-Louis Breguet|Abraham Louis Breguet) ("moon" tips), and bright-red or arrow-tipped GMT hands.
- **[[subdial|Subdials]]** (*Hilfszifferblätter*) and the **[[date-window|date window]]** (*Datumsfenster*).
- **[[strap|Strap / bracelet]]** (*Armband*): leather, rubber, textile, or metal links with a clasp ([watch strap](wiki:Watch strap|Uhrenarmband)).`,
    },
    {
      id: 'game', type: 'game', viz: 'anatomy', title: 'Name that part',
      params: { mode: 'game' },
    },
    {
      id: 'mission-taxonomy', type: 'callout', tone: 'mission', title: 'From vocabulary to segmentation classes',
      md: `
A good class taxonomy is **visually grounded** (each class looks consistent), **mutually exclusive** per pixel, and **useful** for your downstream task. A hierarchical draft:

- **case** → case body, **bezel**, **lugs**, **crown**, **pushers**
- **dial** → dial surface, **indices / numerals**, **subdials**, **date window**, printed text & logo
- **hands** → hour, minute, seconds (*thin, overlapping, occlude the dial*)
- **strap / bracelet** → strap, clasp
- background

Things that deserve an explicit decision: Is the **crystal** a class? (Usually no — it's transparent; but its *reflections* change every pixel below it.) Are **applied indices** part of the dial or separate? What about the dial visible *through* the crystal at a steep angle? Write these rules down before labeling — ambiguity in the rules becomes noise in your labels, and noise caps your achievable quality.`,
    },
    {
      id: 'quiz-hard', type: 'quiz', title: 'Hard for a model?',
      question: 'Which parts are typically **hard** for a segmentation model — and why?',
      options: [
        { text: 'Seconds hand — very thin, few pixels wide, easily lost at low resolution.', correct: true, why: 'Thin structures suffer most from patch-based downsampling (e.g. 14×14-pixel patches in a ViT).' },
        { text: 'Crystal reflections — they overlay other parts and change with lighting.', correct: true, why: 'A reflection can make the dial look like the bezel or background; renders often lack realistic reflections.' },
        { text: 'Bezel vs. case — the boundary can be subtle when both are polished steel.', correct: true, why: 'Same material, same color: the model must rely on geometry and fine edges.' },
        { text: 'The strap on a plain background — it is large and has a clear texture.', correct: false, why: 'Large, textured regions with clear contrast are usually the easy part.' },
      ],
    },
    {
      id: 'match-de', type: 'match', title: 'English ↔ Deutsch',
      pairs: [
        ['Bezel', 'Lünette'],
        ['Lugs', 'Bandanstöße'],
        ['Crown', 'Krone'],
        ['Dial', 'Zifferblatt'],
        ['Hands', 'Zeiger'],
        ['Crystal', 'Uhrglas'],
        ['Case back', 'Gehäuseboden'],
      ],
    },
    {
      id: 'recall-taxonomy', type: 'recall', title: 'Design your classes',
      prompt: 'Propose a segmentation class list for watch photos with 6–10 classes. For two of your classes, name a labeling rule you would need to decide in advance.',
      answer: `One reasonable list: background, strap/bracelet, case (incl. lugs), bezel, crown & pushers, dial, indices/numerals, hands, subdials, date window. Example rules: (1) **Hands over dial** — hands always win: pixels of a hand are "hands" even where they cover indices or subdials. (2) **Crystal reflections** — label what is physically underneath (the dial), not what it looks like; reflections are not a class. Other useful rules: whether applied indices belong to the dial or a separate class; whether the rotating bezel insert and bezel ring are one class; how to label the case middle visible at steep angles.`,
      hints: ['What happens where a hand overlaps an index?', 'Is a reflection a class?'],
      cards: ['taxonomy-rules'],
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>English</th><th>Deutsch</th></tr>
<tr><td>case / case middle</td><td>Gehäuse / Mittelteil</td></tr>
<tr><td>bezel (rotating)</td><td>Lünette (Drehlünette)</td></tr>
<tr><td>lugs</td><td>Bandanstöße, Hörner</td></tr>
<tr><td>crown / screw-down crown</td><td>Krone / verschraubte Krone</td></tr>
<tr><td>pusher</td><td>Drücker</td></tr>
<tr><td>crystal (sapphire)</td><td>Uhrglas (Saphirglas)</td></tr>
<tr><td>dial / sunburst dial</td><td>Zifferblatt / Sonnenschliff-Zifferblatt</td></tr>
<tr><td>indices, applied</td><td>Indizes, aufgesetzt (appliziert)</td></tr>
<tr><td>hands</td><td>Zeiger</td></tr>
<tr><td>subdial</td><td>Hilfszifferblatt, Totalisator</td></tr>
<tr><td>date window</td><td>Datumsfenster</td></tr>
<tr><td>case back</td><td>Gehäuseboden (Glasboden)</td></tr>
<tr><td>strap / bracelet / clasp</td><td>Armband / Gliederband / Schließe</td></tr></table>`,
    },
  ],
  cards: [
    { id: 'bezel', front: 'What is the bezel (Lünette)?', back: 'The ring around the crystal on top of the case — plain, fluted, or a rotating scale (diver, GMT, tachymeter).' },
    { id: 'lugs', front: 'Lugs — English and German, and what they do', back: 'Lugs / Bandanstöße (Hörner): the case projections where the strap or bracelet attaches via spring bars.' },
    { id: 'crown', front: 'What does the crown (Krone) do?', back: 'Winds the mainspring and sets time/date; often screw-down for water resistance.' },
    { id: 'crystal-types', front: 'Three kinds of watch crystal', back: 'Acrylic (Hesalit), mineral glass, sapphire.' },
    { id: 'applied', front: 'Applied vs printed indices?', back: 'Applied: separate metal pieces fixed to the dial (3D, cast shadows). Printed: flat print on the dial.' },
    { id: 'hands-styles', front: 'Name four hand styles', back: 'Baton, dauphine, sword, leaf, Mercedes, Breguet, arrow (GMT).' },
    { id: 'hard-parts', front: 'Three parts that are hard for segmentation, and why', back: 'Seconds hand (thin), crystal reflections (overlay everything), bezel vs case (same material, subtle boundary).' },
    { id: 'taxonomy-rules', front: 'Why write labeling rules before labeling?', back: 'Ambiguous rules (hand over index? reflections?) produce inconsistent labels, and label noise caps achievable model quality.' },
    { id: 'pusher', front: 'Pusher (Drücker) — what signals it on a watch?', back: 'Buttons beside the crown, usually for a chronograph (start/stop/reset).' },
  ],
};
