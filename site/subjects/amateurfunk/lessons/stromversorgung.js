export default {
  id: 'stromversorgung',
  title: 'Stromversorgung: Netzteil, Akku, Sicherungen',
  summary: 'Vom 230-V-Netz zur 13,8-V-Gleichspannung: Gleichrichter und Siebung, Linear- und Schaltnetzteil, Anschluss und Polung, Batterien und Akkus, Sicherungen und Aderfarben.',
  minutes: 20,
  goals: [
    'Aufgabe und Stufen eines [[netzgeraet|Netzgeräts]] erklären (Trafo – Gleichrichter – Siebung – Stabilisierung) und den Ausgang von Einweg- und Brückengleichrichter erkennen',
    'Gleichspannungsquellen beurteilen: hohe **Spannungskonstanz** bei Belastung = kleiner [[innenwiderstand|Innenwiderstand]]; Eigenschaften des [[schaltnetzteil|Schaltnetzteils]]',
    'Ein Netzteil sicher anschließen: Polung (rot/schwarz), zweipolige Leitung, Sicherungen mit gleichem Strom **und** gleicher Auslösecharakteristik, Schutzkontakt und Aderfarben',
    'Batterien und Akkus in Reihe rechnen (6 × 1,5 V = 9 V), die Gefahren kennen (Kurzschluss, Verätzungen) und das Schaltzeichen deuten',
  ],
  needs: ['elektrotechnik/gleichrichter', 'elektrotechnik/netzteil-glaettung', 'elektrotechnik/reale-quellen', 'elektrotechnik/batterien-akkus'],
  blocks: [
    {
      id: 'netzteil', type: 'text', title: 'Das Netzgerät: 230 V Wechselspannung → 13,8 V Gleichspannung',
      md: `
Ein Transceiver braucht **Gleichspannung** — im Mobilbetrieb liefert sie das Bordnetz, im Shack ein **[Netzteil](wiki:Netzteil|AC adapter)** (Netzgerät). Es erzeugt **aus der 230-V-Wechselspannung des Netzes eine Gleichspannung**, üblicherweise **ca. 13,8 V** (ND101, ND102). Die Funkgeräte sind auf diese Spannung ausgelegt (typische Ladespannung eines 12-V-Bleiakkus, wie im Auto). Erzeugung einer Wechselspannung aus Gleichspannung wäre ein Wechselrichter, eine Internetverbindung gehört gar nicht dazu.[^darc-50ohm]

**Die Stufen** eines klassischen (linear geregelten) Netzteils:

1. **Transformator:** heruntertransformieren von 230 V auf eine kleine Wechselspannung (z. B. 15–18 V).
2. **[Gleichrichter](wiki:Gleichrichter|Rectifier):** wandelt Wechsel- in pulsierende Gleichspannung. Ein **Einweggleichrichter** (eine Diode) lässt nur die positiven Halbwellen durch — die Spannung am Lastwiderstand ist ein **Halbwellen-Impuls mit Lücken** (ED304). Eine **Brückenschaltung** ([Brückengleichrichter](wiki:Brückengleichrichter|Rectifier)) mit vier Dioden nutzt beide Halbwellen: lauter Halbwellenbögen ohne Lücken (doppelte Frequenz).
3. **Siebung:** ein **Ladekondensator** hält die Spannung zwischen den Spitzen und glättet sie. Die Restwelligkeit heißt **Brummspannung**.
4. **Stabilisierung:** ein Regler hält die Spannung bei Last- und Netzänderungen konstant.

**Anforderung an die Quelle (ED301):** Eine gute Gleichspannungsquelle hat bei Belastung eine **hohe Spannungskonstanz**. Das erreicht man mit einem **kleinen Innenwiderstand** $R_\\mathrm{i}$: Bei Last fällt die Spannung um $R_\\mathrm{i}\\cdot I$ ab, $U_\\mathrm{K} = U_0 - R_\\mathrm{i}\\cdot I$ — ist $R_\\mathrm{i}$ klein, bricht sie kaum ein. Eine Quelle, die unter Last die Spannung *erhöht* oder einen Wechselspannungsanteil trägt, ist schlecht.

**Schaltnetzteil (ED302, ED303).** Ein [Schaltnetzteil](wiki:Schaltnetzteil|Switched-mode power supply) richtet die Netzspannung zuerst gleich, zerhackt sie mit hoher Frequenz, transformiert sie klein und leicht und glättet sie wieder. Vorteile: **hoher Wirkungsgrad, geringes Gewicht und Volumen** (hohe Frequenz = kleine Trafos und Kondensatoren). Hauptnachteil: Es **erzeugt hochfrequente Störungen** (EMV-Maßnahmen nötig!) — das merkst du als Funkamateur sofort durch Störgeräusche im Empfänger.`,
    },
    {
      id: 'viz-gleich', type: 'viz', viz: 'rectifier-lab', title: 'Gleichrichter-Labor',
      params: { mode: 'plain' },
      task: 'Wähle Schaltung, Dioden, Trafo-Spannung und Last, rechne die Spitzenspannung am Ausgang **im Kopf** aus und gib sie ein (Faustformel: $\\hat u - n\\cdot U_\\mathrm{F}$, Si ≈ 0,7 V). Schaffe drei richtige Vorhersagen mit verschiedenen Einstellungen.',
    },
    {
      id: 'viz-siebung', type: 'viz', viz: 'psu-ripple-lab', title: 'Siebung mit Ladekondensator',
      task: 'Stelle die Brückenschaltung auf **1 A** Laststrom und wähle $C$ so, dass die Welligkeit **unter 1 V** bleibt. Beobachte den Diodenstrom: Wenn er mindestens das 5-Fache des Laststroms erreicht, ist auch das zweite Ziel erfüllt.',
    },
    {
      id: 'anschluss', type: 'text', title: 'Anschluss, Polung und Schutz',
      md: `
Die Leitung vom Netzteil zum Transceiver ist **zweipolig**: Der Strom fließt im einen Leiter hin und im anderen zurück — erst dadurch wird der **Stromkreis über den Transceiver geschlossen** (ND103, ND104). Es fließt kein Strom „über die Erde“ zurück, und eine zweite Ader erhöht nicht den Strom.

**Polung:** Die Klemmen sind **rot für Plus, schwarz für Minus** (ND105; blau und grüngelb sind Farben der Netzleitungen). Auf **polungsrichtigen Anschluss** ist besonders zu achten (ND106); eine **Verpolung** kann das **Funkgerät beschädigen** (ND107). Darum: erst alles anschließen und die Polung prüfen, dann einschalten. (Verpolschutzdioden helfen — verlass dich nicht darauf.)

**Schutzfunktionen** hochwertiger Netzgeräte: **Kurzschlussstrombegrenzung** und **thermische Abschaltung** (ND108). „Automatische Erdung“ des Ausgangs, „Überspannungsreduzierung auf Kurzschlussstrom“ oder „Spannungsstabilisierung im Kurzschluss“ sind keine Schutzfunktionen.

**Netzseite:** Das Gehäuse wird über den **Schutzkontakt** des Schuko-Steckers mit dem **PE-Leiter** der Steckdose verbunden — nicht mit N oder L (ND109). Die Aderfarben normgerechter 3-adriger Energieleitungen sind: **Schutzleiter grüngelb, Außenleiter (L) braun, Neutralleiter (N) blau** (EK205).`,
    },
    {
      id: 'warn-adern', type: 'callout', tone: 'warning', title: 'Die Aderfarben und die Rangfolge',
      md: `Prüfungsfrage EK205 verlangt die Reihenfolge **Schutzleiter, Außenleiter, Neutralleiter** = **grüngelb, braun, blau**. Die falschen Antworten vertauschen braun und blau (Neutralleiter ist **blau**, nicht braun) oder nehmen veraltete Farben (grau, schwarz, rot). Eselsbrücke: *grüngelb gehört der Erde, braun hat Strom drauf, blau ist neutral.*`,
    },
    {
      id: 'match-adern', type: 'match', title: 'Aderfarben und Klemmen',
      prompt: 'Ordne zu.',
      pairs: [
        ['Schutzleiter (PE)', 'grüngelb'],
        ['Außenleiter (L)', 'braun'],
        ['Neutralleiter (N)', 'blau'],
        ['Pluspol einer 13,8-V-Versorgung', 'rot'],
        ['Minuspol einer 13,8-V-Versorgung', 'schwarz'],
      ],
    },
    {
      id: 'sicherung', type: 'text', title: 'Sicherungen',
      md: `
Eine [Schmelzsicherung](wiki:Schmelzsicherung|Fuse (electrical)) schützt Gerät und Leitung bei Kurzschluss oder Überlast: Ein dünner Draht schmilzt (durchbrennen, auch „thermische Abschaltung“ genannt) und unterbricht den Stromkreis. Nach dem Beheben der Fehlerursache **muss** die Sicherung **ersetzt** werden — und zwar durch eine **gleichartige**: gleicher **Nennstrom** **und** gleiche **Auslösecharakteristik** (flink, mittelträge, träge; NK305, EK204). Träge Sicherungen nimmt man, wenn der **Einschaltstrom** den Nennstrom deutlich übersteigt (z. B. Netzteile mit Ladekondensatoren).[^darc-50ohm]

**Nie:** überbrücken (Alufolie, Kupferdraht — Brandgefahr, kein Schutz mehr), eine Sicherung mit **größerem** Nennstrom einsetzen („bis zu fünffacher Auslösestrom“) oder eine **andere** Charakteristik wählen. Porzellan- statt Glassicherung ist dagegen unproblematisch, wenn Strom und Charakteristik stimmen. Bei der 20-A-„Flink“-Sicherung im Kurzwellensender (EK204) setzt du also eine **20-A-flink**-Sicherung ein.`,
    },
    {
      id: 'order-netzteil', type: 'order', title: 'Stufen eines Netzteils',
      prompt: 'Bringe die Stufen eines linear geregelten Netzteils in die Reihenfolge vom Netz zum Transceiver.',
      items: ['Netztransformator (230 V → kleine Wechselspannung)', 'Gleichrichter (Brücke)', 'Ladekondensator (Siebung)', 'Spannungsregler (Stabilisierung)', 'Ausgangsklemmen 13,8 V (rot/schwarz)'],
      explain: 'Erst Spannung herunter, dann gleichrichten, glätten, stabilisieren.',
    },
    {
      id: 'quellen', type: 'text', title: 'Batterien und Akkus',
      md: `
In einer **[Batterie](wiki:Batterie (Elektrotechnik)|Electric battery)** (nicht wiederaufladbar) bzw. einem **[Akkumulator](wiki:Akkumulator|Rechargeable battery)** (wiederaufladbar) trennt eine chemische Reaktion die Ladungen. Im Schaltzeichen (NB201, NB203): zwei parallele Striche; der **lange, dünne** Strich ist **Plus**, der **kurze, dicke Minus** — Merkhilfe: Das Plus-Zeichen hat zwei Striche, das Minus-Zeichen nur einen.

**Reihenschaltung:** Mehrere Zellen werden **Plus an Minus** geschaltet; ihre Spannungen **addieren sich**. Sechs 1,5-V-Zellen ergeben **9 V** (NB204) — die falschen Antworten sind 1,5 V (eine Zelle), 0,25 V ($1{,}5/6$) und 6 V (vier Zellen). Die **Kapazität** wird in **Amperestunden (Ah)** angegeben: 5 Ah liefern 1 A für 5 h (oder 0,5 A für 10 h).

**Umgang (ND110, NK306):**
- **Kurzschluss vermeiden!** Ein Akku kann dabei einen riesigen Strom liefern (Brand, Verbrennungen). Nicht paarweise, nicht mit „Mindestentladestrom“, und **nie ganz entleeren** (Tiefentladung schädigt den Akku) — „stets vollkommen entladen“ ist falsch.
- **Gefahren** bei unsachgemäßem Umgang mit wiederaufladbaren Batterien: **Verbrennungen, Verätzungen, Vergiftungen** (Elektrolyt, Hitze, Gase).
- Bei [Lithium-Ionen-Akkus](wiki:Lithium-Ionen-Akkumulator|Lithium-ion battery) und [Bleiakkus](wiki:Bleiakkumulator|Lead–acid battery) ist die Ladespannung zu beachten; nicht wiederaufladbare Batterien dürfen nicht geladen werden.`,
    },
    {
      id: 'viz-quelle', type: 'viz', viz: 'source-load-lab', title: 'Reale Spannungsquelle: Innenwiderstand',
      task: 'Finde den Lastwiderstand, bei dem die Leistung in der Last maximal wird, und prüfe den Wirkungsgrad. Wähle dann das Preset „Bleiakku“ und stelle die Last so ein, dass $\\eta \\ge 95\\,\\%$ erreicht wird — und überlege, warum Netzteile einen **kleinen** Innenwiderstand haben sollen.',
    },
    {
      id: 'calc-reihe', type: 'numeric', title: 'Zellen in Reihe',
      question: 'Wie viele **1,2-V-NiMH-Zellen** brauchst du in Reihe, um möglichst nahe an 12 V zu kommen?',
      answer: 10, tolerance: 0, unit: 'Zellen',
      hint: '$n = 12\\,\\text{V}/1{,}2\\,\\text{V}$.',
      explain: '$10\\cdot1{,}2\\,\\text{V} = 12\\,\\text{V}$. Die Spannungen addieren sich in der Reihenschaltung.',
    },
    {
      id: 'calc-ah', type: 'numeric', title: 'Betriebsdauer aus Kapazität',
      question: 'Ein Akku hat **7 Ah**. Wie lange kann er rechnerisch einen Strom von **1,4 A** liefern?',
      answer: 5, tolerance: 0.1, unit: 'h',
      hint: 'Zeit = Kapazität / Strom.',
      explain: '$t = 7\\,\\text{Ah}/1{,}4\\,\\text{A} = 5\\,\\text{h}$. In der Praxis weniger (Innenwiderstand, Mindestspannung, Alterung).',
    },
    {
      id: 'calc-eta', type: 'numeric', title: 'Wirkungsgrad',
      question: 'Ein Netzgerät gibt 100 W an den Transceiver ab und nimmt 125 W aus dem Netz auf. Wie groß ist der Wirkungsgrad?',
      answer: 80, tolerance: 1, unit: '%',
      hint: '$\\eta = P_\\mathrm{ab}/P_\\mathrm{zu}$.',
      explain: '$\\eta = 100/125 = 0{,}8 = 80\\,\\%$; die übrigen 25 W sind Verlustwärme.',
    },
    {
      id: 'quiz-sicherung', type: 'quiz', title: 'Sicherung ersetzen',
      question: 'Im Netzteil ist die 10-A-Sicherung „träge“ durchgebrannt. Der Fehler (defekter Brückengleichrichter) ist behoben. Wie gehst du vor?',
      options: [
        { text: 'Eine neue 10-A-Sicherung gleicher Charakteristik (träge) einsetzen.', correct: true, why: 'Strom **und** Auslösecharakteristik müssen übereinstimmen.' },
        { text: 'Eine 16-A-Sicherung einsetzen, damit sie nicht mehr durchbrennt.', why: 'Größerer Strom bedeutet: Die Sicherung schützt nicht mehr (Leitung/Gerät können überhitzen).' },
        { text: 'Die Sicherung mit Alufolie überbrücken, bis die Ersatzsicherung da ist.', why: 'Überbrücken hebt jeden Schutz auf — Brandgefahr.' },
        { text: 'Eine flinke 10-A-Sicherung nehmen, weil sie schneller schützt.', why: 'Bei Netzteilen mit hohem Einschaltstrom würde sie unnötig auslösen — die Charakteristik muss gleich sein.' },
      ],
    },
    {
      id: 'mission-psu', type: 'callout', tone: 'mission', title: 'Funkpraxis: Stromversorgung am Einsatzort',
      md: `Beim Fieldday oder in der Notfunk-Station betreibst du den Transceiver aus einem **Akku** (z. B. 12-V-LiFePO₄ oder Blei) oder einem **Schaltnetzteil**. Dann gilt: Zuleitung **dick genug** und **kurz**, Sicherung nahe am Akku (ein Kurzschluss im Kabel ist der gefährlichste Fall), Polung **zweimal** prüfen. Ein billiges Schaltnetzteil kann den Empfang mit Störgeräuschen zuschütten — dann hilft ein linear geregeltes Netzteil oder ein gutes Filter (siehe Lektionen zu EMV). Das Schaltzeichen der Batterie findest du in jedem Stromlaufplan deines Geräts.`,
    },
    {
      id: 'video', type: 'video', youtube: 'H9wytHFZ2Z0', label: 'Lektion 12 – Spannungsversorgung', channel: 'DL2YMR',
      why: 'Videolehrgang für Klasse N (DARC AJW) mit der Lektion zur Spannungsversorgung als zusätzlicher Erklärung.',
    },
    {
      id: 'recall-psu', type: 'recall', title: 'In eigenen Worten',
      prompt: 'Beschreibe den Weg von der Steckdose zum Transceiver (Stufen, Ausgangsspannung), zwei Schutzfunktionen eines guten Netzgeräts und was du beim Austausch einer Sicherung beachtest.',
      answer: 'Netztransformator (230 V herunter) → Gleichrichter → Ladekondensator (Siebung) → Spannungsregler → ca. 13,8 V Gleichspannung über eine zweipolige Leitung (rot Plus, schwarz Minus, Polung beachten). Gute Netzgeräte haben Kurzschlussstrombegrenzung und thermische Abschaltung. Eine durchgebrannte Sicherung wird erst nach Behebung der Ursache durch eine gleichartige ersetzt: gleicher Nennstrom und gleiche Auslösecharakteristik, nie überbrücken oder höher dimensionieren.',
      cards: ['psu-aufgabe', 'psu-sicherung'],
    },
  ],
  cards: [
    { id: 'psu-aufgabe', front: 'Aufgabe eines Netzgeräts für den Transceiver?', back: 'Aus 230 V Wechselspannung eine **Gleichspannung von ca. 13,8 V** erzeugen.' },
    { id: 'psu-stufen', front: 'Stufen eines linearen Netzteils?', back: 'Trafo → Gleichrichter → Ladekondensator (Siebung) → Regler.' },
    { id: 'psu-einweg', front: 'Einweggleichrichter: Spannungsverlauf?', back: 'Nur positive Halbwellen mit Lücken; Brücke: alle Halbwellen ohne Lücken.' },
    { id: 'psu-konstanz', front: 'Wichtigste Eigenschaft einer Gleichspannungsquelle?', back: 'Hohe Spannungskonstanz bei Belastung (kleiner Innenwiderstand, $U_\\mathrm{K}=U_0-R_\\mathrm{i}I$).' },
    { id: 'psu-schalt', front: 'Schaltnetzteil: Vor- und Nachteil?', back: 'Hoher Wirkungsgrad, geringes Gewicht und Volumen; erzeugt **hochfrequente Störungen**.' },
    { id: 'psu-zweipol', front: 'Warum ist die Versorgungsleitung zweipolig?', back: 'Strom fließt in einem Leiter hin, im anderen zurück — der Stromkreis schließt sich über den Transceiver.' },
    { id: 'psu-polung', front: 'Klemmenfarben 13,8 V? Folge der Verpolung?', back: 'Plus **rot**, Minus **schwarz**. Verpolung kann das Funkgerät beschädigen.' },
    { id: 'psu-schutz', front: 'Schutzfunktionen hochwertiger Netzgeräte?', back: 'Kurzschlussstrombegrenzung und thermische Abschaltung.' },
    { id: 'psu-sicherung', front: 'Sicherung ersetzen?', back: 'Gleicher Nennstrom **und** gleiche Auslösecharakteristik (flink/träge); nie überbrücken oder größer wählen.' },
    { id: 'psu-adern', front: 'Aderfarben: Schutzleiter, Außenleiter, Neutralleiter?', back: '**grüngelb, braun, blau**.' },
    { id: 'psu-schuko', front: 'Wohin führt der Schutzkontakt des Schukosteckers?', back: 'Zum **PE-Leiter** der Steckdose (nicht N oder L).' },
    { id: 'psu-akku', front: 'Batterie-Schaltzeichen und Reihenschaltung?', back: 'Langer Strich = Plus. Reihenschaltung addiert die Spannungen: 6 × 1,5 V = 9 V.' },
    { id: 'psu-umgang', front: 'Umgang mit Akkus? Gefahren?', back: 'Kurzschluss vermeiden, nicht tiefentladen. Gefahren: Verbrennungen, Verätzungen, Vergiftungen.' },
  ],
};
