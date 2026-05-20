# wevibe-protocol

Cross-cutting protocol contracts for WeVibe Network.

- `openapi.yaml` - Hub HTTP API contract
- `test_vectors/` - Protocol-level test fixtures (consumed by sdk,
  hub, dashboard, mcp)
- `contract_test.sh` - Contract conformance harness
- `docs/PROTOCOL.md` - Protocol overview

This repository is read by:
- `wevibe-sdk` (Rust crypto verification against test vectors)
- `wevibe-mcp` (TypeScript client conformance)
- `wevibe-server` (Go hub server-side conformance)

## License

Apache-2.0. See LICENSE.
