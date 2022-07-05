import {debug} from "../env/sys/debug";

export function enabled(): i32 {
    const respPtr = memory.data(sizeof<i32>())
    debug.enabled(respPtr)

    return load<i32>(respPtr)
}

export function log(message:string): void {
    const buff = String.UTF8.encode(message)
    const messagePrt = changetype<usize>(buff)
    const messageLen = buff.byteLength

    debug.log(messagePrt, messageLen)
}
