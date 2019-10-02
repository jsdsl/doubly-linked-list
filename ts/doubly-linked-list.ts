/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:54 PM -- March 14th, 2019.
 *	Project: @jsdsl/doubly-linked-list
 */

import { AbstractList } from "@jsdsl/abstract-list";
import { DoublyLinkedListNode } from "./doubly-linked-list-node";
import { AbstractIterator } from "iter-over";

/**
 * A list-type data structure consisting of an ordered collection of nodes that rely on node-to-node linkages to
 * maintain the internal structure of the list.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.2.0
 * @since v0.1.0
 */
export class DoublyLinkedList<E = any> extends AbstractList<E> {
	
	/**
	 * The 'prologue' node of this list - the node that occurs before all other nodes.
	 * 
	 * Note that this node is purely used to maintain the internal structure of this list, and cannot be accessed in any
	 * way outside of the scope of this class.
	 */
	private prologue: DoublyLinkedListNode<E>;
	
	/**
	 * The 'epilogue' node of this list - the node that occurs after all other nodes.
	 * 
	 * Note that this node is purely used to maintain the internal structure of this list, and cannot be accessed in any
	 * way outside of the scope of this class.
	 */
	private epilogue: DoublyLinkedListNode<E>;
	
	/**
	 * Initializes a new DoublyLinkedList with the specified elements.
	 * 
	 * @param elements The elements to add to the list.
	 */
	public constructor(...elements: E[]) {
		
		super();
		
		this.prologue = new DoublyLinkedListNode<E>(null, this, undefined, undefined);
		this.epilogue = new DoublyLinkedListNode<E>(null, this, this.prologue, undefined);
		this.prologue.setNextNode(this.epilogue);
		
		this.addAll(elements);
	
	}
	
	/**
	 * Returns the epilogue node of this list.
	 * 
	 * @return The epilogue node of this list.
	 */
	protected getEpilogueNode(): DoublyLinkedListNode<E> {
		
		return this.epilogue;
		
	}
	
	/**
	 * Returns the prologue node of this list.
	 *
	 * @return The prologue node of this list.
	 */
	protected getPrologueNode(): DoublyLinkedListNode<E> {
		
		return this.prologue;
		
	}
	
	/**
	 * Creates a new node with the provided content and inserts it between some specified preceding and successive
	 * nodes, returning the newly created middle node.
	 * 
	 * Note that this method will throw an error if, prior to this method's operation, the specified preceding and
	 * successive nodes are not adjacent.
	 * 
	 * @param content The content that the newly created node should contain.
	 * @param previousNode The node that, after this operation, will be situated just before the 'center' node.
	 * @param nextNode The node that, after this operation, will be situated just after the 'center' node.
	 * @return The newly created and placed 'center' node.
	 */
	protected insertBetween(content: E, previousNode: DoublyLinkedListNode<E>, nextNode: DoublyLinkedListNode<E>): DoublyLinkedListNode<E> {
		
		// Ensure that the provided nodes are neighbors.
		if ((previousNode.getNextNode() === nextNode) && (nextNode.getPreviousNode() === previousNode)) {
			
			let newNode: DoublyLinkedListNode<E> = new DoublyLinkedListNode<E>(content, this, previousNode, nextNode);
			previousNode.setNextNode(newNode);
			nextNode.setPreviousNode(newNode);
			
			return newNode;
			
		} else throw new Error("Attempted to insert new content between two non-adjacent DoublyLinkedNodes.");
		
	}
	
	/**
	 * Inserts the provided node between some specified preceding and successive nodes, returning the middle node.
	 * 
	 * Note that this method will throw an error if, prior to this method's operation, the specified preceding and
	 * successive nodes are not adjacent, or if the provided 'center' node already has sibling nodes.
	 * 
	 * @param centerNode The node that, after this operation, will be situated between the preceding and successive
	 * nodes.
	 * @param previousNode The node that, after this operation, will be situated just before the 'center' node.
	 * @param nextNode The node that, after this operation, will be situated just after the 'center' node.
	 * @return The newly placed 'center' node.
	 */
	protected insertNodeBetween(centerNode: DoublyLinkedListNode<E>,
								previousNode: DoublyLinkedListNode<E>,
								nextNode: DoublyLinkedListNode<E>): DoublyLinkedListNode<E> {
		
		// Ensure that the provided nodes are neighbors.
		if ((previousNode.getNextNode() === nextNode) && (nextNode.getPreviousNode() === previousNode)) {
			
			if (centerNode.hasPreviousNode() || centerNode.hasNextNode()) {
				
				throw new Error("ERR | Attempted to insert an already-located node (a node with either a preceding or" +
					" successive sibling) into a DoublyLinkedList.");
				
			} else {
				
				centerNode.setPreviousNode(previousNode);
				centerNode.setNextNode(nextNode);
				
				previousNode.setNextNode(centerNode);
				nextNode.setPreviousNode(centerNode);
				
				return centerNode;
				
			}
			
		} else throw new Error("Attempted to insert new content between two non-adjacent DoublyLinkedNodes.");
		
	}
	
	/**
	 * Returns the first element in this list, or undefined if this list is empty.
	 * 
	 * @return The first element in this list, or undefined if this list is empty.
	 */
	public getFirst(): E | undefined {
		
		if (this.isEmpty()) return undefined;
		else return (this.getFirstNode() as DoublyLinkedListNode<E>).getElement();
		
	}
	
	/**
	 * Returns the first node in this list, or undefined if this list is empty.
	 *
	 * @return The first node in this list, or undefined if this list is empty.
	 */
	public getFirstNode(): DoublyLinkedListNode<E> | undefined {
		
		return this.getPrologueNode().getNextNode();
		
	}
	
	/**
	 * Returns the last element in this list, or undefined if this list is empty.
	 *
	 * @return The last element in this list, or undefined if this list is empty.
	 */
	public getLast(): E | undefined {
		
		if (this.isEmpty()) return undefined;
		else return (this.getLastNode() as DoublyLinkedListNode<E>).getElement();
		
	}
	
	/**
	 * Returns the last node in this list, or undefined if this list is empty.
	 *
	 * @return The last node in this list, or undefined if this list is empty.
	 */
	public getLastNode(): DoublyLinkedListNode<E> | undefined {
		
		if (this.isEmpty()) return undefined;
		else return this.getEpilogueNode().getPreviousNode();
		
	}
	
	/**
	 * Returns true if the provided node has a successive node.
	 * 
	 * This method will throw an error if an attempt is made to use a node that does belong to this list.
	 * 
	 * @param node The node for which to check for a successive node.
	 * @return true if the provided node has a successive node.
	 */
	public hasNextNode(node: DoublyLinkedListNode<E>): boolean {
		
		if (node.getParentList() === this) {
			
			if (this.isEmpty()) return false;
			else return ((node !== this.getLastNode()) && (node !== this.getEpilogueNode()));
			
		} else {
			
			throw new Error("Attempted to check the successive node of a DoublyLinkedListNode that did not appear " +
				"in the given DoublyLinkedList.");
			
		}
		
	}
	
	/**
	 * Returns the successive node of the provided node, or undefined if the provided node has no successive sibling.
	 * 
	 * This method will throw an error if an attempt is made to use a node that does belong to this list. 
	 * 
	 * @param node The node for which to retrieve a successive node.
	 * @return The successive node of the provided node, or undefined if the provided node has no successive sibling.
	 * @see DoublyLinkedList#hasNextNode
	 */
	public getNextNode(node: DoublyLinkedListNode<E>): DoublyLinkedListNode<E> | undefined {
		
		if (!this.hasNextNode(node)) return undefined;
		else return node.getNextNode();
		
	}
	
	/**
	 * Returns true if the provided node has a preceding node.
	 *
	 * This method will throw an error if an attempt is made to use a node that does belong to this list.
	 * 
	 * @param node The node for which to check for a preceding node.
	 * @return true if the provided node has a preceding node.
	 */
	public hasPreviousNode(node: DoublyLinkedListNode<E>): boolean {
		
		if (node.getParentList() === this) {
			
			if (this.isEmpty()) return false;
			else return ((node !== this.getFirstNode()) && (node !== this.getPrologueNode()));
			
		} else {
			
			throw new Error("Attempted to check the successive node of a DoublyLinkedListNode that did not appear in " +
				"the given DoublyLinkedList.");
			
		}
		
	}
	
	/**
	 * Returns the preceding node of the provided node, or undefined if the provided node has no preceding sibling.
	 *
	 * This method will throw an error if an attempt is made to use a node that does belong to this list.
	 * 
	 * @param node The node for which to retrieve a preceding node.
	 * @return The preceding node of the provided node, or undefined if the provided node has no preceding sibling.
	 * @see DoublyLinkedList#hasPreviousNode
	 */
	public getPreviousNode(node: DoublyLinkedListNode<E>): DoublyLinkedListNode<E> | undefined {
		
		if (!this.hasPreviousNode(node)) return undefined;
		else return node.getPreviousNode();
		
	}
	
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
	public insertAfter(element: E, node: DoublyLinkedListNode<E>): DoublyLinkedListNode<E> {
		
		if (node.getParentList() !== this) {
			
			throw new Error("Attempted to insert an element after a node that does not occur in this " +
				"DoublyLinkedList.");
			
		} else if (node === this.getEpilogueNode()) {
			
			throw new Error("Attempted to insert an element after the prologue node of a DoublyLinkedList.");
			
		} else return this.insertBetween(element, node, node.getNextNode() as DoublyLinkedListNode<E>);
		
	}
	
	/**
	 * Inserts the provided node after the specified preceding node, returning the node that was inserted.
	 * 
	 * This method will throw an error if an attempt is made to use a node that does belong to this list.
	 * 
	 * @param node The node that, after this operation, will be situated after the specified preceding node.
	 * @param afterNode The node after which the provided node will be inserted.
	 * @return The inserted node.
	 */
	public insertNodeAfter(node: DoublyLinkedListNode<E>, afterNode: DoublyLinkedListNode<E>): DoublyLinkedListNode<E> {
		
		if (afterNode.getParentList() !== this) {
			
			throw new Error("Attempted to insert a node after a node that does not occur in this " +
				"DoublyLinkedList.");
			
		} else if (afterNode === this.getPrologueNode()) {
			
			throw new Error("Attempted to insert a node after the prologue node of a DoublyLinkedList.");
			
		} else return this.insertNodeBetween(node, afterNode, afterNode.getNextNode() as DoublyLinkedListNode<E>);
		
	}
	
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
	public insertBefore(element: E, node: DoublyLinkedListNode<E>): DoublyLinkedListNode<E> {
		
		if (node.getParentList() !== this) {
			
			throw new Error("Attempted to insert an element before a node that does not occur in this " +
				"DoublyLinkedList.");
			
		} else if (node === this.getPrologueNode()) {
			
			throw new Error("Attempted to insert an element before the epilogue node of a DoublyLinkedList.");
			
		} else return this.insertBetween(element, node.getPreviousNode() as DoublyLinkedListNode<E>, node);
		
	}
	
	/**
	 * Inserts the provided node before the specified succeeding node, returning the node that was inserted.
	 * 
	 * This method will throw an error if an attempt is made to use a node that does belong to this list.
	 * 
	 * @param node The node that, after this operation, will be situated before the specified succeeding node.
	 * @param beforeNode The node before which the provided node will be inserted.
	 * @return The inserted node.
	 */
	public insertNodeBefore(node: DoublyLinkedListNode<E>, beforeNode: DoublyLinkedListNode<E>): DoublyLinkedListNode<E> {
		
		if (beforeNode.getParentList() !== this) {
			
			throw new Error("Attempted to insert a node before a node that does not occur in this " +
				"DoublyLinkedList.");
			
		} else if (beforeNode === this.getEpilogueNode()) {
			
			throw new Error("Attempted to insert a node before the epilogue node of a DoublyLinkedList.");
			
		} else return this.insertNodeBetween(node, beforeNode.getPreviousNode() as DoublyLinkedListNode<E>, beforeNode);
		
	}
	
	/**
	 * Creates a new node with the provided content and inserts it at the beginning of the list, returning the newly
	 * created node.
	 * 
	 * @param element The content that the newly created node should contain.
	 * @return The newly created node.
	 */
	public insertFirst(element: E): DoublyLinkedListNode<E> {
		
		return this.insertAfter(element, this.getPrologueNode());
		
	}
	
	/**
	 * Inserts the provided node at the beginning of the list, returning the node that was inserted.
	 * 
	 * @param node The node that, after this operation, will be situated at the beginning of this list.
	 * @return The inserted node.
	 */
	public insertNodeFirst(node: DoublyLinkedListNode<E>): DoublyLinkedListNode<E> {
		
		return this.insertNodeAfter(node, this.getPrologueNode());
		
	}
	
	/**
	 * Creates a new node with the provided content and inserts it at the end of the list, returning the newly created
	 * node.
	 * 
	 * @param element The content that the newly created node should contain.
	 * @return The newly created node.
	 */
	public insertLast(element: E): DoublyLinkedListNode<E> {
		
		return this.insertBefore(element, this.getEpilogueNode());
		
	}
	
	/**
	 * Inserts the provided node at the end of the list, returning the node that was inserted.
	 *
	 * @param node The node that, after this operation, will be situated at the end of this list.
	 * @return The inserted node.
	 */
	public insertNodeLast(node: DoublyLinkedListNode<E>): DoublyLinkedListNode<E> {
		
		return this.insertNodeBefore(node, this.getEpilogueNode());
		
	}
	
	/**
	 * Removes the first node of the list, returning the removed node's contained element.
	 * 
	 * @return The removed node's contained element.
	 */
	public removeFirst(): E | undefined {
		
		if (this.isEmpty()) return undefined;
		else return (this.removeFirstNode() as DoublyLinkedListNode<E>).getElement();
		
	}
	
	/**
	 * Removes the first node of the list, returning the removed node.
	 * 
	 * @return The removed node.
	 */
	public removeFirstNode(): DoublyLinkedListNode<E> | undefined {
		
		if (this.isEmpty()) return undefined;
		else return this.removeNode(this.getFirstNode() as DoublyLinkedListNode<E>);
		
	}
	
	/**
	 * Removes the last node of the list, returning the removed node's contained element.
	 *
	 * @return The removed node's contained element.
	 */
	public removeLast(): E | undefined {
		
		if (this.isEmpty()) return undefined;
		else return (this.removeLastNode() as DoublyLinkedListNode<E>).getElement();
		
	}
	
	/**
	 * Removes the last node of the list, returning the removed node.
	 *
	 * @return The removed node.
	 */
	public removeLastNode(): DoublyLinkedListNode<E> | undefined {
		
		if (this.isEmpty()) return undefined;
		else return this.removeNode(this.getLastNode() as DoublyLinkedListNode<E>);
		
	}
	
	/**
	 * Removes the specified node from the list, returning the removed node.
	 * 
	 * This method will throw an error if an attempt is made to use a node that does belong to this list.
	 * 
	 * @param node The node that should be removed from the list.
	 * @return The removed node.
	 */
	public removeNode(node: DoublyLinkedListNode<E>): DoublyLinkedListNode<E> {
		
		if (node.getParentList() !== this) {
			
			throw new Error("Attempted to remove a DoublyLinkedListNode that did not appear in the given " +
				"DoublyLinkedList.");
			
		} else if (!node.hasPreviousNode()) {
			
			throw new Error("ERR | Attempted to remove a DoublyLinkedListNode without a preceding node - most likely " +
				"the prologue node!");
			
		} else if (!node.hasNextNode()) {
			
			throw new Error("ERR | Attempted to remove a DoublyLinkedListNode without a successive node - most " +
				"likely the epilogue node!");
			
		} else {
			
			let displaced: DoublyLinkedListNode<E> = node;
			
			(node.getPreviousNode() as DoublyLinkedListNode<E>).setNextNode(node.getNextNode());
			(node.getNextNode() as DoublyLinkedListNode<E>).setPreviousNode(node.getPreviousNode());
			
			node.setPreviousNode(undefined);
			node.setNextNode(undefined);
			
			return displaced;
			
		}
		
	}
	
	/**
	 * Creates a new node with the provided content and inserts it at the end of the list, returning the newly created node.
	 * 
	 * Note that this is an alias method for {@link DoublyLinkedList#insertLast}.
	 * 
	 * @param element The content that the newly created node should contain.
	 * @return The newly created node.
	 * @see DoublyLinkedList#insertLast
	 */
	public add(element: E): void {
		
		this.insertLast(element);
		
	}
	
	/**
	 * Attempts to retrieve the element at the provided index in this list, returning undefined if the provided index is
	 * out-of-bounds.
	 * 
	 * @param index The index at which to attempt to retrieve an element from this list.
	 * @return The element in this list at the specified index, or undefined if the provided index is out-of-bounds.
	 */
	public get(index: number): E | undefined {
		
		if (index < 0) return undefined;
		
		let iterator: AbstractIterator<E> = this.iterator();
		
		for (let i: number = 0; i < index; i++) {
			
			if (iterator.hasNext()) iterator.next();
			else return undefined;
			
		}
		
		if (iterator.hasNext()) return iterator.next() as E;
		else return undefined;
		
	}
	
	/**
	 * Returns the number of elements in this list.
	 *
	 * @return The number of elements in this list.
	 */
	public size(): number {
		
		let size: number = 0;
		
		this.nodeIterator().forEachRemaining(() => size++);
		
		return size;
		
	}
	
	/**
	 * Returns true if this list contains the specified search element.
	 * 
	 * @param searchElement The element to search this list for.
	 * @return true if this list contains the specified search element.
	 */
	public contains(searchElement: E): boolean {
		
		for (let element of this.iterator()) if (element === searchElement) return true;
		
		return false;
		
	}
	
	/**
	 * Returns true if this list contains no items.
	 *
	 * @return true if this list contains no items.
	 * @see DoublyLinkedList#size
	 */
	public isEmpty(): boolean {
		
		return (this.getPrologueNode().getNextNode() === this.getEpilogueNode());
		
	}
	
	/**
	 * Removes the specified element from this list, returning the removed element or undefined if no such element was
	 * present in the list.
	 * 
	 * Note that this method only removes the first instance occurring in this list (when traversing the list from
	 * beginning to end), and does NOT remove all instances of the provided element.
	 * 
	 * @param element The element to remove from this list.
	 * @return The removed element or undefined if no such element was present in the list.
	 */
	public remove(element: E): E | undefined {
		
		for (let node of this.nodeIterator()) {
			
			if (node.getElement() === element) {
				
				this.removeNode(node);
				return node.getElement();
				
			}
			
		}
		
		return undefined;
		
	}
	
	/**
	 * Removes all elements from this list, rendering the list empty.
	 */
	public clear(): void {
		
		this.prologue.setNextNode(this.epilogue);
		this.epilogue.setPreviousNode(this.prologue);
		
	}
	
	/**
	 * Returns an iterator over the nodes of this list.
	 *
	 * @return An iterator over the nodes of this list.
	 */
	public nodeIterator(): AbstractIterator<DoublyLinkedListNode<E>> {
		
		return new class extends AbstractIterator<DoublyLinkedListNode<E>> {
	
			private firstNode: DoublyLinkedListNode<E>;
			
			private currentNode: DoublyLinkedListNode<E>;
	
			private dll: DoublyLinkedList<E>;
	
			public constructor(prologue: DoublyLinkedListNode<E>, dll: DoublyLinkedList<E>) {
	
				super();
				
				this.firstNode = prologue;
				this.currentNode = prologue;
				this.dll = dll;
	
			}
	
			public hasNext(): boolean {
	
				return this.dll.hasNextNode(this.currentNode);
	
			}
	
			public next(): DoublyLinkedListNode<E> {
	
				return (this.currentNode = this.currentNode.getNextNode() as DoublyLinkedListNode<E>);
	
			}
	
			public remove(): DoublyLinkedListNode<E> {
	
				let removedNode: DoublyLinkedListNode<E> = this.currentNode;
	
				this.dll.removeNode(this.currentNode);
	
				return removedNode;
	
			}
			
			public reset(): void {
				
				this.currentNode = this.firstNode;
				
			}
	
		}(this.prologue, this);
		
	}
	
	/**
	 * Returns an iterator over the elements of this list.
	 *
	 * @return An iterator over the elements of this list.
	 */
	public iterator(): AbstractIterator<E> {
		
		return new class extends AbstractIterator<E> {
			
			private nodeIterator: AbstractIterator<DoublyLinkedListNode<E>>;
			
			public constructor(nodeIterator: AbstractIterator<DoublyLinkedListNode<E>>) {
				
				super();
				
				this.nodeIterator = nodeIterator;
				
			}
			
			public hasNext(): boolean {
				
				return this.nodeIterator.hasNext();
				
			}
			
			public next(): E | undefined {
				
				return (this.nodeIterator.next() as DoublyLinkedListNode<E>).getElement();
				
			}
			
		}(this.nodeIterator());
		
	}
	
	/**
	 * Randomizes the order of the elements in the list.
	 * 
	 * @param iterations The number of times that the list should be shuffled.
	 */
	public shuffle(iterations: number = 1): void {
		
		for (let count: number = 0; count < iterations; count++) {
			
			let elements: E[] = this.toArray();
			this.clear();
			
			while (elements.length !== 0) {
				
				let random: number = Math.floor(Math.random() * elements.length);
				let element: E = elements.splice(random, 1)[0];
				this.add(element);
				
			}
			
		}
		
	}
	
	/**
	 * Returns this list represented as an array of its elements.
	 *
	 * @return This list represented as an array of its elements.
	 */
	public toArray(): E[] {
		
		let result: E[] = [];
		
		this.iterator().forEachRemaining((element: E): any => result.push(element));
		
		return result;
		
	}
	
}