<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:02100a,100:2fe07a&height=160&section=header&text=WeVibe%20Protocol&fontColor=54f59a&fontSize=42&fontAlignY=40&desc=Cross-component%20contracts%20and%20test%20vectors&descAlignY=64&descSize=16" alt="WeVibe Protocol" width="100%" />

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![OpenAPI](https://img.shields.io/badge/OpenAPI-6BA539?style=flat-square&logo=openapiinitiative&logoColor=white)
[![status-alpha](https://img.shields.io/badge/status-alpha-ffc266?style=flat-square)](https://github.com/WeVibe-Network)
[![license-Apache--2.0](https://img.shields.io/badge/license-Apache--2.0-82aaff?style=flat-square)](LICENSE)
[![docs-wevibe-docs](https://img.shields.io/badge/docs-wevibe--docs-54f59a?style=flat-square)](https://github.com/WeVibe-Network/wevibe-docs)
[![%40WeVibe__Network](https://img.shields.io/badge/%40WeVibe__Network-0a0a0a?style=flat-square&logo=x&logoColor=white)](https://x.com/WeVibe_Network)

</div>

---

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
