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
import { useFileSystem } from "@/providers";
import { toast } from "sonner";
import { useState } from "react";
import { FileSystemNodeType } from "@/enums";

type DeleteConfirmationData = {
  node: TreeNode<FileSystemNodeData> | null;
};

export const FileManagerFeature = () => {
  const {
    tree,
    addFile,
    addFolder,
    renameFile,
    renameFolder,
    deleteNode,
    toggleFolderExpansion,
  } = useFileSystem();
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
          toast.info(
            `${
              data.node.data.type === FileSystemNodeType.FOLDER
                ? "Folder"
                : "File"
            } with name "${data.node.data.name}" deleted`
          );
        }
      },
    });

  const rootNode = tree.root;

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
        <TreeNodeComponent
          tree={tree}
          node={rootNode}
          level={0}
          onAddFile={toggleAddFileDialog}
          onAddFolder={toggleAddFolderDialog}
          onRenameFile={handleRenameFile}
          onRenameFolder={handleRenameFolder}
          onDeleteNode={handleDeleteNode}
          onToggleFolderExpansion={toggleFolderExpansion}
        />
      </section>
      <DeleteConfirmDialog {...deleteConfirmationProps} />
      <AddFileDialog
        isOpen={isAddFileDialogOpen}
        onClose={toggleAddFileDialog}
      />
      <AddFolderDialog
        isOpen={isAddFolderDialogOpen}
        onClose={toggleAddFolderDialog}
      />
      <RenameFileDialog
        isOpen={isRenameFileDialogOpen}
        onClose={toggleRenameFileDialog}
        node={targetNode}
      />
      <RenameFolderDialog
        isOpen={isRenameFolderDialogOpen}
        onClose={toggleRenameFolderDialog}
        node={targetNode}
      />
    </>
  );
};
