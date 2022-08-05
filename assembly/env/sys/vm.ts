export namespace vm{
    // ###########
    // # Vm #
    // ###########


    /**
     * Abort execution with the given code and message. The code is recorded in the receipt, the
     * message is for debugging only.
     *
     * @arguments
     *
     * - `code` is the [`ExitCode`][fvm_shared::error::ExitCode] to abort with. If this code is
     *   less than the [minimum "user" exit
     *   code][fvm_shared::error::ExitCode::FIRST_USER_EXIT_CODE], it will be replaced with
     *   [`SYS_ILLEGAL_EXIT_CODE`][fvm_shared::error::ExitCode::SYS_ILLEGAL_EXIT_CODE].
     * - `message_off` and `message_len` specify the offset and length (in wasm memory) of an
     *   optional debug message associated with this abort. These parameters may be null/0 and will
     *   be ignored if invalid.
     *
     * 
     * @param code 
     * @param message_off 
     * @param message_len 
     * 
     * @errors None. This function doesn't return.
     */
    @external("vm", "abort")
    export declare function abort(code: u32, message_off: isize, message_len: u32):isize;

    /**
     * Returns the details about this invocation.
     * 
     * @param resp_ptr 
     * 
     * @errors None
     */
    @external("vm", "context")
    export declare function context(resp_ptr: isize): isize;
}
