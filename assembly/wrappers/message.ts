import {usrIllegalState} from "./errors";
import {context} from "./vm";

export function methodNumber(): u64{
    return context().method_number
}

export function caller(): u64{
    return context().caller
}
