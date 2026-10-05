// Abbildungen: Zeichnungen aus dem amtlichen Prüfungsfragenkatalog (Bundesnetzagentur, Datenlizenz Deutschland – Namensnennung 2.0), hier als Anschauung zum Erkennen.
const F = id => `assets/data/afu/figures/${id}.svg`;
const grid = (items, min = 150, maxH = 190) => `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(${min}px,1fr));gap:12px;align-items:end">${items.map(([id, cap]) => `<figure style="margin:0;text-align:center"><img src="${F(id)}" alt="${cap}" loading="lazy" style="width:100%;max-height:${maxH}px;object-fit:contain;background:#fff;border:1px solid var(--line);border-radius:10px;padding:6px"><figcaption style="font-size:.82rem;color:var(--muted);margin-top:4px">${cap}</figcaption></figure>`).join('')}</div>`;

export default {
  id: 'richtantennen-polarisation-gewinn',
  title: 'Richtantennen, Polarisation und Gewinn',
  summary: 'Yagi-Uda mit Reflektor, Strahler und Direktoren, Parabolspiegel, horizontale, vertikale und zirkulare Polarisation, Antennengewinn in dBi und dBd.',
  minutes: 20,
  goals: [
    'Aufbau und Wirkprinzip der [[yagi-uda-antenne]] erklären: [[reflektor]], Strahler, [[direktor]]; nur der Strahler wird gespeist',
    'Hauptkeule, Rückkeule und Nebenkeulen im Strahlungsdiagramm einer [[richtantenne]] benennen und den Parabolspiegel (Durchmesser mindestens fünf Wellenlängen) einordnen',
    '[[polarisation]] als Richtung des elektrischen Feldes bestimmen (horizontal, vertikal, zirkular) und erklären, warum Sende- und Empfangsantenne gleich polarisiert sein sollen',
    'Antennengewinn in [[dbi]] und [[dbd]] unterscheiden und mit $g_i = g_d + 2{,}15$ dB umrechnen',
  ],
  needs: ['elektrotechnik/wellen-felder-antennen-intro', 'amateurfunk/dipol-und-rundstrahler'],
  blocks: [
    {
      id: 'intro', type: 'text', title: 'Warum eine Antenne bündeln?',
      md: `
Ein Halbwellendipol strahlt nach beiden Seiten und teilweise nach oben. Willst du nur eine bestimmte Gegenstation erreichen, ist das Verschwendung: Ein Teil der Leistung geht in Richtungen, in denen niemand zuhört. Eine **[[richtantenne|Richtantenne]]** konzentriert die Leistung wie eine Taschenlampe einen Lichtstrahl in eine Richtung, und sie empfängt aus dieser Richtung auch besser. Du richtest sie auf die Gegenstation aus, oft mit einem Drehantrieb (Rotor).

Das bekannteste Beispiel ist die [Yagi-Uda-Antenne](wiki:Yagi-Uda-Antenne|Yagi–Uda antenna), veröffentlicht 1926 von den japanischen Wissenschaftlern [Hidetsugu Yagi](wiki:Hidetsugu Yagi|Hidetsugu Yagi) und [Shintaro Uda](wiki:Shintaro Uda|Shintaro Uda).[^darc-50ohm] Für Mikrowellen nimmt man dagegen den [Parabolspiegel](wiki:Parabolantenne|Parabolic antenna).
`,
    },
    {
      id: 'yagi', type: 'text', title: 'Yagi-Uda: Reflektor, Strahler, Direktoren',
      md: `
Eine [[yagi-uda-antenne|Yagi-Uda-Antenne]] besteht aus mehreren parallelen Stäben auf einem gemeinsamen Träger (Boom):

- Der **Strahler** (ein Dipol, oft als Faltdipol ausgeführt) ist das **einzige Element, an dem das Antennenkabel angeschlossen ist**. Dort wird eingespeist.
- Der **[[reflektor|Reflektor]]** sitzt hinter dem Strahler, in Richtung der unerwünschten Seite, und ist etwas **länger**.
- Ein oder mehrere **[[direktor|Direktoren]]** sitzen vor dem Strahler, in Richtung der Gegenstation, und sind etwas **kürzer**.

Reflektor und Direktoren heißen **parasitäre Elemente**: Sie sind elektrisch nicht angeschlossen, nehmen aber die vom Strahler ausgesandte Welle auf, schwingen selbst mit und strahlen wieder ab. Ihre Strahlung hat gegenüber dem Strahler eine zeitliche und räumliche Phasenverschiebung. Durch die [Überlagerung](wiki:Interferenz (Physik)|Wave interference) aller Wellen löschen sich diese in manchen Richtungen aus (Wellenberg trifft Wellental) und verstärken sich in der gewünschten Richtung. Das Ergebnis ist eine große **Hauptkeule** nach vorn.

Im [Strahlungsdiagramm](wiki:Antennendiagramm|Radiation pattern) gibt es außerdem eine kleinere **Rückkeule** und mitunter **Nebenkeulen**: Auch eine Yagi strahlt ein wenig nach hinten, was eigentlich unerwünscht ist. Je mehr Elemente (mehr Direktoren), desto größer der Gewinn und desto schmaler die Hauptkeule: Eine Yagi mit neun Elementen erreicht leicht einen Gewinnfaktor von zehn oder mehr gegenüber dem Halbwellendipol.

${grid([['EG111_q', 'Einfache Yagi: 1 Reflektor, 2 Strahler, 3 Direktor (von hinten nach vorn)'], ['NG108_q', 'Yagi-Uda-Antenne mit mehreren Direktoren'], ['EG218_q', 'Strahlungsdiagramm einer Yagi: schmale Hauptkeule, kleine Rückkeule']], 170, 210)}
`,
    },
    {
      id: 'demo-yagi', type: 'viz', viz: 'strahlungsdiagramm', title: 'Yagi-Diagramm: Elemente hinzufügen',
      params: { ants: ['dipH', 'yagi'], ant: 'dipH', goals: ['yagi'] },
      intro: 'Vergleiche den **Dipol** mit der **Yagi** und erhöhe die Zahl der Elemente. Beobachte Hauptkeule, Rückkeule (Vor-Rück-Verhältnis) und den Öffnungswinkel, bei dem die Leistung auf die Hälfte (−3 dB) fällt. In der Yagi-Rechnung sind es hier N gekoppelte Halbwellenstrahler; echte Yagis erreichen den Effekt mit parasitären Elementen.',
      task: 'Stelle die Yagi auf mindestens fünf Elemente ein, sodass der Gewinn über 9 dBi liegt, und beobachte, wie der Öffnungswinkel schrumpft.',
    },
    {
      id: 'warn-yagi', type: 'callout', tone: 'warning', title: 'Verwechslung: Wer wird gespeist, wer ist wo?',
      md: `Gespeist wird **nur der Strahler**, nicht der Reflektor und nicht der Direktor (und auch nicht „Strahler und Reflektor gleichzeitig“). Der Reflektor ist **länger** und steht **hinten**, der Direktor **kürzer** und **vorn**. In der Zeichnung von hinten nach vorn zählt man also Reflektor, Strahler, Direktor. Prüfungsbezug: EG111, EG212.`,
    },
    {
      id: 'parabol', type: 'text', title: 'Parabolspiegel für Mikrowellen',
      md: `
[Mikrowellen](wiki:Mikrowellen|Microwave) sind elektromagnetische Wellen zwischen etwa 1 GHz und 300 GHz, mit Wellenlängen von Millimetern bis wenigen Dezimetern (mit der Vorsilbe „Mikro“ hat das nichts zu tun). Bei so kurzen Wellen lohnt sich der **Parabolspiegel**: Eine parabolisch geformte Metallfläche (oder ein engmaschiges Gitter) wirft parallel einfallende Wellen gebündelt in einen Punkt zurück, den Brennpunkt. Dort sitzt die **Erregerantenne** (Feed), die die Welle aufnimmt oder aussendet. Die Antenne besteht also aus einem **paraboloid geformten Spiegelkörper und einer Erregerantenne**, nicht aus einem isotropen Strahler und nicht aus einem zylindrischen oder hyperbolischen Spiegel.

Weil Wellen gebeugt werden, ist die Bündelung nie perfekt. Je größer der Spiegel im Vergleich zur Wellenlänge ist, desto schärfer bündelt er. Eine sinnvolle Richtwirkung erreichen Parabolspiegel erst ab einem **Durchmesser von etwa fünf Wellenlängen oder mehr**; für möglichst hohen Gewinn wählt man den Durchmesser so groß wie möglich. Bei 10 GHz ($\\lambda\\approx 3$ cm) genügt dafür schon ein Spiegel von 15 cm, bei 2 m Wellenlänge wären es 10 m. Deshalb gibt es Parabolspiegel nur auf den höchsten Bändern.
`,
    },
    {
      id: 'polarisation', type: 'text', title: 'Polarisation: Wie schwingt das elektrische Feld?',
      md: `
Eine [elektromagnetische Welle](wiki:Elektromagnetische Welle|Electromagnetic wave) besteht aus einem elektrischen Feld $\\vec E$ und einem magnetischen Feld $\\vec H$, die senkrecht aufeinander und senkrecht zur Ausbreitungsrichtung stehen. Die Ausbreitungsrichtung zeigt der [Poynting-Vektor](wiki:Poynting-Vektor|Poynting vector) (in den Prüfungsbildern S).

Die **[[polarisation|Polarisation]]** ist festgelegt durch die **Richtung des elektrischen Feldes**, bezogen auf die Erdoberfläche:

- **Horizontale Polarisation:** $\\vec E$ liegt parallel zum Erdboden.
- **Vertikale Polarisation:** $\\vec E$ steht senkrecht zum Erdboden.
- **[[zirkulare-polarisation|Zirkulare Polarisation]]:** $\\vec E$ dreht sich beim Fortschreiten der Welle wie ein Korkenzieher, entweder rechtsdrehend oder linksdrehend. Man erzeugt sie zum Beispiel mit zwei senkrechten Dipolen, die um eine Viertelwellenlänge versetzt oder um 90° phasenverschoben gespeist werden.

Bei Dipol und Yagi erkennt man die Polarisation an der Lage der Stäbe: waagerechte Stäbe, horizontale Polarisation; senkrechte Stäbe, vertikale Polarisation. Das elektrische Feld liegt in der Richtung der Leiter. Aber Vorsicht: Maßgeblich ist das **elektrische** Feld, nicht das magnetische. Eine liegende Magnetic-Loop strahlt deshalb vertikal polarisiert (und eine stehende horizontal), und bei der Delta-Loop hängt es von der Lage des Speisepunktes ab.

${grid([['EB306_q', 'E-Feld parallel zur Erde: horizontal polarisiert'], ['EB307_q', 'E-Feld senkrecht zur Erde: vertikal polarisiert'], ['EB308_q', 'E-Vektor dreht sich: zirkular polarisiert']], 190, 160)}

**Warum das wichtig ist:** Auf VHF, UHF und höher sollten **Sende- und Empfangsantenne gleich polarisiert sein**. Bei unterschiedlicher Polarisation, etwa horizontal gegen vertikal, bricht die Verbindung deutlich ein, im Idealfall bis auf null. Wegen Reflexionen und Streuung ist es in der Praxis ein hoher Dämpfungswert, kein Totalausfall. Zirkular zu linear kostet etwa 3 dB.
`,
    },
    {
      id: 'demo-pol', type: 'viz', viz: 'polarisation', title: 'Polarisation: Sender und Empfänger',
      intro: 'Links siehst du, wie das elektrische Feld des Senders schwingt oder dreht (Blick in Ausbreitungsrichtung), rechts die Empfangsantenne. Wähle Polarisationen für beide.',
      task: 'Stelle gleiche Polarisation ein, dann waagerecht gegen senkrecht, dann lineare gegen zirkulare Polarisation.',
    },
    {
      id: 'warn-pol', type: 'callout', tone: 'warning', title: 'Typische Fehlvorstellungen zur Polarisation',
      md: `Polarisation hat nichts mit Magnetpolen, Kompassrichtung (Azimut) oder dem Stromnetz zu tun. Sie wird durch die Richtung des **elektrischen** Feldes in der Hauptstrahlrichtung bestimmt und auf die Erdoberfläche bezogen. Die Ausbreitungsrichtung (Poynting-Vektor) ist es auch nicht. Und „transversal, longitudinal, orthogonal“ sind keine Polarisationsarten: Üblich sind horizontale, vertikale sowie links- und rechtszirkulare Polarisation. Prüfungsbezug: NB304, EB305, EB306 bis EB310, EG222.`,
    },
    {
      id: 'pol-yagi', type: 'text', title: 'Polarisation einer Richtantenne ablesen',
      md: `
Ist die Yagi so montiert, dass ihre Stäbe **waagerecht** liegen, strahlt sie horizontal polarisiert; stehen die Stäbe **senkrecht**, strahlt sie vertikal polarisiert. Du siehst es an der Zeichnung: Die Lage der Elemente gegenüber dem Mast (und dem Boden) verrät die Polarisation in der Hauptstrahlrichtung.

${grid([['EB309_q', 'Yagi mit waagerechten Stäben: horizontal'], ['EB310_q', 'Yagi mit senkrechten Stäben: vertikal']], 190, 230)}

Praxis: Im 2-m-Band wird für FM-Sprechfunk über Relais meist vertikal polarisiert gefunkt (mit Rundstrahlern), bei Weitverbindungen in SSB und CW dagegen horizontal. Wer sich nach den Gepflogenheiten richtet, vermeidet die Polarisationsdämpfung.
`,
    },
    {
      id: 'gewinn', type: 'text', title: 'Antennengewinn: dBi und dBd',
      md: `
Eine passive Antenne **verstärkt nichts**: Sie hat keine Energiequelle. Der **[[antennengewinn|Gewinn]]** sagt nur, um wie viel stärker sie in ihrer Hauptstrahlrichtung strahlt als eine **Bezugsantenne** (siehe [Antennengewinn](wiki:Antennengewinn|Gain (antenna))). Die Energie wird aus anderen Richtungen „abgezogen“ und in eine Richtung geschickt. Der Gewinn wird in Dezibel angegeben; der Zusatz sagt, was die Bezugsantenne ist:

- **[[dbi]]**: bezogen auf den **[[isotropstrahler|Isotropstrahler]]** (Kugelstrahler), eine gedachte Antenne, die in alle Richtungen gleich stark strahlt. Das **i** steht für isotrop.
- **[[dbd]]**: bezogen auf den **Halbwellendipol**. Das **d** steht für Dipol.

Der Halbwellendipol strahlt in Hauptrichtung um 2,15 dB stärker als der Kugelstrahler. Deshalb hat er 2,15 dBi, aber 0 dBd. Die Angabe in dBi ist immer um **2,15 dB größer** als die in dBd:

$$g_i = g_d + 2{,}15\\,\\text{dB}$$

Beispiel: Ein Hersteller gibt 5 dBd an; das sind $5 + 2{,}15 = 7{,}15$ dBi. Der Faktor 2,15 dB entspricht dem Leistungsfaktor 1,64. Einen kleineren Wert für den gleichen Gewinn findest du bei dBd, einen größeren bei dBi (Hersteller schreiben deshalb gern dBi).
`,
    },
    {
      id: 'demo-gewinn', type: 'viz', viz: 'gewinn-umrechner', title: 'Gewinn umrechnen und Parabolspiegel',
      intro: 'Stelle den Gewinn in dBd ein und lies dBi und die Gewinnfaktoren ab. Der zweite Reiter zeigt, wie Gewinn und Öffnungswinkel eines Parabolspiegels mit Durchmesser und Frequenz wachsen (Näherungsformel, nicht Prüfungsstoff).',
      task: 'Stelle 5 dBd ein (7,15 dBi), dann den Dipol (0 dBd) und danach einen Parabolspiegel mit mehr als 30 dBi.',
    },
    {
      id: 'mission-gewinn', type: 'callout', tone: 'mission', title: 'Funkpraxis: Was bringt eine Yagi?',
      md: `Eine 3-Element-Yagi für 2 m bringt dir rund 5 bis 7 dBd. Das ist mehr als eine Verdopplung des Signals in Richtung Gegenstation, ganz ohne mehr Leistung. Auf der anderen Seite hörst du Störer aus dem Rücken deutlich leiser. Bei der Wahl der Antenne gilt: Gewinn gibt es nicht umsonst; die Bündelung kostet Rundumabdeckung, und du musst die Antenne drehen.`,
    },
    {
      id: 'q-yagi', type: 'quiz', title: 'Yagi-Elemente',
      question: 'Welche Aussage zum Aufbau einer Yagi-Uda-Antenne ist richtig?',
      options: [
        { text: 'Der Strahler ist das einzige gespeiste Element; der Reflektor ist länger und liegt hinten, die Direktoren sind kürzer und liegen vorn.', correct: true, why: 'Genau so bündelt die Yagi nach vorn.' },
        { text: 'Reflektor und Strahler werden gleichzeitig gespeist, die Direktoren sind frei.', why: 'Der Reflektor ist ein parasitäres Element und nicht angeschlossen.' },
        { text: 'Die Direktoren sind länger als der Strahler und stehen hinten.', why: 'Direktoren sind kürzer und stehen vorn; länger ist der Reflektor.' },
        { text: 'Alle Elemente sind gleich lang und werden über Phasenleitungen gespeist.', why: 'Bei der klassischen Yagi sind die Längen verschieden und nur der Strahler hat einen Anschluss.' },
      ],
    },
    {
      id: 'q-pol', type: 'quiz', title: 'Gleiche Polarisation',
      question: 'Du hörst im 2-m-Band eine Station sehr leise, obwohl sie nur 5 km entfernt ist. Du hast eine waagerechte Yagi, die Gegenstation sendet mit einer senkrechten Antenne. Was ist die wahrscheinlichste Ursache?',
      options: [
        { text: 'Unterschiedliche Polarisation von Sende- und Empfangsantenne.', correct: true, why: 'Waagerecht gegen senkrecht verliert viel Signal.' },
        { text: 'Die Yagi hat zu viele Direktoren.', why: 'Mehr Direktoren erhöhen den Gewinn in der Hauptrichtung und erklären keine Dämpfung bei 5 km.' },
        { text: 'Die Polarisation der Antennenkabel passt nicht.', why: 'Kabel haben keine Polarisation; die gibt es nur bei der abgestrahlten Welle.' },
        { text: 'Die Magnetpole der Erde stören.', why: 'Mit dem Erdmagnetfeld hat die Polarisation nichts zu tun.' },
      ],
    },
    {
      id: 'num-dbd', type: 'numeric', title: 'Von dBd nach dBi',
      question: 'Eine Yagi hat laut Datenblatt $9{,}4\\,\\text{dBd}$ Gewinn. Wie groß ist der Gewinn in dBi?',
      answer: 11.55, tolerance: 0.05, unit: 'dBi',
      hint: 'Der Dipol selbst hat schon 2,15 dB mehr als der Kugelstrahler.',
      explain: '$g_i = g_d + 2{,}15\\,\\text{dB} = 9{,}4 + 2{,}15 = 11{,}55\\,\\text{dBi}$.',
    },
    {
      id: 'num-dbi', type: 'numeric', title: 'Von dBi nach dBd',
      question: 'Ein Parabolspiegel hat 24 dBi. Wie groß ist sein Gewinn in dBd, bezogen auf den Halbwellendipol?',
      answer: 21.85, tolerance: 0.05, unit: 'dBd',
      hint: 'Umgekehrt: den Dipolgewinn abziehen.',
      explain: '$g_d = g_i - 2{,}15\\,\\text{dB} = 24 - 2{,}15 = 21{,}85\\,\\text{dBd}$.',
    },
    {
      id: 'order-elemente', type: 'order', title: 'Yagi von hinten nach vorn',
      prompt: 'Ordne die Elemente einer einfachen Yagi von hinten (unerwünschte Richtung) nach vorn (Gegenstation).',
      items: ['Reflektor (länger, parasitär)', 'Strahler (gespeist, Faltdipol)', 'Erster Direktor (kürzer, parasitär)', 'Weitere Direktoren (kürzer, parasitär)'],
      explain: 'Hinten der Reflektor, in der Mitte der Strahler, vorn die Direktoren. Die Hauptkeule zeigt in Richtung der Direktoren.',
    },
    {
      id: 'match-pol', type: 'match', title: 'Antenne und Polarisation',
      prompt: 'Ordne zu: Welche Polarisation hat die Anordnung?',
      pairs: [
        ['Dipol, waagerecht gespannt', 'horizontal'],
        ['Groundplane mit senkrechtem Strahler', 'vertikal'],
        ['Zwei senkrecht gekreuzte Dipole, 90° phasenverschoben', 'zirkular'],
        ['Yagi mit senkrecht stehenden Stäben', 'vertikal'],
        ['Yagi mit waagerechten Stäben', 'horizontal'],
      ],
    },
    {
      id: 'recall-gewinn', type: 'recall', title: 'In eigenen Worten',
      prompt: 'Ein Hersteller wirbt: „Gewinn 8 dBi“. Was heißt das, was ist die Bezugsantenne, wie viel dBd sind es, und warum ist der Gewinn einer passiven Antenne keine Verstärkung?',
      answer: 'Das i steht für Isotropstrahler: Die Antenne strahlt in ihrer Hauptrichtung um 8 dB stärker als ein Kugelstrahler, der in alle Richtungen gleich strahlt. In dBd (Bezug Halbwellendipol) sind es 8 − 2,15 = 5,85 dBd. Eine passive Antenne bündelt nur: Sie nimmt keine zusätzliche Energie auf, sondern strahlt in die Hauptrichtung mehr und in andere Richtungen weniger.',
      cards: ['rg-dbi-dbd', 'rg-gi'],
    },
    {
      id: 'wrap', type: 'callout', tone: 'fact', title: 'Zum Mitnehmen',
      md: `Richtantenne bündelt, Gewinn gibt nur an, wie stark in der Hauptrichtung gegenüber einer Bezugsantenne, Polarisation ist die Richtung von $\\vec E$ und muss bei Sender und Empfänger übereinstimmen. Mit $g_i = g_d + 2{,}15$ dB wechselst du zwischen den Bezügen.[^bnetza-formelsammlung]`,
    },
  ],
  cards: [
    { id: 'rg-yagi', front: 'Aufbau der Yagi-Uda-Antenne', back: 'Strahler (gespeist), dahinter längerer Reflektor, davor kürzere Direktoren. Reflektor und Direktoren sind parasitär (nicht angeschlossen).' },
    { id: 'rg-speisung', front: 'An welchem Element der Yagi wird eingespeist?', back: 'Nur am Strahler (oft Faltdipol).' },
    { id: 'rg-keule', front: 'Strahlungsdiagramm der Richtantenne', back: 'Große Hauptkeule in Hauptstrahlrichtung, kleinere Rückkeule und evtl. Nebenkeulen. Mehr Elemente: höherer Gewinn, schmalere Keule.' },
    { id: 'rg-parabol', front: 'Parabolantenne für Mikrowellen: Aufbau und Durchmesser', back: 'Paraboloider Spiegelkörper plus Erregerantenne (Feed) im Brennpunkt; Durchmesser mindestens ca. fünf Wellenlängen.' },
    { id: 'rg-mikrowelle', front: 'Mikrowellen: Frequenzbereich', back: 'Etwa 1 GHz bis 300 GHz (Wellenlängen von mm bis wenigen dm).' },
    { id: 'rg-pol', front: 'Wodurch ist die Polarisation bestimmt?', back: 'Durch die Richtung des elektrischen Feldes ($\\vec E$) in der Hauptstrahlrichtung, bezogen auf die Erdoberfläche.' },
    { id: 'rg-polarten', front: 'Welche Polarisationen unterscheidet man?', back: 'Horizontal, vertikal, linkszirkular und rechtszirkular. Sende- und Empfangsantenne sollen gleich polarisiert sein (Verluste vermeiden).' },
    { id: 'rg-yagipol', front: 'Polarisation einer Yagi?', back: 'Stäbe waagerecht: horizontal. Stäbe senkrecht: vertikal (Richtung der Leiter = Richtung von $\\vec E$).' },
    { id: 'rg-dbi-dbd', front: 'dBi und dBd', back: 'dBi bezieht sich auf den Isotropstrahler (Kugel), dBd auf den Halbwellendipol.' },
    { id: 'rg-gi', front: 'Umrechnung dBd → dBi', back: '$g_i = g_d + 2{,}15$ dB. Beispiel: 5 dBd = 7,15 dBi. Dipol: 0 dBd = 2,15 dBi.' },
    { id: 'rg-passiv', front: 'Was bedeutet Antennengewinn bei einer passiven Antenne?', back: 'Bündelung: mehr Strahlung in Hauptrichtung, weniger in anderen. Keine zusätzliche Energie.' },
    { id: 'rg-faktor', front: 'Leistungsfaktor 2,15 dB?', back: '1,64 (Dipol gegenüber Kugelstrahler).' },
  ],
};
