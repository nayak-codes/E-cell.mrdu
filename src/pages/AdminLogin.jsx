import React, { useState } from 'react';
import { Building2, Lock } from 'lucide-react';
import { loginAdmin } from '../lib/auth';
import { navigateTo } from '../lib/cms';

export default function AdminLogin({ onSuccess }) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginAdmin(username, password)) {
      onSuccess();
      return;
    }
    setError('Invalid username or password.');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-xl p-8">
        <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-4">
          <Building2 className="w-6 h-6" />
        </div>
        <p className="text-[11px] font-bold tracking-[0.18em] text-blue-700 uppercase">Malla Reddy Deemed to be University</p>
        <h1 className="text-2xl font-extrabold mt-1">E-Cell Admin</h1>
        <p className="text-sm text-slate-500 mt-1 mb-6">Sign in to update events, team members, and photos.</p>

        {error && <p className="mb-4 text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-xl px-3 py-2">{error}</p>}

        <label className="block text-xs font-semibold mb-1">Username</label>
        <input
          className="admin-input mb-3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />
        <label className="block text-xs font-semibold mb-1">Password</label>
        <input
          type="password"
          className="admin-input mb-5"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <button type="submit" className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2">
          <Lock className="w-4 h-4" /> Sign in
        </button>
        <button type="button" onClick={() => navigateTo('/')} className="w-full mt-3 text-xs font-semibold text-slate-500">
          Back to website
        </button>
      </form>
    </div>
  );
}
