// Hilfsfunktion für Demos mit Zeichnung: Lektions-Demos werden eingebaut, bevor der Container im DOM hängt (Breite 0).
// adaptive(stage, build) rendert zunächst mit 640 px, misst nach dem Einhängen die echte Breite und baut bei Abweichung neu auf (auch beim Drehen des Geräts).
// build(W) bekommt die logische Breite 300–720; sein Zustand geht beim Neuaufbau verloren (Ziele, die complete() ausgelöst haben, bleiben erledigt).
export function adaptive(stage, build) {
  const clampW = w => Math.max(300, Math.min(720, w));
  const width = () => (stage.isConnected ? Math.round(stage.getBoundingClientRect().width) : 0);
  let cur = 0;
  const render = w => { stage.replaceChildren(); cur = w; build(w); };
  render(clampW(width() || 640));
  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(() => { const w = width(); if (!w) return; const c = clampW(w); if (Math.abs(c - cur) > 12) render(c); }).observe(stage);
  }
}
