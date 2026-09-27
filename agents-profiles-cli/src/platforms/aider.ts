import type { InitOptions, GeneratorOutput, PlatformInfo } from '../types.js'
import { generatePlatformConfig } from './shared.js'

export const aiderInfo: PlatformInfo = {
  id: 'aider', name: 'Aider', description: 'AI pair programming in the terminal',
  configFiles: ['.aider-rules.md'], configDir: '.aider', agentDir: '.aider',
  nativeAgentDir: 'opencode', agentExt: '.md', enabled: true,
}

export async function generateAider(options: InitOptions, cwd: string): Promise<GeneratorOutput> {
  return generatePlatformConfig(options, cwd, aiderInfo, '.aider-rules.md',
    `## For Aider Users
- This file is loaded automatically by Aider as \`.aider-rules.md\`
- Run \`aider\` in your terminal to start
- Use \`/add\` to include files before asking agent questions`)
}
