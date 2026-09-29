// Gemeinsamer Kartenbaustein für die Geografie-Visualisierungen.
// mountMap(stage, { viewBox, regions, mode, lockMode, rounds, onDone, stroke, labels })
//   regions: [{ id, name, d, quiz?: bool (default true), bg?: bool (grey, not clickable), capital?, info?: html }]
//   maxWidth: CSS width cap for the map (e.g. '440px')
//   modes: 'explore' | 'locate' (Wo liegt …?) | 'capital' (Hauptstadt von …?)
// Ein abgeschlossener Quiz-Durchgang ruft onDone({ mode, mistakes }) auf.

const MODES = { explore: 'Entdecken', locate: 'Wo liegt …?', capital: 'Hauptstädte' };

export function mountMap(stage, opts) {
  const { viewBox, regions, rounds = 10, onDone = () => {}, stroke = 0.8 } = opts;
  const modes = opts.lockMode ? [opts.mode] : (opts.modes || ['explore', 'locate', 'capital']);
  let mode = opts.mode || modes[0];
  const quizzable = regions.filter(r => r.quiz !== false && !r.bg);

  stage.innerHTML = `
    <div class="vz">
      ${modes.length > 1 ? `<div class="vz-controls"><div class="vz-seg">${modes.map(m => `<button data-mode="${m}">${MODES[m]}</button>`).join('')}</div></div>` : ''}
      <div class="geo-prompt vz-note" style="min-height:1.6em;font-size:1rem"></div>
      <div class="geo-wrap" style="position:relative;max-width:${opts.maxWidth || '100%'};margin:0 auto;width:100%">
        <svg class="vz-svg geo-svg" viewBox="${viewBox}" style="background:color-mix(in oklab, var(--accent) 4%, #f4f7fb)">
          ${regions.map((r, i) => `<path data-i="${i}" d="${r.d}" fill-rule="evenodd" class="geo-r ${r.bg ? 'bg' : ''}"/>`).join('')}
        </svg>
        <div class="geo-tip" hidden style="position:absolute;pointer-events:none;background:var(--ink);color:#fff;font-size:.8rem;padding:3px 8px;border-radius:7px;white-space:nowrap;transform:translate(-50%,-130%)"></div>
      </div>
      <div class="geo-answers" style="display:flex;flex-wrap:wrap;gap:8px"></div>
      <div class="geo-info vz-note"></div>
      <div class="vz-readout geo-score"></div>
    </div>
    <style>
      .geo-r { fill: color-mix(in oklab, var(--accent) 16%, white); stroke: #fff; stroke-width: ${stroke}; transition: fill .15s; cursor: pointer; }
      .geo-r.bg { fill: #e3e5ec; cursor: default; }
      .geo-r:not(.bg):hover { fill: color-mix(in oklab, var(--accent) 38%, white); }
      .geo-r.sel { fill: var(--accent); }
      .geo-r.ok { fill: var(--good); }
      .geo-r.bad { fill: var(--bad); }
      .geo-r.target { fill: var(--accent-2); }
      .geo-r.done { fill: color-mix(in oklab, var(--good) 45%, white); }
    </style>`;

  const svg = stage.querySelector('svg');
  const paths = [...svg.querySelectorAll('.geo-r')];
  const tip = stage.querySelector('.geo-tip');
  const prompt = stage.querySelector('.geo-prompt');
  const info = stage.querySelector('.geo-info');
  const answers = stage.querySelector('.geo-answers');
  const score = stage.querySelector('.geo-score');
  let quiz = null;

  const showTip = (e, text) => {
    const box = stage.querySelector('.geo-wrap').getBoundingClientRect();
    tip.hidden = false; tip.textContent = text;
    tip.style.left = (e.clientX - box.left) + 'px'; tip.style.top = (e.clientY - box.top) + 'px';
  };
  svg.addEventListener('pointermove', e => {
    const p = e.target.closest('.geo-r');
    if (!p || p.classList.contains('bg') && mode !== 'explore') { tip.hidden = true; return; }
    const r = regions[+p.dataset.i];
    if (mode === 'explore' || p.classList.contains('done') || r.bg) showTip(e, r.name);
    else tip.hidden = true;
  });
  svg.addEventListener('pointerleave', () => { tip.hidden = true; });

  function setMode(m) {
    mode = m;
    stage.querySelectorAll('[data-mode]').forEach(b => b.classList.toggle('on', b.dataset.mode === m));
    paths.forEach(p => p.classList.remove('sel', 'ok', 'bad', 'target', 'done'));
    answers.innerHTML = ''; info.innerHTML = ''; score.innerHTML = '';
    if (m === 'explore') { quiz = null; prompt.innerHTML = 'Fahre über die Karte oder tippe auf eine Region.'; return; }
    const pool = shuffle(quizzable.filter(r => m !== 'capital' || r.capital)).slice(0, Math.min(rounds, quizzable.length));
    quiz = { items: pool, i: 0, mistakes: 0, tries: 0 };
    next();
  }

  function next() {
    paths.forEach(p => p.classList.remove('sel', 'bad', 'target'));
    answers.innerHTML = '';
    score.innerHTML = `<span class="vz-stat">Frage<b>${Math.min(quiz.i + 1, quiz.items.length)}/${quiz.items.length}</b></span><span class="vz-stat">Fehler<b>${quiz.mistakes}</b></span>`;
    if (quiz.i >= quiz.items.length) {
      prompt.innerHTML = `<b style="color:var(--good)">Durchgang geschafft</b> — ${quiz.mistakes ? `${quiz.mistakes} Fehler.` : 'fehlerfrei!'} <button class="btn small ghost geo-again">Nochmal</button>`;
      prompt.querySelector('.geo-again').onclick = () => setMode(mode);
      onDone({ mode, mistakes: quiz.mistakes });
      return;
    }
    const r = quiz.items[quiz.i];
    quiz.tries = 0;
    if (mode === 'locate') prompt.innerHTML = `Wo liegt <b>${r.name}</b>?`;
    else {
      prompt.innerHTML = `Wie heißt die Hauptstadt der markierten Region?`;
      paths[regions.indexOf(r)].classList.add('target');
      const others = shuffle(quizzable.filter(x => x !== r && x.capital).map(x => x.capital)).filter((c, i, a) => c !== r.capital && a.indexOf(c) === i).slice(0, 3);
      answers.innerHTML = shuffle([r.capital, ...others]).map(c => `<button class="chip" data-c="${c}">${c}</button>`).join('');
    }
  }

  answers.addEventListener('click', e => {
    const b = e.target.closest('.chip');
    if (!b || !quiz) return;
    const r = quiz.items[quiz.i];
    if (b.dataset.c === r.capital) {
      paths[regions.indexOf(r)].classList.add('done');
      info.innerHTML = `✓ <b>${r.capital}</b> — ${r.name}`;
      quiz.i++; setTimeout(next, 500);
    } else {
      quiz.mistakes++; b.classList.add('shake'); b.disabled = true;
      setTimeout(() => b.classList.remove('shake'), 450);
    }
  });

  svg.addEventListener('click', e => {
    const p = e.target.closest('.geo-r');
    if (!p || p.classList.contains('bg')) return;
    const r = regions[+p.dataset.i];
    if (mode === 'explore') {
      paths.forEach(x => x.classList.remove('sel')); p.classList.add('sel');
      info.innerHTML = `<b style="font-size:1.05rem;color:var(--ink)">${r.name}</b>${r.info ? `<div style="margin-top:4px">${r.info}</div>` : ''}`;
      return;
    }
    if (mode !== 'locate' || !quiz || quiz.i >= quiz.items.length) return;
    const target = quiz.items[quiz.i];
    if (r === target) {
      p.classList.add('done'); info.innerHTML = `✓ <b>${r.name}</b>${r.capital ? ` — Hauptstadt: ${r.capital}` : ''}`;
      quiz.i++; setTimeout(next, 450);
    } else {
      quiz.mistakes++; quiz.tries++;
      p.classList.add('bad'); setTimeout(() => p.classList.remove('bad'), 500);
      info.innerHTML = `Das ist <b>${r.name}</b>.`;
      if (quiz.tries >= 2) paths[regions.indexOf(target)].classList.add('target');
    }
  });

  stage.querySelectorAll('[data-mode]').forEach(b => b.onclick = () => setMode(b.dataset.mode));
  setMode(mode);
}

function shuffle(a) { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
