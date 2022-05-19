// Exit codes which originate inside the VM.
// These values may not be used by actors when aborting.

/// The code indicating successful execution.
export const OK: u32 = 0
/// Indicates the message sender doesn't exist.
export const SYS_SENDER_INVALID: u32 = 1
/// Indicates that the message sender was not in a valid state to send this message.
/// Either:
/// - The sender's nonce nonce didn't match the message nonce.
/// - The sender didn't have the funds to cover the message gas.
export const SYS_SENDER_STATE_INVALID: u32 = 2
/// Indicates failure to find a method in an actor.
export const SYS_INVALID_METHOD: u32 = 3 // FIXME: reserved
/// Indicates the message receiver trapped (panicked).
export const SYS_ILLEGAL_INSTRUCTION: u32 = 4
/// Indicates the message receiver doesn't exist and can't be automatically created
export const SYS_INVALID_RECEIVER: u32 = 5
/// Indicates the message sender didn't have the requisite funds.
export const SYS_INSUFFICIENT_FUNDS: u32 = 6
/// Indicates message execution (including subcalls) used more gas than the specified limit.
export const SYS_OUT_OF_GAS: u32 = 7
// SYS_RESERVED_8: u32 = ExitCode::new(8);
/// Indicates the message receiver aborted with a reserved exit code.
export const SYS_ILLEGAL_EXIT_CODE: u32 = 9
/// Indicates an internal VM assertion failed.
export const SYS_ASSERTION_FAILED: u32 = 10
/// Indicates the actor returned a block handle that doesn't exist
export const SYS_MISSING_RETURN: u32 = 11

// export const SYS_RESERVED_12: u32 = 12;
// export const SYS_RESERVED_13: u32 = 13;
// export const SYS_RESERVED_14: u32 = 14;
// export const SYS_RESERVED_15: u32 = 15;

/// The lowest exit code that an actor may abort with.
export const FIRST_USER_EXIT_CODE: u32 = 16

// Standard exit codes according to the built-in actors' calling convention.
/// Indicates a method parameter is invalid.
export const USR_ILLEGAL_ARGUMENT: u32 = 16
/// Indicates a requested resource does not exist.
export const USR_NOT_FOUND: u32 = 17
/// Indicates an action is disallowed.
export const USR_FORBIDDEN: u32 = 18
/// Indicates a balance of funds is insufficient.
export const USR_INSUFFICIENT_FUNDS: u32 = 19
/// Indicates an actor's internal state is invalid.
export const USR_ILLEGAL_STATE: u32 = 20
/// Indicates de/serialization failure within actor code.
export const USR_SERIALIZATION: u32 = 21
/// Indicates the actor cannot handle this message.
export const USR_UNHANDLED_MESSAGE: u32 = 22
/// Indicates the actor failed with an unspecified error.
export const USR_UNSPECIFIED: u32 = 23
/// Indicates the actor failed a user-level assertion
export const USR_ASSERTION_FAILED: u32 = 24

// export const RESERVED_25: u32 = 25
// export const RESERVED_26: u32 = 26
// export const RESERVED_27: u32 = 27
// export const RESERVED_28: u32 = 28
// export const RESERVED_29: u32 = 29
// export const RESERVED_30: u32 = 30
// export const RESERVED_31: u32 = 31

