// Local dev server: serves site/ without caching and live-reloads open tabs
// whenever a file under site/ changes (tabs poll /__v). No dependencies.
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

// Injected into HTML pages: polls a version counter once a second and reloads when it changes.
// (No long-lived connection on purpose: browsers allow only ~6 per host, so several open tabs
// with an EventSource would starve every other request and freeze the site.)
const CLIENT = `<script>(()=>{let v=null;const t=async()=>{try{const r=await fetch('/__v',{cache:'no-store'});const n=await r.text();if(v===null)v=n;else if(n!==v)location.reload()}catch{}};setInterval(t,1000);t()})();</script>`;

let version = Date.now();

const server = createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  if (url.pathname === '/__v') { res.writeHead(200, { 'Content-Type': 'text/plain', 'Cache-Control': 'no-store' }); res.end(String(version)); return; }
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
    version = Date.now();
    console.log(`changed: ${file} → open tabs reload within a second`);
  }, 150);
});

server.listen(port, host, () => console.log(`Serving site/ on http://${host}:${port} (live reload on)`));
