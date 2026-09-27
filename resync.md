# Resync — Audit & Fix Stale Agent Files

> **🚀 ONE COMMAND — Give this to any AI:**
> ```
> Fetch and read https://raw.githubusercontent.com/CrimsonDevil333333/agents-profiles/refs/heads/main/resync.md
> Then execute the resync for my project at <path>
> ```

> **Run this against any project that previously used this agent system.**
> It detects and fixes: stub agent files, wrong permissions, missing agents, stale configs.
>
> **Zero cloning required.** Everything is fetched from the public repo via raw URLs.

---

## 1. Detect Target Project

- The **current working directory** is the target project.
- Confirm it exists: `pwd`
- Check for platform agent directories (at least one should exist):
  - `.opencode/agents/` — OpenCode
  - `.claude/agents/` — Claude Code
  - `.github/agents/` — GitHub Copilot

Set `TARGET_DIR` to the current working directory.

---

## 2. Platform Detection

Detect which platforms are in use:

```bash
TARGET_DIR=$(pwd)
RAW_BASE="https://raw.githubusercontent.com/CrimsonDevil333333/agents-profiles/main"

for platform in "opencode" "claude" "copilot"; do
  case "$platform" in
    opencode) dir="$TARGET_DIR/.opencode/agents";;
    claude)   dir="$TARGET_DIR/.claude/agents";;
    copilot)  dir="$TARGET_DIR/.github/agents";;
  esac

  if [ -d "$dir" ]; then
    echo "Platform: $platform → $dir"
  fi
done
```

---

## 3. Scan & Fix Agent Files

For each platform detected, scan every existing file. If it's a stub or has wrong permissions, fetch the correct version from the public repo and overwrite.

### 3a. OpenCode — `.opencode/agents/`

```bash
dir="$TARGET_DIR/.opencode/agents"

if [ -d "$dir" ]; then
  echo "--- OpenCode agents ---"
  for f in "$dir"/*.md; do
    [ ! -f "$f" ] && continue
    slug=$(basename "$f")

    if grep -q "Fulfill the role as defined in the full profile" "$f" 2>/dev/null; then
      echo "  STUB: $slug → fetching fresh copy"
      curl -sSL "$RAW_BASE/native-agents/opencode/$slug" -o "$f"
    else
      # Check permission correctness by comparing edit field
      local_perm=$(grep -oP '(?<=edit: )(allow|deny)' "$f" | head -1)
      remote=$(curl -sSL "$RAW_BASE/native-agents/opencode/$slug")
      remote_perm=$(echo "$remote" | grep -oP '(?<=edit: )(allow|deny)' | head -1)

      if [ -n "$remote_perm" ] && [ "$local_perm" != "$remote_perm" ]; then
        echo "  WRONG PERMS: $slug (local=$local_perm, remote=$remote_perm) → replacing"
        echo "$remote" > "$f"
      fi
    fi
  done
fi
```

### 3b. Claude Code — `.claude/agents/`

```bash
dir="$TARGET_DIR/.claude/agents"

if [ -d "$dir" ]; then
  echo "--- Claude Code agents ---"
  for f in "$dir"/*.md; do
    [ ! -f "$f" ] && continue
    slug=$(basename "$f")

    if grep -q "Fulfill the role as defined in the full profile" "$f" 2>/dev/null; then
      echo "  STUB: $slug → fetching fresh copy"
      curl -sSL "$RAW_BASE/native-agents/claude/$slug" -o "$f"
    fi
  done
fi
```

### 3c. GitHub Copilot — `.github/agents/`

```bash
dir="$TARGET_DIR/.github/agents"

if [ -d "$dir" ]; then
  echo "--- Copilot agents ---"
  for f in "$dir"/*.agent.md; do
    [ ! -f "$f" ] && continue
    slug=$(basename "$f")

    if grep -q "Fulfill the role as defined in the full profile" "$f" 2>/dev/null; then
      echo "  STUB: $slug → fetching fresh copy"
      curl -sSL "$RAW_BASE/native-agents/copilot/$slug" -o "$f"
    fi
  done
fi
```

---

## 4. Check & Fix Config Files

| File | Path | Stale check | Fix action |
|------|------|-------------|------------|
| `AGENTS.md` | `$TARGET_DIR/AGENTS.md` | Contains "standalone session init protocol" | `curl -sSL $RAW_BASE/INIT.md -o $TARGET_DIR/AGENTS.md` |
| `CLAUDE.md` | `$TARGET_DIR/CLAUDE.md` | Contains "standalone session init protocol" | `curl -sSL $RAW_BASE/INIT.md -o $TARGET_DIR/CLAUDE.md` |
| `.github/copilot-instructions.md` | `$TARGET_DIR/.github/copilot-instructions.md` | Contains "standalone session init protocol" | `curl -sSL $RAW_BASE/INIT.md -o $TARGET_DIR/.github/copilot-instructions.md` |
| `.cursorrules` | `$TARGET_DIR/.cursorrules` | Contains "standalone session init protocol" | `curl -sSL $RAW_BASE/INIT.md -o $TARGET_DIR/.cursorrules` |

```bash
for config_pair in \
  "AGENTS.md|INIT.md" \
  "CLAUDE.md|INIT.md" \
  ".github/copilot-instructions.md|INIT.md" \
  ".cursorrules|INIT.md"; do

  config_file="$TARGET_DIR/$(echo "$config_pair" | cut -d'|' -f1)"
  source_file="$(echo "$config_pair" | cut -d'|' -f2)"

  if [ -f "$config_file" ] && grep -q "standalone session init protocol" "$config_file" 2>/dev/null; then
    echo "  STALE: $(basename "$config_file") → refreshing"
    curl -sSL "$RAW_BASE/$source_file" -o "$config_file"
  fi
done
```

---

## 5. Quick Verification

```bash
echo ""
echo "=== Verification ==="

stubs=0
for dir in ".opencode/agents" ".claude/agents" ".github/agents"; do
  full="$TARGET_DIR/$dir"
  if [ -d "$full" ]; then
    count=$(grep -rl "Fulfill the role as defined in the full profile" "$full" 2>/dev/null | wc -l)
    stubs=$((stubs + count))
  fi
done

echo "Remaining stubs: $stubs"

if [ "$stubs" = "0" ]; then
  echo "✓ All agents are production-ready — no stubs remain."
else
  echo "✗ $stubs file(s) still need attention."
fi
```

---

## 6. Summary

Report to the user:
- Which platforms were found and scanned
- How many stub files were replaced with full profiles
- How many files had wrong permissions fixed
- How many config files were refreshed
- Zero remaining stubs (confirm)
