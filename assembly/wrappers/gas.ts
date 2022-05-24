import {gas} from "../env/sys/gas";

export function charge(name: Uint8Array, amount: u64 ): void {
    const namePtr = changetype<usize>(name.dataStart)
    const nameLen = name.byteLength

    // TODO Check if func ran successfully
    gas.charge(namePtr, nameLen, amount)
}
