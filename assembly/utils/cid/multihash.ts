import {Cid} from "../../env";

export function cast(buf: Uint8Array): Cid{
    if(buf.length < 2){
        return new Cid("", new Uint8Array(0), 0)
    }

    const len = buf[1];
    const raw = buf.slice(2, len)
    const value = raw.toString()

    return new Cid(value, raw, len)
}
