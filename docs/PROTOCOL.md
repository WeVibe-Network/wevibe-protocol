# WeVibe Network Protocol Specification

This directory is the canonical specification for the WeVibe Network protocol.
Any client that correctly implements this spec can participate in the network.

## Contents

- `schema.md` — MemoryPack schema and field definitions
- `openapi.yaml` — OpenAPI 3.1 spec for the optional Echo analytics API (formerly "Hub")
- `crypto.md` — Key derivation, envelope format, blind token computation
- `test_vectors/` — Known-input/known-output cases for all crypto operations
- `contract_test.sh` — Smoke tests validating the spec against the running Hub

## API Specification

`openapi.yaml` — OpenAPI 3.1 specification for the optional Echo analytics API.

Key security properties documented in the spec:
- All memory content is encrypted client-side before any analytics surface receives it
- The analytics service stores ciphertext only (`blob_cid` column) and never decrypts
- Every mutating request requires an Ed25519 signature over the request body
- Submission hashes are verified: SHA-256(ciphertext_bytes || wrapped_dek_bytes)

## Test vectors

Before any client ships, it must pass all test vectors in `test_vectors/`.
The test vectors are the ground truth for protocol compatibility.
