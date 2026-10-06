// Paket-Quittungs-Simulator: Nachricht in 8 nummerierte Pakete, Funkkanal mit Verlusten; mit und ohne Quittung (ACK) und Wiederholung.
// params: { }
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { h } from './_funk.js';

const N = 8, MAXTRY = 10;

export default function mount(stage, { complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const grid = h('div', { style: 'display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px;margin:6px 0 10px' });
  const log = h('div', { class: 'vz-note', style: 'min-height:2.6em;line-height:1.5;margin-bottom:8px' });
  const ui = controls(root, [
    { id: 'ack', type: 'seg', label: 'Verfahren', options: [['no', 'ohne Quittung (z. B. APRS)'], ['yes', 'mit Quittung und Wiederholung']], value: 'yes' },
    { id: 'loss', label: 'Verlust pro Funkübertragung', min: 0, max: 60, step: 5, value: 40, format: v => v + ' %', digits: 0 },
  ], null);
  const go = h('button', { type: 'button', class: 'btn primary', text: 'Nachricht senden (8 Pakete)' });
  root.append(h('div', { style: 'margin:8px 0' }, go), grid, log);
  const out = readout(root, [{ id: 'sent', label: 'Aussendungen gesamt', hl: true }, { id: 'got', label: 'Pakete angekommen', hl: true }, { id: 'extra', label: 'Mehraufwand' }]);
  const g = goals(root, [
    { id: 'ack', label: 'Mit Quittung bei ≥ 40 % Verlust: alle 8 Pakete kommen an' },
    { id: 'noack', label: 'Ohne Quittung bei ≥ 30 % Verlust: mindestens ein Paket geht verloren' },
  ], () => complete?.());

  function run() {
    const { ack, loss } = ui.values, p = loss / 100;
    let sent = 0, got = 0, dupes = 0;
    grid.replaceChildren();
    for (let i = 1; i <= N; i++) {
      let tries = 0, arrived = false, acked = false; const notes = [];
      while (tries < (ack === 'yes' ? MAXTRY : 1)) {
        tries++; sent++;
        const dataOk = Math.random() >= p;
        if (!dataOk) { notes.push('Paket verloren'); if (ack === 'yes') continue; else break; }
        if (arrived) { dupes++; notes.push('Doppelt (Nummer bekannt, verworfen)'); } else { arrived = true; got++; notes.push('angekommen'); }
        if (ack === 'no') break;
        sent++;   // Quittung ist ebenfalls eine Aussendung
        if (Math.random() >= p) { acked = true; notes.push('Quittung ok'); break; } else notes.push('Quittung verloren, Wiederholung');
      }
      const ok = arrived && (ack === 'no' || acked || arrived);
      const col = !arrived ? 'var(--bad)' : (ack === 'yes' && !acked) ? 'var(--warn)' : 'var(--good)';
      grid.append(h('div', { style: `border:1px solid var(--line);border-left:5px solid ${col};border-radius:8px;padding:6px 9px;background:var(--surface-2);font-size:.82rem;line-height:1.35` },
        h('b', { text: `Paket ${i}` }), h('div', { style: 'color:var(--muted)' }, `${tries} Versuch${tries > 1 ? 'e' : ''}`), h('div', { text: !arrived ? 'nie angekommen' : notes.includes('Doppelt (Nummer bekannt, verworfen)') ? 'angekommen (Doppel erkannt)' : 'angekommen' })));
    }
    out.set({ sent: String(sent), got: `${got} von ${N}`, extra: `+${Math.round((sent / N - 1) * 100)} % gegenüber ${N} Paketen` });
    log.textContent = ack === 'yes' ? (got === N ? 'Alles angekommen: Der Empfänger quittiert jedes Paket, bleibt die Quittung aus, sendet der Absender noch einmal. Doppelt angekommene Pakete erkennt der Empfänger an der Nummer.' : 'Auch Wiederholungen haben eine Grenze: Nach 10 Versuchen gibt der Absender auf.') : (got === N ? 'Diesmal ist zufällig alles angekommen, aber ohne Quittung weiß der Absender das nicht.' : `${N - got} Paket(e) fehlen, und der Absender erfährt es nicht.`);
    if (ack === 'yes' && loss >= 40 && got === N) g.reach('ack');
    if (ack === 'no' && loss >= 30 && got < N) g.reach('noack');
  }
  go.onclick = run;
  root._test = { run };
  run();
}
