export default {
  id: 'energy-and-gears',
  title: 'Energy & gears',
  summary: 'Open the case back: where does the energy come from, and how does it reach the hands at exactly the right speeds?',
  minutes: 25,
  goals: [
    'Name the five functional groups of a mechanical [[movement]]',
    'Explain the [[mainspring]], [[barrel]] and [[power-reserve]]',
    'Calculate speed ratios in a [[gear-train]]',
    'Say what [[jewel|jewels]] are really for',
  ],
  blocks: [
    {
      id: 'video', type: 'video', youtube: '9_QsCLYs2mY', label: 'How a Mechanical Watch Works', channel: 'Animagraffs',
      why: 'A clear animated tour through the whole movement. Watch it once now for the big picture; the details come in this and the next lesson.[^animagraffs]',
    },
    {
      id: 'five-groups', type: 'callout', tone: 'insight', title: 'Five jobs inside every mechanical movement',
      md: `
1. **Energy** — the [[mainspring]] in its [[barrel]].
2. **Transmission** — the [[gear-train]] carries the energy onward.
3. **Distribution** — the [[escapement]] releases it in tiny, equal portions.
4. **Regulation** — the [[balance-wheel]] and [[hairspring]] set the pace.
5. **Display** — the motion works turn the right wheels into hour, minute and seconds hands.

Plus the *keyless works* behind the [[crown]] for winding and setting. This is the clock recipe (energy – oscillator – counter) in miniature.`,
    },
    {
      id: 'mainspring', type: 'text', title: 'Energy: the mainspring',
      md: `
The **[[mainspring]]** is a long ribbon of spring [steel](wiki:Steel|Stahl) coiled inside a toothed drum, the **[[barrel]]**. Its inner end hooks onto the barrel arbor, its outer end onto the barrel wall.[^wiki-mainspring] Winding (by the [[crown]] or an automatic [[rotor]]) turns the arbor and tightens the coil; as the spring relaxes, it turns the barrel, whose teeth drive the gear train.

A fully wound watch runs for its **[[power-reserve]]**: classic movements manage about 36–40 hours — one day of wearing plus a safety margin — while many modern ones reach 70 hours or more.

One problem: a spring pushes hard when fully wound and weakly when nearly empty. Early watches evened this out with a cone-shaped pulley and chain, the *[fusee](wiki:Fusee (horology)|Schnecke (Uhr))*. Modern watches rely on a good escapement and an [[isochronism|isochronous]] balance to make the rate insensitive to the changing force.`,
    },
    {
      id: 'gears', type: 'text', title: 'Transmission: the gear train',
      md: `
The barrel turns slowly — a few turns per day. The seconds hand must turn once a minute. The **[[gear-train]]** bridges that gap by pairing large **[wheels](wiki:Gear|Zahnrad)** with small **[pinions](wiki:Pinion|Ritzel)** (in watchmaking, pinion teeth are called *leaves*).

When a wheel with $z_w$ teeth drives a pinion with $z_p$ leaves, the pinion turns $z_w / z_p$ times per turn of the wheel. Chained together, the ratios **multiply**:

$$\\text{total ratio} = \\frac{z_{w,1}}{z_{p,1}} \\cdot \\frac{z_{w,2}}{z_{p,2}} \\cdot \\ldots$$

A classic layout: barrel → **center wheel** (1 turn per hour, carries the minute hand) → **third wheel** → **fourth wheel** (1 turn per minute, carries the seconds hand) → **[[escape-wheel]]**.[^ciechanowski]`,
    },
    {
      id: 'calc-train', type: 'numeric', title: 'Gear ratio',
      question: 'The center wheel (80 teeth) drives the third pinion (10 leaves). On the same arbor, the third wheel (75 teeth) drives the fourth pinion (10 leaves). How many times does the fourth wheel turn per turn of the center wheel?',
      answer: 60, tolerance: 0,
      hint: 'Multiply the two ratios: $80/10$ and $75/10$.',
      explain: '$8 \\times 7.5 = 60$. The center wheel turns once per hour, so the fourth wheel turns 60 times per hour — once per minute. That is exactly why the seconds hand sits on the fourth wheel.',
    },
    {
      id: 'calc-motion', type: 'numeric', title: 'Hour hand',
      question: 'The minute hand turns once per hour. How many turns of the minute hand does the *motion works* (a small reduction gear under the dial) need per single turn of the hour hand?',
      answer: 12, tolerance: 0,
      explain: 'The hour hand turns once every 12 hours, so the motion works reduce speed by 12:1.',
    },
    {
      id: 'jewels', type: 'text', title: 'Jewels: bearings, not bling',
      md: `
Every wheel turns on thin [steel](wiki:Steel|Stahl) **pivots**. Running in [brass](wiki:Brass|Messing) holes, they would wear out and waste energy. Instead, watchmakers use **[[jewel|jewels]]** — synthetic [ruby](wiki:Corundum|Korund), extremely hard and smooth — as bearings.[^wiki-jewel-bearing] The pallets of the escapement and the impulse pin on the balance are jewels too.

That's why a dial may say "17 Jewels": a simple manual-wind movement with all important pivots jewelled typically has about 17. More jewels usually mean more functions ([automatic winding](wiki:Automatic watch|Automatikuhr), [chronograph](wiki:Chronograph|Chronograph (Uhr))), not more value in gemstones.`,
    },
    {
      id: 'order-flow', type: 'order', title: 'Follow the energy',
      prompt: 'Order the parts in the direction the energy flows, from the winder to the oscillator.',
      items: ['Crown (winding)', 'Mainspring in the barrel', 'Center wheel', 'Third wheel', 'Fourth wheel', 'Escape wheel', 'Pallet fork', 'Balance wheel'],
      explain: 'The energy flows from the spring through ever faster, weaker gears to the escapement, which hands out a small push to the balance on every beat. The *timing information* flows the other way: the balance decides when the gears may move.',
    },
    {
      id: 'quiz-jewels', type: 'quiz', title: 'About jewels',
      question: 'What is true about the jewels in a mechanical watch?',
      options: [
        { text: 'They are mostly synthetic rubies used as low-friction bearings.', correct: true, why: 'Synthetic corundum — hard, smooth and cheap to make.' },
        { text: 'A 17-jewel movement is typically a fully jewelled simple movement.', correct: true, why: 'Around 17 covers the important pivots of the train, escapement and balance.' },
        { text: 'More jewels always means a more valuable watch.', correct: false, why: 'Jewel counts rise with functions; some cheap watches even added useless jewels for marketing.' },
        { text: 'Jewels store energy like the mainspring.', correct: false, why: 'They only reduce [friction](wiki:Friction|Reibung) and wear.' },
      ],
    },
    {
      id: 'deep-fusee', type: 'callout', tone: 'deep', title: 'The fusee: equalizing a spring with geometry',
      md: `
A mainspring's [torque](wiki:Torque|Drehmoment) falls as it unwinds. The [fusee](wiki:Fusee (horology)|Schnecke (Uhr)) is a cone-shaped pulley connected to the barrel by a tiny chain. When the spring is fully wound, the chain pulls on the cone's *narrow* end (small lever arm); as the spring weakens, the chain works on ever wider radii (bigger [lever arm](wiki:Lever|Hebel (Physik))). The torque delivered to the gear train stays almost constant. Fusees dominated until the 19th century and still appear in a few high-end watches.[^wiki-mainspring]`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>English</th><th>Deutsch</th></tr>
<tr><td>movement / caliber</td><td>Uhrwerk / Kaliber</td></tr>
<tr><td>mainspring</td><td>Zugfeder</td></tr>
<tr><td>barrel</td><td>Federhaus</td></tr>
<tr><td>power reserve</td><td>Gangreserve</td></tr>
<tr><td>gear train</td><td>Räderwerk</td></tr>
<tr><td>center / third / fourth wheel</td><td>Minutenrad / Kleinbodenrad / Sekundenrad</td></tr>
<tr><td>pinion (leaves)</td><td>Trieb</td></tr>
<tr><td>jewel</td><td>Lagerstein (Rubin)</td></tr>
<tr><td>motion works</td><td>Zeigerwerk</td></tr>
<tr><td>keyless works</td><td>Aufzugs- und Zeigerstellmechanismus</td></tr></table>`,
    },
    {
      id: 'recall-flow', type: 'recall', title: 'Explain it',
      prompt: 'Describe in 3–5 sentences how the energy from winding the crown ends up moving the seconds hand at exactly one turn per minute.',
      answer: `Winding tightens the mainspring inside the barrel. As it relaxes it turns the barrel, whose teeth drive the gear train: center wheel (once per hour), third wheel and fourth wheel, each pair multiplying the speed by its tooth ratio; the fourth wheel is geared to turn once per minute and carries the seconds hand. The train would spin freely, but at its end the escape wheel is held by the pallet fork, which the balance releases one step per beat — so the speed is set by the balance, while the gear ratios only translate it to the hands.`,
      hints: ['Which wheel turns once per minute?', 'What stops the gear train from simply spinning down?'],
      cards: ['train-speed'],
    },
  ],
  cards: [
    { id: 'five', front: 'The five functional groups of a mechanical movement', back: 'Energy (mainspring), transmission (gear train), distribution (escapement), regulation (balance + hairspring), display (motion works & hands).' },
    { id: 'barrel', front: 'What is the barrel (Federhaus)?', back: 'The toothed drum holding the mainspring; its teeth drive the gear train.' },
    { id: 'reserve', front: 'Typical power reserve (Gangreserve) of a classic movement?', back: 'About 36–40 hours; many modern movements 70 h+.' },
    { id: 'ratio', front: 'Speed ratio of a wheel with $z_w$ teeth driving a pinion with $z_p$ leaves; of a chain?', back: '$z_w/z_p$ per stage; stages multiply.' },
    { id: 'train-speed', front: 'Which wheels carry the minute and seconds hands in a classic layout?', back: 'Center wheel (1 turn/hour) → minute hand; fourth wheel (1 turn/minute) → seconds hand.' },
    { id: 'jewels', front: 'What are jewels (Lagersteine) for?', back: 'Low-friction, low-wear bearings (synthetic ruby) for pivots, pallets and the impulse pin.' },
    { id: 'seventeen', front: 'What does "17 Jewels" usually indicate?', back: 'A fully jewelled simple (manual-wind, time-only) movement.' },
    { id: 'fusee', front: 'What problem does a fusee solve?', back: 'The mainspring’s falling torque — a cone pulley and chain keep the delivered torque nearly constant.' },
  ],
};
