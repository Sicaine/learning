// Empfängerfilter-Labor: (1) Trennschärfe durch ZF-Bandbreite, (2) Notchfilter gegen einen Störträger, (3) Noise Blanker und Noise Reduction.
// Vereinfachte Darstellung (Audio-/ZF-Bereich). params: { start?: 'bw' | 'notch' | 'imp' }
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { chart, h, txt, line, rect, poly, hash, fmtF, trimDec, dec } from './_funk.js';

const polygon = (pts, col, fo = 0.15) => { const e = document.createElementNS('http://www.w3.org/2000/svg', 'polygon'); e.setAttribute('points', pts.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ')); e.setAttribute('fill', col); e.setAttribute('fill-opacity', fo); return e; };

export default function mount(stage, { params = {}, complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const wrap = h('div'); root.append(wrap);
  let ch = null;
  const ui = controls(root, [
    { id: 'm', type: 'seg', label: 'Experiment', options: [['bw', 'Trennschärfe'], ['notch', 'Notchfilter'], ['imp', 'Störaustaster & Rauschminderung']], value: params.start ?? 'bw' },
    { id: 'sig', type: 'seg', label: 'Signal (Trennschärfe)', options: [['ssb', 'SSB-Sprache'], ['cw', 'CW']], value: 'ssb' },
    { id: 'bw', label: 'Empfängerbandbreite (ZF-Filter)', min: 100, max: 6000, step: 100, value: 6000, format: v => (v >= 1000 ? trimDec(v / 1000, 1) + ' kHz' : v + ' Hz'), digits: 1 },
    { id: 'fn', label: 'Notch-Frequenz', min: 300, max: 2700, step: 20, value: 800, format: v => v + ' Hz', digits: 0 },
    { id: 'nt', type: 'toggle', label: 'Notchfilter ein', value: false },
    { id: 'nb', type: 'toggle', label: 'Noise Blanker (NB)', value: false },
    { id: 'nr', type: 'toggle', label: 'Noise Reduction (NR)', value: false },
  ], run);
  const out = readout(root, [{ id: 'a', label: '', hl: true }, { id: 'b', label: '' }, { id: 'c', label: '' }]);
  const note = h('div', { class: 'vz-note', style: 'line-height:1.55;margin:6px 0;min-height:3.2em' }); root.append(note);
  const all = [
    { id: 'ssb', label: 'SSB: Bandbreite 2,4 kHz: Nachbar draußen, Sprache komplett' },
    { id: 'cw', label: 'CW: schmal (≤ 400 Hz): Nachbar-Telegrafie draußen' },
    { id: 'notch', label: 'Notch auf den Störträger: ≥ 30 dB Dämpfung' },
    { id: 'nb', label: 'Noise Blanker: Impulsstörung verschwindet' },
    { id: 'nr', label: 'Noise Reduction: Rauschteppich sinkt' },
  ];
  const g = goals(root, all, () => complete?.());
  const CARRIER = 1230;
  const lab = (a, b, c) => { const cells = out.el.querySelectorAll('.vz-stat'); [a, b, c].forEach((t, i) => { const n = cells[i]; if (n) { n.firstChild.textContent = t[0]; n.querySelector('b').textContent = t[1]; } }); };

  function run(v, id) {
    ch?.svg.remove(); wrap.replaceChildren();
    const m = v.m;
    const VIS = { bw: ['sig', 'bw'], notch: ['fn', 'nt'], imp: ['nb', 'nr'] };
    for (const k of ['sig', 'bw', 'fn', 'nt', 'nb', 'nr']) { const bx = ui.el.querySelector(`[data-id="${k}"]`); if (bx) bx.style.display = VIS[m].includes(k) ? '' : 'none'; }
    if (m === 'bw') {
      const cw = v.sig === 'cw', bw = v.bw;
      const lo = cw ? 700 - bw / 2 : 300, hi = cw ? 700 + bw / 2 : 300 + bw;
      ch = chart(wrap, { h: 200, x: [0, 6500], y: [0, 1.25], xticks: [0, 1000, 2000, 3000, 4000, 5000, 6000], xfmt: t => (t ? t / 1000 + ' kHz' : '0'), aria: 'Audiospektrum mit gewünschter Station, Nachbarstation und Durchlassbereich des Filters' });
      const X = ch.X, Y = ch.Y;
      const desired = cw ? [[700, 1.0]] : null, neigh = cw ? [[1000, 1.15], [350, 0.6]] : null;
      const block = (a, b, amp, col, lbl) => { ch.add(rect(X(a), Y(amp), X(b) - X(a), Y(0) - Y(amp), { fill: col, fo: 0.45, stroke: col })); ch.add(txt((X(a) + X(b)) / 2, Y(amp) - 4, lbl, { anchor: 'middle', size: 10.5, fill: col })); };
      if (cw) { for (const [f, a] of desired) ch.add(line(X(f), Y(0), X(f), Y(a), { color: 'var(--accent)', w: 4 }), txt(X(f), Y(a) - 5, 'gewünscht', { anchor: 'middle', size: 10.5, fill: 'var(--accent)' })); for (const [f, a] of neigh) ch.add(line(X(f), Y(0), X(f), Y(a), { color: 'var(--bad)', w: 4 }), txt(X(f), Y(a) - 5, 'Nachbar', { anchor: 'middle', size: 10.5, fill: 'var(--bad)' })); }
      else { block(300, 2700, 0.8, 'var(--accent)', 'gewünschte Station'); block(3050, 5450, 1.1, 'var(--bad)', 'starke Nachbarstation'); }
      ch.add(rect(X(Math.max(0, lo)), ch.m.t, X(Math.min(6500, hi)) - X(Math.max(0, lo)), Y(0) - ch.m.t, { fill: 'var(--accent-2)', fo: 0.12, stroke: 'var(--accent-2)', sw: 1.5 }), txt(X(Math.max(0, lo)) + 4, ch.m.t + 12, 'Durchlassbereich ' + (bw >= 1000 ? trimDec(bw / 1000, 1) + ' kHz' : bw + ' Hz'), { size: 11, fill: 'var(--accent-2)' }));
      const overlap = (a, b, x, y) => Math.max(0, Math.min(b, y) - Math.max(a, x));
      let lost, leak;
      if (cw) { const inside = f => f >= lo && f <= hi; lost = inside(700) ? 0 : 100; leak = neigh.filter(([f]) => inside(f)).length; lab(['Nutzsignal', lost ? 'draußen!' : 'passiert'], ['Nachbarn im Durchlass', String(leak)], ['Trennschärfe', leak === 0 ? 'hoch' : 'niedrig']); }
      else { lost = 100 - 100 * overlap(300, 2700, lo, hi) / 2400; leak = 100 * overlap(3050, 5450, lo, hi) / 2400; lab(['Sprache abgeschnitten', dec(lost, 0) + ' %'], ['Nachbar im Durchlass', dec(leak, 0) + ' %'], ['Trennschärfe', leak < 1 ? 'hoch' : 'niedrig']); }
      note.innerHTML = 'Je <b>schmaler</b> die Empfängerbandbreite, desto <b>höher die Trennschärfe</b>: Nachbarsignale bleiben draußen. Ideal ist eine Bandbreite, die gerade so breit ist wie das gewünschte Signal (SSB etwa 2,4 kHz, CW etwa 300 Hz); darunter geht Nutzsignal verloren.';
      if (id) { if (!cw && lost < 3 && leak < 1) g.reach('ssb'); if (cw && !lost && !leak && bw <= 400) g.reach('cw'); }
    } else if (m === 'notch') {
      ch = chart(wrap, { h: 200, x: [0, 3000], y: [0, 1.25], xticks: [0, 500, 1000, 1500, 2000, 2500, 3000], xfmt: t => (t ? t / 1000 + ' kHz' : '0'), aria: 'NF-Spektrum der Sprache mit Störträger und Notchfilter-Kennlinie' });
      const X = ch.X, Y = ch.Y, sp = f => (f >= 300 && f <= 2700 ? 0.5 + 0.2 * Math.sin(f / 170) ** 2 : 0);
      const att = f => (v.nt ? 10 ** (-(40 * Math.exp(-(((f - v.fn) / 35) ** 2))) / 20) : 1);
      const pts = []; for (let f = 0; f <= 3000; f += 15) pts.push([X(f), Y(sp(f) * att(f))]);
      ch.add(polygon([[X(0), Y(0)], ...pts, [X(3000), Y(0)]], 'var(--accent)', 0.25), poly(pts, { color: 'var(--accent)', w: 1.8 }));
      const tc = 1.15 * att(CARRIER);
      ch.add(line(X(CARRIER), Y(0), X(CARRIER), Y(tc), { color: 'var(--bad)', w: 4 }), txt(X(CARRIER) + 6, Y(tc) - 4, 'Störträger (Pfeifton)', { size: 10.5, fill: 'var(--bad)' }));
      if (v.nt) { const np = []; for (let f = 0; f <= 3000; f += 15) np.push([X(f), Y(0.12 + 0.88 * att(f) ** 1)]); ch.add(poly(np, { color: 'var(--accent-2)', w: 1.8, dash: '5 4' }), txt(X(v.fn), Y(0.03), 'Kerbe', { anchor: 'middle', size: 10.5, fill: 'var(--accent-2)' })); }
      const dB = v.nt ? 40 * Math.exp(-(((CARRIER - v.fn) / 35) ** 2)) : 0;
      lab(['Störträger gedämpft um', dec(dB, 0) + ' dB'], ['Sprache daneben', 'kaum verändert'], ['Notch', v.nt ? 'ein bei ' + v.fn + ' Hz' : 'aus']);
      note.innerHTML = 'Das <b>Notchfilter</b> (Kerbfilter) unterdrückt nur eine <b>sehr schmale</b> Frequenz im Spektrum, zum Beispiel einen störenden Träger. Der Rest der Sendung bleibt nahezu unbeeinflusst. Ein Tiefpass oder Hochpass würde dagegen ganze Frequenzbereiche wegschneiden.';
      if (id && dB >= 30) g.reach('notch');
    } else {
      ch = chart(wrap, { h: 210, x: [0, 100], y: [-1.5, 1.5], xticks: [], yticks: [], aria: 'Zeitverlauf des NF-Signals mit Rauschen und Impulsstörungen' });
      const X = ch.X, Y = ch.Y, pts = [];
      const spikes = new Set([11, 27, 42, 58, 73, 90]);
      for (let i = 0; i <= 200; i++) {
        const t = i / 2, env = Math.max(0, Math.sin(t / 7.5)) * (0.5 + 0.5 * Math.sin(t / 3.1) ** 2) * 0.7, sig = env * Math.sin(t * 3.1);
        let noise = (hash(i * 3 + 1) - 0.5) * 0.45 * (v.nr ? 0.25 : 1);
        let spike = 0; for (const s of spikes) if (Math.abs(t - s) < 0.5) spike = (hash(s) > 0.5 ? 1 : -1) * 1.35;
        if (v.nb) spike = 0;
        pts.push([X(t), Y(sig + noise + spike)]);
      }
      ch.add(line(X(0), Y(0), X(100), Y(0), { color: 'var(--line-2)', w: 1 }), poly(pts, { color: 'var(--accent)', w: 1.3 }), txt(ch.m.l + 4, ch.m.t + 12, 'NF-Signal: Sprache + Rauschen + Zündfunken-Impulse', { size: 11, fill: 'var(--ink-2)' }));
      lab(['Impulsstörungen', v.nb ? 'ausgetastet' : 'vorhanden'], ['Rauschanteil', v.nr ? 'verringert' : 'voll'], ['Notch', 'hier nicht nötig']);
      note.innerHTML = '<b>Noise Blanker</b> (Störaustaster) tastet kurze <b>impulsförmige</b> Störungen (Zündfunken, Schaltnetzteile) aus dem Signal aus. <b>Noise Reduction</b> (Rauschunterdrückung, oft digital) verringert den <b>Rauschanteil</b> im Signal. Keines von beiden ist ein Notchfilter.';
      if (id) { if (v.nb) g.reach('nb'); if (v.nr) g.reach('nr'); }
    }
  }
  run(ui.values);
}
