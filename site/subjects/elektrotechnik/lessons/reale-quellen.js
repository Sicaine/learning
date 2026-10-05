export default {
  id: 'reale-quellen',
  title: 'Innenwiderstand, Leerlauf, Kurzschluss, Leistungsanpassung',
  summary: 'Keine Batterie liefert unter Last ihre Nennspannung: Jede reale Quelle hat einen Innenwiderstand. Daraus folgen Klemmenspannung, Kurzschlussstrom — und die Frage, wann man einer Quelle die größte Leistung entnimmt.',
  minutes: 30,
  goals: [
    'Eine reale [[spannungsquelle|Spannungsquelle]] als Ersatzschaltbild aus [[leerlaufspannung|Leerlaufspannung]] $U_0$ und [[innenwiderstand|Innenwiderstand]] $R_i$ zeichnen',
    'Die [[klemmenspannung|Klemmenspannung]] $U_K = U_0 - I\\cdot R_i$ und den Kurzschlussstrom $I_K = U_0/R_i$ berechnen',
    '$R_i$ aus zwei Messpunkten bestimmen: $R_i = \\Delta U/\\Delta I$',
    'Die [[leistungsanpassung|Leistungsanpassung]] ($R_L = R_i$, $P_\\text{max} = U_0^2/4R_i$, $\\eta = 50\\,\\%$) erklären und gegen den Wunsch nach hohem Wirkungsgrad abgrenzen',
  ],
  needs: ['spannungsteiler-stromteiler'],
  blocks: [
    {
      id: 'idee', type: 'text', title: 'Die Batterie, die einbricht',
      md: `
Wer schon einmal die Scheinwerfer eines Autos beim Anlassen hat dunkler werden sehen, kennt das Phänomen: Die [Spannung](wiki:Elektrische Spannung|Voltage) einer Quelle ist nicht konstant, sondern hängt davon ab, wie viel Strom man ihr entnimmt. Eine echte Quelle verhält sich so, als sei in ihr ein Widerstand eingebaut — der **[Innenwiderstand](wiki:Innenwiderstand|Output impedance)** $R_i$ in Reihe mit einer idealen Quelle der Spannung $U_0$.

Diese Ersatzschaltung ist, wie ein [Spannungsteiler](wiki:Spannungsteiler|Voltage divider), nur Reihenschaltung und Maschenregel: Am Innenwiderstand fällt bei Strom $I$ die Spannung $I\\cdot R_i$ ab, und nur der Rest steht an den Klemmen zur Verfügung:

$$U_K = U_0 - I\\cdot R_i$$

Das ist eine fallende Gerade über dem Strom. Zwei Punkte darauf sind besonders wichtig:

- **Leerlauf** ($I = 0$, nichts angeschlossen): Es fällt nichts am Innenwiderstand ab, die Klemmen zeigen die volle [Leerlaufspannung](wiki:Leerlaufspannung|Open-circuit voltage) $U_K = U_0$. Das misst du mit einem hochohmigen Voltmeter.
- **Kurzschluss** ($U_K = 0$, Klemmen verbunden): Der Strom wird nur noch von $R_i$ begrenzt, $I_K = U_0/R_i$. Er ist nicht unendlich, aber bei kleinem $R_i$ gewaltig.[^wp-ersatzspannungsquelle]`,
    },
    {
      id: 'beispiele', type: 'text', title: 'Rechnen mit der Ersatzquelle',
      md: `
Beispiel: Ein Netzteil hat $U_0 = 12\\,\\mathrm{V}$ und $R_i = 0{,}5\\,\\Omega$ und speist eine Last $R_L = 2{,}5\\,\\Omega$. Alles in einer [Masche](wiki:Kirchhoffsche Regeln|Kirchhoff's circuit laws): $I = U_0/(R_i + R_L) = 12\\,\\mathrm{V}/3\\,\\Omega = 4\\,\\mathrm{A}$. Die Klemmenspannung ist $U_K = I\\cdot R_L = 10\\,\\mathrm{V}$ — oder über die Formel $12 - 4\\cdot 0{,}5 = 10\\,\\mathrm{V}$. Der Kurzschlussstrom wäre $I_K = 12\\,\\mathrm{V}/0{,}5\\,\\Omega = 24\\,\\mathrm{A}$.

**$R_i$ bestimmen:** Man kann $R_i$ nicht direkt messen, aber aus zwei Messpunkten ablesen. Misst man im Leerlauf $4{,}5\\,\\mathrm{V}$ und bei $100\\,\\mathrm{mA}$ nur noch $4{,}2\\,\\mathrm{V}$, dann sind $0{,}3\\,\\mathrm{V}$ am Innenwiderstand abgefallen:

$$R_i = \\frac{\\Delta U}{\\Delta I} = \\frac{4{,}5\\,\\mathrm{V} - 4{,}2\\,\\mathrm{V}}{0{,}1\\,\\mathrm{A} - 0} = 3\\,\\Omega$$

Eine **gute Spannungsquelle** hat einen kleinen Innenwiderstand, damit die Spannung auch unter Last konstant bleibt ($\\to$ Katalogfrage ED301: Gleichspannungsquellen sollen bei Belastung eine hohe Spannungskonstanz haben). Ein Bleiakku (wie die [Starterbatterie](wiki:Starterbatterie|Automotive battery) im Auto) hat einen sehr kleinen Innenwiderstand (je nach Größe und Zustand im Bereich von Milliohm bis zu einigen Hundertstel Ohm), schafft das also glänzend — und liefert deshalb beim Kurzschluss mehrere hundert Ampere. Eine [Knopfzelle](wiki:Knopfzelle|Button cell) mit $50\\,\\Omega$ bricht schon bei wenigen Milliampere ein.`,
    },
    {
      id: 'anpassung', type: 'text', title: 'Wann bekommt die Last die meiste Leistung?',
      md: `
Die Last bekommt die Leistung $P_L = I^2 R_L = U_0^2\\,\\dfrac{R_L}{(R_i + R_L)^2}$. Zwei Extremfälle zeigen, dass es ein Maximum geben muss:

- $R_L \\to 0$ (Kurzschluss): Strom maximal, aber die Spannung an der Last ist null — $P_L = 0$.
- $R_L \\to \\infty$ (Leerlauf): Spannung maximal, aber der Strom ist null — $P_L = 0$.

Dazwischen liegt das Maximum, und es liegt genau bei $R_L = R_i$. Das nennt man **[Leistungsanpassung](wiki:Leistungsanpassung|Impedance matching)**. Dann teilen sich $R_i$ und $R_L$ die Spannung hälftig, und es gilt

$$P_{L,\\max} = \\frac{U_0^2}{4R_i} \\qquad\\text{und}\\qquad \\eta = \\frac{P_L}{P_\\text{ges}} = \\frac{R_L}{R_i + R_L} = 50\\,\\%$$

Beispiel: $U_0 = 10\\,\\mathrm{V}$, $R_i = 50\\,\\Omega$: $P_{L,\\max} = 100/200 = 0{,}5\\,\\mathrm{W}$, und genauso viel Leistung wird im Innenwiderstand in Wärme umgesetzt. **Maximale Leistung bedeutet also nur 50 % Wirkungsgrad.**

Deshalb passt man bei **Netzteilen und Akkus** gerade *nicht* an: Dort will man hohen [Wirkungsgrad](wiki:Wirkungsgrad|Energy conversion efficiency) und konstante Spannung, also $R_L \\gg R_i$. Anpassung ist sinnvoll, wo eine *kleine* Signalleistung möglichst vollständig übertragen werden soll — etwa von der [Antenne](wiki:Antenne|Antenna (radio)) in den Empfängereingang. Beim Senden kommt noch die Reflexion auf der Leitung hinzu; das kommt in Etappe 9.`,
    },
    {
      id: 'viz-source', type: 'viz', viz: 'source-load-lab', title: 'Quelle und Last',
      task: 'Finde den Lastwiderstand, bei dem die Leistung in der Last **maximal** wird, und prüfe, wie hoch dann der Wirkungsgrad ist. Wähle danach das Preset „Bleiakku" und überlege, warum Anpassen dort keinen Sinn hat: Stelle die Last so ein, dass $\\eta \\ge 95\\,\\%$ erreicht wird.',
    },
    {
      id: 'num-klemme', type: 'numeric', title: 'Klemmenspannung',
      question: 'Eine Quelle mit $U_0 = 12\\,\\mathrm{V}$ und $R_i = 0{,}5\\,\\Omega$ speist $R_L = 2{,}5\\,\\Omega$. Wie groß ist die Klemmenspannung?',
      answer: 10, tolerance: 0.05, unit: 'V',
      explain: '$I = 12/(0{,}5+2{,}5) = 4\\,\\mathrm{A}$, $U_K = 12 - 4\\cdot 0{,}5 = 10\\,\\mathrm{V}$ (oder $I\\cdot R_L = 10\\,\\mathrm{V}$).',
    },
    {
      id: 'num-kurz', type: 'numeric', title: 'Kurzschlussstrom',
      question: 'Gleiche Quelle ($U_0 = 12\\,\\mathrm{V}$, $R_i = 0{,}5\\,\\Omega$): Wie groß ist der Kurzschlussstrom?',
      answer: 24, tolerance: 0.1, unit: 'A',
      explain: '$I_K = U_0/R_i = 12\\,\\mathrm{V}/0{,}5\\,\\Omega = 24\\,\\mathrm{A}$.',
    },
    {
      id: 'num-ri', type: 'numeric', title: 'Innenwiderstand messen',
      question: 'Eine Quelle zeigt im Leerlauf $4{,}5\\,\\mathrm{V}$ und bei $100\\,\\mathrm{mA}$ Belastung $4{,}2\\,\\mathrm{V}$. Wie groß ist $R_i$?',
      answer: 3, tolerance: 0.03, unit: 'Ω',
      explain: '$R_i = \\Delta U/\\Delta I = 0{,}3\\,\\mathrm{V}/0{,}1\\,\\mathrm{A} = 3\\,\\Omega$.',
    },
    {
      id: 'num-pmax', type: 'numeric', title: 'Maximale Leistung',
      question: 'Eine Quelle mit $U_0 = 10\\,\\mathrm{V}$ und $R_i = 50\\,\\Omega$ wird angepasst belastet ($R_L = R_i$). Welche Leistung nimmt die Last auf?',
      answer: 0.5, tolerance: 0.005, unit: 'W',
      hint: '$P_{L,\\max} = U_0^2/(4R_i)$.',
      explain: '$P = 100\\,\\mathrm{V^2}/(4\\cdot 50\\,\\Omega) = 0{,}5\\,\\mathrm{W}$; im Innenwiderstand bleibt ebenfalls $0{,}5\\,\\mathrm{W}$, der Wirkungsgrad ist $50\\,\\%$.',
    },
    {
      id: 'quiz-quelle', type: 'quiz', title: 'Gute Gleichspannungsquelle',
      question: 'Welche Eigenschaft sollte eine Gleichspannungsquelle (z. B. ein Netzteil) bei Belastung haben?',
      options: [
        { text: 'Hohe Spannungskonstanz — die Klemmenspannung soll kaum absinken. Das erreicht man mit kleinem Innenwiderstand.', correct: true, why: 'Der Spannungsabfall am Innenwiderstand ist $I\\cdot R_i$; ist $R_i$ klein, bleibt $U_K \\approx U_0$.' },
        { text: 'Niedrige Spannungskonstanz — die Spannung darf stark schwanken.', correct: false, why: 'Das wäre genau das Gegenteil einer brauchbaren Versorgung.' },
        { text: 'Die Spannung soll bei Belastung steigen.', correct: false, why: 'Mit Last sinkt $U_K = U_0 - I R_i$, sie steigt nie.' },
        { text: 'Ein möglichst großer Innenwiderstand.', correct: false, why: 'Ein großer $R_i$ bedeutet starken Spannungseinbruch unter Last.' },
      ],
    },
    {
      id: 'match-begriffe', type: 'match', title: 'Begriffe und Bedingungen',
      prompt: 'Ordne zu.',
      pairs: [
        ['Leerlauf', 'Strom $I = 0$, $U_K = U_0$'],
        ['Kurzschluss', 'Spannung $U_K = 0$, $I_K = U_0/R_i$'],
        ['Leistungsanpassung', '$R_L = R_i$, $\\eta = 50\\,\\%$'],
        ['Klemmenspannung', '$U_0 - I\\cdot R_i$'],
      ],
    },
    {
      id: 'recall-anpassung', type: 'recall', title: 'Anpassung: wann ja, wann nein?',
      prompt: 'Warum ist Leistungsanpassung bei einem Netzteil unerwünscht, bei der Signalübertragung (z. B. Antenne → Empfänger) aber üblich?',
      answer: `Bei Anpassung ($R_L = R_i$) ist die Leistung in der Last maximal, aber der Wirkungsgrad nur 50 %: Genauso viel Leistung wird im Innenwiderstand verheizt, und die Spannung bricht auf die Hälfte von $U_0$ ein. Ein Netzteil soll viel Energie *effizient* und bei konstanter Spannung liefern, also $R_L \\gg R_i$. Bei einem Signal ist die verfügbare Leistung winzig und die Verluste in der Quelle sind egal — es kommt darauf an, möglichst viel davon in den Empfänger zu bekommen. Bei Hochfrequenz verhindert die Anpassung außerdem Reflexionen auf der Leitung.`,
      hints: ['Was kostet die maximale Leistung an Wirkungsgrad?', 'Was ist bei einem Empfangssignal knapp: Leistung oder Wirkungsgrad?'],
      cards: ['anpassung-pmax', 'leerlauf-kurzschluss'],
    },
    {
      id: 'mission', type: 'callout', tone: 'mission', title: 'Prüfung und Funkpraxis',
      md: `
Der Innenwiderstand taucht im Katalog nicht als Formel auf, aber als Grundverständnis: ED301 (Eigenschaft einer Gleichspannungsquelle: hohe Spannungskonstanz) und später die Fragen zu Netzteilen und Anpassung.[^bnetza-pruefungsfragen-2024]

Praxisbeispiel: Dein [Funkgerät](wiki:Funkgerät|Two-way radio) will bei Sendung $13{,}8\\,\\mathrm{V}$ und je nach Leistung $20\\,\\mathrm{A}$ oder mehr. Ein Netzteil mit zu großem Innenwiderstand (oder eine zu dünne Zuleitung — die ist auch ein Widerstand in Reihe!) lässt die Spannung beim Senden einbrechen, und das Gerät verzerrt oder schaltet ab. Deshalb gehören dicke Leitungen und ein stabiles Netzteil (oder ein Akku mit kleinem $R_i$) zum Funkbetrieb. Anpassung dagegen brauchst du an der Antenne: Dort geht es um die Leistungsübertragung zwischen Sender, Kabel und Antenne.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>Deutsch</th><th>English</th></tr>
<tr><td>Innenwiderstand</td><td>internal (output) resistance</td></tr>
<tr><td>Leerlaufspannung</td><td>open-circuit voltage</td></tr>
<tr><td>Klemmenspannung</td><td>terminal voltage</td></tr>
<tr><td>Kurzschluss(strom)</td><td>short circuit (current)</td></tr>
<tr><td>Leistungsanpassung</td><td>maximum power transfer, impedance matching</td></tr>
<tr><td>Wirkungsgrad</td><td>efficiency</td></tr>
<tr><td>Spannungskonstanz</td><td>voltage regulation</td></tr>
<tr><td>Ersatzschaltbild</td><td>equivalent circuit</td></tr></table>`,
    },
    {
      id: 'warning', type: 'callout', tone: 'warning', title: 'Typische Denkfehler',
      md: `
- **„Eine Batterie liefert immer ihre Nennspannung."** Nur im Leerlauf. Unter Last sinkt die Klemmenspannung um $I\\cdot R_i$.
- **„Maximale Leistung heißt maximaler Wirkungsgrad."** Bei Anpassung ist der Wirkungsgrad nur 50 %; der höchste Wirkungsgrad liegt bei $R_L \\gg R_i$ (dann aber kleiner Leistung an der Last).
- **„Der Kurzschlussstrom ist unendlich."** Er ist durch $R_i$ begrenzt, $I_K = U_0/R_i$ — kann aber bei einem Akku mit $50\\,\\mathrm{m\\Omega}$ mehrere Hundert Ampere betragen (Brand- und Verbrennungsgefahr).`,
    },
  ],
  cards: [
    { id: 'klemmenspannung', front: 'Klemmenspannung einer realen Quelle', back: '$U_K = U_0 - I\\cdot R_i$ — Ersatzschaltbild: ideale Quelle $U_0$ in Reihe mit $R_i$.' },
    { id: 'ri-delta', front: 'Innenwiderstand aus zwei Messpunkten', back: '$R_i = \\Delta U/\\Delta I$ (Leerlauf und eine Belastung); die Spannung sinkt um $I\\cdot R_i$.' },
    { id: 'kurzschlussstrom', front: 'Kurzschlussstrom', back: '$I_K = U_0/R_i$ — begrenzt durch den Innenwiderstand, nicht unendlich.' },
    { id: 'anpassung-pmax', front: 'Leistungsanpassung: Bedingung und Maximalleistung', back: '$R_L = R_i$; $P_{L,\\max} = U_0^2/(4R_i)$; Wirkungsgrad $\\eta = 50\\,\\%$.' },
    { id: 'leerlauf-kurzschluss', front: 'Leerlauf vs. Kurzschluss', back: 'Leerlauf: $I = 0$, $U_K = U_0$. Kurzschluss: $U_K = 0$, $I = U_0/R_i$.' },
    { id: 'eta-anpassung', front: 'Wirkungsgrad der Last', back: '$\\eta = R_L/(R_i + R_L)$ — bei $R_L \\gg R_i$ nahe 100 %.' },
    { id: 'gute-quelle', front: 'Eigenschaft einer guten Gleichspannungsquelle', back: 'Kleiner Innenwiderstand → hohe Spannungskonstanz unter Last (Katalog ED301).' },
    { id: 'anpassung-wann', front: 'Wann Leistungsanpassung, wann nicht?', back: 'Anpassen bei kleiner Signalleistung (Antenne/Empfänger, HF). Nicht anpassen bei Netzteil/Akku: dort zählen Wirkungsgrad und konstante Spannung.' },
    { id: 'akku-ri', front: 'Warum hat ein Bleiakku einen hohen Kurzschlussstrom?', back: 'Weil sein Innenwiderstand sehr klein ist (Größenordnung Milliohm bis $0{,}05\\,\\Omega$): $I_K = U_0/R_i$ ist hoch.' },
  ],
};
