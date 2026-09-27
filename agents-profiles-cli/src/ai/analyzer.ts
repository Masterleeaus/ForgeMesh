import { readFile, readdir } from 'node:fs/promises'
import { join } from 'node:path'
import type { AIConfig } from './client.js'
import { chatCompletion } from './client.js'
import { pathExists } from '../utils/fs.js'
import { getAgentCount, getCategoryCount, getCategoryAgentCounts } from '../generators/agents.js'

export interface AnalysisResult {
  projectSummary: string
  recommendedAgentIds: string[]
  reasoning: string
}

function buildCategoryPrompt(): string {
  const catCounts = getCategoryAgentCounts()
  const lines: string[] = []
  for (const [cat, count] of Object.entries(catCounts)) {
    lines.push(`- ${cat} (${count})`)
  }
  return lines.join('\n')
}

const AGENT_COUNT = getAgentCount()
const CATEGORY_COUNT = getCategoryCount()

export async function analyzeProject(cwd: string, aiConfig: AIConfig): Promise<AnalysisResult> {
  const projectContext = await gatherProjectContext(cwd)

  const categoryDetails = buildCategoryPrompt()

  const systemPrompt = `You are a project analysis AI. Your job is to analyze a software project and recommend the best AI specialist agents for it.

We have ${AGENT_COUNT} pre-built agent profiles across ${CATEGORY_COUNT} categories. Based on the project's languages, frameworks, infrastructure, and domain, recommend ALL agents that would be useful — there is NO limit. Include core engineers, tech stack matches, quality gap fillers, and suggest future growth agents.

Available categories and their agents:
${categoryDetails}

Respond in this exact JSON format (no markdown, no code fences):
{
  "projectSummary": "2-3 sentence summary of what this project does",
  "recommendedAgentIds": ["agent-id-1", "agent-id-2", ...],
  "reasoning": "Brief explanation of why these agents were selected"
}

Agent IDs use kebab-case matching the file names: e.g., "frontend-engineer", "python-engineer", "devops", "cloud-architect", etc.`

  const userPrompt = `Analyze this project and recommend AI agents:

Project files detected:
${projectContext}

Return ONLY valid JSON matching the specified format.`

  const response = await chatCompletion(aiConfig, [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt },
  ])

  return parseAnalysis(response)
}

function parseAnalysis(raw: string): AnalysisResult {
  const cleaned = raw
    .replace(/```(?:json)?\s*/gi, '')
    .replace(/\s*```/g, '')
    .trim()

  try {
    const parsed = JSON.parse(cleaned) as AnalysisResult
    return {
      projectSummary: parsed.projectSummary || '',
      recommendedAgentIds: Array.isArray(parsed.recommendedAgentIds) ? parsed.recommendedAgentIds : [],
      reasoning: parsed.reasoning || '',
    }
  } catch {
    return {
      projectSummary: 'Could not parse AI analysis. Using default agent selection.',
      recommendedAgentIds: [],
      reasoning: 'AI response was not valid JSON. Falling back to defaults.',
    }
  }
}

async function gatherProjectContext(cwd: string): Promise<string> {
  const parts: string[] = []

  const configFiles = [
    'package.json', 'tsconfig.json', 'pyproject.toml', 'Cargo.toml',
    'go.mod', 'pom.xml', 'build.gradle', 'Gemfile', 'composer.json',
    'Dockerfile', 'docker-compose.yml', 'Makefile', 'CMakeLists.txt',
  ]

  for (const file of configFiles) {
    const fp = join(cwd, file)
    if (await pathExists(fp)) {
      try {
        const content = await readFile(fp, 'utf-8')
        const truncated = content.length > 2000 ? content.slice(0, 2000) + '\n... [truncated]' : content
        parts.push(`=== ${file} ===\n${truncated}`)
      } catch { }
    }
  }

  const readmePath = join(cwd, 'README.md')
  if (await pathExists(readmePath)) {
    try {
      const content = await readFile(readmePath, 'utf-8')
      const truncated = content.length > 3000 ? content.slice(0, 3000) + '\n... [truncated]' : content
      parts.push(`=== README.md ===\n${truncated}`)
    } catch { }
  }

  const srcDir = join(cwd, 'src')
  if (await pathExists(srcDir)) {
    try {
      const files = await readdir(srcDir, { recursive: true })
      const extensions = new Set<string>()
      for (const f of files.slice(0, 500)) {
        const ext = f.split('.').pop()
        if (ext && ext.length < 10) extensions.add(ext)
      }
      if (extensions.size > 0) {
        parts.push(`Source file extensions: ${[...extensions].sort().join(', ')}`)
      }
    } catch { }
  }

  return parts.join('\n\n') || 'No project files detected. Unknown project type.'
}
