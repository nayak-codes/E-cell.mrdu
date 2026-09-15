import React from 'react';
import { Calendar, Users, Rocket, Lightbulb, Cpu, Hammer, Scale, Wallet } from 'lucide-react';

export default function About({ darkMode }) {
  const cards = [
    {
      icon: Lightbulb,
      title: 'Have an idea?',
      text: 'Bring it in. We help you write it down, test it with people, and see if it can become a startup.',
      wrap: darkMode
        ? 'bg-indigo-500/15 border-indigo-400/30'
        : 'bg-gradient-to-br from-indigo-50 to-violet-100 border-indigo-200',
      iconBox: darkMode ? 'bg-indigo-500 text-white' : 'bg-indigo-600 text-white',
    },
    {
      icon: Calendar,
      title: 'Events that teach',
      text: 'Hackathons, workshops, and pitch nights — so you learn by building, not only by sitting in class.',
      wrap: darkMode
        ? 'bg-fuchsia-500/15 border-fuchsia-400/30'
        : 'bg-gradient-to-br from-fuchsia-50 to-pink-100 border-fuchsia-200',
      iconBox: darkMode ? 'bg-fuchsia-500 text-white' : 'bg-fuchsia-600 text-white',
    },
    {
      icon: Users,
      title: 'Find your people',
      text: 'Meet teammates from CSE, ECE, MBA and more. Most campus startups start with a good co-founder.',
      wrap: darkMode
        ? 'bg-sky-500/15 border-sky-400/30'
        : 'bg-gradient-to-br from-sky-50 to-cyan-100 border-sky-200',
      iconBox: darkMode ? 'bg-sky-500 text-white' : 'bg-sky-600 text-white',
    },
    {
      icon: Rocket,
      title: 'Go from campus to launch',
      text: 'Mentors, lab access, and incubation support when you are ready to take the project outside the classroom.',
      wrap: darkMode
        ? 'bg-emerald-500/15 border-emerald-400/30'
        : 'bg-gradient-to-br from-emerald-50 to-teal-100 border-emerald-200',
      iconBox: darkMode ? 'bg-emerald-500 text-white' : 'bg-emerald-600 text-white',
    },
  ];

  const wings = [
    {
      icon: Cpu,
      title: 'Tech',
      text: 'Help with product, code, cloud, and building a working demo.',
      wrap: darkMode ? 'bg-indigo-500/10 border-indigo-400/25' : 'bg-indigo-600 text-white border-indigo-600',
      light: false,
    },
    {
      icon: Hammer,
      title: 'Build lab',
      text: '3D printing, hardware kits, and a place to make a prototype.',
      wrap: darkMode ? 'bg-orange-500/10 border-orange-400/25' : 'bg-orange-500 text-white border-orange-500',
      light: false,
    },
    {
      icon: Scale,
      title: 'Legal & IP',
      text: 'Simple help on patents, company setup, and protecting your idea.',
      wrap: darkMode ? 'bg-violet-500/10 border-violet-400/25' : 'bg-violet-600 text-white border-violet-600',
      light: false,
    },
    {
      icon: Wallet,
      title: 'Funding',
      text: 'Introductions to grants, angels, and campus seed support.',
      wrap: darkMode ? 'bg-teal-500/10 border-teal-400/25' : 'bg-teal-600 text-white border-teal-600',
      light: false,
    },
  ];

  return (
    <section
      id="about"
      className={`section-anchor py-20 relative overflow-hidden ${
        darkMode
          ? 'bg-zinc-950'
          : 'bg-gradient-to-b from-indigo-50/80 via-white to-fuchsia-50/50'
      }`}
    >
      {!darkMode && (
        <>
          <div className="absolute -top-24 right-0 w-80 h-80 rounded-full bg-violet-200/50 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-sky-200/40 blur-3xl pointer-events-none" />
        </>
      )}

      <div className="max-w-6xl mx-auto px-4 relative">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-indigo-600 mb-3">About E-CELL</p>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
            What we do, in simple words
          </h2>
          <p className={`mt-4 text-base leading-relaxed ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
            E-CELL is the student entrepreneurship club at Malla Reddy Deemed to be University.
            We help you start — from a rough idea to a team, a prototype, and your first users.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 mb-16">
          {cards.map((card) => (
            <article
              key={card.title}
              className={`p-6 rounded-2xl border shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all ${card.wrap}`}
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 shadow-sm ${card.iconBox}`}>
                <card.icon className="w-5 h-5" />
              </div>
              <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                {card.title}
              </h3>
              <p className={`text-sm leading-relaxed ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                {card.text}
              </p>
            </article>
          ))}
        </div>

        <div id="wings">
          <div className="mb-8">
            <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
              How we help
            </h3>
            <p className={`text-sm mt-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Four small teams inside E-CELL. Pick the one you need.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {wings.map((wing) => (
              <article
                key={wing.title}
                className={`p-5 rounded-2xl border shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all ${wing.wrap}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                  darkMode ? 'bg-white/10' : 'bg-white/20'
                }`}>
                  <wing.icon className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-white'}`} />
                </div>
                <h4 className={`text-sm font-bold mb-1.5 ${darkMode ? 'text-white' : 'text-white'}`}>
                  {wing.title}
                </h4>
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-zinc-300' : 'text-white/90'}`}>
                  {wing.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
