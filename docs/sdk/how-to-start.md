---
title: How to build your own smart contracts?
sidebar_position: 3
---

### Where do I start?
The recommendation is to start reading these docs, and then go to the hello world example. You will find there some basics lines you could use
to understand how it works, and play with it.

### What is BaseState class?
The `BaseState` is an abstract class created to facilitate to read and write the data you want to preserve. In order to achieve this goal, you
just need to implement two functions: `encode` and `parse`. The first one is used to serialize data to **CBOR** (this is the format FVM uses to save data).
The second one is used to parse serialized data to a new state with it.

### What is @zondax/fvm-as-bindgen?
This package was created to make developers life easier. In order to make a smart contract work, there is a series of functions and lines of code strictly required by FVM.
However, they are not much related to what you really want to do when writing a new smart contract: your main purpose and nothing else. Therefore, taking advantage of
a strategic feature of AssemblyScript, we have created an automatic tool that will add those lines of code for you before compiling it.

It implements a series of custom decorators you must use in order to indicate key points of your smart contract.

### What are those decorators for?
Decorators are used to mark key places we need to be aware of in order to run some tasks on the smart contract code before compiling it to WASM (when building the code).
Some of them are strictly required if you want your smart contract to work properly.

#### @constructor
This one allows you to indicate which function will be called when creating new smart contract instances. If you don't use it, the smart contract
will be instantiated anyway when running `create-actor` cmd. So what is it for? You will be able to set your initial state and save it on the blockchain.

The function signature is
- ```function <name-you-whish>(params: ParamsRawResult):void```

As an example, you can check:
```
@constructor
function <name-you-whish>(params: ParamsRawResult):void{
    // here you could create your initial state and save it on the blockchain
    new State().save()
}
```

#### @export_method(num)
This one allows you to indicate which function should be exported and visible to be called when invoking methods. If you create a function, but no decorator is set, you
won't be able to use it as a public method (callable from the outside world). This decorator accepts an argument. This argument will indicate the method number this function
will be related to. **The number starts from 2, and they cannot be repeated.**

The possible function signatures are

- ```function <name-you-whish>(params: ParamsRawResult):void```

- ```function <name-you-whish>(params: ParamsRawResult):Uint8Array```

As an example, you can check:
```
@export_method(2)
function <name-you-whish>(params: ParamsRawResult):void{
}

@export_method(3)
function <name-you-whish>(params: ParamsRawResult):Uint8Array{
    return Uint8Array.wrap(String.UTF8.encode("hello world"))
}
```

And now, if you would go to call these methods from the node
```
# This one will not return anything
lotus chain invoke t01001 2

# This one will return a string 
lotus chain invoke t01001 3
```

#### @state
This one allows you to indicate which class will be used as recipient to persist data on storage.
**This is strictly required to be present. If it is not there, an error will be thrown.**

The function signature is
- ```class <name-you-whish> extends BaseState{ }```

As an example, you can check:
```
@state
class State extends BaseState{
   count: u64 = 0
   msg: string = "base example"
}
```
