import { FileSystemNodeType } from "@/enums";
import type { FileSystemNodeData } from "@/types/file-system-node";
import type { Tree } from "@/core";

export type ValidationParams = {
  parentId: string;
  name: string;
  extension?: string;
  excludeId?: string;
};

export const isNodeNameUnique = (
  tree: Tree<FileSystemNodeData>,
  params: ValidationParams
): boolean => {
  const children = tree.getChildren(params.parentId);

  return !children.some((child) => {
    if (params.excludeId && params.excludeId === child.id) {
      return false;
    }

    return isNodeNameMatch(child.data, params.name, params.extension);
  });
};

const isNodeNameMatch = (
  nodeData: FileSystemNodeData,
  targetName: string,
  targetExtension?: string
): boolean => {
  if (nodeData.type === FileSystemNodeType.FOLDER) {
    return !targetExtension && nodeData.name === targetName;
  } else {
    return targetExtension
      ? nodeData.name === targetName && nodeData.extension === targetExtension
      : false;
  }
};

export const getNodeFullName = (nodeData: FileSystemNodeData): string => {
  if (nodeData.type === FileSystemNodeType.FILE) {
    return `${nodeData.name}.${nodeData.extension}`;
  }
  return nodeData.name;
};
