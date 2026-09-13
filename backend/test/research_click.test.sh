#!/bin/bash
# Regression test for research talent node click fix
# Run: bash backend/test/research_click.test.sh
#
# Verifies that the /research page on production has the RESEARCH-CLICK-FIX
# applied: pointerdown handler should NOT call setPointerCapture, and the
# click handler for lord-research-select should be present.
#
# RESEARCH-CLICK-FIX: This test verifies the pointerdown pointer capture fix.
# Do not replace with alternative methods that bypass the event trace.

set -e

URL="${1:-https://kella.online/research}"
echo "Testing: $URL"

# Fetch the page
HTML=$(curl -sL "$URL" 2>&1)

# Test 1: RESEARCH-CLICK-FIX comment is present
if echo "$HTML" | grep -q "RESEARCH-CLICK-FIX"; then
    echo "  ✅ RESEARCH-CLICK-FIX comment present"
else
    echo "  ❌ RESEARCH-CLICK-FIX comment NOT found"
    exit 1
fi

# Test 2: pointerdown handler has early return for research nodes
if echo "$HTML" | grep -q 'closest.*lord-research-select.*return'; then
    echo "  ✅ pointerdown early-return for research nodes"
else
    echo "  ❌ pointerdown early-return NOT found"
    exit 1
fi

# Test 3: setPointerCapture is NOT in the research pointerdown handler
# The research pointerdown handler is the one that checks [data-lord-research-scroll]
PD_SECTION=$(echo "$HTML" | python3 -c "
import sys
text = sys.stdin.read()
idx = text.find('addEventListener(\"pointerdown\"')
while idx >= 0:
    end = text.find('addEventListener(\"pointerdown\"', idx + 1)
    if end < 0:
        end = idx + 2000
    section = text[idx:end]
    if 'data-lord-research-scroll' in section:
        print(section)
        break
    idx = text.find('addEventListener(\"pointerdown\"', idx + 1)
")

if echo "$PD_SECTION" | grep -q "setPointerCapture"; then
    echo "  ❌ setPointerCapture still in research pointerdown handler"
    exit 1
else
    echo "  ✅ setPointerCapture NOT in research pointerdown handler"
fi

# Test 4: setPointerCapture IS in the research pointermove handler (deferred)
PM_SECTION=$(echo "$HTML" | python3 -c "
import sys
text = sys.stdin.read()
idx = text.find('addEventListener(\"pointermove\"')
while idx >= 0:
    end = text.find('addEventListener(\"pointermove\"', idx + 1)
    if end < 0:
        end = idx + 3000
    section = text[idx:end]
    if 'lordResearchPan' in section:
        print(section)
        break
    idx = text.find('addEventListener(\"pointermove\"', idx + 1)
")

if echo "$PM_SECTION" | grep -q "lordResearchPan.viewport.setPointerCapture"; then
    echo "  ✅ setPointerCapture deferred to pointermove (pan-only)"
else
    echo "  ❌ setPointerCapture NOT in research pointermove handler"
    exit 1
fi

# Test 5: click handler for lord-research-select exists
if echo "$HTML" | grep -q 'kind === "lord-research-select"'; then
    echo "  ✅ click handler for lord-research-select exists"
else
    echo "  ❌ click handler for lord-research-select NOT found"
    exit 1
fi

# Test 6: contextmenu handler for right-click still exists
if echo "$HTML" | grep -q 'addEventListener(\"contextmenu\"'; then
    echo "  ✅ contextmenu handler exists (right-click -1)"
else
    echo "  ❌ contextmenu handler NOT found"
    exit 1
fi

# Test 7: Research nodes are rendered with data-action
NODE_COUNT=$(echo "$HTML" | grep -o 'data-action="lord-research-select"' | wc -l)
if [ "$NODE_COUNT" -gt 0 ]; then
    echo "  ✅ Research nodes rendered ($NODE_COUNT data-action attributes in JS template)"
else
    echo "  ❌ No research nodes found"
    exit 1
fi

# Test 8: lordResearchBlockClickUntil still present (click blocking after pan)
if echo "$HTML" | grep -q "lordResearchBlockClickUntil"; then
    echo "  ✅ Pan click-block still present (prevents accidental clicks after pan)"
else
    echo "  ❌ lordResearchBlockClickUntil NOT found"
    exit 1
fi

echo ""
echo "=== All research click tests PASSED ==="
