import {debug} from "../env/sys/debug";

/**
 * Enable debug statements on runtime inside invoked method
 */
export function enabled(): i32 {
    const respPtr = memory.data(sizeof<i32>())
    debug.enabled(respPtr)

    return load<i32>(respPtr)
}

/**
 * Logs debug message as part of the invoke method response
 * 
 * @remarks
 * 
 * Doesn't work out of the box, requires to enable debugging 
 * inside the method invoked. Example:
 * ```ts
 * @export_method(2)
 * function logInsideActor() {
 *  enabled();
 *  log("This is a debug message part of the invoke method response");
 * }
 * ```
 * 
 */
export function log(message:string): void {
    const buff = String.UTF8.encode(message)
    const messagePrt = changetype<usize>(buff)
    const messageLen = buff.byteLength

    debug.log(messagePrt, messageLen)
}
