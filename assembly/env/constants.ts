/// BlockID representing nil parameters or return data.
export const NO_DATA_BLOCK_ID: u32 = 0;

/// The maximum supported CID size. (SPEC_AUDIT)
export const MAX_CID_LEN = 100

/// The maximum actor address length (class 2 addresses).
export const MAX_ACTOR_ADDR_LEN = 21

// https://github.com/multiformats/multicodec/blob/master/table.csv
export const DAG_CBOR: u64 = 0x71

// https://github.com/multiformats/multicodec/blob/master/table.csv
export const DAG_JSON: u64 = 0x0129
