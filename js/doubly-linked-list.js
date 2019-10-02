"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_list_1 = require("@jsdsl/abstract-list");
const doubly_linked_list_node_1 = require("./doubly-linked-list-node");
const iter_over_1 = require("iter-over");
class DoublyLinkedList extends abstract_list_1.AbstractList {
    constructor(...elements) {
        super();
        this.prologue = new doubly_linked_list_node_1.DoublyLinkedListNode(null, this, undefined, undefined);
        this.epilogue = new doubly_linked_list_node_1.DoublyLinkedListNode(null, this, this.prologue, undefined);
        this.prologue.setNextNode(this.epilogue);
        this.addAll(elements);
    }
    getEpilogueNode() {
        return this.epilogue;
    }
    getPrologueNode() {
        return this.prologue;
    }
    insertBetween(content, previousNode, nextNode) {
        if ((previousNode.getNextNode() === nextNode) && (nextNode.getPreviousNode() === previousNode)) {
            let newNode = new doubly_linked_list_node_1.DoublyLinkedListNode(content, this, previousNode, nextNode);
            previousNode.setNextNode(newNode);
            nextNode.setPreviousNode(newNode);
            return newNode;
        }
        else
            throw new Error("Attempted to insert new content between two non-adjacent DoublyLinkedNodes.");
    }
    insertNodeBetween(centerNode, previousNode, nextNode) {
        if ((previousNode.getNextNode() === nextNode) && (nextNode.getPreviousNode() === previousNode)) {
            if (centerNode.hasPreviousNode() || centerNode.hasNextNode()) {
                throw new Error("ERR | Attempted to insert an already-located node (a node with either a preceding or" +
                    " successive sibling) into a DoublyLinkedList.");
            }
            else {
                centerNode.setPreviousNode(previousNode);
                centerNode.setNextNode(nextNode);
                previousNode.setNextNode(centerNode);
                nextNode.setPreviousNode(centerNode);
                return centerNode;
            }
        }
        else
            throw new Error("Attempted to insert new content between two non-adjacent DoublyLinkedNodes.");
    }
    getFirst() {
        if (this.isEmpty())
            return undefined;
        else
            return this.getFirstNode().getElement();
    }
    getFirstNode() {
        return this.getPrologueNode().getNextNode();
    }
    getLast() {
        if (this.isEmpty())
            return undefined;
        else
            return this.getLastNode().getElement();
    }
    getLastNode() {
        if (this.isEmpty())
            return undefined;
        else
            return this.getEpilogueNode().getPreviousNode();
    }
    hasNextNode(node) {
        if (node.getParentList() === this) {
            if (this.isEmpty())
                return false;
            else
                return ((node !== this.getLastNode()) && (node !== this.getEpilogueNode()));
        }
        else {
            throw new Error("Attempted to check the successive node of a DoublyLinkedListNode that did not appear " +
                "in the given DoublyLinkedList.");
        }
    }
    getNextNode(node) {
        if (!this.hasNextNode(node))
            return undefined;
        else
            return node.getNextNode();
    }
    hasPreviousNode(node) {
        if (node.getParentList() === this) {
            if (this.isEmpty())
                return false;
            else
                return ((node !== this.getFirstNode()) && (node !== this.getPrologueNode()));
        }
        else {
            throw new Error("Attempted to check the successive node of a DoublyLinkedListNode that did not appear in " +
                "the given DoublyLinkedList.");
        }
    }
    getPreviousNode(node) {
        if (!this.hasPreviousNode(node))
            return undefined;
        else
            return node.getPreviousNode();
    }
    insertAfter(element, node) {
        if (node.getParentList() !== this) {
            throw new Error("Attempted to insert an element after a node that does not occur in this " +
                "DoublyLinkedList.");
        }
        else if (node === this.getEpilogueNode()) {
            throw new Error("Attempted to insert an element after the prologue node of a DoublyLinkedList.");
        }
        else
            return this.insertBetween(element, node, node.getNextNode());
    }
    insertNodeAfter(node, afterNode) {
        if (afterNode.getParentList() !== this) {
            throw new Error("Attempted to insert a node after a node that does not occur in this " +
                "DoublyLinkedList.");
        }
        else if (afterNode === this.getPrologueNode()) {
            throw new Error("Attempted to insert a node after the prologue node of a DoublyLinkedList.");
        }
        else
            return this.insertNodeBetween(node, afterNode, afterNode.getNextNode());
    }
    insertBefore(element, node) {
        if (node.getParentList() !== this) {
            throw new Error("Attempted to insert an element before a node that does not occur in this " +
                "DoublyLinkedList.");
        }
        else if (node === this.getPrologueNode()) {
            throw new Error("Attempted to insert an element before the epilogue node of a DoublyLinkedList.");
        }
        else
            return this.insertBetween(element, node.getPreviousNode(), node);
    }
    insertNodeBefore(node, beforeNode) {
        if (beforeNode.getParentList() !== this) {
            throw new Error("Attempted to insert a node before a node that does not occur in this " +
                "DoublyLinkedList.");
        }
        else if (beforeNode === this.getEpilogueNode()) {
            throw new Error("Attempted to insert a node before the epilogue node of a DoublyLinkedList.");
        }
        else
            return this.insertNodeBetween(node, beforeNode.getPreviousNode(), beforeNode);
    }
    insertFirst(element) {
        return this.insertAfter(element, this.getPrologueNode());
    }
    insertNodeFirst(node) {
        return this.insertNodeAfter(node, this.getPrologueNode());
    }
    insertLast(element) {
        return this.insertBefore(element, this.getEpilogueNode());
    }
    insertNodeLast(node) {
        return this.insertNodeBefore(node, this.getEpilogueNode());
    }
    removeFirst() {
        if (this.isEmpty())
            return undefined;
        else
            return this.removeFirstNode().getElement();
    }
    removeFirstNode() {
        if (this.isEmpty())
            return undefined;
        else
            return this.removeNode(this.getFirstNode());
    }
    removeLast() {
        if (this.isEmpty())
            return undefined;
        else
            return this.removeLastNode().getElement();
    }
    removeLastNode() {
        if (this.isEmpty())
            return undefined;
        else
            return this.removeNode(this.getLastNode());
    }
    removeNode(node) {
        if (node.getParentList() !== this) {
            throw new Error("Attempted to remove a DoublyLinkedListNode that did not appear in the given " +
                "DoublyLinkedList.");
        }
        else if (!node.hasPreviousNode()) {
            throw new Error("ERR | Attempted to remove a DoublyLinkedListNode without a preceding node - most likely " +
                "the prologue node!");
        }
        else if (!node.hasNextNode()) {
            throw new Error("ERR | Attempted to remove a DoublyLinkedListNode without a successive node - most " +
                "likely the epilogue node!");
        }
        else {
            let displaced = node;
            node.getPreviousNode().setNextNode(node.getNextNode());
            node.getNextNode().setPreviousNode(node.getPreviousNode());
            node.setPreviousNode(undefined);
            node.setNextNode(undefined);
            return displaced;
        }
    }
    add(element) {
        this.insertLast(element);
    }
    get(index) {
        if (index < 0)
            return undefined;
        let iterator = this.iterator();
        for (let i = 0; i < index; i++) {
            if (iterator.hasNext())
                iterator.next();
            else
                return undefined;
        }
        if (iterator.hasNext())
            return iterator.next();
        else
            return undefined;
    }
    size() {
        let size = 0;
        this.nodeIterator().forEachRemaining(() => size++);
        return size;
    }
    contains(searchElement) {
        for (let element of this.iterator())
            if (element === searchElement)
                return true;
        return false;
    }
    isEmpty() {
        return (this.getPrologueNode().getNextNode() === this.getEpilogueNode());
    }
    remove(element) {
        for (let node of this.nodeIterator()) {
            if (node.getElement() === element) {
                this.removeNode(node);
                return node.getElement();
            }
        }
        return undefined;
    }
    clear() {
        this.prologue.setNextNode(this.epilogue);
        this.epilogue.setPreviousNode(this.prologue);
    }
    nodeIterator() {
        return new class extends iter_over_1.AbstractIterator {
            constructor(prologue, dll) {
                super();
                this.firstNode = prologue;
                this.currentNode = prologue;
                this.dll = dll;
            }
            hasNext() {
                return this.dll.hasNextNode(this.currentNode);
            }
            next() {
                return (this.currentNode = this.currentNode.getNextNode());
            }
            remove() {
                let removedNode = this.currentNode;
                this.dll.removeNode(this.currentNode);
                return removedNode;
            }
            reset() {
                this.currentNode = this.firstNode;
            }
        }(this.prologue, this);
    }
    iterator() {
        return new class extends iter_over_1.AbstractIterator {
            constructor(nodeIterator) {
                super();
                this.nodeIterator = nodeIterator;
            }
            hasNext() {
                return this.nodeIterator.hasNext();
            }
            next() {
                return this.nodeIterator.next().getElement();
            }
        }(this.nodeIterator());
    }
    shuffle(iterations = 1) {
        for (let count = 0; count < iterations; count++) {
            let elements = this.toArray();
            this.clear();
            while (elements.length !== 0) {
                let random = Math.floor(Math.random() * elements.length);
                let element = elements.splice(random, 1)[0];
                this.add(element);
            }
        }
    }
    toArray() {
        let result = [];
        this.iterator().forEachRemaining((element) => result.push(element));
        return result;
    }
}
exports.DoublyLinkedList = DoublyLinkedList;
//# sourceMappingURL=doubly-linked-list.js.map