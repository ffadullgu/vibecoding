import { ManualGuide } from '../types';

export const MANUAL_GUIDES: ManualGuide[] = [
  {
    id: 'manual-claude',
    platformId: 'claude',
    title: 'Manual de Ingeniería: Claude 3.7 Sonnet & Claude Code CLI',
    difficulty: 'Avanzado',
    timeToSetup: '5 minutos',
    prerequisites: [
      'Node.js 18+ instalado en tu máquina',
      'Cuenta en Anthropic Console con API Key activa',
      'Git configurado en tu repositorio local'
    ],
    architectureOverview: 'Claude 3.7 Sonnet introduce razonamiento híbrido ajustable ("Extended Thinking Budget") y Claude Code CLI, un agente autónomo de terminal que opera directamente sobre tu árbol de trabajo de Git, ejecutando tests locales y corrigiendo fallos de forma iterativa sin salir de la línea de comandos.',
    installationCommands: [
      'npm install -g @anthropic-ai/claude-code',
      'claude # Inicia el login y vincula tu API key',
      'cd mi-proyecto && claude # Lanza el agente en el contexto de tu repo'
    ],
    configurationSteps: [
      {
        stepNumber: 1,
        title: 'Configuración del Archivo de Reglas Maestro (.claude/rules.md)',
        explanation: 'Claude Code lee automáticamente cualquier regla definida en `.claude/rules.md` o en `.cursorrules`. Este archivo define los límites operativos del modelo y evita que modifique archivos protegidos.',
        codeFile: '.claude/rules.md',
        codeContent: `# Reglas de Arquitectura para Claude
- Prohibido el uso de librerías deprecated.
- Todo cambio en lógica de negocio debe acompañarse de tests unitarios.
- Ejecuta 'npm test' antes de declarar cualquier tarea como completada.
- No introduzcas dependencias npm adicionales sin confirmación explícita.`
      },
      {
        stepNumber: 2,
        title: 'Ajuste del Thinking Budget para Tareas Complejas',
        explanation: 'En tareas de refactorización o diseño de algoritmos, especifica un budget de pensamiento para que el modelo razone a fondo antes de tocar el código.',
        codeFile: 'terminal-command.sh',
        codeContent: `# Invocar a Claude pidiendo razonamiento profundo
claude "Analiza el sistema de caché en src/cache.ts y rediséñalo para evitar race conditions con mutex en Redis. Piensa detenidamente antes de editar."`
      },
      {
        stepNumber: 3,
        title: 'Integración de Servidores MCP (Model Context Protocol)',
        explanation: 'Conecta Claude a tus herramientas de entorno local mediante el archivo de configuración `claude_desktop_config.json` o la configuración de Claude Code.',
        codeFile: '~/.claude/claude_desktop_config.json',
        codeContent: `{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxxx" }
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://localhost/mi_bd"]
    }
  }
}`
      }
    ],
    vibeCodingWorkflow: [
      {
        phase: '1. Planificación',
        developerAction: 'Ejecuta `claude` y describe la funcionalidad en lenguaje natural.',
        aiAction: 'Explora el árbol git, lee los archivos relevantes y genera un plan de 4 pasos.'
      },
      {
        phase: '2. Edición & Feedback',
        developerAction: 'Aprueba el plan o ajusta restricciones.',
        aiAction: 'Aplica diffs en los archivos, ejecuta el test runner de tu proyecto y captura errores si los hay.'
      },
      {
        phase: '3. Verificación & Commit',
        developerAction: 'Revisa el git diff con `git status` o aprueba la propuesta de commit.',
        aiAction: 'Crea un commit semántico en git con descripción detallada de los cambios.'
      }
    ],
    troubleshootingTips: [
      {
        problem: 'Error de Rate Limit (HTTP 429) en Anthropic API',
        solution: 'Configura un cooldown o habilita Prompt Caching. Claude Code aprovecha el caching automáticamente en sesiones continuas reduciendo el consumo de tokens en un 90%.'
      },
      {
        problem: 'El agente modifica archivos que no debería tocar',
        solution: 'Añade una regla explícita en `.claude/rules.md`: "ZONA PROHIBIDA: No edites ningún archivo dentro de config/ o migrations/ sin orden directa".'
      }
    ]
  },
  {
    id: 'manual-deepseek',
    platformId: 'deepseek',
    title: 'Manual de Ingeniería: DeepSeek-R1 / V3 (Local & Cloud)',
    difficulty: 'Avanzado',
    timeToSetup: '8 minutos',
    prerequisites: [
      'Hardware recomendado: Mac M2/M3/M4 (32GB+ RAM) o GPU NVIDIA RTX 3090/4090 para local',
      'Ollama o vLLM instalado, o API Key de DeepSeek',
      'Cliente de coding (Aider, Cursor o Continue)'
    ],
    architectureOverview: 'DeepSeek-R1 es un modelo de razonamiento de pesos abiertos (Open-Weights) entrenado con aprendizaje por refuerzo a gran escala. Destaca por emitir una cadena de pensamiento explícita (`<think>...</think>`), lo que permite auditar su deducción matemática y lógica antes de aceptar su código.',
    installationCommands: [
      '# Opción A: Despliegue 100% Local con Ollama',
      'ollama pull deepseek-r1:32b # Para equipos con 32GB-64GB RAM',
      'ollama pull deepseek-r1:14b # Para laptops estándar (16GB RAM)',
      '# Opción B: Uso vía API con Aider',
      'export DEEPSEEK_API_KEY="sk-tu-api-key"',
      'aider --model deepseek/deepseek-reasoner'
    ],
    configurationSteps: [
      {
        stepNumber: 1,
        title: 'Optimización de Parámetros de Inferencia en vLLM / Ollama',
        explanation: 'DeepSeek-R1 requiere temperatura fija entre 0.5 y 0.7 para permitir que su cadena de razonamiento explore hipótesis sin volverse errática.',
        codeFile: 'Modelfile (Ollama)',
        codeContent: `FROM deepseek-r1:32b
PARAMETER temperature 0.6
PARAMETER top_p 0.95
PARAMETER num_ctx 32768
SYSTEM """Eres un ingeniero senior de sistemas. En tu bloque <think> analiza invariantes, complejidad temporal O(n) y riesgos de concurrencia. En tu respuesta final, emite únicamente código limpio, tipado y sin rodeos."""`
      },
      {
        stepNumber: 2,
        title: 'Conexión de DeepSeek a Continue.dev en VS Code',
        explanation: 'Configura la extensión Continue para usar DeepSeek-R1 como modelo de chat/arquitectura y DeepSeek-Coder-V2/Qwen2.5 para autocompletado en tiempo real.',
        codeFile: '~/.continue/config.json',
        codeContent: `{
  "models": [
    {
      "title": "DeepSeek R1 (Reasoner)",
      "provider": "deepseek",
      "model": "deepseek-reasoner",
      "apiKey": "sk-xxxx"
    }
  ],
  "tabAutocompleteModel": {
    "title": "Qwen Coder 2.5 (Local)",
    "provider": "ollama",
    "model": "qwen2.5-coder:7b"
  }
}`
      },
      {
        stepNumber: 3,
        title: 'Técnica Anti-Loop para Reasoning Tokens',
        explanation: 'Si notas que el modelo entra en un bucle reflexivo infinito en problemas sencillos, añade una instrucción delimitadora estricta.',
        codeFile: 'prompt-directive.txt',
        codeContent: `[DIRECTIVA DE CONTROL]
Limita tu razonamiento preliminar a un máximo de 10 pasos lógicos.
Una vez identificada la causa raíz del bug, pasa directamente a la emisión del diff.`
      }
    ],
    vibeCodingWorkflow: [
      {
        phase: '1. Formulación del Problema',
        developerAction: 'Proporciona el código defectuoso y el comportamiento esperado.',
        aiAction: 'El modelo genera tokens `<think>` analizando cómo interactúan los datos y las referencias en memoria.'
      },
      {
        phase: '2. Auditoría del Pensamiento',
        developerAction: 'El desarrollador lee el razonamiento para validar si el modelo entendió el problema real.',
        aiAction: 'Emite la solución definitiva y explica por qué la hipótesis previa fallaba.'
      },
      {
        phase: '3. Integración Local',
        developerAction: 'Aplica el parche con Aider o copia el diff en tu editor.',
        aiAction: 'Cero datos salieron de tu computadora (si usaste el motor local Ollama/vLLM).'
      }
    ],
    troubleshootingTips: [
      {
        problem: 'Inferencia muy lenta en GPU local (<5 tokens/s)',
        solution: 'Verifica la cuantización: usa versiones AWQ o GGUF Q4_K_M. Asegúrate de tener configurado `--gpu-layers all` en Ollama para que ningún cálculo caiga en la CPU.'
      },
      {
        problem: 'El modelo responde en chino o mezcla idiomas en <think>',
        solution: 'Inicia el system prompt con: "Debes responder y razonar exclusivamente en español (o inglés) técnico neutro".'
      }
    ]
  },
  {
    id: 'manual-opencode',
    platformId: 'opencode',
    title: 'Manual de Ingeniería: Stack Open Source (Aider, Tree-Sitter & Repo Maps)',
    difficulty: 'Intermedio',
    timeToSetup: '3 minutos',
    prerequisites: [
      'Python 3.10+ y pip instalados',
      'Git instalado y repositorio inicializado',
      'API Key de cualquier proveedor (o endpoint local de Ollama)'
    ],
    architectureOverview: 'Aider es el estándar de oro en herramientas de código abierto para desarrollo en terminal. Su gran ventaja arquitectónica es el "Repo Map": utiliza Tree-Sitter para parsear el AST de todo tu repositorio y crea un mapa hiper-compacto de tipos, clases y funciones que inyecta en cada petición sin desbordar el contexto.',
    installationCommands: [
      'pip install -U aider-chat',
      'cd mi-repositorio',
      '# Lanzar con Claude Sonnet:',
      'aider --sonnet',
      '# Lanzar 100% offline con modelo local:',
      'aider --model ollama/qwen2.5-coder:32b'
    ],
    configurationSteps: [
      {
        stepNumber: 1,
        title: 'Creación del Archivo de Configuración (.aider.conf.yml)',
        explanation: 'Personaliza los comandos de prueba y linter automáticos para que Aider valide cada cambio antes de hacer commit en Git.',
        codeFile: '.aider.conf.yml',
        codeContent: `model: anthropic/claude-3-7-sonnet-20250219
auto-commits: true
show-diffs: true
lint-cmd: "npm run lint"
test-cmd: "npm test"
auto-lint: true
auto-test: true
map-tokens: 2048`
      },
      {
        stepNumber: 2,
        title: 'Control Quirúrgico de Archivos en Sesión (/add y /drop)',
        explanation: 'En Aider no necesitas meter todo el repositorio al contexto. Añade solo los archivos que requieren edición.',
        codeFile: 'sesion-aider.sh',
        codeContent: `# Comandos internos en el prompt de Aider:
/add src/components/UserProfile.tsx
/add src/types/user.ts
# Ahora haz tu petición:
"Añade un campo avatarUrl con fallback a iniciales y guarda el cambio"`
      },
      {
        stepNumber: 3,
        title: 'Uso del Modo Arquitecto (/architect)',
        explanation: 'Aider permite dividir la tarea: un modelo de alto razonamiento diseña la solución (ej: Claude 3.7 o DeepSeek-R1) y un modelo más rápido y económico aplica los diffs.',
        codeFile: 'architect-mode.txt',
        codeContent: `# Activar modo de doble modelo en Aider
/architect
# Ahora el primer modelo actúa como Arquitecto y el segundo como Editor`
      }
    ],
    vibeCodingWorkflow: [
      {
        phase: '1. Indexación del AST',
        developerAction: 'Inicias Aider en el directorio raíz.',
        aiAction: 'Tree-Sitter indexa todas las firmas y tipos del repositorio en menos de 2 segundos.'
      },
      {
        phase: '2. Petición y Diff',
        developerAction: 'Pides una funcionalidad o arreglo de bug.',
        aiAction: 'Genera el diff unificado, lo aplica directamente en disco y ejecuta el comando de tests configurado.'
      },
      {
        phase: '3. Auto-Commit en Git',
        developerAction: 'Si los tests pasan, el cambio queda registrado.',
        aiAction: 'Aider genera un mensaje de commit git semántico y lo guarda en tu historial local.'
      }
    ],
    troubleshootingTips: [
      {
        problem: 'El modelo genera diffs que fallan al aplicarse en disco',
        solution: 'Cambia el formato de edición con el flag `--edit-format diff` o `--edit-format whole` para archivos pequeños.'
      },
      {
        problem: 'El Repo Map consume demasiados tokens en proyectos gigantes',
        solution: 'Ajusta `map-tokens: 1024` en tu `.aider.conf.yml` o añade carpetas no críticas a tu `.gitignore` (Aider respeta el gitignore automáticamente).'
      }
    ]
  },
  {
    id: 'manual-cursor',
    platformId: 'cursor',
    title: 'Manual de Ingeniería: Cursor Composer, .cursorrules & Shadow Workspace',
    difficulty: 'Intermedio',
    timeToSetup: '2 minutos',
    prerequisites: [
      'Cursor IDE (descargable en cursor.com)',
      'Proyecto abierto en el editor',
      'Configuración de indexación de codebase activada'
    ],
    architectureOverview: 'Cursor es el IDE nativo de AI más utilizado para Vibe Coding. Integra un "Shadow Workspace" en segundo plano que compila el código antes de mostrar el diff, y un Composer multi-archivo capaz de orquestar cambios simultáneos a través de decenas de ficheros con previsualización interactiva.',
    installationCommands: [
      '# Instalar Cursor desde terminal (Mac con Homebrew):',
      'brew install --cask cursor',
      '# O descargar directamente el instalador oficial',
      'cursor . # Abre tu proyecto actual en Cursor'
    ],
    configurationSteps: [
      {
        stepNumber: 1,
        title: 'Creación de Reglas Estrictas en .cursorrules',
        explanation: 'El archivo `.cursorrules` en la raíz de tu proyecto es la ley fundamental de Cursor. Determina el tono, stack, librerías vetadas y estándares de arquitectura.',
        codeFile: '.cursorrules',
        codeContent: `# Reglas de Proyecto Cursor
Role: Senior Staff Software Engineer
Language: TypeScript (strict mode, no any)
Styling: Tailwind CSS v4. No inline styles.
State Management: Zustand / React 19 Hooks.
Architecture:
- Maintain single-responsibility principle in all components.
- Do not remove existing comments or JSDocs.
- When generating new components, always export their Props interface.`
      },
      {
        stepNumber: 2,
        title: 'Dominio de Símbolos de Contexto (@codebase, @docs, @git)',
        explanation: 'Cursor permite inyectar contexto contextual instantáneo usando el carácter @ en el chat o en Composer.',
        codeFile: 'composer-prompt.txt',
        codeContent: `@codebase ¿Dónde se manejan las sesiones de usuario y cómo puedo añadir refresh tokens con rotación?
@src/auth/session.ts Modifica esta clase para emitir un evento 'token_expired' cuando la respuesta sea 401.`
      },
      {
        stepNumber: 3,
        title: 'Flujo de Composer Multi-Archivo (Ctrl/Cmd + I)',
        explanation: 'Usa Composer en lugar del chat simple cuando necesites crear archivos nuevos y actualizar consumidores existentes al mismo tiempo.',
        codeFile: 'composer-workflow.txt',
        codeContent: `Atajo: Cmd + I (Mac) o Ctrl + I (Windows/Linux)
1. Escribe la meta general del sprint.
2. Revisa la lista de archivos sugeridos por Cursor.
3. Haz clic en "Accept All" o revisa diff por diff con "Accept / Reject".`
      }
    ],
    vibeCodingWorkflow: [
      {
        phase: '1. Invocación de Composer',
        developerAction: 'Abre Composer (Cmd + I) y solicita la nueva funcionalidad.',
        aiAction: 'Indexa el grafo de imports, determina qué ficheros deben modificarse y crea los borradores.'
      },
      {
        phase: '2. Previsualización de Diffs',
        developerAction: 'Inspecciona los cambios visuales en el editor con resaltado verde/rojo.',
        aiAction: 'El Shadow Workspace corre la verificación de tipos para prevenir errores de importación.'
      },
      {
        phase: '3. Aceptación y Guardado',
        developerAction: 'Presiona "Accept All" o atajo Cmd+Enter.',
        aiAction: 'Guarda todos los archivos atómicamente en disco.'
      }
    ],
    troubleshootingTips: [
      {
        problem: 'Cursor no encuentra archivos con @codebase',
        solution: 'Ve a Configuración > Features > Codebase Indexing y haz clic en "Resync Index". Asegúrate de que tu `.gitignore` no esté ocultando código fuente por error.'
      },
      {
        problem: 'Composer sobrescribe funciones que no debía tocar',
        solution: 'Añade la instrucción: "MODIFICA EXCLUSIVAMENTE las funciones indicadas; deja el resto del archivo exactamente intacto".'
      }
    ]
  },
  {
    id: 'manual-grok',
    platformId: 'grok',
    title: 'Manual de Ingeniería: Grok 3 (Fast Prototyping & Reasoning)',
    difficulty: 'Intermedio',
    timeToSetup: '2 minutos',
    prerequisites: [
      'Acceso a Grok 3 / suscripción X Premium o API Key de xAI',
      'Cliente de desarrollo o llamadas REST con cURL / Python / Node'
    ],
    architectureOverview: 'Grok 3 de xAI destaca por su capacidad de razonamiento matemático y síntesis de infraestructura a una velocidad de generación de tokens sumamente elevada en el supercluster Colossus. Es la herramienta idónea para Vibe Coding de prototipos veloces, scripts de DevOps complejos y código sin filtros conservadores.',
    installationCommands: [
      '# Usar vía SDK compatible con OpenAI:',
      'npm install openai',
      'export XAI_API_KEY="xai-tu-llave-api"'
    ],
    configurationSteps: [
      {
        stepNumber: 1,
        title: 'Script de Prototipado Rápido con Grok 3 Reasoning',
        explanation: 'Configura un script de Node/TypeScript para invocar Grok 3 en modo thinking y resolver problemas de infraestructura o algoritmos.',
        codeFile: 'grok-runner.ts',
        codeContent: `import OpenAI from "openai";

const grok = new OpenAI({
  apiKey: process.env.XAI_API_KEY,
  baseURL: "https://api.x.ai/v1"
});

async function prototypeService() {
  const completion = await grok.chat.completions.create({
    model: "grok-3-latest",
    messages: [
      { role: "system", content: "Eres un ingeniero senior de infraestructura. Diseña sistemas resilientes, scripts de bash y manifiestos de Kubernetes listos para producción." },
      { role: "user", content: "Escribe un script de despliegue zero-downtime con Docker Swarm, rollback automático ante fallo de healthcheck y alertas a Slack." }
    ]
  });
  console.log(completion.choices[0].message.content);
}

prototypeService();`
      },
      {
        stepNumber: 2,
        title: 'Vibe Coding con Grok en Web & Terminal',
        explanation: 'Aprovecha su velocidad para generar interfaces completas en un solo turno y luego iterar de manera reactiva.',
        codeFile: 'prompt-vibe-grok.txt',
        codeContent: `Actúa como arquitecto senior. Genera una SPA completa en React 19 + Tailwind CSS en un único archivo autónomo con simulación de datos en memoria, gráficos en SVG nativo y cero librerías externas.`
      }
    ],
    vibeCodingWorkflow: [
      {
        phase: '1. Definición de la Visión',
        developerAction: 'Describe el sistema completo en una sola tirada sin preocuparte por detalles de bajo nivel.',
        aiAction: 'Grok procesa la solicitud a alta velocidad y genera la arquitectura inicial y scripts asociados.'
      },
      {
        phase: '2. Ejecución & Validación',
        developerAction: 'Pega el script en tu sandbox y pruébalo en segundos.',
        aiAction: 'Ajusta parámetros de red, puertos o dependencias según las respuestas de tus comandos de terminal.'
      }
    ],
    troubleshootingTips: [
      {
        problem: 'Falta de soporte nativo en IDEs tradicionales',
        solution: 'Puedes usar Grok 3 en Continue.dev o Cline configurando el proveedor OpenAI-compatible con la baseURL `https://api.x.ai/v1`.'
      }
    ]
  },
  {
    id: 'manual-gemini',
    platformId: 'gemini',
    title: 'Manual de Ingeniería: Gemini 2.5 (2M Tokens & Multimodal Codebase)',
    difficulty: 'Intermedio',
    timeToSetup: '3 minutos',
    prerequisites: [
      'API Key de Google AI Studio (aistudio.google.com)',
      'SDK oficial @google/genai instalado en tu entorno Node/TS'
    ],
    architectureOverview: 'Gemini 2.5 de Google DeepMind es la única familia de modelos de vanguardia que soporta hasta 2 millones de tokens en su ventana de contexto activa. Esto permite empaquetar monorepositorios completos, bases de datos completas de esquemas y documentación interna en una sola llamada sin requerir sistemas complejos de RAG o fragmentación.',
    installationCommands: [
      'npm install @google/genai',
      'export GEMINI_API_KEY="tu-api-key-de-ai-studio"'
    ],
    configurationSteps: [
      {
        stepNumber: 1,
        title: 'Empaquetado de Monorepo Completo con Repomix',
        explanation: 'Genera un único archivo consolidado con todo tu código fuente para enviarlo a Gemini 2.5 Pro.',
        codeFile: 'bundle-repo.sh',
        codeContent: `# Empaquetar todo el proyecto en formato XML optimizado
npx repomix --style xml --output codebase-full.xml \\
  --ignore "node_modules,dist,.git,coverage"`
      },
      {
        stepNumber: 2,
        title: 'Auditoría Global con el SDK Oficial @google/genai',
        explanation: 'Pasa todo el monorepo a Gemini para detectar inconsistencias arquitectónicas, memory leaks o dependencias circulares.',
        codeFile: 'audit-codebase.ts',
        codeContent: `import { GoogleGenAI } from "@google/genai";
import * as fs from "fs";

const ai = new GoogleGenAI();
const fullCodebase = fs.readFileSync("codebase-full.xml", "utf-8");

async function audit() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-pro",
    contents: [
      { text: "Eres un Principal Architect. Analiza TODO este código y genera una lista priorizada de los 5 mayores riesgos técnicos y dependencias circulares:" },
      { text: fullCodebase }
    ]
  });
  console.log(response.text);
}

audit();`
      },
      {
        stepNumber: 3,
        title: 'Vibe Coding Multimodal: De Figma/Diseño a Código',
        explanation: 'Sube capturas de pantalla de interfaces o diagramas de arquitectura en PNG/JPG junto con tu solicitud de código.',
        codeFile: 'multimodal-coding.ts',
        codeContent: `// Enviar imagen + prompt
const imagePart = {
  inlineData: {
    data: Buffer.from(fs.readFileSync("mockup.png")).toString("base64"),
    mimeType: "image/png"
  }
};

const result = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: [
    { text: "Convierte este diseño en un componente React 19 con Tailwind CSS v4 totalmente responsivo y accesible:" },
    imagePart
  ]
});`
      }
    ],
    vibeCodingWorkflow: [
      {
        phase: '1. Ingesta Masiva',
        developerAction: 'Envías el archivo `codebase-full.xml` de 500,000 tokens a Gemini.',
        aiAction: 'Carga el repositorio entero en su memoria activa sin perder ningún detalle de tipos.'
      },
      {
        phase: '2. Consultas Transversales',
        developerAction: 'Preguntas: "¿Cómo afecta modificar el modelo User en la capa de pagos y en los webhooks de Stripe?".',
        aiAction: 'Rastrea todas las referencias a lo largo de 40 archivos distintos con precisión milimétrica.'
      }
    ],
    troubleshootingTips: [
      {
        problem: 'La respuesta es demasiado extensa y se corta a la mitad',
        solution: 'Pídele explícitamente a Gemini que devuelva únicamente un plan en viñetas o un diff compacto en lugar de reproducir archivos enteros.'
      }
    ]
  }
];
