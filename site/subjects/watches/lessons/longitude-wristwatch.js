export default {
  id: 'longitude-wristwatch',
  title: 'Longitude, pockets & wrists',
  summary: 'A clock that keeps time on a rolling ship tells you where you are. How that problem was solved — and how the watch later moved from pocket to wrist.',
  minutes: 25,
  goals: [
    'Explain how an accurate clock gives you [[longitude]]',
    'Compute position errors caused by clock errors',
    'Describe what made the [[lever-escapement]] a breakthrough',
    'Know the milestones of the [[wristwatch]]',
  ],
  blocks: [
    {
      id: 'problem', type: 'text', title: 'Where am I? — ask a clock',
      md: `
Latitude (north–south) is easy at sea: measure the height of the sun at noon or of the Pole Star. **[[longitude|Longitude]]** (east–west) is hard, because the Earth rotates underneath you.

But rotation is also the key: Earth turns $360°$ in 24 hours, i.e. **15° per hour**. If you carry a clock set to the time of a reference place (Greenwich) and observe *local* noon — the sun at its highest — the difference between the two times *is* your longitude:

$$\\text{longitude} = 15° \\times (\\text{Greenwich time} - \\text{local time in hours})$$

The problem in the 18th century: no clock could keep accurate time for weeks on a pitching, damp ship with changing temperatures. After many ships were lost, the British Parliament offered a large prize in the Longitude Act of 1714.[^rmg-longitude]`,
    },
    {
      id: 'calc-longitude', type: 'numeric', title: 'Find your position',
      question: 'At local noon, your chronometer (set to Greenwich time) shows **16:00**. How many degrees west of Greenwich are you?',
      answer: 60, tolerance: 0, unit: '° W',
      hint: 'Local noon is 4 hours *later* than noon in Greenwich. Each hour is 15°.',
      explain: '4 h × 15°/h = 60° west — roughly the longitude of Nova Scotia or eastern Venezuela.',
    },
    {
      id: 'calc-error', type: 'numeric', title: 'What does a small error cost?',
      question: 'Your clock is off by just **1 minute**. At the equator, one degree of longitude is about 111 km. How large is your position error in km?',
      answer: 27.8, tolerance: 0.6, unit: 'km',
      hint: '1 minute is 1/60 hour → $15°/60 = 0.25°$.',
      explain: '$0.25° \\times 111\\,\\text{km} \\approx 28$ km. After a six-week voyage, a clock drifting even a few seconds a day becomes dangerous — which shows how demanding the problem was.',
    },
    {
      id: 'harrison', type: 'callout', tone: 'history', title: 'John Harrison, the carpenter who built H4',
      md: `
John Harrison, a self-taught carpenter and clockmaker from Yorkshire, spent decades on the problem. His first three sea clocks (H1–H3) were large machines. His fourth, **H4**, completed in **1759**, looked like an oversized pocket watch — and it worked.[^rmg-h4]

H4 compensated for temperature changes and used anti-friction design so thoroughly that it ran without lubrication.[^rmg-longitude] It became the ancestor of the **[[chronometer|marine chronometer]]**, which guided ships until radio and satellite navigation took over.`,
    },
    {
      id: 'lever', type: 'text', title: '1754: the lever escapement',
      md: `
Around the same time, the English watchmaker **Thomas Mudge** invented the **[[lever-escapement]]** (1754).[^wiki-watch] Its genius is *detachment*: the [[balance-wheel]] swings freely for most of its arc and touches the lever only briefly near the center, to unlock the gear train and receive a tiny push.

A free oscillator is an accurate oscillator — the less the rest of the machine disturbs it, the closer it stays to its natural period. The lever escapement came into use only gradually from around 1800,[^wiki-lever-escapement] but it is in almost every mechanical watch made today. You will see it move in the next stage.`,
    },
    {
      id: 'wrist', type: 'text', title: 'From waistcoat to wrist',
      md: `
For three centuries a watch lived in a pocket. Early wristwatches were jewelry, mostly for women: Abraham-Louis Breguet made one for the Queen of Naples in 1810, and Patek Philippe made what is called the first Swiss wristwatch for Countess Koscowicz of Hungary in 1868.[^wiki-watch]

In 1904 Louis Cartier made a wristwatch for his friend, the Brazilian aviator **Alberto Santos-Dumont**, who couldn't take his hands off the controls to reach a pocket watch. Real change came with **World War I**: soldiers needed their hands free and had to synchronize attacks, and from 1917 the British War Office issued wristwatches to combatants.[^wiki-watch] After the war, the wristwatch was a man's object too.`,
    },
    {
      id: 'match-people', type: 'match', title: 'Who did what?',
      pairs: [
        ['Christiaan Huygens', 'Pendulum clock (1656)'],
        ['John Harrison', 'Marine timekeeper H4 (1759)'],
        ['Thomas Mudge', 'Lever escapement (1754)'],
        ['Abraham-Louis Breguet', 'Wristwatch for the Queen of Naples (1810)'],
        ['Louis Cartier', 'Wristwatch for Santos-Dumont (1904)'],
      ],
    },
    {
      id: 'quiz-lever', type: 'quiz', title: 'The point of the lever',
      question: 'What makes the lever escapement better than earlier designs like the verge?',
      options: [
        { text: 'The balance swings freely most of the time and is disturbed only briefly.', correct: true, why: 'That detachment keeps the oscillator close to its natural period.' },
        { text: 'It gives the balance a small impulse on every beat so it keeps swinging.', correct: true, why: 'Yes — every escapement must replace the energy lost to friction; the lever does it with a brief push.' },
        { text: 'It removes the need for a mainspring.', correct: false, why: 'The energy still comes from the mainspring through the gear train.' },
        { text: 'It makes the watch independent of temperature.', correct: false, why: 'Temperature compensation is a separate problem, solved with special balances and hairspring alloys.' },
      ],
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>English</th><th>Deutsch</th></tr>
<tr><td>longitude / latitude</td><td>Längengrad / Breitengrad</td></tr>
<tr><td>marine chronometer</td><td>Marinechronometer, Schiffschronometer</td></tr>
<tr><td>lever escapement</td><td>Ankerhemmung</td></tr>
<tr><td>pocket watch</td><td>Taschenuhr</td></tr>
<tr><td>wristwatch</td><td>Armbanduhr</td></tr></table>`,
    },
    {
      id: 'recall-longitude', type: 'recall', title: 'Explain it',
      prompt: 'Explain to a friend how a clock can tell a ship its longitude, and why this demanded a clock that was accurate to a few seconds per day.',
      answer: `The Earth turns 15° per hour. A ship carries a clock set to Greenwich time; when the sun is highest (local noon), the navigator reads the clock. Each hour of difference between Greenwich time and local time equals 15° of longitude east or west. Because one minute of clock error already means 0.25° — about 28 km at the equator — and voyages lasted weeks, the clock had to drift only a few seconds per day despite motion, humidity and temperature changes.`,
      hints: ['How many degrees does the Earth turn per hour?', 'What does 1 minute of error translate to?'],
      cards: ['longitude-method', 'minute-error'],
    },
  ],
  cards: [
    { id: 'longitude-method', front: 'How does a clock give you longitude?', back: 'Compare local noon with the time at Greenwich (from the clock); each hour of difference = 15° of longitude.' },
    { id: 'minute-error', front: 'Position error from a 1-minute clock error (at the equator)?', back: '0.25° ≈ 28 km.' },
    { id: 'h4', front: 'What was H4, and when was it completed?', back: 'John Harrison’s prize-winning marine timekeeper, 1759 — looked like a large pocket watch.' },
    { id: 'mudge', front: 'Who invented the lever escapement (Ankerhemmung), and when?', back: 'Thomas Mudge, 1754. In general use from ~1800; standard today.' },
    { id: 'detached', front: 'Why is a *detached* escapement more accurate?', back: 'The balance swings freely most of the time, touching the lever only briefly — less disturbance of its natural period.' },
    { id: 'first-wrist', front: 'Three early wristwatches', back: 'Breguet for the Queen of Naples (1810); Patek Philippe for Countess Koscowicz (1868); Cartier for Santos-Dumont (1904).' },
    { id: 'wwi', front: 'What made the wristwatch a men’s object?', back: 'World War I — soldiers needed hands free and synchronized timing; the British War Office issued them from 1917.' },
  ],
};
