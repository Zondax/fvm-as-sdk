import {Cid, USR_SERIALIZATION, USR_ILLEGAL_STATE} from "../env";
import {self} from "../env/sys/self";
import {genericAbort} from "./errors";

export function setRoot(id: Cid): void {
    const dataPtr = changetype<usize>(id.raw.dataStart)

    if(self.set_root(dataPtr) != 0){
        genericAbort(USR_ILLEGAL_STATE, "failed to set root CID")
    }
}

export function root(cidBuf: Uint8Array): usize {
    const msgPrt = memory.data(sizeof<usize>())
    const dataPtr = changetype<usize>(cidBuf.dataStart)
    const dataLen = cidBuf.length

    if(self.root(msgPrt, dataPtr, dataLen) != 0){
        genericAbort(USR_SERIALIZATION, "unexpected error from `self::root` syscall")
        return 0
    }

    return load<usize>(msgPrt)
}
