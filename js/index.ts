// Hand-authored entry point for @wevibe-network/protocol-js.
//
// Two import surfaces are exposed:
//
//   1. NAMESPACED re-exports (recommended for full coverage). Use this when
//      you need a Msg type that collides across modules (e.g. MsgUpdateParams
//      exists in every module's tx.proto). Example:
//
//        import { memoryV1, orgV1 } from '@wevibe-network/protocol-js';
//        const msg = memoryV1.MsgSubmitCommitment.fromPartial({ ... });
//        const upd = memoryV1.MsgUpdateParams.fromPartial({ ... });
//
//   2. FLAT re-exports of the non-colliding Msg request types. Ergonomic for
//      common cases. Example:
//
//        import { MsgSubmitCommitment, MsgRegisterOrg }
//          from '@wevibe-network/protocol-js';
//
// The CosmJS Registry helper is exported below.

export * as attestationV1 from './wevibe/attestation/v1/tx';
export * as bandwidthV1 from './wevibe/bandwidth/v1/tx';
export * as emissionsV1 from './wevibe/emissions/v1/tx';
export * as memoryV1 from './wevibe/memory/v1/tx';
export * as orgV1 from './wevibe/org/v1/tx';
export * as reputationV1 from './wevibe/reputation/v1/tx';
export * as serveV1 from './wevibe/serve/v1/tx';

// Flat re-exports of non-colliding Msg request types.
// (MsgUpdateParams exists in every module; access it via the per-module
// namespace alias above.)

export {
  MsgSubmitCommitment,
  MsgApproveMemory,
  MsgRejectMemory,
  MsgPurgeExpired,
  MsgRelateMemories,
  MsgApproveRelationship,
  MsgSetValidityBounds,
  MsgArchiveMemory,
  MsgReportMemory,
} from './wevibe/memory/v1/tx';

export {
  MsgRegisterOrg,
  MsgAddMember,
  MsgRemoveMember,
  MsgFundTreasury,
  MsgWithdrawTreasury,
  MsgSetRepTiers,
  MsgSetOrgConfig,
  MsgGrantTrialAllowance,
} from './wevibe/org/v1/tx';

export {
  MsgSubmitServeBatch,
  MsgSubmitDenialBatch,
} from './wevibe/serve/v1/tx';

export {
  MsgUpdateReputation,
  MsgIncrementContribution,
  MsgIncrementServe,
  MsgRecordBan,
} from './wevibe/reputation/v1/tx';

export {
  MsgSetBandwidthOverride,
} from './wevibe/bandwidth/v1/tx';

export {
  MsgMintDailyEmission,
  MsgDistributeOperatorRewards,
} from './wevibe/emissions/v1/tx';

export {
  MsgSubmitSessionAttestation,
} from './wevibe/attestation/v1/tx';

// CosmJS Registry helper.
export { wevibeMessageRegistryEntries } from './registry';
