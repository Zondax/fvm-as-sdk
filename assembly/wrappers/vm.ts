import { BigInt } from "as-bigint/assembly";
import {TokenAmount, MethodNum, ActorID, ChainEpoch, InvocationContext} from "../env";
import {vm} from "../env/sys/vm";

export function context(): InvocationContext {
    const respPtr = memory.data( sizeof<u64>()  + sizeof<u64>() +sizeof<MethodNum>()
        + sizeof<ActorID>()
        + sizeof<ChainEpoch>() + sizeof<ActorID>() + sizeof<u32>())

    vm.context(respPtr)

    let pos = 0
    const tokenAmountHi: u64 = load<u64>(respPtr + pos)
    pos += sizeof<u64>()

    const tokenAmountLo: u64 = load<u64>(respPtr + pos)
    pos += sizeof<u64>()

    const caller: ActorID = load<ActorID>(respPtr + pos)
    pos += sizeof<ActorID>()

    const receiver: ActorID = load<ActorID>(respPtr + pos)
    pos += sizeof<ActorID>()

    const methodNum: MethodNum = load<MethodNum>(respPtr + pos)
    pos += sizeof<MethodNum>()

    const currentEpoch: ChainEpoch = load<ChainEpoch>(respPtr + pos)
    pos += sizeof<ChainEpoch>()

    const networkVer: u32 = load<u32>(respPtr + pos)

    // hacky
    const valueReceived: TokenAmount = BigInt.fromString(tokenAmountHi.toString(16)+tokenAmountLo.toString(16), 16)

    const resp: InvocationContext = new InvocationContext(valueReceived, caller, receiver, methodNum, currentEpoch, networkVer)

    return resp
}
