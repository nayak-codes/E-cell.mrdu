import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ADMIN_KEY = 'MRUEcell@2026';
const uploadsDir = path.join(__dirname, '..', 'data', 'uploads');

function ensureDir(dir) {
  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  } catch (err) {
    console.error('Error creating directory:', err);
  }
}

function isAdmin(req) {
  return req.headers['x-admin-key'] === ADMIN_KEY;
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
    let body = '';
    await new Promise((resolve, reject) => {
      req.on('data', chunk => body += chunk.toString());
      req.on('end', resolve);
      req.on('error', reject);
    });

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

    // Return URL relative to public/uploads for serving
    return res.status(200).json({ url: `/uploads/${filename}` });
  } catch (err) {
    console.error('Upload error:', err);
    return res.status(400).json({ error: 'Upload failed' });
  }
}
