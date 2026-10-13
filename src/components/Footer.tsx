import React from 'react';
import { Terminal } from 'lucide-react';

interface FooterProps {
  onNavigate: (section: string) => void;
  onOpenExport: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenExport }) => {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-400">
        <div className="flex items-center gap-2 text-slate-300">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span className="font-bold text-white">VibeCoder Matrix</span>
          <span aria-hidden="true" className="text-slate-700">·</span>
          <span>Manual de Ingeniería de Software con IA</span>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <button
            onClick={() => onNavigate('comparativa')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Matriz Comparativa
          </button>
          <button
            onClick={() => onNavigate('capas')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Las 4 Capas
          </button>
          <button
            onClick={() => onNavigate('manuales')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Manuales Operativos
          </button>
          <button
            onClick={() => onNavigate('prompts')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Bóveda de Prompts
          </button>
          <button
            onClick={onOpenExport}
            className="hover:text-cyan-400 text-cyan-500 font-semibold transition-colors cursor-pointer"
          >
            Descargar Markdown
          </button>
        </div>

        <div className="text-slate-400 font-mono">
          © 2026 AI Coding Architecture Guide
        </div>
      </div>
    </footer>
  );
};
