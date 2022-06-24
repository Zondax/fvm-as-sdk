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
    /// | [`NotFound`]        | if the target actor does not exist                        |
    /// | [`IllegalArgument`] | if the passed address buffer isn't valid, in memory, etc. |
    @external("actor", "resolve_address")
    export declare function resolve_address(respPrt: isize, addr_off: isize, addr_len: u32): isize;

    /// Gets the CodeCID of an actor by address.
    ///
    /// # Arguments
    ///
    /// - `actor_id` is the resolved ID of the target actor.
    /// - `obuf_off` and `obuf_len` specify the location and length of a byte buffer into which the
    ///   FVM will write the actor's code CID, if the actor is found.
    ///
    /// # Returns
    ///
    /// The length of the CID.
    ///
    /// # Errors
    ///
    /// | Error               | Reason                                                    |
    /// |---------------------|-----------------------------------------------------------|
    /// | [`NotFound`]        | if the target actor does not exist                        |
    /// | [`BufferTooSmall`]  | if the output buffer isn't large enough to fit the CID    |
    /// | [`IllegalArgument`] | if the passed address buffer isn't valid, in memory, etc. |
    @external("actor", "get_actor_code_cid")
    export declare function get_actor_code_cid(respPrt: isize, actor_id: u64, obuf_off: isize, obuf_len: u32): isize;

    /// Gets the CodeCID of an actor by address.
    ///
    /// # Arguments
    ///
    /// - `actor_id` is the resolved ID of the target actor.
    /// - `obuf_off` and `obuf_len` specify the location and length of a byte buffer into which the
    ///   FVM will write the actor's code CID, if the actor is found.
    ///
    /// # Returns
    ///
    /// The length of the CID.
    ///
    /// # Errors
    ///
    /// | Error               | Reason                                                    |
    /// |---------------------|-----------------------------------------------------------|
    /// | [`NotFound`]        | if the target actor does not exist                        |
    /// | [`BufferTooSmall`]  | if the output buffer isn't large enough to fit the CID    |
    /// | [`IllegalArgument`] | if the passed address buffer isn't valid, in memory, etc. |
    @external("actor", "get_builtin_actor_type")
    export declare function get_builtin_actor_type(respPrt: isize, cid_off: isize): isize;

    /// Returns the CodeCID for the given built-in actor type.
    ///
    /// # Arguments
    ///
    /// - `typ` specifies the builtin-actor [`Type`] to lookup.
    /// - `obuf_off` and `obuf_len` specify the location and length of a byte buffer into which the
    ///   FVM will write the s code CID.
    ///
    /// # Returns
    ///
    /// The length of the code CID.
    ///
    /// # Errors
    ///
    /// | Error               | Reason                                                          |
    /// |---------------------|-----------------------------------------------------------------|
    /// | [`IllegalArgument`] | if the type is invalid, or the outupt buffer isn't large enough |
    @external("actor", "get_code_cid_for_type")
    export declare function get_code_cid_for_type(respPrt: isize, typ: i32, obuf_off: isize, obuf_len: isize): isize;

    /// Generates a new actor address for an actor deployed
    /// by the calling actor.
    ///
    /// **Privledged:** May only be called by the init actor.
    @external("actor", "new_actor_address")
    export declare function new_actor_address(respPrt: isize, obuf_off: isize, obuf_len: u32): isize;

    /// Creates a new actor of the specified type in the state tree, under
    /// the provided address.
    ///
    /// **Privledged:** May only be called by the init actor.
    @external("actor", "create_actor")
    export declare function create_actor(actor_id: u64, typ_off: isize): isize;
}
