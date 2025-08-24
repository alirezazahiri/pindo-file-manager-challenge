import type { TreeNode } from './tree-node';

export interface ITreeNode<T> {
  addChild(node: TreeNode<T>, compareFn: (a: T, b: T) => number): void;
  removeChild(id: string): TreeNode<T> | null;
  getAllChildren(): TreeNode<T>[];
}
