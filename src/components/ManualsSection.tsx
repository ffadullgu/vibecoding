import React, { useState } from 'react';
import { Terminal, Copy, Check, BookOpen, AlertCircle, Wrench, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { MANUAL_GUIDES } from '../data/manuals';
import { PlatformId } from '../types';

interface ManualsSectionProps {
  selectedPlatformId: PlatformId;
  onSelectPlatform: (id: PlatformId) => void;
}

export const ManualsSection: React.FC<ManualsSectionProps> = ({ selectedPlatformId, onSelectPlatform }) => {
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);

  const activeManual = MANUAL_GUIDES.find(m => m.platformId === selectedPlatformId) || MANUAL_GUIDES[0];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippetId(id);
    setTimeout(() => setCopiedSnippetId(null), 2000);
  };

  const platforms = [
    { id: 'claude' as PlatformId, name: 'Claude Code CLI & Sonnet 3.7' },
    { id: 'deepseek' as PlatformId, name: 'DeepSeek-R1 / V3' },
    { id: 'opencode' as PlatformId, name: 'OpenCode & Aider' },
    { id: 'cursor' as PlatformId, name: 'Cursor & Windsurf' },
    { id: 'grok' as PlatformId, name: 'Grok 3 (xAI)' },
    { id: 'gemini' as PlatformId, name: 'Gemini 2.5 (2M Tokens)' }
  ];

  return (
    <section id="manuales" className="py-16 px-6 max-w-7xl mx-auto border-t border-slate-900">
      {/* Header */}
      <div className="mb-8">
        <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-2">
          03. Manuales Técnicos de Operación Diaria
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Manuales de Configuración e Integración por IA
        </h2>
        <p className="text-sm text-slate-400 mt-2 max-w-2xl">
          Instrucciones exhaustivas, comandos de consola, archivos de configuración recomendados y soluciones a problemas comunes para cada plataforma.
        </p>
      </div>

      {/* Platform Selector Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 border-b border-slate-800">
        {platforms.map((p) => {
          const isActive = p.id === activeManual.platformId;
          return (
            <button
              key={p.id}
              onClick={() => onSelectPlatform(p.id)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {p.name}
            </button>
          );
        })}
      </div>

      {/* Manual Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Overview, Installation & Configuration Steps (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Overview Box */}
          <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl shadow-lg">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
              <h3 className="text-xl font-bold text-white tracking-tight">
                {activeManual.title}
              </h3>
              <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Setup: {activeManual.timeToSetup}</span>
                </span>
                <span aria-hidden="true">·</span>
                <span className="text-amber-400">Nivel: {activeManual.difficulty}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
              {activeManual.architectureOverview}
            </p>

            {/* Prerequisites */}
            <div className="p-4 bg-slate-950/80 border border-slate-850 rounded-lg">
              <div className="text-xs font-bold text-slate-300 mb-2">Requisitos Previos:</div>
              <ul className="space-y-1 text-xs text-slate-400 pl-1">
                {activeManual.prerequisites.map((req, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-cyan-400">✓</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quick Installation Commands */}
          <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Comandos de Instalación & Arranque Rápido</span>
              </h4>
              <button
                onClick={() => handleCopy(activeManual.installationCommands.join('\n'), 'install-all')}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
              >
                {copiedSnippetId === 'install-all' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Todos</span>
                  </>
                )}
              </button>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-xs text-slate-300 space-y-1.5 overflow-x-auto">
              {activeManual.installationCommands.map((cmd, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-cyan-500 select-none">$</span>
                  <span className={cmd.startsWith('#') ? 'text-slate-500 italic' : 'text-slate-200'}>{cmd}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step-by-Step Configuration Guides */}
          <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl shadow-lg space-y-6">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Wrench className="w-4 h-4 text-cyan-400" />
              <span>Configuración Avanzada Paso a Paso</span>
            </h4>

            <div className="space-y-6">
              {activeManual.configurationSteps.map((step) => (
                <div key={step.stepNumber} className="border-t border-slate-800 pt-5 first:border-0 first:pt-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                      Paso {step.stepNumber}
                    </span>
                    <h5 className="text-xs sm:text-sm font-bold text-white">{step.title}</h5>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {step.explanation}
                  </p>

                  {step.codeContent && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between px-3 py-1.5 bg-slate-950 border-t border-x border-slate-800 rounded-t text-[11px] font-mono text-slate-400">
                        <span>{step.codeFile || 'Configuración'}</span>
                        <button
                          onClick={() => handleCopy(step.codeContent!, `step-${step.stepNumber}`)}
                          className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                        >
                          {copiedSnippetId === `step-${step.stepNumber}` ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copiado</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copiar Archivo</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="p-3 bg-slate-950/90 border border-slate-800 rounded-b text-[11px] font-mono text-slate-300 overflow-x-auto leading-relaxed max-h-60">
                        <code>{step.codeContent}</code>
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Vibe Coding Workflow & Troubleshooting (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Vibe Coding Workflow Map */}
          <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl shadow-lg">
            <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Flujo de Vibe Coding Recomendado</span>
            </h4>

            <div className="space-y-4">
              {activeManual.vibeCodingWorkflow.map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-950/60 border border-slate-850 rounded-lg text-xs space-y-1.5">
                  <div className="font-bold text-cyan-300">{item.phase}</div>
                  <div className="text-slate-300">
                    <span className="text-slate-500 font-mono">Tú: </span>
                    {item.developerAction}
                  </div>
                  <div className="text-slate-400">
                    <span className="text-cyan-500 font-mono">IA: </span>
                    {item.aiAction}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Troubleshooting and Edge Cases */}
          <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl shadow-lg">
            <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400" />
              <span>Resolución de Problemas Frecuentes</span>
            </h4>

            <div className="space-y-3.5">
              {activeManual.troubleshootingTips.map((tip, idx) => (
                <div key={idx} className="p-3 bg-slate-950/60 border border-slate-850 rounded-lg text-xs space-y-1.5">
                  <div className="font-semibold text-rose-300 flex items-start gap-1.5">
                    <span className="text-rose-500 font-bold shrink-0">!</span>
                    <span>{tip.problem}</span>
                  </div>
                  <div className="text-slate-300 pl-3 border-l border-slate-800 leading-relaxed">
                    {tip.solution}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
