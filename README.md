
# FVM AssemblyScript SDK
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![GithubActions](https://github.com/Zondax/fvm-as-sdk/actions/workflows/main.yaml/badge.svg)](https://github.com/Zondax/fvm-as-sdk/blob/master/.github/workflows/main.yaml)

## Introduction

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

### What is WebAssembly?
WebAssembly (abbreviated WASM) is a binary instruction format for a stack-based virtual machine. WASM is designed as a portable compilation target for programming languages, enabling deployment on the web for client and server applications.
Some of its features are:
- Efficient and fast
- Safe
- Open and debuggable
- Part of the open web platform

For more information, please refer to the [WebAssembly web page](https://webassembly.org).

### What is AssemblyScript?
AssemblyScript compiles a variant of TypeScript (a typed superset of JavaScript) to WebAssembly using Binaryen

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

## How to use it?
### Install deps
You need to just run `yarn install`. That everything you need to do to install dependencies.

### Compile
To compile the project to WASM, please run `yarn asbuild`. It will generate two binaries, `debug.wasm` and `release.wasm`.

### Import on another project
Most cases you will use this project as a building block to create more advanced applications. If you want to import it on that project, you just need to
do `yarn add fvm-as-sdk` to add it to your project. Then, you only need to import it using `import sdk from "fvm-as-sdk/assembly"`. All the functions will 
be then available for you to use.

## Smart contract building tips
Please, refer to the "Hello World" example to see a working smart contract. You can use it as guidance or boilerplate to build your own smart contract.
Here you have some lines about key functions related to a smart contract. 

### Function `invoke`
This is the entry point to any WASM code. Every time you run the code, this function will be called by default. From this func you should execute the correct function depending on the 
method number the call has. 

### Function `constructor`
This is the **method 1** by default. When you execute the `create-actor` command, this is going to be executed. At this stage you should create a new storage on the blockchain using IPLD. If you do 
it, it will get attached to this specific instance. 

### Function `<other-functions>`
You will be able to call other functions by different method numbers. From two to n, you can match them on a switch in the invoke function.

## How to run it? 
First, you need to install your smart contract on the FVM. Once you have done it, you need to create an instance of it. You can create as many instances as you want. Each one will
live in its own storage space. Finally, you will be able to invoke methods the smart contract has.

```
# Install Actor
lotus chain install-actor <path-to-wasm-binary>

# Instantiate Actor
lotus chain create-actor <actor-id-from-previous-step>

# Invoke actor
lotus chain invoke <method_num>
```

## How to test it?
In order to test your smart contracts, today we have two different options. You can choose either a local VM written on Rust or using a full filecoin dev node.

### Local dev node
We have created a docker container with everything you need in order to start a working dev net node. The branch you should look at is [here](https://github.com/Zondax/rosetta-filecoin/tree/experimental/dev-fmv-m2). 
You could clone the repository, build the image locally and finally run it. Please, take the following instructions as an example on how you could do it. 

```
git clone https://github.com/Zondax/rosetta-filecoin.git
cd rosetta-filecoin
git checkout experimental/dev-fmv-m2
make build_devnet
docker run -v <working_dir_path>:/app zondax/filecoin-devnet:latest
```

### Self-hosted runner
Using the same docker image we mentioned before, you can create a CI workflow on GitHub as a self-hosted runner. 
Please, refer to GitHub docs on how to add a runner to your project [here](https://docs.github.com/en/actions/hosting-your-own-runners/adding-self-hosted-runners).
Here you have a CI workflow example to run your smart contract on a self-hosted runner.

```
name: Build
on:
  - push
  
jobs:
  build:
    timeout-minutes: 5
    runs-on: self-hosted
    steps:
      - name: Checkout
        uses: actions/checkout@v2
        with:
          submodules: true
      - name: Install node
        uses: actions/setup-node@v2
        with:
          node-version: '16.13.0'
      - name: Install dependencies
        run: |
          npm install -g yarn
          yarn install
      - name: Build WASM file
        run: yarn asbuild
      - name: Install Hello Actor in Lotus
        run: |
          ~/lotus/lotus version
          ~/lotus/lotus chain install-actor build/debug.wasm >> output.txt
          cat output.txt
      - name: Create Hello Actor in Lotus
        run: |
          cid=$(sed -n 's/^Actor Code CID: //p' output.txt)
          echo $cid
          ~/lotus/lotus chain create-actor $cid >> output.txt
          cat output.txt
      - name: Get status actor
        run: |
          address=$(sed -n 's/^ID Address: //p' output.txt)
          ~/lotus/lotus state get-actor $address
```

To see an actual CI working, please go to the "Hello world" example to see how it is done.

### Local Rust VM 
The past two choices described have some trade-offs you should know. The devnet node will consume a lot of resources on your machine, as it is a full network working on itself (a miner is even active in order to allow the network to work).
Because of that, you may want to limit how many resources the container can consume. The self-hosted runner won't take your precious resources, but it will require you to have a server up and running every time you want to run the CI.
This cost money. The local rust VM is lightweight, can be run as many times as you want from scratch, and it takes almost no resources of your machine. **This option is under development yet, and it will be ready soon.**

## Use cases
- [Hello world](https://github.com/Zondax/fil-hello-world-actor-as)

## Docs
Here you will find some useful links to every data source you can use to further increase your knowledge about different topics.
- [Filecoin](https://filecoin.io)
- [AssemblyScript](https://www.assemblyscript.org)
- [FVM specs](https://github.com/filecoin-project/fvm-specs)
- [Rust Hello world](https://github.com/raulk/fil-hello-world-actor)
- [Go SDK](https://github.com/ipfs-force-community/go-fvm-sdk)

