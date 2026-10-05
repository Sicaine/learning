// vizkit/anim.js — rAF-Schleife mit Aufräumen, Sichtbarkeits-Pause und Zeitlupe.
//
//   const loop = animate(stage, (dt, t) => { … zeichnen … }, { speed: 1 });
//   loop.controls(controlsRoot);   // Play/Pause + Tempo (1×, ¼×, 1/16×)
//   loop.speed = 0.25; loop.pause(); loop.play(); loop.once();   // einmal neu zeichnen, auch wenn pausiert
//
// Die Schleife stoppt selbst, wenn `el` aus dem DOM entfernt wird, pausiert, solange `el` nicht im
// Viewport ist (IntersectionObserver) und der Tab im Hintergrund liegt. dt wird auf 100 ms begrenzt.

const loops = new Set();

/**
 * @param {Element} el  Bezugselement (Sichtbarkeit / Lebensdauer)
 * @param {(dt:number, t:number, realDt:number)=>void} tick  dt = Simulationszeit seit letztem Frame (s, mit speed skaliert), t = Gesamt-Simulationszeit
 * @param {{ speed?:number, paused?:boolean, maxDt?:number }} [opts]
 */
export function animate(el, tick, opts = {}) {
  const L = { speed: opts.speed ?? 1, t: 0, running: !opts.paused, visible: true, dead: false, listeners: [] };
  let raf = 0, last = 0;
  const maxDt = opts.maxDt ?? 0.1;
  const frame = ts => {
    raf = 0;
    if (L.dead) return;
    if (!el.isConnected) { if (L.wasConnected) return L.stop(); return schedule(); }   // noch nicht eingehängt: warten
    L.wasConnected = true;
    if (!L.running || !L.visible || document.hidden) { last = 0; return; }
    const real = last ? Math.min(maxDt, (ts - last) / 1000) : 0; last = ts;
    const dt = real * L.speed; L.t += dt;
    try { tick(dt, L.t, real); } catch (e) { console.error(e); L.stop(); return; }
    schedule();
  };
  const schedule = () => { if (!raf && !L.dead) raf = requestAnimationFrame(frame); };
  const emit = () => L.listeners.forEach(f => f(L));
  L.play = () => { L.running = true; last = 0; schedule(); emit(); return L; };
  L.pause = () => { L.running = false; emit(); return L; };
  L.toggle = () => L.running ? L.pause() : L.play();
  /** Einmal zeichnen (z. B. nach Reglerbewegung während pausiert). */
  L.once = () => { if (L.dead) return L; requestAnimationFrame(() => { try { tick(0, L.t, 0); } catch (e) { console.error(e); } }); return L; };
  L.stop = () => { L.dead = true; cancelAnimationFrame(raf); io?.disconnect(); document.removeEventListener('visibilitychange', onVis); loops.delete(L); };
  L.onChange = f => { L.listeners.push(f); return L; };
  L.restart = () => { L.t = 0; return L; };
  let io = null;
  if (typeof IntersectionObserver !== 'undefined') {
    io = new IntersectionObserver(es => { L.visible = es[es.length - 1].isIntersecting; if (L.visible) { last = 0; schedule(); } }, { threshold: 0 });
    io.observe(el);
  }
  const onVis = () => { last = 0; if (!document.hidden) schedule(); };
  document.addEventListener('visibilitychange', onVis);
  loops.add(L);
  schedule();

  /** Play/Pause-Knopf und Tempo-Wahl in `root` einbauen. opts: { speeds: [[1,'1×'],[0.25,'¼×'],[1/16,'1/16×']], label } */
  L.controls = (root, o = {}) => {
    const speeds = o.speeds || [[1, '1×'], [0.25, '¼×'], [1 / 16, '1/16×']];
    const box = document.createElement('div'); box.className = 'vk-anim';
    box.innerHTML = `<button type="button" class="vk-btn vk-playbtn" aria-label="Pause"></button><div class="vz-seg">${speeds.map(([v, l]) => `<button type="button" data-s="${v}">${l}</button>`).join('')}</div>`;
    root.appendChild(box);
    const pb = box.querySelector('.vk-playbtn'), segs = [...box.querySelectorAll('[data-s]')];
    const sync = () => {
      pb.innerHTML = L.running ? '<svg viewBox="0 0 16 16" width="14" height="14"><rect x="3" y="2" width="3.4" height="12" rx="1" fill="currentColor"/><rect x="9.6" y="2" width="3.4" height="12" rx="1" fill="currentColor"/></svg>' : '<svg viewBox="0 0 16 16" width="14" height="14"><path d="M4 2.5v11l9-5.5z" fill="currentColor"/></svg>';
      pb.setAttribute('aria-label', L.running ? 'Pause' : 'Start');
      segs.forEach(b => b.classList.toggle('on', Math.abs(+b.dataset.s - L.speed) < 1e-9));
    };
    pb.onclick = () => L.toggle();
    segs.forEach(b => b.onclick = () => { L.speed = +b.dataset.s; sync(); });
    L.onChange(sync); sync();
    return box;
  };
  return L;
}

/** Größenänderung eines Elements beobachten (Breite/Höhe in CSS-px). Gibt eine Abmelde-Funktion zurück. */
export function onResize(el, cb) {
  if (typeof ResizeObserver === 'undefined') { cb(el.clientWidth, el.clientHeight); return () => {}; }
  const ro = new ResizeObserver(es => { const r = es[0].contentRect; cb(r.width, r.height); });
  ro.observe(el);
  return () => ro.disconnect();
}

/** Alle laufenden Schleifen stoppen (z. B. in Tests). */
export const stopAll = () => [...loops].forEach(l => l.stop());
