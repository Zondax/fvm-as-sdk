import {message} from "../env/sys/message";
import {usrIllegalState} from "./errors";

export function methodNumber(): u64{
    const msgPrt = memory.data(sizeof<u64>())
    if( message.method_number(msgPrt) != 0){
        usrIllegalState()
    }
    return load<u64>(msgPrt)
}

export function caller(): u64{
    const msgPrt = memory.data(sizeof<u64>())
    if( message.caller(msgPrt) != 0){
        usrIllegalState()
    }
    return load<u64>(msgPrt)
}
