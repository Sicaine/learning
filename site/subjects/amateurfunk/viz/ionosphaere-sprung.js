// Ionosphäre und Sprungdistanz: Strahl von der Sendeantenne (Abstrahlwinkel α), Brechung an E- oder F2-Region, Sprungdistanz, Tote Zone,
// MUF (höchste nutzbare Frequenz) und Dämpfung der D-Region am Tag. Tag/Nacht, Sonnenzyklus. Sphärische Geometrie:
//   Einfallswinkel φ an der Schicht der Höhe h:  sin φ = R·cos α / (R + h);  Sprung = 2·R·(90° − α − φ)  (Bogenmaß × Erdradius);
//   Brechung, wenn f ≤ f_krit / cos φ  (f_krit = kritische Frequenz der Schicht);  MUF(α) = f_krit / cos φ.
// Die kritischen Frequenzen sind Beispielwerte mittlerer Breiten (qualitativ richtig, keine Vorhersage); die D-Dämpfung ist eine grobe 1/f²-Abschätzung.
import { h, s } from '../../../assets/js/vizkit/base.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';

const R = 6371, D2R = Math.PI / 180;
const de = (x, d = 1) => (+x.toFixed(d)).toString().replace('.', ',');
const FOF2 = { day: [5.5, 8, 11.5], night: [2.5, 3.5, 5] };      // Minimum, mittel, Maximum der Sonnenaktivität
const FOE = 2.5;                                                   // E-Region, nur tagsüber
const H = { E: 110, Fday: 300, Fnight: 350, D: 70 };
const BANDS = [['160 m', 1.85], ['80 m', 3.65], ['40 m', 7.1], ['20 m', 14.2], ['15 m', 21.2], ['10 m', 28.5]];
const KD = [80, 100, 130];

const phiAt = (alpha, hk) => Math.asin(Math.min(1, R * Math.cos(alpha * D2R) / (R + hk)));
const hopKm = (alpha, hk) => 2 * R * (Math.PI / 2 - alpha * D2R - phiAt(alpha, hk));

function analyse(c, alpha, f) {
  const day = c.tod === 'day', hF = day ? H.Fday : H.Fnight, fc = FOF2[c.tod][c.sun];
  const mufE = day ? FOE / Math.cos(phiAt(alpha, H.E)) : 0, mufF = fc / Math.cos(phiAt(alpha, hF));
  let layer = null, hk = 0;
  if (day && f <= mufE) { layer = 'E'; hk = H.E; } else if (f <= mufF) { layer = 'F2'; hk = hF; }
  const absorb = day ? Math.min(99, 2 * KD[c.sun] / Math.cos(phiAt(alpha, H.D)) / (f * f)) : 0;
  return { layer, hk, hop: layer ? hopKm(alpha, hk) : null, mufE, mufF, fc, absorb, hF };
}

export default function mount(stage, { params = {}, complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const W = 360, Hh = 235;
  const svg = s('svg', { class: 'vz-svg', viewBox: `0 0 ${W} ${Hh}`, role: 'img', 'aria-label': 'Funkwege über die Ionosphäre', style: 'max-width:640px;margin:0 auto;background:var(--surface-2);border:1px solid var(--line);border-radius:12px' });
  root.append(svg);
  const ui = controls(root, [
    { id: 'tod', type: 'seg', label: 'Tageszeit', options: [['day', 'Tag'], ['night', 'Nacht']], value: params.tod || 'day' },
    { id: 'sun', type: 'seg', label: 'Sonnenfleckenzyklus', options: [[0, 'Minimum'], [1, 'mittel'], [2, 'Maximum']], value: 1 },
    { type: 'presets', label: 'Band', items: BANDS.map(([l, f]) => ({ label: l, values: { f } })) },
    { id: 'f', label: 'Frequenz', min: 1.8, max: 30, scale: 'log', value: params.f ?? 14.2, format: v => de(v, v < 10 ? 2 : 1) + ' MHz' },
    { id: 'al', label: 'Abstrahlwinkel α über dem Horizont', min: 2, max: 90, step: 1, value: params.al ?? 20, format: v => v + '°' },
    { id: 'fan', type: 'toggle', label: 'Strahlenfächer zeigen', value: false },
  ], run);
  const out = readout(root, [
    { id: 'st', label: 'Raumwelle', hl: true }, { id: 'hop', label: 'Sprungdistanz' }, { id: 'muf', label: 'MUF bei diesem Winkel', hl: true }, { id: 'skip', label: 'Tote Zone endet bei' }, { id: 'abs', label: 'Dämpfung D-Region' }, { id: 'fc', label: 'kritische Frequenz F2' },
  ]);
  const g = goals(root, [
    { id: 'n80', label: 'Nachts auf 80 m eine Raumwelle über die F2-Region erhalten' },
    { id: 'd10', label: 'Am Tag im Sonnenfleckenmaximum auf 10 m über die F2-Region' },
    { id: 'muf', label: 'Die MUF überschreiten: die Welle durchdringt die Ionosphäre' },
    { id: 'dz', label: 'Die Tote Zone verkleinern: einen steileren Strahl mit kurzem Sprung (unter 1500 km) finden' },
  ], () => complete?.());
  const note = h('div', { class: 'vz-note' }); root.append(note);

  // Geometrie des Bildes: Erdmittelpunkt weit unter dem Bildrand, Höhen 2,5-fach überzeichnet
  const RP = 270, CXP = W / 2, CYP = 168 + RP, EX = 2.5;
  const P = (psi, rk) => { const r = RP * (1 + EX * (rk - R) / R); return [CXP + r * Math.sin(psi), CYP - r * Math.cos(psi)]; };
  const arc = (rk, a0, a1) => { let d = ''; for (let i = 0; i <= 60; i++) { const [x, y] = P(a0 + (a1 - a0) * i / 60, rk); d += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1); } return d; };
  // gerader Strahl im wahren Raum zwischen zwei Punkten (Winkel ψ, Radius r), dann auf die überzeichnete Darstellung abgebildet
  const segPath = (psi0, r0, psi1, r1) => {
    const ax = r0 * Math.sin(psi0), ay = r0 * Math.cos(psi0), bx = r1 * Math.sin(psi1), by = r1 * Math.cos(psi1);
    let d = '';
    for (let i = 0; i <= 40; i++) { const t = i / 40, x = ax + (bx - ax) * t, y = ay + (by - ay) * t; const [px, py] = P(Math.atan2(x, y), Math.hypot(x, y)); d += (i ? 'L' : 'M') + px.toFixed(1) + ' ' + py.toFixed(1); }
    return d;
  };

  let live = false;
  function run() {
    const v = ui.values, day = v.tod === 'day', fc = FOF2[v.tod][v.sun];
    const a = analyse(v, v.al, v.f);
    const kids = [];
    const PSI0 = -37 * D2R, PSI1 = 37 * D2R;
    // Schichten
    const layers = [];
    if (day) layers.push(['D', H.D, 'var(--bad)', 'D (50–90 km): dämpft']);
    if (day) layers.push(['E', H.E, 'var(--warn)', 'E (90–130 km)']);
    layers.push(['F', a.hF, 'var(--accent)', day ? 'F2 (bis ≈ 450 km)' : 'F (F1 und F2 vereint)']);
    kids.push(s('path', { d: arc(R, PSI0 - 0.1, PSI1 + 0.1) + ` L ${W} ${Hh} L 0 ${Hh} Z`, fill: 'color-mix(in oklab, var(--good) 18%, var(--surface))', stroke: 'var(--ink-2)', 'stroke-width': 1.5 }));
    // D-Region als Band
    for (const [id, hk, col, lab] of layers) {
      const wd = id === 'D' ? 2.5 : id === 'E' ? 2.2 : 2.6;
      kids.push(s('path', { d: arc(R + hk, PSI0 - 0.1, PSI1 + 0.1), fill: 'none', stroke: col, 'stroke-width': id === 'D' ? 5 : 4, opacity: id === 'D' ? .25 + Math.min(.5, a.absorb / 100) : .45, 'stroke-linecap': 'round' }));
    }
    // Legende oben links
    layers.slice().reverse().forEach(([id, hk, col, lab], i) => { kids.push(s('rect', { x: 8, y: 8 + i * 13, width: 12, height: 5, rx: 2, fill: col, opacity: .7 }), s('text', { x: 25, y: 14 + i * 13, 'font-size': 10, fill: col, 'font-weight': 700 }, lab)); });
    // Strahlen
    const ray = (alpha, col, width, op, opts = {}) => {
      const an = analyse(v, alpha, v.f);
      let psi = PSI0;
      if (!an.layer) {
        // durchdringt: gerade Linie bis oberhalb der Schichten
        const hk = an.hF + 250, ph = phiAt(alpha, hk), th = Math.PI / 2 - alpha * D2R - ph;
        kids.push(s('path', { d: segPath(psi, R, psi + th, R + hk), fill: 'none', stroke: col, 'stroke-width': width, 'stroke-dasharray': '5 4', opacity: op, 'stroke-linecap': 'round' }));
        if (opts.label) { const [x, y] = P(psi + th, R + hk); kids.push(s('text', { x: Math.min(x + 4, 300), y: Math.max(y - 4, 10), 'font-size': 10, fill: 'var(--bad)', 'font-weight': 800 }, 'durchdringt die Ionosphäre')); }
        return an;
      }
      const hop = an.hop / R;   // Bogenmaß je Sprung
      for (let n = 0; n < 6 && psi < PSI1; n++) {
        const half = hop / 2;
        kids.push(s('path', { d: segPath(psi, R, psi + half, R + an.hk) + segPath(psi + half, R + an.hk, psi + hop, R).replace('M', 'L'), fill: 'none', stroke: col, 'stroke-width': width, opacity: op, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }));
        psi += hop;
        if (psi < PSI1 + 0.05) { const [x, y] = P(psi, R); kids.push(s('circle', { cx: x, cy: y - 1, r: opts.main ? 3.2 : 2, fill: col, opacity: op })); }
        if (!opts.main && n >= 0) break;
        if (n === 0 && opts.main) { /* weitere Sprünge zeigen */ }
      }
      return an;
    };
    // Fächer
    let skip = Infinity;
    for (let al = 2; al <= 90; al += 1) { const an = analyse(v, al, v.f); if (an.layer && an.hop < skip) skip = an.hop; }
    if (v.fan) for (const al of [3, 8, 15, 25, 40, 60, 80]) ray(al, 'var(--accent-2)', 1.2, .7);
    const main = ray(v.al, 'var(--accent)', 2.6, 1, { main: true, label: true });
    // Bodenwelle und Tote Zone (Skala: wahre Entfernung)
    const gw = Math.min(2500, 160 * Math.pow(3.65 / v.f, 1.5));
    const yg = Hh - 22;
    const xOf = d => CXP + RP * (PSI0 + d / R) * 1;     // grob: Bogenlänge
    const x0 = P(PSI0, R)[0];
    const xd = km => x0 + km / R * RP;
    kids.push(s('rect', { x: x0 - 2, y: yg, width: Math.max(2, xd(gw) - x0), height: 7, fill: 'var(--good)', opacity: .85 }));
    if (Number.isFinite(skip) && skip > gw) kids.push(s('rect', { x: xd(gw), y: yg, width: xd(skip) - xd(gw), height: 7, fill: 'var(--bad)', opacity: .8 }), s('text', { x: (xd(gw) + xd(skip)) / 2, y: yg + 18, 'text-anchor': 'middle', 'font-size': 9, fill: 'var(--bad)', 'font-weight': 800 }, 'tote Zone'));
    kids.push(s('text', { x: x0 - 4, y: yg + 18, 'font-size': 9, fill: 'var(--good)', 'font-weight': 800 }, 'Bodenwelle'));
    // Sender
    const [tx, ty] = P(PSI0, R);
    kids.push(s('line', { x1: tx, y1: ty, x2: tx, y2: ty - 12, stroke: 'var(--ink)', 'stroke-width': 3 }), s('circle', { cx: tx, cy: ty - 14, r: 3, fill: 'var(--accent)' }));
    svg.replaceChildren(...kids);

    // Anzeigen
    const status = main.layer ? (a.absorb > 40 ? `an ${main.layer} gebrochen, aber von D stark gedämpft` : `an ${main.layer === 'E' ? 'der E-Region' : 'der F2-Region'} gebrochen`) : 'durchdringt: f liegt über der MUF';
    out.set({
      st: status, hop: main.layer ? `${de(main.hop, 0)} km` : '–', muf: `${de(Math.max(main.layer === 'E' ? main.mufE : 0, main.mufF), 1)} MHz`,
      skip: Number.isFinite(skip) ? `≈ ${de(skip, 0)} km` : 'keine Rückkehr', abs: day ? `${de(a.absorb, 0)} dB` : 'keine (D-Region fehlt)', fc: `${de(fc, 1)} MHz`,
    });
    note.textContent = day ? 'Tag: die D-Region ist da und dämpft vor allem tiefe Frequenzen; E- und F-Region brechen. Beispielwerte, kein Vorhersagemodell.' : 'Nacht: D- und E-Region lösen sich auf, die F-Region bleibt, ihre kritische Frequenz sinkt. Die oberen Bänder schließen zuerst.';
    if (!live) return;
    // Ziele
    if (!day && main.layer === 'F2' && v.f > 3.3 && v.f < 4.1) g.reach('n80');
    if (day && v.sun === 2 && main.layer === 'F2' && v.f > 27 && v.f < 30 && a.absorb < 40) g.reach('d10');
    if (!main.layer) g.reach('muf');
    if (main.layer && main.hop < 1500) g.reach('dz');
  }
  run();
  live = true;
}
