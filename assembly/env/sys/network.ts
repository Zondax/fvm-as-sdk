export namespace network{

    // ###########
    // # Network #
    // ###########

    /**
     * Gets the base fee for the current epoch.
     *
     * @param respPtr 
     * 
     * @errors None
     */
    @external("network", "base_fee")
    export declare function baseFee(respPtr: isize): isize;

    /**
     * Gets the circulating supply.
     *
     * @param respPtr 
     * @errors None
     */
    @external("network", "total_fil_circ_supply")
    export declare function totalFilCircSupply(respPtr: isize): isize;
}
