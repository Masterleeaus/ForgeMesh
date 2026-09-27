# Contributing to Multi-Agent Engineering System

Thanks for helping improve the agent library!

## Before You Start

- **Read [`AGENT.md`](./AGENT.md)** — developer guide for the agent system
- **Read [`README.md`](./README.md)** — understand the full system
- **Check the [roster](./README.md#5-complete-agent-roster)** — ensure your role doesn't already exist

## How to Add a New Agent

1. **Verify the gap** — no existing agent covers this role
2. **Create the file** — follow the format in `AGENT.md` section "How to Add a New Agent"
3. **Update `generate.py`** — add agent name to `CLASSIFICATION` dict with correct permission tier
4. **Regenerate** — `python3 native-agents/generate.py`
5. **Update `README.md`** — add to the appropriate roster table in Section 5
6. **Update `AGENT.md`** — update category counts if needed
7. **Validate** — `bash validate.sh`
8. **Commit** — separate commit per new agent

## How to Fix an Existing Agent

1. Edit the file following the same format
2. Update `generate.py` if name or classification changed
3. Regenerate native agents
4. Update README if name or purpose changed
5. Validate

## Format Rules

Every agent file MUST have:
- Title with em dash: `# Name — Subtitle`
- Role blockquote with Role, Archetype, Tone
- Personality Matrix (4+ traits with Expression & Threshold)
- Anti-Patterns table (4+ rows with Pattern, Why, Action)
- Handoff Protocol table (3+ rows with To Agent, Artifact, Format)
- Closing quote

## Code Style

- Use em dashes (—) for title separators, not hyphens
- Tables use pipe syntax with aligned dashes
- Code blocks specify language
- Checkboxes use `- [ ]` / `- [x]`
- Files are Unix line endings (LF)
- No trailing whitespace

## Pull Request Process

1. Create a feature branch
2. Make your changes
3. Run `bash validate.sh` — all checks must pass
4. Run `python3 native-agents/generate.py` — no diff in native-agents/
5. Open a PR against `main`
6. Describe what you added/changed and why

## Reporting Issues

Open an issue at https://github.com/CrimsonDevil333333/agents-profiles/issues with:
- Description of the problem
- Which agent(s) are affected
- Suggested fix (if any)
