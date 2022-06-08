import {ipld} from "../env/sys/ipld"
import {Codec, IpldStat, IpldOpen, USR_ILLEGAL_STATE} from "../env";
import {genericAbort} from "./errors";

export function create(codec: u64, data: Uint8Array ): u32 {
    const respPtr = memory.data(sizeof<u32>())
    const dataPtr = changetype<usize>(data.dataStart)
    const dataLen = data.length

    if(ipld.create(respPtr, codec, dataPtr, dataLen) != 0){
        genericAbort(USR_ILLEGAL_STATE, "failed to create new block")
        return 0
    }

    return load<u32>(respPtr)
}

export function cid(id: u32, hash_fun: u64, hash_len: u32, cidBuf: Uint8Array): u32 {
    const respPtr = memory.data(sizeof<u32>())
    const cidBufPtr = changetype<usize>(cidBuf.dataStart)
    const cidBufLen = cidBuf.length

    if(ipld.cid(respPtr, id, hash_fun, hash_len, cidBufPtr, cidBufLen) != 0){
        genericAbort(USR_ILLEGAL_STATE, "failed to compute new CID")
        return 0
    }

    return load<u32>(respPtr)
}


export function read(id: u32, offset: u32, buf:Uint8Array): u32 {
    const respPtr = memory.data(sizeof<u32>())
    const dataPtr = changetype<usize>(buf.dataStart)
    const dataLen = buf.length

    if(ipld.read(respPtr, id, offset, dataPtr, dataLen) != 0){
        genericAbort(USR_ILLEGAL_STATE, "failed to read block from CID")
        return 0
    }

    return load<u32>(respPtr)
}

export function stat(id: u32): IpldStat {
    const respPtr = memory.data(sizeof<Codec>() + sizeof<u32>()) // Codec + Size

    // TODO Check if ipld.create func ran successfully
    ipld.stat(respPtr, id)

    const codec: u64 = load<u64>(respPtr)
    const size: u32 = load<u32>(respPtr + sizeof<u64>())

    const resp: IpldStat = new IpldStat(codec, size)
    return resp
}

export function open(id: Uint8Array): IpldOpen {
    const respPtr = memory.data(sizeof<Codec>() + sizeof<u32>() + sizeof<u32>()) // Id + Codec + Size
    const dataPtr = changetype<usize>(id.dataStart)

    if(ipld.open(respPtr, dataPtr) != 0){
        genericAbort(USR_ILLEGAL_STATE, "failed to open CID")
        return new IpldOpen(0, 0, 0)
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
