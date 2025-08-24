import { Tree } from "@/core/tree";
import { TreeNode } from "@/core/tree-node";

const NOT_FOUND_NODE_ID = "not-found";

describe("Tree class", () => {
  const numberCompareFn = (a: number, b: number) => a - b;
  const stringCompareFn = (a: string, b: string) => a.localeCompare(b);

  describe("constructor", () => {
    it("should create an instance of the Tree", () => {
      const tree = new Tree(10, numberCompareFn);

      expect(tree.root).toBeInstanceOf(TreeNode);
      expect(tree.root.data).toBe(10);
      expect(tree.root.parent).toBeNull();
      expect(tree.size()).toBe(1);
    });

    it("should create tree with any data", () => {
      const tree1 = new Tree("root", stringCompareFn);
      expect(tree1.root.data).toBe("root");

      const tree2 = new Tree(10, numberCompareFn);
      expect(tree2.root.data).toBe(10);
    });
  });

  describe("addNode", () => {
    let tree: Tree<number>;

    beforeEach(() => {
      tree = new Tree<number>(10, numberCompareFn);
    });

    it("should add a child node to root", () => {
      const newNode = tree.addNode(tree.root.id, 5);

      expect(newNode).toBeInstanceOf(TreeNode);
      expect(newNode?.data).toBe(5);
      expect(tree.size()).toBe(2);
      expect(tree.getNode(newNode!.id)).toBe(newNode);
      expect(tree.root.children).toContain(newNode!);
    });

    it("should add multpile children and maintain the sorted order", () => {
      tree.addNode(tree.root.id, 15);
      tree.addNode(tree.root.id, 5);
      tree.addNode(tree.root.id, 10);

      const children = tree.getChildren(tree.root.id);
      expect(children.map((child) => child.data)).toEqual([5, 10, 15]);
      expect(tree.size()).toBe(4);
    });

    it("should add nested children", () => {
      const child1 = tree.addNode(tree.root.id, 5)!;
      const child1_1 = tree.addNode(child1.id, 3)!;

      expect(child1_1).toBeInstanceOf(TreeNode);
      expect(child1_1.parent).toBe(child1);
      expect(child1.children).toContain(child1_1);
      expect(tree.size()).toBe(3);
    });

    it("should return null when parent does not exist", () => {
      const result = tree.addNode(NOT_FOUND_NODE_ID, 5);

      expect(result).toBeNull();
      expect(tree.size()).toBe(1);
    });

    it("should handle adding to deeply nested nodes", () => {
      const level1 = tree.addNode(tree.root.id, 1);
      const level2 = tree.addNode(level1!.id, 2);
      const level3 = tree.addNode(level2!.id, 3);
      const deepNode = tree.addNode(level3!.id, 4);

      expect(deepNode).toBeInstanceOf(TreeNode);
      expect(tree.size()).toBe(5);
      expect(tree.getNode(deepNode!.id)).toBe(deepNode);
    });
  });

  describe("removeNode", () => {
    let tree: Tree<number>;
    let child1: TreeNode<number>;
    let child1_1: TreeNode<number>;
    let child1_2: TreeNode<number>;

    beforeEach(() => {
      tree = new Tree<number>(10, numberCompareFn);
      child1 = tree.addNode(tree.root.id, 5)!;
      tree.addNode(tree.root.id, 15)!;
      child1_1 = tree.addNode(child1.id, 3)!;
      child1_2 = tree.addNode(child1.id, 7)!;
    });

    it("should remove a leaf node", () => {
      const result = tree.removeNode(child1_1.id);

      expect(result).toBe(true);
      expect(tree.getNode(child1_1.id)).toBeNull();
      expect(tree.size()).toBe(4);
    });

    it("should remove a node with children and all its descendants", () => {
      const result = tree.removeNode(child1.id);

      expect(result).toBe(true);
      expect(tree.getNode(child1.id)).toBeNull();
      expect(tree.getNode(child1_1.id)).toBeNull();
      expect(tree.getNode(child1_2.id)).toBeNull();
      expect(tree.size()).toBe(2);
    });

    it("should not remove root node", () => {
      const result = tree.removeNode(tree.root.id);

      expect(result).toBe(false);
      expect(tree.getNode(tree.root.id)).toBe(tree.root);
      expect(tree.size()).toBe(5);
    });

    it("should return false when trying to remove non-existent node", () => {
      const result = tree.removeNode(NOT_FOUND_NODE_ID);

      expect(result).toBe(false);
      expect(tree.size()).toBe(5);
    });
  });

  describe("getNode", () => {
    let tree: Tree<number>;
    let child1: TreeNode<number>;

    beforeEach(() => {
      tree = new Tree<number>(10, numberCompareFn);
      child1 = tree.addNode(tree.root.id, 5)!;
    });

    it("should return existing node", () => {
      const node = tree.getNode(child1.id);

      expect(node).toBeInstanceOf(TreeNode);
      expect(node?.data).toBe(5);
    });

    it("should return root node", () => {
      const node = tree.getNode(tree.root.id);

      expect(node).toBe(tree.root);
    });

    it("should return null for non-existent node", () => {
      const node = tree.getNode(NOT_FOUND_NODE_ID);

      expect(node).toBeNull();
    });
  });

  describe("updateNodeData", () => {
    let tree: Tree<number>;
    let child1: TreeNode<number>;

    beforeEach(() => {
      tree = new Tree<number>(10, numberCompareFn);
      child1 = tree.addNode(tree.root.id, 5)!;
      tree.addNode(tree.root.id, 15)!;
      tree.addNode(tree.root.id, 8)!;
    });

    it("should update node data and maintain sort order", () => {
      const result = tree.updateNodeData(child1.id, 12);

      expect(result).toBe(true);
      expect(tree.getNode(child1.id)?.data).toBe(12);

      const children = tree.getChildren(tree.root.id);
      expect(children.map((child) => child.data)).toEqual([8, 12, 15]);
    });

    it("should update root node data", () => {
      const result = tree.updateNodeData(tree.root.id, 20);

      expect(result).toBe(true);
      expect(tree.root.data).toBe(20);
    });

    it("should return false for non-existent node", () => {
      const result = tree.updateNodeData(NOT_FOUND_NODE_ID, 99);

      expect(result).toBe(false);
    });

    it("should handle updating data that changes sort position significantly", () => {
      const child1_1 = tree.addNode(child1.id, 4)!;

      const result = tree.updateNodeData(child1.id, 20);

      expect(result).toBe(true);
      expect(tree.getNode(child1.id)?.data).toBe(20);

      expect(tree.getNode(child1_1.id)?.parent).toBe(tree.getNode(child1.id));
    });
  });

  describe("getChildren", () => {
    let tree: Tree<number>;
    let child: TreeNode<number>;

    beforeEach(() => {
      tree = new Tree<number>(10, numberCompareFn);
      child = tree.addNode(tree.root.id, 5)!;
      tree.addNode(tree.root.id, 15)!;
      tree.addNode(tree.root.id, 8)!;
    });

    it("should return children in sorted order", () => {
      const children = tree.getChildren(tree.root.id);

      expect(children).toHaveLength(3);
      expect(children.map((child) => child.data)).toEqual([5, 8, 15]);
    });

    it("should return empty array for leaf node", () => {
      const children = tree.getChildren(child.id);

      expect(children).toEqual([]);
    });

    it("should return empty array for non-existent node", () => {
      const children = tree.getChildren(NOT_FOUND_NODE_ID);

      expect(children).toEqual([]);
    });

    it("should return a copy of children array", () => {
      const children = tree.getChildren(tree.root.id);
      const originalLength = tree.root.children.length;

      children.push(new TreeNode(99));

      expect(tree.root.children).toHaveLength(originalLength);
    });
  });

  describe("size", () => {
    let tree: Tree<number>;

    beforeEach(() => {
      tree = new Tree<number>(10, numberCompareFn);
    });

    it("should return 1 for tree with only root", () => {
      expect(tree.size()).toBe(1);
    });

    it("should return correct size after adding nodes", () => {
      const child1 = tree.addNode(tree.root.id, 5)!;
      tree.addNode(tree.root.id, 15);
      tree.addNode(child1.id, 3);

      expect(tree.size()).toBe(4);
    });

    it("should return correct size after removing nodes", () => {
      const child1 = tree.addNode(tree.root.id, 5)!;
      tree.addNode(child1.id, 3);

      expect(tree.size()).toBe(3);

      tree.removeNode(child1.id);

      expect(tree.size()).toBe(1);
    });
  });

  describe("traverse", () => {
    let tree: Tree<number>;
    let visitedNodes: number[];

    beforeEach(() => {
      tree = new Tree<number>(10, numberCompareFn);
      const child1 = tree.addNode(tree.root.id, 5)!;
      const child2 = tree.addNode(tree.root.id, 15)!;
      tree.addNode(child1.id, 3);
      tree.addNode(child1.id, 7);
      tree.addNode(child2.id, 12);

      visitedNodes = [];
    });

    it("should traverse the tree in pre-order", () => {
      tree.traverse((node) => {
        visitedNodes.push(node.data);
      });

      expect(visitedNodes).toEqual([10, 5, 3, 7, 15, 12]);
    });

    it("should visit root first", () => {
      tree.traverse((node) => {
        visitedNodes.push(node.data);
      });

      expect(visitedNodes[0]).toBe(10);
    });

    it("should work with empty tree", () => {
      const singleNodeTree = new Tree(42, numberCompareFn);
      const visited: number[] = [];

      singleNodeTree.traverse((node) => {
        visited.push(node.data);
      });

      expect(visited).toEqual([42]);
    });

    it("should handle the custom callback", () => {
      let sum = 0;

      tree.traverse((node) => {
        sum += node.data;
      });

      expect(sum).toBe(52);
    });
  });

  describe("edge cases", () => {
    it("should handle the case where a node is updated and the sort order is changed", () => {
      const tree = new Tree<string>("root", stringCompareFn);

      const nodeB = tree.addNode(tree.root.id, "b")!;
      const nodeA = tree.addNode(tree.root.id, "a")!;
      tree.addNode(tree.root.id, "c")!;

      expect(tree.size()).toBe(4);

      tree.updateNodeData(nodeB.id, "d");

      const children = tree.getChildren(tree.root.id);
      expect(children.map((child) => child.data)).toEqual(["a", "c", "d"]);

      tree.removeNode(nodeA.id);

      expect(tree.size()).toBe(3);
      expect(tree.getNode(nodeA.id)).toBeNull();
    });

    it("should handle the case where a middle node is removed, so all the childern of it should be removed", () => {
      const tree = new Tree<number>(0, numberCompareFn);

      let currentParent = tree.root;
      const nodes: TreeNode<number>[] = [tree.root];

      for (let i = 1; i <= 10; i++) {
        const newNode = tree.addNode(currentParent.id, i)!;
        nodes.push(newNode);
        currentParent = newNode;
      }

      expect(tree.size()).toBe(11);

      tree.removeNode(nodes[5].id);

      expect(tree.size()).toBe(5);
      for (let i = 5; i <= 10; i++) { 
        expect(tree.getNode(nodes[i].id)).toBeNull();
      }
    });
  });
});
