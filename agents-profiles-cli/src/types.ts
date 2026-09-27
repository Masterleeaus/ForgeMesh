export interface AgentProfile {
  id: string
  name: string
  category: string
  description: string
  file: string
  permissions?: 'read-only' | 'read-write' | 'infrastructure'
  tools?: string[]
}

export type SupportedPlatform =
  | 'opencode'
  | 'claude'
  | 'copilot'
  | 'cursor'
  | 'windsurf'
  | 'aider'
  | 'continue'
  | 'generic'
  | 'custom'

export interface PlatformInfo {
  id: string
  name: string
  description: string
  configFiles: string[]
  configDir: string
  agentDir: string
  nativeAgentDir: string
  agentExt: string
  enabled: boolean
}

export interface CustomProviderDef {
  id: string
  name: string
  description: string
  configFilePath: string
  configFormat: 'markdown' | 'json' | 'yaml' | 'toml' | 'text'
}

export interface DetectedProject {
  languages: string[]
  frameworks: string[]
  packageManager: string | null
  hasDocker: boolean
  hasDockerCompose: boolean
  hasKubernetes: boolean
  hasTerraform: boolean
  hasCiCd: boolean
  hasMobile: boolean
  hasEmbedded: boolean
  hasGame: boolean
  testFrameworks: string[]
  databases: string[]
  messageQueues: string[]
  cloudProviders: string[]
  aiMl: boolean
  monitoring: boolean
}

export interface AICredentials {
  baseUrl: string
  apiKey: string
  model: string
}

export interface AIAnalysisResult {
  projectSummary: string
  recommendedAgentIds: string[]
  reasoning: string
}

export interface InitOptions {
  cwd: string
  templatesDir: string
  platforms: SupportedPlatform[]
  agents: AgentProfile[]
  projectName: string
  includeAllAgents: boolean
  agentDepth: 'minimal' | 'standard' | 'complete'
  customProviders: CustomProviderDef[]
  customAgents: AgentProfile[]
  aiCredentials?: AICredentials
  aiAnalysis?: AIAnalysisResult
  online?: boolean
}

export interface GeneratorOutput {
  platform: string
  files: Array<{ path: string; content: string }>
  agentFiles: Array<{ src?: string; content?: string; dest: string }>
}
