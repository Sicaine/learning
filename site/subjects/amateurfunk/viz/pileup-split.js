// Pile-up und Split-Betrieb: Die DX-Station sendet auf f_TX und hört woanders. Du stellst Hör- und Rufefrequenz ein.
// Ansagen: „N up“ (hört N kHz über der eigenen Sendefrequenz) und „tuning a to b up“ (hört auf wechselnden Frequenzen im Bereich).
import { h, s } from '../../../assets/js/vizkit/base.js';
import { controls, goals } from '../../../assets/js/vizkit/controls.js';

const pickOf = a => a[Math.floor(Math.random() * a.length)];
const mkScenario = (kind) => {
  const tx = pickOf([14195, 14205, 14210, 21285, 28410, 7160]);
  if (kind === 'up') { const n = pickOf([1, 2, 3, 5, 10]); return { tx, kind, lo: tx + n, hi: tx + n, say: `CQ DX, this is 3B8ZZ, ${n} up`, hint: `„${n} up“ heißt: Die Station hört ${n} kHz oberhalb ihrer Sendefrequenz.` }; }
  const a = pickOf([5, 10, 15]), b = a + pickOf([5, 10]);
  return { tx, kind, lo: tx + a, hi: tx + b, say: `CQ DX, this is 3B8ZZ, split up ${tx + a} to ${tx + b}`, hint: `„split up ${tx + a} to ${tx + b}“ (kurz „tuning ${String(tx + a).slice(-3)} to ${String(tx + b).slice(-3)} up“): Die Station hört auf wechselnden Frequenzen von ${tx + a} bis ${tx + b} kHz.` };
};

export default function mount(stage, { complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  let sc = mkScenario('up'), tries = 0;
  const say = h('div', { class: 'vz-stat hl', style: 'display:block;padding:12px 16px;margin-bottom:8px;font:600 1.02rem var(--mono)' });
  const svg = s('svg', { class: 'vz-svg', viewBox: '0 0 400 150', role: 'img', 'aria-label': 'Frequenzachse mit Sendefrequenz der DX-Station, Hörbereich und deinen Einstellungen' });
  root.append(say, svg);
  let ui;
  const mk = () => ui = controls(root, [
    { id: 'rx', label: 'Ich höre auf', min: sc.tx - 5, max: sc.tx + 40, step: 1, value: sc.tx - 5, unit: 'kHz', format: v => `${v} kHz` },
    { id: 'tx', label: 'Ich rufe auf', min: sc.tx - 5, max: sc.tx + 40, step: 1, value: sc.tx - 5, unit: 'kHz', format: v => `${v} kHz` },
  ], run);
  mk();
  const btn = h('button', { type: 'button', class: 'btn primary', text: 'Anrufen', style: 'margin:8px 8px 0 0' });
  const nxt = h('button', { type: 'button', class: 'btn ghost', text: 'Neue Station', style: 'margin-top:8px' });
  const res = h('div', { class: 'vz-note', style: 'margin-top:10px;line-height:1.55;min-height:3em' });
  root.append(h('div', {}, btn, nxt), res);
  const g = goals(root, [
    { id: 'up', label: '„N up“ richtig beantworten' },
    { id: 'range', label: 'Hörbereich („split up a to b“) treffen' },
    { id: 'fail', label: 'Den typischen Fehler erleben: auf der DX-Frequenz rufen' },
  ], () => complete?.());

  function draw() {
    const v = ui.values, x0 = 20, x1 = 380, f0 = sc.tx - 5, f1 = sc.tx + 40;
    const X = f => x0 + (f - f0) / (f1 - f0) * (x1 - x0), cl = (x, lo, hi) => Math.min(Math.max(x, lo), hi);
    const els = [
      s('line', { x1: x0, y1: 78, x2: x1, y2: 78, stroke: 'var(--ink-2)', 'stroke-width': 2 }),
      s('rect', { x: X(sc.lo), y: 50, width: Math.max(6, X(sc.hi + 0.0001) - X(sc.lo)), height: 28, fill: 'var(--good-soft)', stroke: 'var(--good)', rx: 3 }),
      s('text', { x: cl((X(sc.lo) + X(sc.hi)) / 2, 60, 340), y: 42, 'text-anchor': 'middle', 'font-size': 12, fill: 'var(--good)', 'font-weight': 700 }, 'DX hört hier'),
      s('line', { x1: X(sc.tx), y1: 24, x2: X(sc.tx), y2: 82, stroke: 'var(--bad)', 'stroke-width': 3 }),
      s('text', { x: cl(X(sc.tx), 50, 350), y: 17, 'text-anchor': 'middle', 'font-size': 12, fill: 'var(--bad)', 'font-weight': 700 }, `DX sendet ${sc.tx}`),
      s('circle', { cx: X(v.rx), cy: 94, r: 6, fill: 'var(--accent)' }),
      s('text', { x: cl(X(v.rx), 40, 360), y: 118, 'text-anchor': 'middle', 'font-size': 12, fill: 'var(--accent)', 'font-weight': 700 }, 'ich höre'),
      s('path', { d: `M${X(v.tx)} 86 l-7 11 h14 z`, fill: 'var(--warn)' }),
      s('text', { x: cl(X(v.tx), 40, 360), y: 140, 'text-anchor': 'middle', 'font-size': 12, fill: 'var(--warn)', 'font-weight': 700 }, 'ich rufe'),
    ];
    for (let f = Math.ceil(f0 / 5) * 5; f <= f1; f += 5) els.push(s('line', { x1: X(f), y1: 78, x2: X(f), y2: 83, stroke: 'var(--muted)' }));
    svg.replaceChildren(...els);
  }
  function run() { say.textContent = `„${sc.say}“`; draw(); }
  btn.onclick = () => {
    const v = ui.values; tries++;
    const hearOk = v.rx === sc.tx, callOk = v.tx >= sc.lo && v.tx <= sc.hi;
    let msg;
    if (v.tx === sc.tx) { msg = '<b style="color:var(--bad)">Falsch.</b> Du rufst genau dort, wo die DX-Station **sendet** — sie hört dich dort nicht und du störst alle anderen, die sie noch hören wollen. Das ist der klassische Anfängerfehler.'; g.reach('fail'); }
    else if (hearOk && callOk) { msg = `<b style="color:var(--good)">Richtig.</b> Du hörst auf ${sc.tx} kHz (dort sendet die DX-Station) und rufst bei ${v.tx} kHz, im Hörbereich. ${sc.kind === 'range' ? 'Weil niemand weiß, wo genau sie gerade hört, ist es Glückssache, ob dein Anruf durchkommt — aber nur ein Teil des Pile-ups trifft jeweils die richtige Frequenz.' : ''}`; g.reach(sc.kind); }
    else if (!hearOk && callOk) msg = '<b style="color:var(--bad)">Fast.</b> Der Rufbereich stimmt, aber du hörst nicht auf der Sendefrequenz der DX-Station: Du verpasst, wenn sie dich aufruft. **Hören** auf der DX-Frequenz, **rufen** im angesagten Bereich.';
    else msg = `<b style="color:var(--bad)">Nicht ganz.</b> ${sc.hint} Du musst bei dieser Frequenz oder in diesem Bereich rufen.`;
    res.innerHTML = msg.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
  };
  nxt.onclick = () => {
    sc = mkScenario(tries % 2 === 0 ? 'up' : 'range'); res.textContent = '';
    ui.el.remove(); mk(); root.insertBefore(ui.el, btn.parentNode); run();
  };
  root.insertBefore(ui.el, btn.parentNode);
  run();
}
