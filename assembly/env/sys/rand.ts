export namespace rand{
    // ###########
    // # Rand #
    // ###########

    /**
     * Gets 32 bytes of randomness from the ticket chain.
     *
     * @arguments
     *
     * - `tag` is the "domain separation tag" for distinguishing between different categories of
     *    randomness. Think of it like extra, structured entropy.
     * - `epoch` is the epoch to pull the randomness from.
     * - `entropy_off` and `entropy_len` specify the location and length of the entropy buffer that
     *    will be mixed into the system randomness.
     * 
     * @param resp_ptt 
     * @param tag 
     * @param epoch 
     * @param entropy_off 
     * @param entropy_len 
     *
     * @errors
     *
     * | Error               | Reason                  |
     * |---------------------|-------------------------|
     * | [`LimitExceeded`]   | lookback exceeds limit. |
     * | [`IllegalArgument`] | invalid buffer, etc.    |
     */
    @external("rand", "get_chain_randomness")
    export declare function getChainRandomness(
        resp_ptt: isize,
        tag: i64,
        epoch: i64,
        entropy_off: isize,
        entropy_len: u32,
    ): isize;

    /**
     * Gets 32 bytes of randomness from the beacon system (currently Drand).
     * @param resp_ptr 
     * @param tag is the "domain separation tag" for distinguishing between different categories of
     * randomness. Think of it like extra, structured entropy.h 
     * @param epoc is the epoch to pull the randomness from.
     * @param entropy_off specify the location of entropy buffer that will be mixed into the system randomness
     * @param entropy_len specify the length of entropy buffer
     *
     * @remarks
     * Errors
     *
     * | Error               | Reason                  |
     * |---------------------|-------------------------|
     * | [`LimitExceeded`]   | lookback exceeds limit. |
     * | [`IllegalArgument`] | invalid buffer, etc.    |
     */
    @external("rand", "get_beacon_randomness")
    export declare function getBeaconRandomness(
        resp_ptr: isize,
        tag: i64,
        epoch: i64,
        entropy_off: isize,
        entropy_len: u32,
    ) :isize;
}
