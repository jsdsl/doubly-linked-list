import { AbstractIterator } from "iter-over";
import { IDoublyLinkedListNode } from "./i-doubly-linked-list-node";
export interface IDoublyLinkedList<E> {
    getFirst(): E | undefined;
    getFirstNode(): IDoublyLinkedListNode<E> | undefined;
    getLast(): E | undefined;
    getLastNode(): IDoublyLinkedListNode<E> | undefined;
    hasNextNode(node: IDoublyLinkedListNode<E>): boolean;
    getNextNode(node: IDoublyLinkedListNode<E>): IDoublyLinkedListNode<E> | undefined;
    hasPreviousNode(node: IDoublyLinkedListNode<E>): boolean;
    getPreviousNode(node: IDoublyLinkedListNode<E>): IDoublyLinkedListNode<E> | undefined;
    insertAfter(element: E, node: IDoublyLinkedListNode<E>): IDoublyLinkedListNode<E>;
    insertNodeAfter(node: IDoublyLinkedListNode<E>, afterNode: IDoublyLinkedListNode<E>): IDoublyLinkedListNode<E>;
    insertBefore(element: E, node: IDoublyLinkedListNode<E>): IDoublyLinkedListNode<E>;
    insertNodeBefore(node: IDoublyLinkedListNode<E>, beforeNode: IDoublyLinkedListNode<E>): IDoublyLinkedListNode<E>;
    insertFirst(element: E): IDoublyLinkedListNode<E>;
    insertNodeFirst(node: IDoublyLinkedListNode<E>): IDoublyLinkedListNode<E>;
    insertLast(element: E): IDoublyLinkedListNode<E>;
    insertNodeLast(node: IDoublyLinkedListNode<E>): IDoublyLinkedListNode<E>;
    removeFirst(): E | undefined;
    removeFirstNode(): IDoublyLinkedListNode<E> | undefined;
    removeLast(): E | undefined;
    removeLastNode(): IDoublyLinkedListNode<E> | undefined;
    removeNode(node: IDoublyLinkedListNode<E>): IDoublyLinkedListNode<E>;
    nodeIterator(): AbstractIterator<IDoublyLinkedListNode<E>>;
}
