import React, { useState } from 'react';
import { X, Send, CheckCircle2, Building2 } from 'lucide-react';

export default function PitchModal({ isOpen, onClose, darkMode }) {
  const [submitted, setSubmitted] = useState(false);
  const [applicationRef, setApplicationRef] = useState('');
  const [form, setForm] = useState({
    applicantName: '',
    rollNo: '',
    email: '',
    phone: '',
    branch: 'CSE',
    year: '3rd Year',
    startupTitle: '',
    sector: 'AI & Data Science',
    stage: 'Working Prototype (MVP)',
    problem: '',
    solution: '',
    driveLink: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const refCode = 'MRU-INC-2026-' + Math.floor(1000 + Math.random() * 9000);
    setApplicationRef(refCode);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className={`max-w-2xl w-full p-6 sm:p-8 rounded-2xl relative border shadow-2xl my-8 ${
        darkMode ? 'bg-[#111827] border-white/20 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg bg-slate-100 dark:bg-white/5"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />

            <div className="space-y-1">
              <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold uppercase tracking-wider">
                Application Submitted
              </span>
              <h3 className="text-2xl font-bold">Startup Incubation Filing Received</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                Your pre-incubation application for <strong>"{form.startupTitle}"</strong> has been logged into the Malla Reddy University Incubation Board database.
              </p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl max-w-xs mx-auto">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block uppercase font-medium">Official Reference Number</span>
              <span className="text-lg font-black text-blue-600 dark:text-blue-400 font-mono mt-0.5 block">
                {applicationRef}
              </span>
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              A copy of your submission has been forwarded to the Technical Lead & Incubation Panel. You will receive an interview schedule at <strong>{form.email}</strong>.
            </p>

            <button
              onClick={handleReset}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs transition-all shadow-md"
            >
              Close & Return to Portal
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div className="border-b border-slate-200 dark:border-white/10 pb-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-700 dark:text-blue-400 text-[11px] font-semibold uppercase tracking-wider mb-1">
                <Building2 className="w-3 h-3" /> Official Application
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold">
                Startup Pre-Incubation Application Form
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Malla Reddy Deemed to be University • Institution's Innovation Council
              </p>
            </div>

            <div className="space-y-3.5 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Lead Applicant Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="Full Name"
                    value={form.applicantName}
                    onChange={e => setForm({ ...form, applicantName: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-lg focus:outline-none focus:border-blue-500 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">University Roll Number *</label>
                  <input
                    required
                    type="text"
                    placeholder="2211A0..."
                    value={form.rollNo}
                    onChange={e => setForm({ ...form, rollNo: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-lg focus:outline-none focus:border-blue-500 text-xs"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">University Email Address *</label>
                  <input
                    required
                    type="email"
                    placeholder="student@mallareddyuniversity.ac.in"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-lg focus:outline-none focus:border-blue-500 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Contact Phone Number *</label>
                  <input
                    required
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-lg focus:outline-none focus:border-blue-500 text-xs"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Department / Branch</label>
                  <select
                    value={form.branch}
                    onChange={e => setForm({ ...form, branch: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#111827] border border-slate-300 dark:border-white/10 rounded-lg focus:outline-none focus:border-blue-500 text-xs"
                  >
                    <option value="CSE">Computer Science & Engg (CSE)</option>
                    <option value="AI&ML">Artificial Intelligence & ML</option>
                    <option value="ECE">Electronics & Comm (ECE)</option>
                    <option value="IT">Information Technology (IT)</option>
                    <option value="Mechanical">Mechanical Engineering</option>
                    <option value="Pharmacy">Pharmacy / BioTech</option>
                    <option value="MBA">Management (MBA)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Year of Study</label>
                  <select
                    value={form.year}
                    onChange={e => setForm({ ...form, year: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#111827] border border-slate-300 dark:border-white/10 rounded-lg focus:outline-none focus:border-blue-500 text-xs"
                  >
                    <option value="1st Year">1st Year B.Tech</option>
                    <option value="2nd Year">2nd Year B.Tech</option>
                    <option value="3rd Year">3rd Year B.Tech</option>
                    <option value="4th Year">4th Year B.Tech</option>
                    <option value="Post Graduate">PG / Alumni</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-semibold mb-1">Proposed Venture Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. NextGen Robotics"
                    value={form.startupTitle}
                    onChange={e => setForm({ ...form, startupTitle: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-lg focus:outline-none focus:border-blue-500 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Current Development Stage</label>
                  <select
                    value={form.stage}
                    onChange={e => setForm({ ...form, stage: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#111827] border border-slate-300 dark:border-white/10 rounded-lg focus:outline-none focus:border-blue-500 text-xs"
                  >
                    <option value="Idea Phase">Idea / Concept Phase</option>
                    <option value="Proof of Concept">Proof of Concept (PoC)</option>
                    <option value="Working Prototype (MVP)">Working Prototype (MVP)</option>
                    <option value="Pilot Deployed">Pilot Deployed / Traction</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Problem Statement & Target Market *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Describe the problem your venture solves..."
                  value={form.problem}
                  onChange={e => setForm({ ...form, problem: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-lg focus:outline-none focus:border-blue-500 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Technical Solution & Innovation *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Detail your technology or business solution..."
                  value={form.solution}
                  onChange={e => setForm({ ...form, solution: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-lg focus:outline-none focus:border-blue-500 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Pitch Deck / Executive Summary Link</label>
                <input
                  type="url"
                  placeholder="https://drive.google.com/file/d/..."
                  value={form.driveLink}
                  onChange={e => setForm({ ...form, driveLink: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-lg focus:outline-none focus:border-blue-500 text-xs"
                />
              </div>

            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white font-semibold text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs transition-all shadow-md flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                Submit Incubation Filing
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
