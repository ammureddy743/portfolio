import React from 'react';
import { ArrowUp } from 'lucide-react';
import { playSfx } from '../utils/sound';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    playSfx('click');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="px-6 sm:px-10 lg:px-16 py-12 border-t border-zinc-800 bg-zinc-950 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Left */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center font-black text-sm text-white">
            LC
          </div>
          <div>
            <span className="text-white font-bold block">Gurrala Lakshmi Chandrakala Reddy</span>
            <span className="text-[11px] text-zinc-500 font-mono">
              Engineered with React.js, TypeScript &amp; Tailwind CSS
            </span>
          </div>
        </div>

        {/* Center */}
        <div className="text-center sm:text-left text-zinc-500 text-[11px] font-mono">
          © {new Date().getFullYear()} Lakshmi Chandrakala. All rights reserved.
        </div>

        {/* Right: Back to Top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 p-2 px-3 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-orange-500 hover:text-white transition"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-3.5 h-3.5 text-orange-500" />
        </button>

      </div>
    </footer>
  );
};

