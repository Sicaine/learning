import * as store from '../store.js';
import { subjects } from '../content.js';
import { el, $, icon, toast } from '../ui.js';

export default async function backup(main) {
  const st = store.get();
  const size = new Blob([JSON.stringify(st)]).size;
  const root = el(`
    <section class="backup">
      <span class="eyebrow">Backup & settings</span>
      <h1 class="display">Your progress, portable</h1>
      <p class="lede">All progress lives in this browser's local storage (${(size / 1024).toFixed(1)} KB). Export it as JSON to keep a backup or move it to another machine.</p>
      <div class="backup-grid">
        <div class="panel">
          <h3>${icon.save} Export</h3>
          <p>Download everything — lessons, tasks, answers, card schedule — as one JSON file.</p>
          <button class="btn primary export">Download backup</button>
        </div>
        <div class="panel">
          <h3>Import</h3>
          <p><b>Merge</b> keeps whatever is further along on either side. <b>Replace</b> overwrites this browser with the file.</p>
          <input type="file" accept="application/json,.json" hidden>
          <div class="row"><button class="btn import" data-mode="merge">Import & merge</button><button class="btn ghost import" data-mode="replace">Import & replace</button></div>
        </div>
        <div class="panel">
          <h3>Language aid</h3>
          <p>Show the German name next to every glossary term in lessons (e.g. <i>dot product · Skalarprodukt</i>). Also toggled with the DE button in the header.</p>
          <label class="switch"><input type="checkbox" class="de" ${st.settings.german ? 'checked' : ''}><span></span> German term names</label>
        </div>
        <div class="panel danger">
          <h3>Reset</h3>
          <p>Delete all progress in this browser. Export first if you might want it back.</p>
          <button class="btn ghost reset">Reset everything</button>
        </div>
      </div>
      <div class="panel subtle">
        <h3>Per subject</h3>
        <ul class="per-subject">${subjects.map(s => {
          const ss = st.subjects[s.id];
          const done = ss ? Object.values(ss.lessons).filter(l => l.complete).length : 0;
          const cards = ss ? Object.keys(ss.cards).length : 0;
          return `<li><span class="dot" style="--dot:${s.accent}"></span><b>${s.title}</b><span>${done} lessons complete · ${cards} cards</span></li>`;
        }).join('')}</ul>
      </div>
    </section>`);
  main.append(root);

  $(root, '.export').onclick = () => store.downloadBackup();
  const file = $(root, 'input[type=file]');
  let mode = 'merge';
  root.querySelectorAll('.import').forEach(b => b.onclick = () => { mode = b.dataset.mode; file.click(); });
  file.onchange = async () => {
    const f = file.files[0];
    if (!f) return;
    try {
      if (mode === 'replace' && !confirm('Replace all progress in this browser with the backup?')) return;
      store.importJSON(await f.text(), mode);
      toast(`Backup ${mode === 'merge' ? 'merged' : 'restored'}`);
      document.body.classList.toggle('lang-de', !!store.get().settings.german);
      setTimeout(() => location.reload(), 600);
    } catch (e) { toast(`Import failed: ${e.message}`); }
    file.value = '';
  };
  $(root, '.de').onchange = e => {
    store.update(s => { s.settings.german = e.target.checked; });
    document.body.classList.toggle('lang-de', e.target.checked);
  };
  $(root, '.reset').onclick = () => {
    if (confirm('Delete all progress? This cannot be undone.')) { store.reset(); toast('Progress reset'); setTimeout(() => location.reload(), 500); }
  };
}
