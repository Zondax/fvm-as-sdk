import {ipld} from "../env/sys/ipld"
import {Codec, IpldStat, IpldOpen, USR_ILLEGAL_STATE} from "../env";
import {genericAbort} from "./errors";

/**
 * Creates a new block, returning the block's ID. The block's children must be in the reachable
 * set. The new block isn't added to the reachable set until the CID is computed.
 * @param codec 
 * @param data 
 * @returns 
 */
export function create(codec: u64, data: Uint8Array ): u32 {
    const respPtr = memory.data(sizeof<u32>())
    const dataPtr = changetype<usize>(data.dataStart)
    const dataLen = data.length

    const err = ipld.blockCreate(respPtr, codec, dataPtr, dataLen)
    if(err != 0){
        genericAbort(u32(err), "failed to create new block")
    }

    return load<u32>(respPtr)
}

/**
 * Computes the given block's CID, returning the actual size of the CID.
 *   
 * If the CID is longer than cid_max_len, no data is written and the actual size is returned.
 *   
 * The returned CID is added to the reachable set. 
 * @param id 
 * @param hash_fun 
 * @param hash_len 
 * @param cidBuf 
 * @returns 
 */
export function cid(id: u32, hash_fun: u64, hash_len: u32, cidBuf: Uint8Array): u32 {
    const respPtr = memory.data(sizeof<u32>())
    const cidBufPtr = changetype<usize>(cidBuf.dataStart)
    const cidBufLen = cidBuf.length

    const err = ipld.blockLink(respPtr, id, hash_fun, hash_len, cidBufPtr, cidBufLen)
    if(err != 0){
        genericAbort(u32(err), "failed to compute new CID")
    }

    return load<u32>(respPtr)
}


/**
 * Reads the identified block into obuf, starting at offset, reading _at most_ len bytes.
 * Returns the number of bytes read.
 * @param id 
 * @param offset 
 * @param buf 
 * @returns 
 */
export function read(id: u32, offset: u32, buf:Uint8Array): u32 {
    const respPtr = memory.data(sizeof<u32>())
    const dataPtr = changetype<usize>(buf.dataStart)
    const dataLen = buf.length

    const err = ipld.blockRead(respPtr, id, offset, dataPtr, dataLen)
    if (err != 0){
        genericAbort(u32(err), `failed to read block from CID`)
    }

    return load<u32>(respPtr)
}

/**
 * Returns the codec and size of the specified block.
 * @param id 
 * @returns 
 */
export function stat(id: u32): IpldStat {
    const respPtr = memory.data(sizeof<Codec>() + sizeof<u32>()) // Codec + Size

    const err = ipld.blockStat(respPtr, id)
    if (err != 0) {
        genericAbort(u32(err), `failed to get block stat from ID (${id})`)
    }

    const codec: u64 = load<u64>(respPtr)
    const size: u32 = load<u32>(respPtr + sizeof<u64>())

    const resp: IpldStat = new IpldStat(codec, size)
    return resp
}

/**
 * Opens a block from the "reachable" set, returning an ID for the block, its codec, and its
 * size in bytes.
 * 
 * - The reachable set is initialized to the root.
 * - The reachable set is extended to include the direct children of loaded blocks until the
 *   end of the invocation.
 * @param id 
 * @returns 
 */
export function open(id: Uint8Array): IpldOpen {
    const respPtr = memory.data(sizeof<Codec>() + sizeof<u32>() + sizeof<u32>()) // Id + Codec + Size
    const dataPtr = changetype<usize>(id.dataStart)

    const err = ipld.blockOpen(respPtr, dataPtr)
    if(err != 0){
        genericAbort(u32(err), "failed to open CID")
    }

    let pos = 0
    const codec: u64 = load<u64>(respPtr + pos)
    pos += sizeof<u64>()

    const rcvId: u32 = load<u32>(respPtr + pos)
    pos += sizeof<u32>()

    const size: u32 = load<u32>(respPtr + pos)

    const resp: IpldOpen = new IpldOpen(rcvId, codec, size)
    return resp
}
