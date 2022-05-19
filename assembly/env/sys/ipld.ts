import {IpldOpen, IpldStat} from "../types";

export namespace ipld{
    // ###########
    // # Ipld #
    // ###########

    /// Opens a block from the "reachable" set, returning an ID for the block, its codec, and its
    /// size in bytes.
    ///
    /// - The reachable set is initialized to the root.
    /// - The reachable set is extended to include the direct children of loaded blocks until the
    ///   end of the invocation.
    ///
    /// # Arguments
    ///
    /// - `cid` the location of the input CID (in wasm memory).
    ///
    /// # Errors
    ///
    /// | Error               | Reason                                      |
    /// |---------------------|---------------------------------------------|
    /// | [`NotFound`]        | the target block isn't in the reachable set |
    /// | [`IllegalArgument`] | there's something wrong with the CID        |
    @external("ipld", "open")
    export declare function open(resp_ptr: isize, cid: isize) :isize;

    /// Creates a new block, returning the block's ID. The block's children must be in the reachable
    /// set. The new block isn't added to the reachable set until the CID is computed.
    ///
    /// # Arguments
    ///
    /// - `codec` is the codec of the block.
    /// - `data` and `len` specify the location and length of the block data.
    ///
    /// # Errors
    ///
    /// | Error               | Reason                                                  |
    /// |---------------------|---------------------------------------------------------|
    /// | [`LimitExceeded`]   | the block is too big                                    |
    /// | [`NotFound`]        | one of the blocks's children isn't in the reachable set |
    /// | [`IllegalCodec`]    | the passed codec isn't supported                        |
    /// | [`Serialization`]   | the passed block doesn't match the passed codec         |
    /// | [`IllegalArgument`] | the block isn't in memory, etc.                         |
    @external("ipld", "create")
    export declare function create(resp_ptr:isize, codec: u64, data: isize, len: u32) :isize;

    /// Reads the block identified by `id` into `obuf`, starting at `offset`, reading _at most_
    /// `max_len` bytes.
    ///
    /// Returns the number of bytes read.
    ///
    /// # Arguments
    ///
    /// - `id` is ID of the block to read.
    /// - `offset` is the offset in the block to start reading.
    /// - `obuf` is the output buffer (in wasm memory) where the FVM will write the block data.
    /// - `max_len` is the maximum amount of block data to read.
    ///
    /// Passing a length/offset that exceed the length of the block will not result in an error, but
    /// will result in no data being read.
    ///
    /// # Errors
    ///
    /// | Error               | Reason                                            |
    /// |---------------------|---------------------------------------------------|
    /// | [`InvalidHandle`]   | if the handle isn't known.                        |
    /// | [`IllegalArgument`] | if the passed buffer isn't valid, in memory, etc. |
    @external("ipld", "read")
    export declare function read(resp_ptr: isize, id: u32, offset: u32, obuf: isize, max_len: u32) :isize;

    /// Returns the codec and size of the specified block.
    ///
    /// # Errors
    ///
    /// | Error             | Reason                     |
    /// |-------------------|----------------------------|
    /// | [`InvalidHandle`] | if the handle isn't known. |
    @external("ipld", "stat")
    export declare function stat(resp_ptr: isize, id: u32):isize;

    // TODO: CID versions?

    /// Computes the given block's CID, writing the resulting CID into `cid`, returning the actual
    /// size of the CID.
    ///
    /// If the CID is longer than `cid_max_len`, no data is written and the actual size is returned.
    ///
    /// The returned CID is added to the reachable set.
    ///
    /// # Arguments
    ///
    /// - `id` is ID of the block to linked.
    /// - `hash_fun` is the multicodec of the hash function to use.
    /// - `hash_len` is the desired length of the hash digest.
    /// - `cid` is the output buffer (in wasm memory) where the FVM will write the resulting cid.
    /// - `cid_max_length` is the length of the output CID buffer.
    ///
    /// # Errors
    ///
    /// | Error               | Reason                                            |
    /// |---------------------|---------------------------------------------------|
    /// | [`InvalidHandle`]   | if the handle isn't known.                        |
    /// | [`IllegalCid`]      | hash code and/or hash length aren't supported.    |
    /// | [`IllegalArgument`] | if the passed buffer isn't valid, in memory, etc. |
    @external("ipld", "cid")
    export declare function cid(
        resp_ptr: isize,
        id: u32,
        hash_fun: u64,
        hash_len: u32,
        cid: isize,
        cid_max_len: u32,
    ) :isize;
}
