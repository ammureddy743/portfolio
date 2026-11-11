import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Mail, Code2, Award, Sparkles, Camera } from 'lucide-react';
import { playSfx } from '../utils/sound';

interface HeroProps {
  onOpenResume: () => void;
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume, onContactClick }) => {
  const [typedTitle, setTypedTitle] = useState('');
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Typing effect
  useEffect(() => {
    const titles = [
      'Frontend Developer',
      'React Native Engineer',
      'The Team C Software Engineer',
      'ServiceNow Certified Admin (CSA)',
      'UI/UX Architecture Specialist',
    ];
    let titleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = titles[titleIdx];
      if (isDeleting) {
        setTypedTitle(current.substring(0, charIdx - 1));
        charIdx--;
      } else {
        setTypedTitle(current.substring(0, charIdx + 1));
        charIdx++;
      }

      let speed = isDeleting ? 40 : 80;

      if (!isDeleting && charIdx === current.length) {
        speed = 1800;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        titleIdx = (titleIdx + 1) % titles.length;
        speed = 400;
      }

      timer = setTimeout(tick, speed);
    };

    timer = setTimeout(tick, 300);
    return () => clearTimeout(timer);
  }, []);

  // Load custom photo if saved
  useEffect(() => {
    const saved = localStorage.getItem('lk_avatar_img');
    if (saved) {
      setPhotoUrl(saved);
    }
  }, []);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setPhotoUrl(result);
        localStorage.setItem('lk_avatar_img', result);
        playSfx('success');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center pt-24 pb-16 px-6 sm:px-10 lg:px-16 border-b border-zinc-800/60 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Story & CTAs (7 cols) */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono font-bold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
            <span>AVAILABLE FOR PRODUCTION ROLES</span>
          </div>

          {/* Main Title */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              I'm <span className="text-orange-500">Lakshmi Chandrakala</span>,
              <br />
              <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-300 font-mono">
                &gt; {typedTitle}
                <span className="animate-ping inline-block w-2 h-6 bg-orange-500 ml-1"></span>
              </span>
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed">
              Frontend &amp; Mobile Engineer with <strong className="text-white">7 months active production experience</strong> at <span className="text-orange-500 font-semibold">The Team C</span>. Specialized in crafting high-performance React.js web interfaces, cross-platform React Native apps, and certified ServiceNow administration.
            </p>
          </div>

          {/* 5 Circular Social & Profile Buttons (Figma Layout) */}
          <div className="flex items-center gap-3 pt-1">
            {/* Circle 1: LinkedIn */}
            <a 
              href="https://linkedin.com/in/lakshmi-chandrakala-gurrala-710909255" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon-btn group"
              title="LinkedIn Profile"
              onClick={() => playSfx('click')}
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-label="LinkedIn">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 0 0 1.54-1.53c0-.85-.69-1.54-1.54-1.54a1.54 1.54 0 0 0-1.53 1.54c0 .84.69 1.53 1.53 1.53m1.4 9.74v-8.37H5.06v8.37z" />
              </svg>
            </a>

            {/* Circle 2: GitHub */}
            <a 
              href="https://github.com/ammureddy743" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon-btn group"
              title="GitHub Repositories"
              onClick={() => playSfx('click')}
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-label="GitHub">
                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
              </svg>
            </a>

            {/* Circle 3: LeetCode */}
            <a 
              href="https://leetcode.com/u/X2UeLl2I3Y/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon-btn group"
              title="LeetCode Profile"
              onClick={() => playSfx('click')}
            >
              <Code2 className="w-5 h-5" />
            </a>

            {/* Circle 4: HackerRank */}
            <a 
              href="https://hackerrank.com/profile/gurralaammureddy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon-btn group"
              title="HackerRank Profile"
              onClick={() => playSfx('click')}
            >
              <Award className="w-5 h-5" />
            </a>

            {/* Circle 5: Direct Mail */}
            <button 
              onClick={() => { playSfx('click'); onContactClick(); }}
              className="social-icon-btn group"
              title="Direct Email / Contact"
            >
              <Mail className="w-5 h-5" />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a 
              href="#portfolio" 
              onClick={() => playSfx('click')}
              className="btn-orange text-sm"
            >
              <span>Explore My Work</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button 
              onClick={() => { playSfx('click'); onContactClick(); }}
              className="btn-outline text-sm"
            >
              <Mail className="w-4 h-4" />
              <span>Let's Talk</span>
            </button>

            <button 
              onClick={() => { playSfx('click'); onOpenResume(); }}
              className="btn-outline text-sm"
            >
              <span>View Resume</span>
            </button>
          </div>

        </div>

        {/* Right Column: Avatar & Floating Badges (5 cols) */}
        <div className="lg:col-span-5 flex justify-center relative">
          
          <div className="relative w-72 sm:w-80 md:w-96 aspect-square rounded-3xl bg-gradient-to-tr from-orange-500/20 via-zinc-900 to-zinc-950 p-2 border border-zinc-800 shadow-2xl group">
            
            {/* The Avatar Image */}
            <div className="w-full h-full rounded-[1.4rem] overflow-hidden bg-zinc-900 relative flex items-center justify-center">
              <img 
                src={photoUrl || 'assets/developer-portrait.svg'} 
                alt="Lakshmi Chandrakala Reddy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Upload Photo Overlay on Hover */}
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer gap-2 text-white"
              >
                <Camera className="w-7 h-7 text-orange-400" />
                <span className="text-xs font-semibold">Click to upload your photo</span>
              </div>
              <input 
                ref={fileInputRef} 
                type="file" 
                accept="image/*" 
                onChange={handlePhotoUpload} 
                className="hidden" 
              />
            </div>

            {/* Floating Metric 1 */}
            <div className="absolute -bottom-5 -left-5 bg-zinc-900/95 border border-zinc-700/80 p-3.5 rounded-2xl shadow-xl flex items-center gap-3 backdrop-blur-md">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-white font-bold text-sm block">7 Months</span>
                <span className="text-[11px] text-zinc-400 font-mono">The Team C Production</span>
              </div>
            </div>

            {/* Floating Metric 2 */}
            <div className="absolute -top-4 -right-4 bg-zinc-900/95 border border-zinc-700/80 p-3.5 rounded-2xl shadow-xl flex items-center gap-3 backdrop-blur-md">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-white font-bold text-sm block">ServiceNow CSA</span>
                <span className="text-[11px] text-zinc-400 font-mono">Certified Administrator</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
