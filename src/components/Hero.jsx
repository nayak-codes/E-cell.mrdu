import React from 'react';
import { Sparkles, Calendar, ArrowRight, Camera } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export default function Hero({ darkMode, onOpenPitchModal }) {
  const { cms } = useCms();
  const eventPhotos = (cms.gallery || []).slice(0, 8).map((item) => ({
    id: item.id,
    url: item.url,
    label: item.title,
    date: item.date,
  }));
  const stats = [
    { label: 'Student startups', value: '35+', box: 'bg-indigo-50 border-indigo-100 text-indigo-700' },
    { label: 'Seed support', value: '₹1.5 Cr+', box: 'bg-violet-50 border-violet-100 text-violet-700' },
    { label: 'Hackathons', value: '50+', box: 'bg-fuchsia-50 border-fuchsia-100 text-fuchsia-700' },
    { label: 'Founders in community', value: '1,200+', box: 'bg-emerald-50 border-emerald-100 text-emerald-700' },
  ];

  return (
    <section className={`relative pt-32 pb-16 md:pt-36 md:pb-20 overflow-hidden ${
      darkMode ? 'bg-zinc-950' : 'bg-white'
    }`}>
      <div className={`absolute inset-0 pointer-events-none ${
        darkMode
          ? 'bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.18),_transparent_55%)]'
          : 'bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.12),_transparent_50%)]'
      }`} />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <p className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">
            Student entrepreneurship club · MRU
          </p>

          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] ${
            darkMode ? 'text-white' : 'text-zinc-900'
          }`}>
            Build. Pitch.
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">
              Launch from campus.
            </span>
          </h1>

          <p className={`mt-5 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto ${
            darkMode ? 'text-zinc-400' : 'text-zinc-600'
          }`}>
            E-CELL is the founder community at Malla Reddy University — events, mentorship, incubation, and a crew that helps student ideas become startups.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenPitchModal}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25"
            >
              <Sparkles className="w-4 h-4" />
              Pitch your idea
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#events"
              className={`w-full sm:w-auto px-6 py-3 rounded-xl border font-semibold text-sm flex items-center justify-center gap-2 ${
                darkMode
                  ? 'border-white/15 text-zinc-200 hover:bg-white/5'
                  : 'border-zinc-200 bg-white text-zinc-800 hover:border-indigo-200'
              }`}
            >
              <Calendar className="w-4 h-4" />
              Upcoming events
            </a>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`rounded-2xl p-5 text-center border ${
                darkMode ? 'bg-white/5 border-white/10' : stat.box
              }`}
            >
              <div className={`text-2xl sm:text-3xl font-extrabold ${darkMode ? 'text-white' : ''}`}>
                {stat.value}
              </div>
              <div className={`text-xs mt-1 font-medium ${darkMode ? 'text-zinc-400' : 'opacity-80'}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {eventPhotos.length > 0 && (
          <div className={`mt-10 rounded-2xl border overflow-hidden ${
            darkMode ? 'border-white/10 bg-white/[0.03]' : 'border-zinc-200 bg-zinc-50'
          }`}>
            <div className={`flex items-center justify-between px-5 py-3 border-b ${
              darkMode ? 'border-white/10' : 'border-zinc-200'
            }`}>
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-indigo-500" />
                <span className={`text-xs font-semibold ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                  From campus events
                </span>
              </div>
              <a href="#gallery" className="text-xs font-semibold text-indigo-600 hover:text-indigo-500">
                Gallery →
              </a>
            </div>
            <div className="relative overflow-hidden py-3">
              <div
                className="flex gap-3 px-3"
                style={{ animation: 'marquee-scroll 28s linear infinite', width: 'max-content' }}
              >
                {[...eventPhotos, ...eventPhotos].map((photo, i) => (
                  <a
                    key={i}
                    href="#gallery"
                    className="relative rounded-xl overflow-hidden shrink-0"
                    style={{ width: '168px', height: '110px' }}
                  >
                    <img src={photo.url} alt={photo.label} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <p className="absolute bottom-2 left-2 right-2 text-white text-[10px] font-semibold line-clamp-1">
                      {photo.label}
                    </p>
                  </a>
                ))}
              </div>
              <style>{`
                @keyframes marquee-scroll {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
              `}</style>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
