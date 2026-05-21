# WeVibe Protocol Whitepaper

Version: 1.0 · Sprint 24

## Overview

The protocol package defines the canonical wire formats shared by wevibe-chain clients, hub, dashboard, and operational tooling. It houses OpenAPI schemas, JSON test vectors, and gRPC service definitions that ensure deterministic interoperability across languages.

## Objectives

1. **Single source of truth** — specifications live alongside generated clients.
2. **Backward compatibility** — semantic versioning and explicit deprecation windows.
3. **Testability** — fixtures validate that SDKs and services conform to spec.

## Contents

- `openapi/wevibe-hub.yaml` — REST + WebSocket endpoints for hub consumers.
- `openapi/wevibe-dashboard.yaml` — administrative APIs for dashboard.
- `schemas/memory.json` — memory payload + lifecycle metadata.
- `schemas/relationship.json` — relationship edges, including effect semantics.
- `schemas/contest.json` — contest submission and resolution payloads.
- `grpc/serve.proto`, `grpc/memory.proto` — gRPC services shared between hub and chain adapters.
- `vectors/` — JSON fixtures verifying encryption envelopes, serve attestations, and contest life cycles.

## Versioning Strategy

- Semantic version tags (MAJOR.MINOR.PATCH).
- Breaking changes require MAJOR bump and archived compatibility fixtures.
- MINOR updates add optional fields; default values maintain compatibility.
- PATCH releases fix typos or clarifications without schema changes.

## Governance

- Changes proposed via ADR-style RFCs.
- Schema review board: client lead, hub lead, chain lead.
- Automated CI (`scripts/validate-schemas.sh`) ensures schemas compile and examples pass.

## Distribution

- Generated clients published to:
  - TypeScript (`@wevibe-network/api-client`)
  - Rust (`wevibe-protocol` crate)
  - Python (`wevibe_protocol` wheel)
- Docs rendered via Redoc and published to internal doc site.

## Future Work

- GraphQL schema for real-time moderation dashboards.
- JSON-LD annotations for memory provenance sharing with third-party ecosystems.

## Sprint 24 Updates

- Added hub endpoints for moderator vote casting (`POST /api/v1/orgs/{orgID}/moderation/{submissionHash}/vote`) and org configuration updates (`PATCH /api/v1/orgs/{orgID}/config`).
- Documented report lifecycle payloads that integrate the new Accept / Deny / Report flows originating from the OpenCode plugin.
- Refreshed examples covering the fee grant trial allowance path and moderator approval transactions following hub quorum enforcement.
