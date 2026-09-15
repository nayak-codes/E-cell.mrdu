import React, { useState, useEffect } from 'react';
import { Building2, Menu, X, ChevronRight, FileText, Sun, Moon, Megaphone } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export default function Navbar({ darkMode, onToggleTheme, onOpenPitchModal }) {
  const { cms } = useCms();
  const announcements = cms.announcements?.length
    ? cms.announcements
    : ['Welcome to the official E-Cell portal of Malla Reddy Deemed to be University.'];
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
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
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="h-1 bg-gradient-to-r from-rose-800 via-blue-600 to-teal-600" />
      
      {/* 🚀 TOP SCROLLING UPDATES TICKER BAR */}
      <div className={`${darkMode ? 'bg-[#050911] text-slate-300 border-white/10' : 'bg-slate-900 text-slate-100 border-slate-800'} border-b py-1.5 px-4 overflow-hidden text-xs`}>
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          
          {/* Static Live Update Pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-blue-600 text-white font-bold text-[10px] tracking-wider uppercase shrink-0 shadow-sm">
            <Megaphone className="w-3 h-3 animate-bounce" />
            <span>UPDATES</span>
          </div>

          {/* Scrolling Ticker Marquee Container */}
          <div className="overflow-hidden flex-1 relative">
            <div className="animate-marquee whitespace-nowrap flex items-center gap-12 font-medium text-[11px] sm:text-xs">
              {[...announcements, ...announcements].map((item, index) => (
                <span key={index} className="inline-flex items-center gap-2 hover:underline cursor-pointer">
                  <span>{item}</span>
                  <span className="text-blue-400 font-bold ml-4">•</span>
                </span>
              ))}
            </div>
          </div>

          {/* Helpline badge */}
          <div className="hidden lg:flex items-center gap-2 text-[11px] shrink-0 text-slate-400">
            <span>UGC Recognized & NAAC Accredited</span>
          </div>

        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? darkMode
              ? 'bg-[#0b1120]/95 backdrop-blur-xl border-b border-white/10 shadow-xl'
              : 'bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-md'
            : darkMode
              ? 'bg-[#0b1120]/80 backdrop-blur-md border-b border-white/5'
              : 'bg-white/80 backdrop-blur-md border-b border-slate-200/80'
        } py-3`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* University Crest & E-Cell Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className={`w-10 h-10 rounded-xl p-2 flex items-center justify-center transition-colors ${
                darkMode ? 'bg-blue-600/20 border border-blue-500/30 text-blue-400' : 'bg-blue-50 border border-blue-200 text-blue-600'
              }`}>
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className={`font-black text-lg tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    MRU E-CELL
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                    darkMode ? 'bg-blue-500/10 border border-blue-500/30 text-blue-400' : 'bg-blue-50 border border-blue-200 text-blue-700'
                  }`}>
                    OFFICIAL PORTAL
                  </span>
                </div>
                <p className={`text-[10px] font-semibold tracking-wide ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  MALLA REDDY DEEMED TO BE UNIVERSITY
                </p>
              </div>
            </a>

            {/* Desktop Nav Links */}
            <nav className={`hidden lg:flex items-center gap-1 px-4 py-1.5 rounded-full border ${
              darkMode ? 'bg-white/[0.03] border-white/10' : 'bg-slate-100 border-slate-200'
            }`}>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all ${
                    darkMode
                      ? 'text-slate-300 hover:text-white hover:bg-white/5'
                      : 'text-slate-600 hover:text-blue-700 hover:bg-white'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Right Side Buttons: Light/Dark Theme Switcher + Apply Button */}
            <div className="hidden md:flex items-center gap-3">
              
              {/* Theme Toggle Button */}
              <button
                onClick={onToggleTheme}
                title={darkMode ? "Switch to Crisp Light Mode" : "Switch to Dark Mode"}
                className={`p-2 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-bold ${
                  darkMode
                    ? 'bg-white/5 border-white/10 text-amber-400 hover:bg-white/10'
                    : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {darkMode ? (
                  <>
                    <Sun className="w-4 h-4 text-amber-400" />
                    <span className="hidden xl:inline text-slate-300 font-medium">Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-indigo-600" />
                    <span className="hidden xl:inline text-slate-700 font-medium">Dark Mode</span>
                  </>
                )}
              </button>

              <button
                onClick={onOpenPitchModal}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-600/20 transition-all flex items-center gap-2"
              >
                <FileText className="w-3.5 h-3.5" />
                Apply for Incubation
              </button>
            </div>

            {/* Mobile Toggle */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={onToggleTheme}
                className={`p-2 rounded-lg border ${
                  darkMode ? 'bg-white/5 border-white/10 text-amber-400' : 'bg-slate-100 border-slate-300 text-slate-700'
                }`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-lg border ${
                  darkMode ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-slate-100 border-slate-300 text-slate-700'
                }`}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-b px-6 py-6 transition-all shadow-xl ${
          darkMode ? 'bg-[#0b1120] border-white/10' : 'bg-white border-slate-200'
        }`}>
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-semibold py-2 px-3 rounded-lg transition-all flex items-center justify-between ${
                  darkMode ? 'text-slate-200 hover:text-blue-400 hover:bg-white/5' : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                {link.name}
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            ))}
            <div className="pt-4 border-t border-slate-200 dark:border-white/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPitchModal();
                }}
                className="w-full py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md"
              >
                <FileText className="w-4 h-4" />
                Apply for Incubation
              </button>
            </div>
          </div>
        </div>
      )}

    </header>
  );
}
