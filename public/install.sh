#!/bin/bash
set -e

# Track install
curl -sL "https://antiptrn.com/api/track" > /dev/null 2>&1 &

INSTALLED=0

echo ""
echo "Installing antiptrn..."
echo ""

# Claude Code
if [ -d "$HOME/.claude" ]; then
  mkdir -p "$HOME/.claude/commands"
  curl -sL https://antiptrn.com/antiptrn.md -o "$HOME/.claude/commands/antiptrn.md"
  echo "  ✓ Claude Code"
  INSTALLED=$((INSTALLED + 1))
fi

# Cursor
if [ -d "$HOME/.cursor" ]; then
  mkdir -p "$HOME/.cursor/rules"
  curl -sL https://antiptrn.com/antiptrn.md -o "$HOME/.cursor/rules/antiptrn.md"
  echo "  ✓ Cursor"
  INSTALLED=$((INSTALLED + 1))
fi

# OpenCode
if command -v opencode &> /dev/null || [ -d "$HOME/.config/opencode" ]; then
  mkdir -p "$HOME/.config/opencode/commands"
  curl -sL https://antiptrn.com/antiptrn.md -o "$HOME/.config/opencode/commands/antiptrn.md"
  echo "  ✓ OpenCode"
  INSTALLED=$((INSTALLED + 1))
fi

# Codex
if command -v codex &> /dev/null || [ -d "$HOME/.codex" ]; then
  mkdir -p "$HOME/.codex/commands"
  curl -sL https://antiptrn.com/antiptrn.md -o "$HOME/.codex/commands/antiptrn.md"
  echo "  ✓ Codex"
  INSTALLED=$((INSTALLED + 1))
fi

# Antigravity / Gemini CLI
if [ -d "$HOME/.gemini" ]; then
  mkdir -p "$HOME/.gemini/commands"
  curl -sL https://antiptrn.com/antiptrn.md -o "$HOME/.gemini/commands/antiptrn.md"
  echo "  ✓ Antigravity"
  INSTALLED=$((INSTALLED + 1))
fi

if [ $INSTALLED -eq 0 ]; then
  echo "No supported coding agents found."
  echo ""
  echo "Supported agents:"
  echo "  - Claude Code: https://claude.com/claude-code"
  echo "  - Cursor: https://cursor.sh"
  echo "  - OpenCode: https://opencode.dev"
  echo "  - Codex: https://github.com/openai/codex"
  echo "  - Antigravity: https://developers.google.com/gemini/gemini-cli"
  echo ""
  exit 1
fi

echo ""
echo "Done! Type /antiptrn in your editor to clean up AI-generated code."
echo ""
