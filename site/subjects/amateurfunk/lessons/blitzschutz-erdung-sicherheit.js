export default {
  id: 'blitzschutz-erdung-sicherheit',
  title: 'Blitzschutz, Erdung und Antennensicherheit',
  summary: 'Antennen und Station sicher aufbauen: Potentialausgleich und Erdung, Blitzschutz nach VDE, statische Aufladung, Gefahren an Antenne und Netzteil, Baurecht und Haftung.',
  minutes: 25,
  goals: [
    '[[potentialausgleich|Potentialausgleich]] und [[erdung|Erdung]] der Station beschreiben (Haupterdungsschiene, Koaxschirme, kurze Verbindungen) und die zuständigen VDE-Normen zuordnen',
    'Material und Mindestquerschnitt einer Erdungsleitung nennen und wissen, wer am Blitzschutzsystem arbeiten darf',
    'Statische Aufladung von Drahtantennen erklären und das passende Gegenmittel (hochohmiger Ableitwiderstand) nennen',
    'Gefahren an Sendeantenne, Mikrowellenspiegel, Freileitungen und im geöffneten Gerät benennen sowie Baurecht und Haftung zuordnen',
  ],
  needs: ['elektrotechnik/fi-sicherung-erdung', 'elektrotechnik/koerperstrom-schutz'],
  blocks: [
    {
      id: 'intro', type: 'text', title: 'Wo es gefährlich wird: ein Überblick',
      md: String.raw`
Sicherheit im Amateurfunk heißt zunächst: Nichts an deiner Station darf Menschen gefährden. Das Aufgabenfeld dieser Lektion umfasst vier Bereiche, die in der Prüfung getrennt abgefragt werden:

1. **Blitz, Überspannung und Erdung:** Antennen sind exponiert; Station und Gebäude brauchen Schutz.
2. **Elektrische Gefahren an der Antenne:** Berührung im Sendebetrieb, statische Aufladung, Freileitungen.
3. **Gefahren im Gerät:** gespeicherte Energie im Netzteil.
4. **Recht:** Baurecht der Länder, VDE-Normen als „anerkannte Regeln der Technik“ und Haftung des Betreibers.

Für den Alltag gilt zusätzlich ein Grundsatz der Elektrotechnik: *Arbeiten an der 230-V-Netzseite eines Geräts dürfen grundsätzlich nur von einer Elektrofachkraft durchgeführt werden*.[^darc-50ohm]`,
    },
    {
      id: 'mission-aufbau', type: 'callout', tone: 'mission', title: 'Funkpraxis: Dein erstes Dach',
      md: String.raw`Du hast einen Dipol für 40 m gekauft und willst ihn auf dem Dach spannen. Bevor du hochkletterst: Gibt es eine Blitzschutzanlage am Haus? Wo ist die **Haupterdungsschiene**? Dürfen Antennenteile bei Sturm auf eine Freileitung fallen? Und wer haftet, wenn der Mast auf das Nachbarauto stürzt? Wer diese vier Fragen vor dem Aufbau beantwortet, spart sich Ärger. Die Lektion gibt dir die Antworten, die auch die Prüfung hören will.`,
    },
    {
      id: 'potentialausgleich', type: 'text', title: 'Potentialausgleich und Erdung der Station',
      md: String.raw`
Alle elektrisch leitfähigen Teile in deiner Station können unerwünschte **Potentiale** aufweisen: durch elektrostatische Aufladung, durch einen Blitz oder durch den Fehler irgendeiner elektrischen Anlage in der Umgebung. Damit zwischen zwei berührbaren Teilen keine gefährliche **Berührungsspannung** entsteht, verbindet man alle leitenden Teile miteinander. Das ist der **[[potentialausgleich|Potentialausgleich]]** ([Potentialausgleich](wiki:Potentialausgleich|Electrical bonding)). Die **[[erdung|Erdung]]** ([Erdung](wiki:Erdung|Earthing system)) sorgt zusätzlich dafür, dass bei einem Defekt unerwünschte Ströme vom Gehäuse sicher in die Erde abfließen.[^darc-50ohm]

In der Praxis:

- Die **Metallgehäuse aller Geräte** (Transceiver, Netzteil, Anpassgerät) werden über **kurze Leitungen** zusammengeführt und mit der **Haupterdungsschiene** des Gebäudes verbunden. Viele Geräte haben dafür eine Schraubklemme „GND“ auf der Rückseite.
- Die **Schirme aller Koaxialkabel** der Antennen werden **miteinander** und zusätzlich mit der **Haupterdungsschiene** verbunden.
- Für das fachgerechte Vorgehen gilt die Norm **VDE 0855-300**: Sie beschreibt Potentialausgleich und Erdung von Funkanlagen und gilt für **alle Amateurfunk-Sendeanlagen** (auch für Drahtantennen und freistehende Masten, nicht nur für Gebäude mit Antennen).
- Soll eine Antenne auf einem Gebäude mit **Blitzschutzsystem** angebracht werden, gilt die Normenreihe **VDE 0185-305** (nur für Gebäude *mit* Blitzschutzsystem).

> Eine **separate HF-Erdleitung** für Sendeantennen (Lektion „Störende Beeinflussung“) und die **Sicherheitserdung** sind zwei verschiedene Dinge: Die eine verringert Störungen im Haus, die andere schützt vor Berührungsspannung.

<div style="border-left:4px solid var(--bad);padding:6px 12px;background:#fff4f2;border-radius:6px"><b>Achtung:</b> Arbeiten am Blitzschutzsystem sollten ausschließlich <b>Blitzschutzfachkräfte</b> mit entsprechender Ausbildung vornehmen. Auch der Anschluss von Potentialausgleich und Erdung sollte nur erfolgen, wenn du genau weißt, was du tust; im Zweifel hilft ein erfahrener Funkamateur oder eine Elektrofachkraft.</div>`,
    },
    {
      id: 'demo-erdung', type: 'viz', viz: 'erdungs-schema', title: 'Demo: Das Erdungsschema am Haus',
      intro: 'Sechs Punkte der Anlage sind nummeriert. Tippe einen Punkt an und beantworte die Frage; richtig beantwortete Punkte werden grün.',
      params: { need: 6 },
      task: 'Beantworte **alle sechs Punkte** richtig.',
    },
    {
      id: 'blitz', type: 'text', title: 'Blitzschutz: was schützt wovor?',
      md: String.raw`
Eine Antenne **erhöht in der Regel nicht die Wahrscheinlichkeit** eines Blitzeinschlags. Aber: Wenn ein Blitz in der Nähe einschlägt, ist die **exponierte Antenne** das wahrscheinlichste Ziel. Deshalb müssen Antennenanlagen auf oder an Gebäuden **geerdet** oder in ein vorhandenes **[Blitzschutzsystem](wiki:Blitzschutz|Lightning rod)** integriert werden. Auch ein Einschlag in der Nähe (ohne Treffer der Antenne) zerstört Geräte: Die Überspannung kommt über das Stromnetz oder die Antennenleitung in die Station.[^darc-50ohm]

**Regelwerk.** *Anerkannte Regeln der Technik* über den Blitzschutz von Amateurfunk-Antennenanlagen stehen in den **VDE-Normen** (VDE = [Verband der Elektrotechnik Elektronik Informationstechnik](wiki:Verband der Elektrotechnik Elektronik Informationstechnik|VDE e.V.)). Nicht im Amateurfunkgesetz, nicht in Vorschriften der Bauaufsichtsbehörde, nicht in Regularien der Amateurfunkverbände. Wer die VDE-Normen beachtet, kann leicht nachweisen, dass er die Regeln der Technik eingehalten hat. (Die AFuV verlangt allgemein: Die Amateurfunkstelle ist nach den allgemein anerkannten Regeln der Technik einzurichten und zu unterhalten, § 16 Abs. 1 AFuV.)[^afuv]

**Schutzmaßnahmen:**

- **Erdungsleitung** vom Antennenstandrohr zur Erdungsanlage als **Einzelmassivdraht** (keine Litze) mit mindestens **Kupfer 16 mm², Aluminium 25 mm² oder Stahl 50 mm²** (VDE 0855-300).
- Die **Gebäudeerdungsanlage** darf für die Antennenerdung **jede** vorhandene sein.
- **Überspannungsschutz** für Geräte: Blitzschutz-Zwischenstecker für Koaxkabel mit **[Gasentladungsröhre](wiki:Gasentladungsröhre|Gas-filled tube)** leiten Überspannungen ab, oder die Antennenzuleitung wird **nach dem Funkbetrieb direkt geerdet**.
- **Verbindung zum Gebäude-Blitzschutz:** Das Standrohr einer Antenne darf mit dem Blitzschutzsystem des Gebäudes **nur verbunden werden, wenn das im Blitzschutzkonzept einer Blitzschutz-Fachkraft vorgesehen** ist. Sie ist weder Pflicht noch verboten, und ein dicker Kupferleiter allein reicht nicht.

<table>
<tr><th>Leitermaterial</th><th>Mindestquerschnitt (Einzelmassivdraht)</th><th>Durchmesser (rechnerisch)</th></tr>
<tr><td>Kupfer</td><td><b>16 mm²</b></td><td>≈ 4,5 mm</td></tr>
<tr><td>Aluminium</td><td><b>25 mm²</b></td><td>≈ 5,6 mm</td></tr>
<tr><td>Stahl</td><td><b>50 mm²</b></td><td>≈ 8,0 mm</td></tr>
</table>`,
    },
    {
      id: 'nahschlag', type: 'text', title: 'Auch der Einschlag nebenan richtet Schaden an',
      md: String.raw`
Ein direkter Treffer ist selten, aber ein Blitz **in der Nähe** genügt, um große Schäden anzurichten. Die Überspannung kommt dann nicht nur über die Antenne, sondern oft über das **Stromnetz** in die Station: Ein typisches Schadensbild ist ein völlig zerstörter Kondensator im Netzteil. Zwei Wege, Geräte zu schützen, kennst du schon (Zwischenstecker mit Gasentladungsröhre; Antennenzuleitung nach dem Funken direkt erden). Beide setzen eine **Erdungsleitung** voraus, die den VDE-Vorgaben entspricht: massiver Draht, keine Litze.[^darc-50ohm]

**Wer macht was?** Ein Blitzschutzsystem schützt das Gebäude, und nur damit der Schutz erhalten bleibt, darf daran nur ändern, wer weiß, was er tut. Eine Verbindung zu einer vorhandenen Anlage muss im **Blitzschutzkonzept** stehen, das eine **Blitzschutz-Fachkraft** erstellt hat. Der Anschluss von Potentialausgleich und Erdung sollte nur erfolgen, wenn du genau weißt, was du tust; im Zweifel helfen ein erfahrener Funkamateur oder eine [Elektrofachkraft](wiki:Elektrofachkraft).

**VDE-Normen sind teuer.** Die Beschaffung der Normen kostet Geld; erläuternde Quellen können eine Alternative sein. Der VDE hat zum Thema auch einen Leitfaden zum Schutz von Funkanlagen auf Gebäuden bei Blitzschlag veröffentlicht. Prüfungsbezug: VE603, VE604, EK208–EK211.
`,
    },
    {
      id: 'q-nahschlag', type: 'quiz', title: 'Blitz in der Nachbarschaft',
      question: 'Ein Blitz schlägt zwei Straßen weiter ein, deine Antenne wird nicht getroffen. Trotzdem ist ein Netzteil kaputt. Was ist die plausibelste Erklärung?',
      options: [
        { text: 'Überspannung kam über das Stromnetz (oder die Antennenleitung) in die Station; Schutz bieten Überspannungsableiter bzw. Erdung der Antennenzuleitung.', correct: true, why: 'Auch ein Einschlag in der Nähe kann große Schäden anrichten; die Überspannung läuft über das Netz.' },
        { text: 'Die Antenne hat den Blitz „angezogen“, deshalb war es ein direkter Einschlag.', why: 'Antennen erhöhen in der Regel nicht die Einschlagwahrscheinlichkeit.' },
        { text: 'Der Blitz hat die Kondensatoren im Netzteil durch Hochfrequenz überlastet, weil die Antenne nicht abgestimmt war.', why: 'Mit der Antennenabstimmung hat das nichts zu tun; entscheidend ist die Überspannung.' },
        { text: 'Das geht nicht: Ohne direkten Einschlag passiert nichts.', why: 'Das Gegenteil zeigt der Schadensfall: Auch nahe Einschläge richten Schaden an.' },
      ],
    },
    {
      id: 'calc-draht', type: 'numeric', title: 'Wie dick ist der Draht?',
      question: String.raw`Ein Einzelmassivdraht aus Kupfer hat den Mindestquerschnitt $A = 16\,\text{mm}^2$ (Erdungsleitung nach VDE 0855-300). Welchen Durchmesser $d$ hat der kreisrunde Draht? (Es gilt $A=\pi d^2/4$.)`,
      answer: 4.5, tolerance: 0.1, unit: 'mm',
      hint: 'Umstellen: $d=\\sqrt{4A/\\pi}$.',
      explain: String.raw`$d=\sqrt{4\cdot16/\pi}\,\text{mm}=\sqrt{20{,}4}\,\text{mm}\approx 4{,}5\,\text{mm}$. Für Aluminium (25 mm²) sind es $\approx 5{,}6\,\text{mm}$, für Stahl (50 mm²) $\approx 8\,\text{mm}$. Alle drei Leiter sind deutlich dicker als eine Installationsleitung.`,
    },
    {
      id: 'match-erdung', type: 'match', title: 'Aufgabe → Regel',
      prompt: 'Ordne zu.',
      pairs: [
        ['Erdungsleitung vom Standrohr', 'Massivdraht: Cu 16 mm², Al 25 mm² oder Stahl 50 mm²'],
        ['Anerkannte Regeln der Technik zum Blitzschutz', 'VDE-Normen'],
        ['Potentialausgleich und Erdung von Funkanlagen', 'VDE 0855-300 (alle Amateurfunk-Sendeanlagen)'],
        ['Antenne auf Gebäude mit Blitzschutzsystem', 'VDE 0185-305 (Normenreihe, nur für Gebäude mit Blitzschutzsystem)'],
        ['Verbindung Standrohr und Gebäude-Blitzschutz', 'Nur gemäß Blitzschutzkonzept der Blitzschutz-Fachkraft'],
        ['Schirme aller Koaxkabel', 'Untereinander und mit der Haupterdungsschiene verbinden'],
      ],
    },
    {
      id: 'statik', type: 'text', title: 'Statische Aufladung: Gefahr ohne Gewitter',
      md: String.raw`
Auch **ohne Blitz und Donner** können an Antennen Spannungen entstehen. **Regen oder Hagel** laden eine **ungeerdete Drahtantenne** [elektrostatisch](wiki:Elektrostatik|Electrostatics) auf. Im harmlosen Fall hörst du nur **Prasselstörungen** im Empfang; im ungünstigen Fall wird die Aufladung für Geräte und Personen gefährlich.[^darc-50ohm]

Was hilft? Eine **hochohmige** Verbindung zwischen den Anschlüssen der Antenne und dem **Erdanschluss** der Station: ein **Ableitwiderstand** (z. B. $100\,\text{k}\Omega$). Die Ladung fließt langsam ab, ohne dass der Widerstand die HF-Funktion stört. Ein **niederohmiger** Widerstand wäre falsch: Er läge parallel zur Antenne und würde Sendeleistung verbrauchen. Ein zwischengeschaltetes Anpassgerät neutralisiert Aufladungen nicht, und die Abblockkondensatoren eines Stehwellenmessgeräts auch nicht (Kondensatoren sperren Gleichstrom).

Die Ursache liegt nicht in Sonnenstürmen, nicht in zu dünner Isolierung durch die Sendespannung und nicht in einem durchschmelzenden Mittenisolator.`,
    },
    {
      id: 'demo-statik', type: 'viz', viz: 'ableitwiderstand-lab', title: 'Demo: Ableitwiderstand',
      intro: 'Der Widerstand soll die Ladung ableiten (Spannung klein) und gleichzeitig keine HF-Leistung verbrauchen. Stelle R ein und beobachte beide Balken. Der Aufladestrom ist eine Annahme der Demo.',
      params: { uMax: 50, lossMax: 0.1 },
      task: 'Probiere **drei Dinge**: die Antenne **ohne** Widerstand, einen **viel zu niederohmigen** Widerstand (HF-Verlust über 10 %) und finde den Bereich, in dem **beides stimmt** (Spannung unter 50 V, HF-Verlust unter 0,1 %).',
    },
    {
      id: 'gefahren', type: 'text', title: 'Gefahren an Antenne und im Gerät',
      md: String.raw`
**Berühren von Sendeantennen.** Hohe Wechselspannungen sind gefährlich, auch **hohe hochfrequente** Wechselspannungen: Sie verursachen **Verbrennungen und andere Verletzungen** und können Herzrhythmusstörungen auslösen. Eine Sendeantenne in Betrieb berührt man nicht. Schon beim Erschrecken kann es zum **Sekundärunfall** kommen (Sturz von der Leiter). Der [Skin-Effekt](wiki:Skin-Effekt|Skin effect) schützt dich *nicht*, auch ein Anschluss an das Blitzschutzsystem nicht; die Gleichspannungsversorgung der Endstufe liegt nicht am Antennenausgang.[^darc-50ohm]

**Mikrowellen.** Im Amateurfunk werden dafür häufig **[Parabolantennen](wiki:Parabolantenne|Parabolic antenna) oder Helixantennen** mit sehr hohem Gewinn eingesetzt. Aus wenigen Watt (sogar Milliwatt) werden beachtliche Strahlungsleistungen: Ein Spiegel mit $20\,\text{dB}$ Gewinn macht aus $1\,\text{W}$ Sendeleistung etwa $100\,\text{W}$ Strahlungsleistung, bei $30\,\text{dB}$ sind es $1000\,\text{W}$. Hochfrequente Felder wirken überwiegend **thermisch**; besonders empfindlich sind Körperbereiche mit eingeschränkter Wärmeabfuhr wie die Augen. Darum gilt: **Aufenthalt im direkten Strahlengang von Sendeantennen vermeiden.** Eine Alufolien-Kopfbedeckung oder spezielle „EMV-Schutzkleidung“ ersetzt das nicht, und ein Duty-Cycle von höchstens 50 % ist keine Schutzmaßnahme.

**Freileitungen.** Antennen müssen von elektrischen [Freileitungen](wiki:Freileitung|Overhead power line) (Dachständer, Hochspannung) immer entfernt sein. Bei **Beschädigung** dürfen umstürzende oder herabfallende Teile und Leitungen **keine Energieversorgungsleitungen berühren**: Lebensgefahr durch Stromschlag. Nicht verlangt (und keine Antwort auf die Frage nach Sicherheit): eine Sturmversicherung, Kontaktdaten am Mast oder ein bestimmter seitlicher Abstand wie 8 m.

**Gerät öffnen.** Auch ein vom Netz getrenntes Gerät kann gefährlich sein: **Aufgeladene [Kondensatoren](wiki:Kondensator (Elektrotechnik)|Capacitor) im Netzteil** speichern auch nach dem Trennen noch Energie, bei **Schaltnetzteilen** teils mit sehr hoher Spannung. Das gilt auch noch einige Zeit nach dem Ziehen des Steckers. Die gefährliche Ladung steckt in den **Kondensatoren**, nicht „im Netztransformator“.`,
    },
    {
      id: 'gefahren-vertiefung', type: 'text', title: 'Strahlengang, Freileitung und Netzteil genauer',
      md: String.raw`
**Warum im Strahl nichts zu suchen ist.** Hochfrequente Felder werden vom Körper aufgenommen; wie stark, hängt von Feldstärke und Frequenz ab. Nachgewiesen sind Kraftwirkungen und eine **Wärmewirkung**, und die ist ausschlaggebend für mögliche gesundheitliche Wirkungen.[^darc-50ohm] Besonders empfindlich sind Körperbereiche mit eingeschränkter Wärmeabfuhr, etwa **Augen, Gehirn** und Hoden. Deshalb sind Schutzmaßnahmen für **alle** Menschen nötig, und der Aufenthalt im direkten Strahlengang ist **zu vermeiden**. Beim Hamnet-Link im Bereich 5650–5850 MHz ($\lambda\approx5{,}2\,\text{cm}$) erreicht schon ein Spiegel von 0,80 m Durchmesser rund 33 dB Gewinn; die gleiche Gewinnleistung bräuchte im 70-cm-Band etwa 10 m Spiegeldurchmesser. Auf Mikrowellen ist die Gefahr gerade deshalb leicht zu unterschätzen: kleine Antenne, großer Gewinn. Der Gewinn des Spiegels wächst mit kleinerer Wellenlänge.

**Freileitungen.** In Städten liegt die Hausversorgung meist im Boden, auf dem Land gibt es noch **Freileitungen** bis zum Hausgiebel oder zum **[Dachständer](wiki:Dachständer)** auf dem Dach; in Hausnähe können auch Hochspannungsleitungen verlaufen. Eine Antenne darf solche Leitungen **nie berühren**, sonst gelangen gefährlich hohe Spannungen in die Funkanlage; es besteht akute Lebensgefahr durch Stromschlag. Das gilt nicht nur beim Aufbau, sondern auch bei **Sturm**: Gelöste Drähte oder Teile dürfen weder in Kontakt mit Leitungen kommen noch auf Personen fallen.

**Gerät öffnen.** Funkamateure dürfen Geräte öffnen und verändern, aber zuerst trennt man vom Netz. Das reicht nicht: Die **Kondensatoren im Netzteil** speichern Ladung weiter, wie lange, hängt von Bauteilqualität und Beschaltung ab. Bei **[Schaltnetzteilen](wiki:Schaltnetzteil|Switched-mode power supply)** liegt an einem Teil der Kondensatoren eine sehr hohe Spannung; bei Berührung besteht Lebensgefahr, auch einige Zeit nach dem Ziehen des Steckers. Arbeiten an der 230-V-Netzseite sind grundsätzlich der **Elektrofachkraft** vorbehalten.
`,
    },
    {
      id: 'match-gefahr', type: 'match', title: 'Situation → richtige Reaktion',
      prompt: 'Ordne zu.',
      pairs: [
        ['Antenne mit Mikrowellenspiegel sendet', 'Nicht im direkten Strahlengang aufhalten'],
        ['Mastteile könnten bei Sturm herabfallen', 'Dürfen keine Energieversorgungsleitung berühren'],
        ['Gerät ist ausgesteckt, Netzteil offen', 'Kondensatoren können noch Ladung halten'],
        ['Netzseite (230 V) eines Geräts', 'Nur Elektrofachkraft'],
        ['Sendeantenne im Betrieb', 'Nicht berühren: Verbrennungen durch HF-Spannung'],
      ],
    },
    {
      id: 'warn-gefahren', type: 'callout', tone: 'warning', title: 'Falsche Sicherheitsgefühle',
      md: String.raw`- „Das Gerät ist ja vom Netz getrennt, da kann nichts passieren.“ **Falsch**: Kondensatoren im Netzteil.
- „Die Antenne ist geerdet, also kann man sie im Sendebetrieb anfassen.“ **Falsch**: HF-Spannungen und -Ströme am Antennenfuß sind gefährlich; Erdung schützt vor Blitz, nicht vor der eigenen Sendeleistung.
- „Bei 1 W Sendeleistung am Mikrowellenspiegel ist ein Aufenthalt im Strahl harmlos.“ **Falsch**: Der Gewinn des Spiegels macht daraus ein Vielfaches an Strahlungsleistung.
- **Prüfungsbezug:** EK201, EK202, EK203, EK206, EK207, NK311.`,
    },
    {
      id: 'calc-spiegel', type: 'numeric', title: 'Mikrowellenspiegel',
      question: String.raw`Ein Parabolspiegel hat einen Gewinn von $g=30\,\text{dBi}$. Der Sender gibt $0{,}5\,\text{W}$ ab (Kabeldämpfung vernachlässigt). Welche Strahlungsleistung $P_\mathrm{EIRP}$ steht im Strahl?`,
      answer: 500, tolerance: 5, unit: 'W',
      hint: '$30\\,\\text{dB}$ entsprechen dem Faktor $10^3=1000$ (Leistung).',
      explain: String.raw`$P_\mathrm{EIRP}=0{,}5\,\text{W}\cdot10^{30/10}=0{,}5\,\text{W}\cdot1000=500\,\text{W}$. Mit einem Gewinn in dBi entfällt der Summand $2{,}15\,\text{dB}$. Aus einem halben Watt werden im Strahl 500 W: Darum ist der Aufenthalt im Strahlengang zu vermeiden.`,
    },
    {
      id: 'recht', type: 'text', title: 'Baurecht und Haftung',
      md: String.raw`
Das **Bauordnungsrecht ist Ländersache**: Für **Außenantennenanlagen** gelten die **baurechtlichen Bestimmungen des jeweiligen Bundeslandes** ([Landesbauordnung](wiki:Landesbauordnung)). Dort kann zum Beispiel stehen, ab welcher Windlast oder Höhe eines Mastes eine [Baugenehmigung](wiki:Baugenehmigung|Construction permit) nötig ist und welche Abstände zu Nachbargrundstücken einzuhalten sind. Auskunft gibt das örtliche Bauamt. Das Amateurfunkgesetz, Empfehlungen von Verbänden oder „keine besonderen Vorschriften“ sind die falschen Antworten.[^darc-50ohm]

**Haftung:** Der **Betreiber** (bzw. Eigentümer) der Antennenanlage ist für sie selbst voll verantwortlich und **haftet für Schäden gegenüber Dritten**. Nicht die Amateurfunkvereinigung (auch nicht bei Mitgliedschaft), nicht die Bundesnetzagentur (in deren Gebühren steckt keine Gruppenversicherung) und nicht automatisch der Grundstückseigentümer, wenn er nicht zugleich Betreiber ist. Eine [Haftpflichtversicherung](wiki:Haftpflichtversicherung|Liability insurance) ist daher ratsam; manche Verbände bieten sie ihren Mitgliedern an, aber die Verantwortung bleibt bei dir.`,
    },
    {
      id: 'calc-parabol', type: 'numeric', title: 'Spiegelgewinn aus der Formelsammlung',
      question: String.raw`Ein Parabolspiegel mit $d=0{,}8\,\text{m}$ Durchmesser arbeitet bei $\lambda=5{,}2\,\text{cm}$ (Hamnet 5,7 GHz), Wirkungsgrad $\eta=1$. Berechne den Gewinn $g_\mathrm{i}=10\cdot\log_{10}\!\left[\left(\tfrac{\pi\,d}{\lambda}\right)^{2}\eta\right]$ in dB.`,
      answer: 33.7, tolerance: 0.7, unit: 'dB',
      hint: String.raw`Erst $\pi d/\lambda\approx48{,}3$, quadrieren, dann $10\cdot\log_{10}$.`,
      explain: String.raw`$\left(\tfrac{\pi\cdot0{,}8}{0{,}052}\right)^2\approx2336$, $10\cdot\log_{10}2336\approx33{,}7\,\text{dB}$ („rund 33 dB“). Bei $P=1\,\text{W}$ wären das etwa 2300 W Strahlungsleistung: darum nie im Strahlengang aufhalten.`,
    },
    {
      id: 'quiz-beruehren', type: 'quiz', title: 'Gefahr an der Sendeantenne',
      question: 'Du willst bei einem Funkgerät mit 100 W einen Draht der Dipolantenne auf dem Dach „nur kurz“ berühren, während jemand sendet. Die Antenne ist an die Erdungsanlage des Hauses angeschlossen. Was droht?',
      options: [
        { text: 'Verbrennungen und Verletzungen durch hochfrequente Spannung; Erschrecken kann außerdem zum Sturz führen.', correct: true, why: 'HF-Spannungen an Sendeantennen können Verbrennungen und andere Verletzungen verursachen; der Anschluss an eine Erdungsanlage ändert daran nichts.' },
        { text: 'Nichts: Wegen des Skin-Effekts fließt kein Strom durch den Körper.', why: 'Der Skin-Effekt verhindert keinen Stromfluss durch den Körper.' },
        { text: 'Nichts, weil die Antenne mit dem Blitzschutzsystem geerdet ist.', why: 'Erdung schützt vor Blitzströmen, nicht vor der Sendeleistung.' },
        { text: 'Ein Stromschlag durch die Gleichspannung der Endstufe, die am Antennenausgang anliegt.', why: 'Am Antennenausgang liegt HF, keine Versorgungsgleichspannung.' },
      ],
    },
    {
      id: 'quiz-haftung', type: 'quiz', title: 'Wer haftet?',
      question: 'Bei Sturm stürzt dein Antennenmast auf den Wagen des Nachbarn. Wer haftet gegenüber dem Nachbarn?',
      options: [
        { text: 'Du als Betreiber (bzw. Eigentümer) der Antennenanlage.', correct: true, why: 'Der Betreiber ist für seine Antennenanlage voll verantwortlich und haftet gegenüber Dritten.' },
        { text: 'Der Amateurfunkverband, wenn du Mitglied bist.', why: 'Die Mitgliedschaft verlagert die gesetzliche Haftung nicht.' },
        { text: 'Die Bundesnetzagentur.', why: 'In den Gebühren und Beiträgen steckt keine Haftungsübernahme.' },
        { text: 'Der Grundstückseigentümer, auch wenn er nicht Betreiber ist.', why: 'Maßgeblich ist der Eigentümer bzw. Betreiber der Antennenanlage; den Grundstückseigentümer trifft nicht schon deshalb eine Haftung (oder Versicherungspflicht).' },
      ],
    },
    {
      id: 'video-sicherheit', type: 'video', youtube: '5Tpk0VUVDJU', label: 'Amateurfunkvorlesung Klasse E: 20. Personenschutz (Teil 2), 21. Sicherheit, 22. Gesetze & Vorschriften', channel: 'Computer Engineering @ JMU Würzburg',
      why: 'Vorlesungsaufzeichnung der Universität Würzburg; laut Titel kommen darin Personenschutz, Sicherheit und Gesetze/Vorschriften vor.',
    },
    {
      id: 'recall-sicherheit', type: 'recall', title: 'In eigenen Worten',
      prompt: 'Beschreibe, wie du eine neue Antenne auf einem Haus mit Blitzschutzanlage sicher anschließt: Was verbindest du womit, welche Leitung nimmst du, wer darf was, und was prüfst du außerdem vor dem Aufbau (Recht, Haftung, Freileitung)?',
      answer: 'Ich verbinde die Schirme aller Koaxkabel miteinander und mit der Haupterdungsschiene und führe auch die Metallgehäuse der Station mit kurzen Leitungen dorthin (Potentialausgleich und Erdung nach VDE 0855-300). Die Erdungsleitung vom Standrohr zur Erdungsanlage ist ein Einzelmassivdraht aus Kupfer 16 mm², Aluminium 25 mm² oder Stahl 50 mm²; jede vorhandene Gebäudeerdung kann ich nutzen. Das Standrohr verbinde ich mit dem Gebäude-Blitzschutzsystem nur, wenn das Blitzschutzkonzept einer Blitzschutz-Fachkraft es vorsieht (VDE 0185-305). Überspannungsschutz: Gasentladungs-Zwischenstecker im Koax oder Antennenleitung nach dem Funkbetrieb erden. Ich prüfe die Landesbauordnung beim Bauamt (Höhe, Windlast, Abstände), achte darauf, dass abstürzende Teile keine Freileitung berühren, und weiß, dass ich als Betreiber für Schäden gegenüber Dritten hafte.',
      cards: ['bl-pa', 'bl-querschnitt', 'bl-konzept'],
    },
  ],
  cards: [
    { id: 'bl-pa', front: 'Was bewirken Potentialausgleich und Erdung der Gerätegehäuse?', back: 'Potentialausgleich: keine gefährliche **Berührungsspannung** zwischen den Geräten. Erdung: Fehlerströme fließen vom Gehäuse in die **Erde**. Gehäuse über kurze Leitungen zur **Haupterdungsschiene**.' },
    { id: 'bl-koax', front: 'Personenschutz bei Koaxkabeln mehrerer Antennen?', back: 'Die **Schirme aller Koaxkabel** miteinander und mit der **Haupterdungsschiene** verbinden.' },
    { id: 'bl-vde', front: 'VDE 0855-300 und VDE 0185-305?', back: '**0855-300:** Potentialausgleich und Erdung, gilt für **alle Amateurfunk-Sendeanlagen**. **0185-305:** Blitzschutz, nur für **Gebäude mit Blitzschutzsystem**.' },
    { id: 'bl-regeln', front: 'Wo stehen die anerkannten Regeln der Technik zum Blitzschutz von Antennenanlagen?', back: 'In den **VDE-Normen** (nicht AFuG, nicht Bauaufsicht, nicht Verbände).' },
    { id: 'bl-erder', front: 'Welche Gebäudeerdungsanlage darf für die Antennenerdung genutzt werden?', back: '**Jede vorhandene** Gebäudeerdungsanlage.' },
    { id: 'bl-querschnitt', front: 'Material und Mindestquerschnitt der Erdungsleitung (VDE 0855-300)?', back: 'Einzelmassivdraht: **Cu 16 mm², Al 25 mm², Stahl 50 mm²**. Keine feindrähtige Litze.' },
    { id: 'bl-konzept', front: 'Wann darf das Antennenstandrohr mit dem Blitzschutzsystem des Gebäudes verbunden werden?', back: 'Wenn eine **Blitzschutz-Fachkraft** die Verbindung im **Blitzschutzkonzept** vorsieht. Weder Pflicht noch Verbot.' },
    { id: 'bl-statik', front: 'Ungeerdete Drahtantenne: besonderer Sicherheitsaspekt und Abhilfe?', back: '**Regen oder Hagel** laden die Antenne **elektrostatisch** auf. Abhilfe: **hochohmige Ableitwiderstände** (z. B. 100 kΩ) zwischen Antenne und Erdanschluss.' },
    { id: 'bl-beruehren', front: 'Gefahr beim Berühren einer Sendeantenne im Betrieb?', back: '**Verletzungen und Verbrennungen durch hochfrequente Spannungen** (Skin-Effekt oder Erdung schützen nicht).' },
    { id: 'bl-mikro', front: 'Sicherheit beim Umgang mit Mikrowellen?', back: '**Aufenthalt im direkten Strahlengang** von Sendeantennen **vermeiden** (hoher Gewinn macht aus wenigen Watt hohe EIRP).' },
    { id: 'bl-oeffnen', front: 'Gefahr beim Öffnen eines vom Netz getrennten Geräts?', back: '**Elektrischer Schlag durch aufgeladene Kondensatoren** im Netzteil. Arbeiten an der 230-V-Seite nur durch Elektrofachkraft.' },
    { id: 'bl-freileitung', front: 'Wichtig bei Außenantennen zur Energieversorgung?', back: 'Umstürzende/herabfallende Teile und Leitungen dürfen **keine Energieversorgungsleitungen berühren**.' },
    { id: 'bl-bau', front: 'Welche Bauvorschriften gelten für Außenantennen?', back: 'Die **baurechtlichen Bestimmungen des jeweiligen Bundeslandes** (Auskunft: Bauamt).' },
    { id: 'bl-haftung', front: 'Wer haftet für Schäden Dritter durch die Antennenanlage?', back: 'Der **Eigentümer bzw. Betreiber** der Antennenanlage.' },
    { id: 'bl-nahschlag', front: 'Schaden bei Blitz nur in der Nähe?', back: 'Möglich: Überspannung über Stromnetz oder Antennenleitung. Schutz: Gasentladungs-Zwischenstecker oder Zuleitung nach dem Funkbetrieb erden.' },
    { id: 'bl-augen', front: 'Warum sind Augen im Strahlengang besonders gefährdet?', back: 'HF wirkt überwiegend thermisch; Körperbereiche mit eingeschränkter Wärmeabfuhr (Augen, Gehirn) sind empfindlich.' },
    { id: 'bl-gewinn-lambda', front: 'Warum sind Mikrowellenspiegel besonders tückisch?', back: 'Kleine Wellenlänge: schon ein kleiner Spiegel hat hohen Gewinn (0,8 m bei 5,7 GHz ≈ 33 dB), aus wenigen Watt werden hunderte W Strahlungsleistung.' },
    { id: 'bl-schaltnetzteil', front: 'Schaltnetzteil geöffnet, Stecker gezogen: Gefahr?', back: 'Ein Teil der Kondensatoren führt weiter sehr hohe Spannung: Lebensgefahr. 230-V-Seite nur Elektrofachkraft.' },
  ],
};
