export namespace message{
    // ###########
    // # Message #
    // ###########

    /// Returns the caller's actor ID.
    ///
    /// # Errors
    ///
    /// None
    @external("message", "caller")
    export declare function caller(respPrt: isize): isize;

    /// Returns the receiver's actor ID (i.e. ourselves).
    ///
    /// # Errors
    ///
    /// None
    @external("message", "receiver")
    export declare function receiver(rspPrt: isize): isize;

    /// Returns the method number from the message.
    ///
    /// # Errors
    ///
    /// None
    @external("message", "method_number")
    export declare function method_number(rspPrt: isize): isize;

    /// Returns the value that was received.
    ///
    /// # Errors
    ///
    /// None
    @external("message", "value_received")
    export declare function value_received(respPtr: isize): isize;
}
