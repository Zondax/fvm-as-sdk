export namespace actor {
    // #########
    // # Actor #
    // #########

    /// Resolves the ID address of an actor.
    ///
    /// # Arguments
    ///
    /// `addr_off` and `addr_len` specify the location and length of an address to be resolved.
    ///
    /// # Errors
    ///
    /// | Error               | Reason                                                    |
    /// |---------------------|-----------------------------------------------------------|
    /// | [`IllegalArgument`] | if the passed address buffer isn't valid, in memory, etc. |
    @external("actors", "resolve_address")
    export declare function resolve_address(respPrt: isize, addr_off: isize, addr_len: u32): isize;

    /// Gets the CodeCID of an actor by address.
    ///
    /// # Arguments
    ///
    /// - `addr_off` and `addr_len` specify the location and length of an address of the target
    ///   actor.
    /// - `obuf_off` and `obuf_len` specify the location and length of a byte buffer into which the
    ///   FVM will write the actor's code CID, if the actor is found. If the
    ///
    /// # Errors
    ///
    /// | Error               | Reason                                                    |
    /// |---------------------|-----------------------------------------------------------|
    /// | [`IllegalArgument`] | if the passed address buffer isn't valid, in memory, etc. |
    @external("actors", "get_actor_code_cid")
    export declare function get_actor_code_cid(respPrt: isize, addr_off: isize, addr_len: u32, obuf_off: isize, obuf_len: u32): isize;

    /// Determines whether the specified CodeCID belongs to that of a builtin
    /// actor and which. Returns 0 if unrecognized. Can only fail due to
    /// internal errors.
    @external("actors", "resolve_builtin_actor_type")
    export declare function resolve_builtin_actor_type(respPrt: isize, cid_off: isize): isize;

    /// Returns the CodeCID for the given built-in actor type. Aborts with exit
    /// code IllegalArgument if the supplied type is invalid. Returns the
    /// length of the written CID written to the output buffer. Can only
    /// return a failure due to internal errors.
    @external("actors", "get_code_cid_for_type")
    export declare function get_code_cid_for_type(respPrt: isize, typ: i32, obuf_off: isize, obuf_len: u32): isize;

    /// Generates a new actor address for an actor deployed
    /// by the calling actor.
    ///
    /// **Privledged:** May only be called by the init actor.
    @external("actors", "new_actor_address")
    export declare function new_actor_address(respPrt: isize, obuf_off: isize, obuf_len: u32): isize;

    /// Creates a new actor of the specified type in the state tree, under
    /// the provided address.
    ///
    /// **Privledged:** May only be called by the init actor.
    @external("actors", "create_actor")
    export declare function create_actor(actor_id: u64, typ_off: isize): isize;
}
