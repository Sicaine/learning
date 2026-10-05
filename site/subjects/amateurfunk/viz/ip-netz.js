// IP-Netz-Prüfer: IPv4-Adresse, Präfixlänge (/n) und Subnetzmaske – welcher Partner ist direkt (ohne Router) erreichbar?
// params: { }
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { h } from './_funk.js';

const IPS_A = ['192.168.1.20', '141.17.5.18', '10.20.30.40'];
const IPS_B = ['192.168.1.77', '192.168.2.5', '141.17.5.200', '10.20.31.7'];
const toNum = ip => ip.split('.').reduce((a, o) => a * 256 + +o, 0);
const bits = n => n.toString(2).padStart(32, '0');
const dotted = n => [24, 16, 8, 0].map(s => (n >>> s) & 255).join('.');

export default function mount(stage, { complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const box = h('div', { class: 'vz-stat', style: 'display:block;padding:14px 16px;font:500 .95rem var(--mono);overflow-x:auto' });
  root.append(box);
  const ui = controls(root, [
    { id: 'a', type: 'seg', label: 'Dein Gerät (A)', options: IPS_A.map(x => [x, x]), value: IPS_A[0] },
    { id: 'b', type: 'seg', label: 'Partner (B)', options: IPS_B.map(x => [x, x]), value: IPS_B[0] },
    { id: 'p', label: 'Präfixlänge (Netzanteil)', min: 8, max: 30, step: 1, value: 24, format: v => '/' + v, digits: 0 },
  ], run);
  const out = readout(root, [{ id: 'mask', label: 'Subnetzmaske' }, { id: 'hosts', label: 'Plätze im Netz' }, { id: 'res', label: 'Ergebnis', hl: true }]);
  const g = goals(root, [
    { id: 'same', label: '192.168.1.20 und 192.168.1.77 mit /24: direkt erreichbar' },
    { id: 'split', label: '141.17.5.18 und 141.17.5.200: mit /25 getrennt, mit /24 gemeinsam' },
    { id: 'wide', label: 'Kürzeres Präfix: 192.168.1.20 und 192.168.2.5 im selben Netz' },
  ], () => complete?.());
  const seen = new Set();

  function run(v) {
    const A = toNum(v.a), B = toNum(v.b), p = v.p;
    const mask = p === 0 ? 0 : (0xffffffff << (32 - p)) >>> 0;
    const netA = (A & mask) >>> 0, netB = (B & mask) >>> 0, same = netA === netB;
    const row = (label, ip, n) => {
      const s = bits(n); let html = '';
      for (let i = 0; i < 32; i++) { if (i && i % 8 === 0) html += '<span style="color:var(--muted)">.</span>'; html += `<span style="color:${i < p ? 'var(--accent)' : 'var(--ink-2)'};${i < p ? 'font-weight:700' : ''}">${s[i]}</span>`; }
      return `<div style="white-space:nowrap"><div style="font-size:.8rem;color:var(--muted);line-height:1.3;margin-top:4px">${label} · ${ip}</div><div style="font-size:.84rem;line-height:1.5">${html}</div></div>`;
    };
    box.innerHTML = row('A', v.a, A) + row('B', v.b, B) + row('Maske', dotted(mask), mask) + `<div style="margin-top:4px;color:var(--ink-2);font:500 .85rem var(--ui,inherit)">Blau: Netzanteil (die ersten ${p} Bit) – dort müssen A und B übereinstimmen.</div>`;
    out.set({ mask: dotted(mask), hosts: String(2 ** (32 - p) - 2), res: same ? 'gleiches Netz: direkt erreichbar' : 'anderes Netz: nur über einen Router' });
    if (v.a === '192.168.1.20' && v.b === '192.168.1.77' && p === 24 && same) g.reach('same');
    if (v.a === '141.17.5.18' && v.b === '141.17.5.200') { if (p === 25 && !same) seen.add('sep'); if (p === 24 && same) seen.add('tog'); if (seen.has('sep') && seen.has('tog')) g.reach('split'); }
    if (v.a === '192.168.1.20' && v.b === '192.168.2.5' && same) g.reach('wide');
  }
  run(ui.values);
}
