export default {
  id: 'wiederholung-schwaechen',
  title: 'Wiederholung: Schwächen finden',
  summary: 'Mit dem Übungsmodus gezielt wiederholen: Kapitel-Heatmap lesen, Fehlerursachen erkennen, einen realistischen Wiederholungsplan für die letzten Wochen aufstellen.',
  minutes: 20,
  goals: [
    'Das [[leitner-system|Leitner-System]] der Übungsfragen erklären (fünf Boxen, Abstände 0/1/3/7/21 Tage) und wissen, wann eine Frage als gemeistert oder schwach gilt',
    'Die Kapitel-Heatmap lesen und die drei Themen mit dem größten Nachholbedarf bestimmen',
    'Zu einem Fehler die Ursache (Wissenslücke, Verwechslung, überlesenes Wort, Rechenfehler) und die passende Gegenmaßnahme nennen',
    'Einen Wiederholungsplan mit Fragen pro Tag aufstellen',
  ],
  needs: [],
  blocks: [
    {
      id: 'warum', type: 'text', title: 'Wiederholen heißt: abrufen, nicht wiederlesen',
      md: String.raw`
Du hast jetzt alle Stoffgebiete durch. Ab hier gibt es **keine neuen Themen** mehr, sondern nur noch eine Frage: *Was sitzt, was nicht?* Dafür ist der Übungsmodus gebaut. Er folgt einer einfachen Einsicht der Lernforschung: **Aktives Abrufen** (eine Frage beantworten, ohne nachzuschlagen) festigt Wissen deutlich besser als erneutes Lesen, und **verteilte Wiederholung** wirkt besser als alles am Stück zu pauken (vgl. [Vergessenskurve](wiki:Vergessenskurve|Forgetting curve) und [Lernkartei](wiki:Leitner-System|Flashcard)).

So arbeitet der Übungsmodus dieser Plattform:

- Jede der 1034 Katalogfragen[^bnetza-fragenkatalog] liegt in einer von **fünf Boxen**. Eine **richtige** Antwort schiebt die Frage eine Box weiter, eine **falsche** wirft sie zurück in **Box 1**.
- Je höher die Box, desto später kommt die Frage wieder: **sofort, nach 1, 3, 7 und 21 Tagen**.
- **Gemeistert** heißt: Box 4 oder höher und die letzte Antwort war richtig. **Schwach** heißt: die letzte Antwort war falsch oder die Frage liegt in Box 1 oder 2.
- Jede Frage, die du in einer Prüfungssimulation beantwortest, fließt ebenfalls in diese Boxen ein.

Das Ziel der letzten Wochen: möglichst viele Fragen in Box 4 und 5 bringen, und die schwachen zuerst. Die Prüfung verlangt aus jedem der vier Teile **19 von 25 richtig**, also höchstens **6 Fehler je Teil**.[^bnetza-pruefungsordnung]`,
    },
    {
      id: 'mission-routine', type: 'callout', tone: 'mission', title: 'Funkpraxis: Wie Funkamateure in der letzten Woche üben',
      md: String.raw`Ein Rat, der sich bewährt: Die letzten Tage lieber **kurz und täglich** nutzen als in einem Marathon. Eine Viertelstunde „fällige Fragen“ am Morgen, eine Runde „schwache Fragen“ am Abend, einige Tage vor dem Termin eine Komplett-Simulation.`,
    },
    {
      id: 'demo-heatmap', type: 'viz', viz: 'kapitel-heatmap', title: 'Demo: Deine Kapitel-Heatmap',
      intro: 'Jede Kachel ist ein Katalogkapitel (VA bis EK). Je grüner, desto mehr Fragen sind gemeistert; ein roter Rahmen warnt vor vielen schwachen Fragen. Die Zahlen kommen aus deinem Lernstand in diesem Browser.',
      params: { pick: 3 },
      task: '**Tippe drei Themen an** und lies die Zahlen. Notiere dir, welche **drei Themen** den größten Nachholbedarf haben (wenig Grün, roter Rahmen). Danach steht dein Plan.',
    },
    {
      id: 'modi', type: 'text', title: 'Welcher Übungsmodus wofür?',
      md: String.raw`
Der Übungsmodus bietet mehrere Wege, dieselben Fragen in anderer Reihenfolge zu üben. Du erreichst sie über [„Üben“ im Menü](#/s/amateurfunk/practice) oder über diese direkten Links:

| Modus | Was kommt dran? | Wann sinnvoll? |
|---|---|---|
| [Fällig](#/s/amateurfunk/practice/due) | Fragen, deren Wiederholungstermin erreicht ist | **jeden Tag zuerst**: Sonst werden sie vergessen |
| [Schwach](#/s/amateurfunk/practice/weak) | letzte Antwort falsch oder Box 1 bis 2 | gezielte Nacharbeit |
| [Neu](#/s/amateurfunk/practice/new) | noch nie beantwortete Fragen | solange noch Lücken im Pool sind |
| [Alles](#/s/amateurfunk/practice/all) | fällig, dann neu, dann der Rest | wenn du nicht wählen willst |
| Ein Thema (z. B. [Amateurfunkverordnung](#/s/amateurfunk/practice/vd)) | alle Fragen eines Kapitels | Schwäche aus der Heatmap bearbeiten |
| Ein Teil ([V](#/s/amateurfunk/practice/part:v), [B](#/s/amateurfunk/practice/part:b), [N](#/s/amateurfunk/practice/part:n), [E](#/s/amateurfunk/practice/part:e)) | alle Fragen eines Prüfungsteils | vor der Teil-Simulation |
| [Letzte Prüfung](#/s/amateurfunk/practice/last) | Fehler der zuletzt beendeten Simulation | direkt nach jeder Simulation |
| Lektion (z. B. [EMV](#/s/amateurfunk/practice/lesson:emv-und-empfangsstoerungen)) | die einer Lektion zugeordneten Fragen | nach dem Nachlesen eines Themas |

Eine Runde umfasst 15 Fragen; die Tasten 1 bis 4 wählen die Antwort, Enter geht weiter. Bei jeder Frage führt der Link „Dazu die Lektion“ zurück zur Erklärung.`,
    },
    {
      id: 'quiz-modus', type: 'quiz', title: 'Welcher Modus passt?',
      question: 'Du hast gerade die Prüfungssimulation für Teil E beendet und willst jetzt genau die Fragen aufarbeiten, die du dort falsch beantwortet hast. Was wählst du?',
      options: [
        { text: 'Den Modus „Letzte Prüfung“ (Fehler der zuletzt beendeten Simulation).', correct: true, why: 'Er stellt genau die Fehler der letzten Simulation zusammen, mit richtiger Antwort und Lektionslink.' },
        { text: 'Den Modus „Neu“.', why: '„Neu“ zeigt nur Fragen, die du noch nie beantwortet hast; deine Fehler sind aber schon beantwortet.' },
        { text: 'Eine zweite Simulation sofort hinterher.', why: 'Ohne Aufarbeitung wiederholst du nur dieselben Lücken unter Zeitdruck.' },
        { text: 'Den Modus „Fällig“ am nächsten Tag und sonst nichts.', why: 'Das hilft, ersetzt aber nicht die gezielte Aufarbeitung der Fehler, solange sie frisch sind.' },
      ],
    },
    {
      id: 'fehlerarten', type: 'text', title: 'Fehler sind Information: vier Ursachen',
      md: String.raw`
Nicht jeder Fehler ist eine Wissenslücke. Wer die Ursache kennt, wählt die richtige Gegenmaßnahme:

1. **Wissenslücke:** Du kennst die Regel nicht. → In der Lektion nachlesen, eine Karteikarte anlegen.
2. **Verwechslung:** Du kennst zwei ähnliche Dinge, aber nicht den Unterschied (z. B. ERP und EIRP, Zulassung und Zeugnis, Einstrahlung und Einströmung). → Beides gegenüberstellen und die Unterscheidung als **eine** Karte merken.
3. **Überlesen:** „nur“, „immer“, „nicht“, „spätestens“, „vor“ oder „nach“ ändert die Aussage. → Frage langsam lesen, Schlüsselwörter markieren, Antworten *vergleichen* statt die erste plausible zu nehmen.
4. **Rechenfehler:** Faktor 1000 daneben (m statt M, µ statt n), Klammer vergessen, Kehrwert vergessen. → Vorsätze zuerst in Grundeinheiten umrechnen und eine Plausibilitätsprobe machen (siehe [Taschenrechner-Lektion](#/s/amateurfunk/l/formelsammlung-und-taschenrechner)).`,
    },
    {
      id: 'match-fehler', type: 'match', title: 'Fehlerursache → Gegenmaßnahme',
      prompt: 'Welche Gegenmaßnahme passt zu welcher Ursache?',
      pairs: [
        ['Du kennst die Regel schlicht nicht', 'Lektion nachlesen und eine Karteikarte anlegen'],
        ['Du verwechselst zwei ähnliche Begriffe', 'Beide gegenüberstellen und den Unterschied als eine Karte lernen'],
        ['Du hast das Wort „nur“ in der Frage überlesen', 'Schlüsselwörter markieren und Antworten vergleichen'],
        ['Dein Ergebnis ist um den Faktor 1000 zu groß', 'Vorsätze in Grundeinheiten umrechnen, Plausibilitätsprobe'],
      ],
    },
    {
      id: 'calc-anteil', type: 'numeric', title: 'Wie groß ist Teil E im Katalog?',
      question: 'Der Katalog hat 1034 Fragen: Teil V 204, Teil B 172, Teil N 195 und Teil E 463. Wie viel Prozent aller Fragen gehören zu Teil E?',
      answer: 44.8, tolerance: 0.2, unit: '%',
      hint: 'Teil E geteilt durch die Gesamtzahl, mal 100.',
      explain: '463 / 1034 · 100 % ≈ **44,8 %**. Der Pool von Teil E ist der größte, aber geprüft werden auch dort nur 25 Fragen. Dein Ziel sind 19 richtige, nicht alle 463 auswendig.',
    },
    {
      id: 'calc-tempo', type: 'numeric', title: 'Wie viele neue Fragen pro Tag?',
      question: 'Bis zur Prüfung sind es 6 Wochen (42 Tage). Du möchtest in dieser Zeit **alle 1034 Fragen mindestens einmal gesehen** haben. Wie viele *neue* Fragen musst du im Schnitt pro Tag schaffen?',
      answer: 24.6, tolerance: 0.3, unit: 'Fragen/Tag',
      hint: 'Fragenzahl durch Tage.',
      explain: '1034 / 42 ≈ **24,6**, also etwa zwei Runden zu 15 Fragen täglich. Dazu kommen die fälligen Wiederholungen: Plane deshalb zusätzlich Zeit ein, und beginne mit den Teilen, die dir schwerfallen.',
    },
    {
      id: 'order-sitzung', type: 'order', title: 'Eine Lernsitzung',
      prompt: 'Bringe die Bausteine einer sinnvollen täglichen Lernsitzung in die empfohlene Reihenfolge.',
      items: [
        'Fällige Fragen beantworten („Fällig“)',
        'Schwache Fragen wiederholen („Schwach“ oder das schwächste Thema aus der Heatmap)',
        'Neue Fragen eines Themas üben („Neu“)',
        'Fehler ansehen und bei Bedarf die verlinkte Lektion lesen',
      ],
      explain: 'Fälliges zuerst, weil es sonst vergessen wird. Dann die Schwächen, danach Neues, solange der Kopf frisch ist. Zum Schluss lohnt der Blick in die Erklärung bei den Fehlern.',
    },
    {
      id: 'recall-plan', type: 'recall', title: 'Dein Wiederholungsplan',
      prompt: 'Schreibe deinen Plan für die verbleibende Zeit bis zur Prüfung in vier Sätzen auf: Welche drei Themen kommen zuerst dran, wie viele Runden pro Tag, wann machst du die erste Simulation und wann die letzte?',
      answer: 'Zuerst die drei schwächsten Kapitel aus der Heatmap (gezielt über den Themenmodus), danach der Rest. Täglich zuerst die fälligen Fragen, dann zwei bis drei Runden zu 15 Fragen (schwache oder neue). Nach jeder Lerneinheit bei Fehlern die Lektion lesen. Die erste Teil-Simulation etwa zwei Wochen vor dem Termin, die komplette Simulation etwa drei bis vier Tage vorher; danach „Letzte Prüfung“ zur Fehleraufarbeitung und am Vortag nur leichte Wiederholung.',
      cards: ['wh-leitner', 'wh-gemeistert'],
    },
  ],
  cards: [
    { id: 'wh-leitner', front: 'Leitner-System der Übungsfragen: Boxen und Abstände?', back: '**5 Boxen**, Wiederholung nach **0 / 1 / 3 / 7 / 21 Tagen**. Richtig: eine Box höher. Falsch: zurück in **Box 1**.' },
    { id: 'wh-gemeistert', front: 'Wann gilt eine Frage als „gemeistert“?', back: '**Box 4 oder höher** und die **letzte Antwort war richtig**.' },
    { id: 'wh-schwach', front: 'Wann gilt eine Frage als „schwach“?', back: 'Die **letzte Antwort war falsch** oder die Frage liegt in **Box 1 oder 2**.' },
    { id: 'wh-pools', front: 'Fragenpool je Prüfungsteil (Gesamt 1034)?', back: '**V 204 · B 172 · N 195 · E 463.** Geprüft werden je Teil 25 Fragen.' },
    { id: 'wh-bestehen', front: 'Bestehensgrenze je Teil?', back: '**19 von 25** Punkten, also höchstens **6 Fehler**. Alle vier Teile müssen bestanden sein.' },
    { id: 'wh-nachpruefung', front: 'Wann ist eine mündliche Nachprüfung möglich?', back: 'Nur **ein** Teil verfehlt, aber **mindestens 17 Punkte**. Der Vorsitzende entscheidet. Nicht bestandene Teile: wiederholbar innerhalb von **24 Monaten**.' },
    { id: 'wh-fehlerarten', front: 'Vier Fehlerursachen und je eine Gegenmaßnahme?', back: 'Lücke → nachlesen. Verwechslung → gegenüberstellen. Überlesen → Schlüsselwörter markieren. Rechenfehler → Grundeinheiten und Plausibilität.' },
    { id: 'wh-letzte', front: 'Welcher Modus arbeitet die Fehler der letzten Simulation auf?', back: '**„Letzte Prüfung“** (`practice/last`). Zuvor täglich zuerst **„Fällig“**.' },
  ],
};
