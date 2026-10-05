export default {
  id: 'beeinflussung-elektronischer-geraete',
  title: 'Störende Beeinflussung elektronischer Geräte',
  summary: 'Wie die HF deines Senders in fremde Geräte gelangt (Einstrahlung, Einströmung), was Übersteuerung, Intermodulation und Gleichrichtung bedeuten und welche Abhilfe wo wirkt: Abschirmung, Filter, Mantelwellensperre, geschirmte Leitungen.',
  minutes: 25,
  goals: [
    '[[einstrahlung|Einstrahlung]] und [[einstroemung|Einströmung]] unterscheiden und typische Eindringwege nennen',
    '[[uebersteuerung|Übersteuerung]], [[intermodulation|Intermodulation]] und [[hf-gleichrichtung|Gleichrichtung von HF]] als Ursachen erkennen und ihre Anzeichen beschreiben',
    'Zu einem Störfall die passende Abhilfe wählen: Metallgehäuse, geschirmte Leitung, Hochpass, [[mantelwellensperre|Mantelwellensperre]], Außenantenne',
    'Das Vorgehen bei der Beschwerde eines Nachbarn über Fernsehstörungen in der richtigen Reihenfolge angeben',
  ],
  needs: ['elektrotechnik/emv'],
  blocks: [
    {
      id: 'intro', type: 'text', title: 'Drei Gründe, warum fremde Geräte spinnen',
      md: String.raw`
Ein Funkamateur der Klasse E sendet mit bis zu 100 W PEP auf den freigegebenen Kurzwellenbändern und 75 W PEP auf 2 m und 70 cm (Anlage 1 AFuV, Stand 05.10.2026).[^afuv] Diese Leistung kann in fremden Geräten Unheil anrichten, **selbst wenn dein Sender alle Vorschriften einhält**. Die Ursachen lassen sich in drei Gruppen einteilen:[^darc-50ohm]

1. **Unerwünschte Frequenzanteile**, die nicht ausreichend unterdrückt werden, zum Beispiel eine Oberwelle deines KW-Senders im UKW-Rundfunk- oder Fernsehbereich. Das ist eine *Störung* durch unerwünschte Aussendungen (siehe die Lektion über unerwünschte Aussendungen).
2. **Unzureichend [abgeschirmte](wiki:Abschirmung (Elektrotechnik)|Electromagnetic shielding) oder geerdete Geräte**, in die die HF einfach hineinläuft.
3. **Die gewünschten Aussendungen selbst**: Schon das reine Nutzsignal kann einen Empfänger auf *anderen* Frequenzen beeinflussen. Man spricht von **[[uebersteuerung|Übersteuerung]]** oder **störender Beeinflussung**. Sie ist nicht deine „Schuld“ im Sinne eines Verstoßes (siehe Lektion zu EMV, Fall 2 und 3), aber dein Problem, sobald der Nachbar klingelt.

Diese Lektion behandelt die Gruppen 2 und 3 und die Gegenmittel. Wer die Eindringwege kennt, kann die richtige Abhilfe schnell finden.`,
    },
    {
      id: 'wege', type: 'text', title: 'Einstrahlung oder Einströmung?',
      md: String.raw`
Die HF kann auf zwei grundlegend verschiedene Arten in ein Gerät kommen:[^darc-50ohm]

<table>
<tr><th></th><th>Einstrahlung</th><th>Einströmung</th></tr>
<tr><td>Weg</td><td>als **Funkwelle** direkt in die Elektronik: über die **Empfangsantenne** *oder* durch ein **ungenügend geschirmtes Gehäuse** (Direkteinstrahlung)</td><td>als **Strom auf Leitungen und Kabeln**: Netzzuleitung, Antennenzuleitung, Lautsprecherkabel, Steuerleitung …</td></tr>
<tr><td>Merkhilfe</td><td>Die Welle springt über die Luft.</td><td>Die HF läuft an der Leitung entlang ins Gerät.</td></tr>
</table>

Die Wege können einzeln oder gemeinsam auftreten. Weil Leitungen als **[Antennen](wiki:Antenne|Antenna (radio))** wirken (sie sind meist lang genug, um bei HF Spannung aufzunehmen), spielt die Einströmung in der Praxis eine große Rolle. Auch **Metallgehäuse mit Schlitzen**, offene Deckel und lange Zuleitungen sind Schwachstellen.

<div class="figure-note" style="font-size:.9rem;color:var(--muted)">Merke: <b>Ein</b>strahlung heißt <i>Strahlung</i> (Welle, durch die Luft); <b>Ein</b>strömung heißt <i>Strom</i> (auf der Leitung). Das ist die häufigste Falle in den Prüfungsfragen.</div>`,
    },
    {
      id: 'warn-wege', type: 'callout', tone: 'warning', title: 'Typische Verwechslungen',
      md: String.raw`- **Einströmung ist nicht „schlechtes SWR“.** Hochfrequenz, die wegen schlechter Anpassung zum Sender *zurückläuft*, nennt man reflektierte Leistung, nicht Einströmung.
- **Ungenügend geschirmte Kabel zum Anpassgerät** sind kein Fall von Einströmung ins *gestörte* Gerät, sondern ein Problem deiner Station.
- **Einstrahlung über das Gehäuse** ist etwas anderes als Einströmung über Leitungen; beide gehören nicht in einen Topf.
- **Prüfungsbezug:** EJ101, EJ102.`,
    },
    {
      id: 'mission-schlitz', type: 'callout', tone: 'mission', title: 'Funkpraxis: Der Hi-Fi-Verstärker singt mit',
      md: String.raw`Jeder Funkamateur kennt die Geschichte vom Hi-Fi-Verstärker, der Sprache aus dem Lautsprecher wiedergibt, obwohl er eigentlich aus ist oder ein CD-Spieler läuft. Dein Sender und dein Nachbar haben dann nichts „falsch“ gemacht: Die Lautsprecherleitungen sammeln HF ein, und irgendein Transistor demoduliert sie. Das Gegenmittel liegt fast immer beim Nachbarn (geschirmte Leitung, Ferrit), aber **du** erarbeitest die Lösung, weil du die Ursache verstehst.`,
    },
    {
      id: 'uebersteuerung', type: 'text', title: 'Übersteuerung: das Nutzsignal ist zu stark',
      md: String.raw`
Ein Empfänger verarbeitet normalerweise Signale in einem bestimmten Pegelbereich. Ein **sehr starkes** Signal in der Nähe, auch außerhalb seiner Empfangsfrequenz, kann die Eingangsstufen **übersteuern**. Folgen: Die **Empfindlichkeit sinkt** bis zur vollständigen **Blockierung** des Empfangs. Genau daran **erkennst du die Übersteuerung**: Der Empfänger wird *unempfindlicher*, nicht empfindlicher. (Auch Pfeifstellen im gesamten Abstimmbereich oder eine „hängende“ Frequenzeinstellung sind keine typischen Zeichen.)[^darc-50ohm]

Starke Felder entstehen durch **hohe Sendeleistung** und **Antennen mit hohem Gewinn**:

- Eine **432-MHz-Richtantenne mit hohem Gewinn, die unmittelbar auf die Fernseh-Empfangsantenne** des Nachbarn zeigt, übersteuert den TV-Empfänger.
- Garagentorsteuerungen verlieren die Funktion, und LED-Leuchten mit kapazitivem Sensor schalten von selbst.

**Gegenmaßnahmen:** nur so viel Leistung wie für eine **zufriedenstellende Kommunikation erforderlich** (nicht „nur auf den zulässigen Pegel“, nicht pauschal die Hälfte des Maximums, nicht automatisch die vollen 100 W). In einem Ballungsgebiet gilt das besonders **während der abendlichen Fernsehstunden**. Richtantenne nicht in Richtung der Nachbarantenne drehen.

Beachte, welche Geräte überhaupt anfällig sind: **Elektronik** mit Halbleitern, zum Beispiel eine **netzbetriebene LED-Lampe**, kann die HF gleichrichten oder verarbeiten. Ein Dampfbügeleisen mit Bimetall-Regler, ein Antennenrotor mit Wechselstrommotor oder ein Staubsauger haben keine empfindliche Elektronik: Der Staubsauger ist eher *Störer* (Funkenbildung am Kollektor) als *Opfer*.`,
    },
    {
      id: 'quiz-uebersteuerung', type: 'quiz', title: 'Woran erkennst du Übersteuerung?',
      question: 'Du drehst den Antennenrotor so, dass dein Sender dem Nachbarn „ins Fenster“ strahlt, und sein Radio wird plötzlich leise und rauscharm: Sender, die vorher gut kamen, sind kaum zu hören. Was ist passiert?',
      options: [
        { text: 'Der Empfänger ist übersteuert: Die Empfindlichkeit ist durch das starke Signal gesunken.', correct: true, why: 'Sinkende Empfindlichkeit bis hin zur Blockierung ist das Kennzeichen der Übersteuerung.' },
        { text: 'Der Empfänger ist empfindlicher geworden, weil dein Signal ihn „verstärkt“.', why: 'Übersteuerung macht unempfindlicher, nicht empfindlicher.' },
        { text: 'Dein Sender erzeugt Oberwellen, die zeigen sich als Pfeifstellen im ganzen Abstimmbereich.', why: 'Das wäre eine Störung durch unerwünschte Aussendungen; hier geht es um das reine Nutzsignal.' },
        { text: 'Das Radio ist defekt; mit deiner Aussendung hat das nichts zu tun.', why: 'Der zeitliche Zusammenhang mit deiner Aussendung spricht gegen einen zufälligen Defekt.' },
      ],
    },
    {
      id: 'intermod', type: 'text', title: 'Intermodulation und Gleichrichtung: nichtlineare Teile mischen',
      md: String.raw`
Alles, was **nichtlinear** ist (Transistor, Diode, aber auch ein korrodierter Kontakt), verhält sich wie ein kleiner **Mischer** oder **Gleichrichter**. Daraus entstehen zwei Phänomene, die in Prüfungsfragen immer wieder auftauchen:[^darc-50ohm]

**[[intermodulation|Intermodulation]]** ([Intermodulation](wiki:Intermodulation|Intermodulation)). Treten mehrere starke Signale gleichzeitig auf (etwa ein lokaler TV-Sender und eine starke Amateurfunkstation), entstehen im übersteuerten Empfänger **Mischprodukte** und Oberwellen. Sie erscheinen als **Phantomsignale**: Sie sind nur da, solange **alle beteiligten Signale vorhanden** sind. Schaltest du einen der Sender ab, **verschwinden sie**. Ein **Abschwächer** vor dem Empfänger lässt sie ebenfalls schwächer werden, denn sie entstehen erst durch die Übersteuerung.

**[[hf-gleichrichtung|Gleichrichtung]]** ([Gleichrichter](wiki:Gleichrichter|Rectifier)). Starke HF-Signale werden an **PN-Übergängen** (Transistoren, Dioden) gleichgerichtet, ähnlich wie bei einem Detektorempfänger. Ist das Signal amplitudenmoduliert oder getastet, entsteht eine hörbare NF. So kommen **Geräusche aus den Lautsprechern einer abgeschalteten Stereoanlage**: Die HF wird in der **NF-Endstufe** gleichgerichtet, nicht im Netzteil, nicht im Tuner (der ist aus).

**Korrodierte Kontakte** (Metalloxide) wirken ebenfalls wie unbeabsichtigte Dioden. Ein korrodierter Anschluss an der Fernsehantenne des Nachbarn kann deshalb mit den **Signalen naher Sender** unerwünschte **Mischprodukte** erzeugen, die den Fernsehempfang stören. (Nicht mit dem Oszillatorsignal des Fernsehers, und nicht mit Einstreuungen aus dem Stromnetz.)

Der Test, ob es Intermodulation ist: Geräusch bleibt weg, sobald du **einen** der beteiligten Sender ausschaltest.`,
    },
    {
      id: 'abhilfe', type: 'text', title: 'Abhilfe: Wo wirkt was?',
      md: String.raw`
Die Abhilfemaßnahmen richten sich nach dem Eindringweg. Du hilfst dabei dem Nachbarn, auch wenn die Ursache in seinem Gerät liegt. Typische Opfer sind der Empfang von [DVB-T2](wiki:DVB-T2|DVB-T2)-Fernsehen und von [DAB](wiki:Digital Audio Broadcasting|Digital Audio Broadcasting)-Radio:[^darc-50ohm]

<table>
<tr><th>Problem</th><th>Maßnahme</th></tr>
<tr><td>HF dringt durchs Gehäuse (Einstrahlung)</td><td>HF-Baugruppen in ein **möglichst geschlossenes Metallgehäuse** (kein Metallblech nur unter der Baugruppe, kein Kunststoff, egal ob mit niedriger oder hoher Dielektrizitätszahl)</td></tr>
<tr><td>HF läuft auf Lautsprecher-, Steuer-, Verbindungsleitungen (Einströmung)</td><td>**geschirmte Leitungen**, z. B. geschirmte Lautsprecherleitungen oder ein geschirmtes Verbindungskabel für die Türsprechanlage. Länge verdoppeln, Querschnitt verringern, Versilberung helfen nicht.</td></tr>
<tr><td>HF auf dem **Mantel** von Koax-/Antennenkabeln (Gleichtakt)</td><td>**[[mantelwellensperre]]** ([Mantelwellenfilter](wiki:Mantelwellenfilter|Braid-breaker), Verdrosselung): Ringkern oder Klappferrit. Nicht: Erdverbindung des Senders abklemmen, nicht das Abschirmgeflecht abklemmen.</td></tr>
<tr><td>starkes Signal **außerhalb** des Nutzbandes am Antenneneingang</td><td>**Filter** vor den Antenneneingang: **[Hochpass](wiki:Hochpass|High-pass filter)**, wenn das Nutzband *höher* liegt (KW-Störer, TV-Band), **[Tiefpass](wiki:Tiefpass|Low-pass filter)**, wenn das Nutzband *tiefer* liegt</td></tr>
<tr><td>schlechter Empfang mit Zimmerantenne</td><td>**Außenantenne**, gegebenenfalls mit Vorfilter</td></tr>
<tr><td>HF im **230-V-Netz**, z. B. Antenne parallel zur Netzleitung</td><td>Filter/Mantelwellensperre in der Zuleitung des betroffenen Geräts; Antenne nicht parallel zur Leitung führen</td></tr>
<tr><td>HF auf der Leitung zum Sender im eigenen Haus</td><td>**separate HF-Erdleitung** für Sendeantennen (nicht Schutzleiter, nicht Wasserrohr; Dachboden-Antenne ist keine Lösung)</td></tr>
</table>

Für die Fernseh-Beispiele gilt außerdem: Ein **UHF-Abschwächer** oder eine **UHF-Bandsperre** vor dem Antenneneingang würden das *Nutzsignal* dämpfen bzw. sperren, ein **Antennenvorverstärker** verstärkt das Störsignal mit, und ein **Tiefpass am Sender** hilft nicht, wenn das Nutzsignal selbst (z. B. 144 MHz) in das Empfängerkabel induziert wird; dafür ist die Mantelwellensperre da. Ein **Wechsel des Fernsehgeräts** oder ein doppelt geschirmtes Koaxkabel für die Antennenleitung löst das Problem einer schwachen Zimmerantenne nicht.

Der Gleichtakt-Strom auf dem Kabelmantel ist übrigens der Grund, warum eine Mantelwellensperre **Gleichtakt-HF** unterdrückt, **nicht** niederfrequentes Netzbrummen und nicht „alle Wechselstromsignale“: Das Nutzsignal (Gegentakt) läuft durch den Ferrit praktisch unbeeinflusst.`,
    },
    {
      id: 'fig-hochpass', type: 'figure', title: 'Ein Hochpassfilter vor dem Antenneneingang',
      html: `<svg viewBox="0 0 420 170" class="vz-svg" role="img" aria-label="Schaltbild eines Hochpasses: Serienkondensator im Signalweg, zwei Spulen von den Anschlüssen nach Masse"><g fill="none" stroke="var(--ink)" stroke-width="2"><path d="M20 40 H110"/><path d="M110 22 V58 M126 22 V58"/><path d="M126 40 H294"/><path d="M294 40 H400"/><path d="M20 140 H400"/><path d="M70 40 V70 m0 0 c-10 0 -10 8 0 8 c10 0 10 8 0 8 c-10 0 -10 8 0 8 c10 0 10 8 0 8 V140"/><path d="M350 40 V70 m0 0 c-10 0 -10 8 0 8 c10 0 10 8 0 8 c-10 0 -10 8 0 8 c10 0 10 8 0 8 V140"/></g><g fill="var(--ink)"><circle cx="70" cy="40" r="3.5"/><circle cx="70" cy="140" r="3.5"/><circle cx="350" cy="40" r="3.5"/><circle cx="350" cy="140" r="3.5"/></g><g font-size="13" fill="var(--ink)" font-family="sans-serif" text-anchor="middle"><text x="118" y="14">C</text><text x="44" y="110">L</text><text x="378" y="110">L</text><text x="20" y="30" text-anchor="start">Antenne</text><text x="400" y="30" text-anchor="end">zum TV</text></g></svg>`,
      caption: 'Hochpass aus Serienkondensator und zwei Spulen nach Masse: Hohe Frequenzen (Fernsehband) gehen durch den Kondensator, tiefe (Kurzwelle) werden von den Spulen nach Masse kurzgeschlossen. Gezeichnet nach dem Schaltbild-Typ, wie es im Fragenkatalog vorkommt (Nr. EJ117, Antwort A).',
    },
    {
      id: 'demo-filter', type: 'viz', viz: 'hochpass-vor-tv', title: 'Demo: Filter vor dem Fernseher',
      intro: 'Dein 28-MHz-Sender stört den DVB-T2-Empfang (470–690 MHz) des Nachbarn über den Antenneneingang. Welches Filter hilft? Stelle Art, Ordnung und Grenzfrequenz ein und lies die Dämpfung bei 28 MHz und bei 470 MHz ab.',
      params: { hpMin: 30 },
      task: 'Erreiche mit einem **Hochpass** mindestens 30 dB Dämpfung bei 28 MHz, ohne das Fernsehband um mehr als 3 dB zu dämpfen, und probiere auch den **Tiefpass** aus (das Fernsehband verschwindet).',
    },
    {
      id: 'match-filter', type: 'match', title: 'Problem → Gegenmittel',
      prompt: 'Welches Gegenmittel passt zu welchem Problem?',
      pairs: [
        ['28-MHz-Signal übersteuert den DVB-T2-Eingang', 'Hochpassfilter vor dem Antenneneingang'],
        ['145-MHz-Störer am Kurzwellenempfänger (Nutzband 7 MHz)', 'Tiefpassfilter vor dem Empfängereingang'],
        ['Gleichtaktstrom auf dem Mantel eines Antennenkabels', 'Mantelwellensperre (Ferrit-Ringkern)'],
        ['HF auf den Lautsprecherleitungen einer Musikanlage', 'Geschirmte Lautsprecherleitungen'],
        ['HF dringt durch ein Kunststoffgehäuse in die Elektronik', 'Möglichst geschlossenes Metallgehäuse'],
      ],
    },
    {
      id: 'demo-detektiv', type: 'viz', viz: 'stoerpfad-detektiv', title: 'Demo: Der Beeinflussungs-Detektiv',
      intro: 'Sieben Störfälle aus der Praxis. Bestimme zu jedem, wie die HF ins Gerät gelangt, und welche Abhilfe passt.',
      params: { need: 6 },
      task: 'Löse **sechs der sieben Szenarien** (Eindringweg *und* Abhilfe müssen stimmen).',
    },
    {
      id: 'vorgehen', type: 'text', title: 'Beschwerde über Fernsehstörungen: der Ablauf',
      md: String.raw`
Der Nachbar beschwert sich über Störungen seines Fernsehers und vermutet deine Aussendungen. Dann gilt (siehe auch die Lektion „EMV und Empfangsstörungen“):[^darc-50ohm]

1. **Zeitlichen Zusammenhang prüfen.** Tritt die Störung auf, wenn du sendest, und ist sie weg, wenn du nicht sendest? Dafür ist ein Stationstagebuch sehr hilfreich; es kann auch zeigen, dass du *nicht* die Ursache bist. Der erste Schritt ist **nicht**, nach der Anmeldung des Fernsehgeräts zu fragen, die Erdung durch den Fachhändler zu empfehlen oder auf Streaming zu verweisen.
2. **Kooperativ und lösungsorientiert abhelfen.** Oft lässt sich im direkten Gespräch mehr erreichen als über Behörden: Außenantenne, Filter, Mantelwellensperren auf der Empfangsseite, geschirmte Leitungen, eine wirksame HF-Erdung, vorsorglich nur so viel Leistung wie nötig.
3. **Letztes Mittel: Außenstelle der Bundesnetzagentur.** Erst wenn alle Bemühungen fehlgeschlagen sind, bittest du die **zuständige Außenstelle der [Bundesnetzagentur](wiki:Bundesnetzagentur|Federal Network Agency)** um Prüfung der Gegebenheiten. Du schickst nicht „den Sender an die Bundesnetzagentur“, und du reißt auch nicht die Rückseite des Fernsehers ab, um sein Gehäuse zu erden. Einen Fernsehtechniker des Fachhandwerks einzuschalten kann sinnvoll sein, ist aber nicht der von der Prüfung genannte *nächste Schritt*.`,
    },
    {
      id: 'order-vorgehen', type: 'order', title: 'Reihenfolge bei Fernsehstörungen',
      prompt: 'Bringe die Schritte in die richtige Reihenfolge.',
      items: [
        'Zeitlichen Zusammenhang zwischen Störung und eigenen Aussendungen prüfen',
        'Kooperativ Abhilfe versuchen (Außenantenne, Filter, Mantelwellensperre, geschirmte Leitungen, HF-Erdung)',
        'Erst wenn alles fehlschlägt: die zuständige Außenstelle der Bundesnetzagentur um Prüfung bitten',
      ],
      explain: 'Erst prüfen, ob du überhaupt die Ursache bist, dann pragmatisch abhelfen, die Behörde ist das letzte Mittel.',
    },
    {
      id: 'recall-wege', type: 'recall', title: 'In eigenen Worten',
      prompt: 'Der Nachbar hört bei deinen Aussendungen Sprache aus seiner ausgeschalteten Stereoanlage. Erkläre den Mechanismus (Weg der HF, Rolle von PN-Übergängen) und nenne zwei Gegenmaßnahmen.',
      answer: 'Die HF gelangt als Einstrahlung oder, häufiger, als Einströmung über die Lautsprecherleitungen in die NF-Endstufe. Dort werden die starken HF-Signale an nichtlinearen Bauteilen (PN-Übergänge von Transistoren) gleichgerichtet, und aus der Hüllkurve der Modulation entsteht hörbare NF, auch wenn die Anlage abgeschaltet ist. Gegenmaßnahmen: geschirmte Lautsprecherleitungen, eventuell Mantelwellensperre/Ferrit; mit weniger Sendeleistung und gutem Abstand der Antenne verringert sich die Feldstärke.',
      cards: ['bg-einstrahlung', 'bg-gleichrichtung', 'bg-mws'],
    },
    {
      id: 'fact-pruefung', type: 'callout', tone: 'fact', title: 'Prüfungsbezug',
      md: String.raw`Alle Aussagen dieser Lektion stehen im Katalogkapitel 4.10 „Störungen elektronischer Geräte“ (EJ101 bis EJ124) und überschneiden sich mit Kapitel 3.10/3.11 (NJ/NK) der Klasse N. Zahlen musst du hier kaum lernen, aber die **Wortwahl** der Antworten genau lesen: „**geschlossenes** Metallgehäuse“, „**Gleichtakt**“, „**Hochpass**“ (nicht Tiefpass), „**Mindestleistung** für sichere Kommunikation“.`,
    },
  ],
  cards: [
    { id: 'bg-einstrahlung', front: 'Einstrahlung oder Einströmung? Wo liegt der Unterschied?', back: '**Einstrahlung:** HF gelangt als Welle über die Empfangsantenne oder durch das ungenügend geschirmte Gehäuse in die Elektronik. **Einströmung:** HF gelangt über Leitungen/Kabel (Netz, Antenne, Lautsprecher) ins Gerät.' },
    { id: 'bg-uebersteuerung', front: 'Woran erkennst du die Übersteuerung eines Empfängers?', back: 'Die **Empfindlichkeit geht zurück** (bis zur Blockierung). Ursache: starkes Nutzsignal, nicht unerwünschte Aussendung.' },
    { id: 'bg-intermod', front: 'Was zeigt Intermodulation im Empfänger?', back: '**Phantomsignale**, die verschwinden, wenn einer der beteiligten Sender abgeschaltet wird (entstehen durch Mischung starker Signale).' },
    { id: 'bg-korrosion', front: 'Korrodierter Anschluss an der Fernsehantenne: was kann er auslösen?', back: 'Mit dem Signal **naher Sender** unerwünschte **Mischprodukte** (Diodenwirkung der Metalloxide), die den Empfang stören.' },
    { id: 'bg-gleichrichtung', front: 'Geräusche aus einer abgeschalteten Stereoanlage: Ursache?', back: '**Gleichrichtung** starker HF-Signale an PN-Übergängen in der **NF-Endstufe**.' },
    { id: 'bg-leistung', front: 'Wie hoch sollte die Sendeleistung sein, um Störungen zu vermeiden?', back: 'Auf das für eine **zufriedenstellende Kommunikation erforderliche Minimum**; besonders im Ballungsgebiet abends zu den Fernsehstunden.' },
    { id: 'bg-richtantenne', front: '432-MHz-Richtantenne mit hohem Gewinn zeigt auf die TV-Antenne: Folge?', back: '**Übersteuerung** des TV-Empfängers.' },
    { id: 'bg-gehaeuse', front: 'Abschirmgehäuse für HF-Baugruppen?', back: 'Möglichst **geschlossenes Metallgehäuse** (nicht Kunststoff, nicht nur ein Blech unter der Baugruppe).' },
    { id: 'bg-mws', front: 'Was unterdrückt eine Mantelwellensperre?', back: '**Gleichtakt-HF-Ströme** auf dem Kabelmantel (Ringkern/Klappferrit). Kein NF-Brummen, nicht „alle Wechselströme“.' },
    { id: 'bg-hochpass', front: '28-MHz-Sender stört DVB-T2-Empfang über den Antenneneingang: Welches Filter?', back: '**Hochpass** vor den Antenneneingang (lässt 470–690 MHz durch, sperrt Kurzwelle).' },
    { id: 'bg-schirmleitung', front: 'Türsprechanlage oder Lautsprecherleitung wird gestört: Maßnahme?', back: '**Geschirmtes** Verbindungs-/Lautsprecherkabel (Verlängern, dünner oder versilbert machen hilft nicht).' },
    { id: 'bg-netzleitung', front: 'KW-Antenne parallel zu einer 230-V-Leitung: Was passiert?', back: '**Hochfrequenzströme werden ins Netz eingekoppelt.** Zum Schutz im Haus: separate HF-Erdleitung für Sendeantennen (nicht Schutzleiter/Wasserrohr).' },
    { id: 'bg-zimmerantenne', front: 'Zimmerantennen-Fernseher wird vom 2-m-Sender gestört: Vorschlag?', back: 'Dem Nachbarn eine **außen angebrachte Fernsehantenne** vorschlagen.' },
    { id: 'bg-ablauf', front: 'Fernsehstörung beim Nachbarn: erster und letzter Schritt?', back: 'Erster: **zeitlichen Zusammenhang** mit eigenen Aussendungen prüfen. Letzter: **Außenstelle der BNetzA** um Prüfung bitten.' },
  ],
};
