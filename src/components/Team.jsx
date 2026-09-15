import React from 'react';
import { Users, Linkedin, Github, Mail, Award } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export default function Team({ darkMode }) {
  const { cms } = useCms();
  const leadership = cms.team || [];
  const mentors = cms.mentors || [];

  return (
    <section id="team" className={`section-anchor py-20 relative transition-colors ${
      darkMode ? 'bg-[#0b1120]' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest ${
            darkMode ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400' : 'bg-blue-50 border border-blue-200 text-blue-700'
          }`}>
            <Users className="w-3.5 h-3.5" /> Governance & Leadership
          </div>
          <h2 className={`text-2xl sm:text-4xl font-extrabold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Student Leadership & <span className={darkMode ? 'text-gradient-dark' : 'text-gradient-light'}>Faculty Mentors</span>
          </h2>
          <p className={`text-xs sm:text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Appointed student wing heads and faculty advisors steering the Entrepreneurship Cell at Malla Reddy Deemed to be University.
          </p>
        </div>

        {/* Student Leadership Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {leadership.map((member) => (
            <div
              key={member.id}
              className={`rounded-2xl p-5 border flex flex-col justify-between transition-all ${
                darkMode ? 'pro-card-dark' : 'pro-card-light'
              }`}
            >
              <div className="space-y-3">
                <div className={`w-20 h-20 mx-auto rounded-xl overflow-hidden border ${
                  darkMode ? 'border-white/10 bg-slate-800' : 'border-slate-200 bg-slate-100'
                }`}>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="text-center">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    darkMode ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400' : 'bg-blue-50 border border-blue-200 text-blue-700'
                  }`}>
                    {member.badge}
                  </span>
                  <h3 className={`text-base font-bold mt-1.5 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {member.name}
                  </h3>
                  <p className={`text-[11px] font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{member.role}</p>
                </div>

                <p className={`text-[11px] text-center leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {member.bio}
                </p>
              </div>

              <div className={`pt-3 mt-3 border-t flex items-center justify-center gap-2 ${
                darkMode ? 'border-white/10 text-slate-400' : 'border-slate-200 text-slate-500'
              }`}>
                {(member.linkedin || member.github || member.email) ? (
                  <>
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noreferrer" className="p-1.5 rounded-lg hover:text-blue-600 transition-colors">
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.github && (
                      <a href={member.github} target="_blank" rel="noreferrer" className="p-1.5 rounded-lg hover:text-blue-600 transition-colors">
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.email && (
                      <a href={`mailto:${member.email}`} className="p-1.5 rounded-lg hover:text-blue-600 transition-colors">
                        <Mail className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </>
                ) : (
                  <span className="text-[10px]">{member.wing}</span>
                )}
              </div>

            </div>
          ))}
        </div>

        {/* Faculty Advisory Row */}
        <div className={`p-6 rounded-2xl border ${
          darkMode ? 'pro-card-dark' : 'pro-card-light'
        }`}>
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <div>
              <h3 className={`text-base font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Faculty Advisory Board & University Mentors
              </h3>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Providing institutional oversight, policy guidelines, and patent grant approvals.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {mentors.map((m) => (
              <div key={m.id} className={`p-4 rounded-xl border ${
                darkMode ? 'bg-white/[0.02] border-white/5' : 'bg-slate-50 border-slate-200'
              }`}>
                <h4 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{m.name}</h4>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-0.5">{m.role}</p>
                <p className={`text-[11px] mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{m.dept}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
