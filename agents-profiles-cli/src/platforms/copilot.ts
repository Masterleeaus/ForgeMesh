import type { InitOptions, GeneratorOutput, PlatformInfo } from '../types.js'
import { generatePlatformConfig } from './shared.js'

export const copilotInfo: PlatformInfo = {
  id: 'copilot', name: 'GitHub Copilot', description: "GitHub's AI pair programmer",
  configFiles: ['.github/copilot-instructions.md'], configDir: '.github', agentDir: '.github/agents',
  nativeAgentDir: 'copilot', agentExt: '.agent.md', enabled: true,
}

export async function generateCopilot(options: InitOptions, cwd: string): Promise<GeneratorOutput> {
  return generatePlatformConfig(options, cwd, copilotInfo, '.github/copilot-instructions.md',
    `## For GitHub Copilot Users
- This file is loaded automatically by Copilot as \`.github/copilot-instructions.md\`
- Agent profiles are in \`.github/agents/\`
- Copilot Chat uses these instructions for context-aware assistance`)
}
