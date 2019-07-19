/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	10:33 PM -- July 18th, 2019.
 *	Project: @jsdsl/doubly-linked-list
 */

import { DoublyLinkedList } from "../doubly-linked-list";
import { DoublyLinkedListNode } from "../doubly-linked-list-node";

/**
 *
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */

describe("Initialization Tests", () => {
	
	test("Basic initialization.", () => {
		
		let dll: DoublyLinkedList<any> = new DoublyLinkedList<any>();
		
		expect(dll).toBeDefined();
		
	});
	
	test("Initialization with elements.", () => {
		
		let dll: DoublyLinkedList<string> = new DoublyLinkedList<string>("a", "b", "c");
		
		expect(dll).toBeDefined();
		
	});
	
});

describe("Per-method Tests", () => {
	
	let dll: DoublyLinkedList<string>;
	let elements: string[] = ["a", "b", "c", "d", "e"];
	
	beforeEach(() => {
		
		dll = new DoublyLinkedList<string>(...elements);
		
	});
	
	test("#getFirst", () => {
		
		expect(dll.getFirst()).toBe("a");
		
	});
	
	test("#getFirstNode", () => {
		
		expect(dll.getFirstNode()).toBeInstanceOf(DoublyLinkedListNode);
		expect(dll.getFirstNode().getElement()).toBe("a");
		
	});
	
	test("#getLast", () => {
		
		expect(dll.getLast()).toBe("e");
		
	});
	
	test("#getLastNode", () => {
		
		expect(dll.getLastNode()).toBeInstanceOf(DoublyLinkedListNode);
		expect(dll.getLastNode().getElement()).toBe("e");
		
	});
	
	describe("#hasNextNode", () => {
		
		test("Called on first node.", () => {
			
			expect(dll.hasNextNode(dll.getFirstNode())).toBeTruthy();
			
		});
		
		test("Called on last node.", () => {
			
			expect(dll.hasNextNode(dll.getLastNode())).toBeFalsy();
			
		});
		
	});
	
	test("#getNextNode", () => {
		
		fail("Test not yet written...");
		
	});
	
	test("#hasPreviousNode", () => {
		
		fail("Test not yet written...");
		
	});
	
	test("#getPreviousNode", () => {
		
		fail("Test not yet written...");
		
	});
	
	test("#insertAfter", () => {
		
		fail("Test not yet written...");
		
	});
	
	test("#insertNodeAfter", () => {
		
		fail("Test not yet written...");
		
	});
	
	test("#insertBefore", () => {
		
		fail("Test not yet written...");
		
	});
	
	test("#insertNodeBefore", () => {
		
		fail("Test not yet written...");
		
	});
	
	test("#insertFirst", () => {
		
		fail("Test not yet written...");
		
	});
	
	test("#insertNodeFirst", () => {
		
		fail("Test not yet written...");
		
	});
	
	test("#insertLast", () => {
		
		fail("Test not yet written...");
		
	});
	
	test("#insertNodeLast", () => {
		
		fail("Test not yet written...");
		
	});
	
	test("#removeFirst", () => {
		
		fail("Test not yet written...");
		
	});
	
	test("#removeFirstNode", () => {
		
		fail("Test not yet written...");
		
	});
	
	test("#removeLast", () => {
		
		fail("Test not yet written...");
		
	});
	
	test("#removeLastNode", () => {
		
		fail("Test not yet written...");
		
	});
	
	test("#removeNode", () => {
		
		fail("Test not yet written...");
		
	});
	
	test("#add", () => {
		
		fail("Test not yet written...");
		
	});
	
	describe("#get", () => {
		
		test("Get each index.", () => {
			
			expect(dll.get(0)).toBe("a");
			expect(dll.get(1)).toBe("b");
			expect(dll.get(2)).toBe("c");
			expect(dll.get(3)).toBe("d");
			expect(dll.get(4)).toBe("e");
			
		});
		
		test("Get out-of-bounds index (under bounds).", () => {
			
			expect(() => dll.get(-1)).toThrowError(RangeError);
			
		});
		
		test("Get out-of-bounds index (above bounds).", () => {
			
			expect(() => dll.get(elements.length)).toThrowError(RangeError);
			
		});
		
	});
	
	test("#size", () => {
		
		expect(dll.size()).toBe(elements.length);
		
	});
	
	describe("#contains", () => {
		
		test("Truthy checks.", () => {
			
			for (let element of elements) expect(dll.contains(element)).toBeTruthy();
			
		});
		
		test("Falsy checks.", () => {
			
			for (let element of ["1", "2", "3", "x", "y", "z"]) expect(dll.contains(element)).toBeFalsy();
			
		});
		
	});
	
	test("#isEmpty", () => {
		
		fail("Test not yet written...");
		
	});
	
	test("#remove", () => {
		
		fail("Test not yet written...");
		
	});
	
	test("#clear", () => {
		
		fail("Test not yet written...");
		
	});
	
	test("#nodeIterator", () => {
		
		fail("Test not yet written...");
		
	});
	
	test("#iterator", () => {
		
		fail("Test not yet written...");
		
	});
	
	test("#shuffle", () => {
		
		fail("Test not yet written...");
		
	});
	
	test("#toArray", () => {
		
		expect(dll.toArray()).toStrictEqual(["a", "b", "c", "d", "e"]);
		
	});
	
});