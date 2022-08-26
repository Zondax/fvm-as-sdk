---
title: "How to use it?"
sidebar_position: 3
---

### Install deps
You need to just run `yarn install`. That everything you need to do to install dependencies.

### Compile
To compile the project to WASM, please run `yarn asbuild`. It will generate two binaries, `debug.wasm` and `release.wasm`.

### Import on another project
Most cases you will use this project as a building block to create more advanced applications. If you want to import it on that project, you just need to
do `yarn add @zondax/fvm-as-sdk` to add it to your project. Then, you only need to import it using `import sdk from "@zondax/fvm-as-sdk/assembly"`. All the functions will
be then available for you to use.
