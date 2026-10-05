// Bit-Schalter: 4/8/12 Bit setzen, Dezimal- und Hexwert live; Zufallsaufgaben „stelle N ein“.
// params: { rounds?: 10, width?: 8 (4|8|12), hexEvery?: 4 (jede n-te Aufgabe in Hex angegeben, 0 = nie) }
import { h } from '../../../assets/js/vizkit/base.js';
import { controls, readout } from '../../../assets/js/vizkit/controls.js';
import { digitalStyle, bin, hex } from './_digital-helper.js';

export default function mount(stage, { params = {}, complete }) {
  digitalStyle();
  const rounds = params.rounds ?? 10, hexEvery = params.hexEvery ?? 4;
  let width = [4, 8, 12].includes(params.width) ? params.width : 8, value = 0, solved = 0, target = null, fired = false, lock = false;
  const root = h('div', { class: 'vz vk' }); stage.append(root);

  const task = h('div', { class: 'dg-task', 'aria-live': 'polite' });
  const bitsBox = h('div', { class: 'dg-bits' });
  const big = h('div', { class: 'dg-big' });
  root.append(task, bitsBox, big);
  const ui = controls(root, [{ id: 'w', type: 'seg', label: 'Bit-Breite', options: [[4, '4 Bit'], [8, '8 Bit'], [12, '12 Bit']], value: width }], v => { width = v.w; value = 0; build(); newTarget(); });
  const out = readout(root, [{ id: 'cnt', label: 'Aufgaben gelöst', hl: true }, { id: 'states', label: 'Zustände 2ⁿ' }]);
  const actions = h('div', { class: 'dg-actions' },
    h('button', { type: 'button', class: 'dg-btn', text: 'Alle aus', onclick: () => { value = 0; refresh(); } }),
    h('button', { type: 'button', class: 'dg-btn', text: 'Andere Aufgabe', onclick: () => newTarget() }));
  root.append(actions);

  let btns = [];
  function build() {
    bitsBox.replaceChildren(); btns = [];
    let nib = null;
    for (let i = width - 1; i >= 0; i--) {
      if ((width - 1 - i) % 4 === 0) { nib = h('div', { class: 'dg-nib' }); bitsBox.append(nib); nib.style.flex = '1 1 0'; }
      const w = h('span', { class: 'w', text: String(2 ** i) }), b = h('span', { class: 'b', text: '0' });
      const btn = h('button', { type: 'button', class: 'dg-bit', 'aria-label': `Bit ${i}, Wert ${2 ** i}`, 'aria-pressed': 'false', onclick: () => { if (lock) return; value ^= (1 << i); refresh(); } }, w, b);
      btns[i] = btn; nib.append(btn);
    }
  }
  function refresh() {
    for (let i = 0; i < width; i++) { const on = (value >> i) & 1; const b = btns[i]; b.classList.toggle('on', !!on); b.setAttribute('aria-pressed', !!on); b.querySelector('.b').textContent = on; }
    big.innerHTML = `<span><small>dezimal</small><b>${value}</b></span><span><small>hex</small><b>0x${hex(value, width / 4)}</b></span><span><small>dual</small><b>${bin(value, width)}</b></span>`;
    out.set({ cnt: `${solved} / ${rounds}`, states: String(2 ** width) });
    if (target != null && !lock && value === target.n) hit();
  }
  function newTarget() {
    lock = false; task.classList.remove('ok');
    if (solved >= rounds) { task.innerHTML = `Geschafft: ${rounds} Aufgaben gelöst.`; task.classList.add('ok'); target = null; refresh(); return; }
    let n; do { n = 1 + Math.floor(Math.random() * (2 ** width - 1)); } while (target && n === target.n);
    const asHex = hexEvery > 0 && (solved + 1) % hexEvery === 0;
    target = { n, asHex };
    task.innerHTML = `Aufgabe ${solved + 1} von ${rounds}: stelle <big>${asHex ? '0x' + hex(n, width / 4) : n}</big> ein` + (asHex ? ' <small>(hexadezimal)</small>' : '');
    value = 0; refresh();
  }
  function hit() {
    lock = true; solved++; task.classList.add('ok'); task.innerHTML = `✓ ${value} = ${bin(value, width)}₂ = 0x${hex(value, width / 4)}`;
    out.set({ cnt: `${solved} / ${rounds}` });
    if (solved >= rounds && !fired) { fired = true; complete?.(); }
    setTimeout(() => { if (root.isConnected) newTarget(); }, 900);
  }
  root._test = { get target() { return target; }, set(n) { value = n; refresh(); } };   // für automatische Tests
  stage.__bt = root._test;
  build(); newTarget();
}
