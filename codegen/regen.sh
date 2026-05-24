#!/usr/bin/env bash
set -euo pipefail

# Regenerate WeVibe JS/TS message bindings from wevibe-chain/proto.
# Uses Docker-pinned buf per D-S29-PROTO-BUF-IMG.
#
# wevibe-chain/proto is itself a buf module (has buf.yaml + buf.lock).
# We invoke buf from inside that directory so deps resolve from its
# buf.lock, but use wevibe-protocol/buf.gen.yaml as the generation
# template. Output lands in wevibe-protocol/js/.

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
WEVIBE_PROTOCOL_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
WORKSPACE_ROOT="$(cd "$WEVIBE_PROTOCOL_DIR/.." && pwd)"
PROTO_SRC="$WORKSPACE_ROOT/wevibe-chain/proto"

if [ ! -d "$PROTO_SRC" ]; then
  echo "ERROR: proto source not found at $PROTO_SRC" >&2
  echo "Expected wevibe-chain to be a sibling of wevibe-protocol." >&2
  exit 1
fi

if [ ! -f "$PROTO_SRC/buf.yaml" ]; then
  echo "ERROR: $PROTO_SRC/buf.yaml missing — wevibe-chain proto tree" >&2
  echo "is not a buf module. Aborting." >&2
  exit 1
fi

cd "$WEVIBE_PROTOCOL_DIR"

# Clean prior generated output. Preserve hand-authored js/index.ts and
# js/registry.ts; delete the generated tree only.
if [ -d js/wevibe ]; then
  rm -rf js/wevibe
fi
mkdir -p js

# Run buf from inside wevibe-chain/proto so its buf.lock resolves the
# Cosmos SDK / cosmos-proto / gogo-proto / googleapis dependencies.
# Output goes to /workspace/wevibe-protocol/js (mounted same as input).
docker run --rm \
  -v "$WORKSPACE_ROOT":/workspace \
  -w /workspace/wevibe-chain/proto \
  bufbuild/buf:1.34.0 \
  generate --template /workspace/wevibe-protocol/buf.gen.yaml \
           --output /workspace/wevibe-protocol/js

echo "Bindings regenerated at $WEVIBE_PROTOCOL_DIR/js/"
find "$WEVIBE_PROTOCOL_DIR/js" -name '*.ts' -not -name 'index.ts' -not -name 'registry.ts' | wc -l \
  | xargs -I{} echo "Generated {} .ts files."
