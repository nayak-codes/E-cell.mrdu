import fs from 'node:fs';
import path from 'node:path';
import { defaultCms } from './src/data/defaults.js';

const ADMIN_KEY = 'MRUEcell@2026';

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function cmsPath(root) {
  return path.join(root, 'data', 'cms.json');
}

function uploadsDir(root) {
  return path.join(root, 'data', 'uploads');
}

function readCms(root) {
  const file = cmsPath(root);
  if (!fs.existsSync(file)) {
    ensureDir(path.dirname(file));
    fs.writeFileSync(file, JSON.stringify(defaultCms, null, 2));
    return defaultCms;
  }
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return defaultCms;
  }
}

function writeCms(root, data) {
  ensureDir(path.dirname(cmsPath(root)));
  fs.writeFileSync(cmsPath(root), JSON.stringify(data, null, 2));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

function send(res, status, payload, type = 'application/json') {
  res.statusCode = status;
  res.setHeader('Content-Type', type);
  res.setHeader('Cache-Control', 'no-store');
  res.end(typeof payload === 'string' ? payload : JSON.stringify(payload));
}

function isAdmin(req) {
  return req.headers['x-admin-key'] === ADMIN_KEY;
}

function mimeFor(file) {
  const ext = path.extname(file).toLowerCase();
  if (ext === '.png') return 'image/png';
  if (ext === '.webp') return 'image/webp';
  if (ext === '.gif') return 'image/gif';
  return 'image/jpeg';
}

export function createCmsMiddleware(root) {
  return async (req, res, next) => {
    const url = (req.url || '').split('?')[0];

    if (url === '/api/cms' && req.method === 'GET') {
      return send(res, 200, readCms(root));
    }

    if (url === '/api/cms' && req.method === 'PUT') {
      if (!isAdmin(req)) return send(res, 401, { error: 'Unauthorized' });
      try {
        const data = JSON.parse((await readBody(req)).toString('utf8'));
        writeCms(root, data);
        return send(res, 200, { ok: true });
      } catch {
        return send(res, 400, { error: 'Invalid CMS payload' });
      }
    }

    if (url === '/api/upload' && req.method === 'POST') {
      if (!isAdmin(req)) return send(res, 401, { error: 'Unauthorized' });
      try {
        const payload = JSON.parse((await readBody(req)).toString('utf8'));
        const dataUrl = String(payload.dataUrl || '');
        const match = dataUrl.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,(.+)$/);
        if (!match) return send(res, 400, { error: 'Invalid image' });
        const ext = match[1].includes('png') ? 'png' : 'jpg';
        const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const dir = uploadsDir(root);
        ensureDir(dir);
        fs.writeFileSync(path.join(dir, filename), Buffer.from(match[2], 'base64'));
        return send(res, 200, { url: `/uploads/${filename}` });
      } catch {
        return send(res, 400, { error: 'Upload failed' });
      }
    }

    if (url.startsWith('/uploads/') && req.method === 'GET') {
      const filename = path.basename(url);
      const file = path.join(uploadsDir(root), filename);
      if (!fs.existsSync(file)) return next();
      res.statusCode = 200;
      res.setHeader('Content-Type', mimeFor(filename));
      res.setHeader('Cache-Control', 'public, max-age=31536000');
      return res.end(fs.readFileSync(file));
    }

    return next();
  };
}

function installCms(server) {
  const middleware = createCmsMiddleware(server.config.root);
  server.middlewares.stack.unshift({ route: '', handle: middleware });
}

export default function cmsPlugin() {
  return {
    name: 'mru-ecell-cms',
    configureServer(installCms),
    configurePreviewServer(installCms),
  };
}
