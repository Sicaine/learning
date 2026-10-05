// Abbildungen: Zeichnungen aus dem amtlichen Prüfungsfragenkatalog (Bundesnetzagentur, Datenlizenz Deutschland – Namensnennung 2.0), hier als Anschauung zum Erkennen.
const F = id => `assets/data/afu/figures/${id}.svg`;
const grid = (items, min = 150, maxH = 190) => `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(${min}px,1fr));gap:12px;align-items:end">${items.map(([id, cap]) => `<figure style="margin:0;text-align:center"><img src="${F(id)}" alt="${cap}" loading="lazy" style="width:100%;max-height:${maxH}px;object-fit:contain;background:#fff;border:1px solid var(--line);border-radius:10px;padding:6px"><figcaption style="font-size:.82rem;color:var(--muted);margin-top:4px">${cap}</figcaption></figure>`).join('')}</div>`;

export default {
  id: 'dipol-und-rundstrahler',
  title: 'Dipol, Vertikal, Rundstrahler und Antennenformen',
  summary: 'Halbwellendipol, Groundplane, Marconi, Langdraht, Loops und End-Fed: wie sie aufgebaut sind, wohin sie strahlen und wofür man sie einsetzt.',
  minutes: 25,
  goals: [
    'Den [[halbwellendipol]] aufbauen und abstimmen: Länge aus der Wellenlänge, bei falscher [[antennenresonanz]] beide Enden gleichmäßig kürzen oder verlängern',
    '[[groundplane]], [[marconi-antenne]] und Up-and-Outer als Vertikalantennen mit [[radials]] erklären und als [[rundstrahler]] einordnen',
    'Ein [[strahlungsdiagramm]] lesen: Dipol (Acht, quer zum Draht), Groundplane (rundum), Richtantenne (eine Keule)',
    'Dipol, Faltdipol, Endgespeiste, Langdraht, Delta-Loop, Windom, Fuchs-Antenne und magnetische Ringantenne auseinanderhalten und passend zum Band wählen',
    'Symmetrische und unsymmetrische Antennen unterscheiden und die Schaltzeichen für Antenne und Erde erkennen',
  ],
  needs: ['elektrotechnik/wellen-felder-antennen-intro'],
  blocks: [
    {
      id: 'intro', type: 'text', title: 'Die Antenne: Wo aus Strom eine Welle wird',
      md: `
Die [[antenne|Antenne]] ist das Bauteil, das aus elektrischen Schwingungen eine [Funkwelle](wiki:Elektromagnetische Welle|Electromagnetic wave) macht und umgekehrt. Beim Senden fließt hochfrequenter Strom in der Antenne und erzeugt ein Feld, das sich ablöst und in die Ferne läuft. Beim Empfang regt die vorbeilaufende Welle in den Antennenleitern einen winzigen Strom an, den das Funkgerät verstärkt.[^darc-50ohm] Die Antennenleitung (Koaxkabel) bringt das Signal zwischen Funkgerät und Antenne; dazu mehr in den nächsten Lektionen.

Im Schaltplan stehen zwei Symbole, die du auf Anhieb erkennen musst: die **Antenne** (ein Dreieck auf einem Strich, das Dreieck steht auf der Spitze) und die **Erde** (ein senkrechter Strich auf drei waagerechten Strichen, die nach unten kürzer werden).

${grid([['NG101_q', 'Schaltzeichen: Antenne'], ['NG102_q', 'Schaltzeichen: Erde']], 120)}
`,
    },
    {
      id: 'mission-shack', type: 'callout', tone: 'mission', title: 'Funkpraxis: Deine erste Antenne',
      md: `Die erste Antenne vieler Funkamateure ist ein **Dipol aus zwei Drahtstücken** zwischen zwei Bäumen oder Masten, gespeist mit Koaxkabel, oder eine **Groundplane** auf dem Dach für 2 m und 70 cm. Beide sind billig, leicht nachzubauen und auch in der Prüfung allgegenwärtig. Wer sie versteht, versteht schon das Meiste von Antennentechnik.`,
    },
    {
      id: 'dipol', type: 'text', title: 'Der Halbwellendipol',
      md: `
Die Grundform aller Antennen ist der [Dipol](wiki:Dipolantenne|Dipole antenna) (griechisch: „Zweipol“). Er besteht aus zwei Leitern, meist Drähten oder Metallstäben. An das eine Teil wird ein Leiter des Antennenkabels angeschlossen, an das andere Teil der zweite Leiter, jeweils in der Mitte zwischen beiden Teilen. Auf [Heinrich Hertz](wiki:Heinrich Hertz|Heinrich Hertz) geht der erste experimentelle Dipol zurück.

Am verbreitetsten ist der **[[halbwellendipol|Halbwellendipol]]**: Seine Gesamtlänge ist eine halbe Wellenlänge, $\\lambda/2$. Die [Wellenlänge](wiki:Wellenlänge|Wavelength) folgt aus der Frequenz:

$$\\lambda[\\text{m}] \\approx \\frac{300}{f[\\text{MHz}]}$$

Für das 10-m-Band ist $\\lambda\\approx 10$ m, ein Halbwellendipol also etwa 5 m lang, jedes Teilstück etwa 2,5 m. Dann ist der Dipol in [[antennenresonanz|Resonanz]] (vgl. [Resonanz](wiki:Resonanz (Physik)|Resonance)) und gibt die Energie besonders gut ab oder nimmt sie auf. Ein zu langer oder zu kurzer Dipol funktioniert zunehmend schlechter.

Der echte Draht ist durch den **Verkürzungsfaktor** (mehr dazu in der übernächsten Lektion) etwas kürzer als die rechnerische halbe Wellenlänge, meist um etwa 5 %.

**Abstimmen:** Liegt die Resonanzfrequenz deines Dipols **unterhalb** der gewünschten Frequenz, ist er zu lang. Dann kürzt du **beide Enden gleichmäßig**. Liegt sie **oberhalb**, ist er zu kurz, und du verlängerst beide Seiten gleichmäßig. Die Sendeleistung ändert daran nichts. Merke: Länge und Frequenz verhalten sich umgekehrt, wie bei einer Geigen- und einer Kontrabasssaite: lange Saite, tiefer Ton; langer Dipol, tiefe Frequenz.
`,
    },
    {
      id: 'tipp-abstimmen', type: 'callout', tone: 'insight', title: 'Praxistipp: Erst zu lang, dann kürzen',
      md: `Ein Draht lässt sich leicht kürzen, aber schlecht verlängern. Deshalb schneidest du den Dipol zunächst etwas länger als berechnet zu und kürzt ihn dann schrittweise (mit dem SWR-Meter oder einem Analysator), bis die Resonanz auf deiner Wunschfrequenz liegt.`,
    },
    {
      id: 'demo-diagramm', type: 'viz', viz: 'strahlungsdiagramm', title: 'Strahlungsdiagramm-Explorer: Dipol und Groundplane',
      params: { ants: ['iso', 'dipH', 'dipV', 'gp'], ant: 'iso', goals: ['dip', 'gp', 'dipV'] },
      intro: 'Das Diagramm zeigt, wie stark eine Antenne in welche Richtung strahlt. Wähle Antennen aus und wechsle zwischen **Draufsicht** (waagerechter Schnitt) und **Seitenansicht** (senkrechter Schnitt). Der gestrichelte Kreis ist der [Kugelstrahler](wiki:Isotropstrahler|Isotropic radiator), der in alle Richtungen gleich strahlt.',
      task: 'Finde drei Dinge heraus: Wohin strahlt der waagerechte Dipol in der Draufsicht? Wie sieht die Groundplane von der Seite aus? Und wie strahlt ein senkrechter Dipol?',
    },
    {
      id: 'diagramm-lesen', type: 'text', title: 'Strahlungsdiagramme lesen',
      md: `
Ein [Strahlungsdiagramm](wiki:Antennendiagramm|Radiation pattern) (Richtdiagramm) zeigt für **eine Ebene**, wie stark die Antenne in jede Richtung abstrahlt. Je weiter die Kurve vom Mittelpunkt entfernt ist, desto größer sind Feldstärke oder Strahlungsleistung in dieser Richtung. Fehlt eine Winkelskala, zeichnet man die Antenne mit ein, damit klar ist, welche Richtung welcher entspricht.

Drei Regeln beantworten die meisten Diagrammfragen:

1. **Ein Dipol strahlt nicht in Richtung seines Drahtes, sondern quer dazu.** Das Diagramm zeigt zwei Keulen, eine auf jeder Seite des Drahtes, wie eine liegende Acht; in Drahtrichtung ist es **null**. Ein senkrecht hängender Dipol strahlt also nach links, rechts, vorn und hinten, aber nicht nach oben oder unten. In einer Ebene betrachtet sehen die Keulen je nach Skala fast kreisförmig aus.
2. **Eine Groundplane strahlt von oben gesehen fast gleichmäßig in alle Himmelsrichtungen** (leicht verbeult durch die Radials), aber nicht nach oben oder unten: ein Rundstrahler.
3. **Eine Richtantenne** hat eine große Hauptkeule in einer Richtung und eine deutlich kleinere Rückkeule. Sie wird auf die Gegenstation ausgerichtet.

${grid([['EG214_a', 'Halbwellendipol (Draht senkrecht): Keulen quer zum Draht'], ['EG216_q', 'Groundplane von oben: fast ein Kreis'], ['EG217_q', 'Richtantenne: Hauptkeule und kleine Rückkeule']], 200)}
`,
    },
    {
      id: 'warn-diagramm', type: 'callout', tone: 'warning', title: 'Typischer Denkfehler: Ein Dipol strahlt nicht „aus den Enden“',
      md: `Aus dem Bild vom Draht schließen viele Lerner, die Welle laufe in Drahtrichtung davon. Das ist falsch: **In Verlängerung des Drahtes ist ein Dipol ein Funkloch.** Die größte Abstrahlung liegt quer zum Draht. Das bestimmt, wie du ihn aufhängst: Ein waagerechter Draht in Ost-West-Richtung strahlt hauptsächlich nach Norden und Süden (und nach oben). Ein senkrechter Draht (λ/2-Vertikalantenne) strahlt flach, also unter einem niedrigen Abstrahlwinkel, was für Weitverbindungen (DX) gut ist. Prüfungsbezug: EG214, EG215, EG219.`,
    },
    {
      id: 'vertikal', type: 'text', title: 'Vertikalantennen: Up-and-Outer, Groundplane, Marconi',
      md: `
Lässt du einen Teil des Dipols **senkrecht nach oben** zeigen und den anderen **waagerecht** (parallel zum Boden), entsteht die „Up-and-Outer“-Antenne. Den senkrechten Teil nennt man **Strahler**, den waagerechten **Radial** oder **Gegengewicht**. Beide sind je $\\lambda/4$ lang, zusammen also $\\lambda/2$ wie beim Dipol.

Vervielfacht man das Radial (drei, vier oder mehr Drähte rund um den Fuß des Strahlers), entsteht die [[groundplane|Groundplane-Antenne]] ([Groundplane](wiki:Groundplane-Antenne|Monopole antenna)): ein $\\lambda/4$-Strahler mit mehreren Gegengewichten, den **[[radials|Radials]]** (nicht „Reflektoren“, nicht „Direktoren“; das sind Elemente der Yagi). Sie ist im Amateurfunk sehr häufig.

Ersetzt man die Radials durch den **Erdboden**, entsteht die [[marconi-antenne|Marconi-Antenne]] ([Monopol](wiki:Monopolantenne|Monopole antenna) nach Guglielmo Marconi): eine **gegen Erde erregte $\\lambda/4$-Vertikalantenne**. Der Boden bildet im Idealfall das zweite Dipolteil. Für die Erde gibt es in Schaltplänen das eigene Symbol. In der Praxis ist eine gute Erdverbindung für Hochfrequenz oft schwierig; ein Erdnagel oder viele vergrabene Drähte helfen. Auch das Autodach dient bei der Magnetfußantenne als Gegengewicht.

Groundplane und Marconi strahlen rundum gleichmäßig: **[[rundstrahler|Rundstrahler]]**. Sie eignen sich dort, wo du viele Stationen in verschiedenen Richtungen erreichen willst, zum Beispiel für eine **2-m-QSO-Runde** mit Funkamateuren in der Umgebung oder für mehrere **Relaisfunkstellen** im 2-m- und 70-cm-Band. Eine Richtantenne müsste dafür ständig neu gedreht werden. Damit ein Rundstrahler gut funktioniert, soll er **hoch und rundherum frei** stehen: auf dem Hausdach oder einem Mast, nicht auf dem Dachboden oder der Fensterbank.

Die **5/8-$\\lambda$-Antenne** ist eine Vertikalantenne, deren Strahler 0,625 $\\lambda$ lang ist. Sie bündelt mehr Strahlung zum Horizont, strahlt weniger nach oben und hat deshalb **mehr Gewinn** als die $\\lambda/4$-Antenne. Das ist der Grund, sie für den VHF/UHF-Mobilbetrieb zu verwenden. Sie verträgt nicht mehr Leistung und ist nicht leichter zu montieren; sie strahlt einfach besser dorthin, wo die Gegenstation ist.

${grid([['NG105_q', 'Groundplane: Strahler mit sechs Radials'], ['NG102_q', 'Erde: Gegengewicht der Marconi-Antenne']], 160)}
`,
    },
    {
      id: 'warn-radials', type: 'callout', tone: 'warning', title: 'Verwechslungen: Radials, Marconi, 5/8 λ',
      md: `**Radials** sind elektrische Gegengewichte der Groundplane, keine Reflektoren und keine Direktoren (die gibt es nur an der Yagi-Antenne). **Marconi** bedeutet gegen Erde erregt und $\\lambda/4$ lang, nicht „5/8 $\\lambda$ mit abgestimmten Radials“, nicht „horizontale Halbwellen-Langdraht“ und nicht „vertikale Halbwellenantenne“. Der Vorteil der 5/8-Antenne ist der **Gewinn**, nicht die Leistungsfestigkeit. Prüfungsbezug: NG104, NG106, EG108.`,
    },
    {
      id: 'sym', type: 'text', title: 'Symmetrisch oder unsymmetrisch?',
      md: `
Eine **[[symmetrische-antenne|symmetrische Antenne]]** hat an ihren beiden Anschlusspunkten im Idealfall bis auf das Vorzeichen die gleiche Spannung gegen Erde. Das gilt für den mittengespeisten Halbwellendipol, den Faltdipol und die darauf aufbauenden Yagi-Antennen. Die **Groundplane** hat dagegen am Anschlusspunkt der Radials Erdpotential (null Volt gegen Erde): Sie ist **nicht symmetrisch**. Ein Koaxkabel ist ebenfalls unsymmetrisch (nur der Innenleiter führt Spannung gegen Erde). Wie man beides verbindet, steht in der Lektion über Mantelwellen und Balun.
`,
    },
    {
      id: 'kw-antennen', type: 'text', title: 'Drahtantennen für die Kurzwelle',
      md: `
Auf Kurzwelle sind die Wellenlängen lang (80 m im 80-m-Band!), deshalb bestehen die Antennen meist aus Draht, der zwischen Bäumen oder Masten gespannt wird. Die wichtigsten Formen:

- **Dipol:** zwei gleich lange Drähte, mittig gespeist, symmetrisch. Der Klassiker für 80 m und 40 m.
- **[[faltdipol|Faltdipol]]:** ein zu einer langen schmalen Schleife gefalteter Draht, insgesamt etwa eine Wellenlänge Draht; später wichtig als Strahler der Yagi.
- **[[endgespeiste-antenne|Endgespeiste Antenne]] (End-Fed):** wird am Drahtende gespeist; dort liegt ein Spannungsbauch, deshalb braucht sie ein **Anpassglied**. Wird der Halbwellendraht mit einem Parallelschwingkreis, dem **Fuchskreis**, angepasst, heißt sie [[fuchs-antenne|Fuchs-Antenne]] (nach Josef Fuchs, der sie 1927 patentieren ließ). Ist der Draht **länger als eine Wellenlänge**, spricht man von einer **[[langdrahtantenne|Langdraht-Antenne]]**; die verwendet man nur im Kurzwellenbereich, nicht im VHF/UHF-Bereich.
- **Windom-Antenne:** ein Dipol, dessen Speisepunkt nicht in der Mitte liegt und der sich deshalb für mehrere Bänder eignet.
- **[[w3dzz|W3DZZ]]:** ein Dipol mit Sperrkreisen (Traps) für mehrere Bänder, besonders 80 m und 40 m.
- **[[delta-loop|Delta-Loop]]:** eine Ganzwellen-**Schleifenantenne** ([Loop](wiki:Rahmenantenne|Loop antenna)) in Form eines **Dreiecks** aus drei gleich langen Drahtstücken, Umfang etwa $\\lambda$. Auf die genaue Form kommt es nicht an: Kreis, Quadrat („Quad“) und Dreieck funktionieren ähnlich.
- **[[magnetische-ringantenne|Magnetische Ringantenne]] (Magnetic Loop):** eine kleine Schleife (Umfang etwa $\\lambda/10$) mit starkem **magnetischem Nahfeld**. Sie ist für den Sendebetrieb geeignet, hat aber einen kleinen Wirkungsgrad (1 bis 10 %). Dafür ist sie kompakt und stört sich weniger an Mauern oder Dachziegeln. **Nicht** zu verwechseln mit der Ferritstabantenne, die nur zum Empfang taugt, und nicht mit der Cubical Quad.

Für das **80-m-Band** eignen sich also **Dipol, Delta-Loop und W3DZZ**. [Yagi-Uda-Antennen](wiki:Yagi-Uda-Antenne|Yagi–Uda antenna) mit mehreren Elementen, [Parabolspiegel](wiki:Parabolspiegel|Parabolic reflector), Sperrtopfantenne und Kreuz-Yagi wären bei 80 m Wellenlänge riesig und unhandlich. Yagi, Quad und Groundplane gibt es dagegen auch bei VHF/UHF; Parabolspiegel, Horn-, Schlitz- und Patchantennen gehören in den Mikrowellenbereich.

${grid([['NG103_q', 'Dipol (λ/2, mittig gespeist)'], ['NG107_q', 'Endgespeiste Antenne mit Anpassglied'], ['EG104_q', 'Fuchs-Antenne: Parallelschwingkreis am Drahtende']], 170)}
`,
    },
    {
      id: 'demo-katalog', type: 'viz', viz: 'antennen-katalog', title: 'Antennenformen-Katalog und Erkennungs-Trainer',
      intro: 'Tippe dich im **Katalog** durch alle Bauformen, dann wechsle zu **Erkennen** und benenne die Skizzen.',
      task: 'Sieh dir alle Antennenformen im Katalog an und erkenne dann sechs Skizzen in Folge richtig.',
    },
    {
      id: 'video', type: 'video', youtube: 'Oe2XpzhSVEQ', label: 'Lektion 08 – Antennen und Leitungen', channel: 'DL2YMR',
      why: 'Der Videolehrgang für die Klasse N hat ein eigenes Kapitel zu Antennen und Leitungen; als Wiederholung der Grundformen gut geeignet.',
    },
    {
      id: 'q-diagramm', type: 'quiz', title: 'Wohin strahlt der Dipol?',
      question: 'Ein waagerechter Halbwellendipol ist in **Ost-West-Richtung** gespannt. In welchen Richtungen empfängst und sendest du in der Draufsicht am besten?',
      options: [
        { text: 'Nach Norden und Süden (quer zum Draht).', correct: true, why: 'Die Hauptkeulen stehen senkrecht zum Draht; in Drahtrichtung (Ost und West) liegen die Nullstellen.' },
        { text: 'Nach Osten und Westen (in Richtung der Drahtenden).', why: 'Genau umgekehrt: In Verlängerung des Drahtes strahlt ein Dipol nicht.' },
        { text: 'Gleichmäßig in alle Richtungen.', why: 'Das tut ein Rundstrahler wie die Groundplane (oder ein senkrechter Strahler von oben gesehen), nicht der Dipol.' },
        { text: 'Nur nach unten zum Boden.', why: 'Der waagerechte Dipol strahlt quer zum Draht, also auch nach oben, und nie nur nach unten.' },
      ],
    },
    {
      id: 'q-rundstrahler', type: 'quiz', title: 'Welche Antenne für welchen Zweck?',
      question: 'Du möchtest vom Dach aus im 70-cm-Band mit drei Relaisfunkstellen in drei verschiedenen Richtungen arbeiten, ohne eine Antenne zu drehen. Welche Wahl passt?',
      options: [
        { text: 'Eine Groundplane (Rundstrahler) frei auf dem Dach.', correct: true, why: 'Rundum gleichmäßig und frei aufgestellt erreicht sie alle Relais.' },
        { text: 'Eine fest montierte 5-Element-Yagi, die nach Süden zeigt.', why: 'Eine Richtantenne bündelt in eine Richtung; die Relais in anderen Richtungen verlieren stark.' },
        { text: 'Eine Ferritstabantenne auf der Fensterbank.', why: 'Die Ferritstabantenne ist eine Empfangsantenne und steht hier schlecht.' },
        { text: 'Ein 80-m-Dipol im Garten.', why: 'Der 80-m-Dipol ist für ein ganz anderes Band abgestimmt und wäre für 70 cm nutzlos.' },
      ],
    },
    {
      id: 'num-dipol', type: 'numeric', title: 'Dipol für 14,2 MHz zuschneiden',
      question: 'Wie lang ist die **Gesamtlänge** eines Halbwellendipols für 14,2 MHz, wenn der Draht mit dem Verkürzungsfaktor 0,95 berechnet wird? Rechne mit $\\lambda[\\text{m}]\\approx 300/f[\\text{MHz}]$.',
      answer: 10.03, tolerance: 0.2, unit: 'm',
      hint: 'Erst die Wellenlänge, dann die Hälfte, dann mal 0,95. Jedes Teilstück ist die halbe Gesamtlänge.',
      explain: '$\\lambda = 300/14{,}2 = 21{,}13$ m; $\\lambda/2 = 10{,}56$ m; mal 0,95 ergibt rund 10,0 m Gesamtlänge, also etwa 5,0 m je Seite.',
    },
    {
      id: 'order-abstimmen', type: 'order', title: 'Dipol abstimmen',
      prompt: 'Bringe die Schritte beim Abstimmen eines selbstgebauten Dipols in die sinnvolle Reihenfolge.',
      items: [
        'Wellenlänge aus der Wunschfrequenz berechnen und die halbe Länge (mit Verkürzungsfaktor) bestimmen',
        'Den Draht etwas länger als berechnet zuschneiden und aufhängen',
        'Die Resonanzfrequenz messen (SWR-Meter oder Analysator)',
        'Liegt die Resonanz zu tief, beide Enden gleichmäßig um ein kleines Stück kürzen',
        'Erneut messen und wiederholen, bis die Resonanz auf der Wunschfrequenz liegt',
      ],
      explain: 'Ein zu langer Draht hat eine zu tiefe Resonanzfrequenz; kürzen hebt sie an. Messen, kürzen, messen: die Sendeleistung ändert nichts an der Resonanz.',
    },
    {
      id: 'match-formen', type: 'match', title: 'Antenne und Merkmal',
      prompt: 'Ordne jeder Antennenform das typische Merkmal zu.',
      pairs: [
        ['Marconi-Antenne', 'gegen Erde erregte λ/4-Vertikalantenne'],
        ['Groundplane', 'λ/4-Strahler mit Radials, Rundstrahler'],
        ['Delta-Loop', 'Ganzwellen-Schleife aus drei gleich langen Drahtstücken'],
        ['Fuchs-Antenne', 'endgespeister Halbwellendraht mit Parallelschwingkreis'],
        ['Langdraht-Antenne', 'endgespeister Draht länger als λ, nur Kurzwelle'],
        ['Magnetische Ringantenne', 'Umfang etwa λ/10, starkes magnetisches Nahfeld'],
      ],
    },
    {
      id: 'recall-dipol', type: 'recall', title: 'In eigenen Worten',
      prompt: 'Dein selbstgebauter 40-m-Dipol ist bei 6,9 MHz resonant, du möchtest aber auf 7,1 MHz funken. Was machst du, und warum? Wie ist sein Strahlungsdiagramm, wenn der Draht von Ost nach West verläuft?',
      answer: 'Die Resonanzfrequenz liegt unterhalb der Wunschfrequenz, also ist der Dipol zu lang. Ich kürze beide Enden gleichmäßig um ein kleines Stück (Länge und Frequenz verhalten sich umgekehrt) und messe nach, bis die Resonanz bei 7,1 MHz liegt. Die Sendeleistung ändert daran nichts. Der Dipol strahlt quer zum Draht: Hauptkeulen nach Norden und Süden (eine liegende Acht), in Drahtrichtung (Ost, West) liegen die Nullstellen.',
      cards: ['dip-abstimmen', 'dip-diagramm'],
    },
    {
      id: 'wrap', type: 'callout', tone: 'fact', title: 'Zum Mitnehmen',
      md: `Jede Antenne besteht im Kern aus zwei Teilen: einem Strahler und einem Gegenstück (zweiter Dipolarm, Radials, Erde, Fahrzeugdach). Wer fragt „Was ist das zweite Teil?“, versteht Dipol, Groundplane, Marconi und End-Fed auf einmal. Die Bauform legt fest, wohin die Antenne strahlt und welchen Fußpunktwiderstand sie hat (nächste Lektionen).[^bnetza-fragenkatalog]`,
    },
  ],
  cards: [
    { id: 'dip-laenge', front: 'Gesamtlänge des Halbwellendipols?', back: '$\\lambda/2$ (mit Verkürzungsfaktor etwa 5 % weniger). 10-m-Band: etwa 5 m, jedes Teilstück etwa 2,5 m.' },
    { id: 'dip-abstimmen', front: 'Dipol ist unterhalb der Wunschfrequenz resonant. Was tun?', back: 'Er ist zu lang: beide Enden gleichmäßig kürzen. Bei zu hoher Resonanz beide Enden gleichmäßig verlängern. Sendeleistung ändern hilft nicht.' },
    { id: 'dip-diagramm', front: 'Wohin strahlt ein Halbwellendipol?', back: 'Quer zum Draht (liegende Acht), nicht in Drahtrichtung. Ein senkrechter Dipol strahlt flach, nicht nach oben oder unten.' },
    { id: 'dip-radials', front: 'Radials sind …', back: 'die elektrischen Gegengewichte (Gegengewichtsdrähte) der Groundplane-Antenne, nicht Reflektoren oder Direktoren.' },
    { id: 'dip-marconi', front: 'Marconi-Antenne', back: 'Gegen Erde erregte $\\lambda/4$-Vertikalantenne; der Erdboden ersetzt das zweite Dipolteil.' },
    { id: 'dip-rund', front: 'Rundstrahler: Beispiele und Einsatz', back: 'Groundplane und Marconi; frei und hoch aufstellen (Dach, Mast); ideal für 2-m-Runde und viele Relais im 2-m- und 70-cm-Band.' },
    { id: 'dip-58', front: '5/8-λ-Vertikalantenne: Vorteil gegenüber λ/4?', back: 'Mehr Gewinn (flachere Abstrahlung, mehr Leistung zum Horizont), z. B. im VHF/UHF-Mobilbetrieb. Nicht mehr Leistungsfestigkeit.' },
    { id: 'dip-delta', front: 'Delta-Loop', back: 'Ganzwellen-Schleife als Dreieck aus drei gleich langen Drahtstücken, Umfang etwa $\\lambda$; KW-Antenne.' },
    { id: 'dip-langdraht', front: 'Langdraht-Antenne', back: 'Endgespeister Draht länger als $\\lambda$; nur im Kurzwellenbereich, nicht auf VHF/UHF.' },
    { id: 'dip-fuchs', front: 'Fuchs-Antenne', back: 'Endgespeister Halbwellendraht mit Parallelschwingkreis (Fuchskreis) als Anpassglied.' },
    { id: 'dip-magloop', front: 'Magnetische Ringantenne (Magnetic Loop)', back: 'Umfang etwa $\\lambda/10$, starkes magnetisches Nahfeld, Sendebetrieb möglich, Wirkungsgrad nur 1 bis 10 %.' },
    { id: 'dip-sym', front: 'Welche Antenne ist nicht symmetrisch?', back: 'Die Groundplane (Erdpotential am Anschlusspunkt der Radials). Symmetrisch: Dipol, Faltdipol, Yagi.' },
    { id: 'dip-80m', front: 'Antennen für das 80-m-Band', back: 'Dipol, Delta-Loop, W3DZZ. Parabolspiegel, Kreuz-Yagi und Sperrtopf sind bei 80 m Wellenlänge unhandlich.' },
  ],
};
