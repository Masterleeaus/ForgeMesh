#!/usr/bin/env python3
"""Generate native agent definitions for OpenCode, Claude Code, and GitHub Copilot.

Reads all agent .md files and outputs platform-native agent configs
with full profile context embedded into the system prompt.
"""
import os
import re
import json

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUTPUT_DIR = os.path.join(REPO_ROOT, "native-agents")
CATEGORIES = [
    "orchestration", "executive", "business-analysis", "people-culture",
    "business-revenue", "design-architecture", "system-extensibility",
    "language-specific", "engineering-dev", "testing-quality",
    "cloud-infra-architecture", "infrastructure-ops", "data-intelligence",
    "specialized-engineering", "compliance-legal-finance",
    "content-communication", "it-support", "planning-oversight",
    "game-development", "frontend-frameworks", "database-specialists",
    "cloud-providers"
]

# Classification: read-only, read-write, infrastructure
CLASSIFICATION = {
    # read-only — advisory, review, and oversight roles
    "Assistant": "read-only", "Planner": "read-only",
    "Product Manager": "read-only", "Project Manager": "read-only",
    "Program Manager": "read-only", "Engineering Manager": "read-only",
    "Scrum Master": "read-only", "Agile Coach": "read-only",
    "CEO": "read-only", "CTO": "read-only", "VP Engineering": "read-only",
    "Business Analyst": "read-only", "Data Analyst": "read-only",
    "HR Manager": "read-only", "Technical Recruiter": "read-only",
    "Training Specialist": "read-only",
    "Sales Engineer": "read-only", "Customer Success": "read-only",
    "Developer Advocate": "read-only", "Marketing Engineer": "read-only",
    "Technical Account Manager": "read-only",
    "Architect": "read-only", "Designer": "read-only",
    "Solutions Architect": "read-only", "Workflow Designer": "read-only",
    "Researcher": "read-only", "Usability Engineer": "read-only",
    "Agent Evaluator": "read-only", "Knowledge Curator": "read-only",
    "Reviewer": "read-only",
    "Tester": "read-only", "QA Engineer": "read-only",
    "Penetration Tester": "read-only", "Performance Engineer": "read-only",
    "E2E Automation Engineer": "read-only",
    "Cloud Architect": "read-only",
    "Security Engineer": "read-only", "Application Security Engineer": "read-only",
    "SOC Analyst": "read-only", "IAM Engineer": "read-only",
    "Incident Response Engineer": "read-only",
    "Data Protection Engineer": "read-only",
    "Compliance Officer": "read-only", "FinOps Engineer": "read-only",
    "Legal Engineer": "read-only", "Privacy Engineer": "read-only",
    "Accessibility Engineer": "read-only",
    "Technical Writer": "read-only", "Content Strategist": "read-only",
    "Localization Engineer": "read-only", "Proposal Writer": "read-only",
    "Tech Translator": "read-only", "Support Engineer": "read-only",
    "IT Support Engineer": "read-only",
    "Visual Creator": "read-only", "Video Producer": "read-only",
    "Cost Estimator": "read-only", "Risk Manager": "read-only",
    "Change Manager": "read-only", "Vendor Manager": "read-only",
    "Data Scientist": "read-only", "Data Architect": "read-only",
    "BI Engineer": "read-only",
    "Enterprise Architect": "read-only", "Domain Architect": "read-only",
    "Security Architect": "read-only", "Mobile Architect": "read-only",
    "Event-Driven Architect": "read-only", "Information Architect": "read-only",
    "Technical Program Manager": "read-only", "Incident Commander": "read-only",
    "Technical Debt Manager": "read-only", "Lean Engineer": "read-only",
    "Value Stream Mapping Specialist": "read-only",
    "OKR Coach": "read-only", "Product Operations Engineer": "read-only",
    "Cloud Migration Engineer": "read-only",
    "Threat Modeling Engineer": "read-only", "Zero Trust Engineer": "read-only",
    "AI Safety Engineer": "read-only",
    "Quantum Engineer": "read-only",
    "Data Governance Engineer": "read-only", "Data Product Engineer": "read-only",
    "SOC 2 Engineer": "read-only", "HIPAA Engineer": "read-only",
    "PCI DSS Engineer": "read-only", "GDPR Engineer": "read-only",
    "FedRAMP Engineer": "read-only", "Audit Engineer": "read-only",
    "ISO 27001 Engineer": "read-only",
    "LegalTech Engineer": "read-only", "EdTech Engineer": "read-only",
    "AdTech Engineer": "read-only",
    "Disaster Recovery Engineer": "read-only", "Capacity Planner": "read-only",
    "Vendor Risk Engineer": "read-only", "AI Governance Engineer": "read-only",
    "Records Management Engineer": "read-only", "Data Breach Engineer": "read-only",
    # universal — read-write (planning, content, engineering)
    "Implementation Plan Generator": "read-write",
    "Progress Tracker": "read-write",
    "Documentation Updater": "read-write",
    "Changelog Manager": "read-write",
    "Dependency Manager": "read-write",
    "Commit Message Generator": "read-write",
    "Pre-commit Auditor": "read-write",
    "Code Style Enforcer": "read-write",
    # read-write — hands-on development and implementation roles
    "Developer": "read-write", "Frontend Engineer": "read-write",
    "Backend Engineer": "read-write", "Mobile Engineer": "read-write",
    "iOS Engineer": "read-write", "Android Engineer": "read-write",
    "Embedded Engineer": "read-write", "Automation Engineer": "read-write",
    "Node.js Engineer": "read-write", "Python Engineer": "read-write",
    "Go Engineer": "read-write", "Rust Engineer": "read-write",
    "Java Engineer": "read-write", "C/C++ Engineer": "read-write",
    "PHP Engineer": "read-write", "Ruby Engineer": "read-write",
    ".NET Engineer": "read-write", "Swift Engineer": "read-write",
    "Zig Engineer": "read-write",
    "Scala Engineer": "read-write", "Kotlin Engineer": "read-write",
    "TypeScript Engineer": "read-write", "R Engineer": "read-write",
    "Elixir Engineer": "read-write", "Haskell Engineer": "read-write",
    "React Engineer": "read-write", "Vue Engineer": "read-write",
    "Flutter Engineer": "read-write",
    "Angular Engineer": "read-write", "Svelte Engineer": "read-write",
    "SolidJS Engineer": "read-write",
    "Game Engineer": "read-write",
    "CSS/Design Systems Engineer": "read-write",
    "Desktop Engineer": "read-write",
    "React Native Engineer": "read-write",
    "WebGL/3D Engineer": "read-write",
    "BFF Engineer": "read-write",
    "IoT Engineer": "read-write",
    "AR/VR Engineer": "read-write", "Robotics Engineer": "read-write",
    "Dart Engineer": "read-write", "Lua Engineer": "read-write",
    "Erlang Engineer": "read-write", "Julia Engineer": "read-write",
    "Clojure Engineer": "read-write",
    "OCaml/F# Engineer": "read-write",
    "Mainframe Engineer": "read-write", "Perl Engineer": "read-write",
    "PostgreSQL Engineer": "read-write",
    "MySQL Engineer": "read-write", "SQLite Engineer": "read-write",
    "Redis Database Engineer": "read-write",
    "CockroachDB Engineer": "read-write",
    "DynamoDB Engineer": "read-write", "Firestore Engineer": "read-write",
    "Milvus Engineer": "read-write", "Couchbase Engineer": "read-write",
    "Scientific Computing Engineer": "read-write",
    "Blockchain Engineer": "read-write",
    "Agent Builder": "read-write", "Skill Creator": "read-write",
    "Prompt Engineer": "read-write", "MCP Server Developer": "read-write",
    "AI Engineer": "read-write", "LLM Engineer": "read-write",
    "Deep Learning Engineer": "read-write", "ML Engineer": "read-write",
    "Data Engineer": "read-write", "Analytics Engineer": "read-write",
    "Kafka Engineer": "read-write", "Data Quality Engineer": "read-write",
    "DuckDB Engineer": "read-write", "ClickHouse Engineer": "read-write",
    "Snowflake Engineer": "read-write", "BigQuery Engineer": "read-write",
    "Redshift Engineer": "read-write", "Databricks Engineer": "read-write",
    "Supabase Engineer": "read-write",
    "Feature Store Engineer": "read-write",
    "NLP Engineer": "read-write", "Computer Vision Engineer": "read-write",
    "RAG Architect": "read-write",
    "Data Orchestration Engineer": "read-write",
    "Data Platform Engineer": "read-write",
    "Bioinformatics Engineer": "read-write",
    "API Engineer": "read-write", "Integration Engineer": "read-write",
    "Migration Engineer": "read-write", "Release Engineer": "read-write",
    "Observability Engineer": "read-write",
    "Cloud Security Engineer": "read-write", "K8s Security Engineer": "read-write",
    "Supply Chain Security Engineer": "read-write",
    "SIEM Engineer": "read-write", "Digital Forensics Engineer": "read-write",
    "GraphQL Engineer": "read-write", "gRPC Engineer": "read-write",
    "Real-Time Engineer": "read-write",
    "Pulumi Engineer": "read-write", "Serverless Engineer": "read-write",
    "WASM Engineer": "read-write",
    "MERN Stack Engineer": "read-write", "MEAN Stack Engineer": "read-write",
    "JAMstack Engineer": "read-write", "LAMP Stack Engineer": "read-write",
    "ELK Stack Engineer": "read-write", "Full-Stack Engineer": "read-write",
    "TALL Stack Engineer": "read-write", "Serverless Stack Engineer": "read-write",
    "Express.js Engineer": "read-write", "FastAPI Engineer": "read-write",
    "Django Engineer": "read-write", "Spring Boot Engineer": "read-write",
    "NestJS Engineer": "read-write", "Rails Engineer": "read-write",
    "Laravel Engineer": "read-write", "Next.js Engineer": "read-write",
    "Nuxt Engineer": "read-write", "Actix/Axum Engineer": "read-write",
    "Echo/Fiber Engineer": "read-write",
    "Firebase Engineer": "read-write", "Vercel/Edge Engineer": "read-write",
    "Stripe/Payments Engineer": "read-write", "Auth Engineer": "read-write",
    "Algolia/Search Engineer": "read-write", "Observability Platform Engineer": "read-write",
    "Data Lake Engineer": "read-write", "ETL/ELT Engineer": "read-write",
    "Microservices Engineer": "read-write",
    "CQRS/Event Sourcing Engineer": "read-write",
    "Caching Engineer": "read-write", "Message Queue Engineer": "read-write",
    "E-commerce Engineer": "read-write", "FinTech Engineer": "read-write",
    "HealthTech Engineer": "read-write", "Game Server Engineer": "read-write",
    "GIS/Geospatial Engineer": "read-write",
    "Payment Integration Engineer": "read-write", "LLMOps Engineer": "read-write",
    "GPU/CUDA Engineer": "read-write", "FPGA Engineer": "read-write",
    "RISC-V Engineer": "read-write", "WebGPU/Compute Engineer": "read-write",
    "RTOS/Firmware Engineer": "read-write",
    "WebSocket/Real-Time Engineer": "read-write",
    "Streaming Pipeline Engineer": "read-write", "Edge Compute Engineer": "read-write",
    "Real-Time Analytics Engineer": "read-write",
    "Feature Flag/Experiment Engineer": "read-write",
    "Nim Engineer": "read-write", "Crystal Engineer": "read-write",
    "Mojo Engineer": "read-write", "D Engineer": "read-write",
    "Ada/SPARK Engineer": "read-write", "Scheme/Racket Engineer": "read-write",
    "Prolog Engineer": "read-write", "Fortran Engineer": "read-write",
    "V Engineer": "read-write", "Odin Engineer": "read-write",
    "Visual Testing Engineer": "read-write", "API Testing Engineer": "read-write",
    "Mobile Testing Engineer": "read-write", "Security Testing Engineer": "read-write",
    "Reverse Engineering Engineer": "read-write",
    "Cryptography Engineer": "read-write",
    # infrastructure — full shell/infrastructure access
    "DevOps": "infrastructure", "Site Reliability Engineer": "infrastructure",
    "Kubernetes Engineer": "infrastructure", "Platform Engineer": "infrastructure",
    "Operations": "infrastructure", "Network Engineer": "infrastructure",
    "Chaos Engineer": "infrastructure", "Edge / CDN Engineer": "infrastructure",
    "CI/CD Pipeline Engineer": "infrastructure",
    "Helm Engineer": "infrastructure", "Service Mesh Engineer": "infrastructure",
    "ArgoCD Engineer": "infrastructure",
    "Database Reliability Engineer (DBRE)": "infrastructure",
    "Terraform Engineer": "infrastructure",
    "AWS Engineer": "infrastructure", "Azure Engineer": "infrastructure",
    "GCP Engineer": "infrastructure",
    "DevSecOps Engineer": "infrastructure",
    "Secrets & Vault Engineer": "infrastructure",
    "Database Administrator": "infrastructure",
    "MLOps Engineer": "infrastructure",
    "Redis Engineer": "infrastructure",
    "Oracle Cloud Engineer": "infrastructure",
    "Ansible Engineer": "infrastructure", "Docker Engineer": "infrastructure",
    "GitOps Engineer": "infrastructure",
    "Nix Engineer": "infrastructure", "Virtualization Engineer": "infrastructure",
    "HashiCorp Stack Engineer": "infrastructure",
    "Cloudflare Engineer": "infrastructure",
    "Red Team Engineer": "infrastructure",
    # engineering-dev — new
    "CLI Tool Engineer": "read-write", "TUI Application Engineer": "read-write",
    "Low-Code Platform Engineer": "read-write", "Monorepo Engineer": "read-write",
    "Build System Engineer": "read-write", "Frontend Build Engineer": "read-write",
    # testing-quality — new
    "Contract Testing Engineer": "read-write", "Fuzz Testing Engineer": "read-write",
    # infrastructure-ops — new
    "Policy Engine Engineer": "infrastructure",
    "Database Proxy Engineer": "infrastructure",
    "Infrastructure Testing Engineer": "infrastructure",
    # specialized-engineering — new
    "RPA Automation Engineer": "read-write", "n8n Workflow Engineer": "read-write",
    "API Gateway Engineer": "infrastructure",
    "AI Agent Framework Engineer": "read-write",
    "ACP/MCP Protocol Engineer": "read-write",
    "Database Migration Engineer": "read-write",
    "Data Observability Engineer": "read-write",
    "OpenTelemetry Engineer": "read-write",
    "Real-Time Collaboration Engineer": "read-write",
    "Mobile Distribution Engineer": "read-write",
    # specialized-engineering — round 3
    "Developer Portal Engineer": "read-write",
    "API Documentation Engineer": "read-write",
    "Code Generation Engineer": "read-write",
    "WebRTC Engineer": "read-write",
    "Audio/Video Processing Engineer": "read-write",
    "Environment & Configuration Engineer": "read-write",
    "Package & Artifact Registry Engineer": "read-write",
    "Local-First Engineer": "read-write",
}

def slugify(name):
    # Handle .NET specially before generic dot replacement
    s = name.lower()
    s = s.replace(".net", "dotnet")
    return s.replace(" ", "-").replace("/", "-").replace(".", "-").replace("&", "and")

def parse_agent_file(filepath):
    with open(filepath, "r") as f:
        content = f.read()
    lines = content.split("\n")

    name = ""
    subtitle = ""
    role = ""
    archetype = ""
    tone = ""
    core_mandate = ""

    # Title: # Name — Subtitle
    for line in lines:
        m = re.match(r"^# (.+?) — (.+)$", line)
        if m:
            name = m.group(1).strip()
            subtitle = m.group(2).strip()
            break

    # Role / Archetype / Tone from blockquote
    for line in lines:
        m = re.match(r"> \*\*Role:\*\* (.+)$", line)
        if m:
            role = m.group(1).strip()
        m = re.match(r"> \*\*Archetype:\*\* (.+)$", line)
        if m:
            archetype = m.group(1).strip()
        m = re.match(r"> \*\*Tone:\*\* (.+)$", line)
        if m:
            tone = m.group(1).strip()

    # Core Mandate
    for line in lines:
        m = re.match(r"\*\*Core Mandate:\*\* (.+)$", line)
        if m:
            core_mandate = m.group(1).strip()
            break

    # Body = everything after the first line (title)
    first_newline = content.find("\n")
    if first_newline != -1:
        body = content[first_newline:].strip()
    else:
        body = ""

    classification = CLASSIFICATION.get(name, "read-only")

    return {
        "name": name,
        "slug": slugify(name),
        "subtitle": subtitle,
        "archetype": archetype,
        "tone": tone,
        "role": role,
        "core_mandate": core_mandate,
        "body": body,
        "classification": classification,
    }


def get_permissions(classification, platform):
    if platform == "opencode":
        if classification == "read-only":
            return {
                "read": "allow",
                "edit": "deny",
                "write": "deny",
                "bash": "deny",
                "glob": "allow",
                "grep": "allow",
            }
        elif classification == "read-write":
            return {
                "read": "allow",
                "edit": "allow",
                "write": "allow",
                "bash": "ask",
                "glob": "allow",
                "grep": "allow",
            }
        else:  # infrastructure
            return {
                "read": "allow",
                "edit": "allow",
                "write": "allow",
                "bash": "allow",
                "glob": "allow",
                "grep": "allow",
            }
    elif platform == "claude":
        if classification == "read-only":
            return {"tools": ["Read", "Glob", "Grep"], "disallowedTools": ["Write", "Edit", "Bash"]}
        elif classification == "read-write":
            return {"tools": ["Read", "Write", "Edit", "Glob", "Grep", "Bash"]}
        else:
            return {"tools": ["Read", "Write", "Edit", "Glob", "Grep", "Bash"]}
    else:  # copilot
        if classification == "read-only":
            return {"tools": ["read", "glob", "grep"]}
        elif classification == "read-write":
            return {"tools": ["read", "edit", "write", "glob", "grep", "search"]}
        else:
            return {"tools": ["read", "edit", "write", "glob", "grep", "search", "bash"]}


def build_system_prompt(info):
    """Return the full profile body (all domain-specific content)."""
    return info["body"]


def generate_opencode(info):
    perms = get_permissions(info["classification"], "opencode")
    perm_yaml = "\n".join(f"    {k}: {v}" for k, v in perms.items())
    prompt = build_system_prompt(info)
    desc = f"{info['archetype']} — {info['core_mandate']}" if info['archetype'] else info['core_mandate']
    desc = desc.replace('"', "'")
    return f"""---
description: "{desc}"
mode: subagent
permission:
{perm_yaml}
---

# {info['name']} — {info['subtitle']}

{prompt}
"""


def generate_claude(info):
    perms = get_permissions(info["classification"], "claude")
    tools = perms["tools"]
    disallowed = perms.get("disallowedTools", [])
    prompt = build_system_prompt(info)
    desc = f"{info['archetype']} — {info['core_mandate']}" if info['archetype'] else info['core_mandate']
    parts = [f"""---
name: {info['slug']}
description: "{desc}"
tools: {', '.join(tools)}"""]
    if disallowed:
        parts.append(f"disallowedTools: {', '.join(disallowed)}")
    parts.append(f"""model: sonnet
---

# {info['name']} — {info['subtitle']}

{prompt}""")
    return "\n".join(parts)


def generate_copilot(info):
    perms = get_permissions(info["classification"], "copilot")
    tools_json = json.dumps(perms["tools"])
    prompt = build_system_prompt(info)
    desc = f"{info['archetype']} — {info['core_mandate']}" if info['archetype'] else info['core_mandate']
    return f"""---
name: {info['slug']}
description: "{desc}"
tools: {tools_json}
---

# {info['name']} — {info['subtitle']}

{prompt}
"""


def main():
    for platform in ["opencode", "claude", "copilot"]:
        plat_dir = os.path.join(OUTPUT_DIR, platform)
        os.makedirs(plat_dir, exist_ok=True)

    generated = 0
    for cat in CATEGORIES:
        cat_dir = os.path.join(REPO_ROOT, cat)
        if not os.path.isdir(cat_dir):
            continue
        for fname in sorted(os.listdir(cat_dir)):
            if not fname.endswith(".md"):
                continue
            fpath = os.path.join(cat_dir, fname)
            info = parse_agent_file(fpath)
            for platform in ["opencode", "claude", "copilot"]:
                plat_dir = os.path.join(OUTPUT_DIR, platform)
                ext = ".agent.md" if platform == "copilot" else ".md"
                out_name = f"{info['slug']}{ext}"
                out_path = os.path.join(plat_dir, out_name)
                if platform == "opencode":
                    content = generate_opencode(info)
                elif platform == "claude":
                    content = generate_claude(info)
                else:
                    content = generate_copilot(info)
                with open(out_path, "w") as f:
                    f.write(content)
            generated += 1
            print(f"  ✓ {cat}/{fname} → {info['slug']}")

    print(f"\n=== Generated {generated} agent definitions ===")
    for platform in ["opencode", "claude", "copilot"]:
        count = len(os.listdir(os.path.join(OUTPUT_DIR, platform)))
        print(f"  {platform}: {count} files")


if __name__ == "__main__":
    main()
