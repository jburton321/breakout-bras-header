#!/usr/bin/env bash
# Dev server on all interfaces — use from phones/tablets on same Wi‑Fi.
# Default: webpack dev (avoids iCloud/Desktop sync issues with Turbopack + .next churn).
# Opt in to Turbopack: USE_TURBOPACK=1 bash scripts/dev-lan.sh
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"
LAN_IP="$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || true)"
if [ -n "${USE_TURBOPACK:-}" ]; then
  echo "Next dev (Turbopack) — listening on 0.0.0.0:3000"
else
  echo "Next dev (webpack) — listening on 0.0.0.0:3000"
fi
echo "  This machine: http://127.0.0.1:3000"
if [ -n "${LAN_IP}" ]; then
  echo "  LAN devices:  http://${LAN_IP}:3000"
else
  echo "  LAN devices:  http://<this-Mac-ip>:3000  (run: ipconfig getifaddr en0)"
fi
if [ -n "${USE_TURBOPACK:-}" ]; then
  exec npx next dev --turbopack -H 0.0.0.0 -p 3000
fi
exec npx next dev -H 0.0.0.0 -p 3000
