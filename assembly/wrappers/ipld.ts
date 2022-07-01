import {ipld} from "../env/sys/ipld"
import {Codec, IpldStat, IpldOpen, USR_ILLEGAL_STATE} from "../env";
import {genericAbort} from "./errors";

export function create(codec: u64, data: Uint8Array ): u32 {
    const respPtr = memory.data(sizeof<u32>())
    const dataPtr = changetype<usize>(data.dataStart)
    const dataLen = data.length

    const err = ipld.create(respPtr, codec, dataPtr, dataLen)
    if(err != 0){
        genericAbort(u32(err), "failed to create new block")
    }

    return load<u32>(respPtr)
}

export function cid(id: u32, hash_fun: u64, hash_len: u32, cidBuf: Uint8Array): u32 {
    const respPtr = memory.data(sizeof<u32>())
    const cidBufPtr = changetype<usize>(cidBuf.dataStart)
    const cidBufLen = cidBuf.length

    const err = ipld.cid(respPtr, id, hash_fun, hash_len, cidBufPtr, cidBufLen)
    if(err != 0){
        genericAbort(u32(err), "failed to compute new CID")
    }

    return load<u32>(respPtr)
}


export function read(id: u32, offset: u32, buf:Uint8Array): u32 {
    const respPtr = memory.data(sizeof<u32>())
    const dataPtr = changetype<usize>(buf.dataStart)
    const dataLen = buf.length

    const err = ipld.read(respPtr, id, offset, dataPtr, dataLen)
    if (err != 0){
        genericAbort(u32(err), `failed to read block from CID`)
    }

    return load<u32>(respPtr)
}

export function stat(id: u32): IpldStat {
    const respPtr = memory.data(sizeof<Codec>() + sizeof<u32>()) // Codec + Size

    const err = ipld.stat(respPtr, id)
    if (err != 0) {
        genericAbort(u32(err), `failed to get block stat from ID (${id})`)
    }

    const codec: u64 = load<u64>(respPtr)
    const size: u32 = load<u32>(respPtr + sizeof<u64>())

    const resp: IpldStat = new IpldStat(codec, size)
    return resp
}

export function open(id: Uint8Array): IpldOpen {
    const respPtr = memory.data(sizeof<Codec>() + sizeof<u32>() + sizeof<u32>()) // Id + Codec + Size
    const dataPtr = changetype<usize>(id.dataStart)

    const err = ipld.open(respPtr, dataPtr)
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
