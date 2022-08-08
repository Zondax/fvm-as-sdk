import {context} from "./vm"
import {TokenAmount, ChainEpoch, NO_DATA_BLOCK_ID, DAG_CBOR, ParamsRawResult} from "../env"
import {ipld} from "../env/sys/ipld"
import {genericAbort} from "./errors"
import {getBlock} from "../helpers"

/**
 * Returns the invoked method number
 * 
 * @remarks
 * 
 * With respect to FVM:
 * 
 * Method number `1` is reserved for the `init method` 
 * custom exported method numbers start from `2` and onwards
 * 
 */
export function methodNumber(): u64{
    return context().method_number
}

/**
 * Returns the caller ID in the method invoked
 * 
 * @remarks
 * 
 * A wallet can be addressed using a `robust address` or `wallet ID`.
 * This method returns wallet ID, for example: `1000`, `1020`
 * 
 */
export function caller(): u64{
    return context().caller
}

/**
 * Returns the receiver ID in the method invoked
 * 
 * @remarks
 * 
 * A wallet can be addressed using a `robust address` or `wallet ID`.
 * This method returns wallet ID, for example: `1000`, `1020`
 * 
 * In context of FVM actor, this method returns actor ID
 * 
 */
export function receiver(): u64{
    return context().receiver
}

/**
 * 
 * TODO: find what value format?
 * Returns the value received in FIL
 * 
 */
export function valueReceived(): TokenAmount{
    return context().value_received
}

/**
 * Returns current epoch on the network
 */
export function currentEpoch(): ChainEpoch{
    return context().network_curr_epoch
}

/**
 * Returns network version
 */
export function networkVer(): u32{
    return context().network_version
}

/**
 * 
 * Generic params parser for invoked method
 * 
 * @param id - parameters id to locate param in vm
 * @returns ParamsRawResult
 * 
 * @remarks
 * 
 * paramsId only known at runtime and available from main `invoke`
 * This method is not intended to be used directly.
 * More info on usage - https://github.com/Zondax/fvm-as-bindgen
 */
export function paramsRaw(id: u32): ParamsRawResult{
    if (id == NO_DATA_BLOCK_ID) {
        return new ParamsRawResult(DAG_CBOR, new Uint8Array(0)) // DAG_CBOR is a lie, but we have no nil codec.
    }

    let respPtr = memory.data(sizeof<u64>() + sizeof<u32>())
    let err = ipld.blockStat(respPtr, id)
    if (err != 0) {
        genericAbort(u32(err), "fail to fetch parameters stat")
    }

    let pos = 0
    const codec = load<u64>(respPtr + pos)
    pos += sizeof<u64>()
    const size = load<u32>(respPtr + pos)


    const rawParam = getBlock(id, size)

    return new ParamsRawResult(codec, rawParam)
}
