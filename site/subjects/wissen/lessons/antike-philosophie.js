export default {
  id: 'antike-philosophie',
  title: 'Antike Philosophie',
  summary: 'Im antiken Griechenland begannen Menschen, die Welt nicht mehr mit Mythen, sondern mit Vernunft zu erklären. Sokrates, Platon und Aristoteles prägen unser Denken bis heute.',
  minutes: 22,
  goals: [
    'Den Übergang „vom Mythos zum Logos“ und die Vorsokratiker erklären',
    'Sokrates, Platon und Aristoteles unterscheiden: Lehrer, Schüler, Kernideen',
    'Das [[hoehlengleichnis|Höhlengleichnis]] nacherzählen und deuten',
    '[[stoa|Stoa]] und [[epikureismus|Epikureismus]] als Lebenskunst-Philosophien vergleichen',
  ],
  blocks: [
    {
      id: 'logos', type: 'text', title: 'Vom Mythos zum Logos',
      md: `
Um 600 v. Chr. fragten Denker in den griechischen Städten Kleinasiens: Woraus besteht alles? Statt auf Götter verwiesen sie auf Naturprinzipien. **[Thales von Milet](wiki:Thales von Milet|Thales of Miletus)** hielt das **Wasser** für den Urstoff; **[Heraklit](wiki:Heraklit|Heraclitus)** betonte den ständigen Wandel („Alles fließt“, *panta rhei* — so wird er zumindest zusammengefasst); **[Pythagoras](wiki:Pythagoras|Pythagoras)** suchte die Ordnung der Welt in **Zahlen**; **[Demokrit](wiki:Demokrit|Democritus)** vermutete, alles bestehe aus unteilbaren **Atomen**.

Weil sie vor [Sokrates](wiki:Sokrates|Socrates) lebten, nennt man sie die **[Vorsokratiker](wiki:Vorsokratiker|Pre-Socratic philosophy)**. Ihr Schritt „vom Mythos zum Logos“ — von der Erzählung zur vernünftigen Begründung — gilt als Geburtsstunde von Philosophie und Wissenschaft.`,
    },
    {
      id: 'map-denker-antike', type: 'map', title: 'Wo die Philosophie entstand',
      view: [17, 33, 38, 43],
      layers: { cities: false, countryLabels: false, mountains: false },
      places: [
        { name: 'Athen', pos: 'l', detail: `**[Athen](wiki:Athen|Athens)** — Wirkungsstätte von [Sokrates](wiki:Sokrates|Socrates), [Platon](wiki:Platon|Plato) (Akademie), [Aristoteles](wiki:Aristoteles|Aristotle) (Lykeion), [Epikur](wiki:Epikur|Epicurus) und [Zenon](wiki:Zenon von Kition|Zeno of Citium).` },
        { name: 'Ephesos', pos: 'r', detail: `**[Ephesos](wiki:Ephesos|Ephesus)** — Heimat des [Heraklit](wiki:Heraklit|Heraclitus) („Alles fließt“).` },
      ],
      points: [
        { lon: 27.276, lat: 37.531, label: 'Milet', pos: 'b', detail: `**[Milet](wiki:Milet|Miletus)** — Heimat des [Thales](wiki:Thales von Milet|Thales of Miletus), des „ersten Philosophen“.` },
        { lon: 26.833, lat: 37.733, label: 'Samos', pos: 'l', detail: `**[Samos](wiki:Samos|Samos)** — die Insel, von der [Pythagoras](wiki:Pythagoras|Pythagoras) stammte.` },
        { lon: 24.967, lat: 40.933, label: 'Abdera', pos: 'r', detail: `**[Abdera](wiki:Abdera|Abdera, Thrace)** — Heimat des [Demokrit](wiki:Demokrit|Democritus), der die Atomlehre entwickelte.` },
        { lon: 23.794, lat: 40.591, label: 'Stageira', pos: 'r', detail: `**[Stageira](wiki:Stageira|Stagira (ancient city))** — Geburtsort des Aristoteles (384 v. Chr.).` },
        { lon: 35.151, lat: 42.027, label: 'Sinope', pos: 'l', detail: `**[Sinope](wiki:Sinop|Sinop, Turkey)** — Heimat des [Diogenes](wiki:Diogenes von Sinope|Diogenes), des Kynikers in der Tonne.` },
        { lon: 33.631, lat: 34.919, label: 'Kition (Larnaka)', pos: 't', detail: `**Kition** (heute [Larnaka](wiki:Larnaka|Larnaca) auf Zypern) — Heimat Zenons, des Begründers der Stoa.` },
      ],
      caption: 'Die ersten Philosophen lebten an der Küste Kleinasiens; ab dem 5. Jahrhundert v. Chr. wurde Athen zum Zentrum.',
    },
    {
      id: 'sokrates', type: 'text', title: 'Sokrates: Ich weiß, dass ich nichts weiß',
      md: `
**Sokrates** (469–399 v. Chr.) schrieb kein einziges Buch. Wir kennen ihn vor allem aus den Dialogen seines Schülers [Platon](wiki:Platon|Plato). Auf dem Marktplatz Athens verwickelte er Menschen in Gespräche und fragte so lange nach („Was ist Gerechtigkeit? Was ist Tapferkeit?“), bis scheinbares Wissen zusammenbrach. Sein Ziel war es, die Gesprächspartner selbst zur Einsicht zu führen — er verglich das mit der Arbeit seiner Mutter, einer Hebamme: **[[sokratische-methode|Mäeutik]]**, „Hebammenkunst“.

Bekannt ist die (verkürzte) Formel „**Ich weiß, dass ich nichts weiß**“: Weise ist, wer die Grenzen des eigenen Wissens kennt. 399 v. Chr. wurde Sokrates wegen Gottlosigkeit und „Verführung der Jugend“ zum Tod verurteilt. Er lehnte die Flucht ab und trank den **[Schierlingsbecher](wiki:Schierlingsbecher)**.[^sep-socrates]`,
    },
    {
      id: 'platon', type: 'text', title: 'Platon: die Welt der Ideen',
      md: `
**Platon** (428/427–348/347 v. Chr.) gründete um 387 v. Chr. in Athen die **[Akademie](wiki:Platonische Akademie|Platonic Academy)** — daher unser Wort. Er schrieb seine Philosophie als Dialoge, meist mit Sokrates als Hauptfigur.

Seine **[[platon-ideenlehre|Ideenlehre]]**: Die Dinge, die wir sehen, sind vergänglich und unvollkommen. Wirklich und ewig sind nur die **Ideen** — etwa die Idee des Guten, des Schönen, des Kreises. Jeder gezeichnete Kreis ist nur ein unvollkommenes Abbild des perfekten Kreises, den wir mit dem Verstand erfassen.

In seinem Hauptwerk, der **[Politeia](wiki:Politeia|Republic (Plato))** („Der Staat“), entwirft er einen gerechten Staat, in dem **Philosophen herrschen** sollen — weil nur sie das Gute wirklich erkennen.[^sep-plato]`,
    },
    {
      id: 'hoehle', type: 'callout', tone: 'insight', title: 'Das Höhlengleichnis',
      md: `Menschen sitzen seit ihrer Kindheit gefesselt in einer Höhle und blicken auf eine Wand. Hinter ihnen brennt ein Feuer, vor dem Gegenstände vorbeigetragen werden. Die Gefangenen sehen nur deren **Schatten** — und halten sie für die Wirklichkeit. Einer wird befreit, steigt mühsam ans Tageslicht und erkennt schließlich die Sonne. Kehrt er zurück und erzählt davon, lachen ihn die anderen aus oder wollen ihn sogar töten.

**Deutung:** Die Schatten sind die Sinneswelt, die Sonne ist die Idee des Guten; der Aufstieg ist die philosophische Bildung. Die Anspielung auf das Schicksal des Sokrates ist kein Zufall.`,
    },
    {
      id: 'aristoteles', type: 'text', title: 'Aristoteles: der Universalgelehrte',
      md: `
**[Aristoteles](wiki:Aristoteles|Aristotle)** (384–322 v. Chr.) war zwanzig Jahre Platons Schüler — und widersprach ihm: Die Formen der Dinge existieren nicht in einer eigenen Ideenwelt, sondern **in den Dingen selbst**. Man erkennt sie durch **Beobachtung**. Aristoteles erforschte Tiere, Staaten, Sprache und Sterne; er war zudem Lehrer des jungen **[Alexander des Großen](wiki:Alexander der Große|Alexander the Great)** und gründete in Athen eine eigene Schule, das *[Lykeion](wiki:Lykeion|Lyceum (classical))*.[^sep-aristotle]

- **Logik:** Er entwickelte die Lehre vom gültigen Schluss ([Syllogismus](wiki:Syllogismus|Syllogism)): „Alle Menschen sind sterblich. Sokrates ist ein Mensch. Also ist Sokrates sterblich.“
- **Ethik:** Ziel des Lebens ist die **Glückseligkeit** (*eudaimonia*). Tugend ist die richtige **Mitte** zwischen zwei Extremen — Tapferkeit liegt zwischen Feigheit und Tollkühnheit.
- **Politik:** Der Mensch ist ein *zoon politikon*, ein Gemeinschaftswesen.

Im Mittelalter nannte man Aristoteles einfach „den Philosophen“; **[Thomas von Aquin](wiki:Thomas von Aquin|Thomas Aquinas)** verband seine Lehre mit dem christlichen Glauben.`,
    },
    {
      id: 'schulen', type: 'text', title: 'Philosophie als Lebenskunst: Stoa und Epikur',
      md: `
Nach Alexander fragten Philosophen vor allem: **Wie lebe ich gut?**

Die **[[stoa|Stoa]]**, gegründet von **[Zenon von Kition](wiki:Zenon von Kition|Zeno of Citium)** um 300 v. Chr. in einer Säulenhalle (*stoa*) Athens, lehrte: Unterscheide zwischen dem, was in deiner Macht steht, und dem, was nicht. Nimm Letzteres gelassen hin. Später prägten die Römer **[Seneca](wiki:Seneca|Seneca the Younger)**, der frühere Sklave **[Epiktet](wiki:Epiktet|Epictetus)** und Kaiser **[Marc Aurel](wiki:Marc Aurel|Marcus Aurelius)** die [Stoa](wiki:Stoa|Stoicism). Unser Wort „stoisch“ für unerschütterliche Ruhe stammt daher.[^sep-stoicism]

**[Epikur](wiki:Epikur|Epicurus)** (341–270 v. Chr.) sah im Glück das höchste Ziel — aber nicht in Völlerei, sondern in **Seelenruhe** (*ataraxia*) und der Abwesenheit von Schmerz: einfache Freuden, Freundschaft, keine Angst vor Göttern oder dem Tod. Der Vorwurf, [[epikureismus|Epikureer]] seien Genießer ohne Maß, ist ein altes Missverständnis.

Sprichwörtlich wurde auch **[Diogenes](wiki:Diogenes von Sinope|Diogenes)** von Sinope, ein *[Kyniker](wiki:Kynismus|Cynicism (philosophy))*, der der Legende nach in einem Fass lebte und Alexander den Großen bat, ihm „aus der Sonne zu gehen“.`,
    },
    {
      id: 'map-quiz-denker', type: 'map', title: 'Finde die Heimatorte der Denker',
      view: [17, 33, 38, 43],
      layers: { cities: false, countryLabels: false, mountains: false },
      quiz: { rounds: 7 },
      places: [{ name: 'Athen' }, { name: 'Ephesos' }],
      points: [{ lon: 27.276, lat: 37.531, label: 'Milet' }, { lon: 26.833, lat: 37.733, label: 'Samos' }, { lon: 24.967, lat: 40.933, label: 'Abdera' }, { lon: 23.794, lat: 40.591, label: 'Stageira' }, { lon: 35.151, lat: 42.027, label: 'Sinope' }],
    },
    {
      id: 'order-lehrer', type: 'order', title: 'Lehrer und Schüler',
      prompt: 'Bringe die Denker in ihre Lehrer-Schüler-Reihenfolge (vom ältesten zum jüngsten).',
      items: ['Sokrates', 'Platon', 'Aristoteles', 'Alexander der Große'],
      explain: 'Sokrates lehrte Platon, Platon lehrte Aristoteles, Aristoteles unterrichtete Alexander — eine der berühmtesten Lehrer-Schüler-Ketten der Geschichte.',
    },
    {
      id: 'match-ideen', type: 'match', title: 'Wer dachte was?',
      pairs: [
        ['Thales', 'Wasser als Urstoff'],
        ['Demokrit', 'Atome'],
        ['Sokrates', 'Hebammenkunst im Dialog'],
        ['Platon', 'Ideenlehre, Höhlengleichnis'],
        ['Aristoteles', 'Tugend als Mitte, Logik'],
        ['Epikur', 'Glück als Seelenruhe'],
      ],
    },
    {
      id: 'quiz-hoehle', type: 'quiz', title: 'Das Höhlengleichnis verstehen',
      question: 'Wofür stehen im Höhlengleichnis die Schatten an der Wand?',
      options: [
        { text: 'Für die Welt der Sinneswahrnehmung, die wir für die ganze Wirklichkeit halten', correct: true, why: 'Nach Platon sehen wir nur Abbilder; die wahre Wirklichkeit sind die Ideen.' },
        { text: 'Für die Götter des Olymp', correct: false, why: 'Das Gleichnis handelt von Erkenntnis, nicht von Mythologie.' },
        { text: 'Für die Ideen', correct: false, why: 'Die Ideen liegen außerhalb der Höhle; die Sonne steht für die Idee des Guten.' },
        { text: 'Für die Philosophen', correct: false, why: 'Der Philosoph ist der Befreite, der die Höhle verlässt.' },
      ],
    },
    {
      id: 'quiz-mitte', type: 'quiz', title: 'Aristoteles’ Tugendethik',
      question: 'Nach Aristoteles ist Tapferkeit die Mitte zwischen …',
      options: [
        { text: 'Feigheit und Tollkühnheit', correct: true, why: 'Zu wenig Mut ist Feigheit, zu viel Tollkühnheit.' },
        { text: 'Angst und Freude', correct: false, why: 'Das sind Gefühle, keine Extreme einer Haltung.' },
        { text: 'Weisheit und Dummheit', correct: false, why: 'Weisheit ist selbst eine Tugend, kein Extrem.' },
        { text: 'Krieg und Frieden', correct: false, why: 'Die Mitte bezieht sich auf Charakterhaltungen.' },
      ],
    },
    {
      id: 'recall-platon-ari', type: 'recall', title: 'Platon gegen Aristoteles',
      prompt: 'Worin unterscheiden sich Platon und Aristoteles grundlegend? Erkläre es in 2–3 Sätzen, gern mit einem Beispiel.',
      answer: `**Platon** sieht die wahre Wirklichkeit in einer eigenen Welt ewiger **Ideen**; die sichtbaren Dinge sind nur unvollkommene Abbilder, die Sinne täuschen eher. **Aristoteles** verlegt die Formen **in die Dinge selbst** und vertraut auf **Beobachtung** und Erfahrung. Beispiel: Für Platon existiert „das Pferdsein“ unabhängig von allen Pferden; für Aristoteles erkennt man es, indem man viele wirkliche Pferde untersucht. (Raffaels Fresko „Die Schule von Athen“ zeigt Platon mit dem Finger nach oben, Aristoteles mit der Hand zur Erde.)`,
      cards: ['ideenlehre', 'aristoteles-empirie'],
    },
  ],
  cards: [
    { id: 'mythos-logos', front: 'Was meint „vom Mythos zum Logos“?', back: 'Den Übergang von mythischen Erklärungen zu vernünftiger Begründung — Beginn der Philosophie (um 600 v. Chr.).' },
    { id: 'thales', front: 'Was hielt Thales von Milet für den Urstoff?', back: 'Das Wasser.' },
    { id: 'demokrit', front: 'Welche Idee verbindet man mit Demokrit?', back: 'Alles besteht aus unteilbaren Atomen.' },
    { id: 'heraklit', front: 'Welches Schlagwort wird Heraklit zugeschrieben?', back: '„Panta rhei“ — alles fließt.' },
    { id: 'sokrates-daten', front: 'Lebensdaten und Tod des Sokrates?', back: '469–399 v. Chr.; zum Tod verurteilt, trank den Schierlingsbecher.' },
    { id: 'maeeutik', front: 'Was ist die Mäeutik?', back: 'Sokrates’ „Hebammenkunst“: durch Fragen zur eigenen Einsicht führen.' },
    { id: 'nichts-wissen', front: 'Was bedeutet das sokratische „Ich weiß, dass ich nichts weiß“?', back: 'Weisheit beginnt mit dem Bewusstsein der eigenen Unwissenheit.' },
    { id: 'akademie', front: 'Welche Schule gründete Platon?', back: 'Die Akademie in Athen (um 387 v. Chr.).' },
    { id: 'ideenlehre', front: 'Kern von Platons Ideenlehre?', back: 'Hinter den vergänglichen Dingen stehen ewige, vollkommene Ideen; nur sie sind wirklich.' },
    { id: 'hoehle', front: 'Das Höhlengleichnis in einem Satz?', back: 'Gefesselte halten Schatten für die Wirklichkeit; nur wer die Höhle verlässt, erkennt die Wahrheit (Platon, Politeia).' },
    { id: 'politeia', front: 'Wer soll nach Platons „Politeia“ herrschen?', back: 'Die Philosophen (Philosophenkönige).' },
    { id: 'aristoteles-empirie', front: 'Wie unterscheidet sich Aristoteles’ Erkenntnisweg von Platons?', back: 'Er setzt auf Beobachtung und Erfahrung; die Formen stecken in den Dingen selbst.' },
    { id: 'aristoteles-alexander', front: 'Wen unterrichtete Aristoteles?', back: 'Den jungen Alexander den Großen.' },
    { id: 'eudaimonia', front: 'Was ist nach Aristoteles das Ziel des Lebens?', back: 'Die Glückseligkeit (eudaimonia), erreicht durch tugendhaftes Handeln.' },
    { id: 'zoon', front: 'Was bedeutet „zoon politikon“?', back: 'Der Mensch ist ein Gemeinschaftswesen (Aristoteles).' },
    { id: 'stoa', front: 'Grundidee der Stoa — und drei bekannte Stoiker?', back: 'Gelassen hinnehmen, was nicht in unserer Macht steht; Seneca, Epiktet, Marc Aurel (Gründer: Zenon von Kition).' },
    { id: 'epikur', front: 'Was verstand Epikur unter Glück?', back: 'Seelenruhe (ataraxia) und Freiheit von Schmerz und Angst — nicht maßlosen Genuss.' },
  ],
};
