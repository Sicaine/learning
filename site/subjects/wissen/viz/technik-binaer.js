// 8 Bit = 1 Byte: Schalte Bits an und aus und sieh die Dezimalzahl.
// params: { targets: [42, 255, 100] } — complete() wenn alle Zielzahlen einmal eingestellt wurden.

export default function mount(stage, { params, complete }) {
  const targets = params.targets || [42, 255, 100];
  const hit = new Set();
  let bits = [0, 0, 0, 0, 0, 0, 0, 0];
  stage.innerHTML = `
    <div class="vz">
      <div class="bits" style="display:grid;grid-template-columns:repeat(8,1fr);gap:6px"></div>
      <div class="vz-readout"></div>
      <div class="vz-readout goals"></div>
      <p class="vz-note">Jede Stelle ist doppelt so viel wert wie die rechts daneben. Tippe auf ein Bit, um es umzuschalten.</p>
    </div>`;
  const draw = () => {
    const val = bits.reduce((s, b, i) => s + b * 2 ** (7 - i), 0);
    if (targets.includes(val)) hit.add(val);
    stage.querySelector('.bits').innerHTML = bits.map((b, i) => `
      <button data-i="${i}" style="border:1.5px solid ${b ? 'var(--accent)' : 'var(--line)'};background:${b ? 'var(--accent)' : 'var(--surface)'};color:${b ? '#fff' : 'var(--ink)'};border-radius:12px;padding:10px 0;display:grid;gap:2px;transition:all .15s">
        <b style="font-size:1.4rem;font-family:var(--mono)">${b}</b><small style="opacity:.75">${2 ** (7 - i)}</small>
      </button>`).join('');
    stage.querySelector('.vz-readout').innerHTML = `
      <span class="vz-stat">binär<b>${bits.join('')}</b></span>
      <span class="vz-stat hl">dezimal<b>${val}</b></span>
      <span class="vz-stat">Rechnung<b>${bits.map((b, i) => b ? 2 ** (7 - i) : null).filter(Boolean).join(' + ') || '0'}</b></span>`;
    stage.querySelector('.goals').innerHTML = targets.map(t => `<span class="vz-stat ${hit.has(t) ? 'hl' : ''}">${hit.has(t) ? '✓' : '○'} Stelle ${t} ein</span>`).join('');
    if (targets.every(t => hit.has(t))) complete();
  };
  stage.querySelector('.bits').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    bits[+b.dataset.i] ^= 1; draw();
  });
  draw();
}
