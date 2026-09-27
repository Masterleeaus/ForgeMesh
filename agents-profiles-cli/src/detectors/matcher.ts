import type { DetectedProject, AgentProfile } from '../types.js'
import { getAgentCatalog } from '../generators/agents.js'

type AgentId = string

// ── Language → Agent mapping ──
const LANG_MAP: Record<string, AgentId[]> = {
  JavaScript: ['node-engineer'],
  TypeScript: ['typescript-engineer', 'node-engineer'],
  Python: ['python-engineer'],
  Rust: ['rust-engineer'],
  Go: ['go-engineer'],
  Java: ['java-engineer'],
  Ruby: ['ruby-engineer'],
  PHP: ['php-engineer'],
  'C#': ['dotnet-engineer'],
  'C++': ['cpp-engineer'],
  C: ['cpp-engineer'],
  Swift: ['swift-engineer'],
  Kotlin: ['kotlin-engineer'],
  Zig: ['zig-engineer'],
  Scala: ['scala-engineer'],
  R: ['r-engineer'],
  Elixir: ['elixir-engineer'],
  Haskell: ['haskell-engineer'],
  Dart: ['flutter-engineer'],
}

// ── Framework → Agent mapping ──
const FRAMEWORK_MAP: Record<string, AgentId[]> = {
  // JS/TS frontend
  'Next.js': ['react-engineer'],
  'React': ['react-engineer', 'frontend-engineer'],
  'Vue.js': ['vue-engineer', 'frontend-engineer'],
  'Nuxt.js': ['vue-engineer'],
  'Angular': ['frontend-engineer'],
  'Svelte': ['frontend-engineer'],
  'Solid.js': ['frontend-engineer'],
  'Preact': ['frontend-engineer'],
  'Gatsby': ['react-engineer'],
  'Remix': ['react-engineer'],
  'Astro': ['frontend-engineer'],

  // JS/TS backend
  'Express.js': ['backend-engineer'],
  'NestJS': ['backend-engineer'],
  'Fastify': ['backend-engineer'],
  'Hono': ['backend-engineer'],
  'Elysia': ['backend-engineer'],
  'Koa': ['backend-engineer'],
  'Hapi.js': ['backend-engineer'],
  'Feathers.js': ['backend-engineer'],
  'AdonisJS': ['backend-engineer'],
  'LoopBack': ['backend-engineer'],
  'Sails.js': ['backend-engineer'],
  'Meteor': ['backend-engineer'],

  // Full-stack JS
  'Blitz.js': ['backend-engineer', 'react-engineer'],
  'RedwoodJS': ['backend-engineer', 'react-engineer'],

  // Mobile
  'React Native': ['mobile-engineer', 'react-engineer'],
  'Ionic': ['mobile-engineer'],
  'Cordova': ['mobile-engineer'],

  // Desktop
  'Electron': ['frontend-engineer'],
  'Tauri': ['rust-engineer', 'frontend-engineer'],

  // Python
  'Django': ['python-engineer', 'backend-engineer'],
  'FastAPI': ['python-engineer', 'backend-engineer'],
  'Flask': ['python-engineer', 'backend-engineer'],
  'Starlette': ['python-engineer', 'backend-engineer'],
  'aiohttp': ['python-engineer', 'backend-engineer'],
  'Tornado': ['python-engineer', 'backend-engineer'],

  // Ruby
  'Ruby on Rails': ['ruby-engineer', 'backend-engineer'],
  'Sinatra': ['ruby-engineer', 'backend-engineer'],

  // Rust
  'Axum': ['rust-engineer', 'backend-engineer'],
  'Actix Web': ['rust-engineer', 'backend-engineer'],
  'Rocket': ['rust-engineer', 'backend-engineer'],
  'Tokio': ['rust-engineer'],
  'Serde': ['rust-engineer'],

  // Data / state
  'Prisma': ['database-administrator'],
  'TypeORM': ['database-administrator'],
  'Sequelize': ['database-administrator'],
  'Drizzle ORM': ['database-administrator'],
  'Mongoose': ['database-administrator'],

  // API
  'tRPC': ['backend-engineer'],
  'GraphQL': ['backend-engineer'],
  'Apollo': ['backend-engineer'],
  'Relay': ['frontend-engineer'],

  // Auth
  'NextAuth.js': ['backend-engineer', 'security-specialist'],

  // UI
  'Tailwind CSS': ['frontend-engineer'],
  'Material UI': ['frontend-engineer'],
  'Ant Design': ['frontend-engineer'],
  'Chakra UI': ['frontend-engineer'],
  'shadcn/ui': ['frontend-engineer'],
}

// ── Test framework → Agent mapping ──
const TEST_MAP: Record<string, AgentId[]> = {
  'Playwright': ['e2e-automation-engineer', 'qa-engineer'],
  'Cypress': ['e2e-automation-engineer', 'qa-engineer'],
  'WebdriverIO': ['e2e-automation-engineer', 'qa-engineer'],
  'Puppeteer': ['e2e-automation-engineer', 'qa-engineer'],
  'Selenium': ['e2e-automation-engineer', 'qa-engineer'],
  'Detox': ['e2e-automation-engineer', 'qa-engineer'],
  'Vitest': ['qa-engineer'],
  'Jest': ['qa-engineer'],
  'Mocha': ['qa-engineer'],
  'AVA': ['qa-engineer'],
  'Tape': ['qa-engineer'],
  'Jasmine': ['qa-engineer'],
  'Karma': ['qa-engineer'],
  'Chai': ['qa-engineer'],
  'Sinon': ['qa-engineer'],
  'Supertest': ['qa-engineer'],
  'Testing Library': ['qa-engineer'],
  'Storybook': ['qa-engineer'],
  'Chromatic': ['qa-engineer'],
  'pytest': ['qa-engineer'],
  'unittest': ['qa-engineer'],
  'Nose': ['qa-engineer'],
  'tox': ['qa-engineer'],
  'RSpec': ['qa-engineer'],
  'Minitest': ['qa-engineer'],
}

// ── Database → Agent mapping ──
const DATABASE_MAP: Record<string, AgentId[]> = {
  'PostgreSQL': ['database-administrator', 'backend-engineer'],
  'MongoDB': ['database-administrator', 'backend-engineer'],
  'Redis': ['redis-infra', 'database-administrator'],
  'Elasticsearch': ['database-administrator', 'data-analyst'],
  'Cassandra': ['database-administrator'],
  'Neo4j': ['database-administrator'],
  'InfluxDB': ['database-administrator'],
  'MySQL': ['database-administrator', 'backend-engineer'],
  'MariaDB': ['database-administrator', 'backend-engineer'],
  'SQLite': ['database-administrator', 'backend-engineer'],
  'Firebase': ['backend-engineer'],
  'Supabase': ['backend-engineer'],
  'PlanetScale': ['database-administrator'],
  'SQLx': ['rust-engineer', 'database-administrator'],
  'Diesel': ['rust-engineer', 'database-administrator'],
  'SQLAlchemy': ['python-engineer', 'database-administrator'],
}

// ── Infrastructure flags → Agent mapping ──
const HAS_DOCKER: AgentId[] = ['devops']
const HAS_DOCKER_COMPOSE: AgentId[] = ['devops']
const HAS_K8S: AgentId[] = ['devops', 'cloud-engineer']
const HAS_TERRAFORM: AgentId[] = ['devops', 'cloud-engineer']
const HAS_CICD: AgentId[] = ['cicd-engineer', 'devops']
const HAS_MOBILE: AgentId[] = ['mobile-engineer']
const HAS_EMBEDDED: AgentId[] = ['embedded-engineer']
const HAS_GAME: AgentId[] = ['game-engineer']
const HAS_AI_ML: AgentId[] = ['data-scientist', 'python-engineer']
const HAS_MONITORING: AgentId[] = ['devops', 'data-analyst']

// ── Message queue → Agent mapping ──
const MQ_MAP: Record<string, AgentId[]> = {
  'Kafka': ['data-engineer', 'devops'],
  'RabbitMQ': ['backend-engineer', 'devops'],
  'MQTT': ['embedded-engineer'],
  'NATS': ['devops'],
  'Bull (Redis Queue)': ['redis-infra', 'backend-engineer'],
  'BullMQ': ['redis-infra', 'backend-engineer'],
  'Bee-Queue': ['backend-engineer'],
}

// ── Cloud → Agent mapping ──
const CLOUD_MAP: Record<string, AgentId[]> = {
  'AWS': ['cloud-engineer', 'devops'],
  'Azure': ['cloud-engineer', 'devops'],
  'GCP': ['cloud-engineer', 'devops'],
  'GitHub API': ['devops'],
  'OpenAI': ['data-scientist', 'ai-engineer'],
}

// ── Always-included agents ──
const ORCHESTRATION: AgentId[] = [
  'assistant', 'planner', 'product-manager', 'project-manager',
  'program-manager', 'scrum-master', 'engineering-manager', 'agile-coach',
]
const ALWAYS_INCLUDE: AgentId[] = ['reviewer', 'backend-engineer']

export function matchAgents(project: DetectedProject): AgentProfile[] {
  const matchedIds = new Set<AgentId>(['assistant'])
  const catalog = getAgentCatalog()
  const byId = new Map(catalog.map((a) => [a.id, a]))

  // Always include orchestration + reviewer + backend
  for (const id of [...ORCHESTRATION, ...ALWAYS_INCLUDE]) {
    matchedIds.add(id)
  }

  // Languages
  for (const lang of project.languages) {
    const agents = LANG_MAP[lang]
    if (agents) for (const id of agents) matchedIds.add(id)
  }

  // Frameworks
  for (const fw of project.frameworks) {
    const agents = FRAMEWORK_MAP[fw]
    if (agents) for (const id of agents) matchedIds.add(id)
  }

  // Databases
  for (const db of project.databases) {
    const agents = DATABASE_MAP[db]
    if (agents) for (const id of agents) matchedIds.add(id)
  }

  // Message queues
  for (const mq of project.messageQueues) {
    const agents = MQ_MAP[mq]
    if (agents) for (const id of agents) matchedIds.add(id)
  }

  // Cloud providers
  for (const cloud of project.cloudProviders) {
    const agents = CLOUD_MAP[cloud]
    if (agents) for (const id of agents) matchedIds.add(id)
  }

  // Test frameworks
  for (const tf of project.testFrameworks) {
    const agents = TEST_MAP[tf]
    if (agents) for (const id of agents) matchedIds.add(id)
  }

  // Infrastructure flags
  if (project.hasDocker) for (const id of HAS_DOCKER) matchedIds.add(id)
  if (project.hasDockerCompose) for (const id of HAS_DOCKER_COMPOSE) matchedIds.add(id)
  if (project.hasKubernetes) for (const id of HAS_K8S) matchedIds.add(id)
  if (project.hasTerraform) for (const id of HAS_TERRAFORM) matchedIds.add(id)
  if (project.hasCiCd) for (const id of HAS_CICD) matchedIds.add(id)
  if (project.hasMobile) for (const id of HAS_MOBILE) matchedIds.add(id)
  if (project.hasEmbedded) for (const id of HAS_EMBEDDED) matchedIds.add(id)
  if (project.hasGame) for (const id of HAS_GAME) matchedIds.add(id)
  if (project.aiMl) for (const id of HAS_AI_ML) matchedIds.add(id)
  if (project.monitoring) for (const id of HAS_MONITORING) matchedIds.add(id)

  // Package manager hints (fallback for languages that weren't detected by config files)
  if (project.packageManager === 'cargo') matchedIds.add('rust-engineer')
  if (project.packageManager === 'go') matchedIds.add('go-engineer')
  if (project.packageManager === 'mix') matchedIds.add('elixir-engineer')
  if (project.packageManager === 'pub') matchedIds.add('flutter-engineer')

  // Resolve IDs to profiles, preserve catalog order
  const seen = new Set<AgentId>()
  const result: AgentProfile[] = []
  for (const agent of catalog) {
    if (matchedIds.has(agent.id) && !seen.has(agent.id)) {
      seen.add(agent.id)
      result.push(agent)
    }
  }

  return result
}
