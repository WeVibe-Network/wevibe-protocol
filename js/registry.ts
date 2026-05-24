// Hand-authored CosmJS Registry helper.
//
// Maps every WeVibe chain Msg type URL to its generated codec, suitable for
// passing into a CosmJS Registry alongside @cosmjs/stargate's
// defaultRegistryTypes.
//
// IMPORTANT: This list is the source of truth for the TypeScript-side
// surface of WeVibe Msg types. It is a SUPERSET of the hub relay
// allowlist (CO-011a.4 will introduce
// wevibe-server/wevibe-hub/internal/relay/validator.go
// AllowedInnerMsgTypeURLs). The relay accepts only the user-callable
// subset; governance-driven types like MsgUpdateParams are present here
// for future governance UIs but should NOT be in the relay allowlist.
//
// To add a new Msg type:
//   1. Add the proto definition to wevibe-chain/proto/wevibe/<module>/v1/tx.proto
//   2. Regenerate bindings: bash wevibe-protocol/codegen/regen.sh
//   3. Add an entry below mapping the type URL to the generated message class
//   4. (Optional, only if user-callable) Add the same type URL to the hub
//      relay allowlist.
//
// Per-module namespace imports disambiguate the 7 colliding MsgUpdateParams
// classes (one per module).

import type { GeneratedType } from '@cosmjs/proto-signing';

import * as attestationV1 from './wevibe/attestation/v1/tx';
import * as bandwidthV1 from './wevibe/bandwidth/v1/tx';
import * as emissionsV1 from './wevibe/emissions/v1/tx';
import * as memoryV1 from './wevibe/memory/v1/tx';
import * as orgV1 from './wevibe/org/v1/tx';
import * as reputationV1 from './wevibe/reputation/v1/tx';
import * as serveV1 from './wevibe/serve/v1/tx';

export const wevibeMessageRegistryEntries: ReadonlyArray<[string, GeneratedType]> = [
  // Memory
  ['/wevibe.memory.v1.MsgSubmitCommitment',     memoryV1.MsgSubmitCommitment     as unknown as GeneratedType],
  ['/wevibe.memory.v1.MsgApproveMemory',        memoryV1.MsgApproveMemory        as unknown as GeneratedType],
  ['/wevibe.memory.v1.MsgUpdateParams',         memoryV1.MsgUpdateParams         as unknown as GeneratedType],
  ['/wevibe.memory.v1.MsgReportMemory',         memoryV1.MsgReportMemory         as unknown as GeneratedType],

  // Org
  ['/wevibe.org.v1.MsgRegisterOrg',             orgV1.MsgRegisterOrg             as unknown as GeneratedType],
  ['/wevibe.org.v1.MsgUpdateMemberRole',        orgV1.MsgUpdateMemberRole        as unknown as GeneratedType],
  ['/wevibe.org.v1.MsgRotateEpoch',             orgV1.MsgRotateEpoch             as unknown as GeneratedType],
  ['/wevibe.org.v1.MsgTransferLeadership',      orgV1.MsgTransferLeadership      as unknown as GeneratedType],
  ['/wevibe.org.v1.MsgCloseOrg',                orgV1.MsgCloseOrg                as unknown as GeneratedType],
  ['/wevibe.org.v1.MsgAddMember',               orgV1.MsgAddMember               as unknown as GeneratedType],
  ['/wevibe.org.v1.MsgRemoveMember',            orgV1.MsgRemoveMember            as unknown as GeneratedType],
  ['/wevibe.org.v1.MsgUpdateParams',            orgV1.MsgUpdateParams            as unknown as GeneratedType],
  ['/wevibe.org.v1.MsgFundTreasury',            orgV1.MsgFundTreasury            as unknown as GeneratedType],
  ['/wevibe.org.v1.MsgWithdrawTreasury',        orgV1.MsgWithdrawTreasury        as unknown as GeneratedType],
  ['/wevibe.org.v1.MsgSetRepTiers',             orgV1.MsgSetRepTiers             as unknown as GeneratedType],
  ['/wevibe.org.v1.MsgSetOrgConfig',            orgV1.MsgSetOrgConfig            as unknown as GeneratedType],
  ['/wevibe.org.v1.MsgGrantTrialAllowance',     orgV1.MsgGrantTrialAllowance     as unknown as GeneratedType],

  // Serve
  ['/wevibe.serve.v1.MsgSubmitServeBatch',      serveV1.MsgSubmitServeBatch      as unknown as GeneratedType],
  ['/wevibe.serve.v1.MsgSubmitDenialBatch',     serveV1.MsgSubmitDenialBatch     as unknown as GeneratedType],
  ['/wevibe.serve.v1.MsgUpdateParams',          serveV1.MsgUpdateParams          as unknown as GeneratedType],

  // Reputation
  ['/wevibe.reputation.v1.MsgUpdateReputation',      reputationV1.MsgUpdateReputation      as unknown as GeneratedType],
  ['/wevibe.reputation.v1.MsgIncrementContribution', reputationV1.MsgIncrementContribution as unknown as GeneratedType],
  ['/wevibe.reputation.v1.MsgIncrementServe',        reputationV1.MsgIncrementServe        as unknown as GeneratedType],
  ['/wevibe.reputation.v1.MsgRecordBan',             reputationV1.MsgRecordBan             as unknown as GeneratedType],
  ['/wevibe.reputation.v1.MsgUpdateParams',          reputationV1.MsgUpdateParams          as unknown as GeneratedType],

  // Bandwidth
  ['/wevibe.bandwidth.v1.MsgSetBandwidthOverride',   bandwidthV1.MsgSetBandwidthOverride   as unknown as GeneratedType],
  ['/wevibe.bandwidth.v1.MsgUpdateParams',           bandwidthV1.MsgUpdateParams           as unknown as GeneratedType],

  // Attestation
  ['/wevibe.attestation.v1.MsgSubmitSessionAttestation', attestationV1.MsgSubmitSessionAttestation as unknown as GeneratedType],
  ['/wevibe.attestation.v1.MsgUpdateParams',             attestationV1.MsgUpdateParams             as unknown as GeneratedType],

  // Emissions
  ['/wevibe.emissions.v1.MsgMintDailyEmission',        emissionsV1.MsgMintDailyEmission         as unknown as GeneratedType],
  ['/wevibe.emissions.v1.MsgDistributeOperatorRewards', emissionsV1.MsgDistributeOperatorRewards as unknown as GeneratedType],
  ['/wevibe.emissions.v1.MsgUpdateParams',             emissionsV1.MsgUpdateParams              as unknown as GeneratedType],
];
