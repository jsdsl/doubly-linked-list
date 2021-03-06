import { DoublyLinkedList } from "./doubly-linked-list";
import { IDoublyLinkedListNode } from "./i-doubly-linked-list-node";
export declare class DoublyLinkedListNode<E> implements IDoublyLinkedListNode<E> {
    private previous;
    private next;
    private parentList;
    private content;
    constructor(content: E | null, parentList: DoublyLinkedList<E>, previousNode?: DoublyLinkedListNode<E>, nextNode?: DoublyLinkedListNode<E>);
    getElement(): E;
    getParentList(): DoublyLinkedList<E>;
    hasPreviousNode(): boolean;
    getPreviousNode(): DoublyLinkedListNode<E> | undefined;
    setPreviousNode(previousNode: DoublyLinkedListNode<E> | undefined): DoublyLinkedListNode<E> | undefined;
    hasNextNode(): boolean;
    getNextNode(): DoublyLinkedListNode<E> | undefined;
    setNextNode(nextNode: DoublyLinkedListNode<E> | undefined): DoublyLinkedListNode<E> | undefined;
}
