/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	10:54 PM -- October 02nd, 2019.
 *	Project: JSDSL - Doubly Linked List
 */

import { AbstractIterator } from "iter-over";
import { IDoublyLinkedListNode } from "./i-doubly-linked-list-node";

/**
 * An interface representing the general form of a doubly-linked list.
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export interface IDoublyLinkedList<E> {
	
	/**
	 * Returns the first element in this list, or undefined if this list is empty.
	 *
	 * @return The first element in this list, or undefined if this list is empty.
	 */
	getFirst(): E | undefined;

	/**
	 * Returns the first node in this list, or undefined if this list is empty.
	 *
	 * @return The first node in this list, or undefined if this list is empty.
	 */
	getFirstNode(): IDoublyLinkedListNode<E> | undefined;

	/**
	 * Returns the last element in this list, or undefined if this list is empty.
	 *
	 * @return The last element in this list, or undefined if this list is empty.
	 */
	getLast(): E | undefined;

	/**
	 * Returns the last node in this list, or undefined if this list is empty.
	 *
	 * @return The last node in this list, or undefined if this list is empty.
	 */
	getLastNode(): IDoublyLinkedListNode<E> | undefined;

	/**
	 * Returns true if the provided node has a successive node.
	 *
	 * This method will throw an error if an attempt is made to use a node that does belong to this list.
	 *
	 * @param node The node for which to check for a successive node.
	 * @return true if the provided node has a successive node.
	 */
	hasNextNode(node: IDoublyLinkedListNode<E>): boolean;

	/**
	 * Returns the successive node of the provided node, or undefined if the provided node has no successive sibling.
	 *
	 * This method will throw an error if an attempt is made to use a node that does belong to this list.
	 *
	 * @param node The node for which to retrieve a successive node.
	 * @return The successive node of the provided node, or undefined if the provided node has no successive sibling.
	 * @see IDoublyLinkedList#hasNextNode
	 */
	getNextNode(node: IDoublyLinkedListNode<E>): IDoublyLinkedListNode<E> | undefined;

	/**
	 * Returns true if the provided node has a preceding node.
	 *
	 * This method will throw an error if an attempt is made to use a node that does belong to this list.
	 *
	 * @param node The node for which to check for a preceding node.
	 * @return true if the provided node has a preceding node.
	 */
	hasPreviousNode(node: IDoublyLinkedListNode<E>): boolean;

	/**
	 * Returns the preceding node of the provided node, or undefined if the provided node has no preceding sibling.
	 *
	 * This method will throw an error if an attempt is made to use a node that does belong to this list.
	 *
	 * @param node The node for which to retrieve a preceding node.
	 * @return The preceding node of the provided node, or undefined if the provided node has no preceding sibling.
	 * @see IDoublyLinkedList#hasPreviousNode
	 */
	getPreviousNode(node: IDoublyLinkedListNode<E>): IDoublyLinkedListNode<E> | undefined;

	/**
	 * Creates a new node with the provided content and inserts it after the provided node, returning the newly created
	 * node.
	 *
	 * This method will throw an error if an attempt is made to use a node that does belong to this list.
	 *
	 * @param element The content that the newly created node should contain.
	 * @param node The node after which the newly created node should be inserted.
	 * @return The newly created node.
	 */
	insertAfter(element: E, node: IDoublyLinkedListNode<E>): IDoublyLinkedListNode<E>;

	/**
	 * Inserts the provided node after the specified preceding node, returning the node that was inserted.
	 *
	 * This method will throw an error if an attempt is made to use a node that does belong to this list.
	 *
	 * @param node The node that, after this operation, will be situated after the specified preceding node.
	 * @param afterNode The node after which the provided node will be inserted.
	 * @return The inserted node.
	 */
	insertNodeAfter(node: IDoublyLinkedListNode<E>, afterNode: IDoublyLinkedListNode<E>): IDoublyLinkedListNode<E>;

	/**
	 * Creates a new node with the provided content and inserts it before the provided node, returning the newly created
	 * node.
	 *
	 * This method will throw an error if an attempt is made to use a node that does belong to this list.
	 *
	 * @param element The content that the newly created node should contain.
	 * @param node The node before which the newly created node should be inserted.
	 * @return The newly created node.
	 */
	insertBefore(element: E, node: IDoublyLinkedListNode<E>): IDoublyLinkedListNode<E>;

	/**
	 * Inserts the provided node before the specified succeeding node, returning the node that was inserted.
	 *
	 * This method will throw an error if an attempt is made to use a node that does belong to this list.
	 *
	 * @param node The node that, after this operation, will be situated before the specified succeeding node.
	 * @param beforeNode The node before which the provided node will be inserted.
	 * @return The inserted node.
	 */
	insertNodeBefore(node: IDoublyLinkedListNode<E>, beforeNode: IDoublyLinkedListNode<E>): IDoublyLinkedListNode<E>;

	/**
	 * Creates a new node with the provided content and inserts it at the beginning of the list, returning the newly
	 * created node.
	 *
	 * @param element The content that the newly created node should contain.
	 * @return The newly created node.
	 */
	insertFirst(element: E): IDoublyLinkedListNode<E>;

	/**
	 * Inserts the provided node at the beginning of the list, returning the node that was inserted.
	 *
	 * @param node The node that, after this operation, will be situated at the beginning of this list.
	 * @return The inserted node.
	 */
	insertNodeFirst(node: IDoublyLinkedListNode<E>): IDoublyLinkedListNode<E>;

	/**
	 * Creates a new node with the provided content and inserts it at the end of the list, returning the newly created
	 * node.
	 *
	 * @param element The content that the newly created node should contain.
	 * @return The newly created node.
	 */
	insertLast(element: E): IDoublyLinkedListNode<E>;

	/**
	 * Inserts the provided node at the end of the list, returning the node that was inserted.
	 *
	 * @param node The node that, after this operation, will be situated at the end of this list.
	 * @return The inserted node.
	 */
	insertNodeLast(node: IDoublyLinkedListNode<E>): IDoublyLinkedListNode<E>;

	/**
	 * Removes the first node of the list, returning the removed node's contained element.
	 *
	 * @return The removed node's contained element.
	 */
	removeFirst(): E | undefined;

	/**
	 * Removes the first node of the list, returning the removed node.
	 *
	 * @return The removed node.
	 */
	removeFirstNode(): IDoublyLinkedListNode<E> | undefined;

	/**
	 * Removes the last node of the list, returning the removed node's contained element.
	 *
	 * @return The removed node's contained element.
	 */
	removeLast(): E | undefined;

	/**
	 * Removes the last node of the list, returning the removed node.
	 *
	 * @return The removed node.
	 */
	removeLastNode(): IDoublyLinkedListNode<E> | undefined;

	/**
	 * Removes the specified node from the list, returning the removed node.
	 *
	 * This method will throw an error if an attempt is made to use a node that does belong to this list.
	 *
	 * @param node The node that should be removed from the list.
	 * @return The removed node.
	 */
	removeNode(node: IDoublyLinkedListNode<E>): IDoublyLinkedListNode<E>;
	
	/**
	 * Returns an iterator over the nodes of this list.
	 *
	 * @return An iterator over the nodes of this list.
	 */
	nodeIterator(): AbstractIterator<IDoublyLinkedListNode<E>>;
	
}