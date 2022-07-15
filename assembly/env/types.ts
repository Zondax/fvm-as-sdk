import { u128 } from "as-bignum/assembly";

export type BlockId = u32;
export type ActorID = u64
export type MethodNum = u64
export type Codec = u64
export type ChainEpoch = i64
export type TokenAmount = u128

export class Send {
    constructor(
        public exit_code: u32,
        public return_id: BlockId,
        public return_codec: u64,
        public return_size: u32,
    ){}
}

export class IpldOpen {
    constructor(
        public Id: u32,
        public Codec: Codec,
        public Size: u32
    ) {}
}

export class IpldStat {
    constructor(
        public Codec: Codec,
        public Size: u32
    ) {}
}

export class Cid {
    constructor(public value: string, public raw: Uint8Array, public len: u32) {}
}

export class InvocationContext {
    constructor(public value_received: TokenAmount, public caller: ActorID, public receiver: ActorID, public method_number: MethodNum,
                public network_curr_epoch: ChainEpoch, public network_version: u32) {}
}

export class ParamsRawResult {
    constructor (public c: Codec, public raw: Uint8Array) {}
}