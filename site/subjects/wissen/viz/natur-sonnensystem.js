// Maßstabsmodell des Sonnensystems: Wähle, wie groß die Sonne sein soll,
// und sieh, wie groß die Planeten werden und wie weit weg sie liegen.
// params: { goalPlanet?: 'Neptun' } — nach dem Anklicken aller acht Planeten wird complete() aufgerufen.

const AU_KM = 149.6e6;
const SUN_KM = 1392700;
const PLANETS = [
  { name: 'Merkur', d: 4879, au: 0.387, color: '#9e9e9e', note: 'Kleinster Planet, kein Mond, Tag/Nacht-Temperaturen von −170 bis +430 °C.' },
  { name: 'Venus', d: 12104, au: 0.723, color: '#e0b36a', note: 'Heißester Planet (rund 465 °C) wegen extremen Treibhauseffekts; dreht sich rückwärts.' },
  { name: 'Erde', d: 12756, au: 1.0, color: '#3d7bd9', note: 'Einziger bekannter Planet mit Leben und flüssigem Wasser an der Oberfläche; ein Mond.' },
  { name: 'Mars', d: 6792, au: 1.524, color: '#c1502e', note: 'Der „Rote Planet“ (Eisenoxid); höchster Vulkan des Sonnensystems: Olympus Mons.' },
  { name: 'Jupiter', d: 142984, au: 5.203, color: '#c99a6b', note: 'Größter Planet — über 1.300 Erden passen hinein; Großer Roter Fleck ist ein Sturm.' },
  { name: 'Saturn', d: 120536, au: 9.537, color: '#d8c38a', note: 'Berühmt für seine Ringe aus Eis und Gestein; geringere Dichte als Wasser.' },
  { name: 'Uranus', d: 51118, au: 19.19, color: '#7fc7d3', note: 'Eisriese, der „auf der Seite liegt“ (Achse um ca. 98° geneigt); 1781 von Herschel entdeckt.' },
  { name: 'Neptun', d: 49528, au: 30.07, color: '#3f5fc9', note: 'Äußerster Planet, stärkste Winde des Sonnensystems; 1846 entdeckt — vorher berechnet.' },
];
const PRESETS = [
  { label: 'Stecknadelkopf (2 mm)', cm: 0.2 },
  { label: 'Murmel (1,5 cm)', cm: 1.5 },
  { label: 'Fußball (22 cm)', cm: 22 },
  { label: 'Gymnastikball (1 m)', cm: 100 },
];

const fmtLen = cm => cm < 0.1 ? `${(cm * 10).toFixed(2).replace('.', ',')} mm`
  : cm < 1 ? `${(cm * 10).toFixed(1).replace('.', ',')} mm`
  : cm < 100 ? `${cm.toFixed(1).replace('.', ',')} cm`
  : cm < 100000 ? `${(cm / 100).toFixed(cm < 1000 ? 1 : 0).replace('.', ',')} m`
  : `${(cm / 100000).toFixed(1).replace('.', ',')} km`;
const fmtLight = au => { const s = au * 499; return s < 3600 ? `${Math.round(s / 60)} Min.` : `${(s / 3600).toFixed(1).replace('.', ',')} Std.`; };

export default function mount(stage, { complete }) {
  let sunCm = 22, log = true;
  const seen = new Set();
  stage.innerHTML = `
    <div class="vz">
      <div class="vz-controls">
        <div class="vz-seg preset">${PRESETS.map((p, i) => `<button data-i="${i}" class="${p.cm === sunCm ? 'on' : ''}">${p.label}</button>`).join('')}</div>
        <div class="vz-seg scale"><button data-log="1" class="on">Abstände logarithmisch</button><button data-log="0">maßstabsgetreu</button></div>
      </div>
      <svg class="vz-svg" viewBox="0 0 760 170"></svg>
      <div class="vz-readout info"></div>
      <div style="overflow-x:auto"><table class="ss-table" style="width:100%;border-collapse:collapse;font-size:.88rem"></table></div>
      <p class="vz-note">Klicke die Planeten in der Grafik an. Im maßstabsgetreuen Modus siehst du, wie leer das Sonnensystem ist — die inneren Planeten verschwinden fast in der Sonne.</p>
    </div>`;
  const svg = stage.querySelector('svg');
  const info = stage.querySelector('.info');

  function draw() {
    const x0 = 30, x1 = 745;
    const maxAu = 30.07;
    const xPos = au => log ? x0 + 40 + Math.log10(1 + au * 9) / Math.log10(1 + maxAu * 9) * (x1 - x0 - 40) : x0 + au / maxAu * (x1 - x0);
    // Sizes are exaggerated for visibility but keep true ratios among planets.
    const rPl = d => Math.max(2, Math.sqrt(d / 142984) * 22);
    svg.innerHTML = `
      <line x1="${x0}" y1="85" x2="${x1}" y2="85" stroke="var(--line-2)" stroke-dasharray="3 5"/>
      <circle cx="${x0 - 8}" cy="85" r="${log ? 34 : 26}" fill="#f5b83d"/>
      <text x="${x0 - 8}" y="145" text-anchor="middle" font-size="11" font-family="Inter" fill="var(--ink-2)">Sonne</text>
      ${PLANETS.map((p, i) => `
        <g class="pl" data-i="${i}" style="cursor:pointer">
          <circle cx="${xPos(p.au)}" cy="85" r="${rPl(p.d) + 8}" fill="transparent"/>
          <circle cx="${xPos(p.au)}" cy="85" r="${rPl(p.d)}" fill="${p.color}" stroke="${seen.has(i) ? 'var(--ink)' : '#fff'}" stroke-width="${seen.has(i) ? 2 : 1}"/>
          ${p.name === 'Saturn' ? `<ellipse cx="${xPos(p.au)}" cy="85" rx="${rPl(p.d) * 1.8}" ry="${rPl(p.d) * 0.45}" fill="none" stroke="#b8a46b" stroke-width="1.5"/>` : ''}
          ${!log && i < 4 && i !== 2 ? '' : `<text x="${xPos(p.au)}" y="${i % 2 ? 140 : 40}" text-anchor="${i === 7 ? 'end' : 'middle'}" font-size="11" font-family="Inter" fill="var(--ink)">${!log && i === 2 ? 'innere Planeten' : p.name}</text>`}
        </g>`).join('')}
      <text x="${x1}" y="163" text-anchor="end" font-size="10" font-family="Inter" fill="var(--muted)">Planetengrößen vergrößert, Verhältnisse untereinander stimmen</text>`;
    svg.querySelectorAll('.pl').forEach(g => g.addEventListener('click', () => {
      const i = +g.dataset.i, p = PLANETS[i];
      seen.add(i);
      const k = sunCm / SUN_KM;
      info.innerHTML = `<span class="vz-stat hl"><b style="margin:0">${p.name}</b></span>
        <span class="vz-stat">Modellgröße<b>${fmtLen(p.d * k)}</b></span>
        <span class="vz-stat">Modellabstand<b>${fmtLen(p.au * AU_KM * k)}</b></span>
        <span class="vz-stat">Licht braucht<b>${fmtLight(p.au)}</b></span>
        <span class="vz-note" style="flex-basis:100%">${p.note}</span>`;
      draw();
      if (seen.size === PLANETS.length) complete();
    }));
    const k = sunCm / SUN_KM;
    stage.querySelector('.ss-table').innerHTML = `
      <tr style="color:var(--muted);text-align:left"><th style="padding:4px 8px">Planet</th><th style="padding:4px 8px">Durchmesser</th><th style="padding:4px 8px">Abstand zur Sonne</th><th style="padding:4px 8px">im Modell: Größe</th><th style="padding:4px 8px">im Modell: Abstand</th></tr>
      ${PLANETS.map(p => `<tr style="border-top:1px solid var(--line)"><td style="padding:4px 8px"><b>${p.name}</b></td><td style="padding:4px 8px">${p.d.toLocaleString('de-DE')} km</td><td style="padding:4px 8px">${(p.au * 149.6).toLocaleString('de-DE', { maximumFractionDigits: 0 })} Mio. km</td><td style="padding:4px 8px">${fmtLen(p.d * k)}</td><td style="padding:4px 8px">${fmtLen(p.au * AU_KM * k)}</td></tr>`).join('')}`;
  }

  stage.querySelector('.preset').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    sunCm = PRESETS[+b.dataset.i].cm;
    stage.querySelectorAll('.preset button').forEach(x => x.classList.toggle('on', x === b));
    info.innerHTML = '';
    draw();
  });
  stage.querySelector('.scale').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    log = b.dataset.log === '1';
    stage.querySelectorAll('.scale button').forEach(x => x.classList.toggle('on', x === b));
    draw();
  });
  draw();
}
