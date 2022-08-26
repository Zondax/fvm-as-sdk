---
title: How to test it in CI?
sidebar_position: 7
---

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
name: "Checks"
on:
  - push

jobs:
  build-test:
    name: "Build and Test"
    timeout-minutes: 5
    runs-on: self-hosted
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Install node
        uses: actions/setup-node@v2
        with:
          node-version: '16.13.0'
      - name: Install latest stable
        uses: actions-rs/toolchain@v1
        with:
          toolchain: stable
          override: true
      - name: Install yarn
        run: npm install -g yarn
      - name: Install dependencies
        run: |
          yarn install
          make deps
      - name: Build WASM file
        run: make build
      - name: Test WASM on Rust VM
        run: |
          cd testing
          cargo r
      - name: Install Hello Actor in Lotus
        run: |
          lotus version
          lotus chain install-actor build/release-final.wasm >> install.txt
          cat install.txt
      - name: Create Hello Actor in Lotus
        run: |
          cid=$(sed -n 's/^Actor Code CID: //p' install.txt)
          echo $cid
          lotus chain create-actor $cid >> create.txt
          cat create.txt
      - name: Get status actor
        run: |
          address=$(sed -n 's/^ID Address: //p' create.txt)
          echo $address
          lotus state get-actor $address >> actor.txt
          cat actor.txt
      - name: Get chain state
        run: |
          head=$(sed -n 's/^Head:		//p' actor.txt)
          echo $head
          lotus chain get $head
      - name: Invoke actor's method 2
        run: |
          address=$(sed -n 's/^ID Address: //p' create.txt)
          lotus chain invoke $address 2
      - name: Get status actor
        run: |
          address=$(sed -n 's/^ID Address: //p' create.txt)
          echo $address
          rm actor.txt
          lotus state get-actor $address >> actor.txt
          cat actor.txt
      - name: Get chain state
        run: |
          head=$(sed -n 's/^Head:		//p' actor.txt)
          echo $head
          lotus chain get $head
```

To see an actual CI working, please go to the "Hello world" example to see how it is done.

### Local Rust VM
The past two choices described have some trade-offs you should know. The devnet node will consume a lot of resources on your machine, as it is a full network working on itself (a miner is even active in order to allow the network to work).
Because of that, you may want to limit how many resources the container can consume. The self-hosted runner won't take your precious resources, but it will require you to have a server up and running every time you want to run the CI.
This cost money. The local rust VM is lightweight, can be run as many times as you want from scratch, and it takes almost no resources of your machine.


```
name: "Checks"
on:
  - push

jobs:
  build-test:
    name: "Build and Test"
    timeout-minutes: 5
    runs-on: self-hosted
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Install node
        uses: actions/setup-node@v2
        with:
          node-version: '16.13.0'
      - name: Install latest stable
        uses: actions-rs/toolchain@v1
        with:
          toolchain: stable
          override: true
      - name: Install yarn
        run: npm install -g yarn
      - name: Install dependencies
        run: |
          yarn install
          make deps
      - name: Build WASM file
        run: make build
      - name: Test WASM on Rust VM
        run: |
          cd testing
          cargo r
```

To see an actual CI working, please go to the "Hello world" example to see how it is done.
