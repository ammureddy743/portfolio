import React from 'react';

export const About: React.FC = () => {
  const skills = [
    { name: 'React.js, JavaScript (ES6+) & Vite', percent: 92 },
    { name: 'React Native & TypeScript (Mobile)', percent: 88 },
    { name: 'Tailwind CSS & Responsive Layouts', percent: 95 },
    { name: 'ServiceNow Certified Administration (CSA)', percent: 90 },
    { name: 'Python, Flask & SQL Database Foundations', percent: 85 },
  ];

  return (
    <section id="about" className="px-6 sm:px-10 lg:px-16 py-20 border-b border-zinc-800/60">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left: About Visual / Credential Card (5 cols) */}
        <div className="lg:col-span-5">
          <div className="figma-card space-y-6 relative overflow-hidden">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-orange-500 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-orange-500/30">
                LC
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Lakshmi Chandrakala</h3>
                <p className="text-xs text-orange-500 font-mono font-medium">Frontend &amp; Mobile Engineer</p>
              </div>
            </div>

            <div className="info-card-box space-y-2.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="info-label">Education:</span>
                <span className="info-val font-medium">B.Tech in CSE (2022–2026)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="info-label">College:</span>
                <span className="info-val font-medium">Sree Vahini Inst. of Sci. &amp; Tech.</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="info-label">CGPA:</span>
                <span className="info-val-accent font-bold font-mono text-orange-500">7.59 / 10</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="info-label">Location:</span>
                <span className="info-val">Hyderabad, Telangana</span>
              </div>
            </div>

            <div className="space-y-2.5">
              <span className="text-xs font-mono text-zinc-400 block uppercase font-semibold tracking-wider">
                Industry Credentials
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="info-badge info-badge-orange">ServiceNow CSA</span>
                <span className="info-badge">HackerRank Python</span>
                <span className="info-badge">SQL Intermediate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Story & Progress Bars (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="text-orange-500 font-bold text-xs uppercase tracking-widest font-mono">
              About Me
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Crafting Clean Code &amp; Intuitive Digital Experiences
            </h2>
          </div>

          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            With <strong className="text-white">7 months of active production experience</strong> at{' '}
            <span className="text-orange-500 font-semibold">The Team C</span>, I specialize in engineering
            responsive user interfaces for both web portals and cross-platform mobile apps. I merge strong design
            fidelity with high performance, strict typing, and AI-accelerated workflows.
          </p>

          {/* Skill Bars */}
          <div className="space-y-4 pt-2">
            {skills.map((skill, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-white">{skill.name}</span>
                  <span className="text-orange-500 font-mono">{skill.percent}%</span>
                </div>
                <div className="skill-bar-container">
                  <div className="skill-bar-fill" style={{ width: `${skill.percent}%` }}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Chat on WhatsApp CTA */}
          <div className="pt-2">
            <a
              href="https://wa.me/918919008619"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-orange text-xs inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4 flex-shrink-0 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.394-10.416c-5.523 0-10 4.477-10 10 0 1.769.459 3.432 1.263 4.885l-1.341 4.9 5.02-1.316c1.403.766 3.007 1.198 4.714 1.198 5.523 0 10-4.477 10-10s-4.477-10-10-10z" />
              </svg>
              <span>Quick Chat on WhatsApp (+91 8919008619)</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};

