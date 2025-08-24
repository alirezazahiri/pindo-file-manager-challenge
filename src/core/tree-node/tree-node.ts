import { generateUUIDV4 } from "@/lib/utils";
import type { ITreeNode } from "./types";

export class TreeNode<T> implements ITreeNode<T> {
  public id: string;
  public parent: TreeNode<T> | null = null;
  public children: TreeNode<T>[] = [];

  constructor(public data: T) {
    this.id = generateUUIDV4();
  }

  addChild(node: TreeNode<T>, compareFn: (a: T, b: T) => number): void {}

  getAllChildren(): TreeNode<T>[] {}

  removeChild(id: string): TreeNode<T> | null {}
}
