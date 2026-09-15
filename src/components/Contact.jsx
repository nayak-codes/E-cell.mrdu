import React, { useState } from 'react';
import { Mail, MapPin, ChevronDown, Send, CheckCircle2, Building2, ExternalLink } from 'lucide-react';
import { navigateTo } from '../lib/cms';

export default function Contact({ darkMode }) {
  const [openFaq, setOpenFaq] = useState(0);
  const [contactSent, setContactSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const faqs = [
    {
      q: 'Who is eligible to apply for MRU Pre-Incubation support?',
      a: 'All enrolled undergraduate, post-graduate students, research scholars, and faculty members of Malla Reddy Deemed to be University are eligible to submit startup proposals.'
    },
    {
      q: 'What institutional support does MRU E-Cell provide?',
      a: 'Selected student ventures receive physical maker space access, high-speed cloud credits, patent filing subsidies, seed grant assistance, and direct mentor mapping.'
    },
    {
      q: 'How does the university handle Intellectual Property (IPR)?',
      a: 'In accordance with the National Innovation and Start-up Policy (NISP), student innovators retain majority IP ownership, with the university providing advisory and legal filing support.'
    },
    {
      q: 'How can students join the E-Cell Student Leadership Council?',
      a: 'Student recruitment drives are conducted annually for Technical, Operations, Marketing, and Incubation wings. Notifications are published on this official portal.'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setContactSent(true);
    setTimeout(() => {
      setContactSent(false);
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <section id="contact" className={`section-anchor py-20 relative transition-colors ${
      darkMode ? 'bg-[#070b14]' : 'bg-slate-100/80'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest ${
            darkMode ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400' : 'bg-blue-50 border border-blue-200 text-blue-700'
          }`}>
            <Mail className="w-3.5 h-3.5" /> Official Helpdesk
          </div>
          <h2 className={`text-2xl sm:text-4xl font-extrabold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Contact & <span className={darkMode ? 'text-gradient-dark' : 'text-gradient-light'}>Support Desk</span>
          </h2>
          <p className={`text-xs sm:text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            For inquiries regarding student incubation, campus hackathons, or mentor partnerships, reach out to the E-Cell secretariat.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          
          {/* FAQ Accordion */}
          <div className="space-y-3">
            <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Frequently Asked Questions
            </h3>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`rounded-xl border overflow-hidden ${
                  darkMode ? 'pro-card-dark' : 'pro-card-light'
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  className={`w-full p-4 text-left flex items-center justify-between gap-3 font-bold text-xs sm:text-sm transition-colors ${
                    darkMode ? 'text-white hover:text-blue-400' : 'text-slate-900 hover:text-blue-700'
                  }`}
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className={`px-4 pb-4 text-xs leading-relaxed border-t pt-2 ${
                    darkMode ? 'border-white/5 text-slate-300' : 'border-slate-200 text-slate-600'
                  }`}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Form & University Address */}
          <div className={`p-6 sm:p-8 rounded-2xl border flex flex-col justify-between ${
            darkMode ? 'pro-card-dark' : 'pro-card-light'
          }`}>
            {contactSent ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Message Dispatched</h4>
                <p className={`text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  Your query has been logged. The E-Cell secretariat will respond to <strong>{form.email}</strong> shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <h3 className={`text-lg font-bold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Official Inquiry Form</h3>

                <div>
                  <label className={`block text-xs font-semibold mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Enter full name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className={`w-full px-3.5 py-2 border rounded-lg focus:outline-none focus:border-blue-500 text-xs ${
                      darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={`block text-xs font-semibold mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Email Address</label>
                    <input
                      required
                      type="email"
                      placeholder="email@domain.com"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className={`w-full px-3.5 py-2 border rounded-lg focus:outline-none focus:border-blue-500 text-xs ${
                        darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-xs font-semibold mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Subject</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Incubation Query"
                      value={form.subject}
                      onChange={e => setForm({ ...form, subject: e.target.value })}
                      className={`w-full px-3.5 py-2 border rounded-lg focus:outline-none focus:border-blue-500 text-xs ${
                        darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-semibold mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Message Detail</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Write your query here..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className={`w-full px-3.5 py-2 border rounded-lg focus:outline-none focus:border-blue-500 text-xs ${
                      darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 font-bold text-white rounded-lg text-xs transition-all shadow-md flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" /> Submit Official Inquiry
                </button>
              </form>
            )}

            <div className={`mt-6 pt-4 border-t space-y-2 text-[11px] ${
              darkMode ? 'border-white/10 text-slate-400' : 'border-slate-200 text-slate-600'
            }`}>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span>Innovation & Incubation Secretariat, Malla Reddy Deemed to be University, Maisammaguda, Dhulapally, Hyderabad, Telangana - 500100.</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>ecell@mallareddyuniversity.ac.in</span>
              </div>
            </div>

          </div>

        </div>

        {/* Official Institutional Footer */}
        <footer className={`pt-8 border-t space-y-4 ${
          darkMode ? 'border-white/10 text-slate-400' : 'border-slate-300 text-slate-600'
        }`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <span className={`font-bold block ${darkMode ? 'text-white' : 'text-slate-900'}`}>Malla Reddy Deemed to be University</span>
                <span className="text-[11px]">Entrepreneurship Cell • Official Web Portal</span>
              </div>
            </div>

            <div className="flex items-center gap-6 text-[11px] font-semibold">
              <a href="#about" className="hover:text-blue-600 transition-colors">About Council</a>
              <a href="#wings" className="hover:text-blue-600 transition-colors">Incubation Wings</a>
              <a href="#events" className="hover:text-blue-600 transition-colors">Events & Summits</a>
              <a href="#team" className="hover:text-blue-600 transition-colors">Governance</a>
              <a href="https://mallareddyuniversity.ac.in" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors flex items-center gap-1">
                Main University Site <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className={`pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] ${
            darkMode ? 'border-white/5 text-slate-500' : 'border-slate-200 text-slate-500'
          }`}>
            <p>© 2026 Malla Reddy Deemed to be University. All Rights Reserved. Approved under MIC & UGC guidelines.</p>
            <button
              type="button"
              onClick={() => navigateTo('/admin')}
              className="hover:text-blue-600 transition-colors"
            >
              Admin login
            </button>
          </div>
        </footer>

      </div>
    </section>
  );
}
