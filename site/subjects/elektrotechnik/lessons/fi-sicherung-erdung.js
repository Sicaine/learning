export default {
  id: 'fi-sicherung-erdung',
  title: 'FI, Sicherungen, Schutzleiter, Potentialausgleich',
  summary: 'Die Sicherung schützt die Leitung, der FI den Menschen, der Schutzleiter sorgt für den Fehlerstrompfad und der Potentialausgleich verhindert gefährliche Spannungen zwischen leitfähigen Teilen – bis hin zur Antennenerdung.',
  minutes: 30,
  needs: ['koerperstrom-schutz'],
  goals: [
    'Aufgabe und Wirkungsweise von [[sicherung|Sicherung]] und [[leitungsschutzschalter|Leitungsschutzschalter]] gegen Überlast und Kurzschluss erklären',
    'Das Prinzip des [[fi-schalter|FI-Schalters]] (Summenstromwandler, Differenzstrom, 30 mA) beschreiben',
    'Den Fehlerfall bei Schutzklasse I durchspielen: Gehäuse unter Spannung → Schutzleiter → Auslösung',
    'Erklären, wozu [[potentialausgleich|Potentialausgleich]] und Erdung dienen (auch bei Antennenanlagen)',
    'Die Aderfarben (L braun/schwarz/grau, N blau, PE grün-gelb) zuordnen und Grenzen des FI nennen',
  ],
  blocks: [
    {
      id: 'idee', type: 'text', title: 'Zwei verschiedene Aufgaben: Leitung schützen und Menschen schützen',
      md: `
In der Hausinstallation gibt es zwei Arten von Schutzeinrichtungen, die oft verwechselt werden:

- **Überstromschutz** ([[sicherung|Sicherung]], [[leitungsschutzschalter|Leitungsschutzschalter]], LS): Er schützt **die Leitung** (und das Gerät) vor Überhitzung bei Überlast und Kurzschluss. Er löst aus, wenn zu viel Strom *insgesamt* fließt.
- **Fehlerstromschutz** ([[fi-schalter|FI]], RCD): Er schützt **den Menschen** (und vor Bränden durch Leckströme). Er löst aus, wenn Strom auf einem **falschen Weg** abfließt – z. B. über einen Körper oder das Gehäuse zur Erde.

Ein Mensch, der 100 mA durch den Körper bekommt, löst keine Sicherung aus – für die Sicherung ist das winzig. Gerade deshalb gibt es den FI.[^wp-rcd]

Dazu kommen zwei passive Maßnahmen: der **Schutzleiter** (PE), der im Fehlerfall den Strompfad vorgibt, und der **Potentialausgleich**, der dafür sorgt, dass alle berührbaren leitfähigen Teile dasselbe Potential haben.`,
    },
    {
      id: 'sicherung', type: 'text', title: 'Sicherung und Leitungsschutzschalter',
      md: `
Eine **[Schmelzsicherung](wiki:Schmelzsicherung|Fuse (electrical))** enthält einen dünnen Draht (Schmelzleiter), der bei zu hohem Strom schmilzt und den Stromkreis trennt – einmalig. Der **[Leitungsschutzschalter](wiki:Leitungsschutzschalter|Miniature circuit breaker)** (Sicherungsautomat) trennt dagegen wiederholbar mit zwei Mechanismen:

- **thermisch** (Bimetall): bei Überlast, also etwas über dem Nennstrom, nach Sekunden bis Minuten;
- **magnetisch** (Spule): bei Kurzschluss, innerhalb von Millisekunden.

Die **Charakteristik** (B, C, …) legt fest, ab dem Wievielfachen des Nennstroms $I_N$ der magnetische Auslöser anspricht: Typ B bei 3–5 $I_N$, Typ C bei 5–10 $I_N$. Ein **B16** trägt dauerhaft 16 A und löst bei Kurzschluss ab etwa 48–80 A aus.

Aus dem Nennstrom folgt die maximale Dauerlast einer Steckdosengruppe:

$$P_\\text{max} = U\\cdot I_N = 230\\,\\text{V}\\cdot16\\,\\text{A}=3{,}68\\,\\text{kW}$$

Die Absicherung richtet sich nach dem **Leitungsquerschnitt** (wegen des [Kurzschlusses](wiki:Elektrischer Kurzschluss|Short circuit) und der Erwärmung): Der Schutzschalter muss auslösen, bevor die Leitung zu heiß wird. Deshalb gilt: Ersetze eine durchgebrannte Feinsicherung stets durch eine **gleichen Stromwertes und gleicher Auslösecharakteristik** (Katalog **NK305**, **EK204**) – niemals „flicken" oder einen höheren Wert einsetzen.[^bnetza-pruefungsfragen-2024]`,
    },
    {
      id: 'fi', type: 'text', title: 'Der FI: Hin- und Rückstrom müssen gleich sein',
      md: `
Im Normalbetrieb fließt durch den Außenleiter genau so viel Strom hin, wie im Neutralleiter zurückkommt. Der [FI](wiki:Fehlerstrom-Schutzschalter|Residual-current device) führt beide Leiter durch einen **Summenstromwandler** (einen Ringkern). Solange $I_L = I_N$, heben sich die Magnetfelder auf – es entsteht keine Spannung in der Sekundärwicklung.

Fließt ein Teil des Stroms über einen anderen Weg zur Erde – über das Gehäuse und den Schutzleiter, über einen Körper –, fehlt er im Rückleiter. Die Differenz

$$I_\\Delta = |I_L - I_N|$$

erzeugt im Kern ein Feld, das einen Auslöser betätigt und innerhalb von Millisekunden **abschaltet**. Der FI für den Personenschutz hat einen Bemessungsdifferenzstrom $I_{\\Delta N}=30\\,\\text{mA}$. Er löst laut Norm bei einem Wert zwischen **50 % und 100 %** von $I_{\\Delta N}$ aus (in der Praxis um 70 %, also etwa 20 mA) und braucht dafür bei einem 30-mA-Typ in der Praxis 20–30 ms.[^wp-rcd] Mit der **Prüftaste** (T) prüft man den Auslöser regelmäßig: Sie erzeugt künstlich einen Differenzstrom.

Wichtig sind die **Grenzen**: Der FI

- schützt **nicht** vor Überlast und Kurzschluss zwischen L und N (dort ist $I_\\Delta=0$ – das ist Sache des LS),
- schützt **nicht**, wenn jemand Außenleiter **und** Neutralleiter gleichzeitig berührt (der Strom fließt durch den Körper, aber Hin- und Rückstrom sind gleich),
- ist **Zusatzschutz**, kein Ersatz für Schutzleiter und Isolierung.`,
    },
    {
      id: 'video', type: 'video', youtube: '5wGUSHfZY9c', label: 'FI-Schutzschalter / RCD – wie funktioniert ein FI?', channel: 'TOBI\'S TOOL TIME', minutes: 5,
      why: 'Knapp fünf Minuten: Aufbau und Funktion des Fehlerstrom-Schutzschalters mit Summenstromwandler – eine anschauliche Ergänzung zum Abschnitt oben.',
    },
    {
      id: 'pe', type: 'text', title: 'Schutzleiter und Potentialausgleich',
      md: `
Bei einem Gerät der [Schutzklasse I](wiki:Schutzklasse (Elektrotechnik)|Appliance classes) liegt das Metallgehäuse am **[Schutzleiter](wiki:Schutzleiter|Protective earth)**. Entsteht ein Isolationsfehler zwischen Außenleiter und Gehäuse, fließt ein großer Fehlerstrom über den Schutzleiter zur Erde, die Sicherung oder der FI löst aus – und das Gehäuse bleibt nur kurz unter Spannung. Der Schutzleiter führt im Normalbetrieb **keinen Betriebsstrom**, er ist nur für den Fehlerfall da – ist er unterbrochen, merkt man es nicht (!), bis ein Fehler auftritt.

Der **[Potentialausgleich](wiki:Potentialausgleich|Electrical bonding)** verbindet alle leitfähigen Teile des Gebäudes (Wasser-, Gas-, Heizungsrohre, Gebäudeerdung, Metallkonstruktionen, Antennenmasten, Schirme von Koaxkabeln) mit einer **Haupterdungsschiene** ([Erdung](wiki:Erdung|Earthing system)). Er sorgt dafür, dass zwischen gleichzeitig berührbaren Teilen auch im Fehlerfall keine gefährliche Spannung entsteht – denn gefährlich ist nicht das Potential gegenüber „irgendwo", sondern die **Differenz** zwischen zwei Berührungspunkten.

Das ist auch die Grundlage der Antennenerdung für Funkamateure: Die Schirme aller Koaxkabel von Antennen müssen miteinander und mit der Haupterdungsschiene verbunden sein (Katalog **EK208**); die Erdungsleitung vom Antennenstandrohr hat nach VDE 0855 einen Mindestquerschnitt (Einzelmassivdraht aus Kupfer 16 mm², **EK210**); eine Verbindung mit dem Blitzschutzsystem des Gebäudes darf nur eine Blitzschutz-Fachkraft herstellen (**EK211**). Die Details gehören ins Fach Amateurfunk.[^bnetza-pruefungsfragen-2024]`,
    },
    {
      id: 'viz-lab', type: 'viz', viz: 'fault-lab', title: 'Fehler-Labor',
      intro: 'Ein Gerät der Schutzklasse I (2 kW) am Netz, davor LS B16 und FI 30 mA. Wähle einen Fehler und beobachte Fehlerstrom, Differenzstrom, Körperstrom und die Gehäusespannung – und wer auslöst.',
      task: 'Erreiche alle drei Ziele: **PE unterbrochen + Isolationsfehler bei ausgeschaltetem FI** → das Gehäuse liegt auf ≈ 230 V; **Isolationsfehler mit intaktem PE** → der FI löst aus; **Kurzschluss L–N** → der LS löst aus, der FI nicht.',
    },
    {
      id: 'calc-b16', type: 'numeric', title: 'Maximale Dauerlast',
      question: 'Ein Leitungsschutzschalter B16 sichert einen Stromkreis an $230\\,\\text{V}$. Welche Dauerleistung darf der Stromkreis höchstens liefern (in kW)?',
      answer: 3.68, tolerance: 0.05, unit: 'kW',
      hint: '$P=U\\cdot I_N$',
      explain: '$230\\,\\text{V}\\cdot16\\,\\text{A}=3680\\,\\text{W}=3{,}68\\,\\text{kW}$ (praktisch ≈ 3,7 kW).',
    },
    {
      id: 'calc-fehler', type: 'numeric', title: 'Fehlerstrom',
      question: 'Durch einen Isolationsfehler fließt ein Strom über $R_F=1\\,\\text{k}\\Omega$ vom Außenleiter ($230\\,\\text{V}$) zum Gehäuse und über den Schutzleiter zur Erde (Schleifenwiderstand vernachlässigt). Wie groß ist der Fehlerstrom in mA?',
      answer: 230, tolerance: 2, unit: 'mA',
      hint: '$I_F\\approx U/R_F$',
      explain: '$I_F\\approx230\\,\\text{V}/1000\\,\\Omega=230\\,\\text{mA}$ – ein Vielfaches von 30 mA, der FI löst aus. Für den LS-Schalter ist das viel zu wenig (Nennstrom 16 A): Ohne FI würde nichts auslösen.',
    },
    {
      id: 'calc-ks', type: 'numeric', title: 'Kurzschlussstrom',
      question: 'Zwischen Außenleiter und Neutralleiter besteht ein Kurzschluss mit einem Schleifenwiderstand von $0{,}5\\,\\Omega$ an $230\\,\\text{V}$. Welcher Strom fließt (in A)?',
      answer: 460, tolerance: 2, unit: 'A',
      hint: '$I_K=U/Z$',
      explain: '$I_K=230\\,\\text{V}/0{,}5\\,\\Omega=460\\,\\text{A}$ – weit über der magnetischen Auslöseschwelle (48–80 A) des B16: Er löst sofort aus.',
    },
    {
      id: 'quiz-fi-ausloesen', type: 'quiz', title: 'Löst der FI aus?',
      question: 'Ein FI mit $I_{\\Delta N}=30\\,\\text{mA}$ misst einen Differenzstrom von $40\\,\\text{mA}$. Was geschieht?',
      options: [
        { text: 'Der FI löst aus', correct: true, why: '40 mA liegt über dem Bemessungsdifferenzstrom; der FI schaltet innerhalb weniger zehn Millisekunden ab.' },
        { text: 'Der FI löst nicht aus, weil er erst ab 100 mA reagiert', correct: false, why: 'Die Schwelle liegt bei 50–100 % von 30 mA, also deutlich darunter.' },
        { text: 'Der FI löst erst nach einigen Sekunden aus', correct: false, why: 'Der Auslöser arbeitet in Millisekunden, nicht in Sekunden.' },
        { text: 'Er löst aus, wenn der Gesamtstrom 16 A übersteigt', correct: false, why: 'Das ist die Aufgabe des Leitungsschutzschalters, nicht des FI.' },
      ],
    },
    {
      id: 'quiz-gleich', type: 'quiz', title: 'Hin- gleich Rückstrom',
      question: 'Wie reagiert ein FI, wenn im Außenleiter genau so viel Strom hin- wie im Neutralleiter zurückfließt?',
      options: [
        { text: 'Gar nicht – der Differenzstrom ist null', correct: true, why: 'Die Magnetfelder im Summenstromwandler heben sich auf.' },
        { text: 'Er schaltet ab, weil Strom fließt', correct: false, why: 'Betriebsstrom fließt immer; entscheidend ist nur die Differenz.' },
        { text: 'Er schaltet ab, wenn der Strom 16 A übersteigt', correct: false, why: 'Überstrom ist Sache des LS.' },
        { text: 'Er schaltet nur nach Betätigung der Prüftaste ab', correct: false, why: 'Die Prüftaste prüft nur den Auslöser; ein echter Differenzstrom löst von selbst aus.' },
      ],
    },
    {
      id: 'quiz-grenze', type: 'quiz', title: 'Wann schützt der FI nicht?',
      question: 'In welcher Situation schützt ein FI nicht?',
      options: [
        { text: 'Wenn jemand Außenleiter und Neutralleiter gleichzeitig berührt', correct: true, why: 'Der Strom fließt durch den Körper, aber Hin- und Rückstrom sind gleich: kein Differenzstrom.' },
        { text: 'Wenn ein Isolationsfehler Strom über das geerdete Gehäuse leitet', correct: false, why: 'Das ist gerade sein Einsatzfall: Der Strom fließt über PE zur Erde und fehlt im Rückleiter.' },
        { text: 'Wenn jemand das Gehäuse eines defekten Geräts mit nassen Händen anfasst', correct: false, why: 'Der Körperstrom gegen Erde ist ein Differenzstrom; der FI löst aus.' },
        { text: 'Wenn ein Leckstrom von 100 mA gegen Erde fließt', correct: false, why: 'Das liegt über 30 mA; der FI löst aus.' },
      ],
    },
    {
      id: 'match-farben', type: 'match', title: 'Aderfarben',
      prompt: 'Ordne jedem Leiter seine normgerechte Aderfarbe zu.',
      pairs: [['Schutzleiter PE', 'grün-gelb'], ['Neutralleiter N', 'blau'], ['Außenleiter L1', 'braun'], ['Außenleiter L2', 'schwarz'], ['Außenleiter L3', 'grau']],
    },
    {
      id: 'order-fehler', type: 'order', title: 'Der Fehlerfall bei Schutzklasse I',
      prompt: 'Bringe den Ablauf bei einem Isolationsfehler an einem Gerät mit Schutzleiter in die richtige Reihenfolge.',
      items: [
        'Die Isolation versagt, der Außenleiter berührt das Metallgehäuse',
        'Ein Fehlerstrom fließt über den Schutzleiter zur Erde',
        'Der FI misst den Differenzstrom (oder der LS den Überstrom)',
        'Die Schutzeinrichtung schaltet innerhalb von Millisekunden ab',
        'Das Gehäuse ist wieder spannungsfrei',
      ],
      explain: 'Ohne Schutzleiter bliebe das Gehäuse dauerhaft unter Spannung – bis ein Mensch es berührt.',
    },
    {
      id: 'recall-potential', type: 'recall', title: 'Erkläre es in eigenen Worten',
      prompt: 'Wozu dient der Potentialausgleich? Warum ist nicht die Spannung gegen Erde gefährlich, sondern etwas anderes?',
      answer: 'Der Potentialausgleich verbindet alle leitfähigen Teile eines Gebäudes (Rohre, Metallteile, Erdungsanlage, Koaxschirme) niederohmig miteinander, sodass sie auch im Fehlerfall praktisch dasselbe Potential haben. Gefährlich ist die Spannungsdifferenz zwischen zwei Punkten, die man gleichzeitig berühren kann, denn nur sie treibt einen Strom durch den Körper. Wenn alle Teile gleiches Potential haben, entsteht keine gefährliche Berührungsspannung – auch wenn das gesamte System gegenüber ferner Erde angehoben wird.',
      hints: ['Zwischen welchen Punkten fließt der Körperstrom?', 'Was bewirkt eine niederohmige Verbindung zwischen Metallteilen?'],
      cards: ['potentialausgleich', 'beruehrungsspannung'],
    },
    {
      id: 'mission', type: 'callout', tone: 'mission', title: 'Prüfung und Funkpraxis',
      md: `
Aus dem Katalog: die richtige **Ersatzsicherung** (gleicher Stromwert und gleiche Auslösecharakteristik, **EK204**, **NK305**), die **Adernkennfarben** (grüngelb, braun, blau, **EK205**), der Potentialausgleich über die **Schirme der Koaxkabel** zur Haupterdungsschiene (**EK208**), Erdung der Antennenanlage (**EK209**, **EK210**) und die Blitzschutzverbindung durch eine Fachkraft (**EK211**).[^bnetza-pruefungsfragen-2024] Praktisch heißt das für die Station: Schutzklasse-I-Geräte nur an Steckdosen mit PE betreiben, am Netzgerät den PE-Anschluss nicht abklemmen, jede Antennenleitung beim Eintritt in das Haus erden (Blitzschutz) und Schirme ins Potentialausgleichssystem einbinden.`,
    },
    {
      id: 'warning', type: 'callout', tone: 'warning', title: 'Typische Fehlvorstellung',
      md: `
„Ein FI schützt vor jedem Stromschlag." – Nein: Fasst jemand L und N gleichzeitig an, ist der Differenzstrom null, der FI löst nicht aus. „Die Sicherung schützt Menschen." – Nein, sie schützt die **Leitung** vor Überhitzung. „Der Schutzleiter führt Betriebsstrom." – Nein, er führt nur im Fehlerfall; ein unbemerkt unterbrochener PE ist deshalb gefährlich. Und: Ein **Prüfknopf-Test** des FI gehört zum Alltag (z. B. halbjährlich), er ersetzt keine fachgerechte Installation.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: `
<table><tr><th>Deutsch</th><th>English</th><th>Notiz</th></tr>
<tr><td>Fehlerstrom-Schutzschalter (FI, RCD)</td><td>residual-current device (RCD)</td><td>$I_{\\Delta N}=30$ mA</td></tr>
<tr><td>Differenzstrom</td><td>residual current</td><td>$|I_L-I_N|$</td></tr>
<tr><td>Leitungsschutzschalter (LS)</td><td>miniature circuit breaker (MCB)</td><td>B, C</td></tr>
<tr><td>Schmelzsicherung</td><td>fuse</td><td>einmalig</td></tr>
<tr><td>Schutzleiter (PE)</td><td>protective earth</td><td>grün-gelb</td></tr>
<tr><td>Potentialausgleich</td><td>equipotential bonding</td><td>Haupterdungsschiene</td></tr>
<tr><td>Erdung</td><td>earthing, grounding</td><td></td></tr>
<tr><td>Fehlerfall</td><td>fault condition</td><td></td></tr></table>`,
    },
    {
      id: 'deep-tn', type: 'callout', tone: 'deep', title: 'Warum der Fehlerstrom groß genug sein muss',
      md: `
Der Schutzleiter schützt nur, wenn im Fehlerfall wirklich ein hoher Strom fließt: Die Schleife Außenleiter → Fehler → Schutzleiter → Erdung/Netz muss so niederohmig sein, dass der Fehlerstrom die Schutzeinrichtung (LS magnetisch, Sicherung) innerhalb der geforderten Abschaltzeit (für Steckdosenkreise bis 32 A: 0,4 s) auslöst. Ein FI senkt diese Anforderung: Er reagiert schon auf kleine Fehlerströme im Milliampere-Bereich – deshalb ist er heute in Wohnungen für Steckdosenkreise vorgeschrieben (Zusatzschutz). In der Demo siehst du den Unterschied: Mit PE und kleinem $R_F$ fließen Ampere und das Gehäuse bleibt nahe Erdpotential; ohne PE liegt es auf voller Netzspannung.`,
    },
  ],
  cards: [
    { id: 'ls-aufgabe', front: 'Aufgabe von Sicherung/LS-Schalter?', back: 'Schutz der Leitung (und des Geräts) vor Überlast und Kurzschluss – nicht des Menschen.' },
    { id: 'ls-b', front: 'Auslösung eines LS B16?', back: 'Thermisch bei Überlast (Sekunden bis Minuten), magnetisch bei Kurzschluss ab 3–5 · 16 A = 48–80 A.' },
    { id: 'b16-leistung', front: 'Dauerlast eines B16 an 230 V?', back: '$P=230\\,\\text{V}\\cdot16\\,\\text{A}=3{,}68\\,\\text{kW}$.' },
    { id: 'ersatzsicherung', front: 'Ersatz einer durchgebrannten Sicherung?', back: 'Gleicher Stromwert und gleiche Auslösecharakteristik (NK305, EK204) – nie überbrücken oder höher wählen.' },
    { id: 'fi-prinzip', front: 'Prinzip des FI-Schalters?', back: 'Summenstromwandler: Hin- und Rückstrom heben sich auf; bei einem Differenzstrom gegen Erde entsteht ein Feld → Abschaltung.' },
    { id: 'fi-30', front: 'Bemessungsdifferenzstrom für Personenschutz?', back: '$I_{\\Delta N}=30$ mA; Auslösung zwischen 50 % und 100 % davon, in wenigen Zehntel-Sekunden bzw. Millisekunden.' },
    { id: 'fi-grenze', front: 'Wann schützt ein FI nicht?', back: 'Bei gleichzeitiger Berührung von L und N und bei Überlast/Kurzschluss L–N (Differenzstrom 0).' },
    { id: 'pe', front: 'Aufgabe des Schutzleiters PE?', back: 'Im Fehlerfall Strompfad zur Erde: hoher Fehlerstrom → Auslösung; führt im Normalbetrieb keinen Betriebsstrom.' },
    { id: 'potentialausgleich', front: 'Aufgabe des Potentialausgleichs?', back: 'Alle leitfähigen Teile auf gleiches Potential: keine gefährliche Spannung zwischen gleichzeitig berührbaren Teilen (Rohre, Koaxschirme, Erdung).' },
    { id: 'beruehrungsspannung', front: 'Was ist gefährlich: Potential gegen Erde oder Differenz?', back: 'Die Spannungsdifferenz zwischen zwei gleichzeitig berührten Punkten (Berührungsspannung).' },
    { id: 'adernfarben-fi', front: 'Aderfarben PE, N, L?', back: 'PE grün-gelb · N blau · L braun/schwarz/grau.' },
  ],
};
