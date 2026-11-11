import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { playSfx } from '../utils/sound';

interface HistoryItem {
  cmd: string;
  output: string | React.ReactNode;
}

export const Terminal: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      cmd: '',
      output: (
        <div className="text-zinc-400 text-xs leading-relaxed">
          Welcome to <span className="text-orange-500 font-bold">Lakshmi Chandrakala's</span> developer console.<br />
          Type <span className="text-orange-400 font-bold underline cursor-pointer" onClick={() => runCmd('help')}>'help'</span> or click any chip above.
        </div>
      ),
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const terminalBodyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const commands: Record<string, () => React.ReactNode> = {
    help: () => (
      <div className="space-y-2 text-xs">
        <div className="text-indigo-400 font-semibold mb-1">AVAILABLE COMMANDS:</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 text-slate-300">
          <div><span className="text-cyan-400 font-bold">about</span> - Read bio and background</div>
          <div><span className="text-cyan-400 font-bold">skills</span> - Technical stack matrix</div>
          <div><span className="text-cyan-400 font-bold">projects</span> - Featured projects overview</div>
          <div><span className="text-cyan-400 font-bold">experience</span> - Work experience &amp; timeline</div>
          <div><span className="text-cyan-400 font-bold">certs</span> - Official certifications</div>
          <div><span className="text-cyan-400 font-bold">contact</span> - Reach out via email/phone</div>
          <div><span className="text-cyan-400 font-bold">resume</span> - Open / download latest CV</div>
          <div><span className="text-cyan-400 font-bold">sudo hire</span> - ✨ Direct recruit shortcut</div>
          <div><span className="text-cyan-400 font-bold">clear</span> - Clear terminal screen</div>
        </div>
        <div className="text-[11px] text-slate-400 mt-2">Tip: Click chips above or type commands directly into the prompt.</div>
      </div>
    ),

    about: () => (
      <div className="text-slate-200 leading-relaxed text-xs">
        <span className="text-indigo-400 font-bold">GURRALA LAKSHMI CHANDRAKALA REDDY</span><br />
        Frontend &amp; Mobile Application Developer based in Hyderabad, Telangana, India.<br /><br />
        • 7 months of professional production experience with <span className="text-emerald-400 font-semibold">The Team C</span>.<br />
        • Specialized in modern <span className="text-cyan-400 font-semibold">React.js</span> web ecosystems and cross-platform <span className="text-cyan-400 font-semibold">React Native</span> mobile interfaces.<br />
        • Certified System Administrator (<span className="text-purple-400 font-semibold">ServiceNow CSA</span>).<br />
        • Passionate about fluid UI/UX, reusable component architecture, and AI-accelerated workflows.
      </div>
    ),

    skills: () => (
      <div className="space-y-1.5 text-xs text-slate-300">
        <div><span className="text-cyan-400 font-bold">Frontend:</span> React.js, JavaScript (ES6+), TypeScript, HTML5, CSS3, Tailwind CSS, Vite</div>
        <div><span className="text-cyan-400 font-bold">Mobile:</span> React Native, Cross-Platform UI, Mobile Gestures, Component Layouts</div>
        <div><span className="text-cyan-400 font-bold">Enterprise Platforms:</span> ServiceNow Certified System Administrator (CSA)</div>
        <div><span className="text-cyan-400 font-bold">Backend &amp; DB:</span> Python, Flask, Django, SQLite, RESTful APIs</div>
        <div><span className="text-cyan-400 font-bold">AI &amp; Dev Tools:</span> Claude AI, Google Gemini, Antigravity, Git, GitHub, VS Code</div>
      </div>
    ),

    projects: () => (
      <div className="space-y-2 text-xs text-slate-300">
        <div>
          <span className="text-indigo-400 font-bold">1. Team Connect Website</span> <span className="text-cyan-400">[React.js, Tailwind, Vite]</span><br />
          Enterprise collaboration web platform featuring responsive layouts, reusable component systems, and high performance.
        </div>
        <div>
          <span className="text-indigo-400 font-bold">2. Team Connect Mobile App</span> <span className="text-cyan-400">[React Native, TypeScript]</span><br />
          Cross-platform mobile application providing seamless collaboration workflows and mobile-first gesture interfaces.
        </div>
        <div>
          <span className="text-indigo-400 font-bold">3. FitTrack Health Platform</span> <span className="text-cyan-400">[Python, Flask, React.js]</span><br />
          Full-stack fitness tracking web application with workout logs, REST API endpoints, and interactive UI.
        </div>
        <div>
          <span className="text-indigo-400 font-bold">4. QTrans Translation Engine</span> <span className="text-cyan-400">[Python, Django, SQLite]</span><br />
          Multilingual question paper translation platform dynamically processing examination papers into regional languages.
        </div>
      </div>
    ),

    experience: () => (
      <div className="space-y-2 text-xs text-slate-300">
        <div className="text-emerald-400 font-bold">Frontend Developer — The Team C (7 Months Active Production)</div>
        <p className="text-[11px] text-slate-300">• Contributed to frontend web &amp; mobile app development for Team Connect.</p>
        <p className="text-[11px] text-slate-300">• Built responsive UI layouts with React.js, Tailwind CSS, and React Native.</p>
        <p className="text-[11px] text-slate-300">• Utilized AI coding tools for rapid prototyping and clean debugging.</p>
        <div className="mt-2 text-indigo-400 font-bold">Education:</div>
        <p className="text-[11px] text-slate-300">• B.Tech in CSE — Sree Vahini Institute of Science &amp; Technology (2022–2026, CGPA: 7.59 / 10)</p>
        <p className="text-[11px] text-slate-300">• Intermediate (MPC) — Sri Nidhi Junior College (63%)</p>
        <p className="text-[11px] text-slate-300">• SSC — S.K.V High School (GPA: 9.2 / 10)</p>
      </div>
    ),

    certs: () => (
      <div className="space-y-1.5 text-xs text-slate-300">
        <div>🏆 <span className="text-purple-400 font-bold">ServiceNow Certified System Administrator (CSA)</span></div>
        <div>🐍 <span className="text-emerald-400 font-bold">HackerRank Python Basic Certificate</span></div>
        <div>📊 <span className="text-cyan-400 font-bold">SQL Basics &amp; Intermediate SQL Certificate</span></div>
      </div>
    ),

    contact: () => (
      <div className="space-y-1 text-xs text-slate-300">
        <div>📧 <span className="text-cyan-400 font-semibold">Email:</span> <a href="mailto:gurralaammureddy@gmail.com" className="text-indigo-300 hover:underline">gurralaammureddy@gmail.com</a></div>
        <div>📱 <span className="text-cyan-400 font-semibold">Phone / WhatsApp:</span> <a href="tel:+918919008619" className="text-indigo-300 hover:underline">+91 8919008619</a></div>
        <div>📍 <span className="text-cyan-400 font-semibold">Location:</span> Hyderabad, Telangana, India</div>
        <div>💼 <span className="text-cyan-400 font-semibold">LinkedIn:</span> <a href="https://linkedin.com/in/lakshmi-chandrakala-gurrala-710909255" target="_blank" rel="noopener noreferrer" className="text-indigo-300 hover:underline">linkedin.com/in/lakshmi-chandrakala-gurrala</a></div>
        <div>🐙 <span className="text-cyan-400 font-semibold">GitHub:</span> <a href="https://github.com/ammureddy743" target="_blank" rel="noopener noreferrer" className="text-indigo-300 hover:underline">github.com/ammureddy743</a></div>
      </div>
    ),

    resume: () => {
      window.open('assets/Lakshmi_Chandrakala_Resume.pdf', '_blank');
      return (
        <div className="text-emerald-400 text-xs">
          Opening resume in a new tab... <a href="assets/Lakshmi_Chandrakala_Resume.pdf" download className="underline font-bold text-white">[Click to Download Directly]</a>
        </div>
      );
    },

    'sudo hire': () => {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
      });
      setTimeout(() => {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 900);
      return (
        <div className="p-3 bg-gradient-to-r from-emerald-950/80 to-indigo-950/80 rounded border border-emerald-500/30 text-emerald-300 text-xs space-y-1">
          <div className="font-bold text-sm">🎉 ACCESS GRANTED: Candidate Profile Matched!</div>
          <p className="text-slate-300">Redirecting to priority direct contact form in 1 second...</p>
          <div className="font-mono text-cyan-300">Direct Email: gurralaammureddy@gmail.com | Phone: +91 8919008619</div>
        </div>
      );
    },

    clear: () => null,
  };

  const aliases: Record<string, string> = {
    cls: 'clear',
    ls: 'help',
    dir: 'help',
    bio: 'about',
    me: 'about',
    skill: 'skills',
    stack: 'skills',
    project: 'projects',
    work: 'projects',
    portfolio: 'projects',
    exp: 'experience',
    job: 'experience',
    cert: 'certs',
    certifications: 'certs',
    certification: 'certs',
    servicenow: 'certs',
    csa: 'certs',
    email: 'contact',
    phone: 'contact',
    hire: 'sudo hire',
    cv: 'resume',
  };

  const runCmd = (rawCmd: string) => {
    playSfx('keypress');
    const trimmed = (rawCmd || 'help').trim().toLowerCase();
    const effective = aliases[trimmed] || trimmed;

    setCmdHistory((prev) => [...prev, rawCmd]);
    setHistoryIdx(cmdHistory.length + 1);

    if (effective === 'clear') {
      setHistory([
        {
          cmd: '',
          output: (
            <div className="text-zinc-400 text-xs leading-relaxed">
              Console cleared. Welcome to <span className="text-orange-500 font-bold">Lakshmi Chandrakala's</span> terminal.<br />
              Type <span className="text-orange-400 font-bold cursor-pointer underline" onClick={() => runCmd('help')}>'help'</span> or click any chip above.
            </div>
          ),
        },
      ]);
      setInputVal('');
      return;
    }

    let out: React.ReactNode = null;
    if (commands[effective]) {
      out = commands[effective]();
    } else {
      out = (
        <div className="text-rose-400 text-xs">
          Command not recognized: '<span className="text-white">{rawCmd}</span>'. Type{' '}
          <span className="text-cyan-400 font-bold underline cursor-pointer" onClick={() => runCmd('help')}>
            'help'
          </span>{' '}
          for available commands.
        </div>
      );
    }

    setHistory((prev) => [...prev, { cmd: rawCmd, output: out }]);
    setInputVal('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runCmd(inputVal);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIdx > 0) {
        const next = historyIdx - 1;
        setHistoryIdx(next);
        setInputVal(cmdHistory[next] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx < cmdHistory.length - 1) {
        const next = historyIdx + 1;
        setHistoryIdx(next);
        setInputVal(cmdHistory[next] || '');
      } else {
        setHistoryIdx(cmdHistory.length);
        setInputVal('');
      }
    }
  };

  const chips = ['help', 'skills', 'projects', 'experience', 'certs', 'contact', 'sudo hire', 'clear'];

  return (
    <section id="terminal" className="px-6 sm:px-10 lg:px-16 py-20 border-b border-zinc-800/60">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="text-orange-500 font-bold text-xs uppercase tracking-widest font-mono">
            &lt;LakshmiTerm /&gt;
          </span>
          <h2 className="text-3xl font-extrabold text-white">Developer Console Mode</h2>
          <p className="text-zinc-400 text-sm">
            Click the chips below or type commands directly into the terminal.
          </p>
        </div>

        {/* Terminal Window */}
        <div className="terminal-window">
          
          {/* Header */}
          <div className="terminal-header">
            <div className="terminal-dots">
              <span className="terminal-dot dot-red"></span>
              <span className="terminal-dot dot-yellow"></span>
              <span className="terminal-dot dot-green"></span>
            </div>
            <span className="text-xs font-mono text-zinc-400">lakshmi@portfolio: ~ (zsh)</span>
            <span className="text-xs font-mono text-orange-500">READY</span>
          </div>

          {/* Chips */}
          <div className="p-3 bg-zinc-900 border-b border-zinc-800 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-zinc-500 font-mono text-[11px]">Click chips:</span>
            {chips.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => runCmd(chip)}
                className={`term-chip px-2.5 py-1 rounded font-mono transition text-xs ${
                  chip === 'sudo hire'
                    ? 'bg-orange-600/30 border border-orange-500 text-orange-400 font-bold hover:bg-orange-600/50'
                    : 'bg-zinc-800 text-orange-400 hover:bg-zinc-700'
                }`}
              >
                {chip === 'sudo hire' ? 'sudo hire ⚡' : chip}
              </button>
            ))}
          </div>

          {/* Body */}
          <div ref={terminalBodyRef} className="terminal-body space-y-3 font-mono">
            {history.map((h, idx) => (
              <div key={idx} className="space-y-1">
                {h.cmd && (
                  <div className="flex items-center text-slate-300">
                    <span className="terminal-prompt text-cyan-400 mr-2 font-bold">visitor@lakshmi:~$</span>
                    <span className="font-semibold text-white">{h.cmd}</span>
                  </div>
                )}
                <div className="terminal-output my-1">{h.output}</div>
              </div>
            ))}
          </div>

          {/* Prompt Form */}
          <form onSubmit={handleSubmit} className="p-3 bg-zinc-950 border-t border-zinc-800 flex items-center gap-2">
            <span className="terminal-prompt text-sm font-bold text-orange-500">visitor@lakshmi:~$</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type command here (or click Run)..."
              className="terminal-input"
              autoComplete="off"
              spellCheck="false"
            />
            <button type="submit" className="btn-orange text-xs py-1.5 px-3">
              Run
            </button>
          </form>

        </div>

      </div>
    </section>
  );
};
