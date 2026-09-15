import React from 'react';
import { Leaf, GraduationCap, Zap, HeartPulse } from 'lucide-react';

export default function Startups({ darkMode }) {
  const startups = [
    {
      name: 'CropVision AI',
      tag: 'AgriTech',
      grant: '₹25L seed',
      status: 'Incubated · 2025',
      description: 'Drones that spot crop pests early and help farmers estimate yield.',
      founders: 'Rahul Verma · CSE',
      icon: Leaf,
      accent: 'from-emerald-500 to-teal-500',
      chip: darkMode ? 'bg-emerald-500/15 text-emerald-300' : 'bg-emerald-100 text-emerald-800',
      card: darkMode ? 'border-emerald-500/20' : 'border-emerald-100 bg-gradient-to-br from-white to-emerald-50/80',
    },
    {
      name: 'EduSphere 3D',
      tag: 'EdTech',
      grant: '₹40L grant',
      status: 'Pilot in schools',
      description: '3D science labs for school students — experiments you can try on a screen.',
      founders: 'Priya Sharma & Vikram Reddy · ECE',
      icon: GraduationCap,
      accent: 'from-indigo-500 to-violet-500',
      chip: darkMode ? 'bg-indigo-500/15 text-indigo-300' : 'bg-indigo-100 text-indigo-800',
      card: darkMode ? 'border-indigo-500/20' : 'border-indigo-100 bg-gradient-to-br from-white to-indigo-50/80',
    },
    {
      name: 'EcoCharge',
      tag: 'CleanTech',
      grant: 'State grant',
      status: 'Field trial',
      description: 'Battery swap stations for campus bikes and small EVs, tracked live on a dashboard.',
      founders: 'Karthik Raju · EEE',
      icon: Zap,
      accent: 'from-amber-500 to-orange-500',
      chip: darkMode ? 'bg-amber-500/15 text-amber-300' : 'bg-amber-100 text-amber-900',
      card: darkMode ? 'border-amber-500/20' : 'border-amber-100 bg-gradient-to-br from-white to-amber-50/70',
    },
    {
      name: 'PulseCare',
      tag: 'HealthTech',
      grant: 'Patent stage',
      status: 'Validation',
      description: 'A small wearable patch that watches heart rhythm and sends an alert if something looks off.',
      founders: 'Sanjana Patel · AIML',
      icon: HeartPulse,
      accent: 'from-rose-500 to-pink-500',
      chip: darkMode ? 'bg-rose-500/15 text-rose-300' : 'bg-rose-100 text-rose-800',
      card: darkMode ? 'border-rose-500/20' : 'border-rose-100 bg-gradient-to-br from-white to-rose-50/80',
    },
  ];

  return (
    <section
      id="startups"
      className={`section-anchor py-20 ${darkMode ? 'bg-zinc-950' : 'bg-zinc-50'}`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-indigo-600 mb-3">Campus startups</p>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
            Built by students.{' '}
            <span className={darkMode ? 'text-gradient-dark' : 'text-gradient-light'}>Backed by E-CELL.</span>
          </h2>
          <p className={`mt-4 text-base leading-relaxed ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
            A few teams from MRU that we help with mentors, lab time, and seed support.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {startups.map((s) => (
            <article
              key={s.name}
              className={`rounded-2xl border overflow-hidden shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all ${
                darkMode ? `pro-card-dark ${s.card}` : s.card
              }`}
            >
              <div className={`h-1.5 bg-gradient-to-r ${s.accent}`} />
              <div className="p-6">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.accent} text-white flex items-center justify-center shadow-sm`}>
                    <s.icon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-wrap gap-1.5 justify-end">
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${s.chip}`}>{s.tag}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                      darkMode ? 'bg-white/10 text-zinc-300' : 'bg-zinc-100 text-zinc-600'
                    }`}>
                      {s.grant}
                    </span>
                  </div>
                </div>

                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                  {s.name}
                </h3>
                <p className={`mt-2 text-sm leading-relaxed ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  {s.description}
                </p>

                <div className={`mt-5 pt-4 border-t flex items-center justify-between gap-3 text-xs ${
                  darkMode ? 'border-white/10' : 'border-black/5'
                }`}>
                  <span className={darkMode ? 'text-zinc-400' : 'text-zinc-500'}>{s.founders}</span>
                  <span className="font-semibold text-indigo-600 dark:text-indigo-300">{s.status}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
