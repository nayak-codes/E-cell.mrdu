import React from 'react';
import { Target, ShieldCheck, Layers, Cpu, FileCheck2, Landmark, Compass } from 'lucide-react';

export default function About({ darkMode }) {
  const wings = [
    {
      icon: Cpu,
      title: 'Technical & Engineering Wing',
      lead: 'Supervised by Technical Lead',
      description: 'Provides technical infrastructure, cloud compute credits, code reviews, and software architecture guidance for student tech founders.',
      borderLight: 'border-blue-200 bg-blue-50/50',
      borderDark: 'border-blue-500/30'
    },
    {
      icon: Layers,
      title: 'Incubation & Prototype Wing',
      lead: 'MRU Makers Lab',
      description: 'Access to rapid prototyping equipment, 3D printing facilities, IoT hardware testing kits, and university lab resources.',
      borderLight: 'border-emerald-200 bg-emerald-50/50',
      borderDark: 'border-emerald-500/30'
    },
    {
      icon: FileCheck2,
      title: 'IPR & Legal Compliance Cell',
      lead: 'Patent Advisory Division',
      description: 'Facilitates provisional patent filing, trademark registration, and legal entity incorporation for student startups.',
      borderLight: 'border-purple-200 bg-purple-50/50',
      borderDark: 'border-purple-500/30'
    },
    {
      icon: Landmark,
      title: 'Venture & Seed Assistance Cell',
      lead: 'MSME & Angel Network Wing',
      description: 'Direct connections to state incubation funds, angel investor syndicates, T-Hub partnerships, and seed grants.',
      borderLight: 'border-amber-200 bg-amber-50/50',
      borderDark: 'border-amber-500/30'
    }
  ];

  return (
    <section id="about" className={`section-anchor py-20 relative transition-colors ${
      darkMode ? 'bg-[#0b1120]' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest ${
            darkMode ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400' : 'bg-blue-50 border border-blue-200 text-blue-700'
          }`}>
            <Compass className="w-3.5 h-3.5" /> Institutional Objectives
          </div>
          <h2 className={`text-2xl sm:text-4xl font-extrabold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Fostering Academic & Technological <span className={darkMode ? 'text-gradient-dark' : 'text-gradient-light'}>Incubation</span>
          </h2>
          <p className={`text-sm sm:text-base ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Malla Reddy Deemed to be University Entrepreneurship Cell operates under the directives of the Ministry of Education's Innovation Council (MIC) to convert research into viable commercial enterprises.
          </p>
        </div>

        {/* Core Vision & Institutional Mandate */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className={`p-8 rounded-2xl border transition-all ${
            darkMode ? 'pro-card-dark' : 'pro-card-light'
          }`}>
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 font-bold">
              <Target className="w-5 h-5" />
            </div>
            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Our Institutional Vision
            </h3>
            <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              To establish Malla Reddy Deemed to be University as a premier regional center for technological innovation, deep-tech research commercialization, and sustainable student entrepreneurship in Telangana.
            </p>
          </div>

          <div className={`p-8 rounded-2xl border transition-all ${
            darkMode ? 'pro-card-dark' : 'pro-card-light'
          }`}>
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Government & Regulatory Approvals
            </h3>
            <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Formally recognized under the Institution's Innovation Council (IIC) guidelines. Aligned with National Innovation and Start-up Policy (NISP) for HEIs.
            </p>
          </div>
        </div>

        {/* Specialized Ecosystem Wings */}
        <div id="wings" className="pt-6">
          <div className="text-center mb-10">
            <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Specialized Incubation Wings
            </h3>
            <p className={`text-xs mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Structured support divisions catering to every phase of startup growth.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wings.map((wing, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                  darkMode ? `pro-card-dark ${wing.borderDark}` : `pro-card-light ${wing.borderLight}`
                }`}
              >
                <div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                    darkMode ? 'bg-white/5 text-blue-400' : 'bg-blue-50 text-blue-700'
                  }`}>
                    <wing.icon className="w-5 h-5" />
                  </div>
                  <h4 className={`text-base font-bold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {wing.title}
                  </h4>
                  <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block mb-3">
                    {wing.lead}
                  </span>
                  <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {wing.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
