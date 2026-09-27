import type { InitOptions } from '../types.js'
import { runInteractiveFlow } from '../tui/prompts.js'
import { generateForPlatforms } from '../platforms/registry.js'
import { writeGeneratedFile, rollbackWrittenFiles, ensureDir } from '../utils/fs.js'
import { writeFile } from 'node:fs/promises'
import { join, dirname, resolve } from 'node:path'
import type { WrittenFile } from '../utils/fs.js'
import { logStep, logSuccess, logDetail, logHeader, logFooter, logInfo, logError } from '../utils/logger.js'
import pc from 'picocolors'
import { fileURLToPath } from 'node:url'
import { readFileSync } from 'node:fs'
import { getAgentCount, getCategoryCount } from '../generators/agents.js'

function getVersion(): string {
  try {
    const currentDir = dirname(fileURLToPath(import.meta.url))
    const pkgPath = resolve(currentDir, '..', 'package.json')
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))
    return pkg.version || '0.0.0'
  } catch {
    return '0.2.1'
  }
}

function resolveTemplatesDir(): string {
  const isDev = process.env.AGENTS_CLI_DEV === 'true'
  if (isDev) return resolve(process.cwd())
  const dir = typeof __dirname !== 'undefined'
    ? resolve(__dirname, '..', '..', '..')
    : resolve(fileURLToPath(import.meta.url), '..', '..', '..', '..')
  return resolve(dir)
}

export interface InitResult {
  success: boolean
  projectName: string
  platforms: string[]
  agentCount: number
  fileCount: number
  error?: string
}

export async function initCommand(dir?: string, nonInteractive?: boolean, online?: boolean): Promise<InitResult> {
  const cwd = dir ? resolve(dir) : process.cwd()
  const templatesDir = resolveTemplatesDir()

  logHeader(getVersion())
  logInfo(`Project: ${pc.dim(cwd)}`)

  let options: InitOptions
  try {
    options = await runInteractiveFlow(cwd, templatesDir, nonInteractive, online)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    if (msg === 'cancelled') return { success: false, projectName: '', platforms: [], agentCount: 0, fileCount: 0 }
    logError(msg)
    return { success: false, projectName: '', platforms: [], agentCount: 0, fileCount: 0, error: msg }
  }

  const platformCount = options.platforms.length
  logStep(1, 2, `Generating configs for ${platformCount} platform${platformCount !== 1 ? 's' : ''}`)

  let allWritten: WrittenFile[] = []

  try {
    const outputs = await generateForPlatforms(options.platforms, options, cwd)

    logStep(2, 2, 'Writing files')

    let totalFiles = 0
    let totalAgents = 0
    let fetchCount = 0

    for (const output of outputs) {
      for (const file of output.files) {
        const result = await writeGeneratedFile(cwd, file.path, file.content)
        allWritten.push({ fullPath: result })
        logSuccess(`${output.platform.padEnd(14)} ${pc.dim(result.replace(cwd, '.'))}`)
        totalFiles++
      }
      for (const af of output.agentFiles) {
        if (af.content) {
          const destFull = join(cwd, af.dest)
          await ensureDir(dirname(destFull))
          await writeFile(destFull, af.content, 'utf-8')
          allWritten.push({ fullPath: destFull })
          fetchCount++
        }
        totalAgents++
      }
    }

    logFooter(cwd, options.agents.length)

    const platformLabels = options.platforms.map((p) =>
      p === 'custom' ? `custom (${options.customProviders.length})` : p
    )

    const summary: string[] = [
      `  ${pc.dim('Project'.padEnd(12))} ${options.projectName}`,
      `  ${pc.dim('Platform'.padEnd(12))} ${platformLabels.join(', ')}`,
      `  ${pc.dim('Agents'.padEnd(12))} ${options.agents.length} selected · ${getAgentCount()} available across ${getCategoryCount()} categories`,
      `  ${pc.dim('Files'.padEnd(12))} ${totalFiles} config · ${totalAgents} agent profiles`,
    ]
    if (fetchCount > 0) {
      summary.push(`  ${pc.dim('Fetched'.padEnd(12))} ${fetchCount} profiles from GitHub`)
    }
    if (options.aiCredentials) {
      summary.push(`  ${pc.dim('AI'.padEnd(12))} ${options.aiCredentials.model}`)
    }
    console.log(`  ${pc.dim('─'.repeat(46))}`)
    console.log(summary.join('\n'))
    console.log()

    return {
      success: true,
      projectName: options.projectName,
      platforms: options.platforms,
      agentCount: options.agents.length,
      fileCount: totalFiles + totalAgents,
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    logError(msg)

    if (allWritten.length > 0) {
      logInfo('Rolling back…')
      await rollbackWrittenFiles(allWritten)
      logInfo(`Cleaned up ${allWritten.length} file(s)`)
    }

    return {
      success: false,
      projectName: options.projectName,
      platforms: options.platforms,
      agentCount: options.agents.length,
      fileCount: 0,
      error: msg,
    }
  }
}
