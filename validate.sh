#!/usr/bin/env bash
set -euo pipefail

# validate.sh — Audit the agent repository for consistency and completeness

echo "=== Agent Repository Validation ==="
echo ""

# 1. Count agent files vs README links
echo "--- File Counts ---"
# Count only agent files in category directories (not root docs)
agent_files=$(find . -mindepth 2 -name '*.md' ! -path './node_modules/*' ! -path './.git/*' ! -path './native-agents/*' 2>/dev/null | wc -l)
echo "Source agent files: $agent_files"
echo "README links: $(grep -oP '\([^()]+\.md\)' README.md | sed 's/[()]//g' | sort -u | wc -l)"
echo ""

# 2. Broken link check
echo "--- Broken Links ---"
broken=0
while read -r f; do
  [ ! -f "$f" ] && echo "  BROKEN: $f" && broken=$((broken + 1))
done < <(grep -oP '\([^()]+\.md\)' README.md | sed 's/[()]//g' | sort -u)
[ "$broken" -eq 0 ] && echo "  All README links resolve ✓"
echo ""

# 3. Check all agents have Handoff Protocol
echo "--- Missing Handoff Protocol ---"
missing=0
while read -r f; do
  if ! grep -q 'Handoff Protocol' "$f"; then
    echo "  MISSING: $f"
    missing=$((missing + 1))
  fi
done < <(find . -name '*.md' ! -path './README.md' ! -path './node_modules/*' ! -path './.git/*' ! -path './native-agents/*')
[ "$missing" -eq 0 ] && echo "  All agents have Handoff Protocol ✓"
echo ""

# 4. Check all agents have Anti-Patterns table
echo "--- Missing Anti-Patterns ---"
missing_ap=0
while read -r f; do
  if ! grep -q 'Anti-Patterns' "$f"; then
    echo "  MISSING: $f"
    missing_ap=$((missing_ap + 1))
  fi
done < <(find . -name '*.md' ! -path './README.md' ! -path './node_modules/*' ! -path './.git/*' ! -path './native-agents/*')
[ "$missing_ap" -eq 0 ] && echo "  All agents have Anti-Patterns ✓"
echo ""

# 5. Check all agents have Personality Matrix
echo "--- Missing Personality Matrix ---"
missing_pm=0
while read -r f; do
  if ! grep -q 'Personality Matrix' "$f"; then
    echo "  MISSING: $f"
    missing_pm=$((missing_pm + 1))
  fi
done < <(find . -name '*.md' ! -path './README.md' ! -path './node_modules/*' ! -path './.git/*' ! -path './native-agents/*')
[ "$missing_pm" -eq 0 ] && echo "  All agents have Personality Matrix ✓"
echo ""

# 6. Check for duplicate slugs in native agents
echo "--- Duplicate Slug Check ---"
for platform in opencode claude copilot; do
  dir="native-agents/$platform"
  if [ -d "$dir" ]; then
    duplicates=$(ls "$dir" 2>/dev/null | sed 's/\.[^.]*$//' | sort | uniq -d)
    if [ -n "$duplicates" ]; then
      echo "  DUPLICATES in $platform:"
      echo "$duplicates" | while read d; do echo "    $d"; done
    else
      echo "  No duplicate slugs in $platform ✓"
    fi
  fi
done
echo ""

# 7. Verify sligify produces valid filenames (no leading dashes)
echo "--- Slug Validation ---"
bad_slugs=0
python3 -c "
import re
import os

def slugify(name):
    s = name.lower()
    s = s.replace('.net', 'dotnet')
    return s.replace(' ', '-').replace('/', '-').replace('.', '-').replace('&', 'and')

for root, dirs, files in os.walk('.'):
    for f in files:
        if f.endswith('.md') and not root.startswith('./.git') and not root.startswith('./native-agents') and not root.startswith('./node_modules') and root != '.':
            fpath = os.path.join(root, f)
            with open(fpath) as fh:
                content = fh.read()
            m = re.search(r'^# (.+?) — ', content)
            if m:
                name = m.group(1).strip()
                slug = slugify(name)
                if slug.startswith('-'):
                    print(f'  BAD SLUG: {name} -> {slug} in {fpath}')
" 2>/dev/null || true
echo ""

# 8. Native agent count
echo "--- Native Agent Counts ---"
for platform in opencode claude copilot; do
  dir="native-agents/$platform"
  if [ -d "$dir" ]; then
    ext=".agent.md"
    [ "$platform" != "copilot" ] && ext=".md"
    count=$(ls "$dir/"*"$ext" 2>/dev/null | wc -l)
    echo "  $platform: $count files"
  fi
done
echo ""

# 9. Verify README metadata matches actual count
echo "--- README Metadata ---"
readme_count=$(grep -oP 'total_agents: \K\d+' README.md)
source_count=$(find . -mindepth 2 -name '*.md' ! -path './node_modules/*' ! -path './.git/*' ! -path './native-agents/*' 2>/dev/null | wc -l)
echo "  README claims: $readme_count agents"
echo "  Actual source: $source_count agents"
[ "$readme_count" -eq "$source_count" ] && echo "  Match ✓" || echo "  MISMATCH ✗"
echo ""

echo "=== Validation Complete ==="
