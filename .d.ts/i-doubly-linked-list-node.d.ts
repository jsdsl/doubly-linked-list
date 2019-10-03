import { IDoublyLinkedList } from "./i-doubly-linked-list";
export interface IDoublyLinkedListNode<E> {
    getElement(): E;
    getParentList(): IDoublyLinkedList<E>;
    hasPreviousNode(): boolean;
    getPreviousNode(): IDoublyLinkedListNode<E> | undefined;
    setPreviousNode(previousNode: IDoublyLinkedListNode<E> | undefined): IDoublyLinkedListNode<E> | undefined;
    hasNextNode(): boolean;
    getNextNode(): IDoublyLinkedListNode<E> | undefined;
    setNextNode(nextNode: IDoublyLinkedListNode<E> | undefined): IDoublyLinkedListNode<E> | undefined;
}
