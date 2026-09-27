import type { InitOptions, GeneratorOutput, PlatformInfo } from '../types.js'
import { generatePlatformConfig } from './shared.js'

export const claudeInfo: PlatformInfo = {
  id: 'claude', name: 'Claude Code', description: "Anthropic's AI coding assistant",
  configFiles: ['CLAUDE.md'], configDir: '.claude', agentDir: '.claude/agents',
  nativeAgentDir: 'claude', agentExt: '.md', enabled: true,
}

export async function generateClaude(options: InitOptions, cwd: string): Promise<GeneratorOutput> {
  return generatePlatformConfig(options, cwd, claudeInfo, 'CLAUDE.md',
    `## For Claude Code Users
- This file is loaded automatically by Claude Code as \`CLAUDE.md\`
- Run \`claude\` in your terminal to start
- Claude Code reads this file and activates the multi-agent system`)
}
