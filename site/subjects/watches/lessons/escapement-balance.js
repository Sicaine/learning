export default {
  id: 'escapement-balance',
  title: 'The escapement & the balance',
  summary: 'The tick-tock of a watch is a tiny drama repeated up to ten times a second: a balance swings, a lever flicks, a wheel escapes by one step.',
  minutes: 30,
  goals: [
    'Explain the two jobs of the [[escapement]]: locking/unlocking and impulse',
    'Describe how [[balance-wheel]] and [[hairspring]] form an oscillator',
    'Convert between [[beat-rate|bph]], hertz and ticks per second',
    'Express a watch’s daily error as a relative error',
  ],
  blocks: [
    {
      id: 'video', type: 'video', youtube: 'rL0_vOw6eCc', label: 'How a Watch Works (1949)', channel: 'Hamilton Watch',
      why: 'A charming classic: [Hamilton](wiki:Hamilton Watch Company|Hamilton Watch Company)’s training film explains the escapement with a giant working model. The escapement section is the heart of this lesson.[^hamilton-1949]',
    },
    {
      id: 'problem', type: 'text', title: 'A gear train that wants to run away',
      md: `
Left alone, the mainspring would spin the whole [[gear-train]] down in seconds. The **[[escapement]]** stops that. It sits between the gear train and the [oscillator](wiki:Oscillation|Schwingung) and does two jobs:[^ciechanowski]

1. **Lock and unlock.** The **[[pallet-fork]]** (*Anker*) has two [ruby](wiki:Corundum|Korund) pallets that alternately block the teeth of the **[[escape-wheel]]** (*Ankerrad*). Each time the fork flips, the wheel escapes by a small step — and with it the whole train.
2. **Impulse.** As an escape wheel tooth slides across a pallet's slanted face, it pushes the fork, which passes a tiny kick to the balance. That replaces the energy the balance loses to friction, so it keeps swinging.

In the **[[lever-escapement]]** the balance only meets the fork briefly near the center of its swing. The rest of the time it swings freely — which is why it keeps such good time.`,
    },
    {
      id: 'viz', type: 'viz', viz: 'escapement', title: 'Watch the escapement work',
      params: { goal: 3 },
      task: 'Try at least **three different beat rates**. Watch how the escape wheel advances one step per beat, and how the number of ticks per second changes. Slow motion helps.',
    },
    {
      id: 'balance', type: 'text', title: 'The balance: a pendulum you can carry',
      md: `
The **[[balance-wheel]]** (*Unruh*) is a small, finely poised wheel; the **[[hairspring]]** (*Unruhspirale*) connects it to the movement. Turn the wheel and the spring pulls it back; inertia carries it past center; the spring pulls it back again. Like a pendulum, this is a true oscillator — but it works in any orientation, because it does not rely on [gravity](wiki:Gravity|Gravitation).

Its period depends on the wheel's [moment of inertia](wiki:Moment of inertia|Trägheitsmoment) $I$ and the spring's [stiffness](wiki:Hooke's law|Hookesches Gesetz) $\\kappa$:

$$T = 2\\pi\\sqrt{\\frac{I}{\\kappa}}$$

To make a watch run faster, you either stiffen the spring (effectively shorten it, with a *regulator* index) or reduce the inertia (turn weights on the rim inward — *free-sprung* balances). Ideally the period does not depend on how far the balance swings — its **[[amplitude]]**, typically 270–300° in a healthy watch — which is [[isochronism]] again.`,
    },
    {
      id: 'bph', type: 'text', title: 'Beats, bph and hertz',
      md: `
Each swing in one direction is one **[[beat]]** — one tick. A full oscillation, there and back, is two beats. Watchmakers quote the **[[beat-rate]]** in beats (half-oscillations) per hour, *bph*, rather than in [hertz](wiki:Hertz|Hertz (Einheit)):

$$\\text{ticks per second} = \\frac{\\text{bph}}{3600} \\qquad f\\,[\\text{Hz}] = \\frac{\\text{bph}}{7200}$$

Common rates: 18,000 bph (2.5 Hz), 21,600 (3 Hz), 28,800 (4 Hz, the most common today), 36,000 (5 Hz, "high-beat", e.g. the [Zenith](wiki:Zenith (watchmaker)|Zenith (Uhrenmanufaktur)) El Primero). Faster rates keep better time under shocks and let a seconds hand move more smoothly, but they wear the escapement faster and consume more energy.`,
    },
    {
      id: 'calc-hz', type: 'numeric', title: 'bph → Hz',
      question: 'A movement beats at **28,800 bph**. What is its frequency in hertz?',
      answer: 4, tolerance: 0, unit: 'Hz',
      hint: 'Divide by 3600 for beats per second, then by 2 for full oscillations.',
      explain: '28,800 / 7,200 = 4 [Hz](wiki:Hertz|Hertz (Einheit)) — eight ticks per second. Look at a seconds hand of such a watch: it moves in 8 small steps per second.',
    },
    {
      id: 'calc-ticks', type: 'numeric', title: 'Ticks per second',
      question: 'A vintage movement beats at **21,600 bph**. How many small steps does its seconds hand make per second?',
      answer: 6, tolerance: 0,
      explain: '21,600 / 3,600 = 6 beats per second — each beat releases the train by one step, so the seconds hand makes 6 steps per second.',
    },
    {
      id: 'calc-ppm', type: 'numeric', title: 'How good is +10 seconds a day?',
      question: 'A watch gains 10 seconds per day. Express this as a relative error in **[parts per million](wiki:Parts-per notation)** (ppm). A day has 86,400 s.',
      answer: 115.7, tolerance: 1.5, unit: 'ppm',
      hint: 'Relative error = 10 / 86,400. Multiply by 1,000,000.',
      explain: '$10/86400 \\approx 0.0001157 = 115.7$ ppm. The balance runs 0.012% too fast. Hold this number — a [quartz watch](wiki:Quartz clock|Quarzuhr) will beat it by a factor of ~20 in the quartz stage.',
    },
    {
      id: 'order-beat', type: 'order', title: 'One beat, step by step',
      prompt: 'Put the events of a single beat of a lever escapement in order, starting with the balance swinging back toward center.',
      items: [
        'The balance swings back toward its center position',
        'The impulse pin on the balance enters the slot of the pallet fork',
        'The fork is flicked over and its pallet unlocks the escape wheel',
        'An escape wheel tooth slides along the pallet face and pushes the fork (impulse)',
        'The fork passes that push to the balance via the impulse pin',
        'The other pallet catches the next tooth — the train is locked again',
        'The balance swings on freely to the end of its arc and returns',
      ],
      explain: 'Unlocking, impulse, locking — all happen during a small part of the swing near center. For the rest of the arc the balance is free, which is what "detached" means.',
    },
    {
      id: 'quiz-rate', type: 'quiz', title: 'Regulating a watch',
      question: 'Your watch runs slow. Which changes would make it run **faster**?',
      options: [
        { text: 'Effectively shorten the hairspring (move the regulator toward "+").', correct: true, why: 'A shorter spring is stiffer, so $\\kappa$ grows and the period shrinks.' },
        { text: 'Move the weights on the balance rim inward.', correct: true, why: 'Smaller moment of inertia $I$ → shorter period.' },
        { text: 'Use a heavier balance wheel.', correct: false, why: 'More inertia → longer period → slower.' },
        { text: 'Wind the mainspring tighter.', correct: false, why: 'A good balance is (nearly) isochronous: more energy mainly increases amplitude, not rate.' },
      ],
    },
    {
      id: 'mission', type: 'callout', tone: 'mission', title: 'Why this matters for your images',
      md: `
Hand positions are *continuous*: at 28,800 bph the seconds hand takes 480 steps per minute, so in your dataset every angle occurs. Your synthetic generator should sample hand angles **uniformly and independently** (real watches in marketing photos cluster around 10:10, which a model may learn as a shortcut). The visible balance on open-heart dials and exhibition case backs is a fine, repetitive structure that often confuses [segmentation](wiki:Image segmentation|Segmentierung (Bildverarbeitung)) — worth a dedicated class or at least explicit examples.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>English</th><th>Deutsch</th></tr>
<tr><td>escapement / lever escapement</td><td>Hemmung / Ankerhemmung</td></tr>
<tr><td>escape wheel</td><td>Ankerrad</td></tr>
<tr><td>pallet fork / pallets</td><td>Anker / Paletten</td></tr>
<tr><td>balance wheel</td><td>Unruh</td></tr>
<tr><td>hairspring</td><td>Unruhspirale</td></tr>
<tr><td>impulse pin</td><td>Hebelstein (Ellipse)</td></tr>
<tr><td>beat / beats per hour</td><td>Halbschwingung / Halbschwingungen pro Stunde (A/h)</td></tr>
<tr><td>amplitude</td><td>Amplitude, Schwingungsweite</td></tr>
<tr><td>regulator</td><td>Rückerzeiger (Regulierung)</td></tr>
<tr><td>moment of inertia</td><td>Trägheitsmoment</td></tr></table>`,
    },
    {
      id: 'recall-escapement', type: 'recall', title: 'Explain it',
      prompt: 'Explain why the *balance* — and not the mainspring or the gear train — determines how fast a mechanical watch runs.',
      answer: `The mainspring only supplies energy and the gear train only multiplies speeds; on their own they would spin down as fast as possible. The escapement locks the train and releases it by exactly one step per beat of the balance. So the train can only advance as fast as the balance swings. The balance with its hairspring is an oscillator with its own natural period $T = 2\\pi\\sqrt{I/\\kappa}$, largely independent of the driving force (isochronism), so the balance sets the rate while the escapement merely keeps it swinging with small impulses.`,
      hints: ['What would the gear train do without the escapement?', 'What determines the period of the balance?'],
      cards: ['who-sets-rate'],
    },
  ],
  cards: [
    { id: 'two-jobs', front: 'The two jobs of the escapement (Hemmung)', back: '1) Lock/unlock the gear train once per beat. 2) Give the balance a small impulse to keep it swinging.' },
    { id: 'who-sets-rate', front: 'Which part determines the rate of a mechanical watch?', back: 'The balance wheel + hairspring (the oscillator). The escapement lets the train advance one step per beat.' },
    { id: 'balance-period', front: 'Period of a balance wheel', back: '$T = 2\\pi\\sqrt{I/\\kappa}$ — moment of inertia $I$, spring stiffness $\\kappa$.' },
    { id: 'bph-hz', front: 'Convert bph to Hz and to ticks per second', back: 'Hz = bph / 7200; ticks/s = bph / 3600.' },
    { id: 'common-rates', front: 'Common beat rates and their frequencies', back: '18,000 bph = 2.5 Hz; 21,600 = 3 Hz; 28,800 = 4 Hz; 36,000 = 5 Hz.' },
    { id: 'escape-teeth', front: 'How many teeth does a Swiss lever escape wheel have?', back: '15.' },
    { id: 'amplitude', front: 'Typical amplitude of a healthy balance (dial up)?', back: 'About 270–300°.' },
    { id: 'faster', front: 'Two ways to make a balance run faster', back: 'Stiffer/shorter hairspring (higher $\\kappa$) or less inertia (weights inward, lighter balance).' },
    { id: 'ppm', front: '+10 s/day as relative error?', back: '≈ 116 ppm (10 / 86,400).' },
  ],
};
