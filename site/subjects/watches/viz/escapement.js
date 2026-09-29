// Animated Swiss lever escapement: balance + hairspring oscillate, the pallet fork
// flips at each beat and the 15-tooth escape wheel advances half a tooth (12°).
// params.goal: number of distinct beat rates to try before the task completes.

const RATES = [18000, 21600, 25200, 28800, 36000];

export default function mount(stage, { params, complete }) {
  const goal = params.goal || 3;
  const tried = new Set();
  let bph = 28800, slow = 0.08, sound = false;

  stage.innerHTML = `
    <div class="vz">
      <svg class="vz-svg" viewBox="0 0 560 300">
        <defs>
          <radialGradient id="escRim" cx=".5" cy=".5" r=".5"><stop offset=".82" stop-color="#e9d9b8"/><stop offset="1" stop-color="#b8925a"/></radialGradient>
        </defs>
        <g class="bal" transform="translate(150 150)"></g>
        <path class="spring" fill="none" stroke="#3b4a6b" stroke-width="1.3" transform="translate(150 150)"/>
        <g class="fork" transform="translate(300 150)">
          <path d="M-62 0 L-8 -6 L0 0 L-8 6 Z" fill="#7b8190"/>
          <path d="M-70 -9 L-58 -9 L-54 -3 L-54 3 L-58 9 L-70 9 L-66 0 Z" fill="#7b8190"/>
          <path d="M0 0 L38 -34 M0 0 L38 34" stroke="#7b8190" stroke-width="7" stroke-linecap="round"/>
          <rect x="34" y="-44" width="9" height="15" rx="2" fill="#c0392b" transform="rotate(20 38 -36)"/>
          <rect x="34" y="29" width="9" height="15" rx="2" fill="#c0392b" transform="rotate(-20 38 36)"/>
          <circle r="5" fill="#fff" stroke="#7b8190" stroke-width="2"/>
        </g>
        <g class="wheel" transform="translate(392 150)"></g>
        <g transform="translate(510 60)">
          <circle r="34" fill="#fff" stroke="var(--line-2)"/>
          ${Array.from({ length: 60 }, (_, i) => { const a = i * Math.PI / 30; const r1 = i % 5 ? 29 : 25; return `<line x1="${(Math.sin(a) * r1).toFixed(1)}" y1="${(-Math.cos(a) * r1).toFixed(1)}" x2="${(Math.sin(a) * 32).toFixed(1)}" y2="${(-Math.cos(a) * 32).toFixed(1)}" stroke="var(--muted)" stroke-width="${i % 5 ? .6 : 1.4}"/>`; }).join('')}
          <line class="sec" x1="0" y1="6" x2="0" y2="-30" stroke="#c0392b" stroke-width="1.6" stroke-linecap="round"/>
          <circle r="2.5" fill="#c0392b"/>
          <text y="52" text-anchor="middle" font-size="10" fill="var(--muted)" font-family="Inter">simulated seconds</text>
        </g>
        <text x="150" y="286" text-anchor="middle" font-size="12" fill="var(--muted)" font-family="Inter">balance + hairspring</text>
        <text x="300" y="286" text-anchor="middle" font-size="12" fill="var(--muted)" font-family="Inter">pallet fork</text>
        <text x="400" y="286" text-anchor="middle" font-size="12" fill="var(--muted)" font-family="Inter">escape wheel (15 teeth)</text>
      </svg>
      <div class="vz-controls">
        <div class="vz-control" style="flex:2"><label>Beat rate</label><div class="vz-seg rates">${RATES.map(r => `<button data-r="${r}">${r.toLocaleString('en')}</button>`).join('')}</div></div>
        <div class="vz-control"><label>Slow motion <output class="slow-out"></output></label><input type="range" class="slow" min="1" max="100" value="8"></div>
        <button class="btn small ghost snd">Tick sound: off</button>
      </div>
      <div class="vz-readout"></div>
      <p class="vz-note">Each swing of the balance (one <b>beat</b>) flips the fork once and lets the escape wheel advance 12° — half a tooth. Two beats = one full oscillation.</p>
    </div>`;
  const svg = stage.querySelector('svg');
  const q = s => stage.querySelector(s);

  // Balance wheel: rim, 3 arms, timing screws, impulse roller
  q('.bal').innerHTML = `<g class="bal-rot">
      <circle r="78" fill="none" stroke="url(#escRim)" stroke-width="10"/>
      ${[0, 120, 240].map(a => `<line x1="0" y1="0" x2="${(Math.cos(a * Math.PI / 180) * 74).toFixed(1)}" y2="${(Math.sin(a * Math.PI / 180) * 74).toFixed(1)}" stroke="#c9a66b" stroke-width="5"/>`).join('')}
      ${Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6; return `<circle cx="${(Math.cos(a) * 84).toFixed(1)}" cy="${(Math.sin(a) * 84).toFixed(1)}" r="3" fill="#8a6a3a"/>`; }).join('')}
      <circle r="14" fill="#d6d9e0" stroke="#9aa0ad"/>
      <rect x="10" y="-3" width="12" height="6" rx="2" fill="#c0392b"/>
    </g>`;
  // Escape wheel with 15 club teeth
  const teeth = Array.from({ length: 15 }, (_, i) => {
    const a = i * 24 * Math.PI / 180, a2 = a + 0.2, a3 = a + 0.32;
    const p = (r, t) => `${(Math.cos(t) * r).toFixed(1)} ${(Math.sin(t) * r).toFixed(1)}`;
    return `M${p(46, a)} L${p(62, a2)} L${p(60, a3)} L${p(46, a + 0.36)}`;
  }).join(' ');
  q('.wheel').innerHTML = `<g class="wheel-rot">
      <circle r="47" fill="#e8ecf3" stroke="#9aa0ad" stroke-width="1.5"/>
      <path d="${teeth}" fill="#e8ecf3" stroke="#9aa0ad" stroke-width="1.5" stroke-linejoin="round"/>
      ${[0, 72, 144, 216, 288].map(a => `<path d="M0 0 L${(Math.cos(a * Math.PI / 180) * 38).toFixed(1)} ${(Math.sin(a * Math.PI / 180) * 38).toFixed(1)}" stroke="#fff" stroke-width="9" stroke-linecap="round"/>`).join('')}
      <circle r="6" fill="#9aa0ad"/></g>`;

  let audio;
  const tick = () => {
    if (!sound) return;
    audio ??= new (window.AudioContext || window.webkitAudioContext)();
    const o = audio.createOscillator(), g = audio.createGain();
    o.frequency.value = 2400; o.type = 'square';
    g.gain.setValueAtTime(0.08, audio.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + 0.02);
    o.connect(g); g.connect(audio.destination); o.start(); o.stop(audio.currentTime + 0.03);
  };

  let simT = 0, last = performance.now(), prevSign = 1, beats = 0, forkSide = 1, forkAnim = 1, wheelAngle = 0, wheelTarget = 0;
  const A = 270; // amplitude in degrees

  function readout() {
    q('.slow-out').textContent = `${Math.round(slow * 100)}% speed`;
    q('.vz-readout').innerHTML = `
      <span class="vz-stat hl">${bph.toLocaleString('en')} bph</span>
      <span class="vz-stat">frequency<b>${(bph / 7200).toFixed(1)} Hz</b></span>
      <span class="vz-stat hl">ticks / second<b>${(bph / 3600).toFixed(0)}</b></span>
      <span class="vz-stat">amplitude<b>${A}°</b></span>
      <span class="vz-stat">beats counted<b>${beats}</b></span>
      <span class="vz-stat">rates tried<b>${tried.size}/${goal}</b></span>`;
    stage.querySelectorAll('.rates button').forEach(b => b.classList.toggle('on', +b.dataset.r === bph));
  }
  function setRate(r) {
    bph = r; tried.add(r); readout();
    if (tried.size >= goal) complete();
  }

  function frame(now) {
    if (!document.body.contains(stage)) return;
    const dt = Math.min(0.05, (now - last) / 1000) * slow;
    last = now;
    simT += dt;
    const f = bph / 7200;
    const theta = A * Math.sin(2 * Math.PI * f * simT);
    const sign = Math.sign(Math.sin(2 * Math.PI * f * simT)) || prevSign;
    if (sign !== prevSign) {
      beats++; forkSide = -forkSide; forkAnim = 0; wheelTarget += 12; tick();
      if (beats % 4 === 0) readout();
    }
    prevSign = sign;

    q('.bal-rot').setAttribute('transform', `rotate(${theta.toFixed(2)})`);
    // hairspring: inner end turns with the balance, outer end is fixed
    const pts = [];
    for (let i = 0; i <= 160; i++) {
      const u = i / 160, r = 6 + u * 40;
      const ang = u * 5.5 * 2 * Math.PI + (theta * Math.PI / 180) * (1 - u) * 0.35;
      pts.push(`${(Math.cos(ang) * r).toFixed(1)},${(Math.sin(ang) * r).toFixed(1)}`);
    }
    q('.spring').setAttribute('d', 'M' + pts.join(' L'));

    forkAnim = Math.min(1, forkAnim + dt * f * 2 * 6);
    const ease = 1 - Math.pow(1 - forkAnim, 3);
    const forkAngle = 9 * (-forkSide + 2 * forkSide * ease);
    q('.fork').setAttribute('transform', `translate(300 150) rotate(${forkAngle.toFixed(2)})`);
    wheelAngle += (wheelTarget - wheelAngle) * Math.min(1, dt * f * 2 * 14);
    q('.wheel-rot').setAttribute('transform', `rotate(${(-wheelAngle).toFixed(2)})`);
    // simulated seconds hand steps once per beat
    const secAngle = (beats / (bph / 3600)) * 6;
    q('.sec').setAttribute('transform', `rotate(${secAngle.toFixed(2)})`);
    requestAnimationFrame(frame);
  }

  stage.querySelectorAll('.rates button').forEach(b => b.onclick = () => setRate(+b.dataset.r));
  q('.slow').oninput = e => { slow = Math.max(0.01, e.target.value / 100); readout(); };
  q('.snd').onclick = e => { sound = !sound; e.target.textContent = `Tick sound: ${sound ? 'on' : 'off'}`; };
  tried.add(bph);
  readout();
  requestAnimationFrame(frame);
}
