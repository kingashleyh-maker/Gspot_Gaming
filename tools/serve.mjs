import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const port = Number(process.env.PORT || 5178);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.sql': 'text/plain; charset=utf-8'
};

async function resolveTarget(pathname) {
  const decoded = decodeURIComponent(pathname);
  let target = resolve(join(root, decoded));
  if (target !== root && !target.startsWith(root + sep)) return null;

  let info = await stat(target).catch(() => null);
  if (info?.isDirectory()) {
    target = join(target, 'index.html');
    info = await stat(target).catch(() => null);
  }
  return info?.isFile() ? target : null;
}

const server = createServer(async (request, response) => {
  const { pathname } = new URL(request.url ?? '/', `http://${request.headers.host ?? 'localhost'}`);
  const file = await resolveTarget(pathname);

  if (!file) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('404 Not found');
    return;
  }

  try {
    const body = await readFile(file);
    response.writeHead(200, {
      'Content-Type': MIME[extname(file).toLowerCase()] ?? 'application/octet-stream',
      'Cache-Control': 'no-store'
    });
    response.end(body);
  } catch {
    response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('500 Unable to read file');
  }
});

server.listen(port, () => {
  console.log(`G Spot dev server running at http://localhost:${port}/`);
  console.log(`Portal selection: http://localhost:${port}/src/frontend/`);
  console.log(`Customer kiosk:   http://localhost:${port}/src/frontend/customer-ui/public/`);
  console.log(`Manager portal:   http://localhost:${port}/src/frontend/manager-ui/public/`);
  console.log(`Admin portal:     http://localhost:${port}/src/frontend/admin-ui/public/`);
});
