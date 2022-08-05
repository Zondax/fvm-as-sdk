import {cid, create, open, read} from "../wrappers";
import {Cid, MAX_CID_LEN} from "../env";
import {cast} from "../utils";

/**
 * Store a block. The block will only be persisted in the state-tree if the CID is "linked in" to
 * the actor's state-tree before the end of the current invocation.
 * @param mh_code 
 * @param mh_size 
 * @param codec 
 * @param data 
 * @returns 
 */
export function put(mh_code: u64, mh_size: u32, codec: u64, data: Uint8Array): Cid {
    const id = create(codec, data)

    const buf = new Uint8Array(MAX_CID_LEN)
    const cidLen = cid(id, mh_code, mh_size, buf)

    return cast(buf)
}

/**
 * Get a block: It's valid to call this on:
 * 
 * 1. All CIDs returned by prior calls to `get_root`...
 * 2. All CIDs returned by prior calls to `put`...
 * 3. Any children of a blocks returned by prior calls to `get`...
 * @param cidVal
 * @returns 
 */
export function get(cidVal: Cid): Uint8Array {
    const result = open(cidVal.raw)
    return getBlock(result.Id, result.Size)
}

/**
 * Gets the data of the block referenced by BlockId. If the caller knows the
 * size, use this function to avoid statting the block.
 * @param id 
 * @param size 
 * @returns 
 */
export function getBlock(id: u32, size: u32): Uint8Array {
    const block = new Uint8Array(size)
    const bytesRead = read(id, 0, block)
    return block
}
