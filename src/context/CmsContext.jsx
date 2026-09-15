import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { loadCms, saveCms, resetCms as resetStored } from '../lib/cms';

const CmsContext = createContext(null);

export function CmsProvider({ children }) {
  const [cms, setCms] = useState(() => loadCms());

  const persist = useCallback((updater) => {
    setCms((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      try {
        saveCms(next);
      } catch (err) {
        console.error(err);
        alert('Could not save. Images may be too large for this browser. Try a smaller photo.');
        return prev;
      }
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
