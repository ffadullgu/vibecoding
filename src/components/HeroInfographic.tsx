import React, { useState } from 'react';
import { Cpu, ShieldCheck, FileCode, Bot, ArrowRight, CheckCircle2, Zap, Layers, BookOpen } from 'lucide-react';
import { LayerType } from '../types';

interface HeroInfographicProps {
  onSelectLayer: (layer: LayerType) => void;
  onNavigate: (section: string) => void;
}

export const HeroInfographic: React.FC<HeroInfographicProps> = ({ onSelectLayer, onNavigate }) => {
  const [activeCycleStep, setActiveCycleStep] = useState<number>(0);

  const cycleSteps = [
    {
      id: 'models' as LayerType,
      num: '01',
      title: 'Modelos de Código',
      label: 'Motor de Inferencia',
      desc: 'Pesos neuronales optimizados para sintaxis y razonamiento algorítmico (DeepSeek-R1, Sonnet 3.7, Qwen2.5-Coder).',
      tech: 'vLLM · LoRA · Unsloth · llama.cpp · GGUF/AWQ',
      metric: 'Hasta 70.3% SWE-bench',
      color: 'border-cyan-500/40 text-cyan-400 bg-cyan-950/20'
    },
    {
      id: 'harness' as LayerType,
      num: '02',
      title: 'Arnés de Pruebas',
      label: 'Escudo de Invariantes',
      desc: 'Sandbox Docker efímero que intercepta compilación, linter y tests para obligar al modelo a auto-repararse antes de tocar Git.',
      tech: 'Docker · Vitest · Tree-sitter · Fail-Fast Runner',
      metric: 'Zero-Regression Gate',
      color: 'border-emerald-500/40 text-emerald-400 bg-emerald-950/20'
    },
    {
      id: 'assistants' as LayerType,
      num: '03',
      title: 'Asistentes de Contexto',
      label: 'Memoria & AST',
      desc: 'Compresión del repositorio en grafos de dependencias AST y reglas jerárquicas persistentes (.cursorrules, .claude/rules).',
      tech: 'Repomix · AST Maps · Cursor Rules · Memory Files',
      metric: '200K - 2M Tokens Context',
      color: 'border-purple-500/40 text-purple-400 bg-purple-950/20'
    },
    {
      id: 'agents' as LayerType,
      num: '04',
      title: 'Agentes Autónomos',
      label: 'Ciclo ReAct & MCP',
      desc: 'Ejecución multi-archivo y llamadas a herramientas (bash, DB, git) mediante el protocolo abierto MCP con supervisión humana.',
      tech: 'MCP Protocol · Claude Code · Aider · ReAct Loop',
      metric: 'End-to-End Pull Requests',
      color: 'border-amber-500/40 text-amber-400 bg-amber-950/20'
    }
  ];

  return (
    <section id="inicio" className="relative pt-12 pb-16 px-6 max-w-7xl mx-auto">
      {/* Editorial Headline */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <div className="text-xs uppercase tracking-widest text-cyan-400 font-semibold mb-3">
          Infografía de Arquitectura & Manual de Desarrollo Senior
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6 text-balance leading-tight">
          La Matriz Definitiva de AI Coding & Vibe Coding Profesional
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Comparativa técnica rigurosa de herramientas líderes (Claude, DeepSeek, OpenCode, Cursor, Grok, Gemini) y la arquitectura en 4 capas para construir modelos, arneses de pruebas, asistentes y agentes autónomos sin alucinaciones.
        </p>

        {/* Clean Unboxed Metadata Strip (Zero-Pill Discipline) */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-slate-400 font-mono">
          <span>7 Plataformas Evaluadas</span>
          <span aria-hidden="true" className="text-slate-600">/</span>
          <span>4 Capas de Ingeniería</span>
          <span aria-hidden="true" className="text-slate-600">/</span>
          <span>6 Manuales Paso a Paso</span>
          <span aria-hidden="true" className="text-slate-600">/</span>
          <span>8 Plantillas de Prompts de Producción</span>
        </div>
      </div>

      {/* Main Interactive Visual Infographic: The 4-Layer Engineering Lifecycle */}
      <div className="border border-slate-800 bg-slate-900/60 rounded-xl p-6 sm:p-8 mb-12 shadow-2xl backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              <span>Infografía Visual: El Ciclo de Ingeniería de Software Asistida por IA</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Haz clic en cada cuadrante para explorar el flujo de retroalimentación determinista entre el modelo y el código.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
            <span className="text-cyan-400 font-semibold">Flujo:</span>
            <span>Idea ➔ Razonamiento ➔ Sandbox ➔ AST ➔ Auto-Commit</span>
          </div>
        </div>

        {/* Visual 4-Step Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
          {cycleSteps.map((step, idx) => {
            const isSelected = activeCycleStep === idx;
            return (
              <div
                key={step.id}
                onClick={() => {
                  setActiveCycleStep(idx);
                  onSelectLayer(step.id);
                }}
                className={`relative p-5 rounded-lg border transition-all cursor-pointer text-left ${
                  isSelected
                    ? `${step.color} ring-1 ring-cyan-400/50 shadow-lg`
                    : 'border-slate-800 bg-slate-950/40 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-slate-400">FASE {step.num}</span>
                  <span className="text-xs font-mono text-slate-300 font-medium">{step.metric}</span>
                </div>

                <h3 className="text-base font-bold text-white mb-1">{step.title}</h3>
                <div className="text-xs text-cyan-300 font-medium mb-3">{step.label}</div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-3">
                  {step.desc}
                </p>

                <div className="pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-400">
                  <span className="text-slate-500">Stack: </span>
                  {step.tech}
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Detail of Selected Cycle Step */}
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400">
              {activeCycleStep === 0 && <Cpu className="w-5 h-5" />}
              {activeCycleStep === 1 && <ShieldCheck className="w-5 h-5 text-emerald-400" />}
              {activeCycleStep === 2 && <FileCode className="w-5 h-5 text-purple-400" />}
              {activeCycleStep === 3 && <Bot className="w-5 h-5 text-amber-400" />}
            </div>
            <div>
              <div className="text-sm font-bold text-white">
                Fase Seleccionada: {cycleSteps[activeCycleStep].title}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                {cycleSteps[activeCycleStep].desc}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => {
                onSelectLayer(cycleSteps[activeCycleStep].id);
                onNavigate('capas');
              }}
              className="w-full md:w-auto px-4 py-2 text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Ver Arquitectura & Código Completo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Access Anchor Navigation Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => onNavigate('comparativa')}
          className="p-3.5 bg-slate-900/60 hover:bg-slate-850 border border-slate-800 rounded-lg text-left transition-colors cursor-pointer group"
        >
          <div className="text-xs font-mono text-cyan-400 group-hover:translate-x-0.5 transition-transform">01. MATRIZ</div>
          <div className="text-sm font-semibold text-white mt-1">Comparativa de IAs</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Claude, DeepSeek, Cursor y más</div>
        </button>

        <button
          onClick={() => onNavigate('capas')}
          className="p-3.5 bg-slate-900/60 hover:bg-slate-850 border border-slate-800 rounded-lg text-left transition-colors cursor-pointer group"
        >
          <div className="text-xs font-mono text-emerald-400 group-hover:translate-x-0.5 transition-transform">02. CAPAS</div>
          <div className="text-sm font-semibold text-white mt-1">Cómo Crear Cada Capa</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Modelos, Arnés, Asistentes, Agentes</div>
        </button>

        <button
          onClick={() => onNavigate('manuales')}
          className="p-3.5 bg-slate-900/60 hover:bg-slate-850 border border-slate-800 rounded-lg text-left transition-colors cursor-pointer group"
        >
          <div className="text-xs font-mono text-purple-400 group-hover:translate-x-0.5 transition-transform">03. GUÍAS</div>
          <div className="text-sm font-semibold text-white mt-1">Manuales Operativos</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Configuración CLI y editores</div>
        </button>

        <button
          onClick={() => onNavigate('prompts')}
          className="p-3.5 bg-slate-900/60 hover:bg-slate-850 border border-slate-800 rounded-lg text-left transition-colors cursor-pointer group"
        >
          <div className="text-xs font-mono text-amber-400 group-hover:translate-x-0.5 transition-transform">04. PROMPTS</div>
          <div className="text-sm font-semibold text-white mt-1">Bóveda de Prompts</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Plantillas de producción listas</div>
        </button>
      </div>
    </section>
  );
};
