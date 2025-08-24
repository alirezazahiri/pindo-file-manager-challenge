"use client";

import { Tree, TreeNode } from "@/core";
import { FileSystemNodeType } from "@/enums";
import { FileSystemNodeData } from "@/types";
import type React from "react";

interface TreeNodeProps {
  tree: Tree<FileSystemNodeData>;
  node: TreeNode<FileSystemNodeData>;
  level: number;
}

export const TreeNodeComponent: React.FC<TreeNodeProps> = ({
  tree,
  node,
  level,
}) => {
  const isFolder = node.data.type === FileSystemNodeType.FOLDER;
  const isExpanded =
    node.data.type === FileSystemNodeType.FOLDER ? node.data.isExpanded : false;
  const children = node.children;
  const hasChildren = children.length > 0;

  return (
    <div className="select-none">
      <div className="flex items-center gap-2">
        <span>{node.data.name}</span>
      </div>
      {isFolder && isExpanded && hasChildren && (
        <div>
          {children.map((child) => (
            <TreeNodeComponent
              key={child.id}
              tree={tree}
              node={child}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};
