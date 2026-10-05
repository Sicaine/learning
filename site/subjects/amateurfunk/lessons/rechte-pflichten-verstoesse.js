export default {
  id: 'rechte-pflichten-verstoesse',
  title: 'Rechte, Pflichten, Gebühren und Verstöße',
  summary: 'Was dir als Funkamateur erlaubt ist (Selbstbau), was du melden und bezahlen musst, was das Fernmeldegeheimnis verlangt und welche Folgen Verstöße haben: Bußgeld, Strafe, Einschränkung, Widerruf.',
  minutes: 20,
  goals: [
    'Das Recht zum Selbstbau nennen und den Anwendungsbereich des [[fuag|Funkanlagengesetzes]] abgrenzen (CE-Kennzeichnung nur für auf dem Markt bereitgestellte Geräte)',
    'Meldepflichten (Namen, Anschrift, Standort), Rufzeichenliste, Gebühren und jährliche Beiträge richtig zuordnen',
    'Abhörverbot und [[fernmeldegeheimnis|Fernmeldegeheimnis]] anwenden: Was darfst du empfangen, was weitergeben?',
    'Zu einem Verstoß die richtige Folge nennen: Ordnungswidrigkeit mit Bußgeld, Straftat, Betriebseinschränkung, Widerruf der Zulassung',
  ],
  needs: [],
  blocks: [
    {
      id: 'intro', type: 'text', title: 'Rechte und Pflichten in einem Satz',
      md: String.raw`
Als Funkamateur bist du **privilegiert**: Das [Amateurfunkgesetz](wiki:Amateurfunkgesetz) erlaubt dir, Sendeanlagen selbst zu bauen, umzubauen und zu betreiben, und die [Amateurfunkverordnung](wiki:Amateurfunkverordnung) regelt die Einzelheiten. Du darfst Sendeanlagen betreiben, ohne dass sie jemand typgeprüft hat. Dafür trägst du **Pflichten**: Du musst dich an die Gesetze halten, die Behörde kennt deine Anschrift, du darfst nur bestimmte Nachrichten empfangen und weitergeben, und du zahlst Gebühren und einen jährlichen Beitrag. Wer sich nicht daran hält, bekommt **abgestufte Folgen**: von der Betriebseinschränkung über das Bußgeld ([Ordnungswidrigkeit](wiki:Ordnungswidrigkeit|Contravention) mit [Geldbuße](wiki:Geldbuße|Fine (penalty))) bis zur Strafe ([Freiheitsstrafe](wiki:Freiheitsstrafe|Custodial sentence) oder Geldstrafe).

Die Rechtsgrundlagen dieser Lektion (alle Paragraphen im Stand vom 05.10.2026):

<table>
<tr><th>Gesetz</th><th>Kurz</th><th>Worum geht es?</th></tr>
<tr><td>Amateurfunkgesetz</td><td>AFuG</td><td>Rechte und Pflichten des Funkamateurs (§ 5), Zulassung/Widerruf (§ 3), Bußgeld (§ 9)</td></tr>
<tr><td>Amateurfunkverordnung</td><td>AFuV</td><td>Meldepflichten (§ 9), Rufzeichenliste (§ 15), technische/betriebliche Regeln (§ 16)</td></tr>
<tr><td>Funkanlagengesetz</td><td>FuAG</td><td>Inverkehrbringen von Funkanlagen (CE)</td></tr>
<tr><td>Telekommunikationsgesetz</td><td>TKG</td><td>Frequenzzuteilung, Beiträge, Bußgeld bei Nutzung ohne Zuteilung</td></tr>
<tr><td>Telekommunikation-Telemedien-Datenschutz-Gesetz (jetzt TDDDG)</td><td>TTDSG/TDDDG</td><td>Fernmeldegeheimnis, Abhörverbot, Strafvorschriften</td></tr>
<tr><td>Besondere Gebührenverordnung Telekommunikation</td><td>BMDVTKBGebV</td><td>Gebühren für Prüfung, Zulassung, Änderungen</td></tr>
</table>

[^afug][^afuv][^fuag][^ttdsg][^tkg][^bmdv-gebuehren]`,
    },
    {
      id: 'mission-einmal', type: 'callout', tone: 'mission', title: 'Funkpraxis: Die drei häufigsten Stolpersteine',
      md: String.raw`In der Praxis stolpern Funkamateure kaum über das Bußgeld, sondern über Kleinigkeiten: (1) **Umzug vergessen zu melden**, dann stimmt die Anschrift in der Rufzeichenliste nicht. (2) **Neugier am Empfänger**: ein interessantes Gespräch außerhalb der Amateurfunkbänder, das man dann weitererzählt. (3) **Mitgefunkt für Dritte**: Der Onkel möchte „nur kurz“ ein Geschäftsgespräch führen. Alle drei lassen sich mit zwei Sätzen aus dieser Lektion vermeiden.`,
    },
    {
      id: 'selbstbau', type: 'text', title: 'Selbstbau, CE-Kennzeichen und das Funkanlagengesetz',
      md: String.raw`
Sender und Sendeanlagen benötigen normalerweise eine behördliche Zulassung bzw. ein Konformitätsbewertungsverfahren. **Funkamateure sind davon ausgenommen:** Mit einem zugeteilten Rufzeichen darfst du eine **im Handel erhältliche, selbstgefertigte oder auf Amateurfunkfrequenzen umgebaute** Amateurfunkstelle betreiben (**§ 5 Abs. 2 AFuG**).[^afug] Dieses Privileg ist der Grund dafür, dass Funkamateure ihr Fachwissen in einer anspruchsvollen Prüfung nachweisen müssen.

Das **[[fuag|Funkanlagengesetz]]** (FuAG, [Funkanlagengesetz](wiki:Funkanlagengesetz)) regelt dagegen das **Inverkehrbringen**, den **freien Warenverkehr** und die **Inbetriebnahme** von **auf dem Markt bereitgestellten** Funkanlagen, darunter Amateurfunkgeräte. Sein Anwendungsbereich schließt Funkanlagen von Funkamateuren aus, **es sei denn, sie werden auf dem Markt bereitgestellt**. Als *nicht* auf dem Markt bereitgestellt gelten ausdrücklich: **Bausätze**, die Funkamateure zusammenbauen, von Funkamateuren **umgebaute** Funkanlagen und im Rahmen des Amateurfunkdienstes zu experimentellen und wissenschaftlichen Zwecken **zusammengebaute** Anlagen (§ 2 Abs. 1 Nr. 1 FuAG).[^fuag]

<table>
<tr><th>Gerät</th><th>FuAG anzuwenden?</th><th>CE-Kennzeichen?</th></tr>
<tr><td>**Seriengefertigtes** Amateurfunkgerät aus dem Handel</td><td>**Ja**: Hersteller erstellt eine EU-[Konformitätserklärung](wiki:Konformitätserklärung)</td><td>**Ja** ([CE-Kennzeichnung](wiki:CE-Kennzeichnung</td><td>CE marking))</td></tr>
<tr><td>**Selbstgebautes** Gerät</td><td>Nein</td><td>Nein; kein Nachweis, keine Vorstellung bei der BNetzA</td></tr>
<tr><td>**Bausatz**, selbst zusammengebaut</td><td>Nein</td><td>Nein</td></tr>
<tr><td>**Umgebautes** kommerzielles Gerät</td><td>Nein (gilt als nicht bereitgestellt)</td><td>Nein</td></tr>
<tr><td>Handelsüblicher **Empfänger**, der Amateurfunkfrequenzen empfängt</td><td>**Ja**: Es gelten die Bestimmungen des FuAG</td><td>Ja</td></tr>
</table>

Zu den Fehlvorstellungen: Weder ist ein Selbstbau „nicht zulässig“ noch muss er der BNetzA zur Prüfung vorgeführt werden; eine nationale Zulassungskennzeichnung der BNetzA gibt es nicht; und die Amateurfunkverordnung regelt nicht die Anforderungen an Empfänger. **Elektrische Sicherheit** musst du natürlich auch beim Selbstbau beachten (siehe Lektion zur Sicherheit).`,
    },
    {
      id: 'match-fuag', type: 'match', title: 'Gerät → Regel',
      prompt: 'Welche Regel gilt für welches Gerät?',
      pairs: [
        ['Im Handel gekauftes Amateurfunk-Transceiver', 'FuAG gilt: CE-Kennzeichnung und EU-Konformitätserklärung'],
        ['Selbstgebauter Verstärker', 'FuAG gilt nicht, kein CE nötig'],
        ['Bausatz, den du selbst zusammenlötest', 'Gilt als nicht auf dem Markt bereitgestellt: kein FuAG'],
        ['Im Handel gekaufter Allband-Empfänger', 'FuAG gilt auch für Empfangsfunkanlagen'],
      ],
    },
    {
      id: 'pflichten', type: 'text', title: 'Pflichten und Grenzen im Funkbetrieb (AFuG § 5)',
      md: String.raw`
**§ 5 AFuG** bündelt die wichtigsten Rechte und Pflichten des Funkamateurs:[^afug]

1. Du darfst nur das **dir zugeteilte Rufzeichen** benutzen (Abs. 1).
2. Du darfst nur auf den im **Frequenzplan** für den Amateurfunkdienst ausgewiesenen Frequenzen senden (Abs. 3, mit § 3 Abs. 5).
3. Die Amateurfunkstelle darf **nicht zu gewerblich-wirtschaftlichen Zwecken** und **nicht zum geschäftsmäßigen Erbringen von Telekommunikationsdiensten** betrieben werden (Abs. 4).
4. Du darfst nur mit **anderen Amateurfunkstellen** Funkverkehr abwickeln und **keine Nachrichten übermitteln, die nicht den Amateurfunkdienst betreffen, für oder an Dritte**; das gilt **nicht in Not- und Katastrophenfällen** (Abs. 5).

Ein **Nachweis zum Personenschutz** ist keineswegs „nie nötig“: Für ortsfeste Anlagen ab 10 W EIRP gilt das Anzeigeverfahren nach BEMFV (siehe Lektion zum Personenschutz), und auf Antrag erteilt die BNetzA eine Standortbescheinigung (§ 7 Abs. 3 AFuG).`,
    },
    {
      id: 'anschrift', type: 'text', title: 'Meldepflichten, Rufzeichenliste und Gebühren',
      md: String.raw`
**Änderungen melden (§ 9 Abs. 4 AFuV).** Der Inhaber einer Zulassung hat **jede Änderung des Namens oder der Anschrift unverzüglich** schriftlich oder elektronisch der Bundesnetzagentur **anzuzeigen**, und zwar **nach** der Änderung (nicht vorher, nicht binnen starrer Wochenfristen), **auch wenn er gar keine Amateurfunkstelle besitzt oder betreibt**. Anders bei den Standorten: Die **Neuerrichtung einer ortsfesten Amateurfunkstelle** oder die **dauerhafte Verlegung eines Standorts** musst du **vor der Inbetriebnahme** anzeigen.[^afuv]

**Rufzeichenliste (§ 15 AFuV).** Die BNetzA veröffentlicht die zugeteilten Rufzeichen und ihre Inhaber in einer **Rufzeichenliste**: Rufzeichen, Klasse und Verwendungszweck, Name, Vorname, Anschrift und Standort der ortsfesten Amateurfunkstelle. Der Eintragung kann **widersprochen** werden. Für den Funkamateur gilt vereinfacht: Veröffentlicht werden **Name, Rufzeichen und, wenn nicht widersprochen wurde, die Anschrift**. Nicht enthalten sind E-Mail-Adresse, Telefonnummer oder Geburtsdatum. Praktisch: Bist du dir bei einem deutschen Funkpartner beim Namen unsicher, kannst du das Rufzeichen online in der Rufzeichenliste der BNetzA nachschlagen.

**Gebühren und Beiträge.** Zwei Arten von Zahlungen sind zu unterscheiden:

- **Gebühren** (einmalig, für Amtshandlungen) nach der **Besonderen Gebührenverordnung Telekommunikation** (BMDVTKBGebV; im Fragenkatalog noch als „BNetzABGebV“ bezeichnet). Auszug (Stand der Fassung 23.07.2024):[^bmdv-gebuehren]

<table>
<tr><th>Amtshandlung</th><th>Gebühr</th></tr>
<tr><td>Erstprüfung Klasse E</td><td>73,50 €</td></tr>
<tr><td>**Erteilung der Zulassung und Zuteilung eines personengebundenen Rufzeichens**</td><td>**20,00 €**</td></tr>
<tr><td>Änderung von Namen und/oder Anschrift (inkl. neuer Urkunde)</td><td>18,50 €</td></tr>
<tr><td>Verzicht auf die Zulassung</td><td>15,00 €</td></tr>
<tr><td>Widerspruch gegen die Eintragung in die Rufzeichenliste</td><td>15,00 €</td></tr>
<tr><td>Maßnahmen zur Ermittlung oder Beseitigung von Verstößen</td><td>nach Zeitaufwand</td></tr>
</table>

- **Frequenzschutzbeiträge** (jährlich) nach dem TKG und dem EMVG, im Detail in der **Frequenzschutzbeitragsverordnung (FSBeitrV)** geregelt. Sie sind fällig, **wenn du über eine Zulassung zum Amateurfunkdienst verfügst** (nicht erst bei Errichtung oder Betrieb einer Station, auch nicht befreit durch eine Vereinsmitgliedschaft). Die Zahlungsaufforderung kommt als **Gebührenbescheid** der BNetzA.

Als gebührenpflichtiger Tatbestand nennt der Katalog die **Erteilung der Zulassung** mit Zuteilung des Rufzeichens, nicht die Prüfung eingereichter BEMFV-Unterlagen und nicht eine EMV-Prüfung deiner Station.

**Nicht gezahlte** Gebühren und Beiträge treibt die [Bundesnetzagentur](wiki:Bundesnetzagentur|Federal Network Agency) nach dem **[Verwaltungs-Vollstreckungsgesetz](wiki:Verwaltungs-Vollstreckungsgesetz)** (VwVG) ein; weder ein Bußgeld noch der Entzug des Amateurfunkzeugnisses drohen deswegen.`,
    },
    {
      id: 'calc-gebuehr', type: 'numeric', title: 'Gebühren zusammenzählen',
      question: 'Du legst die Erstprüfung Klasse E ab (alle vier Teile), bekommst die Zulassung mit Rufzeichen und ziehst ein halbes Jahr später um (Mitteilung der neuen Anschrift mit neuer Urkunde). Wie viel Euro betragen die genannten Gebühren zusammen (ohne Beiträge)?',
      answer: 112, tolerance: 0.01, unit: '€',
      hint: 'Drei Posten aus der Tabelle: Erstprüfung E, Zulassung mit Rufzeichen, Änderung der Anschrift.',
      explain: '73,50 € + 20,00 € + 18,50 € = **112,00 €**. Nicht dabei: der jährliche Frequenzschutzbeitrag (Gebührenbescheid, getrennt von den einmaligen Gebühren). Stand der Gebührenverordnung: Fassung vom 23.07.2024.',
    },
    {
      id: 'abhoeren', type: 'text', title: 'Abhörverbot, Fernmeldegeheimnis und „Wanzen“',
      md: String.raw`
Das **[[fernmeldegeheimnis|Fernmeldegeheimnis]]** ([Fernmeldegeheimnis](wiki:Fernmeldegeheimnis)) gilt auch für Funkamateure. **§ 5 des TTDSG** (heute TDDDG) enthält das **Abhörverbot und die Geheimhaltungspflicht der Betreiber von Funkanlagen**:[^ttdsg]

- **Abs. 1:** Mit einer Funkanlage dürfen nur Nachrichten abgehört oder zur Kenntnis genommen werden, die **für den Betreiber**, **für Funkamateure**, **für die Allgemeinheit** oder **für einen unbestimmten Personenkreis** bestimmt sind. Alles andere ist **verboten**: schon der Empfang selbst, aber auch die Verwertung und Weitergabe.
- **Abs. 2:** Den **Inhalt** anderer Nachrichten **und sogar die Tatsache ihres Empfangs** darfst du anderen **nicht mitteilen**, auch dann nicht, wenn du sie **unbeabsichtigt** empfangen hast. Ausnahme: **Not- und Katastrophenfälle** (Güterabwägung: Hilfe im Notfall wiegt schwerer als der Verstoß).

Wer das Abhörverbot verletzt, macht sich **strafbar**: **§ 27 Abs. 1 TTDSG** droht **Freiheitsstrafe bis zu zwei Jahren oder Geldstrafe** an, für das Abhören, für die verbotene Mitteilung und für Herstellung oder Bereitstellung verbotener „Wanzen“. Das Abhören des nichtöffentlich gesprochenen Wortes ist also ein **Straftatbestand** und keine Ordnungswidrigkeit. Eine „besondere Zulassung“ gibt es nicht, und auch ein technisch zugelassener Empfänger macht es nicht erlaubt.

**„Wanzen“ (§ 8 TTDSG):** Verboten sind **Besitz und Herstellung** von Sendeanlagen (sogenannte [Abhörgeräte](wiki:Abhörgerät|Covert listening device)), die **einen anderen Gegenstand vortäuschen** (z. B. Kugelschreiber mit Mikrofon) und deshalb besonders zum heimlichen Abhören geeignet sind. Das gilt für alle, auch für Funkamateure. Nicht verboten sind Scanner, die breitbandig empfangen, Richtmikrofone oder digitale Tonaufnahmegeräte allein deshalb.

> Für den **Empfang** von Aussendungen brauchst du übrigens keine Zulassung (§ 9 Abs. 5 AFuV); nur das *Senden* ist an Prüfung, Zulassung und Rufzeichen gebunden.[^afuv]`,
    },
    {
      id: 'quiz-abhoeren', type: 'quiz', title: 'Darf ich das erzählen?',
      question: 'Beim Durchdrehen des Abstimmknopfes hörst du zufällig ein Gespräch zwischen zwei Handwerkern über deren Auftrag (kein Amateurfunk). Was gilt?',
      options: [
        { text: 'Du darfst weder den Inhalt noch die Tatsache des Empfangs anderen mitteilen; Ausnahme: Not- und Katastrophenfälle.', correct: true, why: 'TTDSG § 5 Abs. 2: Auch bei unbeabsichtigtem Empfang darfst du Inhalt und Tatsache des Empfangs nicht mitteilen.' },
        { text: 'Du darfst die Tatsache des Empfangs erzählen, aber nicht den Inhalt.', why: 'Auch die Tatsache des Empfangs ist geheim zu halten.' },
        { text: 'Du darfst es anderen Funkamateuren weitererzählen.', why: 'Das Gesetz sieht keine Ausnahme für Funkamateure vor.' },
        { text: 'Du musst sofort den Empfänger ausschalten und die Bundesnetzagentur informieren.', why: 'Eine Meldepflicht gibt es nicht; verboten ist die Mitteilung an andere.' },
      ],
    },
    {
      id: 'verstoesse', type: 'text', title: 'Verstöße und ihre Folgen',
      md: String.raw`
Wo Regeln sind, sind Folgen. Sie sind abgestuft, und die Prüfung fragt die **Zuordnung** ab. Die Bundesnetzagentur ist zuständige Verwaltungsbehörde (§ 9 Abs. 3 AFuG).[^afug]

<table>
<tr><th>Stufe</th><th>Wann?</th><th>Folge</th></tr>
<tr><td>**Maßnahmen der BNetzA**</td><td>Verstoß gegen AFuG oder AFuV</td><td>**Einschränkung des Betriebs oder Außerbetriebnahme** der Amateurfunkstelle (nicht: sofortiger Abbau vor Ort, nicht: Unbrauchbarmachen durch Entnahme von Sender-Teilen)</td></tr>
<tr><td>**Widerruf der Zulassung**</td><td>**fortgesetzte** Verstöße gegen AFuG oder AFuV (§ 3 Abs. 4 AFuG)</td><td>Zulassung und Rufzeichen werden entzogen: der „schärfste“ Verwaltungsakt. Das **Amateurfunkzeugnis** bleibt (Aberkennung nicht vorgesehen): Du bleibst Funkamateur, darfst aber nicht funken.</td></tr>
<tr><td>**Ordnungswidrigkeit**</td><td>Betrieb ohne Zulassung und Rufzeichen (§ 3 Abs. 3), Nachrichten für Dritte (§ 5 Abs. 5 S. 2): Geldbuße **bis 5.000 €**; **geschäftsmäßiges Erbringen von Telekommunikationsdiensten** (§ 5 Abs. 4 Nr. 2): **bis 10.000 €** (§ 9 AFuG)</td><td>**Geldbuße**; Beschlagnahme der Anlage, Entzug des Zeugnisses oder eine „Nachprüfung“ sind keine Folgen</td></tr>
<tr><td>**Ordnungswidrigkeit nach TKG**</td><td>**Nutzung von Frequenzen ohne Frequenzzuteilung**, z. B. Senden außerhalb der Amateurfunkbänder</td><td>Geldbuße</td></tr>
<tr><td>**Straftat**</td><td>Abhören nichtöffentlichen Wortes, verbotene Mitteilung (TTDSG § 27)</td><td>Freiheitsstrafe bis zu 2 Jahren oder Geldstrafe</td></tr>
<tr><td>**Vollstreckung**</td><td>Gebühren/Beiträge nicht bezahlt</td><td>Maßnahmen nach dem Verwaltungs-Vollstreckungsgesetz</td></tr>
</table>

Ein Verstoß gegen die **AFuV** (zu hohe Leistung, falsche Rufzeichennennung, zu große Bandbreite, Verschlüsselung …) steht **nicht** in der Bußgeldliste des § 9 AFuG, kann aber Maßnahmen der Behörde und bei Fortsetzung den Widerruf nach sich ziehen. Betriebseinschränkungen kosten übrigens Geld: Die Gebührenverordnung nennt „Maßnahmen zur Ermittlung oder Beseitigung von Verstößen“ nach Zeitaufwand.[^bmdv-gebuehren]`,
    },
    {
      id: 'warn-verstoesse', type: 'callout', tone: 'warning', title: 'Wichtige Unterscheidungen',
      md: String.raw`- **Ordnungswidrigkeit ≠ Straftat.** Abhören ist strafbar (TTDSG), Betrieb ohne Rufzeichen ordnungswidrig (AFuG), Senden außerhalb der Bänder ordnungswidrig (TKG).
- **Zeugnis ≠ Zulassung.** Die Zulassung kann widerrufen werden, das Zeugnis nicht.
- **Eine Ordnungswidrigkeit führt nicht automatisch** zu Entzug des Zeugnisses, Beschlagnahme oder Nachprüfung, sondern zur **Geldbuße**.
- **Nachprüfung** hat nichts mit Verstößen zu tun: Es ist die mündliche Prüfung ab 17 Punkten.
- **Prüfungsbezug:** VC122, VC123, VC124, VC125, VE103, VE201, VE202, VE203, VE204, VE704.`,
    },
    {
      id: 'demo-darf', type: 'viz', viz: 'darf-ich-das', title: 'Demo: Darf ich das?',
      intro: 'Vierzehn Situationen aus dem Funkalltag. Ordne jede der richtigen Rechtsfolge zu; nach jeder Karte siehst du den Paragraphen.',
      params: { need: 11 },
      task: 'Ordne mindestens **11 von 14** Situationen richtig ein.',
    },
    {
      id: 'match-gesetz', type: 'match', title: 'Tatbestand → Gesetz und Folge',
      prompt: 'Aus welchem Gesetz stammt welcher Tatbestand?',
      pairs: [
        ['Nutzung einer Frequenz ohne Frequenzzuteilung', 'TKG: Ordnungswidrigkeit'],
        ['Nachrichten für Dritte, die den Amateurfunkdienst nicht betreffen (kein Notfall)', 'AFuG: Ordnungswidrigkeit'],
        ['Abhören nichtöffentlich gesprochenen Wortes', 'TTDSG: Straftat'],
        ['Inverkehrbringen eines seriengefertigten Funkgeräts ohne CE', 'FuAG: Anforderungen an Marktbereitstellung'],
        ['Nichtzahlung des Jahresbeitrags', 'VwVG: Vollstreckung'],
      ],
    },
    {
      id: 'video-recht', type: 'video', youtube: 'VdCP90XGQUU', label: 'Lektion 14 - Gesetze und Vorschriften', channel: 'DL2YMR',
      why: 'Aus dem Videolehrgang zur Klasse N von DL2YMR; der Titel nennt das Thema Gesetze und Vorschriften, das hier für Klasse E vertieft wird.',
    },
    {
      id: 'recall-recht', type: 'recall', title: 'In eigenen Worten',
      prompt: 'Ein Bekannter möchte, dass du über deine Station eine Nachricht an seinen Freund weitergibst (Terminverschiebung für sein Geschäft). Ordne rechtlich ein, was du darfst, was bei einem Verstoß droht, und was für den Notfall gilt. Dazu: Welche Meldepflicht hast du bei einem Umzug?',
      answer: 'Nachrichten, die nicht den Amateurfunkdienst betreffen, darf ich für oder an Dritte nicht übermitteln (AFuG § 5 Abs. 5 Satz 2); es ist eine Ordnungswidrigkeit mit Geldbuße bis zu 5.000 € (§ 9 AFuG). In Not- und Katastrophenfällen gilt das Verbot nicht. Bei fortgesetzten Verstößen kann die BNetzA die Zulassung widerrufen; mein Zeugnis bleibt. Bei einem Umzug muss ich die neue Anschrift unverzüglich nach der Änderung der BNetzA anzeigen (AFuV § 9 Abs. 4), auch ohne Amateurfunkstelle; das kostet 18,50 €.',
      cards: ['ru-dritte', 'ru-anschrift', 'ru-widerruf'],
    },
  ],
  cards: [
    { id: 'ru-selbstbau', front: 'Welches Recht haben Funkamateure beim Betrieb von Sendeanlagen?', back: 'Sie dürfen **im Handel erhältliche, selbstgefertigte oder umgebaute** Sendeanlagen betreiben (AFuG § 5 Abs. 2).' },
    { id: 'ru-fuag', front: 'Für welche Amateurfunkgeräte gilt das FuAG, wofür nicht?', back: 'Gilt für **auf dem Markt bereitgestellte** Geräte (CE-Kennzeichnung nötig, auch Empfänger). Gilt **nicht** für Selbstbau, Umbau, Bausätze.' },
    { id: 'ru-dritte', front: 'Nachrichten für und an Dritte (nicht Amateurfunk)?', back: 'Verboten (AFuG § 5 Abs. 5): **Ordnungswidrigkeit**. **Ausnahme:** Not- und Katastrophenfälle.' },
    { id: 'ru-owi', front: 'Ordnungswidrigkeiten nach AFuG § 9 und Bußgeldhöhe?', back: 'Betrieb ohne Zulassung/Rufzeichen und Nachrichten für Dritte: bis **5.000 €**. Geschäftsmäßiges Erbringen von TK-Diensten: bis **10.000 €**.' },
    { id: 'ru-tkg', front: 'Welcher Tatbestand ist eine Ordnungswidrigkeit nach dem TKG?', back: '**Nutzung von Frequenzen ohne Frequenzzuteilung** (z. B. Senden außerhalb der Amateurbänder).' },
    { id: 'ru-widerruf', front: 'Folge fortgesetzter Verstöße gegen AFuG/AFuV?', back: '**Widerruf der Zulassung** (AFuG § 3 Abs. 4). Das Amateurfunkzeugnis bleibt; keine Nachprüfung, kein Zeugniseinzug.' },
    { id: 'ru-massnahmen', front: 'Was kann die BNetzA bei Verstößen gegen AFuG/AFuV anordnen?', back: '**Einschränkung des Betriebs** oder **Außerbetriebnahme**. Nicht: Abbau vor Ort, Unbrauchbarmachen, kostenpflichtige Nachprüfung.' },
    { id: 'ru-anschrift', front: 'Frist für die Mitteilung einer Änderung von Name/Anschrift?', back: '**Unverzüglich nach der Änderung** (AFuV § 9 Abs. 4), auch ohne Amateurfunkstelle. Kostet 18,50 €.' },
    { id: 'ru-rzliste', front: 'Welche Daten stehen in der Rufzeichenliste der BNetzA?', back: '**Name, Rufzeichen** und, wenn nicht widersprochen wurde, die **Anschrift**. Keine E-Mail, Telefonnummer, Geburtsdatum.' },
    { id: 'ru-abhoer', front: 'Welche Nachrichten darfst du mit der Funkanlage empfangen?', back: 'Nur solche für den **Betreiber**, **Funkamateure**, die **Allgemeinheit** oder einen **unbestimmten Personenkreis** (§ 5 TTDSG). Abhören anderer ist eine **Straftat**.' },
    { id: 'ru-mitteilung', front: 'Unbeabsichtigter Empfang nicht für dich bestimmter Nachrichten: Was musst du beachten?', back: '**Inhalt und Tatsache des Empfangs** dürfen nicht mitgeteilt werden. **Ausnahme: Not- und Katastrophenfälle.**' },
    { id: 'ru-wanze', front: 'Welche Geräte sind verboten (Herstellung und Besitz)?', back: 'Sendeanlagen, die **einen anderen Gegenstand vortäuschen** und zum heimlichen Abhören geeignet sind („Wanzen“). Nicht verboten: Scanner, Richtmikrofone.' },
    { id: 'ru-beitrag', front: 'Wann zahlt der Funkamateur jährliche Frequenzschutzbeiträge?', back: 'Immer, wenn er über eine **Zulassung** zum Amateurfunkdienst verfügt (FSBeitrV, nach TKG und EMVG).' },
    { id: 'ru-gebuehr', front: 'Welche Gebühr fällt bei der Zulassung an, und was bei Nichtzahlung?', back: 'Zulassung mit Rufzeichen: **20,00 €** (BMDVTKBGebV). Nichtzahlung: **Verwaltungsvollstreckung (VwVG)**, kein Bußgeld, kein Zeugniseinzug.' },
  ],
};
