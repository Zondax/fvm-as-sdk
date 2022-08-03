---
title: "Start coding"
---

### Creating state to storage data
In order to define your custom class to storage data, you need to **create a new class** (choose the name you want).
Your state class should **extend from BaseState class**, which is provided by the SDK. Besides, it should **set the `@state` decorator** 
next to it. 

```typescript
import { BaseState } from "@zondax/fvm-as-sdk/assembly/utils/state";

// @ts-ignore
@state
// @ts-ignore
export class State extends BaseState {
  count: u64 = 0;
  msg: string = "default value";
  map: Map<string, u64>;
  array: Array<string>;
}
```

**Notes**
- If you don't need to persist anything on the smart contract, this class is not needed at all.
- It is recommended to create this in a new file inside `assembly` folder.

### Defining a constructor
In order to **attach some storage** to the smart contract, or **do some tasks when instantiating** a smart contract, developers can **make use of
`@constructor` decorator**. You can define a function and set the decorator next to it. By doing so, that function will be call when a new
instance is created. 

Some highlights: 
- You can pass arguments to the function. They will be required when a new instance is created
- You can return values. They will be received by the process which is creating the new instance

```typescript
import {State} from "./state";

// @ts-ignore
@constructor
function init(): void {
  // If we want to attach some storage to the instance,
  // a state needs to be saved at this step.
  // So we create a store, and call save method
  
  // @ts-ignore
  State.defaultState().save()
}
```

**Notes**
- If you don't need to make use of the constructor, this function is not needed at all.
- Code assumes there is another file called `state.ts` at the same level where your state class is located.
- `State.defaultState()` create a new instance of the class with default values defined by the developer.
- `save` function is used to persist the current values on storage.

### Defining business logic
Business logic is represented or grouped by functions. In order to allow clients to execute or make use of this logic, developers need to 
indicate which functions can be accessed from the outside world. By default, functions won't be available to be called. By using the decorator
`@export_method(n)`, you can export it and make it visible. `n` here is an argument. It should **be an integer**, and it **cannot be used twice** 
in the same smart contract. **The first valid number is 2**.

Some highlights:
- You can pass arguments to the function. They will be required when a new instance is created
- You can return values. They will be received by the process which is creating the new instance
- If you use the same index twice, you will get an error at compile time. 


```typescript
import {State} from "./state";

// @ts-ignore
@export_method(2)
// User function. Smart-contract-related function.
function say_hello(): string {
  // If we want to restore the storage related to this instance,
  // we should call static load function. It will return a preloaded
  // state

  // @ts-ignore
  const state = State.load() as State;

  // Do some stuff with the state
  state.count += 1;

  // Save the state with updated values
  state.save();

  // Create a string with some value from state
  return "Hello world " + state.count.toString()
}
```

**Notes**
- Code assumes there is another file called `state.ts` at the same level where your state class is located.
- `State.load()` is a static function, meant to read from storage data saved previously and creates a new instance of the class with those values.
- `save` function is used to persist the current values on storage.

## Throwing errors
In order to make errors easy to generate, the SDK has some helper functions. If you want to throw an error in some point during execution, you can
use `genericAbort` function. You will need to indicate some error code and a description message. Nothing more. 

Some highlights:
- There are some error codes defined by filecoin that you can use. All of them are defined in the SDK, under `"@zondax/fvm-as-sdk/assembly/env"`

```typescript
import {genericAbort} from "@zondax/fvm-as-sdk/assembly/wrappers";
import {USR_ASSERTION_FAILED} from "@zondax/fvm-as-sdk/assembly/env";

function example(): string {
    genericAbort(USR_ASSERTION_FAILED, "message")
}
```

## Building your smart contract

Whenever you want to build your code, it is super easy to do. Just run `make build`. The output will be written on `build/release.wasm`
