---
title: Milestone 2
sidebar_position: 3
---

## Assumptions/Pre-Requirements

This phase requires a close collaboration with the Assemblyscript team; it would also be valuable to collaborate with NEAR (they are pioneers in this area). A detailed planning of meetings shall be agreed at the project setup.

Development of additional libraries (eg. c-bor library for storage) and access to certain resources is required.

The availability of these pre-requirements is mandatory to acomplish the Milestone 2. A close collaboration between the parties may avoid any delay.

## Technical Scope

- Create data structures using FVM basic methods: arrays, maps, queues, calls to other contracts, and more.
- Create utility packages
- Filecoin address support (AssemblyScript)
- Common maths operations for FVM

## Deliverables

Both data structures and utilities packages:

AssemblyScript SDK v0.2:

### Technical
| Category               | Subcategory  | Description                         | Link                                                                                              |
|------------------------|--------------|-------------------------------------|---------------------------------------------------------------------------------------------------|
| Utils functions        | -            | Params parser                       | [:link:](https://github.com/Zondax/fvm-as-sdk/tree/master/assembly/utils/params)                  |
| Utils functions        | -            | Address type                        | [:link:](https://github.com/Zondax/fvm-as-sdk/tree/master/assembly/utils/address)                 |
| Tooling/user assistant | -            | Invoke function generator           | [:link:](https://github.com/Zondax/fvm-as-bindgen/blob/master/src/codegen/invoke/index.ts)        |
| Tooling/user assistant | -            | State serialization/deserialization | [:link:](https://github.com/Zondax/fvm-as-bindgen/blob/master/src/codegen/state/index.ts)         |
| Tooling/user assistant | -            | State save/load from storage        | [:link:](https://github.com/Zondax/fvm-as-sdk/blob/master/assembly/utils/state/index.ts)          |
| Tooling/user assistant | -            | CBOR library to encode/decode       | [:link:](https://github.com/Zondax/assemblyscript-cbor)                                           |
| Benchmarking           | -            | Gas consumption                     | [:link:](https://github.com/Zondax/fil-hello-world-actor-as/blob/master/benchmarking/src/main.rs) |
| Benchmarking           | -            | File size                           | [:link:](https://github.com/Zondax/fil-hello-world-actor-as/blob/master/benchmarking/src/main.rs) |
| Testing                | CI workflows | From Jest RPC calls                 | [:link:](https://github.com/Zondax/fil-hello-world-actor-as/tree/master/tests/rpc)                |
| Testing                | CI workflows | From Webpage                        | [:link:](https://github.com/Zondax/fil-hello-world-actor-as/tree/master/tests/browser)            |
| Testing                | CI workflows | From Benchmarking                   | [:link:](https://github.com/Zondax/fil-hello-world-actor-as/tree/master/tests/local-vm)           |


### Documentation
| Category               | Subcategory  | Description                         | Link                                                                                              |
|------------------------|--------------|-------------------------------------|---------------------------------------------------------------------------------------------------|
| Docs                   | Use cases    | ERC20                               | [:link:](https://github.com/Zondax/fvm-as-sdk/blob/master/docs/examples/erc20.md)                 |
| Docs                   | Use cases    | FNS                                 | [:link:](https://github.com/Zondax/fvm-as-sdk/blob/master/docs/examples/fns.md)                   |
| Snippets               | -            | New project                         | [:link:](https://github.com/Zondax/fvm-as-sdk/blob/master/docs/start-coding/new_project.md)       |
| Snippets               | -            | Start coding                        | [:link:](https://github.com/Zondax/fvm-as-sdk/blob/master/docs/start-coding/start_coding.md)      |
| Snippets               | -            | Build project                       | [:link:](https://github.com/Zondax/fvm-as-sdk/blob/master/docs/start-coding/build_project.md)     |
