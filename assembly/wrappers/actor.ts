import {actor} from "../env/sys/actor";

export function resolve_address(address: Uint8Array ): u64 {
    const respPtr = memory.data(sizeof<u64>())
    const addressPtr = changetype<usize>(address.dataStart)
    const addressLen = address.byteLength

    // TODO Check if func ran successfully
    actor.resolve_address(respPtr, addressPtr, addressLen)

    return load<u64>(respPtr)
}


export function get_actor_code_cid(id: u64, obuf: Uint8Array): u32 {
    const respPtr = memory.data(sizeof<u32>())
    const obufPtr = changetype<usize>(obuf.dataStart)
    const obufLen = obuf.byteLength

    // TODO Check if func ran successfully
    actor.get_actor_code_cid(respPtr, id, obufPtr, obufLen)

    return load<u32>(respPtr)
}

export function get_builtin_actor_type(cid: Uint8Array): i32 {
    const respPtr = memory.data(sizeof<i32>())
    const cidPtr = changetype<usize>(cid.dataStart)

    // TODO Check if func ran successfully
    actor.get_builtin_actor_type(respPtr, cidPtr)

    return load<i32>(respPtr)
}

export function get_code_cid_for_type(typ: i32, obuf: Uint8Array): u32 {
    const respPtr = memory.data(sizeof<u32>())
    const obufPtr = changetype<usize>(obuf.dataStart)
    const obufLen = obuf.byteLength

    // TODO Check if func ran successfully
    actor.get_code_cid_for_type(respPtr, typ, obufPtr, obufLen)

    return load<u32>(respPtr)
}

export function new_actor_address(obuf: Uint8Array): u32 {
    const respPtr = memory.data(sizeof<u32>())
    const obufPtr = changetype<usize>(obuf.dataStart)
    const obufLen = obuf.byteLength

    // TODO Check if func ran successfully
    actor.new_actor_address(respPtr, obufPtr, obufLen)

    return load<u32>(respPtr)
}

export function create_actor(id:u64, obuf: Uint8Array): void {
    const obufPtr = changetype<usize>(obuf.dataStart)

    // TODO Check if func ran successfully
    actor.create_actor(id, obufPtr)
}

