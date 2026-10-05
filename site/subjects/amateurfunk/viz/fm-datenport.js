// DATA-/9600-Port am FM-Transceiver: Wo wird ein Datensignal eingespeist (Senden) bzw. abgegriffen (Empfangen)?
// Blockschaltbild mit vier nummerierten Punkten je Zweig. params: { }
import { goals } from '../../../assets/js/vizkit/controls.js';
import { h, s, txt, line, rect } from './_funk.js';

const TX = ['Mikrofon', 'NF-Verstärker', 'NF-Filter', 'FM-Modulator', 'Mischer (VFO)', 'HF-Filter', 'HF-Verstärker', 'Antenne'];
const RX = ['Antenne', 'HF-Verstärker', 'Mischer (VFO)', 'ZF-Filter', 'FM-Demodulator', 'NF-Filter', 'NF-Verstärker', 'Lautsprecher'];
const TXP = { after: 2, ok: 2, why: 'Punkt 2 (hinter dem NF-Filter, direkt vor dem FM-Modulator): Das Datensignal umgeht Mikrofonverstärker und das sprachoptimierte NF-Filter und geht unverfälscht in den Modulator.' };
const RXP = { ok: 4, why: 'Punkt 4 (direkt hinter dem FM-Demodulator): Das demodulierte Signal wird abgegriffen, bevor NF-Filter und NF-Verstärker es für Sprache zurechtbiegen.' };

export default function mount(stage, { complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const W = 580, Hh = 150;
  const svgs = {};
  const g = goals(root, [{ id: 'tx', label: 'Senden: Einspeisepunkt gefunden' }, { id: 'rx', label: 'Empfangen: Abgriffspunkt gefunden' }], () => complete?.());
  const fb = h('div', { class: 'vz-note', style: 'line-height:1.55;margin-top:8px;min-height:3em' });
  for (const [key, names, info, q] of [['tx', TX, TXP, 'Senden: Wo speist du das 9600-Baud-Datensignal ein?'], ['rx', RX, RXP, 'Empfangen: Wo wird es abgegriffen?']]) {
    const box = h('div', { style: 'margin-bottom:10px;overflow-x:auto' }, h('div', { style: 'font-weight:600;margin:6px 0', text: q }));
    const svg = s('svg', { class: 'vz-svg', viewBox: `0 0 ${W} ${Hh}`, style: 'min-width:560px', role: 'img', 'aria-label': 'Blockschaltbild ' + (key === 'tx' ? 'Sendezweig' : 'Empfangszweig') + ' eines FM-Transceivers mit vier Punkten' });
    const bw = 60, gap = (W - 20 - bw * 8) / 7;
    names.forEach((nm, i) => {
      const x = 10 + i * (bw + gap), end = i === 0 && key === 'rx' || i === 7;
      svg.append(rect(x, 34, bw, 46, { r: 6, fill: 'var(--surface)', stroke: 'var(--ink-2)', sw: 1.4 }));
      const parts = nm.split(' (')[0].split('-'); const lines = nm.includes('Verstärker') ? [nm.split('-')[0], 'Verstärker'] : nm.includes('Filter') ? [nm.split('-')[0], 'Filter'] : nm.includes('Mischer') ? ['Mischer', '+ VFO'] : nm.includes('Modulator') ? ['FM-', 'Modulator'] : nm.includes('Demodulator') ? ['FM-', 'Demodulator'] : [nm];
      lines.forEach((t, k) => svg.append(txt(x + bw / 2, 54 + k * 13 - (lines.length === 1 ? 5 : 0) + 4, t, { anchor: 'middle', size: 10.5, fill: 'var(--ink)' })));
      void parts; void end;
      if (i < 7) svg.append(line(x + bw, 57, x + bw + gap, 57, { color: 'var(--ink-2)', w: 1.5 }));
    });
    const btns = [];
    // vier Punkte: zwischen Block 2/3, 3/4 … je nach Zweig
    const slots = [1, 2, 3, 4];   // Punkt k liegt hinter Block slots[k-1]
    slots.forEach((after, k) => {
      const x = 10 + after * (bw + gap) + bw + gap / 2;
      svg.append(line(x, 30, x, 112, { color: 'var(--muted)', w: 1.2, dash: '4 4' }));
      const c = s('g', { style: 'cursor:pointer', tabindex: 0, role: 'button', 'aria-label': 'Punkt ' + (k + 1) });
      c.append(s('circle', { cx: x, cy: 124, r: 14, fill: 'var(--surface-2)', stroke: 'var(--accent)', 'stroke-width': 2 }), txt(x, 129, String(k + 1), { anchor: 'middle', size: 14, fill: 'var(--accent)', bold: true }));
      const pick = () => { const ok = k + 1 === info.ok; c.firstChild.setAttribute('fill', ok ? 'var(--good)' : 'var(--bad)'); c.lastChild.setAttribute('fill', '#fff'); fb.innerHTML = (ok ? '<b style="color:var(--good)">Richtig.</b> ' : '<b style="color:var(--bad)">Nicht dieser Punkt.</b> Überlege, was zwischen Mikrofon/Lautsprecher und Modulator/Demodulator nur für Sprache gedacht ist. ') + (ok ? info.why : ''); if (ok) g.reach(key); };
      c.onclick = pick; c.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') pick(); };
      svg.append(c); btns.push(c);
    });
    svgs[key] = svg; box.append(svg); root.insertBefore(box, g.el);
  }
  root.insertBefore(fb, g.el);
}
