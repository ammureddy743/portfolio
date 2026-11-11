import React, { useState } from 'react';
import { Project } from '../types';
import { X, CheckCircle2 } from 'lucide-react';
import { playSfx } from '../utils/sound';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [weight, setWeight] = useState<number>(65);
  const [calcResult, setCalcResult] = useState<string>('Recommended Water Intake: ~2.3 Liters / day');

  if (!project) return null;

  const handleCalculateWater = () => {
    playSfx('success');
    const res = (weight * 0.035).toFixed(1);
    setCalcResult(`Recommended Water Intake: ~${res} Liters / day (Based on ${weight}kg)`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="figma-card w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-zinc-950 border border-zinc-800 p-6 sm:p-8 space-y-6 relative rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-zinc-800 pb-4">
          <div>
            <span className="text-xs font-mono text-orange-500 font-bold uppercase tracking-wider block">
              {project.badge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">{project.title}</h2>
            <p className="text-xs font-mono text-zinc-400 mt-1">{project.tag}</p>
          </div>
          <button 
            onClick={() => { playSfx('click'); onClose(); }}
            className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {project.metrics.map((m, idx) => (
            <div key={idx} className="p-3.5 bg-zinc-900 rounded-xl border border-zinc-800">
              <span className="text-[11px] text-zinc-400 block font-medium">{m.label}</span>
              <span className="text-sm sm:text-base font-bold text-white mt-0.5 block">{m.val}</span>
            </div>
          ))}
        </div>

        {/* Overview & Key Highlights */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Overview</h4>
          <p className="text-zinc-300 text-sm leading-relaxed">{project.description}</p>
          
          <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono pt-2">Key Contributions</h4>
          <ul className="space-y-2">
            {project.highlights.map((h, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Interactive Simulator Widget */}
        <div className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800/80 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800 text-xs text-zinc-400">
            <span className="font-mono font-bold text-orange-400">⚡ Live Interactive Feature Simulator</span>
            <span className="font-mono text-zinc-500">React State Active</span>
          </div>

          {project.id === 'fittrack-platform' && (
            <div className="space-y-3 text-xs">
              <p className="text-zinc-400">Test the daily hydration calculator widget:</p>
              <div className="flex flex-wrap items-center gap-2">
                <input 
                  type="number" 
                  value={weight} 
                  onChange={(e) => setWeight(Number(e.target.value))}
                  placeholder="Weight (kg)" 
                  className="bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-1.5 text-white w-28 text-xs outline-none focus:border-orange-500"
                />
                <button 
                  onClick={handleCalculateWater}
                  className="btn-orange text-xs py-1.5 px-3"
                >
                  Calculate Daily Water
                </button>
              </div>
              <div className="p-2.5 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-400 font-mono font-semibold">
                {calcResult}
              </div>
            </div>
          )}

          {project.id === 'team-connect-web' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800">
                <div className="text-zinc-400">Active Sprints</div>
                <div className="text-xl font-bold text-white mt-1">12 Tasks</div>
                <div className="text-emerald-400 text-[10px] mt-1">↑ 4 Completed today</div>
              </div>
              <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800">
                <div className="text-zinc-400">Team Members</div>
                <div className="text-xl font-bold text-white mt-1">28 Online</div>
                <div className="text-cyan-400 text-[10px] mt-1">Synced web & mobile</div>
              </div>
              <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800">
                <div className="text-zinc-400">UI Render Score</div>
                <div className="text-xl font-bold text-emerald-400 mt-1">98/100</div>
                <div className="text-zinc-400 text-[10px] mt-1">Vite Optimized</div>
              </div>
            </div>
          )}

          {project.id === 'team-connect-mobile' && (
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800">
                <div className="font-bold text-white text-sm">💬 Team Connect Quick Chat</div>
                <div className="mt-2 space-y-2">
                  <div className="p-2 bg-zinc-800 rounded text-zinc-300">
                    "New UI components for dashboard pushed to staging!"
                  </div>
                  <div className="p-2 bg-orange-600/20 text-orange-300 rounded text-right">
                    "Tested on both iOS & Android — smooth 60fps."
                  </div>
                </div>
              </div>
            </div>
          )}

          {project.id === 'qtrans-translation' && (
            <div className="space-y-2 text-xs font-mono">
              <div className="p-2.5 bg-zinc-950 rounded border border-zinc-800 text-zinc-300">
                <span className="text-orange-400 font-bold">Input (EN):</span> "Explain the principles of Object-Oriented Programming with examples."
              </div>
              <div className="p-2.5 bg-emerald-950/40 rounded border border-emerald-600/30 text-emerald-300">
                <span className="text-emerald-400 font-bold">QTrans Processed (Telugu/Hindi):</span> "ఉదాహరణలతో ఆబ్జెక్ట్-ఓరియెంటెడ్ ప్రోగ్రామింగ్ సూత్రాలను వివరించండి."
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
          <button 
            onClick={() => { playSfx('click'); onClose(); }}
            className="btn-outline text-xs py-2 px-4"
          >
            Close Preview
          </button>
        </div>

      </div>
    </div>
  );
};
