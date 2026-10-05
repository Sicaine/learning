export default {
  id: 'signalformen-effektivwert',
  title: 'Rechteck, Dreieck, PWM, Mittelwert und Effektivwert',
  summary: 'Nicht jedes Signal ist ein Sinus: Mittelwert, Gleichrichtwert und Effektivwert von Rechteck, Dreieck und PWM — und warum ein falsches Multimeter lügt.',
  minutes: 25,
  needs: ['sinus-wechselspannung'],
  goals: [
    '[[rechteckschwingung|Rechteck]]-, [[dreieckschwingung|Dreieck]]- und PWM-Signale mit [[tastverhaeltnis|Tastverhältnis]] und [[gleichanteil|Gleichanteil]] beschreiben',
    'Mittelwert, [[gleichrichtwert|Gleichrichtwert]] und [[effektivwert|Effektivwert]] unterscheiden und für einfache Formen berechnen',
    '[[formfaktor|Formfaktor]] ($1{,}11$ beim Sinus) und [[crestfaktor|Scheitelfaktor]] ($\\sqrt2$) erklären',
    'Verstehen, warum ein auf Sinus geeichtes Mittelwert-Multimeter bei anderen Formen falsch anzeigt und wozu True-RMS gut ist',
  ],
  blocks: [
    {
      id: 'intuition', type: 'text', title: 'Wärme zählt, nicht die Form',
      md: String.raw`
Ein Sinus ist nur eine von vielen Signalformen. Ein [Mikrocontroller](wiki:Mikrocontroller|Microcontroller) liefert [Rechtecke](wiki:Rechteckschwingung|Square wave (waveform)), ein [Funktionsgenerator](wiki:Funktionsgenerator|Function generator) auch [Dreieck](wiki:Dreieckschwingung|Triangle wave) und [Sägezahn](wiki:Sägezahnschwingung|Sawtooth wave), ein [Dimmer](wiki:Dimmer|Dimmer) oder ein [Schaltnetzteil](wiki:Schaltnetzteil|Switched-mode power supply) zerhackt die Spannung mit [Pulsweitenmodulation](wiki:Pulsweitenmodulation|Pulse-width modulation) (PWM). Immer gilt dieselbe Frage: **Wie viel Wärme macht das Signal im Widerstand?** Genau das beantwortet der [[effektivwert|Effektivwert]] ([Effektivwert](wiki:Effektivwert|Root mean square)) — für *jede* Form, nicht nur für den Sinus:

$$ U_\text{eff} = \sqrt{\overline{u^2}} = \sqrt{\frac1T\int_0^T u(t)^2\,\mathrm dt} $$

In Worten: erst quadrieren, dann über eine Periode **mitteln**, dann die Wurzel ziehen. Das Integral musst du nicht lösen können — wichtig ist die Idee. Daneben gibt es zwei weitere Kenngrößen:

- **Mittelwert** (arithmetisch) $\bar u$ — der [[gleichanteil|Gleichanteil]]: was ein Drehspulmessgerät in Gleichspannungsstellung zeigt. Beim symmetrischen Sinus: null.
- **Gleichrichtwert** $|\bar u|$ — der Mittelwert des **Betrags** (alle Halbwellen positiv gemacht). Er ist die Grundlage billiger Wechselspannungs-Multimeter.[^wp-effektivwert]`,
    },
    {
      id: 'pwm', type: 'text', title: 'Rechteck und PWM: Tastverhältnis',
      md: String.raw`
Ein Rechtecksignal, das zwischen 0 und $\hat U$ umschaltet, ist nur während des Anteils $D$ der Periode „an". Dieses Verhältnis heißt [[tastverhaeltnis|Tastverhältnis]] ([Tastverhältnis](wiki:Tastverhältnis|Duty cycle)), $D = t_\text{an}/T$ (0 … 1 bzw. 0 … 100 %). Dann gilt:

$$ \bar u = \hat U\cdot D \qquad\qquad U_\text{eff} = \hat U\cdot\sqrt{D} $$

Der Mittelwert wächst **linear** mit $D$, der Effektivwert mit der **Wurzel**: Bei $D = 25\,\%$ ist $\bar u = 0{,}25\,\hat U$, aber $U_\text{eff} = 0{,}5\,\hat U$. Beispiel mit $\hat U = 10$ V und $D = 20\,\%$: $\bar u = 2$ V (so viel zeigt ein Gleichspannungs-Voltmeter), $U_\text{eff} = 10\sqrt{0{,}2} = 4{,}47$ V (so viel Wärme macht der Widerstand). Ein **symmetrisches** Rechteck $\pm\hat U$ hat dagegen $U_\text{eff} = \hat U$ und den Mittelwert null.

Deshalb dimmt PWM eine LED effizient: Die LED sieht im Mittel $D\cdot$ Strom, der Transistor dazu ist entweder ganz an (kaum Spannung) oder ganz aus (kein Strom) — wenig Verlust.`,
    },
    {
      id: 'viz-wave', type: 'viz', viz: 'waveform-lab', title: 'Signal-Labor',
      intro: String.raw`Wähle eine Form (Sinus, Rechteck, Dreieck, Sägezahn, Puls/PWM), stelle Spitzenwert, Offset und Tastverhältnis ein und lies Mittelwert, Gleichrichtwert, Effektivwert, Form- und Scheitelfaktor ab. Die gestrichelte Linie ist die **äquivalente Gleichspannung** $U_\text{eff}$ — sie erzeugt im Widerstand dieselbe Wärme. Unten zeigen zwei Multimeter, was ein Mittelwert-Gerät und ein True-RMS-Gerät aus dem Signal machen würden.`,
      params: { shape: 'pulse', amp: 6, duty: 0.5, targetAmp: 10, targetDuty: 0.2, targetU: 5 },
      task: String.raw`Stelle einen **Puls 0/10 V mit 20 % Tastverhältnis** ein. Erreiche danach bei 10 V Pulshöhe einen Effektivwert von $5\,\text{V}$ (±3 %) — welches Tastverhältnis brauchst du?`,
      caption: 'Aufgabe 2 löst du auch ohne Probieren: U_eff = 10 V · √D = 5 V ⇒ D = 0,25.',
    },
    {
      id: 'calc-pwm', type: 'numeric', title: 'Effektivwert eines PWM-Signals',
      question: String.raw`Ein Rechtecksignal wechselt zwischen $0$ und $10\,\text{V}$ mit einem Tastverhältnis von $20\,\%$. Wie groß ist der Effektivwert, in V?`,
      answer: 4.47, tolerance: 0.05, unit: 'V',
      hint: String.raw`$U_\text{eff} = \hat U\sqrt{D}$ mit $D = 0{,}2$.`,
      explain: String.raw`$U_\text{eff} = 10\,\text{V}\cdot\sqrt{0{,}2} = 4{,}47\,\text{V}$. Der Mittelwert beträgt dagegen nur $10\,\text{V}\cdot0{,}2 = 2\,\text{V}$.`,
    },
    {
      id: 'calc-rect', type: 'numeric', title: 'Rechteck 0/5 V mit 50 %',
      question: String.raw`Ein Rechteck zwischen $0$ und $5\,\text{V}$ hat $D = 50\,\%$. Welchen Effektivwert hat es, in V?`,
      answer: 3.54, tolerance: 0.04, unit: 'V',
      explain: String.raw`$U_\text{eff} = 5\,\text{V}\cdot\sqrt{0{,}5} = 3{,}54\,\text{V}$, der Mittelwert ist $2{,}5\,\text{V}$. Ein *symmetrisches* Rechteck $\pm5$ V hätte $U_\text{eff} = 5$ V.`,
    },
    {
      id: 'dreieck', type: 'text', title: 'Dreieck und der Faktor √3',
      md: String.raw`
Beim **Dreieck** (und beim Sägezahn) steigt die Spannung linear — die Quadrate sind dann kleiner als beim Rechteck, weil lange Zeit nur kleine Werte vorkommen. Die Rechnung liefert:

$$ U_\text{eff,Dreieck} = \frac{\hat u}{\sqrt3} \approx 0{,}577\,\hat u $$

Vergleiche die drei Formen bei gleichem Spitzenwert $\hat u$: Rechteck (symmetrisch) $1{,}0\,\hat u$ — Sinus $0{,}707\,\hat u$ — Dreieck $0{,}577\,\hat u$. **Gleicher Spitzenwert heißt noch lange nicht gleiche Wärme.**

Dafür gibt es zwei Verhältniszahlen: Der [[crestfaktor|Scheitelfaktor]] ([Scheitelfaktor](wiki:Scheitelfaktor|Crest factor)) $k_s = \hat u/U_\text{eff}$ und der [[formfaktor|Formfaktor]] ([Formfaktor](wiki:Formfaktor (Elektrotechnik)|Form factor (electronics))) $F = U_\text{eff}/|\bar u|$:

<table>
<tr><th>Form</th><th>Scheitelfaktor $k_s$</th><th>Formfaktor $F$</th></tr>
<tr><td>Sinus</td><td>$\sqrt2 = 1{,}414$</td><td>$\pi/(2\sqrt2) = 1{,}11$</td></tr>
<tr><td>Rechteck (symmetrisch)</td><td>$1$</td><td>$1$</td></tr>
<tr><td>Dreieck</td><td>$\sqrt3 = 1{,}732$</td><td>$2/\sqrt3 = 1{,}155$</td></tr>
</table>`,
    },
    {
      id: 'calc-tri', type: 'numeric', title: 'Dreieck ±6 V',
      question: String.raw`Eine symmetrische Dreieckspannung schwingt zwischen $-6\,\text{V}$ und $+6\,\text{V}$. Welchen Effektivwert hat sie, in V?`,
      answer: 3.46, tolerance: 0.04, unit: 'V',
      explain: String.raw`$U_\text{eff} = \hat u/\sqrt3 = 6\,\text{V}/1{,}732 = 3{,}46\,\text{V}$.`,
    },
    {
      id: 'calc-sym', type: 'numeric', title: 'Symmetrisches Rechteck',
      question: String.raw`Ein symmetrisches Rechteck schwingt zwischen $-5\,\text{V}$ und $+5\,\text{V}$ (Tastverhältnis 50 %). Welchen Effektivwert hat es, in V?`,
      answer: 5, tolerance: 0.05, unit: 'V',
      explain: String.raw`Das Quadrat der Spannung ist immer $25\,\text{V}^2$, also $U_\text{eff} = \sqrt{25} = 5\,\text{V}$. Spitzenwert und Effektivwert sind gleich ($k_s = 1$).`,
    },
    {
      id: 'calc-form', type: 'numeric', title: 'Formfaktor des Sinus',
      question: String.raw`Der Effektivwert eines Sinus ist $0{,}7071\,\hat u$, der Gleichrichtwert $0{,}6366\,\hat u$ ($=2\hat u/\pi$). Wie groß ist der Formfaktor $F = U_\text{eff}/|\bar u|$?`,
      answer: 1.11, tolerance: 0.01,
      explain: String.raw`$F = 0{,}7071/0{,}6366 = 1{,}111$, exakt $\pi/(2\sqrt2)$. Dieser Wert ist in das Messwerk billiger Multimeter „eingebaut".`,
    },
    {
      id: 'multimeter', type: 'text', title: 'Warum ein Multimeter lügen kann',
      md: String.raw`
Ein günstiges Wechselspannungs-Multimeter misst gar nicht den Effektivwert. Es gleichrichtet, bildet den **Gleichrichtwert** $|\bar u|$ und **multipliziert mit 1,11**, damit die Anzeige für einen *Sinus* stimmt. Das funktioniert nur für Sinus. Misst es ein symmetrisches Rechteck ($F = 1$) mit $\hat U = 5$ V, zeigt es $5\cdot1{,}11 = 5{,}55$ V statt 5 V (11 % zu viel); bei einem Dreieck ($F = 1{,}155$) zu wenig, bei PWM oder verzerrten Strömen im Netzteil sogar deutlich daneben.

Ein **True-RMS-Multimeter** ([Multimeter](wiki:Multimeter|Multimeter)) bildet echt den Effektivwert (quadrieren, mitteln, Wurzel) und stimmt auch für Nicht-Sinus-Signale — **innerhalb** seines Scheitelfaktor- und Bandbreitenbereichs. Probiere es in der Demo oben: Die beiden Multimeter am Fuß zeigen bei Sinus dasselbe, bei Rechteck oder PWM nicht.[^wp-effektivwert]`,
    },
    {
      id: 'quiz-meter', type: 'quiz', title: 'Mittelwert-Multimeter an einem Rechteck',
      question: 'Ein auf Sinus geeichtes, gleichrichtwert-messendes Multimeter misst ein symmetrisches Rechtecksignal. Zeigt es den Effektivwert richtig an?',
      options: [
        { text: 'Nein — der Formfaktor des Rechtecks (1) unterscheidet sich vom Sinus (1,11), die Anzeige ist rund 11 % zu hoch.', correct: true, why: 'Das Gerät multipliziert den Gleichrichtwert immer mit 1,11. Beim Rechteck ist der Gleichrichtwert aber schon gleich dem Effektivwert.' },
        { text: 'Ja — der Effektivwert gilt für jede Signalform, das Gerät zeigt ihn immer richtig.', correct: false, why: 'Der Effektivwert gilt zwar für jede Form, aber *billige* Geräte berechnen ihn nur für Sinus richtig.' },
        { text: 'Nein, es zeigt immer null, weil der Mittelwert null ist.', correct: false, why: 'Das Gerät misst den Gleichrichtwert (Betrag), nicht den Mittelwert — der ist beim Rechteck gleich der Höhe.' },
        { text: 'Ja, aber nur bei Frequenzen unter 50 Hz.', correct: false, why: 'Die Frequenz ändert den Formfaktor nicht, nur die Bandbreite des Geräts begrenzt die Messung.' },
      ],
    },
    {
      id: 'warning-spitze', type: 'callout', tone: 'warning', title: 'Vorsicht: Gleicher Spitzenwert ≠ gleiche Wärme',
      md: String.raw`
Zwei Signale mit gleichem Spitzenwert können ganz verschieden viel Leistung umsetzen: Das Rechteck mit $\hat U$ liefert $U^2/R$, ein Sinus nur die Hälfte, ein Dreieck nur ein Drittel. Auch **der Spitzenwert reicht nicht**, um die Belastung eines Widerstands abzuschätzen — man braucht den Effektivwert, und der hängt von der **Form** ab. Und: Einen Mittelwert von 0 V hat jedes symmetrische Wechselsignal, es heizt trotzdem.`,
    },
    {
      id: 'mission', type: 'callout', tone: 'mission', title: 'Prüfung & Funkpraxis',
      md: String.raw`
- **Prüfungsbezug:** EB405 (Welche Gleichspannung setzt an einem Wirkwiderstand etwa die gleiche Leistung um wie die dargestellte Sinusspannung? → der Effektivwert, also $0{,}7\hat u$) und EB503/EB504 (Leistungsformeln mit Effektivwerten).
- **Praxis:** Schaltnetzteile, PWM-Dimmer und Motorsteuerungen erzeugen Nicht-Sinus-Ströme. Wer deren Leistung mit einem einfachen Multimeter nachmisst, liegt daneben — ein True-RMS-Gerät oder das Oszilloskop ist dafür richtig.
- **Für den Funkbetrieb:** Ein SSB-Sprachsignal hat einen **hohen Scheitelfaktor** — die Spitzen sind viel höher als der Effektivwert (mehr dazu in den Lektionen zu Leistung und PEP).`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: String.raw`
<table><tr><th>Deutsch</th><th>English</th><th>Notation</th></tr>
<tr><td>Rechteckschwingung</td><td>square wave</td><td></td></tr>
<tr><td>Dreieckschwingung</td><td>triangle wave</td><td></td></tr>
<tr><td>Sägezahn</td><td>sawtooth</td><td></td></tr>
<tr><td>Tastverhältnis</td><td>duty cycle</td><td>$D = t_\text{an}/T$</td></tr>
<tr><td>Mittelwert / Gleichanteil</td><td>mean value / DC component</td><td>$\bar u$</td></tr>
<tr><td>Gleichrichtwert</td><td>rectified average</td><td>$|\bar u|$</td></tr>
<tr><td>Effektivwert</td><td>RMS (root mean square)</td><td>$U_\text{eff}$</td></tr>
<tr><td>Formfaktor</td><td>form factor</td><td>$F = U_\text{eff}/|\bar u|$</td></tr>
<tr><td>Scheitelfaktor</td><td>crest factor</td><td>$k_s=\hat u/U_\text{eff}$</td></tr></table>`,
    },
    {
      id: 'recall-spitze', type: 'recall', title: 'Erkläre es mit eigenen Worten',
      prompt: 'Wann reicht der **Spitzenwert** nicht aus, um die Wärmewirkung eines Signals zu kennen? Nenne ein Beispiel mit gleichem Spitzenwert, aber verschiedener Wärme.',
      answer: 'Der Spitzenwert sagt nichts darüber, wie lange das Signal hoch ist. Die Wärme hängt vom Mittelwert des Quadrats ab, also vom Effektivwert — und der hängt von der Form ab. Bei gleichem Spitzenwert $\\hat u$ liefert ein symmetrisches Rechteck $U_\\text{eff}=\\hat u$, ein Sinus $0{,}707\\,\\hat u$ und ein Dreieck $0{,}577\\,\\hat u$ (Leistungen im Verhältnis 1 : ½ : ⅓). Auch beim PWM-Signal gilt $U_\\text{eff}=\\hat U\\sqrt D$: nur bei $D=100\\,\\%$ gleich dem Spitzenwert.',
      hints: ['Wovon hängt die Wärmeleistung ab: von der Höhe oder vom Mittelwert von $u^2$?'],
      cards: ['eff-rechteck', 'eff-dreieck'],
    },
  ],
  cards: [
    { id: 'eff-allg', front: 'Definition des Effektivwerts für beliebige Signalform?', back: '$U_\\text{eff}=\\sqrt{\\overline{u^2}}$: quadrieren, über eine Periode mitteln, Wurzel ziehen („root mean square").' },
    { id: 'eff-rechteck', front: 'Effektivwert und Mittelwert eines Pulses $0/\\hat U$ mit Tastverhältnis $D$?', back: '$U_\\text{eff}=\\hat U\\sqrt D$, Mittelwert $\\bar u=\\hat U\\cdot D$.' },
    { id: 'eff-dreieck', front: 'Effektivwert eines symmetrischen Dreiecks?', back: '$U_\\text{eff}=\\hat u/\\sqrt3\\approx0{,}577\\,\\hat u$' },
    { id: 'eff-sym-rechteck', front: 'Effektivwert eines symmetrischen Rechtecks $\\pm\\hat u$?', back: '$U_\\text{eff}=\\hat u$ (Scheitelfaktor 1, Mittelwert 0).' },
    { id: 'tastverh', front: 'Tastverhältnis (Duty Cycle)?', back: '$D=t_\\text{an}/T$; PWM-Mittelwert $=\\hat U\\cdot D$.' },
    { id: 'mittelwert-sinus', front: 'Mittelwert eines Sinus vs. Gleichrichtwert?', back: 'Mittelwert $=0$; Gleichrichtwert (Betrag) $=2\\hat u/\\pi\\approx0{,}637\\,\\hat u$.' },
    { id: 'formfaktor', front: 'Formfaktor $F$ und sein Wert beim Sinus?', back: '$F=U_\\text{eff}/|\\bar u|$; Sinus: $\\pi/(2\\sqrt2)=1{,}11$.' },
    { id: 'scheitelfaktor', front: 'Scheitelfaktor $k_s$ und sein Wert beim Sinus?', back: '$k_s=\\hat u/U_\\text{eff}$; Sinus: $\\sqrt2=1{,}414$.' },
    { id: 'true-rms', front: 'Was unterscheidet True-RMS-Multimeter von billigen?', back: 'Billige: Gleichrichtwert × 1,11 (nur für Sinus richtig). True-RMS: echter Effektivwert, auch für Rechteck, PWM, verzerrte Signale.' },
    { id: 'gleiche-spitze', front: 'Rechteck, Sinus, Dreieck mit gleichem $\\hat u$: Reihenfolge der Effektivwerte?', back: 'Rechteck ($\\hat u$) > Sinus ($0{,}707\\hat u$) > Dreieck ($0{,}577\\hat u$).' },
    { id: 'pwm-lin', front: 'PWM: Mittelwert linear, Effektivwert …?', back: 'Mittelwert $\\propto D$, Effektivwert $\\propto\\sqrt D$.' },
  ],
};
