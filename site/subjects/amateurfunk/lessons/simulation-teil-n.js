export default {
  id: 'simulation-teil-n',
  title: 'Simulation Teil N: Technik (Einstiegsniveau)',
  summary: 'Teil N unter Prüfungsbedingungen: 25 Fragen aus dem N-Technik-Pool (195), 45 Minuten, 19 richtig; Formelsammlung und Taschenrechner als Hilfsmittel. Strategie, Zeitplan und Merkliste der Formeln.',
  minutes: 45,
  goals: [
    'Den Aufbau von Teil N kennen und wissen, was in der Formelsammlung steht und was du verstehen musst',
    'Die typischen Rechenaufgaben (Parallelschaltung, Wellenlänge, Dezibel, Effektivwert) fehlerfrei lösen',
    'Einen Zeitplan für 45 Minuten mit Rechenaufgaben aufstellen und die Teil-Simulation durchführen',
    'Das Ergebnis auswerten und die schwachen Themen gezielt wiederholen',
  ],
  needs: ['formelsammlung-und-taschenrechner'],
  blocks: [
    {
      id: 'ablauf', type: 'text', title: 'So läuft Teil N',
      md: String.raw`
Teil N („Technische Kenntnisse“ auf Einstiegsniveau) hat dieselbe Form wie die anderen Teile: **25** Fragen, **45 Minuten**, **19 Punkte** zum Bestehen, ab **17** Punkten bei genau einem verfehlten Teil mündliche Nachprüfung möglich.[^bnetza-pruefungsordnung] Neu gegenüber V und B: In den **Technikteilen** bekommst du die **Formelsammlung** und **Entwurfspapier** für Berechnungen (die Berechnungen auf dem Entwurfspapier zählen nicht für das Ergebnis). Mitbringen darfst du einen einfachen **wissenschaftlichen** oder **nicht programmierbaren Taschenrechner** ohne Textspeicher. Der N-Pool hat **195** Fragen.[^bnetza-fragenkatalog]

**Jetzt starten:** [Prüfungssimulation](#/s/amateurfunk/exam), bei Teil N **„nur diesen Teil unter Prüfungsbedingungen“**. Dazu: [Übungsmodus für den ganzen Teil N](#/s/amateurfunk/practice/part:n) und die [Fehler der letzten Prüfung](#/s/amateurfunk/practice/last). Lege die amtliche Formelsammlung[^bnetza-formelsammlung] neben den Bildschirm; in der Prüfung liegt sie auch auf dem Tisch.

<table>
<tr><th>Thema</th><th>Fragen</th><th>Anteil</th></tr>
<tr><td>Allgemeine mathematische Grundkenntnisse</td><td>16</td><td>8 %</td></tr>
<tr><td>Elektrizität, Elektromagnetismus und Funktion von Bauteilen</td><td><b>34</b></td><td>17 %</td></tr>
<tr><td>Elektrische und elektronische Bauteile</td><td>17</td><td>9 %</td></tr>
<tr><td>Elektronische Schaltungen</td><td>11</td><td>6 %</td></tr>
<tr><td>Modulations- und Übertragungsverfahren</td><td>29</td><td>15 %</td></tr>
<tr><td>Sender und Empfänger</td><td>26</td><td>13 %</td></tr>
<tr><td>Antennen und Übertragungsleitungen</td><td>26</td><td>13 %</td></tr>
<tr><td>Wellenausbreitung und Ionosphäre</td><td>9</td><td>5 %</td></tr>
<tr><td>Messungen und Messinstrumente</td><td>9</td><td>5 %</td></tr>
<tr><td>Störemissionen, Störfestigkeit</td><td>4</td><td>2 %</td></tr>
<tr><td>EMV, Personen- und Sachschutz</td><td>14</td><td>7 %</td></tr>
</table>`,
    },
    {
      id: 'strategie', type: 'text', title: 'Strategie: erst die sicheren Punkte, dann das Rechnen',
      md: String.raw`
Teil N besteht aus **Verständnisfragen** (Wirkung eines Bauteils, Schaltzeichen, Modulationsart, Antennenform) und **Rechenaufgaben** mit wenigen Schritten. Die Formeln musst du **nicht auswendig** können, wohl aber **wissen, dass sie in der Formelsammlung stehen, wo, und welche Größen was bedeuten**:

1. **Erster Durchgang, zügig:** Verständnisfragen sofort beantworten (etwa 30 bis 50 Sekunden). Rechenaufgaben, die länger als eine Minute brauchen, **markieren und überspringen**.
2. **Zweiter Durchgang:** Rechenaufgaben mit Entwurfspapier. **Gegeben und gesucht** aufschreiben, **Formel suchen**, alle Werte in **Grundeinheiten** umrechnen, rechnen, **Plausibilität** prüfen (Größenordnung, Einheit).
3. **Ausschlussverfahren:** Die Antworten unterscheiden sich oft um Zehnerpotenzen. Eine überschlägige Rechnung (z. B. $330\,\Omega \parallel 470\,\Omega$ muss kleiner als $330\,\Omega$ sein) streicht schon zwei Antworten.
4. **Kontrolle:** Hast du Zeit, prüfe zuerst die Rechenaufgaben mit „komischem“ Ergebnis.

**Fallen:** $\hat U$ (Spitzenwert), $U_\mathrm{eff}$ (Effektivwert), $U_\mathrm{SS}$ (Spitze-Spitze); Leistungs- und Spannungsverhältnis bei **dB** (3 dB bedeuten Faktor 2 bei Leistung, aber nur 1,41 bei Spannung); **m statt M**, **µ statt n**; bei der Parallelschaltung am Ende den Kehrwert vergessen.`,
    },
    {
      id: 'demo-zeit', type: 'viz', viz: 'zeit-planer', title: 'Demo: Dein Zeitplan für Teil N',
      intro: 'Schätze, wie viele der 25 Fragen Rechenaufgaben sind, und wie lange du dafür brauchst. Die Voreinstellungen sind Übungsannahmen, keine amtlichen Angaben.',
      params: { part: 'n' },
      task: 'Sieh einmal einen Plan, der die **45 Minuten sprengt** (z. B. viele lange Rechenaufgaben), und baue dann einen, der **mit mindestens 5 Minuten Puffer** passt.',
    },
    {
      id: 'calc-parallel', type: 'numeric', title: 'Rechenaufgabe: Parallelschaltung',
      question: String.raw`Zwei Widerstände $R_1 = 330\,\Omega$ und $R_2 = 470\,\Omega$ sind parallel geschaltet. Wie groß ist der Gesamtwiderstand $R_\mathrm{G}$?`,
      answer: 194, tolerance: 2, unit: 'Ω',
      hint: 'Bei zwei Widerständen: Produkt durch Summe.',
      explain: String.raw`$R_\mathrm{G}=\dfrac{R_1\cdot R_2}{R_1+R_2}=\dfrac{330\cdot470}{800}\,\Omega\approx 194\,\Omega$. Plausibilität: Der Gesamtwert der Parallelschaltung ist **immer kleiner** als der kleinste Einzelwiderstand (hier 330 Ω).`,
    },
    {
      id: 'calc-lambda', type: 'numeric', title: 'Rechenaufgabe: Wellenlänge',
      question: String.raw`Welche Wellenlänge hat ein Signal auf $145\,\text{MHz}$? Rechne mit der Näherung der Formelsammlung.`,
      answer: 2.07, tolerance: 0.03, unit: 'm',
      hint: String.raw`$\lambda[\text{m}]\approx 300/f[\text{MHz}]$.`,
      explain: String.raw`$\lambda\approx 300/145\,\text{m}\approx 2{,}07\,\text{m}$: das **2-m-Band**. Plausibel: Je höher die Frequenz, desto kürzer die Welle.`,
    },
    {
      id: 'quiz-db', type: 'quiz', title: 'Dezibel: Leistung oder Spannung?',
      question: 'Ein Verstärker hat eine Verstärkung von 6 dB. Die Eingangsleistung ist 2 W. Welche Ausgangsleistung steht an?',
      options: [
        { text: '8 W (6 dB entsprechen einem Leistungsfaktor 4)', correct: true, why: 'Nach der Tabelle der Formelsammlung sind 6 dB bei Leistung der Faktor 4; bei Spannung wäre es nur Faktor 2.' },
        { text: '4 W (Faktor 2)', why: 'Faktor 2 gilt für 3 dB bei Leistung, bzw. 6 dB bei Spannung.' },
        { text: '12 W (2 W + 6 W)', why: 'Dezibel werden nicht addiert, sondern bedeuten einen Faktor.' },
        { text: '20 W (Faktor 10)', why: 'Faktor 10 gehört zu 10 dB (Leistung).' },
      ],
    },
    {
      id: 'match-abschnitt', type: 'match', title: 'Gesucht → Formelsammlung',
      prompt: 'In welchem Abschnitt der Formelsammlung suchst du?',
      pairs: [
        ['Spannung über dem Widerstand R₂ in einer Reihenschaltung', 'Widerstände: Spannungsteiler (unbelastet)'],
        ['Spitzenwert einer Sinusspannung aus dem Effektivwert', 'Wechselspannung: Effektiv- und Spitzenwerte'],
        ['Wirkungsgrad eines Netzteils', 'Leistung/Arbeit: Wirkungsgrad'],
        ['Leistungsverhältnis zu 3 dB', 'Pegel: Tabelle Leistungs-/Spannungsverhältnis'],
        ['Farbringe eines Widerstands', 'Widerstände: Farbcode-Tabelle'],
      ],
    },
    {
      id: 'recall-auswertung', type: 'recall', title: 'Nach der Simulation',
      prompt: 'Mache jetzt die Simulation von Teil N. Trage danach ein: Punktzahl, wie viele Rechenaufgaben du richtig hattest, die zwei schwächsten Themen und was du ändern wirst.',
      answer: 'Beispielantwort: „20 von 25. Von etwa 6 Rechenaufgaben 4 richtig; zwei Fehler durch Vorsätze (µ statt m). Schwache Themen: Modulation und Messinstrumente. Ich übe täglich eine Runde Rechenaufgaben mit Grundeinheiten und Plausibilitätsprobe und wiederhole Modulation im Themenmodus.“ Wichtig: Fehler nach Ursache (Wissen, Rechnen, Lesen) sortieren.',
      cards: ['sn-ohm', 'sn-dB'],
    },
  ],
  cards: [
    { id: 'sn-ohm', front: 'Ohmsches Gesetz und Leistung?', back: String.raw`$U=R\cdot I$, $R=U/I$, $I=U/R$. $P=U\cdot I=\dfrac{U^2}{R}=I^2\cdot R$.` },
    { id: 'sn-reihe', front: 'Reihen- und Parallelschaltung von Widerständen?', back: String.raw`Reihe: $R_\mathrm{G}=R_1+R_2+\dots$. Parallel: $\dfrac{1}{R_\mathrm{G}}=\dfrac{1}{R_1}+\dfrac{1}{R_2}+\dots$; bei zwei: $R_\mathrm{G}=\dfrac{R_1R_2}{R_1+R_2}$ (kleiner als der kleinste).` },
    { id: 'sn-teiler', front: 'Spannungsteiler (unbelastet) und Stromteiler?', back: String.raw`$\dfrac{U_2}{U_\mathrm{G}}=\dfrac{R_2}{R_1+R_2}$, $\dfrac{U_1}{U_2}=\dfrac{R_1}{R_2}$. Stromteiler: $\dfrac{I_2}{I_1}=\dfrac{R_1}{R_2}$.` },
    { id: 'sn-sinus', front: 'Spitzen-, Effektiv- und Spitze-Spitze-Wert?', back: String.raw`$\hat U=U_\mathrm{eff}\cdot\sqrt2$, $U_\mathrm{SS}=2\cdot\hat U$, $T=1/f$.` },
    { id: 'sn-eta', front: 'Wirkungsgrad?', back: String.raw`$\eta=\dfrac{P_\mathrm{ab}}{P_\mathrm{zu}}\cdot100\,\%$, $P_\mathrm{ab}=P_\mathrm{zu}-P_\mathrm{V}$.` },
    { id: 'sn-lambda', front: 'Wellenlänge aus Frequenz?', back: String.raw`$\lambda[\text{m}]\approx\dfrac{300}{f[\text{MHz}]}$ (aus $c\approx3\cdot10^8\,\text{m/s}$). 145 MHz → 2,07 m.` },
    { id: 'sn-dB', front: 'dB-Merkwerte (Leistung | Spannung)?', back: '**3 dB:** ×2 | ×1,41. **6 dB:** ×4 | ×2. **10 dB:** ×10 | ×3,16. **20 dB:** ×100 | ×10. **−3 dB:** ×0,5.' },
    { id: 'sn-vorsaetze', front: 'Vorsätze?', back: String.raw`p $10^{-12}$, n $10^{-9}$, µ $10^{-6}$, m $10^{-3}$, k $10^{3}$, M $10^{6}$, G $10^{9}$. Fallen: m ≠ M, µ ≠ m.` },
    { id: 'sn-bauteile', front: 'Kondensator und Spule: Verhalten bei Gleich- und Wechselstrom?', back: '**Kondensator:** sperrt Gleichstrom, Blindwiderstand sinkt mit der Frequenz. **Spule:** lässt Gleichstrom durch, Blindwiderstand steigt mit der Frequenz.' },
    { id: 'sn-vorgehen', front: 'Vorgehen bei Rechenaufgaben?', back: 'Gegeben/gesucht → **Formel suchen** → **Grundeinheiten** → rechnen → **Plausibilität** (Größenordnung, Einheit). Bei Zeitnot zurückstellen.' },
  ],
};
