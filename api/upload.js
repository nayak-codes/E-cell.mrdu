import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ADMIN_KEY = 'MRUEcell@2026';
const uploadsDir = path.join(__dirname, '..', 'public', 'uploads');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function isAdmin(req) {
  return req.headers['x-admin-key'] === ADMIN_KEY;
}

async function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!isAdmin(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const body = await readBody(req);
    const payload = JSON.parse(body);
    const dataUrl = String(payload.dataUrl || '');
    const match = dataUrl.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,(.+)$/);

    if (!match) {
      return res.status(400).json({ error: 'Invalid image' });
    }

    const ext = match[1].includes('png') ? 'png' : 'jpg';
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    ensureDir(uploadsDir);
    const filePath = path.join(uploadsDir, filename);
    fs.writeFileSync(filePath, Buffer.from(match[2], 'base64'));

    return res.status(200).json({ url: `/uploads/${filename}` });
  } catch (err) {
    console.error('Upload error:', err);
    return res.status(400).json({ error: 'Upload failed' });
  }
}
