import {network} from "../env/sys/network";
import {TokenAmount} from "../env";

export function baseFee(): TokenAmount {
    const respPtr = memory.data(sizeof<u64>() + sizeof<u64>())

    // No error
    network.baseFee(respPtr)

    const lo = load<u64>(respPtr)
    const hi = load<u64>(respPtr + sizeof<u64>())
    return new TokenAmount(lo, hi)
}

export function totalFilCircSupply(): TokenAmount {
    const respPtr = memory.data(sizeof<u64>() + sizeof<u64>())

    // No error
    network.totalFilCircSupply(respPtr)

    const lo = load<u64>(respPtr)
    const hi = load<u64>(respPtr + sizeof<u64>())
    return new TokenAmount(lo, hi)
}
