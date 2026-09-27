# Agent Engineering System — Developer Guide

> **📦 Repo: [`github.com/CrimsonDevil333333/agents-profiles`](https://github.com/CrimsonDevil333333/agents-profiles)**

> **For anyone who needs to understand, maintain, or extend this multi-agent system.**

## What This Repo Is

A collection of **340 structured role description files** (`.md`), each defining a specialized engineering agent. Together they form a complete multi-agent engineering organization covering every domain of modern software development.

## Directory Layout

```
/
├── AGENT.md              ← This file — how to work with & extend the system
├── README.md             ← Self-setup, roster, handoffs, workflows, tips
├── INIT.md               ← Session init protocol (legacy, standalone)
├── skill.md              ← Auto-configure skill (project analysis + setup)
├── SETUP.md              ← Platform-by-platform install guides
├── AGENT_GENERATOR.md    ← Deprecated — redirects to INIT.md + skill.md
├── native-agents/
│   ├── generate.py       ← Script to regenerate all native agent files
│   ├── opencode/         ← Native agent files for OpenCode
│   ├── claude/           ← Native agent files for Claude Code
│   └── copilot/          ← Native agent files for GitHub Copilot
├── <category>/
│   ├── <agent>.md        ← Individual agent definitions
│   └── ...
└── ...
```

**22 category directories**, each holding related agent files:

| Directory | Agents | Focus |
|-----------|--------|-------|
| `orchestration/` | 10 | Assistant, Planner, PM, Prog Mgr, Scrum Master, EM, Agile Coach, TPM, Incident Cmdr |
| `executive/` | 3 | CEO, CTO, VP Engineering |
| `business-analysis/` | 2 | Business Analyst, Data Analyst |
| `people-culture/` | 3 | HR, Recruiter, Training Specialist |
| `business-revenue/` | 5 | Sales, Dev Advocate, CS, TAM, Marketing |
| `design-architecture/` | 12 | Architect, Sol Arch, Designer, UX, Researcher, Workflow, Enterprise, Domain, Security, Mobile, Event-Driven, Info |
| `system-extensibility/` | 6 | Agent Builder, Skill Creator, MCP, Prompt, Knowledge, Evaluator |
| `language-specific/` | 35 | Node, Python, Rust, Go, Java, PHP, Ruby, .NET, C/C++, Zig, Swift, Scala, Kotlin, TS, R, Elixir, Haskell, Dart, Lua, Erlang, Julia, Clojure, OCaml/F#, Mainframe, Perl, Nim, Crystal, Mojo, D, Ada/SPARK, Scheme/Racket, Prolog, Fortran, V, Odin |
| `engineering-dev/` | 46 | Frontend, Mobile, iOS, Android, Embedded, Backend, Dev, Reviewer, Automation, Flutter, CSS/DS, Desktop, RN, WebGL/3D, BFF, IoT, MERN, MEAN, JAMstack, LAMP, ELK, Full-Stack, TALL, Serverless Stack, Express, FastAPI, Django, Spring Boot, NestJS, Rails, Laravel, Next.js, Nuxt, Actix/Axum, Echo/Fiber, Microservices, CQRS/ES, Caching, Message Queue, WebSocket/RT, Streaming Pipeline, Edge Compute, Dependency Manager, Commit Message Generator, Pre-commit Auditor, Code Style Enforcer |
| `testing-quality/` | 9 | Tester, QA, E2E, Performance, Pen Tester, Visual, API, Mobile, Security Testing |
| `cloud-infra-architecture/` | 9 | Cloud Arch, AWS, Azure, GCP, Terraform, Pulumi, Serverless, Cloud Migration, HashiCorp |
| `infrastructure-ops/` | 20 | DevOps, SRE, Platform, Network, Chaos, K8s, ArgoCD, Helm, Service Mesh, DBRE, CI/CD, Edge, Ops, Ansible, Docker, GitOps, Nix, Virtualization, WASM, Redis |
| `data-intelligence/` | 34 | Data Eng, Arch, Analytics, Sci, AI, LLM, ML, DL, MLOps, DQ, DBA, Kafka, BI, Scientific, DuckDB, ClickHouse, Snowflake, BigQuery, Redshift, Databricks, Supabase, Gov, Feature Store, NLP, CV, RAG, Orchestration, Platform, Product, Bioinformatics, Data Lake, ETL/ELT, Real-Time Analytics, Feature Flag |
| `specialized-engineering/` | 53 | API, Integration, Migration, Security, DevSecOps, IAM, Incident Response, Data Protection, Observability, Release, AppSec, SOC, Secrets, Blockchain, Temporal, Cloud Sec, K8s Sec, Supply Chain, Threat Model, Zero Trust, SIEM, Forensics, Red Team, GraphQL, gRPC, Real-Time, AI Safety, Quantum, AR/VR, Robotics, Firebase, Vercel/Edge, Stripe/Payments, Auth, Algolia/Search, Observability Platform, GPU/CUDA, FPGA, RISC-V, WebGPU, RTOS/FW, Reverse Eng, Crypto, E-commerce, FinTech, HealthTech, Game Server, Geospatial, Payment Integration, LLMOps, LegalTech, EdTech, AdTech |
| `compliance-legal-finance/` | 16 | Compliance, Legal, Accessibility, FinOps, Privacy, SOC2, HIPAA, PCI, GDPR, FedRAMP, Audit, ISO27001, Data Breach, Vendor Risk, AI Gov, Records Mgmt |
| `content-communication/` | 10 | Tech Writer, Content Strategist, Translator, Proposal, Localization, Support, Visual Creator, Video Producer, Documentation Updater, Changelog Manager |
| `it-support/` | 1 | IT Support |
| `planning-oversight/` | 13 | Cost Estimator, Risk, Change, Vendor, Tech Debt, Lean, VSM, OKR Coach, Product Ops, DR, Capacity Planner, Implementation Plan Generator, Progress Tracker |
| `game-development/` | 1 | Game Engineer |
| `frontend-frameworks/` | 5 | React, Vue, Angular, Svelte, SolidJS |
| `database-specialists/` | 16 | PostgreSQL, MongoDB, Redis DB, Elasticsearch, Cassandra, Pinecone, Qdrant, Neo4j, InfluxDB, MySQL, SQLite, CockroachDB, DynamoDB, Firestore, Milvus, Couchbase |
| `cloud-providers/` | 2 | Oracle Cloud, Cloudflare |

## Agent File Format

Every `.md` agent file follows this exact structure:

```
# Agent Name — Subtitle

> Role blockquote with titles, archetype, tone

---

## 1. Identity & Persona
- Name, Codename, Core Mandate
- Personality Matrix (4 traits with Expression & Threshold columns)

## 2-N. Domain-Specific Sections
Varies by agent type:
- Language engineers: Code Standards, Performance Patterns, Security Checklist
- Cloud engineers: Service catalog, architecture patterns, cost optimization
- Testing agents: Test design, tools, CI integration
- Tables, code blocks, templates, checklists

## N. Anti-Patterns
- Table with Pattern | Why | Action

## N+1. Handoff Protocol       ← REQUIRED in every agent
- Table with To Agent | Artifact | Format
- Defines who this agent hands off to and what they pass

## N+2. Closing Quote
- Role philosophy quote
- Attribution line
```

### Required Elements

Every agent file **must** have:

1. **Personality Matrix** — 4 traits with Expression and Threshold columns
2. **Anti-Patterns table** — at least 4 rows with Pattern, Why, Action
3. **Handoff Protocol table** — at least 3 rows with To Agent, Artifact, Format
4. **Closing quote** — a memorable role philosophy

## How to Add a New Agent

### Step 1: Identify the Category

Does your new agent fit into an existing category, or does it need a new one?

**Existing categories** cover these domains:
- Orchestration/leadership, executive, business, people, revenue
- Design, architecture, system extensibility
- Language-specific engineering (17 languages)
- Frontend, mobile, backend, embedded, automation
- Testing, QA, performance, security testing
- Cloud architecture (AWS, Azure, GCP, Terraform)
- DevOps, SRE, platform, network, chaos, K8s
- Data engineering, data science, ML, AI, LLM, MLOps
- Specialized engineering (API, security, IAM, observability, etc.)
- Compliance, legal, accessibility, FinOps
- Content, writing, localization, support
- IT support, planning, risk, vendor management

**Recently added categories:**
- Game development (game-development/)
- Frontend frameworks (frontend-frameworks/)
- Database specialists (database-specialists/)
- Cloud providers (cloud-providers/)

**Still not yet covered:**
- Quantum computing, mainframe
- Bioinformatics
- Specific methodologies (value stream mapping, TOC)

### Step 2: Create the File

Place it in the correct category directory:

```
data-intelligence/your-new-agent.md
```

Use exactly the same format as existing agents. Copy an existing file from the same category as a template and replace the content.

### Step 3: Add to README

Open `README.md` and add a row to the appropriate roster table under **Section 5. Complete Agent Roster**.

The table format is:

```markdown
| [Agent Name](category/agent-file.md) | The Codename | Brief purpose description |
```

Make sure the link path includes the category directory (e.g., `data-intelligence/agent-file.md`).

### Step 4: Add to AGENT.md

Update the category table in this file (`AGENT.md`) with the correct agent count and focus description if needed.

### Step 5: Regenerate Native Agent Files

Add the new agent's name to the `CLASSIFICATION` dict in `native-agents/generate.py` with the correct permission tier, then regenerate:

```bash
python3 native-agents/generate.py
```

This creates native agent definitions for all 3 platforms (OpenCode, Claude Code, Copilot).

### Step 6: Verification Checklist

Run these checks after adding:

```bash
# 1. Count matches: agent files vs README links
echo "Agent files: $(find . -name '*.md' ! -path './README.md' | wc -l)"
echo "README links: $(grep -oP '\([^()]+\.md\)' README.md | sed 's/[()]//g' | sort -u | wc -l)"

# 2. No broken links
grep -oP '\([^()]+\.md\)' README.md | sed 's/[()]//g' | sort -u | while read f; do
  [ ! -f "$f" ] && echo "BROKEN: $f"
done

# 3. All agents have Handoff Protocol
find . -name '*.md' ! -path './README.md' -exec grep -L 'Handoff Protocol' {} \;

# 4. No .md files at root (except README.md, AGENT.md, INIT.md, skill.md, SETUP.md, AGENT_GENERATOR.md)
ls *.md

# 5. Native agent count matches
echo "OpenCode: $(ls native-agents/opencode/*.md 2>/dev/null | wc -l)"
echo "Claude: $(ls native-agents/claude/*.md 2>/dev/null | wc -l)"
echo "Copilot: $(ls native-agents/copilot/*.agent.md 2>/dev/null | wc -l)"
```

## How to Modify an Existing Agent

1. Read the current file
2. Make changes following the same format and style
3. If you change the agent's handoff targets, update the Handoff Protocol table
4. If you change the agent's purpose/codename, update the README roster entry
5. If you rename or move the file, update all links in README.md

## Working with the README

The README is the master index. It must always reflect the actual state of the repo:

- **Agent roster tables** (Section 5) — every agent file must appear in exactly one table
- **Cross-references** — agents can be mentioned in multiple sections (workflows, tips, architecture review) — these are optional
- **Links must include the category prefix** — e.g., `data-intelligence/agent-file.md`, never just `agent-file.md`
- **No duplicate agents** — each agent appears once in the roster (the duplicate `network-engineer` in Specialized Engineering was removed during reorganization)

## Best Practices

- **One agent per file** — each file defines exactly one role
- **Consistent format** — every file follows the same section numbering, table styles, and closing structure
- **Handoff Protocol is mandatory** — without it, agents are isolated and the system doesn't work
- **Personality Matrix should be distinct** — avoid reusing the same 4 traits across agents
- **Anti-Patterns should be domain-specific** — not generic "don't do bad things"
- **Keep closing quotes memorable** — they're the agent's philosophy in one sentence
- **When creating language-specific engineers**, include code examples with imports, real patterns, and a security checklist
- **When creating cloud engineers**, include a service catalog table with cost considerations

## Quick Reference

```bash
# Total agent count
find . -name '*.md' ! -path './README.md' | wc -l

# Find an agent by name
find . -name '*keyword*' -type f

# Check which files lack Handoff Protocol
find . -name '*.md' ! -path './README.md' -exec grep -L 'Handoff Protocol' {} \;

# Verify all README links resolve
cd /path/to/repo && grep -oP '\([^()]+\.md\)' README.md | sed 's/[()]//g' | sort -u | while read f; do [ ! -f "$f" ] && echo "MISSING: $f"; done
```

---

*"This system is designed to grow. Adding a new agent doesn't change the architecture — it fills a gap. The format is the contract. Follow it."*
