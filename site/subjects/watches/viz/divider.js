// Quartz frequency divider: 15 flip-flops halve 32,768 Hz down to 1 Hz.

export default function mount(stage, { complete }) {
  let n = 0;
  stage.innerHTML = `
    <div class="vz">
      <div class="dv-chain" style="display:grid;grid-template-columns:repeat(16,1fr);gap:4px;align-items:end"></div>
      <svg class="vz-svg dv-wave" viewBox="0 0 560 70"></svg>
      <div class="vz-controls">
        <button class="btn small ghost minus">− stage</button>
        <button class="btn small primary plus">+ stage (halve)</button>
        <div class="vz-readout"></div>
        <span class="dv-led" title="Output" style="width:18px;height:18px;border-radius:50%;background:var(--line-2);display:inline-block;transition:background .05s"></span>
      </div>
      <p class="vz-note">Each flip-flop toggles its output on every rising edge of its input — so its output has half the frequency. The LED blinks at the output frequency once it is slow enough to see.</p>
    </div>`;
  const chain = stage.querySelector('.dv-chain');
  const wave = stage.querySelector('.dv-wave');
  const led = stage.querySelector('.dv-led');

  function draw() {
    const f = 32768 / 2 ** n;
    chain.innerHTML = Array.from({ length: 16 }, (_, i) => {
      const on = i <= n;
      const label = i === 0 ? 'Q' : `÷2`;
      return `<div style="text-align:center;font-size:.68rem;color:${on ? 'var(--ink)' : 'var(--muted)'}">
        <div style="height:${22 + (15 - i) * 2}px;border-radius:7px;display:grid;place-items:center;font-weight:600;
          background:${on ? (i === 0 ? 'var(--grad)' : 'var(--accent-soft)') : 'var(--surface-2)'};
          color:${on && i === 0 ? '#fff' : 'inherit'};border:1px solid ${on ? 'var(--accent-line)' : 'var(--line)'}">${label}</div>
        <div style="margin-top:3px">${fmt(32768 / 2 ** i)}</div></div>`;
    }).join('');
    // waveform over a fixed 1-second window (capped at 64 periods so it stays drawable)
    const periods = Math.min(64, 2 ** (15 - n));
    let d = 'M0 55';
    const w = 560 / periods;
    for (let i = 0; i < periods; i++) d += ` L${i * w} 15 L${i * w + w / 2} 15 L${i * w + w / 2} 55 L${(i + 1) * w} 55`;
    wave.innerHTML = `<path d="${d}" fill="none" stroke="var(--accent)" stroke-width="2"/><text x="6" y="12" font-size="10" fill="var(--muted)" font-family="Inter">output over 1 second${periods === 64 && n < 9 ? ' (too fast to draw — capped)' : ''}</text>`;
    stage.querySelector('.vz-readout').innerHTML = `
      <span class="vz-stat">stages<b>${n}/15</b></span>
      <span class="vz-stat hl">output<b>${fmt(f)}</b></span>
      <span class="vz-stat">= 32,768 / 2<sup>${n}</sup></span>`;
    if (n === 15) complete();
  }
  function fmt(f) { return f >= 1000 ? `${(f / 1000).toFixed(f % 1000 ? 3 : 0)} kHz` : `${+f.toFixed(3)} Hz`; }

  let t0 = performance.now();
  (function blink(now) {
    if (!document.body.contains(stage)) return;
    const f = 32768 / 2 ** n;
    led.style.background = f <= 16 ? (Math.floor((now - t0) / 1000 * f * 2) % 2 ? 'var(--accent)' : 'var(--line-2)') : 'var(--accent-line)';
    requestAnimationFrame(blink);
  })(t0);

  stage.querySelector('.plus').onclick = () => { if (n < 15) { n++; draw(); } };
  stage.querySelector('.minus').onclick = () => { if (n > 0) { n--; draw(); } };
  draw();
}
