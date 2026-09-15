import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  broadcastCms,
  CMS_CHANNEL,
  fetchCms,
  loadCms,
  publishCms,
  resetCms as resetStored,
  saveCms,
} from '../lib/cms';
import { defaultCms } from '../data/defaults';

const CmsContext = createContext(null);

export function CmsProvider({ children }) {
  const [cms, setCms] = useState(() => loadCms() || structuredClone(defaultCms));
  const savingRef = useRef(false);

  const apply = useCallback((next) => {
    setCms(next);
    try {
      saveCms(next);
    } catch {
      /* ignore quota — live API is the source of truth */
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    const refresh = async () => {
      if (savingRef.current) return;
      try {
        // Only try to fetch if we're in dev mode with API available
        if (import.meta.env.DEV) {
          const live = await fetchCms();
          if (!cancelled && !savingRef.current) apply(live);
        }
      } catch (err) {
        console.log('CMS API unavailable, using local data');
        /* keep current content if API is down */
      }
    };

    refresh();
    const timer = setInterval(refresh, 3000);
    window.addEventListener('focus', refresh);

    let channel;
    try {
      channel = new BroadcastChannel(CMS_CHANNEL);
      channel.onmessage = (event) => {
        if (event.data) apply(event.data);
      };
    } catch {
      /* ignore */
    }

    return () => {
      cancelled = true;
      clearInterval(timer);
      window.removeEventListener('focus', refresh);
      channel?.close();
    };
  }, [apply]);

  const persist = useCallback((updater) => {
    setCms((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      try {
        saveCms(next);
      } catch {
        /* still publish even if this browser cannot store the backup */
      }
      savingRef.current = true;
      broadcastCms(next);
      publishCms(next)
        .catch((err) => {
          console.error(err);
          alert('Could not publish to the website. Make sure npm run dev is running, then save again.');
        })
        .finally(() => {
          savingRef.current = false;
        });
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      cms,
      setAnnouncements: (announcements) => persist((prev) => ({ ...prev, announcements })),
      setEvents: (events) => persist((prev) => ({ ...prev, events })),
      setGallery: (gallery) => persist((prev) => ({ ...prev, gallery })),
      setTeam: (team) => persist((prev) => ({ ...prev, team })),
      setMentors: (mentors) => persist((prev) => ({ ...prev, mentors })),
      resetCms: () => persist(resetStored()),
    }),
    [cms, persist]
  );

  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>;
}

export function useCms() {
  const ctx = useContext(CmsContext);
  if (!ctx) throw new Error('useCms must be used inside CmsProvider');
  return ctx;
}
