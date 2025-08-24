"use client";

import type { Tree } from "@/core";
import { FileSystemNodeType } from "@/enums";
import {
  addFile,
  addFolder,
  deleteNode,
  renameFile,
  renameFolder,
  toggleFolderExpansion,
} from "./store/actions";
import { fileSystemInitialState, fileSystemStoreReducer } from "./store";
import { FileSystemNodeData } from "@/types";
import { createContext, useContext, useReducer } from "react";

export type FileSystemContextType = {
  tree: Tree<FileSystemNodeData>;
  addFolder: (parentId: string, name: string) => void;
  addFile: (parentId: string, name: string, extension: string) => void;
  deleteNode: (id: string) => void;
  renameFile: (id: string, newName: string, newExtension: string) => void;
  renameFolder: (id: string, newName: string) => void;
  toggleFolderExpansion: (id: string) => void;
  checkIsFolderExpanded: (id: string) => boolean;
};

export const FileSystemContext = createContext<FileSystemContextType | null>(
  null
);

export const FileSystemProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(
    fileSystemStoreReducer,
    fileSystemInitialState
  );

  const onAddFolder = (parentId: string, name: string) =>
    dispatch(addFolder(parentId, name));

  const onAddFile = (parentId: string, name: string, extension: string) =>
    dispatch(addFile(parentId, name, extension));

  const onDeleteNode = (id: string) => dispatch(deleteNode(id));

  const onRenameFile = (id: string, newName: string, newExtension: string) =>
    dispatch(renameFile(id, newName, newExtension));

  const onRenameFolder = (id: string, newName: string) =>
    dispatch(renameFolder(id, newName));

  const onToggleFolderExpansion = (id: string) =>
    dispatch(toggleFolderExpansion(id));

  const checkIsFolderExpanded = (id: string) => {
    const node = state?.tree?.getNode(id);
    return node?.data.type === FileSystemNodeType.FOLDER
      ? !!node.data.isExpanded
      : false;
  };

  return (
    <FileSystemContext.Provider
      value={{
        tree: state?.tree!, // !FIXME: we already know that the tree is not null or undefined, because we initialize it anyway
        addFolder: onAddFolder,
        addFile: onAddFile,
        deleteNode: onDeleteNode,
        renameFile: onRenameFile,
        renameFolder: onRenameFolder,
        toggleFolderExpansion: onToggleFolderExpansion,
        checkIsFolderExpanded,
      }}
    >
      {children}
    </FileSystemContext.Provider>
  );
};

export const useFileSystem = () => {
  const context = useContext(FileSystemContext);
  if (!context) {
    throw new Error("useFileSystem must be used within a FileSystemProvider");
  }
  return context;
};
