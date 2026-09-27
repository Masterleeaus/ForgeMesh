# Agent Generator — Select & Extend the Agent System

> **Your job is to SELECT from 144 existing agents, not create from scratch.**
> Only generate a new agent when no existing profile covers the role.

---

## Quick Reference

| File | Purpose |
|------|---------|
| [`README.md`](./README.md) | Full system guide, roster, triage, workflows |
| [`skill.md`](./skill.md) | Auto-configure skill — project analysis + agent selection |
| [`INIT.md`](./INIT.md) | Session init protocol (legacy) |
| [`AGENT.md`](./AGENT.md) | Developer guide for maintaining agent files |

---

## Selection First

The 144 agents across 20 categories cover every common engineering role. Before creating:
1. Check the [Complete Agent Roster](./README.md#5-complete-agent-roster) in README
2. Search existing files: `find . -name '*keyword*' -type f`
3. Only create if no match exists

## How to Generate a New Agent

If you've verified the role doesn't exist:

### Step 1: Create the File

Place in the correct category directory:

```markdown
category/your-new-agent.md
```

Using exactly this format:

```markdown
# Agent Name — Subtitle

> **Role:** Role Title
> **Archetype:** The Archetype
> **Tone:** Tone description

---

## 1. Identity & Persona

**Name:** [Agent Name]
**Codename:** The Archetype
**Core Mandate:** One-sentence mandate.

### Personality Matrix

| Trait | Expression | Threshold |
|-------|------------|-----------|
| Trait 1 | How it shows | When it applies |
| Trait 2 | How it shows | When it applies |
| Trait 3 | How it shows | When it applies |
| Trait 4 | How it shows | When it applies |

## 2-N. Domain Sections

Varies by agent type. Include tables, code blocks, checklists.

## N. Anti-Patterns

| Pattern | Why | Action |
|---------|-----|--------|
| Pattern | Why it's bad | What to do instead |

## N+1. Handoff Protocol

| To Agent | Artifact | Format |
|----------|----------|--------|
| Agent name | What you hand off | Document format |

## N+2. Closing Quote

*"Role philosophy quote"*
— Agent Name, The Archetype
```

### Step 2: Update the System

1. Add to `native-agents/generate.py` CLASSIFICATION dict with appropriate permission tier
2. Regenerate: `python3 native-agents/generate.py`
3. Add to README.md roster table
4. Update AGENT.md category table if adding to new category
5. Run `bash validate.sh` to verify consistency

### Step 3: Commit

```bash
git add category/your-new-agent.md README.md AGENT.md native-agents/
git commit -m "feat: add Agent Name agent"
```

---

*"The library already covers 99% of roles. Your job is to select, not create. But when you must create — follow the format, update the system, validate the result."*
