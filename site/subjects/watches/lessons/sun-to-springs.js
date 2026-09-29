export default {
  id: 'sun-to-springs',
  title: 'From shadows to springs',
  summary: 'Every timekeeper ever built — sundial, tower clock, wristwatch, atomic clock — follows the same recipe. This lesson finds that recipe in history.',
  minutes: 25,
  goals: [
    'Name the three ingredients of every clock: energy, oscillator, counter',
    'Explain why the [[pendulum]] and the [[hairspring]] were the decisive inventions',
    'Place the key inventions on a timeline',
    'Calculate the length of a seconds pendulum',
  ],
  blocks: [
    {
      id: 'before-machines', type: 'text', title: 'Time before machines',
      md: `
The first timekeepers borrowed a motion from nature. A **[[sundial]]** reads the sun's movement from the shadow of a pointer (the *gnomon*).[^wiki-sundial] It needs no energy and never needs winding — but it fails at night, under clouds, and it shows *local* solar time: noon is when the sun stands highest *where you are*.

A **[[water-clock]]** replaces the sun with a flow: water drips from one vessel into another and the level marks elapsed time. It works at night and indoors, but the flow changes with water pressure and temperature, so it drifts.

Both have the same weakness: they measure a *continuous* process. Nothing in them repeats in exactly equal steps.`,
    },
    {
      id: 'recipe', type: 'callout', tone: 'insight', title: 'The recipe of every clock',
      md: `
1. **Energy source** — a falling weight, a wound spring, a battery.
2. **Oscillator** — something that repeats at a steady rate: a pendulum, a [[balance-wheel]], a [[quartz-oscillator|quartz crystal]], an atom.
3. **Counter & display** — gears (or electronics) that count the oscillations and turn them into hands or digits.

Progress in timekeeping has almost always been progress in the **oscillator**. Keep this model in mind through the whole path.`,
    },
    {
      id: 'first-mechanical', type: 'text', title: 'The first mechanical clocks',
      md: `
Around the end of the 13th century, European tower clocks appeared: a falling weight drove a train of gears, and a **[[verge-escapement]]** let the gears advance in small steps. A swinging bar with adjustable weights, the **[[foliot]]**, set the pace.

The catch: the foliot is not a true oscillator. Nothing pulls it back to a center — it simply swings as fast as the driving force pushes it. Stronger push, faster clock. These clocks were accurate to roughly **15 minutes per day**.[^wiki-pendulum-clock]`,
    },
    {
      id: 'pendulum', type: 'text', title: '1656: the pendulum changes everything',
      md: `
Christiaan Huygens built the first **[[pendulum]] clock** on Christmas Day 1656.[^wiki-pendulum-clock] A pendulum *is* a true oscillator: gravity always pulls it back to the center, and for small swings its period depends only on its length:

$$T \\approx 2\\pi\\sqrt{\\frac{L}{g}}$$

It does not care (much) how hard it is pushed. This property — same period regardless of swing width — is called **[[isochronism]]**, and it is the single most important idea in horology. Accuracy jumped from ~15 minutes to ~15 seconds per day, and pendulum clocks remained the world's most accurate timekeepers for 270 years, until quartz clocks arrived in 1927.`,
    },
    {
      id: 'calc-seconds-pendulum', type: 'numeric', title: 'The seconds pendulum',
      question: 'A "seconds pendulum" swings from one side to the other in exactly 1 second, so its full period is $T = 2$ s. With $g = 9.81\\,\\text{m/s}^2$, how long must it be?',
      answer: 0.994, tolerance: 0.01, unit: 'm',
      hint: 'Solve $T = 2\\pi\\sqrt{L/g}$ for $L$: $L = g\\,T^2 / (4\\pi^2)$.',
      explain: '$L = 9.81 \\cdot 4 / (4\\pi^2) = 9.81/\\pi^2 \\approx 0.994$ m — almost exactly one meter. That is why tall grandfather clocks are as tall as they are.',
    },
    {
      id: 'portable', type: 'text', title: 'Putting time in a pocket',
      md: `
A pendulum is useless in a pocket: every step you take disturbs it. Portable clocks needed a **spring** as energy source (the [[mainspring]]) and a different oscillator.

In the early 16th century, makers in Germany — Peter Henlein of Nuremberg is often credited — built small spring-driven clocks that could be carried.[^wiki-watch] They still used a verge and a balance without a spring, and could lose or gain hours a day.

The breakthrough came in the mid-1670s: a fine spiral spring, the **[[hairspring]]**, attached to the balance wheel.[^wiki-balance-spring] Now the balance, like a pendulum, is always pulled back to center — a true oscillator that works in any position. Watch accuracy improved from *hours* to about **10 minutes per day**. Robert Hooke and Christiaan Huygens fought bitterly over who invented it first.`,
    },
    {
      id: 'order-timeline', type: 'order', title: 'Build the timeline',
      prompt: 'Put these steps of timekeeping history in chronological order (earliest first).',
      items: [
        'Sundials and water clocks',
        'Weight-driven tower clocks with verge & foliot (late 13th c.)',
        'Spring-driven portable clocks in Germany (early 16th c.)',
        'Huygens’ pendulum clock (1656)',
        'The balance spring / hairspring (1670s)',
        'Mudge’s lever escapement (1754)',
      ],
      explain: 'Notice the rhythm: every big leap in accuracy (pendulum, hairspring) is an improvement of the **oscillator**. The lever escapement — next lesson — improved how the oscillator is *disturbed* by the rest of the machine.',
    },
    {
      id: 'quiz-why-pendulum', type: 'quiz', title: 'Why did the pendulum win?',
      question: 'Why was a pendulum clock so much more accurate than a verge-and-foliot clock?',
      options: [
        { text: 'Its period depends almost only on its length, not on how hard it is driven.', correct: true, why: 'Exactly — isochronism. The foliot’s rate followed the driving force; the pendulum’s rate follows physics.' },
        { text: 'Pendulum clocks used stronger springs.', correct: false, why: 'Early pendulum clocks were typically weight-driven, and the driving force matters *less* with a pendulum, not more.' },
        { text: 'Pendulums swing faster, so each error is smaller.', correct: false, why: 'Speed isn’t the point; a seconds pendulum is slow. What matters is a stable, self-determined period.' },
        { text: 'The pendulum removed the need for gears.', correct: false, why: 'The gear train still counts the swings and drives the hands.' },
      ],
    },
    {
      id: 'match-accuracy', type: 'match', title: 'Invention ↔ accuracy',
      prompt: 'Match each timekeeper to its typical accuracy.',
      pairs: [
        ['Verge & foliot clock', '~15 minutes per day'],
        ['Pendulum clock (Huygens)', '~15 seconds per day'],
        ['Early watch without hairspring', 'Hours per day'],
        ['Watch with hairspring (late 17th c.)', '~10 minutes per day'],
      ],
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>English</th><th>Deutsch</th></tr>
<tr><td>sundial</td><td>Sonnenuhr</td></tr>
<tr><td>water clock</td><td>Wasseruhr</td></tr>
<tr><td>escapement / verge escapement</td><td>Hemmung / Spindelhemmung</td></tr>
<tr><td>pendulum</td><td>Pendel</td></tr>
<tr><td>balance wheel</td><td>Unruh</td></tr>
<tr><td>hairspring</td><td>Unruhspirale (Spiralfeder)</td></tr>
<tr><td>mainspring</td><td>Zugfeder</td></tr>
<tr><td>oscillator / oscillation</td><td>Oszillator, Schwinger / Schwingung</td></tr></table>`,
    },
    {
      id: 'recall-recipe', type: 'recall', title: 'Explain it',
      prompt: 'Using the "energy – oscillator – counter" recipe, explain why the invention of the **hairspring** mattered so much more for watches than, say, a stronger mainspring would have.',
      answer: `Accuracy is determined by the **oscillator**. Before the hairspring, a watch balance was like a foliot: nothing pulled it back to center, so its rate depended on the (varying) force of the mainspring — a stronger spring would just have made the watch run faster, and still unevenly as it ran down. The hairspring turned the balance into a true oscillator with its own natural period (like a pendulum, but independent of position), so the rate became largely independent of the driving force. That took accuracy from hours to minutes per day.`,
      hints: ['What set the rate of a foliot?', 'What would a stronger mainspring do to a foliot-style balance?'],
      cards: ['hairspring-why'],
    },
  ],
  cards: [
    { id: 'recipe', front: 'The three ingredients of every clock', back: 'Energy source, oscillator, counter/display. Accuracy mostly comes from the oscillator.' },
    { id: 'foliot-flaw', front: 'Why was the verge & foliot clock inaccurate (~15 min/day)?', back: 'The foliot is not a true oscillator: nothing pulls it back to center, so its rate depends on the driving force.' },
    { id: 'huygens', front: 'Who built the first pendulum clock, and when?', back: 'Christiaan Huygens, 1656. Accuracy: ~15 min/day → ~15 s/day.' },
    { id: 'pendulum-formula', front: 'Period of a pendulum (small swings)', back: '$T \\approx 2\\pi\\sqrt{L/g}$ — depends on length and gravity, not on the push.' },
    { id: 'isochronism', front: 'What is **isochronism** (Isochronismus)?', back: 'An oscillator keeps the same period regardless of its amplitude — the key property of a good clock oscillator.' },
    { id: 'hairspring-when', front: 'When was the hairspring (Unruhspirale) invented, and by whom?', back: 'Mid-1670s; disputed between Robert Hooke and Christiaan Huygens.' },
    { id: 'hairspring-why', front: 'Why did the hairspring improve watches from hours to ~10 min/day?', back: 'It made the balance a true oscillator with its own period, largely independent of the driving force and position.' },
    { id: 'seconds-pendulum', front: 'Length of a seconds pendulum ($T$ = 2 s)?', back: '≈ 0.994 m — about one meter.' },
  ],
};
