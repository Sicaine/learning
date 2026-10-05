// Digitale Modulation: Bitfolge → ASK/OOK, FSK, PSK sowie AFSK (NF-Frequenzumtastung, die danach per FM oder SSB gesendet wird).
// Das Zeitbild ist herabskaliert (wenige Trägerschwingungen je Bit). Ziele: alle Verfahren ansehen und das Bitmuster 01001110 (= 78) einstellen.
// params: { }
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { chart, h, txt, line, rect, poly } from './_funk.js';

const MODES = { ask: 'ASK', ook: 'OOK (CW)', fsk: 'FSK', psk: 'PSK', afsk: 'AFSK' };

export default function mount(stage, { complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const bitsRow = h('div', { style: 'display:grid;grid-template-columns:repeat(8,1fr);gap:6px;margin-bottom:8px' });
  root.append(bitsRow);
  const tp = chart(root, { h: 190, x: [0, 8], y: [-1.35, 1.6], xticks: [0, 1, 2, 3, 4, 5, 6, 7, 8], xfmt: v => (v < 8 ? 'Bit ' + (v + 1) : ''), aria: 'Zeitverlauf des modulierten Signals für acht Bits' });
  const ui = controls(root, [{ id: 'mode', type: 'seg', label: 'Verfahren', options: Object.entries(MODES), value: 'ask' }], run);
  const out = readout(root, [{ id: 'what', label: 'Was ändert sich?', hl: true }, { id: 'val', label: 'Bitmuster dezimal' }]);
  const note = h('p', { class: 'vz-note', style: 'line-height:1.55' }); root.append(note);
  const g = goals(root, [{ id: 'seen', label: 'ASK, OOK, FSK, PSK und AFSK angesehen' }, { id: 'pat', label: 'Bitmuster 01001110 einstellen (= 78)' }], () => complete?.());
  const seen = new Set(), bits = [1, 0, 1, 1, 0, 0, 1, 0];
  const btns = bits.map((b, i) => h('button', { type: 'button', class: 'btn ghost', style: 'font:700 1.2rem var(--mono);padding:8px 0;display:flex;justify-content:center', 'aria-label': 'Bit ' + (i + 1), onclick: () => { bits[i] ^= 1; run(ui.values); } }));
  bitsRow.append(...btns);

  function run(v) {
    const mode = v.mode; seen.add(mode);
    btns.forEach((b, i) => { b.textContent = bits[i]; b.style.background = bits[i] ? 'var(--accent)' : ''; b.style.color = bits[i] ? '#fff' : ''; });
    tp.clear();
    const pts = [], N = 800, cyc = 4;
    for (let i = 0; i <= N; i++) {
      const t = 8 * i / N, k = Math.min(7, Math.floor(t)), b = bits[k], ph = t - k;
      let u;
      if (mode === 'ask') u = (b ? 1 : 0.35) * Math.sin(2 * Math.PI * cyc * t);
      else if (mode === 'ook') u = b * Math.sin(2 * Math.PI * cyc * t);
      else if (mode === 'fsk') u = Math.sin(2 * Math.PI * (b ? cyc * 1.6 : cyc) * t);
      else if (mode === 'psk') u = Math.sin(2 * Math.PI * cyc * t + (b ? Math.PI : 0));
      else { u = Math.sin(2 * Math.PI * (b ? 3.2 : 1.6) * t * 1.2); }
      pts.push([tp.X(t), tp.Y(u)]);
      void ph;
    }
    for (let i = 0; i <= 8; i++) tp.add(line(tp.X(i), tp.m.t, tp.X(i), tp.Y(-1.35), { color: 'var(--line-2)', w: 1, dash: '3 4' }));
    bits.forEach((b, i) => tp.add(txt(tp.X(i + 0.5), tp.Y(1.45), String(b), { anchor: 'middle', size: 13, fill: 'var(--ink)', bold: true })));
    tp.add(poly(pts, { color: 'var(--accent)', w: 1.8 }));
    const [what, expl] = {
      ask: ['Amplitude', 'Amplitudenumtastung (ASK): zwei Amplituden stehen für 0 und 1. Frequenz und Phase bleiben gleich.'],
      ook: ['Träger ein/aus', 'On-Off-Keying (OOK) ist der Sonderfall der ASK, bei dem der Träger ganz ausgeschaltet wird: genau die Telegrafie (CW).'],
      fsk: ['Frequenz', 'Frequenzumtastung (FSK): zwei Frequenzen stehen für 0 und 1. Die Amplitude bleibt konstant (so arbeitet z. B. RTTY).'],
      psk: ['Phase', 'Phasenumtastung (PSK): bei jeder 1 springt die Phase um 180°. Frequenz und Amplitude bleiben gleich (so arbeitet PSK31).'],
      afsk: ['NF-Frequenz', 'AFSK: Eine Frequenzumtastung im Hörbereich (hier zwei NF-Töne, oft 300 bis 2700 Hz). Dieses NF-Signal moduliert danach einen Sender, z. B. per FM (APRS auf 144,800 MHz mit 1200 Bit/s) oder per SSB.'],
    }[mode];
    out.set({ what, val: parseInt(bits.join(''), 2) });
    note.textContent = expl;
    if (Object.keys(MODES).every(m => seen.has(m))) g.reach('seen');
    if (bits.join('') === '01001110') g.reach('pat');
  }
  run(ui.values);
}
