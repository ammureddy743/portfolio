import React from 'react';
import { FileText, Download, X } from 'lucide-react';
import { playSfx } from '../utils/sound';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div 
        className="figma-card w-full max-w-4xl h-[90vh] flex flex-col bg-zinc-950 border border-zinc-800 p-0 overflow-hidden rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-orange-500" />
            <div>
              <h3 className="font-bold text-white text-sm">Lakshmi Chandrakala - Official Resume</h3>
              <span className="text-[11px] text-zinc-400 font-mono">
                Frontend Developer • React.js • React Native • ServiceNow CSA
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a 
              href="assets/Lakshmi_Chandrakala_Resume.pdf" 
              download 
              onClick={() => playSfx('success')}
              className="btn-orange text-xs py-1.5 px-3"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>
            <button 
              onClick={() => { playSfx('click'); onClose(); }}
              className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Embedded Iframe PDF Viewer */}
        <div className="flex-1 w-full bg-zinc-950 p-2 overflow-hidden">
          <iframe 
            src="assets/Lakshmi_Chandrakala_Resume.pdf" 
            className="w-full h-full rounded border border-zinc-800"
            title="Lakshmi Chandrakala Resume"
          />
        </div>
      </div>
    </div>
  );
};
