export namespace crypto{
    // ###########
    // # Crypto #
    // ###########


    /// Verifies that a signature is valid for an address and plaintext.
    ///
    /// Returns 0 on success, or -1 if the signature fails to validate.
    ///
    /// # Arguments
    ///
    /// - `sig_off` and `sig_len` specify location and length of the signature.
    /// - `addr_off` and `addr_len` specify location and length of expected signer's address.
    /// - `plaintext_off` and `plaintext_len` specify location and length of the signed data.
    ///
    /// # Errors
    ///
    /// | Error               | Reason                                               |
    /// |---------------------|------------------------------------------------------|
    /// | [`IllegalArgument`] | signature, address, or plaintext buffers are invalid |
    @external("crypto", "verify_signature")
    export declare function verify_signature(
        respPtr: isize,
        sig_off: isize,
        sig_len: u32,
        addr_off: isize,
        addr_len: u32,
        plaintext_off: isize,
        plaintext_len: u32,
    ) :isize;

    /// Hashes input data using blake2b with 256 bit output.
    ///
    /// Returns a 32-byte hash digest.
    ///
    /// # Arguments
    ///
    /// - `data_off` and `data_len` specify location and length of the data to be hashed.
    ///
    /// # Errors
    ///
    /// | Error               | Reason                                          |
    /// |---------------------|-------------------------------------------------|
    /// | [`IllegalArgument`] | the input buffer does not point to valid memory |
    @external("crypto", "hash_blake2b")
    export declare function hash_blake2b(
        respPtr:isize,
        data_off: isize,
        data_len: u32,
    ) :isize;

    /// Computes an unsealed sector CID (CommD) from its constituent piece CIDs
    /// (CommPs) and sizes.
    ///
    /// Writes the CID in the provided output buffer, and returns the length of
    /// the written CID.
    ///
    /// # Arguments
    ///
    /// - `proof_type` is the type of seal proof.
    /// - `pieces_off` and `pieces_len` specify the location and length of a cbor-encoded list of
    ///   [`PieceInfo`][fvm_shared::piece::PieceInfo] in tuple representation.
    /// - `cid_off` is the offset at which the computed CID will be written.
    /// - `cid_len` is the size of the buffer at `cid_off`. 100 bytes is guaranteed to be enough.
    ///
    /// # Errors
    ///
    /// | Error               | Reason                   |
    /// |---------------------|--------------------------|
    /// | [`IllegalArgument`] | an argument is malformed |
    @external("crypto", "compute_unsealed_sector_cid")
    export declare function compute_unsealed_sector_cid(
        resp_off: isize,
        proof_type: i64,
        pieces_off: isize,
        pieces_len: u32,
        cid_off: isize,
        cid_len: u32,
    ) :isize;

    /// Verifies a sector seal proof.
    ///
    /// Returns 0 to indicate that the proof was valid, -1 otherwise.
    ///
    /// # Arguments
    ///
    /// `info_off` and `info_len` specify the location and length of a cbor-encoded
    /// [`SealVerifyInfo`][fvm_shared::sector::SealVerifyInfo] in tuple representation.
    ///
    /// # Errors
    ///
    /// | Error               | Reason                   |
    /// |---------------------|--------------------------|
    /// | [`IllegalArgument`] | an argument is malformed |
    @external("crypto", "verify_seal")
    export declare function verify_seal(resp_ptr:isize, info_off: isize, info_len: u32) :isize;

    /// Verifies a window proof of spacetime.
    ///
    /// Returns 0 to indicate that the proof was valid, -1 otherwise.
    ///
    /// # Arguments
    ///
    /// `info_off` and `info_len` specify the location and length of a cbor-encoded
    /// [`WindowPoStVerifyInfo`][fvm_shared::sector::WindowPoStVerifyInfo] in tuple representation.
    ///
    /// # Errors
    ///
    /// | Error               | Reason                   |
    /// |---------------------|--------------------------|
    /// | [`IllegalArgument`] | an argument is malformed |
    @external("crypto", "verify_post")
    export declare function verify_post(resp_ptr:isize, info_off: isize, info_len: u32) :isize;

    /// Verifies that two block headers provide proof of a consensus fault.
    ///
    /// Returns a 0 status if a consensus fault was recognized, along with the
    /// BlockId containing the fault details. Otherwise, a -1 status is returned,
    /// and the second result parameter must be ignored.
    ///
    /// # Arguments
    ///
    /// - `h1_off`/`h1_len` and `h2_off`/`h2_len` specify the location and length of the block
    ///   headers that allegedly represent a consensus fault.
    /// - `extra_off` and `extra_len` specifies the "extra data" passed in the
    ///   `ReportConsensusFault` message.
    ///
    /// # Errors
    ///
    /// | Error               | Reason                                |
    /// |---------------------|---------------------------------------|
    /// | [`LimitExceeded`]   | exceeded lookback limit finding block |
    /// | [`IllegalArgument`] | an argument is malformed              |
    @external("crypto", "verify_consensus_fault")
    export declare function verify_consensus_fault(
        resp_ptr: isize,
        h1_off: isize,
        h1_len: u32,
        h2_off: isize,
        h2_len: u32,
        extra_off: isize,
        extra_len: u32,
    ) : isize;

    /// Verifies an aggregated batch of sector seal proofs.
    ///
    /// Returns 0 to indicate that the proof was valid, -1 otherwise.
    ///
    /// # Arguments
    ///
    /// `agg_off` and `agg_len` specify the location and length of a cbor-encoded
    /// [`AggregateSealVerifyProofAndInfos`][fvm_shared::sector::AggregateSealVerifyProofAndInfos]
    /// in tuple representation.
    ///
    /// # Errors
    ///
    /// | Error               | Reason                         |
    /// |---------------------|--------------------------------|
    /// | [`LimitExceeded`]   | exceeds seal aggregation limit |
    /// | [`IllegalArgument`] | an argument is malformed       |
    @external("crypto", "verify_aggregate_seals")
    export declare function verify_aggregate_seals(resp_ptr:isize, agg_off: isize, agg_len: u32) :isize;

    /// Verifies a replica update proof.
    ///
    /// Returns 0 to indicate that the proof was valid, -1 otherwise.
    ///
    /// # Arguments
    ///
    /// `rep_off` and `rep_len` specify the location and length of a cbor-encoded
    /// [`ReplicaUpdateInfo`][fvm_shared::sector::ReplicaUpdateInfo] in tuple representation.
    ///
    /// # Errors
    ///
    /// | Error               | Reason                        |
    /// |---------------------|-------------------------------|
    /// | [`LimitExceeded`]   | exceeds replica update limit  |
    /// | [`IllegalArgument`] | an argument is malformed      |
    @external("crypto", "verify_replica_update")
    export declare function verify_replica_update(resp_ptr: isize, rep_off: isize, rep_len: u32) :isize;

    /// Verifies a batch of sector seal proofs.
    ///
    /// # Arguments
    ///
    /// - `batch_off` and `batch_len` specify the location and length of a cbor-encoded list of
    ///   [`SealVerifyInfo`][fvm_shared::sector::SealVerifyInfo] in tuple representation.
    /// - `results_off` specifies the location of a length `L` byte buffer where the results of the
    ///   verification will be written, where `L` is the number of proofs in the batch. For each
    ///   proof in the input list (in input order), a 1 or 0 byte will be written on success or
    ///   failure, respectively.
    ///
    /// # Errors
    ///
    /// | Error               | Reason                   |
    /// |---------------------|--------------------------|
    /// | [`IllegalArgument`] | an argument is malformed |
    @external("crypto", "batch_verify_seals")
    export declare function batch_verify_seals(batch_off: isize, batch_len: u32, result_off: isize): isize;
}
