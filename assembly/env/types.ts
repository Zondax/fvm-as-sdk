export type ActorID = u64
export type Codec = u64

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
