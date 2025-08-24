"use client";

import { Button } from "@/components/ui";
import { Tree, TreeNode } from "@/core";
import { FileSystemNodeType } from "@/enums";
import { FileSystemNodeData } from "@/types";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  FileIcon,
  FolderIcon,
  FolderOpenIcon,
} from "lucide-react";
import type React from "react";
import { TreeNodeActions } from "@/features/file-manager/components/tree-node-actions";

type TreeNodeDataProps = {
  tree: Tree<FileSystemNodeData>;
  node: TreeNode<FileSystemNodeData>;
  level: number;
};

type TreeNodeEventProps = {
  onAddFile: () => void;
  onAddFolder: () => void;
  onRenameFolder: (id: string) => void;
  onDeleteNode: (id: string) => void;
  onRenameFile: (id: string) => void;
  onToggleFolderExpansion: (id: string) => void;
};

type TreeNodeProps = TreeNodeDataProps & TreeNodeEventProps;

export const TreeNodeComponent: React.FC<TreeNodeProps> = ({
  tree,
  node,
  level,
  onAddFile,
  onAddFolder,
  onRenameFolder,
  onDeleteNode,
  onRenameFile,
  onToggleFolderExpansion,
}) => {
  const isRoot = tree.root.id === node.id;
  const isFolder = node.data.type === FileSystemNodeType.FOLDER;
  const isExpanded =
    node.data.type === FileSystemNodeType.FOLDER ? node.data.isExpanded : false;
  const children = node.children;
  const hasChildren = children.length > 0;
  const nodeName =
    node.data.type === FileSystemNodeType.FILE
      ? `${node.data.name}${node.data.extension}`
      : node.data.name;

  const handleRenameFolder = () => {
    onRenameFolder(node.id);
  };

  const handleDeleteNode = () => {
    onDeleteNode(node.id);
  };

  const handleRenameFile = () => {
    onRenameFile(node.id);
  };

  const handleToggleFolderExpansion = () => {
    onToggleFolderExpansion(node.id);
  };

  return (
    <div className="select-none">
      <div
        className="flex items-center gap-1 py-1 px-2 hover:bg-accent/50 rounded-sm group transition-colors duration-150"
        style={{ paddingLeft: `${level * 20 + 8}px` }}
      >
        <Button
          variant="ghost"
          size="sm"
          className="size-4 p-0 hover:bg-transparent"
          onClick={handleToggleFolderExpansion}
          disabled={!isFolder || !hasChildren}
        >
          {isFolder && hasChildren ? (
            isExpanded ? (
              <ChevronDownIcon className="size-3" />
            ) : (
              <ChevronRightIcon className="size-3" />
            )
          ) : (
            <div className="size-3" />
          )}
        </Button>

        <div className="flex items-center justify-center size-4.5">
          {isFolder ? (
            isExpanded ? (
              <FolderOpenIcon className="size-full text-blue-600" />
            ) : (
              <FolderIcon className="size-full text-blue-600" />
            )
          ) : (
            <FileIcon className="size-full text-gray-600" />
          )}
        </div>

        <span className="text-sm font-medium flex-1 truncate">{nodeName}</span>

        <TreeNodeActions
          isFolder={isFolder}
          isRoot={isRoot}
          onAddFile={onAddFile}
          onAddFolder={onAddFolder}
          onRenameFolder={handleRenameFolder}
          onDeleteNode={handleDeleteNode}
          onRenameFile={handleRenameFile}
        />
      </div>

      {isFolder && isExpanded && hasChildren && (
        <>
          {children.map((child) => (
            <TreeNodeComponent
              key={child.id}
              tree={tree}
              node={child}
              level={level + 1}
              onAddFile={onAddFile}
              onAddFolder={onAddFolder}
              onRenameFolder={onRenameFolder}
              onDeleteNode={onDeleteNode}
              onRenameFile={onRenameFile}
              onToggleFolderExpansion={onToggleFolderExpansion}
            />
          ))}
        </>
      )}
    </div>
  );
};
