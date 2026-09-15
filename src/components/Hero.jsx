import React from 'react';
import { Building2, FileText, Calendar, ArrowRight, Camera } from 'lucide-react';
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
    { label: 'Incubated Student Startups', value: '35+', sub: 'Across Engineering & Tech Wings' },
    { label: 'Funding & Seed Support', value: '₹1.5 Cr+', sub: 'Government & University Grants' },
    { label: 'Institutional Hackathons', value: '50+', sub: 'Annual Competitions & Summits' },
    { label: 'Student Founders & Innovators', value: '1,200+', sub: 'Active Community Members' },
  ];

  return (
    <section className={`relative pt-40 pb-20 md:pt-48 md:pb-28 overflow-hidden transition-colors ${
      darkMode
        ? 'bg-gradient-to-b from-[#070b14] via-[#0b1120] to-[#0b1120]'
        : 'bg-gradient-to-b from-slate-50 via-slate-100/70 to-slate-100'
    }`}>
      
      {/* Background Subtle Grid */}
      <div className={`absolute inset-0 bg-[size:3rem_3rem] pointer-events-none ${
        darkMode
          ? 'bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)]'
          : 'bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)]'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* Institutional Badge */}
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold tracking-wide ${
            darkMode
              ? 'bg-blue-500/10 border-blue-500/20 text-blue-300'
              : 'bg-blue-50 border-blue-200 text-blue-800 shadow-sm'
          }`}>
            <Building2 className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-bold">MALLA REDDY DEEMED TO BE UNIVERSITY</span>
            <span className="text-slate-400">•</span>
            <span className="font-medium">INSTITUTION'S INNOVATION COUNCIL</span>
          </div>

          {/* Main Title */}
          <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Empowering Innovation & <br />
            <span className={darkMode ? 'text-gradient-dark' : 'text-gradient-light'}>
              Student Entrepreneurship
            </span>
          </h1>

          {/* Subtitle */}
          <p className={`text-sm sm:text-lg font-normal leading-relaxed max-w-3xl mx-auto ${
            darkMode ? 'text-slate-300' : 'text-slate-700'
          }`}>
            The official Entrepreneurship Cell of Malla Reddy Deemed to be University provides state-of-the-art incubation, seed grant assistance, intellectual property filing, and industry mentorship for aspiring student founders.
          </p>

          {/* Action CTA Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenPitchModal}
              className="w-full sm:w-auto px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 text-sm"
            >
              <FileText className="w-4 h-4" />
              Apply for Incubation
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#events"
              className={`w-full sm:w-auto px-6 py-3.5 border font-semibold rounded-xl transition-all flex items-center justify-center gap-2 text-sm ${
                darkMode
                  ? 'bg-white/[0.04] hover:bg-white/[0.08] border-white/15 text-slate-200 hover:text-white'
                  : 'bg-white hover:bg-slate-50 border-slate-300 text-slate-800 shadow-sm'
              }`}
            >
              <Calendar className="w-4 h-4 text-blue-600" />
              View University Events
            </a>

            <a
              href="#wings"
              className={`w-full sm:w-auto px-6 py-3.5 border font-semibold rounded-xl transition-all flex items-center justify-center gap-2 text-sm ${
                darkMode
                  ? 'bg-white/[0.02] hover:bg-white/5 border-white/10 text-slate-400 hover:text-slate-200'
                  : 'bg-slate-200/60 hover:bg-slate-200 border-slate-300 text-slate-700'
              }`}
            >
              Explore Ecosystem Wings
            </a>
          </div>

        </div>

        {/* Institutional Stats Banner */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl border text-left transition-all ${
                darkMode
                  ? 'pro-card-dark bg-gradient-to-b from-[#111827] to-[#0f172a]'
                  : 'pro-card-light bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className={`text-2xl sm:text-3xl font-black tracking-tight ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}>
                {stat.value}
              </div>
              <div className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-1">
                {stat.label}
              </div>
              <div className={`text-[11px] mt-1 ${
                darkMode ? 'text-slate-400' : 'text-slate-600'
              }`}>
                {stat.sub}
              </div>
            </div>
          ))}
        </div>

        {/* ── RECENT EVENTS PHOTO SCROLL STRIP ── */}
        <div className={`mt-10 rounded-2xl border overflow-hidden ${
          darkMode ? 'border-white/10 bg-white/[0.03]' : 'border-slate-200 bg-slate-50 shadow-sm'
        }`}>
          {/* Strip header */}
          <div className={`flex items-center justify-between px-5 py-3 border-b ${
            darkMode ? 'border-white/10' : 'border-slate-200'
          }`}>
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-blue-500" />
              <span className={`text-xs font-bold uppercase tracking-widest ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Recent Events Gallery
              </span>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-600 text-[9px] font-bold text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
                LIVE
              </span>
            </div>
            <a href="#gallery" className={`text-[11px] font-semibold hover:text-blue-500 transition-colors ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              View Full Gallery →
            </a>
          </div>

          {/* Scrolling photo strip */}
          <div className="relative overflow-hidden py-3 px-1">
            {/* Left fade mask */}
            <div className={`absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none ${
              darkMode
                ? 'bg-gradient-to-r from-[#0d1424] to-transparent'
                : 'bg-gradient-to-r from-slate-50 to-transparent'
            }`} />
            {/* Right fade mask */}
            <div className={`absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none ${
              darkMode
                ? 'bg-gradient-to-l from-[#0d1424] to-transparent'
                : 'bg-gradient-to-l from-slate-50 to-transparent'
            }`} />

            {/* Marquee track — duplicated for seamless loop */}
            <div
              className="flex gap-3"
              style={{
                animation: 'marquee-scroll 28s linear infinite',
                width: 'max-content',
              }}
            >
              {(eventPhotos.length ? [...eventPhotos, ...eventPhotos] : []).map((photo, i) => (
                <a
                  key={i}
                  href="#gallery"
                  className="relative rounded-xl overflow-hidden shrink-0 group block"
                  style={{ width: '180px', height: '120px' }}
                >
                  <img
                    src={photo.url}
                    alt={photo.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-2">
                    <p className="text-white text-[10px] font-bold leading-tight line-clamp-1">{photo.label}</p>
                    <p className="text-blue-300 text-[9px] font-medium">{photo.date}</p>
                  </div>
                </a>
              ))}
            </div>

            <style>{`
              @keyframes marquee-scroll {
                0%   { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
            `}</style>
          </div>
        </div>

      </div>
    </section>
  );
}
