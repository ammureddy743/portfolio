/**
 * Interactive Terminal Engine for Lakshmi Chandrakala Reddy's Portfolio
 * Features realistic command processing, command history (Arrow Up/Down),
 * clickable suggestion chips, and interactive Easter eggs (sudo hire).
 */

(function () {
  let terminalOutput = null;
  let terminalInput = null;
  const commandHistory = [];
  let historyIndex = -1;

  const commands = {
    help: () => `
<div class="text-indigo-400 font-semibold mb-1">AVAILABLE COMMANDS:</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 text-slate-300">
  <div><span class="text-cyan-400 font-bold">about</span>       - Read bio and background</div>
  <div><span class="text-cyan-400 font-bold">skills</span>      - Technical stack matrix</div>
  <div><span class="text-cyan-400 font-bold">projects</span>    - Featured projects overview</div>
  <div><span class="text-cyan-400 font-bold">experience</span>  - Work experience & timeline</div>
  <div><span class="text-cyan-400 font-bold">certs</span>       - Official certifications</div>
  <div><span class="text-cyan-400 font-bold">contact</span>     - Reach out via email/phone</div>
  <div><span class="text-cyan-400 font-bold">resume</span>      - Open / download latest CV</div>
  <div><span class="text-cyan-400 font-bold">sudo hire</span>   - ✨ Direct recruit shortcut</div>
  <div><span class="text-cyan-400 font-bold">clear</span>       - Clear terminal screen</div>
</div>
<div class="text-xs text-slate-400 mt-2">Tip: Click any chip above or type commands directly into the prompt.</div>
`,

    about: () => `
<div class="text-slate-200 leading-relaxed">
  <span class="text-indigo-400 font-bold">GURRALA LAKSHMI CHANDRAKALA REDDY</span><br/>
  Frontend & Mobile Application Developer based in Hyderabad, Telangana, India.<br/><br/>
  • 7 months of professional production experience with <span class="text-emerald-400 font-semibold">The Team C</span>.<br/>
  • Specialized in modern <span class="text-cyan-400 font-semibold">React.js</span> web ecosystems and cross-platform <span class="text-cyan-400 font-semibold">React Native</span> mobile interfaces.<br/>
  • Certified System Administrator (<span class="text-purple-400 font-semibold">ServiceNow CSA</span>).<br/>
  • Passionate about fluid UI/UX, reusable component architecture, and AI-accelerated workflows (Gemini, Claude, Antigravity).
</div>
`,

    skills: () => `
<div class="space-y-2 text-slate-300">
  <div><span class="text-cyan-400 font-bold">Frontend:</span> React.js, JavaScript (ES6+), TypeScript, HTML5, CSS3, Tailwind CSS, Vite</div>
  <div><span class="text-cyan-400 font-bold">Mobile:</span> React Native, Cross-Platform UI, Mobile Gestures, Component Layouts</div>
  <div><span class="text-cyan-400 font-bold">Enterprise Platforms:</span> ServiceNow Certified System Administrator (CSA)</div>
  <div><span class="text-cyan-400 font-bold">Backend & DB:</span> Python, Flask, Django, SQLite, RESTful APIs</div>
  <div><span class="text-cyan-400 font-bold">AI & Dev Tools:</span> Claude AI, Google Gemini, Antigravity, Git, GitHub, VS Code</div>
</div>
`,

    projects: () => `
<div class="space-y-3 text-slate-300">
  <div>
    <span class="text-indigo-400 font-bold">1. Team Connect Website</span> <span class="text-xs text-cyan-400">[React.js, Tailwind, Vite]</span><br/>
    Enterprise collaboration web platform featuring responsive layouts, reusable component systems, and high performance.
  </div>
  <div>
    <span class="text-indigo-400 font-bold">2. Team Connect Mobile App</span> <span class="text-xs text-cyan-400">[React Native, TypeScript]</span><br/>
    Cross-platform mobile application providing seamless collaboration workflows and mobile-first gesture interfaces.
  </div>
  <div>
    <span class="text-indigo-400 font-bold">3. FitTrack Health Platform</span> <span class="text-xs text-cyan-400">[Python, Flask, React.js]</span><br/>
    Full-stack health and fitness tracking web application with workout logs, REST API endpoints, and interactive UI.
  </div>
  <div>
    <span class="text-indigo-400 font-bold">4. QTrans Translation Engine</span> <span class="text-xs text-cyan-400">[Python, Django, SQLite]</span><br/>
    Multilingual question paper translation platform dynamically processing examination papers into regional languages.
  </div>
</div>
`,

    experience: () => `
<div class="space-y-2 text-slate-300">
  <div class="text-emerald-400 font-bold">Frontend Developer — The Team C (7 Months Active Production)</div>
  <p class="text-xs text-slate-300">• Contributed to frontend web & mobile app development for Team Connect.</p>
  <p class="text-xs text-slate-300">• Built responsive UI layouts with React.js, Tailwind CSS, and React Native.</p>
  <p class="text-xs text-slate-300">• Utilized AI coding tools for rapid prototyping and clean debugging.</p>
  <div class="mt-2 text-indigo-400 font-bold">Education:</div>
  <p class="text-xs text-slate-300">• B.Tech in CSE — Sree Vahini Institute of Science & Technology (2022–2026, CGPA: 7.59 / 10)</p>
  <p class="text-xs text-slate-300">• Intermediate (MPC) — Sri Nidhi Junior College (63%)</p>
  <p class="text-xs text-slate-300">• SSC — S.K.V High School (GPA: 9.2 / 10)</p>
</div>
`,

    certs: () => `
<div class="space-y-1.5 text-slate-300">
  <div>🏆 <span class="text-purple-400 font-bold">ServiceNow Certified System Administrator (CSA)</span></div>
  <div>🐍 <span class="text-emerald-400 font-bold">HackerRank Python Basic Certificate</span></div>
  <div>📊 <span class="text-cyan-400 font-bold">SQL Basics & Intermediate SQL Certificate</span></div>
</div>
`,

    contact: () => `
<div class="space-y-1.5 text-slate-300">
  <div>📧 <span class="text-cyan-400 font-semibold">Email:</span> <a href="mailto:gurralaammureddy@gmail.com" class="text-indigo-300 hover:underline">gurralaammureddy@gmail.com</a></div>
  <div>📱 <span class="text-cyan-400 font-semibold">Phone / WhatsApp:</span> <a href="tel:+918919008619" class="text-indigo-300 hover:underline">+91 8919008619</a></div>
  <div>📍 <span class="text-cyan-400 font-semibold">Location:</span> Hyderabad, Telangana, India</div>
  <div>💼 <span class="text-cyan-400 font-semibold">LinkedIn:</span> <a href="https://linkedin.com/in/lakshmi-chandrakala-gurrala-710909255" target="_blank" class="text-indigo-300 hover:underline">linkedin.com/in/lakshmi-chandrakala-gurrala</a></div>
  <div>🐙 <span class="text-cyan-400 font-semibold">GitHub:</span> <a href="https://github.com/ammureddy743" target="_blank" class="text-indigo-300 hover:underline">github.com/ammureddy743</a></div>
</div>
`,

    resume: () => {
      window.open('assets/Lakshmi_Chandrakala_Resume.pdf', '_blank');
      return `<div class="text-emerald-400">Opening resume in a new tab... <a href="assets/Lakshmi_Chandrakala_Resume.pdf" download class="underline font-bold text-white">[Click to Download Directly]</a></div>`;
    },

    'sudo hire': () => {
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
      }, 900);
      return `
<div class="p-3 bg-gradient-to-r from-emerald-950/80 to-indigo-950/80 rounded border border-emerald-500/30 text-emerald-300">
  <div class="font-bold text-base mb-1">🎉 ACCESS GRANTED: Candidate Profile Matched!</div>
  <p class="text-slate-300 text-xs">Redirecting to priority direct contact form in 1 second...</p>
  <div class="mt-2 text-xs font-mono text-cyan-300">Direct Email: gurralaammureddy@gmail.com | Phone: +91 8919008619</div>
</div>
`;
    },

    clear: () => {
      if (terminalOutput) {
        terminalOutput.innerHTML = `
          <div class="text-zinc-400 text-xs leading-relaxed">
            Console cleared. Welcome to <span class="text-orange-500 font-bold">Lakshmi Chandrakala's</span> terminal.<br />
            Type <span class="text-orange-400 font-bold cursor-pointer underline" onclick="window.runTerminalCommand('help')">'help'</span> or click any chip above.
          </div>
        `;
      }
      return null;
    }
  };

  // Aliases for friendly UX
  const aliases = {
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
    reach: 'contact',
    hire: 'sudo hire',
    cv: 'resume',
    hi: 'about',
    hello: 'about'
  };

  function executeCommand(rawCmd) {
    if (!terminalOutput) {
      terminalOutput = document.getElementById('terminalOutput');
    }
    if (!terminalInput) {
      terminalInput = document.getElementById('terminalInput');
    }
    if (!terminalOutput) return;

    const trimmed = (rawCmd || 'help').toString().trim().toLowerCase();
    const effectiveCmd = aliases[trimmed] || trimmed;

    commandHistory.push(trimmed);
    historyIndex = commandHistory.length;

    // Append user command row
    const userRow = document.createElement('div');
    userRow.className = 'flex items-center text-slate-300 mb-1';
    userRow.innerHTML = `<span class="terminal-prompt text-cyan-400 mr-2 font-bold">visitor@lakshmi:~$</span> <span class="font-semibold text-white">${escapeHtml(trimmed)}</span>`;
    terminalOutput.appendChild(userRow);

    // Run command
    let outputHtml = '';
    if (commands[effectiveCmd]) {
      const res = commands[effectiveCmd]();
      if (res !== null) outputHtml = res;
    } else {
      outputHtml = `<div class="text-rose-400 text-xs">Command not recognized: '<span class="text-white">${escapeHtml(trimmed)}</span>'. Type <span class="text-cyan-400 font-bold underline cursor-pointer" onclick="window.runTerminalCommand('help')">'help'</span> for available commands.</div>`;
    }

    if (outputHtml) {
      const outRow = document.createElement('div');
      outRow.className = 'terminal-output text-xs leading-relaxed my-1';
      outRow.innerHTML = outputHtml;
      terminalOutput.appendChild(outRow);
    }

    // Scroll to bottom
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
    if (terminalInput) terminalInput.value = '';

    // Play feedback sound if sound is enabled
    if (window.playSfx) window.playSfx('keypress');
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, function (m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
    });
  }

  function setupTerminal() {
    terminalOutput = document.getElementById('terminalOutput');
    terminalInput = document.getElementById('terminalInput');
    const chipButtons = document.querySelectorAll('.term-chip');
    const terminalForm = document.getElementById('terminalForm');

    // Handle Form submission
    if (terminalForm) {
      terminalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const val = terminalInput ? terminalInput.value : '';
        executeCommand(val || 'help');
      });
    }

    // Handle Input Enter & Arrows
    if (terminalInput) {
      terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          executeCommand(terminalInput.value || 'help');
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (historyIndex > 0) {
            historyIndex--;
            terminalInput.value = commandHistory[historyIndex] || '';
          }
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            terminalInput.value = commandHistory[historyIndex] || '';
          } else {
            historyIndex = commandHistory.length;
            terminalInput.value = '';
          }
        }
      });
    }

    // Chip buttons
    chipButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const cmd = btn.getAttribute('data-cmd');
        if (cmd) {
          executeCommand(cmd);
        }
      });
    });
  }

  // Global helper available immediately
  window.runTerminalCommand = function (cmd) {
    executeCommand(cmd || 'help');
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupTerminal);
  } else {
    setupTerminal();
  }
})();
