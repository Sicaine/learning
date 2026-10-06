// Build an explainer video from site/video/<name>.js
//   node tools/video/build.mjs <name>                       full build → site/assets/video/<out>.mp4 (+ poster .jpg)
//   node tools/video/build.mjs <name> --frame 12.5 [--out f.png]   preview ONE frame (estimated timing unless narration is cached)
//   node tools/video/build.mjs <name> --estimate            skip narration; estimated timing; renders a silent mp4 to the scratch dir
//   options: --jobs N (parallel browsers, default 4)  --from S --to T (render only that time span, silent, for checks)
// Needs: ffmpeg, chromium, python venv with piper (~/.cache/learning-video/venv) and the voice model (see CLAUDE.md "Explainer videos").

import { spawn, spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { createServer } from 'node:http';
import { existsSync, mkdirSync, readFileSync, writeFileSync, statSync, rmSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { homedir, tmpdir } from 'node:os';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const site = join(root, 'site');
const args = process.argv.slice(2);
const name = args.find(a => !a.startsWith('--'));
const flag = (n, d = null) => { const i = args.indexOf('--' + n); return i < 0 ? d : (args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : true); };
if (!name) { console.log('usage: node tools/video/build.mjs <name> [--frame T | --estimate | --from S --to T] [--jobs N]'); process.exit(1); }

const CACHE = join(homedir(), '.cache/learning-video');
const PY = process.env.VIDEO_PY || join(CACHE, 'venv/bin/python');
const WORK = join(process.env.VIDEO_WORK || tmpdir(), `video-${name}`);
mkdirSync(WORK, { recursive: true });
mkdirSync(join(CACHE, 'tts'), { recursive: true });

const eng = await import(pathToFileURL(join(site, 'video/engine.js')).href);
const spec = eng.defineVideo((await import(pathToFileURL(join(site, `video/${name}.js`)).href + `?t=${Date.now()}`)).default);
const out = spec.out || name;
const VOICE = flag('voice', spec.voice || 'edge:de-DE-SeraphinaMultilingualNeural');   // 'edge:<cloud voice>' or 'piper'

// ---- narration ----------------------------------------------------------------
const jobs = [], files = [];
spec.scenes.forEach((s, i) => { files[i] = s.lines.map(l => { const f = join(CACHE, 'tts', createHash('sha1').update(`${VOICE}|${VOICE === 'piper' ? '1.06|' : (process.env.VIDEO_RATE || '+6%') + '|'}${l.say}`).digest('hex').slice(0, 16) + '.wav'); jobs.push({ file: f, text: l.say, voice: VOICE }); return f; }); });
const cached = jobs.every(j => existsSync(j.file));
const estimate = !!flag('estimate') || (flag('frame') !== null && !cached);
if (!estimate && !cached) {
  const jf = join(WORK, 'jobs.json'); writeFileSync(jf, JSON.stringify(jobs));
  console.log(`narration: synthesising ${jobs.filter(j => !existsSync(j.file)).length} line(s)…`);
  const r = spawnSync(PY, [join(root, 'tools/video/tts.py'), 'synth', jf], { stdio: 'inherit' });
  if (r.status) { console.error('TTS failed (is the piper venv set up? see CLAUDE.md)'); process.exit(1); }
}
const wavDur = f => parseFloat(spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]).stdout.toString());
const dur = spec.scenes.map((s, i) => s.lines.map((l, j) => (estimate ? Math.max(1.6, l.say.split(/\s+/).length / 2.6) : wavDur(files[i][j]))));
const tl = eng.buildTimeline(spec, dur);
writeFileSync(join(site, `video/${name}.timeline.json`), JSON.stringify(tl));
console.log(`${estimate ? 'estimated' : 'real'} timeline: ${tl.total.toFixed(1)} s, ${tl.scenes.length} scenes`);

// ---- tiny static server for site/ ------------------------------------------------
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png' };
const server = createServer(async (req, res) => {
  const u = new URL(req.url, 'http://x'); let p = join(site, decodeURIComponent(u.pathname));
  try { const b = await readFile(p); res.writeHead(200, { 'Content-Type': TYPES[extname(p)] || 'application/octet-stream', 'Cache-Control': 'no-store' }); res.end(b); } catch { res.writeHead(404).end(); }
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}`;

// ---- chromium via CDP ------------------------------------------------------------
async function launch(idx) {
  const port = 9600 + Math.floor(Math.random() * 300) + idx * 300;
  const prof = join(WORK, `chrome-${idx}`);
  const proc = spawn('chromium', ['--headless=new', '--no-sandbox', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1', '--font-render-hinting=none', `--remote-debugging-port=${port}`, `--user-data-dir=${prof}`, `--window-size=${eng.W},${eng.H}`, 'about:blank'], { stdio: 'ignore' });
  let targets;
  for (let i = 0; i < 80; i++) { try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); break; } catch { await new Promise(r => setTimeout(r, 150)); } }
  const page = targets.find(t => t.type === 'page');
  const ws = new WebSocket(page.webSocketDebuggerUrl); await new Promise(r => ws.onopen = r);
  let id = 0; const wait = new Map();
  ws.onmessage = m => { const d = JSON.parse(m.data); if (d.id && wait.has(d.id)) { wait.get(d.id)(d); wait.delete(d.id); } if (d.method === 'Runtime.exceptionThrown') console.error('[page error]', d.params.exceptionDetails.exception?.description || d.params.exceptionDetails.text); };
  const send = (method, params = {}) => new Promise(r => { const i = ++id; wait.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
  await send('Runtime.enable'); await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: eng.W, height: eng.H, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: `${base}/video/player.html?v=${name}` });
  for (let i = 0; i < 200; i++) { const r = await send('Runtime.evaluate', { expression: 'window.__ready === true', returnByValue: true }); if (r.result?.result?.value) break; await new Promise(r => setTimeout(r, 150)); if (i === 199) throw new Error('player did not become ready'); }
  const frame = async (t, fmt = 'jpeg') => {
    const r = await send('Runtime.evaluate', { expression: `window.__vid.render(${t})`, awaitPromise: true });
    if (r.result?.exceptionDetails) throw new Error('render(' + t + '): ' + (r.result.exceptionDetails.exception?.description || r.result.exceptionDetails.text));
    const s = await send('Page.captureScreenshot', { format: fmt, ...(fmt === 'jpeg' ? { quality: 94 } : {}) });
    return Buffer.from(s.result.data, 'base64');
  };
  const close = () => { try { ws.close(); } catch {} proc.kill(); };
  return { frame, close, prof };
}

try {
  // single frame preview
  if (flag('frame') !== null) {
    const t = parseFloat(flag('frame')); const b = await launch(0);
    const png = await b.frame(t, 'png'); const o = flag('out', join(WORK, `frame-${t}.png`)); writeFileSync(o, png); console.log('frame →', o); b.close();
  } else {
    const fps = eng.FPS, from = parseFloat(flag('from', 0)), to = Math.min(tl.total, parseFloat(flag('to', tl.total)));
    const n0 = Math.round(from * fps), n1 = Math.round(to * fps), total = n1 - n0;
    const jobsN = Math.max(1, Math.min(parseInt(flag('jobs', 4)), Math.ceil(total / 60)));
    const per = Math.ceil(total / jobsN); const chunks = [];
    console.log(`rendering ${total} frames (${(total / fps).toFixed(1)} s) with ${jobsN} browser(s)…`);
    let done = 0; const t0 = Date.now();
    await Promise.all(Array.from({ length: jobsN }, async (_, k) => {
      const a = n0 + k * per, b2 = Math.min(n1, a + per); if (a >= b2) return;
      const file = join(WORK, `chunk-${k}.mp4`); chunks[k] = file;
      const ff = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-', '-c:v', 'libx264', '-preset', 'medium', '-crf', '24', '-pix_fmt', 'yuv420p', '-r', String(fps), file], { stdio: ['pipe', 'inherit', 'inherit'] });
      const closed = new Promise(r => ff.on('close', r));
      const br = await launch(k + 1);
      for (let n = a; n < b2; n++) {
        const buf = await br.frame(n / fps);
        if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
        if (++done % 300 === 0) console.log(`  ${done}/${total} frames, ${((Date.now() - t0) / 1000).toFixed(0)} s`);
      }
      ff.stdin.end(); await closed; br.close();
    }));
    const list = join(WORK, 'list.txt'); writeFileSync(list, chunks.filter(Boolean).map(f => `file '${f}'`).join('\n'));
    const silent = join(WORK, 'video-silent.mp4');
    spawnSync('ffmpeg', ['-y', '-v', 'error', '-f', 'concat', '-safe', '0', '-i', list, '-c', 'copy', silent], { stdio: 'inherit' });
    if (estimate || flag('from') !== null || flag('to') !== null) { console.log('silent preview →', silent); }
    else {
      const plan = { total: tl.total, items: tl.scenes.flatMap((s, i) => s.lines.map((l, j) => ({ file: files[i][j], start: l.start }))) };
      writeFileSync(join(WORK, 'plan.json'), JSON.stringify(plan));
      const wav = join(WORK, 'narration.wav');
      if (spawnSync(PY, [join(root, 'tools/video/tts.py'), 'assemble', join(WORK, 'plan.json'), wav], { stdio: 'inherit' }).status) throw new Error('audio assembly failed');
      mkdirSync(join(site, 'assets/video'), { recursive: true });
      const mp4 = join(site, `assets/video/${out}.mp4`);
      spawnSync('ffmpeg', ['-y', '-v', 'error', '-i', silent, '-i', wav, '-c:v', 'copy', '-c:a', 'aac', '-b:a', '128k', '-shortest', '-movflags', '+faststart', mp4], { stdio: 'inherit' });
      const pt = spec.poster ?? Math.min(tl.scenes[0].end + 1, tl.total / 2);
      spawnSync('ffmpeg', ['-y', '-v', 'error', '-ss', String(pt), '-i', mp4, '-frames:v', '1', '-q:v', '3', join(site, `assets/video/${out}.jpg`)]);
      console.log(`done → site/assets/video/${out}.mp4  (${(statSync(mp4).size / 1048576).toFixed(1)} MB, ${tl.total.toFixed(0)} s, poster .jpg)`);
    }
  }
} finally {
  server.close();
  await new Promise(r => setTimeout(r, 600));   // let the browsers release their profile files
  if (!flag('keep')) for (const e of [0, 1, 2, 3, 4, 5, 6, 7]) { try { rmSync(join(WORK, `chrome-${e}`), { recursive: true, force: true, maxRetries: 5, retryDelay: 200 }); } catch {} }
  rmSync(join(site, `video/${name}.timeline.json`), { force: true });
  process.exit(0);
}
