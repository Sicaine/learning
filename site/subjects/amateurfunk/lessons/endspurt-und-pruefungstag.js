export default {
  id: 'endspurt-und-pruefungstag',
  title: 'Endspurt: Merkliste und Prüfungstag',
  summary: 'Was auf dem Prüfungstisch liegt und was nicht, die wichtigsten Merkwerte, Anmeldung bis Rufzeichen mit Gebühren, Zeit- und Ausschlussstrategie und die Checkliste für den Prüfungstag.',
  minutes: 20,
  goals: [
    'Sicher sagen, welche Hilfsmittel in der Prüfung ausliegen und welches Wissen im Kopf sitzen muss',
    'Den Weg von der Anmeldung über die Prüfung bis zu Zulassung und Rufzeichen samt Gebühren nennen',
    'Die Checkliste für den Prüfungstag abarbeiten (Unterlagen, Antwortbogen, Regeln im Prüfungsraum)',
    'Zeit und [[ausschlussverfahren|Ausschlussverfahren]] gezielt einsetzen, um die 19 Punkte je Teil zu sichern',
  ],
  needs: [],
  blocks: [
    {
      id: 'intro', type: 'text', title: 'Die letzte Woche: wenig Neues, viel Sicherheit',
      md: String.raw`
Du hast alle Themen durch. Jetzt geht es nicht mehr darum, **mehr** zu wissen, sondern darum, das Gewusste am Prüfungstag **zuverlässig abzurufen**. Ein Vorschlag für die letzten Tage (eigene Empfehlung, kein amtlicher Plan):

1. **Sieben bis vier Tage vorher:** eine Komplett-Simulation ([Prüfungssimulation](#/s/amateurfunk/exam)), danach die Fehler aufarbeiten ([Letzte Prüfung](#/s/amateurfunk/practice/last)).
2. **Drei bis zwei Tage vorher:** schwache Themen ([Schwach](#/s/amateurfunk/practice/weak)), die Karteikarten der Simulations-Lektionen und eine zweite Simulation oder die schwächsten Teile einzeln.
3. **Am Vortag:** nur noch leicht wiederholen ([Fällig](#/s/amateurfunk/practice/due)), Unterlagen bereitlegen, früh schlafen. Ausgeruht denkt das [Gedächtnis](wiki:Gedächtnis|Memory) besser als nach einer durchlernten Nacht ([Schlaf](wiki:Schlaf|Sleep) festigt Gelerntes).
4. **Prüfungstag:** Checkliste unten, ruhig bleiben ([Prüfungsangst](wiki:Prüfungsangst|Test anxiety) ist normal und lässt sich mit guter Vorbereitung dämpfen).`,
    },
    {
      id: 'tisch', type: 'text', title: 'Was liegt auf dem Tisch, was nicht?',
      md: String.raw`
Die Prüfungsordnung (Vfg. 29/2024, Nr. 7.1) legt fest, welche Hilfsmittel erlaubt sind:[^bnetza-pruefungsordnung]

- **Mitbringen:** Stift und ein einfacher wissenschaftlicher [Taschenrechner](wiki:Taschenrechner|Calculator) oder ein nicht programmierbarer Taschenrechner **ohne Textspeicher**.
- **Wird gestellt** (nur diese weiteren Hilfsmittel sind erlaubt): **Anlage 1 der AFuV** (Frequenzbereiche, Leistungen, Bandbreiten), der **Rufzeichenplan**, **Auszüge aus dem IARU-Bandplan** für 2 m und 70 cm, für die Technikteile die **Formelsammlung** und **Entwurfspapier**.
- **Nicht erlaubt:** alle sonstigen Unterlagen und Notizblätter. Elektronische Kommunikationsgeräte sind im Prüfungsraum grundsätzlich auszuschalten. Wer täuscht oder unzulässige Hilfsmittel benutzt, wird ausgeschlossen.

Die Konsequenz für dein Lernen: **Was ausliegt, musst du lesen können; was nicht ausliegt, muss sitzen.** Probiere es aus.`,
    },
    {
      id: 'demo-tisch', type: 'viz', viz: 'tisch-sortierer', title: 'Demo: Tisch oder Kopf?',
      intro: 'Sechzehn Wissenshäppchen: Liegt es in der Prüfung aus, oder musst du es im Kopf haben?',
      params: { need: 13 },
      task: 'Sortiere mindestens **13 von 16** Karten richtig.',
    },
    {
      id: 'merkliste', type: 'text', title: 'Die Merkliste',
      md: String.raw`
**Prüfungsregeln** (die Zahlen, die jeder Prüfling der [Amateurfunkprüfung](wiki:Amateurfunkprüfung) kennen sollte):

<table>
<tr><th>Was</th><th>Wert</th></tr>
<tr><td>Teile und Fragen</td><td>V, B, N, E mit je <b>25</b> Fragen (vier Antworten, eine richtig)</td></tr>
<tr><td>Zeit je Teil</td><td><b>45 Minuten</b> (im Schnitt 1,8 Minuten = 108 Sekunden je Frage)</td></tr>
<tr><td>Bestehen</td><td><b>19 von 25</b> je Teil, also höchstens 6 Fehler</td></tr>
<tr><td>Mündliche Nachprüfung</td><td>genau ein Teil verfehlt und dort <b>mindestens 17</b> Punkte</td></tr>
<tr><td>Wiederholung</td><td>nicht bestandene Teile innerhalb von <b>24 Monaten</b> einzeln</td></tr>
<tr><td>Hast du schon Klasse N?</td><td>dann nur Teil <b>E</b></td></tr>
</table>

**Im Kopf sitzen muss** (liegt nicht aus): [Buchstabiertafel](wiki:Buchstabiertafel|Spelling alphabet), [Q-Gruppen](wiki:Q-Schlüssel|Q code) und Abkürzungen, internationale Landeskenner, Rufzeichenzusätze, Notfunkverhalten, **UTC** ([Koordinierte Weltzeit](wiki:Koordinierte Weltzeit|Coordinated Universal Time)) für QSL-Karten (MEZ − 1 h, MESZ − 2 h), die Rechtsfakten aus dem AFuG, der AFuV und den weiteren Gesetzen (z. B. BEMFV: ortsfest ab **10 W EIRP**, Anzeige **vor** Inbetriebnahme), Schaltzeichen und das Verhalten der Bauteile (Kondensator sperrt Gleichstrom, Spule bremst Wechselstrom), Frequenzbereichsnamen (HF/VHF/UHF).

**Liegt aus, du musst nur wissen wo:** Formeln (Ohm, Leistung, Reihen-/Parallelschaltung, Teiler, Schwingkreis, Filter, ZF/Spiegel, SWR, Pegel, EIRP, Wellenlänge) und die **[dB-Tabelle](wiki:Dezibel|Bel (unit))** in der Formelsammlung; Leistungen und Frequenzbereiche in Anlage 1; Rufzeichenreihen im Rufzeichenplan; Band-Aufteilung 2 m/70 cm im Bandplanauszug.[^bnetza-formelsammlung]

<div style="border-left:4px solid var(--accent);padding:6px 12px;background:var(--accent-soft);border-radius:6px"><b>Faustwerte, die beim Rechnen Zeit sparen:</b> 3 dB entsprechen ×2 (Leistung), 6 dB ×4, 10 dB ×10, 20 dB ×100; $\hat U=U_\mathrm{eff}\cdot\sqrt2$; $\lambda[\text{m}]\approx300/f[\text{MHz}]$; $1/f=T$; Parallelschaltung zweier Widerstände immer kleiner als der kleinere.</div>`,
    },
    {
      id: 'anmeldung', type: 'text', title: 'Von der Anmeldung zum Rufzeichen',
      md: String.raw`
Der Weg vom Entschluss bis zum Sendebetrieb in Stichworten (alle Angaben mit Stand 05.10.2026):[^bnetza-pruefungsordnung][^bmdv-gebuehren][^afuv]

1. **Antrag auf Zulassung zur Prüfung** (Formblatt der [Bundesnetzagentur](wiki:Bundesnetzagentur|Federal Network Agency), vorrangig elektronisch; bei Minderjährigen mit Einverständnis des gesetzlichen Vertreters). Du nennst Prüfort und Wunschtermin.
2. **Zwischenbescheid** mit den Zahlungsdaten für die Gebühr.
3. **Einladung** durch die Bundesnetzagentur mit Ort und Zeit. Willst du den Termin ändern, muss das **spätestens 14 Kalendertage vorher** bei der BNetzA eingehen; die **erste Änderung ist gebührenfrei**. Die Termine der Prüfungsstellen stehen auf der Seite der Bundesnetzagentur und sind oft ausgebucht (Stand der Terminliste: 02.10.2026): **früh anmelden.**
4. **Prüfung** an einer der Prüfungsaußenstellen (u. a. Berlin, Cottbus, Dortmund, Erfurt, Eschborn, Göttingen, Hamburg, Hannover, München, Nürnberg, Reutlingen). Ausweis: Personalausweis oder amtlicher Lichtbildausweis **mit Meldebescheinigung**.
5. **Prüfungsbescheinigung** (Klasse E), wenn alle Teile bestanden sind.
6. **Antrag auf Zulassung** zur Teilnahme am Amateurfunkdienst: Die BNetzA lässt eine natürliche Person **mit Wohnsitz in Deutschland** auf Antrag zu und teilt dabei ein **personengebundenes [Rufzeichen](wiki:Rufzeichen|Call sign)** zu (§ 9 Abs. 1 AFuV). Mit dem Antrag nennst du die Standorte deiner ortsfesten Stationen. **Erst dann** darfst du senden.
7. **Jährlich:** Frequenzschutzbeitrag (nach TKG und EMVG; Höhe ist im Gebührenbescheid angegeben und hier nicht geprüft).

**Gebühren** (BMDVTKBGebV, Fassung 23.07.2024):

<table>
<tr><th>Posten</th><th>Gebühr</th></tr>
<tr><td>Erstprüfung Klasse E</td><td>73,50 €</td></tr>
<tr><td>Wiederholungsprüfung</td><td>42,50 € (+ 5,50 € je wiederholtem Teil)</td></tr>
<tr><td>Zusatzprüfung N nach E</td><td>48,00 €</td></tr>
<tr><td>Zulassung und personengebundenes Rufzeichen</td><td>20,00 €</td></tr>
<tr><td>Änderung von Name/Anschrift</td><td>18,50 €</td></tr>
<tr><td>Verzicht auf die Zulassung</td><td>15,00 €</td></tr>
</table>

**Rufzeichen:** Es besteht **kein Anspruch auf ein bestimmtes Rufzeichen**. Nach dem Rufzeichenplan werden für Klasse E personengebundene Rufzeichen aus **DO1 bis DO9** (und DA6) vergeben; Klasse A erhält z. B. DL1 bis DL9, Klasse N DN9.[^bnetza-rufzeichenplan] Auf ein zugeteiltes Rufzeichen kannst du verzichten; es wird frühestens nach **einem Jahr** neu vergeben.`,
    },
    {
      id: 'demo-kosten', type: 'viz', viz: 'anmeldung-kosten', title: 'Demo: Kosten-Check',
      intro: 'Rechne die Gebühren für deinen Weg durch: Erstprüfung, Wiederholung oder Zusatzprüfung, jeweils mit oder ohne Zulassung.',
      params: { goals: ['upgrade'] },
      task: 'Wähle **Zusatzprüfung N → E** und rechne die Gebühr **mit Zulassung** aus (68,00 €), falls du schon die Klasse N hast.',
    },
    {
      id: 'order-weg', type: 'order', title: 'Der Weg zum Rufzeichen',
      prompt: 'Bringe die Schritte von der Anmeldung bis zum Funkbetrieb in die richtige Reihenfolge.',
      items: [
        'Antrag auf Zulassung zur Prüfung stellen',
        'Zwischenbescheid erhalten und die Gebühr überweisen',
        'Einladung der Bundesnetzagentur erhalten und die Prüfung ablegen',
        'Prüfungsbescheinigung Klasse E erhalten',
        'Zulassung zur Teilnahme am Amateurfunkdienst mit personengebundenem Rufzeichen beantragen und erhalten',
      ],
      explain: 'Ohne Zulassung und Rufzeichen darf nicht gesendet werden, auch nicht mit bestandener Prüfung. Betrieb ohne Zulassung ist eine Ordnungswidrigkeit.',
    },
    {
      id: 'calc-wdh', type: 'numeric', title: 'Gebühr einer Wiederholung',
      question: 'Du musst zwei Teile wiederholen. Wiederholungsprüfung 42,50 €, dazu 5,50 € je wiederholtem Teil. Wie hoch ist die Gebühr der Wiederholung (ohne Zulassung)?',
      answer: 53.5, tolerance: 0.01, unit: '€',
      hint: '42,50 € + 2 × 5,50 €.',
      explain: '42,50 € + 2 · 5,50 € = **53,50 €**. Eine neue Zulassung brauchst du nicht, wenn du sie schon hast.',
    },
    {
      id: 'tag', type: 'text', title: 'Checkliste für den Prüfungstag',
      md: String.raw`
**Mitnehmen:** Einladung, **Personalausweis** (oder amtlicher Lichtbildausweis plus Meldebescheinigung), Stift, zugelassener **Taschenrechner** (mit frischer Batterie; ein Ersatz schadet nicht). **Nicht mitnehmen oder ausgeschaltet lassen:** Handy und andere elektronische Kommunikationsgeräte, Notizen.

**Im Prüfungsraum:**

1. Vor Beginn werden Anwesenheit und Identität festgestellt. Du wirst über den Ablauf, erlaubte Hilfsmittel und die Folgen von Täuschungsversuchen unterrichtet.
2. **Antwortbogen:** Trage die **Nummer des Prüfungsfragebogens**, deinen **Namen**, den **Prüfungsort** und das **Datum** ein. Danach füllst du in der vorgegebenen Zeit den Antwortteil aus.
3. **Fragebogen und Formelsammlung nicht beschriften!** Rechne auf dem Entwurfspapier; seine Berechnungen zählen für das Ergebnis nicht.
4. Am Ende **jedes Teils** gibst du Antwortbogen, Fragebogen, Formelsammlung und Entwurfspapier ab.
5. Das Ergebnis teilt dir der Vorsitzende mit; du bekommst eine Bestätigung oder, wenn alle Teile bestanden sind, die Prüfungsbescheinigung.

**Wenn etwas dazwischenkommt:** Bist du am Termin verhindert, teile das der BNetzA **unverzüglich** mit. Bei gesundheitlichen Gründen, die du **vor Beginn** glaubhaft belegst, gilt die Prüfung als nicht angetreten, und du erhältst gebührenfrei eine neue Einladung. Trittst du **nach Beginn** zurück, gelten die betroffenen Teile als nicht bestanden. Unentschuldigtes Nichterscheinen gilt als angetreten und nicht bestanden.[^bnetza-pruefungsordnung]`,
    },
    {
      id: 'match-regeln', type: 'match', title: 'Situation → Regel',
      prompt: 'Was gilt am Prüfungstag?',
      pairs: [
        ['Handy', 'ausgeschaltet (elektronische Kommunikationsgeräte aus)'],
        ['Taschenrechner mit Textspeicher', 'nicht zulässig'],
        ['Formelsammlung in Teil N und E', 'wird gestellt, darf nicht beschriftet werden'],
        ['Berechnung auf dem Entwurfspapier', 'zählt nicht für das Ergebnis'],
        ['Terminänderung', 'spätestens 14 Kalendertage vorher, die erste ist gebührenfrei'],
      ],
    },
    {
      id: 'strategie', type: 'text', title: 'Zeit einteilen, Ausschlussverfahren, Raten',
      md: String.raw`
- **Zeitbudget:** 45 Minuten für 25 Fragen sind im Schnitt **108 Sekunden** je Frage. Schnelle Fragen schnell beantworten und **Zeit für die Rechen- und Bildaufgaben aufsparen**. Eine Frage, die nach etwa zwei Minuten nicht klappt, wird **markiert und zurückgestellt**. Plane die letzten Minuten zur Kontrolle ein (siehe den Zeitplaner in den Simulations-Lektionen).
- **[[ausschlussverfahren|Ausschlussverfahren]]:** Von den vier Antworten ist genau eine richtig. Streiche zuerst, was *sicher falsch* ist: falsche Größenordnung, falsche Einheit, absolute Wörter („immer“, „nie“), Aussagen, die zum genannten Gesetz nicht passen. Bleiben zwei Antworten übrig, hast du schon eine Trefferchance von 50 %.
- **Nie ein Feld leer lassen:** Für jede richtig beantwortete Frage gibt es einen Punkt; ein Abzug für falsche Antworten ist in der Prüfungsordnung nicht vorgesehen. Eine begründete Vermutung kann also nur helfen.
- **Rechnen:** Gegeben/gesucht aufschreiben, Formel in der Sammlung suchen, **Grundeinheiten**, Taschenrechner mit Klammern, Plausibilität prüfen (Größenordnung, Einheit).
- **Lesen:** Schlüsselwörter markieren: *nur, immer, nicht, vor, unverzüglich, auf Anforderung, ERP oder EIRP*.
- **Ruhe:** Tief durchatmen, wenn eine Frage fremd wirkt. Die Katalogfragen sind exemplarische Prüfungsinhalte (Vfg. 29/2024 Nr. 6); ähnliche Fragen in anderer Formulierung sind möglich. Wer die Zusammenhänge versteht, erkennt sie auch dann ([Multiple Choice](wiki:Multiple Choice|Multiple choice) belohnt sicheres Erkennen).`,
    },
    {
      id: 'quiz-ausschluss', type: 'quiz', title: 'Ausschlussverfahren in Aktion',
      question: 'Dir bleibt keine Zeit zum Rechnen: Welche Wellenlänge hat ein Signal auf 145 MHz? Du kennst das 2-m-Band. Welche Antwort wählst du?',
      options: [
        { text: 'Etwa 2,07 m', correct: true, why: 'λ ≈ 300/145 m ≈ 2,07 m. Du erkennst es ohne Taschenrechner: Das 2-m-Band hat Wellen von rund 2 m.' },
        { text: 'Etwa 20,7 m', why: 'Das wäre die Wellenlänge bei etwa 14,5 MHz (20-m-Band).' },
        { text: 'Etwa 0,207 m', why: 'Das wäre etwa 1450 MHz (23-cm-Band).' },
        { text: 'Etwa 207 m', why: 'Das wäre etwa 1,45 MHz (Mittelwelle).' },
      ],
    },
    {
      id: 'recall-tag', type: 'recall', title: 'Dein Prüfungstag-Plan',
      prompt: 'Schreibe in fünf Sätzen deinen Plan für den Prüfungstag auf: was du mitnimmst, was du am Vorabend tust, wie du die 45 Minuten je Teil einteilst und wie du bei einer Frage vorgehst, die du nicht sofort weißt.',
      answer: 'Ich nehme Einladung, Personalausweis (oder Lichtbildausweis mit Meldebescheinigung), Stift und einen zugelassenen Taschenrechner ohne Textspeicher mit; das Handy bleibt aus. Am Vorabend wiederhole ich nur leicht (fällige Fragen), lege die Unterlagen bereit und schlafe früh. Ich beantworte die sicheren Fragen zuerst, markiere Rechen- und Bildaufgaben, die länger dauern, und kontrolliere am Ende. Bei einer unklaren Frage markiere ich Schlüsselwörter, streiche sicher falsche Antworten (Größenordnung, Einheit, absolute Wörter), und trage eine begründete Vermutung ein. Auf Antwortbogen schreibe ich Fragebogennummer, Name, Ort und Datum; Fragebogen und Formelsammlung beschrifte ich nicht.',
      cards: ['ek-regeln', 'ek-hilfsmittel', 'ek-weg'],
    },
  ],
  cards: [
    { id: 'ek-regeln', front: 'Prüfungsregeln auf einen Blick?', back: '4 Teile (V, B, N, E) × **25 Fragen**, je **45 min**, **19 von 25** zum Bestehen; **17** für die mündliche Nachprüfung (nur ein Teil verfehlt); Wiederholung **24 Monate**; hast du N: nur **E**.' },
    { id: 'ek-hilfsmittel', front: 'Hilfsmittel: was mitbringen, was liegt aus?', back: 'Mitbringen: Stift, wissenschaftlicher/nicht programmierbarer **Taschenrechner ohne Textspeicher**. Aus: **Anlage 1 AFuV, Rufzeichenplan, IARU-Bandplanauszug 2 m/70 cm**; Technikteile: **Formelsammlung, Entwurfspapier**.' },
    { id: 'ek-zeit', front: 'Zeit je Frage?', back: '45 min / 25 = **1,8 min = 108 s**. Schnelle zuerst, Rechen- und Bildaufgaben markieren und später lösen; Rest für Kontrolle.' },
    { id: 'ek-weg', front: 'Weg zum Rufzeichen?', back: 'Antrag → Zwischenbescheid/Gebühr → Einladung → Prüfung → Bescheinigung → **Antrag auf Zulassung** (Wohnsitz in Deutschland) mit **Rufzeichen**. **Erst dann** senden.' },
    { id: 'ek-gebuehren', front: 'Gebühren Klasse E?', back: 'Erstprüfung **73,50 €**, Zulassung mit Rufzeichen **20,00 €**; Wiederholung **42,50 € + 5,50 € je Teil**; Zusatzprüfung N→E **48,00 €**.' },
    { id: 'ek-aenderung', front: 'Gebühren für Änderungen?', back: 'Name/Anschrift **18,50 €**; Verzicht auf die Zulassung **15,00 €**; Widerspruch gegen Rufzeichenlisten-Eintrag 15,00 €.' },
    { id: 'ek-rufzeichen', front: 'Rufzeichen: Anspruch, Klasse E, Verzicht?', back: '**Kein Anspruch** auf ein bestimmtes Rufzeichen. Klasse E: **DO1–DO9** (auch DA6). Nach Verzicht frühestens nach **einem Jahr** neu vergeben.' },
    { id: 'ek-termin', front: 'Termin ändern oder verhindert?', back: 'Änderung **spätestens 14 Kalendertage** vorher, die **erste gebührenfrei**. Verhinderung **unverzüglich** melden; krank vor Beginn (belegt): gebührenfreie neue Einladung.' },
    { id: 'ek-ausweis', front: 'Welcher Ausweis?', back: '**Personalausweis** oder amtlicher **Lichtbildausweis plus Meldebescheinigung**. Minderjährige: Einverständnis des gesetzlichen Vertreters.' },
    { id: 'ek-antwortbogen', front: 'Antwortbogen und Unterlagen: was beachten?', back: 'Eintragen: **Fragebogennummer, Name, Prüfungsort, Datum**. Fragebogen und Formelsammlung **nicht beschriften**; am Teilende alles abgeben; Entwurfsrechnungen zählen nicht.' },
    { id: 'ek-ausschluss', front: 'Ausschlussverfahren?', back: 'Sicher Falsches streichen (Größenordnung, Einheit, „immer/nie“, falsches Gesetz). **Nie leer lassen**: begründet vermuten, es gibt keinen Punktabzug.' },
    { id: 'ek-utc', front: 'UTC-Umrechnung?', back: '**MEZ − 1 h = UTC**, **MESZ − 2 h = UTC**. QSL-Karten immer in UTC.' },
    { id: 'ek-faust', front: 'Faustwerte zum Rechnen?', back: String.raw`3 dB ≙ ×2, 6 dB ≙ ×4, 10 dB ≙ ×10, 20 dB ≙ ×100 (Leistung). $\hat U=U_\mathrm{eff}\sqrt2$. $\lambda[\text{m}]\approx300/f[\text{MHz}]$.` },
    { id: 'ek-fundstellen', front: 'Was steht in der Formelsammlung, was nicht?', back: '**Steht drin:** Formeln, dB-Tabelle, Farbcode, Wellenlänge, SWR, EIRP. **Steht nicht drin:** Buchstabiertafel, Q-Gruppen, Landeskenner, Rechtsfakten, Schaltzeichen.' },
  ],
};
