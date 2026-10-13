import { ArchitectureLayer } from '../types';

export const ARCHITECTURE_LAYERS: ArchitectureLayer[] = [
  {
    id: 'models',
    number: '01',
    title: 'Modelos de Código (Fine-Tuning & Inferencia)',
    subtitle: 'El Motor Neuronal Base',
    description: 'La capa fundacional del desarrollo con IA. Consiste en seleccionar, afinar (Fine-Tuning/LoRA) y desplegar modelos de lenguaje especializados en razonamiento abstracto, generación de árboles AST y comprensión sintáctica profunda.',
    coreObjective: 'Maximizar la tasa de acierto sintáctico y de lógica algorítmica mientras se minimiza el costo por token y la latencia de inferencia.',
    anatomyItems: [
      {
        name: 'Fine-Tuning Eficiente con LoRA / Unsloth',
        role: 'Ajuste fino de pesos para enseñar la sintaxis interna y convenciones de tu empresa sin re-entrenar desde cero.',
        techStack: 'Unsloth, PyTorch, Hugging Face, QLoRA (4-bit/8-bit)',
        codeExample: `# Fine-Tuning con Unsloth (2x más rápido, 70% menos VRAM)
from unsloth import FastLanguageModel
import torch

max_seq_length = 8192
model, tokenizer = FastLanguageModel.from_pretrained(
    model_name="Qwen/Qwen2.5-Coder-32B-Instruct",
    max_seq_length=max_seq_length,
    load_in_4bit=True
)

model = FastLanguageModel.get_peft_model(
    model,
    r=16,
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj", "gate_proj", "up_proj", "down_proj"],
    lora_alpha=32,
    lora_dropout=0
)`
      },
      {
        name: 'Motores de Inferencia de Alta Concurrencia',
        role: 'Servir el modelo con PagedAttention, Continuous Batching y soporte nativo de OpenAI API compatible.',
        techStack: 'vLLM, SGLang, llama.cpp, Ollama',
        codeExample: `# Despliegue de producción con vLLM
python3 -m vllm.entrypoints.openai.api_server \\
  --model Qwen/Qwen2.5-Coder-32B-Instruct \\
  --tensor-parallel-size 1 \\
  --max-model-len 16384 \\
  --enforce-eager \\
  --port 8000`
      },
      {
        name: 'Evaluación y Benchmarking Sintético',
        role: 'Evitar la degradación del modelo midiendo HumanEval+, MBPP+ y problemas propios antes de pasar a producción.',
        techStack: 'EvalPlus, SWE-bench Lite, BigCode Evaluation Harness',
        codeExample: `# Ejecución de suite de validación EvalPlus
evalplus.evaluate --model local-vllm-endpoint \\
  --dataset humaneval --backend openai --base_url http://localhost:8000/v1`
      }
    ],
    stepByStepGuide: [
      {
        step: 'Paso 1',
        title: 'Selección del Modelo Base',
        action: 'Elige entre modelos de razonamiento profundo (DeepSeek-R1 / Claude 3.7) para arquitectura compleja, o modelos compactos (Qwen2.5-Coder 32B / 14B) para autocompletado local de baja latencia.'
      },
      {
        step: 'Paso 2',
        title: 'Curación de Dataset Sintético',
        action: 'Extrae pares de PRs históricos de tu equipo: [Issue + Archivos Afectados] -> [Git Diff final + Tests que pasaron]. Filtra sólo código que haya pasado CI sin advertencias de linter.'
      },
      {
        step: 'Paso 3',
        title: 'Cuantización y Optimización de VRAM',
        action: 'Convierte el modelo a formato AWQ (para GPUs NVIDIA) o GGUF (para Mac Apple Silicon con llama.cpp) reduciendo el consumo de memoria a la mitad sin pérdida apreciable de calidad.'
      },
      {
        step: 'Paso 4',
        title: 'Exposición como Endpoint OpenAI-Compatible',
        action: 'Expón una URL local `http://localhost:8000/v1` con vLLM o Ollama para que cualquier cliente (Aider, Cursor, Continue) pueda consumirlo transparente.'
      }
    ],
    criticalRules: [
      'Regla de Oro: Nunca entrenes un modelo en código sucio o sin tests; los LLMs replican los antipatrones con la misma fidelidad que las buenas prácticas.',
      'Control de Temperatura: Usa temperatura 0.0 o 0.2 para código determinista y refactorizaciones; sube a 0.7 únicamente para brainstorming de arquitectura.',
      'Auditoría de Invariantes: Evalúa siempre la ventana de contexto efectiva real, no solo la declarada por el fabricante.'
    ],
    proTips: [
      'Si tienes una MacBook Pro M3/M4 con 64GB+ de RAM, puedes correr Qwen2.5-Coder-32B en Q4_K_M a más de 30 tokens por segundo 100% offline.',
      'Para entrenar LoRA de estilo de código de tu equipo, solo requieres ~500 ejemplos de código limpio y bien comentado en formato JSONL.'
    ]
  },
  {
    id: 'harness',
    number: '02',
    title: 'Arnés de Pruebas (Test Harness & Evals)',
    subtitle: 'El Escudo de Validación Automática',
    description: 'El arnés es la infraestructura que rodea al modelo para aislarlo, darle ejecución segura en entornos efímeros (Docker sandboxes) y verificar automáticamente que el código generado no rompa invariantes de negocio.',
    coreObjective: 'Garantizar Zero-Regression: Si el código generado falla en linter, tipos o tests unitarios, el arnés intercepta el error y fuerza al modelo a auto-repararse antes de tocar el repositorio principal.',
    anatomyItems: [
      {
        name: 'Sandbox Efímero Aislado',
        role: 'Ejecuta el código generado por la IA en un contenedor Docker sin acceso a credenciales de producción ni a tu disco raíz.',
        techStack: 'Docker, Firecracker microVMs, e2b sandbox, Node vm',
        codeExample: `# Dockerfile de Harness para ejecución aislada de agentes
FROM node:22-alpine
WORKDIR /sandbox
COPY package*.json ./
RUN npm ci --ignore-scripts
COPY . .
# Permisos restringidos para el proceso del agente
USER node
CMD ["npm", "test"]`
      },
      {
        name: 'Ciclo de Feedback de Error (Self-Healing Loop)',
        role: 'Captura stdout/stderr de compilación y pruebas unitarias, y se lo inyecta al modelo con el stacktrace exacto.',
        techStack: 'TypeScript runner, Vitest / Jest, Pytest, Bash hooks',
        codeExample: `// Harness Verification Loop
async function verifySolution(agentPatch: string): Promise<HarnessResult> {
  await applyGitPatch(agentPatch);
  const lint = await runCommand("npm run lint");
  if (!lint.passed) return { success: false, feedback: lint.stderr };
  
  const typecheck = await runCommand("npx tsc --noEmit");
  if (!typecheck.passed) return { success: false, feedback: typecheck.stderr };

  const test = await runCommand("npm test -- --silent");
  return test.passed ? { success: true } : { success: false, feedback: test.stderr };
}`
      },
      {
        name: 'Verificador de Invariantes y AST Diff',
        role: 'Revisa mediante AST que el modelo no haya borrado comentarios críticos, firmas de funciones exportadas o tipos públicos.',
        techStack: 'Tree-sitter, Babel Parser, ts-morph',
        codeExample: `// Verificador de invariantes de exportaciones
import { Project } from "ts-morph";
const project = new Project();
const originalExports = getPublicExports("original.ts");
const patchedExports = getPublicExports("patched.ts");

const missing = originalExports.filter(e => !patchedExports.includes(e));
if (missing.length > 0) {
  throw new Error(\`Violación de Invariante: Se eliminaron exports públicos: \${missing.join(", ")}\`);
}`
      }
    ],
    stepByStepGuide: [
      {
        step: 'Paso 1',
        title: 'Creación de Suites de Pruebas Herméticas',
        action: 'Escribe pruebas de integración que no dependan de internet. Usa mocks estables para APIs externas y bases de datos SQLite en memoria.'
      },
      {
        step: 'Paso 2',
        title: 'Script de Verificación en 3 Capas',
        action: 'Configura un script `verify.sh` que encadene: 1) Linter (ESLint/Biome), 2) Typecheck (`tsc --noEmit`), 3) Tests unitarios (`vitest run`).'
      },
      {
        step: 'Paso 3',
        title: 'Inyección de Stacktraces al Contexto',
        action: 'Cuando falle una verificación, trunca el output a las primeras 80 líneas de error y devuélvelo al modelo bajo la directiva: "Corrige exclusivamente los errores reportados sin modificar la firma original".'
      },
      {
        step: 'Paso 4',
        title: 'Límite de Intentos (Max Retries Safeguard)',
        action: 'Establece un límite de 3 a 5 reintentos en el bucle. Si no converge, aborta y devuelve un git reset --hard al estado previo seguro.'
      }
    ],
    criticalRules: [
      'Sin arnés no hay Vibe Coding seguro: Confiar a ciegas en el código que genera un LLM sin validación automática conduce al colapso del repositorio.',
      'Invariabilidad de Tests: El agente jamás debe tener permiso de modificar el archivo de test existente para "hacerlo pasar"; solo debe modificar el código productivo.',
      'Fail-Fast: El linter y el verificador de tipos deben correr antes que los tests para no gastar cómputo en código que ni siquiera compila.'
    ],
    proTips: [
      'Usa `git stash` o ramas efímeras de trabajo (`git checkout -b ai-patch-$(date +%s)`) para que cualquier experimento del arnés sea descartable en un milisegundo.',
      'Herramientas como Aider y Claude Code tienen arneses de test incorporados configurables con los flags `--test-cmd` y `--lint-cmd`.'
    ]
  },
  {
    id: 'assistants',
    number: '03',
    title: 'Asistentes de Código (Contexto, AST & Reglas)',
    subtitle: 'El Copiloto Inteligente con Memoria',
    description: 'Un asistente es mucho más que una ventana de chat: es un sistema que indexa el grafo de dependencias de tu repositorio (AST), mantiene archivos de memoria (.cursorrules, .claude/rules) e inyecta la información precisa en el momento exacto.',
    coreObjective: 'Dotar a la IA del contexto exacto de tu arquitectura sin sobrecargar la ventana de tokens con código irrelevante.',
    anatomyItems: [
      {
        name: 'Repo Maps y Compresión de Contexto vía AST',
        role: 'Genera un mapa ultracompacto del repositorio mostrando solo clases, interfaces y firmas de funciones sin la implementación interna.',
        techStack: 'Tree-sitter, Repomix, Aider Repo Map, Git AST parser',
        codeExample: `# Generación de mapa de repositorio con Repomix
npx repomix --style xml --output repomap.xml \\
  --include "src/**/*.ts,src/**/*.tsx" \\
  --exclude "**/*.test.ts,node_modules,dist"`
      },
      {
        name: 'Archivos de Reglas Jerárquicas (.cursorrules / .claude/rules)',
        role: 'Instrucciones permanentes a nivel de sistema que definen convenciones de código, librerías prohibidas y estándares del equipo.',
        techStack: 'Markdown, System Prompts, Claude Rules, Cursor Rules',
        codeExample: `# .cursorrules / .claude/rules.md
## Stack & Principios
- React 19 + TypeScript + Tailwind CSS v4.
- PROHIBIDO el uso de 'any' o 'as unknown as T'.
- Componentes funcionales: nunca uses Clases.
- Siempre encapsula lógica de estado compleja en Custom Hooks dedicados.
- Todas las mutaciones asíncronas deben manejar estados de carga y error explícitos.`
      },
      {
        name: 'Memoria Persistente y Bitácora de Decisiones',
        role: 'Almacena decisiones arquitectónicas tomadas en sesiones anteriores para que el asistente no sugiera alternativas ya descartadas.',
        techStack: 'ARCHITECTURE.md, DECISIONS.md, Scratchpads',
        codeExample: `<!-- .ai/context-memory.md -->
### Decisiones de Arquitectura Tomadas
- 2026-03: Migrado de Redux a Zustand por simplificación de boilerplate.
- 2026-06: Se utiliza fetch nativo con wrapper tipado en vez de Axios.
- 2026-09: No usar librerías de UI externas que inyecten estilos en línea.`
      }
    ],
    stepByStepGuide: [
      {
        step: 'Paso 1',
        title: 'Estructuración del Archivo de Reglas Maestro',
        action: 'Crea un archivo `.cursorrules` o `.claude/rules.md` en la raíz. Define qué tecnologías se usan, qué librerías están vetadas y el formato exacto de salida esperado.'
      },
      {
        step: 'Paso 2',
        title: 'Mapeo Semántico de Archivos Clave',
        action: 'Usa referencias contextuales explícitas: en Cursor usa `@types.ts` o `@schema.prisma`; en terminal usa `aider src/api/user.ts src/models/user.ts`.'
      },
      {
        step: 'Paso 3',
        title: 'Técnica de Few-Shot con Ejemplos Canónicos',
        action: 'Incluye en tu archivo de reglas un ejemplo perfecto de cómo debe verse un componente o endpoint en tu aplicación. Los modelos imitan estilos existentes con un 95% más de fidelidad cuando ven un ejemplo canónico.'
      },
      {
        step: 'Paso 4',
        title: 'Actualización Dinámica de Contexto',
        action: 'Mantén un archivo `CURRENT_SPRINT.md` con las tareas en progreso y requisitos no funcionales, referenciándolo al inicio de cada conversación.'
      }
    ],
    criticalRules: [
      'Menos es más en el Context Window: Meter 100 archivos no relacionados al contexto satura la atención ("Attention Degradation") y hace que el modelo cometa errores en lógica elemental.',
      'Reglas Afirmativas y Concretas: En lugar de "haz buen código", escribe "usa zod para parsear inputs en controladores de express".',
      'Versiona tus reglas en Git: El archivo de reglas de IA debe estar en el repositorio para que todo el equipo comparta el mismo estándar de desarrollo asistido.'
    ],
    proTips: [
      'Si una IA insiste en usar una librería anticuada (ej: moment.js en vez de date-fns/Temporal), añade una cláusula en tus reglas: "PROHIBIDO: moment.js, lodash; usa métodos estándar de ES2024+".',
      'Configura atajos de teclado para invocar al asistente con los archivos abiertos actuales para reducir la fricción a cero.'
    ]
  },
  {
    id: 'agents',
    number: '04',
    title: 'Agentes Autónomos (ReAct, Loop & Protocolo MCP)',
    subtitle: 'El Ingeniero Autónomo de Ciclo Completo',
    description: 'La cúspide del Vibe Coding. Un agente combina razonamiento ReAct (Reason + Act), invocación de herramientas (Tool Calling) a través del estándar abierto MCP (Model Context Protocol) y capacidad de explorar el árbol de archivos, editar y ejecutar comandos de forma autónoma.',
    coreObjective: 'Transformar una especificación en lenguaje natural de alto nivel en un Pull Request completo, probado, formateado y listo para producción sin intervención manual paso a paso.',
    anatomyItems: [
      {
        name: 'Bucle de Razonamiento ReAct (Plan -> Tool -> Observe -> Loop)',
        role: 'El agente desglosa la tarea en subtareas atómicas, emite llamadas a herramientas de bash/filesystem, analiza la respuesta y ajusta el plan.',
        techStack: 'ReAct Pattern, Function Calling, Anthropic Tools, LangGraph',
        codeExample: `// Loop de Agente ReAct Simplificado
while (!isTaskFinished && iterations < MAX_ITERATIONS) {
  const thought = await model.reason(conversationState);
  const toolCall = await model.decideTool(thought);
  
  if (toolCall.name === "execute_bash") {
    const output = await sandbox.exec(toolCall.params.command);
    conversationState.append({ role: "tool", output });
  } else if (toolCall.name === "edit_file") {
    await applyFileEdit(toolCall.params.file, toolCall.params.patch);
    conversationState.append({ role: "tool", output: "Patch applied successfully" });
  }
  iterations++;
}`
      },
      {
        name: 'Protocolo MCP (Model Context Protocol)',
        role: 'Estándar abierto de Anthropic que permite al agente conectarse a PostgreSQL, GitHub, Jira, servidores de staging y herramientas personalizadas.',
        techStack: 'MCP SDK (TypeScript/Python), JSON-RPC 2.0, Stdio transports',
        codeExample: `// Servidor MCP para ejecutar tests y devolver AST
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server({ name: "git-test-runner", version: "1.0.0" }, {
  capabilities: { tools: {} }
});

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [{
    name: "run_test_suite",
    description: "Ejecuta los tests unitarios y devuelve los fallos",
    inputSchema: { type: "object", properties: { suiteName: { type: "string" } } }
  }]
}));`
      },
      {
        name: 'Supervisión Humana y Freno de Emergencia (Human-in-the-Loop)',
        role: 'Mecanismo que pide confirmación al desarrollador antes de ejecutar comandos destructivos (`rm`, `drop database`, `git push --force`).',
        techStack: 'CLI Prompts, Confirmation Gates, Git Checkpoints',
        codeExample: `# Política de seguridad de ejecución de herramientas
allowed_tools_without_prompt:
  - read_file
  - search_grep
  - git_status
  - run_local_tests
blocked_tools_require_human_confirmation:
  - bash_arbitrary_eval
  - git_push
  - npm_publish
  - rm_directory`
      }
    ],
    stepByStepGuide: [
      {
        step: 'Paso 1',
        title: 'Definición de Herramientas Atómicas (Tool Declarations)',
        action: 'Expón al agente únicamente herramientas puras y deterministas: `read_file`, `list_directory`, `search_regex`, `apply_diff` y `run_command`.'
      },
      {
        step: 'Paso 2',
        title: 'Establecimiento de Git Checkpoints',
        action: 'Antes de iniciar cualquier acción, el agente debe crear un stash o commit temporal: `git commit -m "WIP: checkpoint before agent task"`. Así, si el agente se desvía, revertir toma 1 segundo.'
      },
      {
        step: 'Paso 3',
        title: 'Fase Obligatoria de Planificación (Plan First)',
        action: 'Obliga al agente a escribir primero su plan en un archivo `TODO_PLAN.md` y listar qué archivos piensa tocar antes de generar cualquier modificación de código.'
      },
      {
        step: 'Paso 4',
        title: 'Auto-Verificación y Creación del Commit',
        action: 'Al terminar, el agente ejecuta el arnés de pruebas (Capa 2), limpia archivos temporales y emite un commit con descripción detallada en formato Conventional Commits.'
      }
    ],
    criticalRules: [
      'Principio de Mínimo Privilegio: El agente nunca debe tener variables de entorno de producción (claves Stripe, AWS Secrets, Firebase Admin) en su sesión de desarrollo.',
      'Stop Sequences y Budget de Iteraciones: Define siempre un límite estricto (ej: máximo 15 llamadas a herramientas) para evitar bucles infinitos de facturación.',
      'No confíes en las explicaciones en texto del agente: Confía solo en el código resultante y en el resultado del arnés de pruebas.'
    ],
    proTips: [
      'Claude Code CLI y Roo Code son los máximos exponentes actuales del paradigma de agente autónomo local asistido por MCP.',
      'Puedes orquestar múltiples subagentes: un agente "Arquitecto" que diseña la interfaz de datos, y un agente "Implementador" que escribe los tests y el código.'
    ]
  }
];
