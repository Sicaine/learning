export default {
  id: 'leitungen-wellenwiderstand',
  title: 'Wellenwiderstand, Koax, Verkürzungsfaktor',
  summary: 'Warum ein Koaxkabel bei HF mehr ist als ein Draht: Leitungsbeläge L\' und C\', Wellenwiderstand Z₀ = √(L\'/C\'), Koax-Formel, Verkürzungsfaktor 1/√ε_r und Kabeldämpfung in dB.',
  minutes: 35,
  needs: ['fourier-spektrum', 'blindwiderstand'],
  goals: [
    'Eine [[leitung|Leitung]] als Kette aus Induktivität und Kapazität pro Meter verstehen und den [[wellenwiderstand|Wellenwiderstand]] $Z_0=\\sqrt{L\'/C\'}$ berechnen',
    'Erklären, dass $Z_0$ von Geometrie und [[permittivitaet|Dielektrikum]], nicht von der Länge abhängt, und die [[koaxialkabel|Koax]]-Formel $Z=\\tfrac{60\\,\\Omega}{\\sqrt{\\varepsilon_r}}\\ln\\tfrac Dd$ anwenden',
    'Den [[verkuerzungsfaktor|Verkürzungsfaktor]] $k_v=1/\\sqrt{\\varepsilon_r}$ berechnen und damit die [[wellenlaenge|Wellenlänge]] auf der Leitung angeben',
    'Die [[kabeldaempfung|Kabeldämpfung]] in dB je 100 m auf eine Länge umrechnen',
    'Aus der Echo-Laufzeit eines Impulses (TDR) die Länge eines Kabels bestimmen',
  ],
  blocks: [
    {
      id: 'intuition', type: 'text', title: 'Ein Kabel ist eine Kette aus Spulen und Kondensatoren',
      md: String.raw`
Für Gleichstrom und 50 Hz ist ein Kabel einfach ein Draht. Bei Hochfrequenz ändert sich das, sobald die **Länge nicht mehr klein gegenüber der Wellenlänge** ist. Auf 145 MHz hat eine Welle in Luft 2,07 m Länge — ein 10-m-Kabel ist also fast fünf Wellenlängen lang. Dann kann man nicht mehr sagen „an beiden Enden dieselbe Spannung“: Das Signal braucht **Zeit** zum Laufen, und die Spannung hängt vom Ort ab.

Ein Leiterpaar hat **Induktivität** (jeder Draht ist eine Spule, zusammen bilden sie eine Schleife) und **Kapazität** (zwei Leiter mit Isolation dazwischen). Diese Größen liegen **verteilt** über die ganze Länge — pro Meter: der **Induktivitätsbelag** $L'$ (in H/m) und der **Kapazitätsbelag** $C'$ (in F/m). Man kann sich die [Leitung](wiki:Leitungstheorie|Transmission line) als unendliche Kette kleiner LC-Glieder vorstellen: Spule in Reihe, Kondensator quer, Spule, Kondensator … [Oliver Heaviside](wiki:Oliver Heaviside|Oliver Heaviside) hat dieses Modell in den 1880er-Jahren in den [Telegrafengleichungen](wiki:Telegrafengleichung) beschrieben.[^kuphaldt-ac-kap14]

Wenn du einen Impuls auf eine solche Kette gibst, lädt er nacheinander jeden Kondensator durch die Spulen, so wie eine Welle in einer Wasserrinne vorwärts läuft. *Solange die Kette unendlich lang ist*, sieht die Quelle nur ein gleichmäßiges Verhältnis von Spannung zu Strom — und das ist der **Wellenwiderstand**.`,
    },
    {
      id: 'z0', type: 'text', title: 'Wellenwiderstand: Z₀ = √(L′/C′)',
      md: String.raw`
Der [Wellenwiderstand](wiki:Wellenwiderstand) $Z_0$ (auch $Z_W$) ist das Verhältnis aus Spannung und Strom einer **fortschreitenden Welle**. Für die verlustfreie Leitung gilt

$$ Z_0 = \sqrt{\frac{L'}{C'}} \qquad\qquad v = \frac{1}{\sqrt{L'\,C'}} $$

Beispiel: $L'=250$ nH/m, $C'=100$ pF/m → $Z_0=\sqrt{2{,}5\cdot10^{-7}/10^{-10}}=\sqrt{2500}=50\,\Omega$ — ein typisches Koaxkabel.

**Wichtig:**

- $Z_0$ ist **kein** Widerstand, den man mit dem Ohmmeter messen kann (ein Koax zeigt mit dem Ohmmeter am Ende Leerlauf oder Durchgang). Es ist ein Verhältnis U/I der *laufenden Welle*.
- $Z_0$ hängt nur von **Geometrie** (Abstand, Durchmesser) und **Dielektrikum** ab — **nicht von der Länge** und im HF-Bereich nicht vom Abschluss und kaum von der Frequenz (EG301).
- Ein Abschluss mit $R_L = Z_0$ „sieht aus wie eine unendlich lange Leitung“: Die Welle läuft hinein und kommt **nicht zurück**. Das ist **Anpassung** (nächste Lektion).
- Die Wellen bewegen sich mit $v<c$: sie brauchen für $\ell$ die Zeit $T=\ell/v$.

Für das **Koaxialkabel** ([Koaxkabel](wiki:Koaxialkabel|Coaxial cable)) mit Innenleiterdurchmesser $d$, Innendurchmesser des Außenleiters $D$ und Dielektrikum der relativen [Permittivität](wiki:Permittivität|Permittivity) $\varepsilon_r$ gilt (Formelsammlung):

$$ Z = \frac{60\,\Omega}{\sqrt{\varepsilon_r}}\,\ln\frac{D}{d} $$

Dicker Innenleiter → kleineres $Z$, größerer Abstand → größeres $Z$. Typische Wellenwiderstände: **50 Ω** (Amateurfunk, Messtechnik), **60 Ω** und **75 Ω** (Antennenfernsehen, Video); eine **Zweidrahtleitung** („Hühnerleiter“) hat dagegen einige 100 Ω (NG201).`,
    },
    {
      id: 'calc-z0', type: 'numeric', title: 'Wellenwiderstand aus L′ und C′',
      question: String.raw`Eine Leitung hat $L' = 250\,\text{nH/m}$ und $C' = 100\,\text{pF/m}$. Wie groß ist ihr Wellenwiderstand?`,
      answer: 50, tolerance: 0.5, unit: 'Ω',
      explain: String.raw`$Z_0=\sqrt{L'/C'}=\sqrt{2{,}5\cdot10^{-7}\,\text{H/m}\,/\,10^{-10}\,\text{F/m}}=\sqrt{2500}\,\Omega = 50\,\Omega$.`,
    },
    {
      id: 'calc-v', type: 'numeric', title: 'Ausbreitungsgeschwindigkeit',
      question: String.raw`Für dieselbe Leitung ($L'=250$ nH/m, $C'=100$ pF/m): Wie schnell läuft die Welle? Gib $v$ in $10^8\,\text{m/s}$ an.`,
      answer: 2.0, tolerance: 0.03,
      unit: '·10⁸ m/s',
      hint: String.raw`$v = 1/\sqrt{L'C'}$.`,
      explain: String.raw`$L'C'=2{,}5\cdot10^{-17}\,\text{s}^2/\text{m}^2$, $\sqrt{\cdot}=5\cdot10^{-9}$, also $v=2{,}0\cdot10^{8}\,\text{m/s}$ — etwa $0{,}67\,c$.`,
    },
    {
      id: 'calc-dd', type: 'numeric', title: 'Koax dimensionieren',
      question: String.raw`Ein Koaxkabel mit Polyethylen ($\varepsilon_r=2{,}29$) soll $Z=50\,\Omega$ haben. Welches Verhältnis $D/d$ ist nötig?`,
      answer: 3.53, tolerance: 0.03,
      hint: String.raw`$\ln(D/d) = Z\sqrt{\varepsilon_r}/60\,\Omega$, dann $\mathrm e^{\,\cdot}$ bilden.`,
      explain: String.raw`$\ln(D/d)=50\cdot\sqrt{2{,}29}/60=1{,}261$ → $D/d=\mathrm e^{1{,}261}\approx 3{,}53$. Beispiel: $d=0{,}9$ mm Innenleiter → $D\approx 3{,}2$ mm Dielektrikumdurchmesser.`,
    },
    {
      id: 'demo-line', type: 'viz', viz: 'line-lab', title: 'Impuls auf der Leitung',
      intro: String.raw`Oben läuft ein Impuls über die Leitung: **blau** die hinlaufende Welle, **rot** das Echo, gestrichelt die Summe, die man messen kann. Unten steht das **TDR**-Bild, die Spannung am Leitungsanfang über der Zeit. Verändere Abschluss, $Z_0$, $\varepsilon_r$ und Länge — und achte auf Echo-Zeit und Vorzeichen.`,
      params: { z0: 50, len: 20, er: 2.29, secretLen: 37 },
      task: String.raw`**(1)** Passe die Leitung an ($R_L = Z_0$: kein Echo), **(2)** stelle einen **Kurzschluss** ein (Echo mit umgekehrtem Vorzeichen) und **(3)** wechsle in die **Messaufgabe**: Lies die Echo-Laufzeit ab und bestimme die unbekannte Länge (tippe sie ein, ±5 %). Hinweis: Das Echo läuft hin **und** zurück.`,
      caption: 'Offenes Ende: Echo mit gleichem Vorzeichen (r = +1). Kurzschluss: Echo mit umgekehrtem Vorzeichen (r = −1). Angepasst: kein Echo. Die Echo-Zeit ist 2ℓ/v — so findet man Kabelbrüche (TDR).',
    },
    {
      id: 'kv', type: 'text', title: 'Verkürzungsfaktor: Wellen sind im Kabel langsamer',
      md: String.raw`
Im Vakuum laufen elektromagnetische Wellen mit der [Lichtgeschwindigkeit](wiki:Lichtgeschwindigkeit|Speed of light) $c\approx3\cdot10^8$ m/s. Im Dielektrikum eines Kabels sind sie **langsamer**: $v=c/\sqrt{\varepsilon_r}$. Das Verhältnis heißt **[Verkürzungsfaktor](wiki:Verkürzungsfaktor|Velocity factor)**:

$$ k_v = \frac{v}{c} = \frac{1}{\sqrt{\varepsilon_r}} \qquad\qquad \lambda_\text{Leitung} = k_v\cdot\lambda_0 $$

Für **Vollpolyethylen** ([Polyethylen](wiki:Polyethylen|Polyethylene), $\varepsilon_r=2{,}29$) ist $k_v=0{,}66$; für PTFE ($\varepsilon_r\approx2{,}1$) etwa $0{,}69$; Schaumdielektrika sind schneller. Die **elektrische** Länge eines Kabels ist also größer als die mechanische: Ein „elektrisches $\lambda/2$“ bei 145 MHz ($\lambda_0=2{,}07$ m) ist in Koax mit $k_v=0{,}66$ nur $\tfrac12\cdot0{,}66\cdot2{,}07\approx0{,}683$ m lang. Das wichtigste Anwendungsgebiet: **Leitungsstücke als Bauelemente** — $\lambda/2$-Leitung (wiederholt die Impedanz), $\lambda/4$-Leitung (transformiert, nächste Lektion), Sperrkreise aus Koax.

*Zu unterscheiden:* Den „Verkürzungsfaktor“ gibt es auch bei **Drahtantennen**: Ein Dipol muss etwa **5 % kürzer** als $\lambda/2$ gebaut werden (Faktor 0,95, EG202), wegen Endeffekten und Drahtdicke. Dort geht es um Strahler, nicht um Kabel (EG201).`,
    },
    {
      id: 'calc-kv', type: 'numeric', title: 'Verkürzungsfaktor von Polyethylen',
      question: String.raw`Ein Koaxkabel hat ein Polyethylen-Dielektrikum mit $\varepsilon_r=2{,}29$. Wie groß ist der Verkürzungsfaktor $k_v$ (als Zahl)?`,
      answer: 0.66, tolerance: 0.01,
      explain: String.raw`$k_v = 1/\sqrt{2{,}29} = 1/1{,}513 = 0{,}661$.`,
    },
    {
      id: 'calc-lamlen', type: 'numeric', title: 'Mechanische Länge eines λ/2-Stücks',
      question: String.raw`Wie lang ist ein elektrisch $\lambda/2$ langes Stück Koax ($k_v=0{,}66$) für $145\,\text{MHz}$ **mechanisch**? ($\lambda_0 = 2{,}069\,\text{m}$) Angabe in Metern.`,
      answer: 0.683, tolerance: 0.005, unit: 'm',
      explain: String.raw`$\ell = \tfrac12\,k_v\,\lambda_0 = 0{,}5\cdot0{,}66\cdot2{,}069\,\text{m} = 0{,}683\,\text{m}$.`,
    },
    {
      id: 'daempfung', type: 'text', title: 'Dämpfung: Kabel kosten Signal',
      md: String.raw`
Reale Kabel haben Verluste: den ohmschen Widerstand der Leiter — bei HF verdrängt der **[Skin-Effekt](wiki:Skin-Effekt|Skin effect)** den Strom an die Leiteroberfläche, die wirksame Fläche schrumpft — und Verluste im Dielektrikum. Beides wächst mit der **Frequenz**. Die **Kabeldämpfung** gibt man in [dB](wiki:Dezibel|Bel (unit)) je 100 m an, abhängig von der Frequenz (Kabeldämpfungsdiagramm in der Formelsammlung):

$$ a = a_{100}\cdot\frac{\ell}{100\,\text{m}} \quad\text{(in dB)} $$

Da dB-Werte logarithmisch sind, **addieren** sich die Dämpfungen hintereinandergeschalteter Stücke. Beispiel: 20 dB je 100 m bei 145 MHz → 15 m Kabel haben 3 dB. Drei dB bedeuten die **halbe Leistung**: von 100 W Senderleistung kommen nur 50 W an der Antenne an (EG308). Darum gilt für VHF/UHF: *kurze Kabel, dickes Kabel, gutes Dielektrikum.* Auf Kurzwelle sind die Verluste bei gleicher Länge deutlich kleiner.

Auch die **Steckverbinder** zählen: Der N-Stecker ist bis in den GHz-Bereich definiert 50 Ω-fähig und wird daher bei UKW/UHF bevorzugt (EG303).[^bnetza-pruefungsfragen-2024]`,
    },
    {
      id: 'calc-att', type: 'numeric', title: 'Kabeldämpfung',
      question: String.raw`Ein Koaxkabel hat bei $145\,\text{MHz}$ eine Dämpfung von $20\,\text{dB}$ je $100\,\text{m}$. Welche Dämpfung hat ein $15\,\text{m}$ langes Stück?`,
      answer: 3, tolerance: 0.05, unit: 'dB',
      explain: String.raw`$a = 20\,\text{dB}\cdot15/100 = 3\,\text{dB}$ — das entspricht der halben Leistung ($10^{-0{,}3}\approx0{,}5$).`,
    },
    {
      id: 'calc-tdr', type: 'numeric', title: 'Kabellänge aus dem Echo',
      question: String.raw`Ein offenes Koaxkabel mit $k_v = 0{,}66$ wird mit einem Impuls geprüft. Das Echo kommt nach $250\,\text{ns}$ zurück. Wie lang ist das Kabel? ($c = 3\cdot10^8$ m/s)`,
      answer: 24.7, tolerance: 0.3, unit: 'm',
      hint: String.raw`$v = k_v c$; das Echo läuft hin **und** zurück: $\ell = v\,t/2$.`,
      explain: String.raw`$v = 0{,}66\cdot3\cdot10^8 = 1{,}98\cdot10^8$ m/s; $\ell = v\,t/2 = 1{,}98\cdot10^8\cdot250\cdot10^{-9}/2 = 24{,}75$ m.`,
    },
    {
      id: 'quiz-z0', type: 'quiz', title: 'Wovon hängt Z₀ ab?',
      question: 'Wovon hängt der Wellenwiderstand eines Koaxkabels ab?',
      options: [
        { text: 'Vom Durchmesserverhältnis $D/d$ und vom Dielektrikum $\\varepsilon_r$, nicht von der Länge.', correct: true, why: 'Die Formel $Z=60\\,\\Omega/\\sqrt{\\varepsilon_r}\\cdot\\ln(D/d)$ enthält nur Geometrie und Material. Eine 100-m-Rolle und ein 1-m-Stück haben denselben Wert (EG301).' },
        { text: 'Von der Kabellänge: je länger, desto größer.', correct: false, why: 'Die Fehlvorstellung: Der Gleichstromwiderstand wächst mit der Länge, der Wellenwiderstand nicht.' },
        { text: 'Vom angeschlossenen Abschlusswiderstand.', correct: false, why: 'Der Abschluss bestimmt, ob Reflexionen auftreten, nicht $Z_0$ selbst.' },
        { text: 'Vom Gleichstromwiderstand des Innenleiters.', correct: false, why: 'Der Gleichstromwiderstand ist ein anderes Maß (und bei guten Kabeln klein); $Z_0$ folgt aus $L\'$ und $C\'$.' },
      ],
    },
    {
      id: 'match-z', type: 'match', title: 'Wellenwiderstände in der Praxis',
      prompt: 'Welcher Leitungstyp gehört zu welchem typischen Wellenwiderstand?',
      pairs: [
        ['Koaxkabel im Amateurfunk', '50 Ω'],
        ['Antennen-Fernsehkabel (Koax)', '75 Ω'],
        ['Zweidrahtleitung („Hühnerleiter“)', 'einige 100 Ω'],
        ['Gleichstromwiderstand des Kabels', 'kein Wellenwiderstand'],
      ],
    },
    {
      id: 'video-koax', type: 'video', youtube: 'rTyYMytzFPw', label: 'Amateurfunk Basics - Koaxkabel Aufbau und Wellenwiderstand', channel: 'DL2YMR', minutes: 14,
      why: 'Aufbau des Koaxkabels und was „50 Ω“ bedeutet — anschauliche Ergänzung zur Demo (ca. 14 Min.).',
    },
    {
      id: 'warning-z0', type: 'callout', tone: 'warning', title: 'Typische Fehlvorstellungen',
      md: String.raw`
- „**Der Wellenwiderstand hängt von der Kabellänge ab.**“ — Nein, nur von Geometrie und Dielektrikum. Ein Kabel hat „50 Ω“, egal ob 1 m oder 100 m.
- „**Ich kann $Z_0$ mit dem Ohmmeter messen.**“ — Nein. Ein Ohmmeter zeigt Durchgang bzw. Leerlauf; $Z_0$ erscheint nur als Verhältnis U/I einer laufenden Welle (oder per Impulsmessung, TDR).
- „**75-Ω-Kabel an 50-Ω-Antennen ist egal.**“ — Es entsteht eine Fehlanpassung (nächste Lektion), die bei kurzen Stücken tolerabel sein kann, aber nicht „egal“ ist.
- „**Der Verkürzungsfaktor des Kabels = der des Dipols.**“ — Zwei verschiedene Dinge: Kabel $k_v=1/\sqrt{\varepsilon_r}\approx0{,}66$, Dipol-Drahtfaktor ≈ 0,95.`,
    },
    {
      id: 'deep-z0', type: 'callout', tone: 'deep', title: 'Warum gerade √(L′/C′)?',
      md: String.raw`
Eine Welle trägt Energie sowohl im Magnetfeld der Induktivität als auch im E-Feld der Kapazität — und zwar **gleich viel** pro Meter: $\tfrac12 L' I^2=\tfrac12 C' U^2$. Umgestellt: $U^2/I^2 = L'/C'$, also $U/I=\sqrt{L'/C'}=Z_0$. Es ist dasselbe Prinzip wie bei der Resonanz im Schwingkreis ($\tfrac12LI^2=\tfrac12CU^2$ bei $X_L=X_C$), nur verteilt über den Raum. Die Laufgeschwindigkeit $v=1/\sqrt{L'C'}$ gehört dazu: Eine Welle muss pro Meter erst $L'$ und $C'$ „aufladen“. Weil $L'C'=\mu\varepsilon$ ist, gilt $v=1/\sqrt{\mu\varepsilon}=c/\sqrt{\varepsilon_r}$.`,
    },
    {
      id: 'mission-leitung', type: 'callout', tone: 'mission', title: 'Prüfung & Funkpraxis',
      md: String.raw`
- **Prüfungsbezug:** Koaxkabel haben 50, 60 oder 75 Ω (NG201); Verkürzungsfaktor als Verhältnis der Geschwindigkeiten (EG201), für Drahtantennen 95 % (EG202); Wellenwiderstand unabhängig vom Abschluss (EG301); Kabeldämpfung aus dem Diagramm (EG311 bis EG316) und 3 dB = halbe Leistung (EG308); Wahl des Kabels für VHF/UHF (NG207, NG208); N-Stecker (EG303).
- **Praxis:** Für Funkstationen gilt: ein Koax-Typ pro Anlage (50 Ω), Kabel so kurz wie möglich, bei 2 m/70 cm besseres, dickeres Kabel. Als Faustwerte: Mantelwellen auf dem Kabel (EG404, EG405) entstehen bei unsymmetrischer Speisung — ein Ferrit-Balun hilft (EG408).
- **Rechentipp:** Formelsammlung: $k_v=1/\sqrt{\varepsilon_r}$ und die Koax-Formel; Dämpfung linear in der Länge: $a=a_{100}\cdot\ell/100\,\text{m}$ (dB).`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: String.raw`
<table><tr><th>Deutsch</th><th>English</th><th>Notation</th></tr>
<tr><td>Leitung</td><td>transmission line</td><td></td></tr>
<tr><td>Wellenwiderstand</td><td>characteristic impedance</td><td>$Z_0$, $Z_W$</td></tr>
<tr><td>Induktivitätsbelag / Kapazitätsbelag</td><td>inductance / capacitance per unit length</td><td>$L'$, $C'$</td></tr>
<tr><td>Koaxkabel</td><td>coaxial cable</td><td>$D$, $d$</td></tr>
<tr><td>Dielektrikum, relative Permittivität</td><td>dielectric, relative permittivity</td><td>$\varepsilon_r$</td></tr>
<tr><td>Verkürzungsfaktor</td><td>velocity factor</td><td>$k_v$</td></tr>
<tr><td>Kabeldämpfung</td><td>cable loss, attenuation</td><td>dB / 100 m</td></tr>
<tr><td>Skin-Effekt</td><td>skin effect</td><td></td></tr>
<tr><td>Zeitbereichsreflektometrie</td><td>time-domain reflectometry (TDR)</td><td></td></tr></table>`,
    },
    {
      id: 'recall-angepasst', type: 'recall', title: 'Erkläre es mit eigenen Worten',
      prompt: 'Was bedeutet „die Leitung ist an die Last angepasst“? Was passiert mit einem Impuls dann, und was passiert, wenn die Last ein offenes Ende ist?',
      answer: 'Angepasst heißt: Der Abschlusswiderstand ist gleich dem Wellenwiderstand, $R_L=Z_0$. Die Welle läuft vollständig in die Last, es gibt kein Echo, die Spannung am Leitungsanfang ist konstant. Bei offenem Ende wird die Welle vollständig mit gleichem Vorzeichen reflektiert und kommt nach $2\\ell/v$ zurück.',
      hints: ['Wie sieht die Leitung aus Sicht der Welle aus, wenn $R_L=Z_0$?', 'Was passiert an einem offenen Ende mit dem Strom?'],
      cards: ['angepasst', 'echo-zeit'],
    },
  ],
  cards: [
    { id: 'z0-formel', front: 'Wellenwiderstand einer verlustfreien Leitung?', back: '$Z_0=\\sqrt{L\'/C\'}$ mit Induktivitäts- und Kapazitätsbelag.' },
    { id: 'z0-unabh', front: 'Wovon hängt $Z_0$ ab, wovon nicht?', back: 'Ab: Geometrie, Dielektrikum. Nicht ab: Länge, (im HF-Bereich) Abschluss.' },
    { id: 'koax-formel', front: 'Wellenwiderstand eines Koaxkabels?', back: '$Z=\\dfrac{60\\,\\Omega}{\\sqrt{\\varepsilon_r}}\\,\\ln\\dfrac{D}{d}$' },
    { id: 'z0-typisch', front: 'Typische Wellenwiderstände?', back: 'Koax: 50 Ω (Funk), 60 Ω, 75 Ω (Video/Antennen-TV). Zweidrahtleitung: einige 100 Ω.' },
    { id: 'kv-formel', front: 'Verkürzungsfaktor eines Kabels?', back: '$k_v=v/c=1/\\sqrt{\\varepsilon_r}$. Polyethylen ($\\varepsilon_r=2{,}29$): 0,66.' },
    { id: 'lam-leitung', front: 'Wellenlänge auf der Leitung?', back: '$\\lambda_\\text{Leitung}=k_v\\cdot\\lambda_0$.' },
    { id: 'dipol-095', front: 'Verkürzungsfaktor eines Drahtdipols?', back: 'Etwa 0,95 (Dipol ca. 5 % kürzer als $\\lambda/2$ im Freiraum) — nicht zu verwechseln mit dem Kabelfaktor.' },
    { id: 'daempf-100', front: 'Wie rechnet man die Kabeldämpfung auf eine Länge um?', back: '$a=a_{100}\\cdot\\ell/100\\,\\text{m}$ in dB. 3 dB = halbe Leistung.' },
    { id: 'daempf-f', front: 'Wie hängt die Kabeldämpfung von der Frequenz ab?', back: 'Sie steigt mit der Frequenz (Skineffekt, dielektrische Verluste).' },
    { id: 'angepasst', front: 'Was heißt „angepasste Leitung“?', back: 'Abschluss = Wellenwiderstand, $R_L=Z_0$: keine Reflexion, die Welle wird vollständig absorbiert.' },
    { id: 'echo-zeit', front: 'Länge aus der Echo-Laufzeit?', back: '$\\ell=v\\,t/2$ mit $v=k_v c$ (hin und zurück, deshalb durch 2).' },
    { id: 'z0-ohmmeter', front: 'Kann man $Z_0$ mit dem Ohmmeter messen?', back: 'Nein. $Z_0=U/I$ der laufenden Welle; das Ohmmeter misst Gleichstromwiderstand bzw. Leerlauf/Durchgang.' },
  ],
};
