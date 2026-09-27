import type { InitOptions, GeneratorOutput, PlatformInfo } from '../types.js'
import { copyNativeAgents, buildCuratedConfig } from './helpers.js'

export async function generatePlatformConfig(
  options: InitOptions,
  _cwd: string,
  platform: PlatformInfo,
  configPath: string,
  extra?: string,
): Promise<GeneratorOutput> {
  const files: GeneratorOutput['files'] = []
  const agentFiles: GeneratorOutput['agentFiles'] = []

  const copyResults = await copyNativeAgents(options, platform, _cwd)
  for (const r of copyResults) {
    if (r.copied && r.fetched && r.content) {
      agentFiles.push({ content: r.content, dest: r.dest })
    } else if (r.copied && r.src) {
      agentFiles.push({ src: r.src, dest: r.dest })
    }
  }

  const content = buildCuratedConfig(options, platform.name, platform.agentDir, extra)
  files.push({ path: configPath, content })

  return { platform: platform.id, files, agentFiles }
}
