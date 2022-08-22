---
title: "Test your code"
sidebar_position: 4
---

## Pre requisites
In order to interact with your newly created actor, you will need to take three files from `build` folder:
- release.wasm
- abi.json
- definition.ts

## Stages

### Add package to project

```shell
yarn add --dev "@zondax/fvm-client-tool"
```

### Import lib

```typescript
import {init, ContractManager} from "@zondax/fvm-client-tool";
```

### Set lotus node
This step is required only once.
```typescript
init(nodeUrl, nodeToken);
```

### Install actor

```typescript
const resp = await ContractManager.install(account, path.join(__dirname, "./contract/custom/binary.wasm"));
const { cid, isInstalled } = resp;
```

### Create client from installed binary
```typescript
// Create client from installed binary.
// In order to invoke methods, you will need to instantiate the actor first
const ABI = JSON.parse(fs.readFileSync(path.join(__dirname, "./contract/custom/abi.json"), "utf-8"));
const client = ContractManager.create<Custom>(cid, ABI);
```

### Create client from previous instance
```typescript
// Create client from pre-existing instance of the contract
const contractAddress = (client as any as ContractManager).getContractAddress();
const clientFromAddress = ContractManager.load<Custom>(contractAddress, ABI);
```

### Instantiate actor

```typescript
// Create a new instance of an actor from binaries
await client.new(account, "0");
```

### Invoke methods

```typescript
 const args = {
    u64Array: [1000n, 1000n],
    stringArray: ["data", "test", "dasda"],
    u64Map: { test: 1000n },
    customArg: {
        argumentsArray: [{ counterLong: 100n, counterShort: 11111, message: "testing message 1" }],
        argumentsMap: { field1: { counterLong: 100n, counterShort: 111, message: "testing message 2" } },
    },
};

const message_1 = await client.say_hello(account, "0", args);
```

**Note:** _In order to see how this works on live, please [go to this example](https://github.com/Zondax/fvm-client-tool/tree/master/example) :arrow_upper_right:_
