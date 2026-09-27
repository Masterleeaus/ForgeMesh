import { readFile, readdir } from 'node:fs/promises'
import { join } from 'node:path'
import type { DetectedProject } from '../types.js'
import { pathExists } from '../utils/fs.js'

export async function detectProject(cwd: string): Promise<DetectedProject> {
  const result: DetectedProject = {
    languages: [],
    frameworks: [],
    packageManager: null,
    hasDocker: false,
    hasDockerCompose: false,
    hasKubernetes: false,
    hasTerraform: false,
    hasCiCd: false,
    hasMobile: false,
    hasEmbedded: false,
    hasGame: false,
    testFrameworks: [],
    databases: [],
    messageQueues: [],
    cloudProviders: [],
    aiMl: false,
    monitoring: false,
  }

  await Promise.all([
    detectLanguages(cwd, result),
    detectPackageManager(cwd, result),
    detectDocker(cwd, result),
    detectKubernetes(cwd, result),
    detectTerraform(cwd, result),
    detectCiCd(cwd, result),
    detectMobile(cwd, result),
    detectEmbedded(cwd, result),
    detectGame(cwd, result),
  ])

  const pkg = await tryReadPackageJson(cwd)
  if (pkg) {
    await Promise.all([
      detectFrameworksFromPkg(pkg, result),
      detectDatabasesFromPkg(pkg, result),
      detectMessageQueuesFromPkg(pkg, result),
      detectCloudFromPkg(pkg, result),
      detectTestFrameworksFromPkg(pkg, result),
      detectAiMlFromPkg(pkg, result),
      detectMonitoringFromPkg(pkg, result),
    ])
  }

  const pyproject = await tryReadFile(cwd, 'pyproject.toml')
  if (pyproject) {
    detectFrameworksFromPyproject(pyproject, result)
    detectTestFromPyproject(pyproject, result)
    detectDatabasesFromPyproject(pyproject, result)
  }

  const cargo = await tryReadFile(cwd, 'Cargo.toml')
  if (cargo) {
    detectFrameworksFromCargo(cargo, result)
  }

  const gemfile = await tryReadFile(cwd, 'Gemfile')
  if (gemfile) {
    detectFrameworksFromGemfile(gemfile, result)
  }

  if (result.languages.length === 0) {
    result.languages.push('Unknown')
  }

  return result
}

// ── File helpers ──

async function tryReadFile(dir: string, file: string): Promise<string | null> {
  const fp = join(dir, file)
  try {
    if (await pathExists(fp)) return await readFile(fp, 'utf-8')
  } catch { }
  return null
}

async function tryReadPackageJson(dir: string): Promise<Record<string, string> | null> {
  const content = await tryReadFile(dir, 'package.json')
  if (!content) return null
  try {
    const json = JSON.parse(content)
    return { ...json.dependencies, ...json.devDependencies } as Record<string, string>
  } catch {
    return null
  }
}

// ── Language detection ──

async function detectLanguages(cwd: string, r: DetectedProject): Promise<void> {
  const checks: Array<[string, string]> = [
    ['package.json', 'JavaScript'],
    ['tsconfig.json', 'TypeScript'],
    ['pyproject.toml', 'Python'],
    ['requirements.txt', 'Python'],
    ['setup.py', 'Python'],
    ['Pipfile', 'Python'],
    ['Cargo.toml', 'Rust'],
    ['go.mod', 'Go'],
    ['pom.xml', 'Java'],
    ['build.gradle', 'Java'],
    ['build.gradle.kts', 'Kotlin'],
    ['Gemfile', 'Ruby'],
    ['composer.json', 'PHP'],
    ['*.csproj', 'C#'],
    ['CMakeLists.txt', 'C++'],
    ['Makefile', 'C'],
    ['Package.swift', 'Swift'],
    ['build.zig', 'Zig'],
    ['mix.exs', 'Elixir'],
    ['stack.yaml', 'Haskell'],
    ['*.cabal', 'Haskell'],
    ['pubspec.yaml', 'Dart'],
    ['Cargo.lock', 'Rust'],
    ['yarn.lock', 'JavaScript'],
    ['pnpm-lock.yaml', 'JavaScript'],
    ['bun.lockb', 'JavaScript'],
    ['gradlew', 'Kotlin'],
    ['*.kt', 'Kotlin'],
    ['*.scala', 'Scala'],
    ['*.R', 'R'],
  ]

  for (const [file, lang] of checks) {
    if (file.startsWith('*.')) {
      const ext = file.slice(1)
      try {
        const dir = await readdir(cwd)
        if (dir.some((f) => f.endsWith(ext))) addUnique(r.languages, lang)
      } catch { }
    } else if (await pathExists(join(cwd, file))) {
      addUnique(r.languages, lang)
    }
  }
}

// ── Package manager ──

async function detectPackageManager(cwd: string, r: DetectedProject): Promise<void> {
  const checks: Array<[string, string]> = [
    ['pnpm-lock.yaml', 'pnpm'],
    ['yarn.lock', 'yarn'],
    ['package-lock.json', 'npm'],
    ['bun.lockb', 'bun'],
    ['Cargo.toml', 'cargo'],
    ['go.mod', 'go'],
    ['Gemfile', 'bundler'],
    ['pyproject.toml', 'pip'],
    ['requirements.txt', 'pip'],
    ['Pipfile', 'pipenv'],
    ['composer.json', 'composer'],
    ['pubspec.yaml', 'pub'],
    ['mix.exs', 'mix'],
  ]
  for (const [file, pm] of checks) {
    if (await pathExists(join(cwd, file))) {
      r.packageManager = pm
      return
    }
  }
}

// ── Infra detection ──

async function detectDocker(cwd: string, r: DetectedProject): Promise<void> {
  r.hasDocker = await pathExists(join(cwd, 'Dockerfile'))
  r.hasDockerCompose = await pathExists(join(cwd, 'docker-compose.yml'))
    || await pathExists(join(cwd, 'docker-compose.yaml'))
}

async function detectKubernetes(cwd: string, r: DetectedProject): Promise<void> {
  r.hasKubernetes = await pathExists(join(cwd, 'kubernetes'))
    || await pathExists(join(cwd, 'k8s'))
    || await pathExists(join(cwd, 'kustomization.yaml'))
    || await pathExists(join(cwd, 'kustomization.yml'))
    || await pathExists(join(cwd, 'helmfile.yaml'))
    || await pathExists(join(cwd, 'Chart.yaml'))
}

async function detectTerraform(cwd: string, r: DetectedProject): Promise<void> {
  r.hasTerraform = await pathExists(join(cwd, 'terraform'))
    || await pathExists(join(cwd, 'provider.tf'))
    || await pathExists(join(cwd, 'main.tf'))
}

async function detectCiCd(cwd: string, r: DetectedProject): Promise<void> {
  r.hasCiCd = await pathExists(join(cwd, '.github', 'workflows'))
    || await pathExists(join(cwd, '.gitlab-ci.yml'))
    || await pathExists(join(cwd, 'Jenkinsfile'))
    || await pathExists(join(cwd, '.circleci', 'config.yml'))
    || await pathExists(join(cwd, '.drone.yml'))
    || await pathExists(join(cwd, 'bitbucket-pipelines.yml'))
    || await pathExists(join(cwd, 'azure-pipelines.yml'))
    || await pathExists(join(cwd, '.woodpecker.yml'))
}

// ── Platform detection ──

async function detectMobile(cwd: string, r: DetectedProject): Promise<void> {
  r.hasMobile = await pathExists(join(cwd, 'ios'))
    || await pathExists(join(cwd, 'android'))
    || await pathExists(join(cwd, 'flutter'))
    || await pathExists(join(cwd, 'Podfile'))
    || await pathExists(join(cwd, 'fastlane'))
}

async function detectEmbedded(cwd: string, r: DetectedProject): Promise<void> {
  r.hasEmbedded = await pathExists(join(cwd, 'platformio.ini'))
    || await pathExists(join(cwd, '.platformio'))
    || (await pathExists(join(cwd, 'Makefile')) && await pathExists(join(cwd, 'src', 'main.c')))
}

async function detectGame(cwd: string, r: DetectedProject): Promise<void> {
  r.hasGame = await pathExists(join(cwd, 'Assets'))
    || await pathExists(join(cwd, 'ProjectSettings'))
    || await pathExists(join(cwd, 'godot.project'))
    || await pathExists(join(cwd, 'project.godot'))
}

// ── Framework detection from package.json ──

function detectFrameworksFromPkg(deps: Record<string, string>, r: DetectedProject): void {
  const map: Record<string, string> = {
    next: 'Next.js',
    'nuxt': 'Nuxt.js',
    react: 'React',
    vue: 'Vue.js',
    angular: 'Angular',
    svelte: 'Svelte',
    'solid-js': 'Solid.js',
    preact: 'Preact',
    'gatsby': 'Gatsby',
    remix: 'Remix',
    astro: 'Astro',
    express: 'Express.js',
    nest: 'NestJS',
    fastify: 'Fastify',
    hono: 'Hono',
    elysia: 'Elysia',
    'koa': 'Koa',
    'hapi': 'Hapi.js',
    'feathers': 'Feathers.js',
    'adonisjs': 'AdonisJS',
    'loopback': 'LoopBack',
    'sails': 'Sails.js',
    meteor: 'Meteor',
    'blitzjs': 'Blitz.js',
    'redwoodjs': 'RedwoodJS',
    'react-native': 'React Native',
    'expo': 'React Native',
    'ionic': 'Ionic',
    'cordova': 'Cordova',
    'electron': 'Electron',
    'tauri': 'Tauri',
    'prisma': 'Prisma',
    'typeorm': 'TypeORM',
    'sequelize': 'Sequelize',
    'drizzle-orm': 'Drizzle ORM',
    'mongoose': 'Mongoose',
    'next-auth': 'NextAuth.js',
    'trpc': 'tRPC',
    'graphql': 'GraphQL',
    'apollo': 'Apollo',
    'relay': 'Relay',
    'tailwindcss': 'Tailwind CSS',
    'material-ui': 'Material UI',
    'antd': 'Ant Design',
    'chakra': 'Chakra UI',
    'shadcn': 'shadcn/ui',
  }
  for (const [key, name] of Object.entries(map)) {
    if (deps[key]) addUnique(r.frameworks, name)
  }
}

// ── Database detection from package.json ──

function detectDatabasesFromPkg(deps: Record<string, string>, r: DetectedProject): void {
  const map: Record<string, string> = {
    pg: 'PostgreSQL',
    'postgres': 'PostgreSQL',
    'postgresql': 'PostgreSQL',
    'pg-promise': 'PostgreSQL',
    'slonik': 'PostgreSQL',
    mongoose: 'MongoDB',
    mongodb: 'MongoDB',
    mongojs: 'MongoDB',
    mongoclient: 'MongoDB',
    redis: 'Redis',
    'ioredis': 'Redis',
    'node-redis': 'Redis',
    elasticsearch: 'Elasticsearch',
    '@elastic/elasticsearch': 'Elasticsearch',
    cassandra: 'Cassandra',
    'cassandra-driver': 'Cassandra',
    neo4j: 'Neo4j',
    'neo4j-driver': 'Neo4j',
    influx: 'InfluxDB',
    '@influxdata/influxdb-client': 'InfluxDB',
    mysql: 'MySQL',
    'mysql2': 'MySQL',
    mariadb: 'MariaDB',
    sqlite3: 'SQLite',
    'better-sqlite3': 'SQLite',
    'sql.js': 'SQLite',
    'firebase': 'Firebase',
    'firebase-admin': 'Firebase',
    'supabase': 'Supabase',
    '@supabase/supabase-js': 'Supabase',
    'planetscale': 'PlanetScale',
    '@planetscale/database': 'PlanetScale',
    prisma: 'Prisma',
    'drizzle-orm': 'Drizzle',
    'typeorm': 'TypeORM',
  }
  for (const [key, db] of Object.entries(map)) {
    if (deps[key]) addUnique(r.databases, db)
  }
}

// ── Message queue detection ──

function detectMessageQueuesFromPkg(deps: Record<string, string>, r: DetectedProject): void {
  const map: Record<string, string> = {
    kafka: 'Kafka',
    'kafkajs': 'Kafka',
    'kafka-node': 'Kafka',
    'amqplib': 'RabbitMQ',
    'amqp': 'RabbitMQ',
    'rabbitmq': 'RabbitMQ',
    'mqtt': 'MQTT',
    'mqttjs': 'MQTT',
    'nats': 'NATS',
    'bull': 'Bull (Redis Queue)',
    'bullmq': 'BullMQ',
    'bee-queue': 'Bee-Queue',
  }
  for (const [key, mq] of Object.entries(map)) {
    if (deps[key]) addUnique(r.messageQueues, mq)
  }
}

// ── Cloud detection ──

function detectCloudFromPkg(deps: Record<string, string>, r: DetectedProject): void {
  const map: Record<string, string> = {
    '@aws-sdk': 'AWS',
    'aws-sdk': 'AWS',
    '@azure': 'Azure',
    'azure': 'Azure',
    '@google-cloud': 'GCP',
    'google-cloud': 'GCP',
    '@googlemaps': 'GCP',
    '@octokit': 'GitHub API',
    'openai': 'OpenAI',
  }
  for (const [key, cloud] of Object.entries(map)) {
    if (deps[key]) addUnique(r.cloudProviders, cloud)
  }
}

// ── AI/ML detection ──

function detectAiMlFromPkg(deps: Record<string, string>, r: DetectedProject): void {
  const keywords = ['openai', 'langchain', 'anthropic', 'cohere', 'huggingface', 'transformers',
    'tensorflow', 'torch', 'onnx', 'scikit-learn', 'xai', 'groq', 'mistral', 'ai', 'llm']
  for (const key of keywords) {
    if (deps[key]) { r.aiMl = true; return }
  }
}

// ── Monitoring detection ──

function detectMonitoringFromPkg(deps: Record<string, string>, r: DetectedProject): void {
  const keywords = ['prometheus', 'grafana', 'datadog', 'newrelic', 'sentry', 'opentelemetry',
    '@sentry', 'pino', 'winston', 'log4js', 'morgan', 'otel', 'open-telemetry']
  for (const key of keywords) {
    if (deps[key]) { r.monitoring = true; return }
  }
}

// ── Test detection from package.json ──

function detectTestFrameworksFromPkg(deps: Record<string, string>, r: DetectedProject): void {
  const map: Record<string, string> = {
    vitest: 'Vitest',
    jest: 'Jest',
    mocha: 'Mocha',
    ava: 'AVA',
    tape: 'Tape',
    'playwright': 'Playwright',
    'cypress': 'Cypress',
    'webdriverio': 'WebdriverIO',
    'puppeteer': 'Puppeteer',
    'selenium-webdriver': 'Selenium',
    'karma': 'Karma',
    'jasmine': 'Jasmine',
    'chai': 'Chai',
    'sinon': 'Sinon',
    'supertest': 'Supertest',
    'testing-library': 'Testing Library',
    '@testing-library/react': 'Testing Library',
    'storybook': 'Storybook',
    'chromatic': 'Chromatic',
    'detox': 'Detox',
  }
  for (const [key, name] of Object.entries(map)) {
    if (deps[key]) addUnique(r.testFrameworks, name)
  }
}

// ── Python detection ──

function detectFrameworksFromPyproject(content: string, r: DetectedProject): void {
  if (content.includes('django')) addUnique(r.frameworks, 'Django')
  if (content.includes('fastapi')) addUnique(r.frameworks, 'FastAPI')
  if (content.includes('flask')) addUnique(r.frameworks, 'Flask')
  if (content.includes('starlette')) addUnique(r.frameworks, 'Starlette')
  if (content.includes('aiohttp')) addUnique(r.frameworks, 'aiohttp')
  if (content.includes('tornado')) addUnique(r.frameworks, 'Tornado')
  if (content.includes('sqlalchemy')) addUnique(r.databases, 'SQLAlchemy')
  if (content.includes('asyncpg') || content.includes('psycopg')) addUnique(r.databases, 'PostgreSQL')
  if (content.includes('motor') || content.includes('pymongo')) addUnique(r.databases, 'MongoDB')
  if (content.includes('redis')) addUnique(r.databases, 'Redis')
  if (content.includes('tensorflow') || content.includes('pytorch') || content.includes('transformers')) { r.aiMl = true }
  if (content.includes('prometheus') || content.includes('sentry')) { r.monitoring = true }
}

function detectTestFromPyproject(content: string, r: DetectedProject): void {
  if (content.includes('pytest')) addUnique(r.testFrameworks, 'pytest')
  if (content.includes('unittest')) addUnique(r.testFrameworks, 'unittest')
  if (content.includes('nose')) addUnique(r.testFrameworks, 'Nose')
  if (content.includes('tox')) addUnique(r.testFrameworks, 'tox')
}

function detectDatabasesFromPyproject(content: string, r: DetectedProject): void {
  if (content.includes('kafka') || content.includes('confluent')) addUnique(r.messageQueues, 'Kafka')
}

// ── Rust detection ──

function detectFrameworksFromCargo(content: string, r: DetectedProject): void {
  if (content.includes('axum')) addUnique(r.frameworks, 'Axum')
  if (content.includes('actix')) addUnique(r.frameworks, 'Actix Web')
  if (content.includes('rocket')) addUnique(r.frameworks, 'Rocket')
  if (content.includes('tokio')) addUnique(r.frameworks, 'Tokio')
  if (content.includes('sqlx')) addUnique(r.databases, 'SQLx')
  if (content.includes('diesel')) addUnique(r.databases, 'Diesel')
  if (content.includes('serde')) addUnique(r.frameworks, 'Serde')
}

// ── Ruby detection ──

function detectFrameworksFromGemfile(content: string, r: DetectedProject): void {
  if (content.includes('rails')) addUnique(r.frameworks, 'Ruby on Rails')
  if (content.includes('sinatra')) addUnique(r.frameworks, 'Sinatra')
  if (content.includes('rspec')) addUnique(r.testFrameworks, 'RSpec')
  if (content.includes('minitest')) addUnique(r.testFrameworks, 'Minitest')
  if (content.includes('pg')) addUnique(r.databases, 'PostgreSQL')
  if (content.includes('mysql2')) addUnique(r.databases, 'MySQL')
  if (content.includes('mongoid')) addUnique(r.databases, 'MongoDB')
  if (content.includes('redis')) addUnique(r.databases, 'Redis')
}

function addUnique(arr: string[], item: string): void {
  if (!arr.includes(item)) arr.push(item)
}
