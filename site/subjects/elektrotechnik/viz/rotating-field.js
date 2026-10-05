// Drehfeld-Labor (L50): drei um 120° versetzte Statorströme erzeugen ein rotierendes Magnetfeld; der Läufer folgt mit Schlupf.
// Modell: n_s = 60·f/p, Läuferdrehzahl n = n_s·(1 − s) mit s = 0,2 % (Leerlauf, Reibung) + 3,8 % · Last (Last 100 % = Nennlast → s = 4 %).
// Animation in Zeitlupe (die echten Drehzahlen sind für das Auge viel zu schnell).
// params: { f?: 50, p?: 2, sNom?: 0.04 }
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { animate } from '../../../assets/js/vizkit/anim.js';
import { fmt } from '../../../assets/js/vizkit/si.js';
import { h, s } from '../../../assets/js/vizkit/base.js';

const RAD = Math.PI / 180;

export default function mount(stage, { params = {}, complete }) {
  const SN = params.sNom ?? 0.04;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const row = h('div', { style: 'display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,290px),1fr));gap:12px;align-items:start' }); root.append(row);
  const svgBox = h('div', { class: 'vk-plot' });
  const svg = s('svg', { viewBox: '0 0 320 320', role: 'img', 'aria-label': 'Stator mit Drehfeld und Läufer' });
  svgBox.append(svg);
  const curBox = h('div', { class: 'vk-plot' });
  const csvg = s('svg', { viewBox: '0 0 320 320', role: 'img', 'aria-label': 'Die drei Statorströme' });
  curBox.append(csvg);
  row.append(svgBox, curBox);

  const ui = controls(root, [
    { id: 'f', label: 'Netzfrequenz f', unit: 'Hz', min: 10, max: 100, step: 1, value: params.f ?? 40, digits: 3 },
    { id: 'p', type: 'seg', label: 'Polpaarzahl p', options: [[1, 'p = 1'], [2, 'p = 2'], [3, 'p = 3'], [4, 'p = 4']], value: params.p ?? 1 },
    { id: 'load', label: 'Last (100 % = Nennlast)', unit: '%', min: 0, max: 120, step: 5, value: 0, format: v => Math.round(v) + ' %' },
  ], () => { touched = true; update(); loop.once(); });
  const out = readout(root, [
    { id: 'ns', label: 'Drehfelddrehzahl n_s', hl: true }, { id: 'n', label: 'Läuferdrehzahl n' }, { id: 'sl', label: 'Schlupf s', hl: true },
  ]);
  const note = h('div', { class: 'vz-note' }, 'Zeitlupe: Die Animation läuft etwa 50-mal langsamer als in Wirklichkeit.'); root.append(note);
  const g = goals(root, [
    { id: 'ns', label: 'n_s = 1500 min⁻¹ einstellen (50 Hz, p = 2)' },
    { id: 'idle', label: 'Leerlauf: Läufer fast synchron, aber nie ganz' },
    { id: 'nom', label: 'Nennlast 100 %: Schlupf ≈ 4 % ablesen' },
  ], () => complete?.());

  let touched = false, ns = 1500, n = 1500, sl = 0, thetaF = 0, thetaR = 0;
  function update() {
    const { f, p, load } = ui.values;
    ns = 60 * f / p; sl = 0.002 + (SN - 0.002) * load / 100; n = ns * (1 - sl);
    out.set({ ns: Math.round(ns) + ' min⁻¹', n: Math.round(n) + ' min⁻¹', sl: (sl * 100).toFixed(1).replace('.', ',') + ' %' });
    if (touched && f === 50 && p === 2) {
      g.reach('ns');
      if (load === 0) g.reach('idle');
      if (load === 100 && g.has('ns')) g.reach('nom');
    }
  }
  const sector = (cx, cy, r0, r1, a0, a1) => {
    const p = (r, a) => [cx + r * Math.cos(a * RAD), cy - r * Math.sin(a * RAD)].map(v => v.toFixed(1)).join(' ');
    return `M${p(r1, a0)}A${r1} ${r1} 0 0 0 ${p(r1, a1)}L${p(r0, a1)}A${r0} ${r0} 0 0 1 ${p(r0, a0)}Z`;
  };
  function draw() {
    const { p } = ui.values, cx = 160, cy = 160;
    let html = `<circle cx="${cx}" cy="${cy}" r="146" fill="var(--surface)" stroke="var(--line-2)" stroke-width="2"/>
      <circle cx="${cx}" cy="${cy}" r="112" fill="var(--surface-2)" stroke="var(--line)" stroke-width="1"/>`;
    // Statorspulen: drei Achsen je Polpaar (nur Markierung am Rand)
    const names = ['U', 'V', 'W'];
    for (let k = 0; k < 3; k++) for (let m = 0; m < p; m++) {
      const a = (k * 120 / p + m * 360 / p) * RAD, x = cx + 129 * Math.cos(a), y = cy - 129 * Math.sin(a);
      html += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="9" fill="var(--surface)" stroke="var(--ink-2)" stroke-width="1.4"/><text x="${x.toFixed(1)}" y="${(y + 3.6).toFixed(1)}" font-size="10" font-weight="700" text-anchor="middle" fill="var(--ink-2)">${names[k]}</text>`;
    }
    // Drehfeld: 2p Pole als farbige Sektoren (N rot, S blau), drehen mit thetaF
    const w = 180 / p;
    for (let m = 0; m < 2 * p; m++) {
      const a0 = thetaF + m * w - w / 2 + 3, a1 = thetaF + m * w + w / 2 - 3;
      html += `<path d="${sector(cx, cy, 86, 108, a0, a1)}" fill="${m % 2 ? 'var(--accent)' : 'var(--bad)'}" opacity=".78"/>`;
      const am = (thetaF + m * w) * RAD;
      html += `<text x="${(cx + 97 * Math.cos(am)).toFixed(1)}" y="${(cy - 97 * Math.sin(am) + 4).toFixed(1)}" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">${m % 2 ? 'S' : 'N'}</text>`;
    }
    // Läufer (Käfig): Scheibe mit Stäben, dreht mit thetaR
    html += `<circle cx="${cx}" cy="${cy}" r="76" fill="var(--surface)" stroke="var(--ink-2)" stroke-width="1.6"/>`;
    for (let k = 0; k < 12; k++) {
      const a = (thetaR + k * 30) * RAD, x = cx + 64 * Math.cos(a), y = cy - 64 * Math.sin(a);
      html += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${k === 0 ? 6 : 3.6}" fill="${k === 0 ? 'var(--warn)' : 'var(--muted)'}"/>`;
    }
    const ar = thetaR * RAD;
    html += `<line x1="${cx}" y1="${cy}" x2="${(cx + 52 * Math.cos(ar)).toFixed(1)}" y2="${(cy - 52 * Math.sin(ar)).toFixed(1)}" stroke="var(--warn)" stroke-width="3" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="5" fill="var(--ink-2)"/>`;
    html += `<text x="160" y="22" text-anchor="middle" font-size="12" font-weight="600" fill="var(--ink-2)">Stator: Drehfeld (N/S) – Läufer (orange Marke)</text>
      <text x="160" y="312" text-anchor="middle" font-size="12" fill="var(--muted)">Feld ${Math.round(ns)} · Läufer ${Math.round(n)} min⁻¹</text>`;
    svg.innerHTML = html;
  }
  // Ströme als Zeiger-Balken + Kurve (Zeit-Fenster 20 ms bei Zeitlupe nur symbolisch: Phase = Feldwinkel·p)
  function drawCur() {
    const { p } = ui.values, ph = thetaF * p * RAD, col = ['var(--warn)', 'var(--ink)', 'var(--muted)'];
    let html = `<text x="160" y="22" text-anchor="middle" font-size="12" font-weight="600" fill="var(--ink-2)">Die drei Strangströme i_U, i_V, i_W</text>
      <line x1="30" x2="300" y1="130" y2="130" stroke="var(--line-2)"/>`;
    for (let k = 0; k < 3; k++) {
      let d = '';
      for (let i = 0; i <= 120; i++) { const x = i / 120 * 2 * Math.PI, y = 130 - 70 * Math.sin(x - k * 120 * RAD); d += (i ? 'L' : 'M') + (30 + 270 * i / 120).toFixed(1) + ' ' + y.toFixed(1); }
      html += `<path d="${d}" fill="none" stroke="${col[k]}" stroke-width="2.2"/>`;
    }
    const xm = 30 + 270 * (((ph % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)) / (2 * Math.PI);
    html += `<line x1="${xm.toFixed(1)}" x2="${xm.toFixed(1)}" y1="50" y2="210" stroke="var(--accent)" stroke-width="1.5" stroke-dasharray="4 3"/>`;
    for (let k = 0; k < 3; k++) {
      const v = Math.sin(ph - k * 120 * RAD), y0 = 262, bx = 70 + k * 90;
      html += `<rect x="${bx - 22}" y="${v >= 0 ? y0 - 40 * v : y0}" width="44" height="${Math.abs(40 * v).toFixed(1)}" fill="${col[k]}" opacity=".85"/>
        <line x1="${bx - 30}" x2="${bx + 30}" y1="${y0}" y2="${y0}" stroke="var(--ink-2)"/>
        <text x="${bx}" y="${(y0 + 42).toFixed(0)}" text-anchor="middle" font-size="12" font-weight="600" fill="var(--ink-2)">i_${'UVW'[k]}</text>`;
    }
    html += `<text x="160" y="228" text-anchor="middle" font-size="11" fill="var(--muted)">Balken: Momentanwerte der drei Ströme</text>`;
    csvg.innerHTML = html;
  }
  const loop = animate(svgBox, dt => {
    const { f, p } = ui.values;
    thetaF = (thetaF + dt * 360 * (f / p) * 0.02) % 36000;   // 0,02 = Zeitlupenfaktor
    thetaR = (thetaR + dt * 360 * (n / 60) * 0.02) % 36000;
    draw(); drawCur();
  }, { speed: 1 });
  loop.controls(root, { speeds: [[1, 'Zeitlupe'], [0.3, 'sehr langsam']] });
  update(); draw(); drawCur();
}
