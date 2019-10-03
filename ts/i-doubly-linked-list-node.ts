/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	11:02 PM -- October 02nd, 2019.
 *	Project: JSDSL - Doubly Linked List
 */

import { IDoublyLinkedList } from "./i-doubly-linked-list";

/**
 * An interface representing the general form of a node in a doubly-linked list.
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export interface IDoublyLinkedListNode<E> {
	
	/**
	 * Returns the element contained in this node.
	 *
	 * @return The element contained in this node.
	 */
	getElement(): E;

	/**
	 * Returns the {@link DoublyLinkedList} that contains this node.
	 *
	 * @return The DoublyLinkedList that contains this node.
	 */
	getParentList(): IDoublyLinkedList<E>;
	
	/**
	 * Returns true if this node has a preceding node.
	 *
	 * @return true if this node has a preceding node.
	 */
	hasPreviousNode(): boolean;
	
	/**
	 * Returns this node's preceding node, or undefined if this node has no preceding sibling.
	 *
	 * @return This node's preceding node, or undefined if this node has no preceding sibling.
	 * @see IDoublyLinkedListNode#hasPreviousNode
	 */
	getPreviousNode(): IDoublyLinkedListNode<E> | undefined;
	
	/**
	 * Sets the preceding node for this node, returning the node displaced as this node's preceding sibling, or
	 * undefined if this node had no preceding sibling.
	 *
	 * @param previousNode The node to set as this node's preceding sibling.
	 * @return DOC-ME
	 */
	setPreviousNode(previousNode: IDoublyLinkedListNode<E> | undefined): IDoublyLinkedListNode<E> | undefined;
	
	/**
	 * Returns true if this node has a successive node.
	 *
	 * @return true if this node has a successive node.
	 */
	hasNextNode(): boolean;
	
	/**
	 * Returns this node's succeeding node, or undefined if this node has no successive sibling.
	 *
	 * @return This node's succeeding node, or undefined if this node has no successive sibling.
	 * @see IDoublyLinkedListNode#hasNextNode
	 */
	getNextNode(): IDoublyLinkedListNode<E> | undefined;
	
	/**
	 * Sets the succeeding node for this node, returning the node displaced as this node's succeeding sibling, or
	 * undefined if this node had no successive sibling.
	 *
	 * @param nextNode The node to set as this node's successive sibling.
	 */
	setNextNode(nextNode: IDoublyLinkedListNode<E> | undefined): IDoublyLinkedListNode<E> | undefined;
	
}