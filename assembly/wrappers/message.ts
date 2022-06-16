import {context} from "./vm"
import {TokenAmount, ChainEpoch} from "../env"

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

export function currentEpoch(): ChainEpoch{
    return context().network_curr_epoch
}

export function networkVer(): u32{
    return context().network_version
}