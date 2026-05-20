# Echo Protocol PDP

## Repository Structure

- `openapi/` — source YAML files for REST/WebSocket APIs.
- `schemas/` — JSON Schema documents.
- `grpc/` — `.proto` files for gRPC services.
- `vectors/` — machine-readable fixtures.
- `scripts/` — tooling for validation and client generation.

## Tooling

- `npm run generate:ts` — generate TypeScript client via `openapi-typescript-codegen`.
- `npm run generate:rust` — generate Rust client using `oapi-codegen`.
- `npm run generate:python` — generate Python client with `datamodel-code-generator`.
- `npm run lint` — spectral linting + jsonschema validation.

## Validation Pipeline

1. Spectral rules enforce naming conventions, description coverage, and error model consistency.
2. `ajv` validates every example object against its schema.
3. `buf` builds and lints gRPC definitions.
4. Test vectors consumed by `wevibe-sdk` unit tests to ensure envelope compatibility.

## Change Management

- Every change requires updating `CHANGELOG.md` and bumping semver in `package.json`.
- Compatibility matrix maintained in `docs/compatibility.md`.
- Deprecated fields marked with `x-deprecated` (OpenAPI) and retained for at least one minor release.

## Distribution

- Published npm package contains generated TS client + schema bundle.
- Crates.io release exposes Rust types + client.
- PyPI package includes Pydantic models + REST client.
- Docker image (`ghcr.io/wevibe-network/protocol-docs`) renders Redoc for internal preview.

## Security

- No secrets stored; repository is specification only.
- CI ensures no executable code is published in generated clients (static analysis).

## Outstanding Items

- Add Postman collection generation.
- Formalize compatibility badge reporting for hub/dashboard versions.

## Sprint 24 Updates

- OpenAPI specs now include moderator vote (`POST /api/v1/orgs/{orgID}/moderation/{submissionHash}/vote`) and org config (`PATCH /api/v1/orgs/{orgID}/config`) endpoints.
- Report schemas gained status, escalation vote, and resolution fields powering the dashboard queue.
- Protocol vector set expanded to cover fee grant trial allowance envelopes and moderator approval transactions.
