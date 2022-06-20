import {context} from "./vm"
import {TokenAmount, ChainEpoch, NO_DATA_BLOCK_ID, DAG_CBOR, ParamsRawResult} from "../env"
import {ipld} from "../env/sys/ipld"
import {genericAbort} from "./errors"
import {GetBlock} from "../helpers"

export function methodNumber(): u64{
    return context().method_number
}

export function caller(): u64{
    return context().caller
}

export function receiver(): u64{
    return context().receiver
}

export function valueReceived(): TokenAmount{
    return context().value_received
}

export function currentEpoch(): ChainEpoch{
    return context().network_curr_epoch
}

export function networkVer(): u32{
    return context().network_version
}

export function paramsRaw(id: u32): ParamsRawResult{
    if (id == NO_DATA_BLOCK_ID) {
        return new ParamsRawResult(DAG_CBOR, new Uint8Array(0)) // DAG_CBOR is a lie, but we have no nil codec.
    }

    let respPtr = memory.data(sizeof<u64>() + sizeof<u32>())
    let result = ipld.stat(respPtr, id)
    if (result != 0) {
        genericAbort(u32(result), "fail to fetch parameters stat")
    }

    let pos = 0
    const codec = load<u64>(respPtr + pos)
    pos += sizeof<u64>()
    const size = load<u32>(respPtr + pos)


    const rawParam = GetBlock(id, size)

    return new ParamsRawResult(codec, rawParam)
}
