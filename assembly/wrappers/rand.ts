import {rand} from "../env/sys/rand";
import {RANDOMNESS_LENGTH} from "../env";

export function get_chain_randomness(tag: i64, epoch: i64, entropy: Uint8Array ): Uint8Array {
    const respPtr = memory.data(RANDOMNESS_LENGTH * sizeof<u8>())
    const entropyPtr = changetype<usize>(entropy.dataStart)
    const entropyLen = entropy.byteLength

    // TODO Check if func ran successfully
    rand.get_chain_randomness(respPtr, tag, epoch, entropyPtr, entropyLen)

    return load<Uint8Array>(respPtr)
}


export function get_beacon_randomness(tag: i64, epoch: i64, entropy: Uint8Array ): Uint8Array {
    const respPtr = memory.data(RANDOMNESS_LENGTH * sizeof<u8>())
    const entropyPtr = changetype<usize>(entropy.dataStart)
    const entropyLen = entropy.byteLength

    // TODO Check if func ran successfully
    rand.get_beacon_randomness(respPtr, tag, epoch, entropyPtr, entropyLen)

    return load<Uint8Array>(respPtr)
}
