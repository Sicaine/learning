export default {
  id: 'remote-und-fernbediente-stationen',
  title: 'Remote-Betrieb und fernbediente Stationen',
  summary: 'Remote-Station (Klasse A, Betriebsmeldung, mittelbare Kontrolle) und fernbediente/automatische Stationen wie Relais und Baken (eigene Rufzeichenzuteilung, fester Standort).',
  minutes: 15,
  goals: [
    'Den [[remote-betrieb|Remote-Betrieb]] vom Betrieb einer fernbedienten oder automatisch arbeitenden Station unterscheiden',
    'Die Voraussetzungen für Remote-Betrieb nennen: Klasse A, Betriebsmeldung durch den Betreiber, erreichbarer Betreiber, mittelbare Kontrolle',
    'Wissen, wer eine Remote-Station nutzen darf und was für Klubstationen und Ausbildungsfunk gilt',
    'Erklären, wofür Relaisfunkstellen und Baken eine eigene Rufzeichenzuteilung brauchen und was daran gebunden ist',
  ],
  needs: [],
  blocks: [
    {
      id: 'intro', type: 'text', title: 'Zwei Arten von „ferngesteuert“',
      md: `
Eigentlich muss ein [[funkamateur|Funkamateur]] seine Station **besetzt** betreiben: Aussendungen erfolgen nur unter **Aufsicht** — normalerweise unmittelbar an der Sendeanlage. Zwei Ausnahmen gibt es, und sie sind rechtlich völlig getrennt:

- **Remote-Betrieb**: Du bedienst *deine eigene* ortsfeste Funkstelle von woanders aus ([Fernsteuerung](wiki:Fernsteuerung|Telecommand)), z. B. über das [Internet](wiki:Internet|Internet). Du kontrollierst jede Aussendung selbst, nur eben **mittelbar** (über Hilfsmittel). § 2 Nr. 6a [[afuv|AFuV]]: der **unbesetzte, fernbediente Betrieb einer ortsfesten Amateurfunkstelle unter ununterbrochener, mittelbarer und vollständiger Kontrolle** eines zugelassenen Funkamateurs, einschließlich Frequenzwahl sowie Zeitpunkt und Dauer der Aussendungen.[^afuv]
- **Fernbediente oder automatisch arbeitende Stationen** (§ 2 Nr. 4): Stationen, die **ohne Aufsicht** laufen und selbsttätig Aussendungen erzeugen — **[Relaisfunkstellen](wiki:Funkrelais|Amateur radio repeater)**, [Digipeater](wiki:Digipeater), **[Funkbaken](wiki:Funkbake|Electric beacon#Radio beacons)**.[^afuv]

Merke den Unterschied: Beim **Remote-Betrieb** steuert ein Mensch jede Aussendung (nur nicht vor Ort). Eine **Relaisfunkstelle** dagegen sendet von allein, sobald ein Signal an der Eingabe liegt, und eine **Bake** sendet von allein regelmäßig. „Remote“ heißt also *nicht* „über sehr weite Entfernungen“, auch nicht „lokale Steuerung über einen Computer neben dem Funkgerät“ und schon gar nicht „Wettbewerb mit verteilten Aufgaben“.
`,
    },
    {
      id: 'remote-regeln', type: 'text', title: 'Die Remote-Station: Regeln nach § 13a AFuV',
      md: `
Warum sollte jemand remote funken? Weil am Wohnort keine Antenne möglich ist (Mietwohnung, Mieterregeln), aber ein anderer [Funkamateur](wiki:Funkamateur|Amateur radio operator) auf dem Land einen Dachmast hat. Hier ist die Regelung der [Amateurfunkverordnung](wiki:Amateurfunkverordnung) kompakt:[^afuv]

- **Wer darf Remote-Betrieb machen?** Nur **Funkamateure mit der Berechtigung der Klasse A** (§ 13a Abs. 1). Klasse E und N — auch nach einem Jahr — nicht.
- **Wer darf senden?** Auch die vom Betreiber **berechtigten Nutzer** brauchen **Klasse A**. Der Betreiber muss sicherstellen, dass **nur von ihm berechtigte Funkamateure** die Station nutzen können: Die Remote-Station darf **nicht öffentlich** zugänglich sein (§ 13a Abs. 5), und auf Verlangen der BNetzA muss er den Kreis der Berechtigten nennen (Abs. 4).
- **Welche Stationen?** Eine Station mit **personengebundenem Klasse-A-Rufzeichen** oder eine **Klubstation der Klasse A**. Bei einer Klubstation darf der Zugriff **nur Mitgliedern der Gruppe** eingeräumt werden, die die Klubstation betreibt (nicht allen Funkamateuren und nicht nur den auf der Urkunde Eingetragenen).
- **Betriebsmeldung:** Der **Betreiber der Remote-Station** zeigt den Remote-Betrieb bei der BNetzA an (Betriebsmeldung nach § 9 Abs. 4) — nicht der Nutzer, nicht beide — und gibt seine **Kontaktdaten** an (Abs. 3).
- **Warum Kontaktdaten?** Damit die BNetzA bei **funktechnischen Störungen** unverzüglich einen Ansprechpartner hat. Der Betreiber muss während des Betriebs **telefonisch erreichbar** sein (Abs. 5). Nichts mit Rechnungsstellung oder Datenabgleich der Verbände; die Kontaktdaten stehen auch nicht in der Rufzeichenliste.
- **Betriebssicherheit:** Die Station muss unter der **ununterbrochenen mittelbaren Kontrolle** des Betreibers stehen. Praktisch heißt das: Bei Störungen — z. B. Verbindungsverlust — muss sie in einen **sicheren Zustand** gehen (etwa Netzabschaltung), und sie muss **jederzeit auf Anforderung der BNetzA abschaltbar** sein. Eine unterbrechungsfreie Stromversorgung, ein Nutzungsprotokoll oder ein Verbot selbstgebauter Komponenten verlangt die AFuV **nicht**.[^darc-50ohm]
- **Ausbildung:** An einer Remote-Station ist Ausbildungsfunkbetrieb möglich; für den Schüler gilt aber unverändert die **unmittelbare** (persönliche) Anleitung und Aufsicht, und der Zusatz /T bzw. /Trainee ist Pflicht (§ 13a Abs. 6).
- **Rufzeichenzusatz:** freiwillig **/R** bzw. „Remote“ (§ 11 Abs. 4).

Das Rufzeichen selbst wird dir gesondert **für den Verwendungszweck Remote-Betrieb** zugeteilt (§ 13a Abs. 2); es ist dein normales Klasse-A-Rufzeichen.
`,
    },
    {
      id: 'viz-remote', type: 'viz', viz: 'remote-pruefer', title: 'Remote-Station zusammenstellen und prüfen',
      params: {},
      task: 'Stelle eine **zulässige** Remote-Station zusammen und finde dann die Verstöße: **Betreiber nur Klasse E**, **Klubstation mit offenem Zugang** und **Klubstation der Klasse E**.',
      caption: 'Jede rote Zeile nennt Bedingung und Paragraph (§ 13a AFuV).',
    },
    {
      id: 'warn-remote', type: 'callout', tone: 'warning', title: 'Typische Fehlvorstellungen zum Remote-Betrieb',
      md: `
- „Klasse **A oder E** darf remote funken“ oder „Klasse **N**“ oder „wer **ein Jahr** zugelassen ist“ — Nein: **nur Klasse A**.
- „Der **Nutzer** meldet“ oder „**beide**“ oder „keine Pflicht“ — Nein: Der **Betreiber** zeigt an.
- „Der Zugang muss für **alle Funkamateure öffentlich** sein“ — Nein: **nur vom Betreiber berechtigte** Funkamateure.
- „Remote-Nutzer dürfen **keinen Ausbildungsfunk**“ — Doch, dort ist er möglich (mit Aufsicht vor Ort beim Schüler).
- „Zugriff auf die Klubstation nur für **auf der Urkunde eingetragene** Mitglieder“ oder „nur für Funkamateure, die die Station **nicht erreichen** können“ — Nein: **Mitglieder der Gruppe**, die die Klubstation betreibt.
- „Remote-Betrieb ist **Klasse E**, wenn die Klubstation Klasse E hat“ — Nein: Eine Klubstation muss **Klasse A** haben.
`,
    },
    {
      id: 'fernbedient', type: 'text', title: 'Relais, Digipeater, Baken: fernbediente und automatische Stationen',
      md: `
Die zweite Gruppe — **unbesetzte** Stationen, die selbsttätig arbeiten — ist stärker reglementiert, weil dort *niemand* eingreift, wenn etwas schiefgeht. Die Eckpunkte (§ 13 AFuV und Anlage 1):[^afuv]

- **Eigene Rufzeichenzuteilung:** Wer eine **Relaisfunkstelle** oder **Funkbake** betreiben will, braucht **keine besondere (höhere) Klasse** und keinen mehrjährigen Besitz einer Zulassung — er braucht aber eine **gesonderte Rufzeichenzuteilung** für fernbediente oder automatisch arbeitende Stationen (z. B. aus dem Block **DB0, DM0, DO0**), Anträge mit „20 Unterschriften“ sind nicht gefragt. Die Reichweite ist egal; wichtig ist die **Verträglichkeit** mit anderen Nutzungen.
- **Standortgebunden:** Der **Standort** steht in der Zuteilung; die Station darf nur dort und nur unter den dort festgelegten **Rahmenbedingungen** (Frequenz, Leistung, ggf. Auflagen) betrieben werden. Vor der Zuteilung steht eine **standortbezogene [Verträglichkeitsuntersuchung](wiki:Elektromagnetische Verträglichkeit|Electromagnetic compatibility)** für die geplante Frequenz.
- **Leistung:** Oberhalb von **30 MHz** höchstens **50 W ERP** (Anlage 1 AFuV, Nr. 1; ausgenommen sind Remote-Betrieb und Linkstrecken).
- **Abschaltbar:** Der Inhaber muss sicherstellen, dass die Station **jederzeit abgeschaltet** werden kann.
- **Zugang:** Der Funkverkehr über die Station ist jedem Funkamateur mit **zugeteiltem Rufzeichen** zu gestatten. Ihre Aussendungen haben **Vorrang** vor dem übrigen Amateurfunkverkehr (damit sie nicht gestört werden). Zum störungsfreien Betrieb kann der Inhaber einzelne Funkamateure ausschließen und muss die [Bundesnetzagentur](wiki:Bundesnetzagentur|Federal Network Agency) darüber informieren.
- **Widerruf:** Die Zuteilung kann widerrufen werden, wenn die Station **ein Jahr nach Zuteilung nicht in Betrieb** genommen wurde, **mehr als ein Jahr** unterbrochen war, die Verträglichkeit nicht mehr stimmt oder Auflagen verletzt werden.

Die [Rufzeichen](wiki:Rufzeichen|Call sign) für Relais und Baken werden **befristet bis zu 5 Jahren** zugeteilt (Rufzeichenplan Nr. 8).[^bnetza-rufzeichenplan] Wie Relais und Baken technisch funktionieren, lernst du in der nächsten Lektion.
`,
    },
    {
      id: 'match-def', type: 'match', prompt: 'Ordne Begriff und Beschreibung zu.',
      pairs: [
        ['Remote-Betrieb', 'Eigene ortsfeste Station, von einem Funkamateur der Klasse A mittelbar kontrolliert, z. B. über das Internet'],
        ['Relaisfunkstelle', 'Unbesetzt, sendet empfangene Aussendungen selbsttätig weiter'],
        ['Funkbake', 'Unbesetzt, sendet regelmäßig eigene Aussendungen zur Feldstärkebeobachtung'],
        ['Fernbediente Station mit § 13-Rufzeichen', 'Gesonderte Zuteilung, fester Standort, Abschaltbarkeit'],
        ['Betriebsmeldung', 'Anzeige des Remote-Betriebs durch den Betreiber bei der BNetzA'],
      ],
    },
    {
      id: 'quiz-remote', type: 'quiz', title: 'Remote oder fernbedient?',
      question: 'Welche Aussagen sind richtig? (Mehrfachauswahl)',
      options: [
        { text: 'Für eine Relaisfunkstelle braucht der Betreiber eine gesonderte Rufzeichenzuteilung.', correct: true, why: '§ 13 Abs. 1 AFuV.' },
        { text: 'Der Betreiber einer Remote-Station muss bei der BNetzA Kontaktdaten für Störungsfälle angeben.', correct: true, why: '§ 13a Abs. 3 und 5.' },
        { text: 'Mit seinem Klasse-E-Rufzeichen kann man eine Remote-Station betreiben, wenn man das Rufzeichen zusätzlich für Remote zuteilen lässt.', correct: false, why: 'Remote-Betrieb ist nur mit Klasse A zulässig.' },
        { text: 'Eine Remote-Station muss bei Störung jederzeit auf Anforderung der BNetzA abschaltbar sein.', correct: true, why: '§ 13a Abs. 5 Satz 2.' },
        { text: 'Eine Bake darf nur betrieben werden, wenn ihr Inhaber mindestens zwei Jahre zugelassen ist.', correct: false, why: 'Eine Mindestzeit gibt es nicht; nötig ist die Rufzeichenzuteilung für die Bake.' },
      ],
    },
    {
      id: 'num-erp', type: 'numeric', title: 'Leistungsgrenze',
      question: 'Welche maximale **ERP** (in Watt) gilt oberhalb von 30 MHz für fernbediente oder automatisch arbeitende terrestrische Amateurfunkstellen (Relais, Baken)?',
      answer: 50, tolerance: 0, unit: 'W',
      explain: 'Anlage 1 AFuV, Abs. (1): 50 W ERP; Remote-Betrieb ist ausgenommen, Linkstrecken über 1 GHz in begründeten Fällen bis 1000 W ERP.',
    },
    {
      id: 'mission-remote', type: 'callout', tone: 'mission', title: 'Funkpraxis: Remote im Alltag',
      md: `
Mit **Klasse E** kannst du an einer Remote-Station nicht senden — aber du kannst ihr **zuhören**, etwa über einen **WebSDR** ([Software Defined Radio](wiki:Software Defined Radio|Software-defined radio)): Empfangen ist ohne Zulassung erlaubt (§ 9 Abs. 5 AFuV). Und eine Klubstation der Klasse A im Remote-Betrieb? Dort darfst du mit Klasse E vor Ort mitarbeiten, aber nicht aus der Ferne senden.

Prüfungsbezug: VD501, VD502, VD601–VD609.
`,
    },
    {
      id: 'recall-remote', type: 'recall', title: 'In eigenen Worten',
      prompt: 'Ein Bekannter mit Klasse E möchte sich über das Internet in die Funkanlage (Klasse A) seines Freundes einloggen und CQ rufen. Beurteile das und nenne, wer was bei der BNetzA tun muss, wenn der Freund seine Station als Remote-Station betreiben will.',
      answer: 'Nicht zulässig: Wer im Remote-Betrieb sendet, braucht Klasse A (Klasse E reicht nicht), und der Freund (Betreiber) muss sicherstellen, dass nur von ihm berechtigte Klasse-A-Funkamateure Zugang haben. Der Freund als Betreiber meldet den Remote-Betrieb mit Kontaktdaten bei der BNetzA an (Betriebsmeldung), muss telefonisch erreichbar sein und die Station muss mittelbar kontrolliert und jederzeit abschaltbar sein (sicherer Zustand bei Verbindungsverlust).',
      cards: ['remote-def', 'remote-klasse'],
    },
  ],
  cards: [
    { id: 'remote-def', front: 'Definition **Remote-Betrieb** (§ 2 Nr. 6a)?', back: 'Unbesetzter, fernbedienter Betrieb einer **ortsfesten** Amateurfunkstelle unter **ununterbrochener, mittelbarer und vollständiger Kontrolle** eines zugelassenen Funkamateurs (inkl. Frequenz, Zeitpunkt, Dauer).' },
    { id: 'remote-klasse', front: 'Wer darf Remote-Betrieb machen / senden?', back: 'Nur Funkamateure mit **Klasse A** (Betreiber *und* berechtigte Nutzer). Klubstation: Klasse A, Zugriff nur für **Mitglieder der Gruppe**.' },
    { id: 'remote-meldung', front: 'Remote-Betrieb: Betriebsmeldung durch wen? Wozu die Kontaktdaten?', back: 'Durch den **Betreiber** der Remote-Station. Kontaktdaten: Ansprechpartner für die BNetzA bei **funktechnischen Störungen**; Betreiber muss telefonisch erreichbar sein.' },
    { id: 'remote-kontrolle', front: 'Wie sichert der Remote-Betreiber die Betriebssicherheit?', back: '**Mittelbare Kontrolle**: sicherer Zustand bei Störung/Verbindungsverlust (z. B. Netz aus), jederzeit **abschaltbar** auf Anforderung der BNetzA, Schutz vor unbefugtem Zugriff.' },
    { id: 'remote-zugang', front: 'Remote-Station: wer bekommt Zugang?', back: 'Nur vom **Betreiber berechtigte** Funkamateure — nicht öffentlich für alle.' },
    { id: 'remote-zusatz', front: 'Rufzeichenzusatz bei Remote?', back: '**/R** bzw. „Remote“ (freiwillig). Mit Ausbildung: **/Tr** (T zuerst, Pflicht).' },
    { id: 'fb-zuteilung', front: 'Relaisfunkstelle/Funkbake betreiben — was ist nötig?', back: 'Eine **gesonderte Rufzeichenzuteilung** für fernbediente/automatische Stationen; Betrieb nur am zugeteilten **Standort** mit den festgelegten Rahmenbedingungen.' },
    { id: 'fb-leistung', front: 'Leistungsgrenze fernbedient/automatisch über 30 MHz?', back: '**50 W ERP** (Anlage 1 AFuV); Station muss **jederzeit abschaltbar** sein.' },
    { id: 'fb-vorrang', front: 'Vorrang beim Betrieb von Relais und Baken?', back: 'Ihre Aussendungen haben **Vorrang vor dem übrigen Amateurfunkverkehr** (§ 13 Abs. 4). Der Inhaber darf bei Störungen einzelne Funkamateure ausschließen (BNetzA informieren).' },
    { id: 'fb-widerruf', front: 'Wann kann die Zuteilung einer Relaisfunkstelle/Bake widerrufen werden?', back: 'u. a. wenn **innerhalb eines Jahres** kein Betrieb aufgenommen wurde, **> 1 Jahr Unterbrechung**, Verträglichkeit nicht mehr gewährleistet, Auflagen verletzt.' },
  ],
};
