import React from 'react';
import { Download, Sparkles, Terminal } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenExport: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate, onOpenExport }) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-850">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#inicio" 
          onClick={(e) => { e.preventDefault(); onNavigate('inicio'); }}
          className="text-lg font-bold tracking-tight text-white hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <Terminal className="w-5 h-5 text-cyan-400" />
          <span>VibeCoder Matrix</span>
        </a>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => onNavigate('comparativa')}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
              activeSection === 'comparativa' ? 'border-cyan-400 text-white font-semibold' : 'border-transparent text-slate-400'
            }`}
          >
            Comparativa
          </button>
          <button
            onClick={() => onNavigate('capas')}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
              activeSection === 'capas' ? 'border-cyan-400 text-white font-semibold' : 'border-transparent text-slate-400'
            }`}
          >
            Las 4 Capas
          </button>
          <button
            onClick={() => onNavigate('manuales')}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
              activeSection === 'manuales' ? 'border-cyan-400 text-white font-semibold' : 'border-transparent text-slate-400'
            }`}
          >
            Manuales
          </button>
          <button
            onClick={() => onNavigate('prompts')}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
              activeSection === 'prompts' ? 'border-cyan-400 text-white font-semibold' : 'border-transparent text-slate-400'
            }`}
          >
            Bóveda de Prompts
          </button>
          <button
            onClick={() => onNavigate('calculadora')}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
              activeSection === 'calculadora' ? 'border-cyan-400 text-white font-semibold' : 'border-transparent text-slate-400'
            }`}
          >
            Calculadora de Stack
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenExport}
            className="px-4 py-2 text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar Guía Markdown</span>
          </button>
        </div>
      </div>
    </header>
  );
};
