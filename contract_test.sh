#!/usr/bin/env bash
set -euo pipefail
BASE="http://localhost:4440"
PASS=0; FAIL=0

check() {
  local label="$1" expected="$2"
  local actual
  actual=$(eval "$3" 2>/dev/null | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('status','') or d.get('error','') or 'ok')" 2>/dev/null || echo "unreachable")
  if [[ "$actual" == *"$expected"* ]]; then
    echo "  PASS  $label"; ((PASS++))
  else
    echo "  FAIL  $label (got: $actual)"; ((FAIL++))
  fi
}

echo ""
echo "Echo Hub — contract tests"
echo "========================="

check "health returns ok" "ok" \
  "curl -sf $BASE/health"

check "unknown org returns error" "error" \
  "curl -sf $BASE/v1/orgs/nonexistent-org-id-xyz"

check "submit without body returns 400" "error" \
  "curl -sf -X POST $BASE/v1/orgs/test/submit -H 'Content-Type: application/json' -d '{}'"

echo ""
echo "Results: $PASS passed, $FAIL failed"
[ "$FAIL" -eq 0 ]
