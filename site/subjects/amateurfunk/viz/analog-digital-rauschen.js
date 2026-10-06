// Analog vs. digital: Ein Signal läuft durch n Verstärker-/Relaisstufen, jede fügt Rauschen hinzu.
// Analog: Rauschen summiert sich (σ·√n). Digital: jede Stufe entscheidet neu „0 oder 1“ und erneuert das Signal (Regeneration).
// params: { }
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { chart, h, txt, line, rect, poly, hash, dec } from './_funk.js';

const BITS = [1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1];
const SP = 24;   // Abtastwerte pro Bit

const gauss = (k, seed) => { const u1 = Math.max(1e-9, hash(k * 2 + seed * 977)), u2 = hash(k * 2 + 1 + seed * 977); return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2); };

export default function mount(stage, { complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const ca = chart(root, { h: 150, x: [0, BITS.length], y: [-2.2, 2.2], yticks: [-1, 0, 1], aria: 'Analoges Signal nach mehreren Stufen mit Rauschen' });
  const cd = chart(root, { h: 130, x: [0, BITS.length], y: [-1.6, 1.6], yticks: [-1, 1], yfmt: v => (v > 0 ? '1' : '0'), aria: 'Digitales Signal nach mehreren Stufen: erkannte Bits' });
  let seed = 1;
  const ui = controls(root, [
    { id: 'n', label: 'Stufen (Verstärker, Relais, Weiterleitungen)', min: 1, max: 8, step: 1, value: 4, format: v => String(v), digits: 0 },
    { id: 'sig', label: 'Rauschen pro Stufe', min: 5, max: 80, step: 5, value: 20, format: v => v + ' %', digits: 0 },
    { id: 'new', type: 'button', label: 'Rauschen neu würfeln', onClick: () => { seed++; run(); } },
  ], run);
  const out = readout(root, [{ id: 'an', label: 'Analog: Rauschen am Ende', hl: true }, { id: 'di', label: 'Digital: Bitfehler', hl: true }]);
  const g = goals(root, [
    { id: 'an', label: 'Analog: ≥ 5 Stufen und ≥ 20 % Rauschen pro Stufe (Signal sichtlich verrauscht)' },
    { id: 'ok', label: 'Digital: dieselbe Strecke, aber 0 Bitfehler' },
    { id: 'cliff', label: 'Digitale Grenze finden: so viel Rauschen, dass auch digital Bitfehler auftreten' },
  ], () => complete?.());

  function run() {
    const { n, sig } = ui.values, s = sig / 100;
    ca.clear(); cd.clear();
    const total = BITS.length * SP, pa = [], ref = [];
    for (let k = 0; k < total; k++) {
      const clean = BITS[Math.floor(k / SP)] ? 1 : -1;
      let noise = 0; for (let st = 0; st < n; st++) noise += s * gauss(k + st * 5003, seed);
      ref.push([ca.X(k / SP), ca.Y(clean)]); pa.push([ca.X(k / SP), ca.Y(clean + noise)]);
    }
    ca.add(poly(pa, { color: 'var(--accent)', w: 1.2 }), poly(ref, { color: 'var(--ink-2)', w: 1.2, dash: '5 4', opacity: .7 }), txt(ca.m.l + 4, ca.m.t + 8, 'Analog (gestrichelt: Original)', { size: 12 }));
    // Digital: je Stufe Mittelwert über das Bit + Rauschen, Entscheidung an der Schwelle 0, danach sauberes Signal
    let cur = BITS.slice(), errors = 0; const marks = [];
    for (let st = 0; st < n; st++) cur = cur.map((b, i) => { const v = (b ? 1 : -1) + s * gauss(i + st * 131 + 7, seed + 100); return v > 0 ? 1 : 0; });
    cur.forEach((b, i) => { const bad = b !== BITS[i]; if (bad) errors++; marks.push(rect(cd.X(i) + 2, cd.Y(b ? 1 : -1) - 10, cd.X(1) - cd.X(0) - 4, 20, { fill: bad ? 'var(--bad)' : 'var(--good)', fo: bad ? .85 : .35, r: 3 })); });
    cd.add(line(cd.m.l, cd.Y(0), cd.W - cd.m.r, cd.Y(0), { color: 'var(--warn)', dash: '4 3', w: 1.2 }), marks, txt(cd.m.l + 4, cd.m.t + 8, 'Digital: Bits nach der Entscheidung', { size: 12 }));
    BITS.forEach((b, i) => cd.add(txt(cd.X(i + 0.5), cd.Y(-1.35), String(b), { anchor: 'middle', size: 12 })));
    const sn = s * Math.sqrt(n);
    out.set({ an: `σ·√n ≈ ${dec(sn * 100, 0)} % der Signalhöhe`, di: `${errors} von ${BITS.length}` });
    if (n >= 5 && sig >= 20) g.reach('an');
    if (n >= 5 && sig >= 20 && errors === 0) g.reach('ok');
    if (errors > 0) g.reach('cliff');
  }
  run();
}
