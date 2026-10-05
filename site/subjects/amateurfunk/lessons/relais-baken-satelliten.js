export default {
  id: 'relais-baken-satelliten',
  title: 'Relaisfunkstellen, Baken, Linkstrecken und Satelliten',
  summary: 'Wie Relais mit Eingabe, Ausgabe und Ablage arbeiten, wie man sie anständig benutzt, wozu Baken und Linkstrecken dienen und wie ein OSCAR-Transponder mit Uplink und Downlink funktioniert.',
  minutes: 25,
  goals: [
    'Erklären, warum eine [[relaisfunkstelle|Relaisfunkstelle]] Eingabe- und Ausgabefrequenz hat, und die Ablagen 10 m / 2 m / 70 cm / 23 cm samt Richtung angeben',
    'Relaisbetrieb korrekt abwickeln: kurze Durchgänge, Pause, Übergabe, Doppeln vermeiden, Narrow-FM, Rapport nur mit R',
    '[[funkbake|Funkbake]], [[digipeater|Digipeater]] und [[linkstrecke|Linkstrecke]] definieren und gegeneinander abgrenzen',
    'Satellitenbegriffe benutzen: OSCAR, [[transponder|Transponder]], Uplink, Downlink, Azimut, Elevation — und wissen, wo Verschlüsselung ausnahmsweise erlaubt ist',
  ],
  needs: [],
  blocks: [
    {
      id: 'intro', type: 'text', title: 'Ein Relais macht den Berg durchsichtig',
      md: `
Auf **[UKW](wiki:Ultrakurzwelle|Very high frequency)** (2 m, 70 cm) reichen Funkwellen ungefähr so weit, wie du „sehen“ kannst. Steht ein Berg zwischen dir und deinem Gesprächspartner, ist Schluss — wie bei Licht. Eine **Relaisfunkstelle** (kurz *Relais* oder [Repeater](wiki:Funkrelais|Amateur radio repeater)) löst das Problem: Sie steht an einem **exponierten Standort** — Berggipfel, Turm, Hochhaus —, den beide Stationen erreichen, und **sendet alles, was sie empfängt, sofort wieder aus**. Man erkennt Relais an ihrem regelmäßig gesendeten **Rufzeichen**; es beginnt meist mit **DB0, DM0 oder DO0**.[^darc-50ohm]

Die amtliche Definition (§ 2 Nr. 5 [[afuv|AFuV]]): Eine Relaisfunkstelle ist eine **fernbediente oder automatisch arbeitende** Amateurfunkstelle — auch in Satelliten —, die empfangene Aussendungen oder eingespeiste/eingespeicherte Inhalte **fernausgelöst wieder aussendet oder weiterleitet** und die **von jedem Funkamateur** mit den entsprechenden Frequenznutzungsrechten genutzt werden kann.[^afuv] Sie ist also keine ständig besetzte Station, sie läuft nicht mit dem persönlichen Rufzeichen eines Inhabers, und sie muss auch nicht zwingend auf einem Berg stehen — das sind Details, die in falschen Prüfungsantworten gern als Definition auftauchen.
`,
    },
    {
      id: 'eingabe-ausgabe', type: 'text', title: 'Eingabe, Ausgabe, Ablage',
      md: `
Ein Relais kann nicht gleichzeitig auf **derselben** Frequenz senden und empfangen — der eigene Sender würde den eigenen Empfänger zustopfen. Deshalb hat es **zwei Frequenzen**:

- **Eingabefrequenz**: hier **empfängt** das Relais (du **sendest** darauf).
- **Ausgabefrequenz**: hier **sendet** das Relais (du **hörst** darauf).

Der Abstand heißt **Frequenzablage** („Ablage“). In Deutschland üblich:[^darc-50ohm]

<table>
<thead><tr><th>Band</th><th>Ablage</th><th>Richtung deiner Sendefrequenz</th></tr></thead>
<tbody>
<tr><td>10 m</td><td>100 kHz</td><td>tiefer als Ausgabe (−)</td></tr>
<tr><td>**2 m**</td><td>**600 kHz**</td><td>tiefer als Ausgabe (**−**)</td></tr>
<tr><td>**70 cm**</td><td>**7,6 MHz**</td><td>tiefer als Ausgabe (**−**)</td></tr>
<tr><td>23 cm</td><td>28 MHz</td><td>tiefer als Ausgabe (−)</td></tr>
</tbody>
</table>

Beispiel 70 cm: Du hörst die **Ausgabe 438,875 MHz**. Dein Gerät muss mit **−7,6 MHz** senden, also auf der **Eingabe 431,275 MHz**. (Rechenweg: 438,875 − 7,6 = 431,275.) In Relaislisten steht die Ablage oft aus Sicht des Relais (Eingabe + 7,6 MHz = Ausgabe, „+7,6“), am Funkgerät stellst du sie aus deiner Sicht ein (Sendefrequenz gegenüber der Empfangsfrequenz „−7,6“). Merke einfach: bei **2 m und 70 cm sendest du tiefer, als du hörst**.

Bei den meisten Relais ist zusätzlich ein **Subton** ([CTCSS](wiki:Continuous Tone Coded Squelch System|Continuous Tone-Coded Squelch System): ein unhörbarer Dauerton unter der Sprache) nötig, damit das Relais öffnet; welcher, steht in der Relaisliste oder erfährt man vom nächsten Ortsverband. Eine Pflicht, das Relais auf der *Ausgabe* mit einem Tonruf zu öffnen, bevor es in Betrieb geht, ist dagegen nicht der Normalfall und kein Prinzip der Eingabe/Ausgabe.

Das Relais arbeitet für Sprache meist mit **[FM](wiki:Frequenzmodulation|Frequency modulation)** (analog), daneben mit digitalen Verfahren wie **[DMR](wiki:Digital Mobile Radio|Digital mobile radio)** und **[D-STAR](wiki:D-STAR|D-STAR)**. AM, SSB oder CW sind bei VHF/UHF-Sprachrelais nicht üblich.
`,
    },
    {
      id: 'viz-relais', type: 'viz', viz: 'relais-ablage', title: 'Relais-Simulator',
      params: {},
      task: 'Öffne ein **2-m-** und ein **70-cm-Relais** korrekt (Richtung **−**), erzeuge ein **Doppeln** und prüfe, dass **Simplex auf der Ausgabe** das Relais nicht öffnet.',
      caption: 'Beispielfrequenzen: 10 m 29,640 MHz, 2 m 145,6875 MHz, 70 cm 438,875 MHz, 23 cm 1298,150 MHz (Ausgabe).',
    },
    {
      id: 'num-ablage', type: 'numeric', title: 'Eingabefrequenz berechnen',
      question: 'Ein 70-cm-Relais hat die **Ausgabefrequenz 438,950 MHz**. Auf welcher Frequenz (in MHz) musst du senden?',
      answer: 431.35, tolerance: 0.001, unit: 'MHz',
      hint: 'Ablage bei 70 cm: 7,6 MHz, Sendefrequenz tiefer als die Ausgabe.',
      explain: '438,950 MHz − 7,6 MHz = 431,350 MHz.',
    },
    {
      id: 'num-ablage2', type: 'numeric', title: 'Und auf 2 m',
      question: 'Ein 2-m-Relais gibt auf **145,7125 MHz** aus. Auf welcher Frequenz (in MHz) musst du senden?',
      answer: 145.1125, tolerance: 0.0001, unit: 'MHz',
      explain: '145,7125 MHz − 0,6 MHz = 145,1125 MHz.',
    },
    {
      id: 'betrieb', type: 'text', title: 'Anständig über das Relais funken',
      md: `
Ein Relais ist **Gemeinschaftsbesitz**: Jeder Funkamateur mit zugeteiltem Rufzeichen darf es nutzen; der Betreiber darf einzelne Stationen **nur ausschließen, wenn das dem störungsfreien Betrieb dient** (nicht wegen Vielnutzung, fehlender Gebühr oder Alter) und muss die BNetzA informieren (§ 13 Abs. 4 AFuV).[^afuv] Und weil sich alle ein Relais teilen, gelten Benimmregeln:[^darc-50ohm]

- **Durchgänge kurz halten**: Besonders **Mobil- und Portabelstationen** bleiben oft nur kurz im Empfangsbereich. Eine feste Höchstzeit (z. B. 60 s) steht aber *nicht* in der AFuV; kurze Beiträge sind Höflichkeit, kein Gesetz. Auch die Kapazität der Sprachspeicher ist nicht der Grund.
- **Pause lassen**: Eine **kurze Pause vor jedem Durchgang** erleichtert es anderen, sich in eine laufende Runde „hereinzumelden“ (nicht ein Auftastton, nicht das Freihalten der Frequenzen).
- **Ordentliche Übergabe**: Nach dem Durchgang gibst du klar ab („… zurück an DL1XYZ“) und beginnst erst, wenn der Vorredner fertig ist. Das verhindert das **Doppeln**.
- **Doppeln**: Senden zwei FM-Stationen gleichzeitig gleich stark auf der Eingabe, überlagern sich die Signale. Auf der Ausgabe sind beide **bis zur Unlesbarkeit gestört** — nicht halbe Lautstärke, nicht abwechselnd, nicht „der Erste gewinnt“ (der FM-Empfänger *kann* bei einem deutlich stärkeren Signal das schwächere unterdrücken, bei gleich starken Signalen aber nicht). Mehr Leistung oder leichte Verstimmung helfen nicht.
- **Narrow-FM am Handfunkgerät** einstellen (FM-N, 12,5 kHz statt FM-W, 25 kHz): Zu breite Signale **stören benachbarte Eingaben** und das Relais gibt sie **verzerrt** wieder aus.
- **[Rapport](wiki:RST-System|R-S-T system)**: Über Relais wird nur die **Lesbarkeit (R)** beurteilt — die **Signalstärke (S)** am eigenen Empfänger ist die des **Relais**, nicht die des Gegenübers.
- **Leistung**: Oberhalb von **30 MHz** darf eine automatisch arbeitende Station höchstens **50 W ERP** abstrahlen (Anlage 1 AFuV) — nicht „100 W PEP“ oder 150 W.
`,
    },
    {
      id: 'order-relais', type: 'order', title: 'Ein Gespräch über das Relais',
      prompt: 'Bringe die Schritte eines höflichen Relais-QSOs in eine sinnvolle Reihenfolge.',
      items: [
        'Ausgabe, Ablage (−7,6 MHz) und Subton am Funkgerät einstellen, Narrow-FM wählen',
        'Zuhören, ob das Relais gerade frei ist',
        'Kurz mit Rufzeichen anrufen',
        'Kurzen Durchgang fahren und sauber an die Gegenstation übergeben',
        'Vor dem nächsten Durchgang kurz Pause lassen, damit sich andere melden können',
      ],
      explain: 'Erst die Parameter, dann zuhören, anrufen, kurz sprechen, übergeben und eine Pause lassen: So bleibt das Relais für alle nutzbar.',
    },
    {
      id: 'warn-relais', type: 'callout', tone: 'warning', title: 'Typische Fehlvorstellungen zu Relais',
      md: `
- „Das Relais empfängt auf der Ausgabe und sendet auf der Eingabe“ — Umgekehrt: **Eingabe = Relais empfängt**, **Ausgabe = Relais sendet**. (Eselsbrücke: Du **gibst** dem Relais etwas **ein**.)
- „Die Eingabe liegt **höher** als die Ausgabe“ (2 m +600 kHz, 70 cm +7,6 MHz) — Bei den deutschen 2-m- und 70-cm-Relais sendest du **tiefer**.
- „Bei 2 m 7,6 MHz und bei 70 cm 600 kHz“ — vertauscht: **2 m = 600 kHz, 70 cm = 7,6 MHz**.
- „Ein Relais braucht einen Tonruf, bevor es in Betrieb geht“ oder „stellt bei starker Belegung zusätzliche Ausgaben bereit“ — Nein.
- „Relaisdurchgänge darf nach AFuV höchstens 60 s dauern“ — Steht nicht in der Verordnung.
- „Bei Relais gebe ich **R und S**“ — nur **R**.
- „Wegen vermeintlich langer Nutzung oder zu junger Funkamateure darf der Relaisbetreiber ausschließen“ — Nur zum Schutz des **störungsfreien Betriebs**.
`,
    },
    {
      id: 'digi-link', type: 'text', title: 'Digipeater und Linkstrecken',
      md: `
Was für Sprache das Relais ist, ist für Daten der **Digipeater**: eine Station, die **empfangene Datenpakete** (z. B. bei [Packet Radio](wiki:Packet Radio|Packet radio)) **automatisch wieder aussendet** — ganz oder in Teilen, zeitversetzt oder wiederholt; dabei können einzelne Datenfelder **geändert** werden. Er setzt also nicht einfach das Frequenzband um (das wäre ein Transponder), er erzeugt keine Sprache, und er hat nichts mit einem IC zu tun, der Rufzeichen einfügt.[^darc-50ohm]

Eine **Linkstrecke** ist eine **fest eingerichtete Funkverbindung**, die zwei Amateurfunkstellen **vernetzt**, z. B. zwei Relaisfunkstellen oder ein [HAMNET](wiki:HAMNET)-Knoten mit dem nächsten. Sie arbeitet meist **im GHz-Bereich** mit Richtantennen und überträgt in der Regel Daten, kann aber auch als analoge Brücke zwischen Relais dienen. Da Linkstrecken **automatisch arbeitende Stationen** sind, brauchen sie ein **eigenes Rufzeichen und eine Zuteilung der BNetzA**.[^darc-50ohm] Die Leistung ist grundsätzlich auf 50 W ERP begrenzt; oberhalb von 1 GHz kann in besonders begründeten Fällen bis 1000 W ERP beantragt werden.[^afuv] Mit Telefonie-Einwahl, Protokollübersetzung (AX.25 ↔ TCP/IP) oder einer Link-Sammlung hat der Begriff nichts zu tun.
`,
    },
    {
      id: 'baken', type: 'text', title: 'Funkbaken: der Leuchtturm im Äther',
      md: `
Eine **[Funkbake](wiki:Funkbake|Electric beacon#Radio beacons)** ist eine **automatisch arbeitende Amateurfunk-Sendeanlage** (auch in Satelliten), die **selbsttätig ständig wiederkehrende Aussendungen zur Feldstärkebeobachtung oder zu Empfangsversuchen** erzeugt (§ 2 Nr. 6 AFuV).[^afuv] Meist sendet sie auf fester Frequenz von festem Standort **nur ihr Rufzeichen** in Morsetelegrafie.

Wozu? Weil die **Ausbreitungsbedingungen** ständig wechseln. Hörst du auf [Kurzwelle](wiki:Kurzwelle|High frequency) eine südamerikanische Bake gut, steht der Weg dorthin offen — jetzt ist QSO-Zeit. Eine **Aurora-Bake** auf VHF verrät, ob [Polarlicht](wiki:Polarlicht|Aurora)-Reflexionen nach Norden möglich sind; mit bekannten Baken auf VHF/UHF/SHF kannst du Antenne und Empfänger **prüfen und ausrichten**. Das ist die „häufige Anwendung“ von Baken: Beobachtung der Ausbreitungsbedingungen. Baken reservieren keine Frequenzen, stellen keine Empfangsberichte ins Netz und „ionisieren“ keine D-Schicht.

Das **Internationale Bakenprojekt (IBP)** hat Baken in vielen Ländern, die reihum jeweils einige Sekunden auf **derselben Frequenz** senden. Auf den **IBP-Frequenzen** sollst du **nie funken**, damit die Beobachtung möglich bleibt:[^darc-50ohm]

<table>
<thead><tr><th>Band</th><th>IBP-Bakenbereich</th></tr></thead>
<tbody>
<tr><td>20 m</td><td>14 099 – 14 101 kHz</td></tr>
<tr><td>17 m</td><td>18 109 – 18 111 kHz</td></tr>
<tr><td>15 m</td><td>21 149 – 21 151 kHz</td></tr>
<tr><td>12 m</td><td>24 929 – 24 931 kHz</td></tr>
<tr><td>10 m</td><td>28 190 – 28 225 kHz</td></tr>
</tbody>
</table>

Die Frequenzen kommen von der **IARU-Empfehlung** für den Bandplan. Mit HAMNET, DX-Verkehr oder Zeitzeichen haben sie nichts zu tun.
`,
    },
    {
      id: 'match-stationen', type: 'match', prompt: 'Welche automatische Station ist gemeint?',
      pairs: [
        ['Relaisfunkstelle', 'Sendet empfangene Sprache auf der Ausgabe wieder aus; Eingabe und Ausgabe sind verschieden'],
        ['Digipeater', 'Sendet empfangene Datenpakete wieder aus, ggf. zeitversetzt oder mit geänderten Datenfeldern'],
        ['Funkbake', 'Sendet selbsttätig regelmäßig, meist das Rufzeichen, zur Beobachtung der Ausbreitung'],
        ['Linkstrecke', 'Fest eingerichtete Funkverbindung zur Vernetzung von Stationen, z. B. HAMNET-Knoten'],
        ['Transponder im OSCAR', 'Setzt aufgenommene Signale in ein anderes Frequenzband um und sendet sie zur Erde'],
      ],
    },
    {
      id: 'sat-text', type: 'text', title: 'Satelliten: Das Relais im Orbit',
      md: `
Seit **1961** ([OSCAR 1](wiki:OSCAR 1|OSCAR 1)) gibt es [Amateurfunksatelliten](wiki:Amateurfunksatellit|Amateur radio satellite). Man nennt sie [[oscar|OSCAR]] — **O**rbiting **S**atellite **C**arrying **A**mateur **R**adio, ein Satellit mit Amateurfunkstelle an Bord. Das Relais an Bord heißt **[Transponder](wiki:Transponder|Transponder)**: ein **Umsetzer**, der die aufgenommenen Signale in einen **anderen Frequenzbereich** umsetzt und wieder zur Erde sendet. Er ist weder ein Stratosphärenballon, noch ein Wetterbild-Sender, noch eine Bake für Ausbreitungsbeobachtung.[^darc-50ohm]

- **Uplink**: Senderichtung von der **Erde zum Satelliten** (entspricht der **Eingabe**).
- **Downlink**: Senderichtung vom **Satelliten zur Erde** (entspricht der **Ausgabe**).

Warum liegen Up- und Downlink fast immer in **verschiedenen Bändern** (z. B. 70 cm hoch, 2 m runter)? Weil sich Sende- und Empfangssignal so **einfacher trennen** lassen und die **Filter** auf dem Satelliten **kleiner** ausfallen. (Nicht wegen Ionosphärendämpfung, nicht wegen Aufteilung der Bandbreite und auch nicht, um den [Doppler-Effekt](wiki:Dopplereffekt|Doppler effect) zu verringern.)

Um den Satelliten zu nutzen, musst du die Antenne **nachführen**. Dafür gibt es zwei Winkel:

- **[Azimut](wiki:Azimut|Azimuth)**: der **horizontale** Winkel der Antenne — Himmelsrichtung 0° = Nord, 90° = Ost, 180° = Süd, 270° = West.
- **Elevation**: der **vertikale** Winkel über dem Horizont — 0° = Horizont, 90° = senkrecht nach oben.

Ein erdnaher Satellit (LEO) zieht in Minuten über den Himmel: Er taucht im Azimut-Bereich irgendwo auf, steigt in der Elevation und sinkt wieder. Bei niedriger Elevation ist der Weg lang und der Empfang schwächer.

> **Verschlüsselung — die Ausnahme:** Amateurfunk läuft in **offener Sprache**; [Verschlüsselung](wiki:Verschlüsselung|Encryption) zur Verschleierung ist verboten. Erlaubt ist sie für **Steuersignale** zwischen Bodenstationen und Amateurfunksatelliten (RR Art. 25). Nach deutschem Recht gilt das zusätzlich für Steuersignale zu **fernbedienten oder automatisch arbeitenden Stationen** und zum **Remote-Betrieb** (§ 16 Abs. 8 AFuV).[^afuv] Vertrauliche Mitteilungen persönlicher Art oder „schützenswerte technische Sachverhalte“ gehören *nicht* dazu — auch nicht Verfahren, die durch ihre Codierung zufällig schwer lesbar sind, sofern jeder sie mit allgemein verfügbarer Technik wiederherstellen kann.
`,
    },
    {
      id: 'viz-sat', type: 'viz', viz: 'satelliten-ueberflug', title: 'Satelliten-Überflug',
      params: {},
      task: 'Erfasse den Satelliten **beim Aufgang** (Elevation unter 15°), im **Höchststand** (über 55°) und stelle eine Verbindung her: **senden** und über den Downlink hören.',
      caption: 'Vereinfachter Beispielüberflug mit Beispiel-Transponder (Uplink 70 cm, Downlink 2 m), kein echter Satellit.',
    },
    {
      id: 'mission-relais', type: 'callout', tone: 'mission', title: 'Funkpraxis: Dein erstes Relais-QSO',
      md: `
Mit **2 m, 5 W und einem Handfunkgerät** ist das Relais der klassische erste QSO-Weg: Suche in der Relaisliste das nächstgelegene 2-m-Relais (Ausgabe, Ablage −0,6 MHz, Subton), schalte auf **FM-N**, höre zu, und melde dich dann mit „**DL1XYZ hört**“ oder, wenn jemand in der Runde ist, in der Pause. Ein Rapport ohne S, einfach nur **R5**. Und beobachte nebenbei: Hörst du bei einem Satelliten-Überflug den Downlink, bist du schon fast dabei — mit Klasse E sind 2 m und 70 cm für Sende-Uplink erlaubt (**75 W PEP**, nicht zu verwechseln mit den 50 W ERP des Relais).

Prüfungsbezug: BE401–BE416, NE308–NE310, NE405, NF113, NF118, VD104, VD118, VD119, VD503, VD504, VA303.
`,
    },
    {
      id: 'quiz-sat', type: 'quiz', title: 'Satellit und Relais — richtig oder nur plausibel?',
      question: 'Welche Aussagen sind richtig? (Mehrfachauswahl)',
      options: [
        { text: 'Der Uplink ist die Senderichtung von der Erde zum Satelliten.', correct: true, why: 'Up = hinauf; entspricht der Eingabe.' },
        { text: 'Die Elevation ist der vertikale Winkel der Antenne.', correct: true, why: 'Azimut horizontal, Elevation vertikal.' },
        { text: 'Up- und Downlink liegen in verschiedenen Bändern, um den Doppler-Effekt zu verringern.', correct: false, why: 'Grund: einfachere Trennung und kleinere Filter auf dem Satelliten.' },
        { text: 'Über ein Relais gibt man nur die Lesbarkeit R an.', correct: true, why: 'Die Signalstärke bezieht sich auf das Relais.' },
        { text: 'Der Digipeater setzt Pakete nur auf ein anderes Frequenzband um und lässt ihren Inhalt unverändert.', correct: false, why: 'Das beschreibt einen Transponder; Digipeater können Datenfelder ändern.' },
        { text: 'Auf der IBP-Frequenz 14 100 kHz soll man keinen Funkbetrieb abwickeln.', correct: true, why: 'Frei halten für die Bakenbeobachtung.' },
      ],
    },
    {
      id: 'recall-sat', type: 'recall', title: 'In eigenen Worten',
      prompt: 'Erkläre einem Freund, wie ein Satelliten-Transponder und ein Relais auf dem Berg zusammenpassen: Welche Begriffe aus dem Relaisbetrieb entsprechen Uplink und Downlink, und wie richtest du die Antenne auf den Satelliten aus?',
      answer: 'Beide sind Umsetzer: Sie empfangen auf einer Frequenz (Relais: Eingabe, Satellit: Uplink, Erde→Satellit) und senden auf einer anderen wieder aus (Relais: Ausgabe, Satellit: Downlink, Satellit→Erde). Beim Satelliten sind Up- und Downlink meist in verschiedenen Bändern, damit Filter klein bleiben und sich Sende- und Empfangssignal leicht trennen lassen. Die Antenne wird in Azimut (horizontal, Himmelsrichtung) und Elevation (vertikal, Winkel über dem Horizont) nachgeführt.',
      cards: ['sat-uplink', 'sat-azel'],
    },
  ],
  cards: [
    { id: 'rel-eingabe', front: 'Eingabe- und Ausgabefrequenz eines Relais?', back: '**Eingabe**: Relais **empfängt** (du sendest). **Ausgabe**: Relais **sendet** (du hörst).' },
    { id: 'rel-ablage', front: 'Ablagen deutscher Relais: 10 m / 2 m / 70 cm / 23 cm?', back: '**100 kHz / 600 kHz / 7,6 MHz / 28 MHz**. Bei 2 m und 70 cm liegt die **Eingabe tiefer** als die Ausgabe.' },
    { id: 'rel-rapport', front: 'Rapport über Relais?', back: 'Nur die **Lesbarkeit (R)**; die Signalstärke bezieht sich auf das Relais.' },
    { id: 'rel-doppeln', front: 'Zwei gleich starke FM-Stationen gleichzeitig auf der Eingabe?', back: '**Doppeln**: beide sind auf der Ausgabe bis zur **Unlesbarkeit** gestört. Vermeiden: ordentliche **Übergabe**. Durchgänge kurz (für Mobil-/Portabelstationen) und **kurze Pause** vor jedem Durchgang; keine Zeitgrenze in der AFuV.' },
    { id: 'rel-leistung', front: 'Max. Strahlungsleistung eines Relais oberhalb 30 MHz?', back: '**50 W ERP** (Anlage 1 AFuV).' },
    { id: 'rel-fm', front: 'Modulation analoger VHF/UHF-Relais für Sprache; digitale Verfahren?', back: '**FM** (am Handfunkgerät Narrow-FM). Digital: **DMR, D-STAR**.' },
    { id: 'digi-def', front: 'Digipeater?', back: 'Station, die empfangene **Datenpakete** automatisch erneut aussendet (auch zeitversetzt/wiederholt, Datenfelder dürfen geändert werden).' },
    { id: 'link-def', front: 'Linkstrecke?', back: '**Fest eingerichtete Funkverbindung** zur Vernetzung von Stationen (Relais, HAMNET-Knoten), meist GHz; eigene Zuteilung.' },
    { id: 'bake-def', front: 'Funkbake und typische Anwendung?', back: 'Automatische Sendeanlage mit regelmäßigen Aussendungen zur **Feldstärkebeobachtung/Empfangsversuchen**; hilft bei der Beobachtung der **Ausbreitungsbedingungen**.' },
    { id: 'ibp', front: 'IBP-Frequenzen (KW)?', back: '14 099–14 101, 18 109–18 111, 21 149–21 151, 24 929–24 931, 28 190–28 225 kHz — für das **Internationale Bakenprojekt** freihalten.' },
    { id: 'sat-uplink', front: 'Uplink / Downlink / Transponder?', back: '**Uplink**: Erde→Satellit. **Downlink**: Satellit→Erde. **Transponder**: Umsetzer an Bord, der Signale in einen anderen Frequenzbereich umsetzt und wieder abstrahlt.' },
    { id: 'sat-azel', front: 'Azimut und Elevation?', back: '**Azimut** = horizontaler Winkel der Antenne (0° Nord, 90° Ost …). **Elevation** = vertikaler Winkel über dem Horizont.' },
    { id: 'sat-oscar', front: 'OSCAR?', back: '**O**rbiting **S**atellite **C**arrying **A**mateur **R**adio — Satellit mit Amateurfunkstelle an Bord (seit 1961).' },
    { id: 'verschl', front: 'Wo ist Verschlüsselung im Amateurfunk erlaubt?', back: 'Nur **Steuersignale** für Satelliten (RR) sowie in Deutschland auch für **fernbediente/automatische Stationen und Remote-Betrieb** (AFuV § 16 Abs. 8).' },
  ],
};
