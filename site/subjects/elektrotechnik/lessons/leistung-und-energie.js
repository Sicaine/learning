// L05 Leistung, Energie, Wirkungsgrad — Etappe 1 (Grundgrößen), Teil b.
export default {
  id: 'leistung-und-energie',
  title: 'Leistung, Energie, Wirkungsgrad',
  summary: 'Wie viel Wärme macht ein Widerstand? Aus Spannung und Strom wird Leistung, aus Leistung und Zeit wird Energie — und der Wirkungsgrad sagt, wie viel davon ankommt.',
  minutes: 30,
  goals: [
    'Die [[elektrische-leistung|Leistung]] aus je zwei der drei Größen $U$, $I$, $R$ berechnen: $P=U\\cdot I=I^2R=U^2/R$',
    'Die [[belastbarkeit|Belastbarkeit]] eines Widerstands prüfen und größte zulässige Spannung bzw. größten Strom bestimmen',
    '[[elektrische-arbeit|Energie]] als $W=P\\cdot t$ berechnen, in [[kilowattstunde|kWh]] und Joule umrechnen und Kosten abschätzen',
    'Den [[wirkungsgrad|Wirkungsgrad]] $\\eta$ und die [[verlustleistung|Verlustleistung]] aus Ein- und Ausgangsleistung bestimmen',
    'Begründen, warum die Leistung mit dem **Quadrat** von Strom oder Spannung wächst',
  ],
  needs: ['widerstand-und-ohm'],
  blocks: [
    {
      id: 'idea', type: 'text', title: 'Spannung mal Strom',
      md: `
Spannung ist Energie je Ladung ($U = W/Q$), Strom ist Ladung je Zeit ($I = Q/t$). Multipliziere beide, und die Ladung kürzt sich heraus:

$$P = U\\cdot I = \\frac{W}{Q}\\cdot\\frac{Q}{t} = \\frac{W}{t}$$

[Leistung](wiki:Elektrische Leistung|Electric power) ist also **Energie pro Zeit**. Ihre Einheit ist das Watt, benannt nach [James Watt](wiki:James Watt|James Watt): $1\\ \\mathrm W = 1\\ \\mathrm V\\cdot 1\\ \\mathrm A = 1\\ \\mathrm{J/s}$. Die Energie selbst misst man in [Joule](wiki:James Prescott Joule|James Prescott Joule), benannt nach dem Physiker, der die Umwandlung von elektrischer Energie in Wärme untersuchte.

Stell dir eine Wassermühle vor: Wie viel sie leistet, hängt davon ab, wie hoch das Wasser fällt (Spannung) **und** wie viel Wasser pro Sekunde fließt (Strom).[^wiki-elektrische-leistung]`,
    },
    {
      id: 'formulas', type: 'text', title: 'Drei Formen, sechs Umstellungen',
      md: `
Mit dem [[ohmsches-gesetz|Ohmschen Gesetz]] $U = R\\cdot I$ lässt sich $U\\cdot I$ umschreiben. Setzt du $U = R\\cdot I$ ein, entsteht $P = I^2 R$; setzt du $I = U/R$ ein, entsteht $P = U^2/R$:

$$P = U\\cdot I = I^2\\cdot R = \\frac{U^2}{R}$$

Aus jeder Form folgen Umstellungen — das sind genau die Formeln der Prüfungs-Formelsammlung:

<table>
<tr><th>gesucht</th><th>aus $U$, $I$</th><th>aus $I$, $R$</th><th>aus $U$, $R$</th><th>aus $P$, …</th></tr>
<tr><td>$P$</td><td>$U\\cdot I$</td><td>$I^2\\cdot R$</td><td>$U^2/R$</td><td>–</td></tr>
<tr><td>$U$</td><td>–</td><td>$I\\cdot R$</td><td>–</td><td>$P/I$ oder $\\sqrt{P\\cdot R}$</td></tr>
<tr><td>$I$</td><td>–</td><td>–</td><td>$U/R$</td><td>$P/U$ oder $\\sqrt{P/R}$</td></tr>
<tr><td>$R$</td><td>$U/I$</td><td>–</td><td>–</td><td>$U^2/P$ oder $P/I^2$</td></tr></table>

**Wichtig:** Die Leistung wächst **quadratisch**. Verdoppelst du den Strom durch einen festen Widerstand, wird $P$ viermal so groß. Und: Die Formeln gelten auch bei Wechselspannung, wenn man mit den **Effektivwerten** rechnet (Prüfungsfrage EB503).[^bnetza-pruefungsfragen-2024]`,
    },
    {
      id: 'power-viz', type: 'viz', viz: 'power-budget', title: 'Leistungsbilanz',
      params: { u: 12, r: 100, kwh: 6 },
      task: '**Teil 1 (Tab „Widerstand"):** Stelle **12 V** und **100 Ω** ein. Wie viel Leistung wird umgesetzt, und welche kleinste Belastbarkeit reicht? Teste auch, was bei zu kleiner Belastbarkeit passiert. **Teil 2 (Tab „Haushalt"):** Stelle einen **Heizlüfter mit 2 kW über 3 Stunden** ein (6 kWh).',
    },
    {
      id: 'calc-p1', type: 'numeric', title: 'Leistung am Widerstand',
      question: 'An einem **100 Ω**-Widerstand fallen **10 V** ab. Für welche Leistung muss er mindestens ausgelegt sein?',
      answer: 1, tolerance: 0.01, unit: 'W',
      hint: '$P = U^2/R$.',
      explain: '$P = (10\\ \\mathrm V)^2/100\\ \\Omega = 1{,}00\\ \\mathrm W$ (Prüfungsfrage EB509). Ein 0,25-W-Typ würde überlastet.',
    },
    {
      id: 'calc-dummy', type: 'numeric', title: 'Künstliche Antenne',
      question: 'Am **50 Ω**-[Dummy Load](wiki:Künstliche Antenne|Dummy load) misst man **100 V** Effektivwert. Welche Leistung wird umgesetzt?',
      answer: 200, tolerance: 1, unit: 'W',
      explain: '$P = U^2/R = (100\\ \\mathrm V)^2/50\\ \\Omega = 200\\ \\mathrm W$. Fließen stattdessen 2 A: $P = I^2 R = 4\\cdot 50 = 200$ W — dasselbe, denn $I = U/R = 2$ A (EB507/EB508).',
    },
    {
      id: 'calc-umax', type: 'numeric', title: 'Größte Spannung',
      question: 'Ein **10 kΩ**-Widerstand darf höchstens **1 W** umsetzen (seine Spannungsfestigkeit ist 700 V). Welche größte Gleichspannung darf anliegen?',
      answer: 100, tolerance: 1, unit: 'V',
      hint: '$U = \\sqrt{P\\cdot R}$.',
      explain: '$U = \\sqrt{1\\cdot 10\\,000} = 100\\ \\mathrm V$. Die Spannungsfestigkeit (700 V) wäre erst später wirksam — die Belastbarkeit begrenzt zuerst (EB510).',
    },
    {
      id: 'calc-imax', type: 'numeric', title: 'Größter Strom',
      question: 'Ein **120 Ω**-Widerstand hat eine Belastbarkeit von **23 W**. Welcher Strom darf höchstens fließen?',
      answer: 438, tolerance: 4, unit: 'mA',
      hint: '$I = \\sqrt{P/R}$ — und dann von A in mA umrechnen.',
      explain: '$I = \\sqrt{23/120}\\ \\mathrm A = 0{,}438\\ \\mathrm A = 438\\ \\mathrm{mA}$ (EB512).',
    },
    {
      id: 'calc-parallel', type: 'numeric', title: 'Dummy Load aus vielen Widerständen',
      question: 'Eine Dummy Load besteht aus **11 parallel geschalteten 560 Ω-Widerständen** mit je 5 W Belastbarkeit. Welche **Gesamtbelastbarkeit** hat sie?',
      answer: 55, tolerance: 0.5, unit: 'W',
      hint: 'Bei gleichen Widerständen verteilt sich die Leistung gleichmäßig. Den Gesamtwiderstand kannst du zur Probe berechnen: $560/11\\approx 50{,}9\\ \\Omega$.',
      explain: 'Jeder der 11 Widerstände trägt $1/11$ der Leistung, darf also 5 W aufnehmen: Gesamt $11\\cdot 5\\ \\mathrm W = 55\\ \\mathrm W$. Der Gesamtwiderstand ist $560/11 = 50{,}9\\ \\Omega$, also nahezu 50 Ω (EB514).',
    },
    {
      id: 'quiz-u', type: 'quiz', title: 'Spannung aus Leistung und Widerstand',
      question: 'An einem Widerstand $R$ wird die Leistung $P$ in Wärme umgesetzt. Du kennst $P$ und $R$. Nach welcher Formel ermittelst du die Spannung?',
      options: [
        { text: '$U = \\sqrt{P\\cdot R}$', correct: true, why: 'Aus $P=U^2/R$ folgt $U^2 = P\\cdot R$ (EB504).' },
        { text: '$U = P\\cdot R$', correct: false, why: 'Die Einheit wäre W·Ω — keine Spannung. Die Quadratwurzel fehlt.' },
        { text: '$U = \\sqrt{P/R}$', correct: false, why: 'Das ergibt den **Strom** ($I=\\sqrt{P/R}$).' },
        { text: '$U = P/R$', correct: false, why: 'Die Einheit W/Ω ist A² — also ein Strom-Quadrat, keine Spannung. Richtig wäre $U = P/I$.' },
      ],
    },
    {
      id: 'quiz-double', type: 'quiz', title: 'Strom verdoppeln',
      question: 'Der Strom durch einen festen Widerstand wird **verdoppelt**. Wie ändert sich die in Wärme umgesetzte Leistung?',
      options: [
        { text: 'Sie wird viermal so groß.', correct: true, why: '$P = I^2 R$ — der Strom geht quadratisch ein.' },
        { text: 'Sie verdoppelt sich.', correct: false, why: 'Das gälte nur, wenn die Spannung konstant bliebe und sich $R$ halbierte; hier gilt $P\\propto I^2$.' },
        { text: 'Sie bleibt gleich.', correct: false, why: 'Mehr Strom bei gleichem $R$ bedeutet mehr Spannungsabfall und mehr Wärme.' },
        { text: 'Sie wird halb so groß.', correct: false, why: 'Mehr Strom kann die Leistung nicht verringern.' },
      ],
    },
    {
      id: 'match-formulas', type: 'match', title: 'Welche Formel passt?',
      prompt: 'Ordne die gegebenen Größen der passenden Formel zu.',
      pairs: [
        ['Spannung und Strom bekannt — Leistung?', 'P = U · I'],
        ['Strom und Widerstand bekannt — Leistung?', 'P = I² · R'],
        ['Spannung und Widerstand bekannt — Leistung?', 'P = U² / R'],
        ['Leistung und Widerstand bekannt — Strom?', 'I = √(P / R)'],
        ['Leistung und Widerstand bekannt — Spannung?', 'U = √(P · R)'],
      ],
    },
    {
      id: 'order-check', type: 'order', title: 'Belastbarkeit prüfen',
      prompt: 'Bringe die Schritte in eine sinnvolle Reihenfolge, um zu prüfen, ob ein Widerstand der Schaltung standhält.',
      items: [
        'Bekannte Größen aufschreiben (z. B. $U$ und $R$)',
        'Formel für die Leistung passend zu den bekannten Größen wählen',
        'Einheiten in Volt, Ampere, Ohm umrechnen',
        'Leistung ausrechnen',
        'Mit der Belastbarkeit vergleichen und ausreichend Reserve einplanen',
      ],
      explain: 'Erst Daten, dann Formel, dann Einheiten, dann rechnen, dann **vergleichen** — und weil der Widerstand sonst am Limit heiß wird, nimmt man gern die nächstgrößere Belastbarkeit.',
    },
    {
      id: 'energy', type: 'text', title: 'Energie: Leistung über die Zeit',
      md: `
Eine Leistung von 1 W, die 1 s anhält, setzt 1 J um. Allgemein ist die Energie (elektrische Arbeit)

$$W = P\\cdot t$$

Im Haushalt rechnet man in der **[Kilowattstunde](wiki:Kilowattstunde|Watt hour)**: 1 kWh ist die Energie von 1000 W über 1 Stunde, also $1\\ \\mathrm{kWh} = 1000\\ \\mathrm W\\cdot 3600\\ \\mathrm s = 3{,}6\\ \\mathrm{MJ}$.[^wiki-kilowattstunde] Ein [Heizlüfter](wiki:Heizlüfter|Fan heater) mit 2 kW über 3 Stunden braucht $W = 2\\ \\mathrm{kW}\\cdot 3\\ \\mathrm h = 6\\ \\mathrm{kWh}$. Bei 0,35 € je kWh (hier nur als Rechenannahme!) kostet das $6\\cdot 0{,}35 = 2{,}10$ €.

**Merke:** Die kWh ist eine **Energie**-, keine Leistungseinheit. Ein [Wasserkocher](wiki:Wasserkocher|Electric kettle) hat eine große *Leistung*, braucht aber nur kurz; ein Router mit kleiner Leistung läuft rund um die Uhr und summiert über das Jahr oft mehr Energie. Auch der [Bereitschaftsbetrieb](wiki:Bereitschaftsbetrieb|Sleep mode) vieler Geräte zählt mit.`,
    },
    {
      id: 'calc-kwh', type: 'numeric', title: 'Heizkosten',
      question: 'Ein Heizer mit **2 kW** läuft **3 h**. Wie viel kostet das bei **0,35 €/kWh** (Annahme der Aufgabe)?',
      answer: 2.1, tolerance: 0.02, unit: '€',
      explain: '$W = 2\\cdot 3 = 6$ kWh; $6\\cdot 0{,}35 = 2{,}10$ €.',
    },
    {
      id: 'calc-current-230', type: 'numeric', title: 'Strom am Netz',
      question: 'Ein Heizlüfter mit **2 kW** hängt an **230 V**. Welcher Strom fließt?',
      answer: 8.7, tolerance: 0.1, unit: 'A',
      hint: '$I = P/U$.',
      explain: '$I = 2000\\ \\mathrm W/230\\ \\mathrm V = 8{,}70\\ \\mathrm A$. Eine übliche 16-A-Steckdose verträgt das, mehrere solche Geräte an einer Leitung nicht.',
    },
    {
      id: 'eta', type: 'text', title: 'Wirkungsgrad: was ankommt',
      md: `
Nicht jedes Gerät gibt alle zugeführte Leistung ab; der Rest verschwindet als **Verlustleistung** (meist Wärme, vgl. [Joulesche Wärme](wiki:Joulesche Wärme|Joule heating)). Der [Wirkungsgrad](wiki:Wirkungsgrad|Energy conversion efficiency) vergleicht beide:

$$\\eta = \\frac{P_\\text{ab}}{P_\\text{zu}}\\cdot 100\\ \\%\\qquad P_\\text{ab} = P_\\text{zu} - P_V$$

Ein [Netzteil](wiki:Netzteil|AC adapter), das 100 W aufnimmt und 80 W abgibt, hat $\\eta = 80\\ \\%$ und 20 W Verlust. Diese 20 W heizen das Gehäuse; ab einer gewissen Verlustleistung braucht das Bauteil einen [Kühlkörper](wiki:Kühlkörper|Heat sink). Der Wirkungsgrad ist immer kleiner als 100 % — Energie kann nicht verschwinden, sie wird nur anders verteilt.[^bnetza-pruefungsfragen-2024]`,
    },
    {
      id: 'calc-eta', type: 'numeric', title: 'Wirkungsgrad',
      question: 'Ein Netzteil nimmt **100 W** auf und gibt **80 W** ab. Wie groß ist der Wirkungsgrad?',
      answer: 80, tolerance: 0.5, unit: '%',
      explain: '$\\eta = 80/100 = 80\\ \\%$; die Verlustleistung beträgt $100-80 = 20$ W.',
    },
    {
      id: 'mission', type: 'callout', tone: 'mission', title: 'Prüfung / Funkpraxis',
      md: `
Leistungsrechnen ist **Prüfungsstoff in Reinform**: EB504–EB506 (Formeln umstellen), EB507–EB509 (Dummy Load, Widerstand), EB510–EB512 (größte Spannung/Strom), EB514 (parallele Dummy Load) — das sind rund 20 Fragen. Mit der Formelsammlung (sie liegt in der Prüfung aus) reicht ein Taschenrechner.

**Praxis:** Ein Sender mit 100 W an einer 50-Ω-Dummy-Load: Die Last muss die **volle Leistung dauerhaft in Wärme** umsetzen — daher die 11 parallelen 5-W-Widerstände aus der Aufgabe. Und im Betrieb: Auch Zuleitung und Netzteil des Funkgeräts verlieren Leistung. Deshalb sind Wirkungsgrad und Belastbarkeit keine Theorie, sondern Brandschutz.[^50ohm-lerninhalte]`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>Deutsch</th><th>English</th></tr>
<tr><td>Leistung</td><td>power</td></tr>
<tr><td>Arbeit, Energie</td><td>work, energy</td></tr>
<tr><td>Kilowattstunde</td><td>kilowatt-hour</td></tr>
<tr><td>Wirkungsgrad</td><td>efficiency</td></tr>
<tr><td>Verlustleistung</td><td>power loss, dissipation</td></tr>
<tr><td>Belastbarkeit</td><td>power rating</td></tr>
<tr><td>zugeführte / abgegebene Leistung</td><td>input / output power</td></tr>
<tr><td>Wärme</td><td>heat</td></tr></table>`,
    },
    {
      id: 'warning', type: 'callout', tone: 'warning', title: 'Typische Fehlvorstellungen',
      md: `
- **„Strom wird im Verbraucher verbraucht."** — Der Strom ist hinter dem Verbraucher genauso groß wie davor. Verbraucht (umgewandelt) wird **Energie**.
- **„Leistung steigt linear mit dem Strom."** — Bei festem $R$ gilt $P = I^2 R$: doppelter Strom, vierfache Leistung.
- **„Die kWh ist eine Leistungseinheit."** — Sie ist Energie (Leistung mal Zeit). Leistungseinheit ist das Watt (oder kW).
- **„Ein 0,25-W-Widerstand hält auch 1 W aus, wenn nur kurz."** — Die Angabe gilt für Dauerbetrieb; deutlich darüber wird er heiß und zerstört.`,
    },
    {
      id: 'deep-limits', type: 'callout', tone: 'deep', title: 'Zwei Grenzen: Leistung und Spannungsfestigkeit',
      md: `
Ein Widerstand hat **zwei** Grenzen: die Belastbarkeit $P_{\\max}$ (Wärme) und die Spannungsfestigkeit $U_{\\max}$ (Überschlag). Es zählt, was zuerst erreicht wird. Beispiel (EB511): $R = 100\\ \\mathrm{k\\Omega}$, $P_{\\max} = 6$ W, $U_{\\max} = 1000$ V. Aus der Leistung folgt $U = \\sqrt{6\\cdot 100\\,000} = 775$ V — kleiner als 1000 V. Also begrenzt die **Leistung**: höchstens 775 V.`,
    },
    {
      id: 'recall-quad', type: 'recall', title: 'Erkläre es',
      prompt: 'Warum wird die Leistung in einem Widerstand viermal so groß, wenn man den Strom verdoppelt? Wo steckt die Wärme?',
      answer: 'Verdoppelt man den Strom, verdoppelt sich bei festem Widerstand auch der Spannungsabfall ($U = R\\cdot I$). Die Leistung ist das Produkt $P = U\\cdot I$ — beide Faktoren verdoppeln sich, also $2\\cdot 2 = 4$. Die umgesetzte Energie je Sekunde ist Reibungsarbeit der Ladungsträger im Material: Mit mehr Strom stoßen mehr Ladungen pro Sekunde, und jede wird über die größere Spannung stärker getrieben. Diese Energie erscheint als Wärme ($P = I^2 R$).',
      hints: ['Was passiert mit $U$, wenn $I$ doppelt so groß wird?', 'Wie hängt $P$ von $U$ und $I$ ab?'],
      cards: ['p-formeln', 'p-quadrat'],
    },
  ],
  cards: [
    { id: 'p-grund', front: 'Leistung aus Spannung und Strom?', back: '$P = U\\cdot I$ — Einheit $1\\ \\mathrm W = 1\\ \\mathrm{V\\cdot A} = 1\\ \\mathrm{J/s}$.' },
    { id: 'p-formeln', front: 'Die drei Formen der Leistung?', back: '$P = U\\cdot I = I^2 R = \\dfrac{U^2}{R}$.' },
    { id: 'p-u', front: 'Spannung aus $P$ und $R$?', back: '$U = \\sqrt{P\\cdot R}$ (aus $P=U^2/R$).' },
    { id: 'p-i', front: 'Strom aus $P$ und $R$?', back: '$I = \\sqrt{P/R}$ (aus $P=I^2R$).' },
    { id: 'p-r', front: 'Widerstand aus $P$ und $U$ bzw. $I$?', back: '$R = \\dfrac{U^2}{P}$ bzw. $R = \\dfrac{P}{I^2}$.' },
    { id: 'p-quadrat', front: 'Strom (oder Spannung) verdoppeln: Leistung?', back: 'Viermal so groß ($P\\propto I^2$ bzw. $U^2$).' },
    { id: 'w-formel', front: 'Energie aus Leistung?', back: '$W = P\\cdot t$ — in Ws = J oder in Wh, kWh.' },
    { id: 'kwh-mj', front: 'Wie viel Joule ist 1 kWh?', back: '$1\\ \\mathrm{kWh} = 3{,}6\\ \\mathrm{MJ}$ (1000 W · 3600 s).' },
    { id: 'kwh-art', front: 'Ist die kWh eine Leistungs- oder Energieeinheit?', back: 'Energie (Leistung mal Zeit).' },
    { id: 'eta', front: 'Wirkungsgrad?', back: '$\\eta = \\dfrac{P_\\text{ab}}{P_\\text{zu}}\\cdot 100\\ \\%$ — immer unter 100 %.' },
    { id: 'p-verlust', front: 'Zusammenhang zwischen zu-, abgeführter und Verlustleistung?', back: '$P_\\text{ab} = P_\\text{zu} - P_V$.' },
    { id: 'belastbarkeit', front: 'Belastbarkeit eines Widerstands prüfen?', back: 'Leistung $P = U^2/R$ (bzw. $I^2R$) ausrechnen und mit $P_{\\max}$ vergleichen; Reserve einplanen.' },
    { id: 'dummy-belastung', front: 'Dummy Load aus $n$ gleichen Widerständen parallel: Belastbarkeit?', back: '$n\\cdot P_\\text{einzeln}$ (z. B. $11\\cdot 5\\ \\mathrm W = 55\\ \\mathrm W$); $R_\\text{ges} = R/n$.' },
  ],
};
