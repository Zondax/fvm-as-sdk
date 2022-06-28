import {ParamsRawResult} from "../../env";
import {Value} from "@zondax/assemblyscript-cbor/assembly/types";
import {CBORDecoder} from "@zondax/assemblyscript-cbor/assembly";

export function decodeParamsRaw(params: ParamsRawResult): Value{
    if( !(params.raw.byteLength > 0) ) return Value.Array()

    // Use CBORDecoder to CBOR data into an object
    const decoder = new CBORDecoder(params.raw.buffer)

    // Call custom function to get decoded from generic object
    const decoded = decoder.parse()

    return decoded
}
