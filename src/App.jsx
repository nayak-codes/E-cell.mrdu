import React, { useEffect, useState } from 'react';
import { CmsProvider } from './context/CmsContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Events from './components/Events';
import Gallery from './components/Gallery';
import Startups from './components/Startups';
import PitchModal from './components/PitchModal';
import Team from './components/Team';
import Contact from './components/Contact';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import { isAdminLoggedIn } from './lib/auth';

// Error boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.error('React Error:', error);
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Error details:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', textAlign: 'center', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div>
            <h1>Something went wrong</h1>
            <p>Check browser console for details</p>
            <pre style={{ textAlign: 'left', background: '#f0f0f0', padding: '10px', overflowX: 'auto' }}>
              Open DevTools (F12) to see errors
            </pre>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function currentPath() {
  return window.location.pathname.replace(/\/+$/, '') || '/';
}

function Home({ darkMode, setDarkMode }) {
  const [pitchModalOpen, setPitchModalOpen] = useState(false);

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${
      darkMode ? 'bg-zinc-950 text-zinc-100' : 'bg-white text-zinc-900'
    }`}>
      <Navbar
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode(!darkMode)}
        onOpenPitchModal={() => setPitchModalOpen(true)}
      />
      <main>
        <Hero darkMode={darkMode} onOpenPitchModal={() => setPitchModalOpen(true)} />
        <About darkMode={darkMode} />
        <Events darkMode={darkMode} />
        <Gallery darkMode={darkMode} />
        <Startups darkMode={darkMode} />
        <Team darkMode={darkMode} />
        <Contact darkMode={darkMode} />
      </main>
      <PitchModal
        darkMode={darkMode}
        isOpen={pitchModalOpen}
        onClose={() => setPitchModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  const [path, setPath] = useState(currentPath);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('mru-theme') === 'dark');
  const [authed, setAuthed] = useState(() => isAdminLoggedIn());

  useEffect(() => {
    const onPop = () => setPath(currentPath());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    if (path === '/admin') setAuthed(isAdminLoggedIn());
  }, [path]);

  useEffect(() => {
    localStorage.setItem('mru-theme', darkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const isAdmin = path === '/admin';

  return (
    <ErrorBoundary>
      <CmsProvider>
        {isAdmin ? (
          authed ? (
            <Admin />
          ) : (
            <AdminLogin onSuccess={() => setAuthed(true)} />
          )
        ) : (
          <Home darkMode={darkMode} setDarkMode={setDarkMode} />
        )}
      </CmsProvider>
    </ErrorBoundary>
  );
}
