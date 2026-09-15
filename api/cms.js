import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ADMIN_KEY = 'MRUEcell@2026';
const dataDir = path.join(__dirname, '..', 'data');
const cmsFile = path.join(dataDir, 'cms.json');

// Default CMS data
const defaultCms = {
  updatedAt: Date.now(),
  announcements: ['Welcome to E-CELL'],
  events: [],
  gallery: [],
  team: [],
  mentors: [],
};

function ensureDir(dir) {
  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  } catch (err) {
    console.error('Error creating directory:', err);
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

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');

  try {
    if (req.method === 'GET') {
      const data = readCms();
      return res.status(200).json(data);
    }

    if (req.method === 'PUT') {
      if (!isAdmin(req)) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      let body = '';
      await new Promise((resolve, reject) => {
        req.on('data', chunk => body += chunk.toString());
        req.on('end', resolve);
        req.on('error', reject);
      });

      const data = JSON.parse(body);
      const dataWithTimestamp = { ...data, updatedAt: Date.now() };
      writeCms(dataWithTimestamp);
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('CMS API error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
