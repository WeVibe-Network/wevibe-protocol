# Test Vectors

TODO: populate before any community client is built.

Required vectors:
- [ ] blind_token_computation.json — keyword + search_key → token
- [ ] epoch_key_derivation.json — master_key + epoch → K_enc, K_search, K_audit
- [ ] seal_open_envelope.json — plaintext + pubkey → ciphertext, privkey → plaintext
- [ ] encrypt_decrypt_symmetric.json — plaintext + key → blob, key → plaintext
- [ ] submission_hash.json — ciphertext + wrapped_dek + metadata → hash
