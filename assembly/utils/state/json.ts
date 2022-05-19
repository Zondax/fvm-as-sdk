import { JSONEncoder, JSON } from "assemblyscript-json/assembly";

import {root} from "../../helpers/self";
import {Get, Put} from "../../helpers/ipld";
import {Cid, DAG_JSON} from "../../env";
import {setRoot} from "../../wrappers/self";

export class State {
    count:u64

    constructor(count: u64) {
        this.count = count;
    }

    save(): Cid{
        const encoder = new JSONEncoder();
        encoder.setInteger("int", this.count);

        const jsonBytes: Uint8Array = encoder.serialize();
        const stCid = Put(0xb220, 32, DAG_JSON, jsonBytes)

        setRoot(stCid)

        return stCid
    }
}

export function readState(): State{
    const rootCid = root()
    const data = Get(rootCid)

    let jsonObj: JSON.Obj = <JSON.Obj>(JSON.parse(data.toString()));
    let countOrNull: JSON.Integer | null = jsonObj.getInteger("count")

    if( countOrNull !== null ){
        return new State(u64(countOrNull))
    } else {
        return new State(u64(0))
    }
}
