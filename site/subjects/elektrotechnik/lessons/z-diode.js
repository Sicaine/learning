export default {
  id: 'z-diode',
  title: 'Z-Diode und Spannungsstabilisierung',
  summary: 'Wie eine Diode in Sperrrichtung eine feste Spannung hält, wie du den Vorwiderstand für den ungünstigsten Fall dimensionierst — und wo die Grenzen der einfachen Z-Diodenschaltung liegen.',
  minutes: 30,
  needs: ['dioden'],
  goals: [
    'Erklären, warum die [[z-diode|Z-Diode]] in **Sperrrichtung** im Durchbruch eine nahezu konstante Spannung hält',
    'Den Vorwiderstand $R_V=(U_\\text{ein}-U_Z)/(I_Z+I_L)$ berechnen und für Last- und Eingangsspannungsbereich (Worst Case) dimensionieren',
    'Die Verlustleistung der Z-Diode im Leerlauf bestimmen und mit der zulässigen Leistung vergleichen',
    'Grenzen der Schaltung nennen: Innenwiderstand, Temperaturgang, Brummunterdrückung',
  ],
  blocks: [
    {
      id: 'intuition', type: 'text', title: 'Ein Überlaufventil für Spannung',
      md: String.raw`
Eine normale [Diode](wiki:Diode|Diode) sperrt in Rückwärtsrichtung — bis zur **Durchbruchspannung**. Dann bricht die Sperrwirkung zusammen und der Strom steigt senkrecht an. Bei der Gleichrichterdiode zerstört das sie. Die **Z-Diode** ([Z-Diode](wiki:Z-Diode|Zener diode)) ist dafür gebaut: Ihr Durchbruch liegt bei einer genau gefertigten Spannung $U_Z$ (z. B. 5,1 V; 6,8 V; 13 V) und sie hält diese Spannung über einen großen Strombereich fast konstant — wie ein Überlaufventil, das den Wasserstand bei einer festen Höhe hält.

Benannt ist sie nach [Clarence Zener](wiki:Clarence Zener|Clarence Zener), der den zugrundeliegenden Tunneleffekt beschrieb. Unter etwa 5 V dominiert der [Zener-Effekt](wiki:Zener-Effekt|Zener effect), darüber der Lawineneffekt ([Lawinendurchbruch](wiki:Lawinendurchbruch|Avalanche breakdown)); beide heißen im Alltag „Zenerdiode".[^wp-z-diode]

**Das Schaltzeichen** ist eine Diode mit abgeknicktem Querstrich (wie ein „Z"). **Betrieben wird sie in Sperrrichtung**: Kathode zum Pluspol. Merkhilfe: *Z wie Zielspannung in Sperrrichtung.* Würdest du sie in Durchlassrichtung betreiben, wäre sie nur eine gewöhnliche Diode mit 0,7 V.`,
    },
    {
      id: 'schaltung', type: 'text', title: 'Die Grundschaltung: Vorwiderstand + Z-Diode',
      md: String.raw`
Eine Z-Diode darf **nie ohne Vorwiderstand** an die Quelle: Oberhalb von $U_Z$ ist sie fast ein Kurzschluss; nur der Vorwiderstand $R_V$ begrenzt den Strom. Die Schaltung ist ein Spannungsteiler, in dem die Z-Diode den unteren Zweig bildet:

$$ U_\text{aus} = U_Z \qquad I_V = \frac{U_\text{ein}-U_Z}{R_V} = I_Z + I_L $$

Der Strom durch $R_V$ teilt sich auf: $I_L$ geht in die Last, der Rest $I_Z$ fließt durch die Z-Diode. Damit die Stabilisierung funktioniert, muss $I_Z$ immer größer sein als der **Mindeststrom** $I_{Z,\min}$ (Knickbereich). Bei Entlastung (kleineres $I_L$) wandert der Strom komplett in die Z-Diode — dort wird er zu Wärme: $P_Z = U_Z\cdot I_Z$.

**Dimensionierung:**

$$ R_V = \frac{U_\text{ein}-U_Z}{I_Z + I_L} $$

Bei schwankender Eingangsspannung und Last rechnest du mit dem **ungünstigsten Fall**: Für den Mindeststrom nimmst du die *kleinste* Eingangsspannung und die *größte* Last: $R_{V,\max}=(U_{\text{ein,min}}-U_Z)/(I_{L,\max}+I_{Z,\min})$. Für die Leistung der Z-Diode die *größte* Eingangsspannung und *kein* Last: $P_{Z,\max}=U_Z\,(U_{\text{ein,max}}-U_Z)/R_V$.`,
    },
    {
      id: 'calc-rv', type: 'numeric', title: 'Vorwiderstand berechnen',
      question: String.raw`Aus $12\,\text{V}$ soll mit einer Z-Diode ($U_Z=5{,}1\,\text{V}$) eine Last mit $10\,\text{mA}$ versorgt werden; durch die Z-Diode sollen mindestens $10\,\text{mA}$ fließen. Wie groß ist der berechnete $R_V$, in Ω?`,
      answer: 345, tolerance: 2, unit: 'Ω',
      explain: String.raw`$R_V=(12-5{,}1)\,\text{V}/(10+10)\,\text{mA}=6{,}9/0{,}02=345\,\Omega$. E12-Wert: 330 Ω (der Strom wird etwas größer, die Stabilisierung sicherer).`,
    },
    {
      id: 'calc-pz', type: 'numeric', title: 'Leerlauf: Verlustleistung der Z-Diode',
      question: String.raw`Mit $R_V=330\,\Omega$, $U_\text{ein}=12\,\text{V}$ und $U_Z=5{,}1\,\text{V}$: Welche Leistung setzt die Z-Diode im **Leerlauf** um ($I_L=0$), in W?`,
      answer: 0.107, tolerance: 0.003, unit: 'W',
      hint: String.raw`Im Leerlauf fließt der ganze Strom $I_V=(12-5{,}1)/330$ durch die Z-Diode.`,
      explain: String.raw`$I_Z=6{,}9\,\text{V}/330\,\Omega=20{,}9$ mA, $P_Z=5{,}1\,\text{V}\cdot20{,}9\,\text{mA}=0{,}107$ W. Eine 0,5-W-Z-Diode ist also gut ausgelegt.`,
    },
    {
      id: 'calc-ec521', type: 'numeric', title: 'Prüfungsrechnung: Z-Diode 13,8 V auf 5 V',
      question: String.raw`Eine unbelastete Z-Diode soll $13{,}8\,\text{V}$ Betriebsspannung auf $5\,\text{V}$ stabilisieren, dabei soll ein Strom von $30\,\text{mA}$ fließen. Wie groß ist $R_V$, in Ω?`,
      answer: 293, tolerance: 2, unit: 'Ω',
      explain: String.raw`$R_V=(13{,}8-5)\,\text{V}/30\,\text{mA}=8{,}8/0{,}03=293\,\Omega$ (EC521).`,
    },
    {
      id: 'worst-case', type: 'numeric', title: 'Worst Case',
      question: String.raw`Die Eingangsspannung schwankt zwischen $10{,}8\,\text{V}$ und $13{,}2\,\text{V}$ ($12\,\text{V}\pm10\,\%$). Die Last zieht $5\ldots15\,\text{mA}$, $I_{Z,\min}=5\,\text{mA}$, $U_Z=5{,}1\,\text{V}$. Welcher **größte** Vorwiderstand ist zulässig, in Ω?`,
      answer: 285, tolerance: 2, unit: 'Ω',
      hint: String.raw`Ungünstigster Fall: kleinste $U_\text{ein}$, größte Last, kleinster Z-Strom.`,
      explain: String.raw`$R_{V,\max}=(10{,}8-5{,}1)\,\text{V}/(15+5)\,\text{mA}=5{,}7/0{,}02=285\,\Omega$ → nächst kleinerer E12-Wert: **270 Ω**. Kontrolle Leistung: $P_{Z,\max}=5{,}1\cdot(13{,}2-5{,}1)/270=0{,}153$ W < 0,5 W ✓.`,
    },
    {
      id: 'viz-zener', type: 'viz', viz: 'zener-lab', title: 'Z-Dioden-Labor',
      intro: String.raw`Oben der Schaltplan, darunter die Spannungen im Zeitverlauf: $u_\text{ein}$ (mit überlagerter 100-Hz-Brummspannung) und $u_\text{aus}$ (stabilisiert). Wähle $U_Z$, den Vorwiderstand und die Last. Die Anzeige warnt bei Überlast der Z-Diode ($P_Z$) und wenn die Z-Diode „aussteigt" (Strom zu klein, Ausgang fällt unter $U_Z$). Darunter siehst du, wie viele dB Brumm die Schaltung unterdrückt.`,
      params: { uNom: 12, tolU: 0.1, loadMin: 5e-3, loadMax: 15e-3, uz: 5.1, izMin: 5e-3, pzMax: 0.5, ripDb: 34 },
      task: String.raw`Dimensioniere eine **5,1-V-Stabilisierung** für Lasten von 5–15 mA aus 12 V ± 10 %: Wähle $U_Z$ und $R_V$ so, dass der Ausgang stabil bleibt. Erreiche außerdem eine **Brummunterdrückung von mindestens 34 dB** — Tipp: Je mehr Spannung über $U_Z$ „übrig" ist, desto kleiner ist $r_Z$ und desto besser die Unterdrückung; hebe dazu die Eingangsspannung $U_\text{ein}$ an.`,
      caption: 'Je kleiner R_V, desto besser hält die Schaltung unter Last — aber desto größer die Leistung in der Z-Diode im Leerlauf.',
    },
    {
      id: 'quiz-richtig', type: 'quiz', title: 'Richtig angeschlossen',
      question: 'Wie wird eine Z-Diode zur Spannungsstabilisierung richtig eingesetzt?',
      options: [
        { text: 'In Sperrrichtung, mit einem Vorwiderstand in Reihe zur Quelle; der Verbraucher liegt parallel zur Z-Diode.', correct: true, why: 'Nur im Durchbruch (Sperrrichtung) wirkt sie als Referenz; der Vorwiderstand begrenzt den Strom.' },
        { text: 'In Durchlassrichtung, direkt an der Quelle.', correct: false, why: 'In Durchlassrichtung hält sie nur 0,7 V — wie jede Diode — und ohne Vorwiderstand fließt ein riesiger Strom.' },
        { text: 'In Sperrrichtung, ohne Vorwiderstand.', correct: false, why: 'Im Durchbruch bricht die Spannung zusammen; ohne Strombegrenzung verbrennt die Z-Diode.' },
        { text: 'In Reihe mit der Last, damit der Strom stabil bleibt.', correct: false, why: 'Dann liegt sie nicht als Querzweig; sie würde die Last nicht stabilisieren.' },
      ],
    },
    {
      id: 'quiz-rv-gross', type: 'quiz', title: 'Vorwiderstand zu groß',
      question: 'Was passiert, wenn der Vorwiderstand einer Z-Diodenschaltung **zu groß** gewählt wird?',
      options: [
        { text: 'Der Strom durch $R_V$ reicht für Last und Z-Strom nicht mehr — der Ausgang fällt unter $U_Z$ und die Stabilisierung bricht zusammen.', correct: true, why: 'Die Z-Diode bekommt zu wenig Strom (unterhalb des Knicks), die Schaltung wirkt dann nur noch als Spannungsteiler.' },
        { text: 'Die Z-Diode wird überlastet und verbrennt.', correct: false, why: 'Das passiert bei zu **kleinem** Vorwiderstand (zu großer Strom).' },
        { text: 'Die Ausgangsspannung steigt über $U_Z$.', correct: false, why: 'Mehr als $U_Z$ kann der Ausgang nicht erreichen; bei Strommangel fällt er darunter.' },
        { text: 'Es ändert sich nichts.', correct: false, why: 'Bei Last und zu großem $R_V$ ändert sich sehr wohl etwas.' },
      ],
    },
    {
      id: 'grenzen', type: 'text', title: 'Grenzen der Z-Dioden-Stabilisierung',
      md: String.raw`
So einfach die Schaltung ist, sie hat Schwächen:

- **Innenwiderstand:** Die Kennlinie im Durchbruch ist nicht ganz senkrecht. Der **differentielle Widerstand** $r_Z=\Delta U_Z/\Delta I_Z$ liegt je nach Typ bei einigen Ω bis einigen 10 Ω; wenn sich der Strom ändert, ändert sich die Spannung etwas.
- **Verlustleistung:** Im Leerlauf wird alles in Wärme umgesetzt. Für Lasten über einige zehn mA ist die Schaltung ein **Stromfresser** — man nimmt dann einen Transistor als Folger oder einen integrierten [Spannungsregler](wiki:Spannungsregler|Voltage regulator) (Festspannungsregler, später im Pfad).
- **Temperaturgang:** Unter 5 V negativ, über 6 V positiv — um etwa 5,6 V nahe null: die besten Referenzdioden liegen dort.
- **Brummunterdrückung:** Sie wächst mit dem Verhältnis $(R_V+r_Z)/r_Z$. Bei festem Strom heißt das: Je weiter die Eingangsspannung über $U_Z$ liegt (großer $R_V$, kleiner $r_Z$), desto besser wird der Brumm unterdrückt; die Demo zeigt das in dB.

Wo die Z-Diode eine echte Rolle spielt: als **[Referenzspannung](wiki:Spannungsreferenz|Voltage reference)** für Regler und Komparatoren (mit kleinem Strom), als **Überspannungsschutz** am Eingang (parallel zum Ausgang einer Quelle) und zur Pegelbegrenzung.`,
    },
    {
      id: 'warning-z', type: 'callout', tone: 'warning', title: 'Vorsicht: Z-Diode nicht in Durchlassrichtung und nie ohne Widerstand',
      md: String.raw`
Zwei Klassiker: (1) Z-Diode in **Durchlassrichtung** betrieben — dann ist sie eine normale 0,7-V-Diode. (2) Z-Diode **ohne Vorwiderstand** — sie ist eine Stromspeise, deren Spannung fest ist; ohne Strombegrenzung zieht die Quelle so viel Strom, bis die Z-Diode durchbrennt. Merke: Der Vorwiderstand gehört zur **Quelle** (in Reihe), nicht zur Last.`,
    },
    {
      id: 'video-z', type: 'video', youtube: 'l9DZwot881U', label: 'Elektronik-Rezepte: Die Zener-Diode', channel: 'FearlessEngineers - Elektrotechnik & Programmieren', minutes: 6,
      why: 'Kurz und praxisnah: Aufbau der Stabilisierungsschaltung und Berechnung des Vorwiderstands.',
    },
    {
      id: 'mission', type: 'callout', tone: 'mission', title: 'Prüfung & Funkpraxis',
      md: String.raw`
- **Prüfungsbezug:** EC518 (Z-Dioden dienen primär der Spannungsstabilisierung), EC520 (welche Schaltung ist richtig? → Sperrrichtung + Vorwiderstand), EC521 und EC522 (Vorwiderstand rechnen, z. B. 13,8 V → 5 V bei 30 mA → rund 293 Ω).
- **Praxis:** Die 13,8 V einer Funkgerätversorgung (Netzteil eines 12-V-Geräts) lassen sich mit einer Z-Diode und einem Widerstand auf 5 V für einen kleinen Mikrocontroller oder eine LED-Referenz bringen — für ein paar mA. Im Funkgerät dienen Z-Dioden außerdem als [Überspannungsschutz](wiki:Überspannungsschutz|Surge protector) an den Eingängen.
- **Rechentipp:** Zuerst Strom durch den Vorwiderstand ($I_Z+I_L$) festlegen, dann $R_V=(U_\text{ein}-U_Z)/I$. Dann Leistungen kontrollieren: $P_R$ und $P_Z$.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: String.raw`
<table><tr><th>Deutsch</th><th>English</th><th>Notation</th></tr>
<tr><td>Z-Diode</td><td>Zener diode</td><td>$U_Z$, $I_Z$</td></tr>
<tr><td>Durchbruchspannung</td><td>breakdown voltage</td><td></td></tr>
<tr><td>Vorwiderstand</td><td>series (dropping) resistor</td><td>$R_V$</td></tr>
<tr><td>Spannungsstabilisierung</td><td>voltage regulation</td><td></td></tr>
<tr><td>Referenzspannung</td><td>reference voltage</td><td>$U_\text{ref}$</td></tr>
<tr><td>Lastwiderstand, Laststrom</td><td>load resistance, load current</td><td>$R_L$, $I_L$</td></tr>
<tr><td>Brummspannung</td><td>ripple voltage</td><td></td></tr>
<tr><td>Verlustleistung</td><td>power dissipation</td><td>$P_Z$</td></tr></table>`,
    },
    {
      id: 'recall-rv', type: 'recall', title: 'Erkläre es mit eigenen Worten',
      prompt: 'Warum braucht eine Z-Diode **immer** einen Vorwiderstand? Und wovon hängt seine Größe ab?',
      answer: 'Im Durchbruch verhält sich die Z-Diode wie eine Spannungsquelle $U_Z$ mit sehr kleinem Innenwiderstand; ohne Strombegrenzung würde die Quelle sie mit riesigem Strom zerstören. Der Vorwiderstand begrenzt den Strom auf $I_V=(U_\\text{ein}-U_Z)/R_V$. Seine Größe richtet sich nach dem Strombedarf (Last + Mindest-Z-Strom) beim ungünstigsten Fall (kleinste Eingangsspannung, größte Last) und der zulässigen Verlustleistung der Z-Diode im Leerlauf.',
      hints: ['Was passiert, wenn die Z-Diode ohne Widerstand an der Quelle liegt?', 'Worauf musst du achten, wenn die Eingangsspannung schwankt?'],
      cards: ['z-prinzip', 'z-rv'],
    },
  ],
  cards: [
    { id: 'z-prinzip', front: 'Prinzip der Z-Diode?', back: 'In **Sperrrichtung** im Durchbruch hält sie $U_Z$ nahezu konstant über einen großen Strombereich.' },
    { id: 'z-schaltzeichen', front: 'Schaltzeichen der Z-Diode?', back: 'Diode mit **abgeknicktem** Kathoden-Strich („Z"); Kathode zum Pluspol angeschlossen.' },
    { id: 'z-rv', front: 'Vorwiderstand einer Z-Diodenschaltung?', back: '$R_V=(U_\\text{ein}-U_Z)/(I_Z+I_L)$' },
    { id: 'z-worst', front: 'Worst-Case-Rechnung für $R_V$?', back: '$R_{V,\\max}=(U_{\\text{ein,min}}-U_Z)/(I_{L,\\max}+I_{Z,\\min})$; Leistung mit $U_{\\text{ein,max}}$ und $I_L=0$.' },
    { id: 'z-pz', front: 'Verlustleistung der Z-Diode im Leerlauf?', back: '$P_Z=U_Z\\cdot I_Z=U_Z(U_\\text{ein}-U_Z)/R_V$' },
    { id: 'z-referenz', front: 'Wozu dient eine Z-Diode primär?', back: 'Zur Spannungsstabilisierung bzw. als Referenzspannung (und Überspannungsschutz).' },
    { id: 'z-ohne-r', front: 'Was passiert bei Z-Diode ohne Vorwiderstand?', back: 'Der Strom ist unbegrenzt, die Z-Diode wird thermisch zerstört.' },
    { id: 'z-rv-gross', front: 'Folge eines zu großen Vorwiderstands?', back: 'Strom reicht nicht für Last + Z-Strom: Ausgang fällt unter $U_Z$, Stabilisierung bricht zusammen.' },
    { id: 'z-rv-klein', front: 'Folge eines zu kleinen Vorwiderstands?', back: 'Zu großer Strom in der Z-Diode im Leerlauf: Überlastung (Verlustleistung).' },
    { id: 'z-ri', front: 'Differentieller Widerstand der Z-Diode?', back: '$r_Z=\\Delta U_Z/\\Delta I_Z$ (Ω bis einige 10 Ω): bestimmt die Restwelligkeit und Lastabhängigkeit.' },
    { id: 'z-richtung', front: 'Betrieb der Z-Diode: Durchlass- oder Sperrrichtung?', back: 'Sperrrichtung (Durchbruch) — „Z wie Zielspannung in Sperrrichtung".' },
  ],
};
