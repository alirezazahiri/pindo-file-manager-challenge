"use client";

import { TreeNode } from "@/core";
import { useBoolean, useConfirmation } from "@/hooks";
import { FileSystemNodeData } from "@/types";
import {
  DeleteConfirmDialog,
  TreeNodeComponent,
  AddFileDialog,
  AddFolderDialog,
  RenameFileDialog,
  RenameFolderDialog,
} from "./components";
import { useState } from "react";
import { Card } from "@/components/ui";
import { useFileSystemDispatch, useFileSystemState } from "@/providers";

type DeleteConfirmationData = {
  node: TreeNode<FileSystemNodeData> | null;
};

export const FileManagerFeature = () => {
  const { tree } = useFileSystemState();
  const {
    addFile,
    addFolder,
    renameFile,
    renameFolder,
    deleteNode,
    toggleFolderExpansion,
  } = useFileSystemDispatch();
  const { value: isAddFileDialogOpen, toggle: toggleAddFileDialog } =
    useBoolean();
  const { value: isAddFolderDialogOpen, toggle: toggleAddFolderDialog } =
    useBoolean();
  const { value: isRenameFileDialogOpen, toggle: toggleRenameFileDialog } =
    useBoolean();
  const { value: isRenameFolderDialogOpen, toggle: toggleRenameFolderDialog } =
    useBoolean();
  const [targetNode, setTargetNode] =
    useState<TreeNode<FileSystemNodeData> | null>(null);

  const { open: openDeleteConfirmation, ...deleteConfirmationProps } =
    useConfirmation<DeleteConfirmationData>({
      initialData: {
        node: null,
      },
      onConfirm: (data) => {
        if (data.node) {
          deleteNode(data.node.id);
        }
      },
    });

  const rootNode = tree.root;

  const handleAddFile = (parentId: string) => {
    const node = tree.getNode(parentId);
    setTargetNode(node);
    toggleAddFileDialog();
  };

  const handleAddFolder = (parentId: string) => {
    const node = tree.getNode(parentId);
    setTargetNode(node);
    toggleAddFolderDialog();
  };

  const handleRenameFile = (id: string) => {
    const node = tree.getNode(id);
    setTargetNode(node);
    toggleRenameFileDialog();
  };

  const handleRenameFolder = (id: string) => {
    const node = tree.getNode(id);
    setTargetNode(node);
    toggleRenameFolderDialog();
  };

  const handleDeleteNode = (id: string) => {
    openDeleteConfirmation({
      node: tree.getNode(id),
    });
  };

  return (
    <>
      <section className="container mx-auto p-4">
        <Card className="p-4">
          <TreeNodeComponent
            tree={tree}
            node={rootNode}
            level={0}
            onAddFile={handleAddFile}
            onAddFolder={handleAddFolder}
            onRenameFile={handleRenameFile}
            onRenameFolder={handleRenameFolder}
            onDeleteNode={handleDeleteNode}
            onToggleFolderExpansion={toggleFolderExpansion}
          />
        </Card>
      </section>
      <DeleteConfirmDialog {...deleteConfirmationProps} />
      <AddFileDialog
        isOpen={isAddFileDialogOpen}
        onClose={toggleAddFileDialog}
        parentNode={targetNode}
        onSubmit={addFile}
      />
      <AddFolderDialog
        isOpen={isAddFolderDialogOpen}
        onClose={toggleAddFolderDialog}
        parentNode={targetNode}
        onSubmit={addFolder}
      />
      <RenameFileDialog
        isOpen={isRenameFileDialogOpen}
        onClose={toggleRenameFileDialog}
        node={targetNode}
        onSubmit={renameFile}
      />
      <RenameFolderDialog
        isOpen={isRenameFolderDialogOpen}
        onClose={toggleRenameFolderDialog}
        node={targetNode}
        onSubmit={renameFolder}
      />
    </>
  );
};
