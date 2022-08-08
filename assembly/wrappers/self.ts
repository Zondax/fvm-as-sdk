import {Cid, USR_SERIALIZATION, USR_ILLEGAL_STATE} from "../env";
import {self} from "../env/sys/self";
import {genericAbort} from "./errors";

/**
 * Set the actor's state-tree root
 * @param id root id
 */
export function setRoot(id: Cid): void {
    const dataPtr = changetype<usize>(id.raw.dataStart)

    if(self.setRoot(dataPtr) != 0){
        genericAbort(USR_ILLEGAL_STATE, "failed to set root CID")
    }
}
/**
 * Returns the IPLD root CID. Fails if the actor doesn't have state (before the first call to
 * `set_root` and after actor deletion).
 * @param cidBuf 
 * @returns 
 */
export function root(cidBuf: Uint8Array): usize {
    const msgPrt = memory.data(sizeof<usize>())
    const dataPtr = changetype<usize>(cidBuf.dataStart)
    const dataLen = cidBuf.length

    if(self.root(msgPrt, dataPtr, dataLen) != 0){
        genericAbort(USR_SERIALIZATION, "unexpected error from `self::root` syscall")
    }

    return load<usize>(msgPrt)
}
