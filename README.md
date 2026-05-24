# wevibe-protocol

Cross-cutting protocol contracts for WeVibe Network.

- `openapi.yaml` - Hub HTTP API contract
- `test_vectors/` - Protocol-level test fixtures (consumed by sdk,
  hub, dashboard, mcp)
- `contract_test.sh` - Contract conformance harness
- `docs/PROTOCOL.md` - Protocol overview
- `js/` - `@wevibe-network/protocol-js` TypeScript bindings for
  WeVibe chain messages (generated from `wevibe-chain/proto/`).

This repository is read by:
- `wevibe-sdk` (Rust crypto verification against test vectors)
- `wevibe-mcp` (TypeScript client conformance)
- `wevibe-server` (Go hub server-side conformance; dashboard TS
  consumes `@wevibe-network/protocol-js` from this directory)

## JS/TS Bindings Package

This directory publishes `@wevibe-network/protocol-js` — TypeScript
bindings for WeVibe chain message types, generated from
`wevibe-chain/proto/` via `bufbuild/buf` and `ts-proto`.

### Regenerating

```sh
bash codegen/regen.sh   # or: npm run regen
```

Generated output lands in `js/`. Re-run whenever the chain protos
change. The pinned generator image is `bufbuild/buf:1.34.0`
(D-S29-PROTO-BUF-IMG).

### Consuming

From `wevibe-server/wevibe-dashboard` (and future consumers):

```json
"dependencies": {
  "@wevibe-network/protocol-js": "file:../../wevibe-protocol"
}
```

Imports — namespaced module access (recommended, disambiguates the
per-module `MsgUpdateParams` types):

```ts
import { memoryV1, orgV1, wevibeMessageRegistryEntries }
  from '@wevibe-network/protocol-js';

const msg = memoryV1.MsgSubmitCommitment.fromPartial({ /* fields */ });
```

Or flat imports of the non-colliding message types:

```ts
import { MsgSubmitCommitment, MsgRegisterOrg }
  from '@wevibe-network/protocol-js';
```

### CosmJS Registry integration

```ts
import { Registry } from '@cosmjs/proto-signing';
import { defaultRegistryTypes } from '@cosmjs/stargate';
import { wevibeMessageRegistryEntries } from '@wevibe-network/protocol-js';

const registry = new Registry([
  ...defaultRegistryTypes,
  ...wevibeMessageRegistryEntries,
]);
```

### Contents

- `js/wevibe/<module>/v1/tx.ts` — generated message types
  (do not hand-edit)
- `js/index.ts` — hand-authored entry point that re-exports every
  module's `tx.ts` under a namespace alias (e.g. `memoryV1`)
  plus the non-conflicting message types flat at the root
- `js/registry.ts` — hand-authored CosmJS Registry helper that
  maps every WeVibe Msg type URL to its generated codec

### Versioning

The package is `"private": true` during pre-alpha; consumers use
local file path. Bumping the chain proto schema is a coordinated
change with the registry list. See `js/registry.ts` source comment.

## License

Apache-2.0. See LICENSE.

