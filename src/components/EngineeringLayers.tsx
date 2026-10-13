import React, { useState } from 'react';
import { Cpu, ShieldCheck, FileCode, Bot, CheckCircle2, AlertTriangle, Lightbulb, Copy, Check, Code2 } from 'lucide-react';
import { ARCHITECTURE_LAYERS } from '../data/layers';
import { LayerType } from '../types';

interface EngineeringLayersProps {
  selectedLayer: LayerType;
  onSelectLayer: (layer: LayerType) => void;
}

export const EngineeringLayers: React.FC<EngineeringLayersProps> = ({ selectedLayer, onSelectLayer }) => {
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);

  const currentLayer = ARCHITECTURE_LAYERS.find(l => l.id === selectedLayer) || ARCHITECTURE_LAYERS[0];

  const handleCopyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(idx);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  const getLayerIcon = (id: LayerType) => {
    switch (id) {
      case 'models': return <Cpu className="w-4 h-4" />;
      case 'harness': return <ShieldCheck className="w-4 h-4" />;
      case 'assistants': return <FileCode className="w-4 h-4" />;
      case 'agents': return <Bot className="w-4 h-4" />;
    }
  };

  return (
    <section id="capas" className="py-16 px-6 max-w-7xl mx-auto border-t border-slate-900">
      {/* Header */}
      <div className="mb-8">
        <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-2">
          02. Arquitectura de Ingeniería de Software con IA
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Cómo Crear Modelos, Arnés de Test, Asistentes y Agentes
        </h2>
        <p className="text-sm text-slate-400 mt-2 max-w-3xl">
          La ingeniería de Vibe Coding no consiste en escribir texto en una caja de chat, sino en construir un sistema determinista por capas donde el modelo está contenido y validado por código.
        </p>
      </div>

      {/* Layer Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 mb-8">
        {ARCHITECTURE_LAYERS.map((layer) => {
          const isActive = layer.id === selectedLayer;
          return (
            <button
              key={layer.id}
              onClick={() => onSelectLayer(layer.id)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent'
              }`}
            >
              <span className={`p-1 rounded ${isActive ? 'bg-cyan-950 text-cyan-400' : 'text-slate-500'}`}>
                {getLayerIcon(layer.id)}
              </span>
              <span>Capa {layer.number}: {layer.title.split('(')[0].trim()}</span>
            </button>
          );
        })}
      </div>

      {/* Layer Content View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Core specs, objectives & step-by-step (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Layer Hero Card */}
          <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl shadow-lg">
            <div className="flex items-center justify-between gap-4 mb-3">
              <span className="text-xs font-mono font-bold text-cyan-400">FASE DE INGENIERÍA {currentLayer.number}</span>
              <span className="text-xs font-mono text-slate-400">{currentLayer.subtitle}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
              {currentLayer.title}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-5">
              {currentLayer.description}
            </p>

            <div className="p-3.5 bg-slate-950/80 border border-slate-850 rounded-lg">
              <div className="text-xs font-mono text-cyan-400 font-semibold mb-1">Objetivo Central de la Capa:</div>
              <div className="text-xs text-slate-300 leading-snug font-medium">
                {currentLayer.coreObjective}
              </div>
            </div>
          </div>

          {/* Step by step implementation guide */}
          <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl shadow-lg">
            <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-cyan-400" />
              <span>Guía Paso a Paso de Construcción</span>
            </h4>

            <div className="space-y-4">
              {currentLayer.stepByStepGuide.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3.5 p-3.5 bg-slate-950/60 border border-slate-850 rounded-lg">
                  <div className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/60 px-2 py-1 rounded border border-cyan-800/40 shrink-0">
                    {step.step}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white mb-1">{step.title}</div>
                    <div className="text-xs text-slate-300 leading-relaxed">{step.action}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Golden Rules and Pro Tips */}
          <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl shadow-lg space-y-5">
            <div>
              <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5 mb-2.5">
                <AlertTriangle className="w-4 h-4" />
                <span>Reglas Inmutables de la Capa</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300 pl-1">
                {currentLayer.criticalRules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">·</span>
                    <span className="leading-snug">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 mb-2.5">
                <Lightbulb className="w-4 h-4" />
                <span>Consejos de Ingeniero Senior (Pro Tips)</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300 pl-1">
                {currentLayer.proTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">·</span>
                    <span className="leading-snug">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Anatomical Components & Code Blocks (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="text-xs font-mono text-slate-400 font-semibold uppercase tracking-wider mb-2">
            Anatomía Técnica & Snippets de Código
          </div>

          {currentLayer.anatomyItems.map((item, idx) => (
            <div key={idx} className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl shadow-lg">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h5 className="text-sm font-bold text-white tracking-tight">{item.name}</h5>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                {item.role}
              </p>

              <div className="text-[11px] font-mono text-cyan-300 mb-3 bg-cyan-950/30 px-2 py-1 rounded inline-block">
                Stack: {item.techStack}
              </div>

              {/* Code block with copy button */}
              <div className="relative mt-2">
                <div className="flex items-center justify-between px-3 py-1.5 bg-slate-950 border-t border-x border-slate-800 rounded-t text-[11px] font-mono text-slate-400">
                  <span>Código de Referencia</span>
                  <button
                    onClick={() => handleCopyCode(item.codeExample, idx)}
                    className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {copiedCodeIndex === idx ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-3 bg-slate-950/90 border border-slate-800 rounded-b text-[11px] font-mono text-slate-300 overflow-x-auto leading-relaxed max-h-56">
                  <code>{item.codeExample}</code>
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
