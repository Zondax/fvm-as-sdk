---
title: "Introduction"
sidebar_position: 1
---
:::info The following project has been funded by the [Filecoin Foundation](https://fil.org).

<img src={require('../assets/fil_foundation.png').default} alt="drawing" width="300" />

:::

### What is the Filecoin blockchain?
Filecoin is making the web more secure and efficient with a decentralized data storage marketplace, protocol, and cryptocurrency.
It is a blockchain-based cooperative digital storage and data retrieval method, allowing users to rent unused hard drive space.

For more information, please refer to the [Filecoin web page](https://filecoin.io).

### What is the FVM?
Filecoin today lacks general programmability. As a result, it is not possible to deploy user-defined behaviour, or "smart contracts", to the blockchain. The goal of the FVM project is to add general programmability to the Filecoin blockchain.
They predict this will unleash a proliferation of new services and tools that can be built and deployed to the Filecoin network, without requiring network upgrades, involvement from core implementation maintainers, changes in the embedded actors, or spec alterations.

For more information, please refer to the FVM Specs [context-and-goals web page](https://github.com/filecoin-project/fvm-specs#context-and-goals).

### FVM architecture
**The native FVM runtime is WebAssembly (WASM), and users can technically write actors in any programming that compiles to WASM.**
However, there are language-specific overheads that users need to be aware of (e.g. runtime, garbage collection, stdlibs, etc.) They affect the WASM output leading to bloated WASM bytecode and inefficient execution. There will be on-chain code size limits to consider too.

Rust is the primary language recommendation for writing efficient user-defined actors. Hence, the reference FVM SDK is built in Rust.

For more information, please refer to the FVM Specs [architecture web page](https://github.com/filecoin-project/fvm-specs/blob/main/01-architecture.md).

### What is AssemblyScript SDK?

"A software development kit (SDK) is a set of tools provided by the manufacturer of (usually) a hardware platform, operating system (OS), or programming language.
SDKs help software developers create applications for that specific platform, system, or programming language. Think of it kind of like a toolkit, or the plastic bag of tools that comes packaged with the parts of a dresser you’ve bought to assemble yourself—only for app development. You have the building blocks—or development tools—you need to get the job done, and what’s included in the kit varies from manufacturer to manufacturer. "

The AssemblyScript SDK is the official SDK for writing FMV smart contracts using the AssemblyScript language.
