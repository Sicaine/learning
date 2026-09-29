export default {
  id: 'rechtsordnung',
  title: 'Die Rechtsordnung',
  summary: 'Öffentliches Recht, Zivilrecht, Strafrecht — welche Gerichte es gibt, wer in Karlsruhe, Erfurt oder Kassel entscheidet und was man ab welchem Alter darf.',
  minutes: 20,
  goals: [
    '[[oeffentliches-recht|Öffentliches Recht]], [[zivilrecht]] und [[strafrecht]] unterscheiden',
    'Die fünf [[gerichtsbarkeiten]] und ihre obersten Bundesgerichte nennen',
    'Berufung und Revision im [[instanzenzug]] unterscheiden',
    'Grundsätze wie [[unschuldsvermutung]] und „keine Strafe ohne Gesetz“ erklären',
  ],
  blocks: [
    {
      id: 'drei-gebiete', type: 'text', title: 'Drei große Rechtsgebiete',
      md: `
Das deutsche Recht wird klassisch in drei Bereiche eingeteilt:

- **[[zivilrecht|Zivilrecht]]** (Privatrecht): Rechtsbeziehungen zwischen **gleichgeordneten** Personen — Kaufverträge, Miete, Arbeitsverträge, Eigentum, Ehe, Erbe. Kernstück ist das **Bürgerliche Gesetzbuch (BGB)**, in Kraft seit dem **1. Januar 1900**.[^bgb-text]
- **[[oeffentliches-recht|Öffentliches Recht]]**: das Verhältnis zwischen **Bürger und Staat**, bei dem der Staat hoheitlich handelt — Steuerbescheid, Baugenehmigung, Führerscheinentzug. Dazu gehören Verfassungs-, Verwaltungs-, Steuer- und Sozialrecht.
- **[[strafrecht|Strafrecht]]**: legt fest, was strafbar ist und welche Strafe droht. Grundlage ist das **Strafgesetzbuch (StGB)**, im Kern von **1871**.[^stgb-text] Streng genommen ist Strafrecht ein Teil des öffentlichen Rechts, wird aber wegen seiner Bedeutung meist eigens genannt.

Ein Beispiel zeigt den Unterschied: Fährt jemand betrunken ein fremdes Auto an, geht es **strafrechtlich** um Trunkenheit im Verkehr (Staatsanwaltschaft klagt an), **zivilrechtlich** um Schadensersatz für den Autobesitzer (der selbst klagen muss) und **öffentlich-rechtlich** um den Entzug der Fahrerlaubnis durch die Behörde.`,
    },
    {
      id: 'match-gebiete', type: 'match', title: 'Welches Rechtsgebiet?',
      pairs: [
        ['Der Vermieter verlangt ausstehende Miete', 'Zivilrecht'],
        ['Die Stadt verweigert eine Baugenehmigung', 'Öffentliches Recht'],
        ['Die Staatsanwaltschaft klagt einen Dieb an', 'Strafrecht'],
        ['Streit ums Erbe unter Geschwistern', 'Erbrecht (Teil des BGB)'],
      ],
    },
    {
      id: 'gerichte', type: 'text', title: 'Fünf Gerichtsbarkeiten',
      md: `
Für jeden Rechtsbereich gibt es eigene Gerichte — die fünf **[[gerichtsbarkeiten|Gerichtsbarkeiten]]** (Art. 95 GG), jeweils mit einem obersten Bundesgericht:[^wiki-gerichte]

<table>
<tr><th>Gerichtsbarkeit</th><th>zuständig für</th><th>oberstes Gericht</th><th>Sitz</th></tr>
<tr><td>ordentliche</td><td>Zivil- und Strafsachen</td><td>Bundesgerichtshof (BGH)</td><td>Karlsruhe</td></tr>
<tr><td>Arbeits-</td><td>Streit aus dem Arbeitsverhältnis</td><td>Bundesarbeitsgericht</td><td>Erfurt</td></tr>
<tr><td>Verwaltungs-</td><td>Streit mit Behörden</td><td>Bundesverwaltungsgericht</td><td>Leipzig</td></tr>
<tr><td>Sozial-</td><td>Rente, Krankenkasse, Grundsicherung</td><td>Bundessozialgericht</td><td>Kassel</td></tr>
<tr><td>Finanz-</td><td>Steuern</td><td>Bundesfinanzhof</td><td>München</td></tr>
</table>

In der **ordentlichen Gerichtsbarkeit** führt der Weg über **Amtsgericht → Landgericht → Oberlandesgericht → [[bundesgerichtshof|Bundesgerichtshof]]**. Welches Gericht in erster Instanz zuständig ist, hängt vom Streitwert bzw. der Schwere der Tat ab.

Über allem — aber nicht als weitere Instanz — steht das [[bundesverfassungsgericht]]: Es prüft nur, ob Grundrechte oder das Grundgesetz verletzt wurden.`,
    },
    {
      id: 'match-orte', type: 'match', title: 'Bundesgerichte und ihre Städte',
      pairs: [
        ['Bundesgerichtshof', 'Karlsruhe'],
        ['Bundesarbeitsgericht', 'Erfurt'],
        ['Bundesverwaltungsgericht', 'Leipzig'],
        ['Bundessozialgericht', 'Kassel'],
        ['Bundesfinanzhof', 'München'],
      ],
    },
    {
      id: 'instanzen', type: 'text', title: 'Berufung und Revision',
      md: `
Wer mit einem Urteil nicht einverstanden ist, kann es meist anfechten — so entsteht der **[[instanzenzug|Instanzenzug]]**:

- **Berufung**: Die nächsthöhere Instanz verhandelt den Fall noch einmal, prüft also **Tatsachen und Recht**.
- **Revision**: Die höchste Instanz prüft **nur noch Rechtsfehler** — sie hört keine Zeugen mehr.

Ist kein Rechtsmittel mehr möglich oder läuft die Frist ab, wird das Urteil **rechtskräftig**.`,
    },
    {
      id: 'order-instanz', type: 'order', title: 'Der Weg durch die Instanzen',
      prompt: 'Ein Zivilstreit mit hohem Streitwert beginnt am Landgericht. Ordne den weiteren Weg.',
      items: [
        'Klage am Landgericht (1. Instanz)',
        'Berufung zum Oberlandesgericht',
        'Revision zum Bundesgerichtshof',
        'Urteil wird rechtskräftig',
        'Verfassungsbeschwerde beim Bundesverfassungsgericht (nur bei Grundrechtsverletzung)',
      ],
      explain: 'Die Verfassungsbeschwerde ist kein normales Rechtsmittel: Sie setzt voraus, dass der Rechtsweg erschöpft ist, und prüft nur, ob Grundrechte verletzt wurden.',
    },
    {
      id: 'grundsaetze', type: 'text', title: 'Grundsätze des Rechtsstaats',
      md: `
Einige Prinzipien sollte jeder kennen:

- **Keine Strafe ohne Gesetz** (*nulla poena sine lege*, Art. 103 Abs. 2 GG): Bestraft werden darf nur, was **zur Tatzeit** bereits strafbar war.
- **[[unschuldsvermutung|Unschuldsvermutung]]**: Jeder gilt als unschuldig, bis seine Schuld rechtskräftig festgestellt ist; im Zweifel für den Angeklagten (*in dubio pro reo*).
- **Keine Todesstrafe** (Art. 102 GG, seit 1949).
- **Anspruch auf rechtliches Gehör** und den gesetzlichen Richter: Niemand darf seinem zuständigen Richter entzogen werden.
- **Unabhängigkeit der Richter**: Sie sind nur dem Gesetz unterworfen (Art. 97 GG). An Strafverfahren wirken oft auch Laienrichter mit, die **Schöffen**.`,
    },
    {
      id: 'alter', type: 'text', title: 'Was darf man ab welchem Alter?',
      md: `
Das Recht knüpft viel an das Alter:

- **ab 7**: beschränkt geschäftsfähig — kleine Käufe vom Taschengeld sind wirksam („Taschengeldparagraf“), sonst braucht es die Eltern ([[geschaeftsfaehigkeit]]).
- **ab 14**: **strafmündig**; bis 17 gilt Jugendstrafrecht, bis 20 kann es für Heranwachsende noch angewandt werden. Außerdem Religionsmündigkeit.
- **ab 18**: volljährig und voll geschäftsfähig (seit 1975, vorher mit 21), Wahlrecht bei der Bundestagswahl.`,
    },
    {
      id: 'numeric-bgb', type: 'numeric', title: 'Ein altes Gesetzbuch',
      question: 'Das BGB trat am 1. Januar 1900 in Kraft. Wie viele Jahre galt es am 1. Januar 2026?',
      answer: 126, tolerance: 0, unit: 'Jahre',
      explain: '2026 − 1900 = **126 Jahre**. Das BGB hat Kaiserreich, Weimar, NS-Zeit, DDR (dort 1976 durch das Zivilgesetzbuch ersetzt) und Wiedervereinigung überdauert — natürlich mit vielen Reformen.',
    },
    {
      id: 'quiz-recht', type: 'quiz', title: 'Recht im Alltag',
      question: 'Welche Aussagen stimmen?',
      options: [
        { text: 'Ein Zwölfjähriger kann für einen Ladendiebstahl nicht strafrechtlich verurteilt werden.', correct: true, why: 'Strafmündig ist man erst mit 14.' },
        { text: 'Der Bundesgerichtshof und das Bundesverfassungsgericht sind dasselbe Gericht.', correct: false, why: 'Beide sitzen in Karlsruhe, sind aber verschiedene Gerichte mit ganz unterschiedlichen Aufgaben.' },
        { text: 'Bei einem Streit mit der Krankenkasse ist das Sozialgericht zuständig.', correct: true, why: 'Kranken-, Renten- und Arbeitslosenversicherung sowie Grundsicherung gehören vor die Sozialgerichte.' },
        { text: 'Im Zivilprozess klagt die Staatsanwaltschaft.', correct: false, why: 'Im Zivilprozess klagen die Parteien selbst; die Staatsanwaltschaft gibt es nur im Strafverfahren.' },
      ],
    },
    {
      id: 'fact-bgh-bverfg', type: 'callout', tone: 'fact', title: 'Warum sitzen beide in Karlsruhe?',
      md: `Nach dem Krieg wollte man die obersten Gerichte bewusst **nicht** in der Hauptstadt Bonn ansiedeln — auch als Zeichen der Unabhängigkeit der Justiz und zur Stärkung des Föderalismus. Karlsruhe, bis 1945 Hauptstadt des Landes Baden, bekam 1950 den Bundesgerichtshof und 1951 das Bundesverfassungsgericht und nennt sich seither gern „Residenz des Rechts“.`,
    },
    {
      id: 'recall-recht', type: 'recall', title: 'Erkläre es',
      prompt: 'Ein Autofahrer fährt betrunken in einen Gartenzaun. Welche **drei** Rechtsgebiete sind betroffen, und wer ist jeweils „Gegner“ des Fahrers?',
      answer: `**Strafrecht**: Trunkenheit im Verkehr ist strafbar; der Staat, vertreten durch die **Staatsanwaltschaft**, klagt an, ein Strafgericht urteilt. **Zivilrecht**: Der Zaunbesitzer kann **Schadensersatz** verlangen — er muss selbst (bzw. gegenüber der Versicherung) vorgehen. **Öffentliches Recht**: Die **Fahrerlaubnisbehörde** kann den Führerschein entziehen oder eine MPU anordnen; dagegen könnte der Fahrer vor dem Verwaltungsgericht klagen.`,
      hints: ['Strafe, Schadensersatz, Führerschein.'],
      cards: ['drei-gebiete'],
    },
  ],
  cards: [
    { id: 'drei-gebiete', front: 'Die drei großen Rechtsgebiete', back: 'Zivilrecht (Privatrecht), öffentliches Recht, Strafrecht.' },
    { id: 'zivil', front: 'Was regelt das Zivilrecht — und welches Gesetzbuch ist sein Kern?', back: 'Beziehungen zwischen gleichgeordneten Personen (Verträge, Eigentum, Familie, Erbe); Kern ist das **BGB**.' },
    { id: 'bgb', front: 'Seit wann gilt das BGB?', back: 'Seit dem **1. Januar 1900**.' },
    { id: 'stgb', front: 'Aus welchem Jahr stammt das Strafgesetzbuch im Kern?', back: '**1871** (Reichsstrafgesetzbuch).' },
    { id: 'oeffentlich', front: 'Was kennzeichnet das öffentliche Recht?', back: 'Das Verhältnis Bürger–Staat, in dem der Staat **hoheitlich** handelt (z. B. Steuerbescheid, Baugenehmigung).' },
    { id: 'fuenf', front: 'Die fünf Gerichtsbarkeiten', back: 'Ordentliche (Zivil/Straf), Arbeits-, Verwaltungs-, Sozial-, Finanzgerichtsbarkeit.' },
    { id: 'bgh', front: 'Oberstes Gericht für Zivil- und Strafsachen — und sein Sitz?', back: '**Bundesgerichtshof**, **Karlsruhe**.' },
    { id: 'orte', front: 'Sitz von BAG, BVerwG, BSG, BFH', back: 'Bundesarbeitsgericht **Erfurt**, Bundesverwaltungsgericht **Leipzig**, Bundessozialgericht **Kassel**, Bundesfinanzhof **München**.' },
    { id: 'ordentlich', front: 'Instanzen der ordentlichen Gerichtsbarkeit', back: 'Amtsgericht → Landgericht → Oberlandesgericht → Bundesgerichtshof.' },
    { id: 'berufung', front: 'Unterschied Berufung / Revision', back: 'Berufung: Tatsachen **und** Recht werden neu geprüft. Revision: **nur Rechtsfehler**.' },
    { id: 'nulla', front: 'Was bedeutet „nulla poena sine lege“?', back: '**Keine Strafe ohne Gesetz**: Strafbar ist nur, was zur Tatzeit gesetzlich verboten war (Art. 103 Abs. 2 GG).' },
    { id: 'unschuld', front: 'Was besagt die Unschuldsvermutung?', back: 'Jeder gilt als unschuldig, bis seine Schuld rechtskräftig nachgewiesen ist; im Zweifel für den Angeklagten.' },
    { id: 'strafmuendig', front: 'Ab wann ist man strafmündig?', back: 'Ab **14 Jahren** (bis 17 Jugendstrafrecht, bis 20 möglich).' },
    { id: 'geschaeft', front: 'Stufen der Geschäftsfähigkeit', back: 'Unter 7: geschäftsunfähig. 7–17: beschränkt geschäftsfähig. Ab 18: voll geschäftsfähig.' },
    { id: 'todesstrafe', front: 'Wo ist die Abschaffung der Todesstrafe geregelt?', back: 'In **Art. 102 GG** (seit 1949).' },
  ],
};
