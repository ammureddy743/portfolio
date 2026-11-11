import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { playSfx } from '../utils/sound';

export const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What is your current notice period & availability?',
      answer: 'I am available to join immediately for full-time frontend and mobile application engineering roles. I can integrate smoothly into your team\'s existing Git workflows and sprint cycles.',
    },
    {
      question: 'Are you open to on-site, hybrid, or remote positions?',
      answer: 'Yes! I am located in Hyderabad, Telangana and open to Hyderabad on-site / hybrid roles as well as remote opportunities across India and globally.',
    },
    {
      question: 'How does your ServiceNow CSA certification complement frontend engineering?',
      answer: 'My primary passion is building modern React & React Native user interfaces. The ServiceNow CSA certification brings valuable enterprise maturity: deep knowledge of enterprise data models, automated catalog workflows, ITIL standards, and business rules.',
    },
  ];

  const handleToggle = (idx: number) => {
    playSfx('click');
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="px-6 sm:px-10 lg:px-16 py-20 border-b border-zinc-800/60">
      <div className="max-w-3xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <span className="text-orange-500 font-bold text-xs uppercase tracking-widest font-mono">
            Fast-Track Hiring
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Recruiter FAQ</h2>
          <p className="text-zinc-400 text-sm">
            Quick answers to the top questions hiring managers ask.
          </p>
        </div>

        {/* Accordion Items */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx} 
                className="figma-card p-5 cursor-pointer select-none"
                onClick={() => handleToggle(idx)}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm sm:text-base text-white">{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${isOpen ? 'rotate-180 text-orange-500' : ''}`} />
                </div>
                {isOpen && (
                  <div className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed pt-3 border-t border-zinc-800/80">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

