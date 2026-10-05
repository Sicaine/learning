export default {
  id: 'emv-und-empfangsstoerungen',
  title: 'EMV und Empfangsstörungen',
  summary: 'Elektromagnetische Verträglichkeit nach EMVG und AFuG, was bei Störungen beim Nachbarn zu tun ist, welche Rolle die Bundesnetzagentur spielt und wie du Störungen deines eigenen Empfangs aufspürst.',
  minutes: 20,
  goals: [
    '[[emv|Elektromagnetische Verträglichkeit]] in beiden Richtungen erklären: nicht stören ([[stoeraussendung]]) und nicht gestört werden ([[stoerfestigkeit]])',
    'Das Privileg des Funkamateurs nach AFuG § 7 nennen: Den Grad der Störfestigkeit der eigenen Station darf er selbst bestimmen',
    'Bei einer Beschwerde des Nachbarn die drei möglichen Fälle unterscheiden und die Befugnisse der Bundesnetzagentur zuordnen',
    'Bei gestörtem eigenem Empfang die richtige Reihenfolge einhalten: erst der eigene Haushalt, dann Protokoll, dann Funkstörungsannahme',
  ],
  needs: ['elektrotechnik/emv'],
  blocks: [
    {
      id: 'intro', type: 'text', title: 'Zwei Seiten einer Medaille',
      md: String.raw`
Im Shack hängt alles zusammen: Der Transceiver hängt am Netz, das Netzkabel liegt neben dem Antennenkabel, nebenan arbeitet ein Computer mit [Schaltnetzteil](wiki:Schaltnetzteil|Switched-mode power supply), und im Haus gegenüber steht ein Fernseher. **[[emv|Elektromagnetische Verträglichkeit]]** (EMV, [Elektromagnetische Verträglichkeit](wiki:Elektromagnetische Verträglichkeit|Electromagnetic compatibility)) bedeutet, dass alle diese Geräte nebeneinander funktionieren, ohne sich gegenseitig zu stören. Dazu gehören immer **zwei** Eigenschaften eines Geräts:

1. **Es darf nicht zu stark stören.** Das ist die [[stoeraussendung|Störaussendung]] (Emission): Die von einem Gerät verursachten elektromagnetischen Störungen dürfen keinen Pegel erreichen, bei dem Funk- und Telekommunikationsgeräte oder andere Betriebsmittel nicht mehr bestimmungsgemäß arbeiten können.
2. **Es darf sich nicht so leicht stören lassen.** Das ist die [[stoerfestigkeit|Störfestigkeit]] (Immunität): Ein Gerät muss gegen die im bestimmungsgemäßen Betrieb zu erwartenden elektromagnetischen Störungen hinreichend unempfindlich sein.

So steht es als „grundlegende Anforderungen“ in § 4 des [[emvg|Gesetzes über die elektromagnetische Verträglichkeit von Betriebsmitteln]] (EMVG, Stand 05.10.2026).[^emvg] Beide Seiten haben ihre Berechtigung: Ein Sender, der seine [Oberwellen](wiki:Harmonische|Harmonic) ungefiltert in den UKW-Rundfunkbereich schickt, verletzt Punkt 1. Ein Fernseher, der schon bei normaler Feldstärke ausfällt, verletzt Punkt 2.

> Typische Opfer *und* Täter zugleich sind ganz gewöhnliche Haushaltsgeräte. Häufige Verursacher von Störungen auf Funkempfängern sind [Wechselrichter](wiki:Wechselrichter|Power inverter) von Solaranlagen, Schaltnetzteile und [LED-Leuchten](wiki:LED-Leuchtmittel|LED lamp).[^darc-50ohm]

Auch deine Amateurfunkstation kann beides sein: Täter (starkes Signal, unerwünschte Aussendungen) und Opfer (Rauschteppich von der LED-Lampe im Flur). Diese Lektion zeigt dir die Regeln für beide Richtungen.`,
    },
    {
      id: 'mission-nachbar', type: 'callout', tone: 'mission', title: 'Funkpraxis: Es klingelt der Nachbar',
      md: String.raw`Früher oder später passiert es: Du hast gerade ein schönes QSO auf 2 m, da klingelt der Nachbar. Sein Fernseher flimmert, und er vermutet dich. **Lass die Tür nicht zufallen.** Wer höflich anbietet nachzusehen, hat in aller Regel zehn Minuten später ein Problem weniger. Wer abwimmelt („liegt an deinem Fernseher“), hat den Streit, der am Ende bei der Behörde landet. Die Prüfung fragt dieses Verhalten ab; dahinter steckt gelebte Nachbarschaftspraxis.`,
    },
    {
      id: 'privileg', type: 'text', title: 'Das Privileg des Funkamateurs (AFuG § 7)',
      md: String.raw`
Das [Amateurfunkgesetz](wiki:Amateurfunkgesetz) regelt in **§ 7 „Schutzanforderungen“** etwas Besonderes:[^afug]

- **Abs. 1:** Beim Betrieb einer Amateurfunkstelle sind vom EMVG nur die grundlegenden Anforderungen nach § 4 Abs. 1 **Nr. 1** (Störaussendung) einzuhalten.
- **Abs. 2:** Von den grundlegenden Anforderungen nach § 4 Abs. 1 **Nr. 2** (Störfestigkeit) **darf der Funkamateur abweichen** und kann den Grad der Störfestigkeit seiner Amateurfunkstelle **selbst bestimmen**. Entspricht seine Station nicht diesen Anforderungen, muss er Störungen durch andere Betriebsmittel **hinnehmen**, wenn diese ihrerseits die grundlegenden Anforderungen des EMVG erfüllen.

<table>
<tr><th>Anforderung (EMVG § 4)</th><th>Für andere Geräte</th><th>Für deine Amateurfunkstelle</th></tr>
<tr><td>Nr. 1: Störaussendung begrenzen</td><td>Pflicht</td><td>**Pflicht** (auch für Selbstbau)</td></tr>
<tr><td>Nr. 2: Störfestigkeit</td><td>Pflicht</td><td>**freiwillig**, Grad bestimmst du selbst</td></tr>
</table>

Das ist keine Willkür des Gesetzgebers: Du darfst Geräte selbst bauen, umbauen und mit hohen Leistungen betreiben. Dafür trägst du die Verantwortung dafür, dass **du andere nicht störst**, während du bei der **eigenen Störfestigkeit** freie Hand hast, so ehrgeizig oder so sparsam du sie ausführen willst. Das gilt ausdrücklich auch für Selbstbaugeräte.`,
    },
    {
      id: 'warn-privileg', type: 'callout', tone: 'warning', title: 'Vorsicht, Fehlvorstellungen',
      md: String.raw`- **„Ich brauche eine Verträglichkeitsbescheinigung oder eine Abnahme durch einen Elektromeister.“** Nein. Es gibt weder eine Bescheinigung der Bundesnetzagentur noch einen vorgeschriebenen Prüfer für die EMV deiner Station.
- **„Meine Station darf nur aus baumustergeprüften Geräten bestehen.“** Nein: Selbstgebaute und umgebaute Geräte sind ausdrücklich erlaubt (AFuG § 5 Abs. 2); das Funkanlagengesetz gilt nur für auf dem Markt bereitgestellte Geräte.
- **„Meine Station ist anderen Betriebsmitteln gleichgestellt.“** Nein, bei der Störfestigkeit ist sie bewusst *nicht* gleichgestellt (§ 7 Abs. 2 AFuG).
- **„Ich muss jede Störung hinnehmen“** oder **„Ich muss gar keine hinnehmen“.** Beides falsch: Du musst sie grundsätzlich hinnehmen, **wenn das störende Gerät** die Anforderungen des EMVG (oder des Funkanlagengesetzes) erfüllt.
- **„Ich darf die Störfestigkeit nur verbessern, nicht verschlechtern.“** Nein, du darfst vom Soll abweichen, auch nach unten.
- **Prüfungsbezug:** VC118, VC119, VC120, VE308.`,
    },
    {
      id: 'quiz-privileg', type: 'quiz', title: 'Welche Anforderung darfst du lockern?',
      question: 'Du betreibst einen selbstgebauten Transceiver. Welche EMV-Anforderung des EMVG darfst du für deine Amateurfunkstelle nach dem Amateurfunkgesetz lockern?',
      options: [
        { text: 'Die Störfestigkeit: Den Grad bestimmst du selbst.', correct: true, why: 'AFuG § 7 Abs. 2 erlaubt die Abweichung von § 4 Abs. 1 Nr. 2 EMVG.' },
        { text: 'Die Störaussendung: Wer selbst baut, darf stärker stören.', why: 'Umgekehrt: Die Begrenzung der Störaussendung (Nr. 1) bleibt Pflicht, auch für Selbstbaugeräte.' },
        { text: 'Beide Anforderungen, solange das Gerät selbstgebaut ist.', why: 'Das Privileg gilt nur für die Störfestigkeit.' },
        { text: 'Keine: Selbstbaugeräte müssen wie kommerzielle Geräte geprüft werden.', why: 'Falsch: Das Privileg betrifft gerade auch Selbstbaugeräte, und es gibt keine vorgeschriebene Prüfung.' },
      ],
    },
    {
      id: 'nachbar', type: 'text', title: 'Wenn der Nachbar klagt: höflich, sachlich, Schritt für Schritt',
      md: String.raw`
Vermutet ein Nachbar, dass du seinen Fernseher oder sein Radio störst, gilt folgender Weg (DARC-Lehrgang, abgestimmt auf den Fragenkatalog):[^darc-50ohm]

1. **Anbieten zu prüfen.** Du bist der Erste, der an einen möglichen Zusammenhang denken sollte. Biete **höflich** an, die nötigen Prüfungen in die Wege zu leiten. *Nicht*: „Das liegt an Ihrer eigenen Einrichtung“, auch nicht „dafür bin ich nicht zuständig“.
2. **Zusammenhang prüfen.** Tritt die Störung genau dann auf, wenn du sendest? Dein Stationstagebuch (Logbuch) mit Zeiten und Frequenzen hilft dabei, den Zusammenhang zu belegen **oder auszuschließen**.
3. **Mit eigenen Mitteln abhelfen.** Das können Filter, Mantelwellensperren oder Abschirmungen auf der Empfängerseite sein (Details in der nächsten Lektion), eine wirksame HF-Erdung oder eine Außenantenne für den Empfang.
4. **Zum Frieden: Leistung vorläufig reduzieren.** Die Ursachensuche kann dauern. Zur Wahrung des nachbarschaftlichen Friedens darfst und solltest du die Sendeleistung **vorläufig** so weit senken, dass es keine Probleme gibt.
5. **Letztes Mittel: Bundesnetzagentur.** Lässt sich die Störung nicht beseitigen, empfiehlst du dem Nachbarn **höflich**, sich an die Funkstörungsannahme der [Bundesnetzagentur](wiki:Bundesnetzagentur|Federal Network Agency) zu wenden. Die Behörde prüft dann die Störungsursache.

Wird die Bundesnetzagentur eingeschaltet, hat sie eigene Befugnisse: Sie darf dich nach § 17 [[afuv|AFuV]] zur **Mitwirkung** verpflichten (Betriebsangaben festhalten und vorlegen, Testaussendungen durchführen) und kann bis zum Abschluss der Untersuchung die **Sperrung bestimmter Frequenzbereiche** oder die **Absenkung der Sendeleistung** anordnen.[^afuv]

> Ein Verband wie der DARC bietet Hilfe an: Referenten für EMV in den Distrikten und vielen Ortsverbänden unterstützen bei der Ursachensuche und der Messung von störenden Geräten.[^darc-50ohm]`,
    },
    {
      id: 'demo-fall', type: 'viz', viz: 'emv-fallentscheider', title: 'Demo: Welcher Fall liegt vor?',
      intro: 'Der Nachbar meldet einen gestörten Fernseher. Stelle ein, ob deine Station vorschriftsmäßig arbeitet und wie stark deine Feldstärke am Gerät gegenüber dem Störfestigkeits-Grenzwert der Norm ist. Die Demo nennt Fall und Folgen.',
      task: 'Finde **alle drei Fälle**: Station nicht in Ordnung, Gerät nicht störfest genug (Feld unter der Normgrenze) und Konfliktfall (Feld über der Normgrenze, beide Seiten korrekt). Verstelle die Regler selbst, die Ausgangsstellung zählt nicht.',
    },
    {
      id: 'drei-faelle', type: 'text', title: 'Die drei Fälle im Überblick',
      md: String.raw`
Hat die Bundesnetzagentur die Ursache untersucht und festgestellt, dass dein Sender das gestörte Gerät beeinflusst, gibt es **drei** Möglichkeiten:[^darc-50ohm]

<table>
<tr><th>Fall</th><th>Deine Station</th><th>Das gestörte Gerät</th><th>Folge</th></tr>
<tr><td>1</td><td>**nicht** vorschriftsmäßig (z. B. zu starke unerwünschte Aussendungen)</td><td>egal</td><td>Die BNetzA darf **kostenpflichtig** eine Betriebseinschränkung anordnen, zum Beispiel eine Leistungsbegrenzung.</td></tr>
<tr><td>2</td><td>vorschriftsmäßig; am Gerät ist deine Feldstärke **kleiner** als der Störfestigkeits-Grenzwert der Norm</td><td>nicht störfest genug</td><td>Verantwortung liegt allein beim **Betreiber des Geräts**. **Du darfst unverändert weitersenden.**</td></tr>
<tr><td>3</td><td>vorschriftsmäßig; deine Feldstärke am Gerät ist **größer** als der Grenzwert</td><td>hält die Störfestigkeit ein</td><td>**Konfliktfall:** BNetzA veranlasst **Abhilfe in Zusammenarbeit mit allen Beteiligten.**</td></tr>
</table>

Merke dir die Logik, nicht die Zahlen: Immer wenn *beide* Seiten die Vorschriften einhalten, ist es kein Rechtsverstoß, sondern ein Interessenkonflikt, und den löst die Behörde durch Zusammenarbeit, nicht durch Strafe.

<table>
<tr><th>Das passiert in den Fällen 2 und 3 <b>nicht</b></th><th>Warum nicht?</th></tr>
<tr><td>Ordnungswidrigkeitenverfahren, Bußgeld, Betriebsverbot</td><td>Es liegt kein Verstoß gegen AFuG oder AFuV vor.</td></tr>
<tr><td>Entzug der Zulassung</td><td>Der ist nur bei <i>fortgesetzten Verstößen</i> gegen AFuG/AFuV möglich (AFuG § 3 Abs. 4).</td></tr>
<tr><td>„Die BNetzA hat keine Befugnisse“</td><td>Doch: Sie darf Abhilfe in Zusammenarbeit mit den Beteiligten veranlassen.</td></tr>
</table>

**Ausnahme für besondere Fälle:** Auch bei vorschriftsmäßigem Betrieb darf die Bundesnetzagentur in drei Fällen Maßnahmen **ohne** Zusammenarbeit anordnen: zum Schutz von **Sicherheitsfunk** (zu Sicherheitszwecken verwendete Empfangs- oder Sendefunkgeräte), zum Schutz **öffentlicher Telekommunikationsnetze** und bei Gefahr für **Leib und Leben** einer Person oder für Sachen **von bedeutendem Wert**. Das sind die besonderen Eingriffsbefugnisse bei der Störungsbearbeitung (§ 28 EMVG, Stand 05.10.2026).[^emvg] Ein Gerät, das „für den Betreiber sehr wichtig“ ist (etwa eine private Alarmanlage), begründet *keinen* Vorrang: Auch dann gilt, dass du Störungen von EMVG-konformen Geräten hinnehmen musst.`,
    },
    {
      id: 'calc-db', type: 'numeric', title: 'Wie weit unter der Grenze?',
      question: String.raw`Die Feldstärke deiner Station am Fernseher des Nachbarn beträgt $E = 1{,}5\,\text{V/m}$. Der Störfestigkeits-Grenzwert der Norm für dieses Gerät sei (angenommen) $3\,\text{V/m}$. Um wie viel Dezibel liegt deine Feldstärke unter (negatives Vorzeichen) oder über dem Grenzwert? Welche Folge hat das (Fall 1, 2 oder 3 der Tabelle), wenn deine Station ansonsten in Ordnung ist?`,
      answer: -6.02, tolerance: 0.1, unit: 'dB',
      hint: 'Feldstärke ist eine Spannungsgröße (V/m): $20\\cdot\\log_{10}$ des Verhältnisses.',
      explain: String.raw`$20\cdot\log_{10}(1{,}5/3) = 20\cdot\log_{10}(0{,}5) \approx -6{,}0\,\text{dB}$. Deine Feldstärke liegt *unter* dem Grenzwert, der Fernseher hätte sie also aushalten müssen: **Fall 2**, du darfst weitersenden. Wäre die Feldstärke $6\,\text{V/m}$, läge sie $+6\,\text{dB}$ darüber (Fall 3, Konfliktfall).`,
    },
    {
      id: 'match-faelle', type: 'match', title: 'Situation → Folge',
      prompt: 'Ordne jeder Situation die richtige Folge zu.',
      pairs: [
        ['Deine Station hält die Grenzwerte für unerwünschte Aussendungen nicht ein', 'Die BNetzA darf kostenpflichtig eine Betriebseinschränkung anordnen'],
        ['Station in Ordnung, Feldstärke am Gerät unter dem Normgrenzwert der Störfestigkeit', 'Du darfst den Funkbetrieb fortsetzen, das Gerät ist nicht störfest genug'],
        ['Beide Seiten vorschriftsmäßig, Feld über dem Normgrenzwert, Störung bleibt', 'Die BNetzA veranlasst Abhilfe in Zusammenarbeit mit den Beteiligten'],
        ['Ein Haushaltsgerät in der Nachbarschaft stört deinen Empfang, erfüllt aber das EMVG', 'Du musst die Störung grundsätzlich hinnehmen'],
      ],
    },
    {
      id: 'eigener-empfang', type: 'text', title: 'Umgekehrt: Dein eigener Empfang ist gestört',
      md: String.raw`
Der Rauschteppich auf allen Bändern kommt selten „aus dem Äther“. Häufige Verursacher sind **Wechselrichter von [Solaranlagen](wiki:Photovoltaikanlage|Photovoltaics)**, [Schaltnetzteile](wiki:Schaltnetzteil|Switched-mode power supply) (Steckernetzteile, Ladegeräte), **LED-Leuchten**, Computer und Bildschirme. Das Vorgehen folgt einer festen Reihenfolge:[^darc-50ohm]

1. **Zuerst im eigenen Haushalt suchen.** Die allererste Maßnahme findet bei dir selbst statt: Geräte nacheinander ausschalten oder ausstecken, die Sicherung abschalten und mit einem Batterieempfänger prüfen, ob die Störung bleibt. Oft ist es ein Steckernetzteil oder eine LED-Lampe in deiner eigenen Wohnung.
2. **Nachbarschaft eingrenzen.** Ist der eigene Haushalt sauber, suchst du in der Umgebung weiter. Hast du die Quelle gefunden, versuche festzustellen, ob sie die zulässigen Grenzwerte überschreitet.
3. **Grenzwerte eingehalten?** Dann kannst du nur auf die **freiwillige Kooperation** des Nachbarn setzen, denn grundsätzlich musst du die Störung hinnehmen, wenn das störende Gerät die gesetzlichen Anforderungen erfüllt.
4. **Letztes Mittel: Funkstörungsannahme der Bundesnetzagentur.** Telefonisch oder per E-Mail. Hilf der Behörde, indem du ein **Protokoll** führst: **wann** welche Störungen auftreten, **welcher Art** sie sind (Brummen, Rauschen, Pfeifen), und **welche Quelle** du vermutest.

<table>
<tr><th>So <b>nicht</b></th><th>Warum nicht?</th></tr>
<tr><td>Bei jedem Auftreten eine neue E-Mail schicken</td><td>Der Sachbearbeiter braucht <i>ein</i> aussagekräftiges Protokoll, nicht hundert Einzelmeldungen.</td></tr>
<tr><td>Ständig anrufen und auf das schnelle Ausrücken des Prüf- und Messdienstes drängen</td><td>Das bringt keine zusätzliche Information und kostet Wohlwollen.</td></tr>
<tr><td>Kontaktdaten aller Nachbarn sammeln und melden</td><td>Dafür gibt es keinen Anlass; du meldest die <i>vermutete Quelle</i>, nicht die Nachbarschaft.</td></tr>
<tr><td>Das Intruder-Monitoring eines Amateurfunkverbands informieren</td><td>Das beobachtet Fremdnutzer in Amateurfunkbändern, nicht Störquellen im Haus.</td></tr>
<tr><td>Den Empfang einstellen und auf Senden umschalten</td><td>Das beseitigt die Störquelle nicht.</td></tr>
</table>`,
    },
    {
      id: 'order-empfang', type: 'order', title: 'Reihenfolge bei Empfangsstörung',
      prompt: 'Dein Empfang ist auf allen Bändern gestört. Bringe die Schritte in die sinnvolle Reihenfolge (zuerst der erste Schritt).',
      items: [
        'Störquellen im eigenen Haushalt suchen und abschalten (Steckernetzteile, LED-Lampen, Computer, Bildschirme)',
        'Quelle in der Nachbarschaft eingrenzen und höflich ansprechen',
        'Aufschreiben: wann welche Störung auftritt und welche Quelle vermutet wird',
        'Mit diesem Protokoll die Funkstörungsannahme der Bundesnetzagentur informieren',
      ],
      explain: 'Erst vor der eigenen Tür kehren, dann die Umgebung, dann dokumentieren, zuletzt die Behörde. So hat die Bundesnetzagentur eine Chance, die Ursache zu finden.',
    },
    {
      id: 'abschirmen', type: 'text', title: 'Abschirmen und HF-Erdung: Wirkung in beide Richtungen',
      md: String.raw`
Die wichtigsten Maßnahmen für gute EMV sind das **[[abschirmung|Abschirmen]]** und **[[hf-erdung|Erden]]** aller Geräte und Geräteteile, in denen hochfrequente Schwingungen auftreten. Wie bei einem [Faradayschen Käfig](wiki:Faradayscher Käfig|Faraday cage) wirkt das **in beide Richtungen**: Es schützt dein Gerät vor Störungen von außen *und* verhindert, dass es selbst andere stört.[^darc-50ohm]

- Alle Geräte, die HF-Ströme führen, sollten **möglichst gut geschirmt** sein; HF-Stufen gehören in ein geschlossenes **Metallgehäuse** (Kunststoff schirmt nicht).
- Jedes Gerät der Station bekommt eine **gute HF-Erdung**: kurze, niederohmige Verbindungen zu einem gemeinsamen Erdungspunkt. Für das eigene Haus lohnt sich eine **separate HF-Erdleitung** (mehr in der nächsten Lektion).
- **Nicht** geeignet als „Erde“ für den Sender: die Wasser- oder Abwasserleitung im Haus. Auch der Schutzleiter des Stromnetzes ist keine HF-Erdung, und ein „nicht geerdetes“ Gerät ist keine Lösung.

Dass „Erdung“ viele Gesichter hat (Schutzleiter, Potentialausgleich, HF-Erde, Blitzschutz), sortiert die Lektion über Blitzschutz und Erdung.`,
    },
    {
      id: 'quiz-abschirm', type: 'quiz', title: 'Was hilft in beide Richtungen?',
      question: 'Welche Maßnahme senkt sowohl die Gefahr, dass deine Station andere stört, als auch die Gefahr, dass sie selbst gestört wird?',
      options: [
        { text: 'Alle Geräte, in denen HF auftritt, abschirmen und gut (HF-)erden.', correct: true, why: 'Abschirmen und Erden wirken in beide Richtungen.' },
        { text: 'Die Geräte in Kunststoffgehäuse einbauen.', why: 'Kunststoff schirmt nicht ab; HF-Baugruppen gehören in ein geschlossenes Metallgehäuse.' },
        { text: 'Den Sender mit der Wasserleitung verbinden.', why: 'Die Wasser- oder Abwasserleitung ist keine geeignete HF-Erdung.' },
        { text: 'Alle niederohmigen Erdverbindungen entfernen.', why: 'Die HF-Erdung soll gerade niederohmig sein.' },
      ],
    },
    {
      id: 'recall-nachbar', type: 'recall', title: 'In eigenen Worten',
      prompt: 'Ein Nachbar beschwert sich über Störungen seines Rundfunkempfangs und vermutet deine Station. Beschreibe, wie du reagierst, wann die Bundesnetzagentur ins Spiel kommt, und was du über deine Rechte bei der Störfestigkeit sagen kannst.',
      answer: 'Ich biete höflich an zu prüfen, ob ich der Verursacher bin, und prüfe den zeitlichen Zusammenhang mit meinen Aussendungen (Logbuch). Zur Wahrung des Friedens reduziere ich vorläufig die Sendeleistung und helfe mit eigenen Mitteln ab (Filter, Mantelwellensperre, Abschirmung, Außenantenne). Gelingt das nicht, empfehle ich dem Nachbarn, sich an die Bundesnetzagentur zu wenden. Hält meine Station die Vorschriften ein und liegt meine Feldstärke unter dem Störfestigkeits-Grenzwert, ist der Betreiber des Geräts verantwortlich, und ich darf weitersenden. Sind beide Seiten vorschriftsmäßig und die Störung bleibt, veranlasst die BNetzA Abhilfe in Zusammenarbeit mit allen Beteiligten. Bei der Störfestigkeit der eigenen Station darf ich nach AFuG § 7 vom EMVG abweichen und sie selbst bestimmen, die Störaussendung muss ich begrenzen.',
      cards: ['emv-2-seiten', 'emv-privileg', 'emv-nachbar'],
    },
    {
      id: 'deep-recht', type: 'callout', tone: 'deep', title: 'Hintergrund: Wo steht was?',
      md: String.raw`- **AFuG § 7** („Schutzanforderungen“): Abs. 1 nur Nr. 1 EMVG-Anforderungen, Abs. 2 Störfestigkeit frei, Störungen durch EMVG-konforme Geräte hinnehmen.
- **AFuG § 6 Satz 1 Nr. 4:** ermächtigt zu Verfahren, mit denen elektromagnetische Unverträglichkeiten zwischen Amateurfunkstelle und anderen Geräten beseitigt werden. Umgesetzt ist das in **AFuV § 17**.
- **AFuV § 17 Abs. 3:** Die Bestimmungen von EMVG und Funkanlagengesetz bleiben unberührt.
- **EMVG § 4:** die beiden grundlegenden Anforderungen; **§ 28:** besondere Eingriffsbefugnisse (Gefahr für Leib und Leben, öffentliche Netze, Sicherheitsfunk).
- Stand aller Texte: 05.10.2026 (AFuV zuletzt geändert am 27.05.2024).[^afug][^afuv][^emvg]`,
    },
  ],
  cards: [
    { id: 'emv-2-seiten', front: 'Welche zwei grundlegenden Anforderungen stellt das EMVG (§ 4)?', back: '1. Störaussendung begrenzen (nicht stören). 2. Störfestigkeit (hinreichend unempfindlich gegen zu erwartende Störungen).' },
    { id: 'emv-privileg', front: 'Welche EMV-Anforderung darf der Funkamateur für seine Station lockern?', back: 'Die **Störfestigkeit** (AFuG § 7 Abs. 2): Grad selbst bestimmen, auch bei Selbstbau. Die Störaussendung bleibt Pflicht.' },
    { id: 'emv-hinnehmen', front: 'Muss ein Funkamateur Störungen seines Empfangs durch andere Geräte hinnehmen?', back: 'Grundsätzlich **ja, wenn das störende Gerät EMVG (oder FuAG) erfüllt.** Nicht in jedem Fall, nicht nur bei „wichtigen“ Geräten.' },
    { id: 'emv-nachbar', front: 'Nachbar beschwert sich über Störungen: richtige erste Reaktion?', back: 'Höflich anbieten, die nötigen Prüfungen in die Wege zu leiten; Zusammenhang prüfen (Logbuch); ggf. Leistung vorläufig reduzieren. Nicht abwimmeln.' },
    { id: 'emv-bnetza-empfehlen', front: 'Störung beim Nachbarn lässt sich mit eigenen Mitteln nicht beseitigen: was empfiehlst du?', back: 'Dem Nachbarn **höflich** empfehlen, sich zur Prüfung der Störungsursache an die **Bundesnetzagentur** zu wenden.' },
    { id: 'emv-fall1', front: 'Station nicht vorschriftsmäßig (zu starke unerwünschte Aussendungen): Folge?', back: 'Die BNetzA darf **kostenpflichtig** eine **Betriebseinschränkung** anordnen (z. B. Leistungsbegrenzung).' },
    { id: 'emv-fall2', front: 'Station ok; Feldstärke am Gerät unter dem Normgrenzwert der Störfestigkeit: Folge?', back: 'Gerät ist nicht störfest genug; Verantwortung beim Betreiber des Geräts. Der Funkamateur **kann seinen Betrieb fortsetzen.**' },
    { id: 'emv-fall3', front: 'Beide Seiten vorschriftsmäßig, Störung bleibt (Konfliktfall): Was kann die BNetzA?', back: '**Abhilfemaßnahmen in Zusammenarbeit mit den Beteiligten** veranlassen. Kein automatisches Bußgeld, Betriebsverbot oder Zulassungsentzug.' },
    { id: 'emv-eigene-stoerung', front: 'Eigener Empfang auf allen Bändern gestört: erste Maßnahme?', back: 'Störquellen im **eigenen Haushalt** suchen: Steckernetzteile, LED-Lampen, Computer, Bildschirme (auch Solar-Wechselrichter).' },
    { id: 'emv-protokoll', front: 'Wiederkehrende Störung von außen: Wie unterstützt du die BNetzA?', back: '**Protokoll** mit Zeitpunkt und Art der Störungen und der **vermuteten Quelle**.' },
    { id: 'emv-abschirmen', front: 'Welche Maßnahmen verbessern die EMV in beide Richtungen?', back: 'Alle HF-führenden Geräte **abschirmen** (geschlossenes Metallgehäuse) und mit **guter HF-Erdung** versehen. Nicht: Wasser- oder Abwasserleitung als Erde.' },
    { id: 'emv-ausnahme', front: 'Wann darf die BNetzA auch ohne Zusammenarbeit anordnen (trotz vorschriftsmäßigem Betrieb)?', back: 'Zum Schutz von **Sicherheitsfunk**, **öffentlichen TK-Netzen** und bei Gefahr für **Leib und Leben** oder **Sachen von bedeutendem Wert** (§ 28 EMVG).' },
  ],
};
