import React from 'react';
import { Layout, Smartphone, Cloud, Database } from 'lucide-react';

export const Services: React.FC = () => {
  const services = [
    {
      icon: Layout,
      title: 'Frontend Engineering',
      description: 'Building blazing-fast web portals with React.js, Tailwind CSS, TypeScript, and Vite. Translating complex Figma designs into responsive component systems.',
      tech: 'React.js • Tailwind CSS • Vite',
    },
    {
      icon: Smartphone,
      title: 'Mobile App Development',
      description: 'Developing high-performance cross-platform mobile apps for iOS & Android with React Native. Focused on smooth gestures, modular screens, and 60 FPS performance.',
      tech: 'React Native • TypeScript • Mobile UI',
    },
    {
      icon: Cloud,
      title: 'ServiceNow Administration',
      description: 'Certified ServiceNow CSA administrator with hands-on understanding of enterprise IT service workflows, catalog items, business rules, and UI policies.',
      tech: 'ServiceNow CSA • Workflows • ITIL',
    },
    {
      icon: Database,
      title: 'Full-Stack & APIs',
      description: 'Designing clean RESTful APIs with Python Flask, Django, and SQLite databases. Leveraging modern AI engineering workflows for rapid delivery and verification.',
      tech: 'Python • Flask • SQL • AI Tools',
    },
  ];

  return (
    <section id="services" className="px-6 sm:px-10 lg:px-16 py-20 border-b border-zinc-800/60">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-orange-500 font-bold text-xs uppercase tracking-widest font-mono">
            Core Competencies
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Specialized Engineering Services
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Delivering production-grade software solutions with clean code fidelity, responsive layouts, and modern architecture.
          </p>
        </div>

        {/* 4 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="figma-card flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-zinc-400 text-xs leading-relaxed mb-6">{s.description}</p>
                </div>
                <div className="text-xs font-mono text-orange-500 font-semibold pt-4 border-t border-zinc-800/80">
                  {s.tech}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
