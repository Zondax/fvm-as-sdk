export namespace debug{
    // ###########
    // # Debug #
    // ###########

    /// Returns if we're in debug mode. A zero or positive return value means
    /// yes, a negative return value means no.
    @external("debug", "enabled")
    export declare function enabled(resp_ptr: isize):isize;

    /// Logs a message on the node.
    @external("debug", "log")
    export declare function log(message: isize, message_len: u32):isize;
}
