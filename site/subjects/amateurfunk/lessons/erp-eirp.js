export default {
  id: 'erp-eirp',
  title: 'Strahlungsleistung: ERP und EIRP',
  summary: 'Effektive Strahlungsleistung (Bezug Dipol) und äquivalente isotrope Strahlungsleistung (Bezug Kugelstrahler): Gewinn, Kabelverluste und Sendeleistung in dB verrechnen.',
  minutes: 15,
  goals: [
    '[[erp]] und [[eirp]] definieren und unterscheiden (Bezug Halbwellendipol bzw. Kugelstrahler) und mit $P_\\mathrm{EIRP}=P_\\mathrm{ERP}\\cdot 1{,}64$ umrechnen',
    'Die EIRP aus Sendeleistung, Kabeldämpfung und Antennengewinn rechnen: erst Verluste abziehen, dann den Gewinn anwenden, am besten in dB',
    'Die Rechnung rückwärts anwenden: Welche Sendeleistung ist bei gegebenem Gewinn für eine EIRP-Grenze (z. B. 10 W) erlaubt?',
  ],
  needs: ['amateurfunk/richtantennen-polarisation-gewinn', 'elektrotechnik/dezibel'],
  blocks: [
    {
      id: 'intro', type: 'text', title: 'Wie viel strahlt die Antenne wirklich?',
      md: `
Die Sendeleistung am Funkgerät sagt wenig darüber, wie viel Feldstärke bei der Gegenstation oder beim Nachbarn ankommt. Das Kabel schluckt einen Teil, die Antenne **bündelt** die Leistung dafür in eine Richtung (siehe Gewinn). Die für Grenzwerte und Sicherheitsabstände maßgebliche Größe ist deshalb die **Strahlungsleistung in Hauptstrahlrichtung**: Die Richtung der stärksten Abstrahlung. Hält eine Anlage die Grenzwerte in dieser Richtung ein, hält sie sie in allen anderen Richtungen im gleichen Abstand auch ein.[^darc-50ohm]

Es gibt zwei Bezugsgrößen, weil es zwei Bezugsantennen für den [Antennengewinn](wiki:Antennengewinn|Gain (antenna)) gibt: den [Halbwellendipol](wiki:Dipolantenne|Dipole antenna) und den Kugelstrahler.
`,
    },
    {
      id: 'def', type: 'text', title: 'ERP und EIRP: gleiche Idee, anderer Bezug',
      md: `
- **[[erp|Effektive Strahlungsleistung (ERP)]]** (englisch effective radiated power, siehe [ERP](wiki:Effektive Strahlungsleistung|Effective radiated power)): die von einer Antenne in Hauptstrahlrichtung abgestrahlte Leistung, **bezogen auf einen Halbwellendipol**. Anschaulich: Es ist die Leistung, die man in einen Halbwellendipol einspeisen müsste, damit er in seiner Hauptstrahlrichtung genauso stark strahlt wie die betrachtete Antenne. Sendest du 5 W in eine Antenne mit dem Gewinnfaktor 2 gegenüber dem Dipol, ergeben sich 10 W ERP.
- **[[eirp|Äquivalente isotrope Strahlungsleistung (EIRP)]]** (englisch equivalent isotropically radiated power, siehe [EIRP](wiki:Äquivalente isotrope Strahlungsleistung|Equivalent isotropically radiated power)): die Strahlungsleistung **bezogen auf den isotropen Strahler** (Kugelstrahler). 5 W in eine Antenne mit Gewinnfaktor 3 gegenüber dem Kugelstrahler ergeben 15 W EIRP.

Die Namen verraten es: **ERP** ist der Dipol-Bezug, **EIRP** der isotrope Bezug (das „I“ steht für isotrop). Es ist die von der **Antenne** abgestrahlte Leistung bezogen auf die Bezugsantenne, nicht die vom Dipol abgestrahlte Leistung bezogen auf die Antenne.

Weil der Halbwellendipol gegenüber dem [Kugelstrahler](wiki:Isotropstrahler|Isotropic radiator) den Gewinnfaktor **1,64** (2,15 dB) hat, gilt:

$$P_\\mathrm{EIRP}=P_\\mathrm{ERP}\\cdot 1{,}64\\qquad\\Longleftrightarrow\\qquad P_\\mathrm{EIRP}=P_\\mathrm{ERP}+2{,}15\\,\\text{dB}$$

Eine Antenne mit dem Gewinnfaktor 2 gegenüber dem Dipol hat gegenüber der Kugel $2\\cdot1{,}64=3{,}28$. Die EIRP ist bei gleicher Anlage immer größer als die ERP.
`,
    },
    {
      id: 'rechnung', type: 'text', title: 'Rechnen: Verluste, Gewinn, Sendeleistung',
      md: `
Entscheidend ist, dass nur die Leistung zählt, die **an der Antenne ankommt**. Kabeldämpfung, Steckverbinder und Anpassgerät mindern sie. Der Antennengewinn kommt dann hinzu:

$$P_\\mathrm{EIRP}=(P_\\mathrm{Sender}-P_\\mathrm{Verluste})\\cdot G_\\mathrm{Antenne}$$

Beachte die Rechenzeichen: Verluste werden **subtrahiert**, der Gewinnfaktor **multipliziert**; der Bezug muss der isotrope Strahler sein (sonst ist es die ERP). Mit [Dezibel](wiki:Dezibel|Bel (unit)) wird alles einfacher, weil sich Dämpfung und Gewinn **addieren**. Die Formel der Formelsammlung[^bnetza-formelsammlung] lautet, mit dem Antennengewinn $g_i$ in dBi und der Dämpfung $a$ in dB:

$$P_\\mathrm{EIRP}=P_\\mathrm{Sender}\\cdot10^{\\frac{g_i-a}{10\\,\\text{dB}}}\\qquad\\text{bzw. mit dBd:}\\qquad P_\\mathrm{EIRP}=P_\\mathrm{Sender}\\cdot10^{\\frac{g_d-a+2{,}15\\,\\text{dB}}{10\\,\\text{dB}}}$$

Die Tabelle der Formelsammlung hilft bei krummen Werten im Kopf (dB-Werte zerlegen):

| dB | 0 | 1,5 | 2,15 | 3 | 5 | 6 | 10 | 20 |
|---|---|---|---|---|---|---|---|---|
| Faktor | 1 | $\\sqrt2=1{,}41$ | 1,64 | 2 | $\\sqrt{10}=3{,}16$ | 4 | 10 | 100 |

**Beispiel A ([Parabolspiegel](wiki:Parabolantenne|Parabolic antenna)):** 250 mW, 26 dBi, keine Leitungsverluste. $26\\,\\text{dB}=20+6$, also Faktor $100\\cdot4=400$: $0{,}25\\,\\text{W}\\cdot400=100$ W EIRP.

**Beispiel B (Kabel und Gewinn):** 100 W, Kabel 1 dB, Antenne 11 dBi. Gesamt $11-1=10$ dB, Faktor 10: **1000 W EIRP**.

**Beispiel C (Dipol):** 100 W, Dipol, Kabel 10 dB. Faktor $0{,}1$ für das Kabel, $1{,}64$ für den Dipol: $100\\cdot0{,}1\\cdot1{,}64=16{,}4$ W EIRP. Ein Dipol mit 2,15 dB Kabeldämpfung strahlt gerade so viel EIRP ab, wie der Sender abgibt (75 W bleiben 75 W): Gewinn und Dämpfung heben sich auf.

**Beispiel D (Gewinn auf Dipol bezogen):** 5 W, Kabel 2 dB, Antenne 5 dBd. Gesamt $-2+5+2{,}15=5{,}15$ dB $=3+2{,}15$, Faktor $2\\cdot1{,}64$: $5\\cdot3{,}28=16{,}4$ W EIRP. Immer 2,15 dB addieren, wenn der Gewinn in dBd gegeben ist und die EIRP gefragt ist.

**Rückwärts:** Welche Sendeleistung ist für 10 W EIRP erlaubt, wenn die Vertikalantenne 5,15 dBi hat (Kabelverluste vernachlässigt)? $5{,}15\\,\\text{dB}=3+2{,}15$, Faktor $2\\cdot1{,}64=3{,}28$: $P=\\dfrac{10\\,\\text{W}}{3{,}28}\\approx3$ W.
`,
    },
    {
      id: 'demo-erp', type: 'viz', viz: 'erp-eirp', title: 'ERP/EIRP-Kette',
      intro: 'Stelle Sendeleistung, Kabeldämpfung und Antennengewinn ein und wähle, ob der Gewinn in dBi oder dBd gegeben ist. Die Balken zeigen die Leistung entlang der Kette; ERP und EIRP unterscheiden sich immer um 2,15 dB. Die rote Linie ist die Grenze 10 W EIRP.',
      task: 'Hole 1000 W EIRP aus 100 W, 1 dB Kabel und 11 dBi, bleibe mit einer 5-dBi-Antenne unter 10 W EIRP und schalte den Bezug zwischen dBi und dBd um.',
    },
    {
      id: 'mission-grenze', type: 'callout', tone: 'mission', title: 'Funkpraxis: Die 10-W-EIRP-Grenze',
      md: `Für ortsfeste Amateurfunkanlagen gilt in der Verordnung zum Schutz von Personen in elektromagnetischen Feldern (BEMFV, § 9) eine Anzeigepflicht; bleibt die Strahlungsleistung unter **10 W EIRP**, kann die Anzeige entfallen (so auch die Prüfungsfrage EG511).[^bemfv] Die BEMFV dient dem [Schutz von Personen vor elektromagnetischen Feldern](wiki:Elektromagnetische Umweltverträglichkeit|Electromagnetic compatibility) Ein **QRP-Gerät** oder ein auf wenige Watt heruntergeregelter Sender macht das möglich: Mit einer Vertikalantenne von 5,15 dBi (Faktor 3,28) darfst du dann höchstens etwa 3 W einspeisen. Je mehr Gewinn die Antenne hat, desto weniger Sendeleistung darfst du für dieselbe EIRP einspeisen.`,
    },
    {
      id: 'warn-erp', type: 'callout', tone: 'warning', title: 'Typische Fehler',
      md: `**Leistungen und Dezibel nicht mischen:** Der Gewinn wird nicht zur Leistung addiert, $(P-P_\\mathrm{V})+G$ ist falsch, und Verluste dürfen nicht multipliziert werden. **Bezug beachten:** Bei Gewinn in dBd musst du für die EIRP 2,15 dB dazuzählen. **ERP und EIRP nicht vertauschen:** EIRP ist die größere Zahl. **Spitzenwert nicht gemeint:** Die EIRP-Definition der Prüfung bezieht sich auf die der Antenne zugeführte Leistung und ihren Gewinn, nicht auf Modulationsspitzen. Prüfungsbezug: NG401, NG402, EG501 bis EG511.`,
    },
    {
      id: 'q-def', type: 'quiz', title: 'ERP oder EIRP?',
      question: 'Eine Antenne hat in Hauptstrahlrichtung den Gewinnfaktor 4 gegenüber dem Halbwellendipol. Du speist 10 W ein (ohne Verluste). Welche Aussage stimmt?',
      options: [
        { text: 'ERP = 40 W; EIRP = 40 W · 1,64 = 65,6 W.', correct: true, why: 'ERP bezieht sich auf den Dipol (Faktor 4), die EIRP zusätzlich auf den Kugelstrahler (Faktor 1,64).' },
        { text: 'EIRP = 40 W; ERP = 40 W · 1,64 = 65,6 W.', why: 'Falsch herum: die ERP ist die kleinere Zahl.' },
        { text: 'ERP = EIRP = 40 W.', why: 'Es ist nur dann gleich, wenn man den Dipolgewinn ignoriert; er beträgt 2,15 dB.' },
        { text: 'ERP = 14 W; EIRP = 40 W.', why: 'Der Gewinn multipliziert sich mit der Leistung, er wird nicht addiert.' },
      ],
    },
    {
      id: 'num-1', type: 'numeric', title: 'EIRP mit Kabelverlust',
      question: 'Ein Sender mit 20 W speist über ein Kabel mit 3 dB Dämpfung eine Antenne mit 9 dBi Gewinn. Wie groß ist die EIRP?',
      answer: 80, tolerance: 0.03, unit: 'W',
      hint: 'Gesamtgewinn $9-3=6$ dB, das ist der Faktor 4.',
      explain: '$20\\,\\text{W}\\cdot4=80$ W EIRP.',
    },
    {
      id: 'num-2', type: 'numeric', title: 'EIRP mit Gewinn in dBd',
      question: 'Ein Sender mit 40 W, ein Kabel mit 2 dB Dämpfung und eine Yagi mit 7 dBd (auf den Dipol bezogen). Wie groß ist die EIRP?',
      answer: 207.6, tolerance: 0.03, unit: 'W',
      hint: 'Gesamtgewinn $7-2+2{,}15=7{,}15$ dB. Zerlege in 5 dB und 2,15 dB: Faktoren 3,16 und 1,64.',
      explain: '$40\\,\\text{W}\\cdot10^{0{,}715}=40\\cdot5{,}19\\approx208$ W. Im Kopf: $5\\,\\text{dB}+2{,}15\\,\\text{dB}$ gibt $3{,}16\\cdot1{,}64=5{,}19$; $40\\cdot5{,}19\\approx208$ W.',
    },
    {
      id: 'num-3', type: 'numeric', title: 'Erlaubte Sendeleistung',
      question: 'Eine Antenne hat 8 dBi Gewinn, die Kabelverluste sind vernachlässigbar. Welche Sendeleistung darfst du höchstens einspeisen, damit die EIRP 10 W nicht überschreitet?',
      answer: 1.58, tolerance: 0.05, unit: 'W',
      hint: '8 dB ist ungefähr Faktor 6,3 ($10^{0{,}8}$). Teile 10 W durch den Gewinnfaktor.',
      explain: '$P=\\dfrac{10\\,\\text{W}}{10^{0{,}8}}=\\dfrac{10}{6{,}31}=1{,}58$ W.',
    },
    {
      id: 'order-schritte', type: 'order', title: 'EIRP berechnen',
      prompt: 'Bringe die Schritte in eine sinnvolle Reihenfolge.',
      items: [
        'Gewinn auf den isotropen Strahler beziehen (bei dBd 2,15 dB addieren)',
        'Kabeldämpfung, Steckverbinder und Anpassgerät als Verlust in dB ansetzen',
        'Gesamtgewinn bilden: Antennengewinn minus Verluste in dB',
        'Gesamtfaktor aus der dB-Tabelle ablesen (dB-Werte zerlegen)',
        'Sendeleistung mit dem Faktor multiplizieren',
      ],
      explain: 'Bezug klären, Verluste einbeziehen, in dB addieren, Faktor bestimmen, mit der Sendeleistung multiplizieren.',
    },
    {
      id: 'match-bezug', type: 'match', title: 'Größe und Bezug',
      prompt: 'Ordne zu.',
      pairs: [
        ['ERP', 'bezogen auf den Halbwellendipol'],
        ['EIRP', 'bezogen auf den isotropen Strahler'],
        ['dBd', 'Antennengewinn bezogen auf den Dipol'],
        ['dBi', 'Antennengewinn bezogen auf den Kugelstrahler'],
      ],
    },
    {
      id: 'recall-erp', type: 'recall', title: 'In eigenen Worten',
      prompt: 'Warum ist die EIRP einer Anlage größer als ihre ERP, und wie rechnest du von der Sendeleistung am Gerät auf die EIRP, wenn Kabel und Gewinn in dB gegeben sind?',
      answer: 'Der Halbwellendipol strahlt selbst schon 2,15 dB (Faktor 1,64) stärker als der isotrope Strahler; deshalb ist die auf den Kugelstrahler bezogene EIRP um diesen Faktor größer als die auf den Dipol bezogene ERP. Rechnung: Gewinn in dBi (bei dBd 2,15 dB addieren) minus Kabeldämpfung ergibt den Gesamtfaktor in dB; daraus den Faktor bestimmen und mit der Sendeleistung multiplizieren: P_EIRP = P_Sender · 10^((g_i − a)/10 dB).',
      cards: ['er-eirp-erp', 'er-formel'],
    },
    {
      id: 'wrap', type: 'callout', tone: 'fact', title: 'Zum Mitnehmen',
      md: `ERP: Dipol-Bezug. EIRP: Kugel-Bezug, EIRP = ERP · 1,64. Rechnen heißt in dB addieren: Antennengewinn plus (negativ) Kabeldämpfung, gegebenenfalls plus 2,15 dB, dann den Faktor auf die Sendeleistung anwenden.[^bnetza-fragenkatalog]`,
    },
  ],
  cards: [
    { id: 'er-erp', front: 'ERP: Definition', back: 'Effektive Strahlungsleistung: von einer Antenne abgestrahlte Leistung, bezogen auf einen Halbwellendipol.' },
    { id: 'er-eirp', front: 'EIRP: Definition', back: 'Äquivalente isotrope Strahlungsleistung: von einer Antenne abgestrahlte Leistung, bezogen auf einen isotropen Strahler. = zugeführte Leistung mal Gewinn (bezogen auf Isotrop).' },
    { id: 'er-eirp-erp', front: 'Umrechnung ERP ↔ EIRP', back: '$P_\\mathrm{EIRP}=P_\\mathrm{ERP}\\cdot1{,}64$ bzw. EIRP = ERP + 2,15 dB.' },
    { id: 'er-formel', front: 'Formel EIRP mit Gewinn in dBi und Kabeldämpfung a', back: '$P_\\mathrm{EIRP}=P_\\mathrm{Sender}\\cdot10^{(g_i-a)/10\\,\\text{dB}}$; mit dBd: $g_d-a+2{,}15$ dB im Exponenten.' },
    { id: 'er-minus', front: 'Rechenzeichen bei der EIRP', back: 'Verluste subtrahieren (bzw. in dB abziehen), Gewinnfaktor multiplizieren (bzw. in dB addieren).' },
    { id: 'er-tab', front: 'dB-Faktoren: 3, 6, 10, 20 dB', back: '2, 4, 10, 100 (und 1,5 dB = 1,41; 2,15 dB = 1,64; 5 dB = 3,16).' },
    { id: 'er-kabel', front: 'Dipol mit 2,15 dB Kabeldämpfung', back: 'Gewinn und Dämpfung heben sich auf: EIRP = Sendeleistung.' },
    { id: 'er-26', front: '26 dBi: Faktor?', back: '20 dB + 6 dB = 100 · 4 = 400.' },
    { id: 'er-10w', front: 'Grenze 10 W EIRP', back: 'Unterhalb entfällt die Anzeige einer ortsfesten Amateurfunkanlage nach § 9 BEMFV. Mit 5,15 dBi (Faktor 3,28) sind das etwa 3 W Sendeleistung.' },
    { id: 'er-haupt', front: 'Warum Hauptstrahlrichtung?', back: 'Grenzwerte müssen in jede Richtung eingehalten werden; ist es in der Richtung der stärksten Abstrahlung der Fall, dann auch sonst.' },
  ],
};
