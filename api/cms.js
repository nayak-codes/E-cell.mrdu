import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { defaultCms } from '../src/data/defaults.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ADMIN_KEY = 'MRUEcell@2026';
const dataDir = path.join(__dirname, '..', 'data');
const cmsFile = path.join(dataDir, 'cms.json');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function readCms() {
  try {
    if (!fs.existsSync(cmsFile)) {
      ensureDir(dataDir);
      fs.writeFileSync(cmsFile, JSON.stringify(defaultCms, null, 2));
      return defaultCms;
    }
    const data = fs.readFileSync(cmsFile, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading CMS:', err);
    return defaultCms;
  }
}

function writeCms(data) {
  try {
    ensureDir(dataDir);
    fs.writeFileSync(cmsFile, JSON.stringify(data, null, 2));
    return true;
  } catch (err) {
    console.error('Error writing CMS:', err);
    return false;
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
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'GET') {
    try {
      const data = readCms();
      return res.status(200).json(data);
    } catch (err) {
      console.error('GET /api/cms error:', err);
      return res.status(500).json({ error: 'Failed to read CMS data' });
    }
  }

  if (req.method === 'PUT') {
    if (!isAdmin(req)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
      const body = await readBody(req);
      const data = JSON.parse(body);
      const dataWithTimestamp = { ...data, updatedAt: Date.now() };
      writeCms(dataWithTimestamp);
      return res.status(200).json({ ok: true });
    } catch (err) {
      console.error('PUT /api/cms error:', err);
      return res.status(400).json({ error: 'Invalid CMS payload' });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}
