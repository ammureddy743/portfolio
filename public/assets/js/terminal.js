/**
 * Interactive Terminal Engine for Lakshmi Chandrakala Reddy's Portfolio
 * Features realistic command processing, command history (Arrow Up/Down),
 * clickable suggestion chips, and interactive Easter eggs (sudo hire).
 */

(function () {
  const terminalOutput = document.getElementById('terminalOutput');
  const terminalInput = document.getElementById('terminalInput');
  const chipButtons = document.querySelectorAll('.term-chip');

  if (!terminalInput || !terminalOutput) return;

  const commandHistory = [];
  let historyIndex = -1;

  const commands = {
    help: () => `
<div class="text-indigo-400 font-semibold mb-1">AVAILABLE COMMANDS:</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 text-slate-300">
  <div><span class="text-cyan-400 font-bold">about</span>       - Read bio and background</div>
  <div><span class="text-cyan-400 font-bold">skills</span>      - Technical stack matrix</div>
  <div><span class="text-cyan-400 font-bold">backend</span>     - Node.js & REST API architecture</div>
  <div><span class="text-cyan-400 font-bold">api</span>         - Live backend API telemetry status</div>
  <div><span class="text-cyan-400 font-bold">projects</span>    - Featured projects overview</div>
  <div><span class="text-cyan-400 font-bold">experience</span>  - Work experience & timeline</div>
  <div><span class="text-cyan-400 font-bold">certs</span>       - Official certifications</div>
  <div><span class="text-cyan-400 font-bold">contact</span>     - Reach out via email/phone</div>
  <div><span class="text-cyan-400 font-bold">resume</span>      - Open / download latest CV</div>
  <div><span class="text-cyan-400 font-bold">sudo hire</span>   - ✨ Direct recruit shortcut</div>
  <div><span class="text-cyan-400 font-bold">clear</span>       - Clear terminal screen</div>
</div>
<div class="text-xs text-slate-500 mt-2">Tip: You can click the chips above or type commands directly.</div>
`,

    about: () => `
<div class="text-slate-200 leading-relaxed">
  <span class="text-indigo-400 font-bold">GURRALA LAKSHMI CHANDRAKALA REDDY</span><br/>
  Frontend & Mobile Application Developer based in Hyderabad, Telangana, India.<br/><br/>
  • 7 months of professional production experience with <span class="text-emerald-400">The Team C</span>.<br/>
  • Specialized in modern <span class="text-cyan-400">React.js</span> web ecosystems and cross-platform <span class="text-cyan-400">React Native</span> mobile interfaces.<br/>
  • Certified System Administrator (<span class="text-purple-400">ServiceNow CSA</span>).<br/>
  • Passionate about fluid UI/UX, reusable component architecture, and AI-accelerated workflows (Gemini, Claude, Antigravity).
</div>
`,

    skills: () => `
<div class="space-y-2 text-slate-300">
  <div><span class="text-cyan-400 font-bold">Frontend:</span> React.js 18+, TypeScript, Tailwind CSS, Vite, HTML5, CSS3, Modern State Management</div>
  <div><span class="text-cyan-400 font-bold">Mobile:</span> React Native, Expo, Cross-Platform Architecture, Gesture Handling, Safe Area</div>
  <div><span class="text-cyan-400 font-bold">Backend & APIs:</span> Node.js, Express.js, RESTful Architecture, Python, Flask, Data Modeling</div>
  <div><span class="text-cyan-400 font-bold">Enterprise Platforms:</span> ServiceNow Certified System Administrator (CSA)</div>
  <div><span class="text-cyan-400 font-bold">AI & Dev Tools:</span> Claude AI, Google Gemini, Antigravity, Git, GitHub Actions, VS Code</div>
</div>
`,

    backend: () => `
<div class="space-y-2 text-slate-300">
  <div class="text-amber-400 font-bold">BACKEND & RESTful API ARCHITECTURE:</div>
  <div>• <span class="text-cyan-400 font-semibold">Node.js & Express:</span> RESTful routing, middleware pipelines, CORS, async/await controllers.</div>
  <div>• <span class="text-cyan-400 font-semibold">Live Portfolio REST API:</span> Endpoints for <code>/api/contact</code>, <code>/api/inquiries</code>, <code>/api/stats</code>, and <code>/api/health</code>.</div>
  <div>• <span class="text-cyan-400 font-semibold">Python & Flask:</span> Microservices & AI orchestration (QTrans translation routing).</div>
  <div>• <span class="text-cyan-400 font-semibold">Persistence:</span> JSON thread-safe filesystem persistence & SQL/PostgreSQL schema modeling.</div>
  <div class="text-xs text-slate-400 mt-2">Type <span class="text-emerald-400 font-mono font-bold">api</span> to check the live status of the backend server.</div>
</div>
`,

    api: () => `
<div class="space-y-2 text-slate-300">
  <div class="text-emerald-400 font-bold">LIVE BACKEND TELEMETRY STATUS:</div>
  <div class="p-3 bg-slate-900/90 rounded border border-slate-700/80 font-mono text-xs space-y-1">
    <div><span class="text-slate-400">Server:</span> <span class="text-cyan-400">Node.js Express REST API</span></div>
    <div><span class="text-slate-400">Port:</span> <span class="text-emerald-400">5000 (Local) / Same-Origin Fallback</span></div>
    <div><span class="text-slate-400">Status:</span> <span class="text-emerald-400">● ONLINE / READY</span></div>
    <div><span class="text-slate-400">Endpoints:</span></div>
    <div class="pl-3 text-slate-300">POST /api/contact &nbsp;&nbsp;&nbsp;&nbsp;- Ingestion &amp; Validation</div>
    <div class="pl-3 text-slate-300">GET  /api/health &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Health Check &amp; Memory</div>
    <div class="pl-3 text-slate-300">GET  /api/inquiries &nbsp;&nbsp;- Recruiter Leads Feed</div>
    <div class="pl-3 text-slate-300">GET  /api/stats &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Engineering Metrics</div>
  </div>
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
    Full-stack health and fitness tracking web application with workout logs and interactive UI.
  </div>
  <div>
    <span class="text-indigo-400 font-bold">4. QTrans Translation Engine</span> <span class="text-xs text-cyan-400">[Python, Django, SQLite]</span><br/>
    Multilingual question paper translation platform dynamically processing examination papers into regional languages.
  </div>
</div>
`,

    experience: () => `
<div class="space-y-2 text-slate-300">
  <div class="text-emerald-400 font-bold">Frontend Developer — The Team C (7 Months)</div>
  <p class="text-xs text-slate-400">• Contributed to frontend web & mobile app development for Team Connect.</p>
  <p class="text-xs text-slate-400">• Built responsive UI layouts with React.js, Tailwind CSS, and React Native.</p>
  <p class="text-xs text-slate-400">• Utilized AI coding tools for rapid prototyping and clean debugging.</p>
  <div class="mt-2 text-indigo-400 font-bold">Education:</div>
  <p class="text-xs text-slate-400">• B.Tech in CSE — Sree Vahini Institute of Science & Technology (2022–2026, CGPA: 7.59)</p>
  <p class="text-xs text-slate-400">• Intermediate (MPC) — Sri Nidhi Junior College (63%)</p>
  <p class="text-xs text-slate-400">• SSC — S.K.V High School (GPA: 9.2/10)</p>
</div>
`,

    certs: () => `
<div class="space-y-1 text-slate-300">
  <div>🏆 <span class="text-purple-400 font-bold">ServiceNow Certified System Administrator (CSA)</span></div>
  <div>🐍 <span class="text-emerald-400 font-bold">HackerRank Python Basic Certificate</span></div>
  <div>📊 <span class="text-cyan-400 font-bold">SQL Basics & Intermediate SQL Certificate</span></div>
</div>
`,

    contact: () => `
<div class="space-y-1 text-slate-300">
  <div>📧 <span class="text-cyan-400">Email:</span> <a href="mailto:gurralaammureddy@gmail.com" class="text-indigo-300 hover:underline">gurralaammureddy@gmail.com</a></div>
  <div>📱 <span class="text-cyan-400">Phone:</span> <a href="tel:+918919008619" class="text-indigo-300 hover:underline">+91 8919008619</a></div>
  <div>📍 <span class="text-cyan-400">Location:</span> Hyderabad, Telangana, India</div>
  <div>💼 <span class="text-cyan-400">LinkedIn:</span> <a href="https://linkedin.com/in/lakshmi-chandrakala-gurrala-710909255" target="_blank" class="text-indigo-300 hover:underline">linkedin.com/in/lakshmi-chandrakala-gurrala-710909255</a></div>
  <div>🐙 <span class="text-cyan-400">GitHub:</span> <a href="https://github.com/ammureddy743" target="_blank" class="text-indigo-300 hover:underline">github.com/ammureddy743</a></div>
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
      terminalOutput.innerHTML = '';
      return null;
    }
  };

  function executeCommand(rawCmd) {
    const trimmed = rawCmd.trim().toLowerCase();
    if (!trimmed) return;

    commandHistory.push(rawCmd);
    historyIndex = commandHistory.length;

    // Append user command row
    const userRow = document.createElement('div');
    userRow.className = 'flex items-center text-slate-300 mb-1';
    userRow.innerHTML = `<span class="terminal-prompt text-cyan-400">visitor@lakshmi:~$</span> <span class="font-semibold text-white">${escapeHtml(rawCmd)}</span>`;
    terminalOutput.appendChild(userRow);

    // Run command
    let outputHtml = '';
    if (commands[trimmed]) {
      const res = commands[trimmed]();
      if (res !== null) outputHtml = res;
    } else {
      outputHtml = `<div class="text-rose-400">Command not recognized: '<span class="text-white">${escapeHtml(rawCmd)}</span>'. Type <span class="text-cyan-400 font-bold underline cursor-pointer" onclick="window.runTerminalCommand('help')">'help'</span> for a list of available commands.</div>`;
    }

    if (outputHtml) {
      const outRow = document.createElement('div');
      outRow.className = 'terminal-output';
      outRow.innerHTML = outputHtml;
      terminalOutput.appendChild(outRow);
    }

    // Scroll to bottom
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
    terminalInput.value = '';

    // Play feedback sound if sound is enabled
    if (window.playSfx) window.playSfx('keypress');
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, function (m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
    });
  }

  // Handle Input Enter & Arrows
  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      executeCommand(terminalInput.value);
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

  // Chip buttons
  chipButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      if (cmd) {
        executeCommand(cmd);
      }
    });
  });

  // Global helper to run terminal commands
  window.runTerminalCommand = function (cmd) {
    executeCommand(cmd);
  };
})();

