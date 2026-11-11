import React, { useState } from 'react';
import { Mail, Phone, MapPin, Copy, Send, Check, Code2, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSfx } from '../utils/sound';

interface ContactProps {
  onNotify: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const Contact: React.FC<ContactProps> = ({ onNotify }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    playSfx('success');
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
      onNotify('Email copied to clipboard!', 'info');
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
      onNotify('Phone number copied to clipboard!', 'info');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      onNotify('Please fill out all required fields.', 'error');
      return;
    }

    playSfx('success');
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    // Save to local storage
    const messages = JSON.parse(localStorage.getItem('lk_contact_submissions') || '[]');
    messages.push({ ...formData, timestamp: new Date().toISOString() });
    localStorage.setItem('lk_contact_submissions', JSON.stringify(messages));

    onNotify(`Thank you, ${formData.name}! Your message has been sent to Lakshmi.`, 'success');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="px-6 sm:px-10 lg:px-16 py-20">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-orange-500 font-bold text-xs uppercase tracking-widest font-mono">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Together Let's Design Something Great</h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            I am currently open to full-time frontend &amp; mobile developer roles and technical collaborations.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left: Contact Info Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Email Card */}
            <div className="figma-card p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-zinc-400 block">Direct Email</span>
                  <a href="mailto:gurralaammureddy@gmail.com" className="text-white hover:text-orange-500 font-bold text-sm transition">
                    gurralaammureddy@gmail.com
                  </a>
                </div>
              </div>
              <button 
                onClick={() => handleCopy('gurralaammureddy@gmail.com', 'email')}
                className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white transition"
                title="Copy Email"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone Card */}
            <div className="figma-card p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-zinc-400 block">Phone / WhatsApp</span>
                  <a href="tel:+918919008619" className="text-white hover:text-orange-500 font-bold text-sm transition">
                    +91 8919008619
                  </a>
                </div>
              </div>
              <button 
                onClick={() => handleCopy('+918919008619', 'phone')}
                className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white transition"
                title="Copy Phone"
              >
                {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Location Card */}
            <div className="figma-card p-5 flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-zinc-400 block">Location</span>
                <span className="text-white font-bold text-sm">Hyderabad, Telangana, India</span>
              </div>
            </div>

            {/* Social Grid */}
            <div className="p-5 figma-card space-y-3">
              <span className="text-xs font-mono text-zinc-400 block uppercase font-semibold">
                Developer Profiles
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://linkedin.com/in/lakshmi-chandrakala-gurrala-710909255"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-orange-500 hover:border-orange-500 transition flex items-center justify-center"
                  title="LinkedIn"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 0 0 1.54-1.53c0-.85-.69-1.54-1.54-1.54a1.54 1.54 0 0 0-1.53 1.54c0 .84.69 1.53 1.53 1.53m1.4 9.74v-8.37H5.06v8.37z"/>
                  </svg>
                </a>
                <a
                  href="https://github.com/ammureddy743"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-orange-500 hover:border-orange-500 transition flex items-center justify-center"
                  title="GitHub"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                  </svg>
                </a>
                <a
                  href="https://leetcode.com/u/X2UeLl2I3Y/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-orange-500 hover:border-orange-500 transition"
                  title="LeetCode"
                >
                  <Code2 className="w-4 h-4" />
                </a>
                <a
                  href="https://hackerrank.com/profile/gurralaammureddy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-orange-500 hover:border-orange-500 transition"
                  title="HackerRank"
                >
                  <Award className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          {/* Right: Message Form (7 cols) */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="figma-card p-6 sm:p-8 space-y-5">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white">Send a Direct Message</h3>
                <p className="text-xs text-zinc-400">
                  Leave your details and opportunity details below. I reply promptly within 24 hours.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-300 block">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Recruiter / Hiring Manager"
                    className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs outline-none focus:border-orange-500 transition"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-300 block">Your Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. name@company.com"
                    className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs outline-none focus:border-orange-500 transition"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-300 block">Subject / Role Opportunity</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Frontend Engineer Position @ Company"
                  className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs outline-none focus:border-orange-500 transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-300 block">Message *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your team, tech stack, or project goals..."
                  className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs outline-none focus:border-orange-500 transition"
                />
              </div>

              <button type="submit" className="btn-orange text-xs py-3 px-6 w-full justify-center">
                <Send className="w-4 h-4" />
                <span>Send Message Directly</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
