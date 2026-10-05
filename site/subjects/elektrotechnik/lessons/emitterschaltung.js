export default {
  id: 'emitterschaltung',
  title: 'Arbeitspunkt und Kleinsignalverstärker',
  summary: 'Wie ein einzelner Transistor ein kleines Signal verstärkt: Arbeitspunkt mit Basisspannungsteiler einstellen, Spannungsverstärkung und 180°-Phasendrehung verstehen und Verzerrung vermeiden.',
  minutes: 35,
  needs: ['bipolartransistor'],
  goals: [
    'Den Gleichspannungs-[[arbeitspunkt|Arbeitspunkt]] einer Emitterschaltung mit Basisspannungsteiler und Emitterwiderstand berechnen',
    'Die [[verstaerkung|Spannungsverstärkung]] $v_U=\\Delta U_{CE}/\\Delta U_{BE}$ bestimmen und die 180°-Phasendrehung begründen',
    'Erklären, warum der Arbeitspunkt in der Mitte der Lastgeraden liegen soll und was Clipping (Übersteuerung) ist',
    'Rolle von Emitterwiderstand ([[gegenkopplung|Gegenkopplung]]), Emitterkondensator und Koppelkondensatoren beschreiben',
  ],
  blocks: [
    {
      id: 'intuition', type: 'text', title: 'Wasserhahn mit Fernbedienung',
      md: String.raw`
Der [[bipolartransistor|Bipolartransistor]] ist ein Strom-Ventil: Ein kleiner Basisstrom $I_B$ steuert einen etwa 100-mal größeren Kollektorstrom $I_C$. Schickt man diesen Kollektorstrom durch einen Widerstand $R_C$, entsteht an ihm eine Spannung $I_C\,R_C$ — und diese Spannung folgt dem Eingangssignal, nur **größer** und **umgekehrt**: Mehr Basisstrom → mehr $I_C$ → mehr Spannungsabfall an $R_C$ → **weniger** Spannung am Kollektor. So entsteht aus einem Mini-Signal am Eingang ein großes Signal am Ausgang — ein [Verstärker](wiki:Verstärker (Elektrotechnik)|Amplifier) — die [[emitterschaltung|Emitterschaltung]] ([Emitterschaltung](wiki:Emitterschaltung|Common emitter)), die Grundstufe fast jedes Verstärkers.

Entscheidend ist der Begriff **Energie**: Der Transistor erzeugt keine Energie. Die zusätzliche Leistung am Ausgang stammt aus der Versorgung ($U_B$); das kleine Eingangssignal steuert nur, wie viel davon durchgelassen wird (Prüfungsfrage ED401: *Leistungsverstärkung = Ausgangsleistung größer als Eingangsleistung, dazu braucht man eine Spannungsquelle*).[^wp-emitterschaltung]

Damit das funktioniert, braucht der Transistor einen **Ruhezustand**, um den herum das Signal schwingt — den Arbeitspunkt.`,
    },
    {
      id: 'arbeitspunkt', type: 'text', title: 'Arbeitspunkt: die Ruhelage',
      md: String.raw`
Ohne Signal fließt ein Ruhestrom $I_C$ und am Transistor liegt die Ruhespannung $U_{CE}$. Diese beiden Werte sind der [[arbeitspunkt|Arbeitspunkt]] ([Arbeitspunkt](wiki:Arbeitspunkt|Operating point)). Er muss so liegen, dass das Signal nach beiden Seiten schwingen kann:

- liegt er **zu nah an der Sättigung** ($U_{CE}\to0{,}2$ V, $I_C$ groß), werden die Minima des Ausgangs abgeschnitten,
- liegt er **zu nah am Sperren** ($I_C\to0$, $U_{CE}\to U_B$), werden die Maxima abgeschnitten.

Beides heißt *Clipping* ([Clipping](wiki:Übersteuerung|Clipping (audio))) und erzeugt Verzerrungen (messbar als [Klirrfaktor](wiki:Klirrfaktor|Total harmonic distortion)). Die beste Lage: ungefähr **in der Mitte der Lastgeraden**, also $U_{CE}\approx U_B/2$ (bzw. $U_{CE}$ etwa halb so groß wie die Spannung über $R_C+R_E$ und Transistor zusammen).

**Einstellung mit dem Basis-[Spannungsteiler](wiki:Spannungsteiler|Voltage divider)** ($R_1$ oben, $R_2$ unten, Querstrom ≫ $I_B$):

$$ U_B = U_\text{Bat}\,\frac{R_2}{R_1+R_2} \qquad U_E = U_B - U_{BE}\approx U_B - 0{,}7\,\text{V} \qquad I_C\approx I_E=\frac{U_E}{R_E} $$
$$ U_{CE} = U_\text{Bat} - I_C\,(R_C+R_E) $$

Der **Emitterwiderstand** $R_E$ stabilisiert den Arbeitspunkt: Wird der Transistor wärmer, steigt $I_C$, damit $U_E=I_E R_E$ — und $U_{BE}=U_B-U_E$ sinkt, was den Strom wieder bremst. Das ist **[Gegenkopplung](wiki:Gegenkopplung|Negative feedback)**: Die Wirkung wirkt ihrer Ursache entgegen. Der Arbeitspunkt hängt dadurch kaum noch von der Stromverstärkung $B$ ab, die von Exemplar zu Exemplar um den Faktor 2–3 streut.`,
    },
    {
      id: 'calc-uce', type: 'numeric', title: 'Ruhespannung am Kollektor',
      question: String.raw`Eine einfache Emitterschaltung ohne $R_E$ hat $U_B=12\,\text{V}$, $R_C=1\,\text{k}\Omega$ und einen Ruhestrom $I_C=2\,\text{mA}$. Wie groß ist $U_{CE}$, in V?`,
      answer: 10, tolerance: 0.1, unit: 'V',
      explain: String.raw`$U_{CE}=U_B-I_CR_C=12\,\text{V}-2\,\text{mA}\cdot1\,\text{k}\Omega=10\,\text{V}$. Der Transistor setzt $P=U_{CE}\cdot I_C=20$ mW um.`,
    },
    {
      id: 'calc-p', type: 'numeric', title: 'Verlustleistung des Transistors',
      question: String.raw`Mit $U_{CE}=10\,\text{V}$ und $I_C=2\,\text{mA}$: Welche Verlustleistung entsteht im Transistor, in mW?`,
      answer: 20, tolerance: 0.2, unit: 'mW',
      explain: String.raw`$P_V=U_{CE}\cdot I_C=10\,\text{V}\cdot2\,\text{mA}=20\,\text{mW}$.`,
    },
    {
      id: 'verstaerkung', type: 'text', title: 'Spannungsverstärkung und Phasendrehung',
      md: String.raw`
Die [[verstaerkung|Spannungsverstärkung]] ist das Verhältnis von Ausgangs- zu Eingangsspannungsänderung:

$$ v_U = \frac{\Delta U_{CE}}{\Delta U_{BE}} = \frac{u_2}{u_1} \qquad\qquad v_I = \frac{\Delta I_C}{\Delta I_B}=\beta \qquad v_P = v_U\cdot v_I $$

Beispiel: Ändert sich $U_{BE}$ um 40 mV und deshalb $U_{CE}$ um 4 V, ist $v_U = 4\,\text{V}/40\,\text{mV} = 100$. Das **Vorzeichen** ist negativ: Die Emitterschaltung **dreht die Phase um 180°** (invertiert), weil mehr Strom am $R_C$ mehr Spannung abfallen lässt.

Wie groß ist $v_U$ in der Praxis? Ohne $R_E$-Wirkung (Emitter über einen Kondensator an Masse) hängt es an der **[Steilheit](wiki:Transkonduktanz|Transconductance)** $g_m$ des Transistors:

$$ g_m = \frac{I_C}{U_T} \quad (U_T\approx25{,}85\,\text{mV bei } 27\,{}^{\circ}\text{C}) \qquad v_U\approx -g_m\,R_C $$

Mit $I_C=2$ mA: $g_m=77{,}4$ mS; mit $R_C=1$ kΩ: $v_U\approx-77$. Der Wert wächst mit dem Arbeitspunktstrom und mit $R_C$ — hat aber eine Grenze: $R_C$ und $I_C$ dürfen nicht so groß werden, dass der Arbeitspunkt wandert.[^wp-emitterschaltung]

Bleibt $R_E$ **ungeblockt** (kein Kondensator parallel), wirkt er als Gegenkopplung: $v_U\approx -R_C/R_E$. Das ist eine bewusste Verstärkungs-Verringerung zugunsten von Stabilität und kleinerem Klirrfaktor — Beispiel $R_C=2{,}2$ kΩ, $R_E=470$ Ω: $v_U\approx-4{,}6$ (bis $-4{,}7$).`,
    },
    {
      id: 'calc-vu', type: 'numeric', title: 'Verstärkung aus Messwerten',
      question: String.raw`Bei einer Messung ändert sich $U_{BE}$ um $40\,\text{mV}$ und $U_{CE}$ um $4\,\text{V}$. Wie groß ist der Betrag der Spannungsverstärkung?`,
      answer: 100, tolerance: 1,
      explain: String.raw`$|v_U|=\Delta U_{CE}/\Delta U_{BE}=4\,\text{V}/0{,}04\,\text{V}=100$ (mit Phasendrehung also $-100$).`,
    },
    {
      id: 'calc-gm', type: 'numeric', title: 'Steilheit',
      question: String.raw`Wie groß ist die Steilheit $g_m=I_C/U_T$ bei $I_C=2\,\text{mA}$ und $U_T=25{,}85\,\text{mV}$, in mS?`,
      answer: 77.4, tolerance: 0.5, unit: 'mS',
      explain: String.raw`$g_m=2\,\text{mA}/25{,}85\,\text{mV}=77{,}4\,\text{mS}$. Mit $R_C=1\,\text{k}\Omega$ ergibt sich $v_U\approx-g_mR_C=-77$.`,
    },
    {
      id: 'calc-gegen', type: 'numeric', title: 'Verstärkung mit Gegenkopplung',
      question: String.raw`Eine Emitterschaltung hat $R_C=2{,}2\,\text{k}\Omega$ und einen **ungeblockten** Emitterwiderstand $R_E=470\,\Omega$. Wie groß ist der Betrag der Spannungsverstärkung etwa?`,
      answer: 4.7, tolerance: 0.2,
      hint: String.raw`$|v_U|\approx R_C/R_E$ (der Anteil $1/g_m$ von nur wenigen Ω ist hier vernachlässigbar).`,
      explain: String.raw`$|v_U|\approx2200/470=4{,}7$ (genauer $R_C/(R_E+1/g_m)\approx4{,}6$). Trotz des starken Transistors bleibt die Verstärkung klein — dafür ist sie stabil und unabhängig vom Transistor.`,
    },
    {
      id: 'viz-ce', type: 'viz', viz: 'ce-amplifier', title: 'Emitterschaltung im Labor',
      intro: String.raw`Der Verstärker mit Basisspannungsteiler ($R_1$, $R_2$), Kollektorwiderstand $R_C$, Emitterwiderstand $R_E$ (optional mit Kondensator $C_E$ überbrückt) und Koppelkondensatoren. Das Oszilloskop zeigt das Eingangs- (u₁) und Ausgangssignal (u₂). Darunter: Gleichspannungs-Arbeitspunkt, $v_U$, Ausgangs-Spitze-Spitze und Klirrfaktor. Mit den Presets *zu tief*, *Ausgangslage*, *zu hoch* siehst du Clipping.`,
      params: { mode: 'amp', targetVpp: 1 },
      task: String.raw`Stelle den Arbeitspunkt **mittig** ein ($U_{CE}$ zwischen 40 % und 65 % von $U_B$) und erreiche **1 V$_{SS}$** am Ausgang mit weniger als 5 % Klirrfaktor. Tipp: $C_E$ erhöht die Verstärkung; $R_2$ verschiebt den Arbeitspunkt.`,
      caption: 'Beobachte: u₂ ist gegenüber u₁ um 180° gedreht, und bei zu großer Eingangsamplitude werden Maxima oder Minima abgeschnitten.',
    },
    {
      id: 'quiz-leistung', type: 'quiz', title: 'Was ist Leistungsverstärkung?',
      question: 'Was versteht man in der Elektronik unter Leistungsverstärkung?',
      options: [
        { text: 'Die Ausgangsleistung ist größer als die Eingangsleistung; dazu ist eine Spannungsquelle (Versorgung) notwendig.', correct: true, why: 'Die zusätzliche Leistung kommt aus der Versorgung, das Eingangssignal steuert nur.' },
        { text: 'Die Ausgangsleistung ist größer als die Eingangsleistung, obwohl keine Spannungsquelle notwendig ist.', correct: false, why: 'Energie kann nicht aus dem Nichts entstehen.' },
        { text: 'Die Ausgangsleistung ist gleich der Eingangsleistung.', correct: false, why: 'Das wäre keine Verstärkung.' },
        { text: 'Die Ausgangsspannung wird immer um den Faktor 10 größer.', correct: false, why: 'Verstärkung kann jeden Wert haben; Leistungsverstärkung meint die Leistung.' },
      ],
    },
    {
      id: 'quiz-phase', type: 'quiz', title: 'Phasenlage der Emitterschaltung',
      question: 'Welche Phasenlage hat das Ausgangssignal der Emitterschaltung gegenüber dem Eingangssignal?',
      options: [
        { text: '180° — das Signal wird invertiert.', correct: true, why: 'Mehr Basisstrom → mehr $I_C$ → größerer Spannungsabfall an $R_C$ → kleinere Kollektorspannung.' },
        { text: '0° — Eingangs- und Ausgangssignal sind in Phase.', correct: false, why: 'Das gilt für die Kollektorschaltung (Emitterfolger), nicht für die Emitterschaltung.' },
        { text: '90° voreilend.', correct: false, why: 'Eine 90°-Verschiebung entsteht bei R-C-Gliedern, nicht in der Grundschaltung bei Mittenfrequenz.' },
        { text: '270°.', correct: false, why: 'Die Phase ist genau 180°.' },
      ],
    },
    {
      id: 'order-ap', type: 'order', title: 'Arbeitspunkt einstellen',
      prompt: 'In welcher Reihenfolge rechnest du den Gleichspannungs-Arbeitspunkt?',
      items: [
        'Basisspannung aus dem Spannungsteiler: $U_B = U_\\text{Bat}\\,R_2/(R_1+R_2)$',
        'Emitterspannung: $U_E = U_B - 0{,}7\\,\\text{V}$',
        'Emitterstrom: $I_E = U_E/R_E\\approx I_C$',
        'Kollektorspannung: $U_C = U_\\text{Bat}-I_C R_C$',
        'Ruhespannung: $U_{CE}=U_C-U_E$ — liegt sie etwa in der Mitte?',
      ],
      explain: 'Das Verfahren geht von „außen nach innen": erst die Basisspannung festlegen, dann folgt alles andere durch Differenzen und Ohm. Die Stromverstärkung B taucht nicht auf — das ist der Sinn der Gegenkopplung durch R_E.',
    },
    {
      id: 'koppel', type: 'text', title: 'Koppelkondensatoren und Emitterkondensator',
      md: String.raw`
Das Eingangssignal ist eine Wechselspannung um 0 V; der Transistor will aber seine Basisspannung bei $U_B\approx2$ V haben. Ein **Koppelkondensator** ($C_1$) am Eingang trennt die Gleichspannung ab und lässt nur das Wechselsignal durch — ebenso am Ausgang ($C_2$). Er bildet zusammen mit dem Eingangswiderstand der Stufe einen **[Hochpass](wiki:Hochpass|High-pass filter)** (siehe Filter-Lektion): Unterhalb seiner Grenzfrequenz $f_g=1/(2\pi R_\text{ein}C_1)$ wird das Signal geschwächt — daher werden die Koppel-Cs für die tiefste Signalfrequenz groß genug gewählt.

Der **Emitterkondensator** $C_E$ parallel zu $R_E$ schließt den Emitter für das Wechselsignal gegen Masse kurz (für Gleichstrom bleibt $R_E$ wirksam). Damit gilt für den Gleichstrom weiter die Gegenkopplung, für das Signal aber die volle Verstärkung $v_U\approx-g_mR_C$. Preis: Die Verstärkung wird temperatur- und streuungsabhängiger und verzerrt stärker.`,
    },
    {
      id: 'warning-ap', type: 'callout', tone: 'warning', title: 'Vorsicht: Der Transistor erzeugt keine Energie',
      md: String.raw`
- „Der Transistor verstärkt ohne Energiequelle." — Falsch: Die Leistung stammt aus der Versorgung.
- „Die Emitterschaltung verstärkt ohne Phasendrehung." — Falsch: **180°**.
- „Der Arbeitspunkt ist egal, die Verstärkung zählt." — Falsch: Ein falscher Arbeitspunkt führt zu abgeschnittenen Halbwellen (Verzerrung), selbst wenn $v_U$ hoch ist.
- „$U_{BE}$ kann man beliebig erhöhen." — Falsch: Bei ≈ 0,7 V steigt der Strom exponentiell; das Signal an der Basis muss im Millivolt-Bereich bleiben.`,
    },
    {
      id: 'mission', type: 'callout', tone: 'mission', title: 'Prüfung & Funkpraxis',
      md: String.raw`
- **Prüfungsbezug:** ED401 (Leistungsverstärkung braucht eine Spannungsquelle), ED402 (eine Verstärkerschaltung als NF-Verstärker erkennen), ED403 (HF-Leistungsverstärker heben das Sendesignal an). Für die Prüfung gilt: Verstärkung als Verhältnis von Aus- zu Eingang — und dass ohne Versorgung keine Verstärkung möglich ist.
- **Praxis:** Jedes Funkgerät hat Verstärkerstufen: NF-Vorverstärker für das Mikrofon, HF-Verstärker im Empfänger, ZF-Verstärker, Treiber und Endstufe im Sender. Die Emitterschaltung ist die einfachste; für HF nimmt man meist die Basisschaltung (nächste Lektion).
- **Rechentipp:** Arbeitspunkt-Faustregel: $U_E\approx1\ldots2$ V über $R_E$ für die Stabilität, $U_{CE}\approx U_B/2$ für maximale Aussteuerung, Querstrom durch den Teiler etwa das 5- bis 10-fache von $I_B$.`,
    },
    {
      id: 'german', type: 'callout', tone: 'german', title: 'Vokabeln',
      md: String.raw`
<table><tr><th>Deutsch</th><th>English</th><th>Notation</th></tr>
<tr><td>Emitterschaltung</td><td>common-emitter amplifier</td><td></td></tr>
<tr><td>Arbeitspunkt</td><td>operating (quiescent) point, Q-point</td><td>$I_C$, $U_{CE}$</td></tr>
<tr><td>Spannungsverstärkung</td><td>voltage gain</td><td>$v_U=u_2/u_1$</td></tr>
<tr><td>Stromverstärkung</td><td>current gain</td><td>$v_I=\beta$</td></tr>
<tr><td>Leistungsverstärkung</td><td>power gain</td><td>$v_P=v_Uv_I$</td></tr>
<tr><td>Gegenkopplung</td><td>negative feedback</td><td></td></tr>
<tr><td>Steilheit</td><td>transconductance</td><td>$g_m$</td></tr>
<tr><td>Koppelkondensator</td><td>coupling (DC-blocking) capacitor</td><td>$C_1$, $C_2$</td></tr>
<tr><td>Aussteuerung, Übersteuerung</td><td>drive level, overdrive (clipping)</td><td></td></tr></table>`,
    },
    {
      id: 'recall-mitte', type: 'recall', title: 'Erkläre es mit eigenen Worten',
      prompt: 'Warum wählt man den Arbeitspunkt in der **Mitte der Lastgeraden**? Was passiert, wenn er zu hoch oder zu tief liegt?',
      answer: 'Das Signal schwingt symmetrisch um den Arbeitspunkt. In der Mitte hat der Ausgang nach oben (Richtung Sperren, $U_{CE}\\to U_B$) und nach unten (Richtung Sättigung, $U_{CE}\\to0{,}2$ V) gleich viel Platz, also maximale unverzerrte Aussteuerung. Liegt der Punkt zu nah an der Sättigung, werden die unteren Halbwellen abgeschnitten, liegt er zu nah am Sperren, die oberen — es entstehen Verzerrungen (Clipping, Klirrfaktor).',
      hints: ['Wo liegen die beiden Grenzen, an die das Signal stößt?'],
      cards: ['ap-mitte', 'vu-def'],
    },
  ],
  cards: [
    { id: 'vu-def', front: 'Spannungsverstärkung der Emitterschaltung?', back: '$v_U=\\Delta U_{CE}/\\Delta U_{BE}=u_2/u_1$ (negativ: 180° Phasendrehung).' },
    { id: 'phase-e', front: 'Phasenlage der Emitterschaltung?', back: '180° (Invertierung).' },
    { id: 'ap-def', front: 'Was ist der Arbeitspunkt?', back: 'Ruhestrom $I_C$ und Ruhespannung $U_{CE}$ ohne Signal.' },
    { id: 'ap-mitte', front: 'Wo soll der Arbeitspunkt liegen?', back: 'In der Mitte der Lastgeraden ($U_{CE}\\approx U_B/2$), damit beide Halbwellen unverzerrt aussteuerbar sind.' },
    { id: 'ap-rechnung', front: 'Arbeitspunkt mit Basisspannungsteiler?', back: '$U_B=U_\\text{Bat}R_2/(R_1+R_2)$, $U_E=U_B-0{,}7$ V, $I_C\\approx U_E/R_E$, $U_{CE}=U_\\text{Bat}-I_C(R_C+R_E)$.' },
    { id: 'gegenkopplung-re', front: 'Wozu dient $R_E$?', back: 'Gegenkopplung: stabilisiert den Arbeitspunkt (unabhängig von $B$ und Temperatur) und reduziert Verzerrungen; senkt $v_U$ auf $\\approx-R_C/R_E$.' },
    { id: 'ce-block', front: 'Wozu der Emitterkondensator $C_E$?', back: 'Schließt $R_E$ für Wechselsignale kurz: volle Verstärkung $v_U\\approx-g_mR_C$; Gleichstromarbeitspunkt bleibt stabilisiert.' },
    { id: 'gm', front: 'Steilheit des Bipolartransistors?', back: '$g_m=I_C/U_T$ mit $U_T\\approx25{,}85$ mV (27 °C): 2 mA → 77,4 mS.' },
    { id: 'koppel-c', front: 'Wozu Koppelkondensatoren?', back: 'Trennen die Gleichspannung ab, lassen das Signal durch; bilden mit dem Eingangswiderstand einen Hochpass.' },
    { id: 'clipping', front: 'Was ist Clipping?', back: 'Abschneiden der Halbwellen an Sättigung oder Sperrbereich bei falschem Arbeitspunkt oder zu großem Eingangssignal.' },
    { id: 'leistungsverstaerkung', front: 'Leistungsverstärkung — woher kommt die Energie?', back: 'Aus der Versorgungsspannungsquelle; das Eingangssignal steuert nur (ED401).' },
  ],
};
