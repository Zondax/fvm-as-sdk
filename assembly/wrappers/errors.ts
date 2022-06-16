import {USR_FORBIDDEN, USR_ILLEGAL_STATE, USR_UNHANDLED_MESSAGE} from "../env/errors";
import {vm} from "../env/sys/vm"

export function usrUnhandledMsg(): isize{
    return genericAbort(USR_UNHANDLED_MESSAGE, "unrecognized method")
}

export function usrForbidden(): isize{
    return genericAbort(USR_FORBIDDEN, "constructor invoked by non-init actor")
}

export function usrIllegalState(): isize{
    return genericAbort(USR_ILLEGAL_STATE, "unable to get method number")
}

export function usrNotFound(): isize{
    return genericAbort(USR_NOT_FOUND, "ressource not found")
}

export function genericAbort(code: u32, msg: string):isize{
    const buff = String.UTF8.encode(msg)
    const dataPtr = changetype<isize>(buff)
    const dataLen = msg.length

    return vm.abort(code, dataPtr, dataLen)
}
