export namespace gas {
    // #######
    // # Gas #
    // #######

    /**
     * Charge gas.
     *
     * @arguments
     *
     * - `name_off` and `name_len` specify the location and length of the "name" of the gas charge,
     *   for debugging.
     * - `amount` is the amount of gas to charge.
     *
     * @param name_off 
     * @param name_len 
     * @param amount 
     * 
     * @errors
     *
     * | Error               | Reason               |
     * |---------------------|----------------------|
     * | [`IllegalArgument`] | invalid name buffer. |
     */
    @external("gas", "charge")
    export declare function charge(name_off: isize, name_len: u32, amount: u64): isize;
}
