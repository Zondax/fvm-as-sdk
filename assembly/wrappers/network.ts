import {network} from "../env/sys/network";
import {TokenAmount} from "../env";

export function base_fee(): TokenAmount {
    const respPtr = memory.data(sizeof<u64>() + sizeof<u64>())

    // TODO Check if func ran successfully
    network.base_fee(respPtr)

    const lo = load<u64>(respPtr)
    const hi = load<u64>(respPtr + sizeof<u64>())
    return new TokenAmount(lo, hi)
}

export function total_fil_circ_supply(): TokenAmount {
    const respPtr = memory.data(sizeof<u64>() + sizeof<u64>())

    // TODO Check if func ran successfully
    network.total_fil_circ_supply(respPtr)

    const lo = load<u64>(respPtr)
    const hi = load<u64>(respPtr + sizeof<u64>())
    return new TokenAmount(lo, hi)
}
