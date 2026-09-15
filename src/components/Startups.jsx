import React from 'react';
import { Building2, ExternalLink, CheckCircle } from 'lucide-react';

export default function Startups({ darkMode }) {
  const startups = [
    {
      name: 'CropVision AI',
      category: 'AgriTech AI & Remote Sensing',
      funding: 'Seed Grant (₹25 Lakhs)',
      description: 'Hyperspectral drone imaging platform for early agricultural pest detection and automated yield estimation.',
      founders: 'Rahul Verma & Team (Dept of CSE, MRU)',
      status: 'Incubated Cohort 2025',
      badge: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30'
    },
    {
      name: 'EduSphere 3D',
      category: 'EdTech AR/VR',
      funding: 'Incubation Grant (₹40 Lakhs)',
      description: 'Interactive 3D virtual science lab simulations for high schools across Telangana & Andhra Pradesh.',
      founders: 'Priya Sharma & Vikram Reddy (Dept of ECE, MRU)',
      status: 'Commercial Pilot Phase',
      badge: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/30'
    },
    {
      name: 'EcoCharge Mobility',
      category: 'CleanTech EV Systems',
      funding: 'State Grant Winner',
      description: 'Modular battery swapping stations and IoT charging telemetry for campus micro-mobility fleets.',
      founders: 'Karthik Raju (Dept of EEE, MRU)',
      status: 'Prototyping & Field Trial',
      badge: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30'
    },
    {
      name: 'PulseCare IoT',
      category: 'HealthTech & Bio-Sensors',
      funding: 'Patent Filing Stage',
      description: 'Wearable non-invasive cardiac patch with cloud-based arrhythmia warning system for geriatric care.',
      founders: 'Sanjana Patel & Team (Dept of AIML, MRU)',
      status: 'Clinical Validation',
      badge: 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/30'
    }
  ];

  return (
    <section id="startups" className={`section-anchor py-20 relative transition-colors ${
      darkMode ? 'bg-[#070b14]' : 'bg-slate-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest ${
            darkMode ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400' : 'bg-blue-50 border border-blue-200 text-blue-700'
          }`}>
            <Building2 className="w-3.5 h-3.5" /> University Incubatees
          </div>
          <h2 className={`text-2xl sm:text-4xl font-extrabold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Incubated Student <span className={darkMode ? 'text-gradient-dark' : 'text-gradient-light'}>Ventures</span>
          </h2>
          <p className={`text-xs sm:text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Selected student-led startups receiving pre-incubation infrastructure, seed grants, and technical mentorship at Malla Reddy Deemed to be University.
          </p>
        </div>

        {/* Startups Grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {startups.map((startup, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl border flex flex-col justify-between transition-all ${
                darkMode ? 'pro-card-dark' : 'pro-card-light'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold border ${startup.badge}`}>
                    {startup.funding}
                  </span>
                  <span className={`text-[10px] font-semibold uppercase tracking-wider ${
                    darkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    {startup.category}
                  </span>
                </div>

                <h3 className={`text-xl font-bold flex items-center gap-2 ${
                  darkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  {startup.name}
                  <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </h3>

                <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  {startup.description}
                </p>

                <div className={`pt-2 border-t text-[11px] space-y-1 ${
                  darkMode ? 'border-white/10 text-slate-400' : 'border-slate-200 text-slate-600'
                }`}>
                  <div><strong>Founder Team:</strong> {startup.founders}</div>
                  <div><strong>Incubation Status:</strong> <span className="text-blue-600 dark:text-blue-300 font-bold">{startup.status}</span></div>
                </div>
              </div>

              <div className={`mt-4 pt-3 flex items-center justify-between border-t text-xs ${
                darkMode ? 'border-white/5 text-slate-400' : 'border-slate-100 text-slate-500'
              }`}>
                <span>MRU Incubation Wing</span>
                <button
                  onClick={() => alert(`Viewing profile for ${startup.name}`)}
                  className="text-blue-600 dark:text-blue-400 hover:underline text-xs font-bold flex items-center gap-1"
                >
                  View Profile
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
