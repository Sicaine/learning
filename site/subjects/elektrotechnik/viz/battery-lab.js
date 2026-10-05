// Batterie-/Akku-Labor (L51): Entladekurve U(t), Laufzeit, Energie, Spannungseinbruch am Innenwiderstand.
// Vereinfachtes Lehrmodell mit typischen Richtwerten (Datenblatt des konkreten Akkus prüfen!):
//   Leerlaufspannung je Ladezustand als Kurve, U_Klemme = U_0(SoC) − I·R_i; Ende bei Abschaltspannung oder nutzbarer Tiefe
//   (Blei: nur 80 % nutzbar); Temperatur: unter 20 °C 1 % weniger Kapazität je Kelvin (Modellannahme).
// params: { type?: 'pb'|'li'|'lfp'|'nimh', C?: 7, P?: 50 }
import { plot } from '../../../assets/js/vizkit/plot.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { fmt } from '../../../assets/js/vizkit/si.js';
import { h } from '../../../assets/js/vizkit/base.js';

const TYPES = {
  pb: { name: 'Blei-Säure 12 V', cells: '6 Zellen', cut: 10.5, min: 0.2, nom: 12, ocv: [[0, 11.8], [0.25, 12.0], [0.5, 12.2], [0.75, 12.45], [1, 12.7]] },
  li: { name: 'Li-Ion 1 Zelle', cells: '3,7 V', cut: 3.0, min: 0, nom: 3.7, ocv: [[0, 3.0], [0.1, 3.4], [0.25, 3.6], [0.5, 3.75], [0.75, 3.95], [1, 4.2]] },
  lfp: { name: 'LiFePO₄ 12,8 V', cells: '4 Zellen', cut: 10.0, min: 0, nom: 12.8, ocv: [[0, 10.0], [0.05, 12.0], [0.2, 13.1], [0.5, 13.2], [0.8, 13.3], [1, 13.5]] },
  nimh: { name: 'NiMH 12 V', cells: '10 Zellen', cut: 10.0, min: 0, nom: 12, ocv: [[0, 10.0], [0.1, 11.4], [0.5, 12.0], [0.8, 12.6], [1, 14.0]] },
};
const lerp = (tab, x) => { for (let i = 1; i < tab.length; i++) if (x <= tab[i][0]) { const [a, ua] = tab[i - 1], [b, ub] = tab[i]; return ua + (ub - ua) * (x - a) / (b - a); } return tab[tab.length - 1][1]; };
const dur = hr => hr < 1 ? Math.round(hr * 60) + ' min' : hr < 48 ? (+hr.toFixed(hr < 10 ? 2 : 1)).toString().replace('.', ',') + ' h' : (+(hr / 24).toFixed(1)).toString().replace('.', ',') + ' d';

export default function mount(stage, { params = {}, complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const pbox = h('div'); root.append(pbox);
  const pl = plot(pbox, { h: 280, legend: true, x: { unit: 'h', label: 't', min: 0, format: v => (+v.toFixed(2)).toString().replace('.', ',') + ' h' }, y: { label: 'U (V)', format: v => +v.toFixed(1) } });
  const ui = controls(root, [
    { id: 'type', type: 'seg', options: Object.entries(TYPES).map(([k, v]) => [k, v.name]), value: params.type ?? 'pb' },
    { id: 'C', label: 'Kapazität C', unit: 'Ah', min: 0.5, max: 100, scale: 'log', value: params.C ?? 7, digits: 3 },
    { id: 'mode', type: 'seg', label: 'Last', options: [['I', 'konstanter Strom'], ['P', 'konstante Leistung']], value: 'I' },
    { id: 'I', label: 'Laststrom I', unit: 'A', min: 0.05, max: 50, scale: 'log', value: 5, digits: 3 },
    { id: 'P', label: 'Leistung P', unit: 'W', min: 1, max: 600, scale: 'log', value: params.P ?? 50, digits: 3 },
    { id: 'Ri', label: 'Innenwiderstand R_i', unit: 'Ω', min: 0.005, max: 0.5, scale: 'log', value: 0.03, digits: 3 },
    { id: 'T', label: 'Temperatur', unit: '°C', min: -20, max: 40, step: 1, value: 20, format: v => Math.round(v) + ' °C' },
  ], run);
  const el = id => ui.el.querySelector(`[data-id="${id}"]`);
  const out = readout(root, [
    { id: 'run', label: 'Laufzeit', hl: true }, { id: 'ideal', label: 'ideal C/I' }, { id: 'wh', label: 'Energie nutzbar' },
    { id: 'wn', label: 'U_nenn · C' }, { id: 'sag', label: 'Einbruch I·R_i', hl: true }, { id: 'ia', label: 'Strom zu Beginn' },
  ]);
  const note = h('div', { class: 'vz-note', 'aria-live': 'polite' }); root.append(note);
  const g = goals(root, [
    { id: 'run', label: 'Bleiakku 7 Ah, 50 W: Laufzeit 1,2–1,5 h' },
    { id: 'sag', label: 'Spannungseinbruch I·R_i ≥ 1 V erzeugen' },
    { id: 'types', label: 'Alle vier Zelltypen ansehen' },
  ], () => complete?.());
  const seen = new Set();

  function simulate(v) {
    const ty = TYPES[v.type], Ceff = v.C * (v.T >= 20 ? 1 : Math.max(0.5, 1 - 0.01 * (20 - v.T)));
    const dt = Math.min(0.01, Math.max(1e-4, (Ceff / (v.mode === 'I' ? v.I : Math.max(0.05, v.P / ty.nom))) / 600));
    let soc = 1, t = 0, wh = 0, ended = 'leer';
    const ts = [], us = [], os = [];
    let I0 = null;
    for (let k = 0; k < 20000; k++) {
      const u0 = lerp(ty.ocv, soc);
      let I = v.mode === 'I' ? v.I : v.P / Math.max(1, u0 - 0.1);
      if (v.mode === 'P') { let u = u0; for (let q = 0; q < 6; q++) { u = u0 - I * v.Ri; I = v.P / Math.max(0.5, u); } }
      const u = u0 - I * v.Ri;
      if (I0 == null) I0 = I;
      ts.push(t); us.push(u); os.push(u0);
      if (u <= ty.cut) { ended = 'Abschaltspannung'; break; }
      if (soc <= ty.min) { ended = ty.min > 0 ? 'nutzbare Tiefe' : 'leer'; break; }
      soc -= I * dt / Ceff; wh += u * I * dt; t += dt;
      if (soc < 0) soc = 0;
    }
    return { ty, t, wh, ts, us, os, I0, ended, Ceff };
  }
  function run() {
    const v = ui.values;
    el('I').style.display = v.mode === 'I' ? '' : 'none'; el('P').style.display = v.mode === 'P' ? '' : 'none';
    const r = simulate(v);
    pl.clear();
    pl.line('os', r.ts, r.os, { color: 'var(--muted)', dash: '4 4', label: 'Leerlaufspannung', width: 1.6 });
    pl.line('u', r.ts, r.us, { color: 'var(--accent)', label: 'Klemmenspannung unter Last', width: 2.6 });
    pl.hline('cut', r.ty.cut, { label: 'Abschaltspannung ' + fmt(r.ty.cut, 'V', 3), color: 'var(--bad)', dash: '5 4' });
    pl.range({ x: [0, Math.max(r.t * 1.05, 1e-3)], y: [Math.floor(r.ty.cut - 1), Math.ceil(lerp(r.ty.ocv, 1) + 0.4)] });
    const ideal = v.C / r.I0;
    out.set({ run: dur(r.t), ideal: dur(ideal), wh: fmt(r.wh, 'Wh', 3), wn: fmt(r.ty.nom * v.C, 'Wh', 3), sag: fmt(r.I0 * v.Ri, 'V', 2), ia: fmt(r.I0, 'A', 3) });
    note.textContent = `${r.ty.name} (${r.ty.cells}): Ende wegen ${r.ended}. ${r.ty.min > 0 ? 'Blei-Akkus nutzt man nur bis etwa 80 % Entladetiefe. ' : ''}${v.T < 20 ? 'Kalt: weniger nutzbare Kapazität (Modellannahme −1 % je K unter 20 °C). ' : ''}Alle Werte sind typische Richtwerte, kein Datenblatt.`;
    seen.add(v.type); if (seen.size === 4) g.reach('types');
    if (v.type === 'pb' && v.mode === 'P' && Math.abs(v.C - 7) < 0.3 && Math.abs(v.P - 50) < 3 && r.t >= 1.2 && r.t <= 1.5) g.reach('run');
    if (r.I0 * v.Ri >= 1) g.reach('sag');
  }
  run();
}
