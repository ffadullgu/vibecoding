import React, { useState } from 'react';
import { Copy, Check, Sparkles, Filter, SlidersHorizontal, Terminal, Lightbulb, Play } from 'lucide-react';
import { PROMPT_TEMPLATES } from '../data/prompts';
import { PromptTemplate } from '../types';

export const PromptVault: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePromptId, setActivePromptId] = useState<string>(PROMPT_TEMPLATES[0].id);
  const [variableValues, setVariableValues] = useState<Record<string, Record<string, string>>>(() => {
    const initial: Record<string, Record<string, string>> = {};
    PROMPT_TEMPLATES.forEach(p => {
      initial[p.id] = {};
      p.variables.forEach(v => {
        initial[p.id][v.key] = v.defaultValue;
      });
    });
    return initial;
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'Vibe Coding Rápido', label: 'Vibe Coding' },
    { id: 'Arnés de Test', label: 'Arnés de Test' },
    { id: 'Refactor Seguro', label: 'Refactor Seguro' },
    { id: 'Agente ReAct / MCP', label: 'Agentes & MCP' },
    { id: 'Asistente & Contexto', label: 'Contexto & AST' },
    { id: 'Debugging Extremo', label: 'Debugging' }
  ];

  const filteredPrompts = PROMPT_TEMPLATES.filter(p => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  const activePrompt = PROMPT_TEMPLATES.find(p => p.id === activePromptId) || PROMPT_TEMPLATES[0];

  const handleVariableChange = (promptId: string, key: string, value: string) => {
    setVariableValues(prev => ({
      ...prev,
      [promptId]: {
        ...(prev[promptId] || {}),
        [key]: value
      }
    }));
  };

  const getInterpolatedUserPrompt = (prompt: PromptTemplate) => {
    let result = prompt.userPromptTemplate;
    const currentVars = variableValues[prompt.id] || {};
    prompt.variables.forEach(v => {
      const val = currentVars[v.key] ?? v.defaultValue;
      result = result.replace(new RegExp(`{{${v.key}}}`, 'g'), val);
    });
    return result;
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="prompts" className="py-16 px-6 max-w-7xl mx-auto border-t border-slate-900">
      {/* Header */}
      <div className="mb-8">
        <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-2">
          04. Bóveda de Prompts de Alta Precisión
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Plantillas de Prompts de Nivel Senior con Parámetros Dinámicos
        </h2>
        <p className="text-sm text-slate-400 mt-2 max-w-2xl">
          Diseñados para eliminar alucinaciones, forzar verificación de invariantes y desacoplar la lógica de presentación. Personaliza las variables en vivo y cópialos con un clic.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-8 border-b border-slate-800">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/40'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Prompt Selector Grid & Active Prompt Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Prompt Selector List (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-mono text-slate-400 font-semibold mb-1">
            Plantillas Disponibles ({filteredPrompts.length})
          </div>
          {filteredPrompts.map((p) => {
            const isSelected = p.id === activePrompt.id;
            return (
              <div
                key={p.id}
                onClick={() => setActivePromptId(p.id)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-cyan-500/50 bg-slate-900 shadow-md ring-1 ring-cyan-500/20'
                    : 'border-slate-800 bg-slate-950 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                  <span className="text-cyan-400">{p.category}</span>
                </div>
                <h4 className="text-xs font-bold text-white mb-1.5 leading-snug">
                  {p.title}
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {p.summary}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right Side: Interactive Prompt Customizer & Preview (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl shadow-lg">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">{activePrompt.title}</h3>
                <div className="text-xs text-slate-400 mt-0.5">
                  Diseñado para: <span className="text-cyan-300 font-semibold">{activePrompt.targetPlatform}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const fullPrompt = `${activePrompt.systemPrompt}\n\n---\n\n${getInterpolatedUserPrompt(activePrompt)}`;
                    handleCopy(fullPrompt, 'full');
                  }}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  {copiedId === 'full' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-slate-900" />
                      <span>¡Copiado al Portapapeles!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Prompt Completo</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Variable parameter form */}
            <div className="mt-5 p-4 bg-slate-950/80 border border-slate-850 rounded-lg space-y-3.5">
              <div className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Personaliza los Parámetros Dinámicos:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activePrompt.variables.map((variable) => (
                  <div key={variable.key} className="space-y-1">
                    <label className="text-[11px] font-mono text-slate-400 block truncate">
                      {variable.label} <span className="text-cyan-500">({`{{${variable.key}}}`})</span>
                    </label>
                    <input
                      type="text"
                      value={variableValues[activePrompt.id]?.[variable.key] ?? variable.defaultValue}
                      onChange={(e) => handleVariableChange(activePrompt.id, variable.key, e.target.value)}
                      className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* System Prompt Box */}
            <div className="mt-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-slate-300">
                  1. System Prompt (Directiva Inmutable)
                </span>
                <button
                  onClick={() => handleCopy(activePrompt.systemPrompt, 'system')}
                  className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {copiedId === 'system' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedId === 'system' ? 'Copiado' : 'Copiar System'}</span>
                </button>
              </div>
              <pre className="p-3.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-300 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-48">
                <code>{activePrompt.systemPrompt}</code>
              </pre>
            </div>

            {/* Interpolated User Prompt Preview */}
            <div className="mt-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-slate-300">
                  2. User Prompt (Con tus Parámetros Inyectados)
                </span>
                <button
                  onClick={() => handleCopy(getInterpolatedUserPrompt(activePrompt), 'user')}
                  className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {copiedId === 'user' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedId === 'user' ? 'Copiado' : 'Copiar User'}</span>
                </button>
              </div>
              <pre className="p-3.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-cyan-200/90 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-56">
                <code>{getInterpolatedUserPrompt(activePrompt)}</code>
              </pre>
            </div>

            {/* Expected Result & Senior Tip */}
            <div className="mt-5 pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-950/60 rounded border border-slate-850">
                <div className="font-semibold text-slate-300 mb-1">Resultado Técnico Esperado:</div>
                <div className="text-slate-400 leading-relaxed">{activePrompt.expectedResult}</div>
              </div>
              <div className="p-3 bg-slate-950/60 rounded border border-slate-850">
                <div className="font-semibold text-emerald-400 flex items-center gap-1 mb-1">
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Consejo de Producción:</span>
                </div>
                <div className="text-slate-400 leading-relaxed">{activePrompt.seniorTip}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
