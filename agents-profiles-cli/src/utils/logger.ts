import pc from 'picocolors'

const SYM = {
  info: pc.cyan('◆'),
  success: pc.green('◆'),
  warn: pc.yellow('◇'),
  error: pc.red('◆'),
  bullet: pc.dim('┃'),
  arrow: pc.dim('└─'),
}

export function logInfo(msg: string): void {
  console.log(`  ${SYM.info} ${msg}`)
}

export function logSuccess(msg: string): void {
  console.log(`  ${SYM.success} ${pc.green(msg)}`)
}

export function logWarn(msg: string): void {
  console.log(`  ${SYM.warn} ${pc.yellow(msg)}`)
}

export function logError(msg: string): void {
  console.log(`  ${SYM.error} ${pc.red(msg)}`)
}

export function logDetail(msg: string): void {
  console.log(`  ${SYM.bullet} ${pc.dim(msg)}`)
}

export function logStep(step: number, total: number, msg: string): void {
  console.log(`\n  ${pc.bold(pc.cyan(`▸ ${step}/${total}`))} ${pc.bold(msg)}`)
}

export function logDivider(): void {
  console.log(`  ${pc.dim('─'.repeat(50))}`)
}

export function logHeader(version: string): void {
  console.log(`\n  ${pc.bold('agents-profiles-cli')} ${pc.dim(`v${version}`)}`)
  console.log(`  ${pc.dim('Multi-Agent System Setup Wizard')}`)
  console.log()
}

export function logFooter(projectDir: string, agentCount: number): void {
  const displayPath = projectDir === '.' ? process.cwd() : projectDir
  console.log()
  logDivider()
  console.log(`  ${pc.green('◆')} ${pc.bold(pc.green('All set!'))}`)
  console.log(`  ${pc.dim(`Configuration written to ${pc.cyan(displayPath)}`)}`)
  console.log(`  ${pc.dim(`${agentCount} agent profiles ready`)}`)
  console.log(`  ${pc.dim('Open your AI assistant and tell it to initialize the system.')}`)
  console.log()
}
