import React, { useState } from 'react';
import { Calculator, ArrowRight, CheckCircle2, Shield, DollarSign, Clock, Sparkles } from 'lucide-react';
import { PlatformId } from '../types';

interface StackCalculatorProps {
  onOpenManual: (platformId: PlatformId) => void;
}

export const StackCalculator: React.FC<StackCalculatorProps> = ({ onOpenManual }) => {
  // Wizard state
  const [privacyNeed, setPrivacyNeed] = useState<'public' | 'enterprise' | 'airgap'>('enterprise');
  const [workflowPreference, setWorkflowPreference] = useState<'terminal' | 'ide' | 'mixed'>('mixed');
  const [budgetTier, setBudgetTier] = useState<'free' | 'moderate' | 'pro'>('moderate');

  // ROI Calculator state
  const [hoursCodingPerWeek, setHoursCodingPerWeek] = useState<number>(30);
  const [hourlyRate, setHourlyRate] = useState<number>(55);
  const [aiEfficiencyGain, setAiEfficiencyGain] = useState<number>(40); // 40% time saved

  // Calculate recommendation
  const getRecommendation = () => {
    if (privacyNeed === 'airgap' || budgetTier === 'free') {
      return {
        primary: 'opencode' as PlatformId,
        primaryName: 'OpenCode + Aider CLI + DeepSeek R1 / Qwen2.5 Local',
        secondary: 'deepseek' as PlatformId,
        reason: 'Tu código permanece 100% en tu máquina. Utilizas Ollama o vLLM con cuantización AWQ/GGUF en GPU local con costo de token 0$.',
        stackRecipe: [
          'Terminal: Aider CLI (`pip install aider-chat`)',
          'Motor Local: Ollama con deepseek-r1:32b o qwen2.5-coder:32b',
          'Editor: VS Code o Neovim con extensiones de Tree-Sitter'
        ]
      };
    }

    if (workflowPreference === 'terminal') {
      return {
        primary: 'claude' as PlatformId,
        primaryName: 'Claude Code CLI + Claude 3.7 Sonnet',
        secondary: 'opencode' as PlatformId,
        reason: 'El agente de terminal más autónomo de la industria. Ejecuta tus comandos de git, corre pruebas locales y resuelve bugs multi-archivo sin salir de bash.',
        stackRecipe: [
          'CLI: Claude Code (`npm i -g @anthropic-ai/claude-code`)',
          'Reglas: `.claude/rules.md` en la raíz de tu proyecto',
          'Protocolo: MCP conectado a tus bases de datos y GitHub'
        ]
      };
    }

    if (workflowPreference === 'ide') {
      return {
        primary: 'cursor' as PlatformId,
        primaryName: 'Cursor Composer + Claude 3.7 / Sonnet Backend',
        secondary: 'gemini' as PlatformId,
        reason: 'La experiencia de Vibe Coding más fluida: diffs interactivos lado a lado, Shadow Workspace de compilación previa y orquestación multi-archivo con Cmd+I.',
        stackRecipe: [
          'IDE: Cursor con indexación @codebase',
          'Reglas: `.cursorrules` con tipado estricto',
          'Contexto: @docs para librerías externas y @git para diffs'
        ]
      };
    }

    // Mixed/Default
    return {
      primary: 'cursor' as PlatformId,
      primaryName: 'Stack Híbrido: Cursor (Frontend/IDE) + Claude Code CLI (Refactor/Agent)',
      secondary: 'deepseek' as PlatformId,
      reason: 'El "Sweet Spot" de los equipos de alto rendimiento: Cursor para iteración rápida visual en pantalla y Claude Code en terminal para refactorizaciones profundas y resolución de issues.',
      stackRecipe: [
        'IDE Principal: Cursor para desarrollo diario interactivo',
        'Terminal Agent: Claude Code CLI para sesiones de depuración profunda',
        'Modelo de Razonamiento: DeepSeek-R1 para algoritmos y deducción matemática'
      ]
    };
  };

  const rec = getRecommendation();

  // ROI calculations (monthly)
  const monthlyCodingHours = hoursCodingPerWeek * 4.2;
  const hoursSavedMonthly = Math.round(monthlyCodingHours * (aiEfficiencyGain / 100));
  const grossMonthlySavings = hoursSavedMonthly * hourlyRate;
  const estimatedAiToolCost = budgetTier === 'free' ? 0 : budgetTier === 'moderate' ? 25 : 80;
  const netMonthlyValue = grossMonthlySavings - estimatedAiToolCost;

  return (
    <section id="calculadora" className="py-16 px-6 max-w-7xl mx-auto border-t border-slate-900">
      {/* Header */}
      <div className="mb-8">
        <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-2">
          05. Optimización de Productividad & ROI Técnico
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Calculadora de Stack Personalizado & Retorno de Inversión
        </h2>
        <p className="text-sm text-slate-400 mt-2 max-w-2xl">
          Determina la combinación exacta de herramientas para tu nivel de privacidad y calcula el impacto real de horas recuperadas y valor económico mensual.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Stack Decision Wizard (6 cols) */}
        <div className="lg:col-span-6 p-6 bg-slate-900/60 border border-slate-800 rounded-xl shadow-lg space-y-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Configurador de Stack AI a Medida</span>
          </h3>

          {/* Question 1: Privacy */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-300 block">
              1. Nivel de Privacidad & Confidencialidad del Código:
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setPrivacyNeed('public')}
                className={`p-2.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer text-left ${
                  privacyNeed === 'public'
                    ? 'border-cyan-500/50 bg-cyan-950/30 text-cyan-300'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                <div className="font-bold">Público / Open</div>
                <div className="text-[11px] text-slate-500">APIs en la nube</div>
              </button>
              <button
                onClick={() => setPrivacyNeed('enterprise')}
                className={`p-2.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer text-left ${
                  privacyNeed === 'enterprise'
                    ? 'border-cyan-500/50 bg-cyan-950/30 text-cyan-300'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                <div className="font-bold">Corporativo</div>
                <div className="text-[11px] text-slate-500">Zero data retention</div>
              </button>
              <button
                onClick={() => setPrivacyNeed('airgap')}
                className={`p-2.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer text-left ${
                  privacyNeed === 'airgap'
                    ? 'border-cyan-500/50 bg-cyan-950/30 text-cyan-300'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                <div className="font-bold">Air-Gapped</div>
                <div className="text-[11px] text-slate-500">100% Offline local</div>
              </button>
            </div>
          </div>

          {/* Question 2: Workflow Preference */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-300 block">
              2. Preferencia de Entorno de Trabajo:
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setWorkflowPreference('terminal')}
                className={`p-2.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer text-left ${
                  workflowPreference === 'terminal'
                    ? 'border-cyan-500/50 bg-cyan-950/30 text-cyan-300'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                <div className="font-bold">Terminal / CLI</div>
                <div className="text-[11px] text-slate-500">Aider, Claude Code</div>
              </button>
              <button
                onClick={() => setWorkflowPreference('ide')}
                className={`p-2.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer text-left ${
                  workflowPreference === 'ide'
                    ? 'border-cyan-500/50 bg-cyan-950/30 text-cyan-300'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                <div className="font-bold">IDE Visual</div>
                <div className="text-[11px] text-slate-500">Cursor, Windsurf</div>
              </button>
              <button
                onClick={() => setWorkflowPreference('mixed')}
                className={`p-2.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer text-left ${
                  workflowPreference === 'mixed'
                    ? 'border-cyan-500/50 bg-cyan-950/30 text-cyan-300'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                <div className="font-bold">Híbrido</div>
                <div className="text-[11px] text-slate-500">Lo mejor de ambos</div>
              </button>
            </div>
          </div>

          {/* Question 3: Budget */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-300 block">
              3. Presupuesto Mensual Disponible:
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setBudgetTier('free')}
                className={`p-2.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer text-left ${
                  budgetTier === 'free'
                    ? 'border-cyan-500/50 bg-cyan-950/30 text-cyan-300'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                <div className="font-bold">$0 / Gratis</div>
                <div className="text-[11px] text-slate-500">Open-Weights</div>
              </button>
              <button
                onClick={() => setBudgetTier('moderate')}
                className={`p-2.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer text-left ${
                  budgetTier === 'moderate'
                    ? 'border-cyan-500/50 bg-cyan-950/30 text-cyan-300'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                <div className="font-bold">$20 / mes</div>
                <div className="text-[11px] text-slate-500">Plan estándar</div>
              </button>
              <button
                onClick={() => setBudgetTier('pro')}
                className={`p-2.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer text-left ${
                  budgetTier === 'pro'
                    ? 'border-cyan-500/50 bg-cyan-950/30 text-cyan-300'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                <div className="font-bold">$50+ / mes</div>
                <div className="text-[11px] text-slate-500">Agentes ilimitados</div>
              </button>
            </div>
          </div>

          {/* Recommendation Output Box */}
          <div className="pt-4 border-t border-slate-800">
            <div className="p-4 bg-slate-950 border border-cyan-500/30 rounded-xl space-y-3">
              <div className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wide">
                Stack Recomendado para tu Perfil:
              </div>
              <h4 className="text-sm font-bold text-white">{rec.primaryName}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{rec.reason}</p>

              <div className="pt-2 border-t border-slate-850 space-y-1 text-xs font-mono text-slate-400">
                {rec.stackRecipe.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-cyan-400">➔</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onOpenManual(rec.primary)}
                  className="w-full py-2 px-3 text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Ver Manual de Implementación</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: ROI & Productivity Calculator (6 cols) */}
        <div className="lg:col-span-6 p-6 bg-slate-900/60 border border-slate-800 rounded-xl shadow-lg space-y-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Calculator className="w-4 h-4 text-emerald-400" />
            <span>Simulador de Retorno de Inversión (ROI)</span>
          </h3>

          <div className="space-y-4">
            {/* Slider 1: Hours per week */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300">Horas de programación semanal:</span>
                <span className="font-mono font-bold text-white tabular-nums">{hoursCodingPerWeek} h / semana</span>
              </div>
              <input
                type="range"
                min="10"
                max="60"
                step="5"
                value={hoursCodingPerWeek}
                onChange={(e) => setHoursCodingPerWeek(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* Slider 2: Hourly Rate */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300">Tarifa horaria estimada (USD):</span>
                <span className="font-mono font-bold text-emerald-400 tabular-nums">${hourlyRate} USD / hora</span>
              </div>
              <input
                type="range"
                min="20"
                max="180"
                step="5"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>

            {/* Slider 3: AI Efficiency Gain */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300">Aceleración de velocidad (Vibe Coding):</span>
                <span className="font-mono font-bold text-cyan-400 tabular-nums">+{aiEfficiencyGain}% velocidad</span>
              </div>
              <input
                type="range"
                min="15"
                max="70"
                step="5"
                value={aiEfficiencyGain}
                onChange={(e) => setAiEfficiencyGain(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Metric KPI Results Cards */}
          <div className="grid grid-cols-2 gap-3 pt-3">
            <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-lg text-left">
              <div className="text-[11px] font-mono text-slate-400 mb-1">Horas Recuperadas / Mes:</div>
              <div className="text-xl sm:text-2xl font-extrabold text-white font-mono tabular-nums">
                {hoursSavedMonthly} <span className="text-xs font-normal text-slate-400">horas</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">Tiempo libre para arquitectura</div>
            </div>

            <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-lg text-left">
              <div className="text-[11px] font-mono text-slate-400 mb-1">Valor Económico Bruto:</div>
              <div className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-mono tabular-nums">
                ${grossMonthlySavings.toLocaleString()} <span className="text-xs font-normal text-slate-400">USD</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">Por desarrollador / mes</div>
            </div>
          </div>

          {/* Net Benefit Banner */}
          <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-xl flex items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-emerald-400 font-bold">
                ROI Neto Estimado:
              </div>
              <div className="text-lg font-bold text-white font-mono tabular-nums mt-0.5">
                +${netMonthlyValue.toLocaleString()} USD / mes
              </div>
              <div className="text-[11px] text-slate-400">
                (Descontando costo mensual de suscripción de ${estimatedAiToolCost})
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black text-emerald-400 font-mono">
                {Math.round((grossMonthlySavings / Math.max(estimatedAiToolCost, 1)) * 10)}%
              </div>
              <div className="text-[11px] text-slate-400">Multiplicador ROI</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
