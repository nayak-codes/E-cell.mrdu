import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Sun, Moon } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import logoImage from '../../assets/site logo.png';

export default function Navbar({ darkMode, onToggleTheme, onOpenPitchModal }) {
  const { cms } = useCms();
  const announcements = cms.announcements?.length
    ? cms.announcements
    : ['Welcome to E-CELL MRU — pitch ideas, join events, and build with the campus founder community.'];
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Wings', href: '#wings' },
    { name: 'Events', href: '#events' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Startups', href: '#startups' },
    { name: 'Team', href: '#team' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className={`${darkMode ? 'bg-zinc-950 text-zinc-300' : 'bg-zinc-950 text-zinc-300'} text-[11px]`}>
        <div className="max-w-6xl mx-auto px-4 h-8 flex items-center gap-3">
          <span className="shrink-0 px-2 py-0.5 rounded-full bg-indigo-500 text-white text-[10px] font-semibold tracking-wide">
            What&apos;s new
          </span>
          <div className="overflow-hidden flex-1">
            <div className="animate-marquee whitespace-nowrap flex items-center gap-10">
              {[...announcements, ...announcements].map((item, index) => (
                <span key={index} className="inline-flex items-center gap-3">
                  {item}
                  <span className="text-indigo-400">•</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? darkMode
              ? 'bg-zinc-950/90 backdrop-blur-xl border-b border-white/10 shadow-lg'
              : 'bg-white/90 backdrop-blur-xl border-b border-zinc-200 shadow-sm'
            : darkMode
              ? 'bg-zinc-950 border-b border-white/5'
              : 'bg-white border-b border-zinc-100'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="h-16 flex items-center justify-between gap-4">
            <a href="#" className="flex items-center gap-2.5">
              <img src={logoImage} alt="E-Cell Logo" className="w-9 h-9 object-contain" />
              <div className="leading-tight">
                <p className={`text-[15px] font-bold tracking-tight ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                  E-CELL
                </p>
                <p className={`text-[9px] font-medium ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  Malla Reddy Deemed to be University
                </p>
              </div>
            </a>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                    darkMode
                      ? 'text-zinc-300 hover:text-white hover:bg-white/5'
                      : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={onToggleTheme}
                className={`p-2 rounded-lg ${darkMode ? 'text-zinc-300 hover:bg-white/5' : 'text-zinc-500 hover:bg-zinc-100'}`}
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button
                onClick={onOpenPitchModal}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold flex items-center gap-1.5 shadow-sm shadow-indigo-600/20"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Pitch your idea
              </button>
            </div>

            <div className="lg:hidden flex items-center gap-1">
              <button
                onClick={onToggleTheme}
                className={`p-2 rounded-lg ${darkMode ? 'text-zinc-300' : 'text-zinc-600'}`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-lg ${darkMode ? 'text-zinc-200' : 'text-zinc-800'}`}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className={`lg:hidden border-b ${darkMode ? 'bg-zinc-950 border-white/10' : 'bg-white border-zinc-100'}`}>
          <div className="px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2.5 px-2 text-sm font-medium rounded-lg ${
                  darkMode ? 'text-zinc-200 hover:bg-white/5' : 'text-zinc-700 hover:bg-zinc-50'
                }`}
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPitchModal();
              }}
              className="mt-2 w-full py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
            >
              Pitch your idea
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
