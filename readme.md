# JSDSL - Doubly Linked List
A full-featured doubly-linked list implementation.

### [Find @jsdsl/doubly-linked-list on NPM.](https://www.npmjs.com/package/@jsdsl/doubly-linked-list)

## Table of Contents

 - [Installation](#installation)
 - [Basic Usage](#basic-usage)
 - [Documentation](#documentation)
 - [License](#license)

## Installation
Install from NPM with
```
$ npm install --save @jsdsl/doubly-linked-list
```

## Basic Usage
A basic use case would be as follows:
```typescript
import { DoublyLinkedList, DoublyLinkedListNode } from "@jsdsl/doubly-linked-list";

// Initialize the doubly-linked list.
let dll: DoublyLinkedList<string> = new DoublyLinkedList<string>();

// Add an element: 'turtle'
dll.add("turtle");

// Add at element at the beginning of the list.
let catNode: DoublyLinkedListNode<E> = dll.insertFirst("cat");

// Insert an element, 'dog', after the 'cat' element.
dll.insertAfter("dog", catNode);

// The list's current state:
// 'cat' <--> 'dog' <--> 'turtle'
```

## Documentation

See the [wiki](https://github.com/jsdsl/doubly-linked-list/wiki) for full documentation.

## License
@jsdsl/doubly-linked-list is made available under the GNU General Public License v3.

Copyright (C) 2019 Trevor Sears
