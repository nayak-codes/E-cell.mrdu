import { MongoClient } from 'mongodb';

const ADMIN_KEY = 'MRUEcell@2026';
// MongoDB connection string - will be set as environment variable in Vercel
const MONGODB_URI = process.env.MONGODB_URI;

const defaultCms = {
  updatedAt: Date.now(),
  announcements: ['Welcome to E-CELL'],
  events: [],
  gallery: [],
  team: [],
  mentors: [],
};

let cachedClient = null;

async function connectDb() {
  if (!MONGODB_URI) {
    console.log('No MongoDB URI, using in-memory storage');
    return null;
  }

  if (cachedClient) return cachedClient;
  
  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    cachedClient = client;
    console.log('MongoDB connected successfully');
    return client;
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    return null;
  }
}

// In-memory fallback
let inMemoryStore = structuredClone(defaultCms);

async function getCmsData(db) {
  try {
    if (!db) {
      return inMemoryStore;
    }
    const cms = await db.collection('cms').findOne({ _id: 'main' });
    if (cms) {
      const { _id, ...data } = cms;
      return data;
    }
    return defaultCms;
  } catch (err) {
    console.error('Error reading CMS:', err);
    return inMemoryStore;
  }
}

async function saveCmsData(db, data) {
  try {
    const dataWithTime = { ...data, updatedAt: Date.now() };
    
    // Always save to memory
    inMemoryStore = dataWithTime;
    
    // Also save to MongoDB if available
    if (db) {
      await db.collection('cms').updateOne(
        { _id: 'main' },
        { $set: dataWithTime },
        { upsert: true }
      );
      console.log('Saved to MongoDB');
    }
    
    return true;
  } catch (err) {
    console.error('Error saving CMS:', err);
    return true; // Still return true since we saved to memory
  }
}

function isAdmin(req) {
  return req.headers['x-admin-key'] === ADMIN_KEY;
}

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');

  try {
    const client = await connectDb();
    const db = client ? client.db('ecell') : null;

    if (req.method === 'GET') {
      const data = await getCmsData(db);
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
      const success = await saveCmsData(db, data);
      return res.status(200).json({ ok: success });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('CMS API error:', err);
    return res.status(500).json({ error: err.message });
  }
}
