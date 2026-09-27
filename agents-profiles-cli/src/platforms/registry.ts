import type { PlatformInfo, GeneratorOutput, InitOptions, SupportedPlatform } from '../types.js'
import { opencodeInfo } from './opencode.js'
import { generateOpenCode } from './opencode.js'
import { claudeInfo } from './claude.js'
import { generateClaude } from './claude.js'
import { copilotInfo } from './copilot.js'
import { generateCopilot } from './copilot.js'
import { cursorInfo, windsurfInfo } from './cursor.js'
import { generateCursor, generateWindsurf } from './cursor.js'
import { aiderInfo } from './aider.js'
import { generateAider } from './aider.js'
import { continueInfo, genericInfo } from './continue.js'
import { generateContinue, generateGeneric } from './continue.js'
import { generateCustom } from './custom.js'

export interface PlatformGenerator {
  info: PlatformInfo
  generate: (options: InitOptions, cwd: string) => Promise<GeneratorOutput>
}

const builtinGenerators: Record<string, PlatformGenerator> = {
  opencode: { info: opencodeInfo, generate: generateOpenCode },
  claude: { info: claudeInfo, generate: generateClaude },
  copilot: { info: copilotInfo, generate: generateCopilot },
  cursor: { info: cursorInfo, generate: generateCursor },
  windsurf: { info: windsurfInfo, generate: generateWindsurf },
  aider: { info: aiderInfo, generate: generateAider },
  continue: { info: continueInfo, generate: generateContinue },
  generic: { info: genericInfo, generate: generateGeneric },
}

export function getBuiltinPlatforms(): PlatformInfo[] {
  return Object.values(builtinGenerators).map((g) => g.info)
}

export async function generateForPlatforms(
  platforms: SupportedPlatform[],
  options: InitOptions,
  cwd: string,
): Promise<GeneratorOutput[]> {
  const results: GeneratorOutput[] = []

  for (const id of platforms) {
    if (id === 'custom') {
      for (const cp of options.customProviders) {
        const output = await generateCustom(cp, options, cwd)
        results.push(output)
      }
    } else {
      const gen = builtinGenerators[id]
      if (gen) {
        const output = await gen.generate(options, cwd)
        results.push(output)
      }
    }
  }

  return results
}
