import {send as sendSyscall} from "../env/sys/send"
import { create } from "./ipld"
import {Codec, BlockId, Send, DAG_CBOR, NO_DATA_BLOCK_ID} from "../env"
import {genericAbort} from "./errors"

/**
 * Sends a message to another actor.
 * @param recipient recipient actor id
 * @param method method number to invoke
 * @param params method params
 * @param value_hi token amount high
 * @param value_lo token amount low
 * @returns 
 */
export function send(recipient: Uint8Array, method: u64, params: Uint8Array, value_hi: u64, value_lo: u64): Send{
    const respPtr = memory.data(sizeof<u32>() + sizeof<BlockId>() + sizeof<u64>() + sizeof<u32>())
    const recipientPtr = changetype<usize>(recipient.dataStart)
    const recipientLen = recipient.byteLength

    let paramsID: u32 = NO_DATA_BLOCK_ID
    if (params.byteLength !== 0 ) {
        paramsID = create(DAG_CBOR, params)
    }

    const err = sendSyscall.send(respPtr, recipientPtr, recipientLen, method, paramsID, value_hi, value_lo)
    if (err != 0) {
        genericAbort(u32(err), "failed to send transaction")
    }

    let pos = 0
    const exit_code: u32 = load<u32>(respPtr + pos)
    pos += sizeof<u32>()

    const return_id: BlockId = load<BlockId>(respPtr + pos)
    pos += sizeof<BlockId>()

    const return_codec: Codec = load<Codec>(respPtr + pos)
    pos += sizeof<Codec>()

    const return_size: u32 = load<u32>(respPtr + pos)

    return new Send(exit_code, return_id, return_codec, return_size)
}
