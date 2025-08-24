import type { TreeNode } from "@/core/tree-node";

export interface ITree<T> {
  addNode(parentId: string, data: T): TreeNode<T> | null;
  removeNode(nodeId: string): boolean;
  getNode(nodeId: string): TreeNode<T> | null;
  updateNodeData(nodeId: string, newData: T): boolean;
  getChildren(nodeId: string): TreeNode<T>[];
  size(): number;
  traverse(cb: (node: TreeNode<T>) => void): void;
}
