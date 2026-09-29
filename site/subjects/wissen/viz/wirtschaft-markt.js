// Angebot & Nachfrage: verschiebbare Kurven, Preisregler, Überschuss/Knappheit.
// params.goals: Teilmenge von ['gleichgewicht', 'nachfrage', 'angebot'] — wird alles erreicht, ist die Aufgabe erledigt.

export default function mount(stage, { params, complete }) {
  const goals = params.goals || ['gleichgewicht', 'nachfrage', 'angebot'];
  const reached = new Set();
  const W = 520, H = 340, L = 56, R = 20, T = 20, B = 44;
  const PMAX = 10, QMAX = 100;
  let dShift = 0, sShift = 0, price = 7;

  // Nachfrage: Q = 90 - 8P + dShift, Angebot: Q = 10 + 8P + sShift
  const qd = p => Math.max(0, 90 - 8 * p + dShift);
  const qs = p => Math.max(0, 10 + 8 * p + sShift);
  const eqP = () => (80 + dShift - sShift) / 16;
  const X = q => L + q / QMAX * (W - L - R);
  const Y = p => H - B - p / PMAX * (H - T - B);
  const eur = v => `${v.toFixed(2).replace('.', ',')} €`;

  stage.innerHTML = `
    <div class="vz">
      <svg class="vz-svg" viewBox="0 0 ${W} ${H}"></svg>
      <div class="vz-controls">
        <div class="vz-control"><label>Preis <output class="o-p"></output></label><input type="range" class="r-p" min="0.5" max="9.5" step="0.05" value="${price}"></div>
        <div class="vz-control"><label>Nachfrage verschieben <output class="o-d"></output></label><input type="range" class="r-d" min="-30" max="30" step="1" value="0"></div>
        <div class="vz-control"><label>Angebot verschieben <output class="o-s"></output></label><input type="range" class="r-s" min="-30" max="30" step="1" value="0"></div>
      </div>
      <div class="vz-seg">
        <button data-sc="reset">Ausgangslage</button>
        <button data-sc="hitze">Hitzesommer (Eis)</button>
        <button data-sc="ernte">Missernte (Kartoffeln)</button>
        <button data-sc="technik">Neue Technik (günstiger produzieren)</button>
      </div>
      <div class="vz-readout main"></div>
      <div class="vz-readout goals"></div>
    </div>`;
  const svg = stage.querySelector('svg');
  const q = s => stage.querySelector(s);

  function line(f, color, label) {
    const pts = [];
    for (let p = 0; p <= PMAX; p += 0.25) { const qq = f(p); if (qq <= QMAX) pts.push(`${X(qq).toFixed(1)},${Y(p).toFixed(1)}`); }
    const lp = pts[Math.floor(pts.length * (label === 'N' ? 0.12 : 0.85))]?.split(',') || [0, 0];
    return `<polyline points="${pts.join(' ')}" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
      <text x="${+lp[0] + 8}" y="${+lp[1] - 6}" font-family="Inter" font-size="13" font-weight="700" fill="${color}">${label === 'N' ? 'Nachfrage' : 'Angebot'}</text>`;
  }

  function draw() {
    const pe = eqP(), qe = qd(pe);
    const d = qd(price), s = qs(price);
    const grid = [];
    for (let p = 0; p <= PMAX; p += 2) grid.push(`<line x1="${L}" x2="${W - R}" y1="${Y(p)}" y2="${Y(p)}" stroke="var(--line)"/><text x="${L - 8}" y="${Y(p) + 4}" text-anchor="end" font-size="11" font-family="Inter" fill="var(--muted)">${p} €</text>`);
    for (let qq = 0; qq <= QMAX; qq += 20) grid.push(`<text x="${X(qq)}" y="${H - B + 16}" text-anchor="middle" font-size="11" font-family="Inter" fill="var(--muted)">${qq}</text>`);
    const gap = Math.abs(d - s) > 0.5
      ? `<line x1="${X(Math.min(d, s))}" x2="${X(Math.max(d, s))}" y1="${Y(price)}" y2="${Y(price)}" stroke="${d > s ? 'var(--bad)' : 'var(--warn)'}" stroke-width="8" stroke-opacity=".35" stroke-linecap="round"/>`
      : '';
    svg.innerHTML = `
      ${grid.join('')}
      <line x1="${L}" y1="${T}" x2="${L}" y2="${H - B}" stroke="var(--ink-2)" stroke-width="1.5"/>
      <line x1="${L}" y1="${H - B}" x2="${W - R}" y2="${H - B}" stroke="var(--ink-2)" stroke-width="1.5"/>
      <text x="${(L + W - R) / 2}" y="${H - 8}" text-anchor="middle" font-size="12" font-family="Inter" fill="var(--ink-2)">Menge</text>
      <text x="14" y="${(T + H - B) / 2}" transform="rotate(-90 14 ${(T + H - B) / 2})" text-anchor="middle" font-size="12" font-family="Inter" fill="var(--ink-2)">Preis</text>
      ${line(qd, 'var(--accent)', 'N')}
      ${line(qs, 'var(--accent-2)', 'A')}
      <line x1="${L}" x2="${W - R}" y1="${Y(price)}" y2="${Y(price)}" stroke="var(--ink)" stroke-dasharray="5 4"/>
      ${gap}
      <circle cx="${X(qe)}" cy="${Y(pe)}" r="6" fill="var(--surface)" stroke="var(--ink)" stroke-width="2"/>
      <text x="${X(qe) + 10}" y="${Y(pe) - 10}" font-size="12" font-family="Inter" fill="var(--ink)">Gleichgewicht</text>`;

    q('.o-p').textContent = eur(price);
    q('.o-d').textContent = dShift > 0 ? `+${dShift}` : dShift;
    q('.o-s').textContent = sShift > 0 ? `+${sShift}` : sShift;
    const state = Math.abs(d - s) <= 1.5 ? '<b style="color:var(--good)">Markt geräumt</b>'
      : d > s ? `<b style="color:var(--bad)">Nachfrageüberhang</b> (Knappheit: ${Math.round(d - s)} Stück fehlen)`
      : `<b style="color:var(--warn)">Angebotsüberhang</b> (${Math.round(s - d)} Stück bleiben liegen)`;
    q('.main').innerHTML = `
      <span class="vz-stat">Nachgefragt<b>${Math.round(d)}</b></span>
      <span class="vz-stat">Angeboten<b>${Math.round(s)}</b></span>
      <span class="vz-stat hl">Gleichgewichtspreis<b>${eur(pe)}</b></span>
      <span class="vz-stat">${state}</span>`;

    if (Math.abs(d - s) <= 1.5) reached.add('gleichgewicht');
    if (dShift >= 10) reached.add('nachfrage');
    if (sShift <= -10) reached.add('angebot');
    const labels = {
      gleichgewicht: 'Stell den Preis so ein, dass der Markt geräumt ist',
      nachfrage: 'Erhöhe die Nachfrage (z. B. Hitzesommer) — was passiert mit dem Preis?',
      angebot: 'Verknappe das Angebot (z. B. Missernte) — was passiert mit dem Preis?',
    };
    q('.goals').innerHTML = goals.map(g => `<span class="vz-stat ${reached.has(g) ? 'hl' : ''}">${reached.has(g) ? '✓' : '○'} ${labels[g]}</span>`).join('');
    if (goals.every(g => reached.has(g))) complete();
  }

  q('.r-p').oninput = e => { price = +e.target.value; draw(); };
  q('.r-d').oninput = e => { dShift = +e.target.value; draw(); };
  q('.r-s').oninput = e => { sShift = +e.target.value; draw(); };
  stage.querySelectorAll('[data-sc]').forEach(b => b.onclick = () => {
    const sc = { reset: [0, 0], hitze: [20, 0], ernte: [0, -20], technik: [0, 20] }[b.dataset.sc];
    [dShift, sShift] = sc;
    q('.r-d').value = dShift; q('.r-s').value = sShift;
    stage.querySelectorAll('[data-sc]').forEach(x => x.classList.toggle('on', x === b));
    draw();
  });
  draw();
}
