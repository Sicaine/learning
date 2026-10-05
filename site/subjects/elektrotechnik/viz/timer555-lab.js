// NE555-Labor (L42): astabiler Blinker und monostabiler Zeitgeber. Kondensatorspannung schwankt zwischen ⅓ und ⅔ U_B.
// Formeln (ideal): astabil t_H = ln2·(R₁+R₂)·C, t_L = ln2·R₂·C; monostabil T = ln3·R·C ≈ 1,1·R·C.
// params: { fTarget?: 1 (Hz), tMono?: 2 (s), UB?: 9 (V) }
import { plot } from '../../../assets/js/vizkit/plot.js';
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { animate } from '../../../assets/js/vizkit/anim.js';
import { fmt } from '../../../assets/js/vizkit/si.js';
import { h, s } from '../../../assets/js/vizkit/base.js';

export default function mount(stage, { params = {}, complete, md }) {
  const fT = params.fTarget ?? 1, tM = params.tMono ?? 2, UB = params.UB ?? 9;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const top = h('div', { style: 'display:flex;align-items:center;gap:14px;flex-wrap:wrap' });
  const led = s('svg', { viewBox: '0 0 60 60', width: 54, height: 54, role: 'img', 'aria-label': 'LED am Ausgang' },
    s('circle', { cx: 30, cy: 30, r: 24, fill: 'var(--bad)', 'fill-opacity': 0, class: 'glow' }),
    s('circle', { cx: 30, cy: 30, r: 13, fill: 'var(--surface)', stroke: 'var(--ink-2)', 'stroke-width': 2.5, class: 'bulb' }));
  const ledTxt = h('small', { class: 'vk-hint', text: 'LED an Pin 3 (Echtzeit)' });
  const fire = h('button', { type: 'button', class: 'btn small', text: 'Auslösen (Pin 2 kurz auf Masse)' });
  top.append(led, ledTxt, fire); root.append(top);
  const pBox = h('div'); root.append(pBox);
  const pl = plot(pBox, { h: 270, x: { unit: 's', label: 't' }, y: { unit: 'V', label: 'Spannung', min: -0.5, max: UB * 1.12, ticks: [0, UB / 3, 2 * UB / 3, UB], format: v => (+v.toFixed(1)).toString().replace('.', ',') + ' V' }, legend: true });
  pl.hline('lo', UB / 3, { label: '⅓ U_B', color: 'var(--muted)' }); pl.hline('hi', 2 * UB / 3, { label: '⅔ U_B', color: 'var(--muted)' });

  const ui = controls(root, [
    { id: 'mode', type: 'seg', options: [['astable', 'astabil (Blinker)'], ['mono', 'monostabil (Zeitgeber)']], value: 'astable' },
    { id: 'R1', label: 'R₁', unit: 'Ω', min: 1e3, max: 1e6, value: 1e3, scale: 'log', snap: 'E12' },
    { id: 'R2', label: 'R₂', unit: 'Ω', min: 1e3, max: 1e6, value: 10e3, scale: 'log', snap: 'E12' },
    { id: 'C', label: 'C', unit: 'F', min: 1e-9, max: 100e-6, value: 1e-6, scale: 'log', snap: 'E12' },
    { type: 'presets', items: [{ label: '≈ 69 Hz (Aufgabe)', values: { mode: 'astable', R1: 1e3, R2: 10e3, C: 1e-6 } }, { label: 'langsamer Blinker', values: { mode: 'astable', R1: 1e3, R2: 6.8e3, C: 100e-6 } }], reset: true },
  ], () => run());
  const el = id => ui.el.querySelector(`[data-id="${id}"]`);
  const out = readout(root, [{ id: 'f', label: 'Frequenz f', hl: true }, { id: 'T', label: 'Periode / Zeit T' }, { id: 'th', label: 'High-Zeit' }, { id: 'tl', label: 'Low-Zeit' }, { id: 'duty', label: 'Tastverhältnis' }]);
  const note = h('p', { class: 'vz-note' }); root.append(note);
  const g = goals(root, [
    { id: 'blink', label: `Blinker: ${fmt(fT, 'Hz')} (± 5 %) und Tastverhältnis 45–55 %` },
    { id: 'mono', label: `Monostabil: T = ${fmt(tM, 's')} (± 5 %)` },
  ], () => complete?.());

  let model = null, trig = -1e9;
  fire.onclick = () => { trig = anim.t; };
  const anim = animate(root, (dt, t) => {
    if (!model) return;
    let on;
    if (model.mode === 'astable') { const ph = t % model.T; on = ph < model.th; }
    else on = t - trig >= 0 && t - trig < model.T;
    const fast = model.mode === 'astable' && model.f > 8;
    const lvl = fast ? model.duty * 0.9 : on ? 1 : 0;
    led.querySelector('.glow').setAttribute('fill-opacity', (lvl * 0.45).toFixed(2));
    led.querySelector('.bulb').setAttribute('fill', lvl > 0.01 ? 'var(--bad)' : 'var(--surface)');
    led.querySelector('.bulb').setAttribute('fill-opacity', fast ? 0.35 + 0.5 * lvl : 1);
    ledTxt.textContent = fast ? 'LED flimmert: zu schnell fürs Auge' : on ? 'LED an' : 'LED aus';
  });

  function run() {
    const v = ui.values, mono = v.mode === 'mono';
    el('R2').style.display = mono ? 'none' : '';
    fire.style.display = mono ? '' : 'none';
    const N = 700, xs = new Float64Array(N + 1), uc = new Float64Array(N + 1), uo = new Float64Array(N + 1), tr = new Float64Array(N + 1);
    if (!mono) {
      const th = Math.LN2 * (v.R1 + v.R2) * v.C, tl = Math.LN2 * v.R2 * v.C, T = th + tl, W = 3.2 * T;
      for (let i = 0; i <= N; i++) {
        const t = W * i / N, ph = t % T; xs[i] = t;
        if (ph < th) { uo[i] = UB; uc[i] = UB - (2 * UB / 3) * Math.exp(-ph / ((v.R1 + v.R2) * v.C)); }
        else { uo[i] = 0; uc[i] = (2 * UB / 3) * Math.exp(-(ph - th) / (v.R2 * v.C)); }
      }
      pl.removeAnn?.('trig');
      pl.line('uo', xs, uo, { color: 'var(--accent)', label: 'Pin 3 (Ausgang)', width: 2 });
      pl.line('uc', xs, uc, { color: 'var(--accent-2)', label: 'Pin 2/6 (u_C)', width: 2 });
      pl.line('tr', [0], [0], { color: 'transparent', hover: false });
      model = { mode: 'astable', T, th, tl, f: 1 / T, duty: th / T };
      out.set({ f: fmt(1 / T, 'Hz', 3), T: fmt(T, 's', 3), th: fmt(th, 's', 3), tl: fmt(tl, 's', 3), duty: (100 * th / T).toFixed(1).replace('.', ',') + ' %' });
      note.innerHTML = md(`$f = \\dfrac{1{,}44}{(R_1+2R_2)\\,C} = ${fmt(1.44 / ((v.R1 + 2 * v.R2) * v.C), 'Hz', 3)}$, Tastverhältnis $\\dfrac{R_1+R_2}{R_1+2R_2} = ${(100 * th / T).toFixed(1).replace('.', ',')}\\,\\%$ — immer über 50 %, weil $C$ über $R_1+R_2$ lädt, aber nur über $R_2$ entlädt.`);
      if (Math.abs(1 / T / fT - 1) < 0.05 && th / T >= 0.45 && th / T <= 0.55) g.reach('blink');
    } else {
      const T = Math.log(3) * v.R1 * v.C, W = 2.4 * T, t0 = 0.2 * T, tp = 0.03 * T;
      for (let i = 0; i <= N; i++) {
        const t = W * i / N; xs[i] = t;
        tr[i] = t >= t0 && t < t0 + tp ? 0 : UB;
        if (t < t0) { uc[i] = 0; uo[i] = 0; }
        else if (t < t0 + T) { uc[i] = UB * (1 - Math.exp(-(t - t0) / (v.R1 * v.C))); uo[i] = UB; }
        else { uc[i] = 0; uo[i] = 0; }
      }
      pl.line('uo', xs, uo, { color: 'var(--accent)', label: 'Pin 3 (Ausgang)', width: 2 });
      pl.line('uc', xs, uc, { color: 'var(--accent-2)', label: 'u_C (Pin 6/7)', width: 2 });
      pl.line('tr', xs, tr, { color: 'var(--warn)', label: 'Trigger (Pin 2)', width: 1.6, dash: '5 4' });
      model = { mode: 'mono', T, th: T, tl: 0, f: 0, duty: 0 };
      out.set({ f: '–', T: fmt(T, 's', 3), th: fmt(T, 's', 3), tl: '–', duty: '–' });
      note.innerHTML = md(`$T = 1{,}1\\,R\\,C = ${fmt(1.1 * v.R1 * v.C, 's', 3)}$ (exakt $\\ln 3\\cdot RC$): Ein kurzer Low-Impuls an Pin 2 startet die Zeit, der Ausgang bleibt $T$ lang high, bis $u_C$ die Schwelle $\\tfrac23 U_B$ erreicht.`);
      if (Math.abs(T / tM - 1) < 0.05) g.reach('mono');
    }
    anim.once();
  }
  run();
}
