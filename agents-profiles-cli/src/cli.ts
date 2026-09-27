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
    return '0.2.1'
  }
}

export function createCLI(): Command {
  const program = new Command()

  program
    .name('forgemesh')
    .description('ForgeMesh Adaptive Engineering Workforce')
    .version(getVersion())

  program
    .command('init')
    .description('scan a project and configure its specialist engineering workforce')
    .argument('[directory]', 'project directory (default: current)')
    .option('-y, --yes', 'non-interactive mode (minimal defaults)')
    .option('--offline', 'operate without fetching specialist definitions from GitHub')
    .addHelpText('after', `
Examples:
  ${pc.dim('$')} forgemesh init                     ${pc.dim('# interactive workforce setup')}
  ${pc.dim('$')} forgemesh init ./my-app            ${pc.dim('# analyze ./my-app')}
  ${pc.dim('$')} forgemesh init --yes               ${pc.dim('# minimal, no prompts')}
  ${pc.dim('$')} forgemesh init --yes --offline     ${pc.dim('# local/offline setup')}

ForgeMesh will:
  1. detect project languages, frameworks, data and infrastructure signals
  2. optionally use model-assisted analysis to recommend specialist capabilities
  3. select a target engineering environment — OpenCode, Claude, Copilot, Cursor, etc.
  4. compose a project-specific workforce from ${AGENT_COUNT} specialist capabilities
  5. resolve specialist definitions locally or from the ForgeMesh repository
  6. compile native configuration — AGENTS.md, CLAUDE.md, .cursorrules, etc.`)
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
    .description('show supported engineering environments and generated configuration')
    .action(() => {
      console.log()
      console.log(`  ${pc.bold('Supported Engineering Environments')}`)
      console.log()
      for (const p of getBuiltinPlatforms()) {
        console.log(`  ${pc.cyan('◆')} ${pc.bold(p.name)}`)
        console.log(`    ${pc.dim('config')}   ${p.configFiles.join(', ')}`)
        console.log(`    ${pc.dim('specialists')}   ./${p.agentDir}/`)
        console.log()
      }
      console.log(`  ${pc.dim('Custom providers · define your own via')} ${pc.cyan('init')}`)
      console.log()
    })

  program
    .command('detect')
    .alias('scan')
    .description('scan a software project and show its detected system fingerprint')
    .argument('[directory]', 'project directory (default: current)')
    .action(async (dir?: string) => {
      const { detectProject } = await import('./detectors/project.js')
      const cwd = dir ? resolvePath(dir) : process.cwd()
      const project = await detectProject(cwd)
      console.log()
      console.log(`  ${pc.bold('ForgeMesh System Scan')}`)
      console.log()
      console.log(`  ${pc.dim('languages'.padEnd(14))} ${project.languages.join(', ') || pc.dim('unknown')}`)
      if (project.frameworks.length > 0) console.log(`  ${pc.dim('frameworks'.padEnd(14))} ${project.frameworks.join(', ')}`)
      if (project.packageManager) console.log(`  ${pc.dim('package manager'.padEnd(14))} ${project.packageManager}`)
      console.log(`  ${pc.dim('docker'.padEnd(14))} ${project.hasDocker ? pc.green('yes') : pc.dim('no')}`)
      if (project.hasDockerCompose) console.log(`  ${pc.dim('docker compose'.padEnd(14))} ${pc.green('yes')}`)
      if (project.hasKubernetes) console.log(`  ${pc.dim('kubernetes'.padEnd(14))} ${pc.green('yes')}`)
      if (project.hasTerraform) console.log(`  ${pc.dim('terraform'.padEnd(14))} ${pc.green('yes')}`)
      console.log(`  ${pc.dim('ci/cd'.padEnd(14))} ${project.hasCiCd ? pc.green('yes') : pc.dim('no')}`)
      if (project.hasMobile) console.log(`  ${pc.dim('mobile'.padEnd(14))} ${pc.green('yes')}`)
      if (project.hasEmbedded) console.log(`  ${pc.dim('embedded'.padEnd(14))} ${pc.green('yes')}`)
      if (project.hasGame) console.log(`  ${pc.dim('game'.padEnd(14))} ${pc.green('yes')}`)
      if (project.testFrameworks.length > 0) console.log(`  ${pc.dim('testing'.padEnd(14))} ${project.testFrameworks.join(', ')}`)
      if (project.databases.length > 0) console.log(`  ${pc.dim('databases'.padEnd(14))} ${project.databases.join(', ')}`)
      if (project.messageQueues.length > 0) console.log(`  ${pc.dim('message queues'.padEnd(14))} ${project.messageQueues.join(', ')}`)
      if (project.cloudProviders.length > 0) console.log(`  ${pc.dim('cloud'.padEnd(14))} ${project.cloudProviders.join(', ')}`)
      if (project.aiMl) console.log(`  ${pc.dim('ai/ml'.padEnd(14))} ${pc.green('yes')}`)
      if (project.monitoring) console.log(`  ${pc.dim('monitoring'.padEnd(14))} ${pc.green('yes')}`)
      console.log()
    })

  program.addHelpText('before', `
  ${pc.bold('ForgeMesh')}  ${pc.dim(`v${getVersion()}`)}
  ${pc.dim('Adaptive Engineering Workforce')}
  ${pc.dim('Scan the system. Assemble the specialists. Execute with evidence.')}
  ${pc.dim(`${AGENT_COUNT} specialist capabilities · ${CAT_COUNT} domains · multi-platform compilation`)}

  ${pc.dim('Quick start:')}
    ${pc.cyan('forgemesh init')}

  ${pc.dim('Install:')}
    ${pc.dim('npm install -g forgemesh')}
`)

  return program
}
