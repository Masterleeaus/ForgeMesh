import { Command } from 'commander'
import { readFileSync } from 'node:fs'
import { resolve as resolvePath, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { initCommand } from './commands/init.js'
import { getBuiltinPlatforms } from './platforms/registry.js'
import { getAgentCount, getCategoryCount } from './generators/agents.js'
import pc from 'picocolors'

const AGENT_COUNT = getAgentCount()
const CAT_COUNT = getCategoryCount()

function getVersion(): string {
  try {
    const currentDir = dirname(fileURLToPath(import.meta.url))
    const pkgPath = resolvePath(currentDir, '..', 'package.json')
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))
    return pkg.version || '0.0.0'
  } catch {
    return '0.2.0'
  }
}

export function createCLI(): Command {
  const program = new Command()

  program
    .name('agents-profiles-cli')
    .description('Multi-Agent System Setup Wizard')
    .version(getVersion())

  program
    .command('init')
    .description('run the setup wizard in your project')
    .argument('[directory]', 'project directory (default: current)')
    .option('-y, --yes', 'non-interactive mode (minimal defaults)')
    .option('--offline', 'skip fetching agent profiles from GitHub')
    .addHelpText('after', `
Examples:
  ${pc.dim('$')} agents-profiles-cli init                     ${pc.dim('# interactive wizard')}
  ${pc.dim('$')} agents-profiles-cli init ./my-app            ${pc.dim('# run in ./my-app')}
  ${pc.dim('$')} agents-profiles-cli init --yes               ${pc.dim('# minimal, no prompts')}
  ${pc.dim('$')} agents-profiles-cli init --yes --offline     ${pc.dim('# minimal, offline')}

The wizard will:
  1. detect your project languages & frameworks
  2. (optional) AI analysis — recommends agents for your stack
  3. pick your AI platform — OpenCode, Claude, Copilot, Cursor, etc.
  4. select agents — minimal (10), standard (pick), or complete (all ${AGENT_COUNT})
  5. download agent profiles from GitHub (or your AI fetches them at runtime)
  6. generate config files — AGENTS.md, CLAUDE.md, .cursorrules, etc.`)
    .action(async (dir?: string, opts?: { yes?: boolean; offline?: boolean }) => {
      const online = opts?.offline !== true
      const result = await initCommand(dir, opts?.yes ?? false, online)
      if (!result.success && result.error !== 'cancelled') {
        console.error(`\n  ${pc.red('◆')} ${result.error}`)
        process.exit(1)
      }
    })

  program
    .command('list')
    .alias('ls')
    .description('show supported platforms and their config files')
    .action(() => {
      console.log()
      console.log(`  ${pc.bold('Supported Platforms')}`)
      console.log()
      for (const p of getBuiltinPlatforms()) {
        console.log(`  ${pc.cyan('◆')} ${pc.bold(p.name)}`)
        console.log(`    ${pc.dim('config')}   ${p.configFiles.join(', ')}`)
        console.log(`    ${pc.dim('agents')}   ./${p.agentDir}/`)
        console.log()
      }
      console.log(`  ${pc.dim('Custom providers · define your own via')} ${pc.cyan('init')}`)
      console.log()
    })

  program
    .command('detect')
    .description('scan a project and show detected tech')
    .argument('[directory]', 'project directory (default: current)')
    .action(async (dir?: string) => {
      const { detectProject } = await import('./detectors/project.js')
      const cwd = dir ? resolvePath(dir) : process.cwd()
      const project = await detectProject(cwd)
      console.log()
      console.log(`  ${pc.bold('Project Detection')}`)
      console.log()
      console.log(`  ${pc.dim('languages'.padEnd(14))} ${project.languages.join(', ') || pc.dim('unknown')}`)
      if (project.frameworks.length > 0) {
        console.log(`  ${pc.dim('frameworks'.padEnd(14))} ${project.frameworks.join(', ')}`)
      }
      if (project.packageManager) {
        console.log(`  ${pc.dim('package manager'.padEnd(14))} ${project.packageManager}`)
      }
      console.log(`  ${pc.dim('docker'.padEnd(14))} ${project.hasDocker ? pc.green('yes') : pc.dim('no')}`)
      if (project.hasDockerCompose) {
        console.log(`  ${pc.dim('docker compose'.padEnd(14))} ${pc.green('yes')}`)
      }
      if (project.hasKubernetes) {
        console.log(`  ${pc.dim('kubernetes'.padEnd(14))} ${pc.green('yes')}`)
      }
      if (project.hasTerraform) {
        console.log(`  ${pc.dim('terraform'.padEnd(14))} ${pc.green('yes')}`)
      }
      console.log(`  ${pc.dim('ci/cd'.padEnd(14))} ${project.hasCiCd ? pc.green('yes') : pc.dim('no')}`)
      if (project.hasMobile) {
        console.log(`  ${pc.dim('mobile'.padEnd(14))} ${pc.green('yes')}`)
      }
      if (project.hasEmbedded) {
        console.log(`  ${pc.dim('embedded'.padEnd(14))} ${pc.green('yes')}`)
      }
      if (project.hasGame) {
        console.log(`  ${pc.dim('game'.padEnd(14))} ${pc.green('yes')}`)
      }
      if (project.testFrameworks.length > 0) {
        console.log(`  ${pc.dim('testing'.padEnd(14))} ${project.testFrameworks.join(', ')}`)
      }
      if (project.databases.length > 0) {
        console.log(`  ${pc.dim('databases'.padEnd(14))} ${project.databases.join(', ')}`)
      }
      if (project.messageQueues.length > 0) {
        console.log(`  ${pc.dim('message queues'.padEnd(14))} ${project.messageQueues.join(', ')}`)
      }
      if (project.cloudProviders.length > 0) {
        console.log(`  ${pc.dim('cloud'.padEnd(14))} ${project.cloudProviders.join(', ')}`)
      }
      if (project.aiMl) {
        console.log(`  ${pc.dim('ai/ml'.padEnd(14))} ${pc.green('yes')}`)
      }
      if (project.monitoring) {
        console.log(`  ${pc.dim('monitoring'.padEnd(14))} ${pc.green('yes')}`)
      }
      console.log()
    })

  program.addHelpText('before', `
  ${pc.bold('agents-profiles-cli')}  ${pc.dim(`v${getVersion()}`)}
  ${pc.dim('Configure any AI coding assistant with a multi-agent engineering team.')}
  ${pc.dim(`${AGENT_COUNT} specialist profiles · ${CAT_COUNT} categories · 8 platforms supported`)}

  ${pc.dim('Quick start:')}
    ${pc.cyan('agents-profiles-cli init')}

  ${pc.dim('Install:')}
    ${pc.dim('npm install -g agents-profiles-cli')}
`)

  return program
}
