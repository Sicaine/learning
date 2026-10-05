// Oszilloskop-Ablesen (D23): Frequenz und Spitze-Spitze-Spannung vom Raster lesen.
// params: { mode?: 'read' | 'explore' (Standard 'read'), rounds?: Anzahl richtiger Ablesungen (5), tol?: Toleranz (0,06), goal?: 'mains' (nur explore) }
//   read    — zufällige Signale; der Lerner liest f und U_SS ab und tippt die Zahlen ein (die Messwerte des Geräts sind versteckt).
//   explore — Signalgenerator + volles Oszilloskop (Zeit/Div, Volt/Div, Trigger, AC/DC, Cursor); optionales Ziel 'mains': 230-V-Netz sauber abbilden.
import { waves, waveValue } from '../../../assets/js/vizkit/circuit.js';
import { scope } from '../../../assets/js/vizkit/scope.js';
import { controls, goals } from '../../../assets/js/vizkit/controls.js';
import { fmt, parse, seq125 } from '../../../assets/js/vizkit/si.js';
import { h } from '../../../assets/js/vizkit/base.js';

const pick = a => a[Math.floor(Math.random() * a.length)];
const wave = (shape, amp, f, offset) => { const w = shape === 'square' ? waves.square(amp, f, { offset }) : shape === 'tri' ? waves.tri(amp, f, { offset }) : waves.sine(amp, f, offset); return t => waveValue(w, t); };

export default function mount(stage, { params = {}, complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  (params.mode === 'explore' ? explore : read)(root, params, complete);
}

// ── Ablesen üben ─────────────────────────────────────────────────────────────
function read(root, params, complete) {
  const need = params.rounds ?? 5, tol = params.tol ?? 0.06;
  const TD = seq125(1e-7, 5e-3), VD = seq125(0.01, 50);
  let rd = null, solved = 0, tries = 0;
  const sc = scope(root, { channels: [{ id: 'ch1', label: 'CH1', vdiv: 1 }], timeMin: 1e-8, timeMax: 1, vmin: 1e-3, vmax: 100, controls: false, trigger: { source: 'ch1', level: 0 } });
  sc.el.querySelector('.vk-scope-info').style.display = 'none';
  const cur = h('div', { class: 'vk-scope-info', 'aria-live': 'polite' });
  sc.el.append(cur);
  const ui = controls(root, [
    { id: 'td', label: 'Zeit/Div', unit: 's/Div', values: TD, scale: 'log', value: 1e-3, digits: 2 },
    { id: 'vd', label: 'Volt/Div', unit: 'V/Div', values: VD, scale: 'log', value: 1, digits: 2 },
    { id: 'cursor', type: 'seg', options: [['off', 'Cursor aus'], ['time', 'Zeit-Cursor'], ['volt', 'Spannungs-Cursor']], value: 'off' },
  ], v => { sc.set({ timeDiv: v.td, cursor: v.cursor, channels: { ch1: { vdiv: v.vd } } }); cursorInfo(); });

  const field = (id, label, unit, ph) => {
    const inp = h('input', { type: 'text', inputmode: 'text', id: 'sr-' + id, class: 'vk-edit', placeholder: ph, 'aria-label': label, style: 'width:8.5em;font-size:.95rem;padding:6px 8px;text-align:left' });
    return { inp, box: h('label', { style: 'display:flex;flex-direction:column;gap:3px;font-size:.85rem;color:var(--ink-2);font-weight:500' }, h('span', { text: label }), h('span', { style: 'display:flex;align-items:center;gap:6px' }, inp, h('span', { text: unit, style: 'color:var(--muted)' }))) };
  };
  const ff = field('f', 'Frequenz f', 'Hz', 'z. B. 2,5k'), fu = field('u', 'Spitze-Spitze U_SS', 'V', 'z. B. 640m');
  const btn = h('button', { type: 'button', class: 'btn small', text: 'Prüfen' });
  const nxt = h('button', { type: 'button', class: 'btn small ghost', text: 'Anderes Signal' });
  const sol = h('button', { type: 'button', class: 'btn small ghost', text: 'Lösung zeigen' });
  const msg = h('div', { class: 'vz-note', 'aria-live': 'polite' });
  root.append(h('div', { class: 'vz-controls vk-row', style: 'align-items:end;gap:12px;flex-wrap:wrap' }, ff.box, fu.box, btn, nxt, sol), msg);
  const g = goals(root, [{ id: 'n', label: `${need} Signale richtig abgelesen` }], () => complete?.());
  const prog = () => { g.el.firstChild.textContent = (g.has('n') ? '✓ ' : '○ ') + `${Math.min(solved, need)} von ${need} Signalen richtig abgelesen`; };

  function cursorInfo() {
    const st = sc.state;
    if (st.cursor === 'time') { const dt = Math.abs(st.cx[1] - st.cx[0]) * st.timeDiv; cur.innerHTML = `<span style="color:var(--accent-2)">Cursor-Abstand ΔT = ${fmt(dt, 's')}</span><span>(1/ΔT = ${fmt(1 / dt, 'Hz')})</span>`; }
    else if (st.cursor === 'volt') { const dv = Math.abs(st.cy[1] - st.cy[0]) * st.chans[0].vdiv; cur.innerHTML = `<span style="color:var(--accent-2)">Cursor-Abstand ΔU = ${fmt(dv, 'V')}</span>`; }
    else cur.innerHTML = '<span style="color:var(--muted)">Tipp: Kästchen zählen — Zeit/Div und Volt/Div stehen unten am Schirm.</span>';
  }
  sc.svg.addEventListener('pointermove', cursorInfo); sc.svg.addEventListener('pointerup', cursorInfo);

  function next() {
    const td = pick(TD.filter(x => x >= 5e-8)), vd = pick(VD.filter(x => x >= 0.02)), k = pick([2, 2.5, 4, 5]), n = pick([2, 3, 4, 5, 2.5, 3.5]);
    const off = pick([0, 0, 0.5, -0.5, 1, -1]) * vd, shape = pick(['sine', 'sine', 'sine', 'square']);
    rd = { f: 1 / (td * k), upp: vd * n, off, shape, td, vd };
    sc.setSignal('ch1', wave(shape, rd.upp / 2, rd.f, off));
    sc.set({ trigger: { level: off } });
    ui.set({ td, vd, cursor: 'off' });
    ff.inp.value = fu.inp.value = ''; msg.textContent = 'Lies f und U_SS am Raster ab. Die Messwerte des Geräts sind ausgeblendet.'; msg.style.color = '';
    tries = 0; cursorInfo(); ff.inp.focus({ preventScroll: true });
  }
  function check() {
    const f = parse(ff.inp.value), u = parse(fu.inp.value);
    if (!(f > 0) || !(u > 0)) { msg.textContent = 'Bitte beide Zahlen eingeben (Vorsätze wie k, M, m sind erlaubt: 2,5k · 640m).'; return; }
    const okF = Math.abs(f / rd.f - 1) <= tol, okU = Math.abs(u / rd.upp - 1) <= tol;
    tries++;
    if (okF && okU) {
      const A = rd.upp / 2;
      msg.innerHTML = `✓ Richtig: f = ${fmt(rd.f, 'Hz')} (T = ${fmt(1 / rd.f, 's')}), U<sub>SS</sub> = ${fmt(rd.upp, 'V')}` + (rd.shape === 'sine' ? ` → Û = ${fmt(A, 'V')}, U<sub>eff</sub> = ${fmt(A / Math.SQRT2, 'V')}` : '') + (rd.off ? `, Gleichanteil ${fmt(rd.off, 'V')}` : '') + '.';
      msg.style.color = 'var(--good)';
      solved++; prog(); if (solved >= need) g.reach('n');
    } else {
      const t = [];
      if (!okF) t.push('f: Wie viele Kästchen ist eine Periode lang? Mal Zeit/Div ergibt T, dann f = 1/T.');
      if (!okU) t.push('U_SS: Kästchen von Spitze zu Spitze (unten bis oben) mal Volt/Div.');
      msg.textContent = (okF ? 'f stimmt. ' : okU ? 'U_SS stimmt. ' : 'Noch nicht. ') + t.join(' '); msg.style.color = 'var(--bad)';
    }
  }
  btn.onclick = check; nxt.onclick = next;
  sol.onclick = () => { msg.innerHTML = `Lösung: f = ${fmt(rd.f, 'Hz')}, U<sub>SS</sub> = ${fmt(rd.upp, 'V')} (zählt nicht als richtig).`; msg.style.color = ''; };
  root.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.tagName === 'INPUT' && e.target.id?.startsWith('sr-')) check(); });
  root._test = { rd: () => rd, ui, check }; // Testhaken
  prog(); next();
}

// ── Generator + Oszilloskop ──────────────────────────────────────────────────
function explore(root, params, complete) {
  const sc = scope(root, { channels: [{ id: 'ch1', label: 'CH1', vdiv: 1 }], timeMin: 1e-8, timeMax: 1, vmin: 1e-3, vmax: 500, controls: false, trigger: { source: 'ch1', level: 0 } });
  const TD = seq125(1e-8, 1), VD = seq125(1e-3, 500);
  const mains = params.goal === 'mains';
  const ui = controls(root, [
    { type: 'presets', label: 'Generator', items: [{ label: '1 kHz · 2 V', values: { f: 1e3, A: 1, off: 0, shape: 'sine' } }, { label: '7,1 MHz · 0,5 V', values: { f: 7.1e6, A: 0.5, off: 0, shape: 'sine' } }, { label: 'Netz 230 V', values: { f: 50, A: 325.3, off: 0, shape: 'sine' } }] },
    { id: 'shape', type: 'seg', label: 'Form', options: [['sine', 'Sinus'], ['square', 'Rechteck'], ['tri', 'Dreieck']], value: 'sine' },
    { id: 'f', label: 'Frequenz f', unit: 'Hz', min: 10, max: 2e7, value: 1e3, scale: 'log', digits: 3 },
    { id: 'A', label: 'Spitzenwert Û', unit: 'V', min: 0.01, max: 500, value: 1, scale: 'log', digits: 3 },
    { id: 'off', label: 'Gleichanteil', unit: 'V', min: -5, max: 5, step: 0.1, value: 0, digits: 2 },
    { id: 'td', label: 'Zeit/Div', unit: 's/Div', values: TD, scale: 'log', value: 1e-3, digits: 2 },
    { id: 'vd', label: 'Volt/Div', unit: 'V/Div', values: VD, scale: 'log', value: 1, digits: 2 },
    { id: 'lvl', label: 'Trigger-Pegel', unit: 'V', min: -10, max: 10, step: 0.05, value: 0, digits: 2 },
    { id: 'ac', type: 'toggle', label: 'AC-Kopplung (Gleichanteil ausblenden)', value: false },
    { id: 'cursor', type: 'seg', options: [['off', 'Cursor aus'], ['time', 'Zeit'], ['volt', 'Spannung']], value: 'off' },
  ], upd);
  const g = mains ? goals(root, [{ id: 'sig', label: 'Generator: 50 Hz, Û = 325 V' }, { id: 'view', label: '2–5 Perioden und ≥ 3 Div Höhe im Bild' }], () => complete?.()) : null;
  let lastVd = null;
  function upd(v) {
    sc.setSignal('ch1', wave(v.shape, v.A, v.f, v.off));
    if (v.vd !== lastVd) { lastVd = v.vd; ui.setRange('lvl', { min: -4 * v.vd, max: 4 * v.vd, step: v.vd / 20 }); }
    const lvl = v.ac ? v.off : Math.max(-4 * v.vd, Math.min(4 * v.vd, v.lvl));
    sc.set({ timeDiv: v.td, cursor: v.cursor, trigger: { level: lvl }, channels: { ch1: { vdiv: v.vd, coupling: v.ac ? 'ac' : 'dc' } } });
    if (g) {
      const T = 1 / v.f, per = 10 * v.td / T, hgt = 2 * v.A / v.vd;
      if (Math.abs(v.f / 50 - 1) < 0.02 && Math.abs(v.A / 325 - 1) < 0.03) g.reach('sig');
      if (Math.abs(v.f / 50 - 1) < 0.02 && Math.abs(v.A / 325 - 1) < 0.03 && per >= 1.8 && per <= 5.2 && hgt >= 3 && hgt <= 8) g.reach('view');
    }
  }
  sc.el.querySelector('.vk-scope-info').title = 'Automatische Messwerte des Geräts';
  root._test = { ui };
  upd(ui.values);
}
