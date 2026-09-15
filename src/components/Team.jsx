import React from 'react';
import { Linkedin, Github, Mail } from 'lucide-react';
import { useCms } from '../context/CmsContext';

const accents = [
  'from-indigo-500 to-violet-500',
  'from-violet-500 to-fuchsia-500',
  'from-sky-500 to-indigo-500',
  'from-emerald-500 to-teal-500',
];

export default function Team({ darkMode }) {
  const { cms } = useCms();
  const leadership = cms.team || [];
  const mentors = cms.mentors || [];

  return (
    <section
      id="team"
      className={`section-anchor py-20 overflow-hidden ${darkMode ? 'bg-zinc-950' : 'bg-white'}`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="max-w-2xl mb-12 team-fade">
          <p className="text-xs font-semibold tracking-widest uppercase text-indigo-600 mb-3">The team</p>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
            People who run <span className={darkMode ? 'text-gradient-dark' : 'text-gradient-light'}>E-CELL</span>
          </h2>
          <p className={`mt-4 text-base leading-relaxed ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Student leads who organise events and a small faculty group that guides the club.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {leadership.map((member, idx) => (
            <article
              key={member.id}
              className={`team-card group rounded-2xl overflow-hidden border shadow-sm ${
                darkMode ? 'bg-zinc-900 border-white/10' : 'bg-white border-zinc-200'
              }`}
              style={{ animationDelay: `${idx * 90}ms` }}
            >
              <div className="relative h-52 overflow-hidden">
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accents[idx % accents.length]} z-10`} />
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/10 to-transparent opacity-80" />
                <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide bg-white/15 text-white backdrop-blur-sm">
                  {member.badge || member.wing || 'Lead'}
                </span>
              </div>

              <div className="p-5">
                <h3 className={`text-base font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                  {member.name}
                </h3>
                <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-300 mt-0.5">
                  {member.role}
                </p>
                <p className={`text-sm leading-relaxed mt-2.5 min-h-[3.2rem] ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  {member.bio}
                </p>

                <div className="mt-4 flex items-center gap-2">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className={`p-2 rounded-lg transition-all duration-300 hover:-translate-y-0.5 ${
                        darkMode ? 'bg-white/5 text-zinc-300 hover:text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-indigo-600 hover:text-white'
                      }`}
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noreferrer"
                      className={`p-2 rounded-lg transition-all duration-300 hover:-translate-y-0.5 ${
                        darkMode ? 'bg-white/5 text-zinc-300 hover:text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-900 hover:text-white'
                      }`}
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className={`p-2 rounded-lg transition-all duration-300 hover:-translate-y-0.5 ${
                        darkMode ? 'bg-white/5 text-zinc-300 hover:text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-indigo-600 hover:text-white'
                      }`}
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {!member.linkedin && !member.github && !member.email && (
                    <span className={`text-[11px] ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>{member.wing}</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div>
          <h3 className={`text-lg font-bold mb-1 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Faculty mentors</h3>
          <p className={`text-sm mb-6 ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
            Faculty who advise the club on programs and student ventures.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {mentors.map((m, idx) => (
              <article
                key={m.id}
                className={`team-card p-5 rounded-2xl border flex gap-4 items-start ${
                  darkMode ? 'bg-zinc-900 border-white/10' : 'bg-zinc-50 border-zinc-200'
                }`}
                style={{ animationDelay: `${280 + idx * 90}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl shrink-0 bg-gradient-to-br ${accents[idx % accents.length]} text-white flex items-center justify-center font-bold text-sm shadow-sm`}>
                  {(m.name || 'M').split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('')}
                </div>
                <div>
                  <h4 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{m.name}</h4>
                  <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-300 mt-0.5">{m.role}</p>
                  <p className={`text-xs mt-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>{m.dept}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
