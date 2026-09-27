import type { AgentProfile } from '../types.js'

const catalog: AgentProfile[] = [
  // ── orchestration (8) ──
  { id: 'assistant', name: 'Assistant', category: 'orchestration', description: 'Primary user interface, agent orchestration, quality control', file: 'assistant.md', permissions: 'read-only' },
  { id: 'planner', name: 'Planner', category: 'orchestration', description: 'Goal decomposition, research, dependency mapping, task roadmaps', file: 'planner.md', permissions: 'read-only' },
  { id: 'product-manager', name: 'Product Manager', category: 'orchestration', description: 'Strategy, requirements, prioritization, stakeholder communication', file: 'product-manager.md', permissions: 'read-only' },
  { id: 'project-manager', name: 'Project Manager', category: 'orchestration', description: 'Project planning, execution, budget tracking, vendor management', file: 'project-manager.md', permissions: 'read-only' },
  { id: 'program-manager', name: 'Program Manager', category: 'orchestration', description: 'Cross-team programs, dependency tracking, risk, stakeholder comms', file: 'program-manager.md', permissions: 'read-only' },
  { id: 'scrum-master', name: 'Scrum Master', category: 'orchestration', description: 'Agile process facilitation, impediment removal, retrospectives', file: 'scrum-master.md', permissions: 'read-only' },
  { id: 'engineering-manager', name: 'Engineering Manager', category: 'orchestration', description: 'People management, career growth, team delivery, 1:1 coaching', file: 'engineering-manager.md', permissions: 'read-only' },
  { id: 'agile-coach', name: 'Agile Coach', category: 'orchestration', description: 'Agile transformation, organizational coaching, maturity improvement', file: 'agile-coach.md', permissions: 'read-only' },

  // ── executive (3) ──
  { id: 'ceo', name: 'CEO', category: 'executive', description: 'Company vision, strategy, culture, stakeholder management', file: 'ceo.md', permissions: 'read-only' },
  { id: 'cto', name: 'CTO', category: 'executive', description: 'Technology strategy, architecture vision, innovation, R&D investment', file: 'cto.md', permissions: 'read-only' },
  { id: 'vp-engineering', name: 'VP Engineering', category: 'executive', description: 'Engineering org building, delivery management, team health', file: 'vp-engineering.md', permissions: 'read-only' },

  // ── business-analysis (2) ──
  { id: 'business-analyst', name: 'Business Analyst', category: 'business-analysis', description: 'Requirements analysis, process modeling, stakeholder communication', file: 'business-analyst.md', permissions: 'read-only' },
  { id: 'data-analyst', name: 'Data Analyst', category: 'business-analysis', description: 'Data analysis, visualization, reporting, business insights', file: 'data-analyst.md', permissions: 'read-only' },

  // ── people-culture (3) ──
  { id: 'hr-manager', name: 'HR Manager', category: 'people-culture', description: 'Recruiting, performance management, culture, career development', file: 'hr-manager.md', permissions: 'read-only' },
  { id: 'technical-recruiter', name: 'Technical Recruiter', category: 'people-culture', description: 'Technical sourcing, screening, interview coordination, offer management', file: 'technical-recruiter.md', permissions: 'read-only' },
  { id: 'training-specialist', name: 'Training Specialist', category: 'people-culture', description: 'Learning programs, curriculum design, workshops, skill development', file: 'training-specialist.md', permissions: 'read-only' },

  // ── business-revenue (5) ──
  { id: 'sales-engineer', name: 'Sales Engineer', category: 'business-revenue', description: 'Technical sales, demos, PoCs, customer qualification', file: 'sales-engineer.md', permissions: 'read-only' },
  { id: 'developer-advocate', name: 'Developer Advocate', category: 'business-revenue', description: 'Community engagement, developer feedback, open source advocacy', file: 'developer-advocate.md', permissions: 'read-only' },
  { id: 'customer-success', name: 'Customer Success', category: 'business-revenue', description: 'Customer adoption, retention, health monitoring, expansion', file: 'customer-success.md', permissions: 'read-only' },
  { id: 'technical-account-manager', name: 'Technical Account Manager', category: 'business-revenue', description: 'Enterprise technical guidance, proactive support, escalation management', file: 'technical-account-manager.md', permissions: 'read-only' },
  { id: 'marketing-engineer', name: 'Marketing Engineer', category: 'business-revenue', description: 'Technical content, developer relations, community, product launches', file: 'marketing-engineer.md', permissions: 'read-only' },

  // ── design-architecture (6) ──
  { id: 'architect', name: 'Architect', category: 'design-architecture', description: 'System design, ADRs, technology selection, quality attributes', file: 'architect.md', permissions: 'read-only' },
  { id: 'solutions-architect', name: 'Solutions Architect', category: 'design-architecture', description: 'Customer-facing solution design, technical pre-sales, proposal support', file: 'solutions-architect.md', permissions: 'read-only' },
  { id: 'designer', name: 'Designer', category: 'design-architecture', description: 'UI/UX design, design systems, prototyping, accessibility', file: 'designer.md', permissions: 'read-only' },
  { id: 'usability-engineer', name: 'Usability Engineer', category: 'design-architecture', description: 'User research, usability testing, heuristic evaluation, accessibility audit', file: 'usability-engineer.md', permissions: 'read-only' },
  { id: 'researcher', name: 'Researcher', category: 'design-architecture', description: 'Systematic investigation, literature review, evidence-backed insights', file: 'researcher.md', permissions: 'read-only' },
  { id: 'workflow-designer', name: 'Workflow Designer', category: 'design-architecture', description: 'Multi-agent workflow orchestration, error handling, state management', file: 'workflow-designer.md', permissions: 'read-only' },

  // ── system-extensibility (6) ──
  { id: 'agent-builder', name: 'Agent Builder', category: 'system-extensibility', description: 'Agent creation, configuration, persona design, permission modeling', file: 'agent-builder.md', permissions: 'read-only' },
  { id: 'skill-creator', name: 'Skill Creator', category: 'system-extensibility', description: 'Reusable skill development, parameterization, packaging, composition', file: 'skill-creator.md', permissions: 'read-only' },
  { id: 'mcp-server-developer', name: 'MCP Server Developer', category: 'system-extensibility', description: 'MCP server development, tool design, protocol compliance, security', file: 'mcp-server-developer.md', permissions: 'read-write' },
  { id: 'prompt-engineer', name: 'Prompt Engineer', category: 'system-extensibility', description: 'Prompt design, optimization, testing, guardrail implementation', file: 'prompt-engineer.md', permissions: 'read-only' },
  { id: 'knowledge-curator', name: 'Knowledge Curator', category: 'system-extensibility', description: 'Knowledge base management, memory, freshness, retrieval optimization', file: 'knowledge-curator.md', permissions: 'read-only' },
  { id: 'agent-evaluator', name: 'Agent Evaluator', category: 'system-extensibility', description: 'Agent testing, benchmark design, quality metrics, regression detection', file: 'agent-evaluator.md', permissions: 'read-only' },

  // ── language-specific (17) ──
  { id: 'node-engineer', name: 'Node.js Engineer', category: 'language-specific', description: 'TypeScript, JavaScript, Node.js, Deno, Bun — full-stack JS/TS', file: 'node-engineer.md', permissions: 'read-write', tools: ['typescript', 'javascript', 'node'] },
  { id: 'python-engineer', name: 'Python Engineer', category: 'language-specific', description: 'Python — web (FastAPI, Django), data, scripting, automation', file: 'python-engineer.md', permissions: 'read-write', tools: ['python'] },
  { id: 'rust-engineer', name: 'Rust Engineer', category: 'language-specific', description: 'Rust — systems, performance-critical, safety, WASM', file: 'rust-engineer.md', permissions: 'read-write', tools: ['rust'] },
  { id: 'go-engineer', name: 'Go Engineer', category: 'language-specific', description: 'Go — cloud services, microservices, CLI, networking', file: 'go-engineer.md', permissions: 'read-write', tools: ['go'] },
  { id: 'java-engineer', name: 'Java Engineer', category: 'language-specific', description: 'Java, JVM — enterprise, Spring, Android, large-scale systems', file: 'java-engineer.md', permissions: 'read-write', tools: ['java'] },
  { id: 'php-engineer', name: 'PHP Engineer', category: 'language-specific', description: 'PHP — Laravel, Symfony, WordPress, web applications', file: 'php-engineer.md', permissions: 'read-write', tools: ['php'] },
  { id: 'ruby-engineer', name: 'Ruby Engineer', category: 'language-specific', description: 'Ruby, Rails — web applications, scripting, prototyping', file: 'ruby-engineer.md', permissions: 'read-write', tools: ['ruby'] },
  { id: 'dotnet-engineer', name: '.NET Engineer', category: 'language-specific', description: 'C#, .NET — enterprise, cloud, desktop, gaming (Unity)', file: 'dotnet-engineer.md', permissions: 'read-write', tools: ['csharp'] },
  { id: 'cpp-engineer', name: 'C/C++ Engineer', category: 'language-specific', description: 'C, C++ — embedded, systems, game engines, high-performance', file: 'cpp-engineer.md', permissions: 'read-write', tools: ['cpp'] },
  { id: 'zig-engineer', name: 'Zig Engineer', category: 'language-specific', description: 'Zig — systems, C interop, embedded, performance-critical', file: 'zig-engineer.md', permissions: 'read-write', tools: ['zig'] },
  { id: 'swift-engineer', name: 'Swift Engineer', category: 'language-specific', description: 'Swift — iOS, macOS, watchOS, visionOS, server (Vapor)', file: 'swift-engineer.md', permissions: 'read-write', tools: ['swift'] },
  { id: 'scala-engineer', name: 'Scala Engineer', category: 'language-specific', description: 'Scala — JVM, functional/OOP, Akka, ZIO, Cats Effect, Play, Spark', file: 'scala-engineer.md', permissions: 'read-write', tools: ['scala'] },
  { id: 'kotlin-engineer', name: 'Kotlin Engineer', category: 'language-specific', description: 'Kotlin — JVM, Android, Ktor, Spring Boot, coroutines, multiplatform', file: 'kotlin-engineer.md', permissions: 'read-write', tools: ['kotlin'] },
  { id: 'typescript-engineer', name: 'TypeScript Engineer', category: 'language-specific', description: 'TypeScript — type-safe JS, full-stack, Next.js, tRPC, strict mode', file: 'typescript-engineer.md', permissions: 'read-write', tools: ['typescript'] },
  { id: 'r-engineer', name: 'R Engineer', category: 'language-specific', description: 'R — statistics, data analysis, tidyverse, ggplot2, Shiny, Quarto', file: 'r-engineer.md', permissions: 'read-write', tools: ['r'] },
  { id: 'elixir-engineer', name: 'Elixir Engineer', category: 'language-specific', description: 'Elixir — BEAM/OTP, Phoenix, LiveView, fault-tolerant, real-time', file: 'elixir-engineer.md', permissions: 'read-write', tools: ['elixir'] },
  { id: 'haskell-engineer', name: 'Haskell Engineer', category: 'language-specific', description: 'Haskell — pure functional, GHC, Servant, type-driven, lazy evaluation', file: 'haskell-engineer.md', permissions: 'read-write', tools: ['haskell'] },

  // ── engineering-dev (10) ──
  { id: 'frontend-engineer', name: 'Frontend Engineer', category: 'engineering-dev', description: 'Web UI, browser APIs, CSS architecture, bundler config', file: 'frontend-engineer.md', permissions: 'read-write', tools: ['react', 'vue', 'css', 'typescript'] },
  { id: 'mobile-engineer', name: 'Mobile Engineer', category: 'engineering-dev', description: 'iOS, Android, Flutter, React Native, mobile CI/CD', file: 'mobile-engineer.md', permissions: 'read-write' },
  { id: 'ios-engineer', name: 'iOS Engineer', category: 'engineering-dev', description: 'Native iOS/macOS, SwiftUI, UIKit, App Store deployment', file: 'ios-engineer.md', permissions: 'read-write', tools: ['swift'] },
  { id: 'android-engineer', name: 'Android Engineer', category: 'engineering-dev', description: 'Native Android, Kotlin, Jetpack Compose, Play Store', file: 'android-engineer.md', permissions: 'read-write', tools: ['kotlin'] },
  { id: 'embedded-engineer', name: 'Embedded Engineer', category: 'engineering-dev', description: 'Firmware, RTOS, microcontrollers, IoT, resource-constrained systems', file: 'embedded-engineer.md', permissions: 'read-write', tools: ['cpp', 'c'] },
  { id: 'backend-engineer', name: 'Backend Engineer', category: 'engineering-dev', description: 'Server-side APIs, business logic, data access, performance', file: 'backend-engineer.md', permissions: 'read-write' },
  { id: 'developer', name: 'Developer', category: 'engineering-dev', description: 'Code generation, implementation, testing, quality', file: 'developer.md', permissions: 'read-write' },
  { id: 'reviewer', name: 'Reviewer', category: 'engineering-dev', description: 'Code review, quality gates, security audit, regression prevention', file: 'reviewer.md', permissions: 'read-only' },
  { id: 'automation-engineer', name: 'Automation Engineer', category: 'engineering-dev', description: 'Process automation, CI/CD, RPA, runbook automation, toil elimination', file: 'automation-engineer.md', permissions: 'read-write' },
  { id: 'flutter-engineer', name: 'Flutter Engineer', category: 'engineering-dev', description: 'Cross-platform UI, Dart, mobile/web/desktop with Flutter', file: 'flutter-engineer.md', permissions: 'read-write', tools: ['dart'] },

  // ── testing-quality (5) ──
  { id: 'tester', name: 'Tester', category: 'testing-quality', description: 'Test automation, QA strategy, bug tracking, quality metrics', file: 'tester.md', permissions: 'read-write' },
  { id: 'qa-engineer', name: 'QA Engineer', category: 'testing-quality', description: 'QA process, test case design, defect management, quality metrics', file: 'qa-engineer.md', permissions: 'read-write', tools: ['playwright', 'cypress', 'vitest', 'jest'] },
  { id: 'e2e-automation-engineer', name: 'E2E Automation Engineer', category: 'testing-quality', description: 'End-to-end test automation, Playwright/Cypress, visual testing', file: 'e2e-automation-engineer.md', permissions: 'read-write', tools: ['playwright', 'cypress'] },
  { id: 'performance-engineer', name: 'Performance Engineer', category: 'testing-quality', description: 'Load testing, profiling, bottleneck identification, optimization', file: 'performance-engineer.md', permissions: 'read-only' },
  { id: 'penetration-tester', name: 'Penetration Tester', category: 'testing-quality', description: 'Offensive security, vulnerability assessment, ethical hacking', file: 'penetration-tester.md', permissions: 'infrastructure' },

  // ── cloud-infra-architecture (5) ──
  { id: 'cloud-architect', name: 'Cloud Architect', category: 'cloud-infra-architecture', description: 'Multi-cloud strategy, Well-Architected Framework, cost architecture', file: 'cloud-architect.md', permissions: 'read-only' },
  { id: 'aws-engineer', name: 'AWS Engineer', category: 'cloud-infra-architecture', description: 'AWS-specific infrastructure, services, best practices', file: 'aws-engineer.md', permissions: 'infrastructure' },
  { id: 'azure-engineer', name: 'Azure Engineer', category: 'cloud-infra-architecture', description: 'Azure-specific infrastructure, enterprise identity, hybrid cloud', file: 'azure-engineer.md', permissions: 'infrastructure' },
  { id: 'gcp-engineer', name: 'GCP Engineer', category: 'cloud-infra-architecture', description: 'GCP-specific infrastructure, data/ML, GKE', file: 'gcp-engineer.md', permissions: 'infrastructure' },
  { id: 'terraform-engineer', name: 'Terraform Engineer', category: 'cloud-infra-architecture', description: 'IaC with Terraform, module design, state management, CI/CD', file: 'terraform-engineer.md', permissions: 'infrastructure', tools: ['terraform'] },

  // ── infrastructure-ops (14) ──
  { id: 'devops', name: 'DevOps', category: 'infrastructure-ops', description: 'IaC, CI/CD, containers, observability, security, disaster recovery', file: 'devops.md', permissions: 'infrastructure', tools: ['docker', 'kubernetes', 'terraform'] },
  { id: 'operations', name: 'Operations', category: 'infrastructure-ops', description: 'Day-to-day system operations, monitoring, incident response, runbooks', file: 'operations.md', permissions: 'infrastructure' },
  { id: 'site-reliability-engineer', name: 'Site Reliability Engineer', category: 'infrastructure-ops', description: 'SLOs, error budgets, toil reduction, capacity planning', file: 'site-reliability-engineer.md', permissions: 'infrastructure' },
  { id: 'platform-engineer', name: 'Platform Engineer', category: 'infrastructure-ops', description: 'Internal developer platform, Backstage, golden paths, DevEx', file: 'platform-engineer.md', permissions: 'infrastructure' },
  { id: 'network-engineer', name: 'Network Engineer', category: 'infrastructure-ops', description: 'Network architecture, routing, segmentation, NetDevOps', file: 'network-engineer.md', permissions: 'infrastructure' },
  { id: 'chaos-engineer', name: 'Chaos Engineer', category: 'infrastructure-ops', description: 'Resilience testing, fault injection, game days, chaos experiments', file: 'chaos-engineer.md', permissions: 'infrastructure' },
  { id: 'kubernetes-engineer', name: 'Kubernetes Engineer', category: 'infrastructure-ops', description: 'K8s cluster lifecycle, networking, security, GitOps', file: 'kubernetes-engineer.md', permissions: 'infrastructure', tools: ['kubernetes'] },
  { id: 'argocd-engineer', name: 'ArgoCD Engineer', category: 'infrastructure-ops', description: 'GitOps deployments, ApplicationSets, sync strategies, multi-cluster', file: 'argocd-engineer.md', permissions: 'infrastructure' },
  { id: 'service-mesh-engineer', name: 'Service Mesh Engineer', category: 'infrastructure-ops', description: 'Istio, Linkerd, mTLS, traffic policies, observability', file: 'service-mesh-engineer.md', permissions: 'infrastructure' },
  { id: 'helm-engineer', name: 'Helm Engineer', category: 'infrastructure-ops', description: 'Chart authoring, packaging, templating, dependency management', file: 'helm-engineer.md', permissions: 'infrastructure' },
  { id: 'dbre-engineer', name: 'DBRE Engineer', category: 'infrastructure-ops', description: 'Database reliability, HA, backup/recovery, query performance, SRE', file: 'dbre-engineer.md', permissions: 'infrastructure' },
  { id: 'cicd-engineer', name: 'CI/CD Pipeline Engineer', category: 'infrastructure-ops', description: 'GitHub Actions, GitLab CI, pipeline optimization, quality gates', file: 'cicd-engineer.md', permissions: 'infrastructure' },
  { id: 'edge-engineer', name: 'Edge / CDN Engineer', category: 'infrastructure-ops', description: 'CDN config, edge compute, Cloudflare Workers, DDoS mitigation', file: 'edge-engineer.md', permissions: 'infrastructure' },
  { id: 'redis-infra-engineer', name: 'Redis Engineer (Infra)', category: 'infrastructure-ops', description: 'Caching, real-time data, session management, Redis infrastructure', file: 'redis-engineer.md', permissions: 'infrastructure' },

  // ── data-intelligence (14) ──
  { id: 'data-engineer', name: 'Data Engineer', category: 'data-intelligence', description: 'Data pipelines, ETL/ELT, warehouses, data quality, orchestration', file: 'data-engineer.md', permissions: 'read-write' },
  { id: 'data-architect', name: 'Data Architect', category: 'data-intelligence', description: 'Enterprise data modeling, data strategy, governance framework', file: 'data-architect.md', permissions: 'read-only' },
  { id: 'analytics-engineer', name: 'Analytics Engineer', category: 'data-intelligence', description: 'dbt transformations, data modeling, quality testing, documentation', file: 'analytics-engineer.md', permissions: 'read-write' },
  { id: 'data-scientist', name: 'Data Scientist', category: 'data-intelligence', description: 'ML models, experimentation, MLOps, analytics, responsible AI', file: 'data-scientist.md', permissions: 'read-write' },
  { id: 'ai-engineer', name: 'AI Engineer', category: 'data-intelligence', description: 'LLM integration, RAG, AI agents, prompt engineering, AI safety', file: 'ai-engineer.md', permissions: 'read-write' },
  { id: 'llm-engineer', name: 'LLM Engineer', category: 'data-intelligence', description: 'Prompt engineering, RAG, fine-tuning, LLM evaluation, safety', file: 'llm-engineer.md', permissions: 'read-write' },
  { id: 'ml-engineer', name: 'ML Engineer', category: 'data-intelligence', description: 'Production model serving, feature pipelines, model monitoring', file: 'ml-engineer.md', permissions: 'read-write' },
  { id: 'deep-learning-engineer', name: 'Deep Learning Engineer', category: 'data-intelligence', description: 'TensorFlow, PyTorch, neural architecture, GPU optimization, training', file: 'deep-learning-engineer.md', permissions: 'read-write' },
  { id: 'mlops-engineer', name: 'MLOps Engineer', category: 'data-intelligence', description: 'ML infrastructure, model serving, feature stores, training pipelines', file: 'mlops-engineer.md', permissions: 'infrastructure' },
  { id: 'data-quality-engineer', name: 'Data Quality Engineer', category: 'data-intelligence', description: 'Data cleaning, quality monitoring, validation automation, observability', file: 'data-quality-engineer.md', permissions: 'read-write' },
  { id: 'database-administrator', name: 'Database Administrator', category: 'data-intelligence', description: 'Schema design, performance tuning, backup/recovery, HA', file: 'database-administrator.md', permissions: 'infrastructure' },
  { id: 'kafka-engineer', name: 'Kafka Engineer', category: 'data-intelligence', description: 'Event streaming, topic design, Kafka Connect, Streams, Schema Registry', file: 'kafka-engineer.md', permissions: 'read-write' },
  { id: 'bi-engineer', name: 'BI Engineer', category: 'data-intelligence', description: 'BI dashboards, semantic layer, Looker/Tableau/PowerBI, metric stores', file: 'bi-engineer.md', permissions: 'read-only' },
  { id: 'scientific-computing-engineer', name: 'Scientific Computing Engineer', category: 'data-intelligence', description: 'Numerical computing, HPC, simulation, bioinformatics, scientific algorithms', file: 'scientific-computing-engineer.md', permissions: 'read-write' },

  // ── specialized-engineering (15) ──
  { id: 'api-engineer', name: 'API Engineer', category: 'specialized-engineering', description: 'API design, OpenAPI, versioning, gateway management', file: 'api-engineer.md', permissions: 'read-write' },
  { id: 'integration-engineer', name: 'Integration Engineer', category: 'specialized-engineering', description: 'System integration, middleware, message queues, contract testing', file: 'integration-engineer.md', permissions: 'read-write' },
  { id: 'migration-engineer', name: 'Migration Engineer', category: 'specialized-engineering', description: 'Data/infrastructure/application migrations, rollback planning', file: 'migration-engineer.md', permissions: 'read-write' },
  { id: 'security-engineer', name: 'Security Engineer', category: 'specialized-engineering', description: 'Threat modeling, secure architecture, vulnerability management, compliance', file: 'security-engineer.md', permissions: 'read-only' },
  { id: 'devsecops-engineer', name: 'DevSecOps Engineer', category: 'specialized-engineering', description: 'Pipeline security automation, policy-as-code, shift-left controls', file: 'devsecops-engineer.md', permissions: 'infrastructure' },
  { id: 'iam-engineer', name: 'IAM Engineer', category: 'specialized-engineering', description: 'Identity, SSO, MFA, RBAC, zero-trust architecture', file: 'iam-engineer.md', permissions: 'infrastructure' },
  { id: 'incident-response-engineer', name: 'Incident Response Engineer', category: 'specialized-engineering', description: 'Security incident response, forensics, containment, recovery', file: 'incident-response-engineer.md', permissions: 'infrastructure' },
  { id: 'data-protection-engineer', name: 'Data Protection Engineer', category: 'specialized-engineering', description: 'Encryption, key management, tokenization, data security standards', file: 'data-protection-engineer.md', permissions: 'read-write' },
  { id: 'observability-engineer', name: 'Observability Engineer', category: 'specialized-engineering', description: 'Metrics, logging, tracing, alerting, SLOs, dashboards', file: 'observability-engineer.md', permissions: 'read-write' },
  { id: 'release-engineer', name: 'Release Engineer', category: 'specialized-engineering', description: 'Release planning, artifact management, deployment orchestration', file: 'release-engineer.md', permissions: 'read-write' },
  { id: 'secrets-vault-engineer', name: 'Secrets & Vault Engineer', category: 'specialized-engineering', description: 'HashiCorp Vault, secrets rotation, encryption, PKI, policy management', file: 'secrets-vault-engineer.md', permissions: 'infrastructure' },
  { id: 'appsec-engineer', name: 'Application Security Engineer', category: 'specialized-engineering', description: 'SAST/DAST/SCA, threat modeling, secure coding, shift-left security', file: 'appsec-engineer.md', permissions: 'read-only' },
  { id: 'soc-analyst', name: 'SOC Analyst', category: 'specialized-engineering', description: 'SIEM monitoring, alert triage, threat detection, incident escalation', file: 'soc-analyst.md', permissions: 'read-only' },
  { id: 'blockchain-engineer', name: 'Blockchain Engineer', category: 'specialized-engineering', description: 'Smart contracts, DeFi, Web3, Solidity, EVM, decentralized applications', file: 'blockchain-engineer.md', permissions: 'read-write' },
  { id: 'temporal-engineer', name: 'Temporal Engineer', category: 'specialized-engineering', description: 'Durable execution, workflow orchestration, activity idempotency, deterministic code', file: 'temporal-engineer.md', permissions: 'read-write' },

  // ── compliance-legal-finance (5) ──
  { id: 'compliance-officer', name: 'Compliance Officer', category: 'compliance-legal-finance', description: 'Regulatory compliance, audit preparation, evidence collection, risk assessment', file: 'compliance-officer.md', permissions: 'read-only' },
  { id: 'legal-engineer', name: 'Legal Engineer', category: 'compliance-legal-finance', description: 'Privacy engineering, contract automation, data governance, open source compliance', file: 'legal-engineer.md', permissions: 'read-only' },
  { id: 'accessibility-engineer', name: 'Accessibility Engineer', category: 'compliance-legal-finance', description: 'WCAG compliance, auditing, inclusive design, ARIA implementation', file: 'accessibility-engineer.md', permissions: 'read-only' },
  { id: 'finops-engineer', name: 'FinOps Engineer', category: 'compliance-legal-finance', description: 'Cloud cost optimization, savings plans, cost allocation, anomaly detection', file: 'finops-engineer.md', permissions: 'read-only' },
  { id: 'privacy-engineer', name: 'Privacy Engineer', category: 'compliance-legal-finance', description: 'Consent management, DSR automation, data mapping, privacy-by-design', file: 'privacy-engineer.md', permissions: 'read-only' },

  // ── content-communication (8) ──
  { id: 'technical-writer', name: 'Technical Writer', category: 'content-communication', description: 'Documentation, API docs, runbooks, knowledge management', file: 'technical-writer.md', permissions: 'read-only' },
  { id: 'content-strategist', name: 'Content Strategist', category: 'content-communication', description: 'Content strategy, editorial calendar, SEO, lifecycle management', file: 'content-strategist.md', permissions: 'read-only' },
  { id: 'tech-translator', name: 'Tech Translator', category: 'content-communication', description: 'Plain-language translation of complex technical concepts', file: 'tech-translator.md', permissions: 'read-only' },
  { id: 'proposal-writer', name: 'Proposal Writer', category: 'content-communication', description: 'Technical proposals, RFP responses, bid management', file: 'proposal-writer.md', permissions: 'read-only' },
  { id: 'localization-engineer', name: 'Localization Engineer', category: 'content-communication', description: 'i18n/l10n, translation pipelines, RTL support, ICU formatting', file: 'localization-engineer.md', permissions: 'read-write' },
  { id: 'support-engineer', name: 'Support Engineer', category: 'content-communication', description: 'Technical support, issue resolution, debugging, knowledge base', file: 'support-engineer.md', permissions: 'read-only' },
  { id: 'visual-creator', name: 'Visual Creator', category: 'content-communication', description: 'AI image generation, graphic design, visual assets, prompt engineering', file: 'visual-creator.md', permissions: 'read-only' },
  { id: 'video-producer', name: 'Video Producer', category: 'content-communication', description: 'Video production, editing, motion graphics, post-production', file: 'video-producer.md', permissions: 'read-only' },

  // ── it-support (1) ──
  { id: 'it-support-engineer', name: 'IT Support Engineer', category: 'it-support', description: 'Internal hardware, software, account management, onboarding/offboarding', file: 'it-support-engineer.md', permissions: 'read-only' },

  // ── planning-oversight (4) ──
  { id: 'cost-estimator', name: 'Cost Estimator', category: 'planning-oversight', description: 'Engineering effort estimation, cost projection, resource planning', file: 'cost-estimator.md', permissions: 'read-only' },
  { id: 'risk-manager', name: 'Risk Manager', category: 'planning-oversight', description: 'Risk identification, assessment, mitigation planning, monitoring', file: 'risk-manager.md', permissions: 'read-only' },
  { id: 'change-manager', name: 'Change Manager', category: 'planning-oversight', description: 'Organizational change management, adoption, stakeholder engagement', file: 'change-manager.md', permissions: 'read-only' },
  { id: 'vendor-manager', name: 'Vendor Manager', category: 'planning-oversight', description: 'Vendor selection, contract management, performance monitoring, risk', file: 'vendor-manager.md', permissions: 'read-only' },

  // ── game-development (1) ──
  { id: 'game-engineer', name: 'Game Engineer', category: 'game-development', description: 'Game development, engine programming, gameplay, rendering, Unity/Unreal/Godot', file: 'game-engineer.md', permissions: 'read-write' },

  // ── frontend-frameworks (2) ──
  { id: 'react-engineer', name: 'React Engineer', category: 'frontend-frameworks', description: 'React, Next.js, server components, state management, frontend architecture', file: 'react-engineer.md', permissions: 'read-write', tools: ['react'] },
  { id: 'vue-engineer', name: 'Vue Engineer', category: 'frontend-frameworks', description: 'Vue, Nuxt, composition API, Pinia, reactive frontend development', file: 'vue-engineer.md', permissions: 'read-write', tools: ['vue'] },

  // ── database-specialists (9) ──
  { id: 'postgresql-engineer', name: 'PostgreSQL Engineer', category: 'database-specialists', description: 'PostgreSQL performance, query optimization, indexing, replication, migration', file: 'postgresql-engineer.md', permissions: 'read-write' },
  { id: 'mongodb-engineer', name: 'MongoDB Engineer', category: 'database-specialists', description: 'MongoDB document modeling, aggregation pipelines, indexing, sharding, replication', file: 'mongodb-engineer.md', permissions: 'read-write' },
  { id: 'redis-engineer', name: 'Redis Engineer', category: 'database-specialists', description: 'Redis caching, data structures, eviction policies, cluster topology, persistence', file: 'redis-engineer.md', permissions: 'read-write' },
  { id: 'elasticsearch-engineer', name: 'Elasticsearch Engineer', category: 'database-specialists', description: 'Elasticsearch mappings, query DSL, shard strategy, cluster health, ILM policies', file: 'elasticsearch-engineer.md', permissions: 'read-write' },
  { id: 'cassandra-engineer', name: 'Cassandra Engineer', category: 'database-specialists', description: 'Cassandra data modeling, CQL, consistency tuning, cluster topology, anti-entropy repair', file: 'cassandra-engineer.md', permissions: 'read-write' },
  { id: 'pinecone-engineer', name: 'Pinecone Engineer', category: 'database-specialists', description: 'Pinecone vector search, pod sizing, metadata filtering, hybrid search, embedding strategy', file: 'pinecone-engineer.md', permissions: 'read-write' },
  { id: 'qdrant-engineer', name: 'Qdrant Engineer', category: 'database-specialists', description: 'Qdrant vector search, HNSW tuning, quantization strategies, payload indexing, segment optimization', file: 'qdrant-engineer.md', permissions: 'read-write' },
  { id: 'neo4j-engineer', name: 'Neo4j Engineer', category: 'database-specialists', description: 'Neo4j graph modeling, Cypher queries, traversal optimization, graph algorithms', file: 'neo4j-engineer.md', permissions: 'read-write' },
  { id: 'influxdb-engineer', name: 'InfluxDB Engineer', category: 'database-specialists', description: 'InfluxDB time-series design, Flux queries, cardinality management, downsampling, retention policies', file: 'influxdb-engineer.md', permissions: 'read-write' },

  // ── cloud-providers (1) ──
  { id: 'oracle-cloud-engineer', name: 'Oracle Cloud Engineer', category: 'cloud-providers', description: 'OCI infrastructure, Autonomous DB, Exadata, enterprise cloud architecture', file: 'oracle-cloud-engineer.md', permissions: 'infrastructure' },
]

export function getAgentCatalog(): AgentProfile[] {
  return catalog
}

export function getAgentCategories(): string[] {
  return [...new Set(catalog.map((a) => a.category))]
}

export function getAgentsByCategory(category: string): AgentProfile[] {
  return catalog.filter((a) => a.category === category)
}

export function getMinimalAgents(): AgentProfile[] {
  return catalog.filter(
    (a) => a.category === 'orchestration' || a.id === 'frontend-engineer' || a.id === 'backend-engineer',
  )
}

export function getAgentCount(): number {
  return catalog.length
}

export function getCategoryCount(): number {
  return new Set(catalog.map((a) => a.category)).size
}

export function getCategoryAgentCounts(): Record<string, number> {
  const counts: Record<string, number> = {}
  for (const a of catalog) {
    counts[a.category] = (counts[a.category] || 0) + 1
  }
  return counts
}
