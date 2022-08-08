import {USR_FORBIDDEN, USR_ILLEGAL_STATE, USR_UNHANDLED_MESSAGE, USR_NOT_FOUND} from "../env/errors";
import {vm} from "../env/sys/vm"


/**
 * Aborts operation inside the actor
 * 
 * @param methodNum - Method number of the method invoked
 * 
 */
export function usrUnhandledMsg(methodNum: u32): void{
    genericAbort(USR_UNHANDLED_MESSAGE, `unrecognized method (${methodNum})`)
}

/**
 * Aborts operation inside the actor
 */
export function usrForbidden(): void{
    genericAbort(USR_FORBIDDEN, "constructor invoked by non-init actor")
}

/**
 * Aborts operation inside the actor
 */
export function usrIllegalState(): void{
    genericAbort(USR_ILLEGAL_STATE, "unable to get method number")
}

/**
 * Aborts operation inside the actor
 */
export function usrNotFound(): void{
    genericAbort(USR_NOT_FOUND, "resource not found")
}

/**
 * Aborts operation inside the actor
 * 
 * @param code - Return code on abort
 * @param msg  - Message string to return on abort
 * 
 */
export function genericAbort(code: u32, msg: string):void{
    const buff = String.UTF8.encode(msg)
    const dataPtr = changetype<isize>(buff)
    const dataLen = msg.length

    vm.abort(code, dataPtr, dataLen)
    throw new Error(msg)
}
