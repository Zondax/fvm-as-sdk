import {rand} from "../env/sys/rand";
import {RANDOMNESS_LENGTH} from "../env";
import {genericAbort} from "./errors"

/**
 * Returns randomness from the ticket chain.
 * @param tag Domain separation tag
 * @param epoch chain epoch
 * @param entropy 
 * @returns randomness from ticket chain
 */
export function getChainRandomness(tag: i64, epoch: i64, entropy: Uint8Array ): Uint8Array {
    const respPtr = memory.data(RANDOMNESS_LENGTH * sizeof<u8>())
    const entropyPtr = changetype<usize>(entropy.dataStart)
    const entropyLen = entropy.byteLength

    const err = rand.getChainRandomness(respPtr, tag, epoch, entropyPtr, entropyLen)
    if (err != 0) {
        genericAbort(u32(err), "fail to get chain randomness")
    }

    const response = new Uint8Array(RANDOMNESS_LENGTH)
    for (let i: u32 = 0; i < u32(RANDOMNESS_LENGTH); i++) {
        response[i] =  load<u8>(respPtr + (i*sizeof<u8>()))
    }

    return response
}

/**
 * Returns randomness from the beacon system (currently Drand)
 * @param tag Domain separation tag
 * @param epoch chain epoch
 * @param entropy 
 * @returns 
 */
export function getBeaconRandomness(tag: i64, epoch: i64, entropy: Uint8Array ): Uint8Array {
    const respPtr = memory.data(RANDOMNESS_LENGTH * sizeof<u8>())
    const entropyPtr = changetype<usize>(entropy.dataStart)
    const entropyLen = entropy.byteLength

    const err = rand.getBeaconRandomness(respPtr, tag, epoch, entropyPtr, entropyLen)
    if (err != 0) {
        genericAbort(u32(err), "fail to get beacon randomness")
    }

    const response = new Uint8Array(RANDOMNESS_LENGTH)
    for (let i: u32 = 0; i < u32(RANDOMNESS_LENGTH); i++) {
        response[i] =  load<u8>(respPtr + (i*sizeof<u8>()))
    }

    return response
}
