/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:54 PM -- March 14th, 2019.
 *	Project: @jsdsl/doubly-linked-list
 */

import { DoublyLinkedList } from "./doubly-linked-list";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export class DoublyLinkedListNode<E> {
	
	private previous: DoublyLinkedListNode<E> | undefined;
	
	private next: DoublyLinkedListNode<E> | undefined;
	
	private parentList: DoublyLinkedList<E>;
	
	private content: E | null;
	
	public constructor(content: E | null, parentList: DoublyLinkedList<E>, previousNode?: DoublyLinkedListNode<E>, nextNode?: DoublyLinkedListNode<E>) {
		
		this.content = content;
		this.parentList = parentList;
		this.previous = previousNode;
		this.next = nextNode;
		
	}
	
	public getElement(): E {
		
		if (this.content !== null) return this.content;
		else {
			
			let name: string = (this.hasPreviousNode() ? "epilogue" : "prologue");
			
			throw new Error("ERR | Attempted to retrieve null content out of a DoublyLinkedListNode (" + name + " node).");
			
		}
		
	}
	
	public getParentList(): DoublyLinkedList<E> {
		
		return this.parentList;
		
	}
	
	public hasPreviousNode(): boolean {
		
		return (this.previous !== undefined);
		
	}
	
	public getPreviousNode(): DoublyLinkedListNode<E> {
		
		if (this.hasPreviousNode()) return this.previous as DoublyLinkedListNode<E>;
		else {
			
			throw new Error("ERR | Attempted to retrieve the previous node of a DoublyLinkedListNode that did not " +
				"have a prior sibling.");
			
		}
		
	}
	
	public setPreviousNode(previousNode: DoublyLinkedListNode<E> | undefined): DoublyLinkedListNode<E> | undefined {
		
		let displaced: DoublyLinkedListNode<E> | undefined = this.previous;
		this.previous = previousNode;
		return displaced;
		
	}
	
	public hasNextNode(): boolean {
		
		return (this.next !== undefined);
		
	}
	
	public getNextNode(): DoublyLinkedListNode<E> {
		
		if (this.hasNextNode()) return this.next as DoublyLinkedListNode<E>;
		else {
			
			throw new Error("ERR | Attempted to retrieve the next node of a DoublyLinkedListNode that did not have a " +
				"successive sibling.");
			
		}
		
	}
	
	public setNextNode(nextNode: DoublyLinkedListNode<E> | undefined): DoublyLinkedListNode<E> | undefined {
		
		let displaced: DoublyLinkedListNode<E> | undefined = this.next;
		this.next = nextNode;
		return displaced;
		
	}
	
}