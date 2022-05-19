export namespace network{

    // ###########
    // # Network #
    // ###########

    /// Gets the current epoch.
    ///
    /// # Errors
    ///
    /// None
    @external("network", "curr_epoch")
    export declare function curr_epoch(respPtr: isize): isize;

    /// Gets the network version.
    ///
    /// # Errors
    ///
    /// None
    @external("network", "version")
    export declare function version(respPtr:isize): isize;

    /// Gets the base fee for the current epoch.
    ///
    /// # Errors
    ///
    /// None
    @external("network", "base_fee")
    export declare function base_fee(respPtr: isize): isize;

    /// Gets the circulating supply.
    ///
    /// # Errors
    ///
    /// None
    @external("network", "total_fil_circ_supply")
    export declare function total_fil_circ_supply(respPtr: isize): isize;
}
