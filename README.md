
# FVM AssemblyScript SDK
[![GithubActions](https://github.com/Zondax/fvm-as-sdk/actions/workflows/main.yaml/badge.svg)](https://github.com/Zondax/fvm-as-sdk/blob/master/.github/workflows/main.yaml)


---

## Introduction

### What is the Filecoin blockchain?
Filecoin is making the web more secure and efficient with a decentralized data storage marketplace, protocol, and cryptocurrency. 
It is a blockchain-based cooperative digital storage and data retrieval method, allowing users to rent unused hard drive space.

For more information, please refer to the [Filecoin web page](https://filecoin.io).

### What is the FVM?
Filecoin today lacks general programmability. As a result, it is not possible to deploy user-defined behaviour, or "smart contracts", to the blockchain. The goal of the project (FVM project for Filecoin) is to add general programmability to the Filecoin blockchain. 
They predict this will unleash a profileration of new services and tools that can be built and deployed to the Filecoin network, without requiring network upgrades, involvement from core implementation maintainers, changes in the embedded actors, or spec alterations.

For more information, please refer to the FVM Specs [context-and-goals web page](https://github.com/filecoin-project/fvm-specs#context-and-goals).

### What is AssemblyScript?
AssemblyScript compiles a variant of TypeScript (opens new window) (a typed superset of JavaScript) to WebAssembly (opens new window) using Binaryen

- AssemblyScript targets WebAssembly's feature set specifically, giving developers low-level control over their code.
- Its similarity with TypeScript makes it easy to compile to WebAssembly without learning a new language.

For more information, please refer to the [AssemblyScript web page](https://www.assemblyscript.org/introduction.html).

### What is AssemblyScript SDK?

"A software development kit (SDK) is a set of tools provided by the manufacturer of (usually) a hardware platform, operating system (OS), or programming language.
SDKs help software developers create applications for that specific platform, system, or programming language. Think of it kind of like a toolkit, or the plastic bag of tools that comes packaged with the parts of a dresser you’ve bought to assemble yourself—only for app development. You have the building blocks—or development tools—you need to get the job done, and what’s included in the kit varies from manufacturer to manufacturer. "

The AssemblyScript SDK is the official SDK for writing FMV smart contracts using the AssemblyScript language.

## Project structure 

### Env

Here there is a series of files which define the system calls the actor can do to interact with the VM. They are just signature definitions to what the vm will link
at the moment the actor gets executed. They are bare bones, as they are the foundation to the rest of the code SDK will provide. Other functions will be created on top of them. 
For more information about them, please click on [this link](https://github.com/filecoin-project/fvm-specs/blob/main/08-syscalls.md).

### Wrappers

Here the project goes one step further, starting to create value on top of env functions. In order to get the outcome of a syscall function, 
we need to provide a pointer to it so that it has a place where to write the result. That is what we do here. For each syscall function, SDK creates 
a wrapper one, where it creates the pointers required to get the response, reads it and returns its value at the end. No matter how many values are received,
it will create one pointer for each of them.

### Helpers
Here is where everything starts to get more interesting. In this folder, functions will be created to express more sophisticated tasks. Many wrapper functions will be possibly 
used on each helper function. Each one will have its own purpose. 

### Utils
Any other auxiliary function SDK needs in order to handle some specific task, such as parsing base64 arrays or handling cid values, finds its place in this folder.

## Use cases
- [Hello world](https://github.com/Zondax/fil-hello-world-actor-as)

## Docs
Here you will find some useful links to every data source you can use to further increase your knowledge about different topics.
- [Filecion](https://filecoin.io)
- [AssemblyScript](https://www.assemblyscript.org)
- [FVM specs](https://github.com/filecoin-project/fvm-specs)

