---
title: "Using integration test module to test your actor in FVM"
sidebar_position: 6
---

To help testing your application without deploying a node you can use the rust (Integration test module)[https://github.com/filecoin-project/ref-fvm/tree/master/testing/integration]. It requires to have Rust 🦀 and be a bit familiar with it.

### Install rust

Follow [the official rust instruction](https://www.rust-lang.org/tools/install).

### Local FVM in rust

In your project you can create a folder claled `testing` where we are going to write our tests.

```
mkdir testing
cd testing
cargo init
```

In `Cargo.toml` add those dependencies (you might need to upgrade the function)

```rs
[dependencies]
fvm_ipld_blockstore = { version = "0.1.1", git = "https://github.com/filecoin-project/ref-fvm", branch = "experimental/fvm-m2" }
fvm_integration_tests = { version = "0.1.0", git = "https://github.com/filecoin-project/ref-fvm", branch = "experimental/fvm-m2" }
fvm_shared = { version = "0.7.1", git = "https://github.com/filecoin-project/ref-fvm", branch = "experimental/fvm-m2" }
fvm = { version = "1.0.0-rc.2", git = "https://github.com/filecoin-project/ref-fvm", branch = "experimental/fvm-m2", default-features = false }
fvm_ipld_encoding = { version = "0.2.1", git = "https://github.com/filecoin-project/ref-fvm", branch = "experimental/fvm-m2" }

serde = { version = "1.0", features = ["derive"] }
serde_tuple = "0.5"
wabt = "0.10.0"
hex = "0.4.3"
```

If it id not working you might need to patch some lib as FVM is still in development.

```rs
[patch.crates-io]
fvm_ipld_encoding = { version = "0.2.1", git = "https://github.com/filecoin-project/ref-fvm", branch = "experimental/fvm-m2" }
fvm_ipld_hamt = { version = "0.5.1", git = "https://github.com/filecoin-project/ref-fvm", branch = "experimental/fvm-m2" }
fvm_ipld_amt = { version = "0.4.1", git = "https://github.com/filecoin-project/ref-fvm", branch = "experimental/fvm-m2" }
fvm_shared = { version = "0.7.1", git = "https://github.com/filecoin-project/ref-fvm", branch = "experimental/fvm-m2" }
fvm_ipld_blockstore = { version = "0.1.1", git = "https://github.com/filecoin-project/ref-fvm", branch = "experimental/fvm-m2" }
```

Now let's check our `src/main.rs` file where we are going to run our actor in the rust FVM.

```rs
use fvm_integration_tests::tester::{Account, Tester};
use fvm_shared::message::Message;
use fvm_shared::state::StateTreeVersion;
use fvm_shared::version::NetworkVersion;
use fvm::executor::{ApplyKind, Executor};
use fvm_ipld_blockstore::MemoryBlockstore;
use fvm_ipld_blockstore::Blockstore;
use fvm_ipld_encoding::tuple::*;
use fvm_shared::address::Address;
use fvm_shared::bigint::BigInt;
use std::env;

const WASM_COMPILED_PATH: &str =
    "../../build/release-final.wasm";

/// The state object.
#[derive(Serialize_tuple, Deserialize_tuple, Clone, Debug, Default)]
pub struct State {
    pub count: u64,
}

fn main() {
    println!("tests/local-vm Hello World contract in assembly script");

    let mut tester = Tester::new(
        NetworkVersion::V16,
        StateTreeVersion::V4,
        MemoryBlockstore::default(),
    )
    .unwrap();

    // Create sender account
    let sender: [Account; 1] = tester.create_accounts().unwrap();

    // Load wasm file
    let wasm_path = env::current_dir()
    .unwrap()
    .join(WASM_COMPILED_PATH)
    .canonicalize()
    .unwrap();
    let wasm_bin = std::fs::read(wasm_path).expect("Unable to read file");

    // Set our actor state 
    let actor_state = State { count: 0 };
    let state_cid = tester.set_state(&actor_state).unwrap();

    // Set actor
    let actor_address = Address::new_id(10000);

    tester
        .set_actor_from_bin(&wasm_bin, state_cid, actor_address, BigInt::default())
        .unwrap();

    let actor = tester.state_tree.as_ref().unwrap().get_actor(&actor_address).unwrap().unwrap();
    let state = tester.blockstore().clone().get(&actor.state).unwrap();
    println!("Cbor hex state : {}", hex::encode(state.unwrap()));

    // Instantiate machine
    tester.instantiate_machine().unwrap();

    println!("Calling `say_hello`");
    let message = Message {
        from: sender[0].1,
        to: actor_address,
        gas_limit: 1000000000,
        method_num: 2,
        ..Message::default()
    };

    let res = tester
    .executor
    .unwrap()
    .execute_message(message, ApplyKind::Explicit, 100)
    .unwrap();

    dbg!(&res);

    assert_eq!(res.msg_receipt.exit_code.value(), 0);
}

```



This part determine the wasm file path to load.
```rs
const WASM_COMPILED_PATH: &str =
    "../../build/release-final.wasm";
```

You will need to update the State struct so it fit your actor State.
```rs
/// The state object.
#[derive(Serialize_tuple, Deserialize_tuple, Clone, Debug, Default)]
pub struct State {
    pub count: u64,
}
```
Hello Actor has a state with only a counter in it.


## Run your test

```
$ cargo run
```
