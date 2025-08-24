import { TreeNode } from "@/core/tree-node";
import type { ITree } from "./types";

export class Tree<T> implements ITree<T> {
  public root: TreeNode<T>;
  private nodeMap: Map<string, TreeNode<T>> = new Map();

  constructor(
    private readonly rootData: T,
    private compareFn: (a: T, b: T) => number,
    rootId?: string
  ) {
    this.root = new TreeNode(rootData, rootId);
    this.nodeMap.set(this.root.id, this.root);
  }

  addNode(parentId: string, data: T, id?: string) {
    const parent = this.nodeMap.get(parentId);
    if (!parent) return null;

    const newNode = new TreeNode(data, id);
    parent.addChild(newNode, this.compareFn);
    this.nodeMap.set(newNode.id, newNode);

    return newNode;
  }

  removeNode(nodeId: string) {
    if (nodeId === this.root.id) return false;

    const node = this.nodeMap.get(nodeId);
    if (!node || !node.parent) return false;

    const childNodes = node.getAllChildren();
    childNodes.forEach((childNode) => {
      this.nodeMap.delete(childNode.id);
    });

    node.parent.removeChild(nodeId);
    this.nodeMap.delete(nodeId);

    return true;
  }

  getNode(nodeId: string) {
    return this.nodeMap.get(nodeId) || null;
  }

  updateNodeData(nodeId: string, newData: T) {
    const node = this.nodeMap.get(nodeId);
    if (!node) return false;

    const parent = node.parent;
    if (parent) {
      parent.removeChild(nodeId);
      node.data = newData;
      parent.addChild(node, this.compareFn);
    } else {
      node.data = newData;
    }

    return true;
  }

  getChildren(nodeId: string) {
    const node = this.nodeMap.get(nodeId);
    return node ? [...node.children] : [];
  }

  size() {
    return this.nodeMap.size;
  }

  traverse(cb: (node: TreeNode<T>) => void) {
    const dfs = (node: TreeNode<T>) => {
      cb(node);
      node.children.forEach((child) => dfs(child));
    };

    dfs(this.root);
  }

  clone() {
    const newTree = new Tree(this.root.data, this.compareFn, this.root.id);
    this.traverse((node) => {
      const newNode = newTree.addNode(node.parent?.id ?? "", node.data, node.id);
      if (newNode) {
        newTree.nodeMap.set(node.id, newNode);
      }
    });
    return newTree;
  }
}
