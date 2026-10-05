// Taschenrechner-Trainer (Prüfungsbrücke): typische Rechenwege der Formelsammlung mit EE-/EXP-Taste, Klammern, Wurzel, log.
// params: { need?: Serie richtiger Antworten (Standard 5) }
import { trainer, pick, de } from './_trainer.js';

const E12 = [1, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2];
const e = (m, ex) => `${de(m)} EE ${ex}`;      // Taschenrechner-Schreibweise: 2,2 EE -6

const modes = [
  { id: 'par', label: 'Parallelschaltung', gen() {
    const a = pick(E12) * pick([10, 100, 1000]), b = pick(E12) * pick([10, 100, 1000]);
    const r = a * b / (a + b);
    return { q: `Zwei Widerstände $R_1 = ${de(a)}\\,\\Omega$ und $R_2 = ${de(b)}\\,\\Omega$ liegen parallel. Wie groß ist $R_\\mathrm{G}$?`, unit: 'Ω', ans: r,
      explain: `$R_\\mathrm{G} = \\dfrac{R_1\\cdot R_2}{R_1+R_2}$ (Formelsammlung, „Bei 2 Widerständen gilt“). Die Summe im Nenner muss in Klammern stehen oder du rechnest erst den Zähler, dann ÷ Summe.`,
      keys: `( ${de(a)} × ${de(b)} ) ÷ ( ${de(a)} + ${de(b)} ) =` };
  } },
  { id: 'f0', label: 'Resonanzfrequenz', gen() {
    const L = pick([0.47, 1, 2.2, 4.7, 10]) * 1e-6, C = pick([10, 22, 47, 100, 220, 470]) * 1e-12;
    const f = 1 / (2 * Math.PI * Math.sqrt(L * C)) / 1e6;
    const ls = de(L * 1e6), cs = C * 1e12;
    return { q: `Ein Schwingkreis hat $L = ${ls}\\,\\mu\\text{H}$ und $C = ${cs}\\,\\text{pF}$. Berechne $f_0$.`, unit: 'MHz', ans: f,
      explain: `$f_0 = \\dfrac{1}{2\\pi\\sqrt{L\\cdot C}}$. In Grundeinheiten: $L = ${ls}\\cdot10^{-6}$ H, $C = ${cs}\\cdot10^{-12}$ F — das Ergebnis in Hz durch $10^6$ teilen ergibt MHz.`,
      keys: `1 ÷ ( 2 × π × √( ${e(L * 1e6, -6)} × ${e(cs, -12)} ) ) =   (→ ÷ 1 EE 6 für MHz)` };
  } },
  { id: 'xl', label: 'Blindwiderstand', gen() {
    const f = pick([1, 3.5, 7.1, 14.2, 28, 145]), isL = Math.random() < 0.5;
    if (isL) { const L = pick([0.47, 1, 2.2, 4.7]) * 1e-6, x = 2 * Math.PI * f * 1e6 * L;
      return { q: `Wie groß ist der Blindwiderstand einer Spule mit $L = ${de(L * 1e6)}\\,\\mu\\text{H}$ bei $f = ${de(f)}\\,\\text{MHz}$?`, unit: 'Ω', ans: x,
        explain: `$X_\\mathrm{L} = \\omega\\cdot L = 2\\pi f L$ mit $f = ${de(f)}\\cdot10^6$ Hz.`, keys: `2 × π × ${e(f, 6)} × ${e(L * 1e6, -6)} =` }; }
    const C = pick([22, 47, 100, 220, 470]) * 1e-12, x = 1 / (2 * Math.PI * f * 1e6 * C);
    return { q: `Wie groß ist der Blindwiderstand eines Kondensators mit $C = ${C * 1e12}\\,\\text{pF}$ bei $f = ${de(f)}\\,\\text{MHz}$?`, unit: 'Ω', ans: x,
      explain: `$X_\\mathrm{C} = \\dfrac{1}{\\omega\\cdot C} = \\dfrac{1}{2\\pi f C}$. Der Nenner gehört in Klammern, sonst teilst du nur durch 2.`, keys: `1 ÷ ( 2 × π × ${e(f, 6)} × ${e(C * 1e12, -12)} ) =` };
  } },
  { id: 'db', label: 'Dezibel', gen() {
    if (Math.random() < 0.5) { const p1 = pick([1, 2, 5, 10]), p2 = pick([20, 50, 100, 200, 500]), g = 10 * Math.log10(p2 / p1);
      return { q: `Ein Verstärker liefert bei $P_1 = ${p1}\\,\\text{W}$ am Eingang $P_2 = ${p2}\\,\\text{W}$ am Ausgang. Welches Verstärkungsmaß $g$ hat er?`, unit: 'dB', ans: g,
        explain: `$g = 10\\cdot\\log_{10}\\!\\left(\\dfrac{P_2}{P_1}\\right)$ — erst teilen, dann die Taste „log“, dann mal 10.`, keys: `10 × log ( ${p2} ÷ ${p1} ) =`, tol: 0.03 }; }
    const g = pick([3, 6, 7, 9, 13, 17, 23]), f = 10 ** (g / 10);
    return { q: `Ein Gewinn von $g = ${g}\\,\\text{dB}$ entspricht welchem Leistungsverhältnis $P_2/P_1$?`, unit: '', ans: f,
      explain: `Umkehrung: $P_2/P_1 = 10^{g/10\\,\\text{dB}}$ — Taste „10^x“ (oft Shift + log) mit ${g} ÷ 10 als Exponent.`, keys: `10 ^ ( ${g} ÷ 10 ) =`, tol: 0.03 };
  } },
  { id: 'wl', label: 'Wellenlänge', gen() {
    const f = pick([3.65, 7.1, 14.2, 21.3, 28.5, 145.5, 438.8]);
    return { q: `Welche Wellenlänge gehört zu $f = ${de(f)}\\,\\text{MHz}$? (Nutze $\\lambda[\\text{m}]\\approx 300/f[\\text{MHz}]$.)`, unit: 'm', ans: 300 / f,
      explain: `Die Näherung aus der Formelsammlung: $\\lambda[\\text{m}] \\approx \\dfrac{300}{f[\\text{MHz}]}$. Die Frequenz muss dabei in MHz eingesetzt werden.`, keys: `300 ÷ ${de(f)} =`, tol: 0.02 };
  } },
];

export default function mount(stage, { params = {}, complete, md }) {
  trainer(stage, { complete, md, need: params.need ?? 5, modes, goal: `${params.need ?? 5} Aufgaben in Folge richtig (Toleranz 2 %)` });
}
