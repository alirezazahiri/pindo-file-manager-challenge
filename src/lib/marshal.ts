import { Tree } from "@/core";
import { Errors } from "@/enums/errors.enum";

type TreeNodeMarshalData<T> = { id: string; data: T; parentId: string | null };
type TreeMarshalData<T> = { rootId: string; nodes: TreeNodeMarshalData<T>[] };

export const marshalTree = <T>(tree: Tree<T>) => {
  const nodes: TreeNodeMarshalData<T>[] = [];

  tree.traverse((node) => {
    nodes.push({
      id: node.id,
      data: node.data,
      parentId: node.parent?.id ?? null,
    });
  });

  return JSON.stringify({ rootId: tree.root.id, nodes });
};

export const unmarshalTree = <T>(
  marshalled: string,
  compareFn: (a: T, b: T) => number
) => {
  const parsed = JSON.parse(marshalled) as TreeMarshalData<T>;
  const nodeMap = new Map<string, TreeNodeMarshalData<T>>();

  for (const node of parsed.nodes) {
    nodeMap.set(node.id, node);
  }

  const rootNode = nodeMap.get(parsed.rootId);

  if (!rootNode) {
    throw new Error(Errors.ROOT_NODE_NOT_FOUND);
  }

  const tree = new Tree<T>(rootNode.data, compareFn, parsed.rootId);

  const childrenOfParent = new Map<string, TreeNodeMarshalData<T>[]>();
  for (const node of parsed.nodes) {
    if (node.parentId && node.id !== parsed.rootId) {
      const siblings = childrenOfParent.get(node.parentId) || [];
      siblings.push(node);
      childrenOfParent.set(node.parentId, siblings);
    }
  }

  const queue: string[] = [parsed.rootId];
  const visited = new Set([parsed.rootId]);

  while (queue.length > 0) {
    const parentId = queue.shift()!;
    const children = childrenOfParent.get(parentId);

    if (children) {
      for (const child of children) {
        if (!visited.has(child.id)) {
          tree.addNode(parentId, child.data, child.id);
          visited.add(child.id);
          queue.push(child.id);
        }
      }
    }
  }

  return tree;
};
