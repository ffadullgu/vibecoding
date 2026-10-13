export type LayerType = 'models' | 'harness' | 'assistants' | 'agents';

export type PlatformId = 'claude' | 'deepseek' | 'opencode' | 'cursor' | 'grok' | 'gemini' | 'copilot';

export interface AICodingPlatform {
  id: PlatformId;
  name: string;
  vendor: string;
  flagshipModel: string;
  executionMode: 'Cloud' | 'Híbrido' | 'Local / Open-Source';
  category: 'Agente CLI / Terminal' | 'IDE Nativo AI' | 'Modelo de Razonamiento' | 'Ecosistema Cloud';
  contextWindow: string;
  contextTokens: number;
  sweBenchScore: string; // e.g. "70.3% SWE-bench Verified"
  latencyTier: 'Ultra Rápida (<1s)' | 'Media (1-3s)' | 'Razonamiento Profundo (5-20s)';
  costTier: 'Gratis / Open-Weights' | 'Bajo ($)' | 'Medio ($$)' | 'Premium ($$$)';
  pricingDetail: string;
  offlineCapable: boolean;
  mcpSupport: boolean;
  multiFileRefactor: 'Nativo Autónomo' | 'Semi-Asistido' | 'Por Bloques / Diff';
  astIndexing: boolean;
  bestFor: string;
  scores: {
    reasoning: number;      // 1-100
    multiFileAgent: number; // 1-100
    speedIteration: number; // 1-100
    tokenEconomy: number;   // 1-100
    contextWindow: number;  // 1-100
    developerControl: number; // 1-100
  };
  strengths: string[];
  weaknesses: string[];
  keyArchitecture: string;
  cliCommand?: string;
  configFile: {
    fileName: string;
    description: string;
    snippet: string;
  };
}

export interface ArchitectureLayer {
  id: LayerType;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  coreObjective: string;
  anatomyItems: {
    name: string;
    role: string;
    techStack: string;
    codeExample: string;
  }[];
  stepByStepGuide: {
    step: string;
    title: string;
    action: string;
    codeSnippet?: string;
  }[];
  criticalRules: string[];
  proTips: string[];
}

export interface PromptTemplate {
  id: string;
  title: string;
  category: 'Arquitectura' | 'Arnés de Test' | 'Asistente & Contexto' | 'Agente ReAct / MCP' | 'Vibe Coding Rápido' | 'Refactor Seguro' | 'Debugging Extremo';
  targetPlatform: string;
  summary: string;
  systemPrompt: string;
  userPromptTemplate: string;
  variables: {
    key: string;
    label: string;
    defaultValue: string;
  }[];
  expectedResult: string;
  seniorTip: string;
}

export interface ManualGuide {
  id: string;
  platformId: PlatformId;
  title: string;
  difficulty: 'Intermedio' | 'Avanzado' | 'Experto';
  timeToSetup: string;
  prerequisites: string[];
  architectureOverview: string;
  installationCommands: string[];
  configurationSteps: {
    stepNumber: number;
    title: string;
    explanation: string;
    codeFile?: string;
    codeContent?: string;
  }[];
  vibeCodingWorkflow: {
    phase: string;
    developerAction: string;
    aiAction: string;
  }[];
  troubleshootingTips: {
    problem: string;
    solution: string;
  }[];
}
