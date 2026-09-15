import { defaultCms } from '../data/defaults';
import { ADMIN_PASSWORD } from './auth';

export const CMS_KEY = 'mru-ecell-cms-v1';
export const CMS_CHANNEL = 'mru-ecell-cms';

export function normalizeCms(parsed) {
  return {
    updatedAt: Number(parsed?.updatedAt) || 0,
    announcements: Array.isArray(parsed?.announcements) ? parsed.announcements : defaultCms.announcements,
    events: Array.isArray(parsed?.events) ? parsed.events : defaultCms.events,
    gallery: Array.isArray(parsed?.gallery) ? parsed.gallery : defaultCms.gallery,
    team: Array.isArray(parsed?.team) ? parsed.team : defaultCms.team,
    mentors: Array.isArray(parsed?.mentors) ? parsed.mentors : defaultCms.mentors,
  };
}

export function isLikelyCms(data) {
  return data && typeof data === 'object' && Array.isArray(data.events) && Array.isArray(data.gallery) && Array.isArray(data.team);
}

export function pickNewer(a, b) {
  if (!isLikelyCms(a)) return isLikelyCms(b) ? normalizeCms(b) : null;
  if (!isLikelyCms(b)) return normalizeCms(a);
  return (Number(a.updatedAt) || 0) >= (Number(b.updatedAt) || 0) ? normalizeCms(a) : normalizeCms(b);
}

export function loadCms() {
  try {
    const raw = localStorage.getItem(CMS_KEY);
    if (!raw) {
      console.log('No cached CMS data, using defaults');
      return structuredClone(defaultCms);
    }
    const parsed = JSON.parse(raw);
    return isLikelyCms(parsed) ? normalizeCms(parsed) : structuredClone(defaultCms);
  } catch (err) {
    console.error('Error loading CMS:', err);
    return structuredClone(defaultCms);
  }
}

export function saveCms(data) {
  try {
    localStorage.setItem(CMS_KEY, JSON.stringify(data));
  } catch {
    localStorage.setItem(CMS_KEY, JSON.stringify({
      ...data,
      gallery: (data.gallery || []).map((item) => ({ ...item, url: item.url?.startsWith('data:') ? '' : item.url })),
      team: (data.team || []).map((item) => ({ ...item, image: item.image?.startsWith('data:') ? '' : item.image })),
      events: (data.events || []).map((item) => ({ ...item, image: item.image?.startsWith('data:') ? '' : item.image })),
    }));
  }
}

export async function fetchCms() {
  const res = await fetch('/api/cms', { cache: 'no-store' });
  if (!res.ok) throw new Error('Could not load live content');
  const type = res.headers.get('content-type') || '';
  if (!type.includes('application/json')) throw new Error('Not JSON');
  const parsed = await res.json();
  if (!isLikelyCms(parsed)) throw new Error('Invalid CMS payload');
  return normalizeCms(parsed);
}

export async function publishCms(data) {
  const res = await fetch('/api/cms', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-key': ADMIN_PASSWORD,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Could not publish to the website');
}

export function broadcastCms(data) {
  try {
    const channel = new BroadcastChannel(CMS_CHANNEL);
    channel.postMessage(data);
    channel.close();
  } catch {
    /* ignore */
  }
}

export async function resetCms() {
  localStorage.removeItem(CMS_KEY);
  return { ...structuredClone(defaultCms), updatedAt: Date.now() };
}

export async function uploadImageFile(file, maxWidth = 1000) {
  const dataUrl = await fileToDataUrl(file, maxWidth, 0.72);
  try {
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-key': ADMIN_PASSWORD,
      },
      body: JSON.stringify({ name: file.name, dataUrl }),
    });
    if (res.ok) {
      const payload = await res.json();
      if (payload.url) return payload.url;
    }
  } catch {
    /* fall through to data URL if API is unavailable */
  }
  return dataUrl;
}

export function nextId(list) {
  return (list.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) || 0) + 1;
}

export function fileToDataUrl(file, maxWidth = 1400, quality = 0.82) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      reject(new Error('Please choose an image file.'));
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read the file.'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Could not load the image.'));
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(img.width * scale));
        canvas.height = Math.max(1, Math.round(img.height * scale));
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

export function eventBadgeClass(status) {
  const s = (status || '').toUpperCase();
  if (s.includes('COMPLETED')) return 'bg-slate-500/10 text-slate-600 dark:text-slate-300 border-slate-500/30';
  if (s.includes('LIMITED')) return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30';
  if (s.includes('UPCOMING')) return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30';
  if (s.includes('OPEN') || s.includes('REGISTRATION')) return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30';
  return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30';
}

export function galleryBadgeColor(status) {
  const s = (status || '').toUpperCase();
  if (s.includes('COMPLETED')) return 'bg-slate-600';
  if (s.includes('LIMITED')) return 'bg-purple-600';
  if (s.includes('UPCOMING')) return 'bg-emerald-600';
  if (s.includes('OPEN') || s.includes('REGISTRATION')) return 'bg-blue-600';
  return 'bg-amber-600';
}

export function navigateTo(path) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
}
