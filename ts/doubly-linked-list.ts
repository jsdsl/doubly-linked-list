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
 * @version v0.1.0
 * @since v0.1.0
 */
export class DoublyLinkedList<E = any> extends AbstractList<E> {
	
	private prologue: DoublyLinkedListNode<E>;
	
	private epilogue: DoublyLinkedListNode<E>;
	
	public constructor(...elements: E[]) {
		
		super();
		
		this.prologue = new DoublyLinkedListNode<E>(null, this, undefined, undefined);
		this.epilogue = new DoublyLinkedListNode<E>(null, this, this.prologue, undefined);
		this.prologue.setNextNode(this.epilogue);
		
		this.addAll(elements);
	
	}
	
	protected getEpilogueNode(): DoublyLinkedListNode<E> {
		
		return this.epilogue;
		
	}
	
	protected getPrologueNode(): DoublyLinkedListNode<E> {
		
		return this.prologue;
		
	}
	
	protected insertBetween(content: E, previousNode: DoublyLinkedListNode<E>, nextNode: DoublyLinkedListNode<E>): DoublyLinkedListNode<E> {
		
		// Ensure that the provided nodes are neighbors.
		if ((previousNode.getNextNode() === nextNode) && (nextNode.getPreviousNode() === previousNode)) {
			
			let newNode: DoublyLinkedListNode<E> = new DoublyLinkedListNode<E>(content, this, previousNode, nextNode);
			previousNode.setNextNode(newNode);
			nextNode.setPreviousNode(newNode);
			
			return newNode;
			
		} else throw new Error("Attempted to insert new content between two non-adjacent DoublyLinkedNodes.");
		
	}
	
	protected insertNodeBetween(node: DoublyLinkedListNode<E>,
								previousNode: DoublyLinkedListNode<E>,
								nextNode: DoublyLinkedListNode<E>): DoublyLinkedListNode<E> {
		
		// Ensure that the provided nodes are neighbors.
		if ((previousNode.getNextNode() === nextNode) && (nextNode.getPreviousNode() === previousNode)) {
			
			if (node.hasPreviousNode() || node.hasNextNode()) {
				
				throw new Error("ERR | Attempted to insert an already-located node (a node with either a prior or " +
					"successive sibling) into a DoublyLinkedList.");
				
			} else {
				
				node.setPreviousNode(previousNode);
				node.setNextNode(nextNode);
				
				previousNode.setNextNode(node);
				nextNode.setPreviousNode(node);
				
				return node;
				
			}
			
		} else throw new Error("Attempted to insert new content between two non-adjacent DoublyLinkedNodes.");
		
	}
	
	public getFirst(): E {
		
		return this.getFirstNode().getElement();
		
	}
	
	public getFirstNode(): DoublyLinkedListNode<E> {
		
		if (this.isEmpty()) throw new Error("Attempted to access the first node of an empty TSADoublyLinkedList");
		else return this.getPrologueNode().getNextNode();
		
	}
	
	public getLast(): E {
		
		return this.getLastNode().getElement();
		
	}
	
	public getLastNode(): DoublyLinkedListNode<E> {
		
		if (this.isEmpty()) throw new Error("Attempted to access the last node of an empty TSADoublyLinkedList");
		else return this.getEpilogueNode().getPreviousNode();
		
	}
	
	public hasNextNode(node: DoublyLinkedListNode<E>): boolean {
		
		if (node.getParentList() === this) {
			
			if (this.isEmpty()) return false;
			else return ((node !== this.getLastNode()) && (node !== this.getEpilogueNode()));
			
		} else {
			
			throw new Error("Attempted to check the next node of a TSADoublyLinkedListNode that did not appear in the" +
				" given TSADoublyLinkedList.");
			
		}
		
	}
	
	public getNextNode(node: DoublyLinkedListNode<E>): DoublyLinkedListNode<E> {
		
		if (this.hasNextNode(node)) return node.getNextNode();
		else throw new Error("Attempted to get the next node of a node that did not have a succeeding sibling.");
		
	}
	
	public hasPreviousNode(node: DoublyLinkedListNode<E>): boolean {
		
		if (node.getParentList() === this) {
			
			if (this.isEmpty()) return false;
			else return ((node !== this.getFirstNode()) && (node !== this.getPrologueNode()));
			
		} else {
			
			throw new Error("Attempted to check the next node of a TSADoublyLinkedListNode that did not appear in the" +
				" given TSADoublyLinkedList.");
			
		}
		
	}
	
	public getPreviousNode(node: DoublyLinkedListNode<E>): DoublyLinkedListNode<E> {
		
		if (this.hasPreviousNode(node)) return node.getPreviousNode();
		else throw new Error("Attempted to get the previous node of a node that did not have a preceding sibling.");
		
	}
	
	public insertAfter(element: E, node: DoublyLinkedListNode<E>): DoublyLinkedListNode<E> {
		
		if (node.getParentList() !== this) {
			
			throw new Error("Attempted to insert an element after a node that does not occur in this " +
				"TSADoublyLinkedList.");
			
		} else if (node === this.getEpilogueNode()) {
			
			throw new Error("Attempted to insert an element after the prologue node of a TSADoublyLinkedList.");
			
		} else return this.insertBetween(element, node, node.getNextNode());
		
	}
	
	public insertNodeAfter(node: DoublyLinkedListNode<E>, afterNode: DoublyLinkedListNode<E>): DoublyLinkedListNode<E> {
		
		if (afterNode.getParentList() !== this) {
			
			throw new Error("Attempted to insert a node after a node that does not occur in this " +
				"TSADoublyLinkedList.");
			
		} else if (afterNode === this.getPrologueNode()) {
			
			throw new Error("Attempted to insert a node after the prologue node of a TSADoublyLinkedList.");
			
		} else return this.insertNodeBetween(node, afterNode, afterNode.getNextNode());
		
	}
	
	public insertBefore(element: E, node: DoublyLinkedListNode<E>): DoublyLinkedListNode<E> {
		
		if (node.getParentList() !== this) {
			
			throw new Error("Attempted to insert an element before a node that does not occur in this " +
				"TSADoublyLinkedList.");
			
		} else if (node === this.getPrologueNode()) {
			
			throw new Error("Attempted to insert an element before the epilogue node of a TSADoublyLinkedList.");
			
		} else return this.insertBetween(element, node.getPreviousNode(), node);
		
	}
	
	public insertNodeBefore(node: DoublyLinkedListNode<E>, beforeNode: DoublyLinkedListNode<E>): DoublyLinkedListNode<E> {
		
		if (beforeNode.getParentList() !== this) {
			
			throw new Error("Attempted to insert a node before a node that does not occur in this " +
				"TSADoublyLinkedList.");
			
		} else if (beforeNode === this.getEpilogueNode()) {
			
			throw new Error("Attempted to insert a node before the epilogue node of a TSADoublyLinkedList.");
			
		} else return this.insertNodeBetween(node, beforeNode.getPreviousNode(), beforeNode);
		
	}
	
	public insertFirst(element: E): DoublyLinkedListNode<E> {
		
		return this.insertAfter(element, this.getPrologueNode());
		
	}
	
	public insertNodeFirst(node: DoublyLinkedListNode<E>): DoublyLinkedListNode<E> {
		
		return this.insertNodeAfter(node, this.getPrologueNode());
		
	}
	
	public insertLast(element: E): DoublyLinkedListNode<E> {
		
		return this.insertBefore(element, this.getEpilogueNode());
		
	}
	
	public insertNodeLast(node: DoublyLinkedListNode<E>): DoublyLinkedListNode<E> {
		
		return this.insertNodeBefore(node, this.getEpilogueNode());
		
	}
	
	public removeFirst(): E {
		
		return this.removeFirstNode().getElement();
		
	}
	
	public removeFirstNode(): DoublyLinkedListNode<E> {
		
		if (this.isEmpty()) throw new Error("Attempted to remove the first node of an empty TSADoublyLinkedList.");
		else return this.removeNode(this.getFirstNode());
		
	}
	
	public removeLast(): E {
		
		return this.removeLastNode().getElement();
		
	}
	
	public removeLastNode(): DoublyLinkedListNode<E> {
		
		if (this.isEmpty()) throw new Error("Attempted to remove the last node of an empty TSADoublyLinkedList.");
		else return this.removeNode(this.getLastNode());
		
	}
	
	public removeNode(node: DoublyLinkedListNode<E>): DoublyLinkedListNode<E> {
		
		if (node.getParentList() === this) {
			
			let displaced: DoublyLinkedListNode<E> = node;
			
			node.getPreviousNode().setNextNode(node.getNextNode());
			node.getNextNode().setPreviousNode(node.getPreviousNode());
			
			node.setPreviousNode(undefined);
			node.setNextNode(undefined);
			
			return displaced;
			
		} else throw new Error("Attempted to remove a DoublyLinkedListNode that did not appear in the given DoublyLinkedList.");
		
	}
	
	public add(element: E): void {
		
		this.insertLast(element);
		
	}
	
	public get(index: number): E {
		
		if (index < 0) {
			
			throw new RangeError("ERR | Attempted to retrieve an out-of-bounds index out of a DoublyLinkedList.");
			
		}
		
		let iterator: AbstractIterator<E> = this.iterator();
		
		for (let i: number = 0; i < index; i++) {
			
			if (iterator.hasNext()) iterator.next();
			else throw new RangeError("ERR | Attempted to retrieve an out-of-bounds index out of a DoublyLinkedList.");
			
		}
		
		if (iterator.hasNext()) return iterator.next() as E;
		else throw new RangeError("ERR | Attempted to retrieve an out-of-bounds index out of a DoublyLinkedList.");
		
	}
	
	public size(): number {
		
		let size: number = 0;
		
		this.nodeIterator().forEachRemaining(() => size++);
		
		return size;
		
	}
	
	public contains(searchElement: E): boolean {
		
		for (let element of this.iterator()) if (element === searchElement) return true;
		
		return false;
		
	}
	
	public isEmpty(): boolean {
		
		return (this.getPrologueNode().getNextNode() === this.getEpilogueNode());
		
	}
	
	public remove(element: E): E {
		
		for (let node of this.nodeIterator()) {
			
			if (node.getElement() === element) {
				
				this.removeNode(node);
				return node.getElement();
				
			}
			
		}
		
		throw new Error("ERR | Attempted to remove an element from this DoublyLinkedList that did not exist.");
		
	}
	
	public clear(): void {
		
		this.prologue.setNextNode(this.epilogue);
		this.epilogue.setPreviousNode(this.prologue);
		
	}
	
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

				return (this.currentNode = this.currentNode.getNextNode());

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
	
	public toArray(): E[] {
		
		let result: E[] = [];
		
		this.iterator().forEachRemaining((element: E): any => result.push(element));
		
		return result;
		
	}
	
}