"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DoublyLinkedListNode {
    constructor(content, parentList, previousNode, nextNode) {
        this.content = content;
        this.parentList = parentList;
        this.previous = previousNode;
        this.next = nextNode;
    }
    getElement() {
        if (this.content !== null)
            return this.content;
        else {
            let name = (this.hasPreviousNode() ? "epilogue" : "prologue");
            throw new Error("ERR | Attempted to retrieve null content out of a DoublyLinkedListNode (" + name +
                " node).");
        }
    }
    getParentList() {
        return this.parentList;
    }
    hasPreviousNode() {
        return (this.previous !== undefined);
    }
    getPreviousNode() {
        if (!this.hasPreviousNode())
            return undefined;
        else
            return this.previous;
    }
    setPreviousNode(previousNode) {
        let displaced = this.previous;
        this.previous = previousNode;
        return displaced;
    }
    hasNextNode() {
        return (this.next !== undefined);
    }
    getNextNode() {
        if (!this.hasNextNode())
            return undefined;
        else
            return this.next;
    }
    setNextNode(nextNode) {
        let displaced = this.next;
        this.next = nextNode;
        return displaced;
    }
}
exports.DoublyLinkedListNode = DoublyLinkedListNode;
//# sourceMappingURL=doubly-linked-list-node.js.map