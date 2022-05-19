import {Cid, MAX_CID_LEN} from "../env";
import {root as selfRoot} from "../wrappers/self";
import {cast} from "../utils/cid/multihash";

export function root(): Cid{
    const cidBuf = new Uint8Array(MAX_CID_LEN)
    const cidBufLen = selfRoot(cidBuf)

    return cast(cidBuf)
}
