import { TreeNode } from "@/core/tree-node";

const NOT_FOUND_NODE_ID = "not-found";

describe("TreeNode class", () => {
  type TestData = {
    name: string;
    value: number;
  };

  const compareByValue = (a: TestData, b: TestData) => a.value - b.value;
  const compareByName = (a: TestData, b: TestData) =>
    a.name.localeCompare(b.name);

  const createTestNode = (name: string, value: number) =>
    new TreeNode({ name, value });

  describe("constructor", () => {
    it("should create an instance of the TreeNode", () => {
      const node = createTestNode("test-node", 42);

      expect(node.id).toBeDefined();
      expect(node.data).toEqual({ name: "test-node", value: 42 });
      expect(node.parent).toBeNull();
      expect(node.children).toEqual([]);
    });

    it("should create nodes with any data", () => {
      const node1 = new TreeNode("alireza");
      const node2 = new TreeNode(123);
      const node3 = new TreeNode({ data: { key: "value" } });

      expect(node1.data).toBe("alireza");
      expect(node2.data).toBe(123);
      expect(node3.data).toEqual({ data: { key: "value" } });
    });
  });

  describe("addChild", () => {
    it("should add a child and set parent relationship", () => {
      const parent = createTestNode("parent", 0);
      const child = createTestNode("child", 1);

      parent.addChild(child, compareByValue);

      expect(parent.children).toHaveLength(1);
      expect(parent.children[0]).toBe(child);
      expect(child.parent).toBe(parent);
    });

    it("should maintain sorted order when adding multiple children", () => {
      const parent = createTestNode("parent", 0);
      const child1 = createTestNode("child1", 3);
      const child2 = createTestNode("child2", 1);
      const child3 = createTestNode("child3", 2);

      parent.addChild(child1, compareByValue);
      parent.addChild(child2, compareByValue);
      parent.addChild(child3, compareByValue);

      expect(parent.children).toHaveLength(3);
      expect(parent.children[0].data.value).toBe(1);
      expect(parent.children[1].data.value).toBe(2);
      expect(parent.children[2].data.value).toBe(3);
    });

    it("should insert children in the sorted order (1)", () => {
      const parent = createTestNode("parent", 0);
      const child1 = createTestNode("reza", 1);
      const child2 = createTestNode("bardia", 2);
      const child3 = createTestNode("alireza", 3);

      parent.addChild(child1, compareByName);
      parent.addChild(child2, compareByName);
      parent.addChild(child3, compareByName);

      expect(parent.children).toHaveLength(3);
      expect(parent.children[0].data.name).toBe("alireza");
      expect(parent.children[0].id).toBe(child3.id);
      expect(parent.children[1].data.name).toBe("bardia");
      expect(parent.children[1].id).toBe(child2.id);
      expect(parent.children[2].data.name).toBe("reza");
      expect(parent.children[2].id).toBe(child1.id);
    });

    it("should insert children in the sorted order (2)", () => {
      const parent = createTestNode("parent", 0);
      const children: TreeNode<TestData>[] = [];

      for (let i = 99; i >= 0; i--) {
        const child = createTestNode(`child${i}`, i);
        children.push(child);
        parent.addChild(child, compareByValue);
      }

      expect(parent.children).toHaveLength(100);

      for (let i = 0; i < 100; i++) {
        expect(parent.children[i].data.value).toBe(i);
      }
    });
  });

  describe("removeChild", () => {
    it("should remove an existing child and return it", () => {
      const parent = createTestNode("parent", 0);
      const child1 = createTestNode("child1", 1);
      const child2 = createTestNode("child2", 2);

      parent.addChild(child1, compareByValue);
      parent.addChild(child2, compareByValue);

      const removed = parent.removeChild(child1.id);
      // TODO: the child1 turns into an orphan: 
      // so the children list should not contain it 
      // the parent of the removed node should become null

      expect(removed).toBe(child1);
      expect(parent.children).toHaveLength(1);
      expect(parent.children[0]).toBe(child2);
      expect(child1.parent).toBeNull();
    });

    it("should return null when trying to remove non-existent child", () => {
      const parent = createTestNode("parent", 0);
      const child = createTestNode("child", 1);

      parent.addChild(child, compareByValue);

      const removed = parent.removeChild(NOT_FOUND_NODE_ID);

      expect(removed).toBeNull();
      expect(parent.children).toHaveLength(1);
      expect(child.parent).toBe(parent);
    });

    it("should handle removing from empty children array", () => {
      const parent = createTestNode("parent", 0);

      const removed = parent.removeChild(NOT_FOUND_NODE_ID);

      expect(removed).toBeNull();
      expect(parent.children).toHaveLength(0);
    });

    it("should maintain order after removal", () => {
      const parent = createTestNode("parent", 0);
      const child1 = createTestNode("child1", 1);
      const child2 = createTestNode("child2", 2);
      const child3 = createTestNode("child3", 3);

      parent.addChild(child1, compareByValue);
      parent.addChild(child2, compareByValue);
      parent.addChild(child3, compareByValue);

      parent.removeChild(child2.id);

      expect(parent.children).toHaveLength(2);
      expect(parent.children[0].data.value).toBe(1);
      expect(parent.children[1].data.value).toBe(3);
    });
  });

  describe("getAllChildren", () => {
    it("should return empty array for node with no children", () => {
      const node = createTestNode("node", 1);

      const allChildren = node.getAllChildren();

      expect(allChildren).toEqual([]);
    });

    it("should return all direct children", () => {
      const parent = createTestNode("parent", 0);
      const child1 = createTestNode("child1", 1);
      const child2 = createTestNode("child2", 2);

      parent.addChild(child1, compareByValue);
      parent.addChild(child2, compareByValue);

      const allChildren = parent.getAllChildren();

      expect(allChildren).toHaveLength(2);
      expect(allChildren).toContain(child1);
      expect(allChildren).toContain(child2);
    });

    it("should return all nested children in depth-first order", () => {
      const root = createTestNode("root", 0);
      const child1 = createTestNode("child1", 1);
      const child2 = createTestNode("child2", 2);
      const child1_1 = createTestNode("child1.1", 3);
      const child1_2 = createTestNode("child1.2", 4);
      const child1_1_1 = createTestNode("child1.1.1", 5);

      root.addChild(child1, compareByValue);
      root.addChild(child2, compareByValue);
      child1.addChild(child1_1, compareByValue);
      child1.addChild(child1_2, compareByValue);
      child1_1.addChild(child1_1_1, compareByValue);

      const allChildren = root.getAllChildren();

      expect(allChildren).toHaveLength(5);

      const expectedOrder = [child1, child1_1, child1_1_1, child1_2, child2];
      expect(allChildren).toEqual(expectedOrder);
    });

    it("should handle complex tree structures", () => {
      const root = createTestNode("root", 0);

      const children = [];
      for (let i = 1; i <= 3; i++) {
        const child = createTestNode(`child${i}`, i);
        children.push(child);
        root.addChild(child, compareByValue);

        for (let j = 1; j <= 2; j++) {
          const grandchild = createTestNode(`child${i}.${j}`, i * 10 + j);
          child.addChild(grandchild, compareByValue);
        }
      }

      const allChildren = root.getAllChildren();

      expect(allChildren).toHaveLength(9);

      children.forEach((child) => {
        expect(allChildren).toContain(child);
        child.children.forEach((grandchild) => {
          expect(allChildren).toContain(grandchild);
        });
      });
    });
  });

  describe("edge cases and integration", () => {
    it("should handle circular references prevention", () => {
      const node1 = createTestNode("node1", 1);
      const node2 = createTestNode("node2", 2);

      node1.addChild(node2, compareByValue);

      expect(node2.parent).toBe(node1);
      expect(node1.children).toContain(node2);
    });

    it("should maintain order after removing and adding children", () => {
      const root = createTestNode("root", 0);
      const nodes: TreeNode<TestData>[] = [];

      for (let i = 1; i <= 5; i++) {
        const node = createTestNode(`node${i}`, i);
        nodes.push(node);
        root.addChild(node, compareByValue);
      }

      root.removeChild(nodes[1].id);
      root.removeChild(nodes[3].id);

      const newNode = createTestNode("new-node", 2.5);
      root.addChild(newNode, compareByValue);

      expect(root.children).toHaveLength(4);

      const values = root.children.map((child) => child.data.value);
      expect(values).toEqual([1, 2.5, 3, 5]);

      root.children.forEach((child) => {
        expect(child.parent).toBe(root);
      });
    });

    it("should work with different generic types", () => {
      const stringNode = new TreeNode<string>("root");
      const child1 = new TreeNode<string>("child1");
      const child2 = new TreeNode<string>("child2");

      stringNode.addChild(child1, (a, b) => a.localeCompare(b));
      stringNode.addChild(child2, (a, b) => a.localeCompare(b));

      expect(stringNode.children[0].data).toBe("child1");
      expect(stringNode.children[1].data).toBe("child2");

      const numberNode = new TreeNode<number>(0);
      const numChild1 = new TreeNode<number>(10);
      const numChild2 = new TreeNode<number>(5);

      numberNode.addChild(numChild1, (a, b) => a - b);
      numberNode.addChild(numChild2, (a, b) => a - b);

      expect(numberNode.children[0].data).toBe(5);
      expect(numberNode.children[1].data).toBe(10);
    });
  });
});
