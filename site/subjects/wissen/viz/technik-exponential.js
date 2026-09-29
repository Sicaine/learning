// Linear vs. exponentiell: gleicher Start, gleicher Zuwachs im ersten Jahr — und dann?
// params: {} — complete() sobald die exponentielle Kurve die lineare um das 10-Fache übertrifft.

const fmt = n => n >= 1e12 ? `${(n / 1e12).toLocaleString('de-DE', { maximumFractionDigits: 1 })} Bio.`
  : n >= 1e9 ? `${(n / 1e9).toLocaleString('de-DE', { maximumFractionDigits: 1 })} Mrd.`
  : n >= 1e6 ? `${(n / 1e6).toLocaleString('de-DE', { maximumFractionDigits: 1 })} Mio.`
  : Math.round(n).toLocaleString('de-DE');

export default function mount(stage, { complete }) {
  let rate = 7, years = 30;
  const start = 1000;
  stage.innerHTML = `
    <div class="vz">
      <div class="vz-controls">
        <div class="vz-control"><label>Wachstum pro Jahr <output class="o-rate"></output></label><input type="range" class="rate" min="1" max="30" value="${rate}"></div>
        <div class="vz-control"><label>Jahre <output class="o-years"></output></label><input type="range" class="years" min="5" max="60" value="${years}"></div>
      </div>
      <svg class="vz-svg" viewBox="0 0 700 300"></svg>
      <div class="vz-readout"></div>
      <p class="vz-note">Beide starten mit 1.000 €. <b style="color:var(--muted)">Linear</b>: jedes Jahr kommt derselbe Betrag dazu (der Zuwachs des ersten Jahres). <b style="color:var(--accent)">Exponentiell</b> (Zinseszins): jedes Jahr kommt derselbe <i>Prozentsatz</i> dazu.</p>
    </div>`;
  const svg = stage.querySelector('svg');
  const draw = () => {
    stage.querySelector('.o-rate').textContent = `${rate} %`;
    stage.querySelector('.o-years').textContent = years;
    const lin = t => start * (1 + rate / 100 * t);
    const exp = t => start * Math.pow(1 + rate / 100, t);
    const maxY = exp(years);
    const X = t => 50 + t / years * 630, Y = v => 270 - v / maxY * 250;
    const path = f => Array.from({ length: years + 1 }, (_, t) => `${t ? 'L' : 'M'}${X(t).toFixed(1)},${Y(f(t)).toFixed(1)}`).join('');
    const dbl = Math.log(2) / Math.log(1 + rate / 100);
    const marks = [];
    for (let k = 1; k * dbl <= years; k++) marks.push(k * dbl);
    svg.innerHTML = `
      <line x1="50" y1="270" x2="680" y2="270" stroke="var(--line-2)"/><line x1="50" y1="20" x2="50" y2="270" stroke="var(--line-2)"/>
      ${marks.map(t => `<line x1="${X(t)}" y1="270" x2="${X(t)}" y2="${Y(exp(t))}" stroke="var(--accent)" stroke-dasharray="2 4" opacity=".5"/>`).join('')}
      <path d="${path(lin)}" fill="none" stroke="var(--muted)" stroke-width="2.5"/>
      <path d="${path(exp)}" fill="none" stroke="var(--accent)" stroke-width="3"/>
      <text x="680" y="${Y(lin(years)) - 6}" text-anchor="end" font-size="12" font-family="Inter" fill="var(--muted)">linear: ${fmt(lin(years))} €</text>
      <text x="670" y="${Math.max(16, Y(exp(years)) + 4)}" text-anchor="end" font-size="12" font-family="Inter" fill="var(--accent)">exponentiell: ${fmt(exp(years))} €</text>
      <text x="50" y="290" font-size="11" font-family="Inter" fill="var(--muted)">Jahr 0</text>
      <text x="680" y="290" text-anchor="end" font-size="11" font-family="Inter" fill="var(--muted)">Jahr ${years}</text>`;
    const ratio = exp(years) / lin(years);
    stage.querySelector('.vz-readout').innerHTML = `
      <span class="vz-stat hl">Verdopplungszeit<b>${dbl.toFixed(1).replace('.', ',')} J.</b></span>
      <span class="vz-stat">Faustregel 70 ÷ ${rate}<b>${(70 / rate).toFixed(1).replace('.', ',')} J.</b></span>
      <span class="vz-stat">Verdopplungen<b>${marks.length}</b></span>
      <span class="vz-stat">exponentiell ÷ linear<b>${ratio.toFixed(1).replace('.', ',')}×</b></span>`;
    if (ratio >= 10) complete();
  };
  stage.querySelector('.rate').oninput = e => { rate = +e.target.value; draw(); };
  stage.querySelector('.years').oninput = e => { years = +e.target.value; draw(); };
  draw();
}
