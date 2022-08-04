---
title: "Creating a new project"
sidebar_position: 1
---

### Pre requisites
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
