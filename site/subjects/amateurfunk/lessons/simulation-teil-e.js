export default {
  id: 'simulation-teil-e',
  title: 'Simulation Teil E: Technik (Klasse E)',
  summary: 'Teil E unter Prüfungsbedingungen: 25 Fragen aus dem E-Technik-Pool (463), 45 Minuten, 19 richtig. Mit Formel-Fundstellen, Strategie für Rechen- und Bildfragen, Zeitplan und Merkliste.',
  minutes: 45,
  goals: [
    'Den Aufbau von Teil E kennen und die Formelsammlung als Werkzeug einsetzen (Fundstelle und Notation)',
    'Die typischen Rechnungen (Blindwiderstand, Spiegelfrequenz, Stehwellenverhältnis, EIRP) sicher lösen',
    'Einen Zeitplan für 45 Minuten mit vielen Rechen- und Bildaufgaben aufstellen und die Teil-Simulation durchführen',
    'Das Ergebnis auswerten und die schwachen Themen gezielt wiederholen',
  ],
  needs: ['formelsammlung-und-taschenrechner'],
  blocks: [
    {
      id: 'ablauf', type: 'text', title: 'So läuft Teil E',
      md: String.raw`
Teil E („Technische Kenntnisse Klasse E“) ist der größte Teil des Katalogs (viel [Spule](wiki:Spule (Elektrotechnik)|Electromagnetic coil), [Kondensator](wiki:Kondensator (Elektrotechnik)|Capacitor), [Schwingkreis](wiki:Schwingkreis|LC circuit) und [Transformator](wiki:Transformator|Transformer)): **463** Fragen, 25 davon in der Prüfung. Form wie bei den anderen Teilen: **45 Minuten**, **19 Punkte** zum Bestehen, ab **17** Punkten bei genau einem verfehlten Teil mündliche Nachprüfung möglich. Wie in Teil N liegen **Formelsammlung** und **Entwurfspapier** aus, dazu der **Taschenrechner** (wissenschaftlich, nicht programmierbar, ohne Textspeicher). Wer bereits die Klasse N besitzt, macht nur diesen Teil.[^bnetza-pruefungsordnung][^bnetza-fragenkatalog]

**Jetzt starten:** [Prüfungssimulation](#/s/amateurfunk/exam), bei Teil E **„nur diesen Teil unter Prüfungsbedingungen“**. Dazu der [Übungsmodus für den ganzen Teil E](#/s/amateurfunk/practice/part:e) und die [Fehler der letzten Prüfung](#/s/amateurfunk/practice/last).

<table>
<tr><th>Thema</th><th>Fragen</th></tr>
<tr><td>Mathematische Grundkenntnisse</td><td>24</td></tr>
<tr><td>Elektrizität, Elektromagnetismus</td><td>52</td></tr>
<tr><td>Bauteile</td><td><b>72</b></td></tr>
<tr><td>Schaltungen</td><td>54</td></tr>
<tr><td>Modulation und Übertragung</td><td>29</td></tr>
<tr><td>Sender und Empfänger</td><td>44</td></tr>
<tr><td>Antennen und Leitungen</td><td><b>72</b></td></tr>
<tr><td>Wellenausbreitung, Ionosphäre</td><td>31</td></tr>
<tr><td>Messungen</td><td>23</td></tr>
<tr><td>Störemissionen, Störfestigkeit</td><td>43</td></tr>
<tr><td>EMV, Personen- und Sachschutz</td><td>19</td></tr>
</table>

Die Themen mit den meisten Fragen sind **Bauteile** und **Antennen/Leitungen**, aber alle elf Themen kommen vor.`,
    },
    {
      id: 'strategie', type: 'text', title: 'Strategie: Formel suchen, Notation lesen, Schaltbild deuten',
      md: String.raw`
Teil E verlangt weniger Auswendiglernen als Teil N, dafür mehr **Verstehen**:

1. **Die Formelsammlung ist dein Werkzeug.** Du musst Formeln nicht im Kopf haben, sondern ihre **Fundstelle** (Abschnitt: Induktivität/Spule, Kapazität/Kondensator, Filter ([Tiefpass](wiki:Tiefpass|Low-pass filter)), Schwingkreis, ZF und Spiegelfrequenzen, Pegel, Strahlungsleistung, Wellenlänge, Reflexion ([Stehwellenverhältnis](wiki:Stehwellenverhältnis|Standing wave ratio)), Rauschen, Modulation ([Amplitudenmodulation](wiki:Amplitudenmodulation|Amplitude modulation) und [Frequenzmodulation](wiki:Frequenzmodulation|Frequency modulation))) und ihre **Notation** ($X_\mathrm{L}$, $f_\mathrm{ZF}$, $s$, $|r|$, $g_\mathrm{d}$ …).[^bnetza-formelsammlung] Wer in unter 20 Sekunden den richtigen Abschnitt aufschlägt, spart pro Rechenaufgabe eine halbe Minute.
2. **Viele Fragen haben ein Schaltbild.** Erst das Bild lesen: Bauteile benennen, Signalweg verfolgen (Eingang → Ausgang), Gleich- und Wechselanteile trennen. Dann erst die Antworten ansehen.
3. **Zwei Durchgänge:** Erst alle Fragen, die du *sicher* weißt, dann die Rechen- und Schaltbildaufgaben. Rechne **mit Entwurfspapier**, nie im Kopf allein.
4. **Plausibilität statt Perfektion:** Die Antworten liegen oft um Zehnerpotenzen auseinander. Ein Überschlag (Größenordnung, Einheit, „größer oder kleiner als …“) genügt häufig zum Ausschließen.
5. **Richtung beachten:** Bei $f_\mathrm{ZF}=|f_\mathrm{E}-f_\mathrm{OSZ}|$ und der Spiegelfrequenz ([Überlagerungsempfänger](wiki:Überlagerungsempfänger|Superheterodyne receiver)) kommt es darauf an, ob der Oszillator über oder unter der Eingangsfrequenz liegt. Bei dB-Rechnungen: Leistung ($10\cdot\log$) oder Spannung ($20\cdot\log$).`,
    },
    {
      id: 'demo-zeit', type: 'viz', viz: 'zeit-planer', title: 'Demo: Dein Zeitplan für Teil E',
      intro: 'In Teil E sind viele Fragen Rechen- oder Bildaufgaben. Schätze ihre Anzahl und die Zeit pro Aufgabe. Die Voreinstellungen sind Übungsannahmen, keine amtlichen Angaben.',
      params: { part: 'e' },
      task: 'Sieh einmal einen Plan, der die **45 Minuten sprengt** (z. B. viele lange Rechenaufgaben), und baue dann einen, der **mit mindestens 5 Minuten Puffer** passt.',
    },
    {
      id: 'calc-xl', type: 'numeric', title: 'Rechenaufgabe: Blindwiderstand der Spule',
      question: String.raw`Eine Spule mit $L = 2{,}2\,\mu\text{H}$ wird bei $f = 7{,}1\,\text{MHz}$ betrieben. Welchen induktiven Blindwiderstand $X_\mathrm{L}$ hat sie? ($X_\mathrm{L}=\omega\cdot L$, $\omega=2\pi f$)`,
      answer: 98.2, tolerance: 1, unit: 'Ω',
      hint: 'Mit der EE-Taste: 2 × π × 7,1 EE 6 × 2,2 EE −6.',
      explain: String.raw`$X_\mathrm{L}=2\pi\cdot7{,}1\cdot10^{6}\,\text{Hz}\cdot2{,}2\cdot10^{-6}\,\text{H}\approx 98{,}2\,\Omega$. Plausibel: Bei 7 MHz haben wenige µH schon einen Blindwiderstand von rund 100 Ω.`,
    },
    {
      id: 'calc-spiegel', type: 'numeric', title: 'Rechenaufgabe: Spiegelfrequenz',
      question: String.raw`Ein Superhet hat $f_\mathrm{ZF}=455\,\text{kHz}$ und empfängt $f_\mathrm{E}=14{,}2\,\text{MHz}$. Der Oszillator schwingt **oberhalb** der Eingangsfrequenz ($f_\mathrm{E}<f_\mathrm{OSZ}$). Welche Spiegelfrequenz $f_\mathrm{S}$ ist zu erwarten?`,
      answer: 15.11, tolerance: 0.02, unit: 'MHz',
      hint: String.raw`Für $f_\mathrm{E}<f_\mathrm{OSZ}$ gilt $f_\mathrm{S}=f_\mathrm{E}+2\cdot f_\mathrm{ZF}$.`,
      explain: String.raw`$f_\mathrm{S}=14{,}2\,\text{MHz}+2\cdot0{,}455\,\text{MHz}=15{,}11\,\text{MHz}$. Der Oszillator läuft bei $14{,}655\,\text{MHz}$; die Spiegelfrequenz liegt um $f_\mathrm{ZF}$ auf der anderen Seite des Oszillators und muss vor dem Mischer unterdrückt werden.`,
    },
    {
      id: 'calc-swr', type: 'numeric', title: 'Rechenaufgabe: Stehwellenverhältnis',
      question: String.raw`Der Reflexionsfaktor einer Antennenanlage beträgt $|r| = 0{,}2$. Wie groß ist das Stehwellenverhältnis $s$?`,
      answer: 1.5, tolerance: 0.02, unit: '',
      hint: String.raw`$s=\dfrac{1+|r|}{1-|r|}$.`,
      explain: String.raw`$s=\dfrac{1+0{,}2}{1-0{,}2}=\dfrac{1{,}2}{0{,}8}=1{,}5$. Die zurücklaufende Leistung ist $P_\mathrm{r}=P_\mathrm{v}\cdot|r|^2=4\,\%$ der vorlaufenden.`,
    },
    {
      id: 'quiz-tastatur', type: 'quiz', title: 'Fehler in der Tastenfolge',
      question: String.raw`Du berechnest $f_0 = \dfrac{1}{2\pi\sqrt{L\cdot C}}$ mit $L=2{,}2\,\mu\text{H}$, $C=470\,\text{pF}$. Welche Eingabe ist richtig?`,
      options: [
        { text: String.raw`1 ÷ ( 2 × π × √( 2,2 EE −6 × 470 EE −12 ) )`, correct: true, why: 'Der ganze Nenner steht in Klammern, die Wurzel enthält das Produkt L·C in Grundeinheiten (H und F).' },
        { text: String.raw`1 ÷ 2 × π × √( 2,2 EE −6 × 470 EE −12 )`, why: 'Ohne Klammer um den Nenner wird nur durch 2 geteilt und mit π multipliziert.' },
        { text: String.raw`1 ÷ ( 2 × π × √( 2,2 EE 6 × 470 EE 12 ) )`, why: 'Vorzeichen der Exponenten vergessen: Aus µH und pF sind Zehnerpotenzen mit negativem Exponenten.' },
        { text: String.raw`1 ÷ ( 2 × π × ( 2,2 EE −6 × 470 EE −12 ) )`, why: 'Die Wurzel fehlt.' },
      ],
    },
    {
      id: 'match-formel', type: 'match', title: 'Gesucht → Formelsammlung',
      prompt: 'In welchem Abschnitt suchst du?',
      pairs: [
        ['Grenzfrequenz eines RC-Tiefpasses', 'Filter'],
        ['Resonanzfrequenz und Güte eines Schwingkreises', 'Schwingkreis'],
        ['Zwischenfrequenz und Spiegelfrequenz', 'ZF und Spiegelfrequenzen'],
        ['Reflexionsfaktor und Stehwellenverhältnis', 'Reflexion'],
        ['Feldstärke im Fernfeld und EIRP', 'Strahlungsleistung und Gewinn von Antennen'],
        ['Bandbreite eines FM-Signals nach Carson', 'Frequenzmodulation'],
      ],
    },
    {
      id: 'recall-auswertung', type: 'recall', title: 'Nach der Simulation',
      prompt: 'Mache jetzt die Simulation von Teil E. Trage danach ein: Punktzahl, welche der elf Themen die meisten Fehler brachten, ob Rechnen oder Bildfragen schwieriger waren, und was du änderst.',
      answer: 'Beispielantwort: „19 von 25, knapp bestanden. Fehler bei Antennen und Leitungen (3) und Störfestigkeit (2), Rechenaufgaben meist richtig, Schaltbilder zu schnell gelesen. Ich übe Themenmodus Antennen und Leitungen, erst Bild lesen, dann Antworten, und mache zwei Tage später die Simulation noch einmal.“ Wichtig: nach Thema und Fehlerart (Wissen, Rechnen, Lesen) sortieren.',
      cards: ['se-xl', 'se-f0'],
    },
  ],
  cards: [
    { id: 'se-xl', front: 'Blindwiderstände von Spule und Kondensator?', back: String.raw`$X_\mathrm{L}=\omega\cdot L$, $X_\mathrm{C}=\dfrac{1}{\omega\cdot C}$ mit $\omega=2\pi f$. Scheinwiderstand $Z=\sqrt{R^2+X^2}$.` },
    { id: 'se-f0', front: 'Schwingkreis: Resonanzfrequenz und Güte?', back: String.raw`$f_0=\dfrac{1}{2\pi\sqrt{L\cdot C}}$, bei Resonanz $X_\mathrm{C}=X_\mathrm{L}$. Güte $Q=\dfrac{f_0}{B}$; Reihenkreis $Q=\dfrac{X_\mathrm{L}}{R_\mathrm{s}}$, Parallelkreis $Q=\dfrac{R_\mathrm{p}}{X_\mathrm{L}}$.` },
    { id: 'se-filter', front: 'Grenzfrequenz von RC- und RL-Filter?', back: String.raw`RC: $f_\mathrm{g}=\dfrac{1}{2\pi R C}$. RL: $f_\mathrm{g}=\dfrac{R}{2\pi L}$. Bei $f_\mathrm{g}$ sind es −3 dB.` },
    { id: 'se-trafo', front: 'Übersetzungsverhältnis des Transformators?', back: String.raw`$\ddot u=\dfrac{N_\mathrm{P}}{N_\mathrm{S}}=\dfrac{U_\mathrm{P}}{U_\mathrm{S}}=\dfrac{I_\mathrm{S}}{I_\mathrm{P}}=\sqrt{\dfrac{Z_\mathrm{P}}{Z_\mathrm{S}}}$.` },
    { id: 'se-zf', front: 'Zwischen- und Spiegelfrequenz?', back: String.raw`$f_\mathrm{ZF}=|f_\mathrm{E}-f_\mathrm{OSZ}|$. Spiegel: $f_\mathrm{S}=f_\mathrm{E}+2f_\mathrm{ZF}$ (wenn $f_\mathrm{E}<f_\mathrm{OSZ}$), $f_\mathrm{S}=f_\mathrm{E}-2f_\mathrm{ZF}$ (wenn $f_\mathrm{E}>f_\mathrm{OSZ}$).` },
    { id: 'se-swr', front: 'SWR und Reflexionsfaktor?', back: String.raw`$s=\dfrac{1+|r|}{1-|r|}$, $|r|=\dfrac{s-1}{s+1}=\sqrt{\dfrac{P_\mathrm{r}}{P_\mathrm{v}}}$. $P_\mathrm{r}=P_\mathrm{v}\cdot|r|^2$.` },
    { id: 'se-pegel', front: 'Pegel, Verstärkung, Dämpfung?', back: String.raw`$p=10\log\dfrac{P}{1\,\text{mW}}$ dBm. Gewinn $g=10\log\dfrac{P_2}{P_1}$ dB, Dämpfung $a=10\log\dfrac{P_1}{P_2}$ dB; mit Spannungen $20\log$.` },
    { id: 'se-eirp', front: 'ERP, EIRP und Antennengewinn?', back: String.raw`$P_\mathrm{ERP}=P_\mathrm{S}\cdot10^{\frac{g_\mathrm{d}-a}{10\,\mathrm{dB}}}$, $P_\mathrm{EIRP}=P_\mathrm{ERP}\cdot1{,}64$; $g_\mathrm{i}=g_\mathrm{d}+2{,}15\,\text{dB}$.` },
    { id: 'se-feld', front: 'Feldstärke im Fernfeld, Gültigkeit?', back: String.raw`$E=\dfrac{\sqrt{30\,\Omega\cdot P_\mathrm{EIRP}}}{d}$, gilt für $d>\dfrac{\lambda}{2\pi}$.` },
    { id: 'se-mod', front: 'AM und FM: Modulationsgrad, Bandbreite?', back: String.raw`AM: $m=\dfrac{\hat U_\mathrm{mod}}{\hat U_\mathrm{T}}$, $B=2\cdot f_\mathrm{mod\,max}$. FM: $m=\dfrac{\Delta f_\mathrm{T}}{f_\mathrm{mod}}$, Carson $B\approx2(\Delta f_\mathrm{T}+f_\mathrm{mod\,max})$.` },
    { id: 'se-leitung', front: 'Verkürzungsfaktor, Koax-Wellenwiderstand, λ/4-Transformator?', back: String.raw`$k_\mathrm{v}=\dfrac{1}{\sqrt{\epsilon_\mathrm{r}}}$. Koax: $Z=\dfrac{60\,\Omega}{\sqrt{\epsilon_\mathrm{r}}}\ln\dfrac{D}{d}$. λ/4-Transformator: $Z=\sqrt{Z_\mathrm{E}\cdot Z_\mathrm{A}}$.` },
    { id: 'se-vorgehen', front: 'Vorgehen in Teil E?', back: 'Sichere Fragen zuerst. Dann Rechnen mit Entwurfspapier: **Formel suchen, Notation prüfen, Grundeinheiten, Plausibilität.** Schaltbild erst lesen, dann Antworten ansehen.' },
  ],
};
