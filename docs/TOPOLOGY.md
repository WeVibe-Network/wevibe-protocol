# Echo Protocol Topology

## Schema Relationships

```
openapi/wevibe-hub.yaml
   ├── schemas/memory.json
   ├── schemas/relationship.json
   └── schemas/contest.json

openapi/wevibe-dashboard.yaml
   ├── schemas/org.json
   ├── schemas/member.json
   ├── schemas/treasury.json
   └── reuses schemas/memory.json

grpc/memory.proto ──> wevibe-chain x/memory module adapter
grpc/serve.proto  ──> wevibe-chain x/serve module adapter
```

## Client Generation Flow

1. Run `npm install`.
2. Execute `npm run generate:*` tasks.
3. TypeScript client emitted to `dist/ts/`.
4. Rust client emitted to `dist/rust/`.
5. Python models emitted to `dist/python/`.
6. Redoc HTML produced in `dist/docs/`.

## Consum ers

- **wevibe-mcp** → uses TypeScript client for hub interactions.
- **wevibe-dashboard** → uses TypeScript + Rust bindings (Tauri shell) for direct API calls.
- **wevibe-hub** → uses Rust and Go clients for cross-service validation.
- **wevibe-chain integration tests** → consume JSON fixtures for lifecycle regression.

## Version Compatibility Matrix

| Protocol version | wevibe-chain | wevibe-mcp | wevibe-dashboard | wevibe-hub |
|------------------|-----------|----------|----------------|----------|
| 1.2.0 | ≥ v0.24 | ≥ v2.4 | ≥ v1.8 | ≥ v1.7 |
| 1.1.x | ≥ v0.23 | ≥ v2.3 | ≥ v1.7 | ≥ v1.6 |

## Deployment

- Docs published to internal portal via `npm run publish-docs` (uploads to S3/CloudFront).
- Generated clients released alongside source package tags.

## Observability

- Spectral lint output stored in CI logs.
- Buf lint + breaking-change reports archived per commit.

## Sprint 24 Notes

- Added hub moderation vote and org config endpoints to `openapi/wevibe-hub.yaml`, alongside expanded report schemas reflecting Accept / Deny / Report lifecycle.
- JSON fixtures now include quorum-related fields (`required_approvals`, vote counts) and fee grant allowance examples.
- Client generation flow produces updated types consumed by dashboard, hub, and plugin integrations.
