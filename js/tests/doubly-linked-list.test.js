"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const doubly_linked_list_1 = require("../doubly-linked-list");
const doubly_linked_list_node_1 = require("../doubly-linked-list-node");
describe("Initialization Tests", () => {
    test("Basic initialization.", () => {
        let dll = new doubly_linked_list_1.DoublyLinkedList();
        expect(dll).toBeDefined();
    });
    test("Initialization with elements.", () => {
        let dll = new doubly_linked_list_1.DoublyLinkedList("a", "b", "c");
        expect(dll).toBeDefined();
    });
});
describe("Per-method Tests", () => {
    let dll;
    let elements = ["a", "b", "c", "d", "e"];
    beforeEach(() => {
        dll = new doubly_linked_list_1.DoublyLinkedList(...elements);
    });
    test("#getFirst", () => {
        expect(dll.getFirst()).toBe("a");
    });
    test("#getFirstNode", () => {
        expect(dll.getFirstNode()).toBeInstanceOf(doubly_linked_list_node_1.DoublyLinkedListNode);
    });
    test("#getLast", () => {
        expect(dll.getLast()).toBe("e");
    });
    test("#getLastNode", () => {
        expect(dll.getLastNode()).toBeInstanceOf(doubly_linked_list_node_1.DoublyLinkedListNode);
    });
    describe("#hasNextNode", () => {
        test("Called on first node.", () => {
        });
        test("Called on last node.", () => {
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
            for (let element of elements)
                expect(dll.contains(element)).toBeTruthy();
        });
        test("Falsy checks.", () => {
            for (let element of ["1", "2", "3", "x", "y", "z"])
                expect(dll.contains(element)).toBeFalsy();
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
//# sourceMappingURL=doubly-linked-list.test.js.map