#!/usr/bin/env bash
# Clears Next cache and starts dev (use when localhost shows 500 or blank after old experiments).
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"
echo "Removing .next and node_modules/.cache …"
rm -rf .next node_modules/.cache
echo "Starting http://localhost:3000"
exec npx next dev --turbopack -p 3000
