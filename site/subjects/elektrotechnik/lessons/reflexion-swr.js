export default {
  id: 'reflexion-swr',
  title: 'Reflexion, Stehwellenverhältnis, Anpassung',
  summary: 'Was passiert, wenn eine Welle auf eine fehlangepasste Last trifft: Reflexionsfaktor r, Stehwellenverhältnis s = (1+|r|)/(1−|r|), reflektierte Leistung, Rückflussdämpfung, λ/4-Transformator und die Rolle des SWR-Meters.',
  minutes: 30,
  needs: ['leitungen-wellenwiderstand'],
  goals: [
    'Erklären, warum eine Fehlanpassung ($R_L\\neq Z_0$) die Welle teilweise zurückwirft, und den [[reflexionsfaktor|Reflexionsfaktor]] $r=\\tfrac{R_L-Z_0}{R_L+Z_0}$ berechnen',
    'Das [[stehwellenverhaeltnis|Stehwellenverhältnis]] $s=\\tfrac{1+|r|}{1-|r|}$ und den Rückweg $r=\\tfrac{s-1}{s+1}$ anwenden',
    'Reflektierte und abgegebene Leistung ($P_r=P_v r^2$, $P_{ab}=P_v(1-r^2)$) sowie [[rueckflussdaempfung|Rückflussdämpfung]] bestimmen',
    'Wissen, dass Kurzschluss und Leerlauf $|r|=1$, $s=\\infty$ ergeben und ein SWR von 1 vollständige [[leistungsanpassung|Anpassung]] bedeutet',
    'Mit einem $\\lambda/4$-Transformator $Z=\\sqrt{Z_E Z_A}$ zwei Impedanzen anpassen und die Messung mit dem SWR-Meter einordnen',
  ],
  blocks: [
    {
      id: 'intuition', type: 'text', title: 'Eine Welle, die gegen die Wand läuft',
      md: String.raw`
Schlag ein Seil an einem Ende an: Die Welle läuft zur Wand. Ist das Seil dort **fest** eingespannt, kommt sie **umgekehrt** zurück (Berg wird Tal). Ist das Ende **lose** (Ring an einer Stange), kommt sie **gleichsinnig** zurück. Ist am Ende dagegen ein Dämpfer, der genau zum Seil passt, bleibt die Welle weg — keine Reflexion. Genau so verhält sich eine HF-Leitung: Die Welle sieht am Ende der Leitung die Impedanz $R_L$ und vergleicht sie mit ihrem eigenen [Wellenwiderstand](wiki:Wellenwiderstand) $Z_0$ (die [Impedanz](wiki:Elektrische Impedanz|Electrical impedance) der laufenden Welle).

- $R_L=Z_0$: **angepasst** ([Leistungsanpassung](wiki:Leistungsanpassung|Impedance matching)), die Leistung wird vollständig aufgenommen, *keine* Reflexion.
- $R_L=0$ (Kurzschluss): Spannung am Ende erzwungen null → Welle kommt mit **umgekehrtem Vorzeichen** zurück ($r=-1$).
- $R_L=\infty$ (Leerlauf): Strom am Ende erzwungen null → Welle kommt **gleichsinnig** zurück ($r=+1$).

Alles dazwischen: ein **Teil** wird reflektiert, ein Teil von der Last aufgenommen. Das hast du im Leitungslabor der letzten Lektion gesehen (Echo im TDR-Bild).`,
    },
    {
      id: 'r-formel', type: 'text', title: 'Reflexionsfaktor und Stehwellenverhältnis',
      md: String.raw`
Das Verhältnis aus rücklaufender zu hinlaufender **Spannung** heißt [Reflexionsfaktor](wiki:Reflexionsfaktor|Reflection coefficient). Für einen reellen Abschluss $R_L$ an einer Leitung mit $Z_0$ (Formelsammlung):

$$ r = \frac{R_L - Z_0}{R_L + Z_0} \qquad -1\le r\le +1 $$

Beispiele an $Z_0=50\,\Omega$: $R_L=100\,\Omega$ → $r=50/150=+0{,}333$; $R_L=25\,\Omega$ → $r=-25/75=-0{,}333$; $R_L=200\,\Omega$ → $r=150/250=0{,}6$.

Hin- und rücklaufende Welle **überlagern sich** zu einer [stehenden Welle](wiki:Stehende Welle|Standing wave): An manchen Stellen addieren sich die Spannungen ($U_\text{max}=U_v(1+|r|)$), an anderen subtrahieren sie sich ($U_\text{min}=U_v(1-|r|)$). Das Verhältnis ist das **[Stehwellenverhältnis](wiki:Stehwellenverhältnis|Standing wave ratio)** (SWR, Formelzeichen $s$):

$$ s = \frac{U_\text{max}}{U_\text{min}} = \frac{1+|r|}{1-|r|} \qquad\Longleftrightarrow\qquad |r| = \frac{s-1}{s+1} $$

$s=1$ heißt **keine** Reflexion (perfekte Anpassung), $s=\infty$ vollständige Reflexion. Beim reellen Abschluss ist einfach $s=R_L/Z_0$ bzw. $Z_0/R_L$ (der Quotient ≥ 1): 100 Ω und 25 Ω an 50 Ω ergeben *beide* $s=2$.

**Leistung:** Die Leistung ist proportional zum Spannungsquadrat, also

$$ P_r = P_v\,|r|^2 \qquad P_\text{ab} = P_v\,(1-|r|^2) $$

wobei $P_v$ die vorlaufende, $P_r$ die rücklaufende und $P_\text{ab}$ die an die Last abgegebene (netto) Leistung ist. Die **Rückflussdämpfung** $a_r=-20\lg|r|$ in [dB](wiki:Dezibel|Bel (unit)) gibt an, wie viele dB die Reflexion unter der Welle liegt (große Zahl = gute Anpassung); der **Fehlanpassungsverlust** ist $-10\lg(1-|r|^2)$ in dB.[^50ohm-swr]

**Merkhilfe:** *SWR 1,5 → 4 % reflektiert; SWR 2 → 11 %; SWR 3 → 25 %.*`,
    },
    {
      id: 'calc-r100', type: 'numeric', title: 'Reflexionsfaktor für 100 Ω',
      question: String.raw`Eine Last mit $R_L=100\,\Omega$ hängt an einer $50\,\Omega$-Leitung. Wie groß ist der Betrag des Reflexionsfaktors $|r|$ (als Zahl)?`,
      answer: 0.333, tolerance: 0.005,
      explain: String.raw`$r=(100-50)/(100+50)=50/150=0{,}333$. Das SWR ist $s=(1+0{,}333)/(1-0{,}333)=2$; reflektiert werden $r^2=11{,}1\,\%$ der Leistung, die Rückflussdämpfung ist $-20\lg0{,}333=9{,}54$ dB.`,
    },
    {
      id: 'calc-s25', type: 'numeric', title: 'SWR für 25 Ω',
      question: String.raw`Eine Last mit $R_L=25\,\Omega$ hängt an einer $50\,\Omega$-Leitung. Wie groß ist das SWR $s$?`,
      answer: 2, tolerance: 0.02,
      explain: String.raw`$r=(25-50)/(25+50)=-0{,}333$, $|r|=0{,}333$, $s=(1+0{,}333)/(1-0{,}333)=2$ — gleichermaßen $50/25=2$. Das Vorzeichen von $r$ spielt für das SWR keine Rolle.`,
    },
    {
      id: 'demo-swr', type: 'viz', viz: 'swr-lab', title: 'SWR-Labor: Last, Reflexion und λ/4-Transformator',
      intro: String.raw`Stelle die Last $R_L$ (und optional einen Blindanteil) ein und lies $|r|$, SWR, reflektierte und abgegebene Leistung ab. Oben das **Stehwellenbild** der Spannung entlang einer Wellenlänge Leitung, in der Mitte das SWR in Abhängigkeit von $R_L$. Mit dem Schalter fügst du einen $\lambda/4$-Transformator ein, dessen Impedanz $Z_T$ du wählst.`,
      params: { z0: 50, rl: 200, goalSwr: 1.5 },
      task: String.raw`Erreiche **SWR 3** (25 % reflektiert), stelle **Leerlauf oder Kurzschluss** ein ($|r|=1$) und bringe eine **200-Ω-Last** mit einem **$\lambda/4$-Transformator** auf SWR < 1,5 (Hinweis: $Z_T=\sqrt{50\,\Omega\cdot200\,\Omega}$).`,
      caption: 'U_max/U_min = SWR; die Spannungsknoten haben λ/2 Abstand. Der λ/4-Transformator verwandelt die Last Z_A in Z_T²/Z_A.',
    },
    {
      id: 'quiz-s1', type: 'quiz', title: 'Was zeigt SWR = 1?',
      question: 'Was bedeutet ein Stehwellenverhältnis von 1:1?',
      options: [
        { text: 'Vollständige Anpassung: keine reflektierte Leistung.', correct: true, why: '$s=1\\Leftrightarrow r=0$, die Last hat genau $Z_0$ (NG301, NI203).' },
        { text: 'Die Antenne strahlt optimal und hat große Reichweite.', correct: false, why: 'Das SWR sagt nur etwas über die **Anpassung**, nicht über Wirkungsgrad oder Richtwirkung: Ein 50-Ω-Dummy-Load hat auch SWR 1 und strahlt gar nicht.' },
        { text: 'Die gesamte Leistung wird reflektiert.', correct: false, why: 'Das wäre $s=\\infty$ ($|r|=1$).' },
        { text: 'Der Sender liefert keine Leistung.', correct: false, why: 'Mit $s=1$ geht die gesamte Leistung in die Last.' },
      ],
    },
    {
      id: 'quiz-kurz', type: 'quiz', title: 'Kurzschluss und Leerlauf',
      question: 'Eine Leitung ist am Ende **kurzgeschlossen** (oder offen). Welches SWR und welchen Reflexionsfaktor misst man?',
      options: [
        { text: '$s=\\infty$ und $|r|=1$ — die Welle wird vollständig reflektiert.', correct: true, why: 'Weder Kurzschluss ($R_L=0$) noch Leerlauf ($R_L=\\infty$) können Leistung aufnehmen; alles kommt zurück: $r=-1$ bzw. $+1$.' },
        { text: '$s=1$ und $r=0$.', correct: false, why: 'Das gilt nur für $R_L=Z_0$.' },
        { text: '$s=0$ und $r=\\infty$.', correct: false, why: 'Das SWR kann nie kleiner als 1 sein, und $|r|\\le1$.' },
        { text: '$s=2$ und $|r|=0{,}5$.', correct: false, why: 'Das wäre eine Last von 25 Ω bzw. 100 Ω an 50 Ω (mit $|r|=1/3$ übrigens).' },
      ],
    },
    {
      id: 'calc-s3', type: 'numeric', title: 'Reflektierte Leistung bei SWR 3',
      question: String.raw`Am Eingang einer Antennenleitung misst du ein SWR von 3 bei $100\,\text{W}$ vorlaufender Leistung. Wie groß ist die rücklaufende Leistung?`,
      answer: 25, tolerance: 0.5, unit: 'W',
      hint: String.raw`Erst $|r|=(s-1)/(s+1)$, dann $P_r=P_v\,|r|^2$.`,
      explain: String.raw`$|r|=(3-1)/(3+1)=0{,}5$, $P_r=100\,\text{W}\cdot0{,}25=25\,\text{W}$. In die Antenne gehen netto nur $75\,\text{W}$ (EG401–EG403).`,
    },
    {
      id: 'calc-200', type: 'numeric', title: 'Abgegebene Leistung bei 200 Ω',
      question: String.raw`Eine Last von $200\,\Omega$ hängt an einer $50\,\Omega$-Leitung. Wie viel Prozent der vorlaufenden Leistung werden in die Last abgegeben?`,
      answer: 64, tolerance: 0.5, unit: '%',
      hint: String.raw`$P_\text{ab}=P_v\,(1-|r|^2)$.`,
      explain: String.raw`$|r|=150/250=0{,}6$, $|r|^2=0{,}36$, $P_\text{ab}=P_v\,(1-0{,}36)=0{,}64\,P_v$. Das SWR ist 4; 36 % kommen zurück.`,
    },
    {
      id: 'calc-dipol', type: 'numeric', title: '75-Ω-Dipol an 50-Ω-Kabel',
      question: String.raw`Ein Halbwellendipol hat einen Fußpunktwiderstand von etwa $75\,\Omega$ und wird mit $50\,\Omega$-Koax gespeist. Welches SWR ergibt sich?`,
      answer: 1.5, tolerance: 0.02,
      explain: String.raw`$s=75/50=1{,}5$, $|r|=25/125=0{,}2$, reflektiert werden $4\,\%$. Das ist für die Praxis meist unkritisch (EG207).`,
    },
    {
      id: 'lambda4', type: 'text', title: 'Anpassen: der λ/4-Transformator',
      md: String.raw`
Wenn Last und Leitung nicht zusammenpassen, hilft ein **Anpassglied**. Das einfachste Beispiel steckt in der Leitung selbst: Ein **Viertelwellenstück** ($\lambda/4$ der *Leitungswellenlänge*, also mit $k_v$ gerechnet) transformiert eine Impedanz $Z_A$ in

$$ Z_E = \frac{Z_T^2}{Z_A} \qquad\Longleftrightarrow\qquad Z_T=\sqrt{Z_E\cdot Z_A} $$

Will man 50 Ω an 200 Ω anpassen, braucht man $Z_T=\sqrt{50\cdot200}=100\,\Omega$. Dann sieht der Sender $100^2/200=50\,\Omega$ — SWR 1, aber nur **bei der Frequenz, bei der das Stück genau $\lambda/4$ lang ist**. Auf dem Stück selbst bleibt das SWR hoch; angepasst ist nur die *Speiseleitung davor*.

Andere Anpassglieder: **Übertrager** (Breitband-Transformatoren, z. B. 1:4, 1:9 für Impedanzverhältnisse), **Antennentuner** ([Anpassnetzwerke](wiki:Antennentuner|Antenna tuner) aus L und C, am Sender oder an der Antenne) und **Balun** für die Symmetrierung. Ein Antennentuner am Sender macht den Sender zufrieden (der sieht 50 Ω), **ändert aber nichts** am Fehlverhältnis zwischen Kabel und Antenne — die stehenden Wellen im Kabel bleiben und verursachen Zusatzverluste.

Bei komplexen Lasten (Blindanteil) rechnet man mit dem [Smith-Diagramm](wiki:Smith-Diagramm|Smith chart) oder misst mit einem vektoriellen Netzwerkanalysator (VNA), der Impedanzen, Blindwiderstände und SWR direkt anzeigt (EI203, EI205).`,
    },
    {
      id: 'calc-lambda4', type: 'numeric', title: 'λ/4-Transformator',
      question: String.raw`Ein $\lambda/4$-Transformator soll eine Antenne mit $200\,\Omega$ an ein $50\,\Omega$-Kabel anpassen. Welchen Wellenwiderstand muss das $\lambda/4$-Stück haben?`,
      answer: 100, tolerance: 1, unit: 'Ω',
      explain: String.raw`$Z_T=\sqrt{Z_E Z_A}=\sqrt{50\cdot200}\,\Omega=\sqrt{10\,000}\,\Omega=100\,\Omega$.`,
    },
    {
      id: 'swr-meter', type: 'text', title: 'SWR messen — und was das Messgerät verrät',
      md: String.raw`
Ein **SWR-Meter** (Stehwellenmessgerät, Richtkoppler für [Koaxialkabel](wiki:Koaxialkabel|Coaxial cable) mit zwei Anzeigen für Vor- und Rücklauf) wird **in die Leitung eingeschleift**. Auf der einen Seite hängt der Transceiver, auf der anderen die Antenne bzw. das Antennenkabel (NI202). Man kann *im Sendebetrieb* messen — mit einer SWR-Messbrücke (EI403).

**Wo einschleifen?** Zwischen **Antennenkabel und Antenne** erhält man die genauste Aussage über die **Antenne** (EI404). Am Senderausgang misst man dagegen die Anpassung des **Gesamtsystems** — und hier „verschönert“ die **Kabeldämpfung** das SWR, weil die rücklaufende Welle auf dem Weg zurück zusätzlich gedämpft wird. Ein SWR-Meter am Sender zeigt bei 20 m Koax auf 2 m also einen besseren Wert als an der Antenne.

Das SWR ist ein Maß für die **Anpassung**, nicht für die Güte der Antenne: Ein Dummy Load hat SWR 1, strahlt aber nichts; eine Antenne mit SWR 2 kann dennoch gut strahlen. Als Daumenregel liegt der Senderschutz bei etwa **SWR ≤ 2** (moderne Sender regeln die Leistung automatisch ab).`,
    },
    {
      id: 'video-swr', type: 'video', youtube: '0Y-GSJ7Vpqc', label: 'Amateurfunk Basics - SWR Stehwellenverhältnis - Was ist das?', channel: 'DL2YMR', minutes: 17,
      why: 'Ausführliche Erklärung des Stehwellenverhältnisses aus Amateurfunk-Sicht (ca. 17 Min.) — passt gut nach der Demo.',
    },
    {
      id: 'match-swr', type: 'match', title: 'Last und Reflexion',
      prompt: 'Was gehört zusammen?',
      pairs: [
        ['$R_L = Z_0$', 'Anpassung, $|r|=0$, SWR 1'],
        ['Kurzschluss', '$r=-1$, SWR ∞'],
        ['Leerlauf', '$r=+1$, SWR ∞'],
        ['SWR 3', '$|r|=0{,}5$, 25 % reflektiert'],
      ],
    },
    {
      id: 'warning-swr', type: 'callout', tone: 'warning', title: 'Typische Fehlvorstellungen',
      md: String.raw`
- „**Ein SWR von 2 verliert die Hälfte der Leistung.**“ — Nein: nur etwa **11 %** werden reflektiert ($|r|=1/3$, $P_r=P_v/9$). Der Fehlanpassungsverlust beträgt rund 0,5 dB.
- „**SWR 1:1 heißt: gute Antenne.**“ — Es heißt nur: gute Anpassung. Ein Dummy Load oder ein Kabelstück mit Last hat auch 1:1. Strahlung, Gewinn und Wirkungsgrad sind eine eigene Frage.
- „**Reflektierte Leistung ist einfach weg.**“ — Sie läuft zum Sender zurück, wird dort teilweise absorbiert (Hitze in der Endstufe) und erzeugt auf dem Weg weitere Verluste im Kabel; nur der Rest wird gar nicht abgestrahlt.
- „**Das SWR hängt von der Kabellänge ab.**“ — Das *Verhältnis* am Ort der Last nicht; verlustbehaftete Kabel zeigen am Eingang ein *besseres* SWR als an der Last.`,
    },
    {
      id: 'deep-trafo', type: 'callout', tone: 'deep', title: 'Warum transformiert ein λ/4-Stück?',
      md: String.raw`
Auf der Leitung dreht der Reflexionsfaktor beim Laufen zum Sender hin um den Winkel $2\beta d=4\pi d/\lambda$ — nach $\lambda/4$ also um $180^\circ$. Spannungsmaximum und -minimum tauschen die Plätze: ein **hochohmiger** Abschluss erscheint am Eingang **niederohmig** und umgekehrt, und zwar genau so, dass $Z_E\cdot Z_A=Z_T^2$ gilt. Bei $\lambda/2$ dreht sich der Phasenwinkel um $360^\circ$: die Last erscheint **unverändert** am Eingang (Leitungsstück ändert Impedanz nicht). Die Demo zeigt genau das im Stehwellenbild: Die Lage der Maxima verschiebt sich, je nach Phase von $r$.`,
    },
    {
      id: 'mission-swr', type: 'callout', tone: 'mission', title: 'Prüfung & Funkpraxis',
      md: String.raw`
- **Prüfungsbezug:** Antenne am besten angepasst bei SWR 1 (NG301); SWR-Meter ablesen (NG302); SWR-Meter einschleifen (NI202, NI203, EI401–EI405); bei SWR 3 kommt ein Viertel der Leistung zurück (EG401–EG403); Netzwerkanalysator für Impedanz und SWR (EI203); Rückwirkungen auf dem Kabel, Mantelwellen (EG404–EG406, EG408); Fußpunktimpedanz des Dipols ≈ 75 Ω (EG207).
- **Praxis:** Sendet man in eine Antenne mit SWR 3, gehen von 100 W nur 75 W in die Antenne — das ist **−1,25 dB**, kaum hörbar. Wichtiger ist, dass die Endstufe die Rückleistung verträgt. Beim Aufbau: erst Antenne und Kabel mit dem SWR-Meter bei **geringer** Leistung prüfen, dann mit voller Leistung senden.
- **Rechentipp:** Formelsammlung: $r$, $s$, $P_r$ und $P_{ab}$ auswendig anwendbar. Umkehr: $|r|=(s-1)/(s+1)$.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: String.raw`
<table><tr><th>Deutsch</th><th>English</th><th>Notation</th></tr>
<tr><td>Reflexionsfaktor</td><td>reflection coefficient</td><td>$r$ (auch $\Gamma$)</td></tr>
<tr><td>Stehwellenverhältnis</td><td>standing wave ratio (SWR, VSWR)</td><td>$s$</td></tr>
<tr><td>vorlaufende / rücklaufende Leistung</td><td>forward / reflected power</td><td>$P_v$, $P_r$</td></tr>
<tr><td>Anpassung, Fehlanpassung</td><td>matching, mismatch</td><td></td></tr>
<tr><td>Rückflussdämpfung</td><td>return loss</td><td>$a_r=-20\lg|r|$</td></tr>
<tr><td>Viertelwellentransformator</td><td>quarter-wave transformer</td><td>$Z_T=\sqrt{Z_E Z_A}$</td></tr>
<tr><td>Antennentuner / Anpassgerät</td><td>antenna tuner</td><td></td></tr>
<tr><td>Kurzschluss / Leerlauf</td><td>short circuit / open circuit</td><td></td></tr></table>`,
    },
    {
      id: 'recall-reflektiert', type: 'recall', title: 'Erkläre es mit eigenen Worten',
      prompt: 'Wohin geht die reflektierte Leistung bei einer Fehlanpassung? Und warum ist ein SWR von 2 noch kein Drama?',
      answer: 'Die reflektierte Welle läuft zurück zum Sender; dort wird sie teilweise in der Endstufe absorbiert (Wärme) oder erneut reflektiert, auf dem Weg entstehen Zusatzverluste im Kabel. Nur der nicht reflektierte Teil geht in die Antenne und wird abgestrahlt. Bei SWR 2 ist $|r|=1/3$, also werden nur $|r|^2=11\\,\\%$ der Leistung zurückgeworfen: Der Verlust beträgt rund 0,5 dB, praktisch nicht hörbar.',
      hints: ['Wie viele Prozent der Leistung sind $|r|^2$ bei $s=2$?', 'Wo wird Leistung in Wärme umgesetzt?'],
      cards: ['pr-formel', 'swr-prozent'],
    },
  ],
  cards: [
    { id: 'r-formel-k', front: 'Reflexionsfaktor für reellen Abschluss $R_L$ an $Z_0$?', back: '$r = \\dfrac{R_L - Z_0}{R_L + Z_0}$' },
    { id: 'swr-formel', front: 'Stehwellenverhältnis aus $r$?', back: '$s = \\dfrac{1+|r|}{1-|r|}$; umgekehrt $|r| = \\dfrac{s-1}{s+1}$.' },
    { id: 'pr-formel', front: 'Reflektierte und abgegebene Leistung?', back: '$P_r = P_v\\,|r|^2$ und $P_{ab} = P_v\\,(1-|r|^2)$.' },
    { id: 'swr-prozent', front: 'Wie viel Prozent werden bei SWR 2 und SWR 3 reflektiert?', back: 'SWR 2: $|r|=1/3$ → 11 %. SWR 3: $|r|=1/2$ → 25 %.' },
    { id: 'kurz-leer', front: 'Reflexionsfaktor bei Kurzschluss und Leerlauf?', back: 'Kurzschluss: $r=-1$; Leerlauf: $r=+1$; jeweils $s=\\infty$, vollständige Reflexion.' },
    { id: 'swr1', front: 'Was bedeutet SWR 1?', back: 'Vollständige Anpassung, $R_L=Z_0$, $r=0$, keine Reflexion. Sagt nichts über die Strahlungsgüte der Antenne.' },
    { id: 'rueckfluss', front: 'Rückflussdämpfung?', back: '$a_r=-20\\lg|r|$ in dB; je größer, desto besser die Anpassung. $|r|=1/3$ → 9,5 dB.' },
    { id: 'fehlanp-verlust', front: 'Fehlanpassungsverlust?', back: '$-10\\lg(1-|r|^2)$ in dB. Bei SWR 2: 0,51 dB; bei SWR 3: 1,25 dB.' },
    { id: 'lambda4-trafo', front: 'λ/4-Transformator: Wellenwiderstand des Stücks?', back: '$Z_T=\\sqrt{Z_E\\cdot Z_A}$; 50 Ω auf 200 Ω → 100 Ω. Gilt nur bei der Frequenz, bei der das Stück $\\lambda/4$ lang ist.' },
    { id: 'swr-meter-pos', front: 'Wo schleift man das SWR-Meter ein, um die Antenne zu beurteilen?', back: 'Zwischen Antennenkabel und Antenne. Am Senderausgang beschönigt die Kabeldämpfung das SWR.' },
    { id: 'tuner', front: 'Was ändert ein Antennentuner am Sender?', back: 'Er passt den Senderausgang an (50 Ω); die Fehlanpassung zwischen Kabel und Antenne bleibt, stehende Wellen im Kabel auch.' },
  ],
};
