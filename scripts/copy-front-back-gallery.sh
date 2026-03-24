#!/usr/bin/env bash
# Copy 1-front … 7-front and 1-back … 7-back (any extension) into public/front-back-gallery/
# Usage: bash scripts/copy-front-back-gallery.sh
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEST="$ROOT/public/front-back-gallery"
SRC="${BREAKOUT_BRAS_DOWNLOADS:-$HOME/Downloads/Bras | Shop By Bra Size, Brands & Styles - Breakout Bras}"

mkdir -p "$DEST"

if [[ ! -d "$SRC" ]]; then
  echo "Source folder not found: $SRC"
  echo "Set BREAKOUT_BRAS_DOWNLOADS to the folder that contains 1-front, 1-back, …"
  exit 1
fi

for i in 1 2 3 4 5 6 7; do
  for side in front back; do
    found=""
    for f in "$SRC/${i}-${side}"*; do
      [[ -f "$f" ]] || continue
      found="$f"
      break
    done
    if [[ -n "$found" ]]; then
      ext="${found##*.}"
      [[ "$ext" == "$found" ]] && ext="jpg"
      cp -f "$found" "$DEST/${i}-${side}.${ext}"
      echo "OK ${i}-${side}.${ext}"
    else
      echo "Missing: ${i}-${side}"
    fi
  done
done

echo "Done. Files in $DEST"
