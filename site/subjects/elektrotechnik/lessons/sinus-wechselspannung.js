export default {
  id: 'sinus-wechselspannung',
  title: 'Sinus, Frequenz, Effektiv- und Spitzenwert',
  summary: 'Wie eine Wechselspannung aussieht, wie du Frequenz und Spitze-Spitze-Wert am Oszilloskop abliest — und warum aus 230 V Effektivwert 325 V Spitze werden.',
  minutes: 30,
  needs: ['strom-und-spannung', 'rc-glied'],
  goals: [
    'Eine [[wechselspannung|Wechselspannung]] mit $u(t)=\\hat u\\sin(\\omega t+\\varphi)$ beschreiben und [[frequenz]], [[periodendauer]] und [[kreisfrequenz]] ineinander umrechnen',
    '[[scheitelwert|Spitzenwert]], [[spitze-spitze|Spitze-Spitze-Wert]] und [[effektivwert|Effektivwert]] unterscheiden und umrechnen ($\\hat u = U_\\text{eff}\\sqrt2$)',
    'Wissen, warum die Steckdose „230 V" liefert, aber 325 V Spitze und 651 V Spitze-Spitze erreicht',
    'Mit dem [[oszilloskop|Oszilloskop]] Zeit/Div und Volt/Div einstellen und Frequenz und $U_{SS}$ aus dem Raster ablesen',
  ],
  blocks: [
    {
      id: 'intuition', type: 'text', title: 'Ein Kreis, der sich dreht',
      md: String.raw`
Eine [[wechselspannung|Wechselspannung]] ([Wechselspannung](wiki:Wechselspannung|Alternating current)) ändert ständig Betrag **und** Richtung. Die wichtigste Form ist der **Sinus** — und er entsteht ganz von selbst: Im [Generator](wiki:Elektrischer Generator|Electric generator) dreht sich eine Spule gleichmäßig im Magnetfeld. Die induzierte Spannung ist proportional zur Höhe eines **rotierenden Zeigers** über der Waagerechten, also zum [Sinus](wiki:Sinus und Kosinus|Sine and cosine) des Drehwinkels.

Warum gerade Sinus? Er ist die einzige Schwingungsform, die durch Kondensator, Spule und Widerstand **ihre Form behält** (Strom und Spannung bleiben sinusförmig, nur Höhe und Verschiebung ändern sich). Deshalb rechnet man in der Funktechnik fast immer mit Sinus. Im „Stromkrieg" der 1880er setzte sich der Wechselstrom von [Nikola Tesla](wiki:Nikola Tesla|Nikola Tesla) gegen Edisons Gleichstrom durch, weil man ihn mit dem [Transformator](wiki:Transformator|Transformer) leicht hoch- und heruntertransformieren kann.[^wp-wechselspannung]

Drei Zahlen legen eine Sinusspannung fest: **wie hoch** (Amplitude), **wie schnell** (Frequenz) und **wo sie startet** (Phase).`,
    },
    {
      id: 'formel', type: 'text', title: 'Die Formel: Höhe, Tempo, Start',
      md: String.raw`
$$ u(t) = \hat u\,\sin(\omega t + \varphi) $$

- $\hat u$ — [[scheitelwert|Spitzenwert]] (Amplitude), in V
- $\omega$ — [[kreisfrequenz|Kreisfrequenz]], in rad/s: wie schnell der Zeiger dreht
- $\varphi$ — [[phase|Nullphasenwinkel]]: Startwinkel bei $t=0$

Die Kreisfrequenz hängt mit der [[frequenz|Frequenz]] $f$ ([Frequenz](wiki:Frequenz|Frequency), Einheit [Hertz](wiki:Hertz (Einheit)|Hertz), nach [Heinrich Hertz](wiki:Heinrich Hertz|Heinrich Hertz)) und der [[periodendauer|Periodendauer]] $T$ zusammen. Eine volle Umdrehung des Zeigers sind $2\pi$ [Bogenmaß](wiki:Radiant (Einheit)|Radian):

$$ T = \frac{1}{f} \qquad f = \frac{1}{T} \qquad \omega = 2\pi f = \frac{2\pi}{T} $$

<table>
<tr><th>Beispiel</th><th>f</th><th>T</th><th>ω</th></tr>
<tr><td>Netzspannung ([Netzfrequenz](wiki:Netzfrequenz|Utility frequency))</td><td>50 Hz</td><td>20 ms</td><td>314 rad/s</td></tr>
<tr><td>Tonfrequenz (Kammerton a)</td><td>440 Hz</td><td>2,27 ms</td><td>2 765 rad/s</td></tr>
<tr><td>40-m-Band</td><td>7,1 MHz</td><td>141 ns</td><td>44,6 Mrad/s</td></tr>
</table>

Je höher die Frequenz, desto kürzer die Periode — und zwar genau umgekehrt proportional.`,
    },
    {
      id: 'calc-t-f', type: 'numeric', title: 'Periodendauer → Frequenz',
      question: String.raw`Ein Signal hat die Periodendauer $T = 50\,\mu\text{s}$. Welche Frequenz hat es, in kHz?`,
      answer: 20, tolerance: 0.1, unit: 'kHz',
      hint: String.raw`$f = 1/T$ — erst $50\,\mu\text{s}$ in Sekunden umrechnen: $50\cdot10^{-6}$ s.`,
      explain: String.raw`$f = 1/(50\cdot10^{-6}\,\text{s}) = 20\,000\,\text{Hz} = 20\,\text{kHz}$. (So lautet auch Prüfungsfrage EB408.)`,
    },
    {
      id: 'calc-omega', type: 'numeric', title: 'Kreisfrequenz des Netzes',
      question: String.raw`Welche Kreisfrequenz $\omega$ hat die Netzspannung mit $f = 50\,\text{Hz}$, in rad/s?`,
      answer: 314.2, tolerance: 0.5, unit: 'rad/s',
      explain: String.raw`$\omega = 2\pi f = 2\pi\cdot50\,\text{Hz} = 314{,}16\,\text{rad/s}$. Merke: $\omega\approx 6{,}28\cdot f$.`,
    },
    {
      id: 'werte', type: 'text', title: 'Spitzenwert, Spitze-Spitze, Effektivwert',
      md: String.raw`
Für „wie groß ist die Wechselspannung?" gibt es mehrere Antworten — je nachdem, was du meinst:

- **Spitzenwert** $\hat u$: der größte Augenblickswert, vom Nullpunkt aus gemessen.
- **Spitze-Spitze-Wert** $U_{SS}$: vom tiefsten zum höchsten Punkt, also $U_{SS} = 2\hat u$. Das liest man am Oszilloskop ab.
- **[[effektivwert|Effektivwert]]** $U_\text{eff}$ ([Effektivwert](wiki:Effektivwert|Root mean square)): die Gleichspannung, die an einem Widerstand **dieselbe Wärme** erzeugen würde. Das ist der Wert, den Multimeter und Steckdose meinen.

Weil die Wärmeleistung $P = u^2/R$ vom **Quadrat** der Spannung abhängt, mittelt man $u^2$ und zieht dann die Wurzel („root mean square"). Der Mittelwert von $\sin^2$ ist genau $\tfrac12$ — daraus folgt für den Sinus:

$$ U_\text{eff} = \frac{\hat u}{\sqrt2} \approx 0{,}707\,\hat u \qquad \hat u = U_\text{eff}\cdot\sqrt2 \approx 1{,}414\,U_\text{eff} \qquad U_{SS} = 2\hat u $$

**Beispiel Steckdose:** $U_\text{eff} = 230$ V $\Rightarrow$ $\hat u = 230\cdot1{,}414 = 325$ V und $U_{SS} = 651$ V. Eine Spannung, die 100 Mal pro Sekunde zwischen +325 V und −325 V wechselt, heizt einen Widerstand also so wie 230 V Gleichspannung — das ist das [Joulesche Gesetz](wiki:Stromwärmegesetz|Joule heating) in Aktion.[^bnetza-pruefungsfragen-2024]

Der **Mittelwert** eines Sinus über eine Periode ist dagegen **null** (positive und negative Hälfte heben sich auf) — er taugt nicht zur Beschreibung der Stärke.`,
    },
    {
      id: 'calc-230', type: 'numeric', title: 'Die Steckdose in Spitze-Spitze',
      question: String.raw`Die Netzspannung hat $U_\text{eff} = 230\,\text{V}$. Wie groß ist der Spitze-Spitze-Wert $U_{SS}$, in V?`,
      answer: 651, tolerance: 2, unit: 'V',
      hint: String.raw`Erst $\hat u = U_\text{eff}\cdot\sqrt2$, dann verdoppeln.`,
      explain: String.raw`$\hat u = 230\,\text{V}\cdot1{,}4142 = 325{,}3\,\text{V}$, $U_{SS} = 2\cdot325{,}3\,\text{V} = 650{,}5\,\text{V}\approx 651\,\text{V}$ (EB401/EB402).`,
    },
    {
      id: 'calc-12-eff', type: 'numeric', title: 'Effektivwert → Spitze-Spitze',
      question: String.raw`Ein sinusförmiges Signal hat einen Effektivwert von $12\,\text{V}$. Wie groß ist etwa der Spitze-Spitze-Wert, in V?`,
      answer: 33.9, tolerance: 0.4, unit: 'V',
      explain: String.raw`$U_{SS} = 2\sqrt2\cdot U_\text{eff} = 2{,}83\cdot12\,\text{V} = 33{,}9\,\text{V}$ (EB403: „34 V"). Faustregel: Spitze-Spitze ist knapp das Dreifache des Effektivwerts.`,
    },
    {
      id: 'calc-12-peak', type: 'numeric', title: 'Spitzenwert → Effektivwert',
      question: String.raw`Eine sinusförmige Wechselspannung hat einen Spitzenwert von $12\,\text{V}$. Wie groß ist der Effektivwert, in V?`,
      answer: 8.49, tolerance: 0.1, unit: 'V',
      explain: String.raw`$U_\text{eff} = \hat u/\sqrt2 = 12\,\text{V}/1{,}414 = 8{,}49\,\text{V}$ (EB404: „8,5 V").`,
    },
    {
      id: 'warning-effektiv', type: 'callout', tone: 'warning', title: 'Vorsicht: Drei verschiedene „Volt"',
      md: String.raw`
Die häufigsten Verwechslungen: „Die 230 V aus der Steckdose sind der **Spitzenwert**" — nein, das ist der **Effektivwert** (Spitze 325 V). „Der Effektivwert ist der **Mittelwert**" — nein, der Mittelwert eines Sinus ist null; der Effektivwert ist das *Wärme-Äquivalent*. „Spitze-Spitze ist der Spitzenwert" — nein, es ist das **Doppelte**. Wenn jemand „Volt" sagt, frage: Eff, Spitze oder Spitze-Spitze?`,
    },
    {
      id: 'viz-scope-read', type: 'viz', viz: 'scope-reader', title: 'Am Oszilloskop ablesen',
      intro: String.raw`Ein [Oszilloskop](wiki:Oszilloskop|Oscilloscope) zeichnet die Spannung über der Zeit. Das Raster hat 10 Div waagerecht (Zeitachse, **Zeit/Div**) und 8 Div senkrecht (**Volt/Div**). Lies die Periode in Div ab, rechne mit Zeit/Div in Sekunden um, und bilde $f = 1/T$. Die Höhe von Tal zu Gipfel in Div mal Volt/Div ist $U_{SS}$. Mit den Reglern kannst du das Bild zurechtziehen; die Cursor helfen beim Ablesen.`,
      params: { mode: 'read', rounds: 5 },
      task: String.raw`Lies **5 Zufallssignale** richtig ab: Frequenz $f$ und Spitze-Spitze-Wert $U_{SS}$ (Toleranz ca. 6 %). Tipp: Stelle Zeit/Div und Volt/Div so ein, dass 2–3 Perioden und möglichst viel Höhe im Bild sind.`,
      caption: 'Eingabe mit Vorsätzen: „2,5k" = 2,5 kHz, „640m" = 640 mV.',
    },
    {
      id: 'calc-div-50', type: 'numeric', title: 'Periode im Raster: Netzspannung',
      question: String.raw`Die Zeitbasis steht auf $5\,\text{ms/Div}$. Eine volle Periode des Signals überspannt $4$ Div. Welche Frequenz hat es, in Hz?`,
      answer: 50, tolerance: 0.5, unit: 'Hz',
      explain: String.raw`$T = 4\cdot5\,\text{ms} = 20\,\text{ms}$, $f = 1/20\,\text{ms} = 50\,\text{Hz}$ (EB410).`,
    },
    {
      id: 'calc-div-hf', type: 'numeric', title: 'Periode im Raster: Funkfrequenz',
      question: String.raw`Zeitbasis $3\,\mu\text{s/Div}$, eine Periode überspannt $4$ Div. Welche Frequenz, in kHz?`,
      answer: 83.3, tolerance: 0.5, unit: 'kHz',
      explain: String.raw`$T = 4\cdot3\,\mu\text{s} = 12\,\mu\text{s}$, $f = 1/12\,\mu\text{s} = 83{,}3\,\text{kHz}$ (EB409).`,
    },
    {
      id: 'viz-scope-mains', type: 'viz', viz: 'scope-reader', title: 'Netzspannung selbst erzeugen',
      intro: String.raw`Jetzt bist du der Generator: Im Frei-Modus stellst du Signalform, Frequenz, Spitzenwert, Zeit/Div und Volt/Div selbst ein — mit Triggerpegel und optionaler AC-Kopplung wie am echten Gerät. Wähle die Voreinstellungen oder drehe selbst.`,
      params: { mode: 'explore', goal: 'mains' },
      task: String.raw`Erzeuge die **Netzspannung** (50 Hz, $\hat u = 325\,\text{V}$) und stelle das Oszilloskop so ein, dass 2–5 Perioden und mindestens 3 Div Höhe zu sehen sind.`,
      caption: 'Bei Û = 325 V brauchst du etwa 50–100 V/Div, damit der Sinus den Schirm füllt.',
    },
    {
      id: 'match-formeln', type: 'match', title: 'Formeln zuordnen',
      prompt: 'Was gehört zusammen?',
      pairs: [
        ['Spitzenwert aus Effektivwert', 'û = U_eff · √2'],
        ['Frequenz aus Periodendauer', 'f = 1 / T'],
        ['Kreisfrequenz', 'ω = 2π · f'],
        ['Spitze-Spitze-Wert', 'U_SS = 2 · û'],
      ],
    },
    {
      id: 'quiz-p', type: 'quiz', title: 'Gelten die Leistungsformeln auch bei Wechselspannung?',
      question: String.raw`Gelten die Formeln $P = U\cdot I$ und $P = U^2/R$ an einem rein ohmschen Widerstand auch bei Wechselspannung?`,
      options: [
        { text: 'Ja, wenn mit den Effektivwerten gerechnet wird.', correct: true, why: 'Der Effektivwert ist genau so definiert, dass er dieselbe Leistung wie eine Gleichspannung liefert.' },
        { text: 'Ja, wenn mit den Spitzenwerten gerechnet wird.', correct: false, why: 'Mit Spitzenwerten erhielte man die **Spitzenleistung** $\\hat u^2/R$ — das Doppelte der mittleren Leistung.' },
        { text: 'Nein, bei Wechselspannung gelten sie nie.', correct: false, why: 'Sie gelten sehr wohl, wenn man die Effektivwerte einsetzt.' },
        { text: 'Nein, dort gilt nur $P = U\\cdot I\\cdot\\sqrt2$.', correct: false, why: 'Ein Faktor $\\sqrt2$ gehört nicht in die Formel; er steckt schon im Verhältnis Spitzen- zu Effektivwert.' },
      ],
    },
    {
      id: 'video-wechselstrom', type: 'video', youtube: '8v0kw3ptQ4s', label: 'Augenblickswert, Periodendauer, Frequenz, Scheitelwert – Wechselstrom einfach erklärt', channel: '#Sogeht by Sven Stemmler', minutes: 11,
      why: 'Wiederholt die Begriffe dieser Lektion am Liniendiagramm; gut, wenn dir Periodendauer und Scheitelwert noch nicht sitzen.',
    },
    {
      id: 'mission', type: 'callout', tone: 'mission', title: 'Prüfung & Funkpraxis',
      md: String.raw`
- **Prüfungsbezug:** EB401/EB402 (Spitze und Spitze-Spitze der 230-V-Steckdose), EB403/EB404 (Umrechnung Effektiv ↔ Spitze), EB406/EB407 (Spitze-Spitze aus dem Schirmbild), EB408 (Periodendauer ↔ Frequenz), EB409–EB411 (Frequenz aus dem Oszillogramm), EB503 (Leistungsformeln mit Effektivwerten).
- **Praxis:** Beim Funk kommt es oft auf die Spannung an der [künstlichen Antenne](wiki:Dummy Load|Dummy load) an: Ein Oszilloskop zeigt $U_{SS}$, die Leistung rechnest du über $U_\text{eff} = U_{SS}/(2\sqrt2)$ und $P = U_\text{eff}^2/R$ (z. B. 100 V eff an 50 Ω ergeben 200 W, EB507). Die Frequenzmessung per Zeitbasis kommt auch in EI301/EI302 vor.
- **Rechentipp:** Aus Spitze-Spitze wird der Effektivwert durch Teilen durch $2{,}83$ ($=2\sqrt2$); aus Effektiv wird Spitze-Spitze durch Malnehmen mit $2{,}83$.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: String.raw`
<table><tr><th>Deutsch</th><th>English</th><th>Notation</th></tr>
<tr><td>Wechselspannung</td><td>alternating voltage, AC voltage</td><td>$u(t)$</td></tr>
<tr><td>Augenblickswert</td><td>instantaneous value</td><td>$u$</td></tr>
<tr><td>Spitzenwert, Scheitelwert, Amplitude</td><td>peak value, amplitude</td><td>$\hat u$</td></tr>
<tr><td>Spitze-Spitze-Wert</td><td>peak-to-peak value</td><td>$U_{SS}$ (engl. $V_{pp}$)</td></tr>
<tr><td>Effektivwert</td><td>RMS value (root mean square)</td><td>$U_\text{eff}$, $U_\text{rms}$</td></tr>
<tr><td>Periodendauer</td><td>period</td><td>$T$</td></tr>
<tr><td>Frequenz</td><td>frequency</td><td>$f$</td></tr>
<tr><td>Kreisfrequenz</td><td>angular frequency</td><td>$\omega$</td></tr>
<tr><td>Nullphasenwinkel</td><td>phase angle</td><td>$\varphi$</td></tr>
<tr><td>Zeit/Div, Volt/Div</td><td>time/div, volts/div</td><td></td></tr></table>`,
    },
    {
      id: 'recall-effektiv', type: 'recall', title: 'Erkläre es mit eigenen Worten',
      prompt: 'Was bedeutet der **Effektivwert** physikalisch, und warum ist er für den Sinus kleiner als der Spitzenwert?',
      answer: 'Der Effektivwert ist die Gleichspannung (bzw. der Gleichstrom), die an einem Widerstand dieselbe Wärmeleistung erzeugt wie die Wechselgröße. Weil die Leistung mit dem Quadrat der Spannung wächst, wird $u^2$ über eine Periode gemittelt und daraus die Wurzel gezogen. Der Sinus erreicht den Spitzenwert nur kurz, ist sonst kleiner — im Mittel zählt $\\tfrac12\\hat u^2$ — deshalb gilt $U_\\text{eff} = \\hat u/\\sqrt2 \\approx 0{,}707\\,\\hat u$.',
      hints: ['Wovon hängt die Wärmeleistung am Widerstand ab: von $u$ oder von $u^2$?', 'Wie groß ist der Mittelwert von $\\sin^2$?'],
      cards: ['eff-def', 'eff-sinus'],
    },
  ],
  cards: [
    { id: 'u-t', front: 'Allgemeine Gleichung einer Sinusspannung?', back: '$u(t) = \\hat u\\,\\sin(\\omega t+\\varphi)$ mit Spitzenwert $\\hat u$, Kreisfrequenz $\\omega$, Nullphasenwinkel $\\varphi$.' },
    { id: 'eff-sinus', front: 'Effektivwert eines Sinus aus dem Spitzenwert?', back: '$U_\\text{eff} = \\hat u/\\sqrt2 \\approx 0{,}707\\,\\hat u$' },
    { id: 'spitze-sinus', front: 'Spitzenwert aus dem Effektivwert?', back: '$\\hat u = U_\\text{eff}\\cdot\\sqrt2 \\approx 1{,}414\\,U_\\text{eff}$' },
    { id: 'uss', front: 'Spitze-Spitze-Wert?', back: '$U_{SS} = 2\\hat u = 2\\sqrt2\\,U_\\text{eff}\\approx 2{,}83\\,U_\\text{eff}$' },
    { id: 't-f', front: 'Zusammenhang Periodendauer und Frequenz?', back: '$T = 1/f$ bzw. $f = 1/T$ (50 µs ↔ 20 kHz).' },
    { id: 'omega-f', front: 'Kreisfrequenz aus der Frequenz?', back: '$\\omega = 2\\pi f$ (bei 50 Hz: 314 rad/s).' },
    { id: 'netz-325', front: 'Spitze und Spitze-Spitze der 230-V-Steckdose?', back: '$\\hat u = 325$ V, $U_{SS} = 651$ V (Effektivwert 230 V).' },
    { id: 'eff-def', front: 'Was bedeutet Effektivwert physikalisch?', back: 'Gleichspannung mit gleicher **Wärmewirkung** am gleichen Widerstand (nicht der Mittelwert!).' },
    { id: 'mittel-sinus', front: 'Mittelwert eines Sinus über eine Periode?', back: 'Null — positive und negative Halbwelle heben sich auf.' },
    { id: 'scope-f', front: 'Frequenz am Oszilloskop ablesen?', back: 'Periode in Div × Zeit/Div = $T$, dann $f = 1/T$. (4 Div bei 5 ms/Div → 20 ms → 50 Hz)' },
    { id: 'scope-uss', front: 'Spitze-Spitze-Wert am Oszilloskop ablesen?', back: 'Höhe in Div × Volt/Div (Tastkopf-Teiler beachten).' },
    { id: 'p-eff', front: 'Mit welchen Werten gelten $P=UI$ und $P=U^2/R$ bei Wechselspannung?', back: 'Mit den **Effektivwerten** (am rein ohmschen Widerstand).' },
  ],
};
