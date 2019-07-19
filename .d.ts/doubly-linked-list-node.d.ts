import { DoublyLinkedList } from "./doubly-linked-list";
export declare class DoublyLinkedListNode<E> {
    private previous;
    private next;
    private parentList;
    private content;
    constructor(content: E | null, parentList: DoublyLinkedList<E>, previousNode?: DoublyLinkedListNode<E>, nextNode?: DoublyLinkedListNode<E>);
    getElement(): E;
    getParentList(): DoublyLinkedList<E>;
    hasPreviousNode(): boolean;
    getPreviousNode(): DoublyLinkedListNode<E>;
    setPreviousNode(previousNode: DoublyLinkedListNode<E> | undefined): DoublyLinkedListNode<E> | undefined;
    hasNextNode(): boolean;
    getNextNode(): DoublyLinkedListNode<E>;
    setNextNode(nextNode: DoublyLinkedListNode<E> | undefined): DoublyLinkedListNode<E> | undefined;
}
