import {actor} from "../env/sys/actor";
import {genericAbort} from "./errors"

export function resolveAddress(address: Uint8Array ): u64 {
    const respPtr = memory.data(sizeof<u64>())
    const addressPtr = changetype<usize>(address.dataStart)
    const addressLen = address.byteLength

    // REVIEW: differentiate between error and address not found ?
    const err = actor.resolveAddress(respPtr, addressPtr, addressLen)
    if (err != 0) {
        genericAbort(u32(err), `failed to resolve address (${address})`)
    }

    return load<u64>(respPtr)
}


export function getActorCodeCID(id: u64, obuf: Uint8Array): u32 {
    const respPtr = memory.data(sizeof<u32>())
    const obufPtr = changetype<usize>(obuf.dataStart)
    const obufLen = obuf.byteLength

    // REVIEW: differentiate between error and address not found ?
    const err = actor.getActorCodeCID(respPtr, id, obufPtr, obufLen)
    if (err != 0) {
        genericAbort(u32(err), "failed to get actor code cid")
    }

    return load<u32>(respPtr)
}

export function getBuiltinActorType(cid: Uint8Array): i32 {
    const respPtr = memory.data(sizeof<i32>())
    const cidPtr = changetype<usize>(cid.dataStart)

    // REVIEW: differentiate between error and address not found ?
    const err = actor.getBuiltinActorType(respPtr, cidPtr)
    if (err != 0) {
        genericAbort(u32(err), "failed to get builtin actor type")
    }

    return load<i32>(respPtr)
}

export function getCodeCIDForType(typ: i32, obuf: Uint8Array): u32 {
    const respPtr = memory.data(sizeof<u32>())
    const obufPtr = changetype<usize>(obuf.dataStart)
    const obufLen = obuf.byteLength

    const err = actor.getCodeCIDForType(respPtr, typ, obufPtr, obufLen)
    if (err != 0) {
        genericAbort(u32(err), "failed to get code cid for type")
    }

    return load<u32>(respPtr)
}

/***** Priviledge *****/

export function newActorAddress(obuf: Uint8Array): u32 {
    const respPtr = memory.data(sizeof<u32>())
    const obufPtr = changetype<usize>(obuf.dataStart)
    const obufLen = obuf.byteLength

    const err = actor.newActorAddress(respPtr, obufPtr, obufLen)
    if (err != 0) {
        genericAbort(u32(err), "failed to create new actor address")
    }

    return load<u32>(respPtr)
}

export function createActor(id:u64, obuf: Uint8Array): void {
    const obufPtr = changetype<usize>(obuf.dataStart)

    const err = actor.createActor(id, obufPtr)
    if (err != 0) {
        genericAbort(u32(err), "failed to create new actor")
    }
}

