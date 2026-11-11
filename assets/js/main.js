/**
 * LAKSHMI CHANDRAKALA REDDY - PORTFOLIO CORE ENGINE
 * Interactive Canvas, Audio Synthesizer, Typing FX, Modals, Filter, Toast
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroCanvas();
  initTypingEffect();
  initThemeToggle();
  initAudioSynthesizer();
  initProjectFilters();
  initModals();
  initContactForm();
  initCopyButtons();
  initNavbarScroll();
  initMobileMenu();
  initComponentSandbox();
  initFaqAccordion();
  initAvatar();
});

function initAvatar() {
  const saved = localStorage.getItem('lk_avatar_img');
  if (saved) {
    const img = document.getElementById('heroAvatarImg');
    if (img) img.src = saved;
  }
}

window.handleAvatarUpload = function(e) {
  const file = e.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      const img = document.getElementById('heroAvatarImg');
      if (img) img.src = result;
      localStorage.setItem('lk_avatar_img', result);
      showToast('Profile photo updated successfully!', 'success');
      if (window.soundFX) window.soundFX.playSuccess();
    };
    reader.readAsDataURL(file);
  }
};

/* ==========================================================================
   1. HERO CONSTELLATION CANVAS
   ========================================================================== */
function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width, height;
  let particles = [];
  const particleCount = window.innerWidth < 768 ? 35 : 70;
  const maxDistance = 140;

  const mouse = { x: null, y: null, radius: 150 };

  function resize() {
    if (!canvas.parentElement) return;
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.radius = Math.random() * 2 + 1;
      this.baseColor = Math.random() > 0.5 ? '99, 102, 241' : '6, 182, 212';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 2.5;
          this.y -= (dy / dist) * force * 2.5;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.baseColor}, 0.6)`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const alpha = (1 - dist / maxDistance) * 0.25;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. TYPING EFFECT
   ========================================================================== */
function initTypingEffect() {
  const target = document.getElementById('typewriterText');
  if (!target) return;

  const phrases = [
    'Frontend Developer (React.js & Vite)',
    'Mobile App Developer (React Native)',
    'ServiceNow Certified System Administrator (CSA)',
    'UI/UX Craftsman & Performance Focused',
    'AI-Accelerated Software Engineer'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 70;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      target.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 35;
    } else {
      target.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 70;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      typingSpeed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   3. WEB AUDIO SYNTHESIZER
   ========================================================================== */
let audioCtx = null;
let soundEnabled = false;

function initAudioSynthesizer() {
  const soundBtn = document.getElementById('soundToggleBtn');
  if (!soundBtn) return;

  soundBtn.addEventListener('click', () => {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    soundEnabled = !soundEnabled;

    if (soundEnabled) {
      soundBtn.classList.add('text-indigo-400');
      soundBtn.title = 'Sound Effects: ON';
      showToast('🔊 Audio feedback enabled', 'info');
      playTone(520, 'sine', 0.15, 0.08);
      setTimeout(() => playTone(780, 'sine', 0.2, 0.1), 100);
    } else {
      soundBtn.classList.remove('text-indigo-400');
      soundBtn.title = 'Sound Effects: OFF';
      showToast('🔇 Audio feedback muted', 'info');
    }
  });

  window.playSfx = function (type) {
    if (!soundEnabled || !audioCtx) return;
    try {
      if (audioCtx.state === 'suspended') audioCtx.resume();
      if (type === 'click') {
        playTone(600, 'sine', 0.05, 0.04);
      } else if (type === 'keypress') {
        playTone(400 + Math.random() * 150, 'triangle', 0.03, 0.03);
      } else if (type === 'success') {
        playTone(440, 'sine', 0.1, 0.08);
        setTimeout(() => playTone(659, 'sine', 0.15, 0.1), 80);
        setTimeout(() => playTone(880, 'sine', 0.25, 0.15), 180);
      }
    } catch (e) {
      console.warn('Audio play error', e);
    }
  };

  function playTone(freq, type = 'sine', duration = 0.1, gainVal = 0.05) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  }

  document.querySelectorAll('button, a, .term-chip, .filter-btn').forEach((el) => {
    el.addEventListener('click', () => {
      if (window.playSfx) window.playSfx('click');
    });
  });
}

/* ==========================================================================
   4. THEME TOGGLE (DARK / LIGHT)
   ========================================================================== */
function initThemeToggle() {
  const themeBtn = document.getElementById('themeToggleBtn');
  if (!themeBtn) return;

  const currentTheme = localStorage.getItem('lk_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  themeBtn.addEventListener('click', () => {
    const nowTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', nowTheme);
    localStorage.setItem('lk_theme', nowTheme);
    updateThemeIcon(nowTheme);
    showToast(`Switched to ${nowTheme === 'light' ? 'Crystal Light' : 'Obsidian Dark'} mode`, 'info');
  });

  function updateThemeIcon(theme) {
    const icon = themeBtn.querySelector('[data-lucide]');
    if (!icon) return;
    if (theme === 'light') {
      icon.setAttribute('data-lucide', 'moon');
    } else {
      icon.setAttribute('data-lucide', 'sun');
    }
    if (window.lucide) lucide.createIcons();
  }
}

/* ==========================================================================
   5. PROJECT FILTERING (FIXED & HIGH PERFORMANCE)
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Update active tab button style
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const categoryAttr = card.getAttribute('data-category') || '';
        const categories = categoryAttr.toLowerCase().split(/\s+/);
        
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = '';
          card.classList.remove('hidden');
        } else {
          card.style.display = 'none';
          card.classList.add('hidden');
        }
      });

      if (window.playSfx) window.playSfx('click');
    });
  });
}

/* ==========================================================================
   6. INTERACTIVE MODALS & LIVE PREVIEWS
   ========================================================================== */
function initModals() {
  const modalOverlay = document.getElementById('projectModal');
  const modalContent = document.getElementById('modalContent');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const resumeModal = document.getElementById('resumeModal');
  const closeResumeBtn = document.getElementById('closeResumeBtn');
  const openResumeBtns = document.querySelectorAll('.open-resume-modal');

  const projectDetails = {
    'team-connect-web': {
      title: 'Team Connect Website',
      subtitle: 'Enterprise Team Collaboration & Workflow Portal',
      tag: 'React.js • Tailwind CSS • Vite',
      badge: 'Production Experience (The Team C)',
      overview: 'Contributed directly to the core web platform of Team Connect, focusing on reusable component architecture, highly responsive cross-device views, and frictionless user flows.',
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
      interactiveDemoHtml: `
        <div class="p-4 bg-slate-900 rounded-lg border border-slate-700/60 font-sans">
          <div class="flex items-center justify-between pb-3 border-b border-slate-800 text-xs text-slate-400">
            <span class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> Live Simulated View</span>
            <span class="text-indigo-400 font-mono">React v18 • Tailwind</span>
          </div>
          <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div class="p-3 bg-slate-800/80 rounded border border-slate-700">
              <div class="text-slate-400">Active Sprints</div>
              <div class="text-xl font-bold text-white mt-1">12 Tasks</div>
              <div class="text-emerald-400 text-[10px] mt-1">↑ 4 Completed today</div>
            </div>
            <div class="p-3 bg-slate-800/80 rounded border border-slate-700">
              <div class="text-slate-400">Team Members</div>
              <div class="text-xl font-bold text-white mt-1">28 Online</div>
              <div class="text-cyan-400 text-[10px] mt-1">Synced across web & mobile</div>
            </div>
            <div class="p-3 bg-slate-800/80 rounded border border-slate-700">
              <div class="text-slate-400">UI Render Score</div>
              <div class="text-xl font-bold text-emerald-400 mt-1">98/100</div>
              <div class="text-slate-400 text-[10px] mt-1">Vite Optimized</div>
            </div>
          </div>
        </div>
      `
    },
    'team-connect-mobile': {
      title: 'Team Connect Mobile Application',
      subtitle: 'Native Mobile UI & Collaborative Mobile Experience',
      tag: 'React Native • TypeScript • Cross-Platform',
      badge: 'Production Experience (The Team C)',
      overview: 'Contributed to the frontend mobile application for Team Connect, translating intricate Figma interfaces into high-performance React Native and TypeScript components with native gestures.',
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
      interactiveDemoHtml: `
        <div class="p-4 bg-slate-900 rounded-lg border border-slate-700/60 font-sans text-xs">
          <div class="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400">
            <span>📱 Simulated Mobile Screen</span>
            <span class="text-cyan-400 font-mono">React Native Core</span>
          </div>
          <div class="mt-3 p-3 bg-slate-800 rounded-lg border border-indigo-500/20">
            <div class="font-bold text-white text-sm">💬 Team Connect Quick Chat</div>
            <div class="mt-2 space-y-2">
              <div class="p-2 bg-slate-700/60 rounded text-slate-300">"New UI components for dashboard pushed to staging!"</div>
              <div class="p-2 bg-indigo-600/30 text-indigo-200 rounded text-right">"Tested on both iOS & Android — smooth 60fps."</div>
            </div>
          </div>
        </div>
      `
    },
    'fittrack-platform': {
      title: 'FitTrack Health & Fitness Ecosystem',
      subtitle: 'Full-Stack Workout Tracking & Wellness Analytics',
      tag: 'Python • Flask • React.js • REST APIs',
      badge: 'Full-Stack Project',
      overview: 'An end-to-end fitness management web app featuring an interactive React.js interface coupled with a Python Flask REST backend for tracking training programs, macro nutrition, and performance streaks.',
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
      interactiveDemoHtml: `
        <div class="p-4 bg-slate-900 rounded-lg border border-slate-700/60 font-sans text-xs">
          <div class="text-slate-400 mb-2">⚡ Interactive Mini Calorie/Target Preview</div>
          <div class="flex gap-2 mb-3">
            <input type="number" id="calcWeight" placeholder="Weight (kg)" value="65" class="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-white text-xs w-28">
            <button onclick="window.runFitCalc()" class="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded">Calculate Daily Water</button>
          </div>
          <div id="calcResult" class="text-cyan-400 font-medium">Recommended Water Intake: ~2.3 Liters / day</div>
        </div>
      `
    },
    'qtrans-translation': {
      title: 'QTrans: Multilingual Question Paper Translation',
      subtitle: 'Automated Academic Question Paper Multi-Language Engine',
      tag: 'Python • Django • SQLite • NLP Translation',
      badge: 'Academic Innovation Project',
      overview: 'Solved a critical educational bottleneck by creating an automated translation pipeline that converts academic question papers and STEM exams into multiple languages with consistent formatting.',
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
      interactiveDemoHtml: `
        <div class="p-4 bg-slate-900 rounded-lg border border-slate-700/60 font-sans text-xs">
          <div class="text-slate-400 mb-2">🌐 Live Translation Simulator</div>
          <div class="p-2 bg-slate-800 rounded border border-slate-700 text-slate-300">
            <span class="text-indigo-400 font-bold">Input (EN):</span> "Explain the principles of Object-Oriented Programming with examples."
          </div>
          <div class="p-2 bg-emerald-950/40 rounded border border-emerald-600/30 text-emerald-300 mt-2">
            <span class="text-emerald-400 font-bold">QTrans Processed (Telugu/Hindi):</span> "ఉదాహరణలతో ఆబ్జెక్ట్-ఓరియెంటెడ్ ప్రోగ్రామింగ్ సూత్రాలను వివరించండి."
          </div>
        </div>
      `
    }
  };

  document.querySelectorAll('.open-project-modal').forEach((btn) => {
    btn.addEventListener('click', () => {
      const projId = btn.getAttribute('data-project-id');
      const data = projectDetails[projId];
      if (!data) return;

      modalContent.innerHTML = `
        <div class="p-6 md:p-8 space-y-6">
          <div class="flex items-start justify-between">
            <div>
              <span class="recruiter-pill mb-2">${data.badge}</span>
              <h2 class="text-2xl md:text-3xl font-bold text-white mt-1">${data.title}</h2>
              <p class="text-indigo-400 font-medium text-sm mt-1">${data.subtitle}</p>
            </div>
            <button onclick="window.closeCurrentModal()" class="text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 transition">
              ✕
            </button>
          </div>

          <p class="text-slate-300 leading-relaxed text-sm">${data.overview}</p>

          <div class="grid grid-cols-3 gap-3">
            ${data.metrics
              .map(
                (m) => `
              <div class="p-3 bg-slate-800/60 border border-slate-700/70 rounded-xl text-center">
                <div class="text-lg md:text-xl font-bold text-cyan-400">${m.val}</div>
                <div class="text-[11px] text-slate-400 mt-0.5">${m.label}</div>
              </div>
            `
              )
              .join('')}
          </div>

          <div>
            <h4 class="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">Key Technical Contributions</h4>
            <ul class="space-y-2 text-sm text-slate-300">
              ${data.highlights
                .map(
                  (h) => `
                <li class="flex items-start gap-2">
                  <span class="text-emerald-400 mt-0.5">✔</span>
                  <span>${h}</span>
                </li>
              `
                )
                .join('')}
            </ul>
          </div>

          ${data.interactiveDemoHtml}

          <div class="pt-4 border-t border-slate-800 flex items-center justify-between flex-wrap gap-3">
            <span class="text-xs text-slate-400 font-mono">${data.tag}</span>
            <div class="flex gap-2">
              <a href="#contact" onclick="window.closeCurrentModal()" class="btn-primary text-xs py-2 px-4">
                Discuss This Project
              </a>
            </div>
          </div>
        </div>
      `;

      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (window.lucide) lucide.createIcons();
    });
  });

  window.closeCurrentModal = function () {
    if (modalOverlay) modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeModalBtn) closeModalBtn.addEventListener('click', window.closeCurrentModal);

  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) window.closeCurrentModal();
  });

  // Resume Modal Handling
  openResumeBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (resumeModal) {
        resumeModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (closeResumeBtn) {
    closeResumeBtn.addEventListener('click', () => {
      resumeModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  resumeModal?.addEventListener('click', (e) => {
    if (e.target === resumeModal) {
      resumeModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  window.runFitCalc = function () {
    const w = parseFloat(document.getElementById('calcWeight')?.value) || 60;
    const res = (w * 0.035).toFixed(1);
    const el = document.getElementById('calcResult');
    if (el) el.textContent = `Recommended Water Intake: ~${res} Liters / day (Based on ${w}kg)`;
    if (window.playSfx) window.playSfx('success');
  };
}

/* ==========================================================================
   7. CONTACT FORM & INTERACTIVE ACTIONS
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]')?.value.trim();
    const email = form.querySelector('[name="email"]')?.value.trim();
    const message = form.querySelector('[name="message"]')?.value.trim();

    if (!name || !email || !message) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }

    const lead = {
      name,
      email,
      message,
      timestamp: new Date().toISOString()
    };
    const inquiries = JSON.parse(localStorage.getItem('lk_inquiries') || '[]');
    inquiries.push(lead);
    localStorage.setItem('lk_inquiries', JSON.stringify(inquiries));

    if (typeof confetti === 'function') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    if (window.playSfx) window.playSfx('success');

    showToast(`Thank you, ${name}! Your message has been sent to Lakshmi.`, 'success');
    form.reset();
  });
}

/* ==========================================================================
   8. COPY TO CLIPBOARD BUTTONS
   ========================================================================== */
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('[data-copy]');

  copyButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied to clipboard: ${textToCopy}`, 'success');
        if (window.playSfx) window.playSfx('success');
      });
    });
  });
}

/* ==========================================================================
   9. NAVBAR ACTIVE SPY & INTERACTIVE CLICK (ROCK-SOLID ACTIVE TABS)
   ========================================================================== */
function initNavbarScroll() {
  const nav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Click handler for immediate active state update
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      navLinks.forEach((l) => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  function updateActiveNav() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollY > 50) {
      nav?.classList.add('shadow-lg', 'bg-opacity-95');
    } else {
      nav?.classList.remove('shadow-lg', 'bg-opacity-95');
    }

    // Determine current active section
    let activeId = '';
    const scrollPosition = scrollY + 220;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        activeId = section.getAttribute('id');
      }
    });

    if (activeId) {
      navLinks.forEach((link) => {
        if (link.getAttribute('href') === `#${activeId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();
}

/* ==========================================================================
   10. MOBILE MENU TOGGLE
   ========================================================================== */
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!mobileToggle || !mobileMenu) return;

  mobileToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

/* ==========================================================================
   11. INTERACTIVE COMPONENT SANDBOX (LIVE REACT DEMO & SOURCE CODE)
   ========================================================================== */
function initComponentSandbox() {
  const taskListEl = document.getElementById('sandboxTaskList');
  const taskInput = document.getElementById('sandboxTaskInput');
  const addTaskBtn = document.getElementById('sandboxAddTaskBtn');
  const filterBtns = document.querySelectorAll('.sandbox-filter-btn');
  const tabLiveBtn = document.getElementById('tabLiveDemoBtn');
  const tabCodeBtn = document.getElementById('tabSourceCodeBtn');
  const viewLive = document.getElementById('sandboxViewLive');
  const viewCode = document.getElementById('sandboxViewCode');
  const activeCountEl = document.getElementById('sandboxActiveCount');

  if (!taskListEl) return;

  let currentCategory = 'all';

  let tasks = [
    { id: 1, text: 'Architect reusable Button & Modal UI components', tag: 'frontend', completed: true },
    { id: 2, text: 'Optimize FlatList render performance in React Native', tag: 'mobile', completed: true },
    { id: 3, text: 'Configure ServiceNow automated catalog request workflow', tag: 'servicenow', completed: false },
    { id: 4, text: 'Integrate Vite build pipeline with Tailwind JIT compilation', tag: 'frontend', completed: true },
    { id: 5, text: 'Implement cross-device touch gestures & safe area layouts', tag: 'mobile', completed: false }
  ];

  function renderTasks() {
    taskListEl.innerHTML = '';

    const filtered = tasks.filter((t) => currentCategory === 'all' || t.tag === currentCategory);

    if (filtered.length === 0) {
      taskListEl.innerHTML = `
        <div class="text-center py-8 text-slate-500 text-xs font-mono">
          No tasks found in category "${currentCategory}". Add one below!
        </div>
      `;
    } else {
      filtered.forEach((task) => {
        const item = document.createElement('div');
        item.className = `task-item flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 ${task.completed ? 'completed' : ''}`;
        
        const tagColors = {
          frontend: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
          mobile: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
          servicenow: 'text-purple-400 bg-purple-500/10 border-purple-500/30'
        };
        const badgeClass = tagColors[task.tag] || 'text-slate-400 bg-slate-800 border-slate-700';

        item.innerHTML = `
          <div class="flex items-center gap-3">
            <input type="checkbox" ${task.completed ? 'checked' : ''} class="w-4 h-4 rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 bg-slate-800 cursor-pointer" data-id="${task.id}" />
            <span class="task-text text-xs md:text-sm text-slate-200 font-medium">${escapeHtml(task.text)}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-[10px] uppercase font-mono px-2 py-0.5 rounded border ${badgeClass}">${task.tag}</span>
            <button class="delete-task-btn text-slate-500 hover:text-rose-400 p-1 transition" data-id="${task.id}" title="Delete task">
              ✕
            </button>
          </div>
        `;

        taskListEl.appendChild(item);
      });
    }

    const active = tasks.filter((t) => !t.completed).length;
    if (activeCountEl) {
      activeCountEl.textContent = `${active} active task${active === 1 ? '' : 's'} remaining`;
    }

    taskListEl.querySelectorAll('input[type="checkbox"]').forEach((chk) => {
      chk.addEventListener('change', (e) => {
        const id = parseInt(e.target.getAttribute('data-id'));
        const targetTask = tasks.find((t) => t.id === id);
        if (targetTask) {
          targetTask.completed = e.target.checked;
          renderTasks();
          if (window.playSfx) window.playSfx('click');
        }
      });
    });

    taskListEl.querySelectorAll('.delete-task-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(btn.getAttribute('data-id'));
        tasks = tasks.filter((t) => t.id !== id);
        renderTasks();
        showToast('Task removed from state', 'info');
        if (window.playSfx) window.playSfx('click');
      });
    });
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, function (m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
    });
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active', 'text-white', 'bg-indigo-600'));
      btn.classList.add('active', 'text-white', 'bg-indigo-600');
      currentCategory = btn.getAttribute('data-sandbox-filter');
      renderTasks();
      if (window.playSfx) window.playSfx('click');
    });
  });

  if (addTaskBtn && taskInput) {
    addTaskBtn.addEventListener('click', () => {
      const text = taskInput.value.trim();
      if (!text) return;

      const tagSelect = document.getElementById('sandboxTagSelect');
      const tag = tagSelect ? tagSelect.value : 'frontend';

      tasks.unshift({
        id: Date.now(),
        text,
        tag,
        completed: false
      });

      taskInput.value = '';
      renderTasks();
      showToast('New task added to state!', 'success');
      if (window.playSfx) window.playSfx('success');
    });

    taskInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') addTaskBtn.click();
    });
  }

  if (tabLiveBtn && tabCodeBtn && viewLive && viewCode) {
    tabLiveBtn.addEventListener('click', () => {
      tabLiveBtn.classList.add('active');
      tabCodeBtn.classList.remove('active');
      viewLive.classList.remove('hidden');
      viewCode.classList.add('hidden');
      if (window.playSfx) window.playSfx('click');
    });

    tabCodeBtn.addEventListener('click', () => {
      tabCodeBtn.classList.add('active');
      tabLiveBtn.classList.remove('active');
      viewLive.classList.add('hidden');
      viewCode.classList.remove('hidden');
      if (window.playSfx) window.playSfx('click');
    });
  }

  renderTasks();
}

/* ==========================================================================
   12. RECRUITER FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const btn = item.querySelector('.faq-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach((other) => other.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
        if (window.playSfx) window.playSfx('click');
      }
    });
  });
}

/* ==========================================================================
   13. TOAST NOTIFICATION UTILITY
   ========================================================================== */
function showToast(message, type = 'info') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';

  const iconColor = type === 'success' ? 'text-emerald-400' : type === 'error' ? 'text-rose-400' : 'text-cyan-400';
  const iconSymbol = type === 'success' ? '✔' : type === 'error' ? '✖' : 'ℹ';

  toast.innerHTML = `
    <span class="${iconColor} font-bold text-lg">${iconSymbol}</span>
    <span class="text-xs md:text-sm text-slate-200 font-medium">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 20);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 350);
  }, 3500);
}
