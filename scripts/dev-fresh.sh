#!/usr/bin/env bash
# Same as npm run dev:fresh — kept for manual runs / CI.
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"
exec npm run dev:fresh
