// Local dev server: serves site/ without caching and live-reloads open tabs
// whenever a file under site/ changes. No dependencies.
//   node --watch tools/dev-server.mjs [port] [host]
// (--watch restarts the server itself when this file changes.)

import { createServer } from 'node:http';
import { watch } from 'node:fs';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'site');
const port = Number(process.argv[2] || process.env.PORT || 12121);
const host = process.argv[3] || process.env.HOST || '0.0.0.0';

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif',
  '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8', '.md': 'text/markdown; charset=utf-8',
};

// Injected into HTML pages: reconnecting EventSource that reloads on change.
const CLIENT = `<script>(()=>{let s;const c=()=>{s=new EventSource('/__reload');s.onmessage=e=>{if(e.data==='reload')location.reload()};s.onerror=()=>{s.close();setTimeout(c,1000)}};c()})();</script>`;

const clients = new Set();

const server = createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  if (url.pathname === '/__reload') {
    res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
    res.write('retry: 1000\n\n');
    clients.add(res);
    req.on('close', () => clients.delete(res));
    return;
  }
  let path = normalize(join(root, decodeURIComponent(url.pathname)));
  if (!path.startsWith(root)) { res.writeHead(403).end(); return; }
  try {
    if ((await stat(path)).isDirectory()) path = join(path, 'index.html');
    let body = await readFile(path);
    const type = TYPES[extname(path).toLowerCase()] || 'application/octet-stream';
    if (type.startsWith('text/html')) body = body.toString().replace('</body>', `${CLIENT}</body>`);
    res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-store' });
    res.end(body);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain' }).end('Not found');
  }
});

let timer;
watch(root, { recursive: true }, (_, file) => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    console.log(`changed: ${file} → reloading ${clients.size} tab(s)`);
    for (const c of clients) c.write('data: reload\n\n');
  }, 150);
});

server.listen(port, host, () => console.log(`Serving site/ on http://${host}:${port} (live reload on)`));
