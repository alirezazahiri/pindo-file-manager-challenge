import { generateUUIDV4 } from "@/lib/utils";
import type { ITreeNode } from "./types";

export class TreeNode<T> implements ITreeNode<T> {
  public id: string;
  public parent: TreeNode<T> | null = null;
  public children: TreeNode<T>[] = [];

  constructor(public data: T, id?: string) {
    this.id = id ?? generateUUIDV4();
  }

  addChild(child: TreeNode<T>, compareFn: (a: T, b: T) => number) {
    child.parent = this;

    // given the idea of binary-search, we can insert a child in sorted order
    let left = 0;
    let right = this.children.length;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (compareFn(child.data, this.children[mid].data) < 0) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }

    this.children.splice(left, 0, child);
  }

  removeChild(childId: string) {
    const index = this.children.findIndex((child) => child.id === childId);
    if (index === -1) return null;

    const removedChild = this.children[index];
    this.children.splice(index, 1);
    removedChild.parent = null;
    return removedChild;
  }

  getAllChildren() {
    const childNodes: TreeNode<T>[] = [];

    const traverse = (node: TreeNode<T>) => {
      for (const child of node.children) {
        childNodes.push(child);
        traverse(child);
      }
    };

    traverse(this);
    return childNodes;
  }
}
