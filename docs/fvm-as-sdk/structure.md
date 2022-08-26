---
title:  "Project Structure"
sidebar_position: 2
---

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
