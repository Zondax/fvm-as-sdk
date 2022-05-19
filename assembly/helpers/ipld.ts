
/// Store a block. The block will only be persisted in the state-tree if the CID is "linked in" to
/// the actor's state-tree before the end of the current invocation.
import {cid, create, open, read} from "../wrappers";
import {Cid, MAX_CID_LEN} from "../env";
import {cast} from "../utils/cid/multihash";

export function Put(mh_code: u64, mh_size: u32, codec: u64, data: Uint8Array): Cid {
    const id = create(codec, data)

    // I really hate this CID interface. Why can't I just have bytes?
    const buf = new Uint8Array(MAX_CID_LEN)
    const cidLen = cid(id, mh_code, mh_size, buf)

    return cast(buf)
}

export function Get(cidVal: Cid): Uint8Array {
    const result = open(cidVal.raw)
    return GetBlock(result.Id, result.Size)
}

export function GetBlock(id: u32, size: u32): Uint8Array {
    const block = new Uint8Array(size)
    const bytesRead = read(id, 0, block)
    return block.slice(0, bytesRead)
}
