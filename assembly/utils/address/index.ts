import { CBOREncoder } from "@zondax/assemblyscript-cbor/assembly"
import { Value, Arr, Integer, Bytes } from "@zondax/assemblyscript-cbor/assembly/types"
import { genericAbort } from "../../wrappers/errors"
import { USR_ILLEGAL_ARGUMENT } from "../../env/errors"

/// Hash length of payload for Secp and Actor addresses.
const PAYLOAD_HASH_LEN: usize = 20;
/// BLS public key length used for validation of BLS addresses.
const BLS_PUB_LEN: usize = 48;

export enum Protocol {
  ID = 0,
  Secp256k1 = 1,
  Actor = 2,
  BLS = 3,
}

export class Address {
  public protocol: Protocol
  public payload: Uint8Array

  constructor(protocol: Protocol, payload: Uint8Array) {
    this.protocol = protocol
    this.payload = payload
  }

  static fromBytes(address: Uint8Array): Address {
    if (address.length < 2) {
      genericAbort(USR_ILLEGAL_ARGUMENT, "Invalid length for an address.")
    }

    const protocol = address.at(0)
    const payload = address.slice(1)

    switch (protocol) {
      case Protocol.ID:
        break
      case Protocol.Secp256k1:
        if (payload.length != PAYLOAD_HASH_LEN) {
          genericAbort(USR_ILLEGAL_ARGUMENT, "Invalid length for a Secp256k1 address.")
        }
        break
      case Protocol.Actor:
        if (payload.length != PAYLOAD_HASH_LEN) {
          genericAbort(USR_ILLEGAL_ARGUMENT, "Invalid length for an Actor address.")
        }
        break
      case Protocol.BLS:
        if (payload.length != PAYLOAD_HASH_LEN) {
          genericAbort(USR_ILLEGAL_ARGUMENT, "Invalid length for an Actor address.")
        }
        break
      default:
        genericAbort(USR_ILLEGAL_ARGUMENT, `Unknown protocol (${protocol} is not a valid address protocol).`)
    }

    return new Address(protocol, payload)
  }


  static encode(encoder: CBOREncoder, toEncode: Address): void {
    encoder.addArray(2)
    encoder.addUint8(toEncode.protocol)
    encoder.addBytes(toEncode.payload)
  }


  static parse(parsedData: Value): Address {
    if( !parsedData.isArr ) throw new Error("serialized data on Address should be an array")
    let values = (parsedData as Arr).valueOf()

    const protocol = (values.at(0) as Integer).valueOf()
    const payload = (values.at(1) as Bytes).valueOf()

    return new Address(protocol, payload)
  }

  static defaultInstance(): Address {
    return new Address(Protocol.ID, new Uint8Array(0) );
  }
}
