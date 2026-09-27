import * as p from '@clack/prompts'
import pc from 'picocolors'
import type { InitOptions, SupportedPlatform, AgentProfile, CustomProviderDef, AICredentials, AIAnalysisResult } from '../types.js'
import { detectProject } from '../detectors/project.js'
import { matchAgents } from '../detectors/matcher.js'
import { getBuiltinPlatforms } from '../platforms/registry.js'
import { getAgentCatalog, getAgentCategories, getAgentsByCategory, getMinimalAgents, getAgentCount, getCategoryCount, getCategoryAgentCounts } from '../generators/agents.js'
import { analyzeProject } from '../ai/analyzer.js'
import { logInfo, logSuccess, logWarn, logDetail } from '../utils/logger.js'
import { checkInternetConnectivity } from '../utils/network.js'

class FlowCancelled extends Error {
  constructor() {
    super('cancelled')
    this.name = 'FlowCancelled'
  }
}

function cancel(): never {
  p.cancel('Setup cancelled.')
  throw new FlowCancelled()
}

function isCancelled<T>(val: T | symbol): val is symbol {
  return p.isCancel(val)
}

async function detectAndMatch(dir: string): Promise<AgentProfile[]> {
  try {
    const project = await detectProject(dir)
    return matchAgents(project)
  } catch {
    return getMinimalAgents()
  }
}

async function nonInteractiveDefaults(cwd: string, online?: boolean): Promise<InitOptions> {
  const agents = await detectAndMatch(cwd)
  const effectiveOnline = online ?? (await checkInternetConnectivity(2000)).online
  return {
    cwd,
    templatesDir: '',
    projectName: 'my-project',
    platforms: ['opencode'],
    agents,
    includeAllAgents: false,
    agentDepth: 'minimal',
    customProviders: [],
    customAgents: [],
    online: effectiveOnline,
  }
}

export async function runInteractiveFlow(
  cwd: string,
  templatesDir: string,
  nonInteractive?: boolean,
  online?: boolean,
): Promise<InitOptions> {
  if (nonInteractive) {
    return { ...(await nonInteractiveDefaults(cwd, online)), templatesDir }
  }

  // Probe internet early — used later for the online prompt
  const initialConnectivity = await checkInternetConnectivity(3000)

  const agentCount = getAgentCount()
  const categoryCount = getCategoryCount()
  const categoryCounts = getCategoryAgentCounts()

  p.intro(`${pc.bold('agents-profiles-cli')} ${pc.dim('Multi-Agent System Setup')}`)

  const project = await detectProject(cwd)
  if (project.languages.length > 0 && project.languages[0] !== 'Unknown') {
    logDetail(`project · ${project.languages.join(', ')}${project.frameworks.length > 0 ? ` + ${project.frameworks.join(', ')}` : ''}`)
  }

  const matchedAgents = project.languages[0] !== 'Unknown' ? matchAgents(project) : []
  if (matchedAgents.length > 0) {
    logDetail(`matched · ${matchedAgents.length} agents for your stack`)
  }
  console.log()

  // ── Project name ──
  const projectName = await p.text({
    message: 'Project name',
    placeholder: 'my-awesome-project',
    defaultValue: 'my-project',
    validate: (v) => { if (!v || v.trim().length === 0) return 'Required' },
  })
  if (isCancelled(projectName)) cancel()

  // ── AI analysis ──
  const useAi = await p.confirm({
    message: 'Let AI analyze your project and recommend agents?',
    initialValue: true,
  })
  if (isCancelled(useAi)) cancel()

  let aiCredentials: AICredentials | undefined
  let aiAnalysis: AIAnalysisResult | undefined

  if (useAi) {
    const baseUrl = await p.text({
      message: 'API base URL',
      placeholder: 'https://api.openai.com/v1',
      defaultValue: 'https://api.openai.com/v1',
    })
    if (isCancelled(baseUrl)) cancel()

    const apiKey = await p.password({
      message: 'API key',
      validate: (v) => { if (!v || v.length === 0) return 'API key is required' },
    })
    if (isCancelled(apiKey)) cancel()

    const model = await p.text({
      message: 'Model',
      placeholder: 'gpt-4o',
      defaultValue: 'gpt-4o',
    })
    if (isCancelled(model)) cancel()

    aiCredentials = {
      baseUrl: (baseUrl as string).trim(),
      apiKey: (apiKey as string).trim(),
      model: ((model as string).trim() || 'gpt-4o'),
    }

    const spin = p.spinner()
    spin.start('analyzing project')

    try {
      aiAnalysis = await analyzeProject(cwd, aiCredentials)
      spin.stop(`analyzed · ${aiAnalysis.projectSummary.slice(0, 80)}${aiAnalysis.projectSummary.length > 80 ? '…' : ''}`)
      if (aiAnalysis.recommendedAgentIds.length > 0) {
        logSuccess(`AI recommends ${aiAnalysis.recommendedAgentIds.length} agents`)
      }
    } catch (err) {
      spin.stop('analysis failed')
      logWarn(`AI error: ${err instanceof Error ? err.message : String(err)}`)
      logInfo('Falling back to manual selection')
    }
    console.log()
  }

  // ── Online mode ──
  const isOnline = initialConnectivity.online
  const connLabel = isOnline
    ? `internet ${pc.green('✓')} ${pc.dim(`(${initialConnectivity.latencyMs}ms)`)}`
    : `internet ${pc.red('✗')}`
  logDetail(connLabel)

  const useOnline = !isOnline
    ? false
    : await p.confirm({
        message: `Fetch agent profiles from GitHub now?`,
        initialValue: true,
      })
  if (typeof useOnline === 'symbol') cancel()
  if (useOnline) logDetail('agent .md files will be downloaded during setup')
  else logDetail('your AI will fetch profiles at runtime')

  // ── Platform selection ──
  console.log()
  const builtinChoices = getBuiltinPlatforms().map((pl) => ({
    value: pl.id as SupportedPlatform,
    label: `${pl.name}`,
    hint: pl.configFiles.join(', '),
  }))
  builtinChoices.push({ value: 'custom' as SupportedPlatform, label: 'Custom Provider', hint: 'your own AI tool' })

  const selectedPlatforms = await p.multiselect<SupportedPlatform>({
    message: 'AI platform(s)',
    options: builtinChoices,
    required: true,
  })
  if (isCancelled(selectedPlatforms)) cancel()

  // ── Custom providers ──
  const customProviders: CustomProviderDef[] = []
  if (selectedPlatforms.includes('custom' as SupportedPlatform)) {
    let addMore = true
    while (addMore) {
      const cpName = await p.text({
        message: 'Provider name',
        placeholder: 'My Custom AI',
        validate: (v) => { if (!v || v.trim().length === 0) return 'Required' },
      })
      if (isCancelled(cpName)) cancel()

      const cpId = (cpName as string).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'custom-ai'
      const cpDesc = await p.text({ message: 'Description', placeholder: 'Custom AI configuration', defaultValue: 'Custom provider' })
      if (isCancelled(cpDesc)) cancel()
      const cpFile = await p.text({ message: 'Config file path', placeholder: '.my-ai/config.md', defaultValue: `.${cpId}.md`, validate: (v) => { if (!v || v.trim().length === 0) return 'Required' } })
      if (isCancelled(cpFile)) cancel()
      const cpFormat = await p.select<string>({
        message: 'Config format',
        options: [
          { value: 'markdown', label: 'Markdown' },
          { value: 'json', label: 'JSON' },
          { value: 'yaml', label: 'YAML' },
          { value: 'toml', label: 'TOML' },
          { value: 'text', label: 'Plain Text' },
        ],
      })
      if (isCancelled(cpFormat)) cancel()
      customProviders.push({
        id: cpId,
        name: (cpName as string).trim(),
        description: (cpDesc as string).trim(),
        configFilePath: (cpFile as string).trim(),
        configFormat: cpFormat as any,
      })
      logSuccess(`Added ${(cpName as string).trim()}`)
      const more = await p.confirm({ message: 'Add another provider?', initialValue: false })
      if (isCancelled(more)) cancel()
      addMore = more === true
    }
  }

  // ── Agent selection ──
  console.log()
  const matchedHint = matchedAgents.length > 0
    ? `${matchedAgents.length} agents matched to your project`
    : `${getMinimalAgents().length} agents — orchestration + essentials`
  const depthOpts: { value: string; label: string; hint?: string }[] = [
    { value: 'minimal', label: 'Minimal', hint: matchedHint },
    { value: 'standard', label: 'Standard', hint: 'hand-pick categories and agents' },
    { value: 'complete', label: `Complete — all ${agentCount}`, hint: `full roster across ${categoryCount} categories` },
  ]

  const depthChoiceRaw = await p.select<string>({
    message: 'Agent roster size',
    options: depthOpts,
  })
  if (isCancelled(depthChoiceRaw)) cancel()
  const depthChoice = depthChoiceRaw as InitOptions['agentDepth']

  let selectedAgents: AgentProfile[]
  const allAgents = getAgentCatalog()
  const customAgents: AgentProfile[] = []

  if (depthChoice === 'complete') {
    selectedAgents = allAgents
  } else if (depthChoice === 'minimal') {
    selectedAgents = matchedAgents.length > 0 ? matchedAgents : getMinimalAgents()
  } else {
    const categories = getAgentCategories()
    const selectedCategoriesRaw = await p.multiselect<string>({
      message: 'Categories',
      options: categories.map((cat) => ({
        value: cat,
        label: cat,
        hint: `${categoryCounts[cat] || 0} agents`,
      })),
      required: true,
    })
    if (isCancelled(selectedCategoriesRaw)) cancel()
    selectedAgents = (selectedCategoriesRaw as string[]).flatMap((cat) => getAgentsByCategory(cat))

    const chosenIds = await p.multiselect<string>({
      message: 'Agents',
      options: selectedAgents.map((a) => ({ value: a.id, label: a.name, hint: a.description })),
      required: false,
    })
    if (isCancelled(chosenIds)) cancel()
    if (chosenIds && (chosenIds as string[]).length > 0) {
      selectedAgents = selectedAgents.filter((a) => (chosenIds as string[]).includes(a.id))
    }
  }

  // ── Matcher recommendation (no AI) ──
  if (!aiAnalysis && matchedAgents.length > 0 && depthChoice !== 'complete' && depthChoice !== 'minimal') {
    const useMatched = await p.confirm({
      message: `Use project-matched agents (${matchedAgents.length}) instead of your selection?`,
      initialValue: true,
    })
    if (isCancelled(useMatched)) cancel()
    if (useMatched) selectedAgents = matchedAgents
  }

  // ── AI recommendations override ──
  if (aiAnalysis?.recommendedAgentIds && aiAnalysis.recommendedAgentIds.length > 0 && depthChoice !== 'complete') {
    const recommended = allAgents.filter((a) => aiAnalysis!.recommendedAgentIds.includes(a.id))
    if (recommended.length > 0) {
      const useAiRec = await p.confirm({
        message: `Use AI recommendation (${recommended.length} agents) instead?`,
        initialValue: true,
      })
      if (isCancelled(useAiRec)) cancel()
      if (useAiRec) selectedAgents = recommended
    }
  }

  // ── Custom agents ──
  const addCustomAgents = await p.confirm({ message: 'Add a custom agent?', initialValue: false })
  if (isCancelled(addCustomAgents)) cancel()
  if (addCustomAgents) {
    let adding = true
    while (adding) {
      const caName = await p.text({ message: 'Agent name', placeholder: 'My Specialist', validate: (v) => { if (!v || v.trim().length === 0) return 'Required' } })
      if (isCancelled(caName)) cancel()
      const caId = (caName as string).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'custom-agent'
      const caDesc = await p.text({ message: 'What does it do?', placeholder: 'Handles specialized tasks', defaultValue: 'Custom agent' })
      if (isCancelled(caDesc)) cancel()
      const caCategory = await p.text({ message: 'Category', placeholder: 'custom', defaultValue: 'custom' })
      if (isCancelled(caCategory)) cancel()
      const caPerm = await p.select<string>({
        message: 'Permission level',
        options: [
          { value: 'read-only', label: 'Read Only' },
          { value: 'read-write', label: 'Read/Write' },
          { value: 'infrastructure', label: 'Infrastructure + Shell' },
        ],
      })
      if (isCancelled(caPerm)) cancel()
      customAgents.push({
        id: caId,
        name: (caName as string).trim(),
        description: (caDesc as string).trim(),
        category: (caCategory as string).trim(),
        file: `${caId}.md`,
        permissions: caPerm as any,
      })
      logSuccess(`Added ${(caName as string).trim()}`)
      const more = await p.confirm({ message: 'Add another?', initialValue: false })
      if (isCancelled(more)) cancel()
      adding = more === true
    }
  }

  const totalSelected = selectedAgents.length + customAgents.length
  logDetail(`${totalSelected} agent${totalSelected !== 1 ? 's' : ''} selected`)

  return {
    cwd,
    templatesDir,
    projectName: (projectName as string).trim() || 'my-project',
    platforms: selectedPlatforms as SupportedPlatform[],
    agents: [...selectedAgents, ...customAgents],
    includeAllAgents: depthChoice === 'complete',
    agentDepth: depthChoice,
    customProviders,
    customAgents,
    aiCredentials,
    aiAnalysis,
    online: useOnline === true,
  }
}
