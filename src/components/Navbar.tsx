import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sun, Moon, Share2, FileText, Menu, X } from 'lucide-react';
import { playSfx } from '../utils/sound';

interface NavbarProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  isDarkTheme: boolean;
  onToggleTheme: () => void;
  onOpenResume: () => void;
  onShare: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  soundEnabled,
  onToggleSound,
  isDarkTheme,
  onToggleTheme,
  onOpenResume,
  onShare,
}) => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'about', 'portfolio', 'sandbox', 'terminal', 'faq', 'contact'];
      const scrollPos = window.scrollY + 180;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About Me' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'sandbox', label: 'UI Sandbox' },
    { id: 'terminal', label: 'Console' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    playSfx('click');
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0d0d0e]/80 dark:bg-[#0d0d0e]/80 backdrop-blur-md border-b border-zinc-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a 
          href="#home" 
          onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center font-black text-lg text-white shadow-lg shadow-orange-500/30 group-hover:scale-105 transition-transform">
            LC
          </div>
          <div>
            <span className="font-bold text-base tracking-tight text-white block">
              Lakshmi<span className="text-orange-500">.dev</span>
            </span>
            <span className="text-[10px] font-mono text-zinc-400 block -mt-1 tracking-wider uppercase">
              Frontend &amp; Mobile
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 bg-zinc-900/60 p-1.5 rounded-full border border-zinc-800/80">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeSection === link.id
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Sound Toggle */}
          <button
            onClick={() => { playSfx('click'); onToggleSound(); }}
            className="p-2.5 rounded-xl bg-zinc-800/60 hover:bg-zinc-700/80 border border-zinc-700/60 text-zinc-300 hover:text-orange-400 transition"
            title={soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-orange-400" /> : <VolumeX className="w-4 h-4 text-zinc-500" />}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => { playSfx('click'); onToggleTheme(); }}
            className="p-2.5 rounded-xl bg-zinc-800/60 hover:bg-zinc-700/80 border border-zinc-700/60 text-zinc-300 hover:text-orange-400 transition"
            title={isDarkTheme ? 'Switch to Bright Mode' : 'Switch to Dark Mode'}
          >
            {isDarkTheme ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>

          {/* Share Button */}
          <button
            onClick={() => { playSfx('click'); onShare(); }}
            className="p-2.5 rounded-xl bg-zinc-800/60 hover:bg-zinc-700/80 border border-zinc-700/60 text-zinc-300 hover:text-orange-400 transition hidden sm:flex"
            title="Share Portfolio"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Download CV Modal Trigger */}
          <button
            onClick={() => { playSfx('click'); onOpenResume(); }}
            className="btn-orange text-xs py-2 px-4 hidden sm:flex"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-zinc-950/95 border-b border-zinc-800 px-6 py-5 space-y-3">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="block w-full text-left py-2 text-sm font-medium text-zinc-300 hover:text-orange-500 border-b border-zinc-800/40"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 flex gap-2">
            <button
              onClick={() => { onOpenResume(); setMobileMenuOpen(false); }}
              className="btn-orange text-xs py-2 w-full justify-center"
            >
              View Official Resume
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
