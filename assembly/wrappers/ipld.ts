import {ipld} from "../env/sys/ipld"
import {Codec, IpldStat, IpldOpen} from "../env";

export function create(codec: u64, data: Uint8Array ): u32 {
    const respPtr = memory.data(sizeof<u32>())
    const dataPtr = changetype<usize>(data.dataStart)
    const dataLen = data.length

    // TODO Check if ipld.create func ran successfully
    ipld.create(respPtr, codec, dataPtr, dataLen)

    return load<u32>(respPtr)
}

export function cid(id: u32, hash_fun: u64, hash_len: u32, cidBuf: Uint8Array): u32 {
    const respPtr = memory.data(sizeof<u32>())
    const cidBufPtr = changetype<usize>(cidBuf.dataStart)
    const cidBufLen = cidBuf.length

    // TODO Check if ipld.create func ran successfully
    ipld.cid(respPtr, id, hash_fun, hash_len, cidBufPtr, cidBufLen)

    return load<u32>(respPtr)
}


export function read(id: u32, offset: u32, buf:Uint8Array): u32 {
    const respPtr = memory.data(sizeof<u32>())
    const dataPtr = changetype<usize>(buf.dataStart)
    const dataLen = buf.length

    // TODO Check if ipld.create func ran successfully
    ipld.read(respPtr, id, offset, dataPtr, dataLen)

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
    const respPtr = memory.data(sizeof<u32>() + sizeof<Codec>() + sizeof<u32>()) // Id + Codec + Size
    const dataPtr = changetype<usize>(id.dataStart)

    // TODO Check if ipld.create func ran successfully
    ipld.open(respPtr, dataPtr)

    const rcvId: u32 = load<u32>(respPtr)
    const codec: u64 = load<u64>(respPtr + sizeof<u32>())
    const size: u32 = load<u32>(respPtr + sizeof<u32>() + sizeof<u64>())

    const resp: IpldOpen = new IpldOpen(rcvId, codec, size)
    return resp
}
