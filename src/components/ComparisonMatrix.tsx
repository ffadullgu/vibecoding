import React, { useState } from 'react';
import { Search, CheckCircle2, XCircle, ArrowUpRight, Terminal, Shield, Sparkles, Filter, SlidersHorizontal, ChevronRight, Copy, Check } from 'lucide-react';
import { AI_CODING_PLATFORMS } from '../data/platforms';
import { AICodingPlatform, PlatformId } from '../types';

interface ComparisonMatrixProps {
  onOpenManual: (platformId: PlatformId) => void;
}

export const ComparisonMatrix: React.FC<ComparisonMatrixProps> = ({ onOpenManual }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'terminal' | 'ide' | 'local' | 'cloud'>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredPlatforms = AI_CODING_PLATFORMS.filter(p => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.bestFor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.flagshipModel.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'terminal') return p.category.includes('Terminal');
    if (selectedFilter === 'ide') return p.category.includes('IDE');
    if (selectedFilter === 'local') return p.offlineCapable || p.executionMode.includes('Local');
    if (selectedFilter === 'cloud') return p.executionMode === 'Cloud';
    return true;
  });

  const handleCopyCommand = (command: string, id: string) => {
    navigator.clipboard.writeText(command);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="comparativa" className="py-16 px-6 max-w-7xl mx-auto border-t border-slate-900">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-2">
            01. Matriz Técnica Comparativa
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            AI Coding & Vibe Coding: Evaluación de Plataformas
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-2xl">
            Análisis exhaustivo de capacidades de razonamiento, autonomía multi-archivo, privacidad, costo de inferencia y soporte para el protocolo MCP.
          </p>
        </div>

        {/* View Toggle: Functional segmented control */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg shrink-0">
          <button
            onClick={() => setViewMode('cards')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              viewMode === 'cards' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Fichas Técnicas
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              viewMode === 'table' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Tabla Comparativa
          </button>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por modelo, fabricante, soporte MCP..."
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
          />
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap cursor-pointer ${
              selectedFilter === 'all'
                ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Todos ({AI_CODING_PLATFORMS.length})
          </button>
          <button
            onClick={() => setSelectedFilter('terminal')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap cursor-pointer ${
              selectedFilter === 'terminal'
                ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Agentes Terminal (CLI)
          </button>
          <button
            onClick={() => setSelectedFilter('ide')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap cursor-pointer ${
              selectedFilter === 'ide'
                ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            IDEs Nativos
          </button>
          <button
            onClick={() => setSelectedFilter('local')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap cursor-pointer ${
              selectedFilter === 'local'
                ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            100% Local / Privado
          </button>
          <button
            onClick={() => setSelectedFilter('cloud')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap cursor-pointer ${
              selectedFilter === 'cloud'
                ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Nube Pura
          </button>
        </div>
      </div>

      {/* Cards View */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlatforms.map((platform) => (
            <div
              key={platform.id}
              className="border border-slate-800 bg-slate-900/60 rounded-xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all hover:shadow-xl"
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">{platform.name}</h3>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {platform.vendor} · <span className="text-cyan-400">{platform.category}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      {platform.sweBenchScore}
                    </span>
                  </div>
                </div>

                {/* Flagship model & specs */}
                <div className="p-3 bg-slate-950/70 border border-slate-850 rounded-lg text-xs space-y-1.5 mb-4">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-500 font-mono">Modelo Base:</span>
                    <span className="font-semibold text-white text-right truncate max-w-[200px]">{platform.flagshipModel}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-500 font-mono">Context Window:</span>
                    <span className="font-mono tabular-nums text-cyan-300">{platform.contextWindow}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-500 font-mono">Modo de Ejecución:</span>
                    <span className="text-slate-300">{platform.executionMode}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-500 font-mono">Tarifa / Costo:</span>
                    <span className="font-mono text-emerald-300">{platform.costTier}</span>
                  </div>
                </div>

                {/* Best for */}
                <div className="text-xs text-slate-300 mb-4 pb-4 border-b border-slate-800 leading-relaxed">
                  <span className="text-slate-400 font-semibold block mb-1">Ideal Para:</span>
                  {platform.bestFor}
                </div>

                {/* Strengths & Weaknesses (Clear, direct, no fluff) */}
                <div className="space-y-4 mb-5 text-xs">
                  <div>
                    <div className="text-emerald-400 font-semibold flex items-center gap-1.5 mb-2">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Ventajas Técnicas Clave</span>
                    </div>
                    <ul className="space-y-1.5 pl-1 text-slate-300">
                      {platform.strengths.slice(0, 3).map((str, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-emerald-500 font-bold">·</span>
                          <span className="leading-snug">{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="text-rose-400 font-semibold flex items-center gap-1.5 mb-2">
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Desventajas & Límites</span>
                    </div>
                    <ul className="space-y-1.5 pl-1 text-slate-400">
                      {platform.weaknesses.slice(0, 2).map((weak, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-rose-500 font-bold">·</span>
                          <span className="leading-snug">{weak}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Bottom Actions: CLI copy and Manual open */}
              <div className="pt-4 border-t border-slate-850 space-y-3">
                {platform.cliCommand && (
                  <div className="flex items-center justify-between gap-2 p-2 bg-slate-950 rounded border border-slate-850 text-[11px] font-mono text-slate-400">
                    <span className="truncate">{platform.cliCommand}</span>
                    <button
                      onClick={() => handleCopyCommand(platform.cliCommand!, platform.id)}
                      className="p-1 text-slate-400 hover:text-white transition-colors shrink-0 cursor-pointer"
                      title="Copiar comando"
                    >
                      {copiedId === platform.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                )}

                <button
                  onClick={() => onOpenManual(platform.id)}
                  className="w-full py-2 px-3 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Abrir Manual Completo</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* High-Density Table View */}
      {viewMode === 'table' && (
        <div className="border border-slate-800 bg-slate-900/60 rounded-xl overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-mono">
                  <th className="py-3 px-4 font-semibold">Plataforma / Modelo</th>
                  <th className="py-3 px-4 font-semibold">Ejecución</th>
                  <th className="py-3 px-4 font-semibold">SWE-bench Verified</th>
                  <th className="py-3 px-4 font-semibold">Contexto</th>
                  <th className="py-3 px-4 font-semibold">Soporte MCP</th>
                  <th className="py-3 px-4 font-semibold">Refactor Multi-Archivo</th>
                  <th className="py-3 px-4 font-semibold">Nivel Costo</th>
                  <th className="py-3 px-4 font-semibold text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850 text-slate-300">
                {filteredPlatforms.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-850/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-white">{p.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono truncate max-w-xs">{p.flagshipModel}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-slate-300">{p.executionMode}</span>
                    </td>
                    <td className="py-3 px-4 font-mono tabular-nums text-emerald-400 font-semibold">
                      {p.sweBenchScore}
                    </td>
                    <td className="py-3 px-4 font-mono tabular-nums text-cyan-300">
                      {p.contextWindow}
                    </td>
                    <td className="py-3 px-4">
                      {p.mcpSupport ? (
                        <span className="text-emerald-400 font-mono font-medium">Nativo MCP</span>
                      ) : (
                        <span className="text-slate-500 font-mono">No disponible</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span>{p.multiFileRefactor}</span>
                    </td>
                    <td className="py-3 px-4 font-mono text-emerald-300">
                      {p.costTier}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => onOpenManual(p.id)}
                        className="py-1 px-2.5 text-xs font-semibold text-cyan-300 bg-cyan-950/40 border border-cyan-800/60 hover:bg-cyan-900/60 rounded transition-colors cursor-pointer"
                      >
                        Ver Guía
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};
