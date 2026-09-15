import React, { useMemo, useState } from 'react';
import {
  Calendar,
  Camera,
  CheckCircle2,
  ImagePlus,
  LayoutDashboard,
  LogOut,
  Pencil,
  Plus,
  RotateCcw,
  Save,
  Trash2,
  Users,
  X,
} from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { logoutAdmin } from '../lib/auth';
import { galleryBadgeColor, navigateTo, nextId, uploadImageFile } from '../lib/cms';
import { defaultCms } from '../data/defaults';

const TABS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'gallery', label: 'Photos', icon: Camera },
];

const emptyEvent = {
  category: 'Workshops',
  title: '',
  date: '',
  time: '10:00 AM IST',
  venue: '',
  status: 'UPCOMING',
  description: '',
  organizer: 'MRU E-Cell',
  image: '',
};

const emptyMember = {
  name: '',
  role: '',
  wing: '',
  badge: '',
  image: '',
  bio: '',
  linkedin: '',
  github: '',
  email: '',
};

const emptyPhoto = {
  type: 'photo',
  featured: false,
  category: 'Campus',
  eventBadge: 'NEW',
  title: '',
  description: '',
  url: '',
  date: '',
};

export default function Admin() {
  const { cms, setEvents, setTeam, setMentors, setGallery, setAnnouncements, resetCms } = useCms();
  const [tab, setTab] = useState('overview');
  const [eventForm, setEventForm] = useState(null);
  const [memberForm, setMemberForm] = useState(null);
  const [mentorForm, setMentorForm] = useState(null);
  const [photoForm, setPhotoForm] = useState(null);
  const [announcementDraft, setAnnouncementDraft] = useState(cms.announcements.join('\n'));
  const [notice, setNotice] = useState('');

  const flash = (msg) => {
    setNotice(msg);
    setTimeout(() => setNotice(''), 2800);
  };

  const stats = useMemo(
    () => [
      { label: 'Events', value: cms.events.length },
      { label: 'Team members', value: cms.team.length },
      { label: 'Faculty mentors', value: cms.mentors.length },
      { label: 'Gallery photos', value: cms.gallery.length },
    ],
    [cms]
  );

  const onLogout = () => {
    logoutAdmin();
    navigateTo('/');
  };

  const saveAnnouncements = () => {
    const lines = announcementDraft
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
    setAnnouncements(lines);
    flash('Announcements published to the website');
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans">
      <header className="sticky top-0 z-40 bg-[#0b1120] text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] text-blue-300 uppercase">MRU E-Cell</p>
            <h1 className="text-lg font-extrabold">Admin Console</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateTo('/')}
              className="px-3 py-2 text-xs font-semibold rounded-lg border border-white/15 hover:bg-white/10"
            >
              View website
            </button>
            <button
              onClick={onLogout}
              className="px-3 py-2 text-xs font-semibold rounded-lg bg-rose-600 hover:bg-rose-500 flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 grid lg:grid-cols-[220px_1fr] gap-6">
        <aside className="bg-white rounded-2xl border border-slate-200 p-3 h-fit sticky top-24">
          {TABS.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold mb-1 ${
                tab === item.id ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
          <button
            onClick={() => {
              if (confirm('Reset all content to the original sample data?')) {
                resetCms();
                setAnnouncementDraft(defaultCms.announcements.join('\n'));
                flash('Content reset to defaults');
              }
            }}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-500 hover:bg-slate-50 mt-4"
          >
            <RotateCcw className="w-4 h-4" /> Reset content
          </button>
        </aside>

        <main className="space-y-6">
          {notice && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold">
              <CheckCircle2 className="w-4 h-4" /> {notice}
            </div>
          )}

          {tab === 'overview' && (
            <section className="space-y-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((s) => (
                  <div key={s.label} className="bg-white rounded-2xl border border-slate-200 p-5">
                    <p className="text-3xl font-black">{s.value}</p>
                    <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h2 className="text-base font-bold mb-2">Ticker announcements</h2>
                <p className="text-xs text-slate-500 mb-3">One announcement per line. These scroll in the top bar.</p>
                <textarea
                  rows={6}
                  value={announcementDraft}
                  onChange={(e) => setAnnouncementDraft(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm"
                />
                <button
                  onClick={saveAnnouncements}
                  className="mt-3 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" /> Save announcements
                </button>
              </div>
            </section>
          )}

          {tab === 'events' && (
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">Events</h2>
                <button
                  onClick={() => setEventForm({ ...emptyEvent })}
                  className="px-3 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add event
                </button>
              </div>
              {cms.events.map((event) => (
                <article key={event.id} className="bg-white rounded-2xl border border-slate-200 p-4 flex gap-4">
                  {event.image && (
                    <img src={event.image} alt="" className="w-28 h-20 object-cover rounded-xl hidden sm:block" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold text-blue-600 uppercase">{event.category} · {event.status}</p>
                    <h3 className="font-bold">{event.title}</h3>
                    <p className="text-xs text-slate-500">{event.date} · {event.venue}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEventForm({ ...event })} className="p-2 rounded-lg border hover:bg-slate-50">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setEvents(cms.events.filter((e) => e.id !== event.id))}
                      className="p-2 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              ))}
            </section>
          )}

          {tab === 'team' && (
            <section className="space-y-8">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold">Student leadership</h2>
                  <button
                    onClick={() => setMemberForm({ ...emptyMember })}
                    className="px-3 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" /> Add member
                  </button>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {cms.team.map((member) => (
                    <article key={member.id} className="bg-white rounded-2xl border border-slate-200 p-4 flex gap-3">
                      <img src={member.image} alt="" className="w-16 h-16 rounded-xl object-cover bg-slate-100" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-sm">{member.name}</h3>
                        <p className="text-xs text-slate-500">{member.role}</p>
                        <div className="flex gap-2 mt-2">
                          <button onClick={() => setMemberForm({ ...member })} className="text-xs font-semibold text-blue-600">
                            Edit
                          </button>
                          <button
                            onClick={() => setTeam(cms.team.filter((m) => m.id !== member.id))}
                            className="text-xs font-semibold text-rose-600"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold">Faculty mentors</h2>
                  <button
                    onClick={() => setMentorForm({ name: '', role: '', dept: '' })}
                    className="px-3 py-2 border border-slate-300 text-xs font-bold rounded-lg"
                  >
                    Add mentor
                  </button>
                </div>
                <div className="space-y-3">
                  {cms.mentors.map((mentor) => (
                    <article key={mentor.id} className="bg-white rounded-2xl border border-slate-200 p-4 flex justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-sm">{mentor.name}</h3>
                        <p className="text-xs text-blue-600">{mentor.role}</p>
                        <p className="text-xs text-slate-500">{mentor.dept}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setMentorForm({ ...mentor })} className="text-xs font-semibold text-blue-600">
                          Edit
                        </button>
                        <button
                          onClick={() => setMentors(cms.mentors.filter((m) => m.id !== mentor.id))}
                          className="text-xs font-semibold text-rose-600"
                        >
                          Remove
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          )}

          {tab === 'gallery' && (
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">Photo gallery</h2>
                <button
                  onClick={() => setPhotoForm({ ...emptyPhoto })}
                  className="px-3 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg flex items-center gap-1.5"
                >
                  <ImagePlus className="w-4 h-4" /> Upload photo
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {cms.gallery.map((item) => (
                  <article key={item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                    <img src={item.url} alt="" className="h-32 w-full object-cover" />
                    <div className="p-3">
                      <p className="text-xs font-bold line-clamp-2">{item.title}</p>
                      <p className="text-[10px] text-slate-500 mt-1">{item.category}</p>
                      <div className="flex justify-between mt-2">
                        <button onClick={() => setPhotoForm({ ...item })} className="text-[11px] font-semibold text-blue-600">
                          Edit
                        </button>
                        <button
                          onClick={() => setGallery(cms.gallery.filter((g) => g.id !== item.id))}
                          className="text-[11px] font-semibold text-rose-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>

      {eventForm && (
        <Modal title={eventForm.id ? 'Edit event' : 'Add event'} onClose={() => setEventForm(null)}>
          <EventFields form={eventForm} setForm={setEventForm} />
          <ModalActions
            onCancel={() => setEventForm(null)}
            onSave={() => {
              if (!eventForm.title.trim()) return;
              if (eventForm.id) {
                setEvents(cms.events.map((e) => (e.id === eventForm.id ? eventForm : e)));
              } else {
                setEvents([{ ...eventForm, id: nextId(cms.events) }, ...cms.events]);
              }
              setEventForm(null);
              flash('Event published to the website');
            }}
          />
        </Modal>
      )}

      {memberForm && (
        <Modal title={memberForm.id ? 'Edit team member' : 'Add team member'} onClose={() => setMemberForm(null)}>
          <MemberFields form={memberForm} setForm={setMemberForm} />
          <ModalActions
            onCancel={() => setMemberForm(null)}
            onSave={() => {
              if (!memberForm.name.trim()) return;
              if (memberForm.id) {
                setTeam(cms.team.map((m) => (m.id === memberForm.id ? memberForm : m)));
              } else {
                setTeam([{ ...memberForm, id: nextId(cms.team) }, ...cms.team]);
              }
              setMemberForm(null);
              flash('Team member published to the website');
            }}
          />
        </Modal>
      )}

      {mentorForm && (
        <Modal title={mentorForm.id ? 'Edit mentor' : 'Add mentor'} onClose={() => setMentorForm(null)}>
          <label className="block text-xs font-semibold mb-1">Name</label>
          <input className="admin-input mb-3" value={mentorForm.name} onChange={(e) => setMentorForm({ ...mentorForm, name: e.target.value })} />
          <label className="block text-xs font-semibold mb-1">Role</label>
          <input className="admin-input mb-3" value={mentorForm.role} onChange={(e) => setMentorForm({ ...mentorForm, role: e.target.value })} />
          <label className="block text-xs font-semibold mb-1">Department / affiliation</label>
          <input className="admin-input mb-3" value={mentorForm.dept} onChange={(e) => setMentorForm({ ...mentorForm, dept: e.target.value })} />
          <ModalActions
            onCancel={() => setMentorForm(null)}
            onSave={() => {
              if (!mentorForm.name.trim()) return;
              if (mentorForm.id) {
                setMentors(cms.mentors.map((m) => (m.id === mentorForm.id ? mentorForm : m)));
              } else {
                setMentors([...cms.mentors, { ...mentorForm, id: nextId(cms.mentors) }]);
              }
              setMentorForm(null);
              flash('Mentor published to the website');
            }}
          />
        </Modal>
      )}

      {photoForm && (
        <Modal title={photoForm.id ? 'Edit photo' : 'Upload photo'} onClose={() => setPhotoForm(null)}>
          <PhotoFields form={photoForm} setForm={setPhotoForm} />
          <ModalActions
            onCancel={() => setPhotoForm(null)}
            onSave={() => {
              if (!photoForm.url || !photoForm.title.trim()) return;
              const payload = {
                ...photoForm,
                type: 'photo',
                eventBadgeColor: galleryBadgeColor(photoForm.eventBadge),
              };
              if (photoForm.id) {
                setGallery(cms.gallery.map((g) => (g.id === photoForm.id ? payload : g)));
              } else {
                setGallery([{ ...payload, id: nextId(cms.gallery) }, ...cms.gallery]);
              }
              setPhotoForm(null);
              flash('Photo published to the website');
            }}
          />
        </Modal>
      )}
    </div>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-700">
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-lg font-bold mb-4 pr-8">{title}</h3>
        {children}
      </div>
    </div>
  );
}

function ModalActions({ onCancel, onSave }) {
  return (
    <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
      <button onClick={onCancel} className="px-4 py-2 text-xs font-semibold text-slate-500">
        Cancel
      </button>
      <button onClick={onSave} className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg flex items-center gap-1.5">
        <Save className="w-3.5 h-3.5" /> Save
      </button>
    </div>
  );
}

function EventFields({ form, setForm }) {
  return (
    <div className="space-y-3">
      <ImagePicker label="Cover image" value={form.image} onChange={(image) => setForm({ ...form, image })} maxWidth={1200} />
      <input className="admin-input" placeholder="Event title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <div className="grid grid-cols-2 gap-3">
        <input className="admin-input" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
        <input className="admin-input" placeholder="Status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <input className="admin-input" placeholder="Date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
        <input className="admin-input" placeholder="Time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
      </div>
      <input className="admin-input" placeholder="Venue" value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} />
      <input className="admin-input" placeholder="Organizer" value={form.organizer} onChange={(e) => setForm({ ...form, organizer: e.target.value })} />
      <textarea className="admin-input" rows={3} placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
    </div>
  );
}

function MemberFields({ form, setForm }) {
  return (
    <div className="space-y-3">
      <ImagePicker label="Profile photo" value={form.image} onChange={(image) => setForm({ ...form, image })} maxWidth={500} />
      <input className="admin-input" placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input className="admin-input" placeholder="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
      <div className="grid grid-cols-2 gap-3">
        <input className="admin-input" placeholder="Wing" value={form.wing} onChange={(e) => setForm({ ...form, wing: e.target.value })} />
        <input className="admin-input" placeholder="Badge" value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} />
      </div>
      <textarea className="admin-input" rows={3} placeholder="Short bio" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
      <input className="admin-input" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input className="admin-input" placeholder="LinkedIn URL" value={form.linkedin} onChange={(e) => setForm({ ...form, linkedin: e.target.value })} />
    </div>
  );
}

function PhotoFields({ form, setForm }) {
  return (
    <div className="space-y-3">
      <ImagePicker label="Photo" value={form.url} onChange={(url) => setForm({ ...form, url })} maxWidth={1400} />
      <input className="admin-input" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <div className="grid grid-cols-2 gap-3">
        <input className="admin-input" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
        <input className="admin-input" placeholder="Date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
      </div>
      <input className="admin-input" placeholder="Badge (e.g. UPCOMING)" value={form.eventBadge} onChange={(e) => setForm({ ...form, eventBadge: e.target.value })} />
      <textarea className="admin-input" rows={2} placeholder="Caption" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <label className="flex items-center gap-2 text-xs font-semibold">
        <input type="checkbox" checked={!!form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
        Feature in gallery slideshow
      </label>
    </div>
  );
}

function ImagePicker({ label, value, onChange, maxWidth }) {
  const [busy, setBusy] = useState(false);

  const handleFile = async (file) => {
    if (!file) return;
    setBusy(true);
    try {
      const url = await uploadImageFile(file, maxWidth);
      onChange(url);
    } catch (err) {
      alert(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <p className="text-xs font-semibold mb-1">{label}</p>
      {value && <img src={value} alt="" className="w-full h-36 object-cover rounded-xl mb-2 border" />}
      <input
        type="file"
        accept="image/*"
        disabled={busy}
        onChange={(e) => handleFile(e.target.files?.[0])}
        className="block w-full text-xs"
      />
      {busy && <p className="text-[11px] text-slate-500 mt-1">Processing image…</p>}
    </div>
  );
}
