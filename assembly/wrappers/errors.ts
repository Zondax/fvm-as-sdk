import {USR_FORBIDDEN, USR_ILLEGAL_STATE, USR_UNHANDLED_MESSAGE, USR_NOT_FOUND} from "../env/errors";
import {vm} from "../env/sys/vm"

export function usrUnhandledMsg(methodNum: u32): void{
    genericAbort(USR_UNHANDLED_MESSAGE, `unrecognized method (${methodNum})`)
}

export function usrForbidden(): void{
    genericAbort(USR_FORBIDDEN, "constructor invoked by non-init actor")
}

export function usrIllegalState(): void{
    genericAbort(USR_ILLEGAL_STATE, "unable to get method number")
}

export function usrNotFound(): void{
    genericAbort(USR_NOT_FOUND, "resource not found")
}

export function genericAbort(code: u32, msg: string):void{
    const buff = String.UTF8.encode(msg)
    const dataPtr = changetype<isize>(buff)
    const dataLen = msg.length

    vm.abort(code, dataPtr, dataLen)
    throw new Error(msg)
}
