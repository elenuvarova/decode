#!/bin/bash
# sf_svg_batch.sh — extract all Decode SF Symbols as true vector SVGs
# Run from Terminal: cd "path/to/decode" && bash docs/sf_svg_batch.sh
# Output: /tmp/sf-symbols-svg/<name>.svg (one file per symbol)

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
OUTDIR="/tmp/sf-symbols-svg"
mkdir -p "$OUTDIR"

SYMBOLS=(
  # Navigation
  "chevron.left"
  "chevron.right"
  "xmark.circle.fill"
  "arrow.clockwise"
  "arrow.uturn.backward"
  "square.and.arrow.up"
  "arrow.up.arrow.down"
  "camera.viewfinder"
  "camera.fill"
  "photo.on.rectangle"
  # Documents
  "doc.text.fill"
  "doc.text.magnifyingglass"
  "doc.on.doc"
  "doc.badge.plus"
  "text.magnifyingglass"
  "magnifyingglass"
  # Finance
  "sterlingsign.circle.fill"
  "sterlingsign.circle"
  "banknote"
  "creditcard.fill"
  "chart.line.uptrend.xyaxis"
  "chart.bar.fill"
  "percent"
  "tag.fill"
  # Vault
  "house.fill"
  "archivebox.fill"
  "bookmark.fill"
  "clock.arrow.circlepath"
  "trash.fill"
  # Alerts
  "bell.badge.fill"
  "bell.fill"
  "bell.slash"
  "exclamationmark.triangle.fill"
  "info.circle.fill"
  "checkmark.circle.fill"
  "clock.badge.exclamationmark"
  "calendar"
  # Security
  "lock.shield.fill"
  "faceid"
  "eye.fill"
  "eye.slash"
  "hand.raised.fill"
  # Settings
  "gear"
  "person.circle.fill"
  "envelope.fill"
  "rectangle.portrait.and.arrow.right"
  "square.and.pencil"
  "alarm.fill"
  "checkmark.seal.fill"
  "crown.fill"
  "star.fill"
  # AI
  "sparkles"
  "brain"
  "waveform"
  "antenna.radiowaves.left.and.right"
  "cpu"
  # Help
  "questionmark.circle.fill"
  "bubble.left.fill"
  "gift"
)

TOTAL=${#SYMBOLS[@]}
echo "Extracting $TOTAL symbols to $OUTDIR ..."
echo "Do not use the mouse or keyboard during extraction (~$((TOTAL * 8)) seconds)"
echo ""

OK=0
FAIL=0

for i in "${!SYMBOLS[@]}"; do
  sym="${SYMBOLS[$i]}"
  out="$OUTDIR/$sym.svg"
  printf "[%2d/%d] %-45s" "$((i+1))" "$TOTAL" "$sym"
  result=$(bash "$SCRIPT_DIR/sf_svg.sh" "$sym" 24 2>&1)
  if echo "$result" | grep -q "<svg"; then
    echo "$result" > "$out"
    echo "OK"
    OK=$((OK+1))
  else
    echo "FAIL: $result"
    FAIL=$((FAIL+1))
  fi
done

echo ""
echo "Done: $OK OK, $FAIL failed"
echo "Files in: $OUTDIR"
