import { TreeNode } from "@/core/tree-node";
import type { ITree } from "./types";

export class Tree<T> implements ITree<T> {
  public root: TreeNode<T>;

  constructor(
    private readonly rootData: T,
    private compareFn: (a: T, b: T) => number
  ) {
    this.root = new TreeNode(rootData);
  }

  addNode(parentId: string, data: T): TreeNode<T> | null {
    return null;
  }

  removeNode(nodeId: string): boolean {}

  updateNodeData(nodeId: string, newData: T): boolean {}

  size(): number {}

  traverse(callback: (node: TreeNode<T>) => void): void {}

  getNode(nodeId: string): TreeNode<T> | null {}

  getChildren(nodeId: string): TreeNode<T>[] {}
}
