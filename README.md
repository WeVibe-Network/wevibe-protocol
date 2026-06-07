# WeVibe Protocol

**Cross-component contract definitions and conformance artifacts for the WeVibe Network.**

## Overview

`wevibe-protocol` is the shared contract repository used across independently built components.

It currently includes:
- `openapi.yaml` — Hub HTTP API contract
- `test_vectors/` — protocol-level vectors consumed by SDK, hub, dashboard, and MCP clients
- `contract_test.sh` — contract-conformance harness for a running hub
- `docs/PROTOCOL.md` — protocol specification overview
- `js/` — generated TypeScript bindings published as `@wevibe-network/protocol-js`

Status: **alpha**. Core contracts, vectors, and conformance checks exist today. Hub response-signing rollout across deployments is a near-term milestone.

## Role in the WeVibe Network

This repository exists so self-hosted hubs, clients, and forks can conform to one verifiable interface and one signature-verification path.

In particular, the hub-response signature contract is specified here (see `openapi.yaml` and `test_vectors/hub_response_signing_v1.json`), with response verification tied to org key material resolved from chain serving metadata.

## Getting started (build/run)

### Regenerate TypeScript bindings

The `@wevibe-network/protocol-js` package is generated via `buf` + `ts-proto`.

```sh
npm run regen
# or
bash codegen/regen.sh
```

### Run the conformance harness against a hub

```sh
bash contract_test.sh
```

## Testing

- `bash contract_test.sh` runs the contract smoke checks against a running hub.
- `test_vectors/` contains deterministic protocol fixtures for cross-client compatibility verification.

## Configuration (environment and ports)

- The OpenAPI development server target is `http://localhost:4440`.
- `contract_test.sh` uses the same hub base URL (`BASE="http://localhost:4440"`).

## Roadmap

See [ROADMAP.md](./ROADMAP.md).

## License

Apache-2.0. See [LICENSE](./LICENSE).

## Links

- Docs: https://github.com/WeVibe-Network/wevibe-docs
- Organization: https://github.com/WeVibe-Network
- X: https://x.com/WeVibe_Network
