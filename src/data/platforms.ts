import { AICodingPlatform } from '../types';

export const AI_CODING_PLATFORMS: AICodingPlatform[] = [
  {
    id: 'claude',
    name: 'Claude (Anthropic)',
    vendor: 'Anthropic',
    flagshipModel: 'Claude 3.7 Sonnet (Hybrid Reasoning) + Claude Code CLI',
    executionMode: 'Cloud',
    category: 'Agente CLI / Terminal',
    contextWindow: '200K tokens (Prompt Caching 5m)',
    contextTokens: 200000,
    sweBenchScore: '70.3% SWE-bench Verified',
    latencyTier: 'Razonamiento Profundo (5-20s)',
    costTier: 'Medio ($$)',
    pricingDetail: '$3.00 / M tokens input · $15.00 / M tokens output (Caching a $0.30/M)',
    offlineCapable: false,
    mcpSupport: true,
    multiFileRefactor: 'Nativo Autónomo',
    astIndexing: true,
    bestFor: 'Agentes de ingeniería autónomos en terminal, refactorizaciones complejas entre múltiples repositorios y arquitectura Zero-Regression.',
    scores: {
      reasoning: 98,
      multiFileAgent: 96,
      speedIteration: 84,
      tokenEconomy: 88,
      contextWindow: 89,
      developerControl: 95
    },
    strengths: [
      'Razonamiento híbrido ajustable (Extended Thinking Budget) que planifica antes de escribir código.',
      'Claude Code CLI: lee tu árbol git, ejecuta pruebas locales, repara bugs y crea commits sin salir de bash.',
      'Prompt Caching reduce hasta 90% el costo en sesiones largas de codebase persistente.',
      'Soporte nativo de MCP (Model Context Protocol) para conectar bases de datos y herramientas personalizadas.'
    ],
    weaknesses: [
      'Depende 100% de conexión a internet y API de Anthropic.',
      'Límites de tokens por minuto (TPM) en cuentas Tier 1-2 durante refactorizaciones masivas.',
      'Velocidad de generación en modo thinking extendido requiere paciencia (no apto para autocompletado en tiempo real).'
    ],
    keyArchitecture: 'Arquitectura de ciclo cerrado: El modelo ejecuta herramientas de bash (git diff, grep, pytest, npm test), interpreta el stack trace y auto-repara su propio código hasta pasar la suite de pruebas.',
    cliCommand: 'npm install -g @anthropic-ai/claude-code && claude',
    configFile: {
      fileName: '.claude/rules.md',
      description: 'Reglas contextuales de arquitectura para Claude Code y Claude Desktop',
      snippet: `# Reglas del Repositorio (.claude/rules.md)
- Invariante 1: No introducir mutaciones directas de estado; usar inmutabilidad estricta.
- Invariante 2: Todo nuevo endpoint en Express/Fastify requiere validación Zod y tests de integración.
- Flujo de trabajo: Ejecuta siempre 'npm test' antes de declarar finalizada una tarea.`
    }
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    vendor: 'DeepSeek AI',
    flagshipModel: 'DeepSeek-R1 & DeepSeek-V3 (671B MoE / 37B activos)',
    executionMode: 'Híbrido',
    category: 'Modelo de Razonamiento',
    contextWindow: '64K - 128K tokens',
    contextTokens: 128000,
    sweBenchScore: '49.2% SWE-bench Verified (R1)',
    latencyTier: 'Razonamiento Profundo (5-20s)',
    costTier: 'Bajo ($)',
    pricingDetail: 'API: $0.14 / M input · $2.19 / M output | Pesos Abiertos: 100% Gratis en servidor propio',
    offlineCapable: true,
    mcpSupport: true,
    multiFileRefactor: 'Semi-Asistido',
    astIndexing: false,
    bestFor: 'Desarrollo con presupuesto optimizado, despliegues locales ultra-privados (on-premise) y deducción algorítmica matemática.',
    scores: {
      reasoning: 96,
      multiFileAgent: 82,
      speedIteration: 78,
      tokenEconomy: 99,
      contextWindow: 76,
      developerControl: 92
    },
    strengths: [
      'Relación costo-rendimiento insuperable (10 a 20 veces más económico que modelos propietarios cerrados).',
      'Pesos abiertos disponibles: se puede ejecutar localmente con Ollama, vLLM o SGLang con cuantización FP8/AWQ.',
      'Tokens de pensamiento visibles (<think>...</think>) que permiten auditar el raciocinio algorítmico paso a paso.',
      'Destilaciones ligeras excelentes (DeepSeek-R1-Distill-Qwen-32B/14B) para correr en laptops Mac M2/M3/M4 o RTX 4090.'
    ],
    weaknesses: [
      'No tiene un IDE ni CLI oficial propio de primera parte (requiere integrarse mediante Aider, Continue, Cursor o Cline).',
      'El modelo R1 puro a veces sobre-piensa (reasoning loop infinito) en tareas de sintaxis triviales.',
      'Ventana de contexto más acotada (64K-128K) frente a Claude (200K) o Gemini (2M).'
    ],
    keyArchitecture: 'DeepSeek-R1 utiliza aprendizaje por refuerzo puro (Large-Scale RL) sin supervisión previa pesada, optimizando directamente la recompensa de tests unitarios y sintaxis verificable.',
    cliCommand: 'ollama run deepseek-r1:32b # O usar en Aider: aider --model deepseek/deepseek-reasoner',
    configFile: {
      fileName: 'vllm-serve-deepseek.sh',
      description: 'Script de servicio local de alto rendimiento con vLLM',
      snippet: `#!/usr/bin/env bash
python3 -m vllm.entrypoints.openai.api_server \\
  --model deepseek-ai/DeepSeek-R1-Distill-Qwen-32B \\
  --tensor-parallel-size 2 \\
  --max-model-len 32768 \\
  --port 8000 --gpu-memory-utilization 0.92`
    }
  },
  {
    id: 'opencode',
    name: 'OpenCode & Stack Local (Aider / Continue)',
    vendor: 'Comunidad Open Source',
    flagshipModel: 'Aider CLI + Qwen2.5-Coder 32B / Llama 3.3 70B / DeepSeek',
    executionMode: 'Local / Open-Source',
    category: 'Agente CLI / Terminal',
    contextWindow: 'Configurable (32K - 128K según motor local)',
    contextTokens: 128000,
    sweBenchScore: 'Variable (hasta 65% con Claude / 48% con Qwen local)',
    latencyTier: 'Media (1-3s)',
    costTier: 'Gratis / Open-Weights',
    pricingDetail: '0$ en inferencia local con hardware propio. O solo coste directo de tokens por proveedor.',
    offlineCapable: true,
    mcpSupport: true,
    multiFileRefactor: 'Nativo Autónomo',
    astIndexing: true,
    bestFor: 'Desarrolladores celosos de la privacidad (código confidencial, banca, salud), control absoluto de commits git y cero dependencia de SaaS.',
    scores: {
      reasoning: 89,
      multiFileAgent: 93,
      speedIteration: 86,
      tokenEconomy: 95,
      contextWindow: 80,
      developerControl: 100
    },
    strengths: [
      '100% de control: el código jamás sale de la red local cuando se conecta a vLLM/Ollama.',
      'Repo Map inteligente basado en Tree-Sitter que indexa todas las firmas y tipos del repositorio sin saturar el contexto.',
      'Commits semánticos automáticos en git con mensaje explicativo cada vez que una edición es validada.',
      'Agnóstico a modelos: cambia al instante entre Claude 3.7, DeepSeek, OpenAI o modelos locales con un solo flag.'
    ],
    weaknesses: [
      'Curva de aprendizaje superior: requiere configurar entornos Python, Ollama/vLLM y llaves de entorno.',
      'Para rendimiento local de nivel senior se requiere GPU potente (al menos 24GB VRAM para 32B FP8, o Mac 64GB Unified Memory).',
      'Sin interfaz gráfica moderna preconfigurada para usuarios que no están cómodos en la terminal.'
    ],
    keyArchitecture: 'Utiliza Tree-Sitter para construir un grafo AST de dependencias del repositorio y genera mapas de contexto reducidos (Repo Maps) que se inyectan en cada turno de conversación.',
    cliCommand: 'pip install aider-chat && aider --sonnet # O local: aider --model ollama/qwen2.5-coder:32b',
    configFile: {
      fileName: '.aider.conf.yml',
      description: 'Archivo de configuración para Aider en la raíz del proyecto',
      snippet: `model: deepseek/deepseek-reasoner
auto-commits: true
subtree-only: false
lint-cmd: "npm run lint"
test-cmd: "npm test"
auto-lint: true
auto-test: true`
    }
  },
  {
    id: 'cursor',
    name: 'Cursor & Windsurf',
    vendor: 'Anysphere / Codeium',
    flagshipModel: 'Cursor Composer (Sonnet 3.7 / GPT-4o / DeepSeek V3) + Shadow Workspace',
    executionMode: 'Híbrido',
    category: 'IDE Nativo AI',
    contextWindow: '200K tokens con indexación vectorial local',
    contextTokens: 200000,
    sweBenchScore: '68.5% (Vía Composer Agent)',
    latencyTier: 'Ultra Rápida (<1s)',
    costTier: 'Medio ($$)',
    pricingDetail: '$20 / mes (500 fast requests + Composer ilimitado)',
    offlineCapable: false,
    mcpSupport: true,
    multiFileRefactor: 'Nativo Autónomo',
    astIndexing: true,
    bestFor: 'Vibe Coding visual diario, generación interactiva multi-archivo con previsualización de diffs y adopción inmediata de VS Code.',
    scores: {
      reasoning: 92,
      multiFileAgent: 95,
      speedIteration: 98,
      tokenEconomy: 85,
      contextWindow: 90,
      developerControl: 90
    },
    strengths: [
      'Composer multi-archivo: genera, modifica y valida múltiples ficheros simultáneamente con diffs interactivos lado a lado.',
      'Indexación semántica completa del codebase (@codebase, @web, @docs, @git) que entiende la arquitectura completa.',
      'Soporte estricto de `.cursorrules` para obligar al modelo a seguir patrones de tu equipo.',
      'Copilot++ especulativo: predice tu siguiente edición en base a cambios recientes en otros archivos.'
    ],
    weaknesses: [
      'Cerrado en su propio fork de VS Code; no se puede usar como extensión en Neovim o JetBrains.',
      'Las peticiones rápidas se consumen rápido en sprints intensivos de Vibe Coding.',
      'A veces intenta aplicar diffs en archivos que cambiaron en disco, provocando desincronización.'
    ],
    keyArchitecture: 'Shadow Workspace: Cursor corre una instancia headless en segundo plano que prueba la compilación de TypeScript o linter antes de mostrarte el diff final en la pantalla.',
    cliCommand: 'code --install-extension / cursor .',
    configFile: {
      fileName: '.cursorrules',
      description: 'Reglas de orquestación de Cursor en la raíz del proyecto',
      snippet: `# Reglas del Proyecto (.cursorrules)
You are an expert senior TypeScript/React engineer.
- Enforce strict typing. No 'any' or loose type assertions.
- Use functional components with hooks. Tailwind v4 for utility styles.
- When generating files, always preserve existing exports and never delete comments.
- Run typecheck in background before presenting multi-file diffs.`
    }
  },
  {
    id: 'grok',
    name: 'Grok (xAI)',
    vendor: 'xAI',
    flagshipModel: 'Grok 3 & Grok 3 Mini (Thinking Mode)',
    executionMode: 'Cloud',
    category: 'Modelo de Razonamiento',
    contextWindow: '128K - 1M tokens',
    contextTokens: 1000000,
    sweBenchScore: '58.7% SWE-bench Verified (Grok 3 Thinking)',
    latencyTier: 'Media (1-3s)',
    costTier: 'Medio ($$)',
    pricingDetail: 'Disponible en suscripción X Premium+ / API de xAI ($2 input / $10 output por millón)',
    offlineCapable: false,
    mcpSupport: false,
    multiFileRefactor: 'Por Bloques / Diff',
    astIndexing: false,
    bestFor: 'Prototipado rápido desde cero (Vibe Coding puro), scripts de automatización de infra/DevOps y síntesis sin filtros ni censuras excesivas.',
    scores: {
      reasoning: 90,
      multiFileAgent: 79,
      speedIteration: 92,
      tokenEconomy: 82,
      contextWindow: 91,
      developerControl: 78
    },
    strengths: [
      'Modo Thinking agresivo en Grok 3 con excelente capacidad para scripts de Bash, Python, Kubernetes y Rust.',
      'Menos rechazos por filtros de seguridad excesivos al trabajar con seguridad informática, pentesting o scraping.',
      'Acceso a información técnica reciente en tiempo real vía X (tweets técnicos, caídas de servicios, lanzamientos de librerías).',
      'Velocidad de generación de tokens extremadamente alta en hardware Colossus.'
    ],
    weaknesses: [
      'Ecosistema de herramientas para desarrolladores (CLI, extensiones de IDE, MCP) aún en fase temprana.',
      'Menos optimizado para refactorizaciones agenticas quirúrgicas de 20+ archivos en comparación con Claude o Cursor.',
      'Soporte limitado para edición directa en repositorios locales sin herramientas puente de terceros.'
    ],
    keyArchitecture: 'Entrenado en el supercluster Colossus de xAI con técnicas de razonamiento sintético a gran escala y post-entrenamiento enfocado en veracidad lógica y código ejecutable.',
    cliCommand: 'curl https://api.x.ai/v1/chat/completions -H "Authorization: Bearer $XAI_API_KEY"',
    configFile: {
      fileName: 'grok-client.ts',
      description: 'Cliente TypeScript para invocar Grok 3 con modo de razonamiento',
      snippet: `import OpenAI from "openai";

const grok = new OpenAI({
  apiKey: process.env.XAI_API_KEY,
  baseURL: "https://api.x.ai/v1",
});

const response = await grok.chat.completions.create({
  model: "grok-3-latest",
  messages: [{ role: "user", content: "Arquitectura de microservicios resiliente en Go" }],
});`
    }
  },
  {
    id: 'gemini',
    name: 'Gemini (Google DeepMind)',
    vendor: 'Google DeepMind',
    flagshipModel: 'Gemini 2.5 Pro & Flash (Thinking + Multimodal 2M Context)',
    executionMode: 'Cloud',
    category: 'Ecosistema Cloud',
    contextWindow: '2 Millones de tokens (2M Context Window)',
    contextTokens: 2000000,
    sweBenchScore: '63.8% SWE-bench Verified',
    latencyTier: 'Ultra Rápida (<1s)',
    costTier: 'Bajo ($)',
    pricingDetail: 'Flash: $0.075 / M input | Pro: $1.25 / M input (Capa gratuita en AI Studio)',
    offlineCapable: false,
    mcpSupport: true,
    multiFileRefactor: 'Semi-Asistido',
    astIndexing: false,
    bestFor: 'Ingesta de repositorios enteros gigantes (monorepos) en un solo prompt, análisis multimodal de diagramas de arquitectura y wireframes.',
    scores: {
      reasoning: 93,
      multiFileAgent: 88,
      speedIteration: 94,
      tokenEconomy: 96,
      contextWindow: 100,
      developerControl: 87
    },
    strengths: [
      'Ventana de contexto colosal de 2M tokens: permite pegar 50,000 líneas de código completas sin fragmentar ni perder contexto.',
      'Comprensión multimodal nativa: envíale un video de un bug en pantalla o un Figma en captura y genera el componente exacto.',
      'Latencia ridículamente baja en Gemini 2.5 Flash con modo thinking activado.',
      'Excelente integración con Google AI Studio, Cloud Run y SDK oficial @google/genai.'
    ],
    weaknesses: [
      'En ventanas de más de 1 millón de tokens, la atención puede degradarse ligeramente ("needle in a haystack" en detalles minúsculos).',
      'No tiene un IDE nativo exclusivo (se apoya en extensiones de terceros o en Google Project IDX).',
      'A veces prefiere reescribir archivos enteros en vez de emitir diffs compactos si no se le restringe explícitamente.'
    ],
    keyArchitecture: 'Arquitectura multicanal con atención de contexto extendido Sparse/Ring Attention que permite buscar y correlacionar invariantes en millones de tokens de código fuente.',
    cliCommand: 'gcloud ai or Google AI Studio API Keys via @google/genai',
    configFile: {
      fileName: 'gemini-repo-audit.ts',
      description: 'Ingesta completa de monorepo con el SDK @google/genai',
      snippet: `import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI();
const response = await ai.models.generateContent({
  model: "gemini-2.5-pro",
  contents: [
    { text: "Analiza todo este repositorio e identifica fugas de memoria o cuellos de botella:" },
    { text: fullMonorepoConcatenatedCode }
  ]
});`
    }
  },
  {
    id: 'copilot',
    name: 'GitHub Copilot & Workspace',
    vendor: 'GitHub / Microsoft',
    flagshipModel: 'Copilot Workspace (GPT-4o / Claude 3.5 Sonnet backend)',
    executionMode: 'Cloud',
    category: 'Ecosistema Cloud',
    contextWindow: '128K tokens',
    contextTokens: 128000,
    sweBenchScore: '56.4% SWE-bench',
    latencyTier: 'Ultra Rápida (<1s)',
    costTier: 'Medio ($$)',
    pricingDetail: '$10 - $19 / usuario / mes en entornos empresariales',
    offlineCapable: false,
    mcpSupport: true,
    multiFileRefactor: 'Semi-Asistido',
    astIndexing: true,
    bestFor: 'Empresas con cumplimiento estricto corporativo, resolución guiada de Issues a Pull Requests en GitHub y autocompletado en línea.',
    scores: {
      reasoning: 85,
      multiFileAgent: 84,
      speedIteration: 90,
      tokenEconomy: 89,
      contextWindow: 79,
      developerControl: 82
    },
    strengths: [
      'Integración total con el flujo de trabajo de GitHub: de Issue a Spec, de Spec a Plan, de Plan a Pull Request.',
      'Garantía de propiedad intelectual corporativa y filtros de copyright para código público.',
      'Excelente autocompletado inline tab-completion en Visual Studio, VS Code y JetBrains.',
      'Soporte de extensiones de GitHub (Copilot Extensions).'
    ],
    weaknesses: [
      'Menor flexibilidad para personalizar los modelos de backend en comparación con herramientas abiertas.',
      'Menos agresivo y autónomo en refactorizaciones de terminal en comparación con Claude Code CLI o Aider.',
      'Dependiente de la suscripción de organización.'
    ],
    keyArchitecture: 'Pipeline de ingeniería guiado: Genera una especificación técnica en Markdown a partir del Issue de GitHub, divide los pasos en tareas atómicas y emite el PR listo para revisión.',
    cliCommand: 'gh copilot suggest "find large files" # Vía GitHub CLI',
    configFile: {
      fileName: '.github/copilot-instructions.md',
      description: 'Instrucciones globales de repositorio para Copilot',
      snippet: `# Reglas de GitHub Copilot
- Usar siempre TypeScript en modo estricto.
- Priorizar composición sobre herencia.
- Todas las funciones públicas deben incluir JSDoc explicativo con ejemplos de uso.`
    }
  }
];
