import React, { useState } from 'react';
import { X, Copy, Check, Download, FileText } from 'lucide-react';
import { AI_CODING_PLATFORMS } from '../data/platforms';
import { ARCHITECTURE_LAYERS } from '../data/layers';
import { PROMPT_TEMPLATES } from '../data/prompts';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const generateMarkdown = () => {
    return `# AI Coding & Vibe Coding: Manual de Ingeniería Senior y Matriz Comparativa

## 01. Matriz de Plataformas de Coding con IA

| Plataforma | Modelo Insignia | Ejecución | SWE-bench | Contexto | Costo | Soporte MCP |
|---|---|---|---|---|---|---|
${AI_CODING_PLATFORMS.map(p => `| ${p.name} | ${p.flagshipModel} | ${p.executionMode} | ${p.sweBenchScore} | ${p.contextWindow} | ${p.costTier} | ${p.mcpSupport ? 'Sí' : 'No'} |`).join('\n')}

---

## 02. Las Cuatro Capas de Arquitectura (Modelos, Arnés, Asistentes y Agentes)

${ARCHITECTURE_LAYERS.map(l => `### Capa ${l.number}: ${l.title}
- **Objetivo Central:** ${l.coreObjective}
- **Regla Inmutable:** ${l.criticalRules[0]}
- **Pro Tip:** ${l.proTips[0]}
`).join('\n')}

---

## 03. Comandos de Consola Esenciales

\`\`\`bash
# Claude Code CLI (Anthropic)
npm install -g @anthropic-ai/claude-code && claude

# Aider CLI con Claude Sonnet
pip install aider-chat && aider --sonnet

# DeepSeek R1 Local con Ollama (32B)
ollama run deepseek-r1:32b

# Repomix para empaquetado de repositorios XML
npx repomix --style xml --output codebase.xml
\`\`\`

---

## 04. Plantillas de Prompts de Alta Precisión

${PROMPT_TEMPLATES.map(p => `### ${p.title}
**Categoría:** ${p.category} | **Target:** ${p.targetPlatform}

#### System Prompt:
\`\`\`
${p.systemPrompt}
\`\`\`

#### User Prompt Template:
\`\`\`
${p.userPromptTemplate}
\`\`\`

---
`).join('\n')}
`;
  };

  const markdownContent = generateMarkdown();

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'AI_Coding_Manual_Senior.md';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-xl shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white">Exportar Documento Técnico Completo (.md)</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preview area */}
        <div className="p-5 overflow-y-auto flex-1 font-mono text-xs text-slate-300 bg-slate-950/60 leading-relaxed">
          <pre className="whitespace-pre-wrap">{markdownContent}</pre>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between p-4 border-t border-slate-800 bg-slate-900">
          <span className="text-xs text-slate-400 font-mono">
            Formato: Markdown Estándar (GitHub Flavored)
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? '¡Copiado!' : 'Copiar al Portapapeles'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Descargar .md</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
