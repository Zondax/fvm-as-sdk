# How to start a new project

## Creating a new project 

### Pre requisites:
- NodeJS 16
- Rust 1.61.0-nightly (c5cf08d37 2022-03-30)

### Create project
You can create a new project by running the following lines:
```
npm init
npm install --save-dev assemblyscript
npx asinit .
```

In order to clean some unnecessary files and code, please apply following changes to the project:
- Remove `tests` folder 
- Remove `index.html` 
- Remove code in `assembly/index.ts` 
- Remove all scripts in `package.json`

Add these entries in `scripts` field on `package.json`:

```json
{
  "scripts":{
    "asbuild:release": "asc assembly/index.ts --target release --bindings esm --use abort= --transform  @zondax/fvm-as-bindgen",
    "asbuild": "npm run asbuild:release"
  }
}
```

Finally, create a `Makefile` at project root folder, and paste this content: 
```
deps:
	yarn install
	cargo install wizer --all-features --force

build:
	yarn asbuild
	wizer build/release.wasm -f init -o build/release.wasm

.PHONY: deps build
```

### Install deps

Now it is time to add dependencies
```
yarn add @zondax/fvm-as-sdk
yarn add @zondax/fvm-as-bindgen
yarn add @zondax/assemblyscript-cbor
```

Finally, install them running
```
make deps
```

## Start coding 

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

## Building your smart contract

Whenever you want to build your code, it is super easy to do. Just run `make build`. The output will be written on `build/release.wasm`
