export default {
  id: 'pruefungsablauf-und-anmeldung',
  title: 'Prüfungsablauf, Anmeldung und Gebühren',
  summary: 'Von der Anmeldung bei der Bundesnetzagentur über Prüfungstermin und Antwortbogen bis zur Zulassung mit Rufzeichen; erlaubte Hilfsmittel und Kosten.',
  minutes: 15,
  goals: [
    'Den Weg vom Antrag bis zum Rufzeichen in der richtigen Reihenfolge kennen',
    'Die Gebühren für Erstprüfung, Wiederholung, Zusatzprüfung und Zulassung zusammenrechnen',
    'Wissen, was du zur Prüfung mitbringst und was die [[bundesnetzagentur]] stellt',
    'Fristen kennen: Terminänderung (14 Tage) und Wiederholung nicht bestandener Teile (24 Monate)',
  ],
  needs: ['was-ist-amateurfunk'],
  blocks: [
    {
      id: 'intro', type: 'text', title: 'Kein Kurs, keine Anwesenheitspflicht — nur ein Termin',
      md: `
Für die Amateurfunkprüfung gibt es **keinen Pflichtkurs**: Du lernst, wie du willst (hier, im Ortsverband des [Deutschen Amateur-Radio-Clubs](wiki:Deutscher Amateur-Radio-Club|Deutscher Amateur-Radio-Club), mit einem Online-Kurs), und meldest dich direkt bei der [Bundesnetzagentur](wiki:Bundesnetzagentur|Federal Network Agency) zur Prüfung an. Die Behörde organisiert alle Prüfungen **zentral** und legt Ort und Zeit fest.[^bnetza-pruefungsordnung]

Die Spielregeln folgen aus dem [Amateurfunkgesetz](wiki:Amateurfunkgesetz) und stehen in einer **Verfügung der Bundesnetzagentur** (Vfg. 29/2024, gültig seit 24. Juni 2024). Sie ergänzt die [Amateurfunkverordnung](wiki:Amateurfunkverordnung) (AFuV), nach der die Prüfung gebührenpflichtig ist (§ 3 Abs. 2 AFuV).[^afuv] In dieser Lektion geht es nur um das Verfahren — die Inhalte der Prüfung (vier Teile, 19 von 25 Punkten) kennst du schon aus der ersten Lektion. Aus dem Fragenkatalog gehört zu diesem Thema keine Frage;  trotzdem lohnt es sich, den Ablauf zu kennen, damit am Prüfungstag nichts schiefgeht.
`,
    },
    {
      id: 'order-weg', type: 'order', title: 'Vom Antrag zum Rufzeichen',
      prompt: 'Bringe die Schritte in die richtige Reihenfolge.',
      items: [
        'Antrag auf Zulassung zur Prüfung stellen (vorrangig elektronisch, mit Wunschtermin)',
        'Zwischenbescheid mit Zahlungsdaten erhalten und die Gebühr überweisen',
        'Einladung der Bundesnetzagentur mit Ort und Zeit der Prüfung erhalten',
        'Prüfung ablegen (Ausweis, Antwortbogen, Taschenrechner)',
        'Amateurfunk-Prüfungsbescheinigung erhalten',
        'Antrag auf Zulassung stellen und das Rufzeichen zugeteilt bekommen',
      ],
      explain: 'Erst die Prüfung, dann die Zulassung: Die Prüfungsbescheinigung macht dich zum [[funkamateur]], senden darfst du aber erst mit der [[zulassung]] und dem [Rufzeichen](wiki:Rufzeichen|Call sign). Der Antrag auf Zulassung zur Prüfung enthält Wunschtermin und Prüfort; die Prüfungsorte findest du auf der Seite der Bundesnetzagentur.',
    },
    {
      id: 'text-antrag', type: 'text', title: 'Antrag, Termin und Prüfungsort',
      md: `
Der Antrag ist ein Formular, das du auf der Internetseite der Bundesnetzagentur findest. Er soll **vorrangig elektronisch** gestellt werden, geht aber auch schriftlich. Drin stehen deine Daten, die gewünschte Prüfungsart (Erstprüfung, Wiederholung, Zusatzprüfung) und ein Wunschtermin. **Minderjährige** brauchen die Einverständniserklärung ihrer gesetzlichen Vertreter. Ein Mindestalter gibt es nicht.[^bnetza-pruefungsordnung]

Nach dem Eingang bekommst du einen **Zwischenbescheid** mit den Angaben für die Überweisung der Gebühr; die **Einladung** schickt dir die Behörde. Möchtest du den Termin verschieben, muss dein Wunsch **spätestens 14 Kalendertage** vor dem Termin eingegangen sein — die erste Verschiebung ist **gebührenfrei**.

Prüfungsorte sind die Außenstellen der Bundesnetzagentur. Stand 2. Oktober 2026 wurden Termine unter anderem in Berlin, Cottbus, Dortmund, Eschborn, München, Nürnberg und Reutlingen angeboten; viele Termine sind lange vorher ausgebucht, also früh anmelden.[^bnetza-amateurfunk]
`,
    },
    {
      id: 'callout-praxis', type: 'callout', tone: 'mission', title: 'Funkpraxis: Anmelden, bevor du „fertig“ bist',
      md: `
Weil Termine knapp sind, ist es üblich, sich **zu Beginn der heißen Lernphase** anzumelden: Der Termin motiviert, und bis dahin kannst du üben. Wer den ersten Termin nicht schafft, verschiebt einmal gebührenfrei (mindestens 14 Tage vorher). Wer krank ist und das glaubhaft belegt, bekommt gebührenfrei eine neue Einladung. Wer **unentschuldigt** nicht erscheint, gilt als „angetreten und durchgefallen“ — der Antrag wird abgelehnt.
`,
    },
    {
      id: 'viz-kosten', type: 'viz', viz: 'anmeldung-kosten', title: 'Was kostet der Weg zum Rufzeichen?',
      params: {},
      task: 'Rechne die **Erstprüfung Klasse E mit Zulassung** (93,50 €), eine **Wiederholung mit zwei Teilen** und die **Zusatzprüfung N → E** aus.',
      caption: 'Gebühren nach der Besonderen Gebührenverordnung des Bundesministeriums (Stand der Fassung 23.07.2024; Stand dieser Lektion 05.10.2026).[^bmdv-gebuehren]',
    },
    {
      id: 'num-wdh', type: 'numeric', title: 'Wiederholung rechnen',
      question: 'Du hast in der Erstprüfung die Teile B und E nicht bestanden und wiederholst nur diese beiden. Die Wiederholungsprüfung kostet 42,50 €, dazu kommen 5,50 € je wiederholtem Prüfungsteil. Wie viel zahlst du in Euro?',
      answer: 53.5, tolerance: 0.01, unit: '€',
      explain: '42,50 € + 2 · 5,50 € = 53,50 €. Die Zulassung mit Rufzeichen (20 €) kommt erst nach bestandener Prüfung dazu.',
    },
    {
      id: 'text-tag', type: 'text', title: 'Am Prüfungstag',
      md: `
Vor Beginn wird deine **Identität** festgestellt: Du brauchst einen [**Personalausweis**](wiki:Personalausweis (Deutschland)|German identity card) oder einen **amtlichen Lichtbildausweis zusammen mit einer Meldebescheinigung**. Die Prüfung ist **schriftlich** ([Multiple Choice](wiki:Multiple Choice|Multiple choice)) und findet unter Ausschluss der Öffentlichkeit statt; mindestens ein Mitglied des Prüfungsausschusses beaufsichtigt ständig.[^bnetza-pruefungsordnung]

Du bringst **einen Stift** und einen [**Taschenrechner**](wiki:Taschenrechner|Calculator) mit — einen einfachen wissenschaftlichen oder einen nicht programmierbaren Rechner **ohne Textspeicher**. Alles Weitere stellt die Behörde: **Anlage 1 der AFuV**, den **Rufzeichenplan**, **Auszüge aus dem IARU-Bandplan** für 2 m und 70 cm sowie in den Technikteilen die **Formelsammlung** und **Entwurfspapier**. Eigene Notizen sind tabu, Handys und andere elektronische Kommunikationsgeräte werden ausgeschaltet; wer täuscht, fliegt raus.[^bnetza-pruefungsordnung]

Jeder Teil hat **25 Fragen** und dauert **höchstens 45 Minuten**. Ein Fragebogen und ein Antwortbogen gehören zusammen: Du trägst Nummer des Fragebogens, Name, Ort und Datum ein und kreuzt dann die Antworten **auf dem Antwortbogen** an. Fragebogen und Formelsammlung dürfen nicht beschriftet werden, Rechnungen gehören aufs Entwurfspapier — das wird nicht gewertet.
`,
    },
    {
      id: 'match-hilfsmittel', type: 'match', title: 'Wer bringt was mit?',
      prompt: 'Ordne zu: Das bringst du selbst mit — oder das stellt dir die Bundesnetzagentur.',
      pairs: [
        ['Stift', 'selbst mitbringen'],
        ['Taschenrechner ohne Textspeicher', 'selbst mitbringen'],
        ['Personalausweis', 'selbst mitbringen'],
        ['Rufzeichenplan', 'wird gestellt'],
        ['Anlage 1 der AFuV', 'wird gestellt'],
        ['Formelsammlung (Technikteile)', 'wird gestellt'],
      ],
    },
    {
      id: 'quiz-weg', type: 'quiz', title: 'Fristen und Regeln',
      question: 'Welche Aussagen zum Verfahren sind richtig? (Mehrfachauswahl)',
      options: [
        { text: 'Die erste Änderung des Prüfungstermins ist gebührenfrei, wenn der Wunsch mindestens 14 Kalendertage vorher eingeht.', correct: true, why: 'So steht es in der Vfg. 29/2024.' },
        { text: 'Nicht bestandene Teile können innerhalb von 24 Monaten nach Bekanntgabe des ersten Ergebnisses einzeln wiederholt werden.', correct: true, why: 'Danach muss die Prüfung vollständig als neue Erstprüfung abgelegt werden; den Antrag auf Wiederholung sollte man mindestens acht Wochen vor Fristablauf stellen.' },
        { text: 'Wer nach Prüfungsbeginn von einem Teil zurücktritt, hat diesen Teil nicht bestanden.', correct: true, why: 'Die betroffenen Teile gelten als nicht bestanden; sie lassen sich aber wiederholen.' },
        { text: 'Mit der Prüfungsbescheinigung darfst du sofort senden.', correct: false, why: 'Senden darf nur, wer die Zulassung mit Rufzeichen hat.' },
        { text: 'Für die Prüfung muss man mindestens 14 Jahre alt sein.', correct: false, why: 'Es gibt kein Mindestalter; Minderjährige brauchen die Einverständniserklärung der gesetzlichen Vertreter.' },
      ],
    },
    {
      id: 'fact-stat', type: 'callout', tone: 'fact', title: 'Zahlen aus 2025',
      md: `
Im Jahr 2025 nahmen **2261** Prüflinge an **189** Prüfungen teil: **706** bestanden die Klasse E, **753** die Klasse N und **631** die Klasse A. Zum 31.12.2025 gab es in Deutschland **9133** Zulassungen der Klasse E (und 51 155 der Klasse A).[^bnetza-statistik-2025] Du bist also in guter Gesellschaft — und mit dem [Funkamateur](wiki:Funkamateur|Amateur radio operator)-Dasein beginnt das eigentliche Hobby erst.
`,
    },
    {
      id: 'recall-ablauf', type: 'recall', title: 'Mit eigenen Worten',
      prompt: 'Beschreibe den Weg von der Anmeldung bis zum ersten Funkspruch in fünf, sechs Stichpunkten. Nenne Fristen und Hilfsmittel.',
      answer: 'Antrag auf Zulassung zur Prüfung (elektronisch, mit Wunschtermin und -ort) → Zwischenbescheid mit Zahlungsdaten, Gebühr überweisen (Erstprüfung E: 73,50 €) → Einladung der BNetzA; Termin ändern bis 14 Tage vorher (erste Änderung gebührenfrei) → Prüfung mit Ausweis, Stift und Taschenrechner ohne Textspeicher; gestellt werden Anlage 1, Rufzeichenplan, IARU-Bandplanauszug, Formelsammlung → 4 Teile à 25 Fragen, je 19 Punkte, 45 min je Teil; nicht bestandene Teile 24 Monate wiederholbar → Prüfungsbescheinigung → Antrag auf Zulassung (20 €), Rufzeichen → erst dann senden.',
      hints: ['Reihenfolge: Antrag, Zwischenbescheid, Einladung, Prüfung, Bescheinigung, Zulassung.', 'Zwei Fristen: 14 Tage und 24 Monate.'],
      cards: ['gebuehren', 'frist-24'],
    },
  ],
  cards: [
    { id: 'weg', front: 'Reihenfolge vom Antrag bis zum Senden?', back: 'Antrag auf Zulassung zur Prüfung → Zwischenbescheid/Gebühr → Einladung → Prüfung → Prüfungsbescheinigung → Antrag auf Zulassung (Rufzeichen) → Senden.' },
    { id: 'gebuehren', front: 'Gebühren: Erstprüfung Klasse E, Zulassung?', back: 'Erstprüfung E 73,50 €; Zulassung mit Rufzeichen 20 €. (Wiederholung 42,50 € + 5,50 € je Teil; Zusatzprüfung N→E 48 €.)' },
    { id: 'wiederholung', front: 'Wiederholungsprüfung: Gebühr?', back: '42,50 € plus 5,50 € für jeden wiederholten Prüfungsteil.' },
    { id: 'frist-24', front: 'Wie lange sind nicht bestandene Teile einzeln wiederholbar?', back: '24 Monate nach Bekanntgabe des ersten Prüfungsergebnisses; danach komplett neue Erstprüfung.' },
    { id: 'frist-14', front: 'Terminänderung: Frist und Kosten?', back: 'Wunsch spätestens 14 Kalendertage vor dem Termin; die erste Änderung ist gebührenfrei.' },
    { id: 'ausweis', front: 'Welcher Ausweis wird verlangt?', back: 'Personalausweis oder amtlicher Lichtbildausweis zusammen mit einer Meldebescheinigung.' },
    { id: 'mitbringen', front: 'Was bringt man mit, was wird gestellt?', back: 'Mitbringen: Stift, Taschenrechner (wissenschaftlich/nicht programmierbar, ohne Textspeicher). Gestellt: AFuV Anlage 1, Rufzeichenplan, IARU-Bandplanauszug 2 m/70 cm, Formelsammlung (Technik), Entwurfspapier.' },
    { id: 'zeit', front: 'Dauer und Umfang je Prüfungsteil (V, B, N, E)?', back: '25 Fragen, höchstens 45 Minuten (Teil A: 60 Minuten), 19 Punkte zum Bestehen.' },
    { id: 'zusatz', front: 'Zusatzprüfung N → E: Was muss man ablegen?', back: 'Nur den Technikteil E (25 Fragen); Gebühr 48 €. Wer E hat und A will, macht nur den Teil A.' },
    { id: 'nicht-erschienen', front: 'Was gilt, wenn man unentschuldigt nicht zur Prüfung erscheint?', back: 'Die Prüfung gilt als angetreten und nicht bestanden; der Antrag auf Prüfungsbescheinigung wird abgelehnt. Bei belegter Krankheit: gebührenfrei neue Einladung.' },
  ],
};
