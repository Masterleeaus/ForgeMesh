import { copyFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { ensureDir, pathExists } from '../utils/fs.js'
import type { InitOptions, PlatformInfo } from '../types.js'
import { getAgentCount, getCategoryCount, getCategoryAgentCounts } from '../generators/agents.js'
import { checkInternetConnectivity } from '../utils/network.js'
import { writeFile } from 'node:fs/promises'

const REPO_URL = 'https://github.com/CrimsonDevil333333/agents-profiles'
const RAW_URL = 'https://raw.githubusercontent.com/CrimsonDevil333333/agents-profiles/main'
const AGENT_COUNT = getAgentCount()
const CATEGORY_COUNT = getCategoryCount()

export interface AgentCopyResult {
  id: string
  src?: string
  content?: string
  dest: string
  copied: boolean
  fetched?: boolean
}

async function fetchRaw(url: string): Promise<string | null> {
  try {
    const res = await fetch(url)
    if (!res.ok) return null
    return await res.text()
  } catch {
    return null
  }
}

/**
 * Probe GitHub raw URLs to confirm real connectivity before attempting fetches.
 * Returns true only if we can actually reach the raw content host.
 */
export async function probeConnectivity(): Promise<boolean> {
  const { online } = await checkInternetConnectivity(3000, 'https://raw.githubusercontent.com')
  return online
}

export async function copyNativeAgents(
  options: InitOptions,
  platform: PlatformInfo,
  projectDir: string,
): Promise<AgentCopyResult[]> {
  const results: AgentCopyResult[] = []
  const targetDir = join(projectDir, platform.agentDir)
  await ensureDir(targetDir)

  // Probe once before the loop — skip all remote if offline
  let remoteReachable = false
  if (options.online) {
    remoteReachable = await probeConnectivity()
  }

  for (const agent of options.agents) {
    const agentFile = agent.file
    const nativeSrc = join(options.templatesDir, 'native-agents', platform.nativeAgentDir, agentFile)
    const profileSrc = join(options.templatesDir, 'profiles', agent.category, agentFile)

    // ── Built path with category subdirectory ──
    const destRel = join(platform.agentDir, agent.category, agentFile)
    const destAbs = join(targetDir, agent.category, agentFile)

    // 1. Try local native agent template
    const nativeExists = await pathExists(nativeSrc)
    if (nativeExists) {
      await ensureDir(dirname(destAbs))
      await copyFile(nativeSrc, destAbs)
      results.push({ id: agent.id, src: nativeSrc, dest: destRel, copied: true })
      continue
    }

    // 2. Try local profile template
    const profileExists = await pathExists(profileSrc)
    if (profileExists) {
      await ensureDir(dirname(destAbs))
      await copyFile(profileSrc, destAbs)
      results.push({ id: agent.id, src: profileSrc, dest: destRel, copied: true })
      continue
    }

    // 3. Remote fetch — only if connectivity was confirmed
    if (options.online && remoteReachable) {
      const nativeRemote = `${RAW_URL}/native-agents/${platform.nativeAgentDir}/${agentFile}`
      const profileRemote = `${RAW_URL}/${agent.category}/${agentFile}`

      let content = await fetchRaw(nativeRemote)
      if (!content) {
        content = await fetchRaw(profileRemote)
      }

      if (content) {
        await ensureDir(dirname(destAbs))
        await writeFile(destAbs, content, 'utf-8')
        results.push({ id: agent.id, content, dest: destRel, copied: true, fetched: true })
        continue
      }
    }

    results.push({ id: agent.id, src: '', dest: destRel, copied: false })
  }

  return results
}

export function buildAgentRosterTable(agents: InitOptions['agents']): string {
  return [
    '| Agent | Category | Purpose |',
    '|-------|----------|---------|',
    ...agents.map((a) => `| ${a.name} | ${a.category} | ${a.description} |`),
  ].join('\n')
}

export function buildFullTriageTable(): string {
  return [
    '| Task Domain | Route To |',
    '|-------------|----------|',
    '| arch/design/ADR | Architect, Cloud Architect |',
    '| frontend | Frontend Engineer |',
    '| backend API | Backend Engineer + Language Engineer |',
    '| language:* | Language Engineer (Node, Python, Rust, Go, Java, etc.) |',
    '| mobile | Mobile Engineer (iOS/Android) |',
    '| embedded | Embedded Engineer |',
    '| infra/k8s/terraform | DevOps, K8s, Terraform Engineer |',
    '| ci/cd/gitops | CI/CD Engineer, ArgoCD Engineer |',
    '| database/ha | DBRE Engineer, Database Admin |',
    '| security/threat | Security Engineer, AppSec Engineer |',
    '| soc/monitoring | SOC Analyst, Observability Engineer |',
    '| secrets/vault | Secrets & Vault Engineer |',
    '| pentest | Penetration Tester |',
    '| data pipeline | Data Engineer, Kafka Engineer |',
    '| ml/ai/llm | ML Engineer, AI Engineer, LLM Engineer |',
    '| bi/dashboard | BI Engineer |',
    '| testing/qa | QA Engineer, E2E Engineer |',
    '| performance | Performance Engineer |',
    '| review | Reviewer |',
    '| api design | API Engineer |',
    '| ops/incident | Operations, SRE |',
    '| chaos/resilience | Chaos Engineer |',
    '| edge/cdn | Edge/CDN Engineer |',
    '| docs | Technical Writer |',
    '| compliance | Compliance Officer, Privacy Engineer |',
    '| finops | FinOps Engineer |',
    '| planning | PM, Planner, Scrum Master |',
    '| product | Product Manager |',
    '| debugging | Support Engineer |',
    '| localization | Localization Engineer |',
  ].join('\n')
}

export function buildHandoffProtocol(): string {
  return [
    '| From Agent | To Agent | Artifact | Format |',
    '|------------|----------|----------|--------|',
    '| Specialist | Reviewer | Code/implementation | PR with description |',
    '| Specialist | QA Engineer | Feature with tests | Test suite + coverage |',
    '| Developer | Technical Writer | API changes | Updated docs + changelog |',
    '| Developer | DevOps | Dockerfile, CI config | Build + deploy manifests |',
    '| Any Agent | Orchestrator | Completed work | Summary + next steps |',
  ].join('\n')
}

function buildCatalogSummary(): string {
  const catCounts = getCategoryAgentCounts()
  return Object.entries(catCounts)
    .map(([cat, count]) => `${cat} (${count})`)
    .join(' · ')
}

export function buildCuratedConfig(
  opts: InitOptions,
  platformName: string,
  agentDir: string,
  extra?: string,
): string {
  return `# ${opts.projectName} — Multi-Agent Engineering System

> **Your AI is now the Orchestrator. Route tasks to specialist agents.**
> **${AGENT_COUNT} profiles at ${REPO_URL}**
> **${opts.agents.length} agents selected for this project**

---

## Role: Orchestrator — NOT the Doer

You coordinate. You do NOT do specialized work. Every specialized task is routed to a specialist agent.

---

## Quick Triage (task → agent)

Use this table to route user tasks to the right specialist agent:

${buildFullTriageTable()}

---

## Selected Agent Roster

| Agent | Category | Purpose |
|-------|----------|---------|
${opts.agents.map((a) => `| ${a.name} | ${a.category} | ${a.description} |`).join('\n')}

---

## Quality Gates

Every output MUST pass these gates before reaching the user:

1. **Reviewer gate** — audit output as the Reviewer agent
2. **Test gate** — bug fixes must include a regression test
3. **Anti-pattern check** — verify against agent's Anti-Patterns table
4. **Context gate** — drop previous agent's context before loading the next

**No gate can be skipped.**

---

## Instructions for the Orchestrator

1. **You are the Orchestrator** — route specialized work, do not do it yourself
2. **Load agents** from \`${agentDir}\` directory (or fetch from ${REPO_URL})
3. **Speak AS the agent** — adopt their tone, standards, and knowledge
4. **Drop context on handoff** — keep only the artifact when switching domains
5. **Use Handoff Protocol** — always use the agent's Handoff Protocol when switching

### Bug Fix Workflow
When addressing a bug, follow this sequence:
1. **Triage** (Support Engineer)
2. **Route** (Orchestrator)
3. **Fix + test** (Specialist)
4. **Review** (Reviewer)
5. **Verify** (QA/E2E Engineer)
6. **Prevent** (add anti-pattern if novel)

### Handoff Protocol

${buildHandoffProtocol()}

---

## Agent File Format

Every agent file follows this structure:

\`\`\`
# Agent Name — Subtitle

> Role blockquote

## 1. Identity & Persona
- Name, Codename, Core Mandate
- Personality Matrix (4 traits)

## 2-N. Domain-Specific Sections

## N. Anti-Patterns

## N+1. Handoff Protocol

## N+2. Closing Quote
\`\`\`

**All ${AGENT_COUNT} agents follow this exact format.**

---

## Workflow Patterns

### New Feature Development
\`\`\`
Planner → Architect → Developer → Reviewer → QA → DevOps
\`\`\`

### Incident Response
\`\`\`
Support → Operations → SRE → Developer/Observability
\`\`\`

### Security Review
\`\`\`
Security Engineer → Developer → AppSec → Compliance
\`\`\`

---

## Full Agent Catalog (${AGENT_COUNT} agents)

The complete roster covers ${CATEGORY_COUNT} categories:
${buildCatalogSummary()}

**Agent files: ${REPO_URL}**

${extra || ''}
---
*Setup by agents-profiles-cli*`
}
