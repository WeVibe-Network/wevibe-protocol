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

**One machine-readable contract + shared test vectors that pin every component to the same shapes.**

`wevibe-protocol` is a content-only contract repository: no running service, no executable logic. It is where independently built components — the Go hub, the JavaScript sim, the TypeScript dashboard, and Rust clients — agree on byte-level shapes, and where that agreement is checked. Status: **alpha**. The contract is the aspirational shared surface; where design intent outruns implementation, this file says so.

The pinning that actually works today is the shared golden test vectors, consumed by downstream parity checks in two languages. The OpenAPI spec and the generated bindings describe the surface; the vectors are what enforce it.

## What is here

| Path | Contents |
|---|---|
| `openapi.yaml` | Hub HTTP API contract — OpenAPI 3.1.0, "WeVibe Network Hub API" v0.3.0, dev server `http://localhost:4440`. 32 paths across Health, Organizations, Epochs, Members, Dashboard, Recovery, Moderation, Serves, Retrieval, Reports, Keywords, Billing. Three security schemes: `WeVibeSigned`, `BodySignature`, `HubSigned`. Models memory submission (`POST /v1/orgs/{orgID}/submit`), approval, and recall query/response (`POST /v1/orgs/{orgID}/query` incl. `ScoringBreakdown`). |
| `js/` | TypeScript bindings for the **chain protobuf** message surface (`wevibe/{attestation,bandwidth,emissions,identity,memory,org,reputation,serve}/v1/{params,query,state,tx}.ts`), generated from proto — not from OpenAPI. |
| `test_vectors/` | 7 golden protocol vectors: `epoch_key_derivation`, `fee_model_hash`, `hub_response_signing_v1`, `mnemonic_roundtrip`, `relay_envelope_v1`, `seal_open_envelope`, `shamir_roundtrip`. |
| `test-vectors/` | `recall-ranking-parity.json` — 10 golden ranking cases, schema `recall-ranking-parity/v1`. |
| `contract_test.sh` | 3-check **liveness smoke** against a running hub (health→ok, unknown org→error, submit-without-body→error). A smoke test, not a deep conformance pin. |
| `docs/` | PROTOCOL.md, TOPOLOGY.md, PDP.md, WHITEPAPER.md. |

## How the pinning actually works

**Cross-language ranking parity.** `test-vectors/recall-ranking-parity.json` is checked against *both* the Go hub ranker and the JS sim ranker (`make parity-check` in wevibe-meta). Same 10 inputs, same scores, in two independently written implementations — drift fails the parity check, not the user.

**Canonical signature shapes.** The canonical message shapes for signing live in the vectors, not the spec: `test_vectors/hub_response_signing_v1.json` and `test_vectors/relay_envelope_v1.json` define the byte-level digest format as a contract of truth. `relay_envelope_v1` is consumed directly by the dashboard's `canonical-body.ts`. Caveat: `hub_response_signing_v1` expected values are still placeholder strings.

**Auditable codegen seam.** `npm run regen` → `codegen/regen.sh` → Docker `bufbuild/buf:1.34.0` (pinned), generating into `js/`. Regen wipes only `js/wevibe/` and preserves the two hand-authored files — `js/index.ts` (re-exports) and `js/registry.ts` (CosmJS registry of Msg type URLs). This path is separate from the wevibe-meta `make proto-gen` umbrella, which emits Go `.pb.go` only.

## Known gaps — stated plainly

- The ts-proto remote plugin is **unpinned** in `buf.gen.yaml` (line 3) — the one deviation from this repo's pinning discipline.
- The generated `js/` bindings / npm package `@wevibe-network/protocol-js` (v0.1.0, `private: true`; dep `@bufbuild/protobuf ^2.2.0`, peer `@cosmjs/proto-signing ^0.32.0`) have **no in-workspace consumer today**. The vectors, not the bindings, are what downstream code currently consumes.
- The spec's `ApproveRequest` shape is **known-stale** vs the live hub, which carries `umbral_capsule`/`umbral_ciphertext` instead of `wrapped_dek_enc`.
- The spec does **not** model goal-sealed verification receipt fields; canonical signature message shapes live in the test vectors (see above).
- The `openapi.yaml` surface and the `js/` proto surface are disjoint — no client is generated from the OpenAPI spec.

## Regenerate the TypeScript bindings

```sh
npm run regen   # codegen/regen.sh → pinned bufbuild/buf:1.34.0 → js/
```

Regen wipes only `js/wevibe/`; `js/index.ts` and `js/registry.ts` survive. If you edit a generated file, the next regen deletes your edit — change the proto, then regen.

## Run the hub smoke test

```sh
bash contract_test.sh   # expects a hub at http://localhost:4440
```

## License

Apache-2.0. See [LICENSE](./LICENSE).

## Links

- Docs: https://github.com/WeVibe-Network/wevibe-docs
- Organization: https://github.com/WeVibe-Network
- X: https://x.com/WeVibe_Network
