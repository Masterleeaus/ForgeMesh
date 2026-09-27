<div align="center">

ForgeMesh

Adaptive Engineering Workforce

Repository intelligence that assembles the right specialist AI engineering team for the system and the work.

<br />

Scan the system · Map the architecture · Assemble the specialists · Execute with evidence

<br />
</div>

⸻

Overview

ForgeMesh is an adaptive engineering workforce platform that analyzes software systems and determines what specialist expertise is required to build, audit, improve, and operate them.

Instead of starting with a fixed group of agents, ForgeMesh starts with the software system itself.

It examines the repository, identifies its architecture and technology stack, evaluates relevant engineering signals and risks, and selects the smallest useful combination of specialists from a broad engineering capability registry.

Those specialists are organized into a coordinated workforce with explicit responsibilities, structured handoffs, bounded authority, platform-specific configuration, and independent verification.

ForgeMesh does not ask which agents you want. It determines which engineering capabilities the work requires.

⸻

How ForgeMesh Works

┌──────────────────────────────┐
│     Repository / Workspace   │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│     Repository Intelligence  │
│                              │
│  Stack · Services · Data     │
│  Tests · Infrastructure      │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│        System Model          │
│                              │
│ Architecture · Dependencies  │
│ Boundaries · Risks · Signals │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│      Workforce Compiler      │
│                              │
│ Goal + Evidence + Capability │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│       Specialist Mesh        │
│                              │
│ Architecture · Engineering   │
│ Security · Data · QA · Ops   │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│      Platform Compiler       │
│                              │
│ Claude · Copilot · Cursor    │
│ OpenCode · Aider · Local AI  │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│     Governed Execution       │
│                              │
│ Handoffs · Tests · Review    │
│ Verification · Evidence      │
└──────────────────────────────┘

⸻

Core Architecture

<table>
<tr>
<td width="50%" valign="top">

🔎 Repository Intelligence

ForgeMesh analyzes a project before constructing its workforce.

Detection can include:

* languages and frameworks
* applications and packages
* APIs and services
* databases and data infrastructure
* package managers
* CI/CD systems
* cloud infrastructure
* containers and orchestration
* testing frameworks
* AI/ML dependencies
* observability
* realtime systems
* mobile applications
* architecture patterns

</td>
<td width="50%" valign="top">

🧠 System Model

Repository evidence is normalized into a machine-readable representation of the software system.

The model can describe:

* applications
* services
* packages
* APIs
* databases
* queues
* infrastructure
* deployment surfaces
* external integrations
* tests
* security boundaries
* dependencies

This gives every downstream specialist a shared architectural foundation.

</td>
</tr>
</table>

⸻

The Workforce Compiler

The Workforce Compiler is the central ForgeMesh component.

Traditional multi-agent systems often begin with a predetermined collection of agents and attempt to divide work between them.

ForgeMesh reverses that relationship.

PROJECT EVIDENCE
       +
SYSTEM ARCHITECTURE
       +
USER OBJECTIVE
       +
DETECTED RISKS
       +
CAPABILITY REGISTRY
       +
AUTHORITY CONSTRAINTS
       │
       ▼
┌─────────────────────────┐
│   WORKFORCE COMPILER    │
└────────────┬────────────┘
             │
             ▼
 TASK-SPECIFIC WORKFORCE

The objective is minimum sufficient workforce.

Having hundreds of available specialists does not mean hundreds should participate.

For a particular task, ForgeMesh might determine that only eight are required.

⸻

Example Workforce

Given a production application using:

<table>
<tr>
<td><strong>Application</strong></td>
<td>Next.js + TypeScript</td>
</tr>
<tr>
<td><strong>Database</strong></td>
<td>PostgreSQL</td>
</tr>
<tr>
<td><strong>Cache</strong></td>
<td>Redis</td>
</tr>
<tr>
<td><strong>Infrastructure</strong></td>
<td>Docker + AWS</td>
</tr>
<tr>
<td><strong>CI/CD</strong></td>
<td>GitHub Actions</td>
</tr>
</table>

and the objective:

Make this system production ready.

ForgeMesh may construct:

                  Engineering Manager
                          │
                          ▼
                 Solutions Architect
                          │
          ┌───────────────┼───────────────┐
          │               │               │
          ▼               ▼               ▼
       Next.js        PostgreSQL       Security
       Engineer        Engineer        Engineer
          │               │               │
          ▼               ▼               ▼
     TypeScript         Database         AppSec
      Engineer        Reliability
          │               │               │
          └───────────────┼───────────────┘
                          │
                    ┌─────┴─────┐
                    ▼           ▼
                 Testing      DevOps
                    │           │
                    └─────┬─────┘
                          ▼
                Independent Reviewer

The workforce changes when the objective changes.

The repository may remain identical while ForgeMesh constructs a completely different team for:

* security auditing
* database optimization
* architecture modernization
* feature development
* incident investigation
* accessibility
* performance
* AI integration
* deployment
* technical debt reduction

⸻

Capability Registry

ForgeMesh maintains a broad registry of specialist engineering capabilities.

The registry currently spans hundreds of specialist roles across software engineering and adjacent technical disciplines.

<table>
<tr>
<td width="33%" valign="top">

Engineering

* frontend
* backend
* full-stack
* mobile
* desktop
* APIs
* distributed systems
* realtime systems
* embedded systems
* language specialists

</td>
<td width="33%" valign="top">

Architecture

* solutions architecture
* enterprise architecture
* security architecture
* domain architecture
* event-driven architecture
* mobile architecture
* information architecture
* workflow design

</td>
<td width="33%" valign="top">

AI & ML

* AI engineering
* LLM engineering
* RAG
* agent engineering
* machine learning
* deep learning
* NLP
* computer vision
* LLMOps
* AI safety

</td>
</tr>
<tr>
<td width="33%" valign="top">

Data

* data engineering
* data science
* analytics
* data architecture
* governance
* data quality
* data observability
* realtime analytics
* vector databases

</td>
<td width="33%" valign="top">

Infrastructure

* DevOps
* SRE
* platform engineering
* Docker
* Kubernetes
* GitOps
* networking
* cloud architecture
* edge systems

</td>
<td width="33%" valign="top">

Security

* AppSec
* cloud security
* DevSecOps
* IAM
* threat modelling
* penetration testing
* incident response
* cryptography
* supply-chain security

</td>
</tr>
<tr>
<td width="33%" valign="top">

Quality

* QA
* unit testing
* integration testing
* E2E testing
* API testing
* fuzz testing
* performance testing
* security testing

</td>
<td width="33%" valign="top">

Governance

* privacy engineering
* AI governance
* SOC 2
* ISO 27001
* GDPR
* PCI DSS
* HIPAA
* accessibility
* audit

</td>
<td width="33%" valign="top">

Specialized

* payments
* fintech
* e-commerce
* WebRTC
* blockchain
* robotics
* GPU computing
* GIS
* AR/VR
* automation

</td>
</tr>
</table>

The registry represents available expertise, not simultaneously active agents.

⸻

Explainable Workforce Selection

ForgeMesh treats specialist selection as an engineering decision that should be inspectable.

A specialist assignment can explain its evidence:

POSTGRESQL ENGINEER
────────────────────────────────────
Selected because:
✓ PostgreSQL dependency detected
✓ 19 migration files identified
✓ schema modifications affect current work
✓ persistence layer is inside task scope
Capabilities:
• schema design
• query optimization
• migration review
• indexing
• transaction analysis

Another assignment might be:

APPLICATION SECURITY ENGINEER
────────────────────────────────────
Selected because:
✓ authentication middleware detected
✓ externally exposed API routes identified
✓ authorization-sensitive code affected
✓ production-readiness review requested

This produces an explainable chain:

Evidence → Capability Requirement → Specialist Assignment

⸻

Specialist Mesh

ForgeMesh organizes selected specialists according to dependency and responsibility.

It does not treat them as an unordered collection of prompts.

A simple workflow may be:

Planner
   │
   ▼
Architect
   │
   ▼
Implementation Specialist
   │
   ▼
Test Specialist
   │
   ▼
Security Review
   │
   ▼
Independent Reviewer

A larger task can branch into parallel specialist work before converging for integration and verification.

⸻

Structured Handoffs

Specialists exchange bounded work products rather than uncontrolled conversation history.

A ForgeMesh handoff can contain:

objective:
system_context:
evidence_examined:
work_completed:
files_affected:
assumptions:
risks:
verification:
unresolved_questions:
recommended_next_specialist:

Structured handoffs improve:

* traceability
* context efficiency
* specialist isolation
* reproducibility
* review quality
* orchestration

⸻

Governed Authority

<div align="center">

Capability ≠ Authority

</div>

Being capable of performing an action does not automatically grant permission to perform it.

ForgeMesh separates specialist expertise from execution authority.

┌─────────────────────────┐
│        OBSERVE          │
├─────────────────────────┤
│        ANALYZE          │
├─────────────────────────┤
│       RECOMMEND         │
├─────────────────────────┤
│     PREPARE CHANGES     │
├─────────────────────────┤
│      MODIFY FILES       │
├─────────────────────────┤
│       RUN TESTS         │
├─────────────────────────┤
│     EXECUTE TOOLS       │
├─────────────────────────┤
│ OPERATE INFRASTRUCTURE  │
└─────────────────────────┘

A reviewer can inspect and reject work without modifying it.

A database specialist can prepare a migration without receiving production deployment authority.

A security specialist can identify a vulnerability without automatically changing authentication behavior.

This creates a foundation for controlled agentic engineering.

⸻

Multi-Platform Workforce Compilation

ForgeMesh uses canonical specialist definitions.

Platform-specific agent files are generated outputs.

                ForgeMesh
          Canonical Workforce
                  │
                  ▼
         ┌─────────────────┐
         │ Platform Compiler│
         └────────┬────────┘
                  │
      ┌───────────┼───────────┐
      │           │           │
      ▼           ▼           ▼
 Claude Code    Copilot    OpenCode
      │           │           │
      ▼           ▼           ▼
   Native       Native       Native
   Config       Config       Config

Target environments can include:

* Claude Code
* GitHub Copilot
* Cursor
* OpenCode
* Aider
* Continue-compatible environments
* generic agent systems
* local LLM environments
* future MCP-compatible runtimes

This allows the engineering workforce to remain conceptually stable while its runtime representation changes.

⸻

Local & Private by Design

ForgeMesh is designed so fundamental repository analysis does not depend on sending source code to a remote AI provider.

LOCAL REPOSITORY
       │
       ▼
LOCAL SCANNER
       │
       ▼
SYSTEM MODEL
       │
       ▼
DETERMINISTIC MATCHING
       │
       ▼
WORKFORCE PLAN

Optional intelligence can then use:

<table>
<tr>
<td>💻 <strong>Local models</strong></td>
<td>Private model-assisted reasoning</td>
</tr>
<tr>
<td>🏠 <strong>Local inference</strong></td>
<td>Source remains on-device</td>
</tr>
<tr>
<td>☁️ <strong>Cloud models</strong></td>
<td>Optional external reasoning</td>
</tr>
<tr>
<td>⚙️ <strong>Deterministic engine</strong></td>
<td>No model required</td>
</tr>
</table>

Remote inference is an enhancement rather than a prerequisite for core project detection and workforce matching.

⸻

Deterministic + Model-Assisted Intelligence

ForgeMesh combines explicit engineering signals with optional model reasoning.

Deterministic

PostgreSQL detected
        ↓
Database capability relevant
Kubernetes manifests detected
        ↓
Kubernetes capability relevant
Authentication changes detected
        ↓
Security review required

Model-assisted

Repository Evidence
        +
Architecture Model
        +
Requested Objective
        │
        ▼
Reasoning Model
        │
        ▼
Additional Capability Analysis

The two approaches can reinforce one another without making model inference the sole source of engineering decisions.

⸻

Risk & Gap Analysis

Repository intelligence can identify engineering gaps that influence workforce construction.

<table>
<tr>
<th>Severity</th>
<th>Example Finding</th>
</tr>
<tr>
<td><strong>HIGH</strong></td>
<td>Authentication routes lack integration coverage</td>
</tr>
<tr>
<td><strong>HIGH</strong></td>
<td>Database migration has no rollback strategy</td>
</tr>
<tr>
<td><strong>MEDIUM</strong></td>
<td>Container requires additional hardening</td>
</tr>
<tr>
<td><strong>MEDIUM</strong></td>
<td>Observability coverage is incomplete</td>
</tr>
<tr>
<td><strong>LOW</strong></td>
<td>Documentation differs from detected architecture</td>
</tr>
</table>

Findings can automatically influence the workforce.

Security finding
      ↓
Security capability
      ↓
Security specialist
Migration risk
      ↓
Database reliability capability
      ↓
Database reliability specialist

⸻

Execution Model

ForgeMesh is designed around an evidence-producing engineering lifecycle.

UNDERSTAND
    │
    ▼
PLAN
    │
    ▼
ASSIGN
    │
    ▼
EXECUTE
    │
    ▼
TEST
    │
    ▼
REVIEW
    │
    ▼
VERIFY
    │
    ▼
RECORD EVIDENCE

Execution can be constrained by:

* task scope
* specialist authority
* repository boundaries
* tool permissions
* quality gates
* verification requirements
* risk level

⸻

Independent Verification

The specialist implementing a change should not necessarily be the specialist deciding whether the change is correct.

Backend Engineer
       │
       ▼
Implementation
       │
       ▼
Test Engineer
       │
       ▼
Security Engineer
       │
       ▼
Independent Reviewer
       │
       ▼
ACCEPT / REJECT

Verification can include:

* unit tests
* integration tests
* E2E tests
* type checking
* static analysis
* security scanning
* dependency analysis
* performance testing
* architecture review
* policy validation

⸻

Evidence & Traceability

ForgeMesh is designed to preserve the path between a system observation and an engineering outcome.

Repository Evidence
        ↓
Engineering Finding
        ↓
Capability Requirement
        ↓
Specialist Selection
        ↓
Work Assignment
        ↓
Execution
        ↓
Verification
        ↓
Outcome

Evidence can include:

* why a specialist was selected
* repository signals examined
* work assigned
* files affected
* tools executed
* tests performed
* failures encountered
* review decisions
* unresolved risks
* final verification

⸻

Workforce Evaluation

ForgeMesh is intended to make agentic engineering measurable.

Potential metrics include:

Metric	Purpose
Task completion	Was the objective achieved?
Tests passed	Did expected behavior survive?
Defects introduced	Did the work create regressions?
Defects detected	Did specialist review catch problems?
Review rejection	How often was work returned?
Iterations	How much rework was required?
Execution time	How long did the workflow take?
Token usage	How much model context was consumed?
Model cost	What did execution cost?
Specialist utilization	Which capabilities contributed?
Failed handoffs	Where did orchestration break down?

This enables experiments such as:

<div align="center">

General Coding Agent

vs

ForgeMesh Specialist Workforce

</div>

The objective is to measure whether specialization improves engineering outcomes, not merely assume that it does.

⸻

CLI

The ForgeMesh CLI is being designed around a small set of composable operations.

forgemesh scan

Analyze the current project.

forgemesh workforce

Construct a recommended specialist workforce.

forgemesh workforce --goal "make this production ready"

Build a workforce around a specific objective.

forgemesh explain

Explain specialist-selection decisions.

forgemesh audit

Analyze engineering risks and capability gaps.

forgemesh compile --target claude

Compile the workforce for a supported environment.

forgemesh verify

Run the appropriate verification workflow.

The command surface will evolve as ForgeMesh’s runtime is completed while preserving the underlying architecture.

⸻

Canonical Data Model

ForgeMesh is being normalized around structured engineering concepts.

SpecialistProfile
       │
       ├── Capability
       ├── ProjectSignal
       └── AuthorityRequirement
SystemModel
       │
       ├── Architecture
       ├── Dependency
       └── RiskFinding
WorkRequest
       │
       ▼
WorkforcePlan
       │
       ├── SpecialistAssignment
       ├── AuthorityEnvelope
       └── Handoff
VerificationResult
       │
       ▼
OutcomeMetric

Core concepts include:

* SpecialistProfile
* Capability
* ProjectSignal
* SystemModel
* RiskFinding
* WorkRequest
* WorkforcePlan
* SpecialistAssignment
* AuthorityEnvelope
* Handoff
* VerificationResult
* OutcomeMetric

Structured models allow the same ForgeMesh engine to support CLI, CI/CD, IDE, API and visual interfaces.

⸻

Architecture Principles

<table>
<tr>
<td width="50%" valign="top">

Evidence before assignment

Specialists are selected because project or task evidence justifies their involvement.

Minimum sufficient workforce

More agents are not automatically better.

Capability ≠ authority

Expertise never implicitly grants execution permission.

Canonical definitions

Platform configurations are generated from authoritative specialist definitions.

</td>
<td width="50%" valign="top">

Structured handoffs

Context moves through explicit engineering work products.

Independent verification

Implementation and approval can be separate responsibilities.

Local first

Core analysis should not require cloud inference.

Measurable outcomes

Agentic engineering should be evaluated through evidence.

</td>
</tr>
</table>

⸻

Example: Production Readiness

A developer gives ForgeMesh an application and asks:

Make this system production ready.

1 — System discovery

ForgeMesh identifies:

Next.js
TypeScript
PostgreSQL
Redis
Docker
GitHub Actions
AWS
143 source files
26 API routes
19 database migrations
84 tests
Authentication
Background processing

2 — Risk analysis

HIGH    Authorization integration coverage incomplete
HIGH    Migration rollback strategy missing
MEDIUM  Container hardening required
MEDIUM  Observability coverage incomplete
LOW     Architecture documentation drift

3 — Workforce compilation

Engineering Manager
Solutions Architect
Next.js Engineer
TypeScript Engineer
PostgreSQL Engineer
Database Reliability Engineer
Application Security Engineer
DevOps Engineer
SRE
Test Engineer
Independent Reviewer

4 — Execution topology

                 System Analysis
                       │
                       ▼
               Architecture Review
                       │
                       ▼
                Risk Decomposition
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
  Application       Database     Infrastructure
  Engineering      Engineering     Engineering
        │              │              │
        └──────────────┼──────────────┘
                       ▼
                   Integration
                       │
              ┌────────┴────────┐
              ▼                 ▼
           Testing           Security
              │                 │
              └────────┬────────┘
                       ▼
             Independent Review
                       │
                       ▼
                Evidence Report

Every assignment is connected to evidence.

Every important change can be verified.

Every specialist operates within an explicit role.

⸻

Product Direction

ForgeMesh is being developed toward a straightforward interaction:

<div align="center">

Give ForgeMesh a software system and a goal.

</div>

ForgeMesh determines:

1. What is this system?
2. How is it constructed?
3. What engineering risks exist?
4. What capabilities are required?
5. Which specialists should participate?
6. What is each specialist allowed to do?
7. How should work move between them?
8. How should the result be verified?
9. What evidence demonstrates success?

The objective is not to create the largest collection of agents.

The objective is to make engineering expertise dynamically composable.

⸻

<div align="center">

ForgeMesh

Adaptive Engineering Workforce

Repository Intelligence · Capability Mapping · Workforce Compilation

Specialist Orchestration · Governed Execution · Independent Verification

<br />

Scan the system. Assemble the specialists. Execute with evidence.

</div>
