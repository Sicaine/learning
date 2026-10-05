export default {
  id: 'dezibel',
  title: 'Dezibel, Pegel, Dämpfung',
  summary: 'Warum Funker in dB rechnen: 3 dB sind doppelte Leistung, 10 dB der Faktor 10 — und Ketten aus Kabeln, Filtern und Verstärkern werden einfach addiert.',
  minutes: 25,
  needs: ['sinus-wechselspannung'],
  goals: [
    'Das [[dezibel|Dezibel]] als logarithmisches Verhältnismaß erklären: $10\\lg(P_2/P_1)$ für Leistungen, $20\\lg(U_2/U_1)$ für Spannungen',
    'Die Merkwerte 3 dB, 6 dB, 10 dB und 20 dB auswendig in Faktoren übersetzen',
    'Absolute [[pegel|Pegel]] [[dbm|dBm]], dBW und dBµV lesen und umrechnen',
    'Verstärkungs- und Dämpfungsketten durch **Addieren** der dB-Werte berechnen',
  ],
  blocks: [
    {
      id: 'intuition', type: 'text', title: 'Warum nicht einfach Faktoren?',
      md: String.raw`
Ein [Sender](wiki:Sendeanlage|Transmitter) liefert 100 W, am Empfänger kommen 0,000 000 000 001 W an. In Watt ist das unhandlich: zwölf Nullen. Außerdem **hören und sehen wir logarithmisch**: Eine Verdopplung der Lautstärke fühlt sich überall gleich an, egal ob von leise auf etwas lauter oder von laut auf sehr laut (das [Weber-Fechner-Gesetz](wiki:Weber-Fechner-Gesetz|Weber–Fechner law)). Und: In einer Kette aus Kabel, Filter und Verstärker **multiplizieren** sich die Faktoren — mit dem [Logarithmus](wiki:Logarithmus|Logarithm) werden daraus **Summen**.

Deshalb gibt man Verhältnisse in **[[dezibel|Dezibel]]** ([Dezibel](wiki:Dezibel|Decibel)) an, benannt nach [Alexander Graham Bell](wiki:Alexander Graham Bell|Alexander Graham Bell). Das *Bel* ist der Zehnerlogarithmus eines Leistungsverhältnisses, das Dezibel ein Zehntel davon.[^wp-dezibel]

**Wichtig:** Dezibel beschreiben immer ein **Verhältnis** zweier Größen — keine absolute Größe. Erst mit einer Bezugsgröße (1 mW, 1 W, 1 µV …) wird daraus ein absoluter Pegel.`,
    },
    {
      id: 'formeln', type: 'text', title: 'Die zwei Formeln',
      md: String.raw`
Für **Leistungsverhältnisse** und für **Spannungs-** (bzw. Strom-)**verhältnisse** bei gleichem Widerstand:

$$ g = 10\lg\frac{P_2}{P_1}\;\text{dB} \qquad\qquad g = 20\lg\frac{U_2}{U_1}\;\text{dB} $$

Der Faktor 20 statt 10 bei Spannungen kommt daher, dass $P\propto U^2$: $10\lg(U_2^2/U_1^2)=20\lg(U_2/U_1)$. Positives $g$ ist eine **Verstärkung** ([Verstärker](wiki:Verstärker (Elektrotechnik)|Amplifier)), negatives $g$ eine **Dämpfung** ([Dämpfung](wiki:Dämpfung|Attenuation); Dämpfungsmaß $a=-g$ wird oft positiv angegeben: „Kabel: Dämpfung 3 dB" = $g=-3$ dB).

Die vier Merkwerte, die du aus dem Kopf können musst (Leistung):

<table>
<tr><th>Wert</th><th>Leistung</th><th>Spannung</th></tr>
<tr><td>+3 dB</td><td>×2 (genau 1,995)</td><td>×1,41</td></tr>
<tr><td>+6 dB</td><td>×4</td><td>×2</td></tr>
<tr><td>+10 dB</td><td>×10</td><td>×3,16</td></tr>
<tr><td>+20 dB</td><td>×100</td><td>×10</td></tr>
<tr><td>−3 dB</td><td>×0,5</td><td>×0,71</td></tr>
<tr><td>−10 dB</td><td>×0,1</td><td>×0,32</td></tr>
</table>

Alles andere baust du daraus zusammen: $13\,\text{dB} = 10+3$ → $10\cdot2=20$-fach. $26\,\text{dB} = 20+6$ → $100\cdot4=400$-fach. $-7\,\text{dB} = -10+3$ → $0{,}1\cdot2=0{,}2$.`,
    },
    {
      id: 'calc-3db', type: 'numeric', title: 'Leistung verdoppelt',
      question: String.raw`Um wie viel dB ändert sich der Leistungspegel, wenn die Leistung verdoppelt wird?`,
      answer: 3, tolerance: 0.05, unit: 'dB',
      explain: String.raw`$10\lg2 = 3{,}01\,\text{dB}\approx3\,\text{dB}$ (Prüfungsfrage EA107).`,
    },
    {
      id: 'calc-6db', type: 'numeric', title: 'Spannung verdoppelt',
      question: String.raw`Um wie viel dB steigt der Pegel, wenn sich die **Spannung** verdoppelt (gleicher Widerstand)?`,
      answer: 6, tolerance: 0.05, unit: 'dB',
      explain: String.raw`$20\lg2 = 6{,}02\,\text{dB}$. Verdoppelte Spannung bedeutet vierfache Leistung, und $10\lg4=6$ dB.`,
    },
    {
      id: 'calc-100x', type: 'numeric', title: 'Leistung ×100',
      question: String.raw`Ein Verstärker macht aus $1\,\text{W}$ genau $100\,\text{W}$. Wie viel dB Verstärkung sind das?`,
      answer: 20, tolerance: 0.1, unit: 'dB',
      explain: String.raw`$10\lg100 = 20\,\text{dB}$. Merke: Jede Zehnerpotenz der Leistung sind 10 dB.`,
    },
    {
      id: 'calc-daempfung', type: 'numeric', title: 'Dämpfung rechnen',
      question: String.raw`$100\,\text{W}$ gehen in ein Kabel mit $15\,\text{dB}$ Dämpfung. Wie viel Leistung kommt am Ende an, in W?`,
      answer: 3.16, tolerance: 0.05, unit: 'W',
      hint: String.raw`$P_2 = P_1\cdot10^{-15/10}$.`,
      explain: String.raw`$P_2 = 100\,\text{W}\cdot10^{-1{,}5} = 100\cdot0{,}0316 = 3{,}16\,\text{W}$. Fast alles geht im Kabel verloren — 15 dB sind nur noch 3 % der Leistung.`,
    },
    {
      id: 'calc-kabel', type: 'numeric', title: 'Kabellänge und Dämpfung',
      question: String.raw`Ein Koaxkabel hat bei $145\,\text{MHz}$ eine Dämpfung von $20\,\text{dB}$ pro $100\,\text{m}$. Wie groß ist die Dämpfung eines $20\,\text{m}$ langen Stücks, in dB?`,
      answer: 4, tolerance: 0.05, unit: 'dB',
      explain: String.raw`Die Dämpfung in dB wächst **linear** mit der Länge: $20\,\text{dB}\cdot20/100=4\,\text{dB}$ (EG311). Dämpfungen in dB addieren sich — bei Faktoren wäre es eine Potenz.`,
    },
    {
      id: 'viz-db', type: 'viz', viz: 'db-lab', title: 'Dezibel-Labor',
      intro: String.raw`**Umrechner:** Schiebe den Wert in dB (Typ „Leistung" oder „Spannung") und lies den Faktor ab; die Tabelle der Merkwerte leuchtet mit. **Signalkette:** Baue aus Gliedern (Kabel, Filter, Dämpfungsglied, Vorverstärker, Endstufe) eine Kette, die die Startleistung auf die Zielleistung bringt. Das Wasserfalldiagramm zeigt den Pegel nach jedem Glied.`,
      params: { mode: 'both', startW: 10, targetW: 50, tolPct: 3 },
      task: String.raw`Umrechner: stelle **+3 dB (Leistung ×2)**, **+20 dB (Spannung ×10)** und **−10 dB (Leistung ×0,1)** ein. Dann Kette: bringe die **10 W** des Senders auf **50 W** (±3 %).`,
      caption: 'Tipp zur Kette: 50 W / 10 W = ×5 ≈ +7 dB = +10 dB − 3 dB.',
    },
    {
      id: 'absolut', type: 'text', title: 'Absolute Pegel: dBm, dBW, dBµV',
      md: String.raw`
Mit einer **festen Bezugsgröße** wird aus dem Verhältnis ein absoluter Wert:

- **dBm**: Bezug 1 mW. $p = 10\lg\dfrac{P}{1\,\text{mW}}\;\text{dBm}$. 1 mW = 0 dBm, 10 mW = 10 dBm, 100 mW = 20 dBm, 1 W = 30 dBm, **10 W = 40 dBm**, 100 W = 50 dBm.
- **dBW**: Bezug 1 W. 1 W = 0 dBW, 100 W = 20 dBW. (Es gilt: $\text{dBm}=\text{dBW}+30$.)
- **dBµV**: Bezug 1 µV Spannung: $20\lg(U/1\,\mu\text{V})$. An 50 Ω gilt: 1 µV = 0 dBµV. Das S-Meter-Signal **S9** entspricht 50 µV an 50 Ω ($=34$ dBµV), und jede S-Stufe sind 6 dB (also der Faktor 2 in der Spannung).[^wp-s-meter]

**Rechnen:** Pegel plus Verstärkung ergibt Pegel; Pegel minus Pegel ergibt Verstärkung bzw. Dämpfung in dB. Pegel + Pegel addiert man **nicht**.

Eine **Kette** wird durch Addition der dB-Werte gerechnet. Beispiel Sendeanlage: Sender 40 dBm (10 W) → Kabel −3 dB → Endstufe +10 dB → **47 dBm** (50 W). Das ist die Grundlage der Leistungsbilanz (EIRP, ERP) in der Funktechnik.`,
    },
    {
      id: 'calc-dbm', type: 'numeric', title: 'Watt → dBm',
      question: String.raw`Ein Sender gibt $10\,\text{W}$ ab. Welchen Pegel hat das, in dBm?`,
      answer: 40, tolerance: 0.1, unit: 'dBm',
      explain: String.raw`$10\,\text{W}=10\,000\,\text{mW}$, $10\lg10\,000=40\,\text{dBm}$.`,
    },
    {
      id: 'calc-dbm-w', type: 'numeric', title: 'dBm → Watt',
      question: String.raw`Ein Pegel von $50\,\text{dBm}$ — wie viel Watt sind das?`,
      answer: 100, tolerance: 1, unit: 'W',
      explain: String.raw`$50\,\text{dBm}=10^{5}\,\text{mW}=100\,\text{W}$. Jede 10 dBm mehr sind das Zehnfache.`,
    },
    {
      id: 'calc-dbm-small', type: 'numeric', title: '100 mW',
      question: String.raw`$100\,\text{mW}$ — welcher Pegel in dBm?`,
      answer: 20, tolerance: 0.1, unit: 'dBm',
      explain: String.raw`$10\lg(100\,\text{mW}/1\,\text{mW})=20\,\text{dBm}$.`,
    },
    {
      id: 'order-faktoren', type: 'order', title: 'Faktoren sortieren',
      prompt: 'Sortiere die Leistungspegel aufsteigend nach dem zugehörigen Leistungsfaktor (kleinster zuerst):',
      items: ['−20 dB (×0,01)', '−10 dB (×0,1)', '−3 dB (×0,5)', '0 dB (×1)', '+3 dB (×2)', '+10 dB (×10)'],
      explain: 'Negative dB sind Dämpfungen (Faktor < 1), 0 dB ist „nichts ändert sich". Jede 10 dB verschieben den Faktor um eine Zehnerpotenz.',
    },
    {
      id: 'warning-db', type: 'callout', tone: 'warning', title: 'Vorsicht: 3 dB sind nicht ×3',
      md: String.raw`
- „3 dB mehr heißt dreifache Leistung" — falsch: **doppelte** Leistung. Bei Spannungen sind **6 dB** eine Verdopplung.
- „dB sind absolute Größen" — nein, **Verhältnisse**. dBm und dBW haben eine Bezugsgröße; ein bloßes „10 dB" nicht.
- „20 lg für alles" — nur für Spannung und Strom (bei gleichem Widerstand). Für Leistungen gilt **10 lg**.
- Eine Dämpfung von 3 dB halbiert die **Leistung**, nicht die Spannung (die sinkt auf 71 %).
- Vorzeichen beachten: „Dämpfung 6 dB" heißt $g=-6$ dB.`,
    },
    {
      id: 'video-db', type: 'video', youtube: 'NNm75mMCY1Q', label: "Let's Learn Relativer Pegel – Bel, Dezibel – Verstärkung, Dämpfung", channel: '#Sogeht by Sven Stemmler', minutes: 11,
      why: 'Erklärt Bel und Dezibel mit Beispielen zu Verstärkung und Dämpfung; ergänzt die Rechenschritte dieser Lektion.',
    },
    {
      id: 'mission', type: 'callout', tone: 'mission', title: 'Prüfung & Funkpraxis',
      md: String.raw`
- **Prüfungsbezug:** EA107 (Leistung verdoppelt → 3 dB), EG311 (Kabeldämpfung linear mit der Länge), EG221 (dBd ↔ dBi: $\text{dBi}=\text{dBd}+2{,}15$), EG307 (Summe der Kabelverluste in dB) und die Leistungsrechnungen mit Antennengewinn (EG503–EG510: Verstärkung in dB in Faktoren umrechnen, Kabeldämpfung abziehen).
- **Praxis:** Eine Sendeanlage ist nichts anderes als eine dB-Kette: Sender → Anpassgerät → Koaxkabel (−x dB) → Antenne (+y dBi). Die Strahlungsleistung folgt durch Addition, die EIRP aus Sendeleistung in dBm + Antennengewinn − Kabeldämpfung. Auch das [S-Meter](wiki:S-Meter|S meter) des Empfängers ist in dB geeicht (6 dB pro S-Stufe).
- **Rechentipp:** Für den Faktor einer beliebigen dB-Zahl: erst in Zehnerschritte (10 dB = ×10), dann in 3-dB-Schritte (×2) zerlegen. $17\,\text{dB} = 10+3+3+1\to$ grob $10\cdot2\cdot2\cdot1{,}25=50$.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: String.raw`
<table><tr><th>Deutsch</th><th>English</th><th>Notation</th></tr>
<tr><td>Dezibel</td><td>decibel</td><td>dB</td></tr>
<tr><td>Pegel</td><td>level</td><td>$p$ in dBm, dBW, dBµV</td></tr>
<tr><td>Verstärkung (Gewinn)</td><td>gain</td><td>$g$ in dB</td></tr>
<tr><td>Dämpfung</td><td>attenuation, loss</td><td>$a=-g$ in dB</td></tr>
<tr><td>Verstärkungsfaktor</td><td>gain factor</td><td>$v=P_2/P_1$</td></tr>
<tr><td>Antennengewinn</td><td>antenna gain</td><td>dBi, dBd</td></tr>
<tr><td>Zehnerlogarithmus</td><td>common logarithm</td><td>$\lg$, $\log_{10}$</td></tr></table>`,
    },
    {
      id: 'recall-faktor-20', type: 'recall', title: 'Erkläre es mit eigenen Worten',
      prompt: 'Warum nimmt man bei Spannungsverhältnissen **20·lg** und bei Leistungsverhältnissen **10·lg**?',
      answer: 'Leistung ist proportional zum Quadrat der Spannung ($P=U^2/R$). Das Leistungsverhältnis ist daher das Quadrat des Spannungsverhältnisses, und $10\\lg(U_2^2/U_1^2)=20\\lg(U_2/U_1)$. So ergeben dieselben dB-Zahlen für Leistung und Spannung dasselbe physikalische Verhältnis: 6 dB sind Spannung ×2 und Leistung ×4.',
      hints: ['Wie hängt $P$ von $U$ ab?', 'Was macht der Logarithmus mit einem Quadrat?'],
      cards: ['db-formel-p', 'db-formel-u'],
    },
  ],
  cards: [
    { id: 'db-formel-p', front: 'Dezibel bei Leistungsverhältnis?', back: '$g=10\\lg(P_2/P_1)$ dB' },
    { id: 'db-formel-u', front: 'Dezibel bei Spannungsverhältnis?', back: '$g=20\\lg(U_2/U_1)$ dB (gleicher Widerstand).' },
    { id: 'db-merk', front: 'Merkwerte für Leistung: 3 dB, 6 dB, 10 dB, 20 dB?', back: '+3 dB ≈ ×2, +6 dB ≈ ×4, +10 dB = ×10, +20 dB = ×100; negative dB: Kehrwert.' },
    { id: 'db-u-merk', front: 'Merkwerte für Spannung: 6 dB, 20 dB?', back: '+6 dB ≈ ×2, +20 dB = ×10, −3 dB ≈ ×0,71.' },
    { id: 'db-add', front: 'Wie rechnet man eine Kette aus Verstärkern und Kabeln?', back: 'Die dB-Werte **addieren** (Dämpfungen negativ), statt Faktoren zu multiplizieren.' },
    { id: 'dbm-def', front: 'Definition dBm?', back: '$p=10\\lg(P/1\\,\\text{mW})$ dBm; 0 dBm = 1 mW, 30 dBm = 1 W, 40 dBm = 10 W.' },
    { id: 'dbw-dbm', front: 'Zusammenhang dBW und dBm?', back: '$\\text{dBm}=\\text{dBW}+30$.' },
    { id: 'dbuv', front: 'dBµV und S9?', back: '0 dBµV = 1 µV; S9 = 50 µV an 50 Ω ≈ 34 dBµV; 1 S-Stufe = 6 dB.' },
    { id: 'daempfung-vz', front: 'Dämpfung $a$ und Verstärkung $g$: Vorzeichen?', back: '$g=-a$: „15 dB Dämpfung" heißt $g=-15$ dB (Leistung ×0,0316).' },
    { id: 'db-kabel', front: 'Wie hängt Kabeldämpfung in dB von der Länge ab?', back: 'Linear: doppelte Länge = doppelte dB (20 dB/100 m → 4 dB für 20 m).' },
    { id: 'db-relativ', front: 'Ist dB eine absolute Größe?', back: 'Nein — ein **Verhältnis**; absolut wird es erst mit Bezug (dBm, dBW, dBµV).' },
  ],
};
