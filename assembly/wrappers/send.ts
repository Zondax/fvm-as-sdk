import {send as sendSyscall} from "../env/sys/send";
import {ActorID, BlockId, Send} from "../env";

export function send(recipient: Uint8Array, method: u64, params: u32, value_hi: u64, value_lo: u64): Send{
    const respPtr = memory.data(sizeof<u32>() + sizeof<BlockId>() + sizeof<u64>() + sizeof<u32>())
    const recipientPtr = changetype<usize>(recipient.dataStart)
    const recipientLen = recipient.byteLength

    sendSyscall.send(respPtr, recipientPtr, recipientLen, method, params, value_hi, value_lo)

    let pos = 0
    const exit_code: u64 = load<u32>(respPtr + pos)
    pos += sizeof<u64>()

    const return_id: u64 = load<BlockId>(respPtr + pos)
    pos += sizeof<u64>()

    const return_codec: ActorID = load<u64>(respPtr + pos)
    pos += sizeof<ActorID>()

    const return_size: ActorID = load<u32>(respPtr + pos)

    return new Send(exit_code, return_id, return_codec, return_size)
}
