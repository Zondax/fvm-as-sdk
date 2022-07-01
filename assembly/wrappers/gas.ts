import {gas} from "../env/sys/gas";
import {genericAbort} from "./errors"

export function charge(name: Uint8Array, amount: u64 ): void {
    const namePtr = changetype<usize>(name.dataStart)
    const nameLen = name.byteLength

    const err = gas.charge(namePtr, nameLen, amount)
    if (err != 0) {
        genericAbort(u32(err), "failed to charge gas")
    }
}
