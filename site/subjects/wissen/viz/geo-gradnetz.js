// Gradnetz der Erde: Koordinaten ablesen und Orte nach Koordinaten finden.
// Wichtige Linien (Äquator, Wendekreise, Polarkreise, Nullmeridian, Datumsgrenze) sind hervorgehoben.
// Spiel: Ort anhand seiner Koordinaten anklicken; 5 Treffer (< 1.000 km) erfüllen die Aufgabe.

import { W, H, land } from './geo-welt-data.js';

const TARGETS = [
  { name: 'Berlin', lat: 52.5, lon: 13.4 },
  { name: 'Kapstadt', lat: -33.9, lon: 18.4 },
  { name: 'Rio de Janeiro', lat: -22.9, lon: -43.2 },
  { name: 'New York', lat: 40.7, lon: -74.0 },
  { name: 'Tokio', lat: 35.7, lon: 139.7 },
  { name: 'Sydney', lat: -33.9, lon: 151.2 },
  { name: 'Kairo', lat: 30.0, lon: 31.2 },
  { name: 'Mumbai', lat: 19.1, lon: 72.9 },
  { name: 'Mexiko-Stadt', lat: 19.4, lon: -99.1 },
  { name: 'Reykjavík', lat: 64.1, lon: -21.9 },
  { name: 'Nullpunkt (0°/0°)', lat: 0, lon: 0 },
];
const LINES = [
  { lat: 0, name: 'Äquator', color: 'var(--accent)' },
  { lat: 23.44, name: 'Nördlicher Wendekreis', color: 'var(--accent-2)' },
  { lat: -23.44, name: 'Südlicher Wendekreis', color: 'var(--accent-2)' },
  { lat: 66.56, name: 'Nördlicher Polarkreis', color: '#4d7ea8' },
  { lat: -66.56, name: 'Südlicher Polarkreis', color: '#4d7ea8' },
];

const px = (lat, lon) => [(lon + 180) * 2, (90 - lat) * 2];
const fmt = (v, pos, neg) => `${Math.abs(v).toFixed(0)}° ${v >= 0 ? pos : neg}`;
const coord = (lat, lon) => `${fmt(lat, 'N', 'S')}, ${fmt(lon, 'O', 'W')}`;
function km(a, b) {
  const R = 6371, r = Math.PI / 180;
  const dLat = (b.lat - a.lat) * r, dLon = (b.lon - a.lon) * r;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export default function mount(stage, { complete }) {
  const grid = [];
  for (let lon = -150; lon <= 150; lon += 30) grid.push(`<line x1="${px(0, lon)[0]}" y1="0" x2="${px(0, lon)[0]}" y2="${H}" stroke="#c9d6e3" stroke-width="${lon === 0 ? 0 : 0.6}"/>`);
  for (let lat = -60; lat <= 60; lat += 30) if (lat) grid.push(`<line x1="0" y1="${px(lat, 0)[1]}" x2="${W}" y2="${px(lat, 0)[1]}" stroke="#c9d6e3" stroke-width="0.6"/>`);
  const special = LINES.map(l => `<line x1="0" y1="${px(l.lat, 0)[1]}" x2="${W}" y2="${px(l.lat, 0)[1]}" stroke="${l.color}" stroke-width="1.3" stroke-dasharray="${l.lat ? '5 4' : ''}"/><text x="4" y="${px(l.lat, 0)[1] - 3}" font-size="9" font-family="Inter" fill="${l.color}">${l.name}</text>`).join('');

  stage.innerHTML = `
    <div class="vz">
      <div class="vz-controls"><div class="vz-seg"><button data-m="explore" class="on">Entdecken</button><button data-m="game">Orte finden</button></div></div>
      <div class="gn-prompt vz-note" style="font-size:1rem;min-height:1.6em">Fahre über die Karte: Die Koordinaten des Mauszeigers stehen unten.</div>
      <svg class="vz-svg" viewBox="0 0 ${W} ${H}" style="background:#eaf2f9;cursor:crosshair">
        ${grid.join('')}
        <path d="${land}" fill="#f7f3ea" stroke="#b9ad96" stroke-width="0.5"/>
        ${special}
        <line x1="${W / 2}" y1="0" x2="${W / 2}" y2="${H}" stroke="var(--ink)" stroke-width="1.2"/>
        <text x="${W / 2 + 4}" y="${H - 6}" font-size="9" font-family="Inter" fill="var(--ink)">Nullmeridian (Greenwich)</text>
        <text x="${W - 4}" y="${H - 6}" font-size="9" font-family="Inter" fill="var(--muted)" text-anchor="end">180° ≈ Datumsgrenze</text>
        <g class="gn-marks"></g>
      </svg>
      <div class="vz-readout"><span class="vz-stat gn-pos">Position<b>—</b></span><span class="vz-stat gn-score" hidden></span></div>
    </div>`;

  const svg = stage.querySelector('svg');
  const marks = stage.querySelector('.gn-marks');
  const prompt = stage.querySelector('.gn-prompt');
  const score = stage.querySelector('.gn-score');
  let mode = 'explore', queue = [], hits = 0, done = false;

  const toGeo = e => {
    const r = svg.getBoundingClientRect();
    const x = (e.clientX - r.left) * W / r.width, y = (e.clientY - r.top) * H / r.height;
    return { lat: 90 - y / 2, lon: x / 2 - 180 };
  };
  svg.addEventListener('pointermove', e => {
    const g = toGeo(e);
    stage.querySelector('.gn-pos').innerHTML = `Position<b>${coord(g.lat, g.lon)}</b>`;
  });

  const nextTarget = () => {
    const t = queue[0];
    prompt.innerHTML = t ? `Klicke auf <b>${coord(t.lat, t.lon)}</b> — welcher Ort ist das?` : `<b style="color:var(--good)">Alle Orte gefunden.</b>`;
    score.hidden = false;
    score.innerHTML = `Treffer<b>${hits}/5</b>`;
  };

  svg.addEventListener('click', e => {
    if (mode !== 'game' || !queue.length) return;
    const g = toGeo(e), t = queue[0];
    const d = km(g, t);
    const [cx, cy] = px(g.lat, g.lon), [tx, ty] = px(t.lat, t.lon);
    const ok = d < 1000;
    marks.innerHTML += `<line x1="${cx}" y1="${cy}" x2="${tx}" y2="${ty}" stroke="var(--muted)" stroke-dasharray="3 3"/>
      <circle cx="${cx}" cy="${cy}" r="3.5" fill="${ok ? 'var(--good)' : 'var(--bad)'}"/>
      <circle cx="${tx}" cy="${ty}" r="4.5" fill="none" stroke="var(--ink)" stroke-width="1.5"/>
      <text x="${tx + 6}" y="${ty - 5}" font-size="10" font-family="Inter" fill="var(--ink)">${t.name}</text>`;
    queue.shift();
    if (ok) hits++;
    prompt.innerHTML = `${ok ? '✓ Treffer' : '✗ Daneben'}: <b>${t.name}</b> — du lagst ${Math.round(d).toLocaleString('de-DE')} km entfernt.`;
    score.innerHTML = `Treffer<b>${hits}/5</b>`;
    if (hits >= 5 && !done) { done = true; complete(); }
    setTimeout(() => { if (mode === 'game') nextTarget(); }, 1400);
    if (!queue.length) queue = shuffle(TARGETS);
  });

  stage.querySelectorAll('[data-m]').forEach(b => b.onclick = () => {
    mode = b.dataset.m;
    stage.querySelectorAll('[data-m]').forEach(x => x.classList.toggle('on', x === b));
    marks.innerHTML = '';
    if (mode === 'game') { queue = shuffle(TARGETS); hits = 0; nextTarget(); }
    else { score.hidden = true; prompt.innerHTML = 'Fahre über die Karte: Die Koordinaten des Mauszeigers stehen unten.'; }
  });
}

function shuffle(a) { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
