import { PromptTemplate } from '../types';

export const PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: 'senior-vibe-coder',
    title: 'Prompt Maestro: Arquitecto Senior para Vibe Coding',
    category: 'Vibe Coding Rápido',
    targetPlatform: 'Claude 3.7 / Cursor Composer / DeepSeek-R1',
    summary: 'Convierte cualquier modelo en un arquitecto de software implacable que primero analiza el impacto, preserva invariantes y emite código modular sin atajos.',
    systemPrompt: `Eres un Principal Software Engineer con 15+ años de experiencia. Tu objetivo es implementar la funcionalidad solicitada manteniendo calidad de código de nivel Google/Netflix.
Reglas Inmutables:
1. No uses atajos ni 'TODOs'. Todo código debe ser completo y ejecutable.
2. Invariabilidad de firmas públicas: no rompas interfaces existentes sin autorización explícita.
3. Tipado estricto: cero 'any', cero coerción no segura de tipos.
4. Explica tu razonamiento en 3 viñetas concisas ANTES del bloque de código.
5. Si detectas un error conceptual en el requerimiento del usuario, señálalo educadamente con una alternativa viable.`,
    userPromptTemplate: `Necesito implementar la siguiente funcionalidad en mi proyecto:
- Contexto y Stack: {{STACK}}
- Módulo / Archivo objetivo: {{MODULO}}
- Requisito funcional: {{REQUISITO}}
- Restricciones no funcionales: {{RESTRICCIONES}}

Por favor, actúa como Arquitecto Senior:
1. Evalúa los riesgos de regresión antes de tocar el código.
2. Genera la solución completa lista para producción.
3. Proporciona una suite de pruebas unitarias mínimas que verifiquen el caso nominal y 2 casos de borde.`,
    variables: [
      { key: 'STACK', label: 'Stack Tecnológico', defaultValue: 'React 19 + TypeScript 5.8 + Vite + Tailwind CSS v4' },
      { key: 'MODULO', label: 'Módulo / Archivo Afectado', defaultValue: 'src/features/billing/SubscriptionManager.tsx' },
      { key: 'REQUISITO', label: 'Requisito Funcional', defaultValue: 'Permitir cambio de plan de suscripción con cálculo prorrata y confirmación modal reactiva' },
      { key: 'RESTRICCIONES', label: 'Restricciones Técnicas', defaultValue: 'Cero librerías de UI externas adicionales, mantener compatibilidad con Stripe Elements y pruebas con Vitest' }
    ],
    expectedResult: 'Un plan de 3 pasos, el componente modular con tipos exportados, manejo exhaustivo de estados de carga/error y un archivo de tests unitarios listo para ejecutar.',
    seniorTip: 'Úsalo con Claude 3.7 en modo Extended Thinking o en Cursor Composer con @codebase activado para máxima contextualización.'
  },
  {
    id: 'test-harness-builder',
    title: 'Prompt de Generación de Arnés de Pruebas Automatizado (Harness)',
    category: 'Arnés de Test',
    targetPlatform: 'Claude Code CLI / OpenCode Aider / DeepSeek',
    summary: 'Construye un arnés que corre linter, verificación de tipos y tests en un sandbox antes de permitir commits en tu rama principal.',
    systemPrompt: `Eres un Ingeniero de Infraestructura y Fiabilidad de Software (SRE/DevOps). Tu tarea es construir un arnés de pruebas (Test Harness) determinista que valide modificaciones de código realizadas por agentes de IA.
El arnés debe:
- Fallar inmediatamente (fail-fast) ante el primer error de linter o sintaxis.
- Producir un reporte estructurado en JSON con archivo, línea y mensaje de error.
- Proteger contra bucles infinitos con timeout estricto.`,
    userPromptTemplate: `Diseña un arnés de pruebas automatizado para el siguiente repositorio:
- Lenguaje / Entorno: {{LENGUAJE}}
- Comandos de verificación existentes: {{COMANDOS}}
- Requisito del Arnés:
  1. Un script de bash/Node que ejecute secuencialmente: Formato -> Linter -> Tipos -> Tests.
  2. Si ocurre un fallo, filtrar el stderr para extraer las 30 líneas más relevantes del stacktrace.
  3. Devolver el error formateado como prompt de corrección para el modelo de IA.
  4. Tiempo límite máximo por ejecución: {{TIMEOUT}} segundos.`,
    variables: [
      { key: 'LENGUAJE', label: 'Lenguaje / Framework', defaultValue: 'TypeScript / Node.js 22' },
      { key: 'COMANDOS', label: 'Comandos Existentes', defaultValue: 'npm run lint && npx tsc --noEmit && npm test' },
      { key: 'TIMEOUT', label: 'Timeout en Segundos', defaultValue: '45' }
    ],
    expectedResult: 'Un script ejecutable `harness.sh` o `harness.ts` con manejo de señales de interrupción, captura de salidas y generación de un payload JSON listo para alimentar el bucle del agente.',
    seniorTip: 'Configura este script dentro de tu `pre-commit` hook con Husky o como el comando `--test-cmd` en Aider CLI.'
  },
  {
    id: 'zero-regression-refactor',
    title: 'Prompt de Refactorización Quirúrgica Multi-Archivo (Zero-Regression)',
    category: 'Refactor Seguro',
    targetPlatform: 'Cursor Composer / Claude 3.7 Sonnet / Windsurf',
    summary: 'Ideal para mover lógica legada a una arquitectura limpia sin romper dependencias indirectas en otros ficheros.',
    systemPrompt: `Eres un especialista en Refactorización y Arquitectura Hexagonal. Tu principio rector es: NINGUNA MODIFICACIÓN DEBE INTRODUCIR REGRESIONES DE COMPORTAMIENTO.
Al refactorizar:
1. Extrae interfaces antes de modificar implementaciones.
2. Mantén retrocompatibilidad con adaptadores o aliases cuando sea necesario.
3. Proporciona diffs unificados exactos, preservando identación y comentarios existentes.`,
    userPromptTemplate: `Necesito refactorizar la siguiente porción de código:
- Archivos a intervenir: {{ARCHIVOS}}
- Patrón actual (Problema): {{PROBLEMA_ACTUAL}}
- Patrón deseado (Meta): {{PATRON_DESEADO}}

Procedimiento obligatorio:
1. Identifica qué otros módulos importan las funciones/clases de estos archivos.
2. Presenta la refactorización dividida en fases atómicas: Fase 1 (Nuevas abstracciones), Fase 2 (Migración de consumidores), Fase 3 (Deprecación del código legado).
3. Asegura que los tests existentes sigan pasando al 100%.`,
    variables: [
      { key: 'ARCHIVOS', label: 'Archivos Afectados', defaultValue: 'src/api/auth.ts, src/hooks/useUser.ts, src/components/Header.tsx' },
      { key: 'PROBLEMA_ACTUAL', label: 'Problema del Código Actual', defaultValue: 'Llamadas fetch directas sin validación, tokens guardados en localStorage sin rotación y lógica acoplada al render' },
      { key: 'PATRON_DESEADO', label: 'Meta de Arquitectura', defaultValue: 'Capa de servicio tipada con TanStack Query, HttpOnly cookies y hook desacoplado con estados derivables' }
    ],
    expectedResult: 'Plan de migración por capas, código refactorizado con tipado exhaustivo y una guía de verificación para garantizar cero caídas en producción.',
    seniorTip: 'En Cursor o Windsurf, abre los 3 archivos en pestañas contiguas y menciónalos explícitamente con @archivo para que el modelo tenga el árbol de referencias completo en memoria.'
  },
  {
    id: 'mcp-agent-architect',
    title: 'Prompt de Agente ReAct con Servidor MCP Personalizado',
    category: 'Agente ReAct / MCP',
    targetPlatform: 'Claude Code / Claude Desktop / Roo Code',
    summary: 'Define la especificación y código de un servidor Model Context Protocol (MCP) que permite al agente consultar datos reales o disparar acciones seguras.',
    systemPrompt: `Eres un Arquitecto de Agentes Autónomos especializado en el protocolo abierto MCP (Model Context Protocol). Conoces las especificaciones de JSON-RPC 2.0 y el ciclo de vida de herramientas cliente-servidor de Anthropic.
Diseña servidores MCP con:
- Validación estricta de esquemas con JSON Schema o Zod.
- Manejo defensivo de excepciones.
- Descripciones de herramientas semánticamente ricas para que el LLM comprenda cuándo invocarlas.`,
    userPromptTemplate: `Necesito crear un servidor MCP en {{LENGUAJE}} para dotar a mi agente de IA de las siguientes capacidades:
- Nombre del Servidor: {{NOMBRE_SERVIDOR}}
- Herramientas a implementar: {{HERRAMIENTAS}}
- Entorno de ejecución: {{ENTORNO}}

Por favor:
1. Escribe el servidor completo usando el SDK oficial @modelcontextprotocol/sdk.
2. Define los esquemas de entrada para cada herramienta con Zod.
3. Genera la configuración JSON para agregarlo a claude_desktop_config.json o claude-code settings.`,
    variables: [
      { key: 'LENGUAJE', label: 'Lenguaje del Servidor', defaultValue: 'TypeScript (Node.js)' },
      { key: 'NOMBRE_SERVIDOR', label: 'Nombre del Servidor MCP', defaultValue: 'postgres-safe-inspector' },
      { key: 'HERRAMIENTAS', label: 'Herramientas Requeridas', defaultValue: 'explain_query (analiza planes de ejecución SQL sin escribir) y inspect_table_schema (obtiene columnas y tipos)' },
      { key: 'ENTORNO', label: 'Entorno de Conexión', defaultValue: 'Base de datos PostgreSQL local en Docker' }
    ],
    expectedResult: 'Código de servidor MCP listo para ejecutar mediante Stdio transport y el bloque de configuración JSON para integrarlo en Claude Desktop o Claude Code CLI.',
    seniorTip: 'El protocolo MCP es el estándar de facto actual; permite desacoplar la inteligencia del modelo de la infraestructura concreta de tu base de datos.'
  },
  {
    id: 'repo-map-onboarding',
    title: 'Prompt de Generación de Repo Map y Arquitectura Global',
    category: 'Asistente & Contexto',
    targetPlatform: 'Cualquier IA de Coding (Gemini 2.5 / DeepSeek / Claude / GPT)',
    summary: 'Genera una radiografía arquitectónica completa de un repositorio para nuevos desarrolladores o para alimentar la memoria permanente del asistente.',
    systemPrompt: `Eres un Arquitecto de Software Enterprise. Tu tarea es analizar la estructura de un repositorio y generar una síntesis arquitectónica compacta, libre de relleno y orientada a la toma de decisiones técnicas.`,
    userPromptTemplate: `He adjuntado la estructura de directorios y los archivos principales de configuración de mi proyecto:
- Directorio raíz y ficheros clave: {{ESTRUCTURA}}
- Tecnologías principales: {{STACK}}

Genera:
1. Diagrama de flujo de datos simplificado (ASCII o Mermaid).
2. Mapa de módulos: responsabilidad única de cada carpeta.
3. Invariantes de diseño que ningún desarrollador debe violar.
4. Archivo .cursorrules / .claude/rules.md optimizado para que cualquier IA entienda este proyecto en 1 segundo.`,
    variables: [
      { key: 'ESTRUCTURA', label: 'Estructura o Árbol de Carpetas', defaultValue: 'src/ (api, components, hooks, store, types), prisma/, server.ts, vite.config.ts' },
      { key: 'STACK', label: 'Stack y Dependencias Críticas', defaultValue: 'Express + React 19 + Prisma ORM + PostgreSQL + Tailwind CSS' }
    ],
    expectedResult: 'Documento ARCHITECTURE.md listo para commitear en el repo, incluyendo diagrama Mermaid y un conjunto afinado de reglas para asistentes.',
    seniorTip: 'Con Gemini 2.5 Pro puedes pasarle hasta 2 millones de tokens: usa `npx repomix` para empaquetar todo tu repositorio en un solo archivo XML y envíalo con este prompt.'
  },
  {
    id: 'concurrency-memory-debug',
    title: 'Prompt de Depuración Forense: Concurrencia, Leaks & Race Conditions',
    category: 'Debugging Extremo',
    targetPlatform: 'DeepSeek-R1 / Claude 3.7 (Extended Thinking)',
    summary: 'Diseñado específicamente para modelos con cadena de pensamiento profunda; encuentra bugs sutiles que las herramientas estáticas pasan por alto.',
    systemPrompt: `Eres un Ingeniero Forense de Sistemas y Rendimiento. Tu especialidad es encontrar condiciones de carrera (Race Conditions), fugas de memoria (Memory Leaks), problemas de ciclo de vida en React y bloqueos mutuos en sistemas asíncronos.
Analiza el código línea por línea prestando atención a:
- Mutaciones no sincronizadas en closures asíncronos.
- Listeners de eventos y suscripciones que no se limpian en unmount.
- Promesas no manejadas y rechazos silenciosos.
- Rendimiento en el render loop.`,
    userPromptTemplate: `Estamos experimentando el siguiente síntoma en producción:
- Síntoma observado: {{SINTOMA}}
- Fragmento de código sospechoso: {{CODIGO_SOSPECHOSO}}
- Entorno de ejecución: {{ENTORNO}}

Por favor:
1. Reconstruye el escenario exacto paso a paso (Timeline) donde ocurre la anomalía.
2. Explica la causa raíz a nivel de Event Loop o ciclo de vida del framework.
3. Propón la solución mínima invasiva con una explicación de por qué es matemáticamente imposible que vuelva a ocurrir.`,
    variables: [
      { key: 'SINTOMA', label: 'Síntoma o Comportamiento Erróneo', defaultValue: 'La aplicación consume 1.2GB de RAM tras 30 minutos de uso y el estado se desincroniza al cambiar rápidamente de pestaña' },
      { key: 'CODIGO_SOSPECHOSO', label: 'Snippet / Hook Sospechoso', defaultValue: 'useEffect con WebSocket onmessage que actualiza estado sin cleanup ni abort controller' },
      { key: 'ENTORNO', label: 'Navegador / Runtime', defaultValue: 'Chrome 130+ en SPA React 19 con WebSockets' }
    ],
    expectedResult: 'Análisis forense de causalidad, demostración del leak en el memory graph y código refactorizado con Cleanup pattern y AbortSignal.',
    seniorTip: 'DeepSeek-R1 y Claude 3.7 destacan especialmente aquí porque sus tokens de razonamiento simulan la máquina virtual mentalmente antes de emitir la corrección.'
  }
];
