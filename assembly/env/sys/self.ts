export namespace self{
    // ###########
    // # Self #
    // ###########

    /// Gets the current root for the calling actor.
    ///
    /// If the CID doesn't fit in the specified maximum length (and/or the length is 0), this
    /// function returns the required size and does not update the cid buffer.
    ///
    /// # Arguments
    ///
    /// - `cid` is the location in memory where the state-root will be written.
    /// - `max_cid_len` is length of the output CID buffer.
    ///
    /// # Errors
    ///
    /// | Error                | Reason                                             |
    /// |----------------------|----------------------------------------------------|
    /// | [`IllegalOperation`] | actor hasn't set the root yet, or has been deleted |
    /// | [`IllegalArgument`]  | if the passed buffer isn't valid, in memory, etc.  |
    @external("self", "root")
    export declare function root(resp_ptr: isize, cid:isize, cid_max_len: u32) :isize;

    /// Sets the root CID for the calling actor. The new root must be in the reachable set.
    ///
    /// # Arguments
    ///
    /// - `cid` is the location in memory of the new state-root CID.
    ///
    /// # Errors
    ///
    /// | Error                | Reason                                         |
    /// |----------------------|------------------------------------------------|
    /// | [`IllegalOperation`] | actor has been deleted                         |
    /// | [`NotFound`]         | specified root CID is not in the reachable set |
    @external("self", "set_root")
    export declare function set_root(cid: isize):isize;

    /// Gets the current balance for the calling actor.
    ///
    /// # Errors
    ///
    /// None.
    @external("self", "current_balance")
    export declare function current_balance(resp_ptr: isize) :isize;

    /// Destroys the calling actor, sending its current balance
    /// to the supplied address, which cannot be itself.
    ///
    /// # Arguments
    ///
    /// - `addr_off` and `addr_len` specify the location and length of beneficiary's address in wasm
    ///   memory.
    ///
    /// # Errors
    ///
    /// | Error               | Reason                                                         |
    /// |---------------------|----------------------------------------------------------------|
    /// | [`NotFound`]        | beneficiary isn't found                                        |
    /// | [`Forbidden`]       | beneficiary is not allowed (usually means beneficiary is self) |
    /// | [`IllegalArgument`] | if the passed address buffer isn't valid, in memory, etc.      |
    @external("self", "self_destruct")
    export declare function self_destruct(addr_off: isize, addr_len: u32) : isize;
}
