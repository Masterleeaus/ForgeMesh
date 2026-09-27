import type { InitOptions, GeneratorOutput, PlatformInfo } from '../types.js'
import { generatePlatformConfig } from './shared.js'

export const cursorInfo: PlatformInfo = {
  id: 'cursor', name: 'Cursor', description: 'AI-first code editor',
  configFiles: ['.cursorrules'], configDir: '.cursor', agentDir: '.cursor/rules',
  nativeAgentDir: 'opencode', agentExt: '.md', enabled: true,
}

export const windsurfInfo: PlatformInfo = {
  id: 'windsurf', name: 'Windsurf', description: 'Agentic IDE by Codeium',
  configFiles: ['.windsurfrules'], configDir: '.windsurf', agentDir: '.windsurf/rules',
  nativeAgentDir: 'opencode', agentExt: '.md', enabled: true,
}

export async function generateCursor(options: InitOptions, cwd: string): Promise<GeneratorOutput> {
  return generatePlatformConfig(options, cwd, cursorInfo, '.cursorrules',
    `## For Cursor Users
- This file is loaded automatically by Cursor as \`.cursorrules\`
- Agent profiles are in \`.cursor/rules/\`
- Cursor Composer uses these rules for context-aware assistance`)
}

export async function generateWindsurf(options: InitOptions, cwd: string): Promise<GeneratorOutput> {
  return generatePlatformConfig(options, cwd, windsurfInfo, '.windsurfrules',
    `## For Windsurf Users
- This file is loaded automatically by Windsurf as \`.windsurfrules\`
- Agent profiles are in \`.windsurf/rules/\`
- Windsurf uses these rules for agentic coding assistance`)
}
