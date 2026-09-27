import type { InitOptions, GeneratorOutput, PlatformInfo } from '../types.js'
import { generatePlatformConfig } from './shared.js'

export const opencodeInfo: PlatformInfo = {
  id: 'opencode', name: 'OpenCode', description: 'AI coding assistant with powerful agent orchestration',
  configFiles: ['AGENTS.md'], configDir: '.opencode', agentDir: '.opencode/agents',
  nativeAgentDir: 'opencode', agentExt: '.md', enabled: true,
}

export async function generateOpenCode(options: InitOptions, cwd: string): Promise<GeneratorOutput> {
  return generatePlatformConfig(options, cwd, opencodeInfo, 'AGENTS.md',
    `## For OpenCode Users
- This file is loaded automatically by OpenCode as \`AGENTS.md\`
- Run \`opencode\` in your terminal to start
- OpenCode reads this file and activates the multi-agent system`)
}
