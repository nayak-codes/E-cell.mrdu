import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Image as ImageIcon, Film, Play, Maximize2, X, Download, Camera, Calendar, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export default function Gallery({ darkMode }) {
  const { cms } = useCms();
  const mediaItems = cms.gallery || [];
  const categories = useMemo(
    () => ['All', ...Array.from(new Set(mediaItems.map((item) => item.category).filter(Boolean)))],
    [mediaItems]
  );
  const heroSlides = useMemo(() => {
    const featured = mediaItems.filter((item) => item.featured);
    const source = (featured.length ? featured : mediaItems).slice(0, 4);
    return source.map((item) => ({
      id: `h-${item.id}`,
      url: item.url,
      badge: `${item.eventBadge || 'GALLERY'} · ${item.date || ''}`.trim(),
      badgeColor: item.eventBadgeColor || 'bg-blue-600',
      title: item.title,
      subtitle: item.category,
      desc: item.description,
      category: item.category,
    }));
  }, [mediaItems]);

  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const heroTimerRef = useRef(null);

  // Auto-slide hero banner
  useEffect(() => {
    if (heroPaused || heroSlides.length < 2) return;
    heroTimerRef.current = setInterval(() => {
      setHeroIndex(prev => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(heroTimerRef.current);
  }, [heroPaused, heroSlides.length]);

  const heroPrev = () => {
    setHeroIndex(prev => (prev - 1 + heroSlides.length) % heroSlides.length);
    setHeroPaused(true);
    setTimeout(() => setHeroPaused(false), 6000);
  };
  const heroNext = () => {
    setHeroIndex(prev => (prev + 1) % heroSlides.length);
    setHeroPaused(true);
    setTimeout(() => setHeroPaused(false), 6000);
  };

  const filteredMedia = activeCategory === 'All'
    ? mediaItems
    : mediaItems.filter(item => item.category === activeCategory);

  const openLightbox = (item) => {
    const idx = filteredMedia.findIndex(m => m.id === item.id);
    setLightboxIndex(idx);
    setSelectedMedia(item);
  };

  const goPrev = () => {
    const prev = (lightboxIndex - 1 + filteredMedia.length) % filteredMedia.length;
    setLightboxIndex(prev);
    setSelectedMedia(filteredMedia[prev]);
  };

  const goNext = () => {
    const next = (lightboxIndex + 1) % filteredMedia.length;
    setLightboxIndex(next);
    setSelectedMedia(filteredMedia[next]);
  };

  const currentSlide = heroSlides[heroIndex];

  return (
    <section id="gallery" className={`section-anchor py-20 relative transition-colors ${
      darkMode ? 'bg-[#0b1120]' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {currentSlide && (
        <div
          className="relative w-full overflow-hidden rounded-2xl mb-12 shadow-2xl"
          style={{ height: '420px' }}
          onMouseEnter={() => setHeroPaused(true)}
          onMouseLeave={() => setHeroPaused(false)}
        >
          {/* Slide images */}
          {heroSlides.map((slide, i) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                i === heroIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <img
                src={slide.url}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          ))}

          {/* Slide content */}
          <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-12">
            <div className="max-w-2xl">
              <span className={`inline-block px-3 py-1 rounded text-[11px] font-bold text-white mb-3 ${currentSlide.badgeColor}`}>
                {currentSlide.badge}
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-white leading-tight mb-2">
                {currentSlide.title}
              </h2>
              <p className="text-blue-300 text-sm font-semibold mb-1">{currentSlide.subtitle}</p>
              <p className="text-slate-300 text-xs md:text-sm">{currentSlide.desc}</p>
              <button
                onClick={() => setActiveCategory(currentSlide.category)}
                className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-all shadow-lg"
              >
                View Event Gallery <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Left / Right arrows */}
          <button
            onClick={heroPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/50 hover:bg-blue-600 border border-white/20 text-white flex items-center justify-center transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={heroNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/50 hover:bg-blue-600 border border-white/20 text-white flex items-center justify-center transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-5 right-6 z-30 flex items-center gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => { setHeroIndex(i); setHeroPaused(true); setTimeout(() => setHeroPaused(false), 6000); }}
                className={`rounded-full transition-all ${
                  i === heroIndex ? 'w-6 h-2 bg-blue-500' : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          {/* Slide counter */}
          <div className="absolute top-4 right-5 z-30 px-2.5 py-1 rounded-full bg-black/50 border border-white/20 text-white text-[10px] font-bold">
            {heroIndex + 1} / {heroSlides.length}
          </div>
        </div>
        )}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-3 ${
              darkMode ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400' : 'bg-blue-50 border border-blue-200 text-blue-700'
            }`}>
              <Camera className="w-3.5 h-3.5" /> Events Photo Gallery
            </div>
            <h2 className={`text-2xl sm:text-4xl font-extrabold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Recent <span className={darkMode ? 'text-gradient-dark' : 'text-gradient-light'}>Events & Moments</span>
            </h2>
            <p className={`text-xs sm:text-sm mt-2 max-w-xl ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Capturing every milestone — summits, hackathons, workshops, investor pitches and incubation achievements at Malla Reddy Deemed to be University.
            </p>
          </div>

          {/* Stats */}
          <div className={`flex items-center gap-4 text-center shrink-0`}>
            {[
              { num: mediaItems.length + '+', label: 'Event Photos' },
              { num: '6', label: 'Event Categories' },
            ].map(stat => (
              <div key={stat.label} className={`px-4 py-2 rounded-xl border ${
                darkMode ? 'bg-white/[0.03] border-white/10' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className={`text-lg font-extrabold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{stat.num}</div>
                <div className={`text-[10px] font-semibold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Categories */}
        <div className={`flex items-center gap-1.5 p-1 rounded-xl border overflow-x-auto mb-8 ${
          darkMode ? 'bg-white/[0.03] border-white/10' : 'bg-slate-100 border-slate-200'
        }`}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : darkMode ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Square Photo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              onClick={() => openLightbox(item)}
              className={`group cursor-pointer relative rounded-xl overflow-hidden border transition-all hover:shadow-xl hover:-translate-y-0.5 ${
                darkMode ? 'border-white/10 hover:border-blue-500/40' : 'border-slate-200 hover:border-blue-400/50'
              }`}
              style={{ aspectRatio: '1 / 1' }}
            >
              {/* Image */}
              <img
                src={item.type === 'photo' ? item.url : item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Event badge */}
              <div className={`absolute top-2 left-2 px-1.5 py-0.5 rounded text-[9px] font-bold text-white ${item.eventBadgeColor}`}>
                {item.eventBadge}
              </div>

              {/* Type badge */}
              <div className="absolute top-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/60 border border-white/20 text-[9px] font-bold text-white">
                {item.type === 'photo'
                  ? <ImageIcon className="w-2.5 h-2.5 text-blue-400" />
                  : <Film className="w-2.5 h-2.5 text-purple-400" />
                }
                {item.type.toUpperCase()}
              </div>

              {/* Hover play/zoom */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.type === 'video' ? (
                  <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-2xl ring-2 ring-white/30">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                ) : (
                  <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur text-white flex items-center justify-center ring-1 ring-white/30">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                )}
              </div>

              {/* Bottom info */}
              <div className="absolute bottom-0 left-0 right-0 p-2.5 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex items-center gap-1 mb-0.5">
                  <Calendar className="w-2.5 h-2.5 text-blue-400 shrink-0" />
                  <span className="text-[9px] text-blue-300 font-semibold">{item.date}</span>
                </div>
                <p className="text-[11px] font-bold text-white leading-tight line-clamp-2">{item.title}</p>
                <p className="text-[10px] text-slate-300 mt-0.5 font-medium">{item.category}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Photo count line */}
        <p className={`text-center text-xs mt-6 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
          Showing <span className="font-bold">{filteredMedia.length}</span> of <span className="font-bold">{mediaItems.length}</span> event media items
        </p>
      </div>

      {/* Lightbox / Video Modal */}
      {selectedMedia && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
          onClick={(e) => e.target === e.currentTarget && setSelectedMedia(null)}
        >
          <div className={`relative max-w-4xl w-full border rounded-2xl overflow-hidden shadow-2xl ${
            darkMode ? 'bg-[#111827] border-white/20' : 'bg-white border-slate-200'
          }`}>
            {/* Modal Header */}
            <div className={`flex items-center justify-between p-4 border-b ${
              darkMode ? 'bg-[#0b1120] border-white/10' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center gap-3 min-w-0">
                <span className={`px-2 py-0.5 rounded text-white text-[10px] font-bold shrink-0 ${selectedMedia.eventBadgeColor}`}>
                  {selectedMedia.eventBadge}
                </span>
                <span className="px-2 py-0.5 rounded bg-blue-600/20 border border-blue-500/30 text-blue-500 text-[10px] font-bold shrink-0">
                  {selectedMedia.category}
                </span>
                <h3 className={`text-sm font-bold truncate ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {selectedMedia.title}
                </h3>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-3">
                <span className={`text-[10px] font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{lightboxIndex + 1} / {filteredMedia.length}</span>
                <button
                  onClick={() => setSelectedMedia(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-200 dark:bg-white/5 hover:bg-red-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Media */}
            <div className="relative bg-black flex items-center justify-center min-h-[300px] max-h-[65vh]">
              {selectedMedia.type === 'photo' ? (
                <img
                  src={selectedMedia.url}
                  alt={selectedMedia.title}
                  className="max-h-[65vh] w-auto object-contain mx-auto"
                />
              ) : (
                <div className="w-full aspect-video">
                  <iframe
                    src={selectedMedia.videoUrl}
                    title={selectedMedia.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}

              {/* Prev / Next arrows */}
              {filteredMedia.length > 1 && (
                <>
                  <button
                    onClick={goPrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-blue-600 border border-white/20 text-white flex items-center justify-center transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={goNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-blue-600 border border-white/20 text-white flex items-center justify-center transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className={`p-4 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs ${
              darkMode ? 'bg-[#0b1120] border-white/10 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}>
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span className="font-semibold text-blue-500 mr-1">{selectedMedia.date}</span>
                <span>{selectedMedia.description}</span>
              </div>
              {selectedMedia.type === 'photo' && (
                <a
                  href={selectedMedia.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 bg-blue-600 text-white font-bold rounded-lg flex items-center gap-1.5 hover:bg-blue-700 transition-colors shrink-0 text-[11px]"
                >
                  <Download className="w-3.5 h-3.5" /> Download
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
