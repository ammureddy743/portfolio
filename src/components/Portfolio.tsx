import React, { useState } from 'react';
import { Project } from '../types';
import { Maximize2, Smartphone, Activity, Languages } from 'lucide-react';
import { playSfx } from '../utils/sound';

interface PortfolioProps {
  onOpenProject: (project: Project) => void;
}

export const portfolioProjects: Project[] = [
  {
    id: 'team-connect-web',
    category: 'web',
    badge: 'The Team C',
    tag: 'Flagship Web Application',
    title: 'Team Connect Website',
    description: 'Contributed to frontend development for the Team Connect web application. Engineered responsive interfaces, reusable UI component hierarchies, and layout improvements with React.js, Tailwind CSS, and Vite.',
    technologies: ['React.js', 'Tailwind CSS', 'Vite', 'Responsive Layouts'],
    metrics: [
      { label: 'Bundle Optimization', val: '< 150ms load' },
      { label: 'Component Reusability', val: '40+ Modular Blocks' },
      { label: 'Screen Support', val: 'Mobile to 4K Ultrawide' }
    ],
    highlights: [
      'Built dynamic dashboard views with React functional components and custom hooks.',
      'Structured modular utility classes with Tailwind CSS ensuring clean design consistency.',
      'Implemented fast hot-module replacement and bundle building with Vite.',
      'Collaborated in Agile sprints, reviewing pull requests and optimizing performance.'
    ],
    buttonText: 'Interactive Deep Dive',
  },
  {
    id: 'team-connect-mobile',
    category: 'mobile',
    badge: 'The Team C',
    tag: 'Cross-Platform Native App',
    title: 'Team Connect Mobile',
    description: 'Contributed to mobile application UI development for iOS & Android using React Native and TypeScript. Built gesture-friendly components, modular screens, and optimized mobile usability.',
    technologies: ['React Native', 'TypeScript', 'Mobile Gestures', 'Cross-Platform'],
    metrics: [
      { label: 'Platforms', val: 'iOS & Android' },
      { label: 'Type Safety', val: '100% TypeScript' },
      { label: 'UI Frame Rate', val: '60 FPS Smooth' }
    ],
    highlights: [
      'Developed touch-optimized navigation, modal bottom-sheets, and fluid tab bars.',
      'Leveraged TypeScript interfaces for strict type validation across props and API payloads.',
      'Optimized list rendering using FlatList performance best practices to eliminate frame drops.',
      'Fine-tuned layouts across varying device viewports and safe areas.'
    ],
    buttonText: 'Mobile Simulator',
  },
  {
    id: 'fittrack-platform',
    category: 'fullstack',
    badge: 'Full-Stack App',
    tag: 'Full-Stack Fitness Ecosystem',
    title: 'FitTrack Health Platform',
    description: 'An interactive workout tracking and fitness analytics platform powered by a Python Flask REST backend, SQLite storage, and a modular React frontend.',
    technologies: ['Python', 'Flask', 'React.js', 'REST APIs'],
    metrics: [
      { label: 'Backend API', val: 'Python Flask REST' },
      { label: 'Database', val: 'SQLite / ORM' },
      { label: 'Frontend', val: 'React Component Hierarchy' }
    ],
    highlights: [
      'Architected clean RESTful endpoints in Flask to handle user fitness profiles and workout logs.',
      'Designed modular React dashboard with visual statistics and goal tracking.',
      'Created interactive calorie and body-mass calculator widget.'
    ],
    buttonText: 'Try Hydration Calculator',
  },
  {
    id: 'qtrans-translation',
    category: 'fullstack',
    badge: 'NLP Engine',
    tag: 'Academic Translation Tool',
    title: 'QTrans Question Translator',
    description: 'Translates institutional examination question papers into multiple regional languages using Python, Django, SQLite, and NLP translation engines while preserving academic formatting.',
    technologies: ['Python', 'Django', 'SQLite', 'NLP Libraries'],
    metrics: [
      { label: 'Language Engines', val: 'Regional & International' },
      { label: 'Backend Platform', val: 'Python Django' },
      { label: 'Database', val: 'SQLite' }
    ],
    highlights: [
      'Engineered dynamic text parsing algorithms preserving formulas and numbering schemes.',
      'Integrated translation libraries with fallback error-handling for uninterrupted processing.',
      'Designed intuitive faculty upload portal with instant preview before export.'
    ],
    buttonText: 'Test Live Translator',
  },
];

export const Portfolio: React.FC<PortfolioProps> = ({ onOpenProject }) => {
  const [filter, setFilter] = useState<'all' | 'web' | 'mobile' | 'fullstack'>('all');

  const filteredProjects = portfolioProjects.filter(
    (p) => filter === 'all' || p.category === filter
  );

  const getIcon = (id: string) => {
    switch (id) {
      case 'team-connect-web':
        return <Maximize2 className="w-3.5 h-3.5" />;
      case 'team-connect-mobile':
        return <Smartphone className="w-3.5 h-3.5" />;
      case 'fittrack-platform':
        return <Activity className="w-3.5 h-3.5" />;
      case 'qtrans-translation':
        return <Languages className="w-3.5 h-3.5" />;
      default:
        return <Maximize2 className="w-3.5 h-3.5" />;
    }
  };

  return (
    <section id="portfolio" className="px-6 sm:px-10 lg:px-16 py-20 border-b border-zinc-800/60">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-orange-500 font-bold text-xs uppercase tracking-widest font-mono">
            Recent Work
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Portfolio Showcase</h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Selected production deliverables and full-stack software applications. Click any card to launch interactive preview simulator.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {(['all', 'web', 'mobile', 'fullstack'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => { playSfx('click'); setFilter(cat); }}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                filter === cat
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
              }`}
            >
              {cat === 'all' ? 'All Deliverables' : cat === 'web' ? 'Web Platforms' : cat === 'mobile' ? 'Mobile Apps' : 'Full-Stack Apps'}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="figma-card space-y-5 flex flex-col justify-between">
              
              <div className="space-y-4">
                {/* Header Dots & Badge */}
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span className="text-xs font-mono text-zinc-400 ml-2">{project.id}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-orange-500/10 text-orange-400 text-xs font-bold">
                    {project.badge}
                  </span>
                </div>

                {/* Title & Tag */}
                <div>
                  <span className="text-xs font-mono text-orange-500 font-semibold uppercase">
                    {project.tag}
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-1">{project.title}</h3>
                </div>

                {/* Description */}
                <p className="text-zinc-400 text-sm leading-relaxed">{project.description}</p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2 text-xs">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="info-badge">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                <button
                  onClick={() => { playSfx('click'); onOpenProject(project); }}
                  className="btn-orange text-xs py-2 px-4"
                >
                  {getIcon(project.id)}
                  <span>{project.buttonText}</span>
                </button>
                <span className="text-xs font-mono text-zinc-500">
                  {project.category === 'mobile' ? 'iOS & Android' : 'Production'}
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
