# agents-profiles-cli

**Multi-Agent System Setup Wizard** — Interactive CLI that configures AI coding assistants with **144 specialist agent profiles** across **22 categories**. Turns any AI into an **Orchestrator** that routes tasks to domain experts.

```sh
npx agents-profiles-cli init
```

## Features

- **144 pre-built specialists** — frontend, backend, DevOps, security, data, mobile, embedded, game dev, blockchain, cloud, content creation, scientific computing, and more
- **8 platforms + custom** — OpenCode, Claude Code, GitHub Copilot, Cursor, Windsurf, Aider, Continue.dev, Generic, and any custom AI tool
- **Project-aware agent matching** — detects your stack (languages, frameworks, databases, CI/CD, cloud, test frameworks, message queues, AI/ML, monitoring, Docker, K8s, Terraform, mobile, embedded, game) and auto-selects the right agents — no API key required
- **Internet connectivity check** — probes reachability before attempting to fetch profiles; skips silently when offline
- **Category-organized profiles** — fetched agent `.md` files land in `{agentDir}/{category}/{agent}.md` for clean navigation
- **Non-interactive mode** (`--yes`) — headless setup for CI/CD pipelines
- **Offline mode** (`--offline`) — generate configs without network (AI fetches profiles at runtime via URL in config)
- **AI-powered analysis** — optionally provide an API key and let AI recommend the right agents for your specific project
- **Custom agents & providers** — extend with your own specialist profiles and AI tools
- **Rollback on failure** — partial writes are cleaned up automatically if generation fails
- **Atomic writes** — files are written to temp paths then renamed, preventing corruption

## Prerequisites

- **Node.js 18+** and npm
- One of the supported AI coding assistants:
  - [OpenCode](https://opencode.ai)
  - [Claude Code](https://docs.anthropic.com/en/docs/claude-code)
  - [GitHub Copilot](https://github.com/features/copilot)
  - [Cursor](https://cursor.com)
  - [Windsurf](https://codeium.com/windsurf)
  - [Aider](https://aider.chat)
  - [Continue.dev](https://continue.dev)
- (Optional) OpenAI-compatible API key for AI-powered agent recommendations

## Installation

```sh
# Global install (recommended)
npm install -g agents-profiles-cli

# Run directly without installing
npx agents-profiles-cli init
```

## Usage

```sh
# Interactive setup wizard
agents-profiles-cli init

# Setup in a specific directory
agents-profiles-cli init ./my-project

# Non-interactive mode (minimal defaults, auto-detects project)
agents-profiles-cli init --yes

# Non-interactive + offline (no GitHub fetch)
agents-profiles-cli init --yes --offline

# List supported platforms
agents-profiles-cli list

# Detect project info
agents-profiles-cli detect

# Detect a specific project
agents-profiles-cli detect ./other-project
```

### Commands

| Command | Description |
|---------|-------------|
| `init [dir]` | Interactive setup wizard |
| `init [dir] --yes` | Non-interactive mode with minimal defaults |
| `init [dir] --yes --offline` | Non-interactive, skip fetching profiles |
| `list` / `ls` | List supported AI platforms |
| `detect [dir]` | Show detected project info |
| `--help` | Show full help |
| `--version` | Show version |

## How It Works

```
agents-profiles-cli init
  │
  ├── 0. Check internet connectivity (probes raw.githubusercontent.com)
  │       → shows ✓ (XXms) or ✗ — skips fetch question when offline
  │
  ├── 1. Detect your project
  │       → languages, frameworks, databases, CI/CD, Docker, K8s,
  │         Terraform, mobile, embedded, game, test frameworks,
  │         message queues, cloud providers, AI/ML, monitoring
  │       → Matches agents to your stack (no API key needed)
  │
  ├── 2. (Optional) AI analysis — provide API key + model
  │       → AI reads your project files
  │       → Recommends the best agents from the 144 profiles
  │
  ├── 3. Pick online mode
  │       → Online: agent .md files downloaded from GitHub into
  │         {agentDir}/{category}/{agent.md} during setup
  │       → Offline: your AI fetches profiles at runtime
  │         via URL embedded in the config
  │
  ├── 4. Pick AI platforms (OpenCode, Claude, Copilot, Cursor, etc.)
  │       → Or define custom providers
  │
  ├── 5. Select agents
  │       → Minimal: project-matched agents (auto-detected)
  │       → Standard: hand-pick categories and agents
  │       → Complete: all 144 agents
  │       → Or accept AI recommendations
  │       → Add custom agents
  │
  ├── 6. Generate config files
  │       → AGENTS.md / CLAUDE.md / .cursorrules / etc.
  │       → Downloads agent profiles into category subdirectories
  │         e.g., .opencode/agents/backend-dev/backend-engineer.md
  │
  └── 7. Open your AI assistant — it's now the Orchestrator
```

### Project Detection

The tool scans your project directory for config files and dependencies:

| Signal | Detects |
|--------|---------|
| **Languages** | TypeScript, JavaScript, Python, Rust, Go, Java, Kotlin, Ruby, PHP, C#, C++, C, Swift, Zig, Scala, R, Elixir, Haskell, Dart |
| **Frameworks** | Next.js, React, Vue.js, Angular, Svelte, Express, NestJS, Fastify, Django, FastAPI, Flask, Ruby on Rails, Axum, Actix, and 40+ more |
| **Databases** | PostgreSQL, MongoDB, Redis, MySQL, MariaDB, SQLite, Elasticsearch, Cassandra, Neo4j, InfluxDB, Firebase, Supabase, PlanetScale |
| **Message Queues** | Kafka, RabbitMQ, MQTT, NATS, BullMQ |
| **Cloud Providers** | AWS, Azure, GCP |
| **Test Frameworks** | Vitest, Jest, Playwright, Cypress, pytest, RSpec, and 20+ more |
| **Infrastructure** | Docker, Docker Compose, Kubernetes (kustomize/helm), Terraform |
| **CI/CD** | GitHub Actions, GitLab CI, Jenkins, CircleCI, Drone, Bitbucket Pipelines, Azure Pipelines |
| **Platform** | Mobile (iOS/Android/Flutter), Embedded (PlatformIO), Game (Unity/Godot) |
| **Other** | AI/ML (OpenAI, LangChain, TensorFlow, PyTorch), Monitoring (Prometheus, Grafana, Sentry, DataDog) |

## Agent Matching

By default (`minimal` mode and `--yes` mode), the tool selects agents that match your detected project. The matching system automatically includes:

- **8 orchestration agents** — assistant, planner, product-manager, project-manager, program-manager, scrum-master, engineering-manager, agile-coach
- **2 always-included** — reviewer, backend-engineer
- **Language-specific engineers** — e.g., TypeScript → `typescript-engineer` + `node-engineer`, Python → `python-engineer`
- **Framework specialists** — e.g., React → `react-engineer` + `frontend-engineer`
- **Infrastructure agents** — Docker → `devops`, CI/CD → `cicd-engineer`, K8s → `cloud-engineer`
- **Database agents** — PostgreSQL → `database-administrator`, Redis → `redis-infra`
- **Domain specialists** — mobile, embedded, game, AI/ML, monitoring, security, data

## Agent Catalog

All **144 agents** across **22 categories**:

| Category | Agents | Specialties |
|----------|--------|-------------|
| **orchestration** | 8 | assistant, planner, product-manager, project-manager, program-manager, scrum-master, engineering-manager, agile-coach |
| **engineering-dev** | 18 | typescript-engineer, node-engineer, python-engineer, rust-engineer, go-engineer, java-engineer, kotlin-engineer, scala-engineer, ruby-engineer, php-engineer, dotnet-engineer, cpp-engineer, swift-engineer, zig-engineer, elixir-engineer, haskell-engineer, r-engineer, flutter-engineer |
| **backend-dev** | 1 | backend-engineer |
| **frontend-dev** | 4 | frontend-engineer, react-engineer, vue-engineer, ui-engineer |
| **mobile-dev** | 2 | mobile-engineer, flutter-engineer |
| **database** | 12 | database-administrator, redis-infra, database-migration-engineer, postgresql-engineer, mongodb-engineer, redis-engineer, elasticsearch-engineer, cassandra-engineer, neo4j-engineer, influxdb-engineer, mysql-engineer, sqlite-engineer |
| **data-intelligence** | 9 | data-scientist, data-engineer, data-analyst, data-architect, ml-engineer, ai-engineer, llm-engineer, bi-engineer, kafka-engineer |
| **devops** | 11 | devops, cloud-engineer, cicd-engineer, k8s-engineer, terraform-engineer, sre, chaos-engineer, edge-engineer, argocd-engineer, secrets-engineer, finops-engineer |
| **qa-testing** | 5 | qa-engineer, e2e-automation-engineer, performance-engineer, security-test-engineer, accessibility-engineer |
| **security** | 7 | security-specialist, appsec-engineer, penetration-tester, soc-analyst, compliance-officer, privacy-engineer, vault-engineer |
| **cloud** | 5 | cloud-architect, multicloud-engineer, serverless-engineer, cloud-cost-engineer, cloud-migration-engineer |
| **blockchain** | 5 | blockchain-engineer, smart-contract-engineer, web3-engineer, defi-engineer, nft-engineer |
| **game-dev** | 3 | game-engineer, game-design-engineer, game-devops-engineer |
| **embedded-dev** | 2 | embedded-engineer, iot-engineer |
| **content-creation** | 4 | technical-writer, visual-creator, video-producer, documentation-engineer |
| **scientific-computing** | 5 | scientific-computing-engineer, hpc-engineer, bioinformatics-engineer, quantum-engineer, computational-engineer |
| **temporal** | 2 | temporal-engineer, temporal-workflow-engineer |
| **design** | 4 | ux-designer, ui-designer, design-system-engineer, prototyping-engineer |
| **arch-dev** | 5 | architect, domain-architect, solution-architect, enterprise-architect, cloud-architect |
| **api-dev** | 3 | api-engineer, api-design-engineer, api-security-engineer |
| **support** | 3 | support-engineer, oncall-engineer, escalation-engineer |
| **reviewer** | 1 | reviewer |
| **localization** | 2 | localization-engineer, i18n-engineer |

## Supported Platforms

| Platform | Config File | Agent Directory |
|----------|-------------|-----------------|
| OpenCode | `AGENTS.md` | `.opencode/agents/` |
| Claude Code | `CLAUDE.md` | `.claude/agents/` |
| GitHub Copilot | `.github/copilot-instructions.md` | `.github/agents/` |
| Cursor | `.cursorrules` | `.cursor/rules/` |
| Windsurf | `.windsurfrules` | `.windsurf/rules/` |
| Aider | `.aider-rules.md` | `.aider/` |
| Continue.dev | `.continuerc.json` | `.continue/agents/` |
| Generic | `AI_AGENTS.md` | `.agents/profiles/` |
| Custom | User-defined | User-defined |

## Custom Providers

Beyond the built-in platforms, you can define **custom AI providers** during `init`:
- Give it a name, description, and config file path
- Choose output format (markdown, JSON, YAML, TOML, text)
- Perfect for proprietary AI tools, internal agents, or experimental platforms

## Custom Agents

You can also add **custom agent profiles** to any setup:
- Define name, description, category, and permission level
- Custom agents appear in all generated configs alongside built-in profiles
- Permission levels: `read-only`, `read-write`, `infrastructure` (full shell access)

## Internet Connectivity

The tool automatically probes internet connectivity before deciding to fetch profile files:

- **Probe URLs**: `raw.githubusercontent.com`, `github.com`, `google.com` (fallback chain)
- **Timeout**: 3 seconds per probe
- **Display**: Shows `internet ✓ (XXms)` or `internet ✗` in the setup flow
- **Auto-skip**: When offline, the "Fetch profiles?" question is skipped entirely
- **Non-interactive**: Auto-detects and sets `online: false` when unreachable
- **Double-check**: `copyNativeAgents()` probes `raw.githubusercontent.com` again before the fetch loop, so a dropped connection mid-session won't cause silent failures

## After Setup

Once the wizard finishes, open your AI coding assistant and give it this command:

> "Fetch and read the config file I just created, then initialize the multi-agent system for my project."

Your AI will become the **Orchestrator** — routing every task to the right specialist agent.

The generated config includes:
- Full triage table (task → agent routing)
- Handoff protocol between agents
- Quality gates (reviewer, test, anti-pattern, context)
- Workflow patterns (feature dev, incident response, security review)
- Complete agent roster with descriptions
- URL to fetch all 144 agent profiles at runtime

## Project

Part of the [agents-profiles](https://github.com/CrimsonDevil333333/agents-profiles) ecosystem.

All 144 agent profile `.md` files are hosted at:
- **Repo**: https://github.com/CrimsonDevil333333/agents-profiles
- **Raw**: https://raw.githubusercontent.com/CrimsonDevil333333/agents-profiles/main
