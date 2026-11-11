import React, { useState, useEffect } from 'react';
import { Project } from './types';
import { HeroCanvas } from './components/HeroCanvas';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { About } from './components/About';
import { Portfolio } from './components/Portfolio';
import { Sandbox } from './components/Sandbox';
import { Terminal } from './components/Terminal';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { setSoundEnabled, getSoundEnabled } from './utils/sound';

export const App: React.FC = () => {
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [resumeModalOpen, setResumeModalOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('lk_theme') || 'dark';
    const isDark = savedTheme === 'dark';
    setIsDarkTheme(isDark);
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.classList.toggle('light', !isDark);
  }, []);

  const handleToggleTheme = () => {
    const nextDark = !isDarkTheme;
    setIsDarkTheme(nextDark);
    const themeName = nextDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', themeName);
    document.documentElement.classList.toggle('dark', nextDark);
    document.documentElement.classList.toggle('light', !nextDark);
    localStorage.setItem('lk_theme', themeName);
    showToast(`Switched to ${nextDark ? 'Matte Dark' : 'Bright / Light'} mode`, 'info');
  };

  const handleToggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    showToast(`Sound FX ${next ? 'enabled' : 'muted'}`, 'info');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Portfolio link copied to clipboard!', 'success');
  };

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((curr) => (curr?.message === message ? null : curr));
    }, 3200);
  };

  return (
    <div className="relative min-h-screen bg-brand-bg text-white selection:bg-orange-500 selection:text-white">
      
      {/* Background Ambient Mesh Orbs */}
      <div className="bg-mesh-container">
        <div className="bg-mesh bg-mesh-orange"></div>
        <div className="bg-mesh bg-mesh-amber"></div>
      </div>

      {/* Hero Constellation Physics Canvas */}
      <div className="absolute top-0 left-0 right-0 h-[100vh] pointer-events-none z-0 overflow-hidden">
        <HeroCanvas />
      </div>

      {/* Main Navbar */}
      <Navbar
        soundEnabled={soundOn}
        onToggleSound={handleToggleSound}
        isDarkTheme={isDarkTheme}
        onToggleTheme={handleToggleTheme}
        onOpenResume={() => setResumeModalOpen(true)}
        onShare={handleShare}
      />

      {/* Page Content */}
      <main className="relative z-10">
        <Hero
          onOpenResume={() => setResumeModalOpen(true)}
          onContactClick={() => {
            const el = document.getElementById('contact');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />
        <Services />
        <About />
        <Portfolio onOpenProject={(proj) => setSelectedProject(proj)} />
        <Sandbox />
        <Terminal />
        <FAQ />
        <Contact onNotify={showToast} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Project Simulator Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Resume Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />

      {/* Toast Notification Container */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div
            className={`px-4 py-3 rounded-2xl shadow-2xl text-xs font-semibold flex items-center gap-2 border ${
              toast.type === 'success'
                ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/40'
                : toast.type === 'error'
                ? 'bg-rose-950/90 text-rose-300 border-rose-500/40'
                : 'bg-zinc-900/90 text-zinc-200 border-zinc-700'
            }`}
          >
            <span>{toast.message}</span>
          </div>
        </div>
      )}

    </div>
  );
};
