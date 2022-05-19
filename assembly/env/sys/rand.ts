export namespace rand{
    // ###########
    // # Rand #
    // ###########

    /// Gets 32 bytes of randomness from the ticket chain.
    ///
    /// # Arguments
    ///
    /// - `tag` is the "domain separation tag" for distinguishing between different categories of
    ///    randomness. Think of it like extra, structured entropy.
    /// - `epoch` is the epoch to pull the randomness from.
    /// - `entropy_off` and `entropy_len` specify the location and length of the entropy buffer that
    ///    will be mixed into the system randomness.
    ///
    /// # Errors
    ///
    /// | Error               | Reason                  |
    /// |---------------------|-------------------------|
    /// | [`LimitExceeded`]   | lookback exceeds limit. |
    /// | [`IllegalArgument`] | invalid buffer, etc.    |
    @external("rand", "get_chain_randomness")
    export declare function get_chain_randomness(
        resp_ptt: isize,
        tag: i64,
        epoch: i64,
        entropy_off: isize,
        entropy_len: u32,
    ): isize;

    /// Gets 32 bytes of randomness from the beacon system (currently Drand).
    ///
    /// # Arguments
    ///
    /// - `tag` is the "domain separation tag" for distinguishing between different categories of
    ///    randomness. Think of it like extra, structured entropy.
    /// - `epoch` is the epoch to pull the randomness from.
    /// - `entropy_off` and `entropy_len` specify the location and length of the entropy buffer that
    ///    will be mixed into the system randomness.
    ///
    /// # Errors
    ///
    /// | Error               | Reason                  |
    /// |---------------------|-------------------------|
    /// | [`LimitExceeded`]   | lookback exceeds limit. |
    /// | [`IllegalArgument`] | invalid buffer, etc.    |
    @external("rand", "get_beacon_randomness")
    export declare function get_beacon_randomness(
        resp_ptr: isize,
        tag: i64,
        epoch: i64,
        entropy_off: isize,
        entropy_len: u32,
    ) :isize;
}
