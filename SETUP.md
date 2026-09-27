# SETUP — Install the Multi-Agent System on Any AI Platform

> **Use this multi-agent engineering system on any AI coding assistant, LLM chat, or agent platform.**
> **340 agents. 22 categories. One system. Every platform.**

---

## Quick Start (All Platforms)

### Recommended: One-Command Self-Setup

Give any AI this command:

```
Fetch and read https://raw.githubusercontent.com/CrimsonDevil333333/agents-profiles/refs/heads/main/README.md
Then initialize the multi-agent system for my project.
```

The AI detects its platform, creates config files, copies native agents, and becomes the Orchestrator — all autonomously.

### Legacy: Manual INIT.md

```
1. Copy INIT.md into your AI's system prompt / instructions
2. The AI becomes the Orchestrator
3. Describe your task — the AI routes it to the right specialist agent
4. Agents are loaded from the repo: github.com/CrimsonDevil333333/agents-profiles
```

---

## Table of Contents

- [Claude (Anthropic)](#claude-anthropic)
- [GitHub Copilot](#github-copilot)
- [Cursor](#cursor)
- [Windsurf](#windsurf)
- [OpenCode](#opencode)
- [Continue.dev](#continuedev)
- [Aider](#aider)
- [Cody (Sourcegraph)](#cody-sourcegraph)
- [ChatGPT (OpenAI)](#chatgpt-openai)
- [Gemini (Google)](#gemini-google)
- [DeepSeek](#deepseek)
- [Grok (xAI)](#grok-xai)
- [Local / Open-Source Models (Llama, Hermes, Mistral, Qwen)](#local--open-source-models)
- [VS Code Extensions](#vs-code-extensions)
- [JetBrains IDE](#jetbrains-ide)
- [Custom / Any LLM](#custom--any-llm)

---

## Claude (Anthropic)

### Claude.ai (Web / App)

1. Open a new conversation
2. Paste the entire contents of INIT.md as your first message
3. Then describe your project and task
4. Claude becomes the Orchestrator — routing to specialists

**Pro tip:** Create a Project with INIT.md in the project knowledge base so it loads automatically on every chat.

### Claude Code (CLI)

```bash
# Option 1: Pipe INIT.md as system prompt
cat INIT.md | claude -p "Load this multi-agent system. I'm building a Node.js API..."

# Option 2: Use CLAUDE.md (Project-level instructions)
cp INIT.md CLAUDE.md
# Claude Code auto-loads CLAUDE.md from the project root

# Option 3: Native agents (pre-built agent definitions)
mkdir -p .claude/agents
cp native-agents/claude/*.md .claude/agents/
# Claude Code loads agents from .claude/agents/ automatically
```

### Claude for Work (Team plan)

Add INIT.md as a **Shared Project Knowledge** document so every team member's Claude sessions activate the multi-agent system automatically.

---

## GitHub Copilot

### Copilot Chat (VS Code / JetBrains)

#### Option A: Workspace Instructions

Add INIT.md content as a **workspace instruction**:

1. Create `.github/copilot-instructions.md`
2. Paste the INIT.md content into it
3. Copilot Chat reads this automatically and routes requests as Orchestrator

```bash
mkdir -p .github && cp INIT.md .github/copilot-instructions.md
```

#### Option B: Native Agents (pre-built agent definitions)

```bash
mkdir -p .github/agents
cp native-agents/copilot/*.agent.md .github/agents/
# Copilot loads agents from .github/agents/ automatically

# Also add instructions so the Orchestrator knows how to route
cp INIT.md .github/copilot-instructions.md
```

### Copilot Chat (Manual)

Start every chat with:

```
Load INIT.md from my repo: [paste INIT.md content]
I need [task]. Route to the right agent.
```

---

## Cursor

Cursor reads `.cursorrules` at the project root. This is the ideal place for INIT.md.

```bash
cp INIT.md .cursorrules
```

### Per-Project Setup

1. Open Cursor Settings → General → Rules for AI
2. Paste INIT.md content into the **User Rules** section
3. Optionally add `.cursorrules` per project for team consistency

### Composer / Chat

Cursor will now auto-load the multi-agent system on every session. Just describe your task and the Orchestrator routes it.

---

## Windsurf

Windsurf supports `.windsurfrules` for project-level AI configuration:

```bash
cp INIT.md .windsurfrules
```

The AI agent (Cascade) reads these rules on every session and activates the multi-agent orchestration system.

---

## OpenCode

OpenCode supports system-level configuration via `opencode.json`, project-level via AGENTS.md, and **native agents** via `.opencode/agents/`.

### Global Install (All Projects)

```bash
# Linux/macOS
mkdir -p ~/.config/opencode
cp INIT.md ~/.config/opencode/AGENTS.md

# Optionally install all native agents
mkdir -p ~/.config/opencode/agents
cp native-agents/opencode/*.md ~/.config/opencode/agents/

# Windows
mkdir %APPDATA%\opencode
copy INIT.md %APPDATA%\opencode\AGENTS.md
```

### Per-Project Install

```bash
cp INIT.md AGENTS.md

# With native agents (only copy agents relevant to your project)
mkdir -p .opencode/agents
cp native-agents/opencode/frontend-engineer.md .opencode/agents/
cp native-agents/opencode/backend-engineer.md .opencode/agents/
cp native-agents/opencode/reviewer.md .opencode/agents/
```

OpenCode auto-loads AGENTS.md at the start of every session when it exists in the project root — turning OpenCode into the Orchestrator with all specialists on call. Native agent files (`.opencode/agents/*.md`) are loaded as sub-agents with built-in permission controls.

---

## Continue.dev

Continue supports **Rules** files that inject into every session.

```bash
# Global rule
mkdir -p ~/.continue
cp INIT.md ~/.continue/rules.md

# Project rule
cp INIT.md .continuerc.json  # or paste into .continuerc.json rules array
```

### Via config.json

Edit `~/.continue/config.json`:

```json
{
  "rules": [
    {
      "file": "path/to/INIT.md"
    }
  ]
}
```

---

## Aider

Aider uses **convention files** loaded from the repo root:

```bash
# Aider reads .aider.conf.yml and .aider-rules.md
cp INIT.md .aider-rules.md
```

Or pass directly:

```bash
aider --load INIT.md --message "Load this multi-agent system and help me..."
```

For persistent use, add to `.aider.conf.yml`:

```yaml
load: INIT.md
```

---

## Cody (Sourcegraph)

### VS Code / JetBrains Extension

1. Open Cody Settings → Custom Commands
2. Add a new command called `orchestrate` with INIT.md as the prompt
3. Or paste INIT.md content into a **Cody Note** pinned to your workspace

### Enterprise

For Sourcegraph Enterprise, add INIT.md as a **context file** in your repository — Cody indexes it and can reference it automatically.

---

## ChatGPT (OpenAI)

### ChatGPT Web / App

1. Start a new chat
2. Paste INIT.md content as the first message
3. Say: *"Load this multi-agent system. I'm working on [project]. Route tasks to the right specialist."*

### Custom GPTs

Create a Custom GPT with INIT.md as the **Instructions**:

1. Go to Explore GPTs → Create
2. Paste INIT.md into the Instructions field
3. Add the repo URL as a Knowledge source
4. Name: *"Multi-Agent Engineering Orchestrator"*

### ChatGPT API (Programmatic)

```python
system_prompt = open("INIT.md").read()
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": "I need to build a cloud-native API..."}
    ]
)
```

---

## Gemini (Google)

### Gemini Web

1. Open a new chat
2. Paste INIT.md content first
3. Say: *"Initialize multi-agent system. Route my tasks."*

### Gemini API

```python
import google.generativeai as genai

with open("INIT.md") as f:
    init_content = f.read()

model = genai.GenerativeModel(
    model_name="gemini-2.0-flash",
    system_instruction=init_content
)
response = model.generate_content("Design a cloud architecture for my SaaS app")
```

---

## DeepSeek

### DeepSeek Chat (Web)

Paste INIT.md as the opening message, then describe your task:

```
[INIT.md content]

I'm building a data pipeline. Route to the right agents.
```

### DeepSeek API

```python
system_prompt = open("INIT.md").read()
response = client.chat.completions.create(
    model="deepseek-chat",
    messages=[
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": "Help me deploy my Kubernetes cluster"}
    ]
)
```

---

## Grok (xAI)

### Grok on X / Standalone

Paste INIT.md at the start of your conversation:

> *"[INIT.md content]
> I need to build a full-stack application. Route through the agent system."*

---

## Local / Open-Source Models

For local models running via Ollama, llama.cpp, vLLM, or similar.

### Ollama

```bash
# With modelfile
echo "SYSTEM \"$(cat INIT.md)\"" > Modelfile
ollama create my-eng-system -f Modelfile
ollama run my-eng-system "I need to build a microservice..."

# Or pass system prompt at runtime
ollama run llama3 "INIT.md content... Design an API architecture"
```

### Hermes (Nous Research)

```bash
# Hermes supports system prompts natively
ollama run hermes3 "System: $(cat INIT.md)
User: Write a Rust HTTP server..."
```

### LM Studio / GPT4All

Paste INIT.md into the **System Prompt** field before starting your session.

### vLLM / TGI

```python
llm = LLM(model="mistral-large", 
          system_prompt=open("INIT.md").read())
```

---

## VS Code Extensions

### Adding to Any VS Code AI Extension

Most VS Code AI tools support a custom instructions file:

| Extension | File | Location |
|-----------|------|----------|
| Cursor | `.cursorrules` | Project root |
| Copilot Chat | `.github/copilot-instructions.md` | Project root |
| Continue | `~/.continue/rules.md` | Global |
| Cody | Custom Command | Extension settings |
| Twinny | `~/.twinny/prompts/system.md` | Global |
| CodeGPT | Settings → Custom Instructions | Extension UI |

```bash
# Universal: copy INIT.md to all known locations
cp INIT.md .cursorrules
cp INIT.md .github/copilot-instructions.md
mkdir -p ~/.continue && cp INIT.md ~/.continue/rules.md
```

---

## JetBrains IDE

### AI Assistant (JetBrains)

1. Open Settings → Tools → AI Assistant → Custom Prompt
2. Paste INIT.md content into **System Prompt**
3. The AI Assistant now acts as the Orchestrator across all JetBrains IDEs

### Copilot in JetBrains

Same as VS Code — place `.github/copilot-instructions.md` in the project root.

---

## Custom / Any LLM

If your tool supports **system prompts**, paste INIT.md there. If it supports **custom instructions**, paste INIT.md there. If it supports **project rules**, paste INIT.md there.

### Universal Formula

```yaml
system_prompt: |
  <paste entire INIT.md here>
  
user_message: |
  Load this multi-agent system. I need [task].
  Route to the appropriate specialist agent.
```

### No-Fetch Fallback

If the AI cannot fetch agent files from GitHub, say:

> *"I can't fetch from the repo right now. Rely on your training data for the agent profiles. Still adopt agent identities, use Handoff Protocols, and pass through the Reviewer gate."*

---

## Verification Checklist

After setup on any platform, verify the system is active:

- [ ] AI introduces itself as the Orchestrator
- [ ] AI routes your task to a specialist (e.g., "Routing to Cloud Architect...")
- [ ] AI adopts the specialist's identity and tone
- [ ] AI uses Handoff Protocol for multi-domain tasks
- [ ] AI passes output through the Reviewer gate before delivery

---

## Quick File Reference

| File | Purpose | Where to Install |
|------|---------|-----------------|
| [`README.md`](./README.md) | **Self-setup protocol** — ONE command activates everything | AI reads this first, auto-configures |
| [`INIT.md`](./INIT.md) | Session init protocol & triage table (legacy) | System prompt, rules file, first message |
| [`skill.md`](./skill.md) | Analyze project & select agents | Run once per project to pick roster |
| [`SETUP.md`](./SETUP.md) | Platform-by-platform install guides | Reference for manual setup |
| [`AGENT.md`](./AGENT.md) | Developer guide for extending the system | For maintainers |
| `native-agents/opencode/*.md` | Native OpenCode agents | `.opencode/agents/` |
| `native-agents/claude/*.md` | Native Claude Code agents | `.claude/agents/` |
| `native-agents/copilot/*.agent.md` | Native GitHub Copilot agents | `.github/agents/` |

---

*"One system. 144 agents. Every platform. One command. Push the repo, give the README URL, and the AI does the rest."*
