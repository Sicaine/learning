export default {
  id: 'simulation-teil-v',
  title: 'Simulation Teil V: Kenntnisse von Vorschriften',
  summary: 'Teil V unter Prüfungsbedingungen: 25 Fragen aus dem V-Pool (204), 45 Minuten, 19 richtig. Mit Strategie, Zeitplan, Stichwort-Check und Merkliste der wichtigsten Rechtsfakten.',
  minutes: 45,
  goals: [
    'Den Aufbau von Teil V kennen (25 Fragen, 45 Minuten, 19 Punkte) und die Verteilung des Pools nach Rechtsgebieten einschätzen',
    'Schlüsselwörter in Rechtsfragen („nachvollziehbar“, „unverzüglich“, „auf Anforderung“ …) erkennen und richtig deuten',
    'Einen Zeitplan für 45 Minuten aufstellen und eine Teil-Simulation unter Prüfungsbedingungen durchführen',
    'Das Ergebnis auswerten und die Fehler gezielt aufarbeiten',
  ],
  needs: [],
  blocks: [
    {
      id: 'ablauf', type: 'text', title: 'So läuft Teil V',
      md: String.raw`
Teil V („Kenntnisse von Vorschriften“) ist der erste der vier schriftlichen Teile ([Amateurfunkprüfung](wiki:Amateurfunkprüfung)). Die Eckdaten:[^bnetza-pruefungsordnung]

<table>
<tr><th>Merkmal</th><th>Teil V</th></tr>
<tr><td>Fragen</td><td><b>25</b> Multiple-Choice-Fragen mit vier Antworten, genau eine richtig</td></tr>
<tr><td>Zeit</td><td>höchstens <b>45 Minuten</b></td></tr>
<tr><td>Bestehen</td><td><b>19 von 25</b> Punkten (ein Punkt je richtig beantworteter Frage; von Abzügen für falsche Antworten ist in der Prüfungsordnung nicht die Rede)</td></tr>
<tr><td>Mündliche Nachprüfung</td><td>möglich, wenn nur dieser Teil verfehlt wurde und <b>mindestens 17</b> Punkte erreicht sind</td></tr>
<tr><td>Hilfsmittel</td><td>Stift, Taschenrechner, dazu liegen aus: <b>Anlage 1 der AFuV</b>, <b>Rufzeichenplan</b>, <b>Auszüge aus dem IARU-Bandplan</b> (2 m und 70 cm). Die Formelsammlung gibt es nur in den Technikteilen.</td></tr>
</table>

Alle Fragen stammen aus dem amtlichen Katalog der [Bundesnetzagentur](wiki:Bundesnetzagentur|Federal Network Agency) (3. Auflage 2024); der V-Pool umfasst **204** Fragen.[^bnetza-fragenkatalog]

**Jetzt starten:** Öffne die [Prüfungssimulation](#/s/amateurfunk/exam) und wähle bei Teil V **„nur diesen Teil unter Prüfungsbedingungen“**. Zum Aufwärmen oder Nacharbeiten gibt es den Übungsmodus für den [ganzen Teil V](#/s/amateurfunk/practice/part:v). Nach der Simulation helfen dir die [Fehler der letzten Prüfung](#/s/amateurfunk/practice/last).`,
    },
    {
      id: 'schwerpunkte', type: 'text', title: 'Wo die Fragen herkommen',
      md: String.raw`
Der V-Pool verteilt sich auf fünf Themen: die [Radio Regulations](wiki:Radio Regulations|ITU Radio Regulations) der [Internationalen Fernmeldeunion](wiki:Internationale Fernmeldeunion|International Telecommunication Union), die Regelungen der [CEPT](wiki:CEPT|European Conference of Postal and Telecommunications Administrations), das [Amateurfunkgesetz](wiki:Amateurfunkgesetz), die [Amateurfunkverordnung](wiki:Amateurfunkverordnung) und weitere Vorschriften. Die Zahlen helfen dir, deinen Lernaufwand zu gewichten (in der Simulation kommen die Fragen reihum aus allen Themen):

<table>
<tr><th>Thema</th><th>Fragen im Pool</th><th>Anteil</th></tr>
<tr><td>Radio Regulations (ITU RR)</td><td>17</td><td>8 %</td></tr>
<tr><td>Regelungen der CEPT</td><td>14</td><td>7 %</td></tr>
<tr><td>Amateurfunkgesetz (AFuG)</td><td>25</td><td>12 %</td></tr>
<tr><td>Amateurfunkverordnung (AFuV)</td><td><b>97</b></td><td><b>48 %</b></td></tr>
<tr><td>Weitere Gesetze und Bestimmungen (EMVG, FuAG, TKG, TTDSG, BEMFV, Sicherheit …)</td><td>51</td><td>25 %</td></tr>
</table>

Zu den weiteren Gesetzen zählen das [Funkanlagengesetz](wiki:Funkanlagengesetz), das Gesetz über die [elektromagnetische Verträglichkeit](wiki:Elektromagnetische Verträglichkeit|Electromagnetic compatibility) und das [Fernmeldegeheimnis](wiki:Fernmeldegeheimnis); Verstöße sind teils [Ordnungswidrigkeiten](wiki:Ordnungswidrigkeit|Contravention). Die Verordnung und die weiteren Gesetze machen zusammen fast drei Viertel des Pools aus. Das ist die gute Nachricht: Die Zusammenhänge dort lassen sich **verstehen**, nicht nur auswendig lernen (z. B. die Idee „beide Seiten vorschriftsmäßig → Abhilfe in Zusammenarbeit“).`,
    },
    {
      id: 'fallen', type: 'text', title: 'Typische Fallen in Teil V',
      md: String.raw`
Rechtsfragen werden selten mit Zahlen gewonnen, sondern mit **genauem Lesen**:

- **Absolute Wörter** wie „immer“, „nie“, „ausschließlich“, „in jedem Fall“ sind meist ein Warnsignal. (Gegenbeispiel: „Jede vorhandene Gebäudeerdungsanlage kann verwendet werden“ ist richtig, weil das Gesetz es so sagt.)
- **Das Gesetz steht oft in der Frage.** „Nach der AFuV“, „im TTDSG“, „nach der BEMFV“: Die Antwort muss zum *genannten* Gesetz passen. Ein Tatbestand aus dem AFuG gehört nicht in die AFuV.
- **Zeitwörter** entscheiden: „vor Inbetriebnahme“ (Anzeige, neue Station), „unverzüglich nach der Änderung“ (Anschrift), „auf Anforderung“ (technische Unterlagen), „fortgesetzt“ (Widerruf).
- **Zahlen und Einheiten:** EIRP, nicht ERP und nicht Senderleistung; 19 von 25; 17 für die Nachprüfung; 24 Monate; bis zu 3 Monate im Ausland; 5.000 bzw. 10.000 €.
- **Bei Zuordnungsfragen** („Welche Folge …?“) auf die Stufe achten: Betriebseinschränkung, Widerruf, Geldbuße, Strafe sind vier verschiedene Dinge.

Hilfsmittel nutzen: **Anlage 1 AFuV** und **Rufzeichenplan** liegen aus; Fragen dazu sind Leseaufgaben, keine Gedächtnisaufgaben.`,
    },
    {
      id: 'match-stichwort', type: 'match', title: 'Stichwort → Bedeutung',
      prompt: 'Was verbirgt sich hinter diesen Schlüsselwörtern aus Rechtsfragen?',
      pairs: [
        ['„nachvollziehbar“ (Anzeige nach BEMFV)', 'verständlich dokumentiert, keine amtliche Zertifizierung nötig'],
        ['„unverzüglich nach der Änderung“', 'Anschrift und Name: nachträglich, ohne schuldhaftes Zögern'],
        ['„auf Anforderung der Bundesnetzagentur“', 'technische Unterlagen und Antennenskizze (AFuV § 16 Abs. 5)'],
        ['„fortgesetzte Verstöße“', 'Voraussetzung für den Widerruf der Zulassung (AFuG § 3 Abs. 4)'],
        ['„ab 10 W EIRP“', 'ortsfeste Station: Anzeige vor Inbetriebnahme (BEMFV § 9)'],
        ['„in Not- und Katastrophenfällen“', 'Ausnahme vom Verbot der Nachrichten für Dritte (AFuG § 5 Abs. 5)'],
      ],
    },
    {
      id: 'demo-zeit', type: 'viz', viz: 'zeit-planer', title: 'Demo: Dein Zeitplan für Teil V',
      intro: 'Stelle ein, wie schnell du bei Wissensfragen bist, wie viele Fragen du zurückstellst und wie viel Zeit du für Kontrolle brauchst. Die Werte sind Übungsannahmen, keine amtlichen Angaben.',
      params: { part: 'v' },
      task: 'Sieh einmal einen Plan, der die **45 Minuten sprengt**, und baue dann einen, der **mit mindestens 5 Minuten Puffer** passt.',
    },
    {
      id: 'calc-afuv', type: 'numeric', title: 'Wie groß ist das AFuV-Gewicht?',
      question: 'Der V-Pool hat 204 Fragen, davon 97 zur Amateurfunkverordnung. Wie viel Prozent sind das?',
      answer: 47.5, tolerance: 0.2, unit: '%',
      hint: '97 durch 204, mal 100.',
      explain: '97 / 204 · 100 % ≈ **47,5 %**: fast jede zweite Frage in Teil V dreht sich um die AFuV. Wer die Verordnung beherrscht, hat die halbe Miete.',
    },
    {
      id: 'order-frage', type: 'order', title: 'Vorgehen bei jeder Frage',
      prompt: 'Bringe die Schritte bei einer Rechtsfrage in eine sinnvolle Reihenfolge.',
      items: [
        'Frage vollständig lesen und Schlüsselwörter markieren (nur, immer, vor, unverzüglich, Gesetz)',
        'Antworten vergleichen und offensichtlich falsche streichen',
        'Aus den übrigen die Antwort wählen, die zum genannten Gesetz und zum Zeitwort passt',
        'Ankreuzen; bei Unsicherheit eine Vermutung eintragen und die Frage zur Kontrolle markieren',
      ],
      explain: 'Erst lesen, dann streichen, dann entscheiden, dann ankreuzen. Eine Vermutung kann einen Punkt bringen, ein leeres Feld bringt sicher keinen.',
    },
    {
      id: 'quiz-gesetz', type: 'quiz', title: 'Welches Gesetz?',
      question: 'Eine Frage lautet sinngemäß: „Welches Gesetz regelt das Verfahren zum Schutz von Personen in den Feldern ortsfester Amateurfunkstellen?“ Welche Antwort passt?',
      options: [
        { text: 'Die Verordnung über das Nachweisverfahren zur Begrenzung elektromagnetischer Felder (BEMFV).', correct: true, why: 'Das Anzeigeverfahren und der Sicherheitsabstand stehen in der BEMFV, die Grenzwerte in der 26. BImSchV.' },
        { text: 'Das Amateurfunkgesetz (AFuG).', why: 'Das AFuG enthält nur den Hinweis auf die Standortbescheinigung, nicht das Verfahren.' },
        { text: 'Die Radio Regulations der ITU.', why: 'Die RR sind internationale Funkregeln, kein Verfahren zum Personenschutz.' },
        { text: 'Das Funkanlagengesetz (FuAG).', why: 'Das FuAG regelt das Inverkehrbringen von Funkanlagen.' },
      ],
    },
    {
      id: 'recall-auswertung', type: 'recall', title: 'Nach der Simulation',
      prompt: 'Mache jetzt die Simulation von Teil V (siehe Link oben). Trage danach ein: Punktzahl, die zwei Themen mit den meisten Fehlern und eine Konsequenz für die nächsten zwei Tage.',
      answer: 'Beispielantwort: „21 von 25. Die Fehler lagen bei Weitere Gesetze (BEMFV, Abhörverbot). Konsequenz: Lektion Personenschutz und Rechte/Pflichten noch einmal lesen, danach den Modus Letzte Prüfung und die Fragen der Lektion üben.“ Wichtig ist, dass du die Fehler nach Thema sortierst und eine konkrete Maßnahme mit Termin festlegst.',
      cards: ['sv-bestehen', 'sv-owi'],
    },
  ],
  cards: [
    { id: 'sv-bestehen', front: 'Teil V: Fragen, Zeit, Bestehensgrenze, Nachprüfung?', back: '**25 Fragen, 45 min, 19 Punkte.** Nachprüfung (mündlich) bei genau einem verfehlten Teil mit **mindestens 17 Punkten**.' },
    { id: 'sv-rr', front: 'Radio Regulations: Was regeln sie für den Amateurfunk?', back: 'Definition des **Amateurfunkdienstes**, **Regionen** (3; Deutschland Region 1, Kanada 2, Australien 3), **Präfixe** und **Q-Gruppen**; Morseprüfung ist **national** geregelt.' },
    { id: 'sv-cept', front: 'CEPT: HAREC, Novice, Dauer, Zusatz?', back: '**HAREC** = Klasse A (T/R 61-02). **Novice** (Klasse E) gilt in Ländern mit ECC-Empfehlung (05)06. **Klasse N** nur in Deutschland. Bis zu **3 Monate** je Aufenthalt, Zusatz **DL/** oder **DO/**; Klubstation braucht Gastgenehmigung.' },
    { id: 'sv-zulassung', front: 'Zeugnis, Zulassung, Rufzeichen: Was braucht man zum Senden?', back: 'Prüfung bestanden **und Zulassung** mit personengebundenem **Rufzeichen** (nicht übertragbar; kein Mindestalter im AFuG). Betrieb ohne sie: Ordnungswidrigkeit.' },
    { id: 'sv-befugnis', front: 'Welche Grenzen setzt AFuG § 5 dem Funkverkehr?', back: 'Nur mit Amateurfunkstellen, nur auf zugeteilten Frequenzen, **nicht gewerblich-wirtschaftlich**, **nicht geschäftsmäßig TK-Dienste**; **Nachrichten für Dritte nur im Not- und Katastrophenfall**.' },
    { id: 'sv-owi', front: 'Ordnungswidrigkeiten nach AFuG § 9?', back: 'Betrieb ohne Zulassung/Rufzeichen und Nachrichten an Dritte (bis **5.000 €**); geschäftsmäßige TK-Dienste (bis **10.000 €**). Nach TKG: Frequenznutzung ohne Zuteilung.' },
    { id: 'sv-widerruf', front: 'Widerruf, Einschränkung, Strafe: Wer löst was aus?', back: '**Widerruf** der Zulassung: fortgesetzte Verstöße. **Einschränkung/Außerbetriebnahme:** Verstoß gegen AFuG/AFuV. **Strafe:** Abhören (TTDSG).' },
    { id: 'sv-abhoer', front: 'Welche Nachrichten darfst du empfangen und weitergeben?', back: 'Empfangen: für den **Betreiber, Funkamateure, Allgemeinheit, unbestimmten Personenkreis**. Inhalt und Tatsache anderer Nachrichten **nicht mitteilen** (außer Not-/Katastrophenfall).' },
    { id: 'sv-selbstbau', front: 'Selbstbau und CE-Kennzeichen?', back: 'Selbstbau, Umbau und Bausätze: **erlaubt, kein FuAG, kein CE**. Seriengeräte im Handel: **FuAG und CE** (auch Empfänger).' },
    { id: 'sv-emv', front: 'Welche EMV-Anforderung darfst du lockern?', back: 'Die **Störfestigkeit** selbst bestimmen (AFuG § 7). **Störaussendung** bleibt Pflicht. Beide Seiten korrekt, Störung bleibt: BNetzA veranlasst **Abhilfe in Zusammenarbeit**.' },
    { id: 'sv-bemfv', front: 'BEMFV: Wer muss was wann tun?', back: '**Ortsfeste** Anlage ab **10 W EIRP**: **vor Inbetriebnahme** anzeigen bei der zuständigen **Außenstelle**; Sicherheitsabstand rechnen/messen, im kontrollierbaren Bereich; Unterlagen **bereithalten**.' },
    { id: 'sv-anschrift', front: 'Meldepflichten bei Änderungen?', back: 'Name/Anschrift: **unverzüglich nach** der Änderung (auch ohne Station). Neue ortsfeste Station oder dauerhafte Standortverlegung: **vor Inbetriebnahme** anzeigen.' },
  ],
};
