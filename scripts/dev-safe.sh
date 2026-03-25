#!/usr/bin/env bash
# Clears Next cache and starts dev (use when localhost shows 500 or blank after old experiments).
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"
echo "Removing .next and node_modules/.cache …"
rm -rf .next node_modules/.cache
echo "Starting http://127.0.0.1:3000 (webpack dev; IPv4 — avoids broken localhost/IPv6)"
echo "Tip: avoid Desktop+iCloud sync issues — Turbopack is not used by default."
exec npx next dev -H 127.0.0.1 -p 3000
