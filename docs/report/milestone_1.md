---
title: Milestone 1
sidebar_position: 2
---

## Deliverables

This AssemblyScript SDK version includes the following features:

### Technical
| Category           | Subcategory | Description                                                                            | Link                                                                                             |
|--------------------|-------------|----------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|
| Syscall definition | -           | Declaration of external functions provided by FVM                                      | [:link:](https://github.com/Zondax/fvm-as-sdk/tree/master/assembly/env/sys)                      |
| Error codes        | -           | List each error code provided by FVM                                                   | [:link:](https://github.com/Zondax/fvm-as-sdk/blob/master/assembly/env/errors.ts)                |
| Constants          | -           | Each constant relevant to FVM                                                          | [:link:](https://github.com/Zondax/fvm-as-sdk/blob/master/assembly/env/constants.ts)             |
| Wrapper functions  | -           | Wrapper functions used to pass arguments and read the response from syscalls           | [:link:](https://github.com/Zondax/fvm-as-sdk/tree/master/assembly/wrappers)                     |
| Helpers functions  | -           | Used to achieve some functionality by calling a series of wrapper or syscall functions | [:link:](https://github.com/Zondax/fvm-as-sdk/tree/master/assembly/helpers)                      |
| Utils functions    | Cid         | Cid parser                                                                             | [:link:](https://github.com/Zondax/fvm-as-sdk/tree/master/assembly/utils/cid)                    |
| Utils functions    | State       | Base state type                                                                        | [:link:](https://github.com/Zondax/fvm-as-sdk/tree/master/assembly/utils/state)                  |

### Documentation 
| Category | Subcategory  | Description                      | Link                                                                                                              |
|----------|--------------|----------------------------------|-------------------------------------------------------------------------------------------------------------------|
| Docs     | General      | What is the Filecoin blockchain? | [:link:](https://github.com/Zondax/fvm-as-sdk/blob/master/docs/filecoin/filecoin.md)                              |
| Docs     | General      | What is the FVM?                 | [:link:](https://github.com/Zondax/fvm-as-sdk/blob/master/docs/filecoin/fvm.md#what-is-the-fvm)                   |
| Docs     | General      | FVM architecture                 | [:link:](https://github.com/Zondax/fvm-as-sdk/blob/master/docs/filecoin/fvm.md#fvm-architecture)                  |
| Docs     | General      | What is WebAssembly?             | [:link:](https://github.com/Zondax/fvm-as-sdk/blob/master/docs/related-tools/webassembly.md)                      |
| Docs     | General      | What is AssemblyScript?          | [:link:](https://github.com/Zondax/fvm-as-sdk/blob/master/docs/related-tools/assemblyscript.md)                   |
| Docs     | General      | What is AssemblyScript SDK?      | [:link:](https://github.com/Zondax/fvm-as-sdk/blob/master/docs/filecoin/fvm.md#fvm-architecture)                  |
| Docs     | SDK          | Structure                        | [:link:](https://github.com/Zondax/fvm-as-sdk/blob/master/docs/sdk/structure.md)                                  |
| Docs     | SDK          | How to start?                    | [:link:](https://github.com/Zondax/fvm-as-sdk/blob/master/docs/sdk/how-to-start.md)                               |
| Docs     | SDK          | How to use it?                   | [:link:](https://github.com/Zondax/fvm-as-sdk/blob/master/docs/sdk/use-it.md)                                     |
| Docs     | SDK          | How to run it?                   | [:link:](https://github.com/Zondax/fvm-as-sdk/blob/master/docs/sdk/run-it.md)                                     |
| Docs     | SDK          | How to test it?                  | [:link:](https://github.com/Zondax/fvm-as-sdk/blob/master/docs/sdk/test-it.md)                                    |
| Docs     | Use cases    | Hello world                      | [:link:](https://github.com/Zondax/fvm-as-sdk/blob/master/docs/examples/hello-world.md)                           |
| Testing  | CI workflows | Local Rust VM                    | [:link:](https://github.com/Zondax/fil-hello-world-actor-as/blob/master/.github/workflows/main.yaml)              |
| Testing  | CI workflows | From Lotus terminal              | [:link:](https://github.com/Zondax/fil-hello-world-actor-as/blob/master/.github/workflows/main.yaml)              |
