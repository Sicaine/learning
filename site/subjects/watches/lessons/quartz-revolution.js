export default {
  id: 'quartz-revolution',
  title: 'The quartz revolution',
  summary: 'On Christmas Day 1969 a watch appeared whose heart vibrated 8,000 times faster than any balance wheel. Within two decades the Swiss watch industry had lost two thirds of its jobs.',
  minutes: 25,
  goals: [
    'Explain how a quartz watch keeps time: [[quartz-oscillator]], [[frequency-divider]], [[stepper-motor]]',
    'Know why the frequency is exactly 32,768 Hz',
    'Compare quartz and mechanical accuracy quantitatively',
    'Summarize the [[quartz-crisis]] and its consequences',
  ],
  blocks: [
    {
      id: 'same-recipe', type: 'text', title: 'Same recipe, new oscillator',
      md: `
Remember the recipe: energy – oscillator – counter. A quartz watch keeps it and swaps every ingredient:

- **Energy:** a battery (or a solar cell charging a capacitor or accumulator) instead of a mainspring.
- **Oscillator:** a tiny tuning fork of quartz crystal — the **[[quartz-oscillator]]** — instead of a balance wheel.
- **Counter:** an integrated circuit and a **[[stepper-motor]]** driving a gear train (or an LCD) instead of an escapement.

Quartz is **[[piezoelectricity|piezoelectric]]**: bend it and it produces a voltage; apply a voltage and it bends. So a circuit can make the fork vibrate *and* sense its vibration, keeping it ringing at its natural frequency — in watches, precisely **32,768 Hz**.[^wiki-quartz-clock]`,
    },
    {
      id: 'why-32768', type: 'text', title: 'Why 32,768?',
      md: `
Because $32{,}768 = 2^{15}$. A **[[frequency-divider]]** is just a chain of flip-flops, each of which halves the frequency. Fifteen of them turn 32,768 Hz into exactly **1 Hz** — one pulse per second for the stepper motor, which jumps the seconds hand once.

Why not build a crystal that vibrates at 1 Hz directly? It would be far too large for a wrist. And 32,768 Hz sits just above the range of human hearing, so the watch does not whine.`,
    },
    {
      id: 'viz-divider', type: 'viz', viz: 'divider', title: 'Halve it fifteen times',
      task: 'Step through the divider chain until the output reaches **1 Hz**.',
    },
    {
      id: 'calc-stages', type: 'numeric', title: 'Divider stages',
      question: 'If a manufacturer used a 4,194,304 Hz crystal ($2^{22}$ Hz, used in some high-accuracy movements), how many halving stages would be needed to reach 1 Hz?',
      answer: 22, tolerance: 0,
      explain: 'Each stage halves the frequency, so you need as many stages as the exponent: 22.',
    },
    {
      id: 'astron', type: 'callout', tone: 'history', title: 'Seiko Quartz Astron, 25 December 1969',
      md: `
Seiko launched the **Quartz Astron 35SQ**, the world's first quartz wristwatch, on Christmas Day 1969. It cost 450,000 yen — about the price of a mid-size car at the time. At a time when a few seconds to a few dozen seconds per day were normal for a precise mechanical watch, the Astron was accurate to **±5 seconds per month**.[^seiko-quartz]`,
    },
    {
      id: 'calc-astron', type: 'numeric', title: 'Compare accuracies',
      question: '±5 seconds per **month** (30 days) corresponds to how many seconds per **day**? (Two decimals.)',
      answer: 0.17, tolerance: 0.01, unit: 's/day',
      explain: '5 / 30 ≈ 0.17 s per day — roughly 2 ppm, versus the ~116 ppm of a mechanical watch gaining 10 s/day. A COSC-certified mechanical chronometer is allowed −4 to +6 s/day.[^wiki-cosc]',
    },
    {
      id: 'crisis', type: 'text', title: 'The quartz crisis',
      md: `
Quartz movements quickly became cheap to mass-produce, especially in Japan and later Hong Kong. The Swiss industry — which had dominated with around half of the world market — was built on mechanical craftsmanship and many small specialized firms. It was hit hard: employment in the Swiss watch industry fell from about **90,000 in 1970 to 28,000 in 1988**.[^wiki-quartz-crisis]

In 1983 the two largest Swiss groups, ASUAG and SSIH, merged to survive — the core of what later became the **Swatch Group**. The same year saw the launch of the *Swatch*: a cheap, colorful plastic quartz watch with a drastically reduced part count, made in Switzerland on automated lines. It sold in the millions and financed the industry's recovery. Paradoxically, the mechanical watch survived by becoming *unnecessary*: no longer a tool, it became an object of craft, heritage and luxury.`,
    },
    {
      id: 'match-analogy', type: 'match', title: 'Mechanical ↔ quartz',
      prompt: 'Match each part of a mechanical watch to the component doing the same job in a quartz watch.',
      pairs: [
        ['Mainspring', 'Battery'],
        ['Balance wheel & hairspring', 'Quartz tuning fork'],
        ['Escapement', 'Oscillator circuit & frequency divider'],
        ['Escape wheel stepping once per beat', 'Stepper motor stepping once per second'],
      ],
    },
    {
      id: 'quiz-quartz', type: 'quiz', title: 'Why quartz is so accurate',
      question: 'Which reasons contribute to quartz watches being far more accurate than mechanical ones?',
      options: [
        { text: 'The quartz fork oscillates ~8,000× faster than a 4 Hz balance, so each disturbance is a much smaller fraction of time.', correct: true, why: 'Higher frequency and a very high quality factor make it far more stable.' },
        { text: 'Its frequency hardly depends on position, and it barely reacts to shocks.', correct: true, why: 'A balance wheel is affected by gravity in different positions; a tiny quartz fork is not.' },
        { text: 'Quartz crystals are completely unaffected by temperature.', correct: false, why: 'Temperature does shift the frequency (a parabolic curve); high-accuracy quartz movements compensate for it.' },
        { text: 'Quartz watches have no gears at all.', correct: false, why: 'Analog quartz watches still use a stepper motor and a gear train to drive the hands.' },
      ],
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>English</th><th>Deutsch</th></tr>
<tr><td>quartz crystal / tuning fork</td><td>Schwingquarz / Stimmgabel</td></tr>
<tr><td>piezoelectric effect</td><td>piezoelektrischer Effekt</td></tr>
<tr><td>frequency divider / flip-flop</td><td>Frequenzteiler / Flipflop</td></tr>
<tr><td>stepper motor</td><td>Schrittmotor</td></tr>
<tr><td>quartz crisis</td><td>Quarzkrise</td></tr>
<tr><td>parts per million (ppm)</td><td>Millionstel (ppm)</td></tr></table>`,
    },
    {
      id: 'recall-crisis', type: 'recall', title: 'Explain it',
      prompt: 'Why did quartz nearly destroy the Swiss watch industry — and why do mechanical watches still exist and even thrive today?',
      answer: `Quartz watches were far more accurate (seconds per month instead of seconds per day), needed no winding, and — once integrated circuits and automated assembly matured — became very cheap to mass-produce, largely in Japan and Hong Kong. The Swiss industry was built on labor-intensive mechanical craft across many small firms, so it lost market share and two thirds of its jobs (90,000 → 28,000, 1970–1988). It survived through consolidation (ASUAG + SSIH, 1983 → Swatch Group), the cheap Swatch, and by repositioning mechanical watches as luxury objects of craft and heritage — valued precisely because they are no longer necessary.`,
      hints: ['Compare accuracy, cost and manufacturing.', 'What role did the Swatch play?'],
      cards: ['crisis-numbers', 'mechanical-survival'],
    },
  ],
  cards: [
    { id: 'recipe', front: 'The three ingredients of a quartz watch', back: 'Battery (energy), quartz tuning fork (oscillator), IC divider + stepper motor (counter/display).' },
    { id: 'freq', front: 'Frequency of a watch quartz, and why that number?', back: '32,768 Hz = $2^{15}$ — fifteen halving flip-flops give exactly 1 Hz; small enough crystal; above human hearing.' },
    { id: 'piezo', front: 'What is piezoelectricity (Piezoelektrizität)?', back: 'Some crystals produce a voltage when deformed, and deform when a voltage is applied — so a circuit can drive and sense the quartz.' },
    { id: 'astron', front: 'First quartz wristwatch: name, date, accuracy', back: 'Seiko Quartz Astron 35SQ, 25 December 1969, ±5 s per month (price ≈ a car).' },
    { id: 'crisis-numbers', front: 'Swiss watch industry employment: 1970 vs 1988', back: 'About 90,000 → 28,000.' },
    { id: 'merger', front: 'What happened in 1983 in the Swiss watch industry?', back: 'ASUAG and SSIH merged (core of the later Swatch Group), and the Swatch was launched.' },
    { id: 'mechanical-survival', front: 'Why did mechanical watches survive the quartz crisis?', back: 'They were repositioned as luxury objects of craft and heritage rather than tools.' },
    { id: 'cosc', front: 'COSC chronometer limits for mechanical movements', back: 'Average daily rate between −4 and +6 seconds.' },
  ],
};
