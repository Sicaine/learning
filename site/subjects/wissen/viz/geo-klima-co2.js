// CO₂-Konzentration → langfristige Erwärmung (Gleichgewicht): ΔT = S · log₂(C / 280 ppm).
// S = Klimasensitivität (IPCC AR6: beste Schätzung 3 °C, wahrscheinlich 2,5–4 °C pro CO₂-Verdopplung).
// Aufgabe erfüllt, wenn „heute“ und „Verdopplung“ angesehen wurden.

const MARKS = [
  { ppm: 280, label: 'vorindustriell' },
  { ppm: 422, label: 'heute (2024)' },
  { ppm: 560, label: 'Verdopplung' },
];

export default function mount(stage, { complete }) {
  let ppm = 280, S = 3;
  const seen = new Set();
  stage.innerHTML = `
    <div class="vz">
      <div class="vz-controls">
        <div class="vz-control"><label>CO₂-Konzentration <output class="o-ppm"></output></label><input type="range" class="r-ppm" min="280" max="1000" step="1" value="280"></div>
        <div class="vz-control" style="flex:0 1 auto"><label>Klimasensitivität S</label><div class="vz-seg">${[2.5, 3, 4].map(s => `<button data-s="${s}" class="${s === 3 ? 'on' : ''}">${String(s).replace('.', ',')} °C</button>`).join('')}</div></div>
      </div>
      <div class="vz-controls">${MARKS.map(m => `<button class="btn small ghost" data-ppm="${m.ppm}">${m.label} · ${m.ppm} ppm</button>`).join('')}</div>
      <svg class="vz-svg" viewBox="0 0 640 150">
        <defs><linearGradient id="kcG" x1="0" x2="1"><stop offset="0" stop-color="#4d9bd6"/><stop offset=".35" stop-color="#f2c14e"/><stop offset=".7" stop-color="#e3703a"/><stop offset="1" stop-color="#b8322a"/></linearGradient></defs>
        <rect x="30" y="50" width="580" height="26" rx="13" fill="#eef0f5"/>
        <rect class="kc-bar" x="30" y="50" width="0" height="26" rx="13" fill="url(#kcG)"/>
        ${[0, 1, 2, 3, 4, 5, 6].map(t => `<line x1="${30 + t * 580 / 6}" y1="80" x2="${30 + t * 580 / 6}" y2="88" stroke="var(--muted)"/><text x="${30 + t * 580 / 6}" y="102" font-size="11" text-anchor="middle" font-family="Inter" fill="var(--muted)">+${t} °C</text>`).join('')}
        <line x1="${30 + 1.5 * 580 / 6}" y1="40" x2="${30 + 1.5 * 580 / 6}" y2="86" stroke="var(--ink)" stroke-dasharray="3 3"/><text x="${30 + 1.5 * 580 / 6}" y="34" font-size="10" text-anchor="middle" font-family="Inter" fill="var(--ink)">1,5 °C</text>
        <line x1="${30 + 2 * 580 / 6}" y1="40" x2="${30 + 2 * 580 / 6}" y2="86" stroke="var(--ink)" stroke-dasharray="3 3"/><text x="${30 + 2 * 580 / 6}" y="22" font-size="10" text-anchor="middle" font-family="Inter" fill="var(--ink)">2 °C (Paris)</text>
        <text class="kc-val" x="320" y="136" font-size="15" font-weight="600" text-anchor="middle" font-family="Inter" fill="var(--ink)"></text>
      </svg>
      <div class="vz-readout kc-seen"></div>
      <p class="vz-note">Das Modell zeigt die <b>langfristige</b> Erwärmung, auf die sich das Klima bei dauerhaft gleicher CO₂-Menge einpendelt. Die bisher gemessene Erwärmung (gut 1,2 °C im Mittel der letzten zehn Jahre) ist kleiner, weil Ozeane sich nur langsam erwärmen und Luftschadstoffe (Aerosole) einen Teil abschirmen — dafür wirken Methan und Lachgas zusätzlich.</p>
    </div>`;

  const bar = stage.querySelector('.kc-bar');
  const draw = () => {
    const dT = S * Math.log2(ppm / 280);
    bar.setAttribute('width', Math.max(0, Math.min(580, dT / 6 * 580)).toFixed(1));
    stage.querySelector('.o-ppm').textContent = `${ppm} ppm`;
    stage.querySelector('.r-ppm').value = ppm;
    stage.querySelector('.kc-val').textContent = `≈ +${dT.toFixed(1).replace('.', ',')} °C langfristige Erwärmung gegenüber vorindustriell`;
    if (Math.abs(ppm - 422) <= 3) seen.add('heute');
    if (Math.abs(ppm - 560) <= 3) seen.add('verdopplung');
    stage.querySelector('.kc-seen').innerHTML = `<span class="vz-stat ${seen.has('heute') ? 'hl' : ''}">${seen.has('heute') ? '✓' : '○'} Heutigen Wert einstellen</span><span class="vz-stat ${seen.has('verdopplung') ? 'hl' : ''}">${seen.has('verdopplung') ? '✓' : '○'} Verdopplung einstellen</span>`;
    if (seen.size === 2) complete();
  };
  stage.querySelector('.r-ppm').oninput = e => { ppm = +e.target.value; draw(); };
  stage.querySelectorAll('[data-ppm]').forEach(b => b.onclick = () => { ppm = +b.dataset.ppm; draw(); });
  stage.querySelectorAll('[data-s]').forEach(b => b.onclick = () => {
    S = +b.dataset.s; stage.querySelectorAll('[data-s]').forEach(x => x.classList.toggle('on', x === b)); draw();
  });
  draw();
}
