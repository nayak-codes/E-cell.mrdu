import React, { useState } from 'react';
import { Calendar, MapPin, ArrowUpRight, CheckCircle2, X } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { eventBadgeClass } from '../lib/cms';

export default function Events({ darkMode }) {
  const { cms } = useCms();
  const events = cms.events || [];
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', rollNo: '', branch: 'CSE', year: '3rd Year', email: '' });

  const categories = ['All', ...Array.from(new Set(events.map((e) => e.category).filter(Boolean)))];

  const filteredEvents = activeCategory === 'All'
    ? events
    : events.filter(e => e.category === activeCategory);

  const handleRegister = (e) => {
    e.preventDefault();
    setRsvpSubmitted(true);
    setTimeout(() => {
      setRsvpSubmitted(false);
      setSelectedEvent(null);
    }, 2500);
  };

  return (
    <section id="events" className={`section-anchor py-20 relative transition-colors ${
      darkMode ? 'bg-zinc-900/40' : 'bg-zinc-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-3 ${
              darkMode ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400' : 'bg-blue-50 border border-blue-200 text-blue-700'
            }`}>
              <Calendar className="w-3.5 h-3.5" /> University Calendar
            </div>
            <h2 className={`text-2xl sm:text-4xl font-extrabold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Official University <span className={darkMode ? 'text-gradient-dark' : 'text-gradient-light'}>Events & Competitions</span>
            </h2>
          </div>

          {/* Filter Categories */}
          <div className={`flex items-center gap-1 p-1.5 rounded-xl border overflow-x-auto ${
            darkMode ? 'bg-white/[0.03] border-white/10' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white shadow-md'
                    : darkMode ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 && (
          <p className={`text-sm text-center py-12 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            No events in this category yet.
          </p>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className={`rounded-2xl border flex flex-col justify-between group transition-all overflow-hidden ${
                darkMode ? 'pro-card-dark' : 'pro-card-light'
              }`}
            >
              {event.image && (
                <div className="h-40 overflow-hidden">
                  <img src={event.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              )}
              <div className="p-6 flex flex-col justify-between flex-1">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold border ${eventBadgeClass(event.status)}`}>
                    {event.status}
                  </span>
                  <span className={`text-[11px] font-semibold uppercase tracking-wider ${
                    darkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    {event.category}
                  </span>
                </div>

                <h3 className={`text-lg sm:text-xl font-bold transition-colors ${
                  darkMode ? 'text-white group-hover:text-blue-400' : 'text-slate-900 group-hover:text-blue-700'
                }`}>
                  {event.title}
                </h3>

                <div className={`space-y-1.5 text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span>{event.date} • {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{event.venue}</span>
                  </div>
                </div>

                <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {event.description}
                </p>
              </div>

              <div className={`pt-4 mt-4 border-t flex items-center justify-between ${
                darkMode ? 'border-white/10' : 'border-slate-200'
              }`}>
                <span className={`text-[11px] font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  {event.organizer}
                </span>

                <button
                  onClick={() => setSelectedEvent(event)}
                  className="px-4 py-2 bg-blue-600/10 hover:bg-blue-600 border border-blue-500/30 hover:border-blue-600 text-blue-600 dark:text-blue-400 hover:text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1.5"
                >
                  Register Student Entry
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Official Registration Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className={`max-w-lg w-full p-6 rounded-2xl border shadow-2xl relative ${
            darkMode ? 'bg-[#111827] border-white/20 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg bg-slate-100 dark:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>

            {rsvpSubmitted ? (
              <div className="py-10 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h3 className="text-xl font-bold">Registration Received</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Your entry for <strong>{selectedEvent.title}</strong> has been logged in the university portal database.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Official Registration</span>
                  <h3 className="text-lg font-bold mt-1">{selectedEvent.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{selectedEvent.date} • {selectedEvent.venue}</p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Student Full Name *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Student Name"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-lg focus:outline-none focus:border-blue-500 text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold mb-1">University Roll No *</label>
                      <input
                        required
                        type="text"
                        placeholder="2211A..."
                        value={formData.rollNo}
                        onChange={e => setFormData({ ...formData, rollNo: e.target.value })}
                        className="w-full px-3.5 py-2 bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-lg focus:outline-none focus:border-blue-500 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1">Department / Branch</label>
                      <input
                        required
                        type="text"
                        placeholder="CSE / ECE / IT"
                        value={formData.branch}
                        onChange={e => setFormData({ ...formData, branch: e.target.value })}
                        className="w-full px-3.5 py-2 bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-lg focus:outline-none focus:border-blue-500 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1">University Email Address *</label>
                    <input
                      required
                      type="email"
                      placeholder="student@mallareddyuniversity.ac.in"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-lg focus:outline-none focus:border-blue-500 text-xs"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs transition-all shadow-md"
                >
                  Submit Official Registration
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </section>
  );
}
