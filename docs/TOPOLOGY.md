# WeVibe Protocol Topology

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

## Test Vectors

### `test_vectors/relay_envelope_v1.json`

Canonical-body test vectors for the WeVibe relay endpoint, per **Decision 2026-05-24-F**. This file is the spec of truth for the relay envelope canonical-body format. Any implementation of the relay client or server MUST validate against these vectors.

**Format:**

```json
{
  "version": "WV-RELAY-v1",
  "description": "<human-readable description>",
  "vectors": [
    {
      "name": "<vector name>",
      "inputs": {
        "org_id": "<value>",
        "wallet_address": "<value>",
        "tx_bytes_base64": "<value>"
      },
      "canonical_body": "<assembled body, with literal \\n between fields>",
      "canonical_body_sha256_hex": "<lowercase hex of sha256 over the UTF-8 bytes of canonical_body>"
    }
  ]
}
```

**Canonical body format (Decision F):**

```
WV-RELAY-v1\n
org_id:<value>\n
wallet_address:<value>\n
tx_bytes_base64:<value>\n
```

The `\n` sequences above are literal newline (0x0A) bytes in the encoded body. The SHA-256 is computed over the UTF-8 byte representation of the assembled string.

**Included vectors:**

| Name | Purpose |
|------|---------|
| `empty_fields` | All input fields empty — locks in header + separator behavior with no field values. |
| `ascii_typical` | Typical ASCII-only inputs — the common-path vector. |
| `unicode_org_label` | Non-ASCII org label — exists specifically to lock in UTF-8 byte-level behavior for unicode org identifiers. |

**Consumers:**

- `wevibe-hub/internal/relay/validator.go` — parses incoming relay bodies in this format and verifies the SHA-256 against the request envelope.
- `wevibe-dashboard/lib/canonical-body.ts` — builds outgoing relay bodies in this format prior to signing.

Both modules reference `test_vectors/relay_envelope_v1.json` as the authoritative specification. Changes to the canonical-body format require updating this file first, then aligning both consumers.

## Cross-Module Dependencies

- `wevibe-hub/internal/relay/validator.go` parses relay envelope bodies in the `WV-RELAY-v1` canonical format defined by `test_vectors/relay_envelope_v1.json`.
- `wevibe-dashboard/lib/canonical-body.ts` builds relay envelope bodies in the `WV-RELAY-v1` canonical format defined by `test_vectors/relay_envelope_v1.json`.

## Sprint 24 Notes

- Added hub moderation vote and org config endpoints to `openapi/wevibe-hub.yaml`, alongside expanded report schemas reflecting Accept / Deny / Report lifecycle.
- JSON fixtures now include quorum-related fields (`required_approvals`, vote counts) and fee grant allowance examples.
- Client generation flow produces updated types consumed by dashboard, hub, and plugin integrations.
