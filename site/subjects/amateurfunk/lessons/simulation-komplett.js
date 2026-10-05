export default {
  id: 'simulation-komplett',
  title: 'Komplett-Simulation Klasse E (V, B, N, E)',
  summary: 'Alle vier Teile hintereinander: 4 × 25 Fragen, je Teil 45 Minuten, Gesamtauswertung mit der Nachprüfungs-Regel (17 oder 18 Punkte). So bereitest du sie vor, führst sie durch und wertest sie aus.',
  minutes: 180,
  goals: [
    'Den Ablauf der Komplett-Simulation kennen (vier Teile, je eigener Zeitgeber, keine Rückkehr) und sie unter Prüfungsbedingungen durchführen',
    'Das Ergebnis richtig lesen: bestanden, mündliche Nachprüfung möglich oder nicht bestanden',
    'Aus den Fehlern einen konkreten Plan für die nächsten Tage ableiten',
  ],
  needs: ['simulation-teil-v', 'simulation-teil-b', 'simulation-teil-n', 'simulation-teil-e'],
  blocks: [
    {
      id: 'ablauf', type: 'text', title: 'So läuft die Komplett-Simulation',
      md: String.raw`
Die Komplett-Simulation bildet die schriftliche Prüfung zur Klasse E nach: **vier Teile in Folge**, jeder mit **25 Fragen** und **eigenem 45-Minuten-Zeitgeber**: Teil V (Vorschriften), Teil B (Betrieb), Teil N (Technik Einstieg) und Teil E (Technik Klasse E). Das sind **100 Fragen** und höchstens **4 × 45 = 180 Minuten** reine Bearbeitungszeit.[^bnetza-pruefungsordnung]

Auf der Plattform gelten dabei dieselben Regeln wie am Prüfungstag:

- **Je Teil ein eigener Zeitgeber.** Läuft er ab oder gibst du den Teil ab, erscheint eine Warteseite, danach geht es mit dem nächsten Teil weiter. Es gibt **keinen Weg zurück** in einen abgegebenen Teil.
- **Keine Rückmeldung** zu richtig oder falsch, bis die Prüfung beendet ist. Du kannst Fragen markieren und mit der Übersicht oder den Pfeiltasten springen.
- Die Fragen kommen zufällig aus dem Katalog (reihum über die Themen des Teils).

**Jetzt starten:** [Prüfungssimulation öffnen](#/s/amateurfunk/exam) und **„Komplette Prüfung“** wählen. Plane dafür einen **ungestörten Block von etwa drei Stunden** ein.`,
    },
    {
      id: 'mission-vorbereitung', type: 'callout', tone: 'mission', title: 'Funkpraxis: Wie am echten Prüfungstag',
      md: String.raw`Tu so, als wäre es die echte Prüfung: **Handy aus** (am Prüfungstag müssen elektronische Kommunikationsgeräte grundsätzlich ausgeschaltet sein), **nur Stift, Taschenrechner und die amtliche Formelsammlung**, dazu Entwurfspapier für Berechnungen. Keine Notizen, kein Nachschlagen in Lektionen. Nur so erfährst du, wie du *wirklich* unter Zeitdruck abschneidest, und kannst die Prüfungsangst dosieren.[^bnetza-pruefungsordnung]`,
    },
    {
      id: 'auswertung', type: 'text', title: 'Das Ergebnis lesen',
      md: String.raw`
Am Ende zeigt die Plattform je Teil die erreichten **Punkte gegenüber der Bestehensgrenze** und ein **Gesamtergebnis**. Die Regeln sind die der Prüfungsordnung:[^bnetza-pruefungsordnung]

<table>
<tr><th>Ergebnis</th><th>Bedingung</th><th>Folge</th></tr>
<tr><td><b>Bestanden</b></td><td>Alle vier Teile mit mindestens <b>19</b> von 25 Punkten</td><td>Prüfungsbescheinigung Klasse E</td></tr>
<tr><td><b>Mündliche Nachprüfung möglich</b></td><td><b>Genau ein</b> Teil verfehlt, aber dort mindestens <b>17</b> Punkte (also 17 oder 18)</td><td>Der Vorsitzende kann in diesem Teil mündlich nachprüfen</td></tr>
<tr><td><b>Nicht bestanden</b></td><td>Ein Teil unter 17 Punkten oder <b>mehr als ein</b> Teil unter 19</td><td>Nicht bestandene Teile können innerhalb von <b>24 Monaten</b> einzeln wiederholt werden; bestandene Teile bleiben</td></tr>
</table>

Nach der Simulation öffnest du die **Fehlerliste**: Zu jedem Fehler steht die richtige Antwort, gegebenenfalls eine Erklärung und der Link „Dazu die Lektion“. Danach bringt dich der Modus [Letzte Prüfung](#/s/amateurfunk/practice/last) mit genau diesen Fragen in die Übung zurück.`,
    },
    {
      id: 'demo-punkte', type: 'viz', viz: 'pruefungs-fahrplan', title: 'Demo: Punkte-Rechner',
      intro: 'Stelle die Punktzahlen der vier Teile ein und sieh, welches Gesamtergebnis dabei herauskommt.',
      params: { goals: ['pass', 'oral', 'fail'] },
      task: 'Spiele alle drei Ausgänge durch: **bestanden**, **mündliche Nachprüfung** und **nicht bestanden trotz drei bestandener Teile**.',
    },
    {
      id: 'quiz-ergebnis', type: 'quiz', title: 'Welches Gesamtergebnis?',
      question: 'Ergebnis einer Prüfung: Teil V 21 Punkte, Teil B 17 Punkte, Teil N 22 Punkte, Teil E 24 Punkte. Was folgt?',
      options: [
        { text: 'Nur Teil B wurde verfehlt, aber mit 17 Punkten: Eine mündliche Nachprüfung in Teil B ist möglich.', correct: true, why: 'Genau ein Teil unter 19, dort aber mindestens 17: Der Vorsitzende kann mündlich nachprüfen.' },
        { text: 'Bestanden, weil der Durchschnitt über 19 liegt.', why: 'Es zählt jeder Teil einzeln; der Durchschnitt spielt keine Rolle.' },
        { text: 'Nicht bestanden, eine mündliche Nachprüfung gibt es nie.', why: 'Die Nachprüfung gibt es bei genau einem verfehlten Teil mit mindestens 17 Punkten.' },
        { text: 'Nachprüfung in allen vier Teilen.', why: 'Nachgeprüft wird nur der eine verfehlte Teil.' },
      ],
    },
    {
      id: 'calc-dauer', type: 'numeric', title: 'Wie lange dauert die Prüfung höchstens?',
      question: 'Vier Teile mit je höchstens 45 Minuten Bearbeitungszeit: Wie viele Minuten reine Bearbeitungszeit sind das höchstens (ohne Wartezeiten und Pausen)?',
      answer: 180, tolerance: 0, unit: 'min',
      hint: 'Vier mal 45.',
      explain: '4 × 45 min = **180 min** = 3 Stunden. In dieser Zeit beantwortest du 100 Fragen, im Schnitt 1,8 Minuten je Frage.',
    },
    {
      id: 'match-ergebnis', type: 'match', title: 'Punkte → Folge',
      prompt: 'Ordne zu.',
      pairs: [
        ['19, 19, 19, 19 Punkte', 'bestanden'],
        ['25, 25, 25 und 18 Punkte', 'mündliche Nachprüfung im Teil mit 18 Punkten möglich'],
        ['25, 25, 25 und 16 Punkte', 'nicht bestanden, der Teil ist innerhalb von 24 Monaten zu wiederholen'],
        ['18 und 18 Punkte in zwei Teilen, sonst bestanden', 'nicht bestanden, keine Nachprüfung (zwei Teile verfehlt)'],
      ],
    },
    {
      id: 'order-simulation', type: 'order', title: 'Ablauf rund um die Simulation',
      prompt: 'Bringe die Schritte in die sinnvolle Reihenfolge.',
      items: [
        'Ruhigen Zeitblock von drei Stunden schaffen, Handy aus, Stift, Taschenrechner, Formelsammlung und Entwurfspapier bereitlegen',
        'Komplette Prüfung starten und Teil V, B, N und E nacheinander bearbeiten',
        'Ergebnis je Teil und Gesamtergebnis lesen',
        'Fehlerliste durchgehen und Fehler nach Thema und Ursache sortieren',
        'Fehler im Modus „Letzte Prüfung“ üben und schwache Lektionen nachlesen',
      ],
      explain: 'Vorbereiten, durchführen, auswerten, sortieren, üben. Eine Simulation ohne Aufarbeitung hat nur halben Wert.',
    },
    {
      id: 'recall-plan', type: 'recall', title: 'Nach der Komplett-Simulation',
      prompt: 'Mache jetzt die Komplett-Simulation. Trage danach ein: Punkte je Teil, Gesamtergebnis, die drei häufigsten Fehlerthemen und deinen Plan für die nächsten zwei Tage.',
      answer: 'Beispielantwort: „V 22, B 20, N 19, E 17: Teil E knapp verfehlt, mündliche Nachprüfung möglich. Fehlerthemen: Antennen und Leitungen, Störfestigkeit, Bauteile. Plan: morgen Modus Letzte Prüfung (alle Fehler), dann die Themenmodi für Antennen und Leitungen; übermorgen die Lektion Störende Beeinflussung nachlesen und die Teil-E-Simulation wiederholen.“ Wichtig: Teile einzeln bewerten und für jeden verfehlten Teil eine konkrete Maßnahme festlegen.',
      cards: ['kk-format', 'kk-ergebnis'],
    },
  ],
  cards: [
    { id: 'kk-format', front: 'Aufbau der schriftlichen Prüfung Klasse E?', back: 'Vier Teile **V, B, N, E**; je **25 Fragen**, höchstens **45 Minuten**; zusammen 100 Fragen, höchstens **180 Minuten**. Wer Klasse N hat, macht nur **E**.' },
    { id: 'kk-ergebnis', front: 'Wann ist die Prüfung bestanden?', back: 'Wenn **jeder** Teil mindestens **19 von 25** Punkten hat (ein Punkt je richtige Antwort).' },
    { id: 'kk-nachpruefung', front: 'Wann gibt es eine mündliche Nachprüfung?', back: 'Wenn **genau ein** Teil verfehlt wurde und dort mindestens **17 Punkte** erreicht sind (17 oder 18). Entscheidung: Vorsitzender.' },
    { id: 'kk-wiederholung', front: 'Was gilt bei nicht bestandenen Teilen?', back: 'Einzeln wiederholbar **innerhalb von 24 Monaten** nach Bekanntgabe des Ergebnisses; danach ist die Prüfung vollständig neu abzulegen.' },
    { id: 'kk-hilfsmittel', front: 'Hilfsmittel in der Prüfung?', back: 'Mitbringen: Stift, einfacher wissenschaftlicher oder nicht programmierbarer **Taschenrechner ohne Textspeicher**. Gestellt: Anlage 1 AFuV, Rufzeichenplan, IARU-Bandplanauszug 2 m/70 cm; in den Technikteilen **Formelsammlung** und Entwurfspapier.' },
    { id: 'kk-regeln', front: 'Welche Regeln gelten während der Prüfung?', back: 'Kommunikationsgeräte **aus**; Fragebögen und Formelsammlung **nicht beschriften**; alles am Teilende abgeben; **Berechnungen auf dem Entwurfspapier zählen nicht**; Täuschung führt zum Ausschluss.' },
    { id: 'kk-sim', front: 'Wie läuft die Komplett-Simulation der Plattform?', back: '4 Teile nacheinander, **je eigener 45-min-Zeitgeber**, Warteseite zwischen den Teilen, **kein Zurück**, Rückmeldung erst am Ende.' },
    { id: 'kk-nacharbeit', front: 'Was tust du direkt nach der Simulation?', back: 'Fehlerliste ansehen, nach Thema und Ursache sortieren, **„Letzte Prüfung“** üben, schwache Lektionen nachlesen.' },
  ],
};
