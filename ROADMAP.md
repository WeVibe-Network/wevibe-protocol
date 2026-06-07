# WeVibe Protocol Roadmap

## Status

- Alpha contract repository for cross-component compatibility.
- OpenAPI hub contract (`openapi.yaml`) is in place and actively used.
- Protocol test vectors and a contract-conformance harness (`contract_test.sh`) are available.
- Generated TypeScript bindings (`@wevibe-network/protocol-js`) are produced from chain protobuf definitions via `buf` + `ts-proto`.

## Near-term

- Publish and finalize the hub-response signature contract for self-hostable hubs.
- Tighten conformance guidance for signature verification against org key data resolved from chain serving metadata.

## Mainnet

- Add and stabilize the chain-resolved endpoint / org-directory query contract so clients can resolve hub endpoints and verification metadata through a single public contract path.

## Future

- Define a minimum skill-package contract if federation progresses.

## Design references

- WeVibe documentation: https://github.com/WeVibe-Network/wevibe-docs
- Protocol overview in this repo: [docs/PROTOCOL.md](./docs/PROTOCOL.md)
