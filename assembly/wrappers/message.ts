import {context} from "./vm"
import {TokenAmount} from "../env"

export function methodNumber(): u64{
    return context().method_number
}

export function caller(): u64{
    return context().caller
}

export function receiver(): u64{
    return context().receiver
}

export function valueReceived(): TokenAmount{
    return context().value_received
}