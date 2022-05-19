export namespace gas {
    // #######
    // # Gas #
    // #######

    /// Charge gas.
    ///
    /// # Arguments
    ///
    /// - `name_off` and `name_len` specify the location and length of the "name" of the gas charge,
    ///   for debugging.
    /// - `amount` is the amount of gas to charge.
    ///
    /// # Errors
    ///
    /// | Error               | Reason               |
    /// |---------------------|----------------------|
    /// | [`IllegalArgument`] | invalid name buffer. |
    @external("gas", "charge")
    export declare function charge(name_off: isize, name_len: u32, amount: u64): isize;
}
